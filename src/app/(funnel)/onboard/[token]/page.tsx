import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OnboardContent } from '@/components/OnboardContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('onboard');
  return {
  title: t('title'),
  description: t('meta_description'),
  robots: { index: false, follow: false },
  };
}

export default async function OnboardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <OnboardContent token={token} />;
}
