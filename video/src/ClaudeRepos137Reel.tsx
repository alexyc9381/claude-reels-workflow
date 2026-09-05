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
   firecrawl/anydoc (★20,358 MIT), herdrdev/herdr (★35,413 Apache-2.0),
   deepseek-ai/deepseek-harness (★212,632 MIT), diegosouzapw/OmniRoute
   (★61,383 MIT). Every figure verified 2026-09-05 against the GitHub API and
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
export const RPS_TOTAL = 1236;                       /* 41.18s x 30fps, +0.31s tail air */

/** ⛔ EVERY ONSET BELOW IS A SPLICE JOIN, i.e. a point of MEASURED SILENCE in
    the cut file — never a stored word end (which whisper places 20-200ms
    early). The next window's first word starts 0.08-0.10s after each. */
export const L = {
  S0: 0,      /* LIFT      hook · "These four brand new open source..."      0.00s */
  S1: 102,    /* TAG1      "First, AnyDoc."                                   3.41s */
  S2: 132,    /* JAM       "Feeding PowerPoint or Word files..."              4.41s */
  S3: 231,    /* PRESS     "So this tool strips all the junk..."              7.70s */
  S4: 333,    /* READ      "and it turns them into clean markdown..."        11.11s */
  S5: 468,    /* TAG2      "Next is herdr."                                  15.60s */
  S6: 492,    /* CRAM      "Managing multiple agents..."                     16.40s */
  S7: 583,    /* SPLIT     "So this tool upgrades your screen..."            19.42s */
  S8: 671,    /* PLUGS     "Then check out the DeepSeek Harness..."          22.37s */
  S9: 760,    /* SWAP      "So if your agent starts getting dumb..."         25.33s */
  S10: 873,   /* GODTIER   "and you instantly get a god tier..."             29.11s */
  S11: 958,   /* TAG4      "But finally, OmniRoute."                         31.94s */
  S12: 995,   /* MANIFOLD  "If Claude runs out of credits..."                33.16s */
  S13: 1170,  /* ROLLOUT   "Comment the word REPOS for all the links."       39.00s */
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
export const SFX: Cue[] = [
  /* ---- S0 · THE LIFT: ram hiss, two jolts that refuse, the rise, the lock */
  { at: S(L.S0 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,  dur: 2.0, rate: 0.88 },
  { at: S(L.S0 + 0),  src: "sub.wav",         v: LEVELS.SFX_HERO, dur: 0.6, rate: 0.7 },
  { at: S(L.S0 + 6),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,  dur: 0.16, rate: 0.92 },
  { at: S(L.S0 + 12), src: "mech_clank.wav",  v: LEVELS.SFX_MID,  dur: 0.16, rate: 1.06 },
  { at: S(L.S0 + 14), src: "ratchet.wav",     v: LEVELS.SFX_MID,  dur: 0.32, rate: 0.94 },
  ...[24, 36, 48].map((a2, i) => ({ at: S(L.S0 + a2), src: "tick.wav", v: LEVELS.SFX_TEXTURE * db(-2 + i), dur: 0.10, rate: 0.9 + i * 0.08 })),
  { at: S(L.S0 + 58), src: "mech_clank.wav",  v: LEVELS.SFX_HERO, dur: 0.20, rate: 0.84 },
  { at: S(L.S0 + 58), src: "sub.wav",         v: LEVELS.SFX_MID,  dur: 0.30, rate: 0.8 },
  { at: S(L.S0 + 60), src: "metal_ping.wav",  v: LEVELS.SFX_MID,  dur: 0.30, rate: 1.1 },
  { at: S(L.S0 + 66), src: "wrench_clank.wav", v: LEVELS.SFX_TEXTURE, dur: 0.18, rate: 0.9 },

  /* ---- S1 · TAG: the chain drops, the lamp snaps */
  /* ⛔ "First, AnyDoc." fills the whole 1s scene, so its cues are TEXTURE-level ticks only */
  { at: S(L.S1 + 9),  src: "tick.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.06, rate: 0.8 },

  /* ---- S2 · THE JAM: three files slide, three hits, glyph spray */
  /* the three hits land on "PowerPoint" / "Word" / "breaks" — never on "formatting." */
  ...[0, 6, 44].map((a2, i) => ({ at: S(L.S2 + a2), src: "ticket_click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 0.9 + i * 0.1 })),
  ...[13, 24, 62].map((a2, i) => ({ at: S(L.S2 + a2), src: "punch_thud.wav", v: LEVELS.SFX_HERO * db(-3 + i * 1.5), dur: 0.28, rate: 0.9 + i * 0.06 })),
  ...[14, 25, 63].map((a2, i) => ({ at: S(L.S2 + a2), src: "ceramic_crack.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.24, rate: 1.0 + i * 0.1 })),

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
  { at: S(L.S4 + 131), src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.20, rate: 1.0, lead: 0 },

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
  { at: S(L.S8 + 9),  src: "thock.wav",       v: LEVELS.SFX_MID,  dur: 0.18, rate: 0.9 },
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
  { at: S(L.S9 + 71), src: "sub.wav",         v: LEVELS.SFX_MID,  dur: 0.26, rate: 0.8 },
  { at: S(L.S9 + 72), src: "pickup_chime.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.24, rate: 1.18 },

  /* ---- S10 · GOD TIER: the column snaps, four lamps, the fanfare, a bell */
  { at: S(L.S10 + 4),  src: "spotlight_snap.wav", v: LEVELS.SFX_HERO, dur: 0.30, rate: 1.0 },
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
  { at: S(L.S13 + 30), src: "thock.wav",      v: LEVELS.SFX_MID,  dur: 0.16, rate: 0.8 },
  ...[22, 26, 30, 34, 38].map((a2, i) => ({ at: S(L.S13 + a2), src: "ui_tap.wav", v: LEVELS.SFX_TEXTURE * db(-1 + (i % 3) * 0.6), dur: 0.10, rate: 1.0 + (i % 3) * 0.06 })),
  { at: S(L.S13 + 56), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.30, lead: 0 },
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
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><TAG1 v={v} dur={DUR.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><JAM v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><PRESS v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><READ v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><TAG2 v={v} dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><CRAM v={v} dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><SPLIT v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><PLUGS v={v} dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><SWAP v={v} dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><GODTIER v={v} dur={DUR.S10} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><TAG4 v={v} dur={DUR.S11} /></Sequence>
            <Sequence from={L.S12} durationInFrames={DUR.S12}><MANIFOLD v={v} dur={DUR.S12} /></Sequence>
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
  { from: L.S1,  big: "ANYDOC · ★20,358",     hot: "ALSO PDF · EPUB · CSV" },
  { from: L.S5,  big: "HERDR · ★35,413",      hot: "SEE WHO IS BLOCKED" },
  { from: L.S8,  big: "DEEPSEEK HARNESS",     hot: "★212,632 · MODEL IS A PLUGIN" },
  { from: L.S11, big: "OMNIROUTE · ★61,383",  hot: "352 PROVIDERS · 150+ FREE" },
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
