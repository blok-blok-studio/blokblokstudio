import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Blok Blok Studio`,
      description: post.description,
      url: `https://blokblokstudio.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Blok Blok Studio'],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
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
          { name: post.title, url: `/blog/${post.slug}` },
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
