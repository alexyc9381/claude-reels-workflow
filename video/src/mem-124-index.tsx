import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { makeReel, CUTS } from "./ClaudeMemReel";
import { HOOKS } from "./MemHooks";
import type { HookId } from "./MemHooks";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./MemWorld";
import { CAM, GRADE } from "./MemScenes";

/* Reel 124 "MEM". Board: storyboards/124-mem.md.

   Subject, verified live 2026-08-27 against Anthropic's own post ("Claude's
   memory works everywhere, and you decide what's in it", 2026-08-25):
     · memories are stored as A LIST OF FILES UNDER "TOPICS" in Memory settings,
       and the user can "read, edit, or delete each one" — that is the reel's
       hero artifact, drawn as a literal file with a tab, a spine and a label
     · ⭐ the actual change is that Claude "adds topics to memory AS YOU CHAT,
       instead of summarizing conversations after they end" — so S5 is built
       entirely around SIMULTANEITY: he talks in the foreground and never looks
       behind him while the press writes
     · on by default on FREE, PRO and MAX, across WEB, DESKTOP and MOBILE
     · Cowork tasks run in the cloud with access to chat memory, and a task that
       needs LOCAL files runs on your machine instead — which is the catch
     · ⛔ the VO says "for all users" and the FRAME DOES NOT: Team/Enterprise is
       admin-controlled and defaults OFF for individuals, so every plate carries
       "FREE · PRO · MAX". The reel dramatises the mechanism and stops at the
       edge of the claim.
     · ⛔ "Delete Obsidian" is the VO's hyperbole. The crate carries the real
       Obsidian mark because it is the noun in the spoken line, but nothing on
       screen says the product is worse or broken — it is a vault you fill BY
       HAND, and what replaces it is one that fills itself.

   THE MEMORY WORKS: a records plant, not a library. Nothing here is browsed;
   everything here is MADE, continuously, while the hero is mid-sentence. The
   villain is THE GAP — the black slot between one chat and the next — and it is
   never beaten: it eats the details at S3, wins at S4, is PLATED OVER at S5,
   and re-opens under the severed local line at S14 to win there. The reel's
   opening problem is its closing caveat, in the same physical object.

   1038 frames = 34.60s. ⚠️ Outside the 22-29s figure in the playbook and
   FLAGGED, not trimmed: every second is spoken content, and the cut already
   removes 122.81s of flubs, retakes and dead air from a 159.01s raw take with
   fourteen `cut cut` retakes and two spoken editing directions in it.
   Recent ships: 110 = 30.95 · 109 = 31.14 · 118 = 33.68 · 120 = 35.24 ·
   117 = 38.83 · 122 = 61.05.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⭐⭐ THE TRIAL CUTS VARY THE **HOOK PICTURE**, WHICH IS THE STRONGEST AXIS THE
   house has. `docs/TRIAL-CUTS.md` measured the existing variant system at 3.4-7.0
   bits of 64 — every pair a duplicate risk — and `feedback_trial_cut_variants` is
   explicit that the lever is the HOOK, never a regrade (`hue-rotate`/`saturate`
   on the sprite are banned outright; amber once shipped an off-brand mascot).
   Three of the four candidate hooks are genuinely different WORLDS with
   different shot sizes, so each cut opens on a different image entirely — on
   top of the per-cut rake pitch, camera offset, grade, bed and caption band.
   ⛔ ONE VO ACROSS ALL THREE. Alex recorded three hook TAKES, which are
   alternatives for the one cut, not three scripts — "Hook 1 / Hook 2 / Hook 3"
   is him labelling takes. The strongest take ships and the others are not
   spliced in, because three VOs would mean three L tables and three caption
   files for a difference nobody watching one cut can perceive. */
export const ReelHouse = makeReel("house", false, "drop");
export const ReelAmber = makeReel("amber", false, "head");
export const ReelSteel = makeReel("steel", false, "swap");
export const ReelQuiet = makeReel("house", true, "drop");

/** ⛔ each cut is a DIFFERENT LENGTH, because each hook take is. The composition
    duration has to come from that cut's own table or the tail is cut off or
    padded with dead air. */
const D = (h: "drop" | "head" | "swap") => CUTS[h]!.t.total;

/** the four hook candidates, each rendered at FULL CHASSIS QUALITY as its own
    composition. ⛔ THE-OPEN step 1: the decision is visual, so the artefact has
    to be visual — a description is not a candidate.
    ⛔⛔ AND "FULL CHASSIS" MEANS THE CHASSIS. The first pass mounted the hook
    body ALONE, so the stills had no cream `Bg`, no `HookHeader` pill and no
    caption band — three of the largest bright objects in the real frame were
    missing from the very image the decision was being made on, and the in-panel
    claim plate was sized against a frame that does not exist. A preview that is
    not what ships is worse than no preview. */
const HookComp = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  const f = useCurrentFrame();
  const hookDur = (CUTS[id] ?? CUTS.drop).t.L.S1;
  return (
    <AbsoluteFill>
      <Bg />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <C v="house" dur={hookDur} />
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={(CUTS[id] ?? CUTS.drop).words} fps={30} top={1248} />
      <HookHeader big="CLAUDE JUST BUILT" hot="ITS OWN SECOND BRAIN" f={f} at0 />
    </AbsoluteFill>
  );
};

const Root: React.FC = () => (<>
  {/* ⛔⛔⛔ THE-OPEN STEP 1. Four genuinely different WORLDS, not one world in
      four colourways: a vault that is dropped, a brain that is lowered onto
      him, a wall that prints itself, and a swap between two plinths. One gets
      picked before anything else is polished. */}
  <Composition id="hook-A-drop"   component={HookComp("drop")}   durationInFrames={CUTS.drop.t.L.S1} {...V} />
  <Composition id="hook-B-head"   component={HookComp("head")}   durationInFrames={CUTS.head!.t.L.S1} {...V} />
  <Composition id="hook-C-prints" component={HookComp("prints")} durationInFrames={CUTS.drop.t.L.S1} {...V} />
  <Composition id="hook-D-swap"   component={HookComp("swap")}   durationInFrames={CUTS.swap!.t.L.S1} {...V} />

  {/* the three delivered cuts + the bed-only A/B */}
  <Composition id="mem-house" component={ReelHouse} durationInFrames={D("drop")} {...V} />
  <Composition id="mem-amber" component={ReelAmber} durationInFrames={D("head")} {...V} />
  <Composition id="mem-steel" component={ReelSteel} durationInFrames={D("swap")} {...V} />
  <Composition id="mem-quiet" component={ReelQuiet} durationInFrames={D("drop")} {...V} />
</>);

registerRoot(Root);
