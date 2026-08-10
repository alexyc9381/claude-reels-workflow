import React from "react";
import { Composition } from "remotion";
import { ClaudeChartReel } from "./ClaudeChartReel";

// Isolated root for reel 69 CHART, per the CALLS / TAKES / OS pattern.
// durationInFrames = ceil(CUT * 30) where CUT = 32.29s (the finished 1.04x VO).
export const ChartRoot: React.FC = () => (
  <Composition
    id="ClaudeChartReel"
    component={ClaudeChartReel}
    durationInFrames={944}
    fps={30}
    width={1080}
    height={1920}
  />
);
