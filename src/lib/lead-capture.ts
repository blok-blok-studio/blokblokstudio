/**
 * Client-side plumbing shared by the ad-funnel forms.
 *
 * Everything here runs in the browser and touches window/document, so it is
 * only ever called from a 'use client' component. It was extracted out of
 * LeadForm when that became the stepped quiz — the attribution, consent
 * gating, and conversion-routing rules are the fiddly part and must stay
 * identical no matter what the form looks like.
 */

/** Ad attribution from the URL, so the sales team sees which ad produced the lead. */
export function collectAttribution(): string {
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
export function getCookie(name: string): string {
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
export function hasAdsConsent(): boolean {
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
 * clean conversion URL: Meta clicks → /start/thanks/meta, Google clicks →
 * /start/thanks/google, anything else → /start/thanks (fires both, guarded).
 *
 * These paths are configured as conversion URLs inside Google Ads and Meta.
 * Changing them means changing them there too.
 */
export function thanksDestination(): string {
  try {
    const p = new URLSearchParams(window.location.search);
    const src = (p.get('utm_source') || '').toLowerCase();
    // Organic pitch links (docs/pitch-templates.md) checked first: the IG
    // in-app browser can append fbclid to organic links, and these leads
    // must never fire ad conversion pixels.
    if (['dm', 'text', 'cold-email', 'warm-email'].includes(src)) return '/start/thanks?src=organic';
    if (p.get('fbclid') || ['meta', 'facebook', 'instagram', 'fb', 'ig'].includes(src)) return '/start/thanks/meta';
    if (p.get('gclid') || p.get('wbraid') || p.get('gbraid') || src === 'google') return '/start/thanks/google';
    return '/start/thanks';
  } catch {
    return '/start/thanks';
  }
}

/**
 * Stash the identifiers the thank-you page needs before we navigate to it:
 * a shared event id so Meta deduplicates its pixel Lead against the server
 * Conversions API Lead, and the hashed-client-side fields for Google Enhanced
 * Conversions. Returns the event id. Private mode just loses the dedupe.
 */
export function stashConversionIds(email: string, phone?: string): string {
  const eventId = crypto.randomUUID();
  try {
    sessionStorage.setItem('bb-lead-event-id', eventId);
    sessionStorage.setItem('bb-lead-email', email.trim().toLowerCase());
    if (phone) sessionStorage.setItem('bb-lead-phone', phone.replace(/[^0-9+]/g, ''));
  } catch {
    /* private mode — the pixel event just will not carry the id */
  }
  return eventId;
}
