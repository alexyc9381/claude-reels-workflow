import React from "react";
import { Actor, H, Vignette, mono, fraunces, over, ramp, CLAY, INK, GOLD } from "./chassis";
import { W, WorldDefs } from "./world";
import { ChromeSkull, HandPrints } from "./props";

/* =============================================================================
   REEL 78 "LIMITS" · S6 — COMMENT CLAUDE        window 36.41–37.71s · 39f @ 30fps
   -----------------------------------------------------------------------------
   VO: "For the full list, comment CLAUDE."

   ⛔ REV 2 (Alex: "the CTA graphic needs to be clearer that they need to comment
      the keyword"). v1 buried the ask — a small pill on a tailgate, competing
      with a list for attention. The instruction is now the ENTIRE frame:

        · a real comment field, shaped like the one they are about to tap
        · the keyword typed into it, oversized, in clay
        · the word COMMENT stated above it in plain language, not implied
        · an arrow pointing straight at the field, so there is no ambiguity
        · the ranked list demoted to a soft strip behind — it is the reward,
          not the instruction

   ⛔ Ranks sharp / lines blurred: show the list is long and ranked, trade the
      contents for the comment ([[gate-the-how-in-scripts]]).
   ⛔ No fabricated count — the VO says "the full list", never a number.
   ============================================================================= */

const KEY = "CLAUDE";

export const S6Cta: React.FC<{ lf: number }> = ({ lf }) => {
  const typed = Math.min(KEY.length, Math.floor(over(lf, 2, 17) * KEY.length + 0.001));
  const done = typed >= KEY.length;
  const land = over(lf, 20, 8);                 // the field settles
  const beat = Math.sin(lf / 3.4) * 0.5 + 0.5;  // never a frozen last frame
  const arrow = 1 - Math.abs(Math.sin(lf / 5.2)) * 0.5;

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <WorldDefs p="s6" />
          <linearGradient id="s6gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFB03A" /><stop offset="1" stopColor="#E08A3C" /></linearGradient>
          <linearGradient id="s6plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3E4C52" /><stop offset="1" stopColor="#1E2C33" /></linearGradient>
          <filter id="s6soft"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>

        {/* the wasteland, thrown soft — scenery now, nothing more */}
        <g filter="url(#s6soft)">
          <rect width={1012} height={300} fill="url(#s6gold)" />
          <path d="M0 274 L170 236 L360 266 L560 232 L760 266 L1012 238 L1012 300 L0 300 Z" fill="#A8461A" />
          <rect y={300} width={1012} height={492} fill="#123842" />
        </g>
        <g>
          <path d="M56 300 L956 300 L1012 792 L0 792 Z" fill="url(#s6plate)" />
          <path d="M56 300 L956 300 L960 318 L52 318 Z" fill="#5E6E76" />
        </g>
        <g opacity={0.4}><HandPrints x={84} y={352} s={0.54} n={3} /></g>
        <g opacity={0.55}><ChromeSkull x={928} y={362} s={0.6} /></g>

        {/* THE REWARD, demoted: the ranked list as a soft strip behind */}
        <g opacity={0.5}>
          {Array.from({ length: 4 }, (_, i) => (
            <g key={i} transform={`translate(506,${360 + i * 40})`}>
              <text x={-322} y={8} fontFamily={mono} fontSize={24} fontWeight={700}
                    fill="#FFD79A" opacity={0.75}>{String(i + 1).padStart(2, "0")}</text>
              <g filter="url(#s6soft)">
                <rect x={-272} y={-10} width={286 - i * 18} height={19} rx={10}
                      fill="#DCE6EA" opacity={0.5} /></g>
            </g>))}
        </g>

        {/* ===== THE INSTRUCTION — the whole point of the frame ===== */}
        <text x={506} y={556} textAnchor="middle" fontFamily={fraunces.fontFamily}
              fontWeight={900} fontSize={54} letterSpacing="-0.01em" fill="#FFE9A8">
          COMMENT
        </text>

        {/* the arrow, pointing straight at the field */}
        <g transform={`translate(506,${588 + arrow * 7})`} opacity={0.9}>
          <path d="M0 0 L0 22" stroke={GOLD} strokeWidth={9} strokeLinecap="round" />
          <path d="M-17 16 L0 36 L17 16 Z" fill={GOLD} />
        </g>

        {/* the comment field — shaped like the one they are about to tap */}
        <g transform={`translate(506,${684 - beat * 4}) scale(${0.94 + land * 0.06})`}>
          <rect x={-372} y={-52} width={744} height={104} rx={52} fill="#FCFAF5" />
          <rect x={-372} y={-52} width={744} height={104} rx={52} fill="none"
                stroke={CLAY} strokeWidth={7} />
          <circle cx={-312} cy={0} r={30} fill={CLAY} opacity={0.22} />
          <circle cx={-312} cy={-7} r={11} fill={CLAY} opacity={0.55} />
          <path d="M-330 14 q18 -16 36 0 q-18 10 -36 0" fill={CLAY} opacity={0.55} />
          <text x={-262} y={20} fontFamily={fraunces.fontFamily} fontSize={62} fontWeight={900}
                fill={CLAY} letterSpacing={3}>{KEY.slice(0, typed)}</text>
          {!done && lf % 12 < 7 && (
            <rect x={-258 + typed * 41} y={-26} width={7} height={48} fill={CLAY} />)}
          {/* send affordance, lights when the word is complete */}
          <g opacity={done ? 0.95 : 0.3} transform={`translate(300,0) scale(${done ? 1 + beat * 0.06 : 1})`}>
            <circle cx={0} cy={0} r={34} fill={done ? CLAY : "#C9C2B4"} />
            <path d="M-13 -11 L15 0 L-13 11 L-9 0 Z" fill="#FCFAF5" />
          </g>
        </g>

        <Vignette cx={0.5} cy={0.52} a={0.46} />
      </svg>

      <Actor lf={lf} x={128} groundY={782} size={H * 0.58} z={22} coat={1}
             cheer={0.55} gaze={7} nodAmp={2.8} nodSpeed={8} />
    </>
  );
};
