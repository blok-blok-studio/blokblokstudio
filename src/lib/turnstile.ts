/**
 * Server-side Cloudflare Turnstile token verification.
 * Validates the token received from the frontend widget.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileResult {
  success: boolean;
  'error-codes'?: string[];
}

/**
 * 'ok'          — verified, or Turnstile isn't configured on this deployment
 * 'spam'        — Cloudflare actively rejected the token; drop the submission
 * 'unverified'  — no token reached us, or Cloudflare was unreachable. The
 *                 widget can fail for reasons that have nothing to do with the
 *                 visitor (script blocker, offline, a domain missing from the
 *                 widget's allow-list), so callers let these through on the
 *                 honeypot/timing/rate-limit checks rather than silently
 *                 binning a lead we paid for.
 */
export type TurnstileVerdict = 'ok' | 'spam' | 'unverified';

export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string
): Promise<TurnstileVerdict> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Turnstile not configured on this deployment — graceful degradation
  if (!secret) return 'ok';

  // The widget never produced a token, so there is nothing to check
  if (!token) return 'unverified';

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
      signal: AbortSignal.timeout(5000),
    });

    const data: TurnstileResult = await res.json();
    if (data.success) return 'ok';
    console.warn('[Turnstile] Token rejected:', data['error-codes']?.join(',') || 'unknown');
    return 'spam';
  } catch {
    // Cloudflare unreachable — don't block a real submission on our outage
    return 'unverified';
  }
}
