import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S8 as EMPTY, S13 as GATE, S14 as KEY, S15 as OPEN,
  T1, T2, T3, SALE_A, SALE_B, SETUP2, CAM, GRADE,
} from "./BuildScenes";
import type { Variant } from "./BuildScenes";
import { CamCtx } from "./BuildWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import { HOOKS, HOOK_BANDS } from "./BuildHooks";
import type { HookId } from "./BuildHooks";
import words from "./data/words_133build.json";

/* ===========================================================================
   REEL 133 · "BUILD" — THE ASSEMBLY.  Board: storyboards/133-build.md.

   Subject: three free, open-source AI tools you can install in minutes and
   resell as a service — MoneyPrinterTurbo (one topic to a finished short),
   GPT-SoVITS (one minute of voice to a clone) and Hunyuan3D (one flat photo to
   a textured 3D mesh) — and the guide covering how to build, market and sell
   them, which is the lead magnet and the CTA.

   ⭐⭐⭐ REBUILT AFTER v1. Alex: *"use real logos and graphics wherever possible,
   right now it's just random scenes, not hierarchical enough nor interesting,
   I can't even tell what's going on in each scene, it's way too odd and
   confusing."* Three complaints, three causes:

     "random scenes"        16 places in 30s = 1.9s each, so nothing landed.
                            -> ELEVEN scenes; each tool owns ONE place for ~5s.
     "not hierarchical"     every scene ran a machine AND a crew AND a band AND
                            props. -> ONE dominant object per scene, nothing
                            else above knee height.
     "can't tell what's     the tools were METAPHORS (a mill, a lathe, a scan
      going on"             gantry) and a metaphor has to be DECODED.
                            -> each tool OPENS on its REAL GitHub plate and then
                            shows the LITERAL output.

   ⛔ THIS WAS reel 115's RULE, QUOTED IN `BuildProps.tsx` AND THEN BROKEN BY ME:
   *at half a second on a phone a viewer RECOGNISES A MARK; they do not decode a
   silhouette.* I reasoned "these repos have no brand mark, so draw machines" —
   and the mark that matters was GitHub the whole time, plus the star counts
   that are already in the ledger.

   ⛔⛔ EVERY MARK ON SCREEN IS SOURCED, AND NONE IS A RIVAL OR AN ENDORSEMENT:
     GitHub        all three ARE public repos; the star counts are theirs
     Hugging Face  `tencent/Hunyuan3D-2` is hosted there (99,849 dl last month)
     TikTok · Instagram · YouTube   MoneyPrinterTurbo's OWN README: "automatic
                   uploads to TikTok, Instagram and YouTube Shorts"
     Docker        its README's documented deploy method
     Shopify       Shopify's own docs: "Product media can include images, 3D
                   models, and videos"
     Fiverr · Upwork   spoken in the VO, twice each

   ⛔⛔ THE VO STATES NO FIGURE ABOUT MONEY AND THE FRAME STATES NONE EITHER.
   Every sale is a docket stamped SOLD. The only currency string anywhere is
   `$0`, which is what the tools cost and is spoken as "free".

   ⭐⭐ THE VO: 29.66s of speech from a 56.47s raw take, and the cut drops FIVE
   flubs and false starts, three of them INVISIBLE to a whole-file transcription
   because whisper merges a flubbed take and its retake and emits the sentence
   once. Splitting the raw at every measured silence and transcribing each chunk
   SEPARATELY is what surfaced them.
   ⛔ TEMPO IS x1.00, NOT THE HOUSE x1.10: once the dead takes are gone the take
   already runs 4.32 words per second.
   ⚠️ R1 IS FLAGGED, NOT FUDGED — the hook window is 4.80 wps against a 4.0 bar
   at zero speed-up. That is the recording's own pace.
   ⚠️ 29.93s is 0.9s above the 22-29s house range — flagged, not trimmed.
   ========================================================================= */

const FPS = 30;
export const BUILD_TOTAL = 898;                   /* CUT 29.93s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_133build.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,     /* ROW      hook · "You can sell these three free"        0.00s */
  S1: 72,    /* FITOUT   "And the best part"                           2.40s */
  S2: 142,   /* TOOL 1   "First, Money Printer Turbo"                  4.73s */
  S3: 297,   /* COUNTER  "to sell to businesses"                       9.90s */
  S4: 336,   /* TOOL 2   "Second, GPT SoVITS"                         11.19s */
  S5: 487,   /* EMPTY    "without recording anything"                 16.23s */
  S6: 531,   /* TOOL 3   "Third, Hunyuan 3D"                          17.71s */
  S7: 678,   /* ECOM     "So sell this to ecom brands"                22.61s */
  S8: 741,   /* GATE     "But none of these are useful"               24.71s */
  S9: 782,   /* KEY      "free guide I made covering how to build"    26.06s */
  S10: 863,  /* OPEN     "Comment BUILD for access"                   28.75s */
  END: BUILD_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff.

   ⛔ AND THE WHOLE `am/` PACK IS OUT, measured not assumed — every candidate
   from it came back NOISE-BED / HISS / AIR at 83-92% above 2 kHz, and
   `am/page-turn` is not 16-bit and crashes the reader. They were the obvious
   choices BY NAME for a film workshop, which is exactly reel 115's finding.
   Four more dropped on their own numbers: `split_flap` (161ms attack, AIR),
   `scanner_sweep` (AIR), `deep_engine` (SWELL-346ms), `shop_bed` (NOISE-BED).

   ⭐ THE BANK BELONGS TO THE WORLD: a shutter chain ratcheting, plates bolting
   to a wall, a render completing, a lathe, a scan, a turntable, a gate that
   will not move, and three plates struck into a cover. ZERO chiptune cues.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. Every BRIGHT cue is used at most
   four times, under the SLAP gate's threshold of five.

   ⭐ DENSITY IS A SHAPE. It PEAKS on S0 (the hook), S2 (the first tool, and the
   longest scene) and S9 (the peak), and thins to TWO on S5 — the scene whose
   whole point is that nobody is in the room.
   -------------------------------------------------------------------------- */
export const SFX: Cue[] = [
  /* ---- S0 · THE ROW. The heaviest stack — frame 0 is the interrupt. 7 --- */
  { at: S(L.S0 + 0),  src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 2.4, rate: 0.88 },
  { at: S(L.S0 + 0),  src: "sub.wav",         v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.74 },
  ...[6, 22, 36].map((a, i) => ({
    at: S(L.S0 + a), src: "ratchet.wav",
    v: LEVELS.SFX_MID * db(i * 1.1), dur: 0.5, rate: 0.92 + i * 0.1,
  })),
  { at: S(L.S0 + 42), src: "chair_knock.wav", v: LEVELS.SFX_MID,     dur: 0.3 },
  { at: S(L.S0 + 52), src: "gong.wav",        v: LEVELS.SFX_TEXTURE, dur: 1.4, rate: 1.28 },

  /* ---- S1 · THE FIT-OUT. Three real plates bolted to the wall. 4 -------- */
  { at: S(L.S1 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.3, rate: 1.05 },
  ...[19, 39, 59].map((a, i) => ({
    at: S(L.S1 + a), src: "rebuild_thud.wav",
    v: LEVELS.SFX_HERO * db(-2 + i * 1.0), dur: 0.8, rate: 0.94 + i * 0.07,
  })),

  /* ---- S2 · MONEY PRINTER TURBO. The longest scene and the first tool, so
     it carries a density peak: the plate, the cut, three stages on their
     measured spoken words, and the destinations. 8 ---------------------- */
  { at: S(L.S2 + 4),   src: "slate_whump.wav", v: LEVELS.SFX_HERO,   dur: 0.16 },
  { at: S(L.S2 + 6),   src: "impact_deep.wav", v: LEVELS.SFX_MID,    dur: 0.8, rate: 1.1 },
  { at: S(L.S2 + 46),  src: "thock.wav",       v: LEVELS.SFX_MID,    dur: 0.16 },
  { at: S(L.S2 + 60),  src: "motor_sag.wav",   v: LEVELS.SFX_BED,    dur: 0.85, rate: 1.1 },
  { at: S(L.S2 + 78),  src: "gear_shift.wav",  v: LEVELS.SFX_HERO,   dur: 0.09, rate: 0.98 },
  { at: S(L.S2 + 100), src: "knife_switch.wav", v: LEVELS.SFX_HERO,  dur: 0.12 },
  { at: S(L.S2 + 123), src: "mech_clank.wav",  v: LEVELS.SFX_HERO,   dur: 0.12 },
  { at: S(L.S2 + 134), src: "bell_ring.wav",   v: LEVELS.SFX_MID,    dur: 1.6, rate: 1.12 },

  /* ---- S3 · THE COUNTER. A slide and a stamp. 2 ------------------------ */
  { at: S(L.S3 + 4),  src: "twang.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.9 },
  { at: S(L.S3 + 20), src: "stamp_press.wav",  v: LEVELS.SFX_HERO,    dur: 0.34 },

  /* ---- S4 · GPT SoVITS. Plate, cut, the minute, the copies. 5 ---------- */
  { at: S(L.S4 + 4),   src: "slate_whump.wav", v: LEVELS.SFX_HERO,   dur: 0.16, rate: 1.08 },
  { at: S(L.S4 + 47),  src: "thock.wav",       v: LEVELS.SFX_MID,    dur: 0.16, rate: 0.94 },
  { at: S(L.S4 + 52),  src: "engine_idle.wav", v: LEVELS.SFX_BED,    dur: 1.5, rate: 1.14 },
  { at: S(L.S4 + 76),  src: "data.wav",        v: LEVELS.SFX_MID,    dur: 0.21, rate: 1.2 },
  { at: S(L.S4 + 96),  src: "lamp_clunk.wav",  v: LEVELS.SFX_MID,    dur: 0.27, rate: 1.16 },

  /* ---- S5 · THE EMPTY BOOTH. ⭐ THE THINNEST SCENE, on purpose: the beat is
     that nobody is in the room, and density is a SHAPE. 2 --------------- */
  { at: S(L.S5 + 4),  src: "motor_sag.wav",   v: LEVELS.SFX_BED,     dur: 0.85, rate: 1.3 },
  { at: S(L.S5 + 30), src: "thock.wav",       v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.86 },

  /* ---- S6 · HUNYUAN 3D. Plate, cut, the photo, the mesh, three lamps. 6 - */
  { at: S(L.S6 + 4),   src: "slate_whump.wav", v: LEVELS.SFX_HERO,   dur: 0.16, rate: 0.94 },
  { at: S(L.S6 + 43),  src: "thock.wav",       v: LEVELS.SFX_MID,    dur: 0.16, rate: 1.04 },
  { at: S(L.S6 + 66),  src: "chair_knock.wav", v: LEVELS.SFX_MID,    dur: 0.3, rate: 0.9 },
  { at: S(L.S6 + 70),  src: "scan_beep.wav",   v: LEVELS.SFX_HERO,   dur: 0.4, rate: 0.94 },
  ...[110, 114, 118].map((a, i) => ({
    at: S(L.S6 + a), src: "spotlight_snap.wav",
    v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.4, rate: 0.96 + i * 0.14,
  })),

  /* ---- S7 · THE ECOM PAGE. The page lands and the docket stamps. 2 ----- */
  { at: S(L.S7 + 8),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,   dur: 0.8, rate: 1.04 },
  { at: S(L.S7 + 34), src: "stamp_press.wav",  v: LEVELS.SFX_HERO,   dur: 0.34, rate: 0.92 },

  /* ---- S8 · THE GATE. Two shoves, and nothing gives. The second is LOWER
     than the first, because it achieves less. 3 ------------------------- */
  { at: S(L.S8 + 12), src: "impact_deep.wav",  v: LEVELS.SFX_HERO,   dur: 0.8, rate: 0.78 },
  { at: S(L.S8 + 29), src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(-3), dur: 0.8, rate: 0.72 },
  { at: S(L.S8 + 15), src: "thock.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 0.8 },

  /* ---- S9 · THE PEAK. Three strikes in an ASCENDING run, then the bar
     lifts and the gate opens. 7 ----------------------------------------- */
  ...[30, 36, 48].map((a, i) => ({
    at: S(L.S9 + a), src: "gold_stamp.wav",
    v: LEVELS.SFX_HERO * db(-3 + i * 1.6), dur: 0.5, rate: 0.92 + i * 0.12,
  })),
  { at: S(L.S9 + 30), src: "thock.wav",        v: LEVELS.SFX_MID,    dur: 0.16 },
  { at: S(L.S9 + 58), src: "ratchet.wav",      v: LEVELS.SFX_MID,    dur: 0.5, rate: 0.86 },
  { at: S(L.S9 + 62), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,   dur: 0.8, rate: 0.86 },
  { at: S(L.S9 + 68), src: "gong.wav",         v: LEVELS.SFX_MID,    dur: 2.2, rate: 0.96 },

  /* ---- S10 · THROUGH THE GATE. The plate sets, and the row is open. 3 --- */
  { at: S(L.S10 + 4),  src: "gold_stamp.wav",  v: LEVELS.SFX_HERO,   dur: 0.5, rate: 1.06 },
  { at: S(L.S10 + 6),  src: "sub.wav",         v: LEVELS.SFX_MID,    dur: 0.42, rate: 0.88 },
  { at: S(L.S10 + 10), src: "bell_ring.wav",   v: LEVELS.SFX_TEXTURE, dur: 1.6, rate: 0.92 },
];

/* ---- THE MUSIC ------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad (Alex, reel 116:
   *"the BG music is completely wrong… it's not the right bg music we typically
   use."*). `ados` = Another Day Of Sun, `ebm` = Every Living Breathing Moment.

   ⛔ THE THREE ARE DIFFERENT PASSAGES, not one file at three volumes — an
   audio-only variant is a pixel duplicate. Measured after the chain, all three
   onset at **0ms**.

   ⛔⛔ THE FIX IS SPECTRUM, NOT VOLUME — and the correction runs BOTH WAYS and
   is PER SOURCE. `ados_bed_loud` is 90% under 250 Hz raw and reel 123's chain
   left it at 87.3%, past the point a phone speaker reproduces it; `ebm_hot` is
   65.8% raw and the same chain over-corrected it to 34.7%, which fights the
   voice. Each bed got its own EQ solved against the 55-70% band:
     house  ados @0.78s  -8/+8/+9      -> 68.0%
     amber  ebm  @22.2s  -1/+1.5/+1.5  -> 55.3%
     steel  ados @19.0s  -4/+3.6/+4    -> 59.6% */
const BED: Record<Variant, string> = {
  house: "133build_bed.wav",
  amber: "133build_bed_amber.wav",
  steel: "133build_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1268, amber: 1344, steel: 1196 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files. ⛔ AND THE STANDING CAP IS volume 0.25: db(7.90) x LEVELS.MUSIC
   = 0.2483, inside the cap, so the gain is not the lever — the spectrum is. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.90),   /* -> volume 0.2483, against the 0.25 cap */
  amber: db(7.60),
  steel: db(7.45),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** ⛔ THE PICKED HOOK. `shutter` IS S0 itself, so the candidate that was chosen
    and the scene that ships are the same code and cannot drift apart.
    ⏳ Not yet picked by Alex — four candidates render as their own comps. */
/* ⭐ PICKED (rev 9): Alex chose SWAP. `makeReel` reads this for the reel's first
   Sequence, so the shipped opening and the candidate preview are the same code.
   The mechanism is EXCHANGE — three gems out along the belt, orders back the
   other way, crossing — which is the line's actual verb. Measured 11.96. */
export const PICKED: HookId = "swap";

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("133_build_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><SETUP2 v={v} dur={DUR.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><T1 v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><SALE_A v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><T2 v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><EMPTY v={v} dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><T3 v={v} dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><SALE_B v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><GATE v={v} dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><KEY v={v} dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><OPEN v={v} dur={DUR.S10} /></Sequence>
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
   ⛔ A HEADER STATES THE CLAIM IN THE VIEWER'S WORDS — the OUTCOME they want to
   be able to do, never the set and never the theme. Alex rewrote one himself on
   reel 124 (*"Create 3D AI Websites"*), which is the register. Nothing below
   says "the trade row", "the shutter" or "the gate".
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "3 FREE AI TOOLS",      hot: "SELL THEM ON FIVERR" },
  { from: L.S1,  big: "5 MINUTES TO SET UP",  hot: "ALL THREE" },
  { from: L.S2,  big: "TURN ONE TOPIC",       hot: "INTO A FINISHED VIDEO" },
  { from: L.S3,  big: "SELL VIDEO EDITING",   hot: "WITHOUT EDITING" },
  { from: L.S4,  big: "CLONE YOUR OWN VOICE", hot: "FROM ONE MINUTE" },
  { from: L.S5,  big: "SELL NARRATION",       hot: "WITHOUT RECORDING" },
  { from: L.S6,  big: "TURN ONE PHOTO",       hot: "INTO A 3D MODEL" },
  { from: L.S7,  big: "SELL 3D TO ECOM",      hot: "BRANDS AND SHOPS" },
  { from: L.S8,  big: "THE TOOLS ARE FREE",   hot: "SELLING THEM ISN'T" },
  { from: L.S9,  big: "COMMENT BUILD",        hot: "FOR THE FREE GUIDE" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  /* ⭐⭐ THE HEADER IS ON FROM FRAME 0 (Alex, reel 131: *"where is the header in
     the hook scene?"*). ⛔ FRAME 0 MAY NOT BE MID-ROLL: `HookHeader` animates in
     from its own f=0, so feeding it f=0 on the reel's frame 0 renders the header
     at scale 0 — it WAS on, and invisible on the one frame guaranteed to be seen. */
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  return <HookHeader big={b.big} hot={b.hot} f={f - b.from + 12} />;
};

export const ClaudeBuild133Reel = makeReel("house");
export const ClaudeBuild133ReelAmber = makeReel("amber");
export const ClaudeBuild133ReelSteel = makeReel("steel");

/* =========================================================================
   ⛔ THE HOOK EXPERIMENT — each candidate as a standalone 100-frame cut, on the
   real chassis with the real VO, bed, captions and progress rail, so the pick is
   made on the thing a viewer would actually be served rather than on a
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
      <Audio src={staticFile("133_build_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={SFX.filter(c => c.at < 100 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <Sequence from={0} durationInFrames={100}><Cut v="house" dur={72} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.house} />
      <HookHeader big={b.big} hot={b.hot} f={f + 12} />
    </AbsoluteFill>
  );
};
