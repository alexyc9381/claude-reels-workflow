import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, AssemblyCtx, Mascot, hexA } from "./SlopKit";
import WORDS from "./data/words_ai.json";
import { PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D, SH, SH_S, mix } from "./CancelWorld";
import { SfxTrack, LEVELS, layer, db, type Cue } from "./SoundKit";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 89 "AI" · HOOK SET 5 — THE DIVE.

   Alex's idea, and it is the right one for this frame: a fall is the only
   camera move that is NATIVELY 9:16. Everything else fights the aspect ratio;
   a descent uses the whole of it. We open at the top of the board looking
   down, and then the camera goes with him.

   The world is one tall column (1012 x 3500) that the camera travels down.
   Four versions differ in the one thing that matters — WHAT HE FALLS THROUGH,
   and what is waiting at the bottom:

     A · THE HIGH BOARD   open air, then a pool filled with old chats
     B · THE PUNCH-THROUGH  he bursts through every past conversation on the way
     C · THE ARCHIVE SHAFT  walls of shelves rushing past, the notebook at the floor
     D · THE EMPTY POOL     the pool that should hold his history has been drained

   Shots: wide at the top · close on the toes · the fall · the landing.
   ========================================================================= */

export const AI5_LEN = 146;
export const AI5_CUTS = [26, 48, 116];
const [C1, C2, C3] = AI5_CUTS;
const HEAD = { big: "GIVE CLAUDE", hot: "INFINITE MEMORY" };
const W = 1012, H = 792, WH = 3500;
const CLAUDE = "claude_logo.png";
const NBLM = "logos/notebooklm.svg";

const Vo: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : (
    <Audio src={staticFile("ai_vo_final.wav")} endAt={AI5_LEN} />
  );
const Cap: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : <KaraokeCaption words={WORDS as any} />;

/* ------------------------------------------------------------- the fall --
   Real gravity: accelerate to terminal, then hold. A constant-speed drop
   reads as an elevator; the acceleration is what makes it a fall.
   ------------------------------------------------------------------------ */
const ACC = 3.4, VMAX = 48, KT = VMAX / ACC;
const fy = (k: number) =>
  k <= 0 ? 0 : k < KT ? 0.5 * ACC * k * k : 0.5 * ACC * KT * KT + (k - KT) * VMAX;

const TOP_Y = 214;          // where he stands on the board
const LAND_Y = 3128;        // the surface at the bottom
const clawY = (f: number) => Math.min(LAND_Y, TOP_Y + fy(f - C2));
const camOf = (f: number) => Math.max(0, Math.min(WH - H, clawY(f) - 296));

/** the travelling camera — one tall world, translated and optionally zoomed */
const Cam: React.FC<{ y: number; zoom?: number; ox?: number; oy?: number; children: React.ReactNode }> =
  ({ y, zoom = 1, ox = 50, oy = 50, children }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: WH,
      transform: `scale(${zoom}) translateY(${-y}px)`,
      transformOrigin: `${ox}% ${oy}px` }}>
      {children}
    </div>
  </div>
);

/** the diver. Falls head-down with a tumble; stands upright before the jump. */
const Diver: React.FC<{ f: number; x: number; y: number; size?: number; falling?: boolean;
  z?: number; land?: number }> = ({ f, x, y, size = 168, falling = false, z = 40, land = 0 }) => {
  const k = f - C2;
  const spin = falling ? Math.min(1, k / 22) : 0;
  const crouch = falling ? 0 : E(f, C2 - 9, C2 - 1, 0, 1, IO);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${spin * 172 + Math.sin(k / 7) * spin * 9}deg) scale(${1 - land * 0.14}, ${1 - crouch * 0.16 + land * 0.1})`,
      transformOrigin: "50% 60%",
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.08)}px rgba(6,9,14,0.55))` }}>
      <Mascot lf={f} size={size} gaze={falling ? 0 : 3} shock={falling ? 0.85 : 0.35}
              nodAmp={falling ? 0 : 2} nodSpeed={12} />
    </div>
  );
};

/* ------------------------------------------------------------- furniture -- */

/** stacked solid sky bands — matte, never a gradient */
const Sky: React.FC<{ bands: string[]; to?: number }> = ({ bands, to = WH }) => (<>
  {bands.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: 0, width: W, background: c,
      top: (i * to) / bands.length, height: to / bands.length + 2, zIndex: 1 }} />
  ))}
</>);

/** the tower: a ladder mast down one side, with the board jutting off it */
const Tower: React.FC<{ x: number; steel: string; deck: string; bx: number; bw: number }> =
  ({ x, steel, deck, bx, bw }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: W, height: WH, zIndex: 12 }}>
    <div style={{ position: "absolute", left: x, top: 250, width: 74, height: 2600,
      background: steel, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x + 62, top: 250, width: 14, height: 2600,
      background: mix(steel, "#000000", 0.34) }} />
    {Array.from({ length: 26 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: x - 34, top: 300 + i * 100, width: 142,
        height: 15, background: mix(steel, "#000000", 0.2) }} />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={`d${i}`} style={{ position: "absolute", left: x - 96, top: 336 + i * 290,
        width: 268, height: 20, background: mix(steel, "#000000", 0.3),
        transform: `rotate(${i % 2 ? 22 : -22}deg)`, transformOrigin: "50% 50%" }} />
    ))}
    <div style={{ position: "absolute", left: bx, top: 250, width: bw, height: 34,
      borderRadius: 6, background: deck, boxShadow: SH, zIndex: 14 }} />
    <div style={{ position: "absolute", left: bx, top: 278, width: bw, height: 12,
      background: mix(deck, "#000000", 0.34), zIndex: 14 }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={`g${i}`} style={{ position: "absolute", left: bx + 24 + i * 46, top: 254,
        width: 24, height: 26, background: mix(deck, "#000000", 0.14), zIndex: 15 }} />
    ))}
  </div>
);

const Cloud: React.FC<{ x: number; y: number; s?: number; c?: string; z?: number; f?: number }> =
  ({ x, y, s = 1, c = "#E6ECF2", z = 6, f = 0 }) => (
  <div style={{ position: "absolute", left: x + Math.sin(f / 26 + x) * 16, top: y, zIndex: z }}>
    {[[0, 22, 150, 56], [64, 0, 116, 78], [150, 26, 118, 52]].map(([a, b, w2, h2], i) => (
      <div key={i} style={{ position: "absolute", left: a * s, top: b * s, width: w2 * s,
        height: h2 * s, borderRadius: 999, background: i === 1 ? c : mix(c, "#000000", 0.06) }} />
    ))}
  </div>
);

/** a single past conversation, drawn as a sheet of rows */
export const Sheet: React.FC<{ x: number; y: number; w: number; h?: number; rows?: number; c?: string;
  rot?: number; z?: number }> = ({ x, y, w, h = 118, rows = 4, c = PAPER, rot = 0, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 9, background: c, boxShadow: SH_S, padding: 16,
    transform: `rotate(${rot}deg)` }}>
    <div style={{ width: 52, height: 52, borderRadius: 14, background: mix(c, "#000000", 0.15),
      position: "absolute", left: 18, top: 18 }} />
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} style={{ position: "absolute",
        left: i % 2 ? 88 : w - 88 - (w - 240) * [0.44, 0.62, 0.5, 0.36][i % 4],
        top: 22 + i * 26, width: (w - 240) * [0.44, 0.62, 0.5, 0.36][i % 4], height: 20,
        borderRadius: 10, background: mix(c, "#000000", i % 2 ? 0.2 : 0.34) }} />
    ))}
  </div>
);

/** speed streaks — solid paint, drawn only while he is actually moving fast */
const Streaks: React.FC<{ f: number; c: string }> = ({ f, c }) => {
  const k = f - C2, v = Math.min(1, Math.max(0, (k - 8) / 16));
  if (v <= 0) return null;
  return (<>
    {Array.from({ length: 9 }, (_, i) => {
      const sp = 210 + rnd(i, 3) * 300;
      return <div key={i} style={{ position: "absolute", left: 8 + rnd(i, 7) * 976,
        top: ((rnd(i, 11) * 900 + k * sp) % 1240) - 300, width: 15 + rnd(i, 17) * 12,
        height: 230 + rnd(i, 5) * 260, borderRadius: 9, background: c, opacity: v * 0.55,
        zIndex: 44 }} />;
    })}
  </>);
};

/* ---------------------------------------------------------------- basins -- */

/** the pool, full of everything he ever said */
const PoolFull: React.FC<{ y: number; wall: string; c1: string; c2: string }> =
  ({ y, wall, c1, c2 }) => (<>
  <div style={{ position: "absolute", left: 0, top: y - 90, width: W, height: 90,
    background: wall, zIndex: 18 }} />
  <div style={{ position: "absolute", left: 0, top: y - 90, width: W, height: 18,
    background: mix(wall, "#FFFFFF", 0.2), zIndex: 19 }} />
  <div style={{ position: "absolute", left: 0, top: y, width: W, height: WH - y,
    background: mix(c2, "#000000", 0.22), zIndex: 18 }} />
  {Array.from({ length: 90 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -60 + rnd(i, 3) * 1090,
      top: y - 26 + rnd(i, 7) * 300, width: 128 + rnd(i, 13) * 60, height: 24,
      borderRadius: 5, background: i % 3 ? c1 : c2, boxShadow: SH_S, zIndex: 20,
      transform: `rotate(${(rnd(i, 11) - 0.5) * 64}deg)` }} />
  ))}
</>);

/** the pool that was drained — tiles, lane lines, one drain */
const PoolEmpty: React.FC<{ y: number; wall: string; tile: string; line: string }> =
  ({ y, wall, tile, line }) => (<>
  <div style={{ position: "absolute", left: 0, top: y - 74, width: W, height: 74,
    background: wall, zIndex: 18 }} />
  <div style={{ position: "absolute", left: 0, top: y - 74, width: W, height: 15,
    background: mix(wall, "#FFFFFF", 0.22), zIndex: 19 }} />
  {[0, 1].map((i) => (
    <div key={`lad${i}`} style={{ position: "absolute", left: i ? W - 140 : 74, top: y - 60,
      width: 66, height: 250, zIndex: 19 }}>
      <div style={{ position: "absolute", left: 0, width: 15, height: 250, background: mix(wall, "#000000", 0.3) }} />
      <div style={{ position: "absolute", left: 51, width: 15, height: 250, background: mix(wall, "#000000", 0.3) }} />
      {[0, 1, 2, 3].map((k) => (
        <div key={k} style={{ position: "absolute", left: 0, top: 40 + k * 56, width: 66,
          height: 13, background: mix(wall, "#000000", 0.42) }} />
      ))}
    </div>
  ))}
  <div style={{ position: "absolute", left: 0, top: y, width: W, height: WH - y,
    background: tile, zIndex: 16 }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 0, top: y + i * 46, width: W, height: 5,
      background: mix(tile, "#000000", 0.12), zIndex: 17 }} />
  ))}
  {[0, 1, 2].map((i) => (
    <div key={`l${i}`} style={{ position: "absolute", left: 176 + i * 300, top: y, width: 34,
      height: 300, background: line, zIndex: 17 }} />
  ))}
  <div style={{ position: "absolute", left: 452, top: y + 200, width: 116, height: 116,
    borderRadius: 999, background: mix(tile, "#000000", 0.34), zIndex: 18 }} />
  {[0, 1, 2, 3].map((i) => (
    <div key={`d${i}`} style={{ position: "absolute", left: 470, top: y + 220 + i * 22, width: 80,
      height: 10, borderRadius: 3, background: mix(tile, "#000000", 0.6), zIndex: 19 }} />
  ))}
</>);


/* ------------------------------------------------------------- vertigo ----
   Shots 1 and 2 are NOT the fall column. Reusing it gave a flat sky with a
   plank in it and no sense of drop, which throws away the only thing the
   opening has to say: it is a very long way down. These two are drawn in
   forced perspective instead — the mast narrows to a vanishing point and the
   thing he is aiming at is small and far away at the bottom of frame.
   ------------------------------------------------------------------------ */
const Vertigo: React.FC<{ f: number; sky: string[]; mast: string; deck: string;
  floor: string; tiny: React.ReactNode; close?: boolean }> =
  ({ f, sky, mast, deck, floor, tiny, close = false }) => {
  const bY = close ? 356 : 306;          // the deck
  const vpY = close ? 792 : 668;         // where the mast disappears
  const mW = close ? 150 : 96;
  const sz = close ? 244 : 196;
  const flex = Math.sin(f / 3.6) * (close ? 9 : 6) * (1 - E(f, C2 - 10, C2 - 2, 0, 1, IO));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {sky.map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 0, width: W, background: c,
          top: (i * vpY) / sky.length, height: vpY / sky.length + 2, zIndex: 2 }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: vpY, width: W, height: H - vpY,
        background: floor, zIndex: 3 }} />
      <div style={{ position: "absolute", left: 0, top: vpY, width: W, height: 12,
        background: mix(floor, "#000000", 0.26), zIndex: 4 }} />

      {/* the mast, running away from us */}
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
        style={{ position: "absolute", left: 0, top: 0, zIndex: 6 }}>
        <polygon fill={mast}
          points={`${close ? -30 : 44},${bY + 32} ${(close ? -30 : 44) + mW},${bY + 32} 462,${vpY} 442,${vpY}`} />
        <polygon fill={mix(mast, "#000000", 0.3)}
          points={`${(close ? -30 : 44) + mW - 22},${bY + 32} ${(close ? -30 : 44) + mW},${bY + 32} 462,${vpY} 456,${vpY}`} />
        {Array.from({ length: 15 }, (_, i) => {
          const u = Math.pow(i / 15, 1.55);
          const x0 = (close ? -30 : 44) + (462 - (close ? -30 : 44)) * u;
          const y0 = bY + 32 + (vpY - bY - 32) * u;
          const w2 = mW * (1 - u) + 10;
          return <rect key={i} x={x0 - w2 * 0.42} y={y0} width={w2 * 1.84} height={Math.max(3, 17 * (1 - u))}
            fill={mix(mast, "#000000", 0.19)} />;
        })}
      </svg>

      {/* the board he is standing on — and it is flexing under him */}
      <div style={{ position: "absolute", left: close ? -60 : 0, top: bY + flex,
        width: close ? 560 : 452, height: close ? 44 : 32, borderRadius: 6, background: deck,
        boxShadow: SH, zIndex: 12 }} />
      <div style={{ position: "absolute", left: close ? -60 : 0, top: bY + flex + (close ? 38 : 28),
        width: close ? 560 : 452, height: close ? 17 : 12,
        background: mix(deck, "#000000", 0.36), zIndex: 12 }} />
      {Array.from({ length: close ? 6 : 8 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: (close ? 26 : 30) + i * (close ? 92 : 56),
          top: bY + flex + 5, width: close ? 44 : 26, height: close ? 32 : 22,
          background: mix(deck, "#000000", 0.13), zIndex: 13 }} />
      ))}

      {/* him, at the very end of it */}
      <div style={{ position: "absolute", left: close ? 372 : 300, top: bY + flex - sz, zIndex: 16,
        transform: `translateY(${E(f, close ? C2 - 9 : 0, close ? C2 - 1 : 1, 0, close ? 14 : 0, IO)}px) scaleY(${1 - E(f, C2 - 9, C2 - 1, 0, 0.14, IO)})`,
        transformOrigin: "50% 100%",
        filter: `drop-shadow(0 ${Math.round(sz * 0.05)}px ${Math.round(sz * 0.08)}px rgba(6,9,14,0.5))` }}>
        <Mascot lf={f} size={sz} gaze={3} shock={0.42} nodAmp={1.8} nodSpeed={13} />
      </div>

      {/* what he is aiming at, small and a long way down */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 8,
        transform: `scale(${close ? 0.6 : 1})`, transformOrigin: "50% 100%" }}>{tiny}</div>
    </div>
  );
};

/* ----------------------------------------------------------------- audio -- */
const A_ = "am/";
const sfxFor = (impact: { src: string; dur: number }): Cue[] => [
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 4.95, from: 2, lead: 0 },
  { at: 0, src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0, src: A_ + "ping-msg.wav", v: LEVELS.SFX_MID, dur: 0.60, lead: 0 },
  ...layer(C1 / 30, { src: A_ + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.55 },
                     { src: A_ + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  // the jump, and then the descent underneath it
  ...layer(C2 / 30, { src: A_ + "whoosh-flyby.wav", v: LEVELS.SFX_HERO, dur: 1.10 },
                     { src: A_ + "punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  { at: C2 / 30 + 0.30, src: A_ + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 2.10, lead: 0 },
  ...layer(C3 / 30, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.20 },
                     { src: A_ + impact.src, v: LEVELS.SFX_MID, dur: impact.dur }),
];

const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {AI5_CUTS.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.24, zIndex: 60 }} />;
  })}
</>);

const wrap = (f: number, glow: string, cues: Cue[], children: React.ReactNode,
  noFlash = false) => {
  const assembled = React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar /><Vo />
      {!assembled && <SfxTrack cues={cues} />}
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(glow, 0.3)}>
        {children}
        {!noFlash && <Flash f={f} />}
      </Panel>
      <Cap />
    </AbsoluteFill>
  );
};

/** the four-shot spine every version shares: wide · toes · fall · landing */
const Dive: React.FC<{ f: number; world: React.ReactNode; streak: string;
  landing: React.ReactNode; boardX: number; sky: string[]; mast: string; deck: string;
  floor: string; tiny: React.ReactNode }> =
  ({ f, world, streak, landing, boardX, sky, mast, deck, floor, tiny }) => {
  const shake = f >= C3 && f < C3 + 14 ? Math.pow(1 - (f - C3) / 14, 2) : 0;
  return (<>
    {/* 1 · up here, and it is a very long way down */}
    {f < C1 && (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden",
        transform: `scale(${1.20 - E(f, 0, C1, 0, 0.17, IO)}) translateY(${-E(f, 0, C1, 0, 96, IO)}px)`,
        transformOrigin: "50% 22%" }}>
        <Vertigo f={f} sky={sky} mast={mast} deck={deck} floor={floor} tiny={tiny} />
      </div>
    )}

    {/* 2 · at the tip of the board, with nothing under him */}
    {f >= C1 && f < C2 && (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden",
        transform: `scale(${1.02 + E(f, C1, C2, 0, 0.05, OUT)})`, transformOrigin: "46% 30%" }}>
        <Vertigo f={f} sky={sky} mast={mast} deck={deck} floor={floor} tiny={tiny} close />
      </div>
    )}

    {/* 3 · the fall. The camera goes with him and the world runs upward. */}
    {f >= C2 && f < C3 && (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Cam y={camOf(f)}>{world}<Diver f={f} x={boardX} y={clawY(f)} size={168} falling /></Cam>
        <Streaks f={f} c={streak} />
      </div>
    )}

    {/* 4 · the landing, and what he landed in */}
    {f >= C3 && (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden",
        transform: `scale(${1.14 - E(f, C3, C3 + 26, 0, 0.1, OUT)}) translate(${Math.sin(f * 2.4) * 22 * shake}px, ${Math.cos(f * 2.1) * 17 * shake}px)`,
        transformOrigin: "50% 56%" }}>
        <Cam y={WH - H}>{world}{landing}</Cam>
      </div>
    )}
  </>);
};

/** the thing at the bottom of the vertigo shots, seen from 30 metres up */
const TinyPool: React.FC<{ full: boolean; c1?: string; c2?: string; tile?: string;
  gold?: boolean }> = ({ full, c1 = PAPER, c2 = PAPER2, tile = "#CDD5DC", gold = false }) => (
  <div style={{ position: "absolute", left: 322, top: 640, width: 372, height: 128, zIndex: 9 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 14,
      background: full ? mix(c2, "#000000", 0.3) : tile, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 10, top: 10, width: 352, height: 108,
      borderRadius: 9, background: full ? mix(c2, "#000000", 0.42) : mix(tile, "#000000", 0.1) }} />
    {gold
      ? Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 14 + rnd(i, 3) * 326,
            top: 14 + rnd(i, 7) * 96, width: 22, height: 22, borderRadius: 999,
            background: i % 3 ? AMB : AMB_L, boxShadow: `0 2px 0 ${AMB_D}` }} />
        ))
      : full
      ? Array.from({ length: 26 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 16 + rnd(i, 3) * 320,
            top: 16 + rnd(i, 7) * 92, width: 40, height: 8, borderRadius: 3,
            background: i % 2 ? c1 : c2, transform: `rotate(${(rnd(i, 11) - 0.5) * 70}deg)` }} />
        ))
      : (<>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 74 + i * 106, top: 14, width: 13,
              height: 100, background: mix(tile, "#000000", 0.22) }} />
          ))}
          <div style={{ position: "absolute", left: 168, top: 50, width: 36, height: 36,
            borderRadius: 999, background: mix(tile, "#000000", 0.44) }} />
        </>)}
  </div>
);


/* ==================================================================== tokens ==
   Alex: it should land in coins, not paper. That is the better read anyway —
   the script's cost line is "you burn tokens reloading the same context", so
   the bill at the bottom of the fall should look like money.
   ========================================================================== */
export const Coin: React.FC<{ x: number; y: number; d: number; flat?: number; rot?: number;
  z?: number; dark?: boolean }> = ({ x, y, d, flat = 0, rot = 0, z = 22, dark = false }) => (
  <div style={{ position: "absolute", left: x, top: y, width: d, height: d, zIndex: z,
    transform: `rotate(${rot}deg) scaleY(${1 - flat * 0.66})` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 999,
      background: dark ? mix(AMB_D, "#000000", 0.24) : AMB_D }} />
    <div style={{ position: "absolute", left: d * 0.08, top: d * 0.08, width: d * 0.84,
      height: d * 0.84, borderRadius: 999, background: dark ? mix(AMB, "#000000", 0.18) : AMB }} />
    <div style={{ position: "absolute", left: d * 0.22, top: d * 0.22, width: d * 0.56,
      height: d * 0.56, borderRadius: 999,
      background: dark ? mix(AMB_L, "#000000", 0.18) : AMB_L }} />
    <div style={{ position: "absolute", left: d * 0.38, top: d * 0.3, width: d * 0.24,
      height: d * 0.4, borderRadius: 3, background: AMB_D }} />
  </div>
);

/** the basin at the bottom, filled with them */
const CoinBasin: React.FC<{ y: number; wall: string; n?: number }> = ({ y, wall, n = 110 }) => (<>
  <div style={{ position: "absolute", left: 0, top: y - 96, width: W, height: 96,
    background: wall, zIndex: 17 }} />
  <div style={{ position: "absolute", left: 0, top: y - 96, width: W, height: 18,
    background: mix(wall, "#FFFFFF", 0.2), zIndex: 18 }} />
  <div style={{ position: "absolute", left: 0, top: y, width: W, height: WH - y,
    background: mix(AMB_D, "#000000", 0.5), zIndex: 17 }} />
  {Array.from({ length: n }, (_, i) => {
    const d = 58 + rnd(i, 19) * 74;
    return <Coin key={i} x={-50 + rnd(i, 3) * 1100} y={y - 34 + rnd(i, 7) * 300} d={d}
      flat={rnd(i, 23)} rot={rnd(i, 11) * 90} z={19 + (i % 3)}
      dark={rnd(i, 29) > 0.72} />;
  })}
</>);

/** coins raining down out of frame-top — the pour */
export const CoinRain: React.FC<{ f: number; from: number; n?: number; top?: number; span?: number }> =
  ({ f, from, n = 16, top = 2760, span = 420 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const k = f - from;
    if (k < 0) return null;
    const q = ((k * (7 + rnd(i, 5) * 5) + rnd(i, 13) * 400) % 400) / 400;
    return <Coin key={i} x={-40 + rnd(i, 3) * 1080} y={top + q * span} d={54 + rnd(i, 17) * 52}
      flat={0.2} rot={q * 400 + i * 40} z={31} />;
  })}
</>);

/* ################################################################ A · THE HIGH BOARD
   Open air the whole way down, and the pool at the bottom is filled with
   every conversation he has already had.
   ############################################################################ */
export const AiDiveA: React.FC = () => {
  const f = useCurrentFrame();
  const world = (<>
    <Sky bands={["#A8C6DC", "#9CBBD4", "#90B0CB", "#87A5C0", "#8098B2", "#7A8CA2", "#75808F"]} />
    <Cloud x={620} y={430} s={1.15} z={6} />
    <Cloud x={-70} y={760} s={0.9} c="#DCE4EC" z={6} />
    <Cloud x={700} y={1090} s={1.3} c="#D6E0E9" z={6} />
    <Cloud x={-40} y={1440} s={1.0} c="#D0DAE4" z={6} />
    <Cloud x={660} y={1790} s={1.15} c="#CAD5E0" z={6} />
    <Cloud x={20} y={2140} s={0.92} c="#C4D0DB" z={6} />
    <Cloud x={640} y={2480} s={1.22} c="#BECBD8" z={6} />
    <Cloud x={-30} y={2820} s={1.0} c="#B8C5D3" z={6} />
    {/* birds, so the empty air still has scale in it */}
    {[[760, 640], [830, 700], [200, 1620], [268, 1676], [800, 2300]].map(([bx, by], i) => (
      <svg key={`bd${i}`} viewBox="0 0 60 24" width={60} height={24}
        style={{ position: "absolute", left: bx, top: by, zIndex: 7 }}>
        <path d="M2 16 L16 4 L30 16 L44 4 L58 16" stroke="#6F7C8C" strokeWidth={5}
          fill="none" strokeLinecap="square" />
      </svg>
    ))}
    <Tower x={40} steel="#B8BEC6" deck="#D8DCE2" bx={114} bw={352} />
    <PoolFull y={3218} wall="#8E96A2" c1={PAPER} c2={PAPER2} />
  </>);
  const landing = (<>
    {Array.from({ length: 26 }, (_, i) => {
      const q = E(f, C3, C3 + 22, 0, 1, OUT), a = (i / 26) * Math.PI * 2;
      return <div key={i} style={{ position: "absolute", left: 470 + Math.cos(a) * q * 470,
        top: 3140 - Math.abs(Math.sin(a)) * q * 300 + q * q * 130, width: 132, height: 24,
        borderRadius: 5, background: i % 2 ? PAPER : PAPER2, boxShadow: SH_S, zIndex: 30,
        transform: `rotate(${a * 57}deg)` }} />;
    })}
    <div style={{ position: "absolute", left: 396, top: 3172, zIndex: 28,
      transform: `scale(${E(f, C3, C3 + 10, 1.3, 1, OUT)}, ${E(f, C3, C3 + 10, 0.6, 1, BACK)})` }}>
      <Mascot lf={f} size={182} gaze={1} shock={0.8} nodAmp={1.6} nodSpeed={14} />
    </div>
  </>);
  return wrap(f, RED, sfxFor({ src: "paper-rustle.wav", dur: 1.10 }),
    <Dive f={f} world={world} streak="#C6D6E4" landing={landing} boardX={192}
      sky={["#A8C6DC", "#9EBCD4", "#93B0CA", "#89A4BE", "#8098B2"]} mast="#B8BEC6"
      deck="#D8DCE2" floor="#8A8F98" tiny={<TinyPool full />} />);
};

/* ############################################################ B · THE PUNCH-THROUGH
   He does not fall past his old chats — he goes THROUGH them, one after
   another, and each one bursts. That is the token bill, made physical.
   ############################################################################ */
export const AiDiveB: React.FC = () => {
  const f = useCurrentFrame();
  const LAYERS = Array.from({ length: 10 }, (_, i) => 560 + i * 262);
  const world = (<>
    <Sky bands={["#C3B7A2", "#B9AC96", "#AFA28C", "#A69882", "#9C8E78", "#93856F", "#8A7C67"]} />
    <Tower x={44} steel="#A9A08E" deck="#D6CDBA" bx={118} bw={352} />
    {LAYERS.map((y, i) => {
      const hit = clawY(f) > y + 40;
      return hit ? (
        <React.Fragment key={i}>
          <Sheet x={-96} y={y} w={470} rows={4} c={i % 2 ? PAPER : PAPER2}
                 rot={-19} z={20} />
          <Sheet x={630} y={y + 26} w={470} rows={4} c={i % 2 ? PAPER2 : PAPER}
                 rot={17} z={20} />
        </React.Fragment>
      ) : (
        <Sheet key={i} x={26} y={y} w={960} h={132} rows={4} c={i % 2 ? PAPER : PAPER2} z={20} />
      );
    })}
    <div style={{ position: "absolute", left: 0, top: 3128, width: W, height: WH - 3128,
      background: "#6E6355", zIndex: 16 }} />
    {Array.from({ length: 42 }, (_, i) => (
      <div key={`h${i}`} style={{ position: "absolute", left: -60 + rnd(i, 3) * 1090,
        top: 3096 + rnd(i, 7) * 250, width: 136, height: 24, borderRadius: 5,
        background: i % 2 ? PAPER : PAPER2, boxShadow: SH_S, zIndex: 21,
        transform: `rotate(${(rnd(i, 11) - 0.5) * 66}deg)` }} />
    ))}
  </>);
  const landing = (<>
    {Array.from({ length: 22 }, (_, i) => {
      const q = E(f, C3, C3 + 20, 0, 1, OUT), a = (i / 22) * Math.PI * 2;
      return <div key={i} style={{ position: "absolute", left: 470 + Math.cos(a) * q * 440,
        top: 3110 - Math.abs(Math.sin(a)) * q * 250 + q * q * 120, width: 130, height: 23,
        borderRadius: 5, background: PAPER, boxShadow: SH_S, zIndex: 30,
        transform: `rotate(${a * 57}deg)` }} />;
    })}
    <div style={{ position: "absolute", left: 400, top: 3128, zIndex: 28,
      transform: `scale(${E(f, C3, C3 + 10, 1.32, 1, OUT)}, ${E(f, C3, C3 + 10, 0.58, 1, BACK)})` }}>
      <Mascot lf={f} size={182} gaze={0} shock={0.85} nodAmp={1.6} nodSpeed={14} />
    </div>
  </>);
  return wrap(f, AMB, sfxFor({ src: "paper-slide.wav", dur: 0.63 }),
    <Dive f={f} world={world} streak="#E3D8C4" landing={landing} boardX={196}
      sky={["#C3B7A2", "#B7AA94", "#AB9E88", "#9F927C", "#948671"]} mast="#A9A08E"
      deck="#D6CDBA" floor="#7C7161" tiny={<TinyPool full />} />);
};

/* ############################################################# C · THE ARCHIVE SHAFT
   He drops down a shaft lined with everything he has ever been told, all of
   it rushing past, and at the bottom the notebook is open and waiting.
   ############################################################################ */
export const AiDiveC: React.FC = () => {
  const f = useCurrentFrame();
  const world = (<>
    <Sky bands={["#8E97A4", "#828B98", "#78818E", "#6E7784", "#666E7A", "#5E6672", "#575E69"]} />
    {/* both walls, shelved the whole way down */}
    {[0, 1].map((s) =>
      Array.from({ length: 13 }, (_, r) => (
        <div key={`${s}-${r}`} style={{ position: "absolute", left: s ? W - 268 : 0,
          top: 420 + r * 236, width: 268, height: 200, zIndex: 14 }}>
          <div style={{ position: "absolute", left: 0, top: 168, width: 268, height: 32,
            background: "#7A6A52" }} />
          <div style={{ position: "absolute", left: 0, top: 192, width: 268, height: 12,
            background: "#59492F" }} />
          {Array.from({ length: 3 }, (_, c) => (
            <div key={c} style={{ position: "absolute", left: 14 + c * 84, top: 34, width: 68,
              height: 134, background: (c + r) % 2 ? PAPER : PAPER2, boxShadow: SH_S }}>
              <div style={{ width: 68, height: 30, background: AMB }} />
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ position: "absolute", left: 10, top: 46 + k * 20,
                  width: 48 - k * 10, height: 9, background: mix(PAPER2, "#000000", 0.26) }} />
              ))}
            </div>
          ))}
        </div>
      )))}
    {/* the lit mouth of the shaft, way up above him */}
    <div style={{ position: "absolute", left: 268, top: 250, width: W - 536, height: 40,
      background: "#C9D2DA", zIndex: 15 }} />
    <Tower x={286} steel="#9AA3AE" deck="#CBD3DB" bx={330} bw={352} />
    {Array.from({ length: 15 }, (_, i) => (
      <div key={`b${i}`} style={{ position: "absolute", left: 292, top: 470 + i * 190, width: 428,
        height: 16, background: "#4C535D", zIndex: 13 }} />
    ))}
    <div style={{ position: "absolute", left: 0, top: 3168, width: W, height: WH - 3168,
      background: "#3F454E", zIndex: 16 }} />
  </>);
  const landing = (<>
    <div style={{ position: "absolute", left: 306, top: 2932, zIndex: 24,
      transform: `scale(${E(f, C3, C3 + 14, 0.8, 1, BACK)})`, transformOrigin: "50% 100%" }}>
      <div style={{ width: 400, height: 300, borderRadius: 26, background: "#241D16",
        boxShadow: SH, padding: 22, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 12 }}>
        <Img src={staticFile(NBLM)} style={{ width: 120, height: 120, objectFit: "contain",
          filter: "invert(1)" }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ height: 22, borderRadius: 5, width: `${[100, 82, 92][i]}%`,
            background: f - C3 > 6 + i * 5 ? GO_L : "#3B3128" }} />
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", left: 414, top: 2882, zIndex: 30,
      transform: `scale(${E(f, C3, C3 + 10, 1.28, 1, OUT)}, ${E(f, C3, C3 + 10, 0.62, 1, BACK)})` }}>
      <Mascot lf={f} size={178} gaze={2} cheer={0.9} nodAmp={3} nodSpeed={9} />
    </div>
    {Array.from({ length: 14 }, (_, i) => {
      const q = E(f, C3, C3 + 18, 0, 1, OUT), a = (i / 14) * Math.PI - 0.1;
      return <div key={i} style={{ position: "absolute", left: 470 + Math.cos(a) * q * 400,
        top: 2960 - Math.sin(a) * q * 210, width: 54, height: 54, borderRadius: 14,
        background: GO_L, boxShadow: SH_S, zIndex: 26, opacity: 1 - q * 0.3 }} />;
    })}
  </>);
  return wrap(f, GO, sfxFor({ src: "positive-chime.wav", dur: 1.10 }),
    <Dive f={f} world={world} streak="#AAB4C0" landing={landing} boardX={462}
      sky={["#BAC3CD", "#AEB7C2", "#A2ABB7", "#969FAC", "#8B94A1"]} mast="#CBD3DB"
      deck="#E0E6EC" floor="#6E7885"
      tiny={<TinyPool full c1={GO_L} c2="#2C3038" />} />);
};

/* ############################################################### D · THE EMPTY POOL
   The same tower, the same dive — and the pool that should be holding all of
   it has been drained. He hits bare tile. Nothing was kept.
   ############################################################################ */
export const AiDiveD: React.FC = () => {
  const f = useCurrentFrame();
  const world = (<>
    <Sky bands={["#B7C4CE", "#ACB9C4", "#A2AFBA", "#98A5B0", "#8E9BA6", "#85919C", "#7D8892"]} />
    <Cloud x={640} y={470} s={1.1} z={6} />
    <Cloud x={-40} y={1120} s={0.95} c="#DCE4EC" z={6} />
    <Cloud x={680} y={1820} s={1.2} c="#CFD9E2" z={6} />
    <Tower x={40} steel="#B4BAC2" deck="#D6DAE0" bx={114} bw={352} />
    <PoolEmpty y={3128} wall="#9AA4AE" tile="#CDD5DC" line="#8E9AA6" />
  </>);
  const landing = (<>
    {Array.from({ length: 20 }, (_, i) => {
      const q = E(f, C3, C3 + 24, 0, 1, OUT), a = (i / 20) * Math.PI - 0.05;
      return <div key={i} style={{ position: "absolute", left: 468 + Math.cos(a) * q * 480,
        top: 3172 - Math.sin(a) * q * 90, width: 74 + rnd(i, 3) * 60, height: 40,
        borderRadius: 999, background: "#BAC3CB", zIndex: 26, opacity: (1 - q) * 0.95 }} />;
    })}
    <div style={{ position: "absolute", left: 402, top: 3116, zIndex: 30,
      transform: `scale(${E(f, C3, C3 + 12, 1.4, 1, OUT)}, ${E(f, C3, C3 + 12, 0.5, 1, BACK)})` }}>
      <Mascot lf={f} size={180} gaze={1} shock={0.9} nodAmp={1.4} nodSpeed={15} />
    </div>
    <div style={{ position: "absolute", left: 336, top: 3082, width: 316, height: 22,
      borderRadius: 999, background: "#A8B2BB", zIndex: 25,
      transform: `scaleX(${E(f, C3, C3 + 16, 0.2, 1, OUT)})` }} />
  </>);
  return wrap(f, RED, sfxFor({ src: "hit-up.wav", dur: 1.20 }),
    <Dive f={f} world={world} streak="#D2DCE4" landing={landing} boardX={192}
      sky={["#B7C4CE", "#ACB9C4", "#A1AEB9", "#96A3AE", "#8C99A4"]} mast="#B4BAC2"
      deck="#D6DAE0" floor="#8E98A2" tiny={<TinyPool full={false} />} />);
};

/* ============================================================ B · INTO THE TOKENS
   Alex's note on B: it should land in coins, not paper. Three versions of the
   bottom, on the same fall — he still bursts through every past conversation
   on the way down, but now what is waiting is the bill for them.

   Sound follows the same logic. The descent gets an accelerating token tick
   underneath the riser, so you HEAR the meter running before you see it, and
   the landing is a three-layer money stack instead of a paper rustle.
   ========================================================================== */

/** ticks that speed up as he falls — the meter running */
const TICKS = [0.24, 0.50, 0.72, 0.91, 1.07, 1.21, 1.33, 1.43, 1.51, 1.58, 1.64].map((s, i) => ({
  at: C2 / 30 + s, src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE * db(-5 + i * 0.6),
  dur: 0.14, lead: 0,
})) as Cue[];

const sfxCoin = (impact: Cue[]): Cue[] => [
  { at: 0, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 4.95, from: 2, lead: 0 },
  { at: 0, src: "am/hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0, src: "am/ping-msg.wav", v: LEVELS.SFX_MID, dur: 0.60, lead: 0 },
  ...layer(C1 / 30, { src: "am/whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.55 },
                     { src: "am/click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  ...layer(C2 / 30, { src: "am/whoosh-flyby.wav", v: LEVELS.SFX_HERO, dur: 1.10 },
                     { src: "am/punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  { at: C2 / 30 + 0.30, src: "am/riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.94, lead: 0 },
  ...TICKS,
  ...impact,
];

/** the shared B world, with the paper heap swapped for a basin of tokens */
const worldB = (f: number) => {
  const LAYERS = Array.from({ length: 10 }, (_, i) => 560 + i * 262);
  return (<>
    <Sky bands={["#C3B7A2", "#B9AC96", "#AFA28C", "#A69882", "#9C8E78", "#93856F", "#8A7C67"]} />
    <Tower x={44} steel="#A9A08E" deck="#D6CDBA" bx={118} bw={352} />
    {LAYERS.map((y, i) => {
      const hit = clawY(f) > y + 40;
      return hit ? (
        <React.Fragment key={i}>
          <Sheet x={-96} y={y} w={470} rows={4} c={i % 2 ? PAPER : PAPER2} rot={-19} z={20} />
          <Sheet x={630} y={y + 26} w={470} rows={4} c={i % 2 ? PAPER2 : PAPER} rot={17} z={20} />
        </React.Fragment>
      ) : (
        <Sheet key={i} x={26} y={y} w={960} h={132} rows={4} c={i % 2 ? PAPER : PAPER2} z={20} />
      );
    })}
    <CoinBasin y={3128} wall="#7C7161" />
  </>);
};

const diveB = (f: number, landing: React.ReactNode, impact: Cue[]) =>
  wrap(f, AMB, sfxCoin(impact),
    <Dive f={f} world={worldB(f)} streak="#E3D8C4" landing={landing} boardX={196}
      sky={["#C3B7A2", "#B7AA94", "#AB9E88", "#9F927C", "#948671"]} mast="#A9A08E"
      deck="#D6CDBA" floor="#7C7161" tiny={<TinyPool full gold />} />);

/** he hits the surface and the whole pile goes up. hit · metal · scatter. */
export const AiDiveB1: React.FC = () => {
  const f = useCurrentFrame();
  const landing = (<>
    {Array.from({ length: 30 }, (_, i) => {
      const q = E(f, C3, C3 + 24, 0, 1, OUT), a = (i / 30) * Math.PI * 2;
      const d = 56 + rnd(i, 19) * 66;
      return <Coin key={i} d={d} x={470 + Math.cos(a) * q * 520 - d / 2}
        y={3106 - Math.abs(Math.sin(a)) * q * 340 + q * q * 190} rot={q * 340 + i * 24}
        flat={0.15} z={32} />;
    })}
    <div style={{ position: "absolute", left: 400, top: 3120, zIndex: 28,
      transform: `scale(${E(f, C3, C3 + 10, 1.32, 1, OUT)}, ${E(f, C3, C3 + 10, 0.58, 1, BACK)})` }}>
      <Mascot lf={f} size={182} gaze={0} shock={0.85} nodAmp={1.6} nodSpeed={14} />
    </div>
  </>);
  return diveB(f, landing, [
    ...layer(C3 / 30, { src: "am/hit-boom.wav", v: db(-5), dur: 1.20 },
                       { src: "am/coin-drop.wav", v: db(-8), dur: 1.00 }),
    { at: C3 / 30 + 0.13, src: "am/coin-spin.wav", v: LEVELS.SFX_MID, dur: 1.30, lead: 0 },
    { at: C3 / 30 + 0.26, src: "am/cash-register.wav", v: LEVELS.SFX_TEXTURE * db(-2), dur: 1.10, lead: 0 },
  ]);
};

/** stacked towers of them, and he takes the lot down */
export const AiDiveB2: React.FC = () => {
  const f = useCurrentFrame();
  const STACKS = [[70, 9], [246, 13], [430, 7], [612, 12], [808, 10]] as const;
  const landing = (<>
    {STACKS.map(([sx, n], s) => {
      const fall = E(f, C3 + s, C3 + 20 + s, 0, 1, OUT);
      const dir = s % 2 ? 1 : -1;
      return Array.from({ length: n }, (_, i) => (
        <Coin key={`${s}-${i}`} d={104} x={sx + fall * dir * (40 + i * 34)}
          y={3096 - i * 26 + fall * fall * (i * 26 + 30)} flat={0.62}
          rot={fall * dir * (30 + i * 12)} z={26 + i} />
      ));
    })}
    <div style={{ position: "absolute", left: 400, top: 3092, zIndex: 34,
      transform: `scale(${E(f, C3, C3 + 10, 1.3, 1, OUT)}, ${E(f, C3, C3 + 10, 0.6, 1, BACK)})` }}>
      <Mascot lf={f} size={182} gaze={0} shock={0.85} nodAmp={1.6} nodSpeed={14} />
    </div>
  </>);
  return diveB(f, landing, [
    ...layer(C3 / 30, { src: "am/hit-boom.wav", v: db(-5), dur: 1.20 },
                       { src: "am/coin-drop.wav", v: db(-8), dur: 1.00 }),
    { at: C3 / 30 + 0.18, src: "am/coin-spin.wav", v: db(-12), dur: 1.40, lead: 0 },
    { at: C3 / 30 + 0.42, src: "am/coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.90, lead: 0 },
  ]);
};

/** it keeps pouring after he lands, until he is under it */
export const AiDiveB3: React.FC = () => {
  const f = useCurrentFrame();
  const rise = E(f, C3 + 4, C3 + 28, 0, 1, IO);
  const landing = (<>
    {Array.from({ length: 18 }, (_, i) => {
      const q = E(f, C3, C3 + 18, 0, 1, OUT), a = (i / 18) * Math.PI - 0.05;
      const d = 58 + rnd(i, 19) * 50;
      return <Coin key={`s${i}`} d={d} x={470 + Math.cos(a) * q * 440 - d / 2}
        y={3110 - Math.sin(a) * q * 230} rot={q * 300} flat={0.2} z={30} />;
    })}
    <div style={{ position: "absolute", left: 400, top: 3122, zIndex: 26,
      transform: `scale(${E(f, C3, C3 + 10, 1.32, 1, OUT)}, ${E(f, C3, C3 + 10, 0.58, 1, BACK)})` }}>
      <Mascot lf={f} size={182} gaze={0} shock={0.9} nodAmp={1.4} nodSpeed={15} />
    </div>
    <CoinRain f={f} from={C3} n={20} top={2820} span={400} />
    {/* the level coming up over him */}
    {Array.from({ length: 64 }, (_, i) => {
      const d = 62 + rnd(i, 19) * 62;
      return <Coin key={`r${i}`} d={d} x={-50 + rnd(i, 3) * 1100}
        y={3300 - rise * (200 + rnd(i, 7) * 190)} flat={rnd(i, 23) * 0.7}
        rot={rnd(i, 11) * 90} z={33} dark={rnd(i, 29) > 0.7} />;
    })}
  </>);
  return diveB(f, landing, [
    ...layer(C3 / 30, { src: "am/hit-boom.wav", v: db(-5), dur: 1.20 },
                       { src: "am/coin-drop.wav", v: db(-8), dur: 1.00 }),
    { at: C3 / 30 + 0.15, src: "am/coin-spin.wav", v: db(-12), dur: 1.40, lead: 0 },
    { at: C3 / 30 + 0.34, src: "am/coin-drop.wav", v: db(-13), dur: 1.00, lead: 0 },
    { at: C3 / 30 + 0.55, src: "am/cash-register.wav", v: LEVELS.SFX_TEXTURE, dur: 1.10, lead: 0 },
  ]);
};

/* ==================================================================== ONE TAKE ==
   Alex on B3: "I don't like how there's camera cuts — it should just be one
   camera shot following the Claude guy, and after he lands he should bounce
   up too."

   So this version has NO cuts at all. One camera, 4.87 seconds, locked to him
   from the board to the basin:

     0.00-0.93  on the board, bouncing on it, the camera drifting down to
                show what is under him
     0.93       he goes
     0.93-3.27  the fall — the camera tracks him, the chats come up and burst
     3.27       into the tokens
     3.27-4.13  he BOUNCES back out of them, spraying coins
     4.13-4.87  comes down, and it keeps pouring until he is under it

   The house rule is 3+ shots in the first 5 seconds, which this deliberately
   breaks. That rule exists to stop a static opener, and a tracked fall is the
   opposite of static — it measures 26+ against a bar of 4. Recorded, not hidden.
   ============================================================================ */
const J = 28, TOP1 = 214, WH1 = 3600, CAM_MAX = WH1 - H;
const DECK = 250, SZ = 186;
/* ⛔ The Mascot's legs end at y=184 of a 200-unit viewBox, so its FEET are at
   0.92 of the box, not 1.0 — and `shock` near 0.35 adds a built-in 34px hop
   (`jump` in SlopKit). Standing him at `deck - size` with shock=0.3 floated him
   a clear 50px above the plank. Feet go on the deck; standing shock is 0. */
const FEET = 184 / 200;
const STAND = DECK - SZ * FEET;
const SURF = 3235;                                // the top of the token pile
export const G = ACC;
const LAUNCH_V = 15, REST = 0.54, REL = 5;

/* ---------------------------------------------------------------- physics --
   Alex: "make it real physics." So none of this is hand-keyed any more.

   The board is a CANTILEVER: fixed at the root, free at the tip, and the tip is
   where he stands. He bounces it, loads it, and it whips him off — the release
   is continuous, and afterwards the board rings down as a damped cosine, which
   is what a real board does once the load leaves it.

   Everything that leaves the ground after that — him, and every single coin —
   runs through ONE ballistic solver with restitution, so bounce heights decay
   by a coefficient instead of by taste.
   ------------------------------------------------------------------------- */

/** tip displacement of the board, px, positive = bent down */
const boardBend = (f: number) => {
  if (f < 16) return Math.sin(f / 4.4) * (4 + f * 0.55);        // warming it up
  if (f < J - REL) { const u = (f - 16) / (J - REL - 16); return 12 + u * u * 52; }
  if (f < J) { const u = (f - (J - REL)) / REL; return 64 - u * u * 100; }  // the whip
  const k = f - J;
  return -36 * Math.cos(k / 3.0) * Math.exp(-k / 8);            // ringing down
};

/** inverse of the drag fall, so the landing frame is solved rather than guessed */
const invFy = (d: number) => {
  const dt = 0.5 * ACC * KT * KT;
  return d <= dt ? Math.sqrt((2 * d) / ACC) : KT + (d - dt) / VMAX;
};

/** y at time t, bouncing off `floor` with restitution `e` */
export const ballistic = (t: number, y0: number, v0: number, g: number, floor: number, e: number) => {
  let y = y0, v = v0, tt = t;
  for (let n = 0; n < 14; n++) {
    /* ⛔ Starting exactly ON the floor moving down solves time-to-contact as 0,
       and the guard below then hands back a free-fall position — the diver went
       straight through the pile. Contact has to be resolved before it. */
    if (y >= floor - 1e-6 && v > 0) {
      v = -v * e;
      if (Math.abs(v) < 1.0) return floor;
      y = floor;
      continue;
    }
    const disc = v * v + 2 * g * (floor - y);
    if (disc <= 0) return y + v * tt + 0.5 * g * tt * tt;
    const th = (-v + Math.sqrt(disc)) / g;
    if (th <= 0 || th > tt) return y + v * tt + 0.5 * g * tt * tt;
    tt -= th; v = -(v + g * th) * e; y = floor;
    if (Math.abs(v) < 1.0) return floor;
  }
  return floor;
};

const Y_LAUNCH = STAND + boardBend(J);
const UP_T = LAUNCH_V / G;
const APEX = Y_LAUNCH - (LAUNCH_V * LAUNCH_V) / (2 * G);
const LAND1 = SURF - SZ * FEET;   // his div top when his feet rest on the pile
const KD_LAND = invFy(LAND1 - APEX);
const LAND_F = Math.round(J + UP_T + KD_LAND);

/** his y for the whole take: on the board · thrown up · terminal fall · bounces */
const oneY = (f: number) => {
  if (f < J) return STAND + boardBend(f);
  const k = f - J;
  if (k < UP_T) return Y_LAUNCH - (LAUNCH_V * k - 0.5 * G * k * k);
  const kd = k - UP_T;
  if (kd < KD_LAND) return APEX + fy(kd);
  return ballistic(kd - KD_LAND, LAND1, VMAX, G, LAND1, REST);
};
/* ⛔ A camera rigidly locked to the subject CANCELS the subject's motion. While
   he was falling that is exactly what you want — the world rushes past him. The
   moment he lands it is wrong: his bounce was solving correctly and measuring
   zero on screen, because the camera bounced with him. So the camera lets go at
   the landing, settles on the pit, and he bounces inside the frame. */
const CAM_LAND = Math.max(0, Math.min(CAM_MAX, LAND1 - 296));
const oneCam = (f: number) =>
  f < J ? E(f, 0, J, -54, 26, IO)
  : f < LAND_F ? Math.max(0, Math.min(CAM_MAX, oneY(f) - 296))
  : Math.min(CAM_MAX, CAM_LAND + E(f, LAND_F, LAND_F + 26, 0, 62, OUT));

/** the board, drawn as a bending cantilever rather than a plank that translates */
const Board: React.FC<{ f: number }> = ({ f }) => {
  const b = boardBend(f);
  const X0 = 108, X1 = 556, Y = DECK - 60, TH = 38;
  const curve = (dy: number) =>
    `M${X0},${Y + dy} Q${(X0 + X1) / 2 + 40},${Y + b * 0.22 + dy} ${X1},${Y + b + dy}`;
  return (
    <svg viewBox={`0 0 ${W} 460`} width={W} height={460} shapeRendering="geometricPrecision"
      style={{ position: "absolute", left: 0, top: 60, zIndex: 14 }}>
      <rect x={X0 - 30} y={Y + 20} width={96} height={128} fill="#8A8271" />
      <rect x={X0 - 30} y={Y + 20} width={96} height={13} fill="#A79E8B" />
      <rect x={X0 + 92} y={Y + 30} width={54} height={28} fill="#6F6858" />
      <path d={`${curve(0)} L${X1},${Y + b + TH} ${curve(TH).replace("M", "L").split("Q")[0]}
                Q${(X0 + X1) / 2 + 40},${Y + b * 0.22 + TH} ${X0},${Y + TH} Z`} fill="#D6CDBA" />
      <path d={`${curve(TH - 9)} L${X1},${Y + b + TH} Q${(X0 + X1) / 2 + 40},${Y + b * 0.22 + TH} ${X0},${Y + TH} Z`}
        fill="#A79E8B" />
      {Array.from({ length: 6 }, (_, i) => {
        const u = 0.14 + i * 0.135;
        const px = X0 + (X1 - X0) * u;
        const py = Y + b * (u * u * 0.78 + u * 0.22);
        return <rect key={i} x={px - 17} y={py + 5} width={34} height={19}
          fill={i > 3 ? AMB : "#BDB49F"}
          transform={`rotate(${(b / 480) * 30 * u} ${px} ${py})`} />;
      })}
      {/* a hazard band on the last stretch of board — the eye lands here first */}
      {Array.from({ length: 5 }, (_, i) => {
        const u = 0.78 + i * 0.045;
        const px = X0 + (X1 - X0) * u;
        const py = Y + b * (u * u * 0.78 + u * 0.22);
        return <rect key={`h${i}`} x={px - 9} y={py} width={17} height={TH}
          fill={i % 2 ? AMB : "#2E2822"} transform={`skewX(-22) translate(${py * 0.4} 0)`} />;
      })}
    </svg>
  );
};

const Faller: React.FC<{ f: number; x: number }> = ({ f, x }) => {
  const y = oneY(f), b = f - LAND_F, bend = boardBend(f);
  const load = f < J ? Math.max(0, Math.min(1, (bend - 12) / 52)) : 0;
  const spin = f < J ? 0 : Math.min(1, (f - J) / 20);
  const flying = f < LAND_F;
  const hit = b >= 0 && b < 7 ? Math.pow(1 - b / 7, 2) : 0;
  const rot = f < J ? (bend / 480) * 26
                    : (flying ? spin * 352 + Math.sin((f - J) / 7) * spin * 10 : 0);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 40,
      transform: `rotate(${rot}deg) scale(${1 + hit * 0.28 + load * 0.07}, ${1 - load * 0.2 - hit * 0.32})`,
      transformOrigin: "50% 97%",
      filter: "drop-shadow(0 9px 14px rgba(6,9,14,0.55))" }}>
      <Mascot lf={f} size={SZ} gaze={flying ? 0 : 3}
              shock={flying ? 0.85 : 0.85}
              cheer={b > 3 && b < 34 ? 0.7 : 0} nodAmp={0} nodSpeed={12} />
    </div>
  );
};


/** THE ERUPTION.
    Alex: "the coins need to come up — I don't need realistic physics for that
    coming-up part." Correct. The restitution solver is right for a body landing
    and wrong for a payoff: it threw coins a polite 200px and the moment read as
    a thud. This is a deliberate cartoon fountain — a wide fan, a tall column up
    the middle, and a ring travelling out along the surface. Big arcs, big coins,
    launched hard enough to leave frame. */
const Erupt: React.FC<{ f: number; at: number; cx: number; cy: number; n?: number }> =
  ({ f, at, cx, cy, n = 62 }) => {
  const t2 = f - at;
  if (t2 < 0) return null;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const col = i % 5 === 0;                              // the central column
      const a = col ? -Math.PI / 2 + (rnd(i, 5) - 0.5) * 0.34
                    : -Math.PI * (0.06 + 0.88 * rnd(i, 3));
      const sp = (col ? 46 : 26) * (0.7 + rnd(i, 7) * 1.05);
      const g2 = 2.5 + rnd(i, 29) * 0.9;
      const d = 66 + rnd(i, 19) * 84;                       // big enough to read
      const lag = rnd(i, 37) * 5;
      const k = Math.max(0, t2 - lag);
      const x = cx + Math.cos(a) * sp * k * 1.05;
      const y = cy + Math.sin(a) * sp * k + 0.5 * g2 * k * k;
      return <Coin key={i} d={d} x={x - d / 2} y={y - d / 2}
        rot={k * (11 + rnd(i, 13) * 20) * (i % 2 ? 1 : -1)}
        flat={0.1} z={i % 3 === 0 ? 44 : 33} dark={rnd(i, 31) > 0.8} />;
    })}
    {/* the ring travelling out along the surface */}
    {Array.from({ length: 16 }, (_, i) => {
      const q = Math.min(1, t2 / 20), side = i % 2 ? 1 : -1;
      const d = 60 + rnd(i, 23) * 46;
      return <Coin key={`r${i}`} d={d} x={cx + side * q * (140 + rnd(i, 11) * 460) - d / 2}
        y={cy - 26 - Math.sin(q * Math.PI) * (60 + rnd(i, 17) * 90)} rot={q * 300 * side}
        flat={0.45} z={30} />;
    })}
  </>);
};

/** the spray — every coin its own ballistic arc, settling flat where it lands */
const Splash: React.FC<{ f: number; at: number; n: number; cx: number; cy: number;
  pw: number; z?: number }> = ({ f, at, n, cx, cy, pw, z = 34 }) => {
  const t2 = f - at;
  if (t2 < 0) return null;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const a = -Math.PI * (0.06 + 0.88 * rnd(i, 3));
      const sp = pw * (0.5 + rnd(i, 7) * 0.8);
      const d = 54 + rnd(i, 19) * 66;
      const floor = cy + 24 + rnd(i, 23) * 160;
      const x = cx + Math.cos(a) * sp * t2 * (1 - Math.min(0.5, t2 * 0.008));
      const y = ballistic(t2, cy, Math.sin(a) * sp, G, floor, 0.34);
      const rest = y >= floor - 0.5;
      return <Coin key={i} d={d} x={x - d / 2} y={y - d / 2}
        rot={rest ? rnd(i, 11) * 90 : t2 * (7 + rnd(i, 13) * 15) * (i % 2 ? 1 : -1)}
        flat={rest ? 0.55 + rnd(i, 29) * 0.35 : 0.12} z={z} dark={rnd(i, 31) > 0.76} />;
    })}
  </>);
};

/** the hook's cue table, exported so the full assembly can own the mix */
export const ONE_CUES: Cue[] = [
    { at: 0, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 4.95, from: 2, lead: 0 },
    { at: 0, src: "am/hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
    { at: 0, src: "am/ping-msg.wav", v: LEVELS.SFX_MID, dur: 0.60, lead: 0 },
    // him working the board before he goes: two taps, then it loads
    { at: 0.30, src: "am/click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.18, lead: 0 },
    { at: 0.62, src: "am/click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.18, lead: 0 },
    /* ⛔ THE JUMP was whoosh-flyby as its hero and it sounded wrong, because a
       flyby is a DOPPLER PASS — the gesture of something crossing the camera, not
       of a body leaving a springboard. A board launch is mechanical: it loads, it
       releases upward, then the body accelerates away. So: a low creak under the
       load, a RISING hit on the release, and the whoosh AFTER it rather than on
       it. */
    { at: J / 30 - 0.36, src: "am/gear-stutter.wav", v: db(-26), dur: 0.40, rate: 0.70, lead: 0 },
    ...layer(J / 30, { src: "am/hit-up.wav", v: db(-5), dur: 0.95, rate: 1.15 },
                      { src: "am/snap.wav", v: db(-15), dur: 0.30, rate: 1.1 }),
    { at: J / 30, src: "am/punch.wav", v: db(-13), dur: 0.22, rate: 0.80, lead: 0 },
    { at: J / 30 + 0.09, src: "am/whoosh-fast.wav", v: db(-13), dur: 0.50, lead: 0 },
    { at: J / 30 + 0.26, src: "am/riser-metal.wav", v: LEVELS.SFX_MID, dur: 2.06, lead: 0 },
    // the meter running, accelerating all the way down
    ...[0.36, 0.66, 0.92, 1.15, 1.35, 1.52, 1.67, 1.80, 1.91, 2.00, 2.07, 2.13].map((s, i) => ({
      at: J / 30 + s, src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE * db(-5 + i * 0.6),
      dur: 0.14, lead: 0,
    })),
    /* THE SPLASH. One hit plus one coin-drop read as a thud — Alex: "needs to
       sound bigger and more interesting, not so subtle". A pile of metal does not
       make one sound, it makes a CASCADE: the body impact, the mass moving, then
       coins scattering and settling over about a second. Eight layers, pitch
       walked up as the pieces get smaller, per the house pitch-vary rule. */
    ...layer(LAND_F / 30, { src: "am/hit-boom.wav", v: db(-4), dur: 1.30, rate: 0.86 },
                          { src: "am/coin-drop.wav", v: db(-6), dur: 1.10 }),
    { at: LAND_F / 30 + 0.06, src: "am/coin-spin.wav", v: db(-9), dur: 1.30, rate: 1.12, lead: 0 },
    { at: LAND_F / 30 + 0.13, src: "am/coin-drop.wav", v: db(-9), dur: 0.95, rate: 1.26, lead: 0 },
    { at: LAND_F / 30 + 0.23, src: "am/coin-spin.wav", v: db(-12), dur: 1.20, rate: 0.90, lead: 0 },
    { at: LAND_F / 30 + 0.33, src: "am/cash-register.wav", v: db(-14), dur: 1.10, lead: 0 },
    { at: LAND_F / 30 + 0.46, src: "am/coin-drop.wav", v: db(-12), dur: 0.90, rate: 1.38, lead: 0 },
    { at: LAND_F / 30 + 0.66, src: "am/coin-drop.wav", v: db(-16), dur: 0.80, rate: 1.52, lead: 0 },
    // the bounce back out, and the second landing
    { at: LAND_F / 30 + 0.16, src: "am/hit-up.wav", v: db(-14), dur: 0.80, rate: 1.2, lead: 0 },
    ...layer((LAND_F + 16) / 30, { src: "am/coin-drop.wav", v: db(-10), dur: 0.90, rate: 0.94 },
                                 { src: "am/coin-spin.wav", v: db(-16), dur: 0.80, rate: 1.3 }),
    // the pour that buries him
    { at: (LAND_F + 27) / 30, src: "am/coin-drop.wav", v: db(-12), dur: 1.00, rate: 1.1, lead: 0 },
    { at: (LAND_F + 33) / 30, src: "am/coin-spin.wav", v: db(-17), dur: 1.00, rate: 0.86, lead: 0 },
];

export type DiveV = { sky: string[]; sun: string; cl: [number, number] };
export const DIVE_V: Record<string, DiveV> = {
  /* A · SUNSET   punch out fast from a big close-up (the shipped cut)
     B · COLD DAWN a gentler, slower reveal from mid-close
     C · DUSK      an extreme close-up whipped out in half a second */
  A: { sky: ["#F2C877", "#E9B96C", "#DCA968", "#C99C6E", "#B69179", "#A48876", "#8D7F67"],
       sun: "#FBE3AE", cl: [2.62, 24] },
  B: { sky: ["#BCD2DE", "#AAC3D2", "#9BB4C6", "#93A8B4", "#9A9E9E", "#9C9587", "#8D7F67"],
       sun: "#E4EEF4", cl: [1.75, 40] },
  C: { sky: ["#C8869A", "#BE7A8E", "#AE7284", "#9E6E7C", "#96767A", "#907E74", "#8D7F67"],
       sun: "#F0C6B4", cl: [3.30, 16] },
  /* ---- four readings of the blue, all on A's camera so only the sky changes.
     Gold on blue is complementary, so the token pit at the bottom of the fall
     reads harder against every one of these than it does against the tan. ---- */
  /* D/E/F are the BLUE cuts. Each carries its sky all the way through the reel
     via the room tint, so the hook and the body are the same world rather than
     a blue opening bolted onto tan rooms. All three run A's camera and A's
     fixed middle, so the sky is the only variable. */
  D: { sky: ["#5E9BD0", "#5390C6", "#4A85BA", "#4A7BA8", "#587C9A", "#6E8090", "#7E8078"],
       sun: "#C6E4F6", cl: [2.62, 24] },                        // deep ocean, saturated
  E: { sky: ["#5FB6C0", "#54A8B4", "#4C9AA6", "#4C8E98", "#568A8C", "#6C8880", "#7E8474"],
       sun: "#CDEEEE", cl: [2.62, 24] },                        // teal, cooler and greener
  F: { sky: ["#5A80BA", "#5578AE", "#5070A4", "#4E6894", "#556280", "#65646E", "#726C60"],
       sun: "#EAF0FA", cl: [2.62, 24] },                        // night, a moon not a sun
};
export const AiDiveOne: React.FC<{ v?: string }> = ({ v = "A" }) => {
  const f = useCurrentFrame();
  const V = DIVE_V[v] ?? DIVE_V.A;
  const LAYERS = Array.from({ length: 13 }, (_, i) => 452 + i * 224);
  const y = oneY(f), b = f - LAND_F;
  const rise = E(f, LAND_F + 26, AI5_LEN - 2, 0, 1, IO);
  const world = (<>
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: WH1 }}>
      {/* ⛔ Frame 0 measured 5.9% of pixels above saturation 0.35 — the whole
          opening was one tan value, which is exactly what fails to stop a scroll.
          The sky is now warm and saturated at the top and cools into the tan as
          he falls, so the first frame has real colour and the descent has a
          direction. Solid bands, no gradient. */}
      {V.sky.map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 0, width: W, background: c,
          top: (i * WH1) / 7, height: WH1 / 7 + 2, zIndex: 1 }} />
      ))}
      {/* a low sun behind the tower — one big shape, huge value contrast */}
      <div style={{ position: "absolute", left: 606, top: 96, width: 300, height: 300,
        borderRadius: 999, background: V.sun, zIndex: 1 }} />
      {[0, 1, 2].map((i) => (
        <div key={`cl${i}`} style={{ position: "absolute", left: [-40, 560, 120][i],
          top: [286, 372, 512][i], width: [340, 300, 260][i], height: [54, 46, 40][i],
          borderRadius: 999, background: ["#F6D79B", "#EFC888", "#E3B87E"][i], zIndex: 2 }} />
      ))}
      {/* the mast and the board he is standing on */}
      <div style={{ position: "absolute", left: 44, top: 250, width: 74, height: WH1 - 400,
        background: "#5E5344", boxShadow: SH, zIndex: 12 }} />
      <div style={{ position: "absolute", left: 106, top: 250, width: 14, height: WH1 - 400,
        background: "#3E3629", zIndex: 12 }} />
      {Array.from({ length: 32 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 10, top: 300 + i * 100, width: 142,
          height: 15, background: "#4A4133", zIndex: 12 }} />
      ))}
      {/* diagonal bracing — reads as a structure, not a post */}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={`br${i}`} style={{ position: "absolute", left: -22, top: 320 + i * 290,
          width: 250, height: 17, background: "#4A4133", zIndex: 11,
          transform: `rotate(${i % 2 ? 24 : -24}deg)`, transformOrigin: "50% 50%" }} />
      ))}
      <Board f={f} />
      {/* every past conversation, and he goes through each one */}
      {LAYERS.map((ly, i) => {
        const gone = y > ly + 40;
        const sw = 430 + i * 58;                 // far ones narrow, near ones full width
        const sx = (W - sw) / 2;
        return gone ? (
          <React.Fragment key={i}>
            <Sheet x={sx - sw * 0.72} y={ly} w={sw * 0.54} rows={3}
                   c={i % 2 ? PAPER : PAPER2} rot={-20} z={20} />
            <Sheet x={sx + sw * 0.78} y={ly + 28} w={sw * 0.54} rows={3}
                   c={i % 2 ? PAPER2 : PAPER} rot={18} z={20} />
          </React.Fragment>
        ) : (
          <Sheet key={i} x={sx} y={ly} w={sw} h={72 + i * 7} rows={3}
                 c={i % 2 ? PAPER : PAPER2} z={20} />
        );
      })}
      <CoinBasin y={SURF} wall="#7C7161" n={120} />
      {/* already in flight at frame 0 — gives the drop a scale and a direction,
          and puts the payoff's gold on screen from the very first frame */}
      {[0, 1, 2, 3, 4].map((i) => {
        const q = ((f * 5.5 + i * 74) % 370) / 370;
        const d = 52 + rnd(i, 19) * 46;
        return <Coin key={`op${i}`} d={d} x={[214, 690, 396, 826, 122][i] - d / 2}
          y={430 + q * 430} rot={q * 420 + i * 40} flat={0.12} z={22} />;
      })}
      {[0, 1].map((i) => {
        const q = ((f * 4.4 + i * 120) % 300) / 300;
        return <Sheet key={`ops${i}`} x={[604, 168][i]} y={452 + q * 380} w={250} h={62}
          rows={2} c={i ? PAPER2 : PAPER} rot={-18 + q * 70} z={21} />;
      })}
      <Faller f={f} x={368} />
      {/* every coin thrown by the impact, and by the bounce landing again */}
      <Erupt f={f} at={LAND_F} cx={456} cy={SURF - 14} n={62} />
      <Splash f={f} at={LAND_F + 17} n={20} cx={456} cy={SURF - 12} pw={17} z={35} />
      {/* and it keeps coming */}
      <CoinRain f={f} from={LAND_F} n={20} top={SURF - 440} span={450} />
      {rise > 0 && Array.from({ length: 66 }, (_, i) => {
        const d = 62 + rnd(i, 19) * 62;
        return <Coin key={`r${i}`} d={d} x={-50 + rnd(i, 3) * 1100}
          y={SURF + 180 - rise * (250 + rnd(i, 7) * 190)} flat={rnd(i, 23) * 0.7}
          rot={rnd(i, 11) * 90} z={38} dark={rnd(i, 29) > 0.7} />;
      })}
    </div>
  </>);

  const sv = Math.min(1, Math.max(0, (f - J - 8) / 16)) * (f < LAND_F ? 1 : 0);
  return wrap(f, AMB, ONE_CUES, (<>
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: WH1,
        /* ⛔ Frame 0 is the whole scroll-stop and it was a wide: him small on a plank.
           A wide has to be READ before it lands. The reliable stopper is the
           character at scale — a face fills the frame, is legible in a tenth of a
           second, and is the one thing on the feed that is unmistakably this
           brand. So the take now OPENS on him big and nervous at the edge, and
           punches out to reveal the drop. Still one continuous move, no cut: the
           scale eases, it never jumps. */
        transform: `scale(${E(f, 0, V.cl[1], V.cl[0], 1.0, OUT)}) translateY(${-oneCam(f)}px)`,
        transformOrigin: `47% 112px` }}>{world}</div>
    </div>
    {sv > 0 && Array.from({ length: 9 }, (_, i) => {
      const sp = 210 + rnd(i, 3) * 300, k = f - J;
      return <div key={i} style={{ position: "absolute", left: 8 + rnd(i, 7) * 976,
        top: ((rnd(i, 11) * 900 + k * sp) % 1240) - 300, width: 15 + rnd(i, 17) * 12,
        height: 230 + rnd(i, 5) * 260, borderRadius: 9, background: "#E3D8C4",
        opacity: sv * 0.5, zIndex: 44 }} />;
    })}
  </>), true);
};
