import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { PrivacyContent } from '@/components/PrivacyContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy');
  return pageMeta({ title: t('title'), description: t('description'), path: '/privacy' });
}

export default function PrivacyPage() {
  return (
    <div className="page-transition">
      <PrivacyContent />
    </div>
  );
}
