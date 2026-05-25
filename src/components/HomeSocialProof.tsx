'use client';

import { AnimatedSection } from './AnimatedSection';
import Link from 'next/link';

export function HomeSocialProof() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-white">
            We built Coach Luki&apos;s site from scratch. He&apos;s a Berlin personal trainer now booking clients directly through his website with zero friction.
          </p>
          <Link
            href="/projects/coach-luki"
            className="inline-block mt-6 text-sm text-gray-400 hover:text-white transition-colors"
          >
            See the project →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
