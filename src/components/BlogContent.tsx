/**
 * ============================================================================
 * BlogContent.tsx — Blog / Insights Page Component
 * ============================================================================
 *
 * PURPOSE:
 *   Renders the blog/insights listing page with:
 *     1. A page header (title + subtitle)
 *     2. A grid of blog post cards
 *     3. Each card has a placeholder image, category, date, title, excerpt
 *
 * BLOG POST DATA:
 *   All posts are hardcoded in the `blogPosts` array below.
 *   Each post has: slug, title, excerpt, category, date, readTime.
 *
 * TO EDIT POSTS:
 *   - Change any field in the blogPosts array
 *   - Add a post by adding a new object
 *   - Remove a post by deleting its object
 *
 * NOTE:
 *   Individual blog post pages (/blog/[slug]) are NOT yet implemented.
 *   The cards currently link to "#". To add individual post pages, create
 *   /src/app/blog/[slug]/page.tsx similar to the projects detail page.
 *
 * TRANSLATIONS:
 *   Uses the "blog" namespace:
 *     - blog.title    → page heading
 *     - blog.subtitle → page subheading
 *
 * REFERENCED FILES / DEPENDENCIES:
 *   - ./AnimatedSection → scroll-triggered reveal animation wrapper
 *   - next-intl         → translations (useTranslations)
 *   - framer-motion     → hover animations (motion.div)
 *
 * ============================================================================
 */

'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';

/**
 * ---------------------------------------------------------------------------
 * Blog Posts Data Array (Hardcoded)
 * ---------------------------------------------------------------------------
 * Each post object contains:
 *   - slug:     URL-safe identifier (for future individual post pages)
 *   - title:    Post headline
 *   - excerpt:  Short summary shown on the card
 *   - category: Topic tag displayed on the card
 *   - date:     Publication date string
 *   - readTime: Estimated reading time
 *
 * TO ADD A POST: Add a new object with all fields.
 * TO EDIT: Change fields directly.
 * TO REMOVE: Delete the object from the array.
 * ---------------------------------------------------------------------------
 */
const blogPosts = [
  {
    slug: 'future-of-web-design-2025',
    title: 'The Future of Web Design in 2025',
    excerpt: 'Exploring the trends shaping digital experiences — from AI-driven personalization to immersive 3D interfaces and beyond.',
    category: 'Design',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
  },
  {
    slug: 'building-brand-identity-from-scratch',
    title: 'Building a Brand Identity from Scratch',
    excerpt: 'A step-by-step guide to creating a memorable brand that resonates with your audience and stands the test of time.',
    category: 'Branding',
    date: 'Jan 8, 2025',
    readTime: '7 min read',
  },
  {
    slug: 'why-performance-matters',
    title: 'Why Website Performance Matters More Than Ever',
    excerpt: 'How page speed impacts SEO, conversion rates, and user experience — and what you can do to optimize yours.',
    category: 'Development',
    date: 'Dec 28, 2024',
    readTime: '4 min read',
  },
  {
    slug: 'color-psychology-in-digital-design',
    title: 'Color Psychology in Digital Design',
    excerpt: 'Understanding how color choices influence user behavior, trust, and emotional connection with your brand.',
    category: 'Design',
    date: 'Dec 15, 2024',
    readTime: '6 min read',
  },
  {
    slug: 'mobile-first-design-principles',
    title: 'Mobile-First Design Principles That Actually Work',
    excerpt: 'Practical tips for designing experiences that shine on small screens and scale beautifully to desktop.',
    category: 'Development',
    date: 'Dec 5, 2024',
    readTime: '5 min read',
  },
  {
    slug: 'roi-of-good-design',
    title: 'The ROI of Good Design: Numbers That Matter',
    excerpt: 'Real case studies showing how investing in design directly translates to business growth and revenue.',
    category: 'Strategy',
    date: 'Nov 20, 2024',
    readTime: '8 min read',
  },
];

export function BlogContent() {
  const t = useTranslations('blog');

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ================================================================
            SECTION 1: Page Header
            ================================================================
            TO EDIT: Change "blog.title" and "blog.subtitle" in
            your translation files.
        */}
        <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* ================================================================
            SECTION 2: Blog Post Grid
            ================================================================
            Responsive: 1 col mobile, 2 cols sm, 3 cols lg.
            Each card is staggered with AnimatedSection.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogPosts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer h-full"
              >
                <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col">

                  {/* Image placeholder — gradient with grid pattern.
                      TO REPLACE: Add an `image` field to post data and
                      use <Image src={post.image} ... /> */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                  </div>

                  {/* Card content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    {/* Category + read time */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-gray-600">{post.date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
