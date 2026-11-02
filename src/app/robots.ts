import type { MetadataRoute } from 'next';

/**
 * Only /api/ is off limits. /_next/ must stay crawlable: it serves every
 * optimized image (/_next/image) and the CSS and JS Google needs to render.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      {
        // AI crawlers and assistants, full crawl allowed for AI search.
        userAgent: [
          'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
          'anthropic-ai', 'ClaudeBot', 'Claude-Web', 'Claude-User', 'Claude-SearchBot',
          'Google-Extended', 'GoogleOther',
          'PerplexityBot', 'Perplexity-User',
          'MistralAI-User', 'cohere-ai', 'CCBot', 'YouBot',
          'Applebot', 'Applebot-Extended', 'Amazonbot', 'Bytespider',
          'meta-externalagent', 'Meta-ExternalFetcher', 'FacebookBot',
          'Diffbot', 'DuckAssistBot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.blokblokstudio.com/sitemap.xml',
  };
}
