import React from "react";
import { useCurrentFrame } from "remotion";
import { E, rnd, OUT, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 83 "KEY" · TRANSITIONS.

   Scenes hard-cut underneath. What crosses the boundary is light, because that
   is what this world is made of: a flare from the relic, an iris, a bar wipe.
   Every one is a SOLID paint — no blur, no gradient wash.

   ⛔ Clipped to the Panel rect. A full-frame overlay blanks the cream chassis,
   the retention rail and the karaoke line (REEL-BUILD-LEARNINGS §3, learned the
   hard way on reel 81).
   ========================================================================= */

const IN_F = 5, OUT_F = 7;
const cover = (k: number) =>
  k < -IN_F || k > OUT_F ? 0
  : k <= 0 ? E(k, -IN_F, 0, 0, 1, IN_Q)
  : E(k, 0, OUT_F, 1, 0, OUT);

export type KKind = "flare" | "iris" | "wipe";
const PANEL = { left: 34, top: 384, width: 1012, height: 792, radius: 40 } as const;

const PALE = "#DFF3FF", MID = "#7EC8EE", DEEP = "#0B1119";

/** the relic flares and the light swallows the frame */
const Flare: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const r = c * 132;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", width: `${r}%`, height: `${r}%`,
        marginLeft: `-${r / 2}%`, marginTop: `-${r / 2}%`, borderRadius: "50%", background: PALE }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: `${r * 0.72}%`, height: `${r * 0.72}%`,
        marginLeft: `-${r * 0.36}%`, marginTop: `-${r * 0.36}%`, borderRadius: "50%", background: "#FFFFFF" }} />
    </div>
  );
};

/** a hard iris closing on black */
const Iris: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  const hole = (1 - c) * 82;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0,
        boxShadow: `inset 0 0 0 ${(1 - hole / 82) * 640}px ${DEEP}` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: `${hole * 2}%`, height: `${hole * 2}%`,
        marginLeft: `-${hole}%`, marginTop: `-${hole}%`, borderRadius: "50%",
        border: `10px solid ${MID}`, opacity: c }} />
    </div>
  );
};

/** stacked bars sweeping across, like a shutter */
const Wipe: React.FC<{ k: number }> = ({ k }) => {
  const c = cover(k);
  if (c <= 0.001) return null;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {Array.from({ length: 9 }, (_, i) => {
        const d = (i % 2 ? 1 : -1);
        return <div key={i} style={{ position: "absolute", left: d * (1 - c) * 1100, top: i * 88,
          width: "100%", height: 90, background: i % 2 ? DEEP : "#16202C" }} />;
      })}
    </div>
  );
};

export const KeyCut: React.FC<{ at: number; kind: KKind }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < -IN_F - 1 || k > OUT_F + 1) return null;
  const inner = kind === "flare" ? <Flare k={k} /> : kind === "iris" ? <Iris k={k} /> : <Wipe k={k} />;
  return (
    <div style={{ position: "absolute", left: PANEL.left, top: PANEL.top, width: PANEL.width,
      height: PANEL.height, borderRadius: PANEL.radius, overflow: "hidden", zIndex: 260,
      pointerEvents: "none" }}>
      {inner}
    </div>
  );
};
