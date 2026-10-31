import { useLocale, useTranslations } from 'next-intl';
import { SITE_TIERS, formatMoney } from '@/data/pricing';

/**
 * V2NextSteps — "what happens next" in three dotted steps. Same timeline
 * pattern as the services process. Works inside server and client trees
 * (plain hooks, no async), so the contact page can reuse it.
 */
const STEPS = [1, 2, 3] as const;

export function V2NextSteps({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('home');
  const locale = useLocale();
  const price = formatMoney(SITE_TIERS[0].usd, locale);
  return (
    <section className={compact ? 'mt-20' : 'px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44'}>
      <div className={compact ? '' : 'mx-auto max-w-[1600px]'}>
        <div className="mb-10 border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">{t('v2_next_label')}</div>
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-white/15 md:left-[16.66%] md:right-[16.66%] md:top-[7px] md:bottom-auto md:h-px md:w-auto"
          />
          {STEPS.map((n) => (
            <li key={n} className="relative pl-8 md:pl-0 md:text-center">
              <span aria-hidden="true" className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-black bg-orange-500 md:static md:mx-auto md:block" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500 md:mt-5">0{n}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">{t(`v2_next_${n}_title`)}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-gray-400 md:mx-auto md:max-w-[18rem]">{t(`v2_next_${n}_desc`, { price })}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
