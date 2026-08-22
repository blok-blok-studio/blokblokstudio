import type { Metadata } from 'next';
import { StartContent } from '@/components/StartContent';

// The quiz. Every ad click, DM and cold email lands here; the video and the
// case studies live on the thank-you page. noindex like all ad destinations.
export const metadata: Metadata = {
  title: 'Where Your Business Is Losing Customers | Blok Blok Studio',
  description: 'Five quick questions about your business, then book a call. We\'ll show you what we\'d fix first.',
  robots: { index: false, follow: false },
};

export default function StartPage() {
  return <StartContent />;
}
