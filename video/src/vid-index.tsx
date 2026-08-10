import React from "react";
import { Composition, registerRoot } from "remotion";
import { HookTower, HookPull, HookWall, HookCount, HookLock, HookStamp, HOOK_LEN } from "./VidHooks2";
import { VideoReel, VID_TOTAL } from "./ClaudeVideoReel";

/* Reel 93 "VIDEO". Board: storyboards/93-video.md · hooks: docs/93-video-hooks.md.
   ⛔ Round 1 (VidHooks.tsx: video store / jukebox / forecourt / toll / weigh-stall)
      is DEAD. `vidPull` and `vidWall` are the live pair; the other three are
      parked, not deleted. */
const V = { fps: 30, width: 1080, height: 1920 } as const;
const HOOKS = [
  ["vidTower", HookTower],  // THE BLOCK PULL   · STABILITY            (live, in the reel)
  ["vidPull", HookPull],    // ABSORPTION        · many become one     (live)
  ["vidWall", HookWall],    // DESTRUCTION       · a GRID, rejected     (dead)
  ["vidCount", HookCount],  // A NUMBER CLIMBING · 4 becomes 400+      (parked)
  ["vidLock", HookLock],    // LOCKED -> OPEN    · the padlock pops    (parked)
  ["vidStamp", HookStamp],  // MASS STATE CHANGE · one press flips all (parked)
] as const;

const Root: React.FC = () => (<>
  <Composition id="VideoReel" component={VideoReel} durationInFrames={VID_TOTAL} {...V} />
  {HOOKS.map(([id, C]) => (
    <Composition key={id} id={id} component={C} durationInFrames={HOOK_LEN} {...V} />
  ))}
</>);
registerRoot(Root);
