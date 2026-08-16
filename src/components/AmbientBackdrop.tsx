'use client';

import { motion } from 'framer-motion';

/**
 * Site-wide animated backdrop. Lives behind every (main) page as a fixed,
 * pointer-events-none layer composed of:
 *   - Three softly drifting gradient blobs (orange / red / blue), adds depth
 *     and signals "alive" without competing with content
 *   - A faint grid overlay, gives the dark canvas a subtle architectural feel
 *   - The body's noise-overlay class still rides on top via globals.css
 *
 * This is the "backdrop" referenced from the coachluki.com aesthetic, instead
 * of full-bleed photography (which we don't have), we layer atmosphere on
 * the dark canvas to keep the brand feel without going flat.
 *
 * All animation respects prefers-reduced-motion via Framer Motion's defaults.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Drifting orange blob, top left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-orange-500/[0.05] blur-[140px]"
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 60, 0],
          y: [0, 40, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Drifting red/pink blob, bottom right */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-red-500/[0.04] blur-[130px]"
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -50, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Drifting cool-tone blob, center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/[0.025] blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Architectural grid, extremely faint white lines for depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Vignette to keep the page edges from feeling exposed */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
