import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, AssemblyCtx, Mascot, hexA } from "./SlopKit";
import WORDS from "./data/words_ai.json";
import { PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D, SH, SH_S, mix } from "./CancelWorld";
import { SfxTrack, LEVELS, layer, repeat, db, type Cue } from "./SoundKit";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 89 "AI" · HOOK SET 4.

   ⛔ THE NOTE on set 3: "needs to be more like CLAUDE MESSAGING here, not
   something so boring like chat windows or a clock — those are boring,
   uncaptivating visual ideas."

   Correct, and it points at something I had in my hands the whole time. The
   house already owns a Claude CHARACTER — the clay mascot — and I kept drawing
   application chrome around it instead of letting it act. A window is furniture.
   A dial is an instrument. Neither of them can want anything.

   So every hook here is Claude TALKING, and the gag is always the same one the
   audience lives daily: you brief it, it is brilliant, you come back, and it
   has no idea who you are.

     · the mascot is the hero, at 240px+, not a prop in the corner
     · speech is a BUBBLE with two or three words in it — dialogue, not labels
     · the joke is physical and repeats, so it reads with the sound off
     · four different places, kept from the note that was right
   ========================================================================= */

export const AI4_LEN = 146;
export const AI4_CUTS = [38, 76, 112];
const HEAD = { big: "CLAUDE FORGETS", hot: "EVERY CHAT" };
const W = 1012, H = 792;
const CLAUDE = "claude_logo.png";
const NBLM = "logos/notebooklm.svg";

const Vo: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : (
    <Audio src={staticFile("ai_vo_final.wav")} endAt={AI4_LEN} />
  );
const Cap: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : <KaraokeCaption words={WORDS as any} />;

const Cl: React.FC<{
  f: number; x: number; y: number; size?: number; z?: number; gaze?: number; shock?: number;
  cheer?: number; stern?: number; nodAmp?: number; nodSpeed?: number; flip?: boolean;
}> = ({ f, x, y, size = 240, z = 30, gaze = 0, shock = 0, cheer = 0, stern = 0,
        nodAmp = 3, nodSpeed = 10, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
    filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(6,9,14,0.5))` }}>
    <Mascot lf={f} size={size} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
            nodAmp={nodAmp} nodSpeed={nodSpeed} />
  </div>
);

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; slamAt?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, slamAt, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 30), e = t * t * (3 - 2 * t);
  const z = [1.05 - e * 0.04, 1.02 + e * 0.05, 1.06 - e * 0.05, 1.02 + e * 0.04][k % 4];
  let dx = 0, dy = 0;
  if (slamAt !== undefined) {
    const k2 = f - slamAt;
    if (k2 >= 0 && k2 < 12) {
      const d = Math.pow(1 - k2 / 12, 2);
      dx = Math.sin(k2 * 2.3) * 16 * d; dy = Math.cos(k2 * 1.9) * 12 * d;
    }
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translate(${dx}px, ${dy}px)`, transformOrigin: "50% 54%" }}>
      {children}
      {slamAt !== undefined && f >= slamAt && f < slamAt + 3 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFEBC2",
          opacity: (1 - (f - slamAt) / 3) * 0.2, zIndex: 58 }} />
      )}
    </div>
  );
};

const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {AI4_CUTS.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.26, zIndex: 60 }} />;
  })}
</>);

/* ================================================================= dialogue ==
   A speech bubble with the Claude mark on it. Two or three words, set big
   enough to be read at feed width. `tail` picks which side it points from.
   ========================================================================= */
const Bubble: React.FC<{
  x: number; y: number; w: number; text: string; s?: number; from?: "left" | "right";
  c?: string; ink?: string; mark?: boolean; t?: number; z?: number; fs?: number;
}> = ({ x, y, w, text, s = 1, from = "left", c = PAPER, ink = INKD, mark = true, t = 1, z = 34,
        fs = 72 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`,
    transformOrigin: from === "left" ? "10% 100%" : "90% 100%" }}>
    <div style={{ width: w, borderRadius: 26 * s, background: c, boxShadow: SH,
      padding: `${20 * s}px ${24 * s}px`, display: "flex", alignItems: "center", gap: 14 * s,
      fontFamily: inter.fontFamily }}>
      {mark && <Img src={staticFile(CLAUDE)} style={{ width: fs * 0.86 * s, height: fs * 0.86 * s,
        objectFit: "contain", flexShrink: 0 }} />}
      <span style={{ fontWeight: 900, fontSize: fs * s, lineHeight: 1.02, color: ink,
        letterSpacing: "-0.025em" }}>{text}</span>
    </div>
    <div style={{ position: "absolute", left: from === "left" ? 42 * s : w - 78 * s, top: "100%",
      width: 0, height: 0, borderLeft: `${20 * s}px solid transparent`,
      borderRight: `${20 * s}px solid transparent`, borderTop: `${28 * s}px solid ${c}` }} />
  </div>
);

/** everything you already told it, as a physical thing you keep carrying back */
const Brief: React.FC<{ x: number; y: number; s?: number; t?: number; z?: number }> =
  ({ x, y, s = 1, t = 1, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: "absolute", left: (i % 2) * 7 * s, top: -i * 20 * s,
        width: 168 * s, height: 26 * s, borderRadius: 5 * s, background: i % 2 ? PAPER : PAPER2,
        boxShadow: SH_S, transform: `rotate(${(rnd(i, 3) - 0.5) * 5}deg)` }} />
    ))}
    <div style={{ position: "absolute", left: 0, top: -108 * s, width: 168 * s, height: 30 * s,
      borderRadius: 6 * s, background: AMB, boxShadow: SH_S, display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19 * s,
      color: "#241A08" }}>YOUR CONTEXT</div>
  </div>
);

/* ------------------------------------------------------------------ places -- */
const Room: React.FC<{ wall: string; floor: string; trim: string }> = ({ wall, floor, trim }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill={wall} />
    <rect x={0} y={0} width={W} height={96} fill={mix(wall, "#FFFFFF", 0.14)} />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={16 + i * 128} y={110} width={86} height={392} fill={mix(wall, "#FFFFFF", 0.07)} />
    ))}
    <rect x={0} y={498} width={W} height={18} fill={trim} />
    <rect x={0} y={516} width={W} height={H - 516} fill={floor} />
    {Array.from({ length: 9 }, (_, i) => (
      <polygon key={`f${i}`} fill={mix(floor, "#000000", 0.09)}
        points={`${-220 + i * 200},792 ${-204 + i * 200},792 516,516 508,516`} />
    ))}
  </svg>
);

/* ================================================================== places ==
   Four shots, four different places per hook. Every one is drawn in solid
   animation paints with a dark trim line — no washes, no glow.
   ========================================================================= */

/** outside: sky band, a skyline of blocks, hard ground */
const Yard: React.FC<{ sky: string; far: string; ground: string; sun?: string }> =
  ({ sky, far, ground, sun }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect width={W} height={H} fill={sky} />
    {sun && <circle cx={812} cy={166} r={104} fill={sun} />}
    {[[-30, 300, 190], [150, 236, 150], [286, 330, 224], [498, 268, 176], [652, 348, 132],
      [768, 292, 210], [948, 322, 150]].map(([x, y, w2], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w2} height={560 - y + 60} fill={far} />
        <rect x={x} y={y} width={w2} height={12} fill={mix(far, "#FFFFFF", 0.16)} />
        {Array.from({ length: 3 }, (_, j) => (
          <rect key={j} x={x + 20 + j * 44} y={y + 40} width={22} height={30}
            fill={mix(far, "#FFFFFF", 0.13)} />
        ))}
      </g>
    ))}
    <rect y={560} width={W} height={H - 560} fill={ground} />
    <rect y={560} width={W} height={9} fill={mix(ground, "#000000", 0.22)} />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x={-40 + i * 168} y={620 + (i % 3) * 54} width={112} height={7}
        fill={mix(ground, "#000000", 0.11)} />
    ))}
  </svg>
);

/** a loading bay: roll-up door, roller track, crates */
const Bay: React.FC<{ wall: string; floor: string; door: string }> = ({ wall, floor, door }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect width={W} height={H} fill={wall} />
    <rect x={598} y={78} width={396} height={430} fill={door} />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={598} y={86 + i * 47} width={396} height={9}
        fill={mix(door, "#000000", 0.26)} />
    ))}
    <rect x={598} y={78} width={396} height={16} fill={mix(door, "#000000", 0.34)} />
    <rect x={40} y={130} width={230} height={168} fill={mix(wall, "#000000", 0.13)} />
    <rect x={54} y={144} width={202} height={140} fill={mix(wall, "#FFFFFF", 0.2)} />
    <rect x={300} y={150} width={250} height={132} fill={mix(wall, "#000000", 0.1)} />
    <rect y={508} width={W} height={16} fill={mix(floor, "#000000", 0.3)} />
    <rect y={524} width={W} height={H - 524} fill={floor} />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={i * 104} y={600} width={72} height={10}
        fill={mix(floor, "#000000", 0.13)} />
    ))}
  </svg>
);

/** the archive: three racks of big labelled boxes that fill in */
const Shelves: React.FC<{ wall: string; wood: string; floor: string; fill?: number }> =
  ({ wall, wood, floor, fill = 1 }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect width={W} height={H} fill={wall} />
    {[0, 1, 2].map((r) => {
      const y = 62 + r * 196;
      return (
        <g key={r}>
          <rect x={0} y={y} width={W} height={156} fill={mix(wall, "#000000", 0.17)} />
          {Array.from({ length: 7 }, (_, c) => {
            const shown = (c * 3 + r * 2) % 7;
            if (shown >= fill * 7) return null;
            const bx = 14 + c * 144;
            return (
              <g key={c}>
                <rect x={bx} y={y + 14} width={126} height={142}
                  fill={(c + r) % 2 ? PAPER : PAPER2} />
                <rect x={bx} y={y + 14} width={126} height={34} fill={AMB} />
                <rect x={bx + 14} y={y + 24} width={70} height={13} fill={AMB_D} />
                {[0, 1, 2].map((k) => (
                  <rect key={k} x={bx + 16} y={y + 68 + k * 24} width={94 - k * 22} height={11}
                    fill={mix(PAPER2, "#000000", 0.24)} />
                ))}
                <rect x={bx + 118} y={y + 14} width={8} height={142}
                  fill={mix(PAPER2, "#000000", 0.2)} />
              </g>
            );
          })}
          <rect x={0} y={y + 156} width={W} height={22} fill={wood} />
          <rect x={0} y={y + 172} width={W} height={12} fill={mix(wood, "#000000", 0.4)} />
        </g>
      );
    })}
    <rect y={650} width={W} height={H - 650} fill={floor} />
    <rect y={650} width={W} height={11} fill={mix(floor, "#000000", 0.3)} />
    {Array.from({ length: 5 }, (_, i) => (
      <rect key={i} x={-30 + i * 230} y={704} width={150} height={8}
        fill={mix(floor, "#000000", 0.12)} />
    ))}
  </svg>
);

/** a street at dusk: shopfronts, kerb, gutter */
const Street: React.FC<{ sky: string; block: string; road: string; kerb: string }> =
  ({ sky, block, road, kerb }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect width={W} height={H} fill={sky} />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={-10 + i * 214} y={54 + (i % 2) * 44} width={196} height={430 - (i % 2) * 44}
          fill={i % 2 ? mix(block, "#000000", 0.09) : block} />
        <rect x={-10 + i * 214} y={54 + (i % 2) * 44} width={196} height={14}
          fill={mix(block, "#FFFFFF", 0.18)} />
        {Array.from({ length: 6 }, (_, j) => (
          <rect key={j} x={8 + i * 214 + (j % 2) * 96} y={116 + (i % 2) * 44 + Math.floor(j / 2) * 92}
            width={72} height={62} fill={mix(block, "#FFFFFF", 0.24)} />
        ))}
        <rect x={-10 + i * 214} y={420} width={196} height={64}
          fill={mix(block, "#000000", 0.22)} />
      </g>
    ))}
    <rect y={484} width={W} height={54} fill={kerb} />
    <rect y={534} width={W} height={12} fill={mix(kerb, "#000000", 0.3)} />
    <rect y={546} width={W} height={H - 546} fill={road} />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={30 + i * 180} y={704} width={104} height={12}
        fill={mix(road, "#FFFFFF", 0.16)} />
    ))}
  </svg>
);

/** a factory line: belt deck, legs, gantry overhead */
const Line: React.FC<{ wall: string; floor: string; steel: string; f: number }> =
  ({ wall, floor, steel, f }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect width={W} height={H} fill={wall} />
    <rect y={0} width={W} height={72} fill={mix(wall, "#000000", 0.16)} />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={26 + i * 174} y={0} width={26} height={150}
        fill={mix(steel, "#000000", 0.2)} />
    ))}
    <rect y={470} width={W} height={H - 470} fill={floor} />
    <rect x={-20} y={556} width={W + 40} height={62} fill={steel} />
    <rect x={-20} y={556} width={W + 40} height={13} fill={mix(steel, "#FFFFFF", 0.22)} />
    <rect x={-20} y={610} width={W + 40} height={12} fill={mix(steel, "#000000", 0.36)} />
    {Array.from({ length: 22 }, (_, i) => (
      <rect key={i} x={((i * 52 - f * 6) % (W + 60)) - 30} y={572} width={26} height={34}
        rx={5} fill={mix(steel, "#000000", 0.17)} />
    ))}
    {[70, 330, 590, 850].map((x, i) => (
      <rect key={i} x={x} y={622} width={40} height={130} fill={mix(steel, "#000000", 0.24)} />
    ))}
  </svg>
);

/* =================================================================== props ==
   Four objects the hooks share: the notebook that keeps things, a heap of the
   things it did not keep, a cost column, and the wire between them.
   ========================================================================= */

/** the notebook — a tile that visibly ACCUMULATES, so "it kept it" is watchable */
const Nb: React.FC<{ x: number; y: number; s?: number; t?: number; z?: number; rows?: number }> =
  ({ x, y, s = 1, t = 1, z = 26, rows = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 60%" }}>
    <div style={{ width: 306 * s, height: 330 * s, borderRadius: 26 * s, background: "#241D16",
      boxShadow: SH, padding: `${20 * s}px`, display: "flex", flexDirection: "column",
      alignItems: "center", gap: 12 * s }}>
      <Img src={staticFile(NBLM)} style={{ width: 128 * s, height: 128 * s, objectFit: "contain",
        filter: "invert(1)", flexShrink: 0 }} />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 9 * s }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ height: 22 * s, borderRadius: 5 * s,
            width: `${[100, 84, 92, 70, 88][i]}%`,
            background: i < rows ? GO_L : "#3B3128" }} />
        ))}
      </div>
    </div>
  </div>
);

/** everything it threw away, on the floor */
const Heap: React.FC<{ x: number; y: number; w: number; h: number; n?: number; s?: number;
  c?: string; z?: number; seed?: number }> =
  ({ x, y, w, h, n = 18, s = 1, c, z = 25, seed = 3 }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: x + rnd(i, seed) * w,
      top: y + rnd(i, seed + 4) * h, width: 132 * s, height: 23 * s, borderRadius: 5 * s,
      background: c || (i % 2 ? PAPER : PAPER2), boxShadow: SH_S, zIndex: z,
      transform: `rotate(${(rnd(i, seed + 8) - 0.5) * 52}deg)` }} />
  ))}
</>);

/** what the loop costs — a column that fills and then spills over the top */
const Col: React.FC<{ x: number; y: number; w: number; h: number; v: number; c?: string;
  z?: number }> = ({ x, y, w, h, v, c = RED, z = 28 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 12, background: "#2C2620", boxShadow: SH, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%",
      height: `${Math.min(1, v) * 100}%`, background: c }} />
    {[0.25, 0.5, 0.75].map((g) => (
      <div key={g} style={{ position: "absolute", left: 0, bottom: `${g * 100}%`, width: "100%",
        height: 5, background: "#1A1610" }} />
    ))}
  </div>
);

/** the wire, with things visibly travelling down it */
const Wire: React.FC<{ f: number; a: number; x: number; y: number; len: number; c?: string;
  pc?: string; n?: number; z?: number; up?: boolean }> =
  ({ f, a, x, y, len, c = GO, pc = GO_L, n = 4, z = 24, up = false }) => (<>
  <div style={{ position: "absolute", left: x, top: y, height: 26, borderRadius: 7,
    width: len * E(f, a, a + 16, 0, 1, OUT), background: c, zIndex: z }} />
  {Array.from({ length: n }, (_, i) => {
    const q = ((f - a + i * (34 / n)) % 34) / 34, d = up ? 1 - q : q;
    return <div key={i} style={{ position: "absolute", left: x + 6 + d * (len - 56),
      top: y - 13, width: 50, height: 50, borderRadius: 13, background: pc, zIndex: z + 3,
      boxShadow: SH_S, opacity: E(f, a + 5, a + 15, 0, 1, OUT) }} />;
  })}
</>);

const A_ = "am/";
const sfxFor = (sig: { src: string; dur: number; rate?: number }): Cue[] => [
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 4.95, from: 2, lead: 0 },
  { at: 0, src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0, src: A_ + "ping-msg.wav", v: LEVELS.SFX_MID, dur: 0.60, lead: 0 },
  { at: 0.40, src: A_ + sig.src, v: LEVELS.SFX_HERO, dur: sig.dur, rate: sig.rate, lead: 0 },
  ...layer(1.267, { src: A_ + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A_ + "punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  ...layer(2.533, { src: A_ + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.45 },
                  { src: A_ + "hit-up.wav", v: LEVELS.SFX_TEXTURE, dur: 1.20 }),
  ...layer(3.733, { src: A_ + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A_ + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.10 }),
];

const wrap = (f: number, glow: string, cues: Cue[], children: React.ReactNode) => {
  const assembled = React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar /><Vo />
      {!assembled && <SfxTrack cues={cues} />}
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(glow, 0.3)}>
        {children}
        <Flash f={f} />
      </Panel>
      <Cap />
    </AbsoluteFill>
  );
};

/* ==================================================================== A ====
   THE BRIEF. Shot 1 it ignores the briefing beside it. So: how big does that
   pile get, where should it have gone, and what does the morning after look
   like. Yard · workshop · archive.
   ========================================================================= */
const tailA = (f: number) => {
  const [C1, C2, C3] = AI4_CUTS;
  return (<>
    {/* 2 · outside, on a mountain of every briefing you ever gave it */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Yard sky="#8FA6B8" far="#6E8296" ground="#8A8778" sun="#D9C48C" />
      <Heap x={-40} y={556} w={1080} h={150} n={30} s={1.1} z={22} seed={5} />
      <Heap x={120} y={470} w={760} h={110} n={16} s={0.95} z={24} seed={9} />
      <Cl f={f} x={362} y={286} size={250} gaze={1} stern={0.6} nodAmp={2.6} nodSpeed={12} z={30} />
      <Bubble x={276} y={104} w={470} text="again?" fs={92}
              t={E(f, C1 + 2, C1 + 16, 0, 1, BACK)} z={34} />
      {/* one more landing on the pile, because this happens every single chat */}
      {[0, 1, 2].map((i) => {
        const q = ((f - C1 + i * 12) % 36) / 36;
        return <div key={i} style={{ position: "absolute", left: 700 - q * 240,
          top: -40 + q * q * 660, width: 150, height: 26, borderRadius: 5, background: PAPER,
          boxShadow: SH_S, zIndex: 26, transform: `rotate(${q * 90}deg)` }} />;
      })}
    </Shot>

    {/* 3 · where it should have gone: down a wire, into the notebook */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room wall="#93A79B" floor="#7D9185" trim="#66796E" />
      <Brief x={92} y={636} s={1.15} z={26} />
      <Cl f={f} x={132} y={332} size={224} gaze={2} cheer={0.7} nodAmp={3} nodSpeed={10} z={30} />
      <Wire f={f} a={C2 + 2} x={358} y={452} len={268} n={4} />
      <Nb x={640} y={228} s={1.02} rows={Math.min(5, Math.floor((f - C2) / 7))}
          t={E(f, C2 + 1, C2 + 14, 0.55, 1, BACK)} z={28} />
    </Shot>

    {/* 4 · the archive. Every briefing filed, and it opens knowing you. */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Shelves wall="#8C7F6E" wood="#A98F63" floor="#6E6455" fill={E(f, C3, C3 + 22, 0.3, 1, OUT)} />
      <Bubble x={126} y={252} w={760} text="where we left off" fs={80} c="#E7F5EC" ink="#12522B"
              t={E(f, C3 + 3, C3 + 17, 0, 1, BACK)} z={34} />
      <Cl f={f} x={378} y={452} size={266} gaze={2} cheer={0.95} nodAmp={3.6} nodSpeed={8} z={30} />
    </Shot>
  </>);
};

/* ==================================================================== B ====
   THE LOOP. Shot 1 the briefing falls straight out the far side. So: what the
   loop costs, where the chute should point, and the shelf once it does.
   Factory line · yard · archive.
   ========================================================================= */
const tailB = (f: number) => {
  const [C1, C2, C3] = AI4_CUTS;
  return (<>
    {/* 2 · the line runs, the briefs drop off the end, the meter climbs */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Line wall="#8E96A2" floor="#767E8A" steel="#AAB2BE" f={f} />
      <Cl f={f} x={62} y={306} size={252} gaze={0} shock={0.55} nodAmp={2.4} nodSpeed={13} z={30} />
      {[0, 1, 2, 3, 4].map((i) => {
        const q = ((f - C1 + i * 9) % 45) / 45, off = Math.max(0, q - 0.72) / 0.28;
        return <div key={i} style={{ position: "absolute", left: 320 + q * 700,
          top: 546 + off * off * 236, width: 146, height: 25, borderRadius: 5,
          background: i % 2 ? PAPER : PAPER2, boxShadow: SH_S, zIndex: 26,
          transform: `rotate(${off * 74}deg)` }} />;
      })}
      <Heap x={824} y={688} w={200} h={70} n={10} s={0.9} z={27} seed={13} />
      <Col x={798} y={92} w={140} h={368} v={E(f, C1 + 2, C1 + 30, 0.15, 1.0, IO)} />
      <div style={{ position: "absolute", left: 798, top: 52, width: 140, height: 32,
        borderRadius: 6, background: RED, zIndex: 29,
        opacity: E(f, C1 + 26, C1 + 32, 0, 1, OUT) }} />
    </Shot>

    {/* 3 · outside: the chute leaves the building and lands in the notebook */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Yard sky="#93AEC0" far="#72899C" ground="#87897C" sun="#DBC792" />
      <div style={{ position: "absolute", left: -30, top: 262, width: 330, height: 320,
        borderRadius: 14, background: "#6A6E78", boxShadow: SH, zIndex: 20 }} />
      <div style={{ position: "absolute", left: 44, top: 316, width: 190, height: 128,
        borderRadius: 10, background: "#4E525B", zIndex: 21 }} />
      <Wire f={f} a={C2 + 2} x={286} y={442} len={330} n={5} />
      <Nb x={630} y={252} s={1.06} rows={Math.min(5, Math.floor((f - C2) / 6))}
          t={E(f, C2 + 1, C2 + 14, 0.55, 1, BACK)} z={28} />
      <Cl f={f} x={130} y={548} size={182} gaze={2} cheer={0.8} nodAmp={3} nodSpeed={10} z={30} />
    </Shot>

    {/* 4 · it takes what it needs off the shelf itself */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Shelves wall="#7E8578" wood="#9C9A70" floor="#63695E" fill={1} />
      <Bubble x={150} y={244} w={720} text="already have it" fs={82} c="#E7F5EC" ink="#12522B"
              t={E(f, C3 + 3, C3 + 17, 0, 1, BACK)} z={34} />
      <Cl f={f} x={388} y={448} size={262} gaze={2} cheer={0.95} nodAmp={3.6} nodSpeed={8} z={30} />
      <div style={{ position: "absolute", left: 742, top: 466 - E(f, C3 + 6, C3 + 24, 0, 190, OUT),
        width: 168, height: 30, borderRadius: 6, background: AMB, boxShadow: SH_S, zIndex: 32 }} />
    </Shot>
  </>);
};

/* ==================================================================== C ====
   THE WORDS. Shot 1 the answer falls out of the bubble. So: it happens on the
   whole street, something catches them, and then they come back up.
   Street · hopper room · the refill.
   ========================================================================= */
const tailC = (f: number) => {
  const [C1, C2, C3] = AI4_CUTS;
  const WD = "#CFCABE";
  return (<>
    {/* 2 · dusk, and every bubble on the street is raining its answer away */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Street sky="#7C86A4" block="#6A7390" road="#5E6478" kerb="#8A8FA0" />
      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <Bubble x={38 + i * 340} y={126 + (i % 2) * 40} w={286} s={0.82} text="uh…" fs={66}
                  t={E(f, C1 + 2 + i * 4, C1 + 15 + i * 4, 0, 1, BACK)} z={34} />
          <Cl f={f} x={72 + i * 340} y={330 + (i % 2) * 40} size={186} gaze={i % 2}
              shock={0.6} nodAmp={2.2} nodSpeed={12 + i} z={30} />
          {[0, 1, 2, 3].map((j) => {
            const q = ((f - C1 + i * 7 + j * 10) % 40) / 40;
            return <div key={j} style={{ position: "absolute", left: 60 + i * 340 + j * 46,
              top: 250 + (i % 2) * 40 + q * q * 470, width: 96, height: 19, borderRadius: 4,
              background: WD, zIndex: 27, opacity: 1 - q * 0.4,
              transform: `rotate(${q * 62}deg)` }} />;
          })}
        </React.Fragment>
      ))}
      <Heap x={-30} y={686} w={1070} h={72} n={22} s={0.82} c={WD} z={28} seed={17} />
    </Shot>

    {/* 3 · a hopper under the bubble, and the notebook fills instead of the floor */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room wall="#9DA6B0" floor="#88919B" trim="#717A84" />
      <Bubble x={62} y={116} w={430} s={0.94} text="here" fs={74}
              t={E(f, C2 + 1, C2 + 13, 0, 1, BACK)} z={34} />
      {[0, 1, 2, 3, 4].map((i) => {
        const q = ((f - C2 + i * 8) % 40) / 40;
        return <div key={i} style={{ position: "absolute", left: 122 + q * 190,
          top: 306 + q * q * 210, width: 104, height: 20, borderRadius: 4, background: WD,
          zIndex: 27, transform: `rotate(${q * 40}deg)` }} />;
      })}
      {/* the funnel */}
      <svg viewBox="0 0 320 190" width={320} height={190} shapeRendering="crispEdges"
        style={{ position: "absolute", left: 96, top: 500, zIndex: 26 }}>
        <polygon points="0,0 320,0 210,150 110,150" fill={AMB} />
        <polygon points="0,0 320,0 300,26 20,26" fill={AMB_L} />
        <rect x={110} y={150} width={100} height={40} fill={AMB_D} />
      </svg>
      <Wire f={f} a={C2 + 4} x={306} y={664} len={286} n={4} />
      <Nb x={606} y={306} s={0.98} rows={Math.min(5, Math.floor((f - C2) / 6))}
          t={E(f, C2 + 2, C2 + 15, 0.55, 1, BACK)} z={28} />
    </Shot>

    {/* 4 · the same bubble, and this time the words come back UP into it */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Room wall="#8FA598" floor="#7A9083" trim="#63796C" />
      <div style={{ position: "absolute", left: 118, top: 132, width: 740, height: 268,
        borderRadius: 34, background: "#E7F5EC", boxShadow: SH, zIndex: 32 }} />
      <div style={{ position: "absolute", left: 196, top: 398, width: 0, height: 0, zIndex: 32,
        borderLeft: "22px solid transparent", borderRight: "22px solid transparent",
        borderTop: "32px solid #E7F5EC" }} />
      <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 154, top: 166, width: 62,
        height: 62, objectFit: "contain", zIndex: 34 }} />
      {[0, 1, 2, 3].map((i) => {
        const q = E(f, C3 + 2 + i * 5, C3 + 20 + i * 5, 1, 0, IO);
        return <div key={i} style={{ position: "absolute", left: 240 + q * (i % 2 ? 70 : -50),
          top: 180 + i * 50 + q * q * 440, width: [560, 470, 512, 320][i], height: 28,
          borderRadius: 7, background: GO_L, zIndex: 33,
          transform: `rotate(${q * (i % 2 ? 34 : -34)}deg)` }} />;
      })}
      <Cl f={f} x={96} y={438} size={268} gaze={2} cheer={0.95} nodAmp={3.6} nodSpeed={8} z={30} />
      <Nb x={676} y={452} s={0.72} rows={5} z={26} />
    </Shot>
  </>);
};

/* ==================================================================== D ====
   THE REPETITION. Shot 1 is five of them asking the same thing. So: show the
   line that makes them, hang one shared memory over it, and end on the one
   that does not have to ask. Line · bay · yard.
   ========================================================================= */
const tailD = (f: number) => {
  const [C1, C2, C3] = AI4_CUTS;
  return (<>
    {/* 2 · they come off a belt, each handed the same briefing, each dropping it */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Line wall="#9C93A6" floor="#847B90" steel="#B4ACBE" f={f} />
      {[0, 1, 2, 3].map((i) => {
        const q = ((f - C1 + i * 11) % 44) / 44, x = -60 + q * 1120;
        return (
          <React.Fragment key={i}>
            <Cl f={f} x={x} y={366} size={182} gaze={i % 2} stern={0.5} nodAmp={2}
                nodSpeed={11 + i} z={30} />
            <Bubble x={x - 26} y={252} w={216} s={0.62} text="who?" fs={64} t={1} z={33} />
            <div style={{ position: "absolute", left: x + 132, top: 556 + q * q * 190,
              width: 128, height: 22, borderRadius: 5, background: PAPER, boxShadow: SH_S,
              zIndex: 26, transform: `rotate(${q * 70}deg)` }} />
          </React.Fragment>
        );
      })}
      <Heap x={-20} y={700} w={1050} h={58} n={16} s={0.82} z={28} seed={21} />
    </Shot>

    {/* 3 · one memory over the whole line, wired down into every one of them */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Bay wall="#8A93A0" floor="#737C88" door="#9CA3AE" />
      <Nb x={352} y={78} s={1.0} rows={Math.min(5, Math.floor((f - C2) / 6))}
          t={E(f, C2 + 1, C2 + 13, 0.55, 1, BACK)} z={28} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 208 + i * 300, top: 420,
          width: 22, borderRadius: 6, background: GO, zIndex: 24,
          height: E(f, C2 + 4 + i * 3, C2 + 20 + i * 3, 0, 172, OUT) }} />
      ))}
      {[0, 1, 2].map((i) => {
        const q = ((f - C2 + i * 10) % 30) / 30;
        return <div key={`p${i}`} style={{ position: "absolute", left: 194 + i * 300,
          top: 424 + q * 130, width: 50, height: 50, borderRadius: 13, background: GO_L,
          boxShadow: SH_S, zIndex: 27, opacity: E(f, C2 + 8, C2 + 18, 0, 1, OUT) }} />;
      })}
      {[0, 1, 2].map((i) => (
        <Cl key={`c${i}`} f={f} x={126 + i * 300} y={570} size={186} gaze={2} cheer={0.85}
            nodAmp={3} nodSpeed={9 + i} z={30} />
      ))}
    </Shot>

    {/* 4 · outside, one of them, and it does not ask */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Yard sky="#86A8B4" far="#66838F" ground="#7F8A78" sun="#D6CE96" />
      <Bubble x={122} y={228} w={780} text="we already did this" fs={78} c="#E7F5EC" ink="#12522B"
              t={E(f, C3 + 3, C3 + 17, 0, 1, BACK)} z={34} />
      <Cl f={f} x={310} y={450} size={272} gaze={2} cheer={0.95} nodAmp={3.6} nodSpeed={8} z={30} />
      <Nb x={654} y={470} s={0.74} rows={5} t={E(f, C3 + 5, C3 + 18, 0.5, 1, BACK)} z={28} />
    </Shot>
  </>);
};

/* ############################################################ A · "WHO'S THIS?"
   Claude, big, mid-sentence — and beside it the briefing you already gave it,
   sitting there untouched. The gag is that it is asking anyway.
   ######################################################################### */
export const AiHookA: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI4_CUTS[0];
  return wrap(f, RED, sfxFor({ src: "ping-msg.wav", dur: 0.60 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Room wall="#B0AA9C" floor="#968F80" trim="#7E7768" />
      <Bubble x={92} y={158} w={640} text="who are you again?"
              t={E(f, -30, -10, 0, 1, BACK)} z={34} />
      <Cl f={f} x={152} y={368} size={286} gaze={1} stern={0.6} nodAmp={2.4} nodSpeed={12} z={30} />
      {/* everything you already sent it, stacked and ignored */}
      <Brief x={678} y={742} s={1.72} t={E(f, 10, 26, 0, 1, BACK)} z={26} />
    </Shot>
    {tailA(f)}
  </>));
};

/* ############################################################## B · THE RE-BRIEF
   A loading bay. You keep pushing the same briefing in, and it keeps coming
   straight back out the other side.
   ######################################################################### */
export const AiHookB: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI4_CUTS[0];
  return wrap(f, AMB, sfxFor({ src: "paper-slide.wav", dur: 0.63 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Bay wall="#B0A38A" floor="#968A70" door="#6B6252" />
      <Cl f={f} x={392} y={318} size={272} gaze={0} shock={0.55} nodAmp={2.4} nodSpeed={13} z={30} />
      <Bubble x={272} y={150} w={470} text="remind me?" s={0.9}
              t={E(f, -30, -10, 0, 1, BACK)} z={34} />
      {/* going in on the left, falling out on the right, on a loop */}
      {[0, 1, 2, 3].map((i) => {
        const q = ((f + i * 11) % 44) / 44;
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: 20 + q * 300, top: 566, width: 150,
              height: 26, borderRadius: 5, background: PAPER, boxShadow: SH_S, zIndex: 24,
              opacity: q < 0.86 ? 1 : 0 }} />
            <div style={{ position: "absolute", left: 664 + q * 290, top: 566 + q * q * 170,
              width: 150, height: 26, borderRadius: 5, background: PAPER2, boxShadow: SH_S,
              zIndex: 24, transform: `rotate(${q * 46}deg)`, opacity: 1 - q * 0.5 }} />
          </React.Fragment>
        );
      })}
      {/* the pile of everything that fell out */}
      {Array.from({ length: 14 }, (_, i) => (
        <div key={`p${i}`} style={{ position: "absolute", left: 720 + rnd(i, 3) * 200,
          top: 690 + rnd(i, 7) * 60, width: 130, height: 22, borderRadius: 4,
          background: i % 2 ? PAPER : PAPER2, boxShadow: SH_S, zIndex: 25,
          transform: `rotate(${(rnd(i, 11) - 0.5) * 44}deg)` }} />
      ))}
    </Shot>
    {tailB(f)}
  </>));
};

/* ############################################################# C · THE BLANK OUT
   Claude mid-answer, and the words physically fall out of the bubble.
   ######################################################################### */
export const AiHookC: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI4_CUTS[0];
  const drop = E(f, 12, 32, 0, 1, IO);
  return wrap(f, RED, sfxFor({ src: "error-take.wav", dur: 0.25 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Room wall="#ADA6B4" floor="#928BA0" trim="#7A7388" />
      {/* the bubble, emptying */}
      <div style={{ position: "absolute", left: 118, top: 150, width: 700, height: 250, zIndex: 32,
        borderRadius: 34, background: PAPER, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 190, top: 398, width: 0, height: 0, zIndex: 32,
        borderLeft: "22px solid transparent", borderRight: "22px solid transparent",
        borderTop: `32px solid ${PAPER}` }} />
      <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 150, top: 182, width: 54,
        height: 54, objectFit: "contain", zIndex: 34 }} />
      {/* the lines of the answer, falling out of it */}
      {[0, 1, 2, 3].map((i) => {
        const q = Math.max(0, Math.min(1, drop * 4 - i));
        return <div key={i} style={{ position: "absolute", left: 224 + q * (i % 2 ? 60 : -40),
          top: 190 + i * 46 + q * q * 420, width: [520, 452, 486, 300][i], height: 26,
          borderRadius: 7, background: "#CFCABE", zIndex: 33, opacity: 1 - q * 0.55,
          transform: `rotate(${q * (i % 2 ? 30 : -30)}deg)` }} />;
      })}
      <Cl f={f} x={92} y={430} size={272} gaze={1} shock={0.72} nodAmp={2.2} nodSpeed={14} z={30} />
      {/* the words in a heap on the floor */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={`h${i}`} style={{ position: "absolute", left: 470 + rnd(i, 3) * 440,
          top: 690 + rnd(i, 7) * 62, width: 120, height: 20, borderRadius: 4,
          background: "#CFCABE", zIndex: 26, opacity: drop,
          transform: `rotate(${(rnd(i, 11) - 0.5) * 50}deg)` }} />
      ))}
    </Shot>
    {tailC(f)}
  </>));
};

/* ############################################################### D · THE QUEUE
   Five Claudes down a corridor, and every one of them asks the same thing.
   ######################################################################### */
export const AiHookD: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI4_CUTS[0];
  return wrap(f, RED, sfxFor({ src: "ping.wav", dur: 0.20 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Room wall="#A8B0A4" floor="#8D958A" trim="#767E73" />
      {/* four receding, one huge in front — the same question, five times */}
      {[3, 2, 1, 0].map((i) => {
        const s = 0.30 + i * 0.10;
        return (
          <React.Fragment key={i}>
            <Bubble x={556 + (3 - i) * 62} y={150 + (3 - i) * 30} w={330 * s + 80} s={s * 0.86}
                    text="who's this?" t={E(f, 8 + (3 - i) * 4, 20 + (3 - i) * 4, 0, 1, BACK)}
                    z={30 + i} />
            <Cl f={f} x={600 + (3 - i) * 66} y={286 + (3 - i) * 34} size={150 * s + 60} gaze={i % 2}
                stern={0.5} nodAmp={2} nodSpeed={11 + i} z={28 + i} />
          </React.Fragment>
        );
      })}
      <Bubble x={62} y={150} w={560} text="who's this?"
              t={E(f, -30, -10, 0, 1, BACK)} z={36} />
      <Cl f={f} x={128} y={366} size={288} gaze={1} stern={0.62} nodAmp={2.4} nodSpeed={12} z={34} />
    </Shot>
    {tailD(f)}
  </>));
};
