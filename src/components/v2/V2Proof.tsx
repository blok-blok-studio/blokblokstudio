import { getTranslations } from 'next-intl/server';

/**
 * V2Proof — three real numbers from shipped work, then three client
 * quotes set in the serif italic. Quotes mirror HomeTestimonials.
 */
const QUOTES = [
  {
    quote:
      'They built my entire site from scratch and now clients book and pay directly through it. I used to waste hours on DMs and invoices.',
    name: 'Luke Satterly',
    role: 'Coach Luki, Berlin',
  },
  {
    quote:
      'Blok Blok Studio transformed my online presence completely. The bold design perfectly captures my coaching philosophy and the results have been incredible.',
    name: 'Kofi',
    role: 'Coach Kofi',
  },
  {
    quote:
      'The e-commerce store they built for us is incredible. Our booster pack drops sell out in hours and the community engagement through the site has been amazing.',
    name: 'Exotic Ripz',
    role: 'Trading card store',
  },
];

export async function V2Proof() {
  const t = await getTranslations('home');
  const stats = [1, 2, 3] as const;
  return (
    <section className="px-5 pt-24 pb-32 sm:px-8 lg:px-12 lg:pt-32 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          {t('v2_proof_label')}
        </div>
        <dl className="grid gap-12 md:grid-cols-3">
          {stats.map((n) => (
            <div key={n}>
              <dd className="font-display text-[3.5rem] font-bold leading-none tracking-[-0.03em] text-orange-500 sm:text-[5rem] lg:text-[6.5rem]">
                {t(`v2_proof_${n}_value`)}
              </dd>
              <dt className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
                {t(`v2_proof_${n}_label`)}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mt-28 border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          {t('v2_quotes_label')}
        </div>
        <ul className="grid gap-x-10 gap-y-14 pt-12 md:grid-cols-3">
          {QUOTES.map((q) => (
            <li key={q.name}>
              <blockquote className="text-2xl italic leading-snug text-white sm:text-[1.75rem]">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                {q.name} · {q.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
