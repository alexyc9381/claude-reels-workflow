import React from "react";
import { Actor, H, Vignette, seed, mono, fraunces, over, ramp, RED, GREEN, AMBER } from "./chassis";
import { W, WorldDefs, Wasteland, CentreLine, DustWall, Rig } from "./world";
import { Buzzards, RouteShield, Poles } from "./props";

/* =============================================================================
   REEL 78 "LIMITS" · S5 — THE NEEDLE COMES BACK  window 33.77–36.41s · 79f @ 30fps
   -----------------------------------------------------------------------------
   VO: "So you stop burning 10 more messages fixing what it got wrong."

   ⭐ THE PEAK. It must out-punch the hook, and it does it with ONE move and
   stillness — not with more stuff (⛔ reel-declutter-single-hero).

   The GUZZTOKEN gauge from frame 0 is back, now filling the frame, and the
   needle sweeps from E all the way around into the GREEN — the exact inverse of
   the hook's slam. Behind it, on the shoulder, sit TEN wrecks: the ten messages
   that would have been spent fixing things. They never move. That is the whole
   scene.

   PLACE   a rise on the same highway at golden hour. Warmest light in the reel.
   LIGHT   full low sun straight down the road, frontal — the only scene where
           the hero is lit face-on rather than rimmed. Deliberate: this is relief.
   CAMERA  ⛔ LOCKED, absolutely still. Its power is the stillness.
   ⛔ NO fabricated numbers on screen. The ten wrecks are countable; nothing is
      labelled with a percentage the VO never claimed.
   ============================================================================= */

const HZ = 402;

export const S5Payoff: React.FC<{ lf: number }> = ({ lf }) => {
  const sweep = over(lf, 10, 44);                 // E -> F, the one mover
  /* it arrives and settles — a damped wobble, so the peak is never a frozen frame */
  const needle = 62 - sweep * 96 + Math.max(0, 1 - Math.abs(lf - 56) / 22) * Math.sin((lf - 54) / 2.4) * 5;
  const glow = ramp(lf, 42, 58);
  const settle = Math.max(0, 1 - Math.abs(lf - 56) / 10);

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <WorldDefs p="s5" />
          <linearGradient id="s5gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFB03A" /><stop offset=".55" stopColor="#FFD27A" />
            <stop offset="1" stopColor="#FFEFC6" /></linearGradient>
          <linearGradient id="s5dial" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF9EC" /><stop offset="1" stopColor="#DCD2B8" /></linearGradient>
        </defs>

        <rect width={1012} height={HZ} fill="url(#s5gold)" />
        <circle cx={506} cy={352} r={168} fill="#FFF6D2" opacity={0.55} />
        <circle cx={506} cy={352} r={96} fill="#FFFDF2" />
        <path d="M0 330 L150 296 L318 322 L470 288 L640 320 L820 292 L1012 322 L1012 402 L0 402 Z"
              fill="#C4551F" opacity={0.75} />
        <rect y={HZ} width={1012} height={390} fill="url(#s5road)" />
        <rect y={HZ} width={1012} height={6} fill="#1E6C7A" opacity={0.6} />
        <Buzzards lf={lf} x={800} y={190} s={1.05} n={3} />
        <Poles k={lf / 44} horizon={HZ} n={5} op={0.32} />
        <g opacity={0.75}><RouteShield x={72} y={HZ - 16} s={0.44} n="78" /></g>
        <CentreLine roll={lf * 22} horizon={HZ} vx={506} op={0.45} />

        {/* the ten wrecks on the shoulder — countable, and completely still */}
        <g opacity={0.5}>
          {Array.from({ length: 10 }, (_, i) => {
            const t = i / 9, x = ((44 + t * 924 - lf * 5.4) % 1120 + 1120) % 1120 - 54, s = 0.20 + (1 - Math.abs(t - 0.5) * 2) * 0.05;
            return (
              <g key={i} transform={`translate(${x},${HZ + 44}) scale(${s})`}>
                <path d="M-88 26 L-70 -18 L4 -32 L74 -22 L96 12 L96 30 Z" fill="#5C2410" />
                <circle cx={-52} cy={32} r={26} fill="#3A1710" />
                <circle cx={56} cy={32} r={26} fill="#3A1710" />
              </g>); })}
        </g>

        {/* ⛔ HERO ARTIFACT, full size: the gauge from frame 0 */}
        <g transform="translate(506,486)">
          <rect x={-232} y={-232} width={464} height={464} rx={30} fill="#07242D"
                stroke={W.rust} strokeWidth={9} />
          <rect x={-232} y={-232} width={464} height={464} rx={30} fill={`url(#s5rim)`} opacity={0.22} />
          <circle cx={0} cy={-24} r={188} fill="#03151B" />
          <circle cx={0} cy={-24} r={172} fill="url(#s5dial)" />
          <path d="M-122 98 A172 172 0 0 1 -172 -24" fill="none" stroke={GREEN} strokeWidth={28} />
          <path d="M-172 -24 A172 172 0 0 1 -52 -190" fill="none" stroke="#B6AE96" strokeWidth={28} />
          <path d="M-52 -190 A172 172 0 0 1 62 -186" fill="none" stroke={AMBER} strokeWidth={28} />
          <path d="M62 -186 A172 172 0 0 1 172 -24" fill="none" stroke={RED} strokeWidth={28} />
          <path d="M172 -24 A172 172 0 0 1 122 98" fill="none" stroke="#8E2F22" strokeWidth={28} />
          {/* the green arc lights as the needle arrives */}
          <path d="M-122 98 A172 172 0 0 1 -172 -24" fill="none" stroke="#7BE0AE" strokeWidth={28}
                opacity={glow * 0.85} />
          <g stroke="#2A2620" strokeWidth={7}>
            <path d="M-122 98L-104 80M-172 -24h28M-52 -190l10 27M62 -186l-10 27M172 -24h-28M122 98l-18-18" /></g>
          <text x={-140} y={-6} fontFamily={mono} fontSize={38} fontWeight={700} fill="#2A6E4E">F</text>
          <text x={106} y={-6} fontFamily={mono} fontSize={38} fontWeight={700} fill="#8E2F22">E</text>
          <g transform={`translate(0,-24) rotate(${needle})`}>
            <path d="M0 0 L-11 -17 L0 -154 L11 -17 Z" fill={sweep > 0.9 ? GREEN : RED} />
            <path d="M0 0 L0 44" stroke={sweep > 0.9 ? GREEN : RED} strokeWidth={14} strokeLinecap="round" /></g>
          <circle cx={0} cy={-24} r={24} fill="#2A2620" />
          <circle cx={0} cy={-24} r={10} fill={sweep > 0.9 ? GREEN : RED} />
          <text x={0} y={196} textAnchor="middle" fontFamily={mono} fontSize={36} fontWeight={700}
                letterSpacing={5} fill="#FFC069">GUZZTOKEN</text>
          {/* the arrival: one clean ring, no confetti */}
          {settle > 0.02 && (
            <circle cx={0} cy={-24} r={190 + (1 - settle) * 90} fill="none" stroke="#7BE0AE"
                    strokeWidth={6} opacity={settle * 0.7} />)}
        </g>

        <Vignette cx={0.5} cy={0.5} a={0.5} />
      </svg>

      {/* the hero, small, at frame edge. He does nothing — he is just watching. */}
      <Actor lf={lf} x={880} groundY={766} size={H * 0.66} z={22} coat={1}
             gaze={-7} cheer={glow * 0.4} nodAmp={2.0} nodSpeed={12} />
    </>
  );
};
