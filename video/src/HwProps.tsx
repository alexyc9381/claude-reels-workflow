import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh, squash,
  mono, ui, R, CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE,
  TEAL, STEEL, BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./HwWorld";

/* ===========================================================================
   REEL 122 · "HARDWARE" — THE PROPS.

   ⛔⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES. A crate carries ONE bit — "there
   is a thing in it". The house bar is 12-16 drawn parts on anything the camera
   actually looks at, and "grey + rectangular" is the exact combination that
   reads as boring — either one alone survives.

   ⛔ CATEGORY IS COMMUNICATED BY STRUCTURE, NOT HUE. Before drawing anything,
   list the four or five features a viewer uses to identify it:
     a GRAPHICS CARD = a long dual-slot slab + a blower shroud with FANS + a
       PCIe bracket with DISPLAY PORTS + a POWER inlet + gold EDGE FINGERS.
     a WEIGHT       = a thick cast RIM + a stamped FACE + a HANDLE.
     an ELECTRICITY METER = a glass dome + a SPINNING DISC + cyclometer DIGITS
       + a terminal block.
   Hue is the least of them and it is usually the one a gate is riding on.
   ========================================================================= */

/* =========================================================================
   THE HERO ARTIFACT — one RTX PRO 6000.
   Seventeen drawn parts. Everything in the reel is measured against this: seven
   make the rack, one is $16,000, their fans are the 4.2 kW.
   ====================================================================== */
export const GpuCard: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  spin?: number; stamp?: string; mark?: boolean; vram?: boolean; tilt?: number;
  dim?: number }> =
  ({ x, y, s = 1, z = 50, f = 0, spin = 0, stamp, mark = true, vram = true, tilt = 0, dim = 0 }) => {
  const Wd = 430 * s, Hd = 128 * s;
  const body = dkh("#1E2228", dim * 0.4);
  const fan = (cx: number, i: number) => (
    <div key={"fn" + i} style={{ position: "absolute", left: cx - 34 * s, top: 20 * s,
      width: 68 * s, height: 68 * s, borderRadius: "50%", zIndex: 4,
      background: `radial-gradient(50% 50% at 50% 50%, ${dkh("#0A0C0F", 0)} 44%, ${dkh("#0A0C0F", 0.3)} 100%)`,
      border: `${3 * s}px solid ${dkh("#3A4048", 0.1)}` }}>
      {/* nine blades, turning — the thing that says FAN */}
      <div style={{ position: "absolute", inset: 0,
        transform: `rotate(${f * spin * (i % 2 ? 13 : 11)}deg)` }}>
        {Array.from({ length: 9 }, (_, b) => (
          <div key={b} style={{ position: "absolute", left: "50%", top: "50%",
            width: 30 * s, height: 8 * s, marginTop: -4 * s, borderRadius: 4 * s,
            transformOrigin: "0% 50%", transform: `rotate(${b * 40}deg)`,
            background: dkh("#4C535C", 0.05) }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 20 * s, height: 20 * s,
        marginLeft: -10 * s, marginTop: -10 * s, borderRadius: "50%", background: "#12161A",
        border: `${2 * s}px solid ${dkh(STEEL, 0.35)}` }} />
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd,
      zIndex: z, transform: `rotate(${tilt}deg)`, transformOrigin: "50% 100%" }}>
      {/* 1 · the PCB, visible under the shroud — green, and the one warm-cool
             contrast that says "a board" rather than "a box" */}
      <div style={{ position: "absolute", left: 0, top: 18 * s, width: Wd, height: Hd - 18 * s,
        borderRadius: 4 * s, background: dkh(PCB, 0.18 + dim * 0.3), zIndex: 1 }} />
      {/* 2 · gold edge fingers along the bottom */}
      <div style={{ position: "absolute", left: 96 * s, bottom: 0, width: 156 * s, height: 13 * s,
        zIndex: 2, display: "flex", gap: 3 * s, overflow: "hidden" }}>
        {Array.from({ length: 18 }, (_, i) => (
          <div key={i} style={{ flex: 1, background: dkh(BRASS, dim * 0.4), borderRadius: 1 }} />
        ))}
      </div>
      {/* 3 · the shroud — the mass a viewer actually reads */}
      <div style={{ position: "absolute", left: 0, top: 0, width: Wd, height: Hd - 22 * s,
        borderRadius: 5 * s, zIndex: 3,
        background: `linear-gradient(176deg, ${mxh(body, 0.13)} 0%, ${body} 46%, ${dkh(body, 0.34)} 100%)`,
        border: `${2 * s}px solid ${dkh("#0A0C10", 0.1)}` }} />
      {/* 4 · the shroud's lengthwise groove */}
      <div style={{ position: "absolute", left: 8 * s, top: 12 * s, width: Wd - 16 * s,
        height: 4 * s, zIndex: 5, background: hexa("#000000", 0.34), borderRadius: 2 }} />
      {/* 5,6 · two fans */}
      {fan(120 * s, 0)}
      {fan(258 * s, 1)}
      {/* 7 · the fin stack at the far end, where air exits */}
      <div style={{ position: "absolute", left: 330 * s, top: 16 * s, width: 74 * s,
        height: 74 * s, zIndex: 5, display: "flex", gap: 3 * s, overflow: "hidden" }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} style={{ flex: 1, background: dkh("#5A626C", 0.12 + dim * 0.3),
            borderRadius: 1 }} />
        ))}
      </div>
      {/* 8 · the 16-pin power inlet, top right — the detail that dates the card */}
      <div style={{ position: "absolute", right: 12 * s, top: -7 * s, width: 46 * s, height: 17 * s,
        zIndex: 7, borderRadius: 3 * s, background: "#14181C",
        border: `${2 * s}px solid ${dkh(STEEL, 0.42)}`, display: "flex", gap: 2 * s,
        padding: 2 * s, boxSizing: "border-box" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ flex: 1, background: dkh(BRASS, 0.34), borderRadius: 1 }} />
        ))}
      </div>
      {/* 9 · the PCIe bracket at the left edge */}
      <div style={{ position: "absolute", left: -14 * s, top: -6 * s, width: 16 * s,
        height: Hd + 6 * s, zIndex: 8, borderRadius: 2 * s,
        background: `linear-gradient(90deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.30)} 100%)` }} />
      {/* 10 · four DisplayPorts in the bracket */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"dp" + i} style={{ position: "absolute", left: -12 * s, top: (16 + i * 24) * s,
          width: 12 * s, height: 15 * s, zIndex: 9, borderRadius: 2, background: "#0A0C0E",
          border: `${1.5 * s}px solid ${dkh(STEEL, 0.5)}` }} />
      ))}
      {/* 11 · the stamped face — where a price goes. §11: a structural feature
             you have to draw anyway is free real estate for a real number. */}
      {stamp && (
        <div style={{ position: "absolute", left: 132 * s, top: 92 * s, zIndex: 12,
          padding: `${3 * s}px ${9 * s}px`, borderRadius: 3 * s,
          background: hexa("#000000", 0.30), border: `${2 * s}px solid ${hexa(GOLD, 0.85)}` }}>
          <span style={{ ...mono(21 * s, 900), color: GOLD, letterSpacing: 0.5 }}>{stamp}</span>
        </div>
      )}
      {/* 12 · the real NVIDIA mark on the shroud */}
      {mark && (
        <div style={{ position: "absolute", left: 176 * s, top: 96 * s, width: 74 * s, height: 20 * s,
          zIndex: 12, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
          <Img src={staticFile("logos/nvidia.svg")}
            style={{ width: 68 * s, height: 18 * s, objectFit: "contain" }} />
        </div>
      )}
      {/* 13 · the VRAM stamp */}
      {vram && (
        <div style={{ position: "absolute", right: 22 * s, bottom: 26 * s, zIndex: 12 }}>
          <span style={{ ...mono(15 * s, 800), color: hexa(TEAL, 0.92) }}>{R.cards.vram}</span>
        </div>
      )}
      {/* 14 · four screw points. ⛔ `Wd` is already scaled, the raw offsets are
             not — so only the raw ones get * s. */}
      {([[10 * s, 8 * s], [10 * s, 88 * s], [Wd - 22 * s, 8 * s], [Wd - 22 * s, 88 * s]] as const)
        .map(([sx, sy], i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: sx, top: sy,
          width: 7 * s, height: 7 * s, borderRadius: "50%", zIndex: 11,
          background: dkh(STEEL, 0.5) }} />
      ))}
      {/* 15 · a status LED, solid paint not a glow */}
      <div style={{ position: "absolute", right: 8 * s, top: 34 * s, width: 8 * s, height: 8 * s,
        borderRadius: "50%", zIndex: 12, background: spin > 0 ? GREEN : dkh(GREEN, 0.72) }} />
    </div>
  );
};

/** the rack the seven cards seat into. `lit` = how many are home. */
export const CardRack: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  seated: number; spin?: number; stencil?: string; hh?: number; fill?: number[] }> =
  ({ x, y, s = 1, z = 46, f = 0, seated, spin = 0, stencil, hh = 7, fill }) => {
  const slotH = 62 * s, Wd = 470 * s, Hd = slotH * hh + 34 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      {/* the cabinet shell */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s, zIndex: 1,
        background: `linear-gradient(172deg, ${dkh("#3E4854", 0.02)} 0%, ${dkh("#232A32", 0.04)} 100%)`,
        border: `${4 * s}px solid ${dkh("#141A20", 0)}` }} />
      {/* perforated intake down the left */}
      <div style={{ position: "absolute", left: 6 * s, top: 12 * s, width: 16 * s,
        height: Hd - 24 * s, zIndex: 2, display: "flex", flexDirection: "column", gap: 5 * s,
        overflow: "hidden" }}>
        {Array.from({ length: Math.round(hh * 5) }, (_, i) => (
          <div key={i} style={{ height: 4 * s, background: hexa("#000000", 0.42), borderRadius: 2 }} />
        ))}
      </div>
      {/* the slots — an EMPTY slot must read, because empty is the promise */}
      {Array.from({ length: hh }, (_, i) => {
        const home = i < seated;
        return (
          <div key={"sl" + i} style={{ position: "absolute", left: 30 * s,
            top: (17 + i * 62) * s, width: Wd - 44 * s, height: 54 * s, zIndex: 3,
            borderRadius: 3 * s,
            background: home
              ? `linear-gradient(178deg, ${dkh("#454F5C", 0)} 0%, ${dkh("#28303A", 0)} 100%)`
              : dkh("#171D24", 0),
            border: `${2 * s}px solid ${home ? dkh(STEEL, 0.52) : dkh(STEEL, 0.72)}` }}>
            {home && (<>
              {/* the seated card's fan face and its lamp */}
              <div style={{ position: "absolute", left: 12 * s, top: 8 * s, width: 38 * s,
                height: 38 * s, borderRadius: "50%", background: dkh("#1A2028", 0),
                border: `${2 * s}px solid ${dkh("#39404A", 0)}` }}>
                <div style={{ position: "absolute", inset: 0,
                  transform: `rotate(${f * spin * (9 + i * 1.7)}deg)` }}>
                  {Array.from({ length: 7 }, (_, b) => (
                    <div key={b} style={{ position: "absolute", left: "50%", top: "50%",
                      width: 17 * s, height: 5 * s, marginTop: -2.5 * s, borderRadius: 3,
                      transformOrigin: "0% 50%", transform: `rotate(${b * 51}deg)`,
                      background: dkh("#525A64", 0) }} />
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", right: 12 * s, top: 22 * s, width: 9 * s,
                height: 9 * s, borderRadius: "50%", background: TEAL }} />
              {/* ⭐ THE MEMORY LEVEL. A card is a TANK in S4 — the model is poured
                     in and each one has to be filled to the brim before the next
                     is needed, which is how "you need seven" gets SHOWN. */}
              {fill && (
                <div style={{ position: "absolute", left: 140 * s, top: 12 * s, width: 262 * s,
                  height: 30 * s, borderRadius: 3 * s, overflow: "hidden",
                  background: dkh("#0A1014", 0), border: `${2 * s}px solid ${dkh(STEEL, 0.6)}` }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
                    width: `${Math.min(1, Math.max(0, fill[i] || 0)) * 100}%`,
                    background: `linear-gradient(96deg, ${mxh(TEAL, 0.34)} 0%, ${TEAL} 70%, ${mxh(GOLD, 0.10)} 100%)`,
                    boxShadow: `0 0 ${12 * s}px ${hexa(TEAL, 0.7)}` }} />
                  {Array.from({ length: 7 }, (_, t) => (
                    <div key={"tk" + t} style={{ position: "absolute", left: `${(t + 1) * 12.5}%`,
                      top: 0, bottom: 0, width: 2 * s, background: hexa("#000", 0.34) }} />
                  ))}
                </div>
              )}
              <div style={{ position: "absolute", left: 62 * s, top: 18 * s, width: 60 * s,
                height: 16 * s, opacity: 0.75, display: "flex", alignItems: "center" }}>
                <Img src={staticFile("logos/nvidia.svg")}
                  style={{ width: 56 * s, height: 14 * s, objectFit: "contain" }} />
              </div>
            </>)}
          </div>
        );
      })}
      {/* ⛔ THE PROVENANCE STENCIL — 7 cards is the 1-BIT floor, not the full
             MXFP4 requirement, and the rail says which build at label size. */}
      {stencil && (
        <div style={{ position: "absolute", left: 32 * s, bottom: 5 * s, zIndex: 6 }}>
          <span style={{ ...mono(12 * s, 800), color: hexa(MUTE, 0.92), letterSpacing: 1.1 }}>
            {stencil}</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   S1 — THE VAULT. A door that does not open, and cast-iron WEIGHTS behind it.
   ====================================================================== */
export const VaultDoor: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  spin?: number; shove?: number }> =
  ({ x, y, s = 1, z = 40, f = 0, spin = 0, shove = 0 }) => {
  const D = 400 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D, width: D, height: D, zIndex: z,
      transform: `translateX(${shove * 4}px)` }}>
      {/* jamb */}
      <div style={{ position: "absolute", left: -18 * s, top: -18 * s, width: D + 36 * s,
        height: D + 36 * s, borderRadius: 10 * s, zIndex: 1,
        background: `linear-gradient(160deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
      {/* the slab */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, zIndex: 2,
        background: `linear-gradient(158deg, ${dkh("#3C4650", 0.02)} 0%, ${dkh("#1A2028", 0.06)} 100%)`,
        border: `${5 * s}px solid ${dkh("#0C1014", 0)}` }} />
      {/* rivets around the edge */}
      {Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return (
          <div key={"rv" + i} style={{ position: "absolute",
            left: D / 2 + Math.cos(a) * (D / 2 - 22 * s) - 6 * s,
            top: D / 2 + Math.sin(a) * (D / 2 - 22 * s) - 6 * s,
            width: 12 * s, height: 12 * s, borderRadius: "50%", zIndex: 5,
            background: `radial-gradient(50% 50% at 35% 30%, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, 0.4)} 100%)` }} />
        );
      })}
      {/* the armoured window — the WEIGHTS are visible and unreachable */}
      <div style={{ position: "absolute", left: 108 * s, top: 62 * s, width: 184 * s,
        height: 118 * s, borderRadius: 5 * s, zIndex: 6, overflow: "hidden",
        background: dkh("#0A0E14", 0), border: `${7 * s}px solid ${dkh(STEEL, 0.5)}` }}>
        <div style={{ position: "absolute", inset: 0,
          background: `radial-gradient(60% 70% at 50% 30%, ${hexa("#CFE2F2", 0.30)} 0%, ${hexa("#CFE2F2", 0)} 100%)` }} />
        {[0, 1, 2].map(i => (
          <IronWeight key={i} x={44 * s + i * 50 * s} y={104 * s} s={0.34 * s} z={4}
            t={i === 1 ? R.sealed.model : ""} />
        ))}
        {/* glazing bars — armoured, not a picture frame */}
        {[0, 1].map(i => (
          <div key={"gb" + i} style={{ position: "absolute", left: (58 + i * 58) * s, top: 0,
            width: 5 * s, height: "100%", background: hexa("#0A0E14", 0.7) }} />
        ))}
      </div>
      {/* the wheel — SPINS FREELY, which is the whole event */}
      <div style={{ position: "absolute", left: D / 2 - 78 * s, top: 208 * s, width: 156 * s,
        height: 156 * s, zIndex: 8, transform: `rotate(${spin}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
          border: `${15 * s}px solid ${dkh("#5E6874", 0.16)}` }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: 70 * s, height: 12 * s, marginTop: -6 * s, borderRadius: 6 * s,
            transformOrigin: "0% 50%", transform: `rotate(${i * 72}deg)`,
            background: dkh("#4E5866", 0.08) }} />
        ))}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 34 * s, height: 34 * s,
          marginLeft: -17 * s, marginTop: -17 * s, borderRadius: "50%",
          background: dkh("#2C343E", 0), border: `${3 * s}px solid ${dkh(STEEL, 0.3)}` }} />
      </div>
      {/* the Claude mark CAST into the slab — no chrome, it is part of the metal */}
      <div style={{ position: "absolute", left: D / 2 - 34 * s, top: 20 * s, width: 68 * s,
        height: 68 * s, zIndex: 7, opacity: 0.30 }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain",
            filter: "grayscale(1) brightness(1.6)" }} />
      </div>
      {/* ⛔ the receipt at STENCIL size — a model number, not a headline */}
      <div style={{ position: "absolute", left: 118 * s, bottom: 26 * s, zIndex: 9 }}>
        <span style={{ ...mono(13 * s, 800), color: hexa("#9FB4C6", 0.9), letterSpacing: 1.4 }}>
          {R.sealed.stencil}</span>
      </div>
    </div>
  );
};

/** cast iron: a thick rim, a stamped face, a handle. That is the category. */
export const IronWeight: React.FC<{ x: number; y: number; s?: number; z?: number; t?: string }> =
  ({ x, y, s = 1, z = 40, t }) => {
  const Wd = 120 * s, Hd = 88 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: `${10 * s}px ${10 * s}px ${4 * s}px ${4 * s}px`,
        background: `linear-gradient(170deg, ${dkh("#3A3E44", 0)} 0%, ${dkh("#171A1E", 0)} 100%)`,
        border: `${4 * s}px solid ${dkh("#0C0E11", 0)}` }} />
      {/* the handle — cut out of the top */}
      <div style={{ position: "absolute", left: Wd / 2 - 26 * s, top: 8 * s, width: 52 * s,
        height: 17 * s, borderRadius: `${9 * s}px ${9 * s}px 0 0`, background: hexa("#000000", 0.62),
        border: `${3 * s}px solid ${dkh("#4A4E56", 0.2)}`, borderBottom: "none" }} />
      {/* the stamped face */}
      <div style={{ position: "absolute", left: 12 * s, top: 34 * s, width: Wd - 24 * s,
        height: 34 * s, borderRadius: 3 * s, background: hexa("#000000", 0.26),
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {t ? <span style={{ ...mono(16 * s, 900), color: hexa("#C6CED8", 0.95) }}>{t}</span> : null}
      </div>
      {/* the cast seam */}
      <div style={{ position: "absolute", left: 0, top: Hd - 16 * s, width: Wd, height: 4 * s,
        background: hexa("#000000", 0.4) }} />
    </div>
  );
};

/* =========================================================================
   S2/S3 — THE CRATE and THE WEIGHBRIDGE
   ====================================================================== */
export const Crate: React.FC<{ x: number; y: number; s?: number; z?: number; open?: number;
  name?: string; maker?: string; stencil?: string }> =
  ({ x, y, s = 1, z = 44, open = 0, name, maker, stencil }) => {
  const Wd = 340 * s, Hd = 250 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      {/* the interior, revealed as the front drops */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s, zIndex: 1,
        background: `linear-gradient(180deg, ${dkh("#1C1408", 0)} 0%, ${dkh("#0E0A04", 0)} 100%)` }} />
      {/* the CORE inside — this crate is OPEN, which is the whole point of S2 */}
      <div style={{ position: "absolute", left: 62 * s, top: 58 * s, width: 216 * s, height: 140 * s,
        borderRadius: 5 * s, zIndex: 2, opacity: Math.min(1, open * 1.6),
        background: `linear-gradient(166deg, ${mxh(GOLD, 0.24)} 0%, ${dkh(GOLD, 0.32)} 100%)`,
        border: `${4 * s}px solid ${dkh(GOLD, 0.55)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(30 * s, 900), color: "#2A1D06" }}>{R.model.params}</span>
      </div>
      {/* boards + bands on the shell */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: 0, top: (i * 50) * s, width: Wd,
          height: 46 * s, zIndex: 4,
          background: `linear-gradient(180deg, ${mxh(OXIDE, 0.30)} 0%, ${dkh(OXIDE, 0.18)} 100%)`,
          borderBottom: `${2 * s}px solid ${dkh(OXIDE, 0.5)}` }} />
      ))}
      {[40 * s, Wd - 62 * s].map((bx, i) => (
        <div key={"bn" + i} style={{ position: "absolute", left: bx, top: 0,
          width: 22 * s, height: Hd, zIndex: 5, background: dkh(STEEL, 0.34) }} />
      ))}
      {/* THE DROP-FRONT PANEL — hinged at the bottom, this is the arrival */}
      <div style={{ position: "absolute", left: 0, top: 0, width: Wd, height: Hd, zIndex: 8,
        transformOrigin: "50% 100%", transform: `perspective(700px) rotateX(${open * 96}deg)`,
        background: `linear-gradient(180deg, ${mxh(OXIDE, 0.24)} 0%, ${dkh(OXIDE, 0.24)} 100%)`,
        border: `${5 * s}px solid ${dkh(OXIDE, 0.52)}`, borderRadius: 4 * s,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 6 * s, backfaceVisibility: "hidden" }}>
        {name && (
          <div style={{ padding: `${5 * s}px ${14 * s}px`, borderRadius: 3 * s, background: CREAMB,
            border: `${3 * s}px solid ${dkh(OXIDE, 0.4)}` }}>
            <span style={{ ...mono(27 * s, 900), color: INK }}>{name}</span>
          </div>
        )}
        {maker && <span style={{ ...mono(15 * s, 800), color: hexa(CREAMB, 0.82), letterSpacing: 2 }}>{maker}</span>}
        {stencil && <span style={{ ...mono(11 * s, 800), color: hexa(CREAMB, 0.6), letterSpacing: 1.2 }}>{stencil}</span>}
      </div>
    </div>
  );
};

/** the big industrial dial. Bone face, HARD dark segments — dark-on-dark has no
    luma delta and it looks like a motion problem when it is a value problem. */
export const DialGauge: React.FC<{ x: number; y: number; s?: number; z?: number; k: number;
  label?: string; read?: string; over?: number; c?: string; ticks?: number }> =
  ({ x, y, s = 1, z = 50, k, label, read, over = 0, c = RED, ticks = 11 }) => {
  const D = 250 * s;
  const ang = -128 + Math.min(k, 1) * 256 + over * 26;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D, zIndex: z }}>
      {/* case */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `linear-gradient(158deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.45)} 100%)` }} />
      {/* BONE face */}
      <div style={{ position: "absolute", inset: 13 * s, borderRadius: "50%", background: "#EFE9DA",
        border: `${3 * s}px solid ${dkh(STEEL, 0.55)}` }} />
      {/* hard dark segments */}
      {Array.from({ length: ticks }, (_, i) => {
        const a = -128 + (i / (ticks - 1)) * 256;
        const major = i % 2 === 0;
        return (
          <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: (major ? 26 : 15) * s, height: (major ? 6 : 4) * s,
            marginTop: (major ? -3 : -2) * s, borderRadius: 1,
            transformOrigin: `${-(D / 2 - 30 * s)}px 50%`,
            transform: `translateX(${D / 2 - 30 * s}px) rotate(${a}deg)`,
            background: i >= ticks - 3 ? c : "#241F18" }} />
        );
      })}
      {/* the END STOP — a real pin, and it BENDS when the needle overruns */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 8 * s, height: 30 * s,
        marginLeft: -4 * s, borderRadius: 4 * s, transformOrigin: "50% 0%",
        transform: `rotate(${128 + over * 20}deg) translateY(${D / 2 - 52 * s}px)`,
        background: dkh(c, 0.2) }} />
      {/* the needle */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 8 * s,
        height: D / 2 - 34 * s, marginLeft: -4 * s, borderRadius: 4 * s, transformOrigin: "50% 100%",
        transform: `rotate(${ang}deg) translateY(${-(D / 2 - 34 * s)}px)`,
        background: "#1C1814" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 24 * s, height: 24 * s,
        marginLeft: -12 * s, marginTop: -12 * s, borderRadius: "50%", background: "#1C1814" }} />
      {/* the roller readout, in the window a real gauge has */}
      {read && (
        <div style={{ position: "absolute", left: "50%", top: 148 * s, transform: "translateX(-50%)",
          padding: `${3 * s}px ${10 * s}px`, borderRadius: 3 * s, background: "#12100C",
          border: `${2 * s}px solid ${dkh(STEEL, 0.4)}` }}>
          <span style={{ ...mono(19 * s, 900), color: GOLD }}>{read}</span>
        </div>
      )}
      {label && (
        <div style={{ position: "absolute", left: "50%", top: 62 * s, transform: "translateX(-50%)" }}>
          <span style={{ ...mono(12 * s, 800), color: "#5A5347", letterSpacing: 1.4 }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   S5/S6 — THE PRICE GUN, THE TOTALISER, THE PAPER ROLL
   ====================================================================== */
export const PriceGun: React.FC<{ x: number; y: number; s?: number; z?: number; drop: number }> =
  ({ x, y, s = 1, z = 62, drop }) => (
  <div style={{ position: "absolute", left: x - 60 * s, top: y - 210 * s + drop * 150 * s,
    width: 120 * s, height: 210 * s, zIndex: z }}>
    {/* the ram */}
    <div style={{ position: "absolute", left: 44 * s, top: 0, width: 32 * s, height: 130 * s,
      background: `linear-gradient(90deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.4)} 100%)` }} />
    {/* the head */}
    <div style={{ position: "absolute", left: 0, top: 124 * s, width: 120 * s, height: 56 * s,
      borderRadius: 5 * s,
      background: `linear-gradient(172deg, ${mxh("#3E4650", 0.14)} 0%, ${dkh("#22282F", 0.1)} 100%)`,
      border: `${3 * s}px solid ${dkh("#0C1014", 0)}` }} />
    {/* the die face — the thing that leaves the mark */}
    <div style={{ position: "absolute", left: 20 * s, top: 176 * s, width: 80 * s, height: 20 * s,
      background: dkh(GOLD, 0.42), borderRadius: 2 * s }} />
    {/* two guide posts */}
    {[8, 96].map((gx, i) => (
      <div key={i} style={{ position: "absolute", left: gx * s, top: 30 * s, width: 12 * s,
        height: 100 * s, background: dkh(STEEL, 0.52), borderRadius: 3 * s }} />
    ))}
  </div>
);

/** a mechanical roll counter — each digit is its own DRUM, which is what makes
    it read as a totaliser rather than a number typeset on a card. */
export const Totaliser: React.FC<{ x: number; y: number; s?: number; z?: number; v: number;
  digits?: number; pre?: string; c?: string; roll?: boolean }> =
  ({ x, y, s = 1, z = 58, v, digits = 6, pre = "$", c = GOLD, roll = false }) => {
  const str = Math.round(v).toString().padStart(digits, "0");
  const dw = 40 * s, dh = 58 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
      alignItems: "center", gap: 2 * s, padding: `${8 * s}px ${10 * s}px`, borderRadius: 5 * s,
      background: "#0E1210", border: `${4 * s}px solid ${dkh(STEEL, 0.45)}` }}>
      {/* ⛔ the prefix sat 3px off the first drum with a 4px inter-drum gap, so
             at small scale the whole readout garbled into "$ 0 8 5". Tight. */}
      {pre ? <span style={{ ...mono(34 * s, 900), color: c, marginRight: 1 * s }}>{pre}</span> : null}
      {str.split("").map((d, i) => {
        /* ⭐ ROLLING DRUMS. A swapped glyph repaints a few strokes; a drum that
           rolls repaints its whole face every sample, which is where a racing
           number's motion actually lives. */
        const place = Math.pow(10, str.length - 1 - i);
        const frac = roll ? (v / place) - Math.floor(v / place) : 0;
        const cur = Number(d), nxt = (cur + 1) % 10;
        return (
          <div key={i} style={{ width: dw, height: dh, borderRadius: 3 * s, overflow: "hidden",
            position: "relative",
            background: `linear-gradient(180deg, ${dkh("#2A2E2C", 0)} 0%, ${mxh("#3A403C", 0.06)} 46%, ${dkh("#222624", 0)} 100%)`,
            border: `${2 * s}px solid ${dkh("#0A0C0B", 0)}` }}>
            <div style={{ position: "absolute", inset: 0, transform: `translateY(${-frac * dh}px)` }}>
              {[cur, nxt].map((n2, k) => (
                <div key={k} style={{ height: dh, display: "flex", alignItems: "center",
                  justifyContent: "center" }}>
                  <span style={{ ...mono(34 * s, 900), color: "#EFEADC" }}>{n2}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** the till roll — line items with NO numbers beside them, because the VO says
    "before you even buy a motherboard" and never prices those parts. */
export const PaperRoll: React.FC<{ x: number; y: number; s?: number; z?: number; run: number;
  items: readonly string[] }> =
  ({ x, y, s = 1, z = 54, run, items }) => {
  const Wd = 210 * s, len = run * 320 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y, width: Wd, height: len,
      zIndex: z, overflow: "hidden",
      background: `linear-gradient(180deg, ${PAPER} 0%, ${mxh(PAPER, -0.02)} 100%)`,
      borderLeft: `${2 * s}px solid ${hexa("#000", 0.12)}`,
      borderRight: `${2 * s}px solid ${hexa("#000", 0.12)}` }}>
      {items.map((t, i) => (
        <div key={i} style={{ position: "absolute", left: 14 * s, top: (16 + i * 46) * s,
          width: Wd - 28 * s, display: "flex", justifyContent: "space-between",
          opacity: len > (26 + i * 46) * s ? 1 : 0 }}>
          <span style={{ ...mono(16 * s, 800), color: "#2A2620" }}>{t}</span>
          <span style={{ ...mono(16 * s, 800), color: "#8C877D" }}>· · ·</span>
        </div>
      ))}
      {/* the perforated tear edge */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: Wd, height: 7 * s,
        background: `repeating-linear-gradient(90deg, ${hexa("#000", 0.22)} 0 ${5 * s}px, transparent ${5 * s}px ${11 * s}px)` }} />
    </div>
  );
};

export const Motherboard: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 52 }) => {
  const Wd = 230 * s, Hd = 175 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s,
        background: `linear-gradient(160deg, ${mxh(PCB, 0.08)} 0%, ${dkh(PCB, 0.28)} 100%)`,
        border: `${2 * s}px solid ${dkh(PCB, 0.5)}` }} />
      {/* socket */}
      <div style={{ position: "absolute", left: 26 * s, top: 24 * s, width: 74 * s, height: 74 * s,
        background: dkh("#2A2E33", 0), border: `${4 * s}px solid ${dkh(STEEL, 0.3)}`, borderRadius: 3 * s }} />
      {/* DIMM slots */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"dm" + i} style={{ position: "absolute", left: (122 + i * 17) * s, top: 20 * s,
          width: 9 * s, height: 96 * s, background: dkh("#12161A", 0), borderRadius: 2 }} />
      ))}
      {/* PCIe slots */}
      {Array.from({ length: 3 }, (_, i) => (
        <div key={"pe" + i} style={{ position: "absolute", left: 22 * s, top: (112 + i * 19) * s,
          width: 150 * s, height: 11 * s, background: dkh(BRASS, 0.5), borderRadius: 2 }} />
      ))}
      {/* caps and a heatsink — the bits that say BOARD */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"cp" + i} style={{ position: "absolute", left: (112 + (i % 4) * 15) * s,
          top: (126 + Math.floor(i / 4) * 18) * s, width: 11 * s, height: 15 * s,
          borderRadius: 2, background: dkh(STEEL, 0.2) }} />
      ))}
      <div style={{ position: "absolute", right: 14 * s, top: 22 * s, width: 44 * s, height: 44 * s,
        background: `repeating-linear-gradient(90deg, ${dkh(STEEL, 0.14)} 0 ${4 * s}px, ${dkh(STEEL, 0.44)} ${4 * s}px ${8 * s}px)` }} />
    </div>
  );
};

/* =========================================================================
   S7/S8 — THE ELECTRICITY METER, THE BUS BAR, THE MONTH BAND
   ====================================================================== */
export const PowerMeter: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  spin: number; v: number; unit?: string; src?: string }> =
  ({ x, y, s = 1, z = 54, f = 0, spin, v, unit, src }) => {
  const Wd = 250 * s, Hd = 320 * s;
  const str = Math.round(v).toString().padStart(5, "0");
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      {/* the backplate */}
      <div style={{ position: "absolute", inset: 0, borderRadius: `${16 * s}px ${16 * s}px ${5 * s}px ${5 * s}px`,
        background: `linear-gradient(168deg, ${mxh("#5A5245", 0.28)} 0%, ${dkh("#3A342A", 0.1)} 100%)`,
        border: `${4 * s}px solid ${dkh("#1E1A14", 0)}` }} />
      {/* the glass dome */}
      <div style={{ position: "absolute", left: 22 * s, top: 20 * s, width: Wd - 44 * s,
        height: 152 * s, borderRadius: `${Wd / 2}px ${Wd / 2}px ${8 * s}px ${8 * s}px`,
        background: `linear-gradient(158deg, ${hexa("#E8F0F4", 0.26)} 0%, ${hexa("#8FA0AC", 0.14)} 100%)`,
        border: `${3 * s}px solid ${hexa("#C8D4DC", 0.5)}`, overflow: "hidden" }}>
        {/* THE SPINNING DISC — the one part that says "electricity meter" */}
        <div style={{ position: "absolute", left: "50%", top: 74 * s, width: 132 * s, height: 26 * s,
          marginLeft: -66 * s, borderRadius: "50%", background: dkh("#7A6A4E", 0.06),
          border: `${2 * s}px solid ${dkh("#3A3226", 0.1)}`, overflow: "hidden" }}>
          {Array.from({ length: 8 }, (_, i) => {
            const p = ((i / 8) + (f * spin * 0.02)) % 1;
            return (
              <div key={"ds" + i} style={{ position: "absolute", left: `${p * 100}%`, top: 0,
                width: 9 * s, height: "100%", background: hexa("#1A150C", 0.62) }} />
            );
          })}
          {/* the red index mark a real disc has */}
          <div style={{ position: "absolute",
            left: `${(((f * spin * 0.02) % 1) + 1) % 1 * 100}%`, top: 0, width: 6 * s,
            height: "100%", background: RED }} />
        </div>
        {/* the cyclometer digits */}
        <div style={{ position: "absolute", left: "50%", top: 22 * s, transform: "translateX(-50%)",
          display: "flex", gap: 3 * s }}>
          {str.split("").map((d, i) => (
            <div key={i} style={{ width: 24 * s, height: 34 * s, borderRadius: 2 * s,
              background: i === 4 ? "#B02A1E" : "#15130F",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(21 * s, 900), color: "#EFE8D8" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
      {/* the terminal block */}
      <div style={{ position: "absolute", left: 34 * s, bottom: 40 * s, width: Wd - 68 * s,
        height: 44 * s, borderRadius: 4 * s, background: dkh("#241F18", 0),
        display: "flex", alignItems: "center", justifyContent: "space-around", padding: 6 * s }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ width: 18 * s, height: 26 * s, borderRadius: 2 * s,
            background: dkh(BRASS, 0.24) }} />
        ))}
      </div>
      {unit && (
        <div style={{ position: "absolute", left: "50%", bottom: 16 * s, transform: "translateX(-50%)" }}>
          <span style={{ ...mono(14 * s, 900), color: hexa("#E8DCC0", 0.9), letterSpacing: 1.6 }}>{unit}</span>
        </div>
      )}
      {src && (
        <div style={{ position: "absolute", left: "50%", top: Hd + 8 * s, transform: "translateX(-50%)",
          whiteSpace: "nowrap" }}>
          <span style={{ ...mono(12 * s, 800), color: hexa("#C9BFA8", 0.72), letterSpacing: 1 }}>{src}</span>
        </div>
      )}
    </div>
  );
};

/** the bus bar that GLOWS AND SAGS under 4.2 kW. Sag is the weight cue. */
export const BusBar: React.FC<{ x: number; y: number; w: number; s?: number; z?: number;
  load: number }> = ({ x, y, w: ww, s = 1, z = 40, load }) => {
  const sag = load * 26 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - 20 * s, width: ww, height: 60 * s, zIndex: z }}>
      <svg width={ww} height={60 * s} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d={`M 0 ${16 * s} Q ${ww / 2} ${16 * s + sag * 2} ${ww} ${16 * s}`}
          stroke={dkh("#0A0C0E", 0)} strokeWidth={22 * s} fill="none" strokeLinecap="round" />
        <path d={`M 0 ${16 * s} Q ${ww / 2} ${16 * s + sag * 2} ${ww} ${16 * s}`}
          stroke={load > 0.5 ? "#E2703A" : COPPER} strokeWidth={14 * s} fill="none" strokeLinecap="round" />
        {load > 0.7 && (
          <path d={`M 0 ${16 * s} Q ${ww / 2} ${16 * s + sag * 2} ${ww} ${16 * s}`}
            stroke={hexa("#FFD08A", (load - 0.7) * 2.4)} strokeWidth={6 * s} fill="none" strokeLinecap="round" />
        )}
      </svg>
      {/* the two insulators it hangs from — a bar with no supports is a line */}
      {[0, ww - 26 * s].map((ix, i) => (
        <div key={i} style={{ position: "absolute", left: ix, top: -8 * s, width: 26 * s,
          height: 44 * s, zIndex: 3, borderRadius: 4 * s,
          background: `repeating-linear-gradient(180deg, ${dkh("#6E5A3E", 0.1)} 0 ${7 * s}px, ${dkh("#4A3C28", 0.1)} ${7 * s}px ${14 * s}px)` }} />
      ))}
    </div>
  );
};

/** ⭐ THE MONTH, as a full-width high-contrast travelling band — §1's highest
    value shape. Thirty day-plates, light against shadow, feathered. */
export const DayBand: React.FC<{ y: number; f: number; s?: number; z?: number; rate?: number;
  n?: number }> = ({ y, f, s = 1, z = 30, rate = 5.4, n = 30 }) => {
  const pitch = 118 * s, span = pitch * n;
  return (
    <>{Array.from({ length: n }, (_, i) => {
      const x = ((i * pitch - f * rate) % span + span) % span - 160;
      const dk = i % 2 === 1;
      return (
        <div key={"dy" + i} style={{ position: "absolute", left: x, top: y, width: 92 * s,
          height: 62 * s, zIndex: z, borderRadius: 4 * s,
          background: dk ? dkh("#0B1020", 0) : mxh("#C6B48A", 0.10),
          border: `${2 * s}px solid ${dk ? hexa("#000", 0.5) : hexa("#F0E4C4", 0.34)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(23 * s, 900), color: dk ? hexa("#8FA0C0", 0.85) : "#241E12" }}>
            {i + 1}</span>
        </div>
      );
    })}</>
  );
};

/* =========================================================================
   S10-S12 — THE RENTED HALL, THE DRIP, AND THE VILLAIN
   ====================================================================== */
export const ServerBox: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  label?: string; util?: number }> =
  ({ x, y, s = 1, z = 40, f = 0, label, util = 0.01 }) => {
  const Wd = 168 * s, Hd = 300 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s,
        background: `linear-gradient(170deg, ${dkh("#1E2830", 0)} 0%, ${dkh("#0E141A", 0)} 100%)`,
        border: `${3 * s}px solid ${dkh("#070A0E", 0)}` }} />
      {/* the drive bays */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"bz" + i} style={{ position: "absolute", left: 12 * s, top: (14 + i * 30) * s,
          width: Wd - 24 * s, height: 22 * s, borderRadius: 2 * s, background: dkh("#28323C", 0),
          border: `${1.5 * s}px solid ${dkh("#0A0E12", 0)}`,
          display: "flex", alignItems: "center", paddingLeft: 8 * s }}>
          {/* an activity lamp that is almost never on — 1% utilisation, drawn */}
          <div style={{ width: 7 * s, height: 7 * s, borderRadius: "50%",
            background: ((f * 0.6 + i * 7) % 90) < 90 * util ? TEAL : dkh(TEAL, 0.82) }} />
        </div>
      ))}
      {label && (
        <div style={{ position: "absolute", left: "50%", bottom: 6 * s, transform: "translateX(-50%)",
          whiteSpace: "nowrap" }}>
          <span style={{ ...mono(11 * s, 800), color: hexa(TEAL, 0.7), letterSpacing: 1 }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/** the spout, the forming bead, and the cup. The drip IS the scene's clock. */
export const Drip: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  period?: number; fall?: number; caught?: number }> =
  ({ x, y, f, s = 1, z = 60, period = 60, fall = 240, caught = 0 }) => {
  const t = (f % period) / period;
  const grow = Math.min(1, t / 0.72);
  const dropK = t > 0.72 ? (t - 0.72) / 0.28 : 0;
  const r = (7 + grow * 13) * s;
  return (
    <>
      {/* the spout */}
      <div style={{ position: "absolute", left: x - 30 * s, top: y - 54 * s, width: 60 * s,
        height: 54 * s, zIndex: z, borderRadius: `${6 * s}px ${6 * s}px ${22 * s}px ${22 * s}px`,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      {/* the bead, forming then falling */}
      <div style={{ position: "absolute", left: x - r, top: y + dropK * fall * s - r,
        width: r * 2, height: r * 2.2, borderRadius: "50%", zIndex: z + 1,
        background: `radial-gradient(50% 40% at 40% 30%, ${mxh(GOLD, 0.4)} 0%, ${GOLD} 60%, ${dkh(GOLD, 0.3)} 100%)` }} />
      {/* the cup, and what has actually accumulated in it — almost nothing */}
      <div style={{ position: "absolute", left: x - 52 * s, top: y + fall * s - 6 * s,
        width: 104 * s, height: 92 * s, zIndex: z, borderRadius: `${6 * s}px ${6 * s}px ${30 * s}px ${30 * s}px`,
        background: `linear-gradient(170deg, ${mxh("#3A424A", 0.2)} 0%, ${dkh("#20262C", 0)} 100%)`,
        border: `${4 * s}px solid ${dkh("#0C1014", 0)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%",
          height: Math.min(24, 3 + caught * 3) * s, background: dkh(GOLD, 0.16) }} />
      </div>
    </>
  );
};

/** ⛔⛔⛔ THE VILLAIN — and the FIRST version of it did not read at all.
    Round 1 drew a constant-bore tube and it rendered as a grey RAIL with three
    dots on it: nothing in the frame said "narrow", because narrow is only
    meaningful RELATIVE to something wide.

    ⭐⭐⭐ A BOTTLENECK IS A REDUCER. The element that carries the whole idea is
    the TAPER — a wide mouth collapsing to a thin bore, in one object, so the
    eye measures one against the other without being told. `mouth` is the wide
    end, `bore` is what actually gets through, and the reducer between them is
    drawn explicitly rather than implied by two separate props.
    ⛔ AND IT HAS TO TOUCH WHAT IT SERVES. Round 1's silo, pipe and output tray
    were three objects that never met, so there was no mechanism on screen —
    only three props in a row. */
export const Pipe: React.FC<{ x: number; y: number; w: number; f: number; s?: number; z?: number;
  bore?: number; mouth?: number; flow?: number; beads?: number; taper?: number;
  c?: string }> =
  ({ x, y, w: ww, f, s = 1, z = 34, bore = 26, mouth, flow = 1, beads = 4,
     taper = 0.22, c = SLATE }) => {
  const B = bore * s, M = (mouth ?? bore) * s;
  const tw = ww * taper;                      /* the reducer's own length */
  const rest = ww - tw;
  return (
    <>
      {/* ── THE WIDE MOUTH — what the store can deliver ── */}
      {M > B && (
        <div style={{ position: "absolute", left: x, top: y - M / 2 - 10 * s, width: tw * 0.34,
          height: M + 20 * s, zIndex: z, borderRadius: 6 * s,
          background: `linear-gradient(180deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.46)} 100%)` }} />
      )}
      {/* ── THE REDUCER — the object that IS the bottleneck ── */}
      {M > B && (
        <svg width={tw} height={M + 24 * s} style={{ position: "absolute", left: x + tw * 0.30,
          top: y - M / 2 - 12 * s, zIndex: z, overflow: "visible" }}>
          <polygon
            points={`0,${12 * s} ${tw * 0.7},${(M - B) / 2 + 12 * s} ${tw * 0.7},${(M + B) / 2 + 12 * s} 0,${M + 12 * s}`}
            fill={dkh(c, 0.30)} stroke={dkh("#0A0810", 0)} strokeWidth={3 * s} />
          <polygon
            points={`0,${12 * s} ${tw * 0.7},${(M - B) / 2 + 12 * s} ${tw * 0.7},${(M - B) / 2 + 20 * s} 0,${26 * s}`}
            fill={mxh(c, 0.16)} />
        </svg>
      )}
      {/* the casing on the thin run — thick walls, so the BORE reads small */}
      <div style={{ position: "absolute", left: x + (M > B ? tw : 0), top: y - B / 2 - 11 * s,
        width: M > B ? rest : ww, height: B + 22 * s, zIndex: z, borderRadius: B,
        background: `linear-gradient(180deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.44)} 100%)` }} />
      {/* the bore itself, and the single file crawling down it */}
      <div style={{ position: "absolute", left: x + (M > B ? tw : 0), top: y - B / 2,
        width: M > B ? rest : ww, height: B, zIndex: z + 1,
        background: dkh("#0A0810", 0), overflow: "hidden" }}>
        {Array.from({ length: beads }, (_, i) => {
          const p = (((i / beads) + f * 0.0038 * flow) % 1);
          return (
            <div key={"bd" + i} style={{ position: "absolute", left: `${p * 100}%`,
              top: "50%", width: B * 0.62, height: B * 0.62,
              marginTop: -B * 0.31, borderRadius: "50%", background: GOLD }} />
          );
        })}
      </div>
      {/* ⭐ the CROWD that cannot get in — the queue backed up at the mouth is
             what makes the reducer read as a restriction rather than a shape */}
      {M > B && Array.from({ length: 7 }, (_, i) => {
        const jitter = Math.sin(f / 6 + i * 1.7) * 3 * s;
        return (
          <div key={"qz" + i} style={{ position: "absolute",
            left: x - (18 + (i % 4) * 26) * s, top: y - M / 2 + 10 * s + (i % 3) * (M / 3.4) + jitter,
            width: B * 0.6, height: B * 0.6, borderRadius: "50%", zIndex: z + 2,
            background: dkh(GOLD, 0.18) }} />
        );
      })}
      {/* flanges — a pipe with no joints is a bar */}
      {[0, ww - 20 * s].map((fx, i) => (
        <div key={"fg" + i} style={{ position: "absolute", left: x + fx, top: y - B / 2 - 19 * s,
          width: 20 * s, height: B + 38 * s, zIndex: z + 3, borderRadius: 3 * s,
          background: dkh(c, 0.24), border: `${2 * s}px solid ${dkh("#0A0810", 0)}` }} />
      ))}
    </>
  );
};

/** THE MEMORY STORE — and round 1's version failed the one job it has.
    ⛔ It was an opaque grey barrel with a purple SIGHT STRIP, and a strip reads
    as decoration: nothing said FULL. "Enough memory" is half of the sentence
    S12 exists to draw, so if the store does not read as generously full, the
    scene has no contrast in it at all.
    ⭐ THE FIX IS TO MAKE THE VESSEL ITSELF THE WINDOW: a glass body with the
    contents visibly stacked to the top, individual blocks you can count, a
    level line at the fill, and a wide OUTLET at the base that the pipe bolts
    onto — so the store and the restriction are one connected object. */
export const Silo: React.FC<{ x: number; y: number; s?: number; z?: number; label?: string;
  fill?: number; f?: number }> = ({ x, y, s = 1, z = 38, label, fill = 0.94, f = 0 }) => {
  const Wd = 300 * s, Hd = 420 * s;
  const inner = Wd - 26 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      {/* the glass body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: `${Wd / 2.4}px ${Wd / 2.4}px ${10 * s}px ${10 * s}px`,
        background: `linear-gradient(96deg, ${hexa("#0A0810", 0.62)} 0%, ${hexa("#C9B6E8", 0.16)} 40%, ${hexa("#0A0810", 0.5)} 100%)`,
        border: `${7 * s}px solid ${dkh(SLATE, 0.28)}`, overflow: "hidden" }}>
        {/* ⭐ THE CONTENTS, COUNTABLE — 44 stacked blocks filling it to the top.
               A quantity you can count is the only kind a viewer believes. */}
        {Array.from({ length: 44 }, (_, i) => {
          const row = Math.floor(i / 4), col = i % 4;
          const rows = 11;
          const yy = Hd - 26 * s - row * (Hd * 0.072);
          if (row / rows > fill) return null;
          return (
            <div key={"bk" + i} style={{ position: "absolute",
              left: 12 * s + col * (inner / 4) + ((row % 2) * inner / 8) % (inner / 4),
              top: yy, width: inner / 4 - 6 * s, height: Hd * 0.058, borderRadius: 3 * s,
              background: row % 3 === 0 ? mxh(VIOLET, 0.30) : row % 3 === 1 ? mxh(VIOLET, 0.16) : dkh(VIOLET, 0.06) }} />
          );
        })}
        {/* the level line, with its own tick — it is FULL and it stays full */}
        <div style={{ position: "absolute", left: 0, top: Hd * (1 - fill) - 4 * s, width: "100%",
          height: 5 * s, background: hexa("#F0E4FF", 0.7) }} />
        {/* the vessel's own highlight, so it reads as glass not as a hole */}
        <div style={{ position: "absolute", left: Wd * 0.10, top: Hd * 0.10, width: Wd * 0.11,
          height: Hd * 0.68, borderRadius: Wd * 0.06, background: hexa("#FFFFFF", 0.12) }} />
      </div>
      {/* hoop bands OUTSIDE the glass */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"hp" + i} style={{ position: "absolute", left: -5 * s, top: (96 + i * 82) * s,
          width: Wd + 10 * s, height: 12 * s, zIndex: 3, borderRadius: 3 * s,
          background: dkh(SLATE, 0.34) }} />
      ))}
      {/* ⭐ THE OUTLET — a WIDE mouth at the base. This is what the reducer
             narrows down from, and it is why the bottleneck reads. */}
      <div style={{ position: "absolute", left: Wd - 18 * s, top: Hd - 132 * s, width: 44 * s,
        height: 104 * s, zIndex: 4, borderRadius: `0 ${8 * s}px ${8 * s}px 0`,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.18)} 0%, ${dkh(SLATE, 0.44)} 100%)` }} />
      {/* the legs */}
      {[16 * s, Wd - 34 * s].map((lx, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: lx, top: Hd - 6 * s,
          width: 22 * s, height: 30 * s, background: dkh(SLATE, 0.5), zIndex: 2 }} />
      ))}
      {label && (
        <div style={{ position: "absolute", left: "50%", top: -34 * s, transform: "translateX(-50%)",
          whiteSpace: "nowrap", padding: `${4 * s}px ${11 * s}px`, borderRadius: 4 * s,
          background: CREAMB, zIndex: 6 }}>
          <span style={{ ...mono(17 * s, 900), color: INK, letterSpacing: 1 }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/** ⛔ S0's whole gag. Round 1 mounted a hole at panel y=0 — i.e. BEHIND the
    header pill and above everything the viewer can see — so the reel opened on
    "a server rack in a beige room" and the word the script turns on, LOCALLY,
    was nowhere on screen.
    ⭐ The fix is to draw the CEILING as a real plane the room hangs from, low
    enough to be inside the frame, and to break it: a ragged edge, snapped
    joists with splinters, a torn lath, and daylight falling through. The rack
    passes THROUGH it, and it is the ceiling that makes the rack read as too
    big rather than merely close to camera. */
export const BrokenCeiling: React.FC<{ y: number; holeX: number; holeW: number; f: number;
  z?: number; c: string; lit: string }> = ({ y, holeX, holeW, f, z = 24, c, lit }) => (
  <>
    {/* the ceiling plane, left and right of the hole */}
    {[[0, holeX - holeW / 2] as const, [holeX + holeW / 2, W] as const].map(([x0, x1], i) => (
      <div key={"cl" + i} style={{ position: "absolute", left: x0, top: 0, width: Math.max(0, x1 - x0),
        height: y, zIndex: z,
        background: `linear-gradient(180deg, ${dkh(c, 0.30)} 0%, ${mxh(c, 0.12)} 100%)`,
        borderBottom: `7px solid ${dkh(c, 0.44)}` }}>
        {/* the ragged tear along the broken edge */}
        <div style={{ position: "absolute", [i ? "left" : "right"]: 0, bottom: -6, width: 90,
          height: 46, background: mxh(c, 0.12),
          clipPath: i ? "polygon(0 0, 100% 0, 88% 46%, 62% 12%, 40% 62%, 18% 22%, 0 74%)"
                      : "polygon(0 0, 100% 0, 100% 74%, 82% 22%, 60% 62%, 38% 12%, 12% 46%)",
        } as React.CSSProperties} />
      </div>
    ))}
    {/* ⭐⭐ HIERARCHY IS THE SPREAD, NOT THE MEAN — and that is what rescues the
           ceiling from the frame-0 luma bar. A dark ceiling read instantly and
           dragged HOOK_LUMA to 101; a light one passed the bar and vanished. The
           answer is neither fill: a LIGHT plane with a HARD dark edge under it
           costs almost nothing in mean luma and reads as a ceiling immediately,
           because what the eye uses is the boundary, not the field. */}
    {[[0, holeX - holeW / 2] as const, [holeX + holeW / 2, W] as const].map(([x0, x1], i) => (
      <React.Fragment key={"cv" + i}>
        {/* the coving */}
        <div style={{ position: "absolute", left: x0, top: y - 20, width: Math.max(0, x1 - x0),
          height: 20, zIndex: z + 1, background: mxh(c, 0.30) }} />
        {/* the shadow it throws down the wall — the hard edge that does the work */}
        <div style={{ position: "absolute", left: x0, top: y, width: Math.max(0, x1 - x0),
          height: 26, zIndex: z + 1,
          background: `linear-gradient(180deg, ${hexa("#000000", 0.46)} 0%, ${hexa("#000000", 0)} 100%)` }} />
        {/* and the broken edge gets its own dark lip, so the TEAR reads too */}
        <div style={{ position: "absolute", [i ? "left" : "right"]: i ? x0 : W - x1, top: 0,
          width: 13, height: y + 8, zIndex: z + 2, background: hexa("#000000", 0.42) } as React.CSSProperties} />
      </React.Fragment>
    ))}
    {/* snapped joists across the opening, with splinters */}
    {[-0.30, -0.02, 0.28].map((k, i) => (
      <React.Fragment key={"js" + i}>
        <div style={{ position: "absolute", left: holeX + k * holeW, top: y - 30,
          width: 34, height: 96, zIndex: z + 3, background: mxh("#7A6242", 0.06),
          borderLeft: "4px solid rgba(0,0,0,0.34)",
          transform: `rotate(${(i - 1) * 15 + Math.sin(f / 34 + i) * 1.2}deg)`,
          transformOrigin: "50% 0%", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: holeX + k * holeW + 6, top: y + 56,
          width: 16, height: 40, zIndex: z + 3, background: dkh("#7A6242", 0.2),
          clipPath: "polygon(0 0, 100% 0, 62% 100%, 30% 44%)" }} />
      </React.Fragment>
    ))}
    {/* the shaft of daylight coming DOWN through the hole */}
    <div style={{ position: "absolute", left: holeX - holeW * 0.66, top: y + 10,
      width: holeW * 1.32, height: 560, zIndex: z + 2, opacity: 0.56,
      background: `linear-gradient(180deg, ${hexa(lit, 0.80)} 0%, ${hexa(lit, 0)} 100%)`,
      clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)" }} />
  </>
);

/** the hand pump he cranks and cranks. ⛔ It never improves. */
export const HandPump: React.FC<{ x: number; y: number; s?: number; z?: number; crank: number }> =
  ({ x, y, s = 1, z = 52, crank }) => (
  <div style={{ position: "absolute", left: x - 60 * s, top: y - 176 * s, width: 120 * s,
    height: 176 * s, zIndex: z }}>
    {/* the body */}
    <div style={{ position: "absolute", left: 30 * s, top: 62 * s, width: 60 * s, height: 114 * s,
      borderRadius: `${8 * s}px ${8 * s}px 0 0`,
      background: `linear-gradient(90deg, ${mxh(BRASS, 0.1)} 0%, ${dkh(BRASS, 0.36)} 100%)`,
      border: `${3 * s}px solid ${dkh("#2A1E0C", 0)}` }} />
    {/* the pivot */}
    <div style={{ position: "absolute", left: 48 * s, top: 52 * s, width: 24 * s, height: 24 * s,
      borderRadius: "50%", background: dkh(BRASS, 0.5), zIndex: 3 }} />
    {/* the LEVER, swinging — the distance is the action */}
    <div style={{ position: "absolute", left: 60 * s, top: 62 * s, width: 108 * s, height: 15 * s,
      marginTop: -7 * s, borderRadius: 8 * s, transformOrigin: "0% 50%", zIndex: 4,
      transform: `rotate(${-34 + crank * 60}deg)`,
      background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.4)} 100%)` }}>
      <div style={{ position: "absolute", right: -9 * s, top: -7 * s, width: 30 * s, height: 30 * s,
        borderRadius: "50%", background: dkh("#3E2A16", 0) }} />
    </div>
    {/* the outlet */}
    <div style={{ position: "absolute", left: 8 * s, top: 96 * s, width: 34 * s, height: 20 * s,
      borderRadius: `${8 * s}px 0 0 ${8 * s}px`, background: dkh(BRASS, 0.44), zIndex: 2 }} />
  </div>
);

/* =========================================================================
   S13/S18 — THE LAPTOP, THE RECEIPT, THE STRUCK PLATE
   ====================================================================== */
export const Laptop: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  open?: number; rush?: number; fill?: number }> =
  ({ x, y, s = 1, z = 52, f = 0, open = 1, rush = 0, fill }) => {
  const Wd = 260 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - 190 * s, width: Wd,
      height: 190 * s, zIndex: z }}>
      {/* the lid */}
      <div style={{ position: "absolute", left: 12 * s, bottom: 22 * s, width: Wd - 24 * s,
        height: 156 * s, transformOrigin: "50% 100%",
        transform: `perspective(800px) rotateX(${(1 - open) * 82}deg)`,
        borderRadius: `${7 * s}px ${7 * s}px 0 0`, background: dkh("#2A2E34", 0),
        border: `${4 * s}px solid ${dkh("#14181C", 0)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 5 * s, borderRadius: 3 * s, background: "#0D1420",
          overflow: "hidden" }}>
          {/* ⛔⛔ THESE SCROLLED ON A `% 170` CYCLE, WHICH IS A LOOP. Eleven bars
                 sliding round forever looks like work and accumulates nothing —
                 the screen at t+2s is the screen at t. With `fill` the output
                 BUILDS instead: a line lands, and stays, and the panel fills up
                 over the shot, which is a thing a viewer can watch finish.
                 See memory: feedback_motion_needs_a_destination. */}
          {Array.from({ length: 11 }, (_, i) => {
            const acc = fill !== undefined;
            const shown = acc ? Math.min(1, Math.max(0, fill * 11 - i)) : 1;
            if (shown <= 0) return null;
            const p = acc ? 6 + i * 15 : ((i * 15 + f * (1.6 + rush * 7)) % 170);
            return (
              <div key={"ln" + i} style={{ position: "absolute", left: 9 * s, top: p * s,
                width: (34 + rnd(i, 61) * 96) * s * (acc ? Math.min(1, shown * 1.6) : 1),
                height: 7 * s, borderRadius: 2, opacity: acc ? Math.min(1, shown * 2.4) : 1,
                background: i % 4 === 0 ? hexa(CLAY, 0.9) : hexa("#7FD4C4", 0.62) }} />
            );
          })}
          {/* the caret, sitting at the end of whatever has landed so far */}
          {fill !== undefined && (
            <div style={{ position: "absolute", left: 9 * s, top: (6 + Math.min(10, Math.floor(fill * 11)) * 15) * s,
              width: 9 * s, height: 7 * s, borderRadius: 1,
              opacity: Math.sin(f / 3.4) > 0 ? 0.95 : 0.15, background: hexa("#7FD4C4", 0.95) }} />
          )}
        </div>
      </div>
      {/* the base */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: Wd, height: 26 * s,
        borderRadius: `${4 * s}px ${4 * s}px ${9 * s}px ${9 * s}px`,
        background: `linear-gradient(180deg, ${mxh("#3A4048", 0.2)} 0%, ${dkh("#22272D", 0)} 100%)` }} />
      <div style={{ position: "absolute", left: Wd / 2 - 30 * s, bottom: 6 * s, width: 60 * s,
        height: 5 * s, borderRadius: 3, background: dkh("#14181C", 0) }} />
    </div>
  );
};

export const Receipt: React.FC<{ x: number; y: number; s?: number; z?: number; t: string;
  sub?: string; stencil?: string; rot?: number }> =
  ({ x, y, s = 1, z = 70, t, sub, stencil, rot = -3 }) => (
  <div style={{ position: "absolute", left: x - 118 * s, top: y - 132 * s, width: 236 * s,
    zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%",
    background: PAPER, borderRadius: 2 * s, padding: `${14 * s}px ${12 * s}px ${18 * s}px`,
    boxShadow: SH }}>
    <div style={{ height: 6 * s, marginBottom: 10 * s,
      background: `repeating-linear-gradient(90deg, ${hexa("#000", 0.2)} 0 ${5 * s}px, transparent ${5 * s}px ${11 * s}px)` }} />
    {sub && <div style={{ textAlign: "center", marginBottom: 4 * s }}>
      <span style={{ ...mono(14 * s, 800), color: "#8C877D", letterSpacing: 1.6 }}>{sub}</span></div>}
    <div style={{ textAlign: "center" }}>
      <span style={{ ...mono(52 * s, 900), color: INK }}>{t}</span>
    </div>
    {stencil && <div style={{ textAlign: "center", marginTop: 7 * s }}>
      <span style={{ ...mono(11 * s, 800), color: "#9A968B", letterSpacing: 0.7 }}>{stencil}</span></div>}
  </div>
);

/** ⛔ THE PLATE IS STRUCK THROUGH AND NOTHING GOES BACK. The VO names no
    depreciation rate, so the picture shows value being TAKEN AWAY and never
    asserts a figure. `strikes` is how many bars have landed. */
export const StrikePlate: React.FC<{ x: number; y: number; s?: number; z?: number; v: string;
  strikes: number; land?: number }> =
  ({ x, y, s = 1, z = 68, v, strikes, land = 1 }) => {
  const Wd = 340 * s, Hd = 116 * s;
  return (
    <div style={{ position: "absolute", left: x - Wd / 2, top: y - Hd, width: Wd, height: Hd, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s, background: CREAMB,
        border: `${5 * s}px solid ${dkh(INK, 0)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(52 * s, 900), color: INK }}>{v}</span>
      </div>
      {/* the strikes — hard, angled, each one a separate hit */}
      {Array.from({ length: Math.min(3, Math.floor(strikes)) }, (_, i) => {
        const partial = i === Math.floor(strikes) - 1 ? land : 1;
        return (
          <div key={"st" + i} style={{ position: "absolute", left: 8 * s,
            top: (30 + i * 24) * s, width: (Wd - 16 * s) * partial, height: 11 * s, zIndex: 4,
            background: RED, transform: `rotate(${-4 + i * 3.4}deg)`, transformOrigin: "0% 50%",
            borderRadius: 2 }} />
        );
      })}
    </div>
  );
};

/* =========================================================================
   S14 — THE THREE DOORS
   ⭐ reel 117: a badge needs a LIGHT FILL to carry dark type, and an accent set
   is only as legible as its WORST member. Filled badge, INK numeral.
   ====================================================================== */
export const NumDoor: React.FC<{ x: number; y: number; s?: number; z?: number; n: number;
  open?: number; c: string; label?: string; kind?: "roller" | "clinic" | "night" }> =
  ({ x, y, s = 1, z = 42, n, open = 0, c, label, kind = "roller" }) => {
  const W2 = 214 * s, H2 = 340 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2, width: W2, height: H2, zIndex: z }}>
      {/* ⛔ ROUND 11 SHIPPED THREE IDENTICAL GREY SLABS with a badge on each. A
             door is a FRAME, a lintel, hinges, a handle, a vision panel and a
             kick plate — and these three should not be the same door, because
             what is behind each of them is not the same place. `kind` gives each
             its own architecture, so the corridor reads as three destinations
             rather than as one slab repeated. */}
      {/* the opening behind it, and the light coming out once it swings */}
      <div style={{ position: "absolute", inset: 0, background: dkh(c, 0.66), borderRadius: 3 * s }} />
      <div style={{ position: "absolute", inset: 0, opacity: open, borderRadius: 3 * s,
        background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.14)} 100%)` }} />
      {/* the FRAME: two jambs and a lintel that oversail the opening */}
      <div style={{ position: "absolute", left: -14 * s, top: -18 * s, width: W2 + 28 * s,
        height: 22 * s, zIndex: 9, borderRadius: 3 * s, background: mxh(SLATE, 0.06) }} />
      {[-14, W2 - 4].map((jx, i) => (
        <div key={"jm" + i} style={{ position: "absolute", left: jx * s, top: -18 * s,
          width: 18 * s, height: H2 + 18 * s, zIndex: 9, background: dkh(SLATE, 0.16) }} />
      ))}
      {/* the leaf */}
      <div style={{ position: "absolute", inset: 0, transformOrigin: "0% 50%",
        transform: `perspective(900px) rotateY(${-open * 76}deg)`, zIndex: 6,
        background: `linear-gradient(172deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.30)} 100%)`,
        border: `${5 * s}px solid ${dkh("#0A0E10", 0)}`, borderRadius: 3 * s,
        backfaceVisibility: "hidden" }}>
        {kind === "roller" && (<>
          {/* an industrial roller shutter: horizontal slats and a bottom rail */}
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 8 * s, right: 8 * s,
              top: (16 + i * 26) * s, height: 18 * s, borderRadius: 2 * s,
              background: i % 2 ? dkh(SLATE, 0.36) : mxh(SLATE, 0.02) }} />
          ))}
          <div style={{ position: "absolute", left: 6 * s, bottom: 10 * s, right: 6 * s,
            height: 16 * s, background: dkh(SLATE, 0.48), borderRadius: 2 * s }} />
        </>)}
        {kind === "clinic" && (<>
          {/* a clinical door: a big vision panel and a kick plate */}
          <div style={{ position: "absolute", left: 26 * s, top: 30 * s, width: W2 - 62 * s,
            height: 128 * s, borderRadius: 4 * s, background: hexa("#CFE8EC", 0.34),
            border: `${4 * s}px solid ${dkh(SLATE, 0.34)}` }}>
            <div style={{ position: "absolute", left: 0, top: "46%", width: "100%", height: 4 * s,
              background: hexa("#FFFFFF", 0.24) }} />
          </div>
          <div style={{ position: "absolute", left: 14 * s, bottom: 16 * s, right: 14 * s,
            height: 54 * s, borderRadius: 2 * s, background: mxh(STEEL, 0.14) }} />
        </>)}
        {kind === "night" && (<>
          {/* a heavy night door: two recessed panels and a louvre vent */}
          {[0, 1].map(i => (
            <div key={i} style={{ position: "absolute", left: 22 * s, right: 22 * s,
              top: (24 + i * 150) * s, height: 126 * s, borderRadius: 3 * s,
              background: hexa("#000", 0.20), border: `${2 * s}px solid ${hexa("#FFF", 0.06)}` }} />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <div key={"lv" + i} style={{ position: "absolute", left: 42 * s, right: 42 * s,
              top: (188 + i * 13) * s, height: 6 * s, borderRadius: 2,
              background: dkh(SLATE, 0.46) }} />
          ))}
        </>)}
        {/* ⭐ the FILLED badge — light fill, INK numeral, so all three read.
               An accent set is only as legible as its worst member. */}
        <div style={{ position: "absolute", left: "50%", top: 142 * s, marginLeft: -36 * s,
          width: 72 * s, height: 72 * s, borderRadius: "50%", background: c,
          border: `${5 * s}px solid ${dkh(c, 0.42)}`, zIndex: 8,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(40 * s, 900), color: INK }}>{n}</span>
        </div>
        {/* a real lever handle on a rose, not a floating bar */}
        <div style={{ position: "absolute", right: 16 * s, top: 176 * s, width: 22 * s,
          height: 22 * s, borderRadius: "50%", zIndex: 8, background: dkh(BRASS, 0.34) }} />
        <div style={{ position: "absolute", right: 20 * s, top: 184 * s, width: 40 * s,
          height: 9 * s, borderRadius: 5 * s, zIndex: 8, background: mxh(BRASS, 0.06) }} />
      </div>
      {/* two hinges on the jamb side */}
      {[0.24, 0.72].map((k, i) => (
        <div key={"hi" + i} style={{ position: "absolute", left: -10 * s, top: H2 * k,
          width: 24 * s, height: 40 * s, zIndex: 10, borderRadius: 3 * s,
          background: dkh(STEEL, 0.30) }} />
      ))}
      {label && (
        <div style={{ position: "absolute", left: "50%", top: H2 + 14 * s, transform: "translateX(-50%)",
          whiteSpace: "nowrap", zIndex: 11 }}>
          <span style={{ ...mono(13 * s, 800), color: hexa(c, 0.92), letterSpacing: 1.4 }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/* the two DRAWN generics for S16. ⛔ never a real organisation's mark. */
export const CareCross: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string }> =
  ({ x, y, s = 1, z = 50, c = "#3F8E9E" }) => (
  <div style={{ position: "absolute", left: x - 44 * s, top: y - 44 * s, width: 88 * s,
    height: 88 * s, zIndex: z, borderRadius: 8 * s, background: PAPER,
    border: `${4 * s}px solid ${dkh(c, 0.2)}` }}>
    <div style={{ position: "absolute", left: 30 * s, top: 14 * s, width: 20 * s, height: 52 * s,
      background: c, borderRadius: 2 }} />
    <div style={{ position: "absolute", left: 14 * s, top: 30 * s, width: 52 * s, height: 20 * s,
      background: c, borderRadius: 2 }} />
  </div>
);

export const CivicCrest: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string }> =
  ({ x, y, s = 1, z = 50, c = "#4A5E86" }) => (
  <div style={{ position: "absolute", left: x - 42 * s, top: y - 46 * s, width: 84 * s,
    height: 92 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, background: PAPER,
      borderRadius: `${8 * s}px ${8 * s}px ${42 * s}px ${42 * s}px`,
      border: `${4 * s}px solid ${dkh(c, 0.2)}` }} />
    {/* three columns and a pediment — the shape a civic seal actually has */}
    <div style={{ position: "absolute", left: 12 * s, top: 16 * s, width: 60 * s, height: 9 * s,
      background: c, borderRadius: 2 }} />
    {[0, 1, 2].map(i => (
      <div key={i} style={{ position: "absolute", left: (17 + i * 21) * s, top: 28 * s,
        width: 11 * s, height: 34 * s, background: c, borderRadius: 1 }} />
    ))}
    <div style={{ position: "absolute", left: 12 * s, top: 64 * s, width: 60 * s, height: 8 * s,
      background: c, borderRadius: 2 }} />
  </div>
);

/* =========================================================================
   ⭐⭐⭐ ROUND 10 — REAL BRANDED OBJECTS, NOT BOXES.

   Alex: *"try to use logos whenever possible ... if we say Kimi K3 then we
   should incorporate the logo as much as possible"* and *"a lot of the
   animations are just too boring, it's just squares, just boxes, basic
   rectangles, I want them to be ACTUAL ITEMS."*

   Both notes are the same defect from two sides, and the craft doc already
   names it: **GREY + RECTANGULAR is the combination that reads as boring**
   (either one alone survives), and **at half a second a viewer RECOGNISES A
   MARK, they do not decode a silhouette.** A brown box with "KIMI K3" typed on
   it is a container carrying one bit; the real mark on a real object is
   recognition plus identity in the same glance.

   ⛔ The marks are REAL: `si_kimi.svg` and `si_moonshotai.svg` pulled from the
   Simple Icons CDN, which serves the official single-path glyph. Both are
   near-black, so both ride WHITE tiles or lit faces — a dark glyph on a dark
   prop is the light-on-light failure inverted, and this reel has already paid
   for that three times.
   ========================================================================= */

/** a real brand mark on a lit tile. ⛔ Simple Icons glyphs are near-black, so
    the tile is what makes them readable on a dark prop. */
/* =========================================================================
   ModelBox — a shipped model as a physical carton.
   ⛔⛔⛔ THE SECOND SCENE WAS A VAULT, and Alex called it: *"not good, safe
   scene, not interesting."* He is right, and the defect is the IDEA, not the
   execution. A locked vault is the first picture anyone reaches for when a line
   says "you cannot have this" — and it is also WRONG. A vault says the thing
   exists and is locked away, so somebody could break in. The truth is duller and
   sharper: Anthropic never put it on the shelf at all. There is nothing to open.
   ⭐ So the scene became a SHELF: four cartons carrying the REAL marks of models
   whose weights genuinely are published — Qwen, Mistral, DeepSeek, Kimi — and
   one bay that is simply empty, with Anthropic's mark on its label.
   ⛔ 16 drawn parts, because [[feedback_props_need_real_drawing]]: a carton is a
   face, a lid flap, a tape seam, a crushed corner, a spine shadow and a printed
   panel — not a rounded rectangle with a logo on it. */
export const ModelBox: React.FC<{ x: number; y: number; s?: number; z?: number;
  mark: string; c?: string; lift?: number; tilt?: number }> =
  ({ x, y, s = 1, z = 50, mark, c = "#C8A87A", lift = 0, tilt = 0 }) => {
  const W2 = 150 * s, H2 = 176 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2 - lift,
      width: W2, height: H2, zIndex: z, transform: `rotate(${tilt}deg)`,
      transformOrigin: "50% 100%" }}>
      {/* the lid, seen slightly from above */}
      <div style={{ position: "absolute", left: 6 * s, top: 0, width: W2 - 12 * s, height: 22 * s,
        borderRadius: `${4 * s}px ${4 * s}px 0 0`, zIndex: 2,
        background: `linear-gradient(178deg, ${mxh(c, 0.30)} 0%, ${mxh(c, 0.10)} 100%)` }} />
      {/* the face */}
      <div style={{ position: "absolute", left: 0, top: 18 * s, width: W2, height: H2 - 18 * s,
        borderRadius: `0 0 ${4 * s}px ${4 * s}px`, zIndex: 3, overflow: "hidden",
        background: `linear-gradient(174deg, ${mxh(c, 0.14)} 0%, ${dkh(c, 0.16)} 100%)`,
        border: `${3 * s}px solid ${dkh(c, 0.34)}`, boxShadow: SH }}>
        {/* ⛔⛔ THE MARK IS THE WHOLE FACE (Alex, round 27: *"just have the Kimi
               logo take up the full box thing instead of having multiple things
               going on there"*). v1 put a 62px logo on a small panel with a tape
               seam through it and two rules of fake small print under it — four
               things competing on a 150px carton, so at reel scale the one thing
               that identifies the box was the smallest thing on it. */}
        <div style={{ position: "absolute", left: 10 * s, top: 14 * s, right: 10 * s,
          bottom: 14 * s, borderRadius: 4 * s, background: "#FBF8F0",
          border: `${2 * s}px solid ${dkh(c, 0.22)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(`logos/${mark}`)}
            style={{ width: 104 * s, height: 104 * s, objectFit: "contain" }} />
        </div>
        {/* the crushed corner — a carton that has been handled */}
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 26 * s, height: 26 * s,
          background: dkh(c, 0.28), clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
      </div>
      {/* the spine shadow down its left, so it reads as a solid and not a card */}
      <div style={{ position: "absolute", left: 0, top: 18 * s, width: 11 * s, height: H2 - 18 * s,
        zIndex: 4, background: hexa("#000000", 0.20) }} />
    </div>
  );
};

/* =========================================================================
   BurstCounter — a mechanical drum counter that RUNS OUT OF DIGITS.
   ⛔⛔⛔ ROUND 32 — Alex: *"you didn't replace those other animations."* He is
   right, and the distinction matters: the previous pass DECLUTTERED those scenes
   (fewer parts, bigger logo, one less traffic lane) and called it a redo. That is
   [[feedback_dressing_the_words_is_not_redoing_it]] wearing a different hat.
   Subtraction is not a new mechanism.
   ⭐ "2.8 trillion parameters" was a weighbridge deck sinking under a crate with
   a needle going past a stop — a WEIGHT metaphor, which says heavy, not
   uncountable. This says uncountable: an odometer spins up, the drums run out of
   range, the last one spins free and the housing splits.
   ⛔ 19 drawn parts: a cast housing, a bezel, six drum windows, the drums, the
   spindle, four corner bolts, a maker plate, and the split with its shards. */
export const BurstCounter: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; spin: number; burst: number; digits?: number }> =
  ({ x, y, s = 1, z = 50, f = 0, spin, burst, digits = 6 }) => {
  const W2 = 470 * s, H2 = 210 * s;
  const DW = (W2 - 60 * s) / digits;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2 / 2, width: W2, height: H2,
      zIndex: z, transform: `rotate(${burst * 2.4}deg)` }}>
      {/* the cast housing, and it BULGES before it goes */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s,
        transform: `scale(${1 + burst * 0.06}, ${1 + burst * 0.10})`,
        background: `linear-gradient(168deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.34)} 58%, ${dkh(SLATE, 0.54)} 100%)`,
        border: `${7 * s}px solid ${dkh("#0A0E12", 0)}`, boxShadow: SH_D }} />
      {/* the bezel the drums sit behind */}
      <div style={{ position: "absolute", left: 24 * s, top: 30 * s, right: 24 * s, bottom: 30 * s,
        borderRadius: 6 * s, background: "#0B0E12",
        border: `${4 * s}px solid ${dkh(SLATE, 0.52)}`, overflow: "hidden" }}>
        {Array.from({ length: digits }, (_, i) => {
          /* each drum turns faster than the one to its left; the LAST one spins
             free once the range is gone, which is the whole point of the shot */
          const free = i === digits - 1 && burst > 0.02;
          const rate = spin * (0.6 + i * 1.5) + (free ? burst * 46 : 0);
          return (
            <div key={"dr" + i} style={{ position: "absolute", left: i * DW + 6 * s, top: 0,
              width: DW - 8 * s, height: "100%", overflow: "hidden",
              background: `linear-gradient(180deg, ${dkh("#EFE9DA", 0.22)} 0%, #EFE9DA 42%, ${dkh("#EFE9DA", 0.28)} 100%)`,
              borderRadius: 3 * s }}>
              <div style={{ position: "absolute", left: 0, top: `${-((f * rate) % 100)}%`,
                width: "100%", height: "300%" }}>
                {[0, 1, 2].map(k => (
                  <div key={k} style={{ height: "33.333%", display: "flex",
                    alignItems: "center", justifyContent: "center" }}>
                    <span style={{ ...mono(58 * s, 900), color: free ? "#B02A1E" : "#241F18" }}>
                      {(k * 3 + i) % 10}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* four corner bolts */}
      {[[16, 14], [W2 - 34, 14], [16, H2 - 32], [W2 - 34, H2 - 32]].map((c, i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: c[0] * s, top: c[1] * s,
          width: 18 * s, height: 18 * s, borderRadius: "50%", background: dkh(SLATE, 0.56),
          border: `${3 * s}px solid ${dkh("#0A0E12", 0)}` }} />
      ))}
      {/* ── THE SPLIT: the housing cracks open down its right end ── */}
      {burst > 0.02 && (<>
        <div style={{ position: "absolute", right: 0, top: -14 * s, width: 26 * s,
          height: H2 + 28 * s, zIndex: 8, transformOrigin: "0% 50%",
          transform: `rotate(${burst * 26}deg) translateX(${burst * 22}px)`,
          background: `linear-gradient(90deg, ${dkh(SLATE, 0.40)} 0%, ${dkh("#0A0E12", 0)} 100%)`,
          clipPath: "polygon(0 0, 100% 14%, 100% 86%, 0 100%)" }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"sh" + i} style={{ position: "absolute",
            right: -burst * (30 + i * 26), top: (24 + i * 24) * s - burst * (i - 3) * 30,
            width: (9 + (i % 3) * 6) * s, height: (7 + (i % 2) * 5) * s, zIndex: 9,
            opacity: Math.max(0, 1 - burst * 0.9), borderRadius: 2,
            transform: `rotate(${burst * (i * 47)}deg)`, background: dkh(SLATE, 0.30) }} />
        ))}
      </>)}
    </div>
  );
};

/* =========================================================================
   Furnace — a firebox you feed BANKNOTES into.
   ⛔⛔⛤ ROUND 32 — the electric bill was a petrol pump: a good instant read, but
   it says REFUELLING, and a monthly power bill is not a refuel, it is a burn.
   ⭐ "You're paying $565 a month just to power the GPUs" is money going into a
   fire to keep something warm. That is the literal mechanism, it needs no
   caption, and it is a completely different physical event from a nozzle.
   ⛔ 17 drawn parts: a riveted boiler body, hoop bands, a hinged door with a
   handle, the firebox mouth, a grate, the fire itself, a flue, two feet, a
   pressure gauge and the meter drum on its face. */
export const Furnace: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; fire: number; open: number }> =
  ({ x, y, s = 1, z = 44, f = 0, fire, open }) => {
  const W2 = 360 * s, H2 = 430 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2, width: W2, height: H2, zIndex: z }}>
      {/* the body, riveted, with hoop bands */}
      <div style={{ position: "absolute", inset: 0, borderRadius: `${16 * s}px ${16 * s}px ${6 * s}px ${6 * s}px`,
        background: `linear-gradient(96deg, ${mxh("#4A3A32", 0.14)} 0%, ${dkh("#4A3A32", 0.22)} 52%, ${dkh("#4A3A32", 0.46)} 100%)`,
        border: `${6 * s}px solid ${dkh("#140D0A", 0)}`, boxShadow: SH_D }} />
      {[0.16, 0.62].map((hb, i) => (
        <div key={"hp" + i} style={{ position: "absolute", left: -6 * s, right: -6 * s,
          top: H2 * hb, height: 20 * s, background: dkh("#3A2C26", 0.10),
          borderTop: `${3 * s}px solid ${mxh("#4A3A32", 0.10)}` }} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={"rv" + i} style={{ position: "absolute", left: (18 + (i % 5) * 76) * s,
          top: (i < 5 ? 0.16 : 0.62) * H2 + 5 * s, width: 11 * s, height: 11 * s,
          borderRadius: "50%", background: dkh("#2A1F1A", 0) }} />
      ))}
      {/* ── THE FIREBOX: mouth, grate, and the fire that GROWS ── */}
      <div style={{ position: "absolute", left: 52 * s, top: H2 * 0.30, width: W2 - 104 * s,
        height: H2 * 0.30, borderRadius: 8 * s, overflow: "hidden",
        background: "#150A06", border: `${5 * s}px solid ${dkh("#140D0A", 0)}` }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%",
          height: `${26 + fire * 74}%`,
          background: `linear-gradient(0deg, ${mxh(GOLD, 0.36)} 0%, ${hexa("#FF6A2A", 0.9)} 46%, ${hexa("#FF3D1E", 0)} 100%)` }} />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"fl" + i} style={{ position: "absolute", left: `${8 + i * 15}%`,
            bottom: `${10 + fire * 40}%`,
            width: 22 * s, height: (26 + fire * 40) * s, borderRadius: "50% 50% 40% 40%",
            opacity: 0.5 + fire * 0.4,
            transform: `translateY(${Math.sin(f / 3.4 + i) * 8 * s}px) scaleY(${1 + Math.sin(f / 2.6 + i) * 0.22})`,
            background: `linear-gradient(0deg, ${hexa("#FFD07A", 0.95)} 0%, ${hexa("#FF6A2A", 0.5)} 70%, ${hexa("#FF3D1E", 0)} 100%)` }} />
        ))}
        {/* the grate the notes land on */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"gr" + i} style={{ position: "absolute", left: `${6 + i * 13.6}%`, bottom: 0,
            width: 7 * s, height: 26 * s, background: dkh("#0A0605", 0) }} />
        ))}
      </div>
      {/* the hinged door, swung open on its hinge */}
      <div style={{ position: "absolute", left: 44 * s, top: H2 * 0.28, width: W2 - 88 * s,
        height: H2 * 0.34, transformOrigin: "0% 50%",
        transform: `perspective(900px) rotateY(${-open * 104}deg)`,
        background: `linear-gradient(96deg, ${mxh("#4A3A32", 0.10)} 0%, ${dkh("#4A3A32", 0.34)} 100%)`,
        border: `${5 * s}px solid ${dkh("#140D0A", 0)}`, borderRadius: 6 * s }}>
        <div style={{ position: "absolute", right: 14 * s, top: "42%", width: 40 * s, height: 12 * s,
          borderRadius: 6 * s, background: dkh("#2A1F1A", 0) }} />
      </div>
      {/* the flue, and two feet */}
      <div style={{ position: "absolute", left: W2 / 2 - 30 * s, top: -70 * s, width: 60 * s,
        height: 80 * s, background: dkh("#3A2C26", 0.16), borderRadius: `${5 * s}px ${5 * s}px 0 0` }} />
      {[24, W2 - 68].map((fx, i) => (
        <div key={"ft" + i} style={{ position: "absolute", left: fx * s, bottom: -14 * s,
          width: 44 * s, height: 18 * s, borderRadius: 3 * s, background: dkh("#2A1F1A", 0) }} />
      ))}
      {/* the pressure gauge: it climbs with the fire */}
      <div style={{ position: "absolute", right: 24 * s, top: 26 * s, width: 62 * s, height: 62 * s,
        borderRadius: "50%", background: "#EFE9DA", border: `${5 * s}px solid ${dkh("#2A1F1A", 0)}` }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 4 * s, height: 22 * s,
          marginLeft: -2 * s, borderRadius: 2, transformOrigin: "50% 100%",
          transform: `rotate(${-118 + fire * 210}deg) translateY(${-22 * s}px)`, background: "#B02A1E" }} />
      </div>
    </div>
  );
};

/* =========================================================================
   ServerHall — rows of racks receding to a vanishing point.
   ⛔⛔⛤ ROUND 37 — Alex: *"33 seconds should show like a massive massive server
   when zoomed out."* Every previous version of this beat was ONE machine drawn
   large — a boiler, then a boiler with a tap. One object cannot say "massive"
   however big you draw it, because there is nothing for the eye to measure it
   against. SCALE IS A COUNT AND A VANISHING POINT: eight bays a side, each
   smaller and higher than the last, an aisle running between them, and a Claude
   at the near end who is 5% of the frame.
   ⛔ Drawn back-to-front so the near bays occlude the far ones — without that
   overlap a receding row reads as a flat gradient of rectangles. */
export const ServerHall: React.FC<{ f?: number; z?: number; rows?: number;
  hz?: number; vp?: number; lit?: number; wave?: number }> =
  ({ f = 0, z = 30, rows = 8, hz = 300, vp = 506, lit = 1, wave }) => (
  <>
    {Array.from({ length: rows }, (_, r) => {
      const i = rows - 1 - r;                    /* far -> near, so near draws over */
      const t = i / (rows - 1);                  /* 0 = far, 1 = near */
      const k = 0.16 + Math.pow(t, 1.7) * 0.94;  /* perspective falloff */
      const bw = 150 * k, bh = 300 * k;
      const gap = 40 * k;
      const base = hz + (792 - hz) * Math.pow(t, 1.35);
      /* ⭐ THE POWER-UP WAVE. `wave` 0..1 runs NEAR -> FAR, so the hall comes on
         behind him as he walks into it and every bay in the frame repaints. */
      /* ⛔ THE UNLIT FLOOR IS 0.24, NOT 0. A hall that starts pitch black buys its
         wave with BODY_BLACK, and the look gate is the one that fails last. */
      const wl = wave === undefined ? lit
        : lit * Math.max(0.24, Math.min(1, (wave - (1 - t)) * 5 + 0.24));
      /* how close the wave FRONT is to this row — 1 at the moment it arrives */
      const d0 = wave === undefined ? 0 : Math.abs(wave - (1 - t));
      const fl = wave === undefined ? 0 : Math.max(0, 1 - d0 / 0.07);
      return (
        <React.Fragment key={"row" + i}>
          {[-1, 1].map(side => {
            const x = vp + side * (gap + bw * 0.5) * (1 + t * 2.6);
            return (
              <div key={side} style={{ position: "absolute", left: x - bw / 2, top: base - bh,
                width: bw, height: bh, zIndex: z + i * 2,
                background: `linear-gradient(${side < 0 ? 96 : 264}deg, ${mxh("#2A323C", 0.10 * wl)} 0%, ${dkh("#1A2028", 0.10)} 60%, ${dkh("#12171D", 0.10)} 100%)`,
                border: `${Math.max(1, 3 * k)}px solid ${dkh("#0A0E12", 0)}`,
                borderRadius: 3 * k }}>
                {/* the slot lines and their link lamps — what makes it a RACK */}
                {Array.from({ length: 7 }, (_, j) => (
                  <div key={j} style={{ position: "absolute", left: 5 * k, right: 5 * k,
                    top: (14 + j * 40) * k, height: 26 * k, borderRadius: 2 * k,
                    background: dkh("#39424E", 0.10) }}>
                    <div style={{ position: "absolute", right: 5 * k, top: 8 * k,
                      width: Math.max(2, 7 * k), height: Math.max(2, 7 * k), borderRadius: "50%",
                      background: ((i * 7 + j * 3 + Math.floor(f / 6)) % 5) < 3
                        ? hexa("#7FE0A8", 0.85 * wl) : hexa("#2A4A38", 0.6 * wl) }} />
                  </div>
                ))}
              </div>
            );
          })}
          {/* ⭐ THE AISLE LIGHT STRIKES AS THE WAVE REACHES IT. A smooth ramp is a
                 luma change and the eye reads it as a fade; a STRIKE — a flare to
                 double brightness for a few frames as the front passes — is an
                 event, and it happens eight times down the depth of the shot. */}
          <div style={{ position: "absolute", left: vp - (90 + fl * 40) * k,
            top: base - bh - 26 * k, width: (180 + fl * 80) * k, height: (12 + fl * 7) * k,
            zIndex: z + i * 2 - 1, borderRadius: 3,
            background: hexa("#EAF6FF", Math.min(1, 0.5 * wl + fl * 0.7)),
            boxShadow: `0 0 ${(40 + fl * 90) * k}px ${hexa("#CFE6F2", Math.min(0.95, 0.34 * wl + fl * 0.6))}` }} />
        </React.Fragment>
      );
    })}
    {/* the floor of the aisle, running away to the vanishing point */}
    <div style={{ position: "absolute", left: 0, top: hz, width: 1012, height: 792 - hz,
      zIndex: z - 1,
      background: `linear-gradient(180deg, ${dkh("#0E141A", 0)} 0%, ${dkh("#151D25", 0)} 100%)` }} />
    <div style={{ position: "absolute", left: vp - 300, top: hz, width: 600, height: 792 - hz,
      zIndex: z, opacity: 0.30 * lit, clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)",
      background: `linear-gradient(180deg, ${hexa("#CFE6F2", 0.5)} 0%, ${hexa("#CFE6F2", 0)} 100%)` }} />
  </>
);

export const BrandTile: React.FC<{ x: number; y: number; s?: number; z?: number;
  file: string; label?: string; tile?: string; rot?: number; bare?: boolean }> =
  ({ x, y, s = 1, z = 80, file, label, tile = "#FBF8F0", rot = 0, bare = false }) => {
  const D = 96 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, zIndex: z,
      transform: `rotate(${rot}deg)` }}>
      <div style={{ width: D, height: D, borderRadius: D * 0.24,
        background: bare ? "transparent" : tile,
        border: bare ? undefined : `${3 * s}px solid ${dkh("#D8CFBC", 0)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: bare ? undefined : SH }}>
        <Img src={staticFile(`logos/${file}`)}
          style={{ width: D * 0.62, height: D * 0.62, objectFit: "contain" }} />
      </div>
      {label && (
        <div style={{ position: "absolute", left: "50%", top: D + 8 * s,
          transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
          <span style={{ ...mono(14 * s, 900), color: CREAMB, letterSpacing: 1.6 }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/** ⭐ THE MODEL, AS AN OBJECT. Replaces round 9's brown crate-with-a-label: a
    machined core with a lit face, cooling fins, corner bolts, a handle, a
    capacity strip and the REAL maker's mark struck into it. Seventeen drawn
    parts against the crate's four, and it is recognisable rather than labelled. */
export const ModelCore: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  lit?: number; params?: string; mark?: string; maker?: string }> =
  ({ x, y, s = 1, z = 50, f = 0, lit = 1, params, mark = "si_kimi.svg", maker }) => {
  const W2 = 300 * s, H2 = 208 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2, width: W2, height: H2, zIndex: z }}>
      {/* the machined body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
        background: `linear-gradient(166deg, ${mxh(SLATE, 0.22)} 0%, ${dkh(SLATE, 0.30)} 52%, ${dkh(SLATE, 0.52)} 100%)`,
        border: `${5 * s}px solid ${dkh("#0A0E12", 0)}` }} />
      {/* cooling fins down the left flank */}
      <div style={{ position: "absolute", left: 10 * s, top: 18 * s, width: 42 * s,
        height: H2 - 36 * s, zIndex: 3, borderRadius: 3 * s, overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} style={{ height: 6 * s, background: dkh(SLATE, 0.56), borderRadius: 2 }} />
        ))}
      </div>
      {/* ⛔⛔ THE MARK OWNS THE FACE (Alex, round 27). This box was carrying nine
             separate things — fins, a lit plane, a 0.72 mark tile, a 38px params
             number, a 14-segment capacity strip, a handle, bolts and a maker
             strip — so the ONE thing that says which model it is was competing
             with eight others. The lit plane is now the mark's plate and the
             mark fills it; `params` is opt-in so only the scene whose LINE is
             the parameter count carries the number. */}
      <div style={{ position: "absolute", left: 52 * s, top: 16 * s, width: W2 - 78 * s,
        height: H2 - 62 * s, zIndex: 4, borderRadius: 6 * s,
        background: `linear-gradient(170deg, ${mxh(GOLD, 0.30 * lit)} 0%, ${dkh(GOLD, 0.24)} 100%)`,
        border: `${3 * s}px solid ${dkh(GOLD, 0.52)}`, opacity: 0.35 + lit * 0.65 }} />
      <BrandTile x={W2 * (params ? 0.40 : 0.52)} y={H2 * 0.40}
        s={(params ? 0.82 : 1.34) * s} z={z + 6} file={mark} bare />
      {params && (
        <div style={{ position: "absolute", left: 168 * s, top: 46 * s, zIndex: z + 6 }}>
          <span style={{ ...mono(38 * s, 900), color: "#2A1D06" }}>{params}</span>
        </div>
      )}
      {/* the capacity strip along the bottom face */}
      <div style={{ position: "absolute", left: 66 * s, bottom: 16 * s, width: W2 - 96 * s,
        height: 26 * s, zIndex: 5, borderRadius: 4 * s, background: "#0C1014",
        display: "flex", alignItems: "center", gap: 3 * s, padding: `0 ${8 * s}px` }}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 12 * s, borderRadius: 2,
            background: i < 13 ? mxh(TEAL, 0.10) : dkh(TEAL, 0.7) }} />
        ))}
      </div>
      {/* the carry handle, four corner bolts and a maker strip */}
      <div style={{ position: "absolute", left: W2 / 2 - 44 * s, top: -16 * s, width: 88 * s,
        height: 20 * s, zIndex: 2, borderRadius: `${10 * s}px ${10 * s}px 0 0`,
        background: dkh(SLATE, 0.44), border: `${3 * s}px solid ${dkh("#0A0E12", 0)}`,
        borderBottom: "none" }} />
      {[[14, 14], [W2 - 26, 14], [14, H2 - 26], [W2 - 26, H2 - 26]].map(([bx, by], i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: bx * s, top: by * s,
          width: 12 * s, height: 12 * s, borderRadius: "50%", zIndex: 6,
          background: `radial-gradient(50% 50% at 35% 30%, ${mxh(STEEL, 0.3)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
      ))}
      {maker && (
        <div style={{ position: "absolute", left: 66 * s, top: H2 - 52 * s, zIndex: 6 }}>
          <span style={{ ...mono(12 * s, 800), color: hexa(CREAMB, 0.78), letterSpacing: 1.4 }}>{maker}</span>
        </div>
      )}
    </div>
  );
};

/** ⭐⭐ A FUEL PUMP — S8's replacement for a flat blue house and a grey meter box.
    Everyone recognises a pump in under half a second, it is a real object with a
    real silhouette (housing, brow, display, grade buttons, hose, nozzle, boot),
    and the ONE ACTION of holding a nozzle while a number races is exactly what
    paying to power something is. Twenty-one drawn parts. */
export const FuelPump: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  money: number; unit?: string; src?: string; run?: number; roll?: boolean }> =
  ({ x, y, s = 1, z = 44, f = 0, money, unit, src, run = 1, roll = false }) => {
  const W2 = 250 * s, H2 = 430 * s;
  const str = Math.round(money).toString().padStart(3, "0");
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2, width: W2, height: H2, zIndex: z }}>
      {/* the boot it stands on */}
      <div style={{ position: "absolute", left: -18 * s, bottom: -10 * s, width: W2 + 36 * s,
        height: 30 * s, borderRadius: 5 * s, background: dkh("#3A3A40", 0), zIndex: 1 }} />
      {/* the housing */}
      <div style={{ position: "absolute", left: 0, top: 26 * s, width: W2, height: H2 - 34 * s,
        borderRadius: `${14 * s}px ${14 * s}px ${5 * s}px ${5 * s}px`, zIndex: 2,
        background: `linear-gradient(168deg, ${mxh("#C4453A", 0.16)} 0%, ${dkh("#C4453A", 0.28)} 100%)`,
        border: `${5 * s}px solid ${dkh("#3A1410", 0)}` }} />
      {/* the brow / topper */}
      <div style={{ position: "absolute", left: -12 * s, top: 0, width: W2 + 24 * s, height: 40 * s,
        borderRadius: 7 * s, zIndex: 4, background: mxh("#F0E4C4", 0.1),
        border: `${4 * s}px solid ${dkh("#3A1410", 0)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(17 * s, 900), color: "#3A1410", letterSpacing: 2 }}>GRID</span>
      </div>
      {/* THE DISPLAY — the thing the whole scene is about */}
      <div style={{ position: "absolute", left: 20 * s, top: 64 * s, width: W2 - 40 * s,
        height: 104 * s, zIndex: 6, borderRadius: 6 * s, background: "#0B0E0C",
        border: `${4 * s}px solid ${dkh("#3A1410", 0)}`, padding: 8 * s, boxSizing: "border-box" }}>
        <span style={{ ...mono(11 * s, 800), color: hexa("#8FD8A8", 0.7), letterSpacing: 1.4 }}>
          {unit ?? "TOTAL"}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 2 * s, marginTop: 4 * s }}>
          <span style={{ ...mono(30 * s, 900), color: "#7CE8A0", marginRight: 2 * s }}>$</span>
          {/* ⭐ ROLLING DRUMS, not swapped glyphs. A digit that swaps repaints a
                 few strokes; a drum that rolls repaints its whole face every
                 sample, which is where a racing number's motion actually lives. */}
          {str.split("").map((d, i) => {
            const v = Math.round(money) / Math.pow(10, str.length - 1 - i);
            const frac = roll ? v - Math.floor(v) : 0;
            const cur = Number(d), nxt = (cur + 1) % 10;
            return (
              <div key={i} style={{ width: 34 * s, height: 48 * s, borderRadius: 3 * s,
                background: "#10201A", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0,
                  transform: `translateY(${-frac * 48 * s}px)` }}>
                  <div style={{ height: 48 * s, display: "flex", alignItems: "center",
                    justifyContent: "center" }}>
                    <span style={{ ...mono(34 * s, 900), color: "#7CE8A0" }}>{cur}</span>
                  </div>
                  <div style={{ height: 48 * s, display: "flex", alignItems: "center",
                    justifyContent: "center" }}>
                    <span style={{ ...mono(34 * s, 900), color: "#7CE8A0" }}>{nxt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* three grade buttons */}
      {[0, 1, 2].map(i => (
        <div key={"gb" + i} style={{ position: "absolute", left: (24 + i * 70) * s, top: 190 * s,
          width: 58 * s, height: 34 * s, zIndex: 6, borderRadius: 4 * s,
          background: i === 2 ? mxh(GOLD, 0.16) : dkh("#C4453A", 0.5),
          border: `${3 * s}px solid ${dkh("#3A1410", 0)}` }} />
      ))}
      {/* the spinning drum that says it is RUNNING */}
      <div style={{ position: "absolute", left: 24 * s, top: 238 * s, width: W2 - 48 * s,
        height: 26 * s, zIndex: 6, borderRadius: 4 * s, background: dkh("#3A1410", 0),
        overflow: "hidden" }}>
        {Array.from({ length: 9 }, (_, i) => {
          const p = (((i / 9) + f * 0.022 * run) % 1);
          return (
            <div key={"dr" + i} style={{ position: "absolute", left: `${p * 100}%`, top: 0,
              width: 12 * s, height: "100%", background: hexa("#F0E4C4", 0.5) }} />
          );
        })}
      </div>
      {src && (
        <div style={{ position: "absolute", left: 24 * s, top: 280 * s, zIndex: 6, whiteSpace: "nowrap" }}>
          <span style={{ ...mono(11 * s, 800), color: hexa("#F0E4C4", 0.6), letterSpacing: 0.9 }}>{src}</span>
        </div>
      )}
      {/* the hose cradle */}
      <div style={{ position: "absolute", right: -10 * s, top: 300 * s, width: 30 * s,
        height: 52 * s, zIndex: 5, borderRadius: 5 * s, background: dkh("#3A1410", 0) }} />
    </div>
  );
};

/** the nozzle on the end of the hose — drawn, because a rectangle on a curve is
    a rectangle on a curve. */
export const Nozzle: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 78, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "20% 50%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 74 * s, height: 30 * s,
      borderRadius: `${8 * s}px ${4 * s}px ${4 * s}px ${8 * s}px`,
      background: `linear-gradient(180deg, ${mxh("#C4453A", 0.2)} 0%, ${dkh("#C4453A", 0.3)} 100%)`,
      border: `${3 * s}px solid ${dkh("#3A1410", 0)}` }} />
    {/* the spout */}
    <div style={{ position: "absolute", left: 70 * s, top: 8 * s, width: 52 * s, height: 13 * s,
      borderRadius: 4 * s, background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.36)} 100%)` }} />
    {/* the trigger guard and the trigger */}
    <div style={{ position: "absolute", left: 16 * s, top: 28 * s, width: 40 * s, height: 26 * s,
      borderRadius: `0 0 ${12 * s}px ${12 * s}px`, border: `${4 * s}px solid ${dkh("#3A1410", 0)}`,
      borderTop: "none" }} />
    <div style={{ position: "absolute", left: 26 * s, top: 30 * s, width: 18 * s, height: 12 * s,
      borderRadius: 3 * s, background: dkh(STEEL, 0.2) }} />
  </div>
);


/** ⭐⭐⭐ S10's replacement for a row of dark rectangles. A real industrial
    machine: a hopper, a flywheel on a belt, a boiler drum with hoop bands and
    rivets, three gauges, a pressure relief, a chimney and a stack of ribs.
    Twenty-eight drawn parts. Its whole job is to be ENORMOUS and to produce
    almost nothing, so `idleK` drives how slowly it turns — a giant that is
    barely moving reads as wasted in a way a fast one never can. */
export const BigRig: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  idleK?: number; util?: string;
  /** ⛔ ROUND 27 — Alex: *"not really sure what's going on, not simple to
      understand."* The rig carried TWO dial faces on top of the utilisation
      plate, and the scene around it added a totaliser, a rate plate, a spout, a
      cup and a hero — eleven things for one sentence. Turning the dials off
      leaves the ONE number that explains the scene as the only readout. */
  gauges?: boolean }> =
  ({ x, y, s = 1, z = 40, f, idleK = 0.06, util , gauges = true }) => {
  const W2 = 620 * s, H2 = 430 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2, width: W2, height: H2, zIndex: z }}>
      {/* the boiler drum — the mass */}
      <div style={{ position: "absolute", left: 96 * s, top: 76 * s, width: 366 * s, height: H2 - 96 * s,
        borderRadius: `${40 * s}px ${40 * s}px ${10 * s}px ${10 * s}px`, zIndex: 3,
        background: `linear-gradient(96deg, ${dkh(SLATE, 0.44)} 0%, ${mxh(SLATE, 0.16)} 42%, ${dkh(SLATE, 0.50)} 100%)`,
        border: `${6 * s}px solid ${dkh("#070C10", 0)}` }} />
      {/* hoop bands with rivets — the thing that says BOILER not box */}
      {[0, 1, 2].map(i => (
        <React.Fragment key={"hb" + i}>
          <div style={{ position: "absolute", left: 90 * s, top: (128 + i * 96) * s,
            width: 378 * s, height: 18 * s, zIndex: 5, background: dkh(SLATE, 0.60) }} />
          {Array.from({ length: 9 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: (108 + j * 42) * s,
              top: (132 + i * 96) * s, width: 9 * s, height: 9 * s, borderRadius: "50%",
              zIndex: 6, background: mxh(STEEL, 0.24) }} />
          ))}
        </React.Fragment>
      ))}
      {/* the hopper feeding it */}
      <div style={{ position: "absolute", left: 150 * s, top: 0, width: 250 * s, height: 84 * s,
        zIndex: 2, background: dkh(SLATE, 0.34),
        clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)" }} />
      {/* the flywheel and its belt — turning, and far too slowly */}
      <div style={{ position: "absolute", left: -8 * s, top: 150 * s, width: 176 * s,
        height: 176 * s, borderRadius: "50%", zIndex: 7,
        background: `radial-gradient(50% 50% at 50% 50%, ${dkh(SLATE, 0.30)} 52%, ${dkh(SLATE, 0.56)} 100%)`,
        border: `${10 * s}px solid ${dkh("#070C10", 0)}`,
        transform: `rotate(${f * idleK * 40}deg)` }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: 76 * s, height: 11 * s, marginTop: -5.5 * s, borderRadius: 5,
            transformOrigin: "0% 50%", transform: `rotate(${i * 60}deg)`,
            background: mxh(SLATE, 0.10) }} />
        ))}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 34 * s, height: 34 * s,
          marginLeft: -17 * s, marginTop: -17 * s, borderRadius: "50%", background: dkh("#070C10", 0) }} />
      </div>
      <div style={{ position: "absolute", left: 76 * s, top: 168 * s, width: 30 * s,
        height: 140 * s, zIndex: 6, background: dkh("#1A1410", 0) }} />
      {/* ⛔ ROUND 10 DREW THESE AS PLAIN WHITE DISCS WITH A STUB ON THEM. At
             62px on a dark drum they were the brightest, largest things in the
             frame and they said NOTHING — three blank circles. A gauge is
             recognised by its FACE: a bezel, tick marks, a red danger arc at the
             top of the range, a labelled window and a needle you can see is
             pinned at the bottom of the scale. Two of them, not three, so they
             support the drum instead of competing with it. */}
      {(gauges ? [0, 1] : []).map(i => {
        const D = 92 * s;
        return (
          <div key={"gg" + i} style={{ position: "absolute", left: (474 + i * 18) * s,
            top: (116 + i * 128) * s, width: D, height: D, zIndex: 8 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
              background: `linear-gradient(160deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
            <div style={{ position: "absolute", inset: 7 * s, borderRadius: "50%", background: "#EFE9DA" }} />
            {/* the tick marks, and the red arc where it SHOULD be */}
            {Array.from({ length: 11 }, (_, j) => {
              const ang = -125 + (j / 10) * 250;
              return (
                <div key={j} style={{ position: "absolute", left: "50%", top: "50%",
                  width: (j % 5 === 0 ? 13 : 8) * s, height: (j % 5 === 0 ? 4 : 2.6) * s,
                  marginTop: -2 * s, borderRadius: 1,
                  transformOrigin: `${-(D / 2 - 15 * s)}px 50%`,
                  transform: `translateX(${D / 2 - 15 * s}px) rotate(${ang}deg)`,
                  background: j >= 7 ? "#B02A1E" : "#241F18" }} />
              );
            })}
            {/* the needle, pinned at the very bottom of the scale */}
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 5 * s,
              height: D / 2 - 16 * s, marginLeft: -2.5 * s, borderRadius: 2,
              transformOrigin: "50% 100%",
              transform: `rotate(${-121 + Math.sin(f / 19 + i) * 2.4}deg) translateY(${-(D / 2 - 16 * s)}px)`,
              background: "#B02A1E" }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 14 * s,
              height: 14 * s, marginLeft: -7 * s, marginTop: -7 * s, borderRadius: "50%",
              background: "#241F18" }} />
            <div style={{ position: "absolute", left: "50%", top: 60 * s, marginLeft: -20 * s,
              width: 40 * s, height: 15 * s, borderRadius: 2 * s, background: "#241F18",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(10 * s, 900), color: "#E8563C" }}>{i ? "IDLE" : "UTIL"}</span>
            </div>
          </div>
        );
      })}
      {/* the chimney and its thin, apologetic wisp */}
      <div style={{ position: "absolute", left: 404 * s, top: -46 * s, width: 54 * s, height: 96 * s,
        zIndex: 4, borderRadius: `${6 * s}px ${6 * s}px 0 0`, background: dkh(SLATE, 0.52) }} />
      {util && (
        <div style={{ position: "absolute", left: 150 * s, top: 196 * s, zIndex: 9,
          padding: `${8 * s}px ${20 * s}px`, borderRadius: 5 * s, background: "#0B0E12",
          border: `${4 * s}px solid ${dkh(RED, 0.1)}` }}>
          <span style={{ ...mono(46 * s, 900), color: "#FF6A4E" }}>{util}</span>
          <div style={{ position: "absolute", left: 0, top: 62 * s, width: "100%", textAlign: "center" }}>
            <span style={{ ...mono(11 * s, 800), color: hexa("#FFB49E", 0.9), letterSpacing: 1.5 }}>
              UTILIZATION</span>
          </div>
        </div>
      )}
    </div>
  );
};

/** ⛔ S16's cabinets were raw `<div>`s. A real filing cabinet is a carcass, a
    plinth, a top lip, four DRAWER FACES each with a recessed pull and a label
    holder, and a shadow gap between them — fourteen parts, and the difference
    between "a records room" and "four grey boxes". */
export const FileCabinet: React.FC<{ x: number; y: number; s?: number; z?: number;
  open?: number; c?: string; label?: string }> =
  ({ x, y, s = 1, z = 38, open = 0, c = "#7E9298", label }) => {
  const W2 = 132 * s, H2 = 320 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2, width: W2, height: H2, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s,
        background: `linear-gradient(96deg, ${dkh(c, 0.26)} 0%, ${mxh(c, 0.14)} 46%, ${dkh(c, 0.32)} 100%)`,
        border: `${4 * s}px solid ${dkh(c, 0.56)}` }} />
      {/* the top lip */}
      <div style={{ position: "absolute", left: -6 * s, top: -8 * s, width: W2 + 12 * s,
        height: 14 * s, borderRadius: 3 * s, zIndex: 4, background: mxh(c, 0.26) }} />
      {[0, 1, 2, 3].map(i => (
        <div key={"dw" + i} style={{ position: "absolute", left: 10 * s,
          top: (14 + i * 74) * s, width: W2 - 20 * s, height: 66 * s, zIndex: 3,
          borderRadius: 3 * s, background: mxh(c, 0.06),
          borderTop: `${2 * s}px solid ${mxh(c, 0.30)}`,
          borderBottom: `${3 * s}px solid ${dkh(c, 0.46)}`,
          transform: i === 1 ? `translateX(${open * 26 * s})` : undefined }}>
          {/* the recessed pull */}
          <div style={{ position: "absolute", left: "50%", top: 34 * s, marginLeft: -22 * s,
            width: 44 * s, height: 12 * s, borderRadius: 3 * s, background: dkh(c, 0.52) }} />
          {/* the label holder */}
          <div style={{ position: "absolute", left: 16 * s, top: 12 * s, width: 46 * s,
            height: 15 * s, borderRadius: 2 * s, background: PAPER }} />
        </div>
      ))}
      {/* the plinth */}
      <div style={{ position: "absolute", left: 8 * s, bottom: -10 * s, width: W2 - 16 * s,
        height: 12 * s, zIndex: 2, background: dkh(c, 0.60) }} />
      {label && (
        <div style={{ position: "absolute", left: "50%", top: -30 * s, transform: "translateX(-50%)",
          whiteSpace: "nowrap", zIndex: 6 }}>
          <span style={{ ...mono(12 * s, 800), color: hexa(CREAMB, 0.9), letterSpacing: 1.3 }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/** ⛔ S17's benches were a slab, a rounded rect and four moving bars. A real
    overnight desk is a top, two trestle legs, a MONITOR on a stand with code on
    it, a keyboard with visible keys, a mug and a task lamp throwing a pool —
    sixteen parts, and it is what makes a night floor read as a place people
    left rather than as furniture. */
export const NightDesk: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  seed?: number; lamp?: string }> =
  ({ x, y, s = 1, z = 38, f, seed = 0, lamp = "#F0D28C" }) => {
  const W2 = 236 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - 210 * s, width: W2,
      height: 210 * s, zIndex: z }}>
      {/* the top and its two trestles */}
      <div style={{ position: "absolute", left: 0, top: 128 * s, width: W2, height: 16 * s,
        borderRadius: 3 * s, zIndex: 4,
        background: `linear-gradient(180deg, ${mxh("#6E5A3E", 0.24)} 0%, ${dkh("#6E5A3E", 0.18)} 100%)` }} />
      {[10, W2 - 26].map((lx, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: lx, top: 144 * s, width: 16 * s,
          height: 66 * s, zIndex: 3, background: dkh("#6E5A3E", 0.44) }} />
      ))}
      {/* the monitor: bezel, screen with real code lines, stand, foot */}
      <div style={{ position: "absolute", left: 54 * s, top: 34 * s, width: 128 * s, height: 82 * s,
        zIndex: 5, borderRadius: 4 * s, background: dkh("#22262C", 0),
        border: `${4 * s}px solid ${dkh("#14171B", 0)}` }}>
        <div style={{ position: "absolute", inset: 5 * s, borderRadius: 2 * s, background: "#0D1420",
          overflow: "hidden" }}>
          {Array.from({ length: 6 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: 7 * s, top: (7 + j * 11) * s,
              width: (26 + ((j * 17 + seed * 13) % 62)) * s, height: 5 * s, borderRadius: 2,
              background: j % 3 === 0 ? hexa(CLAY, 0.85) : hexa(TEAL, 0.62) }} />
          ))}
          {/* the caret, still blinking hours after everyone left */}
          <div style={{ position: "absolute", left: 7 * s, top: 73 * s, width: 6 * s, height: 8 * s,
            background: (f + seed * 9) % 34 < 17 ? hexa(CREAMB, 0.9) : "transparent" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 110 * s, top: 116 * s, width: 16 * s, height: 14 * s,
        zIndex: 5, background: dkh("#22262C", 0.2) }} />
      {/* keyboard with keys, and a mug */}
      <div style={{ position: "absolute", left: 62 * s, top: 118 * s, width: 112 * s, height: 12 * s,
        zIndex: 6, borderRadius: 2 * s, background: mxh("#3A4048", 0.2),
        display: "flex", gap: 2 * s, padding: 2 * s, boxSizing: "border-box" }}>
        {Array.from({ length: 11 }, (_, j) => (
          <div key={j} style={{ flex: 1, background: dkh("#22262C", 0), borderRadius: 1 }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 190 * s, top: 106 * s, width: 24 * s, height: 26 * s,
        zIndex: 6, borderRadius: `2px 2px ${7 * s}px ${7 * s}px`, background: mxh(CLAY, 0.16) }} />
      <div style={{ position: "absolute", left: 212 * s, top: 112 * s, width: 12 * s, height: 12 * s,
        zIndex: 6, borderRadius: "50%", border: `${3 * s}px solid ${mxh(CLAY, 0.16)}` }} />
      {/* the task lamp still on */}
      <div style={{ position: "absolute", left: 22 * s, top: 62 * s, width: 7 * s, height: 66 * s,
        zIndex: 5, background: dkh(SLATE, 0.3) }} />
      <div style={{ position: "absolute", left: 4 * s, top: 44 * s, width: 44 * s, height: 22 * s,
        zIndex: 6, borderRadius: "42% 42% 6px 6px",
        background: `linear-gradient(180deg, ${dkh(SLATE, 0.2)} 0%, ${mxh(lamp, 0.14)} 100%)` }} />
    </div>
  );
};

/** ⛔⛔ THE VAULT WAS A GREY ROUNDED RECTANGLE WITH DOTS ON IT. The single most
    recognisable thing about a vault is that its door is ROUND — a circular slab
    in a square frame, with radial bolt-work, a spoked wheel, a hinge column and
    a time lock. Round beats rectangular before any detail is read, which is the
    whole point of the note. Twenty-three drawn parts. */
export const RoundVault: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  spin?: number; shove?: number; stencil?: string }> =
  ({ x, y, s = 1, z = 40, f = 0, spin = 0, shove = 0, stencil }) => {
  const D = 420 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D, width: D, height: D, zIndex: z,
      transform: `translateX(${shove * 4}px)` }}>
      {/* the square surround the round door sits in */}
      <div style={{ position: "absolute", left: -34 * s, top: -34 * s, width: D + 68 * s,
        height: D + 68 * s, borderRadius: 10 * s, zIndex: 1,
        background: `linear-gradient(154deg, ${mxh(STEEL, 0.14)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
      {/* the jamb ring */}
      <div style={{ position: "absolute", inset: -10 * s, borderRadius: "50%", zIndex: 2,
        background: `conic-gradient(from 210deg, ${dkh(STEEL, 0.52)}, ${mxh(STEEL, 0.20)}, ${dkh(STEEL, 0.56)}, ${mxh(STEEL, 0.12)}, ${dkh(STEEL, 0.52)})` }} />
      {/* THE ROUND SLAB */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", zIndex: 4,
        background: `radial-gradient(60% 60% at 34% 26%, ${mxh("#4A5460", 0.14)} 0%, ${dkh("#2A323C", 0.10)} 58%, ${dkh("#171D24", 0.10)} 100%)`,
        border: `${7 * s}px solid ${dkh("#0A0E12", 0)}` }} />
      {/* radial bolt-work: eight throw bolts around the rim */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <div key={"bl" + i} style={{ position: "absolute",
            left: D / 2 + Math.cos(a) * (D / 2 - 34 * s) - 15 * s,
            top: D / 2 + Math.sin(a) * (D / 2 - 34 * s) - 15 * s,
            width: 30 * s, height: 30 * s, borderRadius: 6 * s, zIndex: 6,
            background: `linear-gradient(160deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.42)} 100%)`,
            transform: `rotate(${(a * 180) / Math.PI}deg)` }} />
        );
      })}
      {/* two concentric machined rings */}
      {[0.70, 0.46].map((k, i) => (
        <div key={"rg" + i} style={{ position: "absolute", left: D * (1 - k) / 2, top: D * (1 - k) / 2,
          width: D * k, height: D * k, borderRadius: "50%", zIndex: 7,
          border: `${4 * s}px solid ${hexa("#000000", 0.30)}` }} />
      ))}
      {/* THE SPOKED WHEEL, dead centre — it spins and the door does not move */}
      <div style={{ position: "absolute", left: D / 2 - 84 * s, top: D / 2 - 84 * s, width: 168 * s,
        height: 168 * s, zIndex: 9, transform: `rotate(${spin}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
          border: `${17 * s}px solid ${dkh("#5E6874", 0.14)}` }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"sk" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: 76 * s, height: 13 * s, marginTop: -6.5 * s, borderRadius: 6 * s,
            transformOrigin: "0% 50%", transform: `rotate(${i * 72}deg)`,
            background: dkh("#4E5866", 0.06) }} />
        ))}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 40 * s, height: 40 * s,
          marginLeft: -20 * s, marginTop: -20 * s, borderRadius: "50%",
          background: dkh("#2C343E", 0), border: `${4 * s}px solid ${dkh(STEEL, 0.26)}` }} />
      </div>
      {/* the hinge column down the right flank */}
      <div style={{ position: "absolute", right: -46 * s, top: D * 0.16, width: 40 * s,
        height: D * 0.68, zIndex: 3, borderRadius: 6 * s,
        background: `linear-gradient(90deg, ${mxh(STEEL, 0.10)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
      {[0.2, 0.5, 0.8].map((k, i) => (
        <div key={"hg" + i} style={{ position: "absolute", right: -52 * s, top: D * (0.16 + k * 0.56),
          width: 52 * s, height: 34 * s, zIndex: 5, borderRadius: 6 * s, background: dkh(STEEL, 0.34) }} />
      ))}
      {/* the time lock, top left of the slab */}
      <div style={{ position: "absolute", left: D * 0.20, top: D * 0.19, width: 74 * s,
        height: 74 * s, borderRadius: "50%", zIndex: 10, background: "#EFE9DA",
        border: `${5 * s}px solid ${dkh(STEEL, 0.46)}` }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 7 * s,
            height: 2.6 * s, marginTop: -1.3 * s, transformOrigin: `${-(28 * s)}px 50%`,
            transform: `translateX(${28 * s}px) rotate(${i * 30}deg)`, background: "#241F18" }} />
        ))}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 3.4 * s, height: 24 * s,
          marginLeft: -1.7 * s, borderRadius: 2, transformOrigin: "50% 100%",
          transform: `rotate(${f * 1.4}deg) translateY(${-24 * s}px)`, background: "#B02A1E" }} />
      </div>
      {stencil && (
        <div style={{ position: "absolute", left: "50%", top: D * 0.76, transform: "translateX(-50%)",
          whiteSpace: "nowrap", zIndex: 11 }}>
          <span style={{ ...mono(15 * s, 800), color: hexa("#9FB4C6", 0.92), letterSpacing: 1.8 }}>
            {stencil}</span>
        </div>
      )}
    </div>
  );
};

/** ⛔ THE TILL WAS A GREY BOX WITH KEYS. A real register has a SLOPED head, a
    raised display housing on a neck, a keypad on a canted deck, a receipt spout
    with paper curling out of it, a coin drawer with a lip, and a bell. */
export const Register: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  roll?: number; drawer?: number }> =
  ({ x, y, s = 1, z = 40, f, roll = 0, drawer = 0 }) => {
  const W2 = 300 * s, H2 = 250 * s;
  return (
    <div style={{ position: "absolute", left: x - W2 / 2, top: y - H2, width: W2, height: H2, zIndex: z }}>
      {/* the canted body */}
      <div style={{ position: "absolute", left: 0, top: 92 * s, width: W2, height: H2 - 92 * s,
        zIndex: 3, borderRadius: 7 * s,
        background: `linear-gradient(172deg, ${mxh("#3E4A44", 0.20)} 0%, ${dkh("#3E4A44", 0.30)} 100%)`,
        border: `${5 * s}px solid ${dkh("#0A1410", 0)}`,
        clipPath: "polygon(0% 16%, 100% 0%, 100% 100%, 0% 100%)" }} />
      {/* the display head on its neck */}
      <div style={{ position: "absolute", left: 84 * s, top: 62 * s, width: 30 * s, height: 40 * s,
        zIndex: 2, background: dkh("#3E4A44", 0.44) }} />
      <div style={{ position: "absolute", left: 30 * s, top: 4 * s, width: 150 * s, height: 66 * s,
        zIndex: 4, borderRadius: 6 * s, background: dkh("#3E4A44", 0.16),
        border: `${5 * s}px solid ${dkh("#0A1410", 0)}` }}>
        <div style={{ position: "absolute", inset: 8 * s, borderRadius: 3 * s, background: "#0B1410" }} />
        <div style={{ position: "absolute", left: 16 * s, top: 22 * s, display: "flex", gap: 4 * s }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 26 * s, height: 30 * s, borderRadius: 2 * s,
              background: "#12241C", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(20 * s, 900), color: "#8ED8A8" }}>
                {String(Math.floor(f / (3 + i * 4)) % 10)}</span>
            </div>
          ))}
        </div>
      </div>
      {/* the keypad on the canted deck */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"ky" + i} style={{ position: "absolute", left: (24 + (i % 4) * 40) * s,
          top: (126 + Math.floor(i / 4) * 32) * s, width: 32 * s, height: 24 * s, zIndex: 6,
          borderRadius: 4 * s,
          background: i === 11 ? mxh(GOLD, 0.14) : mxh("#3E4A44", 0.30),
          border: `${2 * s}px solid ${dkh("#0A1410", 0.2)}` }} />
      ))}
      {/* the receipt spout, with paper curling out */}
      <div style={{ position: "absolute", right: 22 * s, top: 104 * s, width: 66 * s, height: 12 * s,
        zIndex: 7, borderRadius: 3 * s, background: dkh("#0A1410", 0) }} />
      {roll > 0.01 && (
        <div style={{ position: "absolute", right: 26 * s, top: 116 * s, width: 58 * s,
          height: roll * 130 * s, zIndex: 6, background: PAPER, borderRadius: `0 0 ${6 * s}px ${6 * s}px`,
          transform: `rotate(${roll * 7}deg)`, transformOrigin: "50% 0%" }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 7 * s, top: (11 + i * 22) * s,
              width: (30 - i * 3) * s, height: 4 * s, background: hexa("#2A2620", 0.4) }} />
          ))}
        </div>
      )}
      {/* the coin drawer with a lip */}
      <div style={{ position: "absolute", left: 14 * s, bottom: -6 * s - drawer * 26 * s,
        width: W2 - 28 * s, height: 34 * s, zIndex: 8, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${mxh("#3E4A44", 0.24)} 0%, ${dkh("#3E4A44", 0.40)} 100%)`,
        border: `${4 * s}px solid ${dkh("#0A1410", 0)}` }}>
        <div style={{ position: "absolute", left: "50%", top: 11 * s, marginLeft: -30 * s,
          width: 60 * s, height: 10 * s, borderRadius: 3 * s, background: dkh("#0A1410", 0) }} />
      </div>
      {/* the bell */}
      <div style={{ position: "absolute", right: 16 * s, top: 22 * s, width: 34 * s, height: 22 * s,
        zIndex: 5, borderRadius: `${17 * s}px ${17 * s}px 3px 3px`, background: mxh(BRASS, 0.10) }} />
    </div>
  );
};

/** a real clock face. ⛔ Round 11 shipped TWO blank white discs in this reel (the
    rig's gauges and the night-floor clock) and both read as nothing. A dial is
    recognised by its FACE: a bezel, twelve markers, numerals at the quarters and
    two hands of different lengths. */
export const ClockFace: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  rate?: number; c?: string }> = ({ x, y, s = 1, z = 60, f, rate = 1, c = "#241F18" }) => {
  const D = 116 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `linear-gradient(160deg, ${mxh(SLATE, 0.24)} 0%, ${dkh(SLATE, 0.40)} 100%)` }} />
      <div style={{ position: "absolute", inset: 7 * s, borderRadius: "50%", background: "#F4EFE2" }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%",
          width: (i % 3 === 0 ? 13 : 7) * s, height: (i % 3 === 0 ? 4.4 : 2.6) * s,
          marginTop: -2 * s, borderRadius: 1,
          transformOrigin: `${-(D / 2 - 15 * s)}px 50%`,
          transform: `translateX(${D / 2 - 15 * s}px) rotate(${i * 30}deg)`, background: c }} />
      ))}
      {/* hour hand, short and fat; minute hand, long and thin */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 7 * s, height: D * 0.22,
        marginLeft: -3.5 * s, borderRadius: 4, transformOrigin: "50% 100%",
        transform: `rotate(${f * rate * 0.6 + 30}deg) translateY(${-D * 0.22}px)`, background: c }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 4 * s, height: D * 0.34,
        marginLeft: -2 * s, borderRadius: 3, transformOrigin: "50% 100%",
        transform: `rotate(${f * rate * 7.2}deg) translateY(${-D * 0.34}px)`, background: c }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 12 * s, height: 12 * s,
        marginLeft: -6 * s, marginTop: -6 * s, borderRadius: "50%", background: "#B02A1E" }} />
    </div>
  );
};

/* =========================================================================
   ROUND 50 PROPS — the eight redos.
   ⛔ Every one of these is drawn to the house bar (12-16 parts on anything the
   camera looks at) and every one of them has an ASYMMETRY, because a rotating
   object with N-fold symmetry turning through 360/N degrees is invisible.
   ====================================================================== */

/* THE HANDWHEEL — a spoked valve wheel. ⛔ THE GRAB HANDLE IS NOT DECORATION:
   a five-spoke wheel is five-fold symmetric and a viewer cannot see it turn
   without one feature that breaks the symmetry. Positions by CENTRE. */
export const Handwheel: React.FC<{ x: number; y: number; s?: number; z?: number;
  turn: number; hot?: number }> = ({ x, y, s = 1, z = 60, turn, hot = 0 }) => {
  const D = 260 * s, R2 = D / 2;
  return (
    <div style={{ position: "absolute", left: x - R2, top: y - R2, width: D, height: D,
      zIndex: z, transform: `rotate(${turn}deg)` }}>
      {/* the rim — a cast torus, lit from upper left */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        border: `${20 * s}px solid ${dkh("#5A4038", 0.10)}`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", inset: 5 * s, borderRadius: "50%",
        border: `${11 * s}px solid ${mxh("#7A5A4A", 0.16)}`, opacity: 0.7 }} />
      <div style={{ position: "absolute", inset: 15 * s, borderRadius: "50%",
        border: `${5 * s}px solid ${hexa("#000", 0.34)}` }} />
      {/* five spokes, tapered — thick at the hub, thin at the rim */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"sp" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: 21 * s, height: R2 - 6 * s, marginLeft: -10.5 * s,
          transformOrigin: "50% 0%", transform: `rotate(${i * 72}deg)`,
          clipPath: "polygon(0% 0%, 100% 0%, 74% 100%, 26% 100%)",
          background: `linear-gradient(96deg, ${mxh("#7A5A4A", 0.20)} 0%, ${dkh("#5A4038", 0.30)} 100%)` }} />
      ))}
      {/* the hub, its nut and its keyway */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 78 * s, height: 78 * s,
        marginLeft: -39 * s, marginTop: -39 * s, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 36% 30%, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.30)} 78%, ${dkh(BRASS, 0.52)} 100%)`,
        border: `${5 * s}px solid ${dkh("#231712", 0)}` }} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={"nb" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: 9 * s, height: 9 * s, marginLeft: -4.5 * s, marginTop: -4.5 * s,
          borderRadius: "50%", background: dkh("#231712", 0),
          transform: `rotate(${i * 60}deg) translateY(${-25 * s}px)` }} />
      ))}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 14 * s, height: 14 * s,
        marginLeft: -7 * s, marginTop: -7 * s, borderRadius: 2, background: dkh("#120C09", 0) }} />
      {/* ⭐ THE GRAB HANDLE — the one asymmetric feature, and the only reason
             the spin reads at all. A knurled grip on a stub off the rim. */}
      <div style={{ position: "absolute", left: "50%", top: 2 * s, width: 15 * s, height: 30 * s,
        marginLeft: -7.5 * s, borderRadius: 3, background: dkh("#3A2A22", 0) }} />
      <div style={{ position: "absolute", left: "50%", top: -30 * s, width: 27 * s, height: 46 * s,
        marginLeft: -13.5 * s, borderRadius: 13 * s, boxShadow: SH,
        background: `linear-gradient(96deg, ${mxh("#B24A34", 0.24)} 0%, ${dkh("#B24A34", 0.28)} 100%)` }}>
        {[0, 1, 2, 3].map(i => (
          <div key={"kn" + i} style={{ position: "absolute", left: 3 * s, right: 3 * s,
            top: (9 + i * 8) * s, height: 3 * s, background: hexa("#000", 0.24) }} />
        ))}
      </div>
      {/* the heat that comes up through it as the seal gives */}
      {hot > 0.02 && (
        <div style={{ position: "absolute", inset: -18 * s, borderRadius: "50%",
          opacity: hot * 0.7, filter: `blur(${14 * s}px)`,
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa(GOLD, 0.7)} 0%, ${hexa(GOLD, 0)} 72%)` }} />
      )}
    </div>
  );
};

/* THE DOG BOLT — one of the six that a handwheel retracts. Positions by CENTRE
   of its travel; `out` 1 = shot home, 0 = withdrawn. */
export const DogBolt: React.FC<{ x: number; y: number; s?: number; z?: number;
  ang: number; out: number }> = ({ x, y, s = 1, z = 60, ang, out }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z,
    transform: `rotate(${ang}deg)` }}>
    <div style={{ position: "absolute", left: -14 * s, top: (-8 - out * 42) * s,
      width: 28 * s, height: 62 * s, borderRadius: 5 * s, boxShadow: SH,
      background: `linear-gradient(96deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.34)} 100%)` }}>
      <div style={{ position: "absolute", left: 4 * s, right: 4 * s, top: 10 * s, height: 5 * s,
        background: hexa("#000", 0.30) }} />
      <div style={{ position: "absolute", left: 4 * s, right: 4 * s, top: 24 * s, height: 5 * s,
        background: hexa("#000", 0.30) }} />
    </div>
    <div style={{ position: "absolute", left: -20 * s, top: -14 * s, width: 40 * s, height: 22 * s,
      borderRadius: 3, background: dkh("#1A1410", 0) }} />
  </div>
);

/* THE PARAMETER DIAL — one setting. LOD by size: below s 0.34 the ticks and the
   screw are smaller than the 8px the downsample can see, so they are not drawn
   at all rather than drawn as mush. */
export const ParamDial: React.FC<{ x: number; y: number; s?: number; z?: number;
  ang: number; lit?: number }> = ({ x, y, s = 1, z = 40, ang, lit = 1 }) => {
  const D = 92 * s, fine = s > 0.34;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D,
      zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `linear-gradient(140deg, ${mxh(BRASS, 0.26)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
        border: `${Math.max(1.5, 4 * s)}px solid ${dkh("#2A1E14", 0)}`, boxShadow: s > 0.5 ? SH : undefined }} />
      <div style={{ position: "absolute", inset: D * 0.14, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 36% 30%, ${mxh(CREAMB, 0.10)} 0%, ${dkh(CREAMB, 0.12 + (1 - lit) * 0.30)} 100%)` }} />
      {fine && [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: 2.6 * s, height: 8 * s, marginLeft: -1.3 * s,
          transformOrigin: "50% 50%", background: hexa("#5A4B36", 0.6),
          transform: `rotate(${i * 45}deg) translateY(${-D * 0.30}px)` }} />
      ))}
      {/* the needle — the part that says SETTING, and the only moving one */}
      <div style={{ position: "absolute", left: "50%", top: "50%",
        width: Math.max(2, 5 * s), height: D * 0.31, marginLeft: -Math.max(1, 2.5 * s),
        borderRadius: 3, transformOrigin: "50% 100%", background: "#B02A1E",
        transform: `rotate(${ang}deg) translateY(${-D * 0.31}px)` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: Math.max(3, 11 * s),
        height: Math.max(3, 11 * s), marginLeft: -Math.max(1.5, 5.5 * s), marginTop: -Math.max(1.5, 5.5 * s),
        borderRadius: "50%", background: dkh("#2A1E14", 0) }} />
      {fine && (
        <div style={{ position: "absolute", left: "50%", bottom: 5 * s, width: 12 * s, height: 3 * s,
          marginLeft: -6 * s, background: hexa("#3A2E1E", 0.5) }} />
      )}
    </div>
  );
};

/* A BANDED BRICK OF NOTES. Positions by BOTTOM-LEFT. */
export const CashBrick: React.FC<{ x: number; y: number; s?: number; z?: number;
  rot?: number }> = ({ x, y, s = 1, z = 50, rot = 0 }) => {
  const Wb = 116 * s, Hb = 40 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - Hb, width: Wb, height: Hb, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 2 * s, boxShadow: SH,
        background: `linear-gradient(174deg, ${mxh("#C6D8B8", 0.22)} 0%, ${dkh("#93AC82", 0.10)} 100%)`,
        border: `${2.5 * s}px solid ${dkh("#5E7350", 0.10)}` }} />
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"lf" + i} style={{ position: "absolute", left: 3 * s, right: 3 * s,
          top: (6 + i * 6.4) * s, height: 2 * s, background: hexa("#4C6040", 0.30) }} />
      ))}
      <div style={{ position: "absolute", left: Wb * 0.30, top: -2 * s, width: 20 * s,
        height: Hb + 4 * s, background: `linear-gradient(96deg, ${mxh(PAPER, 0.06)} 0%, ${dkh(PAPER, 0.14)} 100%)`,
        border: `${2 * s}px solid ${hexa("#8A7F6A", 0.5)}` }} />
      <div style={{ position: "absolute", left: Wb * 0.30 + 4 * s, top: Hb * 0.30, width: 12 * s,
        height: 4 * s, background: hexa("#8A2A1E", 0.65) }} />
    </div>
  );
};

/* A SACK TRUCK. Positions by BOTTOM-CENTRE of the wheels. */
export const HandTruck: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; roll?: number; lean?: number }> =
  ({ x, y, s = 1, z = 50, f = 0, roll = 0, lean = 0 }) => {
  const Wt = 190 * s, Ht = 330 * s;
  return (
    <div style={{ position: "absolute", left: x - Wt / 2, top: y - Ht, width: Wt, height: Ht,
      zIndex: z, transform: `rotate(${lean}deg)`, transformOrigin: "50% 92%" }}>
      {/* the two uprights */}
      {[0.10, 0.72].map((u, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: Wt * u, top: 0,
          width: 22 * s, height: Ht - 26 * s, borderRadius: 4 * s,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.36)} 100%)` }} />
      ))}
      {/* three cross braces */}
      {[0.06, 0.42, 0.74].map((b, i) => (
        <div key={"br" + i} style={{ position: "absolute", left: Wt * 0.10, top: Ht * b,
          width: Wt * 0.62 + 22 * s, height: 15 * s, borderRadius: 3 * s,
          background: dkh(STEEL, 0.30) }} />
      ))}
      {/* the handles, bent out at the top */}
      {[0.10, 0.72].map((u, i) => (
        <div key={"hd" + i} style={{ position: "absolute", left: Wt * u + (i ? 14 : -22) * s,
          top: -6 * s, width: 40 * s, height: 20 * s, borderRadius: 10 * s,
          background: dkh("#2A2620", 0) }} />
      ))}
      {/* the toe plate */}
      <div style={{ position: "absolute", left: -14 * s, top: Ht - 44 * s, width: Wt + 28 * s,
        height: 20 * s, borderRadius: 3 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      {/* two wheels with hubs and a spoke each, so the roll reads */}
      {[0.02, 0.80].map((w, i) => (
        <div key={"wh" + i} style={{ position: "absolute", left: Wt * w, top: Ht - 62 * s,
          width: 62 * s, height: 62 * s, borderRadius: "50%",
          background: `radial-gradient(50% 50% at 38% 32%, ${mxh("#2A2620", 0.20)} 0%, ${dkh("#15120E", 0)} 100%)`,
          border: `${5 * s}px solid ${dkh("#0C0A08", 0)}`,
          transform: `rotate(${roll}deg)` }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 20 * s, height: 20 * s,
            marginLeft: -10 * s, marginTop: -10 * s, borderRadius: "50%", background: mxh(BRASS, 0.06) }} />
          <div style={{ position: "absolute", left: "50%", top: 6 * s, width: 6 * s, height: 22 * s,
            marginLeft: -3 * s, background: hexa("#FFF", 0.24) }} />
        </div>
      ))}
    </div>
  );
};

/* A NOTE COUNTER — the desk machine that riffles a stack and spits bricks.
   Positions by BOTTOM-CENTRE. `run` drives the riffle; `out` the stacker lamp. */
export const NoteCounter: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; run: number }> = ({ x, y, s = 1, z = 50, f = 0, run }) => {
  const Wn = 300 * s, Hn = 200 * s;
  return (
    <div style={{ position: "absolute", left: x - Wn / 2, top: y - Hn, width: Wn, height: Hn, zIndex: z }}>
      {/* the body, with a moulded brow over the throat */}
      <div style={{ position: "absolute", left: 0, top: Hn * 0.34, width: Wn, height: Hn * 0.66,
        borderRadius: `${8 * s}px ${8 * s}px ${5 * s}px ${5 * s}px`, boxShadow: SH_D,
        background: `linear-gradient(174deg, ${mxh("#3E4650", 0.18)} 0%, ${dkh("#2A313A", 0.14)} 100%)`,
        border: `${5 * s}px solid ${dkh("#12161B", 0)}` }} />
      <div style={{ position: "absolute", left: Wn * 0.06, top: Hn * 0.20, width: Wn * 0.88,
        height: Hn * 0.20, borderRadius: `${6 * s}px ${6 * s}px 0 0`,
        background: `linear-gradient(174deg, ${mxh("#4A535E", 0.14)} 0%, ${dkh("#2A313A", 0.06)} 100%)`,
        border: `${4 * s}px solid ${dkh("#12161B", 0)}` }} />
      {/* the hopper throat, and the stack standing in it */}
      <div style={{ position: "absolute", left: Wn * 0.16, top: Hn * 0.02, width: Wn * 0.44,
        height: Hn * 0.24, background: dkh("#0E1216", 0), borderRadius: 3 * s }} />
      {/* ⭐ THE RIFFLE — the notes fanning through, and it never stops while it
             runs. Nine leaves on a phase offset is what a counting machine
             actually looks like, and it is the continuous motion in the shot. */}
      {Array.from({ length: 9 }, (_, i) => {
        const t = ((f * 0.09 * run + i / 9) % 1);
        return (
          <div key={"rf" + i} style={{ position: "absolute", left: Wn * 0.17 + t * Wn * 0.40,
            top: Hn * 0.03 + Math.sin(t * Math.PI) * -8 * s, width: 14 * s, height: Hn * 0.22,
            borderRadius: 2, opacity: run > 0.05 ? 1 : 0.4,
            transform: `rotate(${-24 + t * 44}deg)`,
            background: `linear-gradient(96deg, ${mxh("#C6D8B8", 0.24)} 0%, ${dkh("#93AC82", 0.10)} 100%)` }} />
        );
      })}
      {/* the drive roller, turning, visible through a cut in the shell */}
      <div style={{ position: "absolute", left: Wn * 0.64, top: Hn * 0.40, width: 62 * s,
        height: 62 * s, borderRadius: "50%", background: dkh("#0E1216", 0),
        border: `${4 * s}px solid ${dkh(STEEL, 0.44)}`,
        transform: `rotate(${f * 16 * run}deg)` }}>
        {[0, 1, 2].map(i => (
          <div key={"rk" + i} style={{ position: "absolute", left: "50%", top: 4 * s,
            width: 5 * s, height: 24 * s, marginLeft: -2.5 * s, background: hexa("#8AA0B0", 0.5),
            transformOrigin: "50% 25px", transform: `rotate(${i * 120}deg)` }} />
        ))}
      </div>
      {/* the read-out window — a LEVEL, never a digit */}
      <div style={{ position: "absolute", left: Wn * 0.08, top: Hn * 0.46, width: Wn * 0.46,
        height: 30 * s, borderRadius: 3 * s, background: dkh("#0A1410", 0),
        border: `${3 * s}px solid ${dkh("#12161B", 0)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${Math.min(100, run * 100)}%`, background: hexa("#7BE0A0", 0.66) }} />
      </div>
      {/* the stacker slot the brick comes out of, and the feet */}
      <div style={{ position: "absolute", left: Wn * 0.08, top: Hn * 0.74, width: Wn * 0.84,
        height: 22 * s, borderRadius: 3 * s, background: dkh("#0A0E12", 0) }} />
      {[0.06, 0.84].map((fx, i) => (
        <div key={"ft" + i} style={{ position: "absolute", left: Wn * fx, top: Hn - 6 * s,
          width: 34 * s, height: 10 * s, borderRadius: 3 * s, background: dkh("#12161B", 0) }} />
      ))}
    </div>
  );
};

/* THE STAMPER — a cast print head on a rail over a paper strip. `load` winds the
   spring; `hit` drives the ram. Positions by BOTTOM-CENTRE of the bed. */
export const Stamper: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; load: number; hit: number; glyphs: number; feed?: number }> =
  ({ x, y, s = 1, z = 60, f = 0, load, hit, glyphs, feed = 0 }) => {
  const Ws = 620 * s, Hs = 470 * s;
  const drop = hit * 108 * s;
  return (
    <div style={{ position: "absolute", left: x - Ws / 2, top: y - Hs, width: Ws, height: Hs, zIndex: z }}>
      {/* the bed, its rails, and the paper strip running through */}
      <div style={{ position: "absolute", left: 0, top: Hs - 96 * s, width: Ws, height: 44 * s,
        borderRadius: 4 * s, boxShadow: SH_D,
        background: `linear-gradient(180deg, ${mxh("#3A4048", 0.20)} 0%, ${dkh("#242A31", 0.12)} 100%)` }} />
      <div style={{ position: "absolute", left: -30 * s, top: Hs - 132 * s, width: Ws + 60 * s,
        height: 40 * s, background: `linear-gradient(180deg, ${PAPER} 0%, ${mxh(PAPER, -0.05)} 100%)`,
        boxShadow: SH }} />
      {/* ⭐ SPROCKET HOLES — a paper strip with no holes cannot be seen to
             ADVANCE, and "one token every ten seconds" is entirely about how far
             the paper has NOT moved. They step one notch per strike. */}
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute",
          left: (-18 + i * 52 - feed * 52) * s, top: Hs - 128 * s,
          width: 13 * s, height: 13 * s, borderRadius: "50%",
          background: hexa("#8A7F6A", 0.5) }} />
      ))}
      {/* the glyphs it has managed — and there are almost none of them */}
      {Array.from({ length: Math.max(0, glyphs) }, (_, i) => (
        <div key={"gl" + i} style={{ position: "absolute",
          left: (34 + i * 62 - feed * 52) * s, top: Hs - 112 * s,
          width: 30 * s, height: 28 * s, borderRadius: 2,
          background: hexa("#241C12", 0.88),
          clipPath: i % 2 ? "polygon(0 0,100% 0,100% 62%,54% 62%,54% 100%,0 100%)"
                          : "polygon(0 0,66% 0,100% 40%,100% 100%,0 100%)" }} />
      ))}
      {/* ⭐ AND THE CURSOR — a blinking underscore in the slot the next glyph is
             owed to. It is the only thing on a metre of empty paper. */}
      <div style={{ position: "absolute", left: (34 + glyphs * 62 - feed * 52) * s,
        top: Hs - 88 * s, width: 30 * s, height: 7 * s, borderRadius: 2,
        opacity: (f % 26) < 15 ? 0.9 : 0.15, background: hexa("#241C12", 0.8) }} />
      {/* the two guide columns and the top beam */}
      {[0.20, 0.72].map((c, i) => (
        <div key={"cl" + i} style={{ position: "absolute", left: Ws * c, top: 40 * s,
          width: 22 * s, height: Hs - 170 * s,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.40)} 0%, ${mxh(STEEL, 0.16)} 44%, ${dkh(STEEL, 0.48)} 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: Ws * 0.10, top: 0, width: Ws * 0.80, height: 44 * s,
        borderRadius: 5 * s, boxShadow: SH_D,
        background: `linear-gradient(180deg, ${mxh("#5A4038", 0.20)} 0%, ${dkh("#3A2A22", 0.16)} 100%)` }} />
      {/* ⭐ THE SPRING — it is the ANTICIPATION. Eight coils that visibly close
             up as the load winds on, so the strike is owed before it lands. */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"cs" + i} style={{ position: "absolute", left: Ws * 0.40, top: (54 + i * (22 - load * 13)) * s,
          width: Ws * 0.20, height: 11 * s, borderRadius: 6 * s,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.26)} 0%, ${dkh(BRASS, 0.34)} 100%)` }} />
      ))}
      {/* the carriage on the columns, and the ram under it */}
      <div style={{ position: "absolute", left: Ws * 0.14, top: (232 - load * 26) * s + drop,
        width: Ws * 0.72, height: 74 * s, borderRadius: 5 * s, boxShadow: SH_D,
        background: `linear-gradient(174deg, ${mxh("#4A535E", 0.18)} 0%, ${dkh("#2A313A", 0.12)} 100%)`,
        border: `${5 * s}px solid ${dkh("#12161B", 0)}` }}>
        {[0.10, 0.78].map((g, i) => (
          <div key={"dv" + i} style={{ position: "absolute", left: `${g * 100}%`, top: 10 * s,
            width: 30 * s, height: 52 * s, borderRadius: 3, background: dkh("#1A1F26", 0) }} />
        ))}
        <div style={{ position: "absolute", left: "38%", top: 20 * s, width: 24 * s, height: 24 * s,
          borderRadius: "50%", background: hit > 0.5 ? "#FF7A3C" : dkh(EMBER, 0.44) }} />
      </div>
      <div style={{ position: "absolute", left: Ws * 0.42, top: (306 - load * 26) * s + drop,
        width: Ws * 0.16, height: 62 * s,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.42)} 0%, ${mxh(STEEL, 0.18)} 46%, ${dkh(STEEL, 0.50)} 100%)` }} />
      {/* ⭐ THE TYPE BLOCK CARRIES THE GLYPH IT IS ABOUT TO PRINT — the reason
             the shot was unreadable is that the cause was invisible: a slab came
             down and a mark appeared. Now you can see WHAT is coming. */}
      <div style={{ position: "absolute", left: Ws * 0.38, top: (366 - load * 26) * s + drop,
        width: Ws * 0.24, height: 46 * s, borderRadius: 3 * s, boxShadow: SH,
        background: `linear-gradient(174deg, ${mxh("#7A5A4A", 0.20)} 0%, ${dkh("#3A2A22", 0.14)} 100%)` }}>
        <div style={{ position: "absolute", left: "36%", top: 8 * s, width: 30 * s, height: 28 * s,
          borderRadius: 2, background: hexa("#F0E4D4", 0.92),
          clipPath: glyphs % 2 ? "polygon(0 0,66% 0,100% 40%,100% 100%,0 100%)"
                               : "polygon(0 0,100% 0,100% 62%,54% 62%,54% 100%,0 100%)" }} />
        <div style={{ position: "absolute", left: 6 * s, right: 6 * s, bottom: 4 * s,
          height: 5 * s, background: hexa("#000", 0.34) }} />
      </div>
    </div>
  );
};

/* =========================================================================
   ROUND 52 — THE ALARM FAMILY.
   ⛔ AN ACCENT SET IS ONLY AS LEGIBLE AS ITS WORST MEMBER, so these five are
   built as ONE system and planted in escalation order: a breaker trips at 22s,
   a relief valve lifts at 25s, the beacon and the X land at 29s, the hall is
   still sweeping at 33s, the cause is pinned at 39s, and the tick answers the X
   at 45s. Scattered decoration reads as noise; a sequence reads as a story.
   ====================================================================== */

/* THE BEACON — the fixture. Its light is `BeaconSweep`, a separate export so a
   scene can put the CONE behind the room and the LAMP in front of it. Both are
   driven by the same `f * rate`, so they cannot drift apart.
   Positions by TOP-CENTRE of the bracket; it hangs. */
export const Beacon: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; on: number; rate?: number; c?: string }> =
  ({ x, y, s = 1, z = 70, f = 0, on, rate = 9, c = "#FF3A24" }) => {
  const D = 96 * s, ang = f * rate;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y, width: D, height: 178 * s, zIndex: z }}>
      {/* the bracket it hangs off, and its two bolts */}
      <div style={{ position: "absolute", left: -14 * s, top: 0, width: D + 28 * s, height: 20 * s,
        borderRadius: 3 * s, background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
      {[0.06, 0.82].map((b, i) => (
        <div key={"bt" + i} style={{ position: "absolute", left: (D + 28 * s) * b - 14 * s + 6 * s,
          top: 4 * s, width: 12 * s, height: 12 * s, borderRadius: "50%", background: dkh("#0A0E12", 0) }} />
      ))}
      <div style={{ position: "absolute", left: D / 2 - 9 * s, top: 18 * s, width: 18 * s,
        height: 26 * s, background: dkh(STEEL, 0.46) }} />
      {/* the cast base, its cooling fins, and the gasket ring */}
      <div style={{ position: "absolute", left: 4 * s, top: 42 * s, width: D - 8 * s, height: 30 * s,
        borderRadius: 5 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh("#4A535E", 0.16)} 0%, ${dkh("#2A313A", 0.12)} 100%)` }} />
      {[0, 1, 2].map(i => (
        <div key={"fn" + i} style={{ position: "absolute", left: 8 * s, right: 8 * s,
          top: (48 + i * 8) * s, height: 3 * s, background: hexa("#000", 0.30) }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 68 * s, width: D, height: 12 * s,
        borderRadius: 4 * s, background: dkh(BRASS, 0.30) }} />
      {/* the dome, and the mirror TURNING inside it — the asymmetry is the
          whole point, exactly as on `Handwheel` */}
      <div style={{ position: "absolute", left: 6 * s, top: 76 * s, width: D - 12 * s, height: D - 12 * s,
        borderRadius: "50% 50% 46% 46%", overflow: "hidden",
        background: `radial-gradient(50% 46% at 50% 40%, ${hexa(c, 0.30 + on * 0.60)} 0%, ${hexa(c, 0.14 + on * 0.42)} 72%, ${hexa(c, 0.30)} 100%)`,
        border: `${4 * s}px solid ${hexa("#D8CDB4", 0.22)}`,
        boxShadow: on > 0.05 ? `0 0 ${44 * s * on}px ${hexa(c, 0.72 * on)}` : "none" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: (D - 12 * s) * 0.9,
          height: 22 * s, marginLeft: -(D - 12 * s) * 0.45, marginTop: -11 * s,
          transform: `rotate(${ang}deg)`, opacity: on,
          background: `linear-gradient(90deg, ${hexa("#FFF", 0)} 0%, ${hexa("#FFE8D8", 0.92)} 50%, ${hexa("#FFF", 0)} 100%)` }} />
      </div>
      {/* the wire cage over it — five ribs and two hoops */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"rb" + i} style={{ position: "absolute", left: D / 2 - 2 * s, top: 76 * s,
          width: 4 * s, height: D - 12 * s, background: hexa("#1A1F26", 0.72),
          transformOrigin: "50% 100%", transform: `rotate(${-52 + i * 26}deg)` }} />
      ))}
      {[0.24, 0.62].map((h, i) => (
        <div key={"hp" + i} style={{ position: "absolute", left: 6 * s + (D - 12 * s) * 0.06,
          top: 76 * s + (D - 12 * s) * h, width: (D - 12 * s) * 0.88, height: 4 * s,
          borderRadius: 2, background: hexa("#1A1F26", 0.66) }} />
      ))}
    </div>
  );
};

/* THE SWEEP — the cone the beacon throws. ⭐ THIS is the motion: a 900px wedge
   crossing the panel repaints more of the frame per 0.1s than anything else in
   this reel, and it costs one div. */
export const BeaconSweep: React.FC<{ x: number; y: number; len?: number; wide?: number;
  z?: number; f?: number; on: number; rate?: number; c?: string; ph?: number }> =
  ({ x, y, len = 900, wide = 300, z = 20, f = 0, on, rate = 9, c = "#FF3A24", ph = 0 }) => {
  if (on <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: x - wide / 2, top: y, width: wide, height: len,
      zIndex: z, pointerEvents: "none", transformOrigin: "50% 0%",
      transform: `rotate(${f * rate + ph}deg)`, opacity: on * 0.70, filter: "blur(16px)",
      clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)",
      background: `linear-gradient(180deg, ${hexa(c, 0.92)} 0%, ${hexa(c, 0.34)} 62%, ${hexa(c, 0)} 100%)` }} />
  );
};

/* THE KLAXON — a horn, and it JUDDERS. Positions by BOTTOM-CENTRE of the mount. */
export const Klaxon: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; on: number; flip?: boolean }> =
  ({ x, y, s = 1, z = 70, f = 0, on, flip = false }) => {
  const shake = on > 0.05 ? Math.sin(f * 3.4) * 3.2 * on : 0;
  return (
    <div style={{ position: "absolute", left: x - 90 * s, top: y - 130 * s, width: 180 * s,
      height: 130 * s, zIndex: z,
      transform: `translate(${shake}px, ${shake * 0.5}px) scaleX(${flip ? -1 : 1})` }}>
      {/* the mount plate and its arm */}
      <div style={{ position: "absolute", left: 0, top: 34 * s, width: 20 * s, height: 62 * s,
        borderRadius: 3 * s, background: `linear-gradient(96deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      <div style={{ position: "absolute", left: 18 * s, top: 52 * s, width: 26 * s, height: 24 * s,
        background: dkh(STEEL, 0.36) }} />
      {/* the driver can, with its ribs */}
      <div style={{ position: "absolute", left: 40 * s, top: 34 * s, width: 52 * s, height: 62 * s,
        borderRadius: 6 * s, boxShadow: SH_D,
        background: `linear-gradient(178deg, ${mxh("#5A4038", 0.20)} 0%, ${dkh("#3A2A22", 0.16)} 100%)`,
        border: `${4 * s}px solid ${dkh("#1A100C", 0)}` }}>
        {[0, 1, 2].map(i => (
          <div key={"rr" + i} style={{ position: "absolute", left: 4 * s, right: 4 * s,
            top: (12 + i * 14) * s, height: 4 * s, background: hexa("#000", 0.26) }} />
        ))}
      </div>
      {/* THE BELL — a flared mouth, and it is the silhouette people know */}
      <div style={{ position: "absolute", left: 88 * s, top: 12 * s, width: 84 * s, height: 106 * s,
        clipPath: "polygon(0% 26%, 0% 74%, 100% 100%, 100% 0%)", boxShadow: SH_D,
        background: `linear-gradient(178deg, ${mxh(BRASS, 0.26)} 0%, ${dkh(BRASS, 0.20)} 46%, ${dkh(BRASS, 0.44)} 100%)` }} />
      <div style={{ position: "absolute", left: 160 * s, top: 8 * s, width: 14 * s, height: 114 * s,
        borderRadius: 7 * s, background: `linear-gradient(96deg, ${mxh(BRASS, 0.34)} 0%, ${dkh(BRASS, 0.30)} 100%)` }} />
      {/* the blast — rings leaving the mouth while it is on */}
      {on > 0.05 && [0, 1, 2].map(i => {
        const t = ((f * 0.09 + i / 3) % 1);
        return (
          <div key={"bl" + i} style={{ position: "absolute", left: (168 + t * 54) * s,
            top: (58 - t * 46) * s, width: 8 * s, height: (18 + t * 96) * s,
            borderRadius: 6 * s, opacity: on * (1 - t) * 0.7,
            border: `${4 * s}px solid ${hexa("#FFD8B8", 0.8)}`,
            borderLeft: "none", borderTop: "none", borderBottom: "none" }} />
        );
      })}
    </div>
  );
};

/* THE VERDICT — two strokes that SLAM in, one after the other. `kind` "x" is the
   hardware's answer at 29s; `kind` "tick" is the API's at 45s, and they are the
   same object so the rhyme lands. Positions by CENTRE. */
export const Verdict: React.FC<{ x: number; y: number; s?: number; z?: number;
  kind?: "x" | "tick"; a: number; b: number; c?: string }> =
  ({ x, y, s = 1, z = 80, kind = "x", a, b, c = "#E23A1E" }) => {
  const D = 300 * s, T = 46 * s;
  /* ⛔ THE TWO KINDS DO NOT SHARE A LAYOUT. An X is two bars through one CENTRE;
     a tick is two bars joined END TO END at the elbow, so its bars have to be
     positioned by their START point and grown from it. Sharing one placement
     put the tick's short arm on top of its long one and it read as a slash. */
  const bar = (sx: number, sy: number, rot: number, len: number, k: number,
               origin: string) => (
    <div style={{ position: "absolute", left: sx, top: sy - T / 2, width: len, height: T,
      borderRadius: T * 0.16, opacity: k > 0.01 ? 1 : 0,
      transformOrigin: origin,
      transform: `rotate(${rot}deg) scaleX(${k}) scaleY(${0.72 + k * 0.28})`,
      background: `linear-gradient(178deg, ${mxh(c, 0.20)} 0%, ${c} 42%, ${dkh(c, 0.22)} 100%)`,
      boxShadow: `0 ${8 * s}px ${18 * s}px ${hexa("#000", 0.45)}` }} />
  );
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D,
      zIndex: z, pointerEvents: "none",
      transform: `scale(${1 + (1 - Math.max(a, b)) * 0.10}) rotate(${kind === "x" ? -2 : -4}deg)` }}>
      {kind === "x" ? (<>
        {bar(D * 0.01, D * 0.50, 42, D * 0.98, a, "50% 50%")}
        {bar(D * 0.01, D * 0.50, -42, D * 0.98, b, "50% 50%")}
      </>) : (<>
        {/* the elbow sits at (0.40D, 0.80D); the short arm runs INTO it and the
            long arm runs OUT of it, both grown from their own start */}
        {bar(D * 0.12, D * 0.52, 46, D * 0.40, a, "0% 50%")}
        {bar(D * 0.40, D * 0.80, -54, D * 0.76, b, "0% 50%")}
      </>)}
    </div>
  );
};

/* A SPRING RELIEF VALVE — the thing that lifts when a boiler has had enough.
   Positions by BOTTOM-CENTRE of its flange. */
export const ReliefValve: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; lift: number }> = ({ x, y, s = 1, z = 50, f = 0, lift }) => {
  const Wv = 120 * s, Hv = 190 * s;
  return (
    <div style={{ position: "absolute", left: x - Wv / 2, top: y - Hv, width: Wv, height: Hv, zIndex: z }}>
      {/* the flange it is bolted to */}
      <div style={{ position: "absolute", left: 6 * s, top: Hv - 30 * s, width: Wv - 12 * s,
        height: 30 * s, borderRadius: 4 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      {[0.10, 0.78].map((b, i) => (
        <div key={"fb" + i} style={{ position: "absolute", left: Wv * b, top: Hv - 24 * s,
          width: 14 * s, height: 14 * s, borderRadius: "50%", background: dkh("#0A0E12", 0) }} />
      ))}
      {/* the body, and the outlet elbow it vents from */}
      <div style={{ position: "absolute", left: Wv * 0.28, top: Hv - 84 * s, width: Wv * 0.44,
        height: 58 * s, background: `linear-gradient(96deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
        border: `${4 * s}px solid ${dkh("#231712", 0)}` }} />
      <div style={{ position: "absolute", left: Wv * 0.62, top: Hv - 78 * s, width: Wv * 0.42,
        height: 34 * s, borderRadius: `0 ${8 * s}px ${8 * s}px 0`,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.20)} 0%, ${dkh(BRASS, 0.40)} 100%)` }} />
      {/* THE SPRING HOUSING, and the cap it pushes UP when it lets go */}
      <div style={{ position: "absolute", left: Wv * 0.32, top: Hv - 150 * s - lift * 20 * s,
        width: Wv * 0.36, height: 70 * s, opacity: 0.9 }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"cs" + i} style={{ position: "absolute", left: 0, right: 0,
            top: (4 + i * (11 - lift * 3)) * s, height: 7 * s, borderRadius: 4 * s,
            background: `linear-gradient(180deg, ${mxh("#8A9298", 0.24)} 0%, ${dkh("#5A6068", 0.20)} 100%)` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: Wv * 0.20, top: Hv - 168 * s - lift * 26 * s,
        width: Wv * 0.60, height: 26 * s, borderRadius: 5 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.28)} 0%, ${dkh(BRASS, 0.30)} 100%)` }} />
      {/* the lever, and it FLIES up when the valve blows */}
      <div style={{ position: "absolute", left: Wv * 0.62, top: Hv - 158 * s, width: Wv * 0.52,
        height: 11 * s, borderRadius: 5 * s, transformOrigin: "0% 50%",
        transform: `rotate(${-lift * 34}deg)`,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.40)} 100%)` }} />
    </div>
  );
};

/* A BREAKER TRIP FLAG — green while it holds, red the instant it lets go. */
export const TripFlag: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; tripped: number }> = ({ x, y, s = 1, z = 50, f = 0, tripped }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 46 * s, height: 74 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s, background: dkh("#1A1F26", 0),
      border: `${3 * s}px solid ${dkh("#4A535E", 0)}` }} />
    <div style={{ position: "absolute", left: 6 * s, right: 6 * s, top: 6 * s, height: 22 * s,
      borderRadius: 3 * s,
      background: tripped > 0.5
        ? hexa("#FF3A24", 0.70 + Math.abs(Math.sin(f * 0.5)) * 0.30)
        : hexa("#7BE0A0", 0.55),
      boxShadow: tripped > 0.5 ? `0 0 ${16 * s}px ${hexa("#FF3A24", 0.8)}` : "none" }} />
    {/* the toggle itself, thrown DOWN when it trips */}
    <div style={{ position: "absolute", left: 13 * s, top: (34 + tripped * 22) * s, width: 20 * s,
      height: 26 * s, borderRadius: 3 * s, boxShadow: SH,
      background: `linear-gradient(180deg, ${mxh("#C9BFA8", 0.20)} 0%, ${dkh("#8A806C", 0.16)} 100%)` }} />
  </div>
);

/* A GANTRY CRANE — a rail, a traversing trolley, a hoist and a claw.
   ⛔ BUILT FOR ONE REASON: S12's left half is a wall of crates that never moves,
   and a scene is only as alive as its DEADEST half. The store side of "he had
   enough memory to STORE it, but his system cannot MOVE it" should be visibly
   WORKING — the jam is downstream, not here.
   `tx` 0..1 along the rail, `drop` 0..1 hoist extension, `grip` closes the jaws.
   Positions by the rail's LEFT END. */
export const Gantry: React.FC<{ x: number; y: number; w: number; s?: number; z?: number;
  tx: number; drop: number; grip: number; reach?: number; children?: React.ReactNode }> =
  ({ x, y, w, s = 1, z = 50, tx, drop, grip, reach = 150, children }) => {
  const cx = x + 30 * s + tx * (w - 60 * s);
  const hy = y + 26 * s + drop * reach;
  return (
    <>
      {/* the rail, its truss and its end stops */}
      <div style={{ position: "absolute", left: x, top: y, width: w, height: 20 * s,
        zIndex: z, borderRadius: 3 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      <div style={{ position: "absolute", left: x, top: y + 30 * s, width: w, height: 9 * s,
        zIndex: z, borderRadius: 3 * s, background: dkh(STEEL, 0.46) }} />
      {Array.from({ length: Math.max(2, Math.round(w / (58 * s))) }, (_, i) => (
        <div key={"tr" + i} style={{ position: "absolute", left: x + 8 * s + i * 58 * s,
          top: y + 18 * s, width: 5 * s, height: 15 * s, zIndex: z,
          transformOrigin: "50% 0%", transform: `rotate(${i % 2 ? 34 : -34}deg)`,
          background: dkh(STEEL, 0.40) }} />
      ))}
      {[x - 6 * s, x + w - 12 * s].map((ex, i) => (
        <div key={"es" + i} style={{ position: "absolute", left: ex, top: y - 10 * s,
          width: 18 * s, height: 52 * s, zIndex: z, borderRadius: 3 * s,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.14)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
      ))}
      {/* the trolley: a body and four flanged wheels */}
      <div style={{ position: "absolute", left: cx - 36 * s, top: y - 26 * s, width: 72 * s,
        height: 30 * s, zIndex: z + 1, borderRadius: 4 * s, boxShadow: SH,
        background: `linear-gradient(178deg, ${mxh("#4A535E", 0.18)} 0%, ${dkh("#2A313A", 0.12)} 100%)`,
        border: `${4 * s}px solid ${dkh("#12161B", 0)}` }} />
      {[-24, -8, 8, 24].map((o, i) => (
        <div key={"wh" + i} style={{ position: "absolute", left: cx + o * s - 7 * s, top: y - 4 * s,
          width: 14 * s, height: 14 * s, borderRadius: "50%", zIndex: z + 1,
          background: dkh(BRASS, 0.24) }} />
      ))}
      {/* the two hoist ropes */}
      {[-13, 13].map((o, i) => (
        <div key={"rp" + i} style={{ position: "absolute", left: cx + o * s - 2 * s, top: y + 22 * s,
          width: 4 * s, height: Math.max(0, hy - y - 22 * s), zIndex: z + 1,
          background: hexa("#1A1F26", 0.82) }} />
      ))}
      {/* the claw: a hinge block and two hooked jaws that CLOSE */}
      <div style={{ position: "absolute", left: cx - 26 * s, top: hy, width: 52 * s, height: 22 * s,
        zIndex: z + 2, borderRadius: 3 * s, boxShadow: SH,
        background: `linear-gradient(178deg, ${mxh(BRASS, 0.22)} 0%, ${dkh(BRASS, 0.34)} 100%)` }} />
      {[-1, 1].map(sd => (
        <div key={"jw" + sd} style={{ position: "absolute", left: cx + sd * 20 * s - 6 * s,
          top: hy + 18 * s, width: 12 * s, height: 42 * s, zIndex: z + 2, borderRadius: 4 * s,
          transformOrigin: "50% 0%",
          transform: `rotate(${sd * (26 - grip * 22)}deg)`,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.44)} 100%)` }}>
          <div style={{ position: "absolute", left: sd < 0 ? 0 : -14 * s, bottom: 0, width: 26 * s,
            height: 11 * s, borderRadius: 3 * s, background: dkh(STEEL, 0.38) }} />
        </div>
      ))}
      {/* whatever it is carrying, hanging under the claw */}
      {grip > 0.5 && (
        <div style={{ position: "absolute", left: cx, top: hy + 58 * s, width: 0, height: 0,
          zIndex: z + 1 }}>{children}</div>
      )}
    </>
  );
};

/* AN OVERHEAD SPOT ON A YOKE — asked for directly (Alex, reel 122: *"at 48
   seconds have like an above flashlight overhead lighting up each thing, 1, 2,
   3, to make it more interesting"*). The fixture hangs; `aim` is the angle from
   straight DOWN, positive to the right. Its beam is `SpotBeam`, a separate
   export so the cone can sit behind what it lights.
   Positions by the ceiling plate's TOP-CENTRE. */
export const SpotLamp: React.FC<{ x: number; y: number; s?: number; z?: number;
  aim: number; on?: number; c?: string }> =
  ({ x, y, s = 1, z = 70, aim, on = 1, c = "#FFF0D4" }) => {
  const B = 92 * s;
  return (
    <div style={{ position: "absolute", left: x - B / 2, top: y, width: B, height: 150 * s, zIndex: z }}>
      {/* the ceiling plate, its two bolts and the drop stem */}
      <div style={{ position: "absolute", left: -18 * s, top: 0, width: B + 36 * s, height: 16 * s,
        borderRadius: 3 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
      {[-1, 1].map(sd => (
        <div key={"bt" + sd} style={{ position: "absolute", left: B / 2 + sd * 34 * s - 5 * s,
          top: 3 * s, width: 10 * s, height: 10 * s, borderRadius: "50%", background: dkh("#0A0E12", 0) }} />
      ))}
      <div style={{ position: "absolute", left: B / 2 - 8 * s, top: 14 * s, width: 16 * s,
        height: 26 * s, background: dkh(STEEL, 0.46) }} />
      {/* the yoke — two arms and the pivot the barrel swings on */}
      {[-1, 1].map(sd => (
        <div key={"yk" + sd} style={{ position: "absolute", left: B / 2 + sd * 30 * s - 5 * s,
          top: 36 * s, width: 10 * s, height: 42 * s, borderRadius: 3 * s,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      ))}
      {/* THE BARREL — it turns, and everything on it turns with it */}
      <div style={{ position: "absolute", left: B / 2, top: 62 * s, width: 0, height: 0,
        transform: `rotate(${aim}deg)` }}>
        <div style={{ position: "absolute", left: -30 * s, top: 0, width: 60 * s, height: 74 * s,
          borderRadius: `${8 * s}px ${8 * s}px ${4 * s}px ${4 * s}px`, boxShadow: SH_D,
          background: `linear-gradient(96deg, ${mxh("#3A424C", 0.18)} 0%, ${dkh("#232A32", 0.14)} 100%)`,
          border: `${4 * s}px solid ${dkh("#0E1216", 0)}` }}>
          {[0, 1, 2].map(i => (
            <div key={"rb" + i} style={{ position: "absolute", left: 3 * s, right: 3 * s,
              top: (12 + i * 15) * s, height: 4 * s, background: hexa("#000", 0.28) }} />
          ))}
        </div>
        {/* the barn doors, flared out either side of the lens */}
        {[-1, 1].map(sd => (
          <div key={"bd" + sd} style={{ position: "absolute", left: sd < 0 ? -44 * s : 20 * s,
            top: 66 * s, width: 24 * s, height: 30 * s,
            transformOrigin: sd < 0 ? "100% 0%" : "0% 0%",
            transform: `rotate(${sd * 26}deg)`,
            background: `linear-gradient(180deg, ${dkh("#232A32", 0.06)} 0%, ${dkh("#12161B", 0)} 100%)` }} />
        ))}
        {/* the lens, and the glow it wears when it is lit */}
        <div style={{ position: "absolute", left: -26 * s, top: 68 * s, width: 52 * s, height: 18 * s,
          borderRadius: `${4 * s}px ${4 * s}px ${10 * s}px ${10 * s}px`,
          background: on > 0.05
            ? `radial-gradient(60% 90% at 50% 20%, ${hexa(c, 0.98)} 0%, ${hexa(c, 0.62)} 100%)`
            : dkh("#2A313A", 0),
          boxShadow: on > 0.05 ? `0 0 ${34 * s * on}px ${hexa(c, 0.8 * on)}` : "none" }} />
      </div>
    </div>
  );
};

/* THE BEAM. Drawn from the barrel's pivot, so `aim` must be the SAME value the
   fixture got or the light and the lamp point different ways. */
export const SpotBeam: React.FC<{ x: number; y: number; aim: number; len?: number;
  wide?: number; z?: number; on?: number; c?: string }> =
  ({ x, y, aim, len = 560, wide = 210, z = 30, on = 1, c = "#FFF0D4" }) => {
  if (on <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: x - wide / 2, top: y, width: wide, height: len,
      zIndex: z, pointerEvents: "none", transformOrigin: "50% 0%",
      transform: `rotate(${aim}deg)`, opacity: on * 0.62, filter: "blur(9px)",
      clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
      background: `linear-gradient(180deg, ${hexa(c, 0.95)} 0%, ${hexa(c, 0.40)} 58%, ${hexa(c, 0)} 100%)` }} />
  );
};

/* =========================================================================
   ROUND 58 PROPS.
   ====================================================================== */

/* THE OUTPUT SCREEN — ⭐⭐⭐ THE SPINNER IS THE IDEA. Everybody has watched a
   loading spinner race while nothing arrives; that read costs zero explanation,
   which is what "make it easy to understand" means. `tok` is how many tokens
   have landed, and the answer is two. Positions by BOTTOM-CENTRE of the foot. */
export const TokenScreen: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; tok: number; caret?: number }> =
  ({ x, y, s = 1, z = 60, f = 0, tok, caret = 1 }) => {
  const Wc = 720 * s, Hc = 470 * s;
  const TOK = ["THE", "ANSWER", "IS"];
  return (
    <div style={{ position: "absolute", left: x - Wc / 2, top: y - Hc, width: Wc, height: Hc, zIndex: z }}>
      {/* the stand */}
      <div style={{ position: "absolute", left: Wc / 2 - 26 * s, top: Hc - 92 * s, width: 52 * s,
        height: 62 * s, background: `linear-gradient(96deg, ${mxh("#3A424C", 0.16)} 0%, ${dkh("#252B33", 0.12)} 100%)` }} />
      <div style={{ position: "absolute", left: Wc / 2 - 120 * s, top: Hc - 34 * s, width: 240 * s,
        height: 26 * s, borderRadius: 8 * s, boxShadow: SH_D,
        background: `linear-gradient(180deg, ${mxh("#3A424C", 0.20)} 0%, ${dkh("#1A1F26", 0.10)} 100%)` }} />
      {/* the bezel */}
      <div style={{ position: "absolute", left: 0, top: 0, width: Wc, height: Hc - 86 * s,
        borderRadius: 14 * s, boxShadow: SH_D,
        background: `linear-gradient(174deg, ${mxh("#3A424C", 0.16)} 0%, ${dkh("#20262E", 0.10)} 100%)`,
        border: `${7 * s}px solid ${dkh("#0E1216", 0)}` }} />
      {/* the screen face */}
      <div style={{ position: "absolute", left: 22 * s, top: 22 * s, width: Wc - 44 * s,
        height: Hc - 130 * s, borderRadius: 6 * s, overflow: "hidden",
        background: `linear-gradient(178deg, ${dkh("#0A1014", 0)} 0%, ${dkh("#060A0D", 0)} 100%)`,
        boxShadow: `inset 0 0 ${40 * s}px ${hexa("#000", 0.8)}` }}>
        {/* scanlines */}
        {Array.from({ length: 18 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 20 * s,
            height: 1.5 * s, background: hexa("#7FE0A8", 0.05) }} />
        ))}
        {/* the prompt line */}
        <div style={{ position: "absolute", left: 26 * s, top: 26 * s, width: 20 * s, height: 20 * s,
          borderRadius: 3, background: hexa("#7FE0A8", 0.55) }} />
        <div style={{ position: "absolute", left: 56 * s, top: 32 * s, width: 300 * s, height: 9 * s,
          borderRadius: 4, background: hexa("#7FE0A8", 0.22) }} />
        {/* ⭐ WHAT IT HAS MANAGED — chunky word blocks, and there are two */}
        {TOK.slice(0, Math.max(0, tok)).map((w, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: (26 + i * 168) * s, top: 88 * s,
            width: (w.length * 25 + 30) * s, height: 62 * s, borderRadius: 6 * s,
            background: `linear-gradient(178deg, ${hexa("#CFF3DD", 0.95)} 0%, ${hexa("#7FE0A8", 0.62)} 100%)`,
            boxShadow: `0 0 ${20 * s}px ${hexa("#7FE0A8", 0.45)}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(31 * s, 900), color: "#07130D", letterSpacing: 1 }}>{w}</span>
          </div>
        ))}
        {/* the caret, blinking where the next one is owed */}
        <div style={{ position: "absolute", left: (26 + Math.max(0, tok) * 168) * s, top: 88 * s,
          width: 28 * s, height: 62 * s, borderRadius: 2,
          background: hexa("#7FE0A8", caret * (f % 22 < 11 ? 0.92 : 0.10)) }} />
        {/* ⭐⭐⭐ AND THE SPINNER IS RACING. Six dots on a ring, turning fast, next
               to a line that is not growing. That contrast is the whole scene. */}
        <div style={{ position: "absolute", left: 26 * s, top: 196 * s, width: 104 * s, height: 104 * s,
          transform: `rotate(${f * 22}deg)` }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={"sp" + i} style={{ position: "absolute", left: "50%", top: 0,
              width: 19 * s, height: 19 * s, marginLeft: -9.5 * s, borderRadius: "50%",
              transformOrigin: `${9.5 * s}px ${52 * s}px`,
              transform: `rotate(${i * 45}deg)`,
              background: hexa("#7FE0A8", 0.18 + i * 0.11),
              boxShadow: i > 5 ? `0 0 ${14 * s}px ${hexa("#7FE0A8", 0.6)}` : "none" }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 150 * s, top: 230 * s, width: 250 * s, height: 12 * s,
          borderRadius: 6, background: hexa("#7FE0A8", 0.20) }} />
        <div style={{ position: "absolute", left: 150 * s, top: 254 * s, width: 150 * s, height: 12 * s,
          borderRadius: 6, background: hexa("#7FE0A8", 0.12) }} />
        {/* the throughput strip along the bottom — a bar that will not fill */}
        <div style={{ position: "absolute", left: 26 * s, right: 26 * s, bottom: 22 * s,
          height: 20 * s, borderRadius: 4 * s, background: hexa("#7FE0A8", 0.10),
          border: `${2 * s}px solid ${hexa("#7FE0A8", 0.22)}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${2 + tok * 1.6}%`, background: hexa("#7FE0A8", 0.75) }} />
        </div>
      </div>
      {/* the power lamp on the bezel */}
      <div style={{ position: "absolute", left: Wc - 54 * s, top: Hc - 118 * s, width: 16 * s,
        height: 16 * s, borderRadius: "50%", background: hexa("#7FE0A8", 0.9),
        boxShadow: `0 0 ${14 * s}px ${hexa("#7FE0A8", 0.7)}` }} />
    </div>
  );
};

/* A PADLOCK — the shackle DROPS and the body takes the hit. Positions by CENTRE
   of the body. */
export const Padlock: React.FC<{ x: number; y: number; s?: number; z?: number;
  shut: number; c?: string }> = ({ x, y, s = 1, z = 70, shut, c = BRASS }) => {
  const Wb = 240 * s, Hb = 200 * s;
  return (
    <div style={{ position: "absolute", left: x - Wb / 2, top: y - Hb / 2, width: Wb, height: Hb, zIndex: z }}>
      {/* the shackle, riding UP until it slams home.
          ⛔ IT WAS `#9AA2AA` — the same pale steel as the ward's wall and its
             pipework — so it rendered perfectly and read as background. Dark
             gunmetal with a hard highlight, and a shadow to lift it off. */}
      <div style={{ position: "absolute", left: Wb * 0.22, top: -Hb * 0.50 - (1 - shut) * 40 * s,
        width: Wb * 0.56, height: Hb * 0.66, borderRadius: `${Wb * 0.28}px ${Wb * 0.28}px 0 0`,
        border: `${30 * s}px solid ${dkh("#4A545E", 0.16)}`, borderBottom: "none",
        boxShadow: `0 ${6 * s}px ${14 * s}px ${hexa("#000", 0.5)}` }} />
      <div style={{ position: "absolute", left: Wb * 0.22 + 9 * s, top: -Hb * 0.50 - (1 - shut) * 40 * s + 9 * s,
        width: Wb * 0.56 - 18 * s, height: Hb * 0.36, borderRadius: `${Wb * 0.26}px ${Wb * 0.26}px 0 0`,
        border: `${8 * s}px solid ${hexa("#DCE4EC", 0.55)}`, borderBottom: "none" }} />
      {/* the body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 22 * s, boxShadow: SH_D,
        background: `linear-gradient(158deg, ${mxh(c, 0.32)} 0%, ${c} 44%, ${dkh(c, 0.36)} 100%)`,
        border: `${7 * s}px solid ${dkh("#231712", 0)}` }} />
      <div style={{ position: "absolute", left: 14 * s, top: 14 * s, right: 14 * s, height: 18 * s,
        borderRadius: 9 * s, background: hexa("#FFF", 0.20) }} />
      {/* four rivets */}
      {[[0.13, 0.16], [0.87, 0.16], [0.13, 0.84], [0.87, 0.84]].map(([rx, ry], i) => (
        <div key={"rv" + i} style={{ position: "absolute", left: Wb * rx - 9 * s, top: Hb * ry - 9 * s,
          width: 18 * s, height: 18 * s, borderRadius: "50%", background: dkh("#231712", 0),
          boxShadow: `inset 0 ${2 * s}px 0 ${hexa("#FFF", 0.18)}` }} />
      ))}
      {/* the keyway */}
      <div style={{ position: "absolute", left: Wb / 2 - 30 * s, top: Hb / 2 - 30 * s,
        width: 60 * s, height: 60 * s, borderRadius: "50%", background: dkh("#1A1008", 0),
        border: `${5 * s}px solid ${dkh(c, 0.48)}` }} />
      <div style={{ position: "absolute", left: Wb / 2 - 12 * s, top: Hb / 2 + 4 * s,
        width: 24 * s, height: 44 * s, borderRadius: `0 0 ${6 * s}px ${6 * s}px`,
        background: dkh("#1A1008", 0) }} />
      {/* the maker's line, at stencil size */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 20 * s, textAlign: "center" }}>
        <span style={{ ...mono(15 * s, 900), color: hexa("#2A1C10", 0.55), letterSpacing: 2 }}>
          SEALED</span>
      </div>
    </div>
  );
};

/* A 24-HOUR CLOCK — ⭐ the DAY/NIGHT RING is what says 24/7 and the hands alone
   never could: you watch day and night go past, twice, in two seconds.
   Positions by CENTRE. */
export const DayNightClock: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; rate?: number }> = ({ x, y, s = 1, z = 70, f = 0, rate = 1 }) => {
  const D = 300 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D, zIndex: z }}>
      {/* ⭐ THE DAY/NIGHT RING, turning — half lit, half dark, and it never stops */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden",
        transform: `rotate(${f * 2.4 * rate}deg)`, boxShadow: SH_D,
        background: `conic-gradient(${hexa("#FFC24A", 1)} 0deg, ${hexa("#FFF0CC", 1)} 88deg, ${hexa("#FFC24A", 1)} 172deg, ${hexa("#111C30", 1)} 190deg, ${hexa("#050B16", 1)} 268deg, ${hexa("#111C30", 1)} 344deg, ${hexa("#FFC24A", 1)} 360deg)` }}>
        {/* the sun and the moon riding the ring */}
        <div style={{ position: "absolute", left: "50%", top: 12 * s, width: 46 * s, height: 46 * s,
          marginLeft: -23 * s, borderRadius: "50%", background: "#FFF6D8",
          boxShadow: `0 0 ${26 * s}px ${hexa("#FFF0A0", 0.95)}` }} />
        <div style={{ position: "absolute", left: "50%", bottom: 12 * s, width: 42 * s, height: 42 * s,
          marginLeft: -21 * s, borderRadius: "50%", background: "#E8EEFA",
          boxShadow: `inset ${13 * s}px 0 0 ${hexa("#050B16", 1)}` }} />
      </div>
      {/* the bezel over it — THIN, or it eats the ring it is framing */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        border: `${8 * s}px solid ${dkh(BRASS, 0.24)}` }} />
      <div style={{ position: "absolute", inset: D * 0.31 - 6 * s, borderRadius: "50%",
        border: `${6 * s}px solid ${dkh(BRASS, 0.30)}` }} />
      {/* the dial */}
      <div style={{ position: "absolute", inset: D * 0.31, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 38% 32%, ${mxh(CREAMB, 0.10)} 0%, ${dkh(CREAMB, 0.14)} 100%)`,
        border: `${5 * s}px solid ${dkh("#2A1E14", 0)}`, boxShadow: SH }} />
      {/* twenty-four ticks — the hour count IS the claim */}
      {Array.from({ length: 24 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: i % 6 === 0 ? 5 * s : 2.6 * s, height: i % 6 === 0 ? 20 * s : 12 * s,
          marginLeft: i % 6 === 0 ? -2.5 * s : -1.3 * s,
          background: hexa("#5A4B36", i % 6 === 0 ? 0.85 : 0.5),
          transformOrigin: "50% 50%",
          transform: `rotate(${i * 15}deg) translateY(${-D * 0.245}px)` }} />
      ))}
      {/* the hands.
          ⛔⛔ `rotate(a) translateY(-L)` PIVOTS ABOUT A POINT L BELOW THE CENTRE.
             transformOrigin is fixed on the UNTRANSFORMED box, so translating the
             box up does not move the pivot with it, and every hand swung out past
             the bezel. Hang the box UP from the centre with a negative marginTop
             and rotate about its own bottom, which IS the centre. */}
      {[[D * 0.155, 12 * s, 6, "#241F18"],
        [D * 0.235, 7 * s, 26, "#241F18"],
        [D * 0.265, 4 * s, 92, "#B02A1E"]].map(([len, w, sp, col], i) => (
        <div key={"hd" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: w as number, height: len as number,
          marginLeft: -(w as number) / 2, marginTop: -(len as number),
          borderRadius: 6 * s, background: col as string, transformOrigin: "50% 100%",
          transform: `rotate(${f * (sp as number) * rate}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 22 * s, height: 22 * s,
        marginLeft: -11 * s, marginTop: -11 * s, borderRadius: "50%", background: "#B02A1E",
        border: `${3 * s}px solid ${dkh("#2A1E14", 0)}` }} />
    </div>
  );
};

/* RAIN — diagonal streaks with a wrap, and ticks where they land. One component,
   and it repaints the whole panel on every frame. */
export const Rain: React.FC<{ f: number; z?: number; n?: number; on: number;
  ground?: number; c?: string }> =
  ({ f, z = 80, n = 70, on, ground = 706, c = "#CFE6F2" }) => {
  if (on <= 0.02) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const sp = 26 + (i % 7) * 6;
        const t = ((f * sp + i * 137) % 900) / 900;
        const x = ((i * 149) % 1120) - 54 + t * 90;
        const y = -70 + t * 900;
        const len = 34 + (i % 5) * 16;
        return (
          <div key={"rn" + i} style={{ position: "absolute", left: x, top: y, width: 3,
            height: len, zIndex: z, opacity: on * (0.30 + (i % 4) * 0.14),
            transform: "rotate(6deg)", borderRadius: 2,
            background: `linear-gradient(180deg, ${hexa(c, 0)} 0%, ${hexa(c, 0.95)} 100%)` }} />
        );
      })}
      {Array.from({ length: 16 }, (_, i) => {
        const t = ((f * 0.10 + i / 16) % 1);
        return (
          <div key={"sp" + i} style={{ position: "absolute",
            left: ((i * 233) % 1040) - 20, top: ground - 6 - t * 12,
            width: 18 + t * 20, height: 4, zIndex: z,
            opacity: on * (1 - t) * 0.55, borderRadius: "0 0 12px 12px",
            border: `2px solid ${hexa(c, 0.8)}`, borderTop: "none" }} />
        );
      })}
    </>
  );
};
