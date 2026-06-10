export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://dmazone.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  const model = (req.query.model || 'gemini-2.5-flash').trim();
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const upstream = await fetch(geminiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': (process.env.GEMINI_API_KEY || '').trim(),
    },
    body: JSON.stringify(req.body),
  });

  const text = await upstream.text();
  res.status(upstream.status).setHeader('Content-Type', 'application/json').send(text);
}
