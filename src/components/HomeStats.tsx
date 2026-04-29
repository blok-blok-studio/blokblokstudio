'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

/**
 * Animated counters that tick up to their target values when scrolled into
 * view. Adds a "we have receipts" moment to the homepage between the hero
 * and the services list.
 */

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 15, suffix: '+', label: 'Projects shipped' },
  { value: 11, suffix: '', label: 'Brands served' },
  { value: 6, suffix: '+', label: 'Industries' },
  { value: 100, suffix: '%', label: 'Custom, no templates' },
];

export function HomeStats() {
  return (
    <section className="py-12 sm:py-16 px-5 sm:px-6 lg:px-8 border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.08}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-1.5 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
