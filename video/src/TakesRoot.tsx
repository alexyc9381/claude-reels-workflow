import React from "react";
import { Composition } from "remotion";
import { ClaudeTakesReel } from "./ClaudeTakesReel";

// Isolated root for reel 62 TAKES, per the BRAND / DESIGN / OS pattern:
// renders this comp without loading every other reel in Root.tsx.
// durationInFrames = ceil(CUT * 30) where CUT = 38.00s (the finished VO length).
export const TakesRoot: React.FC = () => (
  <Composition
    id="ClaudeTakesReel"
    component={ClaudeTakesReel}
    durationInFrames={1140}
    fps={30}
    width={1080}
    height={1920}
  />
);
