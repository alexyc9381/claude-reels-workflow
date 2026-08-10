import React from "react";
import { Composition } from "remotion";
import { ClaudeTakesReel } from "./__tc_takes";

export const TcRoot: React.FC = () => (
  <Composition id="ClaudeTakesReel" component={ClaudeTakesReel} durationInFrames={1140} fps={30} width={1080} height={1920} />
);
