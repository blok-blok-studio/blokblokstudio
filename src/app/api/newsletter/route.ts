import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { runSpamChecks } from '@/lib/spam-guard';
import { verifyTurnstile } from '@/lib/turnstile';
import { assignToList, NEWSLETTER_LIST } from '@/lib/auto-list';
import { sendMarketingConfirmEmail } from '@/lib/email';
import { randomUUID } from 'crypto';

// SOC 2 compliant rate limiting: 3 signups per IP per 15 minutes
const limiter = rateLimit({ interval: 15 * 60 * 1000, maxRequests: 3 });

/**
 * POST /api/newsletter — Handle newsletter signup.
 * Creates a lead with source "newsletter" for email collection.
 * Rate limited to prevent spam and abuse (SOC 2 requirement).
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP address
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const { success } = limiter.check(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email, _hp, _t, _cf } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Spam detection
    const spam = runSpamChecks({ honeypot: _hp, timingToken: _t, email });
    if (spam.isSpam) {
      return NextResponse.json({ success: true });
    }

    // Cloudflare Turnstile verification
    const turnstileOk = await verifyTurnstile(_cf, ip);
    if (!turnstileOk) {
      return NextResponse.json({ success: true }); // Silent reject
    }

    // Check if already subscribed
    const existing = await prisma.lead.findUnique({ where: { email } });

    if (existing) {
      // Check if they're already in the newsletter list
      const list = await prisma.leadList.findFirst({ where: { name: NEWSLETTER_LIST.name } });
      if (list) {
        const alreadyMember = await prisma.leadListMember.findUnique({
          where: { listId_leadId: { listId: list.id, leadId: existing.id } },
        });
        if (alreadyMember) {
          return NextResponse.json({ error: 'You are already subscribed' }, { status: 409 });
        }
      }

      // Existing lead subscribing for the first time: double opt-in.
      // Enrollment happens in /api/newsletter/confirm once they click.
      const confirmToken = existing.marketingConfirmToken || randomUUID();
      if (!existing.marketingConfirmToken) {
        await prisma.lead.update({ where: { id: existing.id }, data: { marketingConfirmToken: confirmToken, marketingConsent: true } });
      }
      await sendMarketingConfirmEmail(email, existing.name, confirmToken);

      return NextResponse.json({ success: true, confirm: true });
    }

    const lead = await prisma.lead.create({
      data: {
        name: email.split('@')[0], // Use email prefix as name
        email,
        field: 'Newsletter',
        problem: 'Newsletter signup',
        source: 'newsletter',
        consentGiven: true,
        consentTimestamp: new Date(),
        marketingConsent: true,
        marketingConfirmToken: randomUUID(),
      },
    });

    // Double opt-in: list + tracker enrollment happen only after the
    // confirmation link is clicked (/api/newsletter/confirm)
    await sendMarketingConfirmEmail(email, lead.name, lead.marketingConfirmToken!);

    return NextResponse.json({ success: true, confirm: true });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Signup failed: ${errMsg.slice(0, 200)}` }, { status: 500 });
  }
}
