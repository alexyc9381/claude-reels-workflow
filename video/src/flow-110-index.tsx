import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelNight, ReelAmber, ReelSteel, ReelLoud, FLW_TOTAL } from "./ClaudeFlowReel";

/* Reel 110 "FLOW". Board: storyboards/110-flow.md.
   github.com/ruvnet/ruflo — one Claude drowning in a queue types `npx ruflo init`
   and becomes SIXTY Claudes that work in parallel, share one memory, improve each
   other every run, and route the easy work off the frontier model.

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files —
   IG flags near-duplicates, so the axes that vary are the ones a perceptual hash
   samples hardest: an in-panel CAMERA OFFSET on every scene, a different PUSH on
   every scene, and a different CAPTION BAND Y.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp: scaling
   the comp moves the chassis and wrecks the motion audit (measured on reels
   83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).

   958 frames = 31.93s, carrying the VO's 31.92s tail. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="flw-night" component={ReelNight} durationInFrames={FLW_TOTAL} {...V} />
  <Composition id="flw-amber" component={ReelAmber} durationInFrames={FLW_TOTAL} {...V} />
  <Composition id="flw-steel" component={ReelSteel} durationInFrames={FLW_TOTAL} {...V} />
  {/* identical picture to flw-night with the OLD, hotter bed — an A/B reference
      for the music level only. ⛔ Not for posting: it is a pixel duplicate of
      flw-night, which is exactly what IG flags. */}
  <Composition id="flw-loud" component={ReelLoud} durationInFrames={FLW_TOTAL} {...V} />
</>);

registerRoot(Root);
