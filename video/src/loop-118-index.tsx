import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelGauntlet, ReelAmber, ReelSteel, ReelQuiet, LOOP_TOTAL,
  HookShipped, HookVolleyCut, HookPressCut } from "./ClaudeLoopReel";

/* Reel 118 "LOOP". Board: storyboards/118-loop.md.

   Subject, verified live 2026-08-21: the GAUNTLET LOOP prompting technique —
   three lines that set a task, fan the work out to builder subagents, and
   assign a SEPARATE critic with fresh context that compares the real output to
   a quality bar, names the biggest gap, and sends it back. It loops until the
   critic is satisfied.
     · named + popularised by MATT SHUMER, via the "Claude of Duty" demo:
       Claude Opus 5, a browser FPS, ~55,000 lines of Three.js from one prompt
     · BORIS CHERNY, creator of Claude Code: "I don't prompt Claude anymore…
       My job is to write loops."
     · the builder never grades itself — that is the whole mechanism

   THE GAUNTLET: the technique is named after a set, so the set is one. A
   proving hall where work must physically run a line of judges, and what it
   does when it fails is go ROUND AGAIN — the loop is the return rail overhead,
   and you watch a build ride it back to the start and come out bigger. The
   villain is THE HEAD CRITIC: he rejects at S8, three times across S9, and is
   beaten exactly once, at S10, the peak.

   1022 frames = 34.07s. ⚠️ Outside the 22-29s figure in the playbook and
   FLAGGED, not trimmed: every second is spoken content, and the cut already
   removes 52.2s of flubs and dead air from an 86.24s raw take. Recent ships:
   110 = 31.42 · 111 = 33.56 · 114 = 46.49 · 113 = 50.20 · 115 = 51.46 ·
   116 = 56.60 · 112 = 76.22. This is the second shortest of that set.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="loop-gauntlet" component={ReelGauntlet} durationInFrames={LOOP_TOTAL} {...V} />
  <Composition id="loop-amber" component={ReelAmber} durationInFrames={LOOP_TOTAL} {...V} />
  <Composition id="loop-steel" component={ReelSteel} durationInFrames={LOOP_TOTAL} {...V} />
  <Composition id="loop-quiet" component={ReelQuiet} durationInFrames={LOOP_TOTAL} {...V} />
  {/* the hook experiment — 96 frames each, same VO/bed/plate, different IDEA */}
  <Composition id="hook-a-tower" component={HookShipped} durationInFrames={96} {...V} />
  <Composition id="hook-b-volley" component={HookVolleyCut} durationInFrames={96} {...V} />
  <Composition id="hook-c-press" component={HookPressCut} durationInFrames={96} {...V} />
</>);

registerRoot(Root);
