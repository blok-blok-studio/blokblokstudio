import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Services — one package: the website build with hosting and care
 * included (Chase: "website and hosting are all packaged into one").
 */
type Bullet = 1 | 2 | 3 | 4 | 5;
const BULLETS: Bullet[] = [1, 2, 3, 4, 5];

export async function V2Services() {
  const t = await getTranslations('home');
  const ts = await getTranslations('services');
  const title = t('v2_offer_title');
  const subtitle = t('v2_offer_subtitle');
  const buildLabel = t('v2_offer_build_label');
  const careLabel = t('v2_offer_care_label');
  const build = BULLETS.map((b) => ts(`service_6_bullet_${b}`));
  const care = BULLETS.map((b) => t(`v2_hosting_bullet_${b}`));

  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <span>{t('v2_services_label')}</span>
          <Link href="/services" className="text-gray-400 transition-colors hover:text-white">
            {t('v2_services_link')}
          </Link>
        </div>
        <p className="mb-12 max-w-xl text-base text-gray-400">{t('v2_services_sub')}</p>
        <div className="rounded-3xl border border-white/10 p-8 sm:p-10 lg:p-14">
          <h3 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h3>
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
  );
}
