'use client';

/**
 * Homepage "Selected Work" — editorial redesign.
 * One large featured project, then a 2x2 grid. Captions sit below the
 * image (magazine style), with a results line where we have real numbers.
 * Lineup and order mirror src/data/projects.ts.
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';

const featuredProjects = [
  {
    title: 'Coach Luki',
    category: 'Web Design',
    year: '2025',
    slug: 'coach-luki',
    image: '/images/projects/coachluki.jpg',
    stat: 'Booking and Stripe payments, built to convert',
  },
  {
    title: 'Bronco Plumbing',
    category: 'Web Design',
    year: '2026',
    slug: 'bronco-plumbing',
    image: '/images/projects/bronco.webp',
    stat: '$50k revenue in the first 5 months',
  },
  {
    title: 'Coach Kofi',
    category: 'Web Design',
    year: '2025',
    slug: 'coach-kofi',
    image: '/images/projects/coachkofi.webp',
    stat: 'Consultation requests up 200%',
  },
  {
    title: 'Exotic Ripz',
    category: 'E-Commerce',
    year: '2025',
    slug: 'exotic-ripz',
    image: '/images/projects/exoticripz.jpg',
    stat: '$191k in sales across 1,790 orders',
  },
  {
    title: 'KDS Systems',
    category: 'Web Design',
    year: '2025',
    slug: 'kds-systems',
    image: '/images/projects/kdssys.webp',
    stat: 'Managed IT, repositioned and relaunched',
  },
];

/* Shared caption block under each project image */
function ProjectCaption({
  project,
  large = false,
}: {
  project: (typeof featuredProjects)[number];
  large?: boolean;
}) {
  return (
    <div className="pt-4 sm:pt-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={`${large ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-light text-ink`}>
          {project.title}
        </h3>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          {project.category} · {project.year}
        </p>
      </div>
      <p className="text-sm text-gray-400 mt-1">{project.stat}</p>
    </div>
  );
}

export function HomeProjects() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header: numbered label, serif heading, plain text link */}
        <AnimatedSection className="mb-10 sm:mb-16">
          <div className="editorial-rule pt-6 sm:pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <p className="section-label mb-3">02</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                {t('projects_heading')}
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm text-ink underline underline-offset-8 decoration-1 decoration-gray-700 hover:decoration-ink transition-colors"
            >
              {t('projects_cta')}
            </Link>
          </div>
        </AnimatedSection>

        {/* Featured project */}
        <AnimatedSection className="mb-12 sm:mb-16">
          <Link href={`/projects/${featuredProjects[0].slug}`} className="group block">
            <div className="aspect-[16/9] relative bg-gray-950 border border-white/10 overflow-hidden">
              <Image
                src={featuredProjects[0].image}
                alt={featuredProjects[0].title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 1280px"
                priority
              />
            </div>
            <ProjectCaption project={featuredProjects[0]} large />
          </Link>
        </AnimatedSection>

        {/* 2x2 grid of remaining projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-16">
          {featuredProjects.slice(1).map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.08}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="aspect-[4/3] relative bg-gray-950 border border-white/10 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                </div>
                <ProjectCaption project={project} />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
