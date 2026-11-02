import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { CookieContent } from '@/components/CookieContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cookies');
  return pageMeta({ title: t('title'), description: t('description'), path: '/cookies' });
}

export default function CookiesPage() {
  return (
    <div className="page-transition">
      <CookieContent />
    </div>
  );
}
