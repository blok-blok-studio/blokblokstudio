/**
 * generate-mockups.mjs
 * Generates a realistic 3D device mockup composition image for the homepage.
 * Uses sharp to composite project screenshots into SVG device frames.
 *
 * Output: public/images/hero-devices.png
 *
 * Usage: node scripts/generate-mockups.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PROJECTS = path.join(ROOT, 'public/images/projects');
const OUTPUT = path.join(ROOT, 'public/images/hero-devices.png');

// ─── Canvas dimensions ───
const CANVAS_W = 1920;
const CANVAS_H = 1080;

// ─── MacBook dimensions ───
const MB_SCREEN_W = 900;
const MB_SCREEN_H = 563; // 16:10
const MB_BEZEL = 14;
const MB_TOP_BEZEL = 28;
const MB_RADIUS = 12;
const MB_TOTAL_W = MB_SCREEN_W + MB_BEZEL * 2;
const MB_TOTAL_H = MB_SCREEN_H + MB_TOP_BEZEL + MB_BEZEL;

// ─── iPad dimensions ───
const IPAD_SCREEN_W = 320;
const IPAD_SCREEN_H = 427; // ~3:4
const IPAD_BEZEL = 10;
const IPAD_TOP_BEZEL = 18;
const IPAD_RADIUS = 16;
const IPAD_TOTAL_W = IPAD_SCREEN_W + IPAD_BEZEL * 2;
const IPAD_TOTAL_H = IPAD_SCREEN_H + IPAD_TOP_BEZEL + IPAD_BEZEL;

// ─── iPhone dimensions ───
const IPHONE_SCREEN_W = 140;
const IPHONE_SCREEN_H = 303; // ~9:19.5
const IPHONE_BEZEL = 6;
const IPHONE_TOP_BEZEL = 14;
const IPHONE_BOTTOM_BEZEL = 14;
const IPHONE_RADIUS = 22;
const IPHONE_TOTAL_W = IPHONE_SCREEN_W + IPHONE_BEZEL * 2;
const IPHONE_TOTAL_H = IPHONE_SCREEN_H + IPHONE_TOP_BEZEL + IPHONE_BOTTOM_BEZEL;

function macbookSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${MB_TOTAL_W}" height="${MB_TOTAL_H + 36}">
    <defs>
      <linearGradient id="mb-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2d2d2d"/>
        <stop offset="100%" stop-color="#1a1a1a"/>
      </linearGradient>
      <linearGradient id="mb-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#555"/>
        <stop offset="40%" stop-color="#444"/>
        <stop offset="100%" stop-color="#333"/>
      </linearGradient>
      <linearGradient id="mb-hinge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#666"/>
        <stop offset="50%" stop-color="#555"/>
        <stop offset="100%" stop-color="#444"/>
      </linearGradient>
      <filter id="mb-shadow" x="-10%" y="-5%" width="120%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000" flood-opacity="0.5"/>
      </filter>
    </defs>
    <!-- Screen body -->
    <rect x="0" y="0" width="${MB_TOTAL_W}" height="${MB_TOTAL_H}"
          rx="${MB_RADIUS}" ry="${MB_RADIUS}"
          fill="url(#mb-body)" filter="url(#mb-shadow)"/>
    <!-- Top bezel with camera -->
    <circle cx="${MB_TOTAL_W / 2}" cy="${MB_TOP_BEZEL / 2 + 2}" r="3" fill="#444"/>
    <!-- Screen cutout (will be filled by screenshot) -->
    <rect x="${MB_BEZEL}" y="${MB_TOP_BEZEL}" width="${MB_SCREEN_W}" height="${MB_SCREEN_H}"
          rx="2" ry="2" fill="#000"/>
    <!-- Bottom hinge -->
    <rect x="0" y="${MB_TOTAL_H}" width="${MB_TOTAL_W}" height="6"
          rx="0" ry="0" fill="url(#mb-hinge)"/>
    <!-- Base/keyboard area -->
    <path d="M -40 ${MB_TOTAL_H + 6}
             Q -40 ${MB_TOTAL_H + 6} 0 ${MB_TOTAL_H + 6}
             L ${MB_TOTAL_W} ${MB_TOTAL_H + 6}
             Q ${MB_TOTAL_W + 40} ${MB_TOTAL_H + 6} ${MB_TOTAL_W + 40} ${MB_TOTAL_H + 6}
             L ${MB_TOTAL_W + 40} ${MB_TOTAL_H + 26}
             Q ${MB_TOTAL_W + 40} ${MB_TOTAL_H + 36} ${MB_TOTAL_W + 20} ${MB_TOTAL_H + 36}
             L -20 ${MB_TOTAL_H + 36}
             Q -40 ${MB_TOTAL_H + 36} -40 ${MB_TOTAL_H + 26}
             Z"
          fill="url(#mb-base)"/>
    <!-- Trackpad notch -->
    <rect x="${MB_TOTAL_W / 2 - 40}" y="${MB_TOTAL_H + 3}" width="80" height="4" rx="2" ry="2" fill="#666"/>
  </svg>`;
}

function ipadSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${IPAD_TOTAL_W}" height="${IPAD_TOTAL_H}">
    <defs>
      <linearGradient id="ipad-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2a2a2a"/>
        <stop offset="100%" stop-color="#1c1c1c"/>
      </linearGradient>
      <filter id="ipad-shadow" x="-10%" y="-5%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.45"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${IPAD_TOTAL_W}" height="${IPAD_TOTAL_H}"
          rx="${IPAD_RADIUS}" ry="${IPAD_RADIUS}"
          fill="url(#ipad-body)" filter="url(#ipad-shadow)"/>
    <!-- Camera -->
    <circle cx="${IPAD_TOTAL_W / 2}" cy="${IPAD_TOP_BEZEL / 2 + 1}" r="2.5" fill="#3a3a3a"/>
    <!-- Screen cutout -->
    <rect x="${IPAD_BEZEL}" y="${IPAD_TOP_BEZEL}" width="${IPAD_SCREEN_W}" height="${IPAD_SCREEN_H}"
          rx="3" ry="3" fill="#000"/>
  </svg>`;
}

function iphoneSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${IPHONE_TOTAL_W}" height="${IPHONE_TOTAL_H}">
    <defs>
      <linearGradient id="ip-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2d2d2d"/>
        <stop offset="100%" stop-color="#1a1a1a"/>
      </linearGradient>
      <filter id="ip-shadow" x="-15%" y="-5%" width="130%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${IPHONE_TOTAL_W}" height="${IPHONE_TOTAL_H}"
          rx="${IPHONE_RADIUS}" ry="${IPHONE_RADIUS}"
          fill="url(#ip-body)" filter="url(#ip-shadow)"/>
    <!-- Dynamic Island -->
    <rect x="${IPHONE_TOTAL_W / 2 - 22}" y="5" width="44" height="11" rx="5.5" ry="5.5" fill="#000"/>
    <!-- Screen cutout -->
    <rect x="${IPHONE_BEZEL}" y="${IPHONE_TOP_BEZEL}" width="${IPHONE_SCREEN_W}" height="${IPHONE_SCREEN_H}"
          rx="2" ry="2" fill="#000"/>
    <!-- Home indicator -->
    <rect x="${IPHONE_TOTAL_W / 2 - 18}" y="${IPHONE_TOTAL_H - 8}" width="36" height="3" rx="1.5" ry="1.5" fill="#555"/>
  </svg>`;
}

async function main() {
  console.log('Generating device mockup composition...');

  // Load and resize screenshots to fit device screens
  const [macScreenshot, ipadScreenshot, iphoneScreenshot] = await Promise.all([
    sharp(path.join(PROJECTS, 'coachkofi.png'))
      .resize(MB_SCREEN_W, MB_SCREEN_H, { fit: 'cover', position: 'top' })
      .toBuffer(),
    sharp(path.join(PROJECTS, 'nannyandnest.png'))
      .resize(IPAD_SCREEN_W, IPAD_SCREEN_H, { fit: 'cover', position: 'top' })
      .toBuffer(),
    sharp(path.join(PROJECTS, 'coachkofi-mobile.png'))
      .resize(IPHONE_SCREEN_W, IPHONE_SCREEN_H, { fit: 'cover', position: 'top' })
      .toBuffer(),
  ]);

  // Render SVG device frames
  const [macFrame, ipadFrame, iphoneFrame] = await Promise.all([
    sharp(Buffer.from(macbookSVG())).png().toBuffer(),
    sharp(Buffer.from(ipadSVG())).png().toBuffer(),
    sharp(Buffer.from(iphoneSVG())).png().toBuffer(),
  ]);

  // Composite screenshots into device frames
  const macWithScreen = await sharp(macFrame)
    .composite([{
      input: macScreenshot,
      left: MB_BEZEL,
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

  // Positions on canvas (centered layout, bottom-aligned)
  // MacBook center
  const mbX = Math.round((CANVAS_W - MB_TOTAL_W) / 2);
  const mbY = CANVAS_H - (MB_TOTAL_H + 36) - 50;

  // iPad left — visible beside MacBook with slight overlap
  const ipadX = mbX - IPAD_TOTAL_W + 80;
  const ipadY = CANVAS_H - IPAD_TOTAL_H - 70;

  // iPhone right — visible beside MacBook with slight overlap
  const iphoneX = mbX + MB_TOTAL_W - 30;
  const iphoneY = CANVAS_H - IPHONE_TOTAL_H - 90;

  // Create transparent canvas and composite all devices
  const canvas = sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  // Add a subtle ambient glow behind devices
  const glowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}">
    <defs>
      <radialGradient id="glow" cx="50%" cy="60%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.04)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
    </defs>
    <ellipse cx="${CANVAS_W / 2}" cy="${CANVAS_H * 0.6}" rx="${CANVAS_W * 0.4}" ry="${CANVAS_H * 0.3}" fill="url(#glow)"/>
  </svg>`;

  // Surface reflection/shadow under devices
  const reflectionSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="60">
    <defs>
      <linearGradient id="refl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.03)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
      </linearGradient>
    </defs>
    <ellipse cx="${CANVAS_W / 2}" cy="5" rx="${MB_TOTAL_W * 0.6}" ry="30" fill="url(#refl)"/>
  </svg>`;

  const glowBuf = await sharp(Buffer.from(glowSVG)).png().toBuffer();
  const reflBuf = await sharp(Buffer.from(reflectionSVG)).png().toBuffer();

  await canvas
    .composite([
      // Ambient glow
      { input: glowBuf, left: 0, top: 0 },
      // iPad (behind macbook, left)
      { input: ipadWithScreen, left: ipadX, top: ipadY },
      // MacBook (center, on top)
      { input: macWithScreen, left: mbX, top: mbY },
      // iPhone (right, on top)
      { input: iphoneWithScreen, left: iphoneX, top: iphoneY },
      // Surface reflection
      { input: reflBuf, left: 0, top: CANVAS_H - 50 },
    ])
    .png({ quality: 90 })
    .toFile(OUTPUT);

  console.log(`Done! Output saved to: ${OUTPUT}`);

  // Get file size
  const { size } = await sharp(OUTPUT).metadata();
  const stat = (await import('fs')).statSync(OUTPUT);
  console.log(`File size: ${(stat.size / 1024).toFixed(0)} KB`);
}

main().catch(console.error);
