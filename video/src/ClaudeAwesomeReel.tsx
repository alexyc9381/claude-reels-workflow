import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0Hook, S1Turn, S2Wall, S3Bench, S4Bays, S5Aisle, S6Gate, S7Ledger, S8Cta,
} from "./DepScenes";
import { CamCtx, camFor } from "./AgyWorld";
import { PalCtx } from "./DepWorld";
import { HookLockers, HookOverload } from "./DepHooks";
import { SfxTrack, LEVELS, layer, repeat, Cue } from "./SoundKit";
import words from "./data/words_awesome.json";

/* ============================================================================
   REEL 96 · "AWESOME" — you have been hoarding Claude skills one at a time and
   never opening them, while someone else sorted 164 of them into 11 labelled
   bays and gave the index away.

   Board: storyboards/96-awesome.md.
   VO: public/awesome_vo.wav — 17.66s, 76 words, ships at 1.0x.

   ⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_awesome.json,
      pattern-matched on the beat's opening words, never an estimate.

   THE VO CUT, so it is not re-derived:
      Raw AWESOME.m4a is 23.03s with ONE "cut cut" flub — Alex false-starts
      "because someone found," at 5.08-5.42, says "cut cut" at 5.78-6.20, then
      re-takes cleanly from 6.58. Four edits:
        head trim   0.00 -> 1.05    (silence to -40dB)
        FLUB cut    4.61 -> 6.53    (BOUNDARIES silent: 4.57-4.63 and 6.52-6.56)
        gap cap     9.80 -> 10.565  (1.085s of dead air -> 0.32s)
        gap cap    19.28 -> 20.12   (1.097s of dead air -> 0.32s)
        tail trim  22.25 -> 23.03
      ⛔ A FLUB CUT IS CHECKED AT ITS TWO BOUNDARIES, NOT ITS INTERIOR — a flub
         window is supposed to be full of speech, which is the point. What must
         be silent is where the splice lands, so it cannot clip the tail of the
         word before or the onset of the word after.
      23.03s -> 17.66s. Re-transcribed on the CUT file: zero markers, zero dupes.
      Captions: 76 words, 25 lines, 25/25 anchored to a measured onset.

   ⚠️ LENGTH: 17.66s is BELOW the 22-29s house range and there is no honest way
      to reach it — the take is 76 words and padding it would mean inventing
      screen time the voice does not pay for. Flagged rather than fixed.

   ⚠️ PACE: 4.45 wps overall / 4.60 in the hook. The playbook's R1 asks for <=4.0
      in the hook, but that gate is stricter than what the house actually ships:
      reel 95 shipped 4.55 / 4.30 / 5.60-worst and reel 94 shipped 4.22 / 3.90 /
      5.00-worst. AWESOME sits between the two, so it ships at 1.0x with NO
      tempo change. Slowing Alex's read to satisfy the doc would have been a
      correct calculation over the wrong signal (docs/MEASURING.md).

   ⚠️ ONE CLAIM IN THIS VO IS NOT BACKED, and the frame does not make it:
      "someone found EVERY awesome Claude skill." The repo is a CURATED list of
      164 links across 11 sections, not a census, and no census exists (there
      are at least four competing `awesome-claude-skills` lists). Nothing on
      screen reads EVERY / ALL / COMPLETE. The frame draws the index mechanism —
      a heap going into labelled bays — and the headers carry sourced counts.

   ✅ EVERY ON-SCREEN FACT IS SOURCED to github.com/ComposioHQ/awesome-claude-
      skills, read 2026-08-09: Apache-2.0 · ★72,138 · 8,183 forks · 164 linked
      skills across 11 category sections · the 11 headings verbatim · and the
      real skill names Brand Guidelines / Brand Build Skills / Canvas Design /
      Theme Factory / Video Downloader. `Branding` is NOT a category — it is two
      skills inside Business & Marketing, and S4 draws it that way.

   ⛔ THE LEDGER READS 72,138 THOUGH THE VO SAYS "OVER 72,000" — never show a
      number smaller than the truth; "over 72,000" stays true against it.

   ⛔ ROOT owns the global chrome: Bg, the one ProgressBar, the one caption
      track, the VO and every header.
   ========================================================================== */

export const FPS = 30;
export const AWESOME_TOTAL = 530;      // 17.66s of VO

/* ⛔ A HEADER MUST ADD INFORMATION, NOT ECHO THE VO. Every line below is a fact
   the voiceover never states, verified against the live repo:
     · the VO never names the repo, its owner, or its licence
     · the VO never gives a skill count, a category count or a fork count
     · the VO says "branding" as though it were a category; it is two skills
       inside Business & Marketing, and the header is where that gets corrected
     · the VO names three categories; there are eleven */
type Scene = { at: number; C: React.FC; head: [string, string] };

export const SCENES: Scene[] = [
  { at: 0,   C: S0Hook,   head: ["164 CLAUDE SKILLS", "ALREADY SORTED FOR YOU"] },
  { at: 104, C: S1Turn,   head: ["ComposioHQ ON GITHUB", "awesome-claude-skills"] },
  { at: 178, C: S2Wall,   head: ["ELEVEN CATEGORIES", "COUNT THE BAYS"] },
  { at: 204, C: S3Bench,  head: ["164 SKILLS LINKED", "IN ONE README"] },
  { at: 243, C: S4Bays,   head: ["BRANDING LIVES INSIDE", "BUSINESS & MARKETING"] },
  { at: 290, C: S5Aisle,  head: ["ALSO SECURITY, DATA", "COMMS, ACCESSIBILITY"] },
  { at: 344, C: S6Gate,   head: ["APACHE-2.0 LICENCE", "NOTHING TO PAY, EVER"] },
  { at: 404, C: S7Ledger, head: ["72,138 STARS", "AND 8,183 FORKS"] },
  { at: 465, C: S8Cta,    head: ["COMMENT AWESOME", "I WILL SEND THE REPO"] },
];

/* ---- THE SFX BANK. ⛔ RISERS CAPPED AT 2 — one into the wall reveal and one
       into the ledger landing, the reel's two turns. ⛔ HIERARCHY: sound the
       PRIMARY action only; if a big thing and a small thing move together, the
       small thing is silent. ⛔ `at` is ROOT seconds, not scene-local. -------- */
const A_ = "am/";
const cut = (at: number, hit: string, whoosh = "whoosh-swoosh.wav"): Cue[] =>
  layer(at, { src: A_ + whoosh, v: LEVELS.SFX_MID, dur: 1.0 },
             { src: A_ + hit, v: LEVELS.SFX_MID, dur: 1.2 });

const SFX: Cue[] = [
  /* S0 · ⛔ FRAME 0 GETS THE HEAVIEST CUE STACK OF THE REEL — it is the
     interrupt. FIVE simultaneous cues: the impact, the mass, the metal, the
     tumble and the room. Verified by STACK COUNT, never by reading the full mix
     (once the VO is at -16 LUFS it dominates every RMS window and ranks
     syllables, not cues). */
  ...layer(0, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 2.2 },
               { src: "crusher.wav", v: LEVELS.SFX_MID, dur: 1.4 }),
  { at: 0, src: "chain_clank.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 },
  { at: 0, src: "can_rattle.wav", v: LEVELS.SFX_TEXTURE, dur: 1.1, rate: 0.88, lead: 0 },
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 3.6, lead: 0 },
  /* ⭐ THE AVALANCHE KEEPS LANDING. Round 1 asked for more SFX; the open was
     carrying two events across 3.5s while the picture had crates hitting the
     floor continuously. Five pitched thuds under shot A make the sound match
     what is on screen. */
  ...repeat(5, 0.30, 0.26, { src: "dead_thud.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.09),

  /* ⛔ TWO CUTS IN THE OPEN NOW (38 and 74). NOT via `cut()`: that helper
     prefixes `am/` onto BOTH names, and the root-folder files below are not in
     the AM pack. The first render died at frame 51 on exactly that 404 — a
     missing asset kills the encode mid-flight rather than degrading. */
  { at: 38 / FPS, src: A_ + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.9 },
  { at: 38 / FPS, src: A_ + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.3, lead: 2 },
  { at: 38 / FPS, src: "can_bong.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 1.1, lead: 1 },
  /* the crate turning over in shot B — the beat, so it gets its own cue */
  { at: 46 / FPS, src: "chair_knock.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 0.94, lead: 0 },
  { at: 74 / FPS, src: A_ + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 1.0 },
  { at: 74 / FPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.5, rate: 0.92, lead: 2 },
  { at: 74 / FPS, src: "chain_clank.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8, lead: 1 },
  ...repeat(3, 80 / FPS, 0.30, { src: "dead_thud.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.08),

  /* S1 · the turn: the flood run, then the first riser into the reveal */
  ...cut(104 / FPS, "hit-up.wav", "whoosh-swoosh.wav"),
  ...repeat(4, 120 / FPS, 2.7 / FPS, { src: A_ + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.85 }, 0.06),
  /* ⛔ RISER 1 OF 2, pre-rolled its FULL length (1.327s) so its peak lands ON
     the S2 cut at 5.933s rather than starting late underneath it. */
  { at: 178 / FPS - 1.33, src: A_ + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.4, lead: 0 },

  /* ⛔ THE CRATE-LIFT WHOOSHES ARE GONE. Hierarchy audit: S1 was running SIX
     gestures in 2.47s — the cut, the flood run, a whoosh run, the terminal bed,
     the UI-click run and the riser. The manifest printing is the PRIMARY action
     of this scene; the crates feeding the roller behind it are the small thing
     moving at the same time, and the doc's rule is that the small thing is
     silent. Removing the run took S1 from 6 gestures to 5. */
  /* ⭐ THE MANIFEST PRINTING. Alex, round 2: *"the sound effects need to talk to
     your audience even more."* This audience is people who use Claude, and what
     reads as "software" to them is UI, not warehouse. Eight pitched clicks —
     one per skill name as it prints — over a soft terminal bed. The sound now
     says *a list is being generated* at the exact moment the picture does. */
  { at: 118 / FPS, src: A_ + "terminal-soft.wav", v: LEVELS.SFX_TEXTURE, dur: 1.9, lead: 0 },
  ...repeat(8, 120 / FPS, 4.2 / FPS, { src: A_ + "ui-click.wav", v: LEVELS.SFX_MID, dur: 0.4 }, 0.055),

  /* S2 · the wall lands, then the ripple of crates arriving home */
  ...layer(178 / FPS, { src: A_ + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.3 },
                       { src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.9 }),
  ...repeat(6, 180 / FPS, 1.6 / FPS, { src: "dead_thud.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.07),
  { at: 178 / FPS + 0.30, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.3, lead: 0 },

  /* S3 · the bench: the stencil lift is the loudest transient between the open
     and the peak, which is what buys this quiet 1.3s its place in the cut */
  ...cut(204 / FPS, "page-turn.wav", "whoosh-choppy.wav"),
  ...layer(221 / FPS, { src: A_ + "punch.wav", v: LEVELS.SFX_HERO, dur: 0.9 },
                       { src: A_ + "paper-rustle.wav", v: LEVELS.SFX_MID, dur: 1.3 }),

  /* S4 · THREE SNAPS ON THE THREE MEASURED ONSETS, pitched up across the run so
     the three arrivals read as ONE gesture rather than three events */
  ...cut(243 / FPS, "whoosh-fast.wav", "whoosh-fast.wav"),
  /* ⛔ ONE SOUND PER ARRIVAL. The snaps at 9.07 and 9.33 were landing on the
     same beats as the `unlock` and `ping-msg` below — one object arriving,
     sounded twice, which is the clutter the hierarchy rule exists to stop. Only
     the first snap survives, and it belongs to the CATEGORY CHIP, which is a
     different object from the file that follows it. */
  { at: 243 / FPS, src: A_ + "snap.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.06, lead: 0 },
  /* ⭐ FOUR SKILL FILES OPENING. A `SKILL.md` arriving is a software event, so it
     gets a software sound — `unlock` on the two brand files, `ping-msg` on the
     two media ones, pitched apart so four arrivals read as one gesture. */
  { at: 248 / FPS, src: A_ + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 1.00, lead: 0 },
  { at: 272 / FPS, src: A_ + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 1.09, lead: 0 },
  { at: 281 / FPS, src: A_ + "ping-msg.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 1.04, lead: 0 },

  /* S5 · ⭐ THE SORTING LINE. A belt hum under the whole scene, the gantry gear
     on the cut, and a SCANNER BEEP as each skill file passes the reader — the
     one sound in the reel that is unambiguously "a system processing things",
     which is the beat ("basically anything you might need") and the audience's
     own vocabulary at the same time. */
  ...cut(290 / FPS, "whoosh-flyby.wav", "whoosh-flyby.wav"),
  { at: 292 / FPS, src: A_ + "loading-loop.wav", v: LEVELS.SFX_BED, dur: 1.9, lead: 0 },
  { at: 294 / FPS, src: A_ + "gear-mech.wav", v: LEVELS.SFX_MID, dur: 1.5, lead: 0 },
  /* ⛔ ONE RUN, NOT TWO. The scanner blips and a click-hard run were both
     sounding "a file passes the reader" — the same action, twice over, at 11
     instances across 1.8s. The blips stay because a scanner beep is this
     audience's own vocabulary; the clicks go. */
  ...repeat(6, 296 / FPS, 6.5 / FPS, { src: "blip_up.wav", v: LEVELS.SFX_MID, dur: 0.4 }, 0.055),

  /* S6 · the barrier that does not engage */
  ...cut(344 / FPS, "lights-on.wav", "whoosh-choppy.wav"),
  { at: 350 / FPS, src: A_ + "wheel-spin.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
  ...layer(364 / FPS, { src: A_ + "punch.wav", v: LEVELS.SFX_HERO, dur: 0.9 },
                       { src: A_ + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.9 }),

  /* S7 · THE PEAK. ⛔ RISER 2 OF 2, timed so its peak lands on the NUMBER
     LANDING, not on the scene cut — the board's beat is the ledger settling, and
     that is what the riser has to deliver. The flap run is stagger 3 over 6
     glyphs, so the last digit settles at local 41 (404+41 = 14.833s) and the
     riser is placed to arrive there. ⛔ Re-derive this if the stagger changes. */
  ...cut(404 / FPS, "whoosh-fast.wav", "whoosh-fast.wav"),
  { at: 13.50, src: A_ + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.45, lead: 0 },
  ...repeat(4, 408 / FPS, 0.40, { src: A_ + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 1.05 }, 0.05),
  ...layer(445 / FPS, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.6 },
                       { src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.8 }),

  /* S8 · the handover */
  ...cut(465 / FPS, "paper-slide.wav", "whoosh-swoosh.wav"),
  { at: 509 / FPS, src: "bell_ring.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
  { at: 515 / FPS, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
];

/* ===========================================================================
   THE VARIANT FACTORY. ⛔ `makeReel(variant)`, never a copied file, so one fix
   lands in every cut. Every axis a perceptual hash or an audio fingerprint
   samples is varied: the whole OPEN, the bed PASSAGE, a per-scene in-panel
   CAMERA offset, the body PALETTE rotation, the TRANSITION grammar, the caption
   band Y and the end hold.
   ⚠️ The bed lever is passage-level: this cut takes a passage of "Every Living
   Breathing Moment" at 33.0s, which reels 94 and 95 do not use (15.0 / 52.0 /
   80.0), so two reels a week apart do not share an audio fingerprint.
   ======================================================================== */
export type TransKind = "flash" | "bars" | "punch" | "slide";
export type Variant = {
  id: string; label: string; hook: React.FC; bed: string; seed: number; pal: number;
  trans: TransKind; capTop: number; endHold: number; hookHead: [string, string];
};

export const VARIANTS: Variant[] = [
  { id: "a", label: "THE CHUTE · the hoard pours out on you", hook: S0Hook,
    bed: "awesome_bed_ducked.wav", seed: 0, pal: 0, trans: "flash", capTop: 1268, endHold: 0,
    hookHead: ["164 CLAUDE SKILLS", "ALREADY SORTED FOR YOU"] },
  { id: "b", label: "THE LOCKERS · every door is already full", hook: HookLockers,
    bed: "awesome_bed_b.wav", seed: 5, pal: 1, trans: "bars", capTop: 1214, endHold: 6,
    hookHead: ["YOU SAVED 40 SKILLS", "SOMEONE SORTED 164"] },
  { id: "c", label: "THE OVERLOAD · the stack you are carrying buckles", hook: HookOverload,
    bed: "awesome_bed_c.wav", seed: 9, pal: 2, trans: "punch", capTop: 1300, endHold: 4,
    hookHead: ["11 CATEGORIES, 164 SKILLS", "ONE REPO, APACHE-2.0"] },
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
    background: "#EDF2E6", opacity: (1 - p) * 0.22, zIndex: 140, pointerEvents: "none" }} />;
  if (kind === "bars") return (<div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none" }}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`,
        height: `${(1 - p) * 12.5}%`, background: "#101718", opacity: 0.9 }} />
    ))}
  </div>);
  if (kind === "punch") return <div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none", background: "#0C1213", opacity: (1 - p) * 0.5,
    transform: `scale(${1 + (1 - p) * 0.06})` }} />;
  return (<div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
    overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-100 + p * 100}%`,
      width: "100%", background: "#101718", opacity: 0.86 }} />
  </div>);
};

/** ⛔ the header must be SETTLED on frame 0 — it fades in over 0.34s, and frame
    0 is the one frame guaranteed to be seen (docs/THE-OPEN.md law 4). */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export const makeReel = (v: Variant): React.FC => () => {
  const SC = SCENES.map((sc, i) => (i === 0 ? { ...sc, C: v.hook, head: v.hookHead } : sc));
  const TOTAL = AWESOME_TOTAL + v.endHold;
  return (
  <AbsoluteFill>
    <Audio src={staticFile("awesome_vo.wav")} />
    {/* ⛔ THE BED IS "Every Living Breathing Moment" — the house track, confirmed
        on reel 94 by correlating the delivered reel-93 bed against both
        candidates (0.202 vs 0.009).
        ⭐ IT IS NOW THE FREQUENCY-POCKET BED (docs/SOUND-DESIGN.md §3), which is
        the piece of the sound system reels 93, 94 and 95 all shipped without.
        Three EQ notches where the voice lives (450 Hz body, 1.4 kHz presence,
        2.8 kHz clarity) plus a sidechain compressor keyed off the VO, then
        loudnorm so the level is predictable.
        ⛔ THE POINT IS NOT "TURN THE MUSIC DOWN" — that makes it thin and it
        still masks. Because the pocket exists the bed runs HOTTER and is
        actually audible: measured 16.1 dB under the VO before, 11.0 dB under
        now, and 8 dB louder in the first 150ms. Reel 79's lesson was that "the
        music is too quiet" is arithmetic, not taste. */}
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

export const AwesomeReel = makeReel(VARIANTS[0]);
export const AwesomeReelB = makeReel(VARIANTS[1]);
export const AwesomeReelC = makeReel(VARIANTS[2]);
