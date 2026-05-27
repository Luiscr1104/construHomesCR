import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /cdn-cgi/',
    '',
    '# AI search engine bots — explicitly allowed',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: anthropic-ai',
    'Allow: /',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    'Sitemap: https://construhomescr.com/sitemap-index.xml',
    '',
  ].join('\n');

  return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
};
