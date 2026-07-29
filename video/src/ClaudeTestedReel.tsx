import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { CREAM, GOLD, RED, AMBER, GREEN, TERM_A, TERM_B, grad, seed, fr, FPS, CL, inter, Sfx } from "./tested/chassis";
import { ProgressBar, HeroHeader, Captions, SceneHeader } from "./tested/chrome";
import { S0Hook, B } from "./tested/S0Hook";
import { XPost } from "./tested/XPost";
import { S1Fresh } from "./tested/S1Fresh";
import { S2Trigger } from "./tested/S2Trigger";
import { S3Sandbox } from "./tested/S3Sandbox";
import { S4Fork } from "./tested/S4Fork";
import { S5Payoff } from "./tested/S5Payoff";
import { S6Cta } from "./tested/S6Cta";

/* ============================================================ REEL 77 — "TESTED"
   "50 viral Claude tips. #4 rewired my work."  Board: storyboards/77-tested.md
   VO: public/77_tested_vo.wav — 42.946s, 9 "cut cut" retakes spliced out, de-gapped, zero lead-in.
   ⛔ CAMERA LOCKED throughout. Shot changes are hard cuts, never pushes. */

const L = [0.0, 7.900, 15.060, 23.750, 29.330, 35.610, 39.600];   // onsets, measured off the final VO
const Lf = L.map(fr);

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

export const ClaudeTestedReel: React.FC = () => {
  const f = useCurrentFrame();
  const scene = (i: number) => f >= Lf[i] && (i === Lf.length - 1 || f < Lf[i + 1]);
  const punch = (() => { let p = 0; for (const b of Lf.slice(1)) { const d = f - b; if (d >= 0 && d < 7) p = Math.max(p, Math.pow(1 - d / 7, 2)); } return p; })();
  // music bed: audible at 0.00s, ducked under every VO line, lifted on the cuts and the payoff
  const bed = (ff: number) => interpolate(ff,
    [fr(0), fr(0.6), fr(7.6), fr(8.2), fr(14.8), fr(15.4), fr(23.5), fr(24.1), fr(29.1), fr(29.7), fr(35.3), fr(36.0), fr(39.4), fr(40.1), fr(42.9)],
    [0.17, 0.19, 0.24, 0.14, 0.24, 0.14, 0.24, 0.14, 0.24, 0.14, 0.26, 0.15, 0.26, 0.16, 0.08], CL);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("77_tested_vo.wav")} />
      <Audio src={staticFile("seo_music.wav")} volume={bed} />

      {/* ===== SOUND DESIGN — `at` is ROOT seconds (⛔ sfx-root-timeline-trap) ===== */}
      <Sfx at={0.00} src="metal_riser.wav" v={0.34} dur={1.30} />
      <Sfx at={0.18} src="lib_paper.wav" v={0.20} dur={0.55} />
      <Sfx at={0.64} src="thock.wav" v={0.34} dur={0.35} />
      <Sfx at={0.66} src="impact.wav" v={0.30} dur={0.50} />
      <Sfx at={0.70} src="shimmer.wav" v={0.22} dur={0.70} />
      <Sfx at={1.16} src="lib_whoosh_fast.wav" v={0.24} dur={0.35} />
      <Sfx at={1.20} src="lib_notif.wav" v={0.20} dur={0.40} />
      <Sfx at={1.28} src="glitch_counter.mp3" v={0.18} dur={1.40} />
      {[0, 1, 2].map((i) => <Sfx key={`nt${i}`} at={1.42 + i * 0.34} src="lib_pop2.wav" v={0.14} dur={0.25} />)}
      <Sfx at={1.66} src="swish.wav" v={0.15} dur={0.30} />
      <Sfx at={2.42} src="swish.wav" v={0.15} dur={0.30} />
      <Sfx at={3.05} src="thock.wav" v={0.30} dur={0.35} />
      <Sfx at={3.07} src="downer.mp3" v={0.16} dur={0.80} />
      <Sfx at={3.50} src="lib_deep_whoosh.wav" v={0.24} dur={0.50} />
      <Sfx at={4.18} src="thock.wav" v={0.30} dur={0.35} />
      <Sfx at={4.84} src="lib_deep_whoosh.wav" v={0.24} dur={0.55} />
      <Sfx at={4.93} src="impact.wav" v={0.50} dur={0.60} />
      <Sfx at={4.94} src="lib_boom.wav" v={0.36} dur={0.85} />
      <Sfx at={4.96} src="sub.wav" v={0.30} dur={0.70} />
      {Array.from({ length: 11 }, (_, i) => <Sfx key={`x${i}`} at={4.99 + i * 0.092} src="slash.wav" v={0.13} dur={0.22} />)}
      {[0, 1, 2, 3, 4].map((i) => <Sfx key={`pr${i}`} at={5.45 + i * 0.30} src="lib_paper.wav" v={0.15} dur={0.55} />)}
      {[0, 1, 2, 3].map((i) => <Sfx key={`g${i}`} at={6.00 + i * 0.20} src="lib_pop.wav" v={0.22} dur={0.30} />)}
      <Sfx at={6.62} src="twang.wav" v={0.22} dur={0.55} />
      <Sfx at={6.80} src="impact.wav" v={0.40} dur={0.55} />
      <Sfx at={6.82} src="snap.wav" v={0.28} dur={0.35} />
      <Sfx at={6.90} src="shimmer.wav" v={0.24} dur={0.80} />
      {Lf.slice(1).map((b, i) => <Sfx key={`cut${i}`} at={b / FPS} src="lib_whoosh_fast.wav" v={0.17} dur={0.28} />)}
      {/* S1 blind booth */}
      <Sfx at={L[1] + 0.45} src="lib_paper.wav" v={0.18} dur={0.60} />
      <Sfx at={L[1] + 1.30} src="swooshdn.wav" v={0.20} dur={0.45} />
      <Sfx at={L[1] + 2.60} src="lib_magic_reveal.wav" v={0.20} dur={0.80} />
      <Sfx at={L[1] + 4.30} src="lib_click.wav" v={0.20} dur={0.30} />
      <Sfx at={L[1] + 5.60} src="chimehi.wav" v={0.24} dur={0.80} />
      {/* S2 door list -> tripwire */}
      <Sfx at={L[2] + 0.40} src="lib_paper.wav" v={0.18} dur={1.20} />
      {[0, 1, 2].map((i) => <Sfx key={`sk${i}`} at={L[2] + 2.10 + i * 0.62} src="lib_click.wav" v={0.17} dur={0.28} />)}
      <Sfx at={L[2] + 4.50} src="lib_whoosh.wav" v={0.20} dur={0.40} />
      <Sfx at={L[2] + 6.30} src="alarm.wav" v={0.16} dur={0.45} />
      <Sfx at={L[2] + 6.60} src="impact.wav" v={0.50} dur={0.60} />
      <Sfx at={L[2] + 6.62} src="lib_boom.wav" v={0.36} dur={0.85} />
      <Sfx at={L[2] + 6.64} src="sub.wav" v={0.30} dur={0.70} />
      <Sfx at={L[2] + 7.60} src="thock.wav" v={0.28} dur={0.35} />
      {/* S3 paddock */}
      <Sfx at={L[3] + 0.70} src="crash.wav" v={0.26} dur={0.70} />
      <Sfx at={L[3] + 2.10} src="impact.wav" v={0.40} dur={0.60} />
      <Sfx at={L[3] + 2.12} src="sub.wav" v={0.28} dur={0.70} />
      <Sfx at={L[3] + 3.70} src="lib_cinematic_hit.wav" v={0.30} dur={0.90} />
      <Sfx at={L[3] + 4.60} src="twang.wav" v={0.22} dur={0.60} />
      {/* S4 the switch */}
      <Sfx at={L[4] + 0.35} src="toggle.mp3" v={0.26} dur={0.35} />
      <Sfx at={L[4] + 0.60} src="lib_click.wav" v={0.24} dur={0.30} />
      <Sfx at={L[4] + 1.40} src="construction.wav" v={0.14} dur={2.60} />
      <Sfx at={L[4] + 4.20} src="m_bump.wav" v={0.24} dur={0.40} />
      <Sfx at={L[4] + 5.10} src="m_powerup.wav" v={0.22} dur={0.70} />
      {/* S5 the warehouse — the peak */}
      <Sfx at={L[5] - 0.10} src="lib_deep_whoosh.wav" v={0.30} dur={0.70} />
      <Sfx at={L[5] + 0.20} src="suspense_approach.wav" v={0.18} dur={1.60} />
      <Sfx at={L[5] + 1.70} src="m_bump.wav" v={0.22} dur={0.40} />
      <Sfx at={L[5] + 2.60} src="shimmer.wav" v={0.24} dur={0.90} />
      {/* S6 CTA */}
      <Sfx at={L[6] + 0.20} src="lib_paper.wav" v={0.18} dur={0.60} />
      <Sfx at={L[6] + 0.60} src="metal_riser.wav" v={0.32} dur={1.00} />
      <Sfx at={L[6] + 1.60} src="lib_mactype.wav" v={0.18} dur={1.10} />
      <Sfx at={L[6] + 2.70} src="m_1up.wav" v={0.26} dur={0.80} />
      <Sfx at={L[6] + 2.80} src="resolve.wav" v={0.26} dur={1.10} />

      <Bg />
      <AbsoluteFill>
        <Panel>
          {scene(0) ? <S0Hook lf={f - Lf[0]} /> : null}
          {scene(1) ? <><S1Fresh lf={f - Lf[1]} /><SceneHeader lf={f - Lf[1]} dur={Lf[2] - Lf[1]} kicker="TIP 01" title="Blind Review" /></> : null}
          {scene(2) ? <><S2Trigger lf={f - Lf[2]} /><SceneHeader lf={f - Lf[2]} dur={Lf[3] - Lf[2]} kicker="TIP 02" title="The Tripwire" /></> : null}
          {scene(3) ? <><S3Sandbox lf={f - Lf[3]} /><SceneHeader lf={f - Lf[3]} dur={Lf[4] - Lf[3]} kicker="TIP 03" title="The Paddock" /></> : null}
          {scene(4) ? <><S4Fork lf={f - Lf[4]} /><SceneHeader lf={f - Lf[4]} dur={Lf[5] - Lf[4]} kicker="TIP 04" title="The Fork" /></> : null}
          {scene(5) ? <><S5Payoff lf={f - Lf[5]} /><SceneHeader lf={f - Lf[5]} dur={Lf[6] - Lf[5]} kicker="AND THEN" title="46 Still Sealed" /></> : null}
          {scene(6) ? <><S6Cta lf={f - Lf[6]} /><SceneHeader lf={f - Lf[6]} dur={100} kicker="THE GUIDE" title="Comment TESTED" /></> : null}
        </Panel>
        {f >= B.xui && f < B.xuiOut ? <XPost lf={f} /> : null}
        <Captions />
      </AbsoluteFill>
      <ProgressBar ctaAt={L[6]} />
      <HeroHeader outAt={208} />
      {punch > 0 && <AbsoluteFill style={{ background: "#FFF6E6", opacity: punch * 0.34, zIndex: 200, pointerEvents: "none" }} />}
    </AbsoluteFill>
  );
};
