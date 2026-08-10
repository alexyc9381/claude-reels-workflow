import React from "react";
import { Composition } from "remotion";
import { ClaudeCallsReel } from "./ClaudeCallsReel";

// Isolated root for reel 68 CALLS, per the BRAND / DESIGN / OS / TAKES pattern:
// renders this comp without loading every other reel in Root.tsx.
// durationInFrames = ceil(CUT * 30) where CUT = 54.25s (the finished 1.04x VO length).
export const CallsRoot: React.FC = () => (
  <Composition
    id="ClaudeCallsReel"
    component={ClaudeCallsReel}
    durationInFrames={1618}
    fps={30}
    width={1080}
    height={1920}
  />
);
