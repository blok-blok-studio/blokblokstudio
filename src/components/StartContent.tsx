'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FlyingCookies } from './FlyingCookies';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

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
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400 tracking-wide">
                Available for new projects
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
            We build websites, brands, and digital products that actually convert. Here&apos;s the proof.
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
              Book a free call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              See our work
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
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

      {/* ── SOCIAL PROOF ── */}
      <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
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
              Real projects. Real results.
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Every site we build is designed to convert — not just look good.
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

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Want results like this?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
            We build websites that work as hard as you do. Book a free 30-minute strategy call and let&apos;s talk about your project.
          </p>
          <Link
            href="/call"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-base"
          >
            Book a free call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
