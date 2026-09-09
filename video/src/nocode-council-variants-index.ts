import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { NoCodeCouncilVariants, VARIANT_FRAMES } from "./NoCodeCouncilVariants";
const Root: React.FC = () => React.createElement(Composition, {
  id: "NoCodeCouncilVariants", component: NoCodeCouncilVariants,
  durationInFrames: VARIANT_FRAMES, fps: 30, width: 1080, height: 1350,
});
registerRoot(Root);
