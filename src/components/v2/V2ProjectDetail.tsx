import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { localizeProject, videoTranscript } from '@/data/i18n';
import { videoForProject, type SiteVideoKey } from '@/data/videos';
import { VideoTranscript } from '@/components/VideoTranscript';
import { FullPageScreenshot, ScaledLiveIframe } from '@/components/ScaledLiveIframe';

/**
 * V2ProjectDetail — case study page in the redesign system. Numbers first
 * (metrics strip), then the live site, then challenge / build / results,
 * the client's video where we have one, gallery, next project.
 */
const LABEL = 'text-[11px] uppercase tracking-[0.2em] text-gray-500';
const CAT_KEY: Record<string, 'cat_web' | 'cat_ecom' | 'cat_brand'> = { 'Web Design': 'cat_web', 'E-Commerce': 'cat_ecom', Branding: 'cat_brand' };

export async function V2ProjectDetail({ slug }: { slug: string }) {
  const locale = await getLocale();
  const t = await getTranslations('ui');
  const tp = await getTranslations('projects');
  const project = localizeProject(slug, locale);
  if (!project) return null;

  const next = project.nextSlug ? localizeProject(project.nextSlug, locale) ?? null : null;
  const videoMeta = videoForProject(slug);
  const videoKey = videoMeta?.id as SiteVideoKey | undefined;
  const showLive = Boolean(project.url) && project.livePreview !== false;
  const gallery = project.gallery.filter((g): g is string => g !== null);
  const category = CAT_KEY[project.category] ? tp(CAT_KEY[project.category]) : project.category;
  const sections = [
    { label: t('proj_challenge'), text: project.challenge },
    { label: t('proj_solution'), text: project.solution },
    { label: t('proj_results'), text: project.results },
  ];

  return (
    <>
      {/* Header */}
      <section className="px-5 pt-32 pb-14 sm:px-8 sm:pt-40 sm:pb-16 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white">
            <span aria-hidden="true">←</span> {t('proj_back')}
          </Link>
          <p className={`mt-10 ${LABEL}`}>
            {category} · {project.year}
          </p>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-bold leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-400">{project.desc}</p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400"
            >
              {t('proj_visit')} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </section>

      {/* Numbers */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1600px] rounded-3xl border border-white/10 p-8 sm:p-10 lg:p-14">
            <p className={LABEL}>{t('proj_numbers')}</p>
            <dl className={`mt-8 grid gap-10 sm:grid-cols-2 ${project.metrics.length >= 4 ? 'lg:grid-cols-4' : project.metrics.length === 3 ? 'lg:grid-cols-3' : ''}`}>
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="font-display text-[2.75rem] font-bold leading-none tracking-[-0.03em] text-orange-500 sm:text-[3.5rem]">{m.value}</dd>
                  <dt className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">{m.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Hero image when there is no live preview */}
      {!showLive && project.heroImage && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-gray-950">
              <Image src={project.heroImage} alt={project.title} fill priority sizes="100vw" className="object-cover object-top" />
            </div>
          </div>
        </section>
      )}

      {/* Live site */}
      {showLive && project.url && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1600px]">
            <div className={`mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-4 ${LABEL}`}>
              <span>{t('proj_live')}</span>
              <span className="hidden normal-case tracking-normal text-gray-400 sm:inline">
                {project.embeddable ? t('proj_live_hint_embed') : t('proj_live_hint_scroll')}
              </span>
            </div>

            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-gray-950 sm:block">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-gray-400">
                  {project.url.replace(/^https?:\/\//, '')}
                </span>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 transition-colors hover:text-white">
                  {t('proj_open_live')} <span aria-hidden="true">↗</span>
                </a>
              </div>
              {project.embeddable ? (
                <ScaledLiveIframe src={project.useProxy ? `/api/proxy/${slug}` : project.url} title={`${project.title} live site`} />
              ) : (
                <FullPageScreenshot url={project.url} alt={`${project.title} live preview`} fallback={project.heroImage} />
              )}
            </div>

            {/* Phone */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-3xl border border-white/10 bg-gray-950 transition-transform active:scale-[0.99] sm:hidden"
            >
              {project.mobileImage && (
                <div className="relative aspect-[4/5]">
                  <Image src={project.mobileImage} alt={`${project.title} mobile preview`} fill sizes="100vw" className="object-cover object-top" />
                </div>
              )}
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
                <span className="min-w-0">
                  <span className={`block ${LABEL}`}>{t('proj_live_lower')}</span>
                  <span className="block truncate font-mono text-sm text-white">{project.url.replace(/^https?:\/\//, '')}</span>
                </span>
                <span className="shrink-0 rounded-full bg-orange-500 px-4 py-2 text-xs text-(--bb-on-primary)">{t('proj_open_live')}</span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Challenge / build / results */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-3">
          {sections.map((s, i) => (
            <article key={s.label} className="rounded-3xl border border-white/10 p-7 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">0{i + 1}</p>
              <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">{s.label}</h2>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-gray-400 sm:text-base">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Client video */}
      {project.testimonialVideo && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1600px]">
            <div className={`mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-4 ${LABEL}`}>
              <span>{t('proj_testimonial')}</span>
              {project.testimonialName && <span className="normal-case tracking-normal text-gray-400">{project.testimonialName}</span>}
            </div>
            <div className="mx-auto max-w-3xl">
              <video controls preload="none" playsInline poster={project.testimonialPoster} className="w-full rounded-3xl bg-gray-950">
                <source src={project.testimonialVideo} type="video/mp4" />
                {videoMeta?.captions && <track kind="captions" src={videoMeta.captions} srcLang="en" label="English" default />}
              </video>
              {videoKey && <VideoTranscript transcript={videoTranscript(videoKey, locale)} speaker={project.testimonialName} />}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1600px]">
            <div className={`mb-6 border-b border-white/10 pb-4 ${LABEL}`}>{t('proj_gallery')}</div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((img, i) => (
                <li key={img} className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-950">
                  <Image src={img} alt={`${project.title} gallery ${i + 1}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Next project */}
      {next && project.nextSlug && (
        <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
          <Link
            href={`/projects/${project.nextSlug}`}
            className="group mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 transition-colors hover:bg-white/[0.03] sm:p-12"
          >
            <span>
              <span className={`block ${LABEL}`}>{t('proj_next')}</span>
              <span className="mt-3 block font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">{next.title}</span>
            </span>
            <span aria-hidden="true" className="text-3xl text-orange-500 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </section>
      )}
    </>
  );
}
