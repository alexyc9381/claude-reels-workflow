import React from "react";
import { hexA } from "./NoCodeCarouselKit";

/* =========================================================================
   COUNCIL SETS — the answer to "make the scenes way more interesting".

   ⛔ THE MEASURED DEFECT. The shipped 5 slides sit at hue 23-36 deg on every
   single frame, with 92-97% of each frame inside that one hue. Only the
   BRIGHTNESS moved. That is one brown room five times, which is exactly what
   `memory/reel-interscene-contrast.md` bans: every scene needs its own SETTING
   and its own dominant COLOUR, so each swipe is a colour pattern-interrupt.

   Every palette below is engineered so neighbouring slides jump >=26 deg of
   hue. Kinds are real PLACES with their own furniture, not one room recoloured.
   ========================================================================= */

export type Pal = { wall: string; wall2: string; trim: string; trim2: string; floor: string; floorD: string; dark: string; glow: string };

/* --- variant A: five stages of one night ------------------------------- */
export const NIGHT:  Pal = { wall: "#243452", wall2: "#141E33", trim: "#3B5075", trim2: "#22304A", floor: "#26324A", floorD: "#141B2A", dark: "#080C16", glow: "#FFD98A" };
export const LOCKER: Pal = { wall: "#8A6A2E", wall2: "#5E471C", trim: "#B08C3E", trim2: "#6E5423", floor: "#7A5C28", floorD: "#4A3617", dark: "#1C1406", glow: "#FFE6A6" };
export const BENCH:  Pal = { wall: "#6E2A2C", wall2: "#45161A", trim: "#9A4038", trim2: "#5C2020", floor: "#5E2422", floorD: "#361214", dark: "#170708", glow: "#FFD2A0" };
export const GREENR: Pal = { wall: "#2E5240", wall2: "#1A3327", trim: "#437A5C", trim2: "#264836", floor: "#2A4A38", floorD: "#173023", dark: "#08170F", glow: "#CFF0C8" };
export const PLUM:   Pal = { wall: "#4A2350", wall2: "#2C1230", trim: "#6E3878", trim2: "#3C1A42", floor: "#3E1E44", floorD: "#240E28", dark: "#12060F", glow: "#F2C6FF" };

/* --- variant B: the idea as an object on a test line -------------------- */
export const LAB:    Pal = { wall: "#1C4A4E", wall2: "#0E2E32", trim: "#2E7278", trim2: "#164046", floor: "#1A4246", floorD: "#0B282C", dark: "#04161A", glow: "#9FF2E6" };
export const AMBER:  Pal = { wall: "#8A5A1E", wall2: "#5A3810", trim: "#B58230", trim2: "#6E4616", floor: "#7A4E1A", floorD: "#482C0C", dark: "#1C1004", glow: "#FFDD96" };
export const PRESS:  Pal = { wall: "#6E2222", wall2: "#420F12", trim: "#9E3A30", trim2: "#5A1A18", floor: "#5C1E1C", floorD: "#340C0E", dark: "#150506", glow: "#FFC0A0" };
export const RACK:   Pal = { wall: "#26543C", wall2: "#123425", trim: "#3C7E58", trim2: "#1E4830", floor: "#204A34", floorD: "#0F2C1E", dark: "#06160E", glow: "#C6F0CE" };
export const INDIGO: Pal = { wall: "#2E2C62", wall2: "#181640", trim: "#4A468A", trim2: "#2A2758", floor: "#282652", floorD: "#151334", dark: "#080716", glow: "#C8C4FF" };

/* --- variant C: one chamber, five hard colour swaps --------------------- */
export const C_EMBER: Pal = { wall: "#6A4A33", wall2: "#4A3220", trim: "#8A6440", trim2: "#5A3D26", floor: "#6B4A30", floorD: "#432C1B", dark: "#180F08", glow: "#F8E0A8" };
export const C_TEAL:  Pal = { wall: "#1F4A4C", wall2: "#123032", trim: "#2F6E70", trim2: "#1A4244", floor: "#1C4244", floorD: "#0E2A2C", dark: "#061618", glow: "#B6EEE8" };
export const C_PLUM:  Pal = { wall: "#50264E", wall2: "#30142F", trim: "#743C72", trim2: "#411C40", floor: "#441F42", floorD: "#280F27", dark: "#12060F", glow: "#F0C4EE" };
export const C_GOLD:  Pal = { wall: "#8A6A22", wall2: "#5C4614", trim: "#B58F32", trim2: "#6E541A", floor: "#7A5E1E", floorD: "#4A3810", dark: "#1C1404", glow: "#FFE9A6" };
export const C_FOR:   Pal = { wall: "#2A5238", wall2: "#163222", trim: "#3E7A52", trim2: "#22462E", floor: "#244A32", floorD: "#122E1E", dark: "#07170E", glow: "#CCEFC4" };

export type Kind =
  | "night" | "lockers" | "bench" | "archive" | "doors"
  | "lab" | "stations" | "press" | "rack" | "hatch";

/* the shared shell every set inherits: wall, floor, converging boards, cornice.
   Only the FURNITURE below it changes, which is what makes them read as one
   world and still as five different places. */
export const SetBg: React.FC<{ p: Pal; kind: Kind; horizon?: number }> = ({ p, kind, horizon = 640 }) => {
  const g = kind;
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <defs>
        <linearGradient id={`sw-${g}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.wall} /><stop offset="1" stopColor={p.wall2} /></linearGradient>
        <linearGradient id={`sf-${g}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.floorD} /><stop offset="1" stopColor={p.floor} /></linearGradient>
        <radialGradient id={`sg-${g}`}><stop offset="0" stopColor={hexA(p.glow, 0.55)} /><stop offset="1" stopColor={hexA(p.glow, 0)} /></radialGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={horizon} fill={`url(#sw-${g})`} />
      <rect x={0} y={horizon} width={1080} height={1350 - horizon} fill={`url(#sf-${g})`} />
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={540 + (i * 90 - 540) * 0.36} y1={horizon} x2={i * 90} y2={1350} stroke={hexA(p.dark, 0.26)} strokeWidth={2} />)}
      <rect x={0} y={horizon} width={1080} height={7} fill={hexA(p.dark, 0.5)} />
      <rect x={0} y={0} width={1080} height={22} fill={p.trim} />
      <rect x={0} y={22} width={1080} height={9} fill={hexA(p.dark, 0.45)} />
      {Array.from({ length: 27 }, (_, i) => <rect key={i} x={i * 40 + 8} y={31} width={22} height={13} fill={p.trim2} />)}

      {/* A1 · 2am. one window, one moon, one lamp cone on the desk below */}
      {kind === "night" && (<>
        <rect x={686} y={110} width={300} height={330} rx={6} fill={hexA("#0A1220", 0.9)} stroke={p.trim} strokeWidth={10} />
        <line x1={836} y1={110} x2={836} y2={440} stroke={p.trim} strokeWidth={7} />
        <line x1={686} y1={275} x2={986} y2={275} stroke={p.trim} strokeWidth={7} />
        <circle cx={906} cy={196} r={38} fill="#EFE7CC" opacity={0.92} />
        <circle cx={890} cy={186} r={34} fill="#0A1220" opacity={0.85} />
        {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={700 + ((i * 137) % 280)} cy={124 + ((i * 91) % 300)} r={2.4} fill="#E8ECFF" opacity={0.5} />)}
        <path d={`M300 ${horizon - 30} L120 1250 L960 1250 L780 ${horizon - 30} Z`} fill={`url(#sg-${g})`} opacity={0.5} />
        <rect x={0} y={horizon - 34} width={1080} height={12} fill={hexA(p.dark, 0.4)} />
      </>)}

      {/* A2 · the locker room: four tall doors, one per hire */}
      {kind === "lockers" && (<>
        {[70, 320, 570, 820].map((x, i) => (
          <g key={i}>
            <rect x={x} y={132} width={190} height={horizon - 176} rx={6} fill={hexA(p.dark, 0.34)} stroke={p.trim} strokeWidth={8} />
            <rect x={x + 22} y={172} width={146} height={30} rx={4} fill={hexA(p.glow, 0.18)} stroke={hexA(p.dark, 0.4)} strokeWidth={3} />
            {[0, 1, 2].map((k) => <rect key={k} x={x + 34} y={224 + k * 16} width={122} height={6} rx={3} fill={hexA(p.dark, 0.42)} />)}
            <circle cx={x + 158} cy={horizon - 150} r={9} fill="#C6A45E" />
          </g>
        ))}
        <rect x={0} y={horizon - 30} width={1080} height={14} fill={p.trim} />
      </>)}

      {/* A3 · the bench: the ONE courtroom slide, and it is deep crimson */}
      {kind === "bench" && (<>
        <rect x={0} y={50} width={1080} height={horizon - 50} fill={hexA("#3E1012", 0.5)} />
        {[0, 1].map((side) => {
          const x0 = side ? 1080 : 0, d = side ? -1 : 1;
          return (
            <g key={side}>
              <path d={`M${x0} 50 L${x0 + d * 250} 50 Q${x0 + d * 208} ${horizon * 0.55} ${x0 + d * 246} ${horizon} L${x0} ${horizon} Z`} fill="#7A2A28" />
              {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${x0 + d * (26 + k * 46)} 50 Q${x0 + d * (10 + k * 46)} ${horizon * 0.6} ${x0 + d * (30 + k * 46)} ${horizon}`} stroke={hexA("#2E0A0C", 0.5)} strokeWidth={9} fill="none" />)}
            </g>
          );
        })}
        <circle cx={540} cy={272} r={100} fill={hexA("#C6A45E", 0.14)} stroke="#C6A45E" strokeWidth={7} />
        {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <circle key={k} cx={540 + Math.cos(a) * 88} cy={272 + Math.sin(a) * 88} r={5} fill="#C6A45E" />; })}
        <rect x={0} y={horizon - 22} width={1080} height={22} fill={p.trim} />
      </>)}

      {/* A4/C5 · the archive: ledger spines, wall to wall */}
      {kind === "archive" && (<>
        {[86, 250, 414].map((y, row) => (
          <g key={row}>
            <rect x={40} y={y + 116} width={1000} height={16} fill={p.trim} />
            <rect x={40} y={y + 132} width={1000} height={7} fill={hexA(p.dark, 0.45)} />
            {Array.from({ length: 34 }, (_, i) => {
              const w = 18 + ((i * 7 + row * 5) % 4) * 5, h = 82 + ((i * 5 + row * 3) % 5) * 6;
              const tone = ["#7A3B32", "#4A5E42", "#6B4A2E", "#3E4A56", "#5E6E38"][(i + row) % 5];
              return <rect key={i} x={46 + i * 29} y={y + 116 - h} width={w} height={h} rx={2} fill={tone} stroke={hexA(p.dark, 0.4)} strokeWidth={2} />;
            })}
          </g>
        ))}
      </>)}

      {/* A5 · the doors you walk out of */}
      {kind === "doors" && (<>
        <ellipse cx={540} cy={horizon + 60} rx={430} ry={130} fill={hexA(p.glow, 0.22)} />
        <path d={`M300 ${horizon - 40} L300 300 A240 240 0 0 1 780 300 L780 ${horizon - 40} Z`} fill={hexA(p.dark, 0.5)} stroke={p.trim} strokeWidth={14} />
        <rect x={318} y={318} width={210} height={horizon - 358} fill={p.trim2} stroke={p.trim} strokeWidth={8} />
        <rect x={552} y={318} width={210} height={horizon - 358} fill={p.trim2} stroke={p.trim} strokeWidth={8} />
        <rect x={536} y={318} width={8} height={horizon - 358} fill={hexA(p.glow, 0.34)} />
        <circle cx={512} cy={horizon - 150} r={11} fill="#C6A45E" />
        <circle cx={568} cy={horizon - 150} r={11} fill="#C6A45E" />
      </>)}

      {/* B1 · the lab: a belt running left to right, under an inspection lamp */}
      {kind === "lab" && (<>
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={60 + i * 170} y={120} width={120} height={210} rx={8} fill={hexA(p.dark, 0.34)} stroke={p.trim} strokeWidth={6} />)}
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={"m" + i} x={78 + i * 170} y={150} width={84} height={12} rx={6} fill={hexA(p.glow, 0.4)} />)}
        <rect x={0} y={horizon - 34} width={1080} height={16} fill={p.trim} />
        <rect x={0} y={horizon - 18} width={1080} height={8} fill={hexA(p.dark, 0.5)} />
        <ellipse cx={540} cy={horizon + 40} rx={480} ry={90} fill={hexA(p.glow, 0.16)} />
      </>)}

      {/* B2 · four test stations bolted to the wall */}
      {kind === "stations" && (<>
        {[52, 310, 568, 826].map((x, i) => (
          <g key={i}>
            <rect x={x} y={126} width={202} height={horizon - 190} rx={10} fill={hexA(p.dark, 0.3)} stroke={p.trim} strokeWidth={7} />
            <rect x={x + 20} y={152} width={162} height={70} rx={6} fill={hexA(p.glow, 0.2)} stroke={hexA(p.dark, 0.4)} strokeWidth={3} />
            {[0, 1, 2].map((k) => <circle key={k} cx={x + 46 + k * 56} cy={horizon - 118} r={14} fill={hexA(p.glow, 0.32)} stroke={p.trim} strokeWidth={4} />)}
          </g>
        ))}
        <rect x={0} y={horizon - 28} width={1080} height={12} fill={p.trim} />
      </>)}

      {/* B3 · the press: one big machine that comes down on the thing */}
      {kind === "press" && (<>
        <rect x={140} y={70} width={800} height={130} rx={10} fill={hexA(p.dark, 0.42)} stroke={p.trim} strokeWidth={9} />
        <rect x={210} y={200} width={80} height={210} fill={p.trim2} stroke={hexA(p.dark, 0.5)} strokeWidth={5} />
        <rect x={790} y={200} width={80} height={210} fill={p.trim2} stroke={hexA(p.dark, 0.5)} strokeWidth={5} />
        <rect x={330} y={330} width={420} height={86} rx={8} fill={p.trim} stroke={hexA(p.dark, 0.55)} strokeWidth={7} />
        <ellipse cx={540} cy={horizon + 30} rx={430} ry={80} fill={hexA(p.glow, 0.14)} />
        <rect x={0} y={horizon - 24} width={1080} height={12} fill={p.trim} />
      </>)}

      {/* B4 · the rack: stamped cards filed in slots */}
      {kind === "rack" && (<>
        {[110, 300, 490].map((y, row) => (
          <g key={row}>
            <rect x={56} y={y} width={968} height={150} rx={8} fill={hexA(p.dark, 0.26)} stroke={p.trim} strokeWidth={6} />
            {Array.from({ length: 11 }, (_, i) => <rect key={i} x={76 + i * 86} y={y + 18} width={64} height={114} rx={4} fill={["#D7C9A6", "#C7D7A6", "#A6C7D7", "#D7A6A6"][(i + row) % 4]} opacity={0.85} stroke={hexA(p.dark, 0.4)} strokeWidth={2} />)}
          </g>
        ))}
      </>)}

      {/* B5 · the hatch it comes out of */}
      {kind === "hatch" && (<>
        <rect x={300} y={180} width={480} height={330} rx={16} fill={hexA(p.dark, 0.46)} stroke={p.trim} strokeWidth={12} />
        <rect x={340} y={222} width={400} height={200} rx={8} fill={hexA(p.glow, 0.24)} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={340} y={236 + k * 46} width={400} height={10} rx={5} fill={hexA(p.dark, 0.3)} />)}
        <rect x={300} y={470} width={480} height={40} rx={8} fill={p.trim} />
        <ellipse cx={540} cy={horizon + 50} rx={400} ry={86} fill={hexA(p.glow, 0.18)} />
      </>)}
    </svg>
  );
};

/* =========================================================================
   V2 SETS — one chamber, six rooms, each with its OWN furniture.
   ⛔ "the scenes need to be more detailed" was answered with FURNITURE, not
   more texture: a gallery of pews, a clerk's desk, a stepped dais, ladders and
   archive boxes, a corridor beyond the doors. Every set still inherits the same
   shell so the six read as one building.
   ========================================================================= */
export const V_EMBER:  Pal = { wall: "#6A4A33", wall2: "#4A3220", trim: "#8A6440", trim2: "#5A3D26", floor: "#6B4A30", floorD: "#432C1B", dark: "#180F08", glow: "#F8E0A8" };
export const V_SLATE:  Pal = { wall: "#2A3E5C", wall2: "#16243A", trim: "#3F5C82", trim2: "#233650", floor: "#26364E", floorD: "#141E2E", dark: "#070C16", glow: "#CFE2FF" };
export const V_GOLD:   Pal = { wall: "#8A6A22", wall2: "#5C4614", trim: "#B58F32", trim2: "#6E541A", floor: "#7A5E1E", floorD: "#4A3810", dark: "#1C1404", glow: "#FFE9A6" };
export const V_PLUM:   Pal = { wall: "#50264E", wall2: "#2E1230", trim: "#743C72", trim2: "#411C40", floor: "#441F42", floorD: "#280F27", dark: "#12060F", glow: "#F0C4EE" };
export const V_FOREST: Pal = { wall: "#2A5238", wall2: "#163222", trim: "#3E7A52", trim2: "#22462E", floor: "#244A32", floorD: "#122E1E", dark: "#07170E", glow: "#CCEFC4" };
export const V_CRIM:   Pal = { wall: "#6E2A2C", wall2: "#42151A", trim: "#9A4038", trim2: "#5C2020", floor: "#5E2422", floorD: "#361214", dark: "#170708", glow: "#FFD2A0" };

export type Kind2 = "gallery" | "empty" | "hall" | "dais" | "stacks" | "corridor";

export const SetBg2: React.FC<{ p: Pal; kind: Kind2; horizon?: number }> = ({ p, kind, horizon = 640 }) => {
  const g = "v-" + kind;
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <defs>
        <linearGradient id={`w${g}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.wall} /><stop offset="1" stopColor={p.wall2} /></linearGradient>
        <linearGradient id={`f${g}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.floorD} /><stop offset="1" stopColor={p.floor} /></linearGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={horizon} fill={`url(#w${g})`} />
      <rect x={0} y={horizon} width={1080} height={1350 - horizon} fill={`url(#f${g})`} />
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={540 + (i * 90 - 540) * 0.36} y1={horizon} x2={i * 90} y2={1350} stroke={hexA(p.dark, 0.26)} strokeWidth={2} />)}
      <rect x={0} y={horizon} width={1080} height={7} fill={hexA(p.dark, 0.5)} />
      {/* cornice + dentils, the constant that keeps it one building */}
      <rect x={0} y={0} width={1080} height={22} fill={p.trim} />
      <rect x={0} y={22} width={1080} height={9} fill={hexA(p.dark, 0.45)} />
      {Array.from({ length: 27 }, (_, i) => <rect key={i} x={i * 40 + 8} y={31} width={22} height={13} fill={p.trim2} />)}
      <rect x={0} y={44} width={1080} height={6} fill={hexA(p.glow, 0.16)} />

      {/* 1 · THE GALLERY — the room seen from the public benches */}
      {kind === "gallery" && (<>
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={40} y={168 + k * 96} width={1000} height={56} rx={5} fill={hexA(p.dark, 0.34)} stroke={p.trim} strokeWidth={5} />
            <rect x={40} y={224 + k * 96} width={1000} height={12} fill={hexA(p.dark, 0.5)} />
            <rect x={40} y={168 + k * 96} width={1000} height={6} fill={hexA(p.glow, 0.14)} />
          </g>
        ))}
        <circle cx={540} cy={110} r={54} fill={hexA(p.glow, 0.14)} stroke="#C6A45E" strokeWidth={6} />
        {[0, 3, 6, 9].map((h) => { const a = (h / 12) * Math.PI * 2 - Math.PI / 2; return <circle key={h} cx={540 + Math.cos(a) * 40} cy={110 + Math.sin(a) * 40} r={4} fill="#C6A45E" />; })}
        {/* clerk's desk, low left, half out of frame: an occluder for depth */}
        <rect x={-30} y={horizon - 40} width={240} height={150} rx={6} fill={hexA(p.dark, 0.42)} stroke={p.trim} strokeWidth={6} />
        <ellipse cx={540} cy={horizon + 96} rx={520} ry={80} fill={hexA(p.glow, 0.11)} />
      </>)}

      {/* 2 · THE EMPTY ROOM — one chair, one long shadow, nothing else */}
      {kind === "empty" && (<>
        {[110, 470, 830].map((x, i) => (<rect key={i} x={x} y={70} width={140} height={horizon - 150} rx={4} fill={hexA(p.dark, 0.18)} stroke={p.trim2} strokeWidth={5} />))}
        <rect x={0} y={horizon - 34} width={1080} height={12} fill={p.trim} />
        <ellipse cx={540} cy={horizon + 150} rx={430} ry={90} fill={hexA(p.glow, 0.10)} />
      </>)}

      {/* 3 · THE HALL — pilasters and a brass rail, where the four line up */}
      {kind === "hall" && (<>
        {[24, 286, 548, 810].map((x, i) => (
          <g key={i}>
            <rect x={x} y={62} width={64} height={horizon - 116} fill={hexA(p.glow, 0.07)} stroke={p.trim2} strokeWidth={5} />
            <rect x={x - 8} y={62} width={80} height={22} fill={p.trim} />
            <rect x={x - 8} y={horizon - 76} width={80} height={22} fill={p.trim} />
          </g>
        ))}
        <rect x={0} y={horizon - 128} width={1080} height={9} fill="#C6A45E" opacity={0.7} />
        {[120, 400, 680, 960].map((x, i) => <rect key={i} x={x} y={horizon - 128} width={12} height={104} fill="#C6A45E" opacity={0.6} />)}
      </>)}

      {/* 4 · THE DAIS — drape, seal, and a stepped platform to stand ON */}
      {kind === "dais" && (<>
        <rect x={0} y={50} width={1080} height={horizon - 50} fill={hexA("#2C0E2E", 0.45)} />
        {[0, 1].map((side) => {
          const x0 = side ? 1080 : 0, d = side ? -1 : 1;
          return (
            <g key={side}>
              <path d={`M${x0} 50 L${x0 + d * 262} 50 Q${x0 + d * 216} ${horizon * 0.55} ${x0 + d * 256} ${horizon} L${x0} ${horizon} Z`} fill="#5E2A5C" />
              {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${x0 + d * (26 + k * 48)} 50 Q${x0 + d * (10 + k * 48)} ${horizon * 0.6} ${x0 + d * (30 + k * 48)} ${horizon}`} stroke={hexA("#1C0620", 0.5)} strokeWidth={9} fill="none" />)}
              <ellipse cx={x0 + d * 246} cy={horizon * 0.58} rx={26} ry={40} fill="#C6A45E" opacity={0.85} />
            </g>
          );
        })}
        <circle cx={540} cy={228} r={92} fill={hexA("#C6A45E", 0.14)} stroke="#C6A45E" strokeWidth={7} />
        {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <circle key={k} cx={540 + Math.cos(a) * 80} cy={228 + Math.sin(a) * 80} r={5} fill="#C6A45E" />; })}
        {/* three steps up to the bench */}
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={300 - k * 56} y={horizon + 6 + k * 46} width={480 + k * 112} height={46} fill={k % 2 ? "#3A1838" : "#4A2148"} />
            <rect x={300 - k * 56} y={horizon + 6 + k * 46} width={480 + k * 112} height={7} fill={hexA("#C6A45E", 0.35)} />
          </g>
        ))}
      </>)}

      {/* 5 · THE STACKS — spines, a rolling ladder, boxes on the floor */}
      {kind === "stacks" && (<>
        {[70, 234, 398].map((y, row) => (
          <g key={row}>
            <rect x={40} y={y + 116} width={1000} height={16} fill={p.trim} />
            <rect x={40} y={y + 132} width={1000} height={7} fill={hexA(p.dark, 0.45)} />
            {Array.from({ length: 34 }, (_, i) => {
              const w = 18 + ((i * 7 + row * 5) % 4) * 5, h = 82 + ((i * 5 + row * 3) % 5) * 6;
              const tone = ["#7A3B32", "#4A5E42", "#6B4A2E", "#3E4A56", "#5E6E38"][(i + row) % 5];
              return <rect key={i} x={46 + i * 29} y={y + 116 - h} width={w} height={h} rx={2} fill={tone} stroke={hexA(p.dark, 0.4)} strokeWidth={2} />;
            })}
          </g>
        ))}
        {/* the rolling ladder, hard right, running off the top: depth */}
        <g opacity={0.95}>
          <rect x={906} y={54} width={16} height={horizon - 40} fill="#8A6A3E" />
          <rect x={1000} y={54} width={16} height={horizon - 40} fill="#8A6A3E" />
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={906} y={92 + k * 60} width={110} height={12} fill="#A07E4A" />)}
        </g>
        {/* archive boxes on the floor */}
        {[[60, 60], [150, 46], [880, 54]].map(([x, w], i) => (
          <g key={i}>
            <rect x={x} y={horizon + 24} width={w * 1.9} height={w} rx={4} fill="#8A7A56" stroke={hexA(p.dark, 0.45)} strokeWidth={4} />
            <rect x={x} y={horizon + 24} width={w * 1.9} height={12} fill={hexA(p.glow, 0.22)} />
          </g>
        ))}
      </>)}

      {/* 6 · THE CORRIDOR — the doors are OPEN, and there is a lit hall beyond */}
      {kind === "corridor" && (<>
        <path d={`M300 ${horizon - 20} L300 300 A240 240 0 0 1 780 300 L780 ${horizon - 20} Z`} fill={hexA(p.dark, 0.6)} stroke={p.trim} strokeWidth={14} />
        {/* the hall receding through the arch */}
        <g clipPath="url(#none)">
          <rect x={360} y={330} width={360} height={horizon - 350} fill={hexA(p.glow, 0.30)} />
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <rect x={360 + k * 40} y={330 + k * 30} width={360 - k * 80} height={horizon - 350 - k * 46} fill={hexA(p.glow, 0.10 + k * 0.05)} />
              <rect x={360 + k * 40} y={330 + k * 30} width={360 - k * 80} height={8} fill={hexA(p.dark, 0.3)} />
            </g>
          ))}
        </g>
        {/* the two door leaves, swung open against the jambs */}
        <path d={`M300 ${horizon - 20} L300 316 L214 350 L214 ${horizon + 16} Z`} fill={p.trim2} stroke={p.trim} strokeWidth={8} />
        <path d={`M780 ${horizon - 20} L780 316 L866 350 L866 ${horizon + 16} Z`} fill={p.trim2} stroke={p.trim} strokeWidth={8} />
        <ellipse cx={540} cy={horizon + 70} rx={330} ry={92} fill={hexA(p.glow, 0.26)} />
      </>)}
    </svg>
  );
};

/* a sprite standing ON something, with the contact shadow that makes it land.
   ⛔ the v1 CTA had the judge floating on the door glow with nothing under him. */
export const Stand: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 0.34 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: w * 0.16, borderRadius: "50%", background: `rgba(20,10,6,${o})`, filter: "blur(2px)", zIndex: 8 }} />
);

/* =========================================================================
   V3 SETS — the rooms the deck actually needed.
   ⛔ "more detailed / more interesting" was answered by giving each room a
   thing that is HAPPENING in it, not more texture: a gallery with a watching
   crowd, a wall of identical YES stamps, four working booths, a pit with the
   paper being pulled three ways.
   ========================================================================= */
export const V_EMBERDK: Pal = { wall: "#3E2A1B", wall2: "#22160D", trim: "#6A4A2C", trim2: "#3A2716", floor: "#3A2718", floorD: "#1E1309", dark: "#0B0703", glow: "#FFD98A" };
export const V_AMBER: Pal = { wall: "#9A7526", wall2: "#6B5018", trim: "#C69C38", trim2: "#7E601E", floor: "#8A6A22", floorD: "#544012", dark: "#201704", glow: "#FFEFB4" };

export type Kind3 = "gallerypacked" | "yeswall" | "booths" | "pit" | "quad";

export const SetBg3: React.FC<{ p: Pal; kind: Kind3; horizon?: number }> = ({ p, kind, horizon = 640 }) => {
  const g = "x-" + kind;
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <defs>
        <linearGradient id={`w${g}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.wall} /><stop offset="1" stopColor={p.wall2} /></linearGradient>
        <linearGradient id={`f${g}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.floorD} /><stop offset="1" stopColor={p.floor} /></linearGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={horizon} fill={`url(#w${g})`} />
      <rect x={0} y={horizon} width={1080} height={1350 - horizon} fill={`url(#f${g})`} />
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={540 + (i * 90 - 540) * 0.36} y1={horizon} x2={i * 90} y2={1350} stroke={hexA(p.dark, 0.26)} strokeWidth={2} />)}
      <rect x={0} y={horizon} width={1080} height={7} fill={hexA(p.dark, 0.5)} />
      <rect x={0} y={0} width={1080} height={22} fill={p.trim} />
      <rect x={0} y={22} width={1080} height={9} fill={hexA(p.dark, 0.45)} />
      {Array.from({ length: 27 }, (_, i) => <rect key={i} x={i * 40 + 8} y={31} width={22} height={13} fill={p.trim2} />)}
      <rect x={0} y={44} width={1080} height={6} fill={hexA(p.glow, 0.16)} />

      {/* 1 · A PACKED GALLERY. The room is full and they are all watching you. */}
      {kind === "gallerypacked" && (<>
        <circle cx={540} cy={104} r={50} fill={hexA(p.glow, 0.16)} stroke="#C6A45E" strokeWidth={6} />
        {[0, 3, 6, 9].map((h) => { const a = (h / 12) * Math.PI * 2 - Math.PI / 2; return <circle key={h} cx={540 + Math.cos(a) * 37} cy={104 + Math.sin(a) * 37} r={4} fill="#C6A45E" />; })}
        <path d="M540 104 L540 78 M540 104 L560 116" stroke="#C6A45E" strokeWidth={5} strokeLinecap="round" />
        {[0, 1, 2].map((k) => {
          const y = 208 + k * 108, sc = 1 - k * 0.06;
          return (
            <g key={k} opacity={0.92 - k * 0.1}>
              {/* the crowd: heads and shoulders, staggered, never a repeated pitch */}
              {Array.from({ length: 9 }, (_, i) => {
                const x = 66 + i * 118 + ((k * 37 + i * 19) % 26) - 13;
                return (
                  <g key={i} fill={hexA(p.dark, 0.68)}>
                    <circle cx={x} cy={y - 24 * sc} r={25 * sc} />
                    <path d={`M${x - 42 * sc} ${y + 30 * sc} q${42 * sc} ${-44 * sc} ${84 * sc} 0 Z`} />
                  </g>
                );
              })}
              <rect x={40} y={y + 22} width={1000} height={44} rx={5} fill={hexA(p.dark, 0.34)} stroke={p.trim} strokeWidth={5} />
              <rect x={40} y={y + 22} width={1000} height={6} fill={hexA(p.glow, 0.14)} />
            </g>
          );
        })}
        {/* clerk's desk with a stack of files, half out of frame */}
        <rect x={-30} y={horizon - 56} width={250} height={170} rx={6} fill={hexA(p.dark, 0.46)} stroke={p.trim} strokeWidth={6} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={38} y={horizon - 76 - k * 13} width={132} height={13} rx={2} fill={["#E9DCBB", "#D9C79E", "#E9DCBB", "#CDBB93"][k]} stroke={hexA(p.dark, 0.4)} strokeWidth={2} transform={`rotate(${k % 2 ? -1.6 : 1.2} 104 ${horizon - 70 - k * 13})`} />)}
        {/* a knocked-over cup, because a real room has one thing out of place */}
        <g transform={`translate(944 ${horizon - 34}) rotate(-72)`}>
          <rect x={0} y={0} width={46} height={36} rx={5} fill="#E9DCBB" stroke={hexA(p.dark, 0.5)} strokeWidth={3} />
          <path d="M46 8 q16 10 0 20" fill="none" stroke={hexA(p.dark, 0.5)} strokeWidth={4} />
        </g>
        <ellipse cx={962} cy={horizon + 30} rx={62} ry={13} fill={hexA("#4A2A12", 0.5)} />
        <ellipse cx={540} cy={horizon + 96} rx={520} ry={80} fill={hexA(p.glow, 0.12)} />
      </>)}

      {/* 2 · THE WALL OF YES. ⛔ v1 drew the plaques as grey bars, so the wall
         meant "a lot of somethings" and the reader had to be told it meant yes.
         Every plaque now carries the actual words, varied so it reads as many
         separate answers rather than one repeated tile — and all of them are
         held well under the hero plaque's value so the big one still wins. */}
      {kind === "yeswall" && (<>
        {([
          ["YES!", 72, 96, 40, -6, 0.52], ["GREAT IDEA", 300, 74, 30, 4, 0.4],
          ["DO IT", 700, 92, 38, -3, 0.46], ["LOVE THIS", 852, 176, 27, 6, 0.34],
          ["100%", 46, 232, 34, 5, 0.4], ["YES, GO", 236, 214, 31, -4, 0.36],
          ["SO SMART", 560, 206, 26, 3, 0.3], ["YES!", 900, 296, 42, -5, 0.5],
          ["THIS WILL WORK", 96, 366, 25, 3, 0.3], ["BRILLIANT", 452, 352, 29, -3, 0.34],
          ["YES DO IT!", 742, 400, 33, 5, 0.42], ["PERFECT", 40, 480, 30, -4, 0.34],
          ["AMAZING", 330, 486, 27, 4, 0.3], ["YES", 660, 512, 46, -6, 0.5],
          ["GREAT IDEA", 852, 588, 26, 3, 0.28], ["YES!", 108, 596, 38, 5, 0.44],
        ] as [string, number, number, number, number, number][]).map(([t, x, y, fs, rot, op], k) => (
          <g key={k} transform={`rotate(${rot} ${x} ${y})`} opacity={op}>
            <rect x={x} y={y} width={t.length * fs * 0.68 + 34} height={fs * 1.9} rx={fs * 0.5} fill={hexA("#3FAE78", 0.22)} stroke="#3FAE78" strokeWidth={3.5} />
            <text x={x + (t.length * fs * 0.68 + 34) / 2} y={y + fs * 1.32} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight={700} fontSize={fs} fill="#8FE7BC">{t}</text>
          </g>
        ))}
        <rect x={0} y={horizon - 30} width={1080} height={13} fill={p.trim} />
        <ellipse cx={540} cy={horizon + 140} rx={430} ry={92} fill={hexA(p.glow, 0.11)} />
      </>)}

      {/* 3 · FOUR BOOTHS. One alcove each, so they cannot be in each other's. */}
      {kind === "booths" && (<>
        {[24, 286, 548, 810].map((x, i) => (
          <g key={i}>
            <path d={`M${x} ${horizon - 26} L${x} 250 A123 123 0 0 1 ${x + 246} 250 L${x + 246} ${horizon - 26} Z`} fill={hexA(p.dark, 0.34)} stroke={p.trim} strokeWidth={9} />
            <path d={`M${x + 18} ${horizon - 26} L${x + 18} 262 A105 105 0 0 1 ${x + 228} 262 L${x + 228} ${horizon - 26} Z`} fill="none" stroke={hexA(p.glow, 0.14)} strokeWidth={4} />
            <rect x={x + 60} y={128} width={126} height={11} rx={5} fill="#C6A45E" opacity={0.75} />
          </g>
        ))}
        <rect x={0} y={horizon - 26} width={1080} height={14} fill={p.trim} />
        <rect x={0} y={horizon - 12} width={1080} height={7} fill={hexA(p.dark, 0.5)} />
      </>)}

      {/* 3b · THE QUAD. Two rows of two, so each one gets a quarter of the frame
         instead of a quarter of a row. ⛔ Four side by side gave every name a
         246px column, which is why the job line was unreadable. */}
      {kind === "quad" && (<>
        {[0, 1].map((r) => [0, 1].map((c) => {
          const x = 28 + c * 526, y = 158 + r * 456, w = 498, h = 428;
          return (
            <g key={`${r}-${c}`}>
              <path d={`M${x} ${y + h} L${x} ${y + 130} A249 249 0 0 1 ${x + w} ${y + 130} L${x + w} ${y + h} Z`} fill={hexA(p.dark, 0.46)} stroke={p.trim} strokeWidth={11} />
              <path d={`M${x + 20} ${y + h} L${x + 20} ${y + 142} A229 229 0 0 1 ${x + w - 20} ${y + 142} L${x + w - 20} ${y + h} Z`} fill="none" stroke={hexA(p.glow, 0.2)} strokeWidth={4} />
              <ellipse cx={x + w / 2} cy={y + h - 6} rx={196} ry={20} fill={hexA(p.dark, 0.5)} />
              <rect x={x - 6} y={y + h} width={w + 12} height={13} fill={p.trim} />
            </g>
          );
        }))}
      </>)}

      {/* 4 · THE PIT. A round table, lit from above, nothing else in the room. */}
      {kind === "pit" && (<>
        <path d={`M420 44 L660 44 L760 300 L320 300 Z`} fill={hexA(p.glow, 0.16)} />
        <rect x={470} y={30} width={140} height={26} rx={6} fill="#C6A45E" />
        {[0, 1, 2].map((k) => <rect key={k} x={92 + k * 330} y={96} width={186} height={horizon - 260} rx={6} fill={hexA(p.dark, 0.2)} stroke={p.trim2} strokeWidth={4} />)}
        <ellipse cx={540} cy={horizon + 120} rx={410} ry={128} fill={hexA(p.dark, 0.38)} />
        <ellipse cx={540} cy={horizon + 92} rx={410} ry={128} fill={p.trim2} stroke={p.trim} strokeWidth={9} />
        <ellipse cx={540} cy={horizon + 78} rx={330} ry={98} fill={hexA(p.glow, 0.14)} />
      </>)}
    </svg>
  );
};
