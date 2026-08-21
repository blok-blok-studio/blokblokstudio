'use client';

import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';
import { CaseStudyGrid } from './CaseStudyGrid';
import { LeadForm } from './LeadForm';
import { LandingFooter } from './LandingFooter';

/**
 * /vsl — video sales letter page. Flow: Meet the Founder (the page's one
 * video slot) → Meet Our Clients (case-study grid) → What We Do →
 * "Interested? Let's talk." lead form. Submitting routes through the
 * platform thank-you pages (ad conversions fire there), where the booking
 * calendar is embedded so visitors never leave the site.
 */

// The page's single video, committed at public/videos/founder-v2.mp4.
// NEXT_PUBLIC_FOUNDER_VIDEO_URL overrides it (e.g. to serve from a CDN);
// empty string falls back to the poster-style placeholder.
const FOUNDER_VIDEO_URL = process.env.NEXT_PUBLIC_FOUNDER_VIDEO_URL ?? '/videos/founder-v2.mp4';

const SPECIALTIES = [
  {
    title: 'SEO',
    desc: 'Rank where your customers actually search. On-page, technical, and local, done properly.',
  },
  {
    title: 'Agentic SEO',
    desc: 'People ask ChatGPT and AI assistants for recommendations now. We structure your site so the AI cites you.',
  },
  {
    title: 'Google Ads',
    desc: 'Show up the moment someone searches for what you sell. Campaigns built and managed for booked jobs, not vanity clicks.',
  },
  {
    title: 'Meta Ads',
    desc: 'Facebook and Instagram campaigns that put your offer in front of the right people before your competitors do.',
  },
  {
    title: 'Newsletters',
    desc: 'An email list you own. Automated follow-up that turns one-time visitors into repeat customers.',
  },
  {
    title: 'Conversion-First Design',
    desc: 'Every page is built to a goal: booked calls, orders, payments. Pretty is the baseline, converting is the job.',
  },
  {
    title: 'Tracking & Analytics',
    desc: 'You see exactly which channel produced every lead, so you spend where it works and cut what does not.',
  },
];

function SectionHeading({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      {kicker && (
        <p className="text-xs font-semibold tracking-[0.2em] text-orange-400/70 uppercase mb-2">{kicker}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-balance">{title}</h2>
    </div>
  );
}

export function VslContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-20 text-center">
        <Image
          src="/logo.svg"
          alt="Blok Blok Studio"
          width={48}
          height={48}
          className="mx-auto mb-8 sm:mb-10"
        />

        <AnimatedSection>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3 text-balance">
            Where your business is quietly losing customers{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300"> (and how to fix it)</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-8 text-pretty">
            Watch the video, then book a call. We&apos;ll break down exactly where you&apos;re losing customers and how to fix&nbsp;it.
          </p>
        </AnimatedSection>

        {/* Meet the Founder: the page's one video slot */}
        <AnimatedSection delay={0.1}>
          <div className="mt-2 sm:mt-4">
            <SectionHeading kicker="Who you'll work with" title="Meet the Founder" />
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/50">
              {FOUNDER_VIDEO_URL ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/videos/founder-v2-poster.webp"
                  className="w-full aspect-video"
                >
                  <source src={FOUNDER_VIDEO_URL} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950/30">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">A word from Chase, coming soon.</p>
                </div>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-4 text-pretty">
              Chase Haynes, founder of Blok Blok Studio. You talk to the person who builds your site, not an account&nbsp;manager.
            </p>
          </div>
        </AnimatedSection>

        {/* Meet Our Clients: 2x2 case-study grid (shared with the homepage).
            Breaks wider than the page column on desktop so the cards read
            large. */}
        <AnimatedSection delay={0.2}>
          <div className="mt-14 sm:mt-20 relative left-1/2 -translate-x-1/2 w-screen max-w-7xl px-5 sm:px-8">
            <SectionHeading kicker="The work, and the numbers" title="Meet Our Clients" />
            <CaseStudyGrid />
          </div>
        </AnimatedSection>

        {/* What we do */}
        <AnimatedSection delay={0.25}>
          <div className="mt-14 sm:mt-20 text-left">
            <div className="text-center">
              <SectionHeading kicker="Beyond the website" title="What We Do" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPECIALTIES.map((s, i) => (
                <div
                  key={s.title}
                  className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 ${
                    i === SPECIALTIES.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <p className="text-base font-semibold text-white mb-1">{s.title}</p>
                  <p className="text-sm text-gray-400 leading-relaxed text-pretty">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Lead capture after the proof: they've seen the videos, the
            clients, and the numbers — now the 30-second ask. Submitting
            opens the booking calendar in a new tab. */}
        <AnimatedSection delay={0.3}>
          <div className="mt-14 sm:mt-20">
            <div className="text-center">
              <SectionHeading kicker="One quick form, then pick a time" title="Interested? Let's talk." />
            </div>
            <LeadForm fieldTag="VSL Lead" ctaLabel="Let's talk" />
          </div>
        </AnimatedSection>

        <LandingFooter />
      </div>
    </div>
  );
}
