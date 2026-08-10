import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { makeFlipHook, OpenMode, StageKey } from "./CancelHooks4";
import { CancelCut, CKind } from "./CancelTransitions";
import {
  S1Trial, S2Montage, S3Jan, S4AppFlowy, S5Presenton, S6OpenPencil,
  S7Files, S8Leave, S9Everyone, S10Cta,
} from "./CancelScenes";
import words from "./data/words_cancel.json";

/* ============================================================================
   REEL 86 · "CANCEL" — five apps you pay for, and the free versions with
   176,656 GitHub stars between them.

   VO: public/cancel_vo_final.wav — 26.41s (raw take 34.18s). One `cut cut` flub
   removed, every boundary inside a MEASURED -40dB window with a 110ms margin,
   never whisper's word ends (those run 150-200ms early).
   ⛔ It ships at 1.0x. R1's hook window measures 4.30 wps against a 4.0 bar and
   the worst 5s is 5.40 against 4.5, with NO speedup applied at all — the
   delivery is fast, the edit is not. x1.10 would make it 5.00 / 6.00. Reel 85
   shipped at 4.41 wps overall against this reel's 4.13.

   Captions: src/data/words_cancel.json — 109 words, 37 lines, 37/37 anchored to
   a measured onset, built by tools/build_captions.py.

   ✅ EVERY NUMBER VERIFIED against the GitHub API on 2026-07-31:
   AppFlowy 74,690 · OpenMontage 44,388 · Jan 43,792 · Presenton 9,268 ·
   OpenPencil 4,518 = 176,656, so the VO's "over 175,000" is accurate.

   ⛔ THE FREE SIDE HAS NO LOGOS AND MUST NOT INVENT ANY. None of the five are
   on simple-icons; of the five GitHub owner avatars one is a generic
   waving-hand emoji and one is a personal SELFIE of the repo owner. The free
   side is a REPO CARD throughout — GitHub mark, owner/repo, verified stars.

   The hook went through four sets before this one:
     1 genre worlds     "more hierarchical, related to the topic, simpler"
     2 ranking diagrams "not interesting or creative enough concepts"
     3 rituals that rank "obvious and hierarchical that it's talking about what
                          we're speaking" — a boxing ring does not say that
     4 THE FLIP         the five real marks ARE the set, ranked, flipping to
                        FREE under the total. Approved.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* Scene starts are MEASURED word onsets from words_cancel.json, not estimates. */
const SCENES: { C: React.FC; s: number; label: string }[] = [
  { C: makeFlipHook("paid"), s: 0.00,  label: "the flip · five marks, ranked, $/mo -> FREE" },
  { C: S1Trial,       s: 4.84,  label: "not a free trial · the whole thing" },
  { C: S2Montage,     s: 7.93,  label: "OpenMontage <- HiggsField · describe it, it cuts it" },
  { C: S3Jan,         s: 11.81, label: "Jan <- ChatGPT Plus · runs offline" },
  { C: S4AppFlowy,    s: 14.33, label: "AppFlowy <- Notion" },
  { C: S5Presenton,   s: 15.64, label: "Presenton <- Canva" },
  { C: S6OpenPencil,  s: 16.56, label: "OpenPencil <- Figma" },
  { C: S7Files,       s: 18.47, label: "your files stay yours · their cloud vs your disk" },
  { C: S8Leave,       s: 21.07, label: "leave whenever · the open door" },
  { C: S9Everyone,    s: 22.79, label: "everyone else is still paying" },
  { C: S10Cta,        s: 24.68, label: "comment CANCEL" },
];
const END_S = 26.41;                       // last word ends 25.96
export const CANCEL_TOTAL = Math.round(END_S * FPS);

const LEAD = 3;                            // incoming scene alive under the cut
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

/* ============================================================================
   SOUND. Every cue is written RELATIVE to its scene start, so a re-time is one
   table edit. Shaped by docs/THE-OPEN.md + docs/SOUND-DESIGN.md: frame 0 gets
   the heaviest stack in the reel, a transient lands on every cut, and only the
   PRIMARY action in a scene is sounded.
   ========================================================================== */
const A = "am/";
const [S1, S2, S3, S4, S5, S6, S7, S8, S9, CTA] = SCENES.slice(1).map((x) => x.s);

/** a scored cut: movement 0.12s early, the impact ON the frame, a texture after */
const cut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.0, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];
/** the kit rotates so ten cuts are not one sound ten times */
const KIT: [string, string, string, number][] = [
  ["whoosh-fast.wav",   "hit-up.wav",   "riser-sharp.wav", 1.00],
  ["whoosh-swoosh.wav", "snap.wav",     "paper-slide.wav", 1.06],
  ["whoosh-choppy.wav", "hit-boom.wav", "riser-metal.wav", 0.94],
];
const sceneCut = (t: number, i: number) => cut(t - 0.10, ...KIT[i % 3]);

const CUES: Cue[] = [
  /* ---- room tone under the whole reel ---- */
  { at: 0, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: END_S, from: 2, lead: 0 },

  /* ---- S0 · THE FLIP. Frame 0 is the heaviest stack in the reel. ---- */
  { at: 0.00, src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0.00, src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.80, lead: 0 },
  { at: 0.00, src: A + "page-turn.wav", v: LEVELS.SFX_TEXTURE, dur: 0.50, lead: 0 },
  ...layer(0.40,
    { src: A + "punch.wav", v: LEVELS.SFX_HERO, dur: 0.20 },
    { src: A + "cash-register.wav", v: LEVELS.SFX_TEXTURE, dur: 1.15 }),
  /* the five tags flipping, pitch-walked so it is a run and not a buzz */
  ...repeat(5, 0.44, 0.133, { src: A + "page-turn.wav", v: LEVELS.SFX_MID, dur: 0.50 }, 0.06),
  ...repeat(5, 0.50, 0.133, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.07),

  /* ---- S1 · not a free trial ---- */
  ...sceneCut(S1, 0),
  { at: S1 + 0.28, src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.25 },      // the trial, struck
  ...repeat(8, S1 + 0.52, 0.10, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.05),

  /* ---- S2 · OpenMontage ---- */
  ...sceneCut(S2, 1),
  ...layer(S2 + 0.46, { src: A + "keys-macbook.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                      { src: A + "click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }),
  ...repeat(7, S2 + 1.48, 0.133, { src: A + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.42 }, 0.06),
  { at: S2 + 2.60, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.0 },

  /* ---- S3 · Jan, offline ---- */
  ...sceneCut(S3, 2),
  ...repeat(3, S3 + 0.66, 0.20, { src: A + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.08),
  { at: S3 + 0.90, src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.25 },      // the wifi, cut

  /* ---- S4 / S5 / S6 · the rapid-fire three ---- */
  ...sceneCut(S4, 0),
  { at: S4 + 0.30, src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...sceneCut(S5, 1),
  { at: S5 + 0.28, src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.07 },
  ...sceneCut(S6, 2),
  { at: S6 + 0.30, src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.14 },

  /* ---- S7 · your files stay yours ---- */
  ...sceneCut(S7, 0),
  ...repeat(6, S7 + 0.46, 0.14, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.62 }, 0.05),

  /* ---- S8 · the open door ---- */
  ...sceneCut(S8, 1),
  ...layer(S8 + 0.34, { src: A + "gear-mech.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.9 },
                      { src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }),

  /* ---- S9 · everyone else, still paying ---- */
  ...sceneCut(S9, 2),
  ...repeat(5, S9 + 0.28, 0.17, { src: A + "cash-register.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }, 0.05),

  /* ---- CTA · the keyword lands ---- */
  ...cut(CTA - 0.10, "riser-metal.wav", "hit-boom.wav", "positive-chime.wav", 1.0),
  ...repeat(5, CTA + 0.56, 0.133, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.06),
  { at: CTA + 0.62, src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.6 },
];

/* ============================================================================
   THE TRIAL VARIANTS. One row per cut.

   ⛔ IG suppresses near-duplicate uploads, so a variant is not a recolour: it
   has to differ on the axes the platform can see (memory
   `feedback_trial_reel_variants`). Five change per row — the OPENING IMAGE,
   the bed, the transition kit, the in-panel camera offset and the caption
   band. Beats 2-4 are shared, so the hook carries the delta and the luma
   difference between cuts is MEASURED before delivery, never assumed.
   ========================================================================== */
export type Variant = {
  id: string; open: OpenMode; stage: StageKey; asc: boolean;
  bed: string; cuts: CKind[]; capTop: number; note: string;
};
export const VARIANTS: Variant[] = [
  /* ⛔ the first cut of this table varied only the tag colour and measured a
     2.7-3.2 frame delta — a near-duplicate. The STAGE is ~60% of the panel, so
     that is where a variant has to differ to be seen, and the staircase
     direction moves every tile and every logo with it. */
  { id: "A", open: "paid", stage: "warm",  asc: false, bed: "cancel_bed.wav",   capTop: 1268,
    cuts: ["flash", "wipe", "dip", "cards", "flash", "wipe", "dip", "cards", "flash", "wipe"],
    note: "THE CHARGE FIRST — neutral stage, staircase descending, $/mo -> FREE" },
  { id: "B", open: "free", stage: "cool",  asc: true,  bed: "cancel_bed_b.wav", capTop: 1232,
    cuts: ["cards", "dip", "flash", "wipe", "cards", "dip", "flash", "wipe", "cards", "dip"],
    note: "ALREADY FREE — cool stage, staircase ASCENDING, the charge slams back on" },
  { id: "C", open: "one",  stage: "amber", asc: false, bed: "cancel_bed_c.wav", capTop: 1302,
    cuts: ["wipe", "cards", "flash", "dip", "wipe", "cards", "flash", "dip", "wipe", "cards"],
    note: "ONE TILE — amber stage, a single subscription alone before the row" },
];

export const makeReel = (V: Variant): React.FC => () => {
  const f = useCurrentFrame();
  /* the bed ducks under the VO and rides out at the end */
  const music =
    f < 12 ? db(-13)
    : f > CANCEL_TOTAL - 18 ? db(-12) * Math.max(0, (CANCEL_TOTAL - f) / 18)
    : db(-12);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("cancel_vo_final.wav")} />
      <Audio src={staticFile(V.bed)} volume={music} />
      <SfxTrack cues={CUES} />

      <Bg />

      {/* ⛔ NO whole-frame camera transform: scaling the composition also scales
          the cream chassis and moves the Panel off its fixed position, and it
          measurably degrades the motion audit. */}
      <AbsoluteFill>
        <AssemblyCtx.Provider value={true}>
          {SCENES.map((sc, i) => {
            const from = IN[i];
            const to = i < SCENES.length - 1 ? IN[i + 1] : CANCEL_TOTAL;
            const C = i === 0 ? makeFlipHook(V.open, V.stage, V.asc) : sc.C;
            return (
              <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
                <AbsoluteFill><C /></AbsoluteFill>
              </Sequence>
            );
          })}
        </AssemblyCtx.Provider>

        {/* one transition per cut, ordered differently in every variant */}
        {SCENES.slice(1).map((sc, i) => (
          <CancelCut key={"c" + i} at={IN[i + 1]} kind={V.cuts[i % V.cuts.length]} />
        ))}
      </AbsoluteFill>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={V.capTop} />
    </AbsoluteFill>
  );
};

export const CancelReel  = makeReel(VARIANTS[0]);
export const CancelReelB = makeReel(VARIANTS[1]);
export const CancelReelC = makeReel(VARIANTS[2]);
