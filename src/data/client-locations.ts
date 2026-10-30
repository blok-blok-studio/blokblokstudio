/**
 * client-locations.ts — cities for the homepage globe (redesign/v2).
 * Main cities only. `studio` marks our own bases; `team` names who sits
 * there. Lat/lng are city centres. Add a client by appending to `clients`
 * on an existing city, or adding a new city entry.
 */
export interface ClientCity {
  city: string;
  country: string;
  lat: number;
  lng: number;
  clients: string[];
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
  { city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405, clients: ['Coach Luki', 'Coach Kofi'], team: ['Chase Haynes, Founder'], studio: true, tag: 'HQ' },
  { city: 'Arlington', country: 'United States', lat: 38.88, lng: -77.1, clients: [], studio: true, labelAnchor: 'left', labelMaxAlt: 0.9 },
  { city: 'Richmond', country: 'United States', lat: 37.54, lng: -77.44, clients: [], team: ['Kyle Talley, Creative Director'], studio: true, labelAnchor: 'bottom', labelMaxAlt: 1.5 },
  { city: 'Los Angeles', country: 'United States', lat: 34.05, lng: -118.24, clients: [], studio: true, labelAnchor: 'left' },
  { city: 'Karachi', country: 'Pakistan', lat: 24.86, lng: 67.01, clients: [], studio: true },
  { city: 'Dallas–Fort Worth', country: 'United States', lat: 32.78, lng: -96.8, clients: ['Bronco Plumbing', 'Heidie Haynes Realty'], labelAnchor: 'bottom' },
  { city: 'New York', country: 'United States', lat: 40.71, lng: -74.0, clients: ['The New School'], labelAnchor: 'top' },
  { city: 'Washington, DC', country: 'United States', lat: 38.9, lng: -77.04, clients: ['Mind and Body Retreats'], labelAnchor: 'right' },
  { city: 'Salt Lake City', country: 'United States', lat: 40.76, lng: -111.89, clients: ['Grant Parkhurst Photography'] },
  { city: 'Manila', country: 'Philippines', lat: 14.6, lng: 120.98, clients: ['Philippine Airlines'] },
];
