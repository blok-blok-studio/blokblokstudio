import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/** V2Manifesto — one sentence, a lot of air, one link. */
export async function V2Manifesto() {
  const t = await getTranslations('home');
  return (
    <section className="px-6 py-32 sm:py-44 lg:py-56">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-2xl font-light leading-snug tracking-[-0.01em] text-white sm:text-3xl md:text-[2.5rem] md:leading-[1.2]">
          {t('v2_manifesto_a')}{' '}
          <em className="font-serif italic text-orange-400">{t('v2_manifesto_em')}</em>
        </p>
        <Link
          href="/about"
          className="mt-10 inline-block border-b border-white/40 pb-1 font-mono text-[12px] uppercase tracking-[0.18em] text-gray-300 transition-colors hover:border-white hover:text-white"
        >
          {t('v2_about_link')}
        </Link>
      </div>
    </section>
  );
}
