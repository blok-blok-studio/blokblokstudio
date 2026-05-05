'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

/**
 * Compact FAQ section embedded on the home page bottom. Shows the 6 most
 * commonly asked questions with the same accordion UX as /faq, then links
 * to the full FAQ page.
 */
export function HomeFAQ() {
  const t = useTranslations('faq');
  const allItems = (t.raw('items') as FAQItem[]) || [];
  // Live-site filter — hides FAQ entries that describe AI / voice agent /
  // automation services. Keeps the entries in the JSON for future re-enable.
  const HIDE_AI_FAQ = true;
  const aiKeywords = /\b(ai|chatbot|voice agent|automation|agent)\b/i;
  const visibleItems = HIDE_AI_FAQ
    ? allItems.filter((item) => !aiKeywords.test(item.question) && !aiKeywords.test(item.answer))
    : allItems;
  // First-pick across categories so the home FAQ covers a representative
  // breadth (pricing, process, capabilities, trust) without listing all 14.
  const featured = visibleItems.slice(0, 6);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
            {t('hero_eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            {t('hero_title')}
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {featured.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <div className="border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-medium text-white pr-2">
                      {item.question}
                    </span>
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
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            See all questions
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
