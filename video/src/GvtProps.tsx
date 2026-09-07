import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, mono, ui, floatY,
  Tile, VscTile, Deck, INK, MUTE, CLAY, CLAYD, GOLD, GREEN, RED, SKY, BONE, BRASS,
  STEEL, IRON, CHROME, SLATE, EMBER, VSC, AGV, GUNMETAL, DECK, DECKL, G,
} from "./GvtWorld";

/* ===========================================================================
   REEL 141 · "GRAVITY" — THE PROPS.  Board: storyboards/141-gravity.md.

   ⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES. Every object below has a
   silhouette, a lit face, a shadowed face and at least one piece of hardware
   (a hinge, a handle, a bolt row, a keyway). A rounded rect with a label on it
   is a diagram, not a prop (feedback_props_need_real_drawing).
   ========================================================================= */

/* ---------------------------------------------------------------------------
   THE REPEATED OBJECT — the drawer unit. Thirty of these carry 100% of the
   hook's motion while the hero holds still. It is a real thing: a two-drawer
   steel cabinet with recessed pulls, a card holder, a bolt row and a stencil.
   ⛔ >= 48px on its short side so it survives the audit's 1012->240 downsample.
   ------------------------------------------------------------------------ */
export const DrawerUnit: React.FC<{ x: number; y: number; s?: number; z?: number;
  open?: number; c?: string; mark?: boolean; o?: number; rot?: number }> =
  ({ x, y, s = 1, z = 30, open = 0, c = "#59636F", mark = true, o = 1, rot = 0 }) => {
  const w = 78 * s, h = 62 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      opacity: o, transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: "50% 100%" }}>
      {/* body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 3 * s,
        background: `linear-gradient(160deg, ${mxh(c, 0.30)} 0%, ${c} 46%, ${dkh(c, 0.26)} 100%)`,
        border: `${2.5 * s}px solid ${hexa("#05070C", 0.55)}` }} />
      {/* the dark void behind the drawers — this is the frame's black point */}
      <div style={{ position: "absolute", left: 5 * s, top: 5 * s, right: 5 * s, bottom: 5 * s,
        background: "#182533" }} />
      {/* two drawers, the upper one pulled by `open` */}
      {[0, 1].map((i) => (
        <div key={"dr" + i} style={{ position: "absolute", left: 5 * s + (i === 0 ? open * 7 * s : 0),
          top: 5 * s + i * 26 * s, width: w - 10 * s, height: 24 * s,
          background: `linear-gradient(178deg, ${mxh(c, 0.3)} 0%, ${dkh(c, 0.12)} 100%)`,
          borderBottom: `${2 * s}px solid ${hexa("#05070C", 0.5)}` }}>
          {/* recessed pull */}
          <div style={{ position: "absolute", left: "34%", top: 8 * s, width: "32%", height: 6 * s,
            borderRadius: 2 * s, background: hexa("#05070C", 0.62),
            borderBottom: `${1.5 * s}px solid ${hexa("#FFF", 0.14)}` }} />
          {/* card holder */}
          <div style={{ position: "absolute", left: 6 * s, top: 6 * s, width: 13 * s, height: 9 * s,
            background: hexa(BONE, 0.66), border: `${1 * s}px solid ${hexa("#05070C", 0.4)}` }} />
        </div>
      ))}
      {/* bolt row along the top edge */}
      {[0, 1, 2, 3].map((i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: (11 + i * 18) * s, top: 1.5 * s,
          width: 3.5 * s, height: 3.5 * s, borderRadius: "50%", background: hexa("#CBD3DB", 0.5) }} />
      ))}
      {mark && <VscTile x={w - 24 * s} y={h - 22 * s} s={17 * s} z={z + 2} />}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE DENSITY DEVICE — `RigWall`. A 10x3 grid of FOUR different
   hand-drawn objects on rails, dressed into every body scene. Four deliberately
   different silhouettes: a CIRCLE (cable coil), a DIAGONAL (strut brace), FINE
   REPEATED TEETH (clamp rack), and a SMALL CHARACTER (a rigger on a hook).
   ⭐ In THIS world they do not swing, they FLOAT — asymmetric, hanging a beat
     too long at the top. That single choice is what says antigravity with no
     caption saying it.
   ⛔ Lighter and shorter in the frame-0 scene only (it must not drag f0 luma
     under 140), and a different `seed` AND `rows` per cut so an identical wall
     does not eat the three cuts' dHash separation.
   ------------------------------------------------------------------------ */
export const RigWall: React.FC<{ f: number; y?: number; rows?: number; cols?: number;
  z?: number; o?: number; s?: number; seed?: number; c?: string; amp?: number }> =
  ({ f, y = 128, rows = 3, cols = 10, z = 14, o = 0.9, s = 1, seed = 0, c = STEEL, amp = 9 }) => {
  const pitch = (W + 60) / cols, rowH = 96 * s;
  return (<>
    {Array.from({ length: rows }, (_, r) => (
      <React.Fragment key={"rw" + r}>
        {/* the rail the row hangs from */}
        <div style={{ position: "absolute", left: -30, top: y + r * rowH, width: W + 60, height: 7 * s,
          zIndex: z, opacity: o, background: dkh(c, 0.5) }} />
        {Array.from({ length: cols }, (_, i) => {
          const k = (i + r * 3 + seed) % 4;
          const cx = -30 + pitch * (i + 0.5);
          const ty = y + r * rowH + 7 * s + floatY(f, (i * 0.31 + r * 0.53 + seed * 0.17), amp * s, 54 + ((i + r) % 5) * 7);
          const hue = [c, dkh(c, 0.2), BRASS, mxh(c, 0.2)][k];
          return (
            <div key={"rwi" + r + "_" + i} style={{ position: "absolute", left: cx - 30 * s, top: ty,
              width: 60 * s, height: 84 * s, zIndex: z + 1, opacity: o }}>
              {/* the hanger */}
              <div style={{ position: "absolute", left: 28 * s, top: 0, width: 4 * s, height: 13 * s,
                background: dkh(c, 0.55) }} />
              {k === 0 && (   /* CIRCLE — a coiled cable on a peg */
                <>
                  <div style={{ position: "absolute", left: 8 * s, top: 12 * s, width: 44 * s, height: 44 * s,
                    borderRadius: "50%", border: `${8 * s}px solid ${hue}`, boxSizing: "border-box" }} />
                  <div style={{ position: "absolute", left: 15 * s, top: 19 * s, width: 30 * s, height: 30 * s,
                    borderRadius: "50%", border: `${4 * s}px solid ${dkh(hue, 0.32)}`, boxSizing: "border-box" }} />
                  <div style={{ position: "absolute", left: 26 * s, top: 50 * s, width: 9 * s, height: 20 * s,
                    borderRadius: 3 * s, background: dkh(hue, 0.22) }} />
                </>
              )}
              {k === 1 && (   /* DIAGONAL — a strut brace hung at a slant */
                <div style={{ position: "absolute", left: 4 * s, top: 12 * s, width: 52 * s, height: 58 * s,
                  transform: "rotate(-24deg)" }}>
                  <div style={{ position: "absolute", left: 20 * s, top: 0, width: 12 * s, height: 58 * s,
                    background: `linear-gradient(90deg, ${mxh(hue, 0.24)} 0%, ${dkh(hue, 0.3)} 100%)` }} />
                  {[0, 1].map((e) => (
                    <div key={"se" + e} style={{ position: "absolute", left: 13 * s, top: e ? 46 * s : 0,
                      width: 26 * s, height: 12 * s, borderRadius: 3 * s, background: dkh(hue, 0.14) }}>
                      <div style={{ position: "absolute", left: 10 * s, top: 3 * s, width: 6 * s, height: 6 * s,
                        borderRadius: "50%", background: "#0A0D13" }} />
                    </div>
                  ))}
                </div>
              )}
              {k === 2 && (   /* FINE REPEATED TEETH — a clamp rack */
                <>
                  <div style={{ position: "absolute", left: 6 * s, top: 13 * s, width: 48 * s, height: 15 * s,
                    background: dkh(hue, 0.18), borderRadius: 2 * s }} />
                  {Array.from({ length: 9 }, (_, t) => (
                    <div key={"tt" + t} style={{ position: "absolute", left: (8 + t * 5.2) * s, top: 28 * s,
                      width: 3 * s, height: (t % 2 ? 26 : 19) * s, background: mxh(hue, 0.1) }} />
                  ))}
                  <div style={{ position: "absolute", left: 6 * s, top: 55 * s, width: 48 * s, height: 6 * s,
                    background: dkh(hue, 0.42) }} />
                </>
              )}
              {k === 3 && (   /* SMALL CHARACTER — a rigger on a hook, legs dangling */
                <>
                  <div style={{ position: "absolute", left: 24 * s, top: 12 * s, width: 12 * s, height: 10 * s,
                    borderRadius: `0 0 ${6 * s}px ${6 * s}px`, border: `${3 * s}px solid ${dkh(hue, 0.4)}`,
                    borderTop: "none", boxSizing: "border-box" }} />
                  <div style={{ position: "absolute", left: 16 * s, top: 22 * s, width: 28 * s, height: 26 * s,
                    borderRadius: 6 * s, background: CLAY, border: `${2 * s}px solid ${hexa("#05070C", 0.45)}` }}>
                    <div style={{ position: "absolute", left: 6 * s, top: 9 * s, width: 4 * s, height: 4 * s,
                      borderRadius: "50%", background: "#0A0D13" }} />
                    <div style={{ position: "absolute", left: 17 * s, top: 9 * s, width: 4 * s, height: 4 * s,
                      borderRadius: "50%", background: "#0A0D13" }} />
                  </div>
                  {/* the hard hat */}
                  <div style={{ position: "absolute", left: 15 * s, top: 17 * s, width: 30 * s, height: 9 * s,
                    borderRadius: `${8 * s}px ${8 * s}px 0 0`, background: GOLD }} />
                  {[0, 1].map((l) => (
                    <div key={"lg" + l} style={{ position: "absolute", left: (21 + l * 12) * s, top: 47 * s,
                      width: 5 * s, height: 17 * s, borderRadius: 2 * s, background: CLAYD }} />
                  ))}
                </>
              )}
            </div>
          );
        })}
      </React.Fragment>
    ))}
  </>);
};

/* ---------------------------------------------------------------------------
   THE SHARED WALL PLATE — the two marks on one wall. This is the claim, as an
   object. `join` 0 = a seam between them, 1 = one continuous plate.
   ------------------------------------------------------------------------ */
export const WallPlate: React.FC<{ x: number; y: number; s?: number; z?: number;
  join?: number; f?: number }> = ({ x, y, s = 1, z = 76, join = 0, f = 0 }) => {
  const w = 300 * s, h = 118 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
        background: `linear-gradient(168deg, #F3EBD8 0%, #DCD0B4 100%)`,
        border: `${3 * s}px solid ${hexa("#05070C", 0.55)}`, boxShadow: SH_D }} />
      {/* four mounting bolts */}
      {[[10, 10], [w - 20 * s, 10], [10, h - 20 * s], [w - 20 * s, h - 20 * s]].map((p, i) => (
        <div key={"wb" + i} style={{ position: "absolute", left: p[0], top: p[1], width: 8 * s, height: 8 * s,
          borderRadius: "50%", background: hexa("#6B6250", 0.55) }} />
      ))}
      {/* the seam, which closes as `join` rises */}
      <div style={{ position: "absolute", left: w / 2 - 2 * s, top: 14 * s, width: 4 * s,
        height: (h - 28 * s) * (1 - join), background: hexa("#5B5340", 0.62) }} />
      <VscTile x={w * 0.18} y={h * 0.22} s={62 * s} z={z + 2} />
      <Tile x={w * 0.56} y={h * 0.22} src="antigravity.png" s={62 * s} z={z + 2} />
      <div style={{ position: "absolute", left: w * 0.18, top: h * 0.76, ...mono(13 * s, 800),
        color: "#2A5C93", letterSpacing: "0.08em" }}>VS CODE</div>
      <div style={{ position: "absolute", left: w * 0.56, top: h * 0.76, ...mono(13 * s, 800),
        color: "#8A6420", letterSpacing: "0.08em" }}>ANTIGRAVITY</div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE LISTING BOARD — the marketplace listing as dock signage, not a
   screenshot. Publisher row, verified tick, version, updated date.
   ------------------------------------------------------------------------ */
export const ListingBoard: React.FC<{ x: number; y: number; s?: number; z?: number;
  f: number; markAt?: number; tickAt?: number }> =
  ({ x, y, s = 1, z = 78, f, markAt = 26, tickAt = 38 }) => {
  const w = 460 * s, h = 224 * s;
  const mk = E(f, markAt, 8, 0, 1, BACK);
  const tk = E(f, tickAt, 5, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s, background: BONE,
        border: `${4 * s}px solid ${dkh(BONE, 0.3)}`, boxShadow: SH_D }} />
      {/* the enamel top band */}
      <div style={{ position: "absolute", left: 4 * s, top: 4 * s, right: 4 * s, height: 12 * s,
        background: `repeating-linear-gradient(-45deg, ${dkh(BONE, 0.24)} 0 12px, ${dkh(BONE, 0.1)} 12px 24px)` }} />
      <Tile x={22 * s} y={30 * s} src="antigravity.png" s={76 * s} z={z + 2} />
      <div style={{ position: "absolute", left: 112 * s, top: 34 * s, ...ui(34 * s, 900), color: INK }}>
        {G.extName}
      </div>
      {/* the publisher row, which is the whole point of "official" */}
      <div style={{ position: "absolute", left: 112 * s, top: 80 * s, display: "flex",
        alignItems: "center", gap: 8 * s, opacity: mk, transform: `translateX(${(1 - mk) * -22 * s}px)` }}>
        <div style={{ width: 26 * s, height: 26 * s, borderRadius: 6 * s, background: "#FFFFFF",
          border: `${2 * s}px solid #E8DCC0`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/google.svg")} style={{ width: 18 * s, height: 18 * s, objectFit: "contain" }} />
        </div>
        <span style={{ ...ui(22 * s, 800), color: hexa(INK, 0.8) }}>{G.publisher}</span>
        <div style={{ width: 22 * s, height: 22 * s, borderRadius: "50%", background: SKY,
          transform: `scale(${tk})`, display: "flex", alignItems: "center", justifyContent: "center",
          ...mono(14 * s, 900), color: "#FFF" }}>✓</div>
      </div>
      {/* version + updated, on a mechanical strip */}
      <div style={{ position: "absolute", left: 22 * s, top: 130 * s, right: 22 * s, height: 34 * s,
        background: "#2C333D", borderRadius: 5 * s, display: "flex", alignItems: "center",
        paddingLeft: 12 * s, gap: 18 * s }}>
        <span style={{ ...mono(15 * s, 800), color: hexa(AGV, 0.95), letterSpacing: "0.06em" }}>{G.version}</span>
        <span style={{ ...mono(15 * s, 800), color: hexa(BONE, 0.68), letterSpacing: "0.06em" }}>{G.updated}</span>
      </div>
      {/* the five IDEs it shipped for, as small keyed tiles */}
      <div style={{ position: "absolute", left: 22 * s, top: 176 * s, display: "flex", gap: 9 * s }}>
        {G.ides.map((d, i) => (
          <div key={"ide" + i} style={{ opacity: E(f, markAt + 6 + i * 3, 6, 0.25, 1, OUT) }}>
            {d.mark === "vscode.svg"
              ? <VscTile x={0} y={0} s={34 * s} z={z + 2} />
              : <Tile x={0} y={0} src={d.mark} s={34 * s} z={z + 2} />}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE SOCKET RAIL + CARTRIDGE — the extension, made a part you fit.
   ------------------------------------------------------------------------ */
export const SocketRail: React.FC<{ x: number; y: number; s?: number; z?: number;
  f: number; seatAt: number; pinAt?: number }> =
  ({ x, y, s = 1, z = 70, f, seatAt, pinAt }) => {
  const w = 300 * s, h = 150 * s;
  const p0 = pinAt ?? seatAt + 2;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z }}>
      {/* the rail */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 26 * s,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.24)} 0%, ${dkh(IRON, 0.4)} 100%)`,
        borderRadius: 4 * s }} />
      {/* the keyed slot */}
      <div style={{ position: "absolute", left: 40 * s, top: 26 * s, width: w - 80 * s, height: h - 40 * s,
        background: "#0A0D13", border: `${4 * s}px solid ${dkh(IRON, 0.2)}`, borderRadius: 6 * s }}>
        {/* the key notch */}
        <div style={{ position: "absolute", left: "44%", top: -2 * s, width: 26 * s, height: 14 * s,
          background: dkh(IRON, 0.3), borderRadius: `0 0 ${5 * s}px ${5 * s}px` }} />
        {/* four contact pins that light in sequence */}
        {[0, 1, 2, 3].map((i) => {
          const on = E(f, p0 + i * 3, 3, 0, 1, OUT);
          return (
            <div key={"pin" + i} style={{ position: "absolute", left: (22 + i * 44) * s, bottom: 10 * s,
              width: 26 * s, height: 9 * s, borderRadius: 2 * s,
              background: on > 0.5 ? AGV : dkh(IRON, 0.1), opacity: 0.35 + on * 0.65 }} />
          );
        })}
      </div>
    </div>
  );
};

export const Cartridge: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 74, rot = 0 }) => {
  const w = 176 * s, h = 104 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z,
      transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 7 * s,
        background: `linear-gradient(164deg, ${mxh("#5B4E36", 0.28)} 0%, #4A3F2C 100%)`,
        border: `${3 * s}px solid ${hexa("#05070C", 0.6)}`, boxShadow: SH }} />
      {/* the key tongue */}
      <div style={{ position: "absolute", left: "42%", top: -11 * s, width: 24 * s, height: 13 * s,
        background: "#4A3F2C", borderRadius: `${4 * s}px ${4 * s}px 0 0`,
        border: `${3 * s}px solid ${hexa("#05070C", 0.6)}`, borderBottom: "none" }} />
      {/* the ribbed grip */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: 12 * s, top: (16 + i * 15) * s,
          width: 20 * s, height: 6 * s, borderRadius: 2 * s, background: hexa("#0A0D13", 0.45) }} />
      ))}
      <Tile x={48 * s} y={22 * s} src="antigravity.png" s={60 * s} z={z + 2} />
      <div style={{ position: "absolute", left: 118 * s, top: 34 * s, ...mono(11 * s, 800),
        color: hexa(AGV, 0.9), letterSpacing: "0.1em", writingMode: "vertical-rl" }}>{G.service}</div>
    </div>
  );
};

/** the split-flap install counter — a mechanical count, not a text label */
export const FlapCounter: React.FC<{ x: number; y: number; v: string; label?: string;
  s?: number; z?: number; f: number; at: number; c?: string }> =
  ({ x, y, v, label, s = 1, z = 80, f, at, c = AGV }) => {
  const chars = v.split("");
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex", gap: 4 * s,
      alignItems: "flex-end" }}>
      {chars.map((ch, i) => {
        const settle = E(f, at + i * 2, 9, 0, 1, OUT);
        const rolling = settle < 1;
        const shown = ch === "," ? "," : rolling
          ? String(Math.floor(((f * 7 + i * 13) % 10)))
          : ch;
        const flip = rolling ? Math.sin((f + i * 3) * 1.5) * 18 : 0;
        return ch === "," ? (
          <div key={"fc" + i} style={{ ...mono(26 * s, 900), color: hexa(c, 0.7), paddingBottom: 4 * s }}>,</div>
        ) : (
          <div key={"fc" + i} style={{ width: 34 * s, height: 50 * s, borderRadius: 4 * s,
            background: "#161B23", border: `${2 * s}px solid ${hexa("#05070C", 0.7)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `perspective(220px) rotateX(${flip}deg)`,
            ...mono(28 * s, 900), color: c, overflow: "hidden" }}>
            {/* the flap seam */}
            <div style={{ position: "absolute", width: 34 * s, height: 2 * s, background: hexa("#05070C", 0.8) }} />
            {shown}
          </div>
        );
      })}
      {label && (
        <div style={{ ...mono(13 * s, 800), color: hexa(BONE, 0.6), letterSpacing: "0.12em",
          paddingBottom: 8 * s, paddingLeft: 8 * s }}>{label}</div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE VILLAIN — THE MOVE. A crate, a loaded dolly and a roll-up door.
   ------------------------------------------------------------------------ */
export const Crate: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  taped?: boolean; label?: string; o?: number }> =
  ({ x, y, s = 1, z = 40, rot = 0, taped = true, label, o = 1 }) => {
  const w = 96 * s, h = 74 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      opacity: o, transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 3 * s,
        background: `linear-gradient(158deg, ${mxh("#9C8560", 0.22)} 0%, #8A754F 52%, ${dkh("#8A754F", 0.34)} 100%)`,
        border: `${2.5 * s}px solid ${hexa("#05070C", 0.5)}` }} />
      {/* corner braces */}
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map((p, i) => (
        <div key={"cb" + i} style={{ position: "absolute", left: p[0] ? w - 18 * s : 4 * s,
          top: p[1] ? h - 18 * s : 4 * s, width: 14 * s, height: 14 * s,
          background: hexa("#5B4E36", 0.8) }} />
      ))}
      {taped && (
        <div style={{ position: "absolute", left: 0, top: h * 0.42, width: w, height: 11 * s,
          background: hexa(BONE, 0.5), borderTop: `${1.5 * s}px solid ${hexa("#05070C", 0.3)}`,
          borderBottom: `${1.5 * s}px solid ${hexa("#05070C", 0.3)}` }} />
      )}
      {label && (
        <div style={{ position: "absolute", left: 8 * s, top: h * 0.62, ...mono(11 * s, 800),
          color: hexa("#2B2318", 0.72), letterSpacing: "0.06em" }}>{label}</div>
      )}
      <VscTile x={w - 28 * s} y={8 * s} s={20 * s} z={z + 2} />
    </div>
  );
};

export const Dolly: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  roll?: number; tilt?: number }> = ({ x, y, s = 1, z = 44, f, roll = 0, tilt = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${tilt}deg)`, transformOrigin: "50% 100%" }}>
    {/* the mast */}
    <div style={{ position: "absolute", left: -6 * s, top: -184 * s, width: 12 * s, height: 184 * s,
      background: `linear-gradient(90deg, ${mxh(IRON, 0.3)} 0%, ${dkh(IRON, 0.35)} 100%)` }} />
    <div style={{ position: "absolute", left: -46 * s, top: -190 * s, width: 92 * s, height: 10 * s,
      borderRadius: 4 * s, background: dkh(IRON, 0.2) }} />
    {/* the toe plate */}
    <div style={{ position: "absolute", left: -14 * s, top: -14 * s, width: 108 * s, height: 14 * s,
      background: dkh(IRON, 0.12), borderRadius: 2 * s }} />
    {/* two wheels that actually turn */}
    {[0, 1].map((i) => (
      <div key={"wh" + i} style={{ position: "absolute", left: (-24 + i * 34) * s, top: -18 * s,
        width: 34 * s, height: 34 * s, borderRadius: "50%", background: "#171C24",
        border: `${4 * s}px solid ${dkh(IRON, 0.05)}`, boxSizing: "border-box",
        transform: `rotate(${roll * 26 + f * 0.4}deg)` }}>
        <div style={{ position: "absolute", left: "46%", top: 3 * s, width: 3 * s, height: 12 * s,
          background: hexa(CHROME, 0.5) }} />
      </div>
    ))}
  </div>
);

export const RollDoor: React.FC<{ x: number; y: number; w: number; h: number; open?: number;
  z?: number; s?: number }> = ({ x, y, w: ww, h: hh, open = 1, z = 20, s = 1 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: hh, zIndex: z }}>
    {/* the cold night beyond */}
    <div style={{ position: "absolute", inset: 0,
      background: `linear-gradient(180deg, #16203A 0%, #0B1220 74%, #060A12 100%)` }} />
    {/* the frame */}
    <div style={{ position: "absolute", inset: 0, border: `${12 * s}px solid ${dkh(IRON, 0.36)}`,
      boxSizing: "border-box" }} />
    {/* the shutter, rolled up by `open` */}
    <div style={{ position: "absolute", left: 12 * s, top: 12 * s, right: 12 * s,
      height: (hh - 24 * s) * (1 - open), overflow: "hidden",
      background: `repeating-linear-gradient(180deg, ${dkh(IRON, 0.1)} 0 11px, ${dkh(IRON, 0.42)} 11px 22px)` }} />
  </div>
);

/* ---------------------------------------------------------------------------
   THE UPSIDE RIG — the whole Antigravity deck that descends and DOCKS, with
   the three things the docs say the panel actually does hanging off it.
   ------------------------------------------------------------------------ */
export const AgentPanel: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  at: number }> = ({ x, y, s = 1, z = 66, f, at }) => {
  const on = E(f, at, 7, 0, 1, OUT);
  const w = 156 * s, h = 112 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      opacity: on, transform: `scaleY(${0.6 + on * 0.4})`, transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 7 * s, background: "#141A22",
        border: `${3 * s}px solid ${hexa(AGV, 0.5)}` }} />
      <div style={{ position: "absolute", left: 8 * s, top: 7 * s, ...mono(11 * s, 800),
        color: hexa(AGV, 0.9), letterSpacing: "0.1em" }}>AGENTS</div>
      {[0, 1, 2].map((i) => (
        <div key={"ag" + i} style={{ position: "absolute", left: 8 * s, top: (28 + i * 26) * s,
          width: w - 16 * s, height: 20 * s, borderRadius: 3 * s, background: hexa(AGV, 0.12),
          borderLeft: `${4 * s}px solid ${[AGV, GREEN, SKY][i]}`,
          opacity: E(f, at + 3 + i * 3, 5, 0, 1, OUT) }}>
          <div style={{ position: "absolute", left: 9 * s, top: 7 * s, width: (72 - i * 16) * s,
            height: 5 * s, background: hexa(BONE, 0.42) }} />
        </div>
      ))}
    </div>
  );
};

export const DiffSheet: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  at: number }> = ({ x, y, s = 1, z = 66, f, at }) => {
  const open = E(f, at, 9, 0, 1, OUT);
  const w = 150 * s, h = 124 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h * open, zIndex: z,
      overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, borderRadius: 7 * s,
        background: "#101820", border: `${3 * s}px solid ${hexa(BONE, 0.24)}` }} />
      <div style={{ position: "absolute", left: 8 * s, top: 7 * s, ...mono(11 * s, 800),
        color: hexa(BONE, 0.66), letterSpacing: "0.1em" }}>DIFF</div>
      {[-1, 1, 1, -1, 1, 0].map((sgn, i) => (
        <div key={"df" + i} style={{ position: "absolute", left: 8 * s, top: (26 + i * 15) * s,
          width: w - 16 * s, height: 11 * s,
          background: sgn === 1 ? hexa(GREEN, 0.2) : sgn === -1 ? hexa(RED, 0.2) : "transparent" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 4 * s, height: 11 * s,
            background: sgn === 1 ? GREEN : sgn === -1 ? RED : hexa(BONE, 0.16) }} />
          <div style={{ position: "absolute", left: 11 * s, top: 3.5 * s, width: (96 - (i % 3) * 24) * s,
            height: 4 * s, background: hexa(BONE, 0.34) }} />
        </div>
      ))}
    </div>
  );
};

export const PlanCard: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  at: number }> = ({ x, y, s = 1, z = 66, f, at }) => {
  const w = 146 * s, h = 108 * s;
  const un = E(f, at, 10, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      transform: `perspective(420px) rotateX(${(1 - un) * -78}deg)`, transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 7 * s, background: BONE,
        border: `${3 * s}px solid ${dkh(BONE, 0.3)}`, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 8 * s, top: 7 * s, ...mono(11 * s, 800),
        color: hexa(INK, 0.6), letterSpacing: "0.1em" }}>PLAN</div>
      {[0, 1, 2, 3].map((i) => (
        <div key={"pl" + i} style={{ position: "absolute", left: 9 * s, top: (28 + i * 19) * s,
          display: "flex", alignItems: "center", gap: 7 * s,
          opacity: E(f, at + 4 + i * 2, 4, 0, 1, OUT) }}>
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: 3 * s,
            background: i < 2 ? GREEN : "transparent", border: `${2 * s}px solid ${i < 2 ? GREEN : hexa(INK, 0.3)}` }} />
          <div style={{ width: (94 - i * 15) * s, height: 5 * s, background: hexa(INK, 0.34) }} />
        </div>
      ))}
    </div>
  );
};

/** the whole upside deck as one rigid body, on four cables */
export const UpsideRig: React.FC<{ f: number; y: number; s?: number; z?: number;
  dockAt: number; showPanel?: boolean }> =
  ({ f, y, s = 1, z = 60, dockAt, showPanel = true }) => (
  <div style={{ position: "absolute", left: 0, top: y, width: W, height: 300 * s, zIndex: z }}>
    {/* four cables running off the top of frame */}
    {[0.14, 0.38, 0.62, 0.86].map((p, i) => (
      <div key={"cb" + i} style={{ position: "absolute", left: W * p, top: -900, width: 5 * s,
        height: 900, background: `linear-gradient(180deg, ${hexa(CHROME, 0.1)} 0%, ${hexa(CHROME, 0.44)} 100%)` }} />
    ))}
    {/* the inverted deck */}
    <Deck y={0} flip c="#C9B282" cl="#E2D2AC" z={z + 1} h={104 * s} />
    {/* the inverted bench, hanging off the underside */}
    <div style={{ position: "absolute", left: W * 0.08, top: 100 * s, width: W * 0.30, height: 26 * s,
      zIndex: z + 2, background: `linear-gradient(180deg, ${dkh("#C9B282", 0.3)} 0%, ${dkh("#C9B282", 0.5)} 100%)` }} />
    {showPanel && (<>
      <AgentPanel x={W * 0.10} y={126 * s} s={s} z={z + 3} f={f} at={dockAt + 4} />
      <DiffSheet  x={W * 0.40} y={126 * s} s={s} z={z + 3} f={f} at={dockAt + 10} />
      <PlanCard   x={W * 0.68} y={126 * s} s={s} z={z + 3} f={f} at={dockAt + 16} />
    </>)}
  </div>
);

/* ---------------------------------------------------------------------------
   THE PRICE PLATE — a dock tonnage board whose digits spin and STOP on $0.
   ------------------------------------------------------------------------ */
export const PricePlate: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  stopAt: number }> = ({ x, y, s = 1, z = 78, f, stopAt }) => {
  const stopped = f >= stopAt;
  const w = 340 * s, h = 190 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s, background: "#1A222C",
        border: `${5 * s}px solid ${dkh(IRON, 0.24)}`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 16 * s, top: 14 * s, ...mono(15 * s, 800),
        color: hexa(BONE, 0.5), letterSpacing: "0.16em" }}>FREE PLAN</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 42 * s, textAlign: "center",
        ...mono(96 * s, 900), color: stopped ? GREEN : hexa(BONE, 0.72),
        transform: stopped ? `scale(${1 + E(f, stopAt, 6, 0.08, 0, OUT)})` : undefined }}>
        {stopped ? G.price : "$" + String(Math.floor(((f * 17) % 90) + 9))}
      </div>
      {/* the two allowance strips, which snap in after the digits stop */}
      {G.allowances.map((a, i) => {
        const on = E(f, stopAt + 8 + i * 8, 5, 0, 1, BACK);
        return (
          <div key={"al" + i} style={{ position: "absolute", left: 16 * s, top: (146 + i * 0) * s,
            width: w - 32 * s, height: 30 * s, borderRadius: 4 * s, background: hexa(GREEN, 0.14),
            border: `${2 * s}px solid ${hexa(GREEN, 0.5)}`, display: "flex", alignItems: "center",
            paddingLeft: 10 * s, ...mono(13 * s, 800), color: hexa(BONE, 0.9), letterSpacing: "0.05em",
            transform: `translateY(${(1 - on) * 26 * s}px) scaleY(${on})`, opacity: on,
            marginTop: i * 0 }}>
            {i === 0 ? a : null}
          </div>
        );
      })}
      {/* the second strip sits below the plate, so it does not overlap the first */}
      <div style={{ position: "absolute", left: 16 * s, top: 146 * s, width: w - 32 * s, height: 30 * s,
        borderRadius: 4 * s, background: hexa(GREEN, 0.14), border: `${2 * s}px solid ${hexa(GREEN, 0.5)}`,
        display: "flex", alignItems: "center", paddingLeft: 10 * s, ...mono(13 * s, 800),
        color: hexa(BONE, 0.9), letterSpacing: "0.05em",
        opacity: E(f, stopAt + 8, 5, 0, 1, OUT),
        transform: `translateY(${(1 - E(f, stopAt + 8, 5, 0, 1, BACK)) * 26 * s}px)` }}>
        {G.allowances[0]}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE MANIFOLD — a five-socket rack. Four canisters seat, one socket stays
   open and lit, because the list is longer than the sentence.
   ------------------------------------------------------------------------ */
export const Canister: React.FC<{ x: number; y: number; s?: number; z?: number;
  mark: string; t: string; c: string; vsc?: boolean }> =
  ({ x, y, s = 1, z = 72, mark, t, c, vsc = false }) => {
  const w = 128 * s, h = 168 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: `${16 * s}px ${16 * s}px ${5 * s}px ${5 * s}px`,
        background: `linear-gradient(154deg, ${mxh(c, 0.3)} 0%, ${c} 46%, ${dkh(c, 0.42)} 100%)`,
        border: `${3 * s}px solid ${hexa("#05070C", 0.55)}`, boxShadow: SH }} />
      {/* two pressure bands */}
      {[0.30, 0.62].map((p, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: 0, top: h * p, width: w, height: 7 * s,
          background: hexa("#05070C", 0.34) }} />
      ))}
      {/* the neck and valve */}
      <div style={{ position: "absolute", left: w / 2 - 15 * s, top: -16 * s, width: 30 * s, height: 20 * s,
        background: dkh(IRON, 0.1), borderRadius: `${5 * s}px ${5 * s}px 0 0` }} />
      {vsc ? <VscTile x={w / 2 - 30 * s} y={16 * s} s={60 * s} z={z + 2} />
           : <Tile x={w / 2 - 30 * s} y={16 * s} src={mark} s={60 * s} z={z + 2} />}
      <div style={{ position: "absolute", left: 0, right: 0, top: 92 * s, textAlign: "center",
        ...mono(12 * s, 900), color: "#FFFFFF", letterSpacing: "0.03em", lineHeight: 1.24,
        textShadow: `0 2px 0 ${hexa("#05070C", 0.5)}`, padding: `0 ${6 * s}px` }}>{t}</div>
    </div>
  );
};

export const Manifold: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  seats: number[] }> = ({ x, y, s = 1, z = 62, f, seats }) => {
  const w = 780 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: 60 * s, zIndex: z }}>
      {/* the header pipe */}
      <div style={{ position: "absolute", left: 0, top: 22 * s, width: w, height: 26 * s,
        borderRadius: 6 * s,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.32)} 0%, ${dkh(IRON, 0.34)} 100%)` }} />
      {[0, 1, 2, 3, 4].map((i) => {
        const seated = i < seats.length && f >= seats[i];
        const on = i < seats.length ? E(f, seats[i], 5, 0, 1, OUT) : 0.55 + Math.sin(f / 9) * 0.2;
        const cx = w * (0.11 + i * 0.195);
        return (
          <React.Fragment key={"sk" + i}>
            {/* the socket collar */}
            <div style={{ position: "absolute", left: cx - 30 * s, top: 6 * s, width: 60 * s, height: 24 * s,
              borderRadius: 5 * s, background: dkh(IRON, 0.44),
              border: `${3 * s}px solid ${hexa("#05070C", 0.5)}` }} />
            {/* the feed lamp above it */}
            <div style={{ position: "absolute", left: cx - 5 * s, top: -18 * s, width: 10 * s, height: 10 * s,
              borderRadius: "50%",
              background: i < seats.length ? (seated ? G.models[i].c : dkh(IRON, 0.1)) : AGV,
              opacity: 0.3 + on * 0.7 }} />
            {/* the feed line, which fills when the canister seats */}
            <div style={{ position: "absolute", left: cx - 2 * s, top: -8 * s, width: 4 * s, height: 16 * s,
              background: i < seats.length && seated ? G.models[i].c : hexa(IRON, 0.5), opacity: 0.4 + on * 0.6 }} />
          </React.Fragment>
        );
      })}
      {/* the fifth socket's label: the list is longer than the sentence */}
      <div style={{ position: "absolute", left: w * 0.895 - 60 * s, top: 56 * s, width: 120 * s,
        textAlign: "center", ...mono(11 * s, 800), color: hexa(AGV, 0.72), letterSpacing: "0.06em" }}>
        + {G.moreModels}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE EXTERIOR — two buildings, a wrecking ball and a banner.
   ------------------------------------------------------------------------ */
export const Tower: React.FC<{ x: number; y: number; w: number; h: number; c: string;
  lit: string; z?: number; f: number; mark?: string; vsc?: boolean; name?: string;
  s?: number; seed?: number }> =
  ({ x, y, w: ww, h: hh, c, lit, z = 30, f, mark, vsc = false, name, s = 1, seed = 0 }) => {
  const cols = 6, rows = Math.max(4, Math.floor(hh / 62));
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(96deg, ${mxh(c, 0.16)} 0%, ${c} 40%, ${dkh(c, 0.4)} 100%)`,
        border: `${3 * s}px solid ${hexa("#03050A", 0.7)}` }} />
      {/* the parapet */}
      <div style={{ position: "absolute", left: -10 * s, top: -14 * s, width: ww + 20 * s, height: 18 * s,
        background: dkh(c, 0.36), border: `${3 * s}px solid ${hexa("#03050A", 0.7)}` }} />
      {/* windows: the population that makes it read as a building, not a slab */}
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols), cc = i % cols;
        const on = ((r * 7 + cc * 3 + seed) % 11) > 3;
        const flick = on && ((r + cc + seed) % 5 === 0) ? (Math.sin(f / 13 + i) > 0.7 ? 0.35 : 1) : 1;
        return (
          <div key={"wn" + i} style={{ position: "absolute",
            left: (10 + cc * ((ww - 20 * s) / cols)) * 1, top: 22 * s + r * 58 * s,
            width: (ww - 20 * s) / cols - 12 * s, height: 34 * s,
            background: on ? hexa(lit, 0.82 * flick) : hexa("#05080F", 0.72),
            borderBottom: `${2 * s}px solid ${hexa("#03050A", 0.5)}` }} />
        );
      })}
      {mark && (vsc
        ? <VscTile x={ww / 2 - 34 * s} y={-84 * s} s={68 * s} z={z + 4} />
        : <Tile x={ww / 2 - 34 * s} y={-84 * s} src={mark} s={68 * s} z={z + 4} />)}
      {name && (
        <div style={{ position: "absolute", left: 0, right: 0, top: -110 * s, textAlign: "center",
          ...mono(14 * s, 900), color: hexa(lit, 0.9), letterSpacing: "0.12em" }}>{name}</div>
      )}
    </div>
  );
};

export const WreckingBall: React.FC<{ x: number; y: number; s?: number; z?: number;
  swing: number; chainTop?: number }> = ({ x, y, s = 1, z = 66, swing, chainTop = -520 }) => {
  const r = 62 * s;
  const ang = swing * 34;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${ang}deg)`, transformOrigin: `50% ${chainTop}px` }}>
      {/* the chain: real links, not a line */}
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: -5 * s, top: chainTop + i * (Math.abs(chainTop) / 16),
          width: 10 * s, height: 15 * s, borderRadius: "50%",
          border: `${3 * s}px solid ${hexa(CHROME, 0.4)}`, boxSizing: "border-box" }} />
      ))}
      <div style={{ position: "absolute", left: -r, top: 0, width: r * 2, height: r * 2,
        borderRadius: "50%",
        background: `radial-gradient(58% 52% at 34% 30%, #3C444E 0%, #1B2028 60%, #0A0D12 100%)`,
        border: `${3 * s}px solid ${hexa("#03050A", 0.8)}` }} />
      {/* the shackle */}
      <div style={{ position: "absolute", left: -11 * s, top: -14 * s, width: 22 * s, height: 22 * s,
        borderRadius: "50%", border: `${5 * s}px solid ${hexa(CHROME, 0.44)}`, boxSizing: "border-box" }} />
    </div>
  );
};

export const Banner: React.FC<{ x: number; y: number; w: number; t: string; s?: number;
  z?: number; f: number; haulFrom: number; haulTo: number }> =
  ({ x, y, w: ww, t, s = 1, z = 70, f, haulFrom, haulTo }) => {
  const p = E(f, haulFrom, haulTo - haulFrom, 0, 1, IO);
  const hh = 62 * s;
  const N = 12;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww * p, height: hh * 1.5, zIndex: z,
      overflow: "hidden" }}>
      {/* the cloth, in vertical slats that carry a travelling wave, so the banner
          keeps working after the haul finishes instead of freezing into a poster */}
      {Array.from({ length: N }, (_, i) => {
        const wave = Math.sin(f / 5.4 - i * 0.62) * 7 * s;
        const shade = 0.5 + 0.5 * Math.cos(f / 5.4 - i * 0.62);
        return (
          <div key={"bn" + i} style={{ position: "absolute", left: (ww / N) * i, top: wave,
            width: ww / N + 1, height: hh, overflow: "hidden",
            background: shade > 0.5 ? "#B03A2E" : "#8E2E24" }} />
        );
      })}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: hh,
        border: `${3 * s}px solid ${hexa("#05070C", 0.5)}`, boxSizing: "border-box",
        display: "flex", alignItems: "center", justifyContent: "center",
        ...mono(30 * s, 900), color: BONE, letterSpacing: "0.24em" }}>{t}</div>
      <div style={{ position: "absolute", left: 0, top: hh - 6 * s, width: ww, height: 6 * s,
        background: hexa("#05070C", 0.35) }} />
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐ THE HERO ARTIFACT — the double-decker editor. One window, both marks on
   its bar, floor content below and the Antigravity panel hanging above it.
   Withheld until S11 and held at S12.
   ------------------------------------------------------------------------ */
export const DeckerWindow: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  at: number; showModels?: boolean }> =
  ({ x, y, s = 1, z = 80, f, at, showModels = true }) => {
  const w = 640 * s, h = 400 * s;
  const on = E(f, at, 12, 0, 1, OUT);
  const split = E(f, at + 8, 14, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z,
      opacity: on, transform: `translateY(${(1 - on) * 40 * s}px)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s, background: "#141A22",
        border: `${4 * s}px solid ${hexa("#05070C", 0.66)}`, boxShadow: SH_D, overflow: "hidden" }}>
        {/* the title bar carrying BOTH marks */}
        <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 52 * s,
          background: "#1E2630", display: "flex", alignItems: "center", gap: 10 * s,
          paddingLeft: 12 * s, borderBottom: `${2 * s}px solid ${hexa("#05070C", 0.6)}` }}>
          <VscTile x={0} y={0} s={34 * s} z={z + 3} />
          <div style={{ width: 10 * s }} />
          <Tile x={0} y={0} src="antigravity.png" s={34 * s} z={z + 3} />
          <div style={{ ...mono(14 * s, 800), color: hexa(BONE, 0.7), letterSpacing: "0.08em",
            paddingLeft: 12 * s }}>{G.version}</div>
        </div>
        {/* the ANTIGRAVITY half, hanging from the bar */}
        <div style={{ position: "absolute", left: 0, top: 52 * s, width: w, height: (h - 52 * s) * 0.44 * split,
          background: `linear-gradient(180deg, ${hexa(AGV, 0.16)} 0%, ${hexa(AGV, 0.05)} 100%)`,
          borderBottom: `${3 * s}px solid ${hexa(AGV, 0.55)}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 14 * s, top: 10 * s, ...mono(12 * s, 800),
            color: hexa(AGV, 0.92), letterSpacing: "0.12em" }}>{G.panel.join("  ·  ")}</div>
          {[0, 1, 2].map((i) => (
            <div key={"dw" + i} style={{ position: "absolute", left: 14 * s, top: (34 + i * 22) * s,
              width: (300 - i * 60) * s, height: 12 * s, borderRadius: 2 * s,
              background: hexa(AGV, 0.3 - i * 0.06),
              opacity: E(f, at + 14 + i * 3, 5, 0, 1, OUT) }} />
          ))}
        </div>
        {/* the VS CODE half, on the floor */}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: w, height: (h - 52 * s) * 0.56,
          background: "#101820" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 44 * s, height: "100%",
            background: "#0B1118", borderRight: `${2 * s}px solid ${hexa("#05070C", 0.6)}` }} />
          {Array.from({ length: 7 }, (_, i) => (
            <div key={"cd" + i} style={{ position: "absolute", left: 58 * s, top: (16 + i * 20) * s,
              width: (280 - (i % 4) * 54) * s, height: 8 * s, borderRadius: 2 * s,
              background: hexa([SKY, BONE, VSC, BONE][i % 4], 0.34) }} />
          ))}
        </div>
        {/* the model list down the right edge */}
        {showModels && (
          <div style={{ position: "absolute", right: 12 * s, top: 66 * s, width: 190 * s, zIndex: 4 }}>
            {G.models.map((m, i) => (
              <div key={"ml" + i} style={{ display: "flex", alignItems: "center", gap: 7 * s,
                marginBottom: 7 * s, padding: `${5 * s}px ${7 * s}px`, borderRadius: 5 * s,
                background: hexa("#05070C", 0.5), border: `${1.5 * s}px solid ${hexa(m.c, 0.5)}`,
                opacity: E(f, at + 18 + i * 3, 5, 0, 1, OUT) }}>
                <div style={{ width: 18 * s, height: 18 * s, borderRadius: 4 * s, background: "#FFF",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile("logos/" + m.mark)} style={{ width: 13 * s, height: 13 * s, objectFit: "contain" }} />
                </div>
                <span style={{ ...mono(10 * s, 800), color: hexa(BONE, 0.86) }}>{m.t}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/** the CTA plate — letters strike in one at a time, house grammar */
export const CommentPlate: React.FC<{ x: number; y: number; word: string; s?: number; z?: number;
  f: number; at: number; per?: number; c?: string }> =
  ({ x, y, word, s = 1, z = 86, f, at, per = 4, c = AGV }) => {
  const chars = word.split("");
  const w = chars.length * 62 * s + 40 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: 104 * s, zIndex: z,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 6 * s,
      background: "#1A222C", borderRadius: 10 * s, border: `${4 * s}px solid ${hexa(c, 0.45)}`,
      boxShadow: SH_D,
      opacity: E(f, at - 5, 5, 0, 1, OUT),
      transform: `scale(${0.86 + E(f, at - 5, 6, 0, 1, BACK) * 0.14})` }}>
      {chars.map((ch, i) => {
        const k = E(f, at + i * per, 4, 0, 1, BACK);
        return (
          <span key={"cp" + i} style={{ ...mono(56 * s, 900), color: c, opacity: k,
            transform: `scale(${0.6 + k * 0.4}) translateY(${(1 - k) * -18 * s}px)`,
            display: "inline-block", letterSpacing: "0.02em" }}>{ch}</span>
        );
      })}
    </div>
  );
};
