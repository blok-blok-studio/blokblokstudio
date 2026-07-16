import { createHash } from 'crypto';

/**
 * Meta Conversions API — server-side Lead events.
 * The pro-standard hybrid setup: the browser pixel fires Lead on the
 * thank-you page and this fires the same event server-side with the SAME
 * event_id, so Meta deduplicates and attribution survives ad blockers and
 * Safari/iOS signal loss.
 *
 * Inert unless BOTH env vars are set:
 *   NEXT_PUBLIC_META_PIXEL_ID  — pixel id (shared with the browser pixel)
 *   META_CAPI_ACCESS_TOKEN     — Conversions API token from Events Manager
 *
 * GDPR: only called when the visitor granted marketing consent in the
 * cookie banner (the caller passes that state from the client).
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

const sha256 = (v: string) => createHash('sha256').update(v.trim().toLowerCase()).digest('hex');

interface CapiLead {
  eventId: string;
  email: string;
  phone?: string;
  sourceUrl: string;
  clientIp?: string;
  userAgent?: string;
  /** raw fbclid from the ad click, used to build the fbc parameter */
  fbclid?: string;
  /** _fbp cookie value if the browser pixel set one */
  fbp?: string;
}

export async function sendMetaLeadEvent(lead: CapiLead): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const userData: Record<string, unknown> = {
    em: [sha256(lead.email)],
    ...(lead.phone ? { ph: [sha256(lead.phone.replace(/[^0-9+]/g, ''))] } : {}),
    ...(lead.clientIp ? { client_ip_address: lead.clientIp } : {}),
    ...(lead.userAgent ? { client_user_agent: lead.userAgent } : {}),
    ...(lead.fbclid ? { fbc: `fb.1.${Date.now()}.${lead.fbclid}` } : {}),
    ...(lead.fbp ? { fbp: lead.fbp } : {}),
  };

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId, // must match the browser pixel's eventID exactly
        action_source: 'website',
        event_source_url: lead.sourceUrl,
        user_data: userData,
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) {
      console.error('[Meta CAPI] Lead event failed:', res.status, await res.text());
    }
  } catch (error) {
    console.error('[Meta CAPI] Lead event error:', error);
  }
}
