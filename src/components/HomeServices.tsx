'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/* ── Per-service accent colours & gradients (match ServicesContent.tsx) ── */
const serviceStyles = [
  { accent: '#4ade80', gradient: 'from-green-400/40 via-green-500/20 to-transparent' },   // 1 AI Agent Ecosystems
  { accent: '#818cf8', gradient: 'from-indigo-400/40 via-purple-400/20 to-transparent' },  // 2 Conversational AI
  { accent: '#facc15', gradient: 'from-yellow-400/40 via-amber-400/20 to-transparent' },   // 3 Workflow Automation
  { accent: '#f472b6', gradient: 'from-pink-400/40 via-rose-400/20 to-transparent' },      // 4 AI Content Systems
  { accent: '#22d3ee', gradient: 'from-cyan-400/40 via-sky-400/20 to-transparent' },       // 5 Client Dashboards
  { accent: '#60a5fa', gradient: 'from-blue-400/40 via-cyan-400/20 to-transparent' },      // 6 Websites
  { accent: '#c084fc', gradient: 'from-purple-400/40 via-fuchsia-400/20 to-transparent' }, // 7 Branding
  { accent: '#fb923c', gradient: 'from-orange-400/40 via-yellow-400/20 to-transparent' },  // 8 Google Ads
  { accent: '#34d399', gradient: 'from-emerald-400/40 via-teal-400/20 to-transparent' },   // 9 Meta Ads
];

type TabKey = 'all' | 'ai' | 'creative';

const tabs: { key: TabKey; labelKey: string }[] = [
  { key: 'all', labelKey: 'tab_all' },
  { key: 'ai', labelKey: 'tab_ai' },
  { key: 'creative', labelKey: 'tab_creative' },
];

/** Service numbers belonging to each category */
const categoryMap: Record<TabKey, number[]> = {
  all: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ai: [1, 2, 3, 4, 5],
  creative: [6, 7, 8, 9],
};

export function HomeServices() {
  const t = useTranslations('home');
  const st = useTranslations('services');
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  /** Build the cards to show based on active tab */
  const visibleIndices = categoryMap[activeTab];

  const services = visibleIndices.map((num) => ({
    num,
    title: st(`service_${num}_title` as 'service_1_title'),
    subtitle: st(`service_${num}_subtitle` as 'service_1_title'),
    bullets: Array.from({ length: 3 }, (_, j) =>
      st(`service_${num}_bullet_${j + 1}` as 'service_1_title')
    ),
    accent: serviceStyles[num - 1].accent,
    gradient: serviceStyles[num - 1].gradient,
  }));

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <AnimatedSection className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {t('services_heading')}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('services_subheading')}
          </p>
        </AnimatedSection>

        {/* ── Tabs ── */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeHomeTab"
                    className="absolute inset-0 rounded-xl bg-white/10 border border-white/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{t(tab.labelKey as 'services_heading')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Service Cards Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl sm:rounded-3xl p-[1px] h-full bg-gradient-to-br ${service.gradient} group cursor-pointer`}
                >
                  <div className="bg-gray-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                    {/* Accent bar */}
                    <div
                      className="w-10 h-1 rounded-full mb-5"
                      style={{ backgroundColor: service.accent }}
                    />

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold tracking-wide uppercase mb-1.5 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-gray-400 text-xs sm:text-sm italic mb-5">
                      {service.subtitle}
                    </p>

                    {/* Bullets (first 3) */}
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: service.accent }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
