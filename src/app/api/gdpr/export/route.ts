/* ==========================================================================
 * /api/gdpr/export — GDPR Data Export (Right to Access)
 * ==========================================================================
 *
 * PURPOSE:
 *   After a user verifies their identity via the email link, this endpoint
 *   returns all personal data associated with their email as a downloadable
 *   JSON file. Token is time-limited (15 minutes).
 *
 * METHOD: GET
 * QUERY:  ?token=<verification_token>
 *
 * ========================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/gdpr-tokens';
import { pickLang } from '@/lib/pick-lang';

const EXPIRED_COPY = {
  en: { title: 'Link Expired', body: 'This verification link has expired. Please submit a new request from the Data Rights page.' },
  de: { title: 'Link abgelaufen', body: 'Dieser Bestätigungslink ist abgelaufen. Bitte stellen Sie über die Seite "Ihre Datenrechte" eine neue Anfrage.' },
} as const;

export async function GET(req: NextRequest) {
  const lang = pickLang(req);
  const expired = EXPIRED_COPY[lang];
  try {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return new NextResponse('Token required', { status: 400 });
    }

    // Verify the time-limited token
    const { valid, email } = verifyToken(token);

    if (!valid || !email) {
      return new NextResponse(
        `<html lang="${lang}"><head><meta charset="utf-8"></head><body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff;"><div style="text-align: center;"><h1>${expired.title}</h1><p style="color: #999;">${expired.body}</p></div></body></html>`,
        { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    // Get user data
    const lead = await prisma.lead.findUnique({ where: { email } });

    if (!lead) {
      return new NextResponse('No data found for this email', { status: 404 });
    }

    // Build the export payload — include everything we have
    const exportData = {
      personalData: {
        name: lead.name,
        email: lead.email,
        field: lead.field,
        website: lead.website,
        noWebsite: lead.noWebsite,
        problem: lead.problem,
      },
      emailPreferences: {
        unsubscribed: lead.unsubscribed,
        emailsSent: lead.emailsSent,
        lastEmailAt: lead.lastEmailAt,
      },
      consent: {
        consentGiven: lead.consentGiven,
        consentTimestamp: lead.consentTimestamp,
        consentIp: lead.consentIp,
      },
      metadata: {
        source: lead.source,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
      },
      exportInfo: {
        exportedAt: new Date().toISOString(),
        exportedBy: 'Blok Blok Studio — GDPR Data Export',
        format: 'JSON',
      },
    };

    // Return as downloadable JSON file
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="blokblok-data-export-${Date.now()}.json"`,
      },
    });
  } catch (err) {
    console.error('[API /gdpr/export] Error:', err);
    return new NextResponse('Server error', { status: 500 });
  }
}
