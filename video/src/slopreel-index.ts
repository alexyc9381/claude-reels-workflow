import { registerRoot, Composition } from "remotion";
import React from "react";
import { SlopReel, SLOP_TOTAL } from "./SlopReel";
registerRoot(() => React.createElement(Composition as any, { id: "SlopReel", component: SlopReel, durationInFrames: SLOP_TOTAL, fps: 30, width: 1080, height: 1920 }));
