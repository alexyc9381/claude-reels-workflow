import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, Chip, Edge, R, asPlace, mono, ui, Ring, Puff, Pool, Steam,
  Hero, Crew, Forearm, squash,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, STEEL,
  BRASS, SODIUM, OXIDE, SLATE, VERD, BONE, ToolWall,
} from "./UnlazyWorld";
import { Hall, Stanchion } from "./LoopSets";

/* ===========================================================================
   REEL 120 · "UNLAZY" — HOOK CANDIDATES, ROUND 3.

   ⛔⛔ ROUND 2 CALIBRATED ON THE APPROVED REELS AND THEN COPIED ONE OF THEM.
   Alex: *"dont just directly copy the other vidoe hook ideas like lisfting the
   weights."* Correct — WEIGHTLESS was reel 110 FLOW's barbell with a new label
   on the plates. Looking at what shipped was the right move; lifting its hero
   prop was not. **Take the GRAMMAR, never the OBJECT.**

   ⭐ THE GRAMMAR, restated so it can be applied without copying:
        huge Claude (380-450px, ~50% of panel) PERFORMING the action
        + a hero object with a NON-RECTANGULAR silhouette
        + a vivid material (gold, wax, rubber, paint) rather than slate
        + the real receipt set big, on the object itself.
   The barbell is one instance of that. So are a trophy, a flag, a balloon, a
   cannon and a spray can, and none of those is taken.

   ⭐⭐ AND THE ARMS ARE FIXED AT THE RIG, WHICH IS WHY THEY LOOKED WRONG.
   `Mascot` draws its own arms as two 26x26 rects at `armY = 86` in a 200-unit
   viewBox, i.e. at **x = centre ± 0.395·size, y = base − 0.505·size**. Round 2
   guessed those coordinates, so every forearm started in mid-body and read as a
   floating orange stick. `Grip` below computes them from the rig and finishes
   with a real MITT, per §11: a limb that terminates in mid-air is the banned
   shape, and both ends must sit on something.
   ========================================================================= */

export type HookId = "trophy" | "flag" | "balloon" | "cannon" | "paint";

export const HOOK_BANDS: Record<HookId, { big: string; hot: string }> = {
  trophy:  { big: "IT DECLARES VICTORY",  hot: "BEFORE RUNNING ANYTHING" },
  flag:    { big: "IT PLANTS THE FLAG",   hot: "AT THE FOOT OF THE HILL"  },
  balloon: { big: 'ITS "DONE" IS HOT AIR', hot: "MAKE IT SHOW THE OUTPUT" },
  cannon:  { big: "IT THROWS A PARTY",    hot: "OVER WORK THAT FAILED" },
  paint:   { big: "IT PAINTS OVER FAILS", hot: "THIS FREE SKILL STOPS IT" },
};

/* ---- the rig, computed rather than guessed -------------------------------- */
const armPt = (x: number, y: number, size: number, side: -1 | 1): [number, number] =>
  [x + side * size * 0.395, y - size * 0.505];

/** ⭐ A FOREARM THAT ACTUALLY GRIPS: it starts on the mascot's own arm rect and
    ends in a MITT closed around the thing. Thickness scales with the sprite, so
    a 430px Claude does not get a 26px twig. */
const Grip: React.FC<{ from: [number, number]; to: [number, number]; size: number;
  z?: number; c?: string }> = ({ from, to, size, z = 64, c = CLAYD }) => {
  const w = Math.round(size * 0.105);
  const [tx, ty] = to;
  return (<>
    <Forearm x0={from[0]} y0={from[1]} x1={tx} y1={ty} w={w} c={c} z={z} />
    <div style={{ position: "absolute", left: tx - w * 0.72, top: ty - w * 0.72,
      width: w * 1.44, height: w * 1.44, borderRadius: "44%", zIndex: z + 1,
      background: `linear-gradient(168deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.24)} 100%)` }} />
  </>);
};

/* =========================================================================
   THE HERO PROPS
   ====================================================================== */

/** ⭐ THE TROPHY, POLISHED. Alex: *"maybe lifting the trophy could be good if
    its more polished."* So: a deeper bowl with a proper waist, a beaded rim, a
    knurled stem collar, an engraved plinth, TWO specular sweeps, and a `crush`
    that buckles the bowl inward and sheds gold flakes rather than just
    squashing the path. */
const Trophy: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  crush?: number }> = ({ x, y, f, s = 1, z = 60, crush = 0 }) => {
  const w = 452 * s, h = 508 * s;
  const c = crush;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      <svg width={w} height={h} viewBox="0 0 100 112" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="tAu" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor={mxh(GOLD, 0.58)} />
            <stop offset="30%" stopColor={mxh(GOLD, 0.14)} />
            <stop offset="62%" stopColor={dkh(GOLD, 0.18)} />
            <stop offset="100%" stopColor={dkh(GOLD, 0.48)} />
          </linearGradient>
          <linearGradient id="tRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mxh(GOLD, 0.70)} />
            <stop offset="100%" stopColor={dkh(GOLD, 0.34)} />
          </linearGradient>
        </defs>
        {/* the two handles, which is what makes a cup a TROPHY */}
        {[-1, 1].map(sg => (
          <path key={sg}
            d={`M${50 + sg * 25} 21 C${50 + sg * 47} 17 ${50 + sg * 50} 47 ${50 + sg * 27} 50`}
            fill="none" stroke={dkh(GOLD, 0.26)} strokeWidth={8 - c * 3.5}
            strokeLinecap="round" opacity={1 - c * 0.7} />
        ))}
        {/* the bowl: a real waisted profile, buckling inward as it crushes */}
        <path d={`M23 ${18 + c * 5}
                  C23 ${44 - c * 10} ${29 + c * 8} ${60 - c * 16} ${39 + c * 3} ${70 - c * 20}
                  L${61 - c * 3} ${70 - c * 20}
                  C${71 - c * 8} ${60 - c * 16} 77 ${44 - c * 10} 77 ${18 + c * 5} Z`}
          fill="url(#tAu)" stroke={dkh(GOLD, 0.50)} strokeWidth="2.4" />
        {/* the buckle crease that appears as it collapses */}
        {c > 0.15 && (
          <path d={`M26 ${34 + c * 6} Q50 ${48 + c * 14} 74 ${34 + c * 6}`} fill="none"
            stroke={dkh(GOLD, 0.56)} strokeWidth={2.6} opacity={c} />
        )}
        {/* the beaded rim */}
        <path d={`M21 ${16 + c * 5} L79 ${16 + c * 5} L79 ${23 + c * 5} L21 ${23 + c * 5} Z`}
          fill="url(#tRim)" stroke={dkh(GOLD, 0.44)} strokeWidth="1.8" />
        {Array.from({ length: 13 }, (_, i) => (
          <circle key={i} cx={23 + i * 4.5} cy={19.5 + c * 5} r="1.5" fill={mxh(GOLD, 0.62)} />
        ))}
        {/* stem, knurled collar, plinth */}
        <path d={`M45 ${70 - c * 20} L55 ${70 - c * 20} L57 84 L43 84 Z`}
          fill={dkh(GOLD, 0.20)} stroke={dkh(GOLD, 0.48)} strokeWidth="2" />
        <rect x="41" y="76" width="18" height="6" fill={dkh(GOLD, 0.40)} />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={42 + i * 2.4} y="76" width="1" height="6" fill={mxh(GOLD, 0.40)} />
        ))}
        <path d="M29 84 L71 84 L76 97 L24 97 Z" fill={dkh(BRASS, 0.14)}
          stroke={dkh(BRASS, 0.48)} strokeWidth="2" />
        <path d="M20 97 L80 97 L80 110 L20 110 Z" fill={dkh(OXIDE, 0.30)}
          stroke={dkh(OXIDE, 0.54)} strokeWidth="2" />
        {/* two speculars — one hot edge, one broad sheen */}
        <path d={`M32 ${24 + c * 5} C29 40 31 54 37 ${64 - c * 18}`} stroke={hexa("#FFFFFF", 0.40)}
          strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d={`M66 ${26 + c * 5} C69 40 68 52 63 ${62 - c * 18}`} stroke={hexa("#FFFFFF", 0.16)}
          strokeWidth="9" fill="none" strokeLinecap="round" />
      </svg>
      {/* the engraved plaque — the receipt goes where a winner's name goes */}
      <div style={{ position: "absolute", left: w * 0.17, top: h * 0.877, width: w * 0.66,
        height: h * 0.082, background: `linear-gradient(168deg, ${PAPER} 0%, ${CREAMB} 100%)`,
        border: `${3 * s}px solid ${dkh(BRASS, 0.42)}`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 9 * s }}>
        <span style={{ ...ui(Math.round(36 * s), 900), color: INK,
          fontFamily: "Fraunces, Georgia, serif" }}>{R.bench.value}</span>
        <span style={{ ...mono(Math.round(12 * s), 800), color: dkh(MUTE, 0.22) }}>{R.bench.src}</span>
      </div>
      {/* gold flakes shedding off it as it goes */}
      {c > 0.1 && Array.from({ length: 10 }, (_, i) => {
        const t = Math.min(1, (c - 0.1) * 1.4 + rnd(i, 9) * 0.3);
        return <div key={"fk" + i} style={{ position: "absolute",
          left: w * (0.2 + rnd(i, 3) * 0.6) + (rnd(i, 4) - 0.5) * 180 * t,
          top: h * 0.34 + t * t * 420, width: 12 * s, height: 8 * s,
          transform: `rotate(${t * 420}deg)`, background: mxh(GOLD, 0.30),
          opacity: 1 - t * 0.7 }} />;
      })}
    </div>
  );
};

/** ⭐ THE HILL AND THE MOUNTAIN — the gag is a SILHOUETTE COMPARISON, so both
    masses are drawn as paths: a molehill you could step over, and behind it the
    actual mountain, untouched, with the route still unwalked. */
const Massif: React.FC<{ f: number; z?: number; lit?: string }> = ({ f, z = 20, lit = "#E9DABB" }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0,
    top: 0, zIndex: z }}>
    <defs>
      <linearGradient id="mtLit" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor={mxh("#8C7D67", 0.34)} />
        <stop offset="100%" stopColor={mxh("#8C7D67", 0.02)} />
      </linearGradient>
      <linearGradient id="mtDark" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor={dkh("#8C7D67", 0.22)} />
        <stop offset="100%" stopColor={dkh("#8C7D67", 0.48)} />
      </linearGradient>
    </defs>
    {/* the far range, hazed back */}
    <path d="M-40 640 L150 420 L280 500 L440 300 L620 470 L770 392 L1060 610 L1060 800 L-40 800 Z"
      fill={hexa("#7E7460", 0.40)} />
    {/* ⛔ v3 drew ONE flat triangle and it read as a grey wedge. A mountain is a
        LIT face, a SHADOW face, a ridge between them, a snow cap and buttresses. */}
    <path d="M96 720 L430 196 L560 372 L700 720 Z" fill="url(#mtDark)" />
    <path d="M430 196 L96 720 L318 720 L430 400 Z" fill="url(#mtLit)" />
    <path d="M430 196 L430 400 L318 720" fill="none" stroke={dkh("#8C7D67", 0.54)} strokeWidth="3.5" />
    {/* the snow cap, which is what makes it read as a SUMMIT */}
    <path d="M430 196 L482 268 L444 262 L418 292 L392 258 L360 268 Z" fill={mxh(lit, 0.62)}
      stroke={hexa("#FFFFFF", 0.34)} strokeWidth="2" />
    {/* two buttress ridges so the face has form */}
    <path d="M430 300 L520 520 L470 560" fill="none" stroke={dkh("#8C7D67", 0.40)} strokeWidth="4" opacity="0.7" />
    <path d="M400 340 L300 560 L340 600" fill="none" stroke={dkh("#8C7D67", 0.34)} strokeWidth="4" opacity="0.55" />
    {/* THE ROUTE, still unwalked, all the way to the top */}
    {Array.from({ length: 16 }, (_, i) => {
      const t = i / 15;
      return <circle key={i} cx={604 - t * 176} cy={706 - t * 486} r={7 - t * 3}
        fill={hexa("#3E362B", 0.40)} />;
    })}
  </svg>
);

/** ⭐⭐ THE BALLOON — a real teardrop, not a circle. v3 rendered at d=140 on
    frame 0 and read as a green pea; it now opens ALREADY PART INFLATED at 300px
    and reaches 500, which is half the panel. Drawn as an SVG path because a
    balloon's silhouette is a teardrop with a neck and a knot, and that neck is
    what stops it reading as a ball. */
const Balloon: React.FC<{ x: number; y: number; f: number; p?: number; pop?: number;
  s?: number; z?: number; dent?: number; wob?: number; popAt?: number }> =
  ({ x, y, f, p = 0, pop = 0, s = 1, z = 60, dent = 0, wob = 0, popAt = 0 }) => {
  const d = (300 + p * 200) * s;
  const hh = d * 1.16;
  const bob = Math.sin(f / 13) * 7 * p;
  const squeak = (pop > 0 ? 0 : dent * 0.05) + wob;
  return (<>
    {pop <= 0.40 && (
    <div style={{ position: "absolute", left: x - d / 2, top: y - hh + bob, width: d, height: hh,
      zIndex: z, transform: `scale(${(1 + pop * 0.22) * (1 + squeak)}, ${(1 + pop * 0.22) * (1 - squeak)})`,
      /* ⛔ the skin must LEAVE, not dissolve: at `1 - pop` a 500px balloon spends
         eight frames as a green wash over half the panel. The shrapnel carries
         the burst; the body is gone by the third frame. */
      opacity: Math.max(0, 1 - pop * 2.6) }}>
      <svg width={d} height={hh} viewBox="0 0 100 116" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="blG" cx="0.34" cy="0.27" r="0.78">
            <stop offset="0%" stopColor={mxh(GREEN, 0.72)} />
            <stop offset="22%" stopColor={mxh(GREEN, 0.26)} />
            <stop offset="58%" stopColor={GREEN} />
            <stop offset="100%" stopColor={dkh(GREEN, 0.46)} />
          </radialGradient>
        </defs>
        {/* the teardrop body, with the DENT the nose presses into its side */}
        <path d={`M50 2
                  C${78 - dent * 4} 2 96 22 96 48
                  C96 74 ${76 + dent * 2} 96 ${58} 100
                  L42 100
                  C24 96 4 74 4 48
                  C4 22 22 2 50 2 Z`}
          fill="url(#blG)" stroke={dkh(GREEN, 0.42)} strokeWidth="2" />
        {/* the neck and the knot */}
        <path d="M42 99 L58 99 L55 109 L45 109 Z" fill={dkh(GREEN, 0.30)} />
        <ellipse cx="50" cy="111" rx="8" ry="5" fill={dkh(GREEN, 0.40)} />
        {/* the seam and the two speculars that make rubber read as rubber */}
        <path d="M50 3 C34 30 33 66 46 99" fill="none" stroke={hexa("#0B2A18", 0.14)} strokeWidth="2" />
        <ellipse cx="32" cy="30" rx="12" ry="16" fill={hexa("#FFFFFF", 0.52)} transform="rotate(-22 32 30)" />
        <ellipse cx="70" cy="66" rx="5" ry="14" fill={hexa("#FFFFFF", 0.13)} transform="rotate(14 70 66)" />
      </svg>
      {p > 0.30 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "34%",
          ...ui(Math.round(d * 0.23), 900), color: hexa("#EAFBEF", 0.96), textAlign: "center",
          letterSpacing: 5, transform: "rotate(-4deg)" }}>DONE</div>
      )}
    </div>)}
    {/* the burst: rubber shrapnel, not confetti.
        ⛔ It used to be driven off `pop`, which PLATEAUS at 1 — so sixteen green
        flakes hung motionless at radius 300 for the 30 frames after the burst.
        Debris needs its OWN clock, with gravity and an end. */}
    {(() => {
      const bt = (f - popAt) / 30;
      if (bt <= 0 || bt >= 1) return null;
      const ease = 1 - Math.pow(1 - bt, 2.4);
      return Array.from({ length: 18 }, (_, i) => {
        const a2 = (i / 18) * Math.PI * 2 + rnd(i, 21) * 0.4;
        const r = (250 + rnd(i, 23) * 190) * ease;
        return <div key={"bp" + i} style={{ position: "absolute",
          left: x + Math.cos(a2) * r, top: y - hh * 0.52 + Math.sin(a2) * r * 0.72 + 460 * bt * bt,
          width: (36 - (i % 3) * 9) * s, height: (17 - (i % 3) * 4) * s,
          borderRadius: "60% 40% 50% 50%", zIndex: 72,
          transform: `rotate(${a2 * 57 + bt * 640}deg)`, opacity: Math.max(0, 1 - bt * 1.25),
          background: i % 2 ? dkh(GREEN, 0.22) : mxh(GREEN, 0.10) }} />;
      });
    })()}
  </>);
};

/** ⭐⭐⭐ THE NOSE, ROUND 3. Two notes, two real bugs:

    ⛔ 1. *"the nose stays in place while the claude guy rocks back and forth."*
       Dead right, and it was a rig error, not a drawing one. `Hero` puts every
       one of its offsets — dx, dy, the action-loop sway, the strain squash, the
       rotate — on its OWN div, and the nose was a SIBLING of that div, so the
       body rocked and the nose hung in space. It is now passed through the new
       `Hero face` slot and rendered INSIDE that transform, in mascot-local
       coords, so it rocks, bobs and squashes with the head.

    ⛔ 2. *"its not clear its pinnochio."* It was clay-coloured, so it read as
       "a long thing the same colour as him". Pinocchio's nose is WOOD, and that
       is the single strongest cue: it is now oak against the clay face, with
       grain lines down the shaft, darker turned rings at each growth step, a
       cut end-grain tip, and a knot. Hue does the work colour was never doing.

    ⛔ Position stays where round 2 put it — face centre, just under the eye line
    (`Mascot` face rect is x34 y44 w132 h102, eyes y70..96 of a 200 viewBox). */
const WOOD = "#C8A063", WOOD_D = "#8A6534";
/** ⭐ HEX-OUT lerp. `lerpHex` in the kit returns `rgb(...)`, and `dkh()`/`mxh()`
    are hex-in only — nesting them is the documented "nested colour helpers go
    BLACK" trap. The tint is consumed by both, so it has to stay hex. */
const HOT = "#C0392B";

/** ⭐ EAR STEAM. The kit's `Steam` caps its particles at 0.36 opacity and 47px,
    which is invisible pale-on-pale against this bone wall — the whole point of
    the beat is that you can SEE him boiling. This vents in kettle PULSES: three
    jets a side, each puff born at the ear, rising while it expands and fades,
    on staggered clocks so it never reads as one blob.
    ⛔ Drawn in mascot-local coords and mounted through `Hero face`, so it rides
    the sprite's transform like the nose does. */
const EarSteam: React.FC<{ size: number; f: number; on: number; z?: number }> =
  ({ size, f, on, z = 4 }) => {
  if (on <= 0.02) return null;
  const JETS = 4, PER = 5;
  return (<>{[-1, 1].map(sg => Array.from({ length: JETS * PER }, (_, i) => {
    const jet = i % JETS;
    const t = (((f * 0.038) + jet * 0.25 + Math.floor(i / JETS) * 0.20) % 1);
    const rise = t * size * 1.22;
    const d = (size * 0.105) * (0.45 + t * 1.5) * (0.70 + 0.44 * Math.min(1.6, on));
    const drift = sg * (size * 0.05 + t * size * 0.10) + Math.sin(t * 5 + jet) * size * 0.03;
    return (
      <div key={`${sg}-${i}`} style={{ position: "absolute",
        left: size * 0.5 + sg * size * 0.42 + drift - d / 2,
        top: size * 0.33 - rise - d / 2,
        width: d, height: d, borderRadius: "50%", zIndex: z,
        background: `radial-gradient(50% 50% at 42% 38%, ${hexa("#FFFFFF", 0.86 * Math.min(1, on) * (1 - t))} 0%, ${hexa("#EDE4D6", 0.50 * Math.min(1, on) * (1 - t))} 46%, ${hexa("#E4DACB", 0)} 100%)` }} />
    );
  }))}</>);
};
const flush = (t: number) => {
  const A = parseInt(CLAY.slice(1), 16), B = parseInt(HOT.slice(1), 16);
  const ch = (sh: number) => {
    const a = (A >> sh) & 255, b = (B >> sh) & 255;
    return Math.round(a + (b - a) * Math.max(0, Math.min(1, t)));
  };
  return "#" + [16, 8, 0].map(sh => ch(sh).toString(16).padStart(2, "0")).join("");
};
const PinocchioNose: React.FC<{ size: number; grow: number; z?: number; skin?: string;
  /** ⭐ 0..1 — the shaft BOWS when it is bearing load. §11: WEIGHT IS
      DEFORMATION. A rigid stick jammed against a post reads as a stick
      overlapping a post; one that bends reads as one pushing the other. */
  load?: number }> =
  ({ size, grow, z = 6, skin = CLAY, load = 0 }) => {
  /* mascot-local: the div is size x size with its origin at the sprite's
     top-left, so the face centre is (size/2, size*0.495). */
  const ox = size * 0.5, oy = size * 0.495;
  const stub = size * 0.15;
  const len = stub + grow;
  const th = size * 0.125;
  const tip = th * 0.30;
  const droop = Math.min(1, grow / (size * 0.8)) * th * 0.34;
  const bow = -load * th * 1.45;

  /* ⭐⭐ THE SHAFT IS ONE CENTRE-LINE, SAMPLED — not four hand-written cubics.
     The first version bowed the cubic's 44%-control, which drags the BASE
     TANGENT up with it, so at full load the nose left his cheek at 45 degrees
     and read as a rainbow parked next to his head rather than a nose coming out
     of his face. `sin(pi*u)^1.7` is zero AND flat at both ends, so the shaft
     leaves the socket horizontal, arches over its own middle and comes back
     down onto the tip however hard it is pushed. */
  const N = 26;
  const cy = (u: number) => th * 2 + droop * u * u + bow * Math.pow(Math.sin(Math.PI * u), 1.7);
  const hw = (u: number) => th * (0.56 - 0.26 * u);
  const us = Array.from({ length: N + 1 }, (_, i) => i / N);
  const edge = (k: number) => us.map(u => `${(u * len).toFixed(1)},${(cy(u) + k * hw(u)).toFixed(1)}`);
  const shaft = `M${edge(-1).join(" L")} L${edge(1).reverse().join(" L")} Z`;
  const along = (k: number, u0 = 0.04, u1 = 0.985) =>
    "M" + us.filter(u => u >= u0 && u <= u1)
      .map(u => `${(u * len).toFixed(1)},${(cy(u) + k * hw(u)).toFixed(1)}`).join(" L");
  const rings = [0.28, 0.46, 0.63, 0.79, 0.91].filter(k => k * len > stub * 1.05);
  const pad = th * 3;
  return (
    <svg width={len + pad} height={th * 4} viewBox={`0 0 ${len + pad} ${th * 4}`}
      style={{ position: "absolute", left: ox - th * 0.34, top: oy - th * 2, zIndex: z,
        overflow: "visible" }}>
      <defs>
        <linearGradient id="wdG" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor={mxh(WOOD, 0.34)} />
          <stop offset="44%" stopColor={WOOD} />
          <stop offset="100%" stopColor={WOOD_D} />
        </linearGradient>
      </defs>
      {/* the socket shadow on the cheek, so it is set INTO the face */}
      <ellipse cx={th * 0.36} cy={th * 2} rx={th * 0.66} ry={th * 0.84}
        fill={dkh(skin, 0.34)} opacity="0.8" />
      <path d={shaft} fill="url(#wdG)" stroke={dkh(WOOD, 0.42)} strokeWidth="2.6"
        strokeLinejoin="round" />
      {/* ⭐ GRAIN — three lines running the length. This is the wood cue. */}
      {[-0.46, 0.06, 0.52].map((o, i) => (
        <path key={"gr" + i} d={along(o)} fill="none" stroke={dkh(WOOD, 0.26 + i * 0.06)}
          strokeWidth={th * 0.055} opacity="0.55" strokeLinecap="round" />
      ))}
      {/* the turned rings — one per lie */}
      {rings.map((k, i) => {
        const y = cy(k), h2 = hw(k) * 0.98;
        return (<g key={"rg" + i}>
          <path d={`M${len * k} ${y - h2} Q${len * k + h2 * 0.7} ${y} ${len * k} ${y + h2}`}
            fill="none" stroke={WOOD_D} strokeWidth="3.4" opacity="0.95" />
          <path d={`M${len * k + 4} ${y - h2 * 0.94} Q${len * k + 4 + h2 * 0.66} ${y} ${len * k + 4} ${y + h2 * 0.94}`}
            fill="none" stroke={mxh(WOOD, 0.44)} strokeWidth="2" opacity="0.7" />
        </g>);
      })}
      {/* the CUT END GRAIN at the tip — concentric, the way sawn timber looks */}
      <ellipse cx={len} cy={cy(1)} rx={tip * 0.5} ry={hw(1)}
        fill={mxh(WOOD, 0.22)} stroke={dkh(WOOD, 0.44)} strokeWidth="1.8" />
      <ellipse cx={len} cy={cy(1)} rx={tip * 0.24} ry={hw(1) * 0.5}
        fill="none" stroke={dkh(WOOD, 0.34)} strokeWidth="1.4" />
      {/* a knot, because timber has one */}
      {len > stub * 2.4 && (<>
        <ellipse cx={len * 0.42} cy={cy(0.42) - th * 0.14} rx={th * 0.15} ry={th * 0.11}
          fill={WOOD_D} opacity="0.85" />
        <ellipse cx={len * 0.42} cy={cy(0.42) - th * 0.14} rx={th * 0.07} ry={th * 0.05}
          fill={dkh(WOOD, 0.56)} />
      </>)}
      {/* the lit top edge */}
      <path d={along(-0.62, 0.05, 0.95)} fill="none" stroke={hexa("#FFFFFF", 0.34)}
        strokeWidth={th * 0.20} strokeLinecap="round" />
    </svg>
  );
};


const Cannon: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  kick?: number }> = ({ x, y, f, s = 1, z = 54, kick = 0 }) => {
  const px = (v: number) => v * s;
  return (<>
    {/* the carriage */}
    <div style={{ position: "absolute", left: x - px(120), top: y - px(52), width: px(240),
      height: px(52), zIndex: z, borderRadius: px(6),
      background: `linear-gradient(178deg, ${mxh(OXIDE, 0.16)} 0%, ${dkh(OXIDE, 0.48)} 100%)` }} />
    {[-78, 78].map(cx => (
      <div key={"wl" + cx} style={{ position: "absolute", left: x + cx - px(46), top: y - px(46),
        width: px(92), height: px(92), borderRadius: "50%", zIndex: z - 1,
        border: `${px(13)}px solid ${dkh(OXIDE, 0.40)}`, background: dkh(OXIDE, 0.16) }}>
        {[0, 60, 120].map(a => (
          <div key={a} style={{ position: "absolute", left: px(31), top: 0, width: px(5),
            height: px(66), background: dkh(OXIDE, 0.50), transformOrigin: `50% ${px(33)}px`,
            transform: `rotate(${a}deg)` }} />
        ))}
      </div>
    ))}
    {/* the barrel — tapered, which is what makes it a cannon */}
    <div style={{ position: "absolute", left: x - px(40) + kick * px(26), top: y - px(232),
      width: px(150), height: px(196), zIndex: z + 2, transformOrigin: "20% 90%",
      transform: `rotate(-34deg) translateX(${kick * px(20)}px)` }}>
      <svg width={px(150)} height={px(196)} viewBox="0 0 75 98">
        <defs>
          <linearGradient id="cnB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={dkh(BRASS, 0.52)} />
            <stop offset="42%" stopColor={mxh(BRASS, 0.20)} />
            <stop offset="100%" stopColor={dkh(BRASS, 0.56)} />
          </linearGradient>
        </defs>
        <path d="M22 96 L53 96 L60 22 L15 22 Z" fill="url(#cnB)"
          stroke={dkh(BRASS, 0.58)} strokeWidth="2.4" />
        <ellipse cx="37.5" cy="22" rx="22.5" ry="7" fill={dkh(INK, 0.06)}
          stroke={dkh(BRASS, 0.58)} strokeWidth="2.4" />
        <rect x="14" y="40" width="47" height="7" fill={dkh(BRASS, 0.46)} />
        <rect x="16" y="70" width="43" height="7" fill={dkh(BRASS, 0.46)} />
        <path d="M26 92 C24 60 26 40 28 26" stroke={hexa("#FFFFFF", 0.26)} strokeWidth="4"
          fill="none" strokeLinecap="round" />
      </svg>
    </div>
  </>);
};

/* =========================================================================
   THE FIVE CANDIDATES
   ====================================================================== */
type HP = { dur: number;
  /** per-cut levers, passed IN so this file never imports UnlazyScenes.
      ⛔ RAKE PHASE IS MODULO THE BAND PITCH — see [[feedback_rake_phase_is_modulo_pitch]]. */
  rakeX?: number; rakeK?: number; parX?: number };
const bay = () => asPlace("bench");

const Backing: React.FC<{ f: number; lampX?: number; rakeX?: number; rakeK?: number;
  parX?: number }> = ({ f, lampX = 506, rakeX = 0, rakeK = 1, parX = 0 }) => {
  const p = bay();
  return (<>
    <Hall p={p} f={f} dx={parX} overhead="none" bands={1} kind="shutter" rake={0.20}
      rakeX={rakeX} rakeRate={2.6 * rakeK} lamp={{ x: lampX, y: 176, r: 400 }} grit={0.7} />
    <ToolWall p={p} f={f} x={-30} y={118} cols={10} rows={1} z={16} o={0.48} />
  </>);
};

/* 1 · TROPHY — polished. It hoists the award, and the award buckles. */
export const HookTrophy: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = bay();
  /* ⛔ v3 hoisted the cup to y=452 while the 434px sprite's head is at 372, so
     the plaque sat straight across its eyes. A mascot's arms are SHORT — it
     cannot hold anything overhead — so the trophy is presented at CHEST height
     with the bowl clear above the head, which is also how a person actually
     holds one up. */
  const RAISE = 4, TOP = 22, CRUSH = 46;
  const SZ = 434, HX = 506, HY = 806, TY = 566;
  const lift = E(f, RAISE, TOP, 0, 1, OUT);
  const crush = E(f, CRUSH, CRUSH + 14, 0, 1, IN_Q);
  const jolt = f >= CRUSH ? Math.sin((f - CRUSH) / 2.3) * Math.exp(-(f - CRUSH) / 8) * 12 : 0;
  const ty = TY + (1 - lift) * 150 + jolt;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.52} glow={hexa(p.key, 0.22)}>
      <Backing f={f} />
      <Pool x={506} y={748} w={880} c={p.key} o={0.30} hh={150} z={18} />
      <Hero f={f} x={HX} y={HY + jolt} size={SZ} z={54} costume={{ constr: 1 }}
        strain={0.28 + lift * 0.44 - crush * 0.55} act={1} ph={0.4}
        cheer={f > TOP && f < CRUSH ? 1 : 0} stern={crush > 0.3 ? 1 : 0}
        shock={f >= CRUSH && f < CRUSH + 22 ? 1 : 0} />
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 62,
        transform: `translateY(${(1 - lift) * 150 + jolt}px)` }}>
        <Trophy x={506} y={TY} f={f} s={0.96} z={62} crush={crush} />
      </div>
      {/* ⭐ both grips start on the mascot's real arm rects and close on the plinth */}
      {/* ⛔ the mitts must close on the PLINTH, not the plaque: at ty-26 they
          covered the "14." of 14.8% and the receipt read ".8%". */}
      <Grip from={armPt(HX, HY + jolt, SZ, -1)} to={[402, ty - 2]} size={SZ} z={64} />
      <Grip from={armPt(HX, HY + jolt, SZ, 1)} to={[610, ty - 2]} size={SZ} z={64} />
      <Ring x={506} y={250} f={f} at={TOP} c={GOLD} s={1.5} z={76} dur={20} />
      <Ring x={506} y={330} f={f} at={CRUSH} c={RED} s={1.7} z={78} dur={24} />
      <Puff x={506} y={392} f={f} at={CRUSH} c="#C7BCA6" n={12} s={1.2} z={72} />
      <Edge side="l" c={dkh(p.lip, 0.20)} kind="post" z={93} top={140} />
      <Mark x={826} y={190} s={130} z={90} />
    </Scene>
  );
};

/* 2 · FLAG — it plants the flag at the bottom of the hill. */
export const HookFlag: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = bay();
  const PLANT = 20, PULL = 44;
  const SZ = 404, HX = 300, HY = 792;
  const drive = E(f, 6, PLANT, 0, 1, IN_Q);
  const planted = f >= PLANT;
  const jolt = planted ? Math.sin((f - PLANT) / 2.2) * Math.exp(-(f - PLANT) / 7) * 10 : 0;
  const wave = planted ? Math.sin(f / 5.5) * 5 : 0;
  const reveal = E(f, PULL, PULL + 20, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.50} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={0} overhead="none" bands={0} kind="shutter" rake={0.16}
        rakeRate={2.4} lamp={{ x: 430, y: 160, r: 420 }} grit={0.5} />
      {/* ⛔ THE GAG IS A SILHOUETTE COMPARISON: a molehill in front, the real
          mountain behind it, and the route up it still unwalked. */}
      <Massif f={f} z={20} lit={p.key} />
      <Pool x={330} y={764} w={620} c={p.key} o={0.26} hh={130} z={22} />
      {/* the molehill it actually stands on */}
      <div style={{ position: "absolute", left: 168, top: 740, width: 340, height: 62, zIndex: 30,
        borderRadius: "50% 50% 0 0",
        background: `linear-gradient(178deg, ${mxh("#A89268", 0.24)} 0%, ${dkh("#A89268", 0.34)} 100%)` }} />
      {/* the flag */}
      <div style={{ position: "absolute", left: 452, top: 300 + (planted ? 0 : 120) + jolt,
        width: 16, height: 448, zIndex: 56,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.52)} 0%, ${mxh(STEEL, 0.20)} 46%, ${dkh(STEEL, 0.56)} 100%)` }} />
      <svg width={260} height={170} viewBox="0 0 130 85" style={{ position: "absolute",
        left: 462, top: 306 + (planted ? 0 : 120) + jolt, zIndex: 57, overflow: "visible" }}>
        <path d={`M0 4 Q40 ${-2 + wave} 78 6 Q108 12 128 4 L128 60 Q108 68 78 62 Q40 54 0 62 Z`}
          fill={`url(#fg)`} stroke={dkh(CLAYD, 0.34)} strokeWidth="2" />
        <defs>
          <linearGradient id="fg" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor={mxh(CLAY, 0.22)} />
            <stop offset="100%" stopColor={dkh(CLAY, 0.26)} />
          </linearGradient>
        </defs>
        <text x="18" y="42" fontSize="30" fontWeight="900" fill={PAPER}
          style={{ fontFamily: "Inter, sans-serif", letterSpacing: 2 }}>DONE</text>
      </svg>
      <Hero f={f} x={HX} y={HY + jolt} size={SZ} z={54} costume={{ constr: 1 }}
        drive={drive * 0.12} strain={f < PLANT ? 0.65 : 0.18} act={2} ph={0.4}
        cheer={planted && f < PULL ? 1 : 0} stern={reveal > 0.4 ? 1 : 0}
        shock={f >= PULL + 4 && f < PULL + 24 ? 1 : 0} />
      <Grip from={armPt(HX, HY + jolt, SZ, 1)} to={[452, 560 + jolt]} size={SZ} z={64} />
      {/* the measure that lands late: how far it actually got */}
      {reveal > 0 && (
        <div style={{ position: "absolute", left: 168, top: 690, width: 340 * reveal, height: 10,
          zIndex: 70, background: hexa(RED, 0.88) }}>
          <div style={{ position: "absolute", right: -6, top: -46, ...mono(30, 900),
            color: PAPER, background: hexa(RED, 0.92), padding: "4px 10px",
            opacity: reveal }}>{R.bench.value}</div>
        </div>
      )}
      <Puff x={452} y={772} f={f} at={PLANT} c="#C6BCA8" n={9} s={1} z={68} />
      <Ring x={452} y={766} f={f} at={PLANT} c={p.key} s={1.1} z={70} dur={18} />
      <Edge side="r" c={dkh(p.lip, 0.18)} kind="post" z={93} top={140} />
      <Mark x={840} y={196} s={124} z={90} />
    </Scene>
  );
};

/* 3 · BALLOON — its "done" is hot air, and it pops. */
export const HookBalloon: React.FC<HP> = ({ dur, rakeX = 0, rakeK = 1, parX = 0 }) => {
  const f = useCurrentFrame();
  const p = bay();
  const SZ = 424, HX = 268, HY = 758;
  const STOP = 824;   /* the column's near face, comfortably inboard */

  /* ⭐⭐⭐ THE TAIL IS WHERE THE LINE IS. Alex, on the first cut: *"near the end
     of 3 seconds after the balloon pops, its too boring, not much going on."*
     He was right, and the transcript says exactly why — the VO under those
     frames is **"and lying to you about it"** (f68 / f76 / f85 / f93), the whole
     point of the hook, and the picture under it was a red sprite standing still.

     ⛔ THE FIRST FIX I SIZED WAS IMPOSSIBLE, and only the probe caught it. The
     plan was to topple him so the nose planted in the deck. But at push 1.10 x
     cam.s 1.036 about origin 50%/56%, the visible band bottoms out at scene
     y ~= 730 — **his feet at y=812 are already off-frame**, so a rotation about
     them barely moves anything you can see, and no floor exists to hit. Read the
     frame, not the algebra ([[feedback_render_a_frame_strip]]).

     ⭐ WHAT THE FRAME ACTUALLY OFFERS is the thing already standing in the dead
     zone: the `Edge` post down the right side at scene x 920. So the nose does
     not fall — it RUNS OUT OF ROOM, and the last lie has nowhere to go but
     backwards through him:

        f68  "and"       the nose punctures the balloon        POP
        f76  "lying"     lurch 3, the nose crosses the frame
        f85  "to you"    lurch 4 — the tip STRIKES THE POST
        f93  "about it"  it cannot grow forward, so it shoves HIM back 90px,
                         the shaft bows under the load and the post shudders

     Every beat is a word, the growth never stops (the joke: being caught does
     not end the lie), and the final image is a Claude wedged into the corner of
     his own frame by a nose that no longer fits in the room. */
  const A = 42, B = 54;               /* "skipping" 41 · "your tasks" 50 */
  const POP = 68;                     /* "and" 68 */
  const C = 76;                       /* "lying" 76 */
  const D = 85, HIT = 90;             /* "to" 85 / "you" 91 */
  const J0 = 93, J1 = 105;            /* "about" 93 · "it." 98 */

  /* ⭐ the jam is ONE number driving TWO things, which is what pins the tip:
     the nose gains JAM/sx of length while the body loses JAM of x. */
  const STRAIN_B = 0.62;
  const SX_B = 1 + STRAIN_B * 0.12;   /* Hero scales x by this; the nose is inside it */
  const JAM = 66;

  /* ⭐ THE MIDDLE WAS THE HOLE. First cut measured LIES at 4.93 / 55% holding —
     dead centre of the hook — because both lies in that window happened BEHIND
     a 500px balloon (nose z 54, balloon z 60) and the pumping stopped the
     moment they started. So: he never stops pumping, each lie is a DISCRETE
     STROKE that swells the balloon AND judders it AND extrudes the nose, and
     the hero moves in front of the balloon so the nose is the thing you watch
     cross it. One cause, four visible effects. */
  const stroke = (at: number, v: number) => E(f, at, at + 6, 0, v, BACK);
  const pump = stroke(6, 0.19) + stroke(14, 0.18) + stroke(22, 0.17) + stroke(30, 0.16)
             + stroke(A, 0.15) + stroke(B, 0.15);
  const stomp = Math.abs(Math.sin(f / 4.2)) * (f < POP ? 1 : 0);
  /* the balloon judders on each stroke — a 500px object squashing repaints more
     of the panel than anything else in the shot */
  const jud = [6, 14, 22, 30, A, B].reduce((a, at) =>
    a + (f >= at ? Math.sin((f - at) / 1.35) * Math.exp(-(f - at) / 5.5) * 0.075 : 0), 0);
  const jam = E(f, J0, J1, 0, 1, OUT);
  /* sized off STOP: tip_x = HX + (len - th*0.34) * sx, and sx is the hero's own
     strain stretch, so the arithmetic has to include it or the strike misses. */
  const grow = E(f, A, A + 7, 0, 78, BACK) + E(f, B, B + 7, 0, 86, BACK)
             + E(f, C, C + 8, 0, 170, BACK) + E(f, D, D + 7, 0, 138, BACK)
             + (JAM / SX_B) * jam;
  const slide = JAM * jam;
  const HXn = HX - slide;

  const dent = f >= B + 3 && f < POP ? E(f, B + 3, POP, 0, 2.4, IO) : 0;
  const pop = E(f, POP, POP + 8, 0, 1, OUT);
  const kick = f >= POP ? Math.sin((f - POP) / 2.2) * Math.exp(-(f - POP) / 7) * 12 : 0;

  const strain = f < POP ? 0.34 + stomp * 0.26
    : 0.40 + E(f, POP, 84, 0, STRAIN_B - 0.40, IO);
  const sxB = 1 + strain * 0.12, syB = 1 - strain * 0.16;
  /* where the nose leaves the face, AFTER the hero's own squash — the FX have
     to be placed off this, not off HY, or they sit 35px high under load. */
  const faceY = HY + kick + strain * SZ * 0.05 - SZ * 0.505 * syB;

  /* ⭐ HE GETS CAUGHT AND GOES RED. A slow flush through the lies, then it slams
     on the pop and holds. `Mascot` uses `tint` as a raw fill, so a colour ramp
     is safe — ⛔ and this is a CHARACTER STATE on one sprite, not the banned
     trick of recolouring every Claude through a grade filter (reel 115). */
  const heat = Math.min(1, E(f, A, C, 0, 0.42, IO) + E(f, POP, POP + 8, 0, 0.72, OUT));
  const skin = flush(heat);
  /* the steam is a KETTLE, not a hose — it VENTS on each lie and on the jam */
  const spike = (at: number) => (f >= at ? 0.60 * Math.exp(-(f - at) / 7) : 0);
  const vent = Math.max(0, (heat - 0.45) / 0.55) + spike(C) + spike(D) + spike(J0);
  /* the load the shaft is carrying once the tip has nowhere to go */
  const load = E(f, HIT, HIT + 6, 0, 0.22, OUT) + jam * 0.88;
  const shud = f >= HIT ? Math.sin((f - HIT) / 1.5) * Math.exp(-(f - HIT) / 7) * 11 : 0;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.34} glow={hexa(p.key, 0.22)}>
      <Backing f={f} lampX={660} rakeX={rakeX} rakeK={rakeK} parX={parX} />
      <ShopLight x={452} y={20} f={f} z={26} c={p.key} />
      <Pool x={600} y={730} w={900} c={p.key} o={0.28} hh={140} z={18} />
      <Column x={862} f={f} hit={HIT} z={40} c={p.lip}
        crack={E(f, HIT, HIT + 20, 0, 1, OUT)} />
      <Balloon x={686} y={662} f={f} p={pump} pop={pop} s={1} z={44} dent={dent} wob={jud} popAt={POP} />
      {/* the foot pump: a real bellows, a hose, and both ends on something */}
      <div style={{ position: "absolute", left: 404, top: 690 - stomp * 18, width: 186,
        height: 38, zIndex: 52, borderRadius: 7,
        background: `linear-gradient(178deg, ${mxh(SLATE, 0.34)} 0%, ${dkh(SLATE, 0.48)} 100%)` }} />
      <div style={{ position: "absolute", left: 418, top: 722 - stomp * 6, width: 158,
        height: 30 + stomp * 12, zIndex: 51,
        background: `repeating-linear-gradient(180deg, ${dkh(SLATE, 0.44)} 0 6px, ${dkh(SLATE, 0.62)} 6px 12px)` }} />
      <div style={{ position: "absolute", left: 404, top: 746, width: 186, height: 20, zIndex: 51,
        background: dkh(SLATE, 0.60), borderRadius: 5 }} />
      <svg width={300} height={150} viewBox="0 0 150 75" style={{ position: "absolute", left: 500,
        top: 646, zIndex: 50, overflow: "visible" }}>
        <path d="M4 72 C46 72 66 36 104 26 L146 16" fill="none" stroke={dkh(OXIDE, 0.32)}
          strokeWidth="9" strokeLinecap="round" />
      </svg>

      <HangTool x={556} y={214} f={f} hit={HIT} kind="wrench" s={0.86} amp={27} ph={0.0} z={22} />
      <HangTool x={702} y={226} f={f} hit={HIT} kind="mallet" s={0.78} amp={34} ph={1.9} z={22} />
      <Hero f={f + 40} x={HXn} y={HY + kick} size={SZ} z={62} costume={{ constr: 1 }}
        strain={strain} act={1} ph={0.4}
        cheer={(f >= 34 && f < A) || (f >= A + 6 && f < B) ? 1 : 0}
        stern={f >= C ? 1 : 0}
        shock={(f >= POP && f < POP + 16) || (f >= HIT && f < HIT + 12) ? 1 : 0}
        tint={skin}
        face={<>
          <PinocchioNose size={SZ} grow={grow} z={6} skin={skin} load={load} />
          {/* ⛔ THE STEAM RIDES INSIDE THE TRANSFORM TOO — same mistake the nose
              made: anything attached to the character has to be in its div, or
              it hangs in space while he rocks. */}
          <EarSteam size={SZ} f={f} on={vent} z={4} />
        </>} />
      {/* he lets go of the pump the instant it bursts */}
      {f < POP + 4 && (
        <Grip from={armPt(HXn, HY + kick, SZ, 1)} to={[418, 694 - stomp * 18]} size={SZ} z={64} />
      )}

      {/* wood dust out of the socket on every lie — the nose is being EXTRUDED */}
      {[A, B, C, D].map((at, i) => (
        <Puff key={"nl" + i} x={HXn + SZ * 0.10} y={faceY + SZ * 0.05} f={f} at={at}
          c="#C7BCA6" n={5 + i} s={0.5 + i * 0.10} z={68} />
      ))}
      {/* the two hard ear-bursts on the pop itself */}
      {[-1, 1].map(sg => (
        <Puff key={"ear" + sg} x={HXn + sg * SZ * 0.44} y={HY + kick - SZ * 0.60} f={f}
          at={POP + 2} c="#EFE7DA" n={7} s={0.75} z={70} up={70} />
      ))}
      <Ring x={686} y={560} f={f} at={POP} c={GREEN} s={1.5} z={78} dur={13} />
      <Puff x={686} y={600} f={f} at={POP} c="#BFD3C4" n={14} s={1.3} z={74} />
      {/* the scrap of rubber left hanging off the hose */}
      {pop > 0.5 && (
        <div style={{ position: "absolute", left: 668, top: 706, width: 52, height: 26, zIndex: 62,
          borderRadius: "60% 40% 30% 30%", background: dkh(GREEN, 0.36),
          transform: `rotate(${(pop - 0.5) * 120}deg)` }} />
      )}

      {/* ---- THE STRIKE: splinters off the post, then dust as it grinds in ---- */}
      {f >= HIT && f < HIT + 26 && Array.from({ length: 11 }, (_, i) => {
        const t = (f - HIT) / 26;
        const ang = 152 + (rnd(i, 5) - 0.5) * 156;
        const sp = 250 + rnd(i, 9) * 320;
        const rad = ang * Math.PI / 180;
        const dx = Math.cos(rad) * sp * t;
        const dy = Math.sin(rad) * sp * t * 0.7 + 540 * t * t;
        const ln = 16 + rnd(i, 13) * 32, tk = 5 + rnd(i, 17) * 6;
        return (
          <div key={"cp" + i} style={{ position: "absolute", left: STOP - 16 + dx,
            top: faceY + dy - tk / 2, width: ln, height: tk, borderRadius: 2, zIndex: 90,
            opacity: 1 - t * 0.75, transform: `rotate(${ang + t * 620}deg)`,
            background: i % 2 ? WOOD : WOOD_D }} />
        );
      })}
      <Ring x={STOP - 14} y={faceY} f={f} at={HIT} c="#E4DACB" s={1.15} z={89} dur={18} />
      <Puff x={STOP - 18} y={faceY} f={f} at={HIT} c="#C7BCA6" n={12} s={1.0} z={88} />
      {jam > 0.05 && <Puff x={STOP - 18} y={faceY + 10} f={f} at={J0 + 4} c="#CFC4AE" n={8} s={0.8} z={88} />}

      <Drums x={604} z={84} c={p.lip} />
      <Edge side="r" c={dkh(p.lip, 0.44)} kind="post" z={93} top={140} />
      {/* ⭐ THE RECEIPT + THE FRAME-0 CLAIM PLATE, one object. The old S0 hung
          `R.bench` on a WallSign; a hook that drops it loses the only measured
          fact backing "the rumors are true", and `look_audit` was warning
          HOOK_PLATE 12.1% with nothing but the bare starburst at frame 0.
          [[feedback_frame0_claim_plate]] is the single measured IG-performance
          rule in the repo, so the plate is not optional. */}
      <SpecPlate x={430} y={324} w={452} s={0.88} z={28}
        big={R.bench.value} label={R.bench.label} src={R.bench.src} />
    </Scene>
  );
};

/** ⭐ THE ROOM TAKES THE HIT. When the nose strikes the post, the shock has to
    land somewhere other than the post, or the strike reads as a drawing overlap.
    These hang in the one part of the frame the popped balloon leaves empty — the
    upper-right tile wall — so the beat that fixes the STORY also fixes the
    COMPOSITION. ⛔ Real drawing, not primitives: the wrench has a fixed jaw, a
    knurled adjuster, a slider and teeth; the mallet has end grain, a chamfer and
    a bound handle ([[feedback_props_need_real_drawing]]). */
const HangTool: React.FC<{ x: number; y: number; f: number; hit: number; kind: "wrench" | "mallet";
  s?: number; amp?: number; ph?: number; z?: number }> =
  ({ x, y, f, hit, kind, s = 1, amp = 24, ph = 0, z = 22 }) => {
  const lf = f - hit;
  const swing = Math.sin(f / 34 + ph) * 1.6
    + (lf >= 0 ? Math.sin(lf / 2.7 + ph * 0.4) * Math.exp(-lf / 13) * amp : 0);
  const W = 150 * s, Hh = 300 * s;
  return (<>
    {/* the peg it hangs on — fixed to the wall, so it does NOT swing */}
    <div style={{ position: "absolute", left: x - 9 * s, top: y + 2 * s, width: 18 * s,
      height: 15 * s, zIndex: z + 1, borderRadius: 4,
      background: `linear-gradient(150deg, ${mxh(SLATE, 0.22)} 0%, ${dkh(SLATE, 0.52)} 100%)` }} />
    <div style={{ position: "absolute", left: x - 15 * s, top: y - 5 * s, width: 30 * s,
      height: 9 * s, zIndex: z - 1, borderRadius: 3, background: dkh(SLATE, 0.58), opacity: 0.55 }} />
    <div style={{ position: "absolute", left: x - W / 2, top: y, width: W, height: Hh,
      zIndex: z, transformOrigin: "50% 6%", transform: `rotate(${swing}deg)` }}>
      <svg width={W} height={Hh} viewBox="0 0 150 300" style={{ overflow: "visible" }}>
        {kind === "wrench" ? (<>
          {/* handle */}
          <path d="M66 26 L84 26 L88 214 L62 214 Z" fill={dkh(SLATE, 0.16)}
            stroke={dkh(SLATE, 0.46)} strokeWidth="3" />
          <path d="M70 34 L77 34 L79 206 L71 206 Z" fill={mxh(SLATE, 0.30)} opacity="0.7" />
          {/* the knurled adjuster */}
          <rect x="58" y="120" width="34" height="52" rx="5" fill={dkh(SLATE, 0.34)}
            stroke={dkh(SLATE, 0.56)} strokeWidth="2" />
          {Array.from({ length: 6 }, (_, i) => (
            <line key={i} x1="60" y1={126 + i * 8} x2="90" y2={126 + i * 8}
              stroke={dkh(SLATE, 0.62)} strokeWidth="2.4" />
          ))}
          {/* fixed jaw + slider, with teeth */}
          <path d="M52 206 L98 206 L104 238 L124 238 L124 262 L86 262 L82 232 L52 232 Z"
            fill={mxh(SLATE, 0.14)} stroke={dkh(SLATE, 0.50)} strokeWidth="3" />
          <path d="M30 236 L58 236 L58 268 L24 268 Z" fill={dkh(SLATE, 0.22)}
            stroke={dkh(SLATE, 0.52)} strokeWidth="3" />
          {Array.from({ length: 4 }, (_, i) => (
            <line key={"t" + i} x1={34 + i * 7} y1="238" x2={34 + i * 7} y2="250"
              stroke={dkh(SLATE, 0.60)} strokeWidth="2.2" />
          ))}
          <circle cx="75" cy="20" r="11" fill="none" stroke={dkh(SLATE, 0.50)} strokeWidth="6" />
        </>) : (<>
          {/* mallet: bound handle, chamfered head, visible end grain */}
          <path d="M69 22 L81 22 L84 176 L66 176 Z" fill={mxh(OXIDE, 0.10)}
            stroke={dkh(OXIDE, 0.44)} strokeWidth="3" />
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1="67" y1={92 + i * 11} x2="83" y2={92 + i * 11}
              stroke={dkh(OXIDE, 0.50)} strokeWidth="4" opacity="0.75" />
          ))}
          <path d="M26 178 L124 178 L134 200 L134 246 L124 268 L26 268 L16 246 L16 200 Z"
            fill={mxh(WOOD, 0.06)} stroke={dkh(WOOD, 0.46)} strokeWidth="3.4" />
          <path d="M26 178 L124 178 L134 200 L16 200 Z" fill={mxh(WOOD, 0.30)} opacity="0.6" />
          <ellipse cx="132" cy="223" rx="7" ry="23" fill={mxh(WOOD, 0.24)}
            stroke={dkh(WOOD, 0.44)} strokeWidth="2" />
          <ellipse cx="132" cy="223" rx="3" ry="12" fill="none" stroke={dkh(WOOD, 0.36)} strokeWidth="1.6" />
          <line x1="40" y1="212" x2="40" y2="256" stroke={dkh(WOOD, 0.34)} strokeWidth="3" opacity="0.5" />
          <circle cx="75" cy="18" r="10" fill="none" stroke={dkh(OXIDE, 0.44)} strokeWidth="6" />
        </>)}
      </svg>
    </div>
  </>);
};

/** ⭐ THE STOP THE NOSE ACTUALLY HITS. The first version pinned the tip on the
    house `Edge` post — and the probe showed why that fails: `Edge` sits at
    `right: 52` in SCENE coords, so at push 1.10 x cam.s 1.036 it lands at panel
    x 978 of 1012 and is all but clipped by the frame's own rounded corner. The
    strike was happening 34px from the edge of the picture and read as the nose
    simply leaving frame ([[feedback_the_crop_bound_includes_cam]] again, this
    time on a prop I did not author). So the stop is a real column standing
    INBOARD at scene x 824-900, drawn as an I-beam with a base plate, bolts and
    a painted kerb stripe. */
const Column: React.FC<{ x: number; f: number; hit: number; z?: number; c: string;
  crack?: number }> = ({ x, f, hit, z = 40, c, crack = 0 }) => {
  const lf = f - hit;
  const sh = lf >= 0 ? Math.sin(lf / 1.5) * Math.exp(-lf / 8) * 9 : 0;
  const W = 76;
  return (
    <div style={{ position: "absolute", left: x - W / 2 + sh, top: 168, width: W, height: 660,
      zIndex: z }}>
      {/* the two flanges and the web between them */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(90deg, ${dkh(c, 0.72)} 0%, ${mxh(c, 0.10)} 24%, ${dkh(c, 0.16)} 54%, ${dkh(c, 0.68)} 100%)`,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 21, top: 0, width: 34, bottom: 0,
        background: dkh(c, 0.56) }} />
      <div style={{ position: "absolute", left: 25, top: 0, width: 7, bottom: 0,
        background: mxh(c, 0.22), opacity: 0.6 }} />
      {/* bolt rows down the web */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"b" + i} style={{ position: "absolute", left: 30, top: 44 + i * 74, width: 16,
          height: 16, borderRadius: "50%", background: dkh(c, 0.54),
          boxShadow: `inset 0 2px 0 ${mxh(c, 0.30)}` }} />
      ))}
      {/* the painted kerb stripe, chipped */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 430, height: 62,
        background: `repeating-linear-gradient(128deg, ${SODIUM} 0 16px, ${dkh(INK, 0.10)} 16px 32px)`,
        opacity: 0.82 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 430, height: 5, background: dkh(c, 0.52) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 487, height: 5, background: dkh(c, 0.52) }} />
      {/* base plate */}
      <div style={{ position: "absolute", left: -22, right: -22, bottom: 0, height: 34,
        background: `linear-gradient(178deg, ${mxh(c, 0.12)} 0%, ${dkh(c, 0.50)} 100%)`, borderRadius: 3 }} />
      {/* the split it takes, on the face the nose is driving into */}
      {crack > 0.01 && (
        <svg width={W} height={230} viewBox="0 0 76 230" style={{ position: "absolute",
          left: 0, top: 150, overflow: "hidden" }}>
          {[0, 1, 2].map(i => (
            <polyline key={i}
              points={[0, 1, 2, 3, 4].map(k => `${11 + i * 15 + (k % 2 ? 7 : -6)},${k * 57}`).join(" ")}
              fill="none" stroke={dkh(c, 0.70)} strokeWidth={6 - i * 1.3} strokeLinecap="round"
              strokeDasharray="300" strokeDashoffset={300 * (1 - Math.max(0, crack - i * 0.16))} />
          ))}
        </svg>
      )}
    </div>
  );
};

/** ⭐ THE RECEIPT, BUILT BRIGHT. The house `WallSign` carries the same three
    fields, but measured against the bone wall it replaces it is **39 luma
    darker** — a 9px slate border, a 26px hazard head and a 34px dark footer on
    a 181px plate — and dropping it into frame 0 took the reel's HOOK_LUMA from
    140.6 to 137.5, under THE-OPEN's >=140 law. Same information, same plant
    signage read (hazard head, bolts, the mark), built out of a near-white field
    with the furniture on a diet, so it ADDS light instead of eating it. */
const SpecPlate: React.FC<{ x: number; y: number; w: number; s?: number; z?: number;
  big: string; label: string; src?: string }> =
  ({ x, y, w: ww, s = 1, z = 28, big, label, src }) => {
  const hh = ww * 0.50;
  return (
    <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y - hh * s, width: ww * s,
      height: hh * s, zIndex: z, borderRadius: 4 * s,
      background: `linear-gradient(166deg, #FDFAF2 0%, #F2E9D6 100%)`,
      border: `${4 * s}px solid ${mxh(SLATE, 0.30)}`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 15 * s,
        background: `repeating-linear-gradient(45deg, ${SODIUM} 0 ${13 * s}px, ${mxh(INK, 0.62)} ${13 * s}px ${26 * s}px)` }} />
      {[[12, 34], [ww - 34, 34], [12, hh - 52], [ww - 34, hh - 52]].map(([bx, by], i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: bx * s, top: by * s, width: 17 * s,
          height: 17 * s, borderRadius: "50%", background: mxh(STEEL, 0.34),
          border: `${3 * s}px solid ${dkh(STEEL, 0.40)}` }} />
      ))}
      <div style={{ position: "absolute", left: 42 * s, top: 40 * s, right: 156 * s }}>
        <div style={{ ...ui(Math.round(96 * s), 900), color: INK, letterSpacing: -3,
          fontFamily: "Fraunces, Georgia, serif", lineHeight: 0.94 }}>{big}</div>
        <div style={{ ...mono(Math.round(17 * s), 800), color: dkh(MUTE, 0.34),
          marginTop: 9 * s, letterSpacing: 0.4, lineHeight: 1.25 }}>{label}</div>
      </div>
      {src && <div style={{ position: "absolute", right: 40 * s, bottom: 9 * s,
        ...mono(Math.round(15 * s), 700), color: dkh(MUTE, 0.10) }}>{src}</div>}
      <Mark x={ww * s - 158 * s} y={40 * s} s={108 * s} z={z + 4} />
    </div>
  );
};

/** ⭐ A HUNG WORKLIGHT — the bay's practical, drawn rather than implied. It is
    also the only bright mass in the upper half, which is what carries frame 0
    over the >=140 luma law once the dark foreground goes in. */
const ShopLight: React.FC<{ x: number; y: number; f: number; z?: number; c: string }> =
  ({ x, y, f, z = 26, c }) => {
  const sway = Math.sin(f / 41) * 1.1;
  return (
    <div style={{ position: "absolute", left: x - 130, top: y, width: 260, height: 430,
      zIndex: z, transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }}>
      <div style={{ position: "absolute", left: 126, top: 0, width: 8, height: 96,
        background: dkh(SLATE, 0.52) }} />
      {/* the reflector shade */}
      <svg width={260} height={150} viewBox="0 0 260 150" style={{ position: "absolute",
        left: 0, top: 88, overflow: "visible" }}>
        <path d="M130 6 L214 108 Q130 138 46 108 Z" fill={mxh(BRASS, 0.10)}
          stroke={dkh(BRASS, 0.46)} strokeWidth="4" />
        <path d="M130 6 L166 108 Q130 120 94 108 Z" fill={mxh(BRASS, 0.42)} opacity="0.55" />
        <ellipse cx="130" cy="112" rx="84" ry="19" fill={mxh(SODIUM, 0.62)} />
        <ellipse cx="130" cy="116" rx="27" ry="15" fill="#FFF6DC" />
      </svg>
      {/* the cone it throws */}
      <div style={{ position: "absolute", left: -30, top: 200, width: 320, height: 300,
        clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa("#FFEFC6", 0.72)} 0%, ${hexa("#FFEFC6", 0.02)} 100%)` }} />
      <div style={{ position: "absolute", left: -100, top: 10, width: 460, height: 460,
        borderRadius: "50%",
        background: `radial-gradient(50% 50% at 50% 34%, ${hexa(c, 0.44)} 0%, ${hexa(c, 0)} 100%)` }} />
    </div>
  );
};

/** ⭐ THE FOREGROUND MASS. `look_audit` reports DEPTH and asks in plain words
    whether there is "a mass cropped by the panel edge, in front of the action" —
    ten reels shipped without one. These drums sit nearest camera, are cropped by
    the panel floor, and are the frame's only real BLACK, which is the other half
    of what the audit was failing on (p10 49.1 against a bar of 35). */
const Drums: React.FC<{ x: number; z?: number; c: string }> = ({ x, z = 84, c }) => (
  <div style={{ position: "absolute", left: x, top: 682, width: 380, height: 170, zIndex: z }}>
    {[[0, 16, 138], [136, 0, 156], [266, 26, 128]].map((d, i) => (
      <div key={i} style={{ position: "absolute", left: d[0], top: d[1], width: d[2], height: 170,
        borderRadius: "12px 12px 4px 4px",
        background: `linear-gradient(90deg, ${dkh(c, 0.66)} 0%, ${dkh(c, 0.42)} 26%, ${dkh(c, 0.56)} 68%, ${dkh(c, 0.70)} 100%)`,
        boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 10, height: 9,
          background: dkh(c, 0.78) }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 56, height: 13,
          background: dkh(c, 0.78) }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 104, height: 12,
          background: dkh(c, 0.78) }} />
        <div style={{ position: "absolute", left: d[2] * 0.22, top: 74, width: d[2] * 0.56,
          height: 44, borderRadius: 3, background: mxh(SODIUM, 0.28),
          border: `4px solid ${dkh(SODIUM, 0.44)}` }} />
      </div>
    ))}
  </div>
);

/* 4 · CANNON — it throws a party over work that failed. */
export const HookCannon: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = bay();
  const FIRE = 24;
  const SZ = 396, HX = 218, HY = 800;
  const kick = f >= FIRE ? Math.exp(-(f - FIRE) / 6) : 0;
  const t = f >= FIRE ? (f - FIRE) / 60 : 0;
  const N = 26;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.52} glow={hexa(p.key, 0.22)}>
      <Backing f={f} lampX={430} />
      <Pool x={470} y={772} w={900} c={p.key} o={0.28} hh={140} z={18} />
      <Cannon x={452} y={760} f={f} s={1} z={54} kick={kick} />
      <Hero f={f} x={HX} y={HY} size={SZ} z={56} costume={{ constr: 1 }}
        act={2} ph={0.4} cheer={f > FIRE - 6 && f < FIRE + 26 ? 1 : 0}
        strain={f < FIRE ? 0.4 : 0.12}
        shock={f >= FIRE + 22 && f < FIRE + 44 ? 1 : 0} stern={f >= FIRE + 30 ? 1 : 0} />
      <Grip from={armPt(HX, HY, SZ, 1)} to={[356, 706]} size={SZ} z={64} />
      {/* ⛔ WHAT IT FIRES IS THE JOKE: red ✗ tokens, not confetti. */}
      {t > 0 && Array.from({ length: N }, (_, i) => {
        const sp = 0.5 + rnd(i, 7) * 0.9;
        const ang = -46 + (rnd(i, 8) - 0.5) * 44;
        const tt = Math.max(0, t * sp);
        const rad = ang * Math.PI / 180;
        const dx = Math.cos(rad) * 1500 * tt;
        const dy = Math.sin(rad) * 1500 * tt + 1500 * tt * tt;
        const d = 40 + rnd(i, 11) * 26;
        if (600 + dy > 900) return null;
        return (
          <div key={"tk" + i} style={{ position: "absolute", left: 560 + dx, top: 560 + dy,
            width: d, height: d, borderRadius: "50%", zIndex: 70,
            transform: `rotate(${tt * 700 + i * 30}deg)`,
            background: `radial-gradient(46% 42% at 38% 32%, ${mxh(RED, 0.34)} 0%, ${RED} 58%, ${dkh(RED, 0.36)} 100%)`,
            border: `${Math.round(d * 0.10)}px solid ${dkh(RED, 0.48)}`,
            ...ui(Math.round(d * 0.52), 900), color: hexa(PAPER, 0.94), textAlign: "center",
            lineHeight: `${d * 0.86}px` }}>✗</div>
        );
      })}
      <Ring x={620} y={520} f={f} at={FIRE} c={RED} s={1.8} z={76} dur={22} />
      <Puff x={600} y={540} f={f} at={FIRE} c="#C7BCA6" n={12} s={1.25} z={72} />
      <Edge side="r" c={dkh(p.lip, 0.20)} kind="post" z={93} top={140} />
      <Mark x={874} y={196} s={124} z={90} />
    </Scene>
  );
};

/* 5 · PAINT — it sprays a failed part gold so it looks finished. */
export const HookPaint: React.FC<HP> = ({ dur, rakeX = 0, rakeK = 1, parX = 0 }) => {
  const f = useCurrentFrame();
  const p = bay();
  const SPRAY = 8, DONE = 40, RUN = 56;
  const SZ = 402, HX = 214, HY = 802;
  const cover = E(f, SPRAY, DONE, 0, 1, IO);
  const run = E(f, RUN, RUN + 22, 0, 1, IO);
  const shake = f < DONE ? Math.sin(f / 2.4) * 4 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.52} glow={hexa(p.key, 0.22)}>
      <Backing f={f} lampX={660} rakeX={rakeX} rakeK={rakeK} parX={parX} />
      <ShopLight x={452} y={20} f={f} z={26} c={p.key} />
      <Pool x={640} y={790} w={780} c={p.key} o={0.28} hh={140} z={18} />
      {/* the plinth */}
      <div style={{ position: "absolute", left: 452, top: 754, width: 400, height: 42, zIndex: 44,
        borderRadius: 5, background: `linear-gradient(178deg, ${mxh(SLATE, 0.28)} 0%, ${dkh(SLATE, 0.48)} 100%)` }} />
      {/* THE PART — rusted and unfinished underneath, gold on top */}
      <svg width={420} height={330} viewBox="0 0 210 165" style={{ position: "absolute", left: 442,
        top: 434, zIndex: 50, overflow: "visible" }}>
        <defs>
          <linearGradient id="rust" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor={mxh(OXIDE, 0.18)} />
            <stop offset="100%" stopColor={dkh(OXIDE, 0.40)} />
          </linearGradient>
          <linearGradient id="au2" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor={mxh(GOLD, 0.56)} />
            <stop offset="52%" stopColor={GOLD} />
            <stop offset="100%" stopColor={dkh(GOLD, 0.40)} />
          </linearGradient>
          <clipPath id="cv"><rect x="0" y={165 - 165 * cover + run * 165} width="210" height="165" /></clipPath>
        </defs>
        {/* the true state: a rusted, half-machined lump with a bite out of it */}
        <path d="M22 160 L14 74 L52 24 L128 12 L186 46 L196 122 L162 160 Z" fill="url(#rust)"
          stroke={dkh(OXIDE, 0.54)} strokeWidth="3" />
        <path d="M128 12 L112 62 L166 58 Z" fill={dkh(INK, 0.06)} opacity="0.5" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${30 + i * 18} 150 l6 -${16 + (i % 3) * 8}`} stroke={dkh(OXIDE, 0.60)}
            strokeWidth="3" opacity="0.6" />
        ))}
        {/* the gold coat sprayed over it */}
        <g clipPath="url(#cv)">
          <path d="M22 160 L14 74 L52 24 L128 12 L186 46 L196 122 L162 160 Z" fill="url(#au2)"
            stroke={dkh(GOLD, 0.44)} strokeWidth="3" />
          <path d="M40 140 C34 100 44 62 66 40" stroke={hexa("#FFFFFF", 0.32)} strokeWidth="7"
            fill="none" strokeLinecap="round" />
        </g>
      </svg>
      {/* the paint running off the bottom once it starts to fail */}
      {run > 0 && Array.from({ length: 6 }, (_, i) => (
        <div key={"dr" + i} style={{ position: "absolute", left: 500 + i * 58,
          top: 744, width: 16, height: run * (70 + i * 22), zIndex: 52, borderRadius: 8,
          background: `linear-gradient(180deg, ${GOLD} 0%, ${dkh(GOLD, 0.42)} 100%)` }} />
      ))}
      {/* the spray can and its cone */}
      <div style={{ position: "absolute", left: 372 + shake, top: 566, width: 66, height: 156,
        zIndex: 58, borderRadius: 10,
        background: `linear-gradient(90deg, ${dkh(CLAYD, 0.30)} 0%, ${mxh(CLAY, 0.22)} 44%, ${dkh(CLAYD, 0.36)} 100%)`,
        border: `4px solid ${dkh(CLAYD, 0.44)}` }}>
        <div style={{ position: "absolute", left: 18, top: -18, width: 30, height: 20,
          background: dkh(SLATE, 0.40), borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 8, top: 52, right: 8, height: 34,
          background: hexa(PAPER, 0.86), borderRadius: 3 }} />
      </div>
      {f < DONE && (
        <div style={{ position: "absolute", left: 428, top: 540, width: 220, height: 210,
          zIndex: 56, clipPath: "polygon(0 44%, 0 56%, 100% 100%, 100% 0)",
          background: `linear-gradient(90deg, ${hexa(GOLD, 0.52)} 0%, ${hexa(GOLD, 0.06)} 100%)` }} />
      )}
      <Hero f={f} x={HX} y={HY} size={SZ} z={54} costume={{ constr: 1 }}
        strain={f < DONE ? 0.42 : 0.14} act={1} ph={0.4}
        cheer={f > DONE && f < RUN ? 1 : 0}
        shock={f >= RUN + 4 && f < RUN + 24 ? 1 : 0} stern={run > 0.4 ? 1 : 0} />
      <Grip from={armPt(HX, HY, SZ, 1)} to={[392 + shake, 636]} size={SZ} z={64} />
      <Ring x={646} y={600} f={f} at={RUN} c={RED} s={1.6} z={78} dur={24} />
      <Puff x={646} y={760} f={f} at={RUN + 6} c="#C7A98A" n={10} s={1.05} z={74} />
      <Edge side="l" c={dkh(p.lip, 0.20)} kind="post" z={93} top={140} />
      <Mark x={868} y={196} s={124} z={90} />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<HP>> = {
  trophy: HookTrophy,
  flag: HookFlag,
  balloon: HookBalloon,
  cannon: HookCannon,
  paint: HookPaint,
};
