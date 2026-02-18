/**
 * EasyReach webhook integration — forwards form submissions to the EasyReach CRM.
 * Non-blocking: failures are logged but never break the form submission.
 *
 * Set EASYREACH_WEBHOOK_URL and EASYREACH_WEBHOOK_SECRET in your .env
 */

const WEBHOOK_URL = process.env.EASYREACH_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.EASYREACH_WEBHOOK_SECRET;

interface EasyReachLead {
  source: "contact" | "newsletter" | "funnel";
  name?: string;
  email: string;
  company?: string;
  field?: string;
  website?: string;
  message?: string;
  consent?: boolean;
}

export async function forwardToEasyReach(lead: EasyReachLead): Promise<void> {
  if (!WEBHOOK_URL || !WEBHOOK_SECRET) return;

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": WEBHOOK_SECRET,
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(5000), // 5s timeout — don't slow down the form
    });
  } catch {
    // Non-critical — EasyReach being down should never break the website
    console.warn("[EasyReach] Webhook forwarding failed (non-critical)");
  }
}
