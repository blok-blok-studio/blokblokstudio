'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { projectsData } from '@/data/projects';
import { V2PageHero } from './V2PageHero';

const IMAGES: Record<string, string> = {
  'coach-luki': '/images/projects/coachluki.jpg',
  'bronco-plumbing': '/images/projects/bronco.webp',
  'coach-kofi': '/images/projects/coachkofi.webp',
  'exotic-ripz': '/images/projects/exoticripz.jpg',
  'kds-systems': '/images/projects/kdssys.webp',
  'public-affair': '/images/projects/public-affair.webp',
  'military-newschool': '/images/projects/military-newschool.webp',
};
const RESULT_KEY: Record<string, string> = {
  'coach-luki': 'v2_result_coach_luki',
  'bronco-plumbing': 'v2_result_bronco_plumbing',
  'coach-kofi': 'v2_result_coach_kofi',
  'exotic-ripz': 'v2_result_exotic_ripz',
  'kds-systems': 'v2_result_kds_systems',
  'public-affair': 'v2_result_public_affair',
  'military-newschool': 'v2_result_military_newschool',
};
const CATS = [
  { id: 'all', key: 'filter_all' },
  { id: 'Web Design', key: 'cat_web' },
  { id: 'E-Commerce', key: 'cat_ecom' },
  { id: 'Branding', key: 'cat_brand' },
] as const;

export function V2ProjectsContent() {
  const t = useTranslations('projects');
  const th = useTranslations('home');
  const [cat, setCat] = useState<string>('all');
  const slugs = Object.keys(projectsData).filter((s) => cat === 'all' || projectsData[s].category === cat);

  return (
    <>
      <V2PageHero label={t('v2_label')} title={t('title')} intro={t('subtitle')} />
      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  aria-pressed={cat === c.id}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    cat === c.id ? 'border-orange-500 bg-orange-500 text-(--bb-on-primary)' : 'border-white/15 text-gray-300 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {t(c.key)}
                </button>
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">{t('v2_count', { count: slugs.length })}</span>
          </div>

          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {slugs.map((slug, i) => {
              const p = projectsData[slug];
              const wide = i === 0 && cat === 'all';
              const img = IMAGES[slug] ?? p.heroImage;
              return (
                <li key={slug} className={wide ? 'md:col-span-2' : ''}>
                  <Link href={`/projects/${slug}`} className="group block">
                    <div className={`relative overflow-hidden rounded-2xl bg-gray-950 ${wide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                      {img && (
                        <Image
                          src={img}
                          alt={p.title}
                          fill
                          sizes={wide ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          priority={wide}
                        />
                      )}
                    </div>
                    <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{p.title}</h3>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                        {p.category} · {p.year}
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
                      {RESULT_KEY[slug] ? th(RESULT_KEY[slug] as 'v2_result_coach_luki') : p.desc}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
