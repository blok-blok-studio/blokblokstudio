/**
 * index.ts — server-side lookups for the long-form copy in one language.
 *
 * Every locale file is imported here, so this module is server-only: a
 * client component that needs localized copy gets it as props from its
 * server parent (see /projects and /blog pages). Any field a locale file is
 * missing falls back to English, so a partial translation never 404s.
 */
import 'server-only';
import { projectsData, type ProjectData } from '../projects';
import { blogPosts, type BlogPost } from '../blog';
import { SITE_VIDEOS, INDEXED_VIDEOS, type SiteVideo, type SiteVideoKey } from '../videos';
import { specialties, type SpecialtyData } from '../specialties';
import type { LocaleBundle, ProjectSlug, BlogSlug, VideoKey, SpecialtySlug } from './types';
import { en } from './en';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { pt } from './pt';
import { it } from './it';
import { nl } from './nl';
import { sv } from './sv';
import { pl } from './pl';
import { tr } from './tr';
import { ru } from './ru';
import { ar } from './ar';
import { hi } from './hi';
import { zh } from './zh';
import { zhTW } from './zh-TW';
import { ja } from './ja';
import { ko } from './ko';
import { vi } from './vi';
import { th } from './th';
import { id } from './id';

const BUNDLES: Record<string, LocaleBundle> = {
  en, de, es, fr, pt, it, nl, sv, pl, tr, ru, ar, hi, zh, 'zh-TW': zhTW, ja, ko, vi, th, id,
};

/** Bundle for a locale: exact tag first ("zh-TW"), then the base language ("de" for "de-AT"), then English. */
export function bundleFor(locale: string): LocaleBundle {
  const exact = Object.keys(BUNDLES).find((k) => k.toLowerCase() === locale.toLowerCase());
  if (exact) return BUNDLES[exact];
  const base = locale.toLowerCase().split('-')[0];
  return BUNDLES[base] ?? en;
}

export function localizeProject(slug: string, locale: string): ProjectData | undefined {
  const base = projectsData[slug];
  if (!base) return undefined;
  const copy = bundleFor(locale).projects[slug as ProjectSlug] ?? en.projects[slug as ProjectSlug];
  return copy ? { ...base, ...copy } : base;
}

export function localizedProjects(locale: string): (ProjectData & { slug: string })[] {
  return Object.keys(projectsData).map((slug) => ({ slug, ...(localizeProject(slug, locale) as ProjectData) }));
}

export function localizeBlogPost(slug: string, locale: string): BlogPost | undefined {
  const base = blogPosts.find((p) => p.slug === slug);
  if (!base) return undefined;
  const copy = bundleFor(locale).blog[slug as BlogSlug] ?? en.blog[slug as BlogSlug];
  return copy ? { ...base, readTime: copy.readTime, content: copy.content } : base;
}

export function localizeVideo(key: SiteVideoKey, locale: string): SiteVideo {
  const base = SITE_VIDEOS[key];
  const copy = bundleFor(locale).videos[key as VideoKey] ?? en.videos[key as VideoKey];
  return copy ? { ...base, name: copy.name, description: copy.description } : base;
}

export function localizedVideos(locale: string): SiteVideo[] {
  return INDEXED_VIDEOS.map((v) => localizeVideo(v.id as SiteVideoKey, locale));
}

export function videoTranscript(key: SiteVideoKey, locale: string): string {
  return (bundleFor(locale).videos[key as VideoKey] ?? en.videos[key as VideoKey]).transcript;
}

export function localizeSpecialty(slug: string, locale: string): SpecialtyData | undefined {
  const base = specialties[slug];
  if (!base) return undefined;
  const copy = bundleFor(locale).specialties[slug as SpecialtySlug] ?? en.specialties[slug as SpecialtySlug];
  if (!copy) return base;
  return { ...base, ...copy, lang: locale, caseStudy: { ...copy.caseStudy, href: base.caseStudy.href } };
}

export function localizedSpecialties(locale: string): SpecialtyData[] {
  return Object.keys(specialties).map((slug) => localizeSpecialty(slug, locale) as SpecialtyData);
}

export function consentSentence(locale: string): string {
  return bundleFor(locale).consent || en.consent;
}
