'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';
import { Turnstile } from './Turnstile';
import { BusinessPicker } from './BusinessPicker';
import { LandingFooter } from './LandingFooter';

/**
 * /go — dedicated landing page for Meta + Google ad traffic.
 * One job: capture the lead, then hand off to /go/thanks where the
 * conversion event fires and the intro call gets booked.
 * No navbar, no footer, no exit paths except the form.
 */

const SERVICES = ['Website', 'Google / Meta Ads', 'Social Media', 'AI & Automation', 'Not sure yet'];

const PROOF_STATS = [
  { value: '200%+', label: 'client consultations after launch (Coach Kofi)' },
  { value: '<7 days', label: 'from kickoff to first deliverable' },
  { value: '100%', label: 'custom-built, no templates' },
];

const TESTIMONIALS = [
  {
    quote: 'They built my entire site from scratch and now clients book and pay directly through it. I used to waste hours on DMs and invoices.',
    name: 'Luke Satterly',
    role: 'Personal Trainer, Berlin',
  },
  {
    quote: 'The design matched my energy perfectly. Consultations went up over 200% after launch and the site basically sells for me now.',
    name: 'Coach Kofi',
    role: 'Fitness Coach, Berlin',
  },
];

const STEPS = [
  { n: '1', title: 'Tell us what you need', desc: 'Fill out the form. Takes 30 seconds.' },
  { n: '2', title: 'Free 15-minute intro call', desc: 'We look at your business and map the fastest wins. No pitch, no pressure.' },
  { n: '3', title: 'Get your growth plan', desc: 'A concrete plan with scope, timeline, and price. Use it with us or without us.' },
];

/** Collect ad attribution from the URL so the sales team sees exactly which ad produced the lead. */
function collectAttribution(): string {
  try {
    const p = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
    const parts = keys.filter((k) => p.get(k)).map((k) => `${k}=${p.get(k)}`);
    if (document.referrer) parts.push(`referrer=${document.referrer}`);
    return parts.join(' | ');
  } catch {
    return '';
  }
}

/** Read a cookie value (for Meta's _fbp browser id). */
function getCookie(name: string): string {
  try {
    return document.cookie.split('; ').find((c) => c.startsWith(name + '='))?.split('=')[1] || '';
  } catch {
    return '';
  }
}

/** Marketing-cookie consent state — gates server-side ad tracking (CAPI). */
function hasAdsConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie-consent');
    return raw ? JSON.parse(raw).marketing === true : false;
  } catch {
    return false;
  }
}

/**
 * Pick the platform-specific thank-you page so each ad platform gets one
 * clean conversion URL: Meta clicks → /go/thanks/meta, Google clicks →
 * /go/thanks/google, anything else → /go/thanks (fires both, guarded).
 */
function thanksDestination(): string {
  try {
    const p = new URLSearchParams(window.location.search);
    const src = (p.get('utm_source') || '').toLowerCase();
    if (p.get('fbclid') || ['meta', 'facebook', 'instagram', 'fb', 'ig'].includes(src)) return '/go/thanks/meta';
    if (p.get('gclid') || p.get('wbraid') || p.get('gbraid') || src === 'google') return '/go/thanks/google';
    return '/go/thanks';
  } catch {
    return '/go/thanks';
  }
}

export function GoContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business: '', service: '', _hp: '' });
  const [consent, setConsent] = useState(false);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timingToken] = useState(() => Date.now().toString(36));
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const attribution = useRef('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    attribution.current = collectAttribution();
  }, []);

  const inputBase =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.06] transition-colors';

  const canSubmit =
    formData.name.trim() !== '' &&
    formData.email.includes('@') &&
    formData.business.trim() !== '' &&
    formData.service !== '' &&
    consent;

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError('');

    // Shared browser/server event id so Meta deduplicates the pixel Lead
    // (thank-you page) against the Conversions API Lead (server)
    const eventId = crypto.randomUUID();
    try {
      sessionStorage.setItem('bb-lead-event-id', eventId);
    } catch { /* private mode — pixel event just won't carry the id */ }
    const fbclid = new URLSearchParams(window.location.search).get('fbclid') || undefined;

    const summary = [
      'AD LEAD',
      '',
      `Service interest: ${formData.service}`,
      formData.phone ? `Phone: ${formData.phone}` : null,
      attribution.current ? `Attribution: ${attribution.current}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          field: 'Ad Lead',
          business: formData.business,
          website: '',
          noWebsite: true,
          problem: summary,
          consent: true,
          emailOptIn,
          source: 'ads',
          _eid: eventId,
          _fbclid: fbclid,
          _fbp: getCookie('_fbp') || undefined,
          adsConsent: hasAdsConsent(),
          _hp: formData._hp,
          _t: timingToken,
          _cf: turnstileToken,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }
      router.push(thanksDestination());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
        {/* Brand mark */}
        <p className="text-sm font-semibold tracking-wide text-gray-400 mb-10 sm:mb-14">
          BLOK BLOK <span className="text-orange-400">STUDIO</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Left: pitch ── */}
          <div>
            <AnimatedSection>
              <p className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.2em] text-orange-400/80 border border-orange-500/20 bg-orange-500/[0.06] rounded-full px-3 py-1 mb-5">
                Free growth plan for your business
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5">
                More customers. Less busywork.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Done for you.
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                We build the websites, ads, and AI systems that bring in customers on autopilot, for businesses
                that are great at what they do and tired of being a secret.
              </p>
            </AnimatedSection>

            {/* Mobile: form comes right after the headline */}
            <div className="lg:hidden mb-10" ref={formRef}>
              <LeadFormCard />
            </div>

            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-3 gap-3 mb-10">
                {PROOF_STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <p className="text-lg sm:text-2xl font-bold text-orange-400">{s.value}</p>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="space-y-4 mb-10">
                {STEPS.map((s) => (
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

            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {TESTIMONIALS.map((t) => (
                  <figure key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <blockquote className="text-gray-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-3 text-xs text-gray-500">
                      <span className="text-white font-medium">{t.name}</span> &middot; {t.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </AnimatedSection>

            {/* Mobile: bottom CTA back to form */}
            <div className="lg:hidden mt-10">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={scrollToForm}
                className="w-full py-4 rounded-full bg-white text-black font-semibold text-sm"
              >
                Get my free growth plan
              </motion.button>
            </div>
          </div>

          {/* ── Right: form (desktop, sticky) ── */}
          <div className="hidden lg:block lg:sticky lg:top-10">
            <LeadFormCard />
          </div>
        </div>

        <LandingFooter />
      </div>
    </div>
  );

  function LeadFormCard() {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 sm:p-8 shadow-2xl shadow-black/40">
        <h2 className="text-xl sm:text-2xl font-bold mb-1.5">Get your free growth plan</h2>
        <p className="text-gray-500 text-sm mb-6">30 seconds. No commitment. We reply the same day.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <input
            type="text"
            name="_hp"
            value={formData._hp}
            onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute opacity-0 h-0 w-0 pointer-events-none"
          />

          <div>
            <label htmlFor="go-name" className="block text-xs text-gray-400 mb-1.5 ml-1">Your Name</label>
            <input id="go-name" type="text" required placeholder="John Smith" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputBase} />
          </div>

          <div>
            <label htmlFor="go-email" className="block text-xs text-gray-400 mb-1.5 ml-1">Email Address</label>
            <input id="go-email" type="email" required placeholder="john@company.com" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputBase} />
          </div>

          <div>
            <label htmlFor="go-phone" className="block text-xs text-gray-400 mb-1.5 ml-1">Phone / WhatsApp <span className="text-gray-600">(optional, for faster response)</span></label>
            <input id="go-phone" type="tel" placeholder="+49 160 1234567" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputBase} autoComplete="tel" />
          </div>

          <div>
            <label htmlFor="go-business" className="block text-xs text-gray-400 mb-1.5 ml-1">What type of business do you run?</label>
            <BusinessPicker id="go-business" value={formData.business}
              onChange={(val) => setFormData({ ...formData, business: val })} inputBase={inputBase} />
          </div>

          <div>
            <p className="block text-xs text-gray-400 mb-2 ml-1">What do you need help with?</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData({ ...formData, service: s })}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm border transition-colors ${
                    formData.service === s
                      ? 'border-orange-500/60 bg-orange-500/15 text-orange-300'
                      : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/25'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-orange-500"
              required
            />
            <span className="text-xs text-gray-500 leading-relaxed">
              I agree to the{' '}
              <Link href="/privacy" target="_blank" className="text-gray-300 underline hover:text-white">Privacy Policy</Link>{' '}
              and consent to being contacted about my inquiry.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailOptIn}
              onChange={(e) => setEmailOptIn(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-orange-500"
            />
            <span className="text-xs text-gray-500 leading-relaxed">
              Yes, send me practical growth tips and occasional offers by email. Unsubscribe anytime.{' '}
              <span className="text-gray-600">(optional)</span>
            </span>
          </label>

          <Turnstile onToken={onTurnstileToken} size="normal" className="pt-1" />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            type="submit"
            disabled={!canSubmit || submitting}
            whileHover={{ scale: canSubmit && !submitting ? 1.02 : 1 }}
            whileTap={{ scale: canSubmit && !submitting ? 0.98 : 1 }}
            className={`w-full py-4 rounded-full font-semibold text-sm transition-colors ${
              canSubmit && !submitting
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-white/10 text-gray-500 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Sending...' : 'Get my free growth plan'}
          </motion.button>

          <p className="text-center text-[11px] text-gray-600">
            No spam. No obligation. Your data stays with us.
          </p>
        </form>
      </div>
    );
  }
}
