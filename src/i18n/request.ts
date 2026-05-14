/**
 * ============================================================
 * INTERNATIONALIZATION (i18n) CONFIG — /src/i18n/request.ts
 * ============================================================
 * This file handles automatic language detection and translation loading.
 * It reads the user's browser language from the Accept-Language header
 * and loads the matching JSON translation file.
 *
 * HOW IT WORKS:
 * 1. User visits the site
 * 2. Browser sends "Accept-Language: de,en;q=0.9" (example: German user)
 * 3. This file parses that header and picks the best matching language
 * 4. Loads /src/messages/de.json and provides it to all components
 * 5. Components use useTranslations('namespace') to access translated text
 *
 * SUPPORTED LANGUAGES (15 total):
 * en (English), es (Spanish), fr (French), de (German),
 * pt (Portuguese), ja (Japanese), ko (Korean), zh (Chinese),
 * ar (Arabic), it (Italian), nl (Dutch), ru (Russian),
 * pl (Polish), sv (Swedish), tr (Turkish)
 *
 * TO ADD A NEW LANGUAGE:
 * 1. Add the locale code to the supportedLocales array below
 * 2. Create /src/messages/{code}.json with all the same keys as en.json
 *
 * TO SET A DEFAULT LANGUAGE:
 * Change 'en' at the bottom of parseAcceptLanguage() to your preferred default
 *
 * KEY FILES:
 * - Translation files: /src/messages/*.json
 * - Next.js config: /next.config.ts (loads this file via next-intl plugin)
 * ============================================================
 */

import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

/* ── SUPPORTED LANGUAGES ──
   Add new language codes here (must match a file in /src/messages/).
   Note: zh = Simplified Mandarin (mainland China), zh-TW = Traditional (Taiwan).
   The parser checks the full Accept-Language tag first (so zh-TW wins), then
   falls back to the base language code. */
const supportedLocales = ['en', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'zh', 'zh-TW', 'ar', 'it', 'nl', 'ru', 'pl', 'sv', 'tr'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

const supportedLowercase = supportedLocales.map((l) => l.toLowerCase());

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
    const candidates = [tag, tag.split('-')[0]];
    for (const candidate of candidates) {
      const idx = supportedLowercase.indexOf(candidate);
      if (idx !== -1) return supportedLocales[idx];
    }
  }

  // Default fallback language (change this to set a different default)
  return 'en';
}

/* ── MAIN CONFIG ──
   This runs on every request. It detects the language and loads translations. */
export default getRequestConfig(async () => {
  // Read the Accept-Language header from the incoming request
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const locale = parseAcceptLanguage(acceptLanguage);

  return {
    locale,
    // Dynamically imports the matching translation file (e.g., /src/messages/de.json)
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
