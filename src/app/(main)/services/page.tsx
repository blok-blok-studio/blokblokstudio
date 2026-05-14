import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ServicesContent } from '@/components/ServicesContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services');
  const nav = await getTranslations('nav');
  const title = `${nav('services')} | Blok Blok Studio`;
  const description = t('meta_description');
  return {
    title,
    description,
    alternates: { canonical: '/services' },
    openGraph: {
      title,
      description,
      url: 'https://blokblokstudio.com/services',
      siteName: 'Blok Blok Studio',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('og_alt') }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ServicesPage() {
  const nav = await getTranslations('nav');
  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: nav('home'), url: '/' },
          { name: nav('services'), url: '/services' },
        ]}
      />
      <ServicesContent />
    </div>
  );
}
