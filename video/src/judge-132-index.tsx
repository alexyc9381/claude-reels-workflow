import React from "react";
import { Composition, registerRoot } from "remotion";
import {
  ClaudeJudge132Reel, ClaudeJudge132Amber, ClaudeJudge132Steel, JUDGE_TOTAL, makeReel,
} from "./ClaudeJudge132Reel";

/* Reel 132 "JUDGE" — the three deliverable cuts.
   ⛔ THE TRIAL CUTS ARE FRAMINGS, NOT A COLOUR PASS. Only the PICKED hook is ever
   re-rendered, so on reel 127 two of three cuts opened on the version that had
   already been rejected ([[feedback_trial_cuts_fall_behind]]). All three here
   render the SAME scene code through different CAM / GRADE / RAKE-PITCH, so a
   change to the picture reaches every cut by construction.
   ⛔⛔ AND A CAM SHIFT IS A RE-FRAME: `steel` moves +40px, which pushed a
   right-weighted hook off frame on reel 129. Compose for three cameras
   ([[feedback_compose_for_three_cameras]]) and render frame 0 of EVERY cut. */
const V = { fps: 30, width: 1080, height: 1920, durationInFrames: JUDGE_TOTAL } as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ClaudeJudge132Reel" component={ClaudeJudge132Reel} {...V} />
    <Composition id="ClaudeJudge132Amber" component={ClaudeJudge132Amber} {...V} />
    <Composition id="ClaudeJudge132Steel" component={ClaudeJudge132Steel} {...V} />
    {/* the quiet-bed variant, for checking the VO and the cues without the track */}
    <Composition id="ClaudeJudge132Quiet" component={makeReel("house", true)} {...V} />
  </>
);
registerRoot(RemotionRoot);
