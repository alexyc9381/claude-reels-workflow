import React from "react";
import { Img, staticFile } from "remotion";
import { Mascot } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh, ui, mono,
  CLAY, GOLD, GREEN, RED, SKY, TEAL, CYAN, VIOLET, PAPER, INK,
  R, ROLE_C, LANES, RANKS, RANK_TINT, Agent, costumeFor, StarGlyph, Ring, Puff,
  squash, rock,
} from "./FlwWorld";

/* ===========================================================================
   REEL 110 "FLOW" · THE PROPS.  Board: storyboards/110-flow.md.

   ⛔⛔ EVERY PROP HERE IS THE SUBJECT'S OWN OBJECT, not a metaphor for it. Point
      at each one and say what it IS: a task ticket is a task, a bench is where an
      agent works, the core is the vector memory, a star is a star, and the sixty
      bodies are the sixty agents. Nothing needs translating
      ([[feedback_real_marks_are_the_props]]).

   ⛔ OBJECT SIZE FLOOR: >= ~40px on the SHORT side, or it vanishes in the motion
      audit's 1012 -> 240 downsample and in a phone thumbnail. A 7px bar animated
      inside a rung bought 0.03; moving the whole 340x53 rung fixed it.

   ⛔ NOTHING LANDS AND STOPS. An arrival gets a squash, a recoil, a puff and a
      ring, and a landed object ROCKS on a damped oscillation that never quite
      settles.

   ⛔ CONTAINERS ARE BANNED. A box with a label on it carries one bit for two
      seconds. Every station below performs its own VERB: the planner pins a
      route, the coder fills lines, the tester stamps a column (and fails one
      first), the security agent sweeps and clamps.
   ========================================================================= */

/* =========================================================================
   THE SWARM — sixty Claudes in five receding ranks. 5+8+12+16+19 = 60.
   ⛔ Pitch is computed BEFORE count (`spacing >= 0.85 * (rA + rB)`): the front
      rank is the readable cast at ~190px pitch; every rank behind is smaller,
      dimmer and higher, so sixty reads as a CROWD and not a texture.
   ====================================================================== */
export const SwarmRanks: React.FC<{ f: number; land: number[]; lvl?: number; z?: number;
  base?: number }> = ({ f, land, lvl = 0, z = 40, base = 0 }) => {
  let idx = base;
  return (<>
    {RANKS.map(([n, y, sc, op], r) => {
      const at = land[r] ?? 0;
      const k = E(f, at, at + 8, 0, 1, OUT);             /* ⛔ 8-frame arrival */
      const drop = (1 - k) * 220;
      const sq = squash(f, at + 6, 0.22, 3, 11);
      const pitch = (1012 - 120) / (n + 1);
      const rows = (<React.Fragment key={"rk" + r}>
        {Array.from({ length: n }, (_, i) => {
          const gi = idx + i;
          const size = 150 * sc;
          return (
            <div key={"a" + r + i} style={{ position: "absolute", inset: 0, zIndex: z + r,
              transform: `translateY(${drop}px) scaleY(${sq})`, transformOrigin: "50% 100%",
              opacity: k * op }}>
              <Agent f={f} i={gi} x={60 + pitch * (i + 1)} y={y} size={size}
                z={z + r} o={1} lvl={r === 4 ? lvl : 0} tint={RANK_TINT[r]} />
            </div>
          );
        })}
        {/* the arrival COSTS something — a ring and a puff per rank */}
        {k > 0 && k < 1 && (
          <Ring x={506} y={y} f={f} at={at + 6} c="#CFE9EE" z={z + r + 1}
            max={420 * sc} dur={16} />
        )}
        <Puff x={506} y={y} f={f} at={at + 6} c="#9FD4DE" z={z + r + 1} n={9} s={1.4 * sc} />
      </React.Fragment>);
      idx += n;
      return rows;
    })}
  </>);
};

/* =========================================================================
   THE DESK — the terminal, the queue, and the hero's own workstation.
   ====================================================================== */

/** the terminal running Claude Code, with the real command typed into it */
export const Terminal: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  typed?: number; run?: boolean; lines?: number }> =
  ({ x, y, f, s = 1, z = 46, typed = 0, run = false, lines = 0 }) => {
  const CMD = R.cmd;
  const shown = CMD.slice(0, Math.round(typed * CMD.length));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the monitor body */}
      <div style={{ width: 348 * s, height: 236 * s, borderRadius: 8 * s,
        background: "#1A1F2B", border: `${6 * s}px solid #2E3646`, boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 10 * s, top: 10 * s, right: 10 * s,
          height: 22 * s, background: "#232A38", borderRadius: 4 * s }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 8 * s + i * 16 * s, top: 7 * s,
              width: 9 * s, height: 9 * s, borderRadius: "50%",
              background: ["#C4574A", "#D9A44C", "#6FA86F"][i] ?? "#4A5364" }} />
          ))}
        </div>
        {/* the prompt line */}
        <div style={{ position: "absolute", left: 16 * s, top: 46 * s, ...mono(20 * s),
          color: "#8FD1A8", whiteSpace: "nowrap" }}>
          {"$ "}<span style={{ color: "#F2EEE4" }}>{shown}</span>
          {typed > 0 && typed < 1 && Math.floor(f / 4) % 2 === 0 && (
            <span style={{ color: "#F2EEE4" }}>_</span>)}
        </div>
        {/* the output lines that arrive once it runs — real content changing */}
        {Array.from({ length: Math.min(6, lines) }, (_, i) => (
          <div key={"ol" + i} style={{ position: "absolute", left: 16 * s, top: (78 + i * 24) * s,
            width: (60 + ((i * 53) % 200)) * s, height: 13 * s, borderRadius: 2 * s,
            background: hexa(i % 3 === 0 ? "#6FD3D8" : "#E8E4DA", 0.34 + (i % 2) * 0.20) }} />
        ))}
        {run && (
          <div style={{ position: "absolute", right: 14 * s, bottom: 12 * s, width: 74 * s,
            height: 20 * s, borderRadius: 4 * s, background: "#2A4A3A",
            border: `${2 * s}px solid #4E8E6E` }}>
            <div style={{ position: "absolute", left: 3 * s, top: 3 * s, bottom: 3 * s,
              width: `${28 + ((f * 3) % 62)}%`, background: "#8FD1A8", borderRadius: 2 * s }} />
          </div>
        )}
      </div>
      {/* the stand */}
      <div style={{ position: "absolute", left: 140 * s, top: 236 * s, width: 68 * s,
        height: 38 * s, background: "#2E3646" }} />
      <div style={{ position: "absolute", left: 96 * s, top: 272 * s, width: 156 * s,
        height: 14 * s, borderRadius: 4 * s, background: "#394254" }} />
    </div>
  );
};

/** one task ticket — the reel's unit of work, used in the queue, the benches
    and the router. ⛔ 96x62 at s=1, so it clears the 40px floor at any scale
    the reel uses it. */
export const Ticket: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string;
  rot?: number; hot?: boolean; o?: number }> =
  ({ x, y, s = 1, z = 50, c = "#E8E4DA", rot = 0, hot = false, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    width: 96 * s, height: 62 * s, borderRadius: 5 * s,
    background: c, border: `${3 * s}px solid ${dkh(c, 0.26)}`,
    transform: `rotate(${rot}deg)`, boxShadow: SH }}>
    <div style={{ position: "absolute", left: 8 * s, top: 8 * s, width: 52 * s, height: 8 * s,
      borderRadius: 2 * s, background: dkh(c, 0.42) }} />
    <div style={{ position: "absolute", left: 8 * s, top: 24 * s, width: 74 * s, height: 6 * s,
      borderRadius: 2 * s, background: dkh(c, 0.20) }} />
    <div style={{ position: "absolute", left: 8 * s, top: 36 * s, width: 44 * s, height: 6 * s,
      borderRadius: 2 * s, background: dkh(c, 0.20) }} />
    {hot && (
      <div style={{ position: "absolute", right: 7 * s, bottom: 7 * s, width: 20 * s,
        height: 20 * s, borderRadius: 3 * s, background: "#C44A3A" }} />
    )}
  </div>
);

/** the backlog — a stack of tickets taller than the hero. The villain's cause.
    `n` falls to zero at S7, which is the payoff you can SEE. */
export const TicketStack: React.FC<{ x: number; y: number; f: number; n: number; s?: number;
  z?: number; lift?: number[]; jolt?: number }> = ({ x, y, f, n, s = 1, z = 44, lift, jolt = 0 }) => (<>
    {/* the spike the stack is impaled on — so an EMPTY spike still reads */}
    <div style={{ position: "absolute", left: x + 44 * s, top: y - 470 * s, width: 10 * s,
      height: 490 * s, background: "#7A6E58", zIndex: z - 1 }} />
    <div style={{ position: "absolute", left: x + 8 * s, top: y + 14 * s, width: 84 * s,
      height: 16 * s, borderRadius: 4 * s, background: "#5E5646", zIndex: z - 1 }} />
    {Array.from({ length: n }, (_, i) => {
      const up = lift && lift[i] !== undefined
        ? E(f, lift[i], lift[i] + 16, 0, 1, IN_Q) : 0;
      if (up >= 1) return null;
      /* ⭐ NOTHING IN A REEL JUST STANDS THROUGH AN EVENT. On the hook's burst the
         whole stack rocks on a damped oscillation, hardest at the top, and each
         sheet kicks by a different amount — so the queue is a thing that got HIT
         rather than scenery that happens to be nearby. */
      const rk = jolt * Math.sin((f - jolt * 0) / 3.1 + i * 0.5) * Math.exp(-i * -0.02);
      return (
        <Ticket key={"tk" + i} x={x + (rnd(i, 2) - 0.5) * 18 * s + rk * (2 + i * 0.9)}
          y={y - i * 34 * s - up * 420 * s} s={s} z={z + i}
          c={i % 4 === 0 ? "#DCD6C6" : "#E8E4DA"}
          rot={(rnd(i, 5) - 0.5) * 7 + rk * (0.6 + i * 0.28)}
          hot={i % 5 === 2} o={1 - up} />
      );
    })}
  </>);

/* =========================================================================
   S2 — THE NAME. Letter blocks that LAND, not a fade-in.
   ⛔ A gentle arrival is not an event. Each block drops in 6 frames with a
      squash and a recoil; the sign's own lamps strike on behind them.
   ====================================================================== */
export const NameSign: React.FC<{ x: number; y: number; f: number; at: number[]; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 60 }) => {
  const L = "RUFLO".split("");
  const BW = 128 * s, BH = 156 * s, GAP = 12 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the sign carcass — a real steel box the letters seat into */}
      <div style={{ position: "absolute", left: -20 * s, top: -20 * s,
        width: L.length * (BW + GAP) + 28 * s, height: BH + 40 * s, borderRadius: 8 * s,
        background: "#2E2444", border: `${5 * s}px solid #4E3C72`, boxShadow: SH_D }} />
      {L.map((ch, i) => {
        const a = at[i] ?? 0;
        const k = E(f, a, a + 6, 0, 1, OUT);
        const sq = squash(f, a + 5, 0.26, 3, 12);
        return (
          <div key={"ln" + i} style={{ position: "absolute", left: i * (BW + GAP),
            top: (1 - k) * -300 * s, width: BW, height: BH, borderRadius: 6 * s,
            background: k > 0.9 ? "#F9E4B4" : "#8E7A4E",
            border: `${4 * s}px solid #C9A45C`, opacity: k,
            transform: `scaleY(${sq})`, transformOrigin: "50% 100%",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...ui(96 * s, 900), color: "#2A1F0E", lineHeight: 1 }}>{ch}</span>
          </div>
        );
      })}
      {/* the marquee bulbs along the top, striking on with the letters */}
      {Array.from({ length: 14 }, (_, i) => {
        const on = f > (at[Math.min(4, Math.floor(i / 3))] ?? 0) + 4;
        return (
          <div key={"mb" + i} style={{ position: "absolute", left: -8 * s + i * 46 * s,
            top: -36 * s, width: 20 * s, height: 20 * s, borderRadius: "50%",
            background: on ? "#FFE9BC" : "#4E3C72" }} />
        );
      })}
    </div>
  );
};

/** the command plate under the sign — the one thing a viewer can act on */
export const CmdPlate: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 62 }) => {
  const k = E(f, at, at + 26, 0, 1, LIN);
  const shown = R.cmd.slice(0, Math.round(k * R.cmd.length));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      padding: `${12 * s}px ${22 * s}px`, borderRadius: 10 * s, background: "#12161F",
      border: `${3 * s}px solid #4E3C72`, boxShadow: SH }}>
      <span style={{ ...mono(34 * s), color: "#8FD1A8" }}>{"$ "}</span>
      <span style={{ ...mono(34 * s), color: "#F2EEE4" }}>{shown}</span>
      {k < 1 && Math.floor(f / 4) % 2 === 0 && (
        <span style={{ ...mono(34 * s), color: "#F2EEE4" }}>_</span>)}
    </div>
  );
};

/* =========================================================================
   S3 — THE FOUR BENCHES. Each one PERFORMS its verb.
   ⛔ The §3 test: write the VO line beside the shot and ask what the picture
      ADDS. "One agent handles planning" + a labelled box = a container. A
      planner PINNING A ROUTE, one card at a time, with the line drawing itself
      between them, is the verb the sentence actually uses.
   ====================================================================== */

/** the shared bench carcass — a real workbench with a top, legs and a shadow */
export const Bench: React.FC<{ x: number; y: number; w: number; c: string; s?: number;
  z?: number; on?: number; children?: React.ReactNode }> =
  ({ x, y, w, c, s = 1, z = 30, on = 0, children }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the lamp over it, which SNAPS on when the bench activates */}
    <div style={{ position: "absolute", left: w / 2 - 46 * s, top: -300 * s, width: 92 * s,
      height: 24 * s, borderRadius: 4 * s, background: "#4A3A24" }} />
    <div style={{ position: "absolute", left: w / 2 - 36 * s, top: -278 * s, width: 72 * s,
      height: 12 * s, borderRadius: 4 * s, background: on > 0.5 ? "#F9E4B4" : "#3A2E1C" }} />
    {on > 0.5 && (
      <div style={{ position: "absolute", left: w / 2 - 130 * s, top: -268 * s, width: 260 * s,
        height: 300 * s, zIndex: -1,
        background: `linear-gradient(180deg, ${hexa(c, 0.26)} 0%, ${hexa(c, 0)} 100%)`,
        clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
    )}
    {children}
    {/* the top */}
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 22 * s,
      borderRadius: 3 * s, background: on > 0.5 ? mxh(c, 0.16) : "#6B4C2E",
      border: `${3 * s}px solid ${dkh(c, 0.40)}` }} />
    {/* the legs */}
    {[10 * s, w - 34 * s].map((lx, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: lx, top: 22 * s, width: 24 * s,
        height: 104 * s, background: "#4A331C" }} />
    ))}
    <div style={{ position: "absolute", left: -8 * s, top: 124 * s, width: w + 16 * s,
      height: 14 * s, background: "rgba(20,12,4,0.34)", borderRadius: 6 * s }} />
  </div>
);

/** PLAN — cards pinned across a board, with the route line drawing itself */
export const PlanBoard: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 40 }) => {
  const N = 5;
  const PT: Array<[number, number]> = [[10, 96], [72, 34], [140, 84], [206, 22], [268, 66]];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, width: 372 * s, height: 190 * s }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s,
        background: dkh(ROLE_C[0], 0.60), border: `${4 * s}px solid ${dkh(ROLE_C[0], 0.38)}` }} />
      {/* the route line, drawn segment by segment as each card lands */}
      {PT.slice(1).map(([px, py], i) => {
        const a = at + 8 + (i + 1) * 9;
        const k = E(f, a, a + 8, 0, 1, OUT);
        const [qx, qy] = PT[i];
        const dx = px - qx, dy = py - qy;
        const len = Math.hypot(dx, dy);
        return (
          <div key={"rt" + i} style={{ position: "absolute",
            left: (qx + 30) * s, top: (qy + 24) * s, width: len * k * s, height: 6 * s,
            background: ROLE_C[0], transformOrigin: "0% 50%",
            transform: `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`, zIndex: 2 }} />
        );
      })}
      {PT.map(([px, py], i) => {
        const a = at + 8 + i * 9;
        const k = E(f, a, a + 7, 0, 1, BACK);
        if (k <= 0) return null;
        return (
          <div key={"pc" + i} style={{ position: "absolute", left: px * s, top: py * s,
            width: 60 * s, height: 48 * s, borderRadius: 4 * s, background: "#F2EEE4",
            border: `${3 * s}px solid ${ROLE_C[0]}`, zIndex: 3,
            transform: `scale(${k}) rotate(${(rnd(i, 4) - 0.5) * 8}deg)` }}>
            <div style={{ position: "absolute", left: 7 * s, top: 9 * s, width: 34 * s,
              height: 6 * s, background: dkh(ROLE_C[0], 0.20) }} />
            <div style={{ position: "absolute", left: 7 * s, top: 22 * s, width: 44 * s,
              height: 5 * s, background: "#C4BEB0" }} />
          </div>
        );
      })}
    </div>
  );
};

/** CODE — an editor pane that FILLS line by line, hammered in one at a time */
export const CodePane: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; rate?: number }> = ({ x, y, f, at, s = 1, z = 40, rate = 6 }) => {
  const N = 11;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, width: 372 * s,
      height: 190 * s, borderRadius: 5 * s, background: "#131A26",
      border: `${4 * s}px solid ${dkh(ROLE_C[1], 0.34)}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 34 * s, bottom: 0,
        background: "#0D1420" }} />
      {Array.from({ length: N }, (_, i) => {
        const a = at + 6 + i * rate;
        const k = E(f, a, a + 4, 0, 1, OUT);
        if (k <= 0) return null;
        const wdt = (54 + ((i * 61) % 250)) * s;
        return (
          <React.Fragment key={"cl" + i}>
            <div style={{ position: "absolute", left: 10 * s, top: (12 + i * 16) * s,
              width: 14 * s, height: 8 * s, background: "#2E3E56" }} />
            <div style={{ position: "absolute", left: 44 * s, top: (12 + i * 16) * s,
              width: wdt * k, height: 9 * s, borderRadius: 2 * s,
              background: i % 3 === 0 ? ROLE_C[1] : hexa("#CFE0F2", 0.44) }} />
          </React.Fragment>
        );
      })}
      {/* the caret, always alive */}
      <div style={{ position: "absolute",
        left: 44 * s + ((54 + ((Math.min(N - 1, Math.floor((f - at - 6) / rate)) * 61) % 250)) * s),
        top: (12 + Math.min(N - 1, Math.max(0, Math.floor((f - at - 6) / rate))) * 16) * s,
        width: 4 * s, height: 12 * s,
        background: Math.floor(f / 4) % 2 ? ROLE_C[1] : "transparent" }} />
    </div>
  );
};

/** TEST — a column of stamps. ⭐ One FAILS RED first, then goes green: a test
    that only ever passes is not legible as a test. */
export const TestRig: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 40 }) => {
  const N = 8, FAILS = 4;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, width: 372 * s,
      height: 190 * s, borderRadius: 5 * s, background: dkh(ROLE_C[2], 0.64),
      border: `${4 * s}px solid ${dkh(ROLE_C[2], 0.40)}` }}>
      {Array.from({ length: N }, (_, i) => {
        const cx = i % 4, cy = Math.floor(i / 4);
        const a = at + 8 + i * 7;
        const k = E(f, a, a + 5, 0, 1, BACK);
        if (k <= 0) return null;
        const failing = i === FAILS && f < at + 8 + N * 7 + 12;
        return (
          <div key={"ts" + i} style={{ position: "absolute", left: (14 + cx * 88) * s,
            top: (18 + cy * 84) * s, width: 76 * s, height: 66 * s, borderRadius: 5 * s,
            background: failing ? "#C44A3A" : ROLE_C[2],
            border: `${3 * s}px solid ${failing ? "#8E3320" : dkh(ROLE_C[2], 0.34)}`,
            transform: `scale(${k})` }}>
            {failing ? (<>
              <div style={{ position: "absolute", left: 20 * s, top: 30 * s, width: 36 * s,
                height: 7 * s, background: "#F7EDEA", transform: "rotate(45deg)" }} />
              <div style={{ position: "absolute", left: 20 * s, top: 30 * s, width: 36 * s,
                height: 7 * s, background: "#F7EDEA", transform: "rotate(-45deg)" }} />
            </>) : (<>
              <div style={{ position: "absolute", left: 16 * s, top: 34 * s, width: 20 * s,
                height: 7 * s, background: "#123A24", transform: "rotate(48deg)",
                transformOrigin: "0% 50%" }} />
              <div style={{ position: "absolute", left: 27 * s, top: 46 * s, width: 34 * s,
                height: 7 * s, background: "#123A24", transform: "rotate(-46deg)",
                transformOrigin: "0% 50%" }} />
            </>)}
          </div>
        );
      })}
    </div>
  );
};

/** SECURITY — a lamp sweeps the pane; two findings flare and get CLAMPED shut */
export const SecuritySweep: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 40 }) => {
  const sweep = ((f - at) * 5) % 372;
  const FIND: Array<[number, number, number]> = [[92, 44, 20], [232, 118, 34]];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, width: 372 * s,
      height: 190 * s, borderRadius: 5 * s, background: dkh(ROLE_C[3], 0.66),
      border: `${4 * s}px solid ${dkh(ROLE_C[3], 0.40)}`, overflow: "hidden" }}>
      {/* the code under inspection */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: 16 * s, top: (14 + i * 17) * s,
          width: (60 + ((i * 71) % 250)) * s, height: 8 * s, borderRadius: 2 * s,
          background: hexa("#F0D8E2", 0.24) }} />
      ))}
      {/* the sweep — a bright band AND its shadow edge, full height */}
      {f > at && (<>
        <div style={{ position: "absolute", left: sweep * s - 26 * s, top: 0, bottom: 0,
          width: 52 * s, background: hexa("#F7E4EC", 0.30), zIndex: 3 }} />
        <div style={{ position: "absolute", left: sweep * s + 26 * s, top: 0, bottom: 0,
          width: 30 * s, background: "rgba(8,4,10,0.34)", zIndex: 3 }} />
      </>)}
      {FIND.map(([fx, fy, delay], i) => {
        const a = at + delay;
        const flare = E(f, a, a + 6, 0, 1, OUT) * (1 - E(f, a + 16, a + 26, 0, 1, OUT));
        const clamped = f > a + 20;
        return (
          <div key={"fd" + i} style={{ position: "absolute", left: fx * s, top: fy * s,
            width: 84 * s, height: 34 * s, borderRadius: 4 * s, zIndex: 4,
            background: clamped ? "#3F7E5E" : hexa("#C44A3A", 0.35 + flare * 0.65),
            border: `${3 * s}px solid ${clamped ? "#8FD1A8" : "#E4643F"}`,
            transform: `scaleX(${clamped ? 0.72 : 1})`, transformOrigin: "50% 50%" }} />
        );
      })}
    </div>
  );
};

/** the lit ticket that travels bench to bench — ONE job through four hands */
export const Handoff: React.FC<{ f: number; at: number[]; xs: number[]; y: number; s?: number;
  z?: number }> = ({ f, at, xs, y, s = 1, z = 72 }) => {
  let seg = -1;
  for (let i = 0; i < at.length - 1; i++) if (f >= at[i]) seg = i;
  if (seg < 0) return null;
  const a = at[seg], b = at[seg + 1] ?? a + 30;
  const k = E(f, a, Math.min(b, a + 18), 0, 1, IO);
  const x = xs[seg] + (xs[Math.min(seg + 1, xs.length - 1)] - xs[seg]) * k;
  const arc = -Math.sin(k * Math.PI) * 110 * s;
  return (<>
    <Ticket x={x} y={y + arc} s={1.5 * s} z={z} c="#F9E4B4" rot={k * 26 - 13} hot />
    <Ring x={x + 72 * s} y={y + 46 * s} f={f} at={a} c="#F9E4B4" z={z - 1} max={150} dur={14} />
  </>);
};

/* =========================================================================
   S4 — THE MEMORY CORE, THE CABLES AND THE LEARNING LOOP.
   ====================================================================== */

/** the shared vector core — a real hexagonal machine with a spinning index */
export const MemoryCore: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  spin?: number }> = ({ x, y, f, s = 1, z = 50, spin = 1 }) => {
  const rot = (f * 1.7 * spin) % 360;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the plinth */}
      <div style={{ position: "absolute", left: -34 * s, top: 214 * s, width: 296 * s,
        height: 40 * s, borderRadius: 8 * s, background: "#16202E",
        border: `${4 * s}px solid #223148` }} />
      {/* the hex body */}
      <div style={{ width: 228 * s, height: 228 * s, background: "#0E1826",
        border: `${6 * s}px solid #2A4360`,
        clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }} />
      {/* the index rings — three counter-rotating bands, all above 40px */}
      {[0, 1, 2].map((i) => (
        <div key={"ir" + i} style={{ position: "absolute",
          left: (30 + i * 22) * s, top: (30 + i * 22) * s,
          width: (168 - i * 44) * s, height: (168 - i * 44) * s, borderRadius: "50%",
          border: `${7 * s}px solid ${hexa(CYAN, 0.30 + i * 0.18)}`,
          borderTopColor: "transparent", borderRightColor: i === 1 ? "transparent" : undefined,
          transform: `rotate(${i % 2 ? -rot * (1 + i * 0.4) : rot * (1 + i * 0.3)}deg)` }} />
      ))}
      {/* the lit face — the only light source in the darkest set in the reel */}
      <div style={{ position: "absolute", left: 84 * s, top: 84 * s, width: 60 * s,
        height: 60 * s, borderRadius: 8 * s, background: "#8FEAEE",
        transform: `rotate(${rot * 0.6}deg)` }} />
    </div>
  );
};

/** the sixty cable runs converging on the core, with payload beads travelling
    BOTH WAYS. ⛔⛔ Light-only bands lift the black point — every bright bead is
    followed by a dark one so each boundary is light-against-shadow. */
export const CableFan: React.FC<{ f: number; cx: number; cy: number; n?: number; z?: number;
  rate?: number }> = ({ f, cx, cy, n = 12, z = 34, rate = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const sx = 20 + i * (972 / (n - 1));
      const sy = i % 2 ? 700 : 232;
      const dx = cx - sx, dy = cy - sy;
      const len = Math.hypot(dx, dy);
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      return (
        <React.Fragment key={"cb" + i}>
          <div style={{ position: "absolute", left: sx, top: sy, width: len, height: 9,
            background: hexa("#2A4360", 0.72), transformOrigin: "0% 50%",
            transform: `rotate(${ang}deg)`, zIndex: z }} />
          {/* four beads per cable, alternating bright and dark, both directions */}
          {Array.from({ length: 4 }, (_, j) => {
            const dir = (i + j) % 2 ? 1 : -1;
            const ph = (((f * (2.6 + (i % 3) * 0.5) * rate) + j * 34 + i * 13) % 132) / 132;
            const p = dir > 0 ? ph : 1 - ph;
            const bright = (i + j) % 2 === 0;
            return (
              <div key={"bd" + j} style={{ position: "absolute",
                left: sx + dx * p - 21, top: sy + dy * p - 21,
                width: 42, height: 42, borderRadius: 8, zIndex: z + 1,
                background: bright ? hexa("#8FEAEE", 0.86) : "rgba(5,9,16,0.86)" }} />
            );
          })}
        </React.Fragment>
      );
    })}
  </>);

/** ⭐ THE LEARNING LOOP — the README's own architecture arrow, made physical.
    A lit tag ejects from the core, climbs the overhead rail across the FULL
    panel width, and drops back into the queue upstream. That full-width travel
    is the shape the motion audit rewards most. */
export const LoopTag: React.FC<{ f: number; at: number; y?: number; z?: number;
  dur?: number }> = ({ f, at, y = 140, z = 76, dur = 54 }) => {
  const k = E(f, at, at + dur, 0, 1, IO);
  if (k <= 0) return null;
  const rise = E(f, at, at + 10, 0, 1, OUT);
  const x = 900 - k * 830;
  const drop = k > 0.9 ? (k - 0.9) * 10 * 300 : 0;
  return (<>
    <div style={{ position: "absolute", left: x, top: y - 40 + (1 - rise) * 300 + drop,
      width: 122, height: 74, borderRadius: 8, zIndex: z,
      background: "#8FD1A8", border: "4px solid #3F7E5E",
      transform: `rotate(${Math.sin(f / 6) * 7}deg)` }}>
      <div style={{ position: "absolute", left: 12, top: 14, width: 62, height: 10,
        borderRadius: 3, background: "#1E4A34" }} />
      <div style={{ position: "absolute", left: 12, top: 34, width: 88, height: 8,
        borderRadius: 3, background: hexa("#1E4A34", 0.55) }} />
      <div style={{ position: "absolute", left: 12, top: 50, width: 44, height: 8,
        borderRadius: 3, background: hexa("#1E4A34", 0.55) }} />
    </div>
    {/* the hanger it rides on, so it is ON the rail and not floating */}
    <div style={{ position: "absolute", left: x + 52, top: y - 82 + (1 - rise) * 300,
      width: 10, height: 46, background: "#4E6684", zIndex: z - 1 }} />
  </>);
};

/* =========================================================================
   S6 — THE ROUTER. The PEAK.
   ⭐ The shape that measures above bar is MANY LARGE OBJECTS ARRIVING
      CONTINUOUSLY, and that is exactly what routing looks like: a stream that
      never stops, sorted into two lanes with different colour AND value.
   ⛔⛔ NO PERCENTAGE. The ratio is DEPICTED — the free lane is thick with
      traffic and the frontier lane passes four items in the whole scene.
   ====================================================================== */

/** the switch blade overhead, throwing left/right on each arrival */
export const SwitchBlade: React.FC<{ x: number; y: number; f: number; throwsAt: number[];
  dirs: number[]; s?: number; z?: number }> = ({ x, y, f, throwsAt, dirs, s = 1, z = 66 }) => {
  let i = 0;
  for (let j = 0; j < throwsAt.length; j++) if (f >= throwsAt[j]) i = j;
  const d = dirs[i] ?? 0;
  const k = E(f, throwsAt[i] ?? 0, (throwsAt[i] ?? 0) + 5, 0, 1, OUT);
  const ang = (d ? 34 : -8) * k + (dirs[i - 1] ? 34 : -8) * (1 - k);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the pivot housing */}
      <div style={{ position: "absolute", left: -34 * s, top: -34 * s, width: 88 * s,
        height: 88 * s, borderRadius: 10 * s, background: "#2E4356",
        border: `${5 * s}px solid #456A82` }} />
      {/* the blade — 240x30, well over the 40px floor on the short side once
          rotated through its arc */}
      <div style={{ position: "absolute", left: 0, top: -18 * s, width: 250 * s, height: 36 * s,
        borderRadius: 6 * s, background: d ? "#E7B24C" : "#6FD3D8",
        border: `${4 * s}px solid ${d ? "#8E6A22" : "#2E7E84"}`,
        transformOrigin: "8% 50%", transform: `rotate(${ang}deg)` }} />
      <div style={{ position: "absolute", left: -12 * s, top: -12 * s, width: 44 * s,
        height: 44 * s, borderRadius: "50%", background: "#8FA8BC" }} />
    </div>
  );
};

/** one lane gate, carrying its REAL provider mark on a white tile */
export const LaneGate: React.FC<{ x: number; y: number; i: number; f: number; s?: number;
  z?: number; count?: number }> = ({ x, y, i, f, s = 1, z = 70, count = 0 }) => {
  const L = LANES[i];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the gate frame */}
      <div style={{ position: "absolute", left: -12 * s, top: -12 * s, width: 190 * s,
        height: 234 * s, borderRadius: 8 * s, background: dkh(L.c, 0.52),
        border: `${6 * s}px solid ${L.c}` }} />
      {/* the mouth the work goes into — a real opening, so a ticket ARRIVES */}
      <div style={{ position: "absolute", left: -46 * s, top: 26 * s, width: 46 * s,
        height: 128 * s, background: dkh(L.c, 0.74),
        border: `${5 * s}px solid ${L.c}`, borderRight: "none" }} />
      <div style={{ position: "absolute", left: 20 * s, top: 12 * s }}>
        <div style={{ width: 108 * s, height: 108 * s, borderRadius: 16 * s,
          background: "#FFFFFF", border: `${3 * s}px solid #E8DCC0`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(L.logo)}
            style={{ width: 70 * s, height: 70 * s, objectFit: "contain" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, top: 132 * s, width: 148 * s,
        textAlign: "center", ...mono(20 * s), color: "#F2EEE4" }}>{L.t}</div>
      {/* the tally: real tickets stacking, so the RATIO is depicted not stated */}
      {Array.from({ length: Math.min(9, count) }, (_, j) => (
        <div key={"tl" + j} style={{ position: "absolute", left: (6 + (j % 3) * 48) * s,
          top: (176 - Math.floor(j / 3) * 22) * s, width: 42 * s, height: 18 * s,
          borderRadius: 3 * s, background: L.c, border: `${2 * s}px solid ${dkh(L.c, 0.34)}` }} />
      ))}
    </div>
  );
};

/** ⭐⭐ THE LANE FLOW — the PEAK's whole shape.

    ⛔ v1 dropped each ticket on a short arc from the panel centre and let it
    stop. That is an arrival, not a flow: nothing crossed the frame, the two
    lanes never filled, and the RATIO the scene exists to show was invisible.

    v2 is what routing actually looks like. Every ticket does three things:
      A  falls into the switch at the LEFT (10 frames)
      B  travels the FULL panel width along its lane (34 frames) — the single
         shape the motion audit rewards most, and there are always 4-6 of them
         in flight at once
      C  is taken by the gate at the right, which tallies it
    The free lane runs FAST and THICK; the frontier lane runs SLOW and carries
    four heavy items in the whole scene. ⛔ The ratio is DEPICTED, never stated —
    there is no percentage anywhere, because the VO's figure is unsourced. */
export const LANE_Y = [392, 566] as const;      /* ticket top per lane;
    bed tops are 470 and 682, and a ticket is 78px (free) / 115px (frontier) tall,
    so each one lands with its base ON the belt rather than floating over it */
export const SWITCH_XY = [124, 292] as const;

export const LaneFlow: React.FC<{ f: number; at: number[]; dirs: number[]; z?: number }> =
  ({ f, at, dirs, z = 60 }) => (<>
    {at.map((a, i) => {
      const d = dirs[i];
      const fall = E(f, a, a + 10, 0, 1, IN_Q);
      const run = E(f, a + 10, a + 10 + (d ? 42 : 34), 0, 1, LIN);
      if (fall <= 0 || run >= 1) return null;
      const x = run <= 0
        ? SWITCH_XY[0] - 74 + fall * 30
        : SWITCH_XY[0] - 44 + run * 690;
      const y = run <= 0
        ? -90 + fall * (SWITCH_XY[1] + 90)
        : SWITCH_XY[1] + (LANE_Y[d] - SWITCH_XY[1]) * Math.min(1, run * 3.4);
      const sc = d ? 1.85 : 1.25;
      /* a landed object never simply travels: it rocks on its own clock */
      const rot = (d ? 4 : 7) * Math.sin((f + i * 9) / (d ? 13 : 8));
      return (
        <React.Fragment key={"lf" + i}>
          <Ticket x={x} y={y} s={sc} z={z + (d ? 4 : 0)}
            c={d ? "#F2CE84" : "#B8E6E8"} rot={rot} hot={!!d} />
          {/* the contact shadow on the lane bed — it is ON the belt, not over it */}
          <div style={{ position: "absolute", left: x + 8, top: y + 62 * sc + 8,
            width: 96 * sc - 16, height: 12, borderRadius: 6, zIndex: z - 1,
            background: "rgba(6,12,18,0.34)" }} />
        </React.Fragment>
      );
    })}
  </>);


/* =========================================================================
   S4 — THE MEMORY BANK.  ⛔⛔ THIS SCENE WAS REBUILT FROM ZERO.

   Alex on v1: *"the animation at 12 seconds isn't good enough, I can't really
   tell what that is, it needs to be completely redone to a better concept."*

   He is right and the diagnosis is `docs/ANIMATION-QUALITY.md` §3 in a form the
   doc does not spell out: v1 was a hexagonal core with twelve cable runs and
   beads flying both ways continuously. It MOVED — it measured 13.93 — and it
   depicted **nothing a viewer can name**. A metric that rewards "large bright
   objects travelling" is perfectly happy with abstract lights on wires.

   ⭐ THE REPLACEMENT IS ONE SENTENCE YOU CAN READ WITHOUT NARRATION:
      ONE agent finishes a job and puts what it learned INTO a bank.
      THE SAME THING immediately comes back OUT to the other three.
      All three visibly get better.
      Three times, from three different agents.

   That is "run in parallel, share memory, improve each other" with no decoding
   step, and every object in it is the subject's own: agents, task blocks, and a
   filing bank with labelled slots.
   ====================================================================== */

/** the bank itself — 18 labelled slots, drawn as real drawers with fronts,
    handles and index cards, plus an indexing head that never stops sweeping.
    ⛔ `filled` slots light in their DEPOSITOR's role colour, so the viewer can
    see that what is in the bank came from the agents on the floor. */
export const MemoryBank: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  filled: Array<number | null> }> = ({ x, y, f, s = 1, z = 40, filled }) => {
  const CW = 142 * s, CH = 74 * s, GX = 8 * s, GY = 8 * s;
  const head = ((f * 6) % (6 * (CW + GX)));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the carcass */}
      <div style={{ position: "absolute", left: -16 * s, top: -46 * s,
        width: 6 * (CW + GX) + 26 * s, height: 3 * (CH + GY) + 74 * s, borderRadius: 8 * s,
        background: "#141E2E", border: `${5 * s}px solid #2E4360`, boxShadow: SH_D }} />
      {/* the header rail + the indexing head that sweeps it */}
      <div style={{ position: "absolute", left: -6 * s, top: -34 * s,
        width: 6 * (CW + GX) + 6 * s, height: 20 * s, background: "#0E1826",
        border: `${3 * s}px solid #2E4360` }} />
      {/* ⛔⛔ v1's INDEXING HEAD WAS A 62x24 TAB and the scene measured 8.44, the
          weakest in the reel. The bank is the largest object on screen and none
          of it was changing. The carriage is now FULL HEIGHT and travels the
          whole face continuously, with a DARK trailing edge behind it so every
          boundary is light-against-shadow rather than a wash that lifts the
          black point. That is the highest-value shape the motion table has. */}
      <div style={{ position: "absolute", left: head - 4 * s, top: -38 * s, width: 66 * s,
        height: 3 * (CH + GY) + 52 * s, borderRadius: 4 * s,
        background: hexa(CYAN, 0.30), zIndex: 4 }} />
      <div style={{ position: "absolute", left: head + 62 * s, top: -38 * s, width: 44 * s,
        height: 3 * (CH + GY) + 52 * s, background: "rgba(3,8,14,0.46)", zIndex: 4 }} />
      <div style={{ position: "absolute", left: head - 4 * s, top: -36 * s, width: 66 * s,
        height: 24 * s, borderRadius: 4 * s, background: CYAN, zIndex: 5 }} />
      {Array.from({ length: 18 }, (_, i) => {
        const cx = i % 6, cy = Math.floor(i / 6);
        const c = filled[i];
        const on = c !== null && c !== undefined;
        const col = on ? ROLE_C[c as number] : "#1A2635";
        return (
          <div key={"sl" + i} style={{ position: "absolute", left: cx * (CW + GX),
            top: cy * (CH + GY), width: CW, height: CH, borderRadius: 4 * s,
            background: on ? dkh(col, 0.34) : "#111A28",
            border: `${3 * s}px solid ${on ? col : "#243448"}`, overflow: "hidden" }}>
            {/* the drawer's index card and its handle — real detail, not a tile */}
            <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: CW - 20 * s,
              height: 18 * s, borderRadius: 2 * s,
              background: on ? hexa(col, 0.70) : "#1B2838" }} />
            <div style={{ position: "absolute", left: 10 * s, top: 34 * s, width: (CW - 20 * s) * 0.6,
              height: 9 * s, borderRadius: 2 * s,
              background: on ? hexa(col, 0.40) : "#182434" }} />
            <div style={{ position: "absolute", left: CW / 2 - 26 * s, bottom: 8 * s,
              width: 52 * s, height: 11 * s, borderRadius: 5 * s,
              background: on ? mxh(col, 0.20) : "#243448" }} />
          </div>
        );
      })}
    </div>
  );
};

/** one agent's workstation on the bank floor: a bench, an output bar that grows
    with its level, and a socket the blocks fly in and out of */
export const BankStation: React.FC<{ x: number; y: number; f: number; i: number; lvl: number;
  s?: number; z?: number; hot?: number }> = ({ x, y, f, i, lvl, s = 1, z = 46, hot = 0 }) => {
  const c = ROLE_C[i];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 178 * s, height: 22 * s,
        borderRadius: 3 * s, background: hot > 0.4 ? mxh(c, 0.24) : dkh(c, 0.34),
        border: `${3 * s}px solid ${c}` }} />
      {[8 * s, 148 * s].map((lx, j) => (
        <div key={"lg" + j} style={{ position: "absolute", left: lx, top: 22 * s, width: 22 * s,
          height: 82 * s, background: dkh(c, 0.62) }} />
      ))}
      {/* the output bar — four segments, one per level, so an upgrade is COUNTABLE */}
      {[0, 1, 2, 3].map((j) => (
        <div key={"ob" + j} style={{ position: "absolute", left: 10 * s + j * 42 * s,
          top: -30 * s, width: 34 * s, height: 22 * s, borderRadius: 3 * s,
          background: j < lvl ? c : "#16202E",
          border: `${2 * s}px solid ${j < lvl ? mxh(c, 0.26) : "#243448"}` }} />
      ))}
      <div style={{ position: "absolute", left: -10 * s, top: 108 * s, width: 198 * s,
        height: 14 * s, borderRadius: 7 * s, background: "rgba(4,8,14,0.42)" }} />
    </div>
  );
};

/** a knowledge block in flight. `k` 0..1 along an arc from (x0,y0) to (x1,y1).
    ⛔ 84x62 so it clears the 40px short-side floor at every scale used here. */
export const KnowBlock: React.FC<{ x0: number; y0: number; x1: number; y1: number; k: number;
  c: string; s?: number; z?: number; lift?: number }> =
  ({ x0, y0, x1, y1, k, c, s = 1, z = 72, lift = 150 }) => {
  if (k <= 0 || k >= 1) return null;
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * lift;
  return (
    <div style={{ position: "absolute", left: x - 42 * s, top: y - 31 * s, width: 84 * s,
      height: 62 * s, borderRadius: 6 * s, zIndex: z,
      background: c, border: `${4 * s}px solid ${mxh(c, 0.30)}`,
      transform: `rotate(${k * 300 - 150}deg)` }}>
      <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: 44 * s,
        height: 9 * s, borderRadius: 2 * s, background: dkh(c, 0.44) }} />
      <div style={{ position: "absolute", left: 10 * s, top: 26 * s, width: 62 * s,
        height: 7 * s, borderRadius: 2 * s, background: dkh(c, 0.28) }} />
      <div style={{ position: "absolute", left: 10 * s, top: 39 * s, width: 30 * s,
        height: 7 * s, borderRadius: 2 * s, background: dkh(c, 0.28) }} />
    </div>
  );
};

/* =========================================================================
   S7 — THE THROUGHPUT LINE.  ⛔⛔ THIS SCENE WAS ALSO REBUILT FROM ZERO.

   Alex on v1: *"the animation at 24 seconds needs to have like an actual
   animation concept, not just a bunch of sprites standing around bouncing, it
   actually has to have something going on."*

   Exactly right, and it is the §5 failure one level up: v1 gave eight sprites
   four ACTION LOOPS, which fixed "they just stand there" and still had no
   EVENT — everybody was busy and nothing was happening. An action loop is not
   a scene; it is what a sprite does while the scene happens around it.

   ⭐ THE REPLACEMENT IS A BUCKET BRIGADE, and it pays off the hook directly.
   At S0 one Claude had a queue taller than he was and it only grew. Here the
   work pours in FASTER, and a line of five Claudes passes every ticket hand to
   hand across the whole panel into a DONE bin that fills and overflows. Same
   room, same desk, same subscription — the work simply stops accumulating.
   Throughput IS the payoff, and it is a thing you can watch rather than a state
   you have to be told about.
   ====================================================================== */

/** the five hand-off stations, right to left. ⛔ pitch 176 for 150px bodies
    clears `spacing >= 0.85 * size` (127.5) with margin — the same law the swarm
    ranks obey, applied to a line instead of a crowd. */
export const BRIG_X = [944, 768, 592, 416, 262] as const;
export const BRIG_Y = 566;
/** where the work falls out of the chute, and where it lands in the bin */
export const BRIG_IN: readonly [number, number] = [886, 292];
export const BRIG_BIN: readonly [number, number] = [150, 646];

/** one parcel travelling the line. Each hop is an arc between two stations, so
    the object is always in the air between two bodies rather than sliding. */
export const Brigade: React.FC<{ f: number; at: number[]; hop?: number; z?: number }> =
  ({ f, at, hop = 13, z = 74 }) => (<>
    {at.map((a, i) => {
      const t = f - a;
      if (t < 0) return null;
      const total = hop * (BRIG_X.length - 1) + hop;      /* + the throw into the bin */
      if (t > total + 8) return null;
      const seg = Math.min(BRIG_X.length - 1, Math.floor(t / hop));
      const k = (t - seg * hop) / hop;
      const x0 = seg === 0 ? BRIG_IN[0] : BRIG_X[seg - 1];
      const x1 = seg >= BRIG_X.length ? BRIG_BIN[0] : BRIG_X[seg];
      const y0 = seg === 0 ? BRIG_IN[1] : BRIG_Y - 66;
      const y1 = seg >= BRIG_X.length - 1 ? BRIG_BIN[1] : BRIG_Y - 66;
      const x = x0 + (x1 - x0) * k;
      const y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * (seg === 0 ? 40 : 108);
      return (
        <React.Fragment key={"bp" + i}>
          <Ticket x={x - 62} y={y - 40} s={1.30} z={z + (i % 3)}
            c={i % 4 === 0 ? "#F2CE84" : "#E8E4DA"} rot={(k * 220 - 110) * (i % 2 ? 1 : -1)}
            hot={i % 3 === 0} />
          {/* the contact shadow on the floor, so it is IN the room */}
          <div style={{ position: "absolute", left: x - 52, top: BRIG_Y + 96,
            width: 104, height: 15, borderRadius: 8, zIndex: z - 2,
            background: "rgba(6,10,16,0.30)", opacity: 0.5 + 0.5 * Math.sin(k * Math.PI) }} />
        </React.Fragment>
      );
    })}
  </>);

/** the DONE bin at the left end: it fills, then overflows over its own rim */
export const DoneBin: React.FC<{ x: number; y: number; f: number; n: number; s?: number;
  z?: number }> = ({ x, y, f, n, s = 1, z = 50 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* ⛔ AN EMPTY BIN MUST STILL READ. Reel 108's law, in a different room: v1
        painted this crate `#4E4430` and on a dark floor it was a hole rather than
        a container, so the first second of the scene had nowhere for the work to
        be going. A pale crate you can SEE is empty is the promise; a black box is
        nothing. */}
    {/* ⛔⛔ AND IT MUST DIFFER FROM ITS ROOM. v2 painted this crate in warm oak
        and dropped it into an amber room, where it read as a patch of wall — the
        same defect as the router's lane beds, one scene earlier. A dark
        slate-green crate differs from the payoff room in BOTH hue and value, so
        the bright cream contents inside it are what the eye lands on. */}
    <div style={{ position: "absolute", left: -10 * s, top: -12 * s, width: 226 * s,
      height: 22 * s, borderRadius: 5 * s, background: "#5E7A66" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 206 * s, height: 176 * s,
      borderRadius: 6 * s, background: "#22322B", border: `${6 * s}px solid #5E7A66`,
      overflow: "hidden" }}>
      {[0, 1, 2].map((j) => (
        <div key={"sv" + j} style={{ position: "absolute", left: 0, right: 0,
          top: (34 + j * 46) * s, height: 5 * s, background: "#3C5245" }} />
      ))}
      {Array.from({ length: Math.min(10, n) }, (_, i) => (
        <div key={"dn" + i} style={{ position: "absolute",
          left: 10 * s + (i % 2) * 94 * s, top: 152 * s - Math.floor(i / 2) * 30 * s,
          width: 88 * s, height: 26 * s, borderRadius: 3 * s, zIndex: 2,
          background: i % 4 === 0 ? "#F9E4B4" : "#F2EEE4",
          border: `${2 * s}px solid #C9BFA6`,
          transform: `rotate(${(rnd(i, 3) - 0.5) * 9}deg)` }} />
      ))}
    </div>
    {/* the overflow — what "it stopped accumulating" looks like when it WINS */}
    {n > 10 && Array.from({ length: Math.min(8, n - 10) }, (_, i) => (
      <div key={"of" + i} style={{ position: "absolute",
        left: (-4 + (i % 3) * 72) * s, top: (-34 - Math.floor(i / 3) * 26) * s,
        width: 88 * s, height: 26 * s, borderRadius: 3 * s, zIndex: 3,
        background: i % 3 === 0 ? "#F9E4B4" : "#F2EEE4",
        border: `${2 * s}px solid #C9BFA6`,
        transform: `rotate(${(rnd(i, 8) - 0.5) * 20}deg)` }} />
    ))}
  </div>
);

/** the chute the work pours out of, top right */
export const WorkChute: React.FC<{ x: number; y: number; f: number; s?: number; z?: number }> =
  ({ x, y, f, s = 1, z = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ width: 208 * s, height: 116 * s, background: "#5E5236",
      border: `${5 * s}px solid #8A7A50`,
      clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)" }} />
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"ch" + i} style={{ position: "absolute", left: (26 + i * 34) * s,
        top: ((f * 3 + i * 22) % 96) * s, width: 22 * s, height: 10 * s, borderRadius: 3 * s,
        background: hexa("#F2CE84", 0.5) }} />
    ))}
  </div>
);

/* =========================================================================
   S8 — THE RECEIPTS. A number that MOVES to its value, never typeset at it.
   ====================================================================== */

/** the star odometer — six reels rolling to 68,132 */
export const Odometer: React.FC<{ x: number; y: number; f: number; at: number; dur?: number;
  s?: number; z?: number; target?: number }> =
  ({ x, y, f, at, dur = 56, s = 1, z = 78, target = R.starsN }) => {
  const k = E(f, at, at + dur, 0, 1, IO);
  const v = Math.round(k * target);
  const str = v.toLocaleString("en-US");
  const chars = str.padStart(6, " ").split("");
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
      alignItems: "center", gap: 8 * s }}>
      <StarGlyph s={2.6 * s} c="#F0C979" />
      {chars.map((c, i) => (
        <div key={"od" + i} style={{ width: c === "," ? 22 * s : 58 * s, height: 92 * s,
          borderRadius: 6 * s, background: c === " " ? "transparent" : "#1B1508",
          border: c === " " ? "none" : `${3 * s}px solid #6E5C38`,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden" }}>
          <span style={{ ...mono(58 * s, 700), color: "#F9E4B4",
            transform: `translateY(${c >= "0" && c <= "9" && k < 1 ? Math.sin(f * 0.9 + i) * 3 : 0}px)` }}>
            {c === " " ? "" : c}
          </span>
        </div>
      ))}
    </div>
  );
};

/** the heap of stars that builds under the counter — real landed objects, so
    the figure is DEPICTED as well as counted */
export const StarHeap: React.FC<{ f: number; at: number; n?: number; cx?: number;
  cy?: number; z?: number; dur?: number }> =
  ({ f, at, n = 34, cx = 506, cy = 690, z = 56, dur = 76 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const a = at + (i / n) * dur;
      const k = E(f, a, a + 12, 0, 1, OUT);
      if (k <= 0) return null;
      const row = Math.floor(i / 9), col = i % 9;
      const tx = cx - 300 + col * 72 + row * 34 + (rnd(i, 6) - 0.5) * 16;
      const ty = cy - row * 44;
      const fall = (1 - k) * -420;
      const sc = 1.5 - row * 0.12;
      return (
        <div key={"sh" + i} style={{ position: "absolute", left: tx, top: ty + fall, zIndex: z + row,
          transform: `rotate(${(rnd(i, 9) - 0.5) * 40 + (1 - k) * 220}deg)`, opacity: k }}>
          <StarGlyph s={2.0 * sc} c={i % 4 === 0 ? "#FFE2A6" : "#E7B24C"} />
        </div>
      );
    })}
  </>);

/** the repo's own GitHub topic chips — used INSTEAD of a rank badge.
    ⛔ The current `ruvnet/ruflo` description does not claim #1, so the frame
    never shows one. These are the repo's real topics. */
export const TopicChips: React.FC<{ x: number; y: number; f: number; at: number[]; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 80 }) => (<>
    {R.topics.map((t, i) => {
      const a = at[i] ?? 0;
      const k = E(f, a, a + 8, 0, 1, BACK);
      if (k <= 0) return null;
      return (
        <div key={"tc" + i} style={{ position: "absolute", left: x, top: y + i * 62 * s,
          zIndex: z, padding: `${9 * s}px ${18 * s}px`, borderRadius: 24 * s,
          background: "#1E2A44", border: `${3 * s}px solid #4E7EB4`,
          ...mono(24 * s), color: "#BEDCF4", whiteSpace: "nowrap",
          transform: `scale(${k}) translateX(${(1 - k) * -60}px)` }}>{t}</div>
      );
    })}
  </>);

/* =========================================================================
   S9 — THE KEYWORD, STRUCK INTO STEEL.
   ⛔ HARD CUT on the keyword. No fade, no outro.
   ====================================================================== */
export const KeywordPlate: React.FC<{ x: number; y: number; f: number; hits: number[];
  s?: number; z?: number; word?: string }> =
  ({ x, y, f, hits, s = 1, z = 70, word = "FLOW" }) => {
  const struck = hits.filter((h) => f >= h).length;
  const last = hits[struck - 1] ?? -99;
  const rec = E(f, last, last + 3, 0, 1, OUT) * (1 - E(f, last + 3, last + 14, 0, 1, OUT));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translateY(${rec * 12}px) scaleY(${1 - rec * 0.06})`,
      transformOrigin: "50% 100%" }}>
      {/* ⭐ THE KEYWORD IS THE FUNNEL, so it goes hot on the FIRST strike, not the
          second. v1 held a grey border until strike two and the CTA read dull for
          the half-second the word is actually spoken. Strike one lights the
          frame; strike two fills the plate and inverts the word — a real state
          change on the last beat of the reel. */}
      <div style={{ width: 620 * s, height: 190 * s, borderRadius: 12 * s,
        background: struck > 1 ? "#D97757" : struck > 0 ? "#3D4453" : "#2A303C",
        border: `${7 * s}px solid ${struck > 0 ? "#D97757" : "#4A5364"}`,
        boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...ui(124 * s, 900), letterSpacing: "0.06em",
          color: struck > 1 ? "#2A1810" : struck > 0 ? "#FBF3E4" : "#5A6272" }}>{word}</span>
      </div>
      {/* the strike marks — the plate is DENTED, so the hit cost something */}
      {hits.slice(0, struck).map((h, i) => (
        <div key={"dt" + i} style={{ position: "absolute", left: (120 + i * 300) * s,
          top: 22 * s, width: 90 * s, height: 22 * s, borderRadius: 11 * s,
          background: "rgba(8,10,16,0.34)" }} />
      ))}
    </div>
  );
};

/** the press ram that strikes it */
export const PressRam: React.FC<{ x: number; y: number; f: number; hits: number[]; s?: number;
  z?: number }> = ({ x, y, f, hits, s = 1, z = 74 }) => {
  let d = 0;
  hits.forEach((h) => {
    const down = E(f, h - 8, h, 0, 1, IN_Q) - E(f, h, h + 16, 0, 1, OUT);
    d = Math.max(d, down);
  });
  return (
    <div style={{ position: "absolute", left: x, top: y - 300 * s + d * 250 * s, zIndex: z }}>
      <div style={{ width: 210 * s, height: 150 * s, borderRadius: 8 * s, background: "#4A5364",
        border: `${6 * s}px solid #667186` }} />
      <div style={{ position: "absolute", left: 78 * s, top: -260 * s, width: 54 * s,
        height: 264 * s, background: "#39414F" }} />
    </div>
  );
};
