import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Resend Webhook Handler — receives bounce/complaint/delivery events.
 *
 * Resend sends webhook events for:
 * - email.sent
 * - email.delivered
 * - email.delivery_delayed
 * - email.bounced (hard + soft)
 * - email.complained (FBL — user marked as spam)
 * - email.opened
 * - email.clicked
 *
 * We use these to:
 * 1. Track hard bounces → mark lead as hard-bounced, suppress future sends
 * 2. Track complaints → mark lead as complained, permanently suppress
 * 3. Track soft bounces → increment bounce count, queue for retry
 * 4. Log all events for deliverability analytics
 *
 * Setup in Resend Dashboard:
 * - Webhook URL: https://yourdomain.com/api/webhooks/resend
 * - Events: email.bounced, email.complained, email.delivered, email.opened, email.clicked
 * - Signing secret: set RESEND_WEBHOOK_SECRET env var
 */

interface ResendWebhookPayload {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject?: string;
    created_at: string;
    // Bounce-specific fields
    bounce?: {
      message: string;
      type: 'hard' | 'soft'; // Resend classifies bounce type
    };
    // Click-specific fields
    click?: {
      link: string;
      timestamp: string;
      userAgent: string;
      ipAddress: string;
    };
    // Open-specific fields
    open?: {
      timestamp: string;
      userAgent: string;
      ipAddress: string;
    };
  };
}

/**
 * Verify Resend webhook signature using HMAC-SHA256.
 * Resend signs webhooks with the svix library format.
 */
async function verifyWebhookSignature(req: NextRequest, body: string): Promise<boolean> {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    // No secret configured — accept all (development mode)
    console.warn('[Webhook] RESEND_WEBHOOK_SECRET not set — accepting unverified webhook');
    return true;
  }

  const svixId = req.headers.get('svix-id');
  const svixTimestamp = req.headers.get('svix-timestamp');
  const svixSignature = req.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return false;
  }

  // Verify timestamp is within 5 minutes (prevent replay attacks)
  const timestamp = parseInt(svixTimestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    console.warn('[Webhook] Timestamp too old — potential replay attack');
    return false;
  }

  // Verify HMAC signature
  try {
    const signedContent = `${svixId}.${svixTimestamp}.${body}`;
    // Resend uses base64-encoded secret with "whsec_" prefix
    const secretBytes = Uint8Array.from(atob(secret.replace('whsec_', '')), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
      'raw',
      secretBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBytes = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(signedContent)
    );

    const expectedSignature = `v1,${btoa(String.fromCharCode(...new Uint8Array(signatureBytes)))}`;

    // Svix sends multiple signatures separated by spaces — check if any match
    const signatures = svixSignature.split(' ');
    return signatures.some(sig => sig === expectedSignature);
  } catch (err) {
    console.error('[Webhook] Signature verification error:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  // Verify webhook signature
  const isValid = await verifyWebhookSignature(req, body);
  if (!isValid) {
    console.warn('[Webhook] Invalid signature — rejecting');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: ResendWebhookPayload;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { type, data } = payload;
  const recipientEmail = data.to?.[0];

  if (!recipientEmail) {
    return NextResponse.json({ error: 'No recipient' }, { status: 400 });
  }

  // Find the lead by email
  const lead = await prisma.lead.findUnique({
    where: { email: recipientEmail },
    select: { id: true, bounceCount: true },
  });

  try {
    switch (type) {
      // ── Hard/Soft Bounce ──
      case 'email.bounced': {
        const bounceType = data.bounce?.type || 'soft';
        const bounceMessage = data.bounce?.message || 'Unknown bounce';

        if (lead) {
          // Update lead with bounce info
          await prisma.lead.update({
            where: { id: lead.id },
            data: {
              bounceCount: { increment: 1 },
              lastBounceAt: new Date(),
              bounceType: bounceType === 'hard' ? 'hard' : (lead.bounceCount >= 2 ? 'hard' : 'soft'),
            },
          });

          // Log email event
          await prisma.emailEvent.create({
            data: {
              leadId: lead.id,
              type: 'bounced',
              details: `[Resend] ${bounceType}: ${bounceMessage.slice(0, 500)}`,
            },
          });

          console.log(`[Webhook] ${bounceType} bounce for ${recipientEmail}: ${bounceMessage.slice(0, 100)}`);
        }
        break;
      }

      // ── Spam Complaint (FBL) ──
      case 'email.complained': {
        if (lead) {
          // Permanently suppress — this is critical for reputation
          await prisma.lead.update({
            where: { id: lead.id },
            data: {
              complainedAt: new Date(),
              complaintSource: 'resend-fbl',
              unsubscribed: true, // Also unsubscribe to be safe
            },
          });

          await prisma.emailEvent.create({
            data: {
              leadId: lead.id,
              type: 'complained',
              details: '[Resend] Spam complaint via FBL',
            },
          });

          console.warn(`[Webhook] COMPLAINT for ${recipientEmail} — permanently suppressed`);
        }
        break;
      }

      // ── Delivery Confirmed ──
      case 'email.delivered': {
        if (lead) {
          await prisma.emailEvent.create({
            data: {
              leadId: lead.id,
              type: 'delivered',
              details: '[Resend] Delivery confirmed',
            },
          });
        }
        break;
      }

      // ── Email Opened ──
      case 'email.opened': {
        if (lead) {
          await prisma.emailEvent.create({
            data: {
              leadId: lead.id,
              type: 'opened',
              details: `[Resend] ${data.open?.userAgent?.slice(0, 200) || 'Unknown UA'}`,
            },
          });

          // Update engagement
          await prisma.lead.update({
            where: { id: lead.id },
            data: {
              lastEngagedAt: new Date(),
              engagementScore: { increment: 10 },
            },
          });
        }
        break;
      }

      // ── Link Clicked ──
      case 'email.clicked': {
        if (lead) {
          await prisma.emailEvent.create({
            data: {
              leadId: lead.id,
              type: 'clicked',
              details: `[Resend] ${data.click?.link?.slice(0, 500) || 'Unknown link'}`,
            },
          });

          // Stronger engagement signal
          await prisma.lead.update({
            where: { id: lead.id },
            data: {
              lastEngagedAt: new Date(),
              engagementScore: { increment: 25 },
            },
          });
        }
        break;
      }

      // ── Delivery Delayed ──
      case 'email.delivery_delayed': {
        if (lead) {
          await prisma.emailEvent.create({
            data: {
              leadId: lead.id,
              type: 'delayed',
              details: '[Resend] Delivery delayed — ISP throttling or greylisting',
            },
          });
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${type}`);
    }
  } catch (err) {
    console.error(`[Webhook] Error processing ${type}:`, err);
    // Return 200 anyway to prevent Resend from retrying
  }

  // Always return 200 — Resend will retry on non-2xx
  return NextResponse.json({ received: true, type });
}
