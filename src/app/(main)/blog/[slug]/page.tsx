import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getBlogPost, getAllBlogSlugs } from '@/data/blog';
import { V2BlogPost } from '@/components/v2/V2BlogPost';
import { BreadcrumbSchema } from '@/app/structured-data';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };
  const t = await getTranslations('blog');
  const locale = await getLocale();
  const title = t(`posts.${post.slug}.title` as 'posts');
  const description = t(`posts.${post.slug}.description` as 'posts');

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${title} | Blok Blok Studio`,
      description,
      url: `https://www.blokblokstudio.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Blok Blok Studio'],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const nav = await getTranslations('nav');
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const locale = await getLocale();
  const title = t(`posts.${post.slug}.title` as 'posts');
  const description = t(`posts.${post.slug}.description` as 'posts');
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: `https://www.blokblokstudio.com${post.image}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: locale,
    mainEntityOfPage: `https://www.blokblokstudio.com/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Chase Haynes',
      jobTitle: 'Founder',
      url: 'https://www.blokblokstudio.com/team',
    },
    publisher: { '@id': 'https://www.blokblokstudio.com/#organization' },
  };

  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: nav('home'), url: '/' },
          { name: nav('blog'), url: '/blog' },
          { name: title, url: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <V2BlogPost post={post} />
    </div>
  );
}
