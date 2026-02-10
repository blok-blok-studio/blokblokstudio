/* ==========================================================================
 * HomeServices.tsx — Services Showcase Section (Homepage)
 * ==========================================================================
 *
 * PURPOSE:
 *   Renders the "Our Services" section on the homepage. Displays a heading,
 *   a subheading, and a responsive grid of service cards. Each card shows
 *   an icon, a title, and a short description. Cards animate into view on
 *   scroll and lift up slightly on hover.
 *
 * KEY BEHAVIORS:
 *   - Cards fade/slide in as they enter the viewport (AnimatedSection).
 *   - Each card has a staggered entrance delay (i * 0.15 seconds).
 *   - On hover, cards lift up (-8px) and scale slightly (1.02x).
 *
 * REFERENCED FILES / COMPONENTS:
 *   - ./AnimatedSection              -> Wrapper component that triggers
 *                                       scroll-based fade-in animations.
 *   - Translation namespace "home"   -> Section heading and subheading.
 *                                       Keys: "services_heading",
 *                                       "services_subheading".
 *   - Translation namespace "services" -> Individual service titles and
 *                                         descriptions. Keys:
 *                                         "service_1_title", "service_1_desc",
 *                                         "service_2_title", "service_2_desc",
 *                                         "service_3_title", "service_3_desc".
 *
 * WHERE TO EDIT TEXT / IMAGES:
 *   - To change the heading/subheading -> Edit "home.services_heading" and
 *                                          "home.services_subheading" in your
 *                                          locale JSON files.
 *   - To change service titles/descriptions -> Edit "services.service_N_title"
 *                                              and "services.service_N_desc"
 *                                              in your locale JSON files.
 *   - To change service icons -> Edit the SVG elements in the `serviceIcons`
 *                                  array below. Each is an inline SVG.
 *   - To add a new service card -> (1) Add a new SVG to `serviceIcons`,
 *                                   (2) add a new object to the `services`
 *                                   array inside the component, and
 *                                   (3) add the matching translation keys
 *                                   to your locale JSON files.
 *
 * ========================================================================== */

'use client';

/* --------------------------------------------------------------------------
 * Imports
 * --------------------------------------------------------------------------
 * useTranslations   -> next-intl hook for pulling translated strings.
 * AnimatedSection   -> Custom component that animates children into view
 *                      when they scroll into the viewport. Accepts an
 *                      optional `delay` prop for staggering.
 *                      Defined in: src/components/AnimatedSection.tsx
 * motion            -> Framer Motion for hover animations on the cards.
 * -------------------------------------------------------------------------- */
import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';

/* --------------------------------------------------------------------------
 * Service Icons Array
 * --------------------------------------------------------------------------
 * Contains inline SVG icons, one per service. These are rendered inside
 * each service card's icon container.
 *
 * TO CHANGE AN ICON:
 *   Replace the SVG markup for the corresponding entry. You can use icons
 *   from Heroicons (https://heroicons.com), or paste in any 24x24 SVG.
 *   Keep className="w-8 h-8" for consistent sizing.
 *
 * TO ADD AN ICON:
 *   Append a new <svg> element to this array and reference it by index
 *   in the `services` array inside the component.
 *
 * Current icons:
 *   [0] -> Monitor / Desktop  (represents "Web" services)
 *   [1] -> Paint palette       (represents "Brand" / design services)
 *   [2] -> Smartphone          (represents "App" / mobile services)
 * -------------------------------------------------------------------------- */
const serviceIcons = [
  // Icon 0: Web / Desktop -- a monitor with a stand
  <svg key="web" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  // Icon 1: Brand / Design -- a paint palette
  <svg key="brand" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  // Icon 2: App / Mobile -- a smartphone
  <svg key="app" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
];

export function HomeServices() {
  /* --------------------------------------------------------------------------
   * Translation Hooks
   * --------------------------------------------------------------------------
   * t   -> Pulls from the "home" namespace. Used for the section heading
   *         and subheading (keys: "services_heading", "services_subheading").
   * st  -> Pulls from the "services" namespace. Used for individual service
   *         card titles and descriptions (keys: "service_N_title",
   *         "service_N_desc" where N = 1, 2, 3).
   * -------------------------------------------------------------------------- */
  const t = useTranslations('home');
  const st = useTranslations('services');

  /* --------------------------------------------------------------------------
   * Services Data Array
   * --------------------------------------------------------------------------
   * Each object defines one service card:
   *   title -> Translated service name from the "services" namespace.
   *   desc  -> Translated description from the "services" namespace.
   *   icon  -> The corresponding SVG element from `serviceIcons` above.
   *
   * TO ADD A NEW SERVICE CARD:
   *   1. Add a new SVG to the `serviceIcons` array above.
   *   2. Add a new object here, e.g.:
   *        { title: st('service_4_title'), desc: st('service_4_desc'), icon: serviceIcons[3] }
   *   3. Add "service_4_title" and "service_4_desc" to the "services"
   *      namespace in every locale JSON file.
   *
   * TO REMOVE A SERVICE CARD:
   *   Delete the object from this array (and optionally its icon above).
   * -------------------------------------------------------------------------- */
  const services = [
    { title: st('service_1_title'), desc: st('service_1_desc'), icon: serviceIcons[0] },
    { title: st('service_2_title'), desc: st('service_2_desc'), icon: serviceIcons[1] },
    { title: st('service_3_title'), desc: st('service_3_desc'), icon: serviceIcons[2] },
  ];

  return (
    /* ==================================================================
     * SECTION WRAPPER
     * ==================================================================
     * Full-width section with responsive vertical padding.
     * The max-w-7xl inner div keeps content centered on wide screens.
     * ================================================================== */
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ==============================================================
         * SECTION HEADING & SUBHEADING
         * ==============================================================
         * Wrapped in AnimatedSection so it fades/slides in on scroll.
         * Centered text layout.
         *
         * TO CHANGE HEADING TEXT:
         *   Edit "home.services_heading" in your locale JSON files.
         * TO CHANGE SUBHEADING TEXT:
         *   Edit "home.services_subheading" in your locale JSON files.
         * ============================================================== */}
        <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {t('services_heading')}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('services_subheading')}
          </p>
        </AnimatedSection>

        {/* ==============================================================
         * SERVICE CARDS GRID
         * ==============================================================
         * Responsive grid: 1 column on mobile, 2 on small, 3 on medium+.
         * Each card is wrapped in AnimatedSection with a staggered delay
         * so they appear one after another as you scroll down.
         * ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            /* AnimatedSection delay: each card enters 0.15s after the previous */
            <AnimatedSection key={i} delay={i * 0.15}>
              {/* --------------------------------------------------------
               * INDIVIDUAL SERVICE CARD
               * --------------------------------------------------------
               * Uses the "glass-card" utility class (defined in global CSS)
               * for a frosted-glass look.
               *
               * Hover effect (Framer Motion):
               *   - Lifts up 8px (y: -8)
               *   - Scales to 1.02x
               *
               * The "group" class enables group-hover styles on children
               * (icon color, text color transitions).
               * -------------------------------------------------------- */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full group cursor-pointer"
              >
                {/* Icon container: rounded square with subtle background */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                {/* Service title */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                {/* Service description */}
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {service.desc}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
