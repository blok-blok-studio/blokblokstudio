'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { FlyingCookies } from './FlyingCookies';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const projects = [
  {
    title: 'Coach Luki',
    desc: 'Conversion-focused personal training site with Stripe booking — Berlin.',
    image: '/images/projects/coachluki.png',
    slug: 'coach-luki',
    url: 'coachluki.com',
    category: 'Web Design',
  },
  {
    title: 'Coach Kofi',
    desc: 'Bold personal brand and coaching platform with real-time booking.',
    image: '/images/projects/coachkofi.png',
    slug: 'coach-kofi',
    url: 'coachkofi.de',
    category: 'Web Design',
  },
  {
    title: 'Exotic Ripz',
    desc: 'E-commerce storefront for a collectible trading card community.',
    image: '/images/projects/exoticripz.png',
    slug: 'exotic-ripz',
    url: 'exoticripz.com',
    category: 'E-Commerce',
  },
  {
    title: 'Nanny & Nest',
    desc: 'Trust-focused membership platform for a premium childcare agency.',
    image: '/images/projects/nannyandnest.png',
    slug: 'nanny-and-nest',
    url: 'nannyandnest.com',
    category: 'Web Design',
  },
  {
    title: 'KDS Systems',
    desc: 'Modern cloud solutions platform for managed IT services.',
    image: '/images/projects/kdssys.png',
    slug: 'kds-systems',
    url: 'kdssys.com',
    category: 'Web Design',
  },
  {
    title: 'The New School',
    desc: 'Institutional web presence for the Center for Military-Affiliated Students.',
    image: '/images/projects/military-newschool.png',
    slug: 'military-newschool',
    url: 'military.newschool.edu',
    category: 'Web Design',
  },
  {
    title: 'Public Affair',
    desc: 'Sophisticated brand identity and web experience for a premium lifestyle brand.',
    image: '/images/projects/public-affair.png',
    slug: 'public-affair',
    url: 'public-affair.com',
    category: 'Branding',
  },
];

const ingredients = [
  { emoji: '\u{1F3A8}', name: 'Design', desc: 'Bold visuals that stop the scroll and build instant trust.' },
  { emoji: '\u{2699}\uFE0F', name: 'Development', desc: 'Fast, clean code. SEO-optimized. Mobile-first. No bloat.' },
  { emoji: '\u{1F4B3}', name: 'Payments', desc: 'Stripe, Shopify, or custom — so clients pay you, not DM you.' },
  { emoji: '\u{1F4C8}', name: 'SEO', desc: 'Built to rank from day one. Local and global.' },
  { emoji: '\u{1F916}', name: 'Automation', desc: 'AI agents, workflows, and systems that run while you sleep.' },
  { emoji: '\u{1F4E3}', name: 'Conversion', desc: 'Every pixel exists to turn visitors into customers.' },
];

const recipe = [
  { step: '01', title: 'Mix the brief', desc: 'A 30-minute call. We learn your goals, your audience, and what "done" looks like.', icon: '\u{1F963}' },
  { step: '02', title: 'Prep the dough', desc: 'Strategy, wireframes, and a clear proposal. You know exactly what you\'re getting before we start.', icon: '\u{1F4DC}' },
  { step: '03', title: 'Bake it', desc: 'Design and development, with check-ins along the way. We iterate until it\'s golden.', icon: '\u{1F525}' },
  { step: '04', title: 'Serve it hot', desc: 'Launch day. Fast, polished, and ready to convert from the first visit.', icon: '\u{1F680}' },
];

const halfBaked = [
  { bad: 'A pretty site that nobody finds', good: 'SEO-optimized from day one' },
  { bad: 'DMs and invoices for every sale', good: 'Stripe checkout — zero friction' },
  { bad: '"We\'ll figure out mobile later"', good: 'Mobile-first, always' },
  { bad: 'A template that looks like everyone else', good: 'Custom design, built for your brand' },
  { bad: 'Launched and abandoned', good: 'Ongoing support and iteration' },
];

export function StartContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 overflow-hidden">
        <FlyingCookies />

        <div className="relative z-20 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 sm:mb-8">
              <span className="text-2xl">{'\u{1F36A}'}</span>
              <span className="text-xs text-gray-400 tracking-wide">
                Fresh out the oven
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            We don&apos;t use templates. We don&apos;t cut corners. We bake every project from scratch until it&apos;s golden.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/call"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Get a taste — book a free call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              See what we&apos;ve cooked
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

      {/* ── STATS BAR ── */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 lg:px-8 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 7, suffix: '+', label: 'Projects baked' },
            { value: 100, suffix: '%', label: 'Custom — zero templates' },
            { value: 6, suffix: '+', label: 'Industries served' },
            { value: 0, suffix: '', label: 'Half-baked launches', display: '0' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeUp}
            >
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                {stat.display !== undefined ? stat.display : <Counter target={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SOCIAL PROOF QUOTE ── */}
      <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <p className="text-4xl sm:text-5xl mb-6">{'\u{1F36A}'}</p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-white">
              We built Coach Luki&apos;s site from scratch — a Berlin personal trainer now booking clients directly through his website with zero friction.
            </p>
            <Link
              href="/projects/coach-luki"
              className="inline-block mt-6 text-sm text-gray-500 hover:text-white transition-colors"
            >
              See the project &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INGREDIENTS ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              The ingredients {'\u{1F9C1}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Every project gets the full recipe. No missing pieces. No shortcuts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ingredients.map((item, i) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                variants={fadeUp}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <span className="text-3xl sm:text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HALF-BAKED vs FULLY BAKED ── */}
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
              Half-baked vs. fully baked
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Most agencies give you raw dough and call it done. We don&apos;t.
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {halfBaked.map((row, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                variants={fadeUp}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-red-500/[0.04] border border-red-500/[0.1] flex items-start gap-3">
                  <span className="text-red-400 text-lg mt-0.5">{'\u{274C}'}</span>
                  <span className="text-sm sm:text-base text-gray-400">{row.bad}</span>
                </div>
                <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-green-500/[0.04] border border-green-500/[0.1] flex items-start gap-3">
                  <span className="text-green-400 text-lg mt-0.5">{'\u{1F36A}'}</span>
                  <span className="text-sm sm:text-base text-white">{row.good}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE RECIPE (PROCESS) ── */}
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
              The recipe {'\u{1F4D6}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Four steps from idea to launch. No mystery, no surprises.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {recipe.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                variants={fadeUp}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] flex items-start gap-5 sm:gap-6"
              >
                <span className="text-3xl sm:text-4xl flex-shrink-0">{step.icon}</span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-600 font-mono">{step.step}</span>
                    <h3 className="text-lg sm:text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section id="projects" className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Fresh from the kitchen {'\u{1F373}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Real projects. Real clients. Real results. All baked from scratch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                variants={fadeUp}
              >
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
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

      {/* ── FINAL CTA ── */}
      <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-5xl sm:text-6xl mb-6">{'\u{1F36A}'}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to cook something up?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
            Free 30-minute strategy call. No pitch, no pressure — just a real conversation about what your business needs.
          </p>
          <Link
            href="/call"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-base"
          >
            Let&apos;s bake — book a free call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
