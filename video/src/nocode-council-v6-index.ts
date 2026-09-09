import React from "react";
import { registerRoot, Composition } from "remotion";
import { NoCodeCouncilV6, COUNCIL_V6_SLIDES } from "./NoCodeCouncilV6";
const Root: React.FC = () => React.createElement(Composition, {
  id: "NoCodeCouncilV6", component: NoCodeCouncilV6,
  durationInFrames: COUNCIL_V6_SLIDES, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
