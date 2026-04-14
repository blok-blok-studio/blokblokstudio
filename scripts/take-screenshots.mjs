import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', 'projects');

const sites = [
  {
    name: 'coachluki',
    urls: [
      { url: 'https://coachluki.com', suffix: '' },
    ],
  },
  {
    name: 'coachkofi',
    urls: [
      { url: 'https://coachkofi.de', suffix: '' },
    ],
  },
  {
    name: 'exoticripz',
    urls: [
      { url: 'https://exoticripz.com', suffix: '' },
    ],
  },
  {
    name: 'nannyandnest',
    urls: [
      { url: 'https://www.nannyandnest.com', suffix: '' },
    ],
  },
  {
    name: 'kdssys',
    urls: [
      { url: 'https://kdssys.com', suffix: '' },
    ],
  },
  {
    name: 'military-newschool',
    urls: [
      { url: 'https://www.military.newschool.edu', suffix: '' },
    ],
  },
  {
    name: 'public-affair',
    urls: [
      { url: 'https://public-affair.com', suffix: '' },
    ],
  },
];

const viewports = [
  { width: 1440, height: 900, suffix: '' },
  { width: 375, height: 812, suffix: '-mobile' },
];

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: null,
  });

  for (const site of sites) {
    for (const { url, suffix: pageSuffix } of site.urls) {
      for (const vp of viewports) {
        const page = await browser.newPage();
        await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });

        const filename = `${site.name}${pageSuffix}${vp.suffix}.png`;
        const filepath = path.join(outDir, filename);

        console.log(`Capturing ${url} @ ${vp.width}px -> ${filename}`);

        try {
          await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
          // Wait for images and animations to settle
          await new Promise(r => setTimeout(r, 3000));

          await page.screenshot({
            path: filepath,
            fullPage: true,
            type: 'png',
          });
          console.log(`  Saved ${filename}`);
        } catch (err) {
          console.error(`  FAILED ${filename}: ${err.message}`);
        }

        await page.close();
      }
    }
  }

  await browser.close();
  console.log('\nDone!');
}

run();
