import type { Metadata } from 'next';
import { SpecialtyContent } from '@/components/SpecialtyContent';
import { BreadcrumbSchema } from '@/app/structured-data';
import { specialties } from '@/data/specialties';

const data = specialties['ecommerce-website-design'];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: '/ecommerce-website-design' },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://www.blokblokstudio.com/ecommerce-website-design',
    siteName: 'Blok Blok Studio',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blok Blok Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
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
          { name: 'Home', url: '/' },
          { name: data.h1, url: '/ecommerce-website-design' },
        ]}
      />
      <SpecialtyContent data={data} />
    </div>
  );
}
