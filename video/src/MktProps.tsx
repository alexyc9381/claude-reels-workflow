import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK, PAPER, TEAL, Contact, rock, shake, squash, idle,
  Ring, Puff, SKILL_C, WIRED, LogoTile,
} from "./MktWorld";

/* ===========================================================================
   REEL 108 "MARKETING" · THE PROPS.  Board: storyboards/108-marketing.md.

   ⛔⛔ THE RULE THIS FILE EXISTS TO OBEY: **the picture must say the line that is
      being spoken over it.** Every prop below is named after a VERB from the VO,
      not after a category: the wall TRACKS, the ladder CLIMBS, the fan REPAINTS,
      the rack WIRES, the table ARGUES, the belt VERIFIES, the gantry LAUNCHES.

   ⛔ NO TEXT ANIMATIONS. Quantity is shown by COUNTABLE OBJECTS. One small chip
      per shot, and a chip LABELS, it never performs. ⛔ The "hundred live
      sources" is never typeset — it is drawn as feeds you can see running.

   ⭐ SPRITES ACT. Every landed sprite runs one of four ACTION LOOPS by index, on
      its own phase and rate, so a crowd does four things at once instead of one
      animation played N times. A bob is an IDLE and an idle is not an action.

   ⭐ PROPS NEED REAL DRAWING, NOT PRIMITIVES ([[feedback_props_need_real_drawing]]).
      "A whole lot of nothing even though there's more stuff" — a book was FOUR
      DIVS. Every hero object here is 8-20 elements. Count divs per object before
      adding objects.
   ========================================================================= */

const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });
const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w });

/* ===========================================================================
   ⭐⭐ THE COSTUME ROSTER — all TWELVE `SlopKit.Mascot` levers in rotation.
   Reel 107 shipped FOUR and was told so ("there arent enough outfits either").
   ⛔ Deterministic by index — NEVER random, so a re-render is identical.
   ========================================================================= */
export const COSTUMES: Array<Record<string, number | string>> = [
  { glasses: 1 }, { suit: 1 }, { constr: 1 }, { prof: 1 }, { chef: 1 },
  { wizard: 1 }, { samurai: 1 }, { cop: 1 }, { beard: 1 }, { fro: 1 },
  { girl: 1 }, { glasses: 1, beard: 1 }, { suit: 1, glasses: 1 },
  { capeC: "#D2724E" }, { capeC: "#3F9E74" }, { constr: 1, beard: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

/* ---------------------------------------------------------------------------
   THE ACTOR — one sprite, grounded, idling at an amplitude a human can SEE.
   ⭐ 2.6deg / 4.6px with a second slower harmonic. Measured: 1.15deg / 1.7px
   registers as "never static" on a metric and READS as static to a human.
   ------------------------------------------------------------------------ */
export const Actor: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  seed?: number; lean?: number; bob?: number } & Record<string, any>> =
  ({ f, x, y, s = 210, z = 60, seed = 0, lean = 0, bob = 0, ...m }) => {
  const id = idle(f, seed, 1.9);
  return (<>
    <Contact x={x - s * 0.32} y={y + s * 0.38} w={s * 0.90} z={z - 1} o={0.42} />
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62 + id.dy + bob,
      zIndex: z, transform: `rotate(${id.rot + lean}deg)`, transformOrigin: "50% 92%" }}>
      <Mascot lf={f} size={s} {...m} />
    </div>
  </>);
};

/** ⭐ A WORKER WHO IS ACTUALLY WORKING — the arm is a real drawn limb swinging on
    its own clock. `phase` staggers each one so a row never reads as one animation
    played N times. ⛔ The arm is SHORT and sits ON the body; run it further out
    and it reads as a plank sticking out of every worker in the row. */
/* ⛔⛔ NO BOLTED-ON LIMBS. Alex: *"I don't like the additional hands on the little
   Claude sprites that move, they look very odd, cylinders."* He is right and the
   whole idea was wrong: `SlopKit.Mascot` is a solid clay box with no arms in its
   design language, so a rounded rect stuck on its flank reads as a cylinder
   floating next to it, not as a limb.
   ⭐ THE ACTION HAS TO COME FROM THE BODY AND FROM THE OBJECT. A walk is stride
   lift + body lean + actually covering ground. An operator is the body reaching
   and THE LEVER MOVING. A climber is an alternating tilt while gaining height.
   Every one of those reads better than a swinging cylinder, and it is why
   `Operator` takes the lever as a render prop in the first place. */
export const Worker: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  seed?: number; phase?: number; rate?: number; arm?: boolean } & Record<string, any>> =
  ({ f, x, y, s = 200, z = 60, seed = 0, phase = 0, rate = 1, arm = true, ...m }) => {
  const t = f * rate + phase;
  /* the WHOLE BODY does the work: a deep lean into the bench on the down-beat,
     a counter-rock on the up, and a bob that follows the lean rather than a
     separate limb swinging beside it */
  const lean = Math.sin(t / 7) * 9 + Math.sin(t / 3.3) * 2.6;
  const bob = Math.sin(t / 7) * 5.2;
  return <Actor f={f} x={x} y={y} s={s} z={z} seed={seed} bob={bob} lean={lean} {...m} />;
};

/* ===========================================================================
   ⭐⭐⭐ THE CROWD — sprites that ARRIVE FAST AND BIG, then run an ACTION LOOP.
   Two measured laws are baked in and both cost reel 107 a round:
     1 A GENTLE ARRIVAL IS NOT AN EVENT. Crowds easing in over 13 frames measured
       WORSE than the abstract slabs they replaced (CTA 8.54 -> 5.14). Fixed by
       scaling up and shortening the arrival to EIGHT frames with a longer travel
       and a squash.
     2 THEY LANDED AND THEN STOOD THERE. Every sprite now runs one of four action
       loops chosen by index, each on its own phase and rate.
   ⛔ SPACING IS ARITHMETIC, NOT TASTE: `spacing >= 0.85 * (rA + rB)`. Compute the
      pitch BEFORE adding count — 18 sprites at s=148 over 600px in 6 columns is
      120px of pitch for ~126px bodies and renders as one unreadable mass.
   ========================================================================= */
export const Crowd: React.FC<{ f: number; x: number; y: number; n?: number; cols?: number;
  pitchX?: number; pitchY?: number; s?: number; z?: number; at?: number; every?: number;
  from?: "l" | "r" | "b"; costume?: (i: number) => Record<string, any> }> =
  ({ f, x, y, n = 10, cols = 5, pitchX = 190, pitchY = 96, s = 130, z = 56,
     at = 0, every = 5, from = "l", costume = costumeFor }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const cx = i % cols, cy = Math.floor(i / cols);
      const px = x + cx * pitchX, py = y + cy * pitchY;
      const land = at + (cx + cy) * every;
      const k = E(f, land, land + 8, 0, 1, OUT);       /* ⛔ EIGHT frames, not 13 */
      if (k <= 0) return null;
      const off = from === "l" ? -760 : from === "r" ? 760 : 0;
      const offY = from === "b" ? 560 : 0;
      const sc = s * (0.86 + (cy / Math.max(cols - 1, 1)) * 0.28);
      const t = f * (0.85 + (i % 5) * 0.09) + i * 7;

      /* the four action loops, by index, each on its own phase and rate */
      const act = i % 4;
      const after = Math.max(0, f - (land + 8));
      const live = k > 0.85 ? 1 : 0;
      const pace = act === 0 ? Math.sin(after / 17) * 22 * live : 0;
      const hopPh = (after + i * 9) % 46;
      const hop = act === 2 && live ? -Math.max(0, Math.sin((hopPh / 46) * Math.PI * 2)) * 26 : 0;
      const lean = act === 1 && live ? Math.sin(after / 9) * 15 : 0;
      const look = act === 3 && live ? Math.sin(after / 13) : 0;
      const stride = act === 0 && live ? Math.abs(Math.sin(after / 8.5)) * 7 : 0;
      return (
        <div key={"cw" + i} style={{ position: "absolute",
          left: px + (1 - k) * off + pace,
          top: py + (1 - k) * offY + Math.sin(t / 7) * 3.6 + hop - stride,
          zIndex: z + cy, opacity: Math.min(1, k * 1.7),
          transform: `rotate(${(1 - k) * (from === "r" ? -22 : 22) + Math.sin(t / 29) * 2.4 + lean}deg) scaleY(${squash(f, land + 7, 0.20)})`,
          transformOrigin: "50% 92%" }}>
          <Mascot lf={t} size={sc} gaze={look}
            cheer={act === 2 && live ? Math.max(0, Math.sin((hopPh / 46) * Math.PI * 2)) * 0.6 : 0}
            nodAmp={act === 1 ? 6 : 3.5} nodSpeed={act === 1 ? 7 : 10}
            {...(costume ? costume(i) : {})} />
        </div>
      );
    })}
  </>);

/* ===========================================================================
   S0 — THE NIGHT DESK
   ========================================================================= */

/** the hero's desk: top, front, two legs, a lamp with a real bent arm, a lit
    terminal with scanlines and a cursor, a mug, a keyboard. 16 elements. */
export const NightDesk: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  lampOn?: number; screen?: string; alarm?: number }> =
  ({ x, y, f, s = 1, z = 44, lampOn = 1, screen = "#1B2A3E", alarm = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* legs */}
    <div style={{ position: "absolute", left: 26 * s, top: 34 * s, width: 13 * s, height: 128 * s, background: "#2A2620" }} />
    <div style={{ position: "absolute", left: 318 * s, top: 34 * s, width: 13 * s, height: 128 * s, background: "#2A2620" }} />
    {/* front apron + top */}
    <div style={{ position: "absolute", left: 6 * s, top: 30 * s, width: 348 * s, height: 26 * s, background: "#3A3128" }} />
    <div style={{ position: "absolute", left: 0, top: 12 * s, width: 360 * s, height: 22 * s,
      borderRadius: 3 * s, background: "#5A4C3C", boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 12 * s, width: 360 * s, height: 5 * s, background: "#786549" }} />
    {/* the terminal — a real bezel, a lit face, scanlines, a cursor */}
    {/* ⭐ the monitor is the thing the viewer is asked to read in the hook, so it
        is bigger — 168x116 -> 224x152 — and it can carry a RED ALARM. */}
    <div style={{ position: "absolute", left: 78 * s, top: -140 * s, width: 224 * s, height: 152 * s,
      borderRadius: 7 * s, background: "#22252E",
      border: `${5 * s}px solid ${alarm > 0.5
        ? (Math.sin(f / 2.6) > 0 ? "#FF6A55" : "#8E2A20") : "#313746"}`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", inset: 6 * s, borderRadius: 3 * s, background: screen, overflow: "hidden" }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"ln" + i} style={{ position: "absolute", left: 8 * s, top: (12 + i * 17) * s,
            width: (34 + ((i * 37) % 78)) * s, height: 5 * s, borderRadius: 2 * s,
            background: hexa("#CFE2F5", 0.78 - i * 0.07) }} />
        ))}
        <div style={{ position: "absolute", left: 8 * s, top: 128 * s, width: 10 * s, height: 7 * s,
          background: "#CFE0F2", opacity: Math.sin(f / 7) > 0 ? 1 : 0.15 }} />

      </div>
      {/* the bezel's own alert lamp, so the alarm reads even at thumb size */}
      {alarm > 0.01 && (
        <div style={{ position: "absolute", left: 100 * s, bottom: -13 * s, width: 34 * s,
          height: 12 * s, borderRadius: 6 * s,
          background: Math.sin(f / 2.6) > 0 ? "#FF6A55" : "#6E2018", opacity: alarm }} />
      )}
    </div>
    <div style={{ position: "absolute", left: 166 * s, top: 12 * s, width: 52 * s, height: 12 * s,
      background: "#313746" }} />
    {/* the lamp — base, bent arm, shade, and a solid warm lens */}
    <div style={{ position: "absolute", left: 300 * s, top: -6 * s, width: 46 * s, height: 12 * s,
      borderRadius: 6 * s, background: "#2A2A34" }} />
    <div style={{ position: "absolute", left: 319 * s, top: -84 * s, width: 8 * s, height: 82 * s,
      background: "#2A2A34", transform: "rotate(6deg)", transformOrigin: "50% 100%" }} />
    <div style={{ position: "absolute", left: 286 * s, top: -104 * s, width: 62 * s, height: 24 * s,
      borderRadius: `${30 * s}px ${30 * s}px 0 0`, background: "#33333F", transform: "rotate(-16deg)" }} />
    <div style={{ position: "absolute", left: 296 * s, top: -86 * s, width: 40 * s, height: 9 * s,
      borderRadius: 5 * s, background: GOLD, opacity: lampOn }} />
    {/* mug + keyboard */}
    <div style={{ position: "absolute", left: 52 * s, top: -8 * s, width: 26 * s, height: 24 * s,
      borderRadius: `2px 2px ${8 * s}px ${8 * s}px`, background: CLAY }} />
    <div style={{ position: "absolute", left: 74 * s, top: -2 * s, width: 12 * s, height: 12 * s,
      borderRadius: "50%", border: `${3 * s}px solid ${CLAY}` }} />
  </div>
);

/** the stack of unopened invoices — the S0 foreground mass, and the thing that
    gets shoved aside in S8. Real drawing: 7 sheets, each rotated, with a red
    overdue band on the top two. */
export const InvoiceStack: React.FC<{ x: number; y: number; s?: number; z?: number;
  shove?: number }> = ({ x, y, s = 1, z = 88, shove = 0 }) => (
  <div style={{ position: "absolute", left: x + shove * 210, top: y + shove * 26, zIndex: z,
    transform: `rotate(${shove * 13}deg)`, transformOrigin: "50% 100%" }}>
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"iv" + i} style={{ position: "absolute", left: (i % 3) * 6 * s, top: -i * 11 * s,
        width: 168 * s, height: 106 * s, borderRadius: 3 * s,
        background: i % 2 ? "#E6E1D4" : "#EFEAE0", border: `${2 * s}px solid #C9C2B2`,
        transform: `rotate(${(rnd(i, 3) - 0.5) * 7}deg)`, boxShadow: SH }}>
        {i > 4 && (
          <div style={{ position: "absolute", left: 12 * s, top: 12 * s, width: 84 * s,
            height: 14 * s, borderRadius: 2 * s, background: RED, opacity: 0.85 }} />
        )}
        {Array.from({ length: 4 }, (_, j) => (
          <div key={"il" + j} style={{ position: "absolute", left: 12 * s, top: (36 + j * 14) * s,
            width: (60 + ((i * 17 + j * 29) % 80)) * s, height: 5 * s, background: "#B5AE9E" }} />
        ))}
      </div>
    ))}
  </div>
);

/** THE SKILL CRATE — what the hook launches into bay 1. A real crate: body,
    lid, two banding straps, corner plates, a stencilled skill name, and the
    Claude mark on the lid. 14 elements. */
export const SkillCrate: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  c?: string; t?: string; rot?: number }> =
  ({ x, y, f, s = 1, z = 74, c = SKILL_C[0], t = "head-of-content", rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 60%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 190 * s, height: 132 * s,
      borderRadius: 6 * s, background: dkh(c, 0.46), border: `${3 * s}px solid ${dkh(c, 0.62)}`,
      boxShadow: SH_D }} />
    {/* lid */}
    <div style={{ position: "absolute", left: -6 * s, top: -12 * s, width: 202 * s, height: 22 * s,
      borderRadius: 4 * s, background: dkh(c, 0.30) }} />
    {/* two banding straps */}
    <div style={{ position: "absolute", left: 34 * s, top: -12 * s, width: 14 * s, height: 144 * s,
      background: hexa("#2A2620", 0.62) }} />
    <div style={{ position: "absolute", left: 142 * s, top: -12 * s, width: 14 * s, height: 144 * s,
      background: hexa("#2A2620", 0.62) }} />
    {/* corner plates */}
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], i) => (
      <div key={"cp" + i} style={{ position: "absolute",
        left: cx ? 158 * s : 4 * s, top: cy ? 100 * s : 4 * s,
        width: 28 * s, height: 28 * s, borderRadius: 3 * s, background: hexa("#F2EEE4", 0.20) }} />
    ))}
    {/* the stencilled name — this is a LABEL, it never performs */}
    <div style={{ position: "absolute", left: 54 * s, top: 52 * s, width: 82 * s,
      ...mono(12 * s), color: mxh(c, 0.62), textAlign: "center", lineHeight: 1.15 }}>{t}</div>
    <div style={{ position: "absolute", left: 76 * s, top: 88 * s, width: 38 * s, height: 38 * s,
      borderRadius: 8 * s, background: "#FFFFFF", border: `${2 * s}px solid #E8DCC0`,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")} style={{ width: 26 * s, height: 26 * s, objectFit: "contain" }} />
    </div>
  </div>
);

/* ===========================================================================
   S1 — THE RESEARCH WALL.  VO verbs: TRACKS, TURNS INTO.
   ⛔ Critic pass flagged S1 and S6 as both being "many small tiles moving".
      S1 is therefore VERTICAL and tiles are PULLED OFF TOWARD CAMERA; S6 is a
      HORIZONTAL belt. Different axis, different colour, different verb.
   ========================================================================= */

/** the wall of live creator tiles, scrolling UP continuously — the background
    process that never stops. Each tile is a real card: thumb, play glyph, a
    two-line caption and an engagement bar. */
export const CreatorWall: React.FC<{ f: number; x: number; y: number; cols?: number;
  rows?: number; s?: number; z?: number; speed?: number; hot?: number[] }> =
  ({ f, x, y, cols = 6, rows = 5, s = 1, z = 14, speed = 0.9, hot = [] }) => {
  const TW = 132 * s, TH = 104 * s, span = rows * TH;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: cols * TW, height: 400 * s,
      overflow: "hidden", zIndex: z }}>
      {Array.from({ length: cols * (rows + 1) }, (_, i) => {
        const cx = i % cols, cy = Math.floor(i / cols);
        const ty = ((cy * TH - f * speed) % span + span) % span - TH;
        const isHot = hot.includes(i);
        const lift = 0.24 + rnd(i, 5) * 0.5;
        return (
          <div key={"cwl" + i} style={{ position: "absolute", left: cx * TW + 4 * s, top: ty,
            width: TW - 8 * s, height: TH - 8 * s, borderRadius: 5 * s,
            background: isHot ? dkh(TEAL, 0.30) : "#1A3A44",
            border: `${2 * s}px solid ${isHot ? TEAL : "#2A5460"}` }}>
            {/* thumb + play glyph */}
            <div style={{ position: "absolute", left: 6 * s, top: 6 * s, right: 6 * s, height: 46 * s,
              borderRadius: 3 * s, background: mxh("#14323C", lift * 0.30) }} />
            <div style={{ position: "absolute", left: TW * 0.42, top: 22 * s, width: 0, height: 0,
              borderLeft: `${11 * s}px solid ${hexa("#CFEDF2", 0.72)}`,
              borderTop: `${7 * s}px solid transparent`, borderBottom: `${7 * s}px solid transparent` }} />
            {/* caption lines */}
            <div style={{ position: "absolute", left: 6 * s, top: 58 * s, width: (64 + lift * 40) * s,
              height: 5 * s, borderRadius: 2 * s, background: hexa("#9FD4DE", 0.60) }} />
            <div style={{ position: "absolute", left: 6 * s, top: 68 * s, width: (38 + lift * 30) * s,
              height: 5 * s, borderRadius: 2 * s, background: hexa("#9FD4DE", 0.36) }} />
            {/* the engagement bar — the thing the skill is actually reading */}
            <div style={{ position: "absolute", left: 6 * s, bottom: 6 * s, width: TW - 20 * s,
              height: 7 * s, borderRadius: 3 * s, background: "#122C34", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
                width: `${isHot ? 88 : 18 + lift * 44}%`, background: isHot ? TEAL : "#3C7E8C" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** a tile that has DETACHED from the wall and is flying to the bench, where it
    FLIPS into a pattern card. This is the "turns their patterns into" verb. */
export const PatternCard: React.FC<{ f: number; at: number; x0: number; y0: number;
  x1: number; y1: number; s?: number; z?: number; i?: number }> =
  ({ f, at, x0, y0, x1, y1, s = 1, z = 72, i = 0 }) => {
  const k = E(f, at, at + 13, 0, 1, OUT);
  if (k <= 0) return null;
  const flip = E(f, at + 11, at + 22, 0, 1, IO);
  const x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 96 * s;
  const face = flip > 0.5;
  return (<>
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      width: 132 * s, height: 96 * s, borderRadius: 5 * s,
      background: face ? "#EFEAE0" : dkh(TEAL, 0.30),
      border: `${2 * s}px solid ${face ? "#C9C2B2" : TEAL}`, boxShadow: SH,
      transform: `perspective(600px) rotateY(${flip * 180}deg) rotate(${(1 - k) * 24}deg) scaleY(${squash(f, at + 12, 0.18)})` }}>
      {face
        ? (<div style={{ transform: "scaleX(-1)" }}>
            <div style={{ position: "absolute", left: 9 * s, top: 9 * s, width: 52 * s, height: 8 * s,
              borderRadius: 3 * s, background: TEAL }} />
            {Array.from({ length: 3 }, (_, j) => (
              <div key={"pl" + j} style={{ position: "absolute", left: 9 * s, top: (28 + j * 14) * s,
                width: (46 + ((i * 23 + j * 31) % 60)) * s, height: 5 * s, background: "#A9A294" }} />
            ))}
            <div style={{ position: "absolute", left: 9 * s, bottom: 9 * s, width: 110 * s, height: 9 * s,
              borderRadius: 4 * s, background: "#DCD5C6", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, width: `${58 + i * 9}%`, background: GREEN }} />
            </div>
          </div>)
        : (<div style={{ position: "absolute", left: 8 * s, top: 8 * s, right: 8 * s, height: 40 * s,
            borderRadius: 3 * s, background: hexa("#CFEDF2", 0.20) }} />)}
    </div>
    <Ring x={x + 66 * s} y={y + 90 * s} f={f} at={at + 12} c={TEAL} max={130} z={z - 1} />
  </>);
};

/* ===========================================================================
   S2 — THE RANKINGS SHAFT.  VO verbs: REWRITES, RANK.
   ⛔ Deliberately shares no set primitive, colour or camera with reel 102 SEO's
      NIGHT AUDIT (an interior studio floor with a steel page rack and red flags).
      This is an EXTERIOR VERTICAL climb.
   ========================================================================= */

/** the ranked ladder: slabs stacked up the frame, yours the lit one, climbing
    past the others in DISCRETE stepped lands. ⛔ N discrete pops, never one long
    tween — an 82-frame smooth growth measured 4.27, four pops measured 5.63. */
export const RankLadder: React.FC<{ f: number; x: number; y: number; n?: number; s?: number;
  z?: number; mineAt?: number[]; }> =
  ({ f, x, y, n = 7, s = 1, z = 30, mineAt = [] }) => {
  const RH = 62 * s, RW = 340 * s;
  /* how many rungs we have climbed = how many of the stepped lands have fired */
  const climbed = mineAt.filter((t) => f >= t).length;
  const myRow = n - 2 - climbed;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the two rails the rungs sit on — a real ladder, not floating bars */}
      <div style={{ position: "absolute", left: -16 * s, top: -20 * s, width: 11 * s,
        height: (n + 1) * RH, background: "#3C4C64" }} />
      <div style={{ position: "absolute", left: RW + 6 * s, top: -20 * s, width: 11 * s,
        height: (n + 1) * RH, background: "#3C4C64" }} />
      {Array.from({ length: n }, (_, i) => {
        const mine = i === myRow;
        const justLanded = mine && climbed > 0 ? mineAt[climbed - 1] : -999;
        const rk = rock(f, justLanded, 3.4, 16);
        return (
          <div key={"rk" + i} style={{ position: "absolute", left: 0, top: i * RH,
            width: RW, height: RH - 9 * s, borderRadius: 4 * s,
            background: mine ? dkh(SKILL_C[1], 0.34) : "#243348",
            border: `${2 * s}px solid ${mine ? SKILL_C[1] : "#33435C"}`,
            transform: `rotate(${mine ? rk * 0.4 : 0}deg) scaleY(${mine ? squash(f, justLanded, 0.16) : 1})`,
            transformOrigin: "50% 100%", zIndex: mine ? 6 : 2 }}>
            {/* rank pip */}
            <div style={{ position: "absolute", left: 10 * s, top: 12 * s, width: 30 * s, height: 30 * s,
              borderRadius: 5 * s, background: mine ? SKILL_C[1] : "#33435C",
              ...mono(15 * s), color: mine ? "#10202E" : "#7C93B0",
              display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
            {/* the page's own content lines, so a rung is a PAGE not a bar */}
            {Array.from({ length: 3 }, (_, j) => (
              <div key={"rl" + j} style={{ position: "absolute", left: 52 * s, top: (11 + j * 13) * s,
                width: (110 + ((i * 31 + j * 47) % 150)) * s, height: 5 * s, borderRadius: 2 * s,
                background: hexa(mine ? "#CFE4F7" : "#6D86A6", mine ? 0.80 - j * 0.16 : 0.44 - j * 0.10) }} />
            ))}
            {mine && (
              <div style={{ position: "absolute", right: 10 * s, top: 17 * s, width: 20 * s, height: 20 * s,
                borderRadius: 4 * s, background: "#FFFFFF", display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile("claude_logo.png")} style={{ width: 14 * s, height: 14 * s, objectFit: "contain" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/** THE READING HEAD — a lit bar that sweeps DOWN a page and the text RE-SETS
    under it. This is the "rewrites" verb made visible.
    ⛔ The band alternates light and shadow (a light-only wash lifts the black
    point, which is the exact move the look gate exists to ban). */
export const ReadHead: React.FC<{ f: number; x: number; y: number; w: number; h: number;
  at: number; dur?: number; s?: number; z?: number; lines?: number }> =
  ({ f, x, y, w: ww, h: hh, at, dur = 54, s = 1, z = 40, lines = 7 }) => {
  const k = E(f, at, at + dur, 0, 1, LIN);
  const headY = y + k * hh;
  return (<>
    {/* the page under it */}
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z - 2,
      borderRadius: 5 * s, background: "#DDE6F0", border: `${3 * s}px solid #A8BACE` }} />
    {Array.from({ length: lines }, (_, i) => {
      const ly = y + (14 + i * ((hh - 26) / lines)) * 1;
      const done = headY > ly;
      return (
        <div key={"rh" + i} style={{ position: "absolute", left: x + 14 * s, top: ly,
          width: done ? (ww - 40 * s) * (0.62 + (i % 3) * 0.12) : (ww - 40 * s) * (0.30 + (i % 4) * 0.10),
          height: 13 * s, borderRadius: 5 * s, zIndex: z - 1,
          background: done ? "#1E3A5C" : "#B4BFCE" }} />
      );
    })}
    {/* the head itself: a bright leading edge with a SHADOW behind it */}
    {k > 0 && k < 1 && (<>
      <div style={{ position: "absolute", left: x - 6 * s, top: headY - 4 * s, width: ww + 12 * s,
        height: 9 * s, background: "#DCEBFA", zIndex: z + 2 }} />
      <div style={{ position: "absolute", left: x - 6 * s, top: headY - 30 * s, width: ww + 12 * s,
        height: 26 * s, zIndex: z + 1,
        background: `linear-gradient(180deg, rgba(6,10,18,0.52) 0%, rgba(6,10,18,0) 100%)` }} />
      <div style={{ position: "absolute", left: x - 6 * s, top: headY + 5 * s, width: ww + 12 * s,
        height: 22 * s, zIndex: z + 1,
        background: `linear-gradient(180deg, ${hexa(SKILL_C[1], 0.34)} 0%, ${hexa(SKILL_C[1], 0)} 100%)` }} />
    </>)}
  </>);
};

/* ===========================================================================
   S3 — THE PAINT SHOP.  VO nouns: COLOURS, FONTS, VOICE.
   ⛔ Three visible TRANSFORMATIONS on ONE object — never three labelled cards
      reading "COLORS / FONTS / VOICE", which is §4's exact failure.
   ========================================================================= */

/** the swatch fan — a real fan: a rivet, N blades at increasing angles, each a
    different pigment, opening on a spring. */
export const SwatchFan: React.FC<{ f: number; x: number; y: number; at: number; s?: number;
  z?: number; n?: number }> = ({ f, x, y, at, s = 1, z = 66, n = 9 }) => {
  const k = E(f, at, at + 14, 0, 1, BACK);
  const PIG = ["#C0452F", "#E0925A", "#E7B24C", "#8FAE5E", "#4F9E86", "#4E7FA8",
    "#6B5EA8", "#B36596", "#8A6E52"];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {Array.from({ length: n }, (_, i) => (
        <div key={"sw" + i} style={{ position: "absolute", left: 0, top: 0,
          width: 26 * s, height: 128 * s, borderRadius: 5 * s, background: PIG[i % PIG.length],
          border: `${2 * s}px solid ${dkh(PIG[i % PIG.length], 0.34)}`,
          transformOrigin: "50% 96%",
          transform: `rotate(${(i - (n - 1) / 2) * 15 * k}deg)`, boxShadow: SH }}>
          <div style={{ position: "absolute", left: 4 * s, bottom: 8 * s, right: 4 * s, height: 16 * s,
            borderRadius: 2 * s, background: hexa("#F7F5F0", 0.30) }} />
        </div>
      ))}
      {/* the rivet the blades turn on */}
      <div style={{ position: "absolute", left: 5 * s, top: 112 * s, width: 16 * s, height: 16 * s,
        borderRadius: "50%", background: "#2A2620", border: `${2 * s}px solid #6E6250` }} />
    </div>
  );
};

/** the artifact being branded — a page that repaints in THREE discrete passes:
    1 colour, 2 type, 3 voice. `stage` 0..3. */
export const BrandArtifact: React.FC<{ f: number; x: number; y: number; stage: number;
  s?: number; z?: number; landAt?: number[] }> =
  ({ f, x, y, stage, s = 1, z = 50, landAt = [] }) => {
  const c = SKILL_C[2];
  const painted = stage >= 1, typed = stage >= 2, voiced = stage >= 3;
  const last = landAt[Math.max(0, stage - 1)] ?? -999;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scaleY(${squash(f, last, 0.12)}) rotate(${rock(f, last, 1.8, 14)}deg)`,
      transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 300 * s, height: 380 * s,
        borderRadius: 7 * s, background: painted ? mxh(c, 0.80) : "#B9B4A8",
        border: `${3 * s}px solid ${painted ? dkh(c, 0.24) : "#8E8A80"}`, boxShadow: SH_D,
        overflow: "hidden" }}>
        {/* the header band — takes the brand colour on pass 1 */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 74 * s,
          background: painted ? c : "#9A968B" }}>
          <div style={{ position: "absolute", left: 18 * s, top: 24 * s, width: 34 * s, height: 34 * s,
            borderRadius: 7 * s, background: "#FFFFFF", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")} style={{ width: 24 * s, height: 24 * s, objectFit: "contain" }} />
          </div>
        </div>
        {/* the headline — RE-SETS in the brand face on pass 2 */}
        <div style={{ position: "absolute", left: 18 * s, top: 96 * s,
          ...(typed ? { fontFamily: inter.fontFamily, fontWeight: 900, letterSpacing: -0.6 }
                    : { fontFamily: MONO, fontWeight: 400, letterSpacing: 1.2 }),
          fontSize: (typed ? 34 : 24) * s, color: typed ? dkh(c, 0.62) : "#6E6A62",
          lineHeight: 1.02, width: 250 * s }}>
          Built for<br />marketers
        </div>
        {/* body lines */}
        {Array.from({ length: 5 }, (_, j) => (
          <div key={"bl" + j} style={{ position: "absolute", left: 18 * s, top: (188 + j * 17) * s,
            width: (150 + ((j * 53) % 110)) * s, height: 6 * s, borderRadius: 2 * s,
            background: typed ? hexa(dkh(c, 0.40), 0.52) : hexa("#6E6A62", 0.40) }} />
        ))}
        {/* the VOICE — a speech shape that settles on pass 3 */}
        {voiced && (
          <div style={{ position: "absolute", left: 18 * s, top: 290 * s, width: 250 * s,
            height: 64 * s, borderRadius: 12 * s, background: dkh(c, 0.30),
            transform: `scale(${E(f, landAt[2] ?? 0, (landAt[2] ?? 0) + 9, 0.7, 1, BACK)})`,
            transformOrigin: "10% 100%" }}>
            <div style={{ position: "absolute", left: 16 * s, top: 18 * s, width: 90 * s, height: 7 * s,
              borderRadius: 3 * s, background: mxh(c, 0.70) }} />
            <div style={{ position: "absolute", left: 16 * s, top: 34 * s, width: 150 * s, height: 7 * s,
              borderRadius: 3 * s, background: hexa(mxh(c, 0.70), 0.62) }} />
            <div style={{ position: "absolute", left: 22 * s, top: 62 * s, width: 0, height: 0,
              borderTop: `${14 * s}px solid ${dkh(c, 0.30)}`,
              borderRight: `${14 * s}px solid transparent` }} />
          </div>
        )}
      </div>
    </div>
  );
};

/* ===========================================================================
   S4 — THE PLUG RACK.  VO verb: WIRED STRAIGHT INTO.  ⭐ DENSITY PEAK 1.
   ⛔⛔ NO NUMERAL. The command burst is deliberately NOT countable.
   ========================================================================= */

/** the rack: a real 19-inch frame with rails, screw holes, an empty slot with
    contacts, and vent slits. The cartridge seats into it. */
export const PlugRack: React.FC<{ x: number; y: number; s?: number; z?: number;
  seated?: number }> = ({ x, y, s = 1, z = 40, seated = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 300 * s, height: 210 * s,
      borderRadius: 6 * s, background: "#1B1F28", border: `${4 * s}px solid #2E3542`, boxShadow: SH_D }} />
    {/* mounting rails + screw holes */}
    {[0, 1].map((i) => (
      <div key={"rr" + i} style={{ position: "absolute", left: i ? 274 * s : 8 * s, top: 8 * s,
        width: 18 * s, height: 194 * s, background: "#262C37" }}>
        {Array.from({ length: 6 }, (_, j) => (
          <div key={"sh" + j} style={{ position: "absolute", left: 5 * s, top: (12 + j * 32) * s,
            width: 8 * s, height: 8 * s, borderRadius: "50%", background: "#12151C" }} />
        ))}
      </div>
    ))}
    {/* vent slits — detail that costs the subject no rank */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"vt" + i} style={{ position: "absolute", left: 40 * s, top: (158 + (i % 2) * 12) * s,
        width: 220 * s, height: 4 * s, borderRadius: 2 * s, background: "#141821",
        opacity: i % 2 ? 0.5 : 0.8, transform: `translateX(${(i - 3) * 0}px)` }} />
    ))}
    {/* THE SLOT and its contacts */}
    <div style={{ position: "absolute", left: 40 * s, top: 30 * s, width: 220 * s, height: 112 * s,
      borderRadius: 4 * s, background: seated > 0.5 ? dkh(SKILL_C[3], 0.58) : "#0D1016",
      border: `${3 * s}px solid ${seated > 0.5 ? dkh(SKILL_C[3], 0.34) : "#232936"}` }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"ct" + i} style={{ position: "absolute", left: (10 + i * 17) * s, bottom: 6 * s,
          width: 9 * s, height: 16 * s, borderRadius: 2 * s,
          background: seated > 0.5 ? SKILL_C[3] : "#39404E" }} />
      ))}
    </div>
  </div>
);

/** THE CARTRIDGE — lifted two-handed and driven home. Real drawing: shell,
    label, grip ridges, a contact comb, and the Claude mark. */
export const Cartridge: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  rot?: number }> = ({ x, y, f, s = 1, z = 76, rot = 0 }) => {
  const c = SKILL_C[3];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 80%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 210 * s, height: 104 * s,
        borderRadius: 6 * s, background: dkh(c, 0.42), border: `${3 * s}px solid ${dkh(c, 0.60)}`,
        boxShadow: SH_D }} />
      {/* grip ridges */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: (12 + i * 11) * s, top: 12 * s,
          width: 5 * s, height: 80 * s, borderRadius: 2 * s, background: hexa("#0C0E13", 0.42) }} />
      ))}
      {/* label */}
      <div style={{ position: "absolute", left: 76 * s, top: 20 * s, width: 122 * s, height: 42 * s,
        borderRadius: 4 * s, background: mxh(c, 0.72), ...mono(11 * s), color: dkh(c, 0.70),
        display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: 3 * s, lineHeight: 1.1 }}>marketing</div>
      <div style={{ position: "absolute", left: 76 * s, top: 68 * s, width: 30 * s, height: 30 * s,
        borderRadius: 6 * s, background: "#FFFFFF", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")} style={{ width: 21 * s, height: 21 * s, objectFit: "contain" }} />
      </div>
      {/* contact comb */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={"cc" + i} style={{ position: "absolute", left: (14 + i * 19) * s, top: 100 * s,
          width: 11 * s, height: 14 * s, borderRadius: 2 * s, background: mxh(c, 0.40) }} />
      ))}
    </div>
  );
};

/** a CABLE that fires from the rack to a pillar — a real routed run with a bend,
    not a straight line. `k` 0..1 draws it. */
export const Cable: React.FC<{ f: number; x0: number; y0: number; x1: number; y1: number;
  at: number; dur?: number; c?: string; s?: number; z?: number }> =
  ({ f, x0, y0, x1, y1, at, dur = 12, c = SKILL_C[3], s = 1, z = 44 }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  if (k <= 0) return null;
  const midY = y0 + (y1 - y0) * 0.62 + 40 * s;
  const d = `M ${x0} ${y0} Q ${x0 + (x1 - x0) * 0.42} ${midY} ${x1} ${y1}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute",
      left: 0, top: 0, zIndex: z, pointerEvents: "none" }}>
      <path d={d} fill="none" stroke="#1A1D26" strokeWidth={11 * s} strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
      <path d={d} fill="none" stroke={c} strokeWidth={5 * s} strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
    </svg>
  );
};

/** the service pillar a cable lands on — it LIGHTS and carries a real mark tile */
export const Pillar: React.FC<{ x: number; y: number; f: number; on: number; idx: number;
  s?: number; z?: number; at?: number }> =
  ({ x, y, f, on, idx, s = 1, z = 52, at = -999 }) => {
  const w = WIRED[idx];
  return (<>
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      width: 138 * s, height: 220 * s, borderRadius: 7 * s,
      background: on > 0.5 ? "#2A303C" : "#171B23",
      border: `${3 * s}px solid ${on > 0.5 ? hexa(w.c, 0.52) : "#232936"}`, boxShadow: SH_D }}>
      {/* the pillar's own indicator strip */}
      <div style={{ position: "absolute", left: 10 * s, right: 10 * s, bottom: 12 * s, height: 9 * s,
        borderRadius: 4 * s, background: on > 0.5 ? w.c : "#232936" }} />
      {Array.from({ length: 3 }, (_, i) => (
        <div key={"pv" + i} style={{ position: "absolute", left: 14 * s, top: (176 + i * 0) * s,
          width: 110 * s, height: 3 * s, background: "#12151C", opacity: 0.7 }} />
      ))}
    </div>
    <LogoTile x={x + 15 * s} y={y + 30 * s} t={w.t} logo={w.logo} s={s} z={z + 2} on={on} c={w.c} />
    {on > 0.5 && <Ring x={x + 69 * s} y={y + 150 * s} f={f} at={at} c={w.c} max={150} z={z + 1} />}
  </>);
};

/** THE COMMAND BURST — chips ejecting off the cartridge as a RACK FIRING.
    ⛔⛔ DELIBERATELY NOT COUNTABLE and carrying NO numeral: they overlap, they
    fly at different rates, and several leave frame. The VO says "six", the
    README says seven, so the picture states neither. */
export const CommandBurst: React.FC<{ f: number; x: number; y: number; at: number;
  s?: number; z?: number; n?: number }> =
  ({ f, x, y, at, s = 1, z = 80, n = 11 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const a = at + (i % 4) * 3;
      const k = E(f, a, a + 26 + (i % 5) * 4, 0, 1, OUT);
      if (k <= 0) return null;
      const ang = -0.85 + (i / (n - 1)) * 1.7;
      const dist = (240 + (i % 4) * 90) * s;
      return (
        <div key={"cb" + i} style={{ position: "absolute",
          left: x + Math.sin(ang) * dist * k,
          top: y - Math.cos(ang) * dist * k * 0.62 - Math.sin(k * Math.PI) * 40 * s,
          zIndex: z, opacity: (1 - k * 0.55),
          transform: `rotate(${ang * 26 + (1 - k) * 40}deg)` }}>
          <div style={{ width: (58 + (i % 3) * 16) * s, height: 15 * s, borderRadius: 4 * s,
            background: hexa(SKILL_C[3], 0.90), border: `${1.5 * s}px solid ${dkh(SKILL_C[3], 0.34)}` }}>
            <div style={{ position: "absolute", left: 5 * s, top: 5 * s, width: (28 + (i % 4) * 9) * s,
              height: 5 * s, borderRadius: 2 * s, background: hexa("#2A2008", 0.44) }} />
          </div>
        </div>
      );
    })}
  </>);

/* ===========================================================================
   S5 — THE COUNCIL ROOM.  VO verbs: SIMULATES, DEBATING, BEFORE YOU COMMIT.
   ⛔ Sprite pitch recomputed on the board: 5 at the table @175px + 2 standing.
   ⛔ NO REAL MARKETERS' NAMES ANYWHERE (COUNCIL_NAMES_BANNED).
   ========================================================================= */

/** a council lamp: a real banker's lamp — base, stem, a green shade and a warm
    solid lens that snaps on. */
export const CouncilLamp: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 58 }) => {
  const on = f >= at ? 1 : 0;
  const flick = on && f < at + 4 ? (f % 2 ? 0.4 : 1) : on;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: 12 * s, top: 46 * s, width: 44 * s, height: 8 * s,
        borderRadius: 4 * s, background: "#2A2620" }} />
      <div style={{ position: "absolute", left: 31 * s, top: 18 * s, width: 6 * s, height: 30 * s,
        background: "#2A2620" }} />
      <div style={{ position: "absolute", left: 0, top: 4 * s, width: 68 * s, height: 18 * s,
        borderRadius: `${9 * s}px ${9 * s}px 3px 3px`, background: "#2E4A3A" }} />
      <div style={{ position: "absolute", left: 8 * s, top: 20 * s, width: 52 * s, height: 7 * s,
        borderRadius: 3 * s, background: SKILL_C[4], opacity: flick }} />
      {/* the pool it throws on the table */}
      {on > 0 && (
        <div style={{ position: "absolute", left: -26 * s, top: 44 * s, width: 120 * s, height: 34 * s,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at 50% 50%, ${hexa(SKILL_C[4], 0.34)} 0%, ${hexa(SKILL_C[4], 0)} 70%)` }} />
      )}
    </div>
  );
};

/** the strategy card the council is arguing about, and the recommendation that
    STAMPS onto it at the end. */
export const StrategyCard: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  stampAt?: number }> = ({ x, y, f, s = 1, z = 62, stampAt = -999 }) => {
  const st = E(f, stampAt, stampAt + 7, 0, 1, IN_Q);
  const done = f >= stampAt + 7;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scaleY(${squash(f, stampAt + 7, 0.14)})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 230 * s, height: 140 * s,
        borderRadius: 5 * s, background: "#E8E2D4", border: `${2 * s}px solid #C2BAA8`, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 14 * s, top: 14 * s, width: 96 * s, height: 8 * s,
          borderRadius: 3 * s, background: "#8E8A80" }} />
        {Array.from({ length: 4 }, (_, j) => (
          <div key={"sc" + j} style={{ position: "absolute", left: 14 * s, top: (38 + j * 15) * s,
            width: (120 + ((j * 41) % 70)) * s, height: 6 * s, borderRadius: 2 * s, background: "#B5AE9E" }} />
        ))}
      </div>
      {/* the recommendation, struck down onto it */}
      {f >= stampAt && (
        <div style={{ position: "absolute", left: 42 * s, top: 44 * s, zIndex: z + 2,
          transform: `rotate(-11deg) scale(${done ? 1 : 1 + (1 - st) * 1.9})`, opacity: done ? 1 : st }}>
          <div style={{ width: 150 * s, height: 50 * s, borderRadius: 5 * s,
            border: `${4 * s}px solid ${GREEN}`, ...ui(21 * s, 900), color: GREEN,
            display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 1.2 }}>
            AGREED
          </div>
        </div>
      )}
    </div>
  );
};

/* ===========================================================================
   S6 — THE LEAD FLOOR.  VO verbs: FINDS, ACROSS SOURCES, VERIFIES.
   ⛔ The "hundred" is NEVER typeset — it is drawn as feeds you can see running.
   ========================================================================= */

/** the wall of many small LIVE SOURCE feeds, all running, behind the belt.
    This is what "a hundred live sources" looks like as an object count. */
export const SourceWall: React.FC<{ f: number; x: number; y: number; cols?: number; rows?: number;
  s?: number; z?: number }> = ({ f, x, y, cols = 12, rows = 5, s = 1, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {Array.from({ length: cols * rows }, (_, i) => {
      const cx = i % cols, cy = Math.floor(i / cols);
      const ph = (f * (0.9 + (i % 7) * 0.13) + i * 17) % 100;
      const on = ph < 62 ? 1 : 0.34;
      return (
        <div key={"sf" + i} style={{ position: "absolute", left: cx * 62 * s, top: cy * 46 * s,
          width: 54 * s, height: 38 * s, borderRadius: 3 * s, background: "#20343A",
          border: `${1.5 * s}px solid #2E4A52` }}>
          {/* each feed has its own little running bar — the room is WORKING */}
          <div style={{ position: "absolute", left: 5 * s, top: 6 * s, width: 30 * s, height: 4 * s,
            borderRadius: 2 * s, background: hexa("#7FB6C0", 0.5 * on) }} />
          <div style={{ position: "absolute", left: 5 * s, bottom: 6 * s, width: 42 * s, height: 5 * s,
            borderRadius: 2 * s, background: "#16262B", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${(ph * 1.6) % 100}%`, background: hexa(SKILL_C[5], 0.9) }} />
          </div>
        </div>
      );
    })}
  </div>
);

/** THE BELT — a full-width high-contrast travelling band, the reel's strongest
    single motion primitive. ⛔ It alternates LIGHT AND SHADOW slats. */
export const LeadBelt: React.FC<{ f: number; x: number; y: number; w: number; h?: number;
  s?: number; z?: number; speed?: number }> =
  ({ f, x, y, w: ww, h: hh = 74, s = 1, z = 30, speed = 4.6 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh * s, zIndex: z,
    overflow: "hidden", borderRadius: 4 * s, background: "#1D2A2E",
    border: `${3 * s}px solid #33474D` }}>
    {Array.from({ length: 26 }, (_, i) => {
      const bx = ((i * 58 * s - f * speed) % (ww + 58 * s) + ww + 58 * s) % (ww + 58 * s) - 58 * s;
      const shadow = i % 2 === 1;
      return (
        <div key={"bs" + i} style={{ position: "absolute", left: bx, top: 0, width: 34 * s,
          height: hh * s, transform: "skewX(-14deg)",
          background: shadow ? "rgba(6,10,12,0.46)" : hexa("#CFE6E2", 0.16) }} />
      );
    })}
    {/* the belt's edge rails, so it reads as machinery not a stripe */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5 * s, background: "#4A6068" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5 * s, background: "#15201F" }} />
  </div>
);

/** a contact card riding the belt. Gets a VERIFIED stamp or is FLICKED into the
    hopper — the reject is what makes "verifies" visible. */
export const ContactCard: React.FC<{ f: number; i: number; x0: number; y: number; speed: number;
  verifyX: number; bad?: boolean; s?: number; z?: number; span?: number }> =
  ({ f, i, x0, y, speed, verifyX, bad = false, s = 1, z = 56, span = 1240 }) => {
  const raw = x0 + f * speed;
  const x = ((raw % span) + span) % span - 150 * s;
  const passed = x > verifyX;
  const overshoot = Math.max(0, x - verifyX);
  const fall = bad && passed ? Math.min(1, overshoot / 150) : 0;
  if (bad && fall >= 1) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y + fall * 150 * s, zIndex: z,
      transform: `rotate(${fall * 62}deg)`, transformOrigin: "50% 50%", opacity: 1 - fall * 0.4 }}>
      <div style={{ width: 128 * s, height: 62 * s, borderRadius: 4 * s, background: "#EDE8DC",
        border: `${2 * s}px solid ${passed && !bad ? SKILL_C[5] : "#C4BCAA"}`, boxShadow: SH }}>
        {/* avatar + two data lines — a real contact card */}
        <div style={{ position: "absolute", left: 7 * s, top: 9 * s, width: 26 * s, height: 26 * s,
          borderRadius: "50%", background: CLAY }} />
        <div style={{ position: "absolute", left: 40 * s, top: 11 * s, width: (44 + (i % 4) * 12) * s,
          height: 6 * s, borderRadius: 2 * s, background: "#8E8A80" }} />
        <div style={{ position: "absolute", left: 40 * s, top: 23 * s, width: (56 + (i % 3) * 10) * s,
          height: 5 * s, borderRadius: 2 * s, background: "#B5AE9E" }} />
        {/* the @ row — this is an EMAIL, which is what gets verified */}
        <div style={{ position: "absolute", left: 7 * s, bottom: 8 * s, width: 112 * s, height: 12 * s,
          borderRadius: 2 * s, background: passed ? (bad ? hexa(RED, 0.20) : hexa(SKILL_C[5], 0.26)) : "#DCD5C6" }}>
          <div style={{ position: "absolute", left: 4 * s, top: 3.5 * s, width: 72 * s, height: 5 * s,
            borderRadius: 2 * s, background: passed ? (bad ? RED : dkh(SKILL_C[5], 0.42)) : "#A9A294" }} />
        </div>
        {passed && !bad && (
          <div style={{ position: "absolute", right: -8 * s, top: -8 * s, width: 30 * s, height: 30 * s,
            borderRadius: "50%", background: SKILL_C[5], display: "flex",
            alignItems: "center", justifyContent: "center", ...ui(17 * s, 900), color: "#12281D" }}>✓</div>
        )}
        {passed && bad && (
          <div style={{ position: "absolute", right: -8 * s, top: -8 * s, width: 30 * s, height: 30 * s,
            borderRadius: "50%", background: RED, display: "flex",
            alignItems: "center", justifyContent: "center", ...ui(17 * s, 900), color: "#FFF" }}>✕</div>
        )}
      </div>
    </div>
  );
};

/** the verify head that stamps the belt, and the reject hopper under it */
export const VerifyHead: React.FC<{ x: number; y: number; f: number; s?: number; z?: number }> =
  ({ x, y, f, s = 1, z = 70 }) => {
  const beat = (f % 26) / 26;
  const down = Math.max(0, Math.sin(beat * Math.PI * 2)) * 22 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the gantry it hangs from */}
      <div style={{ position: "absolute", left: -12 * s, top: -80 * s, width: 128 * s, height: 20 * s,
        borderRadius: 4 * s, background: "#3A4C50" }} />
      <div style={{ position: "absolute", left: 44 * s, top: -60 * s, width: 16 * s,
        height: 46 * s + down, background: "#4A6068" }} />
      <div style={{ position: "absolute", left: 4 * s, top: -14 * s + down, width: 100 * s, height: 34 * s,
        borderRadius: 4 * s, background: "#5A7076", border: `${2 * s}px solid #3A4C50` }}>
        <div style={{ position: "absolute", left: 8 * s, top: 10 * s, right: 8 * s, height: 12 * s,
          borderRadius: 2 * s, background: SKILL_C[5], opacity: down > 12 * s ? 1 : 0.4 }} />
      </div>
    </div>
  );
};

export const Hopper: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 84 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0,
      borderLeft: `${20 * s}px solid transparent`, borderRight: `${20 * s}px solid transparent`,
      borderTop: `${0}px solid transparent` }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 190 * s, height: 118 * s,
      background: "#2A3A3E", borderRadius: `0 0 ${16 * s}px ${16 * s}px`,
      clipPath: "polygon(0 0, 100% 0, 78% 100%, 22% 100%)", border: `${3 * s}px solid #3E555A` }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 190 * s, height: 12 * s,
      background: "#4A6068", borderRadius: 3 * s }} />
  </div>
);

/* ===========================================================================
   S7 — THE ROOF.  VO verbs: ACTIVELY PLANS AND LAUNCHES, MULTI-CHANNEL.
   ⭐⭐ THE PEAK. Light is a SHAPED CONE, never a full-frame fill.
   ========================================================================= */

/** the launch gantry: a real truss with three rails, a lever, and clamps */
export const LaunchGantry: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  pulled?: number }> = ({ x, y, f, s = 1, z = 46, pulled = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* truss — cross-braced, not a plain bar */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 420 * s, height: 16 * s,
      background: "#4A4058" }} />
    <div style={{ position: "absolute", left: 0, top: 74 * s, width: 420 * s, height: 16 * s,
      background: "#3A3246" }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"tb" + i} style={{ position: "absolute", left: (10 + i * 58) * s, top: 14 * s,
        width: 7 * s, height: 62 * s, background: "#443B52",
        transform: `skewX(${i % 2 ? 20 : -20}deg)` }} />
    ))}
    {/* three rails the campaign splits onto */}
    {[0, 1, 2].map((i) => (
      <div key={"rl" + i} style={{ position: "absolute", left: (40 + i * 130) * s, top: -46 * s,
        width: 92 * s, height: 46 * s, borderRadius: `${6 * s}px ${6 * s}px 0 0`,
        background: "#332A40", border: `${2 * s}px solid #4E4160` }} />
    ))}
    {/* the lever */}
    <div style={{ position: "absolute", left: 396 * s, top: -68 * s, width: 10 * s, height: 74 * s,
      background: "#6E5C7A", transformOrigin: "50% 100%",
      transform: `rotate(${-28 + pulled * 56}deg)` }}>
      <div style={{ position: "absolute", left: -8 * s, top: -12 * s, width: 26 * s, height: 20 * s,
        borderRadius: 5 * s, background: RED }} />
    </div>
  </div>
);

/** a channel beam — a SHAPED CONE punching into the sky, one per channel.
    ⛔ Never a full-frame fill (the reel-78 rejection, twice over). */
export const ChannelBeam: React.FC<{ f: number; x: number; y: number; at: number; c?: string;
  s?: number; z?: number; ang?: number; label?: string }> =
  ({ f, x, y, at, c = "#EFCF8C", s = 1, z = 36, ang = 0, label }) => {
  const k = E(f, at, at + 14, 0, 1, OUT);
  if (k <= 0) return null;
  const len = 640 * s * k;
  return (<>
    <div style={{ position: "absolute", left: x, top: y - len, zIndex: z,
      width: 130 * s, height: len, transformOrigin: "50% 100%",
      transform: `translateX(${-65 * s}px) rotate(${ang}deg)`,
      clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
      background: `linear-gradient(0deg, ${hexa(c, 0.46 * k)} 0%, ${hexa(c, 0.02)} 100%)` }} />
    {/* the payload riding up the beam */}
    <div style={{ position: "absolute", left: x - 26 * s + Math.sin(ang * Math.PI / 180) * len * 0.5,
      top: y - len * 0.86, width: 52 * s, height: 34 * s, borderRadius: 5 * s, zIndex: z + 2,
      background: c, opacity: k, transform: `rotate(${ang}deg)` }}>
      <div style={{ position: "absolute", left: 7 * s, top: 8 * s, width: 26 * s, height: 5 * s,
        borderRadius: 2 * s, background: hexa("#2A2008", 0.5) }} />
      <div style={{ position: "absolute", left: 7 * s, top: 19 * s, width: 34 * s, height: 4 * s,
        borderRadius: 2 * s, background: hexa("#2A2008", 0.32) }} />
    </div>
  </>);
};

/* ===========================================================================
   S8 — THE KEYWORD, STRUCK INTO A PLATE (never faded in)
   ========================================================================= */
export const KeywordPlate: React.FC<{ x: number; y: number; f: number; at: number; t: string;
  s?: number; z?: number }> = ({ x, y, f, at, t, s = 1, z = 88 }) => {
  const hit1 = E(f, at, at + 5, 0, 1, IN_Q);
  const hit2 = E(f, at + 11, at + 16, 0, 1, IN_Q);
  const settled = f >= at + 16;
  const sc = settled ? 1 : (f >= at + 11 ? 1 + (1 - hit2) * 0.5 : 1 + (1 - hit1) * 2.1);
  if (f < at) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${sc}) rotate(${rock(f, at + 16, 1.6, 12)}deg)`, transformOrigin: "50% 50%" }}>
      <div style={{ padding: `${16 * s}px ${34 * s}px`, borderRadius: 10 * s,
        background: "#F2EEE4", border: `${5 * s}px solid #2A2620`, boxShadow: SH_D,
        /* ⭐ the keyword is a thing you TYPE, so it is quoted — "MARKETING",
           not MARKETING. It reads as an instruction rather than a label. */
        ...ui(52 * s, 900), color: "#1A1813", letterSpacing: 2.4 }}>{`\u201C${t}\u201D`}</div>
    </div>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE CONTINUOUS MOVERS — added after the first motion audit came back
   at median 3.18 with 9/9 scenes under bar.

   THE DIAGNOSIS, from the audit itself rather than from taste: the two scenes
   that PASSED (LESSIE 8.48, CONTENT 8.12) were the only two with many large
   objects moving continuously across the frame. The five that failed all had the
   same shape — an event, then a HOLD of 52-78%.

   > motion ~= (fraction of the panel repainted per 0.1s) x (luma delta)

   So an object that arrives and stops repaints nothing after it lands, however
   big it is. The components below give each failing scene a CONTINUOUS stream of
   large bright objects, and every one of them is the scene's OWN noun — never a
   generic particle, which is [[feedback_real_marks_are_the_props]].
   ========================================================================= */

/** S0 · more skill crates queueing in behind the hero. The hook's promise
    ("they get increasingly more powerful") drawn as supply, still arriving. */
export const CrateQueue: React.FC<{ f: number; y: number; n?: number; s?: number;
  z?: number; speed?: number; span?: number }> =
  ({ f, y, n = 4, s = 0.86, z = 26, speed = 5.2, span = 1300 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const x = span - (((f * speed) + i * (span / n)) % span);
      return (
        <div key={"cq" + i} style={{ position: "absolute", left: x - 200, top: y + (i % 2) * 26,
          zIndex: z + (i % 2) }}>
          <SkillCrate x={0} y={0} f={f} s={s} z={z} c={SKILL_C[(i + 1) % 7]}
            t="" rot={Math.sin(f / 23 + i) * 5} />
        </div>
      );
    })}
  </>);

/** S4 · the four cables CARRY something once they are live. "Wired straight
    into" is a flow, not a connection — so large bright packets run the whole
    length of each cable, continuously, for the rest of the scene. */
export const CablePulse: React.FC<{ f: number; at: number; x0: number; y0: number;
  x1: number; y1: number; c?: string; s?: number; z?: number; n?: number; speed?: number }> =
  ({ f, at, x0, y0, x1, y1, c = SKILL_C[3], s = 1, z = 50, n = 4, speed = 0.022 }) => {
  if (f < at) return null;
  const lf = f - at;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const t = ((lf * speed) + i / n) % 1;
      const midY = y0 + (y1 - y0) * 0.62 + 40 * s;
      /* quadratic bezier, the same curve `Cable` draws */
      const mx = x0 + (x1 - x0) * 0.42;
      const px = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1;
      const py = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * midY + t * t * y1;
      return (
        <div key={"cp" + i} style={{ position: "absolute", left: px - 17 * s, top: py - 10 * s,
          /* ⛔ was 34x20 and contributed almost nothing at 0.237 scale */
          width: 74 * s, height: 46 * s, borderRadius: 8 * s, background: c, zIndex: z,
          opacity: 0.94 }}>
          <div style={{ position: "absolute", left: 11 * s, top: 12 * s, width: 40 * s,
            height: 6 * s, borderRadius: 3 * s, background: hexa("#12161F", 0.42) }} />
          <div style={{ position: "absolute", left: 11 * s, top: 26 * s, width: 26 * s,
            height: 6 * s, borderRadius: 3 * s, background: hexa("#12161F", 0.28) }} />
        </div>
      );
    })}
  </>);
};

/** S5 · the ARGUMENT, travelling. A debate is things crossing a table, so
    speech shapes fly between the councillors continuously — large, bright, and
    on the scene's own noun rather than a generic mote. */
export const ArgumentFlight: React.FC<{ f: number; y: number; x0?: number; x1?: number;
  n?: number; s?: number; z?: number; speed?: number }> =
  ({ f, y, x0 = 96, x1 = 916, n = 5, s = 1, z = 52, speed = 5.0 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const span = x1 - x0 + 240;
      const back = i % 2 === 1;
      const raw = ((f * speed) + i * (span / n)) % span;
      const x = back ? x1 - raw : x0 + raw - 120;
      const yy = y - Math.sin((raw / span) * Math.PI) * 58 * s - (i % 3) * 18;
      const w = (132 + (i % 3) * 36) * s, h = 62 * s;
      const c = back ? "#E8B4C4" : SKILL_C[4];
      /* ⛔ these were plain rounded rects — "blocky". A speech bubble needs a
         TAIL and a tilt to read as speech rather than as another card. */
      return (
        <div key={"af" + i} style={{ position: "absolute", left: x, top: yy, zIndex: z,
          transform: `rotate(${(back ? 5 : -5) + Math.sin(f / 13 + i) * 2.4}deg)` }}>
          <div style={{ width: w, height: h, borderRadius: h / 2, background: c,
            border: `${3 * s}px solid ${dkh(c, 0.28)}` }} />
          <div style={{ position: "absolute", left: back ? w - 44 * s : 26 * s, top: h - 6 * s,
            width: 0, height: 0, borderTop: `${22 * s}px solid ${c}`,
            ...(back ? { borderLeft: `${20 * s}px solid transparent` }
                     : { borderRight: `${20 * s}px solid transparent` }) }} />
          <div style={{ position: "absolute", left: 20 * s, top: 18 * s,
            width: (44 + (i % 4) * 16) * s, height: 8 * s, borderRadius: 4 * s,
            background: hexa("#2A141C", 0.42) }} />
          <div style={{ position: "absolute", left: 20 * s, top: 34 * s,
            width: (26 + (i % 3) * 14) * s, height: 7 * s, borderRadius: 4 * s,
            background: hexa("#2A141C", 0.26) }} />
        </div>
      );
    })}
  </>);

/** ⭐ a proposal SHOVED into the middle of the table, which another councillor
    can shove straight back out. This is what turns a room of people leaning into
    a debate: things get PUT ON THE TABLE and taken off it. */
export const Proposal: React.FC<{ f: number; at: number; x0: number; x1: number; y: number;
  killAt?: number; s?: number; z?: number; c?: string; win?: boolean }> =
  ({ f, at, x0, x1, y, killAt, s = 1, z = 60, c = "#C88FA8", win = false }) => {
  const k = E(f, at, at + 14, 0, 1, BACK);
  if (k <= 0) return null;
  const dead = killAt !== undefined && f >= killAt;
  const kk = dead ? E(f, killAt as number, (killAt as number) + 16, 0, 1, IN_Q) : 0;
  if (kk >= 1) return null;
  const x = x0 + (x1 - x0) * k + kk * 420 * (x1 > x0 ? 1 : -1);
  return (
    <div style={{ position: "absolute", left: x, top: y - kk * 120, zIndex: z,
      transform: `rotate(${(1 - k) * 22 + kk * 70}deg) scaleY(${squash(f, at + 13, 0.20)})`,
      opacity: 1 - kk * 0.5 }}>
      <div style={{ width: 152 * s, height: 96 * s, borderRadius: 9 * s,
        background: win ? "#F2EEE4" : "#DCD3C4",
        border: `${4 * s}px solid ${win ? c : "#B4AB9C"}`, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 14 * s, top: 14 * s, width: 78 * s,
          height: 12 * s, borderRadius: 4 * s, background: win ? c : "#A39A8C" }} />
        {[0, 1].map((j) => (
          <div key={j} style={{ position: "absolute", left: 14 * s, top: (40 + j * 18) * s,
            width: (100 - j * 30) * s, height: 9 * s, borderRadius: 4 * s,
            background: win ? hexa(dkh(c, 0.34), 0.5) : "#BEB5A6" }} />
        ))}
      </div>
    </div>
  );
};

/** S2 · the ladder is a LIVE board — the rungs you are not on keep re-ranking,
    continuously, so the shaft never holds. */
export const LadderChurn: React.FC<{ f: number; x: number; y: number; n?: number;
  s?: number; z?: number; rowH?: number; skip?: number }> =
  ({ f, x, y, n = 7, s = 1, z = 34, rowH = 62, skip = -1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      if (i === skip) return null;
      /* ⛔ v1 animated a 7px line inside each rung and the scene moved 0.03.
         7px * 0.237 = 1.7px, i.e. invisible to the audit AND to a viewer.
         Now the WHOLE RUNG (340 x 53) slides in and out of the shaft on its own
         clock — a competitor page overtaking, which is also what the line means. */
      const ph = ((f * 1.9) + i * 43) % 190;
      const slide = ph < 95 ? (ph / 95) : (1 - (ph - 95) / 95);
      const dx = (i % 2 ? 1 : -1) * (1 - slide) * 300 * s;
      return (
        <div key={"lc" + i} style={{ position: "absolute", left: x + dx, top: y + i * rowH * s,
          width: 340 * s, height: (rowH - 9) * s, borderRadius: 4 * s, zIndex: z,
          background: "#93AECC", border: `${2 * s}px solid #6E8CAE`, opacity: 0.95 }}>
          <div style={{ position: "absolute", left: 10 * s, top: 12 * s, width: 30 * s,
            height: 30 * s, borderRadius: 5 * s, background: "#5A7796" }} />
          {Array.from({ length: 3 }, (_, j) => (
            <div key={"lcl" + j} style={{ position: "absolute", left: 52 * s, top: (11 + j * 13) * s,
              width: (110 + ((i * 31 + j * 47) % 150)) * s, height: 9 * s, borderRadius: 4 * s,
              background: hexa("#22354E", 0.56 - j * 0.12) }} />
          ))}
        </div>
      );
    })}
  </>);

/** S7 · MULTI-CHANNEL IS A FLOW. One payload per beam is a state change; a
    continuous stream up all three rails is the launch actually running. */
export const BeamStream: React.FC<{ f: number; at: number; x: number; y: number;
  ang?: number; c?: string; s?: number; z?: number; n?: number; speed?: number; len?: number }> =
  ({ f, at, x, y, ang = 0, c = "#EFCF8C", s = 1, z = 40, n = 5, speed = 0.020, len = 640 }) => {
  if (f < at) return null;
  const lf = f - at;
  const rad = (ang * Math.PI) / 180;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const t = ((lf * speed) + i / n) % 1;
      const d = t * len * s;
      const px = x + Math.sin(rad) * d, py = y - Math.cos(rad) * d;
      const sz = (56 - t * 18) * s;
      return (
        <div key={"bs" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz * 0.32,
          width: sz, height: sz * 0.64, borderRadius: 6 * s, background: c, zIndex: z,
          opacity: 0.95 - t * 0.35, transform: `rotate(${ang}deg)` }}>
          <div style={{ position: "absolute", left: sz * 0.14, top: sz * 0.16, width: sz * 0.52,
            height: sz * 0.09, borderRadius: sz * 0.05, background: hexa("#2A2008", 0.46) }} />
          <div style={{ position: "absolute", left: sz * 0.14, top: sz * 0.34, width: sz * 0.66,
            height: sz * 0.08, borderRadius: sz * 0.05, background: hexa("#2A2008", 0.30) }} />
        </div>
      );
    })}
  </>);
};

/** S2a/S2c · the shaft's own TRAFFIC — competitor pages riding past the frame
    continuously. ⛔ SEO stayed at 5.13 after a whole new component because the
    churn only covered sub-shot 2b (78 of its 219 frames). 2a and 2c had nothing
    running at all. Each slab is 300x74, well over the 40px short-side floor. */
export const PageTraffic: React.FC<{ f: number; y: number; n?: number; s?: number;
  z?: number; speed?: number; span?: number; c?: string; dir?: 1 | -1; rows?: number }> =
  ({ f, y, n = 5, s = 1, z = 26, speed = 6.2, span = 1420, c = "#8FAECF", dir = 1, rows = 2 }) => (<>
    {Array.from({ length: n * rows }, (_, i) => {
      const row = Math.floor(i / n), k = i % n;
      const raw = ((f * (speed + row * 1.3)) + k * (span / n) + row * 180) % span;
      const x = dir > 0 ? raw - 320 : span - raw - 320;
      return (
        <div key={"pt" + i} style={{ position: "absolute", left: x, top: y + row * 104 * s,
          width: 300 * s, height: 74 * s, borderRadius: 5 * s, zIndex: z + row,
          background: c, border: `${2 * s}px solid ${dkh(c, 0.26)}`, opacity: 0.96 - row * 0.10 }}>
          <div style={{ position: "absolute", left: 10 * s, top: 12 * s, width: 34 * s,
            height: 34 * s, borderRadius: 5 * s, background: dkh(c, 0.34) }} />
          {Array.from({ length: 3 }, (_, j) => (
            <div key={"ptl" + j} style={{ position: "absolute", left: 56 * s, top: (13 + j * 17) * s,
              width: (90 + ((i * 37 + j * 53) % 130)) * s, height: 9 * s, borderRadius: 4 * s,
              background: hexa(dkh(c, 0.44), 0.62 - j * 0.12) }} />
          ))}
        </div>
      );
    })}
  </>);

/** S0 · once bay 1 is lit, WORK COMES OUT OF IT — content pieces streaming from
    the bay down to the desk, continuously. The hook's promise is not that a light
    came on, it is that the thing started producing. */
export const BayOutput: React.FC<{ f: number; at: number; x: number; y: number;
  x1: number; y1: number; n?: number; s?: number; z?: number; speed?: number; c?: string }> =
  ({ f, at, x, y, x1, y1, n = 5, s = 1, z = 64, speed = 0.017, c = "#7FC0C9" }) => {
  if (f < at) return null;
  const lf = f - at;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const t = ((lf * speed) + i / n) % 1;
      const px = x + (x1 - x) * t;
      const py = y + (y1 - y) * t - Math.sin(t * Math.PI) * 70 * s;
      return (
        <div key={"bo" + i} style={{ position: "absolute", left: px - 43 * s, top: py - 28 * s,
          width: 86 * s, height: 56 * s, borderRadius: 7 * s, zIndex: z,
          background: mxh(c, 0.52), border: `${2 * s}px solid ${dkh(c, 0.22)}`,
          transform: `rotate(${Math.sin(t * 6 + i) * 12}deg)`, opacity: 0.96 }}>
          <div style={{ position: "absolute", left: 9 * s, top: 10 * s, width: 46 * s,
            height: 7 * s, borderRadius: 3 * s, background: hexa("#14343C", 0.44) }} />
          <div style={{ position: "absolute", left: 9 * s, top: 24 * s, width: 62 * s,
            height: 6 * s, borderRadius: 3 * s, background: hexa("#14343C", 0.28) }} />
          <div style={{ position: "absolute", left: 9 * s, top: 36 * s, width: 34 * s,
            height: 6 * s, borderRadius: 3 * s, background: hexa("#14343C", 0.22) }} />
        </div>
      );
    })}
  </>);
};

/* ===========================================================================
   ⭐⭐⭐ THE REPO CARD — Alex, round 1: *"I want to see, like, a GitHub card
   showing, like, the stars and stuff like that for each of these plugins or
   skills."*

   This is the RECEIPT the playbook keeps asking for and the reel did not have:
   every claim was being carried by a tag chip, which labels but does not prove.
   A card with the real owner/name, the real star count, the real fork count and
   the real language is the frame where the receipts live.

   ⛔ EVERY NUMBER ON IT COMES FROM `MktWorld.R1..R7`, read from the GitHub API on
      build day. No scene is allowed to typeset one of its own.
   ⛔ It ARRIVES, it does not fade: 8-frame land, squash, and the star count
      COUNTS UP to its value rather than being typeset at it
      ([[feedback_graphical_over_textual]]: a number MOVES to its value).
   ========================================================================= */
export const RepoCard: React.FC<{ f: number; at: number; x: number; y: number;
  owner: string; name: string; stars: number; forks?: number; lang?: string;
  langC?: string; desc?: string; s?: number; z?: number; c?: string }> =
  ({ f, at, x, y, owner, name, stars, forks, lang, langC = "#3572A5", desc,
     s = 1, z = 86, c = "#E7B24C" }) => {
  const k = E(f, at, at + 8, 0, 1, BACK);
  if (k <= 0) return null;
  /* ⭐ the star count TRAVELS to its value — it is never typeset at it */
  const shown = Math.round(stars * E(f, at + 6, at + 30, 0, 1, OUT));
  const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
  const W_ = 470 * s, H_ = 206 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y + (1 - k) * 46 * s, zIndex: z,
      width: W_, height: H_, borderRadius: 12 * s, opacity: Math.min(1, k * 1.5),
      background: "#F7F5F0", border: `${3 * s}px solid #D8D2C4`, boxShadow: SH_D,
      transform: `scaleY(${squash(f, at + 7, 0.16)})`, transformOrigin: "50% 100%" }}>
      {/* the header strip, with the mark — this is a GitHub card, so it says so */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44 * s,
        borderRadius: `${9 * s}px ${9 * s}px 0 0`, background: "#24292F" }}>
        <div style={{ position: "absolute", left: 14 * s, top: 10 * s, width: 24 * s,
          height: 24 * s, borderRadius: "50%", background: "#F7F5F0" }} />
        <div style={{ position: "absolute", left: 19 * s, top: 15 * s, width: 14 * s,
          height: 14 * s, borderRadius: "50%", background: "#24292F" }} />
        <div style={{ position: "absolute", left: 48 * s, top: 13 * s,
          ...mono(15 * s), color: "#B6BFC9" }}>github.com</div>
      </div>
      {/* owner / name */}
      <div style={{ position: "absolute", left: 20 * s, top: 58 * s,
        ...mono(17 * s), color: "#6E7681" }}>{owner} /</div>
      <div style={{ position: "absolute", left: 20 * s, top: 80 * s,
        ...mono(25 * s, 800), color: "#0A58CA", maxWidth: W_ - 40 * s,
        overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{name}</div>
      {desc && (
        <div style={{ position: "absolute", left: 20 * s, top: 112 * s, right: 20 * s,
          ...ui(15 * s, 600), color: "#4A4F57", lineHeight: 1.25 }}>{desc}</div>
      )}
      {/* the stat row — star, fork, language dot, exactly as GitHub lays it out */}
      <div style={{ position: "absolute", left: 20 * s, bottom: 16 * s, display: "flex",
        alignItems: "center", gap: 20 * s }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 * s }}>
          <StarGlyph s={s} c={c} />
          <span style={{ ...mono(23 * s, 800), color: "#1A1813" }}>{fmt(shown)}</span>
        </div>
        {forks !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 * s }}>
            <ForkGlyph s={s} />
            <span style={{ ...mono(19 * s, 700), color: "#4A4F57" }}>{fmt(forks)}</span>
          </div>
        )}
        {lang && (
          <div style={{ display: "flex", alignItems: "center", gap: 7 * s }}>
            <div style={{ width: 13 * s, height: 13 * s, borderRadius: "50%", background: langC }} />
            <span style={{ ...ui(16 * s, 700), color: "#4A4F57" }}>{lang}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const StarGlyph: React.FC<{ s: number; c: string }> = ({ s, c }) => (
  <svg width={22 * s} height={22 * s} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path fill={c} d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9z" />
  </svg>
);
const ForkGlyph: React.FC<{ s: number }> = ({ s }) => (
  <svg width={19 * s} height={19 * s} viewBox="0 0 24 24" style={{ display: "block" }}>
    <g fill="none" stroke="#6E7681" strokeWidth={2.6}>
      <circle cx="6" cy="5" r="2.6" /><circle cx="18" cy="5" r="2.6" /><circle cx="12" cy="19" r="2.6" />
      <path d="M6 7.6v2.2a2.6 2.6 0 0 0 2.6 2.6h6.8A2.6 2.6 0 0 0 18 9.8V7.6M12 12.4v4" />
    </g>
  </svg>
);

/** Lessie is a PRODUCT, not a repo, so it gets a product card and never a fake
    star count. ⛔ Inventing a repo for it would be the reel-99 ledger error: a
    made-up number on a receipt-shaped object is the most believable kind of wrong. */
export const SiteCard: React.FC<{ f: number; at: number; x: number; y: number;
  site: string; name: string; stat: string; statLabel: string; desc?: string;
  s?: number; z?: number; c?: string }> =
  ({ f, at, x, y, site, name, stat, statLabel, desc, s = 1, z = 86, c = "#8FD1A8" }) => {
  const k = E(f, at, at + 8, 0, 1, BACK);
  if (k <= 0) return null;
  const W_ = 470 * s, H_ = 206 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y + (1 - k) * 46 * s, zIndex: z,
      width: W_, height: H_, borderRadius: 12 * s, opacity: Math.min(1, k * 1.5),
      background: "#F7F5F0", border: `${3 * s}px solid #D8D2C4`, boxShadow: SH_D,
      transform: `scaleY(${squash(f, at + 7, 0.16)})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44 * s,
        borderRadius: `${9 * s}px ${9 * s}px 0 0`, background: dkh(c, 0.62),
        ...mono(15 * s), color: mxh(c, 0.60), display: "flex", alignItems: "center",
        paddingLeft: 16 * s }}>{site}</div>
      <div style={{ position: "absolute", left: 20 * s, top: 62 * s,
        ...ui(32 * s, 900), color: "#1A1813" }}>{name}</div>
      {desc && (
        <div style={{ position: "absolute", left: 20 * s, top: 104 * s, right: 20 * s,
          ...ui(15 * s, 600), color: "#4A4F57", lineHeight: 1.25 }}>{desc}</div>
      )}
      <div style={{ position: "absolute", left: 20 * s, bottom: 14 * s, display: "flex",
        alignItems: "baseline", gap: 10 * s }}>
        <span style={{ ...mono(30 * s, 800), color: dkh(c, 0.52) }}>{stat}</span>
        <span style={{ ...ui(15 * s, 700), color: "#6E7681", letterSpacing: 0.6 }}>{statLabel}</span>
      </div>
    </div>
  );
};

/* ===========================================================================
   ⭐⭐⭐ REAL ACTIONS — the round-1 note, and it is the reel-107 lesson arriving
   a second time at a finer grain.

   Alex: *"it's just, like, back and forth motion for the [Claude] sprites. They're
   not actually doing stuff. Either they're just bouncing around or they're just
   moving back and forth. I'd like to see them, like, move around or actually do
   something."*

   ⛔ WHAT I GOT WRONG. Reel 107's fix was "give a landed sprite an ACTION LOOP,
   not an idle", and I implemented that literally: PACE oscillated +-22px, HOP
   bounced in place, LOOK turned a head. Every one of those is still an IDLE — it
   is a sprite marking time at a fixed address. **The distinction that matters is
   not idle-vs-loop, it is WHETHER THE SPRITE CHANGES THE WORLD.** A sprite that
   walks 700px across the set, hauls something, or pulls a lever that visibly
   moves is DOING; a sprite oscillating about its own centre is decorating,
   however many harmonics the oscillation has.

   ⭐ These four all TRAVERSE or ACT ON AN OBJECT, and the object responds.
   ========================================================================= */

/** walks a REAL distance across the set, turns at the end, walks back. Stride
    lift, arm swing, and the body FLIPS to face travel. ⛔ The distance is the
    point: `x0`->`x1` should be most of the panel, never a wobble. */
export const Walker: React.FC<{ f: number; x0: number; x1: number; y: number; s?: number;
  z?: number; period?: number; phase?: number; carry?: React.ReactNode } & Record<string, any>> =
  ({ f, x0, x1, y, s = 150, z = 60, period = 190, phase = 0, carry, ...m }) => {
  const t = (f + phase) % period;
  const half = period / 2;
  const fwd = t < half;
  const k = fwd ? t / half : 1 - (t - half) / half;
  const ease = k < 0.12 ? (k / 0.12) * 0.12 : k > 0.88 ? 0.88 + ((k - 0.88) / 0.12) * 0.12 : k;
  const x = x0 + (x1 - x0) * ease;
  const stride = Math.abs(Math.sin((f + phase) / 5.2));
  const lift = stride * 11;
  /* the body leans INTO the direction of travel and rocks with each stride —
     no limb, and it reads as a walk because the whole mass is moving */
  const gait = Math.sin((f + phase) / 5.2) * 5.4 + Math.sin((f + phase) / 2.6) * 1.6;
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62 - lift, zIndex: z,
      transform: `scaleX(${fwd ? 1 : -1}) rotate(${gait}deg)`,
      transformOrigin: "50% 92%" }}>
      <Contact x={s * 0.05} y={s * 0.96 + lift} w={s * 0.82} z={-1} o={0.34} />
      <Mascot lf={f + phase} size={s} {...m} />
      {carry && (
        <div style={{ position: "absolute", left: s * 0.74, top: s * 0.10 - lift * 0.4 }}>{carry}</div>
      )}
    </div>
  );
};

/** two sprites HAND AN OBJECT OVER: one carries it in, the other takes it and
    carries it out. The object is the point; the sprites are the verb. */
export const Handoff: React.FC<{ f: number; at: number; x0: number; xMid: number; x1: number;
  y: number; s?: number; z?: number; obj: React.ReactNode; dur?: number }> =
  ({ f, at, x0, xMid, x1, y, s = 150, z = 62, obj, dur = 120 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inK = E(f, at, at + dur * 0.42, 0, 1, IO);
  const outK = E(f, at + dur * 0.52, at + dur, 0, 1, IO);
  const ax = x0 + (xMid - x0) * inK;
  const bx = xMid + (x1 - xMid) * outK;
  const held = outK <= 0;
  const stride = (p: number) => Math.abs(Math.sin((f + p) / 5.2)) * 9;
  return (<>
    {/* the carrier walks in and stops */}
    {inK < 1.0 && (
      <div style={{ position: "absolute", left: ax - s / 2, top: y - s * 0.62 - stride(0), zIndex: z }}>
        <Contact x={s * 0.05} y={s * 0.96} w={s * 0.82} z={-1} o={0.34} />
        <Mascot lf={f} size={s} {...(costumeFor(3) as any)} />
      </div>
    )}
    {/* the receiver walks out with it */}
    {outK > 0 && (
      <div style={{ position: "absolute", left: bx - s / 2, top: y - s * 0.62 - stride(9), zIndex: z + 1,
        transform: "scaleX(-1)", transformOrigin: "50% 92%" }}>
        <Contact x={s * 0.05} y={s * 0.96} w={s * 0.82} z={-1} o={0.34} />
        <Mascot lf={f + 9} size={s} {...(costumeFor(7) as any)} />
      </div>
    )}
    {/* THE OBJECT — it is what actually crosses the frame */}
    <div style={{ position: "absolute", left: (held ? ax : bx) + s * 0.34, top: y - s * 0.86,
      zIndex: z + 2, transform: `rotate(${Math.sin(f / 7) * 4}deg)` }}>{obj}</div>
  </>);
};

/** a sprite at a machine that PULLS SOMETHING THAT MOVES. `onPull` receives the
    0..1 lever position so the caller can drive the machine off the same clock —
    the whole point is that the world responds to the sprite. */
export const Operator: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  period?: number; phase?: number; lever?: (k: number) => React.ReactNode }
  & Record<string, any>> =
  ({ f, x, y, s = 160, z = 62, period = 74, phase = 0, lever, ...m }) => {
  const t = (f + phase) % period;
  const k = t < period * 0.22 ? t / (period * 0.22)
          : t < period * 0.46 ? 1 - (t - period * 0.22) / (period * 0.24) : 0;
  /* he LEANS AND SINKS into the pull — the tell is the lever moving with him */
  const reach = k * s * 0.26;
  return (<>
    {lever && lever(k)}
    <div style={{ position: "absolute", left: x - s / 2 + reach * 0.6, top: y - s * 0.62 + k * s * 0.06,
      zIndex: z, transform: `rotate(${k * 15}deg) scaleY(${1 - k * 0.05})`,
      transformOrigin: "50% 92%" }}>
      <Contact x={s * 0.05} y={s * 0.96} w={s * 0.82} z={-1} o={0.34} />
      <Mascot lf={f + phase} size={s} {...m} />
    </div>
  </>);
};

/** a sprite that CLIMBS — hand over hand, actually gaining height. Used where
    the scene's verb is vertical. */
export const Climber: React.FC<{ f: number; x: number; y0: number; y1: number; s?: number;
  z?: number; period?: number; phase?: number } & Record<string, any>> =
  ({ f, x, y0, y1, s = 130, z = 60, period = 150, phase = 0, ...m }) => {
  const t = (f + phase) % period;
  const k = t / period;
  const y = y0 + (y1 - y0) * k;
  const reach = Math.sin(t / 6.4);
  return (
    <div style={{ position: "absolute", left: x - s / 2 + reach * s * 0.10, top: y - s * 0.62, zIndex: z,
      transform: `rotate(${reach * 9}deg) scaleY(${1 + Math.abs(reach) * 0.05})`,
      transformOrigin: "50% 92%", opacity:
        k < 0.06 ? k / 0.06 : k > 0.92 ? (1 - k) / 0.08 : 1 }}>
      <Mascot lf={f + phase} size={s} {...m} />
    </div>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE HOOK'S TOOL WALL — round 3.
   Alex: *"in the first 5 seconds there needs to be an interesting action scene,
   it's just him walking or floating around not doing much so it's boring… it
   actually has to be doing stuff, maybe some action climax story… and also real
   logo graphics if possible in the first 5 secs doing stuff."*

   ⛔ WHAT WAS WRONG: the hook's only event was ONE crate at 1.5s, and the other
   four seconds were a sprite traversing. Traversal fixed the "idle" note but a
   walk is not a STORY — there was no escalation and no climax.

   ⭐ The rebuild is an ESCALATING BARRAGE: eight impacts, accelerating, each one
   lighting a real marketing tool, climaxing on the board igniting. That is also
   the literal VO line — *"they get increasingly more powerful"*.

   ⛔⛔ AND AN HONESTY CALL. The obvious version of this shot is the paid stack
   being SMASHED with price tags falling to $0. Two things kill it: a per-brand
   monthly price is an unsourced number on a receipt-shaped object (the reel-99
   ledger error), and the marketing plugin **integrates with** HubSpot, Slack and
   Canva — so destroying them would have the hook contradict S4. The tiles
   therefore POWER ON rather than fall, which is both true and the better shot.
   ========================================================================= */
export const TOOLS: Array<{ t: string; logo: string; c: string }> = [
  { t: "HubSpot",  logo: "logos/hubspot.svg",  c: "#FF7A59" },
  { t: "Canva",    logo: "logos/canva.svg",    c: "#7FD3E0" },
  { t: "Figma",    logo: "logos/figma.svg",    c: "#A259FF" },
  { t: "Slack",    logo: "logos/slack.svg",    c: "#ECB22E" },
  { t: "Notion",   logo: "logos/notion.svg",   c: "#E8E4DA" },
  { t: "Airtable", logo: "logos/airtable.svg", c: "#FCB400" },
  { t: "Buffer",   logo: "logos/buffer.svg",   c: "#231F20" },
  { t: "Zapier",   logo: "logos/zapier.svg",   c: "#FF4F00" },
];

/** one row of eight real marks on white tiles. `litAt[i]` is the frame tile i
    powers on; before that it sits dark-but-pale so frame 0 keeps its luma. */
export const ToolWall: React.FC<{ f: number; x: number; y: number; litAt: number[];
  s?: number; z?: number; tile?: number; pitch?: number }> =
  ({ f, x, y, litAt, s = 1, z = 42, tile = 96, pitch = 112 }) => (<>
    {/* the rail they are mounted on — they are ON something, not floating */}
    <div style={{ position: "absolute", left: x - 30, width: pitch * 8 + 24, top: y + tile * s + 8,
      height: 14 * s, borderRadius: 3, background: "#4A5674", zIndex: z - 1 }} />
    {TOOLS.map((w, i) => {
      const on = f >= litAt[i];
      const pop = squash(f, litAt[i], 0.42);
      const rk = rock(f, litAt[i], 5.0, 18);
      /* once lit it keeps working: a slow breathing tilt, never a dead tile */
      /* ⭐ THEY VIBRATE. Alex: *"the diff logos should be like shaking and stuff
         vibrating in the middle band."* A tile that powers on and then sits
         still is a badge. Each one now KICKS hard on power-on (a machine coming
         under load) and then keeps a permanent hum on its own phase and rate, so
         the band is never a still row. */
      const age = on ? f - litAt[i] : 0;
      const kick = on ? Math.exp(-age / 9) : 0;
      /* ⭐ every tile feels EVERY impact, falling off with distance along the
         rail — so the rail shudders as one object instead of eight independent
         pops. This is most of what makes 0-3s read as a barrage. */
      const jolt = litAt.reduce((acc, t, j) => {
        const d = f - t;
        if (d < 0 || d > 14) return acc;
        const decay = Math.exp(-d / 5) * (1 - d / 14);
        return acc + decay * 13 / (1 + Math.abs(i - j) * 0.7);
      }, 0);
      const hum = on ? 1 : 0;
      const vx = hum * (Math.sin(f / 2.6 + i * 1.7) * (1.6 + kick * 9)
                      + Math.sin(f / 7.3 + i) * 1.1)
               + Math.sin(f * 1.9 + i * 2.1) * jolt;
      const vy = hum * (Math.cos(f / 3.1 + i * 2.3) * (1.3 + kick * 7)
                      + Math.cos(f / 9.1 + i) * 0.9)
               + Math.cos(f * 2.3 + i * 1.3) * jolt * 0.8;
      const live = hum * (Math.sin(f / 2.2 + i * 1.1) * (0.9 + kick * 5)
                        + Math.sin((f - litAt[i]) / 17 + i) * 1.4)
                 + Math.sin(f * 2.1 + i) * jolt * 0.5;
      return (
        <React.Fragment key={"tw" + i}>
          <div style={{ position: "absolute", left: x + i * pitch, top: y, zIndex: z,
            width: tile * s, height: tile * s, borderRadius: 15 * s,
            background: on ? "#FFFFFF" : "#BFBAAE",
            border: `${3 * s}px solid ${on ? hexa(w.c, 0.85) : "#A39E93"}`,
            boxShadow: SH, opacity: on ? 1 : 0.72,
            transform: `translate(${vx}px, ${vy}px) scale(${pop}) rotate(${rk * 0.5 + live}deg)`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(w.logo)}
              style={{ width: tile * 0.58 * s, height: tile * 0.58 * s, objectFit: "contain",
                filter: on ? "none" : "grayscale(1) opacity(0.45)" }} />
          </div>
          {/* the power-on costs something */}
          <Ring x={x + i * pitch + tile * s / 2} y={y + tile * s * 0.7} f={f} at={litAt[i]}
            c={w.c} max={150} z={z + 1} />
          {/* ⭐ and then it DOES something: a lit tile emits work to its neighbour */}
          {on && i < TOOLS.length - 1 && (
            <ToolTraffic f={f} at={litAt[i] + 10} x0={x + i * pitch + tile * s}
              x1={x + (i + 1) * pitch} y={y + tile * s * 0.42} c={w.c} s={s} z={z + 2} />
          )}
        </React.Fragment>
      );
    })}
  </>);

/** little work packets running between two lit tiles — the wall is a SYSTEM */
const ToolTraffic: React.FC<{ f: number; at: number; x0: number; x1: number; y: number;
  c: string; s?: number; z?: number; n?: number }> =
  ({ f, at, x0, x1, y, c, s = 1, z = 44, n = 2 }) => {
  if (f < at) return null;
  const lf = f - at;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const t = ((lf * 0.030) + i / n) % 1;
      return (
        <div key={"tt" + i} style={{ position: "absolute", left: x0 + (x1 - x0) * t - 9 * s,
          top: y - 9 * s, width: 18 * s, height: 18 * s, borderRadius: 5 * s,
          background: c, zIndex: z, opacity: 0.9 }} />
      );
    })}
  </>);
};

/** THE BARRAGE — crates arriving on an ACCELERATING cadence, each bigger than
    the last, alternating sides. ⛔ They carry no skill name: they are POWER
    arriving, not the seven items, so the hook does not pre-empt the body. */
export const CrateBarrage: React.FC<{ f: number; hits: number[]; targets: number[];
  yTarget: number; s0?: number; s1?: number; z?: number; travel?: number }> =
  ({ f, hits, targets, yTarget, s0 = 0.42, s1 = 0.86, z = 76, travel = 13 }) => (<>
    {hits.map((h, i) => {
      const k = E(f, h - travel, h, 0, 1, IN_Q);
      if (k <= 0 || f > h + 2) return null;
      const fromL = i % 2 === 0;
      const sc = s0 + (s1 - s0) * (i / Math.max(hits.length - 1, 1));
      const x = (fromL ? -260 : 1180) + k * ((targets[i] - (fromL ? -260 : 1180)));
      const y = 150 + k * (yTarget - 150) - Math.sin(k * Math.PI) * 60;
      return (
        <SkillCrate key={"cb" + i} x={x} y={y} f={f} s={sc} z={z + i}
          c={SKILL_C[i % SKILL_C.length]} t=""
          rot={(fromL ? -1 : 1) * (34 - k * 34)} />
      );
    })}
  </>);

/* ===========================================================================
   ⭐⭐⭐ THE BIG RIGS — round 4.
   Alex: *"so many scenes like the second scene is way too boring, not enough
   stuff… the first and second scene after the hook are horrible, they are not
   interesting enough whatsoever and they dont do enough either."*

   ⛔ AND BOTH SCENES WERE ALREADY ABOVE THE MOTION BAR (S1 11.32, S2 10.20).
   That is the metric being satisfied the wrong way, exactly as ANIMATION-QUALITY
   §9 warns: a wall of small tiles scrolling forever scores well because a lot of
   pixels change, and reads as wallpaper because nothing HAPPENS to anything.

   ⭐ What both scenes lacked was a HERO OBJECT — one big machine, most of the
   panel, with a legible before and after, and a Claude visibly running it.
   These two rigs are built to that shape: intake -> a head that SLAMS -> output.
   ========================================================================= */

/** S1 · THE OUTLIER RIG. Creator posts ride in, a scanner sweeps them, the one
    that is an outlier gets SEIZED by a claw and pressed into your content plan.
    "Tracks top creators and turns their patterns into your next content" —
    tracks = the sweep, turns into = the press. */
export const OutlierRig: React.FC<{ f: number; x: number; y: number; s?: number;
  z?: number; grabs: number[]; c?: string }> =
  ({ f, x, y, s = 1, z = 40, grabs, c = TEAL }) => {
  const W_ = 760 * s, H_ = 300 * s;
  /* the claw runs one cycle per grab: down, seize, up */
  const g = grabs.find((t) => f >= t - 10 && f < t + 26);
  const gk = g === undefined ? 0
    : f < g ? E(f, g - 10, g, 0, 1, IN_Q)
    : 1 - E(f, g + 6, g + 26, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* housing */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W_, height: H_,
        borderRadius: 12 * s, background: "#5E8894", border: `${5 * s}px solid #7FAEB8`,
        boxShadow: SH_D }} />
      {/* the intake mouth on the left, the output chute on the right */}
      <div style={{ position: "absolute", left: -18 * s, top: 60 * s, width: 40 * s,
        height: 120 * s, borderRadius: 6 * s, background: "#16323C" }} />
      <div style={{ position: "absolute", left: W_ - 22 * s, top: 150 * s, width: 62 * s,
        height: 110 * s, borderRadius: 6 * s, background: "#16323C" }} />
      {/* the scan window — the belt runs behind it */}
      <div style={{ position: "absolute", left: 34 * s, top: 46 * s, width: W_ - 130 * s,
        height: 140 * s, borderRadius: 7 * s, background: "#0B1A20",
        border: `${4 * s}px solid #38606C`, overflow: "hidden" }}>
        {/* ⭐ the sweeping scan bar — bright leading edge, shadow behind it */}
        {(() => {
          const sx = ((f * 7) % (W_ - 130 * s + 200 * s)) - 100 * s;
          return (<>
            <div style={{ position: "absolute", left: sx - 90 * s, top: 0, width: 90 * s,
              height: "100%", background: "linear-gradient(90deg, rgba(6,14,18,0) 0%, rgba(6,14,18,0.55) 100%)" }} />
            <div style={{ position: "absolute", left: sx, top: 0, width: 9 * s, height: "100%",
              background: "#DCF2F6" }} />
            <div style={{ position: "absolute", left: sx + 9 * s, top: 0, width: 70 * s,
              height: "100%", background: `linear-gradient(90deg, ${hexa(c, 0.40)} 0%, ${hexa(c, 0)} 100%)` }} />
          </>);
        })()}
      </div>
      {/* the ram that presses the seized post into a plan */}
      <div style={{ position: "absolute", left: W_ * 0.60, top: 6 * s + gk * 120 * s,
        width: 150 * s, height: 78 * s, borderRadius: 8 * s, background: "#DDE9EC",
        border: `${4 * s}px solid #A9C6CC`, zIndex: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={"rr" + i} style={{ position: "absolute", left: (18 + i * 42) * s, top: 18 * s,
            width: 22 * s, height: 42 * s, borderRadius: 4 * s, background: "#5E8894" }} />
        ))}
      </div>
      {/* its piston, which visibly extends */}
      <div style={{ position: "absolute", left: W_ * 0.60 + 62 * s, top: -70 * s,
        width: 26 * s, height: (76 + gk * 120) * s, background: "#2A5C68", zIndex: 5 }} />
      {/* the rig's own status lamps, always running */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: (26 + i * 34) * s, top: H_ - 34 * s,
          width: 20 * s, height: 20 * s, borderRadius: "50%", zIndex: 6,
          background: ((f + i * 11) % 40) < 20 ? c : "#17414C" }} />
      ))}
    </div>
  );
};

/** a creator post riding the rig's belt. `grabAt` is when the claw seizes it —
    it then flies UP into the ram instead of continuing along. */
export const RigPost: React.FC<{ f: number; i: number; x0: number; y: number; speed: number;
  grabAt?: number; s?: number; z?: number; span?: number; hot?: boolean; c?: string }> =
  ({ f, i, x0, y, speed, grabAt, s = 1, z = 52, span = 1000, hot = false, c = TEAL }) => {
  const raw = x0 + f * speed;
  const x = ((raw % span) + span) % span - 180 * s;
  const seized = grabAt !== undefined && f >= grabAt;
  const sk = seized ? E(f, grabAt!, grabAt! + 12, 0, 1, IN_Q) : 0;
  if (seized && sk >= 1) return null;
  return (
    <div style={{ position: "absolute", left: x + sk * 120 * s, top: y - sk * 150 * s,
      zIndex: z, width: 168 * s, height: 108 * s, borderRadius: 7 * s,
      background: hot ? mxh(c, 0.62) : "#9FC0C8",
      border: `${3 * s}px solid ${hot ? dkh(c, 0.30) : "#6E97A0"}`,
      transform: `rotate(${sk * 26}deg) scale(${1 - sk * 0.2})`, boxShadow: SH }}>
      <div style={{ position: "absolute", left: 8 * s, top: 8 * s, right: 8 * s, height: 46 * s,
        borderRadius: 4 * s, background: hot ? hexa("#0F3038", 0.34) : "#5E8894" }} />
      <div style={{ position: "absolute", left: 74 * s, top: 22 * s, width: 0, height: 0,
        borderLeft: `${16 * s}px solid ${hexa("#DCF2F6", 0.8)}`,
        borderTop: `${10 * s}px solid transparent`, borderBottom: `${10 * s}px solid transparent` }} />
      {/* the engagement bar the scanner is actually reading */}
      <div style={{ position: "absolute", left: 8 * s, bottom: 9 * s, width: 150 * s, height: 13 * s,
        borderRadius: 6 * s, background: "#0F3038", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, width: hot ? "94%" : `${20 + (i % 4) * 12}%`,
          background: hot ? c : "#3C7E8C" }} />
      </div>
      {hot && (
        <div style={{ position: "absolute", right: -10 * s, top: -10 * s, width: 34 * s, height: 34 * s,
          borderRadius: "50%", background: c, ...ui(18 * s, 900), color: "#0D2028",
          display: "flex", alignItems: "center", justifyContent: "center" }}>!</div>
      )}
    </div>
  );
};

/** S2 · THE REWRITE PRESS. A dull page goes under the head, the head SLAMS, and
    the page comes out with its lines re-set bright. "Rewrites your content so AI
    engines can actually rank it" — the rewrite is a physical stamp. */
export const RewritePress: React.FC<{ f: number; x: number; y: number; slams: number[];
  s?: number; z?: number; c?: string }> =
  ({ f, x, y, slams, s = 1, z = 40, c = "#6FA8DC" }) => {
  const W_ = 700 * s, H_ = 330 * s;
  const sl = slams.find((t) => f >= t - 9 && f < t + 22);
  const k = sl === undefined ? 0
    : f < sl ? E(f, sl - 9, sl, 0, 1, IN_Q)
    : 1 - E(f, sl + 4, sl + 22, 0, 1, OUT);
  const done = slams.filter((t) => f >= t + 3).length;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the two uprights and the crown — a real press frame */}
      <div style={{ position: "absolute", left: 0, top: -80 * s, width: 54 * s, height: H_ + 80 * s,
        borderRadius: 8 * s, background: "#2B4058", border: `${4 * s}px solid #3E5C7C` }} />
      <div style={{ position: "absolute", left: W_ - 54 * s, top: -80 * s, width: 54 * s,
        height: H_ + 80 * s, borderRadius: 8 * s, background: "#2B4058",
        border: `${4 * s}px solid #3E5C7C` }} />
      <div style={{ position: "absolute", left: -14 * s, top: -104 * s, width: W_ + 28 * s,
        height: 54 * s, borderRadius: 8 * s, background: "#3E5C7C", boxShadow: SH_D }} />
      {/* the bed */}
      <div style={{ position: "absolute", left: 40 * s, top: H_ - 40 * s, width: W_ - 80 * s,
        height: 40 * s, background: "#243449" }} />
      {/* THE PAGE — its lines re-set, one band per slam */}
      <div style={{ position: "absolute", left: 96 * s, top: 92 * s, width: W_ - 192 * s,
        height: H_ - 140 * s, borderRadius: 6 * s, background: "#E4EAF2",
        border: `${3 * s}px solid #AEBCCE`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 18 * s, top: 16 * s, width: 150 * s,
          height: 20 * s, borderRadius: 4 * s, background: done > 0 ? c : "#B4BFCE" }} />
        {Array.from({ length: 6 }, (_, i) => {
          const lit = i < done * 2;
          return (
            <div key={"pl" + i} style={{ position: "absolute", left: 18 * s, top: (52 + i * 26) * s,
              width: (lit ? 300 + (i % 3) * 70 : 150 + (i % 4) * 40) * s, height: 14 * s,
              borderRadius: 6 * s, background: lit ? "#1E3A5C" : "#B4BFCE" }} />
          );
        })}
      </div>
      {/* THE HEAD — it comes down and it lands */}
      <div style={{ position: "absolute", left: 70 * s, top: -50 * s + k * 130 * s,
        width: W_ - 140 * s, height: 92 * s, borderRadius: 8 * s, background: "#3E5C7C",
        border: `${5 * s}px solid #55779C`, zIndex: 8, boxShadow: SH_D }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"hb" + i} style={{ position: "absolute", left: (22 + i * 62) * s, bottom: 10 * s,
            width: 40 * s, height: 22 * s, borderRadius: 3 * s, background: "#243449" }} />
        ))}
      </div>
      {/* the piston it hangs from, visibly extending */}
      <div style={{ position: "absolute", left: W_ / 2 - 22 * s, top: -100 * s,
        width: 44 * s, height: (56 + k * 130) * s, background: "#55779C", zIndex: 7 }} />
    </div>
  );
};

/* ===========================================================================
   ⭐ THE ENGINE TILE — round 5. Alex: *"need logos for more of the scenes like
   at 15 seconds where AI SEO and ChatGPT and Claude are mentioned, and stuff
   like that throughout."*

   The VO names ChatGPT at 13.32s and Claude at 13.92s and the picture had
   neither. A named brand in the script with no mark on screen is a wasted
   receipt — the same gap the repo cards closed for the repos.

   ⛔ OpenAI 404s on the Simple Icons CDN (as Klaviyo and LinkedIn do), so
   ChatGPT renders as a WORDMARK. A faked glyph on a real brand is worse than no
   glyph, and this is the third time that rule has come up in one build.
   ========================================================================= */
export const EngineTile: React.FC<{ f: number; at: number; x: number; y: number;
  t: string; logo: string | null; c: string; s?: number; z?: number;
  scanTo?: number }> =
  ({ f, at, x, y, t, logo, c, s = 1, z = 70, scanTo }) => {
  const k = E(f, at, at + 9, 0, 1, BACK);
  if (k <= 0) return null;
  const W_ = 210 * s, H_ = 210 * s;
  const scan = E(f, at + 10, at + 30, 0, 1, IO);
  return (<>
    {/* the beam it reads the page with — a shaped cone, never a full fill */}
    {scanTo !== undefined && scan > 0 && (
      <div style={{ position: "absolute", left: x + W_ / 2 - 60 * s, top: y + H_,
        width: 120 * s, height: (scanTo - y - H_) * scan, zIndex: z - 1,
        clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa(c, 0.52)} 0%, ${hexa(c, 0.04)} 100%)` }} />
    )}
    <div style={{ position: "absolute", left: x, top: y - (1 - k) * 90 * s, zIndex: z,
      width: W_, height: H_, borderRadius: 24 * s, background: "#FFFFFF",
      border: `${4 * s}px solid ${hexa(c, 0.75)}`, boxShadow: SH_D,
      opacity: Math.min(1, k * 1.6),
      transform: `scale(${squash(f, at + 8, 0.20)}) rotate(${rock(f, at + 8, 3.2, 18)}deg)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 10 * s }}>
      {logo
        ? <Img src={staticFile(logo)} style={{ width: 104 * s, height: 104 * s, objectFit: "contain" }} />
        : <div style={{ ...ui(34 * s, 900), color: "#1A1813", letterSpacing: -0.5 }}>{t}</div>}
      {logo && <div style={{ ...ui(20 * s, 800), color: "#4A4F57" }}>{t}</div>}
    </div>
    <Ring x={x + W_ / 2} y={y + H_ * 0.9} f={f} at={at + 8} c={c} max={230} z={z - 2} />
  </>);
};

/** a small real-mark chip for naming the SOURCES or CHANNELS a scene works
    across. Rides in on its own beat and keeps a hum, so it is never a sticker. */
export const MarkChip: React.FC<{ f: number; at: number; x: number; y: number;
  logo: string | null; t: string; c: string; s?: number; z?: number }> =
  ({ f, at, x, y, logo, t, c, s = 1, z = 68 }) => {
  const k = E(f, at, at + 8, 0, 1, BACK);
  if (k <= 0) return null;
  const age = f - at;
  const hum = Math.sin(f / 3.4 + x) * 1.4 + Math.sin(f / 8.1) * 0.8;
  const D = 92 * s;
  return (
    <div style={{ position: "absolute", left: x + hum, top: y - (1 - k) * 60 * s + hum * 0.6,
      zIndex: z, width: D, height: D, borderRadius: 18 * s, background: "#FFFFFF",
      border: `${3 * s}px solid ${hexa(c, 0.7)}`, boxShadow: SH,
      opacity: Math.min(1, k * 1.7),
      transform: `scale(${squash(f, at + 7, 0.22)}) rotate(${rock(f, at + 7, 4, 16) + hum * 0.5}deg)`,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      {logo
        ? <Img src={staticFile(logo)} style={{ width: D * 0.56, height: D * 0.56, objectFit: "contain" }} />
        : <div style={{ ...ui(15 * s, 900), color: "#1A1813", textAlign: "center", lineHeight: 1.05 }}>{t}</div>}
    </div>
  );
};

/* ===========================================================================
   ⭐⭐ THE RANK SHAFT — round 6, replacing the leaderboard-of-rectangles.
   Alex on 14-16s: *"way too similar colors mushed together and the graphics are
   too much like lines and squares so it's not interesting whatsoever."*

   He is describing exactly what it was: seven near-identical slabs in the same
   blue, each filled with three grey line-stubs standing in for text, sliding
   over each other. Three separate defects in one object —
     1 NO VALUE GAP     rival #243348 vs mine #2C4A6E on a #26384E sky
     2 NO SHAPE         every rung the same rectangle, so nothing is legible
     3 LINES AS CONTENT line-stubs read as "generic UI", not as a page

   ⭐ The rebuild keeps the meaning (you climb past four) and throws away the
   form: BIG CARVED NUMERALS on dark stone markers, and one bright clay riser
   with the Claude mark that physically shoves past each one. Three objects on
   screen instead of twenty-one, each one readable at thumb size.
   ========================================================================= */
export const RankShaft: React.FC<{ f: number; x: number; y: number; passes: number[];
  s?: number; z?: number; c?: string }> =
  ({ f, x, y, passes, s = 1, z = 34, c = "#EBB35C" }) => {
  const GAP = 168 * s;
  const done = passes.filter((t) => f >= t).length;
  /* the whole shaft slides down as we climb, so the markers stream past */
  const climb = passes.reduce((a, t) => a + E(f, t, t + 12, 0, 1, OUT), 0) * GAP;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the shaft's own rails, so the numbers are mounted on something */}
      <div style={{ position: "absolute", left: -34 * s, top: -400 * s, width: 16 * s,
        height: 1600 * s, background: "#2A3A50" }} />
      <div style={{ position: "absolute", left: 486 * s, top: -400 * s, width: 16 * s,
        height: 1600 * s, background: "#2A3A50" }} />
      {[5, 4, 3, 2, 1].map((n, i) => {
        const my = 340 * s - i * GAP + climb;
        const passed = done >= 5 - n;
        return (
          <div key={"rk" + n} style={{ position: "absolute", left: 0, top: my,
            width: 470 * s, height: 128 * s, borderRadius: 10 * s,
            background: passed ? "#1B2534" : "#33445E",
            border: `${4 * s}px solid ${passed ? "#243044" : "#4A5F80"}`,
            transform: `translateX(${passed ? -26 * s : 0}px) rotate(${passed ? -3 : 0}deg)`,
            display: "flex", alignItems: "center", paddingLeft: 26 * s, gap: 22 * s }}>
            {/* ⭐ A BIG CARVED NUMERAL — legible at thumb size, which a stub of
                grey line-fill never is */}
            <div style={{ ...ui(78 * s, 900), color: passed ? "#3C4C66" : "#93A9CC",
              lineHeight: 1, width: 96 * s, textAlign: "center" }}>{n}</div>
            {/* one solid plate, not three line stubs */}
            <div style={{ width: 260 * s, height: 62 * s, borderRadius: 8 * s,
              background: passed ? "#243044" : "#4A5F80" }} />
          </div>
        );
      })}
      {/* ⭐ YOUR PAGE — the one bright object in the frame, clay against blue */}
      <div style={{ position: "absolute", left: 18 * s, top: 340 * s - done * GAP + climb - GAP * 0.1,
        width: 470 * s, height: 128 * s, borderRadius: 10 * s, zIndex: 8,
        background: "#F2EEE4", border: `${5 * s}px solid ${c}`, boxShadow: SH_D,
        transform: `scaleY(${squash(f, passes[done - 1] ?? -99, 0.18)}) rotate(${rock(f, passes[done - 1] ?? -99, 3.4, 16)}deg)`,
        display: "flex", alignItems: "center", paddingLeft: 26 * s, gap: 22 * s }}>
        <div style={{ ...ui(78 * s, 900), color: dkh(c, 0.44), lineHeight: 1,
          width: 96 * s, textAlign: "center" }}>{Math.max(1, 6 - done)}</div>
        <div style={{ width: 190 * s, height: 62 * s, borderRadius: 8 * s, background: mxh(c, 0.44) }} />
        <div style={{ width: 62 * s, height: 62 * s, borderRadius: 12 * s, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 42 * s, height: 42 * s, objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
};

/** a lead card carrying a REAL platform mark — replaces the anonymous rectangle
    on the Lessie belt. ⭐ The skill finds CREATORS, so the card should say which
    platform the creator is on. */
export const LeadCard: React.FC<{ f: number; i: number; x0: number; y: number; speed: number;
  verifyX: number; bad?: boolean; s?: number; z?: number; span?: number;
  logo: string | null; plat: string; c?: string }> =
  ({ f, i, x0, y, speed, verifyX, bad = false, s = 1, z = 56, span = 1380,
     logo, plat, c = "#8FD1A8" }) => {
  const raw = x0 + f * speed;
  const x = ((raw % span) + span) % span - 190 * s;
  const passed = x > verifyX;
  const fall = bad && passed ? Math.min(1, (x - verifyX) / 150) : 0;
  if (bad && fall >= 1) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y + fall * 160 * s, zIndex: z,
      transform: `rotate(${fall * 64}deg)`, opacity: 1 - fall * 0.4 }}>
      <div style={{ width: 176 * s, height: 96 * s, borderRadius: 8 * s, background: "#F4F1E9",
        border: `${3 * s}px solid ${passed && !bad ? c : "#C4BCAA"}`, boxShadow: SH }}>
        {/* the platform mark — a real logo on a white chip */}
        <div style={{ position: "absolute", left: 9 * s, top: 9 * s, width: 44 * s, height: 44 * s,
          borderRadius: 10 * s, background: "#FFFFFF", border: `${2 * s}px solid #DCD5C6`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          {logo
            ? <Img src={staticFile(logo)} style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
            : <div style={{ ...ui(12 * s, 900), color: "#2B2824" }}>{plat}</div>}
        </div>
        <div style={{ position: "absolute", left: 62 * s, top: 14 * s, width: 96 * s, height: 9 * s,
          borderRadius: 4 * s, background: "#8E8A80" }} />
        <div style={{ position: "absolute", left: 62 * s, top: 30 * s, width: 68 * s, height: 8 * s,
          borderRadius: 4 * s, background: "#B5AE9E" }} />
        {/* the email row, which is the thing being verified */}
        <div style={{ position: "absolute", left: 9 * s, bottom: 10 * s, width: 156 * s, height: 24 * s,
          borderRadius: 5 * s, background: passed ? (bad ? hexa(RED, 0.22) : hexa(c, 0.30)) : "#E2DBCC",
          display: "flex", alignItems: "center", paddingLeft: 8 * s, gap: 6 * s }}>
          <div style={{ ...ui(14 * s, 900), color: passed ? (bad ? RED : dkh(c, 0.46)) : "#A9A294" }}>@</div>
          <div style={{ width: 96 * s, height: 8 * s, borderRadius: 4 * s,
            background: passed ? (bad ? RED : dkh(c, 0.46)) : "#A9A294" }} />
        </div>
        {passed && (
          <div style={{ position: "absolute", right: -12 * s, top: -12 * s, width: 40 * s, height: 40 * s,
            borderRadius: "50%", background: bad ? RED : c, ...ui(23 * s, 900),
            color: bad ? "#FFF" : "#12281D", display: "flex",
            alignItems: "center", justifyContent: "center" }}>{bad ? "✕" : "✓"}</div>
        )}
      </div>
    </div>
  );
};

/* ===========================================================================
   ⭐⭐⭐ ROUND 7 — 5s to 14s, rebuilt on ROUND, CHARACTERFUL GEOMETRY.
   Alex: *"between 5 seconds and 14ish seconds those scenes need to be completely
   reworked, they absolutely suck and are way too boring, just blocky lines and
   rectangles."*

   ⛔ HE IS DESCRIBING MY OWN HABIT AND I HAD ALREADY BEEN TOLD IT ONCE. Round 6
   replaced "small rectangles" with "a big machine" — and I drew the machine as a
   rounded rect containing rounded rects, with line-fill standing in for text
   inside it. Scale was never the problem. **THE PROBLEM IS THAT EVERY OBJECT I
   REACH FOR IS AN AXIS-ALIGNED BOX.**

   ⭐ THE TEST THAT WOULD HAVE CAUGHT IT: name the object out loud. If the name is
   "panel", "card", "housing", "band" or "window", it is a UI abstraction and it
   will read as blocky no matter how large. If the name is a CLAW, a DRUM, a
   CRANK, a HOPPER, a PULLEY — a thing with a silhouette a child could draw — it
   reads as an object. Circles, arcs, prongs and cables, not rects.
   ========================================================================= */

/** S1 · THE CLAW. An arcade grab-crane over a pit of creator posts: a trolley on
    a rail, a cable, and three curved prongs that OPEN and CLOSE on the seize.
    Nothing here is a rectangle and the whole silhouette is legible at thumb size. */
export const ClawRig: React.FC<{ f: number; x: number; y: number; grabs: number[];
  targets: number[]; s?: number; z?: number; c?: string }> =
  ({ f, x, y, grabs, targets, s = 1, z = 82, c = TEAL }) => {
  /* one cycle per grab: travel across, drop, close, lift, carry to the chute */
  const idx = grabs.findIndex((t) => f >= t - 40 && f < t + 46);
  const g = idx >= 0 ? grabs[idx] : undefined;
  const tx = idx >= 0 ? targets[idx] : 300 * s;
  const travel = g === undefined ? 0 : E(f, g - 40, g - 16, 0, 1, IO);
  const drop = g === undefined ? 0 : E(f, g - 16, g, 0, 1, IN_Q) - E(f, g + 8, g + 30, 0, 1, OUT);
  const close = g === undefined ? 0 : E(f, g - 2, g + 6, 0, 1, OUT) - E(f, g + 38, g + 46, 0, 1, OUT);
  const carry = g === undefined ? 0 : E(f, g + 14, g + 38, 0, 1, IO);
  const cx = 300 * s + (tx - 300 * s) * travel + (820 * s - tx) * carry;
  const cableLen = (60 + drop * 250) * s;
  const prong = 26 - close * 30;
  return (<>
    {/* the rail the trolley runs on — a real girder with bolts */}
    <div style={{ position: "absolute", left: x - 40 * s, top: y, width: 900 * s, height: 26 * s,
      borderRadius: 5 * s, background: "#7FA8B2", zIndex: z - 2 }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"bt" + i} style={{ position: "absolute", left: x - 20 * s + i * 100 * s,
        top: y + 7 * s, width: 12 * s, height: 12 * s, borderRadius: "50%",
        background: "#2E4A52", zIndex: z - 1 }} />
    ))}
    {/* the trolley — two wheels and a body */}
    <div style={{ position: "absolute", left: x + cx - 46 * s, top: y + 18 * s, zIndex: z }}>
      <div style={{ width: 92 * s, height: 44 * s, borderRadius: 10 * s, background: "#A8CED6",
        border: `${3 * s}px solid #5E8C96` }} />
      {[14, 60].map((wx, i) => (
        <div key={"w" + i} style={{ position: "absolute", left: wx * s, top: -12 * s,
          width: 22 * s, height: 22 * s, borderRadius: "50%", background: "#2E4A52",
          border: `${3 * s}px solid #8FB6BE`,
          transform: `rotate(${(cx / 6) * (i ? 1 : 1)}deg)` }}>
          <div style={{ position: "absolute", left: 7 * s, top: 2 * s, width: 3 * s,
            height: 12 * s, background: "#8FB6BE" }} />
        </div>
      ))}
    </div>
    {/* the cable */}
    <div style={{ position: "absolute", left: x + cx - 3 * s, top: y + 58 * s,
      width: 7 * s, height: cableLen, background: "#B4D6DE", zIndex: z - 1 }} />
    {/* THE CLAW — three curved prongs on a hub */}
    <div style={{ position: "absolute", left: x + cx - 54 * s, top: y + 58 * s + cableLen,
      zIndex: z + 2 }}>
      <div style={{ position: "absolute", left: 34 * s, top: -12 * s, width: 40 * s, height: 24 * s,
        borderRadius: 8 * s, background: "#CFE9EE", border: `${3 * s}px solid #5E8C96` }} />
      {[-1, 0, 1].map((d, i) => (
        <svg key={"pr" + i} width={70 * s} height={86 * s} viewBox="0 0 70 86"
          style={{ position: "absolute", left: (54 + d * 30) * s - 35 * s, top: 8 * s,
            transform: `rotate(${d * prong}deg)`, transformOrigin: "50% 0%" }}>
          <path d={`M35 0 C 35 34, ${35 + d * 22} 52, ${35 + d * 8} 84`}
            stroke="#26424A" strokeWidth={17} fill="none" strokeLinecap="round" />
          <path d={`M35 0 C 35 34, ${35 + d * 22} 52, ${35 + d * 8} 84`}
            stroke="#CFE9EE" strokeWidth={10} fill="none" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  </>);
};

/** a creator post lying in the pit, carrying a REAL platform mark. Round corners,
    a phone silhouette rather than a card — it is a post ON a device. */
export const PitPost: React.FC<{ f: number; x: number; y: number; logo: string;
  hot?: boolean; grabAt?: number; s?: number; z?: number; c?: string; seed?: number;
  dropAt?: number }> =
  ({ f, x, y, logo, hot = false, grabAt, s = 1, z = 44, c = TEAL, seed = 0, dropAt }) => {
  /* ⭐ posts DROP INTO the pit on their own beats, so the pit is being restocked
     the whole time instead of sitting still between grabs */
  if (dropAt !== undefined && f < dropAt) return null;
  const fall = dropAt === undefined ? 1 : E(f, dropAt, dropAt + 11, 0, 1, IN_Q);
  const taken = grabAt !== undefined && f >= grabAt;
  const lift = taken ? E(f, grabAt!, grabAt! + 38, 0, 1, IO) : 0;
  const carry = taken ? E(f, grabAt! + 14, grabAt! + 38, 0, 1, IO) : 0;
  if (lift >= 1 && carry >= 1) return null;
  /* ⛔ a seized post rides BELOW the prongs (82) and above the pit (44) */
  const bob = Math.sin(f / 23 + seed) * 3;
  return (
    <div style={{ position: "absolute", left: x + carry * (820 - x + 120) * s,
      top: y - lift * 250 * s + bob - (1 - fall) * 420 * s, zIndex: taken ? 78 : z,
      transform: `rotate(${(seed % 5 - 2) * 4 + lift * 8 + (1 - fall) * 22}deg) scaleY(${squash(f, (dropAt ?? -99) + 10, 0.20)})` }}>
      {/* a phone body: tall, very round corners, a bezel and a screen */}
      <div style={{ width: 116 * s, height: 176 * s, borderRadius: 26 * s,
        background: hot ? mxh(c, 0.20) : "#2C4A52", border: `${4 * s}px solid ${hot ? c : "#44646E"}`,
        boxShadow: SH }}>
        <div style={{ position: "absolute", left: 10 * s, top: 22 * s, width: 92 * s,
          height: 130 * s, borderRadius: 12 * s, background: hot ? "#F2EEE4" : "#17333A" }} />
        {/* the platform mark, on a white chip */}
        <div style={{ position: "absolute", left: 34 * s, top: 44 * s, width: 44 * s, height: 44 * s,
          borderRadius: 12 * s, background: "#FFFFFF", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(logo)} style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
        </div>
        {/* the engagement dial — a RING, not a bar */}
        <svg width={54 * s} height={54 * s} viewBox="0 0 54 54"
          style={{ position: "absolute", left: 29 * s, top: 96 * s }}>
          <circle cx="27" cy="27" r="20" stroke={hot ? "#DCD5C6" : "#1E3C44"} strokeWidth="7" fill="none" />
          <circle cx="27" cy="27" r="20" stroke={hot ? c : "#3C6670"} strokeWidth="7" fill="none"
            strokeLinecap="round" strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20 * (hot ? 0.06 : 0.62)}
            transform="rotate(-90 27 27)" />
        </svg>
        <div style={{ position: "absolute", left: 44 * s, bottom: 8 * s, width: 28 * s,
          height: 5 * s, borderRadius: 3 * s, background: hot ? "#C9C2B2" : "#44646E" }} />
      </div>
    </div>
  );
};

/** S2 · THE ROLLER PRESS. Two big DRUMS with spokes, a crank, and the page
    physically fed between them — round geometry, and the rewrite happens where
    the paper meets the roller instead of under a descending slab. */
export const RollerPress: React.FC<{ f: number; x: number; y: number; turns: number[];
  s?: number; z?: number; c?: string }> =
  ({ f, x, y, turns, s = 1, z = 40, c = "#6FA8DC" }) => {
  const spin = f * 3.6;
  const done = turns.filter((t) => f >= t).length;
  const R = 118 * s;
  const Drum: React.FC<{ dx: number; dy: number; dir: number }> = ({ dx, dy, dir }) => (
    <div style={{ position: "absolute", left: dx - R, top: dy - R, width: R * 2, height: R * 2,
      borderRadius: "50%", background: "#8FA8C8", border: `${9 * s}px solid #C6D6EA`,
      zIndex: z + 2, transform: `rotate(${spin * dir}deg)` }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: R - 6 * s, top: 10 * s,
          width: 12 * s, height: R - 18 * s, borderRadius: 6 * s, background: "#4E6E96",
          transformOrigin: `50% ${R - 18 * s}px`, transform: `rotate(${i * 60}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: R - 22 * s, top: R - 22 * s, width: 44 * s,
        height: 44 * s, borderRadius: "50%", background: "#E4EDF8" }} />
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the frame the drums are slung in */}
      <div style={{ position: "absolute", left: 0, top: 30 * s, width: 48 * s, height: 330 * s,
        borderRadius: 24 * s, background: "#2B4058", border: `${4 * s}px solid #3E5C7C` }} />
      <div style={{ position: "absolute", left: 470 * s, top: 30 * s, width: 48 * s, height: 330 * s,
        borderRadius: 24 * s, background: "#2B4058", border: `${4 * s}px solid #3E5C7C` }} />
      {/* THE PAGE, fed between the drums and coming out rewritten */}
      <div style={{ position: "absolute", left: 92 * s, top: 232 * s, width: 400 * s,
        height: 150 * s, borderRadius: 8 * s, background: "#E8EEF6",
        border: `${3 * s}px solid #AEBCCE`, zIndex: z + 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 20 * s, top: 16 * s, width: 150 * s,
          height: 20 * s, borderRadius: 5 * s, background: done > 0 ? c : "#B4BFCE" }} />
        {Array.from({ length: 3 }, (_, i) => (
          <div key={"pg" + i} style={{ position: "absolute", left: 20 * s, top: (52 + i * 30) * s,
            width: (i < done ? 340 : 170) * s, height: 16 * s, borderRadius: 8 * s,
            background: i < done ? "#1E3A5C" : "#B4BFCE" }} />
        ))}
      </div>
      <Drum dx={172 * s} dy={196 * s} dir={1} />
      <Drum dx={396 * s} dy={196 * s} dir={-1} />
      {/* THE CRANK — an offset handle on a wheel, which is what a Claude turns */}
      <div style={{ position: "absolute", left: 470 * s, top: 130 * s, width: 96 * s, height: 96 * s,
        borderRadius: "50%", background: "#55779C", border: `${7 * s}px solid #8FA8C8`,
        zIndex: z + 4, transform: `rotate(${spin}deg)` }}>
        <div style={{ position: "absolute", left: 62 * s, top: 34 * s, width: 26 * s, height: 26 * s,
          borderRadius: "50%", background: "#E7B24C", border: `${4 * s}px solid #B98C34` }} />
      </div>
    </div>
  );
};

/* ===========================================================================
   ⭐ S2a · THE MAGNIFIER. Alex: *"the animation at 11 seconds should be about
   SEO, not just like gears twisting, that doesn't look good."*

   ⛔ He is right and the roller press was a category error. Round 7 fixed
   "everything is a box" by reaching for round geometry — and I picked DRUMS AND
   A CRANK, which is a printing press. Round is not the goal; round was only the
   symptom. **The object has to be the SUBJECT'S OWN, and the subject is search.**
   Gears say "machine", and no part of SEO is a machine.

   ⭐ A magnifying glass over a search listing says SEARCH in one frame to anyone
   who has ever used one: a big circular lens with a rim and a handle, and the
   listing UNDER the lens is the rewritten version while everything outside it is
   still the dull one. The rewrite is literally visible through the glass.
   ========================================================================= */
export const SearchListing: React.FC<{ x: number; y: number; w: number; rich: boolean;
  s?: number; z?: number; c?: string; rank?: string }> =
  ({ x, y, w, rich, s = 1, z = 40, c = "#6FA8DC", rank = "9" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z }}>
    {/* the rank pill — a search result has a position, and that is the point */}
    <div style={{ position: "absolute", left: -58 * s, top: 6 * s, width: 46 * s, height: 46 * s,
      borderRadius: "50%", background: rich ? c : "#5E6B7C",
      ...ui(22 * s, 900), color: rich ? "#0E2033" : "#8E99A8",
      display: "flex", alignItems: "center", justifyContent: "center" }}>{rank}</div>
    {/* the blue title link */}
    <div style={{ width: (rich ? 0.94 : 0.52) * w, height: 22 * s, borderRadius: 5 * s,
      background: rich ? "#2F6FD0" : "#5E6B7C" }} />
    {/* the green URL line */}
    <div style={{ marginTop: 11 * s, width: (rich ? 0.56 : 0.28) * w, height: 13 * s,
      borderRadius: 4 * s, background: rich ? "#2E8B57" : "#4E5A69" }} />
    {/* the snippet */}
    {[0, 1].map((i) => (
      <div key={"sn" + i} style={{ marginTop: 9 * s,
        width: (rich ? [0.90, 0.70][i] : [0.40, 0.22][i]) * w, height: 12 * s,
        borderRadius: 4 * s, background: rich ? "#7F8CA0" : "#3E4854" }} />
    ))}
    {/* rich results only: the star row and the sitelinks that win the click */}
    {rich && (<>
      <div style={{ marginTop: 12 * s, display: "flex", gap: 6 * s, alignItems: "center" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={"st" + i} width={19 * s} height={19 * s} viewBox="0 0 24 24">
            <path fill="#E7B24C" d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9z" />
          </svg>
        ))}
      </div>
      <div style={{ marginTop: 12 * s, display: "flex", gap: 10 * s }}>
        {[0, 1, 2].map((i) => (
          <div key={"sl" + i} style={{ width: 0.22 * w, height: 11 * s, borderRadius: 4 * s,
            background: "#2F6FD0", opacity: 0.7 }} />
        ))}
      </div>
    </>)}
  </div>
);

/** the lens itself: a thick rim, a glass fill, a highlight arc and a handle. */
export const Magnifier: React.FC<{ f: number; x: number; y: number; r?: number;
  s?: number; z?: number; c?: string }> =
  ({ f, x, y, r = 150, s = 1, z = 80, c = "#6FA8DC" }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
    zIndex: z, pointerEvents: "none" }}>
    {/* the handle, angled out of the bottom-right */}
    <div style={{ position: "absolute", left: r * 1.44, top: r * 1.44, width: 30 * s,
      height: 150 * s, borderRadius: 15 * s, background: "#7A5A3E",
      border: `${4 * s}px solid #5C4230`, transformOrigin: "50% 0%", transform: "rotate(-42deg)" }} />
    {/* the rim */}
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
      border: `${18 * s}px solid #C6D6EA`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", inset: 18 * s, borderRadius: "50%",
      border: `${5 * s}px solid #8FA8C8` }} />
    {/* the glass highlight — one arc, so it reads as glass and not a hole */}
    <svg width={r * 2} height={r * 2} viewBox={`0 0 ${r * 2} ${r * 2}`}
      style={{ position: "absolute", left: 0, top: 0 }}>
      <path d={`M ${r * 0.42} ${r * 0.60} A ${r * 0.72} ${r * 0.72} 0 0 1 ${r * 1.08} ${r * 0.34}`}
        stroke="rgba(255,255,255,0.55)" strokeWidth={11 * s} fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

/* ===========================================================================
   ⭐⭐ ROUND 9 — THE HOOK'S LAST TWO SECONDS.
   Alex: *"even at 4 seconds the animation kind of becomes stale, it's just
   repeating, needs more interesting motion and movement throughout"* and
   *"not just papers flying out of the computer on the left side."*

   TWO defects, and the second one is a rule I already had:

   1 AFTER THE CLIMAX AT f94 THERE WERE NO MORE EVENTS. The final 75 frames ran
     the tile hum, the packet traffic and a looping card stream — three LOOPS.
     ⭐ A loop is what fills the gaps BETWEEN events; it cannot BE the event. If
     the last thing that happens in a shot happens at 3.1s, the shot is over at
     3.1s no matter how much is still moving.

   2 ⛔⛔ THE CARD STREAM WAS THE BANNED PAPER ANIMATION. Reel 107:
     *"dont just have animations where its just the white papers or the
     rectangles they SUCK need to be replaced"* — and the fix there was already
     written down: **the output of the thing is MORE CLAUDES WORKING**, which is
     the reel's own noun, saturated clay rather than cream, and a body doing
     something. I re-committed the exact pattern that note exists to ban.
   ========================================================================= */

/** the eight lit tools TIE INTO the bay, one beam at a time — a new event at
    ~3.5s, and it is the scene's actual argument: the stack wiring into the skill. */
export const TieBeam: React.FC<{ f: number; at: number; x0: number; y0: number;
  x1: number; y1: number; c: string; s?: number; z?: number }> =
  ({ f, at, x0, y0, x1, y1, c, s = 1, z = 36 }) => {
  const k = E(f, at, at + 10, 0, 1, OUT);
  if (k <= 0) return null;
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  /* packets keep running the tie once it is made, so the link stays alive */
  const pk = ((f - at) * 0.030) % 1;
  return (<>
    <div style={{ position: "absolute", left: x0, top: y0 - 3 * s, width: len * k,
      height: 6 * s, borderRadius: 3 * s, background: hexa(c, 0.62), zIndex: z,
      transformOrigin: "0% 50%", transform: `rotate(${ang}deg)` }} />
    {k >= 1 && (
      <div style={{ position: "absolute", left: x0 + dx * pk - 9 * s, top: y0 + dy * pk - 9 * s,
        width: 18 * s, height: 18 * s, borderRadius: 5 * s, background: c, zIndex: z + 1 }} />
    )}
  </>);
};

/** ⭐ WHAT COMES OUT OF THE LIT BAY IS CLAUDES, NOT PAPER. They march out in a
    line, cross the floor and get to work — the reel's own noun, in clay. */
export const BayMarch: React.FC<{ f: number; at: number; x: number; y: number;
  x1: number; y1: number; n?: number; every?: number; s?: number; z?: number }> =
  ({ f, at, x, y, x1, y1, n = 4, every = 15, s = 116, z = 64 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const t0 = at + i * every;
      const k = E(f, t0, t0 + 44, 0, 1, IO);
      if (k <= 0) return null;
      const px = x + (x1 - x) * k, py = y + (y1 - y) * k;
      const stride = Math.abs(Math.sin((f - t0) / 5.0)) * 9;
      const arrived = k >= 1;
      /* once arrived they keep WORKING — a lean on their own clock, not a bob */
      const work = arrived ? Math.sin((f - t0) / 8 + i) * 13 : 0;
      return (
        <div key={"bm" + i} style={{ position: "absolute", left: px - s / 2,
          top: py - s * 0.62 - stride, zIndex: z + i,
          transform: `rotate(${work + Math.sin((f - t0) / 5.0) * 4}deg)`,
          transformOrigin: "50% 92%" }}>
          <Contact x={s * 0.05} y={s * 0.96 + stride} w={s * 0.80} z={-1} o={0.34} />
          <Mascot lf={f + i * 13} size={s} {...(costumeFor(i * 3 + 2) as any)} />
        </div>
      );
    })}
  </>);

/* ===========================================================================
   ⭐ THE TYPIST — Alex: *"the Claude sprite next to the computer doing some
   interesting stuff like typing furiously."*

   ⛔ He was an `Operator` with a slow lean, which is what a person WATCHING a
   screen does, not what somebody working one does. And since the bolted-on arms
   were (rightly) removed, the typing has to come from the BODY plus the machine:
   a forward-pitched torso, a fast rhythmic bounce on the typing clock, and a
   screen that visibly fills with lines at the same rate. The keyboard sound
   completes it — the SFX bank now carries the key clicks on this exact rhythm.
   ========================================================================= */
export const Typist: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  rate?: number; bursts?: number[] } & Record<string, any>> =
  ({ f, x, y, s = 200, z = 60, rate = 3.1, bursts, ...m }) => {
  /* furious = a fast tick with a slower phrase envelope, so it comes in bursts
     like real typing rather than a metronome */
  const tick = Math.sin(f * rate);
  const phrase = 0.55 + 0.45 * Math.sin(f / 21);
  const amp = phrase * (bursts ? (bursts.some((b) => f >= b && f < b + 26) ? 1.35 : 0.5) : 1);
  const bob = tick * 3.2 * amp;
  const pitch = 13 + Math.sin(f / 17) * 2.4;          /* leaning INTO the desk */
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62 + bob, zIndex: z,
      transform: `rotate(${pitch + tick * 1.1 * amp}deg)`, transformOrigin: "50% 94%" }}>
      <Contact x={s * 0.05} y={s * 0.96 - bob} w={s * 0.84} z={-1} o={0.36} />
      <Mascot lf={f} size={s} nodAmp={7 * amp} nodSpeed={4} {...m} />
    </div>
  );
};

/** the monitor filling with lines at the typing rate — the machine half of it */
export const TypedScreen: React.FC<{ f: number; x: number; y: number; w: number; h: number;
  s?: number; z?: number }> = ({ f, x, y, w, h, s = 1, z = 46 }) => {
  const N = 7;
  const cycle = 96;
  const t = f % cycle;
  const shown = Math.min(N, Math.floor((t / cycle) * (N + 2)));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 4 * s, background: "#3A5680", overflow: "hidden" }}>
      {Array.from({ length: N }, (_, i) => {
        if (i > shown) return null;
        const full = i < shown;
        const grow = full ? 1 : ((t / cycle) * (N + 2)) % 1;
        return (
          <div key={"tl" + i} style={{ position: "absolute", left: 10 * s, top: (10 + i * 15) * s,
            width: (36 + ((i * 41) % 88)) * s * grow, height: 7 * s, borderRadius: 3 * s,
            background: hexa("#DCEAF8", 0.72 + (i % 3) * 0.12) }} />
        );
      })}
      {/* the caret, on the line being typed */}
      <div style={{ position: "absolute", left: (10 + (36 + ((shown * 41) % 88)) * ((t / cycle) * (N + 2)) % 1) * s + 2,
        top: (10 + Math.min(shown, N - 1) * 15) * s, width: 5 * s, height: 9 * s,
        background: "#CFE0F2", opacity: Math.sin(f / 5) > 0 ? 1 : 0.2 }} />
    </div>
  );
};

/* ===========================================================================
   ⭐⭐ S3 · THE BRAND LINE — round 11.
   The old S3 hero was a cream rectangle full of grey line-stubs: the exact
   "blocky rectangles and lines" defect, still sitting in a scene that never got
   flagged by name. ⛔ **A note is about a DEFECT, not about the shot it was
   given in.** When "stop drawing boxes" landed I rebuilt the two scenes named
   and left the same box in three others.

   ⭐ "It applies a full brand system TO YOUR BUSINESS" — so the objects are a
   business's actual things (a cup, a tote, a shopfront sign, a card, a phone),
   each with its own silhouette, and a paint ROLLER (a cylinder, turning) runs
   across them. Grey before, branded after, in one pass you can watch.
   ========================================================================= */
export const BrandObject: React.FC<{ kind: "cup" | "tote" | "sign" | "card" | "phone";
  x: number; y: number; painted: boolean; typed: boolean; voiced: boolean;
  f: number; at: number; s?: number; z?: number; c?: string }> =
  ({ kind, x, y, painted, typed, voiced, f, at, s = 1, z = 50, c = "#E0925A" }) => {
  const base = painted ? c : "#9A968B";
  const dark = painted ? dkh(c, 0.34) : "#7A766C";
  const pop = squash(f, at, 0.20);
  const body: React.ReactNode =
    kind === "cup" ? (
      <div style={{ position: "relative", width: 96 * s, height: 118 * s }}>
        <div style={{ position: "absolute", left: 8 * s, top: 14 * s, width: 78 * s, height: 100 * s,
          borderRadius: `${10 * s}px ${10 * s}px ${26 * s}px ${26 * s}px`, background: base }} />
        <div style={{ position: "absolute", left: 0, top: 4 * s, width: 96 * s, height: 18 * s,
          borderRadius: 9 * s, background: dark }} />
        <div style={{ position: "absolute", left: 78 * s, top: 42 * s, width: 30 * s, height: 34 * s,
          borderRadius: "50%", border: `${8 * s}px solid ${dark}` }} />
        {typed && <div style={{ position: "absolute", left: 24 * s, top: 52 * s, width: 44 * s,
          height: 12 * s, borderRadius: 3 * s, background: "#FFFFFF", opacity: 0.9 }} />}
      </div>
    ) : kind === "tote" ? (
      <div style={{ position: "relative", width: 108 * s, height: 122 * s }}>
        <div style={{ position: "absolute", left: 0, top: 30 * s, width: 108 * s, height: 92 * s,
          borderRadius: `${6 * s}px ${6 * s}px ${14 * s}px ${14 * s}px`, background: base }} />
        <div style={{ position: "absolute", left: 22 * s, top: 0, width: 64 * s, height: 44 * s,
          borderRadius: `${32 * s}px ${32 * s}px 0 0`, border: `${8 * s}px solid ${dark}`,
          borderBottom: "none" }} />
        {typed && <div style={{ position: "absolute", left: 24 * s, top: 62 * s, width: 60 * s,
          height: 14 * s, borderRadius: 3 * s, background: "#FFFFFF", opacity: 0.92 }} />}
      </div>
    ) : kind === "sign" ? (
      <div style={{ position: "relative", width: 156 * s, height: 116 * s }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 156 * s, height: 74 * s,
          borderRadius: 10 * s, background: base, border: `${5 * s}px solid ${dark}` }} />
        <div style={{ position: "absolute", left: 70 * s, top: 74 * s, width: 14 * s,
          height: 42 * s, background: dark }} />
        {typed && <div style={{ position: "absolute", left: 22 * s, top: 26 * s, width: 110 * s,
          height: 20 * s, borderRadius: 4 * s, background: "#FFFFFF", opacity: 0.94 }} />}
      </div>
    ) : kind === "card" ? (
      <div style={{ position: "relative", width: 128 * s, height: 80 * s }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, background: base,
          border: `${4 * s}px solid ${dark}` }} />
        {typed && (<>
          <div style={{ position: "absolute", left: 14 * s, top: 20 * s, width: 62 * s,
            height: 12 * s, borderRadius: 3 * s, background: "#FFFFFF", opacity: 0.94 }} />
          <div style={{ position: "absolute", left: 14 * s, top: 42 * s, width: 42 * s,
            height: 8 * s, borderRadius: 3 * s, background: "#FFFFFF", opacity: 0.6 }} />
        </>)}
      </div>
    ) : (
      <div style={{ position: "relative", width: 78 * s, height: 138 * s }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 18 * s, background: base,
          border: `${5 * s}px solid ${dark}` }} />
        <div style={{ position: "absolute", left: 10 * s, top: 16 * s, width: 58 * s,
          height: 100 * s, borderRadius: 8 * s, background: painted ? mxh(c, 0.60) : "#B6B2A8" }} />
        {typed && <div style={{ position: "absolute", left: 20 * s, top: 44 * s, width: 38 * s,
          height: 10 * s, borderRadius: 3 * s, background: dkh(c, 0.40) }} />}
      </div>
    );
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scaleY(${pop}) rotate(${rock(f, at, 3.0, 16)}deg)`, transformOrigin: "50% 100%" }}>
      {body}
      {/* ⭐ VOICE is a real speech bubble with a tail, not a rounded rectangle */}
      {voiced && (
        <div style={{ position: "absolute", left: -18 * s, top: -56 * s,
          transform: `scale(${E(f, at, at + 9, 0.6, 1, BACK)})`, transformOrigin: "20% 100%" }}>
          <div style={{ width: 104 * s, height: 44 * s, borderRadius: 22 * s,
            background: "#F7F5F0", border: `${4 * s}px solid ${dark}` }} />
          <div style={{ position: "absolute", left: 20 * s, top: 40 * s, width: 0, height: 0,
            borderTop: `${18 * s}px solid ${dark}`, borderRight: `${16 * s}px solid transparent` }} />
          <div style={{ position: "absolute", left: 18 * s, top: 16 * s, width: 62 * s,
            height: 9 * s, borderRadius: 4 * s, background: dark, opacity: 0.55 }} />
        </div>
      )}
    </div>
  );
};

/** the roller: a real cylinder with end caps that TURNS as it travels, on a
    bent handle. Nothing about it is an axis-aligned panel. */
export const PaintRoller: React.FC<{ f: number; x: number; y: number; s?: number;
  z?: number; c?: string }> = ({ f, x, y, s = 1, z = 76, c = "#E0925A" }) => {
  const spin = x * 1.6;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the handle */}
      <div style={{ position: "absolute", left: 96 * s, top: -108 * s, width: 17 * s,
        height: 120 * s, borderRadius: 9 * s, background: "#7A5A3E",
        transformOrigin: "50% 100%", transform: "rotate(24deg)" }} />
      <div style={{ position: "absolute", left: 40 * s, top: -14 * s, width: 66 * s,
        height: 13 * s, borderRadius: 7 * s, background: "#5C4230" }} />
      {/* the barrel — a cylinder, turning */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 118 * s, height: 62 * s,
        borderRadius: 31 * s, background: c, border: `${5 * s}px solid ${dkh(c, 0.30)}`,
        overflow: "hidden" }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"rs" + i} style={{ position: "absolute",
            left: (((spin + i * 26) % 130) - 12) * s, top: 0, width: 9 * s, height: 62 * s,
            background: dkh(c, 0.22), opacity: 0.7 }} />
        ))}
      </div>
      {/* wet paint trailing off the barrel */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"dp" + i} style={{ position: "absolute", left: (14 + i * 28) * s, top: 58 * s,
          width: 8 * s, height: (10 + ((i * 13) % 16)) * s, borderRadius: 4 * s,
          background: c, opacity: 0.8 }} />
      ))}
    </div>
  );
};

/* ===========================================================================
   ⭐⭐⭐ S2b · THE READING HEADS — round 12.
   Alex on 13s: *"this needs to be completely redone, it's just plain box and
   lines, needs to be a lot more interesting."*

   ⛔ HE IS RIGHT AND IT IS THE FOURTH TIME. The shot was: two white rounded
   squares at the top, two faint beams, and one big pale rectangle full of navy
   line-stubs. That is a box, a box, and a box of lines — and I built it in the
   SAME round where I wrote "name the object out loud; if it is a panel or a
   card it will read as blocky at any size." I wrote the rule and then reached
   for a card anyway, because a logo on a tile is the path of least resistance.

   ⭐ THE ENGINES ARE NOW MACHINES THAT LEAN IN AND READ: a round LENS on an
   articulated arm, an iris that opens, and a citation SEAL it presses onto your
   page. Circles, joints and a stamp — and the payoff ("the engines can actually
   rank it") lands as the two marks ending up ON your content as citations,
   rather than floating above it on tiles.
   ========================================================================= */
export const ReadingHead: React.FC<{ f: number; at: number; x: number; y: number;
  reach: number; t: string; logo: string | null; c: string; flip?: boolean;
  s?: number; z?: number }> =
  ({ f, at, x, y, reach, t, logo, c, flip = false, s = 1, z = 70 }) => {
  const swing = E(f, at, at + 16, 0, 1, BACK);        /* the arm swings down */
  const iris = E(f, at + 14, at + 24, 0, 1, OUT);     /* the iris opens */
  const scan = E(f, at + 22, at + 40, 0, 1, IO);      /* it reads down the page */
  if (swing <= 0) return null;
  const R = 92 * s;
  const dir = flip ? -1 : 1;
  const ang = (1 - swing) * -46 * dir;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${ang}deg)`, transformOrigin: "50% 0%" }}>
      {/* the arm: two segments and a visible elbow joint */}
      <div style={{ position: "absolute", left: -13 * s, top: 0, width: 26 * s,
        height: reach * 0.52, borderRadius: 13 * s, background: "#41566E" }} />
      <div style={{ position: "absolute", left: -19 * s, top: reach * 0.52 - 19 * s,
        width: 38 * s, height: 38 * s, borderRadius: "50%", background: "#5C7692",
        border: `${5 * s}px solid #7E9AB8` }} />
      <div style={{ position: "absolute", left: -11 * s, top: reach * 0.52,
        width: 22 * s, height: reach * 0.48, borderRadius: 11 * s, background: "#41566E",
        transformOrigin: "50% 0%", transform: `rotate(${(1 - swing) * 26 * dir}deg)` }} />
      {/* THE LENS — a real eye: housing, iris, pupil and a glass highlight */}
      <div style={{ position: "absolute", left: -R, top: reach - R * 0.2,
        width: R * 2, height: R * 2, borderRadius: "50%", background: "#2E4055",
        border: `${9 * s}px solid #6E8CAC`, boxShadow: SH_D,
        transform: `rotate(${(1 - swing) * 26 * dir}deg)` }}>
        <div style={{ position: "absolute", left: R * 0.24, top: R * 0.24,
          width: R * 1.52 * (0.25 + iris * 0.75), height: R * 1.52 * (0.25 + iris * 0.75),
          borderRadius: "50%", background: c, opacity: 0.34 + iris * 0.66,
          transform: `translate(${(1 - iris) * R * 0.5}px, ${(1 - iris) * R * 0.5}px)` }} />
        <div style={{ position: "absolute", left: R * 0.62, top: R * 0.62 + scan * R * 0.34,
          width: R * 0.76, height: R * 0.76, borderRadius: "50%", background: "#12202E" }} />
        <div style={{ position: "absolute", left: R * 0.44, top: R * 0.34, width: R * 0.5,
          height: R * 0.3, borderRadius: "50%", background: "rgba(255,255,255,0.45)" }} />
        {/* the brand it is, on a small plate at the rim */}
        <div style={{ position: "absolute", left: R * 0.5, top: R * 1.56, width: R,
          height: 34 * s, borderRadius: 17 * s, background: "#FFFFFF",
          border: `${3 * s}px solid ${hexa(c, 0.8)}`, display: "flex",
          alignItems: "center", justifyContent: "center", gap: 5 * s }}>
          {logo && <Img src={staticFile(logo)}
            style={{ width: 20 * s, height: 20 * s, objectFit: "contain" }} />}
          <span style={{ ...ui(15 * s, 900), color: "#1A1813" }}>{t}</span>
        </div>
      </div>
      {/* the read beam — a shaped cone from the lens, only while scanning */}
      {scan > 0 && scan < 1 && (
        <div style={{ position: "absolute", left: -46 * s, top: reach + R * 1.7,
          width: 92 * s, height: 210 * s, zIndex: -1,
          clipPath: "polygon(34% 0, 66% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa(c, 0.44)} 0%, ${hexa(c, 0)} 100%)` }} />
      )}
    </div>
  );
};

/** the citation SEAL an engine presses onto your page — a round stamp with the
    brand mark, struck (not faded) so the arrival costs something. */
export const CiteSeal: React.FC<{ f: number; at: number; x: number; y: number;
  logo: string | null; t: string; c: string; s?: number; z?: number }> =
  ({ f, at, x, y, logo, t, c, s = 1, z = 88 }) => {
  if (f < at) return null;
  const hit = E(f, at, at + 6, 0, 1, IN_Q);
  const settled = f >= at + 6;
  const sc = settled ? 1 : 1 + (1 - hit) * 1.8;
  const R = 62 * s;
  return (<>
    <div style={{ position: "absolute", left: x - R, top: y - R, width: R * 2, height: R * 2,
      zIndex: z, transform: `scale(${sc}) rotate(${-11 + rock(f, at + 6, 3.4, 14)}deg)`,
      borderRadius: "50%", background: "#F7F5F0", border: `${6 * s}px solid ${c}`,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 2 * s, boxShadow: SH }}>
      {logo
        ? <Img src={staticFile(logo)} style={{ width: 40 * s, height: 40 * s, objectFit: "contain" }} />
        : <span style={{ ...ui(19 * s, 900), color: "#1A1813" }}>{t}</span>}
      <span style={{ ...ui(11 * s, 800), color: dkh(c, 0.30), letterSpacing: 0.8 }}>CITED</span>
    </div>
    <Ring x={x} y={y} f={f} at={at} c={c} max={220} z={z - 1} />
  </>);
};

/** ⛔ NOT A RECTANGLE OF LINE-STUBS. Your page as a real document: a masthead,
    a figure with an actual shape in it, and a pull-quote — so it reads as
    CONTENT rather than as a wireframe. */
export const ContentPage: React.FC<{ x: number; y: number; f: number; s?: number;
  z?: number; c?: string }> = ({ x, y, f, s = 1, z = 44, c = "#6FA8DC" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    width: 420 * s, height: 246 * s, borderRadius: 12 * s, background: "#F4F1E9",
    border: `${4 * s}px solid #CFC7B6`, boxShadow: SH_D, overflow: "hidden" }}>
    {/* masthead with the Claude mark — this is content the skills made */}
    <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 52 * s,
      background: dkh(c, 0.42), display: "flex", alignItems: "center", paddingLeft: 16 * s, gap: 10 * s }}>
      <div style={{ width: 30 * s, height: 30 * s, borderRadius: 8 * s, background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 20 * s, height: 20 * s, objectFit: "contain" }} />
      </div>
      <div style={{ width: 150 * s, height: 13 * s, borderRadius: 6 * s, background: mxh(c, 0.62) }} />
    </div>
    {/* a FIGURE with a real chart in it, not another grey bar */}
    <div style={{ position: "absolute", left: 16 * s, top: 68 * s, width: 158 * s, height: 108 * s,
      borderRadius: 8 * s, background: "#E2DED2", display: "flex", alignItems: "flex-end",
      gap: 7 * s, padding: 12 * s }}>
      {[38, 62, 46, 84, 70].map((h, i) => (
        <div key={"bc" + i} style={{ width: 20 * s, height: h * s, borderRadius: 4 * s,
          background: i === 3 ? c : "#A9A294" }} />
      ))}
    </div>
    {/* a pull quote, with an actual quote mark */}
    <div style={{ position: "absolute", left: 190 * s, top: 70 * s, width: 214 * s }}>
      <div style={{ ...ui(44 * s, 900), color: hexa(dkh(c, 0.30), 0.30), lineHeight: 0.7 }}>&ldquo;</div>
      {[0, 1, 2].map((i) => (
        <div key={"pq" + i} style={{ marginTop: 9 * s, width: (204 - i * 34) * s, height: 11 * s,
          borderRadius: 5 * s, background: dkh(c, 0.36), opacity: 0.72 - i * 0.12 }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: 16 * s, bottom: 14 * s, width: 118 * s,
      height: 26 * s, borderRadius: 13 * s, background: hexa(c, 0.26),
      border: `${2 * s}px solid ${hexa(c, 0.5)}` }} />
  </div>
);

/** ⭐ CONTENT BEING INGESTED — fragments lifting off the page and streaming up
    into each lens, continuously, for as long as the head is reading.
    ⛔ At 14s the shot was two arms that had ARRIVED and were waiting: the swing
    is 16 frames, the shot is 52, so two thirds of it was a hold. Reading is a
    continuous act and it should look like one. */
export const Ingest: React.FC<{ f: number; at: number; x0: number; y0: number;
  x1: number; y1: number; c: string; n?: number; s?: number; z?: number; speed?: number }> =
  ({ f, at, x0, y0, x1, y1, c, n = 4, s = 1, z = 66, speed = 0.045 }) => {
  if (f < at) return null;
  const lf = f - at;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const t = ((lf * speed) + i / n) % 1;
      const px = x0 + (x1 - x0) * t + Math.sin(t * Math.PI * 2 + i) * 16 * s;
      const py = y0 + (y1 - y0) * t;
      const sz = (34 - t * 16) * s;
      return (
        <div key={"ig" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz * 0.34,
          width: sz, height: sz * 0.66, borderRadius: 4 * s, background: c, zIndex: z,
          opacity: 0.92 - t * 0.5, transform: `rotate(${t * 180 * (i % 2 ? 1 : -1)}deg)` }} />
      );
    })}
  </>);
};


/** ⛔⛔⛔ THE ALARM IS A SEPARATE OVERLAY, NOT A CHILD OF `NightDesk`.
    SEVENTH stacking-context bug of this build, and the second on this exact
    prop: the alarm was authored inside NightDesk (z=44) while `TypedScreen`
    (z=46) is its SIBLING in the scene, so the sibling painted straight over it
    and the alarm was invisible while the bezel around it turned red.
    ⭐ **A child cannot out-stack its parent's sibling.** When two things must
    layer against each other, they have to be siblings at the same level with
    explicit z — so the alarm is now placed by the scene, above everything on
    the desk, with its own geometry. */
export const ScreenAlarm: React.FC<{ f: number; x: number; y: number; w: number; h: number;
  alarm: number; s?: number; z?: number }> =
  ({ f, x, y, w, h, alarm, s = 1, z = 48 }) => {
  if (alarm <= 0.01) return null;
  const beat = Math.sin(f / 2.6) > 0 ? 1 : 0.20;
  const A = alarm * beat;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 4 * s, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: hexa("#C43A2E", 0.34 + 0.46 * A) }} />
      {/* hazard chevrons, top and bottom */}
      {[0, 1].map((row) => (
        <div key={"hb" + row} style={{ position: "absolute", left: 0, right: 0,
          [row ? "bottom" : "top"]: 0, height: 20 * s, overflow: "hidden", display: "flex" }}>
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} style={{ width: 20 * s, height: 20 * s, flex: "0 0 auto",
              background: (i + row) % 2 ? "#F0C979" : "#C43A2E",
              transform: "skewX(-24deg)", opacity: alarm }} />
          ))}
        </div>
      ))}
      {/* a red sweep running down behind the symbol */}
      <div style={{ position: "absolute", left: 0, right: 0, top: ((f * 6) % (h + 30)) - 30,
        height: 26 * s, background: hexa("#FF6A55", 0.5 * alarm) }} />
      {/* ⭐ THE BIG WARNING TRIANGLE */}
      <div style={{ position: "absolute", left: "50%", top: "52%",
        transform: `translate(-50%, -50%) scale(${0.92 + 0.14 * A})`, opacity: alarm }}>
        <svg width={h * 0.62} height={h * 0.56} viewBox="0 0 92 82">
          <path d="M46 4 L90 78 L2 78 Z" fill="#F7D98C" stroke="#7E1E14"
            strokeWidth="8" strokeLinejoin="round" />
          <rect x="40" y="26" width="12" height="30" rx="6" fill="#7E1E14" />
          <circle cx="46" cy="66" r="7" fill="#7E1E14" />
        </svg>
      </div>
    </div>
  );
};
