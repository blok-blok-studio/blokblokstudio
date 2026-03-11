import type { Metadata } from 'next';
import { OnboardContent } from '@/components/OnboardContent';

export const metadata: Metadata = {
  title: 'Client Onboarding | Blok Blok Studio',
  description: 'Complete your onboarding to get started with Blok Blok Studio.',
  robots: { index: false, follow: false },
};

export default async function OnboardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <OnboardContent token={token} />;
}
