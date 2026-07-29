import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { CREAM, RED, AMBER, GREEN, TERM_A, TERM_B, grad, seed, fr, CL, inter, Sfx } from "./limits/chassis";
import { ProgressBar, HeroHeader, Captions, SceneHeader } from "./limits/chrome";
import { S0Office } from "./limits/S0Office";
import { S1Corridor } from "./limits/S1Corridor";
import { S2Refine } from "./limits/S2Refine";
import { S3Corner } from "./limits/S3Corner";
import { S4Wall } from "./limits/S4Wall";
import { S5Board } from "./limits/S5Board";
import { S6Comment } from "./limits/S6Comment";

/* ============================================================ REEL 78 — "LIMITS"
   "Claude usage limit? 3 fixes."   Board: storyboards/78-limits.md
   VO: public/78_limits_vo.wav — 32.40s. ⛔ Re-spliced 2026-07-28 after three
   "cut cut" markers shipped inside beat C; keepers verified by transcribing every
   energy run IN ISOLATION.
   THEME: a Severance knockoff carried through all seven scenes — CLAUDON
   INDUSTRIES, dept. Macrocontext Refinement. Every element is the mechanic.
   ⛔ CAMERA LOCKED throughout; every shot change is a hard cut. */

const L = [0.0, 4.36, 6.86, 13.66, 21.86, 28.46, 31.10];
const Lf = L.map(fr);
const CTA_AT = 31.10;
const END = fr(32.40);

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: grad("#EFEBE3", "#E4DFD4") }}>
      <div style={{ position: "absolute", left: -140, top: 240, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.16), transparent 62%)", filter: "blur(10px)" }} />
      <div style={{ position: "absolute", right: -170, top: 620, width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,80,110,0.13), transparent 62%)", filter: "blur(12px)" }} />
      <div style={{ position: "absolute", left: -60, top: -60, width: 700, height: 700, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.5), transparent 60%)" }} />
      {Array.from({ length: 16 }, (_, i) => { const s = seed(i + 3); const x = seed(i * 2.3) * 1080; const y = ((seed(i * 1.7) * 1920 + f * (0.3 + s * 0.5)) % 1920); return (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)", opacity: 0.25 + s * 0.3 }} />); })}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 320px rgba(40,32,24,0.28)" }} />
    </AbsoluteFill>
  );
};

const Panel: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 40, background: grad(TERM_A, TERM_B), boxShadow: "0 34px 66px -22px rgba(30,20,26,0.55), 0 10px 24px rgba(30,20,26,0.30)", overflow: "hidden", border: "2px solid rgba(150,120,150,0.22)" }}>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 130px rgba(0,0,0,0.45)", zIndex: 70, pointerEvents: "none" }} />
    <div style={{ position: "absolute", left: 30, top: 26, display: "flex", gap: 12, alignItems: "center", zIndex: 60 }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
    </div>
    {children}
  </div>
);

export const ClaudeLimitsReel: React.FC = () => {
  const f = useCurrentFrame();
  const scene = (i: number) => f >= Lf[i] && (i === Lf.length - 1 || f < Lf[i + 1]);
  const dur = (i: number) => (i === Lf.length - 1 ? END : Lf[i + 1]) - Lf[i];

  const bed = (ff: number) => interpolate(ff,
    [fr(0), fr(0.6), fr(4.1), fr(4.7), fr(6.6), fr(7.2), fr(13.4), fr(14.0),
     fr(21.6), fr(22.2), fr(28.2), fr(28.8), fr(30.9), fr(31.5), fr(32.4)],
    [0.18, 0.21, 0.25, 0.13, 0.25, 0.13, 0.25, 0.13, 0.25, 0.13, 0.27, 0.15, 0.26, 0.16, 0.08], CL);

  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("78_limits_vo.wav")} />
      <Audio src={staticFile("seo_music.wav")} volume={bed} />

      {/* ===== SOUND DESIGN — `at` is ROOT seconds (⛔ sfx-root-timeline-trap) ===== */}
      {/* ⛔ THE OPEN IS SCORED TO ITS CUTS. Four shots at 0.00 / 0.93 / 2.13 / 3.20,
          and every cut gets a transient ON the frame — a cut with no sound reads
          as a glitch, and a cut with sound reads as intent. ⛔ Every `dur` below
          is >= the file's TRUE length (measured, not guessed) so no tail is
          chopped: impact .62 · sub .42 · alarm 2.40 · crash .70 · boom .55 ·
          vine_boom .90 · swooshup/dn .42 · data .21 · lib_paper .22.
          The previous bank chopped five of six cues mid-tail. */}

      {/* SHOT A 0.00 — the limit lands. Audible on frame 0 (⛔ ship-gate). */}
      <Sfx at={0.00} src="impact.wav" v={0.62} dur={0.62} />
      <Sfx at={0.00} src="boom.wav" v={0.42} dur={0.55} />
      <Sfx at={0.00} src="vine_boom.wav" v={0.44} dur={0.90} />
      <Sfx at={0.00} src="sub.wav" v={0.40} dur={0.42} />
      <Sfx at={0.10} src="alarm.wav" v={0.13} dur={2.40} />
      <Sfx at={0.26} src="data.wav" v={0.22} dur={0.21} />
      <Sfx at={0.44} src="data.wav" v={0.16} dur={0.21} />

      {/* CUT → the wide, 0.93. Whoosh into it, the drawer burst on it. */}
      <Sfx at={0.79} src="swooshup.wav" v={0.26} dur={0.42} />
      <Sfx at={0.93} src="crash.wav" v={0.26} dur={0.70} />
      <Sfx at={0.97} src="lib_paper.wav" v={0.32} dur={0.22} />
      <Sfx at={1.14} src="lib_paper.wav" v={0.24} dur={0.22} />
      <Sfx at={1.38} src="lib_paper.wav" v={0.18} dur={0.22} />

      {/* CUT → the board, 2.13. It flips, then hits 100 and stops dead. */}
      <Sfx at={2.01} src="swooshdn.wav" v={0.24} dur={0.42} />
      <Sfx at={2.13} src="boom.wav" v={0.20} dur={0.55} />
      <Sfx at={2.20} src="glitch_counter.mp3" v={0.20} dur={0.62} />
      <Sfx at={2.66} src="vine_boom.wav" v={0.22} dur={0.90} />

      {/* CUT → the pod, 3.20. Everything stops. */}
      <Sfx at={3.08} src="swooshup.wav" v={0.22} dur={0.42} />
      <Sfx at={3.20} src="sub.wav" v={0.30} dur={0.42} />
      <Sfx at={3.24} src="impact.wav" v={0.24} dur={0.62} />
      {/* S1 corridor */}
      <Sfx at={4.36} src="lib_whoosh.wav" v={0.22} dur={1.10} />
      <Sfx at={4.70} src="digital-loading.wav" v={0.18} dur={1.80} />
      {/* S2 refinement */}
      <Sfx at={6.90} src="lib_notif.wav" v={0.22} dur={0.80} />
      <Sfx at={7.30} src="lib_paper.wav" v={0.28} dur={1.60} />
      <Sfx at={9.02} src="lib_whoosh_fast.wav" v={0.26} dur={0.90} />
      <Sfx at={9.30} src="lib_mactype.wav" v={0.18} dur={1.80} />
      <Sfx at={11.13} src="impact.wav" v={0.28} dur={1.40} />
      <Sfx at={11.60} src="lib_confirm.wav" v={0.24} dur={1.00} />
      {/* S3 corner office */}
      <Sfx at={13.66} src="lib_pop.wav" v={0.22} dur={0.70} />
      <Sfx at={14.20} src="lib_mactype.wav" v={0.18} dur={1.90} />
      <Sfx at={16.19} src="lib_whoosh_fast.wav" v={0.26} dur={0.90} />
      <Sfx at={18.33} src="lib_deep_whoosh.wav" v={0.24} dur={1.20} />
      <Sfx at={19.10} src="lib_click.wav" v={0.24} dur={0.60} />
      {/* S4 the wall */}
      <Sfx at={21.86} src="lib_riser.wav" v={0.22} dur={1.20} />
      <Sfx at={22.10} src="lib_mactype.wav" v={0.18} dur={1.70} />
      <Sfx at={23.73} src="lib_whoosh_fast.wav" v={0.26} dur={0.90} />
      <Sfx at={25.73} src="lib_paper.wav" v={0.26} dur={1.60} />
      <Sfx at={27.20} src="lib_correct.wav" v={0.24} dur={1.00} />
      {/* S5 the board drops */}
      <Sfx at={28.46} src="lib_riser.wav" v={0.26} dur={1.20} />
      <Sfx at={28.80} src="glitch_counter.mp3" v={0.26} dur={1.60} />
      <Sfx at={30.20} src="chimehi.wav" v={0.26} dur={1.30} />
      {/* S6 CTA */}
      <Sfx at={31.10} src="lib_typing.wav" v={0.24} dur={1.00} />
      <Sfx at={31.95} src="lib_confirm.wav" v={0.30} dur={1.10} />

      <Bg />
      <Panel>
        {scene(0) ? <S0Office lf={f - Lf[0]} /> : null}
        {scene(1) ? <><S1Corridor lf={f - Lf[1]} /><SceneHeader lf={f - Lf[1]} dur={dur(1)} kicker="FIX 01" title="/compact" code /></> : null}
        {scene(2) ? <><S2Refine lf={f - Lf[2]} /><SceneHeader lf={f - Lf[2]} dur={dur(2)} kicker="WHAT /COMPACT DOES" title="Keeps what matters" /></> : null}
        {scene(3) ? <><S3Corner lf={f - Lf[3]} /><SceneHeader lf={f - Lf[3]} dur={dur(3)} kicker="FIX 02" title="/model opusplan" code /></> : null}
        {scene(4) ? <><S4Wall lf={f - Lf[4]} /><SceneHeader lf={f - Lf[4]} dur={dur(4)} kicker="FIX 03" title="ultrathink" code /></> : null}
        {scene(5) ? <><S5Board lf={f - Lf[5]} /><SceneHeader lf={f - Lf[5]} dur={dur(5)} kicker="THE RESULT" title="10 fewer messages" /></> : null}
        {scene(6) ? <S6Comment lf={f - Lf[6]} /> : null}
      </Panel>

      <ProgressBar ctaAt={CTA_AT} />
      <HeroHeader outAt={104} />
      <Captions />
    </AbsoluteFill>
  );
};
