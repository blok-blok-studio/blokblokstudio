import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { PricingContent } from '@/components/PricingContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pricing');
  return pageMeta({ title: t('meta_title'), description: t('meta_description'), path: '/pricing', robots: { index: false, follow: true } });
}

export default async function PricingPage() {
  const nav = await getTranslations('nav');
  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: nav('home'), url: '/' },
          { name: nav('services'), url: '/services' },
        ]}
      />
      <PricingContent />
    </div>
  );
}
