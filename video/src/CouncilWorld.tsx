import React from "react";
import { hexA } from "./NoCodeCarouselKit";

/* =========================================================================
   THE COUNCIL WORLD — a courthouse, and a DIFFERENT ROOM PER SLIDE.
   ⛔ One room repeated across a deck is the same defect as one format
   repeated: sameness. The agency deck was a cream office; this is deep
   walnut, and each slide moves to another room in the same building.
   variants: arches · panels · shelves · doors
   ========================================================================= */

export type Room = { wall: string; wall2: string; trim: string; trim2: string; floor: string; floorD: string; dark: string; glow: string };
export const CHAMBER: Room = { wall: "#6A4A33", wall2: "#4A3220", trim: "#8A6440", trim2: "#5A3D26", floor: "#6B4A30", floorD: "#432C1B", dark: "#180F08", glow: "#F8E0A8" };
export const PANELS: Room  = { wall: "#43301F", wall2: "#2A1D12", trim: "#6A4B30", trim2: "#3A2818", floor: "#3E2A1A", floorD: "#251809", dark: "#140C06", glow: "#F0D49A" };
export const ARCHIVE: Room = { wall: "#585044", wall2: "#3A342A", trim: "#7A6A50", trim2: "#4A4235", floor: "#5A4A38", floorD: "#382D20", dark: "#161208", glow: "#EFE0B4" };
export const DOORS: Room   = { wall: "#6A4A33", wall2: "#452E1D", trim: "#8A6440", trim2: "#5A3D26", floor: "#6B4A30", floorD: "#432C1B", dark: "#180F08", glow: "#FFEFC4" };

type V = "arches" | "panels" | "shelves" | "doors" | "drape";

export const ChamberBg: React.FC<{ p: Room; variant: V; horizon?: number }> = ({ p, variant, horizon = 640 }) => {
  const gid = variant;
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <defs>
        <linearGradient id={`w-${gid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.wall} /><stop offset="1" stopColor={p.wall2} /></linearGradient>
        <linearGradient id={`f-${gid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.floorD} /><stop offset="1" stopColor={p.floor} /></linearGradient>
        <linearGradient id={`g-${gid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.glow} /><stop offset="1" stopColor={hexA(p.glow, 0.45)} /></linearGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={horizon} fill={`url(#w-${gid})`} />
      <rect x={0} y={horizon} width={1080} height={1350 - horizon} fill={`url(#f-${gid})`} />
      {/* floorboards converging */}
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={540 + (i * 90 - 540) * 0.36} y1={horizon} x2={i * 90} y2={1350} stroke={hexA(p.dark, 0.26)} strokeWidth={2} />)}
      <rect x={0} y={horizon} width={1080} height={7} fill={hexA(p.dark, 0.5)} />

      {/* heavy cornice with dentils, in every room */}
      <rect x={0} y={0} width={1080} height={22} fill={p.trim} />
      <rect x={0} y={22} width={1080} height={9} fill={hexA(p.dark, 0.45)} />
      {Array.from({ length: 27 }, (_, i) => <rect key={i} x={i * 40 + 8} y={31} width={22} height={13} fill={p.trim2} />)}
      <rect x={0} y={44} width={1080} height={6} fill={hexA(p.glow, 0.18)} />

      {variant === "arches" && (<>
        {[110, 440, 770].map((x, i) => (
          <g key={i}>
            <path d={`M${x} ${horizon - 92} L${x} 250 A100 100 0 0 1 ${x + 200} 250 L${x + 200} ${horizon - 92} Z`} fill={`url(#g-${gid})`} opacity={0.9} />
            <path d={`M${x} ${horizon - 92} L${x} 250 A100 100 0 0 1 ${x + 200} 250 L${x + 200} ${horizon - 92} Z`} fill="none" stroke={p.trim} strokeWidth={11} />
            <line x1={x + 100} y1={158} x2={x + 100} y2={horizon - 92} stroke={p.trim} strokeWidth={7} />
            {[0, 1, 2].map((k) => <line key={k} x1={x} y1={300 + k * 84} x2={x + 200} y2={300 + k * 84} stroke={p.trim} strokeWidth={5} />)}
          </g>
        ))}
        {/* light pooling on the floor from the windows */}
        <ellipse cx={540} cy={horizon + 120} rx={520} ry={96} fill={hexA(p.glow, 0.16)} />
      </>)}

      {variant === "panels" && (<>
        {/* raised walnut panels in a grid, no windows: the darkest room */}
        {Array.from({ length: 5 }, (_, c) => Array.from({ length: 3 }, (_, r) => {
          const x = 24 + c * 210, y = 92 + r * 168;
          return (
            <g key={`${c}-${r}`}>
              <rect x={x} y={y} width={186} height={144} rx={4} fill={hexA(p.glow, 0.05)} stroke={p.trim2} strokeWidth={5} />
              <rect x={x + 16} y={y + 16} width={154} height={112} rx={3} fill="none" stroke={hexA(p.dark, 0.34)} strokeWidth={3} />
            </g>
          );
        }))}
        <rect x={0} y={horizon - 26} width={1080} height={10} fill={p.trim} />
      </>)}

      {variant === "shelves" && (<>
        {/* the archive: rows of ledger spines */}
        {[86, 250, 414].map((y, row) => (
          <g key={row}>
            <rect x={40} y={y + 116} width={1000} height={16} fill={p.trim} />
            <rect x={40} y={y + 132} width={1000} height={7} fill={hexA(p.dark, 0.45)} />
            {Array.from({ length: 34 }, (_, i) => {
              const w = 18 + ((i * 7 + row * 5) % 4) * 5, h = 82 + ((i * 5 + row * 3) % 5) * 6;
              const tone = ["#7A3B32", "#5A5238", "#6B4A2E", "#3E4A56", "#6E5A38"][(i + row) % 5];
              return <rect key={i} x={46 + i * 29} y={y + 116 - h} width={w} height={h} rx={2} fill={tone} stroke={hexA(p.dark, 0.4)} strokeWidth={2} />;
            })}
          </g>
        ))}
      </>)}

      {variant === "doors" && (<>
        {/* one tall pair of chamber doors, light spilling from behind */}
        <ellipse cx={540} cy={horizon + 60} rx={430} ry={130} fill={hexA(p.glow, 0.22)} />
        <path d={`M300 ${horizon - 40} L300 300 A240 240 0 0 1 780 300 L780 ${horizon - 40} Z`} fill={hexA(p.dark, 0.5)} stroke={p.trim} strokeWidth={14} />
        <rect x={318} y={318} width={210} height={horizon - 358} fill={p.trim2} stroke={p.trim} strokeWidth={8} />
        <rect x={552} y={318} width={210} height={horizon - 358} fill={p.trim2} stroke={p.trim} strokeWidth={8} />
        {[0, 1].map((d) => [0, 1].map((r) => (
          <rect key={`${d}-${r}`} x={(d ? 552 : 318) + 26} y={344 + r * 122} width={158} height={96} rx={3} fill="none" stroke={hexA(p.glow, 0.22)} strokeWidth={4} />
        )))}
        <circle cx={512} cy={horizon - 150} r={11} fill="#C6A45E" />
        <circle cx={568} cy={horizon - 150} r={11} fill="#C6A45E" />
        <rect x={536} y={318} width={8} height={horizon - 358} fill={hexA(p.glow, 0.30)} />
      </>)}

      {variant === "drape" && (<>
        {/* heavy curtains and the seal: the room a verdict gets read in */}
        <rect x={0} y={50} width={1080} height={horizon - 50} fill={hexA("#5A2A28", 0.55)} />
        {[0, 1].map((side) => {
          const x0 = side ? 1080 : 0, dir = side ? -1 : 1;
          return (
            <g key={side}>
              <path d={`M${x0} 50 L${x0 + dir * 250} 50 Q${x0 + dir * 210} ${horizon * 0.55} ${x0 + dir * 246} ${horizon} L${x0} ${horizon} Z`} fill="#6E2F2C" />
              {[0, 1, 2, 3, 4].map((k) => (
                <path key={k} d={`M${x0 + dir * (26 + k * 46)} 50 Q${x0 + dir * (10 + k * 46)} ${horizon * 0.6} ${x0 + dir * (30 + k * 46)} ${horizon}`} stroke={hexA("#2E1210", 0.5)} strokeWidth={9} fill="none" />
              ))}
              <ellipse cx={x0 + dir * 236} cy={horizon * 0.6} rx={26} ry={40} fill="#C6A45E" opacity={0.9} />
            </g>
          );
        })}
        <circle cx={540} cy={286} r={104} fill={hexA("#C6A45E", 0.16)} stroke="#C6A45E" strokeWidth={7} />
        <circle cx={540} cy={286} r={78} fill="none" stroke={hexA("#C6A45E", 0.6)} strokeWidth={4} />
        {Array.from({ length: 12 }, (_, k) => {
          const a = (k / 12) * Math.PI * 2;
          return <circle key={k} cx={540 + Math.cos(a) * 92} cy={286 + Math.sin(a) * 92} r={5} fill="#C6A45E" />;
        })}
        <rect x={0} y={horizon - 22} width={1080} height={22} fill={p.trim} />
      </>)}
      <rect x={0} y={0} width={1080} height={1350} fill="none" />
    </svg>
  );
};
