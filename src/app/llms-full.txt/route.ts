import { NextResponse } from 'next/server';
import en from '@/messages/en.json';
import { yearsInBusiness, FOUNDED } from '@/data/studio';
import { blogPosts } from '@/data/blog';
import { projectsData } from '@/data/projects';
import { specialties as specialtiesData } from '@/data/specialties';
import { INDEXED_VIDEOS, type SiteVideoKey } from '@/data/videos';
import { VIDEO_TRANSCRIPTS } from '@/data/video-transcripts';
import { MEMBERS } from '@/data/team';

/**
 * GET /llms-full.txt
 * The whole site in one text file for AI models. Everything is read from the
 * same data and messages the pages render, so this file cannot say something
 * the site does not.
 */
export async function GET() {
  const site = 'https://www.blokblokstudio.com';
  const roles = en.team as Record<string, string>;
  const h = en.home as Record<string, string>;
  const s: string[] = [];
  const push = (...lines: string[]) => s.push(...lines, '');

  push('# Blok Blok Studio: Full Site Content', `Source: ${site}. Updated ${new Date().toISOString().slice(0, 10)}.`);
  push('# About', en.about.subtitle, en.about.v2_intro, `Founded ${FOUNDED.year}-${String(FOUNDED.month).padStart(2, '0')} in Berlin, ${yearsInBusiness()} years in business. Five people in four cities: Berlin, Richmond, Los Angeles, Multan. Clients in the United States, Germany and the Philippines.`);
  push('## Mission', en.about.mission_text, '## Vision', en.about.vision_text);
  push('## Values', ...[1, 2, 3, 4].map((n) => `- **${(en.about as Record<string, string>)[`value_${n}_title`]}**: ${(en.about as Record<string, string>)[`value_${n}_text`]}`));

  push('# Team', ...MEMBERS.map((m) => `- **${m.name}**, ${roles[m.roleKey]}. Based in ${m.location.city}, ${m.location.area}.`));
  push(`Chase Haynes: ${(en.team as Record<string, string>).chase_studied_1}, ${(en.team as Record<string, string>).chase_studied_2}.`);

  push('# Services', en.services.subtitle, h.v2_services_sub);
  push(`## ${h.v2_offer_title}`, h.v2_offer_subtitle, `### ${h.v2_offer_build_label}`, ...[1, 2, 3, 4, 5].map((n) => `- ${(en.services as Record<string, string>)[`service_6_bullet_${n}`]}`), `### ${h.v2_offer_care_label}`, ...[1, 2, 3, 4, 5].map((n) => `- ${h[`v2_hosting_bullet_${n}`]}`));
  push('## Process', ...[1, 2, 3, 4, 5].map((n) => `${n}. **${(en.services as Record<string, string>)[`step_${n}_title`]}**: ${(en.services as Record<string, string>)[`step_${n}_desc`]}`));
  push('## What happens next', ...[1, 2, 3].map((n) => `${n}. **${h[`v2_next_${n}_title`]}**: ${h[`v2_next_${n}_desc`].replace('{price}', '$6,500')}`));

  push('# Pricing (USD, also quoted in EUR)', en.pricing.hero_sub);
  push(`## ${en.pricing.sections.oneTime}`);
  for (const p of en.pricing.pkg.oneTime) {
    push(`### ${p.name}, ${p.disp}`, `${p.tag}. For: ${p.ideal}. Timeline: ${p.tl}.`, ...p.scope.map((x) => `- **${x.i}**: ${x.l}`), `Add-ons: ${p.ov.join('; ')}.`, p.bridge, p.ho);
  }
  push(`## ${en.pricing.sections.webSupport}`);
  for (const p of en.pricing.pkg.webSupport) {
    push(`### ${p.name}, ${p.disp} per month`, `${p.tag}. For: ${p.ideal}.`, ...p.scope.map((x) => `- **${x.i}**: ${x.l}`), `Not included: ${p.ex}`, `Add-ons: ${p.ov.join('; ')}.`);
  }

  push('# FAQ', ...en.faq.items.map((f) => `**${f.question}**\n${f.answer}\n`));

  push('# Specialties');
  for (const [slug, d] of Object.entries(specialtiesData)) {
    push(`## ${d.h1}`, `${site}/${slug}`, d.intro, ...d.features.map((f) => `- **${f.title}**: ${f.desc}`), ...d.faqs.map((f) => `**${f.q}**\n${f.a}\n`));
  }

  push('# Case studies');
  for (const [slug, p] of Object.entries(projectsData)) {
    push(`## ${p.title} (${p.category}, ${p.year})`, `${site}/projects/${slug}`, p.desc, `**Challenge.** ${p.challenge}`, `**Solution.** ${p.solution}`, `**Results.** ${p.results}`, ...(p.metrics ?? []).map((m) => `- ${m.value} ${m.label}`));
  }

  push('# Articles');
  for (const post of blogPosts) {
    push(`## ${post.title}`, `${site}/blog/${post.slug}. Published ${post.date}${post.updated ? `, updated ${post.updated}` : ''}. By Chase Haynes.`, post.description, post.content);
  }

  push('# Video transcripts', 'Full transcripts of the videos on the site, so their content is readable without playing them.');
  for (const v of INDEXED_VIDEOS) push(`## ${v.name}`, `Runs ${v.duration}, plays at ${site}${v.page}.`, VIDEO_TRANSCRIPTS[v.id as SiteVideoKey]);

  push('# Contact', `- Website: ${site}`, `- Contact form: ${site}/contact`, `- Start a project: ${site}/start`, '- Instagram: https://www.instagram.com/blokblokstudio/', '- LinkedIn: https://www.linkedin.com/company/blok-blok-studio/', '- Free 15-minute intro call via the contact page.');

  return new NextResponse(s.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
