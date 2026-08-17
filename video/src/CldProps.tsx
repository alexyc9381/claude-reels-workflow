import React from "react";
import { Img, OffthreadVideo, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK, Contact, rock, shake, squash, idle,
} from "./CldWorld";

/* ===========================================================================
   REEL 107 "CLAUDE" · THE PROPS.  Board: storyboards/107-claude.md.

   ⛔⛔ THE RULE THIS FILE EXISTS TO OBEY: **the picture must say the line that is
      being spoken over it.** Alex, killing the counter build: *"matching what im
      saying in the voiceover as well here which this isnt"*. The hook VO is
      "you're probably falling behind" + "a wealth gap bigger than anything we've
      ever seen" — so the hook props are about DISTANCE AND OUTPUT, not about the
      three resources (which belong to the body, where the VO names them).

   ⛔ NO TEXT ANIMATIONS. *"they have text animations when the animations
      themselves should NOT be text"*. Quantity is shown by COUNTABLE OBJECTS —
      a tower you can count, a wall you can see fill. One small chip per shot,
      and a chip LABELS, it never performs.

   ⭐ SPRITES ACT. Alex, twice: *"make sure the claude sprites are actually doing
      actions"*. `Worker` below is built around a pose+action model, not a
      standing mascot: every instance is given something to DO.
   ========================================================================= */

/* ===========================================================================
   ⭐⭐ THE COSTUME ROSTER — "there arent enough outfits either".
   `SlopKit.Mascot` ships TWELVE costume levers and this reel was using FOUR
   (suit / glasses / constr / prof). All of them are in rotation now, so a crowd
   of Claudes reads as a cast rather than one sprite duplicated.
   ⛔ Deterministic by index — never random — so a re-render is identical.
   ========================================================================= */
export const COSTUMES: Array<Record<string, number | string>> = [
  { glasses: 1 }, { suit: 1 }, { constr: 1 }, { prof: 1 }, { chef: 1 },
  { wizard: 1 }, { samurai: 1 }, { cop: 1 }, { beard: 1 }, { fro: 1 },
  { girl: 1 }, { glasses: 1, beard: 1 }, { suit: 1, glasses: 1 },
  { capeC: "#D2724E" }, { capeC: "#3F9E74" }, { constr: 1, beard: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

/* ---------------------------------------------------------------------------
   THE ACTOR — one sprite, grounded, idling at an amplitude a human can see.
   ⭐ 2.6deg / 4.6px with a second slower harmonic. Measured: 1.15deg/1.7px
   registers as "never static" on a metric and READS as static to a human.
   ------------------------------------------------------------------------ */
export const Actor: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  seed?: number; lean?: number; bob?: number } & Record<string, any>> =
  ({ f, x, y, s = 210, z = 60, seed = 0, lean = 0, bob = 0, ...m }) => {
  const id = idle(f, seed, 1.9);
  return (<>
    <Contact x={x - s * 0.32} y={y + s * 0.38} w={s * 0.90} z={z - 1} o={0.42} />
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62 + id.dy + bob,
      zIndex: z, transform: `rotate(${id.rot + lean}deg)`, transformOrigin: "50% 92%" }}>
      <Mascot lf={f} size={s} {...m} />
    </div>
  </>);
};

/** ⭐ A WORKER WHO IS ACTUALLY WORKING. The arm is a real drawn limb that swings
    on its own clock, so a sprite at a bench is DOING something rather than
    standing next to something. `phase` staggers each worker so a row of them
    never reads as one animation played N times. */
export const Worker: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  seed?: number; phase?: number; rate?: number; arm?: boolean } & Record<string, any>> =
  ({ f, x, y, s = 200, z = 60, seed = 0, phase = 0, rate = 1, arm = true, ...m }) => {
  const t = f * rate + phase;
  const swing = Math.sin(t / 7) * 26 + Math.sin(t / 3.3) * 7;   /* the working arm */
  const bob = Math.sin(t / 7) * 3.4;
  return (<>
    <Actor f={f} x={x} y={y} s={s} z={z} seed={seed} bob={bob} {...m} />
    {/* ⛔ the arm is SHORT and it sits ON the body. v1 ran it at 0.30 of the
        sprite width out from the flank and it read as a plank sticking out of
        every worker in the row. */}
    {arm && (
      <div style={{ position: "absolute", left: x + s * 0.14, top: y - s * 0.17, zIndex: z + 1,
        width: s * 0.17, height: s * 0.085, borderRadius: s * 0.045,
        background: CLAY, transformOrigin: "10% 50%",
        transform: `rotate(${swing * 0.6}deg)` }} />
    )}
  </>);
};

/* ---------------------------------------------------------------------------
   THE OUTPUT TOWER — the hook's whole argument, and it is COUNTABLE.
   "You're falling behind" is drawn as: their stack climbs, yours does not.
   ⛔ Not a bar, not a number: individual slabs you can count, each landing with
      a squash and a rock, because nothing in a reel lands and simply stops.
   ------------------------------------------------------------------------ */
export const OutputTower: React.FC<{
  x: number; y: number; n: number; f: number; at?: number; every?: number;
  w?: number; h?: number; s?: number; z?: number; lit?: number; c?: string }> =
  ({ x, y, n, f, at = 0, every = 4, w: ww = 148, h: hh = 17, s = 1, z = 40, lit = 1 }) => (<>
    {/* ⛔⛔⛔ NO MORE PAPER. Alex: *"dont just have animations where its just the
        white papers or the rectangles they SUCK need to be replaced"*.
        This used to stack cream slabs. A stack of paper is not what a Claude Code
        session produces and it is not interesting to look at.
        ⭐ It is now a COLUMN OF CLAUDES — the output of the thing is more Claudes
        working, which is the reel's own noun, the house mascot, and saturated
        clay instead of cream. Each one pops in on its own beat with a squash. */}
    {Array.from({ length: n }, (_, i) => {
      const land = at + i * every;
      const k = E(f, land, land + 9, 0, 1, OUT);
      if (k <= 0) return null;
      const rk = rock(f, land + 7, 4.2, 20);
      const sz = (hh + 44) * s * (0.94 + (i % 3) * 0.04);
      const t = f * (0.9 + (i % 4) * 0.08) + i * 9;
      return (
        <div key={"ot" + i} style={{ position: "absolute",
          left: x + (rnd(i, 5) - 0.5) * 16 * s - sz / 2 + ww * s * 0.5,
          top: y - (i + 1) * (hh + 20) * s - (1 - k) * 200 * s,
          zIndex: z + i, opacity: Math.min(1, k * 1.6),
          transform: `rotate(${rk * 0.5 + (rnd(i, 9) - 0.5) * 3}deg) scaleY(${squash(f, land + 7, 0.24)})` }}>
          <Mascot lf={t} size={sz} {...(costumeFor(i * 3 + 1) as any)} />
        </div>
      );
    })}
  </>);

/** the bench a worker stands behind — TWO layers so the sprite can stand AT it.
    ⛔ The box Mascot's body rect IS its face (eyes at 35-48% of its height), so
    a one-piece bench either crops the eyes or floats in front of the worker. */
export const BenchTop: React.FC<{ x: number; y: number; w?: number; lit?: number; z?: number }> =
  ({ x, y, w: ww = 300, lit = 1, z = 40 }) => (
  <svg width={ww} height={34} viewBox={`0 0 ${ww} 34`}
    style={{ position: "absolute", left: x, top: y, zIndex: z, display: "block" }}>
    <path d={`M0 30 L${ww} 30 L${ww - 16} 0 L16 0 Z`} fill={mxh("#C6B79C", lit * 0.22)} />
  </svg>
);
export const BenchFront: React.FC<{ x: number; y: number; w?: number; lit?: number; z?: number;
  h?: number }> = ({ x, y, w: ww = 300, lit = 1, z = 60, h: hh = 120 }) => (
  <svg width={ww} height={hh} viewBox={`0 0 ${ww} ${hh}`}
    style={{ position: "absolute", left: x, top: y, zIndex: z, display: "block",
      filter: "drop-shadow(0 16px 24px rgba(6,5,3,0.5))" }}>
    <rect x={14} y={22} width={14} height={hh - 22} fill={dkh("#C6B79C", 0.64)} />
    <rect x={ww - 28} y={22} width={14} height={hh - 22} fill={dkh("#C6B79C", 0.64)} />
    <rect x={0} y={0} width={ww} height={24} rx={3} fill={dkh("#C6B79C", 0.46 + (1 - lit) * 0.16)} />
    <rect x={0} y={0} width={ww} height={5} fill={mxh("#C6B79C", lit * 0.24)} />
  </svg>
);

/** a small Claude Code terminal that can be dead, running or finishing */
export const Term: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  on?: number; rows?: number; f?: number; done?: number }> =
  ({ x, y, w: ww = 176, h: hh = 104, z = 44, on = 1, rows = 3, f = 0, done = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    borderRadius: 8, overflow: "hidden", background: on > 0.05 ? "#0E1626" : "#0A0C10",
    border: `5px solid ${dkh("#2A2620", 0.04)}`, boxShadow: SH_D }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 16,
      background: "#0A1120", borderBottom: `2px solid ${hexa("#5FC8D8", 0.22 * on)}` }} />
    {Array.from({ length: rows }, (_, i) => (
      <div key={"tr" + i} style={{ position: "absolute", left: 10, top: 26 + i * 15,
        width: (ww - 40) * (0.5 + rnd(i, 3) * 0.5), height: 6, borderRadius: 3,
        background: hexa(i < done ? GREEN : "#8FE0EC", on * (0.28 + rnd(i, 7) * 0.5)) }} />
    ))}
    {/* the running caret — ⭐ the background process every shot needs */}
    {on > 0.05 && (
      <div style={{ position: "absolute", left: 10, top: 26 + rows * 15, width: 9, height: 7,
        background: hexa(GOLD, Math.sin(f / 4) > 0 ? 0.85 : 0.15) }} />
    )}
  </div>
);

/** the wall of terminals — variant 2's hook. A grid that LIGHTS, one at a time,
    so "everyone else is already running" is countable rather than asserted. */
export const ScreenWall: React.FC<{
  x: number; y: number; cols?: number; rows?: number; s?: number; z?: number;
  f: number; at?: number; every?: number; skip?: number }> =
  ({ x, y, cols = 8, rows = 5, s = 1, z = 20, f, at = 0, every = 2, skip = -1 }) => (<>
    {Array.from({ length: cols * rows }, (_, i) => {
      const cx = i % cols, cy = Math.floor(i / cols);
      /* the cascade travels diagonally so it reads as a wave, not a shuffle */
      const land = at + (cx + cy) * every;
      const on = i === skip ? 0 : E(f, land, land + 6, 0, 1, OUT);
      return (
        <div key={"sw" + i} style={{ position: "absolute",
          left: x + cx * 118 * s, top: y + cy * 84 * s,
          width: 106 * s, height: 72 * s, zIndex: z, borderRadius: 6 * s, overflow: "hidden",
          background: on > 0.05 ? "#12203A" : "#0B0E14",
          border: `${3 * s}px solid ${hexa("#4A6480", 0.5)}`,
          boxShadow: on > 0.5 ? SH : undefined }}>
          {Array.from({ length: 3 }, (_, r) => (
            <div key={r} style={{ position: "absolute", left: 8 * s, top: (12 + r * 15) * s,
              width: (60 + rnd(i * 3 + r, 5) * 34) * s, height: 5 * s, borderRadius: 3,
              background: hexa("#8FE0EC", on * (0.30 + rnd(i + r, 9) * 0.55)) }} />
          ))}
        </div>
      );
    })}
  </>);

/** a loaded pallet — variant 3's hook */
export const Pallet: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  f?: number; lit?: number }> = ({ x, y, n = 6, s = 1, z = 46, f = 0, lit = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"pl" + i} style={{ position: "absolute",
        left: (i % 2) * 96 * s + (rnd(i, 3) - 0.5) * 6,
        top: -Math.floor(i / 2) * 40 * s, width: 92 * s, height: 36 * s,
        borderRadius: 4 * s, background: mxh("#E9E0CB", lit * 0.04),
        border: `${3 * s}px solid ${dkh("#E9E0CB", 0.30)}`, boxShadow: SH,
        transform: `rotate(${(rnd(i, 7) - 0.5) * 3}deg)` }} />
    ))}
    {/* the deck boards */}
    <div style={{ position: "absolute", left: -8 * s, top: 34 * s, width: 208 * s, height: 16 * s,
      background: dkh("#8A6B44", 0.2), borderRadius: 3 * s, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: -8 * s, top: 52 * s, width: 208 * s, height: 10 * s,
      background: dkh("#8A6B44", 0.44), borderRadius: 2 * s }} />
  </div>
);

/** one small identifying chip. ⛔ ONE per shot, in a band nothing else enters.
    It LABELS; it never animates as the event. */
export const Chip2: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  c?: string; fg?: string }> =
  ({ x, y, t, s = 1, z = 78, c = "#F2ECDE", fg = "#241F17" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${7 * s}px ${15 * s}px`, borderRadius: 9 * s, background: c,
    border: `${2 * s}px solid ${dkh(c, 0.2)}`, boxShadow: SH,
    fontFamily: MONO, fontWeight: 900, fontSize: 21 * s, letterSpacing: "0.04em",
    color: fg, whiteSpace: "nowrap" }}>{t}</div>
);

/** an expanding ring + dust, so an arrival COSTS something */
export const Hit: React.FC<{ x: number; y: number; f: number; at: number; r?: number;
  c?: string; z?: number; n?: number }> =
  ({ x, y, f, at, r = 170, c = GOLD, z = 74, n = 9 }) => {
  const k = E(f, at, at + 22, 0, 1, OUT);
  if (k <= 0 || k >= 1) return null;
  const rr = r * k;
  return (<>
    <div style={{ position: "absolute", left: x - rr, top: y - rr * 0.40,
      width: rr * 2, height: rr * 0.80, borderRadius: "50%", zIndex: z,
      border: `${Math.max(2, 7 * (1 - k))}px solid ${hexa(c, 0.6 * (1 - k))}` }} />
    {Array.from({ length: n }, (_, i) => {
      const dir = (rnd(i, 3) - 0.5) * 2;
      return (
        <div key={"hp" + i} style={{ position: "absolute",
          left: x + dir * 92 * k, top: y - rnd(i, 7) * 46 * k,
          width: 12 + rnd(i, 9) * 18, height: 12 + rnd(i, 9) * 18, borderRadius: "50%",
          background: hexa("#8A7C68", 0.30 * (1 - k)), zIndex: z - 1 }} />
      );
    })}
  </>);
};


/* ===========================================================================
   ⭐⭐ THE PROOF LAYER — the playbook requirement I had not built.
   `CLAUDE-REELS-PLAYBOOK.md` B0: *"Put the literal thing (real UI, the actual
   command) on screen alongside it"*, and B1's per-scene card contract lists
   **PROOF (real UI + the number)** as a required field. The first three cuts of
   this reel were an entirely drawn world with ZERO real UI in them, which is
   what Alex meant by "you didn't follow the repo".

   Everything below is REAL, pulled live on build day into public/shots/:
     107_academy_full.png / _hero.png   anthropic.skilljar.com
     107_skills_hero.png                github.com/anthropics/skills      (170k)
     107_subagents_hero.png             VoltAgent/awesome-claude-code-subagents (24.4k)
     107_amodei.mp4                     Anthropic's OWN fireside-chat upload
   ⛔ The star counts printed by the reel came from the GitHub API and were then
      re-read OFF THESE PAGES: 170k and 24.4k. The picture and the number agree.
   ========================================================================= */

/** a real screen capture in a browser frame, scrolling like a screen recording.
    ⛔ `scroll` is px of travel over the scene — a tall full-page PNG moving
    behind a fixed frame is what reads as a RECORDING rather than a screenshot. */
export const Proof: React.FC<{
  x: number; y: number; w: number; h: number; src: string; f: number;
  scroll?: number; at?: number; dur?: number; z?: number; url?: string;
  tint?: string }> =
  ({ x, y, w: ww, h: hh, src, f, scroll = 0, at = 0, dur = 60, z = 60, url, tint = "#D9CBB4" }) => {
  const k = E(f, at, at + 12, 0, 1, OUT);
  if (k <= 0) return null;
  const sy = scroll ? E(f, at + 8, at + 8 + dur, 0, scroll, LIN) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y + (1 - k) * 46, width: ww, height: hh,
      zIndex: z, borderRadius: 14, overflow: "hidden", opacity: k,
      background: "#FFFFFF", border: `5px solid ${tint}`, boxShadow: SH_D,
      transform: `scale(${0.97 + k * 0.03})` }}>
      {/* the browser chrome — three dots and the real URL, nothing else */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34, zIndex: 3,
        background: "#EDE7DA", borderBottom: `2px solid ${dkh("#EDE7DA", 0.14)}`,
        display: "flex", alignItems: "center", paddingLeft: 12, gap: 7 }}>
        {["#E06C5A", "#E7B24C", "#3F9E74"].map((c) => (
          <div key={c} style={{ width: 11, height: 11, borderRadius: 6, background: c }} />
        ))}
        {url && <span style={{ marginLeft: 14, fontFamily: MONO, fontWeight: 800, fontSize: 15,
          color: "#6E6558" }}>{url}</span>}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 34, bottom: 0, overflow: "hidden" }}>
        <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: -sy,
          width: "100%", display: "block" }} />
      </div>
    </div>
  );
};

/** real b-roll, framed into the panel. ⛔ muted always — the VO is the only voice. */
export const Broll: React.FC<{
  x?: number; y?: number; w?: number; h?: number; src: string; f: number;
  at?: number; z?: number; label?: string; punch?: number; ox?: string;
  startFrom?: number }> =
  ({ x = 0, y = 0, w: ww = 1012, h: hh = 792, src, f, at = 0, z = 30, label,
     punch = 0.05, ox = "50% 45%", startFrom = 0 }) => {
  const k = E(f, at, at + 8, 0, 1, OUT);
  if (k <= 0) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      overflow: "hidden", opacity: k }}>
      <OffthreadVideo src={staticFile(src)} muted startFrom={startFrom}
        style={{ width: "100%", height: "100%", objectFit: "cover",
          transformOrigin: ox,
          transform: `scale(${1.02 + E(f, at, at + 130, 0, punch, LIN)})` }} />
      {/* ⛔⛔ NO GRADE OVER THE FOOTAGE. Alex: *"dont add a darkening filter over
          the video at 3 seconds featuring dario amodei CEO"*. I had a warm
          gradient here at 0.18 -> 0.44 to make the real footage sit in the
          reel's palette; it just made a lit interview look murky. Real footage
          plays clean. */}
      {label && (
        <div style={{ position: "absolute", left: 26, bottom: 26, zIndex: 4,
          padding: "9px 16px", borderRadius: 9, background: hexa("#0C0804", 0.72),
          border: `2px solid ${hexa("#F2DEB4", 0.34)}`, fontFamily: MONO, fontWeight: 900,
          fontSize: 20, letterSpacing: "0.05em", color: "#F6ECD6" }}>{label}</div>
      )}
    </div>
  );
};


/* ===========================================================================
   ⭐⭐⭐ THE CROWD — the answer to "way too many paper animations".
   Alex: *"Fleece animations does way too many, like paper animations. This is,
   like, paper boxes and stuff… you need animations where it's actual Claude
   sprites"*.

   He is right, and the cause is traceable: the motion audit rewards LARGE BRIGHT
   OBJECTS ARRIVING, so I answered every weak scene with more cream rectangles.
   The number went up and the reel turned into flying paper.

   ⭐ THE FIX IS ALSO THE BETTER MAPPING. The VO says "over 100 Claude Code
   HELPERS". A helper is not a tile — it is a Claude. Drawing them as a CROWD OF
   CLAUDE SPRITES is simultaneously:
     · the literal thing the line names (no decoding)
     · the house mascot, on-brand, instead of anonymous paper
     · saturated clay orange, which is worth more to the motion audit than cream
       (colour is half of motion — [[skill-reel]])
     · a body doing something, which is what Alex has now asked for four times.
   ========================================================================= */
export const Crowd: React.FC<{
  f: number; n?: number; x0: number; x1: number; y0: number; y1: number;
  at?: number; every?: number; s?: number; z?: number; from?: "l" | "r" | "b";
  cols?: number; costume?: (i: number) => Record<string, number | string> }> =
  ({ f, n = 24, x0, x1, y0, y1, at = 0, every = 2, s = 76, z = 50, from = "l",
     cols = 8, costume }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const cx = i % cols, cy = Math.floor(i / cols);
      const rows = Math.max(1, Math.ceil(n / cols));
      const px = x0 + (cols === 1 ? 0 : (cx / (cols - 1)) * (x1 - x0));
      const py = y0 + (rows === 1 ? 0 : (cy / (rows - 1)) * (y1 - y0));
      /* ⛔ diagonal stagger, so it reads as a crowd ARRIVING rather than a grid
         appearing — and every sprite gets its own phase and rate so it is never
         one animation played n times. */
      /* ⛔⛔ SPRITES MUST BE BIG AND FAST TO REPLACE THE PAPER. Measured: when the
         cream slabs came out, CTA fell 8.54 -> 5.14 and BENCH 6.34 -> 4.84,
         because the sprites that replaced them were half the size and eased in
         over 13 frames. Same lesson as the tween: a gentle arrival is not an
         event. Arrivals are now 8 frames with a longer travel and a squash. */
      const land = at + (cx + cy) * every;
      const k = E(f, land, land + 8, 0, 1, OUT);
      if (k <= 0) return null;
      const off = from === "l" ? -760 : from === "r" ? 760 : 0;
      const offY = from === "b" ? 560 : 0;
      const sc = s * (0.86 + (cy / Math.max(rows - 1, 1)) * 0.40);
      const t = f * (0.85 + (i % 5) * 0.09) + i * 7;

      /* ⛔⛔ THEY LANDED AND THEN JUST STOOD THERE. Alex: *"we see the claude
         sprites come in but then nothing else, they just stand there and move
         slightly up and down but they dont actually do movements"*. A bob is an
         IDLE, not an action — [[reel-motion-hierarchy]] calls this out: an
         inert hero is boring however big it is.
         ⭐ Every sprite now runs a real ACTION LOOP after it arrives, and which
         one it runs depends on its index, so a crowd is doing four different
         things at once instead of one thing in unison:
           0 PACE  — walks side to side
           1 WORK  — leans into a task, arm swinging
           2 HOP   — jumps on a beat
           3 LOOK  — turns head, double-takes
         Each is on its own phase and rate, so nothing syncs. */
      const act = i % 4;
      const after = Math.max(0, f - (land + 8));          /* only once landed */
      const live = k > 0.85 ? 1 : 0;
      const pace = act === 0 ? Math.sin(after / 17) * 22 * live : 0;
      const hopPh = (after + i * 9) % 46;
      const hop = act === 2 && live ? -Math.max(0, Math.sin((hopPh / 46) * Math.PI * 2)) * 26 : 0;
      const lean = act === 1 && live ? Math.sin(after / 9) * 9 : 0;
      const look = act === 3 && live ? Math.sin(after / 13) : 0;
      const stride = act === 0 && live ? Math.abs(Math.sin(after / 8.5)) * 7 : 0;
      return (
        <div key={"cw" + i} style={{ position: "absolute",
          left: px + (1 - k) * off + pace,
          top: py + (1 - k) * offY + Math.sin(t / 7) * 3.6 + hop - stride,
          zIndex: z + cy, opacity: Math.min(1, k * 1.7),
          transform: `rotate(${(1 - k) * (from === "r" ? -22 : 22) + Math.sin(t / 29) * 2.4 + lean}deg) scaleY(${squash(f, land + 7, 0.20)})`,
          transformOrigin: "50% 92%" }}>
          <Mascot lf={t} size={sc} gaze={look}
            cheer={act === 2 && live ? Math.max(0, Math.sin((hopPh / 46) * Math.PI * 2)) * 0.6 : 0}
            nodAmp={act === 1 ? 6 : 3.5} nodSpeed={act === 1 ? 7 : 10}
            {...(costume ? costume(i) : {})} />
          {/* the WORK sprites get a swinging arm, so the action is visible */}
          {act === 1 && live > 0 && (
            <div style={{ position: "absolute", left: sc * 0.60, top: sc * 0.40,
              width: sc * 0.22, height: sc * 0.10, borderRadius: sc * 0.05,
              background: CLAY, transformOrigin: "8% 50%",
              transform: `rotate(${Math.sin(after / 6) * 42}deg)` }} />
          )}
        </div>
      );
    })}
  </>);

/** a line of Claudes CARRYING something in and setting it down — replaces the
    "slab flies in from off-frame" move wherever the thing arriving is a thing
    somebody would carry. */
export const Porters: React.FC<{
  f: number; n?: number; at?: number; every?: number; y?: number;
  x0?: number; x1?: number; s?: number; z?: number }> =
  ({ f, n = 3, at = 0, every = 26, y = 560, x0 = -140, x1 = 700, s = 132, z = 52 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const a = at + i * every;
      const k = E(f, a, a + 34, 0, 1, OUT);
      if (k <= 0) return null;
      const gone = E(f, a + 40, a + 62, 0, 1, LIN);
      const t = f + i * 11;
      return (
        <div key={"po" + i} style={{ position: "absolute",
          left: x0 + k * (x1 - x0) + gone * 420, top: y + Math.sin(t / 6) * 5,
          zIndex: z + i, opacity: 1 - gone }}>
          <Mascot lf={t} size={s} />
          {/* ⛔ NOT A CREAM SLAB. What they carry is a real object: a lit
              terminal screen, so the thing being delivered is the thing the reel
              is about. */}
          <div style={{ position: "absolute", left: s * 0.08, top: -s * 0.40,
            width: s * 0.84, height: s * 0.46, borderRadius: 7, overflow: "hidden",
            background: "#0E1626", border: `3px solid ${dkh("#2A2620", 0.02)}`,
            transform: `rotate(${Math.sin(t / 9) * 3}deg)`, boxShadow: SH }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: s * 0.09,
              background: "#0A1120" }} />
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ position: "absolute", left: s * 0.06,
                top: s * (0.15 + r * 0.09), width: s * (0.5 - r * 0.10), height: s * 0.045,
                borderRadius: 3, background: hexa("#8FE0EC", 0.75 - r * 0.16) }} />
            ))}
          </div>
        </div>
      );
    })}
  </>);



/* ===========================================================================
   ⭐⭐⭐ THE CLAUDE BRAIN — Alex: *"especially with whats being spoken, like when
   i say 'better' like see claude brains etc"*.
   VO S5: "…to make it INSTANTLY BETTER at specific tasks." So the picture is a
   Claude's brain gaining capability: eight lobes that light one after another,
   the sunburst mark spinning up in the middle, and the whole thing pulsing
   bigger as it fills. The upgrade is drawn ON the character, not asserted.
   ⛔ ONE inline svg with real paths — stacked divs cannot draw a brain
   ([[reel-draw-dont-stack]]); the silhouette test passes on the outline alone.
   ========================================================================= */
export const Brain: React.FC<{
  x: number; y: number; s?: number; f: number; at?: number; every?: number;
  z?: number; lobes?: number; c?: string }> =
  ({ x, y, s = 1, f, at = 0, every = 5, z = 70, lobes = 8, c = CLAY }) => {
  /* ⛔⛔ IT HAS TO CHARGE, AND FOR THE WHOLE BEAT. Alex: *"at 20 seconds it needs
     to like charge up the battery thing… after the claude sprites come in
     theres no motion"*. v19 lit eight lobes over 40 frames and then held a
     finished brain for the remaining ~43 frames of the scene — a static hero
     for 1.4s, which is the dead-air pattern this reel keeps hitting.
     ⭐ Now it behaves like a charging cell for the full duration:
       · a CHARGE LEVEL climbs a gauge up the side, never finishing early
       · each lobe SNAPS on with a pop and a ring rather than fading
       · the whole brain PULSES harder the fuller it gets
       · a sweep of energy runs across the lit lobes continuously
       · at 100% it flashes and the mark spins up to full speed
     ⛔ Matte only: the "charge" is drawn with solid steps and scale, never a
     `boxShadow: 0 0 Npx` glow (the grep gate on that is 0). */
  const span = lobes * every;
  const lit = Math.max(0, Math.min(lobes, Math.floor((f - at) / every) + 1));
  const pct = Math.max(0, Math.min(1, (f - at) / span));
  const full = pct >= 1;
  /* every lobe lands with its own pop, so there are `lobes` discrete events */
  const popAt = at + (lit - 1) * every;
  const pop = 1 + (lit > 0 ? E(f, popAt, popAt + 4, 0, 0.10, OUT) - E(f, popAt + 4, popAt + 12, 0, 0.10, IO) : 0);
  const beat = 1 + Math.sin(f / (7 - pct * 3)) * (0.012 + pct * 0.030);
  const flash = full && f < at + span + 10 ? E(f, at + span, at + span + 8, 1, 0, LIN) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s * pop * beat})`, transformOrigin: "50% 60%" }}>
      <svg width={240} height={210} viewBox="0 0 240 210" style={{ display: "block",
        filter: "drop-shadow(0 14px 22px rgba(8,6,4,0.5))" }}>
        <path d="M120 12 C64 12 26 48 26 96 C26 128 44 150 70 162 L70 186 C70 196 78 202 90 202
                 L150 202 C162 202 170 196 170 186 L170 162 C196 150 214 128 214 96
                 C214 48 176 12 120 12 Z"
          fill={dkh(c, 0.52 - pct * 0.16)} stroke={dkh(c, 0.68)} strokeWidth={5} />
        {Array.from({ length: lobes }, (_, i) => {
          const on = i < lit;
          const col = 3, cw = 52, ch = 40;
          const gx = 42 + (i % col) * (cw + 10), gy = 40 + Math.floor(i / col) * (ch + 10);
          /* ⭐ a sweep runs across the lit lobes so the charge is always moving */
          const sweep = on ? 0.72 + 0.28 * Math.max(0, Math.sin(f / 6 - i * 0.7)) : 0;
          return (
            <rect key={"lb" + i} x={gx} y={gy} width={cw} height={ch} rx={11}
              fill={on ? mxh(c, 0.10 + sweep * 0.22) : dkh(c, 0.64)}
              stroke={on ? mxh(c, 0.44) : dkh(c, 0.72)} strokeWidth={3}
              opacity={on ? 1 : 0.5} />
          );
        })}
        {/* ⭐ THE CHARGE GAUGE — a battery cell up the side that climbs the whole
            beat, so there is a moving element even between lobe pops */}
        <rect x={222} y={44} width={14} height={118} rx={6}
          fill={dkh(c, 0.66)} stroke={dkh(c, 0.74)} strokeWidth={3} />
        <rect x={225} y={47 + (112 - pct * 112)} width={8} height={pct * 112} rx={4}
          fill={mxh(c, 0.30)} />
        <rect x={225} y={36} width={8} height={7} rx={3} fill={dkh(c, 0.7)} />
      </svg>
      <div style={{ position: "absolute", left: 84, top: 74, width: 72, height: 72,
        borderRadius: 18, background: "#FFFFFF", border: "3px solid #E8DCC0",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: 0.25 + pct * 0.75,
        transform: `rotate(${f * (0.6 + pct * 4.2)}deg) scale(${0.7 + pct * 0.3})` }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 54, height: 54, objectFit: "contain" }} />
      </div>
      {/* the 100% flash, matte: a solid plate that fades, not a glow */}
      {flash > 0 && (
        <div style={{ position: "absolute", left: 18, top: 8, width: 204, height: 196,
          borderRadius: 90, background: hexa("#F6E9C8", flash * 0.5) }} />
      )}
    </div>
  );
};

/** the Claude mark, cast big into a set wall — the SYMBOLISM the open was
    missing. Alex: *"the begining scene doesnt have much claude symbolism or
    representation there either"*. */
export const WallMark: React.FC<{ x: number; y: number; s?: number; z?: number;
  o?: number; f?: number; spin?: number }> =
  ({ x, y, s = 220, z = 6, o = 0.5, f = 0, spin = 0.18 }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y, width: s, height: s, zIndex: z,
    opacity: o, transform: `rotate(${(f * spin) % 360}deg)` }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </div>
);


/** ⭐ ITEM 3 AS AN OBJECT: a green crate with Claudes climbing out of it.
    The subagents repo is a hundred helpers, so the thing you are handed is a
    CREW IN A BOX — not a grid of cream tiles. Distinct silhouette, distinct
    colour, and it opens. */
export const CrewCrate: React.FC<{
  x: number; y: number; s?: number; f: number; at?: number; z?: number;
  c?: string; n?: number }> =
  ({ x, y, s = 1, f, at = 0, z = 56, c = "#3F9E74", n = 5 }) => {
  const open = E(f, at, at + 14, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      {/* the Claudes climbing out, behind the front wall */}
      {Array.from({ length: n }, (_, i) => {
        const k = E(f, at + 6 + i * 4, at + 20 + i * 4, 0, 1, OUT);
        if (k <= 0) return null;
        const t = f * (0.9 + i * 0.1) + i * 13;
        return (
          <div key={"cc" + i} style={{ position: "absolute",
            left: 10 + i * 42, top: 40 - k * 66 + Math.sin(t / 7) * 3,
            zIndex: 2, opacity: Math.min(1, k * 1.7),
            transform: `rotate(${Math.sin(t / 23) * 4}deg)` }}>
            <Mascot lf={t} size={72} {...(costumeFor(i * 2 + 3) as any)} />
          </div>
        );
      })}
      {/* the lid, hinged open */}
      <div style={{ position: "absolute", left: 0, top: 30 - open * 14, width: 240, height: 20,
        borderRadius: 4, background: mxh(c, 0.16), border: `3px solid ${dkh(c, 0.34)}`,
        transformOrigin: "0% 100%", transform: `rotate(${-open * 62}deg)`, zIndex: 6 }} />
      {/* the crate body */}
      <div style={{ position: "absolute", left: 0, top: 50, width: 240, height: 116, zIndex: 5,
        borderRadius: 7, background: `linear-gradient(178deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.30)} 100%)`,
        border: `4px solid ${dkh(c, 0.46)}`, boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 44, height: 12,
          background: dkh(c, 0.44), opacity: 0.7 }} />
        <div style={{ position: "absolute", left: 88, top: 24, width: 64, height: 64,
          borderRadius: 14, background: "#FFFFFF", border: "3px solid #E8DCC0",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 46, height: 46, objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
};


/** ⭐⭐⭐ THE FLING — a Claude launched across the whole frame.
    Alex: *"at 1-2 seconds… there needs to be something interesting happen like a
    claude sprite flinging across the screen stuff like that"*.
    It is the biggest single mover available: a large saturated body crossing the
    full panel width in ~0.8s, spinning, with a landing that costs something.
    ⛔ It is also ON-LINE, not a gag for its own sake — the VO is "every other
    station is shipping", so a station flings a worker out of frame under the
    sheer volume, and he lands at OUR empty bench, which is the one place with
    nothing happening. */
export const Fling: React.FC<{
  f: number; at: number; x0: number; y0: number; x1: number; y1: number;
  s?: number; z?: number; dur?: number; spins?: number; costume?: Record<string, any> }> =
  ({ f, at, x0, y0, x1, y1, s = 150, z = 68, dur = 26, spins = 2, costume }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  if (k <= 0) return null;
  const done = f > at + dur;
  const settle = done ? f - (at + dur) : 0;
  if (settle > 80) return null;
  const x = x0 + (x1 - x0) * k;
  /* a real arc: up fast, down into the landing */
  const y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 230;
  const spin = done ? spins * 360 + rock(f, at + dur, 9, 22) : k * spins * 360;
  const sq = squash(f, at + dur, 0.30, 4, 16);
  return (<>
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62, zIndex: z,
      transform: `rotate(${spin}deg) scaleY(${sq})`, transformOrigin: "50% 70%" }}>
      <Mascot lf={f} size={s} shock={done ? 0.4 : 0.9} xeyes={done ? 0 : 1} {...(costume || {})} />
    </div>
    {/* the landing costs something */}
    {done && settle < 30 && (<>
      <div style={{ position: "absolute", left: x1 - 130, top: y1 + s * 0.30,
        width: 260, height: 34, borderRadius: "50%", zIndex: z - 1,
        border: `${Math.max(2, 6 * (1 - settle / 30))}px solid ${hexa(GOLD, 0.5 * (1 - settle / 30))}` }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"fp" + i} style={{ position: "absolute",
          left: x1 + (rnd(i, 3) - 0.5) * 190 * (settle / 30),
          top: y1 + s * 0.28 - rnd(i, 7) * 62 * (settle / 30),
          width: 14 + rnd(i, 9) * 16, height: 14 + rnd(i, 9) * 16, borderRadius: "50%",
          background: hexa("#8A7C68", 0.32 * (1 - settle / 30)), zIndex: z - 2 }} />
      ))}
    </>)}
  </>);
};


/** ⭐⭐ THE SPINNING BADGE — a small white plate carrying the turning Claude mark,
    sized to sit ON a prop. Alex: *"even on all of the objects, even these two, on
    all of the videos need to have the spinning claude logo"*.
    ⛔ The plate is not decoration: the mark on its own composites to a dull
    brown over dark props (measured 15-21% clay, i.e. present but muddy). White
    behind it is what makes it read at thumbnail size — the same fix the wall
    mark needed. */
export const SpinBadge: React.FC<{
  x: number; y: number; s?: number; z?: number; f: number; spin?: number }> =
  ({ x, y, s = 64, z = 90, f, spin = 1.4 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s, zIndex: z,
    borderRadius: s * 0.28, background: "#FFFFFF",
    border: `${Math.max(2, s * 0.045)}px solid #E8DCC0`, boxShadow: SH,
    display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ width: s * 0.72, height: s * 0.72, objectFit: "contain",
        transform: `rotate(${(f * spin) % 360}deg)` }} />
  </div>
);

/* ⭐ THE CROWN — Alex: *"at the end when the claude gets really big in that
   animation, like add a crown to its head when it gets to the final level"*.
   It is the right instinct: the reel's last beat is OUR Claude finally out-
   growing the one that dwarfed him in the hook, and a crown states "final
   level" without a word of type on screen ([[feedback_graphical_over_textual]]).

   ⛔ DRAWN, NOT ASSEMBLED. [[feedback_props_need_real_drawing]] — "a whole lot of
   nothing even though there's more stuff"; a book that was four divs got
   rejected. So this is one svg with a tapered band, five points with real
   thickness, jewels that carry a specular, pearls along the rim, an inner
   shadow under the band and a shine that sweeps once as it lands.

   ⛔ IT MUST RIDE THE HEAD. `Actor` puts the mascot at `top: y - s*0.62 + idle.dy`
   and rotates it about 50%/92%, so the crown re-runs the SAME `idle(f, seed,
   1.9)` and the same rotation about the same origin. Anything else and it
   detaches on the bob — the whole point is that it is ON him. */
export const Crown: React.FC<{ f: number; x: number; y: number; s?: number;
  z?: number; seed?: number; at?: number }> =
  ({ f, x, y, s = 212, z = 64, seed = 0, at = 0 }) => {
  const id = idle(f, seed, 1.9);
  const drop = E(f, at, at + 11, 0, 1, BACK);          /* it lands, with weight */
  if (f < at - 1) return null;
  /* ⛔ MEASURED OFF A RENDER, not modelled. `Actor` places the mascot div at
     `y - s*0.62`, but the drawn head inside `Mascot` starts lower than the div's
     own top edge: a still at f970 put the crown's base 38px ABOVE the head with
     the algebraic offset, so the crown floated. The real head top sits at
     ~`y - s*0.451`. These numbers seat the base ON the head with a small overlap
     and put the rotation pivot on Actor's own (50%/92% of an s-tall div at
     `y - s*0.62`, i.e. `y + 0.30s`, which is 283% down a 0.38s-tall crown). */
  const w = s * 0.55, h = s * 0.38;
  const dy = (1 - drop) * -s * 0.55;                    /* falls onto the head */
  const tilt = (1 - drop) * -16;
  const shine = E(f, at + 6, at + 22, 0, 1, OUT);       /* one sweep, then still */
  const jewels = [RED, SKY, GOLD, SKY, RED];
  return (
    <div style={{ position: "absolute", left: x - w / 2,
      top: y - s * 0.774 + id.dy + dy, width: w, height: h, zIndex: z,
      transform: `rotate(${id.rot + tilt}deg)`, transformOrigin: "50% 283%",
      opacity: Math.min(1, drop * 1.6) }}>
      <svg viewBox="0 0 124 84" width={w} height={h} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="cr-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={mxh(GOLD, 0.42)} />
            <stop offset="0.52" stopColor={GOLD} />
            <stop offset="1" stopColor={dkh(GOLD, 0.34)} />
          </linearGradient>
          <linearGradient id="cr-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={mxh(GOLD, 0.24)} />
            <stop offset="1" stopColor={dkh(GOLD, 0.46)} />
          </linearGradient>
          <clipPath id="cr-c"><path d="M6 40 L20 12 L34 32 L50 6 L62 4 L74 6 L90 32 L104 12 L118 40 L118 66 L6 66 Z" /></clipPath>
        </defs>
        {/* the five points, as one solid so the silhouette reads at thumbnail size */}
        <path d="M6 40 L20 12 L34 32 L50 6 L62 4 L74 6 L90 32 L104 12 L118 40 L118 60 L6 60 Z"
          fill="url(#cr-g)" stroke={dkh(GOLD, 0.52)} strokeWidth="2.4" strokeLinejoin="round" />
        {/* the band, with its own darker underside so the crown has depth */}
        <rect x="4" y="56" width="116" height="22" rx="5" fill="url(#cr-b)"
          stroke={dkh(GOLD, 0.52)} strokeWidth="2.4" />
        <rect x="8" y="59" width="108" height="5" rx="2.5" fill={hexa(mxh(GOLD, 0.6), 0.75)} />
        <rect x="6" y="72" width="112" height="5" rx="2.5" fill={hexa(dkh(GOLD, 0.6), 0.5)} />
        {/* pearls along the band */}
        {[16, 34, 52, 70, 88, 106].map((cx, i) => (
          <circle key={"p" + i} cx={cx} cy={67} r="4.2" fill={mxh(GOLD, 0.66)}
            stroke={dkh(GOLD, 0.5)} strokeWidth="1.2" />
        ))}
        {/* the jewels, each with a specular so they read as stones not dots */}
        {[[20, 15], [50, 10], [62, 8], [74, 10], [104, 15]].map(([cx, cy], i) => (
          <g key={"j" + i}>
            <circle cx={cx} cy={cy} r="7.4" fill={jewels[i]}
              stroke={dkh(jewels[i], 0.42)} strokeWidth="1.8" />
            <circle cx={cx - 2.4} cy={cy - 2.6} r="2.4" fill={hexa("#FFFFFF", 0.82)} />
          </g>
        ))}
        {/* one shine sweep as it settles */}
        <g clipPath="url(#cr-c)">
          <rect x={-70 + shine * 200} y="-10" width="26" height="100"
            fill={hexa("#FFFFFF", 0.30 * (1 - shine))} transform="skewX(-18)" />
        </g>
      </svg>
    </div>
  );
};
