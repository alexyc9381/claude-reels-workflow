import React from "react";
import { useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { E, rnd, OUT, IO } from "./MissionWorld";
import { A1, A2, A3, CARD, GO, RED, N8N_ACCENT } from "./AutoWorld";

/* =========================================================================
   REEL 85 "AUTO" · TRANSITIONS.

   ⛔ Every cut comes from THIS world and is CLIPPED TO THE PANEL — a generic
   dip-to-white reads as a template (memory `feedback_reel_vary_the_locations`).

     card  — a branded card wipes through, the way the tower turns over
     tick  — a grid of green ticks sweeps the frame: work being completed
     wire  — an n8n connector draws across and snaps
     dark  — the lights drop, top-down
   ========================================================================= */

export type AKind = "card" | "tick" | "wire" | "dark";

const PL = 34, PT = 384, PW = 1012, PH = 792, PR = 40;

const Clip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: PL, top: PT, width: PW, height: PH,
    borderRadius: PR, overflow: "hidden", zIndex: 60, pointerEvents: "none" }}>{children}</div>
);

export const AutoCut: React.FC<{ at: number; kind: AKind; len?: number }> =
  ({ at, kind, len = 11 }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < -2 || k > len) return null;
  const t = Math.max(0, Math.min(1, k / len));

  if (kind === "card") {
    const x = E(f, at, at + len, -PW - 60, PW + 60, IO);
    return (
      <Clip>
        <div style={{ position: "absolute", left: x, top: 0, width: PW + 40, height: PH,
          background: CARD, transform: "skewX(-8deg)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: PH / 2 - 46, height: 92,
            background: A3 }} />
        </div>
      </Clip>
    );
  }

  if (kind === "tick") {
    return (
      <Clip>
        {Array.from({ length: 96 }, (_, i) => {
          const c = i % 12, r = Math.floor(i / 12);
          const d = (c + r) / 20;
          const s = Math.max(0, Math.min(1, t * 2.4 - d)) * Math.max(0, 1 - (t - 0.5) * 2.6);
          if (s <= 0.02) return null;
          return (
            <div key={i} style={{ position: "absolute", left: c * (PW / 12), top: r * (PH / 8),
              width: PW / 12 - 4, height: PH / 8 - 4, borderRadius: 8, background: GO,
              transform: `scale(${s})`, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 34, color: "#EAFBF3" }}>✓</div>
          );
        })}
      </Clip>
    );
  }

  if (kind === "wire") {
    const w = E(f, at, at + len, 0, PW * 1.25, IO);
    return (
      <Clip>
        <div style={{ position: "absolute", left: 0, top: PH / 2 - 9, width: w, height: 18,
          background: N8N_ACCENT }} />
        <div style={{ position: "absolute", left: Math.max(0, w - 120), top: PH / 2 - 62,
          width: 120, height: 124, borderRadius: 14, background: "#FFFFFF",
          border: `5px solid ${N8N_ACCENT}`, opacity: t < 0.9 ? 1 : 0 }} />
      </Clip>
    );
  }

  const h = k < len / 2 ? E(f, at, at + len / 2, 0, PH, OUT) : E(f, at + len / 2, at + len, PH, 0, OUT);
  return (
    <Clip>
      <div style={{ position: "absolute", left: 0, top: 0, width: PW, height: h,
        background: "#060A0F" }} />
    </Clip>
  );
};
