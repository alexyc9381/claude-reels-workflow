import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { CREAM, RED, AMBER, GREEN, TERM_A, TERM_B, grad, seed, fr, CL, inter } from "./chassis";
import { ProgressBar, HeroHeader, Captions } from "./chrome";
import { S0Hook, B } from "./S0Hook";
import { XPost } from "./XPost";

const Panel: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 40, background: grad(TERM_A, TERM_B), boxShadow: "0 34px 66px -22px rgba(30,20,26,0.55)", overflow: "hidden", border: "2px solid rgba(150,120,150,0.22)" }}>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 130px rgba(0,0,0,0.45)", zIndex: 70, pointerEvents: "none" }} />
    <div style={{ position: "absolute", left: 30, top: 26, display: "flex", gap: 12, zIndex: 60 }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
    </div>
    {children}
  </div>
);

export const VerifyS0: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("77_tested_vo.wav")} />
      <AbsoluteFill style={{ background: grad("#EFEBE3", "#E4DFD4") }}>
        <div style={{ position: "absolute", left: -140, top: 240, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.16), transparent 62%)", filter: "blur(10px)" }} />
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 320px rgba(40,32,24,0.28)" }} />
      </AbsoluteFill>
      <AbsoluteFill>
        <Panel><S0Hook lf={f} /></Panel>
        {f >= B.xui && f < B.xuiOut ? <XPost lf={f} /> : null}
        <Captions />
      </AbsoluteFill>
      <ProgressBar ctaAt={39.6} />
      <HeroHeader outAt={208} />
    </AbsoluteFill>
  );
};
