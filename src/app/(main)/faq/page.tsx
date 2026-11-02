import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FAQContent } from '@/components/FAQContent';
import { BreadcrumbSchema, FAQSchema } from '@/app/structured-data';
import { visibleFaqs } from '@/lib/faq-filter';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('faq');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: { canonical: '/faq' },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: 'https://www.blokblokstudio.com/faq',
      siteName: 'Blok Blok Studio',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('meta_title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function FAQPage() {
  const nav = await getTranslations('nav');
  const t = await getTranslations('faq');
  const items = (t.raw('items') as FAQItem[]) || [];

  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: nav('home'), url: '/' },
          { name: nav('faq'), url: '/faq' },
        ]}
      />
      <FAQSchema
        faqs={visibleFaqs(items).map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <FAQContent />
    </div>
  );
}
