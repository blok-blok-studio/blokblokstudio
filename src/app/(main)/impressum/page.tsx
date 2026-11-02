import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { ImpressumContent } from '@/components/ImpressumContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('impressum');
  return pageMeta({ title: t('meta_title'), description: t('meta_description'), path: '/impressum' });
}

export default function ImpressumPage() {
  return <ImpressumContent />;
}
