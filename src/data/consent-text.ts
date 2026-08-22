/**
 * The exact sentence people agree to when they tick the marketing box.
 *
 * One constant, rendered by the checkbox and stored by the API, so the
 * recorded evidence is provably the wording that was on screen. The API does
 * not take this from the request body on purpose: consent evidence a client
 * can set is not evidence.
 *
 * Do not edit in place. Reword by adding a new version below and pointing
 * MARKETING_CONSENT at it, so rows recorded under the old wording still say
 * what those people actually agreed to. That is the whole reason the text is
 * stored per lead rather than looked up at read time.
 */

export interface ConsentWording {
  version: string;
  text: string;
}

const MARKETING_CONSENT_V1: ConsentWording = {
  version: 'marketing-2026-08-22',
  text:
    'Yes, Blok Blok Studio can email me practical growth tips and occasional offers. ' +
    'We will send one email to confirm, and you are only subscribed once you click the ' +
    'link in it. Unsubscribe anytime.',
};

export const MARKETING_CONSENT = MARKETING_CONSENT_V1;

/** What gets written to Lead.marketingConsentText: the wording plus its version. */
export function marketingConsentRecord(): string {
  return `[${MARKETING_CONSENT.version}] ${MARKETING_CONSENT.text}`;
}
