/**
 * Client Job Tracker integration (blokblokstudio-clients.vercel.app)
 * Leads from the funnel/contact forms become PROSPECT clients in the tracker;
 * newsletter signups land in its subscriber list.
 * Fire-and-forget: failures don't block form submission.
 */

const TRACKER_URL = process.env.TRACKER_WEBHOOK_URL;
const TRACKER_SECRET = process.env.TRACKER_WEBHOOK_SECRET;

interface TrackerLead {
  source: 'funnel' | 'contact';
  name: string;
  email: string;
  business?: string;
  website?: string | null;
  summary?: string;
}

export async function pushLeadToTracker(lead: TrackerLead): Promise<void> {
  if (!TRACKER_URL || !TRACKER_SECRET) {
    console.warn('[Tracker] Webhook not configured, skipping');
    return;
  }

  try {
    const res = await fetch(`${TRACKER_URL}/api/leads/intake`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': TRACKER_SECRET,
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error('[Tracker] Lead intake failed:', res.status, await res.text());
    } else {
      console.log('[Tracker] Lead delivered:', lead.source);
    }
  } catch (error) {
    // Log but don't throw — lead is still saved in our own DB
    console.error('[Tracker] Lead intake error:', error);
  }
}

export async function pushNewsletterToTracker(email: string): Promise<void> {
  if (!TRACKER_URL) {
    console.warn('[Tracker] Webhook not configured, skipping');
    return;
  }

  try {
    const res = await fetch(`${TRACKER_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'website' }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error('[Tracker] Newsletter push failed:', res.status, await res.text());
    }
  } catch (error) {
    console.error('[Tracker] Newsletter push error:', error);
  }
}
