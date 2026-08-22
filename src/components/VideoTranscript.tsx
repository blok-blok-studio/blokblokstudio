import { VIDEO_TRANSCRIPTS } from '@/data/video-transcripts';
import type { SiteVideoKey } from '@/data/videos';

/**
 * Collapsible transcript printed under a video.
 *
 * The JSON-LD carries the same text, but this is the copy that is actually on
 * the page: it is what a visitor who cannot or will not turn the sound on
 * reads, and it is the version an assistant quotes when it summarises the
 * page rather than the markup. Rendered server-side inside <details>, so the
 * text is in the HTML whether or not anyone opens it.
 */
export function VideoTranscript({
  video,
  speaker,
}: {
  video: SiteVideoKey;
  speaker?: string;
}) {
  const paragraphs = VIDEO_TRANSCRIPTS[video].split('\n\n');

  return (
    <details className="group mt-4 rounded-xl border border-white/10 bg-white/[0.02]">
      <summary className="cursor-pointer list-none px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-gray-200">
        <span className="inline-flex items-center gap-2">
          <svg
            className="h-3 w-3 transition-transform group-open:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Read the transcript
        </span>
      </summary>
      <div className="px-4 pb-4 pt-1 text-left">
        {speaker && (
          <p className="mb-3 text-xs text-gray-600">{speaker}</p>
        )}
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-3 text-sm leading-relaxed text-gray-400 last:mb-0 text-pretty">
            {p}
          </p>
        ))}
      </div>
    </details>
  );
}
