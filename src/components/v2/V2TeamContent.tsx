import { getTranslations } from 'next-intl/server';
import { V2PageHero } from './V2PageHero';

type Member = {
  name: string;
  roleKey: 'role_founder' | 'role_creative' | 'role_marketing' | 'role_fullstack' | 'role_video';
  location: string;
  studied?: [string, string];
  enjoys?: string[];
  socials?: { linkedin?: string; instagram?: string; github?: string };
};

const MEMBERS: Member[] = [
  { name: 'Chase Haynes', roleKey: 'role_founder', location: 'Berlin, Germany', studied: ['Design and Technology', 'Parsons School of Design'], enjoys: ['Art museums', 'Traveling', 'Content creation'], socials: { linkedin: 'https://www.linkedin.com/in/chase-haynes/', instagram: 'https://www.instagram.com/haynes2va/' } },
  { name: 'Kyle Talley', roleKey: 'role_creative', location: 'Richmond, Virginia', studied: ['Creative Advertising', 'Virginia Commonwealth University'], enjoys: ['Brazilian jiu jitsu', 'Animation', 'Thrifting'], socials: { linkedin: 'https://www.linkedin.com/in/kylebtalley/', instagram: 'https://www.instagram.com/ta11ey_/' } },
  { name: 'Bridget Perdomo', roleKey: 'role_marketing', location: 'Los Angeles, California' },
  { name: 'Yahya Ibrahim', roleKey: 'role_fullstack', location: 'Berlin, Germany', socials: { github: 'https://github.com/ya7ya' } },
  { name: 'Ayan Khan', roleKey: 'role_video', location: 'Multan, Pakistan' },
];

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2);
}

export async function V2TeamContent() {
  const t = await getTranslations('team');
  const label = 'text-[10px] uppercase tracking-[0.2em] text-gray-500';
  return (
    <>
      <V2PageHero label={t('v2_label')} title={t('title')} intro={t('v2_intro')} />
      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <ul className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MEMBERS.map((m) => (
            <li key={m.name} className="flex flex-col rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500 font-display text-xl font-bold text-(--bb-on-primary)">
                  {initials(m.name)}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-white">{m.name}</h2>
                  <p className="text-sm text-gray-400">{t(m.roleKey)}</p>
                </div>
              </div>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className={label}>{t('v2_based')}</dt>
                  <dd className="mt-1 text-gray-200">{m.location}</dd>
                </div>
                {m.studied && (
                  <div>
                    <dt className={label}>{t('v2_studied')}</dt>
                    <dd className="mt-1 text-gray-200">
                      {m.studied[0]}
                      <span className="block text-gray-500">{m.studied[1]}</span>
                    </dd>
                  </div>
                )}
                {m.enjoys && (
                  <div>
                    <dt className={label}>{t('v2_enjoys')}</dt>
                    <dd className="mt-1 text-gray-200">{m.enjoys.join(' · ')}</dd>
                  </div>
                )}
              </dl>
              {m.socials && (
                <div className="mt-auto flex gap-4 pt-8 text-[11px] uppercase tracking-[0.18em]">
                  {Object.entries(m.socials).map(([k, href]) => (
                    <a key={k} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white">
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
