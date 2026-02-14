/**
 * generate-mockups.mjs
 * Generates a realistic 3D device mockup composition image for the homepage.
 * Uses sharp to composite project screenshots into SVG device frames.
 *
 * Devices:
 *   MacBook (center) — Coach Kofi (desktop)
 *   iPad (left)      — Nanny & Nest (tablet screenshot)
 *   iPhone (right)   — The New School Military (mobile screenshot)
 *
 * Output: public/images/hero-devices.png
 * Usage: node scripts/generate-mockups.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PROJECTS = path.join(ROOT, 'public/images/projects');
const OUTPUT = path.join(ROOT, 'public/images/hero-devices.png');

// ─── Canvas ───
const CANVAS_W = 1800;
const CANVAS_H = 960;

// ─── MacBook ───
const MB_SCREEN_W = 820;
const MB_SCREEN_H = 513; // 16:10
const MB_BEZEL = 12;
const MB_TOP_BEZEL = 24;
const MB_RADIUS = 10;
const MB_TOTAL_W = MB_SCREEN_W + MB_BEZEL * 2;
const MB_TOTAL_H = MB_SCREEN_H + MB_TOP_BEZEL + MB_BEZEL;

// ─── iPad ───
const IPAD_SCREEN_W = 290;
const IPAD_SCREEN_H = 387; // 3:4
const IPAD_BEZEL = 10;
const IPAD_TOP_BEZEL = 16;
const IPAD_RADIUS = 16;
const IPAD_TOTAL_W = IPAD_SCREEN_W + IPAD_BEZEL * 2;
const IPAD_TOTAL_H = IPAD_SCREEN_H + IPAD_TOP_BEZEL + IPAD_BEZEL;

// ─── iPhone ───
const IPHONE_SCREEN_W = 130;
const IPHONE_SCREEN_H = 282; // ~9:19.5
const IPHONE_BEZEL = 5;
const IPHONE_TOP_BEZEL = 12;
const IPHONE_BOTTOM_BEZEL = 12;
const IPHONE_RADIUS = 20;
const IPHONE_TOTAL_W = IPHONE_SCREEN_W + IPHONE_BEZEL * 2;
const IPHONE_TOTAL_H = IPHONE_SCREEN_H + IPHONE_TOP_BEZEL + IPHONE_BOTTOM_BEZEL;

// ─── Spacing between devices ───
const DEVICE_GAP = 40;

function macbookSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${MB_TOTAL_W + 80}" height="${MB_TOTAL_H + 32}" viewBox="-40 0 ${MB_TOTAL_W + 80} ${MB_TOTAL_H + 32}">
    <defs>
      <linearGradient id="mb-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#303030"/>
        <stop offset="100%" stop-color="#1a1a1a"/>
      </linearGradient>
      <linearGradient id="mb-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4a4a4a"/>
        <stop offset="100%" stop-color="#333"/>
      </linearGradient>
      <linearGradient id="mb-hinge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5a5a5a"/>
        <stop offset="100%" stop-color="#444"/>
      </linearGradient>
      <filter id="mb-shadow" x="-8%" y="-4%" width="116%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.45"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${MB_TOTAL_W}" height="${MB_TOTAL_H}"
          rx="${MB_RADIUS}" ry="${MB_RADIUS}"
          fill="url(#mb-body)" filter="url(#mb-shadow)"/>
    <circle cx="${MB_TOTAL_W / 2}" cy="${MB_TOP_BEZEL / 2 + 1}" r="2.5" fill="#444"/>
    <rect x="${MB_BEZEL}" y="${MB_TOP_BEZEL}" width="${MB_SCREEN_W}" height="${MB_SCREEN_H}"
          rx="2" ry="2" fill="#000"/>
    <rect x="0" y="${MB_TOTAL_H}" width="${MB_TOTAL_W}" height="5"
          fill="url(#mb-hinge)"/>
    <path d="M -30 ${MB_TOTAL_H + 5}
             L ${MB_TOTAL_W + 30} ${MB_TOTAL_H + 5}
             L ${MB_TOTAL_W + 30} ${MB_TOTAL_H + 22}
             Q ${MB_TOTAL_W + 30} ${MB_TOTAL_H + 32} ${MB_TOTAL_W + 15} ${MB_TOTAL_H + 32}
             L -15 ${MB_TOTAL_H + 32}
             Q -30 ${MB_TOTAL_H + 32} -30 ${MB_TOTAL_H + 22}
             Z"
          fill="url(#mb-base)"/>
    <rect x="${MB_TOTAL_W / 2 - 35}" y="${MB_TOTAL_H + 2}" width="70" height="3.5" rx="1.75" ry="1.75" fill="#5a5a5a"/>
  </svg>`;
}

function ipadSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${IPAD_TOTAL_W}" height="${IPAD_TOTAL_H}">
    <defs>
      <linearGradient id="ipad-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2e2e2e"/>
        <stop offset="100%" stop-color="#1c1c1c"/>
      </linearGradient>
      <filter id="ipad-shadow" x="-8%" y="-4%" width="116%" height="116%">
        <feDropShadow dx="0" dy="5" stdDeviation="10" flood-color="#000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${IPAD_TOTAL_W}" height="${IPAD_TOTAL_H}"
          rx="${IPAD_RADIUS}" ry="${IPAD_RADIUS}"
          fill="url(#ipad-body)" filter="url(#ipad-shadow)"/>
    <circle cx="${IPAD_TOTAL_W / 2}" cy="${IPAD_TOP_BEZEL / 2 + 1}" r="2" fill="#3a3a3a"/>
    <rect x="${IPAD_BEZEL}" y="${IPAD_TOP_BEZEL}" width="${IPAD_SCREEN_W}" height="${IPAD_SCREEN_H}"
          rx="2" ry="2" fill="#000"/>
  </svg>`;
}

function iphoneSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${IPHONE_TOTAL_W}" height="${IPHONE_TOTAL_H}">
    <defs>
      <linearGradient id="ip-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2e2e2e"/>
        <stop offset="100%" stop-color="#1a1a1a"/>
      </linearGradient>
      <filter id="ip-shadow" x="-12%" y="-4%" width="124%" height="116%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.35"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${IPHONE_TOTAL_W}" height="${IPHONE_TOTAL_H}"
          rx="${IPHONE_RADIUS}" ry="${IPHONE_RADIUS}"
          fill="url(#ip-body)" filter="url(#ip-shadow)"/>
    <rect x="${IPHONE_TOTAL_W / 2 - 20}" y="4" width="40" height="10" rx="5" ry="5" fill="#000"/>
    <rect x="${IPHONE_BEZEL}" y="${IPHONE_TOP_BEZEL}" width="${IPHONE_SCREEN_W}" height="${IPHONE_SCREEN_H}"
          rx="2" ry="2" fill="#000"/>
    <rect x="${IPHONE_TOTAL_W / 2 - 16}" y="${IPHONE_TOTAL_H - 7}" width="32" height="3" rx="1.5" ry="1.5" fill="#444"/>
  </svg>`;
}

async function main() {
  console.log('Generating device mockup composition...');

  // Load screenshots — 3 different websites
  const [macScreenshot, ipadScreenshot, iphoneScreenshot] = await Promise.all([
    // MacBook: Coach Kofi (desktop)
    sharp(path.join(PROJECTS, 'coachkofi.png'))
      .resize(MB_SCREEN_W, MB_SCREEN_H, { fit: 'cover', position: 'top' })
      .toBuffer(),
    // iPad: Nanny & Nest (tablet layout)
    sharp(path.join(PROJECTS, 'nannyandnest-tablet.png'))
      .resize(IPAD_SCREEN_W, IPAD_SCREEN_H, { fit: 'cover', position: 'top' })
      .toBuffer(),
    // iPhone: The New School Military (mobile)
    sharp(path.join(PROJECTS, 'military-newschool-mobile.png'))
      .resize(IPHONE_SCREEN_W, IPHONE_SCREEN_H, { fit: 'cover', position: 'top' })
      .toBuffer(),
  ]);

  // Render SVG device frames
  const [macFrame, ipadFrame, iphoneFrame] = await Promise.all([
    sharp(Buffer.from(macbookSVG())).png().toBuffer(),
    sharp(Buffer.from(ipadSVG())).png().toBuffer(),
    sharp(Buffer.from(iphoneSVG())).png().toBuffer(),
  ]);

  // Get actual frame sizes
  const macMeta = await sharp(macFrame).metadata();
  const ipadMeta = await sharp(ipadFrame).metadata();
  const iphoneMeta = await sharp(iphoneFrame).metadata();

  // Composite screenshots into device frames
  const macWithScreen = await sharp(macFrame)
    .composite([{
      input: macScreenshot,
      left: MB_BEZEL + 40, // offset for viewBox shift
      top: MB_TOP_BEZEL,
    }])
    .png()
    .toBuffer();

  const ipadWithScreen = await sharp(ipadFrame)
    .composite([{
      input: ipadScreenshot,
      left: IPAD_BEZEL,
      top: IPAD_TOP_BEZEL,
    }])
    .png()
    .toBuffer();

  const iphoneWithScreen = await sharp(iphoneFrame)
    .composite([{
      input: iphoneScreenshot,
      left: IPHONE_BEZEL,
      top: IPHONE_TOP_BEZEL,
    }])
    .png()
    .toBuffer();

  // ─── Layout: clean spacing, bottom-aligned, centered ───
  const macFrameW = macMeta.width;
  const macFrameH = macMeta.height;

  // Total width of all 3 devices with gaps
  const totalW = ipadMeta.width + DEVICE_GAP + macFrameW + DEVICE_GAP + iphoneMeta.width;
  const startX = Math.round((CANVAS_W - totalW) / 2);

  // Bottom-align all devices
  const bottomY = CANVAS_H - 60;

  const ipadX = startX;
  const ipadY = bottomY - ipadMeta.height;

  const mbX = startX + ipadMeta.width + DEVICE_GAP;
  const mbY = bottomY - macFrameH;

  const iphoneX = mbX + macFrameW + DEVICE_GAP;
  const iphoneY = bottomY - iphoneMeta.height;

  // Create transparent canvas
  const canvas = sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  await canvas
    .composite([
      // iPad (left)
      { input: ipadWithScreen, left: ipadX, top: ipadY },
      // MacBook (center)
      { input: macWithScreen, left: mbX, top: mbY },
      // iPhone (right)
      { input: iphoneWithScreen, left: iphoneX, top: iphoneY },
    ])
    .png({ quality: 90 })
    .toFile(OUTPUT);

  console.log(`Done! Output saved to: ${OUTPUT}`);
  const stat = (await import('fs')).statSync(OUTPUT);
  console.log(`File size: ${(stat.size / 1024).toFixed(0)} KB`);
  console.log(`Dimensions: ${CANVAS_W}x${CANVAS_H}`);
  console.log(`Layout: iPad(${ipadX},${ipadY}) MacBook(${mbX},${mbY}) iPhone(${iphoneX},${iphoneY})`);
}

main().catch(console.error);
