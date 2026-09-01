import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/allyy/.npm-global/lib/node_modules/playwright');
const OUT = new URL('../video/public/web124/', import.meta.url).pathname;
const EXE = '/Users/allyy/.cache/puppeteer/chrome/mac_arm-151.0.7922.47/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const TRY = [
  ['dora',      'https://www.dora.run/'],
  ['dora2',     'https://dora.run/'],
  ['doracom',   'https://www.dora.run/ai'],
];
const b = await chromium.launch({ executablePath: EXE, args:['--disable-blink-features=AutomationControlled'] });
for (const [id,url] of TRY) {
  const ctx = await b.newContext({ viewport:{width:1280,height:900}, deviceScaleFactor:2,
    userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil:'load', timeout:60000 });
    await p.waitForTimeout(9000);
    await p.screenshot({ path:`${OUT}${id}_hero.png` });
    const h = await p.evaluate(()=>document.body.scrollHeight);
    for (let y=0;y<Math.min(h,9000);y+=600){ await p.evaluate(v=>window.scrollTo(0,v),y); await p.waitForTimeout(320); }
    await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(1800);
    await p.screenshot({ path:`${OUT}${id}_full.png`, fullPage:true });
    const title = await p.title();
    console.log(`OK   ${id}  ${h}px  "${title}"`);
  } catch(e){ console.log(`FAIL ${id}  ${e.message.slice(0,80)}`); }
  await ctx.close();
}
await b.close();
