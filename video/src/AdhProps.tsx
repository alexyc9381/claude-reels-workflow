import React from "react";
import { Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, lerpHex, mono, ui,
  squash, costumeFor,
  CLAY, GOLD, GREEN, RED, INK, BRASS, COPPER, BONE, STEEL, SLATE, ROSE, MUTE, SKY, VIOLET, TEAL,
  TERM, TERM2, TERM3, UISH, UISH2, UILINE, DIFFG, DIFFR, CARET, OKGREEN, WARN, LINKB,
  CREAM_TICKET, flameC, TASKS, R,
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
  f?: number; scroll?: number }> =
  ({ x, y, w, n, gap = 14, h = 6, c = "#FFFFFF", o = 0.20, seed = 1, run = 1, z = 6, indent = true,
     f = 0, scroll = 0 }) => {
  /* ⭐⭐⭐ THE SCROLLBACK SCROLLS, AND THAT IS THE WHOLE POINT OF THE WORLD.
     Rev 2's first render measured a median 8.57 against a 9.00 bar with two
     STATIC scenes, and the reason was structural rather than per-scene: a
     terminal that never prints is a photograph of a terminal. Every wall in
     this reel is made of these lines, so animating them lifts ELEVEN scenes at
     once, and it is the one motion in the set that needs no excuse.
     ⛔ NOT A WRAPPING COUNTER. `feedback_a_wrapping_counter_reads_as_chop`: an
     `f % N` teleport reads as a jump AND the motion audit rewards it, which is
     the worst combination. Lines move up by a CONSTANT px/frame and the content
     index advances by exactly one at the moment a line leaves the top, so each
     line travels its whole distance and nothing ever jumps. */
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
        return on <= 0 ? null : (
          <div key={i} style={{ position: "absolute", left: ind, top: i * gap - off,
            width: len * Math.min(1, on), height: h, borderRadius: h / 2,
            background: hexa(c, o * (0.62 + 0.38 * rnd(seed + src * 3.1, 1))) }} />
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
/** ⭐⭐⭐ Claude Code's own checklist, drawn as paper so it is the brightest
    object in the frame and can carry the frame-0 claim plate. Six rows out of
    the ONE `TASKS` table, a big tally, the Claude mark in the header.
    `mode="ledger"` swaps the right half for the CHECK / EXPECT columns the fix
    introduces — the same object, after the skill lands, which is what makes the
    substitution readable rather than a new prop appearing. */
export const TodoList: React.FC<{ x: number; y: number; w: number; h: number; z?: number; f: number;
  ticks: boolean[]; proved?: boolean[]; struck?: boolean[]; big?: string; sub?: string;
  mode?: "todo" | "ledger"; rot?: number; o?: number; stand?: boolean; hard?: number;
  runRow?: number; runK?: number }> =
  ({ x, y, w, h, z = 78, f, ticks, proved = [], struck = [], big, sub = "TODO", mode = "todo",
     rot = 0, o = 1, stand = false, hard = -1, runRow = -1, runK = 0 }) => {
  const rowH = h * 0.108;
  const top = h * 0.30;
  const pad = w * 0.065;
  const boxS = rowH * 0.78;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)`, opacity: o, borderRadius: w * 0.022,
      background: `linear-gradient(176deg, #FCFAF4 0%, ${UISH} 58%, ${UISH2} 100%)`,
      boxShadow: SH_D, border: `${Math.max(2, w * 0.006)}px solid ${hexa(INK, 0.14)}` }}>
      {/* the punched left margin — paper, and it reads at thumbnail size */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"pn" + i} style={{ position: "absolute", left: pad * 0.34, top: top + i * rowH + rowH * 0.3,
          width: w * 0.018, height: w * 0.018, borderRadius: "50%", background: hexa(INK, 0.13) }} />
      ))}
      {/* header: the mark, the word, the tally */}
      <div style={{ position: "absolute", left: pad, top: h * 0.075, right: pad, height: h * 0.15,
        display: "flex", alignItems: "center", gap: w * 0.035 }}>
        <MarkTile rel d={h * 0.135} z={2} />
        <span style={{ ...ui(h * 0.086, 900), color: hexa(INK, 0.74), letterSpacing: 2 }}>{sub}</span>
        <span style={{ marginLeft: "auto", fontFamily: "Fraunces, serif", fontWeight: 900,
          fontSize: h * 0.155, color: INK, lineHeight: 1 }}>{big}</span>
      </div>
      <div style={{ position: "absolute", left: pad, right: pad, top: h * 0.245, height: 3,
        background: hexa(INK, 0.2) }} />
      {/* the six rows */}
      {TASKS.map((t, i) => {
        const isRun = i === runRow;
        return (
          <div key={"r" + i} style={{ position: "absolute", left: pad, right: pad, top: top + i * rowH,
            height: rowH * 0.86, display: "flex", alignItems: "center", gap: w * 0.03 }}>
            <CheckBox rel s={boxS} k={ticks[i] ? 1 : 0} proved={proved[i] ? 1 : 0}
              struck={struck[i] ? 1 : 0} z={3} />
            {/* the task name as a BAR with its own colour, plus a hard-task marker */}
            <div style={{ position: "relative", flex: 1, height: rowH * 0.30, borderRadius: rowH * 0.15,
              background: hexa(t.c, i === hard ? 0.85 : 0.5),
              width: `${52 + (i * 7) % 34}%`, flexGrow: 0 }} />
            {i === hard && (
              <div style={{ width: boxS * 0.42, height: boxS * 0.42, borderRadius: 3,
                background: DIFFR, transform: "rotate(45deg)", flexShrink: 0 }} />
            )}
            {mode === "ledger" && (
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: w * 0.018 }}>
                <div style={{ width: w * 0.19, height: rowH * 0.26, borderRadius: 2,
                  background: hexa(INK, 0.24) }} />
                <div style={{ width: w * 0.10, height: rowH * 0.26, borderRadius: 2,
                  background: hexa(t.needsRun ? DIFFG : INK, t.needsRun ? 0.5 : 0.16) }} />
              </div>
            )}
            {isRun && runK > 0.02 && (
              <div style={{ position: "absolute", left: -pad * 0.5, right: -pad * 0.5, top: -rowH * 0.1,
                bottom: -rowH * 0.1, borderRadius: rowH * 0.2, border: `3px solid ${hexa(CARET, 0.9)}`,
                background: hexa(CARET, 0.10) }} />
            )}
          </div>
        );
      })}
      {stand && (
        <div style={{ position: "absolute", left: w * 0.42, top: h - 2, width: w * 0.16, height: h * 0.05,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)}, ${dkh(STEEL, 0.3)})`, borderRadius: 3 }} />
      )}
    </div>
  );
};

/* ---- THE SESSION CHROME — one fitout layer, in every room ----------------- */
/** ⭐⭐⭐ THE SECOND HALF OF THE BRAND FIX. `feedback_the_world_must_speak_the_
    subjects_brand` is explicit that the hero object alone is not enough: the
    ROOM has to say it too, with one component drawn in every scene, painted
    from that scene's own `Place` so it never looks pasted on
    (`feedback_rooms_need_an_architecture_layer`).

    Here that is the terminal itself, as ARCHITECTURE:
      · the SESSION BAR across the top — the Claude mark, the cwd chip, and a
        context meter that drains as the reel runs
      · the SCROLLBACK on the back wall — ragged code lines in the room's own
        value ramp, with a DIFF GUTTER of green and red bars beside them
      · a rule line and a faint Claude stencil, so the wall is never empty
      · the PROMPT ROW at the bottom of the wall, with a blinking caret */
export const SesFit: React.FC<{ p: any; f: number; seed?: number; z?: number; lift?: number;
  ctx?: number; run?: number }> = ({ p, f, seed = 1, z = 5, lift = 1, ctx = 1, run = 1 }) => {
  const wallTop = 96 * lift;
  const wallBot = p.horizon - 8;
  const ink = p.grit || "#101010";
  const light = p.back2 || "#FFFFFF";
  const blink = (f % 30) < 17 ? 1 : 0.15;
  return (
    <>
      {/* the wall itself — a flat terminal ground, darker than the room's back */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallTop, height: wallBot - wallTop,
        zIndex: z, background: `linear-gradient(180deg, ${hexa(ink, 0.5)}, ${hexa(ink, 0.22)})` }} />
      {/* the session bar */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallTop, height: 46, zIndex: z + 1,
        background: `linear-gradient(180deg, ${hexa(light, 0.30)}, ${hexa(ink, 0.34)})`,
        borderBottom: `3px solid ${hexa(ink, 0.6)}`, display: "flex", alignItems: "center",
        gap: 14, paddingLeft: 76, paddingRight: 76 }}>
        <MarkTile rel d={30} z={2} />
        <div style={{ width: 132, height: 11, borderRadius: 5, background: hexa(light, 0.46) }} />
        <div style={{ width: 62, height: 11, borderRadius: 5, background: hexa(light, 0.24) }} />
        {/* the context meter, draining */}
        <div style={{ marginLeft: "auto", width: 190, height: 13, borderRadius: 7,
          background: hexa(ink, 0.55), border: `2px solid ${hexa(light, 0.30)}`, overflow: "hidden" }}>
          <div style={{ width: `${Math.max(6, ctx * 100)}%`, height: "100%",
            background: ctx > 0.34 ? hexa(light, 0.72) : hexa(WARN, 0.9) }} />
        </div>
      </div>
      {/* the scrollback, in two columns, with a diff gutter */}
      <div style={{ position: "absolute", left: 8, top: wallTop + 74, width: 26,
        height: wallBot - wallTop - 130, zIndex: z + 2 }}>
        {Array.from({ length: 16 }, (_, i) => {
          const adv = f * 2.3, off = adv % 22, src = Math.floor(adv / 22) + i;
          const r = rnd(seed * 11.3 + src * 5.7, 1);
          const c = r > 0.72 ? DIFFG : r > 0.52 ? DIFFR : light;
          return <div key={"g" + i} style={{ position: "absolute", left: 6, top: i * 22 - off, width: 14,
            height: 8, borderRadius: 2, background: hexa(c, r > 0.52 ? 0.62 : 0.20) }} />;
        })}
      </div>
      <CodeLines x={48} y={wallTop + 74} w={362} n={15} gap={22} h={7} c={light} o={0.40}
        seed={seed * 2.1} run={run} z={z + 2} f={f} scroll={2.3} />
      <CodeLines x={598} y={wallTop + 96} w={330} n={12} gap={24} h={7} c={light} o={0.27}
        seed={seed * 3.7} run={run} z={z + 2} f={f} scroll={1.55} />
      {/* a faint Claude stencil on the back wall — the room saying whose it is */}
      <div style={{ position: "absolute", left: 452, top: wallTop + 112, width: 116, height: 116,
        zIndex: z + 1, opacity: 0.14 }}>
        <Img src={staticFile("logos/claude.svg")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      {/* the prompt row at the foot of the wall */}
      <div style={{ position: "absolute", left: -60, right: -60, top: wallBot - 46, height: 46,
        zIndex: z + 2, background: hexa(ink, 0.42), borderTop: `2px solid ${hexa(light, 0.22)}`,
        display: "flex", alignItems: "center", gap: 12, paddingLeft: 76 }}>
        <div style={{ width: 16, height: 20, background: hexa(CARET, 0.95 * blink), borderRadius: 2 }} />
        <div style={{ width: 240, height: 10, borderRadius: 5, background: hexa(light, 0.34) }} />
        <div style={{ width: 96, height: 10, borderRadius: 5, background: hexa(light, 0.18) }} />
      </div>
    </>
  );
};

/* ---- THE PANE — one sub-agent, or one lane of the session ----------------- */
/** the near-black unit the whole set is built from. A title bar with a state
    lamp and a name chip, ragged output, a caret while it runs, and a result
    stamp when it finishes. Ten of these ARE the payoff. */
export const Pane: React.FC<{ x: number; y: number; w: number; h: number; z?: number; f: number;
  on?: number; run?: number; done?: number; fail?: number; seed?: number; label?: boolean }> =
  ({ x, y, w, h, z = 40, f, on = 1, run = 0, done = 0, fail = 0, seed = 1, label = true }) => {
  const blink = (Math.floor(f / 9) + seed) % 2 === 0 ? 1 : 0.2;
  const lamp = fail > 0.02 ? DIFFR : done > 0.02 ? DIFFG : run > 0.02 ? CARET : MUTE;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: Math.max(6, w * 0.035), overflow: "hidden", opacity: 0.34 + on * 0.66,
      background: `linear-gradient(180deg, ${TERM2}, ${TERM})`,
      border: `${Math.max(2, w * 0.012)}px solid ${hexa("#000", 0.5)}`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.20,
        background: `linear-gradient(180deg, ${TERM3}, ${TERM2})`,
        borderBottom: `2px solid ${hexa("#000", 0.4)}`, display: "flex", alignItems: "center",
        gap: w * 0.05, paddingLeft: w * 0.06 }}>
        <div style={{ width: h * 0.09, height: h * 0.09, borderRadius: "50%",
          background: hexa(lamp, on > 0.4 ? 0.95 : 0.4) }} />
        {label && <div style={{ width: w * 0.42, height: h * 0.055, borderRadius: 3,
          background: hexa("#FFF", 0.24) }} />}
      </div>
      <CodeLines x={w * 0.07} y={h * 0.30} w={w * 0.82} n={Math.max(3, Math.round(h / 26))}
        gap={h * 0.115} h={Math.max(3, h * 0.032)} c="#FFFFFF" o={0.30 + on * 0.22}
        seed={seed * 4.3} run={run > 0 ? run : 1} z={2} f={f}
        scroll={run > 0.02 && done < 0.02 ? 2.4 + (seed % 4) * 0.5 : 0} />
      {run > 0.02 && done < 0.02 && (
        <div style={{ position: "absolute", left: w * 0.07, bottom: h * 0.12, width: w * 0.05,
          height: h * 0.075, background: hexa(CARET, blink), borderRadius: 2 }} />
      )}
      {done > 0.02 && (
        <div style={{ position: "absolute", right: w * 0.07, bottom: h * 0.10,
          width: h * 0.20, height: h * 0.20, borderRadius: 4,
          background: hexa(DIFFG, 0.9 * done), display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <svg width="100%" height="100%" viewBox="0 0 24 24">
            <path d="M6 12 L10 16 L18 7" fill="none" stroke="#FFF" strokeWidth={3.4}
              strokeLinecap="round" strokeLinejoin="round" />
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
/** the input bar of the session: a wide lit rail with the caret, a hint strip
    and three state lamps. It is the brightest horizontal in the frame, which is
    what lets the panes above stay near-black. */
export const PromptRail: React.FC<{ f: number; z?: number; topY?: number; lampBarY?: number;
  lamps?: number[]; lampX?: number[]; dx?: number; surface?: string }> =
  ({ f, z = 70, topY = 632, lampBarY = 214, lamps = [1, 1, 1], lampX = [386, 536, 686], dx = 0,
     surface = "#ECEFF2" }) => {
  const blink = (f % 30) < 17 ? 1 : 0.18;
  return (
    <>
      {/* the rail slab, in perspective */}
      <div style={{ position: "absolute", left: -120 + dx, right: -120 - dx, top: topY, height: H - topY,
        zIndex: z, background: `linear-gradient(180deg, ${surface} 0%, ${dkh(surface, 0.10)} 42%, ${dkh(surface, 0.28)} 100%)`,
        clipPath: "polygon(9% 0%, 91% 0%, 100% 100%, 0% 100%)", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -120 + dx, right: -120 - dx, top: topY, height: 9,
        zIndex: z + 1, background: hexa(INK, 0.34) }} />
      {/* the caret and the input line */}
      <div style={{ position: "absolute", left: 178 + dx, top: topY + 30, display: "flex",
        alignItems: "center", gap: 16, zIndex: z + 2 }}>
        <div style={{ width: 20, height: 30, background: hexa(CARET, blink), borderRadius: 3 }} />
        <div style={{ width: 300, height: 13, borderRadius: 6, background: hexa(INK, 0.26) }} />
        <div style={{ width: 120, height: 13, borderRadius: 6, background: hexa(INK, 0.13) }} />
      </div>
      {/* three state lamps in the rail's own lamp bar */}
      {lampX.map((lx, i) => (
        <div key={"lp" + i} style={{ position: "absolute", left: lx + dx, top: lampBarY, width: 62,
          height: 18, zIndex: z + 2, borderRadius: 9,
          background: `linear-gradient(180deg, ${hexa(GOLD, 0.9 * (lamps[i] ?? 0))}, ${hexa(GOLD, 0.4 * (lamps[i] ?? 0))})`,
          border: `2px solid ${hexa(INK, 0.3)}` }} />
      ))}
    </>
  );
};

/* ---- THE ANSWER — what leaves the session -------------------------------- */
/** a response card travelling toward camera. `items` are the six rows it
    actually contains, so an EMPTY one is visibly a lie and a full one is
    visibly the payoff. */
export const AnswerCard: React.FC<{ x: number; y: number; w?: number; z?: number; items?: boolean[];
  rot?: number; bad?: number }> =
  ({ x, y, w = 300, z = 74, items = [true, true, false, false, false, false], rot = 0, bad = 0 }) => {
  const h = w * 0.46;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)`, borderRadius: w * 0.035,
      background: `linear-gradient(176deg, #FFFFFF, ${UISH} 62%, ${UISH2})`,
      border: `${Math.max(2, w * 0.008)}px solid ${hexa(INK, bad > 0.02 ? 0.3 : 0.16)}`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: w * 0.05, top: h * 0.09, display: "flex",
        alignItems: "center", gap: w * 0.03 }}>
        <MarkTile rel d={h * 0.2} z={2} />
        <div style={{ width: w * 0.34, height: h * 0.075, borderRadius: 4, background: hexa(INK, 0.24) }} />
      </div>
      {items.map((on, i) => (
        <div key={"a" + i} style={{ position: "absolute", left: w * 0.05 + (i % 2) * w * 0.47,
          top: h * 0.36 + Math.floor(i / 2) * h * 0.19, width: w * 0.42, height: h * 0.10,
          borderRadius: h * 0.05,
          background: on ? hexa(TASKS[i].c, 0.68) : hexa(INK, 0.07),
          border: on ? "none" : `2px dashed ${hexa(INK, 0.16)}` }} />
      ))}
      {bad > 0.02 && (
        <div style={{ position: "absolute", right: w * 0.05, top: h * 0.10, width: h * 0.2, height: h * 0.2,
          borderRadius: 4, background: hexa(DIFFR, 0.9), transform: "rotate(45deg)" }} />
      )}
    </div>
  );
};

/* ---- THE TICK PILE — the villain, accumulating --------------------------- */
/** ⭐ THE VILLAIN MADE COUNTABLE. Rows that were ticked without being run, on a
    spindle. Each is a green tick over an EMPTY bar: the picture of the claim
    the reel is about. `slips` is the count, so the pile is a NUMBER that grows
    (`feedback_when_the_info_is_the_number_the_box_is_decoration`). */
export const TickPile: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  jolt?: number; slips?: number; struck?: number }> =
  ({ x, y, s = 1, z = 80, f, jolt = 0, slips = 4, struck = 0 }) => {
  const rowW = 190 * s, rowH = 34 * s;
  return (
    <div style={{ position: "absolute", left: x - rowW / 2, top: y - rowH * (slips + 1),
      width: rowW, height: rowH * (slips + 2), zIndex: z,
      transform: `translateY(${jolt * 5 * s}px)` }}>
      {/* the spindle */}
      <div style={{ position: "absolute", left: rowW / 2 - 5 * s, top: 0, width: 10 * s,
        height: rowH * (slips + 1.6),
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.36)}, ${mxh(STEEL, 0.24)}, ${dkh(STEEL, 0.4)})`,
        borderRadius: 3 * s }} />
      {Array.from({ length: slips }, (_, i) => {
        const off = (rnd(i * 4.7, 1) - 0.5) * 12 * s;
        return (
          <div key={"tp" + i} style={{ position: "absolute", left: off, top: rowH * (slips - i) * 0.82,
            width: rowW, height: rowH, borderRadius: 4 * s,
            background: `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
            border: `${2 * s}px solid ${hexa(INK, 0.2)}`, boxShadow: SH,
            transform: `rotate(${(rnd(i * 2.3, 1) - 0.5) * 5}deg)`,
            display: "flex", alignItems: "center", gap: 8 * s, paddingLeft: 8 * s }}>
            <CheckBox rel s={rowH * 0.66} k={1} struck={struck} z={2} />
            <div style={{ width: rowW * 0.5, height: rowH * 0.16, borderRadius: 3,
              background: hexa(INK, 0.10), border: `1px dashed ${hexa(INK, 0.2)}` }} />
          </div>
        );
      })}
      {/* the base */}
      <div style={{ position: "absolute", left: rowW / 2 - 34 * s, top: rowH * (slips + 1.3),
        width: 68 * s, height: 16 * s, borderRadius: 6 * s,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)}, ${dkh(STEEL, 0.38)})` }} />
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
export const SkillFile: React.FC<{ x: number; y: number; w?: number; z?: number; open?: number;
  rot?: number; lit?: number }> = ({ x, y, w = 300, z = 80, open = 0, rot = 0, lit = 1 }) => {
  const h = w * 1.24;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)`, borderRadius: w * 0.05,
      background: `linear-gradient(172deg, #FFFFFF, ${UISH} 54%, ${UISH2})`,
      border: `${Math.max(3, w * 0.012)}px solid ${hexa(INK, 0.2)}`, boxShadow: SH_D }}>
      {/* the folded corner every file card has */}
      <div style={{ position: "absolute", right: 0, top: 0, width: w * 0.2, height: w * 0.2,
        background: `linear-gradient(225deg, ${hexa(INK, 0.14)} 50%, transparent 50%)`,
        borderTopRightRadius: w * 0.05 }} />
      <div style={{ position: "absolute", left: w * 0.5 - w * 0.15, top: h * 0.10, width: w * 0.3,
        height: w * 0.3 }}>
        <MarkTile rel d={w * 0.3} z={2} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.48, textAlign: "center",
        ...ui(w * 0.115, 900), color: INK, letterSpacing: 3 }}>{R.skill}</div>
      <div style={{ position: "absolute", left: w * 0.16, right: w * 0.16, top: h * 0.60, height: 3,
        background: hexa(INK, 0.22) }} />
      <CodeLines x={w * 0.16} y={h * 0.66} w={w * 0.68} n={5} gap={w * 0.075} h={w * 0.028}
        c={INK} o={0.30} seed={9.1} z={2} />
      {/* the install bar, filling */}
      <div style={{ position: "absolute", left: w * 0.14, right: w * 0.14, bottom: h * 0.055,
        height: w * 0.075, borderRadius: w * 0.038, background: hexa(INK, 0.12),
        border: `2px solid ${hexa(INK, 0.2)}`, overflow: "hidden" }}>
        <div style={{ width: `${Math.min(1, open) * 100}%`, height: "100%",
          background: `linear-gradient(90deg, ${mxh(CLAY, 0.1)}, ${CLAY})` }} />
      </div>
    </div>
  );
};

/* ---- THE STOP HOOK — the bar that will not let the session end ------------ */
/** ⭐ "forcing it to prove its work" drawn as a MECHANISM that FAILS first
    (ANIMATION-QUALITY §12): the bar drops, the answer hits it, the lamp goes
    red, and only a stamped row lifts it. */
export const StopHook: React.FC<{ x: number; y: number; w?: number; z?: number; down?: number;
  lamp?: number; f: number; shake?: number }> =
  ({ x, y, w = 520, z = 84, down = 1, lamp = 0, f, shake = 0 }) => {
  const barH = 44;
  const sh = shake > 0.01 ? Math.sin(f * 2.4) * 5 * shake : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - 240, width: w, height: 300, zIndex: z }}>
      {/* the two posts */}
      {[0, w - 30].map((px, i) => (
        <div key={"po" + i} style={{ position: "absolute", left: px, top: 0, width: 30, height: 300,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.42)}, ${mxh(STEEL, 0.14)} 45%, ${dkh(STEEL, 0.46)})`,
          borderRadius: 5, boxShadow: SH }} />
      ))}
      {/* the bar */}
      <div style={{ position: "absolute", left: 18, right: 18, top: 40 + (1 - down) * 190 + sh,
        height: barH, borderRadius: 8,
        background: `repeating-linear-gradient(122deg, ${dkh(WARN, 0.06)} 0 22px, ${INK} 22px 44px)`,
        border: `4px solid ${hexa(INK, 0.6)}`, boxShadow: SH_D }} />
      {/* the lamp */}
      <div style={{ position: "absolute", left: w / 2 - 26, top: 4, width: 52, height: 52,
        borderRadius: "50%", border: `5px solid ${dkh(STEEL, 0.4)}`,
        background: lamp > 0.5 ? `radial-gradient(circle at 40% 34%, ${mxh(DIFFG, 0.4)}, ${dkh(DIFFG, 0.3)})`
                               : `radial-gradient(circle at 40% 34%, ${mxh(DIFFR, 0.36)}, ${dkh(DIFFR, 0.34)})`,
        boxShadow: SH }} />
      {/* the stencil */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96 + (1 - down) * 190,
        textAlign: "center", ...ui(21, 900), color: hexa("#FFFFFF", 0.9), letterSpacing: 4 }}>
        {R.skill}
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
