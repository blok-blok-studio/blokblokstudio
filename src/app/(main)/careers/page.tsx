import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { V2CareersContent } from '@/components/v2/V2CareersContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('careers');
  return pageMeta({ title: t('meta_title'), description: t('meta_description'), path: '/careers', absoluteTitle: true });
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
