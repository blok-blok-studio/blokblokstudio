/**
 * POST /api/internal/delete-lead — Internal API for EasyReach to sync lead deletions.
 * Protected by shared secret (INTERNAL_API_SECRET).
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-internal-secret');
    if (!secret || secret !== process.env.INTERNAL_API_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const existing = await prisma.lead.findUnique({ where: { email } });
    if (!existing) {
      return NextResponse.json({ success: true, message: 'Not found (already deleted)' });
    }

    // Delete list memberships first, then lead
    await prisma.leadListMember.deleteMany({ where: { leadId: existing.id } });
    await prisma.lead.delete({ where: { email } });

    console.log(`[Internal] Deleted lead ${email} (synced from EasyReach)`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Internal] Delete lead error:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
