export default async function handler(req, res) {
  // Enable CORS for your Figma plugin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { url, method = 'GET', token, body } = req.body;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = { raw: text };
    }

    res.status(response.status).json({
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: data
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      ok: false 
    });
  }
}
