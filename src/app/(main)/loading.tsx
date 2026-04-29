/**
 * Route loading UI — shown automatically by Next.js during navigation
 * between (main) routes while the next page's JS bundle downloads.
 *
 * Without this file, clicking between tabs leaves the user staring at the
 * previous page until the bundle resolves. With it, they get an instant
 * acknowledgement of the click.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-white/40 border-b-transparent border-l-transparent animate-spin" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Loading</span>
      </div>
    </div>
  );
}
