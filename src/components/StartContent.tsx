'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { QuizLeadForm } from './QuizLeadForm';
import { LandingFooter } from './LandingFooter';

/**
 * /start — the quiz, and nothing else.
 *
 * Every ad click, DM and cold email lands here, and the only thing to do is
 * answer. There is no video, no case-study grid and no services list on this
 * page on purpose: each one is another thing to read instead of a thing to
 * do, and another place to leave from. The proof all lives on the thank-you
 * page, where it reinforces a decision already made rather than competing
 * with the ask.
 *
 * That puts the whole job of earning the first answer on the headline and the
 * one proof line under the quiz, since the founder video is no longer here to
 * do it.
 */
export function StartContent() {
  const t = useTranslations('start');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-20 text-center">
        <Image
          src="/logo.svg"
          alt="Blok Blok Studio"
          width={48}
          height={48}
          className="mx-auto mb-8 sm:mb-10"
        />

        <AnimatedSection>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3 text-balance">
            {t('headline_a')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              {t('headline_b')}
            </span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-8 text-pretty">
            {t('sub')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <QuizLeadForm fieldTag="Start Lead" />
        </AnimatedSection>

        {/* One line, not a section. Enough to answer "who are these people"
            for someone off a cold ad without giving them something to read
            instead of something to do. */}
        <AnimatedSection delay={0.1}>
          <p className="mt-6 text-xs text-gray-600 text-pretty">
            {t('proof')}
          </p>
        </AnimatedSection>

        <LandingFooter />
      </div>
    </div>
  );
}
