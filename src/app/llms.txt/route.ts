import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';
import { projectsData } from '@/data/projects';

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
    '> Blok Blok Studio is a digital agency based in Berlin, Germany. We build AI agents, voice assistants, workflow automation, and custom Next.js websites for ambitious brands worldwide. Premium AI and web design — never templates.',
    '',
    '## About',
    '',
    'Blok Blok Studio builds high-performance websites, brand identities, and digital experiences that drive results. Founded by Chase Haynes (Parsons School of Design), the studio works with businesses across Europe and the US.',
    '',
    '- Mission: To empower brands with innovative digital solutions that connect, engage, and inspire their audiences worldwide.',
    '- Vision: To be the creative partner of choice for brands that dare to stand out in the digital landscape.',
    '- Values: Innovation, Excellence, Collaboration, Integrity',
    '- Track Record: 15+ projects delivered, 11 clients served, founded 2024, 6+ industries served',
    '',
    '## Team',
    '',
    '- **Chase Haynes**, Founder. Based in Berlin, Germany. Studied Design and Technology at Parsons School of Design.',
    '- **Kyle Talley**, Senior Graphic Designer. Based in Richmond, Virginia, USA. Studied Creative Advertising at Virginia Commonwealth University.',
    '- **Stephen Darling**, Senior Web Designer. Based in Arlington, Virginia, USA. Studied Interactive Design and Computer Science at James Madison University.',
    '',
    '## Services',
    '',
    '### AI & Automation',
    '',
    '- **AI Agent Ecosystems**: Interconnected sub-agents that run entire business workflows. Multi-agent orchestration, autonomous decision-making, human-in-the-loop escalation, 24/7 operation.',
    '- **Conversational AI**: AI chatbots and voice agents that qualify leads nonstop. Website chat widgets, inbound voice agents, appointment booking, FAQ handling.',
    '- **Workflow Automation**: Connect CRM, calendar, payments, and tooling into one seamless system. Custom integrations (no Zapier tax), error handling, AI decision logic.',
    '- **AI Content Systems**: Turn one input into ten pieces of content. Video-to-clips pipelines, blog generation from transcripts, social scheduling, brand voice consistency.',
    '- **Client Dashboards**: Real-time portals with live lead tracking, ad spend reporting, ROAS metrics, automated weekly reports, white-labeled to your brand.',
    '',
    '### Creative & Marketing',
    '',
    '- **Custom Websites**: Next.js + React sites that are SEO-optimized from day one, mobile-first responsive, with CMS integration and performance tuning. We do not build in WordPress, Wix, Squarespace, or Webflow.',
    '- **Brand Identity**: Logos, color palettes, typography, brand guidelines, social templates, pitch deck design.',
    '- **Google Ads**: Search campaigns for high-intent buyers — keyword research, ad copy, conversion tracking, monthly optimization, competitor analysis.',
    '- **Meta Ads**: Facebook and Instagram campaigns at scale — audience targeting, lookalikes, retargeting funnels, ROAS reporting, creative A/B testing.',
    '',
    '## Pricing',
    '',
    '- **Landing page (1 page)**: $2,000 one-time. Includes brand identity (logo + colors), responsive design, SEO meta, Vercel hosting setup.',
    '- **Custom website (5 pages)**: $4,500 one-time. Includes brand identity, SEO meta on all pages, hosting setup.',
    '- **Custom website (10 pages + CMS)**: $9,500 one-time. Includes branding, AI voice agent, full on-page SEO, scroll/hover animations.',
    '- **Conversational AI suite + 10-page site**: $18,000 one-time. AI chatbot trained on 100 Q&A pairs, voice agent with 2 scripts, SMS automations, AI content pipeline, professional copywriting.',
    '- **Maintain & Monitor retainer**: $1,500/month, 3-month minimum. Site maintenance, AI monitoring, monthly performance report, CRM management.',
    '- **Growth retainer**: $3,500/month, 6-month minimum. Everything above plus Google + Meta ads management, 4 blog posts/month, 12 social posts/month, 5 hours of dev work.',
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
        `- [${project.title}](https://blokblokstudio.com/projects/${slug}) (${project.category}, ${project.year}): ${project.desc}`
    ),
    '',
    '## Blog Posts',
    '',
    ...blogPosts.map(
      (post) =>
        `- [${post.title}](https://blokblokstudio.com/blog/${post.slug}/markdown): ${post.description}`
    ),
    '',
    '## Contact',
    '',
    '- Website: https://blokblokstudio.com',
    '- Email: hello@blokblokstudio.com',
    '- Instagram: https://www.instagram.com/blokblokstudio/',
    '- LinkedIn: https://www.linkedin.com/company/blok-blok-studio/',
    '- Free Strategy Call: https://blokblokstudio.com/call',
    '',
    '## Full Content',
    '',
    'For the complete content of all pages, projects, and blog posts in one file, see [/llms-full.txt](https://blokblokstudio.com/llms-full.txt)',
  ].join('\n');

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
