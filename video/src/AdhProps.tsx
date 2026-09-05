import React from "react";
import { Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, lerpHex, mono, ui,
  squash, costumeFor,
  CLAY, GOLD, GREEN, RED, INK, BRASS, COPPER, BONE, STEEL, SLATE, ROSE, MUTE, SKY, VIOLET, TEAL,
  TERM, TERM2, TERM3, UISH, UISH2, UILINE, DIFFG, DIFFR, CARET, OKGREEN, WARN, LINKB,
  CREAM_TICKET, flameC, TASKS, R, SYN, SYN_MIX,
} from "./AdhWorld";

/* ===========================================================================
   REEL 136 · "ADHD" — THE PROPS.  REV 2, THE SESSION.

   ⛔⛔⛔ REV 1 WAS A KITCHEN AND ALEX REJECTED IT: *"it's like a cooking theme…
   it should be just a theme related to Claude… more on topic with AI."* The
   old file (pans, a hood, a range, an order spike, a cake trolley) is kept at
   /tmp only as a reference and NOTHING is imported from it.

   ⭐ EVERY PROP HERE IS AN OBJECT CLAUDE CODE ACTUALLY HAS. That is the whole
   point of the rebuild (`feedback_the_world_must_speak_the_subjects_brand`):
   the thing that TRAVELS has to be the subject's own UI object, not a metaphor
   for it. So the hero is the TODO LIST with its checkboxes, the villain is a
   CHECKBOX THAT TICKS ITSELF, and the fix is a LEDGER whose rows only close
   when a COMMAND has run and its OUTPUT matched.

   ⛔ DRAW, DON'T STACK (`feedback_props_need_real_drawing`): a pane has a title
   bar, a chip, ragged text lines of real varying widths, a caret and a state
   lamp; a checkbox has a bezel, an inner shadow, a drawn tick path and a
   struck-out state; the todo list has a header, a rule, six rows and a receipt
   column. A rounded rectangle with a word on it is not a prop.
   ⛔ MATTE ONLY: solid paints, dark drop shadows, no emissive glow anywhere.
   ⛔ A prop nested in something smaller than the panel takes its size from `s`,
      never from panel constants.
   ⛔ TEXT IS DECORATION AT THIS SIZE. Every line of "code" is a BAR, not a
      glyph, except the few strings the ledger `R` allows. Fake glyphs at 8px
      read as mush and cost the same as a bar (`feedback_graphical_over_textual`).
   ========================================================================= */

/* ---- the real mark -------------------------------------------------------- */
export const MarkTile: React.FC<{ x?: number; y?: number; d: number; logo?: "claude.svg" | "github.svg";
  z?: number; radius?: number; rel?: boolean; o?: number }> =
  ({ x = 0, y = 0, d, logo = "claude.svg", z = 80, radius, rel = false, o = 1 }) => (
  <div style={{ position: rel ? "relative" : "absolute", left: rel ? undefined : x,
    top: rel ? undefined : y, width: d, height: d, borderRadius: radius ?? d * 0.22,
    background: "#FFFFFF", border: `${Math.max(2, d * 0.04)}px solid #E8DCC0`, boxShadow: SH,
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: z, opacity: o,
    flexShrink: 0 }}>
    <Img src={staticFile("logos/" + logo)} style={{ width: d * 0.64, height: d * 0.64, objectFit: "contain" }} />
  </div>
);

/* ---- a ragged run of "code" lines, as BARS ------------------------------- */
/** ⭐ The texture the whole world is made of. `seed` makes a room's scrollback
    stable across frames; `run` (0..1) reveals lines left to right so a pane can
    be seen to be WORKING rather than just being on. */
export const CodeLines: React.FC<{ x: number; y: number; w: number; n: number; gap?: number;
  h?: number; c?: string; o?: number; seed?: number; run?: number; z?: number; indent?: boolean;
  f?: number; scroll?: number; syntax?: number; dark?: number }> =
  ({ x, y, w, n, gap = 14, h = 6, c = "#FFFFFF", o = 0.20, seed = 1, run = 1, z = 6, indent = true,
     f = 0, scroll = 0, syntax = 0, dark = 0 }) => {
  /* ⭐⭐⭐ A LINE IS TOKENS, NOT A BAR. Rev 2 shipped every wall and every pane as
     single-colour bars at one opacity and Alex's note was exactly that: *"too
     basic and just simple single colors."* A line is now 2-4 SEGMENTS with real
     token colours and their own widths and gaps, so the same wall carries a
     keyword violet, a string green and a number gold without a single new
     object. `syntax` 0..1 mixes between the flat bar and the tokenised line, so
     a dim background wall can stay quiet while a hero pane reads as code.
     ⛔ AND THE SCROLL IS NOT A WRAPPING COUNTER (`feedback_a_wrapping_counter_
     reads_as_chop`): lines advance a constant px/frame and the content index
     steps by exactly one as a line leaves the top, so nothing teleports. */
  const adv = scroll > 0 ? f * scroll : 0;
  const off = scroll > 0 ? adv % gap : 0;
  const base = scroll > 0 ? Math.floor(adv / gap) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: n * gap, zIndex: z,
      overflow: "hidden" }}>
      {Array.from({ length: n + (scroll > 0 ? 1 : 0) }, (_, i) => {
        const src = base + i;
        const r = rnd(seed * 31.7 + src * 7.3, 1);
        const ind = indent ? (r > 0.72 ? w * 0.14 : r > 0.44 ? w * 0.07 : 0) : 0;
        const len = (0.30 + r * 0.62) * (w - ind);
        const on = run >= (i + 1) / n - 0.001 ? 1 : Math.max(0, (run * n) - i);
        if (on <= 0) return null;
        const alpha = o * (0.62 + 0.38 * rnd(seed + src * 3.1, 1));
        const vis = len * Math.min(1, on);
        if (syntax < 0.02) {
          return <div key={i} style={{ position: "absolute", left: ind, top: i * gap - off,
            width: vis, height: h, borderRadius: h / 2,
            background: hexa(dark > 0.5 ? INK : c, alpha * (dark > 0.5 ? 1.5 : 1)) }} />;
        }
        /* 2-4 tokens per line, each its own width, gap and colour */
        const nTok = 2 + Math.floor(rnd(seed * 5.1 + src * 2.9, 1) * 3);
        let cx = 0;
        const toks: React.ReactNode[] = [];
        for (let t = 0; t < nTok; t++) {
          const rr = rnd(seed * 9.7 + src * 4.3 + t * 1.9, 1);
          const tw = vis * (0.16 + rr * 0.34);
          if (cx + tw > vis) break;
          const raw = SYN_MIX[Math.floor(rnd(seed * 2.3 + src * 6.1 + t * 3.7, 1) * SYN_MIX.length)];
          /* on a LIGHT editor the same token has to be a dark ink of the same
             hue, or the code disappears into the paper */
          const col = dark > 0.5 ? dkh(raw, 0.42) : raw;
          toks.push(
            <div key={t} style={{ position: "absolute", left: cx, top: 0, width: tw, height: h,
              borderRadius: h / 2,
              background: hexa(col, alpha * (0.85 + 0.3 * syntax)) }} />
          );
          cx += tw + h * 1.15;
        }
        return (
          <div key={i} style={{ position: "absolute", left: ind, top: i * gap - off, width: vis,
            height: h }}>{toks}</div>
        );
      })}
    </div>
  );
};

/* ---- THE CHECKBOX — the villain's instrument ------------------------------ */
/** ⭐⭐⭐ THE SINGLE MOST IMPORTANT OBJECT IN THE REEL. "Instead of just saying a
    task is done" IS this box being ticked. Four states, all drawn:
      k=0        empty, a bezel with an inner shadow
      k=1        ticked — filled, with a real drawn tick PATH, not a glyph
      proved     the tick is joined by a stamped receipt notch on its right
      struck     a diagonal strike through a tick that was never earned */
export const CheckBox: React.FC<{ x?: number; y?: number; s?: number; k?: number; proved?: number;
  struck?: number; z?: number; rel?: boolean; hue?: string }> =
  ({ x = 0, y = 0, s = 44, k = 0, proved = 0, struck = 0, z = 8, rel = false, hue = OKGREEN }) => {
  const fill = k > 0.02;
  const br = Math.max(3, s * 0.09);
  return (
    <div style={{ position: rel ? "relative" : "absolute", left: rel ? undefined : x,
      top: rel ? undefined : y, width: s, height: s, zIndex: z, flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: s * 0.2,
        background: fill ? `linear-gradient(180deg, ${mxh(hue, 0.22)}, ${dkh(hue, 0.14)})`
                         : `linear-gradient(180deg, ${UISH2}, ${UISH})`,
        border: `${br}px solid ${fill ? dkh(hue, 0.4) : hexa(INK, 0.36)}`,
        boxShadow: fill ? `inset 0 ${s * 0.06}px 0 ${hexa("#FFF", 0.22)}`
                        : `inset 0 ${s * 0.08}px ${s * 0.1}px ${hexa(INK, 0.18)}`,
        transform: `scale(${fill ? 1 : 0.94})` }} />
      {fill && (
        <svg width={s} height={s} viewBox="0 0 44 44" style={{ position: "absolute", inset: 0 }}>
          <path d="M11 23 L19 31 L34 14" fill="none" stroke="#FFFFFF" strokeWidth={6}
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={44} strokeDashoffset={44 * (1 - Math.min(1, k))} />
        </svg>
      )}
      {/* the receipt notch — only a row that RAN gets this */}
      {proved > 0.02 && (
        <div style={{ position: "absolute", left: s * 0.78, top: s * 0.26, width: s * 0.38 * proved,
          height: s * 0.5, borderRadius: 3, background: `linear-gradient(180deg, ${UISH}, ${UISH2})`,
          border: `2px solid ${hexa(INK, 0.3)}`, boxShadow: SH }} />
      )}
      {struck > 0.02 && (
        <svg width={s} height={s} viewBox="0 0 44 44" style={{ position: "absolute", inset: 0 }}>
          <path d="M6 38 L38 6" fill="none" stroke={DIFFR} strokeWidth={7} strokeLinecap="round"
            strokeDasharray={46} strokeDashoffset={46 * (1 - Math.min(1, struck))} />
        </svg>
      )}
    </div>
  );
};

/* ---- THE TODO LIST — the hero artifact ----------------------------------- */
/** ⭐⭐⭐ Claude Code's own checklist, drawn as PAPER so it is the brightest object
    in the frame and can carry the frame-0 claim plate.
    ⛔ REV 2 DREW IT WITH TWELVE ELEMENTS AND IT READ AS A WHITE RECTANGLE WITH
    BARS ON IT. The three moves from `feedback_props_need_real_drawing`: a torn
    top edge and a curl shadow give it a third face; the punched margin, the red
    margin rule, the faint ruling and the hatched receipt slots are fine
    repeated detail; and the rows now differ in silhouette because a proved row
    carries a stub the others do not. */
export const TodoList: React.FC<{ x: number; y: number; w: number; h: number; z?: number; f: number;
  ticks: boolean[]; proved?: boolean[]; struck?: boolean[]; big?: string; sub?: string;
  mode?: "todo" | "ledger"; rot?: number; o?: number; stand?: boolean; hard?: number;
  runRow?: number; runK?: number }> =
  ({ x, y, w, h, z = 78, f, ticks, proved = [], struck = [], big, sub = "TODO", mode = "todo",
     rot = 0, o = 1, stand = false, hard = -1, runRow = -1, runK = 0 }) => {
  const rowH = h * 0.108;
  const top = h * 0.30;
  const pad = w * 0.075;
  const boxS = rowH * 0.78;
  const k = w / 292;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)`, opacity: o }}>
      {/* 1 · the curl shadow under the sheet — the third face */}
      <div style={{ position: "absolute", left: w * 0.03, right: w * 0.03, bottom: -6 * k,
        height: 14 * k, borderRadius: "50%", background: hexa(INK, 0.22), filter: "blur(3px)" }} />
      {/* 2 · the sheet */}
      <div style={{ position: "absolute", inset: 0, borderRadius: w * 0.022,
        background: `linear-gradient(174deg, #FDFCF7 0%, ${UISH} 46%, ${UISH2} 82%, ${dkh(UISH2, 0.06)} 100%)`,
        boxShadow: SH_D, border: `${Math.max(2, w * 0.006)}px solid ${hexa(INK, 0.16)}` }} />
      {/* 3 · the TORN TOP EDGE — a perforated strip, the silhouette tell */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 7 * k, overflow: "hidden",
        display: "flex" }}>
        {Array.from({ length: 26 }, (_, i) => (
          <div key={"tt" + i} style={{ flex: 1, height: 7 * k, marginRight: 1,
            background: UISH2, borderRadius: `0 0 ${3 * k}px ${3 * k}px`,
            transform: `translateY(${-2 - rnd(i * 2.7, 1) * 3}px)` }} />
        ))}
      </div>
      {/* 4 · the punched margin, with inner shadow */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"pn" + i} style={{ position: "absolute", left: pad * 0.30,
          top: top + i * rowH + rowH * 0.28, width: 8 * k, height: 8 * k, borderRadius: "50%",
          background: hexa(INK, 0.14),
          boxShadow: `inset 0 ${1.4 * k}px ${1.6 * k}px ${hexa(INK, 0.3)}` }} />
      ))}
      {/* 5 · the red margin rule */}
      <div style={{ position: "absolute", left: pad * 0.72, top: h * 0.075, bottom: h * 0.05,
        width: 2 * k, background: hexa(DIFFR, 0.30) }} />
      {/* 6 · faint ruling across the sheet */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"ru" + i} style={{ position: "absolute", left: pad * 0.9, right: pad * 0.6,
          top: top + i * rowH + rowH * 0.82, height: 1, background: hexa(LINKB, 0.16) }} />
      ))}
      {/* 7 · header: the mark, the word, the tally */}
      <div style={{ position: "absolute", left: pad, top: h * 0.085, right: pad, height: h * 0.15,
        display: "flex", alignItems: "center", gap: w * 0.035 }}>
        <MarkTile rel d={h * 0.135} z={2} />
        <span style={{ ...ui(h * 0.086, 900), color: hexa(INK, 0.74), letterSpacing: 2 }}>{sub}</span>
        <span style={{ marginLeft: "auto", fontFamily: "Fraunces, serif", fontWeight: 900,
          fontSize: h * 0.155, color: INK, lineHeight: 1 }}>{big}</span>
      </div>
      {/* 8 · the header rule, double, like a real form */}
      <div style={{ position: "absolute", left: pad, right: pad, top: h * 0.245, height: 3,
        background: hexa(INK, 0.24) }} />
      <div style={{ position: "absolute", left: pad, right: pad, top: h * 0.245 + 6 * k, height: 1,
        background: hexa(INK, 0.13) }} />
      {/* 9 · the six rows */}
      {TASKS.map((t, i) => {
        const isRun = i === runRow;
        return (
          <div key={"r" + i} style={{ position: "absolute", left: pad, right: pad, top: top + i * rowH,
            height: rowH * 0.86, display: "flex", alignItems: "center", gap: w * 0.03 }}>
            <CheckBox rel s={boxS} k={ticks[i] ? 1 : 0} proved={proved[i] ? 1 : 0}
              struck={struck[i] ? 1 : 0} z={3} />
            {/* the task name as a two-tone bar with a lit top edge */}
            <div style={{ position: "relative", height: rowH * 0.32, borderRadius: rowH * 0.16,
              width: `${44 + (i * 9) % 30}%`, flexGrow: 0,
              background: `linear-gradient(180deg, ${hexa(t.c, i === hard ? 0.95 : 0.62)}, ${hexa(dkh(t.c, 0.22), i === hard ? 0.95 : 0.55)})` }}>
              <div style={{ position: "absolute", left: 2, right: 2, top: 1, height: 1.5,
                borderRadius: 1, background: hexa("#FFFFFF", 0.34) }} />
            </div>
            {/* the hard-task marker */}
            {i === hard && (
              <div style={{ width: boxS * 0.40, height: boxS * 0.40, borderRadius: 3, flexShrink: 0,
                background: `linear-gradient(180deg, ${mxh(DIFFR, 0.2)}, ${dkh(DIFFR, 0.2)})`,
                transform: "rotate(45deg)" }} />
            )}
            {/* the RECEIPT SLOT — hatched when empty, filled when the row ran */}
            <div style={{ marginLeft: "auto", width: w * 0.155, height: rowH * 0.46, borderRadius: 3,
              border: `${1.6 * k}px solid ${hexa(INK, proved[i] ? 0.3 : 0.18)}`, flexShrink: 0,
              background: proved[i]
                ? `linear-gradient(180deg, ${UISH}, ${UISH2})`
                : `repeating-linear-gradient(116deg, transparent 0 3px, ${hexa(INK, 0.10)} 3px 4.5px)` }} />
            {mode === "ledger" && (
              <div style={{ width: w * 0.10, height: rowH * 0.26, borderRadius: 2, flexShrink: 0,
                background: hexa(t.needsRun ? DIFFG : INK, t.needsRun ? 0.5 : 0.16) }} />
            )}
            {isRun && runK > 0.02 && (
              <div style={{ position: "absolute", left: -pad * 0.5, right: -pad * 0.5, top: -rowH * 0.1,
                bottom: -rowH * 0.1, borderRadius: rowH * 0.2, border: `3px solid ${hexa(CARET, 0.9)}`,
                background: hexa(CARET, 0.10) }} />
            )}
          </div>
        );
      })}
      {/* 10 · the CLIP holding it, brass, with a lit edge */}
      <div style={{ position: "absolute", left: w * 0.5 - 26 * k, top: -9 * k, width: 52 * k,
        height: 22 * k, borderRadius: 4 * k, zIndex: 4,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.3)}, ${BRASS} 46%, ${dkh(BRASS, 0.34)})`,
        border: `${1.8 * k}px solid ${hexa(INK, 0.34)}`, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 4 * k, right: 4 * k, top: 2 * k, height: 1.6 * k,
          borderRadius: 1, background: hexa("#FFFFFF", 0.44) }} />
      </div>
      {stand && (
        <div style={{ position: "absolute", left: w * 0.42, top: h - 2, width: w * 0.16, height: h * 0.05,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)}, ${dkh(STEEL, 0.3)})`, borderRadius: 3 }} />
      )}
    </div>
  );
};


/* ---- THE STAMP — the load the hook's body works against ------------------- */
/** ⭐⭐⭐ WEIGHT IS DEFORMATION (ANIMATION-QUALITY §11, and the FREE hook's own
    comment: *"a rigid stick reads as someone holding a prop"*). So this stamp
    has a SPRING that visibly compresses on the blow, a barrel that squashes,
    and a handle that keeps travelling a few px after the face has stopped.
    Drawn as a real tool: a turned knob with a highlight, a shaft with a collar,
    a knurled band, a barrel with a lit edge, a rubber face, and the word it
    puts down moulded into that face. */
export const StampTool: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  press?: number; recoil?: number }> =
  ({ x, y, s = 1, z = 86, rot = 0, press = 0, recoil = 0 }) => {
  const W0 = 128 * s, H0 = 176 * s;
  const squash = 1 + press * 0.10;
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0, width: W0, height: H0,
      zIndex: z, transform: `rotate(${rot + recoil * 2.2}deg)`, transformOrigin: "50% 100%" }}>
      {/* 1 · the knob, turned, with a highlight */}
      <div style={{ position: "absolute", left: W0 * 0.20, top: 0, width: W0 * 0.60, height: H0 * 0.20,
        borderRadius: `${W0 * 0.3}px ${W0 * 0.3}px ${W0 * 0.10}px ${W0 * 0.10}px`,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.34)}, ${BRASS} 44%, ${dkh(BRASS, 0.36)})`,
        border: `${2.4 * s}px solid ${hexa(INK, 0.42)}` }}>
        <div style={{ position: "absolute", left: "18%", top: "16%", width: "26%", height: "30%",
          borderRadius: "50%", background: hexa("#FFFFFF", 0.4) }} />
      </div>
      {/* 2 · the shaft, and it SHORTENS as the spring takes the blow */}
      <div style={{ position: "absolute", left: W0 * 0.40, top: H0 * 0.19,
        width: W0 * 0.20, height: H0 * (0.20 - press * 0.07),
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.44)}, ${mxh(STEEL, 0.24)} 42%, ${dkh(STEEL, 0.48)})` }} />
      {/* 3 · THE SPRING — three coils that compress. The tell that it is heavy. */}
      {[0, 1, 2].map((i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: W0 * 0.30,
          top: H0 * (0.235 + i * (0.052 - press * 0.020)), width: W0 * 0.40,
          height: H0 * 0.024, borderRadius: H0 * 0.012,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)}, ${dkh(STEEL, 0.4)})` }} />
      ))}
      {/* 4 · the collar */}
      <div style={{ position: "absolute", left: W0 * 0.26, top: H0 * (0.40 - press * 0.06),
        width: W0 * 0.48, height: H0 * 0.06, borderRadius: 3 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)}, ${dkh(STEEL, 0.42)})`,
        border: `${1.8 * s}px solid ${hexa("#000", 0.4)}` }} />
      {/* 5 · the barrel, squashing under the blow */}
      <div style={{ position: "absolute", left: W0 * (0.5 - 0.36 * squash), top: H0 * (0.46 - press * 0.06),
        width: W0 * 0.72 * squash, height: H0 * (0.34 + press * 0.05), borderRadius: 7 * s,
        background: `linear-gradient(90deg, ${dkh(CLAY, 0.34)}, ${CLAY} 40%, ${dkh(CLAY, 0.40)})`,
        border: `${2.6 * s}px solid ${hexa(INK, 0.4)}`, boxShadow: SH }}>
        {/* 6 · a knurled band — fine repeated detail */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "26%", height: "20%",
          background: `repeating-linear-gradient(90deg, ${hexa("#000", 0.22)} 0 ${3 * s}px, transparent ${3 * s}px ${6 * s}px)` }} />
        <div style={{ position: "absolute", left: "8%", right: "8%", top: "8%", height: 2.4 * s,
          borderRadius: 2, background: hexa("#FFFFFF", 0.30) }} />
      </div>
      {/* 7 · the rubber face, with the word moulded into it */}
      <div style={{ position: "absolute", left: W0 * 0.10, top: H0 * (0.80 - press * 0.01),
        width: W0 * 0.80, height: H0 * 0.16, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${dkh(OKGREEN, 0.10)}, ${dkh(OKGREEN, 0.42)})`,
        border: `${2.2 * s}px solid ${hexa("#000", 0.46)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...ui(H0 * 0.085, 900), color: hexa("#FFFFFF", 0.82), letterSpacing: 2 }}>DONE</span>
      </div>
    </div>
  );
};

/* ---- THE CLAIM BOARD — the wall of rows he stamps ------------------------ */
/** the LOAD. A mounted checklist board: a steel frame with corner brackets, a
    paper sheet with ruling and a punched margin, `n` rows each with a checkbox,
    a claim bar and an EMPTY receipt slot, and a tally plate. `jolt` shakes the
    whole board when it is struck, because nothing in a reel lands and stops. */
export const ClaimBoard: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  f: number; done: number; hit?: number; jolt?: number; big?: string }> =
  ({ x, y, w, h, z = 60, f, done, hit = -1, jolt = 0, big }) => {
  const k = w / 460;
  const rows = 6;
  const rowH = h * 0.108;
  const top = h * 0.28;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `translate(${jolt * 3}px, ${jolt * 5}px) rotate(${jolt * 0.5}deg)` }}>
      {/* 1 · the steel frame */}
      <div style={{ position: "absolute", left: -10 * k, top: -10 * k, right: -10 * k, bottom: -10 * k,
        borderRadius: 8 * k,
        background: `linear-gradient(160deg, ${mxh(STEEL, 0.14)}, ${dkh(STEEL, 0.44)})`,
        border: `${3 * k}px solid ${hexa("#000", 0.42)}`, boxShadow: SH_D }} />
      {/* 2 · corner brackets with bolts */}
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], i) => (
        <div key={"cb" + i} style={{ position: "absolute",
          left: cx ? w - 26 * k : -6 * k, top: cy ? h - 26 * k : -6 * k,
          width: 32 * k, height: 32 * k, borderRadius: 4 * k,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.22)}, ${dkh(STEEL, 0.4)})`,
          border: `${2 * k}px solid ${hexa("#000", 0.36)}` }}>
          <div style={{ position: "absolute", left: "34%", top: "34%", width: "32%", height: "32%",
            borderRadius: "50%",
            background: `radial-gradient(circle at 34% 30%, ${hexa("#FFF", 0.3)}, ${hexa("#000", 0.6)})` }} />
        </div>
      ))}
      {/* 3 · the sheet */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 * k,
        background: `linear-gradient(172deg, #FDFCF7, ${UISH} 52%, ${UISH2} 88%)`,
        boxShadow: `inset 0 ${3 * k}px ${8 * k}px ${hexa(INK, 0.16)}` }} />
      {/* 4 · ruling + a red margin rule */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: w * 0.10, right: w * 0.05,
          top: top + i * rowH + rowH * 0.84, height: 1, background: hexa(LINKB, 0.18) }} />
      ))}
      <div style={{ position: "absolute", left: w * 0.075, top: h * 0.06, bottom: h * 0.05,
        width: 2 * k, background: hexa(DIFFR, 0.32) }} />
      {/* 5 · the header, with the mark and a tally plate */}
      <div style={{ position: "absolute", left: w * 0.10, top: h * 0.07, right: w * 0.06,
        display: "flex", alignItems: "center", gap: w * 0.028 }}>
        <MarkTile rel d={h * 0.115} z={2} />
        <span style={{ ...ui(h * 0.072, 900), color: hexa(INK, 0.72), letterSpacing: 2.4 }}>TODO</span>
        <div style={{ marginLeft: "auto", padding: `${4 * k}px ${12 * k}px`, borderRadius: 5 * k,
          background: hexa(INK, 0.08), border: `${2 * k}px solid ${hexa(INK, 0.22)}` }}>
          <span style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: h * 0.115,
            color: INK, lineHeight: 1 }}>{big}</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: w * 0.10, right: w * 0.06, top: h * 0.225, height: 3,
        background: hexa(INK, 0.24) }} />
      {/* 6 · the rows */}
      {Array.from({ length: rows }, (_, i) => {
        const on = i < done;
        const struck = i === hit;
        return (
          <div key={"br" + i} style={{ position: "absolute", left: w * 0.10, right: w * 0.06,
            top: top + i * rowH, height: rowH * 0.82, display: "flex", alignItems: "center",
            gap: w * 0.026 }}>
            <CheckBox rel s={rowH * 0.74} k={on ? 1 : 0} z={3} />
            <div style={{ height: rowH * 0.28, width: `${40 + (i * 11) % 34}%`, borderRadius: rowH * 0.14,
              background: `linear-gradient(180deg, ${hexa(TASKS[i].c, on ? 0.4 : 0.72)}, ${hexa(dkh(TASKS[i].c, 0.22), on ? 0.34 : 0.62)})` }} />
            {/* ⛔ THE RECEIPT SLOT IS EMPTY ON EVERY STAMPED ROW. That is the joke,
                and it is legible on frame 0 with no narration. */}
            <div style={{ marginLeft: "auto", width: w * 0.13, height: rowH * 0.44, borderRadius: 3,
              flexShrink: 0, border: `${1.8 * k}px solid ${hexa(INK, 0.20)}`,
              background: `repeating-linear-gradient(116deg, transparent 0 ${3 * k}px, ${hexa(INK, 0.11)} ${3 * k}px ${4.6 * k}px)` }} />
          </div>
        );
      })}
    </div>
  );
};

/* ---- THE SESSION CHROME — one fitout layer, in every room ----------------- */
/** ⭐⭐⭐ THE ROOM, AND THE THING ALEX'S "TOO BASIC" NOTE LANDS ON HARDEST — it is
    the background of all eleven scenes, so whatever it lacks, the whole reel
    lacks. Rev 2 drew it as a flat panel with two runs of single-colour bars.

    It is now a real editor window used as ARCHITECTURE, built from what a
    session actually has, each part painted from the room's own `Place`:
      · a title bar with three window dots and a TAB STRIP, one tab active
      · the wall, with a soft top-light so it is lit rather than filled
      · a LINE-NUMBER gutter and a DIFF gutter whose marks scroll with the text
      · the scrollback, TOKENISED (`SYN`), two columns at two depths
      · a MINIMAP down the right edge, with a viewport box that travels
      · a faint Claude stencil, so the wall says whose session this is
      · the prompt row with a caret, a hint chip and a model chip
      · a STATUS BAR with segmented cells and a context meter that drains
    ⛔ Every value comes from `p`, so it never looks pasted on
    (`feedback_rooms_need_an_architecture_layer`). */
const lum = (hex: string) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const SesFit: React.FC<{ p: any; f: number; seed?: number; z?: number; lift?: number;
  ctx?: number; run?: number; theme?: "light" | "dark" }> =
  ({ p, f, seed = 1, z = 5, lift = 1, ctx = 1, run = 1, theme }) => {
  const wallTop = 96 * lift;
  const wallBot = p.horizon - 8;
  /* ⭐⭐⭐ THE EDITOR FOLLOWS THE SCENE'S OWN LIGHT.
     ⛔ Painting the screen near-black in every scene made the whole reel a dark
     slab: frame-0 luma fell to 108 against a 140 law and body luma to 71, the
     floor of the house range. The value recipe wants a PALE COOL GROUND with a
     NEAR-BLACK MASS on it — so the ground is the editor surface and the mass is
     the panes, not the other way round.
     ⭐ And it costs nothing to justify: people run this thing in both themes.
     The eleven `PLACES` already encode the reel's bright/dark rhythm, so the
     chrome simply reads it — bright place, light editor; dark place, dark one.
     That keeps the light rhythm the look gate measures AND gives the reel two
     genuinely different-looking treatments instead of one flat register. */
  const isLight = theme ? theme === "light" : lum(p.back2 || "#FFFFFF") > 150;
  const ink = isLight ? (p.back2 || "#F2F4F6") : (p.grit || "#101010");
  const light = isLight ? (p.lip || "#22282E") : (p.back2 || "#FFFFFF");
  const key = p.key || "#FFE2A8";
  const paper = isLight ? mxh(p.back2 || "#FFFFFF", 0.55) : ink;
  const blink = (f % 30) < 17 ? 1 : 0.15;
  const H0 = wallBot - wallTop;
  const mmT = ((f * 0.62) % 100) / 100;
  return (
    <>
      {/* 1 · THE SCREEN, AND IT IS OPAQUE. ⛔ The first pass painted this wall in
             translucent `hexa()` tones over the `Room`'s haze and parallax
             bands, and the whole reel went milky: a terminal seen THROUGH fog.
             A screen is a solid surface. Three real tone steps, no alpha. */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallTop, height: H0, zIndex: z,
        background: isLight
          ? `linear-gradient(180deg, ${mxh(paper, 0.42)} 0%, ${paper} 30%, ${dkh(paper, 0.10)} 100%)`
          : `linear-gradient(180deg, ${mxh(ink, 0.16)} 0%, ${ink} 26%, ${dkh(ink, 0.30)} 100%)` }} />
      {/* 2 · a soft key pool where the lamp would fall */}
      <div style={{ position: "absolute", left: 180, top: wallTop + 30, width: 640, height: H0 * 0.7,
        zIndex: z, background: `radial-gradient(60% 60% at 50% 0%, ${hexa(key, 0.07)}, transparent 72%)` }} />
      {/* 3 · the TITLE BAR */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallTop, height: 44, zIndex: z + 1,
        background: `linear-gradient(180deg, ${mxh(ink, 0.30)}, ${mxh(ink, 0.10)})`,
        borderBottom: `2px solid ${dkh(ink, 0.5)}`, display: "flex", alignItems: "center",
        gap: 12, paddingLeft: 74, paddingRight: 74 }}>
        {[DIFFR, WARN, DIFFG].map((c2, i) => (
          <div key={"wd" + i} style={{ width: 11, height: 11, borderRadius: "50%",
            background: hexa(c2, 0.72), flexShrink: 0 }} />
        ))}
        <MarkTile rel d={26} z={2} />
        <div style={{ width: 116, height: 9, borderRadius: 4, background: hexa(light, 0.44) }} />
        <div style={{ marginLeft: "auto", width: 168, height: 12, borderRadius: 6,
          background: hexa(ink, 0.5), border: `2px solid ${hexa(light, 0.28)}`, overflow: "hidden" }}>
          <div style={{ width: `${Math.max(6, ctx * 100)}%`, height: "100%",
            background: ctx > 0.34 ? hexa(light, 0.74) : hexa(WARN, 0.9) }} />
        </div>
      </div>
      {/* 4 · the TAB STRIP — three tabs, one active, with a caret underline */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallTop + 44, height: 30,
        zIndex: z + 1, background: mxh(ink, 0.05),
        borderBottom: `2px solid ${hexa("#000", 0.42)}`, display: "flex", alignItems: "flex-end",
        gap: 4, paddingLeft: 74 }}>
        {[0, 1, 2].map((i) => (
          <div key={"tb" + i} style={{ width: 132, height: i === 0 ? 26 : 21, borderRadius: "5px 5px 0 0",
            background: i === 0 ? hexa(light, 0.20) : hexa("#000", 0.28),
            borderTop: i === 0 ? `2px solid ${hexa(CARET, 0.85)}` : "none",
            display: "flex", alignItems: "center", gap: 6, paddingLeft: 9 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%",
              background: hexa(i === 0 ? CARET : light, i === 0 ? 0.9 : 0.3) }} />
            <div style={{ width: 62, height: 5, borderRadius: 3,
              background: hexa(light, i === 0 ? 0.44 : 0.20) }} />
          </div>
        ))}
      </div>
      {/* 5 · the LINE-NUMBER gutter */}
      <div style={{ position: "absolute", left: 2, top: wallTop + 96, width: 22, height: H0 - 152,
        zIndex: z + 2, background: hexa("#000", 0.26),
        borderRight: `1px solid ${hexa(light, 0.10)}` }}>
        {Array.from({ length: 15 }, (_, i) => {
          const adv = f * 2.3, off = adv % 22;
          return <div key={"nn" + i} style={{ position: "absolute", left: 5, top: i * 22 - off,
            width: 11, height: 3, borderRadius: 1, background: hexa(light, 0.22) }} />;
        })}
      </div>
      {/* 6 · the DIFF gutter, scrolling with the text */}
      <div style={{ position: "absolute", left: 26, top: wallTop + 96, width: 22, height: H0 - 152,
        zIndex: z + 2, overflow: "hidden" }}>
        {Array.from({ length: 16 }, (_, i) => {
          const adv = f * 2.3, off = adv % 22, src = Math.floor(adv / 22) + i;
          const r = rnd(seed * 11.3 + src * 5.7, 1);
          const c = r > 0.72 ? DIFFG : r > 0.52 ? DIFFR : light;
          return <div key={"g" + i} style={{ position: "absolute", left: 3, top: i * 22 - off,
            width: 15, height: 9, borderRadius: 2,
            background: hexa(c, r > 0.52 ? 0.66 : 0.16) }} />;
        })}
      </div>
      {/* 7 · the scrollback, TOKENISED, at two depths */}
      <CodeLines x={58} y={wallTop + 96} w={352} n={15} gap={22} h={7} c={light} o={0.46}
        seed={seed * 2.1} run={run} z={z + 2} f={f} scroll={2.3} syntax={0.9}
        dark={isLight ? 1 : 0} />
      <CodeLines x={596} y={wallTop + 116} w={306} n={12} gap={24} h={7} c={light} o={0.26}
        seed={seed * 3.7} run={run} z={z + 2} f={f} scroll={1.55} syntax={0.5}
        dark={isLight ? 1 : 0} />
      {/* 8 · the MINIMAP, with a viewport box that travels */}
      <div style={{ position: "absolute", right: 6, top: wallTop + 96, width: 30, height: H0 - 152,
        zIndex: z + 2, background: hexa("#000", 0.24), borderRadius: 3, overflow: "hidden" }}>
        {Array.from({ length: 30 }, (_, i) => {
          const r = rnd(seed * 7.9 + i * 3.3, 1);
          return <div key={"mm" + i} style={{ position: "absolute", left: 3 + r * 5,
            top: 3 + i * 7, width: 6 + r * 17, height: 3, borderRadius: 1,
            background: hexa(SYN_MIX[i % SYN_MIX.length], 0.30) }} />;
        })}
        <div style={{ position: "absolute", left: 0, right: 0, height: "22%", top: `${mmT * 74}%`,
          background: hexa(light, 0.13), border: `1px solid ${hexa(light, 0.24)}` }} />
      </div>
      {/* 9 · a faint Claude stencil — the wall saying whose session this is */}
      <div style={{ position: "absolute", left: 452, top: wallTop + 130, width: 112, height: 112,
        zIndex: z + 1, opacity: 0.13 }}>
        <Img src={staticFile("logos/claude.svg")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      {/* 10 · the PROMPT ROW */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallBot - 72, height: 40,
        zIndex: z + 2, background: mxh(ink, 0.06), borderTop: `2px solid ${hexa(light, 0.20)}`,
        display: "flex", alignItems: "center", gap: 11, paddingLeft: 74 }}>
        <div style={{ width: 14, height: 18, background: hexa(CARET, 0.95 * blink), borderRadius: 2 }} />
        <div style={{ width: 226, height: 9, borderRadius: 5, background: hexa(light, 0.36) }} />
        <div style={{ width: 84, height: 9, borderRadius: 5, background: hexa(light, 0.18) }} />
        <div style={{ marginLeft: "auto", marginRight: 78, display: "flex", gap: 6 }}>
          {[46, 34].map((wd, i) => (
            <div key={"hc" + i} style={{ width: wd, height: 15, borderRadius: 7,
              background: hexa(light, 0.12), border: `1px solid ${hexa(light, 0.20)}` }} />
          ))}
        </div>
      </div>
      {/* 11 · the STATUS BAR — segmented cells, the detail every editor has */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallBot - 32, height: 32,
        zIndex: z + 2, background: `linear-gradient(180deg, ${mxh(ink, 0.02)}, ${dkh(ink, 0.36)})`,
        borderTop: `1px solid ${hexa(light, 0.14)}`, display: "flex", alignItems: "center",
        gap: 10, paddingLeft: 74, paddingRight: 74 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: hexa(DIFFG, 0.8) }} />
        {[64, 40, 52].map((wd, i) => (
          <div key={"sg" + i} style={{ width: wd, height: 7, borderRadius: 3,
            background: hexa(light, 0.20 - i * 0.04) }} />
        ))}
        <div style={{ marginLeft: "auto", width: 88, height: 7, borderRadius: 3,
          background: hexa(CARET, 0.42) }} />
      </div>
    </>
  );
};

/* ---- THE PANE — one sub-agent, or one lane of the session ----------------- */
/** ⭐⭐⭐ THE UNIT THE WHOLE SET IS BUILT FROM, AND REV 2 DREW IT WITH SEVEN
    ELEMENTS. Ten of those on screen is ten identical dark rectangles, which is
    exactly `feedback_props_need_real_drawing`: *"everything just reads as a
    whole lot of nothing even though there's more stuff."* Measured against a
    shipped world (`HwProps`), this file's median was 4 elements per component
    against 7, and its hero objects 5-7 against 18-21.

    Rebuilt to the three moves that memory ranks, in order:
      1. A VISIBLE THIRD FACE — the bezel has a lit top edge and a shadowed
         bottom lip, so it is a solid object and not a sticker.
      2. FINE REPEATED DETAIL AT THE EDGE OF RESOLUTION — a line-number gutter,
         a tokenised body, a segmented status strip, two screw heads. It
         survives the downsample as TEXTURE even when no single line does.
      3. AN INTERNAL MECHANISM THAT MOVES — the spinner turns and the scrollbar
         thumb travels while the pane is running. That is the fan-blade trick
         from `GpuCard`, and it answers "the animations are boring" at the same
         time as it answers "too basic", because the interest is now INSIDE the
         object rather than only in where the object slides to. */
export const Pane: React.FC<{ x: number; y: number; w: number; h: number; z?: number; f: number;
  on?: number; run?: number; done?: number; fail?: number; seed?: number; label?: boolean }> =
  ({ x, y, w, h, z = 40, f, on = 1, run = 0, done = 0, fail = 0, seed = 1, label = true }) => {
  const k = Math.max(0.001, w / 172);                 /* every part scales off the pane */
  const blink = (Math.floor(f / 9) + seed) % 2 === 0 ? 1 : 0.2;
  const lamp = fail > 0.02 ? DIFFR : done > 0.02 ? DIFFG : run > 0.02 ? CARET : MUTE;
  const busy = run > 0.02 && done < 0.02;
  const barH = h * 0.19, footH = h * 0.10;
  const scrollT = busy ? ((f * 0.9 + seed * 13) % 100) / 100 : 0.14;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      opacity: 0.34 + on * 0.66 }}>
      {/* 1 · the BEZEL — a solid, with a lit top edge and a shadowed bottom lip */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 9 * k,
        background: `linear-gradient(176deg, ${TERM3} 0%, ${TERM2} 34%, ${dkh(TERM, 0.25)} 100%)`,
        border: `${2.5 * k}px solid ${hexa("#000", 0.62)}`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 3 * k, right: 3 * k, top: 2.5 * k, height: 2 * k,
        borderRadius: 2 * k, background: hexa("#FFFFFF", 0.16) }} />
      {/* 2 · the SCREEN, recessed */}
      <div style={{ position: "absolute", left: 4.5 * k, right: 4.5 * k, top: barH,
        bottom: footH + 3 * k, borderRadius: 5 * k, overflow: "hidden",
        background: `linear-gradient(180deg, ${dkh(TERM, 0.12)}, #0C0B09)`,
        boxShadow: `inset 0 ${3 * k}px ${6 * k}px ${hexa("#000", 0.75)}` }}>
        {/* 3 · the line-number gutter — fine repeated detail */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 13 * k,
          background: hexa("#000", 0.4), borderRight: `${1.5 * k}px solid ${hexa("#FFF", 0.07)}` }}>
          {Array.from({ length: Math.max(3, Math.round(h / (13 * k))) }, (_, i) => (
            <div key={"ln" + i} style={{ position: "absolute", left: 3.5 * k, top: 6 * k + i * 11 * k,
              width: 6 * k, height: 2 * k, borderRadius: 1, background: hexa("#FFFFFF", 0.20) }} />
          ))}
        </div>
        {/* 4 · the CURRENT-LINE band, sliding — a running pane always has one */}
        {busy && (
          <div style={{ position: "absolute", left: 13 * k, right: 0,
            top: (10 + ((f * 1.6 + seed * 20) % Math.max(20, h * 0.5))) * k * 0.9,
            height: 9 * k, background: hexa(CARET, 0.13),
            borderLeft: `${2 * k}px solid ${hexa(CARET, 0.7)}` }} />
        )}
        {/* 5 · the code itself, TOKENISED */}
        <CodeLines x={17 * k} y={7 * k} w={w - 30 * k} n={Math.max(3, Math.round(h / (13 * k)))}
          gap={11 * k} h={Math.max(2.4, 3.4 * k)} c="#FFFFFF" o={0.34 + on * 0.26}
          seed={seed * 4.3} run={run > 0 ? run : 1} z={2} f={f} syntax={0.7 + on * 0.3}
          scroll={busy ? 2.4 + (seed % 4) * 0.5 : 0} />
        {/* 6 · the caret */}
        {busy && (
          <div style={{ position: "absolute", left: 19 * k, bottom: 7 * k, width: 5 * k,
            height: 8 * k, background: hexa(CARET, blink), borderRadius: 1 }} />
        )}
        {/* 7 · the SCROLLBAR, and its thumb travels */}
        <div style={{ position: "absolute", right: 2 * k, top: 4 * k, bottom: 4 * k, width: 3.5 * k,
          borderRadius: 2 * k, background: hexa("#FFFFFF", 0.07) }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: "26%",
            top: `${scrollT * 70}%`, borderRadius: 2 * k, background: hexa("#FFFFFF", 0.26) }} />
        </div>
        {/* 8 · a screen vignette, so it reads as glass and not as paint */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(120% 90% at 50% 40%, transparent 52%, ${hexa("#000", 0.42)} 100%)` }} />
      </div>
      {/* 9 · the TITLE BAR */}
      <div style={{ position: "absolute", left: 4.5 * k, right: 4.5 * k, top: 4 * k,
        height: barH - 5 * k, borderRadius: `${5 * k}px ${5 * k}px 0 0`,
        background: `linear-gradient(180deg, ${mxh(TERM3, 0.14)}, ${TERM2})`,
        borderBottom: `${1.5 * k}px solid ${hexa("#000", 0.5)}`,
        display: "flex", alignItems: "center", gap: 4 * k, paddingLeft: 6 * k }}>
        {/* 10 · three window dots — the detail every terminal has */}
        {[DIFFR, WARN, DIFFG].map((c2, i) => (
          <div key={"dt" + i} style={{ width: 4.6 * k, height: 4.6 * k, borderRadius: "50%",
            background: hexa(c2, 0.34 + on * 0.5), flexShrink: 0 }} />
        ))}
        {label && <div style={{ width: w * 0.30, height: 3.6 * k, borderRadius: 2 * k,
          background: hexa("#FFF", 0.26), marginLeft: 3 * k }} />}
        {/* 11 · the STATE LAMP, in a bezel */}
        <div style={{ marginLeft: "auto", marginRight: 6 * k, width: 8.5 * k, height: 8.5 * k,
          borderRadius: "50%", background: hexa(lamp, on > 0.4 ? 0.95 : 0.4),
          border: `${1.6 * k}px solid ${hexa("#000", 0.5)}`, flexShrink: 0 }} />
      </div>
      {/* 12 · THE SPINNER — the internal mechanism, turning while it works */}
      {busy && (
        <div style={{ position: "absolute", left: w - 34 * k, top: 5.5 * k, width: 11 * k,
          height: 11 * k, zIndex: 6, transform: `rotate(${f * 11}deg)` }}>
          {[0, 1, 2, 3, 4, 5].map((b) => (
            <div key={"sp" + b} style={{ position: "absolute", left: "50%", top: "50%",
              width: 4.4 * k, height: 1.8 * k, marginTop: -0.9 * k, borderRadius: 1,
              transformOrigin: "0% 50%", transform: `rotate(${b * 60}deg)`,
              background: hexa(CARET, 0.3 + 0.7 * (b / 6)) }} />
          ))}
        </div>
      )}
      {/* 13 · the FOOT — a segmented status strip with a progress worm */}
      <div style={{ position: "absolute", left: 4.5 * k, right: 4.5 * k, bottom: 3 * k,
        height: footH, borderRadius: `0 0 ${5 * k}px ${5 * k}px`,
        background: `linear-gradient(180deg, ${TERM2}, ${dkh(TERM, 0.2)})`,
        borderTop: `${1.5 * k}px solid ${hexa("#FFF", 0.08)}`,
        display: "flex", alignItems: "center", gap: 3 * k, paddingLeft: 5 * k }}>
        <div style={{ width: 12 * k, height: 2.6 * k, borderRadius: 1,
          background: hexa(lamp, 0.7) }} />
        <div style={{ width: 20 * k, height: 2.6 * k, borderRadius: 1,
          background: hexa("#FFF", 0.16) }} />
        <div style={{ marginLeft: "auto", marginRight: 5 * k, width: w * 0.22, height: 3.4 * k,
          borderRadius: 2 * k, background: hexa("#000", 0.45), overflow: "hidden" }}>
          <div style={{ width: `${busy ? 12 + ((f * 2.2 + seed * 30) % 88) : done > 0.02 ? 100 : 0}%`,
            height: "100%", background: hexa(done > 0.02 ? DIFFG : CARET, 0.85) }} />
        </div>
      </div>
      {/* 14 · two screw heads — the cheapest thing that says "an object" */}
      {[6 * k, w - 11 * k].map((sx, i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: sx, bottom: 0.5 * k,
          width: 4 * k, height: 4 * k, borderRadius: "50%",
          background: `radial-gradient(circle at 34% 30%, ${hexa("#FFF", 0.22)}, ${hexa("#000", 0.6)})` }} />
      ))}
      {/* 15 · the RESULT STAMP */}
      {done > 0.02 && (
        <div style={{ position: "absolute", right: 9 * k, top: barH + 5 * k,
          width: 17 * k, height: 17 * k, borderRadius: 4 * k, zIndex: 7,
          background: hexa(DIFFG, 0.92 * done), border: `${1.6 * k}px solid ${dkh(DIFFG, 0.34)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="100%" height="100%" viewBox="0 0 24 24">
            <path d="M6 12 L10 16 L18 7" fill="none" stroke="#FFF" strokeWidth={3.6}
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {fail > 0.02 && (
        <div style={{ position: "absolute", right: 9 * k, top: barH + 5 * k,
          width: 17 * k, height: 17 * k, borderRadius: 4 * k, zIndex: 7,
          background: hexa(DIFFR, 0.92 * fail), border: `${1.6 * k}px solid ${dkh(DIFFR, 0.34)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="100%" height="100%" viewBox="0 0 24 24">
            <path d="M7 7 L17 17 M17 7 L7 17" stroke="#FFF" strokeWidth={3.6} strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};

/* ---- THE PANE WALL — the near-black mass across the top ------------------- */
/** ⛔ THE VALUE STRUCTURE DEPENDS ON THIS. It is the reel's black mass and it
    is FURNITURE, never a tinted sprite (`feedback_eyecatch_is_value_structure`).
    A rack of dormant panes above the working area, cropped by the frame. */
export const PaneWall: React.FC<{ f: number; z?: number; y0?: number; h?: number; n?: number;
  lit?: number[]; sign?: boolean; signLit?: number }> =
  ({ f, z = 20, y0 = 8, h = 168, n = 6, lit = [], sign = true, signLit = 1 }) => {
  const pw = (W + 120) / n;
  return (
    <>
      <div style={{ position: "absolute", left: -60, right: -60, top: y0, height: h, zIndex: z,
        background: `linear-gradient(180deg, ${TERM}, ${dkh(TERM, 0.3)} 72%, #000 100%)`,
        borderBottom: `4px solid ${hexa("#000", 0.7)}`, boxShadow: SH_D }} />
      {Array.from({ length: n }, (_, i) => (
        <Pane key={"pw" + i} x={-56 + i * pw + 8} y={y0 + 16} w={pw - 18} h={h - 44} z={z + 1} f={f}
          on={lit.includes(i) ? 0.9 : 0.22} run={lit.includes(i) ? 0.9 : 0} seed={i + 2} label={false} />
      ))}
      {sign && (
        <div style={{ position: "absolute", left: W / 2 - 62, top: y0 + h - 30, width: 124, height: 56,
          zIndex: z + 3, borderRadius: 10, background: `linear-gradient(180deg, #FFFFFF, ${UISH2})`,
          border: `3px solid ${hexa(INK, 0.3)}`, boxShadow: SH_D, opacity: 0.5 + signLit * 0.5,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/claude.svg")} style={{ width: 34, height: 34, objectFit: "contain" }} />
        </div>
      )}
    </>
  );
};

/* ---- THE PROMPT RAIL — the floor the cast stands on ----------------------- */
/** ⛔⛔ THIS WAS A PALE SLAB AND IT WASHED THE WHOLE REEL OUT. A big light
    surface across the bottom third fought the dark screen above it, flattened
    the value structure and left nothing ranking
    (`feedback_eyecatch_is_value_structure`: the mass should be NEAR-BLACK and
    the BRIGHT thing should be the one object you want read).
    ⭐ So the rail is now what it actually is: the dark input bar of the session,
    machined, with a lit chamfer along its front edge, a caret, hint chips and
    three status lamps. The bright objects in this world are the PAPER — the
    todo list, the ledger, the answer card — and now they are the only ones. */
export const PromptRail: React.FC<{ f: number; z?: number; topY?: number; lampBarY?: number;
  lamps?: number[]; lampX?: number[]; dx?: number; surface?: string }> =
  ({ f, z = 70, topY = 632, lampBarY = 214, lamps = [1, 1, 1], lampX = [386, 536, 686], dx = 0,
     surface = "#23262B" }) => {
  const blink = (f % 30) < 17 ? 1 : 0.18;
  return (
    <>
      {/* 1 · the slab, in perspective, three real tone steps */}
      <div style={{ position: "absolute", left: -120 + dx, right: -120 - dx, top: topY, height: H - topY,
        zIndex: z, background: `linear-gradient(180deg, ${mxh(surface, 0.16)} 0%, ${surface} 38%, ${dkh(surface, 0.34)} 100%)`,
        clipPath: "polygon(9% 0%, 91% 0%, 100% 100%, 0% 100%)", boxShadow: SH_D }} />
      {/* 2 · the LIT CHAMFER along the front edge — the third face */}
      <div style={{ position: "absolute", left: -120 + dx, right: -120 - dx, top: topY, height: 7,
        zIndex: z + 1, background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.30)}, ${hexa("#FFFFFF", 0.06)})` }} />
      <div style={{ position: "absolute", left: -120 + dx, right: -120 - dx, top: topY + 7, height: 3,
        zIndex: z + 1, background: hexa("#000", 0.5) }} />
      {/* 3 · a machined groove running the length */}
      <div style={{ position: "absolute", left: -60 + dx, right: -60 - dx, top: topY + 22, height: 2,
        zIndex: z + 1, background: hexa("#000", 0.34) }} />
      {/* 4 · the input line: caret, typed text, ghost hint */}
      <div style={{ position: "absolute", left: 178 + dx, top: topY + 40, display: "flex",
        alignItems: "center", gap: 14, zIndex: z + 2 }}>
        <div style={{ width: 18, height: 27, background: hexa(CARET, blink), borderRadius: 3 }} />
        <div style={{ width: 268, height: 11, borderRadius: 6, background: hexa("#FFFFFF", 0.40) }} />
        <div style={{ width: 108, height: 11, borderRadius: 6, background: hexa("#FFFFFF", 0.14) }} />
      </div>
      {/* 5 · hint chips, the row every prompt bar has */}
      <div style={{ position: "absolute", left: 178 + dx, top: topY + 74, display: "flex", gap: 8,
        zIndex: z + 2 }}>
        {[58, 42, 70].map((wd, i) => (
          <div key={"hp" + i} style={{ width: wd, height: 14, borderRadius: 7,
            background: hexa("#FFFFFF", 0.07), border: `1px solid ${hexa("#FFFFFF", 0.16)}` }} />
        ))}
      </div>
      {/* 6 · three status lamps in a machined bar, each with a bezel */}
      {lampX.map((lx, i) => (
        <div key={"lp" + i} style={{ position: "absolute", left: lx + dx, top: lampBarY, width: 62,
          height: 20, zIndex: z + 2, borderRadius: 10,
          background: `linear-gradient(180deg, ${hexa(GOLD, 0.92 * (lamps[i] ?? 0))}, ${hexa(dkh(GOLD, 0.3), 0.5 * (lamps[i] ?? 0))})`,
          border: `2px solid ${hexa("#000", 0.42)}`,
          boxShadow: `inset 0 2px 0 ${hexa("#FFFFFF", 0.28 * (lamps[i] ?? 0))}` }} />
      ))}
    </>
  );
};

/* ---- THE ANSWER — what leaves the session -------------------------------- */
/** the response card, travelling toward camera. It appears in six scenes, so it
    carries its own detail budget: a header with the mark and a model chip, six
    content rows that are REAL (each one a task's colour, dashed when missing),
    a footer with a token count and a copy affordance, and a torn foot when the
    answer is incomplete — a different SILHOUETTE for a bad answer, not just a
    different badge (`feedback_props_need_real_drawing`, move 3). */
export const AnswerCard: React.FC<{ x: number; y: number; w?: number; z?: number; items?: boolean[];
  rot?: number; bad?: number }> =
  ({ x, y, w = 300, z = 74, items = [true, true, false, false, false, false], rot = 0, bad = 0 }) => {
  const h = w * 0.52;
  const k = w / 300;
  const filled = items.filter(Boolean).length;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)` }}>
      {/* 1 · the drop shadow that makes it a sheet in space */}
      <div style={{ position: "absolute", left: w * 0.04, right: w * 0.04, bottom: -5 * k,
        height: 12 * k, borderRadius: "50%", background: hexa(INK, 0.24), filter: "blur(3px)" }} />
      {/* 2 · the sheet */}
      <div style={{ position: "absolute", inset: 0, borderRadius: w * 0.035,
        background: `linear-gradient(174deg, #FFFFFF, ${UISH} 58%, ${UISH2} 88%, ${dkh(UISH2, 0.05)})`,
        border: `${Math.max(2, w * 0.008)}px solid ${hexa(INK, bad > 0.02 ? 0.32 : 0.16)}`,
        boxShadow: SH_D }} />
      {/* 3 · header: the mark, a title bar, a model chip */}
      <div style={{ position: "absolute", left: w * 0.05, top: h * 0.08, right: w * 0.05,
        display: "flex", alignItems: "center", gap: w * 0.028 }}>
        <MarkTile rel d={h * 0.19} z={2} />
        <div style={{ width: w * 0.30, height: h * 0.062, borderRadius: 4, background: hexa(INK, 0.28) }} />
        <div style={{ marginLeft: "auto", width: w * 0.17, height: h * 0.085, borderRadius: h * 0.045,
          background: hexa(CLAY, 0.18), border: `${1.6 * k}px solid ${hexa(CLAY, 0.5)}` }} />
      </div>
      {/* 4 · the header rule */}
      <div style={{ position: "absolute", left: w * 0.05, right: w * 0.05, top: h * 0.245, height: 2,
        background: hexa(INK, 0.16) }} />
      {/* 5 · the six content rows */}
      {items.map((on, i) => (
        <div key={"a" + i} style={{ position: "absolute", left: w * 0.05 + (i % 2) * w * 0.46,
          top: h * 0.31 + Math.floor(i / 2) * h * 0.17, width: w * 0.42, height: h * 0.095,
          borderRadius: h * 0.048,
          background: on
            ? `linear-gradient(180deg, ${hexa(TASKS[i].c, 0.78)}, ${hexa(dkh(TASKS[i].c, 0.22), 0.7)})`
            : "transparent",
          border: on ? "none" : `${1.8 * k}px dashed ${hexa(INK, 0.22)}` }}>
          {on && <div style={{ position: "absolute", left: 3, right: 3, top: 1.5, height: 1.5,
            borderRadius: 1, background: hexa("#FFFFFF", 0.34) }} />}
        </div>
      ))}
      {/* 6 · the footer — a token count and a copy affordance */}
      <div style={{ position: "absolute", left: w * 0.05, right: w * 0.05, bottom: h * 0.06,
        display: "flex", alignItems: "center", gap: w * 0.02 }}>
        <div style={{ width: w * 0.16, height: h * 0.045, borderRadius: 3, background: hexa(INK, 0.14) }} />
        <div style={{ width: w * 0.10, height: h * 0.045, borderRadius: 3, background: hexa(INK, 0.09) }} />
        <div style={{ marginLeft: "auto", width: h * 0.10, height: h * 0.10, borderRadius: 3,
          border: `${1.8 * k}px solid ${hexa(INK, 0.24)}` }} />
      </div>
      {/* 7 · a BAD answer is torn along the foot — silhouette, not a badge */}
      {bad > 0.02 && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 9 * k,
          display: "flex", overflow: "hidden" }}>
          {Array.from({ length: 22 }, (_, i) => (
            <div key={"tr" + i} style={{ flex: 1, height: 9 * k, marginRight: 1,
              background: UISH2, borderRadius: `${3 * k}px ${3 * k}px 0 0`,
              transform: `translateY(${2 + rnd(i * 3.3, 1) * 4}px)` }} />
          ))}
        </div>
      )}
      {bad > 0.02 && (
        <div style={{ position: "absolute", right: w * 0.05, top: h * 0.09, width: h * 0.16,
          height: h * 0.16, borderRadius: 3, transform: "rotate(45deg)",
          background: `linear-gradient(180deg, ${mxh(DIFFR, 0.2)}, ${dkh(DIFFR, 0.2)})` }} />
      )}
    </div>
  );
};

/* ---- THE TICK PILE — the villain, accumulating --------------------------- */
/** ⭐ THE VILLAIN MADE COUNTABLE. Rows ticked without being run, on a spindle.
    Each is a green tick over an EMPTY bar and an EMPTY receipt slot: the
    picture of the claim the reel is about. `slips` is the count, so the pile is
    a NUMBER that grows. The spindle has a base, a collar and a lit shaft, and
    the slips sit at their own angles so the stack has a silhouette instead of
    being a bar chart. */
export const TickPile: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  jolt?: number; slips?: number; struck?: number }> =
  ({ x, y, s = 1, z = 80, f, jolt = 0, slips = 4, struck = 0 }) => {
  const rowW = 196 * s, rowH = 36 * s;
  return (
    <div style={{ position: "absolute", left: x - rowW / 2, top: y - rowH * (slips + 1),
      width: rowW, height: rowH * (slips + 2), zIndex: z,
      transform: `translateY(${jolt * 5 * s}px)` }}>
      {/* the shaft, with a lit edge */}
      <div style={{ position: "absolute", left: rowW / 2 - 6 * s, top: 0, width: 12 * s,
        height: rowH * (slips + 1.6),
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.42)}, ${mxh(STEEL, 0.30)} 38%, ${dkh(STEEL, 0.46)})`,
        borderRadius: 3 * s }} />
      <div style={{ position: "absolute", left: rowW / 2 - 2 * s, top: 2 * s, width: 2.5 * s,
        height: rowH * (slips + 1.4), background: hexa("#FFFFFF", 0.3) }} />
      {Array.from({ length: slips }, (_, i) => {
        const off = (rnd(i * 4.7, 1) - 0.5) * 14 * s;
        return (
          <div key={"tp" + i} style={{ position: "absolute", left: off, top: rowH * (slips - i) * 0.82,
            width: rowW, height: rowH, borderRadius: 4 * s,
            background: `linear-gradient(174deg, #FFFFFF, ${UISH} 62%, ${UISH2})`,
            border: `${2 * s}px solid ${hexa(INK, 0.22)}`, boxShadow: SH,
            transform: `rotate(${(rnd(i * 2.3, 1) - 0.5) * 6}deg)`,
            display: "flex", alignItems: "center", gap: 7 * s, paddingLeft: 8 * s }}>
            <CheckBox rel s={rowH * 0.62} k={1} struck={struck} z={2} />
            {/* the empty claim, and the empty receipt slot beside it */}
            <div style={{ width: rowW * 0.38, height: rowH * 0.16, borderRadius: 3,
              background: hexa(INK, 0.09), border: `1px dashed ${hexa(INK, 0.24)}` }} />
            <div style={{ marginLeft: "auto", marginRight: 7 * s, width: rowW * 0.14,
              height: rowH * 0.40, borderRadius: 2, flexShrink: 0,
              border: `${1.4 * s}px solid ${hexa(INK, 0.18)}`,
              background: `repeating-linear-gradient(116deg, transparent 0 3px, ${hexa(INK, 0.10)} 3px 4.5px)` }} />
          </div>
        );
      })}
      {/* collar + base */}
      <div style={{ position: "absolute", left: rowW / 2 - 18 * s, top: rowH * (slips + 1.1),
        width: 36 * s, height: 10 * s, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)}, ${dkh(STEEL, 0.3)})` }} />
      <div style={{ position: "absolute", left: rowW / 2 - 38 * s, top: rowH * (slips + 1.4),
        width: 76 * s, height: 18 * s, borderRadius: 7 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.14)}, ${dkh(STEEL, 0.42)})`,
        border: `${1.6 * s}px solid ${hexa("#000", 0.34)}` }} />
    </div>
  );
};

/* ---- THE DONE CHIP — "a task is done", announced ------------------------- */
export const DoneChip: React.FC<{ x: number; y: number; s?: number; z?: number; ring?: number;
  bad?: number }> = ({ x, y, s = 1, z = 80, ring = 0, bad = 0 }) => {
  const w = 168 * s, h = 56 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2 - ring * 6 * s, width: w, height: h,
      zIndex: z, borderRadius: h / 2, transform: `scale(${1 + ring * 0.09})`,
      background: `linear-gradient(180deg, ${mxh(bad > 0.5 ? DIFFR : OKGREEN, 0.24)}, ${dkh(bad > 0.5 ? DIFFR : OKGREEN, 0.18)})`,
      border: `${3 * s}px solid ${dkh(bad > 0.5 ? DIFFR : OKGREEN, 0.42)}`, boxShadow: SH_D,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10 * s }}>
      <svg width={h * 0.5} height={h * 0.5} viewBox="0 0 24 24">
        <path d="M6 12 L10 16 L18 7" fill="none" stroke="#FFFFFF" strokeWidth={3.6}
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ ...ui(h * 0.36, 900), color: "#FFFFFF", letterSpacing: 2 }}>DONE</span>
    </div>
  );
};

/* ---- THE SKILL FILE — the fix, arriving ---------------------------------- */
/** the INSTALL scene's hero. A real file card: a shadow, a folded corner with
    its own crease, a mark on a plate, the name, a rule, a preview of its own
    tokenised contents, a metadata row, and an install bar with a lit fill and a
    percentage nub that travels. */
export const SkillFile: React.FC<{ x: number; y: number; w?: number; z?: number; open?: number;
  rot?: number; lit?: number }> = ({ x, y, w = 300, z = 80, open = 0, rot = 0, lit = 1 }) => {
  const h = w * 1.24;
  const k = w / 300;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", left: w * 0.06, right: w * 0.06, bottom: -7 * k,
        height: 16 * k, borderRadius: "50%", background: hexa(INK, 0.26), filter: "blur(4px)" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: w * 0.05,
        background: `linear-gradient(170deg, #FFFFFF, ${UISH} 50%, ${UISH2} 86%, ${dkh(UISH2, 0.06)})`,
        border: `${Math.max(3, w * 0.012)}px solid ${hexa(INK, 0.22)}`, boxShadow: SH_D }} />
      {/* the folded corner, with a crease */}
      <div style={{ position: "absolute", right: 0, top: 0, width: w * 0.20, height: w * 0.20,
        background: `linear-gradient(225deg, ${hexa(INK, 0.16)} 50%, transparent 50%)`,
        borderTopRightRadius: w * 0.05 }} />
      <div style={{ position: "absolute", right: w * 0.02, top: w * 0.185, width: w * 0.19, height: 2,
        background: hexa(INK, 0.20), transform: "rotate(-45deg)", transformOrigin: "100% 50%" }} />
      <div style={{ position: "absolute", left: w * 0.5 - w * 0.15, top: h * 0.09, width: w * 0.3,
        height: w * 0.3 }}>
        <MarkTile rel d={w * 0.3} z={2} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.46, textAlign: "center",
        ...ui(w * 0.115, 900), color: INK, letterSpacing: 3 }}>{R.skill}</div>
      <div style={{ position: "absolute", left: w * 0.16, right: w * 0.16, top: h * 0.575, height: 3,
        background: hexa(INK, 0.24) }} />
      {/* a preview of its own contents, tokenised */}
      <CodeLines x={w * 0.15} y={h * 0.625} w={w * 0.70} n={5} gap={w * 0.062} h={w * 0.026}
        c={INK} o={0.5} seed={9.1} z={2} syntax={1} dark={1} />
      {/* a metadata row every file card has */}
      <div style={{ position: "absolute", left: w * 0.15, right: w * 0.15, top: h * 0.845,
        display: "flex", alignItems: "center", gap: w * 0.03 }}>
        <div style={{ width: w * 0.055, height: w * 0.055, borderRadius: 3,
          background: hexa(DIFFG, 0.6) }} />
        <div style={{ width: w * 0.24, height: w * 0.022, borderRadius: 2, background: hexa(INK, 0.24) }} />
        <div style={{ marginLeft: "auto", width: w * 0.16, height: w * 0.022, borderRadius: 2,
          background: hexa(INK, 0.14) }} />
      </div>
      {/* the install bar, with a lit fill and a nub that travels */}
      <div style={{ position: "absolute", left: w * 0.14, right: w * 0.14, bottom: h * 0.045,
        height: w * 0.078, borderRadius: w * 0.04, background: hexa(INK, 0.13),
        border: `2px solid ${hexa(INK, 0.24)}`, overflow: "hidden" }}>
        <div style={{ width: `${Math.min(1, open) * 100}%`, height: "100%",
          background: `linear-gradient(90deg, ${mxh(CLAY, 0.16)}, ${CLAY})` }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 1, height: 2,
          background: hexa("#FFFFFF", 0.22) }} />
      </div>
      <div style={{ position: "absolute", left: `calc(${w * 0.14}px + ${Math.min(1, open) * 100}% * 0.72)`,
        bottom: h * 0.028, width: w * 0.05, height: w * 0.05, borderRadius: "50%",
        background: `radial-gradient(circle at 34% 30%, ${mxh(CLAY, 0.4)}, ${dkh(CLAY, 0.2)})`,
        border: `2px solid ${hexa(INK, 0.3)}`, opacity: open > 0.02 && open < 0.99 ? 1 : 0 }} />
    </div>
  );
};

/* ---- THE STOP HOOK — the bar that will not let the session end ------------ */
/** ⭐ "forcing it to prove its work" drawn as a MECHANISM THAT FAILS FIRST
    (ANIMATION-QUALITY §12). Rev 2 drew it with five elements and it read as a
    striped bar between two grey sticks. It is now machined: posts with base
    plates and bolt rings, a HYDRAULIC RAM whose piston visibly extends as the
    bar drops, a hazard bar with an end cap and a lit top edge, a lamp in a
    bezel with a lens highlight, and a stencil plate riveted to the bar. */
export const StopHook: React.FC<{ x: number; y: number; w?: number; z?: number; down?: number;
  lamp?: number; f: number; shake?: number }> =
  ({ x, y, w = 520, z = 84, down = 1, lamp = 0, f, shake = 0 }) => {
  const barH = 46;
  const sh = shake > 0.01 ? Math.sin(f * 2.4) * 5 * shake : 0;
  const barTop = 40 + (1 - down) * 190 + sh;
  const lampC = lamp > 0.5 ? DIFFG : DIFFR;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - 240, width: w, height: 300, zIndex: z }}>
      {/* 1 · the two posts, machined, with a lit inner edge */}
      {[0, w - 32].map((px, i) => (
        <React.Fragment key={"po" + i}>
          <div style={{ position: "absolute", left: px, top: 0, width: 32, height: 300,
            background: `linear-gradient(90deg, ${dkh(STEEL, 0.46)}, ${mxh(STEEL, 0.18)} 40%, ${dkh(STEEL, 0.5)})`,
            borderRadius: 5, boxShadow: SH }} />
          <div style={{ position: "absolute", left: px + 5, top: 0, width: 3, height: 300,
            background: hexa("#FFFFFF", 0.24) }} />
          {/* 2 · base plate + four bolts — fine repeated detail */}
          <div style={{ position: "absolute", left: px - 12, top: 274, width: 56, height: 26,
            borderRadius: 4, background: `linear-gradient(180deg, ${mxh(STEEL, 0.1)}, ${dkh(STEEL, 0.44)})`,
            border: `2px solid ${hexa("#000", 0.4)}` }} />
          {[0, 1, 2, 3].map((bq) => (
            <div key={"bo" + bq} style={{ position: "absolute", left: px - 5 + (bq % 2) * 38,
              top: 280 + Math.floor(bq / 2) * 12, width: 7, height: 7, borderRadius: "50%",
              background: `radial-gradient(circle at 34% 30%, ${hexa("#FFF", 0.34)}, ${hexa("#000", 0.62)})` }} />
          ))}
        </React.Fragment>
      ))}
      {/* 3 · THE RAM — the piston extends as the bar comes down */}
      <div style={{ position: "absolute", left: w / 2 - 13, top: 56, width: 26,
        height: 34 + down * 96, borderRadius: 5,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.5)}, ${mxh(STEEL, 0.06)} 46%, ${dkh(STEEL, 0.54)})`,
        border: `2px solid ${hexa("#000", 0.42)}` }} />
      <div style={{ position: "absolute", left: w / 2 - 7, top: 62, width: 14,
        height: 24 + down * 90, borderRadius: 4,
        background: `linear-gradient(90deg, ${mxh(STEEL, 0.34)}, ${mxh(STEEL, 0.52)} 44%, ${dkh(STEEL, 0.2)})` }} />
      {/* 4 · the hazard bar */}
      <div style={{ position: "absolute", left: 20, right: 20, top: barTop, height: barH, borderRadius: 8,
        background: `repeating-linear-gradient(122deg, ${dkh(WARN, 0.04)} 0 24px, ${INK} 24px 48px)`,
        border: `4px solid ${hexa(INK, 0.72)}`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 26, right: 26, top: barTop + 5, height: 3,
        borderRadius: 2, background: hexa("#FFFFFF", 0.26) }} />
      {/* 5 · end caps */}
      {[14, w - 42].map((cx, i) => (
        <div key={"ec" + i} style={{ position: "absolute", left: cx, top: barTop - 4, width: 28,
          height: barH + 8, borderRadius: 5,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)}, ${dkh(STEEL, 0.42)})`,
          border: `2px solid ${hexa("#000", 0.44)}` }} />
      ))}
      {/* 6 · the stencil plate, riveted to the bar */}
      <div style={{ position: "absolute", left: w / 2 - 92, top: barTop + 8, width: 184, height: 30,
        borderRadius: 4, background: hexa("#000", 0.42),
        border: `2px solid ${hexa("#FFFFFF", 0.18)}`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...ui(18, 900), color: hexa("#FFFFFF", 0.92), letterSpacing: 3 }}>{R.skill}</span>
      </div>
      {/* 7 · the LAMP, in a bezel, with a lens highlight */}
      <div style={{ position: "absolute", left: w / 2 - 29, top: 2, width: 58, height: 58,
        borderRadius: "50%", border: `6px solid ${dkh(STEEL, 0.42)}`,
        background: `radial-gradient(circle at 38% 32%, ${mxh(lampC, 0.42)}, ${dkh(lampC, 0.32)})`,
        boxShadow: SH }}>
        <div style={{ position: "absolute", left: "22%", top: "16%", width: "30%", height: "22%",
          borderRadius: "50%", background: hexa("#FFFFFF", 0.42) }} />
      </div>
    </div>
  );
};

/* ---- THE LEDGER — CHECK / EXPECT, printing ------------------------------- */
/** ⭐ THE ARTIFACT THE VO NAMES. A table, drawn as a table: a header, a rule,
    six rows, two columns of real content and a result cell that only fills
    when a command has run. `rows` is how many have printed so far. */
export const LedgerTable: React.FC<{ x: number; y: number; w: number; z?: number; f: number;
  rows?: number; passed?: number[]; failed?: number[]; title?: boolean }> =
  ({ x, y, w, z = 70, f, rows = 6, passed = [], failed = [], title = true }) => {
  const rowH = w * 0.108;
  const h = rowH * 7.2;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z,
      borderRadius: w * 0.02, background: `linear-gradient(176deg, #FFFFFF, ${UISH} 70%, ${UISH2})`,
      border: `${Math.max(2, w * 0.006)}px solid ${hexa(INK, 0.18)}`, boxShadow: SH_D }}>
      {title && (
        <div style={{ position: "absolute", left: w * 0.05, top: rowH * 0.24, right: w * 0.05,
          display: "flex", alignItems: "center", gap: w * 0.03 }}>
          <MarkTile rel d={rowH * 0.66} z={2} />
          <span style={{ ...ui(rowH * 0.4, 900), color: hexa(INK, 0.72), letterSpacing: 2 }}>CHECK</span>
          <span style={{ marginLeft: "auto", ...ui(rowH * 0.4, 900), color: hexa(INK, 0.44),
            letterSpacing: 2 }}>EXPECT</span>
        </div>
      )}
      <div style={{ position: "absolute", left: w * 0.05, right: w * 0.05, top: rowH * 1.02, height: 3,
        background: hexa(INK, 0.24) }} />
      {TASKS.map((t, i) => i >= rows ? null : (
        <div key={"lr" + i} style={{ position: "absolute", left: w * 0.05, right: w * 0.05,
          top: rowH * (1.22 + i * 0.96), height: rowH * 0.72, display: "flex", alignItems: "center",
          gap: w * 0.022 }}>
          {/* the CHECK cell — a command, as a bar with a leading caret */}
          <div style={{ width: rowH * 0.28, height: rowH * 0.28, background: hexa(CARET, 0.9),
            borderRadius: 2, flexShrink: 0 }} />
          <div style={{ width: w * 0.30, height: rowH * 0.24, borderRadius: 3,
            background: hexa(INK, 0.3) }} />
          {/* the EXPECT cell */}
          <div style={{ width: w * 0.20, height: rowH * 0.24, borderRadius: 3,
            background: hexa(t.c, 0.55) }} />
          {/* the result cell */}
          <div style={{ marginLeft: "auto", width: rowH * 0.62, height: rowH * 0.62,
            borderRadius: rowH * 0.14, flexShrink: 0,
            background: passed.includes(i) ? hexa(DIFFG, 0.9)
                      : failed.includes(i) ? hexa(DIFFR, 0.9) : hexa(INK, 0.09),
            border: `2px solid ${hexa(INK, 0.22)}`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            {passed.includes(i) && (
              <svg width="70%" height="70%" viewBox="0 0 24 24">
                <path d="M6 12 L10 16 L18 7" fill="none" stroke="#FFF" strokeWidth={3.6}
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {failed.includes(i) && (
              <svg width="66%" height="66%" viewBox="0 0 24 24">
                <path d="M7 7 L17 17 M17 7 L7 17" stroke="#FFF" strokeWidth={3.6} strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---- THE COMMAND — typing, and its output -------------------------------- */
export const CmdLine: React.FC<{ x: number; y: number; w: number; z?: number; f: number;
  type?: number; label?: string }> = ({ x, y, w, z = 82, f, type = 0, label }) => {
  const blink = (f % 26) < 15 ? 1 : 0.2;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: 66, zIndex: z,
      borderRadius: 10, background: `linear-gradient(180deg, ${TERM2}, ${TERM})`,
      border: `3px solid ${hexa("#000", 0.5)}`, boxShadow: SH_D, display: "flex",
      alignItems: "center", gap: 14, paddingLeft: 20 }}>
      <span style={{ ...mono(30, 800), color: CARET }}>$</span>
      <div style={{ width: (w - 110) * Math.min(1, type), height: 13, borderRadius: 6,
        background: hexa("#FFFFFF", 0.62) }} />
      {type < 1 && <div style={{ width: 13, height: 26, background: hexa(CARET, blink), borderRadius: 2 }} />}
    </div>
  );
};

export const OutputBlock: React.FC<{ x: number; y: number; w: number; z?: number; k?: number;
  seed?: number; fail?: number; f?: number }> = ({ x, y, w, z = 80, k = 1, seed = 3, fail = 0, f = 0 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: w * 0.42, zIndex: z,
    borderRadius: 10, background: hexa(TERM, 0.92), border: `3px solid ${hexa("#000", 0.45)}`,
    boxShadow: SH_D, overflow: "hidden" }}>
    <CodeLines x={18} y={16} w={w - 40} n={7} gap={w * 0.052} h={7} c={fail > 0.5 ? DIFFR : "#FFFFFF"}
      o={0.42} seed={seed} run={k} z={2} f={f} scroll={k > 0.02 && k < 1 ? 3.1 : 0} />
  </div>
);

/** the exit code, stamped */
export const ExitStamp: React.FC<{ x: number; y: number; s?: number; z?: number; k?: number;
  fail?: number }> = ({ x, y, s = 1, z = 90, k = 0, fail = 0 }) => {
  const d = 108 * s;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d, zIndex: z,
      opacity: Math.min(1, k * 1.4), transform: `scale(${1.5 - 0.5 * Math.min(1, k)}) rotate(${-12 + k * 12}deg)`,
      borderRadius: d * 0.2, border: `${6 * s}px solid ${fail > 0.5 ? DIFFR : OKGREEN}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: hexa(fail > 0.5 ? DIFFR : OKGREEN, 0.12) }}>
      <span style={{ ...mono(d * 0.5, 900), color: fail > 0.5 ? DIFFR : OKGREEN }}>
        {fail > 0.5 ? "1" : "0"}
      </span>
    </div>
  );
};

/* ---- THE DISTRACTION — a notification, sliding in ------------------------ */
/** ⭐ "Claude is secretly getting distracted" needs an OBJECT that pulls him
    off, and in this world that object is a NOTIFICATION TOAST. It travels the
    whole panel, it is large and bright, and it means something: it is the thing
    he follows instead of the row he was standing at. */
export const Toast: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  hue?: string }> = ({ x, y, s = 1, z = 50, f, hue = SKY }) => {
  const w = 392 * s, h = 168 * s;
  const bob = Math.sin(f / 7) * 3 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h + bob, width: w, height: h, zIndex: z,
      borderRadius: 16 * s, background: `linear-gradient(176deg, #FFFFFF, ${UISH} 68%, ${UISH2})`,
      border: `${3 * s}px solid ${hexa(INK, 0.18)}`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 14 * s, top: 14 * s, width: 46 * s, height: 46 * s,
        borderRadius: 12 * s, background: `linear-gradient(180deg, ${mxh(hue, 0.2)}, ${dkh(hue, 0.2)})`,
        border: `${2 * s}px solid ${hexa(INK, 0.2)}` }} />
      <div style={{ position: "absolute", left: 74 * s, top: 22 * s, width: w * 0.56, height: 13 * s,
        borderRadius: 6 * s, background: hexa(INK, 0.34) }} />
      <div style={{ position: "absolute", left: 74 * s, top: 46 * s, width: w * 0.40, height: 10 * s,
        borderRadius: 5 * s, background: hexa(INK, 0.18) }} />
      <div style={{ position: "absolute", left: 16 * s, right: 16 * s, top: 78 * s, height: 10 * s,
        borderRadius: 5 * s, background: hexa(INK, 0.13) }} />
      <div style={{ position: "absolute", left: 16 * s, top: 98 * s, width: w * 0.44, height: 10 * s,
        borderRadius: 5 * s, background: hexa(INK, 0.10) }} />
      {/* the unread dot — one hot accent */}
      <div style={{ position: "absolute", right: 16 * s, top: 16 * s, width: 20 * s, height: 20 * s,
        borderRadius: "50%", background: CLAY }} />
    </div>
  );
};

/* ---- THE COST — failing lines stacking up ------------------------------- */
/** the v1 smoke plume's replacement, and it means the same thing: the thing he
    walked away from getting worse while he does not look. Red diff blocks
    accumulate on the wall behind him. */
export const ErrStack: React.FC<{ x: number; y: number; f: number; at: number; k: number; z?: number;
  n?: number; s?: number }> = ({ x, y, f, at, k, z = 58, n = 14, s = 1 }) => (
  <div style={{ position: "absolute", left: x - 130 * s, top: y - 300 * s, width: 260 * s, height: 320 * s,
    zIndex: z }}>
    {Array.from({ length: n }, (_, i) => {
      const t = (i + 1) / n;
      if (k < t * 0.85) return null;
      const r = rnd(i * 6.1 + at * 0.3, 1);
      const wdt = (86 + r * 168) * s;
      const rise = Math.min(1, (k - t * 0.85) * 3.4);
      return (
        <div key={"er" + i} style={{ position: "absolute",
          left: (30 + r * 150) * s + Math.sin((f - at) / 14 + i) * 5 * s,
          top: (300 - t * 300) * s - rise * 22 * s, width: wdt, height: 26 * s, borderRadius: 5 * s,
          background: hexa(DIFFR, 0.30 + 0.5 * rise), opacity: rise }} />
      );
    })}
  </div>
);

/* ---- THE SYSTEM CARD — the receipt --------------------------------------- */
/** ⛔ NOT A QUOTE AND NOT A LOGO. An evaluation category on a page, with its
    source line under it. Guarded by QUOTE_BANNED in AdhWorld. */
export const SysCard: React.FC<{ x: number; y: number; w?: number; z?: number; open?: number;
  lit?: number }> = ({ x, y, w = 460, z = 80, open = 1, lit = 1 }) => {
  const h = w * 0.62;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      borderRadius: w * 0.03, background: `linear-gradient(176deg, #FFFFFF, ${UISH} 62%, ${UISH2})`,
      border: `${Math.max(3, w * 0.008)}px solid ${hexa(INK, 0.22)}`, boxShadow: SH_D,
      opacity: Math.min(1, open * 1.2) }}>
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.09, right: w * 0.06, height: 3,
        background: hexa(INK, 0.18) }} />
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.18, ...ui(w * 0.072, 900),
        color: INK, letterSpacing: 1.5 }}>{R.receipt.term}</div>
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.34, ...ui(w * 0.062, 800),
        color: hexa(INK, 0.62), letterSpacing: 1.5 }}>{R.receipt.term2}</div>
      <div style={{ position: "absolute", left: w * 0.06, right: w * 0.06, top: h * 0.52, height: 2,
        background: hexa(INK, 0.14) }} />
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.60, ...ui(w * 0.040, 800),
        color: hexa(INK, 0.44), letterSpacing: 1.2 }}>{R.receipt.src}</div>
      {/* the little bar chart every eval page has */}
      <div style={{ position: "absolute", right: w * 0.07, bottom: h * 0.10, display: "flex",
        alignItems: "flex-end", gap: w * 0.018, height: h * 0.30 }}>
        {[0.32, 0.54, 0.42, 0.78, 0.6].map((v, i) => (
          <div key={"bc" + i} style={{ width: w * 0.038, height: `${v * 100}%`, borderRadius: 3,
            background: hexa(i === 3 ? DIFFR : INK, i === 3 ? 0.82 : 0.2) }} />
        ))}
      </div>
    </div>
  );
};

/* ---- small parts --------------------------------------------------------- */
/** the struck-out fragment that flies off a tick when it is revoked */
export const Fleck: React.FC<{ x: number; y: number; f: number; at: number; z?: number; s?: number;
  dir?: number }> = ({ x, y, f, at, z = 90, s = 1, dir = 1 }) => {
  const t = Math.max(0, f - at);
  const k = Math.min(1, t / 16);
  return k >= 1 ? null : (
    <div style={{ position: "absolute", left: x + dir * k * 60 * s, top: y - k * 70 * s + k * k * 90 * s,
      width: 18 * s, height: 18 * s, zIndex: z, borderRadius: 3,
      background: hexa(DIFFG, 0.9 * (1 - k)), transform: `rotate(${dir * k * 260}deg)` }} />
  );
};

/** the number drum: 1 -> 10, for the fan-out */
export const Selector: React.FC<{ x: number; y: number; s?: number; z?: number; k: number;
  from?: number; to?: number }> = ({ x, y, s = 1, z = 88, k, from = 1, to = 10 }) => {
  const d = 128 * s;
  const v = Math.round(from + (to - from) * Math.max(0, Math.min(1, k)));
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d, zIndex: z,
      borderRadius: d * 0.18, background: `linear-gradient(180deg, ${TERM3}, ${TERM})`,
      border: `${5 * s}px solid ${hexa("#000", 0.55)}`, boxShadow: SH_D, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2,
        background: hexa("#FFF", 0.10) }} />
      <span style={{ ...mono(d * 0.5, 900), color: "#FFFFFF" }}>{v}</span>
    </div>
  );
};

/** a wall clock — generic, no numerals (TIME_BANNED) */
export const WallClock: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  rate?: number }> = ({ x, y, s = 1, z = 60, f, rate = 1 }) => {
  const d = 120 * s;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d, zIndex: z,
      borderRadius: "50%", background: `linear-gradient(180deg, ${UISH}, ${UISH2})`,
      border: `${6 * s}px solid ${dkh(STEEL, 0.35)}`, boxShadow: SH_D }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: 6 * s, width: 3 * s,
          height: 9 * s, background: hexa(INK, 0.4), transformOrigin: `50% ${d / 2 - 6 * s}px`,
          transform: `translateX(-50%) rotate(${i * 30}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: "50%", top: "24%", width: 4 * s, height: "28%",
        background: INK, transformOrigin: "50% 100%",
        transform: `translateX(-50%) rotate(${(f * 0.6 * rate) % 360}deg)` }} />
      <div style={{ position: "absolute", left: "50%", top: "16%", width: 3 * s, height: "36%",
        background: hexa(INK, 0.7), transformOrigin: "50% 100%",
        transform: `translateX(-50%) rotate(${(f * 7 * rate) % 360}deg)` }} />
    </div>
  );
};

/** the occluder: a stack of dark panes cropped by the frame edge */
export const PaneStack: React.FC<{ x: number; y: number; n?: number; z?: number; s?: number }> =
  ({ x, y, n = 6, z = 94, s = 1 }) => (
  <div style={{ position: "absolute", left: x - 150 * s, top: y - 210 * s, width: 300 * s,
    height: 240 * s, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"ps" + i} style={{ position: "absolute", left: (rnd(i * 3.3, 1) - 0.5) * 14 * s,
        top: 210 * s - i * 30 * s, width: 300 * s, height: 34 * s, borderRadius: 7 * s,
        background: `linear-gradient(180deg, ${TERM3}, ${TERM})`,
        border: `${2 * s}px solid ${hexa("#000", 0.5)}`, boxShadow: SH }} />
    ))}
  </div>
);

/** the bin, for the tick that gets thrown away */
export const Bin: React.FC<{ x: number; y: number; s?: number; z?: number; spike?: boolean }> =
  ({ x, y, s = 1, z = 60 }) => {
  const w = 120 * s, h = 140 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: `${8 * s}px ${8 * s}px ${16 * s}px ${16 * s}px`,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.44)}, ${mxh(STEEL, 0.1)} 42%, ${dkh(STEEL, 0.48)})`,
        clipPath: "polygon(6% 0%, 94% 0%, 84% 100%, 16% 100%)", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -6 * s, right: -6 * s, top: -10 * s, height: 16 * s,
        borderRadius: 8 * s, background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)}, ${dkh(STEEL, 0.4)})` }} />
    </div>
  );
};

/* ---- THE CAST ------------------------------------------------------------ */
/** ⭐ The Claude sprite. `feedback_brand_sprite_is_a_mascot_not_a_badge`: it is
    the house `Mascot`, unreskinned, with the costume levers this world needs —
    glasses (it reads at 240px and it is the one this reel's cast wears) and no
    invented hat. */
export const Dev: React.FC<{ f: number; x: number; y: number; i: number; size: number; z?: number;
  at?: number; loop?: number; tint?: string; flip?: boolean; cheer?: number; extra?: Record<string, number>;
  gaze?: number; shock?: number; stern?: number }> =
  ({ f, x, y, i, size, z = 48, at = 0, loop, tint, flip = false, cheer: cheerIn = 0, extra = {}, gaze: gazeIn = 0,
     shock = 0, stern = 0 }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, cheer = 0, gaze = 0, nod = 3.6;
  if (L === 0) { dx = Math.sin(f / 17 + ph) * size * 0.30; dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055; rot = Math.cos(f / 17 + ph) * 3.4; }
  else if (L === 1) { rot = 7 + Math.sin(f / 6.2 + ph) * 8.5; dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05; dx = Math.sin(f / 6.2 + ph) * size * 0.055; }
  else if (L === 2) { const t = (f / 26 + ph) % 1; const j = Math.max(0, Math.sin(t * Math.PI)); dy = -j * size * 0.24; cheer = j > 0.55 ? 1 : 0; rot = Math.sin(f / 26 + ph) * 2.8; }
  else { gaze = Math.sin(f / 21 + ph) * 1.0; rot = Math.sin(f / 21 + ph) * 4.2; nod = 5.2; }
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy, width: size, height: size, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`, transformOrigin: "50% 100%" }}>
      {/* ⛔ NO `chef={1}`. That single lever was most of what made v1 read as a
          kitchen, and the note was about exactly that. The cast is the house
          Mascot in its own clay, wearing what this world's people wear. */}
      <Mascot lf={f + i * 9} size={size} gaze={gaze + gazeIn} nodAmp={nod} nodSpeed={9 + (i % 3) * 2}
        cheer={Math.max(cheer, cheerIn)} tint={tint} shock={shock} stern={stern} {...extra} />
    </div>
  );
};
