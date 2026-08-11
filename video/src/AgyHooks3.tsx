import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
import {
  Surface, WORLDS, World, Occluder, Cone, StreetLamp, Claudie, CLAY, Contact,
  E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D,
} from "./AgyWorld";

/* =========================================================================
   REEL 94 "AGENCY" · ROUND 8 — TWO REPOST OPENS, G and H.

   ⭐⭐ WHY THESE TWO EXIST, AND WHY THEY LOOK THE WAY THEY DO.

   Six cuts went out. A (ROLL-UP, the main post) and B (QUEUE) performed; C, D,
   E and F did not. I measured the delivered MP4s rather than guessing, on the
   PANEL RECT only (the cream chassis outside it is identical in all six and
   would dilute anything computed full-frame), and the separator is not what the
   build notes assumed:

     cut                f0 luma   f0 cream%   LARGEST CREAM PLATE @ f0
     A ROLL-UP  WON      150.4      42.84     32.66%   819 x 393  at y 142..535
     B QUEUE    WON      105.2      26.48     18.15%   429 x 411  at y 161..572
     C COACH    lost      74.9      13.26      7.73%   829 x 105  at y   0..105
     D SHADOW   lost     110.2      11.97      8.38%   891 x 105  at y   0..105
     E LIFT     lost     110.7       9.66      8.96%   859 x 105  at y   0..105
     F CORNER   lost      83.5      11.19      8.81%   930 x 105  at y   0..105

   ⛔⛔ READ THE LOSERS' PLATE BOX. 830-930 wide by 105 tall, sitting at panel-
   local y 0..105 — that is the `HookHeader` PILL. In all four losing cuts the
   brightest readable object in the opening frame is the shared chassis furniture
   that appears on every reel on the account. They open with NO CLAIM PLATE OF
   THEIR OWN. A and B both open with a purpose-built cream plate in the middle
   third, in the eye's landing zone, carrying the official mark on a white tile
   and the number in 74-88px Fraunces.

   ⛔ AND NOTE WHAT DID *NOT* SEPARATE THEM, because it is where the effort would
   naturally have gone:
     · MOTION did not. E had the HIGHEST hook motion of all six (8.27) and lost.
     · LUMA did not. D (110.2) and E (110.7) both out-lit the winner B (105.2).
     · The MECHANISM did not. The two winners use opposite mechanisms (a mass
       leaving vs a line lighting) and the four losers use four more.
   So the brief for G and H is NOT "more movement" and NOT "brighter". It is:
   put the biggest readable claim plate you can in the middle of frame 0, and
   then make the world around it share no geometry with A or B.

   THE MECHANISMS. Six are used up — removal (A), ignition (B), arrival (C),
   scale collapse (D), release (E), procession (F). G and H are the two that are
   left, and both happen to be CREAM-NATIVE, which is the whole point:
     G  THE PRESS · MULTIPLICATION — one sheet becomes 270. Nothing enters or
        leaves the frame; the subject itself replicates.
     H  THE BOARD · RESOLUTION     — nothing moves through space at all; the
        INFORMATION resolves in place, scrambled to exact.

   Inherited law, unchanged:
     ⛔ THREE shots, hard cuts, camera locked in each, but each shot carries a
        WHOLE BEAT (0.87 / 0.93 / 0.97s). Reel 95's "stop flipping between
        screens" was earned by shots of 0.73/0.90/1.20 — the resolved rule is
        *fewer cuts with more inside each*, not *two cuts*, and both cuts that
        performed here are three-shot opens.
     ⛔ ONE ORANGE. Every Claude is #D97757; hierarchy is size, position, light.
     ⛔ The mark NEVER on the sprite's face — the box body IS the face.
     ⛔ Matte: solid rays and solid rings, never `boxShadow: 0 0 Npx <colour>`.
     ⛔ Frame 0 SETTLED but not INERT — in G the platen is already descending at
        constant velocity, in H the flaps are already clattering, because a
        board's and a press's rest state IS motion.
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

/* ⭐ THE HALO, factored out, because it is the one thing every hook that has ever
   performed on this account puts on the mark. SOLID rotating rays plus SOLID
   expanding rings — [[feedback_reel_matte_palette]] bans coloured bloom outright.
   ⛔ The pivot must BE the tile centre: a zero-size wrapper at the centre with
   the ray offset outward cannot get this wrong, which a `transformOrigin` offset
   demonstrably can (round 5 swept the halo across the headline). */
const Halo: React.FC<{ f: number; cx: number; cy: number; r: number; n?: number;
  c?: string }> = ({ f, cx, cy, r, n = 20, c = "#E0BE96" }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const len = r * 0.26 + Math.sin(f / 6.5 + i * 1.15) * r * 0.09;
    return (
      <div key={"ry" + i} style={{ position: "absolute", left: cx, top: cy, width: 0, height: 0,
        transform: `rotate(${i * (360 / n) + f * 1.1}deg)` }}>
        <div style={{ position: "absolute", left: -r * 0.04, top: -(r + len), width: r * 0.08,
          height: len, borderRadius: 4, background: c }} />
      </div>
    );
  })}
  {[0, 1, 2].map((i) => {
    const ph = ((f + i * 15) % 45) / 45;
    const d = r * 2.05 + ph * r * 1.15;
    return (
      <div key={"rg" + i} style={{ position: "absolute", left: cx - d / 2, top: cy - d / 2,
        width: d, height: d, borderRadius: "50%",
        border: `${Math.max(1, 6 - ph * 5)}px solid #D9BC9C`, opacity: 0.8 - ph * 0.8 }} />
    );
  })}
</>);

/** the official mark on its white tile. ⛔ THE REAL PNG, never a drawn glyph —
    variant E painted a flat Claude decal on its shutter and it is one of the
    four that did not perform. Recognition is the audience filter. */
const Mark: React.FC<{ x: number; y: number; d: number; f: number; z?: number;
  spin?: boolean }> = ({ x, y, d, f, z = 44, spin = true }) => (
  <div style={{ position: "absolute", left: x, top: y, width: d, height: d, zIndex: z,
    borderRadius: d * 0.22, background: "#FFFFFF", border: `${d * 0.03}px solid #E8DCC0`,
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH,
    transform: `scale(${1 + Math.sin(f / 9) * 0.04})` }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ width: d * 0.72, height: d * 0.72, objectFit: "contain",
        transform: spin ? `rotate(${f * 1.7}deg)` : undefined }} />
  </div>
);

/* =========================================================== VARIANT G =====
   THE PRESS · mechanism MULTIPLICATION.

   The mapping table (docs/THE-OPEN.md — every row must fill in or the element is
   decoration):
     | on screen                        | what it actually is                  |
     | the cream master sheet, 270 AGENTS | the repo                           |
     | the platen coming down            | the one click                       |
     | 270 sheets erupting out of it     | 270 .md files landing in ~/.claude  |
     | each sheet standing up as a Claude| each file IS a named specialist     |
     | the MIT chop in the corner        | why you may sell the work           |

   Frame 0 is the press bed at close range: an 828 x 400 cream sheet — 41% of the
   panel — with a 168px mark on white at its head. That is deliberately ABOVE A's
   32.66%, because A is the cut that performed best of the six.
   -------------------------------------------------------------------------- */
export const HookPress: React.FC = () => {
  const f = useCurrentFrame();
  const w = WORLDS.press;
  const CUT = [0, 26, 54];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* the flywheel and the ink rollers turn in EVERY shot, off the root frame, so
     the machine is one continuous object across two hard cuts. */
  const Flywheel: React.FC<{ x: number; y: number; r: number; z?: number }> =
    ({ x, y, r, z = 26 }) => (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
      zIndex: z, borderRadius: "50%", background: "#2A2530", border: "14px solid #3E3846",
      transform: `rotate(${f * 3.4}deg)` }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: r - 7, top: 0, width: 14,
          height: r * 2, background: "#372F3E", transformOrigin: "50% 50%",
          transform: `rotate(${i * 30}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: r - 26, top: r - 26, width: 52, height: 52,
        borderRadius: "50%", background: "#544A5E" }} />
    </div>
  );

  /* ---- A · 0.00-0.87s · CLOSE ON THE BED. The sheet is the whole frame and it
     already says everything; the platen above it is the clock. */
  if (shot === 0) {
    /* ⛔ SETTLED IS NOT INERT (round 3). The platen descends at CONSTANT velocity
       from frame 0 — the machine was already running when we cut in, which is
       both the motion and the reason the next shot happens. */
    const drop = E(lf, 0, 26, 96, 152, LIN);
    return (
      <HookScene w={w} bare push={[0, 26, 1.07]}>
        {/* the bed of the press: iron rails and a dark deck */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "#231F2A" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 596, bottom: 0, zIndex: 14,
          background: "linear-gradient(184deg,#3A3442 0%,#242029 100%)" }} />
        {[0, 1].map((i) => (
          <div key={"rail" + i} style={{ position: "absolute", left: i ? 946 : -12, top: 96,
            width: 78, height: 620, zIndex: 16, background: "#332E3C",
            borderLeft: "8px solid #453E51", borderRight: "8px solid #1F1B26" }} />
        ))}
        {/* the ink rollers, turning. The banding IS the rotation. */}
        {[[34, 640], [946, 640]].map(([rx, ry], i) => (
          <div key={"rol" + i} style={{ position: "absolute", left: rx - 44, top: ry - 44,
            width: 88, height: 88, borderRadius: "50%", background: "#1C1822", zIndex: 30,
            overflow: "hidden", border: "6px solid #4A4356" }}>
            {Array.from({ length: 4 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: 0, right: 0,
                top: ((k * 22 + f * 3) % 88), height: 9, background: "#6A6178" }} />
            ))}
          </div>
        ))}

        {/* ⭐⭐ THE MASTER SHEET — the whole finding, as one object. 828 x 400 of
            cream in the middle third, the mark on white at its head, the number
            in 88px Fraunces. This is the frame a viewer decides on. */}
        <div style={{ position: "absolute", left: 92, top: 150, width: 828, height: 400,
          zIndex: 40 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#EFE9D9",
            border: "10px solid #CFC5A8", boxShadow: SH_D }} />
          {/* the guide crosses a real press bed has at its corners */}
          {[[26, 26], [26, 336], [762, 26], [762, 336]].map(([gx, gy], i) => (
            <React.Fragment key={"gx" + i}>
              <div style={{ position: "absolute", left: gx, top: gy + 18, width: 40, height: 3,
                background: "#B9AE90" }} />
              <div style={{ position: "absolute", left: gx + 18, top: gy, width: 3, height: 40,
                background: "#B9AE90" }} />
            </React.Fragment>
          ))}
          <Halo f={f} cx={190} cy={132} r={104} n={20} />
          <Mark x={190 - 84} y={132 - 84} d={168} f={f} z={44} />
          <div style={{ position: "absolute", left: 300, top: 52, right: 40,
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, lineHeight: 1,
            color: "#241E12" }}>270</div>
          <div style={{ position: "absolute", left: 300, top: 142, right: 40,
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, lineHeight: 1,
            color: "#241E12" }}>AGENTS</div>
          <div style={{ position: "absolute", left: 302, top: 232, right: 40, fontFamily: MONO,
            fontWeight: 900, fontSize: 26, letterSpacing: "0.20em", color: "#6E6450" }}>
            17 DIVISIONS
          </div>
          {/* the chop, inked at an angle the way a real one lands */}
          <div style={{ position: "absolute", left: 596, top: 268, width: 176, height: 92,
            borderRadius: 8, border: "7px solid #A6483A", transform: "rotate(-7deg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 34, letterSpacing: "0.14em",
            color: "#A6483A" }}>MIT</div>
          {/* the type rule under the head, so the sheet reads as SET type */}
          <div style={{ position: "absolute", left: 300, top: 292, width: 268, height: 5,
            background: "#B9AE90" }} />
        </div>

        {/* THE PLATEN, coming down. Dark, heavy, and the only thing in the frame
            that is going somewhere. */}
        <div style={{ position: "absolute", left: 62, top: drop - 232, width: 888, height: 232,
          zIndex: 52, borderRadius: "0 0 12px 12px",
          background: "linear-gradient(178deg,#4A4356 0%,#2B2634 100%)",
          boxShadow: "0 26px 44px rgba(8,6,12,0.52)" }}>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={"bolt" + i} style={{ position: "absolute", left: 54 + i * 128, top: 40,
              width: 30, height: 30, borderRadius: 15, background: "#6A6178" }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 16,
            background: "#151220" }} />
        </div>
        {/* the two screw columns it rides down */}
        {[150, 830].map((sx) => (
          <div key={"sc" + sx} style={{ position: "absolute", left: sx, top: 0,
            width: 34, height: drop - 216, zIndex: 50, background: "#3A3444" }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0,
                top: ((i * 26 + f * 2.2) % Math.max(40, drop - 216)), height: 8,
                background: "#544C62" }} />
            ))}
          </div>
        ))}

        <Flywheel x={-40} y={452} r={168} z={26} />
        <Cone f={f} x={250} y={-52} top={130} bot={560} len={560} c="#F4E3BE" o={0.2} z={20} />
        <Claudie x={214} y={946} s={1.86} z={62} f={f} hero costume={{ beard: 1 }} />
        {/* paper dust off the stock, all through the shot */}
        {Array.from({ length: 15 }, (_, i) => {
          const r = (k: number) => { const v = Math.sin(i * 39.7 + k * 8.3) * 4371.7; return v - Math.floor(v); };
          const k = lf - i * 1.3;
          if (k < 0) return null;
          return (
            <div key={"ds" + i} style={{ position: "absolute", left: 110 + r(1) * 800,
              top: 560 + ((k * (2.1 + r(2) * 3.2)) % 220), width: 4 + (i % 2) * 2, height: 4,
              background: "#CFC5A8", opacity: 0.66, zIndex: 56 }} />
          );
        })}
      </HookScene>
    );
  }

  /* ---- B · 0.87-1.80s · THE WIDE. It hits, and one sheet becomes a fan.
     ⛔ The impact lands at lf=2, two frames INSIDE the shot rather than on the
     cut, so the cut and the slam are two events instead of one — a cut that
     coincides exactly with its own payoff spends both at once. */
  if (shot === 1) {
    const hit = Math.max(0, 1 - Math.abs(lf - 2) / 3);          // the squash
    const spray = E(lf, 3, 28, 0, 1, OUT);
    const count = Math.round(270 * E(lf, 3, 27, 0, 1, OUT));
    return (
      <HookScene w={w} litFar={0.18} push={[0, 28, 1.06]}>
        {/* the shopfront, roller door up, the press lit from inside */}
        <div style={{ position: "absolute", left: 108, top: 116, width: 800, height: 470,
          zIndex: 20, background: "#241F2C", border: "12px solid #3C3546", borderRadius: 8 }} />
        <div style={{ position: "absolute", left: 132, top: 140, width: 752, height: 300,
          zIndex: 21, background: "linear-gradient(178deg,#6E6248 0%,#4A4132 100%)" }} />
        {/* the press body, squashing on the strike */}
        <div style={{ position: "absolute", left: 268, top: 214, width: 470, height: 300,
          zIndex: 30, transformOrigin: "50% 100%", transform: `scaleY(${1 - hit * 0.035})`,
          background: "linear-gradient(178deg,#443D50 0%,#282332 100%)", borderRadius: 10,
          boxShadow: SH_D }}>
          <div style={{ position: "absolute", left: 40, top: 34, right: 40, height: 74,
            background: "#1A1622", borderRadius: 6 }} />
          <div style={{ position: "absolute", left: 62, top: 152, right: 62, height: 108,
            background: "#EFE9D9", borderRadius: 4 }} />
          <Mark x={196} y={54} d={78} f={f} z={34} />
        </div>
        <Flywheel x={228} y={430} r={92} z={31} />
        {/* ⭐ THE FAN. 30 sheets is the readable count; 270 drawn rects is mush
            and the number is carried by the tally instead. Each is a real arc
            with its own rotation, so no two travel the same line. */}
        {Array.from({ length: 30 }, (_, i) => {
          const r = (k: number) => { const v = Math.sin(i * 47.9 + k * 6.1) * 4371.7; return v - Math.floor(v); };
          const p = Math.max(0, Math.min(1, spray * 1.35 - i * 0.018));
          if (p <= 0) return null;
          const ang = -1.35 + (i / 30) * 2.7 + (r(3) - 0.5) * 0.22;
          const dist = (330 + r(1) * 340) * p;
          const x = 502 + Math.sin(ang) * dist;
          const y = 372 - Math.cos(ang) * dist * 0.62 + p * p * 260;
          return (
            <div key={"sh" + i} style={{ position: "absolute", left: x - 46, top: y - 30,
              width: 92, height: 60, zIndex: 60 + (i % 5), borderRadius: 4,
              background: "#EFE9D9", border: "3px solid #CFC5A8", boxShadow: SH,
              transform: `rotate(${(r(2) - 0.5) * 90 + p * 210}deg)` }}>
              <div style={{ position: "absolute", left: 9, top: 9, width: 18, height: 18,
                borderRadius: 5, background: CLAY }} />
              <div style={{ position: "absolute", left: 34, top: 14, right: 9, height: 5,
                background: "#B9AE90" }} />
              <div style={{ position: "absolute", left: 9, top: 34, right: 9, height: 5,
                background: "#DCD3B8" }} />
            </div>
          );
        })}
        {/* the tally, on cream, so the claim plate never leaves the frame */}
        <div style={{ position: "absolute", left: 44, top: 570, width: 336, zIndex: 84,
          borderRadius: 18, background: "#EDE7D6", border: "9px solid #B3A98F",
          boxShadow: SH_D, padding: "14px 0 18px", textAlign: "center" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 106,
            lineHeight: 1, color: "#241E12" }}>{count}</div>
          <div style={{ marginTop: 6, fontFamily: MONO, fontWeight: 900, fontSize: 23,
            letterSpacing: "0.20em", color: "#6E6450" }}>SPECIALISTS</div>
        </div>
        <Claudie x={856} y={790} s={1.54} z={62} f={f} hero costume={{ beard: 1 }} face={-1} />
        <Contact x={790} y={780} w={166} z={61} o={0.32} />
        <Occluder side="l" c="#1E1A26" w={72} z={92} kind="pole" />
      </HookScene>
    );
  }

  /* ---- C · 1.80-2.77s · the sheets have STOOD UP. Each one is a specialist and
     each one is walking out with its own copy. */
  return (
    <HookScene w={w} litFar={0.26} push={[0, 29, 1.08]}>
      {/* the shop behind them, still lit, still printing */}
      <div style={{ position: "absolute", left: 296, top: 128, width: 420, height: 300,
        zIndex: 20, background: "#241F2C", border: "10px solid #3C3546", borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 316, top: 148, width: 380, height: 210,
        zIndex: 21, background: "linear-gradient(178deg,#6E6248 0%,#4A4132 100%)" }} />
      {/* the fascia plate over the door — the claim survives into shot three */}
      <div style={{ position: "absolute", left: 262, top: 42, width: 490, zIndex: 78,
        borderRadius: 16, background: "#EDE7D6", border: "9px solid #B3A98F", boxShadow: SH_D,
        padding: "16px 20px", display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ position: "relative", width: 92, height: 92, flex: "0 0 auto" }}>
          <Mark x={0} y={0} d={92} f={f} z={80} />
        </div>
        <div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56,
            lineHeight: 1, color: "#241E12" }}>270 AGENTS</div>
          <div style={{ marginTop: 7, fontFamily: MONO, fontWeight: 900, fontSize: 22,
            letterSpacing: "0.20em", color: "#6E6450" }}>17 DIVISIONS · MIT</div>
        </div>
      </div>
      {/* ⛔ they GROW across the shot. A crew that arrives and holds is the note
          this reel has already been given twice; the walk is the arc. */}
      {Array.from({ length: 9 }, (_, i) => {
        const p = i / 9;
        const g = E(lf, 0, 29, 1, 1.15, LIN);
        return (
          <Claudie key={"c" + i} x={62 + p * 900} y={(700 + (i % 3) * 44) * g}
            s={(0.96 + (i % 3) * 0.2) * g} z={40 + (i % 3) * 6} f={f + i * 13} walk={1}
            tint={CLAY} face={i % 2 ? -1 : 1}
            costume={[{ glasses: 1 }, { suit: 1 }, { wizard: 1 }, { prof: 1 }, { beard: 1 }][i % 5]}
            prop={(["board", "roll", "swatch", "case"] as const)[i % 4]} />
        );
      })}
      {/* the stack they came off, on the pavement */}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: 782 + (i % 3) * 4,
          top: 640 - i * 9, width: 150, height: 14, borderRadius: 3, background: "#EFE9D9",
          border: "2px solid #CFC5A8", zIndex: 36 }} />
      ))}
      <StreetLamp x={128} y={666} h={392} c="#F4E3BE" z={24} />
      <Cone f={f} x={222} y={244} top={84} bot={370} len={400} c="#F4E3BE" o={0.22} z={20} />
      <Occluder side="r" c="#1E1A26" w={84} z={92} />
    </HookScene>
  );
};

/* =========================================================== VARIANT H =====
   THE BOARD · mechanism RESOLUTION.

   Nothing travels. The frame is a call board and what changes is the
   INFORMATION on it: scrambled to exact, front to back, in a wave.

     | on screen                        | what it actually is                  |
     | the engraved head plate, 270 AGENTS | the repo's headline claim         |
     | four rows of flaps, clattering   | you do not know what is in there yet |
     | each row locking to a real division | the 17 division tables            |
     | the counts that land: 58, 36, 21 | the real per-division agent counts   |
     | the crew walking out under it    | you now have them                    |

   ⛔ THE HEAD PLATE IS ONE SOLID CREAM SLAB, NOT FLAPS. Flaps have gaps between
      them, and gaps break the plate into 40 disconnected pieces — the largest
      CONTIGUOUS cream region is what the eye and the measurement both see, and
      a board made entirely of tiles would score like the four losers while
      looking busy. The headline is engraved; the ROSTER is what resolves.
   -------------------------------------------------------------------------- */

/** one cream flap cell mid-roll. ⛔ The cell is never simply swapped — a swap has
    no frames in it, and both the audit and the eye can see that. */
const GLY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
const Cell: React.FC<{ ch: string; k: number; s?: number; delay?: number; lock: boolean }> =
  ({ ch, k, s = 1, delay = 0, lock }) => {
  const target = Math.max(0, GLY.indexOf(ch));
  const spin = E(k - delay, 0, 22, 0, target + GLY.length * 3, IO);
  const idx = Math.floor(spin) % GLY.length;
  const frac = spin - Math.floor(spin);
  const settled = lock && k - delay >= 22;
  const shown = settled ? ch : GLY[idx];
  const next = settled ? ch : GLY[(idx + 1) % GLY.length];
  const ww = 44 * s, hh = 62 * s;
  return (
    <div style={{ position: "relative", width: ww, height: hh, borderRadius: 3 * s,
      background: "#EFE9D9", overflow: "hidden", border: `${2 * s}px solid #CFC5A8`,
      boxShadow: "0 3px 7px rgba(14,12,18,0.34)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh / 2,
        overflow: "hidden", transform: `scaleY(${settled ? 1 : 1 - frac})`,
        transformOrigin: "50% 100%", background: "#F4EFE1" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh,
          textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 40 * s,
          lineHeight: `${hh}px`, color: "#241E12" }}>{shown}</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hh / 2,
        overflow: "hidden", background: "#E8E1CE" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hh,
          textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 40 * s,
          lineHeight: `${hh}px`, color: "#241E12" }}>{settled ? ch : next}</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: hh / 2 - 1, height: 2,
        background: "#B9AE90" }} />
    </div>
  );
};

const Row: React.FC<{ x: number; y: number; label: string; num: string; k: number;
  s?: number; z?: number; lock: boolean }> =
  ({ x, y, label, num, k, s = 1, z = 40, lock }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 6 * s }}>
    {label.padEnd(11, " ").split("").map((ch, i) => (
      <Cell key={"l" + i} ch={ch} k={k} s={s} delay={i * 1.6} lock={lock} />
    ))}
    <div style={{ width: 14 * s }} />
    {num.padStart(2, " ").split("").map((ch, i) => (
      <Cell key={"n" + i} ch={ch} k={k} s={s} delay={(11 + i) * 1.6} lock={lock} />
    ))}
  </div>
);

/* ✅ every row below is a REAL division and its REAL row count, read off
   github.com/msitarzewski/agency-agents: Engineering 58 · Marketing 36 ·
   Game Dev 21 · Security 12 · Design 10. Nothing on this board is invented. */
const ROWS: [string, string][] = [
  ["ENGINEERING", "58"], ["MARKETING", "36"], ["GAME DEV", "21"],
  ["SECURITY", "12"], ["DESIGN", "10"],
];

export const HookBoard: React.FC = () => {
  const f = useCurrentFrame();
  const w = WORLDS.board;
  const CUT = [0, 26, 54];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /** the head plate. ⛔ ONE contiguous slab — see the note above. */
  const Head: React.FC<{ x: number; y: number; ww: number; hh: number; s: number; z?: number }> =
    ({ x, y, ww, hh, s, z = 70 }) => (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      borderRadius: 16 * s, background: "#EFE9D9", border: `${10 * s}px solid #B3A98F`,
      boxShadow: SH_D }}>
      <Halo f={f} cx={104 * s + 14} cy={hh / 2} r={78 * s} n={18} />
      <Mark x={104 * s + 14 - 66 * s} y={hh / 2 - 66 * s} d={132 * s} f={f} z={z + 2} />
      <div style={{ position: "absolute", left: 210 * s, top: hh / 2 - 74 * s,
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92 * s, lineHeight: 1,
        color: "#241E12" }}>270</div>
      <div style={{ position: "absolute", left: 210 * s, top: hh / 2 + 8 * s,
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62 * s, lineHeight: 1,
        color: "#241E12" }}>AGENTS</div>
      <div style={{ position: "absolute", right: 26 * s, top: hh / 2 - 52 * s, textAlign: "right",
        fontFamily: MONO, fontWeight: 900, fontSize: 24 * s, letterSpacing: "0.18em",
        color: "#6E6450" }}>THE AGENCY</div>
      <div style={{ position: "absolute", right: 26 * s, top: hh / 2 - 16 * s, textAlign: "right",
        fontFamily: MONO, fontWeight: 900, fontSize: 24 * s, letterSpacing: "0.18em",
        color: "#6E6450" }}>17 DIVISIONS</div>
      <div style={{ position: "absolute", right: 26 * s, top: hh / 2 + 20 * s,
        fontFamily: MONO, fontWeight: 900, fontSize: 24 * s, letterSpacing: "0.18em",
        color: "#A6483A" }}>MIT · FREE</div>
    </div>
  );

  /* ---- A · 0.00-0.87s · CLOSE ON THE BOARD. The head plate already reads; the
     roster underneath is still spinning, which is a board's REST STATE. */
  if (shot === 0) {
    return (
      <HookScene w={w} bare push={[0, 26, 1.06]}>
        {/* the carcass */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "#14211F" }} />
        <div style={{ position: "absolute", left: 40, top: 120, width: 932, height: 620,
          zIndex: 16, borderRadius: 14, background: "#1C2C29",
          border: "14px solid #2E4A45", boxShadow: SH_D }} />
        {/* the two lamps that make it the only lit thing here */}
        {[236, 776].map((lx) => (
          <React.Fragment key={lx}>
            <div style={{ position: "absolute", left: lx - 54, top: 62, width: 108, height: 26,
              borderRadius: "13px 13px 0 0", background: "#CFE8DA", zIndex: 24 }} />
            <Cone f={f} x={lx} y={88} top={70} bot={300} len={330} c="#CFE8DA" o={0.16} z={18} />
          </React.Fragment>
        ))}

        <Head x={74} y={138} ww={866} hh={268} s={1} z={70} />

        {/* the roster, clattering. NOT locked in this shot. */}
        {ROWS.slice(0, 3).map(([lb, nm], i) => (
          <Row key={lb} x={92} y={432 + i * 82} label={lb} num={nm} k={f + i * 7} s={1}
            z={40} lock={false} />
        ))}
        <Claudie x={862} y={860} s={1.66} z={62} f={f} hero costume={{ suit: 1 }} face={-1}
          prop="board" />
      </HookScene>
    );
  }

  /* ---- B · 0.87-1.80s · THE WIDE, AND THE LOCK RUNS DOWN THE BOARD.
     ⛔ This is a TRAVELLING event, like variant B's ignition, but what travels is
        INFORMATION rather than light — no lamp strikes, no object moves. It had
        to be different from B in kind, because B is one of the two already up. */
  if (shot === 1) {
    return (
      <HookScene w={w} litFar={0.20} push={[0, 28, 1.07]}>
        <div style={{ position: "absolute", left: 148, top: 96, width: 736, height: 470,
          zIndex: 20, borderRadius: 12, background: "#1C2C29", border: "12px solid #2E4A45",
          boxShadow: SH_D }} />
        <Head x={172} y={120} ww={688} hh={150} s={0.56} z={70} />
        {ROWS.map(([lb, nm], i) => (
          <Row key={lb} x={188} y={288 + i * 54} label={lb} num={nm} k={lf} s={0.62}
            z={40} lock={lf >= 4 + i * 5} />
        ))}
        {/* the awning it hangs under, and the crowd that came to read it */}
        <div style={{ position: "absolute", left: 96, top: 52, width: 840, height: 30,
          zIndex: 26, borderRadius: 6, background: "#2E4A45" }} />
        {Array.from({ length: 8 }, (_, i) => {
          const p = i / 8;
          return (
            <Claudie key={"w" + i} x={78 + p * 880} y={742 + (i % 2) * 22}
              s={0.78 + (i % 3) * 0.1} z={38 + (i % 3)} f={f + i * 15} tint={CLAY}
              costume={[{ glasses: 1 }, { prof: 1 }, { wizard: 1 }, { girl: 1 }][i % 4]} />
          );
        })}
        <Claudie x={880} y={880} s={1.74} z={62} f={f} hero costume={{ suit: 1 }} face={-1} />
        <StreetLamp x={62} y={700} h={360} c="#CFE8DA" z={24} />
        <Occluder side="l" c="#0F1A18" w={70} z={92} />
      </HookScene>
    );
  }

  /* ---- C · 1.80-2.77s · locked, and the roster walks out from under it. */
  const g = E(lf, 0, 29, 1, 1.17, LIN);
  return (
    <HookScene w={w} litFar={0.28} push={[0, 29, 1.05]}>
      <div style={{ position: "absolute", left: 210, top: 62, width: 600, height: 268,
        zIndex: 20, borderRadius: 12, background: "#1C2C29", border: "10px solid #2E4A45",
        boxShadow: SH_D }} />
      <Head x={230} y={82} ww={560} hh={126} s={0.46} z={70} />
      {ROWS.slice(0, 3).map(([lb, nm], i) => (
        <Row key={lb} x={244} y={222 + i * 36} label={lb} num={nm} k={40} s={0.42} z={40}
          lock />
      ))}
      {/* ⛔ THEY GROW. A dark figure that arrives and holds is worth nothing to
          the eye or to the metric — the whole crew walks INTO the lens. */}
      {Array.from({ length: 7 }, (_, i) => {
        const p = i / 7;
        return (
          <Claudie key={"o" + i} x={506 + (62 + p * 890 - 506) * g} y={(676 + (i % 3) * 52) * g}
            s={(1.02 + (i % 3) * 0.22) * g} z={40 + (i % 3) * 5} f={f + i * 11} walk={1}
            tint={CLAY} face={i % 2 ? -1 : 1}
            costume={[{ suit: 1 }, { glasses: 1 }, { wizard: 1 }, { prof: 1 }][i % 4]}
            prop={(["case", "board", "mega", "swatch"] as const)[i % 4]} />
        );
      })}
      {[176, 836].map((lx, i) => (
        <React.Fragment key={lx}>
          <StreetLamp x={lx} y={700 - i * 34} h={340 - i * 40} c="#CFE8DA" z={22} />
          <Cone f={f} x={lx + 76} y={366 - i * 60} top={54} bot={244} len={310} c="#CFE8DA"
            o={0.18} z={18} sway={0.4} />
        </React.Fragment>
      ))}
      <Occluder side="r" c="#0F1A18" w={80} z={92} />
    </HookScene>
  );
};
