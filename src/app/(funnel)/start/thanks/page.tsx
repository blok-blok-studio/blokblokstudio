import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { ThanksContent } from '@/components/ThanksContent';
import { videoTranscript } from '@/data/i18n';

// Conversion page for ad campaigns: Meta and Google both track this URL
// as the Lead event. Never index, never link from the main site.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('thanks');
  return {
  title: t('meta_title'),
  description: t('meta_description'),
  robots: { index: false, follow: false },
  };
}

export default async function ThanksPage() {
  const founderTranscript = videoTranscript('founder', await getLocale());
  return <ThanksContent founderTranscript={founderTranscript} />;
}
