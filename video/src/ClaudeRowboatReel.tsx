import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { HookWake, HookPull, HookKerb, HookDocket, HookPass, HOOK_LEN } from "./RowHooks";
import {
  S1Sold, S2Give, S3Yc, S4Street, S5Over, S6Name, S7Say,
  S8Build, S9Crew, S10Ship, S11Team, S12Fast, S13Open, S14Cta,
} from "./RowScenes";
import words from "./data/words_rowboat_tight.json";

/* ============================================================================
   REEL 91 · "ROWBOAT" — Rowboat Labs open-sourced the thing you were about to
   pay an agency to build.

   VO: public/rowboat_vo_tight.wav — 34.36s.

   ⛔ TWO PASSES OF CUTTING, AND THE SECOND ONE IS THE ONE THAT MATTERS.
      Pass 1 removed the three KitKat restarts: 54.98s raw -> 38.70s.
      Pass 2 removed the DEAD AIR BETWEEN SENTENCES, which is what Alex actually
      heard ("there are gaps and pauses in between scenes too long"): seven
      silences totalling 5.93s, trimmed to a 0.22s beat each, -4.35s -> 34.36s.
      Every boundary sits INSIDE a measured silencedetect window (-40dB, d=0.30)
      with 110ms of margin at each end, so no speech is anywhere near a splice.
      ⛔ The whisper timings could NOT be reused for this — whisper places word
      onsets up to 0.39s early, so several words sat "inside" a window that is
      genuinely silent. Captions were rebuilt from the new wav with the canonical
      tools/build_captions.py: 142 words, 48 lines, 48/48 anchored to a measured
      onset. Every scene start was re-derived word-for-word from that file.

   ⛔ THE FLUB MARKER ON THIS TAKE IS "KITKAT", NOT "CUT CUT". Three restarts,
      which whisper transcribes literally as `KitKat.`: the Coinbase line, "you
      describe what you want in your AI" (twice), and "takes orders in English
      and develop...". The keeper is always the take AFTER the marker. 16.33s
      removed, every boundary on a MEASURED silence trough (four at -120 dBFS,
      two at -51/-74) — never on a whisper word end, because those run 150-200ms
      early. Ships at 1.0x.

   ⛔ THE SCRIPT ALEX PASTED IS NOT WHAT HE RECORDED. Absent from the take:
      "So welcome back guys, this is day 45 of building to 100x", "Apache
      licensed", "Coinbase bought their last company for it". Captions and
      scenes are built from the TAKE.

   34.36s, now inside the recent house range (CANCEL 26.4 / ROLES 29.5 / AI 34.3).

   ⚠️ THE PRODUCT PIVOTED AND ~10s OF THE VO DESCRIBES THE OLD ONE. Verified
      2026-08-04: rowboatlabs/rowboat now ships an open-source AI COWORKER WITH
      MEMORY — desktop app, local knowledge graph, email client, background
      agents, browser, meeting notes, Code Mode. "Describe your agent in English
      and a copilot builds a tested multi-agent system" is Rowboat as of ~Apr
      2025. Alex's call was BUILD IT AS RECORDED, so S8, S9 and S12 state the VO
      as spoken. They are the shots to pull first if that is ever revisited.

   ✅ EVERYTHING ON SCREEN IS SOURCED. ★16,974 · 1,687 forks · Apache-2.0 · YC
      S24 · MCP for Slack/Linear/Jira/GitHub, all off the repo on 2026-08-04.
      ⛔ NO PRICE ANYWHERE — round 2's "$40,000" named no agency and could not
      be sourced. ⛔ "Two guys" is THREE (Arjun Maheswaran, Ramnique Singh,
      Akhilesh Sudhakar) so NO COUNT appears on screen, and Coinbase bought
      AGARA in 2021, never Rowboat.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* ---------------------------------------------------------------------------
   THE CUT. Every `s` is a MEASURED word onset out of words_rowboat_tight.json,
   re-derived after the silence trim rather than scaled, not an
   estimate — see row.intent.json. Thirteen distinct places across fourteen
   scenes, alternating warm/cool so every cut is a colour change too. `lawn` is
   the one deliberate repeat: the hook buries the agency and S5 comes back to
   the same grave.
   ------------------------------------------------------------------------ */
type Row = { C: React.FC<any>; s: number; label: string };
const SCENES: Row[] = [
  { C: HookWake,  s: 0.00,  label: "HOOK · the funeral. lawn, noon" },
  { C: S1Sold,    s: 4.59,  label: "sold their last company to Coinbase · plaza" },
  { C: S2Give,    s: 6.91,  label: "this one they open sourced · yard" },
  { C: S3Yc,      s: 9.49, label: "YC S24, and it is free · apron" },
  { C: S4Street,  s: 11.60, label: "every AI agency shutters · street" },
  { C: S5Over,    s: 13.57, label: "irrelevant overnight · lawn (callback)" },
  { C: S6Name,    s: 14.82, label: "the tool is called Rowboat · crossroads" },
  { C: S7Say,     s: 16.00, label: "describe it in plain English · dock" },
  { C: S8Build,   s: 18.82, label: "the copilot builds the system · depot" },
  { C: S9Crew,    s: 21.31, label: "agents wired to the real MCPs · build yard" },
  { C: S10Ship,   s: 23.27, label: "tested, ready to deploy · terrace" },
  { C: S11Team,   s: 25.10, label: "an entire AI dev team · kerb" },
  { C: S12Fast,   s: 27.09, label: "orders in English, seconds · road" },
  { C: S13Open,   s: 28.80, label: "Apache-2.0, 16,974 stars · gate" },
  { C: S14Cta,    s: 32.66, label: "comment ROWBOAT · hard cut on the keyword" },
];

const END_S = 34.36;                       // the RETIMED VO's true length
export const ROW_TOTAL = Math.round(END_S * FPS);
/** ⛔ the Panel fades in over 6 frames, so an outgoing scene that ends exactly
    where the next begins leaves ONE BLANK FRAME at every cut. Keep it alive. */
const LEAD = 3;

/* ---------------------------------------------------------------------------
   SOUND. Frame 0 carries the heaviest stack in the reel, a transient lands on
   every cut, and only the PRIMARY action in a scene gets sounded.
   ⛔ `at` is ROOT seconds — scene bodies are not Sequence-wrapped for audio.
   ⛔ `dur` must be >= the file's measured length or the tail is chopped.
   ------------------------------------------------------------------------ */
const A = "am/";
const [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, CTA] =
  SCENES.slice(1).map((x) => x.s);

/** a scored cut: movement 0.12s early, the impact ON the frame, a texture after */
const cut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.0, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];
/** the kit rotates so fourteen cuts are not one sound fourteen times */
const KIT: [string, string, string, number][] = [
  ["whoosh-fast.wav",   "hit-up.wav",   "riser-sharp.wav", 1.00],
  ["whoosh-swoosh.wav", "snap.wav",     "paper-slide.wav", 1.06],
  ["whoosh-choppy.wav", "hit-boom.wav", "riser-metal.wav", 0.94],
];
const sceneCut = (t: number, i: number, k = 0) => cut(t - 0.10, ...KIT[(i + k) % 3]);

/* ---------------------------------------------------------------------------
   FIVE CUTS FOR TRIAL TESTING.

   ⛔ POSTING THE SAME FILE TWICE IS WHAT GETS FLAGGED, so a variant has to be
   genuinely different, not re-encoded. Each one swaps the ENTIRE OPEN for a
   different world — the other four round-3 rituals, which were built as real
   alternatives and gated the same way — plus its own music bed and its own
   rotation of the cut SFX kit. The body is shared, which is the point: the hook
   is the 4.6s a feed actually fingerprints.
   ------------------------------------------------------------------------ */
type Variant = { hook: React.FC; bed: string; kit: number; label: string };
export const VARIANTS: Record<string, Variant> = {
  A: { hook: HookWake,   bed: "boris_bed.wav",   kit: 0, label: "the funeral · picked cut" },
  B: { hook: HookPull,   bed: "ai_bed.wav",      kit: 1, label: "the tug of war" },
  C: { hook: HookKerb,   bed: "auto_bed.wav",    kit: 2, label: "the kerb giveaway" },
  D: { hook: HookDocket, bed: "open_bed.wav",    kit: 1, label: "the job docket" },
  E: { hook: HookPass,   bed: "cancel_bed.wav",  kit: 2, label: "the order window" },
};

const CUES = (KITOFF: number): Cue[] => [
  { at: 0, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: END_S, from: 2, lead: 0 },
  /* ---- THE OPEN. Heaviest stack in the reel, and a transient on each of the
          hook's own three internal cuts (f28 / f60 / f88). ---- */
  { at: 0, src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.6, lead: 0 },
  { at: 0, src: A + "ring-low.wav", v: LEVELS.SFX_HERO, dur: 1.4, lead: 0 },
  { at: 0.03, src: A + "punch.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },
  { at: 0.06, src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 },
  ...layer(0.93, { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 1.0 },
                 { src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 1.2 }),
  ...layer(2.00, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                 { src: A + "gear-mech.wav", v: LEVELS.SFX_HERO, dur: 1.4 }),
  ...layer(2.93, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                 { src: A + "positive-chime.wav", v: LEVELS.SFX_HERO, dur: 1.2 }),
  /* ---- S1 · the crate walks off, the SOLD placard lands ---- */
  ...sceneCut(T1, 0, KITOFF),
  { at: T1 + 0.27, src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },
  ...repeat(4, T1 + 0.20, 0.400, { src: A + "click-hard.wav", v: db(-24), dur: 0.30 }, 0.05),
  /* ---- S2 · it is set DOWN, then the FREE sign ---- */
  ...sceneCut(T2, 1, KITOFF),
  ...layer(T2 + 0.87, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.9 },
                      { src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }),
  { at: T2 + 1.00, src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.7, lead: 0 },
  { at: T2 + 1.87, src: A + "highlighter.wav", v: LEVELS.SFX_MID, dur: 0.8, lead: 0 },
  /* ---- S3 · YC, then the zero ---- */
  ...sceneCut(T3, 2, KITOFF),
  ...layer(T3 + 0.40, { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.55 },
                      { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0 }),
  /* ---- S4 · four shutters, in sequence, each one its own hit ---- */
  ...sceneCut(T4, 0, KITOFF),
  ...repeat(4, T4 + 0.30, 0.300, { src: A + "gear-stutter.wav", v: LEVELS.SFX_MID, dur: 0.45 }, 0.06),
  ...repeat(4, T4 + 0.55, 0.300, { src: A + "hit-boom.wav", v: db(-16), dur: 0.60 }, 0.05),
  /* ---- S5 · the callback. One low ring, nothing else. ---- */
  ...sceneCut(T5, 1, KITOFF),
  { at: T5 + 0.30, src: A + "ring-low.wav", v: LEVELS.SFX_MID, dur: 1.4, lead: 0 },
  /* ---- S6 · the sheet comes off ---- */
  ...sceneCut(T6, 2, KITOFF),
  ...layer(T6 + 0.24, { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.7 },
                      { src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }),
  { at: T6 + 0.92, src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.2, lead: 0 },
  /* ---- S7 · the line being typed, then the chip ---- */
  ...sceneCut(T7, 0, KITOFF),
  ...repeat(14, T7 + 0.30, 0.130, { src: A + "keys-macbook.wav", v: db(-25), dur: 0.22 }, 0.06),
  { at: T7 + 2.52, src: A + "ping.wav", v: LEVELS.SFX_MID, dur: 0.5, lead: 0 },
  /* ---- S8 · the frame going up: four posts, three beams, the deck ---- */
  ...sceneCut(T8, 1, KITOFF),
  ...repeat(4, T8 + 0.12, 0.110, { src: A + "click-hard.wav", v: LEVELS.SFX_MID, dur: 0.30 }, 0.07),
  ...repeat(3, T8 + 0.58, 0.140, { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.05),
  { at: T8 + 1.10, src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.8, lead: 0 },
  /* ---- S9 · four agents landing, each with its own pop ---- */
  ...sceneCut(T9, 2, KITOFF),
  ...repeat(4, T9 + 0.24, 0.170, { src: A + "bubble-pop.wav", v: LEVELS.SFX_MID, dur: 0.40 }, 0.06),
  ...repeat(4, T9 + 0.30, 0.170, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.05),
  /* ---- S10 · TESTED lands, the gate opens ---- */
  ...sceneCut(T10, 0, KITOFF),
  ...layer(T10 + 0.20, { src: A + "snap.wav", v: LEVELS.SFX_HERO, dur: 0.5 },
                       { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }),
  { at: T10 + 0.80, src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.7, lead: 0 },
  { at: T10 + 1.10, src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.8, lead: 0 },
  /* ---- S11 · the team arriving ---- */
  ...sceneCut(T11, 1, KITOFF),
  ...repeat(4, T11 + 0.20, 0.170, { src: A + "bubble-pop.wav", v: db(-18), dur: 0.40 }, 0.06),
  { at: T11 + 1.00, src: A + "crowd-cheer.wav", v: db(-21), dur: 1.2, lead: 0 },
  /* ---- S12 · the order travels, the clock runs ---- */
  ...sceneCut(T12, 2, KITOFF),
  ...layer(T12 + 0.34, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.45 },
                       { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 }),
  ...repeat(10, T12 + 0.40, 0.180, { src: A + "counter-tick.wav", v: db(-26), dur: 0.20 }, 0.04),
  { at: T12 + 1.94, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.0, lead: 0 },
  /* ---- S13 · the count ticking up to its true value ---- */
  ...sceneCut(T13, 0, KITOFF),
  ...repeat(12, T13 + 0.24, 0.095, { src: A + "counter-tick.wav", v: db(-24), dur: 0.20 }, 0.04),
  ...layer(T13 + 1.10, { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.55 },
                       { src: A + "coin-drop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.80 }),
  /* ---- CTA ---- */
  ...sceneCut(CTA, 1, KITOFF),
  ...layer(CTA + 0.20, { src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.60 },
                       { src: A + "bubble-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.40 }),
];

export const makeRowReel = (key: string): React.FC => () => {
  const V = VARIANTS[key] ?? VARIANTS.A;
  const inAt = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("rowboat_vo_tight.wav")} />
      <Audio src={staticFile(V.bed)} volume={LEVELS.MUSIC} />
      <SfxTrack cues={CUES(V.kit)} />
      <AssemblyCtx.Provider value>
        {SCENES.map((sc, i) => (
          <Sequence key={i} from={inAt[i]}
            durationInFrames={(i === SCENES.length - 1 ? ROW_TOTAL : inAt[i + 1] + 7) - inAt[i]}
            layout="none">
            {i === 0 ? <V.hook /> : <sc.C />}
          </Sequence>
        ))}
      </AssemblyCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} />
    </AbsoluteFill>
  );
};

export const ClaudeRowboatReel = makeRowReel("A");
