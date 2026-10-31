import { getTranslations } from 'next-intl/server';
import { clientCities } from '@/data/client-locations';

/**
 * V2Clients — trust bar under the hero. Every client on the globe, biggest
 * names first, so the list can never drift from client-locations.ts.
 */
const FIRST = ['Philippine Airlines', 'The New School', 'Bronco Plumbing', 'Coach Luki', 'Coach Kofi', 'KDS Systems'];

export async function V2Clients() {
  const t = await getTranslations('home');
  const all = clientCities.flatMap((c) => c.clients.map((cl) => cl.name));
  const names = [...FIRST.filter((n) => all.includes(n)), ...all.filter((n) => !FIRST.includes(n))];
  return (
    <section aria-label={t('v2_clients_label')} className="px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
      <div className="mx-auto max-w-[1600px] border-y border-white/10 py-7 md:grid md:grid-cols-[12rem_1fr] md:items-center">
        <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-gray-500 md:mb-0">{t('v2_clients_label')}</p>
        <ul className="flex flex-wrap gap-x-7 gap-y-3 font-display text-base font-semibold tracking-tight text-gray-300 sm:text-lg">
          {names.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
