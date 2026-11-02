import { useTranslations } from 'next-intl';
import { VideoTranscript } from './VideoTranscript';

/**
 * The founder video, with its transcript underneath.
 *
 * Lives on the thank-you page rather than the landing page: /start is the
 * quiz and nothing else, so this is the first thing someone sees once they
 * have answered. After a submission its job is to make the booked call feel
 * like a call with a person, which is what keeps no-shows down.
 *
 * NEXT_PUBLIC_FOUNDER_VIDEO_URL overrides the committed file (e.g. to serve
 * from a CDN); an empty string falls back to the poster-style placeholder.
 */
const FOUNDER_VIDEO_URL = process.env.NEXT_PUBLIC_FOUNDER_VIDEO_URL ?? '/videos/founder-v2.mp4';

/** `transcript` arrives localized from the server page (src/data/i18n is server-only). */
export function FounderVideo({ transcript }: { transcript: string }) {
  const t = useTranslations('thanks');
  return (
    <div>
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/50">
        {FOUNDER_VIDEO_URL ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster="/videos/founder-v2-poster.webp"
            className="w-full aspect-video"
          >
            {/* No <track>: this cut has its subtitles burned in from CapCut,
                so a caption track would double them on screen. The transcript
                below still carries the text. */}
            <source src={FOUNDER_VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950/30">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">{t('founder_soon')}</p>
          </div>
        )}
      </div>
      <VideoTranscript transcript={transcript} speaker={t('founder_speaker')} />
      <p className="text-gray-500 text-sm mt-4 text-pretty">
        {t('founder_caption')}
      </p>
    </div>
  );
}
