import React from "react";
import { Composition } from "remotion";
import { BoringMillionCover, BORING_EPISODES } from "./BoringMillionCover";

export const BoringRoot: React.FC = () => (
  <Composition
    id="BoringMillionCover"
    component={BoringMillionCover}
    durationInFrames={BORING_EPISODES}
    fps={30}
    width={1080}
    height={1350}
  />
);
