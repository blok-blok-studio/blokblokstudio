import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { V2PageHero } from './V2PageHero';
import { yearsInBusiness } from '@/data/studio';

export async function V2AboutContent() {
  const t = await getTranslations('about');
  const stats = [
    { value: '15+', label: t('stats_projects') },
    { value: '11', label: t('stats_clients') },
    { value: String(yearsInBusiness()), label: t('stats_years') },
    { value: '6+', label: t('stats_awards') },
  ];
  const values = [1, 2, 3, 4] as const;
  const label = 'text-[11px] uppercase tracking-[0.2em] text-gray-500';
  return (
    <>
      <V2PageHero label={t('v2_label')} title={t('title')} intro={t('subtitle')} />

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <p className="max-w-3xl text-balance font-display text-2xl font-semibold leading-snug text-white sm:text-3xl md:text-[2.5rem] md:leading-[1.2]">
            {t('v2_intro')}
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-2">
          {[
            { title: t('mission_title'), text: t('mission_text'), n: '01' },
            { title: t('vision_title'), text: t('vision_text'), n: '02' },
          ].map((c) => (
            <div key={c.n} className="rounded-3xl border border-white/10 p-8 sm:p-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">{c.n}</p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{c.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-gray-400">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${label}`}>{t('values_title')}</div>
          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((n) => (
              <li key={n} className="">
                <h3 className="font-display text-lg font-semibold text-white">{t(`value_${n}_title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{t(`value_${n}_text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <dl className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-[3rem] font-bold leading-none tracking-[-0.03em] text-orange-500 sm:text-[4rem]">{s.value}</dd>
                <dt className="mt-3 text-sm text-gray-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
          <div>
            <p className={label}>{t('v2_team_label')}</p>
            <Link href="/team" className="mt-3 inline-block font-display text-2xl font-semibold text-white transition-colors hover:text-orange-400 sm:text-3xl">
              {t('v2_team_link')}
            </Link>
          </div>
          <Link href="/quiz" className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400">
            {t('v2_cta')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
