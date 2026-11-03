'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ProjectData } from '@/data/projects';
import { V2PageHero } from './V2PageHero';
import { PROJECT_IMAGES as IMAGES, PROJECT_RESULT_KEYS as RESULT_KEY } from '@/data/project-cards';

const CAT_KEY: Record<string, 'cat_web' | 'cat_ecom' | 'cat_brand'> = { 'Web Design': 'cat_web', 'E-Commerce': 'cat_ecom', Branding: 'cat_brand' };
const CATS = [
  { id: 'all', key: 'filter_all' },
  { id: 'Web Design', key: 'cat_web' },
  { id: 'E-Commerce', key: 'cat_ecom' },
] as const;

/** `projects` arrives already localized from the server page (src/data/i18n is server-only). */
export function V2ProjectsContent({ projects }: { projects: (ProjectData & { slug: string })[] }) {
  const t = useTranslations('projects');
  const th = useTranslations('home');
  const [cat, setCat] = useState<string>('all');
  const shown = projects.filter((p) => cat === 'all' || p.category === cat);

  const card = (p: ProjectData & { slug: string }, wide: boolean) => {
    const slug = p.slug;
    const img = IMAGES[slug] ?? p.heroImage;
    const m = p.metrics?.[0];
    return (
      <li key={slug}>
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
            <h2 className="t-h3 text-white">{p.title}</h2>
            <span className="t-eyebrow text-gray-500">
              {CAT_KEY[p.category] ? t(CAT_KEY[p.category]) : p.category} · {p.year}
            </span>
          </div>
          {m && (
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="t-h2 text-orange-500">{m.value}</span>
              <span className="t-eyebrow text-gray-500">{m.label}</span>
            </p>
          )}
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
            {RESULT_KEY[slug] ? th(RESULT_KEY[slug] as 'v2_result_coach_luki') : p.desc}
          </p>
        </Link>
      </li>
    );
  };
  const featured = cat === 'all' ? shown[0] : undefined;
  const rest = featured ? shown.slice(1) : shown;

  return (
    <>
      <V2PageHero label={t('v2_label')} title={t('title')} intro={t('subtitle')} />
      <section className="px-5 pb-8 sm:px-8 lg:px-12 lg:pb-12">
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
            <span className="t-eyebrow text-gray-500">{t('v2_count', { count: shown.length })}</span>
          </div>

          {featured && <ul>{card(featured, true)}</ul>}
        </div>
      </section>

      {rest.length > 0 && (
        <section className="band-light px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
          <ul className="mx-auto grid max-w-[1600px] gap-x-8 gap-y-16 md:grid-cols-2">
            {rest.map((p) => card(p, false))}
          </ul>
        </section>
      )}
    </>
  );
}
