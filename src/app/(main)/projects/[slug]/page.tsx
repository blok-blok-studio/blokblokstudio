/**
 * ============================================================================
 * /projects/[slug] — Individual Project Case Study Page
 * ============================================================================
 *
 * PURPOSE:
 *   Dynamic route that renders a full case study page for each project.
 *   The slug parameter is matched against the projectsData object in
 *   ProjectDetail.tsx.
 *
 * STATIC GENERATION:
 *   generateStaticParams() pre-renders all known project slugs at build time.
 *   This means every project page is statically generated for fast loading.
 *
 * TO ADD A NEW PROJECT PAGE:
 *   Add a new entry to the `projectsData` object in ProjectDetail.tsx.
 *   The slug (key) will automatically become a new route.
 *
 * ============================================================================
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/ProjectDetail';
import { projectsData, getAllProjectSlugs } from '@/data/projects';

/**
 * Generate static paths for all projects at build time.
 * Each slug in projectsData becomes a pre-rendered page.
 */
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

// The project list is fully known at build time — any other slug is a
// hard 404 at the router level (streaming would otherwise mask notFound()
// behind a 200 shell).
export const dynamicParams = false;

/**
 * Generate metadata (title + description) for each project page.
 * Uses the project's title and description from projectsData.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];

  // Thrown here (before the streamed body starts) so the response is a
  // real HTTP 404, not a streamed 200 shell.
  if (!project) notFound();

  return {
    title: project.title,
    description: project.desc,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Real 404 for unknown slugs instead of a soft-404 page
  if (!projectsData[slug]) notFound();

  return (
    <div className="page-transition">
      <ProjectDetail slug={slug} />
    </div>
  );
}
