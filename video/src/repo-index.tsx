import React from "react";
import { Composition, registerRoot } from "remotion";
import { RepoReel, RepoReelB, RepoReelC, RepoReelD, REP_TOTAL, VARIANTS } from "./ClaudeRepoReel";
import { S0Hook, S1, S2, S3, S4, S5, S6Cta } from "./RepScenes";

/* Reel 99 "REPO". Board: storyboards/99-repo.md.
   FOUR delivery cuts, all from `makeReel(variant)` so a fix lands in every one.
   The bare scene compositions below are STILL-FRAME GATES only — a solo scene
   comp has no VO, no bed and placeholder captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="RepoReel"  component={RepoReel}
    durationInFrames={REP_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="RepoReelB" component={RepoReelB}
    durationInFrames={REP_TOTAL + VARIANTS[1].endHold} {...V} />
  <Composition id="RepoReelC" component={RepoReelC}
    durationInFrames={REP_TOTAL + VARIANTS[2].endHold} {...V} />
  <Composition id="RepoReelD" component={RepoReelD}
    durationInFrames={REP_TOTAL + VARIANTS[3].endHold} {...V} />

  {/* per-scene still gates — scene-local frame counts, matching SCENES[] */}
  <Composition id="repS0" component={S0Hook} durationInFrames={110} {...V} />
  <Composition id="repS1" component={S1}     durationInFrames={68}  {...V} />
  <Composition id="repS2" component={S2}     durationInFrames={73}  {...V} />
  <Composition id="repS3" component={S3}     durationInFrames={110} {...V} />
  <Composition id="repS4" component={S4}     durationInFrames={134} {...V} />
  <Composition id="repS5" component={S5}     durationInFrames={75}  {...V} />
  <Composition id="repS6" component={S6Cta}  durationInFrames={58}  {...V} />
</>);

registerRoot(Root);
