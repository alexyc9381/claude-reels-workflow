import React from "react";
import { Composition } from "remotion";
import { NoCodeHypeCarousel, NOCODE_HYPE_SLIDES } from "./NoCodeHypeCarousel";

export const NoCodeHypeRoot: React.FC = () => (
  <Composition id="NoCodeHypeCarousel" component={NoCodeHypeCarousel} durationInFrames={NOCODE_HYPE_SLIDES} fps={30} width={1080} height={1350} />
);
