'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { blogPosts } from '@/data/blog';
import { INDEXED_VIDEOS } from '@/data/videos';
import { newsItems } from '@/data/news';
import { V2PageHero } from './V2PageHero';

/**
 * V2IdeasContent — one dated feed with type tabs, the way Ogilvy's Ideas
 * hub works. Read = blog posts, Watch = client videos (they play on the
 * case study page, which is their canonical home), News = studio updates.
 */
type Kind = 'read' | 'watch' | 'news';
type Tab = 'all' | Kind;
const TABS: Tab[] = ['all', 'read', 'watch', 'news'];

interface Item {
  kind: Kind;
  key: string;
  href: string;
  title: string;
  summary: string;
  date: string;
  by: string;
  image?: string;
  meta?: string;
}

export function V2IdeasContent() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [tab, setTab] = useState<Tab>('all');

  const items: Item[] = [
    ...blogPosts.map((p) => ({
      kind: 'read' as const,
      key: p.slug,
      href: `/blog/${p.slug}`,
      title: t(`posts.${p.slug}.title` as 'posts'),
      summary: t(`posts.${p.slug}.description` as 'posts'),
      date: p.date,
      by: 'Blok Blok Studio',
      image: p.image,
      meta: t('read_time', { minutes: parseInt(p.readTime, 10) || 5 }),
    })),
    ...INDEXED_VIDEOS.map((v) => ({
      kind: 'watch' as const,
      key: v.id,
      href: v.page,
      title: v.name,
      summary: v.description,
      date: v.uploadDate,
      by: v.id === 'kofi' ? 'Coach Kofi' : 'Luke Satterly, Coach Luki',
      image: v.poster,
      meta: v.seconds >= 60 ? `${Math.floor(v.seconds / 60)}:${String(v.seconds % 60).padStart(2, '0')}` : `0:${String(v.seconds).padStart(2, '0')}`,
    })),
    ...newsItems.map((n) => ({
      kind: 'news' as const,
      key: n.slug,
      href: n.href ?? '/blog',
      title: t(`news.${n.slug}.title` as 'posts'),
      summary: t(`news.${n.slug}.summary` as 'posts'),
      date: n.date,
      by: 'Blok Blok Studio',
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const shown = items.filter((i) => tab === 'all' || i.kind === tab);
  const fmt = (d: string) => new Date(d).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <>
      <V2PageHero label={t('v2_label')} title={t('list_title')} intro={t('list_subtitle')} />
      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex flex-wrap gap-2">
              {TABS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  aria-pressed={tab === k}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    tab === k ? 'border-orange-500 bg-orange-500 text-(--bb-on-primary)' : 'border-white/15 text-gray-300 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {t(`v2_tab_${k}`)}
                </button>
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">{t('v2_count', { count: shown.length })}</span>
          </div>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((i) => (
              <li key={`${i.kind}-${i.key}`} className="flex">
                <Link href={i.href} className="group flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 transition-colors hover:bg-white/[0.03]">
                  {i.image ? (
                    <div className="relative aspect-[16/10] bg-gray-950">
                      <Image src={i.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                      {i.kind === 'watch' && (
                        <span aria-hidden="true" className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-(--bb-on-primary)">
                          ▶
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-end bg-gray-950 p-7">
                      <span className="font-display text-5xl font-bold leading-none tracking-[-0.03em] text-orange-500">{fmt(i.date).split(' ')[0]}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                      <span className="text-orange-500">{t(`v2_type_${i.kind}`)}</span>
                      <time dateTime={i.date}>{fmt(i.date)}</time>
                      {i.meta && <span>{i.meta}</span>}
                    </p>
                    <h2 className="mt-4 text-balance font-display text-xl font-semibold leading-snug tracking-tight text-white">{i.title}</h2>
                    <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-gray-400">{i.summary}</p>
                    <p className="mt-6 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                      <span>{i.by}</span>
                      <span className="text-gray-300 transition-colors group-hover:text-white">
                        {t('v2_more')} <span aria-hidden="true">→</span>
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
