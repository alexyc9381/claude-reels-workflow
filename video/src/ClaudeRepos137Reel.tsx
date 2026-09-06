import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { TAG1, JAM, PRESS, READ, TAG2, CRAM, SPLIT, PLUGS, SWAP, GODTIER, TAG4, MANIFOLD, ROLLOUT, CAM, GRADE } from "./RpsScenes";
import type { Variant } from "./RpsScenes";
import { HOOKS, HookCut } from "./RpsHooks";
import type { HookId } from "./RpsHooks";
import { CamCtx } from "./RpsWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_repos137.json";

/* ===========================================================================
   REEL 137 · "REPOS" — THE SHOP.  Board: storyboards/137-repos.md.

   Subject: four brand-new open-source repos that upgrade a Claude setup —
   firecrawl/anydoc (★20,397 MIT), herdrdev/herdr (★35,522 Apache-2.0),
   deepseek-ai/deepseek-harness (★213,060 MIT), diegosouzapw/OmniRoute
   (★61,564 MIT). Every figure verified 2026-09-05 against the GitHub API and
   each README; the ledger is `RpsWorld.R` / `REPOS`.

   ⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "UPGRADE". A tuning shop for
   Claudes: a hydraulic lift, chain hoists, four bays, a pit crew per bay. A
   stock Claude rolls in and leaves with four parts bolted on.

   ⭐⭐ THE VO. 81.78s raw → 41.18s. SIX flubs removed — a false start at the
   head, one inside the anydoc sentence ("...simple text format that I- cut
   cut"), three `cut cut` retakes in the herdr / DeepSeek lines, and one
   inside "so if your agent starts" — plus 19.9s of dead air and whisper's two
   hallucinated "thank you"s over noise. ⛔ A whole-file transcription called
   the take clean; chunking the raw at every measured silence found all six.
   Every join sits in measured silence (14 window edges, all below −46 dB),
   0.26s at sentence boundaries, 0.22s at the one mid-sentence join.

   ⛔ TEMPO IS PIECEWISE: hook windows capped at 3.95 wps, the rest at 4.45,
   x1.10 elsewhere → overall 4.03 wps, hook 0-10s 3.9, worst 5s window 4.45.
   ⚠️ 41.18s is OUTSIDE the 22-29s house range. Four repos need it. Flagged,
   not trimmed.
   ========================================================================= */

const FPS = 30;
/* ⛔ Alex, rev 3: "it needs to end RIGHT WHEN it says the last word". The last word "links."
   ends at 40.31s and the reel ran to 41.18s — 0.87s of air after the CTA. 1222 frames = 40.73s
   leaves only the SEND stamp (0.34s from f1212) and lands the cut on its decay. */
export const RPS_TOTAL = 1190;                       /* 39.67s x 30fps; last word ends 39.24s */

/** ⛔ EVERY ONSET BELOW IS A SPLICE JOIN, i.e. a point of MEASURED SILENCE in
    the cut file — never a stored word end (which whisper places 20-200ms
    early). The next window's first word starts 0.08-0.10s after each. */
export const L = {
  S0: 0,      /* LIFT      hook · "These four brand new open source..."      0.00s */
  S1: 102,    /* JAM       "First, AnyDoc." + the anydoc card, then the jam      3.41s */
  S2: 131,    /* xJAMBODY  (hosted by S1 — cue anchor only, not a scene)        4.41s */
  S3: 230,    /* PRESS     "So this tool strips all the junk..."              7.70s */
  S4: 332,    /* READ      "and it turns them into clean markdown..."        11.11s */
  S5: 461,    /* CRAM      "Next is herdr." + the herdr card, then the cram    15.60s */
  S6: 485,    /* xCRAMBODY (hosted by S5 — cue anchor only, not a scene)       16.40s */
  S7: 576,    /* SPLIT     "So this tool upgrades your screen..."            19.42s */
  S8: 663,    /* PLUGS     "Then check out the DeepSeek Harness..."          22.37s */
  S9: 746,    /* SWAP      "So if your agent starts getting dumb..."         25.33s */
  S10: 850,   /* GODTIER   "and you instantly get a god tier..."             29.11s */
  S11: 928,   /* MANIFOLD  "But finally, OmniRoute." + the card, then the bay   31.94s */
  S12: 963,   /* xMANBODY  (hosted by S11 — cue anchor only, not a scene)      33.16s */
  S13: 1138,  /* ROLLOUT   "Comment the word REPOS for all the links."       39.00s */
  END: RPS_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3, S4: L.S5 - L.S4, S5: L.S6 - L.S5,
  S6: L.S7 - L.S6, S7: L.S8 - L.S7, S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.END - L.S13,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST: no `pneu_thunk`, no `crusher`, nothing whose name says
   whoosh / swoosh / puff, no riser of any kind, no `chain_clank` (measured AIR
   on reel 120), no `water_fan` (the fuzzy sample of reel 99), no chiptune
   `c_*` outside a single fanfare. The whole `am/` pack is out.

   ⭐ THE BANK BELONGS TO THE WORLD. This is a garage: hydraulics, ratchets,
   metal on metal, a press, a shutter, a knife switch, a token drop. Every cue
   is an OBJECT DOING SOMETHING; nothing is decorative.

   ⛔ DURING SPEECH A CUE IS A TRANSIENT, NEVER A TEXTURE: nothing over ~0.35s
   lands on words, and nothing lands on a sentence-final word (the tail ducks
   below take care of the bed; the cues stay clear of the tails by placement).
   -------------------------------------------------------------------------- */
/* ===========================================================================
   ⛔⛔ THE HOOK'S CUES ARE PER HOOK (Alex, rev 5: "trial version 3, the SFX are not
   aligned with the animation"). One shared bank meant the LIFT hook's beats — gems
   landing at f14/24/36/48, the absorb at f58 — played over the DROP and PIT hooks,
   whose parts land at 28/52/76 and 30/48/66. Three cuts are three hook COMPONENTS,
   so they are three cue banks ([[feedback_three_cuts_three_hooks_fix_all_three]]).
   ⛔ "setup." runs f84-93, so nothing above TEXTURE fires after f84.
   ⭐⭐ THE COMPLETION IS IN TWO PARTS, BECAUSE THE HOOK HAS NO SILENCE IN IT (Alex, rev 12: "have
   like a game completion sound at the final gem of the hook animation"). The VO runs wall to wall
   0.00-3.09s and the fourth repo docks at f92 / f92 / f94 — on top of "setup.", the hook's
   sentence-final word — and every cue also plays 0.1s EARLY on the J-cut lead. So it is split the
   way a game splits it:
     · ON THE GEM   f92/92/94   `c_1up`, 0.09s at TEXTURE — the collect BLIP, on the frame the
                                repo lands, short and quiet enough to leave the word alone
     · ON THE CUT   f105        `c_powerbig` at MID + `c_clear` on top — the stage-clear FLOURISH,
                                blooming across the hook→TAG cut
   ⛔⛔ THE SAFE WINDOW IS MEASURED ON THE MIX, NOT READ OFF THE CAPTION FILE. The words json puts
   "setup." at 2.79-3.09; whisper on the delivered mix puts it at **3.02-3.26**. A first pass moved
   the fanfare to 3.20s believing that was 110ms of clear air — it was 180ms INSIDE the word, and
   `word_audible` heard 'concept.' Fix 3 of [[feedback_cues_land_on_sentence_ends]] says exactly
   this and it still cost two renders. Measured clean: "setup." -> 'Cloud setup.' ok.
   ========================================================================= */
export const HOOK_SFX: Record<HookId, Cue[]> = {
  /* HAUL — he heaves against a stuck load (thocks at 0/7/14), then a repo lands on him at
     f10/32/58 and each surge ends on a thump as the wheels cross a joint at f30/58/92.
     ⛔ "setup." runs f84-93: nothing above TEXTURE fires after f84. */
  lift: [
    { at: S(0),  src: "stage_hum.wav",  v: LEVELS.SFX_BED,  dur: 2.0,  rate: 0.88 },
    { at: S(0),  src: "sub.wav",        v: LEVELS.SFX_HERO, dur: 0.6,  rate: 0.7 },
    ...[0, 7, 14].map((a2, i) => ({ at: S(a2), src: "thock.wav", v: LEVELS.SFX_TEXTURE * db(-1 + i * 0.4), dur: 0.14, rate: 0.72 + i * 0.05 })),
    ...[10, 32, 58].map((a2, i) => ({ at: S(a2), src: "mech_clank.wav", v: LEVELS.SFX_HERO * db(-1 + i), dur: 0.22, rate: 0.94 - i * 0.05 })),
    ...[10, 32, 58].map((a2, i) => ({ at: S(a2), src: "sub.wav", v: LEVELS.SFX_MID * db(-2 + i), dur: 0.32, rate: 0.8 - i * 0.03 })),
    ...[12, 34, 60].map((a2, i) => ({ at: S(a2), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-2 + i * 0.6), dur: 0.28, rate: 1.02 + i * 0.07 })),
    { at: S(30), src: "thock.wav",      v: LEVELS.SFX_MID,  dur: 0.16, rate: 0.8 },
    { at: S(60), src: "chrome_shine.wav",  v: LEVELS.SFX_TEXTURE * db(0), dur: 0.30, rate: 0.94 },
    { at: S(92), src: "thock.wav",      v: LEVELS.SFX_TEXTURE * db(-1), dur: 0.14, rate: 0.86 },
    { at: S(92),  src: "c_1up.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.09, rate: 1.04 },
    { at: S(105), src: "c_powerbig.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.28, rate: 1.00 },
    { at: S(105), src: "c_clear.wav",    v: LEVELS.SFX_TEXTURE * db(3), dur: 0.14, rate: 1.00 },
  ],
  /* PRESS — the load is on him; it lands at f12/34/60 and he pushes it back up each time */
  drop: [
    { at: S(0),  src: "stage_hum.wav",  v: LEVELS.SFX_BED,  dur: 2.0,  rate: 0.88 },
    { at: S(0),  src: "sub.wav",        v: LEVELS.SFX_HERO, dur: 0.6,  rate: 0.7 },
    ...[0, 7].map((a2, i) => ({ at: S(a2), src: "thock.wav", v: LEVELS.SFX_TEXTURE * db(-1 + i * 0.5), dur: 0.14, rate: 0.7 + i * 0.06 })),
    ...[12, 34, 60].map((a2, i) => ({ at: S(a2), src: "mech_clank.wav", v: LEVELS.SFX_HERO * db(-1 + i), dur: 0.24, rate: 0.88 - i * 0.05 })),
    ...[12, 34, 60].map((a2, i) => ({ at: S(a2), src: "sub.wav", v: LEVELS.SFX_MID * db(-1 + i), dur: 0.34, rate: 0.76 - i * 0.02 })),
    ...[14, 36, 62].map((a2, i) => ({ at: S(a2), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-2 + i * 0.6), dur: 0.28, rate: 0.98 + i * 0.08 })),
    { at: S(62), src: "chrome_shine.wav",  v: LEVELS.SFX_TEXTURE * db(0), dur: 0.30, rate: 0.9 },
    { at: S(92), src: "thock.wav",      v: LEVELS.SFX_TEXTURE * db(-1), dur: 0.14, rate: 0.82 },
    { at: S(92),  src: "c_1up.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.09, rate: 0.98 },
    { at: S(105), src: "c_powerbig.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.28, rate: 0.94 },
    { at: S(105), src: "c_clear.wav",    v: LEVELS.SFX_TEXTURE * db(3), dur: 0.14, rate: 0.94 },
  ],
  /* TEAM HAUL — same load, the crew on the tailgate; repos land at f14/36/62, thumps at f34/62 */
  pit: [
    { at: S(0),  src: "stage_hum.wav",  v: LEVELS.SFX_BED,  dur: 2.0,  rate: 0.88 },
    { at: S(0),  src: "sub.wav",        v: LEVELS.SFX_HERO, dur: 0.6,  rate: 0.7 },
    ...[0, 6].map((a2, i) => ({ at: S(a2), src: "thock.wav", v: LEVELS.SFX_TEXTURE * db(-1 + i * 0.5), dur: 0.14, rate: 0.74 + i * 0.06 })),
    ...[12, 36, 62].map((a2, i) => ({ at: S(a2), src: "mech_clank.wav", v: LEVELS.SFX_HERO * db(-1 + i), dur: 0.22, rate: 0.98 - i * 0.05 })),
    ...[12, 36, 62].map((a2, i) => ({ at: S(a2), src: "sub.wav", v: LEVELS.SFX_MID * db(-2 + i), dur: 0.32, rate: 0.82 - i * 0.03 })),
    ...[14, 38, 64].map((a2, i) => ({ at: S(a2), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-2 + i * 0.6), dur: 0.28, rate: 1.06 + i * 0.06 })),
    { at: S(30), src: "thock.wav",      v: LEVELS.SFX_MID,  dur: 0.16, rate: 0.84 },
    { at: S(66), src: "chrome_shine.wav",  v: LEVELS.SFX_TEXTURE * db(0), dur: 0.30, rate: 0.98 },
    { at: S(94), src: "thock.wav",      v: LEVELS.SFX_TEXTURE * db(-1), dur: 0.14, rate: 0.9 },
    { at: S(94),  src: "c_1up.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.09, rate: 1.12 },
    { at: S(105), src: "c_powerbig.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.28, rate: 1.06 },
    { at: S(105), src: "c_clear.wav",    v: LEVELS.SFX_TEXTURE * db(3), dur: 0.14, rate: 1.08 },
  ],

};

export const SFX: Cue[] = [

  /* ---- S1 · TAG: the chain drops, the lamp snaps */
  /* ⛔ "First, AnyDoc." fills the whole 1s scene, so its cues are TEXTURE-level ticks only */
  { at: S(L.S1 + 9),  src: "tick.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.06, rate: 0.8 },

  /* ---- S2 · THE JAM: three files slide, three hits, glyph spray */
  /* the three hits land on "PowerPoint" / "Word" / "breaks" — never on "formatting." */
  ...[0, 6, 44].map((a2, i) => ({ at: S(L.S2 + a2), src: "ticket_click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 0.9 + i * 0.1 })),
  ...[13, 24, 62].map((a2, i) => ({ at: S(L.S2 + a2), src: "punch_thud.wav", v: LEVELS.SFX_HERO * db(-3 + i * 1.5), dur: 0.28, rate: 0.9 + i * 0.06 })),
  ...[14, 25, 63].map((a2, i) => ({ at: S(L.S2 + a2), src: "ceramic_crack.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.24, rate: 1.0 + i * 0.1 })),
  /* ⭐ HE GOES CRITICAL ON THE THIRD FILE (rev 11). `motor_sag` pitched down is the shop's own
     "a machine is dying" sound and it is already in this bank; it layers UNDER the third punch so
     the sound and the picture turn on the same frame. 0.30s, ending at 6.73s — clear of
     "formatting." (6.82) ([[feedback_a_cue_may_be_a_transient_not_a_texture]]). */
  { at: S(L.S2 + 62), src: "motor_sag.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.30, rate: 0.72 },

  /* ---- S3 · THE PRESS: rollers grab, chaff falls, a sheet slides out, the dial ticks */
  { at: S(L.S3 + 8),  src: "ratchet.wav",     v: LEVELS.SFX_MID * db(-2), dur: 0.30, rate: 1.04 },
  ...[40, 72].map((a2, i) => ({ at: S(L.S3 + a2), src: "mech_clank.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.16, rate: 0.9 + i * 0.1 })),
  ...[18, 50, 82].map((a2, i) => ({ at: S(L.S3 + a2), src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 1.7 + i * 0.08 })),
  ...[26, 58, 90].map((a2, i) => ({ at: S(L.S3 + a2), src: "sign_clack.wav", v: LEVELS.SFX_MID * db(-3 + i), dur: 0.26, rate: 0.96 + i * 0.06 })),
  { at: S(L.S3 + 52), src: "thock.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 1.1, lead: 0 },

  /* ---- S4 · THE READ: the belt, the lift of the sheet, lines going green, the tick */
  { at: S(L.S4 + 36), src: "ticket_click.wav", v: LEVELS.SFX_MID,  dur: 0.16, rate: 0.95 },
  { at: S(L.S4 + 58), src: "thock.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 1.0, lead: 0 },
  ...[64, 74, 84, 94].map((a2, i) => ({ at: S(L.S4 + a2), src: "pickup_chime.wav", v: LEVELS.SFX_TEXTURE * db(-3), dur: 0.22, rate: 0.9 + i * 0.09 })),
  /* the tick lands after "perfectly." has finished (14.83 + 0.2), lead 0 so it stays clear */
  { at: S(L.S4 + 88),  src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.20, rate: 1.0, lead: 0 },

  /* ---- S5 · TAG */
  { at: S(L.S5 + 9),  src: "tick.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.06, rate: 0.85 },

  /* ---- S6 · THE CRAM: agents land, the tangle glitches, one goes dead */
  ...[10, 26, 46, 66].map((a2, i) => ({ at: S(L.S6 + a2), src: "ui_tap.wav", v: LEVELS.SFX_MID * db(-2 + i), dur: 0.12, rate: 0.9 + i * 0.08 })),
  ...[50, 53].map((a2, i) => ({ at: S(L.S6 + a2), src: "wrench_clank.wav", v: LEVELS.SFX_TEXTURE * db(-2), dur: 0.08, rate: 0.9 + i * 0.15 })),
  { at: S(L.S6 + 60), src: "line_dead.wav",   v: LEVELS.SFX_MID * db(-4), dur: 0.30, rate: 1.0 },

  /* ---- S7 · THE SPLIT: the screen snaps wide, two dividers slam, lamps snap on */
  { at: S(L.S7 + 9),  src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.36, rate: 0.9 },
  { at: S(L.S7 + 16), src: "sign_clack.wav",  v: LEVELS.SFX_MID,  dur: 0.26, rate: 1.0 },
  { at: S(L.S7 + 30), src: "sign_clack.wav",  v: LEVELS.SFX_MID,  dur: 0.26, rate: 1.08 },
  ...[38, 44, 50, 56].map((a2, i) => ({ at: S(L.S7 + a2), src: "snap.wav", v: LEVELS.SFX_TEXTURE * db(-2), dur: 0.12, rate: 1.0 + i * 0.08 })),
  { at: S(L.S7 + 62), src: "ui_tap.wav",      v: LEVELS.SFX_MID,  dur: 0.12, rate: 1.1 },

  /* ---- S8 · THE PLUGBOARD: the tag drops, six cartridges click, the model seats */
  { at: S(L.S8 + 13), src: "thock.wav",       v: LEVELS.SFX_MID,  dur: 0.18, rate: 0.9 },
  ...[26, 34, 42, 50, 58].map((a2, i) => ({ at: S(L.S8 + a2), src: "mech_clank.wav", v: LEVELS.SFX_MID * db(-4 + i * 0.8), dur: 0.16, rate: 0.96 + i * 0.05 })),
  /* the MODEL seats at f65 = 24.53s, finished before "plugin." (24.85) */
  { at: S(L.S8 + 65), src: "mech_clank.wav",  v: LEVELS.SFX_HERO, dur: 0.20, rate: 0.82 },
  { at: S(L.S8 + 65), src: "sub.wav",         v: LEVELS.SFX_MID,  dur: 0.26, rate: 0.9 },

  /* ---- S9 · THE SWAP: claw descends, grabs, refuses, tears, the new core drops */
  { at: S(L.S9 + 28), src: "motor_sag.wav",   v: LEVELS.SFX_MID * db(-3), dur: 0.34, rate: 1.0 },
  { at: S(L.S9 + 44), src: "mech_clank.wav",  v: LEVELS.SFX_MID,  dur: 0.16, rate: 1.0 },
  { at: S(L.S9 + 52), src: "metal_ping.wav",  v: LEVELS.SFX_HERO, dur: 0.30, rate: 0.96 },
  { at: S(L.S9 + 52), src: "ceramic_crack.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.26, rate: 0.9 },
  /* the lock at f71 = 27.70s is finished before "one." (28.00), the sentence's last word */
  { at: S(L.S9 + 71), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.30, rate: 1.0 },
  /* ⭐ the brain lands and POWERS UP — Alex, rev 4: "it should start glowing and making some
     interesting sound because it's elevated". A game power-up under the impact, not instead of it. */
  { at: S(L.S9 + 58), src: "c_power.wav",  v: LEVELS.SFX_MID * db(-3), dur: 0.50, rate: 0.92 },
  { at: S(L.S9 + 64), src: "c_powerbig.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.34, rate: 0.9 },
  { at: S(L.S9 + 71), src: "sub.wav",         v: LEVELS.SFX_MID,  dur: 0.26, rate: 0.8 },
  { at: S(L.S9 + 72), src: "pickup_chime.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.24, rate: 1.18 },

  /* ---- S10 · GOD TIER: the column snaps, four lamps, the fanfare, a bell */
  { at: S(L.S10 + 9),  src: "spotlight_snap.wav", v: LEVELS.SFX_HERO, dur: 0.30, rate: 1.0 },
  ...[8, 14, 20, 26].map((a2, i) => ({ at: S(L.S10 + a2), src: "neon_on.wav", v: LEVELS.SFX_MID * db(-4 + i), dur: 0.30, rate: 0.9 + i * 0.09 })),
  { at: S(L.S10 + 30), src: "gold_stamp.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.22, rate: 0.9 },

  /* ---- S11 · TAG */
  { at: S(L.S11 + 9),  src: "tick.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.06, rate: 0.82 },

  /* ---- S12 · THE MANIFOLD: the gauge sinks, the error lamp, the switch, the flow, the tokens */
  { at: S(L.S12 + 34), src: "line_dead.wav",  v: LEVELS.SFX_MID,  dur: 0.36, rate: 0.9 },
  { at: S(L.S12 + 38), src: "alarm.wav",      v: LEVELS.SFX_MID * db(-6), dur: 0.40, rate: 1.0 },
  { at: S(L.S12 + 58), src: "thock.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 1.0, lead: 0 },
  { at: S(L.S12 + 62), src: "knife_switch.wav", v: LEVELS.SFX_HERO, dur: 0.20, rate: 1.0 },
  { at: S(L.S12 + 74), src: "mech_clank.wav", v: LEVELS.SFX_MID,  dur: 0.16, rate: 1.1 },
  ...[80, 94, 108].map((a2, i) => ({ at: S(L.S12 + a2), src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 1.5 + i * 0.1 })),
  { at: S(L.S12 + 84), src: "spotlight_snap.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.22, rate: 1.1 },
  { at: S(L.S12 + 120), src: "thock.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 1.0, lead: 0 },
  ...[124, 133, 142, 151].map((a2, i) => ({ at: S(L.S12 + a2), src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 1.3 + i * 0.12 })),
  { at: S(L.S12 + 146), src: "knife_switch.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.20, rate: 1.06 },

  /* ---- S13 · THE ROLL-OUT: the lift lowers, the keyword types, SEND */
  { at: S(L.S13 + 9),  src: "motor_sag.wav",  v: LEVELS.SFX_MID * db(-3), dur: 0.40, rate: 0.9 },
  { at: S(L.S13 + 26), src: "thock.wav",      v: LEVELS.SFX_MID,  dur: 0.16, rate: 0.8 },
  ...[4, 8, 12, 16, 19].map((a2, i) => ({ at: S(L.S13 + a2), src: "ui_tap.wav", v: LEVELS.SFX_TEXTURE * db(-1 + (i % 3) * 0.6), dur: 0.10, rate: 1.0 + (i % 3) * 0.06 })),
  /* ⛔ the reel was trimmed to 1222 and SEND moved to f42; this cue sat at f56 = 40.87s, past the
     end of the file, and verify_reel called it DEAD. A cue is a beat, not a constant. */
  { at: S(L.S13 + 22), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.30, lead: 0 },
  /* ⭐⭐ REV 4 — Alex: "have more SFX design here and better SFX design here." Every new event gets
     its own cue, LAYERED under the existing hit rather than replacing it (docs/SOUND-DESIGN §2b):
     a gem landing is a collect, the absorb is a power-up, a scan head is a shine, a line going
     green is a blip, the MODEL seating is an unlock. ⛔ None of them lands on a sentence-final word
     — tools/rps_cue_collisions.py is run after every one of these. */
  ...[11, 43, 75].map((a2, i) => ({ at: S(L.S3 + a2), src: "chrome_shine.wav", v: LEVELS.SFX_TEXTURE * db(-3 + i * 0.5), dur: 0.34, rate: 0.96 + i * 0.07 })),
  ...[54, 72].map((a2, i) => ({ at: S(L.S4 + a2), src: "blip3.wav", v: LEVELS.SFX_TEXTURE * db(-4 + i), dur: 0.09, rate: 1.05 + i * 0.12 })),
  { at: S(L.S6 + 24), src: "blip5.wav",       v: LEVELS.SFX_TEXTURE * db(-3), dur: 0.10, rate: 0.9 },
  { at: S(L.S6 + 52), src: "blip5.wav",       v: LEVELS.SFX_TEXTURE * db(-2), dur: 0.10, rate: 0.82 },
  { at: S(L.S8 + 65), src: "c_collect.wav",   v: LEVELS.SFX_MID * db(-3), dur: 0.20, rate: 0.8 },
  { at: S(L.S12 + 96), src: "c_collect.wav",  v: LEVELS.SFX_MID * db(-4), dur: 0.24, rate: 0.86 },
];

/* ---- THE MUSIC -----------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK (Another Day Of Sun / Every Living
   Breathing Moment), cut to a passage that opens strong and peaks mid-reel,
   with the midrange restored so a phone speaker hears it (bed_spectrum_not_level).
   ⛔ THREE CUTS GET THREE PASSAGES — an audio-only variant is a pixel duplicate. */
const BED: Record<Variant, string> = {
  house: "137repos_bed.wav", amber: "137repos_bed_amber.wav", steel: "137repos_bed_steel.wav",
};
const CAP_Y: Record<Variant, number> = { house: 1272, amber: 1348, steel: 1200 };
/** ⛔ re-solved on THESE files by tools/rps_beds.py; the standing cap is 0.25 */
export const BED_GAIN: Record<Variant, number> = { house: db(5.5), amber: db(5.5), steel: db(5.5) };
export const BED_QUIET = db(-6);

/** sentence tails, from the words file, widened to the measured ends: the bed
    steps back 5 dB across each so the last word has the room to itself */
const TAILS: Array<[number, number]> = [
  [3.05, 3.55], [4.05, 4.55], [7.30, 7.85], [10.85, 11.30], [15.05, 15.75], [16.05, 16.55],
  [19.05, 19.60], [22.00, 22.50], [24.85, 25.45], [28.35, 29.20], [31.30, 32.05], [32.70, 33.30],
  [38.60, 39.15], [40.10, 40.95],
];
const tailDuck = (t: number) => {
  for (const [a, b] of TAILS) if (t >= a && t <= b) return db(-5 * Math.min(1, Math.min(t - a, b - t) / 0.08));
  return 1;
};
const bedEnv = (f: number) => {
  const t = f / FPS;
  if (t < 1.0) return db(-2);
  if (t < 28.0) return db(0);
  if (t < 32.0) return db(1);
  if (t < 38.8) return db(0);
  const k = Math.min(1, (t - 38.8) / 0.2);
  return db(-9 * k);
};
const bedMix = (f: number) => bedEnv(f) * tailDuck(f / FPS);

/** ⏳ picked by measurement (THE-OPEN gate + the winners' checklist); all three
    ship as trial cuts, so the pick decides only which cut is the main post. */
export const PICKED: HookId = "lift";
export const HOOK_OF: Record<Variant, HookId> = { house: "lift", amber: "drop", steel: "pit" };

export const makeReel = (v: Variant, quiet = false, hook: HookId = HOOK_OF[v]): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("repos137_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={(fr) => LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1) * bedMix(fr)} />
      <SfxTrack cues={[...HOOK_SFX[hook], ...SFX]} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
            {/* ⛔ the three title beats are no longer scenes: the next scene starts `lead` frames
                early and the repo card rides in at the top of it (Alex, rev 7). */}
            <Sequence from={L.S1} durationInFrames={DUR.S1 + DUR.S2}><JAM v={v} dur={DUR.S1 + DUR.S2} lead={DUR.S1} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><PRESS v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><READ v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5 + DUR.S6}><CRAM v={v} dur={DUR.S5 + DUR.S6} lead={DUR.S5} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><SPLIT v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><PLUGS v={v} dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><SWAP v={v} dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><GODTIER v={v} dur={DUR.S10} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11 + DUR.S12}><MANIFOLD v={v} dur={DUR.S11 + DUR.S12} lead={DUR.S11} /></Sequence>
            <Sequence from={L.S13} durationInFrames={DUR.S13}><ROLLOUT v={v} dur={DUR.S13} /></Sequence>
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
   The hook header is the PROMISE in the viewer's words; body headers carry a
   VERIFIED fact the VO does not state (feedback_headers_state_the_claim).
   ⛔ The FIRST band gets a head start so the claim is fully rendered on frame
   0 — the one frame guaranteed to be seen, and the feed thumbnail.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "UPGRADE YOUR CLAUDE",  hot: "4 FREE REPOS" },
  { from: L.S1,  big: "ANYDOC · ★20,397",     hot: "ALSO PDF · EPUB · CSV" },
  { from: L.S5,  big: "HERDR · ★35,522",      hot: "SEE WHO IS BLOCKED" },
  { from: L.S8,  big: "DEEPSEEK HARNESS",     hot: "★213,060 · MODEL IS A PLUGIN" },
  { from: L.S11, big: "OMNIROUTE · ★61,564",  hot: "352 PROVIDERS · 150+ FREE" },
  { from: L.S13, big: "COMMENT REPOS",        hot: "ALL 4 LINKS · FREE" },
];
const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const cand of BANDS) if (f >= cand.from) b = cand;
  return <HookHeader big={b.big} hot={b.hot} f={b === BANDS[0] ? f + 12 : f - b.from} />;
};

export { HookCut };
export const ClaudeRepos137Reel = makeReel("house");
export const ClaudeRepos137Amber = makeReel("amber");
export const ClaudeRepos137Steel = makeReel("steel");
