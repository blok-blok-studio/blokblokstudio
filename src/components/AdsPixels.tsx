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
 */

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function hasMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie-consent');
    if (!raw) return false;
    return JSON.parse(raw).marketing === true;
  } catch {
    return false;
  }
}

function loadMetaPixel(id: string) {
  if (window.fbq) return;
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
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

function loadGoogleTag(id: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.gtag('js', new Date());
  window.gtag('config', id);
}

export function AdsPixels() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (hasMarketingConsent()) setConsented(true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { marketing?: boolean } | undefined;
      if (detail?.marketing) setConsented(true);
    };
    window.addEventListener('cookie-consent-changed', onChange);
    return () => window.removeEventListener('cookie-consent-changed', onChange);
  }, []);

  useEffect(() => {
    if (!consented) return;
    if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
    if (GOOGLE_ADS_ID) loadGoogleTag(GOOGLE_ADS_ID);
  }, [consented]);

  return null;
}
