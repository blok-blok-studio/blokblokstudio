#!/usr/bin/env node
/**
 * i18n-check.mjs — verifies one locale against English.
 *   node scripts/i18n-check.mjs fr
 * Checks src/messages/<loc>.json (key parity, ICU placeholders, array lengths,
 * untranslated English) and src/data/i18n/<loc>.ts (shape, metric counts,
 * transcript paragraphs, markdown headings and links). Exit 1 on errors.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const loc = process.argv[2];
if (!loc) { console.error('usage: node scripts/i18n-check.mjs <locale>'); process.exit(2); }
const errors = [], warns = [];

// Proper nouns and codes that legitimately stay identical to English.
const KEEP = /^(Blok Blok|BLOK BLOK|Blog|Studio|Journal|Team|Berlin|Virginia|Los Angeles|WhatsApp|Instagram|LinkedIn|GitHub|TikTok|Google|Meta|Stripe|Next\.js|React|Vercel|Impressum|Name|Email|E-mail|Design|Branding|Marketing|SaaS|Social Media|Coach|Bronco|Kofi|Luki|Chase|Kyle|Bridget|Yahya|Ayan|Parsons|Punjab|Virginia Commonwealth|Creative Advertising|Senior|Full Stack|Video Editor|Creative Director|https?:|\{|[\d\s.,+%$€:/·-]*$)/i;

// Arrays are kept as a whole (for length checks) AND flattened per index
// (so an English item inside an otherwise translated array is caught).
function flat(o, p = '', out = {}) {
  for (const [k, v] of Object.entries(o)) {
    const kk = p ? `${p}.${k}` : k;
    if (Array.isArray(v)) {
      out[kk] = v;
      v.forEach((item, i) => {
        if (item && typeof item === 'object') flat(item, `${kk}[${i}]`, out);
        else out[`${kk}[${i}]`] = item;
      });
    } else if (v && typeof v === 'object') flat(v, kk, out);
    else out[kk] = v;
  }
  return out;
}
// Machine identifiers inside arrays (faq category ids, package ids, hrefs) are not copy.
const ID_KEY = /\.(category|id|slug|href|key|icon|value|code)$/;
const icu = (s) => (String(s).match(/\{[a-zA-Z_]+/g) || []).sort().join(',');

// ── messages ──
const en = flat(JSON.parse(readFileSync(`${ROOT}/src/messages/en.json`, 'utf8')));
let msgs;
try { msgs = flat(JSON.parse(readFileSync(`${ROOT}/src/messages/${loc}.json`, 'utf8'))); }
catch (e) { errors.push(`messages: ${e.message}`); }
if (msgs) {
  let identical = 0;
  for (const [k, v] of Object.entries(en)) {
    if (!(k in msgs)) { if (!/\]$|\]\./.test(k)) errors.push(`messages: missing key ${k}`); continue; }
    const t = msgs[k];
    if (Array.isArray(v)) {
      if (!Array.isArray(t) || t.length !== v.length) errors.push(`messages: ${k} must be an array of ${v.length}`);
      else if (JSON.stringify(t) === JSON.stringify(v)) { identical++; warns.push(`messages: ${k} still English (array)`); }
      continue;
    }
    if (typeof v === 'string') {
      if (typeof t !== 'string') { errors.push(`messages: ${k} must be a string`); continue; }
      if (icu(v) !== icu(t)) errors.push(`messages: ${k} placeholders differ (en ${icu(v) || 'none'} vs ${icu(t) || 'none'})`);
      if (t === v && v.length > 3 && !KEEP.test(v) && !ID_KEY.test(k) && loc !== 'en') { identical++; warns.push(`messages: ${k} still English: "${v.slice(0, 50)}"`); }
      if (/—/.test(t)) warns.push(`messages: ${k} contains an em dash`);
    }
  }
  for (const k of Object.keys(msgs)) if (!(k in en)) warns.push(`messages: extra key ${k} (not in en)`);
  if (identical > 25) errors.push(`messages: ${identical} strings are still English (limit 25; proper nouns excluded)`);
}

// ── data bundle ──
const enB = (await import(pathToFileURL(`${ROOT}/src/data/i18n/en.ts`).href)).en;
let b;
const bundleSrc = readFileSync(`${ROOT}/src/data/i18n/${loc}.ts`, 'utf8');
if (/from '\.\/en'/.test(bundleSrc)) errors.push('bundle: still the placeholder that re-exports en; write the full translation');
else try {
  const mod = await import(pathToFileURL(`${ROOT}/src/data/i18n/${loc}.ts`).href);
  b = mod[loc === 'zh-TW' ? 'zhTW' : loc];
  if (!b) errors.push(`bundle: ${loc}.ts must export const ${loc === 'zh-TW' ? 'zhTW' : loc}`);
} catch (e) { errors.push(`bundle: ${e.message}`); }
if (b) {
  if (b === enB) errors.push('bundle: still re-exports en (placeholder file)');
  const eb = flat(enB), lb = flat(b);
  let same = 0;
  for (const [k, v] of Object.entries(eb)) {
    if (!(k in lb)) { if (!/\]$|\]\./.test(k)) errors.push(`bundle: missing ${k}`); continue; }
    const t = lb[k];
    if (Array.isArray(v) && (!Array.isArray(t) || t.length !== v.length)) errors.push(`bundle: ${k} must have ${v.length} items`);
    if (typeof v === 'string') {
      if (typeof t !== 'string') { errors.push(`bundle: ${k} must be a string`); continue; }
      // en.ts carries the webdesign-berlin page in German, so identical German text is expected for de.
      const nativeGerman = loc === 'de' && k.startsWith('specialties.webdesign-berlin.');
      if (t === v && v.length > 3 && !KEEP.test(v) && !ID_KEY.test(k) && !nativeGerman && loc !== 'en') { same++; warns.push(`bundle: ${k} still English`); }
      if (/\.transcript$|\.content$/.test(k)) {
        const paras = (s) => s.trim().split(/\n\s*\n/).length;
        if (k.endsWith('.content')) {
          const heads = (s) => (s.match(/^#{2,3} /gm) || []).length;
          const links = (s) => (s.match(/\]\(([^)]+)\)/g) || []).sort().join('|');
          if (heads(t) !== heads(v)) errors.push(`bundle: ${k} heading count ${heads(t)} vs en ${heads(v)}`);
          if (links(t) !== links(v)) errors.push(`bundle: ${k} link targets differ from en`);
        } else if (paras(t) !== paras(v)) errors.push(`bundle: ${k} paragraph count ${paras(t)} vs en ${paras(v)}`);
      }
      if (/—/.test(t)) warns.push(`bundle: ${k} contains an em dash`);
    }
  }
  if (!/^[\p{L}\p{M}\p{N}\p{P}\s+$€%]+$/u.test(b.consent) || b.consent.length < 40) warns.push('bundle: consent sentence looks off');
  if (same > 10) errors.push(`bundle: ${same} fields are still English (limit 10)`);
}

for (const w of warns) console.log('warn ', w);
for (const e of errors) console.log('ERROR', e);
console.log(`${loc}: ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
