import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { V2Hero } from '@/components/v2/V2Hero';
import { V2Manifesto } from '@/components/v2/V2Manifesto';
import { V2Services } from '@/components/v2/V2Services';
import { V2Work } from '@/components/v2/V2Work';
import { V2Quiz } from '@/components/v2/V2Quiz';
import { V2Proof } from '@/components/v2/V2Proof';
import { V2Clients } from '@/components/v2/V2Clients';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');
  return {
    // Omit `title` entirely so the root layout's default applies. Setting
    // `title: null` strips the <title> tag instead (Lighthouse flagged this).
    description: t('hero_subtitle'),
    alternates: {
      canonical: '/',
    },
  };
}

export default function HomePage() {
  return (
    <div>
      <V2Hero />
      <V2Manifesto />
      <V2Services />
      <V2Quiz />
      <V2Work />
      <V2Proof />
      <V2Clients />
    </div>
  );
}
