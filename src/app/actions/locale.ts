'use server';

/**
 * Server action used by /src/components/LanguageSwitcher.tsx.
 *
 * Sets the NEXT_LOCALE cookie so the user's choice survives across pages
 * and visits, then revalidates the layout so every page re-renders with
 * the new translations on the next navigation.
 */

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { supportedLocales, LOCALE_COOKIE, type SupportedLocale } from '@/i18n/request';

export async function setLocale(locale: string) {
  // Reject anything we don't actually ship translations for.
  if (!supportedLocales.includes(locale as SupportedLocale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    httpOnly: false, // readable so any client-side analytics/scripts can see it
  });

  // Invalidate every cached page so the next render picks up the new locale.
  revalidatePath('/', 'layout');
}
