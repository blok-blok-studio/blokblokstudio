'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { FlyingCookies } from './FlyingCookies';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const bounceUp = fadeUp;
const popIn = fadeUp;

const slideRight = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

const springTransition = { duration: 0.5, ease };
const bouncySpring = springTransition;
const jiggle = {};

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
    desc: 'Personal training site with Stripe booking, built to convert in Berlin.',
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
  { emoji: '\u{1F3A8}', name: 'Design', desc: 'Whether you run a gym, a restaurant, or a SaaS company, your site should look like you actually care about your brand.' },
  { emoji: '\u{2699}\uFE0F', name: 'Development', desc: 'Fast, clean code that works on every device and ranks on Google. No matter what industry you are in.' },
  { emoji: '\u{1F4B3}', name: 'Payments', desc: 'Sell products, book appointments, or take deposits. We set it up so money comes in without you lifting a finger.' },
  { emoji: '\u{1F4C8}', name: 'SEO', desc: 'People are searching for what you do right now. We make sure they actually find you.' },
  { emoji: '\u{1F916}', name: 'Automation', desc: 'Auto replies, lead capture, follow ups, booking confirmations. Systems that run your business while you sleep.' },
  { emoji: '\u{1F4E3}', name: 'Conversion', desc: 'Traffic means nothing if nobody buys. Every page we build is designed to turn visitors into customers.' },
];

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
  {
    quote: 'Parents need to trust you before they hand over their kids. The site Blok Blok built does that instantly. Membership inquiries jumped 150%.',
    name: 'Nanny & Nest',
    role: 'Childcare Agency',
    project: 'nanny-and-nest',
  },
  {
    quote: 'We needed to look as serious as the enterprise clients we serve. They nailed the tech forward feel and our qualified leads have never been higher.',
    name: 'KDS Systems',
    role: 'Cloud & IT Services',
    project: 'kds-systems',
  },
];

const recipe = [
  { step: '01', title: 'Mix the brief', desc: 'We hop on a 30 minute call and get to know your goals, your audience, and what success actually looks like for you.', icon: '\u{1F963}' },
  { step: '02', title: 'Prep the dough', desc: 'We put together a strategy, wireframes, and a clear proposal so you know exactly what you\'re getting before we write a single line of code.', icon: '\u{1F4DC}' },
  { step: '03', title: 'Bake it', desc: 'This is where design and development happen. We check in with you along the way and keep iterating until it\'s golden.', icon: '\u{1F525}' },
  { step: '04', title: 'Serve it hot', desc: 'Launch day. Your site goes live, fast, polished, and ready to start converting from the very first visit.', icon: '\u{1F680}' },
];

const halfBaked = [
  { bad: 'A nice looking site that nobody can find on Google', good: 'SEO baked in from day one so customers actually find you' },
  { bad: 'Chasing payments through DMs, emails, and invoices', good: 'Online payments so clients book and pay right on your site' },
  { bad: '"We\'ll figure out mobile later"', good: 'Mobile first, because that is where your customers are' },
  { bad: 'A template that looks like every other business in your industry', good: 'Custom design that makes your brand stand out immediately' },
  { bad: 'Launched and then abandoned by the agency', good: 'Ongoing support because your business keeps growing and your site should too' },
];

export function StartContent() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ cursor: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='24' font-size='24'>%F0%9F%8D%AA</text></svg>\") 16 16, auto" }}>
      
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 overflow-hidden">
        <FlyingCookies />

        <div className="relative z-20 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...bouncySpring, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 sm:mb-8">
              <span className="text-2xl">{'\u{1F36A}'}</span>
              <span className="text-xs text-gray-400 tracking-wide">
                Fresh out the oven
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...bouncySpring, delay: 0.4 }}
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            Websites, brands, and systems for coaches, shops, agencies, restaurants, and anyone who is tired of looking basic online. All baked from scratch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...bouncySpring, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="https://calendar.app.google/EVCd5JtNnChBdqXn6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-medium text-sm sm:text-base hover:bg-gray-100 transition-colors"
            >
              Get a taste, book a free call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
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
            { value: 100, suffix: '%', label: 'Custom, zero templates' },
            { value: 6, suffix: '+', label: 'Industries served' },
            { value: 0, suffix: '', label: 'Half-baked launches', display: '0' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={springTransition}
              variants={bounceUp}
            >
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                {stat.display !== undefined ? stat.display : <Counter target={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={bouncySpring}
            variants={popIn}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              We bake for everyone {'\u{1F468}\u{200D}\u{1F373}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              If you have a business and you need it to look good and work even better online, we are your people.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { emoji: '\u{1F4AA}', label: 'Personal trainers' },
              { emoji: '\u{1F37D}\uFE0F', label: 'Restaurants & cafes' },
              { emoji: '\u{1F6D2}', label: 'E-commerce stores' },
              { emoji: '\u{1F3E2}', label: 'Agencies & studios' },
              { emoji: '\u{2696}\uFE0F', label: 'Law firms' },
              { emoji: '\u{1F3E5}', label: 'Clinics & wellness' },
              { emoji: '\u{1F3D7}\uFE0F', label: 'Construction & trades' },
              { emoji: '\u{1F4BB}', label: 'SaaS & tech' },
              { emoji: '\u{1F393}', label: 'Education' },
              { emoji: '\u{1F3B5}', label: 'Music & creatives' },
              { emoji: '\u{1F9D1}\u{200D}\u{1F4BC}', label: 'Freelancers' },
              { emoji: '\u{1F36A}', label: 'And literally anyone else' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ ...bouncySpring, delay: i * 0.05 }}
                variants={bounceUp}
                className="rounded-xl sm:rounded-2xl p-4 bg-white/[0.03] border border-white/[0.06] text-center cursor-default"
              >
                <motion.span
                  className="text-2xl sm:text-3xl block mb-2"
                >{item.emoji}</motion.span>
                <span className="text-xs sm:text-sm text-gray-400">{item.label}</span>
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
            transition={bouncySpring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Don&apos;t take our word for it {'\u{1F36A}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Here is what our clients have to say after working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...bouncySpring, delay: i * 0.1 }}
                variants={bounceUp}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-colors"
              >
                <p className="text-base sm:text-lg text-white leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                  <Link
                    href={`/projects/${t.project}`}
                    className="text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    View project &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={bouncySpring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              The ingredients {'\u{1F9C1}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Every project gets the full recipe. Nothing missing, no shortcuts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ingredients.map((item, i) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...springTransition, delay: i * 0.1 }}
                variants={bounceUp}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <motion.span
                  className="text-3xl sm:text-4xl mb-4 block"
                >
                  {item.emoji}
                </motion.span>
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
              Half baked vs. fully baked
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
                transition={{ ...bouncySpring, delay: i * 0.12 }}
                variants={i % 2 === 0 ? slideRight : slideLeft}
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
            transition={bouncySpring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              The recipe {'\u{1F4D6}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Four steps from idea to launch. No mystery and no surprises.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {recipe.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...springTransition, delay: i * 0.12 }}
                variants={bounceUp}
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
      <section id="projects" className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={bouncySpring}
            variants={popIn}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Fresh from the kitchen {'\u{1F373}'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Real projects, real clients, real results. All baked from scratch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...springTransition, delay: i * 0.1 }}
                variants={bounceUp}
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
          transition={bouncySpring}
          variants={popIn}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-5xl sm:text-6xl mb-6">{'\u{1F36A}'}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to cook something up?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
            Free 30 minute strategy call. No pitch, no pressure, just a real conversation about what your business needs.
          </p>
          <motion.a
            href="https://calendar.app.google/EVCd5JtNnChBdqXn6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-base"
          >
            Let&apos;s bake, book a free call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </section>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <a
        href="https://wa.me/491627055848?text=Hey%20Blok%20Blok%20Studio%2C%20I%20just%20scanned%20your%20QR%20code%20and%20I%27m%20interested%20in%20working%20together!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
