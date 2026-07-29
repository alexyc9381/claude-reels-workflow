import React from "react";
import { Actor, H, Vignette, seed, mono, over, ramp, RED, GREEN, AMBER } from "./chassis";
import { DoofRig, ChromeSkull, HandPrints, Buzzards, RouteShield, Wreck } from "./props";

/* =============================================================================
   REEL 78 "LIMITS" · S0 — THE WAR RIG            window 0.00–4.36s · 131f @ 30fps
   -----------------------------------------------------------------------------
   FURY-ROAD knockoff. Theme locked 2026-07-28.

   ⛔ REV 2 (Alex: "needs pattern interrupt · way more interesting · not
      hierarchical · header makes no sense and is way too big"). What changed:

   1. PATTERN INTERRUPT AT FRAME 0. v1 opened on a calm static frame and the
      first event was a needle at f8 — nothing there to stop a scroll. The reel
      now opens ON the peak: both exhaust stacks are already erupting a full
      fireball at f0, at maximum, and it DECAYS. Frame 0 is still complete
      (nothing animates in from empty) — it is simply complete at its loudest.
   2. HIERARCHY ENFORCED. v1 ran road scroll + wheel spin + exhaust puffs + heat
      haze + dust plume simultaneously, so no single mover ever read as the
      event. Texture is demoted hard: haze deleted, wheels slowed 3x, road
      scroll at half contrast, and exactly ONE thing carries any given beat.
   3. BEATS ARE BIGGER. Each event sweeps a large fraction of the frame instead
      of nudging a prop — a vehicle crossing the whole foreground, a drum
      tumbling at camera.

   PLACE   two-lane desert highway at full throttle. FLOOR cracked blacktop,
           centre line raking to a vanishing point at (596,470). No back wall —
           a burnt rock bank under a bleached dust horizon. THE RIG fills frame
           right; a door-sized dash gauge is bolted to the near cab, frame left.
   LIGHT   ONE key: low sun camera-RIGHT. Lit faces go hot orange, every shadow
           falls camera-LEFT and reads deep TEAL. The fireball (f0-14) and the
           warning wash (f22+) are practical sources, never a second key.
   CAMERA  ⛔ LOCKED. The road scrolls; the frame never does.
   DEPTH   0 cropped blacktop · 1 hero · 2 dash gauge · 3 the rig + drums
           4 the pursuit buggy · 5 rock bank · 6 sky

   ⛔ BEATS — one dominant mover each, ≥14f apart, nothing else competing:
        f0–14    BACKFIRE. Both stacks erupt a full fireball. THE INTERRUPT.
        f18–44   The needle whips off the peg to E; the alarm floods the cab.
        f48–78   A pursuit buggy ROCKETS across the foreground, left to right.
        f82–106  A GUZZTOKEN drum sheds off the rack and tumbles at camera.
        f108–131 The hero snaps to the gauge. Everything else stops.
   ============================================================================= */

const SKY_HI = "#FF6A12", SKY_MID = "#FF9A2E", SKY_LO = "#FFD48A";
const ROCK_HI = "#C4551F", ROCK_LO = "#7E2F14";
const TEAL_HI = "#12525F", TEAL_MID = "#0B3742", TEAL_LO = "#04202A";
const RIG_HI = "#2E5D66", RIG_MID = "#12414C", RIG_LO = "#07242D";
const GY = 742;

export const S0Hook: React.FC<{ lf: number }> = ({ lf }) => {
  /* ---------- beat clocks ---------- */
  const fire = Math.max(0, 1 - lf / 14);                 // f0 peak, decays out
  const fireP = Math.pow(fire, 0.7);
  const slam = over(lf, 18, 18);                         // needle to E
  const warn = ramp(lf, 22, 32) * (0.62 + Math.sin(lf / 3.4) * 0.38);
  const buggy = over(lf, 38, 42, (t) => t);              // linear: it is FAST
  const shed = over(lf, 76, 30);                         // drum sheds + tumbles
  const burst = over(lf, 104, 22);                       // ...and bursts at camera
  const look = over(lf, 100, 12);
  /* damped shudder: f28 (starve) and f112 (cutting out, harder) */
  const lurch = (at: number, amp: number, k: number) => {
    const d = lf - at; if (d < 0 || d > 26) return 0;
    return Math.sin(d / k) * amp * Math.max(0, 1 - d / 26);
  };
  const rigDX = lurch(28, 9, 2.1) + lurch(112, 15, 2.6);
  const rigDY = lurch(28, 5, 1.7) + lurch(112, 9, 2.2);
  const billow = over(lf, 112, 19);

  /* ---------- texture, demoted (⛔ never the event) ---------- */
  const roll = lf * 22;
  const spin = lf * 7;                                   // v1 was 22 — competed
  const needle = -34 + slam * 96 + Math.max(0, 1 - Math.abs(lf - 40) / 9) * -7;

  const bx = -280 + buggy * 1560;
  const drumX = 690 - shed * 320, drumY = 300 + shed * 470, drumS = 1 + shed * 2.2;

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id="h0sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={SKY_HI} /><stop offset=".52" stopColor={SKY_MID} />
            <stop offset="1" stopColor={SKY_LO} /></linearGradient>
          <linearGradient id="h0road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={TEAL_HI} /><stop offset=".45" stopColor={TEAL_MID} />
            <stop offset="1" stopColor={TEAL_LO} /></linearGradient>
          <linearGradient id="h0rig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={RIG_HI} /><stop offset=".42" stopColor={RIG_MID} />
            <stop offset="1" stopColor={RIG_LO} /></linearGradient>
          <linearGradient id="h0dial" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF6E2" /><stop offset="1" stopColor="#D8CDB4" /></linearGradient>
          <radialGradient id="h0warn" cx=".22" cy=".52" r=".52">
            <stop offset="0" stopColor="#FF2A18" stopOpacity=".42" />
            <stop offset="1" stopColor="#FF2A18" stopOpacity="0" /></radialGradient>
          <linearGradient id="h0rim" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#FFB25A" stopOpacity=".95" />
            <stop offset=".22" stopColor="#FFB25A" stopOpacity="0" /></linearGradient>
          <radialGradient id="h0blast" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#FFFFFF" /><stop offset=".28" stopColor="#FFE9A8" />
            <stop offset=".62" stopColor="#FF8C1A" /><stop offset="1" stopColor="#C4300A" stopOpacity="0" /></radialGradient>
        </defs>

        {/* ================= plane 6 — sky ================= */}
        <rect width={1012} height={470} fill="url(#h0sky)" />
        <circle cx={430} cy={398} r={132} fill="#FFE9A8" opacity={0.5} />
        <circle cx={430} cy={398} r={76} fill="#FFF6D2" />

        <Buzzards lf={lf} x={264} y={188} s={1.15} n={3} />

        {/* ================= plane 5 — rock bank ================= */}
        <path d="M0 392 L128 322 L232 372 L344 300 L462 360 L586 314 L706 368 L836 322 L960 372 L1012 344 L1012 470 L0 470 Z"
              fill={ROCK_HI} />
        <path d="M0 424 L160 392 L318 422 L488 390 L664 424 L846 396 L1012 424 L1012 470 L0 470 Z" fill={ROCK_LO} />
        <g opacity={0.7}><Wreck x={128} y={452} s={0.30} rot={-8} /></g>
        <g opacity={0.85}><RouteShield x={62} y={352} s={0.62} n="78" /></g>

        {/* ================= blacktop ================= */}
        <rect y={470} width={1012} height={322} fill="url(#h0road)" />
        <rect y={470} width={1012} height={6} fill="#1E6C7A" opacity={0.7} />
        {/* centre line — texture only, half the contrast it had in v1 */}
        <g fill="#FFD98A" opacity={0.55}>
          {Array.from({ length: 7 }, (_, i) => {
            const k = ((i * 46 + roll) % 322) / 322;
            const y = 476 + k * k * 310;
            const w = 14 + k * k * 150, h = 7 + k * k * 54;
            return <rect key={i} x={596 - 300 * k * k - w / 2} y={y} width={w} height={h} rx={2} opacity={0.4 + k * 0.4} />; })}
        </g>
        <g stroke="#062730" strokeWidth={3} opacity={0.45}>
          <path d="M0 552h1012M0 646h1012M0 738h1012" /></g>

        {/* ================= plane 3 — THE RIG ================= */}
        <g transform={`translate(${760 + rigDX},${318 + rigDY})`}>
          <rect x={-150} y={44} width={420} height={196} rx={32} fill="url(#h0rig)" />
          <rect x={-150} y={44} width={420} height={20} rx={10} fill="#5C93A0" opacity={0.55} />
          <g stroke="#04191F" strokeWidth={5} opacity={0.85}>
            <path d="M-40 44v196M74 44v196M188 44v196" /></g>
          <rect x={-150} y={44} width={420} height={196} rx={32} fill="url(#h0rim)" opacity={0.5} />
          <path d="M-236 92 L-150 92 L-150 254 L-276 254 L-276 148 Z" fill="#0E3843" />
          <path d="M-232 108 L-158 108 L-158 172 L-256 172 Z" fill="#8FD3E0" opacity={0.35} />
          <path d="M-236 92 L-150 92 L-150 254 L-276 254 L-276 148 Z" fill="url(#h0rim)" opacity={0.35} />
          <rect x={-292} y={214} width={44} height={44} rx={9} fill="#C4551F" />
          <rect x={-142} y={-66} width={24} height={116} rx={8} fill="#9BB6BC" />
          <rect x={-100} y={-46} width={24} height={96} rx={8} fill="#7E9DA5" />
          {/* ⭐ the flame-guitar rig — the pop-culture cameo, background layer */}
          <g opacity={0.94}><DoofRig lf={lf} x={104} y={-96} s={0.58} /></g>
          <ChromeSkull x={-262} y={128} s={0.86} />
          <HandPrints x={-252} y={168} s={0.62} n={4} />
          {/* wheels — slowed hard so they read as texture */}
          {[-206, -18, 118, 236].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy={270} r={56} fill="#04161C" />
              <g transform={`rotate(${spin} ${cx} 270)`} stroke="#2E5D66" strokeWidth={6} strokeLinecap="round" opacity={0.75}>
                <path d={`M${cx - 28} 270h56M${cx} 242v56`} /></g>
              <circle cx={cx} cy={270} r={19} fill="#12414C" />
            </g>))}
          <ellipse cx={20} cy={330} rx={330} ry={24} fill="#04202A" opacity={0.6} />
          {/* drum rack — the third drum sheds at f82 */}
          <g transform="translate(46,-14)">
            {[0, 88, 176].map((dx, i) => (
              <g key={dx} transform={`translate(${dx},${i === 1 ? -6 : 0})`}
                 opacity={i === 2 ? 1 - over(lf, 76, 8) : 1}>
                <rect x={0} y={0} width={72} height={58} rx={8} fill="#C4551F" />
                <rect x={0} y={13} width={72} height={7} fill="#FFE9A8" />
                <rect x={0} y={37} width={72} height={7} fill="#FFE9A8" />
                <text x={36} y={32} textAnchor="middle" fontFamily={mono} fontSize={12} fontWeight={700}
                      letterSpacing={1} fill="#3A1710">GUZZ</text>
              </g>))}
          </g>
        </g>

        {/* ===== BEAT 1 — THE BACKFIRE. Full at f0, decays. THE INTERRUPT. ===== */}
        {fire > 0.01 && (
          <g>
            {[618, 660].map((cx, i) => (
              <circle key={cx} cx={cx} cy={244 - i * 20 - fireP * 40} r={(78 + i * 14) * (0.5 + fireP * 2.1)}
                      fill="url(#h0blast)" opacity={fireP} />))}
            <ellipse cx={640} cy={196 - fireP * 60} rx={168 * (0.4 + fireP * 1.3)} ry={196 * (0.35 + fireP * 1.3)}
                     fill="url(#h0blast)" opacity={fireP * 0.9} />
            {Array.from({ length: 14 }, (_, i) => {
              const s = seed(i + 31), a = s * Math.PI * 2;
              const d = (1 - fire) * (140 + s * 210);
              return <circle key={i} cx={640 + Math.cos(a) * d * 1.3} cy={220 + Math.sin(a) * d - (1 - fire) * 70}
                             r={6 + s * 12} fill={i % 3 ? "#FFB03A" : "#FFF0C4"} opacity={fire * 0.95} />; })}
            <rect width={1012} height={792} fill="#FF7A14" opacity={fireP * 0.13} />
            <rect width={1012} height={792} fill="#FFF6D2" opacity={Math.max(0, 1 - lf / 3) * 0.20} />
          </g>)}

        {/* ===== BEAT 4 — a GUZZTOKEN drum sheds and tumbles at camera ===== */}
        {shed > 0.001 && burst < 0.02 && (
          <g transform={`translate(${drumX},${drumY}) scale(${drumS}) rotate(${shed * 520})`}
             opacity={Math.min(1, shed * 5)}>
            <rect x={-36} y={-29} width={72} height={58} rx={8} fill="#C4551F" />
            <rect x={-36} y={-16} width={72} height={7} fill="#FFE9A8" />
            <rect x={-36} y={8} width={72} height={7} fill="#FFE9A8" />
            <text x={0} y={3} textAnchor="middle" fontFamily={mono} fontSize={12} fontWeight={700}
                  letterSpacing={1} fill="#3A1710">GUZZ</text>
          </g>)}


        {/* ===== BEAT 5 — the drum bursts at camera. Carries the final second. ===== */}
        {burst > 0.001 && (
          <g opacity={Math.max(0, 1 - burst * 0.85)}>
            <ellipse cx={372} cy={742} rx={120 + burst * 520} ry={40 + burst * 190}
                     fill="url(#h0blast)" opacity={0.85 * (1 - burst * 0.6)} />
            {Array.from({ length: 16 }, (_, i) => {
              const sd = seed(i + 61), a = -Math.PI * (0.08 + sd * 0.84);
              const d = burst * (240 + sd * 420);
              return (
                <g key={i} transform={`translate(${372 + Math.cos(a) * d * 1.5},${742 + Math.sin(a) * d}) rotate(${burst * 620 * (sd - 0.5)})`}>
                  <rect x={-13} y={-10} width={26} height={20} rx={4}
                        fill={i % 3 ? "#C4551F" : "#FFB03A"} opacity={1 - burst * 0.5} />
                </g>); })}
            <rect width={1012} height={792} fill="#FF7A14" opacity={Math.max(0, 1 - burst * 3) * 0.16} />
          </g>)}


        {/* ===== BEAT 6 — the rig cuts out and throws a dust wall up the right
             side. ⛔ DRAWN as one opaque silhouette with a single shade — stacked
             translucent circles read as bubbles, not dust (reel-no-emoji-no-lowopacity,
             reel-draw-dont-stack). ===== */}
        {billow > 0.001 && (
          <g transform={`translate(736,742) scale(${0.35 + billow * 1.25})`} opacity={Math.min(1, billow * 3)}>
            <path d="M-300 20 C-296 -46 -244 -84 -196 -70 C-186 -128 -120 -160 -66 -134
                     C-40 -190 42 -196 78 -146 C132 -172 196 -136 198 -78
                     C250 -66 268 -14 250 20 Z"
                  fill="#B4713A" />
            <path d="M-262 20 C-258 -34 -214 -66 -172 -54 C-162 -104 -104 -132 -58 -110
                     C-34 -158 36 -164 68 -120 C114 -142 170 -112 172 -62
                     C214 -52 230 -10 214 20 Z"
                  fill="#E8A45A" />
            <path d="M-196 -70 C-186 -128 -120 -160 -66 -134 C-40 -190 42 -196 78 -146
                     C40 -150 -6 -132 -30 -104 C-70 -132 -140 -118 -196 -70 Z"
                  fill="#FFD79A" />
          </g>)}

        {/* ================= plane 2 — ⛔ HERO ARTIFACT: the dash gauge ================= */}
        <g transform="translate(252,470)">
          <rect x={-152} y={-152} width={304} height={304} rx={22} fill="#07242D" stroke="#C4551F" strokeWidth={7} />
          <rect x={-152} y={-152} width={304} height={304} rx={22} fill="url(#h0rim)" opacity={0.25} />
          <circle cx={0} cy={-18} r={118} fill="#03151B" />
          <circle cx={0} cy={-18} r={106} fill="url(#h0dial)" />
          <path d="M-75 57 A106 106 0 0 1 -106 -18" fill="none" stroke={GREEN} strokeWidth={18} />
          <path d="M-106 -18 A106 106 0 0 1 -32 -119" fill="none" stroke="#B6AE96" strokeWidth={18} />
          <path d="M-32 -119 A106 106 0 0 1 39 -116" fill="none" stroke={AMBER} strokeWidth={18} />
          <path d="M39 -116 A106 106 0 0 1 106 -18" fill="none" stroke={RED} strokeWidth={18} />
          <path d="M106 -18 A106 106 0 0 1 75 57" fill="none" stroke="#8E2F22" strokeWidth={18} />
          <g stroke="#2A2620" strokeWidth={5}>
            <path d="M-75 57L-64 46M-106 -18h18M-32 -119l6 17M39 -116l-6 17M106 -18h-18M75 57l-11-11" /></g>
          <text x={-84} y={-4} fontFamily={mono} fontSize={24} fontWeight={700} fill="#2A2620">F</text>
          <text x={64} y={-4} fontFamily={mono} fontSize={24} fontWeight={700} fill="#8E2F22">E</text>
          <g transform={`translate(0,-18) rotate(${needle})`}>
            <path d="M0 0 L-7 -11 L0 -95 L7 -11 Z" fill={RED} />
            <path d="M0 0 L0 27" stroke={RED} strokeWidth={9} strokeLinecap="round" /></g>
          <circle cx={0} cy={-18} r={15} fill="#2A2620" /><circle cx={0} cy={-18} r={6} fill={RED} />
          <text x={0} y={126} textAnchor="middle" fontFamily={mono} fontSize={25} fontWeight={700}
                letterSpacing={3} fill="#FFC069">GUZZTOKEN</text>
          <circle cx={116} cy={-134} r={17} fill="#3A1710" />
          <circle cx={116} cy={-134} r={13} fill="#FF2A18" opacity={warn} />
        </g>

        <rect width={1012} height={792} fill="url(#h0warn)" opacity={warn * 0.42} />
        <Vignette cx={0.52} cy={0.54} a={0.6} />
      </svg>

      {/* ================= plane 1 — the hero ================= */}
      <Actor lf={lf} x={548} groundY={GY} size={H} z={22} coat={1}
             gaze={look > 0.5 ? -7 : 5} shock={Math.max(fire * 0.6, look * 0.5)}
             nodAmp={1.6} nodSpeed={13} />

      {/* ===== BEAT 3 (plane 0) — the buggy sweeps the FOREGROUND, in front
           of the gauge and the hero. Own overlay so it owns the depth. ===== */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 30, pointerEvents: "none" }}>
        {/* ===== BEAT 3 — the pursuit buggy ROCKETS across the foreground ===== */}
        {buggy > 0.001 && buggy < 0.999 && (
          <g transform={`translate(${bx},668)`}>
            <g stroke="#FFD98A" strokeWidth={5} strokeLinecap="round" opacity={0.55}>
              <path d="M-250 -34h150M-300 -6h190M-262 22h160" /></g>
            <ellipse cx={10} cy={62} rx={150} ry={16} fill="#04202A" opacity={0.5} />
            <path d="M-118 30 L-96 -18 L-16 -34 L74 -28 L128 6 L136 40 L-118 40 Z" fill="#7E2F14" />
            <path d="M-96 -18 L-16 -34 L54 -30 L84 -6 Z" fill="#0E3843" />
            <rect x={-134} y={22} width={272} height={16} rx={6} fill="#3A1710" />
            <path d="M62 -28 L96 -122" stroke="#9BB6BC" strokeWidth={9} strokeLinecap="round" />
            <ellipse cx={104} cy={-140} rx={30} ry={38} fill="url(#h0blast)" opacity={0.95} />
            <circle cx={-72} cy={40} r={34} fill="#04161C" /><circle cx={-72} cy={40} r={12} fill="#2E5D66" />
            <circle cx={86} cy={40} r={34} fill="#04161C" /><circle cx={86} cy={40} r={12} fill="#2E5D66" />
            {Array.from({ length: 5 }, (_, i) => {
              const s = seed(i + 5);
              return <circle key={i} cx={-150 - i * 44} cy={26 - s * 26} r={18 + s * 22}
                             fill="#FFC069" opacity={0.30 * (1 - i / 5)} />; })}
          </g>)}
      </svg>

      {/* goggles + strap — the costume read */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 26, pointerEvents: "none" }}>
        <g transform="translate(548,583)">
          <rect x={-92} y={-16} width={184} height={15} rx={7} fill="#3A1710" />
          <g fill="#0E3843" stroke="#C4551F" strokeWidth={5}>
            <rect x={-74} y={-34} width={62} height={52} rx={13} />
            <rect x={12} y={-34} width={62} height={52} rx={13} /></g>
          <rect x={-14} y={-16} width={28} height={11} rx={4} fill="#3A1710" />
          <g fill="#8FD3E0" opacity={0.5}>
            <rect x={-66} y={-27} width={20} height={12} rx={5} />
            <rect x={20} y={-27} width={20} height={12} rx={5} /></g>
        </g>
      </svg>
    </>
  );
};
