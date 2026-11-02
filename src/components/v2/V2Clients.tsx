import { getTranslations } from 'next-intl/server';
import { clientCities } from '@/data/client-locations';

/**
 * V2Clients — trust bar under the hero. Every client on the globe, biggest
 * names first, so the list can never drift from client-locations.ts.
 *
 * Logos live in public/images/clients/ and are rendered as white marks:
 *   invert  = transparent-background mark of any colour → white silhouette
 *   lighten = white (or bright) mark on a black background → black drops out
 *   gray    = full-colour mark with its own white type → desaturated as is
 *   none    = already white
 * Sources: Dropbox "Shared Assets/blokblokstudio/Logos for blok blok website"
 * (Exotic Ripz, Public Affair), Heidie's "new logo" PNG in Downloads (Real
 * Texas Properties, has a QR code and phone number baked in), client sites and our own client repos for the rest.
 * Grant Parkhurst has no mark (his site sets the name in type), so text.
 * Chase confirmed 2026-11-01 we have permission to show all client logos.
 */
type Mode = 'invert' | 'lighten' | 'gray' | 'none';
interface Logo {
  src: string;
  mode: Mode;
  /** Rendered height in px; widths follow the file's aspect ratio. */
  h: number;
  /** Show the client name beside the mark (icon-only logos). */
  withName?: boolean;
}

const LOGOS: Record<string, Logo> = {
  'Philippine Airlines': { src: '/images/clients/philippine-airlines.svg', mode: 'invert', h: 22 },
  'The New School': { src: '/images/clients/the-new-school.webp', mode: 'invert', h: 38 },
  'Bronco Plumbing': { src: '/images/clients/bronco-plumbing.webp', mode: 'gray', h: 48 },
  'Coach Luki': { src: '/images/clients/coach-luki-icon.svg', mode: 'invert', h: 30, withName: true },
  'Coach Kofi': { src: '/images/clients/coach-kofi.webp', mode: 'none', h: 30, withName: true },
  'KDS Systems': { src: '/images/clients/kds-systems.webp', mode: 'invert', h: 26 },
  'Nanny & Nest': { src: '/images/clients/nanny-and-nest.svg', mode: 'invert', h: 40 },
  'Mind and Body Retreats': { src: '/images/clients/mind-and-body-retreats.svg', mode: 'none', h: 28 },
  'Exotic Ripz': { src: '/images/clients/exotic-ripz.webp', mode: 'gray', h: 56 },
  'Public Affair': { src: '/images/clients/public-affair.webp', mode: 'none', h: 34 },
  'Real Texas Properties': { src: '/images/clients/real-texas-properties.webp', mode: 'gray', h: 56 },
};

const FIRST = ['Philippine Airlines', 'The New School', 'Bronco Plumbing', 'Coach Luki', 'Coach Kofi', 'KDS Systems'];

const MODE_CLASS: Record<Mode, string> = {
  invert: 'brightness-0 invert',
  lighten: 'grayscale brightness-125 mix-blend-lighten',
  gray: 'grayscale brightness-110 contrast-110',
  none: '',
};

export async function V2Clients() {
  const t = await getTranslations('home');
  const all = clientCities.flatMap((c) => c.clients.map((cl) => cl.name));
  const names = [...FIRST.filter((n) => all.includes(n)), ...all.filter((n) => !FIRST.includes(n))];
  return (
    <section aria-label={t('v2_clients_label')} className="px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
      <div className="mx-auto max-w-[1600px] border-y border-white/10 py-8 md:grid md:grid-cols-[12rem_1fr] md:items-center">
        <h2 className="mb-6 t-eyebrow text-gray-500 md:mb-0">{t('v2_clients_label')}</h2>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {names.map((n) => {
            const logo = LOGOS[n];
            return (
              <li key={n} className="flex items-center gap-3 opacity-75 transition-opacity hover:opacity-100">
                {logo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={logo.withName ? '' : n}
                      height={logo.h}
                      style={{ height: logo.h }}
                      loading="lazy"
                      decoding="async"
                      className={`w-auto max-w-[11rem] object-contain ${MODE_CLASS[logo.mode]}`}
                    />
                    {logo.withName && <span className="t-h4 text-white">{n}</span>}
                  </>
                ) : (
                  <span className="t-h4 text-white">{n}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
