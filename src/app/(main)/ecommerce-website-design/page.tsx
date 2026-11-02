import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { SpecialtyContent } from '@/components/SpecialtyContent';
import { BreadcrumbSchema } from '@/app/structured-data';
import { localizeSpecialty } from '@/data/i18n';
import type { SpecialtyData } from '@/data/specialties';

const SLUG = 'ecommerce-website-design';

async function pageData(): Promise<SpecialtyData> {
  return localizeSpecialty(SLUG, await getLocale()) as SpecialtyData;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await pageData();
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/${SLUG}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://www.blokblokstudio.com/${SLUG}`,
      siteName: 'Blok Blok Studio',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: data.metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function Page() {
  const nav = await getTranslations('nav');
  const data = await pageData();
  // FAQPage structured data: makes the FAQ eligible for rich results and
  // gives AI search engines a clean Q&A block to quote.
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="page-transition">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: nav('home'), url: '/' },
          { name: data.h1, url: `/${SLUG}` },
        ]}
      />
      <SpecialtyContent data={data} />
    </div>
  );
}
