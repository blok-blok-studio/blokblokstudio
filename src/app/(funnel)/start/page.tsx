import type { Metadata } from 'next';
import { StartContent } from '@/components/StartContent';

export const metadata: Metadata = {
  title: "Let's grab coffee | Blok Blok Studio",
  description:
    "I'm Chase. I run Blok Blok Studio, a Berlin creative agency. Websites, ads, social media, and AI systems. First coffee's on me.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Let's grab coffee | Blok Blok Studio",
    description:
      "I'm Chase. I run Blok Blok Studio, a Berlin creative agency. Websites, ads, social media, and AI systems. First coffee's on me.",
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
    title: "Let's grab coffee | Blok Blok Studio",
    description:
      "Berlin creative agency. Websites, ads, social, AI. First coffee's on me.",
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/start' },
};

export default function StartPage() {
  return <StartContent />;
}
