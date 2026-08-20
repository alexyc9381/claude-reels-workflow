import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14,
} from "./RigScenes";
import type { Variant } from "./RigScenes";
import { CAM, GRADE } from "./RigScenes";
import { CamCtx, KEYWORD, R } from "./RigWorld";
import { SfxTrack, LEVELS, db, layer, repeat, Cue } from "./SoundKit";
import words from "./data/words_smart.json";

/* ===========================================================================
   REEL 114 · "SMART" — THE ASSEMBLY.  Board: storyboards/114-smart.md.

   Subject: your Claude setup — every line of CLAUDE.md, every skill, every
   memory file — was written for models that needed hand-holding. On Claude
   Opus 5 it is the thing making the model slow, disobedient and wrong.
   Anthropic deleted >80% of Claude Code's own system prompt for exactly that
   reason. The fix is an audit that KEEPS what earns its place and cuts the rest.

   THE WORLD: THE BRACE BAY. A colossal Claude has a support rig dropped over
   him and clamped shut. Villain: THE RIG — it only ever tightens, it crops the
   frame in every scene as the house Occluder, and it is not beaten until S12,
   where it is not argued with but CUT.

   VO: public/vo_smart.wav — 46.42s, 190 words, cut from a 66.87s raw take.
   ONE `cut cut` flub take removed (the whole first hook attempt, raw 1.14-7.96s),
   the lead and tail trimmed to measured speech, ten pauses tightened to
   0.22-0.30s, loudnormed to -16 LUFS. The cut file was re-transcribed and 0
   flubs survived.

   ⛔⛔⛔ THE LEAD TRIM. The raw take opens with a FLUBBED take of the hook that
      ends in "cut cut" at raw 7.96s, and `small.en` did not transcribe those two
      words at all — it rendered the flub as a clean sentence, which would have
      shipped a duplicated hook. `medium.en` caught it. ⭐ THE RULE: when a take
      contains near-repeats, re-transcribe at a LARGER model before splicing —
      a flub marker the tokeniser drops is invisible to every downstream gate.
      The kept take starts at raw 8.75s and its consonant attack at 8.72s, found
      with a 10ms RMS scan, not with `silencedetect`.

   ⛔⛔ NO SPEEDUP, AND THAT IS THE RULE RATHER THAN AN OVERSIGHT. Measured at
      every candidate tempo against R1 (hook 0-10s <= 4.0 wps, ANY 5s window
      <= 4.5 wps):

        x1.00  46.42s  overall 4.16  hook 3.60  worst5s 6.20 @33.2s
        x1.04  44.64s  overall 4.32  hook 3.60  worst5s 6.20 @31.9s
        x1.07  43.38s  overall 4.45  hook 3.80  worst5s 6.20 @31.0s
        x1.10  42.20s  overall 4.57  hook 4.00  worst5s 6.40 @30.1s

      The hook passes at every tempo; the worst window ("don't just go deleting
      everything / let me show you how I did it") fails at every tempo including
      1.00x, because that is how it was recorded. x1.00 is the best available
      answer and every speedup makes the failing window worse. FLAGGED.

   ⭐ 46.43s is outside the stated 22-29s house range. It is ONE continuous
      argument in eleven sentences, not a listicle: there are no items to drop,
      and cutting any sentence breaks the chain from symptom to cause to fix.
      FLAGGED, not silently trimmed.

   ⛔⛔ THE HONESTY LEDGER LIVES IN RigWorld.tsx (`R`, `SPEED_BANNED`,
      `BENCH_BANNED`). The two that matter:
      1 the VO's payoff says Claude is "running so much faster with no
        hallucinations". That is Alex's own setup and it has NO source, so no
        multiplier, no percentage, no "0 HALLUCINATIONS" plate and no speed
        meter appears anywhere. S13 draws the MECHANISM — the belt that stalled
        in S1 runs, and the REJECT BIN that filled in S1 stays EMPTY.
        Gate:  grep -oiE 'x faster|no hallucinations' src/Rig*.tsx | wc -l  ->  0
      2 "the smartest models ever" is a marketing superlative, so there is no
        benchmark, no score and no chart in the reel.
      The ONE percentage on screen is Anthropic's own 80%, and it is drawn as
      EIGHT OF TEN SLOTS going dark rather than as a numeral on a card.

   ⛔⛔ THE HEADER IS ON FOR ALL 1393 FRAMES, rendered HERE at root, outside every
      Sequence — never per-scene, never dropped after the hook. It is fed `f + 12`
      on the hook so it is SETTLED on frame 0 (SectionHeader fades in over 10
      frames). It also CHANGES per section: reel 107 taught that the header must
      never disappear, and reel 108 taught that that is not the same instruction
      as saying the same thing for the whole reel.
      ⭐ It is also where every CATEGORY WORD lives. Reel 109 was rejected at v8
      with 33 `<span>`s in the animation layer; the picture here carries only
      MARKS and NUMERALS.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1393 frames = 46.43s, carrying the VO's 46.42s tail. */
export const SMT_TOTAL = 1393;

/* ⛔ MEASURED WORD ONSETS from src/data/words_smart.json, converted to frames
   with `round(onset * 30)`. Nothing here is estimated — every value is the
   caption track's own sentence start, which is what the viewer reads. */
export const L = {
  S0: 0,      /* "The new Claude models are the smartest models ever,"     */
  S1: 136,    /* "And you've definitely noticed it."                       */
  S2: 305,    /* "But here's what surprised me,"                           */
  S3: 434,    /* "Every line in your CLAUDE.md file"                       */
  S4: 570,    /* "Now with Claude Opus 5,"                                 */
  S5: 698,    /* "That's why Anthropic's team deleted over 80%"            */
  S6: 790,    /* "calling them over-constraining"                          */
  S7: 834,    /* "because they realized that their own rules were..."      */
  S8: 929,    /* "Now don't just go deleting everything,"                  */
  S9: 986,    /* "let me show you how I did it."                           */
  S10: 1027,  /* "You just need to open Claude and paste in this prompt."  */
  S11: 1088,  /* "Now Claude will run an audit and clean up any"           */
  S12: 1135,  /* "rules, skills, and memory that doesn't make sense..."    */
  S13: 1216,  /* "I actually ran this on my setup and Claude is running"   */
  S14: 1340,  /* "Comment SMART for the free guide."                       */
  END: SMT_TOTAL,
} as const;

export const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.END - L.S14,
} as const;

/* =========================================================================
   THE SFX BANK.  Built AFTER `tools/sfx_audit.py` — see the factory log.
   ⛔⛔ RUN THE AUDIT BEFORE BUILDING THE BANK, NOT AFTER (reel 109: 14 of 44
      cues failed on measurement while sounding right by name).
   ⛔⛔ THE BANK BELONGS TO THE ROOM ([[feedback_sfx_bank_belongs_to_the_world]]).
      This room is a MACHINE BAY: ratchets, pneumatics, chain, torch, clang.
      The chiptune `c_*` pack is banned here on sight — a clean audit is not a
      good bank.
   ⭐ DENSITY IS A CONTOUR, NOT A LEVEL (§9): 1-3 cues in most scenes and a stack
      on the two that carry the story (the bite at 3.8s, the seize at 30.2s).
   ====================================================================== */
/** ⭐ THE PALETTE, AUDITED FIRST. `tools/sfx_audit.py` was run over 60 candidates
    BEFORE a single cue was placed and flagged **24 of them** — including six that
    the storyboard had already named by ear: `chain_clank`, `screech`,
    `scanner_sweep`, `slot_lever`, `wire_travel` and `harden_chime` are all AIR
    swells, and `fire_bed`, `am/lights-on`, `am/coin-drop`, `am/check-pop` and
    `am/positive-chime` are hiss beds. Reel 109's rule, paid for again: run the
    audit BEFORE building the bank, not after.

    What survived is a MACHINE BAY and nothing else — no chiptune, no UI blips:
      LOW MOVEMENT  impact_deep 93% low · boom 95% · sub 97% · rebuild_thud 90%
                    thock 89% · adv_strike 89% · chair_knock 70% · lamp_clunk 56%
                    can_bong 46% · slate_whump 45% · impact 42% · mech_clank 42%
                    chair_knock 70% · slate_whump 45% · thock 89%
    ⛔⛔ AND NOTHING PNEUMATIC. Alex: *"at around 6.8 seconds there's a puff of
    air sound effect."* That was `pneu_thunk` — it clears every gate in
    `sfx_audit` (17ms attack, 40% under 250Hz) and a PNEUMATIC cylinder is
    literally a burst of compressed air, so by ear it is exactly the thing that
    has now been reported three times. All four uses are gone.
    ⭐ THE LESSON, GENERALISED: the NAMED-AIR gate bans whoosh/swoosh/puff by
    filename. It cannot ban a sound whose name describes the MACHINE rather than
    the noise — pneumatic, air-ram, blowoff, vent. Read what the object actually
    does, not just what the file is called.
      TEXTURE       ratchet · metal_ping · wrench_clank · ceramic_crack
                    bamboo_crack · chrome_shine · gold_stamp · gear_shift
                    stamp_press · scan_beep · green_tone · temper_chime · twang
      TONAL         gong · bell_ring · cello_note · temper_chime · green_tone
    ⛔⛔ AND NOTHING WITH A SLOW NOISY ATTACK. Alex: *"why are the sfx just like
    motorcycle revs"* — six engine-family cues (rev_up, engine_rev, engine_idle,
    deep_engine) all added in the round before, plus `crusher` and `machine_bed`,
    which pass the AIR gate on a technicality and are the same thing by ear: a
    noise source with a long attack. Every one is gone. A machine bay is made of
    IMPACTS and TONES; the engine is what the bay's own bed is for, and the bed
    is music.

    ⛔ THE SLAP GATE: a cue used 5+ times must be under 35% above 2kHz. That rules
    out `metal_ping` (89%) and `knife_switch` (52%) for the repeated cut runs,
    which is why the eight slot cuts and the brace cuts are carried by
    `lamp_clunk` (20%) and `mech_clank` (30%) instead. */
const SFX_RAW: Cue[] = [
  /* ═══ THE BAY'S OWN VOICE — a continuous machine bed, so the room is never
     silent between cues. v1 had no ambience at all, which is a large part of why
     the bank read as "a series of clanks" rather than as a place. ═══ */

  /* ═══ S0 · THE HOOK ═══════════════════════════════════════════════════════
     ⭐ THE WINCH NOTCHES RISE IN PITCH. `repeat()` walks the rate across the run,
     so five pay-outs of the same ratchet climb instead of repeating — the sound
     of a drum letting a load down, and the reason the descent has a direction
     you can hear. This is the single biggest change from v1, which fired one
     flat `mech_clank` per event and had nothing moving in pitch anywhere. */
  ...repeat(3, 0.66, 0.86, { src: "ratchet.wav", v: LEVELS.SFX_TEXTURE, dur: 0.50 }, 0.075),
  ...layer(2.20, { src: "knife_switch.wav", v: LEVELS.SFX_MID, dur: 0.12 },
                  { src: "slot_stop.wav", dur: 0.22 }),
  /* the beacons come on WITH a sound — v1 lit them silently */
  { at: 2.20,  src: "spotlight_snap.wav", v: LEVELS.SFX_MID, dur: 0.40, lead: 1 },
  { at: 2.24,  src: "alarm.wav",       v: LEVELS.SFX_TEXTURE * db(-2), dur: 2.40, lead: 0 },
  { at: 3.07,  src: "ratchet.wav",     v: LEVELS.SFX_MID, dur: 0.50, rate: 1.22 },
  /* ⭐ THE BITE IS A FOUR-LAYER STACK WITH A TONAL BODY. `gong` is what gives it
     WEIGHT — v1's bite was three percussive thuds and no pitch, which is why it
     landed without feeling like anything. */
  { at: 3.80,  src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.80 },
  { at: 3.80,  src: "gong.wav",        v: LEVELS.SFX_HERO * db(-9), dur: 2.20, lead: 1 },
  { at: 3.80,  src: "sub.wav",         v: LEVELS.SFX_HERO * db(-8), dur: 0.42, lead: 1 },
  { at: 3.84,  src: "chair_knock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.30, lead: 0 },

  /* ═══ S1 · THE LINE — three symptoms, three DIFFERENT sounds ═══════════════ */
  { at: 4.53,  src: "mech_clank.wav",  v: LEVELS.SFX_MID, dur: 0.12 },
  { at: 6.80,  src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.16 },
  { at: 6.82,  src: "chair_knock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.30, lead: 0 },
  { at: 7.47,  src: "ceramic_crack.wav", v: LEVELS.SFX_MID, dur: 0.70 },
  { at: 8.07,  src: "bamboo_crack.wav", v: LEVELS.SFX_TEXTURE, dur: 0.40 },

  /* ═══ S2 · THE INSPECTION ═════════════════════════════════════════════════ */
  ...layer(11.60, { src: "green_tone.wav", v: LEVELS.SFX_MID, dur: 0.70 },
                   { src: "bell_ring.wav", dur: 1.60, rate: 1.18 }),
  { at: 13.55, src: "sign_clack.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.22 },

  /* ═══ S3 · THE ARCHIVE ════════════════════════════════════════════════════ */
  { at: 16.60, src: "ratchet.wav",     v: LEVELS.SFX_MID, dur: 0.50, rate: 0.82 },
  ...layer(17.80, { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16 },
                   { src: "temper_chime.wav", dur: 0.70 }),

  /* ═══ S4 · THE FURNACE ════════════════════════════════════════════════════ */
  ...layer(19.27, { src: "stamp_press.wav", v: LEVELS.SFX_MID, dur: 0.34 },
                   { src: "impact.wav", dur: 0.62 }),
  { at: 20.00, src: "mech_clank.wav",  v: LEVELS.SFX_MID, dur: 0.12 },
  ...layer(20.93, { src: "can_bong.wav", v: LEVELS.SFX_MID, dur: 0.34, rate: 0.86 },
                   { src: "mech_clank.wav", dur: 0.12, rate: 0.74 }),
  /* the tokens going down the chute — a stream, pitched down as they fall in */
  ...repeat(2, 21.30, 0.26, { src: "ticket_click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.14 }, -0.09),
  { at: 22.10, src: "thock.wav",       v: LEVELS.SFX_MID, dur: 0.16 },

  /* ═══ S5 · THEIR OWN SHOP ═════════════════════════════════════════════════ */
  ...repeat(2, 24.70, 0.32, { src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.27 }, 0.07),

  /* ═══ S6 · THE STAMP ══════════════════════════════════════════════════════ */
  { at: 26.87, src: "stamp_press.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.34 },
  { at: 26.87, src: "impact_deep.wav", v: LEVELS.SFX_MID, dur: 0.80, lead: 1 },
  { at: 26.90, src: "slate_whump.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16, lead: 0 },

  /* ═══ S7 · THE CLASH — ⭐ THE SECOND PEAK ═════════════════════════════════
     The strain has to be AUDIBLE before the seize or the seize is just a bang:
     an engine under load, a cable creaking, then everything stops at once. */
  { at: 28.43, src: "blip3.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.22 },
  /* ⭐ THE STRAIN IS A BOWED TONE, NOT AN ENGINE. `cello_note` swells under the
     tug of war the way a loaded cable actually sings — TONAL, so it carries
     tension without being a noise swell. */
  ...layer(29.10, { src: "cello_note.wav", v: LEVELS.SFX_MID * db(-2), dur: 1.90, rate: 0.92 },
                   { src: "twang.wav", dur: 0.50, rate: 0.88 }),
  { at: 29.97, src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.80 },
  { at: 29.97, src: "gong.wav",        v: LEVELS.SFX_HERO * db(-8), dur: 2.20, lead: 1 },
  { at: 29.97, src: "boom.wav",        v: LEVELS.SFX_HERO * db(-11), dur: 0.55, lead: 1 },
  { at: 30.00, src: "adv_strike.wav",  v: LEVELS.SFX_MID, dur: 0.60, lead: 0 },
  { at: 30.03, src: "can_bong.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.34, lead: 0 },

  /* ═══ S8 / S9 · THE CRIB ══════════════════════════════════════════════════ */
  ...layer(31.60, { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16 },
                   { src: "wrench_clank.wav", dur: 0.06 }),
  { at: 33.50, src: "chrome_shine.wav", v: LEVELS.SFX_MID, dur: 0.50 },

  /* ═══ S10 · THE PASTE — ⭐ THE READER READS IT, LINE BY LINE ═══════════════
     Three DIFFERENT blips for the three instruction lines, rising. The card is
     the deliverable; it should sound like a machine taking an instruction in,
     not like one more clunk. */
  ...layer(34.97, { src: "slot_stop.wav", v: LEVELS.SFX_MID, dur: 0.22 },
                   { src: "gold_stamp.wav", dur: 0.50 }),
  { at: 35.30, src: "blip1.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.22 },
  { at: 35.58, src: "blip2.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.22 },

  /* ═══ S11 · THE AUDIT ═════════════════════════════════════════════════════ */
  { at: 36.40, src: "scan_beep.wav",   v: LEVELS.SFX_MID, dur: 0.40, rate: 0.84 },
  { at: 36.90, src: "scan_beep.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.40, rate: 1.10 },

  /* ═══ S12 · THE VERDICT ═══════════════════════════════════════════════════ */
  { at: 37.83, src: "lamp_clunk.wav",  v: LEVELS.SFX_MID, dur: 0.27 },
  { at: 38.33, src: "mech_clank.wav",  v: LEVELS.SFX_MID, dur: 0.12 },
  ...repeat(2, 38.90, 0.34, { src: "knife_switch.wav", v: LEVELS.SFX_MID, dur: 0.12 }, 0.09),
  { at: 39.57, src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.80 },

  /* ═══ S13 · THE OPEN FLOOR ════════════════════════════════════════════════ */
  ...layer(41.03, { src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.70 },
                   { src: "bell_ring.wav", dur: 1.60 }),
  ...layer(42.50, { src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.09 },
                   { src: "temper_chime.wav", dur: 0.70, rate: 1.20 }),
  ...layer(43.67, { src: "green_tone.wav", v: LEVELS.SFX_MID, dur: 0.70 },
                   { src: "blip2.wav", dur: 0.22, rate: 1.14 }),

  /* ═══ S14 · THE CTA ═══════════════════════════════════════════════════════ */
  { at: 45.00, src: "stamp_press.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.34 },
  { at: 45.00, src: "bell_ring.wav",   v: LEVELS.SFX_MID, dur: 1.60, lead: 1 },
  { at: 45.02, src: "gold_stamp.wav",  v: LEVELS.SFX_MID, dur: 0.50, lead: 0 },
];

/** ⭐ THE GAIN IS RE-MEASURED PER REEL. Reel 108's `+8 dB` fixed an INAUDIBLE
    bed and was carried forward into reel 110, which shipped 7 dB HOT. A gain
    that fixed one reel is not a constant. */
const SFX_GAIN = db(8);
const SFX: Cue[] = SFX_RAW.map((c) => ({ ...c, v: c.v * SFX_GAIN }));

/** ⛔ A DIFFERENT BED PER CUT — the VO is the same recording and cannot change,
    so the bed is the only real audio-side lever against a fingerprint match. */
const BED: Record<Variant, string> = {
  bay:   "114_smart_bed.wav",
  amber: "114_smart_bed_amber.wav",
  steel: "114_smart_bed_steel.wav",
};

/** ⛔ a different caption band per cut — cheap, and it changes every frame */
const CAP_Y: Record<Variant, number> = { bay: 1258, amber: 1330, steel: 1190 };

/** ⛔⛔ THE BED SITS ~12 dB UNDER THE VO — "present, not competing" — AND THE
    GAIN IS MEASURED PER REEL, NEVER INHERITED.

    ⭐ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT. Reel 108 hit an INAUDIBLE bed
    and fixed it with +8 dB; that trim was carried forward into reel 110, which
    shipped 7 dB HOT and the ear caught it before any tool did. So this reel's
    beds were measured against this reel's VO, A-weighted, at the configured
    gains, BEFORE anything was rendered:

      with BED_TRIM.loud = db(6)     VO -25.4 dBA
        bay    bed -31.3   ->  5.9 dB under      <- all three HOT
        amber  bed -30.3   ->  4.9 dB under
        steel  bed -32.4   ->  7.0 dB under

    The three synthesized beds also differ from each other by ~2 dB (different
    keys and timbres carry different energy), so ONE shared trim cannot land all
    three. Each gets its own, solved from its own measurement to hit 12 dB. */
export const BED_GAIN: Record<Variant, number> = {
  bay:   db(2.8),
  amber: db(0.7),
  steel: db(2.5),
};

/* ⛔⛔⛔ AND THE SECOND TIME THESE WERE RE-SOLVED, IT WAS BECAUSE THE BED WAS
   EATING A DIFFERENT GATE ENTIRELY. `sfx_audit --mix` reported <250Hz at 19.8%
   against a 9.5-14.5 band. I trimmed the gong / sub / boom / impact_deep stack
   by 3-5 dB each and the figure did not move by 0.1 — which is reel 107's rule
   restated as a measurement: **a fix that changes nothing means the fix is in
   the wrong layer.** Measured per stem:

       VO   10.4% below 250Hz          <- fine
       BED  70.5% below 250Hz          <- the whole problem

   The synthesized bed was three sine drones at 37 / 73 / 110 Hz plus a sub swell
   on every beat: almost all of its energy under 250 Hz, most of it under a phone
   speaker's floor, and all of it landing on the one gate that reads the mix.
   Thinning the voices took it to 63.7% and made STEEL worse (78.6%), because at
   a 55 Hz root the FUNDAMENTAL is the problem, not the voicing above it. Every
   root went up an octave and the hum's lowpass opened from 520-1500 Hz to
   2100-3400: **70.5% -> 26.7%**, and the gains above were re-solved from the new
   files rather than carried over. */
/** the A/B lever only — `quiet` is a further 4 dB down for a bed-level check */
export const BED_TRIM = { loud: db(0), quiet: db(-4) } as const;

export const makeReel = (v: Variant, bed: keyof typeof BED_TRIM = "loud"): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_smart.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * BED_TRIM[bed]} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><S9 v={v} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><S11 v={v} /></Sequence>
            <Sequence from={L.S12} durationInFrames={DUR.S12}><S12 v={v} /></Sequence>
            <Sequence from={L.S13} durationInFrames={DUR.S13}><S13 v={v} /></Sequence>
            <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} /></Sequence>
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
   ⭐⭐ THE HEADER CHANGES PER SECTION, AND IS NEVER OFF.
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction.

   ⭐ Each band names the MECHANISM in product nouns, never the theme — a viewer
   who cannot read "brace bay" can still read "YOUR CLAUDE.md IS THE PROBLEM".
   ⛔⛔ NOTHING HERE MAY CARRY THE PAYOFF CLAIM. "so much faster with no
   hallucinations" is unsourced (`SPEED_BANNED`), so the S13 band states the
   ACTION the viewer takes, not the result they get.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "YOUR SETUP IS",            hot: "SLOWING CLAUDE DOWN" },
  { from: L.S1,  big: "SLOWER · IGNORES RULES",   hot: "AND STARTS GUESSING" },
  { from: L.S2,  big: "IT IS NOT THE MODEL",      hot: "IT IS YOUR SETUP" },
  { from: L.S3,  big: "CLAUDE.md · SKILLS",       hot: "WRITTEN FOR OLDER MODELS" },
  { from: L.S4,  big: `CLAUDE ${R.model} DOESN'T`, hot: "NEED THE HAND-HOLDING" },
  { from: L.S5,  big: `ANTHROPIC CUT ${R.cutPct}%`, hot: "OF CLAUDE CODE'S PROMPT" },
  { from: L.S6,  big: "THEIR WORD FOR IT:",       hot: R.verdict },
  { from: L.S7,  big: "THE RULES WERE",           hot: "FIGHTING EACH OTHER" },
  { from: L.S8,  big: "DON'T DELETE IT ALL",      hot: "SOME OF IT EARNS ITS PLACE" },
  { from: L.S9,  big: "AUDIT IT",                 hot: "DON'T JUST DELETE IT" },
  { from: L.S10, big: "OPEN CLAUDE",              hot: "PASTE ONE PROMPT" },
  { from: L.S11, big: "IT AUDITS THE LOT",        hot: "RULE BY RULE" },
  { from: L.S12, big: "RULES · SKILLS · MEMORY",  hot: "KEEP WHAT EARNS IT" },
  { from: L.S13, big: "RIGHTSIZE YOUR SETUP",     hot: "THEN LET IT WORK" },
  { from: L.S14, big: `COMMENT ${KEYWORD}`,       hot: "AND I'LL SEND THE GUIDE" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so it is SETTLED on frame 0 (SectionHeader fades in
     over 10 frames); every later band fades in on its own cut. */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelBay = makeReel("bay");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
/** the same cut with the bed 4 dB down — for an A/B on the bed level only */
export const ReelQuiet = makeReel("bay", "quiet");
