/**
 * AI Content Stylometry Variation — Anti-LLM Detection
 *
 * Gmail's Gemini Nano and Microsoft's on-device LLMs analyze email writing style.
 * They detect AI-generated content through:
 *
 * 1. Sentence length uniformity (AI tends toward medium-length sentences)
 * 2. Vocabulary predictability (AI uses "moreover", "furthermore", "leverage")
 * 3. Opening pattern repetition (AI always starts with "I hope this finds you well")
 * 4. Paragraph structure regularity (AI writes 3-4 sentence paragraphs consistently)
 * 5. Punctuation patterns (AI rarely uses dashes, semicolons, or parentheticals)
 * 6. Contraction consistency (AI either always or never uses contractions)
 *
 * This module introduces natural variation to defeat these detection patterns.
 * Applied AFTER spintax processing but BEFORE HTML rendering.
 */

// ── AI-Typical Words & Phrases to Vary ──
// These are words/phrases that LLMs flag as AI-generated because they appear
// at much higher frequency in AI text than human text.

const AI_WORD_REPLACEMENTS: Record<string, string[]> = {
  'leverage': ['use', 'put to work', 'take advantage of', 'make the most of'],
  'utilize': ['use', 'work with', 'apply', 'try'],
  'furthermore': ['also', 'plus', 'on top of that', 'and'],
  'moreover': ['also', 'what\'s more', 'besides', 'and'],
  'however': ['but', 'though', 'that said', 'still'],
  'therefore': ['so', 'because of this', 'that\'s why', 'which means'],
  'additionally': ['also', 'plus', 'on top of that', 'another thing'],
  'consequently': ['so', 'as a result', 'because of that', 'which means'],
  'nevertheless': ['still', 'but', 'even so', 'that said'],
  'comprehensive': ['full', 'complete', 'thorough', 'detailed'],
  'streamline': ['simplify', 'speed up', 'make easier', 'clean up'],
  'optimize': ['improve', 'fine-tune', 'make better', 'boost'],
  'implement': ['set up', 'put in place', 'build', 'add'],
  'facilitate': ['help with', 'make easier', 'support', 'enable'],
  'innovative': ['new', 'fresh', 'creative', 'cutting-edge'],
  'robust': ['solid', 'strong', 'reliable', 'sturdy'],
  'seamless': ['smooth', 'easy', 'effortless', 'simple'],
  'scalable': ['flexible', 'growable', 'expandable', 'adaptable'],
  'synergy': ['collaboration', 'teamwork', 'working together', 'partnership'],
  'paradigm': ['approach', 'model', 'framework', 'way of thinking'],
  'delve': ['dig into', 'look at', 'explore', 'get into'],
  'realm': ['area', 'world', 'space', 'field'],
  'landscape': ['space', 'market', 'scene', 'world'],
  'ecosystem': ['community', 'network', 'space', 'environment'],
  'empower': ['help', 'enable', 'give tools to', 'support'],
};

// Opening phrases that scream "AI wrote this"
const AI_OPENINGS: Record<string, string[]> = {
  'I hope this email finds you well': [
    'Hey', 'Hi there', 'Quick question for you', 'Hope you\'re having a good week',
    'Reaching out because', '',  // Empty = just remove it
  ],
  'I hope this finds you well': [
    'Hey', 'Hi', 'Quick note', 'Hope your week is going well', '',
  ],
  'I wanted to reach out': [
    'I noticed', 'I came across', 'I saw', 'Just wanted to',
  ],
  'I am writing to': [
    'I\'m reaching out about', 'Just a quick note about', 'Wanted to mention',
  ],
  'I trust this message finds you in good spirits': [
    'Hey', 'Hi', 'Hope you\'re doing well', '',
  ],
};

// Contraction pairs — randomly apply/remove to break uniformity
const CONTRACTIONS: [string, string][] = [
  ['I am', 'I\'m'],
  ['I have', 'I\'ve'],
  ['I will', 'I\'ll'],
  ['I would', 'I\'d'],
  ['we are', 'we\'re'],
  ['we have', 'we\'ve'],
  ['we will', 'we\'ll'],
  ['you are', 'you\'re'],
  ['you have', 'you\'ve'],
  ['you will', 'you\'ll'],
  ['they are', 'they\'re'],
  ['they have', 'they\'ve'],
  ['it is', 'it\'s'],
  ['that is', 'that\'s'],
  ['there is', 'there\'s'],
  ['do not', 'don\'t'],
  ['does not', 'doesn\'t'],
  ['did not', 'didn\'t'],
  ['can not', 'can\'t'],
  ['cannot', 'can\'t'],
  ['will not', 'won\'t'],
  ['would not', 'wouldn\'t'],
  ['should not', 'shouldn\'t'],
  ['is not', 'isn\'t'],
  ['are not', 'aren\'t'],
  ['was not', 'wasn\'t'],
  ['were not', 'weren\'t'],
  ['have not', 'haven\'t'],
  ['has not', 'hasn\'t'],
  ['could not', 'couldn\'t'],
];

/**
 * Apply stylometric variation to email text content.
 * Randomly applies several variation techniques to make AI-generated text
 * look more natural and defeat ISP LLM detection.
 *
 * @param text - Raw email text (before HTML rendering)
 * @param variationLevel - How aggressively to vary (0-1, default 0.5)
 * @returns Varied text that passes AI detection
 */
export function applyStylometricVariation(text: string, variationLevel: number = 0.5): string {
  let result = text;

  // 1. Replace AI-typical words (probability based on variation level)
  result = replaceAiWords(result, variationLevel);

  // 2. Vary AI-typical opening phrases
  result = varyOpenings(result);

  // 3. Randomly toggle contractions (breaks uniformity patterns)
  result = varyContractions(result, variationLevel);

  // 4. Add natural sentence length variation
  result = varySentenceLength(result, variationLevel);

  // 5. Add casual punctuation variation (dashes, ellipses, parentheticals)
  result = addPunctuationVariation(result, variationLevel);

  return result;
}

/**
 * Replace AI-typical vocabulary with more natural alternatives.
 */
function replaceAiWords(text: string, probability: number): string {
  let result = text;

  for (const [aiWord, replacements] of Object.entries(AI_WORD_REPLACEMENTS)) {
    // Create case-insensitive regex with word boundaries
    const regex = new RegExp(`\\b${aiWord}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      if (Math.random() > probability) return match; // Skip some for natural mix
      const replacement = replacements[Math.floor(Math.random() * replacements.length)];
      // Preserve original capitalization
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  return result;
}

/**
 * Replace AI-typical email openings with natural alternatives.
 */
function varyOpenings(text: string): string {
  let result = text;

  for (const [aiOpening, alternatives] of Object.entries(AI_OPENINGS)) {
    if (result.includes(aiOpening)) {
      const replacement = alternatives[Math.floor(Math.random() * alternatives.length)];
      result = result.replace(aiOpening, replacement);
      // Clean up double spaces or leading comma/period after empty replacement
      result = result.replace(/^\s*[.,]\s*/, '').replace(/\s{2,}/g, ' ').trim();
      break; // Only replace one opening
    }
  }

  return result;
}

/**
 * Randomly toggle between contracted and expanded forms.
 * AI text tends to be consistent (all contracted or all expanded) —
 * real humans are inconsistent, mixing "I'm" and "I am" in the same email.
 */
function varyContractions(text: string, probability: number): string {
  let result = text;
  const useContractions = Math.random() > 0.5; // Lean one way per email

  for (const [expanded, contracted] of CONTRACTIONS) {
    if (Math.random() > probability * 0.6) continue; // Only vary some

    if (useContractions) {
      // Expand to contract (but not all — leave ~30% expanded for realism)
      const regex = new RegExp(`\\b${expanded}\\b`, 'gi');
      result = result.replace(regex, (match) => {
        if (Math.random() > 0.7) return match; // Keep some expanded
        return match[0] === match[0].toUpperCase()
          ? contracted.charAt(0).toUpperCase() + contracted.slice(1)
          : contracted;
      });
    } else {
      // Contract to expand (but not all — leave ~30% contracted for realism)
      const escapedContracted = contracted.replace(/'/g, "'");
      const regex = new RegExp(escapedContracted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      result = result.replace(regex, (match) => {
        if (Math.random() > 0.7) return match; // Keep some contracted
        return match[0] === match[0].toUpperCase()
          ? expanded.charAt(0).toUpperCase() + expanded.slice(1)
          : expanded;
      });
    }
  }

  return result;
}

/**
 * Add variation to sentence length by occasionally:
 * - Breaking long sentences with periods
 * - Combining short sentences with dashes or semicolons
 *
 * AI text tends toward uniform ~15-word sentences. Humans vary between
 * 3-word punchy sentences and 30-word run-ons.
 */
function varySentenceLength(text: string, probability: number): string {
  if (Math.random() > probability * 0.4) return text; // Only apply sometimes

  const sentences = text.split(/(?<=[.!?])\s+/);
  if (sentences.length < 3) return text;

  const result: string[] = [];
  let i = 0;

  while (i < sentences.length) {
    const sentence = sentences[i];

    // Occasionally combine two short sentences with a dash or semicolon
    if (
      i < sentences.length - 1 &&
      sentence.split(/\s+/).length < 8 &&
      sentences[i + 1].split(/\s+/).length < 8 &&
      Math.random() < 0.3
    ) {
      const connector = Math.random() > 0.5 ? ' — ' : '; ';
      const nextSentence = sentences[i + 1];
      // Lowercase the start of the second sentence when joining
      const joined = sentence.replace(/[.!?]$/, '') + connector +
        nextSentence.charAt(0).toLowerCase() + nextSentence.slice(1);
      result.push(joined);
      i += 2;
      continue;
    }

    result.push(sentence);
    i++;
  }

  return result.join(' ');
}

/**
 * Add casual punctuation that AI rarely uses:
 * - Em dashes (—) instead of some commas
 * - Parenthetical asides
 * - Occasional ellipses (...)
 *
 * AI text is punctuation-conservative. Humans use varied punctuation.
 */
function addPunctuationVariation(text: string, probability: number): string {
  let result = text;

  // Occasionally replace ", and " or ", but " with " — "
  if (Math.random() < probability * 0.3) {
    result = result.replace(/,\s+(and|but)\s+/i, (match) => {
      if (Math.random() > 0.4) return match; // Only replace some
      return ' — ';
    });
  }

  // Occasionally add "(seriously)" or "(really)" after strong claims
  // This is a very human email pattern that AI almost never produces
  if (Math.random() < probability * 0.15) {
    const asides = ['(seriously)', '(really)', '(no joke)', '(trust me)'];
    const aside = asides[Math.floor(Math.random() * asides.length)];
    // Add after the first period that's not at the very end
    const firstPeriod = result.indexOf('. ');
    if (firstPeriod > 20 && firstPeriod < result.length - 50) {
      result = result.slice(0, firstPeriod + 1) + ' ' + aside + result.slice(firstPeriod + 1);
    }
  }

  return result;
}

/**
 * Analyze text for AI-detection risk factors.
 * Returns a score (0-100) where higher = more likely AI-detected.
 * Use this to check email copy before sending.
 */
export function analyzeAiDetectionRisk(text: string): {
  score: number;
  risk: 'low' | 'medium' | 'high';
  factors: string[];
} {
  const factors: string[] = [];
  let score = 0;

  // Check for AI-typical vocabulary
  let aiWordCount = 0;
  for (const aiWord of Object.keys(AI_WORD_REPLACEMENTS)) {
    const regex = new RegExp(`\\b${aiWord}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) aiWordCount += matches.length;
  }
  if (aiWordCount >= 3) {
    score += 15;
    factors.push(`${aiWordCount} AI-typical words detected (leverage, utilize, etc.)`);
  }

  // Check for AI-typical openings
  for (const opening of Object.keys(AI_OPENINGS)) {
    if (text.includes(opening)) {
      score += 20;
      factors.push(`AI-typical opening: "${opening}"`);
      break;
    }
  }

  // Check sentence length uniformity
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length >= 3) {
    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLen = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLen, 2), 0) / lengths.length;
    const stdDev = Math.sqrt(variance);

    // Low standard deviation = uniform sentence length = AI signal
    if (stdDev < 3 && avgLen > 8) {
      score += 15;
      factors.push(`Uniform sentence length (avg=${avgLen.toFixed(0)}, stddev=${stdDev.toFixed(1)}) — humans vary more`);
    }
  }

  // Check contraction consistency
  let contractionCount = 0;
  let expandedCount = 0;
  for (const [expanded, contracted] of CONTRACTIONS) {
    if (text.includes(contracted)) contractionCount++;
    const expandedRegex = new RegExp(`\\b${expanded}\\b`, 'i');
    if (expandedRegex.test(text)) expandedCount++;
  }
  if ((contractionCount > 0 && expandedCount === 0) || (expandedCount > 3 && contractionCount === 0)) {
    score += 10;
    factors.push('Perfectly consistent contraction usage — humans mix contracted and expanded forms');
  }

  // Check for lack of casual punctuation
  const hasDashes = text.includes('—') || text.includes(' - ');
  const hasParenthetical = /\([^)]{3,}\)/.test(text);
  const hasEllipsis = text.includes('...');
  const hasSemicolon = text.includes(';');

  if (!hasDashes && !hasParenthetical && !hasEllipsis && !hasSemicolon && text.length > 200) {
    score += 10;
    factors.push('No casual punctuation (dashes, parentheticals, ellipses) — AI is punctuation-conservative');
  }

  // Check paragraph regularity
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  if (paragraphs.length >= 3) {
    const paraLengths = paragraphs.map(p => p.split(/[.!?]+/).filter(s => s.trim().length > 0).length);
    const allSame = paraLengths.every(l => Math.abs(l - paraLengths[0]) <= 1);
    if (allSame) {
      score += 10;
      factors.push('All paragraphs have identical sentence count — AI writes very regular structures');
    }
  }

  // Cap at 100
  score = Math.min(100, score);

  return {
    score,
    risk: score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low',
    factors,
  };
}
