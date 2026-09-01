import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, WEB_TOTAL } from "./ClaudeWebReel";
import { HookA, HookB, HookC, HookD, HookE, HookF } from "./WebHooks";

/* Reel 124 "WEB". Board: storyboards/124-web.md.

   Three trial cuts, built as three POINTS rather than one baseline and two
   orbits: each carries its own camera framing, its own rake phase (0 / 104 /
   208 over a 312px band pitch — a clean third, not the inert 0/214/428 reel 115
   shipped) and its own hook rhythm. Measured with tools/dhash_cuts.py against
   the house targets: mean >= 14, MIN >= 10.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const ReelNight = makeReel("night");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("night", "quiet");

const Root: React.FC = () => (<>
  {/* ⛔⛔⛔ docs/THE-OPEN.md STEP 1, run properly this time. Four hook concepts,
      four different WORLDS, each at full chassis quality — because the decision
      is visual and a description cannot be judged. The first three rounds of
      this reel were spent defending ONE authored hook, which is exactly what
      that doc's opening line says not to do. */}
  {/* ⭐ E and F follow the STRUCTURE read off OX and UNLAZY's own frames: a
      living thing, a physical process you can see coming, one huge object. */}
  <Composition id="hookE-same-face" component={HookE} durationInFrames={102} {...V} />
  <Composition id="hookF-grey-pour" component={HookF} durationInFrames={102} {...V} />
  <Composition id="hookA-peg-rail"  component={HookA} durationInFrames={102} {...V} />
  <Composition id="hookB-same-door" component={HookB} durationInFrames={102} {...V} />
  <Composition id="hookC-dust-sheet" component={HookC} durationInFrames={102} {...V} />
  <Composition id="hookD-portraits" component={HookD} durationInFrames={102} {...V} />
  <Composition id="web-night" component={ReelNight} durationInFrames={WEB_TOTAL} {...V} />
  <Composition id="web-amber" component={ReelAmber} durationInFrames={WEB_TOTAL} {...V} />
  <Composition id="web-steel" component={ReelSteel} durationInFrames={WEB_TOTAL} {...V} />
  <Composition id="web-quiet" component={ReelQuiet} durationInFrames={WEB_TOTAL} {...V} />
</>);

registerRoot(Root);
