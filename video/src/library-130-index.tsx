import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { makeReel, L, s0CuesFor, BED, BED_GAIN } from "./ClaudeLibrary130Reel";
import { HOOKS } from "./LbyHooks";
import type { HookId } from "./LbyHooks";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { SfxTrack, LEVELS } from "./SoundKit";
import { Audio, staticFile } from "remotion";
import { CamCtx, R } from "./LbyWorld";
import { CAM, GRADE } from "./LbyScenes";
import words from "./data/words_130library.json";

/* Reel 130 "LIBRARY". Board: storyboards/130-library.md.

   Subject, checked 2026-08-30 against Claude Code's own documentation:

     the prompt library   code.claude.com/docs/en/prompt-library — Anthropic's
                          own page of copy-paste prompts for Claude Code, tagged
                          by task and role, free. Counted from the page's own
                          data array: 52 prompts, 15 categories, 5 SDLC phases
                          (discover 7 · design 6 · build 22 · ship 5 · operate
                          12). Every entry has editable fill-in fields you edit
                          on the page and then copy. They are lifted from
                          Anthropic's own guides: workflows 23 · teams 13 ·
                          best-practices 10 · ebook 3 · legal 2 · security 1.

     rule 1               a slash command IS a skill — `.claude/skills/<name>/
                          SKILL.md` creates `/name`, and `.claude/commands/
                          <name>.md` still works. The docs give the VO's own
                          reason: "Create a skill when you keep pasting the same
                          instructions, checklist, or multi-step procedure into
                          chat."
     rule 2               "enter plan mode by pressing Shift+Tab or prefixing a
                          single prompt with /plan"; the status bar reads
                          `⏸ plan mode on`. Shift+Tab CYCLES the permission
                          modes, which is why S5 shows two strikes.
     rule 3               CLAUDE.md at `./CLAUDE.md` or `./.claude/CLAUDE.md`,
                          "loaded at the start of every conversation", holding
                          "build commands, conventions, project layout, always
                          do X rules". Target under 200 lines; `/init` writes a
                          starting one.

   ⛔⛔ ONE THING THE VO SAYS THAT THE FRAME DOES NOT CLAIM. "There's already
   over a hundred free templates" — the library holds 52. `COUNT_BANNED` greps
   for 100 / 100+ / OVER 100 / HUNDRED / HUNDREDS / 1000, and no plate, band,
   chip or drawer face prints a total above 52. S9 pays the line with the
   PICTURE: the wall runs past the crop with its five bank counters still
   climbing. The standing rule: when a VO asserts a figure you cannot source,
   dramatise the MECHANISM and stop at the edge of the claim.

   890 frames = 29.67s, inside the playbook's 22-29s figure to within 0.67s and
   shorter than every recent ship. The cut removes 16.42s of a 46.07s raw take:
   TWO `cut cut` retakes that four separate whisper passes reported as clean.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⭐⭐ THE TRIAL CUTS VARY THE **HOOK PICTURE**, WHICH IS THE STRONGEST AXIS THE
   house has. `docs/TRIAL-CUTS.md` measured the existing variant system at
   3.4-7.0 bits of 64 — every pair a duplicate risk — and
   `feedback_trial_cut_variants` is explicit that the lever is the HOOK, never a
   regrade (`hue-rotate`/`saturate` on the sprite are banned outright). The
   three hooks are three different EVENTS at three different SHOT SIZES with
   travel on three different AXES — vertical, horizontal and toward camera — on
   top of the per-cut rake PITCH (not phase; a phase inside one pitch collapses
   to nothing), camera offset, grade, bed TRACK, caption band Y and header Y.
   ⛔ ONE VO ACROSS ALL THREE. The three cuts differ in picture only. */
/* ⭐ THE THREE CUTS NOW CARRY THE TWO PICKED LOADS PLUS ONE ENTIRELY DIFFERENT
   PICTURE. Alex picked B and C off the strip, so house and amber take the ball
   of drafts and the bale of cards; steel keeps THE DRAWER, which is a different
   event at a different shot size and is what stops the trial cuts collapsing
   into a dHash duplicate — [[docs/TRIAL-CUTS.md]] measured the old variant
   system at 3.4-7.0 bits of 64, and two hauls that differ only in the object
   they drag would land straight back in that band. */
export const ReelHouse = makeReel("house", false, "haulb");
export const ReelAmber = makeReel("amber", false, "haulc");
export const ReelSteel = makeReel("steel", false, "drawer");
export const ReelQuiet = makeReel("house", true, "haulb");

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
      <KaraokeCaption words={words as any[]} fps={30} top={1252} />
      <HookHeader big="CLAUDE OFFICIAL" hot={`${R.prompts} PROMPTS`} f={f} at0 />
      {/* ⛔ A SILENT CANDIDATE IS NOT THE CANDIDATE. Reel 119 picked a hook off
          muted stills and then had to re-pick once it was heard; these carry the
          shot's own cue bank and the same bed at the same gain the cut uses. */}
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={s0CuesFor(id)} />
    </AbsoluteFill>
  );
};

const Root: React.FC = () => (<>
  {/* ⛔⛔⛔ THE-OPEN STEP 1. Three genuinely different PICTURES at three
      different SHOT SIZES, not one picture in three colourways: a shutter
      thrown up on a hall that was open the whole time, a finished card slid the
      full width of a counter into a hand that is still cutting one, and a chute
      pouring finished cards onto the bench at camera. */}
  {/* ⛔⛔⛔ FIFTH NOTE ON ONE OBJECT, and the first one that named the axis:
      *"these don't really represent PROMPT LIBRARY that well."* Rounds 1-4 were
      chasing legibility (blank cards → a monumental card → a typewriter) and
      then plausibility (a pencil, a boulder, a ball and chain). Both were real
      bars and both were passed. The bar nobody had written down is the third:
      the object has to BE the subject. All three below are made of prompts. */}
  <Composition id="load-A-drawer"  component={HookComp("haul")}  durationInFrames={L.S1} {...V} />
  <Composition id="load-B-drafts" component={HookComp("haulb")} durationInFrames={L.S1} {...V} />
  <Composition id="load-C-bale"    component={HookComp("haulc")} durationInFrames={L.S1} {...V} />
  <Composition id="hook-B-slot"   component={HookComp("slot")}   durationInFrames={L.S1} {...V} />
  <Composition id="hook-C-drawer" component={HookComp("drawer")}  durationInFrames={L.S1} {...V} />

  {/* the three delivered cuts + the bed-only A/B */}
  <Composition id="library-house" component={ReelHouse} durationInFrames={L.END} {...V} />
  <Composition id="library-amber" component={ReelAmber} durationInFrames={L.END} {...V} />
  <Composition id="library-steel" component={ReelSteel} durationInFrames={L.END} {...V} />
  <Composition id="library-quiet" component={ReelQuiet} durationInFrames={L.END} {...V} />
</>);

registerRoot(Root);
