/**
 * ============================================================
 * HOME HERO SECTION — editorial redesign
 * ============================================================
 * Left-aligned typeset hero: oversized serif H1 (the SEO headline),
 * a short standfirst, and two plain CTAs. The wordmark now lives in
 * the navbar, so the hero carries type instead of a logo image.
 *
 * TO EDIT:
 * - Headline → "hero_title" in /src/messages/en.json
 * - Standfirst → "hero_subtitle" in /src/messages/en.json
 * - CTA labels → "hero_cta" / "projects_cta" in /src/messages/en.json
 * ============================================================
 */

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HomeHero() {
  const t = useTranslations('home');

  return (
    <section className="relative px-5 sm:px-6 lg:px-8 pt-36 sm:pt-44 lg:pt-52 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Kicker: studio, city, availability in one quiet line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-label mb-6 sm:mb-8"
        >
          Berlin&nbsp;&nbsp;·&nbsp;&nbsp;Taking on new projects
        </motion.p>

        {/* SEO H1: primary keywords, set large in the serif display face */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ink tracking-tight leading-[1.02] mb-8 sm:mb-10 max-w-4xl"
        >
          {t('hero_title')}
        </motion.h1>

        {/* Standfirst */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed mb-10 sm:mb-12"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* CTAs: one solid rectangular button, one underlined text link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-7 py-4 bg-ink text-paper font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            {t('hero_cta')}
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-ink underline underline-offset-8 decoration-1 decoration-gray-700 hover:decoration-ink transition-colors text-sm sm:text-base"
          >
            {t('projects_cta')}
          </Link>
        </motion.div>
      </div>

      {/* Hairline closing the hero, magazine style */}
      <div className="max-w-6xl mx-auto editorial-rule mt-16 sm:mt-24" />
    </section>
  );
}
