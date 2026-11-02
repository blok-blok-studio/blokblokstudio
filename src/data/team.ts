import type { PlaceKind } from '@/lib/places';

/** The five people. Rendered on /team and emitted as Person schema there. */
export type Member = {
  name: string;
  roleKey: 'role_founder' | 'role_creative' | 'role_marketing' | 'role_fullstack' | 'role_video';
  /** City plus region or country, translated through the `places` namespace. */
  location: { city: string; area: string; areaKind: PlaceKind };
  studied?: ['chase_studied_1' | 'kyle_studied_1' | 'ayan_studied_1', 'chase_studied_2' | 'kyle_studied_2' | 'ayan_studied_2'];
  enjoys?: 'chase_enjoys' | 'kyle_enjoys' | 'ayan_enjoys';
  /** Square headshot in public/images/team/; initials when absent. */
  photo?: string;
  socials?: { linkedin?: string; instagram?: string; github?: string };
};

export const MEMBERS: Member[] = [
  { name: 'Chase Haynes', roleKey: 'role_founder', location: { city: 'Berlin', area: 'Germany', areaKind: 'country' }, studied: ['chase_studied_1', 'chase_studied_2'], enjoys: 'chase_enjoys', socials: { linkedin: 'https://www.linkedin.com/in/chase-haynes/', instagram: 'https://www.instagram.com/itschasehaynes/' }, photo: '/images/team/chase-haynes.webp' },
  { name: 'Kyle Talley', roleKey: 'role_creative', location: { city: 'Richmond', area: 'Virginia', areaKind: 'region' }, studied: ['kyle_studied_1', 'kyle_studied_2'], enjoys: 'kyle_enjoys', socials: { linkedin: 'https://www.linkedin.com/in/kylebtalley/', instagram: 'https://www.instagram.com/ta11ey_/' }, photo: '/images/team/kyle-talley.webp' },
  { name: 'Bridget Perdomo', roleKey: 'role_marketing', location: { city: 'Los Angeles', area: 'California', areaKind: 'region' }, socials: { instagram: 'https://www.instagram.com/bridgeperdomo/' }, photo: '/images/team/bridget-perdomo.webp' },
  { name: 'Yahya Ibrahim', roleKey: 'role_fullstack', location: { city: 'Berlin', area: 'Germany', areaKind: 'country' }, socials: { github: 'https://github.com/ya7ya', instagram: 'https://www.instagram.com/yahyaouthere/' }, photo: '/images/team/yahya-ibrahim.webp' },
  { name: 'Ayan Khan', roleKey: 'role_video', location: { city: 'Multan', area: 'Pakistan', areaKind: 'country' }, studied: ['ayan_studied_1', 'ayan_studied_2'], enjoys: 'ayan_enjoys', socials: { instagram: 'https://www.instagram.com/ayzor.x/' }, photo: '/images/team/ayan-khan.webp' },
];
