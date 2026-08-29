import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, CAM, GRADE,
} from "./ExcScenes";
import type { Variant } from "./ExcScenes";
import { CamCtx, R } from "./ExcWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import words from "./data/words_125auto.json";

/* ===========================================================================
   REEL 125 · "AUTO" — THE EXCHANGE.  Board: storyboards/125-auto.md.

   Subject: github.com/enescingoz/awesome-n8n-templates — 350 ready-made n8n
   workflow JSONs across 19 categories, free, MIT-adjacent, community-sourced.
   You import ONE file and it runs. The alternative is wiring the same
   automation yourself, node by node, which is what everyone else is doing.

   ⛔⛔ TWO SPOKEN CLAIMS THE FRAME DOES NOT MAKE.
     1. The VO says "over 30,000 stars". The live count on 2026-08-28 is
        **24,983**, so `R.stars` is what every plate carries — big, early and
        twice. Standing rule: when a VO asserts a result you cannot source,
        dramatise the MECHANISM and stop at the edge of the claim.
     2. The VO says "Stripe". There are **zero** Stripe templates in the repo.
        Gmail, Slack, WhatsApp and YouTube are all real and all land on their
        own measured word onsets at S5; on the word "Stripe" the rank RECEDES
        instead of showing a fifth mark, which reads as "and there are far more
        of these" and hands straight into the next line. Nothing false is
        asserted and the beat is better than a list.

   ⛔⛔ THE VILLAIN IS `THE BENCH` AND IT IS NEVER BEATEN. Planted at S0 with
   the hero losing to ONE cord, abandoned at S7 (he puts the pliers down — it is
   walked away from, not destroyed), and it WINS at S10 over a hall of operators
   still at theirs. Nothing in this reel is ever smashed.

   ⚠️ 24.375s — inside the playbook's 22-29s house range, at x1.00. NO SPEEDUP
      WAS APPLIED and that is deliberate: the raw take already runs 4.47 words
      per second across the cut (118 = 4.50, 122 = 4.45), and the hook span is
      4.58 wps against a 4.0 bar. Speeding it up would push a hook that is
      already fast further past the bar. The cut removes 27.6s of flubs,
      retakes and dead air from a 52.01s raw take containing three full retakes
      of the "emails sort themselves" line, one aborted "just grab one file",
      and a 4.32s dead run.

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;

/** ⛔ EVERY ONSET IS DERIVED FROM THE CAPTION JSON, never typed by feel, and
    every one is the measured word onset MINUS 4 FRAMES — the picture leads the
    voice by 4f house-wide. Source onsets (seconds, from words_125auto.json):
      S1  "And" 5.37 · S2  "So" 7.05 · S3  "your(leads)" 8.48
      S4  "your(content)" 9.60 · S5 "Gmail," 12.25 · S6 "over" 13.92
      S7  "And" 16.24 · S8  "Just" 17.78 · S9 "and(it runs)" 19.10
      S10 "Everyone" 20.38 · S11 "Comment" 23.13 · END 24.375 */
export const L = {
  S0: 0, S1: 157, S2: 208, S3: 250, S4: 284, S5: 364, S6: 414,
  S7: 483, S8: 529, S9: 569, S10: 607, S11: 690, END: 731,
} as const;
export const AUTO_TOTAL = L.END;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.END - L.S11,
};
const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 and are excluded, and so
   is `slot_lever` (58.7% bright with a 116ms attack — an air swell AND a slap).

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a TELEPHONE EXCHANGE — a
   dial tone, relay armatures, jack plugs seating, a knife switch, ratchets,
   lamp clunks, a sorter tick, a wire running, a struck brass tag. **ZERO
   chiptune cues** — the greppable gate is that no `src` starts with `c_`, which
   returns zero.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top
   is a SLAP; the same event carried under 250 Hz is a thud you feel. `thock`
   (88.6% low), `impact_deep` (93.1%), `sub` (96.6%) and `impact` (42.1%) carry
   the weight here. Nothing bright is used five times.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the hook), S6 (the
   field lighting), S9 (the card going live) and S11 (the strike), and thins to
   two on the information scenes.
   ⛔ AND THE FIRST BANK RAN 42 CUES = 1.72/sec, over the 1.0-1.5 house ceiling.
   Six were cut, all of them DOUBLES rather than events: a second `sub` under a
   clank that already lands, a tone after a latch that already latched, a third
   sorter tap in a 1.40s scene, a third arrival chime doubling a press hit that
   already fired, a ratchet after the lamp chase, and a second arrival on the
   CTA. Nobody had ever summed reel 107's bank either, and each of its 134 cues
   was defensible alone.
   ⛔⛔ AND FIVE CUES WERE REPLACED AFTER `sfx_audit` FLAGGED THEM, BECAUSE A
   BED IS EXACTLY WHERE A "PUFF OF AIR" HIDES (reel 115 spent four review rounds
   on one that was living in the bed carve-out):
     · `machine_bed` and `shop_bed` are BROADBAND HISS — peakiness 10.8 and 9.3
       against the gate's floor of 14. Replaced with `stage_hum` (254.6) and
       `engine_idle` (259.1), which are TONAL: they have tall bins because they
       are hums, and a rack of relays is the most on-world bed this reel could
       have. Measured, not assumed.
     · `sorter_tick` is not a tick — 2.40s long, a 1929ms attack and 75.9%
       bright, i.e. a bright SWELL. The mail flicks use `mallet_tap` (0.20s,
       1ms attack, 96.9% under 250 Hz): percussion must be LOW, never bright.
     · `wire_travel` is 79.7% bright with a 910ms attack — an air swell wearing
       a mechanical name. The night line runs on `engine_idle` instead.
     · `dialtone` was CUT, not argued with. It is a pure mid tone, so it trips
       AIR for having little energy at BOTH ends rather than for being air, and
       `from: 0.14` did not clear it because a dial tone's onset really is soft.
       ⛔ Shipping a flagged cue on a judgement call is exactly what cost reel
       115 four review rounds with `pneu_thunk`. Frame 0 already carries
       `impact_deep` + `sub` + the hum, the picture says "exchange" without any
       help, and the bank is now clean with nothing lost.
   ⭐ AND A REPEATED REWARD ONLY READS AS PROGRESS WHEN IT CLIMBS. Every run
   here ascends in rate: the three drops at S2, the three outlets at S4, the
   four marks at S5, the three ranks at S6, the lamp chase at S9. Equal
   temperament is 2^(n/12), so a `rate` IS a transposition. */
const RUN3 = [1.000, 1.1225, 1.2599];
const RUN4 = [1.000, 1.0905, 1.1892, 1.2968];

export const SFX: Cue[] = [
  /* ---- S0 · THE HOOK. The biggest cue set in the reel, and the shape is the
     picture's: the room is ALREADY running on frame 0 (a relay-rack hum under
     the first hit), one ratchet is the fight, the cord LETS GO at f58, and then
     the wall lights as a three-note ascending run — the only thing in the open
     that resolves. ⛔ The dial tone is pitched DOWN: at rate 1.0 it is a
     notification beep and a beep on frame 0 is the sound of a phone, not of a
     room. ------------------------------------------------------------- */
  { at: S(L.S0 + 0),   src: "stage_hum.wav",  v: LEVELS.SFX_BED,          dur: 3.4, rate: 0.80 },
  ...layer(S(L.S0 + 0),
    { src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(2), dur: 1.2, rate: 0.76 },
    { src: "sub.wav",         v: LEVELS.SFX_MID,          dur: 1.4, rate: 0.66 }),
  /* ⭐ THE FIGHT — ONE CUE PER HAUL, and the run DESCENDS. Every other run in
     this bank climbs, because a climbing run reads as progress; these three are
     the only descending run in the reel, because three attempts that achieve
     nothing are the opposite of progress. ⛔ The first bank had ONE ratchet
     under THREE visible refusals, which is reel 115 §18's defect verbatim: a
     beat that makes no sound reads as inert however good the picture is. */
  ...[8, 28, 48].map((a, i) => ({
    at: S(L.S0 + a), src: "ratchet.wav",
    v: LEVELS.SFX_MID * db(-i * 0.9), dur: 1.0, rate: 0.86 - i * 0.07,
  })),
  /* the cord LETS GO */
  { at: S(L.S0 + 58),  src: "twang.wav",        v: LEVELS.SFX_HERO,         dur: 0.9, rate: 0.86 },
  /* ⭐ THE WALL LIGHTING — three ranks, an ascending run, the open's payoff */
  ...[62, 82, 102].map((a, i) => ({
    at: S(L.S0 + a), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(i * 0.9), dur: 0.5, rate: RUN3[i],
  })),
  /* the pliers hit the floor and ring */
  { at: S(L.S0 + 136), src: "wrench_clank.wav", v: LEVELS.SFX_HERO * db(1), dur: 0.9, rate: 0.94 },

  /* ---- S1 · THE SLOT. One insertion, one latch, one dial landing. -------- */
  { at: S(L.S1 + 0),   src: "stage_hum.wav",  v: LEVELS.SFX_BED * db(3),  dur: 1.7, rate: 1.04 },
  { at: S(L.S1 + 26),  src: "thock.wav",        v: LEVELS.SFX_HERO * db(2), dur: 0.8, rate: 0.72 },

  /* ---- S2 · THE MAIL BANK. 1.40s, ONE idea, THREE cues — and the run
     ascends, because three identical ticks is a metronome. ---------------- */
  { at: S(L.S2 + 0),   src: "engine_idle.wav",     v: LEVELS.SFX_BED * db(2),  dur: 1.5, rate: 1.10 },
  { at: S(L.S2 + 20),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,          dur: 0.4, rate: 1.0 },

  /* ---- S3 · THE NIGHT LINE. ⭐ THE QUIETEST SCENE IN THE REEL, deliberately:
     he is asleep, so the mix drops to a running wire and one stamp. An absence
     is a sound design decision. ------------------------------------------ */
  { at: S(L.S3 + 0),   src: "engine_idle.wav",  v: LEVELS.SFX_BED * db(2),  dur: 1.2, rate: 0.90 },
  { at: S(L.S3 + 15),  src: "stamp_press.wav",  v: LEVELS.SFX_TEXTURE,      dur: 0.4, rate: 0.88 },

  /* ---- S4 · THE OUTFEED. A density peak on the PRESS: three hits, each with
     its own outlet swallowing after it, and the three outlets climb. ------ */
  { at: S(L.S4 + 0),   src: "stage_hum.wav",  v: LEVELS.SFX_BED * db(4),  dur: 2.8, rate: 0.96 },
  ...[14, 36, 58].map((a, i) => ({
    at: S(L.S4 + a), src: "stamp_press.wav",
    v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.5, rate: 0.88 + i * 0.055,
  })),
  { at: S(L.S4 + 78),  src: "arrive_chime.wav", v: LEVELS.SFX_MID * db(1),  dur: 0.7, rate: RUN3[2] },

  /* ---- S5 · THE FOUR MARKS. One cue per SPOKEN WORD, on the measured onset,
     climbing a whole tone each. ⛔ There is NO fifth cue: nothing sounds on
     "Stripe" except the rank receding, because nothing is shown there. ---- */
  ...[4, 17, 25, 36].map((a, i) => ({
    at: S(L.S5 + a), src: "ticket_click.wav",
    v: LEVELS.SFX_MID * db(i * 0.6), dur: 0.4, rate: RUN4[i],
  })),
  { at: S(L.S5 + 48),  src: "gear_shift.wav",    v: LEVELS.SFX_TEXTURE,     dur: 0.9, rate: 0.74 },

  /* ---- S6 · THE FIELD. The switch, then the ranks as an ascending run, then
     the count plate landing. This is the second density peak. ------------- */
  ...layer(S(L.S6 + 10),
    { src: "knife_switch.wav", v: LEVELS.SFX_HERO,        dur: 0.6, rate: 0.88 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,         dur: 1.2, rate: 0.66 }),
  ...[16, 30, 44].map((a, i) => ({
    at: S(L.S6 + a), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(i * 1.0), dur: 0.45, rate: RUN3[i],
  })),
  { at: S(L.S6 + 54),  src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,         dur: 0.8, rate: 0.92 },

  /* ---- S7 · THE TURN. ⭐ TWO CUES, AND ONE OF THEM IS THE LAMP GIVING UP.
     The bench does not get a bed — the room goes quiet when he leaves it. -- */
  { at: S(L.S7 + 12),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,          dur: 0.6, rate: 0.80 },
  { at: S(L.S7 + 26),  src: "neon_off.wav",     v: LEVELS.SFX_TEXTURE,      dur: 0.9, rate: 0.86 },

  /* ---- S8 · THE CARD. The pull off the wall and the IMPORT latch. ------- */
  { at: S(L.S8 + 2),   src: "mech_clank.wav",   v: LEVELS.SFX_MID,          dur: 0.5, rate: 0.94 },
  { at: S(L.S8 + 30),  src: "knife_switch.wav", v: LEVELS.SFX_MID * db(1),  dur: 0.5, rate: 1.06 },

  /* ---- S9 · IT RUNS. THE PEAK, and the largest cue stack after the hook. A
     reward beat has to RESOLVE: the seat, the lamp chase climbing, the relays
     firing, and the output arriving. ------------------------------------- */
  { at: S(L.S9 + 0),   src: "engine_idle.wav",     v: LEVELS.SFX_BED * db(4),  dur: 1.4, rate: 1.08 },
  { at: S(L.S9 + 4),   src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(3), dur: 1.1, rate: 0.74 },
  ...[8, 13, 18].map((a, i) => ({
    at: S(L.S9 + a), src: "pickup_chime.wav",
    v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.55, rate: RUN3[i],
  })),

  /* ---- S10 · THE HALL. ⛔ THE VILLAIN'S SOUND IS REPETITION WITHOUT
     RESOLUTION: a room tone, and two ratchets that do NOT climb — the same
     pitch twice, which is the opposite of every other run in the bank. ---- */
  { at: S(L.S10 + 0),  src: "engine_idle.wav",     v: LEVELS.SFX_BED * db(1),  dur: 2.9, rate: 0.76 },
  { at: S(L.S10 + 30), src: "ratchet.wav",      v: LEVELS.SFX_TEXTURE,      dur: 1.0, rate: 0.82 },

  /* ---- S11 · THE GATE. The tag is STRUCK, and the cast climbs out. ------ */
  ...layer(S(L.S11 + 5),
    { src: "gold_stamp.wav",  v: LEVELS.SFX_HERO * db(2), dur: 0.9, rate: 0.90 },
    { src: "sub.wav",         v: LEVELS.SFX_MID,          dur: 1.2, rate: 0.64 }),
  { at: S(L.S11 + 15), src: "arrive_chime.wav", v: LEVELS.SFX_MID * db(1), dur: 0.8, rate: RUN3[2] },
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad. `ados` =
   "Another Day Of Sun", `ebm` = "Every Living Breathing Moment". Reels 107-114
   drifted onto generated beds one clone at a time and every audio gate stayed
   green, because a pad passes all of them.
   ⭐ AND THE WINDOW IS NOT RE-DERIVED. `ados_bed_loud.wav` is one specific 50s
   passage of the house file; reel 122 lost two rounds scoring its own window by
   mean level and onset, landed on a different section of the same song and kept
   sounding unfamiliar. These are cut from the house files themselves.
   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. */
const BED: Record<Variant, string> = {
  house: "125auto_bed.wav",
  amber: "125auto_bed_amber.wav",
  steel: "125auto_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1248, amber: 1330, steel: 1178 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files. The house figure is ~12 dB under the VO; the standing cap is
   volume 0.25 (Alex: *"the background music is too loud compared to the
   voiceover"*). */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.60),   /* -> volume 0.2399 */
  amber: db(7.20),
  steel: db(7.40),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

export const makeReel = (v: Variant, quiet = false): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("125_auto_vo.wav")} volume={LEVELS.DIALOGUE} />
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
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any[]} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} v={v} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction.
   ⛔ A HEADER STATES THE CLAIM IN PRODUCT NOUNS, not the theme — nothing below
   says "the exchange".
   ⛔⛔ A BAND STATES THE CLAIM OF THE SECTION IT IS OVER, AND NEVER THE NEXT
   ONE. On reel 122 the opening band printed the reel's final number over the
   eighteen seconds in which the VO was still building it, and a viewer who read
   it at 2s had no reason to watch the arithmetic. Here `19 CATEGORIES` is not
   named until S6, which is the frame its own line is spoken over.
   ⛔ EVERY FIGURE COMES OUT OF `R`, so a band cannot drift off the ledger the
   way a hand-typed one can — which is also what keeps "30,000" off the screen.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "350 AUTOMATIONS",     hot: "ALREADY BUILT FOR YOU" },
  { from: L.S1,  big: "ONE MINUTE",          hot: "TO SET ONE RUNNING" },
  { from: L.S2,  big: "YOUR EMAIL",          hot: "SORTS ITSELF" },
  { from: L.S3,  big: "YOUR LEADS",          hot: "ANSWERED OVERNIGHT" },
  { from: L.S4,  big: "ONE POST GOES",       hot: R.outlets.join(" · ") },
  { from: L.S5,  big: "REAL INTEGRATIONS",   hot: R.marks.map(m => m.name).join(" · ") },
  { from: L.S6,  big: `${R.categories} CATEGORIES`, hot: `${R.workflows} WORKFLOWS` },
  { from: L.S7,  big: "YOU BUILD",           hot: "NONE OF THEM" },
  { from: L.S8,  big: "ONE FILE",            hot: `CLICK ${R.action}` },
  { from: L.S9,  big: "AND IT RUNS",         hot: "IMMEDIATELY" },
  { from: L.S10, big: "EVERYONE ELSE",       hot: "IS STILL WIRING IT BY HAND" },
  { from: L.S11, big: "COMMENT",             hot: R.keyword },
];
/** ⛔ the band is IDENTICAL across the three cuts and it owns the top two rows
    of an 8x8 dHash. A per-cut Y nudge is the cheapest way to stop it flattening
    the only cells the per-cut layout cannot reach. */
const BAND_DY: Record<Variant, number> = { house: 0, amber: 24, steel: -20 };

const SectionBand: React.FC<{ f: number; v: Variant }> = ({ f, v }) => {
  /* ⛔⛔ THE HOOK KEEPS ITS HEADER. Reel 122 took the band off the hook on one
     round and was asked *"where is the header in the hook scene"* on the next.
     `HOOK_PLATE` is satisfied by the hook's own claim plate; this band sits
     above it and RAISES frame-0 luma, which moves HOOK_LUMA the right way. */
  let cur = BANDS[0];
  for (const b of BANDS) if (f >= b.from) cur = b;
  const local = f - cur.from;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateY(${BAND_DY[v]}px)`,
      pointerEvents: "none" }}>
      {/* ⛔ `at0` on the FIRST band only — the reel opens with its claim already
             on screen, settled, never popped in at 0.2s. */}
      <HookHeader big={cur.big} hot={cur.hot} f={local} at0={cur === BANDS[0]} />
    </div>
  );
};

export const ClaudeAuto125Reel = makeReel("house");
export const ClaudeAuto125ReelAmber = makeReel("amber");
export const ClaudeAuto125ReelSteel = makeReel("steel");
export const ClaudeAuto125ReelQuiet = makeReel("house", true);
