/**
 * Turns the quiz answers into the plan shown on the thank-you page.
 *
 * This is the pitch. The quiz is not just lead capture: the reason someone
 * answers five questions is to get something back, and what they get back is
 * a specific read on their situation instead of a generic "thanks, we'll be
 * in touch". It runs client-side off the answers the form stashed, so it
 * costs nothing and works before any human has looked at the lead.
 *
 * Every timeline here matches the published ones on /pricing and in llms.txt.
 * Nothing in this file should promise something the studio has not already
 * said in public.
 */

export interface QuizAnswers {
  name: string;
  business: string;
  services: string[];
  budget: string;
  timeline: string;
}

export interface PlanItem {
  title: string;
  detail: string;
}

export interface Plan {
  headline: string;
  diagnosis: string;
  items: PlanItem[];
  timing: string;
  budgetNote: string;
}

const STORAGE_KEY = 'bb-quiz-answers';

/** Stashed by the quiz right before it redirects to the thank-you page. */
export function stashAnswers(a: QuizAnswers): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* private mode: the thank-you page falls back to its generic copy */
  }
}

export function readAnswers(): QuizAnswers | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as QuizAnswers;
    return a && Array.isArray(a.services) ? a : null;
  } catch {
    return null;
  }
}

export function clearAnswers(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** What each service choice actually means as a piece of work. */
const WORK: Record<string, PlanItem> = {
  'New website': {
    title: 'A site built for one job',
    detail:
      'Custom Next.js build, not a template. Every page points at a single action, whether that is a booked call, an order, or a payment.',
  },
  'Website redesign': {
    title: 'Rebuild on what already works',
    detail:
      'We keep the pages already pulling their weight, fix the ones leaking visitors, and move the whole thing onto a stack that loads fast.',
  },
  'Online shop': {
    title: 'A storefront that closes',
    detail:
      'Product pages, checkout, and payments wired so people finish. The last shop we built did 191k in sales across 1,790 orders.',
  },
  'Landing page': {
    title: 'One page, one offer',
    detail:
      'The fastest thing we build. A single page aimed at one audience, with the tracking attached so you can see what it returns.',
  },
  'Google Ads': {
    title: 'Show up at the moment of intent',
    detail:
      'Campaigns built and managed against booked jobs, not clicks. Search is where people already know what they want.',
  },
  'Meta Ads': {
    title: 'Get in front of them first',
    detail:
      'Facebook and Instagram campaigns that put the offer in front of the right people before a competitor does.',
  },
};

/** Fallback when someone picks "Not sure yet", keyed loosely off their industry. */
function defaultWork(business: string): PlanItem[] {
  const b = business.toLowerCase();
  const site = WORK['New website'];
  if (b.includes('commerce') || b.includes('retail') || b.includes('shop')) {
    return [WORK['Online shop'], WORK['Meta Ads']];
  }
  if (b.includes('coach') || b.includes('fitness') || b.includes('wellness') || b.includes('beauty')) {
    return [
      site,
      {
        title: 'Booking and payment on the site',
        detail:
          'Clients pick a slot and pay without a single DM. This is exactly what we built for Coach Luki and Coach Kofi.',
      },
    ];
  }
  if (b.includes('trade') || b.includes('construction') || b.includes('automotive') || b.includes('legal') || b.includes('medical')) {
    return [
      site,
      {
        title: 'Local search and reviews',
        detail:
          'Rank where your customers actually look, with live Google reviews on the page. A first-year plumbing client cleared 50k gross in five months.',
      },
    ];
  }
  return [site, WORK['Landing page']];
}

/**
 * Timelines lifted from the published ones. Do not invent faster numbers here.
 *
 * Reads the resolved plan rather than the raw picks: someone who answered
 * "not sure yet" still gets recommended work, and quoting five-page-site
 * timelines under a shop recommendation reads as boilerplate.
 */
function timingFor(items: PlanItem[], timeline: string): string {
  const titles = items.map((i) => i.title);
  const wantsShop = titles.includes(WORK['Online shop'].title);
  const onlyLanding = titles.length === 1 && titles[0] === WORK['Landing page'].title;

  let build: string;
  if (onlyLanding) build = 'A single landing page typically launches in 2 to 3 weeks.';
  else if (wantsShop) build = 'A shop build usually runs 8 to 12 weeks depending on catalogue size.';
  else build = 'A 5-page site typically launches in 4 to 6 weeks, a 10-page site with a CMS in 8 to 12.';

  if (timeline === 'As soon as possible') {
    return `${build} You said as soon as possible, so we will talk about what can start this week on the call.`;
  }
  if (timeline === 'Just exploring') {
    return `${build} No rush on your side, so the call is about giving you real numbers to weigh up.`;
  }
  return build;
}

function budgetNoteFor(budget: string): string {
  switch (budget) {
    case 'Under €2k':
      return 'At that level we would point you at a single landing page done properly rather than a thin multi-page site. We will be straight with you on the call about what fits.';
    case '€2k – €5k':
      return 'That covers most multi-page builds. We will scope it against what you actually need rather than padding it out.';
    case '€5k – €10k':
      return 'Enough for a full build plus either a shop or a first ad campaign running alongside it.';
    case '€10k+':
      return 'Enough to build and then keep growing it: site, ads, tracking, and ongoing work against the numbers.';
    default:
      return 'We quote against scope, so the call is where we put a real number on it.';
  }
}

export function buildPlan(a: QuizAnswers): Plan {
  const picked = a.services.filter((s) => s !== 'Not sure yet');
  const chosen = picked.map((s) => WORK[s]).filter(Boolean).slice(0, 4);
  const resolved = chosen.length ? chosen : defaultWork(a.business);

  const first = a.name.trim().split(/\s+/)[0];
  const headline = first ? `Here is where we would start, ${first}` : 'Here is where we would start';

  const industry = a.business && a.business !== 'Other' ? a.business.toLowerCase() : 'your line of work';
  const diagnosis = picked.length
    ? `Based on what you told us about ${industry}, these are the pieces we would put in front of you first.`
    : `You said you are not sure yet, which is a normal place to start. For ${industry}, this is usually where the money is.`;

  return {
    headline,
    diagnosis,
    items: resolved,
    timing: timingFor(resolved, a.timeline),
    budgetNote: budgetNoteFor(a.budget),
  };
}
