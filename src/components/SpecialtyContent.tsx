'use client';

/**
 * SpecialtyContent — renders one commercial specialty page from
 * src/data/specialties.ts (webdesign-berlin, plumber-website-design, ...)
 * in the redesign system: hero, numbers, feature grid, case study, FAQ,
 * closing CTA. English or German content comes straight from the data
 * file; site chrome stays translated.
 */

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { SpecialtyData } from '@/data/specialties';

const LABEL = 'text-[11px] uppercase tracking-[0.2em] text-gray-500';
const CTA = 'inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400';

export function SpecialtyContent({ data }: { data: SpecialtyData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div lang={data.lang}>
      <section className="px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <p className={LABEL}>{data.kicker}</p>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-bold leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">{data.h1}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-gray-400">{data.intro}</p>
          <Link href={data.ctaHref} className={`mt-8 ${CTA}`}>
            {data.ctaButton} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <dl className="grid gap-12 sm:grid-cols-3">
            {data.stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-[3rem] font-bold leading-none tracking-[-0.03em] text-orange-500 sm:text-[4rem]">{s.value}</dd>
                <dt className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${LABEL}`}>{data.featuresHeading}</div>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f, i) => (
              <li key={f.title} className="rounded-3xl border border-white/10 p-7 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">0{i + 1}</p>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">{f.title}</h2>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-gray-400">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px] rounded-3xl border border-orange-500 p-8 sm:p-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">{data.caseStudy.heading}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{data.caseStudy.name}</h2>
              <p className="mt-3 font-display text-xl font-semibold text-orange-500">{data.caseStudy.result}</p>
            </div>
            <div>
              <p className="text-pretty text-base leading-relaxed text-gray-400">{data.caseStudy.body}</p>
              <Link href={data.caseStudy.href} className="mt-6 inline-flex items-center gap-2 text-sm text-white underline underline-offset-4 decoration-white/30 transition-colors hover:decoration-white">
                {data.caseStudy.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${LABEL}`}>{data.faqHeading}</div>
          <div className="max-w-4xl space-y-3">
            {data.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className="rounded-2xl border border-white/10 transition-colors hover:bg-white/[0.03]">
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6" aria-expanded={isOpen}>
                    <span className="font-display text-base font-semibold text-white sm:text-lg">{faq.q}</span>
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                        <div className="px-5 pb-5 text-pretty text-sm leading-relaxed text-gray-400 sm:px-6 sm:text-base">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
          <div>
            <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{data.ctaHeading}</p>
            <p className="mt-2 max-w-lg text-sm text-gray-400">{data.ctaBody}</p>
          </div>
          <Link href={data.ctaHref} className={CTA}>
            {data.ctaButton} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
