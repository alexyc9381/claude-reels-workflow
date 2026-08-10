import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import {
  Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader,
} from "./SlopKit";
import { HookTower, HookWall, HookPull } from "./VidHooks2";
import {
  SStars, SCinema, SPrompt, SHowTo, SStep1, SStep2, SStep3,
  SGenerate, SAccess, SSkills, SCta,
} from "./VidScenes";
import { SfxTrack, LEVELS, layer, Cue } from "./SoundKit";
import words from "./data/words_video.json";

/* =========================================================================
   REEL 93 "VIDEO" — the assembly. Board: storyboards/93-video.md.

   ⛔ EVERY `at` IS A MEASURED WORD ONSET from src/data/words_video.json, read by
      pattern-matching the beat's opening words, never a hardcoded index and
      never an estimate. Re-derive L, CUT and VID_TOTAL together if the VO moves.
      ⛔ THE VO WAS RE-CUT: 12 silences over 0.30s (worst 1.56s) capped to ~0.22s
      per the playbook's standing rule. ⛔ THE FIRST RE-CUT SLICED WORD TAILS (it used whisper word ends;
      they run 150-200ms early). Re-cut properly against a measured -26 dB energy
      envelope: 38.23s -> 31.45s of audio, 1141 -> 937 frames. THAT is what "too long of a pause in between
      sections" was — dead air in the cut VO, not a visual problem, exactly as on
      reel 91. Captions were rebuilt with tools/build_captions.py against the new
      wav and every `at` below re-read from it.

   ⛔ ROOT owns the global chrome: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track and the VO. Scene bodies see AssemblyCtx = true, so
      their own copies return null. The hook's SoloAV goes quiet here for the
      same reason — otherwise the VO would play twice.

   ⚠️ THIS IS A WIREFRAME (playbook PHASE C -> D). It has the real VO, the real
      captions and a first SFX bank. It has a measured music bed. It has NOT been
      through the full sound-design pass, and it is not a delivery.
   ========================================================================= */

export const FPS = 30;
export const VID_TOTAL = 937;

/** ⛔ the WALL hook is dead — a grid is a SYSTEM and a system has no moment.
    `HookTower` is the ritual replacement; see its header comment. */
const HERO = HookTower;

/* ⛔ A HEADER MUST ADD INFORMATION, NOT ECHO THE VO. Alex: "the headers shouldnt be
   repeating what im saying in the VO, it should add useful new info." Every line
   below is a fact the voiceover never states, and every one is verified against the
   live README (2026-08-07):
     · 14 studios · MIT (so: fork, ship, sell) · 11 lenses and 8mm-85mm focal lengths
       from the Cinema tables · "no content filters, no prompt rejections, no
       guardrails" · the hosted build runs in a browser with no Node.js and no setup
     · "self-host and customize" · the Windows SmartScreen warning, because the
       installer is not code-signed — the single most useful thing on screen
     · BYOK, and sd.cpp bundled so image models run on your own machine — this is the
       header that explains HOW it is free, which the VO never does
     · Veo, Seedream, Wan 2.2 and Nano Banana are named in the README and not in the VO
     · Generative-Media-Skills is a SEPARATE repo, which the VO does not say
   ⚠️ This supersedes feedback_headers_state_the_claim, which only asked that headers
      restate the VO line in product nouns. Restating is now the failure mode. */
type Scene = { at: number; C: React.FC; head: [string, string] };

export const SCENES: Scene[] = [
  { at: 0,    C: HERO,      head: ["STOP PAYING FOR AI VIDEO", "400+ MODELS · 14 STUDIOS"] },
  { at: 188,  C: SStars,    head: ["IT IS MIT LICENSED", "FORK IT, SHIP IT, SELL IT"] },
  { at: 275,  C: SCinema,   head: ["11 LENSES, 6 FOCAL LENGTHS", "8mm ULTRA-WIDE TO 85mm"] },
  { at: 372,  C: SPrompt,   head: ["NO CONTENT FILTERS", "NO PROMPT REJECTIONS"] },
  { at: 427,  C: SHowTo,    head: ["OR SKIP THE INSTALL", "IT RUNS IN YOUR BROWSER"] },
  { at: 452,  C: SStep1,    head: ["YOU CAN SELF-HOST IT", "AND CUSTOMISE THE WHOLE APP"] },
  { at: 485,  C: SStep2,    head: ["WINDOWS: HIT MORE INFO", "IT IS NOT CODE-SIGNED YET"] },
  { at: 569,  C: SStep3,    head: ["IMAGE · VIDEO · LIP SYNC", "ALL 14 STUDIOS, ONE APP"] },
  { at: 610,  C: SGenerate, head: ["BRING YOUR OWN KEY", "OR RUN IT ON YOUR OWN GPU"] },
  { at: 698,  C: SAccess,   head: ["PLUS VEO AND SEEDREAM", "WAN 2.2 AND NANO BANANA"] },
  { at: 759,  C: SSkills,   head: ["A SECOND FREE REPO", "GENERATIVE-MEDIA-SKILLS"] },
  { at: 894, C: SCta,      head: ["COMMENT VIDEO", "I WILL SEND BOTH REPOS"] },
];

/* ---- the SFX bank. ⛔ `at` is ROOT seconds and `dur` must be >= the file's
       true length. ⛔ RISERS ARE CAPPED AT 2 PER REEL — one into the hook's turn
       (already inside the hook's own cues) and one into SKILLS, the peak. ------ */
const A_ = "am/";
const cut = (at: number, hit: string, whoosh = "whoosh-swoosh.wav"): Cue[] =>
  layer(at, { src: A_ + whoosh, v: LEVELS.SFX_MID, dur: 1.0 },
             { src: A_ + hit, v: LEVELS.SFX_MID, dur: 1.2 });

const SFX: Cue[] = [
  ...cut(188 / FPS, "positive-chime.wav", "whoosh-choppy.wav"),
  { at: 189 / FPS, src: A_ + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8, lead: 0 },
  { at: 237 / FPS, src: A_ + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
  ...cut(275 / FPS, "click-hard.wav", "whoosh-fast.wav"),
  { at: 308 / FPS, src: A_ + "click-mac.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, lead: 0 },
  { at: 341 / FPS, src: A_ + "click-mac.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, lead: 0 },
  ...cut(372 / FPS, "keys-macbook.wav", "whoosh-swoosh.wav"),
  { at: 404 / FPS, src: A_ + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.2, lead: 0 },
  ...cut(427 / FPS, "snap.wav", "whoosh-fast.wav"),
  ...cut(452 / FPS, "page-turn.wav", "whoosh-choppy.wav"),
  ...cut(485 / FPS, "ui-click.wav", "whoosh-swoosh.wav"),
  { at: 513 / FPS, src: A_ + "loading-loop.wav", v: LEVELS.SFX_TEXTURE, dur: 2.0, lead: 0 },
  { at: 559 / FPS, src: A_ + "check-pop.wav", v: LEVELS.SFX_MID, dur: 1.0, lead: 0 },
  ...cut(569 / FPS, "click-light.wav", "whoosh-fast.wav"),
  ...cut(610 / FPS, "keys-macbook.wav", "whoosh-swoosh.wav"),
  { at: 681 / FPS, src: A_ + "cash-register.wav", v: LEVELS.SFX_HERO, dur: 1.6, lead: 0 },
  ...cut(698 / FPS, "wheel-spin.wav", "whoosh-choppy.wav"),
  /* the second and last riser, into the peak */
  { at: 759 / FPS - 0.9, src: A_ + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 1.4, lead: 0 },
  ...cut(759 / FPS, "hit-boom.wav", "whoosh-fast.wav"),
  { at: 834 / FPS, src: A_ + "terminal-soft.wav", v: LEVELS.SFX_TEXTURE, dur: 1.4, lead: 0 },
  ...cut(894 / FPS, "success-jingle.wav", "whoosh-flyby.wav"),
];

/** a 2-frame white pop on every scene cut, same grammar as the hook's. */
const FlashCut: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < 0 || k > 2) return null;
  return <div style={{ position: "absolute", inset: 0, background: "#FFFFFF",
    opacity: (1 - k / 2) * 0.24, zIndex: 140, pointerEvents: "none" }} />;
};

/** `f` restarts inside each Sequence, so the header's settle replays per cut. */
const HeadFor: React.FC<{ big: string; hot: string }> = ({ big, hot }) => {
  const f = useCurrentFrame();
  return <HookHeader f={f} big={big} hot={hot} />;
};

export const VideoReel: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("video_vo.wav")} />
    {/* ⛔ THE BED. Playbook D3: pick the window that BUILDS most (scanned per-second
        RMS across the 115s source, best delta at 14s), cut on the PHRASE ONSET not a
        round number (the attack, walked back to 12% of its peak), and MEASURE the
        bed then COMPUTE the gain rather than eyeballing a flat volume — the envelope
        rides tgt/bed_rms so the perceived level climbs 0.015 -> 0.022 while the raw
        track swells, then DUCKS to 0.011 under the CTA keyword. All of that is baked
        into video_bed.wav, so this mounts at unity. Audible from frame 1. */}
    <Audio src={staticFile("video_bed.wav")} />
    <SfxTrack cues={SFX} />
    <Bg />

    <AssemblyCtx.Provider value={true}>
      {SCENES.map((sc, i) => {
        const to = i < SCENES.length - 1 ? SCENES[i + 1].at : VID_TOTAL;
        const C = sc.C;
        return (
          <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
            <AbsoluteFill><C /></AbsoluteFill>
          </Sequence>
        );
      })}
    </AssemblyCtx.Provider>

    {SCENES.slice(1).map((sc) => <FlashCut key={"f" + sc.at} at={sc.at} />)}

    {SCENES.map((sc, i) => {
      const to = i < SCENES.length - 1 ? SCENES[i + 1].at : VID_TOTAL;
      return (
        <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
          <HeadFor big={sc.head[0]} hot={sc.head[1]} />
        </Sequence>
      );
    })}

    <ProgressBar />
    <KaraokeCaption words={words as any} fps={FPS} />
  </AbsoluteFill>
);
