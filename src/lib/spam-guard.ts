/**
 * Spam detection utilities for form submissions.
 * Catches bot submissions via honeypot, timing, and gibberish detection.
 */

interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

/**
 * Check if a honeypot field was filled (bots fill hidden fields, humans don't).
 */
export function checkHoneypot(value: unknown): SpamCheckResult {
  if (value && typeof value === 'string' && value.trim().length > 0) {
    return { isSpam: true, reason: 'honeypot' };
  }
  return { isSpam: false };
}

/**
 * Check if form was submitted too fast (bots submit instantly).
 * Token is the timestamp when the form was rendered, encoded as base36.
 */
export function checkTiming(token: unknown, minSeconds = 3): SpamCheckResult {
  if (!token || typeof token !== 'string') {
    return { isSpam: true, reason: 'missing-timing' };
  }
  try {
    const rendered = parseInt(token, 36);
    const elapsed = (Date.now() - rendered) / 1000;
    if (elapsed < minSeconds) {
      return { isSpam: true, reason: 'too-fast' };
    }
    // Reject tokens from more than 24 hours ago (stale/reused)
    if (elapsed > 86400) {
      return { isSpam: true, reason: 'stale-token' };
    }
  } catch {
    return { isSpam: true, reason: 'bad-token' };
  }
  return { isSpam: false };
}

/**
 * Detect gibberish text — random consonant clusters, no real words.
 * Catches names like "JQpPrtksqctsJlpbPOjiFxd".
 */
export function isGibberish(text: string): boolean {
  if (!text || text.length < 3) return false;

  const cleaned = text.trim().toLowerCase();

  // Long string with no spaces is suspicious for names/companies
  if (cleaned.length > 15 && !cleaned.includes(' ')) return true;

  // Count consecutive consonants — real words rarely have 5+ in a row
  const consonantRuns = cleaned.match(/[bcdfghjklmnpqrstvwxyz]{5,}/gi);
  if (consonantRuns && consonantRuns.length > 0) return true;

  // Ratio check: if the string is mostly consonants (>75%), it's likely gibberish
  const letters = cleaned.replace(/[^a-z]/g, '');
  if (letters.length > 5) {
    const vowels = letters.replace(/[^aeiou]/g, '').length;
    const vowelRatio = vowels / letters.length;
    if (vowelRatio < 0.15) return true;
  }

  return false;
}

/**
 * Check if email has suspicious patterns (excessive dots used to create unique aliases).
 * e.g. "tur.n.e.rs.t.e.e.le1.23@gmail.com"
 */
export function isSuspiciousEmail(email: string): boolean {
  const [local] = email.split('@');
  if (!local) return false;

  // Count dots in local part — real emails rarely have 4+ dots
  const dotCount = (local.match(/\./g) || []).length;
  if (dotCount >= 4) return true;

  // Single-char segments between dots: "a.b.c.d.e" pattern
  const segments = local.split('.');
  const tinySegments = segments.filter(s => s.length <= 1).length;
  if (tinySegments >= 3) return true;

  return false;
}

/**
 * Run all spam checks on a form submission.
 * Returns the first failing check, or { isSpam: false } if clean.
 */
export function runSpamChecks({
  honeypot,
  timingToken,
  name,
  email,
  message,
}: {
  honeypot?: unknown;
  timingToken?: unknown;
  name?: string;
  email?: string;
  message?: string;
}): SpamCheckResult {
  // 1. Honeypot
  const hp = checkHoneypot(honeypot);
  if (hp.isSpam) return hp;

  // 2. Timing
  const timing = checkTiming(timingToken);
  if (timing.isSpam) return timing;

  // 3. Gibberish name
  if (name && isGibberish(name)) {
    return { isSpam: true, reason: 'gibberish-name' };
  }

  // 4. Suspicious email
  if (email && isSuspiciousEmail(email)) {
    return { isSpam: true, reason: 'suspicious-email' };
  }

  // 5. Gibberish message (only for long messages that are pure nonsense)
  if (message && message.length > 20 && isGibberish(message)) {
    return { isSpam: true, reason: 'gibberish-message' };
  }

  return { isSpam: false };
}

/**
 * Generate a timing token (base36-encoded timestamp).
 * Used on the client side when the form mounts.
 */
export function generateTimingToken(): string {
  return Date.now().toString(36);
}
