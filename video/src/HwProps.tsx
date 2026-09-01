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
  seated: number; spin?: number; stencil?: string; hh?: number }> =
  ({ x, y, s = 1, z = 46, f = 0, seated, spin = 0, stencil, hh = 7 }) => {
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
        {/* the tape seam down the middle */}
        <div style={{ position: "absolute", left: "50%", top: 0, width: 13 * s, height: "100%",
          marginLeft: -6.5 * s, background: hexa("#FFFFFF", 0.16) }} />
        {/* the printed panel the mark sits on */}
        <div style={{ position: "absolute", left: 16 * s, top: 22 * s, right: 16 * s,
          height: 84 * s, borderRadius: 3 * s, background: "#FBF8F0",
          border: `${2 * s}px solid ${dkh(c, 0.22)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(`logos/${mark}`)}
            style={{ width: 62 * s, height: 62 * s, objectFit: "contain" }} />
        </div>
        {/* two printed rules under it — a carton always has small print */}
        {[0, 1].map(i => (
          <div key={"pr" + i} style={{ position: "absolute", left: 22 * s, top: (120 + i * 13) * s,
            width: (i ? 58 : 92) * s, height: 5 * s, borderRadius: 2,
            background: hexa("#3A2E1E", 0.30) }} />
        ))}
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
      {/* the LIT FACE — the one bright plane, and where the mark sits */}
      <div style={{ position: "absolute", left: 66 * s, top: 22 * s, width: W2 - 96 * s,
        height: H2 - 84 * s, zIndex: 4, borderRadius: 6 * s,
        background: `linear-gradient(170deg, ${mxh(GOLD, 0.30 * lit)} 0%, ${dkh(GOLD, 0.24)} 100%)`,
        border: `${3 * s}px solid ${dkh(GOLD, 0.52)}`, opacity: 0.35 + lit * 0.65 }} />
      <BrandTile x={W2 * 0.40} y={H2 * 0.36} s={0.72 * s} z={z + 6} file={mark} />
      {params && (
        <div style={{ position: "absolute", left: 152 * s, top: 44 * s, zIndex: z + 6 }}>
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
  idleK?: number; util?: string }> =
  ({ x, y, s = 1, z = 40, f, idleK = 0.06, util }) => {
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
      {[0, 1].map(i => {
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
