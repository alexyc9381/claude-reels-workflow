import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { NinjaHook } from "./NinjaHook";
import { N1Armory, N2Master, N3Founder, N4Yards, N5Short, N6Reset, N7Summit, N8Market, N9Gate } from "./NinjaScenes";
import { NinjaCut, Kind } from "./NinjaTransitions";
import words from "./data/words_delete.json";

/* ============================================================================
   REEL 81 · "DELETE" — the full reel. World: THE NINJA (NinjaScenes.tsx).

   NINE LOCATIONS, one arc: moonlit rooftops → the armory → a bamboo forest →
   the scroll hall → two training yards → a rooftop range → a waterfall shrine
   → a dawn summit → the night market → the torii gate.

   ⛔ No sliding panels. Scenes HARD CUT, and what travels across the boundary
   is a ninja GRAPHIC (smoke bomb / thrown star / blade slash / ink swipe) that
   is opaque on the cut frame. See NinjaTransitions.tsx.

   Scene starts are locked to the de-flubbed, de-gapped VO
   (public/delete_vo_v5.wav — 33.58s).

   ⛔ The VO is tightened by MEASURED SILENCE plus atempo, never by whisper's word
   `end` times. Whisper's ends run ~150-200ms early, so cutting to them slices
   speech: an earlier pass took 134ms out of the middle of "anymore". Cuts here
   come from a 20ms ENERGY ENVELOPE scan, not silencedetect alone — the 0.72s
   hole at 13s was a BREATH sitting at -30 dB, invisible to a -40 dB silence
   gate. Pace comes from atempo=1.05. See REEL-BUILD-LEARNINGS §5.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

const SCENES: { C: React.FC; s: number; label: string; cut: Kind }[] = [
  { C: NinjaHook, s: 0.00,  cut: "smoke", label: "hook · the sealed scroll, chained, cut free" },
  { C: N1Armory,  s: 4.66,  cut: "smoke", label: "the armory · they strap more iron on" },
  { C: N2Master,  s: 7.08,  cut: "star",  label: "bamboo forest · the master cuts every chain" },
  { C: N3Founder, s: 9.48,  cut: "slash", label: "the scroll hall · he is named, his clip hangs" },
  { C: N4Yards,   s: 13.36, cut: "ink",   label: "two yards · snowy 2024 vs night 2026" },
  { C: N5Short,   s: 17.28, cut: "star",  label: "rooftop range · the throw falls short" },
  { C: N6Reset,   s: 20.16, cut: "smoke", label: "the waterfall · six moons, the chains go in" },
  { C: N7Summit,  s: 24.44, cut: "slash", label: "the summit · dawn, carrying nothing" },
  { C: N8Market,  s: 26.70, cut: "ink",   label: "the night market · six brand new sets" },
  { C: N9Gate,    s: 30.84, cut: "smoke", label: "the torii gate · comment DELETE" },
];
const END_S = 33.16;                      // ⛔ the reel ENDS on the word "DELETE" (ends 33.06). No hold.
export const DELETE_TOTAL = Math.round(END_S * FPS);

/* the incoming scene is alive 3 frames early, under the clearing graphic */
const LEAD = 3;
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

/* ============================================================================
   SOUND DESIGN — house SoundKit (docs/SOUND-DESIGN.md), AM Creator pack.
   LAYER movement+texture · PITCH-vary repeats · J-CUT 3 frames early ·
   HIERARCHY primary action only · dB LEVELS.
   Every transition gets its own ninja sound, keyed to its cut frame.
   ========================================================================== */
const A = "am/";

/* Measured file lengths (ffprobe). `dur` shorter than these is fine now that
   Sfx ramps the tail, but anything set WAY under its decay still sounds thin —
   these are the numbers to reason against. */
const LEN = {
  clickLight: 0.08, clickMac: 0.08, bubble: 0.11, ping: 0.13, punch: 0.16, filmRoll: 0.18,
  snap: 0.19, err: 0.21, uiClick: 0.23, whooshFast: 0.41, clickHard: 0.42, page: 0.50,
  checkPop: 0.63, paperSlide: 0.63, coin: 0.66, riserSharp: 0.73, ringLow: 0.76,
  whooshSwoosh: 0.76, lightsOn: 0.78, whooshChoppy: 0.78, unlock: 0.91, gearMech: 1.03,
  gearStutter: 1.03, tick: 1.05, cash: 1.13, riserMetal: 1.33, rustle: 1.50, wow: 1.71,
  flyby: 2.15, hitUp: 2.18, loading: 2.27, terminal: 2.91, wheel: 3.78, projector: 5.10,
  applause: 5.90, cheer: 6.02, boom: 7.45, laugh: 7.62, jingle: 8.31, chime: 9.23,
  marker: 11.62, keys: 12.15, roomTone: 57.17,
} as const;

/** SCORE A CUT (docs/THE-OPEN.md): whoosh INTO it, transient ON it. */
const scoreCut = (t: number, movement: string, impact: string, opts: { rate?: number; texture?: string } = {}): Cue[] => [
  { at: t - 0.12, src: A + movement, v: LEVELS.SFX_MID, dur: 0.8, rate: opts.rate ?? 1, lead: 0 },
  { at: t, src: A + impact, v: LEVELS.SFX_HERO, dur: 1.1, rate: opts.rate ?? 1, lead: 0 },
  ...(opts.texture ? [{ at: t + 0.03, src: A + opts.texture, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];

/** the four transition sounds, so each cut is heard as well as seen */
const cutSfx = (t: number, kind: Kind): Cue[] =>
  kind === "smoke" ? scoreCut(t, "whoosh-swoosh.wav", "hit-boom.wav", { texture: "paper-rustle.wav" })
  : kind === "star" ? scoreCut(t, "whoosh-flyby.wav", "snap.wav", { texture: "riser-metal.wav" })
  : kind === "slash" ? scoreCut(t, "whoosh-fast.wav", "snap.wav", { rate: 1.08, texture: "riser-metal.wav" })
  : scoreCut(t, "whoosh-choppy.wav", "marker-stroke.wav", { texture: "paper-rustle.wav" });

/** a location's own ambience, so every world sounds like somewhere */
const amb = (t: number, dur: number, src: string, rate = 1, v: number = LEVELS.SFX_BED): Cue[] =>
  [{ at: t, src: A + src, v, dur, rate, lead: 0 }];

/* Scene starts, so every cue below is written RELATIVE to its scene. When the VO
   is re-timed, only this table changes — no cue times get hand-shifted. */
const [S1, S2, S3, S4, S5, S6, S7, S8, S9] = SCENES.slice(1).map((x) => x.s);
/* the open's five shots (NinjaHook.HOOK_CUTS 22/52/80/106, at 30fps) */
const [HA, HB, HC, HD] = [22, 52, 80, 106].map((f) => f / FPS);

const SFX_ALL: Cue[] = [
  /* ======================= THE OPEN · five shots, every cut scored ==========
     Frame 0 carries the HEAVIEST stack in the reel — it is the interrupt. */
  { at: 0.00, src: A + "hit-boom.wav",     v: LEVELS.SFX_HERO,    dur: 2.0,  lead: 0 },
  { at: 0.00, src: A + "whoosh-fast.wav",  v: LEVELS.SFX_MID,     dur: 0.41, lead: 0, rate: 0.9 },
  { at: 0.02, src: A + "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.19, lead: 0 },
  { at: 0.00, src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.85, lead: 0 },
  { at: 0.00, src: A + "room-tone.wav",    v: LEVELS.SFX_BED,     dur: 4.8,  lead: 0 },
  ...layer(0.22, { src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.33 },
                 { src: A + "click-hard.wav", dur: 0.42 }),                       // the chain jerks taut
  ...scoreCut(HA, "whoosh-swoosh.wav", "hit-boom.wav", { texture: "paper-rustle.wav" }),        // to the wide
  ...scoreCut(HB, "whoosh-choppy.wav", "hit-boom.wav", { rate: 0.9, texture: "gear-stutter.wav" }), // the yank
  ...scoreCut(HC, "whoosh-fast.wav", "snap.wav", { rate: 1.1, texture: "riser-metal.wav" }),    // the blade
  { at: HC + 0.47, src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_HERO, dur: 0.76 },              // smoke
  ...scoreCut(HD, "whoosh-flyby.wav", "unlock.wav", { texture: "positive-chime.wav" }),         // free
  { at: HD + 0.40, src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 1.2 },                 // gone

  /* ======================= N1 · THE ARMORY ================================ */
  ...cutSfx(S1 - 0.10, "smoke"),
  ...amb(S1 - 0.06, S2 - S1 + 0.06, "room-tone.wav", 1.0),
  ...amb(S1 - 0.06, S2 - S1, "gear-stutter.wav", 0.8),                             // forge hum
  ...layer(S1 + 0.27, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.0 }, { src: A + "click-hard.wav", dur: 0.42 }),
  ...layer(S1 + 0.80, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.94 }, { src: A + "click-hard.wav", dur: 0.42 }),
  ...layer(S1 + 1.33, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.2, rate: 0.88 },
                      { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 1.03 }),
  ...repeat(3, S1 + 0.42, 0.53, { src: A + "ui-click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.23 }, 0.06),

  /* ======================= N2 · BAMBOO FOREST ============================ */
  ...cutSfx(S2 - 0.10, "star"),
  ...amb(S2 - 0.06, S3 - S2 + 0.06, "room-tone.wav", 0.72),                        // wind through cane
  { at: S2 + 0.33, src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 1.50 },
  ...layer(S2 + 0.87, { src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.33 },
                      { src: A + "highlighter.wav", dur: 0.45 }),                  // the draw
  ...layer(S2 + 1.13, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_HERO, dur: 0.41 },
                      { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.19 }),      // the cut
  ...repeat(4, S2 + 1.27, 0.15, { src: A + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.42 }, -0.06),

  /* ======================= N3 · THE SCROLL HALL ========================== */
  ...cutSfx(S3 - 0.10, "slash"),
  ...amb(S3 - 0.06, S4 - S3 + 0.06, "room-tone.wav", 0.9),
  ...layer(S3 + 0.20, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 }, { src: A + "page-turn.wav", dur: 0.50 }),
  { at: S3 + 0.73, src: A + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.13 },
  ...layer(S3 + 1.00, { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.6 },
                      { src: A + "check-pop.wav", dur: 0.63 }),
  { at: S3 + 2.06, src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 1.50, rate: 0.9 },

  /* ======================= N4 · TWO TRAINING YARDS ======================= */
  ...cutSfx(S4 - 0.10, "ink"),
  ...amb(S4 - 0.06, S5 - S4 + 0.06, "room-tone.wav", 0.66),
  ...layer(S4 + 0.20, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 }, { src: A + "click-light.wav", dur: 0.08 }),
  ...layer(S4 + 0.93, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63, rate: 1.06 }, { src: A + "click-light.wav", dur: 0.08 }),
  ...layer(S4 + 2.20, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.78 },
                      { src: A + "hit-boom.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),
  { at: S4 + 3.10, src: A + "gear-stutter.wav", v: LEVELS.SFX_BED, dur: 1.03, rate: 0.85 },

  /* ======================= N5 · THE ROOFTOP RANGE ======================== */
  ...cutSfx(S5 - 0.10, "star"),
  ...amb(S5 - 0.06, S6 - S5 + 0.06, "room-tone.wav", 0.8),
  ...layer(S5 + 0.27, { src: A + "riser-sharp.wav", v: LEVELS.SFX_TEXTURE, dur: 0.73 },
                      { src: A + "highlighter.wav", dur: 0.45 }),
  ...layer(S5 + 0.73, { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 1.2 }, { src: A + "snap.wav", dur: 0.19 }),
  { at: S5 + 1.18, src: A + "riser-metal.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0, rate: 0.8 },
  ...layer(S5 + 1.47, { src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.21 },
                      { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.3, rate: 0.86 }),

  /* ======================= N6 · THE WATERFALL ============================ */
  ...cutSfx(S6 - 0.10, "smoke"),
  ...amb(S6 - 0.06, 3.90, "wheel-spin.wav", 0.55, LEVELS.SFX_TEXTURE),
  ...amb(S6 + 3.84, S7 - S6 - 3.84, "wheel-spin.wav", 0.55, LEVELS.SFX_TEXTURE),
  ...repeat(6, S6 + 0.53, 0.30, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.07),
  ...repeat(6, S6 + 0.72, 0.30, { src: A + "bubble-pop.wav", v: LEVELS.SFX_MID, dur: 0.11 }, -0.05),
  ...layer(S6 + 2.53, { src: A + "ring-low.wav", v: LEVELS.SFX_HERO, dur: 0.76 },
                      { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8 }),
  ...layer(S6 + 2.73, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.91 },
                      { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 }),
  { at: S6 + 3.50, src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 1.1 },

  /* ======================= N7 · THE SUMMIT =============================== */
  ...cutSfx(S7 - 0.10, "slash"),
  ...amb(S7 - 0.06, S8 - S7 + 0.06, "room-tone.wav", 0.6),
  ...layer(S7 + 0.13, { src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.78 },
                      { src: A + "crowd-wow.wav", v: LEVELS.SFX_TEXTURE, dur: 1.71 }),
  ...layer(S7 + 0.53, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 },
                      { src: A + "click-hard.wav", dur: 0.42 }),

  /* ======================= N8 · THE NIGHT MARKET ========================= */
  ...cutSfx(S8 - 0.10, "ink"),
  ...amb(S8 - 0.06, S9 - S8 + 0.06, "crowd-laugh.wav", 0.85),
  ...layer(S8 + 0.20, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 },
                      { src: A + "loading-loop.wav", v: LEVELS.SFX_BED, dur: 2.27 }),
  ...layer(S8 + 1.13, { src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 1.13 }, { src: A + "coin-drop.wav", dur: 0.66 }),
  ...layer(S8 + 1.48, { src: A + "hit-boom.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 0.8 },
                      { src: A + "gear-stutter.wav", dur: 1.03 }),
  ...layer(S8 + 2.07, { src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 1.13, rate: 0.92 }, { src: A + "coin-drop.wav", dur: 0.66 }),
  ...layer(S8 + 2.53, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.78 }, { src: A + "click-light.wav", dur: 0.08 }),
  { at: S8 + 3.58, src: A + "whoosh-flyby.wav", v: LEVELS.SFX_TEXTURE, dur: 1.1, rate: 1.1 },

  /* ======================= N9 · THE TORII GATE ========================== */
  ...cutSfx(S9 - 0.10, "smoke"),
  ...amb(S9 - 0.06, 2.44, "crowd-cheer.wav", 0.9),
  ...layer(S9 + 0.20, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 }, { src: A + "page-turn.wav", dur: 0.50 }),
  ...layer(S9 + 0.87, { src: A + "marker-stroke.wav", v: LEVELS.SFX_MID, dur: 0.9 }, { src: A + "snap.wav", dur: 0.19 }),
  ...layer(S9 + 1.33, { src: A + "success-jingle.wav", v: LEVELS.SFX_HERO, dur: 0.95 },
                      { src: A + "crowd-applause.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0 }),
  { at: S9 + 1.84, src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.55 },
];

export const DeleteReel: React.FC = () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > DELETE_TOTAL - 10 ? db(-10) * Math.max(0, (DELETE_TOTAL - f) / 10) : db(-10);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("delete_vo_v5.wav")} />
      <Audio src={staticFile("delete_bed_v4.wav")} volume={music} />
      <SfxTrack cues={SFX_ALL} />

      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] : DELETE_TOTAL;
          const C = sc.C;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
              <AbsoluteFill><C /></AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      {/* the ninja graphic that covers every cut */}
      {SCENES.slice(1).map((sc, i) => <NinjaCut key={"cut" + i} at={IN[i + 1]} kind={sc.cut} />)}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={1268} />
    </AbsoluteFill>
  );
};
