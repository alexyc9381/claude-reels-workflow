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
     house   THE FRONT   a giant ALL CLEAR board hides a room that is failing
     amber   SPLIT       one Claude becomes two, and only one of them works
     steel   HOLLOW      a body-sized sealed job opens onto nothing */
/* ⛔⛔ `PICKED` WAS A DECOY. This line hardcoded "scorch", so setting
   `PICKED = "crush"` in the reel file changed nothing and the house cut rendered
   the old ALL CLEAR board — the same trap as
   `feedback_three_cuts_three_hooks_fix_all_three`, one level up: the COMP INDEX
   decides, not the constant. The house cut now takes the default so `PICKED`
   actually governs it. */
export const ReelHouse = makeReel("house", false);
export const ReelAmber = makeReel("amber", false, "spike");
export const ReelSteel = makeReel("steel", false, "wander");
export const ReelQuiet = makeReel("house", true, "scorch");

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. */
const Root: React.FC = () => (<>
  <Composition id="hook-0-wander" component={HookCut("wander")} durationInFrames={135} {...V} />
  <Composition id="hook-1-spike"  component={HookCut("spike")}  durationInFrames={135} {...V} />
  <Composition id="hook-2-scorch" component={HookCut("scorch")} durationInFrames={135} {...V} />
  {/* ⭐ ROUND 3 — three FRESH mechanisms after the column test. See AdhHooks.tsx. */}
  <Composition id="hook-a-cutout"   component={HookCut("cutout")}   durationInFrames={135} {...V} />
  <Composition id="hook-b-dial"     component={HookCut("dial")}     durationInFrames={135} {...V} />
  <Composition id="hook-c-carousel" component={HookCut("carousel")} durationInFrames={135} {...V} />
  <Composition id="hook-d-bullpen"  component={HookCut("bullpen")}  durationInFrames={135} {...V} />
  <Composition id="hook-e-absorb"   component={HookCut("absorb")}   durationInFrames={135} {...V} />
  <Composition id="hook-f-press"    component={HookCut("press")}    durationInFrames={135} {...V} />
  {/* ⭐ ROUND 4 — three mechanisms taken off the winners' own code */}
  <Composition id="hook-g-strip"    component={HookCut("strip")}    durationInFrames={135} {...V} />
  <Composition id="hook-h-crush"    component={HookCut("crush")}    durationInFrames={135} {...V} />
  <Composition id="hook-i-fan"      component={HookCut("fan")}      durationInFrames={135} {...V} />
  <Composition id="adh-house" component={ReelHouse} durationInFrames={ADH_TOTAL} {...V} />
  <Composition id="adh-amber" component={ReelAmber} durationInFrames={ADH_TOTAL} {...V} />
  <Composition id="adh-steel" component={ReelSteel} durationInFrames={ADH_TOTAL} {...V} />
  <Composition id="adh-quiet" component={ReelQuiet} durationInFrames={ADH_TOTAL} {...V} />
</>);

registerRoot(Root);
