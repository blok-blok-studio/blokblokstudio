import type { NextRequest } from 'next/server';

/**
 * Which language to answer someone in.
 *
 * There is no way to read a visitor's operating system directly, and nothing
 * that claims to is reliable. What the OS actually produces is the browser's
 * language preference, sent on every request as Accept-Language — someone on
 * a German macOS or Windows install sends de-DE unless they have changed it.
 * That is the signal, and it is the honest version of "based on their OS".
 *
 * The cookie wins when present, because it is an explicit choice the person
 * made with the language switcher, and an explicit choice always beats an
 * inferred one. Falls back to English.
 *
 * English and German only, matching the languages the legal and email copy
 * actually exists in. Adding a language means adding the copy first.
 */
export type SupportedLang = 'en' | 'de';

export function pickLang(req: NextRequest): SupportedLang {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value?.toLowerCase();
  if (cookie?.startsWith('de')) return 'de';
  if (cookie) return 'en';

  return parseAcceptLanguage(req.headers.get('accept-language'));
}

/**
 * Reads the quality-weighted list properly rather than testing whether the
 * string starts with "de". A German speaker whose browser sends
 * "en-GB;q=0.4,de-DE;q=0.9" prefers German, and a naive prefix check reads
 * that backwards.
 */
export function parseAcceptLanguage(header: string | null): SupportedLang {
  if (!header) return 'en';

  const best = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      const quality = q ? Number.parseFloat(q.split('=')[1]) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(quality) ? quality : 0 };
    })
    .filter((l) => l.tag && l.q > 0)
    .sort((a, b) => b.q - a.q)
    .find((l) => l.tag.startsWith('de') || l.tag.startsWith('en'));

  return best?.tag.startsWith('de') ? 'de' : 'en';
}
