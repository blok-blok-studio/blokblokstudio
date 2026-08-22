/**
 * Turns the quiz answers into the call agenda shown on the thank-you page.
 *
 * This is the pitch. The quiz is not just lead capture: the reason someone
 * answers five questions is to get something back, and what they get back is
 * a specific read on their situation instead of a generic "thanks, we'll be
 * in touch". It runs client-side off the answers the form stashed, so it
 * costs nothing and works before any human has looked at the lead.
 *
 * Nothing here is a deliverable. The offer is a call, and this is the agenda
 * for it, so the copy must never imply a document is on its way.
 *
 * Deliberately carries no week counts, page counts or price bands. Those are
 * the call's job: a number on a screen before anyone has explained the scope
 * either anchors the client wrongly or reads as a quote. Keep this to what
 * would be worked through, never how long it takes or what it costs.
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
      'Product pages, checkout, and payments wired so people actually finish rather than abandon halfway.',
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
  'Social media': {
    title: 'Social that points somewhere',
    detail:
      'Clips, captions and posts cut from footage you already have, built to move people to the site rather than just fill a feed.',
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
          'Rank where your customers actually look, with live Google reviews on the page.',
      },
    ];
  }
  return [site, WORK['Landing page']];
}

export function buildPlan(a: QuizAnswers): Plan {
  const picked = a.services.filter((s) => s !== 'Not sure yet');
  const chosen = picked.map((s) => WORK[s]).filter(Boolean).slice(0, 4);
  const resolved = chosen.length ? chosen : defaultWork(a.business);

  const first = a.name.trim().split(/\s+/)[0];
  const headline = first ? `Here is where we would start, ${first}` : 'Here is where we would start';

  const industry = a.business && a.business !== 'Other' ? a.business.toLowerCase() : 'your line of work';
  const diagnosis = picked.length
    ? `Based on what you told us about ${industry}, this is what we would work through with you on the call.`
    : `You said you are not sure yet, which is a normal place to start. For ${industry}, this is usually where the money is, so it is where we would begin on the call.`;

  return { headline, diagnosis, items: resolved };
}
