import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelMarket, ReelAmber, ReelSteel, ReelQuiet, STAR_TOTAL } from "./ClaudeStarReel";

/* Reel 115 "STAR". Board: storyboards/115-star.md.

   Subject, verified live 2026-08-20 against the GitHub API and each README:
     ripienaar/free-for-dev         132,255★   1,346 entries in 56 sections
     public-apis/public-apis        466,531★   1,706 APIs in 51 categories, MIT
     D4Vinci/Scrapling               75,397★   BSD-3, Cloudflare Turnstile bypass
     ollama/ollama                  179,017★   MIT, one-command local models
     punkpeye/awesome-mcp-servers    92,592★   MIT
     COMBINED                       945,792★

   THE FREE MARKET: a night market behind a coin turnstile. Outside the arch
   everything carries a price tag and a card reader; inside, five stalls give
   away what the street charges for, and each stall is the literal mechanism of
   its repo. The villain is THE METER — it wins at S0 (the turnstile), S4 (the
   card reader) and S7 (the $300/mo dial), and it is beaten exactly once, at
   S10, where a whole row of them goes dark.

   1604 frames = 53.47s. ⚠️ Outside the 22-29s house range and FLAGGED, not
   trimmed: every second is spoken content and no edit reaches 30s without
   dropping one of the five repos. Recent ships: 107 = 35.06 · 109 = 31.65 ·
   110 = 31.36 · 111 = 33.49 · 112 = 81.63 · 113 = 51.93.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="star-market" component={ReelMarket} durationInFrames={STAR_TOTAL} {...V} />
  <Composition id="star-amber" component={ReelAmber} durationInFrames={STAR_TOTAL} {...V} />
  <Composition id="star-steel" component={ReelSteel} durationInFrames={STAR_TOTAL} {...V} />
  <Composition id="star-quiet" component={ReelQuiet} durationInFrames={STAR_TOTAL} {...V} />
</>);

registerRoot(Root);
