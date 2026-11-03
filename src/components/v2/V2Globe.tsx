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
import { placeKey } from '@/lib/places';
import type { GlobeMethods } from 'react-globe.gl';
import type { MeshPhongMaterial } from 'three';
import { clientCities, type ClientCity, type ClientLink, type TeamMember } from '@/data/client-locations';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const CONTINENT: Record<string, string> = {
  Germany: 'Europe',
  'United States': 'North America',
  Pakistan: 'Asia',
  Philippines: 'Asia',
};

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
  const tt = useTranslations('team');
  const tp = useTranslations('places');
  const cityName = useCallback((c: ClientCity) => tp(placeKey('city', c.city)), [tp]);
  const regionName = useCallback((c: ClientCity) => (c.region ? tp(placeKey('region', c.region)) : ''), [tp]);
  const countryName = useCallback((c: ClientCity) => tp(placeKey('country', c.country)), [tp]);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const compact = size > 0 && size < 520; // phone-sized globe: labels only for the focused city
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [countries, setCountries] = useState<Feature[]>([]);
  // The globe chunk (globe.gl + three, about 2 MB raw) and the country
  // geometry only load once the section is within 400px of the viewport.
  const [near, setNear] = useState(false);
  const [material, setMaterial] = useState<MeshPhongMaterial | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [colors, setColors] = useState({ team: 'rgb(255, 255, 255)', client: 'rgb(37, 97, 216)', accent: 'rgb(37, 97, 216)' });
  const [active, setActive] = useState<number | null>(null);
  const [openGroup, setOpenGroup] = useState<'team' | 'clients' | null>('team');
  const [ready, setReady] = useState(false);
  const [alt, setAlt] = useState(2.1);
  const [pov, setPov] = useState<{ lat: number; lng: number }>({ lat: 32, lng: -30 });

  // Environment: WebGL, accent colour (and palette changes), container size.
  useEffect(() => {
    setWebgl(hasWebGL());
    setColors(readPalette());
    const obs = new MutationObserver(() => setColors(readPalette()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette', 'style'] });
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const box = boxRef.current;
    const ro = new ResizeObserver(([e]) => setSize(Math.round(e.contentRect.width)));
    if (box) ro.observe(box);
    let io: IntersectionObserver | undefined;
    if (box && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setNear(true);
            io?.disconnect();
          }
        },
        { rootMargin: '400px 0px' },
      );
      io.observe(box);
    } else {
      setNear(true);
    }
    return () => {
      obs.disconnect();
      ro.disconnect();
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    fetch('/data/countries-110m.geojson')
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setCountries(d.features ?? []); })
      .catch(() => { if (!cancelled) setCountries([]); });
    // Dark matte sphere, no texture. three is imported here, not at module
    // level, so it stays out of the homepage's initial bundle.
    import('three').then(({ MeshPhongMaterial }) => {
      if (!cancelled) setMaterial(new MeshPhongMaterial({ color: '#000000', emissive: '#000000', specular: '#050505', shininess: 2 }));
    });
    return () => { cancelled = true; };
  }, [near]);

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
    if (compact && active !== null) return clientCities[active];
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
  }, [alt, pov, compact, active]);
  const visibleSet = clientCities
    .filter((c) => (compact ? c === focusCity : c.labelMaxAlt === undefined || alt < c.labelMaxAlt || c === focusCity))
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
    title.textContent = cityName(c) + (c.region ? `, ${regionName(c)}` : '');
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
      // Rows are [text, href?] pairs; a client row with a URL becomes a link.
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
            const isLink = i === 0 && lines.length === 2 && /^(https?:\/\/|\/)/.test(lines[1]);
            if (i === 1 && /^(https?:\/\/|\/)/.test(lines[1])) return; // href slot, not a text line
            const row = document.createElement(isLink ? 'a' : 'div');
            row.textContent = text;
            if (isLink) {
              const a = row as HTMLAnchorElement;
              a.href = lines[1];
              if (!lines[1].startsWith('/')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
              }
              a.style.cssText = 'display:block;font-size:12px;color:#fff;text-decoration:underline;text-decoration-color:rgba(255,255,255,.3);text-underline-offset:3px;cursor:pointer;';
              a.addEventListener('mouseenter', () => { a.style.textDecorationColor = '#fff'; });
              a.addEventListener('mouseleave', () => { a.style.textDecorationColor = 'rgba(255,255,255,.3)'; });
            } else {
              row.style.cssText = i === 0 ? 'font-size:12px;color:#fff;' : i === 1 ? 'color:rgba(255,255,255,.7);' : 'font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);';
            }
            wrap.appendChild(row);
          });
        });
        inner.appendChild(wrap);
      };
      group(t('v2_globe_team'), (c.team ?? []).map((m) => [m.name, tt(m.title), ...(m.company ? [m.company] : [])]), 'var(--bb-team)');
      group(t('v2_globe_clients'), c.clients.map((cl) => (cl.url ? [cl.name, cl.url] : [cl.name])), 'var(--bb-client)');
      // The expanded card is interactive: links are clickable and a press on
      // the card must not start a globe drag.
      outer.style.pointerEvents = 'auto';
      inner.style.pointerEvents = 'auto';
      inner.addEventListener('pointerdown', (e) => e.stopPropagation());
      inner.addEventListener('wheel', (e) => e.stopPropagation());
      // City under the names
      title.style.cssText = `${font}margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,.1);font-size:11px;line-height:1;letter-spacing:.02em;color:rgba(255,255,255,.6);white-space:nowrap;`;
      inner.appendChild(title);
      inner.style.cssText = `position:absolute;left:0;top:0;transform:${shift};padding:8px 10px;border-radius:12px;background:rgba(0,0,0,.82);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(4px);transition:opacity .3s;`;
    } else {
      inner.style.cssText = `position:absolute;left:0;top:0;transform:${shift};text-shadow:0 1px 6px rgba(0,0,0,.9);transition:opacity .3s;`;
    }
    outer.appendChild(inner);
    return outer;
  }, [t, tt, cityName, regionName]);

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
  const mounted = webgl === true && size > 0 && near && material !== null;
  useEffect(() => {
    if (!mounted) return;
    let tries = 0;
    const id = window.setInterval(() => {
      const g = globeRef.current;
      tries += 1;
      if (g) {
        window.clearInterval(id);
        const controls = g.controls();
        controls.autoRotate = !reducedMotion;
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
  }, [mounted, reducedMotion]);

  const resume = () => {
    const g = globeRef.current;
    if (g && active === null && !reducedMotion) g.controls().autoRotate = true;
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
    return `<div style="font-family:var(--font-inter),Inter,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,.85);border:1px solid rgba(255,255,255,.15);padding:8px 10px;border-radius:12px;white-space:nowrap">${cityName(c)}${line(t('v2_globe_team'), (c.team ?? []).map((m: TeamMember) => `${m.name}, ${tt(m.title)}`), 'var(--bb-team)')}${line(t('v2_globe_clients'), c.clients.map((cl: ClientLink) => cl.name), 'var(--bb-client)')}</div>`;
  };

  return (
    <section className="band-glow px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-10 border-b border-white/10 pb-4 t-eyebrow text-gray-500">
          {t('v2_globe_label')}
        </p>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="max-w-xl t-h2 text-white">
              {t('v2_globe_title')}
            </h2>
            <p className="mt-5 max-w-lg t-lead text-gray-300">
              {t('v2_globe_sub', {
                clients: clientCities.reduce((n, c) => n + c.clients.length, 0),
                cities: clientCities.filter((c) => c.clients.length).length,
                continents: new Set(clientCities.filter((c) => c.clients.length).map((c) => CONTINENT[c.country] ?? c.country)).size,
              })}
            </p>
            <div className="mt-6 flex items-center gap-6 t-eyebrow text-gray-400">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--bb-team)' }} />
                {t('v2_globe_team')}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--bb-client)' }} />
                {t('v2_globe_clients')}
              </span>
            </div>
            {/* Two dropdowns: Team and Clients. Each opens a bulleted city list. */}
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {(
                [
                  { id: 'team' as const, label: t('v2_globe_team'), color: 'var(--bb-team)', cities: clientCities.filter((c) => c.team?.length) },
                  { id: 'clients' as const, label: t('v2_globe_clients'), color: 'var(--bb-client)', cities: clientCities.filter((c) => c.clients.length) },
                ]
              ).map((g) => {
                const open = openGroup === g.id;
                const count = g.id === 'team' ? g.cities.reduce((n, c) => n + (c.team?.length ?? 0), 0) : g.cities.reduce((n, c) => n + c.clients.length, 0);
                return (
                  <div key={g.id}>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(open ? null : g.id)}
                      aria-expanded={open}
                      className="group flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
                      <span className="t-h4 text-white">{g.label}</span>
                      <span className="t-eyebrow text-gray-500">
                        {count} · {g.cities.length} {t('v2_globe_cities')}
                      </span>
                      <span aria-hidden="true" className={`ml-auto text-gray-500 transition-transform duration-300 ${open ? 'rotate-180 text-white' : ''}`}>
                        ▾
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <ul className="space-y-3 pb-6 pl-[1.6rem]">
                          {g.cities.map((c) => {
                            const i = clientCities.indexOf(c);
                            const on = active === i;
                            return (
                              <li key={c.city} className="flex gap-3">
                                <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-gray-500" />
                                <button
                                  type="button"
                                  onClick={() => pick(i, c)}
                                  aria-pressed={on}
                                  className="group/city min-w-0 text-left"
                                >
                                  <span className={`block text-base leading-snug ${on ? 'text-white' : 'text-gray-200 group-hover/city:text-white'}`}>
                                    {cityName(c)}
                                    {c.region ? <span className="text-gray-400">, {regionName(c)}</span> : null}
                                    <span className="ml-2 t-eyebrow text-gray-500">{countryName(c)}</span>
                                    {c.tag && (
                                      <span className="t-eyebrow ml-2 rounded px-1.5 py-0.5 align-middle text-black" style={{ background: 'var(--bb-primary)' }}>
                                        {c.tag}
                                      </span>
                                    )}
                                  </span>
                                  {g.id === 'team' ? (
                                    <span className="mt-0.5 block text-sm text-gray-400">
                                      {c.team!.map((m) => (
                                        <span key={m.name} className="block">
                                          {m.name}, {tt(m.title)}
                                        </span>
                                      ))}
                                    </span>
                                  ) : (
                                    <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2 text-sm text-gray-400">
                                      {c.clients.map((cl, j) => (
                                        <span key={cl.name} className="inline-flex items-baseline gap-2">
                                          {cl.url ? (
                                            <a
                                              href={cl.url}
                                              target={cl.url.startsWith('/') ? undefined : '_blank'}
                                              rel={cl.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                                              onClick={(e) => e.stopPropagation()}
                                              className="transition-colors hover:text-white"
                                            >
                                              {cl.name}
                                            </a>
                                          ) : (
                                            cl.name
                                          )}
                                          {cl.archived && <span className="t-eyebrow text-gray-500">{t('v2_archive')}</span>}
                                          {j < c.clients.length - 1 && <span className="text-gray-600">·</span>}
                                        </span>
                                      ))}
                                    </span>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            ref={boxRef}
            aria-hidden="true"
            onMouseEnter={pause}
            onMouseLeave={resume}
            className="order-1 relative mx-auto aspect-square w-full max-w-[720px] overflow-hidden lg:order-2"
            style={{
              // Circular fade so the square canvas never reads as a box, at any zoom.
              WebkitMaskImage: 'radial-gradient(circle closest-side, #000 86%, transparent 100%)',
              maskImage: 'radial-gradient(circle closest-side, #000 86%, transparent 100%)',
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
              <div className="absolute inset-0 flex items-center justify-center p-10 text-center t-eyebrow text-gray-500">
                {t('v2_globe_nowebgl')}
              </div>
            )}
            {mounted && material && (
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
                  hexPolygonResolution={compact ? 2 : 3}
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
