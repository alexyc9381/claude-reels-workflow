import React from "react";
import { registerRoot, Composition } from "remotion";
import { NoCodeCouncilV3, COUNCIL_V3_SLIDES } from "./NoCodeCouncilV3";
const Root: React.FC = () => React.createElement(Composition, {
  id: "NoCodeCouncilV3", component: NoCodeCouncilV3,
  durationInFrames: COUNCIL_V3_SLIDES, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
