'use client';

/**
 * V2Globe — interactive client globe (redesign/v2).
 * react-globe.gl (three.js). Dotted hex continents in the GitHub style, a
 * marker and pulsing ring per city, animated arcs out of Berlin, labels,
 * hover tooltips, click-to-fly, and a city list that drives the same
 * camera. Accent colour follows --bb-primary (the palette switcher).
 * Loaded client-side only; shows a plain fallback where WebGL is missing.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import type { GlobeMethods } from 'react-globe.gl';
import { MeshPhongMaterial } from 'three';
import { clientCities, type ClientCity } from '@/data/client-locations';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type Feature = { type: string; properties: Record<string, unknown>; geometry: unknown };

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function readAccent(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--bb-primary').trim();
  return v || '#2561d8';
}

function withAlpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(37,97,216,${a})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function V2Globe() {
  const t = useTranslations('home');
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [countries, setCountries] = useState<Feature[]>([]);
  const [accent, setAccent] = useState('#2561d8');
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  // Environment: WebGL, accent colour (and palette changes), container size.
  useEffect(() => {
    setWebgl(hasWebGL());
    setAccent(readAccent());
    const obs = new MutationObserver(() => setAccent(readAccent()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette'] });
    const box = boxRef.current;
    const ro = new ResizeObserver(([e]) => setSize(Math.round(e.contentRect.width)));
    if (box) ro.observe(box);
    return () => {
      obs.disconnect();
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch('/data/countries-110m.geojson')
      .then((r) => r.json())
      .then((d) => setCountries(d.features ?? []))
      .catch(() => setCountries([]));
  }, []);

  // Dark matte sphere, no texture.
  const material = useMemo(
    () => new MeshPhongMaterial({ color: '#0c0c0c', emissive: '#050505', shininess: 4 }),
    [],
  );

  const berlin = clientCities.find((c) => c.city === 'Berlin') ?? clientCities[0];
  const arcs = useMemo(
    () =>
      clientCities
        .filter((c) => c !== berlin)
        .map((c) => ({ startLat: berlin.lat, startLng: berlin.lng, endLat: c.lat, endLng: c.lng })),
    [berlin],
  );

  const flyTo = useCallback((c: ClientCity) => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = false;
    g.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.9 }, 1200);
  }, []);

  const pick = (i: number, c: ClientCity) => {
    setActive(i);
    flyTo(c);
  };

  const onReady = () => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.enableZoom = false;
    controls.enablePan = false;
    g.pointOfView({ lat: 32, lng: -30, altitude: 2.1 }, 0);
    setReady(true);
  };

  const resume = () => {
    const g = globeRef.current;
    if (g && active === null) g.controls().autoRotate = true;
  };
  const pause = () => {
    const g = globeRef.current;
    if (g) g.controls().autoRotate = false;
  };

  const tooltip = (d: object) => {
    const c = d as ClientCity;
    const who = [...(c.team ?? []), ...c.clients].join(' · ');
    return `<div style="font-family:var(--font-jbmono),monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,.85);border:1px solid rgba(255,255,255,.15);padding:8px 10px;border-radius:8px;white-space:nowrap">${c.city}${who ? `<div style="margin-top:4px;color:#9ca3af;letter-spacing:0;text-transform:none;font-family:inherit">${who}</div>` : ''}</div>`;
  };

  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
          {t('v2_globe_label')}
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
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

          <div
            ref={boxRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            className="order-1 relative mx-auto aspect-square w-full max-w-[720px] lg:order-2"
          >
            {/* Placeholder ring until the scene is ready */}
            <div
              aria-hidden="true"
              className={`absolute inset-[6%] rounded-full border border-white/10 transition-opacity duration-700 ${
                ready ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {webgl === false && (
              <div className="absolute inset-0 flex items-center justify-center p-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                WebGL is off in this browser. The cities are listed beside.
              </div>
            )}
            {webgl && size > 0 && (
              <div className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
                <Globe
                  ref={globeRef}
                  width={size}
                  height={size}
                  backgroundColor="rgba(0,0,0,0)"
                  rendererConfig={{ antialias: true, alpha: true }}
                  animateIn={false}
                  onGlobeReady={onReady}
                  globeMaterial={material}
                  showAtmosphere
                  atmosphereColor={accent}
                  atmosphereAltitude={0.16}
                  hexPolygonsData={countries}
                  hexPolygonResolution={3}
                  hexPolygonMargin={0.62}
                  hexPolygonUseDots
                  hexPolygonColor={() => 'rgba(255,255,255,0.5)'}
                  hexPolygonAltitude={0.002}
                  pointsData={clientCities}
                  pointLat="lat"
                  pointLng="lng"
                  pointColor={() => accent}
                  pointAltitude={0.012}
                  pointRadius={(d: object) => ((d as ClientCity).studio ? 0.8 : 0.6)}
                  pointLabel={tooltip}
                  onPointClick={(d: object) => {
                    const c = d as ClientCity;
                    pick(clientCities.indexOf(c), c);
                  }}
                  ringsData={clientCities}
                  ringLat="lat"
                  ringLng="lng"
                  ringColor={() => (tt: number) => withAlpha(accent, Math.max(0, 1 - tt))}
                  ringMaxRadius={(d: object) => ((d as ClientCity).studio ? 4 : 3)}
                  ringPropagationSpeed={1.4}
                  ringRepeatPeriod={1400}
                  arcsData={arcs}
                  arcColor={() => [withAlpha(accent, 0.9), withAlpha(accent, 0.15)]}
                  arcAltitudeAutoScale={0.4}
                  arcStroke={0.45}
                  arcDashLength={0.45}
                  arcDashGap={0.6}
                  arcDashAnimateTime={3200}
                  labelsData={clientCities}
                  labelLat="lat"
                  labelLng="lng"
                  labelText="city"
                  labelSize={1.4}
                  labelDotRadius={0}
                  labelAltitude={0.014}
                  labelColor={() => 'rgba(255,255,255,0.85)'}
                  labelResolution={3}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
