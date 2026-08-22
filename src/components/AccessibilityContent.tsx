/* ==========================================================================
 * AccessibilityContent.tsx
 * ==========================================================================
 *
 * Accessibility Statement — Full page content
 *
 * Required disclosures cover the EU European Accessibility Act (EAA,
 * effective 2025-06-28), the US ADA / Section 508, and WCAG 2.2 AA. The
 * statement format follows the EN 301 549 model statement so that any
 * conformity body recognizes the structure.
 *
 * Sections:
 *   1. Hero (title + last updated date)
 *   2. Our commitment
 *   3. Conformance status (WCAG 2.2 AA partial)
 *   4. Standards and laws followed
 *   5. Measures we take
 *   6. Known limitations
 *   7. Feedback and contact
 *   8. Enforcement procedure
 *
 * Fully localized: every user-facing string comes from the "accessibility"
 * translation namespace (with English fallback for untranslated keys).
 * Inline emphasis, code identifiers, and links are expressed as rich-text
 * tags (<strong>, <code>, <link>) resolved via t.rich().
 * ========================================================================== */

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';

const LAST_UPDATED = '2026-05-25';

/* Shared rich-text tag renderers for t.rich() */
const strong = (chunks: React.ReactNode) => (
  <strong className="text-white">{chunks}</strong>
);

const code = (chunks: React.ReactNode) => (
  <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">{chunks}</code>
);

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3 text-gray-300">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span aria-hidden="true" className="text-white/40 mt-1">&bull;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AccessibilityContent() {
  const t = useTranslations('accessibility');

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* 1. HERO */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {t('last_updated', { date: LAST_UPDATED })}
          </p>
        </AnimatedSection>

        {/* 2. COMMITMENT */}
        <AnimatedSection delay={0.1} className="mb-8 sm:mb-12">
          <Card title={t('commitment_title')}>
            <p className="text-gray-300 leading-relaxed">{t('commitment_content')}</p>
          </Card>
        </AnimatedSection>

        {/* 3. CONFORMANCE STATUS */}
        <AnimatedSection delay={0.15} className="mb-8 sm:mb-12">
          <Card title={t('conformance_title')}>
            <p className="text-gray-300 leading-relaxed mb-4">{t('conformance_intro')}</p>
            <p className="text-gray-300 leading-relaxed">
              {t.rich('conformance_status', { strong })}
            </p>
          </Card>
        </AnimatedSection>

        {/* 4. STANDARDS AND LAWS */}
        <AnimatedSection delay={0.2} className="mb-8 sm:mb-12">
          <Card title={t('standards_title')}>
            <Bullets
              items={[
                t.rich('standard_wcag', { strong }),
                t.rich('standard_en301549', { strong }),
                t.rich('standard_eaa', { strong }),
                t.rich('standard_ada', { strong }),
                t.rich('standard_508', { strong }),
              ]}
            />
          </Card>
        </AnimatedSection>

        {/* 5. MEASURES WE TAKE */}
        <AnimatedSection delay={0.25} className="mb-8 sm:mb-12">
          <Card title={t('measures_title')}>
            <p className="text-gray-300 leading-relaxed mb-4">{t('measures_intro')}</p>
            <Bullets
              items={[
                t.rich('measure_landmarks', { code }),
                t('measure_skip_link'),
                t('measure_focus'),
                t('measure_alt_text'),
                t.rich('measure_forms', { code }),
                t('measure_dialogs'),
                t.rich('measure_reduced_motion', { code }),
                t('measure_contrast'),
                t('measure_rtl'),
                t('measure_languages'),
              ]}
            />
          </Card>
        </AnimatedSection>

        {/* 6. KNOWN LIMITATIONS */}
        <AnimatedSection delay={0.3} className="mb-8 sm:mb-12">
          <Card title={t('limitations_title')}>
            <p className="text-gray-300 leading-relaxed mb-4">{t('limitations_intro')}</p>
            <Bullets
              items={[
                t.rich('limitation_third_party', { strong }),
                t.rich('limitation_motion', { strong, code }),
                t.rich('limitation_language', { strong }),
              ]}
            />
          </Card>
        </AnimatedSection>

        {/* 7. FEEDBACK & CONTACT */}
        <AnimatedSection delay={0.35} className="mb-8 sm:mb-12">
          <Card title={t('feedback_title')}>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t.rich('feedback_intro', { strong })}
            </p>
            <Bullets
              items={[
                t.rich('feedback_email', {
                  strong,
                  link: (chunks) => (
                    <a
                      href="/contact"
                      className="text-white underline hover:text-gray-200 transition-colors"
                    >
                      {chunks}
                    </a>
                  ),
                }),
                t.rich('feedback_form', {
                  strong,
                  link: (chunks) => (
                    <Link
                      href="/contact"
                      className="text-white underline hover:text-gray-200 transition-colors"
                    >
                      {chunks}
                    </Link>
                  ),
                }),
              ]}
            />
          </Card>
        </AnimatedSection>

        {/* 8. ENFORCEMENT */}
        <AnimatedSection delay={0.4} className="mb-8 sm:mb-12">
          <Card title={t('enforcement_title')}>
            <p className="text-gray-300 leading-relaxed mb-4">{t('enforcement_intro')}</p>
            <Bullets
              items={[
                t.rich('enforcement_eu', { strong }),
                t.rich('enforcement_germany', {
                  strong,
                  link: (chunks) => (
                    <a
                      href="https://www.bundesfachstelle-barrierefreiheit.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline hover:text-gray-200 transition-colors"
                    >
                      {chunks}
                    </a>
                  ),
                }),
                t.rich('enforcement_us', { strong }),
              ]}
            />
          </Card>
        </AnimatedSection>

        {/* PREPARATION NOTE */}
        <AnimatedSection delay={0.45}>
          <Card title={t('preparation_title')}>
            <p className="text-gray-300 leading-relaxed">
              {t('preparation_content', { date: LAST_UPDATED })}
            </p>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
