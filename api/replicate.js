export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }

  // Build target URL by forwarding the path after /api/replicate
  const path = req.url.replace(/^\/api\/replicate/, "");
  const url = "https://api.replicate.com" + path;

  // Forward to Replicate with your server-side token
  const r = await fetch(url, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: req.method === "GET" ? undefined : JSON.stringify(req.body || {})
  });

  const text = await r.text();
  res.status(r.status).send(text);
}
