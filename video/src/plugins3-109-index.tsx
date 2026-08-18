import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelNight, ReelAmber, ReelSteel, PG3_TOTAL } from "./ClaudePlugins3Reel";

/* Reel 109 "PLUGINS3". Board: storyboards/109-plugins3.md.
   Three free Claude Code plugins, each knocking down a different wall:
   claude-code-setup (scan + recommend) · OmniRoute (route around the limit) ·
   claude-mem (carry context across sessions). World = THE ALL-NIGHT BUILD.

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files —
   IG flags near-duplicates, so the axes that vary are the ones a perceptual
   hash samples hardest: an in-panel CAMERA OFFSET on every scene, a different
   PUSH on every scene, and a different CAPTION BAND Y.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).

   ⛔ Registered in its OWN root, not the shared `Root.tsx`, so a concurrent
   reel build in the same repo cannot collide with it.

   950 frames = 31.667s, carrying the VO's 31.650s tail. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="pg3-night" component={ReelNight} durationInFrames={PG3_TOTAL} {...V} />
  <Composition id="pg3-amber" component={ReelAmber} durationInFrames={PG3_TOTAL} {...V} />
  <Composition id="pg3-steel" component={ReelSteel} durationInFrames={PG3_TOTAL} {...V} />
</>);

registerRoot(Root);
