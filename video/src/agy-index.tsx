import React from "react";
import { Composition, registerRoot } from "remotion";
import {
  AgencyReel, AgencyReelB, AgencyReelC, AgencyReelD, AgencyReelE, AgencyReelF,
  AGY_TOTAL, VARIANTS,
} from "./ClaudeAgencyReel";
import { S0Hook } from "./AgyScenes";
import { HookQueue, HookCoach, HookShadow } from "./AgyHooks";
import { HookLift, HookParade } from "./AgyHooks2";

/* Reel 94 "AGENCY". Board: storyboards/94-agency.md.

   FOUR CUTS for IG trial reels, all from ONE factory (`makeReel`) so a fix lands
   in every one. ⛔ A variant is not a re-render — each swaps the whole open, the
   bed passage, the in-panel camera, the transition grammar, the caption band and
   the end hold. See the header of ClaudeAgencyReel.tsx.

   The `agyHook*` comps are the solo opens, 83 frames each, for a decision round. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="AgencyReel"  component={AgencyReel}
    durationInFrames={AGY_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="AgencyReelB" component={AgencyReelB}
    durationInFrames={AGY_TOTAL + VARIANTS[1].endHold} {...V} />
  <Composition id="AgencyReelC" component={AgencyReelC}
    durationInFrames={AGY_TOTAL + VARIANTS[2].endHold} {...V} />
  <Composition id="AgencyReelD" component={AgencyReelD}
    durationInFrames={AGY_TOTAL + VARIANTS[3].endHold} {...V} />

  <Composition id="AgencyReelE" component={AgencyReelE}
    durationInFrames={AGY_TOTAL + VARIANTS[4].endHold} {...V} />
  <Composition id="AgencyReelF" component={AgencyReelF}
    durationInFrames={AGY_TOTAL + VARIANTS[5].endHold} {...V} />

  <Composition id="agyHookA" component={S0Hook}     durationInFrames={83} {...V} />
  <Composition id="agyHookB" component={HookQueue}  durationInFrames={83} {...V} />
  <Composition id="agyHookC" component={HookCoach}  durationInFrames={83} {...V} />
  <Composition id="agyHookD" component={HookShadow} durationInFrames={83} {...V} />
  <Composition id="agyHookE" component={HookLift}   durationInFrames={83} {...V} />
  <Composition id="agyHookF" component={HookParade} durationInFrames={83} {...V} />
</>);
registerRoot(Root);
