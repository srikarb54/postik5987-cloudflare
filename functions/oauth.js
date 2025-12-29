export async function onRequest(context) {
  // Generate CSRF token
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const state = [...array].map(b => b.toString(16).padStart(2, '0')).join('');

  const client_key = "awxz5bpprf0w1e7t";
  const redirect_uri = "https://postik5987.pages.dev/callback";
  const scope = "user.info.basic,video.upload,video.publish";

  const url = new URL("https://www.tiktok.com/v2/auth/authorize/");
  url.searchParams.set("client_key", client_key);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);
  url.searchParams.set("redirect_uri", redirect_uri);
  url.searchParams.set("state", state);

  return Response.redirect(url.toString(), 302);
}