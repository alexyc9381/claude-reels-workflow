import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, ADH_TOTAL, HookCut } from "./ClaudeAdhd136Reel";

/* REEL 136 "ADHD" — THE LINE. Board: storyboards/136-adhd.md.
   1058 frames = 35.27s. The cut removes NINE "cut cut" flubs and false starts
   from a 65.39s raw take; every keep-boundary was chosen by an isolated
   transcription sweep, not by a word time, and every join is a slice of the
   take's own verified-empty room tone.
   ⚠️ Tempo is PIECEWISE: hook x0.90, body x1.00. R1 hook 4.10 (bar 4.0) and
   worst-5s 5.20 (bar 4.5) — both the recording's own pace, both flagged.
   ⚠️ 35.27s is 6.3s over the 22-29s house range. Flagged, not trimmed.
   ⚠️⚠️ THE SUBJECT REPO IS UNRESOLVED — see the header of ClaudeAdhd136Reel. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES. Each opens on a different
   one-word MECHANISM, and the bodies differ by rake phase, contrast, a level
   camera nudge, per-cut layout and a different MIRROR subset:
     house   WANDER        a body walks off the job after a cake
     amber   ACCUMULATION  tickets stab themselves onto a spike, faster
     steel   SPREAD        the line catches fire behind a grinning cook */
export const ReelHouse = makeReel("house", false, "wander");
export const ReelAmber = makeReel("amber", false, "spike");
export const ReelSteel = makeReel("steel", false, "scorch");
export const ReelQuiet = makeReel("house", true, "wander");

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. */
const Root: React.FC = () => (<>
  <Composition id="hook-0-wander" component={HookCut("wander")} durationInFrames={135} {...V} />
  <Composition id="hook-1-spike"  component={HookCut("spike")}  durationInFrames={135} {...V} />
  <Composition id="hook-2-scorch" component={HookCut("scorch")} durationInFrames={135} {...V} />
  <Composition id="adh-house" component={ReelHouse} durationInFrames={ADH_TOTAL} {...V} />
  <Composition id="adh-amber" component={ReelAmber} durationInFrames={ADH_TOTAL} {...V} />
  <Composition id="adh-steel" component={ReelSteel} durationInFrames={ADH_TOTAL} {...V} />
  <Composition id="adh-quiet" component={ReelQuiet} durationInFrames={ADH_TOTAL} {...V} />
</>);

registerRoot(Root);
