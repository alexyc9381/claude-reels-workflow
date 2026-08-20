import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelShop, ReelAmber, ReelSteel, ReelQuiet, ReelLine, ReelShutter, ReelShutterAmber, GO_TOTAL } from "./ClaudeGoReel";

/* Reel 113 "GO". Board: storyboards/113-go.md.

   Subject, verified live 2026-08-19:
     nidhinjs/prompt-master   11,415★   MIT   free
     "A Claude skill that writes the accurate prompts for any AI tool."

   THE JOB SHOP: a shop that makes one-off parts to a written order. A foreman
   buried under a mound of his own scrap keeps feeding the mill a scribbled
   slip; a cream drawing board drops in between the order and the machine and
   turns the scribble into a dimensioned spec with an output silhouette, a file
   scope and a stop block. The villain is THE SCRAP CHUTE — fed in S0, S3 and
   S8, still open at S10's before-state, and beaten exactly once, at the peak.

   1558 frames = 51.93s. ⭐ Outside the 22-29s house range, inside what ships.
   ⛔ R1 fails at EVERY tempo including 1.00x (worst-5s 5.20 vs a 4.5 bar) and
   fails identically on the untrimmed take — the delivery is 4.10 wps. FLAGGED.

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files — IG
   flags near-duplicates, so the axes that vary are the ones a perceptual hash
   samples hardest: an in-panel CAMERA OFFSET on every scene, a per-cut GRADE
   (contrast/gamma, which is what a dHash actually reads), a different HOOK
   RHYTHM, a different BED (three non-overlapping windows of one source) and a
   different CAPTION BAND Y. ⛔ The camera offset goes on the panel CONTENTS,
   never the whole comp: scaling the comp moves the chassis and wrecks the
   motion audit (measured on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038
   on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="go-shop" component={ReelShop} durationInFrames={GO_TOTAL} {...V} />
  {/* the two limit-shaped opens cut into the full reel, for the pick */}
  <Composition id="go-line" component={ReelLine} durationInFrames={GO_TOTAL} {...V} />
  <Composition id="go-shutter" component={ReelShutter} durationInFrames={GO_TOTAL} {...V} />
  <Composition id="go-shutter-amber" component={ReelShutterAmber} durationInFrames={GO_TOTAL} {...V} />
  <Composition id="go-amber" component={ReelAmber} durationInFrames={GO_TOTAL} {...V} />
  <Composition id="go-steel" component={ReelSteel} durationInFrames={GO_TOTAL} {...V} />
  {/* identical picture to go-shop, music bed 6 dB down — an A/B on the bed only */}
  <Composition id="go-quiet" component={ReelQuiet} durationInFrames={GO_TOTAL} {...V} />
</>);

registerRoot(Root);
