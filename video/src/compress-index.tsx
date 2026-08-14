import React from "react";
import { Composition, registerRoot } from "remotion";
import { CompressReel, CompressReelB, CMP_TOTAL, VARIANTS } from "./ClaudeCompressReel";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12Cta } from "./CmpScenes";

/* Reel 101 "COMPRESS". Board: storyboards/101-compress.md.
   TWO delivery cuts, both from `makeReel(variant)` so a fix lands in each.
   ⛔ The bare scene compositions below are STILL-FRAME GATES ONLY — a solo
   scene comp has no VO, no bed and placeholder captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="CompressReel"  component={CompressReel}
    durationInFrames={CMP_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="CompressReelB" component={CompressReelB}
    durationInFrames={CMP_TOTAL + VARIANTS[1].endHold} {...V} />

  {/* per-scene still gates — scene-local frame counts, matching SCENES[] */}
  <Composition id="cmpS0"  component={S0Hook} durationInFrames={53} {...V} />
  <Composition id="cmpS1"  component={S1}     durationInFrames={29} {...V} />
  <Composition id="cmpS2"  component={S2}     durationInFrames={64} {...V} />
  <Composition id="cmpS3"  component={S3}     durationInFrames={59} {...V} />
  <Composition id="cmpS4"  component={S4}     durationInFrames={40} {...V} />
  <Composition id="cmpS5"  component={S5}     durationInFrames={26} {...V} />
  <Composition id="cmpS6"  component={S6}     durationInFrames={46} {...V} />
  <Composition id="cmpS7"  component={S7}     durationInFrames={29} {...V} />
  <Composition id="cmpS8"  component={S8}     durationInFrames={48} {...V} />
  <Composition id="cmpS9"  component={S9}     durationInFrames={66} {...V} />
  <Composition id="cmpS10" component={S10}    durationInFrames={32} {...V} />
  <Composition id="cmpS11" component={S11}    durationInFrames={65} {...V} />
  <Composition id="cmpS12" component={S12Cta} durationInFrames={50} {...V} />
</>);

registerRoot(Root);
