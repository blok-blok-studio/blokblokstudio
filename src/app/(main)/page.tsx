import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HomeHero } from '@/components/HomeHero';
import { SectionDivider } from '@/components/SectionDivider';

// Above-the-fold components stay synchronous so the hero paints immediately.
// Everything below the fold lazy-loads to keep the initial JS bundle small —
// the user sees the hero in the first frame instead of waiting on hydrate.
const DeviceMockup = dynamic(() => import('@/components/DeviceMockup').then((m) => ({ default: m.DeviceMockup })));
const HomeClients = dynamic(() => import('@/components/HomeClients').then((m) => ({ default: m.HomeClients })));
const HomeStats = dynamic(() => import('@/components/HomeStats').then((m) => ({ default: m.HomeStats })));
const HomeServices = dynamic(() => import('@/components/HomeServices').then((m) => ({ default: m.HomeServices })));
const HomeProjects = dynamic(() => import('@/components/HomeProjects').then((m) => ({ default: m.HomeProjects })));
const HomeTestimonials = dynamic(() => import('@/components/HomeTestimonials').then((m) => ({ default: m.HomeTestimonials })));
const HomeNewsletter = dynamic(() => import('@/components/HomeNewsletter').then((m) => ({ default: m.HomeNewsletter })));
const HomeAuditCTA = dynamic(() => import('@/components/HomeAuditCTA').then((m) => ({ default: m.HomeAuditCTA })));
const HomeFAQ = dynamic(() => import('@/components/HomeFAQ').then((m) => ({ default: m.HomeFAQ })));
const HomeCTA = dynamic(() => import('@/components/HomeCTA').then((m) => ({ default: m.HomeCTA })));

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');
  return {
    // null lets the root layout's default title apply (Berlin / AI keywords)
    title: null,
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
      <DeviceMockup />
      <HomeClients />
      <HomeStats />
      <SectionDivider />
      <HomeServices />
      <SectionDivider />
      <HomeProjects />
      <SectionDivider />
      <HomeTestimonials />
      <HomeAuditCTA />
      <HomeNewsletter />
      <HomeFAQ />
      <HomeCTA />
    </div>
  );
}
