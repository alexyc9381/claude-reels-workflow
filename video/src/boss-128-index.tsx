import React from "react";
import { Composition, registerRoot } from "remotion";
import {
  ClaudeBoss128Reel, ClaudeBoss128ReelAmber, ClaudeBoss128ReelSteel,
  ClaudeBoss128ReelQuiet, BOSS_TOTAL,
} from "./ClaudeBoss128Reel";

/* Reel 128 "BOSS" — THE OVERLOOK. Board: storyboards/128-boss.md.

   ⛔⛔⛔ THE SAME SCRIPT SHIPPED AS REEL 118 "LOOP" ON 2026-08-21, beat for
   beat, with `critic` -> `boss` and `Gauntlet Loop` -> `boss loop`. Built as a
   deliberate re-run with an inverted geometry: 118 is a HORIZONTAL proving run
   with a critic on a pulpit and a BAR to clear; 128 is a VERTICAL hall with a
   boss behind glass, a hoist up, a chute down, and a MACHINE that has to RUN.

   Subject, verified live 2026-08-29:
     · the practice is published as "loop engineering" / "agent loops". NOBODY
       calls it the boss loop — that name is ours, and the frame never claims
       otherwise.
     · Boris Cherny (creator, Claude Code): "I don't prompt Claude anymore. I
       have loops running that prompt Claude and figure out what to do."
     · Cherny on verification: "can the agent run the thing?" — actual product
       usage, not unit tests. That is why S8's beat is a TEST, not a stamp, and
       it is a different quote from the one reel 118 used.
     · Cherny on fan-out: "armies of agents, with agents prompting agents in
       trees of thousands"; he shipped nested subagent support.
     · the Claude Code team's own term for line 3 is the MAKER/CHECKER split.
     · ⛔ NO money figure anywhere. The VO names none.

   864 frames = 28.80s at 30fps, x1.00 with NO speedup. R1 is FLAGGED: the cut
   runs 4.80 wps overall and 4.69 across the 0-10s hook against a 4.0 bar, so a
   speedup would make a fast hook faster. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="BossReel" component={ClaudeBoss128Reel}
      durationInFrames={BOSS_TOTAL} {...V} />
    <Composition id="BossReelAmber" component={ClaudeBoss128ReelAmber}
      durationInFrames={BOSS_TOTAL} {...V} />
    <Composition id="BossReelSteel" component={ClaudeBoss128ReelSteel}
      durationInFrames={BOSS_TOTAL} {...V} />
    <Composition id="BossReelQuiet" component={ClaudeBoss128ReelQuiet}
      durationInFrames={BOSS_TOTAL} {...V} />
  </>
);
registerRoot(RemotionRoot);
