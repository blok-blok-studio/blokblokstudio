import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ThanksContent } from '@/components/ThanksContent';
import { videoTranscript } from '@/data/i18n';

// Meta Ads conversion page. Custom conversion rule in Events Manager:
// URL contains /start/thanks/meta (plus the Lead event fired on this page).
export const metadata: Metadata = {
  title: 'One More Step | Blok Blok Studio',
  description: 'Book your free 15-minute intro call.',
  robots: { index: false, follow: false },
};

export default async function GoThanksMetaPage() {
  const founderTranscript = videoTranscript('founder', await getLocale());
  return <ThanksContent platform="meta" founderTranscript={founderTranscript} />;
}
