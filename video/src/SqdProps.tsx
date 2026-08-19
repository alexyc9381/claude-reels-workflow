import React from "react";
import { Img, staticFile } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, dkh, mxh, blend, ui, mono, SH,
  CLAY, GOLD, GREEN, RED, SKY, TEAL, CYAN, VIOLET, AMBER, PAPER, INK,
  Ring, Puff, Pool, Crate, Band, GH, R,
} from "./SqdWorld";

/* ===========================================================================
   REEL 112 "SQUAD" · THE PROPS.  Board: storyboards/112-squad.md.

   ⛔⛔⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES. *"a whole lot of nothing even
      though there's more stuff"* — a book that was FOUR DIVS. Count the divs per
      object before adding objects: detail-per-object and object-COUNT are
      different dials, and the one that reads is detail. Nothing below is a bare
      rectangle: every object has a face, an edge, a fitting and a shadow.

   ⛔⛔ OBJECT SIZE FLOOR: >= ~40px on the short side or it vanishes in the motion
      audit's 1012->240 downsample. HERO props >= 140px. Reel 109 was rejected
      for 46-96px props: *"small props never add up."*

   ⛔ LARGE x BRIGHT x FAST is the only combination that registers. Only the
      SWEPT EDGE repaints, so a big object moving slightly is worth LESS than a
      medium object crossing the frame.
   ⛔ Prefer N DISCRETE POPS over one long tween: an 82-frame smooth growth
      measured 4.27, WORSE than what it replaced; four discrete BACK-eased pops
      with a squash and a ring each measured 5.63.
   ⛔ NOTHING LANDS AND STOPS. Every arrival gets a squash, a recoil, a ring and
      a damped rock `sin(lf/3.1) * exp(-lf/26)` that never quite settles.
   ========================================================================= */

/** the damped rock every landed object runs — it never quite settles */
export const rockAt = (f: number, at: number, amp = 5) => {
  const lf = f - at;
  return lf < 0 ? 0 : Math.sin(lf / 3.1) * Math.exp(-lf / 26) * amp;
};
/** the squash an arrival costs, 1 -> 0 over ~10 frames */
export const squashAt = (f: number, at: number, k = 0.26) => {
  const lf = f - at;
  if (lf < 0 || lf > 14) return 1;
  return 1 - Math.sin((lf / 14) * Math.PI) * k;
};

/* =========================================================================
   S0-S2 · THE SEVEN CRATES — the hook's one EVENT.
   Before: seven crates sit dark in the canyon wall. Trigger: the searchlight
   passes them. Travel: they arc across the FULL panel width. Arrival: they slam
   into a line, each with a squash, a puff, a ring and a rock.
   ⛔ The travel is what the motion lives in, so the arc is long and the landing
      is HARD (8 frames of arrival, not a 20-frame ease).
   ====================================================================== */
export const SEVEN_X = [128, 254, 380, 506, 632, 758, 884];

export const FlyingCrate: React.FC<{ f: number; i: number; at: number; groundY: number;
  fromX: number; fromY: number; toX?: number; z?: number }> =
  ({ f, i, at, groundY, fromX, fromY, toX, z = 46 }) => {
  const land = at + 16;
  const k = E(f, at, land, 0, 1, IN_Q);
  const tx = toX ?? SEVEN_X[i];
  const x = fromX + (tx - fromX) * k;
  const y = fromY + (groundY - fromY) * k - Math.sin(k * Math.PI) * 190;
  const sq = squashAt(f, land, 0.30);
  const W = 150;
  return (<>
    {/* ⭐ THE SEVEN ARE LIT VOLUMES, NOT CRATES — clay-bound, gilt-tooled, and they
        TUMBLE OPEN as they fly, which a box cannot do. */}
    <Volume x={x} y={y} w={W} z={z} lit rot={Math.sin(k * Math.PI) * -34 + rockAt(f, land, 6)}
      open={k < 1 ? Math.sin(k * Math.PI) * 0.55 : 0} sq={sq} />
    {f >= land && <><Puff x={tx} y={groundY} f={f} at={land} n={9} s={1.15} />
      <Ring x={tx} y={groundY} f={f} at={land} max={190} c="#FFE9C0" /></>}
  </>);
};

/** the searchlight bar that picks them — a hard-edged travelling band, light
    AND shadow, because a light-only sweep lifts the black point (banned). */
export const SearchBar: React.FC<{ f: number; at: number; dur?: number; z?: number }> =
  ({ f, at, dur = 26, z = 44 }) => {
  const k = E(f, at, at + dur, 0, 1, LIN);
  if (k <= 0 || k >= 1) return null;
  const x = -160 + k * 1360;
  return (<>
    <div style={{ position: "absolute", left: x, top: -40, width: 116, bottom: -40, zIndex: z,
      background: "linear-gradient(90deg, rgba(255,244,214,0) 0%, rgba(255,244,214,0.80) 44%, rgba(255,244,214,0) 100%)",
      transform: "skewX(-9deg)" }} />
    <div style={{ position: "absolute", left: x - 76, top: -40, width: 62, bottom: -40, zIndex: z,
      background: "rgba(6,8,14,0.50)", transform: "skewX(-9deg)" }} />
  </>);
};

/** the crate LID blowing off, and the specialist standing up out of it */
export const CrateOpen: React.FC<{ f: number; at: number; x: number; groundY: number;
  z?: number }> = ({ f, at, x, groundY, z = 48 }) => {
  const k = E(f, at, at + 12, 0, 1, OUT);
  if (k <= 0) return null;
  return (<>
    <div style={{ position: "absolute", left: x - 62 - k * 30, top: groundY - 96 - k * 120,
      width: 124, height: 22, zIndex: z + 2, borderRadius: 4,
      transform: `rotate(${-k * 58}deg)`,
      background: `linear-gradient(180deg, ${blend("#8A8478", CLAY, 0.8)} 0%, ${dkh(blend("#5E5A52", CLAY, 0.7), 0.2)} 100%)`,
      border: `4px solid ${dkh(blend("#5E5A52", CLAY, 0.7), 0.34)}`, opacity: 1 - k * 0.25 }} />
    <Ring x={x} y={groundY - 92} f={f} at={at} max={140} c="#FFE9C0" />
  </>);
};

/* =========================================================================
   ⭐⭐⭐ THE REPO VOLUME — what a repo IS in this world.

   Alex: *"I don't like how each of the repos are represented as brown boxes,
   maybe think of another interesting way to represent them."* He is right and the
   box was lazy: a crate carries ONE bit of information (there is a thing in it),
   which is `docs/ANIMATION-QUALITY.md` §3's CONTAINER defect exactly.

   The set is a LIBRARY, so a repo is a BOUND VOLUME — and unlike a crate, a book
   has parts worth drawing: cover boards, a spine with raised bands, a visible page
   block with leaves, a tooled border, a title label, an embossed mark, a ribbon.
   ⛔ `feedback_props_need_real_drawing`: *"a book was FOUR DIVS."* This one is
   fourteen, and it reads at 60px as well as at 300px.
   ====================================================================== */
export const Volume: React.FC<{ x: number; y: number; w: number; rot?: number; z?: number;
  hue?: number; lit?: boolean; open?: number; mark?: boolean; sq?: number }> =
  ({ x, y, w, rot = 0, z = 40, hue = 0, lit = false, open = 0, mark = true, sq = 1 }) => {
  const h = w * 1.34, sp = w * 0.20;
  /* six cloth colours, so a shelf of them reads as a LIBRARY and not as a stack
     of one book repeated */
  const CLOTH = ["#7E3B2E", "#2E4A5E", "#4A5A32", "#5E3A56", "#8A5A24", "#2E4A46"];
  const base = lit ? CLAY : CLOTH[Math.abs(hue) % CLOTH.length];
  const board = lit ? blend(CLAY, "#FFFFFF", 0.16) : base;
  const dk = dkh(base, 0.40);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h,
      zIndex: z, transform: `rotate(${rot}deg) scaleY(${sq}) scaleX(${2 - sq})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: sp * 0.5, top: h * 0.03, width: w - sp * 0.5,
        height: h * 0.94, borderRadius: 3, background: "#F0E6CE",
        border: `${Math.max(1, w * 0.012)}px solid #C8B48A` }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"lf" + i} style={{ position: "absolute", right: Math.max(1, w * 0.02),
          top: h * 0.07 + i * (h * 0.86 / 7), width: w * 0.10,
          height: Math.max(1, h * 0.020), background: "#CFC0A0" }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: w - sp * 0.55, height: h,
        borderRadius: `${w * 0.03}px ${w * 0.05}px ${w * 0.05}px ${w * 0.03}px`,
        background: `linear-gradient(102deg, ${dkh(board, 0.18)} 0%, ${board} 26%, ${dkh(board, 0.10)} 100%)`,
        border: `${Math.max(2, w * 0.026)}px solid ${dk}`,
        transform: open ? `perspective(500px) rotateY(${-open * 62}deg)` : undefined,
        transformOrigin: "0% 50%" }}>
        <div style={{ position: "absolute", left: w * 0.07, top: h * 0.05, right: w * 0.07,
          bottom: h * 0.05, borderRadius: w * 0.02,
          border: `${Math.max(1, w * 0.014)}px solid ${lit ? "#FFE6B4" : mxh(base, 0.34)}` }} />
        <div style={{ position: "absolute", left: w * 0.15, top: h * 0.14, right: w * 0.15,
          height: h * 0.13, borderRadius: w * 0.02,
          background: lit ? "#FFF3D8" : mxh(base, 0.42),
          border: `${Math.max(1, w * 0.012)}px solid ${dk}` }} />
        {mark && (
          <div style={{ position: "absolute", left: "50%", top: h * 0.40, width: w * 0.34,
            height: w * 0.34, marginLeft: -w * 0.17, borderRadius: w * 0.06,
            background: lit ? "#FFFFFF" : mxh(base, 0.20),
            border: `${Math.max(1, w * 0.016)}px solid ${dk}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(GH)} style={{ width: w * 0.22, height: w * 0.22,
              objectFit: "contain", opacity: lit ? 1 : 0.62 }} />
          </div>
        )}
        {[0.72, 0.80].map((t, i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: w * 0.20, top: h * t,
            width: (w * 0.60) * (i ? 0.64 : 1), height: Math.max(1, h * 0.016),
            background: lit ? "#FFE6B4" : mxh(base, 0.30) }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 0, width: sp * 0.7, height: h,
        borderRadius: `${w * 0.03}px 0 0 ${w * 0.03}px`,
        background: `linear-gradient(90deg, ${dkh(base, 0.34)} 0%, ${base} 70%)`,
        border: `${Math.max(2, w * 0.02)}px solid ${dk}`, borderRight: "none" }}>
        {[0.18, 0.40, 0.62, 0.84].map((t, i) => (
          <div key={"bd" + i} style={{ position: "absolute", left: 0, right: 0, top: h * t,
            height: Math.max(2, h * 0.035), background: dk }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: w * 0.66, top: h * 0.92,
        width: Math.max(2, w * 0.05), height: h * 0.20,
        background: lit ? "#FFD79A" : "#B4463A" }} />
    </div>
  );
};

/** the overhead rail — volumes travelling both ways above his head, continuously.
    Background furniture, deliberately: the note was that the MAIN subject has to
    move, so this is set dressing and reads that way. */
export const RailTraffic: React.FC<{ f: number; y: number; z?: number; dir?: 1 | -1;
  n?: number; speed?: number; s?: number }> =
  ({ f, y, z = 30, dir = 1, n = 5, speed = 5.4, s = 1 }) => (<>
    <div style={{ position: "absolute", left: -80, right: -80, top: y, height: 16 * s, zIndex: z,
      background: "linear-gradient(180deg, #6E5238 0%, #33241A 100%)" }} />
    <div style={{ position: "absolute", left: -80, right: -80, top: y + 16 * s, height: 7 * s,
      zIndex: z, background: "#241A12" }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: 20 + i * 128, top: y - 34 * s,
        width: 9 * s, height: 34 * s, background: "#33241A", zIndex: z - 1 }} />
    ))}
    {Array.from({ length: n }, (_, i) => {
      const span = 1260;
      const raw = (f * speed + i * (span / n)) % span;
      const x = dir === 1 ? raw - 130 : 1130 - raw;
      const sw = Math.sin((f + i * 40) / 21) * 4;
      return (
        <React.Fragment key={"rc" + i}>
          <div style={{ position: "absolute", left: x + 46 * s, top: y + 22 * s, width: 6 * s,
            height: 30 * s, background: "#2A1E14", zIndex: z + 1 }} />
          <Volume x={x + 49 * s} y={y + 128 * s} w={84 * s} z={z + 1} hue={i + 1} rot={sw} />
        </React.Fragment>
      );
    })}
  </>);

/** a chute pouring repo volumes onto a growing pile — the "thousands" as a MASS
    that is actively arriving, not a static wall. */
export const ChutePour: React.FC<{ f: number; x: number; groundY: number; flip?: boolean;
  z?: number; rate?: number; from?: number }> =
  ({ f, x, groundY, flip = false, z = 34, rate = 11, from = 0 }) => {
  const sgn = flip ? -1 : 1;
  return (<>
    <div style={{ position: "absolute", left: x - 96, top: -30, width: 192, height: 150, zIndex: z,
      background: "linear-gradient(180deg, #4A3524 0%, #2A1E14 100%)",
      border: "6px solid #1C1409", borderRadius: 6,
      clipPath: "polygon(0 0,100% 0,72% 100%,28% 100%)" }} />
    <div style={{ position: "absolute", left: x - 62, top: 116, width: 124, height: 20,
      zIndex: z + 1, background: "#5A4028", border: "5px solid #1C1409", borderRadius: 4 }} />
    {Array.from({ length: 9 }, (_, i) => {
      const t = ((f - from) * rate + i * 90) % 340;
      if (t < 0) return null;
      const k = t / 340;
      if (k >= 0.97) return null;
      const px = x + sgn * (18 + k * 210) + Math.sin(i * 2.1) * 16;
      const py = 136 + k * k * (groundY - 190 - 136);
      return (
        <Volume key={"cp" + i} x={px} y={py + 30} w={62} z={z + 2} hue={i + 2}
          rot={sgn * k * 300 + i * 40} open={0.30 + (i % 3) * 0.16} />
      );
    })}
  </>);
};

/** the pile the chute is building — it GROWS across the scene, and a pile of repos
    is a pile of BOOKS lying flat: spines out, leaves visible, every one a
    different cloth. A grey rectangle said nothing. */
export const CratePile: React.FC<{ f: number; x: number; groundY: number; grow: number;
  z?: number; seed?: number }> = ({ f, x, groundY, grow, z = 36, seed = 5 }) => {
  const N = Math.round(grow * 16);
  return (<>
    {Array.from({ length: N }, (_, i) => {
      const row = Math.floor(i / 4), col = i % 4;
      const w = 92 - row * 7, h = 40 - row * 3;
      const jx = (rnd(seed, i) - 0.5) * 26;
      const rot = (rnd(seed + 1, i) - 0.5) * 16;
      const CLOTH = ["#7E3B2E", "#2E4A5E", "#4A5A32", "#5E3A56", "#8A5A24", "#2E4A46"];
      const c = CLOTH[Math.floor(rnd(seed + 2, i) * 6) % 6];
      return (
        <div key={"pl" + i} style={{ position: "absolute",
          left: x + col * (w - 12) - 130 + jx, top: groundY - (row + 1) * (h - 5),
          width: w, height: h, zIndex: z + row, borderRadius: 3,
          transform: `rotate(${rot}deg)`,
          background: `linear-gradient(178deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.22)} 100%)`,
          border: `3px solid ${dkh(c, 0.50)}` }}>
          <div style={{ position: "absolute", left: 3, right: 3, bottom: 3, height: h * 0.34,
            background: "#E8DCBE", borderTop: `2px solid ${dkh(c, 0.5)}` }} />
          {[0.24, 0.50, 0.76].map((t, q) => (
            <div key={"pb" + q} style={{ position: "absolute", left: w * t, top: 2,
              width: Math.max(2, w * 0.05), height: h * 0.58, background: dkh(c, 0.44) }} />
          ))}
        </div>
      );
    })}
  </>);
};

/** ⭐ THE CROWN. Alex: *"when it says 'the last one is crazy good' it needs to show
    it, like a crown on the head"* and then *"put the crown on HIS head."* */
export const Crown: React.FC<{ f: number; x: number; y: number; at?: number; s?: number;
  z?: number; drop?: boolean }> = ({ f, x, y, at = 0, s = 1, z = 92, drop = true }) => {
  const k = drop ? E(f, at, at + 14, 0, 1, IN_Q) : 1;
  if (k <= 0) return null;
  const yy = drop ? y - (1 - k) * 300 : y;
  const rk = drop ? rockAt(f, at + 14, 6) : Math.sin(f / 30) * 1.6;
  const W = 128 * s, H = 92 * s;
  return (<>
    <div style={{ position: "absolute", left: x - W / 2, top: yy - H, width: W, height: H,
      zIndex: z, transform: `rotate(${rk}deg)`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: W, height: H * 0.36,
        borderRadius: 4, background: "linear-gradient(180deg, #FFD98A 0%, #C8922E 100%)",
        border: `${4 * s}px solid #8A6014` }} />
      {[0, 1, 2, 3, 4].map((i) => {
        const pw = W * 0.19, px = i * (W - pw) / 4;
        const ph = i === 2 ? H * 0.74 : i % 2 === 0 ? H * 0.58 : H * 0.44;
        return (
          <React.Fragment key={"pt" + i}>
            <div style={{ position: "absolute", left: px, bottom: H * 0.30, width: pw, height: ph,
              background: "linear-gradient(180deg, #FFE6A6 0%, #D8A03A 100%)",
              border: `${3 * s}px solid #8A6014`,
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
            <div style={{ position: "absolute", left: px + pw / 2 - 6 * s,
              bottom: H * 0.30 + ph - 12 * s, width: 12 * s, height: 12 * s, borderRadius: "50%",
              background: i === 2 ? "#C4483A" : "#3F7E9E", border: `${2 * s}px solid #8A6014` }} />
          </React.Fragment>
        );
      })}
      {[0.16, 0.38, 0.62, 0.84].map((t, i) => (
        <div key={"bj" + i} style={{ position: "absolute", left: W * t - 7 * s, bottom: H * 0.08,
          width: 14 * s, height: 14 * s, borderRadius: 3,
          background: i % 2 === 0 ? "#C4483A" : "#3F7E9E", border: `${2 * s}px solid #8A6014` }} />
      ))}
    </div>
    {drop && f >= at + 14 && <Ring x={x} y={yy} f={f} at={at + 14} max={210 * s} c="#FFE6A6" />}
  </>);
};

/** ⛔ MEASURE THE RENDER, NOT THE ALGEBRA (reel 109 lost a crown to this). `Spec`
    puts the div at `top: y - size`, and the drawn body inside `Mascot` starts at
    viewBox y=44 of 200 — so the real crown line is `y - 0.78 * size`. */
export const headTop = (y: number, size: number) => y - size * 0.78;

/** ⭐⭐⭐ THE HEAD PILE — the hook's MAIN-SUBJECT action. Repo volumes land ON him
    and pile around his head and shoulders, two deep, so they stay clear of the
    header band. */
export const HeadStack: React.FC<{ f: number; x: number; y: number; size: number;
  at: number[]; z?: number; lean?: number }> =
  ({ f, x, y, size, at, z = 60, lean = 0 }) => {
  const base = headTop(y, size);
  /* ⛔ they must not cover his FACE — the reaction is the point of the shot. The
     seats sit on his shoulders and out to the sides, none across the eye line. */
  const SEAT: Array<[number, number, number]> = [
    [-0.34, -0.02, 0.27], [0.34, -0.04, 0.27],
    [-0.56, -0.16, 0.24], [0.56, -0.14, 0.24],
    [-0.24, -0.26, 0.25], [0.28, -0.29, 0.25],
  ];
  return (<>
    {at.map((a, i) => {
      const k = E(f, a, a + 9, 0, 1, IN_Q);
      if (k <= 0) return null;
      const [ox, oy, sc] = SEAT[i % SEAT.length];
      const W = size * sc;
      const rx = x + ox * size;
      const rest = base + oy * size;
      const yy = rest - (1 - k) * 640;
      return (
        <Volume key={"hs" + i} x={rx} y={yy} w={W} z={z + i} hue={i}
          rot={rockAt(f, a + 9, 7) + lean * (i + 1) * 0.4 + (i % 2 ? 12 : -12)}
          sq={squashAt(f, a + 9, 0.26)} />
      );
    })}
    {at.map((a, i) => {
      const [ox, oy] = SEAT[i % SEAT.length];
      return f >= a + 9 && f < a + 26 ? (
        <React.Fragment key={"hp" + i}>
          <Puff x={x + ox * size} y={base + oy * size} f={f} at={a + 9} n={6} s={1.0} c="#C8B48A" />
          <Ring x={x + ox * size} y={base + oy * size} f={f} at={a + 9} max={size * 0.46} c="#FFE6B4" />
        </React.Fragment>
      ) : null;
    })}
  </>);
};

/** the pile BLOWN OFF him — the release, and the biggest main-subject event in the
    open. Radial, fast, and every piece is a drawn volume tumbling open. */
export const StackBurst: React.FC<{ f: number; x: number; y: number; size: number;
  at: number; n?: number; z?: number }> = ({ f, x, y, size, at, n = 9, z = 66 }) => {
  const base = headTop(y, size);
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const k = E(f, at, at + 30, 0, 1, OUT);
      if (k <= 0 || k >= 1) return null;
      const ang = -Math.PI * (0.12 + (i / (n - 1)) * 0.76);
      const d = 300 + (i % 3) * 120;
      return (
        <Volume key={"sb" + i} x={x + Math.cos(ang) * d * k}
          y={base - Math.sin(ang) * d * k * 0.72 + k * k * 300 + size * 0.16}
          w={size * 0.30} z={z} hue={i} open={0.2 + k * 0.6}
          rot={(i % 2 ? 1 : -1) * k * 420} />
      );
    })}
    {f >= at && <Ring x={x} y={base} f={f} at={at} max={size * 1.5} c="#FFF0C8" />}
  </>);
};

/* =========================================================================
   ⭐⭐ THE REBUILT PROPS.  Alex: *"the animations throughout are still way too
   boring, especially between 1-3"* and *"even number 6, it's just a big rectangle
   and too many lines."*

   Both notes are the same defect and it is the one he taught me two rounds ago:
   the motion was in the FURNITURE. Every prop below exists so that a CLAUDE can
   physically operate it — a ledger he binds, a wheel he spins, a door he kicks.
   ====================================================================== */

/** ⭐ THE CURSOR. Alex, on the paste beat: *"it should show like a click, large
    mouse cursor clicking it to change the color, not just randomly changing
    colour."* He is right that a state that changes by itself has no cause on
    screen — §2's "an event needs a TRIGGER". This is a big drawn arrow pointer
    with a real click: it travels in, presses down with a squash, and throws two
    rings. Nothing changes colour until it lands. */
export const Cursor: React.FC<{ f: number; fromX: number; fromY: number; x: number; y: number;
  at: number; travel?: number; z?: number; s?: number }> =
  ({ f, fromX, fromY, x, y, at, travel = 18, z = 96, s = 1 }) => {
  const k = E(f, at - travel, at, 0, 1, IO);
  if (k <= 0) return null;
  const cx = fromX + (x - fromX) * k, cy = fromY + (y - fromY) * k;
  const lf = f - at;
  const press = lf >= 0 && lf < 9 ? Math.sin((lf / 9) * Math.PI) : 0;
  const W = 62 * s, H = 92 * s;
  return (<>
    {/* the click rings, thrown on the press */}
    {lf >= 0 && <><Ring x={x} y={y} f={f} at={at} max={190 * s} c="#FFFFFF" />
      <Ring x={x} y={y} f={f} at={at + 3} max={140 * s} c="#FFE6B4" /></>}
    <div style={{ position: "absolute", left: cx, top: cy, zIndex: z,
      transform: `scale(${1 - press * 0.18}) rotate(${-press * 6}deg)`,
      transformOrigin: "0% 0%" }}>
      {/* the pointer: a white arrow with a heavy ink outline, drawn as a polygon
          so it reads as a real cursor and not a triangle */}
      <div style={{ position: "absolute", width: W, height: H,
        background: "#1A1813",
        clipPath: "polygon(0% 0%, 0% 78%, 22% 61%, 38% 96%, 58% 88%, 42% 54%, 74% 52%)" }} />
      <div style={{ position: "absolute", left: 4 * s, top: 4 * s, width: W - 8 * s, height: H - 8 * s,
        background: "#FFFFFF",
        clipPath: "polygon(0% 0%, 0% 76%, 23% 60%, 39% 94%, 55% 87%, 40% 53%, 71% 51%)" }} />
    </div>
  </>);
};

/** ITEM 1 · THE LEDGER the subconscious binds while you sleep. It THICKENS: the
    page block grows, the boards spread, and the clasp closes when it is full. */
export const Ledger: React.FC<{ x: number; groundY: number; fill: number; z?: number;
  open?: boolean }> = ({ x, groundY, fill, z = 46, open = true }) => {
  const W = 214, H = 74 + fill * 168;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: groundY - H - 96, width: W,
      height: H, zIndex: z }}>
      {/* the lectern it rests on */}
      <div style={{ position: "absolute", left: 22, top: H, width: W - 44, height: 22,
        background: "#5A4028", border: "5px solid #33240F", borderRadius: 4 }} />
      <div style={{ position: "absolute", left: W / 2 - 16, top: H + 22, width: 32, height: 74,
        background: "#4A3520", border: "5px solid #33240F" }} />
      <div style={{ position: "absolute", left: W / 2 - 62, top: H + 92, width: 124, height: 16,
        background: "#5A4028", border: "5px solid #33240F", borderRadius: 4 }} />
      {/* the page block — this is what grows */}
      <div style={{ position: "absolute", left: 10, top: 8, width: W - 20, height: H - 8,
        background: "#F2E8D0", border: "3px solid #C8B48A", borderRadius: 3 }} />
      {Array.from({ length: Math.max(2, Math.round(fill * 12)) }, (_, i) => (
        <div key={"pg" + i} style={{ position: "absolute", left: 14, right: 14,
          top: 14 + i * ((H - 24) / Math.max(2, Math.round(fill * 12))),
          height: 3, background: "#D2C2A0" }} />
      ))}
      {/* the two boards */}
      {/* the boards stand proud of the page block, and the spine has bands */}
      {[0, 1].map((i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: i ? W - 34 : 0, top: -6,
          width: 34, height: H + 18, borderRadius: 4,
          background: `linear-gradient(90deg, #7E3B2E 0%, #4A2018 100%)`,
          border: "5px solid #33140E" }} />
      ))}
      {[0.22, 0.48, 0.74].map((t, i) => (
        <div key={"sb" + i} style={{ position: "absolute", left: -2, top: (H + 18) * t - 6,
          width: 38, height: 10, background: "#33140E" }} />
      ))}
      {/* the clasp, which closes when it is full */}
      <div style={{ position: "absolute", left: W / 2 - 26, top: fill > 0.92 ? H * 0.42 : -14,
        width: 52, height: 26, borderRadius: 4, background: "#C8922E", border: "4px solid #8A6014" }} />
      <div style={{ position: "absolute", left: W / 2 - 15, top: 4, width: 30, height: 30,
        borderRadius: 7, background: "#FFFFFF", display: "flex", alignItems: "center",
        justifyContent: "center", opacity: fill > 0.2 ? 1 : 0 }}>
        <Img src={staticFile(GH)} style={{ width: 20, height: 20, objectFit: "contain" }} />
      </div>
    </div>
  );
};

/** ITEM 3 · THE INDEX CAROUSEL — a huge rotating rack of volumes a Claude SPINS
    and then snatches from. Replaces the split-flap board: a wheel is a thing a
    character can operate, a sign is a thing that changes by itself. */
export const Carousel: React.FC<{ f: number; x: number; y: number; r: number; spin: number;
  z?: number; taken?: number[] }> = ({ f, x, y, r, spin, z = 40, taken = [] }) => {
  const N = 14;
  return (<>
    {/* the hub, the spokes and the rim */}
    <div style={{ position: "absolute", left: x - r - 26, top: y - r - 26, width: (r + 26) * 2,
      height: (r + 26) * 2, borderRadius: "50%", zIndex: z,
      border: "14px solid #5A4028", background: "rgba(30,20,12,0.30)" }} />
    <div style={{ position: "absolute", left: x - 34, top: y - 34, width: 68, height: 68,
      borderRadius: "50%", zIndex: z + 3, background: "#7A5A34", border: "8px solid #33240F" }} />
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"sk" + i} style={{ position: "absolute", left: x - 5, top: y - r, width: 10,
        height: r, zIndex: z + 1, background: "#5A4028", transformOrigin: "50% 100%",
        transform: `rotate(${spin + i * 60}deg)` }} />
    ))}
    {Array.from({ length: N }, (_, i) => {
      if (taken.includes(i)) return null;
      const a = ((spin + i * (360 / N)) * Math.PI) / 180;
      return (
        <Volume key={"cv" + i} x={x + Math.cos(a) * r} y={y + Math.sin(a) * r + 46}
          w={78} z={z + 2} hue={i} rot={(spin + i * (360 / N)) + 90} />
      );
    })}
  </>);
};

/** ITEM 6 · THE CORRIDOR OF DOORS — replaces the "big rectangle with too many
    lines". A page is a DOOR: panels, a rail, a handle, hinges, a number plate. A
    Claude kicks them open one after another and hauls the contents out. */
export const DoorRow: React.FC<{ f: number; y: number; open: number[]; z?: number;
  n?: number; x0?: number; gap?: number }> =
  ({ f, y, open, z = 34, n = 5, x0 = 60, gap = 200 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const x = x0 + i * gap;
      const oa = open[i] !== undefined ? E(f, open[i], open[i] + 9, 0, 1, OUT) : 0;
      const W = 168, H = 300;
      return (
        <React.Fragment key={"dr" + i}>
          {/* the frame and the lit doorway behind it */}
          <div style={{ position: "absolute", left: x - 12, top: y - 12, width: W + 24,
            height: H + 12, background: "#3A2A1C", border: "6px solid #241A10",
            borderRadius: 5, zIndex: z }} />
          <div style={{ position: "absolute", left: x, top: y, width: W, height: H, zIndex: z + 1,
            background: oa > 0.1
              ? "linear-gradient(180deg, #FFE6B4 0%, #C8923E 100%)"
              : "#1A120A" }} />
          {/* the door leaf, swinging on its hinge */}
          <div style={{ position: "absolute", left: x, top: y, width: W, height: H, zIndex: z + 2,
            transformOrigin: "0% 50%",
            transform: `perspective(760px) rotateY(${-oa * 82}deg)`,
            background: "linear-gradient(96deg, #8A5A32 0%, #6E4526 46%, #5A3720 100%)",
            border: "6px solid #33200F", borderRadius: 4 }}>
            {[0.08, 0.55].map((t, q) => (
              <div key={"pn" + q} style={{ position: "absolute", left: 20, right: 20,
                top: H * t + 10, height: H * 0.34, border: "5px solid #4A2E18",
                borderRadius: 3, background: "rgba(0,0,0,0.10)" }} />
            ))}
            <div style={{ position: "absolute", left: W - 34, top: H / 2 - 8, width: 20,
              height: 16, borderRadius: 4, background: "#C8922E", border: "3px solid #8A6014" }} />
            {[0.16, 0.84].map((t, q) => (
              <div key={"hi" + q} style={{ position: "absolute", left: -4, top: H * t,
                width: 12, height: 30, background: "#33200F", borderRadius: 2 }} />
            ))}
            <div style={{ position: "absolute", left: W / 2 - 22, top: 22, width: 44, height: 26,
              borderRadius: 4, background: "#E8DCBE", border: "3px solid #33200F",
              display: "flex", alignItems: "center", justifyContent: "center",
              ...mono(16, 800), color: "#33200F" }}>{i + 1}</div>
          </div>
        </React.Fragment>
      );
    })}
  </>);

/* =========================================================================
   S3-S4 · THE ARCHIVE — session tapes travelling up a wire into drawers, and
   the LIT FRACTION of the wall climbing. The accumulator is the output half.
   ====================================================================== */
export const SessionTape: React.FC<{ f: number; at: number; fromX: number; fromY: number;
  toX: number; toY: number; z?: number; c?: string }> =
  ({ f, at, fromX, fromY, toX, toY, z = 52, c = AMBER }) => {
  const k = E(f, at, at + 20, 0, 1, IO);
  if (k <= 0) return null;
  const x = fromX + (toX - fromX) * k;
  const y = fromY + (toY - fromY) * k - Math.sin(k * Math.PI) * 74;
  if (k >= 1) return null;
  return (
    <div style={{ position: "absolute", left: x - 52, top: y - 33, width: 104, height: 66,
      zIndex: z, borderRadius: 4, background: c, border: `3px solid ${dkh(c, 0.3)}`,
      transform: `rotate(${k * 220}deg)` }}>
      <div style={{ position: "absolute", left: 7, top: 11, width: 12, height: 12,
        borderRadius: "50%", background: dkh(c, 0.36) }} />
      <div style={{ position: "absolute", left: 33, top: 11, width: 12, height: 12,
        borderRadius: "50%", background: dkh(c, 0.36) }} />
      <div style={{ position: "absolute", left: 7, top: 4, right: 7, height: 4,
        background: mxh(c, 0.3) }} />
    </div>
  );
};

/** the drawer wall's LIT fraction — the visible accumulator. `on` drawers glow
    from within, and the count climbs across the scene. */
export const DrawerLight: React.FC<{ f: number; on: number[]; z?: number }> =
  ({ f, on, z = 20 }) => (<>
    {on.map((i) => {
      const r = Math.floor(i / 9), q = i % 9;
      return (
        <div key={"dl" + i} style={{ position: "absolute", left: 64 + q * 106, top: 44 + r * 70,
          width: 96, height: 60, zIndex: z, borderRadius: 4,
          background: `linear-gradient(180deg, ${hexa("#FFD59A", 0.86)} 0%, ${hexa("#E09A4A", 0.62)} 100%)`,
          border: "3px solid #FFE6B4" }}>
          <div style={{ position: "absolute", left: 30, top: 24, width: 36, height: 8,
            borderRadius: 3, background: "#8A6A32" }} />
        </div>
      );
    })}
  </>);

/** the rolling ladder — the travelling band of the archive, and the second
    Claude rides it. Light AND shadow as it crosses the lamp cones. */
export const Ladder: React.FC<{ f: number; x: number; groundY: number; z?: number }> =
  ({ f, x, groundY, z = 34 }) => (
  <div style={{ position: "absolute", left: x - 46, top: 60, width: 92, height: groundY - 60,
    zIndex: z }}>
    {[0, 78].map((dx, i) => (
      <div key={"rail" + i} style={{ position: "absolute", left: dx, top: 0, width: 14,
        bottom: 0, background: "linear-gradient(90deg, #6E5A34 0%, #4A3C20 100%)",
        border: "2px solid #33290F" }} />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"rung" + i} style={{ position: "absolute", left: 8, top: 42 + i * 52,
        width: 76, height: 11, background: "#5A4A28", border: "2px solid #33290F",
        borderRadius: 2 }} />
    ))}
    {/* the top wheel on the rail */}
    <div style={{ position: "absolute", left: -6, top: -18, width: 104, height: 22,
      background: "#4A3C20", border: "3px solid #33290F", borderRadius: 4 }} />
    {[6, 74].map((dx, i) => (
      <div key={"wh" + i} style={{ position: "absolute", left: dx, top: -14,
        width: 22, height: 22, borderRadius: "50%", background: "#8A7440",
        border: "3px solid #33290F" }} />
    ))}
  </div>
);

/* =========================================================================
   S5-S6 · THE LINE — a full-width conveyor and FIVE stations. The block
   visibly changes SHAPE at each station: five discrete stamps, never a tween.
   ====================================================================== */
export const STATION_X = [150, 320, 506, 692, 862];

/** the block being built, one silhouette per station passed */
export const WorkBlock: React.FC<{ f: number; x: number; y: number; stage: number;
  z?: number; hit?: number }> = ({ f, x, y, stage, z = 50, hit = -99 }) => {
  const sq = squashAt(f, hit, 0.22);
  const rk = rockAt(f, hit, 4);
  const w = 96 + stage * 15, h = 74 + stage * 11;
  const c = [ "#7A7368", "#8A7E5E", "#9A8A50", "#B09A4A", CLAY, GREEN ][Math.min(5, stage)];
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h,
      zIndex: z, transform: `rotate(${rk}deg) scaleY(${sq}) scaleX(${2 - sq})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 + stage * 2,
        background: `linear-gradient(176deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.16)} 100%)`,
        border: `5px solid ${dkh(c, 0.34)}` }} />
      {/* the machined faces that appear as it is worked */}
      {Array.from({ length: Math.min(4, stage) }, (_, j) => (
        <div key={"fc" + j} style={{ position: "absolute", left: 9 + j * 5, top: 10 + j * 13,
          right: 9 + j * 5, height: 9, borderRadius: 2, background: dkh(c, 0.30) }} />
      ))}
      {stage >= 5 && (
        <div style={{ position: "absolute", left: w / 2 - 17, top: h / 2 - 17, width: 34, height: 34,
          borderRadius: 8, background: "#FFFFFF", display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile(GH)} style={{ width: 24, height: 24, objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
};

/** a station: a press head that comes DOWN on the beat and recoils */
export const Station: React.FC<{ f: number; x: number; y: number; at: number; i: number;
  z?: number }> = ({ f, x, y, at, i, z = 42 }) => {
  const k = f - at;
  const drop = k >= 0 && k < 16 ? Math.sin(Math.min(1, k / 16) * Math.PI) * 74 : 0;
  return (<>
    {/* the frame */}
    <div style={{ position: "absolute", left: x - 62, top: y - 250, width: 124, height: 60,
      zIndex: z, background: "linear-gradient(180deg, #4E7276 0%, #2E5256 100%)",
      border: "5px solid #1E4044", borderRadius: 6 }} />
    <div style={{ position: "absolute", left: x - 12, top: y - 194 + drop, width: 24,
      height: 68, zIndex: z, background: "#3E6266", border: "4px solid #1E4044" }} />
    {/* the head */}
    <div style={{ position: "absolute", left: x - 46, top: y - 130 + drop, width: 92, height: 46,
      zIndex: z + 1, borderRadius: 5,
      background: "linear-gradient(180deg, #CFEDEE 0%, #6E9A9E 100%)",
      border: "5px solid #1E4044" }}>
      <div style={{ position: "absolute", left: 10, top: 10, right: 10, height: 7,
        background: hexa("#1E4044", 0.4) }} />
    </div>
    {drop > 40 && <Ring x={x} y={y - 74} f={f} at={at + 7} max={110} c="#CFEDEE" />}
  </>);
};

/* =========================================================================
   S7-S8 · THE INDEX HALL — a colossal SPLIT-FLAP board. §4's depiction of "a
   headline": cells flipping letter by letter, which is a large high-contrast
   element changing per frame = exactly what the audit rewards.
   ====================================================================== */
const GLYPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ·";

export const SplitFlapRow: React.FC<{ f: number; y: number; text: string; at: number;
  x?: number; cw?: number; z?: number; speed?: number; churn?: number }> =
  ({ f, y, text, at, x = 92, cw = 108, z = 40, speed = 3.4, churn = 0 }) => (<>
    {text.split("").map((ch, i) => {
      const start = at + i * 3.2;
      /* ⛔⛔ INDEX MEASURED 4.97 — THE WORST SCENE IN THE REEL — AND IT IS THE ONE
         WITH THE MOST THINGS MOVING. Diagnosis: every cell settled after 9 frames
         and then HELD (93% hold), and only one row was ever resolving at a time,
         so the board spent most of its duration as a poster of itself.
         ⭐ A REAL DEPARTURE BOARD NEVER FULLY RESTS. `churn` re-flips a
         deterministic subset of already-settled cells forever, so the board keeps
         repainting large high-contrast area for the whole scene instead of
         arriving and stopping. Deterministic (no Math.random) — re-renders are
         identical. */
      const settledAt = start + 9;
      let settled = f >= settledAt;
      let spinning = !settled && f >= start;
      if (settled && churn > 0) {
        /* each cell takes a short re-flip on its own clock */
        const period = 128 + ((i * 31) % 67);   /* rare, so the word stays readable */
        const phase = (f - settledAt + i * 13) % period;
        if (phase < churn) { settled = false; spinning = true; }
      }
      const spin = Math.max(0, Math.floor((f - start) * speed));
      const shown = settled ? ch : (spinning ? GLYPH[(spin + i * 5) % GLYPH.length] : " ");
      const flip = spinning ? Math.abs(Math.sin((f - start) * 1.15)) : 0;
      return (
        /* ⭐⭐⭐ THE FLIPPING FACE IS BRIGHT. Churn alone took INDEX from 4.97 to
           only 5.27, and the formula says why: motion ~= swept area x LUMA DELTA,
           and a dark cell flipping to another dark cell repaints area at almost
           zero delta. A real split-flap shows the pale CARD FACE as it rotates —
           so a flipping cell is cream and a settled cell is dark, and every flip
           is a large light-against-shadow repaint. Same lesson as reel 106's
           travelling band: you cannot have the shafts without the dark between
           them, and the delta is where the score lives. */
        <div key={"sf" + i} style={{ position: "absolute", left: x + i * cw, top: y,
          width: cw - 10, height: cw * 1.26, zIndex: z, borderRadius: 7,
          background: spinning
            ? `linear-gradient(180deg, #FBF3DC 0%, #E0C489 100%)`
            : `linear-gradient(180deg, #2A2216 0%, #171208 100%)`,
          border: "5px solid #4A3A1E", overflow: "hidden",
          transform: `scaleY(${1 - flip * 0.62})`, transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", ...ui(cw * 0.74, 900), color: settled ? "#FFDE9E" : "#241C0C" }}>
            {shown}
          </div>
          {/* the hinge line down the middle — what makes it a SPLIT flap */}
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 6,
            background: "#0C0A06" }} />
        </div>
      );
    })}
  </>);

/** the plugin cartridge that drops down the chute and seats ITSELF */
export const Cartridge: React.FC<{ f: number; at: number; x: number; toY: number;
  fromY?: number; z?: number; c?: string }> =
  ({ f, at, x, toY, fromY = -80, z = 54, c = GOLD }) => {
  const k = E(f, at, at + 14, 0, 1, IN_Q);
  if (k <= 0) return null;
  const y = fromY + (toY - fromY) * k;
  const land = at + 14;
  const sq = squashAt(f, land, 0.28);
  return (<>
    <div style={{ position: "absolute", left: x - 75, top: y - 104, width: 150, height: 104,
      zIndex: z, transform: `scaleY(${sq}) scaleX(${2 - sq}) rotate(${rockAt(f, land, 5)}deg)`,
      transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 6,
        background: `linear-gradient(178deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.2)} 100%)`,
        border: `4px solid ${dkh(c, 0.36)}` }} />
      {/* the contact fingers along the bottom — what makes it a cartridge */}
      {Array.from({ length: 5 }, (_, j) => (
        <div key={"cf" + j} style={{ position: "absolute", left: 12 + j * 15, bottom: 4,
          width: 9, height: 13, background: dkh(c, 0.44), borderRadius: 2 }} />
      ))}
      <div style={{ position: "absolute", left: 30, top: 12, width: 32, height: 32,
        borderRadius: 7, background: "#FFFFFF", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile(GH)} style={{ width: 22, height: 22, objectFit: "contain" }} />
      </div>
    </div>
    {f >= land && <Ring x={x} y={toY} f={f} at={land} max={120} c="#FFDE9E" />}
  </>);
};

/* =========================================================================
   S9-S11 · THE THREE BENCHES. Each bench PRODUCES something that LEAVES it —
   §10's missing half: an arrival needs an output.
   ====================================================================== */
export const BENCH_X = [196, 506, 816];

export const Bench: React.FC<{ x: number; groundY: number; z?: number; lit?: boolean }> =
  ({ x, groundY, z = 30, lit = true }) => (
  <div style={{ position: "absolute", left: x - 148, top: groundY - 82, width: 296, height: 82,
    zIndex: z }}>
    {/* the top slab */}
    <div style={{ position: "absolute", left: -14, top: 0, width: 324, height: 34, borderRadius: 5,
      background: lit ? "linear-gradient(180deg, #E4D2AA 0%, #8A7A5A 100%)"
                      : "linear-gradient(180deg, #6A6252 0%, #46402F 100%)",
      border: "5px solid #3A3324" }} />
    {/* the apron and the two legs */}
    <div style={{ position: "absolute", left: 12, top: 30, width: 272, height: 16,
      background: lit ? "#7A6C50" : "#443E30" }} />
    {[18, 244].map((dx, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: dx, top: 46, width: 34, height: 40,
        background: lit ? "#5E5440" : "#38321F", border: "3px solid #3A3324" }} />
    ))}
    {/* the vice at the left end — a real fitting */}
    <div style={{ position: "absolute", left: -18, top: -22, width: 48, height: 44,
      background: lit ? "#9A9488" : "#4E4A42", border: "4px solid #3A3628", borderRadius: 3 }} />
    <div style={{ position: "absolute", left: -24, top: 6, width: 15, height: 32,
      background: "#3A3628", borderRadius: 3 }} />
  </div>
);

/** what a bench THROWS OUT — the output that proves work happened */
export const Output: React.FC<{ f: number; at: number; fromX: number; fromY: number;
  toX: number; toY: number; kind: 0 | 1 | 2; z?: number }> =
  ({ f, at, fromX, fromY, toX, toY, kind, z = 56 }) => {
  const k = E(f, at, at + 18, 0, 1, IO);
  if (k <= 0 || k >= 1) return null;
  const x = fromX + (toX - fromX) * k;
  const y = fromY + (toY - fromY) * k - Math.sin(k * Math.PI) * 96;
  const c = kind === 0 ? CLAY : kind === 1 ? GREEN : SKY;
  const s = 168;
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s,
      zIndex: z, transform: `rotate(${k * 260}deg)` }}>
      {kind === 1 ? (
        /* a green TEST tick — a real check, drawn */
        <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: c,
          border: `6px solid ${dkh(c, 0.3)}` }}>
          <div style={{ position: "absolute", left: 32, top: 64, width: 34, height: 13,
            background: "#EAF6EE", transform: "rotate(45deg)" }} />
          <div style={{ position: "absolute", left: 50, top: 50, width: 56, height: 13,
            background: "#EAF6EE", transform: "rotate(-52deg)" }} />
        </div>
      ) : (
        <div style={{ position: "absolute", inset: 0, borderRadius: kind === 0 ? 12 : 34,
          background: `linear-gradient(178deg, ${mxh(c, 0.2)} 0%, ${dkh(c, 0.18)} 100%)`,
          border: `6px solid ${dkh(c, 0.34)}` }}>
          <div style={{ position: "absolute", left: 20, top: 30, right: 20, height: 13,
            background: dkh(c, 0.3) }} />
          <div style={{ position: "absolute", left: 20, top: 66, right: 45, height: 13,
            background: dkh(c, 0.3) }} />
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   S12-S13 · THE GAUGE — a colossal bloated block sheared by FOUR principle
   stamps. ⛔ Four DISCRETE pops, never one smooth shrink (4.27 vs 5.63).
   ⛔ The four principle NAMES ride the header band; the picture carries only
      the stamp MARKS and the shrinking silhouette. No 1000, no 100.
   ====================================================================== */
export const BloatBlock: React.FC<{ f: number; x: number; groundY: number; cut: number;
  hitAt?: number; z?: number }> = ({ f, x, groundY, cut, hitAt = -99, z = 46 }) => {
  /* ⛔⛔ REDRAWN. Alex: *"the paper thing at 43 seconds needs to have stuff on it,
     like some graphic or something, so it's not just lines on the paper."* He is
     right — a cream slab with horizontal rules is a CONTAINER for the idea "a
     file", not a picture of one. This is a real document now: a title bar with a
     filename chip and traffic lights, a line-number gutter, syntax-coloured
     tokens at real indent depths, brace pairs, a highlighted block and a
     scrollbar. And it does not just SHRINK as the four principles land — the
     content THINS: the deep nesting unwinds, the noisy comment blocks go, and the
     token colours settle from a jumble to two. */
  const W0 = 760, H0 = 466;
  const w = W0 - cut * 136, h = H0 - cut * 76;
  const sq = squashAt(f, hitAt, 0.16);
  const rk = rockAt(f, hitAt, 3.2);
  const clean = cut >= 4;
  const rows = Math.max(6, 22 - cut * 4);
  const gut = Math.max(22, w * 0.075);
  /* the palette settles as it is cut: a bloated file is a jumble, a clean one is
     two colours and a lot of air */
  const TOK = clean
    ? ["#4A6E88", "#2E5A44", "#6E6656"]
    : ["#4A6E88", "#2E5A44", "#8A5A24", "#7E3B2E", "#5E3A56", "#6E6656"];
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: groundY - h, width: w, height: h,
      zIndex: z, transform: `rotate(${rk}deg) scaleY(${sq}) scaleX(${2 - sq})`,
      transformOrigin: "50% 100%" }}>
      {/* the sheet */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8,
        background: `linear-gradient(176deg, ${clean ? "#FFFFFF" : "#F4EEDC"} 0%, ${clean ? "#E8F0F6" : "#DCD2B8"} 100%)`,
        border: `${Math.max(5, w * 0.011)}px solid ${clean ? "#41637C" : "#8A7A54"}` }} />
      {/* the title bar, with traffic lights and a filename chip */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.13,
        background: clean ? "#DCE8F0" : "#CFC2A0",
        borderBottom: `${Math.max(3, w * 0.006)}px solid ${clean ? "#41637C" : "#8A7A54"}`,
        borderRadius: "6px 6px 0 0" }}>
        {[0, 1, 2].map((i) => (
          <div key={"tl" + i} style={{ position: "absolute", left: w * 0.03 + i * w * 0.035,
            top: h * 0.045, width: Math.max(6, w * 0.020), height: Math.max(6, w * 0.020),
            borderRadius: "50%",
            background: ["#C4685A", "#D2A64C", "#5CA37A"][i] }} />
        ))}
        <div style={{ position: "absolute", left: w * 0.17, top: h * 0.028, width: w * 0.42,
          height: h * 0.072, borderRadius: 4, background: clean ? "#FFFFFF" : "#E8DEC4",
          border: `2px solid ${clean ? "#9AB4C8" : "#A89870"}`,
          display: "flex", alignItems: "center", paddingLeft: w * 0.02,
          ...mono(Math.max(9, w * 0.030), 800), color: "#3A3428" }}>CLAUDE.md</div>
      </div>
      {/* the line-number gutter */}
      <div style={{ position: "absolute", left: 0, top: h * 0.13, width: gut, bottom: 0,
        background: clean ? "#EAF2F8" : "#E4DAC0",
        borderRight: `2px solid ${clean ? "#B4C8D8" : "#B8A87C"}` }} />
      {/* the code itself: real indent depths, brace pairs, coloured tokens */}
      {Array.from({ length: rows }, (_, i) => {
        const ry = h * 0.16 + i * ((h * 0.80) / rows);
        const lh = Math.max(3, (h * 0.80 / rows) * 0.44);
        /* a bloated file nests deep and ragged; a cut one is shallow and even */
        const depth = clean ? (i % 3 === 0 ? 0 : 1) : ((i * 7) % 5);
        const ind = gut + 10 + depth * (w * 0.055);
        const segs = clean ? 2 : 2 + ((i * 3) % 3);
        let sx = ind;
        return (
          <React.Fragment key={"ln" + i}>
            <div style={{ position: "absolute", left: 4, top: ry, width: gut - 10, height: lh,
              borderRadius: 2, background: clean ? "#B4C8D8" : "#BCAC84" }} />
            {Array.from({ length: segs }, (_, q) => {
              const sw = (w - ind - 24) * (0.16 + ((i * 5 + q * 3) % 7) / 18);
              const el = sx; sx += sw + w * 0.018;
              if (el + sw > w - 14) return null;
              return (
                <div key={"tk" + q} style={{ position: "absolute", left: el, top: ry,
                  width: sw, height: lh, borderRadius: 2,
                  background: hexa(TOK[(i * 2 + q) % TOK.length], clean ? 0.85 : 0.66) }} />
              );
            })}
            {/* the brace that closes a nested block — what makes it read as CODE */}
            {!clean && depth > 2 && (
              <div style={{ position: "absolute", left: ind - w * 0.030, top: ry,
                width: Math.max(3, w * 0.012), height: lh,
                background: "#8A5A24" }} />
            )}
          </React.Fragment>
        );
      })}
      {/* a highlighted block — the bit the principles are about */}
      {!clean && (
        <div style={{ position: "absolute", left: gut + 8, top: h * 0.42, right: w * 0.10,
          height: h * 0.20, background: hexa("#C4683A", 0.16),
          border: `2px solid ${hexa("#C4683A", 0.40)}`, borderRadius: 4 }} />
      )}
      {/* the scrollbar — a long file has a short thumb, a clean one has none */}
      {!clean && (
        <div style={{ position: "absolute", right: 5, top: h * 0.16, width: Math.max(5, w * 0.014),
          bottom: 8, borderRadius: 4, background: hexa("#8A7A54", 0.22) }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0,
            height: `${Math.max(14, 60 - cut * 12)}%`, borderRadius: 4, background: "#8A7A54" }} />
        </div>
      )}
      {clean && (
        <div style={{ position: "absolute", left: w / 2 - w * 0.09, top: h * 0.70,
          width: w * 0.18, height: w * 0.18, borderRadius: w * 0.04, background: "#FFFFFF",
          border: `${Math.max(2, w * 0.010)}px solid #41637C`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(GH)} style={{ width: w * 0.11, height: w * 0.11, objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
};

/** a principle STAMP coming down — the trigger for each discrete shear */
export const Stamp: React.FC<{ f: number; at: number; x: number; y: number; z?: number }> =
  ({ f, at, x, y, z = 60 }) => {
  const k = f - at;
  if (k < -8 || k > 22) return null;
  const drop = k < 0 ? -120 : k < 10 ? -120 + (k / 10) * 120 : Math.sin(((k - 10) / 12) * Math.PI) * -18;
  return (<>
    <div style={{ position: "absolute", left: x - 54, top: y + drop - 92, width: 108, height: 92,
      zIndex: z }}>
      <div style={{ position: "absolute", left: 34, top: 0, width: 40, height: 40,
        background: "#4A5460", border: "4px solid #2E353E", borderRadius: 4 }} />
      <div style={{ position: "absolute", left: 0, top: 38, width: 108, height: 54, borderRadius: 5,
        background: "linear-gradient(180deg, #DCEBFA 0%, #7E96AC 100%)",
        border: "5px solid #41637C" }} />
    </div>
    {k >= 10 && <Ring x={x} y={y} f={f} at={at + 10} max={150} c="#DCEBFA" />}
    {k >= 10 && <Puff x={x} y={y} f={f} at={at + 10} n={7} c="#A8B6C2" />}
  </>);
};

/** ⭐⭐ THE PRESS RAM — the fix for GAUGE, which stayed at 5.72 through TWO passes.
    The travel fix was the wrong diagnosis: the block crosses 1420px in 176
    frames = 24px per 0.1s audit sample, and a large object moving slowly repaints
    only its leading EDGE (24 x 330 = 1% of the panel). The formula wants AREA x
    DELTA, so the event has to be a big FAST area change, not a long slow one.
    This ram is 380px wide and falls 330px in 9 frames — 110px of sweep per
    sample across a third of the panel, four times. */
export const PressRam: React.FC<{ f: number; at: number; x: number; groundY: number;
  hitY?: number; z?: number }> = ({ f, at, x, groundY, hitY, z = 62 }) => {
  const k = f - at;
  if (k < -10 || k > 30) return null;
  const drop = k < 0 ? 0
    : k < 9 ? (k / 9) ** 2
    : k < 18 ? 1 - ((k - 9) / 9) * 0.82
    : 0.18 * Math.max(0, 1 - (k - 18) / 12);
  /* ⛔ LAND THE HEAD ON THE BLOCK. Twice this ram was authored with a topY that
     could not reach its own target — first y 78, then y -82, against a block top
     at 278 — and both times the audit just said "low" rather than "your effect is
     off-screen". It is §6.1: convert every timed effect to the coordinate it has
     to arrive at, and CHECK IT, before believing it exists. */
  const H = 190;
  const land = (hitY ?? groundY - 430) - H;
  const topY = -H - 140 + drop * (land + H + 140);
  return (<>
    {/* the ram column, full height above the head */}
    <div style={{ position: "absolute", left: x - 62, top: -200, width: 124,
      height: topY + 400, zIndex: z - 1,
      background: "linear-gradient(90deg, #39424E 0%, #6E7C88 44%, #2A313A 100%)",
      border: "6px solid #1E242C" }} />
    {/* the head */}
    <div style={{ position: "absolute", left: x - 190, top: topY, width: 380, height: 190,
      zIndex: z, borderRadius: 8,
      background: "linear-gradient(180deg, #DCEBFA 0%, #6E8296 62%, #41505E 100%)",
      border: "9px solid #1E242C" }}>
      {Array.from({ length: 5 }, (_, j) => (
        <div key={"rb" + j} style={{ position: "absolute", left: 22 + j * 68, top: 26,
          width: 44, height: 130, borderRadius: 5, background: "rgba(30,36,44,0.34)" }} />
      ))}
    </div>
    {k >= 9 && <Ring x={x} y={groundY - 40} f={f} at={at + 9} max={330} c="#DCEBFA" />}
    {k >= 9 && <Puff x={x} y={groundY} f={f} at={at + 9} n={11} s={1.5} c="#8A97A4" />}
  </>);
};

/** the sheared slab flying off — the EVIDENCE of what was removed */
export const Shard: React.FC<{ f: number; at: number; x: number; y: number; dir: number;
  z?: number }> = ({ f, at, x, y, dir, z = 44 }) => {
  const k = E(f, at, at + 26, 0, 1, OUT);
  if (k <= 0 || k >= 1) return null;
  return (
    <div style={{ position: "absolute", left: x + dir * 250 * k - 54,
      top: y - 130 * Math.sin(k * Math.PI) + k * 90, width: 108, height: 44, zIndex: z,
      borderRadius: 4, background: "linear-gradient(178deg, #6E6A62 0%, #3A3730 100%)",
      border: "4px solid #2A2822", opacity: 1 - k * 0.35,
      transform: `rotate(${dir * k * 180}deg)` }} />
  );
};

/* =========================================================================
   S14 · THE CONTROL ROOM — a dense page wall and a heavy mechanical ARM that
   NAVIGATES, FILLS, CLICKS and SCRAPES. Four discrete large travels.
   ====================================================================== */
export const PageWall: React.FC<{ f: number; page: number; fill: number; clickAt: number;
  scrape: number; x?: number; y?: number; z?: number }> =
  ({ f, page, fill, clickAt, scrape, x = 506, y = 150, z = 30 }) => {
  const W = 620, H = 400;
  const flash = f - clickAt >= 0 && f - clickAt < 7 ? 1 : 0;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y, width: W, height: H, zIndex: z,
      borderRadius: 8, overflow: "hidden", border: "6px solid #1E4444",
      background: flash ? "#DFF6F6" : "#0E2A2C" }}>
      {/* the browser chrome */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40,
        background: "#163434", borderBottom: "3px solid #1E4444" }}>
        {[16, 40, 64].map((dx, i) => (
          <div key={"tl" + i} style={{ position: "absolute", left: dx, top: 14, width: 13,
            height: 13, borderRadius: "50%",
            background: i === 0 ? "#C4685A" : i === 1 ? "#D2A64C" : "#5CA37A" }} />
        ))}
        <div style={{ position: "absolute", left: 96, top: 10, right: 16, height: 20,
          borderRadius: 5, background: "#0E2224", border: "2px solid #2A5252" }} />
      </div>
      {/* the page CONTENT — dense, and it CHANGES when NAVIGATE fires */}
      {Array.from({ length: 22 }, (_, i) => {
        const seedK = page * 31 + i;
        const wpc = 0.26 + rnd(seedK, 3) * 0.66;
        const isField = i >= 8 && i <= 14 && ((i - 8) % 2 === 0);
        const filled = isField && fill > (i - 8) / 7;
        return (
          <div key={"pl" + i} style={{ position: "absolute", left: 22,
            top: 58 + ((i * 15 - f * 1.9) % 300 + 300) % 300, width: (W - 60) * wpc, height: isField ? 13 : 8,
            borderRadius: 3,
            background: filled ? GREEN : isField ? "#1E4444" : hexa("#6FD3D8", 0.20 + rnd(seedK, 5) * 0.3),
            border: isField ? "2px solid #2A5252" : undefined }} />
        );
      })}
      {/* the button the arm punches */}
      <div style={{ position: "absolute", left: W - 190, top: H - 74, width: 140, height: 44,
        borderRadius: 7, background: flash ? "#FFFFFF" : CYAN,
        border: "4px solid #2A5252", display: "flex", alignItems: "center",
        justifyContent: "center", ...ui(20, 900), color: "#0C1E1E" }}>SUBMIT</div>
      {/* the scrape rake pulling a ribbon out */}
      {scrape > 0 && (
        <div style={{ position: "absolute", left: 22, top: 58, width: W - 60,
          height: (H - 90) * Math.min(1, scrape),
          background: `repeating-linear-gradient(180deg, ${hexa(GREEN, 0.34)} 0px, ${hexa(GREEN, 0.34)} 7px, transparent 7px, transparent 15px)` }} />
      )}
    </div>
  );
};

/** the gantry arm. It is HEAVY: a rail, a carriage, a boom and a head. */
export const Arm: React.FC<{ f: number; x: number; y: number; drop?: number; z?: number }> =
  ({ f, x, y, drop = 0, z = 62 }) => (<>
    {/* the rail it hangs from */}
    <div style={{ position: "absolute", left: -40, right: -40, top: y - 46, height: 20,
      zIndex: z - 2, background: "linear-gradient(180deg, #2A5252 0%, #143030 100%)" }} />
    {/* the carriage */}
    <div style={{ position: "absolute", left: x - 44, top: y - 54, width: 88, height: 38,
      zIndex: z, borderRadius: 5, background: "linear-gradient(180deg, #7FC0C9 0%, #3E7278 100%)",
      border: "4px solid #143030" }}>
      {[10, 60].map((dx, i) => (
        <div key={"cw" + i} style={{ position: "absolute", left: dx, top: -12, width: 18,
          height: 18, borderRadius: "50%", background: "#9ADCE2", border: "3px solid #143030" }} />
      ))}
    </div>
    {/* the boom */}
    <div style={{ position: "absolute", left: x - 11, top: y - 16, width: 22, height: 96 + drop,
      zIndex: z, background: "linear-gradient(90deg, #5E9AA0 0%, #2E5A5E 100%)",
      border: "3px solid #143030" }} />
    {/* the head */}
    <div style={{ position: "absolute", left: x - 34, top: y + 78 + drop, width: 68, height: 34,
      zIndex: z + 1, borderRadius: 5,
      background: "linear-gradient(180deg, #CFF0F2 0%, #5E9AA0 100%)", border: "4px solid #143030" }}>
      <div style={{ position: "absolute", left: 8, top: 26, width: 12, height: 14,
        background: "#143030" }} />
      <div style={{ position: "absolute", left: 48, top: 26, width: 12, height: 14,
        background: "#143030" }} />
    </div>
  </>);

/** the bin the scraped data fills — the OUTPUT half of the mechanism */
export const DataBin: React.FC<{ f: number; x: number; groundY: number; fill: number;
  z?: number }> = ({ f, x, groundY, fill, z = 40 }) => (
  <div style={{ position: "absolute", left: x - 92, top: groundY - 150, width: 184, height: 150,
    zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 6,
      background: "linear-gradient(180deg, #1A3838 0%, #0C1E1E 100%)", border: "6px solid #2A5252" }} />
    <div style={{ position: "absolute", left: 10, right: 10, bottom: 10,
      height: Math.max(0, Math.min(1, fill)) * 124, borderRadius: 4,
      background: `repeating-linear-gradient(180deg, ${GREEN} 0px, ${GREEN} 9px, ${dkh(GREEN, 0.3)} 9px, ${dkh(GREEN, 0.3)} 18px)` }} />
    <div style={{ position: "absolute", left: -8, top: -14, right: -8, height: 20, borderRadius: 4,
      background: "#2A5252", border: "3px solid #143030" }} />
  </div>
);

/* =========================================================================
   S15-S16 · THE CHECKPOINT. The barrier is the hero prop and it is HEAVY:
   a counterweighted boom, a striped arm, a post and a base.
   ====================================================================== */
export const Barrier: React.FC<{ f: number; x: number; groundY: number; angle: number;
  z?: number; c?: string }> = ({ f, x, groundY, angle, z = 60, c = RED }) => (<>
  {/* the post */}
  <div style={{ position: "absolute", left: x - 20, top: groundY - 168, width: 40, height: 168,
    zIndex: z, background: "linear-gradient(90deg, #6E6258 0%, #3A322C 100%)",
    border: "4px solid #241E1A" }} />
  <div style={{ position: "absolute", left: x - 44, top: groundY - 24, width: 88, height: 26,
    zIndex: z, borderRadius: 4, background: "#2E2826", border: "4px solid #241E1A" }} />
  {/* the counterweight */}
  <div style={{ position: "absolute", left: x - 62, top: groundY - 196, width: 44, height: 44,
    zIndex: z + 1, borderRadius: 5, background: "#3A322C", border: "4px solid #241E1A" }} />
  {/* the boom, striped, pivoting */}
  <div style={{ position: "absolute", left: x, top: groundY - 178, width: 470, height: 30,
    zIndex: z + 2, transformOrigin: "0% 50%", transform: `rotate(${angle}deg)`,
    borderRadius: 4, border: "4px solid #241E1A", overflow: "hidden",
    background: `repeating-linear-gradient(45deg, ${c} 0px, ${c} 28px, #F2EEE0 28px, #F2EEE0 56px)` }} />
</>);

/** the loaded COMMIT cart. It has a chassis, four wheels and a real load. */
export const CommitCart: React.FC<{ f: number; x: number; groundY: number; hitAt?: number;
  z?: number }> = ({ f, x, groundY, hitAt = -99, z = 52 }) => {
  const lurch = f - hitAt >= 0 && f - hitAt < 22 ? Math.sin(((f - hitAt) / 22) * Math.PI) * 16 : 0;
  const rk = rockAt(f, hitAt, 4);
  return (
    <div style={{ position: "absolute", left: x - 120, top: groundY - 150, width: 240, height: 150,
      zIndex: z, transform: `rotate(${rk * 0.4}deg)` }}>
      {/* the load — stacked commit blocks, lurching forward on the hit */}
      {Array.from({ length: 6 }, (_, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        return (
          <div key={"ld" + i} style={{ position: "absolute", left: 18 + col * 70 + lurch * (1 + row * 0.4),
            top: 6 + row * 46, width: 62, height: 40, borderRadius: 4,
            background: `linear-gradient(178deg, ${mxh(CLAY, 0.16)} 0%, ${dkh(CLAY, 0.2)} 100%)`,
            border: `3px solid ${dkh(CLAY, 0.36)}` }}>
            <div style={{ position: "absolute", left: 8, top: 9, width: 30, height: 5,
              background: dkh(CLAY, 0.34) }} />
            <div style={{ position: "absolute", left: 8, top: 21, width: 42, height: 5,
              background: dkh(CLAY, 0.34) }} />
          </div>
        );
      })}
      {/* the deck and the frame */}
      <div style={{ position: "absolute", left: 0, top: 100, width: 240, height: 22, borderRadius: 4,
        background: "linear-gradient(180deg, #7A7268 0%, #46403A 100%)", border: "4px solid #2A2622" }} />
      {[26, 176].map((dx, i) => (
        <div key={"wl" + i} style={{ position: "absolute", left: dx, top: 116, width: 42, height: 42,
          borderRadius: "50%", background: "#2E2A26", border: "5px solid #565049",
          transform: `rotate(${f * 7}deg)` }}>
          <div style={{ position: "absolute", left: 16, top: 4, width: 5, height: 30,
            background: "#565049" }} />
        </div>
      ))}
    </div>
  );
};

/** the row of TEST lamps that fire green one by one — N discrete pops */
export const TestLamps: React.FC<{ f: number; x: number; y: number; n?: number; at: number;
  step?: number; z?: number }> = ({ f, x, y, n = 7, at, step = 5, z = 66 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const on = f >= at + i * step;
      const k = on ? E(f, at + i * step, at + i * step + 8, 0, 1, OUT) : 0;
      return (
        <React.Fragment key={"tl" + i}>
          <div style={{ position: "absolute", left: x + i * 112 - 44, top: y - 44,
            width: 88, height: 88, borderRadius: "50%", zIndex: z,
            background: on ? GREEN : "#2E2622", border: `7px solid ${on ? "#1E5E42" : "#1A1614"}`,
            transform: `scale(${1 + k * (1 - k) * 1.4})` }} />
          {on && <Ring x={x + i * 112} y={y} f={f} at={at + i * step} max={150} c="#8FE0B0" />}
        </React.Fragment>
      );
    })}
  </>);

/* =========================================================================
   S18 · THE RACE. ⛔⛔ `X11_BANNED` — this prop draws WORK DONE and never a
   multiplier. LEFT: one paste, seven marks land at once. RIGHT: one crate at a
   time, and only two arrive in the same window.
   ====================================================================== */
export const MarkRow: React.FC<{ f: number; x: number; y: number; n: number; at: number;
  step?: number; s?: number; z?: number }> =
  ({ f, x, y, n, at, step = 3, s = 1, z = 70 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const k = E(f, at + i * step, at + i * step + 8, 0, 1, OUT);
      if (k <= 0) return null;
      return (
        <div key={"mr" + i} style={{ position: "absolute", left: x + i * 118 * s, top: y - (1 - k) * 76,
          width: 104 * s, height: 104 * s, borderRadius: 20 * s, zIndex: z, opacity: k,
          background: "#FFFFFF", border: `3px solid #E8DCC0`, boxShadow: SH,
          transform: `scale(${0.7 + k * 0.3})`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(GH)} style={{ width: 68 * s, height: 68 * s, objectFit: "contain" }} />
        </div>
      );
    })}
  </>);
