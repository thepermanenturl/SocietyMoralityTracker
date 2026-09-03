import { onRequestPost, onRequestOptions } from './functions/api/chat';
import { onRequestPost as onPrismPost, onRequestOptions as onPrismOptions } from './functions/api/prism';

export interface Env {
  GEMINI_API_KEY?: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Route /api/prism/refract
    if (url.pathname === '/api/prism/refract') {
      if (request.method === 'OPTIONS') {
        return onPrismOptions();
      }
      if (request.method === 'POST') {
        return onPrismPost({ request, env } as any);
      }
    }

    // Route /api/chat or /api/health requests directly to the Gemini edge handler
    if (url.pathname === '/api/chat' || url.pathname === '/api/health') {
      if (request.method === 'OPTIONS') {
        return onRequestOptions();
      }
      if (request.method === 'GET') {
        return new Response(
          JSON.stringify({
            status: 'ok',
            model: 'Gemini 1.5 Flash',
            service: 'Socrates Socratic Reasoning Engine (Cloudflare Edge)',
            timestamp: new Date().toISOString()
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
          }
        );
      }
      if (request.method === 'POST') {
        return onRequestPost({
          request,
          env,
          params: {},
          waitUntil: ctx.waitUntil.bind(ctx),
          next: () => Promise.resolve(new Response('Not Found', { status: 404 })),
          data: {},
          functionPath: '/api/chat'
        } as any);
      }
    }

    // Fallback: Serve static HTML, CSS, JS, and PWA assets
    return env.ASSETS.fetch(request);
  }
};
