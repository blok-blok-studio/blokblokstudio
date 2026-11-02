import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getTranslations } from 'next-intl/server';
import { V2CardContent } from '@/components/v2/V2CardContent';

// Business-card landing page (QR on Bridget's card, CES 2027). Not indexed:
// it exists for people who scanned the card, not for search.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('card');
  return pageMeta({ title: t('meta_title'), description: t('meta_description'), path: '/bridget', robots: { index: false, follow: true } });
}

export default function BridgetCardPage() {
  return <V2CardContent />;
}
