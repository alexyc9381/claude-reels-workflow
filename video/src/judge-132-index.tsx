import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, JUDGE_TOTAL, HookCut, OpenCut, Open2Cut, Open3Cut, Open4Cut, Open5Cut, Open6Cut, Open7Cut, Open8Cut, Open9Cut } from "./ClaudeJudge132Reel";

/* Reel 132 "JUDGE". Board: storyboards/132-judge.md.
   1044 frames = 34.80s. The cut removes 32.07s of SIX `cut cut` retakes and
   dead air from a 66.87s raw take — five of the six were invisible to a
   whole-file transcription and only showed up once the raw was split at every
   measured silence and each chunk transcribed on its own.
   ⚠️ 34.80s is above the playbook's 22-29s house range; flagged, not trimmed. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const ReelHouse = makeReel("house");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("house", true);

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. Four MECHANISMS:
   measurement / revelation / impact / accumulation. */
const Root: React.FC = () => (<>
  {/* ⭐⭐⭐ round 11 — the shot Alex described: the dock, the colossal judge,
      the gavel, and REJECTED across the work. */}
  <Composition id="gavel" component={Open9Cut("gavel")} durationInFrames={100} {...V} />
  {/* ⭐⭐⭐ round 10 — ONE BIG THING, A QUIET ROOM. Measured off OX and BOSS at
      full size: one huge object, one huge word on it, everything else soft and
      desaturated. Round 9 had 36 saturated files and 7 hard-edged sprites. */}
  <Composition id="empty" component={Open8Cut("empty")} durationInFrames={100} {...V} />
  {/* ⭐⭐⭐ round 9 — AN ARRIVAL THAT COSTS SOMETHING. Ten hooks withheld the
      payoff; THE-OPEN.md (corrected by reel 104) says an open needs one thing
      to HAPPEN. The tower comes down, every slab splits, every one is empty. */}
  <Composition id="fall" component={Open7Cut("fall")} durationInFrames={100} {...V} />
  {/* ⭐⭐⭐ round 8 — THE VALUE STRUCTURE, measured off OX 119 and BOSS 128's
      own hook frames rather than reasoned about. Pale COOL ground · a NEAR-BLACK
      mass at 55%+ of frame height · ONE hot accent · a bank of countable lit
      content behind · a dark near-camera gallery band cropped by the edge. */}
  <Composition id="eye-A-bench" component={Open6Cut("bench")} durationInFrames={100} {...V} />
  <Composition id="eye-B-cold"  component={Open6Cut("cold")}  durationInFrames={100} {...V} />
  {/* ⭐⭐ round 7 — SUSPENSE IS DRAMATIC IRONY PLUS A CLOCK. Round 6's three
      all drew the LIE correctly and were all LOOPS: at f2 you know what f78
      looks like. Here the viewer sees a thing the hero does not, and the gap
      closes every frame. None of them reaches him. */}
  <Composition id="sus-A-shadows" component={Open5Cut("shadows")} durationInFrames={100} {...V} />
  <Composition id="sus-B-stack"   component={Open5Cut("stack")}   durationInFrames={100} {...V} />
  <Composition id="sus-C-sweep"   component={Open5Cut("sweep")}   durationInFrames={100} {...V} />
  {/* ⭐ round 6 — ILLUSTRATE THE SENTENCE. "stops Claude from LYING TO YOUR
      FACE." Rounds 1-5 drew the COURTROOM (pressure, judgment, impact); not one
      of them drew the LIE. Mute test: a stranger must be able to say "lying". */}
  <Composition id="lie-A-jester" component={Open4Cut("jester")} durationInFrames={100} {...V} />
  <Composition id="lie-B-mask"   component={Open4Cut("mask")}   durationInFrames={100} {...V} />
  <Composition id="lie-C-dummy"  component={Open4Cut("dummy")}  durationInFrames={100} {...V} />
  {/* round 5 — ANTICIPATION: a promised event whose resolution is WITHHELD.
      Each carries a countdown the viewer can read; none of them resolves. */}
  <Composition id="antic-A-bulge"   component={Open3Cut("bulge")}   durationInFrames={100} {...V} />
  <Composition id="antic-B-descend" component={Open3Cut("descend")} durationInFrames={100} {...V} />
  <Composition id="antic-C-lean"    component={Open3Cut("lean")}    durationInFrames={100} {...V} />
  {/* round 4 — BARE STAGE, one dominant object each, a different object in
      every one. `feedback_hook_simplicity` is the rule round 3 broke. */}
  <Composition id="bare-A-tear"   component={Open2Cut("tear")}   durationInFrames={100} {...V} />
  <Composition id="bare-B-beam"   component={Open2Cut("beam")}   durationInFrames={100} {...V} />
  <Composition id="bare-C-facade" component={Open2Cut("facade")} durationInFrames={100} {...V} />
  <Composition id="bare-D-scale"  component={Open2Cut("scale")}  durationInFrames={100} {...V} />
  {/* round 3 — five MECHANISMS, none defended */}
  <Composition id="open-A-tower"  component={OpenCut("tower")}  durationInFrames={100} {...V} />
  <Composition id="open-B-stamp"  component={OpenCut("stamp")}  durationInFrames={100} {...V} />
  <Composition id="open-C-haul"   component={OpenCut("haul")}   durationInFrames={100} {...V} />
  <Composition id="open-D-charge" component={OpenCut("charge")} durationInFrames={100} {...V} />
  <Composition id="hook-0-seal"  component={HookCut("seal")}  durationInFrames={100} {...V} />
  <Composition id="hook-2-light" component={HookCut("light")} durationInFrames={100} {...V} />
  <Composition id="hook-3-gavel" component={HookCut("gavel")} durationInFrames={100} {...V} />
  <Composition id="hook-4-wall"  component={HookCut("wall")}  durationInFrames={100} {...V} />
  <Composition id="judge-house" component={ReelHouse} durationInFrames={JUDGE_TOTAL} {...V} />
  <Composition id="judge-amber" component={ReelAmber} durationInFrames={JUDGE_TOTAL} {...V} />
  <Composition id="judge-steel" component={ReelSteel} durationInFrames={JUDGE_TOTAL} {...V} />
  <Composition id="judge-quiet" component={ReelQuiet} durationInFrames={JUDGE_TOTAL} {...V} />
</>);

registerRoot(Root);
