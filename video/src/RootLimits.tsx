import React from "react";
import { Composition } from "remotion";
import { ClaudeLimitsReel } from "./ClaudeLimitsReel";

export const RootLimits: React.FC = () => (
  <Composition id="Limits" component={ClaudeLimitsReel} durationInFrames={972}
               fps={30} width={1080} height={1920} />
);
