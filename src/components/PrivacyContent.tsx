/* ==========================================================================
 * PrivacyContent.tsx — Privacy Policy page.
 * Fully localized: every user-facing string comes from the "privacy"
 * translation namespace (with English fallback for untranslated keys).
 * ========================================================================== */

'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import Link from 'next/link';

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

export function PrivacyContent() {
  const t = useTranslations('privacy');

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">{t('title')}</h1>
          <p className="text-gray-400 text-sm sm:text-base">{t('last_updated')}</p>
        </AnimatedSection>

        {/* Introduction */}
        <AnimatedSection delay={0.1} className="mb-8 sm:mb-12">
          <Card title={t('intro_title')}>
            <p className="text-gray-400 leading-relaxed">{t('intro_content')}</p>
          </Card>
        </AnimatedSection>

        {/* What data we collect */}
        <AnimatedSection delay={0.15} className="mb-8 sm:mb-12">
          <Card title={t('data_collection_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('data_collection_intro')}</p>
            <Bullets
              items={[
                t('data_item_name'),
                t('data_item_email'),
                t('data_item_phone'),
                t('data_item_industry'),
                t('data_item_website'),
                t('data_item_problem'),
                t('data_item_budget'),
                t('data_item_marketing_consent'),
                t('data_item_ip'),
              ]}
            />
          </Card>
        </AnimatedSection>

        {/* How we use your data */}
        <AnimatedSection delay={0.2} className="mb-8 sm:mb-12">
          <Card title={t('data_use_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('data_use_intro')}</p>
            <Bullets
              items={[t('use_item_respond'), t('use_item_marketing'), t('use_item_improve'), t('use_item_legal')]}
            />
            <p className="text-gray-400 leading-relaxed mt-4">{t('marketing_double_optin')}</p>
          </Card>
        </AnimatedSection>

        {/* Third-party services */}
        <AnimatedSection delay={0.25} className="mb-8 sm:mb-12">
          <Card title={t('third_parties_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('third_parties_intro')}</p>
            <Bullets
              items={[
                t('third_party_resend'),
                t('third_party_vercel'),
                t('third_party_slack'),
                t('third_party_turnstile'),
                t('third_party_cal'),
                t('third_party_meta'),
                t('third_party_google'),
              ]}
            />
            <p className="text-gray-400 leading-relaxed mt-4">{t('third_parties_note')}</p>
            <p className="text-gray-400 leading-relaxed mt-4">{t('third_party_pixels')}</p>
          </Card>
        </AnimatedSection>

        {/* Data retention */}
        <AnimatedSection delay={0.3} className="mb-8 sm:mb-12">
          <Card title={t('retention_title')}>
            <p className="text-gray-400 leading-relaxed">{t('retention_content')}</p>
          </Card>
        </AnimatedSection>

        {/* Your GDPR rights */}
        <AnimatedSection delay={0.35} className="mb-8 sm:mb-12">
          <Card title={t('your_rights_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('your_rights_intro')}</p>
            <Bullets
              items={[
                t('right_access'),
                t('right_correct'),
                t('right_delete'),
                t('right_object'),
                t('right_export'),
                t('right_withdraw'),
              ]}
            />
            <p className="text-gray-400 leading-relaxed mt-4">
              {t('your_rights_cta')}{' '}
              <Link href="/data-rights" className="text-white hover:text-white/80 underline transition-colors">
                {t('your_rights_link')}
              </Link>
            </p>
          </Card>
        </AnimatedSection>

        {/* Legal basis */}
        <AnimatedSection delay={0.4} className="mb-8 sm:mb-12">
          <Card title={t('legal_basis_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('legal_basis_intro')}</p>
            <Bullets items={[t('legal_basis_consent'), t('legal_basis_contract'), t('legal_basis_interest')]} />
            <p className="text-gray-400 leading-relaxed mt-4">{t('legal_basis_withdraw')}</p>
          </Card>
        </AnimatedSection>

        {/* International transfers */}
        <AnimatedSection delay={0.45} className="mb-8 sm:mb-12">
          <Card title={t('transfers_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('transfers_intro')}</p>
            <Bullets items={[t('transfers_vercel'), t('transfers_resend')]} />
            <p className="text-gray-400 leading-relaxed mt-4">{t('transfers_note')}</p>
          </Card>
        </AnimatedSection>

        {/* Supervisory authority */}
        <AnimatedSection delay={0.5} className="mb-8 sm:mb-12">
          <Card title={t('authority_title')}>
            <p className="text-gray-400 leading-relaxed">{t('authority_content')}</p>
          </Card>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection delay={0.55}>
          <Card title={t('contact_title')}>
            <p className="text-gray-400 leading-relaxed mb-4">{t('contact_content')}</p>
            <p className="text-white">
              <a href="/contact" className="hover:text-white/80 transition-colors">
                blokblokstudio.com/contact
              </a>
            </p>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
