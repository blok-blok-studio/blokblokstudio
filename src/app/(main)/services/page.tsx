import type { Metadata } from 'next';
import { ServicesContent } from '@/components/ServicesContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export const metadata: Metadata = {
  title: 'Services | Blok Blok Studio',
  description:
    'Custom website design and development. Defined deliverables, custom-quoted to your scope.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | Blok Blok Studio',
    description:
      'Custom website design and development. Defined deliverables, custom-quoted to your scope.',
    url: 'https://www.blokblokstudio.com/services',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blok Blok Studio Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Blok Blok Studio',
    description:
      'Custom website design and development. Defined deliverables, custom-quoted to your scope.',
    images: ['/og-image.jpg'],
  },
};

export default function ServicesPage() {
  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <ServicesContent />
    </div>
  );
}
