import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import { Bg, Panel, LS0, LS1 } from "./ClaudeLangfuseReel";

const CREAM = "#ECE9E2", INK = "#1F180F", CLAY = "#D2724E";

/* grid-style cover header: small SETUP line + BIG payoff line, no box, Claude/number in CLAY */
type Head = { l1: React.ReactNode; l2: React.ReactNode; scene?: "s0" | "s1"; lf?: number };
const A = (w: React.ReactNode) => <span style={{ color: CLAY }}>{w}</span>;

const HEADERS: Head[] = [
  { l1: <>CUT YOUR {A("CLAUDE")} TOKENS</>, l2: <>BY {A("90%")}</>, scene: "s0", lf: 40 },
  { l1: <>SEE EVERY TOKEN</>, l2: <>{A("CLAUDE")} BURNS</>, scene: "s0", lf: 40 },
  { l1: <>STOP {A("CLAUDE")} BURNING</>, l2: <>YOUR TOKENS</>, scene: "s1", lf: 22 },
];

const CoverHeader: React.FC<{ h: Head }> = ({ h }) => (
  <div style={{ position: "absolute", top: 150, left: 40, right: 40, textAlign: "center", zIndex: 60 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, lineHeight: 1.0, letterSpacing: "-0.01em", color: INK, textShadow: "0 2px 14px rgba(236,233,226,0.95), 0 1px 0 rgba(255,255,255,0.6)" }}>{h.l1}</div>
    <div style={{ marginTop: 8, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.03em", color: INK, textShadow: "0 3px 18px rgba(236,233,226,0.95), 0 1px 0 rgba(255,255,255,0.6)" }}>{h.l2}</div>
  </div>
);

export const LangfuseCover: React.FC<{ idx?: number }> = ({ idx = 0 }) => {
  const h = HEADERS[idx] || HEADERS[0];
  const lf = h.lf ?? 40;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Bg />
      {/* scale the diorama up + drop it so it fills the frame like the real covers (grow from the panel top) */}
      <div style={{ position: "absolute", inset: 0, transformOrigin: "540px 384px", transform: "translateY(64px) scale(1.36)" }}>
        <Panel>{h.scene === "s1" ? <LS1 lf={lf} /> : <LS0 lf={lf} />}</Panel>
      </div>
      <CoverHeader h={h} />
    </AbsoluteFill>
  );
};
