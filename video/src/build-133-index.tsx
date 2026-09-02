import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, BUILD_TOTAL, HookCut } from "./ClaudeBuild133Reel";

/* Reel 133 "BUILD". Board: storyboards/133-build.md.
   898 frames = 29.93s. The cut removes 26.6s of FIVE flubbed takes and dead air
   from a 56.47s raw take — three of the five were invisible to a whole-file
   transcription (whisper merges a flub and its retake and emits the sentence
   once) and only appeared once the raw was split at every measured silence and
   each chunk transcribed on its own.
   ⚠️ Tempo is x1.00, not the house x1.10: once the dead takes are gone the take
   already runs 4.32 wps. ⚠️ 29.93s is 0.9s above the 22-29s house range;
   flagged, not trimmed. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES (`memory/three-cuts-three-hooks`).
   Camera + contrast + rake + bed is a crop, a tilt, a tone curve and a bed —
   **nothing that HAPPENS is different**, and a dHash passes the whole time
   because it measures PIXELS, NOT EVENTS. Each cut opens on a different
   one-word MECHANISM on a different axis:
     house  REVELATION    the shutter goes up on three machines already running
     amber  LOAD          a crate stencilled FREE is winched onto the counter
     steel  ACCUMULATION  goods pour out faster and faster and a van fills
   The body is the same reel; the SFX bank is keyed off `L`, so it still lands. */
export const ReelHouse = makeReel("house", false, "swap");
export const ReelAmber = makeReel("amber", false, "haul");
export const ReelSteel = makeReel("steel", false, "belt");
export const ReelQuiet = makeReel("house", true, "swap");

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. Four MECHANISMS:
   revelation / load / accumulation / impact. */
const Root: React.FC = () => (<>
  <Composition id="hook-0-price" component={HookCut("price")} durationInFrames={100} {...V} />
  <Composition id="hook-1-haul"    component={HookCut("haul")}    durationInFrames={100} {...V} />
  <Composition id="hook-2-belt"    component={HookCut("belt")}    durationInFrames={100} {...V} />
  <Composition id="hook-3-stamp"   component={HookCut("stamp")}   durationInFrames={100} {...V} />
  <Composition id="hook-4-vault"   component={HookCut("vault")}   durationInFrames={100} {...V} />
  <Composition id="hook-5-tag"     component={HookCut("tag")}     durationInFrames={100} {...V} />
  <Composition id="hook-6-pile"    component={HookCut("pile")}    durationInFrames={100} {...V} />
  <Composition id="hook-7-swap"    component={HookCut("swap")}    durationInFrames={100} {...V} />
  <Composition id="hook-8-fan"     component={HookCut("fan")}     durationInFrames={100} {...V} />
  <Composition id="hook-9-tear"    component={HookCut("tear")}    durationInFrames={100} {...V} />
  <Composition id="build-house" component={ReelHouse} durationInFrames={BUILD_TOTAL} {...V} />
  <Composition id="build-amber" component={ReelAmber} durationInFrames={BUILD_TOTAL} {...V} />
  <Composition id="build-steel" component={ReelSteel} durationInFrames={BUILD_TOTAL} {...V} />
  <Composition id="build-quiet" component={ReelQuiet} durationInFrames={BUILD_TOTAL} {...V} />
</>);

registerRoot(Root);
