import type { Metadata } from 'next';
import { FunnelContent } from '@/components/FunnelContent';

export const metadata: Metadata = {
  title: 'Free Website Audit | Blok Blok Studio',
  description: 'Get a free website audit from Blok Blok Studio. We\'ll analyze your site\'s design, performance, and SEO to identify opportunities for growth.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Website Audit | Blok Blok Studio',
    description: 'Get a free website audit from Blok Blok Studio. We\'ll analyze your site\'s design, performance, and SEO to identify opportunities for growth.',
    url: 'https://blokblokstudio.com/audit',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blok Blok Studio: Free Website Audit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Website Audit | Blok Blok Studio',
    description: 'Get a free website audit from Blok Blok Studio. We\'ll analyze your site\'s design, performance, and SEO to identify opportunities for growth.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/audit' },
};

export default function AuditPage() {
  return <FunnelContent />;
}
