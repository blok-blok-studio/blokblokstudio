import type { Metadata } from 'next';
import { StartContent } from '@/components/StartContent';

export const metadata: Metadata = {
  title: 'Start Here | Blok Blok Studio',
  description:
    'See what Blok Blok Studio builds — real projects, real results. Book a free strategy call today.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Start Here | Blok Blok Studio',
    description:
      'See what Blok Blok Studio builds — real projects, real results. Book a free strategy call today.',
    url: 'https://blokblokstudio.com/start',
    siteName: 'Blok Blok Studio',
    type: 'website',
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
    title: 'Start Here | Blok Blok Studio',
    description:
      'See what Blok Blok Studio builds — real projects, real results.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/start' },
};

export default function StartPage() {
  return <StartContent />;
}
