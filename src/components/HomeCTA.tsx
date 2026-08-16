/* ==========================================================================
 * HomeCTA.tsx
 * ==========================================================================
 *
 * Call-to-Action Section -- Homepage (bottom)
 *
 * This component renders a large, glass-style CTA card near the bottom of
 * the homepage. It contains a heading, subheading, and a prominent
 * "Get in Touch" button that links to the /contact page.
 *
 * Two animated background blobs pulse behind the content to give the card
 * a subtle, living feel.
 *
 * ---- Where text comes from ----
 * All user-facing strings are pulled from the "home" translation namespace
 * via next-intl. Edit them in your locale files:
 *   /messages/en.json  -> "home.cta_heading"
 *   /messages/en.json  -> "home.cta_subheading"
 *   /messages/en.json  -> "home.cta_button"
 * (and the equivalent keys in every other locale file)
 *
 * ---- How to change the button destination ----
 * The button currently links to /contact. To change it, update the
 * <Link href="/contact"> below.
 *
 * ---- Animations ----
 * - AnimatedSection: fades the entire card in when it scrolls into view
 * - Two motion.div blobs: continuously pulse (scale + opacity) in a loop
 * - MagneticButton: makes the button subtly follow the cursor on hover
 *
 * ---- Referenced files / components ----
 * - ./AnimatedSection   -- scroll-triggered entrance animation wrapper
 * - ./MagneticButton    -- cursor-following magnetic hover effect for buttons
 * - framer-motion       -- background blob animations (motion.div)
 * - next-intl           -- translations (useTranslations)
 * - next/link           -- client-side routing (Link)
 * ========================================================================== */

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';
import { MagneticButton } from './MagneticButton';
import { motion } from 'framer-motion';

export function HomeCTA() {
  /* Pull translated strings from the "home" namespace.
     Keys used: cta_heading, cta_subheading, cta_button */
  const t = useTranslations('home');

  return (
    /* ---- Outer section wrapper ----
       Responsive vertical padding (py) and horizontal padding (px).
       Adjust these values to change the spacing above and below the CTA. */
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      {/* Max-width container -- keeps the card centered on wide screens */}
      <div className="max-w-7xl mx-auto">
        {/* AnimatedSection -- the whole card fades/slides in on scroll */}
        <AnimatedSection>
          {/* ==================================================================
           * Glass Card Container
           * ==================================================================
           * A rounded card with:
           *   - Semi-transparent white gradient background (glass effect)
           *   - Very subtle white border (border-white/5)
           *   - Generous internal padding (responsive)
           *   - overflow-hidden so the animated blobs don't bleed out
           *
           * To change the card style, edit the className below.
           * ================================================================== */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/5 p-8 sm:p-12 md:p-20 text-center">

            {/* ----------------------------------------------------------------
             * Animated Background Blobs
             * ----------------------------------------------------------------
             * Two soft, blurred circles that pulse in scale and opacity
             * on an infinite loop. They sit behind the text (z-index
             * is handled by the "relative z-10" on the content div below).
             *
             * Blob 1 (top-right): 8-second loop, scales between 1x and 1.2x
             * Blob 2 (bottom-left): 10-second loop, scales between 1x and 1.2x
             *
             * To adjust the animation speed, change the `duration` values.
             * To change blob size, edit the w-/h- classes.
             * To change blob color/intensity, edit bg-white/[0.02] etc.
             * ---------------------------------------------------------------- */}
            {/* Blob 1 -- top-right corner */}
            <motion.div
              className="absolute top-0 right-0 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-white/[0.02] blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            {/* Blob 2 -- bottom-left corner */}
            <motion.div
              className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/[0.015] blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            {/* ================================================================
             * CTA Content (text + button)
             * ================================================================
             * Positioned above the blobs with `relative z-10`.
             * ================================================================ */}
            <div className="relative z-10">
              {/* Heading -- edit text in translations: home.cta_heading
                  Responsive font size from 3xl up to 6xl on large screens. */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                {t('cta_heading')}
              </h2>

              {/* Subheading -- edit text in translations: home.cta_subheading
                  Max width keeps lines from getting too long on wide screens. */}
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10">
                {t('cta_subheading')}
              </p>

              {/* ---- CTA Button ----
                  Wrapped in MagneticButton which makes the button follow the
                  cursor slightly on hover for a playful interactive feel.

                  The Link inside navigates to /contact.
                  Edit the label in translations: home.cta_button
                  To change the destination, update href="/contact" below.

                  Styling: white background, black text, rounded-full pill shape.
                  Hover state: slightly lighter (bg-gray-100). */}
              <MagneticButton as="div">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-medium text-base sm:text-lg hover:bg-gray-100 transition-colors"
                >
                  {t('cta_button')}
                  {/* Right-arrow icon next to the button text */}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
