'use client';

/**
 * V2Globe — interactive client globe (redesign/v2).
 * cobe renders a dotted WebGL globe. It auto-rotates, drags with the
 * pointer, and flies to a city when one is picked from the list. Marker
 * colour is read from --bb-primary so it follows the palette switcher.
 */

import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { useTranslations } from 'next-intl';
import { clientCities, type ClientCity } from '@/data/client-locations';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [0.15, 0.38, 0.85];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// cobe's own example: angles that put a lat/lng at the centre of the view.
function locationToAngles(lat: number, lng: number): [number, number] {
  return [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
}

export function V2Globe() {
  const t = useTranslations('home');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const focus = useRef<[number, number] | null>(null);
  const pointer = useRef<{ x: number | null; delta: number }>({ x: null, delta: 0 });
  const [palette, setPalette] = useState(0);

  // Rebuild the globe when the palette attribute changes.
  useEffect(() => {
    const obs = new MutationObserver(() => setPalette((n) => n + 1));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--bb-primary') || '#2561d8';
    const accent = hexToRgb(accentHex);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let phi = 0;
    let theta = 0.3;
    let width = 0;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const studios = clientCities.filter((c) => c.studio);
    const berlin = studios[0] ?? clientCities[0];
    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: accent,
      glowColor: [0.06, 0.06, 0.06],
      markers: clientCities.map((c) => ({ location: [c.lat, c.lng], size: c.studio ? 0.07 : 0.045 })),
      arcs: clientCities
        .filter((c) => !c.studio)
        .map((c) => ({ from: [berlin.lat, berlin.lng], to: [c.lat, c.lng] })),
      arcColor: accent,
      arcWidth: 0.6,
      arcHeight: 0.35,
    });

    // cobe v2 has no onRender; drive it with our own frame loop.
    let raf = 0;
    const frame = () => {
      if (focus.current) {
        const [fPhi, fTheta] = focus.current;
        const dPhi = fPhi - phi;
        const dPhiNorm = dPhi - Math.PI * 2 * Math.round(dPhi / (Math.PI * 2));
        phi += dPhiNorm * 0.08;
        theta += (fTheta - theta) * 0.08;
      } else if (!reduce) {
        phi += 0.003;
      }
      phi += pointer.current.delta;
      pointer.current.delta = 0;
      globe.update({ phi, theta, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const fade = requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    return () => {
      cancelAnimationFrame(fade);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      globe.destroy();
    };
  }, [palette]);

  const pick = (i: number, c: ClientCity) => {
    setActive(i);
    focus.current = locationToAngles(c.lat, c.lng);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    pointer.current.x = e.clientX;
    focus.current = null;
    setActive(null);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (pointer.current.x === null) return;
    pointer.current.delta += (e.clientX - pointer.current.x) / 200;
    pointer.current.x = e.clientX;
  };
  const onPointerUp = () => {
    pointer.current.x = null;
  };

  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
          {t('v2_globe_label')}
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="order-2 lg:order-1">
            <h2 className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              {t('v2_globe_title')}
            </h2>
            <p className="mt-4 text-sm text-gray-500">{t('v2_globe_sub')}</p>
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {clientCities.map((c, i) => {
                const on = active === i;
                return (
                  <li key={c.city}>
                    <button
                      type="button"
                      onClick={() => pick(i, c)}
                      aria-pressed={on}
                      className="group grid w-full grid-cols-[1.25rem_1fr_auto] items-baseline gap-4 py-3.5 text-left transition-colors hover:text-white"
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-1 h-2 w-2 self-center rounded-full transition-transform ${
                          on ? 'scale-125 bg-orange-500' : 'bg-orange-500/60 group-hover:bg-orange-500'
                        }`}
                      />
                      <span>
                        <span className={`block text-base ${on ? 'text-white' : 'text-gray-200'}`}>
                          {c.city}
                          <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
                            {c.country}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-sm text-gray-500">
                          {[...(c.team ?? []), ...c.clients].join(' · ') || t('v2_globe_studio')}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-600">
                        {c.studio ? t('v2_globe_team') : t('v2_globe_clients')}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-1 mx-auto w-full max-w-[640px] lg:order-2">
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="aspect-square w-full cursor-grab opacity-0 transition-opacity duration-700 active:cursor-grabbing"
              style={{ contain: 'layout paint size', touchAction: 'pan-y' }}
              aria-label={t('v2_globe_label')}
              role="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
