import React from "react";
import { useCurrentFrame } from "remotion";
import { PAPER, INKD, GO, AMB, RED } from "./CancelWorld";

/* =========================================================================
   REEL 86 "CANCEL" · TRANSITION KIT.

   ⛔ Trial variants must differ where IG measures, and the transition between
   every scene is one of the five axes (memory feedback_trial_reel_variants).
   One kind per cut, ordered differently per variant, so two cuts of the same
   body never produce the same frame at the same timestamp.

   Each is clipped to the PANEL, never full-bleed across the cream chassis.
   ========================================================================= */
export type CKind = "flash" | "wipe" | "dip" | "cards";

const PANEL: React.CSSProperties = {
  position: "absolute", left: 34, right: 34, top: 384, height: 792,
  borderRadius: 40, overflow: "hidden", zIndex: 90, pointerEvents: "none",
};

export const CancelCut: React.FC<{ at: number; kind: CKind }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const k = f - at + 4;                       // starts 4 frames before the cut
  const N = kind === "dip" ? 12 : 10;
  if (k < 0 || k > N) return null;
  const p = k / N;

  if (kind === "flash") {
    return (
      <div style={PANEL}>
        <div style={{ position: "absolute", inset: 0, background: "#FFF6E2",
          opacity: (1 - Math.abs(p - 0.35) / 0.65) * 0.5 }} />
      </div>
    );
  }
  if (kind === "wipe") {
    const x = -1180 + p * 2360;
    return (
      <div style={PANEL}>
        <div style={{ position: "absolute", left: x, top: -80, width: 460, height: 960,
          background: AMB, transform: "skewX(-16deg)", opacity: 0.9 }} />
        <div style={{ position: "absolute", left: x + 460, top: -80, width: 190, height: 960,
          background: PAPER, transform: "skewX(-16deg)", opacity: 0.75 }} />
      </div>
    );
  }
  if (kind === "dip") {
    return (
      <div style={PANEL}>
        <div style={{ position: "absolute", inset: 0, background: INKD,
          opacity: (1 - Math.abs(p - 0.5) * 2) * 0.92 }} />
      </div>
    );
  }
  /* cards: four panels sweep across on a stagger, the row motif of this reel */
  return (
    <div style={PANEL}>
      {[0, 1, 2, 3].map((i) => {
        const q = Math.max(0, Math.min(1, (p - i * 0.09) / 0.62));
        return (
          <div key={i} style={{ position: "absolute", left: -1080 + q * 2160,
            top: i * 198, width: 1080, height: 198,
            background: [PAPER, GO, PAPER, RED][i], opacity: 0.94 }} />
        );
      })}
    </div>
  );
};
