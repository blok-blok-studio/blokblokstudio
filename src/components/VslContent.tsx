'use client';

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
        <p className="text-sm font-semibold tracking-wide text-gray-400 mb-8 sm:mb-10">
          BLOK BLOK <span className="text-orange-400">STUDIO</span>
        </p>

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

        {/* Lead capture directly under the video: with no live call volume
            yet, a 30-second form converts cold traffic far better than
            sending it to an empty calendar. We book the call in the reply. */}
        <AnimatedSection delay={0.15}>
          <LeadForm fieldTag="VSL Lead" />
        </AnimatedSection>

        {/* Client proof under the form: real faces saying it worked. No
            links out — the page keeps its one exit (the form above). */}
        <AnimatedSection delay={0.2}>
          <div className="mt-14 sm:mt-20 text-left">
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

        <LandingFooter />
      </div>
    </div>
  );
}
