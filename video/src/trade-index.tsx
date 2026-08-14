import React from "react";
import { Composition, registerRoot } from "remotion";
import { TradeReel, TradeReelB, TradeReelC, TradeReelD, TRADE_TOTAL, VARIANTS } from "./ClaudeTradeReel";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10Cta } from "./TrdScenes";

/* Reel 103 "TRADE". Board: storyboards/103-trade.md.
   TWO delivery cuts, both from `makeReel(variant)` so a fix lands in each.
   ⛔ The bare scene compositions below are STILL-FRAME GATES ONLY — a solo
   scene comp has no VO, no bed and placeholder captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="TradeReel"  component={TradeReel}
    durationInFrames={TRADE_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="TradeReelB" component={TradeReelB}
    durationInFrames={TRADE_TOTAL + VARIANTS[1].endHold} {...V} />
  <Composition id="TradeReelC" component={TradeReelC}
    durationInFrames={TRADE_TOTAL + VARIANTS[2].endHold} {...V} />
  <Composition id="TradeReelD" component={TradeReelD}
    durationInFrames={TRADE_TOTAL + VARIANTS[3].endHold} {...V} />

  {/* per-scene still gates — scene-local frame counts, matching SCENES[] */}
  <Composition id="trdS0"  component={S0Hook} durationInFrames={157} {...V} />
  <Composition id="trdS1"  component={S1}     durationInFrames={65}  {...V} />
  <Composition id="trdS2"  component={S2}     durationInFrames={23}  {...V} />
  <Composition id="trdS3"  component={S3}     durationInFrames={106} {...V} />
  <Composition id="trdS4"  component={S4}     durationInFrames={60}  {...V} />
  <Composition id="trdS5"  component={S5}     durationInFrames={40}  {...V} />
  <Composition id="trdS6"  component={S6}     durationInFrames={130} {...V} />
  <Composition id="trdS7"  component={S7}     durationInFrames={32}  {...V} />
  <Composition id="trdS8"  component={S8}     durationInFrames={123} {...V} />
  <Composition id="trdS9"  component={S9}     durationInFrames={94}  {...V} />
  <Composition id="trdS10" component={S10Cta} durationInFrames={85} {...V} />
</>);

registerRoot(Root);
