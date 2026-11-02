'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';

/**
 * Impressum (§ 5 DDG legal notice), required for commercial websites
 * addressing the German market. Copy comes from messages/<locale>.json under
 * `impressum`; the German version is the legally operative text either way. Entity details are the Nevada
 * Secretary of State / IRS filings of Blok Blok Studio LLC.
 */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-400 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function ImpressumContent() {
  const t = useTranslations('impressum');

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Impressum</h1>
          <p className="text-gray-400">{t('subtitle')}</p>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection>
            <Section title={t('provider_title')}>
              <p>
                Blok Blok Studio LLC
                <br />
                400 Dorla Ct, PB 12187
                <br />
                Zephyr Cove, NV 89448
                <br />
                {t('provider_country')}
              </p>
              <p>{t('registered')}</p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <Section title={t('represented_title')}>
              <p>{t('represented')}</p>
              <p>{t('responsible')}</p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Section title={t('contact_title')}>
              <p>
                {t('email_label')}:{' '}
                {/* §5 TMG requires a reachable email address here. A contact
                    form does not satisfy it, so this stays even though the
                    address is deliberately absent from the marketing pages. */}
                <a href="mailto:hello@blokblokstudio.com" className="text-white underline hover:text-gray-300">
                  hello@blokblokstudio.com
                </a>
                <br />
                {t('phone_label')}: +49 162 7055848
              </p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <Section title={t('odr_title')}>
              <p>
                {t('odr_1')}{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-gray-300"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . {t('odr_2')}
              </p>
              <p>{t('odr_3')}</p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Section title={t('liability_title')}>
              <p>{t('liability_1')}</p>
              <p className="text-gray-500 text-sm">{t('note')}</p>
            </Section>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
