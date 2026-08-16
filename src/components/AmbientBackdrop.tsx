/**
 * Site-wide animated backdrop. Lives behind every (main) page as a fixed,
 * pointer-events-none layer composed of:
 *   - Three softly drifting gradient blobs (orange / red / blue), adds depth
 *     and signals "alive" without competing with content
 *   - The body's noise-overlay class still rides on top via globals.css
 *
 * Performance: the blob drift runs as pure CSS keyframes (blob-1/2/3 in
 * globals.css) instead of framer-motion, so it costs zero main-thread JS.
 * No 'use client' needed anymore — this renders on the server.
 * prefers-reduced-motion is respected via the global reduced-motion rules.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Drifting orange blob, top left */}
      <div className="blob-1 absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-orange-500/[0.05] blur-[140px]" />

      {/* Drifting red/pink blob, bottom right */}
      <div className="blob-2 absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-red-500/[0.04] blur-[130px]" />

      {/* Drifting cool-tone blob, center (translate(-50%,-50%) lives in the
          keyframes so the scale doesn't clobber the centering) */}
      <div className="blob-3 absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/[0.025] blur-[120px]" />

      {/* Vignette to keep the page edges from feeling exposed */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
