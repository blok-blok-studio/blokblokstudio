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
 * - Animations: CSS keyframes (hero-enter/scroll-bob in globals.css)
 *
 * PERFORMANCE NOTE: the entrance animations used to run through
 * framer-motion, which held the hero (including the LCP logo image)
 * at opacity 0 until React hydrated — nearly 3s of LCP render delay
 * on Lighthouse. The same fade-up now runs as CSS with staggered
 * animation-delay, so it starts the moment styles load. Visuals are
 * unchanged.
 *
 * TO EDIT:
 * - Change hero subtitle text → edit "hero_subtitle" in /src/messages/en.json
 * - Change CTA button text → edit "hero_cta" in /src/messages/en.json
 * - Change hero logo → replace /public/logo-hero.png
 * - Change "Available for new projects" → edit the string below
 * ============================================================
 */

'use client';

import { useTranslations } from 'next-intl'; // Loads translated text from /src/messages/
import Image from 'next/image'; // Next.js optimized image component
import Link from 'next/link'; // Next.js client-side navigation
import { MagneticButton } from './MagneticButton'; // Hover effect wrapper for buttons
import { HeroSpotlight } from './HeroSpotlight'; // Mouse-tracked radial glow

export function HomeHero() {
  // Load translations from the "home" section of /src/messages/{locale}.json
  const t = useTranslations('home');

  return (
    // ── HERO SECTION CONTAINER ──
    // Full viewport height, vertically centered content
    <section className="relative min-h-screen flex items-center px-5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Radial glow that tracks the cursor, purely decorative, sits below content */}
      <HeroSpotlight />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">

        {/* ── STATUS BADGE ──
            Green pulsing dot with "Available for new projects" text. */}
        <div className="hero-enter" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400 tracking-wide">
              Available for new projects
            </span>
          </div>
        </div>

        {/* ── HERO LOGO / WORDMARK (LCP element) ──
            IMAGE: /public/logo-hero.png
            Responsive widths: 280px mobile → 400px sm → 500px md → 600px lg */}
        <div className="hero-enter mb-6 sm:mb-8" style={{ animationDelay: '0.4s' }}>
          <Image
            src="/logo-hero.png"
            alt="Blok Blok Studio, web design studio in Berlin"
            width={600}
            height={150}
            className="mx-auto w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto"
            priority
            fetchPriority="high"
          />
        </div>

        {/* ── HERO H1 (SEO) ──
            Visible H1 carrying the page's primary keywords. Critical for both
            classic SEO (one H1 per page, descriptive) and AI search engines
            that parse the H1 to summarize what the page is about. */}
        <h1
          className="hero-enter text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4 sm:mb-6"
          style={{ animationDelay: '0.5s' }}
        >
          {t('hero_title')}
        </h1>

        {/* ── SUBTITLE TEXT ── */}
        <p
          className="hero-enter text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          style={{ animationDelay: '0.6s' }}
        >
          {t('hero_subtitle')}
        </p>

        {/* ── CTA BUTTONS ──
            Two buttons side by side (stacked on mobile).
            Button 1: White filled → links to /contact
            Button 2: Outlined → links to /projects */}
        <div
          className="hero-enter flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          style={{ animationDelay: '0.8s' }}
        >
          {/* Primary CTA, "Start a Project" button (white, filled) */}
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

          {/* Secondary CTA, "View All Projects" button (outlined) */}
          <MagneticButton as="div">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              {t('projects_cta')}
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ──
          Bouncing pill at the bottom of the hero; fades in after 1.5s. */}
      <div className="fade-in-late absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2">
        <div className="scroll-bob w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
