import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { ThanksContent } from '@/components/ThanksContent';
import { videoTranscript } from '@/data/i18n';

// Google Ads conversion page. Conversion action in Google Ads:
// page view of /start/thanks/google (or the gtag conversion event fired here
// when NEXT_PUBLIC_GOOGLE_ADS_CONVERSION is set).
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('thanks');
  return {
  title: t('meta_title'),
  description: t('meta_description'),
  robots: { index: false, follow: false },
  };
}

export default async function GoThanksGooglePage() {
  const founderTranscript = videoTranscript('founder', await getLocale());
  return <ThanksContent platform="google" founderTranscript={founderTranscript} />;
}
