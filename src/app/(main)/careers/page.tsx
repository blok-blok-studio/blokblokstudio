import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { V2CareersContent } from '@/components/v2/V2CareersContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('careers');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: { canonical: '/careers' },
    openGraph: {
      title: `${t('meta_title')} | Blok Blok Studio`,
      description: t('meta_description'),
      url: 'https://www.blokblokstudio.com/careers',
      siteName: 'Blok Blok Studio',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${t('meta_title')} | Blok Blok Studio` }],
    },
  };
}

export default async function CareersPage() {
  const nav = await getTranslations('nav');
  return (
    <div className="page-transition">
      <BreadcrumbSchema items={[{ name: nav('home'), url: '/' }, { name: nav('v2_careers'), url: '/careers' }]} />
      <V2CareersContent />
    </div>
  );
}
