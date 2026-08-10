import React from "react";
import { Composition, registerRoot } from "remotion";
import { LotReel, LOT_TOTAL, VARIANTS, makeLotReel } from "./ClaudeLotReel";
import {
  S1Kill, S2Sourced, S3Name, S4Stars, S5Four, S6Doors, S7Cinema,
  S8Models, S9Named, S10Key, S11NoLimit, S12Optional, S13Cta,
} from "./LotScenes";
import { HookPrice, HookTwoCards, HookMark, HookGoliath, HookTear, HOOK_LEN } from "./LotHooks";

/* Reel 90 "OPEN" (the BACKLOT). The reel, plus every scene solo for inspection.
   ⛔ `Lot` prefix — reel 79/80 is also called OPEN and owns the Open* family. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="LotReel" component={LotReel} durationInFrames={LOT_TOTAL} {...V} />

  {/* the three IG trial cuts — different hook, bed, camera, wipes and caption band */}
  {VARIANTS.map((va) => (
    <Composition key={va.id} id={`LotReel${va.id}`} component={makeLotReel(va)}
                 durationInFrames={LOT_TOTAL} {...V} />
  ))}

  {([["s01Kill", S1Kill, 125], ["s02Sourced", S2Sourced, 75], ["s03Name", S3Name, 75],
     ["s04Stars", S4Stars, 65], ["s05Four", S5Four, 55], ["s06Doors", S6Doors, 45],
     ["s07Cinema", S7Cinema, 100], ["s08Models", S8Models, 80], ["s09Named", S9Named, 70],
     ["s10Key", S10Key, 140], ["s11NoLimit", S11NoLimit, 70],
     ["s12Optional", S12Optional, 85], ["s13Cta", S13Cta, 47]] as const).map(([id, C, len]) => (
    <Composition key={id} id={id} component={C} durationInFrames={len} {...V} />
  ))}

  {([["hookPrice", HookPrice], ["hookTwoCards", HookTwoCards], ["hookMark", HookMark],
     ["hookGoliath", HookGoliath], ["hookTear", HookTear]] as const).map(([id, C]) => (
    <Composition key={id} id={id} component={C} durationInFrames={HOOK_LEN} {...V} />
  ))}
</>);

registerRoot(Root);
