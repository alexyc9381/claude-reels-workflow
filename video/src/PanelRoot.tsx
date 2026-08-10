import React from "react";
import { Composition } from "remotion";
import { StarJudgeScene, STAR_SCENES } from "./StarJudgeScene";

// IG Reels = 1080 x 1920 (9:16)
export const PanelRoot: React.FC = () => (
  <Composition id="StarJudgeScene" component={StarJudgeScene} durationInFrames={STAR_SCENES} fps={30} width={1080} height={1920} />
);
