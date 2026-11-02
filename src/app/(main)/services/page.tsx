import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { V2ServicesContent } from '@/components/v2/V2ServicesContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services');
  return {
  title: t('meta_title'),
  description: t('meta_description'),
  alternates: { canonical: '/services' },
  openGraph: {
    title: `${t('meta_title')} | Blok Blok Studio`,
    description: t('meta_description'),
    url: 'https://www.blokblokstudio.com/services',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${t('meta_title')} | Blok Blok Studio` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${t('meta_title')} | Blok Blok Studio`,
    description: t('meta_description'),
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
      <V2ServicesContent />
    </div>
  );
}
