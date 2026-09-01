import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { makeReel, L } from "./ClaudeDesign127Reel";
import { HOOKS } from "./DsnHooks";
import type { HookId } from "./DsnHooks";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx, R } from "./DsnWorld";
import { CAM, GRADE } from "./DsnScenes";
import words from "./data/words_127design.json";

/* Reel 127 "DESIGN". Board: storyboards/127-design.md.

   Subject, checked 2026-08-29 against Claude Code's own docs and the shipped
   skill and tool definitions:

     /design          research preview, CLI + Claude Code Desktop, built on
                      artifacts. "Run it with a brief and Claude publishes a
                      canvas of editable artboards for your UI. Pick one, tweak
                      it, then have Claude implement it." Requires v2.1.233 or
                      later; Pro, Max, Team and Enterprise. It PRINTS A LINK to
                      the published canvas — it does not open a window.
                      Artboards are `.dc.html` on one pan/zoom canvas, and the
                      documented editing is click-to-select, a properties panel,
                      inline text editing and undo/redo, with Save publishing a
                      new version.

     /design-sync     two-way. PULL imports your design system into the project
                      so Claude Code builds against your real components; PUSH
                      sends what you built back to the canvas. It syncs ONE
                      COMPONENT AT A TIME, never as a wholesale replace, and a
                      design-system project groups TYPE · COLORS · SPACING ·
                      COMPONENTS · BRAND.

   ⛔⛔ TWO THINGS THE VO SAYS THAT THE FRAME DOES NOT CLAIM. "It completely
   fixes the worst part of AI coding" is an opinion, so no plate anywhere
   carries a percentage, a benchmark or a multiplier (`PERF_BANNED`). And
   "clicking and dragging" goes past what the docs describe, so S9 STAGES
   direct manipulation — real selection handles, a real properties strip, a
   panel re-seated, SAVED — and `DRAG_BANNED` must return zero rendered hits.
   The standing rule: when a VO asserts a result you cannot source, dramatise
   the MECHANISM and stop at the edge of the claim.

   ⛔ AND THE PREVIEW STATUS IS ON SCREEN, NOT OMITTED. Every scene that shows
   the command shows `RESEARCH PREVIEW` beside it. A preview presented as GA is
   the easiest false claim in this subject and it would be the first thing a
   viewer who tried it and failed would be angry about.

   912 frames = 30.40s, inside the playbook's 22-29s figure to within half a
   second and shorter than every recent ship (118 = 33.68 · 124 = 32.53 ·
   120 = 35.24 · 126 = 37.90). The cut removes 15.66s of a 46.07s raw take: one
   `cut cut` retake inside the "ugly generic template" line, and eight dead
   spots between 0.55s and 2.70s.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⭐⭐ THE TRIAL CUTS VARY THE **HOOK PICTURE**, WHICH IS THE STRONGEST AXIS THE
   house has. `docs/TRIAL-CUTS.md` measured the existing variant system at
   3.4-7.0 bits of 64 — every pair a duplicate risk — and
   `feedback_trial_cut_variants` is explicit that the lever is the HOOK, never a
   regrade (`hue-rotate`/`saturate` on the sprite are banned outright; amber
   once shipped an off-brand mascot). The three hooks are three different EVENTS
   at three different SHOT SIZES with travel on three different AXES — vertical,
   horizontal and toward camera — on top of the per-cut rake PITCH (not phase; a
   phase inside one pitch collapses to nothing), camera offset, grade, bed
   passage, caption band Y and header Y.
   ⛔ ONE VO ACROSS ALL THREE. The three cuts differ in picture only. */
export const ReelHouse = makeReel("house", false, "drop");
export const ReelAmber = makeReel("amber", false, "unroll");
export const ReelSteel = makeReel("steel", false, "slam");
export const ReelQuiet = makeReel("house", true, "drop");

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
      <HookHeader big={R.cmd} hot={R.status} f={f} at0 />
    </AbsoluteFill>
  );
};

const Root: React.FC = () => (<>
  {/* ⛔⛔⛔ THE-OPEN STEP 1. Three genuinely different PICTURES at three
      different SHOT SIZES, not one picture in three colourways: a board dropped
      out of the roof, a canvas unrolled across the floor, and three boards
      slammed down at camera. One gets picked before anything else is polished. */}
  <Composition id="hook-A-drop"   component={HookComp("drop")}   durationInFrames={L.S1} {...V} />
  <Composition id="hook-B-unroll" component={HookComp("unroll")} durationInFrames={L.S1} {...V} />
  <Composition id="hook-C-slam"   component={HookComp("slam")}   durationInFrames={L.S1} {...V} />

  {/* the three delivered cuts + the bed-only A/B */}
  <Composition id="design-house" component={ReelHouse} durationInFrames={L.END} {...V} />
  <Composition id="design-amber" component={ReelAmber} durationInFrames={L.END} {...V} />
  <Composition id="design-steel" component={ReelSteel} durationInFrames={L.END} {...V} />
  <Composition id="design-quiet" component={ReelQuiet} durationInFrames={L.END} {...V} />
</>);

registerRoot(Root);
