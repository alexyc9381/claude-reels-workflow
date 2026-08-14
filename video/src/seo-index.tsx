import React from "react";
import { Composition, registerRoot } from "remotion";
import { SeoReel, SeoReelB, SEO_TOTAL, VARIANTS } from "./ClaudeSeoReel";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9Cta } from "./SeoScenes";
import { H1Rank, H2Score, H3Lens, H4Stamp } from "./SeoHooks";

/* Reel 102 "SEO". Board: storyboards/102-seo.md.
   TWO delivery cuts, both from `makeReel(variant)` so a fix lands in each.
   ⛔ The bare scene compositions below are STILL-FRAME GATES ONLY — a solo
   scene comp has no VO, no bed and placeholder captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="SeoReel"  component={SeoReel}
    durationInFrames={SEO_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="SeoReelB" component={SeoReelB}
    durationInFrames={SEO_TOTAL + VARIANTS[1].endHold} {...V} />

  {/* ⛔ HOOK CONCEPTS FOR SELECTION — still-frame gates only. Each has no VO,
      no bed and placeholder captions BY CONSTRUCTION
      ([[feedback_label_preview_artifacts]]), so judge the IDEA and the
      hierarchy, nothing else. */}
  <Composition id="hookRank"  component={H1Rank}  durationInFrames={60} {...V} />
  <Composition id="hookScore" component={H2Score} durationInFrames={60} {...V} />
  <Composition id="hookLens"  component={H3Lens}  durationInFrames={60} {...V} />
  <Composition id="hookStamp" component={H4Stamp} durationInFrames={60} {...V} />

  {/* per-scene still gates — scene-local frame counts, matching SCENES[] */}
  <Composition id="seoS0" component={S0Hook} durationInFrames={116} {...V} />
  <Composition id="seoS1" component={S1}     durationInFrames={65}  {...V} />
  <Composition id="seoS2" component={S2}     durationInFrames={53}  {...V} />
  <Composition id="seoS3" component={S3}     durationInFrames={60}  {...V} />
  <Composition id="seoS4" component={S4}     durationInFrames={58}  {...V} />
  <Composition id="seoS5" component={S5}     durationInFrames={83}  {...V} />
  <Composition id="seoS6" component={S6}     durationInFrames={75}  {...V} />
  <Composition id="seoS7" component={S7}     durationInFrames={65}  {...V} />
  <Composition id="seoS8" component={S8}     durationInFrames={21}  {...V} />
  <Composition id="seoS9" component={S9Cta}  durationInFrames={63}  {...V} />
</>);

registerRoot(Root);
