import type { Metadata } from 'next';
import { PricingContent } from '@/components/PricingContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export const metadata: Metadata = {
  title: 'Pricing & Packages | Blok Blok Studio',
  description:
    'Transparent pricing for AI-powered websites, automations, ads, and social media management. One-time projects, monthly retainers, custom builds, and social management packages.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing & Packages | Blok Blok Studio',
    description:
      'Clear scope, defined deliverables, no surprises. Explore our one-time projects, marketing retainers, social management, and custom build packages.',
    url: 'https://blokblokstudio.com/pricing',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blok Blok Studio Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Packages | Blok Blok Studio',
    description:
      'Clear scope, defined deliverables, no surprises. Explore our one-time projects, marketing retainers, social management, and custom build packages.',
    images: ['/og-image.jpg'],
  },
};

export default function PricingPage() {
  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Pricing', url: '/pricing' },
        ]}
      />
      <PricingContent />
    </div>
  );
}
