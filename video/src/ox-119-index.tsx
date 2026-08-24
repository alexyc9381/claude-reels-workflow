import React from "react";
import { AbsoluteFill, Audio, Composition, registerRoot, staticFile } from "remotion";
import { ReelUnsigned, ReelAmber, ReelSteel, ReelQuiet, OX_TOTAL } from "./ClaudeOxReel";
import { HookGate, HookCrush, HookBoard } from "./OxHooks";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./OxWorld";
import { LEVELS, db, SfxTrack, layer } from "./SoundKit";
import words from "./data/words_119ox.json";

/* ⭐ each concept plays with the real chassis, the real VO and the real bed, so
   the decision is made on the thing a viewer would actually get served — not on
   a bare scene. THE-OPEN step 1: *"render one still frame of each at full
   quality"*; a hook is 2.5s of motion, so it gets watched, not just looked at. */
/* ⭐⭐ THE HOOK'S OWN SFX. Cuts at f0 / f20 / f42; the cue set is built off the
   ACTIONS, not off a rate target — winch, gate, hooves, iron, animal.
   ⭐ The three ratchet clicks are ONE event (a run with drifting pitch), and
   each layered pair is one event, so this reads as 5 beats in 2.5s and not 10.
   ⛔ THE ANIMAL SOUND IS `ox_bellow` — synthesised for this reel because the
   bank has no animal at all ([[feedback_sfx_bank_belongs_to_the_world]]: a
   clean audit is not a good bank, and a borrowed pack is not this world). It
   lands ON THE IRON, so the bellow is the animal ANSWERING the brand. */
const HOOK_SFX = [
  /* shot A · three hauls on the winch, the pawl dropping into each tooth.
     ⛔ v1 put the third click at f18 and the gate at f20 — 2 frames apart, and
     the gate carries a 3-frame J-cut lead, so they smeared into one mush and
     BOTH measured flat against the bed. 6-frame hauls move the last click to
     f16 and give the gate clean air. */
  { at: 3 / 30, src: "ratchet.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.32, rate: 0.94 },
  { at: 8 / 30, src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.32, rate: 1.03 },
  { at: 13 / 30, src: "ratchet.wav", v: LEVELS.SFX_MID * db(2), dur: 0.34, rate: 1.13 },
  /* the second and last cut · ⛔ v1 gave the biggest visual event in the hook a WHOOSH and
     nothing else, and it read as nothing. 700px of steel breaking free is an
     IMPACT first; the whoosh is only the travel after it. */
  ...layer(16 / 30,
    { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.62 },
    { src: "chain_clank.wav", v: LEVELS.SFX_TEXTURE * db(2), dur: 0.50, rate: 0.88 }),
  { at: 17 / 30, src: "whoosh_heavy.wav", v: LEVELS.SFX_MID * db(1), dur: 0.66 },
  /* ⭐ THE ANIMAL, twice, and both times it is answering something.
     `ox_bellow` is synthesised for this reel — the bank has no animal at all,
     and a borrowed pack is not this world ([[feedback_sfx_bank_belongs_to_the_world]]). */
  { at: 20 / 30, src: "crowd_run.wav", v: LEVELS.SFX_TEXTURE * db(2), dur: 0.62, rate: 0.78 },
  { at: 27 / 30, src: "ox_bellow.wav", v: LEVELS.SFX_HERO * db(4), dur: 0.95 },
  /* still the same take · the iron, then the animal again — deeper, a REACTION */
  ...layer(57 / 30,
    { src: "stamp_press.wav", v: LEVELS.SFX_HERO * db(3), dur: 0.34 },
    { src: "paper_burn.wav", v: LEVELS.SFX_TEXTURE * db(3), dur: 0.90 }),
  { at: 61 / 30, src: "ox_bellow.wav", v: LEVELS.SFX_HERO * db(1), dur: 0.80, rate: 0.74 },
];;

const HookCut = (Inner: React.FC<{ dur: number }>): React.FC => () => (
  <AbsoluteFill>
    <Bg />
    <Audio src={staticFile("119_ox_vo.wav")} volume={LEVELS.DIALOGUE} />
    <Audio src={staticFile("119_ox_bed.wav")} volume={LEVELS.MUSIC * db(7.9)} />
    <SfxTrack cues={HOOK_SFX} />
    <CamCtx.Provider value={{ dx: -10, dy: 14, s: 1.01, rot: -0.4 }}>
      <AssemblyCtx.Provider value={true}>
        <Inner dur={75} />
      </AssemblyCtx.Provider>
    </CamCtx.Provider>
    <ProgressBar />
    <KaraokeCaption words={words as any} fps={30} top={1262} />
    <HookHeader big="USE CLAUDE CODE FREE" hot="UNLIMITED, THIS WEEK" f={12} />
  </AbsoluteFill>
);

/* Reel 119 "OX". Board: storyboards/119-ox.md.

   Subject, verified live 2026-08-22: `ox-alpha`, an anonymous frontier model
   that appeared on OpenRouter on 2026-08-20 and is FREE until 2026-08-27.
     · 1,048,576-token context window, 131,072 max output
     · the operator CLAIMS 100 trillion tokens/day of serving capacity
     · runs on OpenRouter, OpenCode Zen and Mercury Cloud
     · nobody will say who made it — the provider is anonymous, and that is
       the hook: a model good enough to beat the frontier labs with NOBODY'S
       NAME ON IT, given away for nothing, for one week.
   ⛔ The "beats them on ALL the coding benchmarks" line rests on ONE result —
      DeepSWE Pass@1 80/65/52 — from a 10-task COMMUNITY run, not an audited
      leaderboard. S2 draws that one named test with its provenance strip and
      never a wall of benchmarks.

   THE WORLD IS THE SUBJECT'S OWN OBJECTS, not a borrowed one
   ([[feedback_real_marks_are_the_props]] — two worlds have been rejected with
   CORRECT mappings). A model is a physical CORE with the maker's mark struck
   into its face; ox-alpha's is a REDACTION BAR. Tokens are coins, the price is
   a strip that reads $0, the context window is a measuring deck, and the
   villain is a seven-segment WEEK CLOCK that is on screen from frame 0 (unlit)
   and is never beaten.

   908 frames = 30.28s. ⚠️ Just outside the 22-29s figure and FLAGGED, not
   trimmed — and the SHORTEST reel since 105. Recent ships: 110 = 31.42 ·
   111 = 33.56 · 118 = 34.07 · 114 = 46.49 · 113 = 50.20 · 112 = 76.22.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="ox-unsigned" component={ReelUnsigned} durationInFrames={OX_TOTAL} {...V} />
  <Composition id="ox-amber" component={ReelAmber} durationInFrames={OX_TOTAL} {...V} />
  <Composition id="ox-steel" component={ReelSteel} durationInFrames={OX_TOTAL} {...V} />
  <Composition id="ox-quiet" component={ReelQuiet} durationInFrames={OX_TOTAL} {...V} />
  {/* ⭐ THE HOOK EXPERIMENT — THE-OPEN.md step 1, which should have come first.
      Four concepts, each a different one-word mechanism, rendered at full
      quality so the decision is made on a picture rather than a description. */}
  <Composition id="hook-a-gate" component={HookCut(HookGate)} durationInFrames={75} {...V} />
  <Composition id="hook-b-crush" component={HookCut(HookCrush)} durationInFrames={75} {...V} />
  <Composition id="hook-c-board" component={HookCut(HookBoard)} durationInFrames={75} {...V} />
</>);

registerRoot(Root);
