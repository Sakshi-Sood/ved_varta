// Server route to check kundali matching from Prokerala API

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

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      girlDob, girlTob, girlLat, girlLon, girlTz,
      boyDob, boyTob, boyLat, boyLon, boyTz 
    } = body;

    // Validate required fields
    if (!girlDob || !girlTob || !boyDob || !boyTob) {
      return new Response(
        JSON.stringify({ error: 'Missing required birth details' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    // Get access token directly from Prokerala
    const accessToken = await getAccessToken();

    // Prepare datetime strings
    const girlDatetime = `${girlDob}T${girlTob}:00${girlTz || '+05:30'}`;
    const boyDatetime = `${boyDob}T${boyTob}:00${boyTz || '+05:30'}`;

    // Fetch kundali matching
    const kundaliUrl = new URL('https://api.prokerala.com/v2/astrology/kundli-matching');
    kundaliUrl.searchParams.set('girl_dob', girlDatetime);
    kundaliUrl.searchParams.set('girl_coordinates', `${girlLat || '28.6139'},${girlLon || '77.2090'}`);
    kundaliUrl.searchParams.set('boy_dob', boyDatetime);
    kundaliUrl.searchParams.set('boy_coordinates', `${boyLat || '28.6139'},${boyLon || '77.2090'}`);
    kundaliUrl.searchParams.set('ayanamsa', '1'); // Lahiri

    const response = await fetch(kundaliUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.detail || 'Failed to fetch kundali matching');
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { headers: { 'content-type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
