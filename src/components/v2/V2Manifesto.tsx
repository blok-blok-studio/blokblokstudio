import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/** V2Manifesto — one sentence, a lot of air, one link. */
export async function V2Manifesto() {
  const t = await getTranslations('home');
  return (
    <section className="px-6 pb-32 pt-8 sm:pb-44 sm:pt-12 lg:pb-56 lg:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-balance font-display text-2xl font-semibold leading-snug tracking-[-0.01em] text-white sm:text-3xl md:text-[2.5rem] md:leading-[1.2]">
          {t('v2_manifesto_a')}{' '}
          <em className="not-italic text-orange-400">{t('v2_manifesto_em')}</em>
        </p>
        <Link
          href="/about"
          className="mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-gray-300 transition-colors hover:text-white"
        >
          {t('v2_about_link')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
