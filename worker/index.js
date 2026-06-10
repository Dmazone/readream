export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://dmazone.github.io',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const origin = request.headers.get('Origin') || '';
    if (!origin.includes('dmazone.github.io')) {
      return new Response('Forbidden', { status: 403 });
    }

    const url = new URL(request.url);
    const model = url.pathname.split('/').pop().replace(':generateContent', '');
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const body = await request.text();

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': (env.GEMINI_API_KEY || '').trim(),
      },
      body,
    });

    const data = await geminiRes.text();

    return new Response(data, {
      status: geminiRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://dmazone.github.io',
      },
    });
  },
};
