'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Turnstile } from './Turnstile';
import { BUSINESS_TYPES } from '@/data/business-types';
import { COUNTRIES, flagFor, DEFAULT_COUNTRY, toDialable } from '@/data/country-codes';
import { MARKETING_CONSENT } from '@/data/consent-text';
import {
  collectAttribution,
  getCookie,
  hasAdsConsent,
  thanksDestination,
  stashConversionIds,
} from '@/lib/lead-capture';
import { stashAnswers } from '@/lib/quiz-plan';

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
  'E-commerce',
  'Landing page',
  'Google Ads',
  'Meta Ads',
  'Social media',
  'Not sure yet',
];

/**
 * Which answers in question 2 are something we build once, and which are
 * something we run every month. The budget question has to follow, because a
 * site is a project fee and ads are a monthly spend: asking someone who only
 * wants Google Ads to pick from "Under €2k, landing page or a small refresh"
 * quotes them for work they did not ask for, in the wrong units.
 */
const AD_SERVICES = ['Google Ads', 'Meta Ads'];
const SOCIAL_SERVICES = ['Social media'];
const MARKETING_SERVICES = [...AD_SERVICES, ...SOCIAL_SERVICES];

// The real tiers, so the answer doubles as a price check and nobody books a
// call expecting a number that was never on offer. "Under €5k" is kept as an
// option deliberately: it is below where builds start, and it is better to
// know that from the form than forty minutes into a call.
const BUDGETS_BUILD = [
  { value: 'Under €5k', hint: 'Below where our builds start' },
  { value: 'Around €5k', hint: 'One-page site' },
  { value: 'Around €10k', hint: 'Four to five pages' },
  { value: 'Around €15k', hint: 'Around fifteen pages' },
  { value: '€20k+', hint: 'E-commerce, or something larger' },
];

// All monthly, and stated as monthly in the value itself so a tracker entry
// is never mistaken for a project figure.
//
// Three sets, because the number being asked for is a different number.
// Social is a service fee: €500 per channel per month to manage, plus €200
// per video, times the channel count. Paid ads is spend, on which the fee is
// 15% plus a one-off setup — so the useful question there is the spend, not
// the fee. Mixed gets the wider bands.
const BUDGETS_SOCIAL = [
  { value: 'Around €500 / month', hint: 'One channel, managed' },
  { value: '€1,000 – €2,000 / month', hint: 'One channel with regular video, or two channels' },
  { value: '€2,000 – €4,000 / month', hint: 'Two or three channels with video' },
  { value: '€4,000+ / month', hint: 'Several channels, video-heavy' },
];

const BUDGETS_ADS = [
  { value: 'Under €1,000 / month ad spend', hint: 'Testing the water' },
  { value: '€1,000 – €3,000 / month ad spend', hint: 'One platform, run properly' },
  { value: '€3,000 – €10,000 / month ad spend', hint: 'Both platforms, or scaling one' },
  { value: '€10,000+ / month ad spend', hint: 'Serious volume' },
];

const BUDGETS_MONTHLY = [
  { value: 'Under €1,000 / month', hint: 'Getting started' },
  { value: '€1,000 – €3,000 / month', hint: 'One channel or platform, run properly' },
  { value: '€3,000 – €6,000 / month', hint: 'Several running together' },
  { value: '€6,000+ / month', hint: 'Scaling hard' },
];

const TIMELINES = [
  { value: 'As soon as possible', hint: 'Ready to start now' },
  { value: 'Within a month', hint: 'Getting it moving soon' },
  { value: 'One to three months', hint: 'Planned, but not urgent' },
  { value: 'Just exploring', hint: 'Seeing what is out there' },
];

const TOTAL_STEPS = 5;

/**
 * One answer, rendered as a card with its state showing on the right.
 *
 * Everything is on screen at once on purpose: a dropdown hides the options
 * until you ask for them, which makes a quiz feel like a form. A radio dot
 * means one answer, a check means several.
 */
function ChoiceCard({
  label,
  hint,
  selected,
  multi,
  onSelect,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  multi?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onSelect}
      className={`group flex w-full items-center gap-2.5 rounded-xl border px-3 py-3 sm:px-4 sm:py-3.5 text-left transition-colors ${
        selected
          ? 'border-orange-500/60 bg-orange-500/15'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25'
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className={`block text-xs sm:text-sm font-medium leading-snug ${selected ? 'text-white' : 'text-gray-200'}`}>
          {label}
        </span>
        {hint && <span className="mt-0.5 block text-xs text-gray-500">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border transition-colors ${
          multi ? 'rounded-md' : 'rounded-full'
        } ${
          selected
            ? 'border-orange-400 bg-orange-400'
            : 'border-white/25 bg-transparent group-hover:border-white/40'
        }`}
      >
        {selected &&
          (multi ? (
            <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="h-2 w-2 rounded-full bg-black" />
          ))}
      </span>
    </button>
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
  // Fixed to Germany rather than read from the geo cookie. That cookie is
  // Vercel's IP lookup, and IP geolocation is wrong often enough to matter:
  // mobile carriers and VPNs routinely place a Berlin visitor in another
  // country. A German studio guessing German is right more often than a
  // lookup that was confidently showing +31 to someone in Berlin, and it is
  // one tap to change.
  const [dialIso, setDialIso] = useState(DEFAULT_COUNTRY);

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

  // Every pick has to be ongoing work before this becomes a monthly-spend
  // conversation. Tested against "every" rather than "no build work picked",
  // because "Not sure yet" is not a build service either and someone who
  // does not know yet should see the project framing, not a monthly one.
  const monthlyOnly =
    services.length > 0 && services.every((x) => MARKETING_SERVICES.includes(x));
  const adsOnly = monthlyOnly && services.every((x) => AD_SERVICES.includes(x));
  const socialOnly = monthlyOnly && services.every((x) => SOCIAL_SERVICES.includes(x));
  const budgets = !monthlyOnly
    ? BUDGETS_BUILD
    : adsOnly
      ? BUDGETS_ADS
      : socialOnly
        ? BUDGETS_SOCIAL
        : BUDGETS_MONTHLY;

  const inputBase =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.06] transition-colors';

  const canSubmit =
    contact.name.trim() !== '' && contact.email.includes('@') && consent && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');

    const phone = toDialable(dialIso, contact.phone);
    const eventId = stashConversionIds(contact.email, phone);
    // The thank-you page reads these back and turns them into the plan. That
    // plan is the reason anyone answered five questions, so it has to survive
    // the redirect.
    stashAnswers({ name: contact.name, business, services, budget, timeline });
    const fbclid = new URLSearchParams(window.location.search).get('fbclid') || undefined;

    const summary = [
      fieldTag.toUpperCase(),
      '',
      `Service interest: ${services.join(', ') || 'not specified'}`,
      `Budget: ${budget || 'not specified'}`,
      `Timeline: ${timeline || 'not specified'}`,
      phone ? `Phone: ${phone}` : null,
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
          phone: phone || undefined,
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
      sub: 'Pick the closest one.',
      body: (
        <div role="radiogroup" aria-label="Business type" className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {BUSINESS_TYPES.map((b) => (
            <ChoiceCard
              key={b}
              label={b}
              selected={business === b}
              onSelect={() => {
                setBusiness(b);
                setTimeout(() => go(1), 180);
              }}
            />
          ))}
        </div>
      ),
      canAdvance: business.trim() !== '',
    },
    {
      question: 'What do you need help with?',
      sub: 'Pick all that apply.',
      body: (
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {SERVICES.map((s) => (
            <ChoiceCard
              key={s}
              label={s}
              multi
              selected={services.includes(s)}
              onSelect={() => toggleService(s)}
            />
          ))}
        </div>
      ),
      canAdvance: services.length > 0,
    },
    {
      question: adsOnly
        ? "What could you spend on ads each month?"
        : monthlyOnly
          ? "What's your monthly budget?"
          : "What's your budget for this project?",
      sub: adsOnly
        ? 'Just the ad spend. Our management is 15% of it, plus a one-off setup. A ballpark is fine.'
        : monthlyOnly
          ? 'Roughly what you would put behind it each month. A ballpark is fine.'
          : 'A rough idea is fine. It just tells us what to suggest.',
      body: (
        <div role="radiogroup" aria-label="Budget" className="space-y-2.5">
          {budgets.map((o) => (
            <ChoiceCard
              key={o.value}
              label={o.value}
              hint={o.hint}
              selected={budget === o.value}
              onSelect={() => {
                setBudget(o.value);
                setTimeout(() => go(3), 180);
              }}
            />
          ))}
        </div>
      ),
      canAdvance: budget !== '',
    },
    {
      question: 'How soon do you want to start?',
      body: (
        <div role="radiogroup" aria-label="Timeline" className="space-y-2.5">
          {TIMELINES.map((o) => (
            <ChoiceCard
              key={o.value}
              label={o.value}
              hint={o.hint}
              selected={timeline === o.value}
              onSelect={() => {
                setTimeline(o.value);
                setTimeout(() => go(4), 180);
              }}
            />
          ))}
        </div>
      ),
      canAdvance: timeline !== '',
    },
    {
      question: 'Last step. How do we reach you?',
      sub: 'Then you pick a time. We reply within the hour during business hours.',
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
                  {/* Tel. is the German abbreviation and reads correctly to an
                      English speaker too, which matters on a page that is not
                      translated. */}
                  Tel. / WhatsApp{' '}
                  <span className="text-gray-600">(optional, for faster response)</span>
                </label>
                <div className="flex gap-2">
                  {/* Native select on purpose: on a phone this opens the OS
                      picker, which beats any custom dropdown for scrolling a
                      long list with a thumb. */}
                  <label htmlFor="quiz-dial" className="sr-only">
                    Country dialling code
                  </label>
                  <select
                    id="quiz-dial"
                    value={dialIso}
                    onChange={(e) => setDialIso(e.target.value)}
                    className="w-[5.5rem] sm:w-[8rem] flex-shrink-0 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3.5 text-xs sm:text-sm text-white focus:border-orange-500/40 focus:outline-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.iso} value={c.iso} className="bg-[#1a1a1a] text-white">
                        {flagFor(c.iso)} +{c.dial} {c.iso}
                      </option>
                    ))}
                  </select>
                  <input
                    id="quiz-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="160 1234567"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className={`${inputBase} min-w-0`}
                    autoComplete="tel-national"
                  />
                </div>
                {contact.phone.trim() && (
                  <p className="mt-1.5 ml-1 text-[11px] text-gray-600">
                    We&apos;ll call {toDialable(dialIso, contact.phone)}
                  </p>
                )}
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
                  {MARKETING_CONSENT.text}{' '}
                  <span className="text-gray-600">(optional)</span>
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
