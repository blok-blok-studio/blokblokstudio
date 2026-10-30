/**
 * client-locations.ts — cities for the homepage globe (redesign/v2).
 * Main cities only, as Chase asked. `studio` marks our own bases.
 * Lat/lng are city centres. Add a client by appending to `clients` on an
 * existing city, or adding a new city entry.
 */
export interface ClientCity {
  city: string;
  country: string;
  lat: number;
  lng: number;
  clients: string[];
  studio?: boolean;
}

export const clientCities: ClientCity[] = [
  { city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405, clients: ['Coach Luki', 'Coach Kofi'], studio: true },
  { city: 'Dallas–Fort Worth', country: 'United States', lat: 32.78, lng: -96.8, clients: ['Bronco Plumbing', 'Heidie Haynes Realty'] },
  { city: 'New York', country: 'United States', lat: 40.71, lng: -74.0, clients: ['The New School'] },
  { city: 'Washington, DC', country: 'United States', lat: 38.9, lng: -77.04, clients: ['Mind and Body Retreats'] },
  { city: 'Richmond', country: 'United States', lat: 37.54, lng: -77.44, clients: ['Richmond Magazine'], studio: true },
  { city: 'Salt Lake City', country: 'United States', lat: 40.76, lng: -111.89, clients: ['Grant Parkhurst Photography'] },
  { city: 'Los Angeles', country: 'United States', lat: 34.05, lng: -118.24, clients: [], studio: true },
  { city: 'Manila', country: 'Philippines', lat: 14.6, lng: 120.98, clients: ['Philippine Airlines'] },
];
