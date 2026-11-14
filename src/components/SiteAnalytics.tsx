'use client';

import { useEffect } from 'react';

/**
 * Blok Blok's own visit statistics (Command Center > Analytics).
 *
 * The tracker sets no cookies and stores nothing on the device, but it still
 * follows the cookie banner's Analytics choice:
 *  - EU / EEA / UK / CH: loads only after the visitor accepts Analytics in the
 *    banner that offers that option (consent version 2 or later)
 *  - elsewhere: loads unless the visitor switched Analytics off
 *
 * A heatmap link from the Command Center (#bb-heat=...) always loads the
 * script: in that mode it only draws the team's overlay and records nothing.
 *
 * Both values are public, not secrets, and can be overridden per environment.
 */

const API = process.env.NEXT_PUBLIC_BB_ANALYTICS_URL || 'https://app.blokblokstudio.com';
const SITE = process.env.NEXT_PUBLIC_BB_ANALYTICS_SITE || 'abddb090a1b5';

/** Consent saved before the banner offered an Analytics option has no version. */
export const CONSENT_VERSION = 2;

declare global {
  interface Window {
    __bbOff?: boolean;
  }
}

// Same list the ad pixels use: prior opt-in required (GDPR / UK GDPR / Swiss FADP).
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

function mayCount(): boolean {
  try {
    const country = getCountry();
    const optIn = country === '' || OPT_IN_COUNTRIES.has(country); // unknown country: treat as Europe
    const raw = localStorage.getItem('cookie-consent');
    if (raw) {
      const saved = JSON.parse(raw) as { analytics?: boolean; v?: number };
      if (saved.analytics !== true) return false;
      return optIn ? (saved.v ?? 1) >= CONSENT_VERSION : true;
    }
    return !optIn;
  } catch {
    return false;
  }
}

let loaded = false;
function load() {
  if (loaded) return;
  loaded = true;
  const s = document.createElement('script');
  s.defer = true;
  s.src = `${API}/bb.js`;
  s.setAttribute('data-site', SITE);
  document.body.appendChild(s);
}

export function SiteAnalytics() {
  useEffect(() => {
    if (/[#&]bb-heat=/.test(window.location.hash)) {
      load();
      return;
    }
    const apply = () => {
      const ok = mayCount();
      window.__bbOff = !ok; // stops a tracker that is already running
      if (ok) load();
    };
    apply();
    window.addEventListener('cookie-consent-changed', apply);
    return () => window.removeEventListener('cookie-consent-changed', apply);
  }, []);
  return null;
}
