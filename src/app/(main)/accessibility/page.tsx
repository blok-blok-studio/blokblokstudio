import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AccessibilityContent } from '@/components/AccessibilityContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('accessibility');
  return {
  title: t('title'),
  description: t('meta_description'),
  alternates: { canonical: '/accessibility' },
  };
}

export default function AccessibilityPage() {
  return (
    <div className="page-transition">
      <AccessibilityContent />
    </div>
  );
}
