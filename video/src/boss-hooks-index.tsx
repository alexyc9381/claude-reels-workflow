import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { Bg, HookHeader, KaraokeCaption, ProgressBar } from "./SlopKit";
import { HookA, HookB, HookC, HookD, HookE, HookF, HookG } from "./ArnHooks";
import words from "./data/words_128boss.json";

/* Reel 128 "BOSS" — the four hook concepts, as real 79-frame shots with the
   real chassis on them (header, captions, rail). ⛔ A hook still without the
   chassis is not the decision being made: `feedback_label_preview_artifacts`
   says a solo hook comp has placeholder captions and no audio BY CONSTRUCTION,
   so it is labelled here rather than mistaken for a cut. */
const DUR = 79;
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Wrap: React.FC<{ C: React.FC<{ dur: number }> }> = ({ C }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <C dur={DUR} />
      {/* ⛔ the header is there ON FRAME 0 — `at0` on the first band, house-wide */}
      <HookHeader big="CLAUDE NEEDS" hot="A STRICT BOSS" f={f} at0 />
      <KaraokeCaption words={words as any} fps={30} />
      <ProgressBar />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="BossHookA" component={() => <Wrap C={HookA} />} durationInFrames={DUR} {...V} />
    <Composition id="BossHookB" component={() => <Wrap C={HookB} />} durationInFrames={DUR} {...V} />
    <Composition id="BossHookC" component={() => <Wrap C={HookC} />} durationInFrames={DUR} {...V} />
    <Composition id="BossHookD" component={() => <Wrap C={HookD} />} durationInFrames={DUR} {...V} />
    <Composition id="BossHookE" component={() => <Wrap C={HookE} />} durationInFrames={DUR} {...V} />
    <Composition id="BossHookF" component={() => <Wrap C={HookF} />} durationInFrames={DUR} {...V} />
    <Composition id="BossHookG" component={() => <Wrap C={HookG} />} durationInFrames={DUR} {...V} />
  </>
);
registerRoot(RemotionRoot);
