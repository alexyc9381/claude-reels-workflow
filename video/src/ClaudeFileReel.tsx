import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import {
  S1Grid, S2File, S3GodMode, S4Download, S5App, S6Grid,
  S7NoLogin, S8Turn, S9Classic, S10Race, S11Cta,
  S1Start, S1Tower, S7Boards, S3Banner, FileCamCtx,
} from "./FileScenes";
import { CARD, INKD, GOLD, CLAY, GO } from "./FileWorld";
import words from "./data/words_file.json";

/* ============================================================================
   REEL 88 · "FILE" — one HTML file, 60 AI models, five of them racing.

   World: THE NIGHT CIRCUIT. Start-light gantry, rumbling kerbs, grandstand with
   camera flashes, tyre barrier, marshals, and a LIVE TIMING TOWER that ranks
   P1..P5 off the same progress function the track uses. The mechanism is
   POSITION: a race is the only hierarchy where the ranking IS the picture.

   VO: public/file_vo.wav — 24.908s (raw take 29.72s). Nothing was re-recorded;
   four measured -40dB silences were tightened (1.88s / 1.18s / 0.98s of dead air
   plus the lead-in). Every cut sits inside a measured silence with >=45ms
   margin. Re-transcribed after assembly: all 116 tokens survive.

   Captions: src/data/words_file.json — 113 words, 39 lines, 39/39 anchored to a
   measured RMS onset. Built by tools/build_captions.py, never hand-patched.

   ✅ REPO VERIFIED BEFORE BUILDING (the reel-84 lesson).
   elder-plinius/G0DM0D3 — 10,055 stars, AGPL-3.0. Root index.html is 792,970
   bytes (774 KB), no build step. 60 models via OpenRouter, up to 44 more via
   Venice. GODMODE CLASSIC races FIVE prompt+model combos in parallel.

   ⛔ TWO VO LINES ARE FALSE AS SPOKEN, and the graphic says the true version:
     "no cloud"          — calls DO go to OpenRouter/Venice. S7 row three reads
                           STAYS IN YOUR BROWSER (localStorage), which is real.
     "all the models race"— CLASSIC races five. S9/S10 show five lanes and five
                           panes, never sixty.
   ⛔ The repo is a jailbreak project ("LIBERATED AI CHAT"; CLASSIC pairs each
      model with a jailbreak prompt). Nothing here shows or implies that.
   ========================================================================== */

const FPS = 30;
export const FILE_TOTAL = 750;                       // 25.0s; last word ends 24.27

/* Scene starts are chosen a few frames AHEAD of the word they serve, so the cut
   leads the audio. The numbers in comments are measured onsets. */
const SCENES: { at: number; C: React.FC; head: [string, string]; label: string }[] = [
  { at:   0, C: S1Grid,     head: ["ONE FILE. 60 AI MODELS.", "NO INSTALL"],
                            label: "the grid — 5 models mid-sprint (file 35 · GitHub 46)" },
  { at:  62, C: S2File,     head: ["60 MODELS INSIDE", "ZERO SUBSCRIPTIONS"],
                            label: "one file, 60 models, $0 (50 @89 · zero @119)" },
  { at: 160, C: S3GodMode,  head: ["THEY'RE CALLING IT", "GOD MODE"],
                            label: "they're calling it God Mode (God @169)" },
  { at: 196, C: S4Download, head: ["DOWNLOAD ONE FILE", "OPEN IT IN YOUR BROWSER"],
                            label: "download it, open it (download @201 · browser @238)" },
  { at: 262, C: S5App,      head: ["GPT, CLAUDE, GEMINI, GROK", "ALL IN ONE APP"],
                            label: "the app — GPT @270 · Claude @296 · Gemini @305 · Grok @313" },
  { at: 356, C: S6Grid,     head: ["60 MODELS", "ONE PLACE"],
                            label: "all in one place (place @361)" },
  { at: 388, C: S7NoLogin,  head: ["NO LOGIN, NO ACCOUNT", "YOUR CHATS STAY WITH YOU"],
                            label: "no login @392 · no subscription @408 · in-browser @423" },
  { at: 470, C: S8Turn,     head: ["THE ONE MODE", "NOBODY TURNS ON"],
                            label: "the turn — actually wild @478" },
  { at: 506, C: S9Classic,  head: ["TYPE ONE PROMPT", "FIVE MODELS ANSWER"],
                            label: "CLASSIC MODE @511 · one prompt @552" },
  { at: 570, C: S10Race,    head: ["FIVE ANSWERS AT ONCE", "PICK THE WINNER"],
                            label: "the race — models @577 · best @613 · time @643" },
  { at: 664, C: S11Cta,     head: ["GET THE FILE", "COMMENT FILE"],
                            label: "comment FILE @687 · below @710" },
];

/* ============================================================================
   TRANSITIONS.

   NO CHECKERBOARD. A grid of cubes scaling in reads as a 2004 slideshow wipe and
   it fights the racing world instead of serving it. These are SPEED STREAKS:
   solid bars raking across at different rates, the same visual language as the
   trails behind the racers.
   ========================================================================== */
const StreakWipe: React.FC<{ at: number; dur?: number; c?: string }> =
  ({ at, dur = 12, c = CLAY }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < 0 || k >= dur) return null;
  const t = k / dur;
  return (
    <AbsoluteFill style={{ zIndex: 90, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 13 }, (_, i) => {
        const rate = 1 + (i % 4) * 0.34;
        const lead = (i % 5) * 0.05;
        /* in from the right, straight out to the left — it never holds */
        const x = 120 - Math.min(1, Math.max(0, (t - lead) * rate * 1.9)) * 250;
        const h = [26, 52, 18, 40, 32][i % 5];
        return (
          <div key={i} style={{ position: "absolute", left: `${x}%`,
            top: 384 + i * 60, width: "115%", height: h,
            background: i % 3 === 0 ? c : i % 3 === 1 ? CARD : INKD, opacity: 0.94 }} />
        );
      })}
    </AbsoluteFill>
  );
};

const FlashCut: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < 0 || k > 3) return null;
  return <AbsoluteFill style={{ background: "#FFF3E8", opacity: (1 - k / 3) * 0.34, zIndex: 91 }} />;
};

/* ============================================================================
   SOUND. Cues in SECONDS. Race ambience under the circuit shots, UI clicks
   under the app shots, and the heaviest stack on frame 0.
   ========================================================================== */
const A = "am/";
const s = (fr: number) => fr / FPS;

const SFX: Cue[] = [
  /* ---- frame 0 · the grid, already at speed ---- */
  { at: 0.00, src: A + "hit-boom.wav",     v: LEVELS.SFX_HERO,    dur: 2.0, lead: 0 },
  { at: 0.00, src: A + "riser-metal.wav",  v: LEVELS.SFX_MID,     dur: 1.5, lead: 0 },
  { at: 0.02, src: A + "crowd-cheer.wav",  v: LEVELS.SFX_BED,     dur: 2.4, lead: 0 },
  ...repeat(5, 0.06, 0.09, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4 }, 0.09),
  { at: s(46), src: A + "hit-up.wav",      v: LEVELS.SFX_MID,     dur: 0.6 },
  ...repeat(6, s(48), 0.06, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.22 }, 0.05),

  /* ---- S2 · the file lands, the count rolls, the price drops ---- */
  ...layer(s(62), { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.7 },
                  { src: A + "paper-slide.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.6 }),
  ...repeat(8, s(89), 0.055, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.22 }, 0.05),
  ...layer(s(119), { src: A + "coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.7 },
                   { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),

  /* ---- S3 · the name ---- */
  ...layer(s(160), { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.6 },
                   { src: A + "riser-sharp.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.7 }),
  ...layer(s(169), { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.3 },
                   { src: A + "unlock.wav",   v: LEVELS.SFX_MID,  dur: 0.9 }),
  ...repeat(5, s(176), 0.07, { src: A + "click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.25 }, 0.06),

  /* ---- S4 · a real click, a real download, a window opening ---- */
  { at: s(196), src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  ...layer(s(210), { src: A + "click-mac.wav",  v: LEVELS.SFX_HERO, dur: 0.5 },
                   { src: A + "click-mouse.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }),
  { at: s(212), src: A + "loading-loop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.85 },
  ...layer(s(238), { src: A + "hit-up.wav",       v: LEVELS.SFX_MID, dur: 0.7 },
                   { src: A + "terminal-soft.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }),

  /* ---- S5 · one soft click per model, ON its measured onset ---- */
  { at: s(262), src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...[270, 296, 305, 313].flatMap((fr, i) =>
    [{ at: s(fr), src: A + "ui-click.wav", v: LEVELS.SFX_MID, dur: 0.28,
       rate: 1 + i * 0.06, lead: 0 }]),
  { at: s(300), src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 1.1 },

  /* ---- S6 · the catalogue snapping in ---- */
  { at: s(356), src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...repeat(9, s(358), 0.045, { src: A + "click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.05),

  /* ---- S7 · three checks, three onsets ---- */
  { at: s(388), src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  ...[392, 408, 423].flatMap((fr, i) =>
    layer(s(fr), { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1 + i * 0.07 },
                 { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 })),

  /* ---- S8 · the turn ---- */
  ...layer(s(470), { src: A + "ring-low.wav",   v: LEVELS.SFX_MID, dur: 1.4, rate: 0.9 },
                   { src: A + "riser-metal.wav", v: LEVELS.SFX_TEXTURE, dur: 1.2 }),
  { at: s(478), src: A + "ping.wav", v: LEVELS.SFX_MID, dur: 0.6 },

  /* ---- S9 · CLASSIC goes on, then one prompt is typed ---- */
  ...layer(s(511), { src: A + "unlock.wav",   v: LEVELS.SFX_HERO, dur: 1.0 },
                   { src: A + "hit-boom.wav", v: LEVELS.SFX_MID,  dur: 1.1 }),
  { at: s(534), src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  { at: s(552), src: A + "keys-macbook.wav", v: LEVELS.SFX_MID, dur: 1.4 },

  /* ---- S10 · five panes streaming, then the finish ---- */
  { at: s(570), src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...repeat(10, s(577), 0.08, { src: A + "bubble-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.07),
  ...layer(s(612), { src: A + "hit-boom.wav",    v: LEVELS.SFX_HERO, dur: 1.2 },
                   { src: A + "crowd-cheer.wav", v: LEVELS.SFX_MID,  dur: 2.2 }),
  ...repeat(4, s(614), 0.10, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_TEXTURE, dur: 0.35 }, 0.08),
  ...layer(s(643), { src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.4 },
                   { src: A + "crowd-applause.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8 }),

  /* ---- S11 · the CTA ---- */
  ...layer(s(664), { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.6 },
                   { src: A + "riser-sharp.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.7 }),
  ...layer(s(687), { src: A + "hit-boom.wav",       v: LEVELS.SFX_HERO, dur: 1.3 },
                   { src: A + "positive-chime.wav", v: LEVELS.SFX_MID,  dur: 1.1 }),
  { at: s(710), src: A + "unlock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 },
];

/** the per-scene header; `f` restarts at 0 inside each Sequence, so the
    SectionHeader settle animation replays on every cut for free */
const HeadFor: React.FC<{ big: string; hot: string }> = ({ big, hot }) => {
  const f = useCurrentFrame();
  return <HookHeader f={f} big={big} hot={hot} />;
};

/* ============================================================================
   THE VARIANTS. One row per split-test cut.

   ⛔ Reels 83/84 varied only the HOOK and their body luma delta collapsed to ~5.
      Each row below swaps its opening AND a body beat, on top of a different
      bed, in-panel camera, transition kit, caption band and playback rate.
      The retime is the only change that has ever moved audio correlation
      (0.87 -> 0.00 on reels 83/84), so every variant gets one.
   ========================================================================== */
export type Variant = {
  id: string;
  /** scene overrides, keyed by the scene's start frame */
  swap: Record<number, React.FC>;
  bed: string;
  wipes: number[];
  cam: { z: number; dx: number; dy: number };
  capTop: number;
  rate: number;
  note: string;
};

export const VARIANTS: Variant[] = [
  { id: "A", swap: {}, bed: "file_bed.wav", wipes: [160, 262, 506, 664],
    cam: { z: 1.00, dx: 0, dy: 0 }, capTop: 1272, rate: 1.00,
    note: "THE SPRINT - opens mid-race, streak wipes on the four big turns." },

  { id: "B", swap: { 0: S1Start, 388: S7Boards }, bed: "file_bed_b.wav", wipes: [],
    cam: { z: 1.05, dx: -16, dy: -8 }, capTop: 1238, rate: 0.96,
    note: "THE STANDING START - lights out from the grid; claims arrive as trackside hoardings." },

  { id: "C", swap: { 0: S1Tower, 160: S3Banner }, bed: "file_bed_c.wav",
    wipes: [62, 196, 356, 470, 570, 664],
    cam: { z: 1.04, dx: 18, dy: 9 }, capTop: 1306, rate: 1.05,
    note: "THE BOARD - opens on the live timing tower; GOD MODE runs across a banner." },
];

export const makeFileReel = (V: Variant): React.FC => () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-13) :
    f > FILE_TOTAL - 16 ? db(-12) * Math.max(0, (FILE_TOTAL - f) / 16) : db(-12);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("file_vo.wav")} />
      <Audio src={staticFile(V.bed)} volume={music} />
      <SfxTrack cues={SFX} />

      <Bg />

      <FileCamCtx.Provider value={V.cam}>
      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const to = i < SCENES.length - 1 ? SCENES[i + 1].at : FILE_TOTAL;
          const C = V.swap[sc.at] ?? sc.C;
          return (
            <Sequence key={i} from={sc.at} durationInFrames={to - sc.at} layout="none">
              <AbsoluteFill><C /></AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>
      </FileCamCtx.Provider>

      {SCENES.slice(1).map((sc, i) =>
        V.wipes.includes(sc.at)
          ? <StreakWipe key={"w" + sc.at} at={sc.at - 6} c={[CLAY, GOLD, GO, CLAY][i % 4]} />
          : <FlashCut key={"f" + sc.at} at={sc.at} />)}

      {/* the header states the CLAIM for the scene it sits over, in product
          nouns, and re-settles on every cut (`key` forces the entrance again) */}
      {SCENES.map((sc, i) => {
        const to = i < SCENES.length - 1 ? SCENES[i + 1].at : FILE_TOTAL;
        return (
          <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
            <HeadFor big={sc.head[0]} hot={sc.head[1]} />
          </Sequence>
        );
      })}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={V.capTop} />
    </AbsoluteFill>
  );
};

export const FileReel  = makeFileReel(VARIANTS[0]);
export const FileReelB = makeFileReel(VARIANTS[1]);
export const FileReelC = makeFileReel(VARIANTS[2]);
