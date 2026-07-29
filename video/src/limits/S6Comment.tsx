import React from "react";
import { Actor, H, Vignette, mono, fraunces, over, CLAY, GOLD } from "./chassis";
import { O, OfficeDefs, Ceiling, Carpet, DeptPlate, TubeRun, PaperFall } from "./office";

/* =============================================================================
   REEL 78 "LIMITS" · S6 — COMMENT CLAUDE       window 31.10–32.40s · 39f @ 30fps
   -----------------------------------------------------------------------------
   VO: "For the full list, comment CLAUDE."

   ⛔ The instruction IS the frame (Alex: the CTA graphic must be unmistakable):
     · the word COMMENT stated plainly, not implied
     · an arrow pointing straight at the field
     · a real comment field with the keyword typed oversized in clay
     · a send affordance that lights the moment the word completes
   The ranked list sits behind as a soft strip — it is the reward, not the ask.
   ============================================================================= */

const KEY = "CLAUDE";

export const S6Comment: React.FC<{ lf: number }> = ({ lf }) => {
  const typed = Math.min(KEY.length, Math.floor(over(lf, 2, 17) * KEY.length + 0.001));
  const done = typed >= KEY.length;
  const land = over(lf, 18, 8);
  const beat = Math.sin(lf / 3.4) * 0.5 + 0.5;
  const arrow = 1 - Math.abs(Math.sin(lf / 5.2)) * 0.5;

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <OfficeDefs p="s6" />
          <filter id="s6soft"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>
        <Ceiling p="s6" lit={0.8} />
        <rect y={196} width={1012} height={124} fill="url(#s6wall)" />
        <DeptPlate x={506} y={248} dept="MACROCONTEXT REFINEMENT" />
        <rect y={320} width={1012} height={150} fill="url(#s6wall)" />
        <TubeRun t={lf} y={196} n={3} speed={20} />
        <PaperFall t={lf} n={8} top={330} bottom={640} />
        <Carpet p="s6" y={470} />

        {/* THE REWARD, demoted: the ranked list pinned to the wall, soft */}
        <g opacity={0.5}>
          {Array.from({ length: 4 }, (_, i) => (
            <g key={i} transform={`translate(506,${348 + i * 34})`}>
              <text x={-322} y={7} fontFamily={mono} fontSize={22} fontWeight={700}
                    fill={O.dim}>{String(i + 1).padStart(2, "0")}</text>
              <g filter="url(#s6soft)">
                <rect x={-272} y={-9} width={286 - i * 18} height={17} rx={8}
                      fill={O.cabLo} opacity={0.6} /></g>
            </g>))}
        </g>

        {/* ===== THE INSTRUCTION ===== */}
        <text x={506} y={556} textAnchor="middle" fontFamily={fraunces.fontFamily}
              fontWeight={900} fontSize={54} letterSpacing="-0.01em" fill={O.ink}>COMMENT</text>
        <g transform={`translate(506,${588 + arrow * 7})`} opacity={0.95}>
          <path d="M0 0 L0 22" stroke={CLAY} strokeWidth={9} strokeLinecap="round" />
          <path d="M-17 16 L0 36 L17 16 Z" fill={CLAY} />
        </g>

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
          <g opacity={done ? 0.95 : 0.3} transform={`translate(300,0) scale(${done ? 1 + beat * 0.06 : 1})`}>
            <circle cx={0} cy={0} r={34} fill={done ? CLAY : "#C9C2B4"} />
            <path d="M-13 -11 L15 0 L-13 11 L-9 0 Z" fill="#FCFAF5" />
          </g>
        </g>

        <Vignette cx={0.5} cy={0.52} a={0.44} />
      </svg>

      <Actor lf={lf} x={128} groundY={782} size={H * 0.52} z={22} coat={1}
             cheer={0.55} gaze={7} nodAmp={2.8} nodSpeed={8} />
    </>
  );
};
