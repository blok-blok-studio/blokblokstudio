import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { projectsData } from '@/data/projects';

/**
 * V2Work — editorial grid of the five featured projects with the result
 * line under each one. Images come from the existing project data.
 */
const FEATURED = [
  { slug: 'coach-luki', image: '/images/projects/coachluki.jpg', key: 'v2_result_coach_luki' },
  { slug: 'bronco-plumbing', image: '/images/projects/bronco.webp', key: 'v2_result_bronco_plumbing' },
  { slug: 'coach-kofi', image: '/images/projects/coachkofi.webp', key: 'v2_result_coach_kofi' },
  { slug: 'exotic-ripz', image: '/images/projects/exoticripz.jpg', key: 'v2_result_exotic_ripz' },
  { slug: 'kds-systems', image: '/images/projects/kdssys.webp', key: 'v2_result_kds_systems' },
] as const;

export async function V2Work() {
  const t = await getTranslations('home');
  const tp = await getTranslations('projects');
  const CAT_KEY: Record<string, 'cat_web' | 'cat_ecom' | 'cat_brand'> = { 'Web Design': 'cat_web', 'E-Commerce': 'cat_ecom', Branding: 'cat_brand' };
  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <span>{t('v2_work_label')}</span>
          <Link href="/projects" className="text-gray-400 transition-colors hover:text-white">
            {t('v2_work_link')}
          </Link>
        </div>
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {FEATURED.map((f, i) => {
            const p = projectsData[f.slug];
            const wide = i === 0;
            return (
              <li key={f.slug} className={wide ? 'md:col-span-2' : ''}>
                <Link href={`/projects/${f.slug}`} className="group block">
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gray-950 ${
                      wide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <Image
                      src={f.image}
                      alt={p.title}
                      fill
                      sizes={wide ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      priority={wide}
                    />
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {p.title}
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                      {CAT_KEY[p.category] ? tp(CAT_KEY[p.category]) : p.category} · {p.year}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">{t(f.key)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
