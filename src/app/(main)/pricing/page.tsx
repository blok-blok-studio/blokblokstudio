import type { Metadata } from 'next';
import { PricingContent } from '@/components/PricingContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export const metadata: Metadata = {
  title: 'Services & Packages | Blok Blok Studio',
  description:
    'Custom website design and development packages. Defined deliverables, custom-quoted to your scope.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services & Packages | Blok Blok Studio',
    description:
      'Clear scope, defined deliverables. Custom website design and development packages.',
    url: 'https://blokblokstudio.com/services',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blok Blok Studio Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Packages | Blok Blok Studio',
    description:
      'Clear scope, defined deliverables. Custom website design and development packages.',
    images: ['/og-image.jpg'],
  },
};

export default function PricingPage() {
  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <PricingContent />
    </div>
  );
}
