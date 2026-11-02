import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { projectsData } from '@/data/projects';
import { localizeProject } from '@/data/i18n';
import { PROJECT_IMAGES } from '@/data/project-cards';

/**
 * V2Work — editorial grid of every case study, in the order projects.ts
 * lists them (featured first), with the first metric and the result line
 * under each one. The first card runs full width.
 */
export async function V2Work() {
  const t = await getTranslations('home');
  const tp = await getTranslations('projects');
  const locale = await getLocale();
  const CAT_KEY: Record<string, 'cat_web' | 'cat_ecom' | 'cat_brand'> = { 'Web Design': 'cat_web', 'E-Commerce': 'cat_ecom', Branding: 'cat_brand' };
  const slugs = Object.keys(projectsData);
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4 t-eyebrow text-gray-500">
          <h2>{t('v2_work_label')}</h2>
          <Link href="/projects" className="text-gray-400 transition-colors hover:text-white">
            {t('v2_work_link')}
          </Link>
        </div>
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {slugs.map((slug, i) => {
            const p = localizeProject(slug, locale) ?? projectsData[slug];
            const m = p.metrics?.[0];
            const img = PROJECT_IMAGES[slug] ?? p.heroImage;
            const wide = i === 0;
            return (
              <li key={slug} className={wide ? 'md:col-span-2' : ''}>
                <Link href={`/projects/${slug}`} className="group block">
                  <div className={`relative overflow-hidden rounded-2xl bg-gray-950 ${wide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    {img && (
                      <Image
                        src={img}
                        alt={p.title}
                        fill
                        sizes={wide ? '(min-width: 1536px) 1400px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline">
                    <h3 className="t-h3 text-white">{p.title}</h3>
                    <span className="t-eyebrow text-gray-500">
                      {CAT_KEY[p.category] ? tp(CAT_KEY[p.category]) : p.category} · {p.year}
                    </span>
                  </div>
                  {m && (
                    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="t-h2 text-orange-500">{m.value}</span>
                      <span className="t-eyebrow text-gray-500">{m.label}</span>
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
