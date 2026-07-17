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

function page(title: string, body: string) {
  return new NextResponse(
    `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Blok Blok Studio</title></head>
<body style="font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px">
<div style="text-align:center;max-width:420px">
<p style="color:#f97316;font-weight:700;letter-spacing:.1em;font-size:13px">BLOK BLOK STUDIO</p>
<h1 style="font-size:26px;margin:8px 0 12px">${title}</h1>
<p style="color:#9ca3af;line-height:1.6">${body}</p>
<a href="https://blokblokstudio.com" style="display:inline-block;margin-top:24px;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:10px 24px;text-decoration:none;font-size:14px">blokblokstudio.com</a>
</div></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return page('Invalid link', 'This confirmation link is not valid. Please use the link from your email.');
  }

  const lead = await prisma.lead.findUnique({ where: { marketingConfirmToken: token } });
  if (!lead) {
    return page('Invalid or expired link', 'This confirmation link is not valid anymore. If you still want to subscribe, sign up again on our website.');
  }

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

  return page(
    "You're subscribed!",
    'Your subscription is confirmed. You can unsubscribe anytime with one click in any email. / Ihre Anmeldung ist bestätigt. Sie können sich jederzeit mit einem Klick wieder abmelden.'
  );
}
