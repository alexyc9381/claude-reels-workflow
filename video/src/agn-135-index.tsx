import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, AGN_TOTAL, HookCut } from "./ClaudeAgency135Reel";

/* Reel 135 "AGENCY". Board: storyboards/135-agency.md.
   652 frames = 21.73s. The cut removes one "cut cut" flub, 9.9s of dead air in
   the middle of the take and a 2.3s pause inside the last sentence, from a
   44.63s raw take. Every boundary sits in measured silence (all seven joins
   below -22 dB) and the cut file was re-transcribed to prove no flub survived.
   ⚠️ Tempo is PIECEWISE AND SLOWER than 1.0: hook x0.88, body x0.94, because
   the tight take runs 4.47 wps. ⚠️ 21.73s is 0.27s under the 22-29s house
   floor; flagged, not padded.
   ⚠️⚠️ SAME SUBJECT AS REEL 94 — flagged in the reel file's header. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES (`memory/three-cuts-three-hooks`).
   Camera + contrast + rake + bed is a crop, a tilt, a tone curve and a bed —
   nothing that HAPPENS is different, and a dHash passes the whole time because
   it measures PIXELS, NOT EVENTS. Each cut opens on a different MECHANISM:
     house  POSSESSION    a key too heavy to hold drives into the lock
     amber  SUMMONS       one cord is pulled and eighteen bells call the house
     steel  ACCUMULATION  the call sheet unrolls and will not stop */
export const ReelHouse = makeReel("house", false, "key");
export const ReelAmber = makeReel("amber", false, "bell");
export const ReelSteel = makeReel("steel", false, "roll");
export const ReelQuiet = makeReel("house", true, "key");

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. */
const Root: React.FC = () => (<>
  <Composition id="hook-0-key"   component={HookCut("key")}   durationInFrames={82} {...V} />
  <Composition id="hook-1-bell"  component={HookCut("bell")}  durationInFrames={82} {...V} />
  <Composition id="hook-2-board" component={HookCut("board")} durationInFrames={82} {...V} />
  <Composition id="hook-3-roll"  component={HookCut("roll")}  durationInFrames={82} {...V} />
  <Composition id="agn-house" component={ReelHouse} durationInFrames={AGN_TOTAL} {...V} />
  <Composition id="agn-amber" component={ReelAmber} durationInFrames={AGN_TOTAL} {...V} />
  <Composition id="agn-steel" component={ReelSteel} durationInFrames={AGN_TOTAL} {...V} />
  <Composition id="agn-quiet" component={ReelQuiet} durationInFrames={AGN_TOTAL} {...V} />
</>);

registerRoot(Root);
