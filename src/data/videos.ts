/**
 * Every video the site serves, in one place.
 *
 * Search engines and AI crawlers cannot watch a video. Without markup, an
 * <video> tag is a dead end to them: they see a file they will not download
 * and learn nothing from it. This is the text they read instead, and it feeds
 * three things at once — VideoObject JSON-LD (see app/structured-data.tsx),
 * the video entries in sitemap.xml, and the Videos section of /llms.txt.
 *
 * Durations are ISO 8601 and must match the encoded file. `uploadDate` is the
 * date the current cut was published, not the date it was filmed.
 *
 * When a video is re-cut it gets a new filename (/videos/* carries a 30 day
 * cache-control, so reusing one strands people on the old version) — update
 * `src`, `poster`, `duration` and `uploadDate` together.
 */

export interface SiteVideo {
  /** Stable key, also used as the JSON-LD @id fragment. */
  id: string;
  name: string;
  /** Plain-language summary. This is what an LLM quotes when asked about the video. */
  description: string;
  src: string;
  poster: string;
  /** WebVTT caption track sitting beside the mp4. */
  captions: string;
  /** ISO 8601, e.g. PT2M15S — what schema.org VideoObject wants. */
  duration: string;
  /** Same length in whole seconds — what a video sitemap wants instead. */
  seconds: number;
  /** YYYY-MM-DD */
  uploadDate: string;
  /** Absolute path of the indexed page this video lives on, for sitemap + @id. */
  page: string;
}

const BASE = 'https://www.blokblokstudio.com';

export const SITE_VIDEOS = {
  pitch: {
    id: 'pitch',
    name: 'What happens on a Blok Blok Studio strategy call',
    description:
      'Chase Haynes, founder of Blok Blok Studio, explains what the free 30-minute strategy call covers: a review of your website, ads, and follow-up, and a plan for the fastest wins. Filmed to camera.',
    src: '/videos/pitch-v2.mp4',
    poster: '/videos/pitch-v2-poster.webp',
    captions: '/videos/pitch-v2.en.vtt',
    duration: 'PT58S',
    seconds: 58,
    uploadDate: '2026-08-22',
    page: '/call',
  },
  kofi: {
    id: 'kofi',
    name: 'Coach Kofi on working with Blok Blok Studio',
    description:
      'Video testimonial from Coach Kofi, a Nike athlete and personal trainer in Berlin, filmed at his gym. Blok Blok Studio built coachkofi.de; consultation requests rose 200% after launch.',
    src: '/videos/testimonial-kofi-v2.mp4',
    poster: '/videos/testimonial-kofi-v2-poster.webp',
    captions: '/videos/testimonial-kofi-v2.en.vtt',
    duration: 'PT46S',
    seconds: 46,
    uploadDate: '2026-08-22',
    page: '/projects/coach-kofi',
  },
  luki: {
    id: 'luki',
    name: 'Coach Luki on working with Blok Blok Studio',
    description:
      'Video testimonial from Coach Luki, a personal trainer in Berlin. Blok Blok Studio built coachluki.com, which takes his bookings and payments directly on the site instead of through DMs and manual invoices.',
    src: '/videos/testimonial-luki-v2.mp4',
    poster: '/videos/testimonial-luki-v2-poster.webp',
    captions: '/videos/testimonial-luki-v2.en.vtt',
    duration: 'PT2M15S',
    seconds: 135,
    uploadDate: '2026-08-22',
    page: '/projects/coach-luki',
  },
  founder: {
    id: 'founder',
    name: 'A word from the founder of Blok Blok Studio',
    description:
      'Chase Haynes walks through where service businesses quietly lose customers online and how Blok Blok Studio fixes it, screen-recorded over the studio site.',
    src: '/videos/founder-v2.mp4',
    poster: '/videos/founder-v2-poster.webp',
    captions: '/videos/founder-v2.en.vtt',
    duration: 'PT1M14S',
    seconds: 74,
    uploadDate: '2026-08-22',
    page: '/vsl',
  },
} as const satisfies Record<string, SiteVideo>;

export type SiteVideoKey = keyof typeof SITE_VIDEOS;

/** Absolute URLs, which is what both schema.org and the sitemap require. */
export function videoUrls(v: SiteVideo) {
  return {
    contentUrl: `${BASE}${v.src}`,
    thumbnailUrl: `${BASE}${v.poster}`,
    captionUrl: `${BASE}${v.captions}`,
    pageUrl: `${BASE}${v.page}`,
  };
}

/**
 * Videos that belong in sitemap.xml and /llms.txt.
 *
 * The founder video is deliberately absent: /vsl is a paid-traffic landing
 * page marked noindex, so advertising its video to crawlers would contradict
 * the page's own directive.
 */
export const INDEXED_VIDEOS: SiteVideo[] = [
  SITE_VIDEOS.pitch,
  SITE_VIDEOS.kofi,
  SITE_VIDEOS.luki,
];

/**
 * The testimonials also appear in the case-study grid on the homepage and on
 * /vsl. VideoObject is emitted only here, on the project page named by
 * `page`, so one video resolves to one canonical URL rather than three pages
 * each claiming the same recording.
 */
export function videoForProject(slug: string): SiteVideo | undefined {
  return INDEXED_VIDEOS.find((v) => v.page === `/projects/${slug}`);
}
