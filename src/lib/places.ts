/**
 * Place names (cities, regions, countries) from client-locations.ts are
 * stored in English and translated through the `places` message namespace.
 * The key is derived from the English name so the data file stays readable:
 * "Salt Lake City" -> places.city_salt_lake_city.
 */
export type PlaceKind = 'city' | 'region' | 'country';

export function placeKey(kind: PlaceKind, name: string): string {
  return `${kind}_${name.toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '')}`;
}
