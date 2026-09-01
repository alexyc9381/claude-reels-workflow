import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, CAM, GRADE,
} from "./FreeScenes";
import type { Variant } from "./FreeScenes";
import { CamCtx } from "./FreeWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import { HOOKS, HOOK_BANDS } from "./FreeHooks";
import type { HookId } from "./FreeHooks";
import words from "./data/words_free131.json";

/* ===========================================================================
   REEL 131 · "FREE" — THE ASSEMBLY.  Board: storyboards/131-free.md.

   ⛔ FILE NAME: reel 105 is ALSO called FREE and owns `ClaudeFreeReel.tsx`.

   Subject: one free platform that puts every premium AI tool behind one door.

   ⛔⛔ THE VO NEVER NAMES THE PLATFORM AND NEVER STATES A PRICE. The name is
   gated behind "comment FREE for the link", which is the entire CTA, so putting
   a guess on screen would break the gate the script is built on and risk naming
   the wrong product. No currency figure is spoken either, so the fare is always
   a COIN — a physical object with no denomination on it. Both are enforced by
   greppable guards in `FreeWorld` (`PRICE_BANNED`, `NAME_BANNED`,
   `CLAIM_BANNED`).

   What the frame IS allowed to assert is exactly what he says: seven text
   models by name, three image models by name, reasoning engines, five separate
   subscriptions, and that this one is free. `FreeWorld.R` is the whole ledger.

   ⛔ GROK HAS NO MARK. There is none in `public/logos` and none on the Simple
   Icons CDN (checked 2026-08-31: `grok` -> 404, `xai` -> 404), so it ships as a
   stencilled NAME PLATE. A wrong mark is worse than no mark, and `x.svg` is
   the wrong mark.

   ⛔⛔ THE VILLAIN IS `THE TOLL ROW` AND IT LOSES EXACTLY ONCE. It wins the
   hook, it is still collecting from five Claudes at 22s, and it is never
   broken — S11 walks THROUGH the one gate that takes nothing. The same
   turnstile opens and closes the reel; its BEHAVIOUR is the payoff.

   ⭐ LENGTH: 27.60s, inside the playbook's 22-29s house range. The cut removes
   18.46s of two `cut cut` retakes and dead air from a 46.07s raw take.
   ⛔ TEMPO IS x1.00, NOT THE DEFAULT x1.10, AND THAT IS A MEASUREMENT.
   R1 is binding: at x1.10 the worst 5s window ran 4.80 wps against a 4.5 bar
   and the hook window 4.40 against 4.0. Even at x1.00 the worst window was 4.60
   — so instead of slowing his voice (which drags), 0.23s of air went back in at
   the "place. / You get" boundary and 0.22s at the "free. / Want to try"
   boundary, both inside measured silence. Result: overall 3.91 wps (the CLONE
   anchor is 3.96), hook 0-10s 3.90, worst 5s 4.40. All three pass.
   ========================================================================= */

const FPS = 30;
export const FREE_TOTAL = 828;                    /* CUT 27.60s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_free131.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,     /* TOLL   hook · "Stop paying"                    0.00s */
  S1: 60,    /* ALLEY  "I just found one free platform"        2.01s */
  S2: 85,    /* HALL   "that gives you access"                 2.82s */
  S3: 182,   /* BENCH  "You get ChatGPT"                       6.06s */
  S4: 227,   /* RACK   "Perplexity, Kimi and DeepSeek"         7.58s */
  S5: 303,   /* TABS   "No switching tabs"                    10.10s */
  S6: 374,   /* PRESS  "It also has Nano Banana"              12.45s */
  S7: 450,   /* LOFT   "Plus top tier reasoning engines"      14.99s */
  S8: 523,   /* LINE   "So you literally get text"            17.43s */
  S9: 576,   /* MERGE  "everything you're currently paying"   19.20s */
  S10: 662,  /* ROW    "People are paying for 5"              22.08s */
  S11: 700,  /* GATE   "while this one is completely free"    23.33s */
  S12: 762,  /* CTA    "Want to try it for yourself"          25.39s */
  END: FREE_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.END - L.S12,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 and are excluded too.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a toll plaza and the hall
   behind it — a coin into a throat, a ratchet, a turnstile locking, a roller
   shutter, latches seating, tabs clacking shut, three presses, three engines, a
   points lever, a belt and a stamp. **ZERO chiptune cues** — the greppable gate
   is that no `src` starts with `c_`, which returns zero.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top
   is a SLAP; the same event carried under 250 Hz is a thud you feel. `thock`
   (88.6% low), `impact_deep` (93.1%), `sub` (96.6%) and `impact` (42.1%) carry
   the weight here. `clap_slam` is 62% bright and `gold_stamp` 68.8%, so both
   stay strictly under the SLAP gate's 5-use threshold.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the hook), S2 (the
   hall arriving), S6 (three presses) and S9 (the merge, the peak of the reel),
   and thins to two on the short information beats. S1 is 0.83s and one idea, so
   it gets exactly two.
   ⛔⛔⛔ AND I MIS-COUNTED THIS BANK FOR THREE ROUNDS. Rounds 1-3 all reported
   "44 cues · 1.59/sec" — a number produced by grepping `src:` literals, which
   counts a `[a,b,c,d,e].map(...)` run as ONE. Expanding the runs, the bank was
   actually **87 cues = 3.15/sec**: 60% denser than reel 122, which shipped, and
   82% of the way to reel 107's 3.82, which was rejected as *"there's too many
   sfx and some of them are too annoying"*.
   ⭐ THE LESSON IS AUDIT-FIRST §F VERBATIM — *"nobody had ever summed the bank;
   each ladder and layer partner was defensible alone."* Every run here was
   defensible on its own and the total was never measured. **Count the EXPANDED
   array, and compare it against a reel that actually shipped rather than
   against a figure in a doc.**

   Cut to **60 cues = 2.17/sec**, against 122 HARDWARE's measured 1.97. What went
   was density, not events: seven bay strikes are marked by four, five tab ticks
   by three, five lane coins by two, five gate latches by three. ⛔ A run does
   NOT have to be 1:1 with the picture — the house budget is one transient on the
   cut plus one hero plus at most two accents, and an ascending four reads as a
   run where seven identical clunks read as a metronome. */
export const SFX: Cue[] = [
  /* ---- S0 · THE TOLL. The heaviest stack in the reel — frame 0 is the
     interrupt and it gets the biggest cue set. ---------------------------- */
  { at: S(L.S0 + 0),  src: "road_bed_dry.wav", v: LEVELS.SFX_BED,  dur: 2.4, rate: 0.86 },
  { at: S(L.S0 + 0),  src: "sub.wav",          v: LEVELS.SFX_HERO, dur: 1.1, rate: 0.72 },
  /* ⭐ THE LANE SIGNS GET THEIR OWN SOUND (Alex, round 4: *"more elevated sfx
     too"* on the logo beats). Three accents, ascending, on the glints — not
     five, because five would make the row a metronome and the picture already
     staggers them. `pickup_chime` is 2.1% bright with a 14ms attack: it cannot
     slap and it cannot swell, which is what disqualified `shimmer` (72% bright,
     90ms) and `metal_ping` (74%) for this job. */
  ...[6, 16].map((a, i) => ({
    at: S(L.S0 + a), src: "pickup_chime.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.7), dur: 0.34, rate: 0.94 + i * 0.11,
  })),
  /* ⭐ THE COIN IS THE HERO CUE OF THE HOOK: it is the whole idea in one sound.
     ⛔⛔ AND IT WAS `coin_slide.wav`, WHICH IS A HISS. `sfx_audit` measured it
     at 89.8% above 2kHz with a 303ms attack over 1.62s and flagged it
     NOISE-BED + SWELL + HISS + AIR — four gates at once, on the single most
     important cue in the reel. A coin into a throat is LOW and FAST, so it is
     now `can_bong` (17.4% bright, 46% under 250Hz — a coin into a tray) layered
     with `lamp_clunk` for the mechanism swallowing it. */
  ...layer(S(L.S0 + 17),
    { src: "can_bong.wav",   v: LEVELS.SFX_HERO,    dur: 0.4, rate: 1.06 },
    { src: "lamp_clunk.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3, rate: 0.88 }),
  { at: S(L.S0 + 19), src: "ratchet.wav",      v: LEVELS.SFX_MID,  dur: 0.6, rate: 0.96 },
  { at: S(L.S0 + 27), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.84 },
  /* ⛔ ONE STEP DOWN, NEVER UP. The second coin is quieter and lower than the
     first — the hook must not resolve, and a rising repeat reads as progress. */
  { at: S(L.S0 + 52), src: "can_bong.wav",     v: LEVELS.SFX_MID,  dur: 0.4, rate: 0.80 },

  /* ---- S1 · THE BACK LANE. 0.83s, ONE idea, TWO cues. ------------------ */
  { at: S(L.S1 + 2),  src: "gear_shift.wav",   v: LEVELS.SFX_MID,  dur: 0.35, rate: 0.84 },
  { at: S(L.S1 + 15), src: "arrive_chime.wav", v: LEVELS.SFX_MID,  dur: 1.0, rate: 1.06 },

  /* ---- S2 · THE HALL ARRIVING. Seven bays strike one at a time in the
     picture, so they do in the mix too — and it is an ASCENDING run, which is
     what makes a repeated reward read as PROGRESS rather than repetition.
     `lamp_clunk` is 20.3% bright, i.e. well under the SLAP gate's 35% ceiling,
     which is why it can carry a run this long at all — and a lamp striking on
     is what it literally is. */
  { at: S(L.S2 + 0),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,  dur: 0.9, rate: 0.90 },
  ...[6, 22, 38, 54].map((a, i) => ({
    at: S(L.S2 + a), src: "lamp_clunk.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.9), dur: 0.3, rate: 0.84 + i * 0.09,
  })),
  /* three of the seven bays get a tone under the latch, so the run has a shape
     rather than seven identical clunks.
     ⛔ `chimelo` WAS THE OBVIOUS FILE AND `sfx_audit` FLAGGED IT AIR. My own
     attack measurement said 0ms; the gate's said over 40ms with only 1.3% under
     250 Hz, which is its definition of a swell. `ding` failed the same way.
     `temper_chime` (10ms, 7.0% bright) passes — the gate is the arbiter, not
     the hand measurement. */
  ...[6, 54].map((a, i) => ({
    at: S(L.S2 + a), src: "temper_chime.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.6), dur: 0.60, rate: 0.90 + i * 0.12, lead: 2,
  })),
  { at: S(L.S2 + 58), src: "arrive_chime.wav", v: LEVELS.SFX_MID,  dur: 1.0, rate: 1.00 },

  /* ---- S3 · FOUR PLATES SEATING, on their four spoken names. ----------- */
  ...[0, 41].map((a, i) => ({
    at: S(L.S3 + a + 6), src: "mech_clank.wav",
    v: LEVELS.SFX_MID * db(i * 1.0), dur: 0.4, rate: 0.86 + i * 0.16,
  })),

  /* ---- S4 · THE RACK COMPLETING. Three more seat, then the tally lamps
     light in a run and a green bar sweeps the whole rack. ----------------- */
  ...[0, 30].map((a, i) => ({
    at: S(L.S4 + a + 6), src: "mech_clank.wav",
    v: LEVELS.SFX_MID * db(2 + i * 0.5), dur: 0.4, rate: 1.06 + i * 0.06,
  })),
  ...[39, 55].map((a, i) => ({
    at: S(L.S4 + a), src: "can_bong.wav",
    v: LEVELS.SFX_MID * db(i * 0.6), dur: 0.4, rate: 0.90 + i * 0.09,
  })),
  { at: S(L.S4 + 63), src: "green_tone.wav",   v: LEVELS.SFX_MID,  dur: 0.9, rate: 1.10 },

  /* ---- S5 · THE TABS SHUT, THEN HE LETS GO.
     ⛔ `sign_clack` is 49.9% bright and five tab closes plus the S10 tally
     would have made it a six-use SLAP. `data` is 14.6% bright and 0.21s — and a
     browser tab closing is a UI tick, not a signboard. */
  ...[2, 10, 18].map((a, i) => ({
    at: S(L.S5 + a), src: "data.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.4), dur: 0.22, rate: 1.16 - i * 0.05,
  })),
  { at: S(L.S5 + 29), src: "thock.wav",        v: LEVELS.SFX_MID,  dur: 0.5, rate: 0.90 },
  { at: S(L.S5 + 44), src: "chair_knock.wav", v: LEVELS.SFX_MID, dur: 0.3, rate: 0.92 },
  /* ⛔ `can_rattle` was the obvious file for a disc rolling and it is an AIR
     swell (131ms attack, 55.9% bright); a disc settling on stone is a knock, and
     the two knocks above already carry it without a third. */

  /* ---- S6 · THREE PRESSES. ⛔ `clap_slam` is 62% bright, so it is used
     exactly THREE times, and only the first slam carries a sub partner — three
     layered pairs is six cues for one repeated gesture. -------------------- */
  ...[14, 28, 46].map((a, i) => ({
    at: S(L.S6 + a), src: "clap_slam.wav",
    v: LEVELS.SFX_MID * db(i * 0.6), dur: 0.4, rate: 0.90 + i * 0.06,
  })),

  /* ---- S7 · THE ENGINES. One clutch, three spool-ups, one lock.
     ⛔ `harden_chime` was the tier lock and it is an AIR swell (96ms attack).
     A tier LOCKING is a struck tone plus metal, so it is `green_tone` (3ms
     attack, 0.8% bright) under a `metal_ping`. */
  { at: S(L.S7 + 8),  src: "knife_switch.wav", v: LEVELS.SFX_MID,  dur: 0.4, rate: 0.92 },
  ...[14, 34].map((a, i) => ({
    at: S(L.S7 + a), src: "motor_sag.wav",
    v: LEVELS.SFX_MID * db(i * 0.6), dur: 0.9, rate: 0.86 + i * 0.10,
  })),
  { at: S(L.S7 + 46), src: "green_tone.wav",  v: LEVELS.SFX_HERO, dur: 0.7, rate: 1.28 },

  /* ---- S8 · THE BELT. A bed under it, and three landings on three words. */
  { at: S(L.S8 + 0),  src: "road_bed_dry.wav", v: LEVELS.SFX_BED * db(3), dur: 1.9, rate: 1.12 },
  ...[21, 43].map((a, i) => ({
    at: S(L.S8 + a), src: "thock.wav",
    v: LEVELS.SFX_MID * db(i * 0.5), dur: 0.16, rate: 0.84 + i * 0.10,
  })),

  /* ---- S9 · THE MERGE. THE DENSITY PEAK OF THE REEL.
     ⭐ The five lane coins are the SAME sound five times and they are the thing
     being taken away, so they are flat in level and DESCENDING in pitch; the
     merge answers with a rising pair. The sound carries the same fact the
     picture does. `pop` is 0.6% bright and 0.13s — it cannot hiss and it cannot
     slap. ----------------------------------------------------------------- */
  ...[8, 20].map((a, i) => ({
    at: S(L.S9 + a), src: "pop.wav",
    v: LEVELS.SFX_MID, dur: 0.13, rate: 1.04 - i * 0.05,
  })),
  { at: S(L.S9 + 37), src: "knife_switch.wav", v: LEVELS.SFX_MID,  dur: 0.4, rate: 0.82 },
  { at: S(L.S9 + 40), src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.09, rate: 0.78 },
  ...layer(S(L.S9 + 52),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.90 },
    { src: "sub.wav",          v: LEVELS.SFX_TEXTURE, dur: 0.42, rate: 0.80 }),
  { at: S(L.S9 + 62), src: "green_tone.wav",   v: LEVELS.SFX_MID,  dur: 0.7, rate: 1.22 },
  { at: S(L.S9 + 70), src: "arrive_chime.wav", v: LEVELS.SFX_HERO, dur: 1.1, rate: 1.08 },

  /* ---- S10 · FIVE OF HIM, FIVE FARES. The villain still winning: the run
     ASCENDS, because it is still working.
     ⛔ `ratchet` is 67.3% bright and five arms plus the hook's one would have
     been a six-use SLAP. `chair_knock` is 10.8% bright with 70% under 250Hz —
     an arm locking is a knock you feel, not a rasp. -------------------------- */
  ...[4, 14, 24].map((a, i) => ({
    at: S(L.S10 + a), src: "chair_knock.wav",
    v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.3, rate: 0.86 + i * 0.10,
  })),
  { at: S(L.S10 + 27), src: "sign_clack.wav",  v: LEVELS.SFX_MID,  dur: 0.22, rate: 0.94 },

  /* ---- S11 · THE GATE THAT TAKES NOTHING. ⛔ NO COIN SOUND ANYWHERE IN THIS
     SCENE — the absence is the point, and the mix has to keep it. --------- */
  { at: S(L.S11 + 18), src: "gear_shift.wav",  v: LEVELS.SFX_MID,  dur: 0.09, rate: 0.74 },
  { at: S(L.S11 + 30), src: "arrive_chime.wav", v: LEVELS.SFX_HERO, dur: 1.1, rate: 1.12 },

  /* ---- S12 · THE CTA. Four letters, four stamps, one step up each, then the
     mark. ⛔ `gold_stamp` is 68.8% bright and is used exactly FOUR times.
     ⛔ `office_chatter` was the CTA bed and it measures -42 dB RMS across its
     whole 56s: at `SFX_BED` it would have played at about -66 dB in the mix,
     i.e. a cue that is in the file and not in the video. The street tone under
     the front step is `road_bed_dry`, which is -17 dB and actually audible. -- */
  ...[38, 41, 44, 47].map((a, i) => ({
    at: S(L.S12 + a), src: "gold_stamp.wav",
    v: LEVELS.SFX_MID * db(i * 0.5), dur: 0.45, rate: 0.90 + i * 0.07,
  })),
  { at: S(L.S12 + 51), src: "arrive_chime.wav", v: LEVELS.SFX_HERO, dur: 1.1, rate: 1.04 },
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad. `ados` =
   "Another Day Of Sun" (13 uses across the repo), `ebm` = "Every Living
   Breathing Moment" (8). Reels 107-114 drifted onto generated beds one clone at
   a time and every audio gate stayed green, because a pad passes all of them.

   ⭐⭐⭐ ROUND 2, "WHERE IS THE BG MUSIC" — AND THE FIRST MEASUREMENT WAS WRONG.
   Sampling reel 122's audio in THIS reel's VO gaps said mine was 6.2 dB quieter
   than the shipped reel. It is the classic wrong-signal error: 122 has a
   different VO, so those windows contained its SPEECH. Measured properly — each
   reel in ITS OWN quiet windows — v1 was already 1.8 dB LOUDER full-band than
   122 and level with it above 250 Hz. Nothing was missing.

   ⭐ WHAT WAS ACTUALLY WRONG IS WHERE THE ENERGY SAT. `feedback_house_bed_is_a_real_track`
   says the house bed is BASS-FORWARD, and I over-applied it: v1 cut from
   `ados_bed_loud` (90% under 250 Hz) with no correction at all, landing at 78.3%
   under 250 Hz and losing **9.2 dB the moment it is played through a speaker
   that cannot reproduce bass**, against 122's 4.8 dB. There was music in the
   file and almost none of it in the band a phone can play. The memory's point is
   that a bed which keeps its MIDRANGE fights the voice — not that it should have
   no midrange at all.

   ⛔ SO THE FIX IS SPECTRUM, NOT VOLUME — the gain is nearly capped anyway.
   Per bed: -4 dB shelf at 110 Hz, +4 at 700 Hz, +5 at 1.8 kHz, then a 5.2 kHz
   low pass and a -5 dB shelf at 4 kHz. The low pass is not optional: v1 of this
   correction lifted everything above 1.6 kHz and took the >5 kHz content to
   -18.5 dB against 122's -44.9, which is precisely where reel 115's "puff of
   air" lived for three rounds. Measured after the chain:

     house  full -20.1  >250Hz -25.9  under-250 63.8%  >5kHz -28.3  onset 0.010s
     amber  full -19.7  >250Hz -23.5  under-250 61.2%               onset 0.020s
     steel  full -19.6  >250Hz -22.8  under-250 57.1%  >5kHz -25.4  onset 0.005s
     122hw  full -22.5  >250Hz -27.3  under-250 70.2%  >5kHz -44.9   (the reference)

   ⛔ THE THREE ARE DIFFERENT PASSAGES, not one file at three volumes — an
   audio-only variant is a pixel duplicate. `house` is ados from 0.0s, `steel`
   is ados from 21.8s (a different section of the same song), `amber` is ebm.
   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. Measured after the chain: 10ms / 20ms / 5ms. */
const BED: Record<Variant, string> = {
  house: "131free_bed.wav",
  amber: "131free_bed_amber.wav",
  steel: "131free_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1268, amber: 1344, steel: 1196 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files. ⛔ AND THE STANDING CAP IS volume 0.25 (Alex: *"the background
   music is too loud compared to the voiceover"*), so the gain has almost no
   room in it and is NOT the lever — db(7.90) x LEVELS.MUSIC = 0.2483, which is
   inside the cap by 0.0017. The audible change between round 1 and round 2 is
   the +3.1 dB above 250 Hz, not the +0.5 dB of level. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.90),   /* -> volume 0.2483, against the 0.25 cap */
  amber: db(7.70),
  steel: db(7.90),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** ⛔ THE PICKED HOOK. `toll` IS S0 itself, so the candidate that was chosen and
    the scene that ships are the same code and cannot drift apart. */
export const PICKED: HookId = "toll";

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("131_free_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={SFX} />

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
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction.
   ⛔ AND A HEADER STATES THE CLAIM IN PRODUCT NOUNS, not the theme — nothing
   below says "the toll row" or "the fare hall".
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "5 AI SUBSCRIPTIONS",    hot: "ONE FREE PLATFORM" },
  { from: L.S2,  big: "EVERY PREMIUM AI TOOL", hot: "IN ONE PLACE" },
  { from: L.S5,  big: "NO TAB SWITCHING",      hot: "NO 5 SUBSCRIPTIONS" },
  { from: L.S6,  big: "IMAGE MODELS TOO",      hot: "PLUS REASONING" },
  { from: L.S9,  big: "TEXT, IMAGES, REASONING", hot: "ALL IN ONE PLACE" },
  { from: L.S11, big: "THEY PAY FOR 5",        hot: "THIS ONE IS FREE" },
  { from: L.S12, big: "COMMENT FREE",          hot: "FOR THE LINK" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  /* ⭐⭐ THE HEADER IS ON FROM FRAME 0 (Alex, round 3: *"where is the header in the
     hook scene?"*). Round 1 turned it off there, copying reel 122's round-20 note
     — but that note was about a hook with THREE text blocks competing on frame 0,
     and it cut against the one MEASURED IG-performance rule in the repo (reel 94's
     two cuts that performed both opened with a claim plate; the four that did not
     had none). The hook now carries no plate of its own, so the header is the
     claim, and it is the only text in the frame. */
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* ⛔ FRAME 0 MAY NOT BE MID-ROLL. `SectionHeader` animates in from its own f=0,
     so feeding it f=0 on the reel's frame 0 renders the header at scale 0 — it
     WAS on, and it was invisible on the one frame guaranteed to be seen. Every
     animated element that exists at frame 0 needs its start pushed back far
     enough to be FINISHED, not merely started. */
  return <HookHeader big={b.big} hot={b.hot} f={f - b.from + 12} />;
};

export const ClaudeFree131Reel = makeReel("house");
export const ClaudeFree131ReelAmber = makeReel("amber");
export const ClaudeFree131ReelSteel = makeReel("steel");

/* =========================================================================
   ⛔ THE HOOK EXPERIMENT — each candidate as a standalone 60-frame cut, on the
   real chassis with the real VO, bed, captions and progress rail, so the pick
   is made on the thing a viewer would actually be served rather than on a
   description. Its own header band rides each one, because the header IS half
   of what is being chosen.
   ====================================================================== */
export const HookCut = (id: HookId): React.FC => () => {
  const f = useCurrentFrame();
  const Cut = HOOKS[id];
  const b = HOOK_BANDS[id];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("131_free_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={SFX.filter(c => c.at < 100 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <Sequence from={0} durationInFrames={100}><Cut v="house" dur={60} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.house} />
      <HookHeader big={b.big} hot={b.hot} f={f + 12} />
    </AbsoluteFill>
  );
};
