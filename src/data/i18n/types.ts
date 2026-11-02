/**
 * types.ts — shape of one language's copy for the data-driven pages.
 *
 * Message strings live in src/messages/<locale>.json. Everything longer
 * lives here, one file per locale (src/data/i18n/<locale>.ts): case study
 * copy, blog bodies, video titles and transcripts, the specialty landing
 * pages and the marketing-consent sentence. English (en.ts) is the source
 * every other file is translated from; index.ts falls back to it per field.
 */

export type ProjectSlug =
  | 'coach-luki'
  | 'bronco-plumbing'
  | 'coach-kofi'
  | 'exotic-ripz'
  | 'kds-systems'
  | 'public-affair'
  | 'military-newschool'
  | 'grant-parkhurst'
  | 'mind-and-body-retreats';

/** Text fields of a case study. Title, category, year, images and URLs stay in projects.ts. */
export interface ProjectCopy {
  desc: string;
  challenge: string;
  solution: string;
  results: string;
  /** Same length and order as the English entry; translate the labels, keep the values. */
  metrics?: { value: string; label: string }[];
}

export type BlogSlug = 'why-your-website-is-losing-customers' | 'seo-checklist-2026' | 'brand-identity-investment';

/** Blog body (Markdown). Title, description and category are message keys under blog.posts. */
export interface BlogCopy {
  /** e.g. "5 min read" in the target language; the number is what the UI reads. */
  readTime: string;
  content: string;
}

export type VideoKey = 'kofi' | 'luki' | 'founder';

export interface VideoCopy {
  name: string;
  description: string;
  /** Paragraphs separated by a blank line, same paragraph count as English. */
  transcript: string;
}

export type SpecialtySlug = 'webdesign-berlin' | 'plumber-website-design' | 'personal-trainer-website-design' | 'ecommerce-website-design';

/** Text of a specialty landing page. slug, lang and hrefs stay in specialties.ts. */
export interface SpecialtyCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  intro: string;
  stats: { value: string; label: string }[];
  featuresHeading: string;
  features: { title: string; desc: string }[];
  caseStudy: { heading: string; name: string; result: string; body: string; linkLabel: string };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
}

export interface LocaleBundle {
  projects: Record<ProjectSlug, ProjectCopy>;
  blog: Record<BlogSlug, BlogCopy>;
  videos: Record<VideoKey, VideoCopy>;
  specialties: Record<SpecialtySlug, SpecialtyCopy>;
  /** The marketing-consent sentence shown next to the quiz checkbox. */
  consent: string;
}
