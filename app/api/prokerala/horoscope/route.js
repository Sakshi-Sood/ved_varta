// Server route to fetch daily horoscope from Prokerala API with caching

import { Client, Databases, ID, Query } from 'node-appwrite';

// Initialize Appwrite server client
function getAppwriteClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // Server-side API key

  return new Databases(client);
}

// Token cache (in-memory for server runtime)
let tokenCache = {
  token: null,
  expiresAt: 0,
};

// Helper function to get access token with caching
async function getAccessToken() {
  // Check if we have a valid cached token
  if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
    console.log('[Prokerala] Using cached access token');
    return tokenCache.token;
  }

  console.log('[Prokerala] Fetching new access token');
  const clientId = process.env.NEXT_PUBLIC_PROKERALA_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PROKERALA_API_SECRET;

  const response = await fetch('https://api.prokerala.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();

  // Cache the token for 50 minutes (tokens usually expire in 1 hour)
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (50 * 60 * 1000),
  };

  return data.access_token;
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// Check Appwrite cache for existing horoscope
async function getCachedHoroscope(databases, sign, date) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_HOROSCOPE_CACHE_ID;

    if (!collectionId) {
      console.log('[Horoscope Cache] Collection ID not configured');
      return null;
    }

    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('sign', sign),
      Query.equal('date', date),
      Query.limit(1),
    ]);

    if (response.documents.length > 0) {
      console.log(`[Horoscope Cache] HIT for ${sign} on ${date}`);
      return JSON.parse(response.documents[0].data);
    }

    console.log(`[Horoscope Cache] MISS for ${sign} on ${date}`);
    return null;
  } catch (error) {
    console.error('[Horoscope Cache] Error reading cache:', error.message);
    return null;
  }
}

// Save horoscope to Appwrite cache
async function cacheHoroscope(databases, sign, date, data) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_HOROSCOPE_CACHE_ID;

    if (!collectionId) {
      console.log('[Horoscope Cache] Collection ID not configured, skipping cache');
      return;
    }

    await databases.createDocument(databaseId, collectionId, ID.unique(), {
      sign: sign,
      date: date,
      data: JSON.stringify(data),
      created_at: new Date().toISOString(),
    });

    console.log(`[Horoscope Cache] Stored ${sign} for ${date}`);
  } catch (error) {
    console.error('[Horoscope Cache] Error writing cache:', error.message);
    // Don't throw - caching failure shouldn't break the API response
  }
}

// Fetch horoscope from Prokerala API
async function fetchHoroscopeFromAPI(sign, date) {
  const accessToken = await getAccessToken();

  const horoscopeUrl = new URL('https://api.prokerala.com/v2/horoscope/daily');
  horoscopeUrl.searchParams.set('datetime', `${date}T00:00:00+05:30`);
  horoscopeUrl.searchParams.set('sign', sign);

  console.log(`[Prokerala] Fetching horoscope for ${sign} on ${date}`);

  const response = await fetch(horoscopeUrl.toString(), {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    next: { revalidate: 86400 }, // Next.js fetch cache for 24 hours
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.detail || 'Failed to fetch horoscope');
  }

  const data = await response.json();
  console.log(`[Prokerala] Response structure:`, Object.keys(data));

  return data;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sign = searchParams.get('sign')?.toLowerCase() || 'aries';
    const today = getTodayDate();

    // Initialize Appwrite
    const databases = getAppwriteClient();

    // 1. Check Appwrite cache first (persisted across deployments)
    const cachedData = await getCachedHoroscope(databases, sign, today);
    if (cachedData) {
      return new Response(
        JSON.stringify(cachedData),
        {
          headers: {
            'content-type': 'application/json',
            'x-cache': 'HIT',
            'cache-control': 'public, s-maxage=86400, stale-while-revalidate=3600'
          }
        }
      );
    }

    // 2. Cache miss - fetch from Prokerala API
    const data = await fetchHoroscopeFromAPI(sign, today);

    // 3. Store in Appwrite cache for persistence
    await cacheHoroscope(databases, sign, today, data);

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          'content-type': 'application/json',
          'x-cache': 'MISS',
          'cache-control': 'public, s-maxage=86400, stale-while-revalidate=3600'
        }
      }
    );
  } catch (err) {
    console.error('[Horoscope API] Error:', err.message);
    return new Response(
      JSON.stringify({ error: err.message || 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
