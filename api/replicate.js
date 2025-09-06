// api/replicate.js
export default async function handler(req, res) {
  // CORS headers so Figma is allowed
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  // Build the target URL by stripping "/api/replicate"
  const path = req.url.replace(/^\/api\/replicate/, "");
  const url = "https://api.replicate.com" + path;

  // Forward request to Replicate with your API token
  const upstream = await fetch(url, {
    method: req.method,
    headers: {
      "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: req.method === "GET" ? undefined : JSON.stringify(req.body || {})
  });

  const text = await upstream.text();
  res.status(upstream.status).send(text);
}
