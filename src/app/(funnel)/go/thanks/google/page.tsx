import type { Metadata } from 'next';
import { GoThanksContent } from '@/components/GoThanksContent';

// Google Ads conversion page. Conversion action in Google Ads:
// page view of /go/thanks/google (or the gtag conversion event fired here
// when NEXT_PUBLIC_GOOGLE_ADS_CONVERSION is set).
export const metadata: Metadata = {
  title: 'One More Step | Blok Blok Studio',
  description: 'Book your free 15-minute intro call.',
  robots: { index: false, follow: false },
};

export default function GoThanksGooglePage() {
  return <GoThanksContent platform="google" />;
}
