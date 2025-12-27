export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code) {
      return new Response("Error: TikTok did not return code", { status: 400 });
    }

    const client_key = "sbawu97nzqxev1whkh";
    const client_secret = "fgs21FkmIULQBV9iFZ6FJKOY6dPBPL";

    // Exchange code for token
    const resp = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_key,
        client_secret,
        code,
        grant_type: "authorization_code",
        redirect_uri: "https://postik5987.pages.dev/callback"
      }),
    });

    const data = await resp.json();

    // Show results directly on screen
    return new Response(
      `<h1>Token Exchange Result</h1>
       <pre>${JSON.stringify(data, null, 2)}</pre>
       <p>You can copy your access_token and refresh_token now.</p>`,
      { headers: { "Content-Type": "text/html" } }
    );

  } catch (err) {
    return new Response("Callback error: " + err.toString(), { status: 500 });
  }
}