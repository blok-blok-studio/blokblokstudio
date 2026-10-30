import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Quiz — the funnel entry on the homepage. Links to /quiz, the clean
 * slug for the five-question funnel at /start.
 */
const STEPS = [1, 2, 3, 4, 5] as const;

export async function V2Quiz() {
  const t = await getTranslations('home');
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px] border border-white/10 p-8 sm:p-12 lg:grid lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16 lg:p-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-500">{t('v2_quiz_label')}</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            {t('v2_quiz_title')}
          </h2>
          <p className="mt-6 max-w-lg text-base text-gray-400">{t('v2_quiz_sub')}</p>
          <Link
            href="/quiz"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-(--bb-on-primary) transition-colors hover:bg-orange-400"
          >
            {t('v2_quiz_cta')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ol className="mt-12 divide-y divide-white/10 border-y border-white/10 lg:mt-0">
          {STEPS.map((n) => (
            <li key={n} className="flex items-baseline gap-5 py-4">
              <span className="font-mono text-xs text-gray-500">0{n}</span>
              <span className="text-base text-gray-200">{t(`v2_quiz_step_${n}`)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
