import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { V2TeamContent } from '@/components/v2/V2TeamContent';
import { BreadcrumbSchema, TeamSchema } from '@/app/structured-data';
import { MEMBERS } from '@/data/team';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('team');
  return {
    title: t('title'),
    description: t('meta_description'),
    alternates: { canonical: '/team' },
    openGraph: {
      title: `${t('title')} | Blok Blok Studio`,
      description: t('meta_description'),
      url: 'https://www.blokblokstudio.com/team',
      siteName: 'Blok Blok Studio',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${t('title')} | Blok Blok Studio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Blok Blok Studio`,
      description: t('meta_description'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function TeamPage() {
  const tt = await getTranslations('team');
  const nav = await getTranslations('nav');
  return (
    <div className="page-transition">
      <BreadcrumbSchema items={[
        { name: nav('home'), url: '/' },
        { name: nav('team'), url: '/team' },
      ]} />
      <TeamSchema
        members={MEMBERS.map((m) => ({
          name: m.name,
          jobTitle: tt(m.roleKey),
          image: m.photo,
          url: 'https://www.blokblokstudio.com/team',
          sameAs: Object.values(m.socials ?? {}),
        }))}
      />
      <V2TeamContent />
    </div>
  );
}
