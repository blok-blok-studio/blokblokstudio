/**
 * POST /api/internal/migrate-consent-evidence — ONE-OFF, DELETE AFTER USE.
 *
 * Adds the three marketing-consent evidence columns to Lead. It exists only
 * because db.prisma.io:5432 is unreachable from outside Vercel (TCP connects,
 * the Postgres session is reset), so the migration cannot be run the normal
 * way from a laptop. Vercel can reach the database, so the migration runs
 * from here instead.
 *
 * Deliberately not a general-purpose SQL runner: the statements are fixed
 * constants, nothing is read from the request, and every one is additive with
 * IF NOT EXISTS, so calling it twice is harmless and calling it cannot drop
 * or alter existing data.
 *
 * Protected by INTERNAL_API_SECRET, same as the other internal routes.
 *
 * Remove this file once the columns exist and the schema change is merged.
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const STATEMENTS = [
  'ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "marketingConsentAt" TIMESTAMP(3)',
  'ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "marketingConsentIp" TEXT',
  'ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "marketingConsentText" TEXT',
] as const;

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-internal-secret');
  if (!process.env.INTERNAL_API_SECRET || secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    for (const sql of STATEMENTS) {
      await prisma.$executeRawUnsafe(sql);
    }

    // Read the columns back so the caller can verify rather than trust.
    const columns = await prisma.$queryRawUnsafe<{ column_name: string; is_nullable: string }[]>(
      `SELECT column_name, is_nullable
         FROM information_schema.columns
        WHERE table_name = 'Lead' AND column_name LIKE 'marketingConsent%'
        ORDER BY column_name`
    );
    const leadCount = await prisma.$queryRawUnsafe<{ n: bigint }[]>(
      'SELECT count(*) AS n FROM "Lead"'
    );

    return NextResponse.json({
      success: true,
      columns,
      leadCount: Number(leadCount[0]?.n ?? 0),
    });
  } catch (err) {
    console.error('[Internal] consent-evidence migration failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 }
    );
  }
}
