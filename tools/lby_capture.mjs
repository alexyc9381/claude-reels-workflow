/**
 * lby_capture.mjs — reel 130's REAL captures.
 *
 * ⭐⭐⭐ Alex: *"show the official screen recording stuff, images of the prompt
 * library etc."* Real UI is the biggest single motion lever in this repo and it
 * is not close (reel 107 median 6.36 -> 8.00; reel 111 10.90 -> 12.51), and for
 * THIS reel it is also the whole receipt: the subject is a page, so the proof
 * that the page exists and holds what the VO says it holds is the page.
 *
 * ⛔⛔ CLAUDE'S OWN SURFACES ONLY. Every URL below is Claude Code's own docs —
 * real pixels, real density, on-subject, and the receipt for the exact claim the
 * scene it lands in is making. [[feedback_a_crop_is_not_a_safe_source]]: two of
 * reel 127's four "component region" crops still carried an identifiable third-
 * party mark, so a crop is not a substitute for choosing a safe source.
 *
 * ⛔ SCROLL FIRST — the library page lazy-renders its cards, so a fullPage shot
 * on load is a page of empty placeholders.
 * ⛔ CAPTURE AT 2x AND DOWNSAMPLE. The panel is 1012px wide; a 1x capture
 * upscaled into it is visibly soft.
 */
import { chromium } from '/Users/allyy/.npm-global/lib/node_modules/playwright/index.mjs';
const OUT = new URL('../video/public/refs/l130/', import.meta.url).pathname;
const B = 'https://code.claude.com/docs/en/';

/* ⭐⭐ THE CAPTURES ARE TALL ON PURPOSE. A pane that shows the whole region at
   once has nothing to scroll through, and a still screenshot pinned to a wall is
   what took three scenes from `ok` to DIES INTO THE CUT. Each strip below is
   1400-1600px of real page; the pane shows a ~700px window of it and scrolls,
   which is what a screen recording IS. */
const SITES = [
  /* the SUBJECT — the page the whole reel is about */
  ['lib_strip',   B + 'prompt-library',    1500, 260],
  ['lib_cards',   B + 'prompt-library',    1400, 1560],
  /* the three rules, each the receipt for its own scene */
  ['skills',      B + 'skills',            1500, 300],
  ['memory',      B + 'memory',            1500, 260],
  ['modes',       B + 'permission-modes',  1500, 260],
];

const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN });
for (const [id, url, keep, from] of SITES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1500 },
                                         deviceScaleFactor: 2, colorScheme: 'light' });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(1800);
    for (let y = 0; y < from + keep; y += 700) {
      await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(300);
    }
    await page.evaluate(v => scrollTo(0, v), from); await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}${id}.png`,
      clip: { x: 0, y: from, width: 1440, height: keep } });
    console.log('ok  ', id);
  } catch (e) { console.log('FAIL', id, String(e).split('\n')[0]); }
  await ctx.close();
}
await browser.close();
