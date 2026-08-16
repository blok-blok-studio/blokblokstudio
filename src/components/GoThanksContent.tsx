'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { LandingFooter } from './LandingFooter';

/**
 * Thank-you / conversion pages for the /vsl ad funnel (routes live under /go/thanks for pixel-destination stability).
 * The form routes each lead to a platform-specific URL so every ad platform
 * gets ONE clean conversion signal and campaign setup is a plain page-view rule:
 *   /go/thanks/meta    — Meta traffic  → fires fbq('track', 'Lead')
 *   /go/thanks/google  — Google traffic → fires the Google Ads conversion
 *   /go/thanks         — direct/unknown → fires both (each is a no-op if absent)
 *   /go/thanks?src=organic — organic pitch links → fires nothing
 * Events only exist if the visitor consented to marketing cookies (AdsPixels).
 */

const INTRO_CALL_LINK = 'https://calendar.app.google/frvo4DLJAJYG2HLWA';
const WHATSAPP_LINK =
  'https://wa.me/491627055848?text=Hey%20Chase%2C%20I%20just%20sent%20a%20growth%20plan%20request%20on%20your%20site.';

// Optional: exact Google Ads conversion action ("AW-XXXXXXX/AbCdEfGh").
// Without it we fire the generic generate_lead event instead.
const GOOGLE_CONVERSION = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION;

const NEXT_STEPS = [
  { n: '1', title: 'Book your intro call below', desc: '15 minutes. We learn about your business and what you need.' },
  { n: '2', title: 'We build your growth plan', desc: 'You get a concrete plan on the follow-up strategy call: scope, timeline, price.' },
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
  if (GOOGLE_CONVERSION) {
    window.gtag?.('event', 'conversion', { send_to: GOOGLE_CONVERSION });
  } else {
    window.gtag?.('event', 'generate_lead', { event_category: 'ads_funnel' });
  }
}

export function GoThanksContent({ platform = 'all' }: { platform?: 'meta' | 'google' | 'all' }) {
  const fired = useRef(false);

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
        return;
      }
    } catch { /* ignore */ }
    if (platform === 'meta' || platform === 'all') fireMeta();
    if (platform === 'google' || platform === 'all') fireGoogle();
    try {
      sessionStorage.removeItem('bb-lead-event-id');
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">You&apos;re in. One more step.</h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10">
            Your request is with us. Lock in your free 15-minute intro call now, the leads who book right away
            get their growth plan first.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <motion.a
            href={INTRO_CALL_LINK}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors"
          >
            Book my free intro call
          </motion.a>
          <p className="mt-4 text-xs text-gray-600">
            Prefer chat?{' '}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">
              Message us on WhatsApp
            </a>{' '}
            and we&apos;ll reply within minutes.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-14 text-left">
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

        <LandingFooter />
      </div>
    </div>
  );
}
