import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, UNLAZY_TOTAL, HookCut } from "./ClaudeUnlazyReel";

/* Reel 120 "UNLAZY". Board: storyboards/120-unlazy.md.

   Subject, verified live 2026-08-22: the UNLAZY SKILL
   (github.com/Leonxlnx/unlazy, ★973, MIT, created 2026-08-09). v2 stops
   asking for effort and enforces it — acceptance gates live in a GATES.md
   ledger, `gate-check.mjs` runs each gate's CHECK command and flips its box
   ONLY when the output matches EXPECT, recording the deciding lines as
   evidence, and a Stop hook blocks the agent from declaring victory while
   gates are unmet. Verbatim: "You do not promise you are done. You prove it
   against a ledger."
     · "GitHub's top trending author" is BACKED — the same owner also ships
       `taste-skill` at ★79,304
     · "Anthropic even admitted it" is BACKED FIRST-PARTY — their own system
       cards evaluate models on "reward-hack-prone coding tasks", i.e.
       hard-coding and special-casing tests
     · ⛔ "10 sub-agents in parallel" is a USER TWEAK, not a repo feature: the
       repo names no number. 10 is drawn as ten lanes, never as a statistic.

   THE SIGN-OFF LINE: the skill's one line is about proof beating promise, so
   the set is an inspection hall where a signature is worthless and the only
   thing that ships work is a machine that ran the check and printed the
   output. The villain is THE STAMP: it is checked at S4, strains against the
   bar as the background process of S5-S8, and is beaten exactly once, at S9.

   1161 frames = 38.70s. ⚠️ Outside the 22-29s figure in the playbook and
   FLAGGED, not trimmed: every second is spoken content, and the cut already
   removes 25.2s of flubs, a mouth click and dead air from a 63.95s raw take.
   Recent ships: 110 = 30.95 · 109 = 31.14 · 118 = 33.68 · 117 = 38.83 ·
   115 = 46.93 · 113 = 49.90 · 116 = 56.18 · 112 = 75.65.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const ReelHall = makeReel("hall");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("hall", true);

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at full quality,
   PICKED before anything else is built. Skipping this cost reel 120 two rounds. */
const Root: React.FC = () => (<>
  <Composition id="hook-1-trophy"  component={HookCut("trophy")}  durationInFrames={106} {...V} />
  <Composition id="hook-2-flag"    component={HookCut("flag")}    durationInFrames={106} {...V} />
  <Composition id="hook-3-balloon" component={HookCut("balloon")} durationInFrames={106} {...V} />
  <Composition id="hook-4-cannon"  component={HookCut("cannon")}  durationInFrames={106} {...V} />
  <Composition id="hook-5-paint"   component={HookCut("paint")}   durationInFrames={106} {...V} />
  <Composition id="unlazy-hall" component={ReelHall} durationInFrames={UNLAZY_TOTAL} {...V} />
  <Composition id="unlazy-amber" component={ReelAmber} durationInFrames={UNLAZY_TOTAL} {...V} />
  <Composition id="unlazy-steel" component={ReelSteel} durationInFrames={UNLAZY_TOTAL} {...V} />
  <Composition id="unlazy-quiet" component={ReelQuiet} durationInFrames={UNLAZY_TOTAL} {...V} />
</>);

registerRoot(Root);
