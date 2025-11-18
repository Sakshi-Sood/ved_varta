// Server route to fetch latest YouTube videos for a channel
// Uses YouTube Data API v3 and keeps the API key on the server

export const revalidate = 900; // 15 minutes ISR-style caching for this route

/**
 * GET /api/youtube/latest
 * Query latest videos from a channel and return simplified payload
 */
export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelIdEnv = process.env.YOUTUBE_CHANNEL_ID;
  const channelHandle = process.env.YOUTUBE_CHANNEL_HANDLE; // optional, e.g. @AcharyaAnoopTripathi

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Missing YOUTUBE_API_KEY server env' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    let channelId = channelIdEnv?.trim();

    // Resolve channelId if not provided, using a handle or search fallback
    if (!channelId) {
      if (channelHandle) {
        // Try to resolve using search with type=channel (works with handles text)
        const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
        searchUrl.searchParams.set('part', 'snippet');
        searchUrl.searchParams.set('q', channelHandle);
        searchUrl.searchParams.set('type', 'channel');
        searchUrl.searchParams.set('maxResults', '1');
        searchUrl.searchParams.set('key', apiKey);

        const searchRes = await fetch(searchUrl, { next: { revalidate } });
        if (!searchRes.ok) throw new Error('Failed to resolve channel by handle');
        const searchData = await searchRes.json();
        channelId = searchData?.items?.[0]?.id?.channelId || '';
      }

      if (!channelId) {
        return new Response(
          JSON.stringify({ error: 'Provide YOUTUBE_CHANNEL_ID or YOUTUBE_CHANNEL_HANDLE' }),
          { status: 500, headers: { 'content-type': 'application/json' } }
        );
      }
    }

    // 1) Get latest videos via search
    const latestUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    latestUrl.searchParams.set('part', 'snippet');
    latestUrl.searchParams.set('channelId', channelId);
    latestUrl.searchParams.set('order', 'date');
    latestUrl.searchParams.set('type', 'video');
    latestUrl.searchParams.set('maxResults', '12');
    latestUrl.searchParams.set('key', apiKey);

    const latestRes = await fetch(latestUrl, { next: { revalidate } });
    if (!latestRes.ok) throw new Error('Failed to fetch latest videos');
    const latest = await latestRes.json();

    const items = latest.items || [];
    const videoIds = items.map((v) => v.id?.videoId).filter(Boolean);

    // 2) Fetch durations in a single call
    let durations = {};
    if (videoIds.length) {
      const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
      videosUrl.searchParams.set('part', 'contentDetails');
      videosUrl.searchParams.set('id', videoIds.join(','));
      videosUrl.searchParams.set('key', apiKey);
      const vidsRes = await fetch(videosUrl, { next: { revalidate } });
      if (vidsRes.ok) {
        const vids = await vidsRes.json();
        for (const v of vids.items || []) {
          durations[v.id] = iso8601ToDuration(v.contentDetails?.duration || 'PT0S');
        }
      }
    }

    const videos = items.map((it) => {
      const videoId = it.id?.videoId;
      const snip = it.snippet || {};
      return {
        id: videoId,
        videoId,
        title: snip.title,
        description: snip.description,
        publishedAt: snip.publishedAt,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        duration: durations[videoId] || null,
      };
    });

    return new Response(JSON.stringify({ videos }), {
      headers: { 'content-type': 'application/json', 'cache-control': 'public, s-maxage=900, stale-while-revalidate=300' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

// Convert YouTube ISO 8601 duration to H:MM:SS or M:SS
function iso8601ToDuration(iso) {
  // Example: PT1H2M10S, PT9M30S, PT58S
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso) || [];
  const h = parseInt(match[1] || '0', 10);
  const m = parseInt(match[2] || '0', 10);
  const s = parseInt(match[3] || '0', 10);
  const total = h * 3600 + m * 60 + s;
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  if (hh > 0) return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  return `${mm}:${ss.toString().padStart(2, '0')}`;
}
