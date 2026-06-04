/* ============================================================
   달빛 해몽 — Cloudflare Worker 프록시
   Gemini API 키를 환경변수(GEMINI_API_KEY)에 보관하고
   브라우저 요청을 Gemini API로 중계한다.
   ============================================================ */

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {

    /* CORS preflight */
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    /* URL 예시: /models/gemini-1.5-flash:generateContent */
    const { pathname } = new URL(request.url);
    const match = pathname.match(/^\/(models\/.+)$/);
    if (!match) {
      return new Response('Invalid path', { status: 400 });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: { message: 'GEMINI_API_KEY secret not set' } }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    /* GEMINI_MODEL 환경변수가 있으면 클라이언트 모델 요청을 override
       → 모델 변경 시 코드 수정 없이 Cloudflare 대시보드에서만 수정 */
    let modelPath = match[1]; // e.g. "models/gemini-1.5-flash:generateContent"
    if (env.GEMINI_MODEL) {
      modelPath = modelPath.replace(/^models\/[^:]+/, `models/${env.GEMINI_MODEL}`);
    }

    /* Gemini API로 요청 중계 */
    const geminiUrl = `${GEMINI_BASE}/${modelPath}?key=${env.GEMINI_API_KEY}`;
    const body = await request.text();

    const upstream = await fetch(geminiUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const text = await upstream.text();

    return new Response(text, {
      status:  upstream.status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  },
};
