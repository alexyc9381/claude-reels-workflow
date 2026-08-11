import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0Hook, S1Front, S2Roster, S3Row, S4Crew, S5Plug, S6Install, S7Owner, S8Cta,
} from "./AgyScenes";
import { SfxTrack, LEVELS, layer, repeat, Cue } from "./SoundKit";
import { HookQueue, HookCoach, HookShadow } from "./AgyHooks";
import { HookLift, HookParade } from "./AgyHooks2";
import { HookPress, HookBoard } from "./AgyHooks3";
import { CamCtx, camFor, PalCtx } from "./AgyWorld";
import words from "./data/words_agency.json";

/* ============================================================================
   REEL 94 · "AGENCY" — an entire ad agency, 270 named specialists across 17
   divisions, sits in one free MIT repo, and one click moves the whole staff
   into your machine.

   Board: storyboards/94-agency.md.
   VO: public/agency_vo.wav — 20.38s, 82 words, ships at 1.0x.

   ⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_agency.json,
      pattern-matched on the beat's opening words, never a hardcoded index and
      never an estimate. Re-derive SCENES and AGY_TOTAL together if the VO moves.

   THE VO CUT, so it is not re-derived:
      Raw AGENCY.m4a is 24.45s and is a CLEAN SINGLE TAKE — re-transcribed after
      assembly: zero "cut cut", zero doubled words. Only silence was removed, and
      every boundary came off a MEASURED 20ms peak envelope (runs under -26 dBFS
      lasting >= 0.28s, cut the middle only), never off a whisper word time —
      those run 150-200ms early and cutting there slices word tails.
        head trim   0.00 -> 1.64   (peak in the removed region -35.8 dBFS)
        cut         7.60 -> 8.06   (-48.2 dBFS)
        cut        14.45 -> 15.75  (-51.1 dBFS)
        tail trim  23.78 -> 24.45  (-90.3 dBFS)
      24.45s -> 20.38s. Assertion "no cut window contains a frame above -22 dB"
      green on all four. Captions rebuilt with tools/build_captions.py: 82 words,
      27 lines, 27/27 anchored to a measured onset.

   ⚠️ 20.4s is SHORT against the 22-29s house range, which is the opposite of the
      recent problem (89/90/91/93 all ran long). Flagged to Alex, not padded.

   ✅ EVERY ON-SCREEN FACT IS SOURCED to github.com/msitarzewski/agency-agents and
      its README, read 2026-08-08:
        · MIT · ★139,604 · 22,798 forks
        · 270 agent rows across 17 division tables; the README's own headline
          figure is "230+ agents across every division"
        · per-division counts: Engineering 58 · Specialized 56 · Marketing 36 ·
          Game Dev 21 · GIS 13 · Security 12 · Design 10 · Sales 10 · Testing 9 ·
          Paid Media 7 · Project Mgmt 7 · Support 6 · Spatial 6 · Academic 6 ·
          Product 5 · Finance 5 · Healthcare 3
        · the three trades the VO names are all REAL agents: Frontend Developer
          (Engineering), Ad Creative Strategist (Paid Media), Reddit Community
          Builder (Marketing)
        · "Born from a Reddit thread"
        · `./scripts/install.sh --tool claude-code`
        · the desktop app is a SECOND repo, msitarzewski/agency-agents-app,
          native macOS/Linux/Windows, `brew install --cask ... agency-agents`,
          and it installs into Claude Code, Cursor, Codex, Gemini CLI, OpenCode,
          Qwen and Osaurus among 13 named tools

   ⛔ THE COUNTER READS 139,604 THOUGH THE VO SAYS "OVER 124,000". House rule
      (reel 93): never show a number SMALLER than the truth. 139,604 is live and
      "over 124,000" stays true against it, so nothing on screen contradicts the
      voice.
   ⚠️ SAME PRODUCT FAMILY AS REEL 84 "ROLES" (shipped 2026-07-31), which pointed
      at the Chinese fork `jnMetaCode/agency-agents-zh` so its numbers would match
      that VO. This one points at the English parent and adds the desktop app.
      Reel 84's DRAFT NIGHT world is not reused.

   ⛔ ROOT owns the global chrome: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================== */

export const FPS = 30;
export const AGY_TOTAL = 611;          // 20.38s of VO

/* ⛔ A HEADER MUST ADD INFORMATION, NOT ECHO THE VO (reel 93 v6; this supersedes
   feedback_headers_state_the_claim, which only asked that a header restate the
   VO line in product nouns — restating is now the failure mode). Every line
   below is a fact the voiceover never states, verified against the live README:
     · the VO never gives an agent count, a division count or a fork count
     · the VO never says MIT, and MIT is the thing that makes "for free" mean
       "and you may sell the work"
     · the VO says "Claude Code" and nothing else; the app writes into 13 tools
     · the VO says "one click" but not that there is no clone and no terminal,
       and never gives the install one-liner
     · "born from a Reddit thread" is the repo's own origin story and is nowhere
       in the script
   The only header that shares content words with the script is the CTA, and it
   should. */
type Scene = { at: number; C: React.FC; head: [string, string] };

export const SCENES: Scene[] = [
  { at: 0,   C: S0Hook,    head: ["A FREE AI AGENCY", "270 CLAUDE CODE AGENTS"] },
  { at: 83,  C: S1Front,   head: ["THE AGENCY, ON GITHUB", "MIT, 22,798 FORKS"] },
  { at: 179, C: S2Roster,  head: ["17 DIVISIONS OF AGENTS", "ENGINEERING TO HEALTHCARE"] },
  { at: 239, C: S3Row,     head: ["58 ENGINEERS, 36 MARKETERS", "10 DESIGNERS"] },
  { at: 303, C: S4Crew,    head: ["EACH AGENT IS ONE .md FILE", "WORKFLOW + SUCCESS METRICS"] },
  { at: 372, C: S5Plug,    head: ["DROPS INTO ~/.claude/agents", "ALSO CURSOR, CODEX, GEMINI"] },
  { at: 426, C: S6Install, head: ["NO CLONE, NO TERMINAL", "brew install agency-agents"] },
  { at: 499, C: S7Owner,   head: ["MIT LICENSED", "FORK IT, SELL THE WORK"] },
  { at: 555, C: S8Cta,     head: ["COMMENT AGENCY", "I WILL SEND THE REPO"] },
];

/* ---- THE SFX BANK. ⛔ `at` is ROOT seconds and `dur` must be >= the file's true
       length. ⛔ RISERS ARE CAPPED AT 2 PER REEL: one into the shutter and one
       into the install press, which are the reel's two loudest moments.
       ⛔ HIERARCHY: sound the PRIMARY action only. Where a big thing and a small
       thing move together the small thing is silent. --------------------- */
const A_ = "am/";
const cut = (at: number, hit: string, whoosh = "whoosh-swoosh.wav"): Cue[] =>
  layer(at, { src: A_ + whoosh, v: LEVELS.SFX_MID, dur: 1.0 },
             { src: A_ + hit, v: LEVELS.SFX_MID, dur: 1.2 });

const SFX: Cue[] = [
  /* S0 · the room tone, then the seal and forty feet of steel */
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 2.8, lead: 0 },
  { at: 22 / FPS - 0.62, src: A_ + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.0, lead: 0 },
  /* the hard cut at f22 IS the seal going — one event, one sound, on the cut */
  ...layer(22 / FPS, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.6 },
                      { src: A_ + "snap.wav", v: LEVELS.SFX_MID, dur: 0.7 }),
  { at: 26 / FPS, src: A_ + "gear-mech.wav", v: LEVELS.SFX_MID, dur: 1.3, rate: 1.15, lead: 0 },
  { at: 52 / FPS, src: A_ + "punch.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 0.8, lead: 0 },
  /* ⛔ A CUT WITH NO SOUND READS AS A GLITCH (docs/THE-OPEN.md). The second
     hard cut gets its own transient. */
  ...layer(54 / FPS, { src: A_ + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                      { src: A_ + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }),
  { at: 56 / FPS, src: A_ + "crowd-wow.wav", v: LEVELS.SFX_TEXTURE, dur: 2.0, lead: 3 },

  /* S1 · the marquee strikes, then the stars arrive */
  ...cut(83 / FPS, "lights-on.wav", "whoosh-choppy.wav"),
  ...repeat(3, 89 / FPS, 0.12, { src: A_ + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.07),
  { at: 101 / FPS, src: A_ + "coin-spin.wav", v: LEVELS.SFX_TEXTURE, dur: 1.9, lead: 0 },
  { at: 106 / FPS, src: A_ + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8, lead: 0 },
  { at: 157 / FPS, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.2, lead: 0 },

  /* S2 · the car climbing the ladder — 6 ticks, not 17; the rest is texture */
  ...cut(179 / FPS, "wheel-spin.wav", "whoosh-fast.wav"),
  ...repeat(6, 184 / FPS, 0.26, { src: A_ + "click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4 }, 0.06),
  { at: 229 / FPS, src: A_ + "hit-up.wav", v: LEVELS.SFX_MID, dur: 1.0, lead: 0 },

  /* S3 · the truck, and one ignition per trade */
  { at: 239 / FPS, src: A_ + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 2.2, lead: 3 },
  ...repeat(3, 240 / FPS, 15 / FPS, { src: A_ + "lights-on.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }, 0.10),
  { at: 277 / FPS, src: A_ + "crowd-laugh.wav", v: LEVELS.SFX_BED, dur: 1.4, lead: 0 },

  /* S4 · three doors, three methods */
  ...cut(303 / FPS, "click-hard.wav", "whoosh-swoosh.wav"),
  ...repeat(3, 311 / FPS, 16 / FPS, { src: A_ + "snap.wav", v: LEVELS.SFX_MID, dur: 0.8 }, 0.09),
  { at: 340 / FPS, src: A_ + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 1.4, lead: 0 },

  /* S5 · the connector seats. One heavy clunk is the whole scene. */
  ...cut(372 / FPS, "whoosh-fast.wav", "whoosh-fast.wav"),
  ...layer(390 / FPS, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 1.2 },
                       { src: A_ + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.9 }),
  { at: 393 / FPS, src: A_ + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 1.5, lead: 0 },
  { at: 418 / FPS, src: A_ + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },

  /* S6 · the second and last riser, into the one press the reel is built around */
  { at: 426 / FPS, src: A_ + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 1.0 },
  { at: 429 / FPS - 0.70, src: A_ + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 1.0, lead: 0 },
  ...layer(429 / FPS, { src: A_ + "click-mac.wav", v: LEVELS.SFX_HERO, dur: 0.7 },
                       { src: A_ + "ui-click.wav", v: LEVELS.SFX_MID, dur: 0.5 }),
  /* five cards leave the window; five ticks, pitch-drifting so a run of the
     same action never sounds copy-pasted */
  ...repeat(5, 433 / FPS, 3.4 / FPS, { src: A_ + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }, 0.07),
  ...repeat(4, 458 / FPS, 8 / FPS, { src: A_ + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }, 0.06),
  { at: 470 / FPS, src: A_ + "crowd-applause.wav", v: LEVELS.SFX_BED, dur: 2.0, lead: 0 },

  /* S7 · the plaque, the stamp, the payoff */
  ...cut(499 / FPS, "whoosh-swoosh.wav", "whoosh-swoosh.wav"),
  { at: 513 / FPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.4, rate: 0.9, lead: 0 },
  ...layer(523 / FPS, { src: A_ + "punch.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                       { src: A_ + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.8 }),

  /* S8 · the handover */
  ...cut(555 / FPS, "lights-on.wav", "whoosh-flyby.wav"),
  { at: 579 / FPS, src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 1.0, lead: 0 },
  { at: 588 / FPS, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
];

/* ===========================================================================
   THE VARIANT FACTORY.

   ⛔ [[feedback_trial_reel_variants]]: build it as `makeReel(variant)`, NEVER a
      copied file, so one fix lands in all four cuts. Every axis a perceptual
      hash or an audio fingerprint samples is varied, in the order the doc ranks
      them by how much each buys:
        1  a completely different animated HOOK — different world, prop, action
           AND exit. This is most of the signal.
        2  a different music BED. ⚠️ The VO is the same recording and cannot
           change, so the bed is the only audio-side lever. The house has TWO
           source tracks and one of them is the wrong feel for this reel, so
           each cut takes a different PASSAGE of "Every Living Breathing Moment"
           (25.4s / 5.8s / 67.0s / 46.0s) with its OWN envelope shape and its own
           CTA duck — different content and a different level curve.
        3  a per-scene CAMERA OFFSET, applied INSIDE the Panel via CamCtx.
        4  a different TRANSITION at every boundary, with the cut sound rebuilt
           to follow the graphic.
        5  a different caption band Y.
        6  a slightly different end hold.
   ======================================================================== */
export type TransKind = "flash" | "bars" | "punch" | "slide" | "wipeup" | "iris";
export type Variant = {
  id: string; label: string; hook: React.FC; bed: string; seed: number;
  trans: TransKind; capTop: number; endHold: number; hookHead: [string, string];
  /** palette rotation for the BODY scenes; 0 = the canonical cut */
  pal: number;
};

export const VARIANTS: Variant[] = [
  { id: "a", label: "ROLL-UP · reveal by removal", hook: S0Hook,
    bed: "agency_bed.wav", seed: 0, pal: 0, trans: "flash", capTop: 1268, endHold: 0,
    hookHead: ["A FREE AI AGENCY", "270 CLAUDE CODE AGENTS"] },
  { id: "b", label: "QUEUE · depth + travelling ignition", hook: HookQueue,
    bed: "agency_bed_b.wav", seed: 3, pal: 1, trans: "bars", capTop: 1212, endHold: 7,
    hookHead: ["270 SPECIALISTS", "ALL FREE, ALL YOURS"] },
  { id: "c", label: "COACH · arrival", hook: HookCoach,
    bed: "agency_bed_c.wav", seed: 7, pal: 2, trans: "punch", capTop: 1302, endHold: 4,
    hookHead: ["YOUR WHOLE TEAM", "ARRIVES IN ONE CLICK"] },
  { id: "d", label: "SHADOW · scale collapse", hook: HookShadow,
    bed: "agency_bed_d.wav", seed: 11, pal: 3, trans: "slide", capTop: 1242, endHold: 5,
    hookHead: ["STOP DOING ALL 17 JOBS", "270 AGENTS DO THEM"] },
  /* ---- round 2: two more opens, so the trial set has six mechanisms rather
     than four. E and F are neither a departure, an arrival, a queue nor a wall. */
  { id: "e", label: "LIFT · release", hook: HookLift,
    bed: "agency_bed_e.wav", seed: 17, pal: 4, trans: "wipeup", capTop: 1284, endHold: 3,
    hookHead: ["270 AGENTS, ONE REPO", "AND IT IS MIT"] },
  { id: "f", label: "CORNER · procession", hook: HookParade,
    bed: "agency_bed_f.wav", seed: 23, pal: 5, trans: "iris", capTop: 1226, endHold: 3,
    hookHead: ["A WHOLE AGENCY, FREE", "58 ENGINEERS, 36 MARKETERS"] },
];

/** ⛔ A DIFFERENT TRANSITION PER CUT, so the boundary frames — which is where a
    near-duplicate check looks hardest — never match across variants. */
const Trans: React.FC<{ at: number; kind: TransKind }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const k = f - at;
  const len = kind === "flash" ? 2 : 3;
  if (k < 0 || k > len) return null;
  const p = k / len;
  if (kind === "flash") {
    return <div style={{ position: "absolute", inset: 0, background: "#FFFFFF",
      opacity: (1 - p) * 0.22, zIndex: 140, pointerEvents: "none" }} />;
  }
  if (kind === "bars") {
    return (<div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0,
          top: `${i * 25}%`, height: `${(1 - p) * 12.5}%`, background: "#14110E", opacity: 0.9 }} />
      ))}
    </div>);
  }
  if (kind === "punch") {
    return <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#0D0B08", opacity: (1 - p) * 0.5,
      transform: `scale(${1 + (1 - p) * 0.06})` }} />;
  }
  if (kind === "slide") return (<div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-100 + p * 100}%`,
      width: "100%", background: "#14110E", opacity: 0.86 }} />
  </div>);
  if (kind === "wipeup") return (<div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: `${p * 100}%`, bottom: `${-p * 100}%`,
      background: "#14110E", opacity: 0.86 }} />
  </div>);
  /* iris: a hard circular close-open, the only NON-linear transition in the set */
  return (<div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
    background: "#14110E", opacity: 0.9,
    clipPath: `circle(${20 + p * 110}% at 50% 46%)`,
    WebkitClipPath: `circle(${20 + p * 110}% at 50% 46%)` }} />);
};

/** `f` restarts inside each Sequence, so the header's settle replays per cut. */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export const makeReel = (v: Variant): React.FC => () => {
  const SC = SCENES.map((sc, i) => (i === 0 ? { ...sc, C: v.hook, head: v.hookHead } : sc));
  const TOTAL = AGY_TOTAL + v.endHold;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("agency_vo.wav")} />
      {/* ⛔ THE BED IS "Every Living Breathing Moment", NOT "Another Day Of Sun".
          V1 shipped the wrong track and Alex caught it. Identified by matching
          the DELIVERED reel-93 bed against both candidates: sample-level
          correlation 0.202 for ELBM vs 0.009 for ADOS. Each variant takes a
          DIFFERENT PASSAGE with its own computed envelope and its own CTA duck;
          all four were checked for ONSET, not just mean, because a bed that
          opens quiet fails MUSIC_ONSET_0 at 480ms. */}
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

export const AgencyReel = makeReel(VARIANTS[0]);
export const AgencyReelB = makeReel(VARIANTS[1]);
export const AgencyReelC = makeReel(VARIANTS[2]);
export const AgencyReelD = makeReel(VARIANTS[3]);
export const AgencyReelE = makeReel(VARIANTS[4]);
export const AgencyReelF = makeReel(VARIANTS[5]);
