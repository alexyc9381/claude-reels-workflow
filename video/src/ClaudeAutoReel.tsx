import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { AutoHook, AUTO_CUTS, AUTO_HOOK_LEN } from "./AutoHook";
import { S1Rooms, S1Belts, S2Hall, S3Import, S4Everyone, S4Dawn, S5Cta } from "./AutoScenes";
import { AutoHookF, AutoHookH } from "./AutoHooks2";
import { AutoCut, AKind } from "./AutoTransitions";
import { AutoCamCtx } from "./AutoScenes";
import words from "./data/words_auto.json";

/* ============================================================================
   REEL 85 · "AUTO" — one GitHub repo, 280 pre-built automations.

   World: THE NIGHT TOWER. A city at night and a column of branded work that
   leaves the top of frame. Won over seven candidates across three rounds; the
   mechanism is DEPTH — cards shrink with height, so the nearest are readable
   and the far ones recede into mass.

   VO: public/auto_vo_final.wav — 21.98s (raw take 31.46s).
   Two `cut cut` flubs and a duplicated CTA removed; the RETAKE of the CTA is
   the one kept. Every boundary sits inside a measured quiet window.
   ⚠️ The join after "every morning" had NO -40dB gap — silencedetect found
   nothing because the pause is only ~80ms, under its 0.10s floor. Used the
   energy-envelope fallback: a 5ms RMS scan put the trough at 25.835s / -76 dBFS
   and the cut went there. Verified by re-transcribing the assembled file.

   Captions: src/data/words_auto.json — 97 words, 33 lines, 33/33 anchored to a
   measured onset. Best ratio of any reel in this workflow.

   ✅ REPO VERIFIED BEFORE BUILDING (the reel-84 lesson):
   enescingoz/awesome-n8n-templates — 24,302 stars, README states "280+
   automation templates across 18 categories". Gmail/Slack/WhatsApp/Notion all
   exist as categories with 29/10/6/12 files.
   ⛔ "Stripe" appears in ZERO of the repo's 374 files and zero times in the
   README. The VO names it anyway. No Stripe mark is ever drawn: the four real
   marks land on their own measured onsets and on "Stripe" (11.80) the graphic
   cuts to the 18-category wall, which the VO names 0.5s later.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* Scene starts are MEASURED word onsets from words_auto.json, not estimates. */
const SCENES: { s: number; label: string }[] = [
  { s: 0.00,  label: "the open" },
  { s: 5.56,  label: "inbox / leads / content, while he sleeps" },
  { s: 10.46, label: "four real marks, then the 18 categories" },
  { s: 14.26, label: "drop the file, click import, it runs" },
  { s: 18.20, label: "everyone else, by hand" },
  { s: 20.50, label: "comment AUTO" },
];
const END_S = 21.98;                       // last word ends 21.30
export const AUTO_TOTAL = Math.round(END_S * FPS);

const LEAD = 3;
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

/* ============================================================================
   SOUND. Every cue is RELATIVE to its scene start, so a re-time is one edit.
   ========================================================================== */
const A = "am/";

const scoreCut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.1, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];

const cutSfx = (t: number, k: AKind): Cue[] =>
  k === "card" ? scoreCut(t, "paper-slide.wav", "hit-boom.wav", "riser-sharp.wav", 1.02)
: k === "tick" ? scoreCut(t, "whoosh-fast.wav", "hit-up.wav", "positive-chime.wav")
: k === "wire" ? scoreCut(t, "whoosh-swoosh.wav", "snap.wav", "riser-metal.wav", 1.05)
:                scoreCut(t, "whoosh-flyby.wav", "hit-boom.wav", "ring-low.wav", 0.92);

const amb = (t: number, dur: number, src: string, v: number = LEVELS.SFX_BED): Cue[] =>
  [{ at: t, src: A + src, v, dur, lead: 0 }];

const [S1, S2, S3, S4, S5] = SCENES.slice(1).map((x) => x.s);

/* the hook's cuts are scored FROM THE LIST, so a re-cut cannot leave a silent
   transient behind (the bug that bit reel 82) */
const HOOK_KIT: [string, string, string, number][] = [
  ["paper-slide.wav",   "hit-boom.wav", "riser-sharp.wav", 1.00],
  ["whoosh-fast.wav",   "hit-up.wav",   "positive-chime.wav", 1.06],
  ["whoosh-swoosh.wav", "snap.wav",     "riser-metal.wav", 0.95],
];
const hookCues = (cuts: number[]): Cue[] =>
  cuts.flatMap((cf, i) => {
    const [mv, imp, tex, rate] = HOOK_KIT[i % HOOK_KIT.length];
    return scoreCut(cf / FPS, mv, imp, tex, rate);
  });

const sfxFor = (V: Variant): Cue[] => [
  /* ---- THE OPEN. Frame 0 carries the heaviest stack in the reel. ---- */
  { at: 0.00, src: A + "hit-boom.wav",       v: LEVELS.SFX_HERO,    dur: 2.0, lead: 0 },
  { at: 0.00, src: A + "riser-metal.wav",    v: LEVELS.SFX_MID,     dur: 1.4, lead: 0 },
  { at: 0.03, src: A + "room-tone.wav",      v: LEVELS.SFX_BED,     dur: 5.5, lead: 0 },
  /* the tower building itself, card by card */
  ...repeat(9, 0.12, 0.10, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.07),
  ...hookCues(V.hookCuts),
  /* the pile draining: a run of ticks, pitch-varied so 16 do not read as a buzz */
  ...repeat(8, V.hookCuts[0] / FPS + 0.20, 0.13,
            { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.3 }, 0.08),
  { at: V.hookCuts[0] / FPS + 0.46, src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.8 },
  /* the count landing */
  ...repeat(7, V.hookCuts[1] / FPS + 0.10, 0.075,
            { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.22 }, 0.06),
  ...layer(V.hookCuts[1] / FPS + 0.32, { src: A + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                                      { src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.1 }),
  /* the canvas wiring itself */
  ...repeat(4, V.hookCuts[2] / FPS + 0.10, 0.22,
            { src: A + "ui-click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.25 }, 0.05),

  /* ---- S1 · three rooms, each on its own measured onset ---- */
  ...cutSfx(S1 - 0.10, V.cuts[0]),
  ...amb(S1, S2 - S1, "room-tone.wav"),
  /* inbox 5.56 · leads 6.52 · content 7.90 — a chime per clause, not an even run */
  ...[0.10, 1.06, 2.44].flatMap((d, i) =>
    layer(S1 + d, { src: A + "ping-msg.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1 + i * 0.06 },
                  { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.35 })),
  ...repeat(10, S1 + 0.40, 0.30, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.25 }, 0.06),

  /* ---- S2 · four marks on their words, then the 18 wall ---- */
  ...cutSfx(S2 - 0.10, V.cuts[1]),
  /* Gmail 10.46 Slack 10.60 WhatsApp 11.24 Notion 11.48 — RELATIVE to 10.36 */
  ...[0.10, 0.24, 0.88, 1.12].flatMap((d, i) =>
    [{ at: S2 + d, src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.5,
       rate: 1 + i * 0.05, lead: 0 }]),
  { at: S2 + 1.55, src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.0 },
  ...repeat(9, S2 + 1.62, 0.05, { src: A + "ui-click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.05),
  { at: S2 + 2.30, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.0 },

  /* ---- S3 · grab 15.98 · import 16.80 · running 17.49 (scene starts 14.16) ---- */
  ...cutSfx(S3 - 0.10, V.cuts[2]),
  ...amb(S3, S4 - S3, "room-tone.wav"),
  { at: S3 + 1.82, src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.7 },
  ...layer(S3 + 2.64, { src: A + "click-hard.wav", v: LEVELS.SFX_HERO, dur: 0.6 },
                      { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.8 }),
  ...repeat(4, S3 + 2.80, 0.20, { src: A + "ui-click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.25 }, 0.05),
  { at: S3 + 3.33, src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.2 },

  /* ---- S4 · the dawn yard, and the one card moved by hand ---- */
  ...cutSfx(S4 - 0.10, V.cuts[3]),
  ...amb(S4, S5 - S4, "room-tone.wav", LEVELS.SFX_BED),
  { at: S4 + 0.24, src: A + "ring-low.wav", v: LEVELS.SFX_MID, dur: 1.5, rate: 0.9 },
  ...repeat(3, S4 + 0.60, 0.52, { src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.07),
  { at: S4 + 1.72, src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.8 },

  /* ---- S5 · the CTA ---- */
  ...cutSfx(S5 - 0.10, V.cuts[4]),
  ...layer(S5 + 0.16, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.2 },
                      { src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.3 }),
  { at: S5 + 0.42, src: A + "unlock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 },
];

/* ============================================================================
   THE VARIANTS. One row per split-test cut.

   ⛔ IG suppresses near-duplicates, so these differ where it is measured
   (memory `feedback_trial_reel_variants`): HOOK, BODY SCENES, bed, in-panel
   camera, transition kit, caption band — and then each is RETIMED, which is the
   only thing that actually moved audio correlation (0.87 -> 0.00 on reels
   83/84). In those reels the body was shared and its delta collapsed to ~5;
   here B and C each swap a body scene as well.
   ========================================================================== */
export type Variant = {
  id: string;
  Hook: React.FC;
  hookCuts: number[];
  /** the five body scenes after the hook */
  body: React.FC[];
  bed: string;
  cuts: AKind[];
  capTop: number;
  cam: { z: number; dx: number; dy: number };
  rate: number;
  note: string;
};

export const VARIANTS: Variant[] = [
  { id: "A", Hook: AutoHook,  hookCuts: AUTO_CUTS,
    body: [S1Rooms, S2Hall, S3Import, S4Everyone, S5Cta],
    bed: "auto_bed.wav", cuts: ["tick", "card", "wire", "dark", "tick"],
    capTop: 1268, cam: { z: 1.00, dx: 0, dy: 0 }, rate: 1.00,
    note: "THE TOWER — depth. Room panels in S1, the dawn yard in S4." },

  { id: "B", Hook: AutoHookF, hookCuts: [48, 92, 130],
    body: [S1Belts, S2Hall, S3Import, S4Everyone, S5Cta],
    bed: "auto_bed_b.wav", cuts: ["card", "wire", "tick", "card", "dark"],
    capTop: 1232, cam: { z: 1.05, dx: -18, dy: -8 }, rate: 0.95,
    note: "THE CONVEYOR — direction. S1 becomes three belts instead of panels." },

  { id: "C", Hook: AutoHookH, hookCuts: [52, 96, 132],
    body: [S1Rooms, S2Hall, S3Import, S4Dawn, S5Cta],
    bed: "auto_bed_c.wav", cuts: ["wire", "tick", "dark", "card", "card"],
    capTop: 1302, cam: { z: 1.04, dx: 20, dy: 9 }, rate: 1.05,
    note: "THE OVERNIGHT — time. S4 becomes a 6AM clock instead of the yard." },
];

/** one factory, one table row per cut */
export const makeAutoReel = (V: Variant): React.FC => () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > AUTO_TOTAL - 14 ? db(-11) * Math.max(0, (AUTO_TOTAL - f) / 14) : db(-11);
  const COMPS = [V.Hook, ...V.body];
  return (
    <AbsoluteFill>
      <Audio src={staticFile("auto_vo_final.wav")} />
      <Audio src={staticFile(V.bed)} volume={music} />
      <SfxTrack cues={sfxFor(V)} />

      <Bg />

      {/* ⛔ the camera goes INSIDE the panel, never on the whole composition —
          scaling the comp also scales the cream bg, moves the Panel off its
          fixed chassis position, and wrecks the motion audit by changing how
          much static background is in frame (measured on reel 83). */}
      <AutoCamCtx.Provider value={V.cam}>
        <AssemblyCtx.Provider value={true}>
          {SCENES.map((sc, i) => {
            const from = IN[i];
            const to = i < SCENES.length - 1 ? IN[i + 1] : AUTO_TOTAL;
            const C = COMPS[i];
            return (
              <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
                <AbsoluteFill><C /></AbsoluteFill>
              </Sequence>
            );
          })}
        </AssemblyCtx.Provider>
      </AutoCamCtx.Provider>

      {SCENES.slice(1).map((sc, i) => <AutoCut key={"c" + i} at={IN[i + 1]} kind={V.cuts[i]} />)}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={V.capTop} />
    </AbsoluteFill>
  );
};

export const AutoReel  = makeAutoReel(VARIANTS[0]);
export const AutoReelB = makeAutoReel(VARIANTS[1]);
export const AutoReelC = makeAutoReel(VARIANTS[2]);
