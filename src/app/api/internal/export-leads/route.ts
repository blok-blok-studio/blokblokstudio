/**
 * GET /api/internal/export-leads — download the full lead list as CSV.
 * Protected by INTERNAL_API_SECRET, accepted as the x-internal-secret
 * header or a ?key= query param so the export works straight from a
 * browser. Services are lifted out of the summary text into their own
 * column; the full summary rides along in the last column.
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function csvCell(value: string | boolean | Date | null | undefined): string {
  if (value === null || value === undefined) return '';
  const s = value instanceof Date ? value.toISOString() : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: NextRequest) {
  const secret =
    req.headers.get('x-internal-secret') || req.nextUrl.searchParams.get('key');
  if (!secret || secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  const header = [
    'created_at', 'name', 'email', 'phone', 'business', 'services', 'source',
    'field', 'status', 'website', 'marketing_opt_in', 'marketing_confirmed',
    'unsubscribed', 'consent_at', 'summary',
  ];

  const rows = leads.map((l) =>
    [
      csvCell(l.createdAt),
      csvCell(l.name),
      csvCell(l.email),
      csvCell(l.phone),
      csvCell(l.business),
      // Older leads only carry services inside the summary text
      csvCell(l.problem.match(/Service interest: (.+)/)?.[1] ?? ''),
      csvCell(l.source),
      csvCell(l.field),
      csvCell(l.status),
      csvCell(l.website),
      csvCell(l.marketingConsent),
      csvCell(l.marketingConsentConfirmed),
      csvCell(l.unsubscribed),
      csvCell(l.consentTimestamp),
      csvCell(l.problem),
    ].join(',')
  );

  const csv = [header.join(','), ...rows].join('\r\n');
  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="blokblok-leads-${stamp}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
