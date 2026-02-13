import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateEngagement } from '@/lib/deliverability';

// 1x1 transparent PNG pixel
const PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

/**
 * GET /api/track — Universal tracking endpoint.
 *
 * Supports both legacy and stealth parameter formats:
 *
 * Legacy:  ?t=open&lid=LEAD_ID&cid=CAMPAIGN_ID
 * Stealth: ?e=o&r=LEAD_ID&s=CAMPAIGN_ID (rotated param names)
 *
 * The stealth format uses rotating parameter names to avoid ISP fingerprinting.
 * All param name sets from tracking.ts are supported here.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const params = url.searchParams;

  // Resolve tracking type from any param name set (legacy + 5 stealth sets)
  const type = params.get('t') || params.get('e') || params.get('a') || params.get('k') || params.get('w') || params.get('n');

  // Resolve lead ID from any param name set
  const leadId = params.get('lid') || params.get('r') || params.get('u') || params.get('p') || params.get('x') || params.get('h');

  // Resolve campaign ID from any param name set
  const campaignId = params.get('cid') || params.get('s') || params.get('v') || params.get('q') || params.get('z') || params.get('j');

  // Resolve redirect URL (legacy: 'url', stealth: 'd')
  const redirectUrl = params.get('url') || params.get('d');

  // Normalize type values (stealth uses short codes)
  const normalizedType = type === 'o' || type === 'open' ? 'open' : type === 'c' || type === 'click' ? 'click' : type;

  // Validate required params
  if (!normalizedType || !leadId) {
    if (normalizedType === 'open') {
      // Still return pixel even if params are missing
      return new NextResponse(PIXEL, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // Sanitize leadId to prevent injection
  const cleanLeadId = leadId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
  const cleanCampaignId = campaignId?.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || null;

  if (normalizedType === 'open') {
    // Log open event (non-blocking — don't slow down pixel response)
    logEvent(cleanLeadId, 'opened', cleanCampaignId).catch(() => {});

    return new NextResponse(PIXEL, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Expires': '0',
        'Pragma': 'no-cache',
      },
    });
  }

  if (normalizedType === 'click') {
    if (!redirectUrl) {
      return NextResponse.json({ error: 'Missing redirect URL' }, { status: 400 });
    }

    // Validate redirect URL to prevent open redirect attacks
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(redirectUrl);
      // Only allow http/https redirects
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return NextResponse.json({ error: 'Invalid URL protocol' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Log click event (non-blocking)
    logEvent(cleanLeadId, 'clicked', cleanCampaignId, parsedUrl.href).catch(() => {});

    // 302 redirect to the actual URL
    return NextResponse.redirect(parsedUrl.href, 302);
  }

  return NextResponse.json({ error: 'Unknown tracking type' }, { status: 400 });
}

async function logEvent(leadId: string, type: string, campaignId: string | null, details?: string) {
  try {
    // Check if this exact event was already logged recently (dedup within 1 hour)
    const oneHourAgo = new Date(Date.now() - 3600000);
    const existing = await prisma.emailEvent.findFirst({
      where: {
        leadId,
        type,
        campaignId: campaignId || undefined,
        createdAt: { gte: oneHourAgo },
      },
    });

    if (existing) return; // Already logged

    await prisma.emailEvent.create({
      data: { leadId, type, campaignId, details },
    });

    // Update engagement score on opens, clicks, replies
    if (['opened', 'clicked', 'replied'].includes(type)) {
      updateEngagement(leadId, type as 'opened' | 'clicked' | 'replied').catch(() => {});
    }
  } catch {
    // Silently fail — don't break tracking
  }
}
