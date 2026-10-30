/**
 * studio.ts — facts about Blok Blok Studio that copy depends on.
 * Founded June 2024. Years in business is computed so it never goes stale.
 */
export const FOUNDED = { year: 2024, month: 6 }; // June 2024
export const FOUNDED_ISO = '2024-06';

/** Whole years since founding, e.g. 2 from June 2026 until June 2027. */
export function yearsInBusiness(now: Date = new Date()): number {
  const y = now.getFullYear() - FOUNDED.year;
  const beforeAnniversary = now.getMonth() + 1 < FOUNDED.month;
  return Math.max(1, beforeAnniversary ? y - 1 : y);
}
