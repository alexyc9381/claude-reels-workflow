import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  Contact, Ring, Puff, hexa, dkh, mxh, E, OUT, IO, BACK, IN_Q, LIN, SH, SH_D, rnd,
  idle, squash, shake, rock, CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE, TEAL,
  VIOLET, MINT, R2, CANDIDATES,
} from "./Pg3World";

/* ===========================================================================
   REEL 109 · "PLUGINS3" — THE PROPS.

   ⭐⭐⭐ PROPS NEED REAL DRAWING, NOT PRIMITIVES. "A whole lot of nothing even
   though there's more stuff" was a book drawn as FOUR DIVS. Count the divs per
   object BEFORE adding objects: detail-per-object and object-COUNT are
   different dials, and fewer/thicker props buy legibility.

   ⭐⭐⭐ SPRITES NEED AN ACTION LOOP, NOT AN IDLE. The single biggest measured
   lift of reel 107 (failures 3/11 -> 1/11, every scene rose). A sine bob is an
   IDLE; an idle is not an action. Four loops, chosen by index, each on its own
   phase and rate.
   ⛔ AND AN ACTION LOOP IS STILL AN IDLE IF THE SPRITE DOESN'T CHANGE THE
      WORLD (reel 108). Where a sprite is the subject of a beat it is given a
      lever, a crate or a spool that MOVES because of it.
   ========================================================================= */

/* ===========================================================================
   ⭐ ALL TWELVE COSTUME LEVERS, cycled DETERMINISTICALLY by index — never
   random, so a re-render is identical. Reel 107 shipped FOUR and was told so.
   ========================================================================= */
export const COSTUMES: Array<Record<string, number | string>> = [
  { glasses: 1 }, { suit: 1 }, { constr: 1 }, { prof: 1 }, { chef: 1 },
  { wizard: 1 }, { samurai: 1 }, { cop: 1 }, { beard: 1 }, { fro: 1 },
  { girl: 1 }, { xeyes: 1 }, { glasses: 1, beard: 1 }, { suit: 1, glasses: 1 },
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

/** ⛔⛔ NO BOLTED-ON LIMBS. `SlopKit.Mascot` is a solid clay box with no arms in
    its design language, so a rounded rect stuck on its flank reads as a cylinder
    floating beside it. ⭐ THE ACTION COMES FROM THE BODY AND FROM THE OBJECT:
    a deep lean into the work on the down-beat, a counter-rock on the up. */
export const Worker: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  seed?: number; phase?: number; rate?: number } & Record<string, any>> =
  ({ f, x, y, s = 200, z = 60, seed = 0, phase = 0, rate = 1, ...m }) => {
  const t = f * rate + phase;
  const lean = Math.sin(t / 7) * 9 + Math.sin(t / 3.3) * 2.6;
  const bob = Math.sin(t / 7) * 5.2;
  return <Actor f={f} x={x} y={y} s={s} z={z} seed={seed} bob={bob} lean={lean} {...m} />;
};

/** a sprite that actually COVERS GROUND — a walk is stride lift + body lean +
    travel, never a bob at a fixed x */
export const Walker: React.FC<{ f: number; x0: number; x1: number; y: number; s?: number;
  z?: number; at?: number; dur?: number; seed?: number } & Record<string, any>> =
  ({ f, x0, x1, y, s = 150, z = 60, at = 0, dur = 90, seed = 0, ...m }) => {
  const k = E(f, at, at + dur, 0, 1, LIN);
  const x = x0 + (x1 - x0) * k;
  const stride = Math.abs(Math.sin((f - at) / 7.5)) * 9;
  const lean = Math.sin((f - at) / 15) * 5 + (x1 > x0 ? 3 : -3);
  return <Actor f={f} x={x} y={y - stride} s={s} z={z} seed={seed} lean={lean} {...m} />;
};

/* ===========================================================================
   ⭐⭐⭐ THE CROWD — sprites that ARRIVE FAST AND BIG, then run an ACTION LOOP.
   Two measured laws, both of which cost reel 107 a round:
     1 A GENTLE ARRIVAL IS NOT AN EVENT. Crowds easing in over 13 frames measured
       WORSE than the slabs they replaced (CTA 8.54 -> 5.14). Fixed by scaling up
       and shortening the arrival to EIGHT frames with a longer travel + squash.
     2 THEY LANDED AND THEN STOOD THERE. Four action loops, by index.
   ⛔ SPACING IS ARITHMETIC: `spacing >= 0.85 * (rA + rB)`. Compute the pitch
      BEFORE adding count — 18 at s=148 over 600px in 6 cols is 120px of pitch
      for ~126px bodies and renders as one unreadable mass.
   ========================================================================= */
export const Crowd: React.FC<{ f: number; x: number; y: number; n?: number; cols?: number;
  pitchX?: number; pitchY?: number; s?: number; z?: number; at?: number; every?: number;
  from?: "l" | "r" | "b"; seed?: number; costume?: (i: number) => Record<string, any> }> =
  ({ f, x, y, n = 10, cols = 5, pitchX = 190, pitchY = 96, s = 130, z = 56,
     at = 0, every = 5, from = "l", seed = 0, costume = costumeFor }) => (<>
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
      const act = (i + seed) % 4;
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

/* =========================================================================
   S0 — THE HATCHES. Three floor plates that BANG open, and the cartridges
   come UP through them. ⛔ Deliberately NOT reel 104's open (three plugins
   ejecting off a wall and slamming onto a counter) — different geometry,
   different sound, and it plants the rig that pays off at S10.
   ====================================================================== */
export const Hatch: React.FC<{ x: number; y: number; f: number; at: number; w?: number;
  z?: number; c?: string }> = ({ x, y, f, at, w = 168, z = 30, c = "#4E5878" }) => {
  const k = E(f, at, at + 6, 0, 1, OUT);
  return (<>
    {/* the recess it opens onto */}
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: 40,
      borderRadius: 6, background: "#0A0D16", zIndex: z,
      border: `3px solid ${dkh(c, 0.30)}` }} />
    {/* the light coming UP out of it once open */}
    {k > 0 && (
      <div style={{ position: "absolute", left: x - w / 2 + 8, top: y - 130 * k, width: w - 16,
        height: 130 * k, zIndex: z + 1, opacity: 0.34 * k,
        background: `linear-gradient(0deg, ${hexa(GOLD, 0.95)} 0%, ${hexa(GOLD, 0)} 100%)`,
        clipPath: "polygon(0 100%, 100% 100%, 82% 0, 18% 0)" }} />
    )}
    {/* the two plates, hinging outward */}
    {[-1, 1].map((d) => (
      <div key={"hp" + d} style={{ position: "absolute", left: x + (d < 0 ? -w / 2 : 0),
        top: y - 6, width: w / 2, height: 22, borderRadius: 4, zIndex: z + 4,
        background: `linear-gradient(180deg,${mxh(c, 0.22)} 0%,${dkh(c, 0.16)} 100%)`,
        border: `2px solid ${dkh(c, 0.34)}`, boxShadow: SH,
        transformOrigin: d < 0 ? "0% 50%" : "100% 50%",
        transform: `rotate(${d * k * 74}deg) translateY(${-k * 5}px)` }} />
    ))}
  </>);
};

/* =========================================================================
   S2 — THE CANDIDATE CARD. Real names from the plugin's own docs, flying out
   of the scan and landing in its category chute. ⛔ NO invented scores, no
   install counts, no per-item numbers — the plugin publishes none.
   ====================================================================== */
export const CandidateCard: React.FC<{ f: number; i: number; at: number; x0: number;
  y0: number; x1: number; y1: number; z?: number; s?: number; top2?: boolean }> =
  ({ f, i, at, x0, y0, x1, y1, z = 60, s = 1, top2 = false }) => {
  const k = E(f, at, at + 13, 0, 1, OUT);
  if (k <= 0) return null;
  const c = CANDIDATES[i % CANDIDATES.length];
  /* a real arc, not a straight tween — it is thrown, so it rises then falls */
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 108;
  const rot = (1 - k) * 26 - 8;
  const land = k >= 1;
  return (<>
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${rot}deg) scaleY(${squash(f, at + 12, 0.22)})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ width: 152 * s, borderRadius: 9 * s, background: PAPER,
        border: `${3 * s}px solid ${top2 && land ? GOLD : "#CFC7B4"}`, boxShadow: SH,
        padding: `${9 * s}px ${11 * s}px` }}>
        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 16 * s, color: INK,
          whiteSpace: "nowrap", letterSpacing: "-0.02em" }}>{c.t}</span>
      </div>
      {/* the rank bar the top two get — a VALUE, drawn, never a numeral */}
      {top2 && land && (
        <div style={{ width: 152 * s, height: 11 * s, marginTop: 4 * s, borderRadius: 6 * s,
          background: GOLD, boxShadow: SH }} />
      )}
    </div>
    <Ring x={x + 76 * s} y={y + 40 * s} f={f} at={at + 12} c={top2 ? GOLD : "#F2D3A2"}
      z={z - 1} max={96} dur={14} />
  </>);
};

/* =========================================================================
   S3 — THE HANDED STACK. The ranked recommendations, landing in his arms.
   ⛔⛔ NO `10x` ANYWHERE IN THIS FILE. The audio carries the multiplier; the
   picture carries the handoff. Guard: `MULTIPLIER_BANNED` in Pg3World.
   ====================================================================== */
export const HandStack: React.FC<{ f: number; x: number; y: number; at: number; n?: number;
  z?: number; s?: number }> = ({ f, x, y, at, n = 6, z = 66, s = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const a = at + i * 3;
      const k = E(f, a, a + 9, 0, 1, BACK);
      if (k <= 0) return null;
      const wob = Math.sin((f - a) / 9 + i) * (2.6 + i * 0.5);
      return (
        <div key={"hs" + i} style={{ position: "absolute", left: x + wob,
          top: y - i * 26 * s + (1 - k) * -220, zIndex: z + i,
          transform: `rotate(${wob * 0.7 + (1 - k) * 24}deg) scaleY(${squash(f, a + 8, 0.18)})`,
          transformOrigin: "50% 100%", opacity: Math.min(1, k * 1.6) }}>
          <div style={{ width: (196 - i * 6) * s, height: 30 * s, borderRadius: 7 * s,
            background: i % 2 ? PAPER : "#EDE7DA", border: `${3 * s}px solid #CFC7B4`,
            boxShadow: SH, display: "flex", alignItems: "center", paddingLeft: 12 * s }}>
            <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: GOLD }} />
            <div style={{ marginLeft: 9 * s, width: (110 - i * 6) * s, height: 8 * s,
              borderRadius: 4 * s, background: "#C6BEA9" }} />
          </div>
        </div>
      );
    })}
  </>);

/* =========================================================================
   THE RIG — the rolling machine that carries the three cartridges. It is the
   hero artifact on wheels: chassis, deck, two wheel bogies with real spokes,
   a cab, headlights and an exhaust. Twenty-two elements, drawn.
   ====================================================================== */
export const Rig: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  seated?: number; lightsOn?: number; roll?: number; tilt?: number }> =
  ({ f, x, y, s = 1, z = 50, seated = 3, lightsOn = 1, roll = 1, tilt = 0 }) => {
  const bounce = Math.sin(f / 5.5) * 2.6 * roll + Math.sin(f / 2.7) * 1.1 * roll;
  const spin = (f * 9 * roll) % 360;
  return (
    <div style={{ position: "absolute", left: x, top: y + bounce, zIndex: z,
      transform: `rotate(${tilt}deg)`, transformOrigin: "50% 90%" }}>
      {/* the chassis */}
      <div style={{ position: "absolute", left: 0, top: 84 * s, width: 442 * s, height: 92 * s,
        borderRadius: 12 * s, background: "linear-gradient(174deg,#2E3644 0%,#151A22 100%)",
        border: `${4 * s}px solid #3E4A5A`, boxShadow: SH_D }} />
      {/* the deck rail */}
      <div style={{ position: "absolute", left: 14 * s, top: 72 * s, width: 414 * s,
        height: 16 * s, borderRadius: 5 * s, background: "#48546A" }} />
      {/* the cab, front right */}
      <div style={{ position: "absolute", left: 322 * s, top: 4 * s, width: 122 * s,
        height: 88 * s, borderRadius: `${14 * s}px ${10 * s}px 0 0`,
        background: "linear-gradient(168deg,#3A4454 0%,#1C222C 100%)",
        border: `${4 * s}px solid #4E5A6E` }} />
      <div style={{ position: "absolute", left: 336 * s, top: 18 * s, width: 94 * s,
        height: 44 * s, borderRadius: 6 * s,
        background: hexa("#BBD4E8", 0.30 + lightsOn * 0.30) }} />
      {/* the three cartridge bays on the deck — the hero artifact, riding */}
      {[0, 1, 2].map((i) => {
        const on = i < seated;
        return (
          <div key={"rb" + i}>
            <div style={{ position: "absolute", left: (26 + i * 98) * s, top: 6 * s,
              width: 84 * s, height: 74 * s, borderRadius: 8 * s, background: "#0A0D13",
              border: `${3 * s}px solid ${on ? hexa(GOLD, 0.60) : "#232A35"}` }} />
            {on && (<>
              <div style={{ position: "absolute", left: (32 * s) + i * 98 * s, top: 12 * s,
                width: 72 * s, height: 62 * s, borderRadius: 6 * s,
                background: [CLAY, SKY, GREEN][i], boxShadow: SH }} />
              <div style={{ position: "absolute", left: (38 * s) + i * 98 * s, top: 18 * s,
                width: 60 * s, height: 9 * s, borderRadius: 5 * s, background: hexa("#FFFFFF", 0.44) }} />
              <div style={{ position: "absolute", left: (92 * s) + i * 98 * s, top: 58 * s,
                width: 11 * s, height: 11 * s, borderRadius: "50%",
                background: hexa("#FFF6DE", 0.5 + Math.sin(f / 8 + i * 2) * 0.4) }} />
            </>)}
          </div>
        );
      })}
      {/* two bogies with REAL spokes, turning */}
      {[54, 300].map((bx, bi) => (
        <div key={"bg" + bi}>
          {[0, 1].map((w) => (
            <div key={w} style={{ position: "absolute", left: (bx + w * 86) * s, top: 158 * s,
              width: 76 * s, height: 76 * s, borderRadius: "50%",
              background: "radial-gradient(circle,#39414F 0%,#39414F 26%,#191E27 28%,#0E1218 100%)",
              border: `${5 * s}px solid #4A5566`,
              transform: `rotate(${spin + w * 40 + bi * 20}deg)` }}>
              {[0, 1, 2, 3].map((k) => (
                <div key={k} style={{ position: "absolute", left: 33 * s, top: 4 * s,
                  width: 5 * s, height: 30 * s, background: "#5C6A80",
                  transformOrigin: "50% 100%", transform: `rotate(${k * 90}deg)` }} />
              ))}
            </div>
          ))}
        </div>
      ))}
      {/* headlights — a hard wedge, not a blur */}
      {lightsOn > 0 && (
        <div style={{ position: "absolute", left: 440 * s, top: 96 * s, width: 300 * s,
          height: 96 * s, zIndex: 2, opacity: 0.42 * lightsOn,
          clipPath: "polygon(0 34%, 0 66%, 100% 100%, 100% 0)",
          background: `linear-gradient(90deg, ${hexa("#FFE9BC", 0.95)} 0%, ${hexa("#FFE9BC", 0)} 100%)` }} />
      )}
      <div style={{ position: "absolute", left: 428 * s, top: 112 * s, width: 22 * s,
        height: 24 * s, borderRadius: 5 * s,
        background: hexa("#FFF3D4", 0.35 + lightsOn * 0.6) }} />
      {/* the stack, puffing on its own clock */}
      <div style={{ position: "absolute", left: 6 * s, top: 34 * s, width: 26 * s,
        height: 56 * s, borderRadius: 5 * s, background: "#232A35" }} />
      {Array.from({ length: 3 }, (_, i) => {
        const ph = ((f * roll) + i * 15) % 45;
        return (
          <div key={"ex" + i} style={{ position: "absolute", left: (8 - ph * 0.5) * s,
            top: (30 - ph * 1.5) * s, width: (16 + ph * 0.7) * s, height: (16 + ph * 0.7) * s,
            borderRadius: "50%", background: hexa("#9AA6B4", 0.26 * (1 - ph / 45)) }} />
        );
      })}
    </div>
  );
};

/* =========================================================================
   S5 — THE ENDPOINT. Many becoming one: the CONVERGENCE shape.
   ⛔ Distinct from S2's LIST/SORT so the two do not read as one arrangement
   used twice ("one arrangement is not a visual language").
   ====================================================================== */
export const Endpoint: React.FC<{ f: number; x: number; y: number; at: number; s?: number;
  z?: number }> = ({ f, x, y, at, s = 1, z = 74 }) => {
  const k = E(f, at, at + 10, 0, 1, BACK);
  if (k <= 0) return null;
  const pulse = 0.6 + Math.abs(Math.sin(f / 6)) * 0.4;
  return (<>
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${k})`, transformOrigin: "50% 50%" }}>
      <div style={{ width: 236 * s, height: 118 * s, borderRadius: 16 * s, background: PAPER,
        border: `${5 * s}px solid ${dkh(SKY, 0.16)}`, boxShadow: SH_D,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 3 * s }}>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 46 * s, color: INK,
          letterSpacing: "-0.03em" }}>/v1</span>
        {/* ⛔ `ONE ENDPOINT` was prose under a noun that already says it. `/v1`
            stays because it is a REAL product noun, which the house rule lists
            by name alongside `429` and `MIT` — a path is not a sentence. */}
        <div style={{ display: "flex", gap: 6 * s, marginTop: 2 * s }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: 22 * s, height: 8 * s, borderRadius: 4 * s,
              background: hexa(SKY, 0.30 + Math.abs(Math.sin(f / 7 + i)) * 0.55) }} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 100 * s, top: -18 * s, width: 36 * s,
        height: 12 * s, borderRadius: 6 * s, background: hexa(SKY, pulse) }} />
    </div>
    <Ring x={x + 118 * s} y={y + 59 * s} f={f} at={at + 9} c={SKY} z={z - 1} max={230} dur={20} />
  </>);
};

/** the cables that converge on it — a real drawn run with a travelling pulse */
export const CableRun: React.FC<{ f: number; x0: number; y0: number; x1: number; y1: number;
  at: number; c?: string; z?: number; w?: number }> =
  ({ f, x0, y0, x1, y1, at, c = SKY, z = 34, w = 5 }) => {
  const k = E(f, at, at + 11, 0, 1, OUT);
  if (k <= 0) return null;
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy) * k;
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  const ph = ((f - at) * 7) % Math.max(len, 1);
  return (<>
    <div style={{ position: "absolute", left: x0, top: y0, width: len, height: w, zIndex: z,
      background: hexa(c, 0.44), transformOrigin: "0% 50%", transform: `rotate(${ang}deg)` }} />
    {/* the pulse travelling down it — the background process on this scene */}
    {k >= 1 && (
      <div style={{ position: "absolute", left: x0, top: y0 - 2, width: 46, height: w + 4,
        zIndex: z + 1, background: hexa("#FFFFFF", 0.72), borderRadius: 4,
        transformOrigin: "0% 50%",
        transform: `rotate(${ang}deg) translateX(${ph}px)` }} />
    )}
  </>);
};

/* =========================================================================
   S6 — THE VILLAIN. ⛔⛔ THE SHUTTER IS NEVER REMOVED, ONLY ROUTED AROUND: it
   is still standing, shut, when the rig has gone. That is the honest mechanism
   (OmniRoute does not raise your limit — it fails over) and it is the villain's
   integrity: it wins exactly once and is never beaten twice.
   ====================================================================== */
export const Shutter: React.FC<{ f: number; at: number; x: number; y: number; w?: number;
  h?: number; z?: number }> = ({ f, at, x, y, w = 700, h = 330, z = 62 }) => {
  const k = E(f, at, at + 7, 0, 1, IN_Q);          /* it SLAMS — in-quad, fast */
  if (k <= 0) return null;
  const jolt = shake(f, at + 7, 13, 9);
  /* ⭐ IT DOES NOT LAND AND STOP. After the slam the whole shutter keeps
     RATTLING in its frame — a damped oscillation that never quite settles. This
     is a 700x340 object moving, i.e. the only shape the motion audit rewards
     (LARGE x BRIGHT x FAST), during the beat that is otherwise a deliberate
     stall. v1 measured 7.53 here, the weakest of the three story scenes. */
  const rat = rock(f, at + 7, 9.0, 38);
  const rat2 = rock(f, at + 7, 4.5, 22);
  return (<>
    <div style={{ position: "absolute", left: x + jolt.x * 0.5 + rat, top: y - h + h * k + jolt.y * 0.6 + rat2, width: w,
      height: h, zIndex: z, boxShadow: SH_D,
      background: "linear-gradient(180deg,#8E2A22 0%,#5A1414 100%)",
      border: "6px solid #B4453A" }}>
      {/* real roller slats, not a flat plate — and each one rattles on its own
          phase, so the plate is never one flat value moving as a block */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0,
          top: 8 + i * 35 + rock(f, at + 7, 3.4, 30 + i * 3) * (i % 2 ? 1 : -1),
          height: 26, background: i % 2 ? "#7A2019" : "#96322A",
          borderTop: "2px solid #B4453A" }} />
      ))}
      {/* ⭐ AND A HAZARD CHEVRON RUNNING ACROSS ALL NINE, CONTINUOUSLY. The
          shutter is the only large object on screen during a deliberate stall,
          so it has to carry the scene's background process itself. Chevrons are
          also just what a closed industrial shutter is painted with. */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = ((i * 68 - (f - at) * 5.2) % 952) - 120;
        return (
          <div key={"cv" + i} style={{ position: "absolute", left: x, top: 6,
            width: 34, height: h - 12, zIndex: 2,
            transform: "skewX(-26deg)",
            background: i % 2 ? "rgba(255,214,120,0.22)" : "rgba(10,3,5,0.30)" }} />
        );
      })}
      {/* the thing every Claude Code user dreads, spelled out */}
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.34,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ padding: "10px 24px", borderRadius: 10, background: "#1C0708",
          border: "4px solid #E4574A" }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: "#FFD9D2",
            letterSpacing: "-0.02em" }}>usage limit reached</span>
        </div>
      </div>
    </div>
    {/* the impact, at the floor */}
    <Ring x={x + w / 2} y={y + h} f={f} at={at + 6} c="#FF8A6E" z={z - 1} max={330} dur={20} />
    <Puff x={x + w / 2} y={y + h} f={f} at={at + 6} c="#C08078" z={z - 1} n={11} s={1.5} />
  </>);
};

/** ⭐ THE WARNING BEACONS — two rotating lamps on the limit gantry, each
    throwing a hard wedge that sweeps the FULL width of the road. They exist
    because S6 is a deliberate STALL: between the slam and the cascade nothing
    is allowed to move, and v3 measured 8.49 there against a 10.81 median. A
    beacon is the one thing that can run continuously through a stall without
    contradicting it — it is what a stopped machine actually does.
    ⛔ Light AND shadow: each wedge is paired with a dark counter-wedge 180deg
    out of phase, so the sweep never lifts the black point. */
export const Beacons: React.FC<{ f: number; at: number; y?: number; z?: number }> =
  ({ f, at, y = 96, z = 47 }) => {
  if (f < at) return null;
  const t = f - at;
  return (<>
    {[196, 816].map((bx, i) => {
      const a = (t * 7.5 + i * 180) % 360;
      const rad = (a * Math.PI) / 180;
      const lit = Math.max(0, Math.cos(rad));
      const dark = Math.max(0, -Math.cos(rad));
      return (<React.Fragment key={"bc" + i}>
        {/* the wedge it throws */}
        <div style={{ position: "absolute", left: bx - 330, top: y + 34, width: 660,
          height: 560, zIndex: z, opacity: 0.40 * lit,
          transform: `rotate(${Math.sin(rad) * 26}deg)`, transformOrigin: "50% 0%",
          clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, rgba(255,140,110,0.95) 0%, rgba(255,140,110,0) 100%)` }} />
        {/* the counter-shadow, so the sweep is a VALUE change both ways */}
        <div style={{ position: "absolute", left: bx - 330, top: y + 34, width: 660,
          height: 560, zIndex: z - 1, opacity: 0.42 * dark,
          transform: `rotate(${-Math.sin(rad) * 26}deg)`, transformOrigin: "50% 0%",
          clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
          background: "linear-gradient(180deg, rgba(6,2,4,0.96) 0%, rgba(6,2,4,0) 100%)" }} />
        {/* the lamp housing itself */}
        <div style={{ position: "absolute", left: bx - 26, top: y, width: 52, height: 40,
          borderRadius: 8, background: "#2A1014", border: "3px solid #6A2229", zIndex: z + 2 }} />
        <div style={{ position: "absolute", left: bx - 17, top: y + 9, width: 34, height: 22,
          borderRadius: 5, background: hexa("#FFD9CE", 0.24 + lit * 0.72), zIndex: z + 3 }} />
      </React.Fragment>);
    })}
  </>);
};

/** the four-tier cascade — the honest mechanism behind the word "unlimited".
    ⛔ No `∞`, no "UNLIMITED" plate anywhere: OmniRoute's README never claims it.
    Its own words are "never hit limits", delivered by exactly this. */
export const Cascade: React.FC<{ f: number; x: number; y: number; at: number; every?: number;
  s?: number; z?: number }> = ({ f, x, y, at, every = 7, s = 1, z = 80 }) => (<>
    {/* ⭐ EVERY FAILED TIER THROWS A FULL-WIDTH BAND. A 60px plate lighting up is
        0.4% of the panel; the same event carried as a 1012x92 wash is 11.7% and
        it is the difference between the cascade being AUDIBLE and being SEEN.
        ⛔ Light AND shadow: the band is a hard red bar with a dark under-edge,
        never a light-only wash, which lifts the black point. */}
    {R2.tiers.map((t, i) => {
      const a = at + i * every;
      const kk = E(f, a, a + 4, 0, 1, OUT) - E(f, a + 4, a + 11, 0, 1, IO);
      if (kk <= 0.01) return null;
      const ok = i === R2.tiers.length - 1;
      return (
        <div key={"cw" + i} style={{ position: "absolute", left: -60, right: -60,
          top: y + i * 62 * s - 14 * s, height: 78 * s, zIndex: z - 6, opacity: kk * 0.55,
          background: `linear-gradient(180deg,${hexa(ok ? GREEN : RED, 0.85)} 0%,rgba(6,2,4,0.92) 100%)` }} />
      );
    })}
    {R2.tiers.map((t, i) => {
      const a = at + i * every;
      const k = E(f, a, a + 6, 0, 1, BACK);
      if (k <= 0) return null;
      const ok = i === R2.tiers.length - 1;
      return (
        <div key={"tc" + i} style={{ position: "absolute", left: x, top: y + i * 62 * s,
          zIndex: z + i, opacity: Math.min(1, k * 1.7),
          transform: `translateX(${(1 - k) * -70}px) scaleY(${squash(f, a + 5, 0.18)})`,
          transformOrigin: "0% 50%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 * s,
            padding: `${9 * s}px ${16 * s}px`, borderRadius: 11 * s,
            background: ok ? GREEN : "#2A1013",
            border: `${3 * s}px solid ${ok ? mxh(GREEN, 0.24) : "#5A2028"}`, boxShadow: SH }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26 * s,
              color: ok ? "#0C2A1E" : "#E8B8B0", letterSpacing: "0.02em",
              whiteSpace: "nowrap" }}>{t}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28 * s,
              color: ok ? "#0C2A1E" : "#E4574A" }}>{ok ? "✓" : "✗"}</span>
          </div>
        </div>
      );
    })}
  </>);

/* =========================================================================
   S7 — THE TOKENS. ⭐ A token is ALREADY a physical coin — the subject's own
   object, no translation. And a PILE DOES ARITHMETIC FOR YOU: four coins beside
   a mound of the same coin is the comparison PROVED, not asserted.
   ====================================================================== */
export const CoinFall: React.FC<{ f: number; at: number; x: number; y0: number; y1: number;
  n?: number; spread?: number; s?: number; z?: number; seed?: number }> =
  ({ f, at, x, y0, y1, n = 26, spread = 300, s = 1, z = 52, seed = 3 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const a = at + (i % 9) * 3 + Math.floor(i / 9) * 2;
      const k = E(f, a, a + 15, 0, 1, IN_Q);         /* it FALLS — accelerating */
      if (k <= 0) return null;
      const dx = (rnd(i + seed, 11) - 0.5) * spread;
      const rest = k >= 1;
      const yy = y0 + (y1 - y0) * k + (rest ? 0 : 0);
      const wob = rest ? Math.sin(f / 6 + i) * 1.4 : 0;
      return (
        <div key={"cn" + i} style={{ position: "absolute", left: x + dx, top: yy + wob,
          zIndex: z + (i % 5),
          transform: `rotate(${(1 - k) * 220 + i * 17}deg) scaleY(${rest ? 1 : 0.86})` }}>
          <div style={{ width: 46 * s, height: 46 * s, borderRadius: "50%",
            background: "radial-gradient(circle at 36% 30%,#FFE9A8 0%,#E7B24C 46%,#A97A20 100%)",
            border: `${3 * s}px solid #8A6218`, boxShadow: SH }} />
          <div style={{ position: "absolute", left: 13 * s, top: 13 * s, width: 20 * s,
            height: 20 * s, borderRadius: "50%", border: `${3 * s}px solid ${hexa("#8A6218", 0.6)}` }} />
        </div>
      );
    })}
  </>);

/** the mound the coins build into, growing with `k` */
export const Mound: React.FC<{ f: number; x: number; y: number; k: number; s?: number;
  z?: number; rows?: number }> = ({ f, x, y, k, s = 1, z = 48, rows = 6 }) => (<>
    {Array.from({ length: rows }, (_, r) => {
      const inRow = rows * 2 - r * 2 - 1;
      const shown = Math.max(0, Math.min(inRow, Math.round(inRow * Math.max(0, (k - r * 0.10) / 0.55))));
      return Array.from({ length: shown }, (_, i) => (
        <div key={"md" + r + "_" + i} style={{ position: "absolute",
          left: x - (inRow * 40 * s) / 2 + i * 40 * s + (r % 2) * 10 * s,
          top: y - r * 30 * s, zIndex: z + r,
          transform: `rotate(${(i * 31 + r * 17) % 24 - 12}deg)` }}>
          <div style={{ width: 46 * s, height: 46 * s, borderRadius: "50%",
            background: "radial-gradient(circle at 36% 30%,#FFE9A8 0%,#E7B24C 46%,#A97A20 100%)",
            border: `${3 * s}px solid #8A6218` }} />
        </div>
      ));
    })}
  </>);

/** the rolling counter — ⭐ A NUMBER MOVES TO ITS VALUE; it is never typeset at
    it. Lands on the REPO'S OWN audited figure with its source plate under it. */
export const Counter: React.FC<{ f: number; x: number; y: number; at: number; dur?: number;
  v: string; unit: string; src: string; s?: number; z?: number }> =
  ({ f, x, y, at, dur = 46, v, unit, src, s = 1, z = 84 }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  if (k <= 0) return null;
  /* roll the mantissa up to the real figure, then hold */
  const target = parseFloat(v.replace(/[^0-9.]/g, "")) || 1.53;
  const now = (target * k).toFixed(2);
  const done = k >= 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scaleY(${done ? squash(f, at + dur, 0.10) : 1})`, transformOrigin: "50% 100%" }}>
      <div style={{ padding: `${14 * s}px ${26 * s}px`, borderRadius: 16 * s, background: PAPER,
        border: `${5 * s}px solid ${dkh(GOLD, 0.14)}`, boxShadow: SH_D, textAlign: "center" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 68 * s,
          color: INK, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
          ~{now}B
        </span>
        <div style={{ marginTop: -4 * s }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s,
            letterSpacing: "0.08em", color: "#8A6218" }}>/ MO</span>
        </div>
      </div>
      {/* ⛔ THE SOURCE PLATE. A made-up number on a receipt-shaped object is the
          most believable kind of wrong, so the receipt names where it came from. */}
      {done && (
        <div style={{ marginTop: 8 * s, display: "flex", justifyContent: "center" }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 14 * s,
            letterSpacing: "0.06em", color: "#E4D4AC", background: "rgba(10,8,4,0.62)",
            padding: `${5 * s}px ${11 * s}px`, borderRadius: 7 * s }}>{src}</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   S8/S9 — THE SPOOL. claude-mem, drawn as the thing it is: a reel that
   records a session and plays it back. ⛔ NOT reel 104's labelled trays.
   ====================================================================== */
export const Spool: React.FC<{ f: number; x: number; y: number; at: number; s?: number;
  z?: number; spin?: number; c?: string }> =
  ({ f, x, y, at, s = 1, z = 66, spin = 1, c = MINT }) => {
  const k = E(f, at, at + 10, 0, 1, BACK);
  if (k <= 0) return null;
  const rot = ((f - at) * 3.4 * spin) % 360;
  const drop = (1 - k) * -300;
  return (<>
    <div style={{ position: "absolute", left: x, top: y + drop, zIndex: z,
      transform: `scale(${0.7 + k * 0.3})`, transformOrigin: "50% 50%" }}>
      {/* the housing */}
      <div style={{ position: "absolute", left: -22 * s, top: -22 * s, width: 244 * s,
        height: 244 * s, borderRadius: 22 * s,
        background: "linear-gradient(168deg,#164A38 0%,#08221A 100%)",
        border: `${5 * s}px solid #22684F`, boxShadow: SH_D }} />
      {/* the reel itself, turning */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 200 * s, height: 200 * s,
        borderRadius: "50%", transform: `rotate(${rot}deg)`,
        background: `radial-gradient(circle,#0B2E22 0%,#0B2E22 22%,${dkh(c, 0.30)} 24%,#0E3A2C 100%)`,
        border: `${5 * s}px solid ${c}` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: 92 * s, top: 12 * s,
            width: 12 * s, height: 78 * s, borderRadius: 6 * s, background: hexa(c, 0.72),
            transformOrigin: "50% 100%", transform: `rotate(${i * 72}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 78 * s, top: 78 * s, width: 44 * s,
          height: 44 * s, borderRadius: "50%", background: c, border: `${4 * s}px solid #0B2E22` }} />
      </div>
      {/* the read head — a real mechanism against the reel */}
      <div style={{ position: "absolute", left: 190 * s, top: 84 * s, width: 54 * s,
        height: 32 * s, borderRadius: 6 * s, background: "#1C5643",
        border: `${3 * s}px solid ${c}` }} />
      <div style={{ position: "absolute", left: 196 * s, top: 92 * s, width: 20 * s,
        height: 16 * s, borderRadius: 3 * s,
        background: hexa("#DFFBEE", 0.4 + Math.abs(Math.sin(f / 5)) * 0.6) }} />
    </div>
    <Ring x={x + 100 * s} y={y + 200 * s} f={f} at={at + 9} c={c} z={z - 1} max={230} dur={18} />
    <Puff x={x + 100 * s} y={y + 200 * s} f={f} at={at + 9} c="#7FBFA0" z={z - 1} n={8} s={1.2} />
  </>);
};

/** ⭐ THE HOUSE DEPICTION for "it remembers across chats": BARS TRAVELLING
    ACROSS A SESSION BOUNDARY. Never labelled trays, never key/value rows. */
export const ContextBar: React.FC<{ f: number; i: number; at: number; x0: number; x1: number;
  y: number; s?: number; z?: number; c?: string }> =
  ({ f, i, at, x0, x1, y, s = 1, z = 60, c = MINT }) => {
  /* ⛔⛔ v3's bar ran one smooth 17-frame `IO` tween and RECALL measured 8.07 —
     the weakest scene in the reel. An ease SPREADS its delta across three
     samples; a hard edge lands inside one. So the crossing is now THREE
     DISCRETE HOPS with a squash on each land: same distance, same duration,
     three times the repainted area per 0.1s. Same trade as the four level-up
     pops that took reel 107's 82-frame growth from 4.27 to 5.63. */
  const HOP = 5;                                    /* frames per hop */
  const step = Math.floor(Math.max(0, f - at) / HOP);
  if (f < at) return null;
  const k = Math.min(1, step / 3);
  const x = x0 + (x1 - x0) * k;
  const w = (108 + (i % 4) * 46) * s;
  const sq = squash(f, at + step * HOP, 0.26, 2, 4);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z + (i % 4),
      opacity: Math.min(1, (f - at) / 3), transform: `scaleY(${sq})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ width: w, height: 26 * s, borderRadius: 13 * s,
        background: `linear-gradient(90deg,${hexa(c, 0.30)} 0%,${c} 100%)`,
        border: `${2 * s}px solid ${dkh(c, 0.24)}`, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 9 * s, top: 8 * s, width: 10 * s,
        height: 10 * s, borderRadius: "50%", background: "#07281D" }} />
    </div>
  );
};

/** the SESSION boundary the bars cross — a real marked line in the room */
export const SessionLine: React.FC<{ x: number; y: number; h?: number; z?: number;
  l?: string; r?: string; f?: number }> =
  ({ x, y, h = 430, z = 44, l = "1", r = "2", f = 0 }) => (<>
    <div style={{ position: "absolute", left: x, top: y, width: 7, height: h, zIndex: z,
      background: hexa("#DFFBEE", 0.44) }} />
    {Array.from({ length: 10 }, (_, i) => (
      <div key={"dl" + i} style={{ position: "absolute", left: x - 4, top: y + i * (h / 10),
        width: 15, height: 22, background: hexa(MINT, 0.30 + ((i + Math.floor(f / 6)) % 3) * 0.20),
        zIndex: z + 1 }} />
    ))}
    {/* ⛔ `SESSION 1` / `SESSION 2` were two more text plates. A NUMERAL on a
        disc says the same thing and is not prose — and the boundary itself,
        which the bars visibly cross, is what carries the meaning. */}
    {[["l", l, x - 108], ["r", r, x + 44]].map(([k, t, px]: any) => (
      <div key={k} style={{ position: "absolute", left: px, top: y - 74, zIndex: z + 2,
        width: 64, height: 64, borderRadius: "50%", background: "rgba(6,26,19,0.86)",
        border: `4px solid ${hexa(MINT, 0.66)}`, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34,
          color: "#CFF0E0" }}>{t}</span>
      </div>
    ))}
  </>);

/** the re-explanation he never has to give: a bubble that rises and is STRUCK
    THROUGH. The picture says "never again" without typesetting the sentence. */
export const CancelBubble: React.FC<{ f: number; x: number; y: number; at: number; s?: number;
  z?: number }> = ({ f, x, y, at, s = 1, z = 86 }) => {
  const k = E(f, at, at + 8, 0, 1, BACK);
  if (k <= 0) return null;
  const strike = E(f, at + 12, at + 20, 0, 1, OUT);
  const fade = E(f, at + 24, at + 34, 1, 0.18, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y - (1 - k) * 30, zIndex: z,
      opacity: Math.min(1, k * 1.6) * fade, transform: `scale(${0.8 + k * 0.2})`,
      transformOrigin: "10% 100%" }}>
      <div style={{ width: 250 * s, borderRadius: 16 * s, background: PAPER,
        border: `${4 * s}px solid #CFC7B4`, padding: `${14 * s}px ${16 * s}px`,
        boxShadow: SH, display: "flex", flexDirection: "column", gap: 8 * s }}>
        {[0, 1, 2].map((i) => (
          <div key={"ln" + i} style={{ width: `${88 - i * 18}%`, height: 12 * s,
            borderRadius: 6 * s, background: "#C6BEA9" }} />
        ))}
      </div>
      {/* the tail */}
      <div style={{ position: "absolute", left: 22 * s, bottom: -16 * s, width: 0, height: 0,
        borderLeft: `${18 * s}px solid transparent`, borderRight: `${8 * s}px solid transparent`,
        borderTop: `${20 * s}px solid ${PAPER}` }} />
      {/* the strike — it is CANCELLED */}
      <div style={{ position: "absolute", left: 8 * s, top: 44 * s, height: 9 * s,
        width: strike * 244 * s, borderRadius: 5 * s, background: RED,
        transform: "rotate(-9deg)" }} />
    </div>
  );
};

/* =========================================================================
   S10 — THE STAMP. The keyword, landing.
   ====================================================================== */
export const StampPlate: React.FC<{ f: number; x: number; y: number; at: number; t: string;
  sub?: string; s?: number; z?: number }> =
  ({ f, x, y, at, t, sub, s = 1, z = 92 }) => {
  const k = E(f, at, at + 6, 0, 1, IN_Q);
  if (k <= 0) return null;
  const sq = squash(f, at + 6, 0.20);
  const rk = rock(f, at + 6, 3.0, 22);
  return (<>
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${1 + (1 - k) * 1.5}) rotate(${rk - 2}deg) scaleY(${sq})`,
      transformOrigin: "50% 100%", opacity: Math.min(1, k * 2) }}>
      <div style={{ padding: `${16 * s}px ${34 * s}px`, borderRadius: 18 * s, background: CLAY,
        border: `${6 * s}px solid ${dkh(CLAY, 0.28)}`, boxShadow: SH_D, textAlign: "center" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62 * s,
          color: "#FFFFFF", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{t}</span>
        {/* ⛔ the sub-line went with everything else. The CTA is the one place a
            reel is allowed words, and it needs exactly two: the keyword. */}
      </div>
    </div>
    <Ring x={x + 200 * s} y={y + 60 * s} f={f} at={at + 5} c={GOLD} z={z - 1} max={330} dur={20} />
    <Puff x={x + 200 * s} y={y + 90 * s} f={f} at={at + 5} c="#E0C48A" z={z - 1} n={10} s={1.6} />
  </>);
};

/* =========================================================================
   ⭐⭐ THE MANIFEST BOARD — S0's claim plate, and the fix for two gate results
   at once.

   `look_audit` on v2 returned **HOOK_LUMA 135.4** (bar 140) and warned
   **HOOK_PLATE 8.4% = HEADER PILL**: three separate repo cards at 6% each are
   never the largest bright object in the frame, so the only cream mass at frame
   0 was the shared header — which is exactly the shape of the four reel-94 cuts
   that did NOT perform, against the two that did (cream plates at 32.7% and
   18.2% of the panel).

   ⭐ ONE object answers both. A 560x430 cream board is 30% of the panel: it is
   the claim plate the hook was missing, and being cream it lifts frame-0 luma
   without touching a single palette dark stop — the move that flattened ten
   reels. And it is not a generic plate: it is a JOB BOARD with the three repos
   pinned to it, so the brightest thing in frame 0 is also the receipts.
   ⛔ It is diegetic furniture, hung on the bay wall with real fixings, not an
      overlay — an overlay at frame 0 is a poster, a board is part of the room.
   ====================================================================== */
export const ManifestBoard: React.FC<{ f: number; x: number; y: number; w?: number;
  h?: number; z?: number; s?: number; children?: React.ReactNode }> =
  ({ f, x, y, w = 560, h = 430, z = 70, s = 1, children }) => (<>
    {/* the two hangers it swings from */}
    {[0.22, 0.78].map((k, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: x + w * k - 5, top: y - 38,
        width: 10, height: 42, background: "#3E486B", zIndex: z - 2 }} />
    ))}
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z - 1,
      borderRadius: 18 * s, background: "linear-gradient(172deg,#FBFAF6 0%,#EAE5D8 100%)",
      border: `${6 * s}px solid #C9C1AC`, boxShadow: SH_D,
      transform: `rotate(${Math.sin(f / 41) * 0.35}deg)`, transformOrigin: "50% -8%" }}>
      {/* the header strip — the mark, big and early, and the claim */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 86 * s,
        borderRadius: `${12 * s}px ${12 * s}px 0 0`, background: "#2B3357",
        display: "flex", alignItems: "center", gap: 14 * s, padding: `0 ${18 * s}px` }}>
        <div style={{ width: 60 * s, height: 60 * s, borderRadius: 14 * s, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 46 * s, height: 46 * s, objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.0 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17 * s,
            letterSpacing: "0.12em", color: "#A9B2D8" }}>CLAUDE CODE · TONIGHT'S BUILD</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40 * s,
            letterSpacing: "-0.03em", color: "#FFFFFF" }}>3 PLUGINS, ALL FREE</span>
        </div>
      </div>
      {/* ⭐ the mark as a board WATERMARK at 260px — the hero scene's 200px+
          requirement, filling what was dead cream, and it can live here because
          a board is not a sprite: nothing about it can land on a face. */}
      <div style={{ position: "absolute", left: w * 0.52, top: h * 0.30, opacity: 0.13,
        width: 260 * s, height: 260 * s }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      {/* the footer receipt — the one number that is the sum of the three above,
          so the board closes on a figure a viewer can add up themselves */}
      <div style={{ position: "absolute", left: 20 * s, right: 20 * s, bottom: 14 * s,
        height: 48 * s, borderRadius: 10 * s, background: "#2B3357",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10 * s }}>
        <span style={{ fontSize: 26 * s, lineHeight: 1, color: GOLD }}>★</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27 * s,
          color: "#FFFFFF", letterSpacing: "-0.02em" }}>174,744</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17 * s,
          letterSpacing: "0.10em", color: "#A9B2D8" }}>COMBINED</span>
      </div>
      {/* the four corner fixings, so it reads as bolted to the wall */}
      {[[16, 100], [16, -22], [-22, 100], [-22, -22]].map((c, i) => (
        <div key={"fx" + i} style={{ position: "absolute",
          left: c[0] < 0 ? undefined : c[0] * s, right: c[0] < 0 ? -c[0] * s : undefined,
          top: c[1] > 0 ? c[1] * s : undefined, bottom: c[1] < 0 ? -c[1] * s : undefined,
          width: 13 * s, height: 13 * s, borderRadius: "50%", background: "#B6AC94" }} />
      ))}
    </div>
    {children}
  </>);

/** the claim plate that opens the reel — ⭐ FRAME 0 IS THE WHOLE CLAIM,
    SETTLED. Not a build, not a reveal: it is already there, and the f6 event
    pushes PAST it. */
export const ClaimPlate: React.FC<{ x: number; y: number; big: string; sub: string;
  s?: number; z?: number; f?: number }> =
  ({ x, y, big, sub, s = 1, z = 86, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18 * s,
      padding: `${16 * s}px ${28 * s}px`, borderRadius: 20 * s, background: PAPER,
      border: `${5 * s}px solid #D8D0BC`, boxShadow: SH_D }}>
      {/* ⛔ THE MARK IS THE AUDIENCE FILTER: big and early, never on the face */}
      <div style={{ width: 96 * s, height: 96 * s, borderRadius: 20 * s, background: "#FFFFFF",
        border: `${3 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 76 * s, height: 76 * s, objectFit: "contain" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 * s }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30 * s,
          color: "#7A756B", letterSpacing: "0.06em", lineHeight: 1.05 }}>{sub}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62 * s,
          color: INK, letterSpacing: "-0.03em", lineHeight: 1.0,
          whiteSpace: "nowrap" }}>{big}</span>
      </div>
    </div>
  </div>
);

/* ===========================================================================
   ⭐⭐⭐ THE SPRITE DEPICTION LAYER — added after v8 was rejected on FIVE notes
   that are all one defect.

   Alex, on a build where every gate was green:
     "the animations shouldnt have text in them, use claude sprite icons or
      something like that instead"
     "the animation at 23 seconds is not good enough its just a bunch of squares
      and rectangles"
     "the beginning hook animation shouldnt have text and it needs to be a way
      more hierarchical interesting concept"
     "for claude setup animation that needs to be more interesting its just a
      bunch of small squares"
     "a lot of these animations dont meet the animation quality bar here and the
      concepts arent interesting enough either"

   MEASURED on v8 before touching anything: **33 <span> text elements** in the
   animation layer, and the recurring props were **46-96px**. Those are two
   named defects, not five notes — ANIMATION-QUALITY §4 (information delivered
   as type) and §1 (LARGE x BRIGHT x FAST is the only combination that
   registers; small props never add up however many you add).

   ⭐ THE FIX IS THE ONE REEL 107 ALREADY PROVED: *"the VO says over 100 Claude
   Code HELPERS — a helper is not a tile, it is a Claude."* A plugin, a skill, a
   subagent and an MCP server are all HELPERS. So they are drawn as CLAUDES, at
   scale, and the words move to the chrome that already carries them: the header
   band (on all 950 frames, restating the claim) and the karaoke captions.

   ⛔ WHAT STAYS IN THE PICTURE: real LOGO MARKS and real NUMERALS. A mark is not
   text and a number is already a number — that is exactly what reel 99 v3
   shipped on (*"an ODOMETER rolling to 800,000,000, a MOUND of tokens with
   provider logos struck into them"*). The receipts survive; the prose does not.
   ========================================================================= */

/** ⭐ A TITAN — a colossal Claude carrying its plugin's real mark on a banner
    ABOVE its head. ⛔ The Mascot's body rect IS its face, so a mark can never sit
    on its chest; a name board above the head is the documented place, and at
    this scale it clears 150px without any of the usual compromises.
    Hierarchy comes from SCALE and from VALUE: a titan arrives as a near-black
    silhouette and only lights into full clay when it lands. */
export const Titan: React.FC<{ f: number; x: number; y: number; at: number; s?: number;
  z?: number; logo?: string; c?: string; costume?: Record<string, any>; seed?: number;
  /** ⭐ STANDING: the titan is ALREADY in frame at f0 as a near-black silhouette
      and the event is it IGNITING, not arriving. This is what lets frame 0 be
      "the whole claim, settled" while the f6 event pushes PAST it — and it is
      also how the hook gets its hierarchy: three colossal DARK masses against a
      bright hall is an extreme value gap at a high mean luma, so THE-OPEN's
      >=140 law and "hierarchy needs DARKNESS" stop fighting each other. */
  standing?: boolean;
  /** ⛔ push the banner sideways when titans are STACKED. Above-the-head is the
      right place for a lone giant, and exactly the wrong place in a tower: each
      banner lands on the body of the level below it. */
  bannerDX?: number; bannerDY?: number }> =
  ({ f, x, y, at, s = 420, z = 60, logo, c = CLAY, costume = {}, seed = 0, standing = false,
     bannerDX = 0, bannerDY = 0 }) => {
  const drop = standing ? 1 : E(f, at, at + 8, 0, 1, IN_Q);   /* ⛔ 8 frames. A gentle arrival is not an event. */
  if (drop <= 0) return null;
  const land = f >= at + 8;
  /* dark on the way down, full clay on impact — the value gap IS the hierarchy */
  const lit = E(f, at + 7, at + 13, 0, 1, OUT);
  const sq = squash(f, at + 8, 0.26, 3, 14);
  const settle = rock(f, at + 8, 4.2, 30);
  const t = f - at;
  return (<>
    <Contact x={x - s * 0.34} y={y + s * 0.36} w={s * 0.96} z={z - 1} o={0.30 + lit * 0.28} />
    <div style={{ position: "absolute", left: x - s / 2,
      top: y - s * 0.62 - (1 - drop) * 760 + (standing ? Math.sin((f + seed * 17) / 26) * 4.6 : 0),
      zIndex: z, transform: `rotate(${settle + (1 - drop) * (seed % 2 ? 5 : -5)}deg) scaleY(${sq})`,
      transformOrigin: "50% 96%",
      /* ⛔⛔ 0.19 WAS TOO DARK TO SHIP. Three colossal masses at that value cover
         ~33% of the panel and took HOOK_LUMA to 130.0, under THE-OPEN's bar. At
         0.36 the clay still reads as a silhouette — a ~55 luma figure against a
         ~200 luma lit board is a 145-point value gap, which is a bigger spread
         than anything else in the reel — and the mean clears 140. **Brightness is
         the mean; hierarchy is the spread**, and they only fight when you reach
         for the palette's dark stop instead of the subject's own value. */
      filter: land ? undefined : `brightness(${standing ? 0.36 : 0.30 + drop * 0.24})` }}>
      <Mascot lf={f + seed * 11} size={s}
        nodAmp={land ? 4.6 : 0} nodSpeed={9}
        {...costume} />
    </div>
    {/* the banner over its head — the mark, big, and never on the face */}
    {logo && land && (
      <div style={{ position: "absolute", left: x - 92 + bannerDX, top: y - s * 0.62 - 118 + bannerDY + settle * 1.4,
        zIndex: z + 4, opacity: lit,
        transform: `scale(${0.7 + lit * 0.3}) rotate(${settle * 0.5}deg)`, transformOrigin: "50% 100%" }}>
        <div style={{ width: 184, height: 152, borderRadius: 20, background: PAPER,
          border: `6px solid ${dkh(c, 0.14)}`, boxShadow: SH_D,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/" + logo)}
            style={{ width: 118, height: 118, objectFit: "contain" }} />
        </div>
        {/* the pole it hangs from, so it is an object in the room */}
        <div style={{ position: "absolute", left: 86, top: 148, width: 12, height: 54,
          background: dkh(c, 0.30) }} />
      </div>
    )}
    {/* what a titan landing COSTS */}
    <Ring x={x} y={y + s * 0.34} f={f} at={at + 8} c={GOLD} z={z - 2} max={s * 1.1} dur={20} />
    <Puff x={x} y={y + s * 0.34} f={f} at={at + 8} c="#C8C2B0" z={z - 2} n={12} s={s / 200} />
  </>);
};

/** ⭐ THE CODE MONOLITH — ONE giant mass, not thirty-six small crates.
    v8 drew the codebase as a 9x4 wall of 96x72 boxes and got *"its just a bunch
    of small squares"*. §1 of the craft doc says so in advance: small props never
    add up. This is a single object over 600px tall with real drawn strata,
    seams, and a lit face that the scan eats into. `read` is 0..1. */
export const Monolith: React.FC<{ f: number; x: number; y: number; w?: number; h?: number;
  read?: number; z?: number; c?: string }> =
  ({ f, x, y, w = 520, h = 470, read = 0, z = 24, c = "#2C5C68" }) => (<>
    {/* the mass */}
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 14, background: `linear-gradient(168deg,${mxh(c, 0.14)} 0%,${dkh(c, 0.42)} 100%)`,
      border: `6px solid ${mxh(c, 0.26)}`, boxShadow: SH_D }} />
    {/* ⛔ v9's strata were `dkh(c,0.20)` on a `dkh(c,0.42)` body — a 22% value
        step, which is nothing, so the monolith rendered as ONE EMPTY TEAL BOX.
        ⭐ It is a CODEBASE, so it is drawn as code: eighteen rows of INDENTED
        LINES of varying length, at a real value gap from the slab behind them,
        and each row lights hard when the read line passes it. Detail-per-object
        and object-COUNT are different dials; this is the first one. */}
    {Array.from({ length: 18 }, (_, i) => {
      const done = read > (i + 0.4) / 18;
      const rowY = y + 18 + i * (h - 36) / 18;
      const indent = [0, 1, 2, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 2, 1, 0, 1][i] * 26;
      const wide = [0.72, 0.58, 0.44, 0.66, 0.50, 0.80, 0.62, 0.40, 0.34, 0.56,
                    0.70, 0.86, 0.48, 0.38, 0.60, 0.52, 0.76, 0.44][i];
      return (<React.Fragment key={"st" + i}>
        {/* the row bed */}
        <div style={{ position: "absolute", left: x + 16, top: rowY,
          width: w - 32, height: (h - 36) / 18 - 4, zIndex: z + 1, borderRadius: 3,
          background: done ? hexa("#BFEAF2", 0.20) : hexa("#06171D", 0.46) }} />
        {/* the line of code on it */}
        <div style={{ position: "absolute", left: x + 26 + indent, top: rowY + 3,
          width: (w - 60 - indent) * wide, height: (h - 36) / 18 - 10, zIndex: z + 2,
          borderRadius: 3,
          background: done ? hexa("#EAFBFF", 0.92) : hexa("#5E97A6", 0.52) }} />
        {/* the gutter marker, so it reads as a file and not a chart */}
        <div style={{ position: "absolute", left: x + 16, top: rowY + 3,
          width: 6, height: (h - 36) / 18 - 10, zIndex: z + 3,
          background: done ? hexa("#EAFBFF", 0.9) : hexa("#2C5C68", 0.8) }} />
      </React.Fragment>);
    })}
    {/* ⭐ THE READ LINE IS RED AND IT BURNS. *"make the scanner line like red or
        something there"* — and it is the right call for more than colour: a
        white line reads as a progress bar, a hot red one reads as something
        being INSPECTED. Three parts: a hard core, a hot bleed above it, and a
        dark shadow band under it, so the edge is light-against-shadow both ways
        and the black point never lifts. */}
    {read > 0 && read < 1 && (<>
      <div style={{ position: "absolute", left: x - 26, top: y - 34 + read * (h - 20), width: w + 52,
        height: 44, zIndex: z + 4,
        background: `linear-gradient(180deg, ${hexa("#E4574A", 0)} 0%, ${hexa("#FF8A6E", 0.42)} 100%)` }} />
      <div style={{ position: "absolute", left: x - 30, top: y + 7 + read * (h - 20), width: w + 60,
        height: 19, zIndex: z + 5, background: "rgba(255,180,160,0.40)", borderRadius: 10 }} />
      <div style={{ position: "absolute", left: x - 26, top: y + 10 + read * (h - 20), width: w + 52,
        height: 13, zIndex: z + 6, background: "#FF6E52", borderRadius: 7 }} />
      <div style={{ position: "absolute", left: x - 26, top: y + 23 + read * (h - 20), width: w + 52,
        height: 30, zIndex: z + 5, background: "rgba(4,10,14,0.52)" }} />
      {/* the sparks it throws as it cuts across the rows */}
      {Array.from({ length: 5 }, (_, i) => {
        const ph = ((f * 7 + i * 23) % 40) / 40;
        return (
          <div key={"sp" + i} style={{ position: "absolute",
            left: x + 24 + ((i * 137) % (w - 60)) + ph * 26,
            top: y + 12 + read * (h - 20) - ph * 34,
            width: 7, height: 7, borderRadius: 4, zIndex: z + 7,
            background: hexa("#FFD3B4", 0.9 * (1 - ph)) }} />
        );
      })}
    </>)}
  </>);

/** ⭐ A CLAUDE POPPING OUT OF THE MONOLITH — the recommendation, as the thing it
    actually is. It bursts out sideways, arcs, and lands running. A category is
    carried by a coloured GLYPH cap, never by a word. */
export const Popper: React.FC<{ f: number; at: number; x0: number; y0: number; x1: number;
  y1: number; i: number; s?: number; z?: number; cat?: number; costume?: Record<string, any> }> =
  ({ f, at, x0, y0, x1, y1, i, s = 150, z = 62, cat = 0, costume = {} }) => {
  const k = E(f, at, at + 11, 0, 1, OUT);
  if (k <= 0) return null;
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 150;
  const land = k >= 1;
  const after = Math.max(0, f - (at + 11));
  /* it lands RUNNING — an action loop, never an idle */
  const act = i % 3;
  const bob = land ? (act === 0 ? Math.abs(Math.sin(after / 7)) * 9
    : act === 1 ? Math.sin(after / 9) * 6 : -Math.max(0, Math.sin((after % 40) / 40 * Math.PI * 2)) * 18) : 0;
  return (<>
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62 - bob, zIndex: z,
      transform: `rotate(${(1 - k) * 46 + (land ? Math.sin(after / 11) * 4 : 0)}deg) scaleY(${squash(f, at + 10, 0.22)})`,
      transformOrigin: "50% 92%" }}>
      <Mascot lf={f + i * 9} size={s} nodAmp={5} nodSpeed={8} {...costume} />
    </div>
    {/* the category cap — a GLYPH, never a word */}
    {land && (
      <div style={{ position: "absolute", left: x - 26, top: y - s * 0.62 - bob - 46, zIndex: z + 3,
        width: 52, height: 52, borderRadius: 14, background: CAT_C[cat],
        border: "3px solid rgba(250,246,236,0.86)", display: "flex",
        alignItems: "center", justifyContent: "center", boxShadow: SH }}>
        <CatGlyph cat={cat} s={30} />
      </div>
    )}
    <Ring x={x} y={y + s * 0.3} f={f} at={at + 10} c={CAT_C[cat]} z={z - 1} max={130} dur={14} />
  </>);
};

/** the five categories, as COLOUR + GLYPH. ⛔ No words: `MCP` / `SKILLS` /
    `HOOKS` / `SUBAGENTS` / `COMMANDS` were five text plates in v8. */
export const CAT_C = ["#5AA0DE", "#E7B24C", "#3F9E74", "#D97757", "#8E75B2"];

export const CatGlyph: React.FC<{ cat: number; s?: number; c?: string }> =
  ({ cat, s = 30, c = "#FFFFFF" }) => {
  const st = { position: "absolute" as const, background: c };
  return (
    <div style={{ position: "relative", width: s, height: s }}>
      {cat === 0 && (<>{/* MCP — a plug */}
        <div style={{ ...st, left: s * 0.30, top: 0, width: s * 0.12, height: s * 0.30, borderRadius: 2 }} />
        <div style={{ ...st, left: s * 0.58, top: 0, width: s * 0.12, height: s * 0.30, borderRadius: 2 }} />
        <div style={{ ...st, left: s * 0.18, top: s * 0.30, width: s * 0.64, height: s * 0.34, borderRadius: 4 }} />
        <div style={{ ...st, left: s * 0.42, top: s * 0.64, width: s * 0.16, height: s * 0.36, borderRadius: 2 }} />
      </>)}
      {cat === 1 && (<>{/* SKILLS — a star */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ ...st, left: s * 0.44, top: 0, width: s * 0.12, height: s * 0.50,
            borderRadius: 2, transformOrigin: "50% 100%", transform: `rotate(${i * 72}deg)` }} />
        ))}
      </>)}
      {cat === 2 && (<>{/* HOOKS — a hook */}
        <div style={{ ...st, left: s * 0.44, top: 0, width: s * 0.12, height: s * 0.52, borderRadius: 2 }} />
        <div style={{ ...st, left: s * 0.20, top: s * 0.46, width: s * 0.60, height: s * 0.12,
          borderRadius: 6 }} />
        <div style={{ ...st, left: s * 0.20, top: s * 0.46, width: s * 0.12, height: s * 0.40,
          borderRadius: 6 }} />
        <div style={{ ...st, left: s * 0.20, top: s * 0.74, width: s * 0.34, height: s * 0.12,
          borderRadius: 6 }} />
      </>)}
      {cat === 3 && (<>{/* SUBAGENTS — a small Claude head silhouette */}
        <div style={{ ...st, left: s * 0.14, top: s * 0.22, width: s * 0.72, height: s * 0.56, borderRadius: 6 }} />
        <div style={{ ...st, left: s * 0.26, top: s * 0.06, width: s * 0.10, height: s * 0.20, borderRadius: 3 }} />
        <div style={{ ...st, left: s * 0.64, top: s * 0.06, width: s * 0.10, height: s * 0.20, borderRadius: 3 }} />
      </>)}
      {cat === 4 && (<>{/* COMMANDS — a prompt chevron */}
        <div style={{ ...st, left: s * 0.14, top: s * 0.24, width: s * 0.34, height: s * 0.12,
          borderRadius: 3, transform: "rotate(40deg)", transformOrigin: "0% 50%" }} />
        <div style={{ ...st, left: s * 0.14, top: s * 0.62, width: s * 0.34, height: s * 0.12,
          borderRadius: 3, transform: "rotate(-40deg)", transformOrigin: "0% 50%" }} />
        <div style={{ ...st, left: s * 0.54, top: s * 0.74, width: s * 0.34, height: s * 0.12, borderRadius: 3 }} />
      </>)}
    </div>
  );
};

/** ⭐ THE RANK PODIUM — five columns, each capped with its category GLYPH, the
    found Claudes climbing them. Replaces v8's twelve named cards in five
    labelled chutes: same information, no words, and the sprites are the
    subject rather than a container for it. */
export const Podium: React.FC<{ f: number; x: number; y: number; pitch?: number; z?: number;
  heights?: number[] }> = ({ f, x, y, pitch = 186, z = 26, heights = [1, 1, 1, 1, 1] }) => (<>
    {heights.map((hk, i) => {
      const h = 60 + hk * 190;
      return (
        <div key={"pd" + i}>
          {/* the column */}
          <div style={{ position: "absolute", left: x + i * pitch, top: y - h, width: 150, height: h,
            zIndex: z, borderRadius: `10px 10px 0 0`,
            background: `linear-gradient(180deg,${mxh(CAT_C[i], 0.10)} 0%,${dkh(CAT_C[i], 0.46)} 100%)`,
            border: `4px solid ${mxh(CAT_C[i], 0.30)}`, borderBottom: "none", boxShadow: SH }} />
          {/* the lit cap it ranks on */}
          <div style={{ position: "absolute", left: x + i * pitch - 8, top: y - h - 16, width: 166,
            height: 20, zIndex: z + 2, borderRadius: 6, background: mxh(CAT_C[i], 0.40) }} />
          {/* the category glyph, cast into the column face */}
          <div style={{ position: "absolute", left: x + i * pitch + 45, top: y - h + 26, zIndex: z + 3,
            opacity: 0.9 }}>
            <CatGlyph cat={i} s={60} c={hexa("#FFFFFF", 0.86)} />
          </div>
        </div>
      );
    })}
    {/* the floor line they all stand on */}
    <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 12, zIndex: z + 1,
      background: "rgba(20,12,4,0.60)" }} />
  </>);

/** ⭐ THE SESSION WIPE — the CREW gets pulled out of the room, not a set of
    coloured slabs. v8's 23-second beat was sixteen rectangles tumbling off frame
    and came back as *"just a bunch of squares and rectangles"*. What the reel has
    actually built by that point is a CAST, so the cast is what the session takes. */
export const SpriteSuck: React.FC<{ f: number; at: number; n?: number; every?: number;
  z?: number; toX?: number; toY?: number }> =
  ({ f, at, n = 9, every = 4, z = 62, toX = 1420, toY = -220 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const a = at + i * every;
      const k = E(f, a, a + 22, 0, 1, IN_Q);
      if (k >= 1) return null;
      const x0 = 92 + (i % 5) * 196, y0 = 300 + Math.floor(i / 5) * 210;
      const s = 138 + (i % 3) * 26;
      /* they are dragged toward one vanishing point, spinning, shrinking */
      const x = x0 + (toX - x0) * k, y = y0 + (toY - y0) * k;
      return (
        <div key={"sk" + i} style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62,
          zIndex: z + (i % 4), opacity: 1 - k * 0.55,
          transform: `rotate(${k * (i % 2 ? 320 : -320)}deg) scale(${1 - k * 0.62})`,
          transformOrigin: "50% 50%" }}>
          <Mascot lf={f + i * 13} size={s} shock={Math.min(1, k * 3)} nodAmp={0}
            {...costumeFor(i + 4)} />
        </div>
      );
    })}
  </>);

/** ⭐ A TIER GATE — the cascade as four physical gates instead of four text
    plates. Three slam shut with a cross, the fourth swings open green. */
export const TierGate: React.FC<{ f: number; at: number; x: number; y: number; w?: number;
  h?: number; ok?: boolean; z?: number }> =
  ({ f, at, x, y, w = 178, h = 118, ok = false, z = 78 }) => {
  const k = E(f, at, at + 5, 0, 1, ok ? OUT : IN_Q);
  if (k <= 0) return null;
  const jolt = rock(f, at + 5, ok ? 2 : 7, 16);
  return (<>
    <div style={{ position: "absolute", left: x, top: y + jolt, width: w, height: h, zIndex: z,
      borderRadius: 12, boxShadow: SH_D,
      background: ok
        ? `linear-gradient(168deg,${mxh(GREEN, 0.24)} 0%,${dkh(GREEN, 0.26)} 100%)`
        : `linear-gradient(168deg,#7A2019 0%,#3A0C0C 100%)`,
      border: `5px solid ${ok ? mxh(GREEN, 0.46) : "#B4453A"}`,
      transform: `scaleY(${ok ? 1 : k}) scaleX(${0.86 + k * 0.14})`,
      transformOrigin: "50% 0%" }}>
      {/* the bars, so a gate looks like a gate */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"bg" + i} style={{ position: "absolute", left: 12 + i * (w - 34) / 4, top: 10,
          width: 14, height: h - 30, borderRadius: 6,
          background: ok ? hexa("#DFF6EA", 0.34) : "rgba(240,190,180,0.20)" }} />
      ))}
    </div>
    {/* the verdict — a GLYPH struck across it, not a word */}
    {k >= 1 && (
      <div style={{ position: "absolute", left: x + w / 2 - 34, top: y + h / 2 - 34 + jolt,
        width: 68, height: 68, zIndex: z + 3 }}>
        {ok ? (<>
          <div style={{ position: "absolute", left: 6, top: 34, width: 30, height: 12,
            borderRadius: 6, background: "#EAFBF1", transform: "rotate(45deg)", transformOrigin: "0% 50%" }} />
          <div style={{ position: "absolute", left: 26, top: 46, width: 50, height: 12,
            borderRadius: 6, background: "#EAFBF1", transform: "rotate(-52deg)", transformOrigin: "0% 50%" }} />
        </>) : (<>
          <div style={{ position: "absolute", left: 4, top: 28, width: 62, height: 12,
            borderRadius: 6, background: "#FFD9D2", transform: "rotate(45deg)" }} />
          <div style={{ position: "absolute", left: 4, top: 28, width: 62, height: 12,
            borderRadius: 6, background: "#FFD9D2", transform: "rotate(-45deg)" }} />
        </>)}
      </div>
    )}
  </>);
};

/** a NUMERAL plate — the only kind of "text" the animation layer keeps, because
    ⭐ a number is already a number and a mark is not prose. Logo + figure, no
    sentence anywhere. */
export const MarkNum: React.FC<{ f: number; x: number; y: number; at: number; logo: string;
  v: string; c?: string; s?: number; z?: number }> =
  ({ f, x, y, at, logo, v, c = CLAY, s = 1, z = 84 }) => {
  const k = E(f, at, at + 8, 0, 1, BACK);
  if (k <= 0) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: Math.min(1, k * 1.7),
      transform: `translateY(${(1 - k) * -60}px) scaleY(${squash(f, at + 7, 0.18)})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 * s,
        padding: `${10 * s}px ${18 * s}px`, borderRadius: 16 * s, background: PAPER,
        border: `${5 * s}px solid ${dkh(c, 0.12)}`, boxShadow: SH_D }}>
        <div style={{ width: 60 * s, height: 60 * s, borderRadius: 12 * s, background: "#FFFFFF",
          border: `${2 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile("logos/" + logo)}
            style={{ width: 46 * s, height: 46 * s, objectFit: "contain" }} />
        </div>
        <span style={{ fontSize: 34 * s, lineHeight: 1, color: "#B98A18" }}>★</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42 * s,
          color: INK, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{v}</span>
      </div>
    </div>
  );
};

/* ===========================================================================
   ⭐⭐ S4's DEPICTION — added after: *"at 12 seconds, the animation still needs
   to be more interesting and representative of whats going on in the spoken
   part here"*.

   The §3 test, run properly this time. At 12.0-12.5s the VO says **"gives
   Claude Code"** and at 12.49-13.23 **"unlimited usage"**. What was on screen
   was a rig driving past with three boxes on its deck. Write the line beside the
   shot and ask what the picture ADDS: it does not depict GIVING, it does not
   depict CLAUDE CODE, and it does not depict USAGE. It is a container that says
   "something is moving" — which is exactly the defect the craft doc describes,
   caught here on the one scene where the verb is the whole sentence.

   ⭐ THE VERB IS `GIVES` AND THE OBJECT IS `USAGE`, so the picture is a
   HAND-OFF OF CAPACITY: Claude Code hauls a tank that is nearly empty, the
   OmniRoute rig runs up behind it, a COUPLER locks the two together, and supply
   visibly pumps down the line until the tank's gauge is climbing. Before,
   trigger, travel, arrival — and every element maps to a word actually spoken.

   ⛔ HONESTY HOLDS: the gauge CLIMBS and keeps climbing across more segments
   than it started with. It never pegs, never shows an infinity mark and never
   labels itself unlimited, because the README does not.
   ========================================================================= */

/** the capacity Claude Code is running on — a real drawn tank: shell, three
    ribs, a filler neck, a segmented gauge face, a drawbar and two wheels. */
export const CapacityTank: React.FC<{ f: number; x: number; y: number; fill: number;
  s?: number; z?: number; segs?: number }> =
  ({ f, x, y, fill, s = 1, z = 52, segs = 12 }) => {
  const bounce = Math.sin(f / 5.5) * 2.4;
  const lit = Math.round(fill * segs);
  /* ⭐ EVERY SEGMENT LANDS. A bar that fills smoothly repaints only its leading
     edge (+0.11 on the measured table); a segment that ARRIVES flashes the whole
     250x128 tank face for two frames, which is a real fraction of the panel. */
  const step = fill * segs;
  const flash = Math.max(0, 1 - (step - Math.floor(step)) * 5);
  return (
    <div style={{ position: "absolute", left: x, top: y + bounce, zIndex: z }}>
      {/* the shell */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 250 * s, height: 128 * s,
        borderRadius: 22 * s, background: "linear-gradient(172deg,#46536B 0%,#1C2430 100%)",
        border: `${5 * s}px solid #62718C`, boxShadow: SH_D }} />
      {lit > 0 && (
        <div style={{ position: "absolute", left: 0, top: 0, width: 250 * s, height: 128 * s,
          borderRadius: 22 * s, background: hexa("#DDF0FF", 0.42 * flash) }} />
      )}
      {/* three ribs, so it is a vessel and not a rectangle */}
      {[0, 1, 2].map((i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: (44 + i * 60) * s, top: 4 * s,
          width: 9 * s, height: 120 * s, background: hexa("#8C9AB4", 0.30) }} />
      ))}
      {/* the filler neck the supply arrives through */}
      <div style={{ position: "absolute", left: 24 * s, top: -22 * s, width: 46 * s,
        height: 26 * s, borderRadius: 6 * s, background: "#62718C", border: `${3 * s}px solid #8CA0BE` }} />
      {/* ⭐ THE GAUGE — a value DRAWN, never typeset. Twelve segments, lighting
          bottom-up as capacity arrives; the number moves to its value. */}
      <div style={{ position: "absolute", left: 150 * s, top: 18 * s, width: 84 * s,
        height: 92 * s, borderRadius: 10 * s, background: "#0C1119",
        border: `${3 * s}px solid #62718C`, display: "flex", flexDirection: "column-reverse",
        gap: 3 * s, padding: 6 * s }}>
        {Array.from({ length: segs }, (_, i) => (
          <div key={"sg" + i} style={{ height: 5 * s, borderRadius: 3 * s,
            background: i < lit
              ? (i > segs * 0.72 ? GREEN : i > segs * 0.4 ? GOLD : "#C9773E")
              : "rgba(120,140,170,0.16)" }} />
        ))}
      </div>
      {/* the drawbar to whoever is hauling it */}
      <div style={{ position: "absolute", left: 244 * s, top: 74 * s, width: 96 * s,
        height: 13 * s, borderRadius: 7 * s, background: "#4E5A70" }} />
      {/* two wheels with real spokes */}
      {[36, 168].map((wx, i) => (
        <div key={"wl" + i} style={{ position: "absolute", left: wx * s, top: 108 * s,
          width: 58 * s, height: 58 * s, borderRadius: "50%",
          background: "radial-gradient(circle,#39414F 0%,#39414F 26%,#191E27 28%,#0E1218 100%)",
          border: `${4 * s}px solid #4A5566`, transform: `rotate(${(f * 9 + i * 30) % 360}deg)` }}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ position: "absolute", left: 25 * s, top: 3 * s, width: 4 * s,
              height: 23 * s, background: "#5C6A80", transformOrigin: "50% 100%",
              transform: `rotate(${k * 120}deg)` }} />
          ))}
        </div>
      ))}
    </div>
  );
};

/** ⭐ THE COUPLER — the moment the hand-off actually happens. An arm extends
    across the gap, a claw closes on the tank, and supply pulses run down it.
    ⛔ It LOCKS with a squash and a ring: nothing in a reel lands and stops. */
export const Coupler: React.FC<{ f: number; at: number; x0: number; x1: number; y: number;
  z?: number; c?: string }> =
  ({ f, at, x0, x1, y, z = 58, c = SKY }) => {
  const k = E(f, at, at + 14, 0, 1, OUT);
  if (k <= 0) return null;
  const len = (x1 - x0) * k;
  const locked = k >= 1;
  const jolt = locked ? rock(f, at + 14, 3.4, 20) : 0;
  return (<>
    {/* the arm */}
    <div style={{ position: "absolute", left: x0, top: y + jolt, width: len, height: 20,
      borderRadius: 10, zIndex: z,
      background: "linear-gradient(180deg,#7A8AA6 0%,#3A4557 100%)",
      border: "3px solid #97A8C4" }} />
    {/* its segments, so an arm reads as an arm */}
    {Array.from({ length: Math.max(1, Math.floor(len / 42)) }, (_, i) => (
      <div key={"cs" + i} style={{ position: "absolute", left: x0 + 12 + i * 42, top: y - 3 + jolt,
        width: 8, height: 26, borderRadius: 4, background: "#2A3140", zIndex: z + 1 }} />
    ))}
    {/* the claw at the head */}
    <div style={{ position: "absolute", left: x0 + len - 16, top: y - 15 + jolt, width: 34,
      height: 50, borderRadius: 8, zIndex: z + 2,
      background: locked ? mxh(c, 0.10) : "#5E6E88", border: "3px solid #A9BAD6",
      transform: `scaleY(${locked ? squash(f, at + 14, 0.24, 3, 12) : 1})` }} />
    {/* ⭐ SUPPLY PUMPING DOWN THE LINE — the "gives" made continuous, so the
        second half of the scene is a transfer and not a held pose.
        ⛔ v11 ran five 34x14 pulses and the scene measured 10.17 with **75%
        HOLD** — the highest in the reel. 34x14 is under the 40px short-side
        floor twice over, so most of it vanished in the audit's 1012->240
        downsample and read as nothing to a human either. These are CANISTERS:
        66x46 objects, bright, travelling the whole span, arriving one after
        another. Many large bright objects travelling is the top of the measured
        table; thin pulses are near the bottom of it. */}
    {locked && Array.from({ length: 4 }, (_, i) => {
      const span = Math.max(x1 - x0, 1);
      const ph = ((f - at - 14) * 11 + i * (span / 4)) % span;
      const arriving = ph > span * 0.86;
      return (
        <div key={"pl" + i} style={{ position: "absolute", left: x0 + ph - 33, top: y - 34 + jolt,
          zIndex: z + 3, transform: `rotate(${Math.sin((f + i * 9) / 6) * 5}deg) scale(${arriving ? 1.14 : 1})` }}>
          <div style={{ width: 66, height: 46, borderRadius: 10,
            background: "linear-gradient(168deg,#EAF6FF 0%,#9FC4E4 100%)",
            border: "3px solid #6E9CC4", boxShadow: SH }} />
          {/* a fill window, so a canister reads as carrying something */}
          <div style={{ position: "absolute", left: 10, top: 12, width: 30, height: 22,
            borderRadius: 4, background: hexa("#3F9E74", 0.86) }} />
          <div style={{ position: "absolute", left: 46, top: 14, width: 12, height: 18,
            borderRadius: 3, background: hexa("#2A3A4E", 0.60) }} />
        </div>
      );
    })}
    <Ring x={x1} y={y + 10} f={f} at={at + 13} c={c} z={z - 1} max={190} dur={18} />
    <Puff x={x1} y={y + 26} f={f} at={at + 13} c="#9FB0C8" z={z - 1} n={8} s={1.1} />
  </>);
};

/* ===========================================================================
   ⭐ WHAT A SCAN ACTUALLY PRODUCES — added after: *"the animation at 2 seconds
   isnt good enough like its just too plain with the scanning aspect and too
   boring like the scanning part itself, like need to surface bugs that pop out
   interesting flags etc here and make the scanner line like red or something"*.

   The note is a better read of the mechanism than the build was. A scan that
   sweeps a wall and changes its colour is a PROGRESS BAR. A scan that SURFACES
   THINGS is an event with a result — and it is also what `claude-code-setup`
   actually does: it reads the repo and comes back with findings, which is why
   it can then recommend anything. So the beam now stabs FLAGS into the code as
   it passes, and the helpers that follow are the ANSWERS to them.
   ⛔ The flags carry GLYPHS, never words: a bug, a bang, a lock, a clock.
   ========================================================================= */

/** a finding stabbed into the code — a pin, a flag, a glyph, and a wobble that
    never quite settles. ⛔ Nothing lands and simply stops. */
export const Finding: React.FC<{ f: number; at: number; x: number; y: number; kind?: number;
  s?: number; z?: number }> = ({ f, at, x, y, kind = 0, s = 1, z = 40 }) => {
  const k = E(f, at, at + 6, 0, 1, BACK);
  if (k <= 0) return null;
  const C = ["#E4574A", "#E7B24C", "#E4574A", "#8E75B2"][kind];
  /* it is driven in hard, then rings like a struck pin */
  const wob = rock(f, at + 6, 7.5, 26);
  return (<>
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${wob + (1 - k) * -34}deg) scale(${0.5 + k * 0.5})`,
      transformOrigin: "0% 100%" }}>
      {/* the pin */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 5 * s, height: 46 * s,
        borderRadius: 3 * s, background: "#F4EEDC" }} />
      {/* the flag */}
      <div style={{ position: "absolute", left: 4 * s, top: -2 * s, width: 52 * s, height: 34 * s,
        borderRadius: `${4 * s}px ${4 * s}px ${4 * s}px 0`, background: C,
        border: `${2 * s}px solid ${mxh(C, 0.34)}`, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* the glyph — a bug, a bang, a lock, a clock. Never a word. */}
        {kind === 0 && (<div style={{ position: "relative", width: 20 * s, height: 20 * s }}>
          <div style={{ position: "absolute", left: 4 * s, top: 4 * s, width: 12 * s,
            height: 13 * s, borderRadius: `${6 * s}px ${6 * s}px ${5 * s}px ${5 * s}px`,
            background: "#FFF" }} />
          {[0, 1, 2].map((i) => (<React.Fragment key={i}>
            <div style={{ position: "absolute", left: 0, top: (5 + i * 4) * s, width: 5 * s,
              height: 2 * s, background: "#FFF" }} />
            <div style={{ position: "absolute", left: 15 * s, top: (5 + i * 4) * s, width: 5 * s,
              height: 2 * s, background: "#FFF" }} />
          </React.Fragment>))}
        </div>)}
        {kind === 1 && (<div style={{ position: "relative", width: 8 * s, height: 20 * s }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 8 * s, height: 13 * s,
            borderRadius: 3 * s, background: "#FFF" }} />
          <div style={{ position: "absolute", left: 0, top: 16 * s, width: 8 * s, height: 5 * s,
            borderRadius: 2 * s, background: "#FFF" }} />
        </div>)}
        {kind === 2 && (<div style={{ position: "relative", width: 18 * s, height: 20 * s }}>
          <div style={{ position: "absolute", left: 0, top: 8 * s, width: 18 * s, height: 12 * s,
            borderRadius: 3 * s, background: "#FFF" }} />
          <div style={{ position: "absolute", left: 4 * s, top: 0, width: 10 * s, height: 12 * s,
            borderRadius: `${5 * s}px ${5 * s}px 0 0`, border: `${3 * s}px solid #FFF`,
            borderBottom: "none" }} />
        </div>)}
        {kind === 3 && (<div style={{ position: "relative", width: 20 * s, height: 20 * s }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
            border: `${3 * s}px solid #FFF` }} />
          <div style={{ position: "absolute", left: 9 * s, top: 4 * s, width: 2.5 * s,
            height: 7 * s, background: "#FFF" }} />
          <div style={{ position: "absolute", left: 9 * s, top: 9 * s, width: 6 * s,
            height: 2.5 * s, background: "#FFF" }} />
        </div>)}
      </div>
    </div>
    <Ring x={x} y={y + 44 * s} f={f} at={at + 5} c={C} z={z - 1} max={92} dur={12} />
  </>);
};

/* ===========================================================================
   ⭐ THE OVERHEAD SUPPLY LINE — added after: *"there needs to be something above
   the train at 12 seconds that animation"*.

   The top half of the road was empty night sky, and it was also the one
   unanswered question in the beat: the rig GIVES capacity, but where is the
   capacity coming from? A catenary answers both — it fills the dead half of the
   frame with structure, and it makes the supply arrive from somewhere off-frame
   rather than materialising on the deck. It also sets up S5, which is where that
   somewhere turns out to be 290 providers.
   ========================================================================= */
export const Catenary: React.FC<{ f: number; y?: number; z?: number; c?: string;
  speed?: number; drops?: number[] }> =
  ({ f, y = 168, z = 36, c = "#8FB6D8", speed = 8, drops = [] }) => (<>
    {/* the masts, cropped by the frame at both ends */}
    {[-30, 250, 530, 810, 1050].map((x, i) => (
      <div key={"ms" + i}>
        <div style={{ position: "absolute", left: x, top: y - 66, width: 22, height: 300,
          zIndex: z, background: "linear-gradient(90deg,#3A4C64 0%,#1C2634 100%)",
          border: "2px solid #4E6480" }} />
        {/* the cross-arm */}
        <div style={{ position: "absolute", left: x - 44, top: y - 66, width: 110, height: 15,
          zIndex: z + 1, background: "#4E6480" }} />
        {/* the insulator it hangs from */}
        <div style={{ position: "absolute", left: x + 2, top: y - 50, width: 14, height: 26,
          zIndex: z + 2, borderRadius: 4, background: "#93A8C4" }} />
      </div>
    ))}
    {/* the two conductors */}
    <div style={{ position: "absolute", left: -40, right: -40, top: y - 26, height: 7,
      zIndex: z + 3, background: hexa(c, 0.66) }} />
    <div style={{ position: "absolute", left: -40, right: -40, top: y, height: 9,
      zIndex: z + 3, background: hexa(c, 0.86) }} />
    {/* ⭐ THE SUPPLY RUNNING ALONG IT — carriers travelling the full width,
        continuously, so the top of the frame is never a held pose. Large and
        bright: 74x40, well over the 40px short-side floor. */}
    {Array.from({ length: 6 }, (_, i) => {
      const x = ((i * 190 - f * speed) % 1240) - 120;
      return (
        <div key={"cr" + i} style={{ position: "absolute", left: x, top: y - 34, zIndex: z + 5 }}>
          {/* the pantograph shoe riding the wire */}
          <div style={{ position: "absolute", left: 28, top: -8, width: 20, height: 12,
            borderRadius: 3, background: "#CFE2F6" }} />
          <div style={{ position: "absolute", left: 36, top: 2, width: 5, height: 16,
            background: "#93A8C4" }} />
          {/* the carrier */}
          <div style={{ width: 74, height: 40, borderRadius: 9, marginTop: 16,
            background: "linear-gradient(168deg,#E8F3FF 0%,#9FC4E4 100%)",
            border: "3px solid #6E9CC4", boxShadow: SH }} />
          <div style={{ position: "absolute", left: 10, top: 26, width: 34, height: 20,
            borderRadius: 4, background: hexa(GREEN, 0.86) }} />
        </div>
      );
    })}
    {/* the drop-downs: where a carrier hands off into the rig below */}
    {drops.map((dx, i) => (
      <div key={"dp" + i} style={{ position: "absolute", left: dx, top: y + 9, width: 9,
        height: 210, zIndex: z + 4, background: hexa(c, 0.40) }}>
        <div style={{ position: "absolute", left: -6, top: ((f * 9 + i * 60) % 210), width: 21,
          height: 26, borderRadius: 5, background: hexa("#DDF0FF", 0.92) }} />
      </div>
    ))}
  </>);
