/**
 * Locale registry shared between the server-only i18n config (which reads
 * cookies / Accept-Language) and client components like LanguageSwitcher.
 * This file MUST stay client-safe — no `next/headers`, no `cookies()`.
 *
 * `nativeName` is what gets shown inside the dropdown so a Vietnamese visitor
 * sees "Tiếng Việt" rather than "Vietnamese" — easier to recognize at a glance.
 */

/* ── SUPPORTED LANGUAGES ──
   Order here is the order shown in the LanguageSwitcher dropdown. Note:
   zh = Simplified Mandarin (mainland China), zh-TW = Traditional (Taiwan). */
export const supportedLocales = [
  'en', 'de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'pl', 'tr', 'ru',
  'ar', 'hi', 'zh', 'zh-TW', 'ja', 'ko', 'vi', 'th', 'id',
] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export type LocaleLabel = {
  code: SupportedLocale;
  nativeName: string;
  englishName: string;
};

export const localeLabels: Record<SupportedLocale, LocaleLabel> = {
  en:      { code: 'en',      nativeName: 'English',     englishName: 'English' },
  de:      { code: 'de',      nativeName: 'Deutsch',     englishName: 'German' },
  es:      { code: 'es',      nativeName: 'Español',     englishName: 'Spanish' },
  fr:      { code: 'fr',      nativeName: 'Français',    englishName: 'French' },
  pt:      { code: 'pt',      nativeName: 'Português',   englishName: 'Portuguese' },
  it:      { code: 'it',      nativeName: 'Italiano',    englishName: 'Italian' },
  nl:      { code: 'nl',      nativeName: 'Nederlands',  englishName: 'Dutch' },
  sv:      { code: 'sv',      nativeName: 'Svenska',     englishName: 'Swedish' },
  pl:      { code: 'pl',      nativeName: 'Polski',      englishName: 'Polish' },
  tr:      { code: 'tr',      nativeName: 'Türkçe',      englishName: 'Turkish' },
  ru:      { code: 'ru',      nativeName: 'Русский',     englishName: 'Russian' },
  ar:      { code: 'ar',      nativeName: 'العربية',     englishName: 'Arabic' },
  hi:      { code: 'hi',      nativeName: 'हिन्दी',        englishName: 'Hindi' },
  zh:      { code: 'zh',      nativeName: '简体中文',     englishName: 'Chinese (Simplified)' },
  'zh-TW': { code: 'zh-TW',   nativeName: '繁體中文',     englishName: 'Chinese (Traditional)' },
  ja:      { code: 'ja',      nativeName: '日本語',       englishName: 'Japanese' },
  ko:      { code: 'ko',      nativeName: '한국어',        englishName: 'Korean' },
  vi:      { code: 'vi',      nativeName: 'Tiếng Việt',  englishName: 'Vietnamese' },
  th:      { code: 'th',      nativeName: 'ไทย',          englishName: 'Thai' },
  id:      { code: 'id',      nativeName: 'Bahasa Indonesia', englishName: 'Indonesian' },
};
