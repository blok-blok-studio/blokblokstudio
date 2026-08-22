import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';
import { projectsData } from '@/data/projects';
import { INDEXED_VIDEOS, type SiteVideoKey } from '@/data/videos';
import { VIDEO_TRANSCRIPTS } from '@/data/video-transcripts';

/**
 * GET /llms-full.txt
 * Full-content version, entire site content for AI models to consume in one request.
 * Includes: about, team, services, projects (full case studies), funnel, and blog posts.
 */
export async function GET() {
  const projectEntries = Object.entries(projectsData);

  const sections: string[] = [];

  // ── Header ──
  sections.push(
    '# Blok Blok Studio: Full Site Content',
    '',
    '> Blok Blok Studio is a web design studio based in Berlin, Germany specializing in custom Next.js websites for businesses worldwide.',
    '',
    'Website: https://www.blokblokstudio.com',
    'Email: hello@blokblokstudio.com',
    'Instagram: https://www.instagram.com/blokblokstudio/',
    'LinkedIn: https://www.linkedin.com/company/blok-blok-studio/',
    '',
    '---',
    ''
  );

  // ── About ──
  sections.push(
    '# About Blok Blok Studio',
    '',
    'We are a collective of designers, developers, and strategists passionate about creating meaningful digital experiences.',
    '',
    '**Mission:** To empower brands with innovative digital solutions that connect, engage, and inspire their audiences worldwide.',
    '',
    '**Vision:** To be the creative partner of choice for brands that dare to stand out in the digital landscape.',
    '',
    '## Our Values',
    '',
    '- **Innovation**: We push boundaries and explore new possibilities in every project.',
    '- **Excellence**: We hold ourselves to the highest standards of quality and craftsmanship.',
    '- **Collaboration**: We believe the best work comes from strong partnerships with our clients.',
    '- **Integrity**: We operate with transparency, honesty, and respect in everything we do.',
    '',
    '## By the Numbers',
    '',
    '- 15+ Projects Delivered',
    '- 11 Happy Clients',
    '- Team of 4',
    '- 2 Years in Business (Founded 2024)',
    '- 6+ Industries Served',
    '',
    '---',
    ''
  );

  // ── Team ──
  sections.push(
    '# Our Team',
    '',
    '## Chase Haynes, Founder',
    '',
    '- Based in: Berlin, Germany',
    '- From: San Diego, California, USA',
    '- Before the studio: five years in the US Marine Corps',
    '- Studied: BFA in Design and Technology at Parsons School of Design',
    '- Founded Blok Blok Studio: June 2024',
    '- Enjoys: Art Museums, Traveling, Content Creation',
    '- LinkedIn: https://www.linkedin.com/in/chase-haynes/',
    '- Instagram: https://www.instagram.com/haynes2va/',
    '',
    '## Kyle Talley, Senior Graphic Designer',
    '',
    '- Based in: Richmond, Virginia, USA',
    '- Studied: Creative Advertising at Virginia Commonwealth University',
    '- Enjoys: Brazilian Jiu Jitsu, Animation, Thrifting',
    '- LinkedIn: https://www.linkedin.com/in/kylebtalley/',
    '- Instagram: https://www.instagram.com/ta11ey_/',
    '',
    '## Marketing Strategist',
    '',
    '- Based in: Los Angeles, California, USA',
    '',
    '## Full Stack Developer',
    '',
    '- Based in: Berlin, Germany',
    '',
    '---',
    ''
  );

  // ── Services ──
  sections.push(
    '# Services',
    '',
    'Custom website design and development tailored to elevate your brand.',
    '',
    '## Web Design & Development',
    'Custom websites that are visually stunning, lightning-fast, and optimized for conversion. Built with modern frameworks like Next.js for maximum performance and SEO.',
    '',
    '## UI/UX Design',
    'User-centered design that transforms complex problems into intuitive experiences. Wireframing, prototyping, and design systems.',
    '',
    '## SEO & Analytics',
    'Strategic optimization to boost your visibility and track what matters. Technical SEO, content strategy, structured data, and conversion tracking.',
    '',
    '## Our Process',
    '',
    '1. **Discovery** (30-min call): We dive deep into your goals, audience, and market to build a solid foundation.',
    '2. **Strategy** (2-3 days): We craft a tailored roadmap that aligns creative vision with business objectives.',
    '3. **Design** (1-2 weeks): We create compelling visuals and intuitive interfaces that captivate users.',
    '4. **Development** (2-4 weeks): We build with modern technologies ensuring speed, scalability, and reliability.',
    '5. **Launch & Optimize** (Ongoing): We deploy, monitor, and continuously refine to maximize performance.',
    '',
    '---',
    ''
  );

  // ── Portfolio / Projects ──
  sections.push('# Portfolio: Case Studies', '');

  for (const [slug, project] of projectEntries) {
    sections.push(
      `## ${project.title}`,
      '',
      `**Category:** ${project.category}  `,
      `**Year:** ${project.year}  `,
      project.url ? `**Live URL:** ${project.url}  ` : '',
      `**Page:** https://www.blokblokstudio.com/projects/${slug}`,
      '',
      `**Overview:** ${project.desc}`,
      '',
      `**Challenge:** ${project.challenge}`,
      '',
      `**Solution:** ${project.solution}`,
      '',
      `**Results:** ${project.results}`,
      '',
      '---',
      ''
    );
  }

  // ── Funnel / Why Choose Us ──
  sections.push(
    '# Why Choose Blok Blok Studio',
    '',
    '## What You Get',
    '',
    '- **Custom Design**: No templates. Every project is designed from scratch for your specific brand and goals.',
    '- **Lightning-Fast Performance**: Sites built for speed with Core Web Vitals optimization, CDN delivery, and modern frameworks.',
    '- **SEO-Optimized**: Structured data, meta tags, sitemaps, and technical SEO built into every project from day one.',
    '- **Mobile-First**: Responsive design that looks and works perfectly on every device.',
    '- **Conversion-Focused**: Every design decision is driven by data and optimized to turn visitors into customers.',
    '- **Ongoing Support**: We don\'t disappear after launch. Continuous optimization and support included.',
    '',
    '## Service Packages',
    '',
    '### Web Presence',
    'Custom website design and development, SEO setup, and performance optimization.',
    '',
    '## Client Testimonials',
    '',
    '- **Luke Satterly** (Personal Trainer, Berlin): "They built my entire site from scratch and now clients book and pay directly through it. I used to waste hours on DMs and invoices."',
    '- **Coach Kofi** (Fitness Coach, Berlin): "The design matched my energy perfectly. Consultations went up over 200% after launch and the site basically sells for me now."',
    '- **Bronco Plumbing** (Home Services, Dallas-Fort Worth): Lead-generating website and growth system; $50k+ gross revenue in the first 5 months, 5.0-star rating across 52 Google reviews.',
    '',
    '# Video Transcripts',
    '',
    'Full transcripts of the videos on the site, so their content is readable without playing them. Produced with local speech recognition and lightly edited for punctuation.',
    '',
    ...INDEXED_VIDEOS.flatMap((v) => [
      `## ${v.name}`,
      '',
      `Runs ${v.duration}, plays at https://www.blokblokstudio.com${v.page}.`,
      '',
      VIDEO_TRANSCRIPTS[v.id as SiteVideoKey],
      '',
    ]),
    '## Comparison: DIY vs Freelancer vs Blok Blok Studio',
    '',
    '| Feature | DIY / Template | Freelancer | Blok Blok Studio |',
    '|---------|---------------|------------|------------------|',
    '| Custom Design | No | Partial | Yes |',
    '| SEO Optimization | Basic | Varies | Full |',
    '| Performance | Low | Medium | High |',
    '| Brand Strategy | No | No | Yes |',
    '| Ongoing Support | No | Limited | Yes |',
    '| Conversion Focus | No | Varies | Yes |',
    '| Timeline | Self-paced | Varies | 4-6 weeks |',
    '',
    '---',
    ''
  );

  // ── Blog Posts ──
  sections.push('# Blog', '');

  for (const post of blogPosts) {
    sections.push(
      `## ${post.title}`,
      '',
      `> ${post.description}`,
      '',
      `**Published:** ${post.date}  `,
      `**Category:** ${post.category}  `,
      `**Read Time:** ${post.readTime}  `,
      `**URL:** https://www.blokblokstudio.com/blog/${post.slug}`,
      '',
      post.content,
      '',
      '---',
      ''
    );
  }

  // ── Footer ──
  sections.push(
    '# Contact Blok Blok Studio',
    '',
    '- **Website:** https://www.blokblokstudio.com',
    '- **Email:** hello@blokblokstudio.com',
    '- **Instagram:** https://www.instagram.com/blokblokstudio/',
    '- **LinkedIn:** https://www.linkedin.com/company/blok-blok-studio/',
    '- **Free Strategy Call:** https://www.blokblokstudio.com/contact',
    '',
    'Blok Blok Studio: Crafting digital experiences that inspire.',
  );

  return new NextResponse(sections.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
