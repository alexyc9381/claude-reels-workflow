import React from "react";
import { useCurrentFrame } from "remotion";
import { E, OUT, IO, BACK, LIN, W, H, hexa, dkh, mxh, rnd, SH, Scene, Cam, Mark,
  Hero, Crew, Forearm, Contact, squash, GY, MarkCast } from "./IntWorld";
import { ShopWall, BayLamp, LightColumn, Bench } from "./RpsSets";
import { StepPlate } from "./JudgeProps";
import { PLACES as RPS_PLACES } from "./RpsWorld";

/* ===========================================================================
   REEL 140 · "INTENT" — SCENE 0.  THE FORGE.

   ⛔ Alex on the previous cut: *"There's none of motion here… if we have to do a
   forging chain, there has to be a hammer. Right? And there has to be the
   welding thing, the welding post. And there's a bunch of other random chains in
   the background… you have to be welding something else and smashing something
   else."*

   ⭐ HE IS DESCRIBING A MECHANISM, AND I HAD DRAWN THE RESULT. The last version
   had a finished link sitting still while particles fell past it — a STATE, not
   an EVENT (`feedback_a_process_is_not_an_event`, `feedback_a_sway_is_not_motion`:
   motion has to be the OUTPUT of something happening). A forge is not a hot
   ring; it is a HAMMER coming down, a TORCH burning, sparks thrown by an impact,
   and stock hanging everywhere waiting to be worked.

   SO EVERY MOVING THING HERE IS DRIVEN BY A CAUSE:
     the hammer      swings a real arc and STRIKES on a beat, slow up / fast down
     the link        squashes and flashes ON the strike frame, never otherwise
     the sparks      are BORN by the strike, arc under gravity, and burn out
     the torch       throws an arc flash with a spray of its own
     the chains      hang as stock and sway, each on its own rate
     the fire        breathes under all of it
   ========================================================================= */

export const IRONC = "#6E6A63", IRONL = "#A9A196", HOT = "#F0842E", WHITEHOT = "#FFD9A0";
/* ⭐ THE SCHEDULE IS THE ANTICIPATION. Four blows, and the gap before each one
   GROWS: 10 / 12 / 15 / 18 frames. The hammer hangs at the top for a rising
   fraction of each window (22% -> 52%), so the last wind-up is a held beat and
   the strike that ends it is the one the whole shot has been promising.
   ⛔ Anticipation is "a promised event whose resolution is WITHHELD" — a loop
   resolves the question at blow one and there is no reason to stay. */
export const BLOW = [10, 22, 37, 55];
const HANG = [0.22, 0.32, 0.42, 0.52];
const winOf = (f: number) => {
  for (let i = 0; i < BLOW.length; i++) if (f < BLOW[i]) return i;
  return BLOW.length - 1;
};

/** a forged oval link. `heat` 0..1 glows it; `sq` squashes it on the blow. */
export const Link: React.FC<{ x: number; y: number; r: number; rot?: number; heat?: number;
  z?: number; o?: number; sq?: number; mark?: boolean }> =
  ({ x, y, r, rot = 0, heat = 0, z = 60, o = 1, sq = 1, mark = false }) => {
  const rx = r, ry = r * 0.62, sw = r * 0.30;
  const c = heat > 0.02 ? mxh(HOT, 0.12 - heat * 0.12) : IRONC;
  return (
    <div style={{ position: "absolute", left: x - rx * 1.25, top: y - rx * 1.25,
      width: rx * 2.5, height: rx * 2.5, zIndex: z, opacity: o,
      transform: `rotate(${rot}deg) scaleY(${sq}) scaleX(${2 - sq})` }}>
      <svg width={rx * 2.5} height={rx * 2.5} viewBox={`0 0 ${rx * 2.5} ${rx * 2.5}`}>
        {/* the cast shadow side — the ring is a SOLID, not a stroke */}
        <ellipse cx={rx * 1.25} cy={rx * 1.25 + sw * 0.16} rx={rx} ry={ry} fill="none"
          stroke={dkh(c, 0.58)} strokeWidth={sw + r * 0.10} />
        <ellipse cx={rx * 1.25} cy={rx * 1.25} rx={rx} ry={ry} fill="none"
          stroke={dkh(c, 0.45)} strokeWidth={sw + r * 0.07} />
        <ellipse cx={rx * 1.25} cy={rx * 1.25} rx={rx} ry={ry} fill="none"
          stroke={c} strokeWidth={sw} />
        {/* ⭐ THE THIRD FACE — a lit top lip turns a sticker into a solid.
            Cheapest gain available, per the memory's own ranking. */}
        <ellipse cx={rx * 1.25} cy={rx * 1.25 - sw * 0.30} rx={rx} ry={ry} fill="none"
          stroke={hexa(heat > 0.02 ? WHITEHOT : IRONL, 0.55 + heat * 0.4)} strokeWidth={sw * 0.30} />
        {/* ⭐ FINE REPEATED DETAIL — 22 hammer facets round the ring, each with
            its own lit AND shadowed edge. No single mark survives the audit's
            downsample; together they read as forged texture. */}
        {Array.from({ length: 22 }, (_, i) => {
          const a = (i / 22) * Math.PI * 2;
          const px = rx * 1.25 + Math.cos(a) * rx, py = rx * 1.25 + Math.sin(a) * ry;
          const w2 = sw * 0.40, h2 = sw * 0.15;
          return (
            <g key={i} transform={`translate(${px} ${py}) rotate(${(a * 180) / Math.PI + 90})`}>
              <rect x={-w2 / 2} y={-h2 / 2 - h2 * 0.7} width={w2} height={h2}
                fill={hexa(heat > 0.02 ? "#FFE0A8" : IRONL, 0.30 + heat * 0.3)} rx={h2 / 2} />
              <rect x={-w2 / 2} y={h2 * 0.5} width={w2} height={h2 * 0.8}
                fill={hexa("#000000", 0.22)} rx={h2 / 2} />
            </g>
          );
        })}
        {/* the weld seam where the link was closed — one asymmetry so the object
            has a front and is not radially identical */}
        <g transform={`translate(${rx * 1.25} ${rx * 1.25 - ry}) rotate(-8)`}>
          <rect x={-sw * 0.30} y={-sw * 0.60} width={sw * 0.60} height={sw * 1.2}
            fill="none" />
          <rect x={-sw * 0.26} y={-sw * 0.55} width={sw * 0.52} height={sw * 1.1}
            fill={dkh(c, 0.30)} rx={sw * 0.14} />
          <rect x={-sw * 0.14} y={-sw * 0.50} width={sw * 0.28} height={sw * 1.0}
            fill={hexa(heat > 0.02 ? "#FFE9A8" : IRONL, 0.42)} rx={sw * 0.10} />
        </g>
        {heat > 0.02 && <ellipse cx={rx * 1.25} cy={rx * 1.25} rx={rx} ry={ry} fill="none"
          stroke={hexa("#FFC26A", 0.6 * heat)} strokeWidth={sw * 0.66} />}
      </svg>
      {mark && (
        <div style={{ position: "absolute", left: rx * 1.25 - r * 0.42, top: rx * 1.25 - r * 0.42,
          width: r * 0.84, height: r * 0.84, transform: `rotate(${-rot}deg)` }}>
          <Mark x={0} y={0} s={r * 0.78} z={2} plate={false} />
        </div>
      )}
    </div>
  );
};

/** ⭐ THE STOCK — chains hanging from the gantry, each on its own rate. This is
    the density device, and it is on-concept: a forge is full of chain. */
export const HangChain: React.FC<{ f: number; x: number; top: number; n: number; r: number;
  rate: number; z?: number; o?: number; still?: number; kick?: number }> =
  ({ f, x, top, n, r, rate, z = 14, o = 0.9, still = 0, kick = -1 }) => {
  /* ⭐ the stock STILLS through the hush, then the whole wall swings at once
     when the blow lands — the room reacting is what makes the hit feel big */
  const shock = kick >= 0 && kick < 30
    ? Math.sin(kick * 0.7) * 26 * Math.exp(-kick / 9) : 0;
  const sw = Math.sin(f * rate + x * 0.03) * 3.4 * (1 - still) + shock;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, opacity: o }}>
      {Array.from({ length: n }, (_, i) => {
        const y = top + i * r * 1.02;
        const lean = sw * ((i + 1) / n);
        return <Link key={i} x={x + lean * 3} y={y} r={r} rot={i % 2 ? 90 : 0} z={z}
          o={1} heat={0} />;
      })}
    </div>
  );
};

/** ⭐ THE HAMMER. Slow up, FAST down — that is what makes a blow read
    (`feedback_make_an_action_read`: an action is a DISTANCE, and weight is in
    the acceleration, not the size of the head). */
export const Hammer: React.FC<{ f: number; px: number; py: number; reach: number; z?: number }> =
  ({ f, px, py, reach, z = 90 }) => {
  const w = winOf(f);
  const from = w === 0 ? -6 : BLOW[w - 1];
  const to = BLOW[w];
  const t = Math.max(0, Math.min(1, (f - from) / (to - from)));
  const hang = HANG[w];
  const rise = 1 - hang - 0.18;                    /* raise · HANG · snap */
  /* ⭐ the HANG is the anticipation: the hammer stops at the apex and waits,
     and it waits longer before every successive blow. */
  const ang = t < rise ? -14 - E(t, 0, rise, 0, 100, OUT)
    : t < rise + hang ? -114 + Math.sin((t - rise) * 22) * 2.2
    : -114 + E(t, rise + hang, 1, 0, 122, IO);
  const a = (ang * Math.PI) / 180;
  const hx = px + Math.cos(a) * reach, hy = py + Math.sin(a) * reach;
  const HW = reach * 0.46;
  return (<>
    <Forearm x0={px} y0={py} x1={hx} y1={hy} w={reach * 0.16} c="#C4674A" z={z} />
    <div style={{ position: "absolute", left: hx - HW / 2, top: hy - HW * 0.42,
      width: HW, height: HW * 0.84, zIndex: z + 1,
      transform: `rotate(${ang + 90}deg)`, borderRadius: 6,
      background: `linear-gradient(180deg, #C9C2B6, #6B655C)`,
      border: `${Math.max(4, HW * 0.07)}px solid #38332C` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: HW, height: HW * 0.16,
        background: hexa("#FFFFFF", 0.55), borderRadius: 4 }} />
    </div>
  </>);
};

/** ⭐⭐ SPARKS. Alex: *"when you see sparks, stuff like that, this needs to be
    way more elevated."* v1 was 30 square dots on a parabola — confetti. Real
    forge scale: it leaves as a STREAK (elongated along its own velocity), COOLS
    along the flight so colour tracks age rather than being a fade, DRAGS in the
    air, BOUNCES off the anvil face, and a fraction of it BURSTS mid-flight into
    secondaries. All four are cheap and all four are what makes it read as hot
    metal instead of glitter. */
export const Sparks: React.FC<{ f: number; at: number; x: number; y: number; n?: number;
  z?: number; spread?: number; up?: number; floorY?: number; power?: number }> =
  ({ f, at, x, y, n = 64, z = 96, spread = 1, up = 1, floorY = 690, power = 1 }) => {
  const lf = f - at;
  if (lf < 0 || lf > 34) return null;
  return (<>
    {/* the contact FLASH — one frame of white, then gone */}
    {lf < 3 && (
      <div style={{ position: "absolute", left: x - 150, top: y - 150, width: 300, height: 300,
        zIndex: z + 4, opacity: (1 - lf / 3) * 0.9,
        background: `radial-gradient(circle, #FFFFFF, ${hexa("#FFD9A0", 0.8)} 26%, transparent 62%)` }} />
    )}
    {Array.from({ length: n }, (_, i) => {
      const a = (rnd(i, 3) - 0.5) * 2.9 * spread - Math.PI / 2 * up;
      const v0 = (7 + rnd(i, 7) * 26) * power;
      const life = 14 + rnd(i, 11) * 18;
      if (lf > life) return null;
      /* air drag: velocity decays, so the streak shortens as it slows */
      const drag = Math.exp(-lf * 0.045);
      const vx = Math.cos(a) * v0 * drag, vy0 = Math.sin(a) * v0;
      let px = x + vx * lf;
      let py = y + vy0 * lf * drag + 0.42 * lf * lf;
      /* BOUNCE off the floor, losing most of the energy */
      if (py > floorY) py = floorY - (py - floorY) * 0.34;
      const k = 1 - lf / life;
      /* cooling: white -> yellow -> orange -> ember */
      const c = k > 0.72 ? "#FFFFFF" : k > 0.5 ? "#FFE9A8" : k > 0.28 ? "#FFA53C" : "#D2521A";
      const len = Math.max(3, Math.hypot(vx, vy0 + 0.84 * lf) * 0.72 * k + 3);
      const ang = (Math.atan2(vy0 + 0.84 * lf, vx) * 180) / Math.PI;
      const th = 2 + rnd(i, 5) * 3.4;
      return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: px, top: py, width: len, height: th,
            borderRadius: th, zIndex: z, opacity: Math.min(1, k * 1.5),
            transform: `rotate(${ang}deg)`, background: c,
            boxShadow: k > 0.6 ? `0 0 ${th * 2}px ${hexa("#FFC26A", 0.55)}` : undefined }} />
          {/* the burst: one in six pops into two secondaries mid-flight */}
          {i % 6 === 0 && lf > life * 0.45 && lf < life * 0.8 && (
            <>
              <div style={{ position: "absolute", left: px + 12, top: py - 9, width: 5, height: 3,
                borderRadius: 3, background: "#FFE9A8", zIndex: z, opacity: k }} />
              <div style={{ position: "absolute", left: px - 10, top: py + 7, width: 5, height: 3,
                borderRadius: 3, background: "#FFA53C", zIndex: z, opacity: k }} />
            </>
          )}
        </React.Fragment>
      );
    })}
  </>);
};


/* ⭐⭐⭐ THE WORK, IN STAGES — ONE PER BLOW. A smith really does make a chain
   link this way, so the blows are never the same picture twice: the stock is a
   DIFFERENT OBJECT after every hit, and its shape is the progress bar.
     0 BILLET   a fat glowing lump out of the fire
     1 BAR      flattened long under the hammer
     2 BEND     folded into a U
     3 CURL     the ends brought round toward each other
     4 LINK     closed, and it flies up to join the chain */
export const Work: React.FC<{ stage: number; x: number; y: number; r: number; heat: number;
  sq: number; z?: number; mark?: boolean; fr?: number }> =
  ({ stage, x, y, r, heat, sq, z = 62, mark = false, fr = 0 }) => {
  const c = heat > 0.02 ? mxh(HOT, 0.12 - heat * 0.12) : IRONC;
  const hi = hexa(heat > 0.02 ? WHITEHOT : IRONL, 0.5 + heat * 0.45);
  const sw = r * 0.34;
  const S = r * 2.6, cx = S / 2, cy = S / 2;
  return (
    <div style={{ position: "absolute", left: x - S / 2, top: y - S / 2, width: S, height: S,
      zIndex: z, transform: `scaleY(${sq}) scaleX(${2 - sq})` }}>
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ overflow: "visible" }}>
        {heat > 0.3 && <ellipse cx={cx} cy={cy} rx={r * 1.4} ry={r * 1.05} fill={hexa(HOT, 0.22 * heat)} />}
        {stage === 0 && (<>
          <ellipse cx={cx} cy={cy} rx={r * 0.74} ry={r * 0.62} fill={c}
            stroke={dkh(c, 0.42)} strokeWidth={r * 0.10} />
          <ellipse cx={cx - r * 0.16} cy={cy - r * 0.20} rx={r * 0.34} ry={r * 0.22} fill={hi} />
        </>)}
        {stage === 1 && (<>
          <rect x={cx - r * 1.16} y={cy - r * 0.30} width={r * 2.32} height={r * 0.60}
            rx={r * 0.28} fill={c} stroke={dkh(c, 0.42)} strokeWidth={r * 0.09} />
          <rect x={cx - r} y={cy - r * 0.20} width={r * 2} height={r * 0.14} rx={r * 0.07} fill={hi} />
        </>)}
        {stage === 2 && (<>
          <path d={`M ${cx - r} ${cy - r * 0.7} L ${cx - r} ${cy + r * 0.1}
                    A ${r} ${r * 0.8} 0 0 0 ${cx + r} ${cy + r * 0.1} L ${cx + r} ${cy - r * 0.7}`}
            fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${cx - r} ${cy - r * 0.7} L ${cx - r} ${cy + r * 0.1}
                    A ${r} ${r * 0.8} 0 0 0 ${cx + r} ${cy + r * 0.1} L ${cx + r} ${cy - r * 0.7}`}
            fill="none" stroke={hi} strokeWidth={sw * 0.26} strokeLinecap="round" />
        </>)}
        {stage === 3 && (<>
          <path d={`M ${cx + r * 0.30} ${cy - r * 0.66} A ${r} ${r * 0.66} 0 1 0 ${cx + r * 0.62} ${cy - r * 0.40}`}
            fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${cx + r * 0.30} ${cy - r * 0.66} A ${r} ${r * 0.66} 0 1 0 ${cx + r * 0.62} ${cy - r * 0.40}`}
            fill="none" stroke={hi} strokeWidth={sw * 0.26} strokeLinecap="round" />
        </>)}
        {stage >= 4 && (<>
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.62} fill="none"
            stroke={dkh(c, 0.45)} strokeWidth={sw + r * 0.07} />
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.62} fill="none" stroke={c} strokeWidth={sw} />
          <ellipse cx={cx} cy={cy - sw * 0.22} rx={r} ry={r * 0.62} fill="none"
            stroke={hi} strokeWidth={sw * 0.30} />
        </>)}
      </svg>
      {mark && stage >= 4 && (
        <MarkCast x={cx} y={cy} s={r * 0.82} z={4} f={fr} spin={2.6} pulse={0.5} />
      )}
    </div>
  );
};

export const SHOP_HOOK: React.FC<{ v?: unknown; dur: number; at?: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = RPS_PLACES.floor;
  const AX = 636, AY = 664;                        /* the anvil */
  /* ⭐ THE BLOW COUNT IS THE STATE: the work advances one stage per blow, so
     the shape itself is the progress bar and no two blows show the same picture. */
  const done = BLOW.filter((b) => f >= b).length;
  const blowAt = done > 0 ? BLOW[done - 1] : -99;
  const sinceBlow = f - blowAt;
  const struck = sinceBlow >= 0 && sinceBlow < 3;
  /* ⭐ the LAST blow is the biggest: more shake, more sparks, and it is the one
     that reveals what the thing has been becoming. */
  const isLast = done === BLOW.length;
  const stage = Math.min(4, done);
  /* ⭐⭐⭐ THE HUSH — the eight frames before the last blow. Everything else in
     the shop STOPS: the arc cuts out, the chains still, the lamp drops, and the
     only lit thing left is the metal. Drama is not more happening, it is
     everything ELSE being taken away so one event has the room to itself.
     ⛔ And the framing HARD-CUTS tighter on the same frame — a cut, not a zoom
     (Alex killed the zoom; an instant step reads as an edit). */
  const HUSH = BLOW[3] - 8;
  const hush = f >= HUSH && f < BLOW[3];
  const hushK = hush ? Math.min(1, (f - HUSH) / 6) : 0;
  const after = isLast ? sinceBlow : -1;
  const tight = f >= HUSH;                       /* the punch-in */
  const sinceStage = sinceBlow;
  const flying = isLast && sinceStage > 3 && sinceStage < 20;
  /* the link squashes ON the blow and springs back — never a constant wobble */
  const sq = struck ? 0.74 : 1 - Math.max(0, 0.22 - sinceBlow * 0.05);
  const heat = 0.55 + (struck ? 0.45 : Math.max(0, 0.34 - sinceBlow * 0.05));
  const shake = struck ? (isLast ? 16 : 9) : Math.max(0, (isLast ? 11 : 6) - sinceBlow * 1.6);
  /* the weld arc runs on its own clock, flickering the way an arc does */
  const weldOn = (f % 46) < 26 && !hush && !(isLast && sinceBlow < 22);
  /* the open flare — full at frame 0, gone by frame 20.
     ⛔⛔ TUNE THIS AGAINST THE FULL RENDER, NEVER A SHORT ONE. A `--frames=0-4`
     render measured frame 0 at 141.1 and the same code measured 138.1 in the
     1672-frame deliverable: a five-frame clip is a different GOP with different
     rate control, so its frame 0 is a different picture. The gate is a property
     of the FILE THAT SHIPS. */
  const FLARE = Math.max(0, 1 - f / 20);
  const flick = weldOn ? 0.55 + 0.45 * rnd(Math.floor(f / 2), 3) : 0;

  /* the vignette opens WITH the flare — a tight vignette costs real mean luma
     at the corners, and frame 0 is measured across the whole panel */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.035]} vig={0.34 - FLARE * 0.15}>
      <Cam x={(tight ? -128 : 0) + Math.sin(f / 30) * 4 + (struck ? Math.sin(f * 9) * shake * 0.5 : 0)}
        y={(tight ? -96 : 0) + shake * 0.5} s={tight ? 1.34 : 1} z={12}>
        {/* ⭐⭐ FRAME 0 IS THE THUMBNAIL and it is the ONLY frame the >=140 luma
            law applies to. The shop measured 123.3 because I opened on a dark
            room and lit it as the hammer fell. A forge is at its BRIGHTEST just
            before the strike — the fire has just been worked — so the open
            flares and settles over twenty frames. This buys the thumbnail
            without lifting the body, which is the move that greys a reel out. */}
        <ShopWall p={p} f={f} seed={4} z={10} door={false} pegX={930} pegW={240}
          lift={0.55 + FLARE * 0.52} />
        <div style={{ position: "absolute", inset: 0, zIndex: 11, opacity: FLARE * 0.94,
          background: `radial-gradient(126% 86% at 62% 52%, ${hexa("#FFD79A", 0.95)},
            ${hexa("#E08A34", 0.5)} 52%, transparent 84%)` }} />
        {/* ⭐ THE HUSH IS SUBTRACTION, so everything that makes light has to be
            a real fixture that can be TAKEN AWAY — a shaft that dies and two
            lamps that drop out leave the metal as the only lit thing. */}
        <LightColumn x={AX} on={(0.62 + FLARE * 0.38) * (1 - hushK)} w={330 + FLARE * 260}
          c="#FFD08A" z={13} top={130} />
        <BayLamp x={286} y={168} c="#FFC46E" on={0.85 * (1 - hushK)} f={f} z={17} s={0.85} />
        <BayLamp x={958} y={168} c="#FFC46E" on={0.7 * (1 - hushK)} f={f} z={17} s={0.85} />
        <Bench x={214} y={AY + 34} w={330} s={0.86} z={20} />
        {/* the floor plate takes every blow — the ground is part of the hit */}
        <StepPlate x={AX} y={AY + 92} w={420} hit={struck ? 1 : 0} z={45} />
        {/* the darkness that arrives before the blow, and is torn open by it */}
        {(hushK > 0 || (after >= 0 && after < 5)) && (
          <div style={{ position: "absolute", inset: -80, zIndex: 86,
            background: after >= 0 && after < 5
              ? `radial-gradient(circle at ${AX}px ${AY - 214}px, ${hexa("#FFFFFF", 0.85 - after * 0.17)}, transparent 46%)`
              : `radial-gradient(circle at ${AX}px ${AY - 214}px, transparent 22%, ${hexa("#05070A", 0.80 * hushK)} 62%)` }} />
        )}

        {/* the gantry the stock hangs off — without it the chain is a decal */}
        <div style={{ position: "absolute", left: -40, top: 118, width: W + 80, height: 22,
          zIndex: 15, background: `linear-gradient(180deg, ${IRONL}, ${dkh(IRONC, 0.34)})`,
          borderBottom: `5px solid ${dkh(IRONC, 0.5)}` }} />
        {[[70, 6, 52, 0.020], [206, 5, 44, 0.031], [332, 7, 38, 0.025],
          [742, 6, 46, 0.028], [872, 7, 40, 0.035], [994, 5, 50, 0.022]].map(
          ([x, n, r, rate], i) => (
            <HangChain key={"hc" + i} f={f} x={x as number} top={138} n={n as number}
              r={r as number} rate={rate as number} z={14} o={0.62 + (i % 3) * 0.13}
              still={hushK} kick={after} />
          ))}

        {/* THE FORGE FIRE, breathing, behind the anvil */}
        <div style={{ position: "absolute", left: 742, top: 402, width: 300, height: 260, zIndex: 16,
          borderRadius: "50%", opacity: 0.42 + Math.sin(f / 6) * 0.12,
          background: `radial-gradient(circle, ${hexa(HOT, 0.9)}, ${hexa("#7A2E06", 0.15)} 68%, transparent 74%)` }} />

        {/* THE ANVIL — horn, waist, base */}
        <svg style={{ position: "absolute", left: AX - 235, top: AY - 96, zIndex: 52 }}
          width={470} height={274} viewBox="0 0 360 210">
          <path d="M40 30 L250 30 C 300 30 342 44 356 58 C 330 62 306 70 292 82 L250 82 L250 96
                   C 250 118 214 122 202 140 L214 178 L96 178 L110 140 C 98 122 62 118 62 96 L62 82
                   L40 82 Z"
            fill="#4A453E" stroke="#26221D" strokeWidth="6" strokeLinejoin="round" />
          <path d="M44 34 L246 34" stroke={hexa(IRONL, 0.5)} strokeWidth="7" strokeLinecap="round" />
          <rect x="76" y="178" width="158" height="26" rx="7" fill="#2E2A25" />
        </svg>

        {/* ⭐ THE WORK — the hot link ON the anvil, squashing on each blow */}
        <Work stage={stage} x={AX} y={AY - 142} r={196} heat={heat} sq={sq} z={62} mark fr={f} />
        {/* the finished link leaving for the chain — the new object arriving */}
        {flying && (
          <Link x={AX + E(sinceStage, 0, 16, 0, 300, OUT)}
            y={AY - 142 - E(sinceStage, 0, 16, 0, 400, OUT)}
            r={196 * (1 - sinceStage / 26)} rot={0} heat={0} z={64}
            o={1 - sinceStage / 18} />
        )}
        {flying && (
          <MarkCast x={AX + E(sinceStage, 0, 16, 0, 300, OUT)}
            y={AY - 142 - E(sinceStage, 0, 16, 0, 400, OUT)}
            s={160 * (1 - sinceStage / 26)} z={66} f={f} spin={3.4}
            o={1 - sinceStage / 18} />
        )}
        <Sparks f={f} at={blowAt} x={AX} y={AY - 214} n={isLast ? 120 : 66} z={98} spread={1.25} floorY={AY + 40} power={isLast ? 1.5 : 1.05} />

        {/* ⭐ THE SHOCKWAVE — one expanding ring, only on the blow that matters */}
        {after >= 0 && after < 16 && (
          <div style={{ position: "absolute", left: AX - 40 - after * 46,
            top: AY - 214 - 26 - after * 30, width: 80 + after * 92, height: 52 + after * 60,
            borderRadius: "50%", zIndex: 90, opacity: Math.max(0, 0.85 - after / 16),
            border: `${Math.max(2, 12 - after * 0.7)}px solid ${hexa("#FFE0A8", 0.9)}` }} />
        )}
        {/* dust shaken off the gantry by the impact */}
        {after >= 0 && after < 26 && Array.from({ length: 26 }, (_, i) => {
          const t0 = i % 7, lf = after - t0;
          if (lf < 0) return null;
          const x = 60 + rnd(i, 3) * (W - 120);
          const y = 140 + lf * (3 + rnd(i, 7) * 5) + 0.28 * lf * lf;
          return <div key={"du" + i} style={{ position: "absolute", left: x, top: y,
            width: 5 + rnd(i, 5) * 7, height: 5 + rnd(i, 9) * 6, borderRadius: 2, zIndex: 84,
            opacity: Math.max(0, 0.6 - lf / 30), background: "#C9BFA6" }} />;
        })}

        {/* ⭐ THE SMITH — a body swinging a real hammer */}
        <Hero f={f} x={214} y={GY + 30} size={404} z={70} costume={{ constr: 1 }}
          gaze={0.85} strain={struck ? 1 : 0.35} act={1} />
        <Hammer f={f} px={288} py={392} reach={300} z={92} />

        {/* ⭐ THE WELDER — a second Claude, torch lit, throwing its own sparks */}
        <Crew f={f} x={902} y={GY + 16} i={6} size={196} z={70} at={-20} flip />
        <div style={{ position: "absolute", left: 820, top: 520, width: 96, height: 16, zIndex: 74,
          borderRadius: 8, transform: "rotate(-22deg)",
          background: `linear-gradient(90deg, ${dkh(IRONC, 0.2)}, ${IRONL})` }} />
        {weldOn && (<>
          <div style={{ position: "absolute", left: 782, top: 486, width: 74, height: 74,
            borderRadius: "50%", zIndex: 92, opacity: flick,
            background: `radial-gradient(circle, #FFFFFF, ${hexa("#BFE4FF", 0.9)} 40%, transparent 70%)` }} />
          <div style={{ position: "absolute", left: 690, top: 400, width: 260, height: 250, zIndex: 30,
            opacity: 0.34 * flick,
            background: `radial-gradient(circle, ${hexa("#CFE9FF", 0.95)}, transparent 68%)` }} />
          <Sparks f={f} at={f - (f % 3)} x={818} y={520} n={16} z={94} spread={0.75} up={0.3} floorY={GY + 40} power={0.6} />
        </>)}

        <Contact x={AX - 220} y={AY + 196} w={440} z={46} o={0.42} />
      </Cam>
    </Scene>
  );
};
