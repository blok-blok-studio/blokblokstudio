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
 * Content is intentionally hardcoded in English on this page rather than
 * pulled through next-intl — accessibility statements must remain accurate
 * and reviewable in a single canonical form, and translations should be
 * vetted by a native speaker before being shipped.
 * ========================================================================== */

import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';

const LAST_UPDATED = '2026-05-25';

export function AccessibilityContent() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* 1. HERO */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Accessibility Statement
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Last updated: {LAST_UPDATED}
          </p>
        </AnimatedSection>

        {/* 2. COMMITMENT */}
        <AnimatedSection delay={0.1} className="mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Our commitment</h2>
            <p className="text-gray-300 leading-relaxed">
              Blok Blok Studio is committed to ensuring digital accessibility for
              people with disabilities. We are continually improving the user
              experience for everyone and applying the relevant accessibility
              standards across our website and the websites we build for clients.
            </p>
          </div>
        </AnimatedSection>

        {/* 3. CONFORMANCE STATUS */}
        <AnimatedSection delay={0.15} className="mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Conformance status</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Web Content Accessibility Guidelines (WCAG) define requirements
              for designers and developers to improve accessibility for people with
              disabilities. They define three levels of conformance: Level A, Level
              AA, and Level AAA.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">blokblokstudio.com is partially conformant with WCAG 2.2 level AA.</strong>{' '}
              &ldquo;Partially conformant&rdquo; means that some parts of the content do not
              fully conform to the accessibility standard. See the known
              limitations section below for details.
            </p>
          </div>
        </AnimatedSection>

        {/* 4. STANDARDS AND LAWS */}
        <AnimatedSection delay={0.2} className="mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Standards and laws we follow</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">WCAG 2.2 Level AA</strong> — the
                  international baseline for web accessibility maintained by the
                  W3C.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">EN 301 549</strong> — the
                  European harmonized standard for ICT accessibility that
                  underpins the European Accessibility Act.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">EU European Accessibility Act (Directive 2019/882)</strong>{' '}
                  — applicable to consumer-facing digital services in the EU since
                  28 June 2025.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">US Americans with Disabilities Act (ADA), Title III</strong>{' '}
                  — accessibility obligations for public-facing commercial
                  websites in the United States.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">Section 508 of the US Rehabilitation Act</strong>{' '}
                  — requirements for federal agencies and contractors, which we
                  treat as a baseline for federal-adjacent work.
                </span>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* 5. MEASURES WE TAKE */}
        <AnimatedSection delay={0.25} className="mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Measures we take</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Accessibility is part of how we design and build, not a one-time
              audit. Specifically, on this site:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Semantic HTML landmarks (<code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">main</code>, <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">nav</code>, <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">header</code>, <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">footer</code>) on every page.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>A &ldquo;skip to main content&rdquo; link for keyboard users.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Visible focus indicators on every interactive element.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Text alternatives on all meaningful images.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Forms with associated labels, required-field announcements, and inline error messages exposed via <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">aria-describedby</code> and <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">role=&ldquo;alert&rdquo;</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Mobile menu and modal dialogs with keyboard focus management and Escape-to-close behavior.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Respect for the <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">prefers-reduced-motion</code> setting in your operating system.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Color contrast meeting or exceeding WCAG AA (4.5:1 for body text).</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Right-to-left layout for Arabic, and a language switcher that announces each option in its native language and direction.</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>Site available in 19 languages so non-English speakers can use it in the language they think in.</span>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* 6. KNOWN LIMITATIONS */}
        <AnimatedSection delay={0.3} className="mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Known limitations</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Despite our best efforts, some content on this site may not be fully
              accessible yet. Known issues we are working to resolve:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">Embedded third-party content</strong> —
                  the Cloudflare Turnstile CAPTCHA and the Cal.com booking iframe
                  inherit their own accessibility behavior from the upstream
                  vendor. We track their conformance status with each vendor.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">Decorative motion</strong> —
                  ambient background animations are disabled when{' '}
                  <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">prefers-reduced-motion</code>{' '}
                  is set, but a small number of cursor-magnetic micro-interactions
                  may still play.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">Statement language</strong> —
                  this statement is currently maintained in English only. The
                  site itself is localized into 19 languages.
                </span>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* 7. FEEDBACK & CONTACT */}
        <AnimatedSection delay={0.35} className="mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Feedback and contact</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you encounter an accessibility barrier on blokblokstudio.com, or
              need information from this site in an alternative format, please
              contact us. We aim to respond to accessibility feedback within
              <strong className="text-white"> five business days</strong>.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">Email:</strong>{' '}
                  <a
                    href="mailto:hello@blokblokstudio.com?subject=Accessibility%20feedback"
                    className="text-white underline hover:text-gray-200 transition-colors"
                  >
                    hello@blokblokstudio.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">Web form:</strong>{' '}
                  <Link
                    href="/contact"
                    className="text-white underline hover:text-gray-200 transition-colors"
                  >
                    Contact page
                  </Link>{' '}
                  — please mention &ldquo;accessibility&rdquo; in your message.
                </span>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* 8. ENFORCEMENT */}
        <AnimatedSection delay={0.4} className="mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Enforcement procedure</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Blok Blok Studio is registered in Germany. If you are not satisfied
              with our response to your accessibility feedback, you can escalate
              under your local enforcement framework:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">European Union</strong> — the
                  market surveillance authority of the EU member state in which
                  you are located. The EAA designates a national authority in
                  each member state.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">Germany</strong> — the
                  Bundesfachstelle für Barrierefreiheit{' '}
                  (<a
                    href="https://www.bundesfachstelle-barrierefreiheit.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-gray-200 transition-colors"
                  >
                    bundesfachstelle-barrierefreiheit.de
                  </a>).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-white/40 mt-1">•</span>
                <span>
                  <strong className="text-white">United States</strong> — the
                  US Department of Justice Civil Rights Division for ADA
                  complaints; the US Access Board for Section 508.
                </span>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* PREPARATION NOTE */}
        <AnimatedSection delay={0.45}>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">How this statement was prepared</h2>
            <p className="text-gray-300 leading-relaxed">
              This statement was prepared on {LAST_UPDATED} via a self-evaluation
              of the site against WCAG 2.2 AA. The evaluation combined an
              automated review of the live site with a manual review of the
              codebase (semantic structure, keyboard navigation, focus management,
              ARIA usage, color contrast, motion handling, and locale direction).
              We re-review the site after every significant release.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
