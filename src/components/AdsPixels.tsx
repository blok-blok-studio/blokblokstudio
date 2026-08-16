'use client';

import { useEffect, useState } from 'react';

/**
 * Consent-gated ad pixel loader (GDPR).
 * Loads Meta Pixel and Google tag ONLY after the visitor grants marketing
 * consent via the cookie banner, and only when the corresponding env var
 * is set. With no IDs configured this component does nothing at all.
 *
 *   NEXT_PUBLIC_META_PIXEL_ID   — Meta (Facebook/Instagram) Pixel ID
 *   NEXT_PUBLIC_GOOGLE_ADS_ID   — Google tag ID (AW-XXXXXXXXXX)
 *   NEXT_PUBLIC_GA_ID           — GA4 measurement ID (G-XXXXXXXXXX)
 *
 * GA4 defaults to the studio's own property so analytics work without a
 * Vercel env change; the env var still overrides it.
 */

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-61T84KHDRL';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Jurisdictions requiring prior opt-in consent for ad cookies (GDPR/UK
// GDPR/Swiss FADP). Everywhere else (e.g. US) runs opt-out: pixels load
// unless the visitor has explicitly declined in the banner.
const OPT_IN_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
]);

function getCountry(): string {
  try {
    return document.cookie.split('; ').find((c) => c.startsWith('bb_country='))?.split('=')[1] || '';
  } catch {
    return '';
  }
}

/**
 * Whether pixels may load right now:
 *  - explicit banner choice always wins (accept → yes, decline → no)
 *  - no choice yet: opt-in regimes wait for the banner; opt-out regimes
 *    (known non-EEA country) load immediately
 */
function mayTrack(): boolean {
  try {
    const raw = localStorage.getItem('cookie-consent');
    if (raw) return JSON.parse(raw).marketing === true;
    const country = getCountry();
    return country !== '' && !OPT_IN_COUNTRIES.has(country);
  } catch {
    return false;
  }
}

function loadMetaPixel(id: string) {
  if (window.fbq) {
    window.fbq('consent', 'grant');
    return;
  }
  const fbq: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: unknown; push?: unknown } =
    function (...args: unknown[]) {
      // Queue calls until the script loads and replaces this stub
      (fbq.queue = fbq.queue || []).push(args);
    };
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
  // Explicit consent signal before init (Meta consent API)
  window.fbq('consent', 'grant');
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

// Measurement/conversion ids already passed to gtag('config', ...), so a
// consent re-grant doesn't double-configure and a late-loading second
// product (Ads vs GA4) still gets configured on the shared gtag.js.
const configuredGoogleIds = new Set<string>();

function loadGoogleTag(ids: string[]) {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    // gtag.js requires the raw `arguments` object on the dataLayer — pushing
    // a plain array silently breaks command processing
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    // Consent Mode v2: defaults MUST be set before config. Required for
    // EU-targeted Google Ads (EU User Consent Policy) — includes the v2
    // signals ad_user_data and ad_personalization.
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`;
    document.head.appendChild(s);
    window.gtag('js', new Date());
  }
  for (const id of ids) {
    if (configuredGoogleIds.has(id)) continue;
    configuredGoogleIds.add(id);
    window.gtag('config', id);
  }
  grantGoogleConsent();
}

function grantGoogleConsent() {
  window.gtag?.('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });
}

/** Consent withdrawn after pixels loaded: signal both platforms. */
function revokeConsent() {
  window.fbq?.('consent', 'revoke');
  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
}

export function AdsPixels() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (mayTrack()) setConsented(true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { marketing?: boolean } | undefined;
      if (detail?.marketing) {
        setConsented(true);
      } else {
        revokeConsent();
      }
    };
    window.addEventListener('cookie-consent-changed', onChange);
    return () => window.removeEventListener('cookie-consent-changed', onChange);
  }, []);

  useEffect(() => {
    if (!consented) return;
    if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
    const googleIds = [GOOGLE_ADS_ID, GA_ID].filter(Boolean) as string[];
    if (googleIds.length) loadGoogleTag(googleIds);
  }, [consented]);

  return null;
}
