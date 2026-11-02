/**
 * The exact sentence people agree to when they tick the marketing box.
 *
 * One constant per language, rendered by the checkbox and stored by the API,
 * so the recorded evidence is provably the wording that was on screen. The
 * API picks the language from the request rather than taking either the text
 * or the language from the body: consent evidence a client can set is not
 * evidence.
 *
 * Storing the language matters as much as storing the words. Someone who
 * ticked a German box did not agree to the English sentence, and "we showed
 * them the English one" is not a defence when the screenshot says otherwise.
 *
 * Do not edit a version in place. Reword by adding a new version and pointing
 * MARKETING_CONSENT at it, so rows recorded under the old wording still say
 * what those people actually agreed to.
 */

export interface ConsentWording {
  version: string;
  /** Keyed by site locale (src/i18n/locales.ts). Missing locales fall back to English. */
  text: { en: string } & Partial<Record<string, string>>;
}

const MARKETING_CONSENT_V2: ConsentWording = {
  version: 'marketing-2026-08-22',
  text: {
    en:
      'Yes, Blok Blok Studio can email me practical growth tips and occasional offers. ' +
      'We will send one email to confirm, and you are only subscribed once you click the ' +
      'link in it. Unsubscribe anytime.',
    de:
      'Ja, Blok Blok Studio darf mir praktische Wachstumstipps und gelegentliche Angebote ' +
      'per E-Mail senden. Wir senden eine E-Mail zur Bestätigung; erst mit dem Klick auf ' +
      'den Link darin sind Sie angemeldet. Jederzeit abbestellbar.',
  },
};

export const MARKETING_CONSENT = MARKETING_CONSENT_V2;

/** The sentence to show, for a given language. */
export function marketingConsentText(locale: string): string {
  const exact = Object.keys(MARKETING_CONSENT.text).find((k) => k.toLowerCase() === locale.toLowerCase());
  const base = locale.toLowerCase().split('-')[0];
  return MARKETING_CONSENT.text[exact ?? base] ?? MARKETING_CONSENT.text.en;
}

/**
 * What gets written to Lead.marketingConsentText: the version, the language
 * it was shown in, and the wording itself.
 */
export function marketingConsentRecord(locale: string): string {
  const exact = Object.keys(MARKETING_CONSENT.text).find((k) => k.toLowerCase() === locale.toLowerCase());
  const base = locale.toLowerCase().split('-')[0];
  const shown = exact ?? (MARKETING_CONSENT.text[base] ? base : 'en');
  return `[${MARKETING_CONSENT.version}/${shown}] ${marketingConsentText(shown)}`;
}
