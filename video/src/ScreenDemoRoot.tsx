import React from "react";
import { Composition } from "remotion";
import { ScreenDemoReel, SCREENDEMO_DUR } from "./ScreenDemoReel";
export const ScreenDemoRoot: React.FC = () => (
  <Composition id="ScreenDemoReel" component={ScreenDemoReel} durationInFrames={SCREENDEMO_DUR} fps={30} width={1080} height={1920} />
);
