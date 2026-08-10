import React from "react";
import { Composition } from "remotion";
import { VerifyS1Reel } from "./__verifyS1";

export const VerifyRoot: React.FC = () => (
  <Composition id="VerifyS1" component={VerifyS1Reel} durationInFrames={1663} fps={30} width={1080} height={1920} />
);
