import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { DataRightsContent } from '@/components/DataRightsContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('gdpr');
  return pageMeta({ title: t('data_rights_title'), description: t('data_rights_description'), path: '/data-rights' });
}

export default function DataRightsPage() {
  return (
    <div className="page-transition">
      <DataRightsContent />
    </div>
  );
}
