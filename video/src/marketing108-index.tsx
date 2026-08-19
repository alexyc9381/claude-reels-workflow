import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelNight, ReelAmber, ReelSteel, MKT_TOTAL } from "./ClaudeMarketingReel";

/* Reel 108 "MARKETING". Board: storyboards/108-marketing.md.
   Seven Claude marketing skills, each switching on a department that used to
   cost a retainer. World = THE NIGHT SHIFT, a marketing house at 2am.

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files —
   IG flags near-duplicates, so the axes that vary are the ones a perceptual
   hash samples hardest: an in-panel CAMERA OFFSET on every scene, a different
   PUSH on every scene, and a different CAPTION BAND Y.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).

   1434 frames = 47.80s, carrying the VO's 47.781s tail. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="mkt-night" component={ReelNight} durationInFrames={MKT_TOTAL} {...V} />
  <Composition id="mkt-amber" component={ReelAmber} durationInFrames={MKT_TOTAL} {...V} />
  <Composition id="mkt-steel" component={ReelSteel} durationInFrames={MKT_TOTAL} {...V} />
</>);

registerRoot(Root);
