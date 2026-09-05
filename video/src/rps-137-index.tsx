import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, RPS_TOTAL, HookCut } from "./ClaudeRepos137Reel";

/* Reel 137 "REPOS". Board: storyboards/137-repos.md.
   1236 frames = 41.18s. Six flubs and 19.9s of dead air cut from an 81.78s
   raw take; every join in measured silence; piecewise tempo (hook capped at
   3.95 wps, body at 4.45). ⚠️ 41.18s is outside the 22-29s house range —
   four repos need it; flagged, not trimmed. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES:
     house  lift  ELEVATION   the lift raises him into the four hanging parts
     amber  drop  LOAD        the parts come down onto him one by one
     steel  pit   SWARM       a pit crew sprints in carrying them */
export const ReelHouse = makeReel("house");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("house", true);

const Root: React.FC = () => (<>
  <Composition id="hook-0-lift" component={HookCut("lift")} durationInFrames={102} {...V} />
  <Composition id="hook-1-drop" component={HookCut("drop")} durationInFrames={102} {...V} />
  <Composition id="hook-2-pit"  component={HookCut("pit")}  durationInFrames={102} {...V} />
  <Composition id="rps-house" component={ReelHouse} durationInFrames={RPS_TOTAL} {...V} />
  <Composition id="rps-amber" component={ReelAmber} durationInFrames={RPS_TOTAL} {...V} />
  <Composition id="rps-steel" component={ReelSteel} durationInFrames={RPS_TOTAL} {...V} />
  <Composition id="rps-quiet" component={ReelQuiet} durationInFrames={RPS_TOTAL} {...V} />
</>);

registerRoot(Root);
