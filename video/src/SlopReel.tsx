import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, GREEN, GOLD } from "./SlopKit";
import { inter } from "./fonts";
import { HookT2 } from "./SlopHookT2";
import { Scene2 } from "./SlopScene2";
import { ClaudeRec } from "./SlopRec";
import { Rec4Ramble } from "./Rec4Ramble";
import { Rec5Cut } from "./Rec5Cut";
import { Rec6Ban } from "./Rec6Ban";
import { Scene7 } from "./SlopScene7";
import { Rec8Detector } from "./Rec8Detector";
import { Scene9 } from "./SlopScene9";
import words from "./data/words_slop.json";

/* ============================================================================
   SLOP · THE FULL REEL. One continuous chassis (global cream bg + retention rail
   + karaoke + VO + music); each scene's PANEL swipes in from the right on a PUSH
   transition and shoves the previous scene (clay sprites and all) off to the left
   with a little knock-squash. Scene starts are locked to the tightened VO.
   ========================================================================== */

const FPS = 30;
// scene start (seconds in the tightened VO) + TYPE (anim diorama vs screen-rec).
// the SLIDE push only happens when the type CHANGES (anim<->rec); same-type = a soft crossfade.
type SType = "anim" | "rec";
const SCENES: { C: React.FC; s: number; type: SType }[] = [
  { C: HookT2, s: 0.0, type: "anim" },       // MAKE CLAUDE SOUND 100% HUMAN (cold room -> warm booth)
  { C: Scene2, s: 4.28, type: "anim" },      // why it sounds fake        (AI server/factory + countdown)
  { C: ClaudeRec, s: 12.64, type: "rec" },   // ask for a VOICEMAIL       (Claude app screen-rec)
  { C: Rec4Ramble, s: 18.08, type: "rec" },  // let it RAMBLE             (Claude app screen-rec)
  { C: Rec5Cut, s: 20.50, type: "rec" },     // cut ONLY the ums          (audio-editor screen-rec)
  { C: Rec6Ban, s: 25.70, type: "rec" },     // ban the AI MOVES          (Claude app screen-rec)
  { C: Scene7, s: 32.56, type: "anim" },     // PICK a side               (dusk fork in the road)
  { C: Rec8Detector, s: 37.88, type: "rec" },// it reads HUMAN            (AI-detector browser rec)
  { C: Scene9, s: 42.12, type: "anim" },     // comment SLOP              (creator desk + guide)
];
const END_S = 43.3;                 // HARD end right after the word "prompts" (VO ends 43.1)
export const SLOP_TOTAL = Math.round(END_S * FPS);

const W = 1080;                     // full push travel
const D = 13;                       // transition length (frames)
const LEAD = 7;                     // begin the transition slightly before the VO line lands
const EASE = Easing.inOut(Easing.cubic);
const fr = (s: number) => Math.round(s * FPS);
// frame at which scene i STARTS its entrance (scene 0 is on from frame 0)
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));
// a boundary is a SLIDE only when the two scenes are different types (anim<->rec)
const slideAt = (a: number, b: number) => a >= 0 && b < SCENES.length && SCENES[a].type !== SCENES[b].type;

const lerp = (f: number, a: number, b: number, va: number, vb: number) =>
  interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });

// per-scene transform: SLIDE (translate + shove) across a type change, else a soft crossfade.
function xform(i: number, f: number) {
  const inStart = IN[i];
  const outStart = i < SCENES.length - 1 ? IN[i + 1] : Infinity;
  const slideIn = i > 0 && slideAt(i - 1, i);
  const slideOut = i < SCENES.length - 1 && slideAt(i, i + 1);
  let x = 0, sc = 1, rot = 0, op = 1;
  if (i > 0 && f < inStart + D) {
    const p = lerp(f, inStart, inStart + D, 0, 1);
    if (slideIn) { x = (1 - p) * W; sc = 1 + (1 - p) * 0.02; }  // push in from the right
    else { op = p; }                                            // crossfade in
  }
  if (f >= outStart) {
    const p = lerp(f, outStart, outStart + D, 0, 1);
    if (slideOut) { x = -p * W; sc = 1 - Math.sin(p * Math.PI) * 0.05; rot = -Math.sin(p * Math.PI) * 1.6; } // shoved left
    else { op = 1 - p; }                                        // crossfade out
  }
  return { x, sc, rot, op };
}

// canonical SFX one-shot: play a sound clip at `at` seconds for `dur` seconds
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.4, dur = 0.4 }) => (
  <Sequence from={fr(at)} durationInFrames={Math.max(1, fr(dur))} layout="none"><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>
);
// FULL sound design — machinery, countdown ticks, keyboard/clicks, a "huh" at the crossroads,
// scan + reveal chimes. Times keyed to the new VO boundaries + each scene's own animation.
const KBD = "lib_mactype.wav", CLK = "lib_click.wav";
const SFX_ALL: { at: number; src: string; v: number; dur: number }[] = [
  // HOOK — the mascot reaches the mic
  { at: 2.20, src: "voicemail_beep.wav", v: 0.26, dur: 0.5 },
  // S2 FACTORY — machinery drone + stamping clanks
  { at: 4.48, src: "machine_bed.wav", v: 0.14, dur: 4.6 },
  { at: 5.20, src: "stamp_press.wav", v: 0.20, dur: 0.4 },
  { at: 6.50, src: "mech_clank.wav", v: 0.18, dur: 0.4 },
  { at: 7.80, src: "stamp_press.wav", v: 0.18, dur: 0.4 },
  // S2 COUNTDOWN 5..1 (Scene2 local f 95/125/155/185/215) -> into the tutorial
  { at: 7.20, src: "tick.wav", v: 0.32, dur: 0.25 },
  { at: 8.20, src: "tick.wav", v: 0.34, dur: 0.25 },
  { at: 9.20, src: "tick.wav", v: 0.36, dur: 0.25 },
  { at: 10.20, src: "tick.wav", v: 0.38, dur: 0.25 },
  { at: 11.20, src: "tick.wav", v: 0.42, dur: 0.25 },
  { at: 12.30, src: "lib_confirm.wav", v: 0.30, dur: 0.5 },
  // S3 VOICEMAIL rec — beep + typing
  { at: 12.80, src: "voicemail_beep.wav", v: 0.26, dur: 0.5 },
  { at: 14.37, src: KBD, v: 0.34, dur: 0.95 },
  // S4 RAMBLE rec — typing
  { at: 19.61, src: KBD, v: 0.38, dur: 1.10 },
  // S5 CUT UMS — a click on each filler cut (FILLER_DEL local [34,58,82])
  { at: 21.63, src: CLK, v: 0.50, dur: 0.30 },
  { at: 22.43, src: CLK, v: 0.50, dur: 0.30 },
  { at: 23.23, src: CLK, v: 0.52, dur: 0.30 },
  // S6 BAN — reply typing + a swish on each strike (local 82/100/120)
  { at: 27.10, src: KBD, v: 0.36, dur: 0.90 },
  { at: 28.43, src: "swish.wav", v: 0.34, dur: 0.30 },
  { at: 29.03, src: "swish.wav", v: 0.34, dur: 0.30 },
  { at: 29.70, src: "swish.wav", v: 0.36, dur: 0.30 },
  // S7 FORK — "HMMM" while deliberating, then a decisive commit
  { at: 33.90, src: "huh.mp3", v: 0.5, dur: 0.9 },
  { at: 35.76, src: "swish.wav", v: 0.26, dur: 0.30 },
  { at: 36.10, src: "lib_confirm.wav", v: 0.26, dur: 0.5 },
  // S8 DETECTOR — typing, Analyze click, scan sweep, HUMAN reveal
  { at: 37.98, src: KBD, v: 0.38, dur: 0.95 },
  { at: 38.61, src: CLK, v: 0.60, dur: 0.30 },
  { at: 38.81, src: "scanner_sweep.wav", v: 0.24, dur: 0.85 },
  { at: 39.88, src: "lib_magic_reveal.wav", v: 0.34, dur: 0.9 },
  { at: 39.98, src: "pickup_chime.wav", v: 0.32, dur: 0.6 },
  // S9 CTA — pop + sparkle on "Comment SLOP"
  { at: 42.20, src: "lib_pop.wav", v: 0.34, dur: 0.4 },
  { at: 42.34, src: "sparkle.wav", v: 0.26, dur: 0.6 },
];
// whoosh ONLY on the slide transitions (anim<->rec), not the crossfades
const SLIDE_TRANS = IN.map((t, i) => ({ t, slide: i > 0 && slideAt(i - 1, i) })).filter((x) => x.slide).map((x) => x.t);

// a SECOND retention bar at the bottom, tracking the how-to steps through the screen-rec
// section (scenes S3..S8) with fill-in checkpoints — keeps eyes at the bottom of the frame.
const TUT_STEPS = ["Voicemail", "Ramble", "Cut ums", "Ban tics", "Pick side", "Verify"];
const TutorialBar: React.FC = () => {
  const f = useCurrentFrame();
  const start = IN[2], end = IN[8];                 // S3 start .. S9 (CTA) start
  if (f < start - 10 || f > end + 4) return null;
  let idx = 2; for (let i = 2; i <= 7; i++) if (f >= IN[i]) idx = i;
  const step = Math.min(6, Math.max(1, idx - 1));   // 1..6
  const appIn = interpolate(f, [start - 10, start + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const appOut = 1 - interpolate(f, [end - 8, end + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const app = Math.min(appIn, appOut);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1120, zIndex: 150, opacity: app, transform: `translateY(${(1 - app) * 14}px)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "11px 22px", borderRadius: 22, background: "linear-gradient(180deg, rgba(22,17,12,0.94), rgba(14,11,8,0.94))", border: "2px solid rgba(231,178,76,0.42)", boxShadow: "0 16px 36px -10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, color: "#F4EEE2", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>📋 TUTORIAL</span>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          {TUT_STEPS.map((s, i) => { const done = i < step - 1; const cur = i === step - 1; const pulse = cur ? 1 + Math.max(0, Math.sin(f / 5)) * 0.1 : 1; return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? GREEN : cur ? GOLD : "#2A2620", border: `2.5px solid ${done ? GREEN : cur ? GOLD : "rgba(255,255,255,0.28)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, transform: `scale(${pulse})`, boxShadow: cur ? `0 0 12px ${GOLD}aa` : "none" }}>{done ? "✓" : i + 1}</div>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, color: done || cur ? "#F4EEE2" : "rgba(244,238,226,0.48)", whiteSpace: "nowrap" }}>{s}</span>
            </div>
          ); })}
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: GOLD, whiteSpace: "nowrap" }}>{step}/6</span>
      </div>
    </div>
  );
};

export const SlopReel: React.FC = () => {
  const f = useCurrentFrame();
  // music bed: gentle fade-in, ducked bed under the VO, fade-out on the CTA hold
  const music = interpolate(f, [0, 18, SLOP_TOTAL - 26, SLOP_TOTAL], [0, 0.3, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      {/* one continuous VO + music bed for the whole reel */}
      <Audio src={staticFile("slop_vo.wav")} />
      <Audio src={staticFile("breathing_bed.mp3")} volume={music} />
      {/* a swipe whoosh on each SLIDE transition (crossfades stay silent) */}
      {SLIDE_TRANS.map((t, i) => (
        <Sequence key={"wh" + i} from={t - 2} durationInFrames={16} layout="none">
          <Audio src={staticFile("sfx/lib_whoosh_fast.wav")} volume={0.42} />
        </Sequence>
      ))}
      {/* full sound design bed */}
      {SFX_ALL.map((s, i) => <Sfx key={"sfx" + i} at={s.at} src={s.src} v={s.v} dur={s.dur} />)}

      {/* ONE global cream background (scenes suppress their own) */}
      <Bg />

      {/* the swiping panels — each scene runs inside the assembly context so it
          drops its own bg/rail/caption/audio and only its panel travels */}
      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] + D : SLOP_TOTAL;
          const { x, sc: scale, rot, op } = xform(i, f);
          const C = sc.C;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
              <AbsoluteFill style={{ transform: `translateX(${x}px) scale(${scale}) rotate(${rot}deg)`, transformOrigin: "50% 54%", opacity: op, willChange: "transform, opacity" }}>
                <C />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      {/* ONE continuous retention rail + ONE karaoke track over the whole reel */}
      <ProgressBar />
      <TutorialBar />
      <KaraokeCaption words={words as any} fps={FPS} top={1268} />
    </AbsoluteFill>
  );
};
