'use client';

import type { BlogPost } from '@/data/blog';
import { AnimatedSection } from './AnimatedSection';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const LINK_CLASS =
  'text-orange-500 underline underline-offset-2 hover:text-orange-400 break-words';

// Renders [text](url), **bold**, and bare http(s) URLs inside a line of text.
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const pattern =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(
        <a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <strong key={key++} className="text-white">
          {match[3]}
        </strong>
      );
    } else {
      // Bare URL: keep trailing punctuation out of the link target
      const raw = match[4];
      const trimmed = raw.replace(/[.,;:]+$/, '');
      parts.push(
        <a key={key++} href={trimmed} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {trimmed}
        </a>
      );
      if (trimmed.length < raw.length) parts.push(raw.slice(trimmed.length));
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl sm:text-3xl font-bold mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl sm:text-2xl font-semibold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('- **')) {
      // List item with bold start
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="flex items-start gap-3 text-gray-400 leading-relaxed">
            <span className="text-white/40 mt-1">&bull;</span>
            <span><strong className="text-white">{match[1]}</strong>{renderInline(match[2])}</span>
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="flex items-start gap-3 text-gray-400 leading-relaxed">
          <span className="text-white/40 mt-1">&bull;</span>
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      // Inline bold-prefix pattern (e.g., "**Lead-in:** rest of line")
      const m = line.match(/^\*\*([^*]+):\*\*(.*)$/);
      if (m) {
        elements.push(
          <p key={i} className="text-gray-400 leading-relaxed mb-4">
            <strong className="text-white">{m[1]}: </strong>
            {renderInline(m[2].trim())}
          </p>
        );
      } else {
        elements.push(
          <p key={i} className="text-white font-semibold mt-4 mb-2">
            {line.slice(2, -2)}
          </p>
        );
      }
    } else if (line.startsWith('**')) {
      // Bold paragraph
      const cleaned = line.replace(/\*\*/g, '');
      elements.push(
        <p key={i} className="text-gray-400 leading-relaxed mb-4">
          <strong className="text-white">{cleaned}</strong>
        </p>
      );
    } else if (line.trim() === '') {
      // Skip empty lines
    } else {
      elements.push(
        <p key={i} className="text-gray-400 leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
    }

    i++;
  }

  return <div className="space-y-0">{elements}</div>;
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const t = useTranslations('blog');
  const locale = useLocale();
  const title = t(`posts.${post.slug}.title` as 'posts');
  const description = t(`posts.${post.slug}.description` as 'posts');
  const category = t(`posts.${post.slug}.category` as 'posts');
  const readTimeMinutes = parseInt(post.readTime, 10) || 5;
  const readTime = t('read_time', { minutes: readTimeMinutes });

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <AnimatedSection>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {t('back_to_blog')}
          </Link>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-300">
              {category}
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span>&middot;</span>
            <span>{readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            {title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            {description}
          </p>
        </AnimatedSection>

        {/* Featured gradient cover */}
        <AnimatedSection delay={0.1} className="mb-10 sm:mb-14">
          <div className={`aspect-[16/9] relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${post.gradient}`}>
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Floating decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-12 left-12 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
            {/* Category icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl sm:text-9xl opacity-20">{post.icon}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Article Content */}
        <AnimatedSection delay={0.15}>
          <article className="prose-custom">
            <MarkdownRenderer content={post.content} />
          </article>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="mt-14 sm:mt-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              {t('cta_title')}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-md mx-auto">
              {t('cta_subtitle')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              {t('cta_button')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
