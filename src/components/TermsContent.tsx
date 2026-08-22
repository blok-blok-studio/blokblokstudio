/* ==========================================================================
 * TermsContent.tsx — Terms of Service page.
 * Fully localized: every user-facing string comes from the "terms"
 * translation namespace (with English fallback for untranslated keys).
 * ========================================================================== */

'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-gray-400">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="text-white/40 mt-1">&bull;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TermsContent() {
  const t = useTranslations('terms');

  const sections: Array<{ title: string; content: string }> = [
    { title: t('acceptance_title'), content: t('acceptance_content') },
    { title: t('services_title'), content: t('services_content') },
    { title: t('user_responsibilities_title'), content: t('user_responsibilities_content') },
    { title: t('ip_title'), content: t('ip_content') },
    { title: t('liability_title'), content: t('liability_content') },
    { title: t('governing_law_title'), content: t('governing_law_content') },
  ];

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">{t('title')}</h1>
          <p className="text-gray-400 text-sm sm:text-base">{t('last_updated')}</p>
        </AnimatedSection>

        {sections.map((s, i) => (
          <AnimatedSection key={s.title} delay={0.1 + i * 0.05} className="mb-8 sm:mb-12">
            <Card title={s.title}>
              <p className="text-gray-400 leading-relaxed">{s.content}</p>
            </Card>
          </AnimatedSection>
        ))}

        {/* Dispute resolution */}
        <AnimatedSection delay={0.4} className="mb-8 sm:mb-12">
          <Card title={t('dispute_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('dispute_intro')}</p>
            <Bullets items={[t('dispute_informal'), t('dispute_formal'), t('dispute_eu')]} />
          </Card>
        </AnimatedSection>

        {/* Severability */}
        <AnimatedSection delay={0.45} className="mb-8 sm:mb-12">
          <Card title={t('severability_title')}>
            <p className="text-gray-400 leading-relaxed">{t('severability_content')}</p>
          </Card>
        </AnimatedSection>

        {/* Changes to terms */}
        <AnimatedSection delay={0.5}>
          <Card title={t('changes_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('changes_content')}</p>
            <p className="text-gray-400 leading-relaxed">
              {t('changes_contact')}{' '}
              <a
                href="/contact"
                className="text-white hover:text-white/80 underline transition-colors"
              >
                blokblokstudio.com/contact
              </a>
            </p>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
