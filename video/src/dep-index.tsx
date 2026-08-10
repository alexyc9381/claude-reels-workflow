import React from "react";
import { Composition, registerRoot } from "remotion";
import { AwesomeReel, AwesomeReelB, AwesomeReelC, AWESOME_TOTAL, VARIANTS } from "./ClaudeAwesomeReel";
import { S0Hook, S2Wall, S7Ledger } from "./DepScenes";
import { HookLockers, HookOverload } from "./DepHooks";

/* Reel 96 "AWESOME". Board: storyboards/96-awesome.md.
   ONE delivery cut. The variant factory (`makeReel`) is in place so trial cuts
   are a VARIANTS entry rather than a copied file, but none are built yet —
   reel 95's three cuts each needed their own open, bed passage, palette
   rotation and transition grammar before they diverged enough to be worth
   shipping, and that is a separate round.

   The three scene compositions below are for still-frame gates only (frame-0
   luma, the wall count, the ledger landing) — they are not deliverables. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="AwesomeReel"  component={AwesomeReel}
    durationInFrames={AWESOME_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="AwesomeReelB" component={AwesomeReelB}
    durationInFrames={AWESOME_TOTAL + VARIANTS[1].endHold} {...V} />
  <Composition id="AwesomeReelC" component={AwesomeReelC}
    durationInFrames={AWESOME_TOTAL + VARIANTS[2].endHold} {...V} />

  <Composition id="depHookA"  component={S0Hook}      durationInFrames={104} {...V} />
  <Composition id="depHookB"  component={HookLockers} durationInFrames={104} {...V} />
  <Composition id="depHookC"  component={HookOverload} durationInFrames={104} {...V} />
  <Composition id="depWall"   component={S2Wall}      durationInFrames={26}  {...V} />
  <Composition id="depLedger" component={S7Ledger}    durationInFrames={61}  {...V} />
</>);
registerRoot(Root);
