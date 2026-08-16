import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BlogListContent } from '@/components/BlogListContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blog');
  const title = t('meta_title');
  const description = t('meta_description');
  return {
    title,
    description,
    alternates: { canonical: '/blog' },
    openGraph: {
      title: `${title} | Blok Blok Studio`,
      description,
      url: 'https://www.blokblokstudio.com/blog',
      siteName: 'Blok Blok Studio',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('og_alt') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Blok Blok Studio`,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function BlogPage() {
  const nav = await getTranslations('nav');
  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: nav('home'), url: '/' },
          { name: nav('blog'), url: '/blog' },
        ]}
      />
      <BlogListContent />
    </div>
  );
}
