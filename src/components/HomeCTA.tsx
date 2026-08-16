/* ==========================================================================
 * HomeCTA.tsx — Call-to-Action Section, Homepage (bottom)
 * ==========================================================================
 * Editorial redesign: a typeset closing statement between hairlines.
 * Large serif heading, short subheading, one solid ink button.
 *
 * Text lives in the "home" translation namespace:
 *   home.cta_heading / home.cta_subheading / home.cta_button
 * ========================================================================== */

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';

export function HomeCTA() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="editorial-rule pt-10 sm:pt-16 pb-4 sm:pb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-6 sm:mb-8 max-w-3xl">
              {t('cta_heading')}
            </h2>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl mb-8 sm:mb-10">
              {t('cta_subheading')}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-ink text-paper font-medium text-base sm:text-lg hover:bg-gray-100 transition-colors"
            >
              {t('cta_button')}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
