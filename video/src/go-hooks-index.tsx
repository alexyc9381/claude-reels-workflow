import React from "react";
import { AbsoluteFill, Audio, Composition, registerRoot, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./GoWorld";
import { CAM, GRADE } from "./GoScenes";
import { HookCounter, HookBurial, HookCrank, HOOK_LEN } from "./GoHooks";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_113go.json";

/* Reel 113 "GO" — FOUR HOOK CONCEPTS, rendered at full quality with the real
   chassis so the decision is made on what actually ships: the same VO, the same
   header, the same captions, the same rail, the same bed and a per-concept SFX
   stack. ⛔ docs/THE-OPEN.md: *"Not a sketch, not a description. The decision is
   visual, so the artefact has to be visual."*

   Each is 93 frames = 3.10s, the measured onset of "They just installed...". */

const V = { fps: 30, width: 1080, height: 1920 } as const;
const S = (fr: number) => fr / 30;

/** one bank per concept, because the EVENT differs in each and a hook's cue
    stack is part of the concept. Frame 0 carries the heaviest stack in all four
    (THE-OPEN: frame 0 is the interrupt). Every cue is from the measured-clean
    16-bit house set — no chiptune, no named air. */
const BANKS: Record<string, Cue[]> = {
  counter: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 3.3 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
    { at: S(10), src: "chair_knock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.32 },
    { at: S(22), src: "impact.wav", v: LEVELS.SFX_HERO, dur: 0.66, rate: 1.02 },
    { at: S(48), src: "impact.wav", v: LEVELS.SFX_HERO, dur: 0.66, rate: 0.94 },
    { at: S(74), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.86 },
    { at: S(82), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20 },
  ],
  burial: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 3.3 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
    { at: S(6), src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.12 },
    { at: S(12), src: "crusher.wav", v: LEVELS.SFX_TEXTURE, dur: 0.94, rate: 1.1 },
    { at: S(30), src: "rebuild_thud.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 1.00 },
    { at: S(40), src: "crusher.wav", v: LEVELS.SFX_TEXTURE, dur: 0.94, rate: 0.98 },
    { at: S(56), src: "rebuild_thud.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 0.90 },
    { at: S(70), src: "crusher.wav", v: LEVELS.SFX_TEXTURE, dur: 0.94, rate: 0.88 },
    { at: S(86), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.80 },
  ],
  crank: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 3.3 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
    { at: S(8), src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.54 },
    { at: S(22), src: "impact.wav", v: LEVELS.SFX_HERO, dur: 0.66, rate: 1.04 },
    { at: S(34), src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.54, rate: 1.1 },
    { at: S(46), src: "impact.wav", v: LEVELS.SFX_HERO, dur: 0.66, rate: 0.96 },
    { at: S(58), src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.54, rate: 1.2 },
    { at: S(70), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.86 },
  ],
  tower: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 3.3 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
    { at: S(6), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.15 },
    { at: S(18), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.96 },
    { at: S(44), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.88 },
    { at: S(70), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.80 },
    { at: S(72), src: "crusher.wav", v: LEVELS.SFX_TEXTURE, dur: 0.94 },
  ],
  throat: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 3.3 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
    { at: S(18), src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.20 },
    { at: S(18), src: "bell_ring.wav", v: LEVELS.SFX_MID, dur: 1.20, rate: 0.94 },
    { at: S(42), src: "bell_ring.wav", v: LEVELS.SFX_MID, dur: 1.20, rate: 1.02 },
    { at: S(66), src: "bell_ring.wav", v: LEVELS.SFX_MID, dur: 1.20, rate: 1.10 },
    { at: S(88), src: "bell_ring.wav", v: LEVELS.SFX_HERO, dur: 1.65, rate: 1.18 },
  ],
  weigh: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 3.3 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
    { at: S(16), src: "impact.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 1.06 },
    { at: S(36), src: "impact.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 0.98 },
    { at: S(56), src: "impact.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 0.90 },
    { at: S(76), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.80 },
    { at: S(76), src: "boom.wav", v: LEVELS.SFX_HERO, dur: 0.58, rate: 0.84 },
  ],
  giant: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 3.3 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
    { at: S(10), src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.12 },
    { at: S(22), src: "rebuild_thud.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 1.00 },
    { at: S(48), src: "rebuild_thud.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 0.92 },
    { at: S(74), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.84 },
    { at: S(76), src: "crusher.wav", v: LEVELS.SFX_TEXTURE, dur: 0.94 },
  ],
};

const wrap = (Body: React.FC, key: string): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_113go.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile("113go_bed.wav")} volume={LEVELS.MUSIC * db(1.5)} />
      <SfxTrack cues={BANKS[key]} />
      <CamCtx.Provider value={{ ...CAM.shop }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.shop }}>
            <Body />
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={30} top={1254} />
      {/* ⛔ fed f+12 so the header is SETTLED on frame 0, never fading in */}
      <HookHeader big="YOU ARE NOT WORSE AT CLAUDE" hot="YOU ARE FEEDING IT A SCRIBBLE" f={f + 12} />
    </AbsoluteFill>
  );
};

const Root: React.FC = () => (<>
  <Composition id="hook-1-counter" component={wrap(HookCounter, "counter")} durationInFrames={HOOK_LEN} {...V} />
  <Composition id="hook-2-burial"  component={wrap(HookBurial, "burial")}   durationInFrames={HOOK_LEN} {...V} />
  <Composition id="hook-3-crank"   component={wrap(HookCrank, "crank")}     durationInFrames={HOOK_LEN} {...V} />
</>);

registerRoot(Root);
