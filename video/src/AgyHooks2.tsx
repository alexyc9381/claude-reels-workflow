import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
import {
  Surface, WORLDS, World, Occluder, Cone, StreetLamp, Claudie, CLAY, Contact,
  E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, W, H,
} from "./AgyWorld";

/* =========================================================================
   REEL 94 "AGENCY" · TWO MORE OPENS (E and F), for a wider trial set.

   The four already live:
     A ROLL-UP · reveal by removal   (a mass LEAVES the frame)
     B QUEUE   · depth + ignition    (a line ranks itself, then lights)
     C COACH   · arrival             (a mass ENTERS the frame)
     D LINEUP  · scale collapse      (a wall becomes a crew)

   So E and F have to be neither a departure, an arrival, a queue nor a wall:
     E THE LIFT   · RELEASE     — the frame SPLITS and what was behind it comes
                                  AT the lens. Doors part sideways; nothing
                                  travels in or out of frame edges.
     F THE CORNER · PROCESSION  — the crowd arrives from BEHIND the geometry,
                                  around a corner, with a banner at its head.

   Standing law both inherit:
     ⛔ TWO SHOTS, ONE CUT (Alex: stop flipping screens at the beginning).
     ⛔ The Claude mark BIG and early, and NEVER on the sprite's face — the box
        body IS the face, eyes at y70-96. Emblems go above or behind.
     ⛔ Frame 0 bright and SETTLED, and the mascot's blink phase offset so his
        eyes are OPEN on the one frame guaranteed to be seen.
     ⛔ ONE ORANGE. Every Claude is #D97757.
   ========================================================================= */

const HookScene: React.FC<{ w: World; children: React.ReactNode; bare?: boolean;
  stars?: boolean; overhead?: boolean; litFar?: number; push?: [number, number, number] }> =
  ({ w, children, bare, stars, overhead, litFar, push }) => {
  const f = useCurrentFrame();
  const sc = push ? E(f, push[0], push[1], 1, push[2], LIN) : 1;
  return (
    <AbsoluteFill>
      <Panel glow={hexA(w.key, 0.22)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `scale(${sc})` }}>
          {!bare && <Surface w={w} t={f} stars={stars} overhead={overhead} litFar={litFar} />}
          {children}
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 97, pointerEvents: "none",
          background: `radial-gradient(122% 92% at 50% 44%, transparent 40%, ${hexa("#05060B", 0.56)} 100%)` }} />
      </Panel>
    </AbsoluteFill>
  );
};

/** the emblem card both hooks carry, so the mark and the number land in the
    first second whichever cut a viewer is served. */
const Emblem: React.FC<{ x: number; y: number; s?: number; f: number; z?: number;
  line: string }> = ({ x, y, s = 1, f, z = 78, line }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 50%" }}>
    <div style={{ width: 392, borderRadius: 22, background: "#EDE7D6", border: "10px solid #B3A98F",
      boxShadow: SH_D, padding: "24px 26px 26px", textAlign: "center" }}>
      <div style={{ width: 128, height: 128, margin: "0 auto", borderRadius: 30,
        background: "#FFFFFF", border: "5px solid #E0D6BC", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 94, height: 94, objectFit: "contain",
            transform: `rotate(${f * 1.6}deg)` }} />
      </div>
      <div style={{ marginTop: 16, fontFamily: fraunces.fontFamily, fontWeight: 900,
        fontSize: 72, lineHeight: 1, color: "#241E12" }}>270 AGENTS</div>
      <div style={{ marginTop: 12, fontFamily: MONO, fontWeight: 900, fontSize: 25,
        letterSpacing: "0.20em", color: "#6E6450" }}>{line}</div>
    </div>
  </div>
);

/* ========================================================== VARIANT E ======
   THE LIFT · mechanism RELEASE.

   A's mass leaves upward and C's arrives from the side. This one does neither:
   the frame SPLITS down the middle and what was behind it comes straight at the
   lens. It is the only open of the six where the hero object opens rather than
   moves.
   --------------------------------------------------------------------------- */
export const HookLift: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = 40;
  const shot = f >= CUT ? 1 : 0;
  const lf = f - (shot ? CUT : 0);

  /* ---- A · 0.00-1.33s · the doors, the indicator counting down, then RELEASE. */
  if (shot === 0) {
    const open = E(lf, 18, 38, 0, 1, OUT);      // 0.60s — the house beat
    const floor = Math.max(1, 17 - Math.floor(lf / 1.1));
    return (
      <HookScene w={WORLDS.lobby} bare push={[0, 40, 1.09]}>
        {/* the lobby wall the lift is set into */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10,
          background: "linear-gradient(178deg,#4E4856 0%,#2A2632 100%)" }} />
        {/* a lit coffered ceiling, so the lobby has a source of its own */}
        {[60, 300, 540, 780].map((x) => (
          <React.Fragment key={"cl" + x}>
            <div style={{ position: "absolute", left: x, top: -6, width: 176, height: 46,
              borderRadius: "0 0 14px 14px", background: "#5E5868", zIndex: 13 }} />
            <div style={{ position: "absolute", left: x + 22, top: 24, width: 132, height: 16,
              borderRadius: 8, background: "#F4E0AE", zIndex: 14 }} />
          </React.Fragment>
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"pn" + i} style={{ position: "absolute", left: 8 + i * 146, top: 0, width: 3,
            height: 792, background: "#4A4654", zIndex: 11 }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 636, bottom: 0, zIndex: 12,
          background: "linear-gradient(184deg,#4A4654 0%,#28242E 100%)" }} />

        {/* the brass surround, the indicator, and the emblem above it */}
        <div style={{ position: "absolute", left: 156, top: 118, width: 700, height: 540,
          background: "linear-gradient(178deg,#C79A46 0%,#7C5D24 100%)", zIndex: 20,
          boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 336, top: 46, width: 340, height: 62,
          borderRadius: 10, background: "#1A1206", border: "5px solid #7C5D24", zIndex: 24,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ width: 20, height: 20, borderRadius: 11,
              background: 17 - i * 2 >= floor ? "#F2C463" : "#4A3A18" }} />
          ))}
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 27, color: "#F2C463",
            minWidth: 46 }}>{floor}</div>
        </div>

        {/* THE DOORS — they part sideways, and the mark is etched across them */}
        {[0, 1].map((i) => (
          <div key={i} style={{ position: "absolute",
            left: i ? 506 : 186, top: 148, width: 320, height: 484, zIndex: 30,
            transform: `translateX(${(i ? 1 : -1) * open * 322}px)`,
            background: i ? "linear-gradient(96deg,#C0A272 0%,#8A7048 100%)"
                          : "linear-gradient(96deg,#8A7048 0%,#C0A272 100%)",
            boxShadow: SH_D, overflow: "hidden" }}>
            {Array.from({ length: 9 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: 0, right: 0, top: 22 + k * 52,
                height: 3, background: "#6E5A38" }} />
            ))}
            {/* half the etched mark on each leaf */}
            <div style={{ position: "absolute", left: i ? -160 : 160, top: 148, width: 320,
              height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 268, height: 268, objectFit: "contain", opacity: 0.88 }} />
            </div>
          </div>
        ))}
        {/* what is behind them: the car, lit, filling with Claudes */}
        <div style={{ position: "absolute", left: 186, top: 148, width: 640, height: 484,
          background: "linear-gradient(178deg,#6E5A40 0%,#3A2E1E 100%)", zIndex: 22 }} />
        <div style={{ position: "absolute", left: 226, top: 176, width: 560, height: 34,
          borderRadius: 6, background: "#F0C979", zIndex: 23, opacity: 0.9 }} />
        {open > 0.04 && Array.from({ length: 6 }, (_, i) => {
          const p = E(lf, 22 + i * 2.4, 40, 0, 1, OUT);
          return (
            <Claudie key={"c" + i} x={286 + i * 92 + p * (i % 2 ? 210 : -190)}
              y={604 + p * 168} s={0.72 + p * 0.66} z={26 + i} f={f + i * 17} walk={1}
              costume={[{ glasses: 1 }, { suit: 1 }, { wizard: 1 }, { prof: 1 },
                        { constr: 1 }, { beard: 1 }][i]}
              prop={(["board", "roll", "mega", "case", "swatch", "screen"] as const)[i]}
              face={i % 2 ? 1 : -1} />
          );
        })}
        <Claudie x={86} y={782} s={1.42} z={62} f={f + 20} hero badge={1} />
        <Occluder side="r" c="#1E1A24" w={72} z={92} />
      </HookScene>
    );
  }

  /* ---- B · 1.33-2.77s · ONE cut to the lobby wide: they fan out to the floors. */
  return (
    <HookScene w={WORLDS.lobby} bare push={[40, 83, 1.12]}>
      <div style={{ position: "absolute", inset: 0, zIndex: 10,
        background: "linear-gradient(178deg,#3E3A46 0%,#211E28 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 596, bottom: 0, zIndex: 12,
        background: "linear-gradient(184deg,#4A4654 0%,#28242E 100%)" }} />
      {/* a rank of lift doors down the lobby, all open, all emptying */}
      {[26, 274, 522, 770].map((x, i) => (
        <React.Fragment key={x}>
          <div style={{ position: "absolute", left: x, top: 168, width: 216, height: 430,
            background: "linear-gradient(178deg,#C79A46 0%,#7C5D24 100%)", zIndex: 20 }} />
          <div style={{ position: "absolute", left: x + 18, top: 190, width: 180, height: 386,
            background: "linear-gradient(178deg,#6E5A40 0%,#3A2E1E 100%)", zIndex: 21 }} />
          <div style={{ position: "absolute", left: x + 34, top: 208, width: 148, height: 22,
            borderRadius: 5, background: "#F0C979", zIndex: 22 }} />
          <div style={{ position: "absolute", left: x + 40, top: 120, width: 136, height: 40,
            borderRadius: 8, background: "#1A1206", border: "4px solid #7C5D24", zIndex: 24,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 17, letterSpacing: "0.10em",
            color: "#F2C463" }}>
            {["ENGINEERING", "DESIGN", "MARKETING", "SECURITY"][i]}
          </div>
        </React.Fragment>
      ))}
      {Array.from({ length: 10 }, (_, i) => {
        const t0 = 1 + i * 2.6;
        const p = E(lf, t0, t0 + 28, 0, 1, LIN);
        if (p <= 0) return null;
        return (
          <Claudie key={"o" + i} x={120 + i * 92 + p * (i % 2 ? 150 : -130)}
            y={628 + p * 170} s={0.66 + p * 0.72} z={40 + i} f={f + i * 13} walk={1}
            costume={[{ glasses: 1 }, { suit: 1 }, { wizard: 1 }, { prof: 1 }][i % 4]}
            prop={(["board", "roll", "mega", "case"] as const)[i % 4]}
            face={i % 2 ? 1 : -1} />
        );
      })}
      <Emblem x={310} y={40} s={0.86} f={f} z={80} line="ONE FREE REPO" />
      <Occluder side="l" c="#1E1A24" w={66} z={92} kind="pole" />
    </HookScene>
  );
};

/* ========================================================== VARIANT F ======
   THE CORNER · mechanism PROCESSION.

   Nobody arrives from a frame edge and nothing opens. The crowd comes from
   BEHIND THE GEOMETRY — around the corner of a building that has been in shot
   since frame 0 — headed by a banner. The reveal is a place you could already
   see turning out to have had something behind it.
   --------------------------------------------------------------------------- */
export const HookParade: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = 40;
  const shot = f >= CUT ? 1 : 0;
  const lf = f - (shot ? CUT : 0);

  if (shot === 0) {
    const turn = E(lf, 18, 40, 0, 1, OUT);
    return (
      <HookScene w={WORLDS.corner} litFar={0.20} push={[0, 40, 1.08]}>
        {/* the corner building, in shot from frame 0 — the crowd is behind IT */}
        <div style={{ position: "absolute", left: 470, top: -30, width: 620, height: 690,
          background: "linear-gradient(96deg,#43324E 0%,#241A2E 100%)", zIndex: 40,
          boxShadow: "-30px 0 52px rgba(8,6,14,0.5)" }} />
        {Array.from({ length: 5 * 6 }, (_, i) => {
          const cx = i % 5, cy = Math.floor(i / 5);
          const q = Math.sin(i * 23.7) * 4371.7;
          return (
            <div key={"cw" + i} style={{ position: "absolute", left: 508 + cx * 108,
              top: 20 + cy * 92, width: 72, height: 40, zIndex: 41,
              background: (q - Math.floor(q)) < 0.56 ? "#F0C782" : "#2E2238" }} />
          );
        })}
        {/* the corner lamp and the one who is waiting under it */}
        <StreetLamp x={140} y={716} h={380} c="#F2D6AE" z={86} />
        <Cone f={f} x={238} y={344} top={80} bot={380} len={420} c="#F2D6AE" o={0.30} z={20} />
        {/* a lit shopfront on the near side — the second source, and it fills the
            left third that was reading as flat violet */}
        <div style={{ position: "absolute", left: -30, top: 268, width: 300, height: 330,
          background: "linear-gradient(178deg,#4A3A5C 0%,#2A2038 100%)", zIndex: 24 }} />
        <div style={{ position: "absolute", left: -10, top: 330, width: 250, height: 150,
          background: "#E9CE96", border: "8px solid #251B32", zIndex: 25 }} />
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"sf" + i} style={{ position: "absolute", left: 10 + i * 58, top: 356,
            width: 40, height: 96, background: "#B9945C", zIndex: 26 }} />
        ))}
        <div style={{ position: "absolute", left: -20, top: 262, width: 270, height: 26,
          borderRadius: 6, background: "#8E6A3E", zIndex: 26 }} />
        <Claudie x={244} y={758} s={1.52} z={62} f={f + 20} hero badge={1}
          prop="board" propC="#E7B24C" />
        <Contact x={182} y={752} w={148} z={20} o={0.30} />

        {/* THE HEAD OF THE COLUMN, turning the corner behind the building */}
        {turn > 0.02 && (<>
          <div style={{ position: "absolute", left: 470 - turn * 250, top: 300 - turn * 20,
            width: 300, height: 96, borderRadius: 8, background: "#EDE7D6",
            border: "8px solid #B3A98F", zIndex: 44, boxShadow: SH_D,
            display: "flex", alignItems: "center", gap: 14, paddingLeft: 16,
            opacity: Math.min(1, turn * 2) }}>
            <div style={{ width: 58, height: 58, borderRadius: 14, background: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 42, height: 42, objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34,
              color: "#241E12" }}>270 AGENTS</div>
          </div>
          {Array.from({ length: 5 }, (_, i) => {
            const p = E(lf, 20 + i * 3, 44 + i * 3, 0, 1, LIN);
            if (p <= 0) return null;
            return (
              <Claudie key={"p" + i} x={520 - p * (210 + i * 46)} y={700 + i * 12}
                s={0.86 + p * 0.30} z={42 - i} f={f + i * 15} walk={1}
                costume={[{ suit: 1 }, { wizard: 1 }, { glasses: 1 }, { prof: 1 },
                          { beard: 1 }][i]}
                prop={(["roll", "mega", "swatch", "case", "board"] as const)[i]} />
            );
          })}
        </>)}
      </HookScene>
    );
  }

  /* ---- B · ONE cut: the column fills the street, straight past the lens. */
  return (
    <HookScene w={WORLDS.corner} litFar={0.26} push={[40, 83, 1.13]}>
      {[80, 400, 720].map((x, i) => (
        <StreetLamp key={x} x={x} y={700 - i * 14} h={330 - i * 30} c="#E9C6A2" z={26} />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const t0 = i * 2.2;
        const p = E(lf, t0, t0 + 30, 0, 1, LIN);
        if (p <= 0 || p >= 1) return null;
        const row = i % 3;
        return (
          <Claudie key={"m" + i} x={980 - p * 1060 + row * 40}
            y={640 + row * 58 + p * 92} s={0.62 + p * 0.72 + row * 0.06}
            z={40 + i + row * 5} f={f + i * 11} walk={1}
            costume={[{ suit: 1 }, { wizard: 1 }, { glasses: 1 }, { prof: 1 }][i % 4]}
            prop={(["roll", "mega", "swatch", "case"] as const)[i % 4]} />
        );
      })}
      <Emblem x={296} y={54} s={0.90} f={f} z={80} line="ALL 17 DIVISIONS" />
      <Occluder side="r" c="#241A2E" w={78} z={92} />
    </HookScene>
  );
};
