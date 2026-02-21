import type { Metadata } from 'next';
import { FunnelContent } from '@/components/FunnelContent';

export const metadata: Metadata = {
  title: 'Free Business Audit | Blok Blok Studio',
  description: 'Get a free business audit from Blok Blok Studio. We\'ll review your entire operation — AI, automation, website, ads, and workflows — and give you a custom roadmap for growth.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Business Audit | Blok Blok Studio',
    description: 'Get a free business audit from Blok Blok Studio. We\'ll review your entire operation — AI, automation, website, ads, and workflows — and give you a custom roadmap for growth.',
    url: 'https://blokblokstudio.com/audit',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blok Blok Studio: Free Business Audit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Business Audit | Blok Blok Studio',
    description: 'Get a free business audit from Blok Blok Studio. We\'ll review your entire operation and give you a custom roadmap for growth.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/audit' },
};

export default function AuditPage() {
  return <FunnelContent />;
}
