import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ThanksContent } from '@/components/ThanksContent';
import { videoTranscript } from '@/data/i18n';

// Google Ads conversion page. Conversion action in Google Ads:
// page view of /start/thanks/google (or the gtag conversion event fired here
// when NEXT_PUBLIC_GOOGLE_ADS_CONVERSION is set).
export const metadata: Metadata = {
  title: 'One More Step | Blok Blok Studio',
  description: 'Book your free 15-minute intro call.',
  robots: { index: false, follow: false },
};

export default async function GoThanksGooglePage() {
  const founderTranscript = videoTranscript('founder', await getLocale());
  return <ThanksContent platform="google" founderTranscript={founderTranscript} />;
}
