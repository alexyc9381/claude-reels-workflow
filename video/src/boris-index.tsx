import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { BorisReel, BorisReelB, BorisReelC, BORIS_TOTAL } from "./ClaudeBorisReel";
import { BorisReelReorder, BORIS_R_TOTAL } from "./ClaudeBorisReelReorder";

/* Three cuts of reel 82: the main post plus two trial-reel variants. They share
   a VO and a body but differ in hook, bed, transitions, body framing and caption
   band — see the Variant block in ClaudeBorisReel.tsx. */
const V = { durationInFrames: BORIS_TOTAL, width: 1080, height: 1920, fps: 30 };

registerRoot(() => React.createElement(
  React.Fragment, null,
  React.createElement(Composition as any, { id: "BorisReel", component: BorisReel, ...V }),
  React.createElement(Composition as any, { id: "BorisReelB", component: BorisReelB, ...V }),
  React.createElement(Composition as any, { id: "BorisReelC", component: BorisReelC, ...V }),
  React.createElement(Composition as any, { id: "BorisReelReorder", component: BorisReelReorder,
    durationInFrames: BORIS_R_TOTAL, width: 1080, height: 1920, fps: 30 }),
));
