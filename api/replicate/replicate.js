export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  // Strip "/api/replicate" from the URL
  const targetPath = req.url.replace(/^\/api\/replicate/, "");
  const targetUrl = "https://api.replicate.com" + targetPath;

  res.status(200).json({
    ok: true,
    targetUrl,
    method: req.method
  });
}
