import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Services — for now only two offers: website building and hosting.
 * Chase will add the other services later. Websites copy comes from the
 * existing `services` namespace (service_6); hosting copy lives in `home`.
 */
type Bullet = 1 | 2 | 3 | 4 | 5;
const BULLETS: Bullet[] = [1, 2, 3, 4, 5];

export async function V2Services() {
  const t = await getTranslations('home');
  const ts = await getTranslations('services');

  const offers = [
    {
      n: '01',
      title: ts('service_6_title'),
      subtitle: ts('service_6_subtitle'),
      bullets: BULLETS.map((b) => ts(`service_6_bullet_${b}`)),
    },
    {
      n: '02',
      title: t('v2_hosting_title'),
      subtitle: t('v2_hosting_subtitle'),
      bullets: BULLETS.map((b) => t(`v2_hosting_bullet_${b}`)),
    },
  ];

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

        <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
          {offers.map((o) => (
            <Link key={o.n} href="/services" className="group block rounded-3xl border border-white/10 p-8 transition-colors hover:border-white/20 sm:p-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">{o.n}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white transition-colors group-hover:text-orange-400 sm:text-4xl">
                {o.title}
              </h3>
              <p className="mt-2 text-base text-gray-400">{o.subtitle}</p>
              <ul className="mt-8 space-y-2.5">
                {o.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-orange-500/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
