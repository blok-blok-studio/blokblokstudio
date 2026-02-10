/**
 * ============================================================
 * HOME HERO SECTION
 * ============================================================
 * This is the first thing visitors see on the homepage.
 * It displays the main logo, tagline, and call-to-action buttons.
 *
 * KEY FILES:
 * - Logo image: /public/logo-hero.png (wordmark with subhead)
 * - Text content: /src/messages/en.json → "home" section
 * - Animations: Framer Motion (fade-in + slide-up on load)
 *
 * TO EDIT:
 * - Change hero subtitle text → edit "hero_subtitle" in /src/messages/en.json
 * - Change CTA button text → edit "hero_cta" in /src/messages/en.json
 * - Change hero logo → replace /public/logo-hero.png
 * - Change "Available for new projects" → edit the text on line 28 below
 * ============================================================
 */

'use client';

import { useTranslations } from 'next-intl'; // Loads translated text from /src/messages/
import { motion } from 'framer-motion'; // Animation library for fade/slide effects
import Image from 'next/image'; // Next.js optimized image component
import Link from 'next/link'; // Next.js client-side navigation
import { MagneticButton } from './MagneticButton'; // Hover effect wrapper for buttons

export function HomeHero() {
  // Load translations from the "home" section of /src/messages/{locale}.json
  const t = useTranslations('home');

  return (
    // ── HERO SECTION CONTAINER ──
    // Full viewport height, vertically centered content
    <section className="relative min-h-screen flex items-center px-5 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">

        {/* ── STATUS BADGE ──
            Green pulsing dot with "Available for new projects" text.
            To change the status text, edit the string on line 28 below.
            To hide this badge entirely, remove this <motion.div> block. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400 tracking-wide">
              Available for new projects
            </span>
          </div>
        </motion.div>

        {/* ── HERO LOGO / WORDMARK ──
            Displays the main logo with subheadline.
            IMAGE: /public/logo-hero.png
            To swap: replace that file (keep same filename) or change src below.
            Responsive widths: 280px mobile → 400px sm → 500px md → 600px lg */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <Image
            src="/logo-hero.png"
            alt="Blok Blok Studio"
            width={600}
            height={150}
            className="mx-auto w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto"
            priority
          />
        </motion.div>

        {/* ── SUBTITLE TEXT ──
            Pulled from translations: "hero_subtitle" key.
            To edit: go to /src/messages/en.json → home.hero_subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* ── CTA BUTTONS ──
            Two buttons side by side (stacked on mobile).
            Button 1: White filled → links to /contact
            Button 2: Outlined → links to /projects
            Text pulled from translations: "hero_cta" and "projects_cta" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary CTA — "Start a Project" button (white, filled) */}
          <MagneticButton as="div">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              {t('hero_cta')}
              {/* Arrow icon next to button text */}
              <svg
                className="w-4 h-4"
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

          {/* Secondary CTA — "View All Projects" button (outlined) */}
          <MagneticButton as="div">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              {t('projects_cta')}
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ──
          Animated bouncing pill at the bottom of the hero.
          Appears after 1.5s delay. Remove this block to hide it. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
