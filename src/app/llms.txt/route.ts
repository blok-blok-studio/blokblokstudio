import { NextResponse } from 'next/server';
import en from '@/messages/en.json';
import { blogPosts } from '@/data/blog';
import { projectsData } from '@/data/projects';
import { INDEXED_VIDEOS, videoUrls } from '@/data/videos';
import { MEMBERS } from '@/data/team';
import { FOUNDED } from '@/data/studio';

/**
 * GET /llms.txt
 * Discovery file for LLMs and AI crawlers (https://llmstxt.org). Built from the
 * same data the pages use, so it cannot describe a different studio than the
 * site does: team from data/team.ts, prices from the pricing messages, FAQ
 * from the FAQ messages, projects from data/projects.ts.
 */
export async function GET() {
  const site = 'https://www.blokblokstudio.com';
  const roles = en.team as Record<string, string>;
  const tiers = en.pricing.pkg.oneTime.map((p) => `${p.name} (${p.disp}): ${p.scope[0].i}`);
  const care = en.pricing.pkg.webSupport.map((p) => `${p.name} (${p.disp}/month): ${p.ideal}`);
  const faq = en.faq.items.map((f) => `- **${f.question}** ${f.answer}`);

  const content = [
    '# Blok Blok Studio',
    '',
    `> Blok Blok Studio is a five-person web design studio based in Berlin, Germany, with team members in Richmond, Los Angeles and Multan. We design, build, redesign and host websites for ambitious brands. Hand-coded in Next.js by default, never templates. Founded ${FOUNDED.month === 6 ? 'June' : ''} ${FOUNDED.year}.`,
    '',
    '## What we do',
    '',
    '- **Website design and build**: custom sites hand-coded in Next.js, from a single landing page to 15 or more pages with e-commerce.',
    '- **Website redesign**: an existing site rebuilt on the same tiers as a new build, URLs kept for search.',
    '- **Hosting and care**: managed hosting on Vercel with monitoring, backups, security updates and monthly content edits.',
    '- We build in Webflow or WordPress when a client already runs them.',
    '- We do not sell advertising management, social media management, AI agents or app development.',
    '',
    '## Pricing (USD, also quoted in EUR)',
    '',
    ...tiers.map((t) => `- ${t}`),
    ...care.map((c) => `- ${c}`),
    `- Timelines: landing page 2 to 3 weeks, 5 pages 4 to 6 weeks, 10 pages with CMS 6 to 8 weeks, 15 or more pages 8 to 12 weeks.`,
    `- Full detail: ${site}/pricing`,
    '',
    '## Team',
    '',
    ...MEMBERS.map((m) => `- **${m.name}**, ${roles[m.roleKey]}, ${m.location.city}, ${m.location.area}.`),
    '',
    '## Clients',
    '',
    'Clients are in the United States, Germany and the Philippines. Largest client: Philippine Airlines (annual revenue above $3 billion).',
    '',
    '## Results',
    '',
    '- Bronco Plumbing (Dallas-Fort Worth): $50,000 gross revenue in the first five months, 5.0 stars across 52 Google reviews.',
    '- Exotic Ripz (e-commerce): $191,042 in sales across 1,790 orders on the Shopify store we built.',
    '- Coach Kofi (Berlin): consultation requests up 200% after launch.',
    '- Public Affair: age-gated entry completed by 95% of visitors.',
    '',
    '## Portfolio',
    '',
    ...Object.entries(projectsData).map(([slug, p]) => `- [${p.title}](${site}/projects/${slug}) (${p.category}, ${p.year}): ${p.desc}`),
    '',
    '## Specialties',
    '',
    `- [Plumber website design](${site}/plumber-website-design): lead-generating sites with local SEO and live Google reviews.`,
    `- [Personal trainer website design](${site}/personal-trainer-website-design): booking and Stripe payments on the site.`,
    `- [E-commerce website design](${site}/ecommerce-website-design): conversion-first storefronts on Shopify or Next.js.`,
    `- [Webdesign Berlin](${site}/webdesign-berlin): German-language page for Berlin businesses.`,
    '',
    '## FAQ',
    '',
    ...faq,
    '',
    '## Videos',
    '',
    ...INDEXED_VIDEOS.map((v) => {
      const { contentUrl, pageUrl } = videoUrls(v);
      return `- **${v.name}** (${v.duration}, on ${pageUrl}, file ${contentUrl}): ${v.description}`;
    }),
    '',
    '## Blog',
    '',
    ...blogPosts.map((post) => `- [${post.title}](${site}/blog/${post.slug}/markdown): ${post.description}`),
    '',
    '## Key pages',
    '',
    `- Home: ${site}`,
    `- Services: ${site}/services`,
    `- Pricing: ${site}/pricing`,
    `- Work: ${site}/projects`,
    `- About: ${site}/about`,
    `- Team: ${site}/team`,
    `- FAQ: ${site}/faq`,
    `- Contact: ${site}/contact`,
    `- Start a project (quiz): ${site}/start`,
    '',
    '## Contact',
    '',
    `- Contact form: ${site}/contact`,
    '- Instagram: https://www.instagram.com/blokblokstudio/',
    '- LinkedIn: https://www.linkedin.com/company/blok-blok-studio/',
    '- Free 15-minute intro call via the contact page.',
    '',
    `For the complete page, project and article text in one file, see [/llms-full.txt](${site}/llms-full.txt).`,
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
