import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, mono, ui, R,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
  TOK, TOKD, TOKL, TOKX, lerpHex,
} from "./UsgWorld";

/* ===========================================================================
   REEL 126 · "USAGE" — THE PROPS.

   ⛔⛔ A CONTAINER IS STILL A CONTAINER WHEN IT IS A NICE BOX (reel 112). Every
   object below lists, in its own comment, the four or five features a viewer
   actually uses to identify that CATEGORY — and draws every one of them. The
   count that matters is how many parts a viewer can NAME, not how many divs
   there are.

   ⛔⛔ AT HALF A SECOND ON A PHONE A VIEWER RECOGNISES A MARK, NOT A SILHOUETTE
   (reel 115). The three repos are therefore BRANDED PLATES carrying the real
   DeepSeek mark, the caveman rock and the GitHub mark, each on its OWN colour
   with its own name strip — identity is shape AND colour, and five identical
   white tiles was the round-2 failure that rule came from.

   ⛔ A PROP THAT RENDERS IS NOT A PROP THAT IS VISIBLE. Every object names the
   luma step between it and its ground. Dark-neutral on dark-neutral has no edge
   and the motion audit cannot see it either.
   ⛔ MATTE ONLY: no `boxShadow: 0 0 Npx`.
   ========================================================================= */

/* =========================================================================
   1 · THE REPO PLATE — the identity object, one per repo.
   What makes something read as a MACHINE PLATE rather than a card:
     a MILLED BEZEL · four corner SCREWS · an etched MARK panel ·
     a stamped NAME in a recessed strip · a small LICENCE stencil ·
     a serial line in the corner
   All six are drawn. VALUE: each plate carries its own saturated ground so no
   two are the same bright square (reel 115 round 2).
   ⛔ THE PLATE BAND IS PANEL y 112..210 (reel 112) — plates never enter the
   ground line the cast stands on. Call sites obey it; this component does not
   enforce it because two scenes hand-place a plate ON a machine.
   ====================================================================== */
export const RepoPlate: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  name: string; stars: string; lic: string; logo?: string; c?: string; rot?: number;
  seat?: number; sub?: string; glyph?: string; rock?: boolean }> =
  ({ x, y, s = 1, z = 60, f = 0, name, stars, lic, logo, c = SLATE, rot = 0, seat = 1,
     sub, glyph, rock = false }) => {
  const PW = 348 * s, PH = 116 * s;
  const k = Math.max(0, Math.min(1, seat));
  return (
    <div style={{ position: "absolute", left: x - PW / 2, top: y - PH / 2, width: PW, height: PH,
      zIndex: z, transform: `rotate(${rot}deg) scale(${0.86 + 0.14 * k})`, opacity: k }}>
      {/* 1 · the MILLED BEZEL + the plate ground */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, boxShadow: SH_D,
        background: `linear-gradient(166deg, ${mxh(c, 0.30)} 0%, ${c} 40%, ${dkh(c, 0.44)} 100%)`,
        border: `${3 * s}px solid ${dkh(c, 0.60)}` }} />
      <div style={{ position: "absolute", inset: 6 * s, borderRadius: 5 * s,
        border: `${1.6 * s}px solid ${hexa(TOKL, 0.24)}` }} />
      {/* 2 · four corner SCREWS, where a plate is actually fixed */}
      {[[14, 14], [PW - 14, 14], [14, PH - 14], [PW - 14, PH - 14]].map(([bx, by], i) => (
        <div key={"s" + i} style={{ position: "absolute", left: bx - 6 * s, top: by - 6 * s,
          width: 12 * s, height: 12 * s, borderRadius: 6 * s,
          background: `radial-gradient(circle at 34% 30%, ${mxh(STEEL, 0.40)}, ${dkh(STEEL, 0.56)})` }}>
          <div style={{ position: "absolute", left: 2 * s, top: 5 * s, width: 8 * s, height: 2 * s,
            background: dkh(STEEL, 0.70), transform: `rotate(${i * 34}deg)` }} />
        </div>
      ))}
      {/* 3 · the etched MARK panel — a recessed bone tile, which is where a real
             mark goes and is also the bright object the eye lands on first */}
      <div style={{ position: "absolute", left: 20 * s, top: 22 * s, width: 72 * s, height: 72 * s,
        borderRadius: 6 * s, background: `linear-gradient(170deg, ${PAPER} 0%, ${CREAMB} 100%)`,
        border: `${2 * s}px solid ${dkh(c, 0.52)}`, display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden" }}>
        {logo
          ? <Img src={staticFile(`logos/${logo}`)} style={{ width: 52 * s, height: 52 * s,
              objectFit: "contain" }} />
          : rock
          ? (<div style={{ position: "relative", width: 56 * s, height: 40 * s }}>
              {/* the KNAPPED STONE — the same geometry the reel's mallet head
                  uses, so the repo's mark and the repo's tool are one object */}
              <div style={{ position: "absolute", inset: 0,
                clipPath: "polygon(6% 26%, 30% 2%, 74% 0%, 100% 30%, 96% 76%, 66% 100%, 24% 96%, 0% 66%)",
                background: `linear-gradient(158deg, #8E8678 0%, #5A5349 46%, #33302B 100%)` }} />
              {[[10, 6, 20], [30, 18, 15]].map(([lx, ty, w], i) => (
                <div key={i} style={{ position: "absolute", left: lx * s, top: ty * s,
                  width: w * s, height: w * 0.7 * s, opacity: 0.40,
                  clipPath: "polygon(0% 40%, 46% 0%, 100% 50%, 40% 100%)",
                  background: i ? "#2B2823" : "#C2BAAB" }} />
              ))}
            </div>)
          : <span style={{ ...mono(Math.round(40 * s), 900), color: INK }}>{glyph ?? "\u25C6"}</span>}
      </div>
      {/* 4 · the stamped NAME in a recessed strip */}
      <div style={{ position: "absolute", left: 104 * s, top: 24 * s, width: PW - 124 * s,
        height: 34 * s, borderRadius: 4 * s, background: dkh(c, 0.56), display: "flex",
        alignItems: "center", paddingLeft: 10 * s, overflow: "hidden" }}>
        <span style={{ ...mono(Math.round(Math.min(23, 250 / Math.max(9, name.length) * 1.05) * s), 900),
          color: TOKL, letterSpacing: 0.4, whiteSpace: "nowrap" }}>{name}</span>
      </div>
      {/* the star count — a real receipt, in the place a rating goes */}
      <div style={{ position: "absolute", left: 106 * s, top: 63 * s }}>
        <span style={{ ...mono(Math.round(21 * s), 900), color: GOLD, letterSpacing: 0.4 }}>{stars}</span>
      </div>
      {/* 5 · the LICENCE stencil, at the size a licence stencil actually is */}
      <div style={{ position: "absolute", left: 106 * s, top: 90 * s }}>
        <span style={{ ...mono(Math.round(11 * s), 800), color: hexa(TOKL, 0.62),
          letterSpacing: 1.1 }}>{lic}</span>
      </div>
      {/* ⛔ this was a "1 / 3" serial, and the header band already numbers the
             three. Three punched index holes instead — furniture that a real
             plate has, carrying no words. */}
      {sub && [0, 1, 2].map((i) => (
        <div key={"ix" + i} style={{ position: "absolute", left: PW - (54 - i * 16) * s,
          top: 92 * s, width: 9 * s, height: 9 * s, borderRadius: 5 * s,
          background: hexa(TOKL, i < parseInt(sub, 10) ? 0.72 : 0.16) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   2 · THE PAY HATCH — the hook's machine.
   What makes something read as a VENDING/PAY HATCH:
     a heavy FACE PLATE proud of the wall · a COIN SLOT with a lipped throat ·
     a DELIVERY MOUTH below with a rubber flap · an ILLUMINATED sign panel ·
     a grab HANDLE · three bolt heads
   All six drawn. VALUE: near-black face against the bone render of `hatch` —
   the reel's biggest value spread lives here and it is what carries frame 0.
   ====================================================================== */
export const PayHatch: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  lit?: number; flap?: number; slots?: number; sign?: string }> =
  ({ x, y, s = 1, z = 40, f = 0, lit = 0, flap = 0, slots = 0, sign }) => {
  const FW = 400 * s, FH = 470 * s;
  const fl = Math.max(0, Math.min(1, flap));
  return (
    <div style={{ position: "absolute", left: x - FW / 2, top: y - FH, width: FW, height: FH,
      zIndex: z }}>
      {/* 1 · the FACE PLATE, proud of the wall with a real edge shadow */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 7 * s, boxShadow: SH_D,
        background: `linear-gradient(168deg, #3E464F 0%, #262D35 44%, #12171C 100%)`,
        border: `${3 * s}px solid #070A0D` }} />
      <div style={{ position: "absolute", left: -7 * s, top: 9 * s, width: 7 * s,
        height: FH - 9 * s, background: hexa("#000", 0.44) }} />
      {/* 2 · the SIGN PANEL — illuminated, and the brightest object on the face */}
      <div style={{ position: "absolute", left: 26 * s, top: 24 * s, width: FW - 52 * s,
        height: 66 * s, borderRadius: 5 * s, overflow: "hidden",
        background: `linear-gradient(180deg, ${mxh(SODIUM, 0.72 + lit * 0.20)} 0%, ${mxh(SODIUM, 0.30 + lit * 0.22)} 100%)`,
        border: `${2 * s}px solid #05070A`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...mono(Math.round(27 * s), 900), color: INK, letterSpacing: 2.2 }}>
          {sign ?? "1 TOKEN"}
        </span>
      </div>
      {/* 3 · the COIN SLOT — a lipped throat, which is the feature that says
             "you put something IN here" */}
      <div style={{ position: "absolute", left: FW / 2 - 62 * s, top: 118 * s, width: 124 * s,
        height: 44 * s, borderRadius: 5 * s,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.56)} 0%, ${mxh(BRASS, 0.06)} 100%)`,
        border: `${2 * s}px solid ${dkh(BRASS, 0.56)}` }}>
        <div style={{ position: "absolute", left: 18 * s, top: 14 * s, width: 88 * s,
          height: 15 * s, borderRadius: 7 * s, background: "#04060A",
          boxShadow: `inset 0 ${2 * s}px ${3 * s}px ${hexa("#000", 0.9)}` }} />
      </div>
      {/* 4 · the DELIVERY MOUTH — a black opening with a rubber flap that lifts.
             ⛔ A LIT RECTANGLE IS A SCREEN: this reads as a HOLE because the
             face STOPS at it — full depth, square corners, and light on the
             lip below it rather than inside it. */}
      <div style={{ position: "absolute", left: FW / 2 - 118 * s, top: 216 * s, width: 236 * s,
        height: 150 * s, background: "#03050A", borderRadius: 3 * s,
        boxShadow: `inset 0 ${8 * s}px ${16 * s}px ${hexa("#000", 0.96)}` }} />
      <div style={{ position: "absolute", left: FW / 2 - 122 * s, top: 210 * s, width: 244 * s,
        height: 12 * s, background: `linear-gradient(180deg, #4E5862 0%, #1C2228 100%)` }} />
      {/* the flap, hinged at the top */}
      <div style={{ position: "absolute", left: FW / 2 - 112 * s, top: 220 * s, width: 224 * s,
        height: 88 * s, transformOrigin: "50% 0%", borderRadius: 2 * s,
        transform: `rotateX(${fl * 78}deg)`,
        background: `linear-gradient(180deg, #2E353D 0%, #161B20 100%)`,
        borderBottom: `${3 * s}px solid ${hexa(TOKL, 0.20)}` }} />
      {/* the lit lip below the mouth — light on the floor is what makes a hole
          read as a hole */}
      <div style={{ position: "absolute", left: FW / 2 - 126 * s, top: 364 * s, width: 252 * s,
        height: 16 * s, borderRadius: 3 * s,
        background: `linear-gradient(180deg, ${mxh(SODIUM, 0.62)} 0%, ${mxh(SODIUM, 0.04)} 100%)` }} />
      {/* 5 · the grab HANDLE */}
      <div style={{ position: "absolute", left: FW - 84 * s, top: 396 * s, width: 62 * s,
        height: 17 * s, borderRadius: 8 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
      {/* 6 · the credit lamps — one per plate seated, so the hook's THREE
             installs have somewhere to land and be counted */}
      {[0, 1, 2].map((i) => (
        <div key={"l" + i} style={{ position: "absolute", left: 34 * s + i * 42 * s, top: 400 * s,
          width: 26 * s, height: 26 * s, borderRadius: 13 * s,
          border: `${2 * s}px solid #05070A`,
          background: i < slots
            ? `radial-gradient(circle at 36% 32%, ${mxh(GREEN, 0.46)}, ${dkh(GREEN, 0.34)})`
            : `radial-gradient(circle at 36% 32%, #262B31, #0E1116)` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   3 · THE CODE BAR — what Claude Code actually produces, and the thing the
   caveman grille must let through untouched.
   What makes something read as MACHINED CODE rather than a block:
     ROUTED channels across the face at irregular lengths (that is what a
     listing looks like from three feet away) · a chamfered edge · a stamped
     `{ }` · an indent step at the left · a bright top facet
   All five drawn. VALUE: DARK, deliberately — it is the solid thing in a
   stream of light waste, which is how the S8 sort reads without narration.
   ====================================================================== */
export const CodeBar: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  c?: string }> = ({ x, y, s = 1, z = 52, rot = 0, c = "#2E3A44" }) => {
  const BW = 122 * s, BH = 62 * s;
  const RUNS = [0.86, 0.54, 0.72, 0.38, 0.62];
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH / 2, width: BW, height: BH,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s, boxShadow: SH_D,
        background: `linear-gradient(164deg, ${mxh(c, 0.34)} 0%, ${c} 38%, ${dkh(c, 0.48)} 100%)`,
        border: `${2 * s}px solid ${dkh(c, 0.62)}` }} />
      {/* the bright top facet — a chamfer, which is what makes it read as milled */}
      <div style={{ position: "absolute", left: 3 * s, top: 3 * s, width: BW - 6 * s,
        height: 5 * s, borderRadius: 2 * s, background: hexa(TOKL, 0.30) }} />
      {/* the ROUTED channels — irregular lengths and a left indent step */}
      {RUNS.map((k, i) => (
        <div key={"r" + i} style={{ position: "absolute", left: (10 + (i % 2) * 9) * s,
          top: (13 + i * 9) * s, width: (BW - 26 * s) * k, height: 4 * s, borderRadius: 2 * s,
          background: hexa(TEAL, 0.52 + (i % 2) * 0.16) }} />
      ))}
      <div style={{ position: "absolute", left: BW - 26 * s, top: BH - 21 * s }}>
        <span style={{ ...mono(Math.round(15 * s), 900), color: hexa(TOKL, 0.60) }}>{"{}"}</span>
      </div>
    </div>
  );
};

/* =========================================================================
   4 · THE WORD BLOCK — the filler prose, and the thing the grille stops.
   What makes something read as LOOSE WASTE rather than a brick:
     an IRREGULAR silhouette (torn top edge) · a pale, low-density body ·
     ragged TEXT RULES that do not reach the edges · no chamfer, no facet
   VALUE: LIGHT and chalky, so a stream of them against dark code bars sorts
   itself in a single glance and the greyscale audit can see the sort too.
   ====================================================================== */
export const WordBlock: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  seed?: number; c?: string }> = ({ x, y, s = 1, z = 50, rot = 0, seed = 0, c = "#DCD4C2" }) => {
  const BW = (78 + (seed % 3) * 16) * s, BH = (44 + (seed % 2) * 10) * s;
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH / 2, width: BW, height: BH,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 3 * s, boxShadow: SH,
        background: `linear-gradient(170deg, ${mxh(c, 0.24)} 0%, ${c} 56%, ${dkh(c, 0.22)} 100%)` }} />
      {/* the torn top edge — three notches, so the silhouette is not a rectangle */}
      {[0.18, 0.48, 0.76].map((k, i) => (
        <div key={"n" + i} style={{ position: "absolute", left: BW * k, top: -3 * s,
          width: (8 + (seed + i) % 3 * 4) * s, height: 7 * s, background: "transparent",
          borderLeft: `${4 * s}px solid transparent`, borderRight: `${4 * s}px solid transparent`,
          borderBottom: `${7 * s}px solid ${mxh(c, 0.24)}` }} />
      ))}
      {/* ragged rules that stop short of the edge — prose, not code */}
      {[0.74, 0.52, 0.88].map((k, i) => (
        <div key={"t" + i} style={{ position: "absolute", left: 7 * s, top: (10 + i * 10) * s,
          width: (BW - 16 * s) * k, height: 3.4 * s, borderRadius: 2 * s,
          background: hexa("#8A8272", 0.62) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   5 · THE HOPPER — a supply bin with its PRICE stamped on it.
   What makes something read as a SUPPLY HOPPER:
     a tapering body (wide at the top, narrow at the throat) · a THROAT with a
     gate · a stiffening rib down each face · a stencilled PRICE panel ·
     legs that reach the floor · contents visible over the lip
   All six drawn. ⛔ IT MUST READ WHILE EMPTY — an empty hopper is a bright
   stencilled bin, never a black hole (reel 108/110).
   ====================================================================== */
export const Hopper: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  price?: string; unit?: string; c?: string; live?: number; full?: number; label?: string;
  logo?: string; cost?: number }> =
  ({ x, y, s = 1, z = 40, f = 0, c = SLATE, live = 0, full = 1, logo, cost = 0 }) => {
  const TW = 250 * s, BWid = 128 * s, HT = 210 * s;
  const lv = Math.max(0, Math.min(1, live));
  return (
    <div style={{ position: "absolute", left: x - TW / 2, top: y - HT - 46 * s, width: TW,
      height: HT + 46 * s, zIndex: z }}>
      {/* legs, drawn first so the body sits on them */}
      {[-1, 1].map((sg) => (
        <div key={sg} style={{ position: "absolute", left: TW / 2 + sg * 52 * s - 8 * s,
          top: HT - 6 * s, width: 16 * s, height: 52 * s,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
      ))}
      {/* 1 · the tapering BODY */}
      <div style={{ position: "absolute", left: 0, top: 0, width: TW, height: HT,
        clipPath: `polygon(0% 0%, 100% 0%, ${50 + (BWid / TW) * 50}% 100%, ${50 - (BWid / TW) * 50}% 100%)`,
        boxShadow: SH_D,
        background: `linear-gradient(164deg, ${mxh(c, 0.32)} 0%, ${c} 40%, ${dkh(c, 0.46)} 100%)` }} />
      {/* 2 · stiffening RIBS */}
      {[0.26, 0.5, 0.74].map((k, i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: TW * k - 3 * s, top: 6 * s,
          width: 6 * s, height: HT - 22 * s, background: hexa(dkh(c, 0.56), 0.72),
          transform: `skewX(${(k - 0.5) * 22}deg)` }} />
      ))}
      {/* the rim, and the CONTENTS visible over it */}
      <div style={{ position: "absolute", left: -6 * s, top: -8 * s, width: TW + 12 * s,
        height: 16 * s, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${mxh(c, 0.44)} 0%, ${dkh(c, 0.34)} 100%)` }} />
      <div style={{ position: "absolute", left: 12 * s, top: 8 * s, width: TW - 24 * s,
        height: 26 * s, overflow: "hidden" }}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"c" + i} style={{ position: "absolute", left: (i * 26 + (i % 2) * 8) * s,
            top: (2 + (i % 3) * 5) * s, width: 24 * s, height: 24 * s, borderRadius: 12 * s,
            opacity: i < Math.round(full * 9) ? 1 : 0, background: `linear-gradient(158deg, ${TOKL} 0%, ${TOK} 52%, ${TOKD} 100%)` }} />
        ))}
      </div>
      {/* 3 · THE COST BAR — what the price panel used to say, drawn. ⛔ This was
             a COLUMN up the flank and the hopper's own taper hid it; a bar under
             the mark is on the wide part of the body and reads at a glance. Full
             and red against a stub of green IS the 17x, with no type on the bin. */}
      <div style={{ position: "absolute", left: TW / 2 - 82 * s, top: 178 * s, width: 164 * s,
        height: 22 * s, borderRadius: 4 * s, background: dkh(c, 0.70),
        border: `${2 * s}px solid ${dkh(c, 0.82)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%",
          width: `${Math.max(0.04, Math.min(1, cost)) * 100}%`,
          background: `linear-gradient(180deg, ${mxh(cost > 0.5 ? RED : GREEN, 0.28)} 0%, ${dkh(cost > 0.5 ? RED : GREEN, 0.40)} 100%)` }} />
        {[0.25, 0.5, 0.75].map((t) => (
          <div key={t} style={{ position: "absolute", left: `${t * 100}%`, top: 0, width: 2 * s,
            height: "100%", background: hexa("#000", 0.42) }} />
        ))}
      </div>

      {/* 3b · THE SUPPLIER'S REAL MARK, big enough to be the object's identity.
              It was a 68px tile under a price panel; it is now the FACE. */}
      {logo && (
        <div style={{ position: "absolute", left: TW / 2 - 82 * s, top: 34 * s, width: 164 * s,
          height: 136 * s, borderRadius: 10 * s,
          background: `linear-gradient(170deg, #FCF8EE 0%, ${CREAMB} 100%)`,
          border: `${3 * s}px solid ${dkh(c, 0.56)}`, boxShadow: SH_D, display: "flex",
          alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Img src={staticFile(`logos/${logo}`)} style={{ width: 116 * s, height: 116 * s,
            objectFit: "contain" }} />
        </div>
      )}
      {/* 4 · the THROAT with its gate — open when this hopper is the live one */}
      <div style={{ position: "absolute", left: TW / 2 - BWid / 2, top: HT - 4 * s,
        width: BWid, height: 26 * s, borderRadius: 3 * s,
        background: `linear-gradient(180deg, ${dkh(c, 0.52)} 0%, #05070A 100%)` }} />
      <div style={{ position: "absolute", left: TW / 2 - BWid / 2 + 6 * s, top: HT - 1 * s,
        width: BWid - 12 * s, height: 20 * s * (1 - lv), borderRadius: 2 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
      {/* the live lamp, so which hopper is feeding is readable in one glance */}
      <div style={{ position: "absolute", left: TW / 2 - 11 * s, top: HT + 30 * s,
        width: 22 * s, height: 22 * s, borderRadius: 11 * s, border: `${2 * s}px solid #05070A`,
        background: lv > 0.5
          ? `radial-gradient(circle at 36% 32%, ${mxh(GREEN, 0.50)}, ${dkh(GREEN, 0.30)})`
          : `radial-gradient(circle at 36% 32%, #2A2F35, #0C0F13)` }} />
    </div>
  );
};

/* =========================================================================
   6 · THE FEED MAIN — the big pipe that gets SWUNG from one hopper to the
   other. This is the object that depicts the verb in "POINTS Claude Code
   directly at DeepSeek", so it has to be aimable and it has to be BIG.
   What makes something read as a MAIN rather than a tube:
     a FLANGE at the joint with visible bolts · a bore you can see into at the
     open end · a swivel ELBOW it pivots on · a pressure GAUGE on the body ·
     a lagged section · a hanger chain
   All six drawn. VALUE: COPPER, which is the biggest luma step available
   against the cold steel-blue of `supply`.
   ====================================================================== */
export const FeedMain: React.FC<{ x: number; y: number; len?: number; s?: number; z?: number;
  f?: number; ang: number; flow?: number; c?: string }> =
  ({ x, y, len = 380, s = 1, z = 52, f = 0, ang, flow = 0, c = COPPER }) => {
  const TH = 54 * s, L = len * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z }}>
      {/* 3 · the swivel ELBOW it pivots on, drawn at the pivot so the rotation
             has a visible centre — a limb that pivots on nothing reads as a
             glitch */}
      <div style={{ position: "absolute", left: -38 * s, top: -38 * s, width: 76 * s,
        height: 76 * s, borderRadius: 38 * s, zIndex: 2,
        background: `radial-gradient(circle at 36% 30%, ${mxh(c, 0.42)}, ${dkh(c, 0.54)})`,
        border: `${3 * s}px solid ${dkh(c, 0.66)}` }} />
      {/* the hanger chain, so the main reads as hung rather than floating */}
      <div style={{ position: "absolute", left: -3 * s, top: -190 * s, width: 6 * s,
        height: 152 * s, background: dkh(STEEL, 0.44), zIndex: 1 }} />

      <div style={{ position: "absolute", left: 0, top: -TH / 2, width: L, height: TH,
        transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`, zIndex: 3 }}>
        {/* the barrel */}
        <div style={{ position: "absolute", inset: 0, borderRadius: TH / 2, boxShadow: SH_D,
          background: `linear-gradient(180deg, ${dkh(c, 0.34)} 0%, ${mxh(c, 0.30)} 30%, ${c} 58%, ${dkh(c, 0.56)} 100%)`,
          border: `${2 * s}px solid ${dkh(c, 0.62)}` }} />
        {/* 5 · a LAGGED section — canvas wrap with three straps */}
        <div style={{ position: "absolute", left: L * 0.30, top: -4 * s, width: L * 0.26,
          height: TH + 8 * s, borderRadius: 6 * s,
          background: `linear-gradient(180deg, ${mxh("#B8AE96", 0.20)} 0%, ${dkh("#B8AE96", 0.30)} 100%)` }} />
        {[0.32, 0.42, 0.52].map((k, i) => (
          <div key={"st" + i} style={{ position: "absolute", left: L * k, top: -5 * s,
            width: 7 * s, height: TH + 10 * s, background: dkh(STEEL, 0.40) }} />
        ))}
        {/* 1 · the FLANGE at the open end, with bolts */}
        <div style={{ position: "absolute", left: L - 20 * s, top: -13 * s, width: 22 * s,
          height: TH + 26 * s, borderRadius: 4 * s,
          background: `linear-gradient(180deg, ${mxh(c, 0.34)} 0%, ${dkh(c, 0.52)} 100%)` }} />
        {[0.12, 0.5, 0.88].map((k, i) => (
          <div key={"fb" + i} style={{ position: "absolute", left: L - 14 * s,
            top: -13 * s + (TH + 26 * s) * k - 5 * s, width: 10 * s, height: 10 * s,
            borderRadius: 5 * s, background: dkh(c, 0.68) }} />
        ))}
        {/* 2 · the BORE — a real dark opening at the mouth */}
        <div style={{ position: "absolute", left: L - 12 * s, top: 6 * s, width: 14 * s,
          height: TH - 12 * s, borderRadius: "50%", background: "#05070A" }} />
        {/* the flow inside the barrel, only when the main is live */}
        {flow > 0.02 && (
          <div style={{ position: "absolute", left: 8 * s, top: TH * 0.28, width: L - 40 * s,
            height: TH * 0.44, borderRadius: TH * 0.22, overflow: "hidden" }}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={"fl" + i} style={{ position: "absolute",
                left: ((f * 15 + i * 62) % (L - 40 * s)), top: 0, width: 30 * s,
                height: "100%", borderRadius: TH * 0.22, opacity: flow,
                background: `linear-gradient(90deg, transparent, ${TOKL}, transparent)` }} />
            ))}
          </div>
        )}
        {/* 4 · the pressure GAUGE on the body */}
        <div style={{ position: "absolute", left: L * 0.66, top: -30 * s, width: 44 * s,
          height: 44 * s, borderRadius: 22 * s,
          background: `radial-gradient(circle at 36% 30%, ${PAPER}, ${CREAMB})`,
          border: `${3 * s}px solid ${dkh(c, 0.60)}` }}>
          <div style={{ position: "absolute", left: 20 * s, top: 20 * s, width: 15 * s,
            height: 3 * s, transformOrigin: "1px 50%", background: RED,
            transform: `rotate(${-130 + flow * 210}deg)` }} />
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   7 · THE GRILLE — the caveman restrictor. It drops across the outlet chute
   and sorts the stream: loose word blocks pile against it, milled code bars go
   straight through the slots.
   What makes something read as a SORTING GRILLE rather than a gate:
     SLOTS wide enough to see through, sized to the thing that passes ·
     a heavy top BEAM with guide channels · TAPERED lead-in edges on each bar ·
     side RUNNERS it travels in · a catch tray of stopped material at its foot
   All five drawn.
   ⛔ The slot pitch is set from `CodeBar`'s 122px width, because a sort only
   reads if the sizes obviously explain the outcome.
   ====================================================================== */
export const Grille: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number;
  z?: number; drop?: number; c?: string }> =
  ({ x, y, w: ww = 560, h: hh = 300, s = 1, z = 56, drop = 1, c = "#6E7A82" }) => {
  const k = Math.max(0, Math.min(1, drop));
  const SLOT = 74 * s, BAR = 30 * s;
  const n = Math.floor((ww * s) / (SLOT + BAR));
  return (
    <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y - hh * s, zIndex: z,
      width: ww * s, height: hh * s, transform: `translateY(${-(1 - k) * hh * s * 1.06}px)` }}>
      {/* 4 · the side RUNNERS — a gate that travels needs visible ways */}
      {[-1, 1].map((sg) => (
        <div key={sg} style={{ position: "absolute",
          left: sg < 0 ? -16 * s : ww * s + 2 * s, top: -30 * s, width: 14 * s,
          height: hh * s + 60 * s,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
      ))}
      {/* 2 · the heavy top BEAM */}
      <div style={{ position: "absolute", left: -18 * s, top: 0, width: ww * s + 36 * s,
        height: 40 * s, borderRadius: 4 * s, boxShadow: SH_D,
        background: `linear-gradient(178deg, ${mxh(c, 0.36)} 0%, ${c} 40%, ${dkh(c, 0.48)} 100%)`,
        border: `${2 * s}px solid ${dkh(c, 0.62)}` }} />
      {/* the bars, with 3 · TAPERED lead-in edges */}
      {Array.from({ length: n + 1 }, (_, i) => (
        <div key={"b" + i} style={{ position: "absolute", left: i * (SLOT + BAR), top: 34 * s,
          width: BAR, height: hh * s - 34 * s, boxShadow: SH,
          background: `linear-gradient(96deg, ${mxh(c, 0.30)} 0%, ${c} 44%, ${dkh(c, 0.50)} 100%)`,
          clipPath: `polygon(0% 0%, 100% 0%, 100% 92%, 50% 100%, 0% 92%)` }}>
          <div style={{ position: "absolute", left: 3 * s, top: 0, width: 4 * s,
            height: "88%", background: hexa(TOKL, 0.22) }} />
        </div>
      ))}
    </div>
  );
};

/* =========================================================================
   8 · THE CACHE BLOCK + ITS CRADLE — the reel's peak.
   The prompt cache is a large mass kept HOT. Leave it an hour and the heat
   goes out of it, and the next prompt has to rebuild the whole thing and pay
   for all of it again. That is the mechanism, and it is the one thing in this
   subject a viewer has felt and cannot name.

   What makes something read as a HOT BILLET IN A CRADLE:
     an internal GLOW that is brightest at the core and falls off outward ·
     SCALE crusting on the surface as it cools · a cradle with V-BLOCKS and
     visible bearing contact · heat SHIMMER above it · a temperature GAUGE
   All five drawn.
   ⛔ `cool` drives EVERYTHING: colour, scale crust, shimmer, gauge and the
   crumble. One driver, so the object cannot be half-cold.
   ====================================================================== */
export const CacheBlock: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  cool?: number; crumble?: number; label?: string }> =
  ({ x, y, s = 1, z = 54, f = 0, cool = 0, crumble = 0, label }) => {
  const c = Math.max(0, Math.min(1, cool));
  const cr = Math.max(0, Math.min(1, crumble));
  const BW = 300 * s, BH = 168 * s;
  const hot = lerpHex("#FFC24E", "#5C5A54", c);
  const core = lerpHex("#FFF0C0", "#6E6C64", c);
  const edge = lerpHex("#C4560E", "#3A3834", c);
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH, width: BW, height: BH,
      zIndex: z }}>
      {/* the body, or its rubble once it has gone */}
      {cr < 0.98 && (
        <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s, boxShadow: SH_D,
          opacity: 1 - cr,
          background: `linear-gradient(168deg, ${core} 0%, ${hot} 40%, ${edge} 100%)`,
          border: `${3 * s}px solid ${edge}`, transform: `scaleY(${1 - cr * 0.34})`,
          transformOrigin: "50% 100%" }}>
          {/* the SCALE crust — appears as it cools, brightest cracks last */}
          {c > 0.12 && [0.18, 0.42, 0.66, 0.86].map((k, i) => (
            <div key={"sc" + i} style={{ position: "absolute", left: BW * k - 40 * s,
              top: (14 + (i % 2) * 44) * s, width: 80 * s, height: 40 * s, borderRadius: 5 * s,
              opacity: Math.min(0.9, (c - 0.12) * 1.5),
              background: `linear-gradient(140deg, #4A4842 0%, #2E2C28 100%)` }} />
          ))}
          {/* the crack lines that open just before it goes */}
          {cr > 0.02 && [0.30, 0.58].map((k, i) => (
            <div key={"ck" + i} style={{ position: "absolute", left: BW * k, top: 0,
              width: 4 * s, height: BH, background: "#0A0908", opacity: Math.min(1, cr * 3),
              transform: `rotate(${i ? 5 : -7}deg)` }} />
          ))}
          {/* ⛔ this read "YOUR CONTEXT" in three scenes. The block carries the
                 REAL Claude mark instead — it IS Claude's context, the mark says
                 so with no words, and it goes grey with the metal as it cools,
                 which a caption could never do. */}
          {label && (
            <div style={{ position: "absolute", left: BW / 2 - 34 * s, top: BH * 0.30,
              width: 68 * s, height: 68 * s, display: "flex", alignItems: "center",
              justifyContent: "center" }}>
              <Img src={staticFile("logos/claude.svg")}
                style={{ width: 62 * s, height: 62 * s, objectFit: "contain",
                  opacity: 0.30 + (1 - c) * 0.46,
                  filter: `saturate(${1 - c * 0.9}) brightness(${0.30 + (1 - c) * 0.16})` }} />
            </div>
          )}
        </div>
      )}
      {/* the rubble it becomes — 14 pieces, so a collapse is a COLLAPSE */}
      {cr > 0.02 && Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI - Math.PI / 2;
        const d = cr * (60 + (i % 4) * 44) * s;
        return (
          <div key={"rb" + i} style={{ position: "absolute",
            left: BW / 2 + Math.cos(a) * d * 1.9 - 15 * s,
            top: BH - 22 * s + Math.abs(Math.sin(a)) * 8 * s - Math.max(0, 44 - d * 0.5) * s * cr,
            width: (22 + (i % 3) * 12) * s, height: (16 + (i % 2) * 8) * s, borderRadius: 3 * s,
            transform: `rotate(${(i * 47) % 60 - 30}deg)`, opacity: Math.min(1, cr * 2.4),
            background: `linear-gradient(160deg, #55534C 0%, #2C2A26 100%)` }} />
        );
      })}
      {/* the heat SHIMMER — only while it is hot, and it is the emitter on the
          stillest part of the object (§11: effort wants an emitter) */}
      {c < 0.7 && cr < 0.3 && Array.from({ length: 7 }, (_, i) => {
        const t = (f * 0.9 + i * 13) % 46;
        return (
          <div key={"sh" + i} style={{ position: "absolute", left: 24 * s + i * 42 * s,
            top: -t * 1.7 * s, width: 12 * s, height: 30 * s, borderRadius: 6 * s,
            opacity: (1 - c) * (1 - t / 46) * 0.32,
            background: `linear-gradient(180deg, transparent, ${hexa("#FFD08A", 0.9)})`,
            transform: `translateX(${Math.sin(f * 0.16 + i) * 7}px)` }} />
        );
      })}
    </div>
  );
};

/** the cradle the block sits in: V-blocks, bearing contact and a temperature
    gauge. ⛔ IT MUST READ WHILE EMPTY — the empty cradle at S15 is the promise. */
export const Cradle: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  temp?: number; c?: string }> = ({ x, y, s = 1, z = 44, f = 0, temp = 1, c = "#4A5258" }) => {
  const CW = 400 * s;
  return (
    <div style={{ position: "absolute", left: x - CW / 2, top: y - 30 * s, width: CW,
      height: 120 * s, zIndex: z }}>
      {/* the bed */}
      <div style={{ position: "absolute", left: 0, top: 22 * s, width: CW, height: 34 * s,
        borderRadius: 4 * s, boxShadow: SH_D,
        background: `linear-gradient(178deg, ${mxh(c, 0.34)} 0%, ${c} 42%, ${dkh(c, 0.48)} 100%)` }} />
      {/* the V-BLOCKS — the feature that says "something round/heavy rests here" */}
      {[0.16, 0.84].map((k, i) => (
        <div key={"v" + i} style={{ position: "absolute", left: CW * k - 34 * s, top: -6 * s,
          width: 68 * s, height: 34 * s,
          clipPath: "polygon(0% 0%, 26% 100%, 74% 100%, 100% 0%)",
          background: `linear-gradient(178deg, ${mxh(c, 0.40)} 0%, ${dkh(c, 0.40)} 100%)` }} />
      ))}
      {/* legs */}
      {[0.10, 0.90].map((k, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: CW * k - 11 * s, top: 52 * s,
          width: 22 * s, height: 62 * s,
          background: `linear-gradient(96deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.54)} 100%)` }} />
      ))}
      {/* the temperature GAUGE — a real dial with a red band, on the cradle end */}
      <div style={{ position: "absolute", left: CW - 8 * s, top: 6 * s, width: 62 * s,
        height: 62 * s, borderRadius: 31 * s,
        background: `radial-gradient(circle at 36% 30%, ${PAPER}, ${CREAMB})`,
        border: `${4 * s}px solid ${dkh(c, 0.58)}` }}>
        <div style={{ position: "absolute", left: 6 * s, top: 6 * s, width: 42 * s, height: 42 * s,
          borderRadius: 21 * s,
          background: `conic-gradient(from 220deg, ${GREEN} 0deg, ${GOLD} 96deg, ${RED} 190deg, transparent 200deg)`,
          opacity: 0.34 }} />
        <div style={{ position: "absolute", left: 27 * s, top: 27 * s, width: 22 * s, height: 3.4 * s,
          transformOrigin: "1px 50%", background: RED,
          transform: `rotate(${140 - temp * 200}deg)` }} />
        <div style={{ position: "absolute", left: 24 * s, top: 24 * s, width: 9 * s, height: 9 * s,
          borderRadius: 5 * s, background: dkh(c, 0.62) }} />
      </div>
    </div>
  );
};

/* =========================================================================
   9 · THE GUARD ARM — super-token-saver's Token Guardian, drawn as what it
   actually is: a thing that WATCHES a rail, finds the moment, and shuts a
   shutter before the heat is gone.
   ⭐ THE VERB IN THE LINE IS "FINDS", so the arm HUNTS first — it tracks along
   its rail, hesitates, locks on, and only then acts. An arm that simply closes
   depicts the outcome and not the sentence.
   ====================================================================== */
export const GuardArm: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  travel?: number; lock?: number; shut?: number; c?: string }> =
  ({ x, y, s = 1, z = 62, f = 0, travel = 0, lock = 0, shut = 0, c = "#8A5A2E" }) => {
  const SPAN = 420 * s;
  const px = x - SPAN / 2 + SPAN * Math.max(0, Math.min(1, travel));
  return (<>
    {/* the rail it runs on — drawn full width so the hunt has somewhere to be */}
    <div style={{ position: "absolute", left: x - SPAN / 2 - 40 * s, top: y - 16 * s,
      width: SPAN + 80 * s, height: 18 * s, zIndex: z - 2, borderRadius: 4 * s,
      background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
    {/* the carriage */}
    <div style={{ position: "absolute", left: px - 42 * s, top: y - 44 * s, width: 84 * s,
      height: 52 * s, zIndex: z, borderRadius: 5 * s, boxShadow: SH_D,
      background: `linear-gradient(168deg, ${mxh(c, 0.36)} 0%, ${c} 42%, ${dkh(c, 0.50)} 100%)`,
      border: `${2 * s}px solid ${dkh(c, 0.64)}` }}>
      {/* the SENSOR EYE — it is what makes "finds" legible: a lit lens that goes
          from sweeping amber to locked green */}
      <div style={{ position: "absolute", left: 27 * s, top: 12 * s, width: 30 * s,
        height: 30 * s, borderRadius: 15 * s, border: `${3 * s}px solid ${dkh(c, 0.70)}`,
        background: lock > 0.5
          ? `radial-gradient(circle at 38% 32%, ${mxh(GREEN, 0.56)}, ${dkh(GREEN, 0.24)})`
          : `radial-gradient(circle at 38% 32%, ${mxh(SODIUM, 0.50)}, ${dkh(SODIUM, 0.30)})` }} />
      {/* the two wheels it rides on */}
      {[16, 62].map((wx, i) => (
        <div key={i} style={{ position: "absolute", left: wx * s - 8 * s, top: 44 * s,
          width: 16 * s, height: 16 * s, borderRadius: 8 * s, background: dkh(STEEL, 0.44),
          transform: `rotate(${travel * 900}deg)` }}>
          <div style={{ position: "absolute", left: 7 * s, top: 2 * s, width: 2 * s,
            height: 12 * s, background: hexa(TOKL, 0.36) }} />
        </div>
      ))}
    </div>
    {/* the SEARCH CONE while hunting — a shaped cone, never a full-frame fill */}
    {lock < 0.5 && (
      <div style={{ position: "absolute", left: px - 96 * s, top: y + 6 * s, width: 192 * s,
        height: 210 * s, zIndex: z - 1, opacity: 0.30,
        clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
        background: `linear-gradient(180deg, ${hexa(SODIUM, 0.9)}, transparent)` }} />
    )}
    {/* the SHUTTER it drives down, hinged at the carriage */}
    {shut > 0.01 && (
      <div style={{ position: "absolute", left: px - 168 * s, top: y + 8 * s, width: 336 * s,
        height: 148 * s * Math.max(0, Math.min(1, shut)), zIndex: z - 1, borderRadius: 3 * s,
        overflow: "hidden", boxShadow: SH_D,
        background: `linear-gradient(180deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.44)} 100%)` }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, top: i * 22 * s,
            width: "100%", height: 4 * s, background: hexa("#000", 0.34) }} />
        ))}
      </div>
    )}
  </>);
};

/* =========================================================================
   10 · THE IDLE CLOCK — the 1-hour TTL, drawn as a SHOP CLOCK on the wall, not
   as a caption. What makes it read: a bezel, a face with real minute ticks, an
   hour and a minute hand at a readable angle, a red danger arc at the top, and
   a second hand that is visibly running.
   ⛔ ONE TEXT CHIP PER SHOT — the figure `1 HOUR` lives on the header band, not
   on this face. The face carries only the ARC and the hands.
   ====================================================================== */
export const IdleClock: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  t?: number; alarm?: number }> = ({ x, y, s = 1, z = 50, f = 0, t = 0, alarm = 0 }) => {
  const D = 150 * s;
  const k = Math.max(0, Math.min(1, t));
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D,
      zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: SH_D,
        background: `linear-gradient(164deg, ${mxh(BRASS, 0.40)} 0%, ${dkh(BRASS, 0.46)} 100%)`,
        border: `${5 * s}px solid ${dkh(BRASS, 0.62)}` }} />
      <div style={{ position: "absolute", inset: 11 * s, borderRadius: "50%",
        background: `radial-gradient(circle at 38% 32%, ${PAPER}, ${CREAMB})` }} />
      {/* the danger ARC — the last quarter of the hour, in red */}
      <div style={{ position: "absolute", inset: 15 * s, borderRadius: "50%", overflow: "hidden",
        opacity: 0.34 + alarm * 0.44 }}>
        <div style={{ position: "absolute", inset: 0,
          background: `conic-gradient(from 270deg, transparent 0deg, transparent 270deg, ${RED} 270deg, ${RED} 360deg)` }} />
      </div>
      {/* minute ticks — 12 long, and that is what makes a disc read as a clock */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"t" + i} style={{ position: "absolute", left: D / 2 - 1.6 * s, top: 15 * s,
          width: 3.2 * s, height: (i % 3 === 0 ? 14 : 8) * s, background: hexa(INK, 0.66),
          transformOrigin: `50% ${D / 2 - 15 * s}px`, transform: `rotate(${i * 30}deg)` }} />
      ))}
      {/* the minute hand — one full sweep is the hour */}
      <div style={{ position: "absolute", left: D / 2 - 2.6 * s, top: D / 2 - 52 * s,
        width: 5.2 * s, height: 54 * s, borderRadius: 3 * s, background: INK,
        transformOrigin: "50% 100%", transform: `rotate(${k * 360}deg)` }} />
      {/* the hour hand, short and slow */}
      <div style={{ position: "absolute", left: D / 2 - 3.4 * s, top: D / 2 - 34 * s,
        width: 6.8 * s, height: 36 * s, borderRadius: 4 * s, background: dkh(INK, 0.0),
        transformOrigin: "50% 100%", transform: `rotate(${k * 30}deg)` }} />
      {/* the second hand — the thing that makes it visibly RUNNING */}
      <div style={{ position: "absolute", left: D / 2 - 1.2 * s, top: D / 2 - 56 * s,
        width: 2.4 * s, height: 58 * s, background: RED, transformOrigin: "50% 100%",
        transform: `rotate(${(f * 12) % 360}deg)` }} />
      <div style={{ position: "absolute", left: D / 2 - 6 * s, top: D / 2 - 6 * s, width: 12 * s,
        height: 12 * s, borderRadius: 6 * s, background: dkh(BRASS, 0.60) }} />
    </div>
  );
};

/* =========================================================================
   11 · THE JOB CRATE — one unit of finished work, the thing the hatch pays out.
   ⛔ REEL 112: "I don't like how each of the repos are represented as brown
   boxes." A crate carries ONE bit unless you draw what is IN it. So this one is
   OPEN, and what is inside is drawn: milled code bars, a coil of ribbon output
   and a stamped docket. Fourteen parts against four.
   ====================================================================== */
export const JobCrate: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  rot?: number; c?: string }> = ({ x, y, s = 1, z = 52, f = 0, rot = 0, c = "#41505C" }) => {
  const CW = 168 * s, CH = 116 * s;
  return (
    <div style={{ position: "absolute", left: x - CW / 2, top: y - CH, width: CW, height: CH,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the back wall of the open crate, so it reads as a container not a slab */}
      <div style={{ position: "absolute", left: 8 * s, top: 6 * s, width: CW - 16 * s,
        height: CH - 14 * s, borderRadius: 3 * s, background: dkh(c, 0.58) }} />
      {/* the CONTENTS — three milled bars and a ribbon coil, visible over the lip */}
      {[0, 1, 2].map((i) => (
        <div key={"cb" + i} style={{ position: "absolute", left: (20 + i * 42) * s,
          top: (18 + (i % 2) * 9) * s, width: 34 * s, height: 58 * s, borderRadius: 3 * s,
          background: `linear-gradient(158deg, #3E4A54 0%, #232C34 100%)` }}>
          {[0, 1, 2].map((j) => (
            <div key={j} style={{ position: "absolute", left: 5 * s, top: (9 + j * 12) * s,
              width: (22 - j * 5) * s, height: 3 * s, background: hexa(TEAL, 0.60) }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: CW - 46 * s, top: 22 * s, width: 34 * s,
        height: 34 * s, borderRadius: 17 * s,
        background: `radial-gradient(circle at 36% 32%, ${CREAMB}, #B9AE94)`,
        border: `${3 * s}px solid #8A7E62` }} />
      {/* the front boards — two slats with a gap, which is what says CRATE */}
      {[0.42, 0.74].map((k, i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: 0, top: CH * k,
          width: CW, height: CH * 0.24, borderRadius: 3 * s, boxShadow: SH,
          background: `linear-gradient(178deg, ${mxh(c, 0.28)} 0%, ${c} 40%, ${dkh(c, 0.40)} 100%)` }} />
      ))}
      {/* the corner posts, banded in brass — the band is what makes a case read
          as a case at thumb size, and it is the warm accent on a cool body */}
      {[0, CW - 15 * s].map((lx, i) => (
        <div key={"p" + i} style={{ position: "absolute", left: lx, top: 0, width: 15 * s,
          height: CH, borderRadius: 2 * s,
          background: `linear-gradient(96deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.48)} 100%)` }} />
      ))}
      {[0.06, 0.90].map((k, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: 0, top: CH * k, width: CW,
          height: 8 * s,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.18)} 0%, ${dkh(BRASS, 0.44)} 100%)` }} />
      ))}
      {/* ⛔ THIS USED TO READ "DONE" x11 IN THE BURIAL. A struck brass tally
             plate says the same thing with no word in it: three punched marks on
             a bright oval, which is what a completed-work tag actually looks
             like and what survives at thumbnail size. */}
      <div style={{ position: "absolute", left: CW * 0.32, top: CH * 0.49, width: CW * 0.36,
        height: 22 * s, borderRadius: 11 * s, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 4 * s,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.44)} 0%, ${dkh(BRASS, 0.30)} 100%)`,
        border: `${1.6 * s}px solid ${dkh(BRASS, 0.56)}` }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 5 * s, height: 5 * s, borderRadius: 3 * s,
            background: dkh(BRASS, 0.62) }} />
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   12 · THE KEYWORD PLATE — the CTA. A struck brass plate on a gatepost, with
   the keyword driven into it by a hammer rather than printed on it.
   ====================================================================== */
export const KeyPlate: React.FC<{ x: number; y: number; s?: number; z?: number; struck?: number;
  word: string }> = ({ x, y, s = 1, z = 66, struck = 0, word }) => {
  const PW = 430 * s, PH = 132 * s;
  const k = Math.max(0, Math.min(1, struck));
  return (
    <div style={{ position: "absolute", left: x - PW / 2, top: y - PH / 2, width: PW, height: PH,
      zIndex: z, transform: `scale(${1 + (1 - k) * 0.05})` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, boxShadow: SH_D,
        background: `linear-gradient(166deg, ${mxh(BRASS, 0.40)} 0%, ${BRASS} 42%, ${dkh(BRASS, 0.46)} 100%)`,
        border: `${4 * s}px solid ${dkh(BRASS, 0.62)}` }} />
      <div style={{ position: "absolute", inset: 9 * s, borderRadius: 5 * s,
        border: `${2 * s}px solid ${hexa(TOKD, 0.44)}` }} />
      {[[20, 20], [PW - 20, 20], [20, PH - 20], [PW - 20, PH - 20]].map(([bx, by], i) => (
        <div key={"r" + i} style={{ position: "absolute", left: bx - 7 * s, top: by - 7 * s,
          width: 14 * s, height: 14 * s, borderRadius: 7 * s,
          background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.50)}, ${dkh(BRASS, 0.64)})` }} />
      ))}
      {/* the word, driven IN — dark relief with a bright lower lip, so it reads
          as struck metal rather than printed type */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", opacity: k }}>
        <span style={{ ...mono(Math.round(64 * s), 900), color: dkh(BRASS, 0.66),
          letterSpacing: 5, textShadow: `0 ${2.6 * s}px 0 ${hexa(TOKL, 0.50)}` }}>{word}</span>
      </div>
    </div>
  );
};

/* =========================================================================
   13 · THE TARIFF BOARD — the frame-0 claim plate, AS A SET ELEMENT.

   ⛔⛔⛔ REEL 124's MOST EXPENSIVE HOOK MISTAKE, INHERITED AS A RULE: a
   full-width cream claim card painted across panel y 96..272 sat directly on
   top of the object the hook was about, and the hero's forearms — correctly
   ending ON that object — read as two clay sticks hanging in mid-air. A GATE
   CARRIED BY THE WRONG OBJECT DEFORMS THAT OBJECT.

   ⭐ So the HOOK_LUMA and HOOK_PLATE jobs live here instead: a lit vitreous
   enamel utility board BOLTED TO THE WALL, at a different x from the hero. It
   is a real piece of the meter house, so it also answers "is this a place or a
   backdrop" — and being lit, it raises frame-0 luma the right way (a practical
   light) rather than by lifting the palette's dark stop.

   What makes something read as an ENAMEL UTILITY BOARD:
     a cast frame with visible BOLTS · a chipped white enamel face with a dark
     border rule · a coloured HEADER band · a ruled tariff row · a conduit
     entering the bottom edge · a shaded lamp on a bracket above it
   All six are drawn.
   ====================================================================== */
export const TariffBoard: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  head: string; big: string; sub?: string; c?: string; lit?: number }> =
  ({ x, y, s = 1, z = 42, f = 0, head, big, sub, c = CLAYD, lit = 1 }) => {
  const BW = 420 * s, BH = 268 * s;
  const fit = Math.min(58, 720 / Math.max(7, big.length)) * s;
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH / 2, width: BW,
      height: BH, zIndex: z }}>
      {/* 6 · the LAMP on its bracket — a practical light, and the reason the
             board is the brightest object without the room being lifted */}
      <div style={{ position: "absolute", left: BW / 2 - 4 * s, top: -54 * s, width: 8 * s,
        height: 40 * s, background: dkh(STEEL, 0.48) }} />
      <div style={{ position: "absolute", left: BW / 2 - 46 * s, top: -30 * s, width: 92 * s,
        height: 30 * s, borderRadius: `${46 * s}px ${46 * s}px 0 0`,
        background: `linear-gradient(178deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
      <div style={{ position: "absolute", left: BW / 2 - 130 * s, top: -6 * s, width: 260 * s,
        height: 130 * s, opacity: 0.26 * lit, zIndex: -1,
        clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
        background: `linear-gradient(180deg, #FFF0C8, transparent)` }} />

      {/* 1 · the CAST FRAME */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s, boxShadow: SH_D,
        background: `linear-gradient(168deg, #4A4438 0%, #2C2820 100%)` }} />
      {[[16, 16], [BW - 16, 16], [16, BH - 16], [BW - 16, BH - 16]].map(([bx, by], i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: bx - 7 * s, top: by - 7 * s,
          width: 14 * s, height: 14 * s, borderRadius: 7 * s,
          background: `radial-gradient(circle at 34% 30%, #8E8878, #3A362C)` }} />
      ))}
      {/* 2 · the ENAMEL FACE with its dark border rule */}
      <div style={{ position: "absolute", left: 12 * s, top: 12 * s, width: BW - 24 * s,
        height: BH - 24 * s, borderRadius: 3 * s, overflow: "hidden",
        background: `linear-gradient(172deg, #FBF8F1 0%, ${CREAMB} 60%, #DFD8C6 100%)` }}>
        <div style={{ position: "absolute", inset: 7 * s, border: `${2.4 * s}px solid ${hexa(INK, 0.60)}`,
          borderRadius: 2 * s }} />
        {/* 3 · the coloured HEADER band */}
        <div style={{ position: "absolute", left: 7 * s, top: 7 * s, width: BW - 38 * s,
          height: 50 * s, background: c, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <span style={{ ...mono(Math.round(24 * s), 900), color: "#FBF8F1", letterSpacing: 3 }}>
            {head}
          </span>
        </div>
        {/* the claim, mute-readable at thumb distance */}
        <div style={{ position: "absolute", left: 7 * s, top: 66 * s, width: BW - 38 * s,
          height: 96 * s, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(Math.round(fit), 900), color: INK, letterSpacing: -1,
            textAlign: "center", lineHeight: 0.94, whiteSpace: "pre-line" }}>{big}</span>
        </div>
        {/* 4 · the ruled tariff row */}
        <div style={{ position: "absolute", left: 20 * s, top: 168 * s, width: BW - 64 * s,
          height: 2.4 * s, background: hexa(INK, 0.44) }} />
        {sub && (
          <div style={{ position: "absolute", left: 7 * s, top: 180 * s, width: BW - 38 * s,
            display: "flex", justifyContent: "center" }}>
            <span style={{ ...mono(Math.round(21 * s), 900), color: CLAYD, letterSpacing: 1.2 }}>
              {sub}
            </span>
          </div>
        )}
        {/* the chips in the enamel, which is what makes enamel read as enamel */}
        {[0.10, 0.86, 0.42].map((k, i) => (
          <div key={"ch" + i} style={{ position: "absolute", left: (BW - 24 * s) * k,
            top: (BH - 24 * s) * (i === 2 ? 0.94 : 0.06), width: (7 + i * 3) * s,
            height: (5 + i * 2) * s, borderRadius: 3 * s, background: hexa("#6E6656", 0.44) }} />
        ))}
      </div>
      {/* 5 · the CONDUIT entering the bottom edge */}
      <div style={{ position: "absolute", left: BW * 0.24, top: BH - 4 * s, width: 20 * s,
        height: 58 * s, borderRadius: 4 * s,
        background: `linear-gradient(96deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
    </div>
  );
};

/* =========================================================================
   14 · THE OUTLET CHUTE — where a session's output leaves the house.
   What makes something read as a CHUTE rather than a box: a flared MOUTH that
   is wider than its throat · a lipped bottom edge that material clears · side
   CHEEKS that taper in perspective · a hanging rubber CURTAIN at the lip ·
   a wear plate where the material lands.
   ====================================================================== */
export const Chute: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number;
  z?: number; f?: number; c?: string; run?: number; label?: string }> =
  ({ x, y, w: ww = 340, h: hh = 200, s = 1, z = 34, f = 0, c = "#5A5248", run = 0, label }) => {
  const WW = ww * s, HH = hh * s;
  return (
    <div style={{ position: "absolute", left: x - WW / 2, top: y - HH, width: WW, height: HH,
      zIndex: z }}>
      {/* the cheeks + the flared mouth, as one tapering body */}
      <div style={{ position: "absolute", inset: 0, boxShadow: SH_D,
        clipPath: "polygon(0% 0%, 100% 0%, 84% 100%, 16% 100%)",
        background: `linear-gradient(178deg, ${mxh(c, 0.34)} 0%, ${c} 42%, ${dkh(c, 0.50)} 100%)` }} />
      {/* the dark throat you can see into */}
      <div style={{ position: "absolute", left: WW * 0.18, top: HH * 0.10, width: WW * 0.64,
        height: HH * 0.80, clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
        background: `linear-gradient(178deg, #05070A 0%, #0C1014 100%)` }} />
      {/* the lipped bottom edge and its wear plate */}
      <div style={{ position: "absolute", left: WW * 0.13, top: HH - 12 * s, width: WW * 0.74,
        height: 16 * s, borderRadius: 3 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
      {/* the rubber CURTAIN — six strips that swing when material is running */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"cu" + i} style={{ position: "absolute", left: WW * 0.17 + i * WW * 0.11,
          top: HH - 6 * s, width: WW * 0.09, height: 34 * s, borderRadius: 2 * s,
          transformOrigin: "50% 0%",
          transform: `rotate(${Math.sin(f * 0.42 + i) * 11 * run}deg)`,
          background: `linear-gradient(180deg, #2A2622 0%, #14120F 100%)` }} />
      ))}
      {/* ⛔ this carried the word "OUTPUT". A chute that is visibly pouring does
             not need naming; the label is replaced by three cast direction
             chevrons, which say the same thing and cannot be misread. */}
      {label && [0, 1, 2].map((i) => (
        <div key={"cv" + i} style={{ position: "absolute", left: WW / 2 - 15 * s,
          top: (14 + i * 15) * s, width: 30 * s, height: 0,
          borderLeft: `${15 * s}px solid transparent`, borderRight: `${15 * s}px solid transparent`,
          borderTop: `${11 * s}px solid ${hexa(TOKL, 0.20 + i * 0.14)}` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   15 · THE STONE MALLET — the caveman repo's own object.
   ⭐ `feedback_real_marks_are_the_props`: the repo's own mark is a rock (🪨) and
   its whole pitch is "why use many token when few token do trick". So the tool
   that shortens the output IS a stone hammer, and it is the subject's object
   rather than a metaphor laid over it.
   What makes it read: a knapped stone HEAD with flake facets · a bound HAFT
   with visible lashing · a taper to the grip · a weight bias toward the head.
   ====================================================================== */
export const Mallet: React.FC<{ x: number; y: number; s?: number; z?: number; ang?: number }> =
  ({ x, y, s = 1, z = 64, ang = 0 }) => (
  /* ⛔⛔ THIS SWUNG FROM THE HEAD. The wrapper is 0x0 at (x,y), so `rotate()`
         pivots exactly there — and the head was drawn AT the origin with the
         haft running away from it, which meant a hammer that rotated about its
         own stone while the handle flailed. Both call sites place this wrapper
         at the HERO'S HAND and pass x=0,y=0, so the origin was always meant to
         be the GRIP. The haft now runs UP from (0,0) and the head sits at its
         far end, so `ang` swings the tool about the fist that is holding it. */
  <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z,
    transform: `rotate(${ang}deg)` }}>
    {/* the haft — from the grip at the origin, upward to the head */}
    <div style={{ position: "absolute", left: -11 * s, top: -126 * s, width: 22 * s,
      height: 126 * s, borderRadius: 8 * s,
      background: `linear-gradient(96deg, ${mxh("#8A6A3E", 0.30)} 0%, ${dkh("#8A6A3E", 0.46)} 100%)` }} />
    {/* the butt of the handle, below the fist, so the grip point is readable */}
    <div style={{ position: "absolute", left: -14 * s, top: -8 * s, width: 28 * s, height: 14 * s,
      borderRadius: 4 * s, background: dkh("#8A6A3E", 0.56) }} />
    {/* the lashing — three bands where the head is bound on */}
    {[-120, -108, -96].map((t, i) => (
      <div key={i} style={{ position: "absolute", left: -15 * s, top: t * s, width: 30 * s,
        height: 8 * s, borderRadius: 3 * s, background: "#6B5432",
        transform: `rotate(${i % 2 ? 8 : -8}deg)` }} />
    ))}
    {/* the knapped HEAD — an irregular stone, not a cylinder */}
    <div style={{ position: "absolute", left: -62 * s, top: -186 * s, width: 124 * s,
      height: 78 * s, boxShadow: SH_D,
      clipPath: "polygon(6% 26%, 30% 2%, 74% 0%, 100% 30%, 96% 76%, 66% 100%, 24% 96%, 0% 66%)",
      background: `linear-gradient(158deg, #A49C8E 0%, #6E675C 46%, #45403A 100%)` }} />
    {/* the flake facets, which is what makes stone read as knapped */}
    {[[16, 8, 30], [58, 30, 24], [30, 46, 20]].map(([lx, ty, w], i) => (
      <div key={"fk" + i} style={{ position: "absolute", left: (-62 + lx) * s, top: (-186 + ty) * s,
        width: w * s, height: (w * 0.7) * s, opacity: 0.36,
        clipPath: "polygon(0% 40%, 46% 0%, 100% 50%, 40% 100%)",
        background: i % 2 ? "#C6BEAE" : "#39352F" }} />
    ))}
  </div>
);

/* =========================================================================
   16 · THE KNIFE SWITCH — a big, obvious, two-state throw.
   Used once, at the act break. What makes it read: porcelain STANDOFFS ·
   copper BLADES that visibly enter their jaws · a bakelite HANDLE · an arc gap.
   ====================================================================== */
export const KnifeSwitch: React.FC<{ x: number; y: number; s?: number; z?: number; k?: number;
  f?: number }> = ({ x, y, s = 1, z = 56, k = 0, f = 0 }) => {
  const kk = Math.max(0, Math.min(1, k));
  return (
    <div style={{ position: "absolute", left: x - 100 * s, top: y - 150 * s, width: 200 * s,
      height: 190 * s, zIndex: z }}>
      {/* the slate back panel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s, boxShadow: SH_D,
        background: `linear-gradient(168deg, #3A3B3E 0%, #1E2022 100%)` }} />
      {/* two porcelain STANDOFFS */}
      {[36, 150].map((lx, i) => (
        <div key={"so" + i} style={{ position: "absolute", left: lx * s - 17 * s, top: 116 * s,
          width: 34 * s, height: 40 * s, borderRadius: 6 * s,
          background: `linear-gradient(96deg, #E8E2D2 0%, #A9A292 100%)` }} />
      ))}
      {/* the jaws */}
      <div style={{ position: "absolute", left: 24 * s, top: 106 * s, width: 26 * s,
        height: 20 * s, borderRadius: 3 * s, background: dkh(COPPER, 0.30) }} />
      {/* the BLADES on their pivot */}
      <div style={{ position: "absolute", left: 150 * s, top: 126 * s, width: 128 * s,
        height: 18 * s, transformOrigin: "100% 50%",
        transform: `rotate(${-64 + kk * 64}deg)`, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${mxh(COPPER, 0.40)} 0%, ${dkh(COPPER, 0.42)} 100%)` }}>
        {/* the bakelite HANDLE at the free end */}
        <div style={{ position: "absolute", left: -34 * s, top: -11 * s, width: 40 * s,
          height: 40 * s, borderRadius: 8 * s,
          background: `linear-gradient(158deg, #4A3226 0%, #22150E 100%)` }} />
      </div>
      {/* the arc, only at the instant of contact */}
      {kk > 0.86 && kk < 0.99 && (
        <div style={{ position: "absolute", left: 30 * s, top: 96 * s, width: 40 * s,
          height: 40 * s, borderRadius: 20 * s, opacity: 0.7,
          background: `radial-gradient(circle, ${TOKL} 0%, transparent 66%)` }} />
      )}
    </div>
  );
};

/* =========================================================================
   17 · THE SAVE BIN — what the guard keeps hold of. An empty bin has to READ
   while it is EMPTY, because empty is the promise (reel 108/110): so it is a
   bright galvanised tub with a rolled rim, ribbed sides, two drop handles and
   a stencilled tally strip, in a hue and value away from every room it sits in.
   ====================================================================== */
export const SaveBin: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  fill?: number; tally?: string }> = ({ x, y, s = 1, z = 52, f = 0, fill = 0, tally }) => {
  const BW = 236 * s, BH = 150 * s;
  const k = Math.max(0, Math.min(1, fill));
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH, width: BW, height: BH,
      zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, boxShadow: SH_D,
        clipPath: "polygon(4% 0%, 96% 0%, 88% 100%, 12% 100%)",
        background: `linear-gradient(178deg, #C9CFD2 0%, #8F979B 44%, #545B5F 100%)` }} />
      {/* the ribs */}
      {[0.28, 0.5, 0.72].map((kx, i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: BW * kx - 3 * s, top: 10 * s,
          width: 6 * s, height: BH - 20 * s, background: hexa("#3E4448", 0.42),
          transform: `skewX(${(kx - 0.5) * 12}deg)` }} />
      ))}
      {/* the CONTENTS — real struck discs, filling from the bottom */}
      <div style={{ position: "absolute", left: BW * 0.10, top: 8 * s, width: BW * 0.80,
        height: BH - 22 * s, overflow: "hidden" }}>
        {Array.from({ length: 14 }, (_, i) => {
          const row = Math.floor(i / 5), col = i % 5;
          const show = i / 14 < k;
          if (!show) return null;
          return (
            <div key={"tk" + i} style={{ position: "absolute", left: col * 38 * s + (row % 2) * 16 * s,
              top: (BH - 46 * s) - row * 30 * s, width: 40 * s, height: 40 * s,
              borderRadius: 20 * s,
              background: `linear-gradient(158deg, ${TOKL} 0%, ${TOK} 52%, ${TOKD} 100%)`,
              border: `${2 * s}px solid ${TOKD}` }} />
          );
        })}
      </div>
      {/* the rolled rim, over the contents so the bin contains them */}
      <div style={{ position: "absolute", left: -5 * s, top: -8 * s, width: BW + 10 * s,
        height: 17 * s, borderRadius: 9 * s,
        background: `linear-gradient(180deg, #E2E7E9 0%, #737B7F 100%)` }} />
      {/* two drop handles */}
      {[-1, 1].map((sg) => (
        <div key={sg} style={{ position: "absolute", left: sg < 0 ? -16 * s : BW - 6 * s,
          top: 30 * s, width: 22 * s, height: 34 * s, borderRadius: 6 * s,
          background: `linear-gradient(96deg, #9AA2A6 0%, #4E5559 100%)` }} />
      ))}
      {tally && (
        <div style={{ position: "absolute", left: BW * 0.16, top: BH - 34 * s, width: BW * 0.68,
          height: 26 * s, borderRadius: 3 * s, background: CREAMB, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(Math.round(15 * s), 900), color: INK, letterSpacing: 1.2 }}>
            {tally}
          </span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   18 · THE PLINTH — the stand a repo plate is presented on in the three title
   scenes. A plate hovering in a room is a graphic; a plate ON something is an
   object. Cast base, fluted column, a lipped top and a lamp bracket.
   ====================================================================== */
export const Plinth: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string }> =
  ({ x, y, s = 1, z = 38, c = "#4E5258" }) => (
  <div style={{ position: "absolute", left: x - 118 * s, top: y - 300 * s, width: 236 * s,
    height: 300 * s, zIndex: z }}>
    {/* the lipped top */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 236 * s, height: 26 * s,
      borderRadius: 4 * s, boxShadow: SH_D,
      background: `linear-gradient(180deg, ${mxh(c, 0.40)} 0%, ${dkh(c, 0.34)} 100%)` }} />
    {/* the fluted column */}
    <div style={{ position: "absolute", left: 46 * s, top: 24 * s, width: 144 * s,
      height: 246 * s,
      background: `linear-gradient(96deg, ${dkh(c, 0.34)} 0%, ${mxh(c, 0.24)} 34%, ${dkh(c, 0.48)} 100%)` }} />
    {[0.28, 0.5, 0.72].map((k, i) => (
      <div key={"fl" + i} style={{ position: "absolute", left: 46 * s + 144 * s * k - 4 * s,
        top: 30 * s, width: 8 * s, height: 234 * s, background: hexa(dkh(c, 0.56), 0.6) }} />
    ))}
    {/* the cast base */}
    <div style={{ position: "absolute", left: 10 * s, top: 266 * s, width: 216 * s,
      height: 34 * s, borderRadius: 4 * s,
      background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.50)} 100%)` }} />
  </div>
);

/* =========================================================================
   19 · THE CARTRIDGE RACK — three EMPTY bays bolted to the wall beside the
   hatch. ⛔ IT MUST READ WHILE EMPTY, because empty is the before state and the
   promise: three lit, labelled, obviously-vacant sockets at frame 1, so the
   three arrivals have somewhere to mean something.
   What makes it read as a rack of sockets rather than three boxes:
     a shared CHANNEL the bays sit in · a recessed bay with a hard inner shadow ·
     a SEAT RAIL along the bottom of each · a numbered stencil above each ·
     an unlit contact lamp under each that lights when its bay is filled
   All five drawn.
   ====================================================================== */
export const CartRack: React.FC<{ x: number; y: number; s?: number; z?: number;
  filled?: number; c?: string }> = ({ x, y, s = 1, z = 34, filled = 0, c = "#3A424A" }) => {
  const BW = 218 * s, BH = 96 * s, GAP = 22 * s;
  const RW = BW * 3 + GAP * 2 + 34 * s;
  return (
    <div style={{ position: "absolute", left: x - RW / 2, top: y - BH / 2 - 17 * s,
      width: RW, height: BH + 34 * s, zIndex: z }}>
      {/* the shared channel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s, boxShadow: SH_D,
        background: `linear-gradient(172deg, ${mxh(c, 0.28)} 0%, ${c} 40%, ${dkh(c, 0.46)} 100%)`,
        border: `${3 * s}px solid ${dkh(c, 0.62)}` }} />
      {[0, 1, 2].map((i) => (
        <React.Fragment key={"by" + i}>
          {/* the recessed bay */}
          <div style={{ position: "absolute", left: 17 * s + i * (BW + GAP), top: 17 * s,
            width: BW, height: BH, borderRadius: 3 * s, overflow: "hidden",
            background: `linear-gradient(178deg, #0A1016 0%, #070C11 62%, #1E252C 100%)`,
            boxShadow: `inset 0 ${6 * s}px ${12 * s}px ${hexa("#000", 0.9)}` }}>
            {/* the lit socket FLOOR — light on the bottom of a recess is what
                makes it read as a hole rather than as a black card, and it is
                also how an empty bay keeps its share of frame-0 luma without
                anyone lifting the room's dark stop. */}
            <div style={{ position: "absolute", left: 0, top: BH * 0.62, width: "100%",
              height: BH * 0.38,
              background: `linear-gradient(180deg, ${hexa(SODIUM, 0.10)} 0%, ${hexa(SODIUM, 0.34)} 100%)` }} />
            {/* the contact fingers at the back of the socket */}
            {[0.22, 0.44, 0.66, 0.88].map((k) => (
              <div key={k} style={{ position: "absolute", left: BW * k - 4 * s, top: BH * 0.30,
                width: 8 * s, height: BH * 0.34, borderRadius: 2 * s,
                background: `linear-gradient(180deg, ${mxh(BRASS, 0.20)} 0%, ${dkh(BRASS, 0.46)} 100%)` }} />
            ))}
          </div>
          {/* the seat rail */}
          <div style={{ position: "absolute", left: 17 * s + i * (BW + GAP), top: 17 * s + BH - 9 * s,
            width: BW, height: 8 * s,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
          {/* the numbered stencil */}
          <div style={{ position: "absolute", left: 17 * s + i * (BW + GAP) + 8 * s, top: 3 * s }}>
            <span style={{ ...mono(Math.round(12 * s), 900), color: hexa(TOKL, 0.62),
              letterSpacing: 1.6 }}>{`0${i + 1}`}</span>
          </div>
          {/* the contact lamp */}
          <div style={{ position: "absolute", left: 17 * s + i * (BW + GAP) + BW / 2 - 8 * s,
            top: BH + 20 * s, width: 16 * s, height: 16 * s, borderRadius: 8 * s,
            border: `${2 * s}px solid #05070A`,
            background: i < filled
              ? `radial-gradient(circle at 36% 32%, ${mxh(GREEN, 0.50)}, ${dkh(GREEN, 0.30)})`
              : `radial-gradient(circle at 36% 32%, #262B31, #0C0F13)` }} />
        </React.Fragment>
      ))}
    </div>
  );
};

/* =========================================================================
   20 · THE METER WALL — the set, and the biggest single lever in this reel.

   ⛔⛔ WHY THIS EXISTS. The first pass leaned on `HwSets.Room`'s generic
   parallax `Band`s, and in this reel's bone palette the `house` and `shelf`
   silhouettes rendered as a fitted KITCHEN: pale counter slabs at worktop
   height, wall units above them. Every gate was green and the room was wrong.

   ⭐ THE MEASURED FIX IS NOT A DARKER PALETTE, IT IS THE SUBJECT'S OWN OBJECTS,
   BIGGER (ANIMATION-QUALITY §1: "a dense, correct SET" is worth 7.68 -> 9.65,
   more than any effect in the table, and §5: "when a world is boring, use the
   SUBJECT'S OWN OBJECTS"). A meter house has a WALL OF METERS. Seventy real
   brass-cased counters on the back wall are on-topic, dense, and BRIGHT, so
   they also carry frame-0 luma without anyone lifting the palette's dark stop
   — which is the move §8 exists to ban.

   What makes something read as a bank of utility meters:
     a repeating GRID of small cast cases · a BONE dial face in each with a
     needle · a red index mark · CONDUIT running between the columns with
     junction boxes · a few cases DARK and dead among the live ones ·
     a mounting board with visible screws
   All six are drawn.

   `bays` inserts N large EMPTY cartridge sockets into the middle rank — the
   before state the hook needs, in the same object rather than as a second one
   competing with it.
   ====================================================================== */
export const MeterWall: React.FC<{ y: number; f: number; z?: number; cols?: number;
  rows?: number; x0?: number; x1?: number; live?: number; c?: string;
  bays?: { x: number; w: number }[]; filled?: number; dim?: number }> =
  ({ y, f, z = 20, cols = 11, rows = 3, x0 = -40, x1 = W + 40, live = 1,
     c = "#8E8474", bays = [], filled = 0, dim = 0 }) => {
  const span = x1 - x0, pitch = span / cols, RH = 66;
  const shade = 1 - Math.max(0, Math.min(1, dim)) * 0.42;
  return (
    <div style={{ position: "absolute", left: x0, top: y, width: span, height: rows * RH + 26,
      zIndex: z }}>
      {/* the mounting board */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4,
        background: `linear-gradient(178deg, ${dkh(c, 0.06)} 0%, ${dkh(c, 0.34)} 100%)`,
        opacity: 0.96 }} />
      {/* the CONDUIT runs, one per column boundary, with junction boxes */}
      {Array.from({ length: cols + 1 }, (_, i) => (
        <div key={"cd" + i} style={{ position: "absolute", left: i * pitch - 4, top: 0,
          width: 8, height: rows * RH + 26,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
      ))}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, i) => {
          const cx = i * pitch + pitch / 2, cy = 14 + r * RH + RH / 2;
          /* is this cell inside a bay? then the bay draws it instead */
          if (r === 1 && bays.some((b) => Math.abs(cx - b.x + x0 * 0) < b.w / 2 + pitch * 0.1
              && cx > b.x - x0 - b.w / 2 && cx < b.x - x0 + b.w / 2)) return null;
          const dead = (i * 7 + r * 3) % 9 === 0;
          const ph = i * 1.3 + r * 2.1;
          const ang = -52 + Math.sin(f / (7 + (i % 5) * 3) + ph) * 62 * live;
          return (
            <div key={`m${r}_${i}`} style={{ position: "absolute", left: cx - pitch * 0.34,
              top: cy - 25, width: pitch * 0.74, height: 50, borderRadius: 4,
              background: dead
                ? `linear-gradient(168deg, ${dkh(c, 0.50)} 0%, ${dkh(c, 0.68)} 100%)`
                : `linear-gradient(168deg, ${mxh(c, 0.28 * shade)} 0%, ${dkh(c, 0.30)} 100%)`,
              border: `2px solid ${dkh(c, 0.60)}` }}>
              {!dead && (<>
                {/* the BONE dial face — the bright object, and there are ~70 of
                    them, which is where this wall's luma contribution comes from */}
                <div style={{ position: "absolute", left: "11%", top: 5, width: "78%", height: 36,
                  borderRadius: 3,
                  background: `linear-gradient(172deg, ${mxh(PAPER, shade * 0.10)} 0%, ${dkh(CREAMB, (1 - shade) * 0.5)} 100%)` }}>
                  {/* the needle, on its own clock per case */}
                  <div style={{ position: "absolute", left: "48%", top: "52%", width: "34%",
                    height: 3, transformOrigin: "0% 50%", background: hexa(INK, 0.72),
                    transform: `rotate(${ang}deg)` }} />
                  {/* the red index mark */}
                  <div style={{ position: "absolute", right: "12%", top: 3, width: 3, height: 9,
                    background: RED }} />
                </div>
              </>)}
            </div>
          );
        })
      )}
      {/* the large EMPTY cartridge bays inset into the middle rank */}
      {bays.map((b, i) => (
        <React.Fragment key={"by" + i}>
          <div style={{ position: "absolute", left: b.x - x0 - b.w / 2, top: 14 + RH,
            width: b.w, height: RH - 6, borderRadius: 3, overflow: "hidden",
            background: `linear-gradient(178deg, #0B1117 0%, #070C11 58%, #202830 100%)`,
            boxShadow: `inset 0 6px 13px ${hexa("#000", 0.9)}` }}>
            <div style={{ position: "absolute", left: 0, top: "62%", width: "100%", height: "38%",
              background: `linear-gradient(180deg, ${hexa(SODIUM, 0.10)} 0%, ${hexa(SODIUM, 0.36)} 100%)` }} />
            {[0.2, 0.4, 0.6, 0.8].map((k) => (
              <div key={k} style={{ position: "absolute", left: b.w * k - 4, top: "28%",
                width: 8, height: "36%", borderRadius: 2,
                background: `linear-gradient(180deg, ${mxh(BRASS, 0.22)} 0%, ${dkh(BRASS, 0.46)} 100%)` }} />
            ))}
          </div>
          {/* the numbered stencil and the contact lamp — a socket that is filled
              has to SAY so, which is what makes the three arrivals countable */}
          <div style={{ position: "absolute", left: b.x - x0 - b.w / 2 + 6, top: RH - 2 }}>
            <span style={{ ...mono(12, 900), color: hexa(TOKL, 0.70), letterSpacing: 1.6 }}>
              {`0${i + 1}`}
            </span>
          </div>
          <div style={{ position: "absolute", left: b.x - x0 - 9, top: 14 + RH * 2 + 2,
            width: 18, height: 18, borderRadius: 9, border: "2px solid #05070A",
            background: i < filled
              ? `radial-gradient(circle at 36% 32%, ${mxh(GREEN, 0.50)}, ${dkh(GREEN, 0.30)})`
              : `radial-gradient(circle at 36% 32%, #262B31, #0C0F13)` }} />
        </React.Fragment>
      ))}
    </div>
  );
};

/* =========================================================================
   21 · THE METER DIAL — the hook's one dominant object.

   ⛔⛔⛔ WHY THIS REPLACES HALF THE HOOK. Alex, on the first cut: *"there
   shouldn't be any text inside of this animation... it's at the hook. And it's
   not hierarchical enough, it's too much text, and it's also too small."*
   Counted on that frame: TARIFF · 3 FREE REPOS · ONE SESSION · 1 TOKEN ·
   $ SPENT · 01 · 02 · 03 · three repo names · three star counts · three
   licences · eleven DONE dockets. Twenty-plus strings, none of them larger than
   40px, in a shot whose job is ONE image.

   ⭐ A DIAL SAYS THE SAME THING WITH NO WORDS AT ALL. A needle deep in the red
   is read in under 200ms by everyone, at thumbnail size, in any language — which
   is what `THE-OPEN` law 4 is actually asking for. The digits stay in the BODY,
   where the numbers are the receipts and the viewer has already committed.

   What makes something read as a big industrial gauge:
     a cast BEZEL with bolts · a bone FACE · graduated TICKS, long every fifth ·
     a coloured DANGER ARC over the last third · a counterweighted NEEDLE with a
     visible tail · a machined HUB · a glass reflection across it
   All seven are drawn, and `lugs` adds the three bayonet sockets the repo discs
   lock into so the arrivals have somewhere real to land.
   ====================================================================== */
export const MeterDial: React.FC<{ x: number; y: number; d?: number; z?: number; f?: number;
  v?: number; lugs?: number; filled?: number; c?: string }> =
  ({ x, y, d = 460, z = 34, f = 0, v = 1, lugs = 3, filled = 0, c = BRASS }) => {
  const k = Math.max(0, Math.min(1, v));
  /* the needle never quite settles — a loaded gauge hunts */
  const hunt = Math.sin(f / 3.4) * (0.6 + k * 2.6) + Math.sin(f / 1.7) * (0.3 + k * 1.2);
  const ang = -132 + k * 264 + hunt;
  const LUG = [-118, 0, 118];
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
      zIndex: z }}>
      {/* 1 · the cast BEZEL */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: SH_D,
        background: `linear-gradient(158deg, ${mxh(c, 0.44)} 0%, ${c} 40%, ${dkh(c, 0.52)} 100%)` }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: d / 2 - 9, top: 14, width: 18,
          height: 18, borderRadius: 9,
          background: `radial-gradient(circle at 34% 30%, ${mxh(c, 0.54)}, ${dkh(c, 0.62)})`,
          transformOrigin: `50% ${d / 2 - 14}px`, transform: `rotate(${i * 30}deg)` }} />
      ))}
      {/* 2 · the bone FACE */}
      <div style={{ position: "absolute", inset: d * 0.085, borderRadius: "50%",
        background: `radial-gradient(circle at 38% 30%, #FCF8EE 0%, ${CREAMB} 62%, #D8D0BC 100%)`,
        border: `${d * 0.012}px solid ${dkh(c, 0.60)}` }} />
      {/* 4 · the DANGER ARC over the last third, which is the whole message */}
      <div style={{ position: "absolute", inset: d * 0.12, borderRadius: "50%", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.9,
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 76deg, ${hexa(GOLD, 0.72)} 76deg, ${hexa(GOLD, 0.72)} 104deg, ${RED} 104deg, ${RED} 134deg, transparent 134deg)`,
          WebkitMask: `radial-gradient(circle, transparent 0 ${d * 0.22}px, #000 ${d * 0.24}px)`,
          mask: `radial-gradient(circle, transparent 0 ${d * 0.22}px, #000 ${d * 0.24}px)` }} />
      </div>
      {/* 3 · graduated TICKS, long every fifth */}
      {Array.from({ length: 31 }, (_, i) => {
        const long = i % 5 === 0;
        return (
          <div key={"tk" + i} style={{ position: "absolute", left: d / 2 - (long ? 3.4 : 2),
            top: d * 0.145, width: long ? 6.8 : 4, height: long ? d * 0.075 : d * 0.045,
            background: hexa(INK, long ? 0.80 : 0.52), borderRadius: 2,
            transformOrigin: `50% ${d / 2 - d * 0.145}px`,
            transform: `rotate(${-132 + i * (264 / 30)}deg)` }} />
        );
      })}
      {/* 5 · the counterweighted NEEDLE */}
      <div style={{ position: "absolute", left: d / 2 - d * 0.022, top: d * 0.16,
        width: d * 0.044, height: d * 0.40, borderRadius: d * 0.022,
        background: `linear-gradient(180deg, ${RED} 0%, #8E2A1E 100%)`,
        transformOrigin: "50% 100%", transform: `rotate(${ang}deg)` }} />
      <div style={{ position: "absolute", left: d / 2 - d * 0.016, top: d / 2,
        width: d * 0.032, height: d * 0.13, borderRadius: d * 0.016, background: "#5A2018",
        transformOrigin: "50% 0%", transform: `rotate(${ang}deg)` }} />
      {/* 6 · the machined HUB */}
      <div style={{ position: "absolute", left: d / 2 - d * 0.055, top: d / 2 - d * 0.055,
        width: d * 0.11, height: d * 0.11, borderRadius: "50%",
        background: `radial-gradient(circle at 34% 30%, ${mxh(c, 0.50)}, ${dkh(c, 0.60)})` }} />
      {/* 7 · the glass */}
      <div style={{ position: "absolute", inset: d * 0.085, borderRadius: "50%", overflow: "hidden",
        pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: "-30%", top: "-40%", width: "60%", height: "180%",
          transform: "rotate(24deg)",
          background: `linear-gradient(90deg, transparent, ${hexa("#FFF", 0.20)}, transparent)` }} />
      </div>
      {/* the three bayonet SOCKETS the repo discs lock into — empty on frame 1,
          which is the before state the three arrivals need */}
      {Array.from({ length: lugs }, (_, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: d / 2 + LUG[i] * (d / 460) - d * 0.075,
          top: d - d * 0.02, width: d * 0.15, height: d * 0.10, borderRadius: 5,
          background: i < filled
            ? `linear-gradient(180deg, ${mxh(GREEN, 0.34)} 0%, ${dkh(GREEN, 0.40)} 100%)`
            : `linear-gradient(180deg, #14181C 0%, #070A0C 100%)`,
          boxShadow: i < filled ? undefined : `inset 0 4px 8px ${hexa("#000", 0.9)}` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   22 · THE REPO DISC — a repo as a MARK and nothing else.

   ⛔⛔ *"I need to use real logos whenever possible throughout"*, and the hook
   may carry no words. So in the hook a repo is a big bayonet disc with its REAL
   mark on a bone tile and NO name, NO star count and NO licence — the receipts
   move to the body, where the header band and the plates can carry them.

   ⭐ At half a second on a phone a viewer RECOGNISES A MARK; they do not read a
   name (reel 115). This is that rule taken to its conclusion: at 240px the
   DeepSeek whale and the GitHub cat are legible at thumbnail size, and a name
   strip beside them would not be.

   What makes it read as a locking cartridge rather than a sticker:
     a milled RIM · three bayonet LUGS on the outside · a recessed bone TILE ·
     a chamfer catching the key light · a colour ground of its own
   ====================================================================== */
export const RepoDisc: React.FC<{ x: number; y: number; d?: number; z?: number; f?: number;
  logo?: string; rock?: boolean; c?: string; seat?: number; rot?: number }> =
  ({ x, y, d = 240, z = 64, f = 0, logo, rock = false, c = SLATE, seat = 1, rot = 0 }) => {
  const k = Math.max(0, Math.min(1, seat));
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
      zIndex: z, transform: `rotate(${rot}deg) scale(${0.88 + 0.12 * k})`, opacity: k }}>
      {/* the three bayonet LUGS, outside the rim */}
      {[0, 120, 240].map((a) => (
        <div key={a} style={{ position: "absolute", left: d / 2 - d * 0.07, top: -d * 0.045,
          width: d * 0.14, height: d * 0.09, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.28)} 0%, ${dkh(STEEL, 0.50)} 100%)`,
          transformOrigin: `50% ${d / 2 + d * 0.045}px`, transform: `rotate(${a + rot * -1}deg)` }} />
      ))}
      {/* the milled RIM */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: SH_D,
        background: `linear-gradient(158deg, ${mxh(c, 0.34)} 0%, ${c} 42%, ${dkh(c, 0.50)} 100%)`,
        border: `${d * 0.018}px solid ${dkh(c, 0.62)}` }} />
      {Array.from({ length: 32 }, (_, i) => (
        <div key={"m" + i} style={{ position: "absolute", left: d / 2 - d * 0.008, top: 0,
          width: d * 0.016, height: d * 0.045, background: hexa(dkh(c, 0.66), 0.72),
          transformOrigin: `50% ${d / 2}px`, transform: `rotate(${i * (360 / 32)}deg)` }} />
      ))}
      {/* the chamfer */}
      <div style={{ position: "absolute", inset: d * 0.055, borderRadius: "50%",
        border: `${d * 0.014}px solid ${hexa(TOKL, 0.26)}` }} />
      {/* the recessed bone TILE carrying the REAL mark */}
      <div style={{ position: "absolute", inset: d * 0.155, borderRadius: "50%",
        background: `radial-gradient(circle at 38% 30%, #FCF8EE 0%, ${CREAMB} 68%, #D6CEBA 100%)`,
        border: `${d * 0.012}px solid ${dkh(c, 0.56)}`, display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {logo
          ? <Img src={staticFile(`logos/${logo}`)} style={{ width: d * 0.46, height: d * 0.46,
              objectFit: "contain" }} />
          : rock
          ? (<div style={{ position: "relative", width: d * 0.50, height: d * 0.36 }}>
              <div style={{ position: "absolute", inset: 0,
                clipPath: "polygon(6% 26%, 30% 2%, 74% 0%, 100% 30%, 96% 76%, 66% 100%, 24% 96%, 0% 66%)",
                background: `linear-gradient(158deg, #8E8678 0%, #5A5349 46%, #33302B 100%)` }} />
              {[[0.16, 0.10, 0.32], [0.50, 0.36, 0.24]].map(([lx, ty, w], i) => (
                <div key={i} style={{ position: "absolute", left: `${lx * 100}%`, top: `${ty * 100}%`,
                  width: `${w * 100}%`, height: `${w * 70}%`, opacity: 0.40,
                  clipPath: "polygon(0% 40%, 46% 0%, 100% 50%, 40% 100%)",
                  background: i ? "#2B2823" : "#C2BAAB" }} />
              ))}
            </div>)
          : null}
      </div>
    </div>
  );
};

/* =========================================================================
   23 · THE OUTPUT RIBBON — what "too many words" looks like with no words.

   ⛔⛔ WHY THIS REPLACES `WordBlock`. Alex: *"a lot of these animation
   components are just not that interesting, it's kinda hard to tell what's
   going on... it's not easy to see what's actually going on in each of these
   animations that corresponds with the actual what's being said."* S7's line is
   *"this forces Claude to remove all the filler words"* and the picture was
   pale rectangles tumbling out of a chute. A rectangle is not a word, and a
   viewer has no way to learn that it is.

   ⭐ A RIBBON IS. Paper tape pouring out of a machine reads as OUTPUT to
   everyone, instantly, with nothing written on it — and "too much of it" is the
   only thing the shot has to say. It is also a far better motion shape than
   loose blocks: one continuous object crossing the whole panel, which is §1's
   highest-value form.

   What makes it read as printed tape rather than a strip:
     a sprocket track down BOTH edges · a folded/curled path rather than a
     straight one · ruled TEXT LINES that are lines and never letters · a
     lighter reverse where it twists · a torn end
   ====================================================================== */
export const Ribbon: React.FC<{ x: number; y: number; len?: number; w?: number; z?: number;
  f?: number; phase?: number; curl?: number; c?: string; rot?: number }> =
  ({ x, y, len = 420, w: ww = 62, z = 50, f = 0, phase = 0, curl = 1, c = "#E4DCC8", rot = 0 }) => {
  const N = Math.max(3, Math.round(len / 60));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z,
      transform: `rotate(${rot}deg)` }}>
      {Array.from({ length: N }, (_, i) => {
        const u = i / (N - 1);
        /* the curl: a travelling sine so the tape is never a straight stick */
        const dy = Math.sin(u * 3.1 + phase) * 26 * curl;
        const dr = Math.cos(u * 3.1 + phase) * 22 * curl;
        /* every third segment shows its lighter reverse, which is what a twist
           looks like and what stops a long strip reading as a plank */
        const back = (i + Math.round(phase)) % 5 === 0;
        return (
          <div key={i} style={{ position: "absolute", left: u * len - 2, top: dy - ww / 2,
            width: len / (N - 1) + 4, height: ww, transform: `rotate(${dr * 0.5}deg)`,
            background: back
              ? `linear-gradient(180deg, #FFFBF2 0%, ${c} 100%)`
              : `linear-gradient(180deg, ${mxh(c, 0.18)} 0%, ${c} 46%, ${dkh(c, 0.20)} 100%)` }}>
            {/* the sprocket track, both edges */}
            {[3, ww - 9].map((ty) => (
              <div key={ty} style={{ position: "absolute", left: 0, top: ty, width: "100%",
                height: 6, background: `repeating-linear-gradient(90deg, ${hexa("#8E8674", 0)} 0 7px, ${hexa("#7E7768", 0.42)} 7px 12px)` }} />
            ))}
            {/* ruled lines — lines, never letters */}
            {!back && [0.34, 0.52, 0.70].map((k, j) => (
              <div key={j} style={{ position: "absolute", left: 8, top: ww * k,
                width: `${58 + ((i * 7 + j * 13) % 34)}%`, height: 3.4, borderRadius: 2,
                background: hexa("#8A8272", 0.56) }} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   24 · THE BALANCE — "the output stays the exact same while you pay less."

   ⛔ The line makes a COMPARISON and the shot was two crates on a table with
   their lids off. Identical contents side by side is exactly the thing an eye
   cannot verify at 2.9 seconds, so the scene asserted the claim rather than
   showing it.

   ⭐ A BEAM BALANCE PROVES IT INSTEAD OF STATING IT. Two pans carrying the same
   output sit DEAD LEVEL, which is a fact you can read in one glance and cannot
   fake. What differs is underneath: a tall stack of coins on one side and three
   on the other. Same output, different price, no words, one object.

   What makes it read as a balance: a central column and fulcrum knife · a beam
   that actually pivots · two hangers with real chains · two dished pans · a
   pointer against a scale plate at the top.
   ====================================================================== */
export const Balance: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  tilt?: number; c?: string }> = ({ x, y, s = 1, z = 46, f = 0, tilt = 0, c = "#6E6656" }) => {
  const BW = 520 * s, H0 = 300 * s;
  /* a real balance never sits perfectly still — it rings down to level */
  const t = tilt + Math.sin(f / 9) * 0.6 * (1 - Math.min(1, Math.abs(tilt)));
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - H0, width: BW, height: H0,
      zIndex: z }}>
      {/* the column and its foot */}
      <div style={{ position: "absolute", left: BW / 2 - 15 * s, top: 34 * s, width: 30 * s,
        height: H0 - 34 * s,
        background: `linear-gradient(96deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.48)} 100%)` }} />
      <div style={{ position: "absolute", left: BW / 2 - 78 * s, top: H0 - 22 * s, width: 156 * s,
        height: 24 * s, borderRadius: 5 * s, boxShadow: SH_D,
        background: `linear-gradient(180deg, ${mxh(c, 0.34)} 0%, ${dkh(c, 0.50)} 100%)` }} />
      {/* the scale plate and pointer at the top — a needle, not a number */}
      <div style={{ position: "absolute", left: BW / 2 - 34 * s, top: 0, width: 68 * s,
        height: 34 * s, borderRadius: `${34 * s}px ${34 * s}px 0 0`,
        background: `linear-gradient(180deg, ${PAPER} 0%, ${CREAMB} 100%)`,
        border: `${2 * s}px solid ${dkh(c, 0.52)}` }}>
        <div style={{ position: "absolute", left: 33 * s, top: 6 * s, width: 2.4 * s,
          height: 24 * s, background: hexa(INK, 0.34) }} />
      </div>
      <div style={{ position: "absolute", left: BW / 2 - 2 * s, top: 6 * s, width: 4 * s,
        height: 30 * s, background: RED, transformOrigin: "50% 100%",
        transform: `rotate(${t * 26}deg)` }} />
      {/* the beam */}
      <div style={{ position: "absolute", left: 0, top: 30 * s, width: BW, height: 18 * s,
        borderRadius: 9 * s, transformOrigin: "50% 50%", transform: `rotate(${t * 7}deg)`,
        background: `linear-gradient(180deg, ${mxh(c, 0.36)} 0%, ${dkh(c, 0.44)} 100%)` }} />
      {/* the two hangers, each hung from its own end of the beam */}
      {[-1, 1].map((sg) => {
        const ex = BW / 2 + sg * (BW / 2 - 22 * s);
        const ey = 38 * s + sg * Math.sin(t * 7 * Math.PI / 180) * (BW / 2 - 22 * s);
        return (
          <React.Fragment key={sg}>
            <div style={{ position: "absolute", left: ex - 3 * s, top: ey, width: 6 * s,
              height: 96 * s,
              background: `repeating-linear-gradient(180deg, ${dkh(c, 0.28)} 0 7px, ${dkh(c, 0.54)} 7px 14px)` }} />
            <div style={{ position: "absolute", left: ex - 74 * s, top: ey + 94 * s, width: 148 * s,
              height: 30 * s, boxShadow: SH,
              clipPath: "polygon(0% 0%, 100% 0%, 86% 100%, 14% 100%)",
              background: `linear-gradient(180deg, ${mxh(BRASS, 0.36)} 0%, ${dkh(BRASS, 0.40)} 100%)` }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* =========================================================================
   26 · THE DISPENSER — stripped to the parts that matter.

   ⛔⛔ Alex: *"make the three GitHub repo logos way bigger, and the machine more
   simplistic, but just feature the most important components here."* Two notes
   that pull the same way, because the second is what pays for the first: the
   discs could not grow while the cabinet was carrying seven boot lamps, a coin
   throat, a run counter, a hopper collar, eight bolts and a set of feet.

   ⭐ WHAT SURVIVED, and why each one has to:
     THE ROTOR   the focal point, asked for by name, and the only thing that
                 says WHAT this machine issues
     THE SOCKETS three of them, 224px each rather than 126 — the three repos are
                 the subject of the sentence
     THE MOUTH   where the crowd comes from. Without it they appear from nowhere
     TWO LEGS    so it stands on the floor rather than floating, and so the floor
                 UNDER it is free for the ten arrivals

   ⛔ WHAT WENT, and why none of it is missed:
     the coin throat  — there is no coin any more; it was vestigial
     the run counter  — TEN CLAUDES ARE THE COUNT. A numeral beside ten visible
                        things is the reel telling you what you can already see,
                        and it was the last digits left in the panel
     the boot lamps   — the rotor spinning up already says "coming to life"
     the collar, the bolts, the feet — cabinet detail on an object whose whole
                        job is to be read in 200ms
   ====================================================================== */
export const Dispenser: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  f?: number; filled?: number; lit?: number; open?: number; spin?: number; boot?: number;
  seatAt?: number[]; portOpen?: number[]; surge?: number; strain?: number; c?: string }> =
  ({ x, y, w: FW = 760, h: FH = 470, z = 36, f = 0, filled = 0, lit = 0, open = 0,
     spin = 0, boot = 1, seatAt = [], portOpen = [], surge = 0, strain = 0,
     c = "#65717E" }) => {
  /* ⭐ THE POWER SURGE. A bright bar crossing the cabinet left to right — every
     fitting asks it "how lit am I right now" by its own horizontal position, so
     the machine comes on in SEQUENCE instead of all at once. This is what fills
     0.0-0.5s, where the cabinet was previously inert behind a spinning wheel. */
  const sw = (hx: number) => Math.max(0, 1 - Math.abs((-0.26 + surge * 1.52) - hx) / 0.34) ** 0.7;
  const op = Math.max(0, Math.min(1, open));
  const bt = Math.max(0, Math.min(1, boot));
  const ROTOR = 290;
  const SOCK_W = 216, SOCK_Y = 150;   /* ⛔ MIRRORED in HookCrew — keep in sync */
  return (
    <div style={{ position: "absolute", left: x - FW / 2, top: y - FH, width: FW, height: FH,
      zIndex: z }}>
      {[0.14, 0.86].map((k, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: FW * k - 26, top: FH - 10,
          width: 52, height: 122, borderRadius: 4,
          background: `linear-gradient(96deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.54)} 100%)` }} />
      ))}
      <div style={{ position: "absolute", inset: 0, borderRadius: 12, boxShadow: SH_D,
        background: `linear-gradient(166deg, ${mxh(c, 0.26)} 0%, ${c} 38%, ${dkh(c, 0.70)} 100%)`,
        border: `5px solid #06090C` }} />

      {/* ⭐ THE SHOULDERS. A 290px wheel on a 780px face leaves two dead grey
          quarters — which is both "nothing is happening there" and the reason
          frame 0 came in under the luma bar. Two lit louvre stacks put light AND
          a moving element exactly where the dead area was.
          ⛔ mxh/dkh are hex-in/rgb-out: never nest them. */}
      {[0, 1].map((sd) => (
        <div key={"sh" + sd} style={{ position: "absolute", top: 20, width: 150, height: 172,
          left: sd ? FW - 176 : 26, borderRadius: 7, overflow: "hidden",
          background: `linear-gradient(160deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.48)} 100%)`,
          boxShadow: `inset 0 0 0 4px ${dkh(c, 0.38)}` }}>
          {Array.from({ length: 6 }).map((_, k) => {
            /* the louvres breathe with the machine, out of phase side to side */
            const br = 0.36 + 0.30 * Math.max(0, Math.sin(f * 0.20 - k * 0.5 + sd * 1.6))
                     + sw(sd ? 0.86 : 0.14) * 1.15;
            return (
              <div key={k} style={{ position: "absolute", left: 12, top: 12 + k * 26, width: 126,
                height: 17, borderRadius: 3,
                background: `linear-gradient(180deg, ${mxh(SODIUM, 0.48 + br * (0.40 + lit * 0.30))} 0%, ${dkh(c, 0.50)} 100%)`,
                boxShadow: `0 0 ${9 + br * 15}px ${hexa(SODIUM, (0.16 + lit * 0.22) * br)}` }} />
            );
          })}
        </div>
      ))}
      {/* a lit plinth band along the foot, so the cabinet sits on light instead
          of dissolving into the floor shadow */}
      <div style={{ position: "absolute", left: 8, top: FH - 44, width: FW - 16, height: 26,
        borderRadius: 4, background: `linear-gradient(180deg, ${mxh(c, 0.72)} 0%, ${mxh(c, 0.10)} 100%)` }} />
      {/* the top rail — one bright horizontal that reads the cabinet's full width */}
      <div style={{ position: "absolute", left: 14, top: 2, width: FW - 28, height: 15,
        borderRadius: 4, background: `linear-gradient(180deg, ${mxh(c, 0.84)} 0%, ${mxh(c, 0.22)} 100%)` }} />

      {/* ⭐⭐ THE ROTOR — the flywheel carrying the real Claude mark, and it SPINS.
             ⛔ A RADIALLY SYMMETRIC MARK SPINNING IS INVISIBLE: the sunburst is
             near-symmetric, so rotating it alone reads as static. The motion is
             carried by six rim bolts, eight spokes and one keyway notch.
             ⛔ AND THERE IS NO HUB CAP — a fixed centre made the rotation
             legible and sat right on the logo. The stationary reference is a
             PAWL at the rim, which ticks as each bolt passes. */}
      <div style={{ position: "absolute", left: FW / 2 - ROTOR / 2, top: -46,
        width: ROTOR, height: ROTOR }}>
        <div style={{ position: "absolute", left: -12, top: -12, width: ROTOR + 24,
          height: ROTOR + 24, borderRadius: "50%",
          background: `linear-gradient(158deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.56)} 100%)`,
          boxShadow: `inset 0 7px 15px ${hexa("#000", 0.7)}` }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
          transform: `rotate(${spin}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
            background: `linear-gradient(158deg, ${mxh(BRASS, 0.70)} 0%, ${mxh(BRASS, 0.16)} 46%, ${dkh(BRASS, 0.40)} 100%)` }} />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={"rb" + i} style={{ position: "absolute", left: ROTOR / 2 - 11, top: 12,
              width: 22, height: 22, borderRadius: 11,
              background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.60)}, ${dkh(BRASS, 0.62)})`,
              transformOrigin: `50% ${ROTOR / 2 - 12}px`, transform: `rotate(${i * 60}deg)` }} />
          ))}
          <div style={{ position: "absolute", left: ROTOR / 2 - 9, top: 2, width: 18, height: 30,
            borderRadius: 4, background: dkh(c, 0.60) }} />
          <div style={{ position: "absolute", left: 34, top: 34, width: ROTOR - 68,
            height: ROTOR - 68, borderRadius: "50%",
            background: `radial-gradient(circle at 38% 30%, #FFFCF4 0%, ${CREAMB} 66%, #D8D0BC 100%)`,
            border: `4px solid ${dkh(BRASS, 0.52)}` }} />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={"sp" + i} style={{ position: "absolute", left: ROTOR / 2 - 4, top: 40,
              width: 8, height: ROTOR / 2 - 58, background: hexa("#B4AC98", 0.50),
              transformOrigin: `50% ${ROTOR / 2 - 40}px`, transform: `rotate(${i * 45}deg)` }} />
          ))}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <Img src={staticFile("logos/claude.svg")}
              style={{ width: ROTOR * 0.54, height: ROTOR * 0.54, objectFit: "contain" }} />
          </div>
        </div>
        <div style={{ position: "absolute", left: ROTOR / 2 - 7, top: -26, width: 14, height: 40,
          borderRadius: 5, zIndex: 3, transformOrigin: "50% 0%",
          transform: `rotate(${Math.sin(spin * Math.PI / 30) * 9}deg)`,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.40)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
        <div style={{ position: "absolute", left: ROTOR / 2 - 15, top: -38, width: 30, height: 18,
          borderRadius: 4, zIndex: 3,
          background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.50)} 100%)` }} />
      </div>

      {/* ⭐ THREE ROUND SOCKETS AT 224px, empty on frame 1 — which is the before
             state the three arrivals need in order to mean anything. Round,
             because a 224px disc seats into a HOLE and not a letterbox, and
             because an empty round recess reads as "something is missing here"
             where a slot reads as a vent. */}
      {/* ⭐ THE BAYONET COLLARS GLOW. The ring is the 30px annulus left showing
          around a seated 216px disc, so it is the one piece of the machine that
          frames each logo — it idles with a slow pulse, brightens with the load,
          and FLARES on the frame its own disc locks in. */}
      {[0, 1, 2].map((i) => {
        const st = seatAt[i];
        /* the flare: full on the seating frame, gone 18 frames later */
        const flare = st != null && f >= st ? Math.max(0, 1 - (f - st) / 18) ** 1.6 : 0;
        const idle = 0.5 + 0.5 * Math.sin(f * 0.22 - i * 1.15);
        const po = portOpen[i] == null ? 1 : Math.max(0, Math.min(1, portOpen[i]));
        const g = (0.26 + lit * 0.34 + idle * 0.20) * (0.22 + po * 0.78) + flare * 1.15
                + sw(0.24 + i * 0.26) * 0.95;
        const CD = SOCK_W + 60;
        return (
          <div key={"skc" + i} style={{ position: "absolute",
            left: FW / 2 - SOCK_W * 1.5 - 22 + i * (SOCK_W + 22) - 30, top: SOCK_Y - 30,
            width: CD, height: CD, borderRadius: "50%",
            background: `linear-gradient(162deg, ${mxh(BRASS, 0.74)} 0%, ${mxh(BRASS, 0.20)} 42%, ${dkh(BRASS, 0.44)} 100%)`,
            boxShadow: `0 0 ${28 + g * 88}px ${hexa(GOLD, 0.20 + g * 0.52)}, `
              + `0 0 ${9 + g * 22}px ${hexa(SODIUM, 0.20 + g * 0.44)}, `
              + `0 5px 12px ${hexa("#000", 0.46)}` }}>
            {/* the lit inner lip — the bright edge that actually reads as "glowing" */}
            <div style={{ position: "absolute", left: 22, top: 22, width: CD - 44, height: CD - 44,
              borderRadius: "50%", border: `${5 + flare * 5}px solid ${hexa(SODIUM, 0.34 + g * 0.50)}`,
              boxShadow: `0 0 ${14 + g * 34}px ${hexa(SODIUM, 0.24 + g * 0.52)}` }} />
            {/* the flare's own expanding halo on the seating frame */}
            {flare > 0.02 && (
              <div style={{ position: "absolute", left: CD / 2 - 4, top: CD / 2 - 4, width: 8, height: 8,
                borderRadius: "50%", transform: `scale(${1 + (1 - flare) * 34})`,
                border: `2px solid ${hexa(GOLD, flare * 0.66)}`,
                boxShadow: `0 0 26px ${hexa(GOLD, flare * 0.5)}` }} />
            )}
            {Array.from({ length: 8 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: CD / 2 - 5, top: 7,
                width: 10, height: 10, borderRadius: 5,
                background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.30 + g * 0.40)}, ${dkh(BRASS, 0.54)})`,
                transformOrigin: `50% ${CD / 2 - 7}px`, transform: `rotate(${k * 45}deg)` }} />
            ))}
          </div>
        );
      })}
      {[0, 1, 2].map((i) => (
        <div key={"sk" + i} style={{ position: "absolute",
          left: FW / 2 - SOCK_W * 1.5 - 22 + i * (SOCK_W + 22), top: SOCK_Y,
          width: SOCK_W, height: SOCK_W, borderRadius: "50%", overflow: "hidden",
          background: `linear-gradient(180deg, #05080B 0%, #0A1015 34%, #1D2831 68%, #4A5964 100%)`,
          boxShadow: `inset 0 11px 22px ${hexa("#000", 0.92)}` }}>
          {/* the lit floor of the recess — light on the bottom of a hole is what
              makes it read as a hole rather than as a black disc */}
          <div style={{ position: "absolute", left: "12%", top: "62%", width: "76%", height: "30%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${hexa(SODIUM, 0.56 + lit * 0.18)} 0%, ${hexa(SODIUM, 0)} 74%)` }} />
          {/* three bayonet lugs around the inside, where the disc locks */}
          {[0, 120, 240].map((a) => (
            <div key={a} style={{ position: "absolute", left: SOCK_W / 2 - 13, top: 10,
              width: 26, height: 20, borderRadius: 4,
              transformOrigin: `50% ${SOCK_W / 2 - 10}px`, transform: `rotate(${a}deg)`,
              background: i < filled
                ? `linear-gradient(180deg, ${mxh(GREEN, 0.44)} 0%, ${dkh(GREEN, 0.30)} 100%)`
                : `linear-gradient(180deg, ${mxh(BRASS, 0.22)} 0%, ${dkh(BRASS, 0.46)} 100%)` }} />
          ))}
          {/* ⛔⛔ THE PORT IS SHUT UNTIL ITS DISC IS NEARLY HERE. Three black holes
              standing open for the whole hook read as three missing teeth — the
              recess is only meaningful in the second before something fills it.
              Closed, the port is flush cabinet metal with a seam and two dogs;
              it splits and the halves withdraw into the collar to receive. */}
          {(() => {
            const po = portOpen[i] == null ? 1 : Math.max(0, Math.min(1, portOpen[i]));
            if (po > 0.995) return null;
            return [0, 1].map((h) => (
              <div key={"pd" + h} style={{ position: "absolute", inset: 0, borderRadius: "50%",
                clipPath: h ? "inset(50% 0 0 0)" : "inset(0 0 50% 0)",
                transform: `translateY(${(h ? 1 : -1) * (SOCK_W * 0.54 * po + (1 - po) * (3.6 + strain * 9.0) * Math.sin(f * 2.35 + i * 1.9 + h * 0.9))}px) `
                  + `scale(${1 + (1 - po) * strain * 0.040})`,
                background: `linear-gradient(168deg, ${mxh(c, 0.26)} 0%, ${c} 44%, ${dkh(c, 0.58)} 100%)`,
                boxShadow: `inset 0 ${h ? -10 : 10}px 22px ${hexa("#000", 0.56)}` }}>
                {/* the parting seam, and one dog either side of it */}
                {h === 1 && <div style={{ position: "absolute", left: 0, top: SOCK_W / 2 - 5,
                  width: "100%", height: 10, background: hexa("#000", 0.72) }} />}
                {[0.26, 0.74].map((dx) => (
                  <div key={dx} style={{ position: "absolute", left: SOCK_W * dx - 14,
                    top: SOCK_W / 2 + (h ? 12 : -30), width: 28, height: 18, borderRadius: 3,
                    background: `linear-gradient(180deg, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, 0.44)} 100%)` }} />
                ))}
              </div>
            ));
          })()}
        </div>
      ))}

      {/* ⛔ NO MOUTH. The ten come out from UNDER the machine, through the gap
          between its legs — which needs no geometry at all, reads instantly, and
          hands the housing back the 120px of height a chute was costing it. All
          it needs is a flap that lifts and a lit lip along the underside. */}
      <div style={{ position: "absolute", left: FW * 0.20, top: FH - 26, width: FW * 0.60,
        height: 26 + op * 46,
        background: `linear-gradient(180deg, #171D23 0%, #020406 100%)` }} />
      <div style={{ position: "absolute", left: FW * 0.16, top: FH - 8, width: FW * 0.68,
        height: 20, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(SODIUM, 0.48 + lit * 0.34)} 0%, ${mxh(SODIUM, 0.02)} 100%)`,
        opacity: 0.40 + bt * 0.60 }} />
    </div>
  );
};
