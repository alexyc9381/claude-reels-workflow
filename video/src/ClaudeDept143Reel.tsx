import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./DeptWorld";
import {
  DEPTS_SCENE, SKILL, MKT, PACK45, SOCIAL, GATE, TWO, GENERIC, FIN, LEDGER,
  LEGAL, CONTRACT, MOST, HEAP, REWRITE, TEAM, CTA,
} from "./DeptScenes";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_dept143.json";
import {DeptHookPolish} from './DeptHookPolish';

/* ===========================================================================
   REEL 143 · "DEPARTMENT" — THE ASSEMBLY.  Board: storyboards/143-department.md.
   Factory log: memory/reels/143-department-factory-log.md.

   Subject: five free Claude skill packs, one per department a solo founder
   would otherwise hire for — marketing (45 skills), social media (17), design
   (UI UX Pro + Taste), finance (8), legal (9) — and the part that actually
   matters, which is telling Claude Code to REWRITE the skill around your own
   business instead of installing fifty of them and hoping.

   ⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "DEPARTMENT". A one-man counter
      opens out into a five-bay works. The reel's shape is the claim's shape:
      one body carrying five jobs becomes five bodies carrying one each.

   ⭐⭐ THE VO. 154.69s raw → 73.17s → x1.03 = **71.04s**. ELEVEN `cut cut`
      flubs removed, five of them on one sentence.
      ⛔ A WHOLE-FILE TRANSCRIPTION IS NOT GROUND TRUTH — whisper merges a
      flubbed take and its retake and emits the sentence once. The raw was
      chunked at every measured silence and each chunk transcribed ALONE, which
      is the only pass that shows a retake as a duplicate opening.
      ⛔ TEMPO IS x1.03 ON THE ORIGINAL VOICE. Alex, 2026-09-07, standing:
      never slow a VO to pass a reading-speed gate.
      ⚠️ 71.04s is long against the house 22-29s range. It is what was recorded,
      every sentence he said is in the cut, and nothing was dropped for length.

   ⛔⛔ EVERY SCENE BOUNDARY IS THE MIDPOINT OF A MEASURED SILENCE
      (`silencedetect noise=-40dB:d=0.10` on the delivered mix), so no cut lands
      inside a word — reel 135 derived its cuts from stored word ends and got
      "the word is cut off" back three times.
   ========================================================================= */

const FPS = 30;
const S = (fr: number) => fr / FPS;

/** ⛔ the last word "below." truly ends at 70.92s (verified ASR). 2132 frames = 71.07s
    lands the hard out about four frames after it — long enough not to clip the /oʊ/
    tail, short enough that no dead beat sits on the end. */
export const DEPT_TOTAL = 2132;

/* ---- THE SHOT TABLE. Every number below is a measured gap midpoint. ------- */
export const L = {
  S0:  0,     /* HOOK      "If you're building a business by yourself…"        0.00s */
  S1:  144,   /* DEPTS     "There are free Claude skills for every single…"    4.80s */
  S2:  313,   /* SKILL     "And a skill is just a markdown file…"             10.43s */
  S3:  481,   /* MKT       "The first department is marketing."               16.03s */
  S4:  530,   /* PACK45    "Here's a collection of 45 different skills…"      17.67s */
  S5:  657,   /* SOCIAL    "Number two is social media…"                      21.90s */
  S6:  866,   /* GATE      "But here's where it starts getting more useful…"  28.87s */
  S7:  987,   /* TWO       "Two I really like are UI UX Pro and Taste."       32.90s */
  S8:  1046,  /* GENERIC   "They literally give your agent much better…"      34.87s */
  S9:  1235,  /* FIN       "And the fourth department is finance."            41.17s */
  S10: 1288,  /* LEDGER    "So this Claude plugin has eight different…"       42.93s */
  S11: 1425,  /* LEGAL     "And the last department is legal."                47.50s */
  S12: 1472,  /* CONTRACT  "This Claude plugin has nine skills for…"          49.07s */
  S13: 1584,  /* MOST      "But here's the part I think matters most."        52.80s */
  S14: 1637,  /* HEAP      "Don't just install 50 skills and expect…"         54.57s */
  S15: 1737,  /* REWRITE   "Give the skill to your agent in Claude Code…"     57.90s */
  S16: 1904,  /* TEAM      "This is when it stops being a collection…"        63.47s */
  S17: 2013,  /* CTA       "For the setup guide with the links…"              67.10s */
  END: DEPT_TOTAL,
} as const;

/** ⭐ the SHOT boundaries inside a scene. A scene longer than ~4s gets a hard
    cut to a new FRAMING — but §2 first: each of these shots owns an EVENT, it
    is not a cut used as a substitute for one. */
const B = {
  DEPTS_B: 238, SKILL_B: 400, PACK_B: 596,
  SOC_B: 720, SOC_C: 800, GATE_B: 940, GEN_B: 1120, GEN_C: 1180,
  LED_B: 1355, CON_B: 1530, REW_B: 1820,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ REV 2 — REBUILT FROM THE AUDIT, NOT BY EAR. `tools/sfx_audit.py` flagged
   FIFTEEN of the first bank's samples, every one in reel 115's "puff of air"
   class, and every one of them was defensible by name:

     chimehi / chimelo   AIR   (68ms and 97ms attacks, 1.7% and 3.7% below 250Hz)
     construction        NOISE-BED + SLAP (37.8s of broadband hiss, used 5x)
     crowd_cheer         NOISE-BED + AIR  (1205ms attack)
     digital-loading     SWELL-317ms + HISS + AIR
     sand-steps          NOISE-BED + SWELL-10244ms + HISS + AIR
     lib_click/pop/pop2  AIR   (80-92% above 2kHz, 109-133ms attacks)
     shimmer / sparkle   AIR   (99.9% and 62.4% above 2kHz)
     resolve / hit.mp3   AIR / SWELL-185ms
     paper.wav           SLAP  (used 9x at 86.6% bright)

   ⛔⛔ AND THE AUDIT COULD NOT SEE HALF THE BANK. Its regex looks for a quoted
   the run() helper took its filename as a positional argument, so ~50 cues
   filename after the src key, and run() passed it positionally. run() now takes a
   cue OBJECT, purely so the gate covers
   the reel. A CHECK THAT SILENTLY MATCHES NOTHING IS WORSE THAN NO CHECK.

   ⭐ THE SURVIVING PALETTE IS LOW-ENDED ON PURPOSE — reel 120: *glue comes from
   the LOW end.* impact (42% <250Hz) · sub (96.6%) · thock (88.6%) · boom (94.7%)
   · twang (1.1% >2kHz) · blip1-5 (tonal, 3-8% >2kHz) · pop (0.6% >2kHz) ·
   m_stomp / m_bump / m_pipe / m_powerup / m_flag.
   ⛔ THE FIVE MACHINE BEDS ARE GONE, not replaced. A bed is optional; broadband
   room tone under a voice is exactly what four review rounds of reel 115 were.

   ⛔ NOTHING LANDS ON A SENTENCE-FINAL WORD. Every scene boundary sits in a
   MEASURED silence, so the loudest cue in each scene arrives where the voice is
   quietest, and nothing is scheduled in the last 0.4s of any sentence.
   ⛔ `dur` >= each file's measured length: impact 0.62 · boom 0.55 · sub 0.42 ·
   crash 0.70 · twang 0.50 · m_powerup 0.49 · m_pipe 0.42 · paper 0.30 · blip 0.22 ·
   m_jump 0.25 · pop 0.13 · thock 0.16 · m_stomp 0.12 · m_bump 0.09 · key 0.04.
   ⭐ RATE, NOT A NEW FILE. No BRIGHT sample is used 5+ times (the SLAP gate).
   -------------------------------------------------------------------------- */

/** A low impact cues a change of department; reserve layered sub for the hook and gate. */
const cut = (fr: number, v = 1, r = 1): Cue[] => [
  { at: S(fr), src: "impact.wav", v: LEVELS.SFX_MID * db(-1) * v, dur: 0.62, rate: 0.98 * r },
];
/** a softer join inside one department — one cue, not two */
const softCut = (fr: number, r = 1): Cue[] => [
  { at: S(fr), src: "thock.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.16, rate: 0.92 * r },
];
/** ⭐ an ascending run — what makes a REPEATED reward read as PROGRESS rather
    than as repetition (reel 115 §18). Never more than 5 in a row.
    ⛔ IT TAKES A CUE OBJECT so a quoted filename appears after the src key and the audit
    can measure it. The first version hid fifty cues from the gate. */
const run = (frs: number[], base: Omit<Cue, "at" | "rate">, r0 = 0.92, step = 0.075): Cue[] =>
  frs.map((fr, i) => ({ ...base, at: S(fr), v: base.v * db(-i * 0.5), rate: r0 + i * step }));

export const SFX: Cue[] = [
  /* Revised hook: sounds belong to contact, module seating, release and landing. */
  {at:S(0),src:"thock.wav",v:LEVELS.SFX_HERO,dur:0.16,rate:0.86,lead:0},
  {at:S(0),src:"sub.wav",v:LEVELS.SFX_TEXTURE,dur:0.42,rate:0.72,lead:0},
  ...run([17,37,57],{src:"blip3.wav",v:LEVELS.SFX_MID*db(-3),dur:0.22},0.9,0.09),
  {at:S(63),src:"twang.wav",v:LEVELS.SFX_MID*db(-2),dur:0.5,rate:1.12},
  ...run([84,98,112],{src:"c_stomp.wav",v:LEVELS.SFX_MID*db(-8),dur:0.12},0.86,0.06),

  {at:S(111),src:"paper.wav",v:LEVELS.SFX_TEXTURE,dur:0.30,rate:0.86},

  /* === S1 DEPTS f144-313 ================================================= */
  ...cut(L.S1),
  /* five lamps strike, one per bay, ASCENDING */
  ...run([158, 176, 194, 212, 230], { src: "blip3.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.22 }, 0.88, 0.085),
  ...softCut(B.DEPTS_B),
  ...run([276], { src: "pop.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.13 }, 0.90, 0.07),

  /* === S2 SKILL f313-481 ================================================= */
  ...cut(L.S2, 0.92),
  { at: S(319), src: "paper.wav", v: LEVELS.SFX_MID * db(1), dur: 0.30, rate: 0.74 },  /* it unrolls */
  ...softCut(B.SKILL_B, 1.06),
  /* the four sections lighting under his feet */
  ...run([418, 440], { src: "blip1.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.22 }, 0.90, 0.09),
  { at: S(466), src: "c_stomp.wav", v: LEVELS.SFX_HERO * db(-8), dur: 0.12, rate: 0.94 },

  /* === S3 MKT f481-530 =================================================== */
  ...cut(L.S3),
  { at: S(504), src: "c_bump.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.09, rate: 0.86 },   /* the poster ejects */

  /* === S4 PACK45 f530-657 ================================================
     ⛔ 45 tiles do NOT get 45 cues. The house ceiling is 1.5/sec and a rejected
     reel ran 3.82. Four pitched seatings read as the whole run. */
  ...cut(L.S4, 1.06),
  { at: S(534), src: "crash.wav", v: LEVELS.SFX_HERO * db(-5), dur: 0.70, rate: 1.04 }, /* the crate bursts */
  ...run([550, 578], { src: "thock.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.16 }, 0.86, 0.11),
  ...softCut(B.PACK_B),
  ...run([618, 638], { src: "key.wav", v: LEVELS.SFX_TEXTURE * db(-8), dur: 0.04 }, 0.96, 0.08),

  /* === S5 SOCIAL f657-866 ================================================ */
  ...cut(L.S5),
  ...run([672, 696], { src: "blip2.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.22 }, 0.94, 0.09),
  ...softCut(B.SOC_B, 0.96),
  /* the three stations, each stamping the frame that passes it */
  ...run([730, 748, 766], { src: "thock.wav", v: LEVELS.SFX_HERO * db(-4), dur: 0.16 }, 0.88, 0.10),
  ...softCut(B.SOC_C, 1.08),
  ...run([816, 840], { src: "pop.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.13 }, 0.88, 0.09),

  /* === S6 GATE f866-987 ==================================================
     ⭐ a STOP is a sound too: the belt runs down rather than cutting out. */
  { at: S(L.S6), src: "thock.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.42, rate: 0.60, lead: 0 },
  { at: S(L.S6), src: "sub.wav",    v: LEVELS.SFX_MID,           dur: 0.42, rate: 0.54, lead: 0 },
  ...run([900, 922], { src: "thock.wav", v: LEVELS.SFX_TEXTURE * db(3), dur: 0.16 }, 0.70, 0.08),
  ...cut(B.GATE_B, 1.08, 1.02),
  
  /* === S7 TWO f987-1046 ================================================== */
  ...cut(L.S7, 0.9, 1.06),
  { at: S(992),  src: "blip3.wav", v: LEVELS.SFX_MID, dur: 0.22, rate: 0.84 },
  { at: S(992),  src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 1.02, lead: 1 },
  { at: S(1006), src: "blip5.wav", v: LEVELS.SFX_MID, dur: 0.22, rate: 1.06 },
  { at: S(1006), src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 1.12, lead: 1 },

  /* === S8 GENERIC f1046-1235 ============================================
     ⭐ THE VILLAIN'S SOUND IS REPETITION: the same press stroke at the same
     pitch, over and over. That IS the claim, so it is deliberately not varied. */
  ...cut(L.S8, 1.02, 0.94),
  ...[1056, 1078, 1100].map(a => ({ at: S(a), src: "c_stomp.wav", v: LEVELS.SFX_MID * db(-7), dur: 0.12, rate: 0.74 })),
  ...softCut(B.GEN_B, 1.04),
  ...run([1126, 1140], { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16 }, 0.84, 0.12),
  ...cut(B.GEN_C, 1.06, 1.08),
  { at: S(1188), src: "blip5.wav", v: LEVELS.SFX_HERO * db(-5), dur: 0.22, rate: 1.10 },
  
  /* === S9 FIN f1235-1288 ================================================= */
  ...cut(L.S9, 1.0, 0.98),
  
  /* === S10 LEDGER f1288-1425 ============================================= */
  ...cut(L.S10, 0.94),
  ...run([1300, 1330, 1356], { src: "thock.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.16 }, 0.78, 0.10),
  ...softCut(B.LED_B, 1.04),
  { at: S(1364), src: "pop.wav", v: LEVELS.SFX_MID, dur: 0.13, rate: 0.72 },          /* the statement */
  ...run([1378, 1400], { src: "blip4.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.22 }, 0.86, 0.12),
  { at: S(1414), src: "twang.wav", v: LEVELS.SFX_HERO * db(-6), dur: 0.50, rate: 0.84 },  /* the needle */

  /* === S11 LEGAL f1425-1472 ============================================== */
  ...cut(L.S11, 1.0, 0.96),

  /* === S12 CONTRACT f1472-1584 =========================================== */
  ...cut(L.S12, 0.96),
  ...run([1482, 1508, 1526], { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16 }, 0.76, 0.09), /* seals */
  ...softCut(B.CON_B, 1.02),
  { at: S(1534), src: "paper.wav", v: LEVELS.SFX_MID, dur: 0.30, rate: 0.70 },           /* it unrolls */
  ...run([1550, 1572], { src: "c_bump.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.09 }, 0.78, 0.11),

  /* === S13 MOST f1584-1637 · THE TROUGH ==================================
     ⛔ THE QUIETEST SCENE IN THE REEL, ON PURPOSE. A payoff needs something to
     be louder than. Two low cues as the floor stops, and then nothing at all. */
  { at: S(L.S13), src: "sub.wav",    v: LEVELS.SFX_MID,      dur: 0.42, rate: 0.48, lead: 0 },
  { at: S(L.S13), src: "thock.wav", v: LEVELS.SFX_TEXTURE,  dur: 0.42, rate: 0.54, lead: 0 },

  /* === S14 HEAP f1637-1737 · THE VILLAIN WINS ============================ */
  ...cut(L.S14, 0.94, 0.92),
  ...run([1652, 1682], { src: "pop.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.13 }, 0.72, 0.07),
  { at: S(1698), src: "c_bump.wav", v: LEVELS.SFX_TEXTURE * db(3), dur: 0.09, rate: 0.62 },
  /* ⭐ and then a DULL thud and NOTHING. The silence after it is the joke. */
  { at: S(1704), src: "sub.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.42, rate: 0.46 },
  
  /* === S15 REWRITE f1737-1904 · THE PEAK ================================= */
  ...cut(L.S15, 1.08, 1.0),
  { at: S(1745), src: "paper.wav",  v: LEVELS.SFX_MID, dur: 0.30, rate: 0.92 },           /* lifted */
  { at: S(1774), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 1.10 },           /* fed in */
  { at: S(1788), src: "key.wav", v: LEVELS.SFX_TEXTURE * db(-8), dur: 0.04, rate: 0.92 },
  ...cut(B.REW_B, 1.10, 0.96),
  { at: S(1832), src: "twang.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.50, rate: 0.92 },   /* the ink floods */
  ...run([1852, 1870], { src: "blip5.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.22 }, 0.90, 0.13),
  { at: S(1878), src: "impact.wav", v: LEVELS.SFX_HERO * db(-5), dur: 0.62, rate: 1.12 }, /* the name stamps */

  /* === S16 TEAM f1904-2013 · THE PAYOFF =================================== */
  ...cut(L.S16, 1.06, 1.02),
  ...run([1920, 1944, 1968], { src: "blip5.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.22 }, 0.86, 0.11),
  
  /* === S17 CTA f2013-2132 ================================================
     ⛔ "DEPARTMENT" is SPOKEN from ~f2098. Nothing percussive fires after f2062:
     a hit on the keyword is what reads as the word being chopped. */
  ...cut(L.S17, 1.0, 1.04),
  ...run([2020, 2032, 2044], { src: "thock.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.16 }, 0.88, 0.085),
  { at: S(2056), src: "pop.wav", v: LEVELS.SFX_MID, dur: 0.13, rate: 1.0 },
  ];

/* House instrumental, trimmed at source 13.95s; original tempo, 5dB sentence-tail duck. */
const BED = "dept143_bed.wav";
const CAP_Y = 1272;
export const BED_GAIN = db(5.0);
export const BED_QUIET = db(-6);

/** ⛔ the sentence tails, from the measured gaps: the bed steps back 5 dB across
    each so the last word of every sentence has the room to itself. */
const TAILS: Array<[number, number]> = [
  [4.36, 4.91], [10.00, 10.56], [15.58, 16.19], [17.22, 17.77], [21.43, 22.07],
  [28.41, 29.03], [32.44, 33.01], [34.44, 34.97], [40.68, 41.33], [42.52, 43.05],
  [47.03, 47.66], [48.64, 49.16], [52.31, 52.94], [54.12, 54.67], [57.45, 58.03],
  [63.03, 63.59], [66.61, 67.25], [70.20, 71.07],
];
const tailDuck = (t: number) => {
  for (const [a, b] of TAILS) if (t >= a && t <= b) return db(-5 * Math.min(1, Math.min(t - a, b - t) / 0.08));
  return 1;
};
const bedMix = (fr: number) => LEVELS.MUSIC * BED_GAIN * tailDuck(fr / FPS);

const GRADE = "saturate(1.22) contrast(1.06)";

export const Reel: React.FC<{ quiet?: boolean }> = ({ quiet = false }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("dept143_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED)} volume={(fr) => bedMix(fr) * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ dx: 0, dy: 0, s: 1, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE }}>
            {/* S0 HOOK — 2 shots, and the FIRST one carries the event */}
            <Sequence from={L.S0} durationInFrames={L.S1}><DeptHookPolish dur={L.S1} /></Sequence>

            <Sequence from={L.S1} durationInFrames={B.DEPTS_B - L.S1}><DEPTS_SCENE dur={B.DEPTS_B - L.S1} cut={0} /></Sequence>
            <Sequence from={B.DEPTS_B} durationInFrames={L.S2 - B.DEPTS_B}><DEPTS_SCENE dur={L.S2 - B.DEPTS_B} cut={1} /></Sequence>

            <Sequence from={L.S2} durationInFrames={B.SKILL_B - L.S2}><SKILL dur={B.SKILL_B - L.S2} cut={0} /></Sequence>
            <Sequence from={B.SKILL_B} durationInFrames={L.S3 - B.SKILL_B}><SKILL dur={L.S3 - B.SKILL_B} cut={1} /></Sequence>

            <Sequence from={L.S3} durationInFrames={L.S4 - L.S3}><MKT dur={L.S4 - L.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={B.PACK_B - L.S4}><PACK45 dur={B.PACK_B - L.S4} cut={0} /></Sequence>
            <Sequence from={B.PACK_B} durationInFrames={L.S5 - B.PACK_B}><PACK45 dur={L.S5 - B.PACK_B} cut={1} /></Sequence>

            <Sequence from={L.S5} durationInFrames={B.SOC_B - L.S5}><SOCIAL dur={B.SOC_B - L.S5} cut={0} /></Sequence>
            <Sequence from={B.SOC_B} durationInFrames={B.SOC_C - B.SOC_B}><SOCIAL dur={B.SOC_C - B.SOC_B} cut={1} /></Sequence>
            <Sequence from={B.SOC_C} durationInFrames={L.S6 - B.SOC_C}><SOCIAL dur={L.S6 - B.SOC_C} cut={2} /></Sequence>

            <Sequence from={L.S6} durationInFrames={B.GATE_B - L.S6}><GATE dur={B.GATE_B - L.S6} cut={0} /></Sequence>
            <Sequence from={B.GATE_B} durationInFrames={L.S7 - B.GATE_B}><GATE dur={L.S7 - B.GATE_B} cut={1} /></Sequence>

            <Sequence from={L.S7} durationInFrames={L.S8 - L.S7}><TWO dur={L.S8 - L.S7} /></Sequence>

            <Sequence from={L.S8} durationInFrames={B.GEN_B - L.S8}><GENERIC dur={B.GEN_B - L.S8} cut={0} /></Sequence>
            <Sequence from={B.GEN_B} durationInFrames={B.GEN_C - B.GEN_B}><GENERIC dur={B.GEN_C - B.GEN_B} cut={1} /></Sequence>
            <Sequence from={B.GEN_C} durationInFrames={L.S9 - B.GEN_C}><GENERIC dur={L.S9 - B.GEN_C} cut={2} /></Sequence>

            <Sequence from={L.S9} durationInFrames={L.S10 - L.S9}><FIN dur={L.S10 - L.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={B.LED_B - L.S10}><LEDGER dur={B.LED_B - L.S10} cut={0} /></Sequence>
            <Sequence from={B.LED_B} durationInFrames={L.S11 - B.LED_B}><LEDGER dur={L.S11 - B.LED_B} cut={1} /></Sequence>

            <Sequence from={L.S11} durationInFrames={L.S12 - L.S11}><LEGAL dur={L.S12 - L.S11} /></Sequence>
            <Sequence from={L.S12} durationInFrames={B.CON_B - L.S12}><CONTRACT dur={B.CON_B - L.S12} cut={0} /></Sequence>
            <Sequence from={B.CON_B} durationInFrames={L.S13 - B.CON_B}><CONTRACT dur={L.S13 - B.CON_B} cut={1} /></Sequence>

            <Sequence from={L.S13} durationInFrames={L.S14 - L.S13}><MOST dur={L.S14 - L.S13} /></Sequence>
            <Sequence from={L.S14} durationInFrames={L.S15 - L.S14}><HEAP dur={L.S15 - L.S14} /></Sequence>

            <Sequence from={L.S15} durationInFrames={B.REW_B - L.S15}><REWRITE dur={B.REW_B - L.S15} cut={0} /></Sequence>
            <Sequence from={B.REW_B} durationInFrames={L.S16 - B.REW_B}><REWRITE dur={L.S16 - B.REW_B} cut={1} /></Sequence>

            <Sequence from={L.S16} durationInFrames={L.S17 - L.S16}><TEAM dur={L.S17 - L.S16} /></Sequence>
            <Sequence from={L.S17} durationInFrames={L.END - L.S17}><CTA dur={L.END - L.S17} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   `feedback_headers_state_the_claim`: a header names the OUTCOME in the
   viewer's words, never the set and never the theme. The hook header is the
   PROMISE; every body header carries the fact the VO is saying right then, so
   a muted viewer gets the whole list without the audio.
   ⛔ The FIRST band gets a head start so the claim is fully rendered on frame 0
   — the one frame guaranteed to be seen, and the feed thumbnail.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "BUILD YOUR AI TEAM",     hot: "5 FREE SKILL PACKS" },
  { from: L.S1,  big: "ONE FREE PACK",         hot: "PER DEPARTMENT" },
  { from: L.S2,  big: "A SKILL IS ONE FILE",   hot: "SKILL.md" },
  { from: L.S3,  big: "45+ MARKETING SKILLS",   hot: "AD CREATIVES · COPYWRITING" },
  { from: L.S5,  big: "17 SOCIAL SKILLS",      hot: "SCRIPTS · THUMBNAILS · IDS" },
  { from: L.S6,  big: "PAST CONTENT",          hot: "INTO THE BUILD" },
  { from: L.S7,  big: "UI UX PRO + TASTE",     hot: "DESIGN JUDGMENT" },
  { from: L.S8,  big: "NOT THE GENERIC",       hot: "AI LOOK" },
  { from: L.S9,  big: "8 FINANCE SKILLS",      hot: "STATEMENTS · VARIANCE" },
  { from: L.S11, big: "9 LEGAL SKILLS",        hot: "CONTRACTS · BRIEFS" },
  { from: L.S13, big: "THE PART THAT MATTERS", hot: "MAKE THEM YOURS" },
  { from: L.S15, big: "MAKE CLAUDE REWRITE IT", hot: "AROUND YOUR BUSINESS" },
  { from: L.S16, big: "YOUR OWN AI TEAM",      hot: "FIVE DEPARTMENTS" },
  { from: L.S17, big: "COMMENT DEPARTMENT",    hot: "FOR THE SETUP GUIDE" },
];
const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const cand of BANDS) if (f >= cand.from) b = cand;
  return <HookHeader big={b.big} hot={b.hot} f={b === BANDS[0] ? f + 12 : f - b.from} />;
};
