import React from "react";
import { useCurrentFrame } from "remotion";
import {
  Smoke, Shuriken, SMOKE, SMOKE_L, SMOKE_D, PAPER_HI, IRON_D, IRON_L, NIGHT_D, SASH,
  E, rnd, OUT, IO, IN_Q,
} from "./NinjaWorld";

/* =========================================================================
   NINJA TRANSITIONS.

   ⛔ Still no sliding panels — the scenes HARD CUT underneath. What travels
   across the boundary is a GRAPHIC: smoke, a thrown star, a blade slash, an
   ink swipe. Each one is fully opaque on the cut frame, so the swap happens
   while the frame is covered, then the graphic clears off the new scene.

     in : the cover builds over the last 7 frames of the outgoing scene
     0  : the cut. Frame is covered.
     out: the cover clears over the first 9 frames of the incoming scene
   ========================================================================= */

const IN_F = 5, OUT_F = 7;
/** 0 -> 1 -> 0, peaking exactly on the cut */
const cover = (k: number) =>
  k < -IN_F || k > OUT_F ? 0
  : k <= 0 ? E(k, -IN_F, 0, 0, 1, IN_Q)
  : E(k, 0, OUT_F, 1, 0, OUT);

export type Kind = "smoke" | "star" | "slash" | "ink";
export const KINDS: Kind[] = ["smoke", "star", "slash", "ink"];

/* ---- 1 · SMOKE BOMB. The classic exit. ---- */
const SmokeCut: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const g = 0.35 + c * 0.9;
  return (
    <div style={{ position: "absolute", inset: -180, zIndex: 300, pointerEvents: "none" }}>
      {/* the core hides the cut, but never fully — you should always read SMOKE */}
      <div style={{ position: "absolute", inset: 0, background: SMOKE, opacity: Math.max(0, (c - 0.5) / 0.5) * 0.86 }} />
      {Array.from({ length: 30 }, (_, i) => {
        const a = (i / 30) * Math.PI * 2 + rnd(i) * 0.9;
        const d = (150 + rnd(i, 2) * 440) * g;
        const sz = (250 + rnd(i, 3) * 330) * g;
        return <div key={i} style={{ position: "absolute", left: 506 + Math.cos(a) * d - sz / 2, top: 396 + Math.sin(a) * d * 0.82 - sz / 2,
          width: sz, height: sz, borderRadius: "50%",
          background: i % 3 === 0 ? SMOKE_L : i % 3 === 1 ? SMOKE : SMOKE_D }} />;
      })}
    </div>
  );
};

/* ---- 2 · THROWN STAR. The star leads, a hard wedge follows it. ---- */
const StarCut: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const p = E(k, -IN_F, OUT_F, 0, 1, IO);           // the star's flight across
  const x = -260 + p * 1540;
  const y = 780 - p * 660;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 300, overflow: "hidden", pointerEvents: "none" }}>
      {/* the wedge the star drags behind it */}
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, background: NIGHT_D,
        clipPath: k <= 0
          ? `polygon(0 0, ${c * 168}% 0, ${c * 168 - 68}% 100%, 0 100%)`
          : `polygon(${(1 - c) * 168 - 68}% 0, 100% 0, 100% 100%, ${(1 - c) * 168 - 136}% 100%)` }} />
      {/* the cut line the star just made */}
      <div style={{ position: "absolute", left: x - 660, top: y + 20, width: 660, height: 11, borderRadius: 6,
        background: PAPER_HI, transform: "rotate(-30deg)", opacity: 0.9 }} />
      <div style={{ transform: `translate(${x}px, ${y}px)` }}>
        <Shuriken f={k * 6} x={0} y={0} s={2.4} spin={44} c={IRON_L} z={301} />
      </div>
    </div>
  );
};

/* ---- 3 · BLADE SLASH. Two wedges meet on the cut, then part. ---- */
const SlashCut: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const off = (1 - c) * 720;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 300, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, top: -off, width: "100%", height: "100%", background: IRON_D,
        clipPath: "polygon(0 0, 100% 0, 100% 46%, 0 62%)" }} />
      <div style={{ position: "absolute", left: 0, top: off, width: "100%", height: "100%", background: NIGHT_D,
        clipPath: "polygon(0 62%, 100% 46%, 100% 100%, 0 100%)" }} />
      {/* the blade line, brightest right on the cut */}
      {/* a tapered stroke: a plain rectangle reads as a scratch */}
      <div style={{ position: "absolute", left: -70, top: 396 - off * 0.02, width: 1180, height: 30,
        background: "#FFFFFF", transform: "rotate(-8deg)", opacity: c,
        clipPath: "polygon(0 46%, 12% 12%, 62% 0, 100% 40%, 62% 100%, 12% 88%)" }} />
      <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: Math.max(0, (c - 0.78) / 0.22) * 0.42 }} />
    </div>
  );
};

/* ---- 4 · INK SWIPE. A brush stroke floods the frame and drains off. ---- */
const InkCut: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const g = c * 1.25;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 300, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 9 }, (_, i) => {
        const cx = 60 + i * 122, cy = 130 + (i % 3) * 280;
        const r = (330 + rnd(i, 4) * 250) * g;
        return <div key={i} style={{ position: "absolute", left: cx - r / 2, top: cy - r / 2, width: r, height: r,
          borderRadius: "50%", background: "#171B24" }} />;
      })}
      <div style={{ position: "absolute", inset: 0, background: "#171B24", opacity: Math.max(0, (c - 0.55) / 0.45) * 0.88 }} />
      {/* a red seal stamp on the peak, for one beat */}
      {c > 0.85 && (
        <div style={{ position: "absolute", left: 424, top: 320, width: 168, height: 168, borderRadius: 12,
          border: `15px solid ${SASH}`, opacity: (c - 0.85) / 0.15 }} />
      )}
    </div>
  );
};

/* The Panel's rect in frame coords (SlopKit: left/right 34, top 384, h 792,
   radius 40). The graphic is clipped to it so the cream chassis, the retention
   rail and the karaoke line stay continuous across every cut. */
const PANEL = { left: 34, top: 384, width: 1012, height: 792, radius: 40 } as const;

export const NinjaCut: React.FC<{ at: number; kind: Kind }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < -IN_F - 1 || k > OUT_F + 1) return null;
  const inner =
    kind === "smoke" ? <SmokeCut k={k} />
    : kind === "star" ? <StarCut k={k} />
    : kind === "slash" ? <SlashCut k={k} />
    : <InkCut k={k} />;
  return (
    <div style={{ position: "absolute", left: PANEL.left, top: PANEL.top, width: PANEL.width, height: PANEL.height,
      borderRadius: PANEL.radius, overflow: "hidden", zIndex: 260, pointerEvents: "none" }}>
      {inner}
    </div>
  );
};
