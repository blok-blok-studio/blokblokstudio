'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { visibleFaqs } from '@/lib/faq-filter';
import { AnimatePresence, motion } from 'framer-motion';
import { V2PageHero } from './v2/V2PageHero';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const CATEGORIES = ['pricing', 'process', 'capabilities', 'trust'] as const;


export function FAQContent() {
  const t = useTranslations('faq');
  const allItems = (t.raw('items') as FAQItem[]) || [];
  const items = visibleFaqs(allItems);
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const filtered = activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory);
  const pill = (on: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${on ? 'border-orange-500 bg-orange-500 text-(--bb-on-primary)' : 'border-white/15 text-gray-300 hover:border-white/40 hover:text-white'}`;

  return (
    <>
      <V2PageHero label={t('hero_eyebrow')} title={t('hero_title')} intro={t('hero_subtitle')} />

      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setActiveCategory('all')} aria-pressed={activeCategory === 'all'} className={pill(activeCategory === 'all')}>
                {t('filter_all')}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                  }}
                  aria-pressed={activeCategory === cat}
                  className={pill(activeCategory === cat)}
                >
                  {t(`category_${cat}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl space-y-3">
            {filtered.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={`${activeCategory}-${idx}`} className="rounded-2xl border border-white/10 transition-colors hover:bg-white/[0.03]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold text-white sm:text-lg">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        isOpen ? 'rotate-45 border-orange-500 bg-orange-500 text-(--bb-on-primary)' : 'border-white/20 text-white'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
                        <div className="px-5 pb-5 text-pretty text-sm leading-relaxed text-gray-400 sm:px-6 sm:text-base">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
            <div>
              <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{t('cta_heading')}</p>
              <p className="mt-2 max-w-lg text-sm text-gray-400">{t('cta_subheading')}</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400">
              {t('cta_button')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
