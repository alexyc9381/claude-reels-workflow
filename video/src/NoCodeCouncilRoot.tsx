import React from "react";
import { Composition } from "remotion";
import { NoCodeCouncilCarousel, NOCODE_COUNCIL_SLIDES } from "./NoCodeCouncilCarousel";

export const NoCodeCouncilRoot: React.FC = () => (
  <Composition id="NoCodeCouncilCarousel" component={NoCodeCouncilCarousel} durationInFrames={NOCODE_COUNCIL_SLIDES} fps={30} width={1080} height={1350} />
);
