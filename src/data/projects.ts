/**
 * ============================================================================
 * projects.ts — Shared Project Data
 * ============================================================================
 *
 * This file contains all project data used by both:
 *   - /projects page (ProjectsContent.tsx) — filterable grid
 *   - /projects/[slug] page (ProjectDetail.tsx) — individual case study
 *   - /projects/[slug]/page.tsx — static params generation (server-side)
 *
 * This file is NOT marked 'use client' so it can be imported on both
 * the server (generateStaticParams, generateMetadata) and client.
 *
 * TO ADD A NEW PROJECT:
 *   1. Add a new entry to projectsData below
 *   2. Set nextSlug on the previous last project to point to the new one
 *   3. Set nextSlug on the new project to loop back (or null)
 *
 * TO EDIT A PROJECT:
 *   Change any field directly in the object.
 *
 * TO ADD REAL IMAGES:
 *   Set heroImage and gallery items to real paths
 *   (e.g., '/images/projects/zenith-hero.jpg')
 *
 * ============================================================================
 */

export interface ProjectData {
  title: string;
  category: string;
  year: string;
  desc: string;
  challenge: string;
  solution: string;
  results: string;
  heroImage: string | null;
  gallery: (string | null)[];
  nextSlug: string | null;
}

export const projectsData: Record<string, ProjectData> = {
  'zenith-finance': {
    title: 'Zenith Finance',
    category: 'Web Design',
    year: '2025',
    desc: 'A comprehensive fintech platform redesign with focus on user trust and clarity.',
    challenge: 'Zenith Finance needed to rebuild trust with their users after a major platform overhaul. Their existing interface was confusing, leading to high drop-off rates and support tickets.',
    solution: 'We redesigned the entire platform with a focus on clarity, trust signals, and intuitive navigation. Every screen was reimagined with user testing at each stage.',
    results: '45% reduction in support tickets, 60% improvement in task completion rates, and a 3x increase in new account signups within the first quarter.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'aura-wellness',
  },
  'aura-wellness': {
    title: 'Aura Wellness',
    category: 'Branding',
    year: '2025',
    desc: 'Complete brand identity for a luxury wellness brand expanding globally.',
    challenge: 'Aura Wellness was expanding from a local spa into a global wellness brand. They needed an identity that felt premium yet approachable across diverse markets.',
    solution: 'We created a comprehensive brand system including logo, color palette, typography, packaging, and brand guidelines — all designed to translate seamlessly across cultures.',
    results: 'Successful launch in 12 new markets, 200% increase in brand recognition surveys, and features in Vogue, Elle, and Wellness Magazine.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'novatech-app',
  },
  'novatech-app': {
    title: 'NovaTech App',
    category: 'App Development',
    year: '2024',
    desc: 'Cross-platform mobile application for next-gen project management.',
    challenge: 'NovaTech had a powerful backend but their mobile experience was clunky. Users were abandoning the app for simpler competitors despite superior features.',
    solution: 'We rebuilt the app from scratch using a mobile-first approach, streamlining complex workflows into intuitive gestures and progressive disclosure patterns.',
    results: '4.8-star App Store rating, 150k downloads in the first month, and 89% daily active user retention rate.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'monolith-records',
  },
  'monolith-records': {
    title: 'Monolith Records',
    category: 'Web Design',
    year: '2024',
    desc: 'Immersive music label website with audio-reactive visuals.',
    challenge: 'Monolith Records wanted a website that felt like an experience — something that would make visitors feel the music before they even pressed play.',
    solution: 'We built an immersive, audio-reactive website with WebGL visuals, spatial audio previews, and a seamless e-commerce flow for vinyl and merch.',
    results: 'Featured on Awwwards, 400% increase in online merch sales, and 2.5x average session duration compared to the old site.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'apex-athletics',
  },
  'apex-athletics': {
    title: 'Apex Athletics',
    category: 'Branding',
    year: '2024',
    desc: 'Dynamic sports brand identity system with motion design guidelines.',
    challenge: 'Apex Athletics was launching a new line of performance gear and needed a brand identity that conveyed speed, power, and innovation across all touchpoints.',
    solution: 'We designed a dynamic identity system with motion principles baked in — from the logo animation to packaging transitions to social media templates.',
    results: 'Sold out initial product run in 48 hours, secured partnerships with 3 professional athletes, and won a Brand New Notable Award.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'horizon-travel',
  },
  'horizon-travel': {
    title: 'Horizon Travel',
    category: 'Marketing',
    year: '2024',
    desc: 'Multi-channel digital marketing campaign driving 300% booking increase.',
    challenge: 'Horizon Travel was struggling with low online bookings despite having premium travel packages. Their digital marketing was fragmented across channels.',
    solution: 'We unified their marketing strategy across social, search, email, and display — creating a cohesive campaign with compelling visuals and targeted messaging.',
    results: '300% increase in online bookings, 5x return on ad spend, and 180% growth in email subscriber list within 6 months.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'vortex-gaming',
  },
  'vortex-gaming': {
    title: 'Vortex Gaming',
    category: 'Web Design',
    year: '2023',
    desc: 'High-performance esports team website with live stats integration.',
    challenge: 'Vortex Gaming needed a website that matched the energy of competitive esports — fast, data-rich, and visually intense, while still being easy to navigate.',
    solution: 'We built a high-performance site with live match stats, player profiles, real-time tournament brackets, and a merchandise store — all loading in under 2 seconds.',
    results: 'Page load time under 1.5s, 250% increase in merchandise sales, and 500k unique visitors during the championship season.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'luna-cosmetics',
  },
  'luna-cosmetics': {
    title: 'Luna Cosmetics',
    category: 'App Development',
    year: '2023',
    desc: 'AR-powered beauty app with virtual try-on and personalized routines.',
    challenge: 'Luna Cosmetics wanted to bridge the gap between in-store and online shopping by letting customers virtually try products before purchasing.',
    solution: 'We developed an AR-powered app with real-time face mapping, shade-matching AI, and personalized skincare routine recommendations based on skin analysis.',
    results: '2M+ downloads, 35% conversion rate on virtual try-on users (vs 8% industry average), and App of the Day on Apple App Store.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'echo-media',
  },
  'echo-media': {
    title: 'Echo Media',
    category: 'Marketing',
    year: '2023',
    desc: 'Full-scale digital presence overhaul and content strategy execution.',
    challenge: 'Echo Media had great content but no cohesive digital strategy. Their social presence was inconsistent and their website wasn\'t converting visitors into clients.',
    solution: 'We overhauled their entire digital presence — redesigning their website, creating a content calendar, establishing brand voice guidelines, and setting up marketing automation.',
    results: '400% increase in qualified leads, 150% growth in social following, and a 65% improvement in client retention through nurture campaigns.',
    heroImage: null,
    gallery: [null, null, null],
    nextSlug: 'zenith-finance',
  },
};

/**
 * Get all valid project slugs (used by generateStaticParams on the server)
 */
export function getAllProjectSlugs(): string[] {
  return Object.keys(projectsData);
}
