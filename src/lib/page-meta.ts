import type { Metadata } from 'next';

const SITE = 'https://www.blokblokstudio.com';
const SUFFIX = ' | Blok Blok Studio';

/**
 * One metadata shape for every page: title, description, canonical, and an
 * Open Graph and Twitter block that names THIS page. Without it, pages inherit
 * the root layout's Open Graph, which points shares at the homepage.
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  /** Title already carries the site name; skip the layout template. */
  absoluteTitle?: boolean;
  image?: string;
  robots?: { index: boolean; follow: boolean };
  ogLocale?: string;
}): Metadata {
  const full = opts.absoluteTitle ? opts.title : `${opts.title}${SUFFIX}`;
  const image = opts.image ?? '/og-image.jpg';
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    ...(opts.robots ? { robots: opts.robots } : {}),
    openGraph: {
      title: full,
      description: opts.description,
      url: `${SITE}${opts.path}`,
      siteName: 'Blok Blok Studio',
      type: 'website',
      ...(opts.ogLocale ? { locale: opts.ogLocale } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: full }],
    },
    twitter: { card: 'summary_large_image', title: full, description: opts.description, images: [image] },
  };
}
