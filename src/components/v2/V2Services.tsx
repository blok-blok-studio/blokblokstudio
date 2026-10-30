import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Services — everything the studio does, in three oversized groups.
 * Service titles and one-liners come from the existing `services`
 * namespace (already translated in all 20 locales).
 */
const GROUPS = [
  { n: 1, services: [6, 7] },
  { n: 2, services: [8, 9] },
  { n: 3, services: [1, 2, 3, 4, 5] },
] as const;

type ServiceKey = `service_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}_title`;
type ServiceSub = `service_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}_subtitle`;

export async function V2Services() {
  const t = await getTranslations('home');
  const ts = await getTranslations('services');
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <span>{t('v2_services_label')}</span>
          <Link href="/services" className="text-gray-400 transition-colors hover:text-white">
            {t('v2_services_link')}
          </Link>
        </div>
        <p className="mb-16 max-w-xl text-base text-gray-400">{t('v2_services_sub')}</p>
        <ul>
          {GROUPS.map((g) => (
            <li key={g.n} className="border-b border-white/10 py-10 first:pt-0 sm:py-14">
              <div className="grid gap-8 md:grid-cols-[4rem_1fr] md:items-start">
                <span className="font-mono text-xs text-orange-500">0{g.n}</span>
                <div>
                  <Link
                    href="/services"
                    className="block text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white transition-colors hover:text-orange-500 sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
                  >
                    {t(`v2_group_${g.n}`)}
                  </Link>
                  <p className="mt-4 max-w-md text-sm text-gray-400">{t(`v2_group_${g.n}_detail`)}</p>
                  <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                    {g.services.map((s) => (
                      <li key={s} className="border-l border-white/15 pl-4">
                        <Link href="/services" className="group block">
                          <span className="block text-base font-medium text-white group-hover:text-orange-400 sm:text-lg">
                            {ts(`service_${s}_title` as ServiceKey)}
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            {ts(`service_${s}_subtitle` as ServiceSub)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
