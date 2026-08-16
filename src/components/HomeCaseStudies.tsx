'use client';

import { AnimatedSection } from './AnimatedSection';
import { CaseStudyGrid } from './CaseStudyGrid';

/**
 * Homepage wrapper for the shared 2x2 case-study grid (same grid as
 * /vsl): testimonial videos on top, Bronco + Exotic Ripz results below.
 */
export function HomeCaseStudies() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-10 sm:mb-16">
          <div className="editorial-rule pt-6 sm:pt-8">
            <p className="section-label mb-3">03</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-3 sm:mb-4">
              The work, and the numbers
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl">
              Clients on camera, revenue on record. What working with us actually looks like.
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <CaseStudyGrid />
        </AnimatedSection>
      </div>
    </section>
  );
}
