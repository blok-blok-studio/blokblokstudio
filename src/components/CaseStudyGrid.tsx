'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SITE_VIDEOS } from '@/data/videos';

/**
 * 2x2 client case-study grid, shared by /start and the homepage. Top row:
 * Kofi + Luki video testimonials. Bottom row: Bronco (site hero) and
 * Exotic Ripz (Shopify sales proof; the owners took the store down, so
 * the case study is the link). Name + URL + the numbers under each.
 * Links open in a new tab so the host page stays open.
 */

// Copy lives in messages/<locale>.json under `casegrid`; this only wires
// each client to its media and link.
type CaseEntry = {
  key: 'kofi' | 'luki' | 'bronco' | 'ripz';
  name: string;
  href: string;
  label: string | null;
  video?: string; poster?: string; captions?: string;
  image?: string;
};

const CASES: CaseEntry[] = [
  {
    key: 'kofi', name: 'Coach Kofi',
    href: 'https://www.coachkofi.de', label: 'coachkofi.de',
    video: SITE_VIDEOS.kofi.src, poster: SITE_VIDEOS.kofi.poster, captions: SITE_VIDEOS.kofi.captions,
  },
  {
    key: 'luki', name: 'Coach Luki',
    href: 'https://coachluki.com', label: 'coachluki.com',
    video: SITE_VIDEOS.luki.src, poster: SITE_VIDEOS.luki.poster, captions: SITE_VIDEOS.luki.captions,
  },
  {
    key: 'bronco', name: 'Bronco Plumbing',
    href: 'https://www.broncoplumbingdfw.com', label: 'broncoplumbingdfw.com',
    image: '/images/projects/bronco-card.webp',
  },
  {
    key: 'ripz', name: 'Exotic Ripz',
    href: '/projects/exotic-ripz', label: null,
    image: '/images/projects/exoticripz-card.webp',
  },
];

export function CaseStudyGrid() {
  const t = useTranslations('casegrid');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-left">
      {CASES.map(c => (
        <div key={c.name} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          {c.video ? (
            <video
              controls
              playsInline
              preload="none"
              poster={c.poster}
              className="w-full aspect-video object-cover bg-black"
            >
              <source src={c.video} type="video/mp4" />
              <track
                kind="captions"
                src={c.captions}
                srcLang="en"
                label={t('captions_label')}
                default
              />
            </video>
          ) : (
            <Image
              src={c.image!}
              alt={t('results_alt', { name: c.name })}
              width={1200}
              height={675}
              className="w-full aspect-video object-cover"
            />
          )}
          <div className="p-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-base font-semibold text-white">
                {c.name} <span className="font-normal text-sm text-gray-600">· {t(`${c.key}_where`)}</span>
              </p>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm text-orange-400 hover:text-orange-300 underline underline-offset-4"
              >
                {c.label ?? t('view_case')}
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-1.5 text-pretty">{t(`${c.key}_proof`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
