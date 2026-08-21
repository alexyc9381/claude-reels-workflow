import React from "react";
import { Img, staticFile } from "remotion";
import { E, OUT, BACK, IN_Q, hexa, dkh, mxh, squash, G_BLUE, G_RED, G_YEL, G_GRN } from "./BillWorld";

/* ===========================================================================
   REEL 116 — GOOGLE AI CHARACTER DESIGNS.

   Alex: *"i dont like that google character needs to be idk better it just
   looks like a symbol not really a character."* He is right, and the reason is
   structural rather than decorative: the spark-bodied version had ONE mass. A
   character reads as a character when it has a HEAD and a BODY that are
   different shapes, a face placed on the head rather than on the middle of the
   silhouette, and limbs with joints. A star with eyes in it is a logo wearing
   shoes.

   ⛔ None of these restyles the clay Claude. He is untouched; these are a
   separate cast for a reel about someone else's product.

   Every design below shares the house language so they cut against the Claude
   sprites without clashing: flat fill, hard edges, black slit eyes, no mouth,
   stub limbs, one shaded plane for form.
   ========================================================================= */

type CProps = { f: number; x: number; y: number; size: number; i?: number; z?: number;
  at?: number; loop?: number; flip?: boolean; cheer?: number; shock?: number };

/** the shared idle/action rig, so a design is judged on its DRAWING and not on
    whether it happens to have better motion than its neighbour */
const useRig = (f: number, size: number, i: number, loop?: number, at = 0) => {
  const lf = f - at;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, ch = 0;
  if (L === 0) { dx = Math.sin(f / 17 + ph) * size * 0.22;
                 dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.04;
                 rot = Math.cos(f / 17 + ph) * 3.6; }
  else if (L === 1) { rot = 5 + Math.sin(f / 6.2 + ph) * 8;
                      dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.04; }
  else if (L === 2) { const t = (f / 26 + ph) % 1; const j = Math.max(0, Math.sin(t * Math.PI));
                      dy = -j * size * 0.20; ch = j > 0.55 ? 1 : 0; rot = Math.sin(f / 26 + ph) * 2.6; }
  else { rot = Math.sin(f / 21 + ph) * 4.4; dy = Math.sin(f / 15 + ph) * size * 0.022; }
  return { lf, inS, sq, dx, dy, rot, ch, ph, L };
};

const Shell: React.FC<{ p: CProps; r: ReturnType<typeof useRig>; children: React.ReactNode }> =
  ({ p, r, children }) => {
  if (r.lf < -2) return null;
  return (
    <div style={{ position: "absolute", left: p.x - p.size / 2 + r.dx, top: p.y - p.size + r.dy,
      width: p.size, height: p.size, zIndex: p.z ?? 60,
      transform: `scale(${r.inS * r.sq}) rotate(${r.rot}deg) ${p.flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 100 100" width={p.size} height={p.size} style={{ overflow: "visible" }}>
        {children}
      </svg>
    </div>
  );
};

/** the house face: two black slit eyes, no mouth, a cheek lift when it cheers */
const Face: React.FC<{ cx: number; cy: number; w?: number; gap?: number; shock?: number; cheer?: number }> =
  ({ cx, cy, w = 5, gap = 9, shock = 0, cheer = 0 }) => {
  const h = shock ? 15 : cheer ? 5 : 11;
  return (<>
    <rect x={cx - gap - w / 2} y={cy - h / 2} width={w} height={h} rx={w / 2} fill="#14121A" />
    <rect x={cx + gap - w / 2} y={cy - h / 2} width={w} height={h} rx={w / 2} fill="#14121A" />
    {cheer > 0 && [cx - gap - 5, cx + gap + 5].map((q, j) => (
      <circle key={"ck" + j} cx={q} cy={cy + 8} r={2.8} fill="#FFFFFF" opacity={0.32} />
    ))}
  </>);
};

/* ── 1 · SPARKY — round head, spark tuft, small body. Classic mascot ratio. */
export const Sparky: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  const A = "#5B8DEF", B = "#8B7BF0";
  return (
    <Shell p={p} r={r}>
      <defs><linearGradient id={`sk${p.i}`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor={A} /><stop offset="100%" stopColor={B} /></linearGradient></defs>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={80} width={8} height={19} rx={3.6} fill={dkh(B, 0.18)}
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (r.L === 0 ? 10 : 3)} ${lx + 4} 82)`} />
      ))}
      {[[26, -1], [74, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={62} width={12} height={8} rx={4} fill={dkh(B, 0.10)}
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18)} ${ax} 66)`} />
      ))}
      {/* body — a small rounded torso, clearly separate from the head */}
      <rect x={33} y={56} width={34} height={28} rx={11} fill={dkh(A, 0.10)} />
      <path d="M 33 74 h 34 v 4 a 11 11 0 0 1 -11 6 h -12 a 11 11 0 0 1 -11 -6 z" fill="#000" opacity={0.12} />
      {/* head — the big mass, where the face lives */}
      <ellipse cx={50} cy={38} rx={27} ry={24} fill={`url(#sk${p.i})`} />
      <path d="M 23 40 a 27 24 0 0 0 54 0 a 27 24 0 0 1 -54 0 z" fill="#000" opacity={0.10} />
      {/* the spark, as a tuft growing out of the head */}
      <g transform={`translate(50 8) scale(0.20) translate(-50 -50) rotate(${Math.sin(p.f / 20) * 8} 50 50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#7CC0FF" />
      </g>
      <Face cx={50} cy={38} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 2 · GEMBOT — a faceted gem head on a boxy-round body. */
export const GemBot: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      <defs><linearGradient id={`gm${p.i}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#7DA8FF" /><stop offset="100%" stopColor="#5C6BE8" /></linearGradient></defs>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={3.6} fill="#4A56C4"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (r.L === 0 ? 10 : 3)} ${lx + 4} 84)`} />
      ))}
      {[[24, -1], [76, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={4} fill="#4A56C4"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18)} ${ax} 68)`} />
      ))}
      <rect x={31} y={58} width={38} height={28} rx={9} fill="#5C6BE8" />
      <rect x={31} y={74} width={38} height={12} rx={6} fill="#000" opacity={0.13} />
      {/* the four-colour chest bar — Google, said quietly */}
      {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
        <rect key={"cb" + j} x={38 + j * 6} y={64} width={5} height={5} rx={1.4} fill={c} />
      ))}
      {/* head: a cut gem */}
      <path d="M 50 8 L 76 30 L 66 58 L 34 58 L 24 30 Z" fill={`url(#gm${p.i})`} />
      <path d="M 34 58 L 66 58 L 71 44 L 29 44 Z" fill="#000" opacity={0.12} />
      <path d="M 50 8 L 76 30 L 62 30 Z" fill="#FFFFFF" opacity={0.18} />
      <Face cx={50} cy={36} gap={10} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 3 · BEAKER — the Google Labs flask as a head.
   ⭐ THE RECOMMENDATION, and the reason is not the drawing: this is GOOGLE'S OWN
   OBJECT. The flask is the icon Google Labs actually ships — it is on Mixboard's
   and Pomelli's real product tiles, pulled from gstatic in this same build. The
   repo has burned three reels on `feedback_real_marks_are_the_props`: use the
   subject's own objects, because a shape you invented has to be TRANSLATED
   before it means anything. A gem is a nice shape I drew. The flask is Google's.

   ⭐⭐ AND THE LIQUID IS A STATE. It can fill as tools are found, drain when a
   charge lands, and take each tool's colour. This reel's whole spine is a
   counter going 5 -> 0, so a character that can SHOW a level is a storytelling
   lever the gem does not have.

   ⛔ THE ONE COST, AND IT IS FIXED HERE: a near-white glass head was the
   brightest object in the frame and competed with the cream BILL in the hook —
   the bill has to stay top of the value ladder. The glass is tinted to a cool
   blue-grey, which still reads as glass and sits a stop under the paper.
   ⛔ AND THE TILE CLASH: Mixboard and Pomelli currently show the same beaker.
   They are the GENERIC Labs mark, not distinct product marks, so those two go
   back to name tiles and the flask belongs to the cast alone. */
export const Beaker: React.FC<CProps & { fill?: number; liquid?: string }> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  /* ⛔ tinted, not white: the bill is the brightest thing in this reel */
  const glass = "#DCE6F5", rim = "#C3D2E8";
  const liq = p.liquid ?? "#4C7BEA";
  const lvl = p.fill ?? 0.62;                       /* 0..1, and it is a STATE */
  /* ⛔ THE LIQUID MAY NOT REACH THE FACE. At `52 - lvl*22` a 0.62 fill put the
     surface at y=38 and the eyes sit at y=34 — the character drowned in its own
     head. The face is the one thing a level can never cover, so the surface is
     clamped to the flask's lower body: full is 42, empty is 57. */
  const top = 57 - lvl * 15;
  return (
    <Shell p={p} r={r}>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={3.6} fill="#3E6BD9"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (r.L === 0 ? 10 : 3)} ${lx + 4} 84)`} />
      ))}
      {[[25, -1], [75, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={4} fill="#3E6BD9"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18)} ${ax} 68)`} />
      ))}
      <rect x={32} y={58} width={36} height={28} rx={10} fill="#4C7BEA" />
      <rect x={32} y={74} width={36} height={12} rx={6} fill="#000" opacity={0.13} />
      {/* ⭐ the four-colour chest bar, borrowed from GEMBOT — it is the one thing
          that says GOOGLE outright, and it costs nothing to carry */}
      {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
        <rect key={"cb" + j} x={38 + j * 6} y={64} width={5} height={5} rx={1.4} fill={c} />
      ))}
      {/* the flask head */}
      <path d="M 42 8 h 16 v 14 l 13 26 a 8 8 0 0 1 -7 12 h -28 a 8 8 0 0 1 -7 -12 l 13 -26 z" fill={glass} />
      {/* the liquid — a LEVEL, with a surface that sloshes */}
      <path d={`M ${33 - (top - 44) * 0.5} ${top} q 17 ${4 + Math.sin(p.f / 9) * 3} ${34 + (top - 44)} 0
                l 4 ${56 - top} a 8 8 0 0 1 -7 8 h -28 a 8 8 0 0 1 -7 -8 z`}
        fill={liq} opacity={0.9} />
      <rect x={40} y={5} width={20} height={6} rx={3} fill={rim} />
      <circle cx={46 + Math.sin(p.f / 11) * 3} cy={top + 4 - ((p.f * 1.4) % 14)} r={2.4}
        fill="#FFFFFF" opacity={0.5} />
      <Face cx={50} cy={34} gap={8} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 4 · DOTHEAD — a rounded bot whose visor carries Google's four colours. */
export const DotHead: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={3.6} fill="#C9CEDA"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (r.L === 0 ? 10 : 3)} ${lx + 4} 84)`} />
      ))}
      {[[24, -1], [76, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={4} fill="#C9CEDA"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18)} ${ax} 68)`} />
      ))}
      <rect x={31} y={58} width={38} height={28} rx={10} fill="#EDF0F6" />
      <rect x={31} y={74} width={38} height={12} rx={6} fill="#000" opacity={0.10} />
      {/* head: a rounded capsule with a dark visor */}
      <rect x={24} y={12} width={52} height={44} rx={20} fill="#F7F9FD" />
      <rect x={24} y={40} width={52} height={16} rx={8} fill="#000" opacity={0.08} />
      <rect x={30} y={24} width={40} height={20} rx={10} fill="#1B1E28" />
      {/* the four dots ON the visor, which is where the eyes would be */}
      {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
        <circle key={"d" + j} cx={37 + j * 8.6} cy={34} r={p.shock ? 4.2 : 3.2} fill={c}
          opacity={0.55 + 0.45 * Math.abs(Math.sin(p.f / 10 + j * 0.9))} />
      ))}
      {/* an antenna with a spark on it */}
      <rect x={48.5} y={2} width={3} height={11} rx={1.5} fill="#C9CEDA" />
      <g transform={`translate(50 1) scale(0.13) translate(-50 -50) rotate(${(p.f * 2) % 360} 50 50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#5B8DEF" />
      </g>
    </Shell>
  );
};

/* ── 5 · PEBBLE — a soft one-piece creature, spark on the chest. */
export const Pebble: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      <defs><linearGradient id={`pb${p.i}`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#8FD0FF" /><stop offset="100%" stopColor="#6E8BF5" /></linearGradient></defs>
      {[40, 53].map((lx, j) => (
        <rect key={j} x={lx} y={84} width={7} height={15} rx={3.2} fill="#5C77E0"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (r.L === 0 ? 9 : 3)} ${lx + 3.5} 86)`} />
      ))}
      {[[22, -1], [78, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={58} width={12} height={8} rx={4} fill="#5C77E0"
          transform={`rotate(${(dir as number) * (16 + Math.sin(p.f / 7 + j * 3 + r.ph) * 20)} ${ax} 62)`} />
      ))}
      {/* one soft mass — head and body are the same volume, like a pebble */}
      <path d="M 50 10 C 74 10 84 30 84 52 C 84 74 70 86 50 86 C 30 86 16 74 16 52 C 16 30 26 10 50 10 Z"
        fill={`url(#pb${p.i})`} />
      <path d="M 16 58 C 26 74 34 86 50 86 C 66 86 74 74 84 58 C 84 74 70 86 50 86 C 30 86 16 74 16 58 Z"
        fill="#000" opacity={0.12} />
      {/* the spark, worn on the chest like a badge */}
      <g transform={`translate(50 66) scale(0.15) translate(-50 -50) rotate(${Math.sin(p.f / 16) * 14} 50 50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#FFFFFF" opacity={0.85} />
      </g>
      <Face cx={50} cy={42} gap={10} w={6} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 6 · CHIPPY — a square-headed bot, spark badge on the forehead. */
export const Chippy: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={2.5} fill="#3F8F6A"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (r.L === 0 ? 10 : 3)} ${lx + 4} 84)`} />
      ))}
      {[[24, -1], [76, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={3} fill="#3F8F6A"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18)} ${ax} 68)`} />
      ))}
      <rect x={31} y={58} width={38} height={28} rx={7} fill="#4FB183" />
      <rect x={31} y={74} width={38} height={12} rx={6} fill="#000" opacity={0.14} />
      {/* head: a rounded square with pin legs down each side, like a chip */}
      {[0, 1, 2].map(j => (<React.Fragment key={"p" + j}>
        <rect x={19} y={22 + j * 11} width={7} height={4} rx={1.5} fill="#B9C2CC" />
        <rect x={74} y={22 + j * 11} width={7} height={4} rx={1.5} fill="#B9C2CC" />
      </React.Fragment>))}
      <rect x={26} y={12} width={48} height={44} rx={12} fill="#5FC796" />
      <rect x={26} y={42} width={48} height={14} rx={7} fill="#000" opacity={0.12} />
      {/* the spark badge on the forehead */}
      <g transform={`translate(50 21) scale(0.12) translate(-50 -50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#FFFFFF" opacity={0.9} />
      </g>
      <Face cx={50} cy={38} gap={10} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

export const CHARACTERS = [
  { key: "sparky",  name: "1 · SPARKY",  C: Sparky,  note: "round head, spark tuft, mascot ratio" },
  { key: "gembot",  name: "2 · GEMBOT",  C: GemBot,  note: "cut-gem head, four-colour chest" },
  { key: "beaker",  name: "3 · BEAKER",  C: Beaker,  note: "the Labs flask, as a head" },
  { key: "dothead", name: "4 · DOTHEAD", C: DotHead, note: "visor of four Google dots" },
  { key: "pebble",  name: "5 · PEBBLE",  C: Pebble,  note: "one soft mass, spark badge" },
  { key: "chippy",  name: "6 · CHIPPY",  C: Chippy,  note: "chip head, spark on the brow" },
] as const;

/* =========================================================================
   ⭐⭐ THE CAST, AND WHICH CHARACTER GOES WHERE.

   Alex: *"lets go with the gembot primarily and go with the beaker only
   sometimes here i think it could be good in some scenes as well."*

   ⛔ NOT AT RANDOM. Each has a job it is better at, so the rule is legible:

     GEMBOT — the DEFAULT cast. A Gemini gem is "Google AI" in general, so it
              carries every scene whose subject is a product, a result or a
              person doing work.
     BEAKER — used where the LABS / EXPERIMENT idea is the actual point, because
              the flask is Google Labs' OWN published mark:
                · S2  the wall of 24 experiments being sifted
                · S6  the context window filling — the liquid is a LEVEL, and
                      this is the one beat that has a level in it
                · S15 a few in the crew, so the team reads as mixed rather than
                      cloned
   ⭐ The liquid also gives S6 something no other character has: as each codebase
   goes in, the flask fills.
   ====================================================================== */
export type CastKind = "gem" | "beaker";

/** the same call signature the scenes already use for `Crew`, so swapping the
    cast is mechanical and no scene has to be rewritten to change character. */
export const GCrew: React.FC<CProps & { kind?: CastKind; fill?: number; liquid?: string;
  tint?: string }> = ({ kind = "gem", ...p }) =>
  kind === "beaker" ? <Beaker {...p} /> : <GemBot {...p} />;

/** ⛔⛔⛔ THE FOOT LINE, AND WHY IT IS A FUNCTION.
    A sprite's `y` is its FEET, and scenes write it as `p.horizon + n`. That is
    fine until the set's horizon is low — `shaft` sits at 588, so a habitual
    `+240` puts the feet at 828 on a 792px panel and the character is drawn with
    its legs off the bottom. This build shipped that bug FOUR times (the toll
    queue, the hook's Claude, the S4 payer, and S1/S3/S5/S6's cast) before it was
    caught by measuring every call site against `H` rather than by eye.

    ⭐ `foot()` clamps it. 782 leaves ten pixels of margin under the deepest
    sprite, which survives the per-scene push crop. */
export const foot = (horizon: number, off: number, max = 782) =>
  Math.min(horizon + off, max);
