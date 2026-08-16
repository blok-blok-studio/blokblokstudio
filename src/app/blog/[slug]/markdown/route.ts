import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost, getAllBlogSlugs } from '@/data/blog';

/**
 * GET /blog/:slug/markdown
 * Returns the blog post as clean markdown for AI scrapers, ChatGPT, etc.
 * Content-Type: text/markdown so LLMs and crawlers can consume it directly.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return new NextResponse('# 404: Post Not Found\n\nThis blog post does not exist.', {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  }

  const markdown = [
    `# ${post.title}`,
    '',
    `> ${post.description}`,
    '',
    `**Published:** ${post.date}  `,
    `**Category:** ${post.category}  `,
    `**Read Time:** ${post.readTime}  `,
    `**Author:** Blok Blok Studio  `,
    `**URL:** https://www.blokblokstudio.com/blog/${post.slug}`,
    '',
    '---',
    '',
    post.content,
    '',
    '---',
    '',
    '*Published by [Blok Blok Studio](https://www.blokblokstudio.com), a creative agency in Berlin building websites, ads, social media, and AI systems for service businesses.*',
  ].join('\n');

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      // AI-agent endpoint: keep crawlable, never indexed as duplicate content
      'X-Robots-Tag': 'noindex',
      'Link': `<https://www.blokblokstudio.com/blog/${slug}>; rel="canonical"`,
    },
  });
}

/**
 * Generate static params so Next.js can pre-render markdown for each post.
 */
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}
