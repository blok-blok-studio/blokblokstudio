/**
 * ============================================================
 * ROOT LAYOUT — app/layout.tsx
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
import { NextIntlClientProvider } from 'next-intl'; // Wraps app with translation context
import { getLocale, getMessages } from 'next-intl/server'; // Server-side locale detection
import './globals.css'; // Global styles, Tailwind, custom utilities
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OrganizationSchema, WebsiteSchema } from './structured-data'; // JSON-LD for Google

/* ── SEO METADATA ──
   This controls how the site appears in Google search results,
   social media shares (OG tags), and Twitter cards.
   Edit these values to match your actual brand info. */
export const metadata: Metadata = {
  /* Base URL for all relative URLs in metadata */
  metadataBase: new URL('https://blokblokstudio.com'),

  /* Browser tab title — "default" is used on homepage,
     "template" adds suffix on other pages (e.g., "About | Blok Blok Studio") */
  title: {
    default: 'Blok Blok Studio | Creative Digital Agency',
    template: '%s | Blok Blok Studio',
  },

  /* Meta description — shown in Google search results */
  description:
    'Blok Blok Studio is a creative digital agency crafting bold brands, stunning websites, and digital products that move people. Web design, branding, app development, and digital marketing.',

  /* SEO keywords — helps with search ranking */
  keywords: [
    'digital agency',
    'web design',
    'branding',
    'app development',
    'creative studio',
    'UI/UX design',
    'digital marketing',
    'Blok Blok Studio',
  ],
  authors: [{ name: 'Blok Blok Studio' }],
  creator: 'Blok Blok Studio',
  publisher: 'Blok Blok Studio',

  /* Prevents browsers from auto-linking emails/phones/addresses */
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  /* ── OPEN GRAPH (Facebook, LinkedIn, etc.) ──
     Controls the preview card when the site URL is shared on social media.
     IMAGE: Replace /public/og-image.jpg with a real 1200x630 image. */
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blokblokstudio.com',
    siteName: 'Blok Blok Studio',
    title: 'Blok Blok Studio | Creative Digital Agency',
    description:
      'A creative digital agency crafting bold brands, stunning websites, and digital products that move people.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blok Blok Studio',
      },
    ],
  },

  /* ── TWITTER CARD ──
     Controls the preview card when shared on Twitter/X. */
  twitter: {
    card: 'summary_large_image',
    title: 'Blok Blok Studio | Creative Digital Agency',
    description:
      'A creative digital agency crafting bold brands, stunning websites, and digital products that move people.',
    images: ['/og-image.jpg'],
  },

  /* ── SEARCH ENGINE ROBOTS ──
     Controls crawling/indexing. Currently set to allow everything. */
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

  /* ── GOOGLE SEARCH CONSOLE ──
     Replace with your real verification code from Google Search Console.
     TODO: Get this from https://search.google.com/search-console */
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

/* ── ROOT LAYOUT COMPONENT ──
   This wraps every page. It detects the user's language from their
   browser settings, loads the matching translation file, and renders
   the Navbar + page content + Footer. */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect user's language from browser Accept-Language header
  const locale = await getLocale();
  // Load the matching translation JSON (e.g., /src/messages/en.json)
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      {/* ── HEAD ──
          Favicon, viewport, and manifest for PWA support.
          - Favicon: /public/favicon.ico (the tab icon)
          - Apple touch icon: /public/apple-touch-icon.png (iOS home screen)
          - Manifest: /public/manifest.json (PWA config) */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      {/* ── BODY ──
          - bg-black: dark background
          - text-white: default white text
          - noise-overlay: adds subtle grain texture (see globals.css) */}
      <body className="bg-black text-white antialiased font-sans noise-overlay">
        {/* JSON-LD structured data for Google rich results */}
        <OrganizationSchema />
        <WebsiteSchema />

        {/* Translation provider — makes useTranslations() work in all components */}
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
