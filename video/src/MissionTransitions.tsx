import React from "react";
import { useCurrentFrame } from "remotion";
import { PANEL_D, PANEL_L, GO_L, ROOM_HI, STARC, RED, E, rnd, OUT, IN_Q } from "./MissionWorld";

/* =========================================================================
   MISSION TRANSITIONS.

   Scenes HARD CUT underneath. What crosses the boundary is an in-world
   graphic — a radar wipe, a telemetry dropout, a porthole iris — opaque on the
   cut frame so the swap happens while the frame is covered.

   ⛔ Clipped to the Panel rect. A full-frame overlay blanks the cream chassis,
   the retention rail and the karaoke line (REEL-BUILD-LEARNINGS §3, learned on
   reel 81 the hard way).
   ========================================================================= */

const IN_F = 5, OUT_F = 7;
const cover = (k: number) =>
  k < -IN_F || k > OUT_F ? 0
  : k <= 0 ? E(k, -IN_F, 0, 0, 1, IN_Q)
  : E(k, 0, OUT_F, 1, 0, OUT);

export type MKind = "sweep" | "static" | "iris";
const PANEL = { left: 34, top: 384, width: 1012, height: 792, radius: 40 } as const;

/** a radar arm wipes the frame */
const SweepCut: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const a = -90 + (k + IN_F) * 26;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: PANEL_D,
        clipPath: k <= 0 ? `polygon(50% 50%, ${50 + c * 90}% -20%, 150% -20%, 150% 150%, 50% 150%)`
                         : `polygon(50% 50%, 150% -20%, 150% 150%, ${(1 - c) * 140 - 40}% 150%)` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "72%", height: 10, background: GO_L,
        borderRadius: 5, transformOrigin: "0% 50%", transform: `rotate(${a}deg)` }} />
      {[0.34, 0.66, 1].map((r, i) => (
        <div key={i} style={{ position: "absolute", left: `${50 - r * 44}%`, top: `${50 - r * 44}%`,
          width: `${r * 88}%`, height: `${r * 88}%`, borderRadius: "50%", border: `3px solid ${GO_L}`, opacity: 0.3 * c }} />
      ))}
    </div>
  );
};

/** signal dropout: hard horizontal bars, the way a telemetry link tears */
const StaticCut: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: PANEL_D, opacity: Math.max(0, (c - 0.45) / 0.55) * 0.9 }} />
      {Array.from({ length: 22 }, (_, i) => {
        const h = 8 + rnd(i, k) * 44;
        return <div key={i} style={{ position: "absolute", left: (rnd(i, 2) - 0.5) * 300 * c, top: rnd(i, 3) * 792,
          width: "160%", height: h * c, background: i % 3 === 0 ? STARC : i % 3 === 1 ? PANEL_L : GO_L,
          opacity: c * (0.35 + rnd(i, 4) * 0.5) }} />;
      })}
    </div>
  );
};

/** a porthole iris closing and opening */
const IrisCut: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const hole = (1 - c) * 78;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: PANEL_D,
        clipPath: `circle(${hole}% at 50% 50%)`, WebkitClipPath: `circle(${hole}% at 50% 50%)`,
        // invert: the dark ring is everything OUTSIDE the hole
        maskImage: "none" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 0 ${(1 - hole / 78) * 620}px ${PANEL_D}` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: `${hole * 2}%`, height: `${hole * 2}%`,
        marginLeft: `-${hole}%`, marginTop: `-${hole}%`, borderRadius: "50%",
        border: `12px solid ${PANEL_L}`, opacity: c }} />
    </div>
  );
};

export const MissionCut: React.FC<{ at: number; kind: MKind }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < -IN_F - 1 || k > OUT_F + 1) return null;
  const inner = kind === "sweep" ? <SweepCut k={k} /> : kind === "static" ? <StaticCut k={k} /> : <IrisCut k={k} />;
  return (
    <div style={{ position: "absolute", left: PANEL.left, top: PANEL.top, width: PANEL.width, height: PANEL.height,
      borderRadius: PANEL.radius, overflow: "hidden", zIndex: 260, pointerEvents: "none" }}>
      {inner}
    </div>
  );
};
