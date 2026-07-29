import React from "react";
import { Actor, H, Vignette, seed, mono, fraunces, over, ramp } from "./chassis";
import { O, OfficeDefs, Ceiling, Carpet, DeptPlate, PaperFall, TubeRun, WallClock, FloorMark } from "./office";

/* =============================================================================
   REEL 78 "LIMITS" · S5 — THE BOARD DROPS      window 28.46–31.10s · 79f @ 30fps
   -----------------------------------------------------------------------------
   VO: "So you stop burning 10 more messages fixing what it got wrong."

   ⭐ THE PEAK. One move and stillness — never more stuff
   (⛔ reel-declutter-single-hero).

   The USAGE board from frame 0 is back, now filling the frame, and it FLIPS DOWN
   out of the red — the exact inverse of the hook, where it climbed into it.
   Behind it: TEN empty chairs at ten empty stations, lights off. Those are the
   ten messages that never had to happen. They never move.

   PLACE   the floor after hours. Same room, most of it dark.
   LIGHT   ⛔ one overhead source, now only over the board. The rest of the floor
           sits unlit — the only scene in the reel with darkness in it, which is
           what makes it land as relief rather than as more work.
   CAMERA  ⛔ LOCKED. Absolutely still.
   ⛔ No fabricated numbers beyond the board's own percentage, which the VO's
      claim ("stop burning 10 more messages") is matched to by the TEN chairs.
   ============================================================================= */

const HZ = 470;

export const S5Board: React.FC<{ lf: number }> = ({ lf }) => {
  const drop = over(lf, 8, 40);
  /* ⛔ a "large mover" means large IN PIXELS. The staged station wave measured
     4px of travel on a 29px sprite and did nothing; this bar is 640px wide and
     crosses a third of the frame. */
  const wipe = over(lf, 40, 36, (t) => t);
  const v = 0.94 - drop * 0.72;
  const hot = v > 0.75;
  const settle = Math.max(0, 1 - Math.abs(lf - 52) / 12);
  const pct = Math.round(v * 100);
  const digits = String(pct).padStart(2, " ").split("");

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs><OfficeDefs p="s5" /></defs>
        <Ceiling p="s5" lit={0.34} />
        <g opacity={0.6}><TubeRun t={lf} y={168} n={2} speed={11} /></g>
        <rect y={196} width={1012} height={124} fill="url(#s5wall)" opacity={0.55} />
        <g opacity={0.5}><DeptPlate x={506} y={248} dept="MACROCONTEXT REFINEMENT" /></g>

        {/* TEN empty stations, unlit — the ten messages that never happened */}
        {/* ⛔ the late beat: the ten stations do not just SIT dark — they go
            out one at a time in a wave, which is the line ("ten fewer
            messages") happening rather than being illustrated. */}
        <g opacity={0.34}>
          {Array.from({ length: 10 }, (_, i) => {
            const t = i / 9, x = 62 + t * 888, s = 0.26 + (1 - Math.abs(t - 0.5) * 2) * 0.05;
            const off = Math.max(0, Math.min(1, (lf - 40) / 3 - i * 1.5));
            return (
              <g key={i}
                 transform={`translate(${x},${HZ - 12 + off * 16}) scale(${s * (1 - off * 0.16)})`}
                 opacity={1 - off * 0.55}>
                <rect x={-56} y={-98} width={112} height={98} rx={10} fill={O.plasticSh} />
                <rect x={-44} y={-86} width={88} height={68} rx={7} fill="#0E1F1B" />
                <rect x={-64} y={26} width={128} height={16} rx={6} fill="#3F5A52" />
              </g>); })}
        </g>

        {wipe > 0.01 && (
          <g transform={`translate(${-360 + wipe * 866},${HZ - 96})`} opacity={Math.min(1, wipe * 3)}>
            <rect x={-320} y={-46} width={640} height={92} rx={14} fill="#1F2A24" opacity={0.4} />
            <rect x={-326} y={-52} width={640} height={92} rx={14} fill="#E4574A" />
            <text x={-6} y={-8} textAnchor="middle" fontFamily={mono} fontSize={34}
                  fontWeight={700} fill="#FFF3F1">10 FEWER MESSAGES</text>
            <text x={-6} y={20} textAnchor="middle" fontFamily={mono} fontSize={17}
                  fontWeight={700} letterSpacing={3} fill="#FBD8D3">EVERY SINGLE TASK</text>
          </g>)}
        <Carpet p="s5" y={HZ} />
        <FloorMark y={HZ} />
        <g opacity={0.5}><PaperFall t={lf} n={6} top={320} bottom={HZ + 80} /></g>
        <g opacity={0.55}><WallClock x={940} y={300} s={0.86} t={lf} /></g>

        {/* ⛔ HERO ARTIFACT, full size: the board from frame 0, flipping DOWN */}
        <g transform="translate(506,516)">
          <rect x={-330} y={-130} width={660} height={260} rx={18} fill={O.steel} />
          <rect x={-330} y={-130} width={660} height={260} rx={18} fill="none" stroke="#22261F" strokeWidth={7} />
          <text x={-296} y={-84} fontFamily={mono} fontSize={26} fontWeight={700}
                letterSpacing={7} fill="#9AA095">USAGE</text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${-176 + i * 132},22)`}>
              <rect x={-58} y={-62} width={116} height={124} rx={9} fill="#151813" />
              <rect x={-58} y={-2} width={116} height={4} fill={O.steel} />
              <text x={0} y={28} textAnchor="middle" fontFamily={mono} fontSize={78} fontWeight={700}
                    fill={hot ? O.red : "#8FE3B4"}>{i < 2 ? (digits[i] || "").trim() : "%"}</text>
            </g>))}
          <circle cx={276} cy={-86} r={17} fill={hot ? O.red : "#4E6B62"} />
          {settle > 0.02 && (
            <rect x={-340} y={-140} width={680} height={280} rx={20} fill="none"
                  stroke="#8FE3B4" strokeWidth={6} opacity={settle * 0.7}
                  transform={`scale(${1 + (1 - settle) * 0.06})`} />)}
        </g>

        <Vignette cx={0.5} cy={0.52} a={0.6} />
      </svg>

      {/* one refiner at the frame edge. He does nothing — he is just watching. */}
      <Actor lf={lf} x={906} groundY={772} size={H * 0.5} z={22} coat={1}
             gaze={-6} cheer={drop * 0.45} nodAmp={1.9} nodSpeed={13} />
    </>
  );
};
