'use client';

import { AnimatedSection } from './AnimatedSection';

/**
 * Impressum (§ 5 DDG legal notice) — required for commercial websites
 * addressing the German market. Bilingual: German is the legally operative
 * text, English follows for international visitors. Entity details are the
 * Nevada Secretary of State / IRS filings of Blok Blok Studio LLC.
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
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Impressum</h1>
          <p className="text-gray-400">Angaben gemäß § 5 DDG / Legal Notice</p>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection>
            <Section title="Diensteanbieter / Service Provider">
              <p>
                Blok Blok Studio LLC
                <br />
                400 Dorla Ct, PB 12187
                <br />
                Zephyr Cove, NV 89448
                <br />
                Vereinigte Staaten von Amerika / United States of America
              </p>
              <p>
                Registriert beim Nevada Secretary of State (USA) als Limited Liability Company.
                <br />
                <span className="text-gray-500">
                  Registered with the Nevada Secretary of State (USA) as a Limited Liability Company.
                </span>
              </p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <Section title="Vertreten durch / Represented by">
              <p>
                Chase Haynes (Geschäftsführender Gesellschafter / Managing Member)
              </p>
              <p>
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Chase Haynes
                <br />
                <span className="text-gray-500">Responsible for content pursuant to § 18 (2) MStV: Chase Haynes</span>
              </p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Section title="Kontakt / Contact">
              <p>
                E-Mail:{' '}
                <a href="mailto:hello@blokblokstudio.com" className="text-white underline hover:text-gray-300">
                  hello@blokblokstudio.com
                </a>
                <br />
                Telefon / Phone: +49 162 7055848
              </p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <Section title="EU-Streitschlichtung / EU Dispute Resolution">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-gray-300"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
              <p className="text-gray-500">
                The European Commission provides a platform for online dispute resolution (ODR), linked above.
                We are neither willing nor obliged to participate in dispute resolution proceedings before a
                consumer arbitration board.
              </p>
            </Section>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Section title="Haftung für Inhalte und Links / Liability">
              <p>
                Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Für die Inhalte externer Links übernehmen wir keine Gewähr; für den Inhalt der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
              </p>
              <p className="text-gray-500">
                As a service provider we are responsible for our own content on these pages under general law.
                We assume no liability for the content of external links; the respective provider or operator
                is always responsible for the content of linked pages.
              </p>
            </Section>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
