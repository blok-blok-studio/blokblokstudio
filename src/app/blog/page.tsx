/**
 * ============================================================================
 * /blog — Blog / Insights Page
 * ============================================================================
 *
 * PURPOSE:
 *   Renders the blog listing page with article cards.
 *   Content is managed in the BlogContent component.
 *
 * TO EDIT:
 *   - Page title/description → update generateMetadata below
 *   - Blog posts → edit the blogPosts array in BlogContent.tsx
 *   - Page heading/subtitle → edit "blog.title" / "blog.subtitle" in locale files
 *
 * ============================================================================
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BlogContent } from '@/components/BlogContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blog');
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: '/blog' },
  };
}

export default function BlogPage() {
  return (
    <div className="page-transition">
      <BlogContent />
    </div>
  );
}
