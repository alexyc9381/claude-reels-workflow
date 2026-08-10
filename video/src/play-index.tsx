import React from "react";
import { Composition, registerRoot } from "remotion";
import { ToolsReel, ToolsReelB, ToolsReelC, TOOLS_TOTAL, VARIANTS } from "./ClaudeToolsReel";
import { S0Hook } from "./PlayScenes";
import { HookAutocue, HookMirror } from "./PlayHooks";

/* Reel 95 "TOOLS". Board: storyboards/95-tools.md.
   THREE CUTS for IG trial reels, all from ONE factory (`makeReel`). Each swaps
   the whole open, the bed passage, the in-panel camera, the body palette, the
   transition grammar, the caption band and the end hold. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="ToolsReel"  component={ToolsReel}
    durationInFrames={TOOLS_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="ToolsReelB" component={ToolsReelB}
    durationInFrames={TOOLS_TOTAL + VARIANTS[1].endHold} {...V} />
  <Composition id="ToolsReelC" component={ToolsReelC}
    durationInFrames={TOOLS_TOTAL + VARIANTS[2].endHold} {...V} />

  <Composition id="playHookA" component={S0Hook}      durationInFrames={85} {...V} />
  <Composition id="playHookB" component={HookAutocue} durationInFrames={85} {...V} />
  <Composition id="playHookC" component={HookMirror}  durationInFrames={85} {...V} />
</>);
registerRoot(Root);
