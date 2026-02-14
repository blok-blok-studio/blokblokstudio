/**
 * ============================================================================
 * ServicesContent.tsx — Full /services Page Component
 * ============================================================================
 *
 * PURPOSE:
 *   Renders the entire Services page. This includes:
 *     1. A page header (title + subtitle)
 *     2. A 6-card grid of services, each with an icon, title, and description
 *     3. A 5-step process timeline (numbered circles, connected by a line on desktop)
 *     4. A CTA button linking to /contact
 *
 * TRANSLATIONS:
 *   All user-facing text comes from the "services" namespace in your
 *   translation JSON files (e.g., messages/en.json under "services").
 *   Keys used:
 *     - services.title              → page heading
 *     - services.subtitle           → page subheading
 *     - services.service_1_title    → title for service card 1 (through service_6_title)
 *     - services.service_1_desc     → description for service card 1 (through service_6_desc)
 *     - services.process_title      → heading above the process timeline
 *     - services.step_1_title       → title for step 1 (through step_5_title)
 *     - services.step_1_desc        → description for step 1 (through step_5_desc)
 *
 * TO EDIT TEXT:
 *   - Page title/subtitle → edit "services.title" / "services.subtitle" in translation files
 *   - Service card titles → edit "services.service_N_title" (N = 1..6) in translation files
 *   - Service card descriptions → edit "services.service_N_desc" (N = 1..6) in translation files
 *   - Process step titles → edit "services.step_N_title" (N = 1..5) in translation files
 *   - Process step descriptions → edit "services.step_N_desc" (N = 1..5) in translation files
 *   - CTA button text ("Start Your Project") → hardcoded below, search for that string
 *
 * TO EDIT ICONS:
 *   - Service card icons are inline SVGs defined in the `serviceIcons` array below.
 *   - Each SVG corresponds to a service card (index 0 = service 1, etc.).
 *   - Replace the <svg> element at the desired index to change that card's icon.
 *
 * REFERENCED FILES / DEPENDENCIES:
 *   - ./AnimatedSection   → scroll-triggered reveal animation wrapper
 *   - ./MagneticButton    → hover-magnetic effect wrapper for the CTA button
 *   - next-intl           → i18n translation hook (useTranslations)
 *   - framer-motion       → animation library (motion.div for hover effects)
 *   - next/link           → client-side routing for the CTA link
 *
 * STYLING:
 *   - Uses Tailwind CSS utility classes throughout.
 *   - "glass-card" is a custom utility class (defined in your global CSS) for
 *     the frosted-glass card look.
 *   - Responsive breakpoints: sm (640px), md (768px), lg (1024px).
 *
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from './MagneticButton';

/**
 * ---------------------------------------------------------------------------
 * Service Icons Array
 * ---------------------------------------------------------------------------
 * Each element is an inline SVG icon displayed inside the corresponding
 * service card. The order matches the service index (0-based):
 *   [0] → Monitor icon    (Web Development / Design)
 *   [1] → Palette icon    (Branding / Identity)
 *   [2] → Phone icon      (Mobile App Development)
 *   [3] → Pie chart icon  (Analytics / Strategy)
 *   [4] → Layout icon     (UI/UX Design)
 *   [5] → Search icon     (SEO / Marketing)
 *
 * TO CHANGE AN ICON:
 *   Replace the entire <svg>...</svg> at the desired index.
 *   Keep className="w-7 h-7" for consistent sizing, or adjust as needed.
 * ---------------------------------------------------------------------------
 */
const serviceIcons = [
  /* Icon 0: Monitor / Desktop — represents web design or development */
  <svg key="1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  /* Icon 1: Palette / Paint — represents branding or creative services */
  <svg key="2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  /* Icon 2: Smartphone — represents mobile app development */
  <svg key="3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  /* Icon 3: Pie Chart — represents analytics or data-driven strategy */
  <svg key="4" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
  /* Icon 4: Layout / Grid — represents UI/UX design */
  <svg key="5" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  /* Icon 5: Magnifying Glass — represents SEO or research */
  <svg key="6" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
];

/**
 * ---------------------------------------------------------------------------
 * ServicesContent Component
 * ---------------------------------------------------------------------------
 * Main export. Renders the full /services page layout.
 * ---------------------------------------------------------------------------
 */
function FAQAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-white/5 rounded-2xl overflow-hidden transition-colors ${open ? 'bg-white/[0.03]' : 'bg-transparent hover:bg-white/[0.02]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
      >
        <span className="text-sm sm:text-base font-medium">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-400 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

export function ServicesContent({ faqs }: { faqs?: { question: string; answer: string }[] }) {
  /**
   * Translation hook — pulls all keys from the "services" namespace.
   * To change any displayed text, edit your translation JSON files
   * (e.g., messages/en.json → "services": { ... }).
   */
  const t = useTranslations('services');

  /**
   * Build the array of 6 service objects by looping 1..6 and pulling
   * the translated title + description for each, paired with its icon.
   *
   * TO ADD OR REMOVE SERVICES:
   *   1. Adjust the number in Array.from({ length: N })
   *   2. Add/remove matching translation keys (service_N_title, service_N_desc)
   *   3. Add/remove matching SVG icons in the serviceIcons array above
   */
  const services = Array.from({ length: 6 }, (_, i) => ({
    title: t(`service_${i + 1}_title` as 'service_1_title'),
    desc: t(`service_${i + 1}_desc` as 'service_1_desc'),
    icon: serviceIcons[i],
  }));

  /**
   * Build the array of 5 process steps by looping 1..5 and pulling
   * the translated title + description for each.
   *
   * TO ADD OR REMOVE STEPS:
   *   1. Adjust the number in Array.from({ length: N })
   *   2. Add/remove matching translation keys (step_N_title, step_N_desc)
   *   3. Update the grid columns in the JSX below if needed
   *      (currently lg:grid-cols-5 for 5 steps)
   */
  const steps = Array.from({ length: 5 }, (_, i) => ({
    title: t(`step_${i + 1}_title` as 'step_1_title'),
    desc: t(`step_${i + 1}_desc` as 'step_1_desc'),
  }));

  return (
    /**
     * Outer section wrapper.
     * - pt-24 / sm:pt-32 → top padding (leaves room for the fixed navbar)
     * - pb-16 / sm:pb-24 → bottom padding
     * - px-5 / sm:px-6 / lg:px-8 → horizontal padding
     */
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      {/* Max-width container — keeps content centered on wide screens */}
      <div className="max-w-7xl mx-auto">

        {/* ================================================================
            SECTION 1: Page Header (Title + Subtitle)
            ================================================================
            AnimatedSection adds a scroll-triggered fade/slide-in animation.
            TO EDIT: Change "services.title" and "services.subtitle" in
            your translation files.
        */}
        <AnimatedSection className="text-center mb-14 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* ================================================================
            SECTION 2: Services Grid (6 Cards)
            ================================================================
            Responsive grid: 1 column on mobile, 2 on sm, 3 on lg.
            Each card has a staggered entrance animation (delay = i * 0.1s).
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24 lg:mb-32">
          {services.map((service, i) => (
            /* AnimatedSection wraps each card for scroll-triggered reveal */
            <AnimatedSection key={i} delay={i * 0.1}>
              {/*
                motion.div adds a hover animation:
                  - y: -8 → moves the card up 8px on hover
                  - scale: 1.02 → slightly enlarges the card
                The "glass-card" class applies the frosted-glass background style.
              */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full group cursor-pointer"
              >
                {/* Icon container — rounded square with subtle background */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-white/10 transition-colors">
                  {/* The inline SVG icon — changes from gray to white on card hover */}
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                {/* Service title — from translation key "service_N_title" */}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                {/* Service description — from translation key "service_N_desc" */}
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {service.desc}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* ================================================================
            SECTION 3: Process Timeline Header
            ================================================================
            Heading for the 5-step process section below.
            TO EDIT: Change "services.process_title" in translation files.
        */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            {t('process_title')}
          </h2>
        </AnimatedSection>

        {/* ================================================================
            SECTION 4: Process Timeline (5 Steps)
            ================================================================
            Shows 5 numbered circles in a row. On desktop (lg+), a horizontal
            gradient line connects the circles behind them. On mobile, the
            steps wrap into a 2-column grid.

            TO EDIT STEP TEXT: Change "services.step_N_title" and
            "services.step_N_desc" in your translation files.
        */}
        <div className="relative mb-16 sm:mb-24">
          {/*
            Horizontal connecting line — only visible on desktop (lg+).
            Positioned behind the step circles using absolute positioning.
            The gradient fades from transparent → white/10 → transparent.
          */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/*
            Steps grid:
            - 2 columns on mobile (grid-cols-2)
            - 3 columns on sm (sm:grid-cols-3)
            - 5 columns on lg (lg:grid-cols-5) — one column per step
          */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                {/*
                  Individual step container.
                  The 5th step (i === 4) gets special classes to center it
                  when it would otherwise sit alone in a 2-col grid row on mobile.
                */}
                <div className={`text-center relative ${i === 4 ? 'col-span-2 sm:col-span-1 max-w-[200px] mx-auto sm:max-w-none' : ''}`}>
                  {/*
                    Numbered circle — shows "01" through "05".
                    Has a hover scale animation via motion.div.
                    z-10 ensures it sits above the horizontal connecting line.
                  */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full glass-card flex items-center justify-center mx-auto mb-4 sm:mb-6 relative z-10"
                  >
                    {/* Step number, zero-padded (01, 02, 03, etc.) */}
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                  {/* Step title — from translation key "step_N_title" */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2">{step.title}</h3>
                  {/* Step description — from translation key "step_N_desc" */}
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* ================================================================
            SECTION 5: Frequently Asked Questions
            ================================================================ */}
        {faqs && faqs.length > 0 && (
          <>
            <AnimatedSection className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                Everything you need to know about working with us
              </p>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto mb-16 sm:mb-24 lg:mb-32 space-y-3">
              {faqs.map((faq, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <FAQAccordionItem question={faq.question} answer={faq.answer} />
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

        {/* ================================================================
            SECTION 6: Call-to-Action Button
            ================================================================
            Links to the /contact page. Wrapped in MagneticButton for a
            playful magnetic hover effect.

            TO EDIT BUTTON TEXT:
              Change the "Start Your Project" string below.
            TO CHANGE DESTINATION:
              Update the href="/contact" in the <Link> component.
        */}
        <AnimatedSection className="text-center">
          <MagneticButton as="div">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-medium text-base sm:text-lg hover:bg-gray-100 transition-colors"
            >
              {/* Button label — hardcoded, not from translations */}
              Start Your Project
              {/* Arrow icon to the right of the button text */}
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
