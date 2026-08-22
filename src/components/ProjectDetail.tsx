/**
 * ============================================================================
 * ProjectDetail.tsx, Individual Project Case Study Page
 * ============================================================================
 *
 * PURPOSE:
 *   Renders a full case study page for an individual project. Includes:
 *     1. A hero section with project title, category, year, and description
 *     2. A large placeholder image area (ready for real project screenshots)
 *     3. Project overview section (challenge, solution, results)
 *     4. A gallery grid of placeholder images
 *     5. A "Next Project" link at the bottom
 *
 * PROJECT DATA:
 *   All project data is defined in /src/data/projects.ts and imported here.
 *   See that file to add, edit, or remove projects.
 *
 * TO REPLACE PLACEHOLDER IMAGES:
 *   Set `heroImage` and `gallery` fields in /src/data/projects.ts to real
 *   image paths (e.g., '/images/projects/zenith-hero.jpg').
 *
 * REFERENCED FILES / DEPENDENCIES:
 *   - /src/data/projects.ts → shared project data (server + client)
 *   - ./AnimatedSection     → scroll-triggered reveal animation wrapper
 *   - framer-motion         → hover animations
 *   - next/link             → client-side navigation
 *
 * ============================================================================
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { videoForProject, type SiteVideoKey } from '@/data/videos';
import { VideoTranscript } from './VideoTranscript';
import { projectsData } from '@/data/projects';

/**
 * The iframe is rendered at a fixed "desktop" viewport width and then
 * CSS-scaled down to fit our container. This forces the embedded site
 * to load its real desktop layout (so navs don't wrap, headers don't
 * squish) regardless of how wide our card actually is on screen.
 */
const IFRAME_RENDER_WIDTH = 1440;
const IFRAME_VIEWPORT_HEIGHT = 700;

function ScaledLiveIframe({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.offsetWidth;
      setScale(Math.min(1, w / IFRAME_RENDER_WIDTH));
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ height: IFRAME_VIEWPORT_HEIGHT }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        className="block bg-white"
        style={{
          width: IFRAME_RENDER_WIDTH,
          height: IFRAME_VIEWPORT_HEIGHT / (scale || 1),
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * ProjectDetail Component
 * ---------------------------------------------------------------------------
 * Props:
 *   slug, URL slug matching a key in projectsData
 * ---------------------------------------------------------------------------
 */
export function ProjectDetail({ slug }: { slug: string }) {
  const project = projectsData[slug];
  // Caption track lives in videos.ts, which is the source of truth for
  // everything the video SEO layer reads.
  const testimonialVideoMeta = videoForProject(slug);
  const testimonialCaptions = testimonialVideoMeta?.captions;
  const testimonialKey = testimonialVideoMeta?.id as SiteVideoKey | undefined;

  if (!project) {
    return (
      <section className="pt-32 pb-24 px-5 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
          &larr; Back to Projects
        </Link>
      </section>
    );
  }

  const nextProject = project.nextSlug ? projectsData[project.nextSlug] : null;

  return (
    <div>
      {/* ================================================================
          SECTION 1: Project Hero
          ================================================================ */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 sm:mb-12"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Projects
            </Link>

            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-xs sm:text-sm text-gray-500">{project.year}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              {project.title}
            </h1>

            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mb-6">
              {project.desc}
            </p>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Visit Live Site
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================
          SECTION 2: Hero Image
          Only render when there is no live preview block, the preview
          already shows a large screenshot/iframe of the site, so showing
          the hero image too would just be the same thing twice.
          ================================================================ */}
      {!(project.url && project.livePreview !== false) && (
      <section className="px-5 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="aspect-[16/9] rounded-2xl sm:rounded-3xl relative overflow-hidden bg-gray-900">
              {project.heroImage ? (
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 1280px"
                  priority
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* ================================================================
          SECTION 2.5: Live Site Embed
          Desktop: live iframe in a browser-chrome window with a scroll prompt.
          Mobile: a CTA card pointing to the live site (iframes scroll-trap
          on touch devices and many sites refuse to load in tiny viewports).
          Some sites set X-Frame-Options or frame-ancestors that block the
          iframe; the "Open in new tab" link is the fallback.
          ================================================================ */}
      {project.url && project.livePreview !== false && (
        <section className="px-5 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Live Site
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  <span className="hidden sm:inline">
                    {project.embeddable ? 'Click and scroll the live site below' : 'Scroll through the live site below'}
                  </span>
                  <span className="sm:hidden">Take a look</span>
                </h2>
                <p className="hidden sm:block text-sm text-gray-500 mt-2">
                  {project.embeddable
                    ? "Click links and navigate just like you're on the real site, or open it in a new tab."
                    : 'This is a full-page snapshot. Scroll inside the window, or open the live site in a new tab.'}
                </p>
              </div>

              {/* Desktop: live interactive iframe when the site allows
                  embedding (no X-Frame-Options or frame-ancestors). When
                  the site blocks embedding, fall back to a full-page
                  screenshot from Microlink in a scrollable container.
                  The flag is set per project in /src/data/projects.ts. */}
              <div className="hidden sm:block">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-950 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400 truncate font-mono">
                      {project.url.replace(/^https?:\/\//, '')}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      Open live
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  {project.embeddable ? (
                    <ScaledLiveIframe
                      src={project.useProxy ? `/api/proxy/${slug}` : project.url}
                      title={`${project.title} live site`}
                    />
                  ) : (
                    <div className="h-[700px] overflow-y-auto bg-white scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&fullPage=true&meta=false&embed=screenshot.url&type=jpeg&waitUntil=networkidle0`}
                        alt={`${project.title} live preview`}
                        className="w-full block"
                        loading="lazy"
                        onError={(e) => {
                          if (project.heroImage) {
                            (e.currentTarget as HTMLImageElement).src = project.heroImage;
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile: clean CTA card with the mobile screenshot, no iframe */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden block rounded-2xl overflow-hidden border border-white/10 bg-gray-900 active:scale-[0.99] transition-transform"
              >
                {project.mobileImage && (
                  <div className="relative aspect-[4/5] bg-gray-950">
                    <Image
                      src={project.mobileImage}
                      alt={`${project.title} mobile preview`}
                      fill
                      className="object-cover object-top"
                      sizes="100vw"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between px-5 py-4 bg-gray-950 border-t border-white/10">
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Live site</p>
                    <p className="text-sm text-white font-mono truncate">
                      {project.url.replace(/^https?:\/\//, '')}
                    </p>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-black text-xs font-semibold">
                    Open
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </a>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ================================================================
          SECTION 3: Challenge / Solution / Results
          ================================================================ */}
      <section className="px-5 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { label: 'The Challenge', text: project.challenge },
              { label: 'Our Solution', text: project.solution },
              { label: 'The Results', text: project.results },
            ].map((section, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                  <span className="text-xs text-gray-600 uppercase tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold mt-2 mb-3 sm:mb-4">
                    {section.label}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3.5: Client Video Testimonial
          ================================================================ */}
      {project.testimonialVideo && (
        <section className="px-5 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">Hear It From the Client</h2>
              {project.testimonialName && (
                <p className="text-sm text-gray-500 mt-2">{project.testimonialName}</p>
              )}
            </AnimatedSection>
            <AnimatedSection>
              <video
                controls
                preload="none"
                playsInline
                poster={project.testimonialPoster}
                className="w-full rounded-2xl sm:rounded-3xl bg-gray-900"
              >
                <source src={project.testimonialVideo} type="video/mp4" />
                {testimonialCaptions && (
                  <track
                    kind="captions"
                    src={testimonialCaptions}
                    srcLang="en"
                    label="English"
                    default
                  />
                )}
              </video>
              {testimonialKey && (
                <VideoTranscript
                  video={testimonialKey}
                  speaker={project.testimonialName}
                />
              )}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ================================================================
          SECTION 4: Gallery Grid (Placeholders)
          ================================================================ */}
      <section className="px-5 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Project Gallery</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {project.gallery.filter(img => img !== null).map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl relative overflow-hidden bg-gray-900">
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${i + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5: Next Project Link
          ================================================================ */}
      {nextProject && project.nextSlug && (
        <section className="px-5 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <Link href={`/projects/${project.nextSlug}`} className="block group">
                <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2">
                      Next Project
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold group-hover:text-white transition-colors">
                      {nextProject.title}
                    </h3>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/5 transition-colors flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
}
