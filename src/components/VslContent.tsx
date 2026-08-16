'use client';

import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';
import { CaseStudyGrid } from './CaseStudyGrid';
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
    <div className="min-h-screen bg-paper text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-20 text-center">
        <Image
          src="/logo-black.svg"
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
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-ink shadow-2xl mb-8">
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

        {/* Case-study grid, 2x2 (shared with the homepage — CaseStudyGrid).
            Breaks wider than the page column on desktop so the cards read
            large. */}
        <AnimatedSection delay={0.2}>
          <div className="mt-4 sm:mt-6 relative left-1/2 -translate-x-1/2 w-screen max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase text-center mb-6">
              The work, and the numbers
            </p>
            <CaseStudyGrid />
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
