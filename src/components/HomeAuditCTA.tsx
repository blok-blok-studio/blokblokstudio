'use client';

/**
 * Homepage strategy-call CTA — editorial redesign.
 * Flat panel with an orange rule at the top; no glow, gradients, or pulse.
 * Text lives in "home": audit_badge / audit_heading / audit_subheading /
 * audit_button. Links to /call.
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';

export function HomeAuditCTA() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="border border-white/15 border-t-2 border-t-accent bg-white/[0.02] p-8 sm:p-12 md:p-16">
            <p className="section-label mb-4 sm:mb-6" style={{ color: 'var(--color-accent-text)' }}>
              {t('audit_badge')}
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 sm:mb-6 leading-tight">
              {t('audit_heading')}
            </h2>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl mb-8 sm:mb-10 leading-relaxed">
              {t('audit_subheading')}
            </p>

            <Link
              href="/call"
              className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-ink text-paper font-medium text-base sm:text-lg hover:bg-gray-100 transition-colors"
            >
              {t('audit_button')}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
