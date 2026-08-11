import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
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

/* ⛔ HEADERS ADD A FACT, THEY NEVER ECHO THE VO ([[feedback_headers_state_the_claim]]).
   The VO says "Wikipedia, medical references, offline maps"; the headers say
   KIWIX, PROTOMAPS, OLLAMA, APACHE-2.0 — the actual named software doing it,
   which is information the audio does not carry and which a Claude Code viewer
   recognises. Every one of them is in the repo's own README table. */
export const SCENES: Scene[] = [
  { at: 0,   C: S0Hook, head: ["PROJECT NOMAD", "35,694 STARS, FREE"] },
  { at: 117, C: S1,     head: ["LOCAL AI CHAT", "OLLAMA, NO CLOUD"] },
  { at: 179, C: S2,     head: ["OFFLINE LIBRARY", "KIWIX ZIM ARCHIVES"] },
  { at: 226, C: S3,     head: ["OFFLINE MAPS", "PROTOMAPS REGIONS"] },
  { at: 319, C: S4,     head: ["PICK YOUR CONTENT", "ONE-TIME DOWNLOAD"] },
  { at: 373, C: S5,     head: ["ONLINE ONCE TO INSTALL", "NEVER AGAIN AFTER"] },
  { at: 433, C: S6,     head: ["NO PAYWALL AT ALL", "APACHE-2.0, $0"] },
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
  /* ---- S0 · THE OPEN. Four cuts, a transient on every one. -------------- */
  { at: 0.00, src: "water_fan.wav", v: LEVELS.SFX_BED, dur: 4.1, rate: 0.68 },
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
  { at: 3.90, src: "chair_knock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.94 },
  ...layer(4.24, { src: "lib_mactype.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                 { src: "c_power.wav", dur: 0.7, rate: 0.88 }),
  { at: 4.93, src: "lib_whoosh_fast.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.1 },
  ...repeat(5, 4.98, 0.09, { src: "am/keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.06),
  { at: 5.43, src: "data.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 1.06 },

  /* ---- S2 · THE STACKS. Two slams, the second PITCHED UP so the pair reads
     as one rising gesture rather than two identical hits. ------------------ */
  ...layer(5.97, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.7 },
                 { src: "metal_ping.wav", dur: 0.8, rate: 1.0 }),
  ...layer(7.00, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 1.09 },
                 { src: "metal_ping.wav", dur: 0.8, rate: 1.14 }),

  /* ---- S3 · THE MAP AND THE HALL ---------------------------------------- */
  ...layer(7.53, { src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.8, rate: 0.96 },
                 { src: "am/paper-rustle.wav", dur: 1.0 }),
  ...repeat(3, 8.23, 0.17, { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.4 }, 0.09),
  { at: 9.23, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.9 },
  { at: 9.60, src: "stage_hum.wav", v: LEVELS.SFX_BED, dur: 1.4, rate: 0.9 },
  /* the depth reveal: five banks stepping UP in pitch, back to front */
  ...repeat(5, 9.80, 0.13, { src: "am/lights-on.wav", v: LEVELS.SFX_MID, dur: 0.6 }, 0.08),

  /* ---- S4 · THE DOWNLOAD ------------------------------------------------ */
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
  { at: 16.33, src: "c_collect.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...layer(17.13, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
                  { src: "harden_chime.wav", dur: 0.9 }),
  { at: 17.46, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.7 },

  /* ---- S7 · THE KEYWORD. RISER 2 OF 2 lands on the hard cut. ------------ */
  { at: 17.52, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.3 },
  { at: 17.87, src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 1.02 },
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
  { hook: S0Hook,      hookHead: ["PROJECT NOMAD", "35,694 STARS, FREE"],
    bed: "nomad_bed.wav",   seed: 0,  pal: 0, trans: "flash", capTop: 1268, endHold: 14 },
  { hook: S0HookMast,  hookHead: ["THE TOWER IS NOT IT", "THE BOX IS"],
    bed: "nomad_bed_b.wav", seed: 3,  pal: 1, trans: "bars",  capTop: 1214, endHold: 10 },
  { hook: S0HookCase,  hookHead: ["ONE CASE, ONE MACHINE", "AND EVERYTHING IN IT"],
    bed: "nomad_bed_c.wav", seed: 7,  pal: 2, trans: "punch", capTop: 1300, endHold: 8 },
  { hook: S0HookCross, hookHead: ["AN AI YOU CARRY IN", "NO SIGNAL REQUIRED"],
    bed: "nomad_bed_d.wav", seed: 11, pal: 3, trans: "slide", capTop: 1240, endHold: 12 },
];

/** the cut punctuation. One per variant, so two cuts never edit the same way. */
const Trans: React.FC<{ at: number; kind: Trans }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const n = kind === "flash" ? 6 : 9;
  if (f < at || f >= at + n) return null;
  const p = (f - at) / n;
  if (kind === "flash") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#F4EEE2", opacity: (1 - p) * 0.42 }} />
  );
  if (kind === "bars") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`,
          height: "25%", background: "#14110E", opacity: 0.86,
          transform: `translateX(${(i % 2 ? 1 : -1) * p * 130}%)` }} />
      ))}
    </div>
  );
  if (kind === "punch") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#14110E", opacity: 0.9,
      clipPath: `circle(${16 + p * 116}% at 50% 46%)`,
      WebkitClipPath: `circle(${16 + p * 116}% at 50% 46%)` }} />
  );
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      <div style={{ position: "absolute", left: `${-100 + p * 100}%`, top: 0, width: "100%",
        height: "100%", background: "#14110E", opacity: 0.88 }} />
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
