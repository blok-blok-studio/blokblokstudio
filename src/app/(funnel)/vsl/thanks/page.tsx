import type { Metadata } from 'next';
import { ThanksContent } from '@/components/ThanksContent';

// Conversion page for ad campaigns: Meta and Google both track this URL
// as the Lead event. Never index, never link from the main site.
export const metadata: Metadata = {
  title: 'One More Step | Blok Blok Studio',
  description: 'Book your free 15-minute intro call.',
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return <ThanksContent />;
}
