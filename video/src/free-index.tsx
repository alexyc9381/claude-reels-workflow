import React from "react";
import { Composition, registerRoot } from "remotion";
import { FreeReelPaper, FreeReelStage, FreeReelPress } from "./TagPaper";
import { FreeReel, FreeReelB, FreeReelC, FreeReelD, FreeReelE, FreeReelF, FREE_TOTAL, VARIANTS } from "./ClaudeFreeReel";
import { S1Hook, S2, S11Cta } from "./TagScenes";

/* Reel 97 "FREE". Board: storyboards/97-free.md.
   THREE delivery cuts, one per theme, all from `makeReel(variant)` so a fix
   lands in every one. The bare scene compositions are still-frame gates only. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="FreeReel"  component={FreeReel}
    durationInFrames={FREE_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="FreeReelB" component={FreeReelB}
    durationInFrames={FREE_TOTAL + VARIANTS[1].endHold} {...V} />
  <Composition id="FreeReelC" component={FreeReelC}
    durationInFrames={FREE_TOTAL + VARIANTS[2].endHold} {...V} />

  <Composition id="FreeReelD" component={FreeReelD}
    durationInFrames={FREE_TOTAL + VARIANTS[3].endHold} {...V} />

  <Composition id="FreeReelE" component={FreeReelE}
    durationInFrames={FREE_TOTAL + VARIANTS[4].endHold} {...V} />

  <Composition id="FreeReelF" component={FreeReelF}
    durationInFrames={FREE_TOTAL + VARIANTS[5].endHold} {...V} />

  {/* ⛔ CUT G IS NOT A `makeReel` VARIANT — it does not use the house chassis at
      all, so it cannot be one. Its own root, its own captions, its own SFX. */}
  <Composition id="FreeReelPaper" component={FreeReelPaper}
    durationInFrames={767} {...V} />

  <Composition id="FreeReelStage" component={FreeReelStage}
    durationInFrames={767} {...V} />

  <Composition id="FreeReelPress" component={FreeReelPress}
    durationInFrames={767} {...V} />

  <Composition id="freeHook" component={S1Hook} durationInFrames={65} {...V} />
  <Composition id="freeS2"   component={S2}     durationInFrames={70} {...V} />
  <Composition id="freeCta"  component={S11Cta} durationInFrames={68} {...V} />
</>);
registerRoot(Root);
