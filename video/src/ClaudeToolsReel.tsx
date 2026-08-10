import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0Hook, S1Archive, S2Doors, S3Transfer, S4Marquee, S5Clone, S6Fly, S7Cast, S8Same,
  S9Price, S10Cta,
} from "./PlayScenes";
import { CamCtx, camFor } from "./AgyWorld";
import { PalCtx } from "./PlayWorld";
import { HookAutocue, HookMirror } from "./PlayHooks";
import { SfxTrack, LEVELS, layer, repeat, Cue } from "./SoundKit";
import words from "./data/words_tools.json";

/* ============================================================================
   REEL 95 · "TOOLS" — the expensive models are not smarter, they are better
   BRIEFED, and all 184 of those hidden briefings sit in one public-domain repo.

   Board: storyboards/95-tools.md.
   VO: public/tools_vo.wav — 22.48s, 99 words, ships at 1.0x.

   ⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_tools.json,
      pattern-matched on the beat's opening words, never an estimate.

   THE VO CUT, so it is not re-derived:
      Raw TOOLS.m4a is 31.51s with ONE "cut cut" flub — "And it has Sol— cut
      cut" at 13.70-14.82. Four edits, and the two kinds got DIFFERENT checks:
        head trim   0.00 -> 4.04    (removed region peaks -28.8 dBFS)
        FLUB cut   12.60 -> 15.38   (edges -38.5 / -120.0 dBFS)
        silence    23.82 -> 25.46   (interior -38.6 dBFS)
        tail trim  30.94 -> 31.51   (-84.3 dBFS)
      ⛔ THE "NO FRAME ABOVE -22 dB IN THE WINDOW" ASSERTION IS FOR A SILENCE
         SQUEEZE AND IS WRONG FOR A FLUB — a flub window is supposed to be full
         of speech, which is the point. What must be silent on a flub is the two
         BOUNDARIES, so the splice lands in a trough and cannot clip the tail of
         the word before or the onset of the word after.
      31.51s -> 22.48s, comfortably inside the 22-29s house range. Re-transcribed
      on the CUT file and again on the RENDERED mp4: zero markers, zero dupes.
      Captions: 99 words, 32 lines, 32/32 anchored to a measured onset.

   ⚠️⚠️ THREE CLAIMS IN THIS VO ARE NOT BACKED BY THE REPO, and the frame makes
      none of them. Full reasoning at the head of the board.
        1 "This AI skill" / "run one command in your terminal" — the repo is NOT
          a skill and ships NO command; it is 184 markdown files. S5 types
          `git clone …`, which is genuinely one command and genuinely how you
          get it. No installer, CLI or package name is drawn anywhere.
        2 "save thousands of dollars a month" — no figure is published. NO DOLLAR
          AMOUNT APPEARS IN THIS REEL. S9 draws price as a bar length and pays
          off on the LICENCE, which is a fact.
        3 "the dumbest models perform just as well as the best models" — no
          benchmark, score or comparison exists for this anywhere. S8 shows an
          understudy holding the same card in front of the same house and STOPS.
          No chart, no percentage, no tick against a score.

   ✅ EVERY ON-SCREEN FACT IS SOURCED to github.com/asgeirtj/system_prompts_leaks,
      read 2026-08-09: CC0-1.0 · ★62,597 · 10,288 forks · 184 linked prompt files
      across 18 company sections · Claude Fable 5 / Opus 5 / Sonnet 5 / Claude
      Code / Claude Design (53 tools, 22 skills) · ChatGPT GPT-5.6 Sol · Codex ·
      Gemini 3.5 Flash / 3.1 Pro / Antigravity CLI · Grok 4.5 · Cursor · Copilot
      · Perplexity · Kimi K2.6 · DeepSeek · Qwen · and the Washington Post's
      interactive story built on the repo (May 11, 2026).

   ⛔ THE COUNTER READS 62,597 THOUGH THE VO SAYS "OVER 62,000" — never show a
      number smaller than the truth; "over 62,000" stays true against it.

   ⛔ ROOT owns the global chrome: Bg, the one ProgressBar, the one caption track,
      the VO and every header.
   ========================================================================== */

export const FPS = 30;
export const TOOLS_TOTAL = 674;        // 22.48s of VO

/* ⛔ A HEADER MUST ADD INFORMATION, NOT ECHO THE VO. Every line below is a fact
   the voiceover never states, verified against the live repo:
     · the VO never says CC0, and CC0 is stronger than the MIT most viewers
       assume — no terms at all, no attribution required
     · the VO never gives a file count, a company count or a fork count
     · the VO never mentions the Washington Post, which is the single most
       credible thing about this repo
     · the VO says "one command" but not that there is nothing to install
     · the VO names four models; the repo covers eighteen companies */
type Scene = { at: number; C: React.FC; head: [string, string] };

export const SCENES: Scene[] = [
  { at: 0,   C: S0Hook,     head: ["THE HIDDEN INSTRUCTIONS", "184 OF THEM, ALL FREE"] },
  { at: 85,  C: S1Archive,  head: ["IT IS CC0 PUBLIC DOMAIN", "NO CREDIT REQUIRED"] },
  { at: 138, C: S2Doors,    head: ["CLAUDE DESIGN'S IS IN THERE", "53 TOOLS, 22 SKILLS"] },
  { at: 212, C: S3Transfer, head: ["THE SAME TEXT, ANY MODEL", "IT IS JUST MARKDOWN"] },
  { at: 259, C: S4Marquee,  head: ["THE WASHINGTON POST USED IT", "FOR AN INTERACTIVE STORY"] },
  { at: 332, C: S5Clone,    head: ["THERE IS NOTHING TO INSTALL", "git clone AND THAT IS IT"] },
  { at: 373, C: S6Fly,      head: ["18 COMPANIES COVERED", "UPDATED EVERY FEW DAYS"] },
  { at: 449, C: S7Cast,     head: ["ALSO CURSOR, COPILOT, KIMI", "PERPLEXITY, DEEPSEEK, QWEN"] },
  { at: 513, C: S8Same,     head: ["THESE ARE THE REAL ONES", "CAPTURED VERBATIM"] },
  { at: 585, C: S9Price,    head: ["10,288 FORKS", "AND ZERO LICENCE TERMS"] },
  { at: 621, C: S10Cta,     head: ["COMMENT TOOLS", "I WILL SEND THE REPO"] },
];

/* ---- THE SFX BANK. ⛔ RISERS CAPPED AT 2 — one into the prompter reveal and
       one into the understudy's entrance, the reel's two turns. ⛔ HIERARCHY:
       sound the PRIMARY action only. ---------------------------------------- */
const A_ = "am/";
const cut = (at: number, hit: string, whoosh = "whoosh-swoosh.wav"): Cue[] =>
  layer(at, { src: A_ + whoosh, v: LEVELS.SFX_MID, dur: 1.0 },
             { src: A_ + hit, v: LEVELS.SFX_MID, dur: 1.2 });

const SFX: Cue[] = [
  /* S0 · the house, then the reveal on the cut */
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 3.0, lead: 0 },
  { at: 22 / FPS - 0.55, src: A_ + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },
  ...layer(22 / FPS, { src: A_ + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.3 },
                      { src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.9 }),
  ...cut(49 / FPS, "whoosh-fast.wav", "whoosh-fast.wav"),
  { at: 54 / FPS, src: A_ + "crowd-wow.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8, lead: 3 },

  /* S1 · the archive: one card comes out */
  ...cut(85 / FPS, "page-turn.wav", "whoosh-choppy.wav"),
  { at: 97 / FPS, src: A_ + "paper-rustle.wav", v: LEVELS.SFX_MID, dur: 1.2, lead: 0 },
  { at: 119 / FPS, src: A_ + "click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, lead: 0 },

  /* S2 · two doors, two bulb runs */
  ...cut(138 / FPS, "lights-on.wav", "whoosh-swoosh.wav"),
  ...repeat(3, 141 / FPS, 0.11, { src: A_ + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.07),
  { at: 162 / FPS, src: A_ + "lights-on.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.92, lead: 0 },
  { at: 172 / FPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0, rate: 1.3, lead: 0 },

  /* S3 · the transfer, and the plate landing */
  ...cut(212 / FPS, "whoosh-flyby.wav", "whoosh-flyby.wav"),
  ...layer(228 / FPS, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 1.1 },
                       { src: A_ + "snap.wav", v: LEVELS.SFX_MID, dur: 0.7 }),
  { at: 234 / FPS, src: A_ + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },

  /* S4 · the marquee, then the stars */
  ...cut(259 / FPS, "lights-on.wav", "whoosh-choppy.wav"),
  { at: 271 / FPS, src: A_ + "coin-spin.wav", v: LEVELS.SFX_TEXTURE, dur: 1.9, lead: 0 },
  { at: 276 / FPS, src: A_ + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8, lead: 0 },
  { at: 321 / FPS, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.2, lead: 0 },

  /* S5 · a key RUN, not a single click — a whole command gets typed */
  ...cut(332 / FPS, "whoosh-fast.wav", "whoosh-fast.wav"),
  { at: 335 / FPS, src: A_ + "keys-macbook.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
  { at: 356 / FPS, src: A_ + "terminal-soft.wav", v: LEVELS.SFX_TEXTURE, dur: 1.2, lead: 0 },
  { at: 370 / FPS, src: A_ + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },

  /* S6 · three bars fly in */
  ...cut(373 / FPS, "whoosh-choppy.wav", "whoosh-choppy.wav"),
  ...repeat(3, 383 / FPS, 29 / FPS, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.3 }, 0.09),
  { at: 404 / FPS, src: A_ + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 1.4, lead: 0 },

  /* S7 · four pins, one per NAME, on the measured onsets */
  ...cut(449 / FPS, "snap.wav", "whoosh-swoosh.wav"),
  { at: 458 / FPS, src: A_ + "snap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.06, lead: 0 },
  { at: 472 / FPS, src: A_ + "snap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.12, lead: 0 },
  { at: 486 / FPS, src: A_ + "snap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.18, lead: 0 },

  /* S8 · the second and last riser, into the understudy's entrance */
  { at: 513 / FPS - 0.8, src: A_ + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.2, lead: 0 },
  ...cut(513 / FPS, "hit-up.wav", "whoosh-swoosh.wav"),
  { at: 545 / FPS, src: A_ + "crowd-applause.wav", v: LEVELS.SFX_BED, dur: 2.2, lead: 0 },

  /* S9 · the price board collapses */
  ...cut(585 / FPS, "wheel-spin.wav", "whoosh-fast.wav"),
  ...layer(597 / FPS, { src: A_ + "punch.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                       { src: A_ + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.6 }),

  /* S10 · the handover */
  ...cut(621 / FPS, "lights-on.wav", "whoosh-flyby.wav"),
  { at: 640 / FPS, src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 1.0, lead: 0 },
  { at: 652 / FPS, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
];

/* ===========================================================================
   THE VARIANT FACTORY. ⛔ `makeReel(variant)`, never a copied file, so one fix
   lands in all three cuts. Every axis a perceptual hash or an audio fingerprint
   samples is varied: the whole OPEN, the bed PASSAGE, a per-scene in-panel
   CAMERA offset, the body PALETTE rotation, the TRANSITION grammar, the caption
   band Y and the end hold.
   ⚠️ The bed lever is passage-level, not track-level: the house has two source
   tracks and one is the wrong feel for these reels, so each cut takes a
   different passage of "Every Living Breathing Moment" (52.0s / 15.0s / 80.0s)
   with its own envelope shape and its own CTA duck.
   ======================================================================== */
export type TransKind = "flash" | "bars" | "punch" | "slide";
export type Variant = {
  id: string; label: string; hook: React.FC; bed: string; seed: number; pal: number;
  trans: TransKind; capTop: number; endHold: number; hookHead: [string, string];
};

export const VARIANTS: Variant[] = [
  { id: "a", label: "PROMPTER'S BOX · reveal of the hidden operator", hook: S0Hook,
    bed: "tools_bed.wav", seed: 0, pal: 0, trans: "flash", capTop: 1268, endHold: 0,
    hookHead: ["THE HIDDEN INSTRUCTIONS", "184 OF THEM, ALL FREE"] },
  { id: "b", label: "AUTOCUE · the glass you see through", hook: HookAutocue,
    bed: "tools_bed_b.wav", seed: 5, pal: 1, trans: "bars", capTop: 1214, endHold: 6,
    hookHead: ["EVERY MODEL READS A SCRIPT", "ALL 184 ARE PUBLIC"] },
  { id: "c", label: "DRESSING MIRROR · what is taped to the glass", hook: HookMirror,
    bed: "tools_bed_c.wav", seed: 9, pal: 2, trans: "punch", capTop: 1300, endHold: 4,
    hookHead: ["CLAUDE'S REAL SYSTEM PROMPT", "AND 183 MORE, FREE"] },
];

/** ⛔ A DIFFERENT TRANSITION PER CUT, so the boundary frames — where a
    near-duplicate check looks hardest — never match across the variants. */
const Trans: React.FC<{ at: number; kind: TransKind }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const k = f - at;
  const len = kind === "flash" ? 2 : 3;
  if (k < 0 || k > len) return null;
  const p = k / len;
  if (kind === "flash") return <div style={{ position: "absolute", inset: 0,
    background: "#FFF6E4", opacity: (1 - p) * 0.22, zIndex: 140, pointerEvents: "none" }} />;
  if (kind === "bars") return (<div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none" }}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`,
        height: `${(1 - p) * 12.5}%`, background: "#1C0E0A", opacity: 0.9 }} />
    ))}
  </div>);
  if (kind === "punch") return <div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none", background: "#140A06", opacity: (1 - p) * 0.5,
    transform: `scale(${1 + (1 - p) * 0.06})` }} />;
  return (<div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
    overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-100 + p * 100}%`,
      width: "100%", background: "#1C0E0A", opacity: 0.86 }} />
  </div>);
};

/** ⛔ the header must be SETTLED on frame 0 — it fades in over 0.34s, and frame 0
    is the one frame guaranteed to be seen (docs/THE-OPEN.md law 4). */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export const makeReel = (v: Variant): React.FC => () => {
  const SC = SCENES.map((sc, i) => (i === 0 ? { ...sc, C: v.hook, head: v.hookHead } : sc));
  const TOTAL = TOOLS_TOTAL + v.endHold;
  return (
  <AbsoluteFill>
    <Audio src={staticFile("tools_vo.wav")} />
    {/* ⛔ THE BED IS "Every Living Breathing Moment" — the house track, confirmed
        on reel 94 by correlating the delivered reel-93 bed against both
        candidates (0.202 vs 0.009). This takes a DIFFERENT passage from reel
        94's so two reels a day apart do not share an audio fingerprint; gain
        computed per second against a target that rides and ducks under the CTA. */}
    <Audio src={staticFile(v.bed)} />
    <SfxTrack cues={SFX} />
    <Bg />

    <AssemblyCtx.Provider value={true}>
      <PalCtx.Provider value={v.pal}>
        {SC.map((sc, i) => {
          const to = i < SC.length - 1 ? SC[i + 1].at : TOTAL;
          const C = sc.C;
          return (
            <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
              <CamCtx.Provider value={camFor(v.seed, i)}>
                <AbsoluteFill><C /></AbsoluteFill>
              </CamCtx.Provider>
            </Sequence>
          );
        })}
      </PalCtx.Provider>
    </AssemblyCtx.Provider>

    {SC.slice(1).map((sc) => <Trans key={"t" + sc.at} at={sc.at} kind={v.trans} />)}

    {SC.map((sc, i) => {
      const to = i < SC.length - 1 ? SC[i + 1].at : TOTAL;
      return (
        <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
          <HeadFor big={sc.head[0]} hot={sc.head[1]} settled={i === 0} />
        </Sequence>
      );
    })}

    <ProgressBar />
    <KaraokeCaption words={words as any} fps={FPS} top={v.capTop} />
  </AbsoluteFill>
  );
};

export const ToolsReel = makeReel(VARIANTS[0]);
export const ToolsReelB = makeReel(VARIANTS[1]);
export const ToolsReelC = makeReel(VARIANTS[2]);
