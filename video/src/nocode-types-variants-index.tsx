import React from "react";
import { registerRoot, Composition } from "remotion";
import { DFYVariants } from "./NoCodeTypesCarousel";

const Root: React.FC = () => (
  <Composition id="DFYVariants" component={DFYVariants} durationInFrames={3} fps={30} width={1080} height={1350} />
);
registerRoot(Root);
