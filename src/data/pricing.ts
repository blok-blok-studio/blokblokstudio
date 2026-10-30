/**
 * pricing.ts — every price on the site starts here, in USD.
 * Other currencies are converted from USD at the rate below, so changing a
 * price or the rate in one place updates the funnel everywhere.
 *
 * Site builds (Chase, 2026-10-30): 5 pages $6,500 · 10 pages $12,000 · 15+ pages $18,000.
 */
export const SITE_TIERS = [
  { pages: 5, usd: 6500 },
  { pages: 10, usd: 12000 },
  { pages: 15, usd: 18000 },
] as const;

/** Units of each currency per 1 USD. Update the rate and the date together. */
export const FX = {
  asOf: '2026-10-30',
  rates: { USD: 1, EUR: 0.88 } as Record<'USD' | 'EUR', number>,
};
export type Currency = keyof typeof FX.rates;

/** Locale → display currency. German speakers see euro, everyone else USD. */
export function currencyFor(locale: string): Currency {
  return locale.toLowerCase().startsWith('de') ? 'EUR' : 'USD';
}

/**
 * Format a USD amount for a locale. Converted amounts are rounded to the
 * nearest 100; the quiz tells German visitors that euro figures are converted
 * guides and invoices are in USD.
 */
export function formatMoney(usd: number, locale: string, opts: { compact?: boolean } = {}): string {
  const cur = currencyFor(locale);
  const amount = cur === 'USD' ? usd : Math.round((usd * FX.rates[cur]) / 100) * 100;
  const fmt = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: cur,
    maximumFractionDigits: 0,
    ...(opts.compact && amount >= 1000 ? { notation: 'compact' as const, maximumFractionDigits: 1 } : {}),
  });
  return fmt.format(amount);
}
