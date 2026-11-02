import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { QuizLeadForm } from '@/components/QuizLeadForm';

/**
 * V2Quiz — the funnel, live on the homepage. The right column renders the
 * real five-question QuizLeadForm (same component as /quiz) so visitors can
 * start without leaving the page; the button opens the full-page version.
 */
const STEPS = [1, 2, 3, 4, 5] as const;

export async function V2Quiz() {
  const t = await getTranslations('home');
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px] rounded-3xl border border-white/10 p-6 sm:p-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] lg:gap-16 lg:p-16">
        <div>
          <p className="t-eyebrow text-orange-500">{t('v2_quiz_label')}</p>
          <h2 className="mt-5 max-w-2xl t-h2 text-white">
            {t('v2_quiz_title')}
          </h2>
          <p className="mt-6 max-w-lg t-lead text-gray-400">{t('v2_quiz_sub')}</p>
          <Link
            href="/quiz" target="_blank" rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400"
          >
            {t('v2_quiz_cta')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-12 lg:mt-0">
          <ol className="mb-6 flex flex-wrap gap-x-5 gap-y-2 t-eyebrow text-gray-500">
            {STEPS.map((n) => (
              <li key={n}>
                0{n} {t(`v2_quiz_step_${n}`)}
              </li>
            ))}
          </ol>
          <QuizLeadForm fieldTag="Start Lead" />
        </div>
      </div>
    </section>
  );
}
