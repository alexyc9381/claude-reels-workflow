/**
 * web124_capture.mjs — real captures for reel 124 WEB (Dora, 3D scroll sites).
 * Pass 1: stills (hero + fullPage strip) for every candidate, so each can be MEASURED
 * before it is wired in. Playwright drives the puppeteer-cached Chrome.
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/allyy/.npm-global/lib/node_modules/playwright');
const OUT = new URL('../video/public/web124/', import.meta.url).pathname;
const EXE = '/Users/allyy/.cache/puppeteer/chrome/mac_arm-151.0.7922.47/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const SITES = [
  // SUBJECT — the tool the VO is about
  ['dora',      'https://www.dora.run/'],
  // REFERENCE — award-winning 3D / scroll work (the aspiration layer, hook + boards)
  ['aw3d',      'https://www.awwwards.com/websites/3d/'],
  ['awwebgl',   'https://www.awwwards.com/websites/webgl/'],
  ['awsites',   'https://www.awwwards.com/websites/'],
  ['lenis',     'https://lenis.darkroom.engineering/'],
  ['gsap',      'https://gsap.com/'],
  ['basement',  'https://basement.studio/'],
  ['haoqi',     'https://haoqi.design/'],
  ['spline',    'https://spline.design/'],
  ['bruno',     'https://bruno-simon.com/'],
  ['activeth',  'https://activetheory.net/'],
  ['zajno',     'https://zajno.com/'],
  ['codrops',   'https://tympanus.net/codrops/'],
  ['superlist', 'https://www.superlist.com/'],
  ['linear',    'https://linear.app/'],
  // CONTRAST — the flat prompt-to-page builders the VO names
  ['lovable',   'https://lovable.dev/'],
  ['replit',    'https://replit.com/'],
];

const browser = await chromium.launch({ executablePath: EXE });
for (const [id, url] of SITES) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark',
  });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(5500);
    // consent banners bake into the capture and ship — try three dismissals
    for (const t of ['Reject all','Decline','Deny','Only necessary','Accept all','I agree','Got it','Accept']) {
      const b = page.locator(`button:has-text("${t}")`).first();
      if (await b.count() && await b.isVisible().catch(()=>false)) { await b.click().catch(()=>{}); await page.waitForTimeout(600); break; }
    }
    await page.screenshot({ path: `${OUT}${id}_hero.png` });
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < Math.min(h, 9000); y += 650) {
      await page.evaluate(v => window.scrollTo(0, v), y);
      await page.waitForTimeout(280);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${OUT}${id}_full.png`, fullPage: true });
    console.log(`OK   ${id.padEnd(10)} page ${h}px`);
  } catch (e) {
    console.log(`FAIL ${id.padEnd(10)} ${e.message.slice(0, 70)}`);
  }
  await ctx.close();
}
await browser.close();
