import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Hero — redesign/v2.
 * The brand board's block grid as the hero: palette tiles, type glyphs and
 * project screenshots in a 6 x 3 mosaic (3 wide on phones), stacked
 * wordmark over a soft scrim. The <h1> is the small mono tagline so the
 * page keeps its SEO headline. Tiles are decorative and hidden from AT.
 */

type Tile =
  | { kind: 'solid'; bg: string }
  | { kind: 'glyph'; bg: string; fg: string; char: string }
  | { kind: 'image'; src: string };

const TILES: Tile[] = [
  { kind: 'glyph', bg: 'bg-orange-500', fg: 'text-white', char: '$' },
  { kind: 'glyph', bg: 'bg-white', fg: 'text-black', char: '%' },
  { kind: 'solid', bg: 'bg-black' },
  { kind: 'image', src: '/images/projects/coachluki.jpg' },
  { kind: 'solid', bg: 'bg-orange-600' },
  { kind: 'glyph', bg: 'bg-orange-500', fg: 'text-black', char: '*' },

  { kind: 'image', src: '/images/projects/bronco.webp' },
  { kind: 'glyph', bg: 'bg-gray-300', fg: 'text-orange-600', char: '1' },
  { kind: 'glyph', bg: 'bg-black', fg: 'text-white', char: 'B)' },
  { kind: 'image', src: '/images/projects/coachkofi.webp' },
  { kind: 'glyph', bg: 'bg-white', fg: 'text-black', char: '0' },
  { kind: 'solid', bg: 'bg-orange-500' },

  { kind: 'glyph', bg: 'bg-black', fg: 'text-white', char: '//' },
  { kind: 'image', src: '/images/projects/exoticripz.jpg' },
  { kind: 'glyph', bg: 'bg-orange-600', fg: 'text-orange-300', char: '#' },
  { kind: 'solid', bg: 'bg-white' },
  { kind: 'image', src: '/images/projects/kdssys.webp' },
  { kind: 'glyph', bg: 'bg-black', fg: 'text-white', char: 'o:' },
];

export async function V2Hero() {
  const t = await getTranslations('home');
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Mosaic */}
      <div aria-hidden="true" className="grid grid-cols-3 opacity-80 md:grid-cols-6">
        {TILES.map((tile, i) => {
          const delay = { animationDelay: `${(i % 6) * 0.06 + Math.floor(i / 6) * 0.1}s` };
          if (tile.kind === 'image') {
            return (
              <div key={i} className="hero-enter relative aspect-square overflow-hidden bg-gray-900" style={delay}>
                <Image src={tile.src} alt="" fill sizes="(min-width: 768px) 17vw, 34vw" className="object-cover object-top" priority={i < 6} />
              </div>
            );
          }
          if (tile.kind === 'glyph') {
            return (
              <div key={i} className={`hero-enter flex aspect-square items-center justify-center ${tile.bg}`} style={delay}>
                <span className={`font-mono text-[22vw] leading-none md:text-[9vw] ${tile.fg}`}>{tile.char}</span>
              </div>
            );
          }
          return <div key={i} className={`hero-enter aspect-square ${tile.bg}`} style={delay} />;
        })}
      </div>

      {/* Scrim: flat darkening, a band behind the nav, and a pool behind the wordmark */}
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_45%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-6 text-center">
        <Image
          src="/wordmark-stacked.svg"
          alt="Blok Blok"
          width={540}
          height={430}
          priority
          className="hero-enter w-[58vw] max-w-[480px] drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:w-[30vw]"
        />
        <h1
          className="hero-enter mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white sm:text-xs"
          style={{ animationDelay: '0.3s' }}
        >
          {t('v2_tagline')}
        </h1>
        <Link
          href="/quiz"
          className="hero-enter mt-8 inline-flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-(--bb-on-primary) transition-colors hover:bg-orange-400"
          style={{ animationDelay: '0.45s' }}
        >
          {t('v2_hero_cta')}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-5 flex items-end justify-between px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white sm:px-8 lg:px-12">
        <span className="flex items-center gap-3">
          <span className="block h-8 w-px overflow-hidden bg-white/30">
            <span className="scroll-bob block h-full w-full bg-orange-500" />
          </span>
          {t('v2_scroll')}
        </span>
        <span className="hidden sm:block">{t('v2_locations')}</span>
      </div>
    </section>
  );
}
