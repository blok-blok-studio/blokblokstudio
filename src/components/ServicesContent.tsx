'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from './MagneticButton';

/**
 * Accent colors for each service card's top bar and bullet dots.
 * Order matches service index (0-based).
 */
const serviceAccents = [
  '#4ade80', // AI Agent Ecosystems — green
  '#60a5fa', // Conversational AI — blue
  '#fb923c', // Workflow Automation — orange
  '#a78bfa', // AI Content Systems — purple
  '#f87171', // Client Dashboards — red/coral
  '#60a5fa', // Websites — blue
  '#c084fc', // Branding — purple/magenta
  '#fb923c', // Google Ads — orange
  '#f87171', // Meta Ads — red/coral
];

/**
 * Gradient border colors for each card (matching the screenshot's colored dashed borders).
 * Each card gets a unique gradient direction + colors.
 */
const cardBorderGradients = [
  'from-green-400/40 via-green-500/20 to-transparent',
  'from-blue-400/40 via-blue-500/20 to-transparent',
  'from-orange-400/40 via-yellow-400/20 to-transparent',
  'from-purple-400/40 via-purple-500/20 to-transparent',
  'from-red-400/40 via-pink-400/20 to-transparent',
  'from-blue-400/40 via-cyan-400/20 to-transparent',
  'from-purple-400/40 via-pink-400/20 to-transparent',
  'from-orange-400/40 via-yellow-400/20 to-transparent',
  'from-red-400/40 via-pink-400/20 to-transparent',
];

function FAQAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-white/5 rounded-2xl overflow-hidden transition-colors ${open ? 'bg-white/[0.03]' : 'bg-transparent hover:bg-white/[0.02]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
      >
        <span className="text-sm sm:text-base font-medium">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-400 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

function ServiceCard({ index, t }: { index: number; t: (key: string) => string }) {
  const num = index + 1;
  const accent = serviceAccents[index];
  const gradient = cardBorderGradients[index];

  const title = t(`service_${num}_title`);
  const subtitle = t(`service_${num}_subtitle`);
  const bullets = Array.from({ length: 5 }, (_, i) =>
    t(`service_${num}_bullet_${i + 1}`)
  );

  return (
    <AnimatedSection delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className={`relative rounded-2xl sm:rounded-3xl p-[1px] h-full bg-gradient-to-br ${gradient} group cursor-pointer`}
      >
        <div className="bg-gray-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
          {/* Colored accent bar */}
          <div
            className="w-12 h-1 rounded-full mb-5"
            style={{ backgroundColor: accent }}
          />

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold tracking-wide uppercase mb-1.5 group-hover:text-white transition-colors">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="text-gray-400 text-xs sm:text-sm italic mb-5">
            {subtitle}
          </p>

          {/* Bullet points */}
          <ul className="space-y-2.5">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: accent }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export function ServicesContent({ faqs }: { faqs?: { question: string; answer: string }[] }) {
  const t = useTranslations('services');

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <AnimatedSection className="text-center mb-14 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* AI & Automation Section — Services 1-5 */}
        <AnimatedSection className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {t('section_ai_title')}
          </h2>
          <div className="w-16 h-0.5 bg-green-400/60 rounded-full" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <ServiceCard index={0} t={(key) => t(key as 'title')} />
          <ServiceCard index={1} t={(key) => t(key as 'title')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24 lg:mb-32">
          <ServiceCard index={2} t={(key) => t(key as 'title')} />
          <ServiceCard index={3} t={(key) => t(key as 'title')} />
          <ServiceCard index={4} t={(key) => t(key as 'title')} />
        </div>

        {/* Creative & Marketing Section — Services 6-9 */}
        <AnimatedSection className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {t('section_creative_title')}
          </h2>
          <div className="w-16 h-0.5 bg-blue-400/60 rounded-full" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <ServiceCard index={5} t={(key) => t(key as 'title')} />
          <ServiceCard index={6} t={(key) => t(key as 'title')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-24 lg:mb-32">
          <ServiceCard index={7} t={(key) => t(key as 'title')} />
          <ServiceCard index={8} t={(key) => t(key as 'title')} />
        </div>

        {/* Process Timeline */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            {t('process_title')}
          </h2>
        </AnimatedSection>

        <div className="relative mb-16 sm:mb-24">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {Array.from({ length: 5 }, (_, i) => ({
              title: t(`step_${i + 1}_title` as 'step_1_title'),
              desc: t(`step_${i + 1}_desc` as 'step_1_desc'),
            })).map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className={`text-center relative ${i === 4 ? 'col-span-2 sm:col-span-1 max-w-[200px] mx-auto sm:max-w-none' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full glass-card flex items-center justify-center mx-auto mb-4 sm:mb-6 relative z-10"
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <>
            <AnimatedSection className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                Everything you need to know about working with us
              </p>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto mb-16 sm:mb-24 lg:mb-32 space-y-3">
              {faqs.map((faq, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <FAQAccordionItem question={faq.question} answer={faq.answer} />
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <AnimatedSection className="text-center">
          <MagneticButton as="div">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-medium text-base sm:text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Project
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
