import React from "react";
import { Composition } from "remotion";
import { NoCodeTypesCarousel, NOCODE_TYPES_SLIDES } from "./NoCodeTypesCarousel";

export const NoCodeTypesRoot: React.FC = () => (
  <Composition id="NoCodeTypesCarousel" component={NoCodeTypesCarousel} durationInFrames={NOCODE_TYPES_SLIDES} fps={30} width={1080} height={1350} />
);
