export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  gradient: string;
  icon: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-your-website-is-losing-customers',
    title: 'Why Your Website Is Losing Customers (And How to Fix It)',
    description: 'Slow pages, unclear messaging, and missing trust signals quietly drive visitors away. Five research-backed reasons websites lose customers, and how to fix each one.',
    date: '2026-02-14',
    readTime: '5 min read',
    category: 'Web Design',
    image: '/images/blog/why-your-website-is-losing-customers.webp',
    gradient: 'from-blue-600 via-indigo-700 to-purple-800',
    icon: '🌐',
    content: `
Your website loses customers for predictable reasons: it loads too slowly, it does not say what you do, it frustrates people on phones, and it gives visitors no reason to trust you. None of that is guesswork. Research from Google, the Nielsen Norman Group, and the Baymard Institute puts numbers on each one, and every one of them is fixable.

## 1. Slow Load Times Kill Conversions

When the BBC studied its own traffic, it found it lost an additional 10% of users for every extra second the site took to load. The upside is just as real: Vodafone improved its Largest Contentful Paint by 31% and sales rose 8%, and Rakuten 24 grew revenue per visitor by 53% after passing Core Web Vitals thresholds. All three results are documented in Google's web.dev case studies (see Sources below).

Google's current targets are concrete: main content visible (LCP) within 2.5 seconds, response to taps and clicks (INP) within 200 milliseconds, and layout shift (CLS) under 0.1, measured at the 75th percentile of real visits.

**The fix:** Compress and resize images (WebP or AVIF), serve your site through a CDN, cut unused JavaScript, and lazy-load anything below the fold. A modern framework like Next.js handles most of this out of the box.

## 2. No Clear Value Proposition

The Nielsen Norman Group, drawing on an analysis of more than 200 million page visits, found the first 10 seconds are decisive. If a page does not communicate its value in that window, most visitors leave. Those who stay past 30 seconds often stay for minutes. And a study from Google researchers found that people form a judgment of a site's visual appeal within 50 milliseconds, before they read a single word.

**The fix:** Lead with a clear, benefit-driven headline. Tell visitors exactly what problem you solve and who you solve it for. Generic openers like "Welcome to Our Website" waste the only seconds that matter.

## 3. Poor Mobile Experience

Google uses the mobile version of your site, crawled with a smartphone agent, for indexing and ranking. Cloudflare's network data shows 43% of all web requests came from mobile devices in 2025, up from 41% the year before. If your site has tiny tap targets and unreadable text on a phone, you are failing both Google and a huge share of your audience.

**The fix:** Design mobile-first and test on real devices. WCAG 2.2 sets the accessibility floor for tap targets at 24 by 24 CSS pixels; treat that as a minimum and make primary buttons comfortably larger. Keep text readable without zooming and navigation reachable with a thumb.

## 4. Weak or Missing CTAs

If visitors can't figure out what to do next, they leave. Every page needs a clear call to action, whether that's booking a call, requesting a quote, or downloading a resource.

**The fix:** Use one primary CTA per page. Make it visually prominent with contrasting colors. Use action-oriented language ("Get Your Free Audit" beats "Submit").

## 5. No Trust Signals

The Baymard Institute's meta-analysis of 50 studies puts average cart abandonment at just over 70%. Among the fixable reasons, 19% of US shoppers said they did not trust the site with their credit card information, and 17% abandoned because of website errors or crashes. Stanford's Web Credibility Project, built on research with more than 4,500 participants, found that people judge a site's credibility largely on its visual design, and recommends showing the real people behind the site, a physical address, and clear contact information.

**The fix:** Add social proof throughout your site, not just on a dedicated testimonials page. Show real results, real people, and real numbers. Make your contact details easy to find.

## Ready to Fix Your Website?

If any of these issues sound familiar, you're not alone. Most business websites suffer from at least two or three of these problems. The good news? They're all fixable.

Book a free strategy call with our team and we'll show you exactly what's holding your site back and how to turn it into a growth engine.

## Sources

- **Google web.dev, Why speed matters**: https://web.dev/articles/why-speed-matters
- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Nielsen Norman Group, How Long Do Users Stay on Web Pages?**: https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/
- **Tuch et al., first impressions study (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Cloudflare Radar 2025 Year in Review**: https://blog.cloudflare.com/radar-2025-year-in-review/
- **W3C, WCAG 2.2 Target Size (Minimum)**: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **Baymard Institute, Cart Abandonment Rate Statistics**: https://baymard.com/lists/cart-abandonment-rate
- **Stanford Web Credibility Project, Guidelines**: https://credibility.stanford.edu/guidelines/index.html
    `.trim(),
  },
  {
    slug: 'seo-checklist-2026',
    title: 'The Ultimate SEO Checklist for 2026',
    description: 'A comprehensive guide to the SEO fundamentals every business website needs to rank on Google in 2026. Structured data, Core Web Vitals, and more.',
    date: '2026-02-10',
    readTime: '7 min read',
    category: 'SEO',
    image: '/images/blog/seo-checklist-2026.webp',
    gradient: 'from-emerald-600 via-green-700 to-teal-800',
    icon: '📈',
    content: `
Ranking in 2026 still comes down to fundamentals: a site Google can crawl, pages that load fast, structure machines can parse, and content that answers real questions. Google confirms the same foundations now decide whether you show up in AI Overviews and AI Mode too. Here's the checklist we run on every site we build.

## Technical SEO Foundations

- **HTTPS everywhere**: Google has used HTTPS as a ranking signal since 2014. It's a lightweight signal, but browsers flag insecure sites and visitors notice.
- **Fast Core Web Vitals**: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1, measured at the 75th percentile of real visits. INP replaced FID as the responsiveness metric in 2024, so retire any old FID dashboards.
- **Mobile-first indexing**: Google crawls with a smartphone agent and uses your mobile version for indexing and ranking. Your mobile site IS your site.
- **Clean URL structure**: Use descriptive, readable URLs. Avoid query parameters where you can.
- **XML sitemap**: Submit to Google Search Console. Keep it updated.
- **robots.txt**: Block what shouldn't be indexed (admin pages, API routes).

## On-Page SEO

- **Unique title tags**: Google says there is no fixed character limit, but long titles get truncated to fit the screen. Front-load the important words, give every page distinct descriptive text, and skip boilerplate and repeated keywords.
- **Meta descriptions**: Write a compelling summary for every page. Google truncates long snippets, so put the value in the first sentence.
- **Heading hierarchy**: One H1 per page, logical H2 to H6 structure.
- **Internal linking**: Connect related pages. Use descriptive anchor text.
- **Image optimization**: Alt text, compressed formats (WebP/AVIF), lazy loading.

## Structured Data

Structured data helps Google understand your content and can earn you rich results (FAQ dropdowns, star ratings, breadcrumbs). Google's own case studies show it moves real numbers: Rotten Tomatoes measured a 25% higher click-through rate on pages with structured data, and Nestlé measured an 82% higher click-through rate on pages that appear as rich results.

- **Organization schema**: Tell Google who you are.
- **LocalBusiness schema**: Essential for local SEO.
- **BreadcrumbList schema**: Helps navigation in search results.
- **FAQPage schema**: Can earn expanded FAQ snippets in search.
- **Article schema**: For blog posts and news content.

## AI Search Is Still SEO

Google is explicit that there are no additional requirements to appear in AI Overviews or AI Mode: no special files, no new markup, no separate optimization. The same crawlability, page experience, and helpful content fundamentals decide whether AI features surface and cite your pages. And if you want to limit how they use your content, the existing controls (nosnippet, max-snippet, noindex) still apply.

## Content Strategy

- **Target long-tail keywords**: Less competition, higher intent.
- **Answer real questions**: Mine "People Also Ask" and your own customer emails for content ideas.
- **Keep content current**: Review quarterly. Update facts, screenshots, and dates so pages stay accurate.
- **Build topical authority**: Create clusters of related content around your core topics.

## The Bottom Line

SEO isn't a one-time project. It's an ongoing practice. But getting the fundamentals right from day one gives you a massive advantage over competitors who treat it as an afterthought.

If you'd rather not run this checklist alone, book a free strategy call and we'll walk through exactly where your site stands and what to fix first.

## Sources

- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Google Search Central, HTTPS as a ranking signal**: https://developers.google.com/search/blog/2014/08/https-as-ranking-signal
- **Google Search Central, Mobile-first indexing**: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- **Google Search Central, Title links**: https://developers.google.com/search/docs/appearance/title-link
- **Google Search Central, Structured data introduction**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Google Search Central, AI features and your website**: https://developers.google.com/search/docs/appearance/ai-features
    `.trim(),
  },
  {
    slug: 'brand-identity-investment',
    title: 'Why Brand Identity Is the Best Investment You\'ll Make',
    description: 'Your brand is more than a logo. A strong brand identity builds trust, commands premium pricing, and turns customers into advocates.',
    date: '2026-02-05',
    readTime: '5 min read',
    category: 'Branding',
    image: '/images/blog/brand-identity-investment.webp',
    gradient: 'from-purple-600 via-fuchsia-700 to-pink-800',
    icon: '✨',
    content: `
Most businesses treat branding as decoration. The numbers say otherwise. Kantar's BrandZ ranking values the world's 100 most valuable brands at a combined 13.1 trillion dollars in 2026, up 22% in a single year. Brand is an asset, and like any asset it compounds. Here's what a strong identity actually does for a business, and how to tell when yours is holding you back.

## What Brand Identity Actually Is

Brand identity is the complete visual and verbal system that represents your business. It includes your logo, color palette, typography, voice, messaging, and the feelings people associate with your name.

Think of the world's most valuable brands. You recognize them instantly, not just by their logo, but by their entire visual language and the way they make you feel.

## Why It Matters for Growth

**1. Trust at first sight.** Research from Google found that people form a judgment about a website's visual appeal within 50 milliseconds of seeing it. Stanford's Web Credibility Project, based on studies with more than 4,500 participants, found that people judge credibility largely on visual design. A polished, cohesive brand signals professionalism before anyone reads a word.

**2. Premium pricing.** Kantar measures brand strength partly as pricing power: the ability to charge more than competitors without losing demand. That pricing power is a large part of why the value of the world's strongest brands keeps climbing while weaker competitors fight on price.

**3. Customer loyalty.** Harvard Business Review documented what happened when companies invested in emotional connection with customers: one bank grew product use among its target segment by 70% and new accounts by 40%, and an apparel retailer more than tripled its same-store sales growth. People don't just buy products, they buy into brands.

**4. Marketing efficiency.** When your brand is clear and consistent, every marketing dollar works harder. People remember you. They recognize you. They come back.

## Signs You Need a Brand Refresh

- Your visual identity looks dated or inconsistent across platforms
- Customers can't articulate what makes you different
- You're competing primarily on price rather than value
- Your team isn't sure how to represent the brand consistently

## Where Your Brand Lives: Your Website

You don't need a Fortune 500 budget to put this research to work. For most businesses, the place brand identity meets customers is the website. That's where the 50-millisecond first impression happens, where credibility is judged, and where an inconsistent identity quietly costs you inquiries.

If your current site doesn't look like the business you've actually built, book a free strategy call and we'll show you what a website that earns that trust could look like.

## Sources

- **Kantar BrandZ Most Valuable Global Brands**: https://www.kantar.com/campaigns/brandz/global
- **Tuch et al., first impressions study (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Stanford Web Credibility Project, Guidelines**: https://credibility.stanford.edu/guidelines/index.html
- **Harvard Business Review, The New Science of Customer Emotions**: https://hbr.org/2015/11/the-new-science-of-customer-emotions
    `.trim(),
  },
];

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}
