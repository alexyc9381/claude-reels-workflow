import React from "react";
import { registerRoot, Composition } from "remotion";
import { CouncilCoverOptions, COVER_OPTS } from "./CouncilCoverOptions";
const Root: React.FC = () => React.createElement(Composition, {
  id: "CouncilCoverOptions", component: CouncilCoverOptions,
  durationInFrames: COVER_OPTS, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
