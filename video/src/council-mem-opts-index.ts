import React from "react";
import { registerRoot, Composition } from "remotion";
import { CouncilMemoryOptions, MEM_OPTS } from "./CouncilMemoryOptions";
const Root: React.FC = () => React.createElement(Composition, {
  id: "CouncilMemoryOptions", component: CouncilMemoryOptions,
  durationInFrames: MEM_OPTS, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
