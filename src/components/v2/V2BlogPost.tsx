import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { BlogPost } from '@/data/blog';
import { localizeBlogPost } from '@/data/i18n';
import { MarkdownRenderer } from '@/components/Markdown';
import { V2NextSteps } from './V2NextSteps';

/** V2BlogPost — article page in the redesign system. */
export async function V2BlogPost({ post: base }: { post: BlogPost }) {
  const t = await getTranslations('blog');
  const locale = await getLocale();
  const post = localizeBlogPost(base.slug, locale) ?? base;
  const title = t(`posts.${post.slug}.title` as 'posts');
  const description = t(`posts.${post.slug}.description` as 'posts');
  const category = t(`posts.${post.slug}.category` as 'posts');
  const readTime = t('read_time', { minutes: parseInt(post.readTime, 10) || 5 });
  const date = new Date(post.date).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <section className="px-5 pt-32 pb-14 sm:px-8 sm:pt-40 sm:pb-16 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white">
            <span aria-hidden="true">←</span> {t('back_to_blog')}
          </Link>
          <p className="mt-10 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-gray-500">
            <span className="text-orange-500">{category}</span>
            <time dateTime={post.date}>{date}</time>
            <span>{readTime}</span>
          </p>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-gray-400">{description}</p>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="relative mx-auto aspect-[21/9] max-w-[1600px] overflow-hidden rounded-3xl bg-gray-950">
          <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <article className="mx-auto max-w-3xl text-base sm:text-lg">
          <MarkdownRenderer content={post.content} />
        </article>
      </section>

      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
            <div>
              <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{t('cta_title')}</p>
              <p className="mt-2 max-w-md text-sm text-gray-400">{t('cta_subtitle')}</p>
            </div>
            <Link
              href="/quiz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400"
            >
              {t('cta_button')} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <V2NextSteps compact />
        </div>
      </section>
    </>
  );
}
