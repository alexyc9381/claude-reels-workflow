import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, HW_TOTAL, HookCut } from "./ClaudeHardwareReel";

/* Reel 122 "HARDWARE". Board: storyboards/122-hardware.md.
   1832 frames = 61.05s. ⚠️ Outside the 22-29s figure in the playbook and
   FLAGGED, not trimmed: every second is spoken content, and the cut already
   removes 103.9s of flubs, dead takes and dead air from a 164.95s raw take
   containing twelve separate `cut cut` retakes. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const ReelHouse = makeReel("house");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("house", true);

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. */
const Root: React.FC = () => (<>
  <Composition id="hook-1-crush" component={HookCut("crush")}   durationInFrames={106} {...V} />
  <Composition id="hook-2-drip"  component={HookCut("drip")}  durationInFrames={106} {...V} />
  <Composition id="hook-3-price" component={HookCut("price")} durationInFrames={106} {...V} />
  <Composition id="hw-house" component={ReelHouse} durationInFrames={HW_TOTAL} {...V} />
  <Composition id="hw-amber" component={ReelAmber} durationInFrames={HW_TOTAL} {...V} />
  <Composition id="hw-steel" component={ReelSteel} durationInFrames={HW_TOTAL} {...V} />
  <Composition id="hw-quiet" component={ReelQuiet} durationInFrames={HW_TOTAL} {...V} />
</>);

registerRoot(Root);
