import React from "react";
import { registerRoot, Composition } from "remotion";
import { CouncilFixOptions, FIX_OPTS } from "./CouncilFixOptions";
const Root: React.FC = () => React.createElement(Composition, {
  id: "CouncilFixOptions", component: CouncilFixOptions,
  durationInFrames: FIX_OPTS, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
