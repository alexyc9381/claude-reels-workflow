import React from "react";
import { Img, staticFile } from "remotion";
import { E, OUT, BACK, IN_Q, hexa, dkh, mxh, squash, G_BLUE, G_RED, G_YEL, G_GRN } from "./BillWorld";

/* ===========================================================================
   REEL 116 — GOOGLE AI CHARACTER DESIGNS.

   Alex: *"i dont like that google character needs to be idk better it just
   looks like a symbol not really a character."* He is right, and the reason is
   structural rather than decorative: the spark-bodied version had ONE mass. A
   character reads as a character when it has a HEAD and a BODY that are
   different shapes, a face placed on the head rather than on the middle of the
   silhouette, and limbs with joints. A star with eyes in it is a logo wearing
   shoes.

   ⛔ None of these restyles the clay Claude. He is untouched; these are a
   separate cast for a reel about someone else's product.

   Every design below shares the house language so they cut against the Claude
   sprites without clashing: flat fill, hard edges, black slit eyes, no mouth,
   stub limbs, one shaded plane for form.
   ========================================================================= */

type CProps = { f: number; x: number; y: number; size: number; i?: number; z?: number;
  at?: number; loop?: number; flip?: boolean; cheer?: number; shock?: number };

/** the shared idle/action rig, so a design is judged on its DRAWING and not on
    whether it happens to have better motion than its neighbour */
/* ⛔⛔⛔ THESE WERE IDLES, NOT ACTION LOOPS. Alex: *"the gemini mascot thing
   doesn't really move or have any interesting motion in the first scenes and
   throughout."* Measured on the old rig at a 280px sprite:

       loop 0  dy 11px   rot  3.6 deg
       loop 1  dy 11px   rot  5 +/- 8 deg
       loop 2  dy 56px   rot  2.6 deg   (one hop every 26 frames)
       loop 3  dy  6px   rot  4.4 deg

   `docs/ANIMATION-QUALITY.md` §11: **an ACTION is a DISTANCE**, and anything
   under about a third of the object's own size is a state change, not an
   action. 6-11px on a 280px body is a twitch. Three of the four loops were
   below the 40px floor entirely, which is why the cast reads as standing still
   however many of them are on screen. [[feedback_make_an_action_read]]

   ⭐ REBUILT ON THREE THINGS THE OLD RIG HAD NONE OF:
     1. DISTANCE — vertical travel is now 0.10-0.34 x size (28-95px at 280).
     2. DEFORMATION — `WEIGHT is DEFORMATION`, so every loop squashes and
        stretches on its own beat instead of translating rigidly.
     3. OVERLAPPING ACTION — the lean leads the bounce and the rotation trails
        it, so the body arrives in parts rather than as one block.
   ⛔ LATERAL travel is deliberately capped at 0.12 x size. The cast sits inside
   a measured x band (see `feedback_the_crop_bound_includes_cam`) with only
   ~10px of margin, and a big dx would walk it straight back off the frame. */
const useRig = (f: number, size: number, i: number, loop?: number, at = 0) => {
  const lf = f - at;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, ch = 0, sx = 1, sy = 1, arm = 1;

  if (L === 0) {
    /* PACE — a step in place, with the weight dropping onto each foot */
    const step = Math.sin(f / 7.5 + ph);
    dx = Math.sin(f / 15 + ph) * size * 0.12;
    dy = -Math.abs(step) * size * 0.13;
    rot = Math.cos(f / 15 + ph) * 7 + step * 3;
    sy = 1 + Math.abs(step) * 0.07;            /* stretch at the top of a step */
    sx = 1 - Math.abs(step) * 0.05;
    arm = 1.5;
  } else if (L === 1) {
    /* WORK — a two-handed haul: dip, pull, recover */
    const t = ((f / 17 + ph) % 1 + 1) % 1;
    const pull = Math.sin(t * Math.PI * 2);
    dy = size * 0.11 * pull;
    rot = 6 + pull * 13;
    sy = 1 - Math.max(0, pull) * 0.12;          /* compress into the pull */
    sx = 1 + Math.max(0, pull) * 0.08;
    arm = 2.4;
  } else if (L === 2) {
    /* HOP — anticipation, launch, land. The only loop that leaves the ground,
       and it now clears 0.34 x size instead of 0.20. */
    const t = ((f / 22 + ph) % 1 + 1) % 1;
    const air = Math.max(0, Math.sin(t * Math.PI * 1.35 - 0.35));
    dy = -air * size * 0.34;
    ch = air > 0.5 ? 1 : 0;
    rot = Math.sin(f / 22 + ph) * 6;
    if (t < 0.12) { sy = 0.86; sx = 1.12; }     /* crouch */
    else if (air > 0.05) { sy = 1 + air * 0.13; sx = 1 - air * 0.09; }
    else { sy = 0.90; sx = 1.08; }              /* land */
    arm = 1.8;
  } else {
    /* LOOK — a lean and a turn, the quiet loop, but still a real move */
    const b = Math.sin(f / 12 + ph);
    dx = Math.sin(f / 21 + ph) * size * 0.10;
    dy = -Math.abs(b) * size * 0.10;
    rot = Math.sin(f / 10.5 + ph) * 9;
    sy = 1 + Math.abs(b) * 0.05;
    arm = 1.2;
  }
  return { lf, inS, sq, dx, dy, rot, ch, ph, L, sx, sy, arm };
};


/** ⛔ `useRig` is called inside a component and cannot be sampled at f-1 to get
    velocity. This is the same maths as a plain function, so the Beaker can ask
    "where was I three frames ago" without breaking the rules of hooks. */
export const useRigPure = (f: number, size: number, i: number, loop?: number, at = 0) => {
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0;
  if (L === 0) { dx = Math.sin(f / 17 + ph) * size * 0.22;
                 dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.04;
                 rot = Math.cos(f / 17 + ph) * 3.6; }
  else if (L === 1) { rot = 5 + Math.sin(f / 6.2 + ph) * 8;
                      dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.04; }
  else if (L === 2) { const t = (f / 26 + ph) % 1; const j = Math.max(0, Math.sin(t * Math.PI));
                      dy = -j * size * 0.20; rot = Math.sin(f / 26 + ph) * 2.6; }
  else { rot = Math.sin(f / 21 + ph) * 4.4; dy = Math.sin(f / 15 + ph) * size * 0.022; }
  return { dx, dy, rot };
};

const Shell: React.FC<{ p: CProps; r: ReturnType<typeof useRig>; children: React.ReactNode }> =
  ({ p, r, children }) => {
  if (r.lf < -2) return null;
  return (
    <div style={{ position: "absolute", left: p.x - p.size / 2 + r.dx, top: p.y - p.size + r.dy,
      width: p.size, height: p.size, zIndex: p.z ?? 60,
      /* ⭐ the deformation is applied HERE — a rig that returns sx/sy and a
          Shell that ignores them is the classic "the effect exists in the code
          but not in the video" fault. */
      transform: `scale(${r.inS * r.sq}) scale(${r.sx}, ${r.sy}) rotate(${r.rot}deg) ${p.flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 100 100" width={p.size} height={p.size} style={{ overflow: "visible" }}>
        {children}
      </svg>
    </div>
  );
};

/** the house face: two black slit eyes, no mouth, a cheek lift when it cheers */
const Face: React.FC<{ cx: number; cy: number; w?: number; gap?: number; shock?: number; cheer?: number }> =
  ({ cx, cy, w = 5, gap = 9, shock = 0, cheer = 0 }) => {
  const h = shock ? 15 : cheer ? 5 : 11;
  return (<>
    <rect x={cx - gap - w / 2} y={cy - h / 2} width={w} height={h} rx={w / 2} fill="#14121A" />
    <rect x={cx + gap - w / 2} y={cy - h / 2} width={w} height={h} rx={w / 2} fill="#14121A" />
    {cheer > 0 && [cx - gap - 5, cx + gap + 5].map((q, j) => (
      <circle key={"ck" + j} cx={q} cy={cy + 8} r={2.8} fill="#FFFFFF" opacity={0.32} />
    ))}
  </>);
};

/* ── 1 · SPARKY — round head, spark tuft, small body. Classic mascot ratio. */
export const Sparky: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  const A = "#5B8DEF", B = "#8B7BF0";
  return (
    <Shell p={p} r={r}>
      <defs><linearGradient id={`sk${p.i}`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor={A} /><stop offset="100%" stopColor={B} /></linearGradient></defs>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={80} width={8} height={19} rx={3.6} fill={dkh(B, 0.18)}
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (7 + r.arm * 8)   /* ⛔ was 3 deg on every loop but PACE */} ${lx + 4} 82)`} />
      ))}
      {[[26, -1], [74, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={62} width={12} height={8} rx={4} fill={dkh(B, 0.10)}
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18 * r.arm)} ${ax} 66)`} />
      ))}
      {/* body — a small rounded torso, clearly separate from the head */}
      <rect x={33} y={56} width={34} height={28} rx={11} fill={dkh(A, 0.10)} />
      <path d="M 33 74 h 34 v 4 a 11 11 0 0 1 -11 6 h -12 a 11 11 0 0 1 -11 -6 z" fill="#000" opacity={0.12} />
      {/* head — the big mass, where the face lives */}
      <ellipse cx={50} cy={38} rx={27} ry={24} fill={`url(#sk${p.i})`} />
      <path d="M 23 40 a 27 24 0 0 0 54 0 a 27 24 0 0 1 -54 0 z" fill="#000" opacity={0.10} />
      {/* the spark, as a tuft growing out of the head */}
      <g transform={`translate(50 8) scale(0.20) translate(-50 -50) rotate(${Math.sin(p.f / 20) * 8} 50 50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#7CC0FF" />
      </g>
      <Face cx={50} cy={38} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 2 · GEMBOT — a faceted gem head on a boxy-round body. */
export const GemBot: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      <defs><linearGradient id={`gm${p.i}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#7DA8FF" /><stop offset="100%" stopColor="#5C6BE8" /></linearGradient></defs>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={3.6} fill="#4A56C4"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (7 + r.arm * 8)   /* ⛔ was 3 deg on every loop but PACE */} ${lx + 4} 84)`} />
      ))}
      {[[24, -1], [76, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={4} fill="#4A56C4"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18 * r.arm)} ${ax} 68)`} />
      ))}
      <rect x={31} y={58} width={38} height={28} rx={9} fill="#5C6BE8" />
      <rect x={31} y={74} width={38} height={12} rx={6} fill="#000" opacity={0.13} />
      {/* the four-colour chest bar — Google, said quietly */}
      {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
        <rect key={"cb" + j} x={38 + j * 6} y={64} width={5} height={5} rx={1.4} fill={c} />
      ))}
      {/* head: a cut gem */}
      <path d="M 50 8 L 76 30 L 66 58 L 34 58 L 24 30 Z" fill={`url(#gm${p.i})`} />
      <path d="M 34 58 L 66 58 L 71 44 L 29 44 Z" fill="#000" opacity={0.12} />
      <path d="M 50 8 L 76 30 L 62 30 Z" fill="#FFFFFF" opacity={0.18} />
      <Face cx={50} cy={36} gap={10} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 3 · BEAKER — the Google Labs flask as a head.
   ⭐ THE RECOMMENDATION, and the reason is not the drawing: this is GOOGLE'S OWN
   OBJECT. The flask is the icon Google Labs actually ships — it is on Mixboard's
   and Pomelli's real product tiles, pulled from gstatic in this same build. The
   repo has burned three reels on `feedback_real_marks_are_the_props`: use the
   subject's own objects, because a shape you invented has to be TRANSLATED
   before it means anything. A gem is a nice shape I drew. The flask is Google's.

   ⭐⭐ AND THE LIQUID IS A STATE. It can fill as tools are found, drain when a
   charge lands, and take each tool's colour. This reel's whole spine is a
   counter going 5 -> 0, so a character that can SHOW a level is a storytelling
   lever the gem does not have.

   ⛔ THE ONE COST, AND IT IS FIXED HERE: a near-white glass head was the
   brightest object in the frame and competed with the cream BILL in the hook —
   the bill has to stay top of the value ladder. The glass is tinted to a cool
   blue-grey, which still reads as glass and sits a stop under the paper.
   ⛔ AND THE TILE CLASH: Mixboard and Pomelli currently show the same beaker.
   They are the GENERIC Labs mark, not distinct product marks, so those two go
   back to name tiles and the flask belongs to the cast alone. */
export const Beaker: React.FC<CProps & { fill?: number; liquid?: string }> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  /* ⛔ tinted, not white: the bill is the brightest thing in this reel */
  const glass = "#DCE6F5", rim = "#C3D2E8";
  const liq = p.liquid ?? "#4C7BEA";
  const lvl = Math.max(0, Math.min(1, p.fill ?? 0.62));
  /* ⛔ THE LIQUID MAY NOT REACH THE FACE. The eyes sit at y=34, so the surface
     is clamped to the flask's lower body: full is 42, empty is 57. */
  const surf = 57 - lvl * 15;

  /* ⭐⭐⭐ WATER PHYSICS, AND THE WHOLE THING IS ONE IDEA: THE SURFACE BELONGS TO
     THE WORLD, NOT TO THE FLASK. Everything a viewer reads as "that is liquid"
     follows from that:

       1. IT STAYS LEVEL. The body rotates; the surface counter-rotates by the
          same angle, so it holds horizontal while the glass tilts around it.
          This is the single tell — a surface that rotates WITH its container is
          drawn liquid, not observed liquid.
       2. IT LAGS. The counter-rotation is damped, so on a fast turn the surface
          arrives a few frames late and overshoots before settling.
       3. IT PILES UP. Horizontal acceleration tilts it the OTHER way — move
          left and it heaps on the right — which is what sells weight.
       4. IT TRAVELS. Two sine waves at different wavelengths and speeds, so the
          surface is a moving wave rather than one bobbing line. A single sine
          reads as a metronome, the same trap the reel's SFX bank has.

     ⛔ AND IT IS CLIPPED TO THE GLASS. The liquid is a big rect that extends
     well past the flask on every side; the flask path is the clip. That is what
     lets the surface rotate freely without ever leaking out of the vessel — the
     alternative, redrawing the liquid's outline to match the flask each frame,
     is where hand-built versions of this go wrong. */
  const V = (fr: number) => {
    /* the rig, sampled — velocity has to be measured, not guessed */
    const g = useRigPure(fr, p.size, p.i ?? 0, p.loop, p.at ?? 0);
    return g;
  };
  const now = V(p.f), was = V(p.f - 1), wasWas = V(p.f - 3);
  const vx = (now.dx - was.dx) / Math.max(1, p.size) * 100;     /* per-100 units */
  const dRot = now.rot - wasWas.rot;
  /* level in world space, minus a lag term, plus the pile-up from acceleration.
     ⛔ CLAMPED. Unbounded, a fast lateral move drove the tilt past 40 degrees and
     the surface swung far enough that the liquid slid out of the visible flask —
     the character looked empty for a few frames. Real liquid in a narrow vessel
     cannot tilt much before it hits the wall, so +-20 degrees is both the fix
     and the truth. */
  const tilt = Math.max(-20, Math.min(20, -now.rot * 0.92 - dRot * 0.55 - vx * 3.4));
  const cid = `bk${p.i}_${Math.round(p.size)}`;
  const FLASK = "M 42 8 h 16 v 14 l 13 26 a 8 8 0 0 1 -7 12 h -28 a 8 8 0 0 1 -7 -12 l 13 -26 z";
  /* the travelling surface: two waves, different wavelength and speed */
  const wave = (x: number) =>
    Math.sin((x + p.f * 1.9) / 9) * 1.5 + Math.sin((x - p.f * 1.1) / 5.5) * 0.8;
  const pts = Array.from({ length: 13 }, (_, i) => {
    const x = 14 + i * 6;
    return `${x} ${surf + wave(x)}`;
  }).join(" L ");
  return (
    <Shell p={p} r={r}>
      <defs>
        <clipPath id={cid}><path d={FLASK} /></clipPath>
      </defs>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={3.6} fill="#3E6BD9"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (7 + r.arm * 8)   /* ⛔ was 3 deg on every loop but PACE */} ${lx + 4} 84)`} />
      ))}
      {[[25, -1], [75, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={4} fill="#3E6BD9"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18 * r.arm)} ${ax} 68)`} />
      ))}
      <rect x={32} y={58} width={36} height={28} rx={10} fill="#4C7BEA" />
      <rect x={32} y={74} width={36} height={12} rx={6} fill="#000" opacity={0.13} />
      {/* the four-colour chest bar — the one thing that says GOOGLE outright */}
      {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
        <rect key={"cb" + j} x={38 + j * 6} y={64} width={5} height={5} rx={1.4} fill={c} />
      ))}
      {/* the flask */}
      <path d={FLASK} fill={glass} />
      {/* ⭐ THE LIQUID — a wide body with a wave for a top edge, rotated about
          its own surface, clipped to the glass */}
      <g clipPath={`url(#${cid})`}>
        <g transform={`rotate(${tilt} 50 ${surf})`}>
          <path d={`M -60 ${surf + 6} L ${pts} L 160 ${surf + 6} L 160 190 L -60 190 Z`}
            fill={liq} opacity={0.92} />
          {/* the surface highlight, so the top edge reads as a meniscus */}
          <path d={`M -60 ${surf + 6} L ${pts}`} fill="none"
            stroke="#FFFFFF" strokeWidth={1.6} opacity={0.34} />
        </g>
        {/* bubbles rising through it, faster when it is being shaken */}
        {[0, 1, 2].map(j => {
          const life = (p.f * (1.1 + j * 0.35) + j * 17) % 26;
          const by = 62 - life;
          if (by < surf + 2) return null;
          return (
            <circle key={"bb" + j} cx={40 + j * 8 + Math.sin(p.f / 7 + j) * 2.4} cy={by}
              r={1.5 + j * 0.5} fill="#FFFFFF" opacity={0.42} />
          );
        })}
      </g>
      <rect x={40} y={5} width={20} height={6} rx={3} fill={rim} />
      {/* the glass reads as glass: one specular streak down the left shoulder */}
      <path d="M 44 12 l -6 22 a 3 3 0 0 0 4 1 l 6 -22 a 3 3 0 0 0 -4 -1 z"
        fill="#FFFFFF" opacity={0.42} />
      <Face cx={50} cy={34} gap={8} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 4 · DOTHEAD — a rounded bot whose visor carries Google's four colours. */
export const DotHead: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={3.6} fill="#C9CEDA"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (7 + r.arm * 8)   /* ⛔ was 3 deg on every loop but PACE */} ${lx + 4} 84)`} />
      ))}
      {[[24, -1], [76, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={4} fill="#C9CEDA"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18 * r.arm)} ${ax} 68)`} />
      ))}
      <rect x={31} y={58} width={38} height={28} rx={10} fill="#EDF0F6" />
      <rect x={31} y={74} width={38} height={12} rx={6} fill="#000" opacity={0.10} />
      {/* head: a rounded capsule with a dark visor */}
      <rect x={24} y={12} width={52} height={44} rx={20} fill="#F7F9FD" />
      <rect x={24} y={40} width={52} height={16} rx={8} fill="#000" opacity={0.08} />
      <rect x={30} y={24} width={40} height={20} rx={10} fill="#1B1E28" />
      {/* the four dots ON the visor, which is where the eyes would be */}
      {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
        <circle key={"d" + j} cx={37 + j * 8.6} cy={34} r={p.shock ? 4.2 : 3.2} fill={c}
          opacity={0.55 + 0.45 * Math.abs(Math.sin(p.f / 10 + j * 0.9))} />
      ))}
      {/* an antenna with a spark on it */}
      <rect x={48.5} y={2} width={3} height={11} rx={1.5} fill="#C9CEDA" />
      <g transform={`translate(50 1) scale(0.13) translate(-50 -50) rotate(${(p.f * 2) % 360} 50 50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#5B8DEF" />
      </g>
    </Shell>
  );
};

/* ── 5 · PEBBLE — a soft one-piece creature, spark on the chest. */
export const Pebble: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      <defs><linearGradient id={`pb${p.i}`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#8FD0FF" /><stop offset="100%" stopColor="#6E8BF5" /></linearGradient></defs>
      {[40, 53].map((lx, j) => (
        <rect key={j} x={lx} y={84} width={7} height={15} rx={3.2} fill="#5C77E0"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (r.L === 0 ? 9 : 3)} ${lx + 3.5} 86)`} />
      ))}
      {[[22, -1], [78, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={58} width={12} height={8} rx={4} fill="#5C77E0"
          transform={`rotate(${(dir as number) * (16 + Math.sin(p.f / 7 + j * 3 + r.ph) * 20)} ${ax} 62)`} />
      ))}
      {/* one soft mass — head and body are the same volume, like a pebble */}
      <path d="M 50 10 C 74 10 84 30 84 52 C 84 74 70 86 50 86 C 30 86 16 74 16 52 C 16 30 26 10 50 10 Z"
        fill={`url(#pb${p.i})`} />
      <path d="M 16 58 C 26 74 34 86 50 86 C 66 86 74 74 84 58 C 84 74 70 86 50 86 C 30 86 16 74 16 58 Z"
        fill="#000" opacity={0.12} />
      {/* the spark, worn on the chest like a badge */}
      <g transform={`translate(50 66) scale(0.15) translate(-50 -50) rotate(${Math.sin(p.f / 16) * 14} 50 50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#FFFFFF" opacity={0.85} />
      </g>
      <Face cx={50} cy={42} gap={10} w={6} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

/* ── 6 · CHIPPY — a square-headed bot, spark badge on the forehead. */
export const Chippy: React.FC<CProps> = (p) => {
  const r = useRig(p.f, p.size, p.i ?? 0, p.loop, p.at ?? 0);
  return (
    <Shell p={p} r={r}>
      {[38, 55].map((lx, j) => (
        <rect key={j} x={lx} y={82} width={8} height={17} rx={2.5} fill="#3F8F6A"
          transform={`rotate(${Math.sin(p.f / 8 + j * 2 + r.ph) * (7 + r.arm * 8)   /* ⛔ was 3 deg on every loop but PACE */} ${lx + 4} 84)`} />
      ))}
      {[[24, -1], [76, 1]].map(([ax, dir], j) => (
        <rect key={"a" + j} x={(ax as number) - 6} y={64} width={12} height={8} rx={3} fill="#3F8F6A"
          transform={`rotate(${(dir as number) * (14 + Math.sin(p.f / 7 + j * 3 + r.ph) * 18 * r.arm)} ${ax} 68)`} />
      ))}
      <rect x={31} y={58} width={38} height={28} rx={7} fill="#4FB183" />
      <rect x={31} y={74} width={38} height={12} rx={6} fill="#000" opacity={0.14} />
      {/* head: a rounded square with pin legs down each side, like a chip */}
      {[0, 1, 2].map(j => (<React.Fragment key={"p" + j}>
        <rect x={19} y={22 + j * 11} width={7} height={4} rx={1.5} fill="#B9C2CC" />
        <rect x={74} y={22 + j * 11} width={7} height={4} rx={1.5} fill="#B9C2CC" />
      </React.Fragment>))}
      <rect x={26} y={12} width={48} height={44} rx={12} fill="#5FC796" />
      <rect x={26} y={42} width={48} height={14} rx={7} fill="#000" opacity={0.12} />
      {/* the spark badge on the forehead */}
      <g transform={`translate(50 21) scale(0.12) translate(-50 -50)`}>
        <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
          fill="#FFFFFF" opacity={0.9} />
      </g>
      <Face cx={50} cy={38} gap={10} shock={p.shock} cheer={p.cheer ?? r.ch} />
    </Shell>
  );
};

export const CHARACTERS = [
  { key: "sparky",  name: "1 · SPARKY",  C: Sparky,  note: "round head, spark tuft, mascot ratio" },
  { key: "gembot",  name: "2 · GEMBOT",  C: GemBot,  note: "cut-gem head, four-colour chest" },
  { key: "beaker",  name: "3 · BEAKER",  C: Beaker,  note: "the Labs flask, as a head" },
  { key: "dothead", name: "4 · DOTHEAD", C: DotHead, note: "visor of four Google dots" },
  { key: "pebble",  name: "5 · PEBBLE",  C: Pebble,  note: "one soft mass, spark badge" },
  { key: "chippy",  name: "6 · CHIPPY",  C: Chippy,  note: "chip head, spark on the brow" },
] as const;

/* =========================================================================
   ⭐⭐ THE CAST, AND WHICH CHARACTER GOES WHERE.

   Alex: *"lets go with the gembot primarily and go with the beaker only
   sometimes here i think it could be good in some scenes as well."*

   ⛔ NOT AT RANDOM. Each has a job it is better at, so the rule is legible:

     GEMBOT — the DEFAULT cast. A Gemini gem is "Google AI" in general, so it
              carries every scene whose subject is a product, a result or a
              person doing work.
     BEAKER — used where the LABS / EXPERIMENT idea is the actual point, because
              the flask is Google Labs' OWN published mark:
                · S2  the wall of 24 experiments being sifted
                · S6  the context window filling — the liquid is a LEVEL, and
                      this is the one beat that has a level in it
                · S15 a few in the crew, so the team reads as mixed rather than
                      cloned
   ⭐ The liquid also gives S6 something no other character has: as each codebase
   goes in, the flask fills.
   ====================================================================== */
export type CastKind = "gem" | "beaker";

/** the same call signature the scenes already use for `Crew`, so swapping the
    cast is mechanical and no scene has to be rewritten to change character. */
export const GCrew: React.FC<CProps & { kind?: CastKind; fill?: number; liquid?: string;
  tint?: string }> = ({ kind = "gem", ...p }) =>
  kind === "beaker" ? <Beaker {...p} /> : <GemBot {...p} />;

/* ⛔⛔⛔ THE FLOOR LINE IS NOT `792 - something`, AND MY FIRST TWO ANSWERS WERE
   BOTH WRONG BECAUSE I DERIVED THEM FROM AN INCOMPLETE RIG.

   Alex: *"for a lot of the scenes, the gemini sprites are like mostly cut off
   they dont really show."* I solved it once at 742 and again at 716, both times
   from this formula:

       max visible y = 443.5 + (792 - 443.5) / push          ← WRONG

   `Scene` does not apply `push` alone. It renders
       translate(cam.dx, cam.dy) rotate(cam.rot) scale(push * cam.s)
   about `50% 56%`, and `CamCtx` supplies a PER-CUT scale AND a per-cut
   translate that my formula ignored completely:
       bill  s 1.058  dy +34      amber s 1.204  dy -66      steel s 1.122  dy +14
   The bill cut therefore runs at push x 1.058 and is then pushed a further 34px
   DOWN, so the real bound is

       max visible y = 443.5 + (792 - 443.5 - cam.dy) / (push * cam.s)

   Measured across all 20 scenes x all 3 cuts, the tightest is **708** (S16, bill
   cut, effective scale 1.189) — so a clamp of 716 put the feet EIGHT PIXELS
   BELOW THE CROP, and in the ten scenes nearest the bound they sat exactly on
   it. That is the note. Both my earlier fixes were arithmetic over a rig I had
   not read; `docs/MEASURING.md` is about precisely this failure — a correct
   calculation over the wrong signal produces a confident wrong answer.

   ⭐ 672 gives at least 36px of floor under the feet in the WORST scene and
   more everywhere else. Clearing the crop is not the same as reading: a sprite
   needs ground beneath it to be standing on something.

   ⭐ THE SAME BOUND APPLIES SIDEWAYS, and it is much tighter than the note that
   used to sit in `BillScenes` (`left >= 506 - 486/push`). The real band, over
   every scene and cut, is **x 208..879** — 671px of a 1012px panel. That is why
   S17 could not hold four 192px sprites in a row, and why its output stack and
   S11's charge counter were both invisible until they were moved inside it. */
export const foot = (horizon: number, off: number, max = 672) =>

  Math.min(horizon + off, max);
