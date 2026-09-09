import React from "react";
import { registerRoot, Composition } from "remotion";
import { NoCodeCouncilV2, COUNCIL_V2_SLIDES } from "./NoCodeCouncilV2";
const Root: React.FC = () => React.createElement(Composition, {
  id: "NoCodeCouncilV2", component: NoCodeCouncilV2,
  durationInFrames: COUNCIL_V2_SLIDES, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
