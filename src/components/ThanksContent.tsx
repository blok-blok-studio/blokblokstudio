'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { LandingFooter } from './LandingFooter';
import { readAnswers, clearAnswers, buildPlan, type Plan } from '@/lib/quiz-plan';
import { FounderVideo } from './FounderVideo';
import { CaseStudyGrid } from './CaseStudyGrid';

/**
 * Thank-you / conversion pages for the /start ad funnel.
 * The form routes each lead to a platform-specific URL so every ad platform
 * gets ONE clean conversion signal and campaign setup is a plain page-view rule:
 *   /start/thanks/meta    — Meta traffic  → fires fbq('track', 'Lead')
 *   /start/thanks/google  — Google traffic → fires the Google Ads conversion
 *   /start/thanks         — direct/unknown → fires both (each is a no-op if absent)
 *   /start/thanks?src=organic — organic pitch links → fires nothing
 * Events only exist if the visitor consented to marketing cookies (AdsPixels).
 */

const INTRO_CALL_LINK = 'https://calendar.app.google/HeP9bUhWaKfosQF26';
// Same schedule as INTRO_CALL_LINK, in Google's embeddable form (?gv=true)
// so booking happens right here instead of on calendar.google.com.
const INTRO_CALL_EMBED =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2v3xRsZStR2Wtk8dr_F8kwEq4WGWu0FM548fk45LXMHonM5FwIUFHmuTTp0Ph6eVpcM1ZeM2PC?gv=true';
const WHATSAPP_LINK =
  'https://wa.me/491627055848?text=Hey%20Chase%2C%20I%20just%20sent%20a%20call%20request%20on%20your%20site.';

// Optional: exact Google Ads conversion action ("AW-XXXXXXX/AbCdEfGh").
// Without it we fire the generic generate_lead event instead.
const GOOGLE_CONVERSION = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION;

const NEXT_STEPS = [
  { n: '1', title: 'Pick your time above', desc: 'A short call so we can learn about your business and what you need.' },
  { n: '2', title: 'We break it all down on the call', desc: 'Where you are losing customers, what to fix first, and what it takes to do it.' },
  { n: '3', title: 'We build, you grow', desc: 'Website, ads, social, AI systems. Done for you, live fast.' },
];

function fireMeta() {
  // Same event id the server sent via the Conversions API — Meta
  // deduplicates the pair into one Lead
  let eventId = '';
  try {
    eventId = sessionStorage.getItem('bb-lead-event-id') || '';
  } catch { /* private mode */ }
  if (eventId) {
    window.fbq?.('track', 'Lead', {}, { eventID: eventId });
  } else {
    window.fbq?.('track', 'Lead');
  }
}

function fireGoogle() {
  // Enhanced Conversions for Leads: hand gtag the user-provided email and
  // phone (stamped by the lead form) — gtag hashes them client-side before
  // sending, which lifts attribution accuracy on Safari/iOS traffic.
  try {
    const email = sessionStorage.getItem('bb-lead-email') || '';
    const phone = sessionStorage.getItem('bb-lead-phone') || '';
    if (email || phone) {
      window.gtag?.('set', 'user_data', {
        ...(email ? { email } : {}),
        ...(phone ? { phone_number: phone } : {}),
      });
    }
  } catch { /* private mode */ }
  if (GOOGLE_CONVERSION) {
    window.gtag?.('event', 'conversion', { send_to: GOOGLE_CONVERSION });
  } else {
    window.gtag?.('event', 'generate_lead', { event_category: 'ads_funnel' });
  }
}

export function ThanksContent({ platform = 'all' }: { platform?: 'meta' | 'google' | 'all' }) {
  const fired = useRef(false);
  // The plan is the payoff for answering the quiz. Read on mount rather than
  // during render so the server and first client paint agree; a direct visit
  // or private mode simply leaves it null and the generic copy stands.
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const answers = readAnswers();
    if (answers) {
      setPlan(buildPlan(answers));
      clearAnswers();
    }
  }, []);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    // Only count real submissions: the funnel lead form stamps this key right
    // before redirecting. Direct visits/refreshes fire nothing.
    let submitted = false;
    try {
      submitted = !!sessionStorage.getItem('bb-lead-event-id');
    } catch { /* private mode: err on not firing */ }
    if (!submitted) return;
    // Leads from organic pitch links (?src=organic, set by the form's
    // redirect) are real submissions but not ad conversions: skip pixels
    // so paid-ads data stays clean.
    try {
      if (new URLSearchParams(window.location.search).get('src') === 'organic') {
        sessionStorage.removeItem('bb-lead-event-id');
        sessionStorage.removeItem('bb-lead-email');
        sessionStorage.removeItem('bb-lead-phone');
        return;
      }
    } catch { /* ignore */ }
    if (platform === 'meta' || platform === 'all') fireMeta();
    if (platform === 'google' || platform === 'all') fireGoogle();
    try {
      sessionStorage.removeItem('bb-lead-event-id');
      sessionStorage.removeItem('bb-lead-email');
      sessionStorage.removeItem('bb-lead-phone');
    } catch { /* ignore */ }
  }, [platform]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-20 text-center">
        <p className="text-sm font-semibold tracking-wide text-gray-400 mb-12">
          BLOK BLOK <span className="text-orange-400">STUDIO</span>
        </p>

        <AnimatedSection>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {plan ? plan.headline : "You're in. One more step."}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10">
            {plan
              ? plan.diagnosis
              : 'Your request is with us. Lock in your free 15-minute intro call now, the earliest slots go to whoever books first.'}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white shadow-2xl shadow-black/40">
            <iframe
              src={INTRO_CALL_EMBED}
              title="Book your free intro call"
              className="w-full h-[640px] sm:h-[700px] border-0"
              loading="eager"
            />
          </div>
          <p className="mt-4 text-xs text-gray-600 text-pretty">
            Calendar not loading?{' '}
            <a href={INTRO_CALL_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">
              Open it directly
            </a>
            . Prefer chat?{' '}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">
              Message us on WhatsApp
            </a>{' '}
            and we&apos;ll reply within&nbsp;minutes.
          </p>
        </AnimatedSection>

        {plan && (
          <AnimatedSection delay={0.1} className="mt-12 text-left">
            <div className="rounded-3xl border border-orange-500/20 bg-orange-500/[0.04] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-400/70 mb-5">What we&apos;ll cover on the call</p>
              <div className="space-y-5">
                {plan.items.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400" />
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-gray-400 text-sm leading-relaxed text-pretty">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 text-pretty">
              We&apos;ll go through all of it properly on the call, scope and cost included.
            </p>
          </AnimatedSection>
        )}

        {/* Proof sits under the calendar, not above it. Someone who already
            wants a time should not have to scroll past the pitch to reach the
            embed; someone still deciding gets the founder and the numbers
            right here. */}
        <AnimatedSection delay={0.15} className="mt-16 text-left">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-400/70">What happens next</p>
            {NEXT_STEPS.map((s) => (
              <div key={s.n} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-bold flex items-center justify-center">
                  {s.n}
                </span>
                <div>
                  <p className="text-white font-medium">{s.title}</p>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-16 text-left">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-orange-400/70 uppercase mb-2">
              Who you&apos;ll be talking to
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-balance">Meet the Founder</h2>
          </div>
          <FounderVideo />
        </AnimatedSection>

        <AnimatedSection delay={0.25} className="mt-16">
          <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-7xl px-5 sm:px-8 text-left">
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-orange-400/70 uppercase mb-2">
                The work, and the numbers
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-balance">Meet Our Clients</h2>
            </div>
            <CaseStudyGrid />
          </div>
        </AnimatedSection>


        {/* The funnel layout has no navbar, so this is the only way out of
            the page that is not the back button. It sits after the case
            studies on purpose: by then they have a reason to look around. */}
        <AnimatedSection delay={0.3} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-balance">
              Want to see more of the work?
            </h2>
            <p className="text-gray-500 text-sm mb-6 text-pretty">
              The full portfolio, the team, and how we build is all on the main&nbsp;site.
            </p>
            <a
              href="/"
              className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/40 transition-shadow hover:shadow-orange-500/60"
            >
              Visit blokblokstudio.com
            </a>
          </div>
        </AnimatedSection>

        <LandingFooter />
      </div>
    </div>
  );
}
