/* ==========================================================================
 * HomeProjects.tsx
 * ==========================================================================
 *
 * Featured Projects Section -- Homepage
 *
 * This component renders a 2-column grid of featured project cards on the
 * homepage. Each card displays a placeholder image (gradient background),
 * project category, year, and title. A "View All Projects" link sends
 * users to the full /projects page.
 *
 * ---- Where text comes from ----
 * All user-facing strings (heading, subheading, CTA label) are pulled from
 * the "home" translation namespace via next-intl. Edit them in:
 *   /messages/en.json  -> "home.projects_heading"
 *   /messages/en.json  -> "home.projects_subheading"
 *   /messages/en.json  -> "home.projects_cta"
 * (and the equivalent keys in every other locale file)
 *
 * ---- How to add / edit projects ----
 * The project data lives in the `featuredProjects` array below.
 * Each entry has: title, category, color (Tailwind gradient), and year.
 * To add a new project, copy an existing object and change the values.
 * To remove one, delete its object from the array.
 *
 * ---- How to replace placeholder images ----
 * Right now each card shows a gradient + grid-pattern + a small image icon
 * as a placeholder. To use a real image:
 *   1. Add an `image` field to each project object (e.g. '/images/project.jpg')
 *   2. Replace the gradient <div> with a Next.js <Image /> component
 *   3. Remove the placeholder icon SVG in the center of the card
 *
 * ---- Animations ----
 * - AnimatedSection: fades/slides each card in on scroll (staggered by index)
 * - motion.div (whileHover): scales the card up slightly (1.02) on hover
 * - The dark overlay (bg-black/0 -> bg-black/40) fades in on hover
 * - The bottom info bar slides up on hover (translate-y-2 -> translate-y-0)
 * - The arrow button fades in on hover (opacity-0 -> opacity-100)
 *
 * ---- Referenced files / components ----
 * - ./AnimatedSection   -- scroll-triggered entrance animation wrapper
 * - framer-motion       -- hover scale animation (motion.div)
 * - next-intl           -- translations (useTranslations)
 * - next/link           -- client-side routing (Link)
 * ========================================================================== */

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';

/* --------------------------------------------------------------------------
 * Featured Projects Data
 * --------------------------------------------------------------------------
 * This is the hardcoded list of projects shown on the homepage.
 *
 * To edit a project: change any field directly in the object.
 * To add a project:  copy one of the objects below and update its values.
 * To remove one:     delete the entire { ... } block (and its comma).
 *
 * Fields:
 *   title    -- project name displayed on the card
 *   category -- short label like "Web Design", "Branding", etc.
 *   color    -- Tailwind CSS gradient classes for the placeholder background
 *               (e.g. 'from-gray-900 to-gray-800')
 *   year     -- year string shown next to the category
 *
 * NOTE: If you want to add real images, add an `image` property here
 * (e.g. image: '/images/zenith.jpg') and update the card JSX below.
 * -------------------------------------------------------------------------- */
const featuredProjects = [
  {
    title: 'Zenith Finance',
    category: 'Web Design',
    color: 'from-gray-900 to-gray-800',
    year: '2025',
  },
  {
    title: 'Aura Wellness',
    category: 'Branding',
    color: 'from-gray-800 to-gray-900',
    year: '2025',
  },
  {
    title: 'NovaTech App',
    category: 'App Development',
    color: 'from-gray-900 to-gray-800',
    year: '2024',
  },
  {
    title: 'Monolith Records',
    category: 'Web Design',
    color: 'from-gray-800 to-gray-900',
    year: '2024',
  },
];

export function HomeProjects() {
  /* Pull translated strings from the "home" namespace.
     Keys used: projects_heading, projects_subheading, projects_cta */
  const t = useTranslations('home');

  return (
    /* ---- Outer section wrapper ----
       Responsive vertical padding (py) and horizontal padding (px).
       Increase/decrease these values to change spacing around the section. */
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      {/* Max-width container -- keeps content centered on wide screens */}
      <div className="max-w-7xl mx-auto">

        {/* ==================================================================
         * Section Header
         * ==================================================================
         * Contains the heading, subheading, and "View All Projects" link.
         * On mobile they stack vertically; on md+ they sit side-by-side.
         * AnimatedSection makes the whole header fade/slide in on scroll.
         * ================================================================== */}
        <AnimatedSection className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            {/* Heading -- edit text in translations: home.projects_heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              {t('projects_heading')}
            </h2>
            {/* Subheading -- edit text in translations: home.projects_subheading */}
            <p className="text-gray-400 text-base sm:text-lg max-w-xl">
              {t('projects_subheading')}
            </p>
          </div>

          {/* "View All Projects" link -- navigates to the /projects page.
              Edit the label in translations: home.projects_cta
              To change the destination, update the href below. */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            {t('projects_cta')}
            {/* Right-arrow icon -- slides right on hover via group-hover */}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </AnimatedSection>

        {/* ==================================================================
         * Projects Grid
         * ==================================================================
         * 1 column on mobile, 2 columns on sm+ screens.
         * Each card is wrapped in AnimatedSection with a staggered delay
         * (i * 0.1s) so cards animate in one after another.
         * ================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {featuredProjects.map((project, i) => (
            /* AnimatedSection -- scroll-triggered entrance, staggered per card */
            <AnimatedSection key={i} delay={i * 0.1}>
              {/* motion.div -- scales up to 1.02x on hover for a subtle "lift" */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer"
              >
                {/* --------------------------------------------------------
                 * Card Image Area (currently a placeholder)
                 * --------------------------------------------------------
                 * The gradient background + grid pattern acts as a stand-in
                 * for a real project screenshot.
                 *
                 * TO REPLACE WITH A REAL IMAGE:
                 *   1. Import Image from 'next/image'
                 *   2. Replace this entire <div className="aspect-[4/3]...">
                 *      block with:
                 *        <div className="aspect-[4/3] relative">
                 *          <Image src={project.image} alt={project.title}
                 *                 fill className="object-cover" />
                 *        </div>
                 *   3. Keep the dark hover overlay div if desired.
                 * -------------------------------------------------------- */}
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative`}
                >
                  {/* Subtle grid-line pattern overlay (decorative) */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                  {/* Centered placeholder icon -- an image-placeholder SVG
                      inside a rounded border box. Remove this when using
                      real images. */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl border border-white/10 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white/20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Dark overlay -- transparent by default, fades to 40%
                      black on hover to darken the image/placeholder */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                </div>

                {/* --------------------------------------------------------
                 * Card Info Overlay (bottom of card)
                 * --------------------------------------------------------
                 * Shows category, year, title, and an arrow button.
                 * Slides up slightly on hover (translate-y-2 -> translate-y-0).
                 * -------------------------------------------------------- */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-end justify-between">
                    <div>
                      {/* Category + year label (e.g. "Web Design -- 2025") */}
                      <p className="text-xs text-gray-400 mb-1">
                        {project.category} &mdash; {project.year}
                      </p>
                      {/* Project title */}
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {project.title}
                      </h3>
                    </div>

                    {/* Arrow button -- hidden by default (opacity-0),
                        fades in on card hover (group-hover:opacity-100).
                        Also scales up slightly on its own hover. */}
                    <motion.div
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Diagonal arrow icon (top-right direction) */}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
