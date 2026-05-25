/**
 * ============================================================
 * INTERNATIONALIZATION (i18n) CONFIG — /src/i18n/request.ts
 * ============================================================
 * This file handles automatic language detection and translation loading.
 *
 * SELECTION ORDER (first match wins):
 *   1. NEXT_LOCALE cookie  — set by the language dropdown when the user
 *      picks a language manually. Persists their choice across visits.
 *   2. Accept-Language header — the user's OS / browser language(s).
 *   3. 'en' as ultimate fallback.
 *
 * SUPPORTED LANGUAGES (20 total):
 *   en (English), es (Spanish), fr (French), de (German), pt (Portuguese),
 *   ja (Japanese), ko (Korean), zh (Simplified Chinese), zh-TW (Traditional),
 *   vi (Vietnamese), hi (Hindi), id (Indonesian), th (Thai), ar (Arabic),
 *   it (Italian), nl (Dutch), ru (Russian), pl (Polish), sv (Swedish),
 *   tr (Turkish).
 *
 * TO ADD A NEW LANGUAGE:
 *   1. Add the locale code to the `supportedLocales` array below.
 *   2. Add a label for it in /src/i18n/locales.ts.
 *   3. Create /src/messages/{code}.json with the same keys as en.json.
 *
 * KEY FILES:
 *   - Translation files: /src/messages/*.json
 *   - Locale labels:     /src/i18n/locales.ts
 *   - Dropdown:          /src/components/LanguageSwitcher.tsx
 *   - Set-locale action: /src/app/actions/locale.ts
 *   - Next.js plugin:    /next.config.ts (loads this file via next-intl)
 * ============================================================
 */

import { getRequestConfig } from 'next-intl/server';
import { headers, cookies } from 'next/headers';

/* ── SUPPORTED LANGUAGES ──
   Order here is the order shown in the dropdown. Note: zh = Simplified
   Mandarin (mainland China), zh-TW = Traditional (Taiwan). The parser
   checks the full Accept-Language tag first (so zh-TW wins), then falls
   back to the base language code. */
export const supportedLocales = [
  'en', 'de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'pl', 'tr', 'ru',
  'ar', 'hi', 'zh', 'zh-TW', 'ja', 'ko', 'vi', 'th', 'id',
] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

/* Cookie name used to persist a manual language selection. When this cookie
   is set (by the LanguageSwitcher), it overrides Accept-Language. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

const supportedLowercase = supportedLocales.map((l) => l.toLowerCase());

function isSupported(tag: string): SupportedLocale | null {
  const idx = supportedLowercase.indexOf(tag.toLowerCase());
  return idx === -1 ? null : supportedLocales[idx];
}

/**
 * Parses the browser's Accept-Language header to find the best match.
 * Example input: "zh-TW,zh;q=0.9,en;q=0.7" → 'zh-TW'.
 * Example input: "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7" → 'de'.
 * Returns: a supported locale, or 'en' as default fallback.
 */
function parseAcceptLanguage(acceptLanguage: string): SupportedLocale {
  // Split header into individual language preferences with quality scores
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [tag, q] = lang.trim().split(';q=');
      return { tag: tag.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q); // Sort by preference (highest first)

  // For each preference, try the full tag (zh-tw) before the base (zh)
  for (const { tag } of languages) {
    const matched = isSupported(tag) ?? isSupported(tag.split('-')[0]);
    if (matched) return matched;
  }

  // Default fallback language
  return 'en';
}

/* ── MAIN CONFIG ──
   This runs on every request. Resolves the active locale and loads translations. */
export default getRequestConfig(async () => {
  // 1. Manual override via cookie (set by the language dropdown).
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const fromCookie = cookieLocale ? isSupported(cookieLocale) : null;

  // 2. Browser/OS language from Accept-Language header.
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';

  const locale: SupportedLocale = fromCookie ?? parseAcceptLanguage(acceptLanguage);

  return {
    locale,
    // Dynamically imports the matching translation file (e.g., /src/messages/de.json)
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
