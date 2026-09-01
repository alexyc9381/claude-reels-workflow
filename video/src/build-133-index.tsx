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

export const ReelHouse = makeReel("house");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("house", true);

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality
   on the real chassis, PICKED before the body is defended. Four MECHANISMS:
   revelation / load / accumulation / impact. */
const Root: React.FC = () => (<>
  <Composition id="hook-0-shutter" component={HookCut("shutter")} durationInFrames={100} {...V} />
  <Composition id="hook-1-haul"    component={HookCut("haul")}    durationInFrames={100} {...V} />
  <Composition id="hook-2-belt"    component={HookCut("belt")}    durationInFrames={100} {...V} />
  <Composition id="hook-3-stamp"   component={HookCut("stamp")}   durationInFrames={100} {...V} />
  <Composition id="build-house" component={ReelHouse} durationInFrames={BUILD_TOTAL} {...V} />
  <Composition id="build-amber" component={ReelAmber} durationInFrames={BUILD_TOTAL} {...V} />
  <Composition id="build-steel" component={ReelSteel} durationInFrames={BUILD_TOTAL} {...V} />
  <Composition id="build-quiet" component={ReelQuiet} durationInFrames={BUILD_TOTAL} {...V} />
</>);

registerRoot(Root);
