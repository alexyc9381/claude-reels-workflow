import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  mono, ui, R, GY, CLAY, GOLD, GREEN, RED, SKY, BONE, INK, MUTE, STEEL, PAPER,
  BRASS, SODIUM, TEAL, SLATE, EMBER, VIOLET, CREAMB, Crew, Hero, Forearm, Pool, Ring, Puff, Contact,
} from "./AgWorld";

/* ===========================================================================
   REEL 134 · "AGENTS" — THE PROPS.  Board: storyboards/134-agents.md.

   ⛔⛔ EVERY PROP IS DRAWN, NOT PRIMITIVE (`feedback_props_need_real_drawing`).
   A rack is a frame with uprights, cross-rails, bolt heads and a shadowed
   interior — not a rounded rect. A ticket has a perforation and a punched hole.
   A laptop has a hinge gap, a lid bezel and a deck with a trackpad.

   ⛔⛔ AND THE INFORMATION IS IN THE GRAPHIC, NOT IN TYPE
   (`feedback_graphical_over_textual`): the rack says "two hundred" by holding
   two hundred COUNTABLE plates, not by printing a numeral. Only three objects
   in the whole reel carry a legible string — the repo plate, the pay hook and
   the keyword plate — and each of them is a real sign that would carry one.
   ========================================================================= */

/* ---- the real mark, on a plate ------------------------------------------- */
export const RealMark: React.FC<{ src: string; s?: number; z?: number; x?: number; y?: number;
  bg?: string; inv?: boolean }> =
  ({ src, s = 64, z = 80, x, y, bg = "#FFFFFF", inv = false }) => (
  <div style={{ position: x === undefined ? "relative" : "absolute", left: x, top: y,
    width: s * 1.32, height: s * 1.32, borderRadius: s * 0.26, zIndex: z, background: bg,
    border: `${Math.max(2, s * 0.05)}px solid #E8DCC0`, display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: SH, flexShrink: 0 }}>
    <Img src={staticFile("logos/" + src)}
      style={{ width: s, height: s, objectFit: "contain", filter: inv ? "invert(1)" : undefined }} />
  </div>
);

/* ===========================================================================
   THE RACK — the reel's SETTING and the hook's one dominant object.

   ⭐⭐⭐ THIS IS THE COUNTABLE CONTENT THE MOTION TABLE PAYS FOR. "Real content
   arriving (a list whose rows land one by one)" moves a stuck second from
   6.3-6.9 to 8.0-8.5, and it is the only kind of motion that also MEANS
   something. 202 plates snapping into a near-black frame is that row, at scale.

   ⛔ THE VALUE IS THE POINT (`feedback_eyecatch_is_value_structure`): the frame
   is NEAR-BLACK FURNITURE and the plates are BONE. Every plate boundary is a
   large luma step, which is what the greyscale audit can actually see — and it
   is also just what a lit rack in a dim hall looks like.
   ⛔ THE DARK MASS IS FURNITURE, NEVER A TINTED SPRITE.
   ========================================================================= */

/** ⛔⛔ THIS RETURNS **HEX**, NOT `rgb(...)`, AND THAT IS THE WHOLE POINT.
    `dkh`/`mxh` parse a hex string, so feeding them an `rgb(...)` makes
    `parseInt("gb(239,231,212)", 16)` = NaN and every channel resolves to 0 —
    it does not throw, the style is not dropped, IT RENDERS SOLID BLACK
    (`feedback_nested_colour_helpers_go_black`, reel 99). The first build of
    this file did exactly that and every plate in the rack came out black, which
    read as "the fill animation is broken" rather than as a one-line bug. */
const lerp = (a: string, b: string, t: number) => {
  const pa = parseInt(a.replace("#", ""), 16), pb = parseInt(b.replace("#", ""), 16);
  const m = (s: number) => Math.round((((pa >> s) & 255) * (1 - t)) + (((pb >> s) & 255) * t));
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(m(16))}${h(m(8))}${h(m(0))}`;
};

/** one engraved plate. `t` is drawn only when it is big enough to read — under
    ~46px wide a string is mush, and a plate's job at that size is to be
    COUNTABLE, not legible. */
export const RolePlate: React.FC<{ x: number; y: number; w?: number; h?: number; t?: string;
  c?: string; z?: number; k?: number; rot?: number; lit?: number; tab?: string }> =
  ({ x, y, w: ww = 88, h: hh = 26, t, c = BONE, z = 40, k = 1, rot = 0, lit = 1, tab }) => {
  if (k <= 0) return null;
  const face = lerp(dkh(c, 0.34), c, lit);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `scaleX(${k}) rotate(${rot}deg)`, transformOrigin: "0% 50%",
      background: `linear-gradient(176deg, ${mxh(face, 0.20)} 0%, ${dkh(face, 0.16)} 100%)`,
      borderTop: `2px solid ${hexa("#FFFFFF", 0.34 * lit)}`,
      borderLeft: `2px solid ${hexa("#000000", 0.22)}`,
      boxShadow: `0 3px 0 ${hexa("#000000", 0.34)}`,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {t && ww >= 46 && (
        <span style={{ ...mono(Math.min(15, ww * 0.115), 900), color: "#241E14",
          letterSpacing: "0.03em", whiteSpace: "nowrap", opacity: 0.86 }}>{t}</span>
      )}
      {/* ⭐ THE FILING TAB. Without it a grid of identical bone rectangles reads
          as a SPREADSHEET, which is the container/text failure the craft doc
          bans — the first sheet of this hook showed exactly that. A coloured tab
          is what a real role card carries, it makes each plate an OBJECT rather
          than a cell, and it is also where the frame's saturated pixels come
          from (BODY_SAT wants >= 34%). */}
      {tab && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: Math.max(4, ww * 0.075),
          background: tab }} />
      )}
      {/* the etched score line every plate in this shop carries */}
      <div style={{ position: "absolute", left: 3, right: 3, bottom: 3, height: 1,
        background: hexa("#000000", 0.20) }} />
    </div>
  );
};


/** the tab colours, cycled DETERMINISTICALLY — a re-render must be identical,
    so this is indexed, never random. They are the three roles the VO names plus
    the architect and two neutral domains, which is what the repo's own category
    list looks like. */
const TABS = [R.roles[0].c, R.roles[1].c, R.roles[2].c, R.architect.c, "#8B72B0", "#7FC0C9"];

/** ⭐⭐⭐ THE RACK WALL. A near-black steel frame with `cols` x `rows` bays, and
    the plates land COLUMN BY COLUMN so the fill reads as a sweep with a hard
    leading edge rather than a uniform fade-in
    (`feedback_uniform_field_repaints_nothing`: a uniform field translating
    repaints nothing; what measures is a hard boundary crossing the frame).

    `fill` 0..1 drives how much of the rack is stocked. `off` shifts the whole
    rack vertically so a scene can push it past the top of frame. */
export const RoleRack: React.FC<{
  x: number; y: number; w: number; h: number; f: number; fill: number;
  cols?: number; rows?: number; z?: number; label?: boolean; lit?: number; seed?: number;
}> = ({ x, y, w: ww, h: hh, f, fill, cols = 8, rows = 9, z = 34, label = false,
        lit = 1, seed = 0 }) => {
  const pad = 14;
  const cw = (ww - pad * 2) / cols, rh = (hh - pad * 2) / rows;
  const pw = cw - 8, ph = Math.min(rh - 7, 30);
  const n = cols * rows;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* the carcass — near-black, and it is FURNITURE */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(172deg, #14181F 0%, #080A0E 100%)`,
        border: "6px solid #05070A", boxShadow: SH_D }} />
      {/* the shadowed interior, so the bays have depth */}
      <div style={{ position: "absolute", left: pad - 4, top: pad - 4,
        right: pad - 4, bottom: pad - 4, background: "#04060A" }} />
      {/* the uprights */}
      {Array.from({ length: cols + 1 }, (_, c) => (
        <div key={"up" + c} style={{ position: "absolute", left: pad + c * cw - 3, top: 6,
          bottom: 6, width: 6, background: "linear-gradient(90deg,#252C36,#0C1016)", zIndex: 3 }} />
      ))}
      {/* the cross-rails, each with its own lit lip so the rack looks machined */}
      {Array.from({ length: rows + 1 }, (_, r) => (
        <div key={"rl" + r} style={{ position: "absolute", left: 6, right: 6,
          top: pad + r * rh - 3, height: 5, zIndex: 3,
          background: `linear-gradient(180deg,${hexa("#4A5462", 0.85)},#0A0E14)` }} />
      ))}
      {/* THE PLATES — column by column, each with its own small stagger */}
      {Array.from({ length: n }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        /* column-major order: the fill front sweeps left to right */
        const ord = c * rows + r;
        const at = (ord / n) * 0.82 + rnd(i + seed, 3) * 0.16;
        const k = E(fill, at, at + 0.10, 0, 1, OUT);
        if (k <= 0.02) return null;
        return (
          <RolePlate key={"rp" + i} x={pad + c * cw + 4} y={pad + r * rh + 4}
            w={pw} h={ph} z={6}
            t={label ? R.deck[i % R.deck.length] : undefined}
            c={i % 7 === 3 ? CREAMB : BONE} k={k}
            tab={TABS[(i * 5 + r) % TABS.length]}
            lit={lit * (0.72 + rnd(i + seed, 5) * 0.28)} />
        );
      })}
      {/* ⭐⭐⭐ THE LOADING FRONT. `motion ≈ (fraction of panel repainted per 0.1s)
          × (luma delta)`, and 72 plates of ~2k px arriving over 84 frames
          repaints about 0.6% of the panel per sample — which is why the first
          build measured 6.87 with the whole rack filling. A bright bar the FULL
          HEIGHT of the rack travelling with the fill front is ~28k px of hard
          light-against-shadow boundary moving every frame: the single biggest
          row in the measured table, and here it is just what a work light
          following the loading would do. */}
      {fill > 0.01 && fill < 0.99 && (
        <>
          <div style={{ position: "absolute", left: pad + fill * (ww - pad * 2) - 34, top: 4,
            width: 68, height: hh - 8, zIndex: 9,
            background: `linear-gradient(90deg, ${hexa("#FFE9B4", 0)} 0%, ${hexa("#FFE9B4", 0.52)} 46%, ${hexa("#FFE9B4", 0)} 100%)` }} />
          <div style={{ position: "absolute", left: pad + fill * (ww - pad * 2) + 22, top: 4,
            width: 40, height: hh - 8, zIndex: 9,
            background: `linear-gradient(90deg, ${hexa("#05070A", 0.62)} 0%, ${hexa("#05070A", 0)} 100%)` }} />
        </>
      )}
      {/* the head rail — where the repo plate bolts on */}
      <div style={{ position: "absolute", left: -8, right: -8, top: -22, height: 26,
        background: "linear-gradient(180deg,#39424E,#12161E)",
        border: "3px solid #05070A", zIndex: 8 }} />
    </div>
  );
};

/* ===========================================================================
   THE REPO PLATE — the one object a viewer RECOGNISES in half a second.

   ⭐⭐⭐ REEL 133's FINDING, APPLIED FIRST RATHER THAN AFTER A REJECTION: *at
   half a second on a phone a viewer RECOGNISES A MARK; they do not decode a
   silhouette.* This repo has no brand of its own, so the mark that matters is
   GITHUB, and the proof is the star count, which is GitHub's own number.

   ⛔ It is NOT a UI screenshot — Alex's standing "object scenes not UI". It is a
   machined sign, bolted, with a lit face.
   ⛔ AND IT CARRIES NO CLAUDE MARK. `wshobson/agents` is a community repo; a
   Claude logo on this plate would assert an endorsement that does not exist.
   ========================================================================= */
export const RepoPlate: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  on?: number; stars?: number; agents?: number; tilt?: number }> =
  ({ x, y, f, s = 1, z = 78, on = 1, stars = 1, agents = 1, tilt = 0 }) => {
  const W0 = 588 * s, H0 = 210 * s;
  /* ⛔ A NUMBER MOVES TO ITS VALUE; IT IS NEVER TYPESET AT IT. */
  const sv = Math.round(E(stars, 0, 1, 0, 394, OUT)) / 10;
  const av = Math.round(E(agents, 0, 1, 0, R.agents, OUT));
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0 / 2, width: W0, height: H0,
      zIndex: z, opacity: on,
      transform: `scale(${0.90 + on * 0.10}) rotate(${tilt}deg)`,
      background: "linear-gradient(174deg, #F7F4EC 0%, #CFC7B4 100%)",
      border: `${7 * s}px solid #0A0C10`, boxShadow: SH_D,
      display: "flex", alignItems: "center", gap: 18 * s, padding: `0 ${22 * s}px` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 6 * s,
        background: hexa("#FFFFFF", 0.50) }} />
      <RealMark src="github.svg" s={92 * s} z={z + 1} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...mono(30 * s, 900), color: "#5A5344", letterSpacing: "-0.01em",
          whiteSpace: "nowrap" }}>{R.repo.owner + " /"}</div>
        <div style={{ ...mono(46 * s, 900), color: "#14100A", letterSpacing: "-0.02em",
          whiteSpace: "nowrap", lineHeight: 1.05 }}>{R.repo.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 * s, marginTop: 10 * s }}>
          <span style={{ ...mono(30 * s, 900), color: "#3A2A08" }}>{"★ " + sv.toFixed(1) + "k"}</span>
          <span style={{ ...mono(22 * s, 900), color: "#0E1410", background: GOLD,
            padding: `${3 * s}px ${10 * s}px`, letterSpacing: "0.06em" }}>{av + " AGENTS"}</span>
          <span style={{ ...mono(22 * s, 900), color: "#0E1410", background: GREEN,
            padding: `${3 * s}px ${10 * s}px`, letterSpacing: "0.06em" }}>{R.price}</span>
        </div>
      </div>
      {[[14, 14], [W0 - 26, 14], [14, H0 - 26], [W0 - 26, H0 - 26]].map(([bx, by], k) => (
        <div key={"pb" + k} style={{ position: "absolute", left: bx, top: by, width: 12 * s,
          height: 12 * s, borderRadius: "50%", background: "#6E6656",
          border: `${2 * s}px solid ${hexa("#000", 0.5)}` }} />
      ))}
    </div>
  );
};

/** stars flying IN to the plate — the proof beat's travel. ⛔ Each star is >=40px
    so it survives the audit's 1012->240 downsample. */
export const StarFall: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  z?: number; span?: number }> = ({ x, y, f, at, n = 14, z = 84, span = 46 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const t0 = at + i * 2.4;
    const k = E(f, t0, t0 + span * 0.4, 0, 1, IN_Q);
    if (k <= 0 || k >= 1) return null;
    const a = -2.5 + rnd(i, 7) * 5.0;
    const sx = x + a * 300 * (1 - k), sy = y - 300 * (1 - k) * (0.5 + rnd(i, 8) * 0.9);
    const sz = 58 + rnd(i, 9) * 34;
    return (
      <div key={"sf" + i} style={{ position: "absolute", left: sx - sz / 2, top: sy - sz / 2,
        width: sz, height: sz, zIndex: z, opacity: Math.min(1, (1 - k) * 3),
        transform: `rotate(${k * 220 + i * 30}deg)`,
        ...mono(sz, 900), color: GOLD, lineHeight: 1, textAlign: "center" }}>{"★"}</div>
    );
  })}</>
);

/* ===========================================================================
   THE BACKLOG — the villain. A TOWER of job dockets on one desk.
   ⛔ It is drawn GOOD: clean paper, real perforations, a punched hole and a
   spike. What is wrong with it is its HEIGHT, not its craft.
   ========================================================================= */
export const Ticket: React.FC<{ x: number; y: number; w?: number; h?: number; rot?: number;
  z?: number; c?: string; k?: number; tag?: string }> =
  ({ x, y, w: ww = 168, h: hh = 30, rot = 0, z = 60, c = "#F6F1E4", k = 1, tag }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    opacity: k, transform: `rotate(${rot}deg) scale(${0.86 + k * 0.14})`,
    background: `linear-gradient(178deg, ${c} 0%, ${dkh(c, 0.16)} 100%)`,
    border: "3px solid #241E16", boxShadow: "0 3px 0 rgba(0,0,0,0.30)" }}>
    {/* the perforation — three punched slots down the left edge */}
    {[0.24, 0.5, 0.76].map((p, i) => (
      <div key={"pf" + i} style={{ position: "absolute", left: 7, top: hh * p - 3, width: 7,
        height: 6, borderRadius: 3, background: "#241E16", opacity: 0.5 }} />
    ))}
    {/* two ruled lines — a docket, not a card */}
    {[0.38, 0.66].map((p, i) => (
      <div key={"rl" + i} style={{ position: "absolute", left: 24, right: 14, top: hh * p,
        height: 3, background: "#6B6152", opacity: 0.42 }} />
    ))}
    {tag && (
      <div style={{ position: "absolute", right: -4, top: -4, width: 16, height: hh + 8,
        background: tag }} />
    )}
  </div>
);

/** the tower. `n` dockets stacked with a real lean, `clear` 0..1 takes them off
    the top. ⛔ Nothing lands and simply stops: the stack ROCKS as it grows. */
export const TicketPile: React.FC<{ x: number; y: number; f: number; n: number; grow?: number;
  clear?: number; z?: number; w?: number; hue?: string }> =
  ({ x, y, f, n, grow = 1, clear = 0, z = 62, w: ww = 168, hue = "#F6F1E4" }) => {
  const shown = Math.round(n * grow);
  const sway = Math.sin(f / 21) * 2.2 * grow;
  return (
    <>{Array.from({ length: n }, (_, i) => {
      if (i >= shown) return null;
      /* cleared from the TOP down */
      const gone = E(clear, (n - 1 - i) / n * 0.86, (n - 1 - i) / n * 0.86 + 0.16, 0, 1, IN_Q);
      if (gone >= 1) return null;
      const lean = (rnd(i, 2) - 0.5) * 7;
      const off = (rnd(i, 4) - 0.5) * 20;
      const hh = 30;
      return (
        <Ticket key={"tk" + i} x={x + off + sway * (i / n) * 4} y={y - i * (hh * 0.62)}
          w={ww} h={hh} rot={lean + sway * (i / n)} z={z + i}
          c={hue} k={1 - gone}
          tag={i % 4 === 0 ? RED : i % 4 === 2 ? GOLD : undefined} />
      );
    })}</>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE HERO ARTIFACT — THE APP SLAB.
   ONE object, worked by four pairs of hands, ADDITIVE, mute-legible in <2s.
   `stage` 0..4 :  0 blank · 1 blueprint · 2 face laid · 3 wired · 4 stamped
   ⛔ It is protected: the rack is the SETTING and the star counter is
   DECORATION. Neither may take this slot (B2's one-hero-artifact rule).
   ========================================================================= */
export const AppSlab: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  stage: number; lift?: number; rot?: number; scan?: number }> =
  ({ x, y, f, s = 1, z = 70, stage, lift = 0, rot = 0, scan = 0 }) => {
  const W0 = 300 * s, H0 = 400 * s;
  const bp = Math.min(1, Math.max(0, stage - 0));      /* blueprint  */
  const fe = Math.min(1, Math.max(0, stage - 1));      /* front face */
  const be = Math.min(1, Math.max(0, stage - 2));      /* wiring     */
  const se = Math.min(1, Math.max(0, stage - 3));      /* stamp      */
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0 - lift, width: W0,
      height: H0, zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the blank — a routed slab with a real bevel */}
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(172deg,#8E9299 0%,#4E555E 100%)",
        border: "7px solid #14181E", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 7, top: 7, right: 7, height: 5,
        background: hexa("#FFFFFF", 0.26) }} />

      {/* 1 · THE BLUEPRINT — drafting lines struck over the blank, drawn in */}
      {bp > 0 && (
        <div style={{ position: "absolute", inset: 10, overflow: "hidden" }}>
          {/* ⛔ THE SHEET LANDS, IT DOES NOT FADE. A smooth opacity ramp spreads
              its delta across three audit samples and measures WORSE than the
              thing it replaced; a hard edge lands inside one. */}
          <div style={{ position: "absolute", inset: 0, background: "#173A55",
            transform: `translateY(${(1 - E(bp, 0, 0.14, 0, 1, OUT)) * -520}px)` }} />
          {/* ⛔ AND THE STROKES ARE 11px, NOT 3px. At the audit's 1012->240
              downsample a 3px line becomes 0.7px and is differenced away — and
              it is just as invisible on a phone. The first build drew 3px and
              the scene measured 5.67 with 74% HOLD. */}
          {[0.14, 0.32, 0.50, 0.68, 0.86].map((p, i) => (
            <div key={"bh" + i} style={{ position: "absolute", left: 0,
              width: `${E(bp, 0.16 + i * 0.13, 0.30 + i * 0.13, 0, 100, OUT)}%`,
              top: `${p * 100}%`, height: 11 * s, background: hexa("#A8DEF6", 0.92) }} />
          ))}
          {[0.30, 0.64].map((p, i) => (
            <div key={"bv" + i} style={{ position: "absolute", top: 0,
              height: `${E(bp, 0.40 + i * 0.16, 0.62 + i * 0.16, 0, 100, OUT)}%`,
              left: `${p * 100}%`, width: 11 * s, background: hexa("#A8DEF6", 0.92) }} />
          ))}
          {/* the dimension ticks a real drawing carries, struck in last */}
          {[0.22, 0.44, 0.72].map((p, i) => {
            const k = E(bp, 0.66 + i * 0.10, 0.78 + i * 0.10, 0, 1, BACK);
            if (k <= 0) return null;
            return (
              <div key={"bt" + i} style={{ position: "absolute", right: 14 * s,
                top: `${p * 100}%`, width: 52 * s * k, height: 9 * s,
                background: GOLD }} />
            );
          })}
        </div>
      )}

      {/* 2 · THE FRONT FACE — real UI blocks land one by one (real content
          arriving is the third row of the motion table) */}
      {fe > 0 && (
        <div style={{ position: "absolute", inset: 10, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "#F7F5F0", opacity: fe }} />
          {/* the app bar */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0,
            height: 46 * s, background: CLAY, opacity: E(fe, 0, 0.2, 0, 1, OUT) }} />
          {/* the hero block */}
          <div style={{ position: "absolute", left: 16 * s, right: 16 * s, top: 62 * s,
            height: 104 * s, background: "#DDE6EE",
            transform: `scaleY(${E(fe, 0.16, 0.42, 0, 1, BACK)})`, transformOrigin: "50% 0%" }} />
          {/* four list rows, landing in sequence */}
          {[0, 1, 2, 3].map((i) => (
            <div key={"lr" + i} style={{ position: "absolute", left: 16 * s,
              width: `${E(fe, 0.34 + i * 0.11, 0.52 + i * 0.11, 0, 78, OUT)}%`,
              top: (184 + i * 40) * s, height: 24 * s,
              background: i % 2 ? "#C9D3DC" : "#B4C2CE" }} />
          ))}
          {/* the action button */}
          <div style={{ position: "absolute", left: 16 * s, right: 16 * s, bottom: 20 * s,
            height: 44 * s, background: GREEN,
            transform: `scale(${E(fe, 0.72, 0.94, 0, 1, BACK)})` }} />
        </div>
      )}

      {/* 3 · THE WIRING — the back end, struck in as a real loom down the side */}
      {be > 0 && (
        <>
          {[0, 1, 2].map((i) => {
            const k = E(be, i * 0.16, i * 0.16 + 0.34, 0, 1, OUT);
            return (
              <div key={"wr" + i} style={{ position: "absolute", right: -18 * s - i * 15 * s,
                top: (90 + i * 84) * s, width: 60 * s * k, height: 9 * s,
                background: [GOLD, GREEN, SKY][i], zIndex: 4,
                boxShadow: "0 3px 0 rgba(0,0,0,0.34)" }} />
            );
          })}
          {/* the junction box the loom runs into */}
          <div style={{ position: "absolute", right: -66 * s, top: 78 * s, width: 46 * s,
            height: 268 * s, background: "linear-gradient(174deg,#39424E,#12161E)",
            border: `${4 * s}px solid #05070A`, zIndex: 3,
            transform: `scaleY(${E(be, 0, 0.28, 0, 1, BACK)})`, transformOrigin: "50% 0%" }} />
        </>
      )}

      {/* ⭐ 3b · THE SCAN. "Review the code for security" is a SCAN, and a
          full-width bright bar travelling the height of the hero object is the
          top row of the motion table. It also fills the one gap this beat had:
          the words run for 20 frames between the wiring and the stamp, and
          nothing large was moving in them (6.38, 63% HOLD). */}
      {scan > 0 && scan < 1 && (
        <>
          <div style={{ position: "absolute", left: -8, right: -8,
            top: `${scan * 100}%`, height: 34 * s, zIndex: 8,
            background: `linear-gradient(180deg, ${hexa("#7FE8C0", 0)} 0%, ${hexa("#7FE8C0", 0.86)} 50%, ${hexa("#7FE8C0", 0)} 100%)` }} />
          <div style={{ position: "absolute", left: -8, right: -8, top: 0,
            height: `${scan * 100}%`, zIndex: 7,
            background: hexa("#0E2A22", 0.34) }} />
        </>
      )}
      {/* 4 · THE STAMP — the only judgement in the reel, and it LANDS */}
      {se > 0 && (
        <div style={{ position: "absolute", left: -30 * s, top: 150 * s, zIndex: 9,
          transform: `translateY(${(1 - se) * -240}px) rotate(-9deg) scale(${1 + (1 - se) * 0.55}, ${1 - Math.max(0, 1 - Math.abs(se - 0.5) / 0.2) * 0.26})`,
          transformOrigin: "50% 100%" }}>
          <div style={{ padding: `${9 * s}px ${20 * s}px`, background: "#FBF6EA",
            border: `${6 * s}px solid ${GREEN}`, ...ui(38 * s, 900), color: "#1C5A40",
            letterSpacing: 4 }}>PASS</div>
        </div>
      )}
    </div>
  );
};

/* ---- THE BENCH ------------------------------------------------------------
   the furniture the specialists work at. A real trestle: two A-frames, a top
   with an end-grain lip, and a shadowed underside. */
export const Bench: React.FC<{ x: number; y: number; w: number; z?: number; c?: string;
  h?: number }> = ({ x, y, w: ww, z = 50, c = "#6A4E2C", h: hh = 128 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 20,
      background: `linear-gradient(180deg,${mxh(c, 0.26)},${dkh(c, 0.10)})`,
      border: "3px solid #17120A" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 9,
      background: dkh(c, 0.42) }} />
    {[0.10, 0.86].map((p, i) => (
      <React.Fragment key={"lg" + i}>
        <div style={{ position: "absolute", left: ww * p, top: 26, width: 15, height: hh - 26,
          background: dkh(c, 0.30), transform: `skewX(${i ? -7 : 7}deg)` }} />
        <div style={{ position: "absolute", left: ww * p - 22, top: 26 + (hh - 26) * 0.58,
          width: 58, height: 10, background: dkh(c, 0.38) }} />
      </React.Fragment>
    ))}
  </div>
);

/* ---- THE PAY HOOK ---------------------------------------------------------
   ⭐ THE ONLY CURRENCY STRING IN THE REEL. A wages board with numbered hooks and
   a pay tin on each — and every tin reads $0, because the repo is free. It is a
   real object that would carry a number, which is why it is allowed one. */
export const PayHook: React.FC<{ x: number; y: number; f: number; n?: number; z?: number;
  s?: number; on?: number }> = ({ x, y, f, n = 5, z = 72, s = 1, on = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on }}>
    <div style={{ position: "absolute", left: -14 * s, top: -12 * s, width: (n * 84 + 28) * s,
      height: 100 * s, background: "linear-gradient(174deg,#2C3440,#0E1218)",
      border: `${4 * s}px solid #05070A`, boxShadow: SH_D }} />
    {Array.from({ length: n }, (_, i) => {
      const sw = Math.sin(f / 18 + i * 0.9) * 3.2;
      return (
        <div key={"ph" + i} style={{ position: "absolute", left: i * 84 * s, top: 6 * s,
          transform: `rotate(${sw}deg)`, transformOrigin: "50% 0%" }}>
          <div style={{ position: "absolute", left: 30 * s, top: 0, width: 4 * s, height: 22 * s,
            background: "#8E9299" }} />
          <div style={{ position: "absolute", left: 6 * s, top: 22 * s, width: 56 * s,
            height: 48 * s, background: `linear-gradient(174deg,${BONE},#B9AF98)`,
            border: `${3 * s}px solid #17120A`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <span style={{ ...mono(24 * s, 900), color: "#1C3A2A" }}>{R.price}</span>
          </div>
        </div>
      );
    })}
  </div>
);

/* ---- THE CLOCK ------------------------------------------------------------
   ⭐ A NUMBER IS NEVER TYPESET AT ITS VALUE — "24/7" is said by a HAND going all
   the way round, twice, not by the string "24". */
export const WallClock: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  turns?: number }> = ({ x, y, f, s = 1, z = 68, turns = 0 }) => {
  const d = 150 * s;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
      zIndex: z, borderRadius: "50%",
      background: "radial-gradient(circle at 40% 32%, #F7F4EC 0%, #C6BCA6 100%)",
      border: `${9 * s}px solid #14181E`, boxShadow: SH_D }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: 7 * s,
          width: 3 * s, height: (i % 3 === 0 ? 15 : 9) * s, background: "#3A3428",
          transformOrigin: `50% ${d / 2 - 7 * s}px`, transform: `rotate(${i * 30}deg)` }} />
      ))}
      {/* the hour hand — `turns` full revolutions */}
      <div style={{ position: "absolute", left: "50%", top: "22%", width: 6 * s, height: "28%",
        background: "#241E16", transformOrigin: "50% 100%",
        transform: `translateX(-50%) rotate(${turns * 360}deg)` }} />
      {/* the minute hand — twelve times faster, which is what a clock does */}
      <div style={{ position: "absolute", left: "50%", top: "13%", width: 4 * s, height: "37%",
        background: "#3A3428", transformOrigin: "50% 100%",
        transform: `translateX(-50%) rotate(${turns * 360 * 12}deg)` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 12 * s, height: 12 * s,
        marginLeft: -6 * s, marginTop: -6 * s, borderRadius: "50%", background: "#241E16" }} />
    </div>
  );
};

/* ---- THE LAPTOP -----------------------------------------------------------
   ⭐ "on your laptop" is a SCALE COLLAPSE, so the laptop is drawn as a real
   machine (hinge gap, bezel, deck, trackpad) and the SET folds into it. */
export const Laptop: React.FC<{ x: number; y: number; s?: number; z?: number; open?: number;
  f?: number; children?: React.ReactNode }> =
  ({ x, y, s = 1, z = 74, open = 1, f = 0, children }) => {
  const dw = 560 * s, dh = 26 * s, sw = 520 * s, sh = 340 * s;
  const ang = -90 + open * 90;
  return (
    <div style={{ position: "absolute", left: x - dw / 2, top: y - dh, width: dw, zIndex: z }}>
      {/* the lid, hinged at the deck's back edge */}
      <div style={{ position: "absolute", left: (dw - sw) / 2, top: -sh, width: sw, height: sh,
        transformOrigin: "50% 100%", transform: `perspective(1200px) rotateX(${ang}deg)`,
        background: "linear-gradient(174deg,#2A3038,#12161C)",
        border: `${9 * s}px solid #0A0C10`, boxShadow: SH_D }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          background: "#0B1220" }}>{children}</div>
      </div>
      {/* the hinge gap */}
      <div style={{ position: "absolute", left: (dw - sw) / 2, top: -6 * s, width: sw,
        height: 8 * s, background: "#05070A" }} />
      {/* the deck */}
      <div style={{ position: "absolute", left: 0, top: 0, width: dw, height: dh,
        background: "linear-gradient(178deg,#C4C8CE,#7E858E)",
        border: `${5 * s}px solid #0A0C10` }} />
      <div style={{ position: "absolute", left: dw * 0.38, top: dh - 4 * s, width: dw * 0.24,
        height: 6 * s, background: "#5A6068" }} />
    </div>
  );
};

/* ---- THE KEYWORD PLATE ----------------------------------------------------
   ⛔ HARD CUT ON THE KEYWORD — nothing after it. The plate is STRUCK, not faded. */
export const KeywordPlate: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 90 }) => {
  const k = E(f, at, at + 8, 0, 1, BACK);
  if (k <= 0) return null;
  const sq = 1 - Math.max(0, 1 - Math.abs(k - 0.55) / 0.22) * 0.20;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translate(-50%,-50%) scale(${(0.6 + k * 0.4)}, ${(0.6 + k * 0.4) * sq})` }}>
      <div style={{ padding: `${16 * s}px ${40 * s}px`, background: GOLD,
        border: `${9 * s}px solid #14100A`, boxShadow: SH_D,
        ...ui(78 * s, 900), color: "#14100A", letterSpacing: "0.06em" }}>{R.keyword}</div>
    </div>
  );
};

/* ---- the chrome helpers, cloned verbatim from the house kit --------------- */
export const NearShade: React.FC<{ top?: number; z?: number; k?: number }> =
  ({ top = 596, z = 88, k = 0.62 }) => (
  <>
    <div style={{ position: "absolute", left: -80, right: -80, top, bottom: -140, zIndex: z,
      pointerEvents: "none",
      background: `linear-gradient(180deg, ${hexa("#0B0F16", 0)} 0%, ${hexa("#0B0F16", k * 0.55)} 42%, ${hexa("#0B0F16", k)} 100%)` }} />
    <div style={{ position: "absolute", left: -80, right: -80, top: top + 40, bottom: -140,
      zIndex: z + 1, pointerEvents: "none", mixBlendMode: "overlay",
      background: `linear-gradient(180deg, ${hexa("#FFCF8E", 0)} 0%, ${hexa("#FFCF8E", 0.10)} 100%)` }} />
  </>
);

export const HeroKey: React.FC<{ x: number; y: number; r?: number; c?: string; z?: number;
  k?: number }> = ({ x, y, r = 300, c = "#FFF3D6", z = 26, k = 1 }) => (
  <>
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
      zIndex: z, pointerEvents: "none", borderRadius: "50%",
      background: `radial-gradient(circle, ${hexa(c, 0.30 * k)} 0%, ${hexa(c, 0.12 * k)} 42%, ${hexa(c, 0)} 72%)` }} />
    <div style={{ position: "absolute", left: x - r * 0.44, top: y - r * 0.44,
      width: r * 0.88, height: r * 0.88, zIndex: z, pointerEvents: "none", borderRadius: "50%",
      background: `radial-gradient(circle, ${hexa(c, 0.26 * k)} 0%, ${hexa(c, 0)} 70%)` }} />
  </>
);

/* ===========================================================================
   ⛔⛔⛔ THE SECOND BACK WALL — because ONE PROP IN FIVE SCENES IS FIVE
   "BORING" NOTES (`feedback_one_prop_five_scenes`).

   The first build put the RACK behind all nine scenes. It was defensible on
   paper — the rack IS the repo, so it is the room's own reason and the
   countable content the density rule asks for — and the contact sheet still
   showed the same wall of pale rectangles in eight of nine frames. **The
   villain is SAMENESS, not ugliness.**

   So the rack now owns the two scenes that are ABOUT it (the hook and the
   pull-back) and appears dark and partial elsewhere, and the BUILD FLOOR gets
   its own wall: parts bins, a rank of test screens and a tool rail. Same
   countability, different object, and it is what a floor that assembles
   something would actually have on it.
   ========================================================================= */
export const PartsWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; lit?: number; seed?: number; live?: number }> =
  ({ x, y, w: ww, h: hh, f, z = 24, lit = 0.6, seed = 2, live = 1 }) => {
  const cols = 12, rows = 4;
  const cw = (ww - 24) / cols, rh = (hh - 24) / rows;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(172deg,#151B22 0%,#080B10 100%)",
        border: "5px solid #05070A", boxShadow: SH_D }} />
      {/* the bins — open-fronted, with a real lip and a stocked shadow */}
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const isScreen = (r === 0 && c % 3 === 1) || (r === 2 && c % 4 === 2);
        const bx = 12 + c * cw, by = 12 + r * rh;
        if (isScreen) {
          /* ⭐ a test screen, and its content CHANGES — real content arriving is
             worth more than any effect, and it costs the hierarchy nothing
             because it is furniture. */
          const k = Math.floor((f / 4 + i) % 4);
          return (
            <div key={"pw" + i} style={{ position: "absolute", left: bx, top: by,
              width: cw - 9, height: rh - 9, background: "#0B1A22",
              border: "3px solid #05070A", overflow: "hidden" }}>
              {[0, 1, 2].map((l) => (
                <div key={l} style={{ position: "absolute", left: 5,
                  width: `${28 + ((k + l) % 4) * 18}%`, top: 6 + l * 11, height: 5,
                  background: [TEAL, GREEN, GOLD][(k + l) % 3], opacity: 0.62 * live + 0.3 }} />
              ))}
            </div>
          );
        }
        return (
          <div key={"pw" + i} style={{ position: "absolute", left: bx, top: by,
            width: cw - 9, height: rh - 9,
            background: `linear-gradient(178deg, ${dkh("#4A5460", 0.10 + rnd(i + seed, 3) * 0.3)} 0%, #0A0E14 78%)`,
            border: "3px solid #05070A" }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "34%",
              background: dkh(["#8E9299", "#C9A15A", "#7FC0C9", "#8B72B0"][i % 4], 0.30 - lit * 0.2) }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3,
              background: hexa("#FFFFFF", 0.20 * lit) }} />
          </div>
        );
      })}
      {/* the tool rail along the bottom — a hard light/shadow boundary */}
      <div style={{ position: "absolute", left: 6, right: 6, bottom: -14, height: 16,
        background: "linear-gradient(180deg,#5A6472,#0C1016)", border: "3px solid #05070A" }} />
    </div>
  );
};

/* ⭐ A HOIST RUN — the background process for the build floor. A full-width
   travelling band alternating LIGHT AND SHADOW is the single biggest row in the
   motion table (10.44 against a neighbour's 2.83 at identical push), and it is
   mounted as something the room would actually contain, never as a stripe
   generator (reel 112 multiplied every rake by 2.6 and turned the reel into
   venetian blinds). */
export const HoistRun: React.FC<{ y: number; f: number; z?: number; rate?: number;
  c?: string; n?: number }> = ({ y, f, z = 27, rate = 5.6, c = "#C6B48A", n = 6 }) => {
  const pitch = 196, span = pitch * n;
  return (
    <>
      <div style={{ position: "absolute", left: -40, top: y - 18, width: W + 80, height: 11,
        zIndex: z, background: "#0B1020" }} />
      {Array.from({ length: n }, (_, i) => {
        const x = ((i * pitch + f * rate) % span + span) % span - 140;
        const drop = 46 + rnd(i, 3) * 40;
        const sway = Math.sin(f / 19 + i) * 5;
        return (
          <React.Fragment key={"hr" + i}>
            <div style={{ position: "absolute", left: x + 44, top: y - 8, width: 5, height: drop,
              zIndex: z, background: "#2A313B", transform: `rotate(${sway * 0.3}deg)`,
              transformOrigin: "50% 0%" }} />
            <div style={{ position: "absolute", left: x, top: y + drop - 8, width: 138, height: 88,
              zIndex: z, transform: `rotate(${sway * 0.4}deg)`,
              background: i % 2
                ? `linear-gradient(174deg, ${mxh(c, 0.20)}, ${dkh(c, 0.26)})`
                : "linear-gradient(174deg,#20262E,#080B10)",
              border: "4px solid #05070A" }} />
          </React.Fragment>
        );
      })}
    </>
  );
};

/* ===========================================================================
   ⛔⛔⛔ THE ENGINEERS ARE CLAUDE SPRITES. NOT PLATES. NOT RECTANGLES.

   Alex, on rev 1: *"each of the ai engineers should be represented as claude
   sprites not little rectangles or squares here."* He is right and the error was
   the whole reel's spine: I built a RACK OF 202 ENGRAVED PLATES and put it
   behind eight of nine scenes.

   A plate is a CONTAINER (`docs/ANIMATION-QUALITY.md` §3). It carries one bit of
   information — "there are a lot of them" — and it carries that bit for the
   whole reel, which is why the concepts read as uninteresting however well the
   fill animated. The subject is TWO HUNDRED ENGINEERS. Engineers are PEOPLE, and
   `ANIMATION-QUALITY` §5 opens with *characters stop scrolls; empty rooms do
   not.* The countable content and the cast are the same thing here, and I split
   them apart for no reason.

   ⭐⭐⭐ `CrewField` is the replacement: RECEDING RANKS of real Claude sprites,
   each on its own action loop, each in its own costume, arriving along an arc
   from a source and landing with a squash.

   ⛔ THE SPACING LAW IS ARITHMETIC, NOT TASTE. `pitch >= 0.85 x size`, or the
   crowd renders as one unreadable orange mass (reel 107 shipped 18 sprites at
   s=148 on a 120px pitch and got exactly that). Every rank below clears it:
       rank 0   n=11  size 72   pitch 92    (0.85x = 61)
       rank 1   n=9   size 92   pitch 116   (0.85x = 78)
       rank 2   n=7   size 118  pitch 150   (0.85x = 100)
       rank 3   n=6   size 150  pitch 190   (0.85x = 128)
       rank 4   n=4   size 196  pitch 250   (0.85x = 167)  <- cropped by the edge
   37 drawn bodies read as "hundreds" because they RECEDE; the count itself is
   carried by the counter, which is what a numeral is for.

   ⛔ AND THE NEAR RANK IS CUT OFF BY THE BOTTOM OF THE PANEL. That is
   `feedback_the_crowd_is_a_near_band` — the single biggest density lever the
   reference sheet found, and it doubles as the depth cue reel 94's audit asks
   for (a mass cropped by the panel edge, in front of the action).
   ========================================================================= */

export type Rank = { n: number; size: number; pitch: number; y: number };

export const RANKS: Rank[] = [
  { n: 11, size: 72,  pitch: 92,  y: 470 },
  { n: 9,  size: 92,  pitch: 116, y: 524 },
  { n: 7,  size: 118, pitch: 150, y: 590 },
  { n: 6,  size: 150, pitch: 190, y: 666 },
  { n: 4,  size: 196, pitch: 250, y: 782 },
];

/** the deterministic slot list, back rank first so the pour fills depth-wise */
export const slots = (ranks: Rank[] = RANKS) => {
  const out: Array<{ x: number; y: number; size: number; r: number; i: number }> = [];
  ranks.forEach((rk, r) => {
    const span = (rk.n - 1) * rk.pitch;
    for (let i = 0; i < rk.n; i++) {
      out.push({ x: 506 - span / 2 + i * rk.pitch, y: rk.y, size: rk.size, r, i });
    }
  });
  return out;
};

/** ⭐⭐⭐ THE CREW FIELD. `k` 0..1 pours the field in from `src`; every body
    travels a real distance along an arc, lands with `Crew`'s own squash, and
    then runs one of the four action loops on its own phase.
    ⛔ An arrival that just appears is a STATE CHANGE, not an event. */
export const CrewField: React.FC<{
  f: number; k: number; src?: [number, number]; z?: number; seed?: number;
  ranks?: Rank[]; cheer?: number; hold?: boolean; only?: number;
}> = ({ f, k, src, z = 40, seed = 0, ranks = RANKS, cheer = 0, hold = false, only }) => {
  const S = slots(ranks);
  /* ⛔⛔ THE BIG ONES COME OUT FIRST. Filling back-to-front looked physically
     tidy and measured 5.99 STATIC, because the only bodies large enough to
     repaint real area were the last to arrive — the scene spent its first
     forty frames putting 72px sprites on the horizon. `LARGE x BRIGHT x FAST is
     the only combination that registers`, so the NEAR rank pours first and the
     horizon fills in behind it. It is also better staging: they come AT camera. */
  const ORDER = S.map((_, i) => i).sort((a, b) =>
    (S[b].r - S[a].r) || (Math.abs(S[a].i - (ranks[S[a].r].n - 1) / 2) - Math.abs(S[b].i - (ranks[S[b].r].n - 1) / 2)));
  const rankOf = new Map(ORDER.map((si, o) => [si, o]));
  return (
    <>{S.map((s, idx) => {
      if (only !== undefined && s.r !== only) return null;
      const ord = rankOf.get(idx) ?? idx;
      const at = (ord / S.length) * 0.76 + rnd(idx + seed, 3) * 0.16;
      const a = hold ? 1 : E(k, at, at + 0.16, 0, 1, OUT);
      if (a <= 0.01) return null;
      let x = s.x, y = s.y;
      if (src && a < 1) {
        /* a real arc out of the source, not a fade */
        x = src[0] + (s.x - src[0]) * a;
        y = src[1] + (s.y - src[1]) * a - Math.sin(a * Math.PI) * (120 + rnd(idx + seed, 5) * 90);
      }
      return (
        <Crew key={"cf" + idx} f={f} x={x} y={y} i={idx + seed} size={s.size}
          z={z + s.r * 6} at={0} loop={(idx + s.r) % 4} cheer={cheer}
          flip={idx % 3 === 0} />
      );
    })}</>
  );
};

/** ⭐ A COUNTER THAT MOVES TO ITS VALUE. The numeral is allowed here because it
    is the one thing 37 drawn bodies cannot say on their own: how many there
    really are. Everything else on screen is a depiction. */
/* ⛔⛔⛔ REV 16, ALEX: *"the 202 container whatever could be made way more
   interesting if it was just like text and stuff then like counted up to that
   number throughout the duration here, and also had the sfx design wired in."*

   THE CONTAINER WAS DOING NOTHING. A boxed readout is a UI chip: it says "here
   is a field with a value in it" and the value is 56px inside a 5px gold frame,
   so the NUMBER — the only thing anyone reads — was competing with its own
   packaging. `feedback_graphical_over_textual` cuts both ways: when the info IS
   the number, the number is the graphic and the box is the decoration.

   ⭐ Now it is TYPE, at 132px, no plate. It counts the whole way up across the
   beat instead of snapping, the digits SETTLE with a scale overshoot every time
   the leading digit changes, and the unit sits underneath in small caps so the
   number owns the top line. The SFX ticks are cued in the reel file against the
   same eased curve, so what you hear is what the digits are doing. */
export const HeadCount: React.FC<{ x: number; y: number; k: number; s?: number; z?: number;
  label?: string; to?: number; f?: number }> =
  ({ x, y, k, s = 1, z = 88, label = "AI ENGINEERS", to = R.agents, f = 0 }) => {
  /* ⛔ NO SECOND EASE HERE. The caller already shapes `k`; easing again inside
     squared the curve, so the readout hit 199 of 202 inside the first second and
     then crawled — which is exactly what "counted up throughout the duration"
     is not. `k` is used raw and the callers pass a near-linear curve. */
  const ease = Math.min(1, Math.max(0, k));
  /* thousands separator — 39400 is a string of digits, 39,400 is a number */
  const v = Math.round(ease * to).toLocaleString("en-US");
  /* the tick the digits land on — a settle, not a bounce */
  const step = Math.max(0, 1 - ((ease * to) % Math.max(1, Math.round(to / 14))) / 2.2);
  const pop = k >= 1 ? 0 : step * 0.09;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translate(-50%,-50%) scale(${(1 + pop).toFixed(3)})`, textAlign: "center" }}>
      <div style={{ ...mono(132 * s, 900), color: GOLD, lineHeight: 0.9,
        /* ⛔ gold type over a gold-lit building is gold on gold — the outline is
           what keeps it legible when the scene behind it flares. */
        textShadow: `0 ${7 * s}px 0 #6B4A0E, 0 0 ${5 * s}px #14100A, ${3 * s}px 0 0 #14100A,`
          + ` -${3 * s}px 0 0 #14100A, 0 -${3 * s}px 0 #14100A, 0 ${10 * s}px ${26 * s}px rgba(0,0,0,0.7)`,
        letterSpacing: "-0.02em" }}>
        {v}
        {/* the count is still running — a caret that blinks while it climbs */}
        {k < 1 && (
          <span style={{ display: "inline-block", width: 14 * s, height: 96 * s,
            marginLeft: 10 * s, verticalAlign: "-14%", background: GOLD,
            opacity: Math.floor(f / 3) % 2 ? 0.95 : 0.25 }} />
        )}
      </div>
      <div style={{ ...ui(28 * s, 900), color: "#F6F2E8", letterSpacing: "0.18em",
        marginTop: 6 * s, textShadow: "0 3px 12px rgba(0,0,0,0.85)" }}>{label}</div>
    </div>
  );
};

/** the hatch the crew pours out of — a real floor hatch with a hinged lid and a
    lit throat, carrying the GitHub mark because that is what it is. */
export const Hatch: React.FC<{ x: number; y: number; open: number; f: number; s?: number;
  z?: number }> = ({ x, y, open, f, s = 1, z = 44 }) => {
  const W0 = 420 * s, H0 = 96 * s;
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y, width: W0, height: H0, zIndex: z }}>
      {/* the throat, lit from inside */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${hexa(GOLD, 0.10 + open * 0.55)} 0%, #05070A 82%)`,
        border: `${6 * s}px solid #0A0C10`, boxSizing: "border-box" }} />
      {/* the lid, hinged back */}
      <div style={{ position: "absolute", left: -6 * s, top: -8 * s, width: W0 + 12 * s,
        height: 30 * s, transformOrigin: "50% 100%",
        transform: `perspective(700px) rotateX(${open * 76}deg)`,
        background: "linear-gradient(180deg,#39424E,#12161E)",
        border: `${5 * s}px solid #05070A`, boxSizing: "border-box",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 22 * s, height: 22 * s, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")}
            style={{ width: 17 * s, height: 17 * s, objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE GATE — the rev-3 hook's frame 0.

   Alex: *"needs a more interesting hook 0 second scene like opening the gate
   whatever."* Rev 2 opened on a bright, nearly empty hall with a shut floor
   hatch. That obeys "frame 0 is bright and nearly empty; the mass is an EVENT"
   to the letter and it is not interesting to look at.

   ⭐ REEL 133'S HOOK IS THE PROVEN SHAPE and it resolves the tension: *at frame
   0 the shutter is already 22% up with light spilling under it and a flywheel
   turning in the gap.* The shot has already PROMISED something and withheld
   what it is — which is `feedback_predictable_is_not_anticipatory` — and the
   blazing throat is what pays for the dark shutter on the >=140 luma law, so
   the interest and the brightness come from the same element instead of
   fighting each other.

   Here the thing behind the gate is the WORKFORCE: silhouetted engineers
   already shifting in the lit gap before the gate is up.
   ========================================================================= */
export const Gate: React.FC<{ x: number; y: number; w: number; h: number; lift: number;
  f: number; z?: number }> = ({ x, y, w: ww, h: hh, lift, f, z = 34 }) => {
  const gap = Math.max(0, hh * lift);
  const SLATS = 13;
  return (
    <>
      {/* THE LIT THROAT behind it — this is the brightest thing in the frame */}
      <div style={{ position: "absolute", left: x, top: y + hh - gap, width: ww, height: gap,
        zIndex: z - 2, overflow: "hidden",
        background: `linear-gradient(180deg, #FFF0BE 0%, #FFD777 46%, #E8A83E 100%)` }}>
        {/* ⭐ THE SILHOUETTES, already shifting before the gate is up */}
        {Array.from({ length: 9 }, (_, i) => {
          const bw = 46 + rnd(i, 3) * 22;
          const sway = Math.sin(f / (13 + i * 2) + i * 1.7) * 9;
          return (
            <div key={"sil" + i} style={{ position: "absolute",
              left: 18 + i * (ww - 60) / 8 + sway, bottom: 0, width: bw, height: 96 + rnd(i, 5) * 46,
              background: "#3A2A12", opacity: 0.82, borderRadius: "26% 26% 0 0" }}>
              <div style={{ position: "absolute", left: -12, top: 26, width: 12,
                height: 8, background: "#3A2A12" }} />
              <div style={{ position: "absolute", right: -12, top: 26, width: 12,
                height: 8, background: "#3A2A12" }} />
            </div>
          );
        })}
      </div>
      {/* the light it throws onto the floor in front */}
      {/* ⭐ THE SPILL. This is what the gate's own light does to the floor in
          front of it, and it is what pays for the shutter on the frame-0 luma
          law — a PRACTICAL, motivated by the thing in the shot. */}
      <div style={{ position: "absolute", left: x - 260, top: y + hh - 14, width: ww + 520,
        height: 300, zIndex: z - 3, filter: "blur(4px)",
        background: `linear-gradient(180deg, ${hexa("#FFE3A0", 0.86 * Math.min(1, lift * 2.4))} 0%, ${hexa("#FFE3A0", 0.28 * Math.min(1, lift * 2.4))} 52%, ${hexa("#FFE3A0", 0)} 100%)` }} />
      <div style={{ position: "absolute", left: x - 150, top: y + 30, width: ww + 300,
        height: hh + 240, zIndex: z - 4, filter: "blur(26px)",
        background: `radial-gradient(50% 46% at 50% 78%, ${hexa("#FFDE96", 0.62 * Math.min(1, lift * 2.2))} 0%, ${hexa("#FFDE96", 0)} 100%)` }} />

      {/* THE SHUTTER — ribbed slats, rolled up from the bottom */}
      <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh - gap,
        zIndex: z, overflow: "hidden",
        background: "linear-gradient(178deg,#6E7A8A 0%,#333C48 100%)",
        borderLeft: "9px solid #12161C", borderRight: "9px solid #12161C" }}>
        {Array.from({ length: SLATS }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0,
            top: i * (hh / SLATS), height: hh / SLATS - 3,
            background: `linear-gradient(180deg, ${hexa("#93A0B0", 0.95)} 0%, #46505E 44%, #2B333D 100%)` }} />
        ))}
      </div>
      {/* the bottom rail — a real hard edge, and it TRAVELS */}
      <div style={{ position: "absolute", left: x - 8, top: y + hh - gap - 20, width: ww + 16,
        height: 22, zIndex: z + 1,
        background: "linear-gradient(180deg,#8A94A2,#2A313B)", border: "4px solid #0C1016",
        boxSizing: "border-box" }} />
      {/* the guide rails and the chain that is doing the lifting */}
      {[x - 26, x + ww + 4].map((rx, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: rx, top: y - 24, width: 22,
          height: hh + 24, zIndex: z + 2,
          background: "linear-gradient(90deg,#4A5462,#161C24)" }} />
      ))}
      <div style={{ position: "absolute", left: x + ww + 12, top: y - 24, width: 7,
        height: hh - gap + 24, zIndex: z + 3,
        background: `repeating-linear-gradient(180deg,#8A94A2 0 9px,#1A1F27 9px 18px)` }} />
      {/* the header box the shutter rolls into, with the mark on it */}
      <div style={{ position: "absolute", left: x - 34, top: y - 62, width: ww + 68, height: 62,
        zIndex: z + 4, background: "linear-gradient(180deg,#39424E,#12161E)",
        border: "5px solid #05070A", boxSizing: "border-box",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        {/* ⛔ THE MARK ONLY. The name string here stacked underneath the claim
            chip and the two were unreadable on top of each other; the repo is
            named in full one scene later, on its own plate, which is where a
            viewer can actually read it. A mark is recognised, a string is read,
            and only one of those survives being overlapped. */}
        <div style={{ width: 40, height: 40, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")}
            style={{ width: 31, height: 31, objectFit: "contain" }} />
        </div>
      </div>
    </>
  );
};

/* ===========================================================================
   ⛔⛔⛔ REV 4 — THE BUILD LINE. A DIFFERENT WORLD FROM AGENCY, AND ENGINEERS
   WHO ARE VISIBLY ENGINEERING.

   Alex on rev 3: *"at like 2 seconds ... its just paused and not interesting ...
   its not talking about the ai engineers really showing that in an interesting
   way its just too generic of a presentation and why is it the exact same style
   as the other video AGENCY."*

   ⭐⭐⭐ THE AGENCY COLLISION IS REAL AND IT IS THE ROOT NOTE. Reel 135 AGENCY
   was built in a PARALLEL SESSION from a VO dropped in the same seven minutes,
   on a near-identical subject (a free GitHub repo of N specialist agents). Its
   hook is a sealed metal curtain that LIFTS to reveal a crowd of Claude
   specialists; its body is ranks of that crowd, a GitHub plate with a star
   count, and a grid of role name chips. Rev 3 of AGENTS was a shutter that
   lifts to reveal ranks of Claude specialists, a GitHub plate with a star count,
   and role plates. **Two reels, one picture.**

   ⛔ SO THE CROWD IS NOT AVAILABLE TO THIS REEL. AGENCY owns it. That is
   `feedback_illustrating_the_noun_is_the_trap`'s core test — *count how many
   other scenes already carry that image* — applied across REELS rather than
   within one, which is a check I did not have and now do.

   ⭐⭐⭐ WHAT AGENTS OWNS THAT AGENCY DOES NOT IS **THE RELAY ON ONE JOB**:
   *"have one agent plan the architecture, another build the frontend, another
   handle the backend, and another review the code for security."* AGENCY is
   about OWNING a company. AGENTS is about a THING BEING BUILT, passing through
   hands. So the world is a **BUILD LINE**, not a hall full of standing people:
   one app travels, and at each station a different specialist does a visibly
   DIFFERENT job to it with a real tool and a real output.

   That also answers "too generic": a sprite running an action loop is a person
   who is busy. A sprite LAYING UI BLOCKS ONTO A SCREEN is a frontend engineer.
   ========================================================================= */

/** ⭐⭐⭐ THE LINE ITSELF — a full-width rail carrying app frames, running
    continuously. `motion ~= (fraction repainted per 0.1s) x (luma delta)`, and a
    full-width high-contrast travelling band is the single biggest row in the
    measured table (10.44 against a neighbour's 2.83 at identical push). It also
    never stops, which is the direct answer to "at 2 seconds it's just paused". */
export const BuildLine: React.FC<{ y: number; f: number; on: number; z?: number;
  rate?: number; pitch?: number }> =
  ({ y, f, on, z = 30, rate = 7.0, pitch = 214 }) => {
  const n = Math.ceil((W + pitch * 2) / pitch) + 1;
  const span = pitch * n;
  return (
    <>
      {/* the rail: a lit top edge and a deep shadow under it, so every carrier
          crossing it is a hard light-against-dark boundary */}
      <div style={{ position: "absolute", left: -60, top: y, width: W + 120, height: 15,
        zIndex: z, background: `linear-gradient(180deg,${hexa("#9AA6B4", 0.4 + on * 0.6)},#0B1020)` }} />
      <div style={{ position: "absolute", left: -60, top: y + 15, width: W + 120, height: 26,
        zIndex: z, background: "linear-gradient(180deg,#161C24,#080B10)" }} />
      {/* the tooth rack under it, travelling — small but it sells the motion */}
      {Array.from({ length: 34 }, (_, i) => {
        const x = ((i * 44 + f * rate * 0.5) % (34 * 44) + 34 * 44) % (34 * 44) - 60;
        return <div key={"tt" + i} style={{ position: "absolute", left: x, top: y + 30,
          width: 20, height: 10, zIndex: z + 1, background: hexa("#5A6472", 0.7 * (0.3 + on)) }} />;
      })}
      {/* ⭐ THE CARRIERS. Each holds an app frame at a different stage, so the
          line is visibly carrying WORK and not just moving. */}
      {Array.from({ length: n }, (_, i) => {
        const x = ((i * pitch + f * rate) % span + span) % span - pitch;
        const stage = i % 4;
        return (
          <div key={"cr" + i} style={{ position: "absolute", left: x, top: y - 116, width: 176,
            height: 118, zIndex: z + 2, opacity: 0.35 + on * 0.65 }}>
            {/* the cradle */}
            <div style={{ position: "absolute", left: 0, bottom: 0, width: 176, height: 18,
              background: "linear-gradient(180deg,#8A96A6,#12181F)", border: "4px solid #05070A",
              boxSizing: "border-box" }} />
            {/* the app frame it carries, further built the further along it is */}
            <div style={{ position: "absolute", left: 28, bottom: 18, width: 120, height: 98,
              background: stage === 0 ? "#59616B" : "#F2EFE6",
              border: "4px solid #14181E", boxSizing: "border-box", overflow: "hidden" }}>
              {stage >= 1 && <div style={{ position: "absolute", left: 0, right: 0, top: 0,
                height: 20, background: CLAY }} />}
              {stage >= 2 && [0, 1, 2].map((r) => (
                <div key={r} style={{ position: "absolute", left: 8, right: 8, top: 30 + r * 18,
                  height: 11, background: "#B9C6D2" }} />
              ))}
              {stage >= 3 && <div style={{ position: "absolute", left: 8, right: 8, bottom: 8,
                height: 18, background: GREEN }} />}
            </div>
          </div>
        );
      })}
    </>
  );
};

/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE JOBS. Four drawn actions, one per named role, each with a real tool
   and a real OUTPUT that accumulates. This is the difference between "a sprite
   is busy" and "that is a frontend engineer".
   ⛔ Each one is a DISTANCE, not a state change (`ANIMATION-QUALITY` §11).
   ------------------------------------------------------------------------- */

/** FRONTEND — UI blocks fly in and stack onto a screen face, one at a time. */
export const JobFrontend: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 60 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 168 * s, height: 210 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, background: "#0E141B",
      border: `${6 * s}px solid #05070A`, boxSizing: "border-box" }} />
    <div style={{ position: "absolute", inset: 6 * s, background: "#F4F1E8" }} />
    {[0, 1, 2, 3, 4].map((i) => {
      const a = E(k, i * 0.17, i * 0.17 + 0.26, 0, 1, OUT);
      if (a <= 0) return null;
      const h = [26, 46, 20, 20, 28][i] * s;
      const top = [16, 50, 104, 130, 164][i] * s;
      return (
        <div key={"ui" + i} style={{ position: "absolute", left: 14 * s + (1 - a) * 190 * s,
          top: top, width: (140 - (i === 2 || i === 3 ? 44 : 0)) * s, height: h,
          background: [CLAY, "#C9D6E2", "#B4C2CE", "#B4C2CE", GREEN][i],
          opacity: a, transform: `rotate(${(1 - a) * 16}deg)` }} />
      );
    })}
  </div>
);

/** BACKEND — cables are plugged into a loom, one per pull, and they LIGHT. */
export const JobBackend: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 60 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 176 * s, height: 210 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0,
      background: "linear-gradient(174deg,#2A323C,#0C1016)",
      border: `${6 * s}px solid #05070A`, boxSizing: "border-box" }} />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const a = E(k, i * 0.14, i * 0.14 + 0.24, 0, 1, OUT);
      const lit = a >= 1;
      const c = [GOLD, GREEN, SKY, VIOLET, TEAL, CLAY][i];
      return (
        <React.Fragment key={"bk" + i}>
          {/* the socket */}
          <div style={{ position: "absolute", left: 18 * s, top: (20 + i * 30) * s,
            width: 26 * s, height: 20 * s, background: lit ? c : "#141A22",
            border: `${3 * s}px solid #05070A`, boxSizing: "border-box" }} />
          {/* the cable, sagging in from the right and PLUGGING */}
          {a > 0 && (
            <div style={{ position: "absolute", left: (44 + (1 - a) * 110) * s, top: (26 + i * 30) * s,
              width: (112 - (1 - a) * 40) * s, height: 8 * s, borderRadius: 4 * s,
              background: c, opacity: 0.55 + a * 0.45,
              transform: `rotate(${(1 - a) * 12 - 3}deg)` }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/** SECURITY — a scan head travels the work, then a PASS stamp lands. */
export const JobSecurity: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 60 }) => {
  const scan = Math.min(1, k / 0.72);
  const stamp = E(k, 0.74, 1, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 172 * s, height: 210 * s, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, background: "#F4F1E8",
        border: `${6 * s}px solid #05070A`, boxSizing: "border-box" }} />
      {/* the code it is reading */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div key={"cd" + i} style={{ position: "absolute", left: 16 * s, top: (22 + i * 24) * s,
          width: (60 + ((i * 37) % 80)) * s, height: 9 * s, background: "#9AA6B4" }} />
      ))}
      {/* ⭐ THE SCAN HEAD — a real gantry that TRAVELS the full height */}
      {scan < 1 && (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: `${scan * 100}%`,
            height: 16 * s, background: hexa("#7FE8C0", 0.9), zIndex: 3 }} />
          <div style={{ position: "absolute", left: -10 * s, top: `calc(${scan * 100}% - ${6 * s}px)`,
            width: 26 * s, height: 28 * s, background: "#2A323C",
            border: `${3 * s}px solid #05070A`, boxSizing: "border-box", zIndex: 4 }} />
        </>
      )}
      {stamp > 0 && (
        <div style={{ position: "absolute", left: 20 * s, top: 78 * s, zIndex: 6,
          transform: `translateY(${(1 - stamp) * -180}px) rotate(-8deg) scale(${1 + (1 - stamp) * 0.5})` }}>
          <div style={{ padding: `${6 * s}px ${13 * s}px`, background: "#FBF6EA",
            border: `${5 * s}px solid ${GREEN}`, ...ui(26 * s, 900), color: "#1C5A40",
            letterSpacing: 2 }}>PASS</div>
        </div>
      )}
    </div>
  );
};

/** ARCHITECT — a blueprint is struck onto the board in thick strokes. */
export const JobArchitect: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 60 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 180 * s, height: 210 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, background: "#173A55",
      border: `${6 * s}px solid #05070A`, boxSizing: "border-box" }} />
    {[0.16, 0.36, 0.56, 0.78].map((p, i) => (
      <div key={"bh" + i} style={{ position: "absolute", left: 10 * s,
        width: `${E(k, i * 0.16, i * 0.16 + 0.3, 0, 88, OUT)}%`,
        top: `${p * 100}%`, height: 10 * s, background: hexa("#A8DEF6", 0.94) }} />
    ))}
    {[0.30, 0.66].map((p, i) => (
      <div key={"bv" + i} style={{ position: "absolute", top: 10 * s,
        height: `${E(k, 0.34 + i * 0.16, 0.62 + i * 0.16, 0, 84, OUT)}%`,
        left: `${p * 100}%`, width: 10 * s, background: hexa("#A8DEF6", 0.94) }} />
    ))}
    {[0.24, 0.62].map((p, i) => {
      const a = E(k, 0.66 + i * 0.12, 0.8 + i * 0.12, 0, 1, BACK);
      if (a <= 0) return null;
      return <div key={"tk" + i} style={{ position: "absolute", right: 12 * s,
        top: `${p * 100}%`, width: 46 * s * a, height: 8 * s, background: GOLD }} />;
    })}
  </div>
);

export const JOBS = [JobArchitect, JobFrontend, JobBackend, JobSecurity];

/** ⭐ A STATION. A bench, a lamp, the job board, and the specialist working it.
    ⛔ The Claude's forearm ENDS ON the board — a limb terminating in mid air
    reads as a tail on every sprite in the reel. */
export const Station: React.FC<{ x: number; y: number; f: number; job: number; k: number;
  lit: number; z?: number; s?: number; label?: string; c?: string; name?: number;
  cycle?: number; detail?: boolean | number }> =
  ({ x, y, f, job, k, lit, z = 50, s = 1, label, c = GOLD, name = 0, cycle = 0,
     detail = true }) => {
  /** the dealt subset. `true` keeps the old full fitout for any call site that
      wants it; a number is the bitmask; `false` is a bare bench. */
  const MASKS = [0b001011, 0b110100, 0b011001, 0b100110];
  const D = detail === true ? 0b111111 : detail === false ? 0 : detail;
  const J = JOBS[job % JOBS.length];
  /* ⭐⭐⭐ THE STATION KEEPS WORKING. A job that completes once and freezes is
     why the hook went static: six boards lit up and then sat there for the last
     fifty frames. An engineer does not do one job once, and this reel's own VO
     says they work 24/7 — so past `cycle` the board runs a sawtooth and the
     blocks keep landing, the cables keep plugging, the scan head keeps sweeping. */
  const kk = cycle > 0
    ? (k < 1 ? k : ((f * cycle + name * 13) % 100) / 100)
    : k;
  const TOOLC = ["#C6CEDA", "#E7B24C", "#7FC0C9", "#C44A3A", "#8B72B0"];
  return (
    <>
      {/* the lamp over it, and the pool it throws */}
      <div style={{ position: "absolute", left: x - 10 * s, top: y - 340 * s, width: 20 * s,
        height: 56 * s, zIndex: z, background: "#2A323C" }} />
      <div style={{ position: "absolute", left: x - 46 * s, top: y - 288 * s, width: 92 * s,
        height: 34 * s, zIndex: z, borderRadius: `${46 * s}px ${46 * s}px 0 0`,
        background: `linear-gradient(180deg,#4A5462,#1A2028)` }} />
      <Pool x={x} y={y - 40 * s} w={330 * s} c="#FFE7A8" o={0.14 + lit * 0.34} z={z - 2} />

      {/* ⭐⭐⭐ THE FITOUT — BUT EACH STATION GETS A DIFFERENT SUBSET OF IT.
          Rev 5 gave every station the same six props, so a three-station frame
          held eleven kinds of thing THREE TIMES EACH and nothing ranked first.
          That is `feedback_cluttered_is_a_repeat_count` in its purest form: the
          clutter was not 33 objects, it was the same 11 said three times.

          ⭐ `detail` is now a BITMASK, so the total amount of dressing in frame
          is unchanged while no single prop repeats across neighbouring stations:
            bit 0  tool rail      bit 1  parts tray
            bit 2  output monitor bit 3  cable loop
            bit 4  docket spike   bit 5  bin
          Stations are dealt alternating masks by index, so the eye gets variety
          instead of a row of identical benches. */}
      {(D & 1) > 0 && (
        <>
          {/* the tool rail, with tools hanging off it */}
          <div style={{ position: "absolute", left: x - 108 * s, top: y - 300 * s,
            width: 216 * s, height: 8 * s, zIndex: z + 3,
            background: `linear-gradient(180deg,${hexa("#8A96A6", 0.9)},#2A323C)` }} />
          {[0, 1, 2, 3, 4].map((i) => {
            const sw = Math.sin(f / (21 + i * 3) + i) * 2.4;
            return (
              <div key={"tl" + i} style={{ position: "absolute",
                left: x - 96 * s + i * 44 * s, top: y - 294 * s,
                width: 11 * s, height: (26 + (i % 3) * 14) * s, zIndex: z + 3,
                transformOrigin: "50% 0%", transform: `rotate(${sw}deg)`,
                background: TOOLC[i % TOOLC.length] }}>
                <div style={{ position: "absolute", left: -4 * s, bottom: -6 * s,
                  width: 19 * s, height: 12 * s, background: dkh(TOOLC[i % TOOLC.length], 0.28) }} />
              </div>
            );
          })}
        </>
      )}
      {(D & 2) > 0 && (
        <>
          {/* the parts tray on the bench, with stock in it */}
          <div style={{ position: "absolute", left: x - 112 * s, top: y - 44 * s,
            width: 78 * s, height: 22 * s, zIndex: z + 7,
            background: "linear-gradient(180deg,#4A5462,#1A2028)" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={"pt" + i} style={{ position: "absolute", left: (5 + i * 18) * s,
                top: -8 * s, width: 13 * s, height: 14 * s,
                background: TOOLC[(i + job) % TOOLC.length] }} />
            ))}
          </div>
        </>
      )}
      {(D & 4) > 0 && (
        <>
          {/* a small output monitor beside the main board, running its own ticker */}
          <div style={{ position: "absolute", left: x + 34 * s, top: y - 176 * s,
            width: 62 * s, height: 46 * s, zIndex: z + 5, background: "#0B1A22",
            border: `${4 * s}px solid #05070A`, boxSizing: "border-box", overflow: "hidden" }}>
            {[0, 1, 2].map((r) => (
              <div key={"om" + r} style={{ position: "absolute", left: 4 * s,
                top: (6 + r * 11) * s,
                width: `${30 + ((Math.floor(f / 5) + r * 3 + job) % 4) * 16}%`,
                height: 5 * s, background: [TEAL, GREEN, GOLD][(r + job) % 3] }} />
            ))}
          </div>
        </>
      )}
      {(D & 8) > 0 && (
        <>
          {/* the cable loop hanging under the bench */}
          <div style={{ position: "absolute", left: x - 40 * s, top: y - 4 * s,
            width: 74 * s, height: 30 * s, zIndex: z + 5,
            borderBottom: `${6 * s}px solid #2A323C`, borderLeft: `${6 * s}px solid #2A323C`,
            borderRight: `${6 * s}px solid #2A323C`,
            borderRadius: `0 0 ${34 * s}px ${34 * s}px` }} />
        </>
      )}
      {(D & 16) > 0 && (
        <>
          {/* the docket spike, with paper on it */}
          <div style={{ position: "absolute", left: x + 84 * s, top: y - 56 * s,
            width: 5 * s, height: 34 * s, zIndex: z + 7, background: "#8A96A6" }} />
          {[0, 1, 2].map((i) => (
            <div key={"dk" + i} style={{ position: "absolute", left: (74 + i * 3) * s + x,
              top: y - (44 - i * 5) * s, width: 26 * s, height: 9 * s, zIndex: z + 7,
              background: "#F2EFE6", border: `${2 * s}px solid #6B6152`,
              transform: `rotate(${-6 + i * 5}deg)` }} />
          ))}
        </>
      )}
      {(D & 32) > 0 && (
        <div style={{ position: "absolute", left: x - 96 * s, top: y + 2 * s,
          width: 46 * s, height: 34 * s, zIndex: z + 5,
          background: "linear-gradient(180deg,#39424E,#161C24)",
          clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0 100%)" }} />
      )}

      {/* the bench */}
      <div style={{ position: "absolute", left: x - 116 * s, top: y - 24 * s, width: 232 * s,
        height: 18 * s, zIndex: z + 6,
        background: "linear-gradient(180deg,#7A5C34,#2E2214)", border: `${3 * s}px solid #17120A`,
        boxSizing: "border-box" }} />
      {/* THE JOB, on its board, above the bench */}
      <div style={{ opacity: 0.3 + lit * 0.7 }}>
        <J x={x - 88 * s} y={y - 250 * s} k={kk} s={s} z={z + 4} />
      </div>
      {/* the specialist working it */}
      <Crew f={f} x={x + 118 * s} y={y + 44 * s} i={job + name} size={150 * s} z={z + 8}
        at={0} loop={1} flip />
      <Forearm x0={x + 66 * s} y0={y - 54 * s} x1={x + 4 * s} y1={y - 78 * s}
        w={17 * s} c={CLAY} z={z + 9} />
      {label && (
        <div style={{ position: "absolute", left: x - 88 * s, top: y - 12 * s, zIndex: z + 10 }}>
          <RolePlate x={0} y={0} w={168 * s} h={28 * s} t={label} c={BONE} lit={0.6 + lit * 0.4}
            z={z + 10} tab={c} />
        </div>
      )}
    </>
  );
};

/** the GitHub knife switch that starts the line */
export const StartSwitch: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 70 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 176 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0,
      background: "linear-gradient(174deg,#39424E,#12161E)", border: `${6 * s}px solid #05070A`,
      boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: 40 * s, top: 12 * s, width: 70 * s, height: 70 * s,
      background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("logos/github.svg")}
        style={{ width: 54 * s, height: 54 * s, objectFit: "contain" }} />
    </div>
    {/* the lever, thrown DOWN */}
    <div style={{ position: "absolute", left: 66 * s, top: 96 * s, width: 16 * s, height: 66 * s,
      transformOrigin: "50% 0%", transform: `rotate(${-58 + k * 116}deg)`,
      background: `linear-gradient(180deg,#C6CEDA,#5A6472)`, border: `${3 * s}px solid #05070A`,
      boxSizing: "border-box" }}>
      <div style={{ position: "absolute", left: -8 * s, bottom: -12 * s, width: 32 * s,
        height: 26 * s, borderRadius: 6 * s, background: k > 0.5 ? GREEN : RED,
        border: `${3 * s}px solid #05070A`, boxSizing: "border-box" }} />
    </div>
  </div>
);

/* ===========================================================================
   ⭐⭐⭐ THE BLAST DOORS — the rev-5 hook.

   Alex has now asked for a gate twice (*"like opening the gate whatever"*, then
   *"the hook scene needs to have like a gate thing that opens up metal thing"*),
   so it goes back in. What he rejected in between was the COLLISION with reel
   135 AGENCY, not the idea of a gate — so this one is built to be a different
   gate on every axis that reads:

     AGENCY 135        a flat sealed curtain, LIFTING VERTICALLY,
                       revealing a crowd of specialists STANDING
     AGENTS 134        twin riveted blast doors, PARTING SIDEWAYS,
                       revealing a build line ALREADY RUNNING

   Vertical vs horizontal, one leaf vs two, a crowd at rest vs machinery in
   motion. A viewer who saw both does not think "that again".

   ⛔ AND THE METAL IS STEEL, NOT NEAR-BLACK. Frame 0 is mostly these doors, and
   the >=140 luma law applies there — so the plate is a bright brushed steel with
   dark seams, which keeps the value SPREAD (hierarchy) without a dark MEAN.
   ========================================================================= */
export const BlastDoors: React.FC<{ x: number; y: number; w: number; h: number;
  open: number; f: number; z?: number }> = ({ x, y, w: ww, h: hh, open, f, z = 40 }) => {
  const leaf = ww / 2;
  const slide = open * (leaf + 34);
  const Leaf: React.FC<{ side: -1 | 1 }> = ({ side }) => (
    <div style={{ position: "absolute", top: y, width: leaf, height: hh, zIndex: z,
      left: side < 0 ? x + slide * -1 : x + leaf + slide,
      background: "linear-gradient(96deg,#C2CCD8 0%,#93A0AE 38%,#AEB9C6 62%,#83909E 100%)",
      borderTop: "7px solid #C6D0DA", borderBottom: "9px solid #2A323C",
      boxShadow: "0 22px 44px -14px rgba(16,20,28,0.6)", overflow: "hidden" }}>
      {/* the horizontal ribs a blast door actually has */}
      {[0, 1, 2, 3].map((i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: 0, right: 0,
          top: 30 + i * (hh - 60) / 4, height: 16,
          background: "linear-gradient(180deg,#D8E0E8,#6E7A88)" }} />
      ))}
      {/* rivets down both stiles */}
      {Array.from({ length: 9 }, (_, i) => [14, leaf - 26].map((rx, k) => (
        <div key={"rv" + i + "_" + k} style={{ position: "absolute", left: rx,
          top: 22 + i * (hh - 44) / 8, width: 13, height: 13, borderRadius: "50%",
          background: "radial-gradient(circle at 34% 30%, #E2E9EF, #6E7A88 62%, #3A4450 100%)" }} />
      )))}
      {/* hazard chevrons along the meeting edge */}
      <div style={{ position: "absolute", top: 0, bottom: 0, width: 34,
        [side < 0 ? "right" : "left"]: 0,
        background: "repeating-linear-gradient(135deg,#E7B24C 0 18px,#1A1813 18px 36px)",
        opacity: 0.92 }} />
      {/* the mark cast into the face, once, on the left leaf */}
      {side < 0 && (
        <div style={{ position: "absolute", left: leaf / 2 - 54, top: hh / 2 - 54, width: 108,
          height: 108, borderRadius: 10, background: hexa("#5E6A78", 0.55),
          border: "5px solid #63707E", display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")}
            style={{ width: 68, height: 68, objectFit: "contain", opacity: 0.62 }} />
        </div>
      )}
    </div>
  );
  return (
    <>
      {/* the light escaping the seam BEFORE they part — the anticipation, and
          what pays for the steel on the frame-0 luma law */}
      {/* ⛔ A SEAM, NOT A FLOODLIGHT. The first build let this grow with the
          gap and it bleached the whole reveal to a yellow haze — the doors
          opened onto mush. It is brightest when they are SHUT (that is the
          anticipation) and gone by the time they are a third open, because past
          that the light source is simply the room behind. */}
      <div style={{ position: "absolute", left: x + leaf - 24 - slide, top: y - 8,
        width: 48 + slide * 0.35, height: hh + 16, zIndex: z - 1,
        opacity: 1 - Math.min(1, open / 0.30),
        background: `linear-gradient(90deg, ${hexa("#FFE9B4", 0)} 0%, ${hexa("#FFF3D0", 0.96)} 50%, ${hexa("#FFE9B4", 0)} 100%)`,
        filter: "blur(5px)" }} />
      <Leaf side={-1} />
      <Leaf side={1} />
      {/* the head beam and the hydraulic rams that pull them */}
      <div style={{ position: "absolute", left: x - 40, top: y - 46, width: ww + 80, height: 46,
        zIndex: z + 4, background: "linear-gradient(180deg,#5A6674,#20272F)",
        border: "5px solid #12171D", boxSizing: "border-box" }} />
      {[x - 24, x + ww - 8].map((rx, i) => (
        <div key={"rm" + i} style={{ position: "absolute", left: rx, top: y + hh * 0.42,
          width: 32 + slide * 0.5, height: 20, zIndex: z + 5,
          background: "linear-gradient(180deg,#D2DAE2,#6E7A88)", border: "3px solid #2A323C",
          boxSizing: "border-box" }} />
      ))}
      {/* the warning lamp on the head beam, turning the whole time */}
      <div style={{ position: "absolute", left: x + ww / 2 - 17, top: y - 74, width: 34,
        height: 30, zIndex: z + 6, borderRadius: "16px 16px 0 0",
        background: `linear-gradient(180deg,${hexa("#FF9A3C", 0.5 + 0.5 * Math.abs(Math.sin(f / 7)))},#8A3A0C)`,
        border: "3px solid #2A323C", boxSizing: "border-box" }} />
    </>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE OFFICES — rev 8.

   Alex: *"when i mention frontend engineer, backend engineer, etc like needs to
   show that"* and *"we need to see like offices whatever here."*

   Both notes solve with one move. Up to rev 7 the named roles were a small
   engraved plate on a bench — the VO said "a frontend engineer" and the picture
   said "a person at a workstation, with a word under him". A LABEL is not a
   DEPICTION (`docs/ANIMATION-QUALITY.md` §3): the plate carried the role, and a
   plate carries one bit.

   ⭐ So each named role now gets its OWN ROOM, and the reel CUTS INTO it on the
   word. A room states a discipline the way a workshop states a trade — you know
   what someone does by what is on their walls, before anyone tells you.

     FRONTEND   one screen being laid out, and the SAME layout mirrored on a
                phone and a tablet beside it. Responsive is the one thing only a
                frontend engineer's desk shows.
     BACKEND    a server rack with its own heartbeat, a terminal scrolling real
                log lines, and a schema of joined tables on the wall.
     SECURITY   a bank of monitors, and an audit list whose rows flip RED to
                GREEN one at a time under a scan.

   ⛔ AND THIS IS NOT AGENCY'S PICTURE. Reel 135 draws a HALL of divisions with
   a crowd in it; these are single rooms, one occupant, entered one at a time.
   ========================================================================= */

const Wall: React.FC<{ c: string; c2: string; lip: string }> = ({ c, c2, lip }) => (
  <>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(174deg, ${c} 0%, ${c2} 100%)` }} />
    {/* a picture rail and a skirting, so it reads as a ROOM and not a backdrop */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 214, height: 9, zIndex: 2,
      background: hexa("#FFFFFF", 0.14) }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 604, height: 18, zIndex: 3,
      background: lip }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 622, bottom: 0, zIndex: 3,
      background: `linear-gradient(180deg, ${dkh(lip, 0.16)} 0%, ${dkh(lip, 0.42)} 100%)` }} />
  </>
);

/** the desk every office shares — a real one, with a return and a modesty panel */
const Desk: React.FC<{ x: number; y: number; w: number; z?: number; c?: string }> =
  ({ x, y, w: ww, z = 40, c = "#6E5A3E" }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 20, zIndex: z,
      background: `linear-gradient(180deg,${mxh(c, 0.26)},${dkh(c, 0.12)})`,
      border: "3px solid #17120A", boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: x + 10, top: y + 20, width: ww - 20, height: 62,
      zIndex: z - 1, background: dkh(c, 0.34) }} />
    {[x + 6, x + ww - 20].map((lx, i) => (
      <div key={"dl" + i} style={{ position: "absolute", left: lx, top: y + 20, width: 14,
        height: 118, zIndex: z, background: dkh(c, 0.42) }} />
    ))}
  </>
);

export const OfficeFrontend: React.FC<{ f: number; k: number }> = ({ f, k }) => {
  const B = [0, 1, 2, 3, 4].map((i) => E(k, i * 0.15, i * 0.15 + 0.3, 0, 1, OUT));
  /* ⛔⛔ REV 17 — THE SCREENS SHOW A PAGE NOW. Alex: *"instead of just having a
     bunch of lines, I want to see actual more so graphics."* Grey bars are the
     universal placeholder for "content goes here": they prove a screen is ON and
     say nothing about what is on it — which on a FRONTEND ENGINEER's monitor is
     the entire point of the shot. `DiscSymbol kind="site"` draws a real page:
     a nav, a hero PHOTOGRAPH (sky, sun, hills, horizon), three cards with their
     own thumbnails, and a call to action. */
  const Screen: React.FC<{ x: number; y: number; w: number; h: number; s: number }> =
    ({ x, y, w: ww, h: hh, s }) => (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: 60,
      background: "#12181F", border: `${7 * s}px solid #05070A`, boxSizing: "border-box" }}>
      <DiscSymbol kind="site" x={6 * s} y={6 * s} w={ww - 26 * s} h={hh - 26 * s}
        f={f} c={SKY} z={61} k={Math.min(1, k * 1.4)} />
    </div>
  );
  return (
    <>
      <Wall c="#B9C4D0" c2="#E9EEF3" lip="#6E5A3E" />
      {/* ⭐ THE COLOUR PALETTE ON THE WALL — the one prop that is unmistakably
          a front end desk and nothing else */}
      <div style={{ position: "absolute", left: 64, top: 244, width: 250, height: 78, zIndex: 20,
        background: "#F4F1E8", border: "6px solid #2A241C", boxSizing: "border-box",
        display: "flex" }}>
        {[CLAY, GOLD, GREEN, SKY, VIOLET, TEAL].map((c, i) => (
          <div key={"sw" + i} style={{ flex: 1, background: c,
            opacity: 0.45 + 0.55 * Math.abs(Math.sin(f / 26 + i)) }} />
        ))}
      </div>
      <Desk x={96} y={556} w={820} z={40} />
      {/* the big screen, and the SAME layout mirrored on a tablet and a phone —
          responsive, which is the thing only this discipline shows */}
      <Screen x={166} y={286} w={340} h={270} s={1} />
      <Screen x={534} y={362} w={152} h={194} s={0.62} />
      {/* the pen tablet on the desk */}
      <div style={{ position: "absolute", left: 152, top: 542, width: 116, height: 26, zIndex: 52,
        background: "linear-gradient(180deg,#3A4450,#161C24)", border: "3px solid #05070A",
        boxSizing: "border-box" }} />
      <Contact x={654} y={GY - 8} w={200} o={0.34} />
      <Hero f={f} x={694} y={GY} size={262} z={62} act={1} ph={0.3}
        costume={{ girl: 1 }} gaze={-0.8} flip cheer={k > 0.9 ? 1 : 0} />
      <Forearm x0={620} y0={GY - 202} x1={506} y1={470} w={22} c={CLAY} z={63} />
    </>
  );
};

export const OfficeBackend: React.FC<{ f: number; k: number }> = ({ f, k }) => (
  <>
    <Wall c="#1C2A33" c2="#33505E" lip="#2A3A44" />
    {/* ⭐ THE RACK, with its own heartbeat */}
    <div style={{ position: "absolute", left: 92, top: 240, width: 250, height: 386, zIndex: 30,
      background: "linear-gradient(174deg,#20272F,#0A0E13)", border: "8px solid #05070A",
      boxSizing: "border-box" }}>
      {Array.from({ length: 9 }, (_, r) => (
        <div key={"ru" + r} style={{ position: "absolute", left: 10, right: 10, top: 12 + r * 40,
          height: 30, background: "linear-gradient(180deg,#39424E,#161C24)",
          border: "2px solid #05070A", boxSizing: "border-box" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ position: "absolute", left: 10 + i * 22, top: 11, width: 11,
              height: 9, background: ((Math.floor(f / 3) + r * 3 + i) % 5) < 2 ? GREEN : "#16202A" }} />
          ))}
        </div>
      ))}
    </div>
    {/* ⛔ REV 17 — this was nine rows of coloured BARS pretending to be a log.
        A backend engineer's screen should show the SYSTEM: racks and databases
        wired together with traffic moving between them. `DiscSymbol kind="stack"`
        draws it, and the log strip below keeps the terminal feel. */}
    <div style={{ position: "absolute", left: 372, top: 262, width: 372, height: 300, zIndex: 60,
      background: "#080E14", border: "7px solid #05070A", boxSizing: "border-box" }}>
      <DiscSymbol kind="stack" x={7} y={7} w={344} h={216} f={f} c={TEAL} z={61} k={1} />
      {Array.from({ length: 3 }, (_, i) => {
        const idx = (i + Math.floor(f / 5)) % 7;
        return (
          <div key={"lg" + i} style={{ position: "absolute", left: 14, top: 236 + i * 20,
            display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 30, height: 9, background: GREEN, opacity: 0.85 }} />
            <div style={{ width: 60 + ((idx * 47) % 130), height: 9, background: "#5E7A8C" }} />
            {idx % 3 === 0 && <div style={{ width: 24, height: 9, background: GOLD }} />}
          </div>
        );
      })}
    </div>
    {/* the schema on the wall: joined tables */}
    <div style={{ position: "absolute", left: 776, top: 268, width: 180, height: 150, zIndex: 20 }}>
      {[[0, 0], [86, 44], [0, 92]].map(([tx, ty], i) => (
        <div key={"tb" + i} style={{ position: "absolute", left: tx, top: ty, width: 84, height: 50,
          background: "#F2EFE6", border: "4px solid #17232B", boxSizing: "border-box" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12, background: TEAL }} />
          {[0, 1].map((r) => (
            <div key={r} style={{ position: "absolute", left: 6, right: 6, top: 20 + r * 11,
              height: 5, background: "#9AA6B4" }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: 78, top: 24, width: 14, height: 4, background: GOLD }} />
      <div style={{ position: "absolute", left: 38, top: 50, width: 4, height: 46, background: GOLD }} />
    </div>
    {/* the cable loom running from the rack to the desk */}
    {[0, 1, 2].map((i) => (
      <div key={"cb" + i} style={{ position: "absolute", left: 336, top: 470 + i * 22, width: 60,
        height: 9, zIndex: 44, background: [GOLD, GREEN, SKY][i], borderRadius: 5 }} />
    ))}
    <Desk x={352} y={556} w={560} z={40} c="#2E3A44" />
    <Contact x={838} y={GY - 8} w={200} o={0.34} />
    <Hero f={f} x={880} y={GY} size={262} z={62} act={1} ph={0.6}
      costume={{ glasses: 1 }} gaze={-0.8} flip cheer={k > 0.9 ? 1 : 0} />
    <Forearm x0={806} y0={GY - 202} x1={700} y1={506} w={22} c={CLAY} z={63} />
  </>
);

export const OfficeSecurity: React.FC<{ f: number; k: number }> = ({ f, k }) => {
  const ROWS = 7;
  /* pre-seeded like the other rooms: three rows are already green when we cut in */
  const kk = 0.34 + k * 0.66;
  return (
    <>
      <Wall c="#2E1E20" c2="#5E3A38" lip="#3A2622" />
      {/* the monitor bank */}
      {/* ⛔ REV 17 — six monitors of coloured bars said "screens are on". They
          each carry a SHIELD under scan now, at different stages of clearing,
          which is what a security wall actually shows. */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"mn" + i} style={{ position: "absolute", left: 74 + (i % 3) * 118,
          top: 250 + Math.floor(i / 3) * 104, width: 104, height: 88, zIndex: 30,
          background: "#0B1218", border: "5px solid #05070A", boxSizing: "border-box" }}>
          <DiscSymbol kind="shield" x={5} y={5} w={84} h={68} f={f + i * 11}
            c={[RED, GOLD, GREEN][i % 3]} z={31}
            k={Math.min(1, Math.max(0.15, kk * 1.4 - i * 0.12))} />
        </div>
      ))}
      {/* ⭐ THE AUDIT LIST — rows flipping RED to GREEN one at a time under a
          scan head. This is the depiction of "auditor" that a plate cannot give. */}
      <div style={{ position: "absolute", left: 460, top: 254, width: 372, height: 302, zIndex: 60,
        background: "#F4F1E8", border: "7px solid #05070A", boxSizing: "border-box" }}>
        {Array.from({ length: ROWS }, (_, r) => {
          const done = kk > (r + 0.5) / ROWS;
          return (
            <div key={"ar" + r} style={{ position: "absolute", left: 14, right: 14,
              top: 16 + r * 39, height: 28, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%",
                background: done ? GREEN : RED,
                opacity: done ? 1 : 0.6 + Math.abs(Math.sin(f / 5 + r)) * 0.4 }} />
              <div style={{ flex: 1, height: 11, background: done ? "#9FCBB4" : "#C7A3A0" }} />
            </div>
          );
        })}
        {kk < 1 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: `${kk * 100}%`, height: 12,
            background: hexa("#7FE8C0", 0.92) }} />
        )}
      </div>
      <Desk x={430} y={556} w={470} z={40} c="#4A3230" />
      <Contact x={838} y={GY - 8} w={200} o={0.34} />
      <Hero f={f} x={880} y={GY} size={262} z={62} act={1} ph={0.1}
        costume={{ cop: 1 }} gaze={-0.8} flip stern={0.5} cheer={k > 0.9 ? 1 : 0} />
      <Forearm x0={806} y0={GY - 202} x1={756} y1={506} w={22} c={CLAY} z={63} />
    </>
  );
};

export const OFFICES = [OfficeFrontend, OfficeBackend, OfficeSecurity];


/** ⭐⭐⭐ "HUNDREDS OF OTHER SPECIALIZED ROLES" — a WALL OF OFFICES.
    Rev 7 answered this with tiers of crew on benches, which is a crowd again.
    Hundreds of ROLES, each with its own room, is a building: a grid of lit
    windows with one worker in each, receding. It is the scale image, it is
    "offices", and it is countable without a numeral. */
export const OfficeWall: React.FC<{ f: number; k: number; cols?: number; rows?: number;
  z?: number }> = ({ f, k, cols = 9, rows = 6, z = 30 }) => {
  const W0 = 1012, cw = W0 / cols, rh = 96;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, zIndex: z - 2,
        background: "linear-gradient(178deg,#141C26 0%,#0A0E14 100%)" }} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        /* ⛔ REV 16 — it filled TOP-DOWN from an index that ran with the DOM
           order, so the shot opened on two lit rows floating over a black
           rectangle. It fills bottom-up now, in step with the tally column in S1
           and the laptop boot in S7, so the building's fill reads as one motif
           across the reel. */
        const ord = ((rows - 1 - r) * cols + ((c * 5) % cols)) / (cols * rows);
        const a = E(k, ord * 0.72, ord * 0.72 + 0.16, 0, 1, OUT);
        if (a <= 0.02) return null;
        const warm = (i * 7) % 3 === 0;
        return (
          <div key={"ow" + i} style={{ position: "absolute", left: c * cw + 7, top: 108 + r * rh,
            width: cw - 14, height: rh - 14, zIndex: z,
            background: warm ? "linear-gradient(178deg,#FFE6A8,#D8A64C)" : "linear-gradient(178deg,#CFE4F2,#7FA8C4)",
            border: "4px solid #05070A", boxSizing: "border-box", opacity: a, overflow: "hidden" }}>
            {/* a desk and a worker in every one of them */}
            <div style={{ position: "absolute", left: 6, right: 6, bottom: 12, height: 8,
              background: "#6E5A3E" }} />
            <div style={{ position: "absolute", left: cw * 0.30,
              bottom: 20 + Math.abs(Math.sin(f / (17 + (i % 7)) + i)) * 5,
              width: 20, height: 26, borderRadius: "26% 26% 0 0", background: CLAY }}>
              <div style={{ position: "absolute", left: 4, top: 8, width: 4, height: 6, background: "#1A1813" }} />
              <div style={{ position: "absolute", right: 4, top: 8, width: 4, height: 6, background: "#1A1813" }} />
            </div>
            {/* each room's own screen, on its own clock */}
            <div style={{ position: "absolute", right: 8, bottom: 22, width: 22, height: 17,
              background: ((Math.floor(f / 7) + i) % 4) < 2 ? "#12303C" : "#1C4A5A" }} />
          </div>
        );
      })}
      {/* the mullions, so it reads as ONE building and not floating cards */}
      {Array.from({ length: cols + 1 }, (_, c) => (
        <div key={"mv" + c} style={{ position: "absolute", left: c * cw - 3, top: 96, width: 7,
          height: rows * rh + 16, zIndex: z + 1, background: "#05070A" }} />
      ))}
    </>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE TOWER — rev 9. THE HOOK, SCRAPPED AND REBUILT.

   Alex: *"i want to see like the different claude sprites in like a high rise
   outfit something like that more interesting ... literally the scene at 2
   seconds needs to be completely removed and REDONE ... SCRAP EVERYTHING AND
   REDO BETTER CONCEPT."*

   ⭐⭐⭐ AND THE HIGH RISE IS THE RIGHT INSTINCT FOR A REASON WORTH WRITING DOWN:
   **this reel is 1080x1920 and every world I have built for it has been WIDE.**
   A line, a hall, a row of benches, a wall of doors — all of them lay the
   subject out horizontally in a frame that is twice as tall as it is broad, so
   the interesting part was always cramped into a band across the middle and the
   top and bottom thirds were floor and ceiling. A TOWER is the one shape that
   fills a vertical frame natively, and it lets the camera move along the LONG
   axis of the panel, which is where the pixels are.

   The claim is "one free repo gives you 200 AI engineers". A cutaway high rise,
   floor after floor, each one a different department with a different Claude
   visibly doing that department's job, IS that sentence — and the camera craning
   up it never stops moving, which is the other half of every note on the hook.

   ⛔ EACH FLOOR IS A DIFFERENT DISCIPLINE, drawn not labelled: the department
   colour, its own prop, and two sprites in DIFFERENT costumes. Twelve floors
   drawn, cycling twelve costumes, so no two adjacent floors read the same.
   ========================================================================= */

export const FLOORS = [
  { n: "FRONTEND",  c: "#5AA0DE", kind: "screen" },
  { n: "BACKEND",   c: "#3F9E74", kind: "rack" },
  { n: "SECURITY",  c: "#C44A3A", kind: "audit" },
  { n: "DATA",      c: "#8B72B0", kind: "chart" },
  { n: "ML",        c: "#7FC0C9", kind: "chart" },
  { n: "DEVOPS",    c: "#E7B24C", kind: "rack" },
  { n: "MOBILE",    c: "#C2559A", kind: "screen" },
  { n: "QA",        c: "#9FC46A", kind: "audit" },
  { n: "DATABASE",  c: "#5B5FA8", kind: "rack" },
  { n: "SRE",       c: "#E06A2C", kind: "chart" },
  { n: "DOCS",      c: "#C9A15A", kind: "screen" },
  { n: "SEO",       c: "#7FC0C9", kind: "audit" },
] as const;

export const FloorProp: React.FC<{ kind: string; c: string; f: number; x: number; y: number;
  seed: number }> = ({ kind, c, f, x, y, seed }) => {
  if (kind === "rack") return (
    <div style={{ position: "absolute", left: x, top: y - 116, width: 92, height: 116, zIndex: 42,
      background: "linear-gradient(174deg,#20272F,#0A0E13)", border: "4px solid #05070A",
      boxSizing: "border-box" }}>
      {Array.from({ length: 5 }, (_, r) => (
        <div key={r} style={{ position: "absolute", left: 6, right: 6, top: 6 + r * 21, height: 15,
          background: "#2E3742" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 6 + i * 20, top: 5, width: 9, height: 6,
              background: ((Math.floor(f / 4) + r + i + seed) % 5) < 2 ? c : "#141A22" }} />
          ))}
        </div>
      ))}
    </div>
  );
  if (kind === "audit") return (
    <div style={{ position: "absolute", left: x, top: y - 112, width: 118, height: 112, zIndex: 42,
      background: "#F4F1E8", border: "4px solid #05070A", boxSizing: "border-box" }}>
      {Array.from({ length: 5 }, (_, r) => {
        const ok = ((Math.floor(f / 9) + r + seed) % 4) > 0;
        return (
          <div key={r} style={{ position: "absolute", left: 8, right: 8, top: 9 + r * 20,
            height: 12, display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: ok ? c : "#C7A3A0" }} />
            <div style={{ flex: 1, height: 6, background: "#B9C2CC" }} />
          </div>
        );
      })}
    </div>
  );
  if (kind === "chart") return (
    <div style={{ position: "absolute", left: x, top: y - 112, width: 122, height: 112, zIndex: 42,
      background: "#0E1620", border: "4px solid #05070A", boxSizing: "border-box" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const h = 18 + Math.abs(Math.sin(f / 13 + i * 0.9 + seed)) * 66;
        return <div key={i} style={{ position: "absolute", left: 9 + i * 18, bottom: 8, width: 12,
          height: h, background: c }} />;
      })}
    </div>
  );
  /* screen */
  return (
    <div style={{ position: "absolute", left: x, top: y - 114, width: 132, height: 114, zIndex: 42,
      background: "#12181F", border: "5px solid #05070A", boxSizing: "border-box" }}>
      <div style={{ position: "absolute", inset: 5, background: "#F6F3EC", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 16, background: c }} />
        {[0, 1, 2].map((r) => (
          <div key={r} style={{ position: "absolute", left: 7, top: 24 + r * 16,
            width: `${34 + ((Math.floor(f / 7) + r + seed) % 4) * 16}%`, height: 8,
            background: "#AEBCC8" }} />
        ))}
      </div>
    </div>
  );
};

/** ⭐ ONE FLOOR of the cutaway: slab, back wall in the department's colour, its
    own working prop, a name plate, and TWO Claudes in different costumes. */
export const TowerFloor: React.FC<{ i: number; y: number; f: number; lit: number;
  h?: number; z?: number }> = ({ i, y, f, lit, h = 296, z = 30 }) => {
  const F = FLOORS[i % FLOORS.length];
  const dim = 0.22 + lit * 0.78;
  return (
    <>
      {/* the room */}
      <div style={{ position: "absolute", left: 96, top: y - h, width: 820, height: h, zIndex: z,
        background: `linear-gradient(178deg, ${mxh(F.c, 0.62)} 0%, ${mxh(F.c, 0.24)} 100%)`,
        opacity: 0.42 + lit * 0.58, overflow: "hidden" }}>
        {/* ⛔ THE GLAZING IS DAYLIGHT, NOT DARK PANELS. The first build drew the
            window wall as dark glass, which made every floor a murky box and put
            frame 0 at luma 123 against a 140 bar — and it is also just wrong: a
            cutaway of a high rise shows the sky THROUGH it. Bright glazing is
            what makes the tower read as a building and what pays for the law. */}
        {Array.from({ length: 9 }, (_, k) => (
          <div key={"gm" + k} style={{ position: "absolute", left: 18 + k * 92, top: 12,
            width: 66, height: h - 70,
            background: `linear-gradient(180deg,#F4FAFF 0%,${hexa("#C6DCEC", 0.95)} 100%)`,
            border: `3px solid ${hexa("#4A5A68", 0.55)}`, boxSizing: "border-box",
            opacity: 0.55 + lit * 0.45 }} />
        ))}
        {/* the department's own colour as a floor band, so the tint reads without
            darkening the room */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 58,
          background: F.c, opacity: 0.72 + lit * 0.28 }} />
        {/* an overhead light strip per floor, so each room is LIT rather than tinted */}
        <div style={{ position: "absolute", left: 26, right: 26, top: 4, height: 11,
          background: hexa("#FFF6DE", 0.5 + lit * 0.5) }} />
      </div>
      {/* the floor slab it sits on — the hard edge that makes it a BUILDING */}
      <div style={{ position: "absolute", left: 74, top: y, width: 864, height: 26, zIndex: z + 8,
        background: "linear-gradient(180deg,#C6CEDA,#5A6472)", border: "4px solid #10151B",
        boxSizing: "border-box" }} />
      {/* the department name, cast into the slab */}
      {/* the department name, cast into the slab — big enough to read at thumb
          distance, which a 17px mono string was not */}
      {/* ⛔ z, NOT x. Moving this plate right did not un-clip it, because the
          tower's corner column paints at z=62 and the name was at z+9 = 39 — the
          COLUMN was over the NAME. When something looks cropped, check the
          stacking context before you move it (ANIMATION-QUALITY §6.2). */}
      <div style={{ position: "absolute", left: 124, top: y - 40, zIndex: 72,
        padding: "4px 12px", background: "#14181E", opacity: 0.62 + lit * 0.38,
        ...mono(24, 900), color: F.c, letterSpacing: "0.14em" }}>{F.n}</div>
      {/* its own working prop */}
      <FloorProp kind={F.kind} c={F.c} f={f} x={168} y={y - 8} seed={i * 3} />

      {/* ⭐⭐⭐ SIX DIFFERENT FLOOR CHOREOGRAPHIES, CYCLED BY FLOOR.
          Alex: *"each of the engineers in the screen like need to be doing
          something else like different for each one each floor."* Rev 10 gave
          every floor the SAME staging — one at the prop, one at the desk, one at
          the back, same docket on the same cycle — so twelve floors read as one
          floor twelve times, which is `feedback_cluttered_is_a_repeat_count`
          applied to CHOREOGRAPHY rather than to props.

          Each pose below is a different piece of business with a different body
          count and a different thing travelling, so a viewer craning past twelve
          floors sees twelve scenes:
            0 HAND-OFF   one works the prop, one at the desk, a docket crosses
            1 PAIR       two heads at the prop together, a third walks through
            2 REVIEW     one points UP at the prop, two take notes below it
            3 HAUL       one carries a part the width of the floor to the prop
            4 HUDDLE     three around the desk, one gesturing over it
            5 RELAY      a part passes hand to hand along a line of three
          ⛔ Every forearm STARTS on the mascot's own drawn arm (~0.43 x size
          below the body top) and ENDS on the thing it touches. */}
      {(() => {
        const px = 230;                            /* the prop's own centre     */
        const pose = i % 6;
        const cyc = (f / 44 + i * 0.31) % 1;       /* this floor's own clock    */
        const sw = Math.sin(cyc * Math.PI * 2);
        const arc = Math.sin(cyc * Math.PI);
        const AY = (size: number) => y - 6 - size * 0.43;   /* the drawn arm     */
        const desk = (
          <div style={{ position: "absolute", left: 470, top: y - 62, width: 330, height: 15,
            zIndex: z + 9, background: "linear-gradient(180deg,#7A5C34,#2E2214)" }} />
        );
        const Docket: React.FC<{ x: number; yy: number; rot?: number }> = ({ x, yy, rot = 0 }) => (
          <div style={{ position: "absolute", left: x, top: yy, width: 44, height: 30,
            zIndex: z + 12, background: "linear-gradient(178deg,#FBF6EA,#D8CFB8)",
            border: "3px solid #2A241C", boxSizing: "border-box",
            transform: `rotate(${rot}deg)` }}>
            <div style={{ position: "absolute", left: 5, right: 5, top: 7, height: 4, background: F.c }} />
            <div style={{ position: "absolute", left: 5, right: 12, top: 15, height: 3, background: "#8A9098" }} />
          </div>
        );

        if (pose === 1) return (<>
          {desk}
          {/* two heads at the prop, leaning in together */}
          <Crew f={f} x={px + 118} y={y - 6} i={i * 3} size={134} z={z + 10} at={0} loop={1} flip />
          <Crew f={f} x={px + 232} y={y - 6} i={i * 3 + 4} size={128} z={z + 10} at={0} loop={1} flip />
          <Forearm x0={px + 62} y0={AY(134)} x1={px + 14} y1={y - 76} w={15} c={CLAY} z={z + 11} />
          <Forearm x0={px + 176} y0={AY(128)} x1={px + 30} y1={y - 62} w={14} c={CLAY} z={z + 11} />
          {/* a third walking the length of the floor */}
          <Crew f={f} x={560 + arc * 250} y={y - 6} i={i * 3 + 8} size={122} z={z + 9} at={0} loop={0} />
        </>);

        if (pose === 2) return (<>
          {desk}
          {/* one pointing UP at the prop, arm raised */}
          <Crew f={f} x={px + 130} y={y - 6} i={i * 3 + 1} size={138} z={z + 10} at={0} loop={3} flip />
          <Forearm x0={px + 74} y0={AY(138)} x1={px + 28} y1={y - 120 - arc * 10} w={16} c={CLAY} z={z + 11} />
          {/* two taking notes at the desk below it */}
          <Crew f={f} x={556} y={y - 6} i={i * 3 + 5} size={126} z={z + 10} at={0} loop={1} />
          <Crew f={f} x={700} y={y - 6} i={i * 3 + 9} size={122} z={z + 10} at={0} loop={1} />
          <Docket x={608} yy={y - 84 - arc * 6} rot={-6} />
          <Docket x={664} yy={y - 80 + arc * 5} rot={7} />
        </>);

        if (pose === 3) return (<>
          {desk}
          {/* one hauling a part the width of the floor to the prop */}
          <Crew f={f} x={820 - cyc * 500} y={y - 6} i={i * 3 + 2} size={136} z={z + 11} at={0} loop={0} flip />
          <div style={{ position: "absolute", left: 760 - cyc * 500, top: y - 92, width: 76,
            height: 52, zIndex: z + 12, background: `linear-gradient(178deg,${mxh(F.c, 0.3)},${dkh(F.c, 0.3)})`,
            border: "4px solid #2A241C", boxSizing: "border-box",
            transform: `rotate(${sw * 5}deg)` }} />
          <Crew f={f} x={px + 126} y={y - 6} i={i * 3 + 6} size={130} z={z + 10} at={0} loop={1} flip />
          <Forearm x0={px + 70} y0={AY(130)} x1={px + 18} y1={y - 74} w={15} c={CLAY} z={z + 11} />
        </>);

        if (pose === 4) return (<>
          {desk}
          {/* a huddle of three round the desk, one gesturing over it */}
          <Crew f={f} x={512} y={y - 6} i={i * 3 + 3} size={128} z={z + 10} at={0} loop={3} />
          <Crew f={f} x={636} y={y - 6} i={i * 3 + 7} size={134} z={z + 11} at={0} loop={1} />
          <Crew f={f} x={760} y={y - 6} i={i * 3 + 11} size={126} z={z + 10} at={0} loop={3} flip />
          <Forearm x0={676} y0={AY(134)} x1={598} y1={y - 88 - arc * 12} w={15} c={CLAY} z={z + 12} />
          <Docket x={584} yy={y - 86} rot={-9} />
          {/* and one still at the prop, so the floor is never all in one spot */}
          <Crew f={f} x={px + 122} y={y - 6} i={i * 3 + 14} size={120} z={z + 9} at={0} loop={1} flip />
        </>);

        if (pose === 5) return (<>
          {desk}
          {/* a relay: a part passing hand to hand along three */}
          {[0, 1, 2].map((k) => (
            <Crew key={"rl" + k} f={f} x={px + 130 + k * 168} y={y - 6} i={i * 3 + k * 5}
              size={132 - k * 4} z={z + 10 + k} at={0} loop={1} flip={k !== 1} />
          ))}
          <Docket x={px + 210 + cyc * 300} yy={y - 92 - arc * 22} rot={-10 + cyc * 30} />
          <Forearm x0={px + 74} y0={AY(132)} x1={px + 20} y1={y - 74} w={15} c={CLAY} z={z + 13} />
        </>);

        /* pose 0 — the hand-off */
        return (<>
          {desk}
          <Crew f={f} x={px + 128} y={y - 6} i={i * 3} size={136} z={z + 10} at={0} loop={1} flip />
          <Forearm x0={px + 74} y0={AY(136)} x1={px + 16} y1={y - 70 - arc * 14} w={15} c={CLAY} z={z + 11} />
          <Crew f={f} x={640} y={y - 6} i={i * 3 + 5} size={130} z={z + 10} at={0}
            loop={arc > 0.5 ? 0 : 1} />
          <Forearm x0={598} y0={AY(130)} x1={548 + arc * 40} y1={y - 72} w={14} c={CLAY} z={z + 11} />
          <Docket x={470 + cyc * 220} yy={y - 92 - arc * 26} rot={-8 + cyc * 22} />
          <Crew f={f} x={846} y={y - 6} i={i * 3 + 9} size={112} z={z + 9} at={0} loop={(i + 3) % 4} flip />
        </>);
      })()}
    </>
  );
};

/** the tower's own exterior frame: corner columns and a roof cap, so the
    cutaway reads as ONE building rather than stacked rooms. */
export const TowerFrame: React.FC<{ top: number; bottom: number; z?: number }> =
  ({ top, bottom, z = 60 }) => (
  <>
    {[74, 912].map((x, i) => (
      <div key={"tc" + i} style={{ position: "absolute", left: x, top, width: 28,
        height: bottom - top, zIndex: z,
        background: "linear-gradient(90deg,#A8B4C2,#5A6472)", border: "4px solid #10151B",
        boxSizing: "border-box" }} />
    ))}
  </>
);

/* ===========================================================================
   ⭐⭐⭐ THE TALLY COLUMN — rev 11. THE PROOF BEAT, REBUILT.

   Alex: *"the animation at 6 seconds is not interesting like it needs to be
   completely removed and then redone ... rather than just such a simple card
   there so boring and stars."*

   He is right and the defect has a name. The line is *"it already has over
   39,000 GitHub stars"*, and what I drew was **a card, with stars falling onto
   it, and the number printed on the card**. That is
   `feedback_illustrating_the_noun_is_the_trap` at its purest — the sentence says
   "stars", so I drew stars; it says a number, so I typeset the number. Both
   halves are the first thing anyone would think of, and the picture adds
   nothing the audio has not already said.

   ⭐⭐⭐ WHAT THE SENTENCE ACTUALLY MEANS is that thirty-nine thousand
   developers vouched for this thing, and the interesting shape of that is
   ACCUMULATION — so the count is drawn as a LEVEL THAT RISES, not a numeral
   that increments. A tall glass tally column bolted to the tower, stars pouring
   in from off-frame, and the level climbing a marked scale until it tops out.

   ⛔ A NUMBER MOVES TO ITS VALUE; IT IS NEVER TYPESET AT IT
   (`feedback_graphical_over_textual`). The readout at the head of the column is
   the confirmation, not the depiction — the depiction is the column being full.

   ⛔ AND IT IS VERTICAL, which is the rev-9 finding applied to a body scene:
   this reel is 1080x1920 and a column fills that frame the way a card never did.
   ========================================================================= */
export const TallyColumn: React.FC<{ x: number; y: number; w: number; h: number;
  fill: number; f: number; z?: number }> = ({ x, y, w: ww, h: hh, fill, f, z = 50 }) => {
  const lvl = hh * Math.min(1, fill);
  const N = 42;
  return (
    <>
      {/* the column: a glass tube in a steel cage, bolted to the building */}
      <div style={{ position: "absolute", left: x - 14, top: y - hh - 26, width: ww + 28,
        height: hh + 52, zIndex: z - 1,
        background: "linear-gradient(96deg,#8E9AA8,#5A6672)", border: "6px solid #10151B",
        boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: x, top: y - hh, width: ww, height: hh,
        zIndex: z, overflow: "hidden",
        background: "linear-gradient(96deg,#D8E4EE 0%,#EEF5FA 34%,#C6D4E0 100%)" }}>
        {/* ⭐ THE LEVEL — the count, drawn as a height rather than a numeral */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: lvl,
          background: "linear-gradient(180deg,#FFD772 0%,#E7A93C 62%,#C98A24 100%)" }} />
        {/* the stars packed inside it, so the mass is countable and not a bar */}
        {Array.from({ length: N }, (_, i) => {
          const row = Math.floor(i / 3), col = i % 3;
          const sy = hh - 26 - row * 34;
          if (hh - sy > lvl) return null;
          return (
            <div key={"si" + i} style={{ position: "absolute", left: 12 + col * 40,
              top: sy, ...mono(30, 900), color: "#FFF3D0", lineHeight: 1,
              transform: `rotate(${((i * 37) % 40) - 20}deg)`, opacity: 0.92 }}>★</div>
          );
        })}
        {/* the surface, catching each new arrival */}
        {lvl > 4 && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: lvl - 5,
            height: 10, background: hexa("#FFF6DE", 0.95) }} />
        )}
      </div>
      {/* the graduated scale down the side */}
      {Array.from({ length: 9 }, (_, i) => (
        <React.Fragment key={"gr" + i}>
          <div style={{ position: "absolute", left: x + ww + 16, top: y - (i + 1) * hh / 9,
            width: i % 2 === 0 ? 30 : 18, height: 5, zIndex: z + 2, background: "#2A323C" }} />
          {i % 2 === 0 && (
            <div style={{ position: "absolute", left: x + ww + 52, top: y - (i + 1) * hh / 9 - 11,
              ...mono(19, 900), color: "#2A323C" }}>{((i + 1) * 5) + "k"}</div>
          )}
        </React.Fragment>
      ))}
      {/* the intake at the head, where the torrent lands */}
      <div style={{ position: "absolute", left: x - 30, top: y - hh - 58, width: ww + 60,
        height: 36, zIndex: z + 3,
        background: "linear-gradient(180deg,#B4C0CE,#4A5662)", border: "5px solid #10151B",
        boxSizing: "border-box", clipPath: "polygon(0 0, 100% 0, 82% 100%, 18% 100%)" }} />
    </>
  );
};

/** ⭐ THE TORRENT — stars streaming in from off-frame along a shallow arc into
    the column's intake. Each is >= 40px so it survives the audit's downsample,
    and they keep coming for the whole beat rather than falling once. */
export const StarStream: React.FC<{ tx: number; ty: number; f: number; from: number;
  n?: number; z?: number; rate?: number }> =
  ({ tx, ty, f, from, n = 22, z = 84, rate = 0.022 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const t = ((f - from) * rate + i / n) % 1;
    if (f < from) return null;
    const sx = 1120 + (i % 3) * 60;
    const sy = 40 + ((i * 53) % 260);
    const x = sx + (tx - sx) * t;
    const y = sy + (ty - sy) * t - Math.sin(t * Math.PI) * 90;
    const sz = 44 + ((i * 29) % 26);
    return (
      <div key={"st" + i} style={{ position: "absolute", left: x, top: y, zIndex: z,
        ...mono(sz, 900), color: "#F5C542", lineHeight: 1,
        opacity: Math.min(1, (1 - t) * 3.4),
        transform: `rotate(${t * 300 + i * 24}deg)` }}>★</div>
    );
  })}</>
);

/* ===========================================================================
   ⭐⭐⭐ THE TOWER AT NIGHT — rev 12, and everything after 20s.

   Alex: *"at 20 seconds it needs to be completely redo that scene like scrap it
   and completely redo it more interesting same with all of the animations after
   20 seconds here."*

   ⛔ THE CAUSE WAS A WORLD MISMATCH, NOT THREE BAD SCENES. The hook and the
   proof beat are now a TOWER, and S2/S3 are OFFICES — but S6, S7 and S8 were
   still the industrial build line from four revisions ago: a shop floor, a pay
   board on a wall, a bench folding into a laptop. The last third of the reel was
   set somewhere the first two thirds had stopped being. That reads as "boring"
   because it reads as unrelated.

   ⭐ So the ending returns to the building, and the line "they don't need
   salaries or sleep, so they can keep working forever" gets the one picture that
   only a tower can give: **the whole thing seen from outside, at night, with
   every window still lit.** Nobody leaves. The clock on the facade runs a full
   day round and the lights do not change.
   ========================================================================= */
/* ⛔⛔ REV 14 — `fit` EXISTS BECAUSE THIS PROP HARD-CODED PANEL COORDINATES.
   Alex: *"at 23 seconds that animation doesn't fit on the laptop."* It did not:
   the geometry below was written as CW 108 / X0 152 / Y0 150 against a 1012x792
   PANEL, and S7 renders it inside the laptop lid, whose clipped content box is
   623x399. 5 columns at 108 starting at 152 reach x=714 in a 623-wide box and
   y=552 in a 399-tall one, so a fifth of the building was outside the lid and
   the rest sat hard against the left edge. A prop that draws itself in panel
   coordinates cannot be nested; `fit` tells it the box it is actually in and it
   sizes the grid, the sky and the neighbouring blocks to that box instead.

   `k` is the BOOT FRACTION (default 1 = fully lit). The lid used to open on a
   dead black rectangle for ~8 frames; now the windows come up in a cascade as
   it opens, so the screen is never empty. */
export const NightTower: React.FC<{ f: number; k: number; cols?: number; rows?: number;
  z?: number; dark?: number; wave?: number; fit?: { w: number; h: number } }> =
  ({ f, k, cols = 7, rows = 7, z = 30, dark = 1, wave = 0, fit }) => {
  const PW = fit ? fit.w : 1012, PH = fit ? fit.h : 792;
  const CW = fit ? Math.floor((PW - 96) / cols) : 108;
  const RH = fit ? Math.floor((PH - 112) / rows) : 92;
  const X0 = fit ? Math.round((PW - cols * CW) / 2) : 152;
  const Y0 = fit ? Math.round((PH - rows * RH) / 2) + 4 : 150;
  return (
    <>
      {/* the night sky and the city glow behind it */}
      <div style={{ position: "absolute", inset: 0, zIndex: z - 4,
        background: `linear-gradient(180deg,#0A1024 0%,#16234A 46%,#2B3C66 100%)` }} />
      {Array.from({ length: 46 }, (_, i) => (
        <div key={"sk" + i} style={{ position: "absolute", left: (i * 97) % (PW - 8),
          top: 12 + ((i * 61) % Math.max(40, PH * 0.38)), width: 3, height: 3, borderRadius: "50%",
          background: hexa("#FFFFFF", 0.35 + ((i * 13) % 5) * 0.12), zIndex: z - 3 }} />
      ))}
      {/* neighbouring blocks, mostly DARK — the contrast that makes the point */}
      {[[0.006, 0.207, 0.593], [0.832, 0.188, 0.505]].map(([fx, fw, fh], i) => (
        <div key={"nb" + i} style={{ position: "absolute", left: Math.round(fx * PW),
          top: Math.round(PH * (1 - fh)), width: Math.round(fw * PW),
          height: Math.round(fh * PH), zIndex: z - 2,
          background: "linear-gradient(180deg,#141C33,#0A1020)" }}>
          {Array.from({ length: 24 }, (_, kk) => (
            <div key={kk} style={{ position: "absolute", left: (16 + (kk % 3) * 58) * (PW / 1012),
              top: (22 + Math.floor(kk / 3) * 52) * (PH / 792),
              width: 34 * (PW / 1012), height: 30 * (PH / 792),
              background: (kk * 7 + i) % 9 === 0 ? hexa("#E7C87A", 0.5) : hexa("#22304F", 0.9) }} />
          ))}
        </div>
      ))}
      {/* ⭐ OUR TOWER — every window lit, and one worker visible in each */}
      <div style={{ position: "absolute", left: X0 - 22, top: Y0 - 26, width: cols * CW + 44,
        height: rows * RH + 56, zIndex: z, background: "linear-gradient(180deg,#2A3350,#151C30)",
        border: "7px solid #070B16", boxSizing: "border-box" }} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        /* ⭐ THE BOOT CASCADE — bottom-up, so the building fills the way the
           tally column did earlier in the reel. k = 1 lights everything. */
        const ord = ((rows - 1 - r) * cols + ((c * 3) % cols)) / (cols * rows);
        if (ord > k) return null;
        let warm = (i * 5) % 3 !== 2;
        /* ⭐ THE CELEBRATION WAVE — a diagonal sweep of windows flipping bright,
           used on the CTA so the building itself reacts instead of standing
           still behind the keyword. */
        if (wave > 0) {
          const phase = ((c + (rows - r)) / (cols + rows) - (f * 0.018 * wave)) % 1;
          if (((phase % 1) + 1) % 1 < 0.30) warm = !warm;
        }
        return (
          <div key={"wn" + i} style={{ position: "absolute", left: X0 + c * CW, top: Y0 + r * RH,
            width: CW - (fit ? 14 : 18), height: RH - (fit ? 14 : 20), zIndex: z + 1,
            background: warm
              ? "linear-gradient(180deg,#FFE9A8,#DDB25E)"
              : "linear-gradient(180deg,#CFE4F2,#8FB6D0)",
            border: "4px solid #070B16", boxSizing: "border-box", overflow: "hidden" }}>
            {/* ⛔⛔⛔ REV 16, ALEX: *"at 22 seconds those little screens need to
                have more variety between each, same with the final scene."*
                Every cell was the SAME cell: one figure at the same offset, one
                screen in the same corner, one desk line. A hundred identical
                windows is a TEXTURE, not a hundred people — and this tower is on
                screen for the last seven seconds of the reel and again behind the
                keyword, so it is the last thing anyone looks at.
                Six interiors now, chosen by cell index, with the sprite's colour,
                height, hat and clock all varying inside them. Nothing is added
                per cell — it is the same element count, differently arranged.
                (`feedback_cluttered_is_a_repeat_count`: the fix for sameness is
                variety, not more.) */}
            {(() => {
              /* ⛔⛔⛔ REV 20, ALEX: *"at twenty one seconds maybe I should also see
                 Claude sprites there, just mini ones, instead of the apartment
                 windows"* and *"at twenty three seconds I need to see actual
                 Claude sprites instead of blobs."*

                 They WERE blobs: a rounded rectangle with two dots, hand-drawn
                 here because I assumed the real rig would be illegible at 90px.
                 It is not — `Crew` is the house sprite and it takes a `size`, so
                 every window now holds an actual Claude on its own action loop.
                 The reel's own standing rule said this three revisions into the
                 build (*"each of the ai engineers should be represented as claude
                 sprites not little rectangles or squares"*) and I re-introduced
                 the rectangle the moment the sprite got small. */
              const kind = (i * 7 + Math.floor(i / cols) * 3) % 6;
              const bob = Math.sin(f / (17 + (i % 11)) + i) * 5;
              const wpx = CW - (fit ? 14 : 18), hpx = RH - (fit ? 14 : 20);
              const sz = Math.max(34, hpx * 0.92);
              const desk = (
                <div key="dk" style={{ position: "absolute", left: 5, right: 5, bottom: 6,
                  height: Math.max(3, hpx * 0.07), background: hexa("#6E5A3E", 0.9), zIndex: 4 }} />
              );
              const claude = (fx: number, k2: number, lp: number) => (
                <Crew f={f} x={wpx * fx + bob} y={hpx - hpx * 0.06} i={i * 3 + k2}
                  size={sz * (0.8 + ((i + k2) % 3) * 0.12)} z={3} at={0} loop={lp}
                  flip={(i + k2) % 2 === 0} />
              );
              const screen = (rx: number, ww2: number, cc: string) => (
                <div style={{ position: "absolute", right: rx, bottom: hpx * 0.18,
                  width: ww2, height: hpx * 0.2, zIndex: 2,
                  background: ((Math.floor(f / 6) + i) % 4) < 2 ? cc : "#41697E" }} />
              );
              if (kind === 0) return <>{screen(wpx * 0.07, wpx * 0.24, "#2E4A5A")}{claude(0.42, 0, 1)}{desk}</>;
              if (kind === 1) return <>{claude(0.3, 0, 2)}{claude(0.68, 1, 3)}{desk}</>;
              /* nobody at the desk, but the monitor is still running */
              if (kind === 2) return <>{screen(wpx * 0.3, wpx * 0.4, "#33566A")}
                <div style={{ position: "absolute", left: wpx * 0.12, bottom: hpx * 0.14,
                  width: wpx * 0.16, height: hpx * 0.22, background: "#2A3648", zIndex: 2 }} />{desk}</>;
              if (kind === 3) return <>{claude(0.4, 2, 0)}
                <div style={{ position: "absolute", right: wpx * 0.08, bottom: hpx * 0.13,
                  width: wpx * 0.16, height: hpx * 0.28, background: "#3F7E5A", zIndex: 2,
                  borderRadius: "50% 50% 12% 12%" }} />{desk}</>;
              if (kind === 4) return <>{claude(0.32, 3, 1)}
                <div style={{ position: "absolute", right: wpx * 0.06, bottom: hpx * 0.16,
                  width: wpx * 0.3, height: hpx * 0.3, background: "#F1EDE2", zIndex: 2 }}>
                  {[0, 1].map((r) => (
                    <div key={r} style={{ position: "absolute", left: "12%", right: "16%",
                      top: `${22 + r * 30}%`, height: "12%", background: "#7C8898" }} />
                  ))}
                </div>{desk}</>;
              return <>{claude(0.46, 4, 2)}{screen(wpx * 0.08, wpx * 0.22, "#2E4A5A")}{desk}
                {[0, 1, 2].map((r) => (
                  <div key={"bl" + r} style={{ position: "absolute", left: 0, right: 0, zIndex: 5,
                    top: r * hpx * 0.1, height: hpx * 0.055, background: hexa("#1A2230", 0.55) }} />
                ))}</>;
            })()}
          </div>
        );
      })}
    </>
  );
};

/** ⭐ THE TOWER, SHRINKING ONTO A DESK. "An entire AI dev team on your laptop"
    is a SCALE COLLAPSE, and now that the team lives in a building the thing that
    collapses is the building. */
export const TowerToLaptop: React.FC<{ f: number; k: number; z?: number }> = ({ f, k, z = 40 }) => {
  const s = 1 - k * 0.82;
  const ty = k * 250;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z,
      transform: `translateY(${ty}px) scale(${s})`, transformOrigin: "50% 78%",
      opacity: 1 - Math.max(0, (k - 0.86) / 0.14) }}>
      <NightTower f={f} k={1} cols={7} rows={7} z={z} />
    </div>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE SERVICE LIFT — rev 13. S4 and S5, scrapped and rebuilt.

   Alex: *"at 14 and 17 seconds like it needs to be removed completely and then
   it needs to be so much more interesting like literally scrap that animation
   and redo it."*

   ⛔ SAME CAUSE AS THE 20s NOTE, WHICH I FIXED AT THE END AND NOT IN THE MIDDLE.
   S4 and S5 were still the flat industrial BUILD LINE while the reel either side
   of them had become a tower and a set of offices. A horizontal conveyor in a
   reel about a building is a world mismatch, and a world mismatch reads as
   boring however well it animates.

   ⭐⭐⭐ IN A TOWER, THE JOB GOES UP. You hand a brief in at the bottom and it
   rides a glass service lift through the building — the architecture floor draws
   it, the frontend floor gives it a face, the backend floor wires it, the
   security floor stamps it — and it comes out finished at the top. That is the
   relay this reel owns (`"one agent plan the architecture, another build the
   frontend, another handle the backend, another review the code for security"`)
   drawn as ONE continuous vertical journey, in the world the rest of the reel
   is already in, along the LONG axis of a 1080x1920 frame.
   ========================================================================= */
export const LiftShaft: React.FC<{ x: number; w: number; top: number; bottom: number;
  car: number; f: number; z?: number; stops?: number[] }> =
  ({ x, w: ww, top, bottom, car, f, z = 40, stops = [] }) => {
  const travel = bottom - top;
  const cy = bottom - car * travel;                /* the car's own y          */
  return (
    <>
      {/* the shaft: a glazed core with guide rails and a counterweight */}
      <div style={{ position: "absolute", left: x - 16, top: top - 30, width: ww + 32,
        height: travel + 76, zIndex: z - 2,
        background: "linear-gradient(96deg,#8E9AA8,#4E5A66)", border: "6px solid #10151B",
        boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: x, top: top - 14, width: ww, height: travel + 44,
        zIndex: z - 1, background: "linear-gradient(96deg,#CBDCE8 0%,#EAF3F8 40%,#B8CBDA 100%)",
        opacity: 0.55 }} />
      {[x + 4, x + ww - 10].map((rx, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: rx, top: top - 14, width: 6,
          height: travel + 44, zIndex: z, background: "#39434E" }} />
      ))}
      {/* the landing doors at every stop */}
      {stops.map((sy, i) => (
        <React.Fragment key={"ld" + i}>
          <div style={{ position: "absolute", left: x - 22, top: sy - 8, width: ww + 44, height: 12,
            zIndex: z + 1, background: "linear-gradient(180deg,#B4C0CE,#46505C)" }} />
          <div style={{ position: "absolute", left: x - 30, top: sy - 150, width: 14, height: 150,
            zIndex: z + 1, background: hexa("#39434E", 0.8) }} />
        </React.Fragment>
      ))}
      {/* the hoist rope, shortening as the car climbs */}
      <div style={{ position: "absolute", left: x + ww / 2 - 3, top: top - 30, width: 6,
        height: Math.max(0, cy - 150 - (top - 30)), zIndex: z + 2,
        background: "repeating-linear-gradient(180deg,#8A96A6 0 8px,#1A2028 8px 16px)" }} />
      {/* ⭐ THE CAR */}
      <div style={{ position: "absolute", left: x - 6, top: cy - 152, width: ww + 12, height: 152,
        zIndex: z + 6, background: "linear-gradient(178deg,#F2F5F8 0%,#C3D0DC 100%)",
        border: "6px solid #10151B", boxSizing: "border-box",
        boxShadow: "0 16px 30px -12px rgba(10,14,22,0.6)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 14,
          background: "linear-gradient(180deg,#FFF6DE,#D8C79A)" }} />
      </div>
    </>
  );
};

/** ⭐ THE APP, riding the car and gaining a layer at every stop.
    `stage` 0 blank · 1 blueprint · 2 face · 3 wired · 4 stamped */
/* ⛔⛔⛔ REV 15, ALEX: *"the animation at 15 seconds with the paper thing in the
   middle — it has to have more drastic changes and larger than life changes and
   also super interesting."*

   What was wrong: the artifact was a 96x118 card (115px on screen at s=1.2) and
   every stage was an INTERNAL EDIT — a few more bars inside the same rectangle,
   at the same size, in the same place. Four stops all looked like one object
   very slightly redrawn, on about 1.5% of the panel.

   ⭐ THE FIX IS PHYSICAL, NOT GRAPHIC. Three changes:
     · IT GROWS. Each floor scales it up, so by SECURITY it is 1.8x its ground
       size and BURSTING OUT OF THE LIFT CAR that is carrying it — the thing
       being built outgrows the box, which is the whole point of the sequence.
     · IT GAINS SHEETS. Every stage adds a real offset sheet behind the last, so
       the stack visibly thickens instead of the same card changing colour.
     · IT TAKES A HIT. Each new layer ARRIVES: a scale overshoot, a white flash
       across the face, and a shock ring off the edge. A change you can miss is
       not a change (`feedback_make_an_action_read`). */
/* ⛔⛔⛔ REV 17, ALEX: *"at sixteen seconds, on the paper itself, I want to see
   more interesting stuff. They talk about architecture — I want to see a
   BUILDING popping up. Front end or back end — a GRAPHIC for that, some
   photographic, overlaying and then replacing the building. Reviewing the code
   for security — a SYMBOL related to security appearing."*

   That is a precise brief and the old artifact answered none of it: the stages
   were abstract fills — a grid, some bars, some wires, a bar of green. Nothing
   on the page said ARCHITECTURE or FRONTEND or SECURITY; only the floor label
   beside the lift did, and a label is not a depiction.

   ⭐ EACH FLOOR NOW PUTS ITS OWN PICTURE ON THE PAGE, AND EACH ONE REPLACES THE
   LAST rather than accumulating on top of it — Alex said "overlaying and then
   replacing", and a replacement is what makes a stop read as a stop:
     ARCHITECTURE · a building elevation drawn on blueprint, floors striking in
                    from the ground up, with a core, a crane and a dimension line
     FRONTEND     · a real page slides down over the building and covers it —
                    nav, a hero photograph, cards with thumbnails, a CTA
     BACKEND      · racks and database cylinders wired together, traffic running
     SECURITY     · a shield with a keyhole and a scan, three checks ticking off,
                    then the PASS stamp across the whole face
   The growth, the sheet stack and the arrival slam from rev 15 all stay. */
export const LiftApp: React.FC<{ x: number; y: number; stage: number; s?: number; z?: number;
  f: number }> = ({ x, y, stage, s = 1, z = 70, f }) => {
  const k = (i: number) => Math.min(1, Math.max(0, stage - i));
  const bp = k(0), fe = k(1), be = k(2), se = k(3);
  const slam = (i: number) => (stage > i + 1 ? Math.max(0, 1 - (stage - (i + 1)) * 4.5) : 0);
  const hit = Math.max(slam(0), slam(1), slam(2), slam(3));
  const grow = 1 + 0.20 * stage + 0.26 * hit;
  const W0 = 116 * s, H0 = 144 * s;
  const IW = W0 - 10 * s, IH = H0 - 10 * s;
  const sheet = (i: number, on: number) => on <= 0 ? null : (
    <div key={"sh" + i} style={{ position: "absolute", left: (10 - i * 7) * s,
      top: (10 - i * 7) * s, width: W0, height: H0, background: "#C8CED6",
      border: `${4 * s}px solid #14181E`, boxSizing: "border-box", opacity: 0.9 * on,
      transform: `rotate(${(i - 1.5) * 3.2}deg)` }} />
  );
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0, width: W0, height: H0,
      zIndex: z, transform: `scale(${grow.toFixed(3)}) rotate(${Math.sin(f / 19) * 2.5 - hit * 5}deg)`,
      transformOrigin: "50% 88%" }}>
      {[0, 1, 2, 3].map((i) => sheet(i, k(i)))}

      <div style={{ position: "absolute", inset: 0, background: "#59616B",
        border: `${5 * s}px solid #14181E`, boxSizing: "border-box", overflow: "hidden" }}>
        {/* ⛔⛔⛔ REV 30, ALEX: *"at 13 seconds we just see the plain screen doing
            nothing, it has to have more motion."* He is describing a BUG. At
            stage 0 every layer below is gated off, so the card rendered as a
            featureless grey slab — and S4 holds stage 0 for its first 58 frames,
            so the hero object of that scene was a blank plate for two seconds.

            ⭐ STAGE 0 IS NOT "NOTHING", IT IS THE BRIEF. The job goes into the
            lift as a written ticket — header, title block, four unticked
            discipline boxes, a NEW stamp and a cursor still writing the last
            line — and the four floors tick those boxes as it climbs. */}
        {bp < 0.02 && (
          <div style={{ position: "absolute", inset: 0, background: "#F4F1E8" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 20 * s,
              background: "#14181E" }} />
            <div style={{ position: "absolute", left: 8 * s, top: 6 * s, width: 44 * s,
              height: 8 * s, background: GOLD }} />
            <div style={{ position: "absolute", left: 8 * s, right: 8 * s, top: 30 * s,
              height: 12 * s, background: "#2A3440" }} />
            {[0, 1, 2, 3].map((i) => (
              <React.Fragment key={"jb" + i}>
                <div style={{ position: "absolute", left: 9 * s, top: (52 + i * 17) * s,
                  width: 11 * s, height: 11 * s, border: `${3 * s}px solid #5E6A78`,
                  boxSizing: "border-box" }} />
                <div style={{ position: "absolute", left: 26 * s, top: (55 + i * 17) * s,
                  width: (58 - i * 8) * s, height: 6 * s, background: "#AEBAC6" }} />
              </React.Fragment>
            ))}
            {/* the line still being written, so the brief is LIVE */}
            <div style={{ position: "absolute", left: 9 * s, top: 122 * s,
              width: (10 + (f % 40) * 1.6) * s, height: 6 * s, background: "#7E8A98" }} />
            <div style={{ position: "absolute", left: (10 + (f % 40) * 1.6) * s, top: 119 * s,
              width: 3 * s, height: 12 * s, background: "#14181E",
              opacity: Math.floor(f / 4) % 2 ? 1 : 0.2 }} />
            <div style={{ position: "absolute", right: -6 * s, top: 36 * s,
              padding: `${3 * s}px ${9 * s}px`, background: CLAY, ...ui(15 * s, 900),
              color: "#FBF6EA", transform: "rotate(-8deg)" }}>NEW</div>
          </div>
        )}
        {/* 1 · ARCHITECTURE — the building goes up on the page */}
        {bp > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: bp }}>
            <DiscSymbol kind="building" x={0} y={0} w={IW} h={IH} f={f} c={SKY} z={2} k={bp} />
          </div>
        )}
        {/* 2 · FRONTEND — the page SLIDES DOWN over the building and covers it */}
        {fe > 0 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 3,
            transform: `translateY(${((1 - Math.min(1, fe * 1.5)) * -100).toFixed(1)}%)` }}>
            <DiscSymbol kind="site" x={0} y={0} w={IW} h={IH} f={f} c={CLAY} z={3} k={fe} />
          </div>
        )}
        {/* 3 · BACKEND — the stack wipes across from the right and replaces it */}
        {be > 0 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 4,
            clipPath: `inset(0 0 0 ${(100 - Math.min(1, be * 1.5) * 100).toFixed(0)}%)` }}>
            <DiscSymbol kind="stack" x={0} y={0} w={IW} h={IH} f={f} c={TEAL} z={4} k={be} />
          </div>
        )}
        {/* 4 · SECURITY — the shield resolves in over everything */}
        {se > 0 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5,
            opacity: Math.min(1, se * 2.2) }}>
            <DiscSymbol kind="shield" x={0} y={0} w={IW} h={IH} f={f} c={RED} z={5} k={se} />
          </div>
        )}
        {hit > 0.02 && <div style={{ position: "absolute", inset: 0, zIndex: 8,
          background: hexa("#FFFFFF", hit * 0.72) }} />}
      </div>

      {se > 0.42 && (
        <div style={{ position: "absolute", left: -26 * s, right: -26 * s, top: 44 * s,
          padding: `${7 * s}px 0`, textAlign: "center", background: "#FBF6EA",
          border: `${6 * s}px solid ${GREEN}`, ...ui(34 * s, 900), color: "#1C5A40",
          letterSpacing: "0.1em", zIndex: 9,
          transform: `rotate(-11deg) scale(${(0.4 + 0.6 * Math.min(1, (se - 0.42) * 4)) * (1 + slam(3) * 0.5)})`,
          opacity: Math.min(1, (se - 0.42) * 5) }}>PASS</div>
      )}
      {hit > 0.04 && (
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 40, height: 40,
          marginLeft: -20, marginTop: -20, borderRadius: "50%", zIndex: 10,
          border: `${5 * (1 - hit) + 3}px solid ${hexa(GOLD, hit)}`,
          transform: `scale(${1 + (1 - hit) * 5.5})` }} />
      )}
    </div>
  );
};

/* =========================================================================
   BayShell / BayFore · REV 13 — TURNING A FLAT OFFICE INTO A FLOOR OF A TOWER
   ⛔ ALEX, twice: *"we need to see like offices"*, then *"i want to see like
   the different claude sprites in like a high rise"*, then *"each of the scenes
   like frontend engineer, backend engineer, etc it needs to be way better for
   each scene."*

   The three role rooms were a WALL and a DESK: flat, one body, and — the part
   that shows up on a contact sheet — the top third of a 1080x1920 frame was
   empty. A wall has no ceiling and no outside, so nothing said WHERE this was.
   These two shells wrap the existing rooms in the building the rest of the reel
   now takes place in:
     · BayShell  — a full-height window with the CITY FAR BELOW behind it, which
                   is the only cue that reads as "high rise" in one second.
     · BayFore   — the ceiling with its pendants, and a near-black foreground
                   edge, so the room has a top and a front instead of one plane.
   z is chosen to slot around the existing rooms: Wall is z1, desks z40, hero
   z62, NearShade z88 — so the shell lives at 4..18 and the fore at 80..87.
   ====================================================================== */
export const BayShell: React.FC<{ f: number; side?: "l" | "r"; tint: string; seed?: number }> =
  ({ f, side = "r", tint, seed = 0 }) => {
  const W = 268, X = side === "r" ? 1012 - W - 26 : 26;
  const rnd = (i: number) => { const s = Math.sin((i + seed) * 91.7) * 43758.5453; return s - Math.floor(s); };
  return (
    <>
      {/* the opening, and the sky at height */}
      <div style={{ position: "absolute", left: X, top: 96, width: W, height: 512, zIndex: 5,
        background: "linear-gradient(180deg,#7FA6C8 0%,#A8C0D2 44%,#D6D2C4 74%,#B4A48C 100%)",
        overflow: "hidden" }}>
        {/* ⭐ THE CITY, SEEN FROM ABOVE — the towers stop well below the sill,
            which is what tells you the floor is high and not the ground one. */}
        {Array.from({ length: 11 }, (_, i) => {
          const bw = 24 + rnd(i) * 34, bx = i * 26 - 10, bh = 60 + rnd(i + 40) * 150;
          return (
            <div key={"ct" + i} style={{ position: "absolute", left: bx, bottom: 0, width: bw,
              height: bh, background: `rgba(${18 + rnd(i + 9) * 20},${26 + rnd(i + 3) * 18},${42 + rnd(i + 7) * 22},${0.78 + rnd(i + 2) * 0.22})` }}>
              {Array.from({ length: Math.floor(bh / 22) }, (_, r) => (
                <div key={"cw" + r} style={{ position: "absolute", left: 4, right: 4,
                  top: 8 + r * 22, height: 8,
                  background: rnd(i * 13 + r) > 0.42 ? GOLD : "#2A3644",
                  opacity: rnd(i * 13 + r) > 0.42 ? 0.72 + 0.28 * Math.abs(Math.sin(f / 30 + i + r)) : 0.85 }} />
              ))}
            </div>
          );
        })}
        {/* the haze the distance actually has */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 108,
          background: "linear-gradient(180deg,rgba(214,210,196,0) 0%,rgba(214,210,196,0.38) 100%)" }} />
        {/* an aircraft crossing, so the outside is not a photograph */}
        <div style={{ position: "absolute", top: 58 + (seed % 3) * 26, left: ((f * 1.5 + seed * 90) % (W + 60)) - 30,
          width: 12, height: 5, background: PAPER, opacity: 0.9 }} />
      </div>
      {/* the mullions and the frame */}
      {[0, 1, 2].map((i) => (
        <div key={"ml" + i} style={{ position: "absolute", left: X + 10 + i * ((W - 20) / 3),
          top: 96, width: 12, height: 512, zIndex: 8, background: "#1A222C" }} />
      ))}
      <div style={{ position: "absolute", left: X, top: 96, width: W, height: 512, zIndex: 9,
        border: "14px solid #232D39", boxSizing: "border-box" }} />
      {/* the sill, catching the daylight */}
      <div style={{ position: "absolute", left: X - 12, top: 596, width: W + 24, height: 26,
        zIndex: 10, background: `linear-gradient(180deg,${mxh(tint, 0.5)},${dkh(tint, 0.32)})`,
        borderBottom: "5px solid #0A0E14", boxSizing: "border-box" }} />
      {/* the daylight the window throws back into the room */}
      <div style={{ position: "absolute", left: side === "r" ? X - 300 : X + W, top: 150,
        width: 320, height: 470, zIndex: 4,
        background: `linear-gradient(${side === "r" ? 270 : 90}deg, rgba(232,240,248,0.34), rgba(232,240,248,0))` }} />
    </>
  );
};

export const BayFore: React.FC<{ f: number; tint: string }> = ({ f, tint }) => (
  <>
    {/* the ceiling — the top third of the frame was empty until this existed */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 74, zIndex: 82,
      background: "linear-gradient(180deg,#0E141B 0%,#1E2732 62%,#2A343F 100%)",
      borderBottom: "6px solid #05070A", boxSizing: "border-box" }} />
    {[0, 1, 2].map((i) => {
      const lx = 214 + i * 292, sw = 3 + Math.sin(f / 22 + i * 2) * 2.2;
      return (
        <React.Fragment key={"pd" + i}>
          <div style={{ position: "absolute", left: lx, top: 74, width: 5, height: 46, zIndex: 83,
            background: "#05070A", transformOrigin: "50% 0%",
            transform: `rotate(${Math.sin(f / 22 + i * 2) * 1.1}deg)` }} />
          <div style={{ position: "absolute", left: lx - 52 + sw, top: 118, width: 104, height: 22,
            zIndex: 84, background: `linear-gradient(180deg,${mxh(tint, 0.34)},#0E141B)`,
            borderRadius: "6px 6px 2px 2px", boxShadow: `0 6px 26px ${hexa(tint, 0.5)}` }} />
          {/* the cone it actually throws */}
          <div style={{ position: "absolute", left: lx - 118 + sw, top: 140, width: 236, height: 300,
            zIndex: 3, background: `linear-gradient(180deg,${hexa(tint, 0.3)},rgba(0,0,0,0))`,
            clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)" }} />
        </React.Fragment>
      );
    })}
    {/* the near edge: the back of something between us and the room */}
    <div style={{ position: "absolute", left: -40, right: -40, top: 716, height: 120, zIndex: 86,
      background: "linear-gradient(180deg,#05070A 0%,#04060A 100%)",
      borderTop: "5px solid #101820", boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: 62, top: 690, width: 210, height: 44, zIndex: 87,
      background: "#05070A", borderRadius: "10px 10px 0 0" }} />
  </>
);

/* =========================================================================
   CityGlass · a run of high-rise glazing with the city behind it
   ⛔ REV 14 — `BayShell` bakes in a full-height window at a fixed x, which suits
   a room shot across but not an open-plan floor where the action has to travel
   the whole width. This is the same view, as a BAND, so a scene can put the
   city behind the work instead of beside it.
   ====================================================================== */
export const CityGlass: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  seed?: number; z?: number; night?: number }> = ({ x, y, w, h, f, seed = 0, z = 6, night = 0 }) => {
  const rnd = (i: number) => { const s = Math.sin((i + seed) * 91.7) * 43758.5453; return s - Math.floor(s); };
  const n = Math.max(4, Math.round(w / 168));   /* wide blocks, not a barcode */
  const sky = night
    ? "linear-gradient(180deg,#0C1428 0%,#1A2744 52%,#2A3350 100%)"
    : "linear-gradient(180deg,#7FA6C8 0%,#A8C0D2 46%,#D6D2C4 78%,#B4A48C 100%)";
  return (
    <>
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
        background: sky, overflow: "hidden" }}>
        {Array.from({ length: n + 3 }, (_, i) => {
          const bw = 62 + rnd(i) * 78, bx = i * (w / n) - 22, bh = h * (0.20 + rnd(i + 40) * 0.42);
          return (
            <div key={"cg" + i} style={{ position: "absolute", left: bx, bottom: 0, width: bw,
              height: bh, background: night
                ? `rgba(${10 + rnd(i + 9) * 14},${16 + rnd(i + 3) * 14},${34 + rnd(i + 7) * 18},0.95)`
                : `rgba(${18 + rnd(i + 9) * 20},${26 + rnd(i + 3) * 18},${42 + rnd(i + 7) * 22},${0.78 + rnd(i + 2) * 0.22})` }}>
              {Array.from({ length: Math.max(1, Math.floor(bh / 24)) }, (_, r) => (
                <div key={"cq" + r} style={{ position: "absolute", left: 8, right: 8,
                  top: 11 + r * 26, height: 11,
                  background: rnd(i * 13 + r) > (night ? 0.28 : 0.42) ? GOLD : "#2A3644",
                  opacity: rnd(i * 13 + r) > (night ? 0.28 : 0.42)
                    ? 0.72 + 0.28 * Math.abs(Math.sin(f / 30 + i + r)) : 0.85 }} />
              ))}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.24,
          background: night
            ? "linear-gradient(180deg,rgba(42,51,80,0) 0%,rgba(42,51,80,0.5) 100%)"
            : "linear-gradient(180deg,rgba(214,210,196,0) 0%,rgba(214,210,196,0.38) 100%)" }} />
        <div style={{ position: "absolute", top: h * 0.18, left: ((f * 1.6 + seed * 90) % (w + 60)) - 30,
          width: 13, height: 5, background: PAPER, opacity: 0.9 }} />
      </div>
      {Array.from({ length: Math.max(2, Math.round(n / 2)) }, (_, i) => (
        <div key={"gm" + i} style={{ position: "absolute",
          left: x + 8 + i * ((w - 16) / Math.max(2, Math.round(n / 2))),
          top: y, width: 12, height: h, zIndex: z + 2, background: "#1A222C" }} />
      ))}
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z + 3,
        border: "14px solid #232D39", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: x - 10, top: y + h - 4, width: w + 20, height: 24,
        zIndex: z + 4, background: "linear-gradient(180deg,#8C7F66,#3A3226)",
        borderBottom: "5px solid #0A0E14", boxSizing: "border-box" }} />
    </>
  );
};

/* =========================================================================
   BayFitout · REV 16 — THE LAYER THAT MAKES A ROOM A WORKPLACE
   ⛔ ALEX: *"the animations at 9 seconds, 10 seconds etc need to be so much more
   interesting as well, like way more detailed."* The role rooms had ARCHITECTURE
   (ceiling, glazing, foreground) and CONTENT (the discipline's work) but nothing
   in between — no evidence that anyone lives there. That middle layer is what
   reads as "detailed"; adding more discipline props would just repeat the point.

   ⭐ ONE FITOUT LAYER, SHARED BY ALL THREE ROOMS (`feedback_rooms_need_an_architecture_layer`):
   services overhead, cable trunking underfoot, a pinboard, a plant, a mug, a
   task lamp. Nothing here states the discipline — that is the room's own job.
   ====================================================================== */
export const BayFitout: React.FC<{ f: number; tint: string; side?: "l" | "r"; seed?: number }> =
  ({ f, tint, side = "r", seed = 0 }) => {
  const flip = side === "r" ? 1 : -1;
  const px = (v: number) => (side === "r" ? v : 1012 - v);
  return (
    <>
      {/* services running the length of the ceiling, under the slab */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 78, height: 22, zIndex: 80,
        background: "linear-gradient(180deg,#39434F,#1B222C)", borderBottom: "4px solid #05070A",
        boxSizing: "border-box" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"hg" + i} style={{ position: "absolute", left: 44 + i * 116, top: 100, width: 7,
          height: 22, zIndex: 79, background: "#161D26" }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 122, height: 13, zIndex: 79,
        background: `linear-gradient(180deg,${dkh(tint, 0.4)},#12181F)` }} />

      {/* cable trunking along the base of the back wall */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 636, height: 16, zIndex: 18,
        background: "linear-gradient(180deg,#2B3440,#151B23)" }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"sk" + i} style={{ position: "absolute", left: 62 + i * 168, top: 626, width: 34,
          height: 12, zIndex: 19, background: hexa(tint, 0.5) }} />
      ))}

      {/* the pinboard — the one surface in an office that is never tidy */}
      <div style={{ position: "absolute", left: px(112) - (side === "r" ? 0 : 168), top: 214,
        width: 168, height: 120, zIndex: 24, background: "#8E7B5A",
        border: "6px solid #3A2E1C", boxSizing: "border-box" }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"pn" + i} style={{ position: "absolute",
            left: 10 + (i % 3) * 48, top: 10 + Math.floor(i / 3) * 48,
            width: 40, height: 40, background: ["#F4F1E8", "#F6D98C", "#DCE7F0"][i % 3],
            transform: `rotate(${((i * 37 + seed) % 11) - 5}deg)` }}>
            <div style={{ position: "absolute", left: 6, right: 6, top: 9, height: 4,
              background: "#9AA6B2" }} />
            <div style={{ position: "absolute", left: 6, right: 14, top: 19, height: 4,
              background: "#9AA6B2" }} />
          </div>
        ))}
      </div>

      {/* a task lamp throwing a real cone onto the desk */}
      <div style={{ position: "absolute", left: px(886) - (side === "r" ? 0 : 62), top: 486,
        width: 62, height: 20, zIndex: 66, background: "#252D38",
        borderRadius: side === "r" ? "10px 2px 2px 10px" : "2px 10px 10px 2px" }} />
      <div style={{ position: "absolute", left: px(846) - (side === "r" ? 0 : 150), top: 506,
        width: 150, height: 170, zIndex: 25,
        background: `linear-gradient(180deg,${hexa(GOLD, 0.26)},rgba(0,0,0,0))`,
        clipPath: "polygon(34% 0%, 62% 0%, 100% 100%, 0% 100%)" }} />

      {/* the plant nobody waters, and the mug */}
      <div style={{ position: "absolute", left: px(60) - (side === "r" ? 0 : 74), top: 556,
        width: 74, height: 52, zIndex: 68, background: "#8A5B3C",
        borderRadius: "0 0 12px 12px" }} />
      {[0, 1, 2].map((i) => (
        <div key={"lf" + i} style={{ position: "absolute",
          left: px(66 + i * 18) - (side === "r" ? 0 : 20),
          top: 494 + (i % 2) * 14, width: 20, height: 66, zIndex: 67, background: "#3F7E5A",
          borderRadius: "50% 50% 20% 20%",
          transform: `rotate(${(i - 1) * 16 + Math.sin(f / 34 + i) * 3 * flip}deg)`,
          transformOrigin: "50% 100%" }} />
      ))}
      <div style={{ position: "absolute", left: px(700), top: 546, width: 30, height: 26,
        zIndex: 66, background: "#F1EDE2", borderRadius: "0 0 6px 6px" }} />
    </>
  );
};

/* =========================================================================
   DiscSymbol · REV 17 — ONE PICTURE PER DISCIPLINE, DRAWN NOT TYPESET
   ⛔ ALEX, twice in one note: *"on the screens for front end engineers, instead
   of just having a bunch of lines, I want to see actual more so graphics"* and
   *"on the paper itself — they talk about architecture, I want to see a building
   popping up; front end or back end, a graphic for that; reviewing the code for
   security, a symbol related to security appearing."*

   Grey bars are the universal placeholder for "content goes here" — they say a
   screen is ON, and nothing about what is on it. Four real pictures instead,
   used in BOTH places so the reel has one symbol vocabulary: what the frontend
   engineer has on his monitor at 9s is the same thing the app gains in the lift
   at 16s.
     building · an elevation with floors, a core and a crane
     site     · a page with a real hero photograph, nav, cards, a button
     stack    · racks and database cylinders wired together, traffic running
     shield   · a shield with a keyhole, a sweep, and a tick
   ====================================================================== */
export const DiscSymbol: React.FC<{ kind: "building" | "site" | "stack" | "shield";
  x: number; y: number; w: number; h: number; f: number; c?: string; z?: number; k?: number }> =
  ({ kind, x, y, w, h, f, c = SKY, z = 60, k = 1 }) => {
  const box = { position: "absolute" as const, left: x, top: y, width: w, height: h, zIndex: z,
    overflow: "hidden" as const };
  const u = Math.min(w, h) / 100;                 /* one unit, so it scales     */

  if (kind === "building") {
    const floors = 7;
    return (
      <div style={{ ...box, background: "#12395A" }}>
        {/* the drafting grid it is drawn on */}
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"gv" + i} style={{ position: "absolute", top: 0, bottom: 0,
            left: `${(i + 1) * 10}%`, width: 1.4 * u, background: hexa("#8FD2F0", 0.22) }} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"gh" + i} style={{ position: "absolute", left: 0, right: 0,
            top: `${(i + 1) * 11}%`, height: 1.4 * u, background: hexa("#8FD2F0", 0.22) }} />
        ))}
        {/* ⭐ THE ELEVATION — floors strike in from the ground up */}
        {Array.from({ length: floors }, (_, i) => {
          const on = Math.min(1, Math.max(0, k * (floors + 1.4) - i));
          return (
            <div key={"fl" + i} style={{ position: "absolute", left: `${24}%`, width: "52%",
              bottom: `${12 + i * 10.4}%`, height: `${8.6}%`,
              border: `${2.4 * u}px solid #BFE9FE`, boxSizing: "border-box",
              background: hexa("#BFE9FE", 0.13), opacity: on,
              transform: `scaleX(${0.3 + on * 0.7})`, transformOrigin: "50% 50%" }}>
              {[0, 1, 2].map((q) => (
                <div key={q} style={{ position: "absolute", top: "24%", height: "52%",
                  left: `${12 + q * 27}%`, width: "16%", background: hexa("#BFE9FE", 0.5) }} />
              ))}
            </div>
          );
        })}
        {/* the service core, and the ground line */}
        <div style={{ position: "absolute", left: "44%", width: "12%", bottom: "12%",
          height: `${12 + Math.min(1, k * 1.2) * 62}%`, background: hexa("#BFE9FE", 0.3),
          borderLeft: `${2 * u}px dashed #BFE9FE`, borderRight: `${2 * u}px dashed #BFE9FE` }} />
        <div style={{ position: "absolute", left: "8%", right: "8%", bottom: "11%",
          height: 2.6 * u, background: "#BFE9FE" }} />
        {/* the crane that is putting it up */}
        <div style={{ position: "absolute", left: "78%", bottom: "12%", width: 2.6 * u,
          height: "72%", background: "#F6D98C" }} />
        <div style={{ position: "absolute", left: "34%", width: "46%", top: "16%",
          height: 2.6 * u, background: "#F6D98C" }} />
        <div style={{ position: "absolute", left: `${34 + Math.abs(Math.sin(f / 26)) * 30}%`,
          top: "18%", width: 1.8 * u, height: "14%", background: "#F6D98C" }} />
        {/* dimension line, because an elevation has one */}
        <div style={{ position: "absolute", left: "16%", width: "6%", bottom: "12%",
          top: "18%", borderTop: `${1.8 * u}px solid #7FB9D8`,
          borderBottom: `${1.8 * u}px solid #7FB9D8` }} />
      </div>
    );
  }

  if (kind === "site") {
    return (
      <div style={{ ...box, background: "#F6F3EC" }}>
        {/* the nav */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "13%",
          background: c, display: "flex", alignItems: "center", gap: 4 * u,
          paddingLeft: 5 * u }}>
          <div style={{ width: 7 * u, height: 7 * u, borderRadius: "50%", background: "#FBF7EC" }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: (12 - i * 2) * u, height: 3 * u, borderRadius: 2 * u,
              background: hexa("#FBF7EC", 0.85) }} />
          ))}
        </div>
        {/* ⭐ A REAL PHOTOGRAPH — sky, sun, hills, a horizon. Not a grey bar. */}
        <div style={{ position: "absolute", left: "6%", right: "6%", top: "18%", height: "40%",
          overflow: "hidden", background: "linear-gradient(180deg,#8FC6E8 0%,#CFE4EE 62%,#E8DCC2 100%)",
          border: `${1.6 * u}px solid #2A3038` }}>
          <div style={{ position: "absolute", right: "14%", top: "14%", width: 14 * u,
            height: 14 * u, borderRadius: "50%", background: "#F6D98C" }} />
          <div style={{ position: "absolute", left: "-8%", bottom: 0, width: "62%", height: "56%",
            background: "#4E7A63", clipPath: "polygon(0% 100%, 46% 0%, 100% 100%)" }} />
          <div style={{ position: "absolute", left: "34%", bottom: 0, width: "70%", height: "42%",
            background: "#3E6752", clipPath: "polygon(0% 100%, 52% 0%, 100% 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "16%",
            background: "#87A88E" }} />
        </div>
        {/* three cards with their own thumbnails */}
        {[0, 1, 2].map((i) => (
          <div key={"cd" + i} style={{ position: "absolute", top: "62%", height: "24%",
            left: `${6 + i * 30.5}%`, width: "27%", background: "#FFFFFF",
            border: `${1.4 * u}px solid #C8D2DC` }}>
            <div style={{ position: "absolute", left: "8%", right: "8%", top: "10%", height: "44%",
              background: [c, "#E7B24C", "#3F9E74"][i] }} />
            <div style={{ position: "absolute", left: "8%", width: "70%", top: "62%",
              height: "9%", background: "#B9C6D2" }} />
            <div style={{ position: "absolute", left: "8%", width: "48%", top: "76%",
              height: "9%", background: "#CFD8E2" }} />
          </div>
        ))}
        {/* the call to action */}
        <div style={{ position: "absolute", left: "36%", width: "28%", bottom: "3%",
          height: "9%", background: GREEN, borderRadius: 2 * u }} />
      </div>
    );
  }

  if (kind === "stack") {
    return (
      <div style={{ ...box, background: "#0D1620" }}>
        {/* two racks */}
        {[0, 1].map((r) => (
          <div key={"rk" + r} style={{ position: "absolute", left: `${6 + r * 24}%`, top: "12%",
            width: "20%", height: "62%", background: "#1B242E",
            border: `${1.6 * u}px solid #05070A` }}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: "8%", right: "8%",
                top: `${5 + i * 15.5}%`, height: "11%", background: "#2C3743" }}>
                {[0, 1, 2].map((q) => (
                  <div key={q} style={{ position: "absolute", top: "26%", height: "46%",
                    left: `${10 + q * 24}%`, width: "13%",
                    background: ((Math.floor(f / 4) + i + q + r) % 5) < 2 ? c : "#141C26" }} />
                ))}
              </div>
            ))}
          </div>
        ))}
        {/* ⭐ THE DATABASE — a real cylinder, not a rectangle */}
        {[0, 1].map((d) => (
          <div key={"db" + d} style={{ position: "absolute", left: "62%", width: "26%",
            top: `${14 + d * 32}%`, height: "26%" }}>
            <div style={{ position: "absolute", inset: 0, background: "#1D3A4A",
              border: `${1.6 * u}px solid #05070A`, borderRadius: `${9 * u}px / ${4.5 * u}px` }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "34%",
              background: hexa(c, 0.55), borderRadius: `${9 * u}px / ${4.5 * u}px`,
              border: `${1.6 * u}px solid #05070A`, boxSizing: "border-box" }} />
            <div style={{ position: "absolute", left: "14%", right: "14%", top: "52%",
              height: "8%", background: hexa("#9BD4E8", 0.5) }} />
          </div>
        ))}
        {/* the wires between them, with traffic actually moving */}
        {[0, 1].map((i) => (
          <React.Fragment key={"wr" + i}>
            <div style={{ position: "absolute", left: "50%", width: "12%",
              top: `${26 + i * 32}%`, height: 2.4 * u, background: hexa(c, 0.55) }} />
            <div style={{ position: "absolute", width: 4 * u, height: 4 * u, borderRadius: "50%",
              background: c, top: `${25 + i * 32}%`,
              left: `${50 + ((f * 1.6 + i * 40) % 100) * 0.12}%` }} />
          </React.Fragment>
        ))}
        {/* a throughput trace along the bottom */}
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"tp" + i} style={{ position: "absolute", bottom: "5%", width: "3.6%",
            left: `${6 + i * 5.6}%`,
            height: `${6 + Math.abs(Math.sin(f / 9 + i * 0.7)) * 16}%`, background: hexa(GREEN, 0.8) }} />
        ))}
      </div>
    );
  }

  /* ⛔⛔⛔ REV 19, ALEX: *"for the security audit, just have like a security
     PADLOCK, a RED padlock, something like that. I can't really tell what that
     graphic is right now."*

     The shield was a hexagon with a keyhole in it, and at the size it plays —
     84px on a monitor, and a fifth of a lift card — a hexagon reads as a
     hexagon. `feedback_make_an_action_read`: an accent set is only as legible as
     its worst member, and this was the worst by a distance while the building,
     the page and the rack all read instantly.

     ⭐ A PADLOCK IS THE MOST LEGIBLE SECURITY OBJECT THERE IS, and it has a
     moving part: the shackle DROPS and the body flashes as it locks. Red body,
     steel shackle, a keyhole, and a scan running down it. */
  const shut = Math.min(1, Math.max(0, k * 1.6));
  const clack = k > 0.55 ? Math.max(0, 1 - (k - 0.55) * 9) : 0;
  const bw = w * 0.52, bh = h * 0.40;
  const bx = (w - bw) / 2, by = h * 0.44;
  const sw = bw * 0.62, sx = (w - sw) / 2;
  return (
    <div style={{ ...box, background: "#1A1014" }}>
      {/* the scan sweeping the whole plate, so the shot is never still */}
      <div style={{ position: "absolute", left: 0, right: 0, height: h * 0.2,
        top: ((f % 52) / 52) * h - h * 0.1, zIndex: 1,
        background: `linear-gradient(180deg,rgba(255,255,255,0),${hexa("#FF9E8E", 0.16)},rgba(255,255,255,0))` }} />
      {/* ⭐ THE SHACKLE — it comes DOWN into the body as the audit clears */}
      <div style={{ position: "absolute", left: sx, width: sw, top: by - h * 0.30 + (1 - shut) * h * 0.13,
        height: h * 0.34, zIndex: 3, boxSizing: "border-box",
        border: `${8 * u}px solid #C6CFD9`,
        borderBottom: "none", borderRadius: `${sw / 2}px ${sw / 2}px 0 0` }} />
      {/* the body */}
      <div style={{ position: "absolute", left: bx, top: by, width: bw, height: bh, zIndex: 4,
        borderRadius: 6 * u, boxSizing: "border-box",
        background: `linear-gradient(178deg,${mxh(RED, 0.42)},${dkh(RED, 0.3)})`,
        border: `${4 * u}px solid #2A1416`,
        boxShadow: clack > 0.02 ? `0 0 ${34 * u}px ${hexa("#FF8A76", clack)}` : "none",
        transform: `scale(${(1 + clack * 0.1).toFixed(3)})` }}>
        {/* the keyhole */}
        <div style={{ position: "absolute", left: "50%", top: "24%", width: 15 * u, height: 15 * u,
          marginLeft: -7.5 * u, borderRadius: "50%", background: "#2A1416" }} />
        <div style={{ position: "absolute", left: "50%", top: "44%", width: 8 * u, height: 20 * u,
          marginLeft: -4 * u, background: "#2A1416",
          clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)" }} />
      </div>
      {/* the checks it cleared on the way, ticking off up the left */}
      {[0, 1, 2].map((i) => {
        const on = Math.min(1, Math.max(0, k * 3.4 - i));
        return (
          <div key={"ck" + i} style={{ position: "absolute", left: "6%", top: `${16 + i * 26}%`,
            width: 11 * u, height: 11 * u, borderRadius: 2 * u, zIndex: 5,
            background: on > 0.6 ? GREEN : "#3A2A2C", border: `${1.6 * u}px solid #FBF6EA`,
            boxSizing: "border-box", opacity: 0.35 + on * 0.65 }} />
        );
      })}
      {/* the lamp that goes green when it is shut */}
      <div style={{ position: "absolute", right: "6%", bottom: "9%", width: 13 * u, height: 13 * u,
        borderRadius: "50%", zIndex: 5, background: shut > 0.9 ? GREEN : RED,
        opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 5)),
        boxShadow: `0 0 ${16 * u}px ${hexa(shut > 0.9 ? GREEN : RED, 0.85)}` }} />
      {/* the shackle slamming home throws a ring */}
      {clack > 0.05 && (
        <div style={{ position: "absolute", left: "50%", top: `${(by / h) * 100}%`,
          width: 30 * u, height: 30 * u, marginLeft: -15 * u, marginTop: -15 * u,
          borderRadius: "50%", zIndex: 6,
          border: `${3 * u}px solid ${hexa("#FF9E8E", clack)}`,
          transform: `scale(${1 + (1 - clack) * 4})` }} />
      )}
    </div>
  );
};

/* =========================================================================
   AgentGrid · REV 19 — WHAT "THE WHOLE TEAM, YOUR LAPTOP" ACTUALLY LOOKS LIKE
   ⛔ ALEX: *"at twenty one to twenty three seconds it's just kind of the same
   thing. I want to see a bit of differing between the scenes in terms of what
   those little squares are — those little rectangles is not that good here."*

   The laptop screen was showing the SAME night-tower grid as the window behind
   it, so two thirds of the frame was one texture repeated at two sizes. Six
   window interiors (rev 16) made each cell better and left the two halves of the
   shot identical in kind.

   ⭐ The line is "the whole team, on your laptop", so the screen shows the TEAM:
   a roster of agent cards, each with a face, a real role name off the repo's own
   list, a status lamp and a job bar that fills. Cards deal in one at a time. It
   is a different OBJECT from a lit window, so the screen and the city behind it
   finally read as two different things.
   ====================================================================== */
export const AgentGrid: React.FC<{ f: number; k: number; cols?: number; rows?: number;
  fit: { w: number; h: number }; z?: number }> =
  ({ f, k, cols = 4, rows = 4, fit, z = 30 }) => {
  const PAD = Math.round(fit.w * 0.035);
  const cw = (fit.w - PAD * (cols + 1)) / cols;
  const ch = (fit.h - PAD * (rows + 2.2)) / rows;
  const NAMES = R.deck ?? ["FRONTEND", "BACKEND", "SECURITY", "ARCHITECT"];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, zIndex: z - 1,
        background: "linear-gradient(178deg,#101A28,#070C14)" }} />
      {/* the roster's own header bar, so it reads as an app and not a pattern */}
      <div style={{ position: "absolute", left: PAD, right: PAD, top: PAD * 0.6,
        height: ch * 0.42, zIndex: z, background: "#1B2836", display: "flex",
        alignItems: "center", paddingLeft: PAD * 0.6, gap: PAD * 0.5 }}>
        <div style={{ width: ch * 0.18, height: ch * 0.18, borderRadius: "50%",
          background: GREEN, boxShadow: `0 0 ${ch * 0.2}px ${hexa(GREEN, 0.9)}` }} />
        <div style={{ width: fit.w * 0.34, height: ch * 0.14, background: "#5E7A8C" }} />
      </div>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        /* ⭐ they DEAL IN, one at a time, bottom row first */
        const ord = ((rows - 1 - r) * cols + ((c * 3) % cols)) / (cols * rows);
        const a = Math.min(1, Math.max(0, (k - ord * 0.72) * 5));
        if (a <= 0.02) return null;
        const busy = ((i * 7) % 5) !== 3;
        const prog = busy ? ((f * 0.9 + i * 23) % 100) / 100 : 0;
        const tint = [CLAY, SKY, TEAL, GOLD, VIOLET][(i * 3) % 5];
        return (
          <div key={"ag" + i} style={{ position: "absolute", zIndex: z + 1,
            left: PAD + c * (cw + PAD), top: ch * 0.42 + PAD * 1.4 + r * (ch + PAD),
            width: cw, height: ch, background: "#16202C",
            border: `${Math.max(2, cw * 0.035)}px solid #05070A`, boxSizing: "border-box",
            opacity: a, transform: `translateY(${(1 - a) * -14}px) scale(${0.86 + a * 0.14})` }}>
            {/* ⛔ THE NAME GETS THE FULL WIDTH. Beside a face it had 48% of a
                140px card and every role came out truncated — FRONTEN, ARCHITE,
                SECURIT. A cut-off word reads as a bug, not as density. */}
            <div style={{ position: "absolute", left: cw * 0.06, right: cw * 0.06, top: ch * 0.1,
              ...mono(Math.max(7, ch * 0.2), 900), color: "#DCE6F0", letterSpacing: "-0.01em",
              whiteSpace: "nowrap", overflow: "hidden", textAlign: "center" }}>
              {String(NAMES[(i * 5) % NAMES.length])}
            </div>
            {/* ⛔ the same blob lived on the roster cards. It is the real sprite
                now, sitting on the card like a headshot. */}
            <Crew f={f} x={cw * 0.22} y={ch * 0.94} i={i * 5 + 3} size={ch * 0.62}
              z={2} at={0} loop={busy ? (i % 3) : 3} flip={i % 2 === 0} />
            {/* the job it is on, actually running */}
            <div style={{ position: "absolute", left: cw * 0.4, right: cw * 0.07, top: ch * 0.46,
              height: ch * 0.13, background: "#26323F" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
                width: `${prog * 100}%`, background: busy ? GREEN : "#3A4652" }} />
            </div>
            {/* the status lamp */}
            <div style={{ position: "absolute", right: cw * 0.07, bottom: ch * 0.12,
              width: cw * 0.1, height: cw * 0.1, borderRadius: "50%",
              background: busy ? GREEN : "#4A5665",
              opacity: busy ? 0.5 + 0.5 * Math.abs(Math.sin(f / 6 + i)) : 0.6 }} />
            {/* its output, ticking along the bottom */}
            {Array.from({ length: 5 }, (_, q) => (
              <div key={q} style={{ position: "absolute", left: cw * (0.09 + q * 0.115),
                bottom: ch * 0.13, width: cw * 0.08, height: ch * 0.07,
                background: busy && ((Math.floor(f / 5) + i + q) % 5) < 3 ? hexa(tint, 0.9) : "#26323F" }} />
            ))}
          </div>
        );
      })}
    </>
  );
};


/* =========================================================================
   MiniIcon · REV 24 — EIGHT DISCIPLINE GLYPHS, DRAWN, FOR BADGE-SIZED USE
   ⛔ ALEX on the BOARD hook: *"more graphics in the beginning rather than just
   so text heavy, since people don't like that."* The board was a split-flap
   DIRECTORY: two columns of words, filling with more words. Even done well that
   is a wall of type in the first second of a reel, which is the worst possible
   thing to ask a scrolling viewer to do.

   `DiscSymbol` is the reel's real symbol set but it is drawn for 200px+; at
   badge size its detail turns to mush. These are the same ideas at 40px, built
   from three or four shapes each so they survive.
   ====================================================================== */
export const MiniIcon: React.FC<{ k: number; c: string; s: number; f: number }> =
  ({ k, c, s, f }) => {
  const u = s / 100;
  const box: React.CSSProperties = { position: "absolute", left: 0, top: 0, width: s, height: s };
  const kind = ((k % 8) + 8) % 8;
  if (kind === 0) return (                                   /* a building */
    <div style={box}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 22 * u, right: 22 * u,
          bottom: (16 + i * 26) * u, height: 18 * u, background: c,
          opacity: 0.55 + i * 0.15 }} />
      ))}
      <div style={{ position: "absolute", left: 14 * u, right: 14 * u, bottom: 6 * u,
        height: 8 * u, background: c }} />
    </div>
  );
  if (kind === 1) return (                                   /* a window/page */
    <div style={box}>
      <div style={{ position: "absolute", inset: 12 * u, border: `${8 * u}px solid ${c}`,
        boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 12 * u, right: 12 * u, top: 12 * u,
        height: 18 * u, background: c }} />
    </div>
  );
  if (kind === 2) return (                                   /* a stack/db */
    <div style={box}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 16 * u, right: 16 * u,
          top: (16 + i * 24) * u, height: 16 * u, background: c,
          borderRadius: `${9 * u}px / ${5 * u}px`, opacity: 1 - i * 0.2 }} />
      ))}
    </div>
  );
  if (kind === 3) return (                                   /* a padlock */
    <div style={box}>
      <div style={{ position: "absolute", left: 30 * u, width: 40 * u, top: 16 * u,
        height: 28 * u, border: `${8 * u}px solid ${c}`, borderBottom: "none",
        borderRadius: `${20 * u}px ${20 * u}px 0 0`, boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 20 * u, width: 60 * u, top: 42 * u,
        height: 42 * u, background: c, borderRadius: 6 * u }} />
    </div>
  );
  if (kind === 4) return (                                   /* a chart */
    <div style={box}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", bottom: 16 * u, width: 14 * u,
          left: (18 + i * 18) * u, height: (20 + Math.abs(Math.sin(f / 14 + i)) * 48) * u,
          background: c }} />
      ))}
    </div>
  );
  if (kind === 5) return (                                   /* a terminal */
    <div style={box}>
      <div style={{ position: "absolute", inset: 14 * u, border: `${7 * u}px solid ${c}`,
        boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 26 * u, top: 40 * u, width: 20 * u,
        height: 7 * u, background: c, transform: "rotate(45deg)" }} />
      <div style={{ position: "absolute", left: 26 * u, top: 52 * u, width: 20 * u,
        height: 7 * u, background: c, transform: "rotate(-45deg)" }} />
      <div style={{ position: "absolute", left: 52 * u, top: 56 * u, width: 22 * u,
        height: 7 * u, background: c }} />
    </div>
  );
  if (kind === 6) return (                                   /* a node graph */
    <div style={box}>
      <div style={{ position: "absolute", left: 42 * u, top: 14 * u, width: 18 * u,
        height: 18 * u, borderRadius: "50%", background: c }} />
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", top: 62 * u, width: 18 * u, height: 18 * u,
          left: (i ? 66 : 18) * u, borderRadius: "50%", background: c, opacity: 0.75 }} />
      ))}
      {[0, 1].map((i) => (
        <div key={"e" + i} style={{ position: "absolute", left: 50 * u, top: 30 * u,
          width: 6 * u, height: 40 * u, background: c, transformOrigin: "50% 0%",
          transform: `rotate(${i ? 38 : -38}deg)`, opacity: 0.6 }} />
      ))}
    </div>
  );
  return (                                                   /* a gear */
    <div style={box}>
      <div style={{ position: "absolute", left: 26 * u, top: 26 * u, width: 48 * u,
        height: 48 * u, borderRadius: "50%", border: `${11 * u}px solid ${c}`,
        boxSizing: "border-box" }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 44 * u, top: 10 * u, width: 12 * u,
          height: 80 * u, background: c, opacity: 0.9,
          transform: `rotate(${i * 45 + f * 0.7}deg)`, transformOrigin: "50% 50%" }} />
      ))}
      <div style={{ position: "absolute", left: 38 * u, top: 38 * u, width: 24 * u,
        height: 24 * u, borderRadius: "50%", background: "#0A0E14" }} />
    </div>
  );
};

/* =========================================================================
   TheHall · REV 38 — A COMPLETELY DIFFERENT SCENE, NOT A REFRAME
   ⛔⛔⛔ ALEX: *"it needs to be a completely different scene here, not just the
   Claude sprites standing around for that part."* Three rounds running I had
   answered "make 1s more interesting" with a CAMERA MOVE on the same set — a
   punch, then a closer punch, then a medium. A reframe is not a scene. The set
   never changed, so neither did the answer.

   ⭐ At 1.0s the VO is on the words "AI ENGINEERS", and the honest picture for
   that is not two people at a door — it is HOW MANY THERE ARE. So the hook cuts
   INSIDE: a hall in one-point perspective, desks running away to a vanishing
   point, every one of them occupied and working, lights receding overhead. New
   location, new geometry, new palette, and it states the number the way a gate
   exterior structurally cannot. Then it cuts back out and they come through the
   doors.
   ====================================================================== */
export const TheHall: React.FC<{ f: number; k: number; push: number; seed?: number }> =
  ({ f, k, push, seed = 0 }) => {
  const RANKS = 7, VY = 300;                      /* vanishing point y        */
  const rnd = (i: number) => { const s = Math.sin((i + seed) * 91.7) * 43758.5453; return s - Math.floor(s); };
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
      /* ⛔⛔ AND THE SAME TRAP AGAIN — a NEW SCENE animated with IDLE LOOPS. The
         hall measured 2.6 and 2.8 against the winners' 4.5-6.5 because a 0.16
         dolly over 30 frames is barely a move and everything else was a desk. The
         camera now TRAVELS down it: 0.52, which in one-point perspective drags
         every converging line and every rank outward at once. */
      overflow: "hidden", transform: `scale(${(1 + push * 0.52).toFixed(3)})`,
      transformOrigin: "50% 56%" }}>
      {/* the hall itself — walls converging, floor running to the point */}
      {/* ⛔ the first build was a DARK corridor and the rest of the reel is a lit
          daytime office — it read as a different film, not a different room. This
          is a working floor with the lights on, and the walls run the full height
          so the frame has no dead band top or bottom. */}
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(180deg,#5E6C7A 0%,#48545F 42%,#39434E 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: VY, bottom: 0,
        background: "linear-gradient(180deg,#7E8A98 0%,#4A545F 100%)" }} />
      {/* the ceiling, so the hall has a top */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: VY - 120,
        background: "linear-gradient(180deg,#2A3440 0%,#46525E 100%)" }} />
      {/* floor lines converging — the cue that makes the depth read instantly */}
      {[-3, -2, -1, 1, 2, 3].map((i) => (
        <div key={"fl" + i} style={{ position: "absolute", left: 506, top: VY,
          width: 5, height: 560, background: hexa("#AAB6C2", 0.5),
          transformOrigin: "50% 0%", transform: `rotate(${i * 13}deg)` }} />
      ))}
      {/* the ceiling's light strips, receding */}
      {Array.from({ length: RANKS }, (_, r) => {
        const s = 1 / (1 + r * 0.55);
        return (
          <div key={"lt" + r} style={{ position: "absolute", left: 506 - 190 * s, width: 380 * s,
            top: VY - 176 * s, height: 20 * s, background: "#FFF8DC",
            boxShadow: `0 0 ${40 * s}px ${hexa(GOLD, 0.6)}` }} />
        );
      })}
      {/* ⭐ THE DESKS AND WHO IS AT THEM — near ranks big, far ranks tiny */}
      {/* ⛔ FIRST BUILD DREW THE DESK BEHIND ITS OWN OCCUPANT. Every sprite had a
          z and the desks had none, so the bodies painted over the furniture and the
          row read as scattered blue slabs with people floating among them. In a
          hall you see the desk IN FRONT of whoever is sitting at it, and the near
          rank in front of the far one — so z runs off DEPTH for all three layers. */}
      {Array.from({ length: RANKS }, (_, r) => {
        const rr = RANKS - 1 - r;                 /* draw far to near         */
        const s = 1 / (1 + rr * 0.55);
        const yb = VY + 330 * s;
        const gap = 96 + 250 * s;
        const zb = 30 - rr * 2;
        return [-1, 1].map((side) => {
          const x = 506 + side * gap;
          const lit = rnd(rr * 3 + (side > 0 ? 1 : 0)) > 0.12;
          return (
            <React.Fragment key={`d${rr}${side}`}>
              {/* the engineer, sitting BEHIND the desk */}
              <Crew f={f} x={x + 20 * s} y={yb - 26 * s} i={rr * 5 + (side > 0 ? 3 : 8) + seed}
                size={198 * s} z={zb} at={-12} loop={(rr + (side > 0 ? 1 : 0)) % 4}
                flip={side < 0} tint={rr > 3 ? "#E8A488" : undefined} />
              {/* the desk, in front of him */}
              <div style={{ position: "absolute", left: x - 118 * s, top: yb - 88 * s,
                width: 236 * s, height: 88 * s, zIndex: zb + 1,
                background: `linear-gradient(178deg,${mxh(SKY, 0.4)},${dkh(SKY, 0.4)})`,
                border: `${Math.max(2, 5 * s)}px solid #0A0E14`, boxSizing: "border-box" }} />
              {/* and his screen standing on it */}
              <div style={{ position: "absolute", left: x - 78 * s, top: yb - 156 * s,
                width: 130 * s, height: 74 * s, zIndex: zb + 2,
                background: lit ? "#F2EFE6" : "#161E28",
                border: `${Math.max(2, 4 * s)}px solid #0A0E14`, boxSizing: "border-box",
                overflow: "hidden" }}>
                {lit && [0, 1, 2].map((q) => (
                  <div key={q} style={{ position: "absolute", left: 9 * s, right: 9 * s,
                    top: (12 + q * 20) * s, height: 9 * s,
                    background: ((Math.floor(f / 5) + rr + q) % 4) < 2
                      ? [CLAY, TEAL, GOLD][q % 3] : "#B9C2CC" }} />
                ))}
              </div>
              {/* the light its screen throws back onto him */}
              {lit && (
                <div style={{ position: "absolute", left: x - 78 * s, top: yb - 156 * s,
                  width: 130 * s, height: 96 * s, zIndex: zb - 1,
                  background: `radial-gradient(ellipse at 50% 100%, ${hexa("#CFE4F2", 0.3)}, rgba(0,0,0,0) 70%)` }} />
              )}
            </React.Fragment>
          );
        });
      })}
      {/* the far end, glowing, so the hall does not simply stop */}
      <div style={{ position: "absolute", left: 506 - 70, top: VY - 90, width: 140, height: 180,
        background: `radial-gradient(ellipse at 50% 50%, ${hexa("#FFF3C8", 0.7)}, rgba(0,0,0,0) 72%)` }} />
      {/* ⭐ AND PEOPLE MOVING THROUGH IT AT THREE DEPTHS — the depth is proven by
          things travelling through it, and it is what stops the hall being a
          photograph of a room. */}
      <Crew f={f} x={140 + ((f * 11) % 800)} y={VY + 206} i={41 + seed} size={120} z={26}
        at={0} loop={0} />
      <Crew f={f} x={880 - ((f * 14) % 840)} y={VY + 292} i={53 + seed} size={186} z={31}
        at={0} loop={0} flip />
      <Crew f={f} x={-60 + ((f * 19) % 1140)} y={VY + 430} i={61 + seed} size={286} z={36}
        at={0} loop={0} />
      {/* a cart of work being wheeled down the aisle */}
      <div style={{ position: "absolute", left: 300 + ((f * 13) % 520), top: VY + 236,
        width: 116, height: 60, zIndex: 29,
        background: "linear-gradient(178deg,#8E9AA8,#4A545F)", border: "5px solid #0A0E14",
        boxSizing: "border-box" }}>
        {[0, 1, 2].map((q) => (
          <div key={q} style={{ position: "absolute", left: 8, right: 8, top: 6 + q * 15,
            height: 11, background: q % 2 ? "#F8F5EC" : "#EAE2CE" }} />
        ))}
      </div>
    </div>
  );
};
