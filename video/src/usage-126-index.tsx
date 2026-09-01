import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { makeReel, L } from "./ClaudeUsageReel";
import { HOOKS } from "./UsgHooks";
import type { HookId } from "./UsgHooks";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./UsgWorld";
import { CAM, GRADE } from "./UsgScenes";
import words from "./data/words_126usage.json";

/* Reel 126 "USAGE". Board: storyboards/126-usage.md.

   Subject, verified live 2026-08-28 against GitHub's own API and each repo's
   README — three free repos, one bill, three different parts of it:

     1 aattaran/deepclaude          ★2,254 · MIT
       sets ANTHROPIC_BASE_URL per session so Claude Code's own agent loop talks
       to DeepSeek. DeepSeek V4 Pro $0.87/M output against Anthropic $15.00/M.
       THE RATE.

     2 JuliusBrussee/caveman        ★101,494 · MIT + BSL-1.1
       `/caveman` compresses the prose while "code, commands, and errors stay
       exact". 65% average fewer OUTPUT tokens on the repo's own benchmark table
       (per-task range 22-87%). ⛔ The repo also says, itself: "the skill only
       shrinks output tokens. Input and reasoning tokens are untouched...
       whole-session savings run smaller than the output number." THE VOLUME.

     3 ww-w-ai/super-token-saver    ★31 · Apache-2.0
       Token Guardian trips at 3,590s idle — one hour minus a buffer — because
       that is when the prompt cache dies and the next prompt re-sends the whole
       context. The README's own worked example: "$9 silent cost spike: single
       cache expiry re-send at 900K tokens". PAID TWICE.

   ⛔⛔ THE VO ASSERTS THREE THINGS THE FRAME DOES NOT: "10x your usage", "cuts
   your token usage by 65%" without the word OUTPUT, and "75% less". The first
   and third are unsourced anywhere and are on `TEN_BANNED`; the second is
   sourced but only for output tokens, so the plate names the unit and the
   source and S8 draws the untouched input line running past the grille. The
   standing rule: when a VO asserts a result you cannot source, dramatise the
   MECHANISM and stop at the edge of the claim.

   ⛔ "COMPLETELY FREE" IS TRUE OF THE REPOS AND NOT OF THE USAGE, and the
   villain is built on exactly that: THE DRUM only turns one way, it is slowed
   three times, and on the last frame of the CTA it is still turning. `Drum`
   clamps its own rate floor so no scene can accidentally claim otherwise.

   1137 frames = 37.90s. ⚠️ Outside the 22-29s figure in the playbook and
   FLAGGED, not trimmed: every second is spoken content and the cut already
   removes 84.9s of flubs, retakes and dead air from a 120.58s raw take with
   fourteen `cut cut` retakes in it. Recent ships: 118 = 33.68 · 124 = 32.53 ·
   120 = 35.24 · 117 = 38.83.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⭐⭐ THE TRIAL CUTS VARY THE **HOOK PICTURE**, WHICH IS THE STRONGEST AXIS THE
   house has. `docs/TRIAL-CUTS.md` measured the existing variant system at
   3.4-7.0 bits of 64 — every pair a duplicate risk — and
   `feedback_trial_cut_variants` is explicit that the lever is the HOOK, never a
   regrade (`hue-rotate`/`saturate` on the sprite are banned outright; amber
   once shipped an off-brand mascot). All three hooks are different WORLDS at
   different SHOT SIZES, on top of the per-cut rake PITCH (not phase — a phase
   inside one pitch collapses to nothing), camera offset, grade, bed passage,
   caption band and header Y.
   ⛔ ONE VO ACROSS ALL THREE. Alex recorded one take of the hook line; the three
   cuts differ in picture only. */
export const ReelHouse = makeReel("house", false, "crew");
export const ReelAmber = makeReel("amber", false, "crew");
export const ReelSteel = makeReel("steel", false, "crew");
export const ReelQuiet = makeReel("house", true, "crew");

/** the three hook candidates, each rendered at FULL CHASSIS QUALITY as its own
    composition. ⛔ THE-OPEN step 1: the decision is visual, so the artefact has
    to be visual — a description is not a candidate.
    ⛔⛔ AND "FULL CHASSIS" MEANS THE CHASSIS. Reel 124's first pass mounted the
    hook body ALONE, so the stills had no cream `Bg`, no `HookHeader` pill and
    no caption band — three of the largest bright objects in the real frame were
    missing from the very image the decision was being made on. */
const HookComp = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <C v="house" dur={L.S1} />
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any[]} fps={30} top={1248} />
      <HookHeader big="3 REPOS" hot="80% CHEAPER CLAUDE" f={f} at0 />
    </AbsoluteFill>
  );
};

const Root: React.FC = () => (<>
  {/* ⛔⛔⛔ THE-OPEN STEP 1. Three genuinely different WORLDS at three different
      SHOT SIZES, not one world in three colourways: a man paid almost nothing
      by a machine, a meter running away with him, and a column of coins being
      sheared. One gets picked before anything else is polished. */}
  <Composition id="hook-A-crew"   component={HookComp("crew")}   durationInFrames={L.S1} {...V} />
  <Composition id="hook-A-ration" component={HookComp("ration")} durationInFrames={L.S1} {...V} />
  <Composition id="hook-B-brake"  component={HookComp("brake")}  durationInFrames={L.S1} {...V} />
  <Composition id="hook-C-column" component={HookComp("column")} durationInFrames={L.S1} {...V} />

  {/* the three delivered cuts + the bed-only A/B */}
  <Composition id="usage-house" component={ReelHouse} durationInFrames={L.END} {...V} />
  <Composition id="usage-amber" component={ReelAmber} durationInFrames={L.END} {...V} />
  <Composition id="usage-steel" component={ReelSteel} durationInFrames={L.END} {...V} />
  <Composition id="usage-quiet" component={ReelQuiet} durationInFrames={L.END} {...V} />
</>);

registerRoot(Root);
