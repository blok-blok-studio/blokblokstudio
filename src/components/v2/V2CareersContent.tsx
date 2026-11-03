import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { V2PageHero } from './V2PageHero';
import { clientCities } from '@/data/client-locations';
import { placeKey } from '@/lib/places';

/**
 * V2CareersContent — short careers page. No ATS: a few lines on how the
 * studio works, where the team sits, and one address for portfolios.
 * Open roles, when there are any, go in the `roles` message array.
 */
const EMAIL = 'hello@blokblokstudio.com';
const HOW = [1, 2, 3, 4] as const;

export async function V2CareersContent() {
  const t = await getTranslations('careers');
  const tt = await getTranslations('team');
  const tp = await getTranslations('places');
  const roles = (t.raw('roles') as { title: string; location: string; summary: string }[]) ?? [];
  const studios = clientCities.filter((c) => c.studio);
  const label = 't-eyebrow text-gray-500';
  return (
    <>
      <V2PageHero label={t('label')} title={t('title')} intro={t('intro')} />

      <section className="band-light px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${label}`}>{t('how_label')}</div>
          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map((n) => (
              <li key={n}>
                <p className="t-eyebrow text-orange-500">0{n}</p>
                <h2 className="t-h3 mt-3 text-white">{t(`how_${n}_title`)}</h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-gray-400">{t(`how_${n}_text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${label}`}>{t('where_label')}</div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studios.map((c) => (
              <li key={c.city} className="rounded-3xl border border-white/10 p-7">
                <p className="t-h2 text-white">
                  {tp(placeKey('city', c.city))}
                  {c.tag && <span className="t-eyebrow ml-2 align-middle text-orange-500">{c.tag}</span>}
                </p>
                <p className="mt-1 text-sm text-gray-500">{c.region ? `${tp(placeKey('region', c.region))}, ${tp(placeKey('country', c.country))}` : tp(placeKey('country', c.country))}</p>
                <ul className="mt-5 space-y-1 text-sm text-gray-400">
                  {(c.team ?? []).map((m) => (
                    <li key={m.name}>
                      <span className="text-white">{m.name}</span> · {tt(m.title)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-light px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${label}`}>{t('roles_label')}</div>
          {roles.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {roles.map((r) => (
                <li key={r.title} className="rounded-3xl border border-white/10 p-7 sm:p-8">
                  <p className="t-eyebrow text-orange-500">{r.location}</p>
                  <h2 className="t-h2 mt-3 text-white">{r.title}</h2>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-gray-400">{r.summary}</p>
                  <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(r.title)}`} className="mt-6 inline-flex items-center gap-2 text-sm text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">
                    {t('apply')} <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
              <div>
                <p className="t-h2 text-white">{t('none_title')}</p>
                <p className="mt-2 max-w-lg text-pretty text-sm text-gray-400">{t('none_text')}</p>
              </div>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('none_subject'))}`} className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400">
                {t('none_cta')} <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
          <p className="mt-8 text-sm text-gray-500">
            {t('clients_note')}{' '}
            <Link href="/quiz" target="_blank" rel="noopener noreferrer" className="text-gray-300 underline underline-offset-4 decoration-white/30 hover:text-white">
              {t('clients_link')}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
