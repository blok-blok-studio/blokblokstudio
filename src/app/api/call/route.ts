import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { runSpamChecks } from '@/lib/spam-guard';
import { verifyTurnstile } from '@/lib/turnstile';
import { assignToList, AUDIT_LIST } from '@/lib/auto-list';
import { pushLeadToTracker } from '@/lib/tracker';
import { sendMetaLeadEvent } from '@/lib/meta-capi';
import { sendMarketingConfirmEmail, sendLeadAckEmail, notifyNewLead } from '@/lib/email';
import { randomUUID } from 'crypto';

// Rate limiting: 5 submissions per IP per 15 minutes
const limiter = rateLimit({ interval: 15 * 60 * 1000, maxRequests: 5 });

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP address
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const { success: rateLimitOk } = limiter.check(ip);

    if (!rateLimitOk) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, field, website, noWebsite, problem, consent, _hp, _t, _cf, business, phone, source, emailOptIn, _eid, _fbclid, _fbp, adsConsent } = body;
    const leadSource: 'funnel' | 'ads' = source === 'ads' ? 'ads' : 'funnel';
    const marketingOptIn = emailOptIn === true;

    // Basic validation
    if (!name || !email || !field || !problem) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // GDPR: Consent is required
    if (!consent) {
      return NextResponse.json(
        { error: 'Consent is required' },
        { status: 400 }
      );
    }

    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Spam detection
    const spam = runSpamChecks({ honeypot: _hp, timingToken: _t, name, email });
    if (spam.isSpam) {
      return NextResponse.json({ success: true, id: 'ok' });
    }

    // Cloudflare Turnstile verification
    const turnstileOk = await verifyTurnstile(_cf, ip);
    if (!turnstileOk) {
      return NextResponse.json({ success: true, id: 'ok' }); // Silent reject
    }

    // Get IP address for GDPR consent tracking
    const consentIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    // Repeat submissions keep their history: the new summary goes on top,
    // earlier ones stay below it with the date they came in, so service
    // picks and attribution from a lead's first visit are never lost.
    const existing = await prisma.lead.findUnique({ where: { email }, select: { problem: true, consentTimestamp: true } });
    let mergedProblem = problem;
    if (existing?.problem && existing.problem !== problem) {
      const when = existing.consentTimestamp
        ? existing.consentTimestamp.toISOString().slice(0, 10)
        : 'earlier';
      mergedProblem = `${problem}\n\n--- Previous submission (${when}) ---\n${existing.problem}`;
    }

    // Upsert — if same email submits again, update their info
    const lead = await prisma.lead.upsert({
      where: { email },
      update: {
        name,
        field,
        website: noWebsite ? null : (website || null),
        noWebsite: !!noWebsite,
        problem: mergedProblem,
        ...(phone ? { phone } : {}),
        ...(business ? { business } : {}),
        consentGiven: true,
        consentTimestamp: new Date(),
        consentIp,
        // Only ever grant marketing consent here, never silently revoke —
        // withdrawal goes through the unsubscribe flow
        ...(marketingOptIn ? { marketingConsent: true } : {}),
      },
      create: {
        name,
        email,
        field,
        website: noWebsite ? null : (website || null),
        noWebsite: !!noWebsite,
        problem,
        phone: phone || null,
        business: business || null,
        source: leadSource,
        consentGiven: true,
        consentTimestamp: new Date(),
        consentIp,
        marketingConsent: marketingOptIn,
      },
    });

    // Auto-assign to Audit Leads list
    await assignToList(lead.id, AUDIT_LIST.name, AUDIT_LIST.color);

    // Speed to lead: instant acknowledgment with the booking link so hot
    // leads can self-schedule while we're being notified (non-blocking)
    sendLeadAckEmail(email, name).catch(() => {});

    // Instant alert to NOTIFICATION_EMAIL with everything the lead
    // submitted: services, phone, attribution (in problem) plus business
    notifyNewLead({
      name,
      email,
      field,
      website: noWebsite ? null : (website || null),
      problem: business ? `Business: ${business}\n${problem}` : problem,
    }).catch(() => {});

    // Explicit marketing opt-in: double opt-in (UWG §7). The subscription
    // only activates when the confirmation link is clicked — see
    // /api/newsletter/confirm, which does the list + tracker enrollment.
    if (marketingOptIn && !lead.marketingConsentConfirmed) {
      const confirmToken = lead.marketingConfirmToken || randomUUID();
      if (!lead.marketingConfirmToken) {
        await prisma.lead.update({ where: { id: lead.id }, data: { marketingConfirmToken: confirmToken } });
      }
      await sendMarketingConfirmEmail(email, name, confirmToken);
    }

    // Auto-enroll in designated sequence (if any)
    try {
      const autoSeq = await prisma.sequence.findFirst({
        where: { autoEnroll: true, active: true },
        include: { steps: { orderBy: { order: 'asc' }, take: 1 } },
      });

      if (autoSeq && autoSeq.steps.length > 0) {
        const firstStep = autoSeq.steps[0];
        const nextSend = new Date(Date.now() + (firstStep.delayDays || 0) * 24 * 60 * 60 * 1000);

        await prisma.sequenceEnrollment.upsert({
          where: { sequenceId_leadId: { sequenceId: autoSeq.id, leadId: lead.id } },
          update: {}, // Don't re-enroll if already enrolled
          create: {
            sequenceId: autoSeq.id,
            leadId: lead.id,
            currentStep: 0,
            nextSendAt: nextSend,
            status: 'active',
          },
        });
      }
    } catch (err) {
      console.error('[Audit] Auto-enroll failed:', err);
    }

    // Push to the client job tracker as a PROSPECT (non-blocking)
    await pushLeadToTracker({
      source: leadSource,
      name,
      email,
      phone: phone || undefined,
      business: business || undefined,
      website: noWebsite ? null : (website || null),
      summary: marketingOptIn ? `${problem}\nEmail marketing opt-in: yes` : problem,
    });

    // Server-side Meta Lead event (Conversions API) — only with the
    // visitor's marketing consent, deduped against the browser pixel via
    // the shared event id. No-op unless the CAPI env vars are set.
    if (adsConsent === true && typeof _eid === 'string' && _eid) {
      await sendMetaLeadEvent({
        eventId: _eid,
        email,
        phone: typeof phone === 'string' ? phone : undefined,
        sourceUrl: 'https://www.blokblokstudio.com/vsl',
        clientIp: consentIp !== 'unknown' ? consentIp : undefined,
        userAgent: req.headers.get('user-agent') || undefined,
        fbclid: typeof _fbclid === 'string' ? _fbclid : undefined,
        fbp: typeof _fbp === 'string' ? _fbp : undefined,
      });
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err) {
    console.error('[API /audit] Error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
