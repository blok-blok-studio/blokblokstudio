'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';

const homeServiceAccents = [
  '#4ade80', // AI Agent Ecosystems — green
  '#60a5fa', // Websites — blue
  '#fb923c', // Google Ads — orange
];

const homeServiceGradients = [
  'from-green-400/40 via-green-500/20 to-transparent',
  'from-blue-400/40 via-cyan-400/20 to-transparent',
  'from-orange-400/40 via-yellow-400/20 to-transparent',
];

/** Which services to show on the homepage (1-indexed service numbers) */
const homeServiceIndices = [1, 6, 8];

export function HomeServices() {
  const t = useTranslations('home');
  const st = useTranslations('services');

  const services = homeServiceIndices.map((num, i) => ({
    title: st(`service_${num}_title` as 'service_1_title'),
    subtitle: st(`service_${num}_subtitle` as 'service_1_title'),
    bullets: Array.from({ length: 3 }, (_, j) =>
      st(`service_${num}_bullet_${j + 1}` as 'service_1_title')
    ),
    accent: homeServiceAccents[i],
    gradient: homeServiceGradients[i],
  }));

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {t('services_heading')}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t('services_subheading')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl sm:rounded-3xl p-[1px] h-full bg-gradient-to-br ${service.gradient} group cursor-pointer`}
              >
                <div className="bg-gray-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                  {/* Accent bar */}
                  <div
                    className="w-10 h-1 rounded-full mb-5"
                    style={{ backgroundColor: service.accent }}
                  />

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold tracking-wide uppercase mb-1.5 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-gray-400 text-xs sm:text-sm italic mb-5">
                    {service.subtitle}
                  </p>

                  {/* Bullets (show first 3 on homepage) */}
                  <ul className="space-y-2">
                    {service.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: service.accent }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
