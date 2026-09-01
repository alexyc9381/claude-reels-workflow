/** Burst-screenshot a scroll-through of each site into a 64-frame sequence.
 *  ⛔ v1 ran with colorScheme:'dark' and every capture came back at luma 46-53,
 *  which is a large part of why the reel read dark however the sets were
 *  painted. The matte rule is explicit: SCREENS SHOULD BE LIGHT. */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/allyy/.npm-global/lib/node_modules/playwright');
import fs from 'fs';
const OUT = new URL('../video/public/web124/frames/', import.meta.url).pathname;
const EXE = '/Users/allyy/.cache/puppeteer/chrome/mac_arm-151.0.7922.47/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const REC = [
  ['r_haoqi',   'https://haoqi.design/',                 1000],
  ['r_gsap',    'https://gsap.com/',                     1300],
  ['r_spline',  'https://spline.design/',                1300],
  ['r_lenis',   'https://lenis.darkroom.engineering/',   1300],
  ['r_lovable', 'https://lovable.dev/',                  1300],
  ['r_replit',  'https://replit.com/',                   1300],
];
const N = 64;
const b = await chromium.launch({ executablePath: EXE, args: ['--disable-blink-features=AutomationControlled'] });
for (const [id, url, span] of REC) {
  const dir = `${OUT}${id}_lt/`;
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: 'light',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
    locale: 'en-US', timezoneId: 'America/Los_Angeles' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await p.waitForTimeout(13000);
    for (const t of ['Reject all','Decline','Only necessary','Accept all','I agree','Got it','Accept']) {
      const btn = p.locator(`button:has-text("${t}")`).first();
      if (await btn.count() && await btn.isVisible().catch(()=>false)) { await btn.click().catch(()=>{}); await p.waitForTimeout(500); break; }
    }
    for (let i = 0; i < N; i++) {
      const k = i / (N - 1);
      await p.evaluate(v => window.scrollTo(0, v), Math.round(span * k * k * (3 - 2 * k)));
      await p.waitForTimeout(90);
      await p.screenshot({ path: `${dir}f${String(i).padStart(3,'0')}.png` });
    }
    console.log(`REC OK ${id} -> ${dir}`);
  } catch (e) { console.log(`REC FAIL ${id} ${e.message.slice(0,70)}`); }
  await ctx.close();
}
await b.close();
