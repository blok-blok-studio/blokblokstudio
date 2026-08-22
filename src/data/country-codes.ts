/**
 * Dialling codes for the quiz's phone field.
 *
 * A number typed as "0160 1234567" in Germany is unreachable from anywhere
 * else: 0 is the national trunk prefix, and the international form drops it
 * for +49. Asking for the country separately means what lands in the tracker
 * is always dialable, whoever is dialling and from where.
 *
 * Flags are derived from the ISO code rather than stored, so there is no
 * emoji to typo: A-Z maps onto the regional indicator symbols at U+1F1E6.
 */

export interface Country {
  iso: string;
  name: string;
  dial: string;
}

/** Their own markets first, since most leads come from these, then the rest A-Z. */
export const COUNTRIES: Country[] = [
  { iso: 'DE', name: 'Germany', dial: '49' },
  { iso: 'US', name: 'United States', dial: '1' },
  { iso: 'GB', name: 'United Kingdom', dial: '44' },
  { iso: 'AT', name: 'Austria', dial: '43' },
  { iso: 'CH', name: 'Switzerland', dial: '41' },
  { iso: 'NL', name: 'Netherlands', dial: '31' },
  { iso: 'FR', name: 'France', dial: '33' },
  { iso: 'ES', name: 'Spain', dial: '34' },
  { iso: 'IT', name: 'Italy', dial: '39' },

  { iso: 'AE', name: 'United Arab Emirates', dial: '971' },
  { iso: 'AR', name: 'Argentina', dial: '54' },
  { iso: 'AU', name: 'Australia', dial: '61' },
  { iso: 'BE', name: 'Belgium', dial: '32' },
  { iso: 'BG', name: 'Bulgaria', dial: '359' },
  { iso: 'BR', name: 'Brazil', dial: '55' },
  { iso: 'CA', name: 'Canada', dial: '1' },
  { iso: 'CL', name: 'Chile', dial: '56' },
  { iso: 'CN', name: 'China', dial: '86' },
  { iso: 'CO', name: 'Colombia', dial: '57' },
  { iso: 'CY', name: 'Cyprus', dial: '357' },
  { iso: 'CZ', name: 'Czechia', dial: '420' },
  { iso: 'DK', name: 'Denmark', dial: '45' },
  { iso: 'EE', name: 'Estonia', dial: '372' },
  { iso: 'EG', name: 'Egypt', dial: '20' },
  { iso: 'FI', name: 'Finland', dial: '358' },
  { iso: 'GR', name: 'Greece', dial: '30' },
  { iso: 'HK', name: 'Hong Kong', dial: '852' },
  { iso: 'HR', name: 'Croatia', dial: '385' },
  { iso: 'HU', name: 'Hungary', dial: '36' },
  { iso: 'ID', name: 'Indonesia', dial: '62' },
  { iso: 'IE', name: 'Ireland', dial: '353' },
  { iso: 'IL', name: 'Israel', dial: '972' },
  { iso: 'IN', name: 'India', dial: '91' },
  { iso: 'IS', name: 'Iceland', dial: '354' },
  { iso: 'JP', name: 'Japan', dial: '81' },
  { iso: 'KR', name: 'South Korea', dial: '82' },
  { iso: 'LT', name: 'Lithuania', dial: '370' },
  { iso: 'LU', name: 'Luxembourg', dial: '352' },
  { iso: 'LV', name: 'Latvia', dial: '371' },
  { iso: 'MA', name: 'Morocco', dial: '212' },
  { iso: 'MT', name: 'Malta', dial: '356' },
  { iso: 'MX', name: 'Mexico', dial: '52' },
  { iso: 'MY', name: 'Malaysia', dial: '60' },
  { iso: 'NG', name: 'Nigeria', dial: '234' },
  { iso: 'NO', name: 'Norway', dial: '47' },
  { iso: 'NZ', name: 'New Zealand', dial: '64' },
  { iso: 'PH', name: 'Philippines', dial: '63' },
  { iso: 'PL', name: 'Poland', dial: '48' },
  { iso: 'PT', name: 'Portugal', dial: '351' },
  { iso: 'RO', name: 'Romania', dial: '40' },
  { iso: 'RS', name: 'Serbia', dial: '381' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '966' },
  { iso: 'SE', name: 'Sweden', dial: '46' },
  { iso: 'SG', name: 'Singapore', dial: '65' },
  { iso: 'SI', name: 'Slovenia', dial: '386' },
  { iso: 'SK', name: 'Slovakia', dial: '421' },
  { iso: 'TH', name: 'Thailand', dial: '66' },
  { iso: 'TR', name: 'Türkiye', dial: '90' },
  { iso: 'UA', name: 'Ukraine', dial: '380' },
  { iso: 'VN', name: 'Vietnam', dial: '84' },
  { iso: 'ZA', name: 'South Africa', dial: '27' },
];

/** ISO 3166-1 alpha-2 to its flag emoji, via the regional indicator block. */
export function flagFor(iso: string): string {
  return String.fromCodePoint(
    ...[...iso.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

export const DEFAULT_COUNTRY = 'DE';

export function countryByIso(iso: string): Country | undefined {
  return COUNTRIES.find((c) => c.iso === iso.toUpperCase());
}

/**
 * Combine the chosen country with whatever was typed into one dialable number.
 *
 * Handles the three things people actually do:
 *   "0160 1234567"    with DE  ->  +491601234567   (trunk 0 dropped)
 *   "+49 160 1234567" with DE  ->  +491601234567   (already international)
 *   "49 160 1234567"  with DE  ->  +491601234567   (code typed without +)
 *
 * Returns an empty string for an empty input, since the field is optional.
 */
export function toDialable(iso: string, raw: string): string {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';

  const country = countryByIso(iso);
  const dial = country?.dial ?? '';

  // Typed in full international form already: trust it, just strip formatting.
  if (trimmed.startsWith('+')) {
    const digits = trimmed.slice(1).replace(/\D/g, '');
    return digits ? `+${digits}` : '';
  }

  const rawDigits = trimmed.replace(/\D/g, '');
  if (!rawDigits) return '';

  // A leading zero is the national trunk prefix, which settles the ambiguity
  // below: nobody writes a country code after a trunk 0, so this is
  // definitely a national number. Strip the 0 and prefix the code.
  const hadTrunkPrefix = rawDigits.startsWith('0');
  const digits = rawDigits.replace(/^0+/, '');
  if (!digits) return '';
  if (hadTrunkPrefix) return `+${dial}${digits}`;

  // No trunk prefix, and it opens with the country's own code: they typed the
  // code without the plus. Without the leading-zero signal this is genuinely
  // ambiguous (Leer's 0491 looks like +49 1...), which is exactly why the
  // branch above exists.
  if (dial && digits.startsWith(dial) && digits.length - dial.length >= 6) {
    return `+${digits}`;
  }

  return `+${dial}${digits}`;
}
