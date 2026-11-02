import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { UnsubscribeContent } from '@/components/UnsubscribeContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('unsubscribe');
  return pageMeta({ title: t('meta_title'), description: t('meta_description'), path: '/unsubscribe', robots: { index: false, follow: false } });
}

export default function UnsubscribePage() {
  return (
    <div className="page-transition">
      <UnsubscribeContent />
    </div>
  );
}
