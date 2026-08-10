import React from "react";
import { Composition, registerRoot } from "remotion";
import { ClaudeJobsReel, JOBS_TOTAL } from "./ClaudeJobsReel";

/* Reel 92 "JOBS" — the entry point the render uses, so a 38s reel never has to
   load the 800-line house Root. Board: storyboards/92-jobs.md. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (
  <Composition id="Jobs" component={ClaudeJobsReel} durationInFrames={JOBS_TOTAL} {...V} />
);
registerRoot(Root);
