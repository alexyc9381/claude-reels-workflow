import React from "react";
import { Composition } from "remotion";
import { NoCodeAgencyCarousel, NOCODE_AGENCY_SLIDES } from "./NoCodeAgencyCarousel";

export const NoCodeAgencyRoot: React.FC = () => (
  <Composition id="NoCodeAgencyCarousel" component={NoCodeAgencyCarousel} durationInFrames={NOCODE_AGENCY_SLIDES} fps={30} width={1080} height={1350} />
);
