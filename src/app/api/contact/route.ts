import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { runSpamChecks } from '@/lib/spam-guard';
import { verifyTurnstile } from '@/lib/turnstile';
import { assignToList, CONTACT_LIST } from '@/lib/auto-list';
import { pushLeadToTracker } from '@/lib/tracker';
import { sendLeadAckEmail } from '@/lib/email';

// SOC 2 compliant rate limiting: 5 submissions per IP per 15 minutes
const limiter = rateLimit({ interval: 15 * 60 * 1000, maxRequests: 5 });

/**
 * POST /api/contact — Handle contact form submissions.
 * Creates a new lead from the contact form and pushes it to the client job tracker.
 * Rate limited to prevent spam and abuse (SOC 2 requirement).
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP address
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const { success, remaining, resetAt } = limiter.check(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const { name, email, company, phone, message, consent, _hp, _t, _cf } = await req.json();
    const consentIp = ip;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // GDPR: consent must actually be given, never assumed
    if (consent !== true) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
    }

    // Spam detection
    const spam = runSpamChecks({ honeypot: _hp, timingToken: _t, name, email, message });
    if (spam.isSpam) {
      return NextResponse.json({ success: true });
    }

    // Cloudflare Turnstile verification
    const turnstileOk = await verifyTurnstile(_cf, ip);
    if (!turnstileOk) {
      return NextResponse.json({ success: true }); // Silent reject
    }

    // Create or update the lead
    const existingLead = await prisma.lead.findUnique({ where: { email } });

    let leadId: string;

    if (existingLead) {
      // Update existing lead with latest contact info
      await prisma.lead.update({
        where: { email },
        data: {
          name,
          problem: message,
          website: company || existingLead.website,
          source: 'contact',
          consentGiven: consent === true,
          consentTimestamp: new Date(),
          consentIp,
        },
      });
      leadId = existingLead.id;
    } else {
      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          field: company || 'Unknown',
          website: company || null,
          problem: message,
          source: 'contact',
          consentGiven: consent === true,
          consentTimestamp: new Date(),
          consentIp,
        },
      });
      leadId = lead.id;
    }

    // Auto-assign to Contact Inquiries list
    await assignToList(leadId, CONTACT_LIST.name, CONTACT_LIST.color);

    // Speed to lead: instant acknowledgment with the booking link (non-blocking)
    sendLeadAckEmail(email, name).catch(() => {});

    // Push to the client job tracker as a PROSPECT (fire-and-forget)
    await pushLeadToTracker({
      source: 'contact',
      name,
      email,
      business: company || undefined,
      phone: typeof phone === 'string' && phone.trim() ? phone.trim() : undefined,
      summary: message,
    });
    return NextResponse.json(
      { success: true },
      {
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  } catch (err) {
    console.error('[Contact] Submission failed:', err);
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
