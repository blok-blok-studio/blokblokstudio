import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { AccessibilityContent } from '@/components/AccessibilityContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('accessibility');
  return pageMeta({ title: t('title'), description: t('meta_description'), path: '/accessibility' });
}

export default function AccessibilityPage() {
  return (
    <div className="page-transition">
      <AccessibilityContent />
    </div>
  );
}
