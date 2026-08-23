/* ==========================================================================
 * /api/gdpr/request — Handle Data Export / Deletion Requests
 * ==========================================================================
 *
 * PURPOSE:
 *   Receives a request from the /data-rights page to either export or
 *   delete a user's personal data. Sends a verification email with a
 *   time-limited token link (15 min). Does not reveal whether the email
 *   exists in the system (privacy protection).
 *
 * METHOD: POST
 * BODY:   { email: string, type: 'export' | 'delete' }
 *
 * ========================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { generateVerificationToken } from '@/lib/gdpr-tokens';
import { Resend } from 'resend';
import { pickLang } from '@/lib/pick-lang';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const limiter = rateLimit({ interval: 15 * 60 * 1000, maxRequests: 3 });


/**
 * Data-rights emails, in the language the request came from. Someone
 * exercising a GDPR right should not have to read English to understand what
 * they are confirming, and the confirmation is the step that actually erases
 * their data.
 */
const GDPR_COPY = {
  en: {
    subject: (exp: boolean) => (exp ? 'Your Data Export Request | Blok Blok Studio' : 'Your Data Deletion Request | Blok Blok Studio'),
    heading: (exp: boolean) => (exp ? 'Data Export Request' : 'Data Deletion Request'),
    intro: (exp: boolean) => `You requested to ${exp ? 'export' : 'permanently delete'} your personal data from Blok Blok Studio.`,
    expires: 'Click the button below to confirm. This link expires in <strong>15 minutes</strong>.',
    button: (exp: boolean) => (exp ? 'Confirm Export' : 'Confirm Deletion'),
    ignore: 'If you didn\u2019t make this request, you can safely ignore this email. No changes will be made.',
    footer: 'Blok Blok Studio \u00b7 Digital Agency for Ambitious Brands',
  },
  de: {
    subject: (exp: boolean) => (exp ? 'Ihre Anfrage zum Datenexport | Blok Blok Studio' : 'Ihre Anfrage zur Datenlöschung | Blok Blok Studio'),
    heading: (exp: boolean) => (exp ? 'Anfrage zum Datenexport' : 'Anfrage zur Datenlöschung'),
    intro: (exp: boolean) => `Sie haben angefragt, Ihre personenbezogenen Daten bei Blok Blok Studio ${exp ? 'zu exportieren' : 'dauerhaft löschen zu lassen'}.`,
    expires: 'Klicken Sie zur Bestätigung auf den Button. Dieser Link läuft in <strong>15 Minuten</strong> ab.',
    button: (exp: boolean) => (exp ? 'Export bestätigen' : 'Löschung bestätigen'),
    ignore: 'Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren. Es wird nichts geändert.',
    footer: 'Blok Blok Studio \u00b7 Digitalagentur für ambitionierte Marken',
  },
} as const;

export async function POST(req: NextRequest) {
  try {
    // Rate limit: public endpoint that triggers emails to arbitrary inboxes
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const { success: rateLimitOk } = limiter.check(ip);
    if (!rateLimitOk) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { email, type } = await req.json();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !type || !['export', 'delete'].includes(type)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Check if user exists (don't reveal this to the client)
    const lead = await prisma.lead.findUnique({ where: { email } });

    if (!lead) {
      // Return success anyway — don't reveal if email exists or not
      return NextResponse.json({
        success: true,
        message: 'If this email exists in our system, you will receive a verification link.',
      });
    }

    // Generate a time-limited verification token
    const token = generateVerificationToken(email);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.blokblokstudio.com';
    const verifyUrl = `${baseUrl}/api/gdpr/${type}?token=${token}`;

    // Send verification email
    const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const g = GDPR_COPY[pickLang(req)];
    const isExport = type === 'export';

    await getResend().emails.send({
      from: `Blok Blok Studio <${from}>`,
      to: email,
      subject: g.subject(isExport),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #f97316; margin-bottom: 24px;">${g.heading(isExport)}</h2>
          <p style="margin-bottom: 16px; color: #333;">${g.intro(isExport)}</p>
          <p style="margin-bottom: 24px; color: #333;">${g.expires}</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: #f97316; color: white; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 14px;">
            ${g.button(isExport)}
          </a>
          <p style="margin-top: 32px; color: #999; font-size: 13px;">${g.ignore}</p>
          <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999; margin-top: 16px;">${g.footer}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification email sent. Please check your inbox.',
    });
  } catch (err) {
    console.error('[API /gdpr/request] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
