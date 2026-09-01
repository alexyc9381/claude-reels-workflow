import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, CAM, GRADE } from "./WebScenes";
import type { Variant } from "./WebScenes";
import { CamCtx } from "./WebWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_web.json";

/* ===========================================================================
   REEL 124 · "WEB" — THE ARCADE.  Board: storyboards/124-web.md.

   Subject: an AI site builder that returns a 3D, scroll-animated, interactive
   site from one prompt, against the flat page every other builder returns.

   ⛔⛔ THE VO NEVER NAMES THE TOOL AND NEITHER DOES THE PICTURE. "someone just
   built a tool that…", "this one built something…", "Comment WEB for the free
   link." The name is the payload of the CTA. `dora.run` was investigated as the
   subject and is **NXDOMAIN** from this machine, so it appears nowhere — a URL
   that does not resolve is not a receipt. See WebWorld's `R` ledger and
   `NAME_BANNED`.

   VO: public/web_vo.wav — 32.73s, 135 words, cut from a 62.41s raw take.
   ⭐⭐ SIX `cut cut` FLUBS, NOT ONE. The first whole-file whisper pass found a
   single flub; re-transcribing the CUT file exposed five more that the merged
   segmentation had smoothed over. The reliable method — and the one this repo
   already learned on reel 101 — is to split the raw at every measured silence
   and transcribe each chunk SEPARATELY. That found: an aborted first take of
   the "so someone just built a tool" line, two aborted takes of the "Nothing
   Lovable or Replit" line, an aborted "And it handles the design", an aborted
   "ready to launch", and the "smooth cut cut" the first pass caught.
   The final wav was re-transcribed as a control: **0 flubs survive**.

   ⭐ 32.73s. Inside the band that actually ships (119 OX 28.72 · 118 LOOP 34.11
   · 120 UNLAZY 35.29 · 121 MISTAKE 44.65 · 122 HARDWARE 61.12) and just outside
   the playbook's stated 22-29s. FLAGGED, not silently trimmed — every second is
   spoken content and the cut already removes 29.7s of dead takes and flubs.

   ⛔⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
   KaraokeCaption track, the VO, the bed and the header. Scene bodies see
   AssemblyCtx = true so their own copies return null.
   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL — scene
   bodies are not Sequence-wrapped for audio purposes.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp.
   ========================================================================= */

export const FPS = 30;

/** 943 frames = 31.43s. The VO runs 34.940s and its last word is still sounding
    at 34.39s, so the reel carries the tail and hard-cuts after it.
    ⭐⭐ RE-TIMED ON ALEX'S NOTE: *"VO speed sounds kind of fast, and the gaps in
    the VO are a bit too long."* Those pull opposite ways on duration, which is
    why both are answerable at once — the inter-line pauses came DOWN
    and the tempo came down with them (x1.10 -> **x1.00**, no speedup at all).
    ⭐⭐ ROUND 5, on *"too long of a gap pause in between each section"* and *"at
    0 seconds needs to immediately start from second 0"*: both are one fix —
    stop padding into the surrounding silence and cut every line to its MEASURED
    energy (a -31 dB rising/falling edge), then insert one short fixed pause.
    Delivered gaps are now **0.11-0.20s** (were 0.28-0.55) and the first word
    starts at **0.015s** (was 0.470 — nearly half a second of dead air that
    `VO_ONSET_0` passed because the bed starts at zero).
    Measured: 4.12 -> **3.86 words/sec**, hook window 3.50 wps against the
    playbook's 4.0 bar. ⚠️ The worst 5s window is 5.00 wps at 11.8s, over the
    4.5 bar, and it is not fixable in the edit: the tempo is already 1.00, so
    that density is the raw take's own. Reel 111 hit the same wall and shipped
    at x1.00 for the same reason. */
export const WEB_TOTAL = 943;

/* ⛔ MEASURED WORD ONSETS from src/data/words_web.json, converted to frames.
   Nothing here is estimated — every value is `round(onset * 30)` of the VO's
   own sentence starts. */
export const L = {
  S0: 0,     /* FACE      0.00s  "Every AI website builder gives the same…" */
  S1: 66,    /* SLOT      2.21s  "so someone just built a tool that…"       */
  S2: 129,   /* PEEL      4.30s  ⭐ lands on the word "3D"                   */
  S3: 202,   /* WALK      6.75s  "It has real motion and interactive…"      */
  S4: 309,   /* FLAT     10.29s  "While Lovable gives you flat pages,"      */
  S5: 344,   /* AGENCY   11.48s  "…a full agency took 3 months to design."  */
  S6: 443,   /* KIOSK    14.77s  "I typed one prompt and it built a…"       */
  S7: 518,   /* PROOFS   17.27s  "Smooth scroll animations, depth layers…"  */
  S8: 613,   /* GAUGE    20.44s  "Nothing Lovable or Replit has ever…"      */
  S9: 682,   /* ARMS     22.73s  "It handles the design, the motion…"       */
  S10: 791,  /* LAUNCH   26.36s  "You just described the site…"             */
  S11: 908,  /* CTA      30.25s  "Comment WEB for the free link."           */
  END: WEB_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.END - L.S11,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count peaks on the two scenes that
   carry the story — S0 (the hook) and S10 (the payoff) — and thins everywhere
   else. A flat bank reads as busy AND unranked, which is what "too many sfx"
   means.  46 cues / 31.43s = **1.46 per second**, inside the house range
   (95 TOOLS 0.98 · 105 FREE 1.13 · 106 SKILL 1.48 · a REJECTED 107 pass 3.82).

   ⛔⛔⛔ `pneu_thunk` AND `crusher` ARE BANNED FOREVER (they are the "puff of
   air" that cost reel 107 five rounds). Neither appears below.
   ⛔ THE BANK BELONGS TO THE WORLD. This is a night arcade with a press in it:
   slate, stamps, latches, ratchets, tube travel, servos, bulb ticks and
   chimes. **ZERO chiptune cues** — the greppable gate is a grep for `c_` over
   this file, which must return 0.
   ⛔ Every `dur` is >= the file's measured true length, so no tail is chopped
   mid-decay.
   ⛔ SLAP GATE: no bright sample is used more than four times.
   ------------------------------------------------------------------------ */
const S = (f: number) => f / FPS;

const SFX: Cue[] = [
  { at: S(0), src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.9, rate: 0.86 },
  { at: S(0), src: "sub.wav", v: LEVELS.SFX_MID, dur: 1.2, rate: 0.84 },
  { at: S(L.S0 + 6), src: "ratchet.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7, rate: 0.88 },
  { at: S(L.S0 + 24), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 0.92 },
  { at: S(L.S0 + 24), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.9 },
  { at: S(L.S0 + 38), src: "gear_shift.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 0.84 },
  { at: S(L.S1 + 4), src: "ui_tap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 },
  { at: S(L.S1 + 30), src: "knife_switch.wav", v: LEVELS.SFX_HERO, dur: 0.4, rate: 0.9 },
  { at: S(L.S1 + 42), src: "data.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.18 },
  { at: S(L.S2 + 2), src: "motor_sag.wav", v: LEVELS.SFX_MID, dur: 1.1, rate: 0.9 },
  { at: S(L.S2 + 19), src: "ceramic_crack.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
  { at: S(L.S2 + 32), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.96 },
  { at: S(L.S2 + 52), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.1 },
  { at: S(L.S3 + 12), src: "chair_knock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.82 },
  { at: S(L.S3 + 26), src: "lamp_clunk.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.16 },
  { at: S(L.S3 + 70), src: "metal_ping.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.14 },
  { at: S(L.S4 + 5), src: "dead_thud.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.04 },
  { at: S(L.S4 + 15), src: "dead_thud.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.96 },
  { at: S(L.S5 + 0), src: "stage_hum.wav", v: LEVELS.SFX_BED, dur: 3.4, rate: 0.84 },
  { at: S(L.S5 + 24), src: "snap.wav", v: LEVELS.SFX_MID, dur: 0.3, rate: 0.94 },
  { at: S(L.S5 + 46), src: "snap.wav", v: LEVELS.SFX_MID, dur: 0.3, rate: 1.02 },
  { at: S(L.S5 + 70), src: "snap.wav", v: LEVELS.SFX_MID, dur: 0.3, rate: 1.12 },
  { at: S(L.S6 + 2), src: "stage_hum.wav", v: LEVELS.SFX_BED, dur: 2.6, rate: 0.94 },
  { at: S(L.S6 + 22), src: "ui_tap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3, rate: 0.94 },
  { at: S(L.S7 + 0), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.18 },
  { at: S(L.S7 + 33), src: "metal_ping.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.96 },
  { at: S(L.S7 + 52), src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.3, rate: 1.04 },
  { at: S(L.S7 + 76), src: "metal_ping.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.1 },
  { at: S(L.S8 + 4), src: "ratchet.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.22 },
  { at: S(L.S8 + 14), src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.4, rate: 0.78 },
  { at: S(L.S8 + 38), src: "data.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.88 },
  { at: S(L.S8 + 58), src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 1.4, rate: 1.04 },
  { at: S(L.S9 + 15), src: "knife_switch.wav", v: LEVELS.SFX_HERO, dur: 0.4, rate: 1.0 },
  { at: S(L.S9 + 28), src: "gear_shift.wav", v: LEVELS.SFX_HERO, dur: 0.4, rate: 0.92 },
  { at: S(L.S9 + 40), src: "spotlight_snap.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 1.06 },
  { at: S(L.S9 + 72), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.88 },
  { at: S(L.S9 + 88), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 1.08 },
  { at: S(L.S10 + 6), src: "neon_on.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.9 },
  { at: S(L.S10 + 24), src: "neon_on.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.98 },
  { at: S(L.S10 + 42), src: "neon_on.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 1.06 },
  { at: S(L.S10 + 60), src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 1.02 },
  { at: S(L.S10 + 89), src: "ticket_click.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.0 },
  { at: S(L.S10 + 89), src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.9, rate: 1.02 },
  { at: S(L.S10 + 96), src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 1.14 },
  { at: S(L.S11 + 4), src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
  { at: S(L.S11 + 16), src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 1.2, rate: 1.06 },
];

/* ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, NOT A SYNTHESISED PAD. Reels 107-114
   drifted onto generated beds one clone at a time with every audio gate green,
   and reel 116 got *"the BG music is completely wrong"* back. Counted across
   shipped work: `ados_bed*` 13 uses, `ebm_bed*` 8. ⛔ `ebm_bed.wav` has a 280ms
   lead-in that fails `verify_reel`'s MUSIC_ONSET_0, so this reel uses ados. */
const BED = "ados_bed_loud.wav";
const BED_TRIM = { on: 1, quiet: db(-6) / db(0) } as const;

const CAP_Y: Record<Variant, number> = { night: 1236, amber: 1210, steel: 1262 };

export const makeReel = (v: Variant, bed: keyof typeof BED_TRIM = "on"): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("web_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED)} volume={LEVELS.MUSIC * (bed === "quiet" ? 0.5 : 1)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0}  durationInFrames={DUR.S0}><S0 v={v} /></Sequence>
            <Sequence from={L.S1}  durationInFrames={DUR.S1}><S1 v={v} /></Sequence>
            <Sequence from={L.S2}  durationInFrames={DUR.S2}><S2 v={v} /></Sequence>
            <Sequence from={L.S3}  durationInFrames={DUR.S3}><S3 v={v} /></Sequence>
            <Sequence from={L.S4}  durationInFrames={DUR.S4}><S4 v={v} /></Sequence>
            <Sequence from={L.S5}  durationInFrames={DUR.S5}><S5 v={v} /></Sequence>
            <Sequence from={L.S6}  durationInFrames={DUR.S6}><S6 v={v} /></Sequence>
            <Sequence from={L.S7}  durationInFrames={DUR.S7}><S7 v={v} /></Sequence>
            <Sequence from={L.S8}  durationInFrames={DUR.S8}><S8 v={v} /></Sequence>
            <Sequence from={L.S9}  durationInFrames={DUR.S9}><S9 v={v} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><S11 v={v} /></Sequence>
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
   ⭐ Each band restates the CURRENT claim in product nouns, never the theme —
   so the reel is legible to somebody watching it muted.
   ⛔ Nothing here names a tool, and nothing here states a build time.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  /* ⭐ PLAIN AND CONCRETE, in the register Alex asked for ("Create 3D AI
     Websites"). The previous set was clever and abstract — "MEASURED, NOT
     CLAIMED", "THE AGENCY LOOK", "SCROLL · DEPTH · REACTION" — which is the
     theme talking, not the product. `feedback_headers_state_the_claim`: a band
     restates its VO line in PRODUCT NOUNS, and `feedback_plain_spoken_copy`:
     words people actually say, high-school reading level. Someone watching
     muted should be able to read any single band and know what is on offer. */
  { from: L.S0,  big: "EVERY AI WEBSITE BUILDER",     hot: "GIVES YOU THE SAME PAGE" },
  { from: L.S1,  big: "CREATE 3D AI WEBSITES",        hot: "FROM ONE PROMPT" },
  { from: L.S2,  big: "REAL 3D SCROLL SITES",         hot: "BUILT IN LAYERS" },
  { from: L.S3,  big: "THE PAGE REACTS TO YOU",       hot: "AS YOU SCROLL" },
  { from: L.S4,  big: "LOVABLE GIVES YOU",            hot: "A FLAT PAGE" },
  { from: L.S5,  big: "THE AGENCY RESULT",            hot: "WITHOUT THE 3 MONTHS" },
  { from: L.S6,  big: "ONE PROMPT",                   hot: "A FULLY INTERACTIVE SITE" },
  { from: L.S7,  big: "SMOOTH SCROLL AND DEPTH",      hot: "ON REAL LIVE PAGES" },
  { from: L.S8,  big: "ONE LAYER VS FIVE",            hot: "FLAT PAGE VS 3D SITE" },
  { from: L.S9,  big: "DESIGN, MOTION, INTERACTIONS", hot: "ALL FROM ONE PROMPT" },
  { from: L.S10, big: "DESCRIBE IT ONCE",             hot: "IT BUILDS THE WHOLE SITE" },
  { from: L.S11, big: "COMMENT WEB",                  hot: "AND I'LL SEND THE LINK" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so the header is SETTLED on frame 0 */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelNight = makeReel("night");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("night", "quiet");
