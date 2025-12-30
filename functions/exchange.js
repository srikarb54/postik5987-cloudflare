// this file is not used in actual
export async function onRequest(context) {
  const body = await context.request.json();
  const { code } = body;

  const client_key = "awxz5bpprf0w1e7t";
  const client_secret = "c3506efI0LsvQNmFfnuqlUqJ4saDOEt2";

  // Build x-www-form-urlencoded body
  const form = new URLSearchParams();
  form.append("client_key", client_key);
  form.append("client_secret", client_secret);
  form.append("code", decodeURIComponent(code));
  form.append("grant_type", "authorization_code");
  form.append("redirect_uri", "https://postik5987.pages.dev/callback");

  const resp = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form.toString()
  });

  const data = await resp.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
