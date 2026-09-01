import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui, E, OUT, IO, BACK, LIN,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER, MAG, INDIGO,
} from "./FreeWorld";
import { fraunces } from "./fonts";

/* ===========================================================================
   REEL 131 · "FREE" — THE PROPS.  Board: storyboards/131-free.md.

   ⛔⛔ A CONTAINER IS STILL A CONTAINER WHEN IT IS A NICE BOX. Nothing in this
   file is a rectangle with a label on it. Every object is drawn from the
   features a viewer actually uses to identify that category — a turnstile is a
   hub, three spokes, a slot with a throat, a lamp head and a plinth; a coin is
   a milled rim and a struck face; a press is a ram, a platen, a feed roller and
   an eject lip. Count the parts before rewriting the concept.

   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO — it is really "survives the
   audit's 1012->240 downsample", so anything that travels is >= 48px on its
   short side. That is why the coins are 54px and not 22px.

   ⛔ MATTE ONLY: no `boxShadow: 0 0 Npx` anywhere in this file.
   ========================================================================= */

/* =========================================================================
   0 · THE MARK TILE — the one place every logo in this reel is drawn.

   ⭐⭐ Alex, round 4: *"at 0 seconds those logos have to be like shaking or
   something or glowing etc here, more interesting animated"* and *"at 5 seconds
   have each of the logos shake a little or glow"*. Both notes are the same
   defect in two scenes: the marks were BIG and INERT — white squares that
   arrive and then hold for the rest of the shot.

   ⛔ AND "GLOW" CANNOT BE A GLOW. `feedback_reel_matte_palette` is standing and
   `look_audit` greps for it: no `boxShadow: 0 0 Npx` anywhere in the house. The
   legal — and better — version is a GLINT: a hard diagonal highlight that
   SWEEPS across the tile face and is clipped by it, which is what light doing
   across glass actually looks like. It also measures, where a static bloom does
   not: the audit means the absolute difference between greyscale samples, so a
   band travelling the tile repaints real area and a halo repaints nothing.

   Three layers, all per-index so a row is never in lockstep:
     WOBBLE  a continuous 1.8deg / 3px sway on its own clock and phase
     GLINT   a 34deg highlight crossing every ~86 frames, staggered by index
     POP     an arrival overshoot with a ring, when `at` is passed
   ====================================================================== */
export const MarkTile: React.FC<{
  x: number; y: number; d: number; f: number; i?: number; z?: number;
  logo?: string | null; name?: string; c?: string; at?: number | null;
  radius?: number; tint?: string; still?: boolean;
}> = ({ x, y, d, f, i = 0, z = 60, logo, name, c = CLAY, at = null,
        radius, tint = "#FDFBF6", still = false }) => {
  const R = radius ?? d * 0.21;
  const lf = at === null ? 999 : f - at;
  if (at !== null && lf < -1) return null;
  const pop = at === null ? 1 : E(lf, 0, 9, 0, 1, BACK);
  /* the wobble — every tile on its own rate AND phase, so five of them read as
     five objects rather than one animation played five times */
  const ph = i * 1.37;
  const wob = still ? 0 : Math.sin(f / (13 + (i % 4) * 2.6) + ph) * 1.8;
  const bob = still ? 0 : Math.sin(f / (17 + (i % 3) * 3.1) + ph * 1.6) * 3;
  /* the glint — a hard band crossing the face, clipped to it */
  const period = 86, gt = ((f + i * 21) % period) / period;
  const gx = gt < 0.34 ? -0.4 + (gt / 0.34) * 1.8 : null;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2 + bob, width: d,
      height: d, zIndex: z, transform: `rotate(${wob}deg) scale(${pop})`,
      transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: R, background: tint,
        border: `${Math.max(3, d * 0.028)}px solid ${hexa("#000", 0.14)}`,
        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {logo
          ? <Img src={staticFile(logo)}
              style={{ width: d * 0.68, height: d * 0.68, objectFit: "contain" }} />
          : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
              fontSize: d * 0.56, color: dkh(c, 0.28) }}>{(name ?? "?")[0]}</span>}
        {/* ⛔ MATTE: a travelling highlight band, not an emissive halo */}
        {gx !== null && (
          <div style={{ position: "absolute", left: `${gx * 100}%`, top: -d * 0.4,
            width: d * 0.42, height: d * 1.8, transform: "rotate(34deg)",
            background: `linear-gradient(90deg, ${hexa("#FFFFFF", 0)} 0%, ${hexa("#FFFFFF", 0.72)} 50%, ${hexa("#FFFFFF", 0)} 100%)` }} />
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   1 · THE TURNSTILE — the hero artifact. The same object at S0 (takes a coin,
   gives one quarter-turn, SLAMS) and at S11 (swings up and stays up).
   Eighteen drawn parts: plinth, bolt ring, kiosk body, body bevel, fascia
   reveal, coin throat, coin slot lip, reject cup, fare counter with three
   numeral wheels, lamp housing, lamp lens, lamp hood, head plate (rotatable),
   hub cap, hub bolts, three spokes, three rubber bumpers, and a stencil strip.
   ====================================================================== */
export const Turnstile: React.FC<{
  x: number; y: number; s?: number; z?: number; f?: number;
  /** arm rotation in degrees — S0 steps it by 118, S11 lifts it to -104 */
  arm?: number;
  /** 0 = locked red, 1 = released green */
  open?: number;
  /** the fare head's own rotation, so the reveal is the ROTATION not the travel */
  headRot?: number;
  head?: string;
  /** the head plate on its mast. Off at the hook (the hanging tariff board is
      already carrying that job) and ON at S11, where the plate turning into
      readability IS the payoff. */
  showHead?: boolean;
  /** riveted blank over the slot: this gate takes nothing */
  plated?: boolean;
  count?: string;
  stencil?: string;
  dim?: number;
  /** the spokes are drawn IN FRONT of the hero on purpose — he is leaning on
      them. Pass a z above his. */
  armZ?: number;
}> = ({ x, y, s = 1, z = 60, f = 0, arm = 0, open = 0, headRot = 0, head = "FARE",
        showHead = false, plated = false, count = "000", stencil, dim = 0, armZ }) => {
  /* ⛔ PROPORTION IS A BOARD-TIME CHECK. A turnstile is recognised by a
     WAIST-HIGH pedestal with THREE ARMS radiating off it — not by a tall
     cabinet. Against a 320px hero (1.75m) one metre is 183px, so the pedestal
     is 208 and the spokes are 152 (0.83m), which is what a real tripod arm is.
     v1 drew a 292px cabinet with 14px spokes and read as a petrol pump. */
  const BW = 156 * s, BH = 208 * s;
  const RAD = 152 * s, SPK = 26 * s;
  const bodyC = dkh("#E2DACA", dim * 0.45);
  const lamp = open > 0.5 ? "#5FD48F" : "#E0563E";
  const hubX = BW / 2 + 26 * s, hubY = -168 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z }}>
      {/* 1 · the lane marking on the floor, so the gate is IN a place */}
      <div style={{ position: "absolute", left: -BW * 0.4, top: -8 * s, width: RAD * 2.2,
        height: 16 * s, zIndex: 0, background: hexa("#F0E4C4", 0.26) }} />
      {/* 2 · the plinth it is bolted to */}
      <div style={{ position: "absolute", left: -BW * 0.64, top: -28 * s, width: BW * 1.28,
        height: 32 * s, zIndex: 1, borderRadius: 4 * s, background: dkh("#4A4238", dim * 0.3) }} />
      {/* 3 · the bolt ring */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"bt" + i} style={{ position: "absolute", left: -BW * 0.5 + i * BW * 0.25,
          top: -22 * s, width: 12 * s, height: 12 * s, borderRadius: "50%", zIndex: 2,
          background: dkh(STEEL, 0.34) }} />
      ))}
      {/* 4 · the pedestal, with a real bevel down its face */}
      <div style={{ position: "absolute", left: -BW / 2, top: -BH - 26 * s, width: BW, height: BH,
        zIndex: 3, borderRadius: `${16 * s}px ${16 * s}px ${4 * s}px ${4 * s}px`,
        background: `linear-gradient(96deg, ${mxh(bodyC, 0.18)} 0%, ${bodyC} 40%, ${dkh(bodyC, 0.26)} 100%)`,
        border: `${4 * s}px solid ${dkh("#8C8271", 0.06)}` }} />
      {/* 5 · the recessed fascia */}
      <div style={{ position: "absolute", left: -BW / 2 + 14 * s, top: -BH - 12 * s,
        width: BW - 28 * s, height: BH * 0.44, zIndex: 4, borderRadius: 6 * s,
        background: dkh(bodyC, 0.16), borderTop: `${3 * s}px solid ${hexa("#000", 0.22)}` }} />
      {/* 6,7 · the coin throat and its lipped slot — the feature that says
             "this machine takes money". Plated over at S11. */}
      <div style={{ position: "absolute", left: -34 * s, top: -BH + 4 * s, width: 68 * s,
        height: 66 * s, zIndex: 6, borderRadius: 5 * s, background: dkh("#4A4237", 0.20) }} />
      {plated ? (
        <>
          <div style={{ position: "absolute", left: -42 * s, top: -BH - 2 * s, width: 84 * s,
            height: 60 * s, zIndex: 7, borderRadius: 4 * s, background: mxh(CREAMB, 0.24),
            border: `${3 * s}px solid ${dkh("#8C8271", 0.05)}` }} />
          {[0, 1, 2, 3].map(i => (
            <div key={"rv" + i} style={{ position: "absolute",
              left: -32 * s + (i % 2) * 56 * s, top: -BH + 6 * s + Math.floor(i / 2) * 40 * s,
              width: 10 * s, height: 10 * s, borderRadius: "50%", zIndex: 8,
              background: dkh(STEEL, 0.2) }} />
          ))}
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: -27 * s, top: -BH + 20 * s, width: 54 * s,
            height: 16 * s, zIndex: 8, borderRadius: 3 * s, background: "#100E0A" }} />
          <div style={{ position: "absolute", left: -29 * s, top: -BH + 15 * s, width: 58 * s,
            height: 7 * s, zIndex: 9, borderRadius: 3 * s, background: mxh(BRASS, 0.26) }} />
        </>
      )}
      {/* 8 · the reject cup */}
      <div style={{ position: "absolute", left: -30 * s, top: -BH + 78 * s, width: 60 * s,
        height: 24 * s, zIndex: 6, borderRadius: `0 0 ${12 * s}px ${12 * s}px`,
        background: dkh("#3E382E", 0.1) }} />
      {/* 9 · the fare counter — three numeral wheels behind a window */}
      <div style={{ position: "absolute", left: -52 * s, top: -BH + 118 * s, width: 104 * s,
        height: 42 * s, zIndex: 7, borderRadius: 4 * s, background: "#15130F",
        border: `${3 * s}px solid ${dkh("#8C8271", 0.06)}`, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 4 * s }}>
        {count.split("").map((d, i) => (
          <span key={"nm" + i} style={{ ...mono(24 * s, 900), color: mxh(SODIUM, 0.24),
            background: "#241F16", padding: `${1 * s}px ${5 * s}px`, borderRadius: 2 }}>{d}</span>
        ))}
      </div>
      {/* 10 · a stencil strip — where a real machine puts its model */}
      {stencil && (
        <div style={{ position: "absolute", left: -BW / 2 + 12 * s, top: -BH + 168 * s,
          width: BW - 24 * s, zIndex: 7, textAlign: "center" }}>
          <span style={{ ...mono(14 * s, 900), color: hexa("#2E2618", 0.66), letterSpacing: 2.4 }}>
            {stencil}
          </span>
        </div>
      )}
      {/* 11,12,13 · the lamp head sitting ON the pedestal — housing, hood and a
             lens that changes VALUE, not only hue (the audit is greyscale, and
             so is a phone at arm's length in daylight) */}
      <div style={{ position: "absolute", left: -52 * s, top: -BH - 88 * s, width: 104 * s,
        height: 62 * s, zIndex: 5, borderRadius: `${10 * s}px ${10 * s}px 0 0`,
        background: dkh("#5A5145", 0.10) }} />
      <div style={{ position: "absolute", left: -38 * s, top: -BH - 76 * s, width: 76 * s,
        height: 44 * s, zIndex: 6, borderRadius: 6 * s,
        background: open > 0.5 ? mxh(lamp, 0.30) : mxh(lamp, 0.02),
        border: `${3 * s}px solid ${hexa("#000", 0.34)}` }} />
      <div style={{ position: "absolute", left: -58 * s, top: -BH - 98 * s, width: 116 * s,
        height: 16 * s, zIndex: 7, borderRadius: 4 * s, background: dkh("#3A342A", 0) }} />

      {/* 14 · THE HEAD PLATE ON ITS MAST — off at the hook, and at S11 it is the
             thing that ROTATES INTO READABILITY as the arm lifts. */}
      {showHead && (<>
        <div style={{ position: "absolute", left: -11 * s, top: -BH - 150 * s, width: 22 * s,
          height: 62 * s, zIndex: 5, background: dkh("#5A5145", 0.16) }} />
        <div style={{ position: "absolute", left: -86 * s, top: -BH - 230 * s, width: 172 * s,
          height: 82 * s, zIndex: 9, transformOrigin: "50% 100%",
          transform: `rotate(${headRot}deg)`,
          borderRadius: 7 * s, background: `linear-gradient(172deg, #F6F2E7 0%, #DDD5C1 100%)`,
          border: `${5 * s}px solid ${dkh("#8C8271", 0.02)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44 * s,
            color: "#241F17", letterSpacing: "0.03em" }}>{head}</span>
        </div>
      </>)}

      {/* 15,16 · the hub the arm turns on, and its bolts */}
      <div style={{ position: "absolute", left: hubX - 30 * s, top: hubY - 30 * s, width: 60 * s,
        height: 60 * s, borderRadius: "50%", zIndex: (armZ ?? z + 30) - 1,
        background: `linear-gradient(150deg, ${mxh(STEEL, 0.10)} 0%, ${dkh(STEEL, 0.34)} 100%)`,
        border: `${5 * s}px solid ${dkh("#26221B", 0)}` }} />
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"hb" + i} style={{ position: "absolute",
          left: hubX - 5 * s + Math.cos(i * 1.571) * 17 * s,
          top: hubY - 5 * s + Math.sin(i * 1.571) * 17 * s,
          width: 10 * s, height: 10 * s, borderRadius: "50%", zIndex: armZ ?? z + 30,
          background: dkh("#0E0C08", 0) }} />
      ))}
      {/* 17,18,19 · THREE SPOKES with rubber bumpers, drawn IN FRONT of the
             hero because he is leaning on them. The arm is the silhouette a
             viewer recognises, so it is 26px thick against 14 in v1 — at
             1012->240 a 14px bar is 3px and vanishes. */}
      <div style={{ position: "absolute", left: hubX, top: hubY, width: 0, height: 0,
        zIndex: armZ ?? z + 30, transform: `rotate(${arm}deg)` }}>
        {[0, 120, 240].map((a, i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: 0, top: -SPK / 2,
            width: RAD, height: SPK, borderRadius: SPK / 2, transformOrigin: "0% 50%",
            transform: `rotate(${a}deg)`,
            background: `linear-gradient(180deg, ${mxh(BRASS, 0.34)} 0%, ${BRASS} 42%, ${dkh(BRASS, 0.34)} 100%)`,
            border: `${3 * s}px solid ${hexa("#000", 0.28)}` }}>
            {/* the rubber cap on the tip — brass with a dark rim, not a black
                ball. v1's solid dark cap read as a knob on a lever. */}
            <div style={{ position: "absolute", right: -12 * s, top: -6 * s, width: 34 * s,
              height: 34 * s, borderRadius: "50%",
              background: `linear-gradient(150deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.26)} 100%)`,
              border: `${4 * s}px solid ${hexa("#000", 0.34)}` }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   2 · THE COIN — a milled disc with a struck face. ⛔ NO DENOMINATION: no
   amount is spoken anywhere in the VO, and a number here would be invented.
   54px at s=1 so it survives the audit's 1012->240 downsample while travelling.
   ====================================================================== */
export const Coin: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  c?: string; dim?: number }> =
  ({ x, y, s = 1, z = 70, rot = 0, c = BRASS, dim = 0 }) => {
  const D = 54 * s;
  const face = dkh(c, dim * 0.4);
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      {/* the milled edge — 16 ticks, the feature that says COIN not disc */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: dkh(face, 0.30) }} />
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"ml" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: D * 0.5, height: 2.5 * s, marginTop: -1.25 * s, transformOrigin: "0% 50%",
          transform: `rotate(${i * 22.5}deg)`, background: hexa("#000", 0.3) }} />
      ))}
      <div style={{ position: "absolute", inset: D * 0.10, borderRadius: "50%",
        background: `linear-gradient(150deg, ${mxh(face, 0.30)} 0%, ${face} 52%, ${dkh(face, 0.24)} 100%)` }} />
      {/* the struck relief in the middle */}
      <div style={{ position: "absolute", inset: D * 0.28, borderRadius: "50%",
        border: `${2.5 * s}px solid ${hexa("#000", 0.26)}` }} />
      <div style={{ position: "absolute", left: D * 0.42, top: D * 0.36, width: D * 0.16,
        height: D * 0.28, borderRadius: 2, background: hexa("#000", 0.22) }} />
    </div>
  );
};

/** the heap the hook stands in — coins already spent, drawn as real coins */
export const CoinHeap: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  seed?: number; c?: string }> =
  ({ x, y, n = 14, s = 1, z = 68, seed = 4, c = BRASS }) => (
  <>{Array.from({ length: n }, (_, i) => (
    <Coin key={"hp" + i} s={s * (0.72 + rnd(seed, i) * 0.30)} z={z + (i % 4)}
      x={x + (rnd(seed + 1, i) - 0.5) * 250 * s}
      y={y - Math.floor(i / 5) * 17 * s - rnd(seed + 2, i) * 10 * s}
      rot={rnd(seed + 3, i) * 180} c={c} dim={0.18 + (i % 3) * 0.12} />
  ))}</>
);

/* =========================================================================
   3 · THE MODEL PLATE — one per model the VO names.
   ⛔ IDENTITY IS SHAPE **AND** COLOUR. Reel 115 shipped five plates wearing the
   same white tile and five identical bright squares became the loudest thing in
   frame. Every plate here has its own paint, its own name strip and its own
   seat lamp; the white mark tile is the small part, not the plate.
   ⛔ AND A MISSING MARK IS DRAWN AS MISSING (Grok): a stencilled name in the
   tile's place, never a substituted logo.
   ====================================================================== */
export const ModelPlate: React.FC<{
  x: number; y: number; s?: number; z?: number; n: string; c: string; fg: string;
  logo?: string | null; lit?: number; rot?: number; f?: number;
}> = ({ x, y, s = 1, z = 60, n, c, fg, logo, lit = 0, rot = 0, f = 0 }) => {
  /* ⭐⭐ THE MARK IS THE PLATE, NOT A BADGE ON IT (Alex, round 2: *"when you
     mention every top AI tool I should see all of the logos, and use more logos
     of the top sites, big, throughout"*). v1 put a 74px tile on a 210px plate at
     s=0.86 — a 64px mark on a phone, which is a decoration. At half a second a
     viewer RECOGNISES A MARK; they do not decode a coloured rectangle. The tile
     is now 62% of the plate's width and the paint is a frame around it. */
  const PW = 176 * s, PH = 218 * s, D = 128 * s;
  return (
    <div style={{ position: "absolute", left: x - PW / 2, top: y - PH, width: PW, height: PH,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* 1 · the plate body in the product's own paint */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
        background: `linear-gradient(168deg, ${mxh(c, 0.22)} 0%, ${c} 44%, ${dkh(c, 0.28)} 100%)`,
        border: `${5 * s}px solid ${dkh(c, 0.44)}` }} />
      {/* 2 · a machined top bevel */}
      <div style={{ position: "absolute", left: 8 * s, right: 8 * s, top: 6 * s, height: 7 * s,
        borderRadius: 4 * s, background: hexa("#FFFFFF", 0.26) }} />
      {/* 3 · the seat notch, so it reads as a thing that SEATS into a rack */}
      <div style={{ position: "absolute", left: PW / 2 - 28 * s, bottom: -8 * s, width: 56 * s,
        height: 16 * s, borderRadius: `0 0 ${6 * s}px ${6 * s}px`, background: dkh(c, 0.5) }} />
      {/* 4 · THE MARK, on a big white tile — or, where no mark exists, the
             initial stencilled at the same size. ⛔ GROK has no mark anywhere
             (checked on the Simple Icons CDN), and a wrong mark is worse. */}
      <MarkTile x={PW / 2} y={20 * s + D / 2} d={D} f={f} i={n.length} z={4}
        logo={logo} name={n} c={c} radius={D * 0.22} />
      {/* 5 · the name strip under the mark */}
      <div style={{ position: "absolute", left: 9 * s, right: 9 * s, bottom: 26 * s,
        height: 32 * s, borderRadius: 5 * s, background: hexa("#0A0A0C", 0.34),
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(Math.min(19, 116 / n.length) * s, 900), color: mxh(c, 0.64),
          letterSpacing: 1.4, whiteSpace: "nowrap" }}>{n}</span>
      </div>
      {/* 6 · the seat lamp — off until it is seated, then it holds */}
      <div style={{ position: "absolute", left: PW / 2 - 32 * s, bottom: 9 * s, width: 64 * s,
        height: 10 * s, borderRadius: 5 * s,
        background: lit > 0.5 ? mxh(GREEN, 0.26) : hexa("#000", 0.34) }} />
    </div>
  );
};

/* =========================================================================
   4 · THE RACK — the counter the plates seat into. It must read while it is
   still EMPTY, because empty is the promise (reel 110: an empty container
   painted like its room is a patch of wall). So the empty seats are BRIGHT
   bone recesses against a dark bench, not black holes.
   ====================================================================== */
export const PlateRack: React.FC<{ x: number; y: number; n?: number; pitch?: number;
  s?: number; z?: number; lit?: number; f?: number; filled?: number }> =
  ({ x, y, n = 7, pitch = 232, s = 1, z = 40, lit = 0, f = 0, filled = 0 }) => (
  <>
    {/* the bench top, running the full width — a full-width high-contrast band */}
    <div style={{ position: "absolute", left: x - 40, top: y, width: pitch * n + 80, height: 34 * s,
      zIndex: z, borderRadius: 4, background: `linear-gradient(180deg, ${mxh("#8A6A42", 0.24)} 0%, ${dkh("#8A6A42", 0.34)} 100%)` }} />
    <div style={{ position: "absolute", left: x - 40, top: y + 34 * s, width: pitch * n + 80,
      height: 20 * s, zIndex: z, background: dkh("#5A431F", 0.3) }} />
    {/* the seats — bone recesses, legible while empty */}
    {Array.from({ length: n }, (_, i) => (
      <React.Fragment key={"st" + i}>
        <div style={{ position: "absolute", left: x + i * pitch - 96 * s, top: y - 22 * s,
          width: 192 * s, height: 26 * s, zIndex: z + 1, borderRadius: 4,
          background: i < filled ? dkh("#6A5230", 0.2) : mxh(CREAMB, 0.06),
          border: `${3 * s}px solid ${hexa("#000", 0.3)}` }} />
        {/* the seat's own tally lamp under the lip — an ascending run when the
            rack completes, which is what makes a repeated reward read as
            PROGRESS rather than as repetition */}
        <div style={{ position: "absolute", left: x + i * pitch - 34 * s, top: y + 60 * s,
          width: 68 * s, height: 12 * s, zIndex: z + 1, borderRadius: 6,
          background: i < lit ? mxh(GREEN, 0.30) : hexa("#000", 0.4) }} />
      </React.Fragment>
    ))}
  </>
);

/* =========================================================================
   5 · THE TAB BOARD — a browser tab as a physical sign that FLIPS SHUT.
   The VO's verb is "switching tabs", so the object is a tab and the action is
   it closing (reel 120: the VO's VERB names the fix).
   ====================================================================== */
export const TabBoard: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number;
  z?: number; c?: string; shut?: number; label?: string; logo?: string | null }> =
  ({ x, y, w: ww = 178, h: hh = 108, s = 1, z = 50, c = STEEL, shut = 0, label, logo }) => (
  <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y, width: ww * s, height: hh * s,
    zIndex: z, transformOrigin: "50% 0%", transform: `perspective(700px) rotateX(${-shut * 92}deg)` }}>
    {/* the tab's shoulder — the shape that says TAB and not RECTANGLE */}
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
      borderRadius: `${12 * s}px ${28 * s}px 0 0`,
      background: `linear-gradient(174deg, ${mxh(c, 0.20)} 0%, ${c} 50%, ${dkh(c, 0.30)} 100%)`,
      border: `${3 * s}px solid ${hexa("#000", 0.34)}` }} />
    {/* ⭐ THE FAVICON IS THE TAB. 44px was a dot; at 74px the mark is the thing
        you read and the title bars are the decoration, which is the right way
        round for a shot that is about WHICH tabs these are. */}
    <div style={{ position: "absolute", left: 14 * s, top: 14 * s, width: 74 * s, height: 74 * s,
      borderRadius: 14 * s, background: logo ? "#FBF8F0" : hexa("#000", 0.24),
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      {logo && <Img src={staticFile(logo)}
        style={{ width: 52 * s, height: 52 * s, objectFit: "contain" }} />}
    </div>
    {/* two title lines, drawn as bars — type is read, graphics are watched */}
    <div style={{ position: "absolute", left: 100 * s, top: 26 * s, width: ww * s - 132 * s,
      height: 12 * s, borderRadius: 5, background: hexa("#000", 0.34) }} />
    <div style={{ position: "absolute", left: 100 * s, top: 46 * s, width: ww * s - 164 * s,
      height: 10 * s, borderRadius: 5, background: hexa("#000", 0.22) }} />
    {/* the close cross */}
    {[45, -45].map((a, i) => (
      <div key={"cx" + i} style={{ position: "absolute", right: 18 * s, top: 34 * s, width: 22 * s,
        height: 4 * s, borderRadius: 2, background: hexa("#000", 0.44),
        transform: `rotate(${a}deg)` }} />
    ))}
    {label && (
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 12 * s, textAlign: "center" }}>
        <span style={{ ...mono(15 * s, 900), color: hexa("#0A0A0C", 0.62), letterSpacing: 1.8 }}>
          {label}
        </span>
      </div>
    )}
  </div>
);

/* =========================================================================
   6 · THE SUBSCRIPTION DISC — what the hero is juggling at S5. A disc, not a
   card, because a card cannot be juggled legibly: a circle keeps its
   silhouette at every rotation.
   ====================================================================== */
export const SubDisc: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  c?: string; logo?: string | null; n?: string }> =
  ({ x, y, s = 1, z = 70, rot = 0, c = CLAY, logo, n }) => {
  const D = 112 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: dkh(c, 0.38) }} />
      <div style={{ position: "absolute", inset: 5 * s, borderRadius: "50%",
        background: `linear-gradient(160deg, ${mxh(c, 0.22)} 0%, ${c} 54%, ${dkh(c, 0.24)} 100%)`,
        border: `${3 * s}px solid ${hexa("#000", 0.24)}` }} />
      {/* ⭐ the punched centre is the MARK, and it is 44% of the disc rather than
          the 28% v1 drew — a 31px logo on a 112px token is not a logo. */}
      <div style={{ position: "absolute", inset: D * 0.20, borderRadius: "50%",
        background: "#FBF8F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {logo
          ? <Img src={staticFile(logo)} style={{ width: D * 0.44, height: D * 0.44, objectFit: "contain" }} />
          : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: D * 0.40,
              color: dkh(c, 0.3) }}>{n?.[0] ?? "?"}</span>}
      </div>
      {/* eight notches round the rim */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"nt" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: D * 0.46, height: 5 * s, marginTop: -2.5 * s, transformOrigin: "0% 50%",
          transform: `rotate(${i * 45}deg)`, background: hexa("#000", 0.20) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   7 · THE IMAGE PRESS — ram, platen, feed roller, eject lip, maker tile and a
   stencilled product name. ⛔ A PRESS THAT PRODUCES NOTHING IS A PROGRESS BAR
   (reel 109 §10): every slam here ejects a drawn PICTURE.
   ====================================================================== */
export const Press: React.FC<{
  x: number; y: number; s?: number; z?: number; f?: number; ram?: number;
  n: string; c: string; fg: string; logo?: string | null; hot?: number;
}> = ({ x, y, s = 1, z = 50, f = 0, ram = 0, n, c, fg, logo, hot = 0 }) => {
  const FW = 250 * s, FH = 330 * s;
  return (
    <div style={{ position: "absolute", left: x - FW / 2, top: y - FH, width: FW, height: FH,
      zIndex: z }}>
      {/* 1 · the two uprights of the frame */}
      {[0, FW - 34 * s].map((ux, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: ux, top: 0, width: 34 * s,
          height: FH, background: `linear-gradient(90deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.34)} 100%)` }} />
      ))}
      {/* 2 · the crown */}
      <div style={{ position: "absolute", left: -12 * s, top: 0, width: FW + 24 * s, height: 46 * s,
        borderRadius: 5 * s, background: dkh(SLATE, 0.14),
        borderBottom: `${5 * s}px solid ${hexa("#000", 0.4)}` }} />
      {/* 3 · the maker tile, struck into the crown */}
      {/* ⭐ THE MAKER'S MARK ON THE CROWN, 96px not 34px. These three presses are
             the only place Google, ByteDance and OpenAI appear as makers, and at
             34px nobody could tell which press was which. */}
      {logo && (
        <div style={{ position: "absolute", left: FW / 2 - 48 * s, top: -78 * s, width: 96 * s,
          height: 96 * s, borderRadius: 20 * s, background: "#FBF8F0",
          border: `${4 * s}px solid ${hexa("#000", 0.16)}`, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(logo)} style={{ width: 66 * s, height: 66 * s, objectFit: "contain" }} />
        </div>
      )}
      {/* 4 · the product name, stencilled under the mark */}
      <div style={{ position: "absolute", left: 10 * s, top: 12 * s, width: FW - 20 * s,
        textAlign: "center" }}>
        <span style={{ ...mono(Math.min(21, 220 / n.length) * s, 900), color: mxh(c, 0.56),
          letterSpacing: 2 }}>{n}</span>
      </div>
      {/* 5 · the RAM — travels 118px, i.e. 0.36 of the press's own height */}
      <div style={{ position: "absolute", left: 40 * s, top: 46 * s + ram * 118 * s,
        width: FW - 80 * s, height: 78 * s, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.36)} 100%)`,
        border: `${4 * s}px solid ${hexa("#000", 0.36)}` }}>
        <div style={{ position: "absolute", left: 10 * s, right: 10 * s, top: 12 * s, height: 8 * s,
          background: hexa("#FFF", 0.18), borderRadius: 4 }} />
      </div>
      {/* 6 · the ram's guide rod */}
      <div style={{ position: "absolute", left: FW / 2 - 9 * s, top: 30 * s, width: 18 * s,
        height: 60 * s + ram * 118 * s, background: dkh(STEEL, 0.2) }} />
      {/* 7 · the PLATEN — the bed the picture is struck on. Lights on the slam. */}
      <div style={{ position: "absolute", left: 26 * s, top: FH - 118 * s, width: FW - 52 * s,
        height: 46 * s, borderRadius: 3 * s,
        background: hot > 0.4 ? mxh(c, 0.42) : dkh(c, 0.46),
        border: `${3 * s}px solid ${hexa("#000", 0.4)}` }} />
      {/* 8 · the feed roller — the background process, always turning */}
      <div style={{ position: "absolute", left: 8 * s, top: FH - 74 * s, width: 46 * s,
        height: 46 * s, borderRadius: "50%", background: dkh("#2A2A30", 0),
        border: `${4 * s}px solid ${dkh(STEEL, 0.3)}`, overflow: "hidden" }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: 20 * s, height: 5 * s, marginTop: -2.5 * s, transformOrigin: "0% 50%",
            transform: `rotate(${i * 60 + f * 7}deg)`, background: mxh(STEEL, 0.2) }} />
        ))}
      </div>
      {/* 9 · the eject lip the sheet comes out of */}
      <div style={{ position: "absolute", left: FW - 74 * s, top: FH - 66 * s, width: 74 * s,
        height: 16 * s, borderRadius: 3 * s, background: "#100E0A" }} />
      {/* 10 · the base */}
      <div style={{ position: "absolute", left: -16 * s, top: FH - 46 * s, width: FW + 32 * s,
        height: 46 * s, borderRadius: 4 * s, background: dkh(SLATE, 0.42) }} />
    </div>
  );
};

/** the printed sheet a press ejects — three DRAWN pictures, never a blank card.
    kind 0 = a still life (Nano Banana) · 1 = a motion strip (Seedance) ·
    2 = a portrait (GPT Image). */
export const PrintSheet: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  kind?: number; c?: string }> =
  ({ x, y, s = 1, z = 78, rot = 0, kind = 0, c = GOLD }) => {
  const PW = 128 * s, PH = 96 * s;
  return (
    <div style={{ position: "absolute", left: x - PW / 2, top: y - PH / 2, width: PW, height: PH,
      zIndex: z, transform: `rotate(${rot}deg)`, borderRadius: 3 * s,
      background: "#F6F1E4", border: `${3 * s}px solid ${hexa("#000", 0.18)}`, overflow: "hidden" }}>
      {kind === 0 && (<>
        {/* a still life: a table line, a bowl and a piece of fruit */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${mxh(SKY, 0.5)} 0%, ${mxh(CREAMB, 0.4)} 62%, ${dkh(OXIDE, 0.3)} 100%)` }} />
        <div style={{ position: "absolute", left: PW * 0.16, top: PH * 0.52, width: PW * 0.52,
          height: PH * 0.24, borderRadius: `0 0 ${PW * 0.26}px ${PW * 0.26}px`, background: dkh(SLATE, 0.1) }} />
        <div style={{ position: "absolute", left: PW * 0.30, top: PH * 0.34, width: PW * 0.36,
          height: PH * 0.22, borderRadius: "50%", background: c,
          transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", left: PW * 0.62, top: PH * 0.60, width: PW * 0.22,
          height: PH * 0.20, borderRadius: "50%", background: dkh(GREEN, 0.1) }} />
      </>)}
      {kind === 1 && (<>
        {/* a motion strip: four frames of a figure mid-stride */}
        <div style={{ position: "absolute", inset: 0, background: dkh(MAG, 0.42) }} />
        {[0, 1, 2, 3].map(i => (
          <React.Fragment key={"mf" + i}>
            <div style={{ position: "absolute", left: 4 * s + i * (PW - 8 * s) / 4,
              top: 4 * s, width: (PW - 12 * s) / 4, height: PH - 8 * s,
              background: hexa("#FFF", 0.06), border: `1px solid ${hexa("#FFF", 0.14)}` }} />
            <div style={{ position: "absolute",
              left: 4 * s + i * (PW - 8 * s) / 4 + (PW - 12 * s) / 8 - 5 * s,
              top: PH * (0.30 + i * 0.06), width: 10 * s, height: PH * 0.34,
              borderRadius: 4, background: mxh(c, 0.3),
              transform: `rotate(${(i - 1.5) * 16}deg)` }} />
          </React.Fragment>
        ))}
      </>)}
      {kind === 2 && (<>
        {/* a portrait: a shoulder line and a head against a lit ground */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 60% at 50% 34%, ${mxh(c, 0.44)} 0%, ${dkh(INDIGO, 0.18)} 100%)` }} />
        <div style={{ position: "absolute", left: PW * 0.24, top: PH * 0.52, width: PW * 0.52,
          height: PH * 0.48, borderRadius: `${PW * 0.24}px ${PW * 0.24}px 0 0`, background: dkh(INK, 0) }} />
        <div style={{ position: "absolute", left: PW * 0.34, top: PH * 0.18, width: PW * 0.32,
          height: PH * 0.36, borderRadius: "48% 48% 42% 42%", background: dkh("#3A2A22", 0) }} />
      </>)}
      {/* the sheet's own crop border, so it reads as a PRINT */}
      <div style={{ position: "absolute", inset: 5 * s, border: `${2 * s}px solid ${hexa("#F6F1E4", 0.7)}` }} />
    </div>
  );
};

/* =========================================================================
   8 · THE REASONING ENGINE — a brass beam engine: flywheel with spokes, a
   governor with two balls, a piston in a cylinder, a connecting rod, a
   crank pin, a bed plate and a nameplate. It is drawn as a MACHINE because
   the VO's noun is "engines"; an abstract glowing core would satisfy the
   motion audit and depict nothing (reel 110 §10).
   ====================================================================== */
export const Engine: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  run?: number; tier?: string; c?: string }> =
  ({ x, y, s = 1, z = 50, f = 0, run = 0, tier = "I", c = BRASS }) => {
  const BW = 172 * s, BH = 230 * s;
  const th = f * run * 0.28;
  const pist = Math.sin(th) * 34 * s;
  const gov = 14 + run * 26;
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH, width: BW, height: BH,
      zIndex: z }}>
      {/* 1 · the bed plate */}
      <div style={{ position: "absolute", left: -14 * s, top: BH - 34 * s, width: BW + 28 * s,
        height: 34 * s, borderRadius: 4 * s, background: dkh(SLATE, 0.3) }} />
      {/* 2 · the column */}
      <div style={{ position: "absolute", left: BW * 0.06, top: 44 * s, width: 30 * s,
        height: BH - 78 * s, background: `linear-gradient(90deg, ${mxh(c, 0.14)} 0%, ${dkh(c, 0.42)} 100%)` }} />
      {/* 3 · the cylinder */}
      <div style={{ position: "absolute", left: BW * 0.02, top: 70 * s, width: 60 * s,
        height: 92 * s, borderRadius: 8 * s, background: dkh(c, 0.30),
        border: `${4 * s}px solid ${hexa("#000", 0.34)}` }} />
      {/* 4 · the piston rod, moving */}
      <div style={{ position: "absolute", left: BW * 0.02 + 26 * s, top: 150 * s + pist,
        width: 12 * s, height: 60 * s, borderRadius: 6, background: mxh(STEEL, 0.28) }} />
      {/* 5 · the FLYWHEEL — the big turning mass, 96px so it survives the
             downsample, with real spokes rather than a filled disc */}
      <div style={{ position: "absolute", left: BW * 0.44, top: BH - 148 * s, width: 112 * s,
        height: 112 * s, borderRadius: "50%", background: hexa("#000", 0.16),
        border: `${9 * s}px solid ${dkh(c, 0.2)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotate(${th * 57.3}deg)` }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={"sp" + i} style={{ position: "absolute", left: "50%", top: "50%",
              width: 46 * s, height: 8 * s, marginTop: -4 * s, transformOrigin: "0% 50%",
              transform: `rotate(${i * 60}deg)`, background: mxh(c, 0.16) }} />
          ))}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 22 * s, height: 22 * s,
            marginLeft: -11 * s, marginTop: -11 * s, borderRadius: "50%", background: dkh(c, 0.44) }} />
        </div>
      </div>
      {/* 6 · the connecting rod from cylinder to crank */}
      <div style={{ position: "absolute", left: BW * 0.14, top: BH - 96 * s + pist * 0.4,
        width: BW * 0.42, height: 10 * s, borderRadius: 5, background: mxh(STEEL, 0.14),
        transformOrigin: "0% 50%", transform: `rotate(${Math.sin(th) * 9}deg)` }} />
      {/* 7,8 · the GOVERNOR — two balls that fly out as it runs. Nothing says
             "this machine is working hard" like a governor opening. */}
      <div style={{ position: "absolute", left: BW * 0.30, top: 6 * s, width: 8 * s, height: 42 * s,
        background: dkh(c, 0.2) }} />
      {[-1, 1].map((sd, i) => (
        <div key={"gb" + i} style={{ position: "absolute",
          left: BW * 0.30 + sd * gov * s - 11 * s, top: 34 * s + (1 - run) * 10 * s,
          width: 24 * s, height: 24 * s, borderRadius: "50%", background: mxh(c, 0.06) }} />
      ))}
      {/* 9 · the nameplate — where a tier number really goes */}
      <div style={{ position: "absolute", left: BW * 0.36, top: BH - 176 * s, width: 62 * s,
        height: 32 * s, borderRadius: 4 * s, background: mxh(CREAMB, 0.2),
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(17 * s, 900), color: "#241F17", letterSpacing: 1.4 }}>{tier}</span>
      </div>
      {/* 10 · exhaust ports along the column, brighter as it runs */}
      {[0, 1, 2].map(i => (
        <div key={"ex" + i} style={{ position: "absolute", left: BW * 0.06 + 6 * s,
          top: 60 * s + i * 30 * s, width: 18 * s, height: 10 * s, borderRadius: 3,
          background: run > 0.4 ? mxh(SODIUM, 0.34) : hexa("#000", 0.34) }} />
      ))}
    </div>
  );
};

/** the tier ladder the reasoning output climbs — four notches, and the lamp
    LOCKS at the TOP one. ⛔ The tier is the ladder's own, not a rank against
    anything: no benchmark and no rival appears in this reel. */
export const TierLadder: React.FC<{ x: number; y: number; s?: number; z?: number;
  tiers: readonly string[]; at?: number; locked?: number }> =
  ({ x, y, s = 1, z = 60, tiers, at = -1, locked = 0 }) => {
  const step = 74 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z }}>
      {/* the two stiles */}
      {[-58, 58].map((sx, i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: sx * s - 7 * s,
          top: -step * tiers.length - 16 * s, width: 14 * s, height: step * tiers.length + 24 * s,
          background: dkh(BRASS, 0.34) }} />
      ))}
      {tiers.map((t, i) => {
        const on = i <= at;
        const top = -step * (i + 1);
        return (
          <React.Fragment key={"tr" + i}>
            <div style={{ position: "absolute", left: -66 * s, top: top, width: 132 * s,
              height: 44 * s, borderRadius: 4 * s,
              background: on ? mxh(i === tiers.length - 1 ? GOLD : VIOLET, 0.30) : hexa("#000", 0.34),
              border: `${3 * s}px solid ${hexa("#000", 0.34)}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(20 * s, 900),
                color: on ? "#241F17" : hexa("#CFC8BC", 0.4), letterSpacing: 2 }}>{t}</span>
            </div>
            {/* the top notch gets a struck stamp when it locks */}
            {i === tiers.length - 1 && locked > 0 && (
              <div style={{ position: "absolute", left: -84 * s, top: top - 10 * s, width: 168 * s,
                height: 64 * s, borderRadius: 6 * s, zIndex: 2,
                border: `${5 * s}px solid ${mxh(GOLD, 0.4)}`,
                transform: `scale(${1 + (1 - locked) * 0.6}) rotate(${(1 - locked) * -12}deg)`,
                opacity: locked }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* =========================================================================
   9 · THE THREE OUTPUTS — what lands on the belt at S8. Drawn objects, one per
   spoken word, each recognisable by its own silhouette rather than by a label.
   ====================================================================== */
export const Good: React.FC<{ x: number; y: number; s?: number; z?: number; kind: 0 | 1 | 2;
  rot?: number; f?: number; sealed?: number }> =
  ({ x, y, s = 1, z = 74, kind, rot = 0, f = 0, sealed = 0 }) => {
  /* ⛔⛔ REDRAWN (Alex, round 6: *"those graphics of the images need to be so much
     better, more interesting, much more polished — just redo those graphics"*).
     v1 was three CONTAINERS carrying one bit each: a sheet with grey bars, a
     brown frame round a purple blob, and a stack of rounded rectangles that read
     as nothing at all. `feedback_props_need_real_drawing` is explicit — a book
     was FOUR divs and the fix was to count the parts a viewer actually uses to
     identify the category, then draw them. These are 18 / 17 / 19 parts. */

  if (kind === 0) {
    /* ── TEXT · a typeset manuscript. What says PAGE: three sheets offset so it
          has thickness, a ruled heading, a DROP CAP, a justified rag with a real
          paragraph indent and a short last line, a margin rule with an editor's
          mark, and a folded corner. ------------------------------------------ */
    const PW = 168 * s, PH = 214 * s;
    const rag = [1.00, 0.94, 0.99, 0.62, 1.00, 0.91, 0.97, 0.54];
    return (
      <div style={{ position: "absolute", left: x - PW / 2, top: y - PH, width: PW, height: PH,
        zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
        {[8, 4, 0].map((o, i) => (
          <div key={"sh" + i} style={{ position: "absolute", left: o * s, top: o * s,
            width: PW - 10 * s, height: PH - 10 * s, borderRadius: 3 * s,
            background: i === 2 ? "#FBF7EC" : dkh("#FBF7EC", 0.10 + i * 0.05),
            border: `${2 * s}px solid ${hexa("#000", 0.22)}` }} />
        ))}
        {/* the bound edge */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 15 * s, height: PH - 10 * s,
          borderRadius: `${3 * s}px 0 0 ${3 * s}px`, background: dkh(CLAY, 0.12) }} />
        {[0, 1, 2].map(i => (
          <div key={"st" + i} style={{ position: "absolute", left: 4 * s, top: (34 + i * 58) * s,
            width: 7 * s, height: 18 * s, borderRadius: 3, background: dkh(CLAY, 0.40) }} />
        ))}
        {/* the heading rule */}
        <div style={{ position: "absolute", left: 30 * s, top: 20 * s, width: 108 * s,
          height: 9 * s, borderRadius: 2, background: hexa("#2A241A", 0.62) }} />
        <div style={{ position: "absolute", left: 30 * s, top: 34 * s, width: 74 * s,
          height: 3 * s, background: hexa("#2A241A", 0.30) }} />
        {/* the DROP CAP — the one feature that says TYPESET rather than lined */}
        <div style={{ position: "absolute", left: 30 * s, top: 48 * s, width: 30 * s,
          height: 30 * s, background: dkh(CLAY, 0.06), borderRadius: 2 * s,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22 * s,
            color: "#FBF7EC", lineHeight: 1 }}>A</span>
        </div>
        {rag.map((w, i) => (
          <div key={"ln" + i} style={{ position: "absolute",
            left: (i < 2 ? 66 : 30) * s, top: (52 + i * 17) * s,
            width: ((i < 2 ? 72 : 108) * w) * s, height: 5 * s, borderRadius: 2,
            background: hexa("#2A241A", 0.40) }} />
        ))}
        {/* the margin rule and the editor's mark */}
        <div style={{ position: "absolute", left: 24 * s, top: 44 * s, width: 2 * s,
          height: 148 * s, background: hexa(CLAY, 0.30) }} />
        <div style={{ position: "absolute", left: 138 * s, top: 96 * s, width: 16 * s,
          height: 4 * s, background: hexa(RED, 0.66), transform: "rotate(-24deg)" }} />
        {/* the folded corner */}
        <div style={{ position: "absolute", right: 0, bottom: 10 * s, width: 26 * s,
          height: 26 * s, background: dkh("#FBF7EC", 0.16),
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
      </div>
    );
  }

  if (kind === 1) {
    /* ── IMAGES · a framed print with an actual COMPOSITION in it. A purple blob
          in a brown rectangle carries one bit; a landscape with a horizon, a sun,
          two ridges, water with a reflection and two birds is a picture. ------ */
    const PW = 196 * s, PH = 176 * s;
    return (
      <div style={{ position: "absolute", left: x - PW / 2, top: y - PH, width: PW, height: PH,
        zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
        {/* the moulded frame: outer, bevel, mount */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s,
          background: `linear-gradient(150deg, ${mxh("#8A6A42", 0.26)} 0%, ${dkh("#8A6A42", 0.30)} 100%)` }} />
        <div style={{ position: "absolute", inset: 9 * s, borderRadius: 2 * s,
          background: dkh("#8A6A42", 0.48) }} />
        <div style={{ position: "absolute", inset: 13 * s, background: "#F4EFE2" }} />
        {/* the picture */}
        <div style={{ position: "absolute", inset: 22 * s, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0,
            background: `linear-gradient(180deg, ${mxh(INDIGO, 0.44)} 0%, ${mxh(SODIUM, 0.30)} 62%, ${mxh(SODIUM, 0.52)} 100%)` }} />
          {/* the sun */}
          <div style={{ position: "absolute", left: "56%", top: "26%", width: 34 * s,
            height: 34 * s, borderRadius: "50%", background: mxh(GOLD, 0.52) }} />
          {/* two ridges */}
          <div style={{ position: "absolute", left: "-12%", top: "40%", width: "86%", height: "40%",
            background: dkh(VIOLET, 0.30), clipPath: "polygon(0% 100%, 34% 0%, 68% 62%, 100% 22%, 100% 100%)" }} />
          <div style={{ position: "absolute", left: "34%", top: "46%", width: "82%", height: "36%",
            background: dkh(VIOLET, 0.52), clipPath: "polygon(0% 100%, 40% 6%, 74% 54%, 100% 30%, 100% 100%)" }} />
          {/* the water and its reflection band */}
          <div style={{ position: "absolute", left: 0, top: "72%", width: "100%", height: "28%",
            background: `linear-gradient(180deg, ${mxh(TEAL, 0.10)} 0%, ${dkh(TEAL, 0.30)} 100%)` }} />
          <div style={{ position: "absolute", left: "52%", top: "76%", width: 28 * s, height: 5 * s,
            background: hexa(mxh(GOLD, 0.4), 0.66) }} />
          <div style={{ position: "absolute", left: "48%", top: "84%", width: 42 * s, height: 4 * s,
            background: hexa(mxh(GOLD, 0.4), 0.40) }} />
          {/* two birds */}
          {[[18, 22], [34, 16]].map(([bx, by], i) => (
            <div key={"bd" + i} style={{ position: "absolute", left: `${bx}%`, top: `${by}%`,
              width: 16 * s, height: 8 * s,
              borderTop: `${2.5 * s}px solid ${hexa("#1A1428", 0.62)}`,
              borderRadius: "50% 50% 0 0", transform: `rotate(${i ? 8 : -6}deg)` }} />
          ))}
        </div>
        {/* the glass sheen */}
        <div style={{ position: "absolute", left: 22 * s, top: 22 * s, right: 22 * s, bottom: 22 * s,
          overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "-30%", top: "-40%", width: "42%", height: "200%",
            transform: "rotate(28deg)",
            background: `linear-gradient(90deg, ${hexa("#FFF", 0)} 0%, ${hexa("#FFF", 0.20)} 50%, ${hexa("#FFF", 0)} 100%)` }} />
        </div>
        {/* the hanging ring */}
        <div style={{ position: "absolute", left: PW / 2 - 9 * s, top: -13 * s, width: 18 * s,
          height: 18 * s, borderRadius: "50%", border: `${3 * s}px solid ${dkh(BRASS, 0.24)}` }} />
      </div>
    );
  }

  /* ── REASONING · a chain of numbered STEP PLATES, hinged and hanging. v1 drew
        five rounded rectangles on an arc, which reads as nothing; what says a
        CHAIN OF REASONING is machined link plates with pin joints, each stamped
        with its step number, the last one carrying a struck tick. ------------ */
  const N = 4;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the hanger ring the chain hangs from */}
      <div style={{ position: "absolute", left: -13 * s, top: -218 * s, width: 26 * s,
        height: 26 * s, borderRadius: "50%", border: `${4 * s}px solid ${dkh(BRASS, 0.20)}` }} />
      {Array.from({ length: N }, (_, i) => {
        const sway = Math.sin(f / 11 + i * 0.7) * (1.4 + i * 0.5);
        const py = -196 * s + i * 48 * s;
        const px = Math.sin(f / 11 + i * 0.7) * (2 + i * 2.2) * s;
        return (
          <React.Fragment key={"lk" + i}>
            {/* the pin joint above each plate */}
            <div style={{ position: "absolute", left: px - 6 * s, top: py - 12 * s, width: 12 * s,
              height: 16 * s, borderRadius: 6 * s, background: dkh(BRASS, 0.14) }} />
            {/* the link plate */}
            <div style={{ position: "absolute", left: px - 52 * s, top: py, width: 104 * s,
              height: 42 * s, borderRadius: 21 * s, zIndex: 2,
              transform: `rotate(${sway}deg)`, transformOrigin: "50% -12px",
              background: `linear-gradient(168deg, ${mxh(VIOLET, 0.30)} 0%, ${VIOLET} 50%, ${dkh(VIOLET, 0.28)} 100%)`,
              border: `${3 * s}px solid ${hexa("#0A0614", 0.44)}` }}>
              {/* two rivets */}
              {[14, 76].map((rx, j) => (
                <div key={j} style={{ position: "absolute", left: rx * s, top: 15 * s,
                  width: 10 * s, height: 10 * s, borderRadius: "50%",
                  background: hexa("#0A0614", 0.36) }} />
              ))}
              {/* the step number, struck into the plate */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 8 * s, textAlign: "center" }}>
                <span style={{ ...mono(19 * s, 900), color: mxh(VIOLET, 0.66) }}>{i + 1}</span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {/* the last link carries a struck tick — the chain RESOLVES */}
      <div style={{ position: "absolute", left: -22 * s, top: -6 * s, width: 44 * s, height: 44 * s,
        borderRadius: "50%", zIndex: 3, background: mxh(GREEN, 0.24),
        border: `${4 * s}px solid ${dkh(GREEN, 0.30)}` }}>
        <div style={{ position: "absolute", left: 11 * s, top: 20 * s, width: 11 * s, height: 4 * s,
          borderRadius: 2, background: "#0A2A18", transform: "rotate(45deg)" }} />
        <div style={{ position: "absolute", left: 16 * s, top: 17 * s, width: 19 * s, height: 4 * s,
          borderRadius: 2, background: "#0A2A18", transform: "rotate(-42deg)" }} />
      </div>
    </div>
  );
};

/* =========================================================================
   10 · THE ROLLER SHUTTER — S1's door and S2's bays. It ROLLS, with real
   slats whose pitch stays constant as the curtain shortens.
   ====================================================================== */
export const Shutter: React.FC<{ x: number; y: number; w: number; h: number; up?: number;
  z?: number; c?: string; slat?: number }> =
  ({ x, y, w: ww, h: hh, up = 0, z = 40, c = STEEL, slat = 26 }) => {
  const drop = hh * (1 - up);
  const n = Math.max(0, Math.ceil(drop / slat));
  return (
    <>
      {/* the box the curtain rolls into */}
      <div style={{ position: "absolute", left: x - 10, top: y - 30, width: ww + 20, height: 30,
        zIndex: z + 2, borderRadius: 4, background: dkh(c, 0.4) }} />
      <div style={{ position: "absolute", left: x, top: y, width: ww, height: drop, zIndex: z + 1,
        overflow: "hidden" }}>
        {Array.from({ length: n }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, top: i * slat, width: ww,
            height: slat - 3, borderRadius: 2,
            background: `linear-gradient(180deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.30)} 100%)` }} />
        ))}
      </div>
      {/* the bottom rail — the heavy edge that makes it read as a shutter */}
      {drop > 4 && (
        <div style={{ position: "absolute", left: x - 6, top: y + drop - 14, width: ww + 12,
          height: 18, zIndex: z + 3, borderRadius: 3, background: dkh(c, 0.5) }} />
      )}
      {/* the guides */}
      {[x - 14, x + ww - 4].map((gx, i) => (
        <div key={"gd" + i} style={{ position: "absolute", left: gx, top: y - 26, width: 18,
          height: hh + 26, zIndex: z + 4, background: dkh(c, 0.46) }} />
      ))}
    </>
  );
};

/* =========================================================================
   11 · THE LANE GATE — the small coin gate on each of the five lanes at S9.
   It FOLDS AWAY when the merged lane goes free, and its head flips to bone.
   ====================================================================== */
export const LaneGate: React.FC<{ x: number; y: number; s?: number; z?: number;
  fold?: number; head?: string; c?: string; lit?: number }> =
  ({ x, y, s = 1, z = 50, fold = 0, head, c = STEEL, lit = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z,
    transformOrigin: "50% 100%",
    transform: `rotate(${fold * -84}deg) translateY(${fold * 8}px)`, opacity: 1 - fold * 0.15 }}>
    {/* the post */}
    <div style={{ position: "absolute", left: -13 * s, top: -128 * s, width: 26 * s,
      height: 128 * s, borderRadius: 3 * s,
      background: `linear-gradient(90deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.34)} 100%)` }} />
    {/* the barrier arm, striped */}
    <div style={{ position: "absolute", left: 0, top: -112 * s, width: 150 * s, height: 18 * s,
      borderRadius: 4 * s, background: `repeating-linear-gradient(90deg, ${mxh(RED, 0.16)} 0 24px, ${mxh(CREAMB, 0.2)} 24px 48px)` }} />
    {/* the coin head */}
    <div style={{ position: "absolute", left: -30 * s, top: -178 * s, width: 60 * s, height: 50 * s,
      borderRadius: 5 * s, background: lit > 0.5 ? mxh(CREAMB, 0.26) : dkh("#4A4237", 0.14),
      border: `${3 * s}px solid ${hexa("#000", 0.32)}`,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      {head
        ? <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19 * s,
            color: "#241F17" }}>{head}</span>
        : <div style={{ width: 30 * s, height: 9 * s, borderRadius: 3, background: "#100E0A" }} />}
    </div>
  </div>
);

/* =========================================================================
   12 · THE FARE BOARD — the bone fascia on the hook's kiosk. It carries the
   frame-0 claim plate so the TURNSTILE does not have to: a gate carried by the
   wrong object deforms that object (reel 110).
   ⭐ Measured target: >= 18% of the panel, entirely below panel y = 120, with
   the real Claude mark on a white tile >= 130px and the numeral in Fraunces
   >= 74px — the one hook rule with measured IG evidence behind it.
   ====================================================================== */
export const FareBoard: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  num: string; label: string; sub?: string; markSize?: number }> =
  ({ x, y, w: ww = 712, h: hh = 246, z = 44, num, label, sub, markSize }) => {
  /* ⛔ EVERY SIZE HERE IS DERIVED FROM `hh`. v1 hard-coded a 132px numeral for a
     246px board and then the board was shortened to 186 to clear the gate below
     it, which overflowed the plate. A claim plate that clips is not a claim. */
  const k = hh / 246;
  const M = markSize ?? Math.round(138 * k);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: hh, zIndex: z,
      borderRadius: 10, background: `linear-gradient(172deg, #FAF8F1 0%, #EFE9DA 62%, #E2DAC4 100%)`,
      border: `${Math.round(7 * k)}px solid #A79A80`, display: "flex", alignItems: "center",
      padding: `0 ${Math.round(30 * k)}px`, gap: Math.round(26 * k), boxShadow: SH }}>
      {/* the mark on a white tile — the audience filter, big and early */}
      <div style={{ width: M, height: M, borderRadius: M * 0.24, background: "#FFFFFF",
        border: `4px solid #E8DCC0`, flex: "0 0 auto",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: M * 0.72, height: M * 0.72, objectFit: "contain" }} />
      </div>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: Math.round(140 * k),
        lineHeight: 0.82, color: "#241F17", letterSpacing: "-0.03em", flex: "0 0 auto" }}>{num}</span>
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
          fontSize: Math.round(52 * k), lineHeight: 1.0, color: "#241F17",
          letterSpacing: "-0.01em" }}>{label}</div>
        {sub && (
          <div style={{ marginTop: Math.round(9 * k), ...mono(Math.round(22 * k), 900),
            color: "#6B6250", letterSpacing: 2.0 }}>{sub}</div>
        )}
        {/* five fare pips — the count, as a graphic, under the words */}
        <div style={{ marginTop: Math.round(12 * k), display: "flex", gap: Math.round(11 * k) }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={"pp" + i} style={{ width: Math.round(42 * k), height: Math.round(42 * k),
              borderRadius: "50%", background: dkh(BRASS, 0.02),
              border: `${Math.round(4 * k)}px solid ${dkh(BRASS, 0.4)}` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   13 · THE METER WALL and 14 · THE PAY SHUTTER — the two rejected hook
   candidates. They live here rather than being described, because a hook is
   decided on the artefact and not on a paragraph (docs/THE-OPEN.md step 1).
   ====================================================================== */
export const SubMeter: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  rate?: number; c?: string; logo?: string | null; n?: string }> =
  ({ x, y, s = 1, z = 50, f = 0, rate = 1, c = SODIUM, logo, n }) => {
  const D = 118 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D,
      zIndex: z }}>
      {/* the case */}
      <div style={{ position: "absolute", inset: -10 * s, borderRadius: 10 * s,
        background: `linear-gradient(166deg, ${mxh(SLATE, 0.14)} 0%, ${dkh(SLATE, 0.36)} 100%)`,
        border: `${4 * s}px solid ${hexa("#000", 0.34)}` }} />
      {/* the dial face */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: mxh(CREAMB, 0.18),
        border: `${4 * s}px solid ${dkh(BRASS, 0.2)}`, overflow: "hidden" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: D * 0.44, height: 3 * s, marginTop: -1.5 * s, transformOrigin: "0% 50%",
            transform: `rotate(${i * 30}deg)`, background: hexa("#2A241A", 0.4) }} />
        ))}
        {/* the spinning disc — a meter that is RUNNING */}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: D * 0.42,
          height: 9 * s, marginTop: -4.5 * s, transformOrigin: "0% 50%",
          transform: `rotate(${f * 5.4 * rate}deg)`, background: dkh(RED, 0.06) }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 18 * s, height: 18 * s,
          marginLeft: -9 * s, marginTop: -9 * s, borderRadius: "50%", background: dkh("#2A241A", 0) }} />
      </div>
      {/* the maker tile under the glass */}
      <div style={{ position: "absolute", left: D / 2 - 22 * s, top: D * 0.66, width: 44 * s,
        height: 44 * s, borderRadius: 9 * s, background: logo ? "#FBF8F0" : hexa("#000", 0.2),
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {logo
          ? <Img src={staticFile(logo)} style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
          : <span style={{ ...mono(17 * s, 900), color: mxh(c, 0.5) }}>{n?.[0]}</span>}
      </div>
    </div>
  );
};
