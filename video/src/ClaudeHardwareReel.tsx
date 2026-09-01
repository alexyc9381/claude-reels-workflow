import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18,
  CAM, GRADE,
} from "./HwScenes";
import type { Variant } from "./HwScenes";
import { CamCtx } from "./HwWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import { HOOKS, HOOK_BANDS } from "./HwHooks";
import type { HookId } from "./HwHooks";
import words from "./data/words_122hardware.json";

/* ===========================================================================
   REEL 122 · "HARDWARE" — THE ASSEMBLY.  Board: storyboards/122-hardware.md.

   Subject: what it actually costs to run a frontier model on your own GPUs.

   Verified live 2026-08-24 — the full ledger lives in `HwWorld.R`:
     · Anthropic has never published open weights for ANY Claude model, so
       "run Opus 5 locally" is not a price question, it is unavailable.
     · Moonshot AI's Kimi K3 — released 2026-07-27, 2.8T total / 104B active
       MoE, 896 experts, 1M context, Modified MIT — is the nearest thing you
       CAN run, and the largest open-weight model shipped.
     · ⛔ SEVEN RTX PRO 6000 IS THE 1-BIT FLOOR, NOT THE FULL REQUIREMENT.
       7 x 96 GB = 672 GB clears the UD-IQ1_S build's 594 GB; the full MXFP4
       weights are 1.56 TB and need ~18 cards. The rack rail carries
       `1-BIT BUILD · 594 GB` at stencil size so the frame states which build.
     · $16,000/card is NVIDIA's own US Marketplace listing, Aug 2026 (launch
       was $8,565). 7 x $16,000 = $112,000.
     · 4.2 kW is 7 x the published 600 W TDP.
     · $565/mo is 4.2 kW x 730 h x ~$0.184; EIA's 2026 US residential average
       runs 17.65-18.83 c/kWh, so the implied rate sits inside the band.
     · 0.10 tok/s at 0-1% GPU utilisation is a MEASURED benchmark run (Aug
       2026, 4 x A100-SXM4-40GB, 2 TB RAM, UD-IQ1_S) — a 500-token answer takes
       1 h 23 m, and the stated cause is memory bandwidth.
     · ⛔ $0.70 for an hour is THE VO'S ESTIMATE. The published RATE is what is
       stencilled: Opus 5 at $5 / $25 per MTok. The receipt states the hour, the
       stencil states the rate, and they are separate objects.

   ⛔⛔ THE VILLAIN IS `THE PIPE` AND IT IS NEVER BEATEN. Planted unremarked
   under the rack at S4, opens the floor at S9, revealed at S11, and it WINS at
   S12 — the hero cranks it as hard as he can and nothing improves. S13 does not
   defeat it, it walks around it.

   ⚠️ 61.05s IS OUTSIDE THE PLAYBOOK'S 22-29s FIGURE AND IS FLAGGED, NOT
      TRIMMED. Every second is spoken content: the cut removes 103.9s of flubs,
      dead takes and dead air from a 164.95s raw recording containing twelve
      separate `cut cut` retakes. Recent ships: 110 = 30.95 · 109 = 31.14 ·
      118 = 33.68 · 117 = 38.83 · 115 = 46.93 · 113 = 49.90 · 116 = 56.18 ·
      112 = 75.65. This is the second longest. Tempo is piecewise — the hook
      ships at x1.00 (protected) and the body at x1.08 — which puts the hook at
      4.45 wps, in family with 118 (4.50) and 116 (4.60).

   ⛔⛔ THE VO HAS NO SPOKEN CTA. It ends on the verdict ("makes no sense") and
      there is no "comment HARDWARE" line anywhere in the 164.95s take. S18's
      CTA is therefore GRAPHICAL ONLY and nothing on screen implies he said it.

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;
export const HW_TOTAL = 1832;                     /* CUT 61.05s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of the caption JSON by pattern-matching the
    beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,      /* DESK    hook                 0.00s */
  S1: 53,     /* VAULT   sealed weights       1.76s */
  S2: 185,    /* DOCK    Kimi K3              6.17s */
  S3: 263,    /* WEIGH   2.8T params          8.78s */
  S4: 327,    /* BAY     seven cards         10.89s */
  S5: 416,    /* COUNTER $16,000 each        13.88s */
  S6: 492,    /* TILL    $112,000            16.40s */
  S7: 595,    /* METER   electric + 4.2 kW   19.84s */
  S8: 694,    /* STREET  $565/mo             23.14s */
  S9: 857,    /* TURN    the real problem    28.57s */
  S10: 915,   /* HALL    0.1 tok/s           30.50s */
  S11: 1106,  /* WHY     memory bandwidth    36.86s */
  S12: 1156,  /* UNDER   store vs move       38.55s */
  S13: 1303,  /* FRONT   70 cents            43.43s */
  S14: 1406,  /* DOORS   three reasons       46.87s */
  S15: 1471,  /* PLANT   volume              49.02s */
  S16: 1557,  /* WARD    privacy             51.89s */
  S17: 1627,  /* NIGHT   agents 24-7         54.23s */
  S18: 1693,  /* KERB    verdict             56.43s */
  END: HW_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.S16 - L.S15,
  S16: L.S17 - L.S16, S17: L.S18 - L.S17, S18: L.END - L.S18,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 (slow attack, no low end
   = a swell) and are excluded too.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a house with a data
   centre in it — fan spool, plaster fall, a vault wheel, roller conveyor,
   card latches, a price gun, a till, a breaker, a meter disc, a bus bar under
   load, a drip, a hand pump, three doors and a kerb. **ZERO chiptune cues** —
   the greppable gate is that no `src` starts with `c_`, which returns zero.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top
   is a SLAP; the same event carried under 250 Hz is a thud you feel. `thock`
   (88.6% low), `impact_deep` (93.1%), `sub` (96.6%) and `impact` (42.1%) carry
   the weight here. `clap_slam` is 62% bright and `dead_thud` 91% — both stay
   under the SLAP gate's 5-use threshold, and `punch_thud` (93.7% bright) is
   not used at all.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the hook), S7 (the
   supply straining), S10 (the drip), S12 (the peak) and S13 (the payoff), and
   thins to two or three on the information scenes. S9 gets exactly three — it
   is 1.93s and one idea.
   ⭐ The bank runs slightly above the 1.0-1.5/sec house ceiling as a deliberate
   exception, and it is spent on EVENTS rather than texture — which is the
   distinction the ceiling actually protects. The reel that was rejected at
   3.82/sec was dense with ambience and ticks; every cue below lands on
   something you can watch happen. */
export const SFX: Cue[] = [
  /* ---- S0 · THE RACK THROUGH THE CEILING. The heaviest stack in the reel —
     frame 0 is the interrupt and it gets the biggest cue set. ------------- */
  { at: S(L.S0 + 0),   src: "road_bed_dry.wav",  v: LEVELS.SFX_BED,     dur: 2.0, rate: 0.86 },
  { at: S(L.S0 + 8),   src: "knife_switch.wav",  v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.06 },
  ...layer(S(L.S0 + 12),
    { src: "sub.wav",          v: LEVELS.SFX_MID * db(3), dur: 1.2, rate: 0.70 },
    { src: "rebuild_thud.wav", v: LEVELS.SFX_TEXTURE,     dur: 0.9, rate: 0.80 }),
  /* ⭐ the seven fans start ONE AT A TIME in the picture, so they do in the mix
     too — a single engine swell would have been the one thing the frame is not
     doing, and `deep_engine`'s 562ms attack trips the SWELL gate besides. */
  ...[12, 18, 25, 32].map((a, i) => ({
    at: S(L.S0 + a), src: "mech_clank.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.5), dur: 0.4, rate: 1.14 + i * 0.09,
  })),
  { at: S(L.S0 + 16),  src: "ceramic_crack.wav", v: LEVELS.SFX_MID,     dur: 0.7, rate: 0.86 },
  { at: S(L.S0 + 20),  src: "slate_whump.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 0.74 },
  { at: S(L.S0 + 26),  src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 1.1, rate: 0.92 },
  ...layer(S(L.S0 + 38),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO,        dur: 1.1, rate: 0.84 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,         dur: 1.3, rate: 0.78 }),
  { at: S(L.S0 + 44),  src: "road_bed_dry.wav",  v: LEVELS.SFX_BED * db(5), dur: 1.6, rate: 0.72 },

  /* ---- S1 · THE VAULT. Three hauls on a wheel that spins free, then a
     shoulder that does nothing. ------------------------------------------ */
  { at: S(L.S1 + 10),  src: "mech_clank.wav",    v: LEVELS.SFX_MID,     dur: 0.7, rate: 0.80 },
  { at: S(L.S1 + 18),  src: "ratchet.wav",       v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.78 },
  { at: S(L.S1 + 40),  src: "ratchet.wav",       v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.92 },
  { at: S(L.S1 + 66),  src: "ratchet.wav",       v: LEVELS.SFX_MID * db(2), dur: 1.2, rate: 1.06 },
  ...layer(S(L.S1 + 96),
    { src: "thock.wav",        v: LEVELS.SFX_HERO,        dur: 0.7, rate: 0.72 },
    { src: "wrench_clank.wav", v: LEVELS.SFX_TEXTURE,     dur: 0.8, rate: 0.84 }),

  /* ---- S2 · THE DOCK. The landing, the front dropping open. ------------ */
  ...layer(S(L.S2 + 26),
    { src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,        dur: 1.2, rate: 0.86 },
    { src: "boom.wav",         v: LEVELS.SFX_MID,         dur: 1.3, rate: 0.76 }),
  { at: S(L.S2 + 34),  src: "gear_shift.wav",    v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.82 },
  { at: S(L.S2 + 46),  src: "lamp_clunk.wav",    v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.92 },
  { at: S(L.S2 + 58),  src: "arrive_chime.wav",  v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.02 },

  /* ---- S3 · THE WEIGHBRIDGE. The deck sinking, the needle bending a stop. */
  { at: S(L.S3 + 10),  src: "slate_whump.wav",   v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.72 },
  { at: S(L.S3 + 24),  src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.04 },
  ...layer(S(L.S3 + 40),
    { src: "twang.wav",        v: LEVELS.SFX_HERO,        dur: 0.9, rate: 0.88 },
    { src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE,     dur: 0.7, rate: 1.18 }),

  /* ---- S4 · SEVEN CARDS SEATING. One latch per card, an ASCENDING RUN —
     an ascending run is what makes a repeated reward read as PROGRESS rather
     than as repetition. `mech_clank` is 30.4% bright, i.e. under the SLAP
     gate's 35% ceiling, which is why it can carry a run this long at all. -- */
  ...[8, 20, 32, 44, 56, 68, 80].map((a, i) => ({
    at: S(L.S4 + a + 7), src: "mech_clank.wav",
    v: LEVELS.SFX_MID * db(i * 0.5), dur: 0.6, rate: 0.86 + i * 0.045,
  })),
  { at: S(L.S4 + 87),  src: "arrive_chime.wav",  v: LEVELS.SFX_MID,     dur: 0.9, rate: 1.10 },

  /* ---- S5 · THE PRICE GUN. One hero strike, and it is the scene. -------- */
  { at: S(L.S5 + 11),  src: "gear_shift.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.7, rate: 0.86 },
  ...layer(S(L.S5 + 22),
    { src: "gold_stamp.wav",   v: LEVELS.SFX_HERO * db(2), dur: 0.9, rate: 0.94 },
    { src: "impact.wav",       v: LEVELS.SFX_MID,          dur: 0.8, rate: 0.80 }),
  { at: S(L.S5 + 39),  src: "lamp_clunk.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.14 },

  /* ---- S6 · THE TILL. Seven drops climbing, then the roll starting again.
     ⛔ `ticket_click` is 92% bright and would have been a SLAP at seven uses.
     `can_bong` is 17.4% bright with 46% under 250 Hz — a coin into a tray. --- */
  ...[4, 12, 20, 28, 36, 44, 52].map((a, i) => ({
    at: S(L.S6 + a), src: "can_bong.wav",
    v: LEVELS.SFX_MID * db(i * 0.4), dur: 0.45, rate: 0.86 + i * 0.055,
  })),
  ...layer(S(L.S6 + 62),
    { src: "clap_slam.wav",    v: LEVELS.SFX_HERO,        dur: 0.9, rate: 0.88 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,         dur: 1.1, rate: 0.74 }),
  { at: S(L.S6 + 74),  src: "sign_clack.wav",    v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.94 },

  /* ---- S7 · THE SUPPLY STRAINING. A density PEAK. ---------------------- */
  { at: S(L.S7 + 10),  src: "knife_switch.wav",  v: LEVELS.SFX_HERO,    dur: 0.6, rate: 0.94 },
  ...layer(S(L.S7 + 18),
    { src: "neon_on.wav",      v: LEVELS.SFX_MID,         dur: 1.2, rate: 0.80 },
    { src: "road_bed_dry.wav", v: LEVELS.SFX_BED * db(7), dur: 2.6, rate: 0.70 }),
  { at: S(L.S7 + 30),  src: "motor_sag.wav",     v: LEVELS.SFX_MID * db(2), dur: 1.4, rate: 0.78 },
  { at: S(L.S7 + 46),  src: "tick.wav",          v: LEVELS.SFX_TEXTURE, dur: 0.2, rate: 1.26 },
  ...layer(S(L.S7 + 66),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO,        dur: 1.1, rate: 0.80 },
    { src: "slate_whump.wav",  v: LEVELS.SFX_TEXTURE,     dur: 0.7, rate: 0.70 }),
  { at: S(L.S7 + 84),  src: "green_tone.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 0.72 },

  /* ---- S8 · THE MONTH RUNNING. The punch at f88 gets its own transient. - */
  { at: S(L.S8 + 4),   src: "road_bed_dry.wav",  v: LEVELS.SFX_BED,     dur: 3.2, rate: 0.96 },
  { at: S(L.S8 + 30),  src: "sign_clack.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 1.04 },
  ...layer(S(L.S8 + 88),
    { src: "thock.wav",        v: LEVELS.SFX_HERO,        dur: 0.7, rate: 0.86 },
    { src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE,     dur: 0.6, rate: 1.10 }),
  { at: S(L.S8 + 120), src: "can_bong.wav",      v: LEVELS.SFX_MID,     dur: 0.5, rate: 0.78 },
  ...layer(S(L.S8 + 140),
    { src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,        dur: 0.9, rate: 0.86 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,         dur: 1.0, rate: 0.80 }),

  /* ---- S9 · THE TURN. 1.93s, ONE idea, THREE cues. --------------------- */
  { at: S(L.S9 + 2),   src: "neon_off.wav",      v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.86 },
  ...layer(S(L.S9 + 12),
    { src: "bamboo_crack.wav", v: LEVELS.SFX_MID,         dur: 0.9, rate: 0.72 },
    { src: "sub.wav",          v: LEVELS.SFX_HERO,        dur: 1.6, rate: 0.68 }),

  /* ---- S10 · THE DRIP. The drip IS the scene's clock: one cue per bead,
     exactly on the 60-frame cycle, with nothing between them. `pop` is 0.6%
     bright and 0.13s — it cannot hiss and it cannot slap. ----------------- */
  { at: S(L.S10 + 0),  src: "road_bed_dry.wav",  v: LEVELS.SFX_BED * db(2), dur: 6.4, rate: 1.02 },
  ...[58, 118, 178].map((a, i) => ({
    at: S(L.S10 + a), src: "pop.wav",
    v: LEVELS.SFX_MID * db(-i * 0.6), dur: 0.4, rate: 1.02 - i * 0.06,
  })),
  ...layer(S(L.S10 + 52),
    { src: "thock.wav",        v: LEVELS.SFX_MID,         dur: 0.6, rate: 0.94 },
    { src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE,     dur: 0.4, rate: 0.88 }),
  ...layer(S(L.S10 + 108),
    { src: "thock.wav",        v: LEVELS.SFX_MID,         dur: 0.6, rate: 0.82 },
    { src: "scan_beep.wav",    v: LEVELS.SFX_TEXTURE,     dur: 0.6, rate: 0.78 }),
  { at: S(L.S10 + 184), src: "line_dead.wav",    v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.94 },

  /* ---- S11 · THE PIPE REVEALED. 1.67s, ONE idea. ----------------------- */
  { at: S(L.S11 + 4),  src: "bamboo_crack.wav",  v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.94 },
  ...layer(S(L.S11 + 18),
    { src: "impact.wav",       v: LEVELS.SFX_HERO,        dur: 0.8, rate: 0.78 },
    { src: "data.wav",         v: LEVELS.SFX_TEXTURE,     dur: 1.1, rate: 0.86 }),

  /* ---- S12 · THE PEAK. He cranks, and the pump answers with NOTHING.
     ⭐ The LEVER cues get faster and louder as he does; the OUTPUT cue never
     changes level or pitch. The sound carries the same fact the picture does.
     ⛔ `slot_lever` was the obvious file and it is 58.7% bright with a 116ms
     attack — an AIR swell AND a slap at eight uses. A pump is a lever DOWN and
     a valve UP, so it is two low files alternating instead of one bright one. */
  { at: S(L.S12 + 0),  src: "road_bed_dry.wav",  v: LEVELS.SFX_BED,     dur: 5.0, rate: 0.82 },
  ...[26, 52, 71, 86, 99, 109, 117, 127].map((a, i) => ({
    at: S(L.S12 + a), src: i % 2 ? "chair_knock.wav" : "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(i * 0.4), dur: 0.5, rate: 0.78 + i * 0.04,
  })),
  ...[30, 66, 102, 136].map((a) => ({
    at: S(L.S12 + a), src: "pop.wav",
    v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 0.96,          /* ⭐ never changes */
  })),
  { at: S(L.S12 + 138), src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 1.2, rate: 0.70 },

  /* ---- S13 · THE PAYOFF. The torrent, and the receipt. A density PEAK. -- */
  { at: S(L.S13 + 4),  src: "lamp_clunk.wav",    v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.06 },
  ...layer(S(L.S13 + 22),
    { src: "data.wav",         v: LEVELS.SFX_MID * db(4), dur: 0.6, rate: 1.14 },
    { src: "tick.wav",         v: LEVELS.SFX_TEXTURE,     dur: 0.2, rate: 1.3 }),
  { at: S(L.S13 + 34), src: "green_tone.wav",    v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.24 },
  ...layer(S(L.S13 + 58),
    { src: "camera_shutter.wav", v: LEVELS.SFX_MID,       dur: 0.6, rate: 0.94 },
    { src: "slate_whump.wav",  v: LEVELS.SFX_TEXTURE,     dur: 0.6, rate: 1.10 }),
  { at: S(L.S13 + 74), src: "arrive_chime.wav",  v: LEVELS.SFX_HERO,    dur: 1.2, rate: 1.10 },

  /* ---- S14 · THREE DOORS. The first bolt throws. ----------------------- */
  { at: S(L.S14 + 8),  src: "chair_knock.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 0.92 },
  ...layer(S(L.S14 + 20),
    { src: "knife_switch.wav", v: LEVELS.SFX_MID,         dur: 0.6, rate: 0.78 },
    { src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE,     dur: 0.7, rate: 0.72 }),

  /* ---- S15 · THE PLANT. Big, hot and running. -------------------------- */
  ...layer(S(L.S15 + 0),
    { src: "road_bed_dry.wav", v: LEVELS.SFX_BED * db(6), dur: 2.8, rate: 0.80 },
    { src: "road_bed_dry.wav", v: LEVELS.SFX_BED * db(3), dur: 2.8, rate: 1.06 }),
  { at: S(L.S15 + 40), src: "mech_clank.wav",    v: LEVELS.SFX_MID,     dur: 0.7, rate: 1.06 },
  { at: S(L.S15 + 66), src: "metal_ping.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.16 },

  /* ---- S16 · THE WARD. Cold, sealed, quiet — the thinnest scene. ------- */
  { at: S(L.S16 + 4),  src: "green_tone.wav",    v: LEVELS.SFX_BED,     dur: 1.4, rate: 1.04 },
  ...layer(S(L.S16 + 20),
    { src: "gear_shift.wav",   v: LEVELS.SFX_MID,         dur: 1.0, rate: 0.84 },
    { src: "thock.wav",        v: LEVELS.SFX_TEXTURE,     dur: 0.5, rate: 1.06 }),

  /* ---- S17 · THE NIGHT FLOOR. ------------------------------------------ */
  { at: S(L.S17 + 2),  src: "office_chatter.wav", v: LEVELS.SFX_BED,    dur: 2.0, rate: 0.94 },
  { at: S(L.S17 + 40), src: "tick.wav",          v: LEVELS.SFX_TEXTURE, dur: 0.2, rate: 0.86 },

  /* ---- S18 · THE VERDICT. Three strikes, and the CTA.
     ⛔ `gold_stamp` is 68.8% bright and three more uses would have made it a
     five-use SLAP. A strike-through is a DEAD blow anyway: `impact_deep` is
     93.1% under 250 Hz — a thud you feel rather than a slap you flinch at. -- */
  { at: S(L.S18 + 4),  src: "road_bed_dry.wav",  v: LEVELS.SFX_BED,     dur: 3.0, rate: 0.92 },
  ...[30, 52, 74].map((a, i) => ({
    at: S(L.S18 + a), src: "impact_deep.wav",
    v: LEVELS.SFX_HERO * db(-i * 1.2), dur: 0.9, rate: 0.94 - i * 0.07,
  })),
  ...[30, 52, 74].map((a, i) => ({
    at: S(L.S18 + a), src: "slate_whump.wav",
    v: LEVELS.SFX_TEXTURE * db(-i), dur: 0.6, rate: 0.86 - i * 0.05,
  })),
  { at: S(L.S18 + 92), src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.7, rate: 0.90 },
  ...layer(S(L.S18 + 100),
    { src: "arrive_chime.wav", v: LEVELS.SFX_HERO,        dur: 1.3, rate: 1.02 },
    { src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE,     dur: 0.7, rate: 1.24 }),
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad. `ados` =
   "Another Day Of Sun" (13 uses across the repo), `ebm` = "Every Living
   Breathing Moment" (8). Reels 107-114 drifted onto generated beds one clone at
   a time and every audio gate stayed green, because a pad passes all of them.

   The window was MEASURED, not picked by ear — a 5ms RMS scan over each track,
   scored on mean level, head onset and the worst-1.5s drop against the window's
   own mean, with reel 118/120's ados passage (108.5s) excluded:

     house  ADOS @  84.0s   mean -17.2 dB   onset -18.0 dB   audible at 0.000s
     amber  EBM  @  36.0s   mean -15.4 dB   onset -11.8 dB   audible at 0.000s
     steel  ADOS @ 150.0s                                    audible at 0.000s

   ⛔⛔ THE BED IS COMPRESSED BEFORE IT IS LEVELLED. `loudnorm` sets an
   INTEGRATED level, so a track with a wide internal range puts its brass hits
   far above the target and they read as swells inside a VO gap.
   ⛔⛔⛔ AND THE HIGH SHELF IS NOT OPTIONAL — IT IS WHERE "THE PUFF OF AIR"
   LIVES. Reel 115 spent three rounds hunting a named cue that did not exist;
   the air was the bed's own cymbal wash above 5k.
   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. Measured after the chain: 0.000s on all three. */
const BED: Record<Variant, string> = {
  house: "122hw_bed.wav",
  amber: "122hw_bed_amber.wav",
  steel: "122hw_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1252, amber: 1336, steel: 1184 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files, AFTER the high shelf rather than inherited through it. The house
   figure is ~12 dB under the VO; the standing cap is volume 0.25 (Alex: *"the
   background music is too loud compared to the voiceover"*). */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.60),   /* -> volume 0.2399 */
  amber: db(7.20),
  steel: db(7.40),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** ⛔ THE PICKED HOOK. `crush` is S0 itself, so the candidate that was chosen and
    the scene that ships are the same code and cannot drift apart. */
export const PICKED: HookId = "crush";

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("122_hardware_vo.wav")} volume={LEVELS.DIALOGUE} />
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
            <Sequence from={L.S13} durationInFrames={DUR.S13}><S13 v={v} dur={DUR.S13} /></Sequence>
            <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} dur={DUR.S14} /></Sequence>
            <Sequence from={L.S15} durationInFrames={DUR.S15}><S15 v={v} dur={DUR.S15} /></Sequence>
            <Sequence from={L.S16} durationInFrames={DUR.S16}><S16 v={v} dur={DUR.S16} /></Sequence>
            <Sequence from={L.S17} durationInFrames={DUR.S17}><S17 v={v} dur={DUR.S17} /></Sequence>
            <Sequence from={L.S18} durationInFrames={DUR.S18}><S18 v={v} dur={DUR.S18} /></Sequence>
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
   below says "the house that cannot carry it".
   ⛔ The claim it states is the COST, which is also the frame-0 claim plate:
   across reel 94's six trial cuts the two that performed opened with a cream
   claim plate and the four that did not had none of their own.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "RUNNING AI LOCALLY",  hot: "COSTS $112,000" },
  { from: L.S7,  big: "PLUS THE POWER BILL", hot: "$565 EVERY MONTH" },
  { from: L.S9,  big: "AND IT STILL",        hot: "DOES NOT RUN" },
  { from: L.S13, big: "THE SAME WORK",       hot: "IS 70 CENTS AN HOUR" },
  { from: L.S14, big: "ONLY 3 REASONS",      hot: "TO RUN IT YOURSELF" },
  { from: L.S18, big: "OTHERWISE",           hot: "IT MAKES NO SENSE" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  /* ⛔⛔⛔ NO TEXT ON THE HOOK (Alex, round 20). The band is the largest text on
     screen and it sat over frame 0, so it does not exist until the hook is over
     — it rides in with S1 instead. ⚠️ STATED PLAINLY: this cuts against the one
     MEASURED IG-performance rule in the repo (reel 94's two trial cuts that
     performed both opened with a cream claim plate, the four that did not had
     none). Asked for directly, so it ships; `HOOK_PLATE` is warn-only and its
     own note says the evidence does not generalise. One line to restore. */
  if (f < L.S1) return null;
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* ⛔ the first band no longer exists on the hook, so it must EASE IN as S1
     starts rather than appear fully formed. Feeding `f - b.from + 12` would hand
     it f=103 on its first visible frame — a hard pop. */
  const first = b.from === L.S0;
  return <HookHeader big={b.big} hot={b.hot}
    f={first ? f - L.S1 : f - b.from + 12} />;
};

export const ClaudeHardwareReel = makeReel("house");
export const ClaudeHardwareReelAmber = makeReel("amber");
export const ClaudeHardwareReelSteel = makeReel("steel");

/* =========================================================================
   ⛔ THE HOOK EXPERIMENT — each candidate as a standalone 106-frame cut, on the
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
      <Audio src={staticFile("122_hardware_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={SFX.filter(c => c.at < 106 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <Sequence from={0} durationInFrames={106}><Cut v="house" dur={106} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.house} />
      <HookHeader big={b.big} hot={b.hot} f={f + 12} />
    </AbsoluteFill>
  );
};
