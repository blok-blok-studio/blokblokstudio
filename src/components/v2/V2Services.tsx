import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Services — every service, broken down, in columns.
 * Three groups; each group is a labelled row with its services laid out
 * three to a row. Each service shows its title, one-liner and bullets at
 * reading size, no display type. Copy comes from the `services` namespace,
 * already translated in all 20 locales.
 */
const GROUPS = [
  { n: 1, services: [6, 7] },
  { n: 2, services: [8, 9] },
  { n: 3, services: [1, 2, 3, 4, 5] },
] as const;

type Idx = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Bullet = 1 | 2 | 3 | 4 | 5;
const BULLETS: Bullet[] = [1, 2, 3, 4, 5];

export async function V2Services() {
  const t = await getTranslations('home');
  const ts = await getTranslations('services');
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <span>{t('v2_services_label')}</span>
          <Link href="/services" className="text-gray-400 transition-colors hover:text-white">
            {t('v2_services_link')}
          </Link>
        </div>
        <p className="mb-16 max-w-xl text-base text-gray-400">{t('v2_services_sub')}</p>

        <div className="divide-y divide-white/10">
          {GROUPS.map((g) => (
            <div key={g.n} className="grid gap-8 py-12 first:pt-0 last:pb-0 lg:grid-cols-[16rem_1fr] lg:gap-16">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">0{g.n}</p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {t(`v2_group_${g.n}`)}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-gray-500">{t(`v2_group_${g.n}_detail`)}</p>
              </div>

              <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {g.services.map((s) => (
                  <li key={s}>
                    <Link href="/services" className="group block">
                      <h4 className="font-display text-base font-semibold text-white transition-colors group-hover:text-orange-400">
                        {ts(`service_${s as Idx}_title`)}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">{ts(`service_${s as Idx}_subtitle`)}</p>
                      <ul className="mt-4 space-y-1.5">
                        {BULLETS.map((b) => (
                          <li key={b} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-orange-500/70" />
                            {ts(`service_${s as Idx}_bullet_${b}`)}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
