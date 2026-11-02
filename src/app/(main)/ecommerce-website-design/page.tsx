import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { getLocale, getTranslations } from 'next-intl/server';
import { SpecialtyContent } from '@/components/SpecialtyContent';
import { BreadcrumbSchema, SpecialtyServiceSchema } from '@/app/structured-data';
import { localizeSpecialty } from '@/data/i18n';
import type { SpecialtyData } from '@/data/specialties';

const SLUG = 'ecommerce-website-design';

async function pageData(): Promise<SpecialtyData> {
  return localizeSpecialty(SLUG, await getLocale()) as SpecialtyData;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await pageData();
  return pageMeta({ title: data.metaTitle, description: data.metaDescription, path: `/${SLUG}`, absoluteTitle: true });
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
      <SpecialtyServiceSchema name={data.h1} description={data.metaDescription} url={`https://www.blokblokstudio.com/${SLUG}`} areaServed="Worldwide" />
      <SpecialtyContent data={data} />
    </div>
  );
}
