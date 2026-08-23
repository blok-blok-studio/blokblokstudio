/* ==========================================================================
 * /api/unsubscribe — Email Unsubscribe (GDPR Token-Based + Legacy ID-Based)
 * ==========================================================================
 *
 * PURPOSE:
 *   Processes unsubscribe requests using either:
 *   - A unique per-lead token (GDPR compliant, preferred)
 *   - A lead ID (legacy fallback, also supports one-click List-Unsubscribe-Post)
 *
 * METHODS:
 *   POST { token: string }  — GDPR token-based unsubscribe
 *   POST ?id=xxx            — One-click unsubscribe via List-Unsubscribe-Post header
 *   GET  ?id=xxx            — Branded unsubscribe page with options
 *
 * ========================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { pushUnsubscribeToTracker } from '@/lib/tracker';
import { pickLang } from '@/lib/pick-lang';

/**
 * GET /api/unsubscribe?id=xxx — branded unsubscribe page with options.
 * Offers: reduce frequency, change preferences, or full unsubscribe.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const action = req.nextUrl.searchParams.get('action');

  if (!id) {
    return new NextResponse(htmlPage('invalid', null, pickLang(req)), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // State changes happen via POST only (the options page renders POST
  // forms). GET with an action param — e.g. an email scanner prefetching an
  // old-style link — just shows the options page and mutates nothing.

  // Default: show the unsubscribe options page
  try {
    const lead = await prisma.lead.findUnique({ where: { id }, select: { name: true, email: true } });
    return new NextResponse(htmlPage('options', lead ? { id, name: lead.name, email: lead.email } : { id, name: '', email: '' }, pickLang(req)), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new NextResponse(htmlPage('options', { id, name: '', email: '' }, pickLang(req)), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

/**
 * POST /api/unsubscribe — handles both:
 * 1. GDPR token-based unsubscribe (body: { token: string })
 * 2. One-click unsubscribe via List-Unsubscribe-Post header (?id=xxx)
 */
export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  // Browser form submissions from the branded page (state changes moved
  // from GET to POST so email link-scanners can't trigger them)
  const formAction = req.nextUrl.searchParams.get('action');
  if (id && formAction && req.nextUrl.searchParams.get('form') === '1') {
    if (formAction === 'unsubscribe' || formAction === 'feedback') {
      try {
        const unsubbed = await prisma.lead.update({
          where: { id },
          data: { unsubscribed: true, status: 'unsubscribed' },
        });
        await pushUnsubscribeToTracker(unsubbed.email);
        const reason = req.nextUrl.searchParams.get('reason');
        await prisma.emailEvent.create({
          data: { leadId: id, type: 'unsubscribed', details: reason ? `Reason: ${reason.slice(0, 200)}` : 'Manual unsubscribe via page' },
        }).catch(() => {});
      } catch { /* already unsubscribed or not found */ }
      return new NextResponse(htmlPage(formAction === 'feedback' ? 'feedback' : 'unsubscribed', null, pickLang(req)), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    if (formAction === 'reduce') {
      try {
        const lead = await prisma.lead.findUnique({ where: { id }, select: { tags: true } });
        const tags: string[] = lead?.tags ? (() => { try { return JSON.parse(lead.tags); } catch { return []; } })() : [];
        if (!tags.includes('reduced-frequency')) tags.push('reduced-frequency');
        await prisma.lead.update({ where: { id }, data: { tags: JSON.stringify(tags) } });
      } catch { /* ignore */ }
      return new NextResponse(htmlPage('reduced', null, pickLang(req)), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  }

  // Check for legacy id-based one-click unsubscribe (List-Unsubscribe-Post header)
  if (id) {
    try {
      const unsubbed = await prisma.lead.update({
        where: { id },
        data: { unsubscribed: true, status: 'unsubscribed' },
      });
      await pushUnsubscribeToTracker(unsubbed.email);
      await prisma.emailEvent.create({
        data: { leadId: id, type: 'unsubscribed', details: 'One-click unsubscribe header' },
      });
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ success: true }); // Don't leak info
    }
  }

  // GDPR token-based unsubscribe
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    // Find lead by their unique unsubscribe token
    const lead = await prisma.lead.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
    }

    // Already unsubscribed? Still return success (idempotent)
    if (lead.unsubscribed) {
      return NextResponse.json({
        success: true,
        email: lead.email,
        alreadyUnsubscribed: true,
      });
    }

    // Mark as unsubscribed
    await pushUnsubscribeToTracker(lead.email);
    await prisma.lead.update({
      where: { id: lead.id },
      data: { unsubscribed: true, status: 'unsubscribed' },
    });

    // Log event
    try {
      await prisma.emailEvent.create({
        data: { leadId: lead.id, type: 'unsubscribed', details: 'GDPR token-based unsubscribe' },
      });
    } catch { /* ignore */ }

    return NextResponse.json({
      success: true,
      email: lead.email,
    });
  } catch (err) {
    console.error('[API /unsubscribe] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


/**
 * One-click unsubscribe has to work for whoever opens it, and they opened it
 * from an email client with no page context. Language comes from the locale
 * cookie if they ever set one, otherwise their browser, which follows the OS.
 */
const UNSUB_COPY = {
  en: {
    invalid_title: 'Invalid Link',
    invalid_body: 'This unsubscribe link is not valid or has expired.',
    done_title: 'You\u2019ve Been Unsubscribed',
    done_body: 'You will no longer receive emails from us. We\u2019re sorry to see you go.',
    reduced_title: 'Email Frequency Reduced',
    reduced_body: 'We\u2019ve updated your preferences. You\u2019ll hear from us less often.',
    feedback_title: 'Thank You for Your Feedback',
    feedback_body: 'You\u2019ve been unsubscribed. Your feedback helps us improve.',
    options_title: 'Email Preferences',
    options_body: 'How would you like to manage your email preferences?',
    reduce_cta: 'Reduce Frequency',
    reduce_sub: 'Get fewer emails from us',
    unsub_cta: 'Unsubscribe Completely',
    unsub_sub: 'Stop all emails',
    feedback_prompt: '${c.feedback_prompt}',
    reasons: ['Too many emails', 'Not relevant to me', 'Never signed up', 'Content not useful', 'Other'],
  },
  de: {
    invalid_title: 'Ungültiger Link',
    invalid_body: 'Dieser Abmeldelink ist ungültig oder abgelaufen.',
    done_title: 'Sie wurden abgemeldet',
    done_body: 'Sie erhalten keine E-Mails mehr von uns. Schade, dass Sie gehen.',
    reduced_title: 'E-Mail-Häufigkeit reduziert',
    reduced_body: 'Wir haben Ihre Einstellungen aktualisiert. Sie hören seltener von uns.',
    feedback_title: 'Danke für Ihr Feedback',
    feedback_body: 'Sie wurden abgemeldet. Ihr Feedback hilft uns, besser zu werden.',
    options_title: 'E-Mail-Einstellungen',
    options_body: 'Wie möchten Sie Ihre E-Mail-Einstellungen verwalten?',
    reduce_cta: 'Seltener senden',
    reduce_sub: 'Weniger E-Mails von uns erhalten',
    unsub_cta: 'Vollständig abmelden',
    unsub_sub: 'Keine E-Mails mehr',
    feedback_prompt: 'Helfen Sie uns besser zu werden. Warum gehen Sie?',
    reasons: ['Zu viele E-Mails', 'Für mich nicht relevant', 'Nie angemeldet', 'Inhalte nicht nützlich', 'Sonstiges'],
  },
} as const;

function htmlPage(state: string, lead: { id: string; name: string; email: string } | null, lang: 'en' | 'de' = 'en'): string {
  const c = UNSUB_COPY[lang];
  const title = c[`${state === 'options' ? 'options' : state === 'reduced' ? 'reduced' : state === 'feedback' ? 'feedback' : state === 'unsubscribed' ? 'done' : 'invalid'}_title` as keyof typeof c] as string;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  let content = '';

  if (state === 'invalid') {
    content = `
      <div class="icon">&#10060;</div>
      <h1>Invalid Link</h1>
      <p>This unsubscribe link is not valid or has expired.</p>
    `;
  } else if (state === 'unsubscribed') {
    content = `
      <div class="icon">&#9989;</div>
      <h1>You&rsquo;ve Been Unsubscribed</h1>
      <p>You will no longer receive emails from us. We&rsquo;re sorry to see you go.</p>
      <p class="small">If this was a mistake, just reply to any of our previous emails and we&rsquo;ll re-subscribe you.</p>
    `;
  } else if (state === 'reduced') {
    content = `
      <div class="icon">&#128230;</div>
      <h1>Email Frequency Reduced</h1>
      <p>We&rsquo;ve updated your preferences. You&rsquo;ll hear from us less often.</p>
    `;
  } else if (state === 'feedback') {
    content = `
      <div class="icon">&#128591;</div>
      <h1>Thank You for Your Feedback</h1>
      <p>You&rsquo;ve been unsubscribed. Your feedback helps us improve.</p>
    `;
  } else if (state === 'options' && lead) {
    content = `
      <h1>Email Preferences</h1>
      ${lead.email ? `<p class="email-badge">${lead.email}</p>` : ''}
      <p>How would you like to manage your email preferences?</p>

      <div class="options">
        <form method="POST" action="${baseUrl}/api/unsubscribe?id=${lead.id}&action=reduce&form=1" style="margin:0"><button type="submit" class="option option-reduce" style="width:100%;border:0;cursor:pointer;font:inherit;text-align:inherit">
          <div class="option-icon">&#128229;</div>
          <div>
            <strong>Reduce Frequency</strong>
            <span>Get fewer emails from us</span>
          </div>
        </button></form>

        <form method="POST" action="${baseUrl}/api/unsubscribe?id=${lead.id}&action=unsubscribe&form=1" style="margin:0"><button type="submit" class="option option-unsub" style="width:100%;border:0;cursor:pointer;font:inherit;text-align:inherit">
          <div class="option-icon">&#128683;</div>
          <div>
            <strong>Unsubscribe Completely</strong>
            <span>Stop all emails</span>
          </div>
        </button></form>
      </div>

      <div class="feedback-section">
        <p class="small">${c.feedback_prompt}</p>
        <div class="reasons">
          ${c.reasons.map(reason =>
            `<form method="POST" action="${baseUrl}/api/unsubscribe?id=${lead.id}&action=feedback&reason=${encodeURIComponent(reason)}&form=1" style="display:inline;margin:0"><button type="submit" class="reason-btn" style="border:0;cursor:pointer;font:inherit">${reason}</button></form>`
          ).join('\n          ')}
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} | Blok Blok Studio</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { max-width: 520px; width: 100%; text-align: center; }
    .logo { font-size: 14px; font-weight: 900; color: #f97316; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 32px; }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { font-size: 24px; margin-bottom: 12px; }
    p { color: #999; line-height: 1.6; font-size: 15px; margin-bottom: 12px; }
    .small { font-size: 13px; color: #666; }
    .email-badge { display: inline-block; background: rgba(249,115,22,0.1); color: #f97316; padding: 4px 16px; border-radius: 20px; font-size: 13px; margin-bottom: 20px; }
    .options { display: flex; flex-direction: column; gap: 12px; margin: 24px 0; }
    .option { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); text-decoration: none; color: #fff; transition: all 0.2s; text-align: left; }
    .option:hover { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.02); }
    .option-icon { font-size: 28px; flex-shrink: 0; }
    .option strong { display: block; font-size: 15px; margin-bottom: 2px; }
    .option span { font-size: 13px; color: #888; }
    .option-unsub:hover { border-color: rgba(239,68,68,0.3); }
    .feedback-section { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); }
    .reasons { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 12px; }
    .reason-btn { padding: 6px 14px; border-radius: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); color: #999; font-size: 12px; text-decoration: none; transition: all 0.2s; }
    .reason-btn:hover { color: #fff; border-color: rgba(249,115,22,0.3); background: rgba(249,115,22,0.05); }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Blok Blok Studio</div>
    ${content}
  </div>
</body>
</html>`;
}
