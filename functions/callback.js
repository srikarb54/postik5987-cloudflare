export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return new Response("Error: TikTok did not return ?code=", { status: 400 });
  }

  // Redirect to frontend showing the code
  return Response.redirect(`/?code=${code}&state=${state}`, 302);
}