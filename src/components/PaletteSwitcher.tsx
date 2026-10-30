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

export const PALETTES: Record<
  PaletteId,
  { label: string; swatches: { name: string; hex: string }[] }
> = {
  blue: {
    label: 'Blue',
    swatches: [
      { name: 'Blue 1', hex: '#2561D8' },
      { name: 'Blue 2', hex: '#020887' },
      { name: 'Gray', hex: '#DDDDDD' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
  },
  green: {
    label: 'Green',
    swatches: [
      { name: 'Lime', hex: '#A5CF4F' },
      { name: 'Turf', hex: '#0F8743' },
      { name: 'Terminal', hex: '#173320' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
  },
  current: {
    label: 'Current',
    swatches: [
      { name: 'Orange', hex: '#F97316' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
  },
};

const STORAGE_KEY = 'bb-palette';
const ORDER: PaletteId[] = ['blue', 'green', 'current'];

function isPalette(v: string | null): v is PaletteId {
  return v === 'blue' || v === 'green' || v === 'current';
}

export function PaletteSwitcher() {
  const [palette, setPalette] = useState<PaletteId>('blue');
  const [open, setOpen] = useState(false);

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
  }, []);

  const apply = (id: PaletteId) => {
    setPalette(id);
    document.documentElement.setAttribute('data-palette', id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set('palette', id);
    window.history.replaceState(null, '', url.toString());
  };

  const active = PALETTES[palette];

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1100] flex flex-col items-center gap-2 font-sans"
      dir="ltr"
    >
      {open && (
        <div className="rounded-2xl border border-white/10 bg-gray-950/95 p-4 shadow-2xl backdrop-blur-md w-[260px]">
          <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-3">
            {active.label} palette
          </p>
          <ul className="space-y-2">
            {active.swatches.map((s) => (
              <li key={s.hex} className="flex items-center gap-3">
                <span
                  className="h-7 w-7 shrink-0 rounded-md border border-white/15"
                  style={{ background: s.hex }}
                />
                <span className="text-sm text-white">{s.name}</span>
                <span className="ml-auto font-mono text-xs text-gray-400">{s.hex}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-snug text-gray-500">
            Pick a palette, then browse any page. Your choice sticks across pages.
            Share a version with <span className="font-mono">?palette={palette}</span>.
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
              {PALETTES[id].label}
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
