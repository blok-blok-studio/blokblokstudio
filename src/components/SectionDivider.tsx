'use client';

import { motion } from 'framer-motion';

/**
 * Thin horizontal divider with a slow shimmering highlight that sweeps across
 * its length. Drop between page sections to break up the canvas with motion
 * without needing a heavy graphic.
 */
export function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative h-px bg-white/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      </div>
    </div>
  );
}
