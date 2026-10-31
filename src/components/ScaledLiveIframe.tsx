'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The iframe is rendered at a fixed "desktop" viewport width and then
 * CSS-scaled down to fit our container. This forces the embedded site
 * to load its real desktop layout (so navs don't wrap, headers don't
 * squish) regardless of how wide our card actually is on screen.
 */
export const IFRAME_RENDER_WIDTH = 1440;
export const IFRAME_VIEWPORT_HEIGHT = 700;

export function ScaledLiveIframe({ src, title }: { src: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.offsetWidth;
      setScale(Math.min(1, w / IFRAME_RENDER_WIDTH));
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden bg-white" style={{ height: IFRAME_VIEWPORT_HEIGHT }}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        className="block bg-white"
        style={{
          width: IFRAME_RENDER_WIDTH,
          height: IFRAME_VIEWPORT_HEIGHT / (scale || 1),
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}

/**
 * Fallback for sites that refuse to be framed: a full-page screenshot from
 * Microlink in a scrollable window, with the project's own hero image as
 * the last resort if the screenshot service fails.
 */
export function FullPageScreenshot({ url, alt, fallback }: { url: string; alt: string; fallback?: string | null }) {
  return (
    <div className="h-[700px] overflow-y-auto bg-white scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&fullPage=true&meta=false&embed=screenshot.url&type=jpeg&waitUntil=networkidle0`}
        alt={alt}
        className="w-full block"
        loading="lazy"
        onError={(e) => {
          if (fallback) (e.currentTarget as HTMLImageElement).src = fallback;
        }}
      />
    </div>
  );
}
