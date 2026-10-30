/**
 * ============================================================================
 * ContactContent.tsx, Full /contact Page Component
 * ============================================================================
 *
 * PURPOSE:
 *   Renders the entire Contact page, including:
 *     1. A page header (title + subtitle)
 *     2. A contact form (name, email, company, message, submit button)
 *     3. A sidebar with contact info (email, phone, address) and a map placeholder
 *     4. A success message shown after form submission
 *
 * IMPORTANT, FORM DOES NOT SEND DATA:
 *   The form's handleSubmit currently just sets `submitted = true` to show
 *   the success message. It does NOT actually send the form data anywhere.
 *   You MUST integrate a backend service (API route, email service, etc.)
 *   to make the form functional. See the handleSubmit function below for
 *   where to add that logic.
 *
 * TRANSLATIONS:
 *   All user-facing text comes from the "contact" namespace in your
 *   translation JSON files (e.g., messages/en.json under "contact").
 *   Keys used:
 *     - contact.title        → page heading
 *     - contact.subtitle     → page subheading
 *     - contact.name         → name field label + placeholder
 *     - contact.email        → email field label + placeholder
 *     - contact.company      → company field label + placeholder
 *     - contact.message      → message field label + placeholder
 *     - contact.submit       → submit button text
 *     - contact.success      → success message heading
 *     - contact.info_title   → sidebar heading ("Contact Info" etc.)
 *     - contact.info_email   → displayed email address
 *     - contact.info_phone   → displayed phone number
 *     - contact.info_address → displayed physical address
 *
 * TO EDIT TEXT:
 *   - Page title/subtitle → edit "contact.title" / "contact.subtitle" in translation files
 *   - Form labels → edit "contact.name", "contact.email", etc.
 *   - Contact info → edit "contact.info_email", "contact.info_phone", "contact.info_address"
 *   - Success message → edit "contact.success"
 *
 * TO REPLACE THE MAP PLACEHOLDER:
 *   The map area at the bottom of the sidebar is currently a styled
 *   placeholder. Replace the placeholder div with an actual map embed
 *   (Google Maps iframe, Mapbox component, etc.). See the inline comment
 *   in the map section below.
 *
 * REFERENCED FILES / DEPENDENCIES:
 *   - ./AnimatedSection   → scroll-triggered reveal animation wrapper
 *   - next-intl           → i18n translation hook (useTranslations)
 *   - framer-motion       → animation library (motion for button + success message)
 *
 * STYLING:
 *   - Uses Tailwind CSS utility classes throughout.
 *   - "glass-card" is a custom utility class for the frosted-glass card look.
 *   - Responsive breakpoints: sm (640px), md (768px), lg (1024px).
 *   - Layout: 5-column grid on lg, form takes 3 cols, sidebar takes 2 cols.
 *
 * ============================================================================
 */

'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { Turnstile } from './Turnstile';
import { clientCities } from '@/data/client-locations';
import { motion } from 'framer-motion';

/**
 * ---------------------------------------------------------------------------
 * ContactContent Component
 * ---------------------------------------------------------------------------
 * Main export. Renders the full /contact page layout with form + sidebar.
 * ---------------------------------------------------------------------------
 */
export function ContactContent() {
  const tu = useTranslations('ui');
  /**
   * Translation hook, pulls all keys from the "contact" namespace.
   * To change any displayed text, edit your translation JSON files
   * (e.g., messages/en.json → "contact": { ... }).
   */
  const t = useTranslations('contact');
  const th = useTranslations('home');

  /**
   * Submission state, controls whether to show the form or the success message.
   * Set to `true` after the user clicks Submit.
   */
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timingToken] = useState(() => Date.now().toString(36));
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          consent: formData.get('consent') === 'on',
          _hp: formData.get('_hp'),
          _t: timingToken,
          _cf: turnstileToken,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /**
     * Outer section wrapper.
     * - pt-24 / sm:pt-32 → top padding (room for the fixed navbar)
     * - pb-16 / sm:pb-24 → bottom padding
     * - px-5 / sm:px-6 / lg:px-8 → horizontal padding
     */
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      {/* Max-width container, keeps content centered on wide screens */}
      <div className="max-w-7xl mx-auto">

        {/* ================================================================
            SECTION 1: Page Header (Title + Subtitle)
            ================================================================
            TO EDIT: Change "contact.title" and "contact.subtitle" in
            your translation files.
        */}
        <AnimatedSection className="mb-14 sm:mb-20">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-5">{t('info_title')}</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.02] tracking-[-0.02em] mb-6">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-lg text-gray-400">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* ================================================================
            MAIN LAYOUT: 5-Column Grid
            ================================================================
            On desktop (lg+):
              - Left side (3 cols): Contact form or success message
              - Right side (2 cols): Sidebar with contact info + map
            On mobile: stacks vertically (single column).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">

          {/* ==============================================================
              LEFT COLUMN: Contact Form / Success Message (3 of 5 cols)
              ==============================================================
          */}
          <AnimatedSection className="lg:col-span-3">
            {submitted ? (
              /* --------------------------------------------------------
                 SUCCESS MESSAGE
                 --------------------------------------------------------
                 Shown after the form is submitted. Animates in with
                 a fade + slight scale-up via framer-motion.

                 TO EDIT: Change "contact.success" in translation files
                 to update the success heading text.
              */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center"
              >
                {/* Green checkmark icon */}
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {/* Success heading, h2 to keep a clean H1 → H2 outline */}
                <h2 className="text-2xl font-semibold mb-2">{t('success')}</h2>
              </motion.div>
            ) : (
              /* --------------------------------------------------------
                 CONTACT FORM
                 --------------------------------------------------------
                 Contains: Name, Email, Company, Message, Submit button.
                 All labels and placeholders come from translations.

                 NOTE: The form does NOT send data, see handleSubmit above.
                 You need to add backend integration to make it work.
              */
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                {/* Honeypot, hidden from humans, bots fill it */}
                <input type="text" name="_hp" autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />

                {/* Name + Email fields, side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                  {/* Name field (required) */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm text-gray-300 mb-2">
                      {t('name')} <span aria-hidden="true" className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!error}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={t('name')}
                    />
                  </div>

                  {/* Email field (required) */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm text-gray-300 mb-2">
                      {t('email')} <span aria-hidden="true" className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!error}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={t('email')}
                    />
                  </div>
                </div>

                {/* Company field (optional) */}
                <div>
                  <label htmlFor="contact-company" className="block text-sm text-gray-300 mb-2">
                    {t('company')}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder={t('company')}
                  />
                </div>

                {/* Phone field (optional) */}
                <div>
                  <label htmlFor="contact-phone" className="block text-sm text-gray-300 mb-2">
                    {t('phone')}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder={t('phone')}
                  />
                </div>

                {/* Message textarea (required) */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm text-gray-300 mb-2">
                    {t('message')} <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    aria-required="true"
                    aria-invalid={!!error}
                    aria-describedby={error ? 'contact-form-error' : undefined}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder={t('message')}
                  />
                </div>

                {/* GDPR Consent Checkbox (required) */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    required
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-white accent-white cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                    {t('consent_text')}{' '}
                    <a href="/privacy" target="_blank" className="text-white hover:text-white/80 underline transition-colors">
                      {tu('footer_privacy')}
                    </a>.
                  </label>
                </div>

                <Turnstile onToken={onTurnstileToken} theme="dark" className="mb-2" />

                {error && (
                  <p
                    id="contact-form-error"
                    role="alert"
                    aria-live="assertive"
                    className="text-red-400 text-sm"
                  >
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={submitting || !turnstileToken}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-orange-500 text-(--bb-on-primary) font-medium hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : t('submit')}
                </motion.button>
              </form>
            )}
          </AnimatedSection>

          {/* ==============================================================
              RIGHT COLUMN: Contact Info Sidebar (2 of 5 cols)
              ==============================================================
              Contains:
                - Contact info heading
                - Email, Phone, and Address blocks (each with an icon)
                - A map placeholder at the bottom
          */}
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 sm:space-y-8">

              {/* Sidebar heading, h2 keeps the heading outline contiguous
                  under the page H1 (don't skip levels). */}
              <h2 className="text-lg font-semibold">{t('info_title')}</h2>

              {/* Where we are: studio cities only. Everything funnels through Blok Blok Studio. */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">{tu('contact_location')}</p>
                <p className="mt-3 text-base text-white">Blok Blok Studio</p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-400">
                  {clientCities.filter((c) => c.studio).map((c, i, arr) => (
                    <li key={c.city}>
                      {c.city}
                      {c.tag ? ` (${c.tag})` : ''}
                      {i < arr.length - 1 ? ' ·' : ''}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct lines */}
              <div className="grid gap-2">
                <a href="https://wa.me/491627055848" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4 text-sm text-white transition-colors hover:bg-white/5">
                  {th('v2_whatsapp')}
                  <span aria-hidden="true" className="text-orange-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
                <a href="https://calendar.app.google/oAcFYPRKYB9b4J1c7" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4 text-sm text-white transition-colors hover:bg-white/5">
                  {th('v2_book')}
                  <span aria-hidden="true" className="text-orange-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
