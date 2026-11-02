/**
 * Live-site FAQ filter. Entries about AI, voice agents and automation stay in
 * the message files for a future re-enable but are hidden from the page AND
 * from the FAQPage structured data, so search engines see the same list as
 * visitors.
 */
export const HIDE_AI_FAQ = true;
const aiKeywords = /\b(ai|chatbot|voice agent|automation|agent)\b/i;

export function visibleFaqs<T extends { question: string; answer: string }>(items: T[]): T[] {
  return HIDE_AI_FAQ ? items.filter((item) => !aiKeywords.test(item.question) && !aiKeywords.test(item.answer)) : items;
}
