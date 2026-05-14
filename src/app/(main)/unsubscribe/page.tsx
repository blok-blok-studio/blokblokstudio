import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { UnsubscribeContent } from '@/components/UnsubscribeContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('unsubscribe');
  return {
    title: `${t('meta_title')} | Blok Blok Studio`,
    description: t('meta_description'),
    robots: { index: false, follow: false },
  };
}

export default function UnsubscribePage() {
  return (
    <div className="page-transition">
      <UnsubscribeContent />
    </div>
  );
}
