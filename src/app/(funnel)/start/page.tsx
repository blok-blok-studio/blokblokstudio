import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { StartContent } from '@/components/StartContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('start');
  const title = t('meta_title');
  const description = t('meta_description');
  const twitterDescription = t('meta_twitter_description');

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
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
      title,
      description: twitterDescription,
      images: ['/og-image.jpg'],
    },
    alternates: { canonical: '/start' },
  };
}

export default function StartPage() {
  return <StartContent />;
}
