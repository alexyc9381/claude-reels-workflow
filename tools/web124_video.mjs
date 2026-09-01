/** Real SCREEN RECORDINGS of scroll-animated sites + subject-candidate stills.
 *  A strip scrolled in Remotion shows LAYOUT; only a recording shows the site's
 *  own scroll-driven motion, which is the thing this reel is about. */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/allyy/.npm-global/lib/node_modules/playwright');
const OUT = new URL('../video/public/web124/', import.meta.url).pathname;
const VID = OUT + 'vid/';
const EXE = '/Users/allyy/.cache/puppeteer/chrome/mac_arm-151.0.7922.47/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const STILLS = [];
// sites whose OWN scroll work is worth recording (measured winners + the subject)
const REC = [
  ['r_lenis',    'https://lenis.darkroom.engineering/',      8.0],
  ['r_codrops',  'https://tympanus.net/codrops/',            8.0],
  ['r_gsap',     'https://gsap.com/',                        8.0],
  ['r_basement', 'https://basement.studio/',                 8.0],
  ['r_aw3d',     'https://www.awwwards.com/websites/3d/',    8.0],
  ['r_superlist','https://www.superlist.com/',               8.0],
];
const b = await chromium.launch({ executablePath: EXE });

for (const [id,url] of STILLS) {
  const ctx = await b.newContext({ viewport:{width:1280,height:900}, deviceScaleFactor:2, colorScheme:'dark' });
  const p = await ctx.newPage();
  try {
    await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000}); await p.waitForTimeout(6000);
    await p.screenshot({path:`${OUT}${id}_hero.png`});
    const h = await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<Math.min(h,9000);y+=650){await p.evaluate(v=>window.scrollTo(0,v),y); await p.waitForTimeout(300);}
    await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(1500);
    await p.screenshot({path:`${OUT}${id}_full.png`,fullPage:true});
    console.log(`STILL OK ${id} ${h}px "${await p.title()}"`);
  } catch(e){ console.log(`STILL FAIL ${id} ${e.message.slice(0,70)}`); }
  await ctx.close();
}

for (const [id,url,secs] of REC) {
  const ctx = await b.newContext({ viewport:{width:1280,height:800}, colorScheme:'light',
    recordVideo:{ dir: VID + id + '_lt', size:{width:1280,height:800} } });
  const p = await ctx.newPage();
  try {
    await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
    await p.waitForTimeout(5000);
    for (const t of ['Reject all','Decline','Only necessary','Accept all','I agree','Got it','Accept']) {
      const btn = p.locator(`button:has-text("${t}")`).first();
      if (await btn.count() && await btn.isVisible().catch(()=>false)) { await btn.click().catch(()=>{}); await p.waitForTimeout(500); break; }
    }
    // one slow continuous scroll — this is what the site's own animation reacts to
    const h = await p.evaluate(()=>document.body.scrollHeight);
    const span = Math.min(h - 800, 5200);
    const steps = Math.round(secs*30);
    for (let i=0;i<steps;i++){
      const k = i/steps;
      await p.evaluate(v=>window.scrollTo(0,v), Math.round(span*k*k*(3-2*k)));  // smoothstep
      await p.waitForTimeout(1000/30);
    }
    await p.waitForTimeout(600);
    console.log(`REC OK ${id} span ${span}px`);
  } catch(e){ console.log(`REC FAIL ${id} ${e.message.slice(0,70)}`); }
  await ctx.close();
}
await b.close();
