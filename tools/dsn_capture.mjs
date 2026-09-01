/**
 * dsn_capture.mjs — reel 127's REAL captures.
 *
 * ⭐⭐⭐ Alex: *"try to use real images whenever possible and more than just basic
 * graphics."* Real UI is the biggest single motion lever in this repo and it is
 * not close (reel 107 median 6.36 -> 8.00; reel 111 10.90 -> 12.51), and it is
 * simultaneously the receipt for "this feature exists and looks like this".
 *
 * The subject here is a Claude Code feature, so the SUBJECT capture is Claude
 * Code's own release note for it, and the REFERENCE captures are what a viewer
 * would actually want the canvas to be producing.
 * ⛔ Reference sites go on the boards, never under a claim about what the tool
 * built for you.
 */
import { chromium } from '/Users/allyy/.npm-global/lib/node_modules/playwright/index.mjs';
const OUT = new URL('../video/public/refs/d127/', import.meta.url).pathname;

const SITES = [
  /* ⛔⛔ CLAUDE'S OWN SURFACES ONLY. The first pass captured three third-party
     product pages and cropped "component regions" out of them, and two of the
     four crops still carried an identifiable mark — a customer logo row on one,
     a wordmark inside an activity feed on the other — on boards the reel puts
     under "your existing design system". A crop is not a safe substitute for
     choosing a safe source. These are all Claude Code's own docs: real pixels,
     real density, on-subject, and the receipt for the feature the reel is about. */
  ['docs_design',   'https://code.claude.com/docs/en/whats-new/2026-w34', 3000, 'light'],
  ['docs_artifact', 'https://code.claude.com/docs/en/artifacts',          3000, 'light'],
  ['docs_skills',   'https://code.claude.com/docs/en/skills',             3000, 'light'],
  ['docs_hooks',    'https://code.claude.com/docs/en/hooks',              3000, 'light'],
  ['docs_mcp',      'https://code.claude.com/docs/en/mcp',                3000, 'light'],
];
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN });
for (const [id, url, keep, scheme] of SITES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1600 },
                                          deviceScaleFactor: 2, colorScheme: scheme });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    /* ⛔ SCROLL FIRST — every page worth capturing uses scroll-triggered reveals,
       so a fullPage shot on load is a page of empty placeholders. */
    for (let y = 0; y < keep; y += 700) { await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(320); }
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}${id}.png`, clip: { x: 0, y: 0, width: 1280, height: keep } });
    console.log('ok  ', id);
  } catch (e) { console.log('FAIL', id, String(e).split('\n')[0]); }
  await ctx.close();
}
await browser.close();
