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
 * Verify a Turnstile token server-side.
 * Returns true if valid, false if invalid or missing secret key.
 */
export async function verifyTurnstile(token: string | undefined | null, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured, allow through (graceful degradation)
  if (!secret) return true;

  // No token provided = failed verification
  if (!token) return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });

    const data: TurnstileResult = await res.json();
    return data.success;
  } catch {
    // Network error — allow through to avoid blocking legitimate users
    return true;
  }
}
