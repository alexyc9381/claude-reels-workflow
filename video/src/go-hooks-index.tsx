import React from "react";
import { AbsoluteFill, Audio, Composition, registerRoot, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./GoWorld";
import { CAM, GRADE } from "./GoScenes";
import { HookGauge, HookShutter, HookLine, HOOK_LEN } from "./GoHooks";
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
  gauge: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 2.7 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 2.7 },
    { at: S(14), src: "impact.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 1.04 },
    { at: S(38), src: "impact.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 0.96 },
    { at: S(60), src: "impact.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 0.88 },
    { at: S(78), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.78 },
    { at: S(78), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45, rate: 0.84 },
    { at: S(82), src: "line_dead.wav", v: LEVELS.SFX_MID, dur: 0.74 },
  ],
  shutter: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 2.7 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 2.7 },
    { at: S(14), src: "scan_beep.wav", v: LEVELS.SFX_MID, dur: 0.42 },
    { at: S(18), src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.54, rate: 1.2 },
    { at: S(27), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.74 },
    { at: S(27), src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.45, rate: 0.80 },
    { at: S(33), src: "key.wav", v: LEVELS.SFX_MID, dur: 0.06 },
    { at: S(40), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.15 },
    { at: S(62), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.15, rate: 0.9 },
  ],
  line: [
    { at: S(0), src: "shop_bed.wav", v: LEVELS.SFX_BED, dur: 2.7 },
    { at: S(0), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.30 },
    { at: S(0), src: "deep_engine.wav", v: LEVELS.SFX_BED, dur: 2.4 },
    { at: S(30), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.80 },
    { at: S(30), src: "crusher.wav", v: LEVELS.SFX_TEXTURE, dur: 0.94 },
    { at: S(38), src: "chair_knock.wav", v: LEVELS.SFX_MID, dur: 0.32 },
    { at: S(58), src: "chair_knock.wav", v: LEVELS.SFX_MID, dur: 0.32, rate: 0.92 },
    { at: S(76), src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.20, rate: 0.88 },
  ],
};

const wrap = (Body: React.FC<any>, key: string, props: any = {}): React.FC => () => {
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
            <Body {...props} />
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
  <Composition id="hook-1-gauge"   component={wrap(HookGauge, "gauge")}     durationInFrames={HOOK_LEN} {...V} />
  <Composition id="hook-2-shutter" component={wrap(HookShutter, "shutter")} durationInFrames={HOOK_LEN} {...V} />
  <Composition id="hook-3-line"    component={wrap(HookLine, "line")}       durationInFrames={HOOK_LEN} {...V} />
  {/* the same shutter with its meter moved above the head */}
  <Composition id="hook-2b-shutter-head" component={wrap(HookShutter, "shutter", { headBar: true })} durationInFrames={HOOK_LEN} {...V} />
</>);

registerRoot(Root);
