import React from "react";
import { inter } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, INK, CARD, CARDD, CARDL, LEDG, LEDGL, BRASS, BRASSD,
} from "./TrdWorld";

/* ===========================================================================
   REEL 103 "TRADE" · THE CHART VOCABULARY.

   ⛔⛔ WHY THIS FILE EXISTS — THE ROOT-CAUSE NOTE, MEASURED.
      Alex, on the first delivery: *"make it more finance themed and less text,
      more interesting concepts and more stock charts etc, rather than so gray
      and dull and plain."* Three notes, one cause. Counted on the built reel:

        chart vocabulary in the whole reel .......... **ZERO**
        text nodes (props 30 + scenes 16) ........... **46**
        scenes under 0.22 mean saturation ........... **5 of 15**

      The subject is markets and the picture was a stationery cupboard. Every
      time a scene needed to say something it reached for a labelled plate,
      because there was no other language available to it.

   ⭐⭐ AND THE CAUSE IS AN OVER-CORRECTION I CAN NAME. `TrdWorld`'s header says
      this world exists to refuse the neon trading-floor default, which is
      REEL-BUILD-LEARNINGS §1's most re-flagged failure. That rule forbids
      **neon-on-black**. It does not forbid **CHARTS**. Candlesticks in matte
      clay and green on cream paper are fully house-legal, and a price chart is
      the single most recognisable object in the subject — which is exactly the
      [[seo-reel]] round-9 lesson: *"a magnifier over a web page reads as
      INSPECTION, not as SEO ... the fix is the most recognisable object in the
      subject: a SEARCH RESULT."* Here it is a PRICE CHART.

   ⛔ THE HONESTY LINE HOLDS. Every chart below draws a SHAPE and never a
      figure: no axis numbers, no prices, no percentages, no returns, no P&L.
      Tickers are names and are fine; a printed price would be a market claim
      this reel has no source for (board §0). A chart with no numbers on it says
      "this is about markets" without asserting anything about anyone's.
   ========================================================================= */

/** a deterministic OHLC series — same seed, same candles, every render */
export const series = (seed: number, n: number, drift = 0.42) => {
  const out: { o: number; h: number; l: number; c: number }[] = [];
  let px = 0.5;
  for (let i = 0; i < n; i++) {
    const o = px;
    const step = (rnd(seed + i, 3) - 0.5) * 0.22 + (drift - 0.5) * 0.055;
    const c = Math.max(0.06, Math.min(0.94, o + step));
    const w = 0.03 + rnd(seed + i, 7) * 0.05;
    out.push({ o, h: Math.min(1, Math.max(o, c) + w), l: Math.max(0, Math.min(o, c) - w), c });
    px = c;
  }
  return out;
};

/* =========================================================================
   CANDLES — the reel's hero chart object. Real bodies and wicks, matte green
   up and clay down, on whatever surface it is placed on.
   ⛔ `grow` reveals LEFT TO RIGHT so the chart is a continuous transformation
      rather than an entrance ([[feedback_scene_needs_an_arc]]).
   ====================================================================== */
export const Candles: React.FC<{ x: number; y: number; w: number; h: number; n?: number;
  seed?: number; z?: number; grow?: number; drift?: number; paper?: boolean; f?: number;
  grid?: boolean; last?: boolean }> =
  ({ x, y, w: ww, h: hh, n = 18, seed = 3, z = 60, grow = 1, drift = 0.62,
     paper = true, f = 0, grid = true, last = true }) => {
  const S = series(seed, n, drift);
  const pad = paper ? 14 : 0;
  const iw = ww - pad * 2, ih = hh - pad * 2;
  const cw = iw / n;
  const shown = Math.max(0, Math.min(n, Math.round(grow * n)));
  const lastC = S[Math.max(0, shown - 1)];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: paper ? CARDL : "transparent", borderRadius: paper ? 7 : 0,
      boxShadow: paper ? SH : undefined, overflow: "hidden",
      border: paper ? `3px solid ${CARDD}` : undefined }}>
      {/* the ruled grid — a chart has a scale even when it prints no numbers */}
      {grid && [0, 1, 2, 3].map((k) => (
        <div key={"gr" + k} style={{ position: "absolute", left: pad, right: pad,
          top: pad + (k + 1) * (ih / 5), height: 1, background: dkh(CARDD, 0.10), opacity: 0.7 }} />
      ))}
      {S.slice(0, shown).map((d, i) => {
        const up = d.c >= d.o;
        const col = up ? GREEN : CLAY;
        const bx = pad + i * cw + cw * 0.16;
        const bw = Math.max(3, cw * 0.68);
        const yTop = pad + (1 - d.h) * ih, yBot = pad + (1 - d.l) * ih;
        const oTop = pad + (1 - Math.max(d.o, d.c)) * ih;
        const oBot = pad + (1 - Math.min(d.o, d.c)) * ih;
        const pop = i === shown - 1 ? E(f % 7, 0, 4, 1.12, 1, OUT) : 1;
        return (
          <React.Fragment key={"cd" + i}>
            <div style={{ position: "absolute", left: bx + bw / 2 - 1.2, top: yTop,
              width: 2.4, height: Math.max(1, yBot - yTop), background: dkh(col, 0.22) }} />
            <div style={{ position: "absolute", left: bx, top: oTop, width: bw,
              height: Math.max(3, (oBot - oTop) * pop), background: col, borderRadius: 1.5 }} />
          </React.Fragment>
        );
      })}
      {/* the last-price marker: a dashed rule and a tab, no number on it */}
      {last && shown > 0 && (<>
        <div style={{ position: "absolute", left: pad, right: pad,
          top: pad + (1 - lastC.c) * ih, height: 2, background: hexa(INK, 0.28) }} />
        <div style={{ position: "absolute", right: pad - 2, top: pad + (1 - lastC.c) * ih - 7,
          width: 16, height: 14, borderRadius: 3,
          background: lastC.c >= lastC.o ? GREEN : CLAY }} />
      </>)}
    </div>
  );
};

/* =========================================================================
   A PRICE LINE with an area fill — the second chart shape, so two charts in
   the same frame never read as the same object twice.
   ====================================================================== */
export const PriceLine: React.FC<{ x: number; y: number; w: number; h: number; n?: number;
  seed?: number; z?: number; grow?: number; c?: string; paper?: boolean; drift?: number;
  dot?: boolean }> =
  ({ x, y, w: ww, h: hh, n = 26, seed = 11, z = 60, grow = 1, c = SKY, paper = true,
     drift = 0.64, dot = true }) => {
  const S = series(seed, n, drift);
  const pad = paper ? 12 : 0;
  const iw = ww - pad * 2, ih = hh - pad * 2;
  const shown = Math.max(2, Math.min(n, Math.round(grow * n)));
  const pt = (i: number) => [pad + (i / (n - 1)) * iw, pad + (1 - S[i].c) * ih];
  const line = S.slice(0, shown).map((_, i) => pt(i).join(",")).join(" ");
  const area = `${pad},${pad + ih} ${line} ${pt(shown - 1)[0]},${pad + ih}`;
  const [lx, ly] = pt(shown - 1);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: paper ? CARDL : "transparent", borderRadius: paper ? 7 : 0,
      boxShadow: paper ? SH : undefined, overflow: "hidden",
      border: paper ? `3px solid ${CARDD}` : undefined }}>
      <svg width={ww} height={hh} style={{ position: "absolute", inset: 0 }}>
        <polygon points={area} fill={mxh(c, 0.72)} />
        <polyline points={line} fill="none" stroke={c} strokeWidth={4}
          strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {dot && <div style={{ position: "absolute", left: lx - 7, top: ly - 7, width: 14, height: 14,
        borderRadius: 7, background: c, border: `3px solid ${CARDL}` }} />}
    </div>
  );
};

/** the inline sparkline that replaces a line of type on a card */
export const Spark: React.FC<{ x?: number; y?: number; w: number; h: number; seed?: number;
  up?: boolean; z?: number; c?: string; inline?: boolean }> =
  ({ x = 0, y = 0, w: ww, h: hh, seed = 5, up = true, z = 4, c, inline }) => {
  const col = c ?? (up ? GREEN : CLAY);
  const S = series(seed, 12, up ? 0.72 : 0.3);
  const pts = S.map((d, i) => `${(i / 11) * ww},${(1 - d.c) * hh}`).join(" ");
  return (
    <div style={{ position: inline ? "relative" : "absolute", left: inline ? undefined : x,
      top: inline ? undefined : y, width: ww, height: hh, zIndex: z }}>
      <svg width={ww} height={hh}>
        <polyline points={pts} fill="none" stroke={col} strokeWidth={3}
          strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/** the direction chevron. ⛔ It says UP or DOWN and never HOW MUCH. */
export const Dir: React.FC<{ x?: number; y?: number; s?: number; up: boolean; z?: number;
  inline?: boolean }> = ({ x = 0, y = 0, s = 1, up, z = 6, inline }) => (
  <div style={{ position: inline ? "relative" : "absolute", left: inline ? undefined : x,
    top: inline ? undefined : y, width: 22 * s, height: 22 * s, zIndex: z }}>
    <svg width={22 * s} height={22 * s} viewBox="0 0 22 22">
      <path d={up ? "M11 3 L20 15 L2 15 Z" : "M11 19 L2 7 L20 7 Z"}
        fill={up ? GREEN : CLAY} />
    </svg>
  </div>
);

/* =========================================================================
   THE TICKER BOARD — a split-flap departures board of ticker symbols with a
   direction flag each. This is the object that says "markets" from across a
   room, and it carries no price, so it asserts nothing.
   ====================================================================== */
export const TickerBoard: React.FC<{ x: number; y: number; w: number; rows: string[];
  f: number; z?: number; s?: number; on?: number; cols?: number }> =
  ({ x, y, w: ww, rows, f, z = 40, s = 1, on = 1, cols = 2 }) => {
  const rh = 40 * s, gap = 8 * s;
  const cw = (ww - gap * (cols - 1)) / cols;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
      {rows.map((t, i) => {
        const r = Math.floor(i / cols), c = i % cols;
        /* the flap turns on a slow cycle so the board is a background PROCESS */
        const flip = Math.sin(f / 23 + i * 1.9);
        const up = flip > -0.15;
        return (
          <div key={t + i} style={{ position: "absolute", left: c * (cw + gap), top: r * (rh + gap),
            width: cw, height: rh, background: dkh(INK, 0.06), borderRadius: 4 * s,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: `0 ${9 * s}px`, boxShadow: SH, opacity: 0.35 + on * 0.65,
            borderBottom: `${3 * s}px solid ${dkh(INK, 0.30)}` }}>
            <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s,
              letterSpacing: "0.06em", color: "#E9E1CE" }}>{t}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 * s }}>
              <Spark w={40 * s} h={16 * s} seed={i * 7 + 2} up={up} inline />
              <Dir s={0.8 * s} up={up} inline />
            </span>
          </div>
        );
      })}
    </div>
  );
};

/** the allocation ring — what a portfolio IS, drawn instead of listed */
export const Allocation: React.FC<{ x: number; y: number; r: number; z?: number; f?: number;
  grow?: number; n?: number }> = ({ x, y, r, z = 60, f = 0, grow = 1, n = 6 }) => {
  const COLS = [CLAY, GOLD, GREEN, SKY, "#6B5A8E", BRASS];
  const shares = [0.26, 0.21, 0.17, 0.15, 0.12, 0.09];
  let acc = 0;
  const seg = shares.map((sh, i) => {
    const a0 = acc * 360 - 90; acc += sh; const a1 = acc * 360 - 90;
    return { a0, a1, c: COLS[i % COLS.length] };
  });
  const arc = (a0: number, a1: number) => {
    const rad = (a: number) => (a * Math.PI) / 180;
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M ${r + r * Math.cos(rad(a0))} ${r + r * Math.sin(rad(a0))} `
      + `A ${r} ${r} 0 ${large} 1 ${r + r * Math.cos(rad(a1))} ${r + r * Math.sin(rad(a1))}`;
  };
  return (
    <div style={{ position: "absolute", left: x, top: y, width: r * 2, height: r * 2, zIndex: z,
      transform: `rotate(${Math.sin(f / 81) * 2.2}deg)` }}>
      <svg width={r * 2} height={r * 2}>
        <circle cx={r} cy={r} r={r - 11} fill={CARDL} stroke={CARDD} strokeWidth={3} />
        {seg.slice(0, Math.max(1, Math.round(grow * n))).map((sg, i) => (
          <path key={"sg" + i} d={arc(sg.a0, sg.a1 - 2)} fill="none" stroke={sg.c}
            strokeWidth={20} strokeLinecap="butt" transform={`translate(0,0)`}
            style={{ transformBox: "fill-box" }} />
        ))}
      </svg>
    </div>
  );
};

/* =========================================================================
   A CHART CARD — the object that REPLACES a two-line labelled plate. One word,
   one sparkline, one direction. Three graphic channels, one text channel,
   against the two-text-lines-and-nothing-else it replaces.
   ====================================================================== */
export const ChartCard: React.FC<{ x: number; y: number; w?: number; t: string; up: boolean;
  c?: string; s?: number; z?: number; p?: number; f?: number; seed?: number }> =
  ({ x, y, w: ww = 262, t, up, c = CLAY, s = 1, z = 70, p = 1, f = 0, seed = 4 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww * s, zIndex: z, opacity: p,
    transform: `translateX(${(1 - p) * -240 * s}px) rotate(${(seed % 2 ? 1 : -1) * 1.1}deg)` }}>
    <div style={{ background: CARDL, borderRadius: 6 * s, boxShadow: SH,
      borderLeft: `${8 * s}px solid ${c}`, padding: `${10 * s}px ${12 * s}px`,
      display: "flex", alignItems: "center", gap: 10 * s, overflow: "hidden" }}>
      <Dir s={1.15 * s} up={up} inline />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s,
        letterSpacing: "-0.012em", color: "#2B2620", whiteSpace: "nowrap", flex: "0 0 auto" }}>
        {t}
      </span>
      <span style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "flex-end" }}>
        <Spark w={78 * s} h={30 * s} seed={seed * 5 + 1} up={up} inline />
      </span>
    </div>
  </div>
);


/* =========================================================================
   THE SPOT PASS — a single beam that TRAVELS between marks and HOLDS on each.

   ⛔⛔ WHY IT EXISTS. Alex, on the three agents revealed at ~7s: *"you have to
      add like a spotlight showing each of them, this type of animation detail
      elevates the quality so much, please do a passthrough like this for all of
      these."* He is naming the difference between a group ARRIVING and a group
      being PRESENTED. Three sprites landing together is one event; a beam
      walking down the line and stopping on each is three, and the viewer is
      told where to look for each one.

   ⭐ IT IS ALSO THE CHEAPEST MOTION IN THE KIT. The measured table in
      [[feedback_scene_needs_an_arc]] ranks "large x bright x fast" top, and a
      spot cone plus its floor pool is the largest bright thing that can move
      across a frame without adding a single new object.

   `stops`  the x marks, in order
   `at`     the frame the beam starts moving
   `travel` frames spent moving between marks
   `hold`   frames spent parked on a mark
   Returns nothing on its own — pair it with `passLit()` so the subject under
   the beam REACTS, because a light that lands on a sprite that ignores it is
   a light effect, not staging.
   ====================================================================== */
const passPhase = (f: number, at: number, n: number, travel: number, hold: number) => {
  const per = travel + hold;
  const t = f - at;
  if (t < 0) return { i: -1, p: 0, held: 0 };
  const i = Math.min(n - 1, Math.floor(t / per));
  const k = t - i * per;
  return { i, p: Math.max(0, Math.min(1, k / travel)), held: Math.max(0, Math.min(1, (k - travel) / 4)) };
};

/** 0..1 for "the beam is on mark i right now", with ramps in and out */
export const passLit = (f: number, at: number, n: number, travel: number, hold: number,
  i: number) => {
  const { i: cur, p, held } = passPhase(f, at, n, travel, hold);
  if (cur < 0) return 0;
  if (cur === i) return Math.max(p * 0.55, held);
  /* once the beam has passed, the mark stays warm rather than going black —
     ⛔ a lineup that snaps back to nothing reads as a bug, not as a reveal */
  if (cur > i) return 0.42;
  return 0;
};

export const SpotPass: React.FC<{ f: number; stops: number[]; at: number; travel?: number;
  hold?: number; y?: number; c?: string; z?: number; len?: number; spread?: number;
  floorY?: number }> =
  ({ f, stops, at, travel = 5, hold = 7, y = 0, c = "#F4E9CE", z = 22, len = 470,
     spread = 210, floorY }) => {
  const { i, p } = passPhase(f, at, stops.length, travel, hold);
  if (i < 0) return null;
  const from = i === 0 ? stops[0] : stops[i - 1];
  const x = from + (stops[i] - from) * (p * p * (3 - 2 * p));      /* smoothstep */
  const on = i === 0 ? Math.max(0, Math.min(1, (f - at) / 4)) : 1;
  return (<>
    {/* the housing and its cone */}
    <div style={{ position: "absolute", left: x - 34, top: y, width: 68, height: 34,
      borderRadius: `6px 6px 26px 26px`, background: "#39404A", zIndex: z + 1,
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - 26, top: y + 30, width: 52, height: 9,
      borderRadius: "0 0 22px 22px", background: c, opacity: 0.45 + on * 0.55, zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - spread / 2, top: y + 38, width: spread,
      height: len, zIndex: z,
      background: `linear-gradient(180deg, ${hexa(c, 0.30 * on)} 0%, ${hexa(c, 0)} 100%)`,
      clipPath: `polygon(${50 - (56 / spread) * 50}% 0, ${50 + (56 / spread) * 50}% 0, 100% 100%, 0 100%)` }} />
    {/* the pool it throws on the floor — the half of a spotlight most builds forget */}
    {floorY !== undefined && (
      <div style={{ position: "absolute", left: x - spread * 0.44, top: floorY,
        width: spread * 0.88, height: 46, borderRadius: "50%", background: mxh(c, 0.30),
        opacity: 0.30 * on, zIndex: z - 1 }} />
    )}
  </>);
};
