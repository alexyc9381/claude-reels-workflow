import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  GOLD, RED, GREEN, PAPER, INK, BRASS, BRASSD, BRASSL, IRON, IROND, IRONL,
  WATER, WATERD, WATERL, Stream, Splash, Drip, Disc, Stencil, Contact,
} from "./RepWorld";

/* ===========================================================================
   REEL 99 "REPO" · THE PROP LIBRARY — the fittings of a night waterworks.

   ⛔ SOLID PAINTS ONLY. Every "polished" edge here is a lighter SOLID rect, not
      a gradient to transparent and never a `0 0 Npx <colour>` glow. Brass reads
      as brass because it has three values (BRASSD / BRASS / BRASSL) stacked in
      the right order, not because anything emits light.
   ⛔ EVERY TRANSFORMED WRAPPER CARRIES AN EXPLICIT zIndex — a transform opens a
      stacking context and reel 93 lost a whole tower to omitting one.
   ========================================================================= */

/* =========================================================================
   THE HERO ARTIFACT — the graduated gauge glass. Its HEIGHT is the claim, and
   it is the only object that appears in the hook, the scale beat and the
   failover beat.

   ⛔ THE SCALE IS HONEST AND IT COLLIDES (reel 86's rule). 800,000 is 0.1% of
      800,000,000, so its graduation sits ON the bottom seal — which is exactly
      the argument the VO is making. The RUNG stays at its true height; only the
      LABEL is pushed clear.
   ====================================================================== */
export const Gauge: React.FC<{ x: number; y: number; h: number; t: number; w?: number;
  z?: number; f?: number; labels?: boolean; big?: boolean; chop?: number }> =
  ({ x, y, h, t, w: ww = 62, z = 60, f = 0, labels = true, big = false, chop = 1 }) => {
  const fill = Math.max(0, Math.min(1, t));
  const colH = h * fill;
  const surf = y + h - colH;
  /* the graduations, at their TRUE fractional heights */
  const TICKS: { at: number; t: string; hero?: boolean }[] = [
    { at: 0.001, t: "800,000" },
    { at: 0.25, t: "200M" }, { at: 0.50, t: "400M" }, { at: 0.75, t: "600M" },
    { at: 0.94, t: "800 MILLION", hero: true },
  ];
  return (<>
    {/* the glass channel — a dark cavity so water reads as a bright body */}
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: h,
      background: "#2A3138", borderRadius: ww * 0.16, zIndex: z,
      border: `4px solid ${BRASSD}`, boxSizing: "border-box", boxShadow: SH_D }} />
    {/* the water column, solid, with a lighter crest and a bright edge */}
    {fill > 0.002 && (<>
      <div style={{ position: "absolute", left: x - ww / 2 + 6, top: surf, width: ww - 12,
        height: colH - 6, background: WATER, zIndex: z + 1, borderRadius: 3 }} />
      <div style={{ position: "absolute", left: x - ww / 2 + 6, top: surf, width: (ww - 12) * 0.3,
        height: colH - 6, background: WATERL, opacity: 0.55, zIndex: z + 2, borderRadius: 3 }} />
      {/* the meniscus: the moving read-off line */}
      <div style={{ position: "absolute", left: x - ww / 2 + 4, top: surf - 4 + Math.sin(f / 5) * chop,
        width: ww - 8, height: 9, borderRadius: 5, background: WATERL, zIndex: z + 3 }} />
    </>)}
    {/* brass end fittings, top and bottom */}
    {[y - 15, y + h - 9].map((yy, i) => (
      <div key={"gf" + i} style={{ position: "absolute", left: x - ww / 2 - 11, top: yy,
        width: ww + 22, height: 24, borderRadius: 5, background: BRASS, zIndex: z + 6,
        boxShadow: SH }}>
        <div style={{ position: "absolute", inset: 0, height: 7, borderRadius: "5px 5px 0 0",
          background: BRASSL }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6,
          background: BRASSD, borderRadius: "0 0 5px 5px" }} />
      </div>
    ))}
    {/* the graduated scale, on a brass rule beside the glass */}
    {labels && (<>
      <div style={{ position: "absolute", left: x + ww / 2 + 8, top: y, width: 9, height: h,
        background: BRASSD, zIndex: z + 5 }} />
      {TICKS.map((tk, i) => {
        const ty = y + h - h * tk.at;
        /* the LABEL is pushed clear of the bottom seal; the RUNG never moves */
        const ly = Math.min(ty, y + h - 16);
        return (<React.Fragment key={"tk" + i}>
          <div style={{ position: "absolute", left: x + ww / 2 + 8,
            top: ty - (tk.hero ? 3 : 2), width: tk.hero ? 44 : 27,
            height: tk.hero ? 6 : 4, background: tk.hero ? GOLD : BRASSL, zIndex: z + 7 }} />
          <div style={{ position: "absolute", left: x + ww / 2 + (tk.hero ? 58 : 41),
            top: ly - (tk.hero ? (big ? 20 : 14) : (big ? 13 : 9)), zIndex: z + 8,
            fontFamily: tk.hero ? inter.fontFamily : MONO,
            fontWeight: tk.hero ? 900 : 800,
            fontSize: tk.hero ? (big ? 40 : 27) : (big ? 25 : 17),
            letterSpacing: tk.hero ? "-0.01em" : "0.08em",
            color: tk.hero ? "#F7EFDB" : "#CFC4AC", whiteSpace: "nowrap",
            textShadow: "0 3px 8px rgba(0,0,0,0.6)" }}>{tk.t}</div>
        </React.Fragment>);
      })}
    </>)}
  </>);
};

/* =========================================================================
   THE STANDPIPE — the one object the hook is about. Everything else in the
   hook frame is bolted to it.
   ====================================================================== */
export const Standpipe: React.FC<{ x: number; base: number; top?: number; s?: number;
  z?: number; f?: number; fill?: number; wheel?: number; gauge?: boolean }> =
  ({ x, base, top = -40, s = 1, z = 40, f = 0, fill = 0, wheel = 0, gauge = true }) => {
  const cw = 128 * s;
  const h = base - top;
  return (<>
    <Contact x={x - cw * 0.9} y={base - 8} w={cw * 1.8} z={z - 2} o={0.42} />
    {/* the base plinth — cast iron, bolted down */}
    <div style={{ position: "absolute", left: x - cw * 0.86, top: base - 44 * s,
      width: cw * 1.72, height: 46 * s, borderRadius: 5, background: IRON, zIndex: z + 4,
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - cw * 0.86, top: base - 44 * s,
      width: cw * 1.72, height: 9 * s, borderRadius: "5px 5px 0 0", background: IRONL, zIndex: z + 5 }} />
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"bo" + i} style={{ position: "absolute",
        left: x - cw * 0.76 + i * (cw * 1.52 / 5) - 7 * s, top: base - 30 * s,
        width: 14 * s, height: 14 * s, borderRadius: 3, background: BRASSD, zIndex: z + 6 }} />
    ))}
    {/* the column */}
    <div style={{ position: "absolute", left: x - cw / 2, top, width: cw, height: h - 40 * s,
      background: IRON, zIndex: z + 2, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - cw / 2, top, width: cw * 0.26, height: h - 40 * s,
      background: IRONL, opacity: 0.62, zIndex: z + 3 }} />
    <div style={{ position: "absolute", left: x + cw / 2 - cw * 0.16, top, width: cw * 0.16,
      height: h - 40 * s, background: IROND, zIndex: z + 3 }} />
    {/* flange rings — the detail that makes it cast iron and not a bar */}
    {Array.from({ length: Math.max(2, Math.floor(h / (150 * s))) }, (_, i) => {
      const ry = base - 78 * s - i * 150 * s;
      if (ry < top - 10) return null;
      return (<React.Fragment key={"fl" + i}>
        <div style={{ position: "absolute", left: x - cw * 0.62, top: ry, width: cw * 1.24,
          height: 26 * s, borderRadius: 4, background: IRONL, zIndex: z + 7, boxShadow: SH }} />
        <div style={{ position: "absolute", left: x - cw * 0.62, top: ry + 19 * s, width: cw * 1.24,
          height: 7 * s, background: IROND, zIndex: z + 8 }} />
      </React.Fragment>);
    })}
    {gauge && <Gauge x={x} y={base - 44 * s - 430 * s} h={430 * s} t={fill} w={62 * s}
      z={z + 20} f={f} />}
  </>);
};

/** the side-mounted handwheel and its spindle into the column.
    ⛔⛔ FRAME 0 MUST BE COMPLETE CONTENT (docs/THE-OPEN.md law 1). v1 gated this
       on `wheel > 0`, so at frame 0 — the one frame the whole hook is built on —
       the wheel the valveman is supposedly gripping WAS NOT ON SCREEN, and the
       reversal at f12 had nothing to break. It renders unconditionally; only
       its ROTATION is animated. */
export const SideWheel: React.FC<{ x: number; y: number; toX: number; s?: number;
  z?: number; rot?: number }> = ({ x, y, toX, s = 1, z = 70, rot = 0 }) => (<>
    {/* the spindle running from the wheel hub into the column */}
    <div style={{ position: "absolute", left: Math.min(x, toX), top: y - 9 * s,
      width: Math.abs(toX - x), height: 18 * s, borderRadius: 9 * s, background: BRASSD,
      zIndex: z - 2, boxShadow: SH }} />
    <div style={{ position: "absolute", left: Math.min(x, toX), top: y - 9 * s,
      width: Math.abs(toX - x), height: 6 * s, borderRadius: 9 * s, background: BRASS,
      zIndex: z - 1 }} />
    {/* the gland where it enters the casting */}
    <div style={{ position: "absolute", left: toX - 22 * s, top: y - 26 * s, width: 44 * s,
      height: 52 * s, borderRadius: 6, background: IRONL, zIndex: z, boxShadow: SH }} />
    <Handwheel x={x} y={y} s={s} z={z + 2} rot={rot} />
  </>);

/** the brass handwheel. `rot` is degrees — the hook's whole first beat. */
export const Handwheel: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 70, rot = 0 }) => {
  const R = 96 * s;
  return (
    <div style={{ position: "absolute", left: x - R, top: y - R, width: R * 2, height: R * 2,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
      {/* the rim */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        border: `${17 * s}px solid ${BRASS}`, boxSizing: "border-box", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: R * 0.09, top: R * 0.09,
        width: R * 1.82, height: R * 1.82, borderRadius: "50%",
        border: `${5 * s}px solid ${BRASSL}`, boxSizing: "border-box", opacity: 0.8 }} />
      {/* five spokes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={"sk" + i} style={{ position: "absolute", left: R - 8 * s, top: R - 8 * s,
          width: 16 * s, height: R, background: BRASS,
          transformOrigin: `50% ${8 * s}px`, transform: `rotate(${i * 72}deg)` }} />
      ))}
      {/* the hub */}
      <div style={{ position: "absolute", left: R - 26 * s, top: R - 26 * s, width: 52 * s,
        height: 52 * s, borderRadius: "50%", background: BRASSD }} />
      <div style={{ position: "absolute", left: R - 17 * s, top: R - 17 * s, width: 34 * s,
        height: 34 * s, borderRadius: "50%", background: BRASSL }} />
    </div>
  );
};

/** the feeder bundle: N thin pipes running in from the dark and CONVERGING on
    the column. `charge` 0..1 lights them from the outside in.

    ⛔ v1 drew them as parallel horizontals at one weight, spanning the whole
       frame — it read as scaffolding, not as pipes arriving. They now FAN: each
       pipe is rotated about its union so it points at the column, and the
       nearer ones are thicker and darker. Convergence is what says "these all
       go to the same place", which is the entire claim of the reel. */
export const Feeders: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  f?: number; charge?: number; span?: number; fan?: number; spread?: number }> =
  ({ x, y, n = 12, s = 1, z = 30, f = 0, charge = 0, span = 150, fan = 5,
     spread = 210 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      const rows = Math.max(1, Math.ceil(n / 2));
      const k = Math.floor(i / 2) / Math.max(1, rows - 1);
      /* irregular lengths — an evenly-stepped fan reads as a FISHBONE */
      const len = (168 + k * span + rnd(i, 61) * 96) * s;
      /* ⛔ THEY ENTER THE COLUMN AT DIFFERENT HEIGHTS, NOT ALL AT ONE POINT.
         v2 radiated every pipe from a single band at ±15° and the result was a
         SUNBURST — a spider, not plumbing. A bundle reads as a bundle when the
         unions are stacked up the casting and the pipes are near-horizontal. */
      const yy = y + (k - 0.5) * spread * s;
      const ang = side * (-fan + k * fan * 2) * 0.5;
      const lit = charge > 0 && charge * n > i ? 1 : 0;
      const th = (17 - k * 6) * s;
      const originX = x + side * 54 * s;
      return (<React.Fragment key={"fd" + i}>
        <div style={{ position: "absolute",
          left: side < 0 ? originX - len : originX, top: yy - th / 2,
          width: len, height: th, borderRadius: th / 2,
          background: lit ? WATERD : IROND, zIndex: z + (rows - Math.floor(i / 2)),
          boxShadow: SH, transformOrigin: side < 0 ? "100% 50%" : "0% 50%",
          transform: `rotate(${ang}deg)` }}>
          <div style={{ position: "absolute", inset: 0, height: th * 0.34,
            borderRadius: th / 2, background: lit ? WATERL : IRONL, opacity: 0.7 }} />
          {/* a travelling pulse, so a lit feeder FLOWS rather than just recolours */}
          {lit > 0 && (
            <div style={{ position: "absolute",
              left: side < 0 ? len - ((f * 8 + i * 37) % len) : ((f * 8 + i * 37) % len),
              top: 0, width: 40 * s, height: th, borderRadius: th / 2,
              background: WATERL, opacity: 0.72 }} />
          )}
        </div>
        {/* the union collar where it meets the column */}
        <div style={{ position: "absolute", left: originX - 13 * s, top: yy - th / 2 - 6 * s,
          width: 26 * s, height: th + 12 * s, borderRadius: 4, background: BRASSD,
          zIndex: z + rows + 4 }} />
      </React.Fragment>);
    })}
  </>);

/* =========================================================================
   THE FEEDER ROW (S2) — twenty-nine brass taps receding down a lamplit wall.
   ⛔ NO OPENAI / GPT MARK ANYWHERE. The VO names GPT-5; the repo does not serve
      it, so the picture never claims it. Only providers actually in the README
      appear, and the ones without a public mark get a cast stencil.
   ====================================================================== */
export const Tap: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  on?: number; label?: string; markKey?: string; hasMark?: boolean; drop?: number }> =
  ({ x, y, s = 1, z = 60, f = 0, on = 0, label, markKey, hasMark, drop }) => (<>
    {/* the wall boss and the spout */}
    <div style={{ position: "absolute", left: x - 20 * s, top: y - 12 * s, width: 40 * s,
      height: 26 * s, borderRadius: 5, background: BRASSD, zIndex: z, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - 11 * s, top: y + 10 * s, width: 22 * s,
      height: 46 * s, borderRadius: 4, background: BRASS, zIndex: z + 1 }} />
    <div style={{ position: "absolute", left: x - 11 * s, top: y + 10 * s, width: 7 * s,
      height: 46 * s, background: BRASSL, opacity: 0.75, zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - 17 * s, top: y + 50 * s, width: 34 * s,
      height: 13 * s, borderRadius: 4, background: BRASSD, zIndex: z + 3 }} />
    {/* the cross handle */}
    <div style={{ position: "absolute", left: x - 25 * s, top: y - 5 * s, width: 50 * s,
      height: 8 * s, borderRadius: 4, background: BRASSL, zIndex: z + 4,
      transform: `rotate(${on * 62}deg)`, transformOrigin: "50% 50%" }} />
    {/* the fall REACHES the launder — a stream that stops in mid-air is a
        tap pouring onto nothing */}
    {on > 0.04 && <Stream x={x} y={y + 62 * s} len={drop ?? 52 * s} w={11 * s} t={on}
      f={f} z={z + 5} />}
    {hasMark && markKey
      ? <Disc k={markKey} x={x} y={y - 54 * s} s={46 * s} z={z + 9} />
      : label && <Stencil t={label} x={x - 48 * s} y={y - 70 * s} s={s * 0.92} z={z + 9} />}
  </>);

/* =========================================================================
   THE COIN PUMP (S3) — the villain. A roadside pay-spigot: a coin head, a
   ratcheting price dial, and one thin dribble however much you feed it.
   ====================================================================== */
export const CoinPump: React.FC<{ x: number; base: number; s?: number; z?: number; f?: number;
  price?: string; dial?: number; flow?: number }> =
  ({ x, base, s = 1, z = 50, f = 0, price = "$0", dial = 0, flow = 0 }) => {
  const bw = 176 * s, bh = 330 * s;
  return (<>
    <Contact x={x - bw * 0.62} y={base - 6} w={bw * 1.24} z={z - 1} o={0.44} />
    {/* the cabinet */}
    <div style={{ position: "absolute", left: x - bw / 2, top: base - bh, width: bw, height: bh,
      borderRadius: 8, background: "#4C565E", zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - bw / 2, top: base - bh, width: bw * 0.22,
      height: bh, borderRadius: "8px 0 0 8px", background: "#5E6970", zIndex: z + 1 }} />
    <div style={{ position: "absolute", left: x + bw / 2 - bw * 0.14, top: base - bh,
      width: bw * 0.14, height: bh, borderRadius: "0 8px 8px 0", background: "#39424A", zIndex: z + 1 }} />
    {/* the sour green meter lamp — the only light this scene owns */}
    <div style={{ position: "absolute", left: x - 30 * s, top: base - bh - 26 * s, width: 60 * s,
      height: 30 * s, borderRadius: "30px 30px 0 0", background: "#6E7C6A", zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - 22 * s, top: base - bh - 18 * s, width: 44 * s,
      height: 18 * s, borderRadius: "22px 22px 0 0", background: "#A8BE9E", zIndex: z + 3 }} />
    {/* the price head — an enamel face with a ratcheting figure */}
    <div style={{ position: "absolute", left: x - bw * 0.40, top: base - bh + 22 * s,
      width: bw * 0.80, height: 92 * s, borderRadius: 6, background: "#DCD6C4",
      border: `${4 * s}px solid #8C8676`, zIndex: z + 4, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 46 * s, letterSpacing: "-0.02em",
        color: "#2A2A24" }}>{price}</span>
    </div>
    {/* the dial that spins when a coin drops */}
    <div style={{ position: "absolute", left: x - 40 * s, top: base - bh + 132 * s, width: 80 * s,
      height: 80 * s, borderRadius: "50%", background: "#333B42", zIndex: z + 5,
      border: `${5 * s}px solid #5E6970`, boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: x - 4 * s, top: base - bh + 140 * s, width: 8 * s,
      height: 34 * s, borderRadius: 4, background: "#C8CFD4", zIndex: z + 6,
      transformOrigin: `50% ${32 * s}px`, transform: `rotate(${dial}deg)` }} />
    {/* the coin slot */}
    <div style={{ position: "absolute", left: x + bw * 0.18, top: base - bh + 140 * s,
      width: 10 * s, height: 40 * s, borderRadius: 5, background: "#22282D", zIndex: z + 6 }} />
    {/* the spout, and the pathetic dribble */}
    <div style={{ position: "absolute", left: x - 13 * s, top: base - bh + 236 * s, width: 26 * s,
      height: 54 * s, borderRadius: 4, background: BRASSD, zIndex: z + 5 }} />
    {flow > 0.02 && <Stream x={x} y={base - bh + 288 * s} len={64 * s} w={6 * s} t={flow} f={f}
      z={z + 7} c={WATERD} />}
  </>);
};

/** a coin, falling into the slot. */
export const Coin: React.FC<{ x: number; y: number; s?: number; z?: number; t: number }> =
  ({ x, y, s = 1, z = 80, t }) => {
  if (t <= 0 || t >= 1) return null;
  const g = t * t;
  return (
    <div style={{ position: "absolute", left: x - 15 * s, top: y + g * 120 * s, width: 30 * s,
      height: 30 * s, borderRadius: "50%", background: GOLD, zIndex: z,
      border: `${3 * s}px solid ${BRASSD}`, boxSizing: "border-box",
      transform: `scaleX(${Math.abs(Math.cos(t * 9))})`, transformOrigin: "50% 50%" }} />
  );
};

/* =========================================================================
   THE MANIFOLD (S4) — twenty-nine feeds arcing into one cast header and out
   one main. The reel's biggest, warmest, most-populated frame.
   ====================================================================== */
export const Manifold: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  f?: number; charge?: number; w?: number }> =
  ({ x, y, n = 14, s = 1, z = 40, f = 0, charge = 0, w: hw = 720 }) => (<>
    {/* ⛔ THE TOP RUN. Without it the drops are free-standing sticks with caps
        on and the frame reads as a BAR CHART — the exact shape reel 86 rejected
        for having no moment. A gallery pipe across the elbows makes them a
        take-off from a main, which is what they are. */}
    <div style={{ position: "absolute", left: x - hw / 2 - 60 * s,
      top: y - 320 * s - 26 * s, width: hw + 120 * s, height: 34 * s, borderRadius: 6,
      background: IROND, zIndex: z - 3, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - hw / 2 - 60 * s,
      top: y - 320 * s - 26 * s, width: hw + 120 * s, height: 9 * s, borderRadius: 6,
      background: IRONL, opacity: 0.7, zIndex: z - 2 }} />
    {/* the arcs coming down into the header */}
    {Array.from({ length: n }, (_, i) => {
      const k = i / (n - 1);
      const px = x - hw / 2 + k * hw;
      const drop = (120 + Math.abs(k - 0.5) * 190) * s;
      const lit = charge * n > i;
      return (<React.Fragment key={"ar" + i}>
        <div style={{ position: "absolute", left: px - 9 * s, top: y - drop, width: 18 * s,
          height: drop, background: lit ? WATERD : IROND, zIndex: z + i, borderRadius: 4 }} />
        <div style={{ position: "absolute", left: px - 9 * s, top: y - drop, width: 6 * s,
          height: drop, background: lit ? WATERL : IRONL, opacity: 0.7, zIndex: z + i + 1 }} />
        {/* the elbow at the top */}
        <div style={{ position: "absolute", left: px - 13 * s, top: y - drop - 9 * s,
          width: 26 * s, height: 22 * s, borderRadius: "9px 9px 0 0", background: BRASSD,
          zIndex: z + i + 2 }} />
        {lit && (
          <div style={{ position: "absolute", left: px - 9 * s,
            top: y - drop + ((f * 9 + i * 31) % drop), width: 18 * s, height: 30 * s,
            borderRadius: 4, background: WATERL, opacity: 0.62, zIndex: z + i + 3 }} />
        )}
      </React.Fragment>);
    })}
    {/* the header itself — one heavy casting */}
    <div style={{ position: "absolute", left: x - hw / 2 - 34 * s, top: y, width: hw + 68 * s,
      height: 66 * s, borderRadius: 9, background: IRON, zIndex: z + 40, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - hw / 2 - 34 * s, top: y, width: hw + 68 * s,
      height: 15 * s, borderRadius: "9px 9px 0 0", background: IRONL, zIndex: z + 41 }} />
    <div style={{ position: "absolute", left: x - hw / 2 - 34 * s, top: y + 52 * s,
      width: hw + 68 * s, height: 14 * s, background: IROND, zIndex: z + 41 }} />
    {/* rivets along the header */}
    {Array.from({ length: 13 }, (_, i) => (
      <div key={"rv" + i} style={{ position: "absolute",
        left: x - hw / 2 - 14 * s + i * ((hw + 28 * s) / 12) - 6 * s, top: y + 26 * s,
        width: 13 * s, height: 13 * s, borderRadius: "50%", background: IROND, zIndex: z + 42 }} />
    ))}
  </>);

/** the main's cast rating plate. ⛔ THE ONLY PLACE THE REAL POOLED FIGURE
    APPEARS, and every value on it is from the README pulled 2026-08-11. */
export const RatingPlate: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 88, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "8% 50%" }}>
    <div style={{ padding: `${16 * s}px ${26 * s}px`, borderRadius: 8 * s,
      background: "#CDBF9C", border: `${5 * s}px solid #8A7C5C`, boxShadow: SH_D }}>
      <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 19 * s, letterSpacing: "0.20em",
        color: "#5C513A" }}>RATED CAPACITY</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 55 * s,
        lineHeight: 1.04, letterSpacing: "-0.02em", color: "#231E12", marginTop: 3 * s }}>
        4 BILLION</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
        letterSpacing: "0.03em", color: "#463C28" }}>TOKENS / MONTH</div>
      <div style={{ marginTop: 8 * s, paddingTop: 8 * s, borderTop: `3px solid #9C8E6C`,
        fontFamily: MONO, fontWeight: 800, fontSize: 19 * s, letterSpacing: "0.06em",
        color: "#5C513A" }}>29 PROVIDERS · 358 ENDPOINTS</div>
    </div>
  </div>
);

/* =========================================================================
   THE SELECTOR (S5) — the rotary changeover gear. The whole failover
   mechanism, at macro, with nothing else in frame.
   ====================================================================== */
export const Selector: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  arm: number; live: number; dead?: number }> =
  ({ x, y, s = 1, z = 50, f = 0, arm, live, dead = -1 }) => {
  const R = 178 * s;
  const PORTS = [
    { n: "07", a: -90 }, { n: "12", a: 0 }, { n: "19", a: 90 }, { n: "24", a: 180 },
  ];
  return (<>
    {/* the body casting */}
    <div style={{ position: "absolute", left: x - R - 34 * s, top: y - R - 34 * s,
      width: (R + 34 * s) * 2, height: (R + 34 * s) * 2, borderRadius: "50%",
      background: IRON, zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - R - 20 * s, top: y - R - 20 * s,
      width: (R + 20 * s) * 2, height: (R + 20 * s) * 2, borderRadius: "50%",
      background: IROND, zIndex: z + 1 }} />
    {/* the brass dial face */}
    <div style={{ position: "absolute", left: x - R, top: y - R, width: R * 2, height: R * 2,
      borderRadius: "50%", background: BRASS, zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - R + 9 * s, top: y - R + 9 * s,
      width: (R - 9 * s) * 2, height: (R - 9 * s) * 2, borderRadius: "50%",
      background: BRASSD, zIndex: z + 3 }} />
    <div style={{ position: "absolute", left: x - R + 22 * s, top: y - R + 22 * s,
      width: (R - 22 * s) * 2, height: (R - 22 * s) * 2, borderRadius: "50%",
      background: BRASS, zIndex: z + 4 }} />
    {/* the four feed ports */}
    {PORTS.map((p, i) => {
      const rad = (p.a * Math.PI) / 180;
      const px = x + Math.cos(rad) * R * 0.99, py = y + Math.sin(rad) * R * 0.99;
      const isLive = i === live, isDead = i === dead;
      return (<React.Fragment key={"pt" + i}>
        <div style={{ position: "absolute", left: px - 42 * s, top: py - 42 * s, width: 84 * s,
          height: 84 * s, borderRadius: "50%",
          background: isDead ? "#7A4038" : isLive ? WATERD : IROND, zIndex: z + 10,
          border: `${6 * s}px solid ${BRASSD}`, boxSizing: "border-box", boxShadow: SH }} />
        <div style={{ position: "absolute", left: px - 42 * s, top: py - 20 * s, width: 84 * s,
          textAlign: "center", zIndex: z + 12, fontFamily: MONO, fontWeight: 900,
          fontSize: 34 * s, color: isDead ? "#F0C4BC" : isLive ? WATERL : "#8E959C" }}>{p.n}</div>
        {/* the 429 flag drops over a dead port */}
        {isDead && (
          <div style={{ position: "absolute", left: px - 48 * s, top: py + 40 * s, zIndex: z + 20,
            padding: `${4 * s}px ${10 * s}px`, borderRadius: 4, background: RED,
            border: `${3 * s}px solid #8E3227`, boxShadow: SH,
            fontFamily: MONO, fontWeight: 900, fontSize: 26 * s, letterSpacing: "0.06em",
            color: "#FBEDE9" }}>429</div>
        )}
      </React.Fragment>);
    })}
    {/* the feed pipes entering each port, so this reads as PLUMBING and not as
        a dial floating in a grey room */}
    {PORTS.map((pt, i) => {
      const rad = (pt.a * Math.PI) / 180;
      const px = x + Math.cos(rad) * R * 1.34, py = y + Math.sin(rad) * R * 1.34;
      return <div key={"fp" + i} style={{ position: "absolute", left: px - 26 * s,
        top: py - 26 * s, width: 52 * s, height: 300 * s, borderRadius: 8,
        background: i === dead ? "#5E4038" : i === live ? WATERD : IROND, zIndex: z - 4,
        transformOrigin: "50% 0%", transform: `rotate(${pt.a + 90}deg)`, boxShadow: SH }} />;
    })}
    {/* the arm — the thing that moves, and the only thing that moves.
        ⛔ THE BAR HANGS DOWNWARD FROM THE HUB, so at rotation 0 it points at
        +90°. To aim at a port whose angle is A the rotation must be A - 90.
        v1 used `arm + 90` and the arm pointed 180° AWAY from every port — at
        f520 it sat between two dead ports while the flag said 07 had failed,
        which is the one frame in the reel whose whole job is to be unambiguous. */}
    <div style={{ position: "absolute", left: x - 15 * s, top: y - 15 * s, width: 30 * s,
      height: R * 0.99, zIndex: z + 30, transformOrigin: `50% ${15 * s}px`,
      transform: `rotate(${arm - 90}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: BRASSL,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 10 * s, height: "100%",
        background: BRASS, borderRadius: "8px 0 0 8px" }} />
      <div style={{ position: "absolute", left: -9 * s, bottom: -6 * s, width: 48 * s,
        height: 30 * s, borderRadius: 6, background: BRASSL }} />
    </div>
    <div style={{ position: "absolute", left: x - 34 * s, top: y - 34 * s, width: 68 * s,
      height: 68 * s, borderRadius: "50%", background: IRON, zIndex: z + 34 }} />
    <div style={{ position: "absolute", left: x - 20 * s, top: y - 20 * s, width: 40 * s,
      height: 40 * s, borderRadius: "50%", background: IRONL, zIndex: z + 35 }} />
  </>);
};

/* =========================================================================
   SMALL FITTINGS
   ====================================================================== */

/** the hanging lamp — the warm key every interior is lit by. */
export const Lamp: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  on?: number; sway?: number }> =
  ({ x, y, s = 1, z = 70, f = 0, on = 1, sway = 1 }) => {
  const a = Math.sin(f / 46) * 1.5 * sway;
  return (
    <div style={{ position: "absolute", left: x, top: 0, zIndex: z,
      transform: `rotate(${a}deg)`, transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", left: -3, top: 0, width: 6, height: y,
        background: "#3E444A" }} />
      <div style={{ position: "absolute", left: -52 * s, top: y, width: 104 * s, height: 46 * s,
        borderRadius: "6px 6px 52px 52px", background: "#4E555C", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -46 * s, top: y + 36 * s, width: 92 * s,
        height: 15 * s, borderRadius: "0 0 46px 46px",
        background: on > 0.5 ? "#F2DFAE" : "#5A6068" }} />
      {on > 0.5 && (
        <div style={{ position: "absolute", left: -20 * s, top: y + 44 * s, width: 40 * s,
          height: 18 * s, borderRadius: "50%", background: "#FBF0D2" }} />
      )}
    </div>
  );
};

/** the Claude-marked pail — the OUTLET. This is the honest place for the mark:
    Claude Code is a documented client of this repo, so the thing being FILLED
    is what carries it. */
export const Pail: React.FC<{ x: number; y: number; s?: number; z?: number; fill?: number;
  mark?: boolean }> = ({ x, y, s = 1, z = 74, fill = 0, mark = true }) => {
  const bw = 128 * s, bh = 108 * s;
  return (<>
    <Contact x={x - bw * 0.56} y={y + bh - 8 * s} w={bw * 1.12} z={z - 1} o={0.4} />
    <div style={{ position: "absolute", left: x - bw / 2, top: y, width: bw, height: bh,
      zIndex: z, background: "#B9B2A2", borderRadius: `4px 4px ${18 * s}px ${18 * s}px`,
      boxShadow: SH_D, overflow: "hidden" }}>
      {fill > 0.01 && (<>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
          height: bh * Math.min(1, fill), background: WATER }} />
        <div style={{ position: "absolute", left: 0, right: 0,
          bottom: bh * Math.min(1, fill) - 5 * s, height: 8 * s, background: WATERL }} />
      </>)}
      <div style={{ position: "absolute", left: 0, top: 0, width: bw * 0.2, height: bh,
        background: "#D2CCBE", opacity: 0.55 }} />
    </div>
    {/* the rim hoop */}
    <div style={{ position: "absolute", left: x - bw / 2 - 5 * s, top: y - 7 * s,
      width: bw + 10 * s, height: 15 * s, borderRadius: 4, background: "#8E887A", zIndex: z + 4 }} />
    {mark && (
      <div style={{ position: "absolute", left: x - 23 * s, top: y + bh * 0.30, width: 46 * s,
        height: 46 * s, borderRadius: 11 * s, background: "#FFFFFF", zIndex: z + 6,
        border: `${3 * s}px solid #E8DCC0`, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 33 * s, height: 33 * s, objectFit: "contain" }} />
      </div>
    )}
  </>);
};

/** the tin cup — 800,000, and it is pathetic. Foreground, near camera. */
export const TinCup: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number }> =
  ({ x, y, s = 1, z = 90, f = 0 }) => {
  const bw = 150 * s, bh = 126 * s;
  return (<>
    <Contact x={x - bw * 0.58} y={y + bh - 10 * s} w={bw * 1.16} z={z - 1} o={0.46} />
    <div style={{ position: "absolute", left: x - bw / 2, top: y, width: bw, height: bh,
      zIndex: z, background: "#9C978B", borderRadius: `3px 3px ${14 * s}px ${14 * s}px`,
      boxShadow: SH_D, overflow: "hidden" }}>
      {/* a scratch of water in the bottom — this is 800,000 */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 11 * s,
        background: WATERD }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 8 * s, height: 5 * s,
        background: WATERL, opacity: 0.8 }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: bw * 0.22, height: bh,
        background: "#B4AFA2", opacity: 0.6 }} />
      {/* dents */}
      {[0, 1, 2].map((i) => (
        <div key={"dn" + i} style={{ position: "absolute", left: bw * (0.3 + i * 0.22),
          top: bh * (0.24 + (i % 2) * 0.3), width: 22 * s, height: 15 * s, borderRadius: "50%",
          background: "#8A857A", opacity: 0.8 }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: x - bw / 2 - 5 * s, top: y - 8 * s,
      width: bw + 10 * s, height: 16 * s, borderRadius: 4, background: "#7E796E", zIndex: z + 3 }} />
    {/* the handle */}
    <div style={{ position: "absolute", left: x + bw / 2 - 4 * s, top: y + 22 * s, width: 44 * s,
      height: 58 * s, borderRadius: "0 26px 26px 0", border: `${10 * s}px solid #7E796E`,
      borderLeft: "none", boxSizing: "border-box", zIndex: z + 2 }} />
  </>);
};

/** the valveman. ⛔ THE COSTUME IS UNCONDITIONAL — a bare box Mascot reads as
    having two pairs of legs (reel 98). `constr` gives him the hi-vis and hat a
    waterman would actually wear. */
export const Valveman: React.FC<{ x: number; base: number; s?: number; z?: number; f: number;
  shock?: number; cheer?: number; gaze?: number; nod?: number }> =
  ({ x, base, s = 1, z = 70, f, shock = 0, cheer = 0, gaze = 0, nod = 3.2 }) => (
  <div style={{ position: "absolute", left: x - (250 * s) / 2, top: base - 250 * s, zIndex: z }}>
    <Mascot lf={f} size={250 * s} constr={1} gaze={gaze} shock={shock} cheer={cheer}
      nodAmp={nod} nodSpeed={11} />
  </div>
);

/** a distant figure in the rain — the queue at the coin pump. Silhouette only:
    ⛔ never a second detailed character competing with the hero. */
export const Waiting: React.FC<{ x: number; base: number; s?: number; z?: number; c?: string }> =
  ({ x, base, s = 1, z = 40, c = "#2E373E" }) => (<>
    <div style={{ position: "absolute", left: x - 32 * s, top: base - 96 * s, width: 64 * s,
      height: 78 * s, borderRadius: `${16 * s}px ${16 * s}px 4px 4px`, background: c, zIndex: z }} />
    <div style={{ position: "absolute", left: x - 20 * s, top: base - 24 * s, width: 15 * s,
      height: 24 * s, background: c, zIndex: z }} />
    <div style={{ position: "absolute", left: x + 6 * s, top: base - 24 * s, width: 15 * s,
      height: 24 * s, background: c, zIndex: z }} />
    <Contact x={x - 34 * s} y={base - 8 * s} w={68 * s} z={z - 1} o={0.34} />
  </>);

/** a heavy iron door/arch mouth the feeders come out of — depth for the vault */
export const PipeMouth: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 20 }) => (<>
    <div style={{ position: "absolute", left: x - 116 * s, top: y, width: 232 * s, height: 148 * s,
      borderRadius: `${116 * s}px ${116 * s}px 0 0`, background: "#1C2126", zIndex: z }} />
    <div style={{ position: "absolute", left: x - 130 * s, top: y - 14 * s, width: 260 * s,
      height: 26 * s, borderRadius: 5, background: IRON, zIndex: z + 1, boxShadow: SH }} />
  </>);
