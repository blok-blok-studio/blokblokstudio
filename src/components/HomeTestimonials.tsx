/**
 * ============================================================================
 * HomeTestimonials.tsx — Client Testimonials Section (Homepage)
 * ============================================================================
 * Editorial redesign: three pull-quotes set in the serif display face,
 * separated by hairlines. Quotes are direct client quotes (same set as
 * StartContent.tsx) — left in their original English.
 *
 * TO EDIT: change the `testimonials` array below. Section heading and
 * subtitle come from "home.testimonials_heading" / "_subtitle" in the
 * locale JSON files.
 * ============================================================================
 */

'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';

const testimonials = [
  {
    quote: 'They built my entire site from scratch and now clients book and pay directly through it. I used to waste hours on DMs and invoices.',
    name: 'Luke Satterly',
    role: 'Personal Trainer, Berlin',
  },
  {
    quote: 'The design matched my energy perfectly. Consultations went up over 200% after launch and the site basically sells for me now.',
    name: 'Kofi',
    role: 'Performance Coach',
  },
  {
    quote: 'Our booster pack drops sell out in hours now. The email capture popup alone grew our list by 400% in the first month.',
    name: 'Exotic Ripz',
    role: 'Trading Card Community',
  },
];

export function HomeTestimonials() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="mb-12 sm:mb-16">
          <div className="editorial-rule pt-6 sm:pt-8">
            <p className="section-label mb-3">04</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight max-w-2xl">
              {t('testimonials_heading')}
            </h2>
          </div>
        </AnimatedSection>

        {/* Pull-quotes: stacked, each opening with a hairline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={testimonial.name} delay={i * 0.08}>
              <figure className="editorial-rule pt-6 h-full flex flex-col">
                <blockquote className="flex-1">
                  <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-light leading-snug text-ink">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-medium text-ink">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{testimonial.role}</p>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
