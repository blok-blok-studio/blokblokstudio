/**
 * news.ts — short studio updates for the Ideas hub (/blog, "News" tab).
 * Titles and summaries live in the `blog.news.<slug>` message keys so they
 * translate; this file holds the date and an optional link.
 */
export interface NewsItem {
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  /** Internal or external link, if the item has somewhere to go. */
  href?: string;
  /** Card image under /public (16:10). */
  image?: string;
}

export const newsItems: NewsItem[] = [
  { slug: 'philippine-airlines', date: '2026-10-30', href: '/projects', image: '/images/news/philippine-airlines.webp' },
  { slug: 'grant-parkhurst-portal', date: '2026-09-30', href: '/projects/grant-parkhurst', image: '/images/news/grant-parkhurst-portal.webp' },
];
