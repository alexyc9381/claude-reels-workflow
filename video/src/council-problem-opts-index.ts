import React from "react";
import { registerRoot, Composition } from "remotion";
import { CouncilProblemOptions, PROBLEM_OPTS } from "./CouncilProblemOptions";
const Root: React.FC = () => React.createElement(Composition, {
  id: "CouncilProblemOptions", component: CouncilProblemOptions,
  durationInFrames: PROBLEM_OPTS, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
