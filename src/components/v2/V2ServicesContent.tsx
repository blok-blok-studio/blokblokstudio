import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { V2PageHero } from './V2PageHero';

type Bullet = 1 | 2 | 3 | 4 | 5;
const BULLETS: Bullet[] = [1, 2, 3, 4, 5];

export async function V2ServicesContent() {
  const ts = await getTranslations('services');
  const th = await getTranslations('home');
  const title = th('v2_offer_title');
  const subtitle = th('v2_offer_subtitle');
  const buildLabel = th('v2_offer_build_label');
  const careLabel = th('v2_offer_care_label');
  const build = BULLETS.map((b) => ts(`service_6_bullet_${b}`));
  const care = BULLETS.map((b) => th(`v2_hosting_bullet_${b}`));
  const steps = BULLETS.map((n) => ({ n, title: ts(`step_${n}_title`), desc: ts(`step_${n}_desc`) }));
  const label = 'text-[11px] uppercase tracking-[0.2em] text-gray-500';
  return (
    <>
      <V2PageHero label={ts('v2_label')} title={ts('title')} intro={ts('v2_intro')} />

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
        <div className="rounded-3xl border border-white/10 p-8 sm:p-10 lg:p-14">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-base text-gray-400">{subtitle}</p>
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">{buildLabel}</p>
                <ul className="mt-5 space-y-2.5">
                  {build.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">{careLabel}</p>
                <ul className="mt-5 space-y-2.5">
                  {care.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-10 border-b border-white/10 pb-4 ${label}`}>{ts('v2_process_label')}</div>
          {/* Timeline: a line with a dot per step. Horizontal from lg, vertical below. */}
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-8">
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-2 bottom-2 w-px bg-white/15 lg:left-[10%] lg:right-[10%] lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto"
            />
            {steps.map((st) => (
              <li key={st.n} className="relative pl-8 lg:pl-0 lg:text-center">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-black bg-orange-500 lg:static lg:mx-auto lg:block"
                />
                <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500 lg:mt-5">0{st.n}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400 lg:mx-auto lg:max-w-[16rem]">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
          <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{ts('v2_cta_label')}</p>
          <Link href="/quiz" target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-3 whitespace-normal rounded-full bg-orange-500 px-7 py-3.5 text-center text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400">
            {ts('v2_cta')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
