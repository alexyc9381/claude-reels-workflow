import React from "react";
import { Composition } from "remotion";
import { NoCodeStackCarousel, NOCODE_SLIDES } from "./NoCodeStackCarousel";

export const NoCodeRoot: React.FC = () => (
  <Composition
    id="NoCodeStackCarousel"
    component={NoCodeStackCarousel}
    durationInFrames={NOCODE_SLIDES}
    fps={30}
    width={1080}
    height={1350}
  />
);
