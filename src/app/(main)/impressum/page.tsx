import type { Metadata } from 'next';
import { ImpressumContent } from '@/components/ImpressumContent';

export const metadata: Metadata = {
  title: 'Impressum / Legal Notice',
  description: 'Impressum (legal notice) for Blok Blok Studio LLC pursuant to § 5 DDG.',
  alternates: { canonical: '/impressum' },
};

export default function ImpressumPage() {
  return <ImpressumContent />;
}
