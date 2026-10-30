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
    role: 'v2_quote_1_role',
  },
  {
    quote:
      'Blok Blok Studio transformed my online presence completely. The bold design perfectly captures my coaching philosophy and the results have been incredible.',
    name: 'Kofi',
    role: 'v2_quote_2_role',
  },
  {
    quote:
      'The e-commerce store they built for us is incredible. Our booster pack drops sell out in hours and the community engagement through the site has been amazing.',
    name: 'Exotic Ripz',
    role: 'v2_quote_3_role',
  },
];

export async function V2Proof() {
  const t = await getTranslations('home');
  // 4 = Philippine Airlines: PAL Holdings FY2025 revenue PHP 183.8B, about USD 3.1B
  // (stockanalysis.com/quote/pse/PAL, PitchBook TTM USD 3.14B as of Jun 2025).
  const stats = [1, 2, 3, 4] as const;
  return (
    <section className="px-5 pt-24 pb-32 sm:px-8 lg:px-12 lg:pt-32 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          {t('v2_proof_label')}
        </div>
        <dl className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((n) => (
            <div key={n}>
              <dd className="font-display text-[3rem] font-bold leading-none tracking-[-0.03em] text-orange-500 sm:text-[4rem] lg:text-[4.75rem]">
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
                {q.name} · {t(q.role as 'v2_quote_1_role')}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
