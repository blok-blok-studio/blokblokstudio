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

/** Resolve any CSS colour value (including color-mix) to an rgb() string. */
function resolveColor(value: string, fallback: string): string {
  if (!value) return fallback;
  const el = document.createElement('span');
  el.style.color = value;
  el.style.display = 'none';
  document.body.appendChild(el);
  const out = getComputedStyle(el).color;
  el.remove();
  return out || fallback;
}

function readPalette(): { team: string; client: string; accent: string } {
  const cs = getComputedStyle(document.documentElement);
  return {
    team: resolveColor(cs.getPropertyValue('--bb-team').trim(), 'rgb(255, 255, 255)'),
    client: resolveColor(cs.getPropertyValue('--bb-client').trim(), 'rgb(37, 97, 216)'),
    accent: resolveColor(cs.getPropertyValue('--bb-primary').trim(), 'rgb(37, 97, 216)'),
  };
}

function withAlpha(rgb: string, a: number): string {
  const m = rgb.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (!m) return `rgba(37,97,216,${a})`;
  return `rgba(${m[1]},${m[2]},${m[3]},${a})`;
}

export function V2Globe() {
  const t = useTranslations('home');
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [countries, setCountries] = useState<Feature[]>([]);
  const [colors, setColors] = useState({ team: 'rgb(255, 255, 255)', client: 'rgb(37, 97, 216)', accent: 'rgb(37, 97, 216)' });
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [alt, setAlt] = useState(2.1);

  // Environment: WebGL, accent colour (and palette changes), container size.
  useEffect(() => {
    setWebgl(hasWebGL());
    setColors(readPalette());
    const obs = new MutationObserver(() => setColors(readPalette()));
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
    () => new MeshPhongMaterial({ color: '#000000', emissive: '#000000', specular: '#050505', shininess: 2 }),
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

  const zoomScale = Math.min(1, Math.max(0.06, Math.pow(alt / 2.1, 1.6)));
  const colorOf = useCallback((d: object) => ((d as ClientCity).studio ? colors.team : colors.client), [colors]);

  const visibleLabels = useMemo(
    () => clientCities.filter((c) => c.labelMaxAlt === undefined || alt < c.labelMaxAlt),
    [alt],
  );

  // Screen-space label: fixed pixel size, anchored to one side of the marker.
  // The outer div is positioned by three's CSS2DRenderer (it overwrites that
  // element's transform every frame), so the anchor offset lives on an inner
  // span the renderer never touches.
  const makeLabel = useCallback((d: object) => {
    const c = d as ClientCity;
    const outer = document.createElement('div');
    outer.style.pointerEvents = 'none';
    const inner = document.createElement('span');
    inner.textContent = c.city;
    if (c.tag) {
      const badge = document.createElement('span');
      badge.textContent = c.tag;
      badge.style.cssText = 'margin-left:6px;padding:2px 5px;border-radius:4px;font-size:9px;font-weight:600;letter-spacing:.12em;vertical-align:1px;color:#000;background:var(--bb-primary);';
      inner.appendChild(badge);
    }
    const anchor = c.labelAnchor ?? 'right';
    const shift =
      anchor === 'left' ? 'translate(calc(-100% - 12px), -50%)'
      : anchor === 'top' ? 'translate(-50%, calc(-100% - 12px))'
      : anchor === 'bottom' ? 'translate(-50%, 12px)'
      : 'translate(12px, -50%)';
    inner.style.cssText = `position:absolute;left:0;top:0;transform:${shift};font-family:var(--font-inter),Inter,sans-serif;font-size:12px;line-height:1;letter-spacing:.02em;color:rgba(255,255,255,.92);text-shadow:0 1px 6px rgba(0,0,0,.9);white-space:nowrap;`;
    outer.appendChild(inner);
    return outer;
  }, []);

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

  // onGlobeReady proved unreliable (it can fire before React attaches the
  // ref, or not at all with waitForGlobeReady off), so configuration does
  // not depend on it. Once the Globe is rendered, poll for the ref and set
  // up controls and camera the moment it exists.
  const mounted = webgl === true && size > 0;
  useEffect(() => {
    if (!mounted) return;
    let tries = 0;
    const id = window.setInterval(() => {
      const g = globeRef.current;
      tries += 1;
      if (g) {
        window.clearInterval(id);
        const controls = g.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.55;
        // Zoom with wheel or pinch, kept between a city-level close-up and
        // the default framing. Globe radius is 100 in globe.gl units.
        controls.enableZoom = true;
        controls.zoomSpeed = 0.6;
        controls.minDistance = 150;
        controls.maxDistance = 340;
        controls.enablePan = false;
        g.pointOfView({ lat: 32, lng: -30, altitude: 2.1 }, 0);
        // Track camera altitude (rounded) so dense labels can hide when far out.
        controls.addEventListener('change', () => {
          const a = g.pointOfView().altitude;
          setAlt((prev) => (Math.abs(prev - a) > 0.05 ? a : prev));
        });
        setReady(true);
      } else if (tries > 200) {
        window.clearInterval(id);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [mounted]);

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
    return `<div style="font-family:var(--font-inter),Inter,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,.85);border:1px solid rgba(255,255,255,.15);padding:8px 10px;border-radius:8px;white-space:nowrap">${c.city}${who ? `<div style="margin-top:4px;color:#9ca3af;letter-spacing:0;text-transform:none;font-family:inherit">${who}</div>` : ''}</div>`;
  };

  return (
    <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          {t('v2_globe_label')}
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="max-w-xl text-3xl font-display font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
              {t('v2_globe_title')}
            </h2>
            <p className="mt-4 text-sm text-gray-500">{t('v2_globe_sub')}</p>
            <div className="mt-6 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-gray-400">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--bb-team)' }} />
                {t('v2_globe_team')}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--bb-client)' }} />
                {t('v2_globe_clients')}
              </span>
            </div>
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
                        className={`mt-1 h-2 w-2 self-center rounded-full transition-transform ${on ? 'scale-125' : 'opacity-70 group-hover:opacity-100'}`}
                        style={{ background: c.studio ? 'var(--bb-team)' : 'var(--bb-client)' }}
                      />
                      <span>
                        <span className={`block text-base ${on ? 'text-white' : 'text-gray-200'}`}>
                          {c.city}
                          {c.tag && (
                            <span className="ml-2 rounded px-1.5 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-[0.12em] text-black" style={{ background: 'var(--bb-primary)' }}>
                              {c.tag}
                            </span>
                          )}
                          <span className="ml-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                            {c.country}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-sm text-gray-500">
                          {[...(c.team ?? []), ...c.clients].join(' · ') || t('v2_globe_studio')}
                        </span>
                      </span>
                      <span
                        className="text-[11px] uppercase tracking-[0.18em]"
                        style={{ color: c.studio ? 'var(--bb-team)' : 'var(--bb-client)' }}
                      >
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
            style={{
              // Circular fade so the square canvas never reads as a box, at any zoom.
              WebkitMaskImage: 'radial-gradient(circle closest-side, #000 70%, transparent 100%)',
              maskImage: 'radial-gradient(circle closest-side, #000 70%, transparent 100%)',
            }}
          >
            {/* Placeholder ring until the scene is ready */}
            <div
              aria-hidden="true"
              className={`absolute inset-[6%] rounded-full border border-white/10 transition-opacity duration-700 ${
                ready ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {webgl === false && (
              <div className="absolute inset-0 flex items-center justify-center p-10 text-center text-[11px] uppercase tracking-[0.2em] text-gray-500">
                WebGL is off in this browser. The cities are listed beside.
              </div>
            )}
            {webgl && size > 0 && (
              <div>
                <Globe
                  ref={globeRef}
                  width={size}
                  height={size}
                  backgroundColor="rgba(0,0,0,0)"
                  rendererConfig={{ antialias: true, alpha: true }}
                  animateIn={false}
                  waitForGlobeReady={false}
                  globeMaterial={material}
                  showAtmosphere
                  atmosphereColor={colors.accent}
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
                  pointColor={colorOf}
                  pointAltitude={0.02}
                  pointRadius={(d: object) => ((d as ClientCity).studio ? 1.3 : 1.1) * zoomScale}
                  pointLabel={tooltip}
                  onPointClick={(d: object) => {
                    const c = d as ClientCity;
                    pick(clientCities.indexOf(c), c);
                  }}
                  ringsData={clientCities}
                  ringLat="lat"
                  ringLng="lng"
                  ringColor={(d: object) => (tt: number) => withAlpha(colorOf(d), Math.max(0, 1 - tt))}
                  ringMaxRadius={(d: object) => ((d as ClientCity).studio ? 5 : 4) * zoomScale}
                  ringPropagationSpeed={1.4}
                  ringRepeatPeriod={1400}
                  arcsData={arcs}
                  arcColor={() => [withAlpha(colors.team, 0.9), withAlpha(colors.client, 0.9)]}
                  arcAltitudeAutoScale={0.4}
                  arcStroke={0.45 * Math.max(0.5, zoomScale)}
                  arcDashLength={0.45}
                  arcDashGap={0.6}
                  arcDashAnimateTime={3200}
                  htmlElementsData={visibleLabels}
                  htmlLat="lat"
                  htmlLng="lng"
                  htmlAltitude={0.012}
                  htmlElement={makeLabel}
                  htmlElementVisibilityModifier={(el: HTMLElement, visible: boolean) => {
                    el.style.opacity = visible ? '1' : '0';
                  }}
                  htmlTransitionDuration={0}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
