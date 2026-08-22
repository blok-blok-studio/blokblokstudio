'use client';

import { useLocale } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';

/**
 * Impressum (§ 5 DDG legal notice) — required for commercial websites
 * addressing the German market. Renders German when the visitor's chosen
 * locale is German, English for every other locale; the German version is
 * the legally operative text either way. Entity details are the Nevada
 * Secretary of State / IRS filings of Blok Blok Studio LLC.
 */

const COPY = {
  de: {
    subtitle: 'Angaben gemäß § 5 DDG',
    provider_title: 'Diensteanbieter',
    provider_country: 'Vereinigte Staaten von Amerika',
    registered: 'Registriert beim Nevada Secretary of State (USA) als Limited Liability Company.',
    represented_title: 'Vertreten durch',
    represented: 'Chase Haynes (Geschäftsführender Gesellschafter / Managing Member)',
    responsible: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Chase Haynes',
    contact_title: 'Kontakt',
    email_label: 'E-Mail',
    phone_label: 'Telefon',
    odr_title: 'EU-Streitschlichtung',
    odr_1: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
    odr_2: 'Unsere E-Mail-Adresse finden Sie oben im Impressum.',
    odr_3: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    liability_title: 'Haftung für Inhalte und Links',
    liability_1: 'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Für die Inhalte externer Links übernehmen wir keine Gewähr; für den Inhalt der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.',
    note: '',
  },
  en: {
    subtitle: 'Legal notice pursuant to § 5 DDG (German Digital Services Act)',
    provider_title: 'Service Provider',
    provider_country: 'United States of America',
    registered: 'Registered with the Nevada Secretary of State (USA) as a Limited Liability Company.',
    represented_title: 'Represented by',
    represented: 'Chase Haynes (Managing Member)',
    responsible: 'Responsible for content pursuant to § 18 (2) MStV: Chase Haynes',
    contact_title: 'Contact',
    email_label: 'Email',
    phone_label: 'Phone',
    odr_title: 'EU Dispute Resolution',
    odr_1: 'The European Commission provides a platform for online dispute resolution (ODR):',
    odr_2: 'Our email address can be found above.',
    odr_3: 'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
    liability_title: 'Liability for Content and Links',
    liability_1: 'As a service provider we are responsible for our own content on these pages under general law. We assume no liability for the content of external links; the respective provider or operator is always responsible for the content of linked pages.',
    note: 'The German version of this legal notice is the legally operative text.',
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-400 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function ImpressumContent() {
  const locale = useLocale();
  const c = locale === 'de' ? COPY.de : COPY.en;

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Impressum</h1>
          <p className="text-gray-400">{c.subtitle}</p>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection>
            <Section title={c.provider_title}>
              <p>
                Blok Blok Studio LLC
                <br />
                400 Dorla Ct, PB 12187
                <br />
                Zephyr Cove, NV 89448
                <br />
                {c.provider_country}
              </p>
              <p>{c.registered}</p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <Section title={c.represented_title}>
              <p>{c.represented}</p>
              <p>{c.responsible}</p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Section title={c.contact_title}>
              <p>
                {c.email_label}:{' '}
                {/* §5 TMG requires a reachable email address here. A contact
                    form does not satisfy it, so this stays even though the
                    address is deliberately absent from the marketing pages. */}
                <a href="mailto:hello@blokblokstudio.com" className="text-white underline hover:text-gray-300">
                  hello@blokblokstudio.com
                </a>
                <br />
                {c.phone_label}: +49 162 7055848
              </p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <Section title={c.odr_title}>
              <p>
                {c.odr_1}{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-gray-300"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . {c.odr_2}
              </p>
              <p>{c.odr_3}</p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Section title={c.liability_title}>
              <p>{c.liability_1}</p>
              {c.note && <p className="text-gray-500 text-sm">{c.note}</p>}
            </Section>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
