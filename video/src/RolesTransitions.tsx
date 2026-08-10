import React from "react";
import { useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { E, rnd, OUT, IO } from "./MissionWorld";
import { POOL, BOARD_L, CARD, NIGHT_D, AMBER, PLUM, GO } from "./DraftWorld";

/* =========================================================================
   REEL 84 "ROLES" · TRANSITIONS.

   ⛔ Every cut comes from THIS world and is CLIPPED TO THE PANEL
   (memory `feedback_reel_vary_the_locations`). A generic dip-to-white reads as
   a template; a press-pit flashbulb reads as draft night.

     flash  — the photo pit fires: bulbs pop around the frame, then a white kick
     sweep  — a followspot bar rakes across the stage
     card   — a pick card wipes through, the way the board turns over
     black  — the house lights drop, top-down

   The panel geometry is the house chassis's, restated here so a transition can
   never bleed onto the cream background.
   ========================================================================= */

export type RKind = "flash" | "sweep" | "card" | "black";

const PL = 34, PT = 384, PW = 1012, PH = 792, PR = 40;

const Clip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: PL, top: PT, width: PW, height: PH,
    borderRadius: PR, overflow: "hidden", zIndex: 60, pointerEvents: "none" }}>{children}</div>
);

export const RolesCut: React.FC<{ at: number; kind: RKind; len?: number }> =
  ({ at, kind, len = 11 }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < -2 || k > len) return null;
  const t = Math.max(0, Math.min(1, k / len));

  if (kind === "flash") {
    /* the press pit: eight bulbs fire out of sync, then one white kick */
    return (
      <Clip>
        {Array.from({ length: 8 }, (_, i) => {
          const s = i * 0.9, a = k - s;
          if (a < 0 || a > 3.4) return null;
          const o = 1 - a / 3.4;
          const bx = rnd(i, 1) * (PW - 130), by = rnd(i, 7) * 300;
          return (
            <div key={i} style={{ position: "absolute", left: bx, top: by, width: 130, height: 96,
              borderRadius: 12, background: BOARD_L, opacity: o }} />
          );
        })}
        <div style={{ position: "absolute", inset: 0, background: "#FFFDF6",
          opacity: Math.max(0, 1 - Math.abs(t - 0.28) * 4.2) * 0.9 }} />
      </Clip>
    );
  }

  if (kind === "sweep") {
    /* a followspot rakes the stage — a solid bar, never a gradient wash */
    const x = E(f, at, at + len, -420, PW + 120, IO);
    return (
      <Clip>
        <div style={{ position: "absolute", left: x, top: 0, width: 300, height: PH,
          background: POOL, transform: "skewX(-13deg)" }} />
        <div style={{ position: "absolute", left: x + 300, top: 0, width: 96, height: PH,
          background: BOARD_L, transform: "skewX(-13deg)" }} />
      </Clip>
    );
  }

  if (kind === "card") {
    /* the board turns over: a pick card wipes through the frame */
    const x = E(f, at, at + len, -PW - 60, PW + 60, IO);
    return (
      <Clip>
        <div style={{ position: "absolute", left: x, top: 0, width: PW + 40, height: PH,
          background: CARD, transform: "skewX(-8deg)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: PH / 2 - 52, height: 104,
            background: [PLUM, AMBER, GO][Math.floor(at / 37) % 3] }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: PH / 2 - 30, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52, letterSpacing: "0.24em",
            color: "#FFF8ED" }}>ON THE CLOCK</div>
        </div>
      </Clip>
    );
  }

  /* black — the house lights drop, top-down, then lift */
  const h = k < len / 2 ? E(f, at, at + len / 2, 0, PH, OUT) : E(f, at + len / 2, at + len, PH, 0, OUT);
  return (
    <Clip>
      <div style={{ position: "absolute", left: 0, top: 0, width: PW, height: h,
        background: NIGHT_D }} />
    </Clip>
  );
};
