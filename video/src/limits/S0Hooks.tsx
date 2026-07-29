import React from "react";
import { Actor, H, M, Room, Vignette, seed, mono, fraunces, GOLD, CLAY, RED, GREEN, AMBER } from "./chassis";

/* =============================================================================
   REEL 78 "LIMITS" · S0 — HOOK, THREE POP-CULTURE VARIANTS      window 0.00–4.36
   -----------------------------------------------------------------------------
   VO (locked): "If your Claude Code keeps hitting usage limits, here are three
   tricks to make it run way more efficiently."

   ⛔ Alex 2026-07-28: the literal garage/copy-room versions were rejected as
   boring. Every variant now sits inside a KNOCKOFF of a setpiece the viewer can
   name in half a second ([[reel-knockoff-references]]), with the joke carried by
   the branding, not by a caption:

     A  MISSION CTRL      Apollo-13-style power-down. "we're down to 12 amps"
                          → the room is badged MISSION CTRL (the Ctrl-key pun)
     B  THE WAR RIG       Fury-Road-style fuel panic, guzzoline → GUZZTOKEN
     C  1.21 GIGATOKENS   BTTF-style "not enough power", gigawatts → GIGATOKENS

   Shared floor, unchanged: real PLACE, frame 0 COMPLETE, camera LOCKED, props
   through M(), sprites only via <Actor> at 330px, and the HERO ARTIFACT (a dial
   buried in the red) native to each set so S5 can swing it back into the green.
   ⛔ Nothing load-bearing above panel-y 270 — the header card lives there.
   ============================================================================= */

const GY = 700;
const HERO = H;
const SHEET = M(0.30);

/* ========================================================== A — "MISSION CTRL"
   PLACE  a flight-control room, mid-crisis. FLOOR grey static-dissipative tile in
          a seam grid. BACK WALL a plot screen wall showing a free-return
          trajectory, flanked by the room badge. Two tiers of consoles step down
          toward camera, every one CRT-amber. A power-budget dial the size of a
          door is bolted to the right pier — the room is watching it, not the plot.
   LIGHT  ONE key: the plot wall itself, cold and frontal. Amber CRT spill is
          practical fill, never a second key. Red warning wash arrives at f10.
   DEPTH  0 cropped near console · 1 hero at his station · 2 second controller
          3 console tier + amp dial · 4 plot wall + badge · 5 dark ceiling truss
   ============================================================================= */
export const S0HookA: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <linearGradient id="aPlot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16323A" /><stop offset="1" stopColor="#0C1E24" /></linearGradient>
        <linearGradient id="aCrt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A2A12" /><stop offset="1" stopColor="#1C1409" /></linearGradient>
        <linearGradient id="aKey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FD8E8" stopOpacity=".20" /><stop offset="1" stopColor="#7FD8E8" stopOpacity="0" /></linearGradient>
        <linearGradient id="aDial" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4EFE3" /><stop offset="1" stopColor="#CCC4B1" /></linearGradient>
      </defs>

      <Room wall1="#1F2A30" wall2="#121A1F" floor1="#242C33" floor2="#121619" floorY={614} />

      {/* ---- plane 4: the plot wall + the room badge (the gag) ---- */}
      <g transform="translate(506,276)">
        <rect x={-410} y={-186} width={820} height={300} rx={8} fill="url(#aPlot)" stroke="#2E4A54" strokeWidth={5} />
        <g stroke="#2B4650" strokeWidth={2} opacity={0.85}>
          {[-140, -70, 0, 70].map((y) => <path key={y} d={`M-410 ${y}h820`} />)}
          {[-300, -180, -60, 60, 180, 300].map((x) => <path key={x} d={`M${x} -186v300`} />)}
        </g>
        {/* free-return trajectory */}
        <path d="M-352 76 C-190 -108 96 -142 218 -34 C286 26 250 84 176 90"
              fill="none" stroke="#7FD8E8" strokeWidth={5} strokeDasharray="16 10" opacity={0.9} />
        <circle cx={-352} cy={76} r={13} fill="#7FD8E8" />
        <circle cx={218} cy={-34} r={30} fill="none" stroke="#5EA9B8" strokeWidth={4} />
        <circle cx={218} cy={-34} r={9} fill="#5EA9B8" />
        <path d="M176 90 l-16 -12 l0 24 z" fill="#7FD8E8" />
        {/* the badge — MISSION CTRL, the Ctrl-key pun, styled as a keycap */}
        <g transform="translate(0,-232)">
          <rect x={-176} y={-34} width={352} height={62} rx={12} fill="#E8E3D6" />
          <rect x={-176} y={-34} width={352} height={62} rx={12} fill="none" stroke="#B9B2A1" strokeWidth={4} />
          <rect x={-176} y={16} width={352} height={12} rx={6} fill="#B9B2A1" />
          <text x={0} y={12} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700}
                letterSpacing={5} fill="#1A1813">MISSION CTRL</text>
        </g>
      </g>
      <polygon points="150,140 862,140 1092,792 -80,792" fill="url(#aKey)" />

      {/* ---- plane 3: the console tier ---- */}
      <g>
        <rect x={-20} y={470} width={1052} height={26} rx={6} fill="#39434B" />
        <rect x={-20} y={496} width={1052} height={128} fill="#2A323A" />
        <g stroke="#1D242A" strokeWidth={3} opacity={0.8}>
          {[130, 300, 470, 640, 810].map((x) => <path key={x} d={`M${x} 496v128`} />)}
        </g>
        {[42, 212, 382, 552, 722, 892].map((x, i) => (
          <g key={x} transform={`translate(${x},428)`}>
            <rect x={0} y={0} width={126} height={44} rx={5} fill="url(#aCrt)" stroke="#4A3A1C" strokeWidth={3} />
            <g stroke="#D89A34" strokeWidth={3} opacity={0.85}>
              <path d={`M10 ${12 + (i % 3) * 4}h${44 + (i % 2) * 22}`} />
              <path d={`M10 ${24 + (i % 2) * 4}h${72 - (i % 3) * 16}`} />
              <path d={`M10 34h${34 + (i % 3) * 20}`} />
            </g>
          </g>))}
      </g>

      {/* ---- ⛔ HERO ARTIFACT: the power-budget dial, right pier, door-height ---- */}
      <g transform="translate(838,436)">
        <rect x={-152} y={-176} width={304} height={352} rx={14} fill="#232B32" stroke="#3B454E" strokeWidth={5} />
        <circle cx={0} cy={-34} r={118} fill="#0E1114" />
        <circle cx={0} cy={-34} r={107} fill="url(#aDial)" />
        <path d="M-76 42 A107 107 0 0 1 -107 -34" fill="none" stroke={GREEN} strokeWidth={17} transform="translate(0,0)" />
        <path d="M-107 -34 A107 107 0 0 1 -33 -136" fill="none" stroke="#A9A995" strokeWidth={17} />
        <path d="M-33 -136 A107 107 0 0 1 39 -134" fill="none" stroke={AMBER} strokeWidth={17} />
        <path d="M39 -134 A107 107 0 0 1 107 -34" fill="none" stroke={RED} strokeWidth={17} />
        <path d="M107 -34 A107 107 0 0 1 76 42" fill="none" stroke="#8E2F22" strokeWidth={17} />
        <g transform="translate(0,-34) rotate(66)">
          <path d="M0 0 L-7 -11 L0 -96 L7 -11 Z" fill={RED} />
          <path d="M0 0 L0 28" stroke={RED} strokeWidth={9} strokeLinecap="round" /></g>
        <circle cx={0} cy={-34} r={15} fill="#2A2620" /><circle cx={0} cy={-34} r={6} fill={RED} />
        <text x={0} y={122} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700}
              letterSpacing={4} fill="#8E97A1">AMPS</text>
        <rect x={-96} y={140} width={192} height={22} rx={6} fill="#171B20" />
        <rect x={-96} y={140} width={168} height={22} rx={6} fill={RED} />
      </g>

      {/* ---- floor seams ---- */}
      <g stroke="#161B20" strokeWidth={3} opacity={0.6}>
        <path d="M0 682h1012M0 744h1012" /></g>

      <Vignette cx={0.46} cy={0.5} a={0.6} />
    </svg>

    {/* ---- sprites: flight director + one controller, both headset-on ---- */}
    <Actor lf={lf} x={330} groundY={GY} size={HERO} z={22} coat={1} gaze={5} nodAmp={1.5} nodSpeed={17} />
    <Actor lf={lf + 19} x={614} groundY={GY - 6} size={HERO * 0.84} z={18} coat={1} flip={1}
           gaze={-4} nodAmp={1.2} nodSpeed={21} />
    <svg viewBox="0 0 1012 792" width={1012} height={792}
         style={{ position: "absolute", left: 0, top: 0, zIndex: 26, pointerEvents: "none" }}>
      {/* headsets, drawn over the sprites so they read as mission control */}
      <g fill="#2B323B">
        <path d="M282 466 a48 34 0 0 1 96 0 v10 h-14 v-8 a34 24 0 0 0 -68 0 v8 h-14 z" />
        <rect x={272} y={474} width={20} height={30} rx={6} />
        <rect x={368} y={474} width={20} height={30} rx={6} />
        <path d="M292 500 q-22 20 -30 34" stroke="#2B323B" strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
      <g fill="#2B323B">
        <path d="M578 490 a40 28 0 0 1 80 0 v9 h-12 v-7 a28 20 0 0 0 -56 0 v7 h-12 z" />
        <rect x={570} y={497} width={17} height={25} rx={5} />
        <rect x={650} y={497} width={17} height={25} rx={5} />
      </g>
    </svg>
  </>
);

/* ============================================================= B — "THE WAR RIG"
   PLACE  a two-lane desert road at speed. FLOOR cracked blacktop with a centre
          line raking to the horizon. BACK WALL none — a dust horizon and a bank
          of rock. The RIG fills frame right: tanker body, exhaust stacks, chrome
          bull-bar, a fuel drum rack badged GUZZTOKEN. The gauge is dash-mounted
          on the near cab, needle on the peg.
   LIGHT  ONE key: low desert sun from camera-RIGHT, hard. Long shadows rake
          camera-left across the blacktop. Sky bleaches to white at the horizon.
   DEPTH  0 cropped blacktop + shadow · 1 hero on the road · 2 the rig + drums
          3 pursuit dust plume · 4 rock bank · 5 bleached sky
   ============================================================================= */
export const S0HookB: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E08A3C" /><stop offset=".55" stopColor="#EFC07A" /><stop offset="1" stopColor="#F6E0B8" /></linearGradient>
        <linearGradient id="bRoad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B4A50" /><stop offset="1" stopColor="#1A2226" /></linearGradient>
        <linearGradient id="bRig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6E5A3C" /><stop offset=".4" stopColor="#4A3B27" /><stop offset="1" stopColor="#2A2118" /></linearGradient>
        <linearGradient id="bDust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9B77A" stopOpacity=".7" /><stop offset="1" stopColor="#E9B77A" stopOpacity="0" /></linearGradient>
        <linearGradient id="bDial" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2ECDE" /><stop offset="1" stopColor="#C9C1AE" /></linearGradient>
      </defs>

      {/* sky + rock bank */}
      <rect width={1012} height={470} fill="url(#bSky)" />
      <path d="M0 400 L118 336 L214 384 L318 316 L430 372 L548 330 L660 380 L780 340 L900 386 L1012 348 L1012 470 L0 470 Z"
            fill="#8A5A38" opacity={0.85} />
      <path d="M0 432 L150 400 L300 428 L470 398 L640 430 L820 402 L1012 430 L1012 470 L0 470 Z" fill="#6B4229" />

      {/* blacktop */}
      <rect y={470} width={1012} height={322} fill="url(#bRoad)" />
      <path d="M0 470h1012v6H0z" fill="#5E7078" opacity={0.6} />
      <g fill="#E4D9B6" opacity={0.85}>
        <path d="M470 492h44v20h-44z" /><path d="M446 540h58v26h-58z" />
        <path d="M410 612h74v34h-74z" /><path d="M356 706h96v46h-96z" />
      </g>
      <g stroke="#121A1E" strokeWidth={3} opacity={0.5}>
        <path d="M0 556h1012M0 648h1012" /></g>

      {/* pursuit dust plume behind, camera-left */}
      <path d="M-40 470 C60 340 190 318 262 386 C310 432 300 470 300 470 Z" fill="url(#bDust)" />

      {/* ---- plane 2: THE RIG, frame right ---- */}
      <g transform="translate(742,300)">
        {/* tanker body */}
        <rect x={-160} y={40} width={412} height={190} rx={30} fill="url(#bRig)" />
        <rect x={-160} y={40} width={412} height={22} rx={11} fill="#8B7450" opacity={0.5} />
        <g stroke="#1E1810" strokeWidth={5} opacity={0.8}>
          <path d="M-52 40v190M60 40v190M172 40v190" /></g>
        {/* cab */}
        <path d="M-236 96 L-160 96 L-160 246 L-268 246 L-268 150 Z" fill="#4E4029" />
        <path d="M-232 112 L-166 112 L-166 168 L-252 168 Z" fill="#25313A" />
        <rect x={-284} y={210} width={40} height={40} rx={8} fill="#8B8168" />
        {/* exhaust stacks */}
        <rect x={-150} y={-58} width={22} height={104} rx={7} fill="#9A9078" />
        <rect x={-112} y={-40} width={22} height={86} rx={7} fill="#8A8069" />
        {/* wheels */}
        <circle cx={-206} cy={262} r={54} fill="#15191C" /><circle cx={-206} cy={262} r={22} fill="#4B545C" />
        <circle cx={-24} cy={262} r={54} fill="#15191C" /><circle cx={-24} cy={262} r={22} fill="#4B545C" />
        <circle cx={112} cy={262} r={54} fill="#15191C" /><circle cx={112} cy={262} r={22} fill="#4B545C" />
        <ellipse cx={-40} cy={322} rx={300} ry={22} fill="#000" opacity={0.42} />
        {/* fuel drum rack — the GUZZTOKEN gag */}
        <g transform="translate(58,-6)">
          {[0, 84, 168].map((dx, i) => (
            <g key={dx} transform={`translate(${dx},${i === 1 ? -6 : 0})`}>
              <rect x={0} y={0} width={68} height={54} rx={7} fill="#B8452F" />
              <rect x={0} y={12} width={68} height={7} fill="#E8DCC0" />
              <rect x={0} y={34} width={68} height={7} fill="#E8DCC0" />
              <text x={34} y={30} textAnchor="middle" fontFamily={mono} fontSize={11} fontWeight={700}
                    letterSpacing={1} fill="#3A1710">GUZZ</text>
            </g>))}
        </g>
      </g>

      {/* ---- ⛔ HERO ARTIFACT: the dash gauge, bolted to the near cab ---- */}
      <g transform="translate(268,452)">
        <rect x={-146} y={-146} width={292} height={292} rx={20} fill="#2A2118" stroke="#6E5A3C" strokeWidth={6} />
        <circle cx={0} cy={-16} r={112} fill="#100D09" />
        <circle cx={0} cy={-16} r={101} fill="url(#bDial)" />
        <path d="M-71 55 A101 101 0 0 1 -101 -16" fill="none" stroke={GREEN} strokeWidth={17} />
        <path d="M-101 -16 A101 101 0 0 1 -31 -112" fill="none" stroke="#A9A995" strokeWidth={17} />
        <path d="M-31 -112 A101 101 0 0 1 37 -110" fill="none" stroke={AMBER} strokeWidth={17} />
        <path d="M37 -110 A101 101 0 0 1 101 -16" fill="none" stroke={RED} strokeWidth={17} />
        <path d="M101 -16 A101 101 0 0 1 71 55" fill="none" stroke="#8E2F22" strokeWidth={17} />
        <text x={-80} y={-2} fontFamily={mono} fontSize={22} fontWeight={700} fill="#2A2620">F</text>
        <text x={62} y={-2} fontFamily={mono} fontSize={22} fontWeight={700} fill="#8E2F22">E</text>
        <g transform="translate(0,-16) rotate(68)">
          <path d="M0 0 L-7 -10 L0 -90 L7 -10 Z" fill={RED} />
          <path d="M0 0 L0 26" stroke={RED} strokeWidth={9} strokeLinecap="round" /></g>
        <circle cx={0} cy={-16} r={14} fill="#2A2620" /><circle cx={0} cy={-16} r={6} fill={RED} />
        <text x={0} y={122} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700}
              letterSpacing={3} fill="#C7B48C">GUZZTOKEN</text>
      </g>

      <Vignette cx={0.5} cy={0.52} a={0.58} />
    </svg>

    {/* ---- sprite: hero on the blacktop, dwarfed by the rig ---- */}
    <Actor lf={lf} x={508} groundY={GY + 42} size={HERO} z={22} coat={1} gaze={6} nodAmp={1.7} nodSpeed={15} />
  </>
);

/* ========================================================= C — "1.21 GIGATOKENS"
   PLACE  a town square at night, mid-experiment. FLOOR wet cobble throwing the
          lamp back. BACK WALL a clock-tower face over a shopfront terrace. A
          knockoff wedge-shaped TIME CAR sits centre-right, gullwing up, cabled to
          a rod on the tower. The power dial on its open panel is the artifact.
   LIGHT  ONE key: the sodium street lamp, high camera-LEFT, warm. The car's vents
          are practical fill (cold blue) and never a second key.
   DEPTH  0 cropped cobble + cable · 1 hero at the panel · 2 the time car
          3 cable run + lamp · 4 terrace + clock tower · 5 night sky
   ============================================================================= */
export const S0HookC: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101B2E" /><stop offset="1" stopColor="#1D2C42" /></linearGradient>
        <linearGradient id="cCob" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A2F3A" /><stop offset="1" stopColor="#14171E" /></linearGradient>
        <linearGradient id="cCar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C6CBD2" /><stop offset=".5" stopColor="#8E959E" /><stop offset="1" stopColor="#5A616A" /></linearGradient>
        <linearGradient id="cLamp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD79A" stopOpacity=".30" /><stop offset="1" stopColor="#FFD79A" stopOpacity="0" /></linearGradient>
        <linearGradient id="cDial" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2ECDE" /><stop offset="1" stopColor="#C9C1AE" /></linearGradient>
      </defs>

      <rect width={1012} height={614} fill="url(#cSky)" />
      <rect y={614} width={1012} height={178} fill="url(#cCob)" />
      <g stroke="#0E1116" strokeWidth={3} opacity={0.55}>
        <path d="M0 660h1012M0 714h1012M0 766h1012" />
        <path d="M120 614v178M340 614v178M600 614v178M840 614v178" /></g>

      {/* ---- plane 4: terrace + clock tower ---- */}
      <g>
        <rect x={0} y={286} width={1012} height={330} fill="#1B2434" />
        {[0, 158, 316, 700, 858].map((x) => (
          <g key={x}>
            <rect x={x + 10} y={310} width={128} height={306} fill="#232E41" />
            <rect x={x + 30} y={344} width={40} height={54} rx={4} fill="#3B4B66" />
            <rect x={x + 82} y={344} width={40} height={54} rx={4} fill="#2E3C53" />
            <rect x={x + 30} y={430} width={40} height={54} rx={4} fill="#2E3C53" />
            <rect x={x + 82} y={430} width={40} height={54} rx={4} fill="#3B4B66" />
          </g>))}
        {/* the tower */}
        <g transform="translate(506,0)">
          <rect x={-92} y={206} width={184} height={410} fill="#2B384F" />
          <rect x={-104} y={190} width={208} height={26} rx={5} fill="#354561" />
          <path d="M-104 190 L0 116 L104 190 Z" fill="#354561" />
          <circle cx={0} cy={300} r={70} fill="#E9E2CE" />
          <circle cx={0} cy={300} r={62} fill="none" stroke="#B7AF98" strokeWidth={4} />
          <g stroke="#2A2620" strokeWidth={6} strokeLinecap="round">
            <path d="M0 300 L0 256" /><path d="M0 300 L36 318" /></g>
          <circle cx={0} cy={300} r={8} fill="#2A2620" />
          {/* the lightning rod + cable anchor */}
          <rect x={-5} y={54} width={10} height={64} fill="#8E959E" />
          <circle cx={0} cy={50} r={11} fill="#C6CBD2" />
        </g>
      </g>

      {/* the cable, tower rod down to the car */}
      <path d="M506 60 C560 190 640 300 706 402" stroke="#12161C" strokeWidth={11} fill="none" strokeLinecap="round" />
      <path d="M506 60 C560 190 640 300 706 402" stroke="#39424E" strokeWidth={5} fill="none" strokeLinecap="round" />

      {/* street lamp — the ONE key */}
      <g transform="translate(112,214)">
        <rect x={-7} y={0} width={14} height={400} fill="#2B323B" />
        <path d="M0 0 C0 -46 46 -58 78 -58" stroke="#2B323B" strokeWidth={12} fill="none" />
        <path d="M60 -58 h44 l-10 40 h-24 z" fill="#3A414B" />
        <circle cx={82} cy={-24} r={15} fill="#FFE7B4" />
        <ellipse cx={0} cy={404} rx={40} ry={10} fill="#000" opacity={0.4} />
      </g>
      <polygon points="46,168 130,168 500,792 -240,792" fill="url(#cLamp)" />

      {/* ---- plane 2: the wedge TIME CAR, gullwing up ---- */}
      <g transform="translate(700,470)">
        <ellipse cx={0} cy={172} rx={272} ry={26} fill="#000" opacity={0.5} />
        {/* gullwing door, up */}
        <path d="M-52 -46 L96 -128 L128 -74 L-30 -6 Z" fill="#A9B0B8" />
        <path d="M-52 -46 L96 -128 L128 -74 L-30 -6 Z" fill="none" stroke="#6E757E" strokeWidth={4} />
        {/* body wedge */}
        <path d="M-244 96 L-206 26 L-64 -12 L112 -8 L236 44 L246 96 Z" fill="url(#cCar)" />
        <path d="M-206 26 L-64 -12 L96 -10 L150 26 Z" fill="#2C3644" />
        <path d="M-244 96 L246 96 L240 132 L-238 132 Z" fill="#4E555E" />
        {/* vents, cold practical fill */}
        <g fill="#7FD8E8" opacity={0.9}>
          <rect x={168} y={56} width={62} height={9} rx={4} />
          <rect x={168} y={72} width={62} height={9} rx={4} />
          <rect x={168} y={88} width={62} height={9} rx={4} /></g>
        <circle cx={-232} cy={132} r={44} fill="#14181D" /><circle cx={-232} cy={132} r={18} fill="#5A616A" />
        <circle cx={186} cy={132} r={44} fill="#14181D" /><circle cx={186} cy={132} r={18} fill="#5A616A" />
        {/* rear plate — the gag */}
        <g transform="translate(-176,74)">
          <rect x={-52} y={-16} width={104} height={32} rx={5} fill="#E8E3D6" />
          <text x={0} y={8} textAnchor="middle" fontFamily={mono} fontSize={17} fontWeight={700}
                letterSpacing={1} fill="#1A1813">OUTATIME</text>
        </g>
      </g>

      {/* ---- ⛔ HERO ARTIFACT: the power dial on the open panel ---- */}
      <g transform="translate(300,452)">
        <rect x={-140} y={-142} width={280} height={284} rx={16} fill="#232B32" stroke="#3B454E" strokeWidth={5} />
        <circle cx={0} cy={-20} r={106} fill="#0E1114" />
        <circle cx={0} cy={-20} r={96} fill="url(#cDial)" />
        <path d="M-68 48 A96 96 0 0 1 -96 -20" fill="none" stroke={GREEN} strokeWidth={16} />
        <path d="M-96 -20 A96 96 0 0 1 -29 -107" fill="none" stroke="#A9A995" strokeWidth={16} />
        <path d="M-29 -107 A96 96 0 0 1 35 -105" fill="none" stroke={AMBER} strokeWidth={16} />
        <path d="M35 -105 A96 96 0 0 1 96 -20" fill="none" stroke={RED} strokeWidth={16} />
        <path d="M96 -20 A96 96 0 0 1 68 48" fill="none" stroke="#8E2F22" strokeWidth={16} />
        <g transform="translate(0,-20) rotate(67)">
          <path d="M0 0 L-6 -10 L0 -86 L6 -10 Z" fill={RED} />
          <path d="M0 0 L0 25" stroke={RED} strokeWidth={9} strokeLinecap="round" /></g>
        <circle cx={0} cy={-20} r={13} fill="#2A2620" /><circle cx={0} cy={-20} r={6} fill={RED} />
        <text x={0} y={112} textAnchor="middle" fontFamily={mono} fontSize={21} fontWeight={700}
              letterSpacing={2} fill="#8E97A1">1.21 GIGATOKENS</text>
      </g>

      <Vignette cx={0.4} cy={0.5} a={0.6} />
    </svg>

    {/* ---- sprite: hero at the panel, cable in hand ---- */}
    <Actor lf={lf} x={506} groundY={GY + 46} size={HERO} z={22} coat={1} glasses={1}
           gaze={-5} nodAmp={1.6} nodSpeed={16} />
  </>
);
