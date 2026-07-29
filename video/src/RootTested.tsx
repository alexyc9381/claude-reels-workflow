import React from "react";
import { Composition } from "remotion";
import { ClaudeTestedReel } from "./ClaudeTestedReel";

export const RootTested: React.FC = () => (
  <Composition id="ClaudeTestedReel" component={ClaudeTestedReel} durationInFrames={1296} fps={30} width={1080} height={1920} />
);
