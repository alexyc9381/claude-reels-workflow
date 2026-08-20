import React from "react";
import { useCurrentFrame } from "remotion";
import { Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd,
  Scene, Cam, MarkCast, rock, shake, squash,
  CLAY, CLAYD, GOLD, RED, PAPER, CREAMB, INK, STEEL, OXIDE, BRASS,
  ui, mono, Ring, Puff, Pool, Part, Belt,
} from "./GoWorld";
import { SetFor, Stanchion, Flood, placeFor } from "./GoSets";

/* ===========================================================================
   REEL 113 · "GO" — HOOK CONCEPTS, ROUND 2.

   ⛔⛔ WHAT ROUND 1 GOT WRONG, IN ALEX'S WORDS:
     *"it's not really easy to tell what's going on"*
     *"concept D has a big Claude, it's way too big, and it's kinda just
       throwing stuff behind it out of the screen, which isn't too much of an
       interesting component"*
     *"the other ones, the Claude sprite is not that big, and it's not the main
       focal point"*
     *"the animation should have the Claude sprite itself as the focal point,
       maybe doesn't have to be the whole screen, but it should also be
       interesting components"*

   THE FOUR RULES THAT FOLLOW, AND EVERY CONCEPT BELOW IS BUILT TO ALL FOUR:
   1. ⭐ THE CLAUDE IS THE FOCAL POINT. Not a bystander at the edge (round 1's
      A/B/C) and not a wall filling the frame (round 1's D at 620px). ~300-340px
      on a 1012 panel: it owns the shot and still has a world around it.
   2. ⛔⛔ NOTHING LEAVES THE FRAME. D's payoff was hurled off-screen, so there
      was never anything to look at. Every result LANDS somewhere visible and
      STAYS there, accumulating where you can count it.
   3. ⭐ THE ACTION IS AN EXCHANGE YOU CAN READ MUTED: something goes IN, the
      Claude does something to it, something comes OUT — all three on screen.
      "I can't tell what's going on" is answered by showing the input, the
      operation and the output in one frame, not by adding more props.
   4. ⭐ THE CLAUDE ACTS AND REACTS. It works the machine AND its face changes
      when the result is wrong (shock -> stern -> xeyes). A sprite that only
      moves is furniture; a sprite that responds is a character.
   ========================================================================= */

export const HOOK_LEN = 93;

/* ---------------------------------------------------------------------------
   THE HERO RIG. `Crew`'s four action loops are for CROWDS — a hero needs
   directed poses and an expression track, so this drives the Mascot directly.
   ⛔ `Mascot` draws its body at ~100% of `size` and the drawn head sits lower
   than the div's top edge, so anything placed relative to the head is measured
   off the render, never off the algebra (reel 109's floating crown).
   ------------------------------------------------------------------------ */
const Hero: React.FC<{ f: number; x: number; y: number; size: number; z?: number;
  lean?: number; bob?: number; shock?: number; stern?: number; xeyes?: number;
  cheer?: number; gaze?: number; flip?: boolean; costume?: Record<string, number> }> =
  ({ f, x, y, size, z = 50, lean = 0, bob = 0, shock = 0, stern = 0, xeyes = 0,
     cheer = 0, gaze = 0, flip = false, costume = { constr: 1 } }) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size + bob, width: size,
    height: size, zIndex: z,
    transform: `rotate(${lean}deg) ${flip ? "scaleX(-1)" : ""}`, transformOrigin: "50% 96%" }}>
    <Mascot lf={f} size={size} gaze={gaze} nodAmp={4.2} nodSpeed={11}
      shock={shock} stern={stern} xeyes={xeyes} cheer={cheer} {...costume} />
  </div>
);

/** a scribbled order slip, the reel's INPUT object, drawn at any size */
const Slip: React.FC<{ x: number; y: number; w: number; rot?: number; z?: number;
  o?: number; s?: number }> = ({ x, y, w, rot = 0, z = 60, o = 1, s = 1 }) => {
  const h = w * 0.76;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, opacity: o, transform: `rotate(${rot}deg) scale(${s})` }}>
      <div style={{ position: "absolute", left: w * 0.04, top: h * 0.06, width: w, height: h,
        borderRadius: 5, background: hexa("#140E08", 0.30) }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: CREAMB,
        border: `${Math.max(3, w * 0.035)}px solid ${dkh(CREAMB, 0.30)}` }} />
      {[0.18, 0.36, 0.54, 0.72].map((k, i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: w * 0.10, top: h * k,
          width: `${44 + ((i * 29) % 38)}%`, height: Math.max(4, w * 0.045), borderRadius: w * 0.03,
          background: INK, opacity: 0.84, transform: `rotate(${-4 + (i % 3) * 3}deg)` }} />
      ))}
      {/* two stray ticks, so it reads as HANDWRITING and not as ruled lines */}
      {[0, 1].map(i => (
        <div key={"tk" + i} style={{ position: "absolute", left: w * (0.62 + i * 0.14),
          top: h * (0.24 + i * 0.42), width: w * 0.16, height: Math.max(4, w * 0.042),
          borderRadius: w * 0.03, background: INK, opacity: 0.7,
          transform: `rotate(${i ? 48 : -40}deg)` }} />
      ))}
    </div>
  );
};


/** a wide lit bay opening — the frame-0 MEAN comes from the room, never from
    flattening the hero. Reused by all three concepts. */
const Bay: React.FC<{ p: any; top?: number; h?: number; l?: number; r?: number }> =
  ({ p, top = 108, h = 430, l = 66, r = 66 }) => (<>
  <div style={{ position: "absolute", left: l, top, right: r, height: h, zIndex: 11,
    borderRadius: 8,
    background: `linear-gradient(178deg, #FFFCF4 0%, ${mxh(p.key, 0.62)} 52%, ${mxh(p.back, 0.46)} 100%)` }} />
  {/* jambs and a head, so it is an OPENING and not a white panel */}
  {[l - 34, 1012 - r].map((x, i) => (
    <div key={"bj" + i} style={{ position: "absolute", left: x, top: top - 16, width: 34,
      height: h + 26, zIndex: 13, borderRadius: 4,
      background: `linear-gradient(90deg, ${mxh("#4A443C", 0.18)} 0%, ${dkh("#4A443C", 0.40)} 100%)` }} />
  ))}
  <div style={{ position: "absolute", left: l - 40, top: top - 40, right: r - 40, height: 40,
    zIndex: 13, borderRadius: 5,
    background: `repeating-linear-gradient(90deg, ${dkh("#4A443C", 0.10)} 0px, ${dkh("#4A443C", 0.10)} 24px, ${dkh("#4A443C", 0.36)} 24px, ${dkh("#4A443C", 0.36)} 48px)` }} />
  {/* distant shop shapes inside it, so the opening reads as DEPTH */}
  {[[150, 210, 140], [400, 168, 180], [690, 230, 130]].map(([x, hh, ww], i) => (
    <div key={"bd" + i} style={{ position: "absolute", left: x, top: top + h - hh, width: ww,
      height: hh, zIndex: 12, borderRadius: 5, background: hexa("#6B563E", 0.26 + i * 0.05) }} />
  ))}
</>);

/* =========================================================================
   1 · THE COUNTER — the EXCHANGE.
   A Claude behind a service counter, dead centre, owning the shot. You slide a
   scribbled note across. It reads it, turns, and puts a BENT part down in front
   of you. Then again. Then again. Three wrong parts end up in a row on the
   counter where you can count them, and the Claude shrugs at the third.

   Why this answers the note: the input, the worker and the output are all in
   one frame at all times, so there is nothing to work out. Nothing leaves the
   screen. The Claude is the focal point and it is SERVING, not standing.
   ====================================================================== */
export const HookCounter: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("counter");
  const SLIDE = [0, 26, 52], TAKE = SLIDE.map(k => k + 10);
  const PUT = [22, 48, 74];
  const n = PUT.filter(k => f >= k).length;
  const last = PUT.filter(k => f >= k).slice(-1)[0];
  const sh = PUT.reduce((a, k) => { const s = shake(f, k, 7, 8); return { x: a.x + s.x, y: a.y + s.y }; }, { x: 0, y: 0 });
  /* it ducks under the counter to fetch, and comes back up with the part */
  /* ⭐ AN ACTION IS A DISTANCE (§11): a 54px dip read as a nod. It now drops
     186px — most of its own height — so it clearly goes UNDER the counter to
     fetch and comes back up with the part. */
  const duck = PUT.reduce((a, k) => a + (f >= k - 14 && f < k + 2
    ? E(f, k - 14, k - 7, 0, 186, IO) - E(f, k - 7, k + 2, 0, 186, IO) : 0), 0);
  const CY = 618;
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.05]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="counter" f={f} lit={1.9} t={f * 0.3} rakeRate={3.4} />
        <Bay p={p} top={96} h={470} l={46} r={46} />
        <Pool x={506} y={CY - 110} w={1300} c={p.key} o={1.0} z={19} h={480} />

        {/* the shop working behind it — the background process every shot needs */}
        <Belt x={-70} y={392} w={1160} f={f} rate={7.6} z={24}
          carry={[{ o: 0.12, s: 0.72, wrong: true }, { o: 0.48, s: 0.72, wrong: true },
                  { o: 0.82, s: 0.72, wrong: true }]} />

        {/* the racks behind it, so the Claude is standing in a WORKPLACE */}
        {[168, 848].map((rx, i) => (
          <div key={"rk" + i} style={{ position: "absolute", left: rx - 96, top: 190, width: 192,
            height: 330, zIndex: 22, borderRadius: 6,
            background: `linear-gradient(168deg, ${mxh("#6E5A44", 0.34)} 0%, ${dkh("#6E5A44", 0.14)} 100%)`,
            border: `5px solid ${dkh("#6E5A44", 0.40)}` }}>
            {[0.16, 0.42, 0.68].map((k, j) => (
              <div key={"sh" + j} style={{ position: "absolute", left: 12, right: 12,
                top: `${k * 100}%`, height: 10, background: mxh("#6E5A44", 0.44) }} />
            ))}
            {[0, 1, 2].map(j => (
              <Part key={"rp" + j} x={96} y={72 + j * 88} s={0.62} z={4} kind={(i + j) % 4}
                c={STEEL} rot={-6 + j * 5} />
            ))}
          </div>
        ))}

        {/* ⭐ THE FOCAL POINT — 330px, dead centre, behind the counter */}
        <Hero f={f} x={506} y={CY + 14} size={330} z={50} bob={duck}
          gaze={f >= 16 && f < 22 ? 0.9 : 0}
          shock={last !== undefined && f >= last && f < last + 10 ? 0.5 : 0}
          stern={n >= 2 ? 0.7 : 0} xeyes={n >= 3 ? 0.6 : 0}
          cheer={n >= 3 && f >= 82 ? 1 : 0} />

        {/* the counter itself, cropped by the panel's bottom edge */}
        <div style={{ position: "absolute", left: -60, right: -60, top: CY, height: 320, zIndex: 62,
          background: `linear-gradient(180deg, ${mxh("#6E5A46", 0.54)} 0%, ${dkh("#6E5A46", 0.18)} 100%)` }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: CY - 16, height: 22, zIndex: 63,
          borderRadius: 5, background: mxh("#6E5A46", 0.68) }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"cp" + i} style={{ position: "absolute", left: 30 + i * 210, top: CY + 46,
            width: 176, height: 120, zIndex: 64, borderRadius: 5,
            border: `4px solid ${dkh("#6E5A46", 0.10)}`, background: mxh("#6E5A46", 0.30) }} />
        ))}

        {/* THE INPUT — a note slides in from the viewer's side, three times */}
        {SLIDE.map((k, i) => {
          const t = E(f, k, TAKE[i], 0, 1, OUT);
          if (f < k || f > TAKE[i] + 2) return null;
          return <Slip key={"in" + i} x={506} y={790 - t * 218} w={138} rot={-8 + t * 6} z={70} />;
        })}

        {/* THE OUTPUT — a BENT part put down on the counter, and it STAYS there */}
        {PUT.map((k, i) => {
          if (f < k) return null;
          const drop = E(f, k, k + 8, -300, 0, IN_Q);
          return (<React.Fragment key={"out" + i}>
            <Part x={252 + i * 254} y={CY - 54 + drop} s={1.28} wrong kind={i} c={OXIDE}
              z={68} rot={-10 + i * 7} />
            <Ring x={252 + i * 254} y={CY - 26} f={f} at={k + 7} r={190} c={p.key} z={69} />
            <Puff x={252 + i * 254} y={CY - 22} f={f} at={k + 7} n={9} s={0.9} z={69} />
          </React.Fragment>);
        })}

        <MarkCast x={880} y={188} s={120} z={72} f={f} spin={0.55} o={0.90} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   2 · THE BURIAL — the OVERWHELM.
   A Claude dead centre, holding one small scribbled note up over its head. A
   chute tips above it and the wrong parts rain down and PILE UP around it,
   burying it to the chest, then the shoulders, then the eyes — and it is still
   holding the note up.

   Why this answers the note: the whole story is one sentence you can read in
   half a second, the Claude is the subject the entire time, and every part that
   falls STAYS in frame and stacks where you can see the cost growing.
   ====================================================================== */
export const HookBurial: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("scrap");
  const TIP = 6;
  /* the pile height is the whole story, so it is one legible ramp with three
     stepped surges rather than a smooth fill */
  const fill = E(f, 12, 30, 0, 0.34, OUT) + E(f, 34, 56, 0, 0.33, OUT) + E(f, 60, 86, 0, 0.33, OUT);
  /* ⛔ the pile top, in PANEL PIXELS, clamped at the hero's eye line so the
     subject is buried TO the eyes and never past them */
  const TOP = 690 - fill * 220;   /* 690 (feet) -> 470 (eyes) */
  const CX = 506, GY = 640;
  const sh = [30, 56, 86].reduce((a, k) => { const s = shake(f, k, 6, 8); return { x: a.x + s.x, y: a.y + s.y }; }, { x: 0, y: 0 });
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.05]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="scrap" f={f} lit={1.05} t={f * 0.4} rakeRate={4.0} />
        <Bay p={p} top={130} h={400} l={92} r={92} />
        <Pool x={CX} y={GY + 60} w={1160} c={p.key} o={0.86} z={19} h={320} />

        {/* THE CHUTE above, tipping — the source, so the rain has somewhere to
            come FROM (ANIMATION-QUALITY §10: a hand-off needs a source) */}
        <div style={{ position: "absolute", left: 316, top: -30, width: 380, height: 150, zIndex: 30,
          borderRadius: "0 0 26px 26px", transformOrigin: "50% 0%",
          transform: `rotate(${E(f, TIP, TIP + 10, 0, 7, OUT)}deg)`,
          background: `linear-gradient(180deg, ${mxh("#5E5A52", 0.24)} 0%, ${dkh("#5E5A52", 0.40)} 100%)`,
          border: `7px solid ${dkh("#5E5A52", 0.54)}` }}>
          {[0.22, 0.5, 0.78].map((k, i) => (
            <div key={"cr" + i} style={{ position: "absolute", left: `${k * 100}%`, top: 10,
              width: 12, bottom: 16, background: dkh("#5E5A52", 0.22) }} />
          ))}
        </div>

        {/* ⭐ THE FOCAL POINT — 336px, centre, holding the note UP the whole time */}
        <Hero f={f} x={CX} y={GY} size={336} z={53}
          cheer={1}
          shock={f >= 26 && f < 40 ? 0.55 : 0}
          stern={fill > 0.34 && fill <= 0.66 ? 0.8 : 0}
          xeyes={fill > 0.66 ? 0.9 : 0} />
        {/* the note it is still holding up, above the head, above the pile */}
        <Slip x={CX + 4} y={GY - 356} w={132} rot={-7 + Math.sin(f / 13) * 3} z={88} />

        {/* THE RAIN — parts falling continuously from the chute onto the pile */}
        {Array.from({ length: 22 }, (_, i) => {
          const at = TIP + 4 + i * 3.4;
          const t = E(f, at, at + 15, 0, 1, IN_Q);
          if (f < at || t >= 1) return null;
          const tx = CX + (rnd(i, 3) - 0.5) * 420;
          return <Part key={"rn" + i} x={316 + (tx - 316) * t} y={110 + t * (GY - 190)}
            s={0.98 + rnd(i, 7) * 0.4} wrong kind={i % 4} c={i % 3 ? OXIDE : STEEL}
            z={70} rot={t * 340} />;
        })}

        {/* THE PILE — it rises AROUND the hero and is drawn in FRONT of it, so
            the Claude is progressively buried rather than standing behind junk */}
        {/* the mass of the pile, whose top edge IS the story */}
        <div style={{ position: "absolute", left: -80, right: -80, top: TOP + 40, bottom: -40,
          zIndex: 52, borderRadius: "42% 42% 0 0",
          background: `linear-gradient(180deg, ${mxh(OXIDE, 0.16)} 0%, ${dkh(OXIDE, 0.44)} 100%)` }} />
        {/* the parts lying ON its surface, following the top edge so the pile
            reads as made OF them rather than as a shape with junk in front */}
        {Array.from({ length: 26 }, (_, i) => {
          const u = (i % 13) / 12;                        /* across the pile */
          const band = Math.floor(i / 13);                /* two rows deep    */
          const px = 40 + u * 932;
          /* the surface is an arc: highest at the middle, falling to the sides */
          const surf = TOP + 74 + Math.pow(Math.abs(u - 0.5) * 2, 1.7) * 150 + band * 62;
          if (surf > 800) return null;
          return <Part key={"pl" + i} x={px} y={surf} s={1.05 + rnd(i, 5) * 0.32}
            wrong={i % 4 !== 0} kind={i % 4} c={i % 3 === 0 ? STEEL : OXIDE}
            z={54 + band * 2 + (i % 3)} rot={-34 + rnd(i, 9) * 68} lit={0.9 + band * 0.2} />;
        })}
        {/* the pile's near rim, cropped by the bottom of the panel */}
        <div style={{ position: "absolute", left: -80, right: -80, top: 706, height: 200,
          zIndex: 76, borderRadius: "38% 38% 0 0",
          background: `linear-gradient(180deg, ${dkh(OXIDE, 0.30)} 0%, ${dkh(OXIDE, 0.60)} 100%)` }} />

        {[30, 56, 86].map((k, i) => (<React.Fragment key={"br" + i}>
          <Puff x={CX} y={TOP + 60} f={f} at={k} n={13} s={1.3} z={80} />
          <Ring x={CX} y={TOP + 56} f={f} at={k} r={230} c={p.key} z={79} />
        </React.Fragment>))}

        <MarkCast x={874} y={196} s={118} z={88} f={f} spin={0.55} o={0.88} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   3 · THE CRANK — the LOOP.
   A Claude working a hand press, centre-left, at readable size. It feeds the
   scribbled note in, throws its weight onto the wheel, and a BENT part clatters
   out into the tray beside it. It does it again, faster. And again, faster
   still, steam coming off its head. Three bent parts in the tray by the end.

   Why this answers the note: it is the clearest input -> operation -> output
   loop of the three, the machine gives the Claude something to physically DO,
   and the tray is the counter — the cost is a thing you can see mounting.
   ⭐ ANIMATION-QUALITY §11: EFFORT wants an EMITTER on the STILLEST part of the
   hero, so the steam comes off its head while its arms do the work.
   ====================================================================== */
export const HookCrank: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("press");
  const FEED = [2, 30, 56], PULL = [8, 34, 58], OUT_ = [22, 46, 70];
  const n = OUT_.filter(k => f >= k).length;
  const sh = OUT_.reduce((a, k) => { const s = shake(f, k, 13, 11); return { x: a.x + s.x, y: a.y + s.y }; }, { x: 0, y: 0 });
  /* the wheel spins while it cranks, and each round is FASTER than the last */
  const speed = [0, 13, 19, 27][n] || 27;
  const spin = PULL.reduce((a, k, i) => a + (f >= k ? Math.min(f - k, 20) * (13 + i * 7) : 0), 0);
  /* it throws its weight onto the wheel: a real lean, not a wobble */
  const lean = PULL.reduce((a, k) => a + (f >= k && f < k + 16
    ? E(f, k, k + 5, 0, 13, OUT) - E(f, k + 5, k + 16, 0, 13, IO) : 0), 0);
  const GY = 636, WX = 636;
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.06]} vig={0.16}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="press" f={f} lit={2.0} t={f * 0.42} rakeRate={4.2} />
        <Bay p={p} top={88} h={500} l={40} r={40} />
        {/* the lit working apron in front of the press — the floor is the last
            dark band in this frame and it is also where the light would land */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 560, height: 260, zIndex: 18,
          background: `linear-gradient(180deg, ${mxh(p.floor, 0.76)} 0%, ${mxh(p.floor, 0.46)} 100%)` }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 554, height: 12, zIndex: 19,
          background: mxh(p.lip, 0.44) }} />
        <Pool x={506} y={GY - 50} w={1340} c={p.key} o={1.0} z={19} h={580} />

        {/* THE PRESS — the interesting component. A body, a slot the note goes
            into, a spoked wheel the Claude turns, and a spout the part falls out of. */}
        <div style={{ position: "absolute", left: 300, top: 268, width: 286, height: 382, zIndex: 34,
          borderRadius: 10,
          background: `linear-gradient(166deg, ${mxh("#7C818C", 0.30)} 0%, ${dkh("#7C818C", 0.34)} 100%)`,
          border: `8px solid ${dkh("#7C818C", 0.52)}` }}>
          {/* the feed slot */}
          <div style={{ position: "absolute", left: 44, top: 40, width: 200, height: 34,
            borderRadius: 5, background: "#17140F" }} />
          {/* a louvred vent and a gauge, so it is a MACHINE and not a box */}
          <div style={{ position: "absolute", left: 40, top: 110, width: 116, height: 92,
            borderRadius: 5, overflow: "hidden", background: dkh("#7C818C", 0.46) }}>
            {[0, 1, 2, 3].map(i => (
              <div key={"lv" + i} style={{ position: "absolute", left: 0, right: 0, top: 8 + i * 22,
                height: 10, background: mxh("#7C818C", 0.30) }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: 178, top: 120, width: 72, height: 72,
            borderRadius: "50%", background: CREAMB, border: `6px solid ${dkh("#7C818C", 0.44)}` }}>
            <div style={{ position: "absolute", left: "46%", top: "12%", width: 5, height: "42%",
              background: RED, transformOrigin: "50% 100%",
              transform: `rotate(${40 + n * 42 + Math.sin(f / 4) * 9}deg)` }} />
          </div>
          {/* ⭐ THE RAM — the press has to visibly DO something, or the Claude is
              turning a wheel attached to a cupboard. It slams on every cycle. */}
          <div style={{ position: "absolute", left: 40, top: 96 + OUT_.reduce((a, k) => a +
            (f >= k - 12 && f < k + 10 ? E(f, k - 12, k - 2, 0, 150, IN_Q) - E(f, k - 2, k + 10, 0, 150, OUT) : 0), 0),
            width: 206, height: 92, borderRadius: 6, zIndex: 8,
            background: `linear-gradient(180deg, ${dkh("#7C818C", 0.10)} 0%, ${dkh("#7C818C", 0.44)} 100%)`,
            border: `6px solid ${dkh("#7C818C", 0.52)}` }} />

          {/* the spout the wrong part comes out of */}
          <div style={{ position: "absolute", left: 196, top: 300, width: 150, height: 74,
            borderRadius: "0 0 18px 0", background: dkh("#7C818C", 0.28),
            border: `6px solid ${dkh("#7C818C", 0.50)}` }} />
        </div>

        {/* THE WHEEL it turns */}
        <div style={{ position: "absolute", left: WX - 130, top: 340, width: 260, height: 260,
          zIndex: 40, borderRadius: "50%", transform: `rotate(${spin}deg)`,
          background: `radial-gradient(circle, ${mxh(BRASS, 0.20)} 34%, ${dkh(BRASS, 0.30)} 36%, ${dkh(BRASS, 0.30)} 100%)`,
          border: `10px solid ${dkh(BRASS, 0.44)}` }}>
          {[0, 60, 120].map((a, i) => (
            <div key={"sp" + i} style={{ position: "absolute", left: "50%", top: 12, width: 18,
              height: 232, marginLeft: -9, background: mxh(BRASS, 0.10),
              transformOrigin: "50% 50%", transform: `rotate(${a}deg)` }} />
          ))}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 40, height: 40,
            marginLeft: -20, marginTop: -20, borderRadius: "50%", background: dkh(BRASS, 0.42) }} />
        </div>

        {/* ⭐ THE FOCAL POINT — 316px, and it is WORKING the wheel */}
        <Hero f={f} x={790} y={GY} size={330} z={50} flip lean={-lean}
          shock={OUT_.some(k => f >= k && f < k + 9) ? 0.5 : 0}
          stern={n >= 1 && n < 3 ? 0.7 : 0} xeyes={n >= 3 ? 0.85 : 0} />

        {/* ⭐ EFFORT IS AN EMITTER ON THE STILLEST PART — steam off its head
            while the arms do the work. It gets heavier every round. */}
        {n >= 1 && Array.from({ length: 7 }, (_, i) => {
          const t = ((f * 2.4 + i * 17) % 60) / 60;
          return (<div key={"st" + i} style={{ position: "absolute",
            left: 766 + Math.sin(f / 7 + i) * 26 + i * 5, top: GY - 344 - t * 150,
            width: 20 + t * 30, height: 20 + t * 30, borderRadius: "50%", zIndex: 54,
            background: "#F4EDE0", opacity: Math.max(0, (0.20 + n * 0.10) * (1 - t)) }} />);
        })}

        <Belt x={-70} y={318} w={1160} f={f} rate={8.2} z={22}
          carry={[{ o: 0.2, s: 0.66 }, { o: 0.68, s: 0.66 }]} />

        {/* THE INPUT — the note fed into the slot */}
        {FEED.map((k, i) => {
          const t = E(f, k, k + 8, 0, 1, IN_Q);
          if (f < k || t >= 1) return null;
          return <Slip key={"fd" + i} x={690 - t * 250} y={312 + t * 8} w={124}
            rot={-10 + t * 10} z={60} o={1 - Math.max(0, (t - 0.8) * 5)} />;
        })}

        {/* THE OUTPUT — bent parts clattering into the tray, and STAYING there */}
        <div style={{ position: "absolute", left: 108, top: GY - 46, width: 330, height: 96,
          zIndex: 66, borderRadius: 8,
          background: `linear-gradient(180deg, ${mxh("#8A8074", 0.34)} 0%, ${dkh("#8A8074", 0.22)} 100%)`,
          border: `6px solid ${dkh("#8A8074", 0.44)}` }} />
        {OUT_.map((k, i) => {
          if (f < k) return null;
          const t = E(f, k, k + 9, 0, 1, IN_Q);
          return (<React.Fragment key={"op" + i}>
            <Part x={410 - t * 158 - i * 6} y={520 + t * (GY - 566) + i * 4} s={1.20}
              wrong kind={i} c={OXIDE} z={68} rot={-t * 200 - i * 8} />
            <Ring x={262} y={GY - 40} f={f} at={k + 9} r={170} c={p.key} z={70} />
            <Puff x={262} y={GY - 34} f={f} at={k + 9} n={10} s={1.0} z={70} />
          </React.Fragment>);
        })}

        <MarkCast x={170} y={192} s={116} z={72} f={f} spin={0.55} o={0.88} />
      </div>
    </Scene>
  );
};
