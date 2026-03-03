'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';
import { MagneticButton } from './MagneticButton';
import { motion } from 'framer-motion';

export function HomeAuditCTA() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-orange-500/20 p-8 sm:p-12 md:p-16 text-center">
            {/* Orange gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.08] via-orange-600/[0.04] to-transparent" />

            {/* Animated orange glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-orange-500/[0.06] blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 mb-6 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-xs text-orange-300 tracking-wide uppercase font-medium">
                  {t('audit_badge')}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                {t('audit_heading')}
              </h2>

              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                {t('audit_subheading')}
              </p>

              <MagneticButton as="div">
                <Link
                  href="/audit"
                  className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-base sm:text-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/25"
                >
                  {t('audit_button')}
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
