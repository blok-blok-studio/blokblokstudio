/**
 * client-locations.ts — cities for the homepage globe (redesign/v2).
 * Main cities only. `studio` marks our own bases; `team` names who sits
 * there. Lat/lng are city centres. Add a client by appending to `clients`
 * on an existing city, or adding a new city entry.
 */
export interface ClientLink {
  name: string;
  /** Live site, or a Wayback Machine snapshot when the site is gone. */
  url?: string;
  /** True when `url` is an archive.org snapshot. */
  archived?: boolean;
}

export interface ClientCity {
  city: string;
  /** State or region, shown after the city (US entries). */
  region?: string;
  country: string;
  lat: number;
  lng: number;
  clients: ClientLink[];
  team?: string[];
  studio?: boolean;
  /** Which side of the marker the screen label sits on. Default right. */
  labelAnchor?: 'left' | 'right' | 'top' | 'bottom';
  /** Only show the label when the camera altitude is below this (zoomed in). */
  labelMaxAlt?: number;
  /** Short badge shown after the city name on the globe, e.g. HQ. */
  tag?: string;
}

export const clientCities: ClientCity[] = [
  { city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405, clients: [{ name: 'Coach Luki', url: 'https://coachluki.com' }, { name: 'Coach Kofi', url: 'https://coachkofi.de' }], team: ['Chase Haynes, Founder · Blok Blok Studio'], studio: true, tag: 'HQ' },
  { city: 'Richmond', region: 'Virginia', country: 'United States', lat: 37.54, lng: -77.44, clients: [{ name: 'Exotic Ripz', url: 'https://web.archive.org/web/20250328034035/https://exoticripz.com/', archived: true }], team: ['Kyle Talley, Creative Director · Blok Blok Studio'], studio: true, labelAnchor: 'bottom', labelMaxAlt: 1.5 },
  { city: 'Los Angeles', region: 'California', country: 'United States', lat: 34.05, lng: -118.24, clients: [], studio: true, labelAnchor: 'left' },
  { city: 'Karachi', country: 'Pakistan', lat: 24.86, lng: 67.01, clients: [], team: ['Ayan Khan, Video Editor · Blok Blok Studio'], studio: true },
  { city: 'Dallas', region: 'Texas', country: 'United States', lat: 32.78, lng: -96.8, clients: [{ name: 'Bronco Plumbing', url: 'https://www.broncoplumbingdfw.com' }, { name: 'Nanny & Nest', url: 'https://web.archive.org/web/20260617191024/https://www.nannyandnest.com/', archived: true }], labelAnchor: 'right' },
  { city: 'Fort Worth', region: 'Texas', country: 'United States', lat: 32.75, lng: -97.33, clients: [{ name: 'Real Texas Properties', url: 'https://heidiehaynes.com' }], labelAnchor: 'left', labelMaxAlt: 1.6 },
  { city: 'New York', region: 'New York', country: 'United States', lat: 40.71, lng: -74.0, clients: [{ name: 'The New School', url: 'https://www.military.newschool.edu' }], labelAnchor: 'top' },
  { city: 'Washington, DC', country: 'United States', lat: 38.9, lng: -77.04, clients: [{ name: 'Mind and Body Retreats', url: 'https://www.mindandbodyretreatsco.com' }], labelAnchor: 'right' },
  { city: 'Salt Lake City', region: 'Utah', country: 'United States', lat: 40.76, lng: -111.89, clients: [{ name: 'Grant Parkhurst Photography' } /* site down (503), no Wayback capture */] },
  { city: 'Minneapolis', region: 'Minnesota', country: 'United States', lat: 44.98, lng: -93.27, clients: [{ name: 'KDS Systems', url: 'https://kdssys.com' }], labelAnchor: 'top' },
  { city: 'Albuquerque', region: 'New Mexico', country: 'United States', lat: 35.08, lng: -106.65, clients: [{ name: 'Public Affair', url: 'https://public-affair.com' }], labelAnchor: 'bottom' },
  { city: 'Manila', country: 'Philippines', lat: 14.6, lng: 120.98, clients: [{ name: 'Philippine Airlines', url: 'https://www.philippineairlines.com' }] },
];
