import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { TermsContent } from '@/components/TermsContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('terms');
  return pageMeta({ title: t('title'), description: t('description'), path: '/terms' });
}

export default function TermsPage() {
  return (
    <div className="page-transition">
      <TermsContent />
    </div>
  );
}
