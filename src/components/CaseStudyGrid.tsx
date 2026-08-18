'use client';

import Image from 'next/image';

/**
 * 2x2 client case-study grid, shared by /vsl and the homepage. Top row:
 * Kofi + Luki video testimonials. Bottom row: Bronco (site hero) and
 * Exotic Ripz (Shopify sales proof; the owners took the store down, so
 * the case study is the link). Name + URL + the numbers under each.
 * Links open in a new tab so the host page stays open.
 */

const CASES = [
  {
    name: 'Coach Kofi', where: 'Nike athlete, Berlin',
    proof: 'Consultation requests up 200% after launch.',
    href: 'https://www.coachkofi.de', label: 'coachkofi.de',
    video: '/videos/testimonial-kofi.mp4', poster: '/videos/testimonial-kofi-poster.jpg',
  },
  {
    name: 'Coach Luki', where: 'Personal trainer, Berlin',
    proof: 'Bookings and payments straight through the site. No DMs, no invoices.',
    href: 'https://coachluki.com', label: 'coachluki.com',
    video: '/videos/testimonial-luki.mp4', poster: '/videos/testimonial-luki-poster.jpg',
  },
  {
    name: 'Bronco Plumbing', where: 'Dallas-Fort Worth',
    proof: '$50k+ gross revenue in his first 5 months. 5.0 stars across 52 Google reviews.',
    href: 'https://www.broncoplumbingdfw.com', label: 'broncoplumbingdfw.com',
    image: '/images/projects/bronco-card.webp',
  },
  {
    name: 'Exotic Ripz', where: 'E-commerce, US',
    proof: '$191k in trading card sales, 1,790 orders on the Shopify store we built. The owners have since taken the store down.',
    href: '/projects/exotic-ripz', label: 'View case study',
    image: '/images/projects/exoticripz-card.webp',
  },
];

export function CaseStudyGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-left">
      {CASES.map(c => (
        <div key={c.name} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          {c.video ? (
            <video
              controls
              playsInline
              preload="none"
              poster={c.poster}
              className="w-full aspect-video object-cover bg-black"
            >
              <source src={c.video} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={c.image!}
              alt={`${c.name} results`}
              width={1200}
              height={675}
              className="w-full aspect-video object-cover"
            />
          )}
          <div className="p-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-base font-semibold text-white">
                {c.name} <span className="font-normal text-sm text-gray-600">· {c.where}</span>
              </p>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm text-orange-400 hover:text-orange-300 underline underline-offset-4"
              >
                {c.label}
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-1.5 text-pretty">{c.proof}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
