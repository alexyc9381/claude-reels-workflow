import React from "react";
import { Composition } from "remotion";
import { ChkS0Reel } from "./__ChkS0";

export const ChkRoot: React.FC = () => (
  <>
    <Composition id="ChkS0" component={ChkS0Reel} durationInFrames={200} fps={30} width={1080} height={1920} />
  </>
);
