'use client';

/**
 * PaletteSwitcher — facelift/palettes branch only.
 *
 * Floating pill that flips the whole site between the two rebrand
 * candidates (Blue, Green) and the current orange for reference. Writes
 * `data-palette` on <html>; globals.css remaps every orange-* token from it.
 * The choice persists in localStorage and can be forced with ?palette=green
 * so a link opens straight into one version.
 */

import { useEffect, useState } from 'react';

export type PaletteId = 'blue' | 'green' | 'current';

type Swatch = {
  name: string;
  hex: string;
  /** CSS variables this swatch drives, for live hex editing. */
  vars: (hex: string) => Record<string, string>;
};

const mix = (hex: string, pct: number, to: 'white' | 'black') =>
  `color-mix(in srgb, ${hex} ${pct}%, ${to})`;
const BLACK: Swatch = { name: 'Black', hex: '#0F0F0F', vars: (h) => ({ '--color-black': h }) };
const WHITE: Swatch = { name: 'White', hex: '#FFFFFF', vars: (h) => ({ '--color-white': h, '--bb-team': h }) };

export const PALETTES: Record<PaletteId, { label: string; swatches: Swatch[] }> = {
  blue: {
    label: 'Blue',
    swatches: [
      {
        name: 'Blue 1',
        hex: '#2561D8',
        vars: (h) => ({
          '--bb-primary': h,
          '--bb-client': h,
          '--bb-tint-400': mix(h, 72, 'white'),
          '--bb-tint-300': mix(h, 55, 'white'),
        }),
      },
      {
        name: 'Blue 2',
        hex: '#020887',
        vars: (h) => ({ '--bb-deep': h, '--bb-primary-hover': h, '--bb-dark-950': mix(h, 55, 'black') }),
      },
      { name: 'Gray', hex: '#DDDDDD', vars: (h) => ({ '--bb-gray-300': h, '--bb-panel': h }) },
      BLACK,
      WHITE,
    ],
  },
  green: {
    label: 'Green',
    swatches: [
      {
        name: 'Lime',
        hex: '#A5CF4F',
        vars: (h) => ({
          '--bb-primary': h,
          '--bb-client': h,
          '--bb-tint-400': mix(h, 85, 'white'),
          '--bb-tint-300': mix(h, 70, 'white'),
          '--bb-primary-hover': mix(h, 85, 'white'),
        }),
      },
      { name: 'Turf', hex: '#0F8743', vars: (h) => ({ '--bb-deep': h }) },
      { name: 'Terminal', hex: '#173320', vars: (h) => ({ '--bb-dark-950': h }) },
      BLACK,
      WHITE,
    ],
  },
  current: {
    label: 'Current',
    swatches: [
      {
        name: 'Orange',
        hex: '#F97316',
        vars: (h) => ({
          '--bb-primary': h,
          '--bb-client': h,
          '--bb-tint-400': mix(h, 75, 'white'),
          '--bb-tint-300': mix(h, 55, 'white'),
          '--bb-primary-hover': mix(h, 75, 'white'),
          '--bb-deep': mix(h, 85, 'black'),
        }),
      },
      BLACK,
      WHITE,
    ],
  },
};

/** Live hex overrides, per palette: { blue: { 'Blue 1': '#ff0000' } } */
type Overrides = Partial<Record<PaletteId, Record<string, string>>>;
const HEX_KEY = 'bb-palette-hex';
const HEX_RE = /^#[0-9a-f]{6}$/i;
// Every variable any swatch can set, so switching palettes clears them all.
const ALL_VARS = Array.from(
  new Set(Object.values(PALETTES).flatMap((p) => p.swatches.flatMap((s) => Object.keys(s.vars(s.hex))))),
);

function applyOverrides(id: PaletteId, edits: Record<string, string> = {}) {
  const st = document.documentElement.style;
  ALL_VARS.forEach((v) => st.removeProperty(v));
  for (const s of PALETTES[id].swatches) {
    const hex = edits[s.name];
    if (hex && HEX_RE.test(hex)) {
      for (const [k, val] of Object.entries(s.vars(hex))) st.setProperty(k, val);
    }
  }
}

/** ?hex=ff0000,,00ff00 — one slot per swatch of the active palette, blank = default. */
function editsFromQuery(id: PaletteId, q: string | null): Record<string, string> | null {
  if (!q) return null;
  const out: Record<string, string> = {};
  q.split(',').forEach((v, i) => {
    const s = PALETTES[id].swatches[i];
    if (s && HEX_RE.test(`#${v}`)) out[s.name] = `#${v.toUpperCase()}`;
  });
  return out;
}

function editsToQuery(id: PaletteId, edits: Record<string, string> = {}): string {
  const parts = PALETTES[id].swatches.map((s) => (edits[s.name] ? edits[s.name].slice(1) : ''));
  return parts.some(Boolean) ? parts.join(',').replace(/,+$/, '') : '';
}

const STORAGE_KEY = 'bb-palette';
const ORDER: PaletteId[] = ['blue', 'green', 'current'];

function isPalette(v: string | null): v is PaletteId {
  return v === 'blue' || v === 'green' || v === 'current';
}

export function PaletteSwitcher() {
  const [palette, setPalette] = useState<PaletteId>('blue');
  const [open, setOpen] = useState(false);
  // The pill is a review tool: shown on previews and localhost, hidden on the
  // live domain. `?palette=` still works everywhere via the boot script.
  const [hidden, setHidden] = useState(true);
  const [overrides, setOverrides] = useState<Overrides>({});
  // Text being typed in each hex field, so half-typed values don't apply.
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const syncUrl = (id: PaletteId, all: Overrides) => {
    const url = new URL(window.location.href);
    url.searchParams.set('palette', id);
    const q = editsToQuery(id, all[id]);
    if (q) url.searchParams.set('hex', q);
    else url.searchParams.delete('hex');
    window.history.replaceState(null, '', url.toString());
  };

  const saveOverrides = (id: PaletteId, next: Overrides) => {
    setOverrides(next);
    applyOverrides(id, next[id]);
    try {
      localStorage.setItem(HEX_KEY, JSON.stringify(next));
    } catch {}
    syncUrl(id, next);
  };

  // Re-derive the choice on mount and re-apply it. The boot script in
  // layout.tsx already set it before paint, but a hydration re-render of
  // <html> can drop the attribute, so the client owns it from here on.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('palette');
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const id: PaletteId = isPalette(q) ? q : isPalette(stored) ? stored : 'blue';
    setPalette(id);
    document.documentElement.setAttribute('data-palette', id);
    setHidden(/(^|\.)blokblokstudio\.com$/.test(window.location.hostname));

    let saved: Overrides = {};
    try {
      saved = JSON.parse(localStorage.getItem(HEX_KEY) || '{}') || {};
    } catch {}
    // A shared ?hex= link wins over what this browser had saved.
    const fromUrl = editsFromQuery(id, new URLSearchParams(window.location.search).get('hex'));
    if (fromUrl) {
      saved = { ...saved, [id]: fromUrl };
      try {
        localStorage.setItem(HEX_KEY, JSON.stringify(saved));
      } catch {}
    }
    setOverrides(saved);
    applyOverrides(id, saved[id]);
  }, []);

  const apply = (id: PaletteId) => {
    setPalette(id);
    setDrafts({});
    document.documentElement.setAttribute('data-palette', id);
    applyOverrides(id, overrides[id]);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
    syncUrl(id, overrides);
  };

  const setHex = (name: string, hex: string) => {
    const s = PALETTES[palette].swatches.find((x) => x.name === name);
    const edits = { ...(overrides[palette] || {}) };
    if (!s || hex.toUpperCase() === s.hex.toUpperCase()) delete edits[name];
    else edits[name] = hex.toUpperCase();
    saveOverrides(palette, { ...overrides, [palette]: edits });
  };

  const onType = (name: string, raw: string) => {
    const v = raw.trim();
    setDrafts((d) => ({ ...d, [name]: v }));
    const hex = v.startsWith('#') ? v : `#${v}`;
    if (HEX_RE.test(hex)) setHex(name, hex);
  };

  const resetPalette = () => {
    setDrafts({});
    const next = { ...overrides };
    delete next[palette];
    saveOverrides(palette, next);
  };

  const active = PALETTES[palette];
  const edits = overrides[palette] || {};
  const edited = Object.keys(edits).length > 0;

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1100] flex flex-col items-center gap-2 font-sans"
      dir="ltr"
    >
      {open && (
        <div className="rounded-2xl border border-white/10 bg-gray-950/95 p-4 shadow-2xl backdrop-blur-md w-[280px]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              {active.label} palette{edited ? ' (edited)' : ''}
            </p>
            <button
              type="button"
              onClick={resetPalette}
              disabled={!edited && Object.keys(drafts).length === 0}
              className="text-[11px] text-gray-400 underline underline-offset-2 hover:text-white disabled:cursor-default disabled:no-underline disabled:opacity-40 disabled:hover:text-gray-400"
            >
              Reset {active.label}
            </button>
          </div>
          <ul className="space-y-2">
            {active.swatches.map((s) => {
              const hex = edits[s.name] || s.hex;
              const draft = drafts[s.name];
              const bad = draft !== undefined && !HEX_RE.test(draft.startsWith('#') ? draft : `#${draft}`);
              return (
                <li key={s.name} className="flex items-center gap-3">
                  <label
                    className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/15"
                    style={{ background: hex }}
                    title={`Pick ${s.name}`}
                  >
                    <input
                      type="color"
                      value={hex.toLowerCase()}
                      onChange={(e) => {
                        setDrafts((d) => {
                          const n = { ...d };
                          delete n[s.name];
                          return n;
                        });
                        setHex(s.name, e.target.value);
                      }}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      aria-label={`${s.name} color picker`}
                    />
                  </label>
                  <span className="text-sm text-white">{s.name}</span>
                  <input
                    type="text"
                    value={draft ?? hex}
                    onChange={(e) => onType(s.name, e.target.value)}
                    onBlur={() =>
                      setDrafts((d) => {
                        const n = { ...d };
                        delete n[s.name];
                        return n;
                      })
                    }
                    maxLength={7}
                    spellCheck={false}
                    aria-label={`${s.name} hex code`}
                    className={`ml-auto w-[84px] rounded-md border bg-black/40 px-2 py-1 text-right font-mono text-xs text-gray-200 outline-none focus:border-white/40 ${
                      bad ? 'border-red-500/70' : edits[s.name] ? 'border-white/30' : 'border-white/10'
                    }`}
                  />
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[11px] leading-snug text-gray-500">
            Click a swatch or type a hex code to change it live. Edits stick across pages,
            and the page link carries them, so you can copy the address bar to share this exact version.
          </p>
        </div>
      )}

      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-gray-950/95 p-1 shadow-2xl backdrop-blur-md">
        {ORDER.map((id) => {
          const on = id === palette;
          const dot = PALETTES[id].swatches[0].hex;
          return (
            <button
              key={id}
              type="button"
              onClick={() => apply(id)}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                on ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full border border-black/20"
                style={{ background: dot }}
              />
              <span className="hidden sm:inline">{PALETTES[id].label}</span>
              <span className="sr-only sm:hidden">{PALETTES[id].label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Show hex codes"
          className="ml-1 rounded-full px-2.5 py-1.5 font-mono text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          #
        </button>
      </div>
    </div>
  );
}

/** Runs before hydration so the chosen palette is on <html> at first paint. */
export const PALETTE_BOOT_SCRIPT = `(function(){try{var q=new URLSearchParams(location.search).get('palette');var s=localStorage.getItem('${STORAGE_KEY}');var p=q||s||'blue';if(p!=='blue'&&p!=='green'&&p!=='current')p='blue';document.documentElement.setAttribute('data-palette',p);if(q)localStorage.setItem('${STORAGE_KEY}',p);}catch(e){document.documentElement.setAttribute('data-palette','blue');}})();`;
