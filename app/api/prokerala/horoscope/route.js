// Server route to fetch daily horoscope from Prokerala API

export const revalidate = 3600; // Cache for 1 hour

// Helper function to get access token
async function getAccessToken() {
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
  return data.access_token;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sign = searchParams.get('sign') || 'aries';

    // Get access token directly from Prokerala
    const accessToken = await getAccessToken();

    // Get today's date in required format
    const today = new Date().toISOString().split('T')[0];

    // Fetch horoscope
    const horoscopeUrl = new URL('https://api.prokerala.com/v2/horoscope/daily');
    horoscopeUrl.searchParams.set('datetime', `${today}T00:00:00+05:30`);
    horoscopeUrl.searchParams.set('sign', sign.toLowerCase());

    const response = await fetch(horoscopeUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.detail || 'Failed to fetch horoscope');
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=3600, stale-while-revalidate=600'
        } 
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
