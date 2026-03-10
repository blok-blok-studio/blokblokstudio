/**
 * EasyReach webhook integration
 * Sends form submissions to EasyReach CRM for automation
 * Fire-and-forget: failures don't block form submission
 */

const EASYREACH_WEBHOOK_URL = process.env.EASYREACH_WEBHOOK_URL;
const EASYREACH_WEBHOOK_SECRET = process.env.EASYREACH_WEBHOOK_SECRET;

interface EasyReachPayload {
  source: 'funnel' | 'contact' | 'newsletter';
  name?: string;
  email: string;
  company?: string;
  field?: string;
  website?: string | null;
  message?: string;
  consent?: boolean;
}

export async function pushToEasyReach(payload: EasyReachPayload): Promise<void> {
  if (!EASYREACH_WEBHOOK_URL || !EASYREACH_WEBHOOK_SECRET) {
    console.warn('[EasyReach] Webhook not configured, skipping');
    return;
  }

  try {
    const res = await fetch(EASYREACH_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': EASYREACH_WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[EasyReach] Webhook failed:', res.status, errorText);
    } else {
      console.log('[EasyReach] Webhook delivered:', payload.source);
    }
  } catch (error) {
    // Log but don't throw — Telegram still fires, lead still saved
    console.error('[EasyReach] Webhook error:', error);
  }
}
