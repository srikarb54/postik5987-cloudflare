export async function onRequest(context) {
  const body = await context.request.json();
  const { code } = body;

  const client_key = "sbawu97nzqxev1whkh";
  const client_secret = "fgs21FkmIULQBV9iFZ6FJvJKOY6dPBPL";

  const resp = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_key,
      client_secret,
      code,
      grant_type: "authorization_code",
      redirect_uri: "https://postik5987.pages.dev/callback"
    })
  });

  const data = await resp.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}