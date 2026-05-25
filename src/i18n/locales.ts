/**
 * Human-readable labels for the locales declared in /src/i18n/request.ts.
 * `nativeName` is what gets shown inside the dropdown so a Vietnamese visitor
 * sees "Tiếng Việt" rather than "Vietnamese" — easier to recognize at a glance.
 */
import type { SupportedLocale } from './request';

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
