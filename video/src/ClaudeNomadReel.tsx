import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader, hexA } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7Cta } from "./NomScenes";
import { S0HookMast, S0HookCase, S0HookCross } from "./NomHooks";
import { CamCtx, PalCtx } from "./NomWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./data/words_nomad.json";

/* ===========================================================================
   REEL 98 · "NOMAD" — an offline-first knowledge server that keeps answering
   after the internet stops, and costs nothing.

   Board: storyboards/98-nomad.md.
   Repo:  github.com/Crosstalk-Solutions/project-nomad — 35,694 ★, 3,579 forks,
          Apache-2.0, TypeScript, pushed 2026-08-11. Every on-screen fact comes
          from that README or the GitHub API, pulled 2026-08-11.

   VO: public/nomad_vo.wav — 20.14s, 81 words, ships at 1.0x.
   ⛔ THE RAW TAKE HELD **TWO** "cut cut" FLUBS AND THE LONG-FORM TRANSCRIPT
      ONLY EVER SHOWED ONE. Both base.en and small.en, given the whole file,
      returned a clean CTA for 27.7-30.6s; there is a ruined take in there. It
      only appears when that region is transcribed IN ISOLATION, which is the
      sliding-window scan reel 97 made mandatory (3.2s window, 1.6s step).
        1  5.71 -> 12.13  a whole ruined library take ending "…need in cut cut"
        2  27.74 -> 30.60 a ruined CTA ending "…send you the free to cut cut"
      Four keeper islands, every cut inside measured silence (-40 dB, d=0.045).
   ⛔ EVERY PAUSE IS PRESERVED BY EXTENDING THE EARLIER SEGMENT'S TAIL into the
      silence. atrim+concat butt segments with ZERO gap, so the obvious fix —
      moving the next segment's start later — does not shorten the pause at all,
      it eats the first phoneme of the next line.
   ✅ 4.12 words/sec overall, dead centre of the house target, so there is no
      `atempo` on this reel.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_nomad.json,
      pattern-matched on the beat's opening word, never an estimate. The SFX
      fire on these seconds; the PICTURE leads them by 4 frames inside the
      scenes, so its crossover — not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;
export const NOM_TOTAL = 604;      // 20.14s of VO

type Scene = { at: number; C: React.FC; head: [string, string] };

/* ⛔⛔ THE HEADER IS A HOOK, NOT A SPEC SHEET.
   Alex, round 4: *"hook header should be 'AI FOR APOCALYPSE / OFFLINE AGENTS TO
   SURVIVE', something like this, not that bs — the hook header needs to be
   ENGAGING."* He is right and I had over-applied the add-a-fact rule: "AN
   OFFLINE AI SERVER / 35,694 STARS, FREE" is accurate, informative, and reads
   like a product page. Nobody stops scrolling for a spec.

   The rule still holds where it earns its keep — APACHE-2.0 and the real
   component names stay on the SCREEN, on plates and stencils, where a viewer
   who is already interested can find them. The HEADER's job is the stop.

   ⚠️ ONE WORD CHANGED FROM ALEX'S LINE. He wrote "OFFLINE AGENTS TO SURVIVE".
   Project NOMAD ships a local CHAT with retrieval — Ollama plus Qdrant — and
   nothing in the repo is an agent. "Agents" is the one word in that phrasing
   the README does not back, so it reads "OFFLINE AI TO SURVIVE": same length,
   same punch, and true. */
export const SCENES: Scene[] = [
  { at: 0,   C: S0Hook, head: ["AI FOR THE APOCALYPSE", "OFFLINE AI TO SURVIVE"] },
  { at: 117, C: S1,     head: ["ASK IT ANYTHING", "NO WIFI, NO ACCOUNT"] },
  { at: 179, C: S2,     head: ["WIKIPEDIA ON A SHELF", "AND EVERY MEDICAL BOOK"] },
  { at: 226, C: S3,     head: ["MAPS THAT STILL WORK", "WHEN NOTHING ELSE DOES"] },
  { at: 319, C: S4,     head: ["YOU CHOOSE WHAT GOES IN", "DOWNLOAD IT ONCE"] },
  { at: 373, C: S5,     head: ["THE GRID DIES", "THIS DOES NOT"] },
  { at: 433, C: S6,     head: ["NO PAYWALL, NO ACCOUNT", "APACHE-2.0, COSTS $0"] },
  { at: 536, C: S7Cta,  head: ["COMMENT NOMAD", "FOR THE FREE SETUP"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔ COUNT GESTURES, NOT CUES. A `repeat()` run is ONE gesture. No scene runs
      more than four.
   ⛔ LAYER THE HERO HIT: attack + low-end body, or movement + texture. One thin
      pop is the single thing that makes a reel feel cheap.
   ⛔ RISERS CAPPED AT 2, and they are spent on the reel's two real turns: the
      sever and the keyword. Not the open — a riser there fights the four hard
      cuts, which are already the interrupt.
   ⭐ THE TEXTURE LAYER IS WHERE THE MEANING LIVES. `digital-countdown` under the
      bars and `line_dead` under the cable mean the sound says what the picture
      says, in a vocabulary nobody has to learn.
   ⛔ THE CREST TAKES THE MUSIC AWAY. The bed itself is gated to 8% from 13.05s
      to 14.20s at the ffmpeg stage, so the sever plays in near-silence with
      only the box's hum under it. Every other scene has a bed; this one does
      not, and that absence is the loudest thing in the reel.
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN. Four cuts, a transient on every one, and now a sound
     for every EVENT in the frame. Alex, round 4: *"more motion and sfx as well
     throughout."* The three additions here are the three new events: the
     floods snapping on, the roller shutter rising, and the Keeper walking. The
     wind and the stack are BEDS, which cost no gesture budget. ---------- */
  { at: 0.00, src: "water_fan.wav", v: LEVELS.SFX_BED, dur: 4.1, rate: 0.68 },
  { at: 0.00, src: "machine_bed.wav", v: db(-27), dur: 3.9, rate: 0.72 },
  /* the three gantry floods, left to right, pitching UP so they read as one
     rising gesture rather than three identical clunks */
  ...repeat(3, 0.07, 0.10, { src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.45 }, 0.11),
  /* the roller shutter: a motor that runs, then a clunk when it tops out */
  ...layer(0.20, { src: "am/gear-mech.wav", v: LEVELS.SFX_MID, dur: 0.62 },
                 { src: "ratchet.wav", dur: 0.60, rate: 0.86 }),
  { at: 0.80, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.16 },
  /* his boots on the apron */
  ...repeat(4, 0.20, 0.21, { src: "sand-steps.mp3", v: LEVELS.SFX_TEXTURE, dur: 0.34 }, 0.07),
  /* ⭐ ROUND 9 · THE CROWD. A running crowd under the whole open: a continuous
     bed of feet, a low murmur beneath it, and six individual footfalls pitched
     apart so the stream reads as separate people rather than one loop. */
  { at: 0.00, src: "crowd_run.wav", v: db(-19), dur: 3.9 },
  { at: 0.00, src: "crowd_ambience.wav", v: db(-27), dur: 3.9, rate: 0.9 },
  ...repeat(6, 0.34, 0.29, { src: "sand-steps.mp3", v: db(-21), dur: 0.30 }, 0.13),
  ...layer(0.40, { src: "whoosh_heavy.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 0.86 },
                 { src: "am/cloth-shiver.wav", dur: 0.8 }),
  { at: 1.10, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.12 },
  ...layer(1.82, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.3, rate: 0.9 },
                 { src: "sub.wav", dur: 1.2, rate: 0.8 }),
  { at: 2.07, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.24 },
  { at: 2.27, src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 0.92 },
  ...layer(2.87, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
                 { src: "chain_clank.wav", dur: 0.7, rate: 0.9 }),
  { at: 3.07, src: "lib_deep_whoosh.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.95 },
  ...repeat(4, 3.24, 0.11, { src: "lamp_clunk.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4 }, 0.07),

  /* ---- S1 · THE MACHINE ------------------------------------------------- */
  { at: 3.90, src: "am/room-tone.wav", v: db(-26), dur: 2.1 },
  /* the crowd carries a beat past the cut, then the door shuts it out */
  { at: 3.90, src: "crowd_run.wav", v: db(-27), dur: 0.55, rate: 0.94 },
  { at: 3.90, src: "chair_knock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.94 },
  ...layer(4.24, { src: "lib_mactype.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                 { src: "c_power.wav", dur: 0.7, rate: 0.88 }),
  { at: 4.93, src: "lib_whoosh_fast.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.1 },
  ...repeat(5, 4.98, 0.09, { src: "am/keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.06),
  { at: 5.43, src: "data.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 1.06 },

  /* ---- S2 · THE STACKS. Two slams, the second PITCHED UP so the pair reads
     as one rising gesture rather than two identical hits. ------------------ */
  { at: 5.97, src: "am/room-tone.wav", v: db(-26), dur: 1.6, rate: 1.04 },
  ...layer(5.97, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.7 },
                 { src: "metal_ping.wav", dur: 0.8, rate: 1.0 }),
  ...layer(7.00, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 1.09 },
                 { src: "metal_ping.wav", dur: 0.8, rate: 1.14 }),

  /* ---- S3 · THE MAP AND THE HALL ---------------------------------------- */
  { at: 7.53, src: "am/room-tone.wav", v: db(-26), dur: 3.1, rate: 0.96 },
  ...layer(7.53, { src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.8, rate: 0.96 },
                 { src: "am/paper-rustle.wav", dur: 1.0 }),
  ...repeat(3, 8.23, 0.17, { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.4 }, 0.09),
  { at: 9.23, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.9 },
  { at: 9.60, src: "stage_hum.wav", v: LEVELS.SFX_BED, dur: 1.4, rate: 0.9 },
  /* the depth reveal: five banks stepping UP in pitch, back to front */
  ...repeat(5, 9.80, 0.13, { src: "am/lights-on.wav", v: LEVELS.SFX_MID, dur: 0.6 }, 0.08),

  /* ---- S4 · THE DOWNLOAD ------------------------------------------------ */
  { at: 10.63, src: "am/loading-loop.wav", v: db(-25), dur: 1.8 },
  { at: 10.83, src: "slot_lever.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...layer(11.26, { src: "wire_travel.wav", v: LEVELS.SFX_MID, dur: 0.7 },
                  { src: "pneu_thunk.wav", dur: 0.5 }),
  ...layer(11.66, { src: "wire_travel.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 1.07 },
                  { src: "pneu_thunk.wav", dur: 0.5, rate: 1.07 }),
  ...layer(11.86, { src: "wire_travel.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 1.14 },
                  { src: "pneu_thunk.wav", dur: 0.5, rate: 1.14 }),
  { at: 12.10, src: "green_tone.wav", v: LEVELS.SFX_MID, dur: 0.6 },

  /* ---- S5 · THE SEVER. RISER 1 OF 2 lands on the cut. ------------------- */
  { at: 12.43, src: "neon_buzz.wav", v: LEVELS.SFX_BED, dur: 0.9, rate: 0.8 },
  { at: 12.62, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.75, rate: 1.15 },
  { at: 13.23, src: "lib_whoosh_fast.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.9 },
  { at: 13.37, src: "am/digital-countdown.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.2 },
  { at: 13.47, src: "line_dead.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.9 },
  ...layer(13.55, { src: "neon_off.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.86 },
                  { src: "sub.wav", dur: 1.1, rate: 0.7 }),
  { at: 13.73, src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.7 },
  /* the one thing still making a sound */
  { at: 13.90, src: "graph_hum.wav", v: db(-21), dur: 0.55, rate: 1.0 },

  /* ---- S6 · THE COIN CAGE AND THE OPEN SHELF ---------------------------- */
  { at: 14.43, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.05 },
  { at: 14.50, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 1.7 },
  { at: 14.43, src: "water_fan.wav", v: db(-28), dur: 1.7, rate: 0.66 },
  /* three coins, PITCHED DOWN in sequence — the descending line is the point */
  ...layer(14.70, { src: "coin_slide.wav", v: LEVELS.SFX_MID, dur: 0.6 },
                  { src: "am/cash-register.wav", dur: 0.7 }),
  { at: 14.86, src: "ratchet.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.1 },
  ...layer(15.23, { src: "coin_slide.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.94 },
                  { src: "am/cash-register.wav", dur: 0.7, rate: 0.94 }),
  { at: 15.39, src: "ratchet.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.02 },
  ...layer(15.70, { src: "coin_slide.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.87 },
                  { src: "am/cash-register.wav", dur: 0.7, rate: 0.87 }),
  { at: 15.86, src: "ratchet.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 0.94 },
  { at: 16.13, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.16 },
  { at: 16.13, src: "am/room-tone.wav", v: db(-26), dur: 1.7, rate: 1.02 },
  { at: 16.33, src: "c_collect.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...layer(17.13, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
                  { src: "harden_chime.wav", dur: 0.9 }),
  { at: 17.46, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.7 },

  /* ---- S7 · THE KEYWORD. RISER 2 OF 2 lands on the hard cut. ------------ */
  { at: 17.52, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.3 },
  { at: 17.87, src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 1.02 },
  { at: 17.87, src: "water_fan.wav", v: db(-28), dur: 2.6, rate: 0.64 },
  { at: 18.40, src: "lib_magic_reveal.wav", v: LEVELS.SFX_MID, dur: 1.0 },
  { at: 18.78, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.9 },
];

/* ---- THE VARIANT CUTS -----------------------------------------------------
   [[feedback_trial_reel_variants]]: variants must REALLY differ — hook, bed,
   camera, palette and transition, not one lever. Each cut here changes all
   five, and each hook is a different MECHANISM rather than a recolour.
   ------------------------------------------------------------------------ */
type Trans = "flash" | "bars" | "punch" | "slide";
export type Variant = { hook: React.FC; hookHead: [string, string]; bed: string;
  seed: number; pal: number; trans: Trans; capTop: number; endHold: number };

export const VARIANTS: Variant[] = [
  { hook: S0Hook,      hookHead: ["AI FOR THE APOCALYPSE", "OFFLINE AI TO SURVIVE"],
    bed: "nomad_bed.wav",   seed: 0,  pal: 0, trans: "flash", capTop: 1268, endHold: 14 },
  { hook: S0HookMast,  hookHead: ["THE TOWER IS DEAD", "THE BOX STILL ANSWERS"],
    bed: "nomad_bed_b.wav", seed: 3,  pal: 1, trans: "bars",  capTop: 1214, endHold: 10 },
  { hook: S0HookCase,  hookHead: ["ONE CASE, ONE AI", "AND EVERY ANSWER IN IT"],
    bed: "nomad_bed_c.wav", seed: 7,  pal: 2, trans: "punch", capTop: 1300, endHold: 8 },
  { hook: S0HookCross, hookHead: ["CARRY THE AI IN", "WALK OUT WITH ANSWERS"],
    bed: "nomad_bed_d.wav", seed: 11, pal: 3, trans: "slide", capTop: 1240, endHold: 12 },
];

/* ⛔⛔ NO FLASHING, NO IRIS, NO HIGH-CONTRAST WIPES. STANDING RULE.
   Alex: *"I hate the black circle transition thing, it is so flashy and hurts my
   eyes, prevent stuff like this in the future too."*

   The offenders were `punch` — a full-black circle closing over the whole frame —
   and `flash`, a white plate at 0.42 opacity for six frames. Both are, in effect,
   a strobe: a near-total luminance swing in under a fifth of a second, which is
   physically uncomfortable on a phone held close and is the exact profile that
   triggers photosensitivity.

   ⛔ THE BAR FOR ANY TRANSITION IN THIS REPO FROM NOW ON:
      1  peak overlay opacity <= 0.18, and NEVER pure white or pure black
      2  no shape that closes over the FULL frame (no iris, no circle wipe)
      3  ramp in AND out — never an instant on/off plate
      4  at least 12 frames, so the eye reads it as a dissolve, not a hit
      5  and VERIFY it: a strobe is a >45 luma step that comes BACK within 8
         frames. A plain cut steps once and stays. Measure, do not eyeball.
   The cut itself is the punctuation. These exist to soften the seam, not to be
   noticed. A hard cut with nothing over it is always an acceptable answer.        */
const Trans: React.FC<{ at: number; kind: Trans }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const n = 13;
  if (f < at || f >= at + n) return null;
  const p = (f - at) / n;
  /* a symmetric ramp: 0 -> peak -> 0, so nothing ever snaps on */
  const ramp = Math.sin(Math.PI * p);

  if (kind === "flash") return (
    /* a WARM dip, not a white flash. #2A2620 at 0.22 is a shadow passing over
       the frame; the old #F4EEE2 at 0.42 was a camera strobe. */
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#2A2620", opacity: ramp * 0.15 }} />
  );
  if (kind === "bars") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`,
          height: "25%", background: "#2A2620", opacity: ramp * 0.16,
          transform: `translateX(${(i % 2 ? 1 : -1) * p * 110}%)` }} />
      ))}
    </div>
  );
  if (kind === "punch") return (
    /* ⛔ THIS WAS THE IRIS. It is now a soft centre-weighted dip that never
       closes and never reaches the frame edge at full strength. */
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: `radial-gradient(circle at 50% 46%, ${hexA("#2A2620", ramp * 0.16)} 0%, ${hexA("#2A2620", ramp * 0.03)} 72%)` }} />
  );
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      <div style={{ position: "absolute", left: `${-100 + p * 100}%`, top: 0, width: "100%",
        height: "100%", background: "#2A2620", opacity: ramp * 0.15 }} />
    </div>
  );
};

/** `f` restarts inside each Sequence, so the header's settle replays per cut. */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export const makeReel = (v: Variant): React.FC => () => {
  const SC = SCENES.map((sc, i) => (i === 0 ? { ...sc, C: v.hook, head: v.hookHead } : sc));
  const TOTAL = NOM_TOTAL + v.endHold;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("nomad_vo.wav")} />
      {/* ⛔ THE BED IS "Every Living Breathing Moment", the house track. Each cut
          takes a DIFFERENT PASSAGE, and every passage was chosen by measuring
          its first 500ms — a bed that opens quiet fails the onset check however
          good its mean is. All four are frequency-pocketed against the VO
          (450 / 1400 / 2800 Hz notches + sidechain) so they can run hot without
          masking, and all four carry the crest gate at 13.05-14.20s. */}
      <Audio src={staticFile(v.bed)} />
      <SfxTrack cues={SFX} />
      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SC.map((sc, i) => {
          const to = i < SC.length - 1 ? SC[i + 1].at : TOTAL;
          const C = sc.C;
          return (
            <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
              <PalCtx.Provider value={v.pal}>
                <CamCtx.Provider value={camFor(v.seed, i)}>
                  <AbsoluteFill><C /></AbsoluteFill>
                </CamCtx.Provider>
              </PalCtx.Provider>
            </Sequence>
          );
        })}
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

export const NomadReel = makeReel(VARIANTS[0]);
export const NomadReelB = makeReel(VARIANTS[1]);
export const NomadReelC = makeReel(VARIANTS[2]);
export const NomadReelD = makeReel(VARIANTS[3]);
