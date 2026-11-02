import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { StartContent } from '@/components/StartContent';

// The quiz. Every ad click, DM and cold email lands here; the video and the
// case studies live on the thank-you page. noindex like all ad destinations.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('start');
  return {
  title: t('meta_title'),
  description: t('meta_description'),
  robots: { index: false, follow: false },
  };
}

export default function StartPage() {
  return <StartContent />;
}
