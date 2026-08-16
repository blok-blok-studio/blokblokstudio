'use client';

/**
 * SpecialtyContent — renders one commercial specialty page from
 * src/data/specialties.ts (webdesign-berlin, plumber-website-design, ...).
 * Matches the site's dark visual language: hero, stat row, feature grid,
 * case-study panel, FAQ accordion, closing CTA. English or German content
 * comes straight from the data file; site chrome stays translated.
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import type { SpecialtyData } from '@/data/specialties';

export function SpecialtyContent({ data }: { data: SpecialtyData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div lang={data.lang} className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ── Hero ── */}
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-4">{data.kicker}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
            {data.h1}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            {data.intro}
          </p>
          <Link
            href={data.ctaHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            {data.ctaButton}
          </Link>
        </AnimatedSection>

        {/* ── Proof stats ── */}
        <AnimatedSection delay={0.1} className="mt-14 sm:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.stats.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6">
                <p className="text-3xl sm:text-4xl font-light tracking-tight mb-2">{s.value}</p>
                <p className="text-sm text-gray-400 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Features ── */}
        <AnimatedSection delay={0.1} className="mt-16 sm:mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{data.featuresHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {data.features.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6 sm:p-7">
                <div className="w-8 h-1 rounded-full bg-orange-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Case study ── */}
        <AnimatedSection delay={0.1} className="mt-16 sm:mt-24">
          <div className="rounded-3xl border border-orange-500/20 bg-orange-500/[0.04] p-7 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-3">{data.caseStudy.heading}</p>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">{data.caseStudy.name}</h2>
            <p className="text-orange-300 font-medium mb-4">{data.caseStudy.result}</p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">{data.caseStudy.body}</p>
            <Link
              href={data.caseStudy.href}
              className="inline-flex items-center gap-2 text-sm text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
            >
              {data.caseStudy.linkLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>

        {/* ── FAQ ── */}
        <AnimatedSection delay={0.1} className="mt-16 sm:mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{data.faqHeading}</h2>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className="border border-white/10 rounded-2xl bg-white/[0.02]">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-medium text-white pr-2">{faq.q}</span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-45 bg-white text-black border-white' : 'text-white'
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-gray-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ── Closing CTA ── */}
        <AnimatedSection delay={0.1} className="mt-16 sm:mt-24">
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{data.ctaHeading}</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-8">{data.ctaBody}</p>
            <Link
              href={data.ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors"
            >
              {data.ctaButton}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
