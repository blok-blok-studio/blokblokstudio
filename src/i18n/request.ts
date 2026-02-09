import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

const supportedLocales = ['en', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'zh', 'ar', 'it', 'nl', 'ru'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

function parseAcceptLanguage(acceptLanguage: string): SupportedLocale {
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, q] = lang.trim().split(';q=');
      return { locale: locale.trim().split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { locale } of languages) {
    if (supportedLocales.includes(locale as SupportedLocale)) {
      return locale as SupportedLocale;
    }
  }
  return 'en';
}

export default getRequestConfig(async () => {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const locale = parseAcceptLanguage(acceptLanguage);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
