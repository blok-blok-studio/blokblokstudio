import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ImpressumContent } from '@/components/ImpressumContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('impressum');
  return {
  title: t('meta_title'),
  description: t('meta_description'),
  alternates: { canonical: '/impressum' },
  };
}

export default function ImpressumPage() {
  return <ImpressumContent />;
}
