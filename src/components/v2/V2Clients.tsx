import { getTranslations } from 'next-intl/server';

const CLIENTS = [
  'Coach Luki',
  'Bronco Plumbing',
  'Coach Kofi',
  'Exotic Ripz',
  'The New School',
  'Public Affair',
  'KDS Systems',
];

/** V2Clients — one quiet line of names. */
export async function V2Clients() {
  const t = await getTranslations('home');
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px] border-t border-white/10 pt-8 md:grid md:grid-cols-[12rem_1fr]">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 md:mb-0">
          {t('v2_clients_label')}
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg text-gray-300 sm:text-xl">
          {CLIENTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
