import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Services — oversized type list. Each row carries one line of detail:
 * always visible on small screens, revealed on hover or focus on desktop.
 */
const ROWS = [1, 2, 3, 4, 5] as const;

export async function V2Services() {
  const t = await getTranslations('home');
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <span>{t('v2_services_label')}</span>
          <Link href="/services" className="text-gray-400 transition-colors hover:text-white">
            {t('v2_services_link')}
          </Link>
        </div>
        <ul>
          {ROWS.map((n) => (
            <li key={n} className="border-b border-white/10">
              <Link
                href="/services"
                className="group grid gap-x-8 gap-y-3 py-6 sm:py-8 md:grid-cols-[4rem_1fr_minmax(0,22rem)] md:items-baseline"
              >
                <span className="font-mono text-xs text-gray-500 transition-colors group-hover:text-orange-500">
                  0{n}
                </span>
                <span className="text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white transition-colors group-hover:text-orange-500 sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]">
                  {t(`v2_service_${n}_title`)}
                </span>
                <span className="text-sm leading-relaxed text-gray-400 md:translate-y-1 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                  {t(`v2_service_${n}_detail`)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
