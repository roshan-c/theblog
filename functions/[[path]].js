const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</docs/api/>; rel="service-doc"',
  '</openapi.json>; rel="service-desc"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"'
].join(', ');

function withStandardHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set('Link', LINK_HEADER);
  headers.set('Vary', 'Accept');

  if (pathname === '/.well-known/api-catalog') {
    headers.set('Content-Type', 'application/linkset+json; charset=utf-8');
  }
  if (
    pathname === '/.well-known/openid-configuration' ||
    pathname === '/.well-known/oauth-authorization-server' ||
    pathname === '/.well-known/oauth-protected-resource' ||
    pathname === '/healthz'
  ) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function estimateMarkdownTokens(markdown) {
  return String(Math.max(1, Math.ceil(markdown.split(/\s+/).filter(Boolean).length * 1.3)));
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const accept = request.headers.get('accept') || '';
  const wantsMarkdown = accept.includes('text/markdown');

  if (wantsMarkdown && (pathname === '/' || pathname.endsWith('.html'))) {
    const markdownPath = pathname === '/' ? '/index.md' : pathname.replace(/\.html$/, '.md');
    const markdownUrl = new URL(markdownPath, url);
    const markdownResponse = await env.ASSETS.fetch(new Request(markdownUrl.toString(), request));

    if (markdownResponse.ok) {
      const markdown = await markdownResponse.text();
      const headers = new Headers();
      headers.set('Content-Type', 'text/markdown; charset=utf-8');
      headers.set('Vary', 'Accept');
      headers.set('x-markdown-tokens', estimateMarkdownTokens(markdown));
      headers.set('Link', LINK_HEADER);
      return new Response(markdown, { status: 200, headers });
    }
  }

  const assetResponse = await env.ASSETS.fetch(request);
  return withStandardHeaders(assetResponse, pathname);
}
