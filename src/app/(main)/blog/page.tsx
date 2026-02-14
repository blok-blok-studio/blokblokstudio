import type { Metadata } from 'next';
import { BlogListContent } from '@/components/BlogListContent';
import { BreadcrumbSchema } from '@/app/structured-data';

export const metadata: Metadata = {
  title: 'Blog — Insights on Web Design, Branding & SEO',
  description:
    'Expert insights on web design, branding, SEO, and digital marketing from Blok Blok Studio. Actionable tips to grow your online presence.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Insights on Web Design, Branding & SEO | Blok Blok Studio',
    description:
      'Expert insights on web design, branding, SEO, and digital marketing from Blok Blok Studio.',
    url: 'https://blokblokstudio.com/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />
      <BlogListContent />
    </div>
  );
}
