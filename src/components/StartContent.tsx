'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const bounceUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

const popIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const spring = { type: 'spring' as const, stiffness: 70, damping: 13 };
const springFast = { type: 'spring' as const, stiffness: 100, damping: 13 };

// Project titles, descriptions, and category labels are kept untranslated:
// they're proper nouns / brand context that read better in English everywhere.
const projects = [
  {
    title: 'Coach Luki',
    desc: 'Personal training site with Stripe booking, built to convert in Berlin.',
    image: '/images/projects/coachluki.jpg',
    slug: 'coach-luki',
    url: 'coachluki.com',
    category: 'Web Design',
  },
  {
    title: 'Coach Kofi',
    desc: 'Bold personal brand and coaching platform with real-time booking.',
    image: '/images/projects/coachkofi.webp',
    slug: 'coach-kofi',
    url: 'coachkofi.de',
    category: 'Web Design',
  },
  {
    title: 'Exotic Ripz',
    desc: 'E-commerce storefront for a collectible trading card community.',
    image: '/images/projects/exoticripz.jpg',
    slug: 'exotic-ripz',
    url: 'exoticripz.com',
    category: 'E-Commerce',
  },
  {
    title: 'The New School',
    desc: 'Institutional web presence for the Center for Military-Affiliated Students.',
    image: '/images/projects/military-newschool.webp',
    slug: 'military-newschool',
    url: 'military.newschool.edu',
    category: 'Web Design',
  },
  {
    title: 'Public Affair',
    desc: 'Sophisticated brand identity and web experience for a premium lifestyle brand.',
    image: '/images/projects/public-affair.webp',
    slug: 'public-affair',
    url: 'public-affair.com',
    category: 'Branding',
  },
];

// Testimonials are direct client quotes — left in their original English.
const testimonials = [
  {
    quote: 'They built my entire site from scratch and now clients book and pay directly through it. I used to waste hours on DMs and invoices.',
    name: 'Luke Satterly',
    role: 'Personal Trainer, Berlin',
    project: 'coach-luki',
  },
  {
    quote: 'The design matched my energy perfectly. Consultations went up over 200% after launch and the site basically sells for me now.',
    name: 'Kofi',
    role: 'Performance Coach',
    project: 'coach-kofi',
  },
  {
    quote: 'Our booster pack drops sell out in hours now. The email capture popup alone grew our list by 400% in the first month.',
    name: 'Exotic Ripz',
    role: 'Trading Card Community',
    project: 'exotic-ripz',
  },
];

const audienceEmojis = [
  '\u{1F4AA}',
  '\u{1F37D}️',
  '\u{1F6D2}',
  '\u{1F3E2}',
  '\u{2696}️',
  '\u{1F3E5}',
  '\u{1F3D7}️',
  '\u{1F4BB}',
  '\u{1F393}',
  '\u{1F3B5}',
  '\u{1F9D1}\u{200D}\u{1F4BC}',
  '\u{2615}',
];

const audienceKeys = [
  'audience_trainers',
  'audience_restaurants',
  'audience_ecommerce',
  'audience_agencies',
  'audience_law',
  'audience_clinics',
  'audience_construction',
  'audience_saas',
  'audience_education',
  'audience_music',
  'audience_freelancers',
  'audience_other',
] as const;

const serviceConfigs = [
  { key: 'websites', emoji: '\u{1F310}' },
  { key: 'ads', emoji: '\u{1F4E3}' },
  { key: 'social', emoji: '\u{1F4F1}' },
  { key: 'ai', emoji: '\u{1F916}' },
] as const;

const processConfigs = [
  { num: '01', icon: '\u{2615}' },
  { num: '02', icon: '\u{1F4DC}' },
  { num: '03', icon: '\u{1F6E0}️' },
  { num: '04', icon: '\u{1F680}' },
] as const;

// Service tiers — category and tier names are kept in English (product names / menu).
const serviceCatalog = [
  {
    category: 'Web Development',
    icon: '\u{1F310}',
    groups: [
      {
        label: 'One-Time Builds',
        items: [
          { icon: '\u{1F4C4}', name: 'Single Page Launch' },
          { icon: '\u{1F680}', name: 'Starter Launch' },
          { icon: '\u{1F4C8}', name: 'Growth Accelerator' },
          { icon: '\u{1F451}', name: 'Total Domination' },
        ],
      },
      {
        label: 'Monthly Retainers',
        items: [
          { icon: '\u{1F6E0}️', name: 'Site Care' },
          { icon: '\u{1F331}', name: 'Site Growth' },
          { icon: '\u{1F91D}', name: 'Site Partnership' },
        ],
      },
    ],
  },
  {
    category: 'App Development',
    icon: '\u{1F4F1}',
    groups: [
      {
        label: 'One-Time Builds',
        items: [
          { icon: '\u{1F680}', name: 'Launchpad' },
          { icon: '\u{1F3AC}', name: 'Studio' },
          { icon: '\u{1F3C6}', name: 'Flagship' },
        ],
      },
      {
        label: 'Monthly Retainers',
        items: [
          { icon: '\u{1F493}', name: 'Keep Alive' },
          { icon: '\u{26A1}', name: 'Momentum' },
          { icon: '\u{1F91D}', name: 'Partner' },
        ],
      },
    ],
  },
  {
    category: 'Social Media',
    icon: '\u{1F4F8}',
    groups: [
      {
        label: 'One-Time Setup',
        items: [
          { icon: '\u{1F4F2}', name: 'Single Platform Setup' },
          { icon: '\u{1F310}', name: 'Multi-Platform Launch' },
          { icon: '\u{2728}', name: 'Full Social Rebrand' },
        ],
      },
      {
        label: 'Monthly Management',
        items: [
          { icon: '\u{1F331}', name: 'Social Starter' },
          { icon: '\u{1F4C8}', name: 'Social Growth' },
          { icon: '\u{1F451}', name: 'Social Domination' },
        ],
      },
    ],
  },
  {
    category: 'Marketing',
    icon: '\u{1F4E3}',
    groups: [
      {
        label: 'One-Time Projects',
        items: [
          { icon: '\u{1F5FA}️', name: 'Marketing Audit & Roadmap' },
          { icon: '\u{1F3AF}', name: 'Campaign Launchpad' },
          { icon: '\u{1F680}', name: 'Full Product Launch' },
        ],
      },
      {
        label: 'Monthly Retainers',
        items: [
          { icon: '\u{1F441}️', name: 'Maintain & Monitor' },
          { icon: '\u{2699}️', name: 'Growth Engine' },
          { icon: '\u{1F91D}', name: 'Full Partnership' },
        ],
      },
    ],
  },
  {
    category: 'AI Agents',
    icon: '\u{1F916}',
    groups: [
      {
        label: 'One-Time Build',
        items: [
          { icon: '\u{1F9E0}', name: 'Single Agent Build' },
          { icon: '\u{1F465}', name: 'Agent Team' },
          { icon: '\u{1F5A5}️', name: 'AI Operations' },
        ],
      },
      {
        label: 'Monthly Retainer',
        items: [
          { icon: '\u{1F527}', name: 'Agent Maintenance' },
          { icon: '\u{1F4C8}', name: 'Agent Growth' },
          { icon: '\u{1F39B}️', name: 'Agent Command Center' },
        ],
      },
    ],
  },
  {
    category: 'Custom SaaS',
    icon: '\u{1F4BB}',
    groups: [
      {
        label: 'One-Time Builds',
        items: [
          { icon: '\u{1F50D}', name: 'Discovery & Scoping' },
          { icon: '\u{1F3D7}️', name: 'Standard Build' },
          { icon: '\u{1F3E2}', name: 'Enterprise Build' },
        ],
      },
      {
        label: 'Monthly Retainers',
        items: [
          { icon: '\u{1F4BB}', name: 'Dev Support' },
          { icon: '\u{1F4B0}', name: 'Hourly Bank' },
          { icon: '\u{26A1}', name: 'Active Development' },
        ],
      },
    ],
  },
  {
    category: 'Branding Strategy',
    icon: '\u{1F3A8}',
    groups: [
      {
        label: 'One-Time Projects',
        items: [
          { icon: '\u{270F}️', name: 'Brand Lite' },
          { icon: '\u{1F9E9}', name: 'Brand System' },
          { icon: '\u{1F98B}', name: 'Brand Transformation' },
        ],
      },
      {
        label: 'Monthly Retainers',
        items: [
          { icon: '\u{1F6E1}️', name: 'Brand Keeper' },
          { icon: '\u{1F3AD}', name: 'Creative Direction' },
          { icon: '\u{1F3DB}️', name: 'Embedded Studio' },
        ],
      },
    ],
  },
];

export function StartContent() {
  const t = useTranslations('start');

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── LANGUAGE SWITCHER ──
          The (funnel) layout has no Navbar, so the switcher floats here.
          Auto-detection (OS / Accept-Language) still runs server-side on
          first visit; this lets visitors override their detected language. */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <LanguageSwitcher variant="compact" />
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative z-20 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springFast, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 sm:mb-8">
              <span className="text-2xl">{'\u{2709}️'}</span>
              <span className="text-xs text-gray-400 tracking-wide">
                {t('hero_badge')}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springFast, delay: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <Image
              src="/logo-hero.png"
              alt="Blok Blok Studio"
              width={600}
              height={150}
              className="mx-auto w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springFast, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight mb-4 sm:mb-6"
          >
            {t('hero_title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springFast, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springFast, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="https://calendar.app.google/EVCd5JtNnChBdqXn6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-medium text-sm sm:text-base hover:bg-gray-100 transition-colors"
            >
              {t('hero_cta_primary')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              {t('hero_cta_secondary')}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOOK ── */}
      <section className="py-20 sm:py-32 px-5 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed text-white"
          >
            {t('hook_line1')}
          </motion.p>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ ...spring, delay: 0.15 }}
            variants={fadeUp}
            className="text-lg sm:text-xl text-gray-400 mt-6 leading-relaxed"
          >
            {t('hook_line2')}
          </motion.p>
        </div>
      </section>

      {/* ── PITCH ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={popIn}
          >
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{t('pitch_label')}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t('pitch_title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              {t('pitch_body')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('services_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('services_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {serviceConfigs.map((s, i) => (
              <motion.div
                key={s.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: i * 0.1 }}
                variants={bounceUp}
                whileHover={{ y: -6 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <span className="text-3xl sm:text-4xl mb-4 block">{s.emoji}</span>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{t(`service_${s.key}_name`)}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{t(`service_${s.key}_desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL SERVICE CATALOG ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{t('catalog_eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('catalog_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('catalog_subtitle')}
            </p>
          </motion.div>

          <div className="space-y-10 sm:space-y-14">
            {serviceCatalog.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: ci * 0.08 }}
                variants={fadeUp}
              >
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                  <h3 className="text-xl sm:text-2xl font-semibold">{cat.category}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {cat.groups.map((group) => (
                    <div
                      key={group.label}
                      className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white/[0.03] border border-white/[0.06]"
                    >
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-4">
                        {group.label}
                      </p>
                      <ul className="space-y-3">
                        {group.items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center gap-3 text-sm sm:text-base text-gray-200"
                          >
                            <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
                            <span>{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={popIn}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('audience_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('audience_subtitle')}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {audienceKeys.map((k, i) => (
              <motion.div
                key={k}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.05 }}
                variants={bounceUp}
                whileHover={{ y: -4 }}
                className="rounded-xl sm:rounded-2xl p-4 bg-white/[0.03] border border-white/[0.06] text-center cursor-default hover:border-white/[0.15] transition-colors"
              >
                <span className="text-2xl sm:text-3xl block mb-2">{audienceEmojis[i]}</span>
                <span className="text-xs sm:text-sm text-gray-400">{t(k)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARE ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('compare_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('compare_subtitle')}
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <motion.div
                key={n}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                transition={{ ...spring, delay: i * 0.12 }}
                variants={i % 2 === 0 ? slideRight : slideLeft}
                className="grid grid-cols-1 sm:grid-cols-2 rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.06]"
              >
                <div className="p-4 sm:p-5 bg-red-500/[0.06] border-b sm:border-b-0 sm:border-r border-red-500/[0.1] flex items-start gap-3">
                  <span className="text-red-400 text-base sm:text-lg mt-0.5 flex-shrink-0">{'\u{274C}'}</span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-400/60 block mb-1">{t('compare_label_others')}</span>
                    <span className="text-sm sm:text-base text-gray-400">{t(`compare_${n}_bad`)}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-green-500/[0.06] flex items-start gap-3">
                  <span className="text-green-400 text-base sm:text-lg mt-0.5 flex-shrink-0">{'\u{2705}'}</span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-green-400/60 block mb-1">{t('compare_label_me')}</span>
                    <span className="text-sm sm:text-base text-white">{t(`compare_${n}_good`)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('process_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('process_subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {processConfigs.map((p, i) => (
              <motion.div
                key={p.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: i * 0.12 }}
                variants={bounceUp}
                whileHover={{ x: 6 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors flex items-start gap-5 sm:gap-6"
              >
                <span className="text-3xl sm:text-4xl flex-shrink-0">{p.icon}</span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-600 font-mono">{p.num}</span>
                    <h3 className="text-lg sm:text-xl font-semibold">{t(`process_${i + 1}_title`)}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{t(`process_${i + 1}_desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('projects_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('projects_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: i * 0.1 }}
                variants={bounceUp}
                whileHover={{ y: -8 }}
              >
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-colors hover:shadow-lg hover:shadow-white/[0.03]">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="text-xs text-gray-500">{project.url}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={spring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('testimonials_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('testimonials_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {testimonials.map((tst, i) => (
              <motion.div
                key={tst.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: i * 0.1 }}
                variants={bounceUp}
                whileHover={{ y: -6 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-colors"
              >
                <p className="text-base sm:text-lg text-white leading-relaxed mb-6">
                  &ldquo;{tst.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{tst.name}</p>
                    <p className="text-xs text-gray-500">{tst.role}</p>
                  </div>
                  <Link
                    href={`/projects/${tst.project}`}
                    className="text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    {t('testimonial_view_project')} &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA + SIGN-OFF ── */}
      <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={spring}
          variants={popIn}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-5xl sm:text-6xl mb-6">{'\u{2615}'}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {t('cta_title')}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
            {t('cta_subtitle')}
          </p>
          <motion.a
            href="https://calendar.app.google/EVCd5JtNnChBdqXn6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-base"
          >
            {t('cta_button')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          <div className="mt-14 sm:mt-16 pt-10 border-t border-white/[0.06]">
            <p className="text-sm text-gray-300">Chase Haynes</p>
            <p className="text-xs text-gray-500 mt-1">{t('cta_signoff_role')}</p>
          </div>
        </motion.div>
      </section>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <a
        href="https://wa.me/491627055848?text=Hey%20Chase%2C%20I%20just%20scanned%20your%20card%20and%20I%27d%20like%20to%20grab%20coffee."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
        aria-label={t('whatsapp_aria')}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
