import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PitchContent } from '@/components/PitchContent';
import { PITCHES, PITCH_SLUGS } from '@/data/pitches';

/**
 * /pitch/<slug> — the page sent after a call that did not close on the spot.
 *
 * Written for one prospect and quoting their numbers, so it is noindex and
 * unlinked from anywhere on the site. The only way to it is the link Chase
 * sends. Content lives in src/data/pitches.ts; see docs/pitch-templates.md,
 * Template 5, for the message that carries the link.
 */

export function generateStaticParams() {
  return PITCH_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pitch = PITCHES[slug];
  return {
    title: pitch ? `${pitch.business} + Blok Blok Studio` : 'Pitch | Blok Blok Studio',
    description: pitch?.intro,
    robots: { index: false, follow: false },
  };
}

export default async function PitchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pitch = PITCHES[slug];
  if (!pitch) notFound();
  return <PitchContent data={pitch} />;
}
