export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Error: TikTok did not return code", { status: 400 });
    }

    const client_key = "awxz5bpprf0w1e7t";
    const client_secret = "c3506efI0LsvQNmFfnuqlUqJ4saDOEt2";

    const body = new URLSearchParams();
    body.append("client_key", client_key);
    body.append("client_secret", client_secret);
    body.append("code", decodeURIComponent(code));
    body.append("grant_type", "authorization_code");
    body.append("redirect_uri", "https://postik5987.pages.dev/callback");

    const resp = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = await resp.json();

    return new Response(`
      <script>
        localStorage.setItem("access_token", "${data.access_token}");
        window.location.href = "/publish.html";
      </script>
    `, { headers: { "Content-Type": "text/html" } });

  } catch (err) {
    return new Response("Callback error: " + err.toString(), { status: 500 });
  }
}