import { NextRequest, NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { verifyLeadEmails } from '@/lib/verify';

// POST /api/admin/verify — verify email addresses for selected leads
export async function POST(req: NextRequest) {
  const authError = checkAdmin(req);
  if (authError) return authError;

  try {
    const { leadIds } = await req.json();

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json({ error: 'Provide an array of leadIds' }, { status: 400 });
    }

    // Limit batch to 100 to avoid timeout
    const batch = leadIds.slice(0, 100);
    const result = await verifyLeadEmails(batch);

    return NextResponse.json({
      success: true,
      ...result,
      message: `Verified ${result.verified} emails: ${result.results.valid} valid, ${result.results.invalid} invalid, ${result.results.risky} risky, ${result.results.catch_all} catch-all, ${result.results.disposable} disposable, ${result.results.unknown} unknown`,
    });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Verification failed: ${errMsg.slice(0, 200)}` }, { status: 500 });
  }
}
