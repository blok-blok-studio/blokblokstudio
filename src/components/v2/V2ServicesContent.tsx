import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { V2PageHero } from './V2PageHero';

type Bullet = 1 | 2 | 3 | 4 | 5;
const BULLETS: Bullet[] = [1, 2, 3, 4, 5];

export async function V2ServicesContent() {
  const ts = await getTranslations('services');
  const th = await getTranslations('home');
  const offers = [
    { n: '01', title: ts('service_6_title'), subtitle: ts('service_6_subtitle'), bullets: BULLETS.map((b) => ts(`service_6_bullet_${b}`)) },
    { n: '02', title: th('v2_hosting_title'), subtitle: th('v2_hosting_subtitle'), bullets: BULLETS.map((b) => th(`v2_hosting_bullet_${b}`)) },
  ];
  const steps = BULLETS.map((n) => ({ n, title: ts(`step_${n}_title`), desc: ts(`step_${n}_desc`) }));
  const label = 'text-[11px] uppercase tracking-[0.2em] text-gray-500';
  return (
    <>
      <V2PageHero label={ts('v2_label')} title={ts('title')} intro={ts('v2_intro')} />

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-2">
          {offers.map((o) => (
            <div key={o.n} className="rounded-3xl border border-white/10 p-8 sm:p-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">{o.n}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{o.title}</h2>
              <p className="mt-2 text-base text-gray-400">{o.subtitle}</p>
              <ul className="mt-8 space-y-2.5">
                {o.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-orange-500/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${label}`}>{ts('v2_process_label')}</div>
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="border-l border-white/15 pl-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">0{s.n}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
          <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{ts('v2_cta_label')}</p>
          <Link href="/quiz" className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400">
            {ts('v2_cta')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
