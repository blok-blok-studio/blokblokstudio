/* ==========================================================================
 * CookieContent.tsx — Cookie Policy page.
 * Fully localized: every user-facing string comes from the "cookies"
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

export function CookieContent() {
  const t = useTranslations('cookies');

  const storageRows = [
    {
      name: 'cookie-consent',
      type: 'localStorage',
      purpose: t('storage_consent_purpose'),
      category: t('cat_essential'),
      duration: t('dur_persistent'),
    },
    {
      name: 'NEXT_LOCALE',
      type: 'Cookie',
      purpose: t('storage_locale_purpose'),
      category: t('cat_essential'),
      duration: t('dur_persistent'),
    },
    {
      name: 'bb_country',
      type: 'Cookie',
      purpose: t('storage_country_purpose'),
      category: t('cat_essential'),
      duration: t('dur_30d'),
    },
  ];

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">{t('title')}</h1>
          <p className="text-gray-400 text-sm sm:text-base">{t('last_updated')}</p>
        </AnimatedSection>

        {/* What are cookies */}
        <AnimatedSection delay={0.1} className="mb-8 sm:mb-12">
          <Card title={t('intro_title')}>
            <p className="text-gray-400 leading-relaxed">{t('intro_content')}</p>
          </Card>
        </AnimatedSection>

        {/* Our use of cookies */}
        <AnimatedSection delay={0.15} className="mb-8 sm:mb-12">
          <Card title={t('our_use_title')}>
            <p className="text-gray-400 leading-relaxed">{t('our_use_content')}</p>
          </Card>
        </AnimatedSection>

        {/* Storage details table */}
        <AnimatedSection delay={0.2} className="mb-8 sm:mb-12">
          <Card title={t('storage_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('storage_intro')}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-white font-medium py-3 pr-4">{t('table_name')}</th>
                    <th className="text-white font-medium py-3 pr-4">{t('table_type')}</th>
                    <th className="text-white font-medium py-3 pr-4">{t('table_purpose')}</th>
                    <th className="text-white font-medium py-3 pr-4">{t('table_category')}</th>
                    <th className="text-white font-medium py-3">{t('table_duration')}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  {storageRows.map((row) => (
                    <tr key={row.name} className="border-b border-white/5">
                      <td className="py-3 pr-4 font-mono text-xs text-gray-300">{row.name}</td>
                      <td className="py-3 pr-4">{row.type}</td>
                      <td className="py-3 pr-4">{row.purpose}</td>
                      <td className="py-3 pr-4">{row.category}</td>
                      <td className="py-3">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-4">{t('storage_note')}</p>
          </Card>
        </AnimatedSection>

        {/* Third-party cookies */}
        <AnimatedSection delay={0.25} className="mb-8 sm:mb-12">
          <Card title={t('third_party_title')}>
            <p className="text-gray-400 leading-relaxed">{t('third_party_content')}</p>
          </Card>
        </AnimatedSection>

        {/* Managing cookies */}
        <AnimatedSection delay={0.3} className="mb-8 sm:mb-12">
          <Card title={t('control_title')}>
            <p className="text-gray-400 leading-relaxed">{t('control_content')}</p>
          </Card>
        </AnimatedSection>

        {/* Policy updates */}
        <AnimatedSection delay={0.35}>
          <Card title={t('updates_title')}>
            <p className="text-gray-400 leading-relaxed">{t('updates_content')}</p>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
