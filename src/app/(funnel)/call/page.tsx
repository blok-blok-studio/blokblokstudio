import type { Metadata } from 'next';
import { FunnelContent } from '@/components/FunnelContent';

export const metadata: Metadata = {
  title: 'Free Strategy Call | Blok Blok Studio',
  description: 'Book a free 30-minute strategy call with Blok Blok Studio. We\'ll review your entire operation (AI, automation, website, ads, and workflows) and build a custom growth plan, live on the call.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Strategy Call | Blok Blok Studio',
    description: 'Book a free 30-minute strategy call with Blok Blok Studio. We\'ll review your entire operation (AI, automation, website, ads, and workflows) and build a custom growth plan, live on the call.',
    url: 'https://blokblokstudio.com/call',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [
      {
        url: '/api/og-call',
        width: 1200,
        height: 630,
        alt: 'Free Strategy Call | Blok Blok Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Strategy Call | Blok Blok Studio',
    description: 'Book a free 30-minute strategy call with Blok Blok Studio. We\'ll review your operation and build a custom growth plan.',
    images: ['/api/og-call'],
  },
  alternates: { canonical: '/call' },
};

export default function AuditPage() {
  return <FunnelContent />;
}
