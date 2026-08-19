/**
 * capture_sites.mjs — pull REAL, full-resolution captures of a reel's subject
 * sites into `video/public/shots/`, so a scene can show the actual product
 * instead of a drawing of it.
 *
 *   node tools/capture_sites.mjs
 *
 * ⭐⭐⭐ WHY THIS EXISTS. Real UI is the biggest single motion lever in this
 * repo and it is not close: it took reel 107's median 6.36 -> 8.00 (one scene
 * 6.30 -> 10.25), and on reel 111 it took the median 10.90 -> 12.51 in one pass
 * with the hook 10.51 -> 14.19 and DECK 10.90 -> 15.08. It also satisfies the
 * playbook's PROOF requirement at the same time, because the receipt for "this
 * product exists and looks like this" is the product's own page.
 *
 * ⛔ THE ASSETS ARE GITIGNORED (this repo is code + text only), so this script
 * is the reproducible part. Re-run it to rebuild `shots/` from scratch.
 *
 * ⛔ SCROLL THE PAGE BEFORE CAPTURING. Every site worth putting in a reel uses
 * scroll-triggered reveals, so a fullPage screenshot taken on load is a page of
 * empty placeholders. This walks the page in 700px steps first.
 *
 * ⛔ CAPTURE AT 2x AND DOWNSAMPLE. The reel's browser viewport is ~900px wide;
 * a 1x capture upscaled into it is visibly soft.
 *
 * ⛔ THE TOP OF A PAGE IS USUALLY ITS DARKEST BAND (a nav bar over a hero), and
 * frame 0 is a brightness competition. After capturing, measure the strip in
 * viewport-height windows and open the scene on the BRIGHTEST one — on reel 111
 * that was skiper-ui.com's component grid at strip y=720 (mean 149) against a
 * page top that read near zero. It is brighter AND more interesting: you see
 * the actual components rather than a logo.
 */
import { chromium } from 'playwright';

const OUT = new URL('../video/public/shots/', import.meta.url).pathname;

/** [id, url, how many CSS px of the page are worth keeping] */
const SITES = [
  ['skiper', 'https://skiper-ui.com/',      2700],
  ['veng',   'https://www.vengenceui.com/', 3500],
  ['anim',   'https://animmasterlib.dev/',  4400],
];

const VP_W = 900;   // the reel's browser viewport width

const browser = await chromium.launch();
for (const [id, url, keep] of SITES) {
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 1500 },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (e) {
    console.log(`${id}: nav warning (${e.message.slice(0, 60)}) — continuing`);
  }
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}${id}_hero.png` });

  // fire the scroll-triggered reveals
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < Math.min(h, 12000); y += 700) {
    await page.evaluate(v => window.scrollTo(0, v), y);
    await page.waitForTimeout(320);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);

  await page.screenshot({ path: `${OUT}${id}_full.png`, fullPage: true });
  console.log(`${id}: page ${h}px, keeping top ${keep}px -> ${id}_strip.png / ${id}_top.png`);
  await ctx.close();
}
await browser.close();

console.log(`
Now downsample with PIL (Image.MAX_IMAGE_PIXELS = None — a component gallery can
be 45,000px tall and trips the decompression-bomb guard):

  strip = full.crop((0, 0, w, keep * 2)).resize((${VP_W}, ...))   ->  <id>_strip.png
  top   = hero.crop((0, 0, w, 1400 * 2)).resize((${VP_W}, ...))   ->  <id>_top.png

then DELETE the *_full.png — a 2x full-page capture of a long page is ~31 MB and
Remotion will happily bundle it.`);
