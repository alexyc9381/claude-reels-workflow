import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { Bg, KaraokeCaption, ProgressBar, AssemblyCtx } from "./SlopKit";
import { HookOath, HookStack, HookSeal, HookChrome } from "./JdgHooks";
import { CamCtx } from "./JdgWorld";
import words from "./data/words_132judge.json";

/* Reel 132 "JUDGE" — the three hook concepts, as real 76-frame shots WITH the
   real chassis on them, because the decision being made is visual.

   ⛔⛔⛔ `HookChrome` IS DRAWN HERE, NOT INSIDE THE SCENE. The first build put it
   inside `<Scene>`, where it inherited the panel's camera push and rendered as a
   white slab over the middle of the frame — hiding the hero in all three cuts.
   ROOT OWNS THE GLOBAL CHROME; scene bodies see none of it.
   ⛔ A solo hook comp has no audio and its captions run from f0 BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so it is labelled here rather than
   mistaken for a finished cut. */
const DUR = 76;
const V = { fps: 30, width: 1080, height: 1920 } as const;
const CAM = { dx: 0, dy: 0, s: 1, rot: 0 };

const Wrap: React.FC<{ C: React.FC<{ v: any; dur: number }> }> = ({ C }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <CamCtx.Provider value={CAM}>
        <AssemblyCtx.Provider value={true}>
          <C v="house" dur={DUR} />
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookChrome f={f} />
      <KaraokeCaption words={words as any} fps={30} top={1252} />
      <ProgressBar />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="JudgeHookOath" component={() => <Wrap C={HookOath} />} durationInFrames={DUR} {...V} />
    <Composition id="JudgeHookStack" component={() => <Wrap C={HookStack} />} durationInFrames={DUR} {...V} />
    <Composition id="JudgeHookSeal" component={() => <Wrap C={HookSeal} />} durationInFrames={DUR} {...V} />
  </>
);
registerRoot(RemotionRoot);
