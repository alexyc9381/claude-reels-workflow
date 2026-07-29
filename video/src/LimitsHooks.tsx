import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { CREAM, RED, AMBER, GREEN, TERM_A, TERM_B, grad, seed, inter, fr, CL, Sfx } from "./limits/chassis";
import { ProgressBar, HeroHeader, Captions } from "./limits/chrome";
import { S0HookA, S0HookB, S0HookC } from "./limits/S0Hooks";
import { S0Hook } from "./limits/S0Hook";
import { S0Office } from "./limits/S0Office";

/* ============================================================ REEL 78 — "LIMITS"
   Hook-variant review harness. Chrome is the 77 TESTED chassis cloned verbatim
   (⛔ reel-clone-chassis-verbatim) — only the scene body, the reel length and the
   header copy change. Board: storyboards/78-limits.md */

const CTA_AT = 36.41;

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

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Bg />
    <Panel>{children}</Panel>
    <ProgressBar ctaAt={CTA_AT} />
    <HeroHeader outAt={110} />
    <Captions />
  </AbsoluteFill>
);

export const LimitsHookA: React.FC = () => { const f = useCurrentFrame(); return <Shell><S0HookA lf={f} /></Shell>; };
export const LimitsHookB: React.FC = () => { const f = useCurrentFrame(); return <Shell><S0HookB lf={f} /></Shell>; };
export const LimitsHookC: React.FC = () => { const f = useCurrentFrame(); return <Shell><S0HookC lf={f} /></Shell>; };

/* ===================== THE CHOSEN HOOK, RENDERED AS FILM =====================
   Fury-Road theme. VO + music bed + SFX + captions + status bar, 0.00–4.36s. */
export const LimitsHookFilm: React.FC = () => {
  const f = useCurrentFrame();
  const bed = (ff: number) => interpolate(ff, [fr(0), fr(0.5), fr(1.0), fr(4.36)],
                                          [0.20, 0.24, 0.13, 0.15], CL);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("78_limits_vo.wav")} />
      <Audio src={staticFile("seo_music.wav")} volume={bed} />

      {/* ⛔ `at` is ROOT seconds (sfx-root-timeline-trap) */}
      <Sfx at={0.00} src="lib_riser.wav"        v={0.30} dur={1.20} />
      <Sfx at={0.30} src="lib_deep_whoosh.wav"  v={0.26} dur={1.40} />
      <Sfx at={0.47} src="lib_cinematic_hit.wav" v={0.34} dur={1.60} />  {/* needle slams */}
      <Sfx at={0.62} src="alarm.wav"            v={0.16} dur={1.10} />
      <Sfx at={1.13} src="lib_pop2.wav"         v={0.30} dur={0.80} />   {/* drum cap lets go */}
      <Sfx at={1.20} src="lib_whoosh.wav"       v={0.22} dur={1.00} />
      <Sfx at={2.27} src="lib_deep_whoosh.wav"  v={0.28} dur={1.50} />   {/* plume closes */}
      <Sfx at={3.33} src="lib_boom.wav"         v={0.24} dur={1.30} />   {/* he looks */}

      <Bg />
      <Panel><S0Hook lf={f} /></Panel>
      <ProgressBar ctaAt={CTA_AT} />
      <HeroHeader outAt={104} />
      <Captions />
    </AbsoluteFill>
  );
};

/* ===================== SEVERANCE HOOK — still review ===================== */
export const LimitsHookOffice: React.FC = () => {
  const f = useCurrentFrame();
  return <Shell><S0Office lf={f} /></Shell>;
};
