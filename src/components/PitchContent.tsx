import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';
import {
  PITCH_CALENDAR_URL,
  PITCH_CONTACT_EMAIL,
  PITCH_CONTACT_NAME,
  PITCH_SITE_URL,
  PITCH_WHATSAPP_URL,
  type PitchBlock,
  type PitchData,
} from '@/data/pitches';

/**
 * One post-call pitch page, rendered from src/data/pitches.ts.
 *
 * Sent to a prospect who needed time to think after the call. It has to
 * survive being forwarded to a business partner who was never on that call,
 * so every section stands on its own: what they said, what we would build,
 * what it costs, who we have done it for, and how to reach a person.
 *
 * The body is a list of blocks rendered in order, so the same page carries a
 * short follow-up or a full proposal. Same dark visual language as the rest
 * of the site, but on the (funnel) layout: the site nav is deliberately
 * absent, and the only ways out are the calendar, the email address and the
 * proof links.
 */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] text-orange-400 mb-4">
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl font-bold mb-6">{children}</h2>;
}

function Intro({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-400 text-base leading-relaxed max-w-2xl -mt-2 mb-8">{children}</p>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0 text-orange-400 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Block({ block }: { block: PitchBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          <div className="space-y-5 max-w-2xl">
            {block.paragraphs.map((p) => (
              <p key={p} className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          {block.callout && (
            <p className="mt-8 rounded-2xl border-l-2 border-orange-500 bg-white/[0.03] py-5 px-6 text-lg sm:text-xl font-medium leading-snug text-white">
              {block.callout}
            </p>
          )}
        </>
      );

    case 'bullets':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && <Intro>{block.intro}</Intro>}
          <ul className="space-y-4">
            {block.items.map((line) => (
              <li key={line} className="flex gap-4">
                <span className="mt-2.5 w-8 h-1 shrink-0 rounded-full bg-orange-500" />
                <p className="text-gray-300 text-base leading-relaxed">{line}</p>
              </li>
            ))}
          </ul>
          {block.note && <p className="text-sm text-gray-500 mt-6 max-w-2xl">{block.note}</p>}
        </>
      );

    case 'cards':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && <Intro>{block.intro}</Intro>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {block.items.map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-5 sm:p-7">
                <div className="w-8 h-1 rounded-full bg-orange-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </>
      );

    case 'stats':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {block.items.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 sm:p-6">
                <p className="text-2xl sm:text-3xl font-light tracking-tight mb-2 text-balance">
                  {s.value}
                </p>
                <p className="text-sm text-gray-400 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
          {block.note && <p className="text-sm text-gray-500 mt-5">{block.note}</p>}
        </>
      );

    case 'videos':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && <Intro>{block.intro}</Intro>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {block.items.map((v) => (
              <div key={v.src}>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/50">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={v.poster}
                    className="w-full aspect-video"
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                {v.title && <p className="font-medium mt-4">{v.title}</p>}
                {v.note && <p className="text-gray-500 text-sm mt-1 text-pretty">{v.note}</p>}
                {v.href && (
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 py-2 text-sm text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                  >
                    {v.linkLabel ?? 'Visit the site'}
                    <ArrowIcon />
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      );

    case 'images':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && <Intro>{block.intro}</Intro>}
          <div className="space-y-8">
            {block.items.map((img) => (
              <figure key={img.src}>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-gray-950">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width ?? 1600}
                    height={img.height ?? 1000}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="w-full h-auto"
                  />
                </div>
                {img.caption && (
                  <figcaption className="text-gray-500 text-sm mt-3">{img.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </>
      );

    case 'proof':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && <Intro>{block.intro}</Intro>}
          <div className="space-y-5">
            {block.items.map((p) => (
              <div
                key={p.name}
                className="rounded-3xl border border-orange-500/20 bg-orange-500/[0.04] p-6 sm:p-9"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{p.name}</h3>
                <p className="text-orange-300 font-medium mb-4">{p.result}</p>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">{p.body}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 -my-2 text-sm text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                >
                  {p.linkLabel ?? 'Take a look'}
                  <ArrowIcon />
                </a>
              </div>
            ))}
          </div>
        </>
      );

    case 'timeline':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && <Intro>{block.intro}</Intro>}
          <div className="space-y-3">
            {block.rows.map((row) => (
              <div
                key={row.when}
                className="glass-card rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[6.5rem_1fr_auto] gap-1.5 sm:gap-6 sm:items-baseline"
              >
                <p className="text-orange-400 text-sm font-medium tracking-wide">{row.when}</p>
                <p className="text-gray-200 text-base leading-relaxed">{row.what}</p>
                {row.need && (
                  <p className="text-sm text-gray-500 sm:text-right sm:max-w-[14rem]">{row.need}</p>
                )}
              </div>
            ))}
          </div>
          {block.note && <p className="text-sm text-gray-500 mt-6 max-w-2xl">{block.note}</p>}
        </>
      );

    case 'investment':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          <div className="glass-card rounded-3xl p-6 sm:p-9">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-2">
              <p className="text-4xl sm:text-5xl font-light tracking-tight">{block.price}</p>
              {block.timeline && (
                <p className="text-gray-400 text-sm sm:text-base">{block.timeline}</p>
              )}
            </div>
            {block.priceLabel && <p className="text-sm text-gray-500 mb-6">{block.priceLabel}</p>}

            {block.includes && block.includes.length > 0 && (
              <ul className="space-y-3 mt-6 mb-6">
                {block.includes.map((line) => (
                  <li key={line} className="flex gap-3 text-sm sm:text-base text-gray-300">
                    <CheckIcon />
                    {line}
                  </li>
                ))}
              </ul>
            )}

            {block.schedule && block.schedule.length > 0 && (
              <div className="mt-6 border-t border-white/10 divide-y divide-white/5">
                {block.schedule.map((row) => (
                  <div
                    key={row.when}
                    className="py-3.5 flex items-baseline justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-200">{row.when}</p>
                      {row.what && <p className="text-sm text-gray-500">{row.what}</p>}
                    </div>
                    <p className="shrink-0 text-base text-white tabular-nums">{row.pay}</p>
                  </div>
                ))}
              </div>
            )}

            {block.excludes && block.excludes.length > 0 && (
              <p className="text-sm text-gray-500 mt-6">
                Not included: {block.excludes.join(', ')}.
              </p>
            )}

            {block.holdUntil && (
              <p className="text-sm text-gray-300 border-t border-white/10 pt-5 mt-6">
                This price holds through{' '}
                <span className="text-white font-medium">{block.holdUntil}</span>.
              </p>
            )}
          </div>
          {block.note && <p className="text-sm text-gray-400 mt-6 max-w-2xl leading-relaxed">{block.note}</p>}
        </>
      );

    case 'links':
      return (
        <>
          {block.kicker && <Kicker>{block.kicker}</Kicker>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro && <Intro>{block.intro}</Intro>}
          <div className="space-y-3">
            {block.items.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass-card rounded-2xl p-5 sm:p-6 hover:border-white/20 transition-colors"
              >
                <p className="font-medium mb-1">{link.label}</p>
                {link.note && <p className="text-sm text-gray-400">{link.note}</p>}
              </a>
            ))}
          </div>
        </>
      );
  }
}

export function PitchContent({ data }: { data: PitchData }) {
  const calendarUrl = data.calendarUrl ?? PITCH_CALENDAR_URL;
  const mailto = `mailto:${PITCH_CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Re: ${data.business}`
  )}`;
  const hasInvestment = data.blocks.some((b) => b.type === 'investment');

  return (
    <div className="pb-28 sm:pb-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ── Header: logo left, who it is for and how to reach us right ── */}
        <header className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 py-6 sm:py-9 border-b border-white/10">
          <a href="https://www.blokblokstudio.com" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Blok Blok Studio"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10"
              priority
            />
            <span className="text-sm sm:text-base font-medium tracking-tight">
              Blok Blok Studio
            </span>
          </a>
          <div className="text-left sm:text-right">
            <p className="text-xs text-gray-500">Prepared for {data.business}</p>
            <a
              href={mailto}
              className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
            >
              {PITCH_CONTACT_EMAIL}
            </a>
          </div>
        </header>

        {/* ── Hero ── */}
        <AnimatedSection className="pt-12 sm:pt-16">
          <Kicker>
            {data.kicker ?? 'Prepared after our call'}
            {data.callDate ? ` · ${data.callDate}` : ''}
          </Kicker>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
            {data.headline}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            {data.intro}
          </p>
          {hasInvestment && (
            <a
              href="#investment"
              className="sm:hidden inline-flex items-center gap-2 mt-6 py-2 text-sm text-white underline underline-offset-4 decoration-white/30"
            >
              Skip to the numbers
              <ArrowIcon />
            </a>
          )}
        </AnimatedSection>

        {/* ── Body ── */}
        {data.blocks.map((block, i) => (
          <AnimatedSection key={`${block.type}-${i}`} delay={0.1} className="mt-14 sm:mt-24">
            <div id={block.type === 'investment' ? 'investment' : undefined} className="scroll-mt-6">
              <Block block={block} />
            </div>
          </AnimatedSection>
        ))}

        {/* ── Close ── */}
        <AnimatedSection delay={0.1} className="mt-14 sm:mt-24">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 text-left sm:text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Whenever you are ready</h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto mb-8 text-pretty">
              {data.closing ??
                'Take the time you need. When you want to talk it through, or if anything here should be priced differently, I am one message away.'}
            </p>
            <div className="flex flex-wrap sm:justify-center gap-3">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Book a time
              </a>
              <a
                href={mailto}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors text-sm sm:text-base"
              >
                Email {PITCH_CONTACT_NAME.split(' ')[0]}
              </a>
              <a
                href={PITCH_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors text-sm sm:text-base"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-8">
              Want to see more of our work?{' '}
              <a
                href={PITCH_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
              >
                blokblokstudio.com
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-3">
              {PITCH_CONTACT_NAME} · Blok Blok Studio ·{' '}
              <a
                href={mailto}
                className="underline underline-offset-4 decoration-white/20 hover:text-gray-300"
              >
                {PITCH_CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* ── Phones only: the two actions stay reachable on a page this long ── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/85 backdrop-blur-md px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex gap-2">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-3 rounded-full bg-white text-black text-sm font-medium"
          >
            Book a time
          </a>
          <a
            href={mailto}
            className="flex-1 text-center px-4 py-3 rounded-full border border-white/20 text-white text-sm font-medium"
          >
            Email {PITCH_CONTACT_NAME.split(' ')[0]}
          </a>
        </div>
      </div>
    </div>
  );
}
