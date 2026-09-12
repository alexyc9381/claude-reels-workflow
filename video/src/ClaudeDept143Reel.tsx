import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_dept143.json";
import {DeptRebuild} from './DeptRebuild';
import {DEPT_REBUILD_SFX} from './DeptRebuildSound';

/* DEPARTMENT: full creative revision after Alex rejected the recreation.
   Active storyboard: storyboards/143-department.md.
   The original voice, caption timings and house chrome are preserved. All 31 shot
   bodies come from DeptRebuild: overload/catch/redirect, a working office, an applied
   skill, storefront campaign, shoot/edit, design recomposition, finance and legal
   inspection, customization and a connected working team.
   Do not retrieve the old factory's passing measurements as creative approval. */

const FPS = 30;

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

/** This revision has new action timing; never inherit the rejected factory cue map. */
export const SFX: Cue[] = DEPT_REBUILD_SFX;

/* House instrumental, trimmed at source 13.95s; original tempo, 5dB sentence-tail duck. */
const BED = "dept143_bed.wav";
const CAP_Y = 1272;
export const BED_GAIN = db(7.0); // restores the 2dB prep headroom; music-only +1.5dB bass shelf
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

        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE }}>
            <DeptRebuild />
          </div>
        </AssemblyCtx.Provider>

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
  { from: L.S0,  big: "BUILD YOUR CLAUDE TEAM", hot: "5 FREE SKILL PACKS" },
  { from: L.S1,  big: "FREE CLAUDE SKILLS",     hot: "FOR EVERY DEPARTMENT" },
  { from: L.S2,  big: "A CLAUDE SKILL IS ONE FILE", hot: "SKILL.md" },
  { from: L.S3,  big: "45+ MARKETING SKILLS",   hot: "AD CREATIVES · COPYWRITING" },
  { from: L.S5,  big: "17 SOCIAL SKILLS",      hot: "SCRIPTS · THUMBNAILS · IDS" },
  { from: L.S6,  big: "BETTER DESIGN",         hot: "WEBSITES · PRODUCTS · BRANDS" },
  { from: L.S7,  big: "UI UX PRO + TASTE",     hot: "DESIGN JUDGMENT" },
  { from: L.S8,  big: "BETTER DESIGN JUDGMENT", hot: "MAKE THE RESULT DISTINCT" },
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
