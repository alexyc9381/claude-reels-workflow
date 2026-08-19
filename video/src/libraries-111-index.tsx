import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelNight, ReelAmber, ReelSteel, ReelQuiet, LIB_TOTAL } from "./ClaudeLibrariesReel";

/* Reel 111 "LIBRARIES". Board: storyboards/111-libraries.md.
   Skiper UI · Vengeance UI · Animmaster Lib — an AI-generated site is a bare
   grey shell on a night high street; three crates land on the pavement and
   three crews fit it out until it out-burns the $10,000 agency tower.

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files —
   IG flags near-duplicates, so the axes that vary are the ones a perceptual
   hash samples hardest: an in-panel CAMERA OFFSET on every scene, a per-cut
   GRADE, a different HOOK ACTION (the price lands in a different rhythm and
   the board drops from a different height), a different BED, and a different
   CAPTION BAND Y.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).

   1005 frames = 33.50s, carrying the VO's 33.49s tail. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="lib-night" component={ReelNight} durationInFrames={LIB_TOTAL} {...V} />
  <Composition id="lib-amber" component={ReelAmber} durationInFrames={LIB_TOTAL} {...V} />
  <Composition id="lib-steel" component={ReelSteel} durationInFrames={LIB_TOTAL} {...V} />
  {/* identical picture to lib-night, music bed 6 dB down — for an A/B on the
      bed level only */}
  <Composition id="lib-quiet" component={ReelQuiet} durationInFrames={LIB_TOTAL} {...V} />
</>);

registerRoot(Root);
