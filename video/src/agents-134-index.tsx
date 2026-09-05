import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, AG_TOTAL, HookCut } from "./ClaudeAgents134Reel";

/* Reel 134 "AGENTS". Board: storyboards/134-agents.md.
   766 frames = 25.53s. The cut removes 16.5s of TWO flubbed takes and dead air
   from a 44.58s raw take — both were invisible to a whole-file transcription
   (whisper merges a flub and its retake and emits the sentence once) and only
   appeared as impossibly long WORDS: 'has' spanning 2.34s and 'have' spanning
   7.80s.
   ⚠️ Tempo is x1.00, not the house x1.10: once the dead takes are gone the take
   already runs 4.09 wps. ⭐ 28.13s sits inside the 22-29s house range. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⛔⛔ THREE CUTS = THREE HOOKS AND THREE SHOT SIZES, NOT THREE GRADES
   (`memory/three-cuts-three-hooks` · `feedback_variants_need_shot_sizes`).
   Camera + contrast + rake + bed is a crop, a tilt, a tone curve and a bed —
   nothing that HAPPENS is different, and a dHash passes the whole time because
   it measures PIXELS, NOT EVENTS. Each cut opens on a different one-word
   MECHANISM on a different axis:
     house  MULTIPLICATION  a GitHub hatch opens and the engineers POUR out
     amber  DEPLOYMENT      a GitHub crate bursts and the crew fans out
     steel  SCALE GAP       a crewed scaffold rises behind one small Claude
   The body is the same reel; the SFX bank is keyed off `L`, so it still lands. */
export const ReelHouse = makeReel("house", false, "pour");
/* ⛔⛔⛔ THE ALTERNATE CUTS WERE OPENING IN THE OLD WORLD. amber and steel were
   pointed at `crew` and `tower`, two hooks written at rev 2 — before this reel
   became a building. Every review round since has been spent removing exactly
   that mismatch from the body, and it was sitting in the first four seconds of
   two of the three delivered cuts the whole time, unlooked at because I only
   ever previewed `house`. They now open on `board` and `dive`, both written in
   the current world. ⛔ ALWAYS CONTACT-SHEET EVERY CUT, not just the main one. */
export const ReelAmber = makeReel("amber", false, "board");
export const ReelSteel = makeReel("steel", false, "dive");
export const ReelQuiet = makeReel("house", true, "pour");

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. Four MECHANISMS:
   multiplication / deployment / scale-gap / substitution. ⛔ REV 2: every one of
   them is built out of CLAUDE SPRITES, not plates. */
const Root: React.FC = () => (<>
  <Composition id="hook-0-pour"  component={HookCut("pour")}  durationInFrames={137} {...V} />
  <Composition id="hook-1-crew"  component={HookCut("crew")}  durationInFrames={137} {...V} />
  <Composition id="hook-2-tower" component={HookCut("tower")} durationInFrames={137} {...V} />
  <Composition id="hook-3-line"  component={HookCut("line")}  durationInFrames={137} {...V} />
  <Composition id="agents-house" component={ReelHouse} durationInFrames={AG_TOTAL} {...V} />
  <Composition id="agents-amber" component={ReelAmber} durationInFrames={AG_TOTAL} {...V} />
  <Composition id="agents-steel" component={ReelSteel} durationInFrames={AG_TOTAL} {...V} />
  <Composition id="agents-quiet" component={ReelQuiet} durationInFrames={AG_TOTAL} {...V} />
  <Composition id="hook-4-board" component={HookCut("board")} durationInFrames={137} {...V} />
  <Composition id="hook-5-dive"  component={HookCut("dive")}  durationInFrames={137} {...V} />
</>);

registerRoot(Root);
