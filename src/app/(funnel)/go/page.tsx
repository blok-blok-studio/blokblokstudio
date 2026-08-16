import type { Metadata } from 'next';
import { GoContent } from '@/components/GoContent';

// Ad landing page — deliberately excluded from search indexes so paid
// traffic stats stay clean and it never competes with the main site.
export const metadata: Metadata = {
  title: 'Get Your Free Growth Plan | Blok Blok Studio',
  description:
    'Websites, ads, and AI systems that bring in customers on autopilot. Tell us what you need and get a free growth plan for your business.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Get Your Free Growth Plan | Blok Blok Studio',
    description: 'Websites, ads, and AI systems that bring in customers on autopilot.',
    url: 'https://www.blokblokstudio.com/go',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blok Blok Studio' }],
  },
};

export default function GoPage() {
  return <GoContent />;
}
