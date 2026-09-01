import React from "react";
import { Img, staticFile } from "remotion";
import { Brain } from "./BillProps";
import {
  W, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, mono, ui, R,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER, BRAIN, BRAIND,
} from "./MemWorld";

/* ===========================================================================
   REEL 124 · "MEM" — THE PROPS.

   ⛔⛔ A CONTAINER IS STILL A CONTAINER WHEN IT IS A NICE BOX. Reel 112 shipped
   repos as brown crates and got *"I don't like how each of the repos are
   represented as brown boxes"*; the fix was a BOUND VOLUME with fourteen drawn
   parts. So nothing below is a rectangle with a word on it. The count that
   matters is how many parts a viewer can NAME.

   ⛔ CATEGORY IS COMMUNICATED BY STRUCTURE, NOT HUE. Before drawing anything,
   the four or five features a viewer actually uses to identify it are listed in
   its comment, and every one of them is drawn.

   ⛔ A PROP THAT RENDERS IS NOT A PROP THAT IS VISIBLE. Every object here names
   the luma step between it and its ground. Dark-neutral-on-dark-neutral has no
   edge, and the motion audit cannot see it either.
   ========================================================================= */

/* =========================================================================
   1 · THE HERO ARTIFACT — THE TOPIC FILE
   What makes something read as a FILE rather than a card:
     a raised TAB · a banded SPINE edge · a LABEL strip on the tab ·
     a body of RULED LINES · a stamped MARK · a dog-eared corner
   All six are drawn. The label carries the topic; the stamp carries the brand.
   VALUE: cream (#F2EDE0) against every ground it ever sits on, all of which are
   dark. It is always the light subject on a darker field.
   ====================================================================== */
export const TopicFile: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  topic?: string; rot?: number; open?: number; lines?: number; struck?: number;
  added?: number; c?: string; mark?: boolean; burn?: number }> =
  ({ x, y, s = 1, z = 50, f = 0, topic, rot = 0, open = 0, lines = 4, struck = 0,
     added = 0, c = CREAMB, mark = true, burn = 0 }) => {
  const FW = 132 * s, FH = 96 * s;
  const op = Math.max(0, Math.min(1, open));
  const bu = Math.max(0, Math.min(1, burn));
  const body = bu > 0.02 ? `rgb(${Math.round(242 - bu * 190)},${Math.round(237 - bu * 200)},${Math.round(224 - bu * 196)})` : c;
  return (
    <div style={{ position: "absolute", left: x - FW / 2, top: y - FH, width: FW, height: FH,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the BACK leaf, revealed as the cover swings open */}
      {op > 0.02 && (
        <div style={{ position: "absolute", left: FW * 0.06, top: -FH * 0.06 * op,
          width: FW * 0.94, height: FH, borderRadius: 5 * s, background: dkh(body, 0.10),
          transform: `rotate(${op * 4}deg)` }} />
      )}
      {/* 1 · the TAB — the single feature that says "file" */}
      <div style={{ position: "absolute", left: FW * 0.16, top: -11 * s, width: FW * 0.40,
        height: 15 * s, borderRadius: `${5 * s}px ${5 * s}px 0 0`,
        background: dkh(body, 0.10), borderTop: `${2 * s}px solid ${mxh(body, 0.30)}` }} />
      {/* the label strip on the tab */}
      {topic && (
        <div style={{ position: "absolute", left: FW * 0.18, top: -9 * s, width: FW * 0.36,
          height: 11 * s, display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden" }}>
          <span style={{ ...mono(Math.round(9 * s), 900), color: hexa(INK, 0.80),
            letterSpacing: 0.6 }}>{topic}</span>
        </div>
      )}
      {/* 2 · the BODY */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s, boxShadow: SH_D,
        background: `linear-gradient(168deg, ${mxh(body, 0.16)} 0%, ${body} 46%, ${dkh(body, 0.10)} 100%)`,
        transform: `rotate(${-op * 3}deg)`, transformOrigin: "0% 50%" }}>
        {/* 3 · the banded SPINE — a file is bound on one edge */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 9 * s, height: "100%",
          borderRadius: `${5 * s}px 0 0 ${5 * s}px`, background: dkh(body, 0.34) }} />
        <div style={{ position: "absolute", left: 9 * s, top: 0, width: 2 * s, height: "100%",
          background: dkh(body, 0.18) }} />
        {/* 4 · the RULED LINES — the content. Struck lines get a rule through
            them; added lines land bright and short. */}
        {Array.from({ length: lines }, (_, i) => {
          const isStruck = i < struck;
          const isAdded = i >= lines - added;
          const lw = (FW * 0.60 - (i % 3) * 13 * s) * (isAdded ? 1 : 1);
          return (
            <div key={"ln" + i} style={{ position: "absolute", left: 20 * s,
              top: (18 + i * 15) * s, width: lw, height: 4 * s, borderRadius: 2 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 2,
                background: isAdded ? hexa(GREEN, 0.92) : hexa(INK, isStruck ? 0.20 : 0.34) }} />
              {isStruck && (
                <div style={{ position: "absolute", left: -3 * s, top: 1 * s, width: lw + 6 * s,
                  height: 2.5 * s, background: hexa(RED, 0.92) }} />
              )}
            </div>
          );
        })}
        {/* 5 · the stamped MARK — the audience filter, never on a sprite's face */}
        {mark && (
          <div style={{ position: "absolute", right: 9 * s, bottom: 8 * s, width: 24 * s,
            height: 24 * s, borderRadius: 6 * s, background: "#FFFFFF",
            border: `${1.6 * s}px solid ${dkh(body, 0.22)}`, display: "flex",
            alignItems: "center", justifyContent: "center", opacity: 0.96 }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 17 * s, height: 17 * s, objectFit: "contain" }} />
          </div>
        )}
        {/* 6 · the dog-eared corner */}
        <div style={{ position: "absolute", right: 0, top: 0, width: 15 * s, height: 15 * s,
          background: dkh(body, 0.20),
          clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
      </div>
    </div>
  );
};

/* =========================================================================
   2 · THE HAND-KEPT VAULT — the crate the hook drops
   What says CRATE: sawn PLANKS with gaps · cross BATTENS · corner IRONS ·
   a rope HANDLE · a stencilled mark. What says HAND-KEPT: it is OVERFULL, paper
   spilling out of the top, and the lid does not sit down.
   ⛔ The Obsidian mark is on a white tile because that is the house convention
   for a real mark, and it is the noun in the spoken line. Nothing here says the
   product is broken — only that this vault is one you fill by hand.
   VALUE: dark oak (#4A3826) against the hook's bone wall — the biggest value
   spread in the reel, which is where its hierarchy comes from.
   ====================================================================== */
export const NoteCrate: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  bow?: number; spill?: number; mark?: string }> =
  ({ x, y, s = 1, z = 60, f = 0, bow = 0, spill = 1, mark = "obsidian.svg" }) => {
  const CW = 300 * s, CH = 196 * s;
  const bw = Math.max(0, Math.min(1, bow));
  return (
    <div style={{ position: "absolute", left: x - CW / 2, top: y - CH, width: CW, height: CH, zIndex: z }}>
      {/* the paper spilling OVER the lip — drawn first so it sits behind the front planks */}
      {spill > 0.01 && Array.from({ length: 7 }, (_, i) => {
        const px = CW * (0.10 + i * 0.13), lift = 16 + (i % 3) * 13;
        return (
          <div key={"sp" + i} style={{ position: "absolute", left: px, top: -lift * s,
            width: 46 * s, height: (lift + 20) * s, borderRadius: 3 * s, zIndex: 1,
            background: `linear-gradient(180deg, ${PAPER} 0%, ${dkh(PAPER, 0.14)} 100%)`,
            transform: `rotate(${-14 + i * 4.6}deg)`, transformOrigin: "50% 100%",
            opacity: spill }}>
            {[0, 1].map(k => (
              <div key={k} style={{ position: "absolute", left: 8 * s, top: (7 + k * 8) * s,
                width: 28 * s, height: 2.4 * s, background: hexa(INK, 0.26) }} />
            ))}
          </div>
        );
      })}
      {/* the LID, bowing under its own load — weight is DEFORMATION */}
      <div style={{ position: "absolute", left: -6 * s, top: -6 * s - bw * 3 * s, width: CW + 12 * s,
        height: 20 * s, zIndex: 4, borderRadius: 3 * s,
        transform: `perspective(600px) rotateX(${bw * 7}deg)`,
        background: `linear-gradient(180deg, ${mxh("#5E4830", 0.18)} 0%, ${dkh("#5E4830", 0.24)} 100%)` }} />
      {/* the PLANKS — five, with visible gaps and grain */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, borderRadius: 4 * s, overflow: "hidden",
        background: dkh("#4A3826", 0.30) }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"pk" + i} style={{ position: "absolute", left: 0, top: `${i * 20 + 1}%`,
            width: "100%", height: "18.4%",
            background: `linear-gradient(180deg, ${mxh("#4A3826", 0.16 - i * 0.02)} 0%, ${dkh("#4A3826", 0.10 + i * 0.03)} 100%)` }}>
            <div style={{ position: "absolute", left: `${12 + i * 15}%`, top: "34%", width: "34%",
              height: 2 * s, background: hexa("#241A10", 0.42), borderRadius: 2 }} />
          </div>
        ))}
        {/* the cross BATTENS */}
        {[0.10, 0.86].map((bx, i) => (
          <div key={"bt" + i} style={{ position: "absolute", left: `${bx * 100}%`, top: 0,
            width: 22 * s, height: "100%", background: dkh("#5E4830", 0.06) }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: "44%", width: "100%", height: 18 * s,
          background: dkh("#5E4830", 0.06), transform: "rotate(-3.4deg)" }} />
      </div>
      {/* the corner IRONS */}
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], i) => (
        <div key={"ci" + i} style={{ position: "absolute", zIndex: 5,
          left: cx ? CW - 26 * s : 0, top: cy ? CH - 26 * s : 0, width: 26 * s, height: 26 * s,
          background: `linear-gradient(140deg, ${mxh(STEEL, 0.10)} 0%, ${dkh(STEEL, 0.48)} 100%)`,
          borderRadius: 3 * s }}>
          <div style={{ position: "absolute", left: 9 * s, top: 9 * s, width: 7 * s, height: 7 * s,
            borderRadius: "50%", background: dkh(STEEL, 0.60) }} />
        </div>
      ))}
      {/* the rope HANDLE on the near end */}
      <div style={{ position: "absolute", left: CW * 0.40, top: CH * 0.60, width: CW * 0.20,
        height: 12 * s, zIndex: 6, borderRadius: 6 * s, background: dkh("#8A7048", 0.10),
        border: `${2 * s}px solid ${dkh("#6A5434", 0.20)}` }} />
      {/* the MARK, on a white tile — real marks go on white tiles, house-wide */}
      <div style={{ position: "absolute", left: CW / 2 - 42 * s, top: CH * 0.20, zIndex: 7,
        width: 84 * s, height: 84 * s, borderRadius: 20 * s, background: "#FBF8F0",
        border: `${3 * s}px solid #D8CFBC`, display: "flex", alignItems: "center",
        justifyContent: "center", boxShadow: SH }}>
        <Img src={staticFile(`logos/${mark}`)}
          style={{ width: 54 * s, height: 54 * s, objectFit: "contain" }} />
      </div>
      {/* the hand-lettered load line — a vault you fill yourself */}
      <div style={{ position: "absolute", left: 0, top: CH * 0.78, width: CW, zIndex: 7,
        textAlign: "center" }}>
        <span style={{ ...mono(Math.round(15 * s), 900), color: hexa("#E6DAC0", 0.68),
          letterSpacing: 2.4 }}>KEPT BY HAND</span>
      </div>
    </div>
  );
};

/* =========================================================================
   3 · THE TOPIC WALL — the settings section, as a place
   What says a BAY of files rather than a shelf: a dark MOUTH behind the
   contents (so the wall has depth), a lit SHELF LIP, a stamped LABEL PLATE at
   the top of each bay, and DIVIDER PIERS with a real thickness between bays.
   ⛔ An empty bay must read WHILE EMPTY — the mouth is lit cream from inside
   when `lit`, so a removed file leaves a bright hole, not a black one.
   ====================================================================== */
export const Bay: React.FC<{ x: number; y: number; w: number; h: number; s?: number; z?: number;
  f?: number; label?: string; n?: number; fill?: number; lit?: number; labelOn?: number;
  empty?: boolean; c?: string }> =
  ({ x, y, w: bw, h: bh, s = 1, z = 40, f = 0, label, n = 5, fill = 1, lit = 0,
     labelOn = 1, empty = false, c }) => {
  const shown = empty ? 0 : Math.round(n * Math.max(0, Math.min(1, fill)));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: bw, height: bh, zIndex: z }}>
      {/* the dark MOUTH — this is what gives the wall depth */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 3,
        background: lit > 0.01
          ? `linear-gradient(180deg, ${hexa("#FFF3D6", 0.30 + lit * 0.55)} 0%, ${hexa("#C9B896", 0.20 + lit * 0.40)} 100%)`
          : `linear-gradient(180deg, #14110C 0%, #0A0806 100%)` }} />
      {/* the back of the bay catches a little of the room light */}
      <div style={{ position: "absolute", left: 4, top: 4, width: bw - 8, height: 14,
        background: hexa("#6E6250", 0.34 + lit * 0.3) }} />
      {/* ⭐ THE BOOKS, AND THEY ARE THE BAY'S OWN COLOUR (Alex: *"each category
          must be diff color books"*). What makes a spine read as a BOOK rather
          than as a coloured rectangle: a rounded head and tail, two raised
          BANDS across it, a lighter LABEL patch between them, and a thin bright
          fore-edge down one side where the page block shows. Five drawn parts
          per spine against the one it had before. */}
      {Array.from({ length: shown }, (_, i) => {
        const fw = (bw - 16) / n;
        const lean = -3 + ((i * 5) % 7);
        const bc = c ?? CREAMB;
        const tone = i % 3 === 0 ? mxh(bc, 0.16) : i % 3 === 1 ? bc : dkh(bc, 0.18);
        return (
          <div key={"bf" + i} style={{ position: "absolute", left: 8 + i * fw,
            bottom: 9, width: fw - 4, height: bh - 26 - (i % 3) * 7,
            borderRadius: 3, transformOrigin: "50% 100%", transform: `rotate(${lean * 0.34}deg)`,
            overflow: "hidden",
            background: `linear-gradient(92deg, ${dkh(tone, 0.26)} 0%, ${tone} 38%, ${dkh(tone, 0.34)} 100%)` }}>
            {/* the two raised bands */}
            {[0.20, 0.66].map((by, k) => (
              <div key={k} style={{ position: "absolute", left: 0, top: `${by * 100}%`,
                width: "100%", height: 4, background: dkh(tone, 0.44) }} />
            ))}
            {/* the label patch between them */}
            <div style={{ position: "absolute", left: "16%", top: "30%", width: "68%", height: "30%",
              borderRadius: 1, background: hexa("#F4EFE2", 0.86) }}>
              <div style={{ position: "absolute", left: "14%", top: "26%", width: "62%", height: 2,
                background: hexa(INK, 0.42) }} />
            </div>
            {/* the fore-edge: the page block showing down one side */}
            <div style={{ position: "absolute", right: 0, top: 2, width: 3, height: "96%",
              background: hexa("#F2ECDC", 0.62) }} />
          </div>
        );
      })}
      {/* the lit SHELF LIP — the hard bright edge the files stand on */}
      <div style={{ position: "absolute", left: -5, bottom: -7, width: bw + 10, height: 11,
        borderRadius: 2,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.36)} 0%, ${dkh(BRASS, 0.34)} 100%)` }} />
      {/* the stamped LABEL PLATE */}
      {label && labelOn > 0.01 && (
        <div style={{ position: "absolute", left: bw * 0.5 - 62 * s, top: -25 * s,
          width: 124 * s, height: 23 * s, borderRadius: 4 * s,
          transform: `scale(${E(labelOn, 0, 1, 0.4, 1, BACK)})`, transformOrigin: "50% 100%",
          background: `linear-gradient(180deg, ${mxh(c ?? BRASS, 0.34)} 0%, ${dkh(c ?? BRASS, 0.20)} 100%)`,
          border: `${2 * s}px solid ${dkh(c ?? BRASS, 0.42)}`, display: "flex",
          alignItems: "center", justifyContent: "center", boxShadow: SH_D }}>
          <span style={{ ...mono(Math.round(13 * s), 900), color: "#1A1208", letterSpacing: 1.5 }}>
            {label}</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   4 · THE PRESS — where speech becomes a file, WHILE he talks
   What says PRESS: two UPRIGHTS in a C-frame · a CROWN · a RAM on guide rails ·
   a DIE BLOCK it comes down on · a FLYWHEEL turning · a BELT off the flywheel.
   The ram's stroke is 96px on a 190px frame — half its own height, well past
   the one-third floor at which a move stops being a state change.
   ====================================================================== */
export const Press: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  stroke?: number; c?: string }> =
  ({ x, y, s = 1, z = 46, f, stroke = 0, c = BRASS }) => {
  const PW = 232 * s, PH = 300 * s;
  const st = Math.max(0, Math.min(1, stroke));
  return (
    <div style={{ position: "absolute", left: x - PW / 2, top: y - PH, width: PW, height: PH, zIndex: z }}>
      {/* the two UPRIGHTS */}
      {[0, 1].map(i => (
        <div key={"up" + i} style={{ position: "absolute", left: i ? PW - 40 * s : 0, top: 0,
          width: 40 * s, height: PH, borderRadius: 4 * s,
          background: `linear-gradient(96deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.16)} 44%, ${dkh(c, 0.44)} 100%)` }}>
          {[0.16, 0.5, 0.84].map((by, k) => (
            <div key={k} style={{ position: "absolute", left: 12 * s, top: `${by * 100}%`,
              width: 15 * s, height: 15 * s, borderRadius: "50%", background: dkh(c, 0.52) }} />
          ))}
        </div>
      ))}
      {/* the CROWN */}
      <div style={{ position: "absolute", left: -10 * s, top: 0, width: PW + 20 * s, height: 46 * s,
        borderRadius: 5 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.28)} 100%)` }} />
      {/* the GUIDE RAILS the ram runs on */}
      {[0.30, 0.70].map((gx, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: PW * gx - 4 * s, top: 44 * s,
          width: 8 * s, height: PH * 0.52, background: dkh(STEEL, 0.34) }} />
      ))}
      {/* the RAM — 96px of stroke, and it lands on a die block */}
      <div style={{ position: "absolute", left: 34 * s, top: 44 * s + st * 96 * s,
        width: PW - 68 * s, height: 62 * s, borderRadius: 4 * s, zIndex: 4, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.30)} 62%, ${dkh(STEEL, 0.52)} 100%)` }}>
        <div style={{ position: "absolute", left: "50%", top: 12 * s, marginLeft: -26 * s,
          width: 52 * s, height: 20 * s, borderRadius: 3 * s, background: dkh(STEEL, 0.52),
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(Math.round(11 * s), 900), color: hexa("#F0E6D0", 0.7) }}>MEM</span>
        </div>
      </div>
      {/* the DIE BLOCK */}
      <div style={{ position: "absolute", left: 22 * s, top: PH - 74 * s, width: PW - 44 * s,
        height: 34 * s, zIndex: 3, borderRadius: 3 * s,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.24)} 0%, ${dkh(SLATE, 0.40)} 100%)` }} />
      {/* the base */}
      <div style={{ position: "absolute", left: -14 * s, top: PH - 40 * s, width: PW + 28 * s,
        height: 40 * s, zIndex: 2, borderRadius: 4 * s, background: dkh(c, 0.52) }} />
      {/* the FLYWHEEL, always turning — the background process this prop owns */}
      <div style={{ position: "absolute", left: -54 * s, top: PH * 0.32, width: 96 * s,
        height: 96 * s, zIndex: 1, borderRadius: "50%",
        transform: `rotate(${f * 7.4}deg)`,
        background: `conic-gradient(${dkh(c, 0.30)} 0deg, ${mxh(c, 0.20)} 60deg, ${dkh(c, 0.42)} 180deg, ${mxh(c, 0.14)} 300deg, ${dkh(c, 0.30)} 360deg)`,
        border: `${5 * s}px solid ${dkh(c, 0.48)}` }}>
        {[0, 60, 120].map(a => (
          <div key={a} style={{ position: "absolute", left: "50%", top: "50%", width: 76 * s,
            height: 7 * s, marginLeft: -38 * s, marginTop: -3.5 * s, background: dkh(c, 0.46),
            transform: `rotate(${a}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 22 * s, height: 22 * s,
          marginLeft: -11 * s, marginTop: -11 * s, borderRadius: "50%", background: dkh(c, 0.56) }} />
      </div>
    </div>
  );
};

/* =========================================================================
   5 · THE CHAT PANE — what a conversation looks like as an object
   What says a CHAT: a titled HEADER BAR, alternating message ROWS with
   different widths, and a composer line at the foot. What says THIS one is
   OVER: the rows drain out of it.
   ====================================================================== */
export const ChatPane: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  f?: number; rows?: number; title?: string; dim?: number; blank?: boolean }> =
  ({ x, y, w: pw, h: ph, z = 40, f = 0, rows = 4, title = "CHAT", dim = 0, blank = false }) => (
  <div style={{ position: "absolute", left: x, top: y, width: pw, height: ph, zIndex: z,
    borderRadius: 8, overflow: "hidden", boxShadow: SH_D,
    background: `linear-gradient(176deg, ${dkh("#F7F5F0", 0.06 + dim * 0.42)} 0%, ${dkh("#E4DFD4", 0.10 + dim * 0.44)} 100%)`,
    border: `4px solid ${dkh("#8E8676", 0.24 + dim * 0.3)}` }}>
    {/* the header bar with its three dots */}
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 28,
      background: dkh("#CFC7B6", 0.14 + dim * 0.36), display: "flex", alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", marginLeft: i ? 6 : 11,
          background: hexa(INK, 0.24) }} />
      ))}
      <span style={{ ...mono(11, 900), color: hexa(INK, 0.52), marginLeft: 12, letterSpacing: 1.2 }}>
        {title}</span>
    </div>
    {/* the message rows */}
    {!blank && Array.from({ length: rows }, (_, i) => {
      const right = i % 2 === 1;
      const rw = pw * (right ? 0.42 : 0.60) - (i % 3) * 12;
      return (
        <div key={"mr" + i} style={{ position: "absolute", top: 42 + i * 30,
          left: right ? undefined : 12, right: right ? 12 : undefined,
          width: rw, height: 21, borderRadius: 6,
          background: right ? hexa(CLAY, 0.62 - dim * 0.4) : hexa(INK, 0.16) }} />
      );
    })}
    {/* the composer line */}
    <div style={{ position: "absolute", left: 12, bottom: 10, width: pw - 24, height: 18,
      borderRadius: 9, border: `2px solid ${hexa(INK, 0.16)}` }} />
  </div>
);

/* =========================================================================
   6 · THE SWITCH LEVER — the verb in "every time you SWITCH chats"
   What says LEVER: a quadrant PLATE with detent notches, an ARM with a ball
   grip, a pivot BOSS, and two labelled positions. A fade is not a switch; a
   mechanism is.
   ====================================================================== */
export const SwitchLever: React.FC<{ x: number; y: number; s?: number; z?: number;
  throw_?: number; a?: string; b?: string }> =
  ({ x, y, s = 1, z = 62, throw_ = 0, a = "THIS CHAT", b = "NEW CHAT" }) => {
  const t = Math.max(0, Math.min(1, throw_));
  const ang = -34 + t * 68;
  return (
    <div style={{ position: "absolute", left: x - 70 * s, top: y - 190 * s, width: 140 * s,
      height: 190 * s, zIndex: z }}>
      {/* the quadrant plate */}
      <div style={{ position: "absolute", left: 18 * s, top: 92 * s, width: 104 * s, height: 62 * s,
        borderRadius: `${52 * s}px ${52 * s}px 0 0`,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.36)} 100%)`,
        border: `${3 * s}px solid ${dkh(SLATE, 0.48)}` }} />
      {/* the detent notches */}
      {[-34, 34].map((na, i) => (
        <div key={"dt" + i} style={{ position: "absolute", left: 68 * s, top: 96 * s,
          width: 5 * s, height: 26 * s, background: dkh(SLATE, 0.60), transformOrigin: "50% 200%",
          transform: `rotate(${na}deg)` }} />
      ))}
      {/* the ARM */}
      <div style={{ position: "absolute", left: 66 * s, top: 22 * s, width: 9 * s, height: 130 * s,
        transformOrigin: "50% 100%", transform: `rotate(${ang}deg)`,
        background: `linear-gradient(96deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.40)} 100%)` }}>
        {/* the ball grip */}
        <div style={{ position: "absolute", left: -13 * s, top: -22 * s, width: 34 * s,
          height: 34 * s, borderRadius: "50%", boxShadow: SH_D,
          background: `radial-gradient(38% 34% at 36% 30%, ${mxh(RED, 0.40)} 0%, ${dkh(RED, 0.24)} 68%, ${dkh(RED, 0.52)} 100%)` }} />
      </div>
      {/* the pivot boss */}
      <div style={{ position: "absolute", left: 56 * s, top: 140 * s, width: 30 * s, height: 30 * s,
        borderRadius: "50%", background: dkh(STEEL, 0.52),
        border: `${3 * s}px solid ${dkh(STEEL, 0.66)}` }} />
      {/* the two positions */}
      {[[a, 6 * s, -1], [b, 92 * s, 1]].map(([t2, lx], i) => (
        <div key={"pos" + i} style={{ position: "absolute", left: lx as number, top: 160 * s,
          width: 62 * s, textAlign: "center" }}>
          <span style={{ ...mono(Math.round(10 * s), 900),
            color: hexa(i === 0 ? (t < 0.5 ? GOLD : MUTE) : (t >= 0.5 ? GOLD : MUTE), 0.95),
            letterSpacing: 0.8 }}>{t2 as string}</span>
        </div>
      ))}
    </div>
  );
};

/* =========================================================================
   7 · THE THREE OUTLETS — real devices, each with its OWN silhouette
   ⛔ Reel 115: five identical white tiles became the loudest thing in frame and
   carried one bit between them. Identity is SHAPE **and** COLOUR, so these
   three share nothing: a browser is wide with a chrome bar, a desktop is a
   bezel on a neck and a foot, a phone is tall with a notch.
   ====================================================================== */
export const BrowserWin: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  lit?: number }> = ({ x, y, s = 1, z = 50, f = 0, lit = 1 }) => {
  const BW = 244 * s, BH = 168 * s;
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH, width: BW, height: BH,
      zIndex: z, borderRadius: 9 * s, overflow: "hidden", boxShadow: SH,
      background: "#F7F5F0", border: `${4 * s}px solid ${dkh("#7E8794", 0.20)}` }}>
      {/* the chrome bar — three lights, a TAB with a shoulder, an address pill */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 34 * s,
        background: `linear-gradient(180deg, #DCD8CE 0%, #C6C1B4 100%)` }}>
        {[RED, SODIUM, GREEN].map((cc, i) => (
          <div key={i} style={{ position: "absolute", left: (9 + i * 15) * s, top: 7 * s,
            width: 10 * s, height: 10 * s, borderRadius: "50%", background: cc }} />
        ))}
        <div style={{ position: "absolute", left: 62 * s, top: 6 * s, width: 92 * s, height: 28 * s,
          borderRadius: `${7 * s}px ${7 * s}px 0 0`, background: "#F7F5F0" }} />
        <div style={{ position: "absolute", left: 74 * s, top: 15 * s, width: 60 * s, height: 5 * s,
          borderRadius: 3, background: hexa(INK, 0.28) }} />
      </div>
      <div style={{ position: "absolute", left: 10 * s, top: 40 * s, width: BW - 32 * s,
        height: 15 * s, borderRadius: 8 * s, background: "#E6E2D8",
        border: `${2 * s}px solid ${hexa(INK, 0.10)}` }} />
      {/* the content, lit */}
      {[0, 1, 2].map(i => (
        <div key={"cr" + i} style={{ position: "absolute", left: 14 * s, top: (68 + i * 24) * s,
          width: (BW - 44 * s) * (1 - i * 0.18), height: 12 * s, borderRadius: 3,
          background: hexa(i === 1 ? CLAY : INK, (i === 1 ? 0.68 : 0.20) * (0.4 + lit * 0.6)) }} />
      ))}
    </div>
  );
};

export const DeskMachine: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  lit?: number }> = ({ x, y, s = 1, z = 50, f = 0, lit = 1 }) => {
  const MW = 210 * s, MH = 148 * s;
  return (
    <div style={{ position: "absolute", left: x - MW / 2, top: y - MH - 54 * s, width: MW,
      height: MH + 54 * s, zIndex: z }}>
      {/* the bezel */}
      <div style={{ position: "absolute", left: 0, top: 0, width: MW, height: MH,
        borderRadius: 10 * s, boxShadow: SH,
        background: `linear-gradient(168deg, ${mxh("#3A414C", 0.18)} 0%, ${dkh("#3A414C", 0.30)} 100%)`,
        border: `${5 * s}px solid ${dkh("#252A32", 0)}` }}>
        <div style={{ position: "absolute", inset: 9 * s, borderRadius: 4 * s, overflow: "hidden",
          background: `linear-gradient(178deg, ${mxh(TEAL, 0.10 + lit * 0.20)} 0%, #0E1A22 100%)` }}>
          {[0, 1, 2, 3].map(i => (
            <div key={"sr" + i} style={{ position: "absolute", left: 12 * s, top: (14 + i * 21) * s,
              width: (MW * 0.62 - i * 14 * s), height: 9 * s, borderRadius: 2,
              background: hexa(i === 0 ? CLAY : TEAL, (i === 0 ? 0.86 : 0.42) * (0.3 + lit * 0.7)) }} />
          ))}
        </div>
      </div>
      {/* the NECK and the FOOT — the two things a monitor has that nothing else does */}
      <div style={{ position: "absolute", left: MW / 2 - 15 * s, top: MH - 4 * s, width: 30 * s,
        height: 36 * s, background: `linear-gradient(96deg, ${mxh("#3A414C", 0.14)} 0%, ${dkh("#3A414C", 0.34)} 100%)` }} />
      <div style={{ position: "absolute", left: MW / 2 - 64 * s, top: MH + 30 * s, width: 128 * s,
        height: 13 * s, borderRadius: 6 * s, background: dkh("#3A414C", 0.38) }} />
      {/* a keyboard, so it reads as a desk machine and not a TV */}
      <div style={{ position: "absolute", left: MW / 2 - 78 * s, top: MH + 44 * s, width: 156 * s,
        height: 10 * s, borderRadius: 3 * s, background: dkh("#4A515C", 0.22) }} />
    </div>
  );
};

export const PhoneDev: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  lit?: number }> = ({ x, y, s = 1, z = 50, f = 0, lit = 1 }) => {
  const PW = 96 * s, PH = 190 * s;
  return (
    <div style={{ position: "absolute", left: x - PW / 2, top: y - PH, width: PW, height: PH,
      zIndex: z, borderRadius: 16 * s, boxShadow: SH,
      background: `linear-gradient(168deg, ${mxh("#2E343E", 0.20)} 0%, ${dkh("#2E343E", 0.34)} 100%)`,
      border: `${5 * s}px solid ${dkh("#1C2028", 0)}` }}>
      <div style={{ position: "absolute", inset: 6 * s, borderRadius: 11 * s, overflow: "hidden",
        background: `linear-gradient(178deg, ${mxh(SKY, 0.06 + lit * 0.24)} 0%, #101822 100%)` }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"pr" + i} style={{ position: "absolute", left: 9 * s, top: (28 + i * 22) * s,
            width: (PW - 30 * s) * (i % 2 ? 0.64 : 0.92), height: 10 * s, borderRadius: 3,
            background: hexa(i === 1 ? CLAY : SKY, (i === 1 ? 0.86 : 0.36) * (0.3 + lit * 0.7)) }} />
        ))}
      </div>
      {/* the NOTCH and the HOME BAR — a phone's two identifying features */}
      <div style={{ position: "absolute", left: PW / 2 - 22 * s, top: 4 * s, width: 44 * s,
        height: 13 * s, borderRadius: `0 0 ${8 * s}px ${8 * s}px`, background: dkh("#1C2028", 0) }} />
      <div style={{ position: "absolute", left: PW / 2 - 21 * s, bottom: 8 * s, width: 42 * s,
        height: 4 * s, borderRadius: 2, background: hexa("#FFFFFF", 0.52) }} />
    </div>
  );
};

/* =========================================================================
   8 · THE BARRIER — "one major catch"
   ⛔ Reel 120: *a barrier you can walk round does not read as "stopped."* This
   one fills the panel edge to edge and floor to ceiling, so there is nothing
   past its near face. What says BARRIER: hazard chevrons, two uprights bolted
   to the floor, a top beam, and a lamp that is the only lit thing left.
   ====================================================================== */
/** ⛔⛔ THE Z WAS WRONG AND IT ERASED THE SCENE. v1 painted this at `z 78` over
    a hero at `z 56`, so the frame at the middle of the beat was a full-panel
    flat red plate with the subject of the shot behind it — which is both the
    banned full-frame fill and §17's "the subject must not be behind the props".
    A barrier is a thing you are stopped BY: it sits BEHIND the body that hits
    it. Default z is now 46 and every call site puts the hero in front. */
export const Barrier: React.FC<{ y: number; f: number; z?: number; drop?: number; h?: number }> =
  ({ y, f, z = 46, drop = 1, h: bh = 520 }) => {
  const d = Math.max(0, Math.min(1, drop));
  const top = y - bh + (1 - d) * -bh * 1.2;
  return (
    <div style={{ position: "absolute", left: -60, top, width: W + 120, height: bh, zIndex: z }}>
      {/* the face, with hazard chevrons drawn as real stripes */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden",
        background: `linear-gradient(180deg, ${dkh(RED, 0.10)} 0%, ${dkh(RED, 0.36)} 100%)`,
        borderTop: `10px solid ${mxh(RED, 0.24)}`, borderBottom: `10px solid ${dkh(RED, 0.52)}` }}>
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"hz" + i} style={{ position: "absolute", left: -140 + i * 96, top: -40,
            width: 48, height: bh + 80, transform: "skewX(-24deg)",
            background: hexa("#F0E2C0", 0.16) }} />
        ))}
        {/* the middle rail and the bolt line — structure, not decoration */}
        <div style={{ position: "absolute", left: 0, top: bh * 0.44, width: "100%", height: 22,
          background: dkh(RED, 0.50) }} />
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: 40 + i * 96, top: bh * 0.44 + 5,
            width: 12, height: 12, borderRadius: "50%", background: dkh(RED, 0.62) }} />
        ))}
      </div>
      {/* the two uprights, bolted down */}
      {[40, W - 76].map((ux, i) => (
        <div key={"ug" + i} style={{ position: "absolute", left: ux, top: -22, width: 36,
          height: bh + 44, background: `linear-gradient(96deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.42)} 100%)` }} />
      ))}
      {/* the LAMP — the only lit thing in the scene */}
      <div style={{ position: "absolute", left: W / 2 - 34, top: -46, width: 68, height: 40,
        borderRadius: 8, background: dkh(SLATE, 0.36) }}>
        <div style={{ position: "absolute", left: 12, top: 9, width: 44, height: 22, borderRadius: 5,
          background: hexa("#FF7A54", 0.45 + 0.5 * Math.abs(Math.sin(f * 0.24))) }} />
      </div>
    </div>
  );
};

/* =========================================================================
   9 · THE LOCAL SHED — your machine, working, and alone
   What says SHED: a pitched roof with a ridge, board walls with a visible
   joint line, a door with a hasp, ONE lit window, and a base it sits on. What
   says YOUR MACHINE: a running fan and a task turning over inside the window.
   ⛔ It is SLATE on a slate ground, so it carries a bright roof edge and a lit
   window — a dark neutral on a dark neutral has no edge and no gate can see it.
   ====================================================================== */
export const LocalShed: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  lit?: number }> = ({ x, y, s = 1, z = 46, f, lit = 1 }) => {
  const SW = 260 * s, SH2 = 190 * s;
  return (
    <div style={{ position: "absolute", left: x - SW / 2, top: y - SH2, width: SW, height: SH2, zIndex: z }}>
      {/* the ROOF, with a bright ridge so the silhouette exists against a dark set */}
      <div style={{ position: "absolute", left: -18 * s, top: 0, width: SW + 36 * s, height: 52 * s,
        clipPath: "polygon(8% 100%, 50% 0, 92% 100%)",
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.34)} 0%, ${dkh(SLATE, 0.24)} 100%)` }} />
      <div style={{ position: "absolute", left: SW / 2 - 3 * s, top: -3 * s, width: 6 * s,
        height: 10 * s, background: mxh(SLATE, 0.52) }} />
      {/* the board WALLS */}
      <div style={{ position: "absolute", left: 12 * s, top: 50 * s, width: SW - 24 * s,
        height: SH2 - 62 * s, borderRadius: 3 * s, overflow: "hidden",
        background: `linear-gradient(180deg, ${dkh(SLATE, 0.10)} 0%, ${dkh(SLATE, 0.34)} 100%)` }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"bd" + i} style={{ position: "absolute", left: 0, top: i * 24 * s,
            width: "100%", height: 2 * s, background: hexa("#0A0E12", 0.34) }} />
        ))}
      </div>
      {/* the DOOR with a hasp */}
      <div style={{ position: "absolute", left: 30 * s, top: 84 * s, width: 62 * s,
        height: SH2 - 96 * s, background: dkh(SLATE, 0.42),
        border: `${3 * s}px solid ${dkh(SLATE, 0.54)}` }}>
        <div style={{ position: "absolute", right: 6 * s, top: "44%", width: 12 * s, height: 6 * s,
          background: mxh(BRASS, 0.10) }} />
      </div>
      {/* the ONE LIT WINDOW, with a task turning over in it */}
      <div style={{ position: "absolute", left: 120 * s, top: 88 * s, width: 104 * s, height: 74 * s,
        overflow: "hidden", border: `${4 * s}px solid ${dkh(SLATE, 0.54)}`,
        background: `linear-gradient(178deg, ${hexa(SODIUM, 0.30 + lit * 0.45)} 0%, ${hexa("#5A3E14", 0.5)} 100%)` }}>
        {[0, 1, 2].map(i => {
          const t = ((f * 0.02 + i / 3) % 1);
          return (
            <div key={"tk" + i} style={{ position: "absolute", left: 8 * s + t * 78 * s,
              top: (14 + i * 20) * s, width: 20 * s, height: 10 * s, borderRadius: 2,
              background: hexa("#2A1C08", 0.55) }} />
          );
        })}
      </div>
      {/* the FAN, running */}
      <div style={{ position: "absolute", left: SW - 62 * s, top: 62 * s, width: 34 * s,
        height: 34 * s, borderRadius: "50%", background: dkh(SLATE, 0.48),
        transform: `rotate(${f * 13}deg)` }}>
        {[0, 60, 120].map(a => (
          <div key={a} style={{ position: "absolute", left: "50%", top: "50%", width: 28 * s,
            height: 5 * s, marginLeft: -14 * s, marginTop: -2.5 * s,
            background: mxh(SLATE, 0.30), transform: `rotate(${a}deg)` }} />
        ))}
      </div>
      {/* the BASE */}
      <div style={{ position: "absolute", left: 0, top: SH2 - 14 * s, width: SW, height: 14 * s,
        background: dkh(SLATE, 0.58) }} />
      {/* the stencil — the size a machine label actually is */}
      <div style={{ position: "absolute", left: 120 * s, top: SH2 - 34 * s }}>
        <span style={{ ...mono(Math.round(13 * s), 900), color: hexa("#C6CED8", 0.66),
          letterSpacing: 2 }}>{R.local}</span>
      </div>
    </div>
  );
};

/* =========================================================================
   10 · THE SEVERED END — where the villain comes back
   A rail that stops. What makes it read as CUT rather than as a rail that
   happens to end: torn strands, a bright raw metal face (a cut end is shiny),
   and the last sleeper hanging in the air over nothing.
   ====================================================================== */
export const CutEnd: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  spark?: number }> = ({ x, y, s = 1, z = 52, f, spark = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y - 30 * s, width: 150 * s, height: 70 * s, zIndex: z }}>
    {/* the rail, ending */}
    <div style={{ position: "absolute", left: 0, top: 12 * s, width: 96 * s, height: 13 * s,
      background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
    {/* the RAW CUT FACE — bright, so the break is the legible thing */}
    <div style={{ position: "absolute", left: 92 * s, top: 8 * s, width: 9 * s, height: 21 * s,
      background: `linear-gradient(180deg, #F4EEDE 0%, ${mxh(STEEL, 0.44)} 100%)` }} />
    {/* torn strands, drooping */}
    {[0, 1, 2].map(i => (
      <div key={"ts" + i} style={{ position: "absolute", left: 98 * s + i * 5 * s,
        top: (14 + i * 4) * s, width: (22 - i * 5) * s, height: 3.4 * s, borderRadius: 2,
        background: mxh(STEEL, 0.10),
        transformOrigin: "0% 50%", transform: `rotate(${16 + i * 14}deg)` }} />
    ))}
    {/* the last sleeper, hanging over nothing */}
    <div style={{ position: "absolute", left: 66 * s, top: 26 * s, width: 40 * s, height: 11 * s,
      background: dkh("#4A3826", 0.14), transform: "rotate(7deg)" }} />
    {/* the odd spark off the break, so a static object is never fully static */}
    {spark > 0.01 && Array.from({ length: 3 }, (_, i) => {
      const t = ((f * 0.06 + i * 0.33) % 1);
      return (
        <div key={"sk" + i} style={{ position: "absolute", left: 98 * s + t * 28 * s,
          top: 16 * s + t * t * 34 * s, width: 5 * s, height: 5 * s, borderRadius: "50%",
          opacity: (1 - t) * spark, background: "#FFD79A" }} />
      );
    })}
  </div>
);

/* =========================================================================
   11 · SMALL PARTS
   ====================================================================== */

/** the intake hopper — a stencilled mouth that things fall out of */
export const Chute: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number;
  z?: number; label?: string; c?: string }> =
  ({ x, y, w: cw = 150, h: ch = 92, s = 1, z = 34, label, c = SLATE }) => (
  <div style={{ position: "absolute", left: x - cw / 2, top: y, width: cw, height: ch, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)",
      background: `linear-gradient(180deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.34)} 100%)` }} />
    <div style={{ position: "absolute", left: cw * 0.26, top: ch - 7, width: cw * 0.48, height: 12,
      background: "#07090C" }} />
    <div style={{ position: "absolute", left: -6, top: -11, width: cw + 12, height: 15,
      borderRadius: 3, background: dkh(c, 0.46) }} />
    {label && (
      <div style={{ position: "absolute", left: 0, top: 18, width: cw, textAlign: "center" }}>
        <span style={{ ...mono(14, 900), color: hexa("#EFE6D2", 0.80), letterSpacing: 1.6 }}>
          {label}</span>
      </div>
    )}
  </div>
);

/** the roller shutter that reveals the wall — slats, guides and a bottom bar */
export const Shutter: React.FC<{ y: number; h: number; up: number; z?: number; c?: string }> =
  ({ y, h: sh, up, z = 74, c = "#5A6068" }) => {
  const k = Math.max(0, Math.min(1, up));
  const vis = sh * (1 - k);
  return (
    <>
      <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: vis, zIndex: z,
        overflow: "hidden", background: dkh(c, 0.20) }}>
        {Array.from({ length: 26 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, top: i * 26, width: "100%",
            height: 24, background: `linear-gradient(180deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.16)} 52%, ${dkh(c, 0.42)} 100%)` }} />
        ))}
      </div>
      {vis > 2 && (
        <div style={{ position: "absolute", left: -40, top: y + vis - 15, width: W + 80, height: 19,
          zIndex: z + 1, background: `linear-gradient(180deg, ${dkh(c, 0.42)} 0%, ${dkh(c, 0.60)} 100%)` }} />
      )}
      {/* the guides — a shutter runs in something */}
      {[-40, W + 16].map((gx, i) => (
        <div key={"gd" + i} style={{ position: "absolute", left: gx, top: y, width: 24, height: sh,
          zIndex: z + 2, background: dkh(c, 0.50) }} />
      ))}
    </>
  );
};

/** the incinerator: a hinged mouth, a hazard band and a hot throat */
export const Incinerator: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  open?: number; hot?: number }> =
  ({ x, y, s = 1, z = 48, f, open = 0, hot = 0 }) => {
  const op = Math.max(0, Math.min(1, open));
  const IW = 176 * s, IH = 150 * s;
  return (
    <div style={{ position: "absolute", left: x - IW / 2, top: y - IH, width: IW, height: IH, zIndex: z }}>
      {/* the body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s,
        background: `linear-gradient(166deg, ${mxh("#3E3630", 0.20)} 0%, ${dkh("#3E3630", 0.32)} 100%)`,
        border: `${4 * s}px solid ${dkh("#241E1A", 0)}` }} />
      {/* the hazard band */}
      <div style={{ position: "absolute", left: 4 * s, top: 8 * s, width: IW - 8 * s, height: 15 * s,
        overflow: "hidden", background: dkh(SODIUM, 0.40) }}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"hb" + i} style={{ position: "absolute", left: -20 + i * 24, top: -4,
            width: 12, height: 24, transform: "skewX(-26deg)", background: hexa("#1A1208", 0.72) }} />
        ))}
      </div>
      {/* the THROAT, hot */}
      <div style={{ position: "absolute", left: 24 * s, top: 40 * s, width: IW - 48 * s,
        height: IH - 62 * s, borderRadius: 4 * s, overflow: "hidden",
        background: `linear-gradient(180deg, ${hexa("#FF7A2A", 0.20 + hot * 0.70)} 0%, #180A02 100%)` }}>
        {hot > 0.02 && Array.from({ length: 4 }, (_, i) => {
          const t = ((f * 0.035 + i * 0.25) % 1);
          return (
            <div key={"em" + i} style={{ position: "absolute", left: (18 + i * 30) * s,
              top: (IH - 62 * s) * (1 - t), width: 13 * s, height: 13 * s, borderRadius: "50%",
              opacity: (1 - t) * hot, background: "#FFC46A" }} />
          );
        })}
      </div>
      {/* the DOOR, hinged at the top so it swings up */}
      <div style={{ position: "absolute", left: 20 * s, top: 36 * s, width: IW - 40 * s,
        height: IH - 54 * s, borderRadius: 4 * s, transformOrigin: "50% 0%",
        transform: `perspective(500px) rotateX(${op * 82}deg)`,
        background: `linear-gradient(180deg, ${mxh("#5A4E44", 0.20)} 0%, ${dkh("#5A4E44", 0.30)} 100%)`,
        border: `${3 * s}px solid ${dkh("#2E2620", 0)}` }}>
        <div style={{ position: "absolute", left: "50%", top: "44%", marginLeft: -16 * s,
          width: 32 * s, height: 9 * s, borderRadius: 4 * s, background: mxh(BRASS, 0.04) }} />
      </div>
    </div>
  );
};

/** the ribbon of speech paying continuously out of the hero — the thing that
    makes the S5 foreground half alive while the press works behind him */
export const SpeechRibbon: React.FC<{ x: number; y: number; f: number; len?: number; z?: number;
  c?: string; rate?: number; h?: number }> =
  ({ x, y, f, len = 430, z = 52, c = PAPER, rate = 5.2, h: rh = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y - rh / 2, width: len, height: rh + 26, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: len, height: rh, overflow: "hidden",
      borderRadius: 3,
      background: `linear-gradient(180deg, ${mxh(c, 0.10)} 0%, ${c} 40%, ${dkh(c, 0.16)} 100%)` }}>
      {/* the printed line ON the ribbon, travelling — this is the moving mass */}
      {Array.from({ length: 14 }, (_, i) => {
        const px = (((i * 62 + f * rate) % (len + 62)) + len + 62) % (len + 62) - 62;
        return (
          <div key={"rw" + i} style={{ position: "absolute", left: px, top: rh * 0.30,
            width: 34 + (i % 3) * 16, height: 9, borderRadius: 3, background: hexa(INK, 0.46) }} />
        );
      })}
    </div>
    {/* the perforated edge, so it is a ribbon of paper and not a bar */}
    {Array.from({ length: Math.ceil(len / 22) }, (_, i) => (
      <div key={"pf" + i} style={{ position: "absolute", left: 6 + i * 22, top: rh - 3, width: 7,
        height: 7, borderRadius: "50%", background: hexa("#7A7264", 0.5) }} />
    ))}
  </div>
);

/** the brass keyword plate the CTA strikes */
export const StampPlate: React.FC<{ x: number; y: number; s?: number; z?: number; t: string;
  hit?: number }> = ({ x, y, s = 1, z = 84, t, hit = 0 }) => {
  const k = Math.max(0, Math.min(1, hit));
  const PW = 380 * s, PH = 120 * s;
  return (
    <div style={{ position: "absolute", left: x - PW / 2, top: y - PH / 2, width: PW, height: PH,
      zIndex: z, transform: `scale(${1 + k * 0.06})` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s, boxShadow: SH,
        background: `linear-gradient(168deg, ${mxh(BRASS, 0.40)} 0%, ${BRASS} 40%, ${dkh(BRASS, 0.30)} 100%)`,
        border: `${5 * s}px solid ${dkh(BRASS, 0.44)}` }} />
      {/* the bevel */}
      <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: PW - 20 * s,
        height: PH - 20 * s, borderRadius: 7 * s, border: `${3 * s}px solid ${hexa("#5A4414", 0.34)}` }} />
      {/* the STRUCK letters — cut in, so they carry a highlight above and a
          shadow below rather than sitting on top like ink */}
      {/* ⛔ AUTO-FIT. `FREE · PRO · MAX` at a fixed 64px wrapped to three lines
          and spilled outside the bevel. Scale to the string, the same way
          `HookHeader` does, rather than re-checking a character budget by hand
          every time the wording changes. */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", padding: `0 ${26 * s}px` }}>
        <span style={{ ...ui(Math.round(Math.max(26, Math.min(64, 64 * 5 / Math.max(3, t.length))) * s), 900),
          color: "#3A2A08", whiteSpace: "nowrap",
          letterSpacing: t.length > 8 ? 1.6 : 6,
          textShadow: `0 ${2 * s}px 0 ${hexa("#FFF0C0", 0.42)}` }}>{t}</span>
      </div>
      {/* the four fixing bolts */}
      {[[0.06, 0.16], [0.94, 0.16], [0.06, 0.84], [0.94, 0.84]].map(([bx, by], i) => (
        <div key={"fb" + i} style={{ position: "absolute", left: PW * bx - 7 * s, top: PH * by - 7 * s,
          width: 14 * s, height: 14 * s, borderRadius: "50%", background: dkh(BRASS, 0.52) }} />
      ))}
    </div>
  );
};

/** the junction that splits one trunk into three feeds */
export const Junction: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  live?: number }> = ({ x, y, s = 1, z = 44, f, live = 1 }) => (
  <div style={{ position: "absolute", left: x - 62 * s, top: y - 56 * s, width: 124 * s,
    height: 112 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s, boxShadow: SH_D,
      background: `linear-gradient(166deg, ${mxh(SLATE, 0.26)} 0%, ${dkh(SLATE, 0.36)} 100%)`,
      border: `${4 * s}px solid ${dkh(SLATE, 0.50)}` }} />
    {[0, 1, 2].map(i => (
      <div key={"jl" + i} style={{ position: "absolute", left: (22 + i * 30) * s, top: 26 * s,
        width: 18 * s, height: 18 * s, borderRadius: "50%",
        background: hexa(GREEN, 0.28 + live * (0.5 + 0.35 * Math.sin(f * 0.3 + i * 2))) }} />
    ))}
    <div style={{ position: "absolute", left: 16 * s, top: 62 * s, width: 92 * s, height: 8 * s,
      background: dkh(SLATE, 0.54) }} />
    <div style={{ position: "absolute", left: 0, top: 78 * s, width: 124 * s, textAlign: "center" }}>
      <span style={{ ...mono(Math.round(12 * s), 900), color: hexa("#D8DEE6", 0.7),
        letterSpacing: 1.4 }}>SYNC</span>
    </div>
  </div>
);

/* =========================================================================
   12 · THE WORKS SIGN — the claim, as a THING ON THE WALL
   ⛔⛔ ADDED AFTER THE FIRST HOOK STILLS, WHICH FAILED IN THE MOST EXPENSIVE
   WAY THERE IS: a full-width cream claim CARD was painted at panel y 96..272,
   directly over the crate the whole hook is about, so the subject of the shot
   was behind the text and the hero's two forearms terminated in mid-air on a
   prop nobody could see. That is §6's "it is behind something" and §17's "the
   subject must not be behind the props" in one frame.
   ⭐ THE FIX IS REEL 110's: A GATE CARRIED BY THE WRONG OBJECT DEFORMS THAT
   OBJECT — so the frame-0 luma and claim-plate jobs move onto a LIT BOARD ON
   THE WALL BEHIND, which is a set element rather than an overlay. It cannot
   cover the hero because it lives at a different x, and a wall with a big
   enamel sign bolted to it is a PLACE rather than a backdrop.
   What says ENAMEL SIGN: a rolled edge, four bolt heads, a raised border line,
   a hard specular sweep across the face, and a hooded lamp over it throwing a
   cone down the face.
   ====================================================================== */
export const WorksSign: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  f?: number; l1: string; l2: string; hot?: string; lit?: number; s?: number }> =
  ({ x, y, w: sw = 470, h: sh = 300, z = 22, f = 0, l1, l2, hot = CLAY, lit = 1, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: sw, height: sh, zIndex: z }}>
    {/* the hooded lamp over it, and the cone it throws down the face */}
    <div style={{ position: "absolute", left: sw / 2 - 46, top: -34, width: 92, height: 26,
      borderRadius: `${13}px ${13}px 4px 4px`, zIndex: 4,
      background: `linear-gradient(180deg, ${mxh(SLATE, 0.18)} 0%, ${dkh(SLATE, 0.44)} 100%)` }} />
    <div style={{ position: "absolute", left: sw / 2 - 150, top: -10, width: 300, height: sh + 40,
      zIndex: 3, opacity: 0.36 * lit, clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
      background: `linear-gradient(180deg, ${hexa("#FFE9B8", 0.85)} 0%, ${hexa("#FFE9B8", 0)} 100%)` }} />
    {/* the rolled edge */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 10, zIndex: 5,
      background: `linear-gradient(178deg, ${dkh("#E4DCC6", 0.10)} 0%, ${dkh("#C8BEA4", 0.20)} 100%)` }} />
    {/* the enamel face */}
    <div style={{ position: "absolute", left: 9, top: 9, width: sw - 18, height: sh - 18,
      borderRadius: 6, zIndex: 6, overflow: "hidden",
      background: `linear-gradient(172deg, #FCF8EE 0%, ${dkh("#EFE8D6", 0.06)} 62%, ${dkh("#E2D9C2", 0.12)} 100%)` }}>
      {/* the raised border line an enamel sign always has */}
      <div style={{ position: "absolute", inset: 13, borderRadius: 4,
        border: `4px solid ${hexa(hot, 0.34)}` }} />
      {/* the specular sweep — what makes it read as vitreous rather than paper */}
      <div style={{ position: "absolute", left: -sw * 0.3, top: -sh, width: sw * 0.42, height: sh * 3,
        transform: "rotate(24deg)", opacity: 0.5 * lit,
        background: `linear-gradient(90deg, ${hexa("#FFFFFF", 0)} 0%, ${hexa("#FFFFFF", 0.66)} 50%, ${hexa("#FFFFFF", 0)} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "0 26px" }}>
        {/* ⛔ AUTO-FIT. `CLAUDE BUILT / ITS OWN BRAIN` wrapped to THREE lines at a
            fixed 43/50px in a 396px board, and a hook claim that wraps is a hook
            claim nobody reads at thumb distance. Scale to the longer line, the
            same way `HookHeader` and `StampPlate` do, so the wording can change
            without re-checking a character budget by hand. */}
        {(() => {
          const longest = Math.max(l1.length, l2.length);
          const px = Math.max(22, Math.min(46, (sw - 52) / longest * 1.72));
          return (<>
            <span style={{ ...ui(Math.round(px * 0.88), 900), color: hexa(INK, 0.84),
              letterSpacing: -0.4, whiteSpace: "nowrap", lineHeight: 1.04 }}>{l1}</span>
            <span style={{ ...ui(Math.round(px), 900), color: hot, letterSpacing: -0.6,
              whiteSpace: "nowrap", lineHeight: 1.04, marginTop: 5 }}>{l2}</span>
          </>);
        })()}
      </div>
    </div>
    {/* the four bolt heads */}
    {[[0.07, 0.09], [0.93, 0.09], [0.07, 0.91], [0.93, 0.91]].map(([bx, by], i) => (
      <div key={"sb" + i} style={{ position: "absolute", left: sw * bx - 11, top: sh * by - 11,
        width: 22, height: 22, borderRadius: "50%", zIndex: 8,
        background: `radial-gradient(38% 34% at 36% 30%, ${mxh(STEEL, 0.36)} 0%, ${dkh(STEEL, 0.30)} 70%, ${dkh(STEEL, 0.54)} 100%)` }}>
        <div style={{ position: "absolute", left: 4, top: 9, width: 14, height: 3,
          background: dkh(STEEL, 0.58) }} />
      </div>
    ))}
  </div>
);

/* =========================================================================
   13 · THE RACK SKELETON — the second brain, before and after it exists
   ⭐ THE BEFORE STATE HAS TO BE LEGIBLE ON FRAME 1. v1 of the hook built the
   wall out of NOTHING at f44, which meant frame 0 had an empty grey wall behind
   the hero — and a hook whose payoff arrives from nowhere has no before state
   to read. So the FRAME is standing at frame 0: uprights, cross-rails, foot
   plates, empty. `fill` 0..1 slams the shelves in and loads them, `lit` turns
   the bay lighting on. The mechanism builds itself; the skeleton was always
   there, which is also what "solved its biggest problem" actually looks like.
   ====================================================================== */
export const RackSkeleton: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  f: number; cols?: number; rows?: number; fill?: number; lit?: number; c?: string;
  colours?: readonly string[] }> =
  ({ x, y, w: rw, h: rh, z = 20, f, cols = 4, rows = 3, fill = 0, lit = 0, c = BRASS,
     colours }) => {
  const k = Math.max(0, Math.min(1, fill));
  const cw = rw / cols, chh = rh / rows;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: rw, height: rh, zIndex: z }}>
      {/* the UPRIGHTS — perforated, like every real rack upright */}
      {Array.from({ length: cols + 1 }, (_, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: i * cw - 9, top: -16, width: 18,
          height: rh + 34, zIndex: 4, overflow: "hidden",
          background: `linear-gradient(96deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.22)} 46%, ${dkh(c, 0.48)} 100%)` }}>
          {Array.from({ length: Math.floor(rh / 30) }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: 6, top: 12 + j * 30, width: 6, height: 11,
              borderRadius: 2, background: dkh(c, 0.56) }} />
          ))}
        </div>
      ))}
      {/* the CROSS-RAILS */}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <div key={"cr" + i} style={{ position: "absolute", left: -10, top: i * chh - 7, width: rw + 20,
          height: 14, zIndex: 3,
          background: `linear-gradient(180deg, ${mxh(c, 0.26)} 0%, ${dkh(c, 0.34)} 100%)` }} />
      ))}
      {/* the BAYS: dark and empty at fill 0, lit and loaded as it climbs.
          ⛔ each bay's arrival is its own discrete pop — one long tween across
          twelve bays repaints almost nothing per sample and reads as a wipe. */}
      {Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const at = i / (cols * rows);
        const on = Math.max(0, Math.min(1, (k - at * 0.82) * 5.5));
        return (
          <div key={"bk" + i} style={{ position: "absolute", left: col * cw + 10, top: row * chh + 8,
            width: cw - 20, height: chh - 18, zIndex: 2, borderRadius: 3, overflow: "hidden",
            background: `linear-gradient(180deg, ${hexa("#FFF0CE", 0.06 + on * lit * 0.56)} 0%, #0D0A06 100%)` }}>
            {/* the files landing in it, one rank at a time */}
            {on > 0.02 && Array.from({ length: 5 }, (_, j) => {
              const jw = (cw - 34) / 5;
              const jk = Math.max(0, Math.min(1, (on - j * 0.13) * 4));
              if (jk <= 0.01) return null;
              const bc = colours ? colours[i % colours.length] : CREAMB;
              const tone = j % 3 === 0 ? mxh(bc, 0.16) : j % 3 === 1 ? bc : dkh(bc, 0.18);
              return (
                <div key={j} style={{ position: "absolute", left: 7 + j * jw, bottom: 6,
                  width: jw - 4, height: (chh - 34) * (0.72 + (j % 3) * 0.10) * jk,
                  borderRadius: 2, transformOrigin: "50% 100%", overflow: "hidden",
                  transform: `rotate(${(-2 + (j % 5)) * 0.5}deg)`,
                  background: `linear-gradient(92deg, ${dkh(tone, 0.26)} 0%, ${tone} 38%, ${dkh(tone, 0.32)} 100%)` }}>
                  <div style={{ position: "absolute", left: "18%", top: "32%", width: "64%",
                    height: "26%", background: hexa("#F4EFE2", 0.80) }} />
                </div>
              );
            })}
            {/* the bay's own lit back edge, so an EMPTY bay still reads */}
            <div style={{ position: "absolute", left: 3, top: 3, width: cw - 26, height: 7,
              background: hexa("#7E6E52", 0.30 + on * lit * 0.5) }} />
          </div>
        );
      })}
      {/* the FOOT PLATES — a rack is bolted down */}
      {Array.from({ length: cols + 1 }, (_, i) => (
        <div key={"ft" + i} style={{ position: "absolute", left: i * cw - 20, top: rh + 14, width: 40,
          height: 13, zIndex: 5, borderRadius: 2, background: dkh(c, 0.50) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   14 · THE NOTE TOWER — the vault you keep BY HAND
   ⛔ v1 was a single crate at panel y 73..300, which put the whole subject of
   the hook inside the plate band and made it 23% of the panel height with the
   hero at 20%: two small objects, neither dominant. A TOWER is the right shape
   for a 1012x792 panel — it fills the vertical, it says "you keep adding to it",
   it carries the mark on its top unit at eye height, and it collapses.
   What says a BUNDLE OF NOTES rather than a box: ragged paper edges on three
   sides, a board top and bottom, a strap with a buckle, and a hand-written
   label. Five parts per unit, four units, plus the mark.
   VALUE: dark oak boards + cream paper against a bone wall — the tower is the
   only near-black mass in the hook and it is where the value spread comes from.
   ====================================================================== */
export const NoteTower: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  n?: number; lean?: number; mark?: string | null; unit?: number; stencil?: boolean }> =
  ({ x, y, s = 1, z = 60, f, n = 4, lean = 0, mark = "obsidian.svg", unit = 92,
     stencil = true }) => {
  const UW = 232 * s, UH = unit * s;
  return (
    <div style={{ position: "absolute", left: x - UW / 2, top: y - UH * n, width: UW, height: UH * n,
      zIndex: z, transformOrigin: "50% 100%", transform: `rotate(${lean}deg)` }}>
      {Array.from({ length: n }, (_, i) => {
        /* the higher up the stack, the more it wanders — a hand-built pile is
           never square, and the wander is what makes it read as teetering */
        const off = (i - (n - 1) / 2) * 7 * s + Math.sin(f / 26 + i) * 2.4 * s * (i + 1) * 0.4;
        const rot = (-3 + ((i * 5) % 7)) * 0.8 + Math.sin(f / 31 + i * 2) * 0.5 * (i + 1) * 0.3;
        const bot = UH * (n - 1 - i);
        return (
          <div key={"un" + i} style={{ position: "absolute", left: off, top: bot, width: UW,
            height: UH - 5 * s, transformOrigin: "50% 100%", transform: `rotate(${rot}deg)` }}>
            {/* the ragged PAGE BLOCK. ⛔ v1 gave it 15px boards top AND bottom on
                a 78px unit, so two thirds of every unit was dark oak and the
                tower read as a stack of FLAT BOARDS. A bundle of notes is
                mostly PAPER — the boards are 9px and the block gets the rest. */}
            <div style={{ position: "absolute", left: 8 * s, top: 7 * s, width: UW - 16 * s,
              height: UH - 16 * s, overflow: "hidden", boxShadow: SH_D,
              background: `linear-gradient(178deg, ${PAPER} 0%, ${dkh(PAPER, 0.20)} 100%)` }}>
              {/* the sheet edges — 9 of them, at real paper spacing, so the
                  block has grain rather than being a cream rectangle */}
              {Array.from({ length: 9 }, (_, j) => (
                <div key={j} style={{ position: "absolute", left: 0, top: (4 + j * 7) * s,
                  width: UW * (0.80 + (j % 4) * 0.06), height: 2.2 * s,
                  background: hexa("#8C8272", 0.34 + (j % 2) * 0.16) }} />
              ))}
              {/* the ragged fore-edge */}
              <div style={{ position: "absolute", right: 0, top: 0, width: 7 * s, height: "100%",
                background: `repeating-linear-gradient(180deg, ${dkh(PAPER, 0.26)} 0px, ${dkh(PAPER, 0.26)} ${3 * s}px, ${dkh(PAPER, 0.06)} ${3 * s}px, ${dkh(PAPER, 0.06)} ${6 * s}px)` }} />
            </div>
            {/* the BOARDS, top and bottom — thin, so the paper dominates */}
            {[0, UH - 11 * s].map((by, k) => (
              <div key={k} style={{ position: "absolute", left: 0, top: by, width: UW, height: 9 * s,
                borderRadius: 2 * s,
                background: `linear-gradient(180deg, ${mxh("#4A3826", 0.20)} 0%, ${dkh("#4A3826", 0.22)} 100%)` }} />
            ))}
            {/* the STRAP and its buckle */}
            <div style={{ position: "absolute", left: UW * 0.30, top: -2 * s, width: 22 * s,
              height: UH - 2 * s, background: dkh("#5A4224", 0.10) }} />
            <div style={{ position: "absolute", left: UW * 0.30 - 5 * s, top: UH * 0.38, width: 32 * s,
              height: 16 * s, borderRadius: 3 * s,
              background: `linear-gradient(180deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.30)} 100%)` }} />
            {/* the hand-written LABEL — the tell that this one is kept by hand */}
            <div style={{ position: "absolute", left: UW * 0.52, top: UH * 0.34, width: UW * 0.36,
              height: 26 * s, borderRadius: 2 * s, background: hexa("#F6EFDC", 0.94),
              transform: `rotate(${-2 + (i % 3) * 2}deg)` }}>
              {[0, 1].map(j => (
                <div key={j} style={{ position: "absolute", left: 6 * s, top: (7 + j * 8) * s,
                  width: UW * (0.24 - j * 0.07), height: 2.6 * s, borderRadius: 2,
                  background: hexa("#3A3226", 0.52) }} />
              ))}
            </div>
          </div>
        );
      })}
      {/* the MARK on the TOP unit, on a white tile, at the top of the stack.
          ⛔ When the tower is rendered UNIT BY UNIT (the hook's collapse), only
          the unit that carried the mark may draw it — a default that always
          fires would put five marks in one frame. */}
      {mark && <div style={{ position: "absolute", left: UW / 2 - 62 * s, top: -46 * s, width: 124 * s,
        height: 124 * s, borderRadius: 28 * s, zIndex: 9, background: "#FBF8F0",
        border: `${4 * s}px solid #D8CFBC`, display: "flex", alignItems: "center",
        justifyContent: "center", boxShadow: SH }}>
        <Img src={staticFile(`logos/${mark}`)}
          style={{ width: 80 * s, height: 80 * s, objectFit: "contain" }} />
      </div>}
      {/* the load line, stencilled on the bottom board */}
      {stencil && <div style={{ position: "absolute", left: 0, top: UH * n - 17 * s, width: UW,
        textAlign: "center", zIndex: 10 }}>
        <span style={{ ...mono(Math.round(13 * s), 900), color: hexa("#F0E4CA", 0.72),
          letterSpacing: 2 }}>KEPT BY HAND</span>
      </div>}
    </div>
  );
};

/* =========================================================================
   15 · THE SECOND BRAIN — the thing that couples to him
   ⭐ Asked for directly (Alex: *"we need to see like a second brain big brain
   attach to claude sprite somehow so its more interesting"*), and it fixes the
   real defect: after the tower landed at ~1.3s the hook had nothing left to
   watch for two and a half seconds. A payoff that ARRIVES is worth more than a
   payoff that has already happened.
   What makes it read as a BRAIN rather than as a cabinet: TWO LOBES with a
   central sulcus, a domed crown, and folds cut across the dome. What makes it
   read as a MEMORY: the lobes are made of labelled DRAWERS in the nine topic
   colours, which light in sequence once it seats. And what makes it read as
   ATTACHED is the STEM plus a coupling collar that lands on the hero's crown.
   ====================================================================== */
export const SecondBrain: React.FC<{ x: number; y: number; w?: number; z?: number; f: number;
  lit?: number; colours: readonly string[]; labels: readonly string[]; seat?: number;
  core?: number }> =
  ({ x, y, w: bw = 372, z = 64, f, lit = 0, colours, labels, seat = 0, core = 0 }) => {
  /* ⛔⛔⛔ FIVE ATTEMPTS AT DRAWING THIS, AND THE ANSWER WAS THAT THE HOUSE HAD
     ALREADY DRAWN IT. Straight bands read as a LUNG · the same bands in nine
     topic colours read as a BUTTERFLY · irregular gold pills read as BANDAGES ·
     dark sulci stroked over a fill read as a RIBCAGE · packed ellipses read as
     SCALES. Five rounds, all of them me inventing an art style for an object
     this repo shipped in reel 116.

     ⭐ `BillProps.Brain` IS THE HOUSE BRAIN AND IT IS ALREADY APPROVED. Its own
     comments record it failing in exactly the two ways mine did — *"why is it
     hairy too"* from folds whose ends stuck out past the outline, then two
     featureless pink rounded rectangles once they were clipped — before being
     solved as a single SVG silhouette with the frontal rise, the occipital
     swell, the temporal notch and the cerebellum in one path, and the folds
     stroked and clipped to it. Twenty-two drawn parts.

     ⛔ THIS IS `feedback_reel_house_chassis` AND I SPENT FIVE ROUNDS IGNORING
     IT. Before drawing a recognisable object from scratch, grep the repo for
     it: a shipped component has already survived the review this one was
     failing. What is left here is only what reel 116's brain does not have —
     the coupling collar that mates it to a Claude, and the light it throws. */
  const bh = bw * 0.785;                       /* the shipped brain is 560x440 */
  const sq = seat > 0 ? 1 + Math.sin(seat * Math.PI) * 0.05 : 1;
  const L = Math.max(0, Math.min(1, lit));
  /* the seven lobe cells wake across the descent */
  /* ⛔ FOUR, NOT SEVEN. Every lit lobe draws a bright disc AND a file, so all
     seven covered the folds the object is recognised by. Four still says
     "memories are landing in it" and they keep arriving across the tail, which
     is also where this shot needed movement. */
  const LIT = [50, 62, 76, 92];
  return (
    <div style={{ position: "absolute", left: x - bw / 2, top: y - bh, width: bw, height: bh + 58,
      zIndex: z, transform: `scale(${1 / sq}, ${sq})`, transformOrigin: "50% 100%" }}>
      {/* the pool of light it throws around itself — BEHIND the tissue, always:
          a glow painted over an object makes it faint, not bright */}
      <div style={{ position: "absolute", left: -bw * 0.34, top: -bh * 0.26, width: bw * 1.68,
        height: bh * 1.62, borderRadius: "50%", zIndex: 1, filter: `blur(${bw * 0.10}px)`,
        opacity: 0.46 + core * 0.56 + seat * 0.30,
        background: `radial-gradient(50% 50% at 50% 46%, ${hexa("#FFD2DA", 0.92)} 0%, ${hexa("#FF9EB2", 0.44)} 38%, ${hexa("#FF7E98", 0)} 76%)` }} />
      {core > 0.05 && Array.from({ length: 14 }, (_, i) => {
        const t = ((f * 0.022 + i / 14) % 1);
        const r = bw * (0.12 + (i % 4) * 0.05);
        return (
          <div key={"mt" + i} style={{ position: "absolute", zIndex: 2,
            left: bw * (0.04 + (i / 14) * 0.92) + Math.sin(t * 6.3 + i) * bw * 0.06 - r / 2,
            top: bh * (0.94 - t * 1.30), width: r, height: r, borderRadius: "50%",
            opacity: (1 - t) * core * 0.95, filter: `blur(${bw * 0.014}px)`,
            background: `radial-gradient(50% 50% at 50% 50%, #FFF0F3 0%, ${hexa("#FFAFC0", 0)} 100%)` }} />
        );
      })}

      {/* ⭐ THE HOUSE BRAIN, from reel 116 */}
      <div style={{ position: "absolute", left: 0, top: 0, width: bw, height: bh, zIndex: 4 }}>
        <Brain x={bw / 2} y={bh / 2} s={bw / 560} f={f} lit={LIT} z={4}
          c={mxh("#D2757F", L * 0.12)} hot="#FFE2C0" />
      </div>

      {/* the STEM's coupling collar — what mates it to a Claude, which is the
          one thing reel 116's brain never had to do */}
      <div style={{ position: "absolute", left: bw / 2 - 42, top: bh - 6, width: 84, height: 22,
        zIndex: 5, borderRadius: 6,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.32)} 0%, ${dkh(BRASS, 0.34)} 100%)` }}>
        {[0.16, 0.84].map((bx, i) => (
          <div key={i} style={{ position: "absolute", left: `${bx * 100}%`, top: 6, width: 10, height: 10,
            borderRadius: "50%", background: dkh(BRASS, 0.52) }} />
        ))}
      </div>
      {seat > 0.02 && (
        <div style={{ position: "absolute", left: bw / 2 - 62, top: bh - 20, width: 124, height: 62,
          borderRadius: "50%", zIndex: 6, opacity: seat * 0.9, filter: "blur(10px)",
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFEDBC", 0.95)} 0%, ${hexa("#FFEDBC", 0)} 100%)` }} />
      )}
    </div>
  );
};

/* =========================================================================
   16 · THE ALARM MARK — the Obsidian tile, big, shaking, under a red beacon
   ⛔ v1 drew this at 92px on the crown of a tower unit, where it was a purple
   blob a viewer could not identify. A mark is RECOGNISED, not decoded, and a
   mark too small to recognise is doing no work at all. It is now 168px, it
   SHAKES on its own fast clock, and a beacon sweeps behind it.
   ====================================================================== */
export const AlarmMark: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  file?: string; alarm?: number; tilt?: number; strike?: number; shatter?: number }> =
  ({ x, y, s = 1, z = 72, f, file = "obsidian.svg", alarm = 1, tilt = 0,
     strike = 0, shatter = 0 }) => {
  /* ⭐⭐ IT GETS DELETED, ON THE WORD. Asked for directly: *"the obsidian part
     should be like some effect to it, like when it says DELETE OBSIDIAN to show
     its deleted somehow."* The word "Obsidian" is spoken at frame 5 (measured
     off the caption JSON, never guessed), so the strike lands at f10 and the
     tile breaks at f16 — the beat is ON the word rather than near it.
     What makes a thing read as DELETED rather than as merely gone: it is
     STRUCK first (a red cross, stamped, which is the mark a viewer already
     associates with removal), and then it BREAKS — six wedges of the same tile,
     each clipped out of it, flying on its own angle under gravity. A prop that
     fades out has been forgotten; a prop that shatters has been destroyed. */
  const a2 = Math.max(0, Math.min(1, alarm));
  const st = Math.max(0, Math.min(1, strike));
  const sh = Math.max(0, Math.min(1, shatter));
  const D = 292 * s;
  const shk = a2 * 5.4;
  /* six wedges cut from the centre, each with its own escape angle */
  const SHARDS: Array<[string, number, number]> = [
    ["polygon(50% 50%, 0% 0%, 46% 0%)", -122, 1.00],
    ["polygon(50% 50%, 46% 0%, 100% 0%, 100% 32%)", -54, 1.15],
    ["polygon(50% 50%, 100% 32%, 100% 100%, 62% 100%)", 22, 0.92],
    ["polygon(50% 50%, 62% 100%, 20% 100%)", 88, 1.08],
    ["polygon(50% 50%, 20% 100%, 0% 100%, 0% 58%)", 146, 0.86],
    ["polygon(50% 50%, 0% 58%, 0% 0%)", -168, 1.04],
  ];
  const Tile: React.FC<{ clip?: string; grey: number }> = ({ clip, grey }) => (
    <div style={{ position: "absolute", inset: 0, borderRadius: D * 0.24,
      background: "#FBF8F0", clipPath: clip,
      border: `${5 * s}px solid ${st > 0.4 ? "#8E8A82" : a2 > 0.4 ? "#E0553A" : "#D8CFBC"}`,
      boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center",
      filter: grey > 0.02 ? `grayscale(${grey}) brightness(${1 - grey * 0.18})` : undefined }}>
      <Img src={staticFile(`logos/${file}`)}
        style={{ width: D * 0.62, height: D * 0.62, objectFit: "contain" }} />
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D, zIndex: z,
      transform: `translate(${Math.sin(f * 1.7) * shk}px, ${Math.cos(f * 2.3) * shk * 0.7}px) rotate(${tilt + Math.sin(f * 1.9) * a2 * 3.4}deg)` }}>
      {/* the beacon behind it, which DIES the moment it is struck */}
      {a2 > 0.02 && st < 0.5 && (
        <div style={{ position: "absolute", left: -D * 0.28, top: -D * 0.28, width: D * 1.56,
          height: D * 1.56, borderRadius: "50%",
          opacity: a2 * (1 - st * 2) * (0.34 + 0.32 * Math.abs(Math.sin(f * 0.34))),
          filter: "blur(16px)",
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FF6A48", 0.9)} 0%, ${hexa("#FF6A48", 0)} 70%)` }} />
      )}

      {/* whole until it breaks, then six wedges going their own ways */}
      {sh < 0.02
        ? <Tile grey={st} />
        : SHARDS.map(([clip, ang, sp], i) => {
            const r = (ang * Math.PI) / 180;
            const d = sh * D * 0.95 * sp;
            return (
              <div key={"sd" + i} style={{ position: "absolute", inset: 0,
                opacity: 1 - sh * 0.85,
                transform: `translate(${Math.cos(r) * d}px, ${Math.sin(r) * d + sh * sh * D * 1.1}px) rotate(${sh * ang * 0.7}deg)` }}>
                <Tile clip={clip} grey={1} />
              </div>
            );
          })}

      {/* ⭐ THE STRIKE — a stamped red cross, the mark a viewer already reads as
          "removed". It arrives with a BACK overshoot so it lands like a stamp. */}
      {st > 0.02 && sh < 0.6 && (
        <div style={{ position: "absolute", left: -D * 0.10, top: -D * 0.10, width: D * 1.20,
          height: D * 1.20, opacity: 1 - sh * 1.6,
          transform: `scale(${0.4 + st * 0.6}) rotate(${(1 - st) * -22}deg)` }}>
          {[42, -42].map((rot, i) => (
            <div key={i} style={{ position: "absolute", left: "50%", top: "50%",
              width: D * 1.06, height: D * 0.115, marginLeft: -D * 0.53, marginTop: -D * 0.058,
              borderRadius: D * 0.06, background: "#D8351F",
              transform: `rotate(${rot}deg)` }} />
          ))}
        </div>
      )}

      {/* the warning ticks, until it is struck */}
      {a2 > 0.35 && st < 0.3 && [-1, 1].map(sd => (
        <div key={"tk" + sd} style={{ position: "absolute", left: sd < 0 ? -D * 0.30 : D * 1.06,
          top: D * 0.30, width: D * 0.24, height: D * 0.34,
          opacity: a2 * (1 - st * 3) * (0.5 + 0.5 * Math.abs(Math.sin(f * 0.46))),
          transform: `scaleX(${sd})` }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: `${i * 26}%`, top: `${i * 16}%`,
              width: "44%", height: 6 * s, borderRadius: 3, background: "#E0553A",
              transform: `rotate(${-34 + i * 26}deg)` }} />
          ))}
        </div>
      ))}
    </div>
  );
};

/* =========================================================================
   17 · THE LAPTOP — "your machine", drawn as the thing people actually mean
   ⛔⛔ v1 drew "run locally on your machine" as a SHED. Alex: *"that doesn't
   really represent what it means to set your tasks to run locally on your
   machine."* He is right and it is §3 exactly: a shed is a CONTAINER for the
   idea "somewhere local", and it depicts none of the nouns in the line. The
   noun is YOUR MACHINE, and for everyone watching this that is a laptop.
   What says LAPTOP: a wedge base with a visible deck, a hinge line, a lid at a
   real angle, a bezel with a camera dot, a trackpad and a key field.
   ====================================================================== */
export const Laptop: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  lit?: number; running?: number; label?: string; memEmpty?: number }> =
  ({ x, y, s = 1, z = 50, f, lit = 1, running = 0, label, memEmpty = 0 }) => {
  const LW = 340 * s, LH = 214 * s;
  return (
    <div style={{ position: "absolute", left: x - LW / 2, top: y - LH - 46 * s, width: LW,
      height: LH + 46 * s, zIndex: z }}>
      {/* the LID, at an angle, with a bezel and a camera dot */}
      <div style={{ position: "absolute", left: 18 * s, top: 0, width: LW - 36 * s, height: LH,
        borderRadius: `${10 * s}px ${10 * s}px 3px 3px`, boxShadow: SH,
        background: `linear-gradient(168deg, ${mxh("#8E969E", 0.22)} 0%, ${dkh("#8E969E", 0.26)} 100%)`,
        border: `${5 * s}px solid ${dkh("#5A6068", 0)}` }}>
        <div style={{ position: "absolute", left: "50%", marginLeft: -3 * s, top: 5 * s,
          width: 6 * s, height: 6 * s, borderRadius: "50%", background: dkh("#3A4048", 0) }} />
        {/* the SCREEN */}
        <div style={{ position: "absolute", inset: 14 * s, borderRadius: 4 * s, overflow: "hidden",
          background: `linear-gradient(178deg, ${mxh(TEAL, 0.06 + lit * 0.20)} 0%, #0C141C 100%)` }}>
          {/* the task actually running on it */}
          {running > 0.02 && [0, 1, 2].map(i => {
            const t = ((f * 0.024 + i / 3) % 1);
            return (
              <div key={"tk" + i} style={{ position: "absolute", left: 12 * s + t * (LW - 96 * s),
                top: (18 + i * 26) * s, width: 46 * s, height: 15 * s, borderRadius: 3,
                opacity: running, background: hexa(CLAY, 0.86) }} />
            );
          })}
          {/* ⭐ THE MEMORY SLOT ON IT, and whether anything is IN it. This is the
              whole catch, stated on the object it is true of. */}
          <div style={{ position: "absolute", left: 12 * s, bottom: 10 * s, width: LW - 60 * s,
            height: 34 * s, borderRadius: 4 * s,
            border: `${2.5 * s}px dashed ${hexa(memEmpty > 0.5 ? RED : GREEN, 0.86)}`,
            display: "flex", alignItems: "center", paddingLeft: 8 * s }}>
            <span style={{ ...mono(Math.round(12 * s), 900),
              color: hexa(memEmpty > 0.5 ? RED : GREEN, 0.94), letterSpacing: 1.2 }}>
              {memEmpty > 0.5 ? "MEMORY  —  EMPTY" : "MEMORY  SYNCED"}</span>
          </div>
        </div>
      </div>
      {/* the HINGE */}
      <div style={{ position: "absolute", left: 22 * s, top: LH - 2 * s, width: LW - 44 * s,
        height: 7 * s, background: dkh("#5A6068", 0.20) }} />
      {/* the BASE — a wedge, with a key field and a trackpad */}
      <div style={{ position: "absolute", left: 0, top: LH + 4 * s, width: LW, height: 34 * s,
        borderRadius: `4px 4px ${10 * s}px ${10 * s}px`, boxShadow: SH_D,
        background: `linear-gradient(180deg, ${mxh("#A2AAB2", 0.16)} 0%, ${dkh("#8E969E", 0.30)} 100%)` }}>
        <div style={{ position: "absolute", left: 26 * s, top: 5 * s, width: LW - 52 * s,
          height: 15 * s, borderRadius: 2, background: dkh("#8E969E", 0.42) }} />
        <div style={{ position: "absolute", left: "50%", marginLeft: -34 * s, top: 23 * s,
          width: 68 * s, height: 7 * s, borderRadius: 2, background: dkh("#8E969E", 0.30) }} />
      </div>
      {label && (
        <div style={{ position: "absolute", left: 0, top: LH + 42 * s, width: LW, textAlign: "center" }}>
          <span style={{ ...mono(Math.round(14 * s), 900), color: hexa("#DCE4EC", 0.78),
            letterSpacing: 2 }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   18 · THE TASK CARD — the thing you SET, and the switch you set it with
   The line's verb is SET and its object is YOUR TASKS, so a task has to be an
   object you can pick up and a setting has to be a control you can throw.
   ====================================================================== */
export const TaskCard: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  title: string; local?: number; rot?: number; ghost?: number }> =
  ({ x, y, s = 1, z = 56, f = 0, title, local = 0, rot = 0, ghost = 0 }) => {
  const CW = 250 * s, CH = 124 * s;
  return (
    <div style={{ position: "absolute", left: x - CW / 2, top: y - CH / 2, width: CW, height: CH,
      zIndex: z, transform: `rotate(${rot}deg)`, opacity: 1 - ghost * 0.65 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, boxShadow: SH_D,
        background: `linear-gradient(174deg, #FAF6EC 0%, ${dkh("#E8E1D0", 0.06)} 100%)`,
        border: `${3 * s}px solid ${dkh("#C6BCA6", 0)}` }} />
      {/* the header strip: it is a TASK */}
      <div style={{ position: "absolute", left: 6 * s, top: 6 * s, width: CW - 12 * s, height: 24 * s,
        borderRadius: 4 * s, background: hexa(CLAY, 0.90), display: "flex", alignItems: "center",
        paddingLeft: 9 * s }}>
        <span style={{ ...mono(Math.round(13 * s), 900), color: "#2A1006", letterSpacing: 1.2 }}>
          TASK</span>
      </div>
      <div style={{ position: "absolute", left: 12 * s, top: 36 * s }}>
        <span style={{ ...mono(Math.round(14 * s), 900), color: hexa(INK, 0.78) }}>{title}</span>
      </div>
      {/* ⭐ THE SETTING, ON THE CARD: a two-position selector that visibly moves */}
      <div style={{ position: "absolute", left: 12 * s, top: 62 * s, width: CW - 24 * s, height: 46 * s,
        borderRadius: 6 * s, background: hexa(INK, 0.08),
        border: `${2 * s}px solid ${hexa(INK, 0.14)}` }}>
        <div style={{ position: "absolute", left: 4 * s + local * ((CW - 32 * s) / 2), top: 4 * s,
          width: (CW - 32 * s) / 2, height: 38 * s, borderRadius: 4 * s,
          background: local > 0.5 ? hexa(SODIUM, 0.94) : hexa(SKY, 0.90) }} />
        {["CLOUD", "THIS MACHINE"].map((t, i) => (
          <div key={i} style={{ position: "absolute", left: 4 * s + i * ((CW - 32 * s) / 2),
            top: 4 * s, width: (CW - 32 * s) / 2, height: 38 * s, display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(Math.round(11 * s), 900), letterSpacing: 0.8,
              color: hexa(INK, (i === 0 ? 1 - local : local) > 0.5 ? 0.86 : 0.34) }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
