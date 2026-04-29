/**
 * ============================================================================
 * HomeClients.tsx — "Trusted By" Client Logo Bar (Homepage)
 * ============================================================================
 *
 * PURPOSE:
 *   Displays a horizontal row of client/partner logos on the homepage to
 *   build trust and social proof. Shows placeholder boxes until real logos
 *   are added.
 *
 * TRANSLATIONS:
 *   Text comes from the "home" namespace:
 *     - home.clients_heading → section heading (e.g., "Trusted By")
 *
 * TO ADD REAL CLIENT LOGOS:
 *   1. Place logo images in /public/images/clients/ (e.g., client-1.svg)
 *   2. Update the `clients` array below — change `logo` from null to the path
 *   3. The component will render an <Image> instead of the placeholder box
 *
 * STYLING:
 *   - Uses Tailwind CSS utility classes.
 *   - Responsive: scrollable on mobile, grid on larger screens.
 *   - Logos have a grayscale filter + low opacity, brightening on hover.
 *
 * REFERENCED FILES / DEPENDENCIES:
 *   - ./AnimatedSection → scroll-triggered reveal animation wrapper
 *   - next-intl         → translations (useTranslations)
 *   - next/image        → optimized image rendering (when logos are added)
 *
 * ============================================================================
 */

'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';

/**
 * ---------------------------------------------------------------------------
 * Client Data Array
 * ---------------------------------------------------------------------------
 * Each client object has:
 *   - name: Company name (shown as alt text / placeholder text)
 *   - logo: Path to logo image in /public/, or null for placeholder
 *
 * TO ADD A CLIENT:
 *   Add { name: 'Company', logo: '/images/clients/company.svg' }
 *
 * TO REMOVE A CLIENT:
 *   Delete the object from the array.
 * ---------------------------------------------------------------------------
 */
const clients = [
  { name: 'Coach Kofi', logo: null },
  { name: 'Exotic Ripz', logo: null },
  { name: 'The New School', logo: null },
  { name: 'Public Affair', logo: null },
  { name: 'Nanny & Nest', logo: null },
];

export function HomeClients() {
  const t = useTranslations('home');

  return (
    /* Section wrapper — subtle top/bottom padding, centered */
    <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section heading — small, uppercase, centered */}
        <AnimatedSection className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-500">
            {t('clients_heading')}
          </p>
        </AnimatedSection>

        {/* Marquee — continuously scrolling client names. Doubled-up so the
            tail seamlessly meets the head and the loop is invisible. Edge
            fades on either side prevent hard clipping. */}
        <AnimatedSection delay={0.1}>
          <div className="relative overflow-hidden">
            {/* Soft edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10" />

            <motion.div
              className="flex gap-12 sm:gap-20 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              {[...clients, ...clients].map((client, i) => (
                <span
                  key={`${client.name}-${i}`}
                  className="text-base sm:text-xl md:text-2xl text-gray-500 font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity duration-300 shrink-0"
                >
                  {client.name}
                </span>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
