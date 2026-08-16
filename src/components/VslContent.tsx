'use client';

import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';
import { LeadForm } from './LeadForm';
import { LandingFooter } from './LandingFooter';

/**
 * /vsl — video sales letter page. 2026 playbook: one video, one button,
 * zero exit paths. Script + production guide in docs/vsl-script.md.
 * The video slots in via NEXT_PUBLIC_VSL_VIDEO_URL (mp4) once recorded;
 * until then the page shows the poster frame with the same CTA so the
 * funnel never dead-ends.
 */

// Dedicated VSL recording goes in NEXT_PUBLIC_VSL_VIDEO_URL once produced
// (script: docs/vsl-script.md). Until then the /call pitch video runs here
// so the page converts from day one.
const VIDEO_URL = process.env.NEXT_PUBLIC_VSL_VIDEO_URL || '/videos/pitch.mp4';

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
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">
            Where your business is quietly losing customers{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300"> (and how to fix it)</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-8">
            3 minutes. Then decide if a free growth plan is worth 15 more.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/50 mb-8">
            {VIDEO_URL ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster="/videos/pitch-poster.jpg"
                className="w-full aspect-video"
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950/30">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Video coming soon. The plan is already real.</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Portfolio first, per Chase: prospects see the client results and
            testimonials right under the video, then hit the form. */}
        <AnimatedSection delay={0.2}>
          <div className="mt-4 sm:mt-6 text-left">
            <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase text-center mb-6">
              Clients, in their own words
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { src: '/videos/testimonial-kofi.mp4', poster: '/videos/testimonial-kofi-poster.jpg', name: 'Coach Kofi', sub: 'Nike athlete, Berlin' },
                { src: '/videos/testimonial-luki.mp4', poster: '/videos/testimonial-luki-poster.jpg', name: 'Luke Satterly', sub: 'Coach Luki, Berlin' },
              ].map(t => (
                <div key={t.name}>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={t.poster}
                    className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black"
                  >
                    <source src={t.src} type="video/mp4" />
                  </video>
                  <p className="mt-2 text-sm text-gray-400">
                    {t.name} <span className="text-gray-600">· {t.sub}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Portfolio proof: the clients from the pitch email, with live
            links and the numbers. Links open in a new tab so this page
            (and its form) stays open. */}
        <AnimatedSection delay={0.25}>
          <div className="mt-14 sm:mt-20 text-left">
            <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase text-center mb-6">
              The work behind the pitch
            </p>
            <div className="space-y-3">
              {[
                { name: 'Bronco Plumbing', where: 'Dallas-Fort Worth', proof: '$50k+ gross revenue in his first 5 months. 5.0 stars across 52 Google reviews.', href: 'https://www.broncoplumbingdfw.com', label: 'broncoplumbingdfw.com' },
                { name: 'Exotic Ripz', where: 'E-commerce, US', proof: '$191k in trading card sales, 1,790 orders on the Shopify store we built.', href: '/projects/exotic-ripz', label: 'View case study' },
                { name: 'Coach Kofi', where: 'Nike athlete, Berlin', proof: 'Consultation requests up 200% after launch.', href: 'https://www.coachkofi.de', label: 'coachkofi.de' },
                { name: 'Coach Luki', where: 'Personal trainer, Berlin', proof: 'Bookings and payments straight through the site. No DMs, no invoices.', href: 'https://coachluki.com', label: 'coachluki.com' },
                { name: 'Mind and Body Retreats', where: 'Wellness, US', proof: 'Full brand identity and website. Launching 2026.', href: 'https://mindandbodyretreats.vercel.app', label: 'Preview the build' },
              ].map(c => (
                <div key={c.name} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {c.name} <span className="font-normal text-gray-600">· {c.where}</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">{c.proof}</p>
                  </div>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 sm:mt-0 shrink-0 text-sm text-orange-400 hover:text-orange-300 underline underline-offset-4"
                  >
                    {c.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Lead capture after the proof: they've seen the video, the
            testimonials, and the numbers — now the 30-second ask. */}
        <AnimatedSection delay={0.3}>
          <div className="mt-14 sm:mt-20">
            <LeadForm fieldTag="VSL Lead" />
          </div>
        </AnimatedSection>

        <LandingFooter />
      </div>
    </div>
  );
}
