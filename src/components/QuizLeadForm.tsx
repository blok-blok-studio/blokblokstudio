'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Turnstile } from './Turnstile';
import { BusinessPicker } from './BusinessPicker';
import {
  collectAttribution,
  getCookie,
  hasAdsConsent,
  thanksDestination,
  stashConversionIds,
} from '@/lib/lead-capture';

/**
 * Stepped qualifying quiz under the video on /start.
 *
 * Replaces the single-screen form that asked for five things at once. Cold ad
 * traffic abandons a wall of fields; one question at a time with visible
 * progress converts better and, because the contact details come last, the
 * qualifying answers are already in hand by the time anyone hesitates.
 *
 * The submission payload, attribution capture, consent gating, spam checks,
 * and platform-specific thank-you routing are unchanged from the old form —
 * they live in lib/lead-capture.ts now. Budget and timeline are new and ride
 * along in the summary that reaches the tracker.
 */

const SERVICES = [
  'New website',
  'Website redesign',
  'Online shop',
  'Landing page',
  'Google Ads',
  'Meta Ads',
  'Not sure yet',
];

const BUDGETS = [
  { value: 'Under €2k', hint: 'Landing page or a small refresh' },
  { value: '€2k – €5k', hint: 'Most multi-page sites start here' },
  { value: '€5k – €10k', hint: 'Larger build, shop, or site plus ads' },
  { value: '€10k+', hint: 'Full build with ongoing growth work' },
];

const TIMELINES = [
  { value: 'As soon as possible', hint: 'Ready to start now' },
  { value: 'Within a month', hint: 'Planning it in' },
  { value: 'One to three months', hint: 'On the roadmap' },
  { value: 'Just exploring', hint: 'Gathering options' },
];

const TOTAL_STEPS = 5;

/** Single-select card list. Picking auto-advances, which is what makes it feel like a quiz. */
function CardChoice({
  options,
  selected,
  onPick,
}: {
  options: { value: string; hint: string }[];
  selected: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={selected === o.value}
          onClick={() => onPick(o.value)}
          className={`w-full rounded-xl border px-4 py-3.5 text-left transition-colors ${
            selected === o.value
              ? 'border-orange-500/60 bg-orange-500/15'
              : 'border-white/10 bg-white/[0.03] hover:border-white/25'
          }`}
        >
          <span className="block text-sm sm:text-base font-medium text-white">{o.value}</span>
          <span className="block text-xs text-gray-500 mt-0.5">{o.hint}</span>
        </button>
      ))}
    </div>
  );
}

export function QuizLeadForm({
  fieldTag = 'Start Lead',
  ctaLabel = 'Book my call',
}: {
  fieldTag?: string;
  ctaLabel?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [business, setBusiness] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', phone: '', _hp: '' });

  const [consent, setConsent] = useState(false);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timingToken] = useState(() => Date.now().toString(36));
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const attribution = useRef('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    attribution.current = collectAttribution();
  }, []);

  // Move focus to the new question so the step change is announced rather
  // than silently swapping content under a screen reader.
  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const toggleService = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const inputBase =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.06] transition-colors';

  const canSubmit =
    contact.name.trim() !== '' && contact.email.includes('@') && consent && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');

    const eventId = stashConversionIds(contact.email, contact.phone);
    const fbclid = new URLSearchParams(window.location.search).get('fbclid') || undefined;

    const summary = [
      fieldTag.toUpperCase(),
      '',
      `Service interest: ${services.join(', ') || 'not specified'}`,
      `Budget: ${budget || 'not specified'}`,
      `Timeline: ${timeline || 'not specified'}`,
      contact.phone ? `Phone: ${contact.phone}` : null,
      attribution.current ? `Attribution: ${attribution.current}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone || undefined,
          field: fieldTag,
          business,
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
          _hp: contact._hp,
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

  const steps = [
    {
      question: 'What type of business do you run?',
      body: (
        <BusinessPicker id="quiz-business" value={business} onChange={setBusiness} inputBase={inputBase} />
      ),
      canAdvance: business.trim() !== '',
    },
    {
      question: 'What do you need help with?',
      sub: 'Pick all that apply.',
      body: (
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={services.includes(s)}
              onClick={() => toggleService(s)}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm border transition-colors ${
                services.includes(s)
                  ? 'border-orange-500/60 bg-orange-500/15 text-orange-300'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/25'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      ),
      canAdvance: services.length > 0,
    },
    {
      question: "What's your budget for this project?",
      sub: 'Rough band is fine. It tells us what to propose.',
      body: (
        <CardChoice
          options={BUDGETS}
          selected={budget}
          onPick={(v) => {
            setBudget(v);
            setTimeout(() => go(3), 180);
          }}
        />
      ),
      canAdvance: budget !== '',
    },
    {
      question: 'How soon do you want to start?',
      body: (
        <CardChoice
          options={TIMELINES}
          selected={timeline}
          onPick={(v) => {
            setTimeline(v);
            setTimeout(() => go(4), 180);
          }}
        />
      ),
      canAdvance: timeline !== '',
    },
    {
      question: 'Where should we send the plan?',
      sub: 'We reply within the hour during business hours.',
      body: null, // the final step renders the real <form> below
      canAdvance: canSubmit,
    },
  ];

  const current = steps[step];
  const isLast = step === TOTAL_STEPS - 1;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 sm:p-8 shadow-2xl shadow-black/40 text-left">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < step ? 'w-6 bg-orange-500/70' : i === step ? 'w-6 bg-orange-400' : 'w-3 bg-white/15'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] uppercase tracking-[0.15em] text-gray-500">
          Question {step + 1} of {TOTAL_STEPS}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: direction * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -24 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-xl sm:text-2xl font-bold mb-1.5 outline-none text-balance"
          >
            {current.question}
          </h2>
          {current.sub && <p className="text-gray-500 text-sm mb-5 text-pretty">{current.sub}</p>}
          {!current.sub && <div className="mb-5" />}

          {isLast ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                name="_hp"
                value={contact._hp}
                onChange={(e) => setContact({ ...contact, _hp: e.target.value })}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute opacity-0 h-0 w-0 pointer-events-none"
              />

              <div>
                <label htmlFor="quiz-name" className="block text-xs text-gray-400 mb-1.5 ml-1">
                  Your Name
                </label>
                <input
                  id="quiz-name"
                  type="text"
                  required
                  placeholder="John Smith"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className={inputBase}
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="quiz-email" className="block text-xs text-gray-400 mb-1.5 ml-1">
                  Email Address
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className={inputBase}
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="quiz-phone" className="block text-xs text-gray-400 mb-1.5 ml-1">
                  Phone / WhatsApp{' '}
                  <span className="text-gray-600">(optional, for faster response)</span>
                </label>
                <input
                  id="quiz-phone"
                  type="tel"
                  placeholder="+49 160 1234567"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className={inputBase}
                  autoComplete="tel"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-orange-500"
                  required
                />
                <span className="text-xs text-gray-500 leading-relaxed text-pretty">
                  I agree to the{' '}
                  <Link href="/privacy" target="_blank" className="text-gray-300 underline hover:text-white">
                    Privacy Policy
                  </Link>{' '}
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
                <span className="text-xs text-gray-500 leading-relaxed text-pretty">
                  Yes, send me practical growth tips and occasional offers by email.
                  Unsubscribe&nbsp;anytime. <span className="text-gray-600">(optional)</span>
                </span>
              </label>

              {/* max-w-full + overflow-hidden: the widget iframe is a fixed 300px wide,
                  which otherwise forces horizontal page scroll on sub-360px screens */}
              <Turnstile onToken={onTurnstileToken} size="normal" className="pt-1 max-w-full overflow-hidden" />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                className={`w-full py-4 rounded-full font-semibold text-sm transition-all duration-300 ${
                  canSubmit
                    ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-black shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                {submitting ? 'Sending...' : ctaLabel}
              </motion.button>
            </form>
          ) : (
            <>
              {current.body}
              <button
                type="button"
                disabled={!current.canAdvance}
                onClick={() => go(step + 1)}
                className={`mt-6 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  current.canAdvance
                    ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-black shadow-lg shadow-orange-500/40'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            &larr; Back
          </button>
        ) : (
          <span />
        )}
        <p className="text-[11px] text-gray-600">No spam. No obligation.</p>
      </div>
    </div>
  );
}
