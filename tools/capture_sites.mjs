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

/** ⭐⭐ TWO KINDS OF CAPTURE, AND THEY DO DIFFERENT JOBS.
 *
 *  SUBJECT sites are the products the VO names. They go where the product is
 *  named, and they are the receipt.
 *
 *  REFERENCE sites are what the viewer actually WANTS — award-winning animated
 *  work. Alex, after seeing a cut built only from subject sites: *"we need to
 *  see example sites of really good animated scroll sites that we can pull from
 *  even if its not designed from them"*, and *"the hook site isnt good enough"*.
 *  A product's own docs page is correct, on-topic, and not what anybody is
 *  aspiring to. The reference layer is the aspiration.
 *
 *  ⛔⛔ REFERENCE SITES GO IN THE HOOK AND ON INSPIRATION BOARDS, NEVER AT THE
 *  PAYOFF. Showing a named company's homepage under "this is what you built"
 *  implies it was built with the thing you are selling; stamping a price across
 *  it implies what that company charges. Reel 111 solved both by using a WALL of
 *  many (awwwards' winners grid) for the hook, so no single site is implicated,
 *  and by keeping the payoff on a subject site that genuinely is built from its
 *  own components.
 *
 *  ⛔⛔ START EVERY SINGLE-SITE SCROLL AT 0 — AT THE VERY TOP OF THE PAGE.
 *  Alex: *"when you show a single site scroll down, start at the very top
 *  because those usually have the best scroll animations."* This is the exact
 *  OPPOSITE of what a brightest-window measurement tells you: the brightest band
 *  on most pages is a mid-page marketing section, and the HERO is where the
 *  scroll work actually lives. Measure the TOP window, not the best window, and
 *  reject a site whose top is weak rather than scrolling past it. (The
 *  brightest-window rule still holds for the HOOK, where frame-0 luma is gated,
 *  and there it should be a GALLERY rather than a single site anyway.)
 *
 *  ⛔⛔ CONSENT BANNERS GET BAKED INTO THE CAPTURE AND WILL SHIP. Porsche's
 *  landed mid-strip and reached a rendered cut. It then survived all three
 *  dismissal passes below — click-by-deny-text, click-by-accept-text, and
 *  remove-everything-still-fixed — because the dialog was out of reach of the
 *  DOM query. **Some sites cannot be captured cleanly headless. Drop them
 *  rather than fight them**, and eyeball every strip before wiring it in.
 *
 *  ⛔ WEBGL AND LOADER-HEAVY SITES OFTEN CAPTURE BLANK. Of ten reference sites
 *  tried, lusion.co, obys.agency and igloo.inc all came back empty or mid-loader
 *  (measured edge-detail 434 / 516 / 0 against awwwards' 8,871). Measure every
 *  capture before using it; do not eyeball the filenames.
 *
 *  [id, url, how many CSS px of the page are worth keeping] */
const SUBJECT = [
  ['skiper', 'https://skiper-ui.com/',      2700],
  ['veng',   'https://www.vengenceui.com/', 3500],
  ['anim',   'https://animmasterlib.dev/',  4400],
];
/** The set that survived. Pulled from awwwards' own "best scrolling websites"
 *  gallery plus the scroll libraries' own pages, then measured at the TOP window
 *  and eyeballed. These are the ones with a hero worth opening on. */
const REFERENCE = [
  ['ex_awwwards',  'https://www.awwwards.com/websites/',      4200], // the winners wall — HOOK
  ['ex_lenis',     'https://lenis.darkroom.engineering/',     4200], // "SMOOTH SCROLL", blackletter
  ['ex_gsap',      'https://gsap.com/',                       4200], // "Animate anyth!ng"
  ['ex_basement',  'https://basement.studio/',                3600], // 3D arcade, dark + cinematic
  ['ex_haoqi',     'https://haoqi.design/',                   4200], // blue + colourful 3D
  ['ex_superlist', 'https://www.superlist.com/',              4200], // purple gradient hero
  ['ex_darkroom',  'https://darkroom.engineering/',           4200], // red on black
  ['ex_stripe',    'https://stripe.com/',                     4200],
];
/* tried and rejected: lusion.co · obys.agency · igloo.inc · exoape.com ·
   austinwerner.io (blank or mid-loader) · racing.porsche.com (unbeatable consent
   dialog) · linearity.io · drinkstill.nz · faers.tech · noth.in (empty tops) */
const SITES = [...SUBJECT, ...REFERENCE];

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
