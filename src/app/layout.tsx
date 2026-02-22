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
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Script from 'next/script';
import './globals.css';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema, ServiceSchema } from './structured-data';
import { CookieConsent } from '@/components/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL('https://blokblokstudio.com'),
  title: {
    default: 'Blok Blok Studio | Creative Digital Agency',
    template: '%s | Blok Blok Studio',
  },
  description:
    'Blok Blok Studio is a creative digital agency crafting bold brands, stunning websites, and digital products that move people. Web design, branding, app development, and digital marketing.',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  twitter: {
    card: 'summary_large_image',
    title: 'Blok Blok Studio | Creative Digital Agency',
    description:
      'A creative digital agency crafting bold brands, stunning websites, and digital products that move people.',
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
  alternates: {
    canonical: 'https://blokblokstudio.com',
    languages: {
      'en': 'https://blokblokstudio.com',
      'es': 'https://blokblokstudio.com',
      'fr': 'https://blokblokstudio.com',
      'de': 'https://blokblokstudio.com',
      'pt': 'https://blokblokstudio.com',
      'ja': 'https://blokblokstudio.com',
      'ko': 'https://blokblokstudio.com',
      'zh': 'https://blokblokstudio.com',
      'ar': 'https://blokblokstudio.com',
      'it': 'https://blokblokstudio.com',
      'nl': 'https://blokblokstudio.com',
      'ru': 'https://blokblokstudio.com',
      'x-default': 'https://blokblokstudio.com',
    },
  },
};

/**
 * Root layout — minimal shell shared by ALL routes.
 * Navbar/Footer are added by (main)/layout.tsx for main site pages.
 * The (funnel) route group gets NO Navbar/Footer.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="llms" href="/llms.txt" type="text/plain" title="LLM Content" />
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '791118270702001');
          fbq('track', 'PageView');
        `}</Script>
      </head>
      <body className="bg-black text-white antialiased font-sans noise-overlay">
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=791118270702001&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
