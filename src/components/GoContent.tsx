'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { LeadForm } from './LeadForm';
import { LandingFooter } from './LandingFooter';

/**
 * /go — dedicated landing page for Meta + Google ad traffic.
 * One job: capture the lead via the shared LeadForm, which hands off to
 * the platform-specific thank-you pages. No navbar, no footer nav, no
 * exit paths except the form.
 */

const PROOF_STATS = [
  { value: '200%+', label: 'client consultations after launch (Coach Kofi)' },
  { value: '<7 days', label: 'from kickoff to first deliverable' },
  { value: '100%', label: 'custom-built, no templates' },
];

const TESTIMONIALS = [
  {
    quote: 'They built my entire site from scratch and now clients book and pay directly through it. I used to waste hours on DMs and invoices.',
    name: 'Luke Satterly',
    role: 'Personal Trainer, Berlin',
  },
  {
    quote: 'The design matched my energy perfectly. Consultations went up over 200% after launch and the site basically sells for me now.',
    name: 'Coach Kofi',
    role: 'Fitness Coach, Berlin',
  },
];

const STEPS = [
  { n: '1', title: 'Tell us what you need', desc: 'Fill out the form. Takes 30 seconds.' },
  { n: '2', title: 'Free 15-minute intro call', desc: 'We look at your business and map the fastest wins. No pitch, no pressure.' },
  { n: '3', title: 'Get your growth plan', desc: 'A concrete plan with scope, timeline, and price. Use it with us or without us.' },
];

export function GoContent() {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
        {/* Brand mark */}
        <p className="text-sm font-semibold tracking-wide text-gray-400 mb-10 sm:mb-14">
          BLOK BLOK <span className="text-orange-400">STUDIO</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Left column: hero ── */}
          <div className="lg:col-start-1">
            <AnimatedSection>
              <p className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.2em] text-orange-400/80 border border-orange-500/20 bg-orange-500/[0.06] rounded-full px-3 py-1 mb-5">
                Free growth plan &middot; 15 minutes &middot; yours to keep
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5">
                More customers. Less busywork.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Done for you.
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                We find exactly where your website, ads, and follow-up are losing you customers, then hand you
                the three fastest fixes with what each costs and what it should return. Use the plan with us,
                or take it and run it yourself.
              </p>
            </AnimatedSection>
          </div>

          {/* ── Form: after the headline on mobile, sticky right column on desktop ── */}
          <div ref={formRef} className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-10">
            <LeadForm fieldTag="Ad Lead" />
          </div>

          {/* ── Left column: proof + steps ── */}
          <div className="lg:col-start-1">
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-3 gap-3 mb-10">
                {PROOF_STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <p className="text-lg sm:text-2xl font-bold text-orange-400">{s.value}</p>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="space-y-4 mb-10">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <p className="text-white font-medium">{s.title}</p>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {TESTIMONIALS.map((t) => (
                  <figure key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <blockquote className="text-gray-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-3 text-xs text-gray-500">
                      <span className="text-white font-medium">{t.name}</span> &middot; {t.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </AnimatedSection>

            {/* Mobile: bottom CTA back to form */}
            <div className="lg:hidden mt-10">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={scrollToForm}
                className="w-full py-4 rounded-full bg-white text-black font-semibold text-sm"
              >
                Get my free growth plan
              </motion.button>
            </div>
          </div>
        </div>

        <LandingFooter />
      </div>
    </div>
  );
}
