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

export interface Plan {
  /** Empty when they gave no name; the component picks a greeting without one. */
  firstName: string;
  /** Their business type, or empty for "Other". Translated at render time. */
  industry: string;
  /** False when they answered "Not sure yet", which changes the framing. */
  knewWhatTheyWanted: boolean;
  /** Keys into thanks.work.* — the pieces of work to talk through. */
  items: string[];
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

/**
 * Which piece of work each answer implies, as a translation key rather than a
 * sentence. The copy lives in the message files under `thanks.work.*` so the
 * agenda reads in the same language as the quiz that produced it; returning
 * English here would have left a German visitor with a German quiz and an
 * English plan.
 */
const WORK: Record<string, string> = {
  'New website': 'site',
  'Website redesign': 'redesign',
  'E-commerce': 'shop',
  'Landing page': 'landing',
  'Google Ads': 'search_ads',
  'Meta Ads': 'social_ads',
  'Social media': 'social',
};

/** Fallback when someone picks "Not sure yet", keyed loosely off their industry. */
function defaultWork(business: string): string[] {
  const b = business.toLowerCase();
  if (b.includes('commerce') || b.includes('retail') || b.includes('shop')) {
    return ['shop', 'social_ads'];
  }
  if (b.includes('coach') || b.includes('fitness') || b.includes('wellness') || b.includes('beauty')) {
    return ['site', 'booking'];
  }
  if (b.includes('trade') || b.includes('construction') || b.includes('automotive') || b.includes('legal') || b.includes('medical')) {
    return ['site', 'local_seo'];
  }
  return ['site', 'landing'];
}

export function buildPlan(a: QuizAnswers): Plan {
  const picked = a.services.filter((s) => s !== 'Not sure yet');
  const chosen = picked.map((s) => WORK[s]).filter(Boolean).slice(0, 4);
  const resolved = chosen.length ? chosen : defaultWork(a.business);

  return {
    firstName: a.name.trim().split(/\s+/)[0] || '',
    industry: a.business && a.business !== 'Other' ? a.business : '',
    knewWhatTheyWanted: picked.length > 0,
    items: resolved,
  };
}
