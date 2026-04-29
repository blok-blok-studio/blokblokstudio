'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from './MagneticButton';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const CATEGORIES = ['pricing', 'process', 'capabilities', 'trust'] as const;

export function FAQContent() {
  const t = useTranslations('faq');
  const items = (t.raw('items') as FAQItem[]) || [];
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen pt-32 pb-24">
      <section className="px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">
            {t('hero_eyebrow')}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
            {t('hero_title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-black border-white'
                : 'border-white/15 text-gray-400 hover:text-white hover:border-white/30'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'border-white/15 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {t(`category_${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={`${activeCategory}-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
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
                      key="content"
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
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center border border-white/10 rounded-3xl bg-white/[0.02] px-6 sm:px-12 py-12 sm:py-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-4">
            {t('cta_heading')}
          </h2>
          <p className="text-base text-gray-400 mb-8 max-w-xl mx-auto">
            {t('cta_subheading')}
          </p>
          <MagneticButton as="div">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              {t('cta_button')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MagneticButton>
        </motion.div>
      </section>
    </main>
  );
}
