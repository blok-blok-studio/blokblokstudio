import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { placeKey, type PlaceKind } from '@/lib/places';
import { V2PageHero } from './V2PageHero';

type Member = {
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

const MEMBERS: Member[] = [
  { name: 'Chase Haynes', roleKey: 'role_founder', location: { city: 'Berlin', area: 'Germany', areaKind: 'country' }, studied: ['chase_studied_1', 'chase_studied_2'], enjoys: 'chase_enjoys', socials: { linkedin: 'https://www.linkedin.com/in/chase-haynes/', instagram: 'https://www.instagram.com/itschasehaynes/' }, photo: '/images/team/chase-haynes.webp' },
  { name: 'Kyle Talley', roleKey: 'role_creative', location: { city: 'Richmond', area: 'Virginia', areaKind: 'region' }, studied: ['kyle_studied_1', 'kyle_studied_2'], enjoys: 'kyle_enjoys', socials: { linkedin: 'https://www.linkedin.com/in/kylebtalley/', instagram: 'https://www.instagram.com/ta11ey_/' }, photo: '/images/team/kyle-talley.webp' },
  { name: 'Bridget Perdomo', roleKey: 'role_marketing', location: { city: 'Los Angeles', area: 'California', areaKind: 'region' }, socials: { instagram: 'https://www.instagram.com/bridgeperdomo/' }, photo: '/images/team/bridget-perdomo.webp' },
  { name: 'Yahya Ibrahim', roleKey: 'role_fullstack', location: { city: 'Berlin', area: 'Germany', areaKind: 'country' }, socials: { github: 'https://github.com/ya7ya', instagram: 'https://www.instagram.com/yahyaouthere/' }, photo: '/images/team/yahya-ibrahim.webp' },
  { name: 'Ayan Khan', roleKey: 'role_video', location: { city: 'Multan', area: 'Pakistan', areaKind: 'country' }, studied: ['ayan_studied_1', 'ayan_studied_2'], enjoys: 'ayan_enjoys', socials: { instagram: 'https://www.instagram.com/ayzor.x/' }, photo: '/images/team/ayan-khan.webp' },
];

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2);
}

export async function V2TeamContent() {
  const t = await getTranslations('team');
  const tp = await getTranslations('places');
  const label = 't-eyebrow text-gray-500';
  return (
    <>
      <V2PageHero label={t('v2_label')} title={t('title')} intro={t('v2_intro')} />
      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <ul className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MEMBERS.map((m) => (
            <li key={m.name} className="flex flex-col rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-5">
                {m.photo ? (
                  <Image src={m.photo} alt={m.name} width={64} height={64} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500 font-display text-xl font-bold text-(--bb-on-primary)">
                    {initials(m.name)}
                  </span>
                )}
                <div>
                  <h2 className="t-h3 text-white">{m.name}</h2>
                  <p className="text-sm text-gray-400">{t(m.roleKey)}</p>
                </div>
              </div>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className={label}>{t('v2_based')}</dt>
                  <dd className="mt-1 text-gray-200">{tp(placeKey('city', m.location.city))}, {tp(placeKey(m.location.areaKind, m.location.area))}</dd>
                </div>
                {m.studied && (
                  <div>
                    <dt className={label}>{t('v2_studied')}</dt>
                    <dd className="mt-1 text-gray-200">
                      {t(m.studied[0])}
                      <span className="block text-gray-500">{t(m.studied[1])}</span>
                    </dd>
                  </div>
                )}
                {m.enjoys && (
                  <div>
                    <dt className={label}>{t('v2_enjoys')}</dt>
                    <dd className="mt-1 text-gray-200">{t(m.enjoys)}</dd>
                  </div>
                )}
              </dl>
              {m.socials && (
                <div className="t-eyebrow mt-auto flex gap-4 pt-8">
                  {Object.entries(m.socials).map(([k, href]) => (
                    <a key={k} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                      {k}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
