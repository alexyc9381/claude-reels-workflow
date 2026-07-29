import React from "react";
import { Easing, interpolate } from "remotion";
import { inter, mono, over, CL } from "./chassis";

const B = { xui: 35, xuiOut: 105 };

export const nfmt = (n: number) => n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(Math.round(n));

const XTIPS = [
  "Paste your worst code first so it",
  "Ask it to argue against its own",
  "Keep one chat you never let it",
  "Give it a budget before you",
  "Make it write the test before it",
  "Tell it what you already tried, not",
  "Delete the context that made it",
  "Let it read your git log before",
  "Ask for the boring version, then",
  "Stop it the moment it starts",
];

// a drawn photo-style profile picture (generic person, not a real account)
const Pfp: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g transform={`translate(${x},${y})`}>
    <defs>
      <clipPath id={`pfpc${r}`}><circle cx={0} cy={0} r={r} /></clipPath>
      <linearGradient id={`pfpbg${r}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6E7F9E" /><stop offset="1" stopColor="#3E4A63" />
      </linearGradient>
    </defs>
    <g clipPath={`url(#pfpc${r})`}>
      <rect x={-r} y={-r} width={r * 2} height={r * 2} fill={`url(#pfpbg${r})`} />
      <circle cx={r * 0.36} cy={-r * 0.5} r={r * 0.5} fill="#8FA6C6" opacity={0.35} />
      {/* shoulders */}
      <ellipse cx={0} cy={r * 1.02} rx={r * 0.86} ry={r * 0.62} fill="#2C3346" />
      <ellipse cx={0} cy={r * 1.04} rx={r * 0.66} ry={r * 0.5} fill="#E9E2D6" />
      {/* head */}
      <ellipse cx={0} cy={-r * 0.06} rx={r * 0.42} ry={r * 0.48} fill="#C89272" />
      <path d={`M${-r * 0.45} ${-r * 0.12} q${r * 0.06} ${-r * 0.62} ${r * 0.45} ${-r * 0.56} q${r * 0.4} ${-r * 0.04} ${r * 0.44} ${r * 0.56} q${-r * 0.16} ${-r * 0.26} ${-r * 0.46} ${-r * 0.24} q${-r * 0.3} ${r * 0.02} ${-r * 0.43} ${r * 0.24} z`} fill="#2A211C" />
      <ellipse cx={-r * 0.15} cy={-r * 0.08} rx={r * 0.05} ry={r * 0.06} fill="#221A16" />
      <ellipse cx={r * 0.15} cy={-r * 0.08} rx={r * 0.05} ry={r * 0.06} fill="#221A16" />
      <path d={`M${-r * 0.13} ${r * 0.16} q${r * 0.13} ${r * 0.1} ${r * 0.26} 0`} stroke="#8C5F45" strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
    </g>
    <circle cx={0} cy={0} r={r} fill="none" stroke="#2F3336" strokeWidth={2} />
  </g>
);

export const XPost: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - B.xui;
  const slam = over(lf, B.xui, 7, Easing.out(Easing.back(1.5)));
  const outP = over(lf, B.xuiOut - 5, 5);
  // three scroll shoves, so the feed never sits still for more than ~0.4s
  const scroll = 262 - (over(lf, B.xui + 12, 14) * 210 + over(lf, B.xui + 30, 14) * 200 + over(lf, B.xui + 48, 16) * 236);
  const rip = (to: number, at: number) => Math.round(interpolate(lf, [B.xui + at, B.xui + at + 24], [0, to], CL));
  const likes = rip(48600, 6), reposts = rip(11200, 8), replies = rip(2847, 10), views = rip(2400000, 4);
  const likePop = Math.max(0, 1 - ((d - 30) / 10)) * (d > 30 ? 1 : 0);
  const finChip = over(lf, B.xui + 52, 8, Easing.out(Easing.back(2)));
  const toast = over(lf, B.xui + 22, 7) * (1 - over(lf, B.xui + 44, 7));
  const G = "#71767B", LINE = "#2F3336", BLUE = "#1D9BF0";
  const Ico: React.FC<{ x: number; d: string; col: string; sc?: number }> = ({ x, d: dd, col, sc = 1 }) => (
    <path d={dd} transform={`translate(${x},0) scale(${0.052 * sc})`} fill={col} />);
  return (
    <div style={{ position: "absolute", left: 34, top: 384, width: 1012, height: 792, borderRadius: 40, overflow: "hidden", zIndex: 40, opacity: (1 - outP), transform: `scale(${0.9 + slam * 0.1})`, transformOrigin: "50% 50%" }}>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs><clipPath id="xclip"><rect x={36} y={248} width={940} height={528} rx={18} /></clipPath></defs>
        <rect x={0} y={0} width={1012} height={792} fill="#000" />
        <rect x={36} y={248} width={940} height={528} rx={18} fill="#000" stroke={LINE} strokeWidth={3} />
        <g clipPath="url(#xclip)">
          <g transform={`translate(0,${scroll})`}>
            {/* sticky-style header */}
            <text x={116} y={104} fontFamily={inter.fontFamily} fontSize={31} fontWeight={800} fill="#E7E9EA">Post</text>
            <path d="M74 92 l-16 12 l16 12" stroke="#E7E9EA" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x={936} y={110} fontFamily="Georgia,serif" fontSize={38} fontWeight={900} fill="#E7E9EA" textAnchor="end">X</text>
            <line x1={36} y1={130} x2={976} y2={130} stroke={LINE} strokeWidth={2} />
            {/* author row */}
            <Pfp x={112} y={188} r={36} />
            <text x={168} y={180} fontFamily={inter.fontFamily} fontSize={28} fontWeight={800} fill="#E7E9EA">Marcus Vale</text>
            <circle cx={358} cy={171} r={12} fill={BLUE} /><text x={358} y={178} fontSize={15} fill="#fff" textAnchor="middle" fontWeight={900}>✓</text>
            <text x={168} y={214} fontFamily={inter.fontFamily} fontSize={23} fill={G}>@marcusbuilds</text>
            <text x={640} y={196} fontFamily={inter.fontFamily} fontSize={30} fontWeight={800} fill={G}>· · ·</text>
            <rect x={786} y={162} width={140} height={46} rx={23} fill="#E7E9EA" />
            <text x={856} y={192} fontFamily={inter.fontFamily} fontSize={22} fontWeight={800} fill="#000" textAnchor="middle">Follow</text>
            {/* the post */}
            <text x={72} y={278} fontFamily={inter.fontFamily} fontSize={31} fontWeight={500} fill="#E7E9EA">50 Claude tips I use every single day.</text>
            <text x={72} y={320} fontFamily={inter.fontFamily} fontSize={31} fontWeight={500} fill="#E7E9EA">Nobody makes it past #6.</text>
            {/* the tips — real-sounding, CUT OFF mid-sentence */}
            <g transform="translate(72,362)">
              {XTIPS.map((tp, i) => (
                <g key={i} transform={`translate(0,${i * 40})`}>
                  <text x={0} y={22} fontFamily={mono} fontSize={22} fontWeight={700} fill={G}>{String(i + 1).padStart(2, "0")}</text>
                  <text x={44} y={22} fontFamily={inter.fontFamily} fontSize={25} fill="#D6D9DC">{tp}<tspan fill={G}>—</tspan></text>
                </g>))}
              <text x={0} y={430} fontFamily={inter.fontFamily} fontSize={25} fill={BLUE}>Show 40 more</text>
            </g>
            {/* timestamp + views */}
            <text x={72} y={848} fontFamily={inter.fontFamily} fontSize={22} fill={G}>11:42 PM · Jan 14 · </text>
            <text x={312} y={848} fontFamily={inter.fontFamily} fontSize={22} fontWeight={800} fill="#E7E9EA">{nfmt(views)}</text>
            <text x={392} y={848} fontFamily={inter.fontFamily} fontSize={22} fill={G}>Views</text>
            <line x1={72} y1={870} x2={940} y2={870} stroke={LINE} strokeWidth={2} />
            {/* engagement counts row */}
            <g transform="translate(72,908)" fontFamily={inter.fontFamily}>
              {[[replies, "Replies"], [reposts, "Reposts"], [likes, "Likes"], [9840, "Bookmarks"]].map(([v, lab]: any, i) => (
                <g key={i} transform={`translate(${i * 214},0)`}>
                  <text x={0} y={0} fontSize={26} fontWeight={800} fill="#E7E9EA" transform={`scale(${1 + (i === 2 ? likePop * 0.09 : 0)})`}>{nfmt(v)}</text>
                  <text x={0} y={30} fontSize={21} fill={G}>{lab}</text>
                </g>))}
            </g>
            <line x1={72} y1={946} x2={940} y2={946} stroke={LINE} strokeWidth={2} />
            {/* the action bar with real X glyphs */}
            <g transform="translate(96,988)">
              <Ico x={0} col={G} d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" />
              <Ico x={214} col="#00BA7C" d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
              <Ico x={428} col="#F91880" sc={1 + likePop * 0.25} d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z" />
              <Ico x={642} col={G} d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" />
              <Ico x={800} col={G} d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.29 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
            </g>
            <line x1={72} y1={1036} x2={940} y2={1036} stroke={LINE} strokeWidth={2} />
            {/* replies */}
            <g transform="translate(72,1072)">
              {[["Kayla R.", "@kaylabuilds", "bookmarking this immediately"], ["dev/null", "@devnullish", "#4 is the only one that matters"], ["Priya", "@priyacodes", "started at 1am. still on #9."]].map(([nm, hd, txt]: any, i) => (
                <g key={i} transform={`translate(0,${i * 92})`}>
                  <Pfp x={26} y={26} r={26} />
                  <text x={70} y={22} fontFamily={inter.fontFamily} fontSize={23} fontWeight={800} fill="#E7E9EA">{nm}</text>
                  <text x={70 + nm.length * 13} y={22} fontFamily={inter.fontFamily} fontSize={21} fill={G}>{hd}</text>
                  <text x={70} y={56} fontFamily={inter.fontFamily} fontSize={24} fill="#D6D9DC">{txt}</text>
                </g>))}
            </g>
          </g>
        </g>
        {/* a live "reposted" toast, so the feed feels alive */}
        {toast > 0 && (
          <g transform={`translate(506,${300 - toast * 12})`} opacity={toast}>
            <rect x={-190} y={-24} width={380} height={48} rx={24} fill="#1D9BF0" />
            <text x={0} y={9} fontFamily={inter.fontFamily} fontSize={23} fontWeight={700} fill="#fff" textAnchor="middle">1,204 people reposted this</text>
          </g>)}
        {/* the point of the insert: everybody saw it, nobody finished it */}
        {finChip > 0 && (
          <g transform={`translate(506,640) rotate(-7) scale(${0.7 + finChip * 0.3})`} opacity={finChip}>
            <rect x={-262} y={-44} width={524} height={88} rx={12} fill="#2A0E0B" stroke="#E5533D" strokeWidth={5} />
            <text x={0} y={14} fontFamily={mono} fontSize={40} fontWeight={700} fill="#FF7A66" textAnchor="middle" letterSpacing="1">0 FINISHED ALL 50</text>
          </g>)}
      </svg>
    </div>
  );
};

