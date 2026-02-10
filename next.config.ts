/**
 * ============================================================
 * NEXT.JS CONFIGURATION — next.config.ts
 * ============================================================
 * This file configures Next.js build and runtime behavior.
 *
 * CURRENT SETUP:
 * - next-intl plugin for automatic i18n (language detection)
 * - Image optimization with AVIF and WebP formats
 *
 * TO EDIT:
 * - Add image domains → add `remotePatterns` inside `images`
 * - Change i18n config → edit /src/i18n/request.ts
 * - Add redirects/rewrites → add them to nextConfig object
 * ============================================================
 */

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/* Points to the i18n configuration file that handles language detection.
   See /src/i18n/request.ts for supported languages and detection logic. */
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* Image optimization — serves AVIF (smallest) with WebP fallback.
     To allow external images (e.g., from a CMS), add:
     remotePatterns: [{ protocol: 'https', hostname: 'your-cdn.com' }] */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

/* Wraps the config with next-intl plugin for i18n support */
export default withNextIntl(nextConfig);
