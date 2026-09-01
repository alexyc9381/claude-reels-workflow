import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, FREE_TOTAL, HookCut } from "./ClaudeFree131Reel";

/* Reel 131 "FREE". Board: storyboards/131-free.md.
   828 frames = 27.60s, inside the playbook's 22-29s house range. The cut
   removes 18.46s of TWO `cut cut` retakes and dead air from a 46.07s raw take,
   and ships at x1.00 because R1 is binding (see ClaudeFree131Reel's header). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const ReelHouse = makeReel("house");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("house", true);

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. */
const Root: React.FC = () => (<>
  <Composition id="hook-1-toll"     component={HookCut("toll")}     durationInFrames={100} {...V} />
  <Composition id="hook-2-meter"    component={HookCut("meter")}    durationInFrames={100} {...V} />
  <Composition id="hook-3-shutters" component={HookCut("shutters")} durationInFrames={100} {...V} />
  {/* round 2 — three more mechanisms, all logo-forward */}
  <Composition id="hook-4-vending" component={HookCut("vending")} durationInFrames={100} {...V} />
  <Composition id="hook-5-stack"   component={HookCut("stack")}   durationInFrames={100} {...V} />
  <Composition id="hook-6-wall"    component={HookCut("wall")}    durationInFrames={100} {...V} />
  <Composition id="free-house" component={ReelHouse} durationInFrames={FREE_TOTAL} {...V} />
  <Composition id="free-amber" component={ReelAmber} durationInFrames={FREE_TOTAL} {...V} />
  <Composition id="free-steel" component={ReelSteel} durationInFrames={FREE_TOTAL} {...V} />
  <Composition id="free-quiet" component={ReelQuiet} durationInFrames={FREE_TOTAL} {...V} />
</>);

registerRoot(Root);
