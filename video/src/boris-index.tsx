import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { BorisReel, BORIS_TOTAL } from "./ClaudeBorisReel";

registerRoot(() => React.createElement(Composition as any, {
  id: "BorisReel", component: BorisReel, durationInFrames: BORIS_TOTAL,
  width: 1080, height: 1920, fps: 30 }));
