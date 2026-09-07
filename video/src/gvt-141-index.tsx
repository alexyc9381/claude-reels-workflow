import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, GVT_TOTAL, HookCut } from "./ClaudeGravity141Reel";

/* Reel 141 "GRAVITY". Board: storyboards/141-gravity.md.
   637 frames = 21.24s. Fifteen `cut cut` flubs cut from a 78.81s raw take.
   ⛔ REV 2 re-cut the pauses on Alex's note: joins were 0.26-0.52s and are now
   ~0.13s. Tempo is a piecewise SLOW-DOWN (the take ran 4.29 wps against a 3.96
   anchor). ⚠️ 21.24s is under the 22-29s range and R1 lands at hook 4.20 /
   worst-5s 4.60; both are the price of the tighter pauses and both are flagged. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES. All three run on the REAL
   editor (rev 2, on Alex's note that the reel never showed the product):
     house  prise  PRISE   one Claude prises the VS Code mark open and a crowd pours through
     amber  haul   HAUL    he drags the mark's two leaves apart on chains, and they resist
     steel  swarm  SWARM   the crowd arrives first and forces the leaves open from the inside */
export const ReelHouse = makeReel("house");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("house", true);

const Root: React.FC = () => (<>
  <Composition id="hook-0-prise" component={HookCut("prise")} durationInFrames={58} {...V} />
  <Composition id="hook-1-haul"   component={HookCut("haul")}   durationInFrames={58} {...V} />
  <Composition id="hook-2-swarm"   component={HookCut("swarm")}   durationInFrames={58} {...V} />
  <Composition id="gvt-house" component={ReelHouse} durationInFrames={GVT_TOTAL} {...V} />
  <Composition id="gvt-amber" component={ReelAmber} durationInFrames={GVT_TOTAL} {...V} />
  <Composition id="gvt-steel" component={ReelSteel} durationInFrames={GVT_TOTAL} {...V} />
  <Composition id="gvt-quiet" component={ReelQuiet} durationInFrames={GVT_TOTAL} {...V} />
</>);

registerRoot(Root);
