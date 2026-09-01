import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, JUDGE_TOTAL, HookCut, OpenCut, Open2Cut } from "./ClaudeJudge132Reel";

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
