import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Ring, Puff, Contact, Pool, squash,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER,
  JBLUE, OVIO, MAMBER, PTEAL, HOT, JAMB, R, MarkTile,
} from "./RowWorld";

/* ===========================================================================
   REEL 129 · "GOOGLE" — THE PROPS.  Board: storyboards/129-google.md.

   ⛔⛔ `feedback_props_need_real_drawing`: *a book was FOUR DIVS*. The house bar
   is 12-16 drawn elements on a hero prop, and every prop below is counted in
   its own comment. A primitive with a label on it is a CONTAINER (§3) and gets
   rejected however well it moves.

   ⛔ AND `feedback_a_prop_may_draw_its_own_children` — READ THE PROP BEFORE
   ADDING ONE. Every prop here declares what it draws for itself.
   ========================================================================= */

/* ---- BAY 07 · JULES ------------------------------------------------------ */

/** ⭐ THE BACKLOG. The VO's noun is "backlog" and its verb is "clears", so this
    is a physical stack that physically empties — §3's whole point. `left` is
    how many tickets remain of `n`.
    Drawn per ticket: card, head bar, the open/merged dot, two body rules, the
    branch stub, a shadow = 7 elements x 24 tickets, on a rack of 5. */
export const PRRack: React.FC<{ x: number; y: number; w?: number; n?: number; left: number;
  f: number; z?: number;
  /** ⭐ columns. At 2 this is a rack; at 1 it is a TOWER, and a tower's HEIGHT is
      the quantity — which is what "it clears your backlog" needs you to read. */
  cols?: number; rowH?: number }> =
  ({ x, y, w: ww = 250, n = 24, left, f, z = 46, cols = 2, rowH }) => {
  const rows = Math.ceil(n / cols), rh = rowH ?? 30;
  const nLeft = Math.max(0, Math.min(n, left));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: rows * rh + 46, zIndex: z }}>
      {/* the rack: two uprights, a head rail, a foot rail, five shelf lips */}
      <div style={{ position: "absolute", left: -12, top: -20, width: 12, height: rows * rh + 60, background: dkh(STEEL, 0.52) }} />
      <div style={{ position: "absolute", left: ww, top: -20, width: 12, height: rows * rh + 60, background: dkh(STEEL, 0.62) }} />
      <div style={{ position: "absolute", left: -12, top: -20, width: ww + 24, height: 14, background: STEEL }} />
      <div style={{ position: "absolute", left: -12, top: rows * rh + 26, width: ww + 24, height: 14, background: dkh(STEEL, 0.44) }} />
      {Array.from({ length: 5 }, (_, s) => (
        <div key={"shf" + s} style={{ position: "absolute", left: -6, top: 6 + s * ((rows * rh) / 5),
          width: ww + 12, height: 4, background: dkh(STEEL, 0.34) }} />
      ))}
      {/* the tickets. They leave from the TOP, so the stack's HEIGHT falls —
          a quantity as a LENGTH, which is what §4's translation table asks for. */}
      {Array.from({ length: n }, (_, i) => {
        if (i >= nLeft) return null;
        const r = Math.floor(i / cols), c = i % cols;
        const cw = (ww - 18) / cols;
        const wob = Math.sin(f / 21 + i * 1.3) * 1.4;
        /* ⭐ THE RACK IS THE DOMINANT OBJECT IN THIS SCENE and every ticket in it
           was a rect with two grey bars. At 174 x 23 there is no room for the
           full `PRCard`, but there IS room for the four things that make a row
           read as a pull request: a status rail, the BRANCH GLYPH, a title bar
           and countable diff pips. Same note as the flying cards — *"too
           rectangle based" is a drawing budget*, scaled to the space.
           ⛔ And this is a JS comment, not a JSX one: `return (` opens an
           EXPRESSION, and a JSX-style brace comment is only valid among JSX
           children. (Writing one inside a block comment also closes it early,
           because it contains the terminator.) */
        return (
          <div key={"pr" + i} style={{ position: "absolute", left: 6 + c * (cw + 6),
            top: rows * rh - r * rh - 4 + wob, width: cw, height: rh - 7,
            background: i % 3 === 0 ? "#F6F2E6" : "#E9E3D4", borderRadius: 3,
            transform: `rotate(${(rnd(i, 7) - 0.5) * 2.6}deg)`, boxShadow: SH,
            border: "1px solid #CFC7B4" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 5, height: "100%",
              borderRadius: "3px 0 0 3px", background: i % 4 === 0 ? GOLD : GREEN }} />
            <svg viewBox="0 0 24 24" width={13} height={13}
              style={{ position: "absolute", left: 9, top: (rh - 7) / 2 - 6.5 }}>
              <circle cx="6" cy="5" r="2.8" fill={i % 4 === 0 ? GOLD : GREEN} />
              <circle cx="6" cy="19" r="2.8" fill={i % 4 === 0 ? GOLD : GREEN} />
              <circle cx="18" cy="12" r="2.8" fill={i % 4 === 0 ? GOLD : GREEN} />
              <path d="M6 7.8 V16.2" stroke={i % 4 === 0 ? GOLD : GREEN} strokeWidth="2" fill="none" />
              <path d="M6 12 H15" stroke={i % 4 === 0 ? GOLD : GREEN} strokeWidth="2" fill="none" />
            </svg>
            <div style={{ position: "absolute", left: 27, top: 5, width: cw * (0.30 + rnd(i, 8) * 0.22),
              height: 4, background: "#3E382C", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 27, top: 13, width: cw * (0.18 + rnd(i, 9) * 0.14),
              height: 3, background: "#9A9280", borderRadius: 2 }} />
            {/* the diff, as countable pips */}
            <div style={{ position: "absolute", right: 8, top: 6, display: "flex", gap: 2 }}>
              {Array.from({ length: 2 + Math.floor(rnd(i, 10) * 3) }, (_, q) => (
                <div key={"dp" + q} style={{ width: 3, height: 9, background: "#3F9E74" }} />
              ))}
              {Array.from({ length: 1 + Math.floor(rnd(i, 11) * 2) }, (_, q) => (
                <div key={"dm" + q} style={{ width: 3, height: 9, background: "#C4523E" }} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** the Jules rig: a bench unit whose arms unfold in three overlapping stages.
    Drawn: base, plinth, column, shoulder, upper arm, forearm, head, lens,
    two status lamps, a cable boss, four vent louvres = 15 elements. */
export const JulesRig: React.FC<{ x: number; y: number; s?: number; f: number; boot?: number;
  reach?: number; z?: number }> = ({ x, y, s = 1, f, boot = 1, reach = 0, z = 50 }) => {
  const b = Math.max(0, Math.min(1, boot));
  /* ⭐ OVERLAPPING ACTION (§13): shoulder leads, upper arm follows, head lags
     and rings out. A stepped unfold measures well and reads CHOPPY. */
  const a1 = b * 62, a2 = b * -44, a3 = Math.sin(b * Math.PI) * 10;
  const rc = reach * 26;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 200 * s, height: 210 * s, zIndex: z }}>
      <Contact x={-8 * s} y={196 * s} w={190 * s} z={-1} o={0.36} />
      <div style={{ position: "absolute", left: 6 * s, top: 176 * s, width: 168 * s, height: 22 * s, background: dkh(SLATE, 0.44), borderRadius: 4 }} />
      <div style={{ position: "absolute", left: 22 * s, top: 150 * s, width: 136 * s, height: 30 * s, background: SLATE, borderRadius: 3 }} />
      {[0, 1, 2, 3].map(i => (
        <div key={"lv" + i} style={{ position: "absolute", left: 34 * s, top: (156 + i * 6) * s, width: 60 * s, height: 3 * s, background: dkh(SLATE, 0.5) }} />
      ))}
      <div style={{ position: "absolute", left: 20 * s, top: 158 * s, width: 12 * s, height: 12 * s, borderRadius: "50%", background: b > 0.2 ? JBLUE : dkh(JBLUE, 0.7) }} />
      <div style={{ position: "absolute", left: 150 * s, top: 158 * s, width: 12 * s, height: 12 * s, borderRadius: "50%", background: b > 0.6 ? GOLD : dkh(GOLD, 0.7) }} />
      {/* column */}
      <div style={{ position: "absolute", left: 78 * s, top: 96 * s, width: 26 * s, height: 60 * s, background: dkh(STEEL, 0.28), borderRadius: 3 }} />
      {/* shoulder -> upper arm -> forearm -> head, each on its own clock */}
      <div style={{ position: "absolute", left: 82 * s, top: 96 * s, width: 100 * s, height: 17 * s,
        background: STEEL, borderRadius: 8, transformOrigin: "6% 50%",
        transform: `rotate(${-a1}deg)` }}>
        <div style={{ position: "absolute", left: 78 * s, top: -2 * s, width: 86 * s, height: 14 * s,
          background: mxh(STEEL, 0.14), borderRadius: 7, transformOrigin: "4% 50%",
          transform: `rotate(${-a2 + rc}deg)` }}>
          <div style={{ position: "absolute", left: 70 * s, top: -9 * s, width: 34 * s, height: 30 * s,
            background: dkh(STEEL, 0.16), borderRadius: 6, transform: `rotate(${a3}deg)` }}>
            <div style={{ position: "absolute", left: 7 * s, top: 9 * s, width: 18 * s, height: 11 * s,
              borderRadius: 3, background: b > 0.5 ? JBLUE : "#1A2228" }} />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 68 * s, top: 88 * s, width: 46 * s, height: 14 * s, background: dkh(SLATE, 0.2), borderRadius: 4 }} />
    </div>
  );
};

/** ⭐ "POWERED BY GEMINI", DRAWN LITERALLY: an armoured feed with the real
    Gemini mark on its junction box, and LIGHT THAT TRAVELS THE WHOLE LENGTH of
    the cable into the rig. §11: an ACTION is a DISTANCE — the charge crosses
    most of the panel, it does not just switch on. */
export const PowerFeed: React.FC<{ x: number; y: number; len?: number; f: number; charge?: number;
  z?: number; mark?: string | null; name?: string; c?: string }> =
  ({ x, y, len = 520, f, charge = 0, z = 42, mark = R.feeds.gemini, name, c = JBLUE }) => {
  const k = Math.max(0, Math.min(1, charge));
  return (<>
    {/* the armoured run: a conduit, six clamps, and the sag between them */}
    <div style={{ position: "absolute", left: x, top: y, width: len, height: 48, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.56)} 100%)`, borderRadius: 10 }} />
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"cl" + i} style={{ position: "absolute", left: x + 40 + i * (len - 80) / 5, top: y - 9,
        width: 26, height: 66, background: dkh(STEEL, 0.40), borderRadius: 3, zIndex: z + 1 }} />
    ))}
    {/* the charge travelling — a bright head with a trail behind it */}
    {k > 0.001 && k < 0.999 && (
      <div style={{ position: "absolute", left: x + 6, top: y + 8, width: (len - 12) * k, height: 32,
        zIndex: z + 2, borderRadius: 6,
        background: `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, 0.42)} 62%, ${hexa(c, 0.98)} 100%)` }} />
    )}
    {k >= 0.999 && (
      <div style={{ position: "absolute", left: x + 6, top: y + 8, width: len - 12, height: 32,
        zIndex: z + 2, borderRadius: 6, background: hexa(c, 0.80 + Math.sin(f / 5) * 0.14) }} />
    )}
    {/* the junction box carrying the real mark */}
    <div style={{ position: "absolute", left: x - 96, top: y - 46, width: 120, height: 140, zIndex: z + 3,
      background: dkh(SLATE, 0.28), borderRadius: 6, border: `3px solid ${dkh(SLATE, 0.5)}` }} />
    <MarkTile x={x - 84} y={y - 34} s={84} src={mark} name={name} z={z + 4} />
  </>);
};

/** the night window that runs to dawn. `dawn` 0..1 — the ONE slow move in S5,
    and it is what "all in the background" means. */
export const NightWindow: React.FC<{ x: number; y: number; w?: number; h?: number; dawn?: number;
  z?: number }> = ({ x, y, w: ww = 250, h: hh = 180, dawn = 0, z = 12 }) => {
  const d = Math.max(0, Math.min(1, dawn));
  const sky = d < 0.5
    ? `linear-gradient(180deg, ${hexa("#0A1428", 1)} 0%, ${hexa("#14243E", 1)} 100%)`
    : `linear-gradient(180deg, ${hexa("#2A3A5E", 1)} 0%, ${hexa(d > 0.8 ? "#E8A868" : "#6A5A78", 1)} 100%)`;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, background: sky }} />
      {/* a far skyline, so the window is a VIEW and not a coloured rectangle */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"bl" + i} style={{ position: "absolute", left: 6 + i * (ww - 12) / 9,
          bottom: 0, width: (ww - 12) / 9 - 5, height: 26 + rnd(i, 9) * 54,
          background: hexa("#060A12", 0.88 - d * 0.22) }} />
      ))}
      {/* stars fade out as dawn comes up */}
      {d < 0.7 && Array.from({ length: 12 }, (_, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: 10 + rnd(i, 4) * (ww - 20),
          top: 8 + rnd(i, 5) * hh * 0.5, width: 3, height: 3, borderRadius: "50%",
          background: hexa("#DDE8FF", (1 - d / 0.7) * 0.8) }} />
      ))}
      {/* frame + glazing bars */}
      <div style={{ position: "absolute", inset: 0, border: `9px solid ${dkh(JAMB, 0.1)}` }} />
      <div style={{ position: "absolute", left: ww / 2 - 3, top: 0, width: 6, height: hh, background: dkh(JAMB, 0.1) }} />
      <div style={{ position: "absolute", left: 0, top: hh / 2 - 3, width: ww, height: 6, background: dkh(JAMB, 0.1) }} />
    </div>
  );
};

/** S5's three mechanisms. ⛔ THREE DIFFERENT ONES, never one played three times
    — the VO names three different jobs and §3 says draw the verb it uses. */
export const BugCatch: React.FC<{ x: number; y: number; f: number; at: number; s?: number; z?: number }> =
  ({ x, y, f, at, s = 1, z = 58 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const run = E(lf, 0, 14, 0, 1, LIN);          // the bug scuttles
  const grab = E(lf, 14, 20, 0, 1, IN_Q);       // the clamp closes
  const gone = E(lf, 20, 27, 0, 1, IN_Q);       // and ejects it
  const bx = x + run * 120 - gone * 210;
  const by = y - gone * 90;
  return (<>
    {/* the board it came off, going green behind it */}
    <div style={{ position: "absolute", left: x - 20, top: y - 34, width: 150, height: 46, zIndex: z - 2,
      background: dkh(grab > 0.9 ? GREEN : "#3A3226", 0.24), borderRadius: 4 }} />
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"tr" + i} style={{ position: "absolute", left: x - 12 + i * 34, top: y - 26,
        width: 24, height: 4, background: grab > 0.9 ? GREEN : "#6A6250", zIndex: z - 1 }} />
    ))}
    {/* the bug: body, head, six legs, two antennae = 11 elements */}
    {gone < 0.98 && (
      <div style={{ position: "absolute", left: bx, top: by, width: 30 * s, height: 20 * s, zIndex: z,
        transform: `rotate(${gone * 320}deg)` }}>
        <div style={{ position: "absolute", left: 4 * s, top: 3 * s, width: 20 * s, height: 14 * s,
          borderRadius: "50%", background: "#3A2A1E" }} />
        <div style={{ position: "absolute", left: 20 * s, top: 5 * s, width: 10 * s, height: 10 * s,
          borderRadius: "50%", background: "#241810" }} />
        {[0, 1, 2].map(i => (<React.Fragment key={"lg" + i}>
          <div style={{ position: "absolute", left: (7 + i * 6) * s, top: 1 * s, width: 2 * s, height: 6 * s,
            background: "#241810", transform: `rotate(${-24 + Math.sin(lf / 2 + i) * 16}deg)` }} />
          <div style={{ position: "absolute", left: (7 + i * 6) * s, top: 15 * s, width: 2 * s, height: 6 * s,
            background: "#241810", transform: `rotate(${24 - Math.sin(lf / 2 + i) * 16}deg)` }} />
        </React.Fragment>))}
        <div style={{ position: "absolute", left: 27 * s, top: 2 * s, width: 2 * s, height: 7 * s, background: "#241810", transform: "rotate(28deg)" }} />
        <div style={{ position: "absolute", left: 29 * s, top: 8 * s, width: 2 * s, height: 7 * s, background: "#241810", transform: "rotate(-14deg)" }} />
      </div>
    )}
    {/* the clamp that takes it */}
    <div style={{ position: "absolute", left: x + 108, top: y - 46, width: 16, height: 40, zIndex: z + 1,
      background: dkh(STEEL, 0.2), transformOrigin: "50% 0%", transform: `rotate(${-18 + grab * 18}deg)` }} />
    <div style={{ position: "absolute", left: x + 126, top: y - 46, width: 16, height: 40, zIndex: z + 1,
      background: dkh(STEEL, 0.34), transformOrigin: "50% 0%", transform: `rotate(${18 - grab * 18}deg)` }} />
    {grab > 0.95 && <Ring x={x + 122} y={y - 6} f={f} at={at + 20} c={JBLUE} s={0.5} z={z + 4} />}
  </>);
};

/** "writing tests" — a rack that FILLS. §4: a quantity as a LENGTH, no numeral. */
export const TestRack: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  step?: number; z?: number; w?: number }> =
  ({ x, y, f, at, n = 8, step = 5, z = 56, w: ww = 190 }) => {
  const lf = f - at;
  const sw = ww / n;
  return (<>
    <div style={{ position: "absolute", left: x - 6, top: y - 8, width: ww + 12, height: 40, zIndex: z - 1,
      background: dkh(SLATE, 0.4), borderRadius: 4 }} />
    {Array.from({ length: n }, (_, i) => {
      const on = lf >= i * step;
      const pop = on ? E(lf, i * step, i * step + 4, 0, 1, BACK) : 0;
      return (
        <div key={"ts" + i} style={{ position: "absolute", left: x + i * sw + 2, top: y,
          width: sw - 5, height: 24, zIndex: z, borderRadius: 3,
          background: on ? GREEN : "#2A3038", transform: `scaleY(${0.4 + pop * 0.6})`,
          transformOrigin: "50% 100%",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* ⭐ a passing test is a TICK, not a green rectangle */}
          {on && (
            <svg viewBox="0 0 24 24" width={sw * 0.42} height={sw * 0.42}>
              <path d="M5 13 L10 18 L19 6" stroke="#EAF7F0" strokeWidth="3.6"
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      );
    })}
  </>);
};

/** "updating dependencies" — pucks POP OUT and new ones drop in. */
export const DepPucks: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  step?: number; z?: number }> = ({ x, y, f, at, n = 5, step = 7, z = 56 }) => (<>
  <div style={{ position: "absolute", left: x - 8, top: y + 28, width: n * 46 + 16, height: 10, zIndex: z - 1,
    background: dkh(SLATE, 0.46), borderRadius: 3 }} />
  {Array.from({ length: n }, (_, i) => {
    const lf = f - at - i * step;
    const out = E(lf, 0, 5, 0, 1, IN_Q);            // the old one leaves
    const inn = E(lf, 5, 11, 0, 1, BACK);           // the new one drops in
    return (<React.Fragment key={"dp" + i}>
      {out < 0.98 && (
        <div style={{ position: "absolute", left: x + i * 104, top: y - out * 150,
          width: 84, height: 84, borderRadius: "50%", zIndex: z,
          background: OXIDE, border: `8px solid ${dkh(OXIDE, 0.3)}`, opacity: 1 - out * 0.9,
          transform: `rotate(${out * 200}deg)` }} />
      )}
      {inn > 0.02 && (
        <div style={{ position: "absolute", left: x + i * 104, top: y - (1 - inn) * 170,
          width: 84, height: 84, borderRadius: "50%", zIndex: z + 1,
          background: GREEN, border: `8px solid ${mxh(GREEN, 0.22)}` }}>
          {/* ⭐ a dependency puck is a COG, not a disc — six teeth and a hub */}
          {Array.from({ length: 6 }, (_, q) => (
            <div key={"th" + q} style={{ position: "absolute", left: 30, top: -7, width: 12, height: 82,
              background: mxh(GREEN, 0.10), borderRadius: 3,
              transform: `rotate(${q * 30}deg)`, transformOrigin: "50% 50%" }} />
          ))}
          <div style={{ position: "absolute", left: 22, top: 22, width: 24, height: 24, borderRadius: "50%", background: mxh(GREEN, 0.55) }} />
        </div>
      )}
    </React.Fragment>);
  })}
</>);

/* ---- BAY 12 · OPAL -------------------------------------------------------
   ⛔⛔ NOTHING IN THIS BAY IS A VIDEO EDITOR. No timeline, no scrubber, no
   filmstrip, no clip, no play head. See `R.opalMisspeak`. */

/** a node on the canvas: body, head bar, title rule, two ports, a status dot,
    a shadow = 7 elements. */
export const NodeBlock: React.FC<{ x: number; y: number; w?: number; h?: number; c?: string;
  lit?: number; z?: number; rot?: number; s?: number }> =
  ({ x, y, w: ww = 96, h: hh = 62, c = OVIO, lit = 0, z = 54, rot = 0, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww * s, height: hh * s, zIndex: z,
    transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%",
    background: "#241638", borderRadius: 8, border: `3px solid ${hexa(c, 0.45 + lit * 0.55)}`,
    boxShadow: SH_D }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 15,
      background: hexa(c, 0.28 + lit * 0.5), borderRadius: "5px 5px 0 0" }} />
    <div style={{ position: "absolute", left: 9, top: 24, width: ww * 0.52, height: 5,
      background: hexa("#E8D8FF", 0.5), borderRadius: 2 }} />
    <div style={{ position: "absolute", left: 9, top: 35, width: ww * 0.34, height: 4,
      background: hexa("#E8D8FF", 0.3), borderRadius: 2 }} />
    <div style={{ position: "absolute", left: -7, top: hh * 0.5 - 6, width: 12, height: 12,
      borderRadius: "50%", background: hexa(c, 0.6 + lit * 0.4) }} />
    <div style={{ position: "absolute", right: -7, top: hh * 0.5 - 6, width: 12, height: 12,
      borderRadius: "50%", background: hexa(c, 0.6 + lit * 0.4) }} />
    <div style={{ position: "absolute", right: 8, top: 4, width: 7, height: 7, borderRadius: "50%",
      background: lit > 0.6 ? GREEN : hexa("#E8D8FF", 0.3) }} />
  </div>
);

/** the canvas bed — the reel's only surface lit FROM BELOW. Draws its own grid
    and its own rim; do not add either. */
export const NodeCanvas: React.FC<{ x: number; y: number; w?: number; h?: number; f: number;
  lit?: number; z?: number }> = ({ x, y, w: ww = 700, h: hh = 340, f, lit = 1, z = 30 }) => {
  const L = Math.max(0, Math.min(1, lit));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: `linear-gradient(180deg, ${hexa("#2A1848", 0.96)} 0%, ${hexa("#150A26", 1)} 100%)`,
      borderRadius: 10, border: `4px solid ${dkh(OVIO, 0.45)}`, overflow: "hidden" }}>
      {/* ⭐ THE GRID MOVES. `feedback_when_the_subject_is_ui_build_the_ui`: a
          canvas needs a moving dot grid or it is a coloured rectangle. */}
      {Array.from({ length: 13 }, (_, c) => (
        <div key={"gv" + c} style={{ position: "absolute", left: ((c * 56 + f * 0.34) % ww), top: 0,
          width: 1, height: hh, background: hexa(OVIO, 0.10 + L * 0.10) }} />
      ))}
      {Array.from({ length: 7 }, (_, r) => (
        <div key={"gh" + r} style={{ position: "absolute", left: 0, top: r * 52 + 12,
          width: ww, height: 1, background: hexa(OVIO, 0.08 + L * 0.08) }} />
      ))}
      {/* the up-light off the bed */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: ww, height: hh * 0.6,
        background: `linear-gradient(0deg, ${hexa(OVIO, 0.22 * L)} 0%, ${hexa(OVIO, 0)} 100%)` }} />
    </div>
  );
};

/** a cable that draws itself between two ports. `k` 0..1 is how far it has run.
    ⭐ OVERLAPPING ACTION: the cable LEADS, its node lights when it arrives. */
export const Cable: React.FC<{ x1: number; y1: number; x2: number; y2: number; k: number;
  c?: string; z?: number; wdt?: number }> =
  ({ x1, y1, x2, y2, k, c = OVIO, z = 48, wdt = 5 }) => {
  const t = Math.max(0, Math.min(1, k));
  if (t <= 0.01) return null;
  const mx = (x1 + x2) / 2;
  const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  const len = Math.hypot(x2 - x1, y2 - y1) * 1.35;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: z,
      pointerEvents: "none", overflow: "visible" }}>
      <path d={d} fill="none" stroke={hexa(c, 0.92)} strokeWidth={wdt} strokeLinecap="round"
        strokeDasharray={len} strokeDashoffset={len * (1 - t)} />
    </svg>
  );
};

/** ⭐ THE PLAIN-ENGLISH STRIP. One large high-contrast object crossing the full
    frame and CONVERTING as it passes the intake lip — §11: an action is a
    DISTANCE. `k` 0..1 travels it; `conv` is where the conversion edge sits. */
export const EnglishStrip: React.FC<{ y: number; f: number; k: number; convX: number;
  text?: string; z?: number }> =
  ({ y, f, k, convX, text = "when a form comes in, sort it, then email me", z = 60 }) => {
  const t = Math.max(0, Math.min(1, k));
  const x = W + 120 - t * (W + 640);
  const sw = 560;
  return (<>
    {/* the paper half — real handwriting-weight text, ONE text element */}
    <div style={{ position: "absolute", left: x, top: y, width: sw, height: 74, zIndex: z,
      background: "#F4EFE2", borderRadius: 4, borderLeft: `6px solid ${dkh("#F4EFE2", 0.3)}`,
      clipPath: `inset(0 0 0 ${Math.max(0, convX - x)}px)`, boxShadow: SH,
      display: "flex", alignItems: "center", paddingLeft: 22 }}>
      <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 21, color: "#2A2419",
        whiteSpace: "nowrap" }}>{text}</span>
    </div>
    {/* the converted half — the same strip, already broken into node blocks */}
    <div style={{ position: "absolute", left: x, top: y - 6, width: sw, height: 86, zIndex: z,
      clipPath: `inset(0 ${Math.max(0, x + sw - convX)}px 0 0)` }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"cv" + i} style={{ position: "absolute", left: 14 + i * 108, top: 8 + Math.sin(f / 7 + i) * 3,
          width: 92, height: 66, background: "#241638", borderRadius: 7,
          border: `3px solid ${hexa(OVIO, 0.9)}` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 13,
            background: hexa(OVIO, 0.6), borderRadius: "4px 4px 0 0" }} />
          <div style={{ position: "absolute", left: 8, top: 22, width: 48, height: 5, background: hexa("#E8D8FF", 0.55), borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 8, top: 33, width: 30, height: 4, background: hexa("#E8D8FF", 0.32), borderRadius: 2 }} />
        </div>
      ))}
    </div>
    {/* the intake lip: the hard value break where the conversion happens */}
    <div style={{ position: "absolute", left: convX - 5, top: y - 34, width: 10, height: 140, zIndex: z + 2,
      background: `linear-gradient(180deg, ${hexa(OVIO, 0.2)} 0%, ${hexa(OVIO, 0.98)} 50%, ${hexa(OVIO, 0.2)} 100%)` }} />
  </>);
};

/** the mini app that boots and RUNS — real content arriving one row at a time,
    which §1 measures as worth more than any motion trick. */
export const MiniApp: React.FC<{ x: number; y: number; w?: number; h?: number; f: number;
  at: number; z?: number }> = ({ x, y, w: ww = 300, h: hh = 220, f, at, z = 70 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inS = E(lf, 0, 7, 0, 1, BACK);
  const rows = Math.max(0, Math.min(6, Math.floor((lf - 8) / 5)));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `scale(${inS})`, transformOrigin: "50% 100%",
      background: "#FAF8F3", borderRadius: 10, boxShadow: SH_D, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 30, background: "#E8E2D6" }} />
      {[0, 1, 2].map(i => (
        <div key={"tl" + i} style={{ position: "absolute", left: 12 + i * 15, top: 11, width: 9, height: 9,
          borderRadius: "50%", background: ["#D9584C", "#E0A93E", "#5AA85E"][i] }} />
      ))}
      <div style={{ position: "absolute", left: 16, top: 42, width: ww * 0.4, height: 9,
        background: "#2E2A22", borderRadius: 3 }} />
      {Array.from({ length: rows }, (_, i) => (
        <div key={"rw" + i} style={{ position: "absolute", left: 16, top: 64 + i * 24,
          width: ww - 32, height: 18, borderRadius: 4, background: i % 2 ? "#EFEADD" : "#E6E0D0",
          transform: `translateX(${E(f, at + 8 + i * 5, at + 12 + i * 5, -26, 0, OUT)}px)` }}>
          <div style={{ position: "absolute", left: 8, top: 6, width: 8, height: 8, borderRadius: "50%", background: GREEN }} />
          <div style={{ position: "absolute", left: 24, top: 7, width: (ww - 90) * (0.5 + rnd(i, 3) * 0.5), height: 5, background: "#7A7364", borderRadius: 2 }} />
        </div>
      ))}
    </div>
  );
};

/* ---- BAY 04 · MIXBOARD --------------------------------------------------- */

/** a scrap pinned to the board. `kind` makes them genuinely DIFFERENT —
    ⛔ "different images and text" must not be eight copies of one card. */
export const PinCard: React.FC<{ x: number; y: number; f: number; at: number; kind: number;
  s?: number; z?: number; rot?: number; real?: string }> =
  ({ x, y, f, at, kind, s = 1, z = 56, rot = 0, real }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inS = E(lf, 0, 6, 0, 1, BACK);
  const set = Math.sin(Math.max(0, lf - 6) / 3.4) * Math.exp(-Math.max(0, lf - 6) / 12) * 5;
  const ww = 120 * s, hh = 96 * s;
  const body = () => {
    /* ⭐ REAL PRODUCT OUTPUT. `real` is one of Google's own Mixboard sample
       images, pulled from gstatic.com/canvas/marketing — the exact pictures
       Google uses to show what the board makes. `feedback_real_product_footage`:
       real content is the biggest motion lever in the repo, and it is also the
       only version of this card that is TRUE. */
    if (real) return (<>
      <div style={{ position: "absolute", inset: 0, background: "#F6F2E6" }} />
      <Img src={staticFile(real)} style={{ position: "absolute", left: 5, top: 5,
        width: ww - 10, height: hh - 20, objectFit: "cover" }} />
    </>);
    if (kind % 4 === 0) return (<>            {/* a photograph */}
      <div style={{ position: "absolute", inset: 0, background: "#F6F2E6" }} />
      <div style={{ position: "absolute", left: 6, top: 6, right: 6, bottom: 20,
        background: `linear-gradient(150deg, ${SODIUM} 0%, ${OXIDE} 100%)` }} />
      <div style={{ position: "absolute", left: 18, top: 20, width: 22, height: 22, borderRadius: "50%", background: hexa("#FFF0C8", 0.9) }} />
      <div style={{ position: "absolute", left: 6, bottom: 20, right: 6, height: 22,
        background: dkh(OXIDE, 0.4), clipPath: "polygon(0 100%, 30% 40%, 55% 72%, 78% 30%, 100% 66%, 100% 100%)" }} />
    </>);
    if (kind % 4 === 1) return (<>            {/* a torn note */}
      <div style={{ position: "absolute", inset: 0, background: "#F2E9CC",
        clipPath: "polygon(0 0, 100% 0, 100% 88%, 82% 100%, 0 94%)" }} />
      {[0, 1, 2, 3].map(i => (
        <div key={"nl" + i} style={{ position: "absolute", left: 12, top: 18 + i * 15,
          width: ww * (0.62 - i * 0.08), height: 4, background: "#6A6048", borderRadius: 2 }} />
      ))}
    </>);
    if (kind % 4 === 2) return (<>            {/* a colour swatch strip */}
      <div style={{ position: "absolute", inset: 0, background: "#EFE8D6" }} />
      {[MAMBER, CLAY, GREEN, TEAL].map((c, i) => (
        <div key={"sw" + i} style={{ position: "absolute", left: 8 + i * (ww - 16) / 4, top: 10,
          width: (ww - 16) / 4 - 4, height: hh - 32, background: c }} />
      ))}
    </>);
    return (<>                                 {/* a sketch */}
      <div style={{ position: "absolute", inset: 0, background: "#F8F4E8" }} />
      <div style={{ position: "absolute", left: 14, top: 14, width: ww - 28, height: hh - 34,
        border: "3px solid #4A4030" }} />
      <div style={{ position: "absolute", left: 24, top: 30, width: ww - 60, height: 4, background: "#4A4030" }} />
      <div style={{ position: "absolute", left: 24, top: 44, width: ww - 74, height: 4, background: "#7A7058" }} />
      <div style={{ position: "absolute", left: 24, top: 58, width: 28, height: 18, background: "#4A4030" }} />
    </>);
  };
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `rotate(${rot + set}deg) scale(${inS})`, transformOrigin: "50% 0%", boxShadow: SH }}>
      {body()}
      {/* the pin — a real pin, drawn: head, shaft, shadow */}
      <div style={{ position: "absolute", left: ww / 2 - 7, top: -7, width: 14, height: 14,
        borderRadius: "50%", background: RED, zIndex: 4 }} />
      <div style={{ position: "absolute", left: ww / 2 - 2, top: 3, width: 4, height: 10,
        background: dkh(RED, 0.4), zIndex: 3 }} />
    </div>
  );
};

/** the whiteboard: a real board — tray, two chains, frame, face, and a centre
    frame the generated image resolves into. */
export const WhiteBoard: React.FC<{ x: number; y: number; w?: number; h?: number; drop?: number;
  f: number; z?: number }> = ({ x, y, w: ww = 720, h: hh = 400, drop = 1, f, z = 26 }) => {
  const d = Math.max(0, Math.min(1, drop));
  const yy = y - (1 - d) * 520;
  const swing = d > 0.9 ? Math.sin((d - 0.9) * 62) * Math.exp(-(d - 0.9) * 30) * 3.6 : 0;
  return (
    <div style={{ position: "absolute", left: x, top: yy, width: ww, height: hh, zIndex: z,
      transform: `rotate(${swing}deg)`, transformOrigin: "50% -18%" }}>
      {/* the two chains it hangs on, drawn as links */}
      {[0.16, 0.84].map((p, ci) => (
        <div key={"ch" + ci} style={{ position: "absolute", left: ww * p, top: -400, width: 7, height: 400 }}>
          {Array.from({ length: 22 }, (_, i) => (
            <div key={"lk" + i} style={{ position: "absolute", left: i % 2 ? 0 : 2, top: i * 18,
              width: 7, height: 15, borderRadius: 3, border: `2px solid ${dkh(STEEL, 0.3)}` }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, background: "#F7F4EC", borderRadius: 4 }} />
      <div style={{ position: "absolute", inset: 0, border: `12px solid ${dkh(BRASS, 0.24)}`, borderRadius: 4 }} />
      {/* the pen tray along the bottom, with two pens in it */}
      <div style={{ position: "absolute", left: 22, bottom: -16, width: ww - 44, height: 16,
        background: dkh(BRASS, 0.36), borderRadius: "0 0 5px 5px" }} />
      <div style={{ position: "absolute", left: 60, bottom: -12, width: 74, height: 8, borderRadius: 4, background: RED }} />
      <div style={{ position: "absolute", left: 146, bottom: -12, width: 74, height: 8, borderRadius: 4, background: SLATE }} />
    </div>
  );
};

/** the generated image, resolving in three hard steps. `bad` draws it as a
    near-miss of the right one, which is what makes the escalation read. */
export const GenFrame: React.FC<{ x: number; y: number; w?: number; h?: number; f: number;
  at: number; variant: number; resolve?: number; z?: number; real?: string }> =
  ({ x, y, w: ww = 250, h: hh = 190, f, at, variant, resolve = 1, z = 62, real }) => {
  const lf = f - at;
  if (lf < 0) return null;
  /* ⭐ THREE HARD STEPS, not a fade — §1: *smooth smears, stepped lands*. */
  const step = Math.min(3, Math.floor(lf / 4));
  const k = Math.max(0, Math.min(1, resolve)) * (step / 3);
  const hue = [SODIUM, CLAY, OXIDE, MAMBER][variant % 4];
  const hue2 = [OXIDE, EMBER, BRASS, GOLD][variant % 4];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: "#1E1810", border: `5px solid ${dkh(BRASS, 0.16)}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: k,
        background: `linear-gradient(${140 + variant * 26}deg, ${hue} 0%, ${hue2} 100%)` }} />
      {/* ⭐ the generated picture is a REAL Mixboard output, not a drawn stand-in */}
      {real && <Img src={staticFile(real)} style={{ position: "absolute", inset: 0,
        width: "100%", height: "100%", objectFit: "cover", opacity: k }} />}
      {/* the picture INSIDE it changes per variant, so three rejects are three
          different near-misses rather than the same card three times */}
      <div style={{ position: "absolute", left: ww * 0.16, top: hh * (0.20 + variant * 0.04),
        width: ww * (0.30 + variant * 0.05), height: ww * (0.30 + variant * 0.05),
        borderRadius: "50%", background: hexa("#FFF2D0", 0.62 * k) }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: ww, height: hh * (0.30 + variant * 0.07),
        background: hexa(dkh(hue2, 0.42), k),
        clipPath: ["polygon(0 100%, 26% 30%, 54% 70%, 80% 24%, 100% 62%, 100% 100%)",
                   "polygon(0 100%, 18% 52%, 46% 18%, 72% 60%, 100% 34%, 100% 100%)",
                   "polygon(0 100%, 34% 22%, 60% 62%, 86% 30%, 100% 70%, 100% 100%)",
                   "polygon(0 100%, 22% 40%, 50% 14%, 76% 52%, 100% 26%, 100% 100%)"][variant % 4] }} />
      {/* the resolve grain, only while it is still forming.
          ⛔ AND NEVER OVER A REAL PHOTO: it was designed to break up a drawn
          gradient, and on top of an actual Mixboard output it just reads as
          damage. A real image resolves by OPACITY alone. */}
      {step < 3 && !real && Array.from({ length: 20 }, (_, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: rnd(i + variant * 7, 2) * ww,
          top: rnd(i + variant * 7, 3) * hh, width: ww * 0.16, height: hh * 0.10,
          background: hexa("#0A0806", 0.5) }} />
      ))}
    </div>
  );
};

/* ---- BAY 09 · POMELLI ---------------------------------------------------- */

/** the press: bed, two cylinders that TURN, an inking roller, a feed board, a
    delivery ramp, four legs, two tie rods = 14 elements. */
export const Press: React.FC<{ x: number; y: number; w?: number; f: number; run?: number;
  seat?: number; z?: number }> = ({ x, y, w: ww = 620, f, run = 0, seat = 1, z = 34 }) => {
  const s = Math.max(0, Math.min(1, seat));
  const yy = y - (1 - s) * 430;
  const spin = f * run * 9;
  return (
    <div style={{ position: "absolute", left: x, top: yy, width: ww, height: 300, zIndex: z }}>
      <Contact x={18} y={286} w={ww - 36} z={-2} o={0.4} />
      {/* legs + tie rods */}
      {[0.06, 0.92].map((p, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: ww * p, top: 190, width: 34, height: 96,
          background: dkh(SLATE, 0.46) }} />
      ))}
      <div style={{ position: "absolute", left: ww * 0.08, top: 226, width: ww * 0.86, height: 9, background: dkh(SLATE, 0.56) }} />
      <div style={{ position: "absolute", left: ww * 0.08, top: 258, width: ww * 0.86, height: 7, background: dkh(SLATE, 0.62) }} />
      {/* the bed */}
      <div style={{ position: "absolute", left: 0, top: 150, width: ww, height: 46,
        background: `linear-gradient(180deg, ${SLATE} 0%, ${dkh(SLATE, 0.4)} 100%)`, borderRadius: 5 }} />
      {/* two cylinders that actually TURN — spokes, so the rotation READS */}
      {[0.24, 0.60].map((p, i) => (
        <div key={"cy" + i} style={{ position: "absolute", left: ww * p, top: 52, width: 128, height: 128,
          borderRadius: "50%", background: `linear-gradient(140deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.5)} 100%)`,
          border: `7px solid ${dkh(STEEL, 0.56)}`, transform: `rotate(${spin * (i ? -1 : 1)}deg)` }}>
          {[0, 1, 2, 3].map(k2 => (
            <div key={"sp" + k2} style={{ position: "absolute", left: 57, top: 6, width: 6, height: 102,
              background: dkh(STEEL, 0.62), transformOrigin: "50% 50%", transform: `rotate(${k2 * 45}deg)` }} />
          ))}
          <div style={{ position: "absolute", left: 48, top: 48, width: 24, height: 24, borderRadius: "50%", background: dkh(STEEL, 0.7) }} />
        </div>
      ))}
      {/* the inking roller between them */}
      <div style={{ position: "absolute", left: ww * 0.46, top: 96, width: 62, height: 62,
        borderRadius: "50%", background: PTEAL, border: `5px solid ${dkh(PTEAL, 0.4)}`,
        transform: `rotate(${-spin * 1.7}deg)` }}>
        <div style={{ position: "absolute", left: 26, top: 4, width: 5, height: 54, background: dkh(PTEAL, 0.5) }} />
      </div>
      {/* feed board (in) and delivery ramp (out) */}
      <div style={{ position: "absolute", left: -66, top: 118, width: 96, height: 12,
        background: dkh(BRASS, 0.3), transform: "rotate(-13deg)" }} />
      <div style={{ position: "absolute", left: ww - 26, top: 128, width: 108, height: 12,
        background: dkh(BRASS, 0.36), transform: "rotate(11deg)" }} />
    </div>
  );
};

/** the website page fed into the reader. Draws its OWN nav, hero, mark, swatch
    strip and type block — those are the three things S14 pulls back OUT. */
export const SitePage: React.FC<{ x: number; y: number; w?: number; h?: number; f: number;
  stripped?: number; z?: number; brandC?: string }> =
  ({ x, y, w: ww = 230, h: hh = 320, f, stripped = 0, z = 58, brandC = CLAY }) => {
  const st = Math.max(0, Math.min(1, stripped));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: "#FBF9F4", borderRadius: 5, boxShadow: SH, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 34, background: "#EFEADF" }} />
      {/* the MARK — lifts off at st>0.33 */}
      <div style={{ position: "absolute", left: 14, top: 9, width: 17, height: 17, borderRadius: 5,
        background: brandC, opacity: st > 0.33 ? 0 : 1 }} />
      {[0, 1, 2].map(i => (
        <div key={"nv" + i} style={{ position: "absolute", left: 46 + i * 40, top: 15, width: 30, height: 5,
          background: "#9A9386", borderRadius: 2 }} />
      ))}
      <div style={{ position: "absolute", left: 16, top: 52, width: ww - 32, height: 96,
        background: `linear-gradient(140deg, ${brandC} 0%, ${dkh(brandC, 0.34)} 100%)`, borderRadius: 4,
        opacity: st > 0.66 ? 0.18 : 1 }} />
      {/* the TYPE — punches out at st>0.66 */}
      <div style={{ position: "absolute", left: 16, top: 162, width: ww * 0.62, height: 13,
        background: "#2A2419", borderRadius: 2, opacity: st > 0.66 ? 0 : 1 }} />
      <div style={{ position: "absolute", left: 16, top: 182, width: ww * 0.44, height: 9,
        background: "#5A5346", borderRadius: 2, opacity: st > 0.66 ? 0 : 1 }} />
      {/* the COLOURS — slide out at st>0.5 */}
      {[brandC, dkh(brandC, 0.3), GREEN, TEAL].map((c, i) => (
        <div key={"cs" + i} style={{ position: "absolute", left: 16 + i * 34, top: 208, width: 28, height: 28,
          borderRadius: 4, background: c, opacity: st > 0.5 ? 0 : 1 }} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: 16, top: 252 + i * 12,
          width: (ww - 32) * (0.9 - i * 0.11), height: 5, background: "#B4AC9C", borderRadius: 2 }} />
      ))}
    </div>
  );
};

/** ⭐⭐ "MATCH YOUR BRAND", DEPICTED. Every sheet the press throws carries the
    SAME mark, the SAME swatches and the SAME type that were pulled off the site
    in S14 — so the viewer watches the match happen rather than being told it. */
export const AdSheet: React.FC<{ x: number; y: number; f: number; at: number; i: number;
  brandC: string; s?: number; z?: number }> =
  ({ x, y, f, at, i, brandC, s = 1, z = 64 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  /* ⛔ LIN — these cross the cut into S16 (§23). */
  const k = E(lf, 0, 34, 0, 1, LIN);
  const ww = 132 * s, hh = 168 * s;
  const px = x + k * (330 + rnd(i, 2) * 130);
  const py = y - Math.sin(k * Math.PI) * (150 + rnd(i, 3) * 60) + k * k * 200;
  const rot = (rnd(i, 4) - 0.5) * 40 + k * 190 * (rnd(i, 5) - 0.5);
  if (k >= 1) return null;
  return (
    <div style={{ position: "absolute", left: px, top: py, width: ww, height: hh, zIndex: z,
      transform: `rotate(${rot}deg)`, background: "#FAF7F0", borderRadius: 3, boxShadow: SH }}>
      <div style={{ position: "absolute", left: 8 * s, top: 8 * s, width: 15 * s, height: 15 * s,
        borderRadius: 4, background: brandC }} />
      <div style={{ position: "absolute", left: 8 * s, top: 32 * s, width: ww - 16 * s, height: 62 * s,
        background: `linear-gradient(140deg, ${brandC} 0%, ${dkh(brandC, 0.34)} 100%)`, borderRadius: 3 }} />
      <div style={{ position: "absolute", left: 8 * s, top: 102 * s, width: (ww - 16 * s) * 0.74, height: 9 * s,
        background: "#2A2419", borderRadius: 2 }} />
      <div style={{ position: "absolute", left: 8 * s, top: 117 * s, width: (ww - 16 * s) * 0.5, height: 6 * s,
        background: "#6A6254", borderRadius: 2 }} />
      {[brandC, dkh(brandC, 0.3), GREEN].map((c, ci) => (
        <div key={"as" + ci} style={{ position: "absolute", left: (8 + ci * 16) * s, top: 136 * s,
          width: 12 * s, height: 12 * s, borderRadius: 3, background: c }} />
      ))}
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ A REAL PULL REQUEST CARD — 14 drawn parts.

   Alex: *"each of the animations afterwards needs to be so much more
   interesting, like not just squares and rectangles boring stuff."* This is
   reel 119's note word for word — *"TOO RECTANGLE BASED IS A DRAWING BUDGET.
   Every carried load was a coloured rect with two stripes"* — and the card is
   the most-seen prop in this reel: it fills the Jules rack, flies through
   BACKLOG, streams to the tray in JOBS. It was a rounded rect with a left
   border and two grey bars.

   Drawn now, as the thing it actually is:
     1 the card       2 the status rail     3 the branch glyph (two nodes + a
     curve, the merge mark everyone knows)  4 the avatar     5 the title bar
     6 the repo line  7 the diff bar        8 green added blocks
     9 red removed blocks                  10 the check tick   11 the tick disc
    12 the review pip 13 the corner fold    14 the contact shadow
   ⛔ `feedback_props_need_real_drawing`: the house bar is 12-16 parts on a hero
   prop, and a primitive with a label on it is a CONTAINER whatever it does.
   ======================================================================== */
export const PRCard: React.FC<{ x: number; y: number; w?: number; f: number;
  state?: "open" | "merged"; i?: number; z?: number; rot?: number; s?: number }> =
  ({ x, y, w: ww = 196, f, state = "open", i = 0, z = 60, rot = 0, s = 1 }) => {
  const h = ww * 0.34;
  const merged = state === "merged";
  const rail = merged ? "#7C5CD6" : GREEN;
  const add = 3 + Math.floor(rnd(i, 2) * 5), del = 1 + Math.floor(rnd(i, 3) * 3);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: h, zIndex: z,
      transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%" }}>
      {/* 14 · the contact shadow, so it is an object and not a decal */}
      <div style={{ position: "absolute", left: ww * 0.06, top: h * 0.94, width: ww * 0.88,
        height: h * 0.16, borderRadius: "50%", background: hexa("#0A0E14", 0.22), filter: "blur(4px)" }} />
      {/* 1 · the card */}
      <div style={{ position: "absolute", inset: 0, borderRadius: ww * 0.035,
        background: `linear-gradient(168deg, #FBF8F0 0%, #E9E3D4 100%)`,
        border: `${Math.max(1, ww * 0.008)}px solid #CFC7B4` }} />
      {/* 13 · a folded corner */}
      <div style={{ position: "absolute", right: 0, top: 0, width: ww * 0.10, height: ww * 0.10,
        background: "#D8D0BE", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
      {/* 2 · the status rail */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww * 0.035, height: "100%",
        borderRadius: `${ww * 0.035}px 0 0 ${ww * 0.035}px`, background: rail }} />
      {/* 3 · THE BRANCH GLYPH — two nodes and a curve, the mark everyone knows */}
      <svg viewBox="0 0 24 24" width={ww * 0.13} height={ww * 0.13}
        style={{ position: "absolute", left: ww * 0.075, top: h * 0.16 }}>
        <circle cx="6" cy="5" r="2.6" fill={rail} />
        <circle cx="6" cy="19" r="2.6" fill={rail} />
        <circle cx="18" cy="12" r="2.6" fill={rail} />
        <path d="M6 7.6 V16.4" stroke={rail} strokeWidth="2" fill="none" />
        <path d="M6 12 H12 C15 12 15 12 15.6 12" stroke={rail} strokeWidth="2" fill="none" />
      </svg>
      {/* 4 · the avatar */}
      <div style={{ position: "absolute", right: ww * 0.06, top: h * 0.14,
        width: ww * 0.11, height: ww * 0.11, borderRadius: "50%",
        background: `linear-gradient(150deg, ${CLAY} 0%, ${OXIDE} 100%)`,
        border: `${Math.max(1, ww * 0.008)}px solid #FBF8F0` }} />
      {/* 5 · the title, 6 · the repo line — bars, never type */}
      <div style={{ position: "absolute", left: ww * 0.23, top: h * 0.20,
        width: ww * (0.34 + rnd(i, 4) * 0.20), height: h * 0.115,
        borderRadius: h * 0.05, background: "#3E382C" }} />
      <div style={{ position: "absolute", left: ww * 0.23, top: h * 0.40,
        width: ww * (0.22 + rnd(i, 5) * 0.14), height: h * 0.075,
        borderRadius: h * 0.04, background: "#9A9280" }} />
      {/* 7-9 · THE DIFF — added and removed as countable blocks, no numerals */}
      <div style={{ position: "absolute", left: ww * 0.075, bottom: h * 0.13,
        display: "flex", gap: ww * 0.012 }}>
        {Array.from({ length: add }, (_, j) => (
          <div key={"a" + j} style={{ width: ww * 0.028, height: h * 0.13,
            borderRadius: 1, background: "#3F9E74" }} />
        ))}
        {Array.from({ length: del }, (_, j) => (
          <div key={"d" + j} style={{ width: ww * 0.028, height: h * 0.13,
            borderRadius: 1, background: "#C4523E" }} />
        ))}
      </div>
      {/* 10-11 · the check, only once it is merged */}
      {merged && (
        <div style={{ position: "absolute", right: ww * 0.07, bottom: h * 0.10,
          width: ww * 0.115, height: ww * 0.115, borderRadius: "50%", background: rail,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 24 24" width={ww * 0.075} height={ww * 0.075}>
            <path d="M5 13 L10 18 L19 6" stroke="#FFFFFF" strokeWidth="3.4"
              fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {/* 12 · the review pip, blinking on its own clock */}
      {!merged && (
        <div style={{ position: "absolute", right: ww * 0.09, bottom: h * 0.14,
          width: ww * 0.05, height: ww * 0.05, borderRadius: "50%",
          background: hexa(GOLD, 0.45 + 0.55 * Math.abs(Math.sin(f / 11 + i))) }} />
      )}
    </div>
  );
};
