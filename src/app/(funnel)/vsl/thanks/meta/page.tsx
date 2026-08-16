import type { Metadata } from 'next';
import { ThanksContent } from '@/components/ThanksContent';

// Meta Ads conversion page. Custom conversion rule in Events Manager:
// URL contains /vsl/thanks/meta (plus the Lead event fired on this page).
export const metadata: Metadata = {
  title: 'One More Step | Blok Blok Studio',
  description: 'Book your free 15-minute intro call.',
  robots: { index: false, follow: false },
};

export default function GoThanksMetaPage() {
  return <ThanksContent platform="meta" />;
}
