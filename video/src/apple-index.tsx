import React from "react";
import { Composition, registerRoot } from "remotion";
import { AppleReel, AppleReelB, APP_TOTAL, VARIANTS } from "./ClaudeAppleReel";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9Cta } from "./AppScenes";

/* Reel 100 "APPLE". Board: storyboards/100-apple.md.
   TWO delivery cuts, both from `makeReel(variant)` so a fix lands in each.
   ⛔ The bare scene compositions below are STILL-FRAME GATES ONLY — a solo
   scene comp has no VO, no bed and placeholder captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="AppleReel"  component={AppleReel}
    durationInFrames={APP_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="AppleReelB" component={AppleReelB}
    durationInFrames={APP_TOTAL + VARIANTS[1].endHold} {...V} />

  {/* per-scene still gates — scene-local frame counts, matching SCENES[] */}
  <Composition id="appS0" component={S0Hook} durationInFrames={77} {...V} />
  <Composition id="appS1" component={S1}     durationInFrames={57} {...V} />
  <Composition id="appS2" component={S2}     durationInFrames={56} {...V} />
  <Composition id="appS3" component={S3}     durationInFrames={59} {...V} />
  <Composition id="appS4" component={S4}     durationInFrames={80} {...V} />
  <Composition id="appS5" component={S5}     durationInFrames={81} {...V} />
  <Composition id="appS6" component={S6}     durationInFrames={80} {...V} />
  <Composition id="appS7" component={S7}     durationInFrames={68} {...V} />
  <Composition id="appS8" component={S8}     durationInFrames={71} {...V} />
  <Composition id="appS9" component={S9Cta}  durationInFrames={54} {...V} />
</>);

registerRoot(Root);
