import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // SOC 2 compliant security headers (backup layer — middleware is primary)
  async headers() {
    return [
      {
        // Apply the SOC 2 security headers to everything EXCEPT the
        // reverse-proxy route. /api/proxy serves third-party HTML inside
        // an iframe on our own pages; X-Frame-Options: DENY here would
        // make Chrome refuse to render the proxied content.
        source: '/((?!api/proxy).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },

  // 301s for URLs from the previous site iteration that Google still
  // remembers (Search Console "Not found (404)" report, Aug 2026). The
  // old template used portfolio-details/, blog-details/, careers/,
  // knowledge-base*, product/, shop, and a de-de/ URL prefix — none of
  // which exist on the current site. Specific mappings first, then
  // pattern catch-alls to the closest live page.
  async redirects() {
    return [

      // Retired /start landing page — /vsl is the funnel now. Query strings
      // (UTMs) carry through automatically.
      { source: '/start', destination: '/vsl', permanent: true },

      // Old de-de locale prefix: strip it, then the remaining path hits
      // the rules below on the second hop (locale now comes via cookie).
      { source: '/de-de/:path*', destination: '/:path*', permanent: true },
      { source: '/de-de', destination: '/', permanent: true },

      // Old portfolio slugs with a known new home
      { source: '/portfolio-details/the-new-school-website-design', destination: '/projects/military-newschool', permanent: true },
      { source: '/portfolio-details/exotic-ripz', destination: '/projects/exotic-ripz', permanent: true },
      { source: '/portfolio-details/public-affair', destination: '/projects/public-affair', permanent: true },
      { source: '/portfolio-details/:slug*', destination: '/projects', permanent: true },
      { source: '/our-projects', destination: '/projects', permanent: true },
      { source: '/projects/nanny-and-nest', destination: '/projects', permanent: true },

      // Old blog structure
      { source: '/blog-details/:slug*', destination: '/blog', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },

      // Old team, careers, knowledge base, shop, misc
      { source: '/team-details/:slug*', destination: '/team', permanent: true },
      { source: '/careers/:slug*', destination: '/about', permanent: true },
      { source: '/careers', destination: '/about', permanent: true },
      { source: '/knowledge-base-categories/:slug*', destination: '/faq', permanent: true },
      { source: '/knowledge-base-details/:slug*', destination: '/faq', permanent: true },
      { source: '/product/:slug*', destination: '/services', permanent: true },
      { source: '/shop', destination: '/services', permanent: true },
      { source: '/request-a-demo', destination: '/contact', permanent: true },
    ];
  },

  trailingSlash: false,
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
