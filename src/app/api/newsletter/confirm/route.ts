/**
 * GET /api/newsletter/confirm?token=... — double opt-in confirmation.
 * Only here does a marketing opt-in become actionable: the lead joins the
 * newsletter list and the tracker's subscriber list, with a confirmation
 * timestamp as UWG §7 / GDPR Art. 7 proof of consent.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assignToList, NEWSLETTER_LIST } from '@/lib/auto-list';
import { pushNewsletterToTracker } from '@/lib/tracker';

/**
 * Which language to answer in.
 *
 * This link is opened from an email client, so there is no page context to
 * inherit: read the locale cookie the language switcher sets, and fall back
 * to what the browser asks for. Only English and German are offered, matching
 * the languages the legal copy actually exists in.
 */
function pickLang(req: NextRequest): 'en' | 'de' {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value?.toLowerCase();
  if (cookie?.startsWith('de')) return 'de';
  if (cookie) return 'en';
  const header = req.headers.get('accept-language')?.toLowerCase() ?? '';
  return header.startsWith('de') || header.includes(',de') ? 'de' : 'en';
}

function page(title: string, body: string, lang: 'en' | 'de' = 'en') {
  return new NextResponse(
    `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Blok Blok Studio</title></head>
<body style="font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px">
<div style="text-align:center;max-width:420px">
<p style="color:#f97316;font-weight:700;letter-spacing:.1em;font-size:13px">BLOK BLOK STUDIO</p>
<h1 style="font-size:26px;margin:8px 0 12px">${title}</h1>
<p style="color:#9ca3af;line-height:1.6">${body}</p>
<a href="https://www.blokblokstudio.com" style="display:inline-block;margin-top:24px;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:10px 24px;text-decoration:none;font-size:14px">blokblokstudio.com</a>
</div></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

const COPY = {
  en: {
    invalid: ['Invalid link', 'This confirmation link is not valid. Please use the link from your email.'],
    expired: ['Invalid or expired link', 'This confirmation link is not valid anymore. If you still want to subscribe, sign up again on our website.'],
    done: ["You're subscribed!", 'Your subscription is confirmed. You can unsubscribe anytime with one click in any email.'],
    error: ['Something went wrong', 'We could not confirm your subscription just now. Please try the link again in a few minutes.'],
  },
  de: {
    invalid: ['Ungültiger Link', 'Dieser Bestätigungslink ist nicht gültig. Bitte verwenden Sie den Link aus Ihrer E-Mail.'],
    expired: ['Link ungültig oder abgelaufen', 'Dieser Bestätigungslink ist nicht mehr gültig. Wenn Sie sich weiterhin anmelden möchten, melden Sie sich bitte erneut auf unserer Website an.'],
    done: ['Anmeldung bestätigt', 'Ihre Anmeldung ist bestätigt. Sie können sich jederzeit mit einem Klick in jeder E-Mail wieder abmelden.'],
    error: ['Da ist etwas schiefgelaufen', 'Wir konnten Ihre Anmeldung gerade nicht bestätigen. Bitte versuchen Sie den Link in ein paar Minuten erneut.'],
  },
} as const;

export async function GET(req: NextRequest) {
  const lang = pickLang(req);
  const t = COPY[lang];

  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return page(t.invalid[0], t.invalid[1], lang);
  }

  // This link is clicked from an email, so a thrown error surfaces as a bare
  // 500 to someone who did nothing wrong and has no way to tell whether they
  // are subscribed. Tell them to try again instead, and leave the token
  // valid so that retry actually works.
  let lead;
  try {
    lead = await prisma.lead.findUnique({ where: { marketingConfirmToken: token } });
  } catch (err) {
    console.error('[Confirm] Lookup failed:', err);
    return page(t.error[0], t.error[1], lang);
  }

  if (!lead) {
    return page(t.expired[0], t.expired[1], lang);
  }

  try {
  if (!lead.marketingConsentConfirmed) {
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        marketingConsent: true,
        marketingConsentConfirmed: true,
        marketingConsentConfirmedAt: new Date(),
      },
    });
    try {
      await assignToList(lead.id, NEWSLETTER_LIST.name, NEWSLETTER_LIST.color);
    } catch (err) {
      console.error('[Confirm] List assign failed:', err);
    }
    await pushNewsletterToTracker(lead.email);
  }
  } catch (err) {
    console.error('[Confirm] Confirmation failed:', err);
    return page(t.error[0], t.error[1], lang);
  }

  return page(t.done[0], t.done[1], lang);
}
