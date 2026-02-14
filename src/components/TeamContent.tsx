/**
 * ============================================================================
 * TeamContent.tsx — Full /team Page Component
 * ============================================================================
 *
 * PURPOSE:
 *   Renders the entire Team page, including:
 *     1. A page header (title + subtitle)
 *     2. A responsive grid of team member cards
 *     3. Each card shows an avatar placeholder (initials), name, role,
 *        and hover-reveal social media links
 *
 * TEAM MEMBER DATA:
 *   All member data is hardcoded in the `teamMembers` array below.
 *   Each member has: name, roleKey (translation key), and initials.
 *
 * TRANSLATIONS:
 *   Text comes from the "team" namespace in your translation JSON files
 *   (e.g., messages/en.json under "team").
 *   Keys used:
 *     - team.title          → page heading
 *     - team.subtitle       → page subheading
 *     - team.role_ceo       → role label for CEO/Founder
 *     - team.role_creative  → role label for Creative Director
 *     - team.role_tech      → role label for Tech Lead
 *     - team.role_design    → role label for Lead Designer
 *     - team.role_marketing → role label for Marketing Lead
 *     - team.role_dev       → role label for Senior Developer
 *
 * TO EDIT TEXT:
 *   - Page title/subtitle → edit "team.title" / "team.subtitle" in translation files
 *   - Role labels → edit "team.role_*" keys in translation files
 *   - Member names → edit the `teamMembers` array below (names are hardcoded)
 *
 * TO ADD / REMOVE TEAM MEMBERS:
 *   Modify the `teamMembers` array below. Each entry needs:
 *     - name:    Display name (string)
 *     - roleKey: Translation key for the role (must exist in "team" namespace)
 *     - initials: 2-letter initials shown in the avatar placeholder
 *
 * TO REPLACE AVATAR PLACEHOLDERS WITH REAL PHOTOS:
 *   The avatar area currently shows a circle with initials on a gradient
 *   background. To use real photos, replace the initials circle with an
 *   <Image> component. See the inline comment in the avatar section below.
 *
 * SOCIAL LINKS:
 *   Currently all social links point to "#" (no real URLs). To add real
 *   URLs, you could extend the teamMembers array to include social link
 *   objects, then map over them instead of the hardcoded ['Twitter',
 *   'LinkedIn', 'Dribbble'] array. See the inline comment in the social
 *   links section.
 *
 * REFERENCED FILES / DEPENDENCIES:
 *   - ./AnimatedSection   → scroll-triggered reveal animation wrapper
 *   - next-intl           → i18n translation hook (useTranslations)
 *   - framer-motion       → animation library (motion.div for hover effects)
 *
 * STYLING:
 *   - Uses Tailwind CSS utility classes throughout.
 *   - "glass-card" is a custom utility class for the frosted-glass card look.
 *   - Responsive breakpoints: sm (640px), md (768px), lg (1024px).
 *   - Grid: 2 cols on mobile, 2 on sm, 3 on lg.
 *
 * ============================================================================
 */

'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';

/**
 * ---------------------------------------------------------------------------
 * Team Members Data Array (Hardcoded)
 * ---------------------------------------------------------------------------
 * Each member object contains:
 *   - name:     The member's display name (hardcoded string, not translated)
 *   - roleKey:  A translation key from the "team" namespace for the role title.
 *               Uses `as const` for TypeScript type narrowing with useTranslations.
 *   - initials: 2-character string shown in the avatar placeholder circle.
 *
 * TO ADD A NEW MEMBER:
 *   1. Add a new object to this array.
 *   2. Add a matching "team.role_xxx" key in your translation files.
 *
 * TO EDIT A MEMBER:
 *   Change the name, roleKey, or initials directly in this array.
 *
 * TO REMOVE A MEMBER:
 *   Delete the entire object from the array.
 * ---------------------------------------------------------------------------
 */
const teamMembers = [
  { name: 'Chase Haynes', roleKey: 'role_founder' as const, initials: 'CH' },
  { name: 'Kyle Talley', roleKey: 'role_graphic' as const, initials: 'KT' },
  { name: 'Stephen Darling', roleKey: 'role_web' as const, initials: 'SD' },
];

/**
 * ---------------------------------------------------------------------------
 * TeamContent Component
 * ---------------------------------------------------------------------------
 * Main export. Renders the full /team page layout with a grid of member cards.
 * ---------------------------------------------------------------------------
 */
export function TeamContent() {
  /**
   * Translation hook — pulls all keys from the "team" namespace.
   * To change any displayed text, edit your translation JSON files
   * (e.g., messages/en.json → "team": { ... }).
   */
  const t = useTranslations('team');

  return (
    /**
     * Outer section wrapper.
     * - pt-24 / sm:pt-32 → top padding (room for the fixed navbar)
     * - pb-16 / sm:pb-24 → bottom padding
     * - px-5 / sm:px-6 / lg:px-8 → horizontal padding
     */
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
      {/* Max-width container — keeps content centered on wide screens */}
      <div className="max-w-7xl mx-auto">

        {/* ================================================================
            SECTION 1: Page Header (Title + Subtitle)
            ================================================================
            TO EDIT: Change "team.title" and "team.subtitle" in
            your translation files.
        */}
        <AnimatedSection className="text-center mb-14 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* ================================================================
            SECTION 2: Team Members Grid
            ================================================================
            Responsive grid: 2 columns on mobile/sm, 3 columns on lg.
            Each card has a staggered entrance animation (delay = i * 0.1s).
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {teamMembers.map((member, i) => (
            /* AnimatedSection wraps each card for scroll-triggered reveal */
            <AnimatedSection key={i} delay={i * 0.1}>
              {/*
                motion.div adds a hover animation:
                  - y: -8 → lifts the card up 8px on hover
                The "group" class enables group-hover styles on child elements.
              */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden">

                  {/* --------------------------------------------------------
                      AVATAR / PHOTO AREA
                      --------------------------------------------------------
                      3:4 aspect ratio area with a gradient background.
                      Currently shows initials in a circle as a placeholder.

                      TO REPLACE WITH REAL PHOTOS:
                        Replace the initials circle div with:
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        And add a `photo` field to each member in the
                        teamMembers array above. Import Image from next/image.
                  */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                    {/* Subtle grid pattern overlay for visual texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

                    {/* Centered initials avatar circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:scale-110 transition-all duration-500">
                        {/* Member initials (e.g., "AM" for Alex Morgan) */}
                        <span className="text-xl sm:text-2xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                          {member.initials}
                        </span>
                      </div>
                    </div>

                    {/* --------------------------------------------------------
                        HOVER OVERLAY: Social Media Links
                        --------------------------------------------------------
                        A dark overlay that fades in on card hover, with social
                        link buttons sliding up from the bottom.

                        CURRENT STATE:
                          - All links point to "#" (no real URLs).
                          - Shows first letter of each platform as the button content.

                        TO ADD REAL SOCIAL LINKS:
                          1. Extend teamMembers to include social URLs:
                             { name: '...', ..., socials: {
                               twitter: 'https://twitter.com/...',
                               linkedin: 'https://linkedin.com/in/...',
                               dribbble: 'https://dribbble.com/...',
                             }}
                          2. Replace the hardcoded ['Twitter', 'LinkedIn', 'Dribbble']
                             array with Object.entries(member.socials) and use the
                             URLs as href values.
                    */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end justify-center pb-6">
                      {/*
                        Social buttons row.
                        - opacity-0 → hidden by default
                        - group-hover:opacity-100 → visible on card hover
                        - translate-y-4 → starts shifted down
                        - group-hover:translate-y-0 → slides up on hover
                      */}
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {['Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
                          <a
                            key={social}
                            href="#"
                            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            {/* Shows first letter of platform name (T, L, D) */}
                            <span className="text-xs">{social[0]}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* --------------------------------------------------------
                      MEMBER INFO: Name + Role
                      --------------------------------------------------------
                      Displayed below the avatar area.
                      - Name: hardcoded in teamMembers array
                      - Role: pulled from translations via member.roleKey
                  */}
                  <div className="p-3 sm:p-6 text-center">
                    {/* Member name (hardcoded, not translated) */}
                    <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1">{member.name}</h3>
                    {/* Role title from translation key (e.g., "team.role_ceo") */}
                    <p className="text-xs sm:text-sm text-gray-500">{t(member.roleKey)}</p>
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
