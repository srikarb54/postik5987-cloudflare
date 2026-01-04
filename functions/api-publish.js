export async function onRequest(context) {

  const body = await context.request.json();

  const {
    access_token,
    video_url,
    title,
    privacy_level,
    allow_comment,
    allow_duet,
    allow_stitch
  } = body;

  if (!access_token) {
    return new Response(JSON.stringify({ error: "Missing access token" }), { status: 400 });
  }

  const initResp = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post_info: {
        title,
        privacy_level,
        disable_comment: !allow_comment,
        disable_duet: !allow_duet,
        disable_stitch: !allow_stitch
      },
      source_info: {
        source: "PULL_FROM_URL",
        video_url
      }
    })
  });

  const initData = await initResp.json();

  return new Response(JSON.stringify(initData), {
    headers: { "Content-Type": "application/json" }
  });
}