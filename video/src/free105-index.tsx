import React from "react";
import { Composition, registerRoot } from "remotion";
import { FreeReel, FREE_TOTAL } from "./ClaudeFreeReel";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8Cta } from "./FreScenes";

/* Reel 105 "FREE". Board: storyboards/105-free.md.
   ⛔ The bare scene compositions below are STILL-FRAME GATES ONLY — a solo
   scene comp has no VO, no bed and placeholder captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there.
   Their durations match SCENES[] exactly so a scene-local frame number in the
   studio is the same frame number the audit reports. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="FreeReel" component={FreeReel} durationInFrames={FREE_TOTAL} {...V} />

  {/* per-scene still gates — scene-local frame counts, matching SCENES[] */}
  <Composition id="fre0" component={S0Hook} durationInFrames={55}  {...V} />
  <Composition id="fre1" component={S1}     durationInFrames={121} {...V} />
  <Composition id="fre2" component={S2}     durationInFrames={110} {...V} />
  <Composition id="fre3" component={S3}     durationInFrames={54}  {...V} />
  <Composition id="fre4" component={S4}     durationInFrames={72}  {...V} />
  <Composition id="fre5" component={S5}     durationInFrames={58}  {...V} />
  <Composition id="fre6" component={S6}     durationInFrames={76}  {...V} />
  <Composition id="fre7" component={S7}     durationInFrames={58}  {...V} />
  <Composition id="fre8" component={S8Cta}  durationInFrames={58}  {...V} />
</>);

registerRoot(Root);
