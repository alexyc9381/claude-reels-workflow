import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  mono, ui, settle, STEP,
  R, PHASE, DRW, DRWD, DRWL, BLANK, BLANKD, COUNTERTOP, HALLSTEEL,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, EMBER, OXIDE, SLATE, COPPER,
  lerpHex,
} from "./LbyWorld";
import type { Place } from "./LbyWorld";

/* ===========================================================================
   REEL 130 · "LIBRARY" — THE PROPS.  Board: storyboards/130-library.md.

   ⛔⛔⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES. The house bar is 12-16 drawn
      elements on a hero prop; a book once shipped as FOUR DIVS and was rejected
      ([[feedback_props_need_real_drawing]]). `PromptCard` below is 17 parts and
      `Drawer` is 9, because a drawer is furniture and a card is the subject.

   ⛔⛔ CATEGORY IS COMMUNICATED BY STRUCTURE, NOT HUE (ANIMATION-QUALITY §11).
      What makes something read as a FILING CARD rather than a rectangle is:
        a coloured TAB standing proud of the top edge · a ruled HEAD line ·
        printed body rules of UNEVEN length · PUNCHED slots with a red guide ·
        a rounded corner and one CLIPPED corner · a maker's mark.
      All six are drawn. Hue does almost none of the work.

   ⛔ A LIT RECTANGLE IS A SCREEN — the chute mouth and the hatch are HOLES: the
      room stops at them, full height, square corners, with light on the floor
      in front. [[feedback_a_lit_rectangle_is_a_screen]]
   ========================================================================= */

/* =========================================================================
   1 · THE PROMPT CARD — THE HERO ARTIFACT.
   ====================================================================== */
export const PromptCard: React.FC<{
  x: number; y: number; s?: number; z?: number; rot?: number;
  /** which phase bank it came from — sets the tab colour and the notch */
  ph?: number;
  /** 0 = blank stock (THE ANTAGONIST), 1 = fully printed */
  ink?: number;
  /** 0..1 — how much of the fill-in slots carry YOUR values */
  fill?: number;
  /** the category word on the tab; omitted on blank stock */
  cat?: string;
  /** face-on and legible (the counter shots) vs edge-on in a rank */
  big?: boolean;
  o?: number; f?: number;
  /** ⭐ EXTRA GRAPHICS, OPT-IN. *"the paper should be more interesting and like
      more graphics rather than like lines."* The card's default face is ruled
      text, which is right at rank size and reads as blank paper when a card is
      the HERO of a shot. `rich` adds the things a real prompt page actually has
      — a phase badge, a syntax-coloured command strip, numbered steps and a copy
      chip. ⛔ DEFAULT OFF: this component is on twelve scenes, and enriching all
      of them from a note about the hook would be a change nobody asked for. */
  rich?: boolean;
}> = ({ x, y, s = 1, z = 60, rot = 0, ph = 2, ink = 1, fill = 0, cat, big = false, o = 1,
        f = 0, rich = false }) => {
  const CW = 260 * s, CH = 340 * s;
  const P = PHASE[((ph % 5) + 5) % 5];
  const face = ink > 0.5 ? "#F4F0E4" : BLANK;
  const rule = (i: number) => 0.42 + rnd(i, 71) * 0.5;
  return (
    <div style={{ position: "absolute", left: x - CW / 2, top: y - CH, width: CW, height: CH,
      zIndex: z, opacity: o, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* 1 · the card body, with ONE clipped corner so it is never a plain rect */}
      <div style={{ position: "absolute", inset: 0, background: face, boxShadow: SH_D,
        borderRadius: `${5 * s}px ${5 * s}px ${5 * s}px ${5 * s}px`,
        clipPath: `polygon(0 0, 100% 0, 100% ${CH - 26 * s}px, ${CW - 26 * s}px 100%, 0 100%)` }} />
      {/* 2 · the stock's own edge shadow — card, not paper */}
      <div style={{ position: "absolute", left: 0, top: 0, width: CW, height: 5 * s,
        background: hexa("#000", 0.10) }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: 5 * s, bottom: 26 * s,
        background: hexa("#000", 0.08) }} />

      {/* 3 · THE TAB — stands PROUD of the top edge. This is the thing that says
             "filing card" before anything is read. */}
      {ink > 0.4 && (
        <div style={{ position: "absolute", left: CW * 0.10, top: -18 * s, width: CW * 0.46,
          height: 26 * s, borderRadius: `${5 * s}px ${5 * s}px 0 0`, background: P.c,
          borderBottom: `${3 * s}px solid ${hexa("#000", 0.24)}` }} />
      )}
      {/* 4 · the tab's printed word */}
      {ink > 0.7 && cat && (
        <div style={{ position: "absolute", left: CW * 0.10, top: -15 * s, width: CW * 0.46,
          height: 22 * s, display: "flex", alignItems: "center", justifyContent: "center",
          ...mono(Math.round(13 * s), 800), color: "#14181C", letterSpacing: "0.10em" }}>
          {cat.toUpperCase()}
        </div>
      )}

      {/* 5 · the ruled HEAD line */}
      {ink > 0.3 && (
        <div style={{ position: "absolute", left: 16 * s, right: 16 * s, top: 34 * s,
          height: 3 * s, background: hexa("#B9302A", 0.62 * ink) }} />
      )}
      {/* 6 · the printed prompt body — UNEVEN rules, never a block */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"pr" + i} style={{ position: "absolute", left: 18 * s, top: (48 + i * 20) * s,
          width: (CW - 36 * s) * rule(i) * Math.min(1, ink * 1.6),
          height: 7 * s, borderRadius: 2, background: hexa("#2A2620", 0.72 * ink) }} />
      ))}

      {/* 7 · THE PUNCHED FILL-IN SLOTS — the library's real editable fields.
             A slot is a HOLE with a red guide under it; when `fill` rises, YOUR
             value is typed into it. */}
      {[0, 1].map(i => {
        const sy = (168 + i * 46) * s;
        const sw = (CW - 46 * s) * (i ? 0.62 : 0.86);
        const k = Math.max(0, Math.min(1, fill * 2 - i));
        return (
          <React.Fragment key={"sl" + i}>
            <div style={{ position: "absolute", left: 22 * s, top: sy, width: sw, height: 26 * s,
              borderRadius: 3, background: hexa("#0C0E10", 0.30 * ink),
              border: `${2 * s}px solid ${hexa("#B9302A", 0.5 * ink)}` }} />
            <div style={{ position: "absolute", left: 22 * s, top: sy + 26 * s, width: sw,
              height: 3 * s, background: hexa("#B9302A", 0.78 * ink) }} />
            {/* the placeholder token, then YOUR value written over it */}
            <div style={{ position: "absolute", left: 28 * s, top: sy + 5 * s, width: sw - 12 * s,
              height: 17 * s, overflow: "hidden", display: "flex", alignItems: "center",
              ...mono(Math.round(13 * s), 700),
              color: k > 0.5 ? "#1C4E38" : hexa("#6E6656", 0.9), whiteSpace: "nowrap" }}>
              {k > 0.5 ? (i ? R.slotBv : R.slotAv) : (ink > 0.5 ? (i ? R.slotB : R.slotA) : "")}
            </div>
            {k > 0.05 && k < 0.98 && (
              <div style={{ position: "absolute", left: 28 * s + (sw - 24 * s) * k, top: sy + 4 * s,
                width: 3 * s, height: 19 * s, background: "#1C4E38" }} />
            )}
          </React.Fragment>
        );
      })}

      {/* 8 · two more printed rules under the slots */}
      {Array.from({ length: 2 }, (_, i) => (
        <div key={"pb" + i} style={{ position: "absolute", left: 18 * s, top: (262 + i * 18) * s,
          width: (CW - 36 * s) * (i ? 0.44 : 0.74) * ink, height: 6 * s, borderRadius: 2,
          background: hexa("#2A2620", 0.56 * ink) }} />
      ))}

      {/* 9 · THE PHASE NOTCH on the left edge — an edge-notched filing card */}
      {ink > 0.4 && Array.from({ length: 5 }, (_, i) => (
        <div key={"nt" + i} style={{ position: "absolute", left: -1, top: (60 + i * 40) * s,
          width: 11 * s, height: 15 * s, borderRadius: `0 ${6 * s}px ${6 * s}px 0`,
          background: i === (ph % 5) ? P.c : hexa("#000", 0.18) }} />
      ))}

      {/* 10 · the maker's mark, where a card's stamp goes */}
      {ink > 0.6 && (
        <div style={{ position: "absolute", left: 18 * s, bottom: 14 * s,
          display: "flex", alignItems: "center", gap: 6 * s }}>
          <div style={{ width: 18 * s, height: 18 * s, borderRadius: 4 * s, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 14 * s, height: 14 * s, objectFit: "contain" }} />
          </div>
          <div style={{ ...mono(Math.round(11 * s), 800), color: "#6E6656", letterSpacing: "0.08em" }}>
            ANTHROPIC
          </div>
        </div>
      )}

      {/* ══ 12 · THE RICH FACE ══ drawn OVER the ruled body, which it replaces
             rather than crowds — a card cannot be both a page of prose and a
             page of graphics. Everything below is a real feature of the library
             page: the SDLC phase it belongs to, the command it gives you, the
             steps it runs, and the copy control. */}
      {rich && ink > 0.5 && (<>
        {/* the ruled prose is knocked back so the graphics own the face */}
        <div style={{ position: "absolute", left: 12 * s, top: 40 * s, right: 12 * s,
          bottom: 34 * s, background: face }} />

        {/* a · THE PHASE BADGE — a real chip with a mark, not a bar */}
        <div style={{ position: "absolute", left: 18 * s, top: 46 * s, height: 34 * s,
          display: "flex", alignItems: "center", gap: 7 * s, padding: `0 ${10 * s}px`,
          borderRadius: 17 * s, background: hexa(P.c, 0.22),
          border: `${2 * s}px solid ${hexa(P.c, 0.85)}` }}>
          <div style={{ width: 15 * s, height: 15 * s, borderRadius: "50%", background: P.c }} />
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: (26 - i * 7) * s, height: 5 * s, borderRadius: 2,
              background: hexa("#2A2620", 0.6) }} />
          ))}
        </div>
        {/* the five-phase progress pips, the one you are in filled */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"pp" + i} style={{ position: "absolute", right: (18 + (4 - i) * 15) * s,
            top: 56 * s, width: 11 * s, height: 11 * s, borderRadius: "50%",
            background: i <= (ph % 5) ? PHASE[i].c : hexa("#2A2620", 0.16) }} />
        ))}

        {/* b · ⭐ THE COMMAND STRIP — a dark terminal band with real syntax
               colour. This is the single biggest change: a black rectangle with
               three coloured tokens in it reads as CODE from across a room,
               where a grey rule reads as nothing. */}
        <div style={{ position: "absolute", left: 18 * s, top: 92 * s, right: 18 * s,
          height: 46 * s, borderRadius: 5 * s, background: "#191D22",
          border: `${2 * s}px solid ${hexa("#000", 0.4)}` }} />
        <div style={{ position: "absolute", left: 26 * s, top: 104 * s,
          ...mono(Math.round(15 * s), 800), color: "#E4A548" }}>{"$"}</div>
        {[[38, 46, "#6FD3A8"], [88, 30, "#E4A548"], [124, 52, "#8FB8E8"]].map((c, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: (c[0] as number) * s,
            top: 108 * s, width: (c[1] as number) * s, height: 8 * s, borderRadius: 2,
            background: c[2] as string }} />
        ))}
        <div style={{ position: "absolute", left: 26 * s, top: 122 * s, width: 92 * s,
          height: 7 * s, borderRadius: 2, background: hexa("#8A96A2", 0.7) }} />
        {/* the caret, blinking on the card's own clock */}
        <div style={{ position: "absolute", left: 124 * s, top: 120 * s, width: 4 * s,
          height: 12 * s, background: "#E9EEF3",
          opacity: Math.floor(f / 9) % 2 ? 0.15 : 0.95 }} />

        {/* c · THE STEPS — numbered discs, which is what a procedure LOOKS like */}
        {[0, 1, 2].map(i => (
          <React.Fragment key={"st" + i}>
            <div style={{ position: "absolute", left: 20 * s, top: (152 + i * 30) * s,
              width: 21 * s, height: 21 * s, borderRadius: "50%",
              background: i === 0 ? P.c : hexa("#2A2620", 0.13),
              border: `${2 * s}px solid ${hexa("#2A2620", 0.28)}` }} />
            <div style={{ position: "absolute", left: 49 * s, top: (159 + i * 30) * s,
              width: (CW - 82 * s) * [0.92, 0.7, 0.84][i], height: 7 * s, borderRadius: 2,
              background: hexa("#2A2620", 0.5) }} />
          </React.Fragment>
        ))}

        {/* d · THE TWO FILL-IN SLOTS, as PILLS with their tokens legible —
               the library's own editable fields are the reason to use it */}
        {[0, 1].map(i => {
          const k = Math.max(0, Math.min(1, fill * 2 - i));
          return (
            <div key={"rs" + i} style={{ position: "absolute", left: 20 * s,
              top: (244 + i * 32) * s, width: (CW - 40 * s) * (i ? 0.62 : 0.88), height: 25 * s,
              borderRadius: 13 * s, display: "flex", alignItems: "center",
              padding: `0 ${10 * s}px`, ...mono(Math.round(12 * s), 800),
              color: k > 0.5 ? "#F0FBF4" : "#8A5A18", whiteSpace: "nowrap", overflow: "hidden",
              background: k > 0.5 ? "#2E6E4E" : hexa("#E4A548", 0.30),
              border: `${2 * s}px solid ${k > 0.5 ? "#17402C" : hexa("#B98A18", 0.8)}` }}>
              {k > 0.5 ? (i ? R.slotBv : R.slotAv) : (i ? R.slotB : R.slotA)}
            </div>
          );
        })}

        {/* e · THE COPY CHIP — the one control the page actually gives you */}
        <div style={{ position: "absolute", right: 18 * s, bottom: 16 * s, width: 62 * s,
          height: 26 * s, borderRadius: 5 * s, background: "#2E6E4E",
          border: `${2 * s}px solid #17402C`, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 5 * s }}>
          <div style={{ width: 11 * s, height: 13 * s, borderRadius: 2,
            border: `${2 * s}px solid #CDEBD9` }} />
          <div style={{ width: 22 * s, height: 6 * s, borderRadius: 2, background: "#CDEBD9" }} />
        </div>
      </>)}

      {/* 11 · the clipped corner's own bevel */}
      <div style={{ position: "absolute", right: 0, bottom: 0, width: 26 * s, height: 26 * s,
        background: hexa("#000", 0.13),
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
      {big && ink > 0.6 && (
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0,
          border: `${2 * s}px solid ${hexa("#000", 0.16)}`,
          clipPath: `polygon(0 0, 100% 0, 100% ${CH - 26 * s}px, ${CW - 26 * s}px 100%, 0 100%)` }} />
      )}
    </div>
  );
};

/* =========================================================================
   2 · THE SPIKE — the antagonist's home. A desk spike with N blanks driven
   onto it. ⛔ IT IS NEVER EMPTY AND NEVER REMOVED: it is in the hook, it is
   the whole of S4, and it is still standing in the last frame.
   ====================================================================== */
export const Spike: React.FC<{ x: number; y: number; n: number; s?: number; z?: number;
  f?: number; jolt?: number }> =
  ({ x, y, n, s = 1, z = 62, f = 0, jolt = 0 }) => {
  const cnt = Math.max(0, Math.round(n));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translateY(${-jolt * 6}px)` }}>
      {/* the cast base */}
      <div style={{ position: "absolute", left: -46 * s, top: -14 * s, width: 92 * s, height: 22 * s,
        borderRadius: 5 * s, background: "#3A3F44", boxShadow: SH }} />
      <div style={{ position: "absolute", left: -40 * s, top: -18 * s, width: 80 * s, height: 8 * s,
        borderRadius: 4 * s, background: "#4E555C" }} />
      {/* ⛔ THE NEEDLE MUST BE VISIBLE ABOVE THE STACK or the whole thing reads
          as a pile of pancakes rather than something DRIVEN ONTO a spike. It
          always stands 46px proud, and it has a point. */}
      <div style={{ position: "absolute", left: -3.5 * s, top: -(cnt * 3.6 + 68) * s, width: 7 * s,
        height: (cnt * 3.6 + 68) * s,
        background: `linear-gradient(90deg, ${dkh("#8A9198", -0.3)} 0%, #B9C2C8 46%, ${dkh("#8A9198", -0.4)} 100%)` }} />
      <div style={{ position: "absolute", left: -5 * s, top: -(cnt * 3.6 + 80) * s, width: 10 * s,
        height: 14 * s, background: "#C6CFD5",
        clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
      {/* ⭐ THE STACK IS A COMPRESSED WAD, NOT A TOWER. 3.6px of pitch per card
          is what a spiked docket stack actually looks like; 7px made 34 cards
          238px tall and it read as a stack of plates. Every fourth card stands
          PROUD at an angle, which is the tell that they were driven on one at a
          time by an angry person. */}
      {Array.from({ length: cnt }, (_, i) => {
        const proud = i % 4 === 3;
        const w = (94 + rnd(i, 11) * 22) * s;
        const rt = (rnd(i, 12) - 0.5) * (proud ? 22 : 6);
        return (
          <div key={"bk" + i} style={{ position: "absolute",
            left: -w / 2 + (rnd(i, 13) - 0.5) * (proud ? 30 : 11) * s,
            top: -(20 + i * 3.6) * s, width: w, height: 7 * s, borderRadius: 2,
            background: i % 3 === 0 ? BLANK : BLANKD,
            borderTop: `${1.5 * s}px solid ${hexa("#fff", 0.44)}`,
            borderBottom: `${1.5 * s}px solid ${hexa("#000", 0.30)}`,
            transform: `rotate(${rt}deg)` }} />
        );
      })}
    </div>
  );
};

/* =========================================================================
   3 · THE DRAWER + THE PICKING WALL.
   ⛔ A GRID FILLING IS ONE IDEA REPEATED N TIMES (ANIMATION-QUALITY §25). The
   wall is the SET, never the animation: it is drawn once and then the RAIL
   travels across it, the banks slide, and the frame pulls back. Nothing here
   "fills in".
   ====================================================================== */
export const Drawer: React.FC<{ x: number; y: number; w: number; h: number; ph: number;
  z?: number; open?: number; lit?: number; s?: number }> =
  ({ x, y, w: ww, h: hh, ph, z = 30, open = 0, lit = 1, s = 1 }) => {
  const P = PHASE[((ph % 5) + 5) % 5];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `translateX(${open * 26}px)` }}>
      {/* 1 the carcass. ⭐⭐ THE FACE PAINT RIDES `lit`, AND THAT IS WHAT MAKES
             THE PEAK BEAT THE HOOK. The first build lit only the tab, so at S9 —
             the flood, the scene the whole reel builds to — a wall of `#39434A`
             slate measured **luma 101** and read as a smaller, flatter version of
             S1. Lifting the FACE and leaving the gaps and the border black pushes
             the two values apart ([[feedback_push_the_two_values_apart]]): a dark
             field with bright detail feeds the mean AND the black point, where
             lifting the palette's dark stop would have destroyed one to buy the
             other. */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 3,
        background: `linear-gradient(178deg, ${mxh(DRW, 0.10 + lit * 0.44)} 0%, ${mxh(DRW, lit * 0.34)} 44%, ${mxh(DRWD, lit * 0.16)} 100%)`,
        border: `2px solid ${hexa("#000", 0.40)}` }} />
      {/* 2 the drawn face bevel */}
      <div style={{ position: "absolute", left: 3, top: 3, right: 3, height: Math.max(3, hh * 0.14),
        background: hexa("#FFF", 0.10 + 0.22 * lit) }} />
      {/* 3 THE TAB STRIP — the phase colour, and the thing the greyscale audit
             actually sees when the wall moves */}
      <div style={{ position: "absolute", left: ww * 0.10, top: hh * 0.20, width: ww * 0.52,
        height: Math.max(5, hh * 0.20), borderRadius: 2, background: P.c, opacity: 0.42 + lit * 0.58 }} />
      {/* 4 the pull */}
      <div style={{ position: "absolute", left: ww * 0.70, top: hh * 0.34, width: ww * 0.20,
        height: Math.max(4, hh * 0.26), borderRadius: 2, background: DRWL,
        borderBottom: `2px solid ${hexa("#000", 0.42)}` }} />
      {/* 5 the card edges showing when it is out */}
      {open > 0.05 && (
        <div style={{ position: "absolute", left: -Math.min(24, open * 26), top: hh * 0.12,
          width: Math.min(24, open * 26) + 4, height: hh * 0.74, borderRadius: 2,
          background: `repeating-linear-gradient(90deg, ${BLANK} 0 3px, ${BLANKD} 3px 5px)` }} />
      )}
      {/* 6 the shadow it casts on the one below — deep, so the gutter is a VOID */}
      <div style={{ position: "absolute", left: -2, right: -2, bottom: -7, height: 9,
        background: hexa("#000", 0.72) }} />
    </div>
  );
};

/** ⭐ THE WALL. Five banks, each its own colour, each with a lamp and a live
    counter reading that phase's REAL size. `pan` slides the whole thing so the
    LAYOUT is what moves. */
export const DrawerWall: React.FC<{
  f: number; x?: number; y?: number; w?: number; h?: number; z?: number;
  /** px offset — the rail/bank travel. This is the motion, not a fill. */
  pan?: number;
  /** 0..1 per bank — how lit that bank is */
  banks?: number[];
  /** which drawers are pulled out, by index */
  outs?: number[];
  /** ⭐ 0..1 per drawer index — a drawer that SLIDES rather than popping. `outs`
      stays for the static shots; this is what an in-use library needs, because a
      binary open is a jump cut and [[feedback_a_sway_is_the_whole_cast]] bans
      giving all 80 the same wave. */
  openAt?: (i: number) => number;
  rows?: number; cols?: number; s?: number; showCounters?: boolean;
}> = ({ f, x = -140, y = 96, w: ww = 1300, h: hh = 330, z = 30, pan = 0,
        banks = [1, 1, 1, 1, 1], outs = [], openAt, rows = 5, cols = 20, s = 1,
        showCounters = true }) => {
  const cw = ww / cols, ch = hh / rows;
  return (
    <div style={{ position: "absolute", left: x + pan, top: y, width: ww, height: hh, zIndex: z }}>
      {/* ⛔⛔⛔ THE WALL WAS THE REEL'S BLACK POINT. Once `lit` lifted the drawer
          FACES so the peak could beat the hook, three of the five scenes that
          carry the wall (FLOOD 54 · COPY 52 · REJECT 48) had no dark pixels left
          in them at all and `look_audit` blocked the reel at BODY_BLACK 38.2.
          ⭐ THE ANSWER IS NOT A DIMMER — it is that a wall of drawers HAS BLACK
          IN IT: the carcass behind them is near-black and the gutters between
          them are 10px wide, so every bright face is edged by a real void.
          [[feedback_push_the_two_values_apart]] — a dark field with bright detail
          feeds the mean AND the black point; a mid-tone wall feeds neither. */}
      <div style={{ position: "absolute", left: -14, top: -18, right: -14, bottom: -22,
        zIndex: 1, background: "#05070A" }} />
      {/* the wall's own frame — uprights every 5 columns, so it reads as built */}
      {Array.from({ length: Math.floor(cols / 4) + 1 }, (_, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: i * cw * 4 - 5, top: -14,
          width: 10, height: hh + 28, background: dkh(HALLSTEEL, -0.42), zIndex: 2 }} />
      ))}
      <div style={{ position: "absolute", left: -12, top: -16, right: -12, height: 12,
        background: dkh(HALLSTEEL, -0.30), zIndex: 3 }} />
      <div style={{ position: "absolute", left: -12, bottom: -18, right: -12, height: 14,
        background: dkh(HALLSTEEL, -0.46), zIndex: 3 }} />

      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols), c = i % cols;
        /* the phase a drawer belongs to is a BAND across the wall, so the five
           banks are five readable regions rather than confetti */
        const bank = Math.min(4, Math.floor(c / (cols / 5)));
        const lit = banks[bank] ?? 1;
        return (
          <Drawer key={"dw" + i} x={c * cw + 5} y={r * ch + 5} w={cw - 10} h={ch - 11}
            ph={bank} z={10} lit={lit} s={s}
            open={openAt ? openAt(i) : outs.includes(i) ? 1 : 0} />
        );
      })}

      {/* ⭐ THE BANK LAMPS + COUNTERS, INSIDE the wall's own footprint. The
             first build hung them at `top: -58`, which put them behind the
             HookHeader pill in every scene that used them — the reel's only
             per-phase receipt, drawn correctly and never once visible.
             ⛔ THE COUNTERS READ THE REAL PER-PHASE SIZES AND NOTHING SUMS THEM
             (`COUNT_BANNED`): 7 + 6 + 22 + 5 + 12, never 52 and never 100. */}
      {showCounters && PHASE.map((P, i) => {
        const bx = (i * ww) / 5;
        const on = banks[i] ?? 1;
        return (
          <div key={"bl" + i} style={{ position: "absolute", left: bx + 10, top: hh + 6,
            width: ww / 5 - 26, zIndex: 22, opacity: 0.20 + on * 0.80 }}>
            <div style={{ width: "100%", height: 11, borderRadius: 2, background: P.c,
              opacity: 0.30 + on * 0.70 }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 8 }}>
              <div style={{ ...mono(21, 900), color: "#F6F1E4" }}>{P.n}</div>
              <div style={{ ...mono(17, 800), color: P.c, letterSpacing: "0.12em" }}>{P.id}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   4 · THE SHUTTER — the hook's whole event. ⛔ A HOLE READS BECAUSE THE ROOM
   STOPS AT IT: it is full height, square-cornered, and there is light on the
   floor in front of it once it is up.
   ====================================================================== */
export const Shutter: React.FC<{ x: number; y: number; w: number; h: number; up: number;
  z?: number; f?: number;
  /** ⭐ 0..1 — lifts the SLAT PAINT only, never the room's dark stop. Frame 0 is
      a brightness competition (THE-OPEN law 1) and the shutter is the largest
      mass in the hook's opening shot, so this is where the mean luma is bought.
      [[feedback_push_the_two_values_apart]]: the slats go UP, the grooves
      between them stay black, so the black point does not move with it. */
  lift?: number }> =
  ({ x, y, w: ww, h: hh, up, z = 70, f = 0, lift = 0 }) => {
  const SL = mxh(STEEL, 0.10 + lift * 0.46);
  const SLAT = 26;
  const n = Math.floor(hh / SLAT);
  /* ⭐ the slats STACK at the head rather than sliding away — a real shutter
     concertinas, and the stack is a big bright object that keeps moving. */
  const openPx = up * hh;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh + 40, zIndex: z }}>
      {/* the frame's jambs — they stay whatever the shutter does */}
      <div style={{ position: "absolute", left: -18, top: -26, width: 20, height: hh + 40,
        background: dkh(STEEL, -0.5) }} />
      <div style={{ position: "absolute", right: -18, top: -26, width: 20, height: hh + 40,
        background: dkh(STEEL, -0.5) }} />
      {/* the head box */}
      <div style={{ position: "absolute", left: -24, top: -46, width: ww + 48, height: 30,
        background: dkh(STEEL, -0.62), borderBottom: `4px solid ${hexa("#000", 0.5)}` }} />

      {Array.from({ length: n }, (_, i) => {
        const rest = i * SLAT;
        /* the slat is either still hanging, or stacked into the head */
        const stackedAt = Math.max(0, 4 * i);
        const yy = rest > openPx ? rest - openPx * 0.06 : stackedAt - 22;
        const inStack = rest <= openPx;
        return (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, top: yy, width: ww,
            height: SLAT - 2, borderRadius: 2,
            background: inStack
              ? `linear-gradient(180deg, ${dkh(STEEL, -0.28)} 0%, ${dkh(STEEL, -0.56)} 100%)`
              : `linear-gradient(180deg, ${mxh(SL, 0.20)} 0%, ${dkh(SL, -0.30)} 68%, ${dkh(SL, -0.06)} 100%)`,
            borderBottom: `2px solid ${hexa("#000", 0.42)}`,
            opacity: inStack ? 0.96 : 1 }} />
        );
      })}
      {/* the pull bar at the bottom edge of what is left hanging */}
      {up < 0.98 && (
        <div style={{ position: "absolute", left: -6, top: hh - openPx * 1.06 - 16, width: ww + 12,
          height: 22, borderRadius: 3, background: dkh(BRASS, -0.2),
          borderBottom: `4px solid ${hexa("#000", 0.5)}` }} />
      )}
      {/* THE MARK CAST INTO THE SHUTTER — the audience filter, on frame 0 */}
      {up < 0.34 && (
        <div style={{ position: "absolute", left: ww / 2 - 92, top: hh * 0.40 - openPx * 1.06,
          width: 184, opacity: 1 - up * 2.6, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 10 }}>
          <div style={{ width: 84, height: 84, borderRadius: 20, background: "#FFFFFF",
            border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: SH }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 62, height: 62, objectFit: "contain" }} />
          </div>
          <div style={{ ...mono(19, 800), color: "#D8CFBE", letterSpacing: "0.22em" }}>CLAUDE CODE</div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   5 · THE COUNTER — the service window itself.
   ====================================================================== */
export const CounterTop: React.FC<{ x: number; y: number; w: number; z?: number; f?: number;
  bell?: number }> =
  ({ x, y, w: ww, z = 66, f = 0, bell = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
    {/* the worn top surface */}
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 26, borderRadius: 3,
      background: `linear-gradient(180deg, ${mxh(COUNTERTOP, 0.24)} 0%, ${COUNTERTOP} 55%, ${dkh(COUNTERTOP, -0.28)} 100%)` }} />
    {/* the brass nosing */}
    <div style={{ position: "absolute", left: -6, top: 22, width: ww + 12, height: 11,
      borderRadius: 3, background: `linear-gradient(180deg, ${mxh(BRASS, 0.3)} 0%, ${dkh(BRASS, -0.3)} 100%)` }} />
    {/* the front panel, panelled */}
    <div style={{ position: "absolute", left: 0, top: 33, width: ww, height: 150,
      background: `linear-gradient(180deg, ${dkh(COUNTERTOP, -0.34)} 0%, ${dkh(COUNTERTOP, -0.58)} 100%)` }} />
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"pn" + i} style={{ position: "absolute", left: 18 + i * (ww - 36) / 4, top: 48,
        width: (ww - 36) / 4 - 18, height: 118, borderRadius: 3,
        border: `3px solid ${hexa("#000", 0.30)}`, background: hexa("#FFF", 0.03) }} />
    ))}
    {/* the desk bell — a real one, and it RINGS */}
    <div style={{ position: "absolute", left: ww - 96, top: -34 - bell * 5, width: 62, height: 40 }}>
      <div style={{ position: "absolute", left: 0, top: 6, width: 62, height: 34,
        borderRadius: "31px 31px 5px 5px",
        background: `linear-gradient(150deg, ${mxh(BRASS, 0.34)} 0%, ${dkh(BRASS, -0.34)} 100%)` }} />
      <div style={{ position: "absolute", left: 26, top: -4, width: 10, height: 12, borderRadius: 3,
        background: dkh(BRASS, -0.1) }} />
      <div style={{ position: "absolute", left: -4, top: 38, width: 70, height: 7, borderRadius: 3,
        background: dkh(BRASS, -0.5) }} />
    </div>
  </div>
);

/* =========================================================================
   6 · THE CONSOLE + THE KEY-CAPS + THE CHUTE (rules 1 and 2 live here).
   ⛔ FOUR SCENES WERE ORIGINALLY BUILT ON THIS ONE PROP — the critic pass caught
   it ([[feedback_one_prop_five_scenes]]). It now appears in TWO framings only:
   S3 head-on at the key bank, S5 tight on the rocker and the mode strip.
   ====================================================================== */
export const KeyCap: React.FC<{ x: number; y: number; w?: number; label: string; press?: number;
  c?: string; z?: number; blank?: boolean; s?: number }> =
  ({ x, y, w: ww = 150, label, press = 0, c = BRASS, z = 60, blank = false, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y + press * 9, width: ww, height: 58 * s, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 58 * s, borderRadius: 7,
      background: blank
        ? `linear-gradient(180deg, ${mxh(BLANK, 0.1)} 0%, ${dkh(BLANK, -0.2)} 100%)`
        : `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${c} 46%, ${dkh(c, -0.34)} 100%)`,
      border: `2px solid ${hexa("#000", 0.34)}` }} />
    {/* the dished top */}
    <div style={{ position: "absolute", left: 7, top: 6, width: ww - 14, height: 22 * s,
      borderRadius: 5, background: hexa("#FFF", blank ? 0.24 : 0.16) }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 58 * s,
      display: "flex", alignItems: "center", justifyContent: "center",
      ...mono(Math.round(21 * s), 900), color: blank ? hexa("#6E6656", 0.5) : "#181410",
      letterSpacing: "0.04em" }}>{label}</div>
    {/* the throw beneath — so a press is a real travel, not a colour change */}
    <div style={{ position: "absolute", left: 4, top: 56 * s, width: ww - 8,
      height: Math.max(2, 12 - press * 10), background: hexa("#000", 0.46), borderRadius: 2 }} />
  </div>
);

export const Console: React.FC<{ x: number; y: number; w: number; z?: number; f?: number;
  lit?: number; c?: string; children?: React.ReactNode }> =
  ({ x, y, w: ww, z = 40, f = 0, lit = 1, c = BRASS, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
    {/* the angled deck */}
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 44,
      background: `linear-gradient(180deg, ${mxh(c, 0.22)} 0%, ${dkh(c, -0.30)} 100%)`,
      borderRadius: "6px 6px 0 0", border: `3px solid ${hexa("#000", 0.34)}` }} />
    <div style={{ position: "absolute", left: 0, top: 40, width: ww, height: 250,
      background: `linear-gradient(180deg, ${dkh(c, -0.46)} 0%, ${dkh(c, -0.86)} 100%)`,
      border: `3px solid ${hexa("#000", 0.44)}` }} />
    {/* the recess under the deck — a console has a shadow line under its lip */}
    <div style={{ position: "absolute", left: 0, top: 40, width: ww, height: 22,
      background: `linear-gradient(180deg, ${hexa("#000", 0.62)} 0%, ${hexa("#000", 0)} 100%)` }} />
    {/* ribs, so the body is not one slab */}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"rb" + i} style={{ position: "absolute", left: 12, right: 12, top: 200 + i * 15,
        height: 5, borderRadius: 2, background: hexa("#000", 0.24) }} />
    ))}
    {/* the deck's own strip light */}
    <div style={{ position: "absolute", left: 14, top: 12, width: ww - 28, height: 8, borderRadius: 3,
      background: hexa(mxh(c, 0.6), 0.22 + lit * 0.5) }} />
    {children}
  </div>
);

/** ⭐ THE CHUTE — a HOLE, not a lit rectangle. Full height, square corners, and
    the light it throws lands on the floor in front of it. */
export const Chute: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  glow?: string; open?: number }> =
  ({ x, y, w: ww = 210, h: hh = 96, z = 44, glow = SODIUM, open = 1 }) => (<>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: "#07090C", border: `5px solid ${hexa("#000", 0.6)}` }} />
    <div style={{ position: "absolute", left: x + 5, top: y + 5, width: ww - 10, height: hh * 0.36,
      zIndex: z + 1, background: `linear-gradient(180deg, ${hexa(glow, 0.34 * open)} 0%, ${hexa(glow, 0)} 100%)` }} />
    {/* the lip you would actually knock a card against */}
    <div style={{ position: "absolute", left: x - 8, top: y + hh - 6, width: ww + 16, height: 14,
      zIndex: z + 2, borderRadius: 3, background: dkh(BRASS, -0.24) }} />
    {/* light on the floor in front — this is what makes it read as a hole */}
    <div style={{ position: "absolute", left: x - 40, top: y + hh + 8, width: ww + 80, height: 34,
      zIndex: z - 1, borderRadius: "50%",
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa(glow, 0.26 * open)} 0%, ${hexa(glow, 0)} 100%)` }} />
  </>);

/** the three-state mode strip — the REAL Claude Code status line */
export const ModeStrip: React.FC<{ x: number; y: number; w?: number; step: number; z?: number;
  s?: number }> = ({ x, y, w: ww = 470, step, z = 72, s = 1 }) => {
  const i = Math.max(0, Math.min(2, Math.round(step)));
  const on = i === 2;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, height: 62 * s, borderRadius: 6,
        background: on ? "#0D2731" : "#12161C",
        border: `3px solid ${on ? hexa("#8FE4F2", 0.7) : hexa("#000", 0.5)}` }} />
      <div style={{ position: "absolute", left: 18 * s, top: 0, height: 62 * s, display: "flex",
        alignItems: "center", gap: 12 * s }}>
        <div style={{ ...mono(Math.round(26 * s), 900), color: on ? "#8FE4F2" : "#5E6874" }}>
          {on ? "⏸" : "▸"}
        </div>
        <div style={{ ...mono(Math.round(24 * s), 800), color: on ? "#CFF4FA" : "#78828E",
          letterSpacing: "0.06em" }}>{R.modes[i]}</div>
      </div>
      {/* the three positions, so a cycle is visibly a cycle */}
      <div style={{ position: "absolute", right: 16 * s, top: 24 * s, display: "flex", gap: 7 * s }}>
        {[0, 1, 2].map(j => (
          <div key={j} style={{ width: 13 * s, height: 13 * s, borderRadius: "50%",
            background: j === i ? "#8FE4F2" : hexa("#FFF", 0.16) }} />
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   7 · THE ROUTE BOARD (rule 2's payoff — "it maps out your entire project").
   ⭐ N DISCRETE ARRIVALS, one segment per spoken word, and the gate at the end
   stays SHUT: the plan is complete and nothing has been written.
   ====================================================================== */
export const RouteBoard: React.FC<{ x: number; y: number; w: number; h?: number; f: number;
  /** 0..5 — how many segments have landed */
  seg: number; z?: number; gate?: number;
  /** ⭐ 0..1 — how much of each phase's SIZE has been written out. ⛔ The ticks
      used to appear whole with their station, so the board's top half went
      static the moment the run finished and `halves_audit` read T/B 0.32 — half
      the frame dead while motion, tail and pre-cut all passed, because all three
      average over the panel (ANIMATION-QUALITY §24). They now fill ONE AT A TIME
      across the whole shot, which is both the motion and the meaning: the plan is
      being written out, station by station, before anything is issued. */
  fill?: number }> =
  ({ x, y, w: ww, h: hh = 250, f, seg, z = 40, gate = 0, fill = 1 }) => {
  const n = 5, pad = 78;
  const stepX = (ww - pad * 2) / (n - 1);
  const RUNY = hh * 0.30;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* the board carcass, with a real frame and a title rail */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: "#0E1A2B",
        border: `6px solid ${dkh(STEEL, -0.5)}` }} />
      <div style={{ position: "absolute", left: 8, top: 8, right: 8, height: 34, borderRadius: 3,
        background: hexa("#8FE4F2", 0.10), borderBottom: `2px solid ${hexa("#8FE4F2", 0.24)}` }} />
      <div style={{ position: "absolute", left: 20, top: 14, ...mono(20, 800),
        color: hexa("#9FD8E4", 0.72), letterSpacing: "0.22em" }}>THE RUN</div>
      {/* the etched grid it is drawn on */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"gg" + i} style={{ position: "absolute", left: 14 + i * (ww - 28) / 8, top: 48,
          width: 2, bottom: 12, background: hexa("#8FE4F2", 0.07) }} />
      ))}

      {/* ⭐⭐ THE PLOTTER HEAD. ⛔ Filling the tick columns did NOT fix the board's
          dead top half (T/B 0.31) and the arithmetic says why: a 52x8 tick is
          12x2 after the audit's 1012->240 downsample — under the floor twice over,
          so five columns of them repaint ~0.5% of the panel and register as
          nothing to a metric OR an eye ([[a prop that measures small IS small]]).
          A board is a LATTICE and §25's answer to a static lattice is to make the
          LAYOUT the animation. This is the machine that draws the plan: a
          full-height head that travels the board's whole width, over and over,
          with the route appearing behind it. 60x392 at ~14px/frame repaints ~2%
          of the panel per sample at a high luma delta — the single biggest thing
          available in this half of the frame. */}
      {(() => {
        const px = ((f * 14) % (ww + 180)) - 90;
        return (<>
          <div style={{ position: "absolute", left: px - 34, top: 44, width: 68, bottom: 8,
            background: `linear-gradient(90deg, ${hexa("#8FE4F2", 0)} 0%, ${hexa("#8FE4F2", 0.16)} 50%, ${hexa("#8FE4F2", 0)} 100%)` }} />
          <div style={{ position: "absolute", left: px - 4, top: 44, width: 9, bottom: 8,
            background: hexa("#BFF0FA", 0.92) }} />
          {/* the carriage it rides on, and its rail */}
          <div style={{ position: "absolute", left: 10, top: 40, right: 10, height: 8,
            background: hexa("#8FE4F2", 0.22) }} />
          <div style={{ position: "absolute", left: px - 26, top: 30, width: 52, height: 26,
            borderRadius: 4, background: "#20323F", border: `3px solid ${hexa("#8FE4F2", 0.6)}` }} />
        </>);
      })()}

      {/* the run itself — the segments land one at a time */}
      {Array.from({ length: n - 1 }, (_, i) => {
        const k = Math.max(0, Math.min(1, seg - i));
        return (
          <div key={"sg" + i} style={{ position: "absolute", left: pad + i * stepX,
            top: RUNY - 6, width: stepX * k, height: 13, borderRadius: 2,
            background: `linear-gradient(90deg, ${hexa("#8FE4F2", 0.95)} 0%, ${hexa("#8FE4F2", 0.62)} 100%)` }} />
        );
      })}

      {/* ⭐ THE PHASE SIZES AS A LENGTH, NOT A NUMERAL. The number spine is the
          five real bank sizes (7 · 6 · 22 · 5 · 12) and a viewer reads a COLUMN
          OF TICKS faster than a figure — "a percentage is ten segments, four
          lit; it is never typeset" (ANIMATION-QUALITY §4). It also fills the
          board's lower half, which was empty grid. */}
      {PHASE.map((P, i) => {
        const on = seg >= i;
        const cx = pad + i * stepX;
        const rows = Math.min(9, P.n);
        return (
          <React.Fragment key={"st" + i}>
            {/* the station */}
            <div style={{ position: "absolute", left: cx - 30, top: RUNY - 30, width: 60, height: 60 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
                background: on ? P.c : "#17263A",
                border: `5px solid ${on ? hexa("#FFF", 0.30) : hexa("#000", 0.4)}`,
                transform: `scale(${on ? 1 + Math.max(0, 1 - (seg - i)) * 0.26 : 0.84})` }} />
            </div>
            <div style={{ position: "absolute", left: cx - 84, top: RUNY + 38, width: 168,
              textAlign: "center", ...mono(17, 800),
              color: on ? P.c : "#3E5068", letterSpacing: "0.06em" }}>{P.id}</div>
            {/* its size, drawn */}
            {Array.from({ length: rows }, (_, r) => {
              /* each column starts filling as its station lights and runs on a
                 stagger, so at any instant several columns are still growing */
              const lit = Math.max(0, Math.min(1, (fill * (rows + 3)) - i * 1.1 - r));
              return (
                <div key={"tk" + r} style={{ position: "absolute", left: cx - 38,
                  top: RUNY + 68 + r * 15, width: 76 * (0.22 + lit * 0.78), height: 11,
                  borderRadius: 2,
                  background: hexa(P.c, on ? 0.10 + lit * (0.30 + (r / rows) * 0.5) : 0.06) }} />
              );
            })}
            {P.n > 9 && on && (
              <div style={{ position: "absolute", left: cx - 26, top: RUNY + 68 + rows * 15 + 6,
                width: 76, textAlign: "center", ...mono(17, 900), color: P.c }}>+{P.n - 9}</div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** ⭐ THE GATE. ⛔ A BARRIER YOU CAN WALK ROUND DOES NOT READ AS "STOPPED"
    (ANIMATION-QUALITY §20): the first version was a 42px vertical bar with six
    rungs on it and it read as a LADDER. A gate has to fill everything past its
    near face — full height from the floor to the overhead, hazard-striped, with
    a stop lamp and a latch that stays shut. */
export const Gate: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  open?: number; f?: number }> =
  ({ x, y, w: ww = 150, h: hh = 420, z = 78, open = 0, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y - hh, width: ww, height: hh, zIndex: z }}>
    {/* the frame posts */}
    <div style={{ position: "absolute", left: 0, top: -18, width: 26, height: hh + 18,
      background: dkh(STEEL, -0.42), border: `3px solid ${hexa("#000", 0.5)}` }} />
    <div style={{ position: "absolute", right: 0, top: -18, width: 26, height: hh + 18,
      background: dkh(STEEL, -0.42), border: `3px solid ${hexa("#000", 0.5)}` }} />
    {/* the leaf — hazard stripes, and it fills the whole opening */}
    <div style={{ position: "absolute", left: 22, top: -open * hh * 0.9, width: ww - 44,
      height: hh, overflow: "hidden", border: `4px solid ${hexa("#000", 0.5)}`,
      background: `repeating-linear-gradient(48deg, ${dkh(EMBER, -0.08)} 0 26px, #201812 26px 52px)` }} />
    {/* the rail across its middle, and the latch that stays shut */}
    <div style={{ position: "absolute", left: 14, top: hh * 0.44 - open * hh * 0.9,
      width: ww - 28, height: 20, background: dkh(STEEL, -0.22),
      border: `3px solid ${hexa("#000", 0.5)}` }} />
    <div style={{ position: "absolute", left: ww / 2 - 20, top: hh * 0.44 + 22 - open * hh * 0.9,
      width: 40, height: 34, borderRadius: 4, background: open > 0.5 ? GREEN : "#A8331E",
      border: `4px solid ${hexa("#000", 0.5)}` }} />
    {/* the stop lamp on the post */}
    <div style={{ position: "absolute", left: ww / 2 - 22, top: -60, width: 44, height: 44,
      borderRadius: "50%", background: open > 0.5 ? GREEN : "#C4402A",
      border: `5px solid ${dkh(STEEL, -0.5)}`,
      opacity: 0.65 + 0.35 * Math.abs(Math.sin(f / 9)) }} />
  </div>
);

/* =========================================================================
   8 · THE SETUP PLATE (rule 3). ⛔ IT IS BOLTED ON, NOT STAMPED — this reel has
   no press. Four bolts drive in one at a time, ascending.
   ====================================================================== */
export const SetupPlate: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  bolts?: number; f?: number; rockAmt?: number; strips?: number }> =
  ({ x, y, w: ww = 430, h: hh = 200, z = 64, bolts = 0, f = 0, rockAmt = 0, strips = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    transform: `rotate(${rockAmt}deg)`, transformOrigin: "50% 100%" }}>
    {/* the cast body */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 5,
      background: `linear-gradient(166deg, ${mxh(COPPER, 0.24)} 0%, ${COPPER} 40%, ${dkh(COPPER, -0.38)} 100%)`,
      border: `4px solid ${hexa("#000", 0.42)}`, boxShadow: SH_D }} />
    {/* the machined recess the type sits in */}
    <div style={{ position: "absolute", left: 16, top: 16, right: 16, bottom: 54, borderRadius: 3,
      background: hexa("#1A120A", 0.30), borderTop: `3px solid ${hexa("#000", 0.34)}`,
      borderLeft: `3px solid ${hexa("#000", 0.28)}` }} />
    {/* THE FILE NAME, at the size a nameplate actually is */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center",
      ...mono(46, 900), color: "#FBF3E2", letterSpacing: "0.02em" }}>{R.mdFile}</div>
    {/* the real paths, at the 17px a model number is */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 100, textAlign: "center",
      ...mono(17, 700), color: hexa("#F0E2C6", 0.72) }}>{R.mdPaths}</div>
    {/* the three tabbed strips it hands over at S8 */}
    {R.mdHolds.map((t, i) => {
      const k = Math.max(0, Math.min(1, strips - i));
      return (
        <div key={"sp" + i} style={{ position: "absolute", left: 26 + i * (ww - 52) / 3,
          top: hh - 46 - k * 26, width: (ww - 52) / 3 - 12, height: 32, borderRadius: 3,
          background: [SKY, TEAL, GREEN][i], opacity: 0.30 + k * 0.7,
          display: "flex", alignItems: "center", justifyContent: "center",
          ...mono(15, 900), color: "#14181C", letterSpacing: "0.06em" }}>{t}</div>
      );
    })}
    {/* THE FOUR BOLTS — each one a real driven fastener, not a dot */}
    {[[18, 16], [ww - 46, 16], [18, hh - 44], [ww - 46, hh - 44]].map((pt, i) => {
      const k = Math.max(0, Math.min(1, bolts - i));
      return (
        <div key={"bt" + i} style={{ position: "absolute", left: pt[0], top: pt[1] - (1 - k) * 30,
          width: 28, height: 28, opacity: 0.25 + k * 0.75 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
            background: `linear-gradient(150deg, ${mxh(STEEL, 0.4)} 0%, ${dkh(STEEL, -0.4)} 100%)`,
            border: `2px solid ${hexa("#000", 0.44)}` }} />
          <div style={{ position: "absolute", left: 6, top: 12, width: 16, height: 4, borderRadius: 1,
            background: hexa("#000", 0.5), transform: `rotate(${i * 34 + k * 90}deg)` }} />
        </div>
      );
    })}
  </div>
);

/* =========================================================================
   9 · THE STOCK HATCH — where Anthropic's own crew load the wall (S2).
   ====================================================================== */
export const StockHatch: React.FC<{ x: number; y: number; w?: number; h?: number; open: number;
  z?: number; f?: number }> =
  ({ x, y, w: ww = 380, h: hh = 300, open, z = 34, f = 0 }) => (<>
    {/* THE HOLE — the room stops at it */}
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: "#060809", border: `6px solid ${hexa("#000", 0.55)}` }} />
    {/* what is behind it, lit */}
    <div style={{ position: "absolute", left: x + 6, top: y + 6, width: ww - 12, height: hh - 12,
      zIndex: z + 1, opacity: open,
      background: `linear-gradient(180deg, ${hexa(GREEN, 0.30)} 0%, ${hexa("#0B140F", 0.9)} 100%)` }} />
    {/* the racking visible inside */}
    {open > 0.2 && Array.from({ length: 4 }, (_, i) => (
      <div key={"hr" + i} style={{ position: "absolute", left: x + 22, top: y + 30 + i * 62,
        width: ww - 44, height: 12, zIndex: z + 2, borderRadius: 2,
        background: hexa(mxh(GREEN, 0.4), 0.30 + open * 0.4) }} />
    ))}
    {/* the roller door, rising */}
    <div style={{ position: "absolute", left: x - 4, top: y - 4, width: ww + 8,
      height: (hh + 8) * (1 - open), zIndex: z + 6, overflow: "hidden",
      background: `repeating-linear-gradient(180deg, ${dkh(STEEL, -0.24)} 0 20px, ${dkh(STEEL, -0.5)} 20px 24px)`,
      borderBottom: `6px solid ${dkh(BRASS, -0.2)}` }} />
    {/* light thrown on the floor once it is up */}
    <div style={{ position: "absolute", left: x - 60, top: y + hh - 12, width: ww + 120, height: 46,
      zIndex: z - 1, borderRadius: "50%", opacity: open,
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa(GREEN, 0.24)} 0%, ${hexa(GREEN, 0)} 100%)` }} />
  </>);

/** a loaded stock tray — what comes through the hatch */
export const Tray: React.FC<{ x: number; y: number; s?: number; z?: number; ph: number;
  rot?: number; n?: number }> =
  ({ x, y, s = 1, z = 60, ph, rot = 0, n = 9 }) => {
  const P = PHASE[((ph % 5) + 5) % 5];
  const TW = 250 * s, TH = 92 * s;
  return (
    <div style={{ position: "absolute", left: x - TW / 2, top: y - TH, width: TW, height: TH,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the tray body */}
      <div style={{ position: "absolute", left: 0, top: TH * 0.42, width: TW, height: TH * 0.58,
        borderRadius: 4, background: `linear-gradient(180deg, ${DRWL} 0%, ${DRWD} 100%)`,
        border: `3px solid ${hexa("#000", 0.42)}` }} />
      {/* the tab strip along its front */}
      <div style={{ position: "absolute", left: 10 * s, top: TH * 0.62, width: TW - 20 * s,
        height: 12 * s, borderRadius: 2, background: P.c }} />
      {/* the cards standing in it — real edges, uneven heights */}
      {Array.from({ length: n }, (_, i) => (
        <div key={"tc" + i} style={{ position: "absolute",
          left: 12 * s + i * ((TW - 24 * s) / n), top: TH * 0.42 - (30 + rnd(i, 61) * 14) * s,
          width: ((TW - 24 * s) / n) - 3 * s, height: (32 + rnd(i, 61) * 14) * s, borderRadius: 2,
          background: i % 4 === 0 ? "#F4F0E4" : BLANKD,
          borderTop: `${3 * s}px solid ${P.c}` }} />
      ))}
      {/* the handle */}
      <div style={{ position: "absolute", left: TW * 0.36, top: TH * 0.44, width: TW * 0.28,
        height: 9 * s, borderRadius: 3, background: dkh(BRASS, -0.16) }} />
    </div>
  );
};

/* =========================================================================
   10 · THE WRITING DESK — the bench, the hook's "before" (S0a, S4).

   ⛔⛔⛔ THIS REPLACED A LEVER CUTTER, AND THE REASON GENERALISES: A THIRD NOTE
   MEANS THE OBJECT ([[feedback_three_notes_means_the_object]]). Two rounds went
   into making a guillotine read — the arm pivoted off its own block, then it
   swung the wrong way, then it was too long and crossed the hero's face — and
   the real defect was that a guillotine is not what this line is about. **A
   PROMPT IS WRITTEN.** A Claude filling out a card by hand, spiking it, and
   pulling a fresh blank is legible in under a second with no narration, it is
   the literal noun in the VO ("re-prompting"), and it costs a quarter of the
   frame instead of half.

   ⭐ THE PARTS A VIEWER USES TO IDENTIFY THIS CATEGORY, all drawn: an angled
   desk top with a pen groove · a card clipped under a bar · ruled lines that
   FILL as he writes · an inkwell with a nib in it · a blotter · a blank tray ·
   a lamp on a bracket · a paper knife. Hue does none of the work.
   ====================================================================== */
export const WritingDesk: React.FC<{ x: number; y: number; s?: number; z?: number;
  /** 0..1 — how far across the card this stroke has got */
  ink: number; f?: number; lines?: number }> =
  ({ x, y, s = 1, z = 56, ink, f = 0, lines = 4 }) => {
  const W0 = 330 * s, H0 = 34 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* 1 the sloped desk top */}
      <div style={{ position: "absolute", left: -W0 / 2, top: -H0, width: W0, height: H0,
        background: `linear-gradient(180deg, ${mxh("#6E5A3C", 0.42)} 0%, ${dkh("#6E5A3C", -0.20)} 100%)`,
        borderRadius: 3, border: `3px solid ${hexa("#000", 0.38)}` }} />
      {/* 2 the pen groove along its top edge */}
      <div style={{ position: "absolute", left: -W0 / 2 + 14 * s, top: -H0 + 5 * s,
        width: W0 - 28 * s, height: 7 * s, borderRadius: 4, background: hexa("#000", 0.30) }} />
      {/* 3 the blotter */}
      <div style={{ position: "absolute", left: -W0 / 2 + 10 * s, top: -H0 - 8 * s,
        width: W0 * 0.42, height: 12 * s, borderRadius: 2, background: "#4A3A5C" }} />

      {/* 4 THE CARD IN THE CLIP — the thing he is filling in */}
      <div style={{ position: "absolute", left: -116 * s, top: -H0 - 112 * s, width: 208 * s,
        height: 110 * s, borderRadius: 3, background: BLANK, boxShadow: SH,
        border: `3px solid ${hexa("#000", 0.26)}`, transform: `rotate(-4deg)` }}>
        {/* 5 ruled lines that FILL as the stroke crosses */}
        {Array.from({ length: lines }, (_, i) => {
          const k = Math.max(0, Math.min(1, ink * lines - i));
          return (
            <React.Fragment key={"ln" + i}>
              <div style={{ position: "absolute", left: 14 * s, top: (24 + i * 21) * s,
                width: 180 * s, height: 2 * s, background: hexa("#B9302A", 0.34) }} />
              <div style={{ position: "absolute", left: 14 * s, top: (18 + i * 21) * s,
                width: 180 * s * k * (0.55 + rnd(i, 51) * 0.42), height: 6 * s, borderRadius: 2,
                background: hexa("#20242A", 0.82) }} />
            </React.Fragment>
          );
        })}
        {/* 6 the clip bar across the head */}
        <div style={{ position: "absolute", left: 38 * s, top: -9 * s, width: 132 * s,
          height: 16 * s, borderRadius: 3,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)} 0%, ${dkh(STEEL, -0.4)} 100%)` }} />
      </div>

      {/* 7 THE PEN — its NIB sits ON the ruled line the stroke is filling, and
             it travels left to right with `ink`. ⛔ The first build hung the pen
             off the desk top with its nib 60px BELOW the card, so the one object
             the eye follows was not touching the thing it was writing on. */}
      {(() => {
        const px = (-96 + ink * 176) * s, py = -H0 - 62 * s;
        return (<>
          <div style={{ position: "absolute", left: px, top: py - 86 * s, width: 11 * s,
            height: 86 * s, zIndex: 6, transformOrigin: "50% 100%",
            transform: `rotate(${24 + Math.sin(f / 3) * 2.2}deg)`,
            background: `linear-gradient(180deg, ${dkh(BRASS, -0.05)} 0%, #2A2620 34%, #16130F 100%)`,
            borderRadius: `${6 * s}px ${6 * s}px 2px 2px` }} />
          <div style={{ position: "absolute", left: px + 1 * s, top: py - 8 * s, width: 9 * s,
            height: 14 * s, zIndex: 7, background: "#C8CED4",
            clipPath: "polygon(50% 100%, 100% 0, 0 0)" }} />
        </>);
      })()}

      {/* 9 the inkwell, with a second nib standing in it */}
      <div style={{ position: "absolute", left: 122 * s, top: -H0 - 40 * s, width: 46 * s,
        height: 40 * s, borderRadius: `${6 * s}px ${6 * s}px ${10 * s}px ${10 * s}px`,
        background: `linear-gradient(160deg, ${mxh("#2A3440", 0.3)} 0%, #171E26 100%)`,
        border: `3px solid ${hexa("#000", 0.4)}` }} />
      <div style={{ position: "absolute", left: 130 * s, top: -H0 - 34 * s, width: 30 * s,
        height: 9 * s, borderRadius: "50%", background: "#0C1A2A" }} />
      <div style={{ position: "absolute", left: 140 * s, top: -H0 - 86 * s, width: 9 * s,
        height: 56 * s, background: "#2A2620", transform: "rotate(12deg)" }} />

      {/* 10 the blank tray, and the blanks in it */}
      <div style={{ position: "absolute", left: -W0 / 2 - 74 * s, top: -H0 - 34 * s, width: 84 * s,
        height: 36 * s, borderRadius: 3, background: dkh(STEEL, -0.52),
        border: `3px solid ${hexa("#000", 0.42)}` }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"bt" + i} style={{ position: "absolute", left: -W0 / 2 - 68 * s,
          top: -H0 - 40 * s - i * 5 * s, width: 72 * s, height: 6 * s, borderRadius: 1,
          background: i % 2 ? BLANK : BLANKD }} />
      ))}

      {/* 11 the paper knife */}
      <div style={{ position: "absolute", left: 40 * s, top: -H0 - 14 * s, width: 118 * s,
        height: 8 * s, borderRadius: 2, transform: "rotate(-7deg)",
        background: `linear-gradient(90deg, ${dkh(BRASS, -0.2)} 0%, #C9D2D8 34%, #E4EAEE 100%)` }} />
    </div>
  );
};

/* =========================================================================
   10b · THE LEVER CUTTER — kept for the stock-cutting beat at the back of the
   bench, at a size where it is furniture rather than the subject.
   ====================================================================== */
export const LeverCutter: React.FC<{ x: number; y: number; s?: number; z?: number;
  /** 0 = arm up, 1 = through the stock */
  cut: number; f?: number }> =
  ({ x, y, s = 1, z = 56, cut, f = 0 }) => {
  /* ⛔⛔ THE SIGN. CSS `rotate(θ)` maps (x,y) → (x cosθ − y sinθ, x sinθ + y cosθ),
     so on an arm whose free end points LEFT of its pivot, a NEGATIVE angle
     drives it DOWN. The first build used -68° for "arm up" and rendered a thin
     diagonal disappearing off the bottom right — the whole cutter read as a
     ruler with a stick behind it. Positive lifts. */
  const arm = 62 - cut * 66;                        /* +62° = raised, −4° = through */
  const bend = Math.sin(Math.min(1, cut) * Math.PI) * 4;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the bed */}
      <div style={{ position: "absolute", left: -150 * s, top: -22 * s, width: 300 * s,
        height: 26 * s, borderRadius: 3,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, -0.44)} 100%)`,
        border: `3px solid ${hexa("#000", 0.4)}` }} />
      {/* the back fence */}
      <div style={{ position: "absolute", left: -150 * s, top: -46 * s, width: 300 * s,
        height: 26 * s, background: dkh(STEEL, -0.56) }} />
      {/* the ruled scale on the bed */}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: (-142 + i * 28) * s, top: -20 * s,
          width: 2 * s, height: (i % 5 === 0 ? 12 : 7) * s, background: hexa("#0A0C0E", 0.6) }} />
      ))}
      {/* the pivot block, at the RIGHT end of the bed */}
      <div style={{ position: "absolute", left: 126 * s, top: -76 * s, width: 46 * s, height: 62 * s,
        borderRadius: 4, background: dkh(STEEL, -0.32), border: `3px solid ${hexa("#000", 0.44)}` }} />
      <div style={{ position: "absolute", left: 140 * s, top: -56 * s, width: 18 * s, height: 18 * s,
        borderRadius: "50%", background: dkh(BRASS, -0.14), border: `3px solid ${hexa("#000", 0.5)}` }} />
      {/* ⛔ THE ARM PIVOTS ON THE BLOCK, NOT 240px TO THE RIGHT OF IT. The first
          build put its `transformOrigin: 100% 50%` at x=378 while the pivot
          block sat at x=140, so at rest the arm hung off the right of the bed
          and at full lift it swung clear out of frame — the whole cutter read as
          a ruler with a stick behind it. The origin now IS the pin.
          ⭐ WEIGHT IS DEFORMATION: the arm bends through the stroke. */}
      <div style={{ position: "absolute", left: -101 * s, top: -56 * s, width: 250 * s, height: 20 * s,
        transformOrigin: "100% 50%", transform: `rotate(${arm}deg) skewY(${bend}deg)`,
        background: `linear-gradient(180deg, ${mxh(EMBER, 0.24)} 0%, ${dkh(EMBER, -0.42)} 100%)`,
        borderRadius: 4, border: `3px solid ${hexa("#000", 0.4)}` }}>
        {/* the grip, at the free end */}
        <div style={{ position: "absolute", left: -20 * s, top: -11 * s, width: 40 * s, height: 42 * s,
          borderRadius: 8, background: "#241C16", border: `3px solid ${hexa("#000", 0.4)}` }} />
        {/* the blade under the arm — the thing that actually cuts */}
        <div style={{ position: "absolute", left: 26 * s, top: 17 * s, width: 206 * s, height: 10 * s,
          background: `linear-gradient(180deg, #D3DBE0 0%, ${dkh(STEEL, -0.3)} 100%)` }} />
      </div>
      {/* the stock waiting under it */}
      <div style={{ position: "absolute", left: -96 * s, top: -34 * s, width: 120 * s, height: 13 * s,
        borderRadius: 2, background: BLANK, border: `2px solid ${hexa("#000", 0.22)}` }} />
      {/* the offcut bin */}
      <div style={{ position: "absolute", left: -160 * s, top: 4 * s, width: 76 * s, height: 44 * s,
        borderRadius: 3, background: dkh(STEEL, -0.58), border: `3px solid ${hexa("#000", 0.4)}` }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"of" + i} style={{ position: "absolute", left: (-154 + rnd(i, 81) * 50) * s,
          top: (2 + rnd(i, 82) * 8) * s, width: 30 * s, height: 7 * s, borderRadius: 2,
          background: BLANKD, transform: `rotate(${rnd(i, 83) * 40 - 20}deg)` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   11 · THE PICKING RAIL — the hall's background process, and at S9 the thing
   that carries the whole payoff. ⭐ FULL-WIDTH, HIGH-CONTRAST, TRAVELLING:
   §1's biggest single per-scene lever, mounted as something the room contains.
   ====================================================================== */
export const PickRail: React.FC<{ y: number; f: number; z?: number; rate?: number;
  pitch?: number; run?: number; s?: number }> =
  ({ y, f, z = 52, rate = 6.4, pitch = 190, run = 1, s = 1 }) => {
  const span = pitch * Math.ceil((W + pitch * 2) / pitch);
  const n = Math.ceil(span / pitch);
  return (<>
    {/* the beam */}
    <div style={{ position: "absolute", left: -40, top: y - 22, width: W + 80, height: 16, zIndex: z,
      background: `linear-gradient(180deg, ${dkh(STEEL, -0.2)} 0%, ${dkh(STEEL, -0.62)} 100%)` }} />
    {Array.from({ length: n }, (_, i) => {
      const x = ((i * pitch - f * rate * run) % span + span) % span - pitch;
      const dk = i % 2 === 1;
      const sway = Math.sin(f / 13 + i * 1.3) * 2.6 * run;
      const P = PHASE[i % 5];
      return (
        <div key={"pk" + i} style={{ position: "absolute", left: x, top: y - 6, zIndex: z + 1,
          transform: `rotate(${sway}deg)`, transformOrigin: "50% -10px" }}>
          {/* the hanger */}
          <div style={{ position: "absolute", left: 62 * s, top: -12, width: 7, height: 20,
            background: dkh(STEEL, -0.4) }} />
          {/* the carrier — >= 48px on its short side, alternating light/shadow */}
          <div style={{ position: "absolute", left: 0, top: 8, width: 132 * s, height: 84 * s,
            borderRadius: 4, border: `4px solid ${hexa("#000", 0.46)}`,
            background: dk
              ? `linear-gradient(168deg, ${dkh(DRW, -0.30)} 0%, ${DRWD} 100%)`
              : `linear-gradient(168deg, ${mxh(HALLSTEEL, 0.22)} 0%, ${dkh(HALLSTEEL, -0.24)} 100%)` }}>
            <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: 60 * s,
              height: 12 * s, borderRadius: 2, background: P.c }} />
            {/* card edges inside the carrier */}
            <div style={{ position: "absolute", left: 10 * s, top: 32 * s, right: 10 * s,
              bottom: 10 * s, borderRadius: 2,
              background: `repeating-linear-gradient(90deg, ${dk ? BLANKD : "#F4F0E4"} 0 5px, ${hexa("#000", 0.3)} 5px 8px)` }} />
          </div>
        </div>
      );
    })}
  </>);
};

/* =========================================================================
   10c · THE TYPEWRITER — the load, third attempt, and the reason it is this.

   ⛔⛔ A THIRD NOTE MEANS THE OBJECT ([[feedback_three_notes_means_the_object]]).
   The load has now been a PILE OF BLANK CARDS (*"is there something more
   interesting than those papers"*) and a MONUMENTAL PROMPT CARD (*"still isn't
   interesting, I don't know what I'm looking at"*). Two notes on the same thing
   are staging; the third is the object itself.

   ⭐⭐⭐ AND THE FIX IS §15's, NOT MORE CRAFT: *"at half a second on a phone a
   viewer RECOGNISES A MARK; they do not decode a silhouette."* Reel 115 drew
   five careful hand-made objects — a pass book, a cord coil, a grabber claw —
   and was told they had to be things people RECOGNISE. A card at architectural
   scale is a beautifully drawn rectangle, and a rectangle is what "I don't know
   what I'm looking at" means.

   ⭐ A TYPEWRITER IS THE MOST RECOGNISABLE OBJECT IN ENGLISH FOR *"writing this
   out by hand, the slow way."* No decoding, no label, and it is on-subject
   rather than a metaphor: the paper in its platen is the half-written prompt.

   ⛔ CATEGORY IS COMMUNICATED BY STRUCTURE, NOT HUE (ANIMATION-QUALITY §11), so
   the six features a viewer actually identifies one BY are all drawn:
     the CARRIAGE across the top with a PLATEN and paper standing out of it ·
     the TIERED KEY BANK, four curved rows of round keys on stalks ·
     the TYPE BASKET, a fan of typebars rising out of the middle ·
     the RETURN LEVER on the carriage's left ·
     the two RIBBON SPOOLS ·
     a heavy cast body with a maker's plate.
   ⛔ AND IT KEEPS AIR ON BOTH SIDES. A barbell at 97% of panel width has no
   silhouette (§10); this is 540 of 1012, so the shape can actually form.
   ====================================================================== */
export const Typewriter: React.FC<{ x: number; y: number; s?: number; z?: number;
  /** 0..1 — how much of the prompt is typed onto the sheet in the platen */
  ink?: number; f?: number; strain?: number }> =
  ({ x, y, s = 1, z = 56, ink = 0.55, f = 0, strain = 0 }) => {
  const W0 = 540 * s, H0 = 300 * s;
  const CAST = "#2E3238", CASTL = "#4A5058";
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0 - 190 * s,
      width: W0, height: H0 + 190 * s, zIndex: z }}>
      {/* 1 · THE SHEET standing out of the platen — the half-written prompt */}
      <div style={{ position: "absolute", left: W0 * 0.24, top: 0, width: W0 * 0.58,
        height: 330 * s, borderRadius: 3, background: "#F8F4E8", boxShadow: SH,
        border: `${3 * s}px solid ${hexa("#000", 0.24)}`,
        transform: `rotate(${-2 + strain * 1.6}deg)` }}>
        <div style={{ position: "absolute", left: 20 * s, top: 20 * s, width: W0 * 0.26,
          height: 17 * s, borderRadius: 2, background: PHASE[2].c }} />
        {Array.from({ length: 11 }, (_, i) => {
          const k = Math.max(0, Math.min(1, ink * 11 - i));
          return (
            <div key={"ln" + i} style={{ position: "absolute", left: 20 * s,
              top: (58 + i * 24) * s, width: (W0 * 0.48) * k * (0.55 + rnd(i, 41) * 0.42),
              height: 8 * s, borderRadius: 2, background: hexa("#20242A", 0.84) }} />
          );
        })}
        {/* the two fill-in slots — even at this scale it is a PROMPT card */}
        {[0, 1].map(i => (
          <div key={"sl" + i} style={{ position: "absolute", left: 20 * s,
            top: (206 + i * 46) * s, width: W0 * (i ? 0.32 : 0.46), height: 30 * s,
            borderRadius: 3, background: hexa("#0C0E10", 0.10),
            border: `${2 * s}px solid ${hexa("#B9302A", 0.55)}` }} />
        ))}
      </div>
      {/* 2 · THE PLATEN — the roller the sheet comes out of */}
      <div style={{ position: "absolute", left: W0 * 0.16, top: 168 * s, width: W0 * 0.70,
        height: 40 * s, borderRadius: 20 * s,
        background: `linear-gradient(180deg, ${mxh(CAST, 0.36)} 0%, ${CAST} 52%, #14171A 100%)`,
        border: `${3 * s}px solid ${hexa("#000", 0.44)}` }} />
      {/* 3 · THE CARRIAGE it rides in, with its rail and end knobs */}
      <div style={{ position: "absolute", left: W0 * 0.10, top: 204 * s, width: W0 * 0.82,
        height: 30 * s, borderRadius: 4, background: `linear-gradient(180deg, ${CASTL} 0%, ${CAST} 100%)`,
        border: `${3 * s}px solid ${hexa("#000", 0.44)}` }} />
      {[W0 * 0.06, W0 * 0.90].map((kx, i) => (
        <div key={"kn" + i} style={{ position: "absolute", left: kx, top: 166 * s,
          width: 46 * s, height: 46 * s, borderRadius: "50%",
          background: `linear-gradient(150deg, ${mxh(CASTL, 0.3)} 0%, ${CAST} 100%)`,
          border: `${3 * s}px solid ${hexa("#000", 0.46)}` }} />
      ))}
      {/* 4 · THE RETURN LEVER — the tell nothing else has */}
      <div style={{ position: "absolute", left: -6 * s, top: 150 * s, width: 108 * s,
        height: 12 * s, borderRadius: 6, transform: "rotate(-24deg)", transformOrigin: "100% 50%",
        background: `linear-gradient(180deg, ${mxh(CASTL, 0.3)} 0%, ${CAST} 100%)` }} />

      {/* 5 · THE BODY — heavy cast, sloping to the keys */}
      <div style={{ position: "absolute", left: 0, top: 228 * s, width: W0, height: 148 * s,
        borderRadius: `${10 * s}px ${10 * s}px ${6 * s}px ${6 * s}px`,
        background: `linear-gradient(178deg, ${mxh(CAST, 0.30)} 0%, ${CAST} 44%, #12151A 100%)`,
        border: `${4 * s}px solid ${hexa("#000", 0.46)}` }} />
      {/* 6 · THE TYPE BASKET — the fan of bars, the thing that makes it a typewriter */}
      {Array.from({ length: 13 }, (_, i) => {
        const a0 = -46 + i * 7.6;
        return (
          <div key={"tb" + i} style={{ position: "absolute", left: W0 / 2 - 4 * s, top: 214 * s,
            width: 8 * s, height: 66 * s, borderRadius: 3, transformOrigin: "50% 100%",
            transform: `rotate(${a0}deg)`, zIndex: 3,
            background: `linear-gradient(180deg, #B9C2C8 0%, ${CAST} 100%)` }} />
        );
      })}
      {/* 7 · THE RIBBON SPOOLS */}
      {[W0 * 0.16, W0 * 0.74].map((sx, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: sx, top: 238 * s,
          width: 62 * s, height: 62 * s, borderRadius: "50%", zIndex: 4,
          background: `radial-gradient(50% 50% at 50% 50%, ${CAST} 0%, ${dkh(EMBER, -0.2)} 46%, ${CAST} 100%)`,
          border: `${4 * s}px solid ${hexa("#000", 0.5)}` }} />
      ))}
      {/* 8 · THE KEY BANK — four curved rows of round keys on stalks */}
      {Array.from({ length: 4 }, (_, r) => (
        Array.from({ length: 11 - (r % 2) }, (_, c) => {
          const n = 11 - (r % 2);
          const cx = W0 * 0.09 + (c + (r % 2) * 0.5) * (W0 * 0.82 / 11);
          const dip = Math.abs(c - (n - 1) / 2) / ((n - 1) / 2);
          const cy = (312 + r * 24) * s - dip * 12 * s;
          return (
            <React.Fragment key={`k${r}-${c}`}>
              <div style={{ position: "absolute", left: cx + 12 * s, top: cy + 8 * s,
                width: 6 * s, height: 18 * s, zIndex: 5, background: "#0E1114" }} />
              <div style={{ position: "absolute", left: cx, top: cy, width: 30 * s, height: 30 * s,
                borderRadius: "50%", zIndex: 6,
                background: `linear-gradient(160deg, #F2ECDC 0%, #BDB5A4 62%, #8A8478 100%)`,
                border: `${3 * s}px solid ${hexa("#000", 0.5)}` }} />
            </React.Fragment>
          );
        })
      ))}
      {/* 9 · the spacebar, and the maker's plate where a real one carries its name */}
      <div style={{ position: "absolute", left: W0 * 0.22, top: 414 * s, width: W0 * 0.56,
        height: 24 * s, borderRadius: 12 * s, zIndex: 6,
        background: `linear-gradient(180deg, #EDE7D6 0%, #9A9384 100%)`,
        border: `${3 * s}px solid ${hexa("#000", 0.5)}` }} />
      <div style={{ position: "absolute", left: W0 * 0.36, top: 252 * s, width: W0 * 0.28,
        height: 26 * s, borderRadius: 3, zIndex: 7, background: dkh(BRASS, -0.24),
        display: "flex", alignItems: "center", justifyContent: "center",
        ...mono(Math.round(15 * s), 800), color: "#F2E4C2", letterSpacing: "0.18em" }}>BY HAND</div>
    </div>
  );
};

/* =========================================================================
   10d · THE THREE LOADS.

   ⛔⛔⛔ FOURTH NOTE ON THIS OBJECT. It has been a pile of blank cards, a
   monumental prompt card, and a typewriter, and the note has not changed.
   ⭐ THE AXIS IS THE ONE §15 NAMES — *"at half a second on a phone a viewer
   RECOGNISES A MARK; they do not decode a silhouette"* — plus one thing the
   typewriter missed: **DRAGGING IT HAS TO BE THE NATURAL VERB.** Nobody drags a
   typewriter, so the action had no logic and the shot read as a puzzle. All
   three below are objects a body plausibly hauls, and all three name themselves
   from outline alone at thumbnail size.
   ====================================================================== */

/** ⭐ A · THE CARD-INDEX DRAWER — a library's own object.
    ⛔⛔ THE NOTE THAT PRODUCED THIS: *"these don't really represent PROMPT
    LIBRARY that well."* A pencil says *by hand*, a boulder says *pointless
    labour*, a ball and chain says *shackled* — all three passed recognition and
    the verb test and NONE of them named the subject. A hook object has to clear
    three bars, not two: name it in two words · does a body really do that to it ·
    ⭐ **is it the thing the reel is about.**
    This one is a catalogue drawer ripped out and dragged on the floor, packed
    with prompt cards. Its identifying feature is the BRASS ROD through the
    cards — that single detail is what separates a card-index drawer from any
    other box, and the wall he is dragging it past is eighty of the same drawer. */
export const LoadCardDrawer: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; strain?: number; ink?: number }> =
  ({ x, y, s = 1, z = 56, f = 0, strain = 0, ink = 0.6 }) => {
  const W = 500 * s, H = 236 * s, DP = 88 * s;   /* DP = the open mouth's depth */
  return (
    <div style={{ position: "absolute", left: x, top: y - H - DP - 96 * s, width: W + DP,
      height: H + DP + 96 * s, zIndex: z,
      transform: `rotate(${-2 + strain * 1.3}deg)`, transformOrigin: "60% 100%" }}>
      {/* ⭐⭐ THE OPEN MOUTH. v1 drew the front face only, so the BRASS ROD — the
             one detail that separates a card index from any other box — was
             behind it and invisible. A drawer you cannot see into is a box. */}
      <div style={{ position: "absolute", left: 0, top: 96 * s, width: W + DP, height: DP + 8 * s,
        background: `linear-gradient(180deg, ${mxh(DRWD, 0.16)} 0%, ${dkh(DRWD, -0.36)} 100%)`,
        clipPath: `polygon(0 100%, ${(DP / (W + DP)) * 100}% 0, 100% 0, ${(1 - DP / (W + DP)) * 100}% 100%)` }} />
      {/* the card block, standing in the mouth */}
      <div style={{ position: "absolute", left: 22 * s, top: 0, width: W - 30 * s,
        height: 150 * s + DP }}>
        {Array.from({ length: 32 }, (_, i) => {
          const lean = (rnd(i, 71) - 0.5) * 6, up = rnd(i, 72), guide = i % 6 === 2;
          const P = PHASE[(i * 2) % 5];
          return (
            <div key={"cd" + i} style={{ position: "absolute",
              left: i * 14.5 * s + (1 - i / 32) * DP * 0.9,
              top: (16 + up * 26 - (guide ? 20 : 0)) * s + (i / 32) * DP * 0.5,
              width: 16 * s, height: (128 + up * 16 + (guide ? 22 : 0)) * s,
              transform: `rotate(${lean}deg)`, transformOrigin: "50% 100%",
              background: guide ? "#E6D9B4" : i % 7 === 3 ? BLANKD : BLANK,
              borderRight: `1px solid ${hexa("#8A8172", 0.66)}` }}>
              {/* ⭐ the GUIDE-CARD tabs stand proud of the rank — a card index is
                  read from its stagger, not from its box */}
              {guide && (
                <div style={{ position: "absolute", left: 0, top: 0, width: 16 * s,
                  height: 26 * s, background: P.c, opacity: 0.4 + ink * 0.6 }} />
              )}
              <div style={{ position: "absolute", left: 2 * s, top: 52 * s, width: 12 * s,
                height: 3 * s, background: hexa("#6D6659", 0.5 * ink) }} />
            </div>
          );
        })}
      </div>
      {/* ⭐⭐ THE BRASS ROD, now IN FRONT of the cards and running the full mouth */}
      <div style={{ position: "absolute", left: 8 * s, top: 96 * s + DP * 0.60,
        width: W + DP * 0.3, height: 19 * s, borderRadius: 10, zIndex: 5,
        transform: "rotate(-4.5deg)", transformOrigin: "0% 50%",
        background: `linear-gradient(180deg, #FDEBB4 0%, ${mxh(BRASS, 0.42)} 38%, ${dkh(BRASS, -0.38)} 100%)`,
        boxShadow: `0 ${3 * s}px ${5 * s}px ${hexa("#000", 0.34)}` }} />
      {/* its knurled end-knob, so the rod terminates on a THING */}
      <div style={{ position: "absolute", left: 0, top: 96 * s + DP * 0.50, width: 38 * s,
        height: 38 * s, borderRadius: "50%", zIndex: 6,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.5)} 0%, ${dkh(BRASS, -0.42)} 100%)`,
        border: `3px solid ${hexa("#000", 0.4)}` }} />

      {/* the carcass front */}
      <div style={{ position: "absolute", left: 0, top: 96 * s + DP, width: W, height: H,
        zIndex: 7, borderRadius: 3,
        background: `linear-gradient(178deg, ${mxh(DRW, 0.56)} 0%, ${mxh(DRW, 0.30)} 48%, ${mxh(DRWD, 0.10)} 100%)`,
        border: `4px solid ${hexa("#000", 0.46)}` }} />
      {/* ⛔ A FLAT PANEL IS A GREY RECTANGLE ([[feedback_a_lit_rectangle_is_a_screen]]).
          It gets a chamfer, four corner brackets and a shadow line so it reads as
          a made object rather than a slab. */}
      <div style={{ position: "absolute", left: 7 * s, top: 96 * s + DP + 7 * s, width: W - 14 * s,
        height: 12 * s, zIndex: 8, background: hexa("#FFF", 0.24) }} />
      <div style={{ position: "absolute", left: 7 * s, top: 96 * s + DP + H - 20 * s,
        width: W - 14 * s, height: 10 * s, zIndex: 8, background: hexa("#000", 0.26) }} />
      {[[6, 6], [W - 52 * s, 6], [6, H - 50 * s], [W - 52 * s, H - 50 * s]].map((c, i) => (
        <div key={"br" + i} style={{ position: "absolute", left: c[0], top: 96 * s + DP + (c[1] as number),
          width: 46 * s, height: 44 * s, zIndex: 9,
          background: `linear-gradient(150deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, -0.44)} 100%)`,
          clipPath: i % 2 ? "polygon(100% 0, 100% 100%, 0 0)" : "polygon(0 0, 100% 0, 0 100%)",
          transform: i > 1 ? "scaleY(-1)" : undefined, opacity: 0.9 }} />
      ))}
      {/* the brass label holder + a hand-scrawled label — ⛔ a SCRAWL, never a
          word: no text lives inside a hook animation
          ([[feedback_substitute_the_text_never_delete_it]]) */}
      <div style={{ position: "absolute", left: W * 0.13, top: 96 * s + DP + H * 0.32,
        width: W * 0.36, height: H * 0.40, zIndex: 10, borderRadius: 3, background: "#F2EAD6",
        border: `5px solid ${dkh(BRASS, -0.10)}` }}>
        {[0, 1].map(i => (
          <div key={i} style={{ position: "absolute", left: 12 * s, top: (16 + i * 22) * s,
            width: (W * 0.24 - i * 30 * s), height: 6 * s, borderRadius: 2,
            background: hexa("#3A342A", 0.52) }} />
        ))}
      </div>
      {/* the finger pull — a cup, not a rectangle */}
      <div style={{ position: "absolute", left: W * 0.70, top: 96 * s + DP + H * 0.34,
        width: W * 0.17, height: H * 0.30, zIndex: 10,
        borderRadius: `${H * 0.06}px ${H * 0.06}px ${H * 0.16}px ${H * 0.16}px`,
        background: `linear-gradient(180deg, ${dkh(DRWD, -0.5)} 0%, ${mxh(DRWL, 0.2)} 74%, ${DRWL} 100%)`,
        border: `3px solid ${hexa("#000", 0.44)}` }} />
      {/* the gouge where it was levered out of the wall */}
      <div style={{ position: "absolute", left: -4 * s, top: 96 * s + DP + H * 0.74, width: 70 * s,
        height: 36 * s, zIndex: 11, background: dkh(DRWD, -0.34),
        clipPath: "polygon(0 0, 100% 60%, 24% 100%, 0 100%)" }} />
    </div>
  );
};

/** ⭐ B · THE BALL OF DRAFTS — every prompt he rewrote, compacted.
    Keeps the silhouette that tested best at thumbnail size (a boulder) and makes
    it MEAN the subject: it is made of crumpled paper, not rock. It is also the
    brightest of the three, which the ≥140 frame-0 law cares about
    ([[feedback_push_the_two_values_apart]]) — cream mass, black creases. */
export const LoadDraftBall: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; strain?: number; ink?: number }> =
  ({ x, y, s = 1, z = 56, f = 0, strain = 0, ink = 0.6 }) => {
  const D = 460 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - D, width: D, height: D, zIndex: z,
      transform: `rotate(${strain * 1.6}deg)`, transformOrigin: "50% 92%" }}>
      {/* the compacted mass. ⭐ ONE CLIP ON THE WHOLE LAYER — the facets are
          drawn freely and then cut back to the silhouette, which is what keeps
          the outline that read at thumbnail size while the inside stays busy. */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden",
        clipPath: "polygon(22% 1%, 63% 0, 90% 15%, 100% 47%, 91% 83%, 65% 100%, 27% 98%, 3% 73%, 0 34%)" }}>
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(158deg, #F6F0DE 0%, #DCD3BC 44%, #A79E88 100%)` }} />
      {/* ⭐⭐ THE CRUMPLE. ⛔ v1 drew 22 facets at 0.46 white / 0.20 black over a
             cream ground and the mass read as a smooth translucent BLOB — the
             same failure as [[feedback_a_prop_that_renders_is_not_visible]]:
             every facet rendered and none of them had an edge. Crumpled paper is
             read entirely from VALUE SEPARATION between hard-edged planes, so
             these are opaque, they tile the whole mass, and the darkest sits
             ~90 luma under the brightest. */}
      {Array.from({ length: 30 }, (_, i) => {
        const cx = rnd(i, 81), cy = rnd(i, 82), w = (96 + rnd(i, 83) * 150) * s;
        const tone = ["#FFFCEF", "#F2EAD2", "#D9CFB2", "#B4A98B", "#8E8468"][i % 5];
        return (
          <div key={"cr" + i} style={{ position: "absolute",
            left: D * (-0.02 + cx * 0.82), top: D * (-0.02 + cy * 0.84),
            width: w, height: w * (0.46 + rnd(i, 84) * 0.62), background: tone,
            clipPath: `polygon(${6 + rnd(i, 85) * 22}% 0, 100% ${10 + rnd(i, 86) * 26}%, ${58 + rnd(i, 87) * 30}% 100%, 0 ${46 + rnd(i, 88) * 30}%)` }} />
        );
      })}
      {/* ⛔ NO SEPARATE CREASE BARS. v2 drew 16 dark rotated rectangles on top of
          the facets and every one read as a TWIG lying on the wad — a crease is
          where two planes MEET, so it is the facet edge or it is litter. */}
      </div>

      {/* ⭐⭐ THE CARDS HALF-FLATTENED INTO THE WAD — and they are the REAL
             `PromptCard`, not a hand-drawn stand-in.
             ⛔⛔ [[feedback_grep_the_repo_before_drawing]] AGAIN. v1 of this prop
             drew its own 132x92 mini card with a stripe and three grey rules,
             and the note was immediate: *"the paper should be more interesting,
             more graphics rather than lines, and bigger."* The reel's own card
             already had eleven parts including the punched `{path}`/`{behavior}`
             slots — it was two files away the whole time.
             ⭐ THREE, NOT FOUR, AND MUCH LARGER. Four small cards read as
             confetti; three at 0.62 scale are 161x211 each, big enough that the
             command strip and the slot pills are legible at thumbnail size. */}
      {/* ⛔ AND 0.62 WAS TOO BIG. Three 161x211 cards on a 451px wad covered the
          crumple entirely — the object stopped being a ball of paper and became
          a pile of cards, which is candidate C. 0.46 keeps the command strip and
          the slot pills legible while the wad still reads as the mass. */}
      {([[-0.02, 0.06, -19, 1], [0.52, 0.02, 14, 3], [0.24, 0.54, -6, 0]] as const).map((c, i) => (
        <div key={"pc" + i} style={{ position: "absolute", left: D * c[0], top: D * c[1],
          transform: `rotate(${c[2]}deg)`, transformOrigin: "50% 100%",
          filter: `drop-shadow(0 ${4 * s}px ${8 * s}px ${hexa("#000", 0.32)})` }}>
          <PromptCard x={60 * s} y={156 * s} s={0.46 * s} z={4} rot={0} ph={c[3]}
            ink={1} fill={0.35 + ink * 0.65} cat={R.catNames[i * 3 % R.catNames.length]}
            f={f + i * 7} rich />
        </div>
      ))}

      {/* ⭐⭐ THE MARK, PRINTED LARGE ON THE WAD. Alex: *"have the claude logo on
             the big ball thing."* It only carried the mark on the small cards
             stuck to it, which are 119px wide — at thumbnail size the object had
             no branding at all. This one is 40% of the wad, sits on a torn
             sheet that has been crushed into the surface, and because it lives
             INSIDE the clipped mass layer it rolls with the ball. */}
      <div style={{ position: "absolute", left: D * 0.22, top: D * 0.20, width: D * 0.44,
        height: D * 0.44, zIndex: 3, opacity: 0.94,
        transform: "rotate(-9deg)" }}>
        <div style={{ position: "absolute", inset: 0, background: "#FBF6E8",
          clipPath: "polygon(6% 2%, 92% 0, 100% 44%, 96% 94%, 40% 100%, 2% 82%, 0 34%)",
          boxShadow: `0 ${4 * s}px ${10 * s}px ${hexa("#000", 0.26)}` }} />
        <Img src={staticFile("claude_logo.png")}
          style={{ position: "absolute", left: "16%", top: "16%", width: "68%", height: "68%",
            objectFit: "contain" }} />
        {/* the crease running across it, so it is crushed INTO the wad */}
        <div style={{ position: "absolute", left: "4%", top: "58%", width: "92%", height: 5 * s,
          background: hexa("#5E573F", 0.42), transform: "rotate(-7deg)" }} />
      </div>

      {/* ⭐⭐ THE CLAUDE MARK, STUCK TO THE WAD. Alex: *"have the claude logo on the
             big ball thing."* Three of them, pressed flat into the crumple at
             different angles like stickers on a compacted mass — and because
             they sit INSIDE the clipped layer they roll with it, so each one
             turns as the ball turns rather than floating on top of the shot.
             ⛔ Their own spin is offset per index so the three never sync
             ([[feedback_a_sway_is_the_whole_cast]]). */}
      {([[0.20, 0.16, -22], [0.62, 0.40, 15], [0.34, 0.74, -8]] as const).map((c, i) => (
        <div key={"cm" + i} style={{ position: "absolute", left: D * c[0], top: D * c[1],
          width: 84 * s, height: 84 * s, borderRadius: 16 * s, zIndex: 5,
          transform: `rotate(${c[2]}deg)`, background: "#FFFFFF",
          border: `4px solid ${hexa("#000", 0.3)}`,
          boxShadow: `0 ${4 * s}px ${9 * s}px ${hexa("#000", 0.3)}` }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ position: "absolute", left: 10 * s, top: 10 * s,
              width: 60 * s, height: 60 * s, objectFit: "contain",
              transform: `rotate(${f * 4.4 + i * 83}deg)` }} />
        </div>
      ))}

      {/* loose balls trailing off it */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"lb" + i} style={{ position: "absolute", left: D * (0.02 + rnd(i, 93) * 0.9),
          top: D * (0.90 + rnd(i, 94) * 0.10), width: (26 + rnd(i, 95) * 24) * s,
          height: (24 + rnd(i, 96) * 20) * s, background: "#E4DCC6",
          border: `2px solid ${hexa("#7A7259", 0.5)}`,
          clipPath: "polygon(14% 6%, 74% 0, 100% 42%, 82% 92%, 26% 100%, 0 56%)" }} />
      ))}
    </div>
  );
};

/** ⭐ C · THE BALE OF PROMPT CARDS — the library itself, as a block.
    Two steel bands, a stencilled crate mark, and every one of its four visible
    faces made of CARD EDGES with category tabs. At thumbnail it is a solid
    coloured brick; up close it is unmistakably thousands of filing cards. */
export const LoadCardBale: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; strain?: number; ink?: number }> =
  ({ x, y, s = 1, z = 56, f = 0, strain = 0, ink = 0.6 }) => {
  const W = 430 * s, H = 360 * s, DP = 96 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - H - DP, width: W + DP, height: H + DP,
      zIndex: z, transform: `rotate(${strain * 1.2}deg)`, transformOrigin: "50% 96%" }}>
      {/* the top face — card TOPS. ⛔ v1 used `skewX(-46deg)` with the origin at
          the bottom-left, which threw the plane WIDER than the block it sits on
          and read as a wing. A receding plane is a PARALLELOGRAM: draw the four
          corners and let clipPath do it. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W + DP, height: DP + 2 * s,
        background: `linear-gradient(180deg, #E8DFC6 0%, #CFC5A8 100%)`,
        clipPath: `polygon(${(DP / (W + DP)) * 100}% 0, 100% 0, ${(1 - DP / (W + DP)) * 100}% 100%, 0 100%)` }} />
      {Array.from({ length: 16 }, (_, i) => {
        const t = i / 16;
        return (
          <div key={"tt" + i} style={{ position: "absolute",
            left: DP + t * (W - 26 * s) - t * DP + 8 * s, top: 4 * s,
            width: 15 * s, height: DP - 6 * s,
            transform: `skewX(${-Math.atan2(DP, DP) * 57.2958}deg)`, transformOrigin: "50% 0%",
            background: i % 4 === 1 ? PHASE[(i * 3) % 5].c : i % 3 === 0 ? "#F6EFDC" : "#E4DAC0",
            opacity: i % 4 === 1 ? 0.44 + ink * 0.56 : 1 }} />
        );
      })}
      {/* ⛔ THE TOP PLANE RECEDED UP-RIGHT OVER OPEN AIR and read as a wing. A box
          needs its THIRD face: without the right side the top has nothing to
          stand on. Same card edges, darker, running the other way. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W + DP, height: H + DP,
        background: `linear-gradient(96deg, #C6BC9E 0%, #8E856B 100%)`,
        clipPath: `polygon(${(W / (W + DP)) * 100}% ${(DP / (H + DP)) * 100}%, 100% 0, 100% ${(H / (H + DP)) * 100}%, ${(W / (W + DP)) * 100}% 100%)` }} />
      {Array.from({ length: 30 }, (_, i) => (
        <div key={"sd" + i} style={{ position: "absolute", left: W + 3 * s,
          top: DP * (1 - i / 30) + 6 * s + i * (H - 12 * s) / 30, width: DP - 6 * s,
          height: (H - 12 * s) / 30 - 1, background: i % 2 ? "#BFB596" : "#A79D80",
          transform: `skewY(-45deg)`, transformOrigin: "0% 0%" }} />
      ))}

      {/* ⭐ THE FRONT FACE IS CARD EDGES — 44 of them, ruled, with tabs */}
      <div style={{ position: "absolute", left: 0, top: DP, width: W, height: H,
        background: "#EDE4CE", border: `4px solid ${hexa("#000", 0.38)}` }} />
      {Array.from({ length: 44 }, (_, i) => (
        <div key={"ed" + i} style={{ position: "absolute", left: 4 * s, top: DP + 6 * s + i * (H - 12 * s) / 44,
          width: W - 8 * s, height: (H - 12 * s) / 44 - 1,
          background: i % 2 ? "#F7F1E0" : "#E2D8BE",
          borderBottom: `1px solid ${hexa("#8F8674", 0.5)}` }} />
      ))}
      {/* ⛔ THE TAB SELECTOR WAS ALSO THE COLOUR INDEX. `i % 5 === 2` picks the
          row AND then `PHASE[i % 5]` re-derives 2 from it, so all nine tabs came
          out the same orange and the block read as one category, not fifteen.
          They also have to be TWO card-heights tall or they vanish in the
          1012→240 downsample the motion audit measures on. */}
      {Array.from({ length: 44 }, (_, i) => i % 5 === 2 && (
        <div key={"tb" + i} style={{ position: "absolute",
          left: 8 * s + ((i * 7) % 3) * (W * 0.29), top: DP + 6 * s + i * (H - 12 * s) / 44,
          width: W * 0.26, height: (H - 12 * s) / 44 * 2 - 1,
          background: PHASE[Math.floor(i / 5) % 5].c, opacity: 0.40 + ink * 0.58 }} />
      ))}
      {/* ⭐⭐ THE TWO STEEL BANDS AND THEIR TENSIONERS — what makes it a BALE
             rather than a stack, and what the strap can honestly hook onto */}
      {[0.24, 0.68].map((by, i) => (
        <React.Fragment key={"bd" + i}>
          <div style={{ position: "absolute", left: W - 2 * s, top: DP * (1 - by) + H * by,
            width: DP + 4 * s, height: 20 * s, zIndex: 8, transform: "skewY(-45deg)",
            transformOrigin: "0% 0%",
            background: `linear-gradient(180deg, ${dkh(STEEL, -0.22)} 0%, ${dkh(STEEL, -0.56)} 100%)` }} />
          <div style={{ position: "absolute", left: -6 * s, top: DP + H * by, width: W + 12 * s,
            height: 20 * s, zIndex: 8,
            background: `linear-gradient(180deg, #D5DCE2 0%, ${dkh(STEEL, -0.18)} 42%, ${dkh(STEEL, -0.5)} 100%)`,
            border: `2px solid ${hexa("#000", 0.36)}` }} />
          <div style={{ position: "absolute", left: W * 0.30, top: DP + H * by - 8 * s,
            width: 46 * s, height: 36 * s, zIndex: 9, borderRadius: 3,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)} 0%, ${dkh(STEEL, -0.46)} 100%)`,
            border: `3px solid ${hexa("#000", 0.44)}` }} />
        </React.Fragment>
      ))}
      {/* the stencilled crate mark — a MARK, not a word */}
      <div style={{ position: "absolute", left: W * 0.60, top: DP + H * 0.36, width: 96 * s,
        height: 92 * s, zIndex: 8, opacity: 0.5 }}>
        <div style={{ position: "absolute", inset: 0, border: `7px solid #4A4232`, borderRadius: "50%" }} />
        <div style={{ position: "absolute", left: 20 * s, top: 42 * s, width: 56 * s, height: 8 * s,
          background: "#4A4232" }} />
      </div>
      {/* ⭐⭐ THE CARDS THAT HAVE WORKED LOOSE — the REAL card, rich and large.
             ⛔ v1 drew its own 74x96 rectangle with a stripe and three rules on
             it; at thumbnail size that is a grey tick, not a prompt. */}
      {/* ⛔ AT -104 THEY RAN OFF THE TOP OF THE PANEL. A card whose command strip
          is cropped away is back to being a white rectangle. */}
      {([[0.04, -13, 1], [0.38, 9, 3], [0.68, -5, 0]] as const).map((c, i) => (
        <div key={"lo" + i} style={{ position: "absolute", left: DP * 0.4 + W * c[0],
          top: -44 * s, zIndex: 3, transform: `rotate(${c[1]}deg)`, transformOrigin: "50% 100%",
          filter: `drop-shadow(0 ${4 * s}px ${8 * s}px ${hexa("#000", 0.3)})` }}>
          <PromptCard x={62 * s} y={163 * s} s={0.48 * s} z={3} ph={c[2]} ink={1}
            fill={0.3 + ink * 0.7} cat={R.catNames[(i * 4 + 1) % R.catNames.length]}
            f={f + i * 11} rich />
        </div>
      ))}

      {/* ⛔ NO PEELED TOP FACES. `skewX(-42deg) scaleY(0.42)` on a real card
          crushed it to an unreadable smear — [[feedback_a_prop_that_renders_is_not_visible]].
          The top plane's own 16 tab stripes already say "card tops". */}
    </div>
  );
};

/* =========================================================================
   11b · THE DOC PANE — REAL CAPTURES OF THE REAL PAGE.

   ⭐⭐⭐ Alex: *"show the official screen recording stuff, images of the prompt
   library etc."* Real UI is the biggest single motion lever in this repo and it
   is not close (reel 107 median 6.36 -> 8.00; reel 111 10.90 -> 12.51). For THIS
   reel it is also the entire receipt: the subject IS a page, so the proof that
   it exists and holds what the VO says is the page itself. Every asset in
   `public/refs/l130/` was captured from Claude Code's own docs on 2026-08-30 by
   `tools/lby_capture.mjs`, which is the reproducible part (the PNGs are
   gitignored with the rest of the media).

   ⛔ A CROP IS NOT A LAYOUT ([[feedback_a_crop_is_not_a_layout]] — real captures
   in equal 200px columns are unreadable slices). Every region below is 1420-1500
   px wide and is placed at 820-900px, a **1.6-1.7x downscale**, well inside the
   2.5x line at which a capture stops being readable. Fewer, bigger, differently
   sized.
   ⛔ AND REAL FOOTAGE IS NOT AUTOMATICALLY MOTION — a seated interview held for a
   sentence scored 3.23 with a 60-frame dead run. Every pane here ARRIVES on a
   spoken word and none of them holds: `reveal` wipes the content in, and the
   scene keeps moving around it.
   ⛔ THE PANE IS A REAL WINDOW, not a floating rectangle: chrome, traffic lights
   and the REAL url, because "a lit rectangle is a screen" is only solved by the
   room stopping at it.
   ====================================================================== */
export const DocPane: React.FC<{
  x: number; y: number; w: number; src: string; url: string;
  /** 0..1 — the content wipes in from the top; the chrome is there from frame 0 */
  reveal?: number;
  /** ⭐⭐ 0..1 — THE PAGE SCROLLS, which is the whole point. Alex asked for
      *"official screen recording stuff"* and a screen recording SCROLLS; a still
      screenshot pinned to a wall is the thing ANIMATION-QUALITY §9 warns about —
      *"real footage is not automatically motion: a seated interview held for a
      sentence scored 3.23 with a 60-frame dead run"*. The first pass pinned six
      captures and three scenes went from `ok` to **DIES INTO THE CUT** (REJECT
      0.66 · SOURCE 0.58 · PLATE 0.69), because a pane that finishes revealing and
      then holds is a still life however real its pixels are.
      ⛔ IT IS DRIVEN `LIN`, so it does not decelerate into a cut it crosses. */
  scroll?: number;
  /** the visible window height in panel px — the capture is TALLER than this, and
      the difference is what there is to scroll through */
  winH?: number;
  z?: number; rot?: number; o?: number; f?: number;
  /** the intrinsic size of the capture, so the downscale is explicit at the call site */
  iw: number; ih: number;
  /** ⭐⭐ HOW FAR INTO THE PAGE WE ARE. Alex: *"some of the screen recordings are
      not centred and zoomed in enough, I can't even see what's going on."* He is
      right and it is arithmetic: a 1010px capture shown 452px wide is a 2.23x
      downscale, which puts docs body text at about SIX PIXELS. `w` was the only
      size control, so every pane was forced to show the WHOLE page width, and
      the whole page width is never the thing the line is about.
      `zoom` renders the capture at `w * zoom` and crops to the window, so the
      pane keeps its layout size while the CONTENT gets bigger — a 2.2 zoom takes
      that same capture to 1.01x, i.e. native. [[feedback_a_crop_is_not_a_layout]]
      says ask the downscale and then change the layout; this is the control that
      lets the call site do it. */
  zoom?: number;
  /** 0..1 — which part of the over-wide capture the window sits on. 0 = left
      edge, 0.5 = centred, 1 = right edge. */
  panX?: number;
}> = ({ x, y, w: ww, src, url, reveal = 1, scroll = 0, winH, z = 70, rot = 0, o = 1,
        f = 0, iw, ih, zoom = 1, panX = 0 }) => {
  const iwW = ww * zoom;                   /* the capture's rendered width */
  const k = iwW / iw;                      /* ⛔ keep this >= 0.40 (a 2.5x downscale) */
  const full = ih * k;
  const overX = Math.max(0, iwW - ww);     /* how far there is to pan sideways */
  const ch = Math.min(full, winH ?? full);
  const travel = Math.max(0, full - ch);   /* how far there IS to scroll */
  const BAR = Math.max(34, ww * 0.055);
  const rv = Math.max(0, Math.min(1, reveal));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: ch + BAR,
      zIndex: z, opacity: o, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the window body — a real frame with a real shadow, on a dark ground */}
      <div style={{ position: "absolute", inset: -5, borderRadius: 9, background: "#0B0E12",
        boxShadow: SH_D }} />
      {/* the chrome bar, with the real URL */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: BAR,
        borderRadius: "7px 7px 0 0", background: "#2A2F36", display: "flex",
        alignItems: "center", gap: BAR * 0.16, paddingLeft: BAR * 0.34 }}>
        {["#E06A5E", "#E5B750", "#5CB98D"].map(c => (
          <div key={c} style={{ width: BAR * 0.24, height: BAR * 0.24, borderRadius: "50%",
            background: c }} />
        ))}
        <div style={{ marginLeft: BAR * 0.4, flex: 1, height: BAR * 0.52, borderRadius: BAR * 0.26,
          background: "#171B21", display: "flex", alignItems: "center", paddingLeft: BAR * 0.4,
          marginRight: BAR * 0.34, ...mono(Math.round(BAR * 0.34), 700), color: "#9AA6B2",
          overflow: "hidden", whiteSpace: "nowrap" }}>{url}</div>
      </div>
      {/* the capture, wiped in and then SCROLLING */}
      <div style={{ position: "absolute", left: 0, top: BAR, width: ww, height: ch,
        overflow: "hidden", borderRadius: "0 0 7px 7px", background: "#FAF9F5" }}>
        <Img src={staticFile(src)} style={{ position: "absolute",
          left: -overX * Math.max(0, Math.min(1, panX)),
          top: -travel * Math.max(0, Math.min(1, scroll)),
          width: iwW, height: full, objectFit: "cover", objectPosition: "top left" }} />
        {rv < 0.995 && (
          <div style={{ position: "absolute", left: 0, top: ch * rv, width: ww,
            height: ch, background: "#0B0E12" }} />
        )}
        {/* the scan line the wipe runs behind — it is what makes the reveal an EVENT */}
        {rv > 0.02 && rv < 0.995 && (
          <div style={{ position: "absolute", left: 0, top: ch * rv - 4, width: ww, height: 8,
            background: hexa("#8FE4F2", 0.85) }} />
        )}
      </div>
      {/* the scrollbar, so the movement is legibly a SCROLL and not a drift */}
      {travel > 8 && (
        <div style={{ position: "absolute", right: 3, top: BAR + 6, width: 7, height: ch - 12,
          borderRadius: 4, background: hexa("#000", 0.16) }}>
          <div style={{ position: "absolute", left: 0, width: 7, borderRadius: 4,
            height: (ch / full) * (ch - 12),
            top: (1 - ch / full) * (ch - 12) * Math.max(0, Math.min(1, scroll)),
            background: hexa("#3A424C", 0.9) }} />
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   12 · SMALL RECEIPTS — the plates that carry the ledger.
   ⛔ ROOT OWNS THE WORDS. A scene chip earns its place only when it carries
   something the SectionBand cannot: a file path, a key name, a mode line.
   ====================================================================== */
export const Stencil: React.FC<{ x: number; y: number; t: string; c?: string; z?: number;
  size?: number; align?: "l" | "c" }> =
  ({ x, y, t, c = hexa("#F0E4C8", 0.62), z = 76, size = 17, align = "l" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, ...mono(size, 800), color: c,
    letterSpacing: "0.08em", textAlign: align === "c" ? "center" : "left",
    transform: align === "c" ? "translateX(-50%)" : undefined, whiteSpace: "nowrap" }}>{t}</div>
);

/** the wall receipt — 52 PROMPTS · 15 CATEGORIES. Spent ONCE, at S2. */
export const ReceiptPlate: React.FC<{ x: number; y: number; on: number; z?: number; s?: number }> =
  ({ x, y, on, z = 80, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y + (1 - on) * 26, width: 430 * s, zIndex: z,
    opacity: on, transform: `scale(${0.94 + on * 0.06})`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, height: 96 * s, borderRadius: 5,
      background: `linear-gradient(178deg, #F2ECDC 0%, #D9D0BA 100%)`,
      border: `4px solid ${hexa("#000", 0.34)}`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 14 * s, display: "flex",
      alignItems: "baseline", justifyContent: "center", gap: 10 * s }}>
      <div style={{ ...mono(Math.round(44 * s), 900), color: "#1A1813" }}>{R.prompts}</div>
      <div style={{ ...mono(Math.round(20 * s), 800), color: "#4A443A", letterSpacing: "0.10em" }}>PROMPTS</div>
      <div style={{ ...mono(Math.round(20 * s), 800), color: "#8A8272" }}>·</div>
      <div style={{ ...mono(Math.round(44 * s), 900), color: "#1A1813" }}>{R.cats}</div>
      <div style={{ ...mono(Math.round(20 * s), 800), color: "#4A443A", letterSpacing: "0.10em" }}>CATEGORIES</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 66 * s, textAlign: "center",
      ...mono(Math.round(15 * s), 700), color: "#6E6656", letterSpacing: "0.06em" }}>
      {R.url}{R.page}
    </div>
  </div>
);

/* =========================================================================
   13 · THE TIER RIG — the reel's SPINE.

   ⛔⛔⛔ WHY THIS EXISTS. Alex, on the finished body: *"the scenes after the hook
   scene are not interesting need to be redone concepts more hierarchical etc
   interesting."* A contact sheet of all eleven, muted, gives the cause in one
   look and it is not decoration:

     1 · NINE OF ELEVEN ARE THE SAME SHOT — a Claude standing beside a large
         flat document or UI panel. Eight of them carry a `DocPane`,
         `ReceiptPlate`, `Console`, `ModeStrip`, `RouteBoard` or `SetupPlate`.
         The reel had become a slideshow of documents with a mascot next to them.
     2 · ⭐ THERE WAS NO HIERARCHY AT ALL. The VO is literally "First... Second...
         Third..." and NOTHING in the picture said which rule you were on. Each
         scene was a fresh unrelated room in a different colour, so three ranked
         rules read as eleven unranked beats. Colour was doing the variety work,
         and colour is not rank.
     3 · Each rule spans TWO scenes and the two halves looked unrelated, so a
         rule never landed as one idea.
     4 · No escalation — rule 3 carried exactly the weight of rule 1.

   ⭐ A HIERARCHY IS A THING WITH LEVELS, so the answer is to build one and put
   the rules ON it. Three working decks of one rig, climbed in order. The camera
   rises a deck between rules, the tier marker fills, and the payoff is the view
   from the top. That is the difference between a list of scenes and a structure.

   ⛔ THE RIG IS FURNITURE, NEVER THE EVENT ([[feedback_the_invented_object_is_a_container]]).
   Each deck still has its own physical mechanism doing its own physical work;
   the rig only says WHERE you are in the argument.
   ====================================================================== */

/** how far apart the decks sit, panel-local. The rig is translated so the
    ACTIVE deck lands on the shot's ground line. */
export const DECK_GAP = 348;

export const TierRig: React.FC<{
  f: number;
  /** which deck the camera is on — 0 bottom, 1 middle, 2 top */
  at: number;
  /** 0..1 per deck; the reveal in S1 walks these up one at a time */
  lit?: [number, number, number];
  /** ground line for the ACTIVE deck */
  gy?: number;
  z?: number;
  /** slides the whole rig for the climb between rules */
  dy?: number;
  /** ⭐ the establishing shot has to hold all THREE decks, and at the working
      spacing the top one sits above the crop. S1 compresses to 250 and shrinks
      its machines to 0.5; the rule scenes use the full gap at full size. */
  gap?: number;
}> = ({ f, at, lit = [1, 1, 1], gy = 706, z = 20, dy = 0, gap = DECK_GAP }) => {
  /* deck k sits `(at - k)` gaps below the active line */
  const deckY = (k: number) => gy + (at - k) * gap + dy;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z }}>
      {/* ⭐ THE UPRIGHTS run past BOTH crops — the mass cropped by the frame edge
          that ten reels shipped without ([[WorldKit Occluder]]). They are what
          make three decks read as one structure rather than three shelves. */}
      {[-40, 1010].map((ux, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: ux, top: -400, width: i % 2 ? 26 : 34,
          height: 2200, background: `linear-gradient(90deg, ${dkh(HALLSTEEL, -0.52)} 0%, ${mxh(HALLSTEEL, 0.16)} 38%, ${dkh(HALLSTEEL, -0.6)} 100%)`,
          borderLeft: `3px solid ${hexa("#000", 0.44)}` }} />
      ))}
      {/* ⛔ NO CROSS-BRACING. Two diagonals per deck turned the establishing
          shot into a lattice of grey bars with the machines lost inside it —
          the rig is FURNITURE and furniture that competes with the event is the
          defect this whole rebuild is fixing. The uprights alone hold it. */}
      {[0, 1, 2].map(k => {
        const y = deckY(k), L = lit[k] ?? 1, P = PHASE[k + 1];
        if (y < -320 || y > 1180) return null;
        return (
          <React.Fragment key={"dk" + k}>
            {/* the deck's underside, which is where its shadow lives */}
            <div style={{ position: "absolute", left: -60, top: y, width: 1140, height: 34,
              background: `linear-gradient(180deg, ${mxh(HALLSTEEL, 0.10 + L * 0.52)} 0%, ${dkh(HALLSTEEL, -0.36)} 44%, #05070A 100%)`,
              borderTop: `4px solid ${hexa("#000", 0.4)}` }} />
            {/* the walking surface — a bright lip is what says PLATFORM */}
            <div style={{ position: "absolute", left: -60, top: y - 9, width: 1140, height: 11,
              background: mxh(HALLSTEEL, 0.24 + L * 0.72) }} />
            {/* ⭐ THE DECK'S PHASE STRIPE — the one place rank is coloured, and it
                rides `lit` so the reveal reads as the structure coming ALIVE */}
            <div style={{ position: "absolute", left: -60, top: y + 36, width: 1140, height: 16,
              background: P.c, opacity: 0.10 + L * 0.9 }} />
            {/* the grating, drawn as teeth so the deck has a real edge */}
            {Array.from({ length: 42 }, (_, i) => (
              <div key={"gt" + i} style={{ position: "absolute", left: -50 + i * 27, top: y + 2,
                width: 15, height: 30, background: hexa("#04060A", 0.42 + (i % 2) * 0.2) }} />
            ))}
            {/* the handrail, and its posts */}
            <div style={{ position: "absolute", left: -60, top: y - 96, width: 1140, height: 9,
              background: `linear-gradient(180deg, ${mxh(BRASS, 0.2 + L * 0.4)} 0%, ${dkh(BRASS, -0.44)} 100%)`,
              opacity: 0.4 + L * 0.6 }} />
            {Array.from({ length: 9 }, (_, i) => (
              <div key={"ps" + i} style={{ position: "absolute", left: -30 + i * 130, top: y - 92,
                width: 8, height: 92, background: dkh(HALLSTEEL, -0.34), opacity: 0.4 + L * 0.6 }} />
            ))}
            {/* ⭐ THE DECK LAMP. A practical per level, so a deck that is not lit
                yet is genuinely dark and the reveal has something to give. */}
            <div style={{ position: "absolute", left: 372, top: y - gap + 46, width: 268,
              height: 44, borderRadius: "46% 46% 8px 8px",
              background: `linear-gradient(180deg, #FCF3DC 0%, ${mxh(SODIUM, 0.44)} 52%, ${dkh(SODIUM, -0.3)} 100%)`,
              border: `4px solid ${hexa("#000", 0.34)}`, opacity: 0.22 + L * 0.78 }} />
            <div style={{ position: "absolute", left: 250, top: y - gap + 84, width: 512,
              height: gap - 96,
              background: `linear-gradient(180deg, ${hexa(SODIUM, 0.46 * L)} 0%, ${hexa(SODIUM, 0.12 * L)} 100%)`,
              clipPath: "polygon(24% 0, 76% 0, 100% 100%, 0 100%)" }} />
            {/* the stair up to the next deck, at the right — the CLIMB has to be
                visible or the three levels are three shelves */}
            {k < 2 && Array.from({ length: 7 }, (_, i) => (
              <div key={"st" + i} style={{ position: "absolute", left: 806 + i * 30,
                top: y - 18 - i * (gap - 40) / 7, width: 40, height: 12,
                background: mxh(HALLSTEEL, 0.14 + L * 0.30),
                borderTop: `3px solid ${hexa("#FFF", 0.16 + L * 0.2)}` }} />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** ⭐ THE TIER MARKER — where you are in the argument, with NO NUMERAL.
    ⛔ Not banned UI: this is a quantity expressed as a LENGTH, which is the one
    form [[feedback_a_bar_makes_a_loop_legible]] allows. Three cast lugs bolted
    to the left upright; the ones you have passed are filled and the one you are
    on is lit, so the viewer always knows this is rule 2 of 3 without being told. */
export const TierMark: React.FC<{ at: number; on?: number; x?: number; y?: number; z?: number }> =
  ({ at: atRaw, on = 1, x = 28, y = 232, z = 88 }) => {
  /* ⛔ `at` ARRIVES AS -1 BEFORE THE FIRST DECK LIGHTS, and at -1 no lug is
     `here` and none is `done`, so all three rendered hollow at 0.5 opacity on a
     near-black ground and the marker was INVISIBLE on exactly the frames it was
     added for. Clamp, and let the caller fade it in instead. */
  const at = Math.max(0, Math.min(2, atRaw));
  return (
  <div style={{ position: "absolute", left: x, top: y, width: 46, height: 268, zIndex: z }}>
    <div style={{ position: "absolute", left: 17, top: 0, width: 11, height: 268,
      background: dkh(HALLSTEEL, -0.42) }} />
    {[2, 1, 0].map((k, row) => {
      const done = k < at, here = k === at;
      const P = PHASE[k + 1];
      return (
        <div key={"lg" + k} style={{ position: "absolute", left: 0, top: row * 92,
          width: 46, height: 60, borderRadius: 5,
          background: here ? P.c : done ? dkh(P.c, -0.42) : hexa("#0B0E12", 0.72),
          border: `4px solid ${hexa("#000", here ? 0.46 : 0.3)}`,
          boxShadow: here ? `0 0 ${22 * on}px ${hexa(P.c, 0.72 * on)}` : "none",
          opacity: here ? 1 : done ? 0.9 : 0.5 }}>
          {/* the lug's own bolt, so it reads as cast metal and not a swatch */}
          <div style={{ position: "absolute", left: 17, top: 22, width: 12, height: 12,
            borderRadius: "50%", background: hexa("#000", 0.42) }} />
        </div>
      );
    })}
  </div>
  );
};

/* =========================================================================
   14 · THE THREE DECK MECHANISMS.

   ⛔ THE RIG ALONE IS NOT A HIERARCHY. The first render of S1 lit three decks in
   sequence and read as a generic scaffold, because three IDENTICAL levels are a
   repetition, not a rank. A hierarchy is legible only when the levels are
   visibly DIFFERENT things in a fixed order — so each deck carries its own
   machine, and all three are already in silhouette during the S1 reveal. When
   the lights come up you are not told there are three levels, you are shown
   three different jobs.
   ⭐ EACH ONE IS A MECHANISM WITH A CAUSE, never a container: a lever that
   drives a ram, a roll that must be drawn before girders may land, a plate that
   every body entering the deck reads.
   ====================================================================== */

/** ⭐ DECK 1 · THE PRESS — "teach it a skill instead of re-prompting every time."
    You write the thing ONCE, it becomes a die, and after that it is one pull of
    a lever. `hit` 0..1 drives the ram down; `die` says the die is seated. */
/* ⛔⛔ THE PRESS WAS PAINTED THE HERO'S OWN COLOUR. Slate-on-slate had no edge,
   so it was warmed to oxide — and oxide is the clay mascot's hue, which
   camouflaged him against the one machine he is meant to be operating. Cast iron
   is DARK; the light in this prop is the steel ram and the brass die, which is
   also what [[feedback_push_the_two_values_apart]] asks for: a dark field with
   bright detail feeds the mean AND the black point, and it leaves red free for
   the only living thing in the shot. */
export const DeckPress: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  hit?: number; die?: number; out?: number }> =
  ({ x, y, f, s = 1, z = 50, hit = 0, die = 0, out = 0 }) => {
  const W2 = 372 * s, H2 = 300 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - H2, width: W2, height: H2, zIndex: z }}>
      {/* the frame — a C-frame press, which is the recognisable shape */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 96 * s, height: H2,
        background: `linear-gradient(90deg, #10151A 0%, #33414C 44%, #151C22 100%)`,
        border: `4px solid ${hexa("#000", 0.5)}` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: W2, height: 74 * s,
        background: `linear-gradient(180deg, #3C4A56 0%, #131A20 100%)`,
        border: `4px solid ${hexa("#000", 0.46)}` }} />
      <div style={{ position: "absolute", left: 0, top: H2 - 56 * s, width: W2, height: 56 * s,
        background: `linear-gradient(180deg, #2C3841 0%, #0D1216 100%)`,
        border: `4px solid ${hexa("#000", 0.46)}` }} />
      {/* ⭐ THE RAM — the moving mass, and the only bright thing in the frame */}
      <div style={{ position: "absolute", left: 126 * s, top: 70 * s + hit * 122 * s,
        width: 176 * s, height: 92 * s,
        background: `linear-gradient(180deg, #E8EFF5 0%, ${mxh(STEEL, 0.44)} 40%, ${dkh(STEEL, -0.4)} 100%)`,
        border: `4px solid ${hexa("#000", 0.54)}` }} />
      <div style={{ position: "absolute", left: 186 * s, top: 8 * s, width: 56 * s,
        height: 66 * s + hit * 122 * s, background: dkh(STEEL, -0.44) }} />
      {/* ⭐ 10s: THE MARK ON THE RAM. Alex: *"there needs to be the claude logo on
          that stamper thing grey part."* The medallion was on the dark C-frame
          where it read as part of the shadow; the ram is the brightest mass in
          the prop and it is the part that MOVES, so the mark rides the stroke. */}
      <div style={{ position: "absolute", left: 176 * s, top: 88 * s + hit * 122 * s,
        width: 76 * s, height: 76 * s, borderRadius: 14 * s, zIndex: 4,
        background: "#FFFFFF", border: `5px solid ${hexa("#000", 0.46)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 ${3 * s}px ${6 * s}px ${hexa("#000", 0.34)}` }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 54 * s, height: 54 * s, objectFit: "contain",
            transform: `rotate(${f * 4.8}deg)` }} />
      </div>
      {/* ⭐⭐ THE DIE IN ITS BED — the skill, written once. Empty and red-lit
          until it is seated, which is the whole point of the deck. */}
      <div style={{ position: "absolute", left: 132 * s, top: H2 - 96 * s, width: 164 * s,
        height: 44 * s, borderRadius: 3,
        background: die > 0.5 ? mxh(BRASS, 0.34) : hexa("#12161A", 0.9),
        border: `4px solid ${die > 0.5 ? dkh(BRASS, -0.3) : hexa("#B9302A", 0.8)}`,
        boxShadow: die > 0.5 ? `0 0 ${24 * die}px ${hexa(BRASS, 0.7 * die)}` : "none" }}>
        {die > 0.5 && [0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", left: (12 + i * 46) * s, top: 12 * s,
            width: (34 - i * 8) * s, height: 18 * s, borderRadius: 2,
            background: hexa("#2A2620", 0.66) }} />
        ))}
      </div>
      {/* ⛔⛔⛔ THERE WERE TWO FLYWHEELS. One was added earlier in this same
             session at `left: -104 * s` — off the C-frame's left side, which is
             exactly where the operator stands — and a second on the drive side
             when the note came back. Both rendered, both drove rods at the same
             ram, and the frame had a 250px wheel through the hero's chest.
             ⛔ THE GREPS SAID "1" BECAUSE I ASSERTED ON MY OWN NEW STRINGS
             rather than checking whether the feature already existed — the
             [[feedback_a_silent_patch_reports_success]] trap wearing a different
             hat, and the same lesson as [[feedback_grep_the_repo_before_drawing]]:
             look for the THING, not for your own wording of it. */}
      {/* ⭐⭐ THE FLYWHEEL AND CONNECTING ROD. *"a lot of the animations are not
             good like it's just squares and rectangles"* — a fair note about a
             drawing habit, not one prop. Everything here is a `div`, so
             everything came out a box with a bevel. A big WHEEL is the single
             strongest correction available: it is round, it is unmistakably a
             machine, and because it SPINS it turns a static silhouette into a
             running one. The rod ties it to the ram, so the ram's stroke has a
             visible cause instead of being an authored drop. */}
      {(() => {
        /* the wheel free-runs and SURGES on each stroke — a flywheel gives up
           energy to the press, so it must visibly speed up as the ram falls */
        const spin = f * 4.6 + hit * 128;
        /* ⛔ THE WHEEL WAS ON THE HERO. At -0.46 x it sat left of the C-frame,
           which is exactly where the operator stands — a 150px wheel straight
           through his chest. A flywheel lives on the DRIVE side anyway, so it
           goes right and slightly proud of the crown, clear of both the man and
           the die bed. */
        /* ⛔ AND 0.80 PUT IT OFF THE RIGHT CROP — only a sliver showed, so the
           one change made to answer "it's just rectangles" was the part of the
           frame you could not see. It sits proud of the crown, right of the
           operator and inside the panel. */
        const RW = 152 * s, cx = W2 * 0.46, cy = -RW * 0.62;
        return (<>
          <div style={{ position: "absolute", left: cx, top: cy, width: RW, height: RW,
            borderRadius: "50%", transform: `rotate(${spin}deg)`,
            background: `radial-gradient(58% 58% at 36% 30%, #46525C 0%, #222A31 52%, #0B0F13 100%)`,
            border: `10px solid #2E3941`, boxShadow: `inset 0 0 ${18 * s}px ${hexa("#000", 0.6)}` }}>
            {/* six spokes — the thing that makes the spin READ */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={"sk" + i} style={{ position: "absolute", left: RW / 2 - 6 * s,
                top: 8 * s, width: 12 * s, height: RW / 2 - 8 * s,
                background: `linear-gradient(180deg, #5B6874 0%, #2A343C 100%)`,
                transformOrigin: `50% ${RW / 2 - 8 * s}px`, transform: `rotate(${i * 60}deg)` }} />
            ))}
            <div style={{ position: "absolute", left: RW / 2 - 21 * s, top: RW / 2 - 21 * s,
              width: 42 * s, height: 42 * s, borderRadius: "50%",
              background: `radial-gradient(60% 60% at 34% 30%, ${mxh(BRASS, 0.5)} 0%, ${dkh(BRASS, -0.5)} 100%)`,
              border: `3px solid ${hexa("#000", 0.5)}` }} />
            {/* the crank pin, which is what the rod actually hangs off */}
            <div style={{ position: "absolute", left: RW * 0.5 - 11 * s, top: RW * 0.12,
              width: 22 * s, height: 22 * s, borderRadius: "50%", background: dkh(BRASS, -0.2),
              border: `3px solid ${hexa("#000", 0.5)}` }} />
          </div>
          {/* the connecting rod: wheel pin -> ram, so the stroke has a cause */}
          {(() => {
            const px = cx + RW / 2 + Math.cos((spin - 90) * Math.PI / 180) * RW * 0.38;
            const py = cy + RW / 2 + Math.sin((spin - 90) * Math.PI / 180) * RW * 0.38;
            const rx = 126 * s, ry = 116 * s + hit * 122 * s;
            const dx = rx - px, dy = ry - py;
            return (
              <div style={{ position: "absolute", left: px, top: py - 9 * s,
                width: Math.hypot(dx, dy), height: 18 * s, borderRadius: 9 * s,
                transformOrigin: "0% 50%", transform: `rotate(${Math.atan2(dy, dx) * 57.2958}deg)`,
                background: `linear-gradient(180deg, #7C8894 0%, #3A444E 60%, #1A2026 100%)`,
                border: `2px solid ${hexa("#000", 0.5)}` }} />
            );
          })()}
        </>);
      })()}

      {/* ⭐ THE MAKER'S BADGE, CAST INTO THE C-FRAME. Alex: *"have the logo on the
             stamping thing at 10 seconds."* A machine that stamps Anthropic's
             prompts should say whose machine it is, and a cast oval badge is
             where a maker's mark actually goes on a press. */}
      <div style={{ position: "absolute", left: 14 * s, top: H2 * 0.40, width: 70 * s,
        height: 88 * s, zIndex: 6, borderRadius: `${35 * s}px ${35 * s}px ${18 * s}px ${18 * s}px`,
        background: `linear-gradient(168deg, ${mxh(BRASS, 0.34)} 0%, ${dkh(BRASS, -0.34)} 46%, ${dkh(BRASS, -0.68)} 100%)`,
        border: `4px solid #1A1206`,
        boxShadow: `inset 0 ${3 * s}px 0 ${hexa("#FFEFC0", 0.4)}` }}>
        <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: 50 * s,
          height: 50 * s, borderRadius: "50%", background: "#FFFFFF",
          border: `3px solid ${hexa("#000", 0.4)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 38 * s, height: 38 * s, objectFit: "contain" }} />
        </div>
        {[0, 1].map(i => (
          <div key={i} style={{ position: "absolute", left: 16 * s, top: (66 + i * 9) * s,
            width: (38 - i * 12) * s, height: 5 * s, borderRadius: 2,
            background: hexa("#17120A", 0.7), boxShadow: `0 ${2 * s}px 0 ${hexa("#FFEFC0", 0.5)}` }} />
        ))}
      </div>

      {/* the lever, on the near upright */}
      <div style={{ position: "absolute", left: 300 * s, top: 96 * s, width: 22 * s, height: 118 * s,
        borderRadius: 10, transformOrigin: "50% 0%",
        transform: `rotate(${-34 + hit * 62}deg)`,
        background: `linear-gradient(90deg, ${dkh(EMBER, -0.44)} 0%, ${mxh(EMBER, 0.28)} 52%, ${dkh(EMBER, -0.5)} 100%)` }} />
      {/* ⭐⭐ THE MAKER'S MEDALLION ON THE C-FRAME. Alex: *"have the logo on the
             stamping thing at 10 seconds."* Cast into the throat of the frame
             where a machine's maker's badge actually goes, raised on a boss, and
             it turns — so the press is visibly Anthropic's machine rather than
             a generic one. */}
      <div style={{ position: "absolute", left: 12 * s, top: H2 * 0.40, width: 74 * s,
        height: 74 * s, borderRadius: "50%", zIndex: 6,
        background: `radial-gradient(62% 62% at 34% 30%, ${mxh(BRASS, 0.5)} 0%, ${dkh(BRASS, -0.5)} 100%)`,
        border: `5px solid ${hexa("#000", 0.52)}`,
        boxShadow: `inset 0 ${3 * s}px 0 ${hexa("#FFEFC0", 0.4)}` }}>
        <div style={{ position: "absolute", left: 12 * s, top: 12 * s, width: 50 * s,
          height: 50 * s, borderRadius: 9 * s, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 38 * s, height: 38 * s, objectFit: "contain",
              transform: `rotate(${f * 4.8}deg)` }} />
        </div>
      </div>
      {/* and the die carries it too, so every card it stamps is marked */}
      {die > 0.5 && (
        <div style={{ position: "absolute", left: 196 * s, top: H2 - 92 * s, width: 36 * s,
          height: 36 * s, borderRadius: 7 * s, zIndex: 8, background: "#FFFFFF",
          border: `3px solid ${hexa("#000", 0.42)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 26 * s, height: 26 * s, objectFit: "contain",
              transform: `rotate(${f * -4.8}deg)` }} />
        </div>
      )}

      {/* the output chute, and the stack it is building */}
      <div style={{ position: "absolute", left: W2 - 24 * s, top: H2 - 128 * s, width: 116 * s,
        height: 20 * s, background: dkh(HALLSTEEL, -0.3), transform: "rotate(9deg)",
        transformOrigin: "0% 50%" }} />
      {Array.from({ length: Math.floor(out * 9) }, (_, i) => (
        <div key={"op" + i} style={{ position: "absolute", left: (W2 + 62) * s - i * 3 * s,
          top: H2 - 66 * s - i * 11 * s, width: 96 * s, height: 13 * s, borderRadius: 2,
          background: i % 2 ? "#F2EAD6" : "#E0D7BE",
          border: `2px solid ${hexa("#000", 0.24)}`,
          borderLeft: `6px solid ${PHASE[(i + 1) % 5].c}` }} />
      ))}
    </div>
  );
};

/** ⭐ DECK 2 · THE DRAFTING BED — "plan mode maps the whole thing before a line
    of code." A roll is drawn across the deck FIRST, and only where the line has
    been drawn may a girder land. `drawn` 0..1 is the roll; `built` 0..1 is how
    many girders have come down onto it. ⛔ Girders may never lead the line. */
export const DeckDraft: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  drawn?: number; built?: number; mode?: number }> =
  ({ x, y, f, s = 1, z = 50, drawn = 0, built = 0, mode = 0 }) => {
  const W2 = 620 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - 250 * s, width: W2, height: 250 * s, zIndex: z }}>
      {/* the bed and its trestles */}
      <div style={{ position: "absolute", left: 0, top: 150 * s, width: W2, height: 26 * s,
        background: `linear-gradient(180deg, ${mxh(COPPER, 0.2)} 0%, ${dkh(COPPER, -0.5)} 100%)`,
        border: `4px solid ${hexa("#000", 0.42)}`, transform: "rotate(-2.4deg)" }} />
      {[40, W2 - 90].map((tx, i) => (
        <div key={"tr" + i} style={{ position: "absolute", left: tx, top: 172 * s, width: 22 * s,
          height: 78 * s, background: dkh(COPPER, -0.44), transform: `rotate(${i ? 5 : -5}deg)` }} />
      ))}
      {/* the roll it comes off */}
      <div style={{ position: "absolute", left: -18 * s, top: 118 * s, width: 54 * s, height: 54 * s,
        borderRadius: "50%", background: `radial-gradient(60% 60% at 36% 32%, #F6F0DE 0%, #B8AE92 100%)`,
        border: `4px solid ${hexa("#000", 0.34)}` }} />
      {/* ⭐ THE DRAWN LINE — the plan itself, unrolling left to right */}
      <div style={{ position: "absolute", left: 26 * s, top: 96 * s, width: (W2 - 46 * s) * drawn,
        height: 62 * s, background: "#F4EEDC", border: `3px solid ${hexa("#000", 0.24)}`,
        transform: "rotate(-2.4deg)", transformOrigin: "0% 50%", overflow: "hidden" }}>
        {/* the route on it: a spine and its stations */}
        <div style={{ position: "absolute", left: 12 * s, top: 30 * s, right: 8 * s, height: 4 * s,
          background: hexa("#2A6E8E", 0.8) }} />
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"nd" + i} style={{ position: "absolute", left: (24 + i * 108) * s, top: 22 * s,
            width: 20 * s, height: 20 * s, borderRadius: "50%", background: PHASE[i].c,
            border: `3px solid ${hexa("#000", 0.3)}` }} />
        ))}
      </div>
      {/* ⭐⭐ THE GIRDERS LAND ONLY WHERE THE LINE ALREADY IS. Each one drops on
          its own beat and none of them may be ahead of `drawn` — the rule the
          scene is about, enforced in the geometry rather than asserted. */}
      {[0, 1, 2, 3].map(i => {
        const at = (i + 1) / 5;
        const k = Math.max(0, Math.min(1, built * 5 - i));
        if (drawn < at || k <= 0) return null;
        return (
          <div key={"gd" + i} style={{ position: "absolute", left: (40 + i * 142) * s,
            top: 30 * s + (1 - k) * -190 * s, width: 128 * s, height: 26 * s,
            opacity: Math.min(1, k * 2.2),
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, -0.42)} 100%)`,
            border: `3px solid ${hexa("#000", 0.42)}`, transform: `rotate(${(1 - k) * 12 - 2.4}deg)` }} />
        );
      })}
      {/* the mode selector — a real two-position rocker, thrown at the top */}
      <div style={{ position: "absolute", left: W2 - 150 * s, top: -34 * s, width: 132 * s,
        height: 54 * s, borderRadius: 7, background: dkh(SLATE, -0.4),
        border: `4px solid ${hexa("#000", 0.44)}` }} />
      <div style={{ position: "absolute", left: W2 - 142 * s + mode * 62 * s, top: -26 * s,
        width: 58 * s, height: 38 * s, borderRadius: 5,
        background: mode > 0.5 ? PHASE[2].c : dkh(HALLSTEEL, -0.2),
        border: `3px solid ${hexa("#000", 0.4)}` }} />
    </div>
  );
};

/** ⭐ DECK 3 · THE DOOR AND THE HOUSE PLATE — "drop a CLAUDE.md in and it is
    loaded at the start of every session." A cast plate bolted beside the deck's
    door; every body that comes through reads it and is kitted on the way past.
    `bolt` seats the plate, `pass` is how far the shift has come through. */
export const DeckDoor: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  bolt?: number; glow?: number }> = ({ x, y, f, s = 1, z = 50, bolt = 0, glow = 0 }) => {
  const DW = 250 * s, DH = 330 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - DH, width: DW + 220 * s, height: DH, zIndex: z }}>
      {/* ⭐ THE DOORWAY IS A HOLE, and a hole reads because the room STOPS at it
          ([[feedback_a_lit_rectangle_is_a_screen]]): full height, square
          corners, and light spilling onto the deck in front of it. */}
      {/* ⛔⛔ 24s: THE DOORWAY WAS A BLACK RECTANGLE. Alex: *"the thing those little
          sprites come out of is too dark, it needs to be interesting and not just
          black."* Right — I made it a pure `#04060A` hole on the theory that a
          room STOPS at a hole, and what I actually built was a void with people
          appearing out of it.
          ⭐ IT IS A LIT CORRIDOR NOW. Receding wall bands get smaller and warmer
          toward a bright far end, so there is somewhere real behind the door and
          each body walks OUT OF SOMEWHERE instead of out of nothing. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: DW, height: DH,
        background: `linear-gradient(180deg, #12181E 0%, #1C242C 62%, #0A0E12 100%)`,
        border: `12px solid ${dkh(HALLSTEEL, -0.34)}`, overflow: "hidden" }}>
        {/* the corridor's receding bands */}
        {[0, 1, 2, 3, 4].map(i => {
          const k = i / 5, inset = k * 0.34;
          return (
            <div key={"cr" + i} style={{ position: "absolute",
              left: DW * inset, top: DH * inset * 0.6,
              width: DW * (1 - inset * 2), height: DH * (1 - inset * 1.2),
              border: `${(5 - i) * s}px solid ${hexa("#F5C77E", 0.06 + k * 0.20)}`,
              borderRadius: 3 }} />
          );
        })}
        {/* the far end, warm and bright — the thing they are coming from */}
        <div style={{ position: "absolute", left: DW * 0.34, top: DH * 0.20,
          width: DW * 0.32, height: DH * 0.62, borderRadius: 4,
          background: `linear-gradient(180deg, #FFE9B8 0%, ${mxh(SODIUM, 0.5)} 60%, ${dkh(SODIUM, -0.2)} 100%)`,
          boxShadow: `0 0 ${46 * s}px ${hexa(SODIUM, 0.7)}` }} />
        {/* a shift of silhouettes waiting in it, small and stepping */}
        {[0, 1, 2].map(i => (
          <div key={"sil" + i} style={{ position: "absolute",
            left: DW * (0.38 + i * 0.08), bottom: DH * 0.06,
            width: 26 * s - i * 4 * s, height: 46 * s - i * 7 * s, borderRadius: 4,
            background: hexa("#0A0E12", 0.82),
            transform: `translateY(${Math.sin(f / 8 + i * 1.4) * 3}px)` }} />
        ))}
        {/* the ceiling strip lights running away from you */}
        {[0, 1, 2].map(i => (
          <div key={"cl" + i} style={{ position: "absolute", left: DW * (0.30 + i * 0.05),
            top: DH * (0.06 + i * 0.05), width: DW * (0.40 - i * 0.1), height: 6 * s - i,
            borderRadius: 2, background: hexa("#FFE9B8", 0.5 - i * 0.12) }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 14 * s, top: 14 * s, width: DW - 28 * s,
        height: DH * 0.5, background: `linear-gradient(180deg, ${hexa(SODIUM, 0.34)} 0%, ${hexa(SODIUM, 0)} 100%)` }} />
      <div style={{ position: "absolute", left: -14 * s, top: DH - 10 * s, width: DW + 28 * s,
        height: 74 * s, zIndex: 1,
        background: `linear-gradient(180deg, ${hexa(SODIUM, 0.38)} 0%, ${hexa(SODIUM, 0)} 100%)`,
        clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)" }} />

      {/* ⭐⭐ THE HOUSE PLATE — cast, bolted, and it LIGHTS when a body reads it */}
      <div style={{ position: "absolute", left: DW + 26 * s, top: 38 * s + (1 - bolt) * -160 * s,
        width: 176 * s, height: 206 * s, borderRadius: 4, zIndex: 6,
        transform: `rotate(${(1 - bolt) * -9}deg)`, opacity: Math.min(1, bolt * 2),
        /* ⛔ IT READ AS A PALE YELLOW RECTANGLE under the deck lamp — a cast
           plate is DARK metal with bright raised faces, not a light panel, and
           without that contrast it is exactly the flat labelled rectangle this
           scene was rebuilt to get rid of. */
        /* ⛔ IT READ OLIVE ON GREEN. Against the `runs` palette a mid brass has
           almost no separation — the plate needs to be nearly BLACK metal so its
           raised faces are the only bright thing on it. */
        background: `linear-gradient(164deg, #4A3A18 0%, #2A2008 44%, #100C04 100%)`,
        /* ⛔ `dkh(BRASS, -0.74)` came out a bright GREEN edge against the runs
           palette — a lit rectangle outline, which is the exact read this scene
           exists to remove. An explicit near-black is not a guess. */
        border: `6px solid #1A1206`,
        boxShadow: glow > 0.02 ? `0 0 ${26 * glow}px ${hexa(BRASS, 0.8 * glow)}` : SH_D }}>
        {/* ⛔⛔⛔ AND THE ABSTRACT VERSION OVERSHOT. Alex: *"that doesn't look like
            a CLAUDE.md file though, it looks kinda random bad."* Right — a brass
            plate with a hard hat, a tool belt and a banded lug cast on it says
            nothing whatsoever about a markdown file sitting in a repo.
            ⭐ THE DISTINCTION I HAD COLLAPSED: "no text in a hook animation" and
            "a scene must not be six labels on flat panels" are both real rules,
            and NEITHER of them says an object may not carry its own NAME. A file
            is recognised by its filename. Stripping it did not make the prop
            more visual, it made it unidentifiable.
            ⭐ SO IT IS A FILE NOW: page proportions, a plate header carrying
            `CLAUDE.md` in mono, a markdown body (an H1 rule, three bulleted
            rules, an indented line) engraved into the metal, and the Claude
            mark. Still a cast object you can drop and bolt — but one you can
            name in half a second. */}

        {/* the header band with the filename engraved */}
        <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: 156 * s,
          height: 40 * s, borderRadius: 4 * s,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, -0.42)} 100%)`,
          boxShadow: `inset 0 ${2 * s}px 0 ${hexa("#FFEFC0", 0.42)}`,
          display: "flex", alignItems: "center", gap: 6 * s, paddingLeft: 7 * s }}>
          <div style={{ width: 24 * s, height: 24 * s, borderRadius: 5 * s, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 18 * s, height: 18 * s, objectFit: "contain",
                transform: `rotate(${f * 4.6}deg)` }} />
          </div>
          <div style={{ ...mono(Math.round(17 * s), 800), color: "#1A1206",
            letterSpacing: "0.02em", textShadow: `0 ${1.5 * s}px 0 ${hexa("#FFEFC0", 0.55)}` }}>
            {R.mdFile}
          </div>
        </div>

        {/* the H1 rule under it, the way a markdown file opens */}
        <div style={{ position: "absolute", left: 14 * s, top: 58 * s, width: 148 * s,
          height: 5 * s, background: hexa("#17120A", 0.72),
          boxShadow: `0 ${2 * s}px 0 ${hexa("#FFEFC0", 0.5)}` }} />

        {/* ⭐ THE BODY — three bulleted rules and an indented continuation, cast
            in relief. It reads as a written file at a glance and the three
            colours still map to the three fittings the shift picks up in S8. */}
        {[0, 1, 2].map(i => (
          <React.Fragment key={"md" + i}>
            <div style={{ position: "absolute", left: 16 * s, top: (74 + i * 34) * s,
              width: 11 * s, height: 11 * s, borderRadius: 2, background: PHASE[i + 1].c,
              border: `2px solid ${hexa("#000", 0.4)}` }} />
            <div style={{ position: "absolute", left: 34 * s, top: (76 + i * 34) * s,
              width: (120 - i * 24) * s, height: 8 * s, borderRadius: 2,
              background: hexa("#17120A", 0.78),
              boxShadow: `0 ${2 * s}px 0 ${hexa("#FFEFC0", 0.5)}` }} />
            <div style={{ position: "absolute", left: 44 * s, top: (89 + i * 34) * s,
              width: (86 - i * 16) * s, height: 6 * s, borderRadius: 2,
              background: hexa("#17120A", 0.5),
              boxShadow: `0 ${2 * s}px 0 ${hexa("#FFEFC0", 0.34)}` }} />
          </React.Fragment>
        ))}
        {/* a fenced block at the foot, because a real one always has one */}
        <div style={{ position: "absolute", left: 16 * s, top: 180 * s, width: 144 * s,
          height: 18 * s, borderRadius: 3, background: hexa("#0C0A05", 0.62),
          border: `2px solid ${hexa("#17120A", 0.7)}` }}>
          <div style={{ position: "absolute", left: 6 * s, top: 6 * s, width: 46 * s,
            height: 6 * s, borderRadius: 2, background: hexa("#6FD3A8", 0.85) }} />
          <div style={{ position: "absolute", left: 58 * s, top: 6 * s, width: 30 * s,
            height: 6 * s, borderRadius: 2, background: hexa("#E4A548", 0.85) }} />
        </div>
        {/* its four bolts */}
        {[[8, 8], [154, 8], [8, 184], [154, 184]].map((b, i) => (
          <div key={"bt" + i} style={{ position: "absolute", left: (b[0] as number) * s,
            top: (b[1] as number) * s, width: 15 * s, height: 15 * s, borderRadius: "50%",
            background: dkh(BRASS, -0.6), border: `2px solid ${hexa("#000", 0.4)}` }} />
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   15 · THE POUR — and the answer to "it's just squares and rectangles".

   ⛔⛔⛔ TWO NOTES AT ONCE, and they have the same root.
     *"at 7 seconds it needs to be more interesting, it's too boring"* — frame
     210, which is S2 scene-local f38 ([[feedback_fix_the_named_second]]: a
     flagged timestamp is a FRAME, convert before touching anything). S2 was a
     green room with two flat document panels in it, the exact defect the body
     rebuild exists to remove, and the only body scene I had not yet reached.
     *"a lot of the animations are not good like it's just squares and
     rectangles"* — fair, and it is a drawing habit, not a one-scene bug. Every
     prop in this reel is `div`s with gradients, so every prop is a box with a
     bevel on it. A shape reads as MADE when its silhouette is not a rectangle:
     bellies, tapers, trunnions, arcs, funnels, wheels.

   ⭐ SO S2 BECOMES A POUR. The VO is *"the exact rules Anthropic's own engineers
   use"* — provenance — and the strongest image of provenance is that the rules
   are CAST, in this building, by the people who use them. A bellied crucible
   tips on its trunnions, a bright stream arcs into three moulds, and three
   plates come out glowing. There is not one rectangle in the event.
   ====================================================================== */

/** the crucible on its yoke. `tip` 0..1 rotates it about the trunnions, which is
    the whole mechanism — a vessel that pours by TIPPING, not by opening a hole. */
export const Crucible: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  tip?: number; heat?: number }> = ({ x, y, f, s = 1, z = 50, tip = 0, heat = 1 }) => {
  const D = 250 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: D * 1.5, height: D * 1.4, zIndex: z }}>
      {/* the yoke — two arms and a crossbar, arriving from the gantry above */}
      <div style={{ position: "absolute", left: D * 0.10, top: -D * 0.42, width: D * 1.0,
        height: 16 * s, borderRadius: 8, background: dkh(STEEL, -0.3) }} />
      {[0.10, 1.02].map((ax, i) => (
        <div key={"ym" + i} style={{ position: "absolute", left: D * ax, top: -D * 0.40,
          width: 15 * s, height: D * 0.56, borderRadius: 7, background: dkh(STEEL, -0.24) }} />
      ))}
      {/* the hook and its chain, so the ladle hangs from something */}
      <div style={{ position: "absolute", left: D * 0.54, top: -D * 0.86, width: 44 * s,
        height: 44 * s, borderRadius: "50%", border: `11px solid ${dkh(STEEL, -0.2)}` }} />

      {/* ⭐⭐ THE BELLY. A crucible is read entirely from its silhouette: wide at
          the lip, bulging at the waist, tucked at the foot. This is a border-radius
          shape, NOT a box — which is the point of the whole prop. */}
      <div style={{ position: "absolute", left: D * 0.16, top: 0, width: D * 0.9, height: D * 0.84,
        borderRadius: `${D * 0.10}px ${D * 0.10}px ${D * 0.46}px ${D * 0.46}px`,
        transformOrigin: `${D * 0.45}px ${D * 0.06}px`,
        /* ⛔ 78 DEGREES PUT THE BELLY ON ITS SIDE and the silhouette stopped
           reading as a vessel — it went black blob. A ladle pours at about 45;
           past that you are looking at the underside of it. */
        transform: `rotate(${tip * 44}deg)`,
        background: `linear-gradient(102deg, #2A3138 0%, #4C565F 34%, #191F25 78%, #0C1015 100%)`,
        border: `5px solid ${hexa("#000", 0.5)}`, boxShadow: `inset 0 ${-10 * s}px ${18 * s}px ${hexa("#000", 0.5)}` }}>
        {/* its bands and the pouring lip */}
        {[0.24, 0.52].map((by, i) => (
          <div key={"bd" + i} style={{ position: "absolute", left: -4, top: D * 0.84 * by,
            right: -4, height: 13 * s, background: dkh(STEEL, -0.36) }} />
        ))}
        <div style={{ position: "absolute", left: -D * 0.06, top: -6 * s, width: D * 0.3,
          height: 22 * s, borderRadius: `${D * 0.14}px 0 0 ${D * 0.06}px`,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, -0.5)} 100%)` }} />
        {/* the melt inside, which only shows once she is tipped */}
        <div style={{ position: "absolute", left: 6 * s, top: 8 * s, width: D * 0.9 - 22 * s,
          height: 30 * s, borderRadius: "50%", opacity: Math.min(1, tip * 3) * heat,
          background: `radial-gradient(60% 100% at 50% 40%, #FFF3C4 0%, #F5A623 46%, #C2410C 100%)`,
          boxShadow: `0 0 ${34 * s}px ${hexa("#F5A623", 0.8)}` }} />
      </div>
      {/* the trunnion caps — round, and they are what says it PIVOTS */}
      {[0.10, 1.02].map((ax, i) => (
        <div key={"tn" + i} style={{ position: "absolute", left: D * ax - 8 * s, top: D * 0.04,
          width: 34 * s, height: 34 * s, borderRadius: "50%",
          background: `radial-gradient(60% 60% at 36% 32%, ${mxh(BRASS, 0.5)} 0%, ${dkh(BRASS, -0.5)} 100%)`,
          border: `3px solid ${hexa("#000", 0.44)}` }} />
      ))}
    </div>
  );
};

/** the pour itself — a tapering arc of light from the lip to the mould, plus the
    splash where it lands. ⛔ NOT a rectangle: it narrows as it falls and it has a
    bright core inside a warm sheath. */
export const PourStream: React.FC<{ x: number; y: number; h: number; f: number; on: number;
  z?: number; sway?: number }> = ({ x, y, h, f, on, z = 60, sway = 0 }) => {
  if (on <= 0.02) return null;
  const H2 = h * Math.min(1, on * 1.6);
  return (<>
    {Array.from({ length: 16 }, (_, i) => {
      const t = i / 16, w = (34 - t * 21) * (0.85 + Math.sin(f / 2.4 + i) * 0.15);
      return (
        <div key={"ps" + i} style={{ position: "absolute", left: x - w / 2 + Math.sin(f / 3.6 + t * 3) * sway * (0.3 + t),
          top: y + t * H2, width: w, height: H2 / 15 + 2, zIndex: z,
          borderRadius: w / 2,
          background: `linear-gradient(90deg, ${hexa("#C2410C", 0.9)} 0%, #FFF6D2 40%, #F5A623 72%, ${hexa("#C2410C", 0.9)} 100%)`,
          boxShadow: `0 0 ${16}px ${hexa("#F5A623", 0.8)}` }} />
      );
    })}
    {/* the glow it throws on everything near it */}
    <div style={{ position: "absolute", left: x - 210, top: y + H2 - 150, width: 420, height: 300,
      zIndex: z - 1, borderRadius: "50%", opacity: Math.min(1, on * 1.4),
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#F5A623", 0.55)} 0%, ${hexa("#C2410C", 0.18)} 46%, transparent 72%)` }} />
    {/* the splash — short arcs thrown back up out of the mould */}
    {Array.from({ length: 9 }, (_, i) => {
      const t = ((f * 1.7 + i * 7) % 22) / 22;
      return (
        <div key={"sp" + i} style={{ position: "absolute",
          left: x + (i - 4) * 15 * (0.4 + t * 1.5), top: y + H2 - t * 74 + t * t * 96,
          width: 9 - t * 5, height: 9 - t * 5, borderRadius: "50%", zIndex: z + 1,
          opacity: (1 - t) * on, background: i % 2 ? "#FFF3C4" : "#F5A623" }} />
      );
    })}
  </>);
};

/** a sand mould with a funnel top — a taper, not a box — and the plate that
    comes out of it, glowing and then cooling to cast brass. */
export const Mould: React.FC<{ x: number; y: number; s?: number; z?: number; ph: number;
  fill?: number; lift?: number; cool?: number; f?: number }> =
  ({ x, y, s = 1, z = 50, ph, fill = 0, lift = 0, cool = 0, f = 0 }) => {
  const MW = 168 * s, MH = 150 * s;
  const glow = Math.max(0, 1 - cool);
  return (
    <div style={{ position: "absolute", left: x, top: y - MH, width: MW, height: MH + 200 * s, zIndex: z }}>
      {/* ⭐ THE FUNNEL — the taper is what makes it a mould and not a crate */}
      <div style={{ position: "absolute", left: 0, top: 0, width: MW, height: 54 * s,
        background: `linear-gradient(180deg, #8A7F66 0%, #5E5646 100%)`,
        clipPath: "polygon(0 0, 100% 0, 76% 100%, 24% 100%)" }} />
      {/* the box of sand, banded */}
      <div style={{ position: "absolute", left: MW * 0.14, top: 50 * s, width: MW * 0.72,
        height: MH - 50 * s, borderRadius: `${6 * s}px ${6 * s}px ${16 * s}px ${16 * s}px`,
        background: `linear-gradient(180deg, #6E6653 0%, #403C31 100%)`,
        border: `4px solid ${hexa("#000", 0.42)}` }} />
      {[0.34, 0.68].map((by, i) => (
        <div key={"mb" + i} style={{ position: "absolute", left: MW * 0.10, top: 50 * s + (MH - 50 * s) * by,
          width: MW * 0.80, height: 11 * s, borderRadius: 3, background: dkh(STEEL, -0.34) }} />
      ))}
      {/* what is in it, glowing through the funnel throat */}
      {fill > 0.02 && (
        <div style={{ position: "absolute", left: MW * 0.26, top: 44 * s, width: MW * 0.48,
          height: 22 * s, borderRadius: "50%", opacity: Math.min(1, fill * 2),
          background: `radial-gradient(60% 100% at 50% 50%, #FFF6D2 0%, #F5A623 52%, #C2410C 100%)`,
          boxShadow: `0 0 ${30 * s}px ${hexa("#F5A623", 0.9)}` }} />
      )}
      {lift > 0.02 && Array.from({ length: Math.max(1, Math.round(lift * 9)) }, (_, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: MW * 0.44,
          top: -lift * 330 * s - 30 * s - i * 30 * s, width: 34 * s, height: 26 * s,
          borderRadius: "50%", border: `8px solid ${dkh(STEEL, i % 2 ? -0.34 : -0.16)}`,
          transform: `rotate(${i % 2 ? 66 : 16}deg)`, opacity: Math.min(1, lift * 3) }} />
      ))}
      {/* ⭐⭐ THE CAST PLATE, LIFTED OUT AND COOLING. Round-cornered, bevelled,
          with the phase's own mark raised on it — cast metal, not a card. */}
      {lift > 0.02 && (
        /* ⭐ THE PLATES ARE THE SECOND HALF OF THE SCENE. At 134x116 rising
           232px they were three small tiles drifting; the pour ends at f50 and
           these carry the remaining 47 frames on their own, so they are bigger
           and they travel further — and a hoist chain above each one gives the
           rise a cause instead of a float ([[ANIMATION-QUALITY §12]]). */
        <div style={{ position: "absolute", left: MW * 0.02, top: -lift * 330 * s,
          width: MW * 0.96, height: 152 * s, borderRadius: 12 * s,
          transform: `rotate(${(1 - lift) * -8}deg)`, opacity: Math.min(1, lift * 3),
          background: `linear-gradient(160deg, ${lerpHex("#FFD9A0", mxh(BRASS, 0.4), cool)} 0%, ${lerpHex("#E8842A", dkh(BRASS, -0.4), cool)} 100%)`,
          border: `4px solid ${lerpHex("#C2410C", dkh(BRASS, -0.6), cool)}`,
          boxShadow: `0 0 ${34 * s * glow}px ${hexa("#F5A623", 0.85 * glow)}` }}>
          {/* ⭐⭐ THE SPINNING CLAUDE MARK, CAST INTO THE PLATE. Alex, on 8s:
              *"each of those papers should have spinning claude logos on them."*
              It was a plain phase-coloured dot, which said nothing about whose
              rules these are — and provenance is the whole point of the scene.
              The mark turns on its own clock per plate, so three of them never
              line up into one shared wave ([[feedback_a_sway_is_the_whole_cast]]). */}
          <div style={{ position: "absolute", left: 10 * s, top: 12 * s, width: 40 * s,
            height: 40 * s, borderRadius: 9 * s, background: "#FFFFFF",
            border: `3px solid ${hexa("#000", 0.42)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 ${2 * s}px 0 ${hexa("#FFEFC0", 0.5)}` }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 30 * s, height: 30 * s, objectFit: "contain",
                transform: `rotate(${f * 5.2 + ph * 71}deg)` }} />
          </div>
          {[0, 1].map(i => (
            <div key={i} style={{ position: "absolute", left: 54 * s, top: (22 + i * 22) * s,
              width: (72 - i * 24) * s, height: 9 * s, borderRadius: 2,
              background: hexa("#2A2214", 0.5), boxShadow: `0 ${2 * s}px 0 ${hexa("#FFE7B0", 0.4)}` }} />
          ))}
          <div style={{ position: "absolute", left: 12 * s, bottom: 12 * s, width: 90 * s,
            height: 7 * s, borderRadius: 2, background: hexa("#2A2214", 0.34) }} />
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   16 · THE APPROVAL STAMP — S1's replacement.

   ⛔⛔⛔ THE THREE-DECK ESTABLISHING SHOT IS DEAD. It was flagged at 4s, then at
   5s: *"needs to be completely redone... not hierarchical and not easy to see
   what's even going on in that scene."* I had written the same verdict myself
   two turns earlier — *"reads as a technical cutaway"* — and then kept the shot
   anyway, which is the actual error here.
   ⭐ THE DIAGNOSIS: three decks in one frame forces every machine to about 180px
   and puts a lattice of grey steel between the viewer and all of them. A
   hierarchy does not have to be DRAWN as a stacked diagram; it is felt through
   the ORDER of the scenes. So S1 gets one object, one action, at full frame.
   ⭐ AND THE ACTION IS THE LINE. "These aren't just some random prompts, these
   are the exact rules Anthropic's engineers use" is a claim about AUTHORITY, and
   the single most legible picture of authority is a stamp coming down. It rises,
   it hangs, it SLAMS — anticipation, hit, ring-out — and nobody has to decode it.
   ====================================================================== */
export const ApprovalStamp: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  /** 0 = up at the top of its travel, 1 = struck home */
  drop?: number; ink?: number }> =
  ({ x, y, f, s = 1, z = 60, drop = 0, ink = 0 }) => {
  const HW = 300 * s, HH = 190 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - 560 * s + drop * 300 * s,
      width: HW + 120 * s, height: 560 * s, zIndex: z }}>
      {/* the ram it hangs from, telescoping out of the top crop */}
      <div style={{ position: "absolute", left: HW * 0.36, top: -420 * s, width: 96 * s,
        height: 640 * s - drop * 60 * s,
        background: `linear-gradient(90deg, #10151A 0%, #46525E 40%, #1A222A 100%)`,
        border: `4px solid ${hexa("#000", 0.5)}` }} />
      {/* its guide collar, which is what says the thing TRAVELS */}
      <div style={{ position: "absolute", left: HW * 0.26, top: 128 * s, width: 156 * s,
        height: 54 * s, borderRadius: 7 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.36)} 0%, ${dkh(STEEL, -0.5)} 100%)`,
        border: `4px solid ${hexa("#000", 0.5)}` }} />
      {/* ⭐ THE HEAD — a heavy chamfered block, brass-faced, with a real bevel */}
      <div style={{ position: "absolute", left: 0, top: 178 * s, width: HW, height: HH,
        borderRadius: 10 * s,
        /* ⛔⛔ THIRD TIME: I PAINTED THE MACHINE THE HERO'S OWN COLOUR. The press
           went slate → oxide and camouflaged him; this head shipped oxide from
           the start and did it again. The clay mascot owns red in this reel, so
           machines are DARK IRON with bright faces — that also feeds the black
           point and the mean at once ([[feedback_push_the_two_values_apart]]). */
        background: `linear-gradient(172deg, #4A555F 0%, #232C34 46%, #0C1116 100%)`,
        border: `6px solid ${hexa("#000", 0.58)}`,
        boxShadow: `inset 0 ${6 * s}px 0 ${hexa("#C6D2DC", 0.30)}` }} />
      {/* the knurl bands */}
      {[0.30, 0.52].map((by, i) => (
        <div key={"kn" + i} style={{ position: "absolute", left: 8 * s, top: 178 * s + HH * by,
          width: HW - 16 * s, height: 13 * s, background: hexa("#000", 0.34) }} />
      ))}
      {/* ⭐⭐ THE DIE FACE — the mark it leaves. A ring and a burst, cast proud,
             which is a MARK and not a word ([[feedback_substitute_the_text_never_delete_it]]). */}
      <div style={{ position: "absolute", left: HW * 0.10, top: 178 * s + HH - 34 * s,
        width: HW * 0.80, height: 46 * s, borderRadius: 6 * s,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.5)} 0%, ${dkh(BRASS, -0.42)} 100%)`,
        border: `4px solid ${hexa("#000", 0.5)}` }} />
      <div style={{ position: "absolute", left: HW * 0.40, top: 178 * s + HH - 24 * s,
        width: 60 * s, height: 26 * s, borderRadius: "50%",
        border: `7px solid ${dkh(BRASS, -0.62)}` }} />
      {/* the ink it carries, wetter as it strikes */}
      <div style={{ position: "absolute", left: HW * 0.12, top: 178 * s + HH + 8 * s,
        width: HW * 0.76, height: 10 * s, borderRadius: 5 * s, opacity: 0.3 + ink * 0.7,
        background: `linear-gradient(90deg, transparent 0%, ${PHASE[2].c} 22%, ${PHASE[2].c} 78%, transparent 100%)` }} />
    </div>
  );
};

/** the bench the stamp lands on, and the card under it. `hit` rings the timber. */
export const StampBench: React.FC<{ x: number; y: number; w?: number; z?: number; hit?: number }> =
  ({ x, y, w: ww = 720, z = 40, hit = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y - 96 - hit * 7, width: ww, height: 150, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 46,
      background: `linear-gradient(180deg, ${mxh(COUNTERTOP, 0.30)} 0%, ${dkh(COUNTERTOP, -0.30)} 100%)`,
      border: `5px solid ${hexa("#000", 0.44)}`, borderRadius: 5 }} />
    <div style={{ position: "absolute", left: 0, top: 44, width: ww, height: 16,
      background: hexa("#000", 0.42) }} />
    {[0.06, 0.82].map((lx, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: ww * lx, top: 58, width: 62,
        height: 92, background: `linear-gradient(90deg, ${dkh(COUNTERTOP, -0.5)} 0%, ${mxh(COUNTERTOP, 0.12)} 46%, ${dkh(COUNTERTOP, -0.56)} 100%)` }} />
    ))}
  </div>
);

/* =========================================================================
   17 · THE CHORD — two keys that come together.

   ⛔⛔ Alex, on 14s: *"I need to see something that represents Shift + Tab, like
   maybe two pieces coming together."* The scene had a three-position selector,
   which showed the RESULT of the chord and never the chord itself — and by the
   flagged frame the lever had already latched, so what was on screen was a lever
   at rest with the hero stranded at the far side of the panel.
   ⭐ HIS NOTE IS THE RIGHT MECHANISM. A chord is two keys pressed AT ONCE, so it
   is two masses arriving at the same instant: a wide SHIFT block driving in from
   the left, a TAB block from the right, and a real strike where they meet. Each
   strike advances the mode one detent, which is also the thing the docs are
   explicit about and everyone gets wrong — Shift+Tab CYCLES, it does not toggle.
   ⛔ THE GLYPHS ARE MARKS, NOT WORDS: an up-arrow and a tab-arrow are drawn as
   geometry, so nothing here is text on a rectangle.
   ====================================================================== */
export const ChordKeys: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  /** 0 = fully apart, 1 = struck together */
  close?: number; flash?: number }> =
  ({ x, y, f, s = 1, z = 60, close = 0, flash = 0 }) => {
  const KH = 150 * s, GAP = 300 * s;
  const dL = (1 - close) * -GAP, dR = (1 - close) * GAP;
  const cap = (w: number, dx: number, glyph: "shift" | "tab") => (
    <div style={{ position: "absolute", left: dx, top: 0, width: w, height: KH,
      transform: `translateY(${close * 5 * s}px)` }}>
      {/* the cap's skirt — a key reads from its bevel and its shadow */}
      <div style={{ position: "absolute", left: 0, top: 14 * s, width: w, height: KH - 14 * s,
        borderRadius: 12 * s,
        background: `linear-gradient(180deg, #2C3640 0%, #10161B 100%)` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: KH - 22 * s,
        borderRadius: 12 * s,
        background: `linear-gradient(178deg, #6C7A87 0%, #3E4A55 44%, #232C34 100%)`,
        border: `5px solid ${hexa("#000", 0.5)}`,
        boxShadow: `inset 0 ${5 * s}px 0 ${hexa("#C6D2DC", 0.34)}` }} />
      {/* the dished top */}
      <div style={{ position: "absolute", left: 12 * s, top: 12 * s, width: w - 24 * s,
        height: KH - 54 * s, borderRadius: 9 * s,
        background: `linear-gradient(178deg, ${hexa("#0A0F14", 0.32)} 0%, ${hexa("#8FA0AE", 0.12)} 100%)` }} />
      {/* ⭐ THE GLYPH, DRAWN. shift = a fat up-arrow. tab = an arrow into a wall. */}
      {glyph === "shift" ? (
        <div style={{ position: "absolute", left: w / 2 - 34 * s, top: KH * 0.24,
          width: 68 * s, height: 74 * s, background: "#E8F0F6",
          clipPath: "polygon(50% 0, 100% 46%, 74% 46%, 74% 100%, 26% 100%, 26% 46%, 0 46%)" }} />
      ) : (
        <>
          <div style={{ position: "absolute", left: w / 2 - 40 * s, top: KH * 0.42,
            width: 56 * s, height: 16 * s, background: "#E8F0F6" }} />
          <div style={{ position: "absolute", left: w / 2 - 4 * s, top: KH * 0.30,
            width: 34 * s, height: 40 * s, background: "#E8F0F6",
            clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
          <div style={{ position: "absolute", left: w / 2 + 34 * s, top: KH * 0.26,
            width: 14 * s, height: 48 * s, background: "#E8F0F6" }} />
        </>
      )}
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y - KH, width: 640 * s, height: KH, zIndex: z }}>
      {/* the rails they ride in on, so the masses have somewhere to come FROM */}
      <div style={{ position: "absolute", left: -420 * s, top: KH * 0.62, width: 1500 * s,
        height: 12 * s, background: dkh(HALLSTEEL, -0.4) }} />
      {cap(300 * s, dL, "shift")}
      {cap(228 * s, 330 * s + dR, "tab")}
      {/* ⭐ THE STRIKE. A hard ring at the seam plus a shock rim, so the two
             masses ARRIVING is the loudest thing in the frame. */}
      {flash > 0.02 && (<>
        <div style={{ position: "absolute", left: 300 * s - 26 * s, top: KH * 0.18,
          width: 66 * s, height: KH * 0.68, borderRadius: 8 * s, opacity: flash,
          background: `linear-gradient(90deg, transparent 0%, #FFF6D2 40%, #FFF6D2 60%, transparent 100%)`,
          filter: `blur(${3 * s}px)` }} />
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <div key={"sp" + i} style={{ position: "absolute",
              left: 316 * s + Math.cos(a) * (34 + (1 - flash) * 92) * s,
              top: KH * 0.5 + Math.sin(a) * (26 + (1 - flash) * 74) * s,
              width: 10 * s * flash, height: 10 * s * flash, borderRadius: "50%",
              opacity: flash, background: i % 2 ? "#FFE9A8" : "#C6D2DC" }} />
          );
        })}
      </>)}
    </div>
  );
};
