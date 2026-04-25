/**
 * /api/proxy/[slug]/[[...path]]
 *
 * Reverse-proxy for client sites whose own X-Frame-Options or
 * frame-ancestors blocks embedding. We fetch the upstream HTML, strip
 * the blocking headers, inject a <base> tag so relative asset URLs
 * resolve against the upstream origin, and rewrite anchor/form targets
 * so in-iframe navigation stays inside the proxy.
 *
 * Limits (be honest with stakeholders):
 *  - Sub-resource fetches that originate inside the page (Shopify cart,
 *    search APIs, GraphQL endpoints) are cross-origin from the iframe's
 *    perspective. Most of those endpoints don't allow our origin via
 *    CORS, so cart/search/login/checkout WILL break on proxied sites.
 *  - This is a visual browsing layer, not a functional clone.
 *  - We don't forward cookies in either direction. Authenticated views
 *    are out of scope.
 */

import { NextRequest, NextResponse } from 'next/server';
import { projectsData } from '@/data/projects';

// Run on the Edge runtime so the proxy is fast everywhere.
// (Falls back to Node if anything imported here isn't Edge-compatible.)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const HEADERS_TO_STRIP = new Set([
  'x-frame-options',
  'content-security-policy',
  'content-security-policy-report-only',
  'set-cookie',
  'strict-transport-security',
  'cross-origin-opener-policy',
  'cross-origin-resource-policy',
  'cross-origin-embedder-policy',
  'content-encoding',
  'transfer-encoding',
  'content-length',
  'permissions-policy',
  'feature-policy',
]);

const FRAMEBUSTER_OVERRIDE = `
<script>
(function () {
  try {
    Object.defineProperty(window, 'top', { configurable: true, get: function () { return window.self; } });
    Object.defineProperty(window, 'parent', { configurable: true, get: function () { return window.self; } });
  } catch (e) { /* ignore */ }
})();
</script>
`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; path?: string[] }> }
) {
  const { slug, path = [] } = await params;
  const project = projectsData[slug];

  if (!project?.url) {
    return new NextResponse('Project not found', { status: 404 });
  }

  const targetBase = new URL(project.url);
  const targetUrl = new URL(path.join('/'), targetBase);
  targetUrl.search = request.nextUrl.search;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent':
          request.headers.get('user-agent') ??
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0 Safari/537.36',
        'Accept': request.headers.get('accept') ?? '*/*',
        'Accept-Language': request.headers.get('accept-language') ?? 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });
  } catch {
    return new NextResponse('Upstream fetch failed', { status: 502 });
  }

  const contentType = upstreamRes.headers.get('content-type') ?? '';
  const isHtml = contentType.includes('text/html');

  let body: BodyInit;

  if (isHtml) {
    let html = await upstreamRes.text();

    // Inject <base> so relative asset URLs resolve against the upstream origin.
    if (!/<base\s/i.test(html)) {
      const baseTag = `<base href="${targetBase.origin}/">`;
      html = html.replace(/<head[^>]*>/i, (m) => m + baseTag + FRAMEBUSTER_OVERRIDE);
    } else {
      html = html.replace(/<head[^>]*>/i, (m) => m + FRAMEBUSTER_OVERRIDE);
    }

    // Rewrite same-origin absolute hrefs/actions to flow through the proxy.
    const proxyPrefix = `/api/proxy/${slug}`;
    const hostEscaped = targetBase.host.replace(/\./g, '\\.');
    const sameOriginAbsRe = new RegExp(
      `(href|action)\\s*=\\s*["'](?:https?:)?//(?:www\\.)?${hostEscaped}([^"']*)["']`,
      'gi'
    );
    html = html.replace(sameOriginAbsRe, (_m, attr, p) => `${attr}="${proxyPrefix}${p || '/'}"`);

    // Rewrite root-relative hrefs/actions (skip anchors and mailto/tel).
    const rootRelativeRe = /(href|action)\s*=\s*["']\/([^"'#][^"']*)["']/gi;
    html = html.replace(rootRelativeRe, (match, attr, p) => {
      if (p.startsWith('mailto:') || p.startsWith('tel:')) return match;
      return `${attr}="${proxyPrefix}/${p}"`;
    });

    body = html;
  } else {
    body = await upstreamRes.arrayBuffer();
  }

  const responseHeaders = new Headers();
  upstreamRes.headers.forEach((value, key) => {
    if (!HEADERS_TO_STRIP.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  // Cache HTML lightly so we're not hammering the upstream on every load.
  if (isHtml) {
    responseHeaders.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  }

  return new NextResponse(body, {
    status: upstreamRes.status,
    headers: responseHeaders,
  });
}
