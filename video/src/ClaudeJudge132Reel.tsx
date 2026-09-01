import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import {
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17,
  CAM, GRADE,
} from "./JdgScenes";
import { CamCtx, R } from "./JdgWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import { HOOKS, PICKED, HookChrome } from "./JdgHooks";
import type { HookId, Variant } from "./JdgHooks";
import words from "./data/words_132judge.json";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE COURTHOUSE.  Board: storyboards/132-judge.md.

   Subject: the "judge loop" — a three-line prompt whose THIRD line assigns three
   adversarial roles (a judge, a prosecutor and a defense) to review the work,
   looping until it holds up.

   ⛔⛔⛔ FLAG TO ALEX AT DELIVERY: THIS VO IS REEL 118 LOOP'S SCRIPT FOR THE
   **THIRD** TIME, after 128 BOSS already re-ran it on 2026-08-29. All nine beats
   match in order. Built deliberately, because two things in this take are
   genuinely new — the **three-role** structure (a prosecutor AND a defense that
   disagree with EACH OTHER; both earlier reels had ONE adversary) and **"lying
   to your face"**, a sharper dread than "blowing people's minds". But it is his
   call, not mine. [[feedback_diff_the_script_against_shipped_reels]]

   ⛔⛔ THE ONE THING THE VO SAYS THAT THE FRAME DOES NOT CLAIM: **"73% more
   accurate."** I cannot source that figure, so no plate, chip, rail or band in
   this reel prints it — `PCT_BANNED` in `JdgWorld.tsx` is the greppable gate.
   S1 pays the line with the PICTURE instead: a ten-segment rail filling, which
   is §4's depiction of a percentage, with no numeral anywhere. The caption
   carries the number as what Alex said. Same treatment 130 gave "over a hundred
   templates" for a library of 52.

   ⭐ ALEX ASKED FOR THE STAGE FOOTAGE BY NAME ("have the recording of the
   creators of Claude Code on stage like the BOSS reel"). S4 uses the same two
   clips 118 and 128 used on this exact line — `boris_wide.mp4` / `boris_tight.mp4`
   — cut WIDE -> TIGHT on the word "Claude", entered as a VIDEO EXHIBIT on an A/V
   cart, which is what a screen IS in this world.

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp: scaling
      the comp moves the chassis and wrecks the motion audit (8.12 at scale 1.0
      vs 3.72 at 1.038 on identical content, measured on reels 83/84).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one ProgressBar, the one
      KaraokeCaption, the VO, the bed and the hook header. Scene bodies see none
      of it — putting `HookHeader` inside `Scene` during this build hid the hero
      in all three hook cuts and no gate could see it.
   ⛔⛔⛔ TILT_BANNED — `cam.rot` is accepted and deliberately NOT applied.
   ========================================================================= */

const FPS = 30;

/** ⛔ DERIVED FROM `words_132judge.json`, NEVER TYPED, and every cut sits at
    `word_onset x 30 - 4` (the house 4-frame picture lead). On reel 122 this list
    was a hand-typed copy and 7 of 19 entries were wrong, one by 1.26s, so a whole
    round went into editing a scene that was not in the frame being complained
    about. Regenerate with `tools/jdg_scenes.sh`. */
export const L = {
  S0: 0, S1: 76, S2: 150, S3: 198, S4: 286, S5: 364, S6: 402, S7: 445,
  S8: 536, S9: 596, S10: 661, S11: 731, S12: 755, S13: 792, S14: 867,
  S15: 895, S16: 950, S17: 1005, END: 1056,
} as const;

export const JUDGE_TOTAL = L.END;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.S16 - L.S15,
  S16: L.S17 - L.S16, S17: L.END - L.S17,
};

const S = (fr: number) => fr / FPS;
const STEP3 = [1, Math.pow(2, 2 / 12), Math.pow(2, 4 / 12)];
const STEP4 = [1, Math.pow(2, 2 / 12), Math.pow(2, 4 / 12), Math.pow(2, 5 / 12)];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ THE BAN LIST FIRST, BEFORE ANY MEASUREMENT.
   · `pneu_thunk.wav` and `crusher.wav` are on a STANDING FOREVER-BAN (Alex,
     reel 116: *"those puff of air sounds do not use those sound effects again
     forever"*). Neither appears here.
   · Nothing whose FILENAME says whoosh / swoosh / puff. A measurement cannot
     out-argue the label on the tin — `am/whoosh-fast` and `lib_whoosh` both
     passed the spectral gates on technicalities and were still the thing that
     got reported four times.
   · ZERO chiptune: the greppable gate is that no `src` starts with `c_`. Reel
     110 passed every audio gate with 24 of 41 cues out of one chiptune pack,
     because the tool measures spectra and has no gate for "this is a Mario
     sound".
   · And three files this repo has already measured and rejected are absent:
     `sorter_tick` (1929 ms attack, 75.9% above 2 kHz — a rising HISS sitting
     exactly where the voice lives), `coin_slide` (303 ms attack, 89.8% above
     2 kHz — noise bed + swell + hiss + air on one cue) and `dead_thud` (91.3%
     ABOVE 2 kHz, i.e. a bright "thud", which is a contradiction).

   ⭐⭐ THE RULE: THE BANK BELONGS TO THE WORLD, and when the world changes the
   bank goes with it. This is a COURTHOUSE — a gavel on a block, brass plates
   landing on wood, a stamp on paper, a page turning, a filing slot, double doors,
   a counter bell, and a low room tone under the chamber. 128's arcade coin drops,
   gong and crowd runs are all gone, because keeping a bank across a world change
   is [[feedback_sfx_bank_belongs_to_the_world]] exactly.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top is
   a SLAP; the same event carried under 250 Hz is a thud you feel. `impact_deep`
   (93.1% low), `sub` (96.6%), `thock` (88.6%), `slate_whump` (44.7%),
   `rebuild_thud` (90.3%) and `mallet_tap` (60.2%) carry every weight beat here.

   ⛔ AND A CUE SHORTER THAN ITS OWN ATTACK IS ABSENT: `dur` must be >= the
   file's measured length or the tail is chopped mid-decay
   ([[feedback_a_cue_shorter_than_its_attack]] — an 850 ms `dur` on a cue that
   attacks in 1727 ms made the payoff beat of one reel silent, and every
   row-counting audit still counted it).
   ---------------------------------------------------------------------- */

/** the hook's own bank, per cut — ⛔ AUDITED PER VARIANT, not over the file. Three
    exclusive per-cut banks in one source produce false repeat counts
    ([[feedback_a_source_audit_overcounts_branches]]). */
const s0Cues = (hook: HookId): Cue[] => {
  /* A · THE OATH (76f). Frame 0 carries the heaviest stack in the reel — it is
     the interrupt. The chain is: the hand slams up (f2), the oath strike lands
     (f7), a leaf peels and drops (f15), two more go (f26/f32), the whole face
     falls (f44) and the board goes over (f58+). */
  if (hook === "oath") return [
    { at: 0.00, src: "stage_hum.wav", v: LEVELS.SFX_BED * db(5), dur: 2.05, rate: 0.84, lead: 0 },
    { at: S(2), src: "thock.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.20, rate: 1.06 },
    { at: S(7), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.90, rate: 0.94 },
    { at: S(15), src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: STEP3[0] * 0.88 },
    { at: S(26), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(1), dur: 0.20, rate: STEP3[1] * 0.88 },
    { at: S(32), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(2), dur: 0.20, rate: STEP3[2] * 0.88 },
    { at: S(44), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.90, rate: 0.82 },
    { at: S(58), src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.85, rate: 0.86 },
  ];
  /* ⭐ B · HOLDING IT UP (76f) — THE PICKED CUT, and the bank follows the CHAIN
     rather than a metronome: he takes the weight (f2), his knees go (f7), the
     FLOOR CRACKS (f15), the stack tilts (f26), the top unit slides (f32) and the
     whole lot comes down (f44). Each link gets the sound of the thing that
     actually happens, and the crack is the only bright cue in it because a
     splitting floor is the one event up there. */
  if (hook === "stack") return [
    { at: 0.00, src: "stage_hum.wav", v: LEVELS.SFX_BED * db(5), dur: 2.05, rate: 0.82, lead: 0 },
    /* he takes it — a low seat, not a tap */
    { at: S(2), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(1), dur: 0.20, rate: 0.80 },
    /* the knees */
    { at: S(7), src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.85, rate: 0.84 },
    /* ⭐ THE FLOOR CRACKING — the countdown, and the one bright transient in the
       shot, because everything else here is weight */
    { at: S(15), src: "bamboo_crack.wav", v: LEVELS.SFX_HERO * db(-6), dur: 0.44, rate: 0.92 },
    /* the tilt, and the slide off the back */
    { at: S(26), src: "mech_clank.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.16, rate: 0.82 },
    { at: S(32), src: "wrench_clank.wav", v: LEVELS.SFX_MID, dur: 0.10, rate: 0.88 },
    /* it comes down on him */
    { at: S(44), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(1), dur: 0.90, rate: 0.80 },
    { at: S(46), src: "sub.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.80, rate: 0.82 },
    { at: S(52), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.20, rate: 1.06 },
  ];

  /* C · THE SEAL (76f) — a coil, a drive and a punch-through. */
  return [
    { at: 0.00, src: "stage_hum.wav", v: LEVELS.SFX_BED * db(5), dur: 2.05, rate: 0.84, lead: 0 },
    { at: S(7), src: "ratchet.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.55, rate: 0.72, lead: 0 },
    { at: S(26), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-4), dur: 0.55, rate: 0.90 },
    { at: S(32), src: "ceramic_crack.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.40, rate: 0.94 },
    { at: S(44), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.90, rate: 0.84 },
  ];
};

const makeSFX = (hook: HookId): Cue[] => [
  ...s0Cues(hook),

  /* S1 · THE REFILL — two leaves seat, ASCENDING, because the work is coming
     back. The rail tick rides the second one; if a big thing and a small thing
     move together the small thing is silent, so there is no third cue. */
  { at: S(L.S1), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(4), dur: 2.05, rate: 0.90, lead: 0 },
  ...[6, 26].map((fr, i) => ({
    at: S(L.S1 + fr), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-i * 0.4),
    dur: 0.20, rate: STEP3[i] * 0.92,
  })),

  /* S2 · THE COUNTER — a page, a stamp, a slot. Three events, three cues. */
  { at: S(L.S2 + 7), src: "ticket_click.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.18, rate: 0.96 },
  { at: S(L.S2 + 14), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-4), dur: 0.55, rate: 0.94 },

  /* S3 · THE DOORS — the chute releases, then three carries ASCENDING. */
  { at: S(L.S3), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(4), dur: 2.05, rate: 1.00, lead: 0 },
  ...[25, 46, 54].map((fr, i) => ({
    at: S(L.S3 + fr), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-1 + i * 0.5),
    dur: 0.20, rate: STEP3[i] * 0.86,
  })),

  /* S4 · THE VIDEO EXHIBIT — the cart rolls in and LANDS, and the room drops.
     ⛔ Deliberately thin: the footage is the event, and stacking cues over a
     talking head is how a reel starts sounding busy. */
  { at: S(L.S4 + 12), src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.85, rate: 0.94 },
  { at: S(L.S4), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(2), dur: 2.05, rate: 0.76, lead: 0 },

  /* S5 · THE REVEAL — one lamp strike and one low under the room filling in. */
  { at: S(L.S5 + 5), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.35, rate: 1.02 },
  { at: S(L.S5 + 13), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-6), dur: 0.90, rate: 0.78 },

  /* S6 · THE INTERVIEW ROOM — ⛔ THE THINNEST BANK IN THE REEL AND THE ONLY
     SCENE WITH NO BED. Four dry slides, no hero cue, silence around them.
     Density is a SHAPE: this is the trough that makes S7's doors land. */
  ...[3, 16, 31].map((fr, i) => ({
    at: S(L.S6 + fr), src: "ticket_click.wav", v: LEVELS.SFX_MID * db(-3 + i * 0.6),
    dur: 0.18, rate: 1.00 + i * 0.09,
  })),

  /* S7 · THE DOORS BANG — the reel's biggest low, then three waves ASCENDING. */
  { at: S(L.S7 + 3), src: "ticket_click.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.18, rate: 0.94 },
  { at: S(L.S7 + 39), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(1), dur: 0.90, rate: 0.80 },
  { at: S(L.S7 + 39), src: "sub.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.80, rate: 0.84 },
  ...[45, 73].map((fr, i) => ({
    at: S(L.S7 + fr), src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-2 + i * 1.2),
    dur: 0.85, rate: STEP3[i * 2] * 0.90,
  })),

  /* S8 · THE DOCKET — a page turn, two key strikes on the words, one stamp. */
  { at: S(L.S8 + 9), src: "ticket_click.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.18, rate: 0.88 },
  ...[40, 46].map((fr, i) => ({
    at: S(L.S8 + fr), src: "thock.wav", v: LEVELS.SFX_MID * db(i * 0.6),
    dur: 0.20, rate: STEP3[i] * 0.94,
  })),
  { at: S(L.S8 + 58), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-4), dur: 0.55, rate: 0.88 },

  /* S9 · THE THREE PLATES — the identity scene, so it gets the reel's cleanest
     three-cue run: brass on wood, ASCENDING, one low under each. */
  { at: S(L.S9), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(5), dur: 2.05, rate: 0.96, lead: 0 },
  ...[16, 26, 46].map((fr, i) => ({
    at: S(L.S9 + fr), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-2 + i * 0.5),
    dur: 0.20, rate: STEP3[i] * 0.80,
  })),

  /* S10 · THE CASE — four card hammers ASCENDING, then the flags. */
  ...[15, 25, 34, 45].map((fr, i) => ({
    at: S(L.S10 + fr), src: "mallet_tap.wav", v: LEVELS.SFX_MID * db(-1 + i * 0.5),
    dur: 0.26, rate: STEP4[i] * 0.88,
  })),
  { at: S(L.S10 + 61), src: "punch_thud.wav", v: LEVELS.SFX_HERO * db(-5), dur: 0.40, rate: 0.86 },

  /* S11 · THE REBUTTAL — ONE big sweep. The shortest scene gets the fewest cues
     and the biggest single one, which is what makes it read as an answer. */
  { at: S(L.S11 + 13), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.90, rate: 1.02 },

  /* S12 · THE GAVEL — the reel's hardest single hit, and three read ticks. */
  { at: S(L.S12 + 14), src: "thock.wav", v: LEVELS.SFX_HERO * db(2), dur: 0.20, rate: 0.74 },
  { at: S(L.S12 + 14), src: "sub.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.80, rate: 0.80 },
  { at: S(L.S12 + 30), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.35, rate: 1.08 },

  /* S13 · THE PEAK — three rebuild runs ASCENDING, then the strike that leaves
     no mark: a hard hit and a long metallic RING-OFF, which is the payoff. */
  { at: S(L.S13), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(7), dur: 2.05, rate: 1.04, lead: 0 },
  ...[9, 23, 43].map((fr, i) => ({
    at: S(L.S13 + fr), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-1 + i * 0.6),
    dur: 0.20, rate: STEP3[i] * 0.90,
  })),
  { at: S(L.S13 + 53), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(2), dur: 0.90, rate: 0.86 },
  { at: S(L.S13 + 53), src: "temper_chime.wav", v: LEVELS.SFX_MID * db(-2), dur: 1.40, rate: 0.96 },

  /* S14 · THE FEES — one sweep and a DESCENDING run, because it is going out. */
  ...[6, 14].map((fr, i) => ({
    at: S(L.S14 + fr), src: "wrench_clank.wav", v: LEVELS.SFX_MID * db(-i * 0.9),
    dur: 0.10, rate: STEP4[3 - i * 2] * 1.04,
  })),

  /* S15 · THE PROTOTYPE — three dry seats, no hero. The modest scene sounds
     modest; that contour IS the point (§9). */
  ...[13, 35].map((fr, i) => ({
    at: S(L.S15 + fr), src: "mallet_tap.wav", v: LEVELS.SFX_MID * db(-2 + i * 0.8),
    dur: 0.26, rate: STEP3[i * 2] * 0.94,
  })),
  { at: S(L.S15 + 47), src: "temper_chime.wav", v: LEVELS.SFX_MID * db(-6), dur: 0.70, rate: 1.06 },

  /* S16 · THE LAUNCH — set down, three plate ticks ASCENDING, and the doors. */
  { at: S(L.S16 + 6), src: "thock.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.20, rate: 0.90 },
  ...[16, 26].map((fr, i) => ({
    at: S(L.S16 + fr), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-2 - i * 0.5),
    dur: 0.35, rate: STEP3[i * 2],
  })),
  /* ⛔⛔ THIS CUE WAS MASKING A WORD, AND ONLY THE DELIVERED MIX SHOWED IT. The
     VO stem transcribes "before your launch"; the full mix came back "before
     your lawn" / "you're long". The cue is on the right beat — the doors opening
     on "launch" — but at HERO level with a 0.90s tail it sat on top of the word.
     ⭐ THIS IS WHY THE DELIVERED MP4 IS RE-TRANSCRIBED AND NOT JUST THE CUT: the
     defect existed in no stem, only in the render — the same shape as reel 128's
     "comment boss for the freak". Dropped 5 dB and moved 4 frames later so the
     hit lands after the word rather than under it. */
  { at: S(L.S16 + 50), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-8), dur: 0.90, rate: 0.96 },

  /* S17 · THE CTA — the keyword stamps LOW and one low resolve under it.
     ⛔ nothing bright at the end. */
  { at: S(L.S17 + 5), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.55, rate: 0.88 },
  { at: S(L.S17 + 10), src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.85, rate: 0.90 },
];

/* ---- THE MIX --------------------------------------------------------------
   ⭐ THE BED IS A REAL TRACK AND IT PLAYS THE OPENING OF THE SONG, cut from the
   master rather than from somebody's earlier excerpt
   ([[feedback_the_bed_drifted_to_the_end_of_the_song]] — 124, 125 and 130 all
   played deep-in-the-song passages, and five rounds of choosing different bed
   FILES never moved it, because every `*_bed.wav` in `public/` IS an excerpt).
   ⭐ AND THE GAIN IS DERIVED FROM THE MEASURED RMS OF THE WINDOW ACTUALLY PLAYED,
   never from the file's integrated LUFS — LUFS is gated and K-weighted, and that
   arithmetic is what made reel 130's bed inaudible while every gate passed
   ([[feedback_a_bed_gain_comes_from_the_window_you_play]]).
   ⛔ Final volume stays inside the standing 0.25 cap (Alex: *"the background
   music is too loud compared to the voiceover"*). */
export const BED: Record<Variant, string> = {
  house: "132judge_bed_house.wav",
  amber: "132judge_bed_amber.wav",
  steel: "132judge_bed_steel.wav",
};
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.6), amber: db(7.6), steel: db(7.6),
};
export const BED_QUIET = db(-6);

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1252, amber: 1330, steel: 1180 };

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("132judge_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={makeSFX(hook)} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} dur={DUR.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><S9 v={v} dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} dur={DUR.S10} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><S11 v={v} dur={DUR.S11} /></Sequence>
            <Sequence from={L.S12} durationInFrames={DUR.S12}><S12 v={v} dur={DUR.S12} /></Sequence>
            <Sequence from={L.S13} durationInFrames={DUR.S13}><S13 v={v} dur={DUR.S13} /></Sequence>
            <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} dur={DUR.S14} /></Sequence>
            <Sequence from={L.S15} durationInFrames={DUR.S15}><S15 v={v} dur={DUR.S15} /></Sequence>
            <Sequence from={L.S16} durationInFrames={DUR.S16}><S16 v={v} dur={DUR.S16} /></Sequence>
            <Sequence from={L.S17} durationInFrames={DUR.S17}><S17 v={v} dur={DUR.S17} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      {/* ⛔ THE HOOK HEADER IS ROOT CHROME AND ONLY RUNS OVER THE HOOK. Inside
          `Scene` it inherits the camera push and covers the middle of the panel. */}
      {f < L.S1 && <HookChrome f={f} />}
      <ProgressBar />
      <KaraokeCaption words={words as any[]} fps={FPS} top={CAP_Y[v]} />
    </AbsoluteFill>
  );
};

export const ClaudeJudge132Reel = makeReel("house");
export const ClaudeJudge132Amber = makeReel("amber");
export const ClaudeJudge132Steel = makeReel("steel");
