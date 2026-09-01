import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  mono, ui, vivid, lerpHex,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, MAG, INDIGO, BONE,
  FIVERR, UPWORK, R,
} from "./BuildWorld";

/* ===========================================================================
   REEL 133 · "BUILD" — THE PROPS.  Board: storyboards/133-build.md.

   ⛔⛔ EVERY OBJECT IN HERE IS DRAWN, NOT STACKED. `memory/reel-draw-dont-stack`:
   stacked CSS divs render MANUFACTURED faces fine (a shutter, a counter, a
   split-flap, a machine cabinet all read) and cannot draw anything organic or
   tapered — those are ONE inline <svg> with real paths. Both kinds are checked
   against the SILHOUETTE TEST: flat black on white, nameable from the outline.

   ⛔⛔ VALUE SEPARATION, NOT HUE. Every object that HOLDS, CARRIES or RECEIVES
   something differs from its room in BOTH hue and value, and reads while it is
   still EMPTY — because empty is the promise (reel 110's DONE crate, reel 108's
   empty bay).

   ⛔ GREY + RECTANGULAR is the named boring combination (§20, §23). Nothing in
   here is both: every rectilinear machine carries saturated paint, a lit face,
   and real fittings.

   ⛔ NOTHING LANDS AND SIMPLY STOPS. Every arrival gets a squash, a recoil or a
   damped oscillation that never quite settles.
   ========================================================================= */

/* =========================================================================
   THE SHARED VOCABULARY — the fittings every machine on this row is built from
   ====================================================================== */

/** a machine's lit face plate: the surface a name or a reading sits on */
const Face: React.FC<{ x: number; y: number; w: number; h: number; c: string; z?: number;
  lit?: number; children?: React.ReactNode }> =
  ({ x, y, w: ww, h: hh, c, z = 40, lit = 0, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    borderRadius: 6, overflow: "hidden",
    background: `linear-gradient(176deg, ${mxh(c, 0.20 + lit * 0.26)} 0%, ${dkh(c, 0.26)} 100%)`,
    border: `4px solid ${hexa("#000", 0.46)}`, boxShadow: SH }}>
    {/* the machined highlight — one light direction, top-left, house-wide */}
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 5,
      background: hexa("#FFFFFF", 0.20 + lit * 0.24) }} />
    {children}
  </div>
);

/** four bolts — the fitting that says "this is a real machine, bolted down" */
const Bolts: React.FC<{ x: number; y: number; w: number; h: number; z?: number; s?: number }> =
  ({ x, y, w: ww, h: hh, z = 46, s = 9 }) => (
  <>{[[x + 12, y + 12], [x + ww - 12 - s, y + 12], [x + 12, y + hh - 12 - s],
      [x + ww - 12 - s, y + hh - 12 - s]].map(([bx, by], i) => (
    <div key={"bt" + i} style={{ position: "absolute", left: bx, top: by, width: s, height: s,
      borderRadius: "50%", zIndex: z, background: "#6E6656",
      border: `2px solid ${hexa("#000", 0.5)}` }} />
  ))}</>
);

/** ⭐ THE PROVENANCE STRIP — where each tool's receipts live.
    Reel 115: a viewer RECOGNISES A MARK and cannot decode a silhouette. None of
    these three repos has a brand mark, so the NAME does that job and the strip
    proves the thing is real: the GitHub mark, the live star count, the licence.
    ⛔ The GitHub tile is 26px and identical on all three ON PURPOSE — it is the
    SOURCE, not the identity. Identity is the machine's own shape and colour. */
export const ProvStrip: React.FC<{ x: number; y: number; i: number; s?: number; z?: number;
  on?: number }> = ({ x, y, i, s = 1, z = 74, on = 1 }) => {
  const t = R.tools[i];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on,
      display: "flex", alignItems: "center", gap: 9 * s, padding: `${6 * s}px ${11 * s}px`,
      borderRadius: 7 * s, background: "#1B1A16",
      border: `${2 * s}px solid ${hexa(t.c, 0.6)}` }}>
      <Img src={staticFile("logos/github.svg")}
        style={{ width: 26 * s, height: 26 * s, objectFit: "contain", filter: "invert(1)" }} />
      <span style={{ ...mono(20 * s, 800), color: GOLD, letterSpacing: "0.02em" }}>
        {"★" + t.stars}
      </span>
      {t.lic && (
        <span style={{ ...mono(16 * s, 800), color: "#0E1410", background: GREEN,
          padding: `${2 * s}px ${7 * s}px`, borderRadius: 4 * s, letterSpacing: "0.08em" }}>
          {t.lic}
        </span>
      )}
    </div>
  );
};

/** ⭐ A NAME STRIP, and each tool gets a DIFFERENT REVEAL MECHANISM (the board's
    critic pass: three "a tool gets named" scenes is the one-prop-five-scenes
    shape). `flap` flips it letter by letter, `turn` swings it round on a disc,
    `burn` writes it as a beam passes. Same information, three materials. */
export const NameStrip: React.FC<{ x: number; y: number; i: number; f: number; at: number;
  kind: "flap" | "turn" | "burn"; s?: number; z?: number }> =
  ({ x, y, i, f, at, kind, s = 1, z = 76 }) => {
  const t = R.tools[i];
  const ch = t.n.split("");
  const lf = f - at;
  const cw = 27 * s, chh = 40 * s;
  const wide = ch.length * cw;

  if (kind === "flap") {
    /* a split-flap: each cell lands on its own frame, a hard edge inside one
       audit sample rather than a smear across three */
    return (
      <div style={{ position: "absolute", left: x - wide / 2, top: y, zIndex: z, display: "flex",
        gap: 2 * s }}>
        {ch.map((c, k) => {
          const p = E(lf, k * 1.7, k * 1.7 + 5, 0, 1, OUT);
          const flip = c === " " ? 0 : 1;
          return (
            <div key={"fl" + k} style={{ width: cw - 2 * s, height: chh,
              background: c === " " ? "transparent" : dkh(t.c, 0.62),
              border: c === " " ? "none" : `2px solid ${hexa("#000", 0.5)}`, borderRadius: 3,
              overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              transform: `perspective(300px) rotateX(${(1 - p) * -84 * flip}deg)`,
              transformOrigin: "50% 50%" }}>
              <span style={{ ...mono(23 * s, 900), color: p > 0.5 ? mxh(t.c, 0.62) : "transparent" }}>
                {c}
              </span>
              <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2,
                background: hexa("#000", 0.42) }} />
            </div>
          );
        })}
      </div>
    );
  }

  if (kind === "turn") {
    /* a lathe reveals by TURNING: the name is cut into a disc that swings round
       to face us. The reveal is the rotation, not a travel. */
    const rot = E(lf, 0, 22, -104, 0, IO);
    const face = Math.max(0, Math.cos((rot * Math.PI) / 180));
    return (
      <div style={{ position: "absolute", left: x - wide / 2 - 24 * s, top: y - 10 * s,
        zIndex: z, width: wide + 48 * s, height: chh + 20 * s,
        transform: `perspective(760px) rotateY(${rot}deg)`, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s,
          background: `linear-gradient(174deg, ${mxh(t.c, 0.30)} 0%, ${dkh(t.c, 0.48)} 100%)`,
          border: `3px solid ${hexa("#000", 0.5)}`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          {/* the cut groove the name sits in */}
          <div style={{ position: "absolute", left: 10 * s, right: 10 * s, top: "50%", height: 2,
            background: hexa("#000", 0.28) }} />
          <span style={{ ...mono(24 * s, 900), color: BONE, opacity: face,
            letterSpacing: "0.06em", textShadow: `0 2px 0 ${hexa("#000", 0.5)}` }}>{t.n}</span>
        </div>
      </div>
    );
  }

  /* burn: a beam sweeps down a steel plate and the name appears as it passes,
     trailing sparks off the write head */
  const sweep = E(lf, 0, 24, 0, 1, IO);
  const cut = Math.round(sweep * ch.length);
  const hx = x - wide / 2 + cut * cw;
  return (
    <div style={{ position: "absolute", left: x - wide / 2 - 16 * s, top: y - 8 * s, zIndex: z,
      width: wide + 32 * s, height: chh + 16 * s, borderRadius: 5,
      background: `linear-gradient(172deg, #6E7A82 0%, #333C44 100%)`,
      border: `3px solid ${hexa("#000", 0.52)}`, display: "flex", alignItems: "center" }}>
      <span style={{ ...mono(24 * s, 900), color: mxh(t.c, 0.5), marginLeft: 16 * s,
        letterSpacing: "0.04em" }}>{t.n.slice(0, cut)}</span>
      {sweep > 0 && sweep < 1 && (<>
        <div style={{ position: "absolute", left: hx - x + wide / 2 + 14 * s, top: -6 * s,
          width: 5 * s, height: chh + 28 * s, background: mxh(t.c, 0.86) }} />
        {Array.from({ length: 5 }, (_, k) => {
          const a = rnd(k, 3 + cut) * Math.PI - Math.PI / 2;
          const d = 8 + rnd(k, 9) * 26;
          return (
            <div key={"sp" + k} style={{ position: "absolute",
              left: hx - x + wide / 2 + 14 * s + Math.cos(a) * d,
              top: chh / 2 + Math.sin(a) * d, width: 5, height: 5, borderRadius: "50%",
              background: GOLD }} />
          );
        })}
      </>)}
    </div>
  );
};

/* =========================================================================
   S0 · THE ROW — the shutter, the awning board, and the gate planted far right
   ====================================================================== */

/** ⭐ THE ROLLER SHUTTER. The hook's whole event, and it is authored as
    OVERLAPPING ACTION (§13): the chain LEADS, the curtain FOLLOWS on its own
    ease, and the bottom rail SWINGS and rings out after it stops. Stepping a
    six-part lift is what produced *"way too choppy"* on reel 114.
    ⛔ It BOWS under its own weight while it climbs — weight is communicated by
    DEFORMATION, never by size or colour (reel 110). */
export const Shutter: React.FC<{ x: number; y: number; w: number; h: number; k: number;
  f: number; z?: number; chainX?: number }> = ({ x, y, w: ww, h: hh, k, f, z = 60, chainX }) => {
  const open = Math.min(1, Math.max(0, k));
  const shownH = hh * (1 - open);
  /* the curtain LAGS the chain in proportion to the chain's own velocity */
  const bow = Math.sin(open * Math.PI) * 13;
  const slats = 14;
  return (
    <>
      {/* the box the curtain rolls into */}
      <div style={{ position: "absolute", left: x - 14, top: y - 40, width: ww + 28, height: 44,
        zIndex: z + 3, borderRadius: 4, background: `linear-gradient(178deg, #6E6350 0%, #3A342A 100%)`,
        border: `4px solid ${hexa("#000", 0.5)}` }} />
      {/* the curtain */}
      <div style={{ position: "absolute", left: x, top: y, width: ww, height: Math.max(0, shownH),
        zIndex: z, overflow: "hidden",
        borderRadius: `0 0 ${6 + bow}px ${6 + bow}px`,
        background: `linear-gradient(180deg, #F6F0DE 0%, #D2C6A8 100%)`,
        transform: `perspective(900px) rotateX(${bow * 0.22}deg)`, transformOrigin: "50% 0%" }}>
        {Array.from({ length: slats }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, top: i * (hh / slats),
            width: "100%", height: hh / slats - 3,
            background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.52)} 0%, ${hexa("#000", 0.13)} 100%)`,
            borderBottom: `3px solid ${hexa("#000", 0.24)}` }} />
        ))}
      </div>
      {/* the bottom rail — heavier than the curtain, and it swings */}
      {shownH > 2 && (
        <div style={{ position: "absolute", left: x - 6, top: y + shownH - 16, width: ww + 12,
          height: 22, zIndex: z + 2, borderRadius: 3,
          background: `linear-gradient(178deg, #A99A78 0%, #5E5442 100%)`,
          border: `3px solid ${hexa("#000", 0.5)}`,
          transform: `rotate(${Math.sin(f / 5.4) * bow * 0.09}deg)`, transformOrigin: "50% 0%" }} />
      )}
      {/* ⭐ THE HAULING CHAIN. It hangs IN FRONT of the door at `chainX`, in
          BRASS against the dark curtain, so the hero's forearm terminates on
          something the viewer can plainly see. A limb that ends in mid-air is
          the banned shape (reel 110: it read as a TAIL on every sprite).
          It is also a full-height travelling band of alternating light and
          shadow, which is the shape the motion table pays for. */}
      <div style={{ position: "absolute", left: (chainX ?? ww + 16) + x - 9, top: y - 40,
        width: 20, height: hh + 74, zIndex: z + 8, overflow: "hidden",
        background: `linear-gradient(90deg, ${hexa("#000", 0.42)} 0%, ${hexa("#000", 0.16)} 50%, ${hexa("#000", 0.42)} 100%)` }}>
        {Array.from({ length: 26 }, (_, i) => (
          <div key={"ch" + i} style={{ position: "absolute", left: 2,
            top: ((i * 22 - f * 6.4) % (26 * 22) + 26 * 22) % (26 * 22) - 24,
            width: 16, height: 19, borderRadius: "50%",
            border: `4px solid ${i % 2 ? "#C9A15A" : "#F0DCA8"}` }} />
        ))}
      </div>
      {/* the sprocket the chain runs over, in the box */}
      <div style={{ position: "absolute", left: (chainX ?? ww + 16) + x - 20, top: y - 34,
        width: 42, height: 42, borderRadius: "50%", zIndex: z + 9,
        background: "#4A443A", border: `4px solid ${hexa("#000", 0.5)}`,
        transform: `rotate(${f * 7}deg)` }}>
        <div style={{ position: "absolute", left: "50%", top: 3, width: 5, height: 14,
          marginLeft: -2.5, background: "#C9A15A" }} />
      </div>
    </>
  );
};

/** the awning board over the shopfront. ⭐ IT CARRIES THE FRAME-0 GATES so the
    shutter never has to — the lit board holds `HOOK_LUMA` and the claim plate,
    which is what lets the hero stay a near-black silhouette (reel 110's
    barbell: a gate carried by the wrong object deforms that object). */
export const AwningBoard: React.FC<{ x: number; y: number; w: number; f: number; z?: number }> =
  ({ x, y, w: ww, f, z = 66 }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 120, zIndex: z,
      borderRadius: 6, background: `linear-gradient(178deg, #FEFAEE 0%, #EADCBC 100%)`,
      border: `5px solid ${dkh(SODIUM, 0.44)}`, display: "flex", alignItems: "center",
      justifyContent: "center", gap: 20, boxShadow: SH_D }}>
      <div style={{ width: 60, height: 60, borderRadius: 14, background: "#FFFFFF",
        border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/si_fiverr.svg")}
          style={{ width: 42, height: 42, objectFit: "contain" }} />
      </div>
      <div style={{ width: 60, height: 60, borderRadius: 14, background: "#FFFFFF",
        border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/si_upwork.svg")}
          style={{ width: 44, height: 44, objectFit: "contain" }} />
      </div>
      <span style={{ ...ui(40, 900), color: INK, letterSpacing: "0.02em" }}>{R.price}</span>
    </div>
    {/* the strip lights under it, blinking on their own clock */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"bl" + i} style={{ position: "absolute", left: x + 16 + i * ((ww - 32) / 8),
        top: y + 126, width: 13, height: 13, borderRadius: "50%", zIndex: z,
        background: mxh(SODIUM, 0.3 + 0.4 * Math.abs(Math.sin(f / 9 + i * 0.8))) }} />
    ))}
  </>
);

/** ⭐⭐ THE VILLAIN. Good ironwork — scrolled, riveted, a real drop-bar in a
    hasp — because the script disparages nothing about its craft (§23). What is
    wrong with it is that it is SHUT.
    ⛔ A BARRIER YOU CAN WALK ROUND IS NOT "STOPPED" (reel 120): at `wide` it
    fills everything past its near face, edge to edge and top to bottom. */
export const IronGate: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  open?: number; lit?: number; z?: number; wide?: boolean }> =
  ({ x, y, w: ww, h: hh, f, open = 0, lit = 0, z = 62, wide = false }) => {
  const half = ww / 2;
  const swing = E(open, 0, 1, 0, 74, IO);
  const bar = E(open, 0, 0.42, 0, 1, OUT);       /* the drop-bar lifts FIRST */
  const leaf = (side: -1 | 1) => (
    <div style={{ position: "absolute", left: side < 0 ? x : x + half, top: y, width: half,
      height: hh, zIndex: z, transformOrigin: side < 0 ? "0% 50%" : "100% 50%",
      transform: `perspective(1100px) rotateY(${side * swing}deg)` }}>
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(${side < 0 ? 96 : 264}deg, #16141C 0%, #2C2634 100%)`,
        border: `6px solid #0A0810` }} />
      {/* the vertical bars — real ironwork, not a hatch pattern */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"gb" + i} style={{ position: "absolute", left: 16 + i * ((half - 32) / 5),
          top: 12, width: 11, height: hh - 24,
          background: `linear-gradient(90deg, #4A4254 0%, #1A1620 60%)` }} />
      ))}
      {/* the scrollwork rail — the thing that makes it GOOD ironwork */}
      <div style={{ position: "absolute", left: 8, right: 8, top: hh * 0.36, height: 15,
        background: "#3A3444", border: `3px solid #100D16` }} />
      <svg width={half} height={hh * 0.30} viewBox="0 0 200 80"
        style={{ position: "absolute", left: 0, top: hh * 0.06 }}>
        <path d="M14 68 C14 24 60 22 62 46 C64 68 30 70 30 44 C30 20 76 18 100 40
                 C124 18 170 20 170 44 C170 70 136 68 138 46 C140 22 186 24 186 68"
          fill="none" stroke="#514860" strokeWidth="9" strokeLinecap="round" />
      </svg>
      {/* rivets down the stile */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"rv" + i} style={{ position: "absolute",
          [side < 0 ? "left" : "right"]: 9, top: 26 + i * ((hh - 52) / 4), width: 10, height: 10,
          borderRadius: "50%", background: "#5E5468" } as React.CSSProperties} />
      ))}
    </div>
  );
  return (
    <>
      {/* the piers — a gate you can walk round is not a barrier */}
      {[x - 46, x + ww - 4].map((px, i) => (
        <div key={"pr" + i} style={{ position: "absolute", left: px, top: y - 34,
          width: 50, height: hh + 60, zIndex: z + 1,
          background: `linear-gradient(94deg, #241E28 0%, #100C14 100%)`,
          border: `4px solid ${hexa("#000", 0.6)}` }}>
          <div style={{ position: "absolute", left: 6, right: 6, top: 8, height: 12,
            background: mxh("#241E28", 0.16 + lit * 0.3) }} />
        </div>
      ))}
      {wide && (<>
        {/* the wall the gate is set into — fills the frame past its near face */}
        <div style={{ position: "absolute", left: -60, top: y - 190, width: x + 20,
          height: hh + 240, zIndex: z, background: `linear-gradient(92deg, #0E0B12 0%, #201A26 100%)` }} />
        <div style={{ position: "absolute", left: x + ww + 26, top: y - 190, width: W,
          height: hh + 240, zIndex: z, background: `linear-gradient(268deg, #0E0B12 0%, #201A26 100%)` }} />
        <div style={{ position: "absolute", left: -60, top: y - 200, width: W + 120, height: 30,
          zIndex: z + 2, background: "#0A0810" }} />
      </>)}
      {leaf(-1)}{leaf(1)}
      {/* the drop-bar in its hasp — the thing that actually holds it */}
      <div style={{ position: "absolute", left: x - 18, top: y + hh * 0.44 - bar * (hh * 0.30),
        width: ww + 36, height: 26, zIndex: z + 6, borderRadius: 4,
        background: `linear-gradient(178deg, ${mxh("#4E4658", 0.24 + lit * 0.34)} 0%, #1C1822 100%)`,
        border: `4px solid ${hexa("#000", 0.58)}`,
        transform: `rotate(${bar > 0 && bar < 1 ? Math.sin(f / 3.6) * 1.4 : 0}deg)` }}>
        <div style={{ position: "absolute", left: 14, top: 5, width: 60, height: 5,
          background: hexa("#FFFFFF", 0.16 + lit * 0.2) }} />
      </div>
      {/* the hasp — where the guide goes */}
      <div style={{ position: "absolute", left: x + half - 34, top: y + hh * 0.50, width: 68,
        height: 78, zIndex: z + 7, borderRadius: 6,
        background: `linear-gradient(176deg, ${mxh("#3E3648", 0.2 + lit * 0.42)} 0%, #14101A 100%)`,
        border: `4px solid ${hexa("#000", 0.6)}` }}>
        <div style={{ position: "absolute", left: 20, top: 22, width: 28, height: 34,
          borderRadius: 3, background: "#0A0810",
          boxShadow: lit ? `inset 0 0 0 3px ${hexa(GOLD, lit * 0.8)}` : undefined }} />
      </div>
    </>
  );
};

/* =========================================================================
   S1 · THE FIT-OUT — the beds, the hoist and the clock that barely moves
   ====================================================================== */

/** an empty machine bed. ⛔ IT HAS TO READ WHILE IT IS STILL EMPTY, because
    empty is the promise: bright steel bolt-plate against a cold floor, not a
    dark hole (reel 108's "an empty bay is a bright cream plate"). */
export const MachineBed: React.FC<{ x: number; y: number; w: number; i: number; z?: number;
  stencil?: boolean }> = ({ x, y, w: ww, i, z = 34, stencil = false }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 46, zIndex: z,
      borderRadius: 4, background: `linear-gradient(178deg, #C6BCA2 0%, #7E7460 100%)`,
      border: `4px solid ${hexa("#000", 0.42)}` }}>
      {Array.from({ length: 6 }, (_, k) => (
        <div key={"bh" + k} style={{ position: "absolute", left: 14 + k * ((ww - 40) / 5), top: 15,
          width: 14, height: 14, borderRadius: "50%", background: "#2A241C",
          border: "2px solid rgba(255,255,255,0.20)" }} />
      ))}
    </div>
    {stencil && (
      <div style={{ position: "absolute", left: x + 10, top: y + 52, zIndex: z + 1 }}>
        <span style={{ ...mono(24, 900), color: hexa("#2A241C", 0.72), letterSpacing: "0.16em" }}>
          {R.setup}
        </span>
      </div>
    )}
  </>
);

/** a workshop clock whose minute hand travels almost nothing across the scene —
    the SET says "five minutes", the stencil only labels it. */
export const WallClock: React.FC<{ x: number; y: number; s: number; f: number; z?: number }> =
  ({ x, y, s, f, z = 30 }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s,
    zIndex: z, borderRadius: "50%",
    background: `radial-gradient(60% 60% at 40% 34%, #F6F1E2 0%, #CFC6AE 100%)`,
    border: `7px solid #3A342A` }}>
    {Array.from({ length: 12 }, (_, i) => (
      <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: "50%", width: 3,
        height: s * 0.40, marginLeft: -1.5, transformOrigin: "50% 0%",
        transform: `rotate(${i * 30}deg)`, background: "transparent" }}>
        <div style={{ position: "absolute", left: 0, top: s * 0.30, width: 3,
          height: i % 3 === 0 ? 11 : 6, background: "#3A342A" }} />
      </div>
    ))}
    {/* the minute hand barely travels; the second hand is the visible motion */}
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 4, height: s * 0.33,
      marginLeft: -2, transformOrigin: "50% 0%", background: "#2A241C",
      transform: `rotate(${196 + f * 0.075}deg)` }} />
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 2, height: s * 0.40,
      marginLeft: -1, transformOrigin: "50% 0%", background: RED,
      transform: `rotate(${(f * 6) % 360}deg)` }} />
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 11, height: 11,
      margin: "-5.5px 0 0 -5.5px", borderRadius: "50%", background: "#2A241C" }} />
  </div>
);

/** the overhead hoist that drops the three machines into their beds */
export const Hoist: React.FC<{ x: number; y: number; drop: number; c: string; f: number;
  z?: number; label?: string }> = ({ x, y, drop, c, f, z = 56, label }) => {
  const swing = Math.sin(f / 7.6) * (1 - drop) * 6;
  return (
    <>
      <div style={{ position: "absolute", left: x - 5, top: -20, width: 10, height: y + drop * 190,
        zIndex: z - 1, background: `linear-gradient(90deg, #6E6656 0%, #2E2A22 100%)`,
        transformOrigin: "50% 0%", transform: `rotate(${swing * 0.3}deg)` }} />
      <div style={{ position: "absolute", left: x - 74, top: y + drop * 190, width: 148,
        height: 92, zIndex: z, borderRadius: 6,
        background: `linear-gradient(176deg, ${mxh(c, 0.26)} 0%, ${dkh(c, 0.34)} 100%)`,
        border: `5px solid ${hexa("#000", 0.5)}`,
        transform: `rotate(${swing}deg)`, transformOrigin: "50% -60px" }}>
        <div style={{ position: "absolute", left: 12, top: 12, right: 12, height: 26,
          borderRadius: 3, background: hexa("#000", 0.34) }} />
        {label && (
          <span style={{ position: "absolute", left: 0, right: 0, bottom: 10, textAlign: "center",
            ...mono(17, 900), color: mxh(c, 0.68), letterSpacing: "0.06em" }}>{label}</span>
        )}
      </div>
    </>
  );
};

/* =========================================================================
   S2/S3 · THE VIDEO MILL — the cabinet, and the line inside it
   ====================================================================== */

/** the mill cabinet. A film workshop machine: a big warm cabinet, a glazed
    inspection port with spools turning behind it, a hopper mouth on top. */
export const MillCabinet: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  lit: number; z?: number }> = ({ x, y, w: ww, h: hh, f, lit, z = 40 }) => (
  <>
    <Face x={x} y={y} w={ww} h={hh} c={SODIUM} z={z} lit={lit}>
      {/* the inspection port, and two spools turning behind it */}
      <div style={{ position: "absolute", left: ww * 0.10, top: hh * 0.16, width: ww * 0.52,
        height: hh * 0.44, borderRadius: 8, background: "#120E08",
        border: `5px solid ${hexa("#000", 0.5)}`, overflow: "hidden" }}>
        {[0.3, 0.7].map((fx, i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: ww * 0.52 * fx - 34,
            top: hh * 0.44 / 2 - 34, width: 68, height: 68, borderRadius: "50%",
            border: `9px solid ${mxh(SODIUM, 0.2 + lit * 0.3)}`,
            transform: `rotate(${f * (i ? -6.5 : 5.2)}deg)` }}>
            <div style={{ position: "absolute", left: "50%", top: 3, width: 5, height: 22,
              marginLeft: -2.5, background: mxh(SODIUM, 0.5) }} />
          </div>
        ))}
        {/* the film path between them */}
        <div style={{ position: "absolute", left: 12, right: 12, top: "50%", height: 6,
          background: hexa("#F0D9A0", 0.4 + lit * 0.3) }} />
      </div>
      {/* the hopper mouth */}
      <div style={{ position: "absolute", left: ww * 0.70, top: hh * 0.14, width: ww * 0.22,
        height: 34, borderRadius: "4px 4px 0 0", background: "#1A140C",
        border: `4px solid ${hexa("#000", 0.44)}` }} />
      {/* the reading lamps down the side */}
      {[0, 1, 2].map(i => (
        <div key={"lp" + i} style={{ position: "absolute", left: ww * 0.72 + i * 34,
          top: hh * 0.62, width: 22, height: 22, borderRadius: "50%",
          background: mxh(SODIUM, lit * (0.25 + 0.45 * Math.abs(Math.sin(f / 6 + i * 1.4)))),
          border: `3px solid ${hexa("#000", 0.4)}` }} />
      ))}
    </Face>
    <Bolts x={x} y={y} w={ww} h={hh} z={z + 6} />
  </>
);

/** ⭐ THE ONE SMALL FLAT THING. Every tool in this reel takes one, and each is a
    different object: a stamped word tile, a reel of tape, a photo print. */
export const WordTile: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 80, rot = 0 }) => (
  <div style={{ position: "absolute", left: x - 62 * s, top: y - 30 * s, width: 124 * s,
    height: 60 * s, zIndex: z, borderRadius: 5 * s, transform: `rotate(${rot}deg)`,
    background: `linear-gradient(174deg, #F8F2E2 0%, #D8CDB2 100%)`,
    border: `${4 * s}px solid #2A241C`, display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: SH }}>
    <span style={{ ...mono(21 * s, 900), color: "#2A241C", letterSpacing: "0.10em" }}>
      {R.tools[0].input}
    </span>
  </div>
);

/** the three stations inside the mill, each firing on its own spoken word.
    ⛔ EACH IS A DIFFERENT MECHANISM — a pen carriage, a boom and a drum, a
    splicer — because three stations doing the same thing is one station. */
export const MillLine: React.FC<{ f: number; beats: [number, number, number]; z?: number }> =
  ({ f, beats, z = 44 }) => {
  const [b1, b2, b3] = beats;
  /* 1 · the pen carriage races the full width and ejects a page */
  const pen = E(f, b1, b1 + 15, 0, 1, IO);
  const page = E(f, b1 + 11, b1 + 22, 0, 1, OUT);
  /* 2 · the boom drops and a waveform is cut into a turning drum */
  const boom = E(f, b2, b2 + 8, 0, 1, OUT);
  /* 3 · the splicer slams and the canister fills */
  const slam = E(f, b3, b3 + 5, 0, 1, IN_Q) - E(f, b3 + 5, b3 + 13, 0, 1, OUT);
  const fill = E(f, b3 + 4, b3 + 26, 0, 1, IO);
  return (
    <>
      {/* ---- station 1 · the script writer -------------------------------- */}
      <div style={{ position: "absolute", left: 96, top: 300, width: 250, height: 128, zIndex: z,
        borderRadius: 5, background: `linear-gradient(176deg, #2E4A3C 0%, #14241C 100%)`,
        border: `4px solid ${hexa("#000", 0.5)}` }} />
      <div style={{ position: "absolute", left: 106 + pen * 190, top: 292, width: 26, height: 60,
        zIndex: z + 3, borderRadius: 3, background: BRASS,
        border: `3px solid ${hexa("#000", 0.5)}` }}>
        <div style={{ position: "absolute", left: 9, top: 52, width: 6, height: 18,
          background: INK }} />
      </div>
      {/* the ink it has already laid down */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"ik" + i} style={{ position: "absolute", left: 112, top: 318 + i * 17,
          width: Math.max(0, (pen * 220 - i * 26)) * 0.86, height: 5, zIndex: z + 1,
          background: hexa("#BFE8CE", 0.72) }} />
      ))}
      {page > 0 && (
        <div style={{ position: "absolute", left: 150, top: 300 - page * 128, width: 132,
          height: 168, zIndex: z + 6, borderRadius: 3, background: PAPER,
          border: `3px solid ${hexa("#000", 0.34)}`,
          transform: `rotate(${-7 + page * 5}deg)`, boxShadow: SH }}>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={"ln" + i} style={{ position: "absolute", left: 14, top: 20 + i * 19,
              width: i % 3 === 2 ? 62 : 100, height: 5, background: hexa("#2A241C", 0.42) }} />
          ))}
        </div>
      )}
      {/* ---- station 2 · the voice recorder ------------------------------- */}
      <div style={{ position: "absolute", left: 404, top: 74 + boom * 168, width: 15, height: 190,
        zIndex: z + 3, background: `linear-gradient(90deg, #8E8672 0%, #3A342A 100%)` }} />
      <div style={{ position: "absolute", left: 380, top: 250 + boom * 168, width: 64, height: 84,
        zIndex: z + 4, borderRadius: "32px 32px 12px 12px",
        background: `linear-gradient(176deg, #6E7A82 0%, #262E34 100%)`,
        border: `4px solid ${hexa("#000", 0.5)}` }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"mg" + i} style={{ position: "absolute", left: 11, right: 11, top: 14 + i * 12,
            height: 5, borderRadius: 3, background: hexa("#000", 0.44) }} />
        ))}
      </div>
      {/* the drum, turning, with the cut waveform on it */}
      <div style={{ position: "absolute", left: 356, top: 388, width: 152, height: 152,
        zIndex: z + 1, borderRadius: "50%",
        background: `radial-gradient(58% 58% at 38% 32%, #4E5A62 0%, #171D22 100%)`,
        border: `6px solid ${hexa("#000", 0.5)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotate(${f * 4.4}deg)` }}>
          {Array.from({ length: 26 }, (_, i) => {
            const a = (i / 26) * Math.PI * 2;
            const amp = boom > 0 ? 8 + Math.abs(Math.sin(i * 1.9)) * 26 * boom : 0;
            return (
              <div key={"wv" + i} style={{ position: "absolute", left: "50%", top: "50%",
                width: amp, height: 4, marginTop: -2, transformOrigin: "0% 50%",
                transform: `rotate(${(a * 180) / Math.PI}deg) translateX(34px)`,
                background: mxh(TEAL, 0.4) }} />
            );
          })}
        </div>
      </div>
      {/* ---- station 3 · the splicer and the canister --------------------- */}
      <div style={{ position: "absolute", left: 596, top: 262 - slam * 34, width: 214, height: 84,
        zIndex: z + 5, borderRadius: 4,
        background: `linear-gradient(176deg, #B8501F 0%, #5E2410 100%)`,
        border: `5px solid ${hexa("#000", 0.52)}` }}>
        <div style={{ position: "absolute", left: 16, bottom: -13, right: 16, height: 15,
          background: "#D8CDB2" }} />
      </div>
      <div style={{ position: "absolute", left: 596, top: 356, width: 214, height: 34, zIndex: z,
        background: `linear-gradient(178deg, #3A342A 0%, #1A1610 100%)` }} />
      {/* the canister, filling */}
      <div style={{ position: "absolute", left: 634, top: 404, width: 140, height: 140,
        zIndex: z + 2, borderRadius: "50%",
        background: `radial-gradient(56% 56% at 38% 32%, #8E9299 0%, #2E353A 100%)`,
        border: `7px solid ${hexa("#000", 0.5)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 100}%`,
          background: `linear-gradient(180deg, ${mxh(SODIUM, 0.44)} 0%, ${dkh(SODIUM, 0.2)} 100%)` }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 30, height: 30,
          margin: "-15px 0 0 -15px", borderRadius: "50%", background: "#1A1610",
          border: "4px solid rgba(255,255,255,0.16)" }} />
      </div>
    </>
  );
};

/** the finished good the mill makes — a film canister with a label */
export const ReelCan: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  rock?: number }> = ({ x, y, s = 1, z = 80, f, rock: rk = 0 }) => (
  <div style={{ position: "absolute", left: x - 78 * s, top: y - 78 * s, width: 156 * s,
    height: 156 * s, zIndex: z, borderRadius: "50%",
    transform: `rotate(${rk ? Math.sin(f / 3.1) * Math.exp(-f / 26) * rk : 0}deg)`,
    background: `radial-gradient(56% 56% at 36% 30%, #A9AEB4 0%, #343B41 100%)`,
    border: `${8 * s}px solid ${hexa("#000", 0.5)}`, boxShadow: SH }}>
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 84 * s, height: 34 * s,
      margin: `${-17 * s}px 0 0 ${-42 * s}px`, borderRadius: 4, background: SODIUM,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ ...mono(15 * s, 900), color: "#2A1C04", letterSpacing: "0.08em" }}>
        {R.tools[0].out}
      </span>
    </div>
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 20 * s, height: 20 * s,
      margin: `${-10 * s}px 0 0 ${-10 * s}px`, borderRadius: "50%", background: "#15191C" }} />
  </div>
);

/* =========================================================================
   S4/S7/S12 · THE THREE SALES — and each one is a different transaction
   ====================================================================== */

/** the trade counter, with the two marketplace marks cast into its face */
export const TradeCounter: React.FC<{ x: number; y: number; w: number; z?: number }> =
  ({ x, y, w: ww, z = 52 }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 30, zIndex: z + 2,
      borderRadius: 4, background: `linear-gradient(178deg, #F2E9D2 0%, #C6B896 100%)`,
      border: `4px solid ${hexa("#000", 0.4)}` }} />
    <div style={{ position: "absolute", left: x + 14, top: y + 30, width: ww - 28, height: 190,
      zIndex: z, background: `linear-gradient(178deg, #4E4034 0%, #251E18 100%)`,
      border: `4px solid ${hexa("#000", 0.44)}`, display: "flex", alignItems: "center",
      justifyContent: "center", gap: 26 }}>
      <div style={{ width: 66, height: 66, borderRadius: 15, background: "#FFFFFF",
        border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/si_fiverr.svg")}
          style={{ width: 46, height: 46, objectFit: "contain" }} />
      </div>
      <div style={{ width: 66, height: 66, borderRadius: 15, background: "#FFFFFF",
        border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/si_upwork.svg")}
          style={{ width: 48, height: 48, objectFit: "contain" }} />
      </div>
    </div>
  </>
);

/** ⭐ EVERY SALE IS A DOCKET, NEVER A FIGURE. Alex says no number about money,
    so the frame says none: the stamp comes down, recoils, and the word is the
    whole transaction. */
export const Docket: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 84 }) => {
  const lf = f - at;
  const drop = E(lf, 0, 5, 0, 1, IN_Q);
  const back = E(lf, 5, 16, 0, 1, OUT);
  const ink = lf > 4 ? 1 : 0;
  return (
    <>
      <div style={{ position: "absolute", left: x - 82 * s, top: y - 52 * s, width: 164 * s,
        height: 104 * s, zIndex: z, borderRadius: 4, background: PAPER,
        border: `${3 * s}px solid ${hexa("#000", 0.30)}`, boxShadow: SH,
        transform: `rotate(${-3 + (drop - back) * 2.4}deg)` }}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={"dl" + i} style={{ position: "absolute", left: 14 * s, top: (16 + i * 15) * s,
            width: (i === 2 ? 60 : 108) * s, height: 4 * s, background: hexa("#2A241C", 0.3) }} />
        ))}
        {ink === 1 && (
          <div style={{ position: "absolute", left: 18 * s, bottom: 12 * s,
            transform: "rotate(-9deg)" }}>
            <span style={{ ...mono(30 * s, 900), color: hexa(RED, 0.88),
              letterSpacing: "0.10em", border: `${4 * s}px solid ${hexa(RED, 0.8)}`,
              padding: `${2 * s}px ${8 * s}px`, borderRadius: 4 }}>{R.sold}</span>
          </div>
        )}
      </div>
      {/* the stamp itself, and it RECOILS — nothing lands and stops */}
      <div style={{ position: "absolute", left: x - 44 * s,
        top: y - 190 * s + (drop - back * 0.44) * 128 * s, width: 88 * s, height: 96 * s,
        zIndex: z + 4, borderRadius: `${6 * s}px ${6 * s}px ${3 * s}px ${3 * s}px`,
        background: `linear-gradient(176deg, #6E6656 0%, #2E2A22 100%)`,
        border: `${4 * s}px solid ${hexa("#000", 0.5)}` }}>
        <div style={{ position: "absolute", left: 24 * s, top: -22 * s, width: 40 * s,
          height: 28 * s, borderRadius: 5, background: "#3A342A" }} />
        <div style={{ position: "absolute", left: 8 * s, bottom: -8 * s, right: 8 * s,
          height: 14 * s, background: dkh(RED, 0.3) }} />
      </div>
    </>
  );
};

/** a marketplace stall front. ⭐ IT READS WHILE EMPTY — a bright bone canopy and
    a lit tray, so the arrival is the reveal rather than the introduction. */
export const Stall: React.FC<{ x: number; y: number; mark: "fiverr" | "upwork"; fill: number;
  f: number; z?: number }> = ({ x, y, mark, fill, f, z = 50 }) => {
  const c = mark === "fiverr" ? FIVERR : UPWORK;
  return (
    <>
      {/* the canopy — striped awning, alternating light and shadow */}
      <div style={{ position: "absolute", left: x - 148, top: y - 226, width: 296, height: 56,
        zIndex: z + 4, borderRadius: "8px 8px 0 0", overflow: "hidden",
        border: `4px solid ${hexa("#000", 0.42)}` }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"aw" + i} style={{ position: "absolute", left: i * 37, top: 0, width: 37,
            height: "100%", background: i % 2 ? dkh(c, 0.42) : "#F4EEDC" }} />
        ))}
      </div>
      {/* the posts */}
      {[-138, 126].map((dx, i) => (
        <div key={"po" + i} style={{ position: "absolute", left: x + dx, top: y - 176, width: 14,
          height: 176, zIndex: z + 2, background: `linear-gradient(90deg, #8E8672 0%, #3A342A 100%)` }} />
      ))}
      {/* the mark board */}
      <div style={{ position: "absolute", left: x - 46, top: y - 166, width: 92, height: 92,
        zIndex: z + 5, borderRadius: 18, background: "#FFFFFF",
        border: "4px solid #E8DCC0", display: "flex", alignItems: "center",
        justifyContent: "center", boxShadow: SH }}>
        <Img src={staticFile(mark === "fiverr" ? "logos/si_fiverr.svg" : "logos/si_upwork.svg")}
          style={{ width: 62, height: 62, objectFit: "contain" }} />
      </div>
      {/* the tray, and what has arrived in it */}
      <div style={{ position: "absolute", left: x - 132, top: y - 54, width: 264, height: 60,
        zIndex: z + 3, borderRadius: 5,
        background: `linear-gradient(178deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.56)} 100%)`,
        border: `4px solid ${hexa("#000", 0.46)}`, overflow: "hidden" }}>
        {Array.from({ length: 5 }, (_, i) => {
          const in_ = fill * 5 - i;
          if (in_ <= 0) return null;
          return (
            <div key={"tr" + i} style={{ position: "absolute", left: 12 + i * 49,
              top: 14 - Math.min(1, in_) * 4, width: 42, height: 42, borderRadius: "50%",
              background: `radial-gradient(56% 56% at 36% 30%, #E8E2D0 0%, #8E8878 100%)`,
              border: `3px solid ${hexa("#000", 0.4)}`,
              transform: `scale(${Math.min(1, in_)})` }} />
          );
        })}
      </div>
      <div style={{ position: "absolute", left: x - 132, top: y + 6, width: 264, height: 116,
        zIndex: z, background: `linear-gradient(178deg, #3E342A 0%, #1E1812 100%)` }} />
    </>
  );
};

/* =========================================================================
   S5/S6/S8 · THE VOICE SHOP — the booth, the lathe, and the empty stool
   ====================================================================== */

/** the glass booth. Its door SHUTS at S8, and the lathe keeps going behind it. */
export const VoiceBooth: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  door: number; onAir: number; z?: number; children?: React.ReactNode }> =
  ({ x, y, w: ww, h: hh, f, door, onAir, z = 42, children }) => (
  <>
    {/* the frame */}
    <div style={{ position: "absolute", left: x - 12, top: y - 12, width: ww + 24, height: hh + 24,
      zIndex: z, borderRadius: 8, background: `linear-gradient(176deg, #4A3F5E 0%, #1E1830 100%)`,
      border: `5px solid ${hexa("#000", 0.5)}` }} />
    {/* the acoustic wall inside — real foam wedges, not a texture */}
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z + 1,
      overflow: "hidden", background: dkh(VIOLET, 0.66) }}>
      {Array.from({ length: 40 }, (_, i) => (
        <div key={"fm" + i} style={{ position: "absolute", left: (i % 8) * (ww / 8),
          top: Math.floor(i / 8) * (hh / 5), width: ww / 8 - 3, height: hh / 5 - 3,
          background: (i + Math.floor(i / 8)) % 2
            ? dkh(VIOLET, 0.5) : dkh(VIOLET, 0.74),
          clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
      ))}
    </div>
    {children}
    {/* the glass — a real pane with a highlight raking across it */}
    <div style={{ position: "absolute", left: x + 6, top: y + 6, width: ww - 12, height: hh - 12,
      zIndex: z + 30, pointerEvents: "none",
      background: `linear-gradient(114deg, ${hexa("#CFC0F0", 0.14)} 0%, ${hexa("#CFC0F0", 0)} 42%,
                   ${hexa("#CFC0F0", 0.10)} 58%, ${hexa("#CFC0F0", 0)} 100%)` }} />
    {/* the door, swinging shut */}
    <div style={{ position: "absolute", left: x + ww - 8, top: y + 8, width: ww * 0.40,
      height: hh - 16, zIndex: z + 34, transformOrigin: "0% 50%",
      transform: `perspective(900px) rotateY(${-78 + door * 78}deg)`,
      background: `linear-gradient(268deg, ${hexa("#5A4C74", 0.94)} 0%, ${hexa("#332A48", 0.94)} 100%)`,
      border: `4px solid ${hexa("#000", 0.5)}`, borderRadius: 4 }}>
      <div style={{ position: "absolute", left: 12, top: "44%", width: 30, height: 9,
        borderRadius: 5, background: BRASS }} />
    </div>
    {/* ON AIR — the reveal mechanism for tool two */}
    <div style={{ position: "absolute", left: x + ww / 2 - 82, top: y - 68, width: 164, height: 50,
      zIndex: z + 36, borderRadius: 5,
      background: onAir > 0.5 ? dkh(RED, 0.16) : "#241E30",
      border: `4px solid ${hexa("#000", 0.5)}`, display: "flex", alignItems: "center",
      justifyContent: "center" }}>
      <span style={{ ...mono(21, 900), letterSpacing: "0.14em",
        color: onAir > 0.5 ? "#FFE6DE" : hexa("#FFE6DE", 0.16) }}>ON AIR</span>
    </div>
  </>
);

/** the stool. ⛔ AN EMPTY CONTAINER MUST STILL READ: bone against a dark teal
    booth — different in hue AND value — because empty is the whole point. */
export const Stool: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 54 }) => (
  <>
    <div style={{ position: "absolute", left: x - 52 * s, top: y - 128 * s, width: 104 * s,
      height: 22 * s, zIndex: z, borderRadius: 8 * s,
      background: `linear-gradient(176deg, ${BONE} 0%, #B8AE94 100%)`,
      border: `${3 * s}px solid ${hexa("#000", 0.42)}` }} />
    {[[-38, -8], [38, 8]].map(([dx, lean], i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: x + dx * s - 5 * s,
        top: y - 110 * s, width: 10 * s, height: 110 * s, zIndex: z - 1,
        background: `linear-gradient(90deg, ${BONE} 0%, #8E8672 100%)`,
        transformOrigin: "50% 0%", transform: `rotate(${lean}deg)` }} />
    ))}
    <div style={{ position: "absolute", left: x - 40 * s, top: y - 56 * s, width: 80 * s,
      height: 8 * s, zIndex: z - 1, background: "#8E8672" }} />
  </>
);

/** the dead mic, unplugged, its cable coiled on the floor — S8's subject */
export const DeadMic: React.FC<{ x: number; y: number; f: number; s?: number; z?: number }> =
  ({ x, y, f, s = 1, z = 58 }) => (
  <>
    <div style={{ position: "absolute", left: x - 6 * s, top: y - 210 * s, width: 12 * s,
      height: 150 * s, zIndex: z - 1, background: "#3A3448",
      transformOrigin: "50% 0%", transform: `rotate(${Math.sin(f / 28) * 1.1}deg)` }} />
    <div style={{ position: "absolute", left: x - 30 * s, top: y - 66 * s, width: 60 * s,
      height: 78 * s, zIndex: z, borderRadius: `${30 * s}px ${30 * s}px ${10 * s}px ${10 * s}px`,
      background: `linear-gradient(176deg, #5A6470 0%, #1E252C 100%)`,
      border: `${4 * s}px solid ${hexa("#000", 0.5)}` }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"mm" + i} style={{ position: "absolute", left: 10 * s, right: 10 * s,
          top: (13 + i * 11) * s, height: 4 * s, borderRadius: 3, background: hexa("#000", 0.46) }} />
      ))}
    </div>
    {/* the coiled cable, and the JACK lying loose beside it — unplugged */}
    <svg width={230 * s} height={92 * s} viewBox="0 0 230 92"
      style={{ position: "absolute", left: x - 40 * s, top: y + 22 * s, zIndex: z + 1 }}>
      <path d="M18 8 C18 44 66 44 66 22 C66 4 22 6 26 40 C30 76 96 74 120 56
               C146 36 178 44 196 62 L214 74"
        fill="none" stroke="#2A2438" strokeWidth="9" strokeLinecap="round" />
      <rect x="206" y="64" width="22" height="16" rx="3" fill="#8E8672" />
    </svg>
  </>
);

/** ⭐ THE LATHE. Both halves of the mechanism are drawn: ONE minute of tape
    going in, and a rank of identical discs coming out, accelerating. A machine
    that consumes and produces nothing is a progress bar (§10). */
export const Lathe: React.FC<{ x: number; y: number; f: number; feed: number; out: number;
  z?: number }> = ({ x, y, f, feed, out, z = 46 }) => (
  <>
    {/* the bed */}
    <div style={{ position: "absolute", left: x - 300, top: y, width: 600, height: 52, zIndex: z,
      borderRadius: 4, background: `linear-gradient(178deg, #3E4470 0%, #191C34 100%)`,
      border: `5px solid ${hexa("#000", 0.5)}` }} />
    {/* the headstock */}
    <div style={{ position: "absolute", left: x - 300, top: y - 128, width: 172, height: 132,
      zIndex: z + 2, borderRadius: 5,
      background: `linear-gradient(176deg, ${mxh(INDIGO, 0.26)} 0%, ${dkh(INDIGO, 0.4)} 100%)`,
      border: `5px solid ${hexa("#000", 0.5)}` }}>
      <div style={{ position: "absolute", left: 24, top: 26, width: 84, height: 84,
        borderRadius: "50%", border: `9px solid ${mxh(INDIGO, 0.5)}`,
        transform: `rotate(${f * 9}deg)` }}>
        <div style={{ position: "absolute", left: "50%", top: 4, width: 6, height: 24,
          marginLeft: -3, background: BRASS }} />
      </div>
    </div>
    {/* the cutter, riding down on the feed */}
    <div style={{ position: "absolute", left: x - 60, top: y - 108 + feed * 76, width: 46,
      height: 92, zIndex: z + 5, borderRadius: 4,
      background: `linear-gradient(176deg, #9EA6B8 0%, #333A4A 100%)`,
      border: `4px solid ${hexa("#000", 0.5)}` }}>
      <div style={{ position: "absolute", left: 17, bottom: -16, width: 10, height: 20,
        background: BRASS }} />
    </div>
    {/* the ONE minute of tape on the deck */}
    <div style={{ position: "absolute", left: x - 116, top: y - 52, width: 108, height: 108,
      zIndex: z + 3, borderRadius: "50%",
      background: `radial-gradient(54% 54% at 36% 30%, #6E5A3A 0%, #241C10 100%)`,
      border: `6px solid ${hexa("#000", 0.5)}`,
      transform: `rotate(${f * (feed > 0 ? 7.5 : 1.2)}deg)` }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 34, height: 34,
        margin: "-17px 0 0 -17px", borderRadius: "50%", background: BONE }} />
    </div>
    <div style={{ position: "absolute", left: x - 148, top: y + 66, zIndex: z + 6 }}>
      <span style={{ ...mono(22, 900), color: mxh(INDIGO, 0.72), letterSpacing: "0.12em" }}>
        {R.tools[1].input}
      </span>
    </div>
    {/* the discs coming out the other side, accelerating, each landing hard */}
    {Array.from({ length: 7 }, (_, i) => {
      const k = out * 7 - i;
      if (k <= 0) return null;
      const p = Math.min(1, k);
      return (
        <div key={"dc" + i} style={{ position: "absolute", left: x + 46 + i * 46,
          top: y - 30 - i * 15 + (1 - p) * 60, width: 86, height: 86, zIndex: z + 4 + i,
          borderRadius: "50%", opacity: Math.min(1, k * 2.4),
          transform: `scale(${0.7 + p * 0.3})`,
          background: `radial-gradient(56% 56% at 36% 30%, ${mxh(VIOLET, 0.44)} 0%, ${dkh(VIOLET, 0.4)} 100%)`,
          border: `5px solid ${hexa("#000", 0.46)}` }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 20, height: 20,
            margin: "-10px 0 0 -10px", borderRadius: "50%", background: "#15121E" }} />
        </div>
      );
    })}
  </>
);

/* =========================================================================
   S9/S10/S11 · THE 3D SHOP — the scan rig, the tear-out, the turntable
   ====================================================================== */

/** the scanning rig on its gantry. ⛔ THE GANTRY BOWS UNDER LOAD — six frames of
    the thing visibly REFUSING to come is the whole weight beat (reel 117). */
export const ScanGantry: React.FC<{ x: number; y: number; w: number; f: number; grip: number;
  strain: number; lift: number; z?: number }> =
  ({ x, y, w: ww, f, grip, strain, lift, z = 44 }) => {
  const bow = strain * 22;
  const chain = 172 - lift * 120;   /* ALWAYS POSITIVE: 172 -> 52 */
  return (
    <>
      {/* the beam, bowing under the load it cannot yet move */}
      <svg width={ww} height={96} viewBox={`0 0 ${ww} 96`}
        style={{ position: "absolute", left: x, top: y - 40, zIndex: z }}>
        <path d={`M0 26 Q ${ww / 2} ${26 + bow} ${ww} 26 L ${ww} 56 Q ${ww / 2} ${56 + bow} 0 56 Z`}
          fill="#4A545E" stroke="#0A0E12" strokeWidth="6" />
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={"gr" + i} cx={40 + i * ((ww - 80) / 6)}
            cy={41 + bow * (1 - Math.abs(i - 3) / 3.4)} r="6" fill="#79838E" />
        ))}
      </svg>
      {/* the chains */}
      {[-46, 46].map((dx, i) => (
        <div key={"cn" + i} style={{ position: "absolute", left: x + ww / 2 + dx - 5,
          top: y + 16 + bow * 0.8, width: 10, height: chain, zIndex: z + 2,
          background: `repeating-linear-gradient(180deg, #8E8672 0 9px, #33302A 9px 18px)`,
          transform: `rotate(${strain * (i ? 1.6 : -1.6)}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      {/* the tongs — drawn, tapered, and they CLOSE */}
      <svg width="200" height="130" viewBox="0 0 200 130"
        style={{ position: "absolute", left: x + ww / 2 - 100, top: y + 12 + bow * 0.8 + chain,
          zIndex: 84 }}>
        <path d={`M100 4 L100 30 M100 30 L${64 + grip * 20} 62 L${52 + grip * 22} 118`}
          fill="none" stroke="#5E6870" strokeWidth="13" strokeLinecap="round" />
        <path d={`M100 30 L${136 - grip * 20} 62 L${148 - grip * 22} 118`}
          fill="none" stroke="#5E6870" strokeWidth="13" strokeLinecap="round" />
        <circle cx="100" cy="30" r="12" fill="#8E9299" stroke="#0A0E12" strokeWidth="4" />
      </svg>
    </>
  );
};

/** the ONE flat photo print — tool three's input, and the thing that becomes
    solid. ⭐ THE REVEAL IS THE ROTATION: it turns edge-on and comes back with
    volume, so the viewer decodes it at the instant it arrives. */
export const PhotoPrint: React.FC<{ x: number; y: number; turn: number; f: number; s?: number;
  z?: number }> = ({ x, y, turn, f, s = 1, z = 78 }) => {
  const rot = turn * -34;   /* 0 (face-on, readable) -> -34, never edge-on */
  const solid = E(turn, 0.42, 1, 0, 1, IO);
  return (
    <div style={{ position: "absolute", left: x - 96 * s, top: y - 118 * s, width: 192 * s,
      height: 236 * s, zIndex: z,
      transform: `perspective(820px) rotateY(${rot}deg) rotateX(${-6 + turn * 6}deg)` }}>
      {/* the flat print */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 5, opacity: 1 - solid * 0.86,
        background: `linear-gradient(174deg, #F6F1E4 0%, #CFC6B0 100%)`,
        border: `${5 * s}px solid #FFFFFF`, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 14 * s, top: 14 * s, right: 14 * s,
          bottom: 40 * s, background: `linear-gradient(168deg, ${dkh(TEAL, 0.2)} 0%, ${dkh(SLATE, 0.3)} 100%)`,
          overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "22%", bottom: 0, width: "56%", height: "58%",
            borderRadius: `${8 * s}px ${8 * s}px 0 0`, background: mxh(CLAY, 0.14) }} />
        </div>
      </div>
      {/* what it becomes: the same object with DEPTH — an extruded solid */}
      {solid > 0 && (
        <div style={{ position: "absolute", left: 22 * s, top: 30 * s, width: 148 * s,
          height: 150 * s, opacity: solid }}>
          <div style={{ position: "absolute", left: 0, top: 24 * s, width: 112 * s,
            height: 112 * s, borderRadius: 6, background: mxh(CLAY, 0.10),
            border: `${4 * s}px solid ${hexa("#000", 0.42)}` }} />
          {/* the top face and the side face — one light direction */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 112 * s, height: 30 * s,
            background: mxh(CLAY, 0.44), transform: `skewX(-42deg)`,
            transformOrigin: "0% 100%" }} />
          <div style={{ position: "absolute", left: 112 * s, top: 0, width: 32 * s,
            height: 136 * s, background: dkh(CLAY, 0.34), transform: `skewY(-42deg)`,
            transformOrigin: "0% 0%" }} />
        </div>
      )}
    </div>
  );
};

/** the turntable under the lamp rig. The model TURNS, the lamps STRIKE in
    sequence and the shading visibly tracks both. */
export const Turntable: React.FC<{ x: number; y: number; f: number; spin: number; lamps: number;
  z?: number }> = ({ x, y, f, spin, lamps, z = 46 }) => {
  const a = spin * 360;
  const key = 0.24 + lamps * 0.26;
  return (
    <>
      {/* the deck */}
      <div style={{ position: "absolute", left: x - 190, top: y - 42, width: 380, height: 84,
        zIndex: z, borderRadius: "50%",
        background: `linear-gradient(178deg, #C4BAA2 0%, #6E6656 100%)`,
        border: `6px solid ${hexa("#000", 0.42)}` }} />
      {/* the reference grid on the deck, turning with it */}
      <div style={{ position: "absolute", left: x - 190, top: y - 42, width: 380, height: 84,
        zIndex: z + 1, borderRadius: "50%", overflow: "hidden" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"gd" + i} style={{ position: "absolute", left: "50%", top: "50%", width: 190,
            height: 3, marginTop: -1.5, transformOrigin: "0% 50%",
            transform: `rotate(${a + i * 45}deg) scaleY(0.30)`, background: hexa("#000", 0.22) }} />
        ))}
      </div>
      {/* ⛔⛔⛔ THE MODEL IS **NOT** SPUN WITH `rotateY`. A flat div rotated in Y
          passes through EDGE-ON, and at the sampled frame this scene shipped a
          MODEL 3px WIDE — a thin red line in the middle of an empty room, which
          is `memory/feedback_the_camera_not_the_placement`'s "rotateY with no
          perspective is a shrinking rectangle" arriving one step later: WITH
          perspective it still degenerates, it just does it more convincingly.

          A turn is drawn instead: the front face NEVER narrows past 0.46, the
          SIDE face swaps which edge it hangs off as the angle crosses 180°, and
          the top parallelogram's skew tracks the angle. The rotation is read off
          the shading and the side face, which is how a viewer reads a turn
          anyway — nobody measures the width of the front. */}
      {(() => {
        const rad = (a * Math.PI) / 180;
        const c = Math.cos(rad), s2 = Math.sin(rad);
        const fw = 168 * (0.46 + 0.54 * Math.abs(c));        /* never zero */
        const sw = 44 * Math.abs(s2) + 14;                    /* the side face */
        const right = c >= 0;                                 /* which edge it hangs off */
        const lit = key + 0.18 * c;
        return (
          <div style={{ position: "absolute", left: x - fw / 2 - (right ? 0 : sw),
            top: y - 258, width: fw + sw, height: 232, zIndex: z + 5 }}>
            {/* the top face — a parallelogram whose skew IS the angle */}
            <div style={{ position: "absolute", left: right ? 0 : sw, top: 4, width: fw,
              height: 38, background: mxh(CLAY, Math.max(0.1, lit + 0.26)),
              transform: `skewX(${-38 * (right ? 1 : -1)}deg)`,
              transformOrigin: right ? "0% 100%" : "100% 100%" }} />
            {/* the side face */}
            <div style={{ position: "absolute", left: right ? fw : 0, top: 4, width: sw,
              height: 204, background: dkh(CLAY, 0.44),
              transform: `skewY(${-38 * (right ? 1 : -1)}deg)`,
              transformOrigin: right ? "0% 0%" : "100% 0%" }} />
            {/* the front face, and the panel line that makes the turn readable */}
            <div style={{ position: "absolute", left: right ? 0 : sw, top: 40, width: fw,
              height: 168, borderRadius: 6, border: `5px solid ${hexa("#000", 0.44)}`,
              background: `linear-gradient(168deg, ${mxh(CLAY, Math.max(0.04, lit))} 0%, ${dkh(CLAY, 0.30)} 100%)`,
              overflow: "hidden" }}>
              <div style={{ position: "absolute", left: fw * (right ? 0.62 : 0.22), top: 10,
                width: 6, height: 144, background: hexa("#000", 0.26) }} />
              <div style={{ position: "absolute", left: 10, top: 114, width: fw - 20, height: 6,
                background: hexa("#000", 0.20) }} />
            </div>
          </div>
        );
      })()}
      {/* the three lamps, striking in sequence */}
      {[-236, 0, 236].map((dx, i) => {
        const on = Math.max(0, Math.min(1, lamps * 3 - i));
        return (
          <React.Fragment key={"lm" + i}>
            <div style={{ position: "absolute", left: x + dx - 34, top: y - 396, width: 68,
              height: 46, zIndex: z + 3, borderRadius: "6px 6px 22px 22px",
              background: `linear-gradient(176deg, #6E6656 0%, #2E2A22 100%)`,
              border: `4px solid ${hexa("#000", 0.46)}` }}>
              <div style={{ position: "absolute", left: 8, bottom: 3, right: 8, height: 12,
                borderRadius: 3, background: mxh("#FFF3D6", 0.1 + on * 0.8) }} />
            </div>
            {on > 0 && (
              <div style={{ position: "absolute", left: x + dx - 116, top: y - 348, width: 232,
                height: 330, zIndex: z + 2, opacity: on * 0.30,
                clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(180deg, ${hexa("#FFF3D6", 0.9)} 0%, ${hexa("#FFF3D6", 0)} 100%)` }} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

/* =========================================================================
   S12 · THE DOCK — anonymous buyers, a conveyor, a van
   ====================================================================== */

/** ⛔ THE BUYERS ARE ANONYMOUS. Putting a real retailer's mark on a buyer would
    be an endorsement the frame cannot source — and the VO names none. These are
    shop silhouettes: an awning, a door, a sign board with no wordmark. */
export const ShopFront: React.FC<{ x: number; y: number; s: number; c: string; z?: number }> =
  ({ x, y, s, c, z = 12 }) => (
  <div style={{ position: "absolute", left: x - 90 * s, top: y - 210 * s, width: 180 * s,
    height: 210 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, background: dkh(c, 0.5) }} />
    <div style={{ position: "absolute", left: -10 * s, top: 62 * s, width: 200 * s,
      height: 22 * s, background: dkh(c, 0.26) }} />
    <div style={{ position: "absolute", left: 26 * s, top: 96 * s, width: 60 * s,
      height: 114 * s, background: dkh(c, 0.72) }} />
    <div style={{ position: "absolute", left: 104 * s, top: 100 * s, width: 54 * s,
      height: 54 * s, background: mxh(c, 0.1) }} />
    <div style={{ position: "absolute", left: 34 * s, top: 20 * s, width: 112 * s,
      height: 30 * s, borderRadius: 3, background: mxh(c, 0.22) }} />
  </div>
);

/** a crate of the third product, carrying a drawn silhouette of what is in it */
export const EcomCrate: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 60, rot = 0 }) => (
  <div style={{ position: "absolute", left: x - 62 * s, top: y - 62 * s, width: 124 * s,
    height: 124 * s, zIndex: z, borderRadius: 4, transform: `rotate(${rot}deg)`,
    background: `linear-gradient(174deg, ${mxh(TEAL, 0.14)} 0%, ${dkh(TEAL, 0.5)} 100%)`,
    border: `${5 * s}px solid ${hexa("#000", 0.46)}` }}>
    {/* the product silhouette stencilled on the side — the crate says what it holds */}
    <svg width={78 * s} height={70 * s} viewBox="0 0 78 70"
      style={{ position: "absolute", left: 20 * s, top: 24 * s }}>
      <path d="M8 62 L8 26 L39 6 L70 26 L70 62 Z" fill={hexa("#062026", 0.62)} />
      <path d="M8 26 L39 44 L70 26" fill="none" stroke={hexa("#BFE8F0", 0.5)} strokeWidth="4" />
      <path d="M39 44 L39 62" stroke={hexa("#BFE8F0", 0.5)} strokeWidth="4" />
    </svg>
    <div style={{ position: "absolute", left: 8 * s, top: 8 * s, width: 32 * s, height: 8 * s,
      background: hexa("#FFFFFF", 0.18) }} />
  </div>
);

/* =========================================================================
   S13/S14/S15 · THE TROLLEY, THE GUIDE, THE KEYWORD
   ====================================================================== */

/** the loaded trolley — all three finished goods on one barrow */
export const Trolley: React.FC<{ x: number; y: number; f: number; tip: number; z?: number }> =
  ({ x, y, f, tip, z = 58 }) => (
  <div style={{ position: "absolute", left: x - 150, top: y - 250, width: 300, height: 250,
    zIndex: z, transformOrigin: "50% 100%", transform: `rotate(${tip}deg)` }}>
    {/* the goods, and they ROCK when it stops */}
    <div style={{ position: "absolute", left: 26, top: 12, width: 106, height: 106,
      borderRadius: "50%", background: `radial-gradient(56% 56% at 36% 30%, #A9AEB4 0%, #343B41 100%)`,
      border: `5px solid ${hexa("#000", 0.5)}`,
      transform: `rotate(${Math.sin(f / 3.4) * tip * 1.6}deg)` }} />
    <div style={{ position: "absolute", left: 146, top: 26, width: 92, height: 92,
      borderRadius: "50%", background: `radial-gradient(56% 56% at 36% 30%, ${mxh(VIOLET, 0.4)} 0%, ${dkh(VIOLET, 0.4)} 100%)`,
      border: `5px solid ${hexa("#000", 0.46)}`,
      transform: `rotate(${Math.sin(f / 4.1 + 1) * tip * 1.9}deg)` }} />
    <div style={{ position: "absolute", left: 78, top: 106, width: 110, height: 110,
      borderRadius: 5, background: `linear-gradient(174deg, ${mxh(TEAL, 0.14)} 0%, ${dkh(TEAL, 0.48)} 100%)`,
      border: `5px solid ${hexa("#000", 0.46)}` }} />
    {/* the barrow */}
    <div style={{ position: "absolute", left: 0, top: 206, width: 300, height: 22, borderRadius: 4,
      background: `linear-gradient(178deg, #8E8672 0%, #3A342A 100%)`,
      border: `3px solid ${hexa("#000", 0.5)}` }} />
    {[52, 236].map((wx, i) => (
      <div key={"wh" + i} style={{ position: "absolute", left: wx, top: 214, width: 44, height: 44,
        borderRadius: "50%", background: "#15130E",
        border: `6px solid #4A443A`, transform: `rotate(${f * 5}deg)` }}>
        <div style={{ position: "absolute", left: "50%", top: 2, width: 4, height: 15,
          marginLeft: -2, background: "#8E8672" }} />
      </div>
    ))}
  </div>
);

/** ⭐⭐⭐ THE HERO ARTIFACT. The only object that opens the gate, and the thing
    the CTA literally promises. It does not appear anywhere before S14.
    Three plates are struck into its cover on their three spoken words, each one
    brighter than the last, so the repeat reads as PROGRESS not repetition. */
export const Guide: React.FC<{ x: number; y: number; f: number; struck: number; s?: number;
  z?: number; rot?: number }> = ({ x, y, f, struck, s = 1, z = 82, rot = 0 }) => (
  <div style={{ position: "absolute", left: x - 118 * s, top: y - 154 * s, width: 236 * s,
    height: 308 * s, zIndex: z, transform: `rotate(${rot}deg)` }}>
    {/* the board — a real bound cover: boards, a banded spine, a page block */}
    <div style={{ position: "absolute", left: 14 * s, top: 0, width: 222 * s, height: 308 * s,
      borderRadius: `3px ${8 * s}px ${8 * s}px 3px`,
      background: `linear-gradient(168deg, ${mxh(CLAY, 0.06)} 0%, ${dkh(CLAY, 0.40)} 100%)`,
      border: `${4 * s}px solid ${hexa("#000", 0.5)}`, boxShadow: SH_D }}>
      {/* the tooled border — what makes it a GUIDE and not a slab */}
      <div style={{ position: "absolute", inset: `${16 * s}px`, border: `${3 * s}px solid ${hexa(GOLD, 0.60)}`,
        borderRadius: 3 }} />
      {/* the three struck plates */}
      {R.sections.map((t, i) => {
        const on = Math.max(0, Math.min(1, struck * 3 - i));
        return (
          <div key={"sc" + i} style={{ position: "absolute", left: 34 * s, top: (64 + i * 66) * s,
            width: 152 * s, height: 50 * s, borderRadius: 3,
            opacity: on, transform: `scale(${0.86 + on * 0.14})`,
            background: on > 0.5 ? mxh(GOLD, 0.10 + i * 0.16) : "transparent",
            border: `${3 * s}px solid ${hexa(GOLD, on * (0.4 + i * 0.2))}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(23 * s, 900), color: "#2A1C04", letterSpacing: "0.10em",
              opacity: on }}>{t}</span>
          </div>
        );
      })}
    </div>
    {/* the spine and its bands */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 26 * s, height: 308 * s,
      borderRadius: `${6 * s}px 0 0 ${6 * s}px`,
      background: `linear-gradient(90deg, ${dkh(CLAY, 0.56)} 0%, ${dkh(CLAY, 0.24)} 100%)`,
      border: `${4 * s}px solid ${hexa("#000", 0.5)}` }}>
      {[0.22, 0.5, 0.78].map((fy, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: -2, right: -2,
          top: 308 * s * fy, height: 7 * s, background: hexa(GOLD, 0.5) }} />
      ))}
    </div>
    {/* the page block, with visible leaves */}
    <div style={{ position: "absolute", left: 228 * s, top: 8 * s, width: 12 * s,
      height: 292 * s, background: `repeating-linear-gradient(180deg, #F4EEDC 0 4px, #CFC6AE 4px 7px)` }} />
  </div>
);

/** the press that strikes the plates into the cover */
export const StrikePress: React.FC<{ x: number; y: number; f: number; hits: number[];
  z?: number }> = ({ x, y, f, hits, z = 88 }) => {
  let drop = 0;
  for (const h of hits) drop = Math.max(drop, E(f, h - 4, h, 0, 1, IN_Q) - E(f, h, h + 9, 0, 1, OUT));
  return (
    <>
      <div style={{ position: "absolute", left: x - 20, top: -30, width: 40, height: 200 + drop * 96,
        zIndex: z, background: `linear-gradient(90deg, #6E6656 0%, #2E2A22 100%)` }} />
      <div style={{ position: "absolute", left: x - 76, top: 160 + drop * 96, width: 152,
        height: 74, zIndex: z + 1, borderRadius: 5,
        background: `linear-gradient(176deg, #A9A08A 0%, #4A443A 100%)`,
        border: `5px solid ${hexa("#000", 0.52)}` }}>
        <div style={{ position: "absolute", left: 12, bottom: -12, right: 12, height: 14,
          background: BRASS }} />
      </div>
    </>
  );
};

/** ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN — nothing crosses it, no sprite, no
    shadow. Reel 82 shipped 9/9 with the astronaut's shadow across its seal. */
export const KeywordPlate: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 92 }) => {
  const lf = f - at;
  const set = E(lf, 0, 6, 0, 1, BACK);
  const ring = E(lf, 4, 22, 0, 1, OUT);
  return (
    <>
      <div style={{ position: "absolute", left: x - 214 * s, top: y - 68 * s, width: 428 * s,
        height: 136 * s, zIndex: z, borderRadius: 12 * s,
        transform: `scale(${set})`, transformOrigin: "50% 50%",
        background: `linear-gradient(176deg, #F8F2E2 0%, #DCD0B2 100%)`,
        border: `${6 * s}px solid ${dkh(CLAY, 0.22)}`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 16 * s, boxShadow: SH_D }}>
        <div style={{ width: 74 * s, height: 74 * s, borderRadius: 16 * s, background: "#FFFFFF",
          border: `3px solid #E8DCC0`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 56 * s, height: 56 * s, objectFit: "contain" }} />
        </div>
        <span style={{ ...ui(62 * s, 900), color: INK, letterSpacing: "0.01em" }}>
          {R.keyword}
        </span>
      </div>
      {ring > 0 && ring < 1 && (
        <div style={{ position: "absolute", left: x - (214 + ring * 90) * s,
          top: y - (68 + ring * 60) * s, width: (428 + ring * 180) * s,
          height: (136 + ring * 120) * s, zIndex: z - 1, borderRadius: 16 * s,
          border: `${Math.max(2, 8 * (1 - ring)) * s}px solid ${hexa(GOLD, 0.7 * (1 - ring))}` }} />
      )}
    </>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE REAL-MARK KIT — added after Alex rejected v1:
   *"use real logos and graphics wherever possible, right now it's just random
    scenes, not hierarchical enough nor interesting, I can't even tell what's
    going on in each scene, it's way too odd and confusing."*

   ⛔⛔ THE DIAGNOSIS, AND IT IS A RULE I QUOTED IN THIS FILE AND THEN BROKE.
   Reel 115: *at half a second on a phone a viewer RECOGNISES A MARK; they do
   not decode a silhouette.* v1 drew each tool as a METAPHOR — a film mill, a
   cutting lathe, a scan gantry — and asked the viewer to decode three of them
   in 1.5s each. A metaphor has to be decoded and 1.5s has no time.

   ⭐ EVERY MARK BELOW IS SOURCED, NOT DECORATIVE:
     GitHub          all three ARE public GitHub repos; the star counts are theirs
     Hugging Face    `tencent/Hunyuan3D-2` is on HF (99,849 downloads last month)
     TikTok/IG/YT    MoneyPrinterTurbo's OWN README: "automatic uploads to
                     TikTok, Instagram and YouTube Shorts"
     Docker          MPT's README lists Docker Compose as a deployment method
     Shopify         Shopify's own docs: "Product media can include images,
                     3D models, and videos"
     Fiverr/Upwork   both spoken in the VO, twice each
   ⛔ Nothing is drawn as a rival, a replacement or an endorsement — every mark
   is either the tool's OWN home or a destination its own docs name.
   ========================================================================= */

/** the real logo, on a white tile, the way the house draws a mark */
export const RealMark: React.FC<{ src: string; s?: number; z?: number; x?: number; y?: number;
  bg?: string; inv?: boolean }> =
  ({ src, s = 64, z = 80, x, y, bg = "#FFFFFF", inv = false }) => (
  <div style={{ position: x === undefined ? "relative" : "absolute", left: x, top: y,
    width: s * 1.32, height: s * 1.32, borderRadius: s * 0.26, zIndex: z, background: bg,
    border: `${Math.max(2, s * 0.05)}px solid #E8DCC0`, display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: SH, flexShrink: 0 }}>
    <Img src={staticFile("logos/" + src)}
      style={{ width: s, height: s, objectFit: "contain",
        filter: inv ? "invert(1)" : undefined }} />
  </div>
);

/** ⭐⭐⭐ THE HERO OBJECT OF EVERY TOOL SCENE. A physical plate a Claude can
    carry, and the thing a viewer RECOGNISES in half a second: the GitHub mark
    at size, the real owner/name, the real star count, the licence.
    ⛔ It is NOT a UI screenshot — Alex has rejected those repeatedly (*"object
    scenes not UI"*). It is a machined sign, bolted, with a lit face. */
export const RepoPlate: React.FC<{ x: number; y: number; i: number; f: number; s?: number;
  z?: number; on?: number; lift?: number }> =
  ({ x, y, i, f, s = 1, z = 78, on = 1, lift = 0 }) => {
  const t = R.tools[i];
  const W0 = 560 * s, H0 = 224 * s;
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0 / 2 - lift,
      width: W0, height: H0, zIndex: z, opacity: on,
      transform: `scale(${0.86 + on * 0.14}) rotate(${(1 - on) * -6}deg)`,
      borderRadius: 14 * s,
      background: `linear-gradient(174deg, ${mxh(t.c, 0.30)} 0%, ${dkh(t.c, 0.30)} 100%)`,
      border: `${7 * s}px solid ${hexa("#000", 0.5)}`, boxShadow: SH_D,
      display: "flex", alignItems: "center", gap: 18 * s, padding: `0 ${22 * s}px` }}>
      {/* the machined highlight — one light direction, house-wide */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 6 * s,
        background: hexa("#FFFFFF", 0.30) }} />
      <RealMark src="github.svg" s={84 * s} z={z + 1} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...mono(31 * s, 900), color: "#14100A", letterSpacing: "-0.01em",
          whiteSpace: "nowrap" }}>{t.n}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 * s, marginTop: 10 * s }}>
          <span style={{ ...mono(29 * s, 900), color: "#3A2A08" }}>{"★ " + t.stars}</span>
          {t.lic && (
            <span style={{ ...mono(21 * s, 900), color: "#0E1410", background: GREEN,
              padding: `${3 * s}px ${10 * s}px`, borderRadius: 5 * s,
              letterSpacing: "0.08em" }}>{t.lic}</span>
          )}
          <span style={{ ...mono(21 * s, 900), color: "#0E1410", background: BONE,
            padding: `${3 * s}px ${10 * s}px`, borderRadius: 5 * s,
            letterSpacing: "0.06em" }}>$0</span>
        </div>
      </div>
      {/* four bolts, so it reads as a sign and not a card */}
      {[[14, 14], [W0 - 26, 14], [14, H0 - 26], [W0 - 26, H0 - 26]].map(([bx, by], k) => (
        <div key={"rb" + k} style={{ position: "absolute", left: bx, top: by, width: 12 * s,
          height: 12 * s, borderRadius: "50%", background: "#6E6656",
          border: `${2 * s}px solid ${hexa("#000", 0.5)}` }} />
      ))}
    </div>
  );
};

/** the three destinations MoneyPrinterTurbo's own README names, as lit signs
    over the bench — real marks, at a size a phone can read */
export const DestSigns: React.FC<{ x: number; y: number; f: number; on: number; s?: number;
  z?: number }> = ({ x, y, f, on, s = 1, z = 82 }) => (
  <>{["tiktok.svg", "instagram.svg", "youtube.svg"].map((src, i) => {
    const k = Math.max(0, Math.min(1, on * 3 - i));
    if (k <= 0) return null;
    return (
      <div key={"ds" + i} style={{ position: "absolute", left: x + (i - 1) * 168 * s - 52 * s,
        top: y - (1 - k) * 44 * s, zIndex: z, opacity: k,
        transform: `scale(${0.8 + k * 0.2})` }}>
        {/* the hanger, so the sign is HUNG and not floating */}
        <div style={{ position: "absolute", left: 50 * s, top: -34 * s, width: 6 * s,
          height: 34 * s, background: "#6E6656" }} />
        <RealMark src={src} s={72 * s} z={z} />
      </div>
    );
  })}</>
);

/** ⭐ THE LITERAL OUTPUT OF TOOL 1: a vertical short, playing, on a real 9:16
    frame — the format the repo actually emits (1080x1920). Not a metaphor for
    a video; a video. */
export const ShortScreen: React.FC<{ x: number; y: number; f: number; build: number;
  s?: number; z?: number }> = ({ x, y, f, build, s = 1, z = 70 }) => {
  const W0 = 240 * s, H0 = 426 * s;
  const play = Math.max(0, build);
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0 / 2, width: W0, height: H0,
      zIndex: z, borderRadius: 16 * s, overflow: "hidden",
      background: "#0C1014", border: `${8 * s}px solid #2A2620`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: "50%", top: 0, width: 76 * s, height: 18 * s,
        marginLeft: -38 * s, borderRadius: `0 0 ${10 * s}px ${10 * s}px`, background: "#2A2620",
        zIndex: 9 }} />
      {/* the footage: a legible little SCENE that CUTS every ~14 frames, which
          is what a short looks like at a glance — not a field of colour bands */}
      {(() => {
        const shot = Math.floor(f / 14) % 3;
        const sky = ["#3E6E8E", "#6E4A72", "#8E6A3A"][shot];
        const gnd = ["#2A4450", "#3E2C46", "#54401E"][shot];
        return (<>
          <div style={{ position: "absolute", inset: 0,
            background: `linear-gradient(180deg, ${sky} 0%, ${gnd} 100%)` }} />
          <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: H0 * 0.3,
            background: gnd }} />
          {/* the subject, in a different place each shot, with a shadow so it sits */}
          <div style={{ position: "absolute", left: W0 * [0.18, 0.42, 0.28][shot],
            top: H0 * 0.40 + Math.sin(f / 5) * 5 * s, width: W0 * 0.40, height: W0 * 0.40,
            borderRadius: shot === 1 ? "50%" : 10 * s, background: "#F2E6C8",
            border: `${4 * s}px solid ${hexa("#000", 0.42)}` }} />
          <div style={{ position: "absolute", left: W0 * [0.16, 0.40, 0.26][shot],
            top: H0 * 0.40 + W0 * 0.40, width: W0 * 0.44, height: 12 * s, borderRadius: "50%",
            background: hexa("#000", 0.34) }} />
        </>);
      })()}
      {/* burned-in captions — what the repo actually adds */}
      {play > 0.3 && (
        <div style={{ position: "absolute", left: 12 * s, right: 12 * s, bottom: 62 * s,
          textAlign: "center" }}>
          <span style={{ ...ui(21 * s, 900), color: "#FFF6E2", background: hexa("#000", 0.5),
            padding: `${4 * s}px ${8 * s}px`, borderRadius: 4 * s, letterSpacing: "0.01em" }}>
            {["THE SCRIPT", "THE VOICE", "THE CUT"][Math.floor(f / 14) % 3]}
          </span>
        </div>
      )}
      {/* the scrub bar filling — the render completing */}
      <div style={{ position: "absolute", left: 12 * s, right: 12 * s, bottom: 26 * s,
        height: 8 * s, borderRadius: 4 * s, background: hexa("#FFFFFF", 0.24) }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%",
          width: `${Math.min(1, play) * 100}%`, borderRadius: 4 * s, background: "#FFF6E2" }} />
      </div>
    </div>
  );
};

/** ⭐ THE LITERAL OUTPUT OF TOOL 2: one minute of real waveform going in, and a
    RANK of identical copies coming out — the same waveform, over and over. */
export const VoiceBank: React.FC<{ x: number; y: number; f: number; feed: number; out: number;
  s?: number; z?: number }> = ({ x, y, f, feed, out, s = 1, z = 70 }) => {
  const bars = 34;
  const wave = (i: number, seed: number) =>
    18 + Math.abs(Math.sin(i * 0.9 + seed) * Math.cos(i * 0.37 + seed * 1.7)) * 58;
  return (
    <>
      {/* the SOURCE: one minute, with a real waveform in it */}
      <div style={{ position: "absolute", left: x - 210 * s, top: y - 66 * s, width: 400 * s,
        height: 132 * s, zIndex: z, borderRadius: 10 * s, background: "#140F22",
        border: `${6 * s}px solid ${hexa("#000", 0.5)}`, overflow: "hidden" }}>
        {Array.from({ length: bars }, (_, i) => {
          const h = wave(i, 0) * s * (i / bars < feed ? 1 : 0.22);
          return (
            <div key={"wv" + i} style={{ position: "absolute", left: (10 + i * 11) * s,
              top: 66 * s - h / 2, width: 6 * s, height: h, borderRadius: 3 * s,
              background: i / bars < feed ? mxh(VIOLET, 0.5) : dkh(VIOLET, 0.4) }} />
          );
        })}
        <div style={{ position: "absolute", left: 12 * s, top: 8 * s,
          ...mono(20 * s, 900), color: mxh(VIOLET, 0.7), letterSpacing: "0.1em" }}>
          {R.tools[1].input}
        </div>
      </div>
      {/* the OUTPUT: the same waveform on a rank of speakers, landing one by one */}
      {Array.from({ length: 5 }, (_, i) => {
        const k = Math.max(0, Math.min(1, out * 5 - i));
        if (k <= 0) return null;
        return (
          <div key={"sk" + i} style={{ position: "absolute", left: x + (222 + i * 104) * s,
            top: y - 62 * s + (1 - k) * 54 * s, width: 104 * s, height: 124 * s, zIndex: z + 1,
            opacity: Math.min(1, k * 2), transform: `scale(${0.8 + k * 0.2})`,
            borderRadius: 8 * s, background: `linear-gradient(174deg, ${mxh(VIOLET, 0.24)} 0%, ${dkh(VIOLET, 0.36)} 100%)`,
            border: `${5 * s}px solid ${hexa("#000", 0.46)}` }}>
            <div style={{ position: "absolute", left: "50%", top: 30 * s, width: 54 * s,
              height: 54 * s, margin: `0 0 0 ${-27 * s}px`, borderRadius: "50%",
              background: "#140F22", border: `${5 * s}px solid ${dkh(VIOLET, 0.2)}` }} />
            <div style={{ position: "absolute", left: 14 * s, top: 12 * s, width: 34 * s,
              height: 7 * s, background: hexa("#FFFFFF", 0.3) }} />
          </div>
        );
      })}
    </>
  );
};

/** ⭐ THE LITERAL OUTPUT OF TOOL 3: a flat photo becoming a MESH. The wireframe
    is the whole tell — it is what makes a drawn box read as a 3D MODEL rather
    than as a box. */
export const MeshTurn: React.FC<{ x: number; y: number; f: number; k: number; s?: number;
  z?: number }> = ({ x, y, f, k, s = 1, z = 76 }) => {
  const a = f * 2.6;
  const rad = (a * Math.PI) / 180, c = Math.cos(rad), sn = Math.sin(rad);
  /* ⛔ the front face NEVER passes through edge-on — see
     memory/feedback_never_let_a_face_pass_through_edge_on */
  const fw = 208 * s * (0.5 + 0.5 * Math.abs(c));
  const sw = 56 * s * Math.abs(sn) + 16 * s;
  const right = c >= 0;
  const solid = Math.max(0, Math.min(1, k));
  return (
    <div style={{ position: "absolute", left: x - fw / 2 - (right ? 0 : sw), top: y - 150 * s,
      width: fw + sw, height: 300 * s, zIndex: z, opacity: solid }}>
      {/* top face */}
      <div style={{ position: "absolute", left: right ? 0 : sw, top: 0, width: fw, height: 46 * s,
        background: mxh(TEAL, 0.34), transform: `skewX(${-38 * (right ? 1 : -1)}deg)`,
        transformOrigin: right ? "0% 100%" : "100% 100%" }} />
      {/* side face */}
      <div style={{ position: "absolute", left: right ? fw : 0, top: 0, width: sw, height: 250 * s,
        background: dkh(TEAL, 0.44), transform: `skewY(${-38 * (right ? 1 : -1)}deg)`,
        transformOrigin: right ? "0% 0%" : "100% 0%" }} />
      {/* front face + the WIREFRAME that says "mesh" */}
      <div style={{ position: "absolute", left: right ? 0 : sw, top: 44 * s, width: fw,
        height: 206 * s, borderRadius: 6 * s, overflow: "hidden",
        background: `linear-gradient(168deg, ${dkh(TEAL, 0.42)} 0%, ${dkh(TEAL, 0.68)} 100%)`,
        border: `${5 * s}px solid ${hexa("#000", 0.5)}` }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"hz" + i} style={{ position: "absolute", left: 0, top: (i * 206 * s) / 6,
            width: "100%", height: 3 * s, background: hexa("#8FE8F8", 0.78) }} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"vt" + i} style={{ position: "absolute", left: (i * fw) / 5, top: 0,
            width: 3 * s, height: "100%", background: hexa("#8FE8F8", 0.78) }} />
        ))}
        {/* the diagonals — a mesh is TRIANGLES, and that is the recognition cue */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"dg" + i} style={{ position: "absolute", left: -20, top: (i * 206 * s) / 6,
            width: fw + 40, height: 3 * s, background: hexa("#8FE8F8", 0.5),
            transform: "rotate(24deg)", transformOrigin: "0% 50%" }} />
        ))}
        {/* ⭐ THE VERTEX DOTS. A mesh viewer draws its vertices, and nothing else
            in this vocabulary says "3D model" as fast as a lit grid of points. */}
        {Array.from({ length: 30 }, (_, i) => (
          <div key={"vx" + i} style={{ position: "absolute",
            left: ((i % 6) * fw) / 5 - 5 * s, top: (Math.floor(i / 6) * 206 * s) / 4 - 5 * s,
            width: 10 * s, height: 10 * s, borderRadius: "50%", background: "#DFF8FF" }} />
        ))}
      </div>
    </div>
  );
};

/** a real shopfront for the ecom beat — Shopify's own docs say product media
    can include 3D models, so the mark is depicting the market, not endorsing */
export const EcomFront: React.FC<{ x: number; y: number; s?: number; f: number; z?: number }> =
  ({ x, y, s = 1, f, z = 40 }) => (
  <>
    <div style={{ position: "absolute", left: x - 210 * s, top: y - 330 * s, width: 420 * s,
      height: 330 * s, zIndex: z, borderRadius: 10 * s,
      background: "linear-gradient(176deg,#F2EEE2 0%,#C6C0AE 100%)",
      border: `${8 * s}px solid ${hexa("#000", 0.44)}` }}>
      <div style={{ position: "absolute", left: 24 * s, top: 22 * s, display: "flex",
        alignItems: "center", gap: 14 * s }}>
        <RealMark src="shopify.svg" s={54 * s} z={z + 2} />
        <span style={{ ...ui(30 * s, 900), color: "#1A1813" }}>PRODUCT PAGE</span>
      </div>
      {/* the 3D viewer on the page, turning */}
      <div style={{ position: "absolute", left: 24 * s, top: 104 * s, width: 200 * s,
        height: 196 * s, borderRadius: 8 * s, background: "#1E262C",
        border: `${5 * s}px solid ${hexa("#000", 0.4)}`, overflow: "hidden" }}>
        <MeshTurn x={100 * s} y={104 * s} f={f} k={1} s={0.42 * s} z={z + 3} />
      </div>
      {[0, 1, 2].map(i => (
        <div key={"ln" + i} style={{ position: "absolute", left: 248 * s, top: (118 + i * 44) * s,
          width: (140 - i * 34) * s, height: 16 * s, borderRadius: 4 * s,
          background: hexa("#2A241C", 0.24) }} />
      ))}
      <div style={{ position: "absolute", left: 248 * s, top: 256 * s, width: 148 * s,
        height: 44 * s, borderRadius: 6 * s, background: "#3F9E74" }} />
    </div>
  </>
);
