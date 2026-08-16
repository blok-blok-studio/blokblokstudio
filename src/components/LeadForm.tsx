'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Turnstile } from './Turnstile';
import { BusinessPicker } from './BusinessPicker';

/**
 * Ad-funnel lead form, rendered on /vsl under
 * the video. Owns capture state, ad attribution, consent gating, spam
 * protection, Meta CAPI event id, and the platform-specific thank-you
 * redirect. `fieldTag` labels the lead in the site DB + tracker so each
 * page's leads are distinguishable ("Ad Lead" vs "VSL Lead").
 */

const SERVICES = ['New website', 'Website redesign', 'Online shop', 'Landing page', 'Not sure yet'];

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

/** Read a cookie value (Meta's _fbp browser id, geo country). */
function getCookie(name: string): string {
  try {
    return document.cookie.split('; ').find((c) => c.startsWith(name + '='))?.split('=')[1] || '';
  } catch {
    return '';
  }
}

// Opt-in jurisdictions (GDPR/UK/CH) — everywhere else runs opt-out,
// mirroring the AdsPixels loader
const OPT_IN_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
]);

/** Ad-tracking consent state — gates the server-side Meta CAPI event.
 *  Explicit banner choice wins; with no choice, non-EEA visitors are opt-out. */
function hasAdsConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie-consent');
    if (raw) return JSON.parse(raw).marketing === true;
    const country = getCookie('bb_country');
    return country !== '' && !OPT_IN_COUNTRIES.has(country);
  } catch {
    return false;
  }
}

/**
 * Pick the platform-specific thank-you page so each ad platform gets one
 * clean conversion URL: Meta clicks → /vsl/thanks/meta, Google clicks →
 * /vsl/thanks/google, anything else → /vsl/thanks (fires both, guarded).
 */
function thanksDestination(): string {
  try {
    const p = new URLSearchParams(window.location.search);
    const src = (p.get('utm_source') || '').toLowerCase();
    // Organic pitch links (docs/pitch-templates.md) checked first: the IG
    // in-app browser can append fbclid to organic links, and these leads
    // must never fire ad conversion pixels.
    if (['dm', 'text', 'cold-email', 'warm-email'].includes(src)) return '/vsl/thanks?src=organic';
    if (p.get('fbclid') || ['meta', 'facebook', 'instagram', 'fb', 'ig'].includes(src)) return '/vsl/thanks/meta';
    if (p.get('gclid') || p.get('wbraid') || p.get('gbraid') || src === 'google') return '/vsl/thanks/google';
    return '/vsl/thanks';
  } catch {
    return '/vsl/thanks';
  }
}

export function LeadForm({ fieldTag = 'Ad Lead' }: { fieldTag?: string }) {
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
      // For Google Enhanced Conversions on the thank-you page: gtag hashes
      // these client-side; cleared right after the conversion fires.
      sessionStorage.setItem('bb-lead-email', formData.email.trim().toLowerCase());
      if (formData.phone) {
        sessionStorage.setItem('bb-lead-phone', formData.phone.replace(/[^0-9+]/g, ''));
      }
    } catch { /* private mode — pixel event just won't carry the id */ }
    const fbclid = new URLSearchParams(window.location.search).get('fbclid') || undefined;

    const summary = [
      fieldTag.toUpperCase(),
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
          field: fieldTag,
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
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 sm:p-8 shadow-2xl shadow-black/40 text-left">
      <h2 className="text-xl sm:text-2xl font-bold mb-1.5">Get your free Growth Plan</h2>
      <p className="text-gray-500 text-sm mb-4">30 seconds to request. We reply within the hour during business hours.</p>
      <ul className="mb-6 space-y-1.5">
        {[
          'A teardown of your website, ads, and follow-up',
          'Your 3 fastest wins, priced, with expected returns',
          'Yours to keep, whether we work together or not',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
            <span className="text-orange-400 mt-0.5">&#10003;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

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
          <label htmlFor="lead-name" className="block text-xs text-gray-400 mb-1.5 ml-1">Your Name</label>
          <input id="lead-name" type="text" required placeholder="John Smith" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputBase} />
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-xs text-gray-400 mb-1.5 ml-1">Email Address</label>
          <input id="lead-email" type="email" required placeholder="john@company.com" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputBase} />
        </div>

        <div>
          <label htmlFor="lead-phone" className="block text-xs text-gray-400 mb-1.5 ml-1">Phone / WhatsApp <span className="text-gray-600">(optional, for faster response)</span></label>
          <input id="lead-phone" type="tel" placeholder="+49 160 1234567" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputBase} autoComplete="tel" />
        </div>

        <div>
          <label htmlFor="lead-business" className="block text-xs text-gray-400 mb-1.5 ml-1">What type of business do you run?</label>
          <BusinessPicker id="lead-business" value={formData.business}
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

        {/* max-w-full + overflow-hidden: the widget iframe is a fixed 300px wide,
            which otherwise forces horizontal page scroll on sub-360px screens */}
        <Turnstile onToken={onTurnstileToken} size="normal" className="pt-1 max-w-full overflow-hidden" />

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
          No spam. No obligation. You keep the plan either way.
        </p>
        <p className="text-center text-[11px] text-gray-600">
          Trusted by Berlin businesses like Coach Kofi (+200% consultations after launch).
        </p>
      </form>
    </div>
  );
}
