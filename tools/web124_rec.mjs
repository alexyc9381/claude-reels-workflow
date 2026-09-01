/** Deterministic scroll RECORDINGS: one screenshot per scroll position, assembled
 *  to mp4 at 30fps. More reliable than playwright's webm recorder here, and for a
 *  SCROLL-DRIVEN site a frame per scroll position IS the animation. */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/allyy/.npm-global/lib/node_modules/playwright');
import { mkdirSync } from 'fs';
const OUT = new URL('../video/public/web124/', import.meta.url).pathname;
const EXE = '/Users/allyy/.cache/puppeteer/chrome/mac_arm-151.0.7922.47/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const REC = [
  ['r_draftly',  'https://www.draftly.space/',            4200],
  ['r_haoqi',    'https://haoqi.design/',                 3200],
  ['r_spline',   'https://spline.design/',                4200],
  ['r_lenis',    'https://lenis.darkroom.engineering/',   4200],
  ['r_gsap',     'https://gsap.com/',                     4200],
  ['r_codrops',  'https://tympanus.net/codrops/',         3200],
];
const N = 64;
const b = await chromium.launch({ executablePath: EXE });
for (const [id,url,span] of REC) {
  const dir = `${OUT}frames/${id}`; mkdirSync(dir, { recursive: true });
  const ctx = await b.newContext({ viewport:{width:1280,height:800}, colorScheme:'dark' });
  const p = await ctx.newPage();
  try {
    await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
    await p.waitForTimeout(6000);
    for (const t of ['Reject all','Decline','Only necessary','Accept all','I agree','Got it','Accept']) {
      const btn = p.locator(`button:has-text("${t}")`).first();
      if (await btn.count() && await btn.isVisible().catch(()=>false)) { await btn.click().catch(()=>{}); await p.waitForTimeout(500); break; }
    }
    const h = await p.evaluate(()=>document.body.scrollHeight);
    const s = Math.min(h-800, span);
    for (let i=0;i<N;i++){
      const k=i/(N-1);
      await p.evaluate(v=>window.scrollTo({top:v,behavior:'instant'}), Math.round(s*k));
      await p.waitForTimeout(110);
      await p.screenshot({ path:`${dir}/f${String(i).padStart(3,'0')}.png` });
    }
    console.log(`REC OK ${id} span ${s}px of ${h}`);
  } catch(e){ console.log(`REC FAIL ${id} ${e.message.slice(0,70)}`); }
  await ctx.close();
}
await b.close();
console.log('DONE');
