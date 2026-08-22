import type { Metadata } from 'next';
import { VslContent } from '@/components/VslContent';

// VSL page for retargeting ads + follow-up emails: one video, one button.
// noindex like all ad destinations.
export const metadata: Metadata = {
  title: 'Watch: Where Your Business Is Losing Customers | Blok Blok Studio',
  description: 'A 3-minute breakdown of where service businesses leak customers online, and the system that fixes it.',
  robots: { index: false, follow: false },
};

export default function VslPage() {
  return <VslContent />;
}
