import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HomeHero } from '@/components/HomeHero';

// Above-the-fold components stay synchronous so the hero paints immediately.
// Everything below the fold lazy-loads to keep the initial JS bundle small —
// the user sees the hero in the first frame instead of waiting on hydrate.
const HomeClients = dynamic(() => import('@/components/HomeClients').then((m) => ({ default: m.HomeClients })));
const HomeStats = dynamic(() => import('@/components/HomeStats').then((m) => ({ default: m.HomeStats })));
const HomeServices = dynamic(() => import('@/components/HomeServices').then((m) => ({ default: m.HomeServices })));
const HomeProjects = dynamic(() => import('@/components/HomeProjects').then((m) => ({ default: m.HomeProjects })));
const HomeCaseStudies = dynamic(() => import('@/components/HomeCaseStudies').then((m) => ({ default: m.HomeCaseStudies })));
const HomeTestimonials = dynamic(() => import('@/components/HomeTestimonials').then((m) => ({ default: m.HomeTestimonials })));
const HomeNewsletter = dynamic(() => import('@/components/HomeNewsletter').then((m) => ({ default: m.HomeNewsletter })));
const HomeAuditCTA = dynamic(() => import('@/components/HomeAuditCTA').then((m) => ({ default: m.HomeAuditCTA })));
const HomeFAQ = dynamic(() => import('@/components/HomeFAQ').then((m) => ({ default: m.HomeFAQ })));
const HomeCTA = dynamic(() => import('@/components/HomeCTA').then((m) => ({ default: m.HomeCTA })));

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');
  return {
    // Omit `title` entirely so the root layout's default applies. Setting
    // `title: null` strips the <title> tag instead (Lighthouse flagged this).
    description: t('hero_subtitle'),
    alternates: {
      canonical: '/',
    },
  };
}

export default function HomePage() {
  return (
    <div className="page-transition">
      <HomeHero />
      <HomeClients />
      <HomeStats />
      <HomeServices />
      <HomeProjects />
      <HomeCaseStudies />
      <HomeTestimonials />
      <HomeAuditCTA />
      <HomeNewsletter />
      <HomeFAQ />
      <HomeCTA />
    </div>
  );
}
