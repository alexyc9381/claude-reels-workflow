import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelFloor, ReelScreens, ReelBaydoor, CLD_TOTAL } from "./ClaudeClaudeReel";

/* Reel 107 "CLAUDE". Board: storyboards/107-claude.md.
   THREE FULL TRIAL CUTS from one factory (makeReel), each a different world for
   the hook and payoff and a different camera/push/bed/caption band throughout:
     v1 FLOOR    — the night workshop row, output towers climbing beside every
                   station but yours
     v2 SCREENS  — the ops room wall of running Claude Code sessions, one dead
     v3 BAYDOOR  — the loading bay, everyone else's work wheeled out by the
                   palletful through a blazing doorway
   1052 frames = 35.06s, hard-cutting on the VO's last word. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="cld-floor" component={ReelFloor} durationInFrames={CLD_TOTAL} {...V} />
  <Composition id="cld-screens" component={ReelScreens} durationInFrames={CLD_TOTAL} {...V} />
  <Composition id="cld-baydoor" component={ReelBaydoor} durationInFrames={CLD_TOTAL} {...V} />
</>);

registerRoot(Root);
