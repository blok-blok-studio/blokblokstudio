import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { ThanksContent } from '@/components/ThanksContent';
import { videoTranscript } from '@/data/i18n';

// Meta Ads conversion page. Custom conversion rule in Events Manager:
// URL contains /start/thanks/meta (plus the Lead event fired on this page).
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('thanks');
  return {
  title: t('meta_title'),
  description: t('meta_description'),
  robots: { index: false, follow: false },
  };
}

export default async function GoThanksMetaPage() {
  const founderTranscript = videoTranscript('founder', await getLocale());
  return <ThanksContent platform="meta" founderTranscript={founderTranscript} />;
}
