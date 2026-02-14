/**
 * In-memory rate limiter for API routes.
 * SOC 2 compliant — prevents abuse of public-facing endpoints.
 *
 * Usage:
 *   const limiter = rateLimit({ interval: 60_000, maxRequests: 5 });
 *   const { success } = limiter.check(ip);
 */

interface RateLimitOptions {
  /** Time window in milliseconds */
  interval: number;
  /** Max requests allowed per window */
  maxRequests: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export function rateLimit({ interval, maxRequests }: RateLimitOptions) {
  const tokens = new Map<string, RateLimitEntry>();

  // Periodically clean up expired entries to prevent memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of tokens) {
      if (now >= entry.resetAt) {
        tokens.delete(key);
      }
    }
  }, interval * 2).unref?.();

  return {
    check(identifier: string): { success: boolean; remaining: number; resetAt: number } {
      const now = Date.now();
      const entry = tokens.get(identifier);

      if (!entry || now >= entry.resetAt) {
        // New window
        tokens.set(identifier, { count: 1, resetAt: now + interval });
        return { success: true, remaining: maxRequests - 1, resetAt: now + interval };
      }

      if (entry.count >= maxRequests) {
        return { success: false, remaining: 0, resetAt: entry.resetAt };
      }

      entry.count++;
      return { success: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
    },
  };
}
