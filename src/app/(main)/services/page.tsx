import type { Metadata } from 'next';
import { ServicesContent } from '@/components/ServicesContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export const metadata: Metadata = {
  title: 'Services & Packages | Blok Blok Studio',
  description:
    'AI-powered websites, automations, ads, and social media management. One-time projects, monthly retainers, custom builds, and social management packages.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services & Packages | Blok Blok Studio',
    description:
      'Clear scope, defined deliverables, no surprises. Explore our one-time projects, marketing retainers, social management, and custom build packages.',
    url: 'https://blokblokstudio.com/services',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blok Blok Studio Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Packages | Blok Blok Studio',
    description:
      'Clear scope, defined deliverables, no surprises. Explore our one-time projects, marketing retainers, social management, and custom build packages.',
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
