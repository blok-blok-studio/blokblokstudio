/**
 * ============================================================
 * ROOT LAYOUT, app/layout.tsx
 * ============================================================
 * This is the top-level layout that wraps EVERY page on the site.
 * It includes: HTML head (favicon, manifest), global CSS, Navbar,
 * Footer, i18n (translation) provider, and SEO metadata.
 *
 * KEY FILES:
 * - Global styles: /src/app/globals.css
 * - Navbar component: /src/components/Navbar.tsx
 * - Footer component: /src/components/Footer.tsx
 * - i18n config: /src/i18n/request.ts
 * - Translation files: /src/messages/{locale}.json
 * - Structured data: /src/app/structured-data.tsx
 * - Favicon: /public/favicon.ico
 * - Manifest: /public/manifest.json
 *
 * TO EDIT:
 * - Site title/description → edit the `metadata` object below
 * - OG image for social sharing → replace /public/og-image.jpg
 * - Google verification → replace 'YOUR_GOOGLE_VERIFICATION_CODE'
 * - Favicon → replace /public/favicon.ico
 * - Fonts → change --font-sans in globals.css
 * ============================================================
 */

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema, ServiceSchema } from './structured-data';
import { Inter } from 'next/font/google';
import { CookieConsent } from '@/components/CookieConsent';
import { AdsPixels } from '@/components/AdsPixels';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.blokblokstudio.com'),
  title: {
    default: 'Blok Blok Studio | Web Design Studio in Berlin',
    template: '%s | Blok Blok Studio',
  },
  description:
    'Blok Blok Studio is a Berlin-based web design studio building custom Next.js websites for ambitious brands worldwide. Premium, conversion-focused web design, never templates.',
  keywords: [
    'Berlin web design',
    'web design Berlin',
    'custom Next.js websites',
    'web design studio',
    'web design Germany',
    'website design agency',
    'Blok Blok Studio',
  ],
  authors: [{ name: 'Blok Blok Studio', url: 'https://www.blokblokstudio.com' }],
  creator: 'Blok Blok Studio',
  publisher: 'Blok Blok Studio',
  category: 'Digital Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.blokblokstudio.com',
    siteName: 'Blok Blok Studio',
    title: 'Blok Blok Studio | Web Design Studio in Berlin',
    description:
      'Berlin-based web design studio building custom Next.js websites for clients worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blok Blok Studio, web design studio in Berlin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blok Blok Studio | Web Design Studio in Berlin',
    description:
      'Berlin-based web design studio building custom Next.js websites for clients worldwide.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  // hreflang: locale switching is handled by next-intl without distinct URLs,
  // so we only declare the canonical English page and an x-default fallback.
  // Pointing every language at the same URL was confusing search engines.
  alternates: {
    canonical: 'https://www.blokblokstudio.com',
    languages: {
      en: 'https://www.blokblokstudio.com',
      'x-default': 'https://www.blokblokstudio.com',
    },
  },
  other: {
    // Geographic targeting signals for search engines and AI crawlers
    'geo.region': 'DE-BE',
    'geo.placename': 'Berlin',
    'geo.position': '52.5200;13.4050',
    ICBM: '52.5200, 13.4050',
  },
};

/**
 * Root layout, minimal shell shared by ALL routes.
 * Navbar/Footer are added by (main)/layout.tsx for main site pages.
 * The (funnel) route group gets NO Navbar/Footer.
 */
// Right-to-left locales. Arabic is the only RTL language in our current
// 20-locale lineup; this list exists so we can extend it (Hebrew, Persian, etc.)
// without revisiting the layout logic.
const RTL_LOCALES = new Set(['ar']);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="dark">
      <head>
        {/* Google reads the favicon on its own slow schedule and renders it
            on a light circle. The mark is white, so it needs to carry its own
            dark background or it disappears there — and on a dark surface a
            transparent one disappears the other way. These are opaque.
            PNG sizes are declared explicitly because Google documents a 48px
            multiple as the requirement and reading them out of an .ico is
            left to its discretion. */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="llms" href="/llms.txt" type="text/plain" title="LLM Content" />
      </head>
      <body className={`${inter.variable} bg-black text-white antialiased font-sans noise-overlay`}>
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
          <AdsPixels />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
