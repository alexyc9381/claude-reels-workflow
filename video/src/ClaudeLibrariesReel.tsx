import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, CAM, GRADE } from "./LibScenes";
import type { Variant } from "./LibScenes";
import { CamCtx } from "./LibWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_libraries.json";

/* ===========================================================================
   REEL 111 · "LIBRARIES" — THE FRONTAGE.  Board: storyboards/111-libraries.md.

   Subject: three UI/animation component libraries — Skiper UI, Vengeance UI,
   Animmaster Lib. An AI-generated site is a bare grey shell on a night high
   street; three crates land on the pavement and three crews fit it out until it
   out-burns the $10,000 agency tower across the road, with no designer on site.

   VO: public/vo_111libraries.wav — 33.49s, 121 words, cut from a 46.07s raw
   take. ONE `cut cut` flub removed (the whole first take of the Skiper line),
   the lead and tail trimmed, two long pauses tightened, two-pass loudnorm to
   -18.0 LUFS. The cut file was re-transcribed and 0 flubs survived.

   ⛔⛔ THE VO SHIPS AT x1.00 AND THAT IS A GATE RESULT, NOT AN OVERSIGHT.
      R1 (playbook C3) binds: hook window <= 4.0 wps, and ANY 5s window > 4.5
      wps means the speedup comes DOWN. Measured across every candidate tempo:

        x1.00  dur 33.49  hook 3.60  worst-5s 4.40   PASS
        x1.05  dur 31.90  hook 3.70  worst-5s 4.80   FAIL
        x1.10  dur 30.45  hook 3.90  worst-5s 4.80   FAIL
        x1.15  dur 29.12  hook 4.20  worst-5s 5.00   FAIL

      Every piecewise map was tried too (hook held at 1.00 with the body at
      1.08-1.14, the CTA protected): all of them put the worst window at 4.80.
      This VO is simply dense, and gap-trimming — which is a standing Alex rule
      — made it denser. Playbook C2: *"tightening raises words-per-second, so R1
      may now fail and the tempo must come DOWN. Tight != fast."*

   ⭐ 33.49s is outside the stated 22-29s house range and inside what actually
      ships (107 CLAUDE 35.06 · 110 FLOW 31.36 · 109 PLUGINS3 31.65). FLAGGED,
      not silently trimmed. Dropping the second setup sentence ("These three UI
      libraries you can plug instantly...") would land 29.9s and is a one-line
      change — but cutting spoken content is not a call to make silently.

   ⛔⛔ THE HONESTY LEDGER LIVES IN LibWorld.tsx (`R`, `FREE_BANNED`,
      `PRICE_BANNED`, `COUNT_BANNED`). The one that matters:
      the VO says all three libraries are **free**. Two are; Animmaster Lib is
      PAID ($3/$4.99/$8 one-time). So NO library carries a price plate, a `$0`
      or a `FREE` stamp anywhere in the reel — the only money on screen is the
      agency's `$10,000`, which is the VO's own word. Each library's receipt is
      its COMPONENT COUNT, which is true of all three.

   ⛔⛔ THE HEADER IS ON FOR ALL 1005 FRAMES, rendered HERE at root, outside
      every Sequence — never per-scene, never dropped after the hook. It is fed
      `f + 12` on the hook so it is SETTLED on frame 0. It also CHANGES per
      section: reel 107 taught that the header must never disappear, and reel
      108 taught that that is not the same instruction as saying one thing for
      the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1005 frames = 33.50s. The VO file runs 33.493s and its last word is still
    sounding at 33.08s, so the reel carries the tail and hard-cuts after it. */
export const LIB_TOTAL = 1005;

/* ⛔ MEASURED WORD ONSETS from src/data/words_libraries.json, converted to
   frames. Nothing here is estimated — every value is `round(onset * 30)` of the
   VO's own sentence starts. */
export const L = {
  S0: 0,      /* QUOTE     0.00s  "Web developers charge thousands"        */
  S1: 74,     /* PAVEMENT  2.45s  "These three libraries do it for free"   */
  S2: 155,    /* SHELL     5.18s  "you can plug instantly into any site"   */
  S3: 271,    /* CRATE 1   9.02s  "First, Skiper UI."                      */
  S4: 304,    /* DECK     10.12s  "Cards, pricing, layouts..."             */
  S5: 444,    /* CRATE 2  14.80s  "Second, Vengeance UI."                  */
  S6: 476,    /* GANTRY   15.87s  "Cinematic animations..."                */
  S7: 624,    /* CRATE 3  20.81s  "Third, Animmaster Lib."                 */
  S8: 656,    /* RACK     21.88s  "Over 250 pre built components..."       */
  S9: 832,    /* PAYOFF   27.75s  "This is a website that looks like..."   */
  S10: 939,   /* CTA      31.31s  "Comment LIBRARIES below..."             */
  END: LIB_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ RUN `tools/sfx_audit.py` BEFORE BUILDING THIS BANK, NOT AFTER. Reel 109
   built a 44-cue bank that sounded right by name and had **14 cues fail on
   measurement** — hiss, air, over-ring and slap are not audible from a filename.

   ⛔⛔ AND A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110's v1 passed every gate
   with **24 of 41 cues out of one chiptune pack** (every `c_*` file), because
   `sfx_audit` measures spectra and has no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: **the bank has to belong to the WORLD.** This reel is a night
   street build — slate, latches, knife switches, crane gear, drawers, clacks
   and bulb ticks. **ZERO chiptune cues.** The greppable gate is a grep for the
   chiptune prefix over this file, which must return 0.

   ⛔⛔ AND FIVE CUES IN THE FIRST DRAFT FAILED `sfx_audit` ON MEASUREMENT WHILE
   SOUNDING RIGHT BY NAME — the exact reel-109 trap. All five were AIR (a long
   soft attack with most of its energy above 2kHz), which is the "puff of air"
   note that cost reel 107 five rounds:
       chain_clank      AIR       -> mech_clank    30.4% >2kHz
       lib_deep_whoosh  NAMED AIR -> crusher       33.3% >2kHz
       scanner_sweep    AIR 4.5%  -> stage_hum      0.3% >2kHz
       split_flap       AIR 56.7% -> mech_clank    (also clears the SLAP GATE
                                     for repeated use, which split_flap did not)
       wire_travel      AIR 79.7% -> chair_knock   10.8% >2kHz
   ⭐ RUN THE AUDIT BEFORE THE BANK IS WRITTEN, NOT AFTER.

   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz, so the bright
   ones (`sign_clack`, `split_flap`, `ticket_click`, `ui_tap`) are capped at
   FOUR uses each and the low ones carry the repetition.
   ⛔ Every `dur` is >= the file's measured true length so no tail is chopped
   mid-decay, EXCEPT where a long one-shot is deliberately truncated under the
   over-ring gate (a slam does not sustain for five seconds).

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count per scene peaks on S8 and S9 —
   the two scenes that carry the story — and thins everywhere else. A flat bank
   reads as busy AND unranked, which is what "too many sfx" means.
     S0 5 · S1 4 · S2 4 · S3 3 · S4 5 · S5 2 · S6 5 · S7 2 · S8 7 · S9 5 · S10 4
   46 cues / 33.49s = **1.37 per second**, inside the house range
   (95 TOOLS 0.98 · 105 FREE 1.13 · 106 SKILL 1.48 · a REJECTED 107 pass 3.82).
   ------------------------------------------------------------------------ */
const S = (f: number) => f / FPS;

const SFX: Cue[] = [
  /* ---- S0 · THE QUOTE. Frame 0 gets the heaviest cue stack of the open. ---- */
  { at: S(L.S0 + 0),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.7, rate: 0.72 },
  { at: S(L.S0 + 8),  src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.14 },
  { at: S(L.S0 + 26), src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.02 },
  { at: S(L.S0 + 44), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 1.5, rate: 0.90 },
  { at: S(L.S0 + 44), src: "sub.wav",          v: LEVELS.SFX_MID,     dur: 1.8, rate: 0.86 },

  /* ---- S1 · THE PAVEMENT. Three landings, pitched down the ranks. ---- */
  { at: S(L.S1 - 6),  src: "crusher.wav",      v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.15 },
  { at: S(L.S1 + 18), src: "impact.wav",        v: LEVELS.SFX_HERO,   dur: 1.1, rate: 1.06 },
  { at: S(L.S1 + 26), src: "impact.wav",        v: LEVELS.SFX_HERO,   dur: 1.1, rate: 0.97 },
  { at: S(L.S1 + 34), src: "impact_deep.wav",   v: LEVELS.SFX_HERO,   dur: 1.4, rate: 0.90 },

  /* ---- S2 · THE SHELL. The value floor, so the bank thins here too. ---- */
  { at: S(L.S2 + 34), src: "dead_thud.wav",     v: LEVELS.SFX_MID,    dur: 1.0, rate: 1.04 },
  { at: S(L.S2 + 52), src: "chair_knock.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.72 },
  { at: S(L.S2 + 54), src: "knife_switch.wav",  v: LEVELS.SFX_HERO,   dur: 0.9 },
  { at: S(L.S2 + 58), src: "data.wav",          v: LEVELS.SFX_MID,    dur: 1.6, rate: 1.10 },

  /* ---- S3 · CRATE ONE blows its lid. ---- */
  { at: S(L.S3 + 4),  src: "can_bong.wav",      v: LEVELS.SFX_HERO,   dur: 1.5, rate: 0.94 },
  { at: S(L.S3 + 4),  src: "spotlight_snap.wav", v: LEVELS.SFX_MID,   dur: 0.8 },
  { at: S(L.S3 + 14), src: "mech_clank.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 1.08 },

  /* ---- S4 · THE DECK. A crane bed plus the three named seats. ---- */
  { at: S(L.S4 + 0),  src: "machine_bed.wav",   v: LEVELS.SFX_BED,    dur: 4.8, rate: 0.94 },
  { at: S(L.S4 + 26), src: "thock.wav",         v: LEVELS.SFX_HERO,   dur: 1.0, rate: 1.04 },
  { at: S(L.S4 + 52), src: "thock.wav",         v: LEVELS.SFX_HERO,   dur: 1.0, rate: 0.95 },
  { at: S(L.S4 + 78), src: "sign_clack.wav",    v: LEVELS.SFX_MID,    dur: 0.9 },
  { at: S(L.S4 + 70), src: "gear_shift.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.7 },

  /* ---- S5 · CRATE TWO irises. Two cues only — it is one gesture. ---- */
  { at: S(L.S5 + 3),  src: "stage_hum.wav",     v: LEVELS.SFX_MID,    dur: 1.5 },
  { at: S(L.S5 + 3),  src: "spotlight_snap.wav", v: LEVELS.SFX_HERO,  dur: 0.9, rate: 0.94 },

  /* ---- S6 · THE GANTRY. The switch, the rank, the sweep. ---- */
  { at: S(L.S6 + 8),  src: "knife_switch.wav",  v: LEVELS.SFX_HERO,   dur: 0.9, rate: 0.92 },
  { at: S(L.S6 + 16), src: "lamp_clunk.wav",    v: LEVELS.SFX_MID,    dur: 0.8, rate: 1.06 },
  { at: S(L.S6 + 34), src: "lamp_clunk.wav",    v: LEVELS.SFX_MID,    dur: 0.8, rate: 0.96 },
  { at: S(L.S6 + 58), src: "stage_hum.wav",    v: LEVELS.SFX_MID,     dur: 2.4, rate: 0.82 },
  { at: S(L.S6 + 74), src: "gear_shift.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.7, rate: 0.95 },

  /* ---- S7 · CRATE THREE has no bottom. ---- */
  { at: S(L.S7 + 3),  src: "mech_clank.wav",    v: LEVELS.SFX_MID,    dur: 1.0, rate: 0.88 },
  { at: S(L.S7 + 8),  src: "crusher.wav",       v: LEVELS.SFX_HERO,   dur: 1.4, rate: 0.86 },

  /* ---- S8 · THE RACK. ⭐ THE DENSITY PEAK — 7 cues, and that contour is the
     point. Everything else in the reel runs 2-5. ---- */
  { at: S(L.S8 + 0),  src: "machine_bed.wav",  v: LEVELS.SFX_BED,     dur: 3.4, rate: 0.86 },
  { at: S(L.S8 + 96), src: "machine_bed.wav",  v: LEVELS.SFX_BED,     dur: 2.8, rate: 0.92 },
  { at: S(L.S8 + 10), src: "pneu_thunk.wav",    v: LEVELS.SFX_MID,    dur: 1.0, rate: 1.08 },
  { at: S(L.S8 + 26), src: "pneu_thunk.wav",    v: LEVELS.SFX_MID,    dur: 1.0, rate: 0.94 },
  { at: S(L.S8 + 60), src: "gear_shift.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.7, rate: 1.05 },
  { at: S(L.S8 + 100), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,   dur: 1.4, rate: 1.02 },
  { at: S(L.S8 + 120), src: "gear_shift.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.7, rate: 0.92 },
  { at: S(L.S8 + 164), src: "stamp_press.wav",  v: LEVELS.SFX_HERO,   dur: 1.1 },

  /* ---- S9 · THE PAYOFF. ⭐ The second peak. The tower dies audibly. ---- */
  { at: S(L.S9 + 2),  src: "temper_chime.wav",  v: LEVELS.SFX_MID,    dur: 1.8, rate: 0.94 },
  { at: S(L.S9 + 20), src: "temper_chime.wav",  v: LEVELS.SFX_MID,    dur: 1.8, rate: 1.06 },
  { at: S(L.S9 + 40), src: "neon_off.wav",      v: LEVELS.SFX_MID,    dur: 1.6, rate: 0.90 },
  { at: S(L.S9 + 40), src: "sub.wav",           v: LEVELS.SFX_TEXTURE, dur: 2.0, rate: 0.82 },
  { at: S(L.S9 + 84), src: "chair_knock.wav",   v: LEVELS.SFX_TEXTURE, dur: 1.0, rate: 0.90 },

  /* ---- S10 · THE MARQUEE. The keyword lands and the reel stops. ---- */
  { at: S(L.S10 + 4),  src: "ticket_click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 },
  { at: S(L.S10 + 6),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.08 },
  { at: S(L.S10 + 14), src: "mech_clank.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.90 },
  { at: S(L.S10 + 30), src: "temper_chime.wav", v: LEVELS.SFX_HERO,   dur: 2.2 },
];

/* ⛔ ONE BED ACROSS THREE CUTS IS NOT A VARIANT. The VO is the same recording
   and cannot change, so the bed is the only real audio-side lever against a
   fingerprint match. Three different SOURCE tracks, each stretched to 33.49s,
   faded and loudnormed to about -16.9 LUFS. */
const BED: Record<Variant, string> = {
  night: "111_libraries_bed.wav",     /* from 106 SKILL  */
  amber: "111_libraries_bed_b.wav",   /* from 103 TRADE  */
  steel: "111_libraries_bed_c.wav",   /* from 104 PLUGIN */
};

/** ⛔ a different caption band per cut — cheap, and it changes every frame */
const CAP_Y: Record<Variant, number> = { night: 1248, amber: 1320, steel: 1182 };

/** ⛔⛔ MEASURED, NOT COPIED FORWARD. Reel 110's `db(8)` trim was inherited from
    reel 108 without re-measuring against a different bed and ran the music 7 dB
    hot. The two stems here were measured against each other on build day:

      VO  file -18.0 LUFS x LEVELS.DIALOGUE (-6)  ->  -24.0 in the mix
      bed file -16.4 LUFS x LEVELS.MUSIC (-20) x db(0.5)  ->  -35.9

    gap **11.9 dB**, i.e. the house figure (~12 dB under the VO, "present, not
    competing"). ⭐ A gain that fixed one reel is not a constant.
    ⛔ The shared `LEVELS.MUSIC` is untouched; other reels are balanced to it. */
export const BED_TRIM = { loud: db(0.5), quiet: db(-5.5) } as const;

export const makeReel = (v: Variant, bed: keyof typeof BED_TRIM = "loud"): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_111libraries.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_TRIM[bed]} />
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
   headers don't change."* Both are true and they are not the same instruction —
   it is on for every frame AND it re-states the current claim, so the reel is
   legible to someone watching muted.
   ⭐ Each band names the MECHANISM in product nouns, never the theme.
   ⛔⛔ NOTHING HERE MAY SAY "FREE" OR CARRY A LIBRARY PRICE. The VO's "for free"
   is false for Animmaster Lib (a paid product), so the bands state the
   COMPONENT COUNT — the receipt that is true of all three.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "AN ANIMATED SITE",         hot: "AGENCY PRICE: $10,000" },
  { from: L.S1,  big: "THREE UI LIBRARIES",       hot: "DO THE SAME JOB" },
  { from: L.S2,  big: "PASTE INTO ANY SITE",      hot: "EVEN AN AI-GENERATED ONE" },
  { from: L.S3,  big: "SKIPER UI",                hot: "106 COMPONENTS" },
  { from: L.S4,  big: "CARDS · PRICING · LAYOUTS", hot: "READY-TO-USE BLOCKS" },
  { from: L.S5,  big: "VENGEANCE UI",             hot: "46 COMPONENTS · 9 FAMILIES" },
  { from: L.S6,  big: "CINEMATIC ANIMATIONS",     hot: "THE $10,000 AGENCY LOOK" },
  { from: L.S7,  big: "ANIMMASTER LIB",           hot: "250+ COMPONENTS" },
  { from: L.S8,  big: "SCROLL · HERO · MOUSE",    hot: "COPY AND PASTE" },
  { from: L.S9,  big: "LOOKS LIKE IT COST THOUSANDS", hot: "NO DESIGNER TOUCHED IT" },
  { from: L.S10, big: "COMMENT LIBRARIES",        hot: "AND I'LL SEND THE LINKS" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so it is SETTLED on frame 0 (SectionHeader fades in
     over 10 frames); every later band fades in on its own cut. */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelNight = makeReel("night");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
/** the same cut with the music bed 6 dB down — for an A/B on the bed level only */
export const ReelQuiet = makeReel("night", "quiet");
