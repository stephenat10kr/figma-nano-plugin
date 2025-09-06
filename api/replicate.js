// api/replicate.js
export default async function handler(req, res) {
  // Always send CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  // Forward the request to Replicate
  const targetUrl = "https://api.replicate.com" + req.url.replace(/^\/api\/replicate/, "");
  
  try {
    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body || {})
    });

    const text = await upstream.text();
    res.status(upstream.status).send(text);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
