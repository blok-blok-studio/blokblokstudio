'use client';

import { useEffect, useRef } from 'react';

/**
 * Mouse-tracked radial glow for hero sections. Listens to pointermove inside
 * the parent and updates two CSS custom props (--mx, --my) which drive a
 * subtle warm spotlight gradient. No re-renders — pure CSS variables on the
 * element, so it's cheap even on long pages.
 *
 * Usage: drop this inside any relatively-positioned hero section. It'll
 * fill the parent with `inset-0` and stay below content.
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    const reset = () => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty('--mx', `${r.width / 2}px`);
      el.style.setProperty('--my', `${r.height / 2}px`);
    };

    reset();
    parent.addEventListener('pointermove', move);
    parent.addEventListener('pointerleave', reset);
    return () => {
      parent.removeEventListener('pointermove', move);
      parent.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        background:
          'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(251, 146, 60, 0.08), transparent 60%)',
      }}
    />
  );
}
