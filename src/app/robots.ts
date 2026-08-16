import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // AI crawlers, full crawl allowed for AI search positioning.
        // Major LLM/AI-search bots: OpenAI, Anthropic, Google AI, Perplexity,
        // Cohere, Common Crawl, You.com, Apple Intelligence, Amazon, ByteDance,
        // Meta AI, Diffbot, DuckDuckGo's AI assistant.
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'anthropic-ai',
          'ClaudeBot',
          'Claude-Web',
          'Claude-User',
          'Google-Extended',
          'PerplexityBot',
          'Perplexity-User',
          'cohere-ai',
          'CCBot',
          'YouBot',
          'Applebot',
          'Applebot-Extended',
          'Amazonbot',
          'Bytespider',
          'meta-externalagent',
          'FacebookBot',
          'Diffbot',
          'DuckAssistBot',
        ],
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://www.blokblokstudio.com/sitemap.xml',
  };
}
