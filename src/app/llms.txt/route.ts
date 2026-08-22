import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';
import { projectsData } from '@/data/projects';
import { INDEXED_VIDEOS, videoUrls } from '@/data/videos';

/**
 * GET /llms.txt
 * Standard discovery file for LLMs and AI crawlers.
 * See: https://llmstxt.org
 */
export async function GET() {
  const projectEntries = Object.entries(projectsData);

  const content = [
    '# Blok Blok Studio',
    '',
    '> Blok Blok Studio is a web design studio based in Berlin, Germany. We design and build custom Next.js websites for ambitious brands worldwide. Premium, conversion-focused web design, never templates.',
    '',
    '## About',
    '',
    'Blok Blok Studio builds high-performance websites and digital experiences that drive results. Founded by Chase Haynes (Parsons School of Design), the studio works with businesses across Europe and the US.',
    '',
    '- Mission: To empower brands with thoughtful web design that connects, engages, and inspires their audiences worldwide.',
    '- Vision: To be the web design partner of choice for brands that dare to stand out online.',
    '- Values: Innovation, Excellence, Collaboration, Integrity',
    '- Track Record: 15+ projects delivered, 11 clients served, founded 2024, 6+ industries served',
    '',
    '## Team',
    '',
    '- **Chase Haynes**, Founder. Based in Berlin, Germany. Studied Design and Technology at Parsons School of Design.',
    '- **Kyle Talley**, Senior Graphic Designer. Based in Richmond, Virginia, USA. Studied Creative Advertising at Virginia Commonwealth University.',
    '',
    '## Services',
    '',
    '- **Custom Websites**: Next.js + React sites that are SEO-optimized from day one, mobile-first responsive, with CMS integration and performance tuning. We do not build in WordPress, Wix, Squarespace, or Webflow.',
    '',
    '## Specialties',
    '',
    '- **Plumbers and home services** ([details](https://www.blokblokstudio.com/plumber-website-design)): lead-generating sites with local SEO and live Google reviews. Client result: $50k gross revenue in the first 5 months for a first-year plumbing company.',
    '- **Personal trainers and coaches** ([details](https://www.blokblokstudio.com/personal-trainer-website-design)): booking and Stripe payments directly on the site. Client results: consultations up 200%; bookings fully self-serve.',
    '- **E-commerce and Shopify** ([details](https://www.blokblokstudio.com/ecommerce-website-design)): conversion-first storefronts. Client result: $191k in sales across 1,790 orders.',
    '- **Webdesign Berlin** ([details](https://www.blokblokstudio.com/webdesign-berlin)): German-language page for Berlin businesses.',
    '',
    '## Pricing',
    '',
    'Custom-quoted to your project scope. A single landing page typically launches in 2 to 3 weeks; a 5-page site in 4 to 6 weeks; a 10-page site with CMS in 8 to 12 weeks. Contact us for a tailored proposal.',
    '',
    '## Process',
    '',
    '1. Discovery: Understand goals, audience, and market',
    '2. Strategy: Tailored roadmap aligning creative vision with business objectives',
    '3. Design: Compelling visuals and intuitive interfaces',
    '4. Development: Modern technologies ensuring speed, scalability, and reliability',
    '5. Launch & Optimize: Deploy, monitor, and continuously refine',
    '',
    '## Portfolio',
    '',
    ...projectEntries.map(
      ([slug, project]) =>
        `- [${project.title}](https://www.blokblokstudio.com/projects/${slug}) (${project.category}, ${project.year}): ${project.desc}`
    ),
    '',
    '## Videos',
    '',
    'Self-hosted MP4s. An assistant cannot watch them, so each is summarised here; the page link is where it plays.',
    '',
    ...INDEXED_VIDEOS.map((v) => {
      const { contentUrl, pageUrl } = videoUrls(v);
      return `- **${v.name}** (${v.duration}, on [${v.page}](${pageUrl}), file: ${contentUrl}): ${v.description}`;
    }),
    '',
    '## Blog Posts',
    '',
    ...blogPosts.map(
      (post) =>
        `- [${post.title}](https://www.blokblokstudio.com/blog/${post.slug}/markdown): ${post.description}`
    ),
    '',
    '## Contact',
    '',
    '- Website: https://www.blokblokstudio.com',
    '- Email: hello@blokblokstudio.com',
    '- Instagram: https://www.instagram.com/blokblokstudio/',
    '- LinkedIn: https://www.linkedin.com/company/blok-blok-studio/',
    '- Free Strategy Call: https://www.blokblokstudio.com/contact',
    '',
    '## Full Content',
    '',
    'For the complete content of all pages, projects, and blog posts in one file, see [/llms-full.txt](https://www.blokblokstudio.com/llms-full.txt)',
  ].join('\n');

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
