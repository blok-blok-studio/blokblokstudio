import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/data/projects';
import { blogPosts } from '@/data/blog';
import { getAllSpecialtySlugs } from '@/data/specialties';
import { INDEXED_VIDEOS, videoUrls } from '@/data/videos';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.blokblokstudio.com';

  // Live-site routes. /pricing is intentionally omitted while the site is
  // positioned as web-design-only.
  const mainRoutes = [
    '',
    '/projects',
    '/about',
    '/services',
    '/faq',
    '/team',
    '/contact',
    '/blog',
    '/accessibility',
  ];

  const legalRoutes = ['/privacy', '/terms', '/cookies', '/data-rights', '/impressum'];

  const projectSlugs = getAllProjectSlugs();

  // Stable dates: new Date() on every build erases freshness signals.
  const SITE_UPDATED = new Date('2026-07-17');

  // Video sitemap extensions, keyed by the page each video is canonical to.
  // Google will not discover a self-hosted mp4 from the <video> tag alone;
  // this and the VideoObject markup on the page are what make it indexable.
  const videosByPath = new Map(
    INDEXED_VIDEOS.map((v) => {
      const { contentUrl, thumbnailUrl } = videoUrls(v);
      return [
        v.page,
        [
          {
            title: v.name,
            description: v.description,
            thumbnail_loc: thumbnailUrl,
            content_loc: contentUrl,
            duration: v.seconds,
            publication_date: v.uploadDate,
            family_friendly: 'yes' as const,
            live: 'no' as const,
          },
        ],
      ];
    })
  );

  const entries: MetadataRoute.Sitemap = [
    // Main pages
    ...mainRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: SITE_UPDATED,
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
      ...(videosByPath.has(route) ? { videos: videosByPath.get(route) } : {}),
    })),
    // Legal pages
    ...legalRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
    // Commercial specialty pages (webdesign-berlin, plumber-website-design, ...)
    ...getAllSpecialtySlugs().map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date('2026-08-16'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // Individual project pages
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      ...(videosByPath.has(`/projects/${slug}`)
        ? { videos: videosByPath.get(`/projects/${slug}`) }
        : {}),
    })),
    // Blog posts (HTML). Markdown twins are deliberately NOT listed:
    // they're AI-agent endpoints (llms.txt links them) and carry noindex.
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // LLM discovery files
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
  ];

  return entries;
}
