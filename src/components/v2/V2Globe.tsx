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
import { clientCities, type ClientCity, type ClientLink, type TeamMember } from '@/data/client-locations';

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
  const [pov, setPov] = useState<{ lat: number; lng: number }>({ lat: 32, lng: -30 });

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
  const pointRadius = useCallback((d: object) => ((d as ClientCity).studio ? 1.3 : 1.1) * zoomScale, [zoomScale]);
  const ringMaxRadius = useCallback((d: object) => ((d as ClientCity).studio ? 5 : 4) * zoomScale, [zoomScale]);
  const ringColor = useCallback((d: object) => (tt: number) => withAlpha(colorOf(d), Math.max(0, 1 - tt)), [colorOf]);
  const arcColor = useCallback(() => [withAlpha(colors.team, 0.9), withAlpha(colors.client, 0.9)], [colors]);
  const hexColor = useCallback(() => 'rgba(255,255,255,0.5)', []);

  // When zoomed in, only the city nearest the centre of view expands into a card.
  const focusCity = useMemo(() => {
    if (alt >= 1.15) return null;
    const rad = Math.PI / 180;
    let best: ClientCity | null = null;
    let bestD = Infinity;
    for (const c of clientCities) {
      const dLat = (c.lat - pov.lat) * rad;
      const dLng = (c.lng - pov.lng) * rad;
      const d = Math.hypot(dLat, dLng * Math.cos(pov.lat * rad));
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    return best;
  }, [alt, pov]);
  const visibleSet = clientCities
    .filter((c) => c.labelMaxAlt === undefined || alt < c.labelMaxAlt || c === focusCity)
    .map((c) => c.city)
    .join('|');
  const visibleLabels = useMemo(
    () =>
      clientCities
        .filter((c) => visibleSet.split('|').includes(c.city))
        .map((c) => ({ ...c, expanded: c === focusCity })),
    [visibleSet, focusCity],
  );

  // Screen-space label: fixed pixel size, anchored to one side of the marker.
  // The outer div is positioned by three's CSS2DRenderer (it overwrites that
  // element's transform every frame), so the anchor offset lives on an inner
  // span the renderer never touches.
  const makeLabel = useCallback((d: object) => {
    const c = d as ClientCity & { expanded?: boolean };
    const outer = document.createElement('div');
    outer.style.pointerEvents = 'none';
    const inner = document.createElement('div');
    const anchor = c.labelAnchor ?? 'right';
    const shift =
      anchor === 'left' ? 'translate(calc(-100% - 12px), -50%)'
      : anchor === 'top' ? 'translate(-50%, calc(-100% - 12px))'
      : anchor === 'bottom' ? 'translate(-50%, 12px)'
      : 'translate(12px, -50%)';
    const font = 'font-family:var(--font-inter),Inter,sans-serif;';
    const title = document.createElement('div');
    title.textContent = c.city + (c.region ? `, ${c.region}` : '');
    title.style.cssText = `${font}font-size:12px;line-height:1;letter-spacing:.02em;color:#fff;white-space:nowrap;`;
    if (c.tag) {
      const badge = document.createElement('span');
      badge.textContent = c.tag;
      badge.style.cssText = 'margin-left:6px;padding:2px 5px;border-radius:4px;font-size:9px;font-weight:600;letter-spacing:.12em;vertical-align:1px;color:#000;background:var(--bb-primary);';
      title.appendChild(badge);
    }
    if (!c.expanded) inner.appendChild(title);
    if (c.expanded) {
      // Zoomed in: the label becomes a card listing who is here.
      const group = (label: string, rows: string[][], color: string) => {
        if (!rows.length) return;
        const wrap = document.createElement('div');
        wrap.style.cssText = `${font}margin-top:${inner.childElementCount ? 8 : 0}px;font-size:11px;line-height:1.4;color:rgba(255,255,255,.85);white-space:nowrap;`;
        const head = document.createElement('div');
        head.textContent = label;
        head.style.cssText = `font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:${color};margin-bottom:3px;`;
        wrap.appendChild(head);
        rows.forEach((lines) => {
          lines.forEach((text, i) => {
            const row = document.createElement('div');
            row.textContent = text;
            row.style.cssText = i === 0 ? 'font-size:12px;color:#fff;' : i === 1 ? 'color:rgba(255,255,255,.7);' : 'font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);';
            wrap.appendChild(row);
          });
        });
        inner.appendChild(wrap);
      };
      group('Team', (c.team ?? []).map((m) => [m.name, m.title, ...(m.company ? [m.company] : [])]), 'var(--bb-team)');
      group('Clients', c.clients.map((cl) => [cl.name]), 'var(--bb-client)');
      // City under the names
      title.style.cssText = `${font}margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,.1);font-size:11px;line-height:1;letter-spacing:.02em;color:rgba(255,255,255,.6);white-space:nowrap;`;
      inner.appendChild(title);
      inner.style.cssText = `position:absolute;left:0;top:0;transform:${shift};padding:8px 10px;border-radius:8px;background:rgba(0,0,0,.82);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(4px);transition:opacity .3s;`;
    } else {
      inner.style.cssText = `position:absolute;left:0;top:0;transform:${shift};text-shadow:0 1px 6px rgba(0,0,0,.9);transition:opacity .3s;`;
    }
    outer.appendChild(inner);
    return outer;
  }, []);

  const flyTo = useCallback((c: ClientCity) => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = false;
    g.pointOfView({ lat: c.lat, lng: c.lng, altitude: 0.9 }, 1400);
  }, []);

  const onPointClick = useCallback((d: object) => {
    const c = d as ClientCity;
    setActive(clientCities.indexOf(c));
    flyTo(c);
  }, [flyTo]);

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
        // globe.gl enables zoomToCursor, which drags the view toward the
        // pinch/cursor point. Zoom straight in instead so the globe stays put.
        controls.zoomToCursor = false;
        // Touch: one finger rotates, two fingers pinch to zoom (pan is off, so a
        // pinch cannot drag the globe). Damping smooths finger input. Allow
        // vertical one-finger swipes through to the page so the globe does not
        // trap scrolling on phones; OrbitControls sets touch-action:none itself.
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.7;
        const canvas = g.renderer().domElement;
        canvas.style.touchAction = 'pan-y';
        // Pinch guard: OrbitControls treats the first finger as a rotate until
        // the second lands, and again when one finger lifts first, which makes
        // the globe lurch around a pinch. Disable rotation while two fingers are
        // down and for a moment after, and stop auto-rotate on first touch.
        let touchCount = 0;
        let rotateTimer: number | undefined;
        canvas.addEventListener('pointerdown', (e: PointerEvent) => {
          if (e.pointerType !== 'touch') return;
          controls.autoRotate = false;
          touchCount += 1;
          if (touchCount >= 2) {
            controls.enableRotate = false;
            window.clearTimeout(rotateTimer);
          }
        });
        const touchUp = (e: PointerEvent) => {
          if (e.pointerType !== 'touch') return;
          touchCount = Math.max(0, touchCount - 1);
          if (touchCount < 2) {
            window.clearTimeout(rotateTimer);
            rotateTimer = window.setTimeout(() => {
              controls.enableRotate = true;
            }, 350);
          }
        };
        if (process.env.NODE_ENV !== 'production') (window as unknown as { __bbGlobe?: unknown }).__bbGlobe = g;
        canvas.addEventListener('pointerup', touchUp);
        canvas.addEventListener('pointercancel', touchUp);
        g.pointOfView({ lat: 32, lng: -30, altitude: 2.1 }, 0);
        // Track camera altitude (rounded) so dense labels can hide when far out.
        controls.addEventListener('change', () => {
          const v = g.pointOfView();
          if (boxRef.current) {
            boxRef.current.dataset.alt = v.altitude.toFixed(3);
            boxRef.current.dataset.pov = `${v.lat.toFixed(2)},${v.lng.toFixed(2)}`;
          }
          setAlt((prev) => (Math.abs(prev - v.altitude) > 0.12 ? v.altitude : prev));
          setPov((prev) =>
            Math.abs(prev.lat - v.lat) > 0.5 || Math.abs(prev.lng - v.lng) > 0.5 ? { lat: v.lat, lng: v.lng } : prev,
          );
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
    const line = (label: string, names: string[], color: string) =>
      names.length
        ? `<div style="margin-top:4px;letter-spacing:0;text-transform:none"><span style="font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:${color}">${label}</span><br/><span style="color:#d1d5db">${names.join(' · ')}</span></div>`
        : '';
    return `<div style="font-family:var(--font-inter),Inter,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,.85);border:1px solid rgba(255,255,255,.15);padding:8px 10px;border-radius:8px;white-space:nowrap">${c.city}${line('Team', (c.team ?? []).map((m: TeamMember) => `${m.name}, ${m.title}`), 'var(--bb-team)')}${line('Clients', c.clients.map((cl: ClientLink) => cl.name), 'var(--bb-client)')}</div>`;
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
                const teamCount = c.team?.length ?? 0;
                const clientCount = c.clients.length;
                return (
                  <li key={c.city}>
                    {/* Header: city is the headline. Click opens the row and flies the globe. */}
                    <button
                      type="button"
                      onClick={() => (on ? setActive(null) : pick(i, c))}
                      aria-expanded={on}
                      className="group grid w-full grid-cols-[1.25rem_1fr_auto] items-center gap-4 py-4 text-left"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full transition-transform ${on ? 'scale-125' : 'opacity-70 group-hover:opacity-100'}`}
                        style={{ background: c.studio ? 'var(--bb-team)' : 'var(--bb-client)' }}
                      />
                      <span className="min-w-0">
                        <span className={`block text-lg leading-tight ${on ? 'text-white' : 'text-gray-100'}`}>
                          {c.city}
                          {c.region ? <span className="text-gray-400">, {c.region}</span> : null}
                          {c.tag && (
                            <span className="ml-2 rounded px-1.5 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-[0.12em] text-black" style={{ background: 'var(--bb-primary)' }}>
                              {c.tag}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[11px] uppercase tracking-[0.16em] text-gray-500">
                          <span>{c.country}</span>
                          {teamCount > 0 && (
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--bb-team)' }} />
                              {teamCount} {t('v2_globe_team')}
                            </span>
                          )}
                          {clientCount > 0 && (
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--bb-client)' }} />
                              {clientCount} {clientCount === 1 ? t('v2_globe_client_one') : t('v2_globe_clients')}
                            </span>
                          )}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`text-gray-500 transition-transform duration-300 ${on ? 'rotate-180 text-white' : ''}`}
                      >
                        ▾
                      </span>
                    </button>

                    {/* Body: team then clients, animated open/closed. */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-[1.25rem_1fr] gap-4 pb-5">
                          <span />
                          <div className="min-w-0">
                            {teamCount > 0 && (
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--bb-team)' }}>
                                  {t('v2_globe_team')}
                                </p>
                                {c.team!.map((m) => (
                                  <div key={m.name} className="mt-1.5">
                                    <p className="text-base leading-tight text-white">{m.name}</p>
                                    <p className="text-sm text-gray-400">{m.title}</p>
                                    {m.company && (
                                      <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">{m.company}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            {clientCount > 0 && (
                              <div className={teamCount ? 'mt-4' : ''}>
                                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--bb-client)' }}>
                                  {t('v2_globe_clients')}
                                </p>
                                {c.clients.map((cl) => (
                                  <p key={cl.name} className="mt-1.5 text-base leading-tight text-white">
                                    {cl.url ? (
                                      <a
                                        href={cl.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-white"
                                      >
                                        {cl.name}
                                      </a>
                                    ) : (
                                      cl.name
                                    )}
                                    {cl.archived && (
                                      <span className="ml-2 text-[10px] uppercase tracking-[0.12em] text-gray-500">archive</span>
                                    )}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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
                  hexPolygonColor={hexColor}
                  hexPolygonAltitude={0.002}
                  pointsData={clientCities}
                  pointLat="lat"
                  pointLng="lng"
                  pointColor={colorOf}
                  pointAltitude={0.02}
                  pointRadius={pointRadius}
                  pointLabel={tooltip}
                  onPointClick={onPointClick}
                  ringsData={clientCities}
                  ringLat="lat"
                  ringLng="lng"
                  ringColor={ringColor}
                  ringMaxRadius={ringMaxRadius}
                  ringPropagationSpeed={1.4}
                  ringRepeatPeriod={1400}
                  arcsData={arcs}
                  arcColor={arcColor}
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
