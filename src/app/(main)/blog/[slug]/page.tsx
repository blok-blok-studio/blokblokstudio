import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBlogPost, getAllBlogSlugs } from '@/data/blog';
import { BlogPostContent } from '@/components/BlogPostContent';
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
  const title = t(`posts.${post.slug}.title` as 'posts');
  const description = t(`posts.${post.slug}.description` as 'posts');

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${title} | Blok Blok Studio`,
      description,
      url: `https://blokblokstudio.com/blog/${post.slug}`,
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
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const title = t(`posts.${post.slug}.title` as 'posts');
  const description = t(`posts.${post.slug}.description` as 'posts');
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: `https://blokblokstudio.com${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Blok Blok Studio',
      url: 'https://blokblokstudio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blok Blok Studio',
      logo: { '@type': 'ImageObject', url: 'https://blokblokstudio.com/logo.png' },
    },
  };

  return (
    <div className="page-transition">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: title, url: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostContent post={post} />
    </div>
  );
}
