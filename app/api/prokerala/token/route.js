// Server route to get Prokerala API access token
// Keeps API credentials on the server side

export const revalidate = 3500; // Token expires in 1 hour, refresh slightly before

let cachedToken = null;
let tokenExpiry = null;

export async function GET() {
  try {
    // Check if we have a valid cached token
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return new Response(
        JSON.stringify({ access_token: cachedToken }),
        { headers: { 'content-type': 'application/json' } }
      );
    }

    const clientId = process.env.NEXT_PUBLIC_PROKERALA_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_PROKERALA_API_SECRET;

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: 'Missing Prokerala API credentials' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }

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
    
    // Cache the token
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Expire 1 minute early

    return new Response(
      JSON.stringify({ access_token: data.access_token }),
      { headers: { 'content-type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
