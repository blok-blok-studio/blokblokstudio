import { getTranslations } from 'next-intl/server';

/**
 * V2Proof — three real numbers from shipped work, then three client
 * quotes set in the serif italic. Quotes mirror HomeTestimonials.
 */
export async function V2Proof() {
  const t = await getTranslations('home');
  // 4 = Philippine Airlines: PAL Holdings FY2025 revenue PHP 183.8B, about USD 3.1B
  // (stockanalysis.com/quote/pse/PAL, PitchBook TTM USD 3.14B as of Jun 2025).
  const stats = [4, 1, 3, 2] as const; // most impressive first: $3B+, $191k, 200%, 5.0
  return (
    <section className="band-brand px-5 pt-24 pb-32 sm:px-8 lg:px-12 lg:pt-32 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="mb-10 border-b border-white/10 pb-4 t-eyebrow text-gray-500">
          {t('v2_proof_label')}
        </h2>
        <dl className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((n) => (
            <div key={n}>
              <dd className="t-stat text-orange-500">
                {t(`v2_proof_${n}_value`)}
              </dd>
              <dt className="mt-4 max-w-xs t-caption text-gray-400">
                {t(`v2_proof_${n}_label`)}
              </dt>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
