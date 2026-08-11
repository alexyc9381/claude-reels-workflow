import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  GOLD, RED, GREEN, PAPER, INK, CLAY, TOK, TOKD, TOKL, BRASS, BRASSD, BRASSL,
  WOOD, WOODD, WOODL, Contact, Token, PROVIDERS,
} from "./RepWorld";

/* ===========================================================================
   REEL 99 "REPO" · THE PROP LIBRARY.

   ⛔ EVERY PROP IN HERE IS A TOKEN, A LOGO, A COUNTER OR A NUMBER. That is the
      whole brief after two rejected worlds: nothing that has to be translated.
   ⛔ SOLID PAINTS ONLY, no `0 0 Npx <colour>` glow.
   ⛔ EVERY TRANSFORMED WRAPPER CARRIES AN EXPLICIT zIndex.
   ========================================================================= */

/* =========================================================================
   THE COUNTER — the simple, straightforward way to say 800 million.
   It is an odometer. It shows the number. There is nothing to decode.
   ====================================================================== */
export const Counter: React.FC<{ x: number; y: number; v: number; s?: number;
  z?: number; label?: string; digits?: number; roll?: boolean }> =
  ({ x, y, v, s = 1, z = 90, label = "FREE TOKENS / MONTH", digits = 9,
     roll = true }) => {
  const str = Math.max(0, Math.floor(v)).toString().padStart(digits, "0");
  const DW = 62 * s, DH = 92 * s, GAP = 5 * s;
  /* group into thousands so the commas land where a reader expects them */
  const cells: { c: string; comma: boolean }[] = [];
  for (let i = 0; i < str.length; i++) {
    const fromEnd = str.length - i - 1;
    cells.push({ c: str[i], comma: fromEnd > 0 && fromEnd % 3 === 0 });
  }
  const totalW = cells.length * (DW + GAP) + cells.filter((c) => c.comma).length * 20 * s;
  let cx = x - totalW / 2;
  const out: React.ReactNode[] = [];
  cells.forEach((cell, i) => {
    const d = parseInt(cell.c, 10);
    out.push(
      <div key={"dg" + i} style={{ position: "absolute", left: cx, top: y, width: DW,
        height: DH, borderRadius: 7 * s, background: "#241F19", overflow: "hidden",
        zIndex: z, boxShadow: SH, border: `${3 * s}px solid ${BRASSD}`,
        boxSizing: "border-box" }}>
        {/* ⭐ AN ODOMETER ROLLS. The digit strip is translated by the digit
            value and clipped, so a changing number physically SPINS instead of
            swapping — which is what makes a big number feel like it is being
            counted rather than merely displayed. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0,
          transform: `translateY(${-d * DH}px)` }}>
          {Array.from({ length: 10 }, (_, k) => (
            <div key={"dv" + k} style={{ width: "100%", height: DH, display: "flex",
              alignItems: "center", justifyContent: "center", fontFamily: MONO,
              fontWeight: 900, fontSize: 60 * s, color: "#F6E9CC" }}>{k}</div>
          ))}
        </div>
        {/* the drum seam */}
        <div style={{ position: "absolute", left: 0, right: 0, top: DH / 2 - 1, height: 2,
          background: "#0E0C09", opacity: 0.5, zIndex: 2 }} />
      </div>
    );
    cx += DW + GAP;
    if (cell.comma) {
      out.push(
        <div key={"cm" + i} style={{ position: "absolute", left: cx - 2 * s,
          top: y + DH - 26 * s, width: 20 * s, textAlign: "center", zIndex: z,
          fontFamily: MONO, fontWeight: 900, fontSize: 46 * s,
          color: "#8E7A50" }}>,</div>
      );
      cx += 20 * s;
    }
  });
  return (<>
    {out}
    {/* ⛔ THE LABEL GOES ABOVE THE DIGITS. Under them it was buried by the pile
        the moment the pile did its job, and #4A4032 on wood was unreadable
        anyway. Above, in cream with a drop shadow, it survives both. */}
    {label && (
      <div style={{ position: "absolute", left: 0, right: 0, top: y - 38 * s,
        textAlign: "center", zIndex: z, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 27 * s, letterSpacing: "0.14em", color: "#F7EFDC",
        textShadow: "0 3px 9px rgba(0,0,0,0.55)" }}>{label}</div>
    )}
  </>);
};

/* =========================================================================
   THE PILE — what 800 million actually looks like. A mound of tokens whose
   HEIGHT is the number, so the comparison in S1 needs no words.
   ====================================================================== */
export const Pile: React.FC<{ x: number; base: number; n: number; s?: number;
  z?: number; w?: number; seed?: number; logos?: number[]; dim?: number }> =
  ({ x, base, n, s = 1, z = 60, w: ww = 520, seed = 3, logos = [], dim = 0 }) => {
  const TS = 54 * s;
  /* ⛔ A HEAP HAS TO GO UP. sqrt(n*1.4) spread 126 tokens over 13 shallow rows
     and read as a carpet; sqrt(n*3.4) gives it height, which is what makes the
     comparison in the frame a RANK rather than two widths. */
  const rows = Math.max(1, Math.ceil(Math.sqrt(n * 3.4)));
  const out: React.ReactNode[] = [];
  let placed = 0;
  for (let r = 0; r < rows && placed < n; r++) {
    /* a mound: each row up is narrower, so the silhouette is a heap */
    const k = r / rows;
    const rowW = ww * (1 - k * 0.86) * s;
    const per = Math.max(1, Math.round(rowW / (TS * 0.62)));
    for (let i = 0; i < per && placed < n; i++, placed++) {
      const jx = (rnd(seed + r * 13 + i, 3) - 0.5) * TS * 0.34;
      const px = x - rowW / 2 + (per === 1 ? rowW / 2 : (i * rowW) / (per - 1)) + jx;
      const py = base - r * TS * 0.46 - TS / 2;
      const li = logos.indexOf(placed);
      out.push(
        <Token key={"pt" + r + "_" + i} x={px} y={py} s={TS}
          z={z + r * 2 + (i % 2)} rot={(rnd(seed + r * 7 + i, 5) - 0.5) * 26}
          plain={li < 0}
          markKey={li >= 0 ? PROVIDERS[li % PROVIDERS.length].k : undefined}
          name={li >= 0 ? PROVIDERS[li % PROVIDERS.length].n : undefined}
          hasMark={li >= 0 ? PROVIDERS[li % PROVIDERS.length].mark : undefined}
          dim={dim} />
      );
    }
  }
  return (<>
    <Contact x={x - ww * s * 0.56} y={base - 10 * s} w={ww * s * 1.12} z={z - 2} o={0.4} />
    {out}
  </>);
};

/** tokens falling from a chute mouth to a landing line. */
export const Fall: React.FC<{ x: number; y: number; len: number; f: number; n?: number;
  s?: number; z?: number; spread?: number; on?: number }> =
  ({ x, y, len, f, n = 9, s = 1, z = 70, spread = 90, on = 1 }) => {
  if (on <= 0.01) return null;
  return (<>
    {Array.from({ length: Math.round(n * on) }, (_, i) => {
      const ph = ((f * 0.055 + rnd(i, 9)) % 1);
      const ty = y + ph * ph * len;
      const tx = x + (rnd(i, 11) - 0.5) * spread * s;
      return <Token key={"fl" + i} x={tx} y={ty} s={40 * s} z={z + i}
        rot={ph * 300 + i * 40} plain />;
    })}
  </>);
};

/* =========================================================================
   THE CHUTE — one provider. Its LOGO is the front of it, at 96-170px, which
   is the whole reason this shape was chosen.
   ====================================================================== */
export const Chute: React.FC<{ x: number; y: number; w?: number; z?: number; f?: number;
  markKey?: string; name: string; hasMark?: boolean; open?: number; dead?: number;
  s?: number }> =
  ({ x, y, w: ww = 190, z = 40, f = 0, markKey, name, hasMark, open = 0, dead = 0,
     s = 1 }) => {
  const bh = ww * 0.86, mouth = ww * 0.44;
  return (<>
    {/* the hopper body — a trapezoid, so it reads as something that POURS */}
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: bh,
      zIndex: z, background: dead > 0.5 ? "#8E8478" : BRASS, boxShadow: SH_D,
      clipPath: `polygon(0 0, 100% 0, ${50 + (mouth / ww) * 50}% 100%, ${50 - (mouth / ww) * 50}% 100%)` }} />
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: 12 * s,
      background: dead > 0.5 ? "#A79C8D" : BRASSL, zIndex: z + 1 }} />
    {/* the logo plate — the front face, and the biggest thing on the prop */}
    <div style={{ position: "absolute", left: x - ww * 0.34, top: y + bh * 0.10,
      width: ww * 0.68, height: ww * 0.44, borderRadius: 10, background: "#FBF8F1",
      border: `4px solid ${BRASSD}`, boxSizing: "border-box", zIndex: z + 4,
      boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, opacity: dead > 0.5 ? 0.5 : 1 }}>
      {hasMark && markKey
        ? <Img src={staticFile(`logos/${markKey}.svg`)}
            style={{ width: ww * 0.26, height: ww * 0.26, objectFit: "contain" }} />
        : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: ww * (name.length > 8 ? 0.105 : 0.15), lineHeight: 1,
            color: "#241F17", textAlign: "center", padding: "0 4px" }}>{name}</span>}
    </div>
    {hasMark && (
      <div style={{ position: "absolute", left: x - ww * 0.34, top: y + bh * 0.58,
        width: ww * 0.68, textAlign: "center", zIndex: z + 5, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: ww * 0.082, letterSpacing: "0.04em",
        color: "#5C4A22", opacity: dead > 0.5 ? 0.5 : 1 }}>{name}</div>
    )}
    {/* the gate at the mouth — it slides open, and that IS the flow starting */}
    <div style={{ position: "absolute", left: x - mouth / 2, top: y + bh - 6,
      width: mouth, height: 22 * s, borderRadius: 4, background: BRASSD, zIndex: z + 6,
      transform: `translateY(${open * 20 * s}px) scaleY(${1 - open * 0.8})`,
      transformOrigin: "50% 0%" }} />
  </>);
};

/** the red 429 flag that drops over a dead chute. The rate limit, NAMED — the
    only label the mechanism needs. */
export const Flag429: React.FC<{ x: number; y: number; s?: number; z?: number; t: number }> =
  ({ x, y, s = 1, z = 96, t }) => {
  if (t <= 0.01) return null;
  return (
    <div style={{ position: "absolute", left: x - 108 * s, top: y - (1 - t) * 120 * s,
      zIndex: z, opacity: t, transform: `rotate(${-4 + (1 - t) * 16}deg)`,
      transformOrigin: "50% 0%" }}>
      <div style={{ width: 216 * s, height: 96 * s, borderRadius: 10 * s, background: RED,
        border: `${5 * s}px solid #8E3227`, boxSizing: "border-box", boxShadow: SH_D,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12 * s }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60 * s,
          lineHeight: 1, color: "#FBEDE9" }}>429</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s,
          letterSpacing: "0.04em", color: "#F6D8D2", textAlign: "left" }}>RATE<br />LIMIT</span>
      </div>
    </div>
  );
};

/* =========================================================================
   THE VILLAIN — a change machine. You put money in, one provider's tokens
   come out, and the price goes up. Nothing here needs translating either.
   ====================================================================== */
export const Machine: React.FC<{ x: number; base: number; s?: number; z?: number; f?: number;
  price?: string; markKey?: string; name?: string; hasMark?: boolean; out?: number }> =
  ({ x, base, s = 1, z = 50, f = 0, price = "$0", markKey, name, hasMark, out = 0 }) => {
  const bw = 360 * s, bh = 420 * s;
  return (<>
    <Contact x={x - bw * 0.55} y={base - 6} w={bw * 1.1} z={z - 1} o={0.44} />
    <div style={{ position: "absolute", left: x - bw / 2, top: base - bh, width: bw,
      height: bh, borderRadius: 12, background: "#59636B", zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - bw / 2, top: base - bh, width: bw * 0.2,
      height: bh, borderRadius: "12px 0 0 12px", background: "#6B757D", zIndex: z + 1 }} />
    {/* the price, big */}
    <div style={{ position: "absolute", left: x - bw * 0.40, top: base - bh + 30 * s,
      width: bw * 0.80, height: 126 * s, borderRadius: 9, background: "#241F19",
      border: `${5 * s}px solid #7E8890`, boxSizing: "border-box", zIndex: z + 4,
      boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 78 * s,
        letterSpacing: "-0.02em", color: "#E8DCBA" }}>{price}</span>
    </div>
    <div style={{ position: "absolute", left: x - bw * 0.40, top: base - bh + 168 * s,
      width: bw * 0.80, textAlign: "center", zIndex: z + 5, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 24 * s, letterSpacing: "0.08em",
      color: "#C3CBD1" }}>PER MONTH · 1 PROVIDER</div>
    {/* the one provider you are buying */}
    {name && (
      <div style={{ position: "absolute", left: x - bw * 0.26, top: base - bh + 208 * s,
        width: bw * 0.52, height: bw * 0.34, borderRadius: 10, background: "#FBF8F1",
        border: `4px solid #7E8890`, boxSizing: "border-box", zIndex: z + 6, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {hasMark && markKey
          ? <Img src={staticFile(`logos/${markKey}.svg`)}
              style={{ width: bw * 0.19, height: bw * 0.19, objectFit: "contain" }} />
          : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
              fontSize: bw * 0.075, color: "#241F17" }}>{name}</span>}
      </div>
    )}
    {/* the tray, and the pitiful handful it gives back */}
    <div style={{ position: "absolute", left: x - bw * 0.30, top: base - 96 * s,
      width: bw * 0.60, height: 62 * s, borderRadius: 8, background: "#2E363C",
      zIndex: z + 4 }} />
    {out > 0.02 && [0, 1, 2].map((i) => (
      <Token key={"mt" + i} x={x - 52 * s + i * 52 * s} y={base - 74 * s}
        s={46 * s} z={z + 8 + i} rot={i * 24 - 20} plain />
    ))}
  </>);
};

/** THE CLAUDE SPRITE.
    ⛔⛔ v3 SHIPPED WITH ZERO MASCOTS IN IT and Alex's note was *"there arent
       claude sprites to make the scenes interesting"*. The house chassis is
       built around the clay Claude Mascot; a reel of objects with nobody in it
       has no scale reference, nobody to react, and nothing for the eye to
       follow. He is now in EVERY scene.
    ⛔ THE COSTUME IS UNCONDITIONAL — a bare box Mascot reads as having two
       pairs of legs (reel 98). `glasses` is the counting-house clerk.
    `hold` puts a token in his hands at arm height, which is how a logo gets to
    be 190px AND belong to somebody. */
export const Claude: React.FC<{ x: number; base: number; s?: number; z?: number; f: number;
  cheer?: number; shock?: number; stern?: number; gaze?: number; hold?: number;
  holdKey?: string; holdName?: string; holdMark?: boolean; holdClaude?: boolean }> =
  ({ x, base, s = 1, z = 70, f, cheer = 0, shock = 0, stern = 0, gaze = 0,
     hold = 0, holdKey, holdName, holdMark, holdClaude }) => {
  const SZ = 240 * s;
  return (<>
    <Contact x={x - SZ * 0.32} y={base - 8 * s} w={SZ * 0.64} z={z - 2} o={0.38} />
    <div style={{ position: "absolute", left: x - SZ / 2, top: base - SZ, zIndex: z }}>
      <Mascot lf={f} size={SZ} glasses={1} gaze={gaze} cheer={cheer} shock={shock}
        stern={stern} nodAmp={stern ? 1.6 : 3.0} nodSpeed={11} />
    </div>
    {/* the arm that reaches for what he is holding — proximity is not
        connection, so the span gets drawn (reel 81's chain) */}
    {hold > 0 && (
      <div style={{ position: "absolute", left: x + SZ * 0.30, top: base - SZ * 0.62,
        width: SZ * 0.34, height: SZ * 0.10, borderRadius: SZ * 0.05,
        background: "#D97757", zIndex: z + 1, boxShadow: SH }} />
    )}
    {hold > 0 && (
      <Token x={x + SZ * 0.74} y={base - SZ * 0.60} s={hold} z={z + 4}
        markKey={holdKey} name={holdName} hasMark={holdMark} claude={holdClaude}
        rot={-6} />
    )}
  </>);
};

/** a queueing silhouette, for the change-machine line. */
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

/** a labelled stack of tokens — the S1 comparison, at TRUE relative scale. */
export const Stack: React.FC<{ x: number; base: number; n: number; s?: number; z?: number;
  label: string; sub?: string; seed?: number }> =
  ({ x, base, n, s = 1, z = 60, label, sub, seed = 1 }) => {
  const TS = 62 * s, STEP = TS * 0.22;
  return (<>
    <Contact x={x - TS * 0.62} y={base - 8 * s} w={TS * 1.24} z={z - 1} o={0.38} />
    {Array.from({ length: n }, (_, i) => (
      <Token key={"sk" + i} x={x + (rnd(seed + i, 3) - 0.5) * 7} y={base - TS / 2 - i * STEP}
        s={TS} z={z + i} plain rot={(rnd(seed + i, 4) - 0.5) * 8} />
    ))}
    {/* ⛔ THE LABEL GOES ABOVE THE STACK. Below the base it fell off the bottom
        of the panel on any stack standing on the floor line. */}
    <div style={{ position: "absolute", left: x - 150 * s, top: base - TS - n * STEP - 92 * s,
      width: 300 * s, textAlign: "center", zIndex: z + n + 4 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46 * s,
        lineHeight: 1.04, color: "#F6EEDC",
        textShadow: "0 3px 10px rgba(0,0,0,0.5)" }}>{label}</div>
      {sub && <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s,
        letterSpacing: "0.10em", color: "#E2D6BC", marginTop: 3 * s,
        textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{sub}</div>}
    </div>
  </>);
};

/** the sealed cap on the main chute — frame 0's settled state, and the thing
    that blows off at f12. */
export const Cap: React.FC<{ x: number; y: number; w?: number; z?: number; t: number }> =
  ({ x, y, w: ww = 240, z = 80, t }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - t * 260,
    width: ww, height: 62, zIndex: z, opacity: 1 - t * 0.9,
    transform: `rotate(${t * 46}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: "#B9AD93",
      border: `5px solid #8E836C`, boxSizing: "border-box", boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: ww / 2 - 26, top: 8, width: 52, height: 46,
      borderRadius: 11, background: "#FFFFFF", border: "3px solid #E8DCC0",
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: 34, height: 34, objectFit: "contain" }} />
    </div>
  </div>
);

/* ===========================================================================
   ⛔⛔ THREE NEW STRUCTURES, because *"too many scenes where its just coins
      piling."* v4 leaned on a mound in five of its shots. The token language is
      right; repeating one ARRANGEMENT of it is what made the middle flat.

      A pile is a HEAP — good for scale, useless for anything else. These give
      the reel three more shapes to think in: a LINE (things travelling), a
      CONVERGENCE (many becoming one), and a LIST (an itemised total). Each is
      still nothing but tokens, logos and numbers.
   ========================================================================= */

/** THE BELT — tokens travelling past camera, each struck with a provider mark.
    Horizontal motion where a pile has none, and a belt that never stops is how
    S5 shows "no pause" without a single word. */
export const Belt: React.FC<{ y: number; f: number; z?: number; s?: number;
  speed?: number; n?: number; from?: number; on?: number }> =
  ({ y, f, z = 50, s = 1, speed = 3.4, n = 7, from = 0, on = 1 }) => {
  const BH = 54 * s, SP = (W + 300) / n;
  return (<>
    {/* the bed */}
    <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: BH,
      background: "#4A4038", zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: 9 * s,
      background: "#6B5E50", zIndex: z + 1 }} />
    {/* the rollers, turning — the belt is MOVING even between tokens */}
    {Array.from({ length: 13 }, (_, i) => (
      <div key={"rl" + i} style={{ position: "absolute", left: -30 + i * 86 * s,
        top: y + BH - 16 * s, width: 34 * s, height: 34 * s, borderRadius: "50%",
        background: "#2E2820", zIndex: z + 2 }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * s,
          height: 15 * s, background: "#6B5E50", transformOrigin: "50% 0%",
          transform: `translate(-50%,-50%) rotate(${f * speed * 3}deg)` }} />
      </div>
    ))}
    {/* the goods */}
    {Array.from({ length: n }, (_, i) => {
      const pr = PROVIDERS[(from + i) % PROVIDERS.length];
      const x = ((i * SP + f * speed * on) % (W + 300)) - 150;
      return <Token key={"bt" + i} x={x} y={y - 4 * s} s={116 * s} z={z + 6 + i}
        markKey={pr.k} name={pr.n} hasMark={pr.mark} rot={0} />;
    })}
  </>);
};

/** THE JUNCTION — many labelled inlets into ONE outlet. The convergence drawn
    as plumbing you can trace with a finger, which a heap can never show. */
export const Junction: React.FC<{ x: number; y: number; f: number; n?: number;
  z?: number; s?: number; w?: number; on?: number }> =
  ({ x, y, f, n = 5, z = 40, s = 1, w: ww = 800, on = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const k = n === 1 ? 0.5 : i / (n - 1);
      const px = x - ww / 2 + k * ww;
      const pr = PROVIDERS[i % PROVIDERS.length];
      const drop = 150 * s;
      return (<React.Fragment key={"jn" + i}>
        {/* the logo, at the head of its own line */}
        <Token x={px} y={y - drop - 92 * s} s={150 * s} z={z + 20 + i}
          markKey={pr.k} name={pr.n} hasMark={pr.mark} />
        {/* the line down, and the elbow into the header */}
        <div style={{ position: "absolute", left: px - 15 * s, top: y - drop,
          width: 30 * s, height: drop, background: on > 0.5 ? "#C8963E" : "#8E8478",
          zIndex: z + 2 + i, borderRadius: 5 }} />
        <div style={{ position: "absolute", left: px - 15 * s, top: y - drop,
          width: 10 * s, height: drop, background: BRASSL, opacity: 0.6,
          zIndex: z + 3 + i }} />
        {on > 0.5 && (
          <div style={{ position: "absolute", left: px - 15 * s,
            top: y - drop + ((f * 7 + i * 33) % drop), width: 30 * s, height: 26 * s,
            borderRadius: 5, background: TOKL, opacity: 0.75, zIndex: z + 4 + i }} />
        )}
      </React.Fragment>);
    })}
    {/* the header they all land in, and the one pipe out */}
    <div style={{ position: "absolute", left: x - ww / 2 - 40 * s, top: y,
      width: ww + 80 * s, height: 46 * s, borderRadius: 9, background: "#5E5449",
      zIndex: z + 40, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - ww / 2 - 40 * s, top: y,
      width: ww + 80 * s, height: 11 * s, borderRadius: "9px 9px 0 0",
      background: "#7E7264", zIndex: z + 41 }} />
    <div style={{ position: "absolute", left: x - 34 * s, top: y + 40 * s, width: 68 * s,
      height: 96 * s, background: "#5E5449", zIndex: z + 40 }} />
  </>);

/** THE LEDGER — the itemised total, on a printed roll. A LIST is the one shape
    that can carry twenty-nine of something plus its arithmetic, and it is the
    most literal object in the reel: names, amounts, a rule, a total. */
export const Ledger: React.FC<{ x: number; y: number; f: number; rows?: number;
  s?: number; z?: number; reveal?: number; total?: string; sub?: string }> =
  ({ x, y, f, rows = 5, s = 1, z = 60, reveal = 1, total = "4,000,000,000",
     sub = "29 PROVIDERS · 358 ENDPOINTS" }) => {
  const RW = 620 * s, RH = 74 * s;
  const shown = Math.round(rows * Math.min(1, reveal));
  /* ⛔⛔ NO PER-PROVIDER FIGURES. v1 of this prop printed 120,000,000 /
     84,000,000 / 60,000,000 against Google / Mistral / Cloudflare and every one
     of those was INVENTED — the README publishes a POOLED ~4B and nothing per
     provider (the per-model limits live at freellmapi.co/models). A list is
     exactly the shape that tempts you to fill a column, and a made-up number on
     a receipt-looking object is the most believable kind of wrong.
     The rows carry what is true — that each one HAS a free tier — and the only
     figures on the roll are the two the repo actually states. */
  return (<>
    {/* the roll */}
    <div style={{ position: "absolute", left: x - RW / 2, top: y - 26 * s, width: RW,
      height: RH * shown + 216 * s, background: "#F9F5EA", zIndex: z,
      boxShadow: SH_D, borderRadius: 4 }} />
    <div style={{ position: "absolute", left: x - RW / 2, top: y - 26 * s, width: RW,
      height: 9 * s, background: "#E2DAC6", zIndex: z + 1 }} />
    {Array.from({ length: shown }, (_, i) => {
      const pr = PROVIDERS[i % PROVIDERS.length];
      return (
        <React.Fragment key={"lr" + i}>
          <Token x={x - RW / 2 + 62 * s} y={y + 22 * s + i * RH} s={72 * s}
            z={z + 6} markKey={pr.k} name={pr.n} hasMark={pr.mark} />
          <div style={{ position: "absolute", left: x - RW / 2 + 112 * s,
            top: y + 4 * s + i * RH, width: RW * 0.42, zIndex: z + 5,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26 * s,
            color: "#2E2820", lineHeight: `${36 * s}px` }}>{pr.n}</div>
          <div style={{ position: "absolute", left: x - RW / 2, top: y + 4 * s + i * RH,
            width: RW - 26 * s, textAlign: "right", zIndex: z + 5, fontFamily: MONO,
            fontWeight: 800, fontSize: 24 * s, letterSpacing: "0.10em",
            color: "#8A7C5C", lineHeight: `${36 * s}px` }}>FREE TIER</div>
          <div style={{ position: "absolute", left: x - RW / 2 + 26 * s,
            top: y + 46 * s + i * RH, width: RW - 52 * s, height: 2,
            background: "#DED5BE", zIndex: z + 4 }} />
        </React.Fragment>
      );
    })}
    {/* the rule and the total */}
    <div style={{ position: "absolute", left: x - RW / 2 + 20 * s,
      top: y + 12 * s + shown * RH, width: RW - 40 * s, height: 5 * s,
      background: "#2E2820", zIndex: z + 8 }} />
    <div style={{ position: "absolute", left: x - RW / 2 + 24 * s,
      top: y + 26 * s + shown * RH, zIndex: z + 8, fontFamily: MONO, fontWeight: 800,
      fontSize: 21 * s, letterSpacing: "0.16em", color: "#8A7C5C" }}>TOTAL</div>
    <div style={{ position: "absolute", left: x - RW / 2, top: y + 46 * s + shown * RH,
      width: RW - 24 * s, textAlign: "right", zIndex: z + 8,
      fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56 * s,
      lineHeight: 1, color: "#241F14" }}>{total}</div>
    <div style={{ position: "absolute", left: x - RW / 2, top: y + 108 * s + shown * RH,
      width: RW - 24 * s, textAlign: "right", zIndex: z + 8, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 21 * s, letterSpacing: "0.05em",
      color: "#6B5E44" }}>{sub}</div>
  </>);
};
