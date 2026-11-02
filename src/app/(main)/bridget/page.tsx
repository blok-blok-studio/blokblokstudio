import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { V2CardContent } from '@/components/v2/V2CardContent';

// Business-card landing page (QR on Bridget's card, CES 2027). Not indexed:
// it exists for people who scanned the card, not for search.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('card');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: true },
    alternates: { canonical: '/bridget' },
  };
}

export default function BridgetCardPage() {
  return <V2CardContent />;
}
