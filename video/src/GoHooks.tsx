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

   ⛔⛔ AND ROUND 2's MISS, WHICH IS THE ONE THAT MATTERS MOST:
     *"these dont represent hitting a Claude limit"*
   Round 2 drew the WASTE — scrap, retries, a Claude buried in its own rejects —
   and the VO's line is *"the people who never hit their Claude limit"*. The
   dread is not "I made a mess", it is **I RAN OUT, MID-TASK**. THE-OPEN law 3:
   the strongest interrupt is the viewer seeing a thing they personally DREAD,
   recognised in under a second with no narration. So every concept below is
   built around a LIMIT as a physical mechanism — a supply that empties, a
   shutter that comes down, a line that will not move — with the waste kept on
   screen as the CAUSE, because that is what the rest of the reel then fixes.
   ⛔ And not as a UI screenshot: Alex has killed a text/UI open three times
   (reels 68, 85, 86 — *"object scenes not UI"*). It is drawn as objects.

   THE FOUR RULES FROM ROUND 2, STILL BINDING ON ALL THREE:
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



/** ⭐ THE LIMIT BAR — a status bar riding above the hero's head. It FILLS as it
    pushes (green to amber to red), runs into a hard CAP MARK at the right end,
    and locks there flashing on the frame it hits the barrier. A bar filling
    into a cap is the most recognisable "you have run out" object there is, and
    it says it with no words at all: the cap is a LINE the fill cannot pass,
    which is the same sentence the barrier makes, stated on the character.
    ⛔ Wordless on purpose — the reel's text budget is one chip per shot and the
    header band is already spending it. */
const LimitBar: React.FC<{ x: number; y: number; f: number; full: number; at: number;
  w?: number; z?: number; /** true = it EMPTIES to nothing instead of filling to a cap */
  drain?: boolean }> = ({ x, y, f, full, at, w = 268, z = 70, drain = false }) => {
  const h = 54;
  const maxed = f >= at;
  /* it pops on the frame it maxes, then pulses while it stays pinned */
  const pop = maxed ? squash(f, at, 0.22, 3, 12) : 1;
  const flash = maxed ? 0.5 + Math.abs(Math.sin((f - at) / 3.4)) * 0.5 : 0;
  const fillC = drain ? (full < 0.16 ? RED : full < 0.45 ? GOLD : "#3F9E74")
    : (full > 0.86 ? RED : full > 0.6 ? GOLD : "#3F9E74");
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `scale(${pop})` }}>
      {/* the little stem tying it to the head, so it reads as HIS bar */}
      <div style={{ position: "absolute", left: w / 2 - 5, top: h - 6, width: 10, height: 22,
        background: dkh("#2A241E", 0.10), borderRadius: 3 }} />
      {/* the trough */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 12,
        background: dkh("#2A241E", 0.06), border: `6px solid ${dkh("#2A241E", 0.34)}` }} />
      {/* the fill */}
      <div style={{ position: "absolute", left: 8, top: 8, width: (w - 16) * full, height: h - 16,
        borderRadius: 7,
        background: maxed ? mxh(RED, flash * 0.34) : `linear-gradient(90deg, ${mxh(fillC, 0.20)} 0%, ${fillC} 100%)` }} />
      {/* graduations across the trough */}
      {[0.2, 0.4, 0.6, 0.8].map((k, i) => (
        <div key={"gg" + i} style={{ position: "absolute", left: 8 + (w - 16) * k, top: 8,
          width: 3, height: h - 16, background: hexa("#2A241E", 0.34) }} />
      ))}
      {/* ⭐ THE CAP MARK — the line the fill runs into and cannot pass */}
      <div style={{ position: "absolute", left: drain ? 8 : w - 20, top: -12, width: 12,
        height: h + 24, borderRadius: 4, background: maxed ? RED : dkh("#2A241E", 0.40) }} />
      {/* and it throws a ring the moment it reaches the end */}
      <Ring x={drain ? 14 : w - 14} y={h / 2} f={f} at={at} r={110} c={RED} z={4} w={5} />
    </div>
  );
};

/* =========================================================================
   1 · THE GAUGE — the SUPPLY RUNS OUT, AND THE SCRAP IS WHAT DRAINED IT.
   A Claude working its machine, and beside it a colossal gauge. Every wrong
   part that clatters out knocks the needle down a step: full, half, into the
   red, EMPTY. On empty the machine's lamp dies, the hum stops and the Claude
   slumps with its eyes crossed, still holding the note it was given.

   ⭐ This is the only one of the three that shows the limit AND its cause in
   one frame: the tray fills with retries on the left while the needle falls on
   the right, so the sentence the picture makes is *the retries did this*, which
   is exactly what the rest of the reel goes on to fix.
   ====================================================================== */
export const HookGauge: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("press");
  const OUT_ = [14, 38, 60], DEAD = 78;
  const n = OUT_.filter(k => f >= k).length;
  const dead = f >= DEAD;
  /* the needle falls in STEPS, one per wrong part, then slams to empty */
  const steps = [0, 0.30, 0.58, 0.82, 1];
  const idx = dead ? 4 : n;
  const at = dead ? DEAD : (OUT_[n - 1] ?? -99);
  const swing = idx === 0 ? 0 : E(f, at, at + 7, steps[idx - 1] * 150, steps[idx] * 150, OUT)
    + (idx > 0 ? rock(f, at + 7, 5.5, 15) : 0);
  const sh = [...OUT_, DEAD].reduce((a, k) => {
    const s = shake(f, k, k === DEAD ? 15 : 8, k === DEAD ? 12 : 8); return { x: a.x + s.x, y: a.y + s.y };
  }, { x: 0, y: 0 });
  const GY = 640, GX = 700;
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.05]} vig={0.18}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="press" f={f} lit={dead ? 1.5 : 2.0} t={f * 0.42} rakeRate={4.2} />
        <Bay p={p} top={88} h={470} l={40} r={40} />
        {/* the lit working apron — the floor is otherwise the darkest band */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 552, height: 270, zIndex: 18,
          background: `linear-gradient(180deg, ${mxh(p.floor, 0.74)} 0%, ${mxh(p.floor, 0.42)} 100%)` }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 546, height: 12, zIndex: 19,
          background: mxh(p.lip, 0.44) }} />
        <Belt x={-70} y={312} w={1160} f={f} rate={dead ? 0 : 8.0} z={22}
          carry={[{ o: 0.22, s: 0.64 }, { o: 0.7, s: 0.64 }]} />

        {/* the machine the Claude is working */}
        <div style={{ position: "absolute", left: 128, top: 300, width: 250, height: 330, zIndex: 34,
          borderRadius: 10,
          background: `linear-gradient(166deg, ${mxh("#7C818C", 0.30)} 0%, ${dkh("#7C818C", 0.34)} 100%)`,
          border: `8px solid ${dkh("#7C818C", 0.50)}` }}>
          <div style={{ position: "absolute", left: 34, top: 34, width: 174, height: 30,
            borderRadius: 5, background: "#17140F" }} />
          {[0, 1, 2, 3].map(i => (
            <div key={"lv" + i} style={{ position: "absolute", left: 32, right: 32, top: 96 + i * 26,
              height: 11, borderRadius: 3, background: mxh("#7C818C", 0.20) }} />
          ))}
          {/* ⭐ THE RUNNING LAMP — green while it has supply, dead red after */}
          <div style={{ position: "absolute", left: 92, top: 232, width: 62, height: 62,
            borderRadius: "50%", border: `7px solid ${dkh("#7C818C", 0.48)}`,
            background: dead ? dkh(RED, 0.34) : mxh("#3F9E74", 0.30 + Math.sin(f / 5) * 0.14) }} />
        </div>

        {/* ⭐⭐ THE LIMIT, AS AN OBJECT — a colossal gauge on a stand. Red zone
            on the left, graduations, and a needle that falls a step per retry.
            No words: a dial is read by where the needle IS. */}
        <div style={{ position: "absolute", left: GX - 32, top: 400, width: 64, height: 300,
          zIndex: 36, background: `linear-gradient(94deg, ${mxh("#4A423A", 0.20)} 0%, ${dkh("#4A423A", 0.42)} 100%)` }} />
        <div style={{ position: "absolute", left: GX - 208, top: 122, width: 416, height: 416,
          zIndex: 40, borderRadius: "50%",
          background: `linear-gradient(160deg, ${mxh(BRASS, 0.28)} 0%, ${dkh(BRASS, 0.40)} 100%)`,
          border: `16px solid ${dkh(BRASS, 0.46)}` }}>
          <div style={{ position: "absolute", inset: 26, borderRadius: "50%", background: CREAMB,
            border: `6px solid ${dkh(CREAMB, 0.26)}` }} />
          {/* the RED ZONE, drawn as a swept sector at the empty end */}
          <div style={{ position: "absolute", inset: 34, borderRadius: "50%", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: "50%", width: "50%", height: "50%",
              transformOrigin: "100% 0%", transform: "rotate(-38deg)",
              background: hexa(RED, dead ? 0.62 + Math.sin(f / 3) * 0.24 : 0.30) }} />
          </div>
          {/* graduations */}
          {Array.from({ length: 11 }, (_, i) => (
            <div key={"gd" + i} style={{ position: "absolute", left: "50%", top: 44,
              width: i % 5 === 0 ? 12 : 6, marginLeft: i % 5 === 0 ? -6 : -3,
              height: i % 5 === 0 ? 40 : 24, background: hexa(INK, i % 5 === 0 ? 0.74 : 0.42),
              transformOrigin: `50% ${166}px`, transform: `rotate(${-75 + i * 15}deg)` }} />
          ))}
          {/* the needle, and it falls in STEPS */}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 16, height: 152,
            marginLeft: -8, borderRadius: 8, background: dead ? RED : CLAYD,
            transformOrigin: "50% 100%", transform: `translateY(-100%) rotate(${75 - swing}deg)` }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 52, height: 52,
            marginLeft: -26, marginTop: -26, borderRadius: "50%", background: dkh(BRASS, 0.30),
            border: `6px solid ${dkh(BRASS, 0.48)}` }} />
        </div>

        {/* ⭐ THE FOCAL POINT — 330px, working, and it POWERS DOWN on empty */}
        <Hero f={f} x={432} y={GY} size={330} z={50}
          lean={dead ? E(f, DEAD, DEAD + 10, 0, 15, OUT) : 0}
          bob={dead ? E(f, DEAD, DEAD + 10, 0, 30, OUT) : 0}
          shock={OUT_.some(k => f >= k && f < k + 8) ? 0.5 : 0}
          stern={n >= 2 && !dead ? 0.8 : 0} xeyes={dead ? 1 : 0} />
        {/* the note it was given, still in its hand */}
        <Slip x={330} y={GY - 214} w={104} rot={-9 + Math.sin(f / 13) * 3} z={58} />

        {/* THE CAUSE, kept on screen — the retries stacking in the tray */}
        <div style={{ position: "absolute", left: 60, top: GY - 42, width: 300, height: 92,
          zIndex: 66, borderRadius: 8,
          background: `linear-gradient(180deg, ${mxh("#8A8074", 0.34)} 0%, ${dkh("#8A8074", 0.22)} 100%)`,
          border: `6px solid ${dkh("#8A8074", 0.44)}` }} />
        {OUT_.map((k, i) => {
          if (f < k) return null;
          const t = E(f, k, k + 9, 0, 1, IN_Q);
          return (<React.Fragment key={"op" + i}>
            <Part x={256 - t * 96 - i * 66} y={470 + t * (GY - 512) + i * 3} s={1.14}
              wrong kind={i} c={OXIDE} z={68} rot={-t * 190 - i * 8} />
            <Ring x={160 - i * 66} y={GY - 36} f={f} at={k + 9} r={160} c={p.key} z={70} />
            <Puff x={160 - i * 66} y={GY - 30} f={f} at={k + 9} n={9} s={0.9} z={70} />
          </React.Fragment>);
        })}

        {/* the whole shop dims the instant the supply is gone */}
        {dead && (
          <div style={{ position: "absolute", inset: 0, zIndex: 92, pointerEvents: "none",
            background: hexa("#1A0E08", E(f, DEAD, DEAD + 8, 0, 0.20, OUT)) }} />
        )}
        <MarkCast x={906} y={664} s={110} z={72} f={f} spin={0.55} o={0.86} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   2 · THE SHUTTER — CUT OFF, MID-TASK.
   The purest form of the thing: a Claude at its bench, half way through a part,
   and a heavy steel shutter comes down out of nowhere and stops in front of it.
   It gets its hands on it, heaves, and it does not move. The unfinished part is
   still on the bench on the wrong side of it.

   ⭐ THE-OPEN's pattern-interrupt test wants something physically surprising by
   frame 15-30. The shutter lands on frame 26 and takes two thirds of the panel
   in nine frames, which is the biggest single event in anything built for this
   hook.
   ====================================================================== */
export const HookShutter: React.FC<{ headBar?: boolean }> = ({ headBar = false }) => {
  const f = useCurrentFrame();
  const p = placeFor("press");
  const GY = 648, SH_Y = 300;
  /* ⭐ THE MISSING SOURCE (§10): a shutter that just falls is an act of god.
     A METER above the bench drains a segment at a time while it works, and the
     LAST segment is what trips it — so the drop has a cause you watched happen. */
  const BARS = [8, 14, 20, 24];
  const lit = 5 - BARS.filter(k => f >= k).length;
  const WARN = 24, DROP = 28, LAND = 37;
  const down = E(f, DROP, LAND, -(SH_Y + 660), 0, IN_Q);
  const landed = f >= LAND;
  const bounce = landed ? rock(f, LAND, 13, 24) : 0;
  const sh = shake(f, LAND, 26, 16);
  const heave = [50, 72].reduce((a, k) => a + (f >= k && f < k + 16
    ? E(f, k, k + 6, 0, 18, OUT) - E(f, k + 6, k + 16, 0, 18, IO) : 0), 0);
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.05]} vig={0.18}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        {/* ⭐ THE MISSING CONSEQUENCE (§10): when the shutter lands, the WHOLE
            WORLD stops at once — the belt halts, the sparks die, the machine
            lamp goes out and the warm key snaps cold. One frame, everything.
            That simultaneous death is the elevation; the slam on its own was
            just a big object arriving. */}
        <SetFor k="press" f={f} lit={landed ? 1.05 : 2.0} t={landed ? LAND * 0.42 : f * 0.42}
          rakeRate={landed ? 0.2 : 4.2} />
        <Bay p={p} top={88} h={430} l={40} r={40} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 556, height: 270, zIndex: 18,
          background: `linear-gradient(180deg, ${mxh(p.floor, landed ? 0.40 : 0.74)} 0%, ${mxh(p.floor, landed ? 0.14 : 0.42)} 100%)` }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 550, height: 12, zIndex: 19,
          background: mxh(p.lip, landed ? 0.18 : 0.44) }} />
        {/* the shop's belt, running — and DEAD the instant the shutter lands */}
        <Belt x={-70} y={470} w={1160} f={landed ? LAND : f} rate={landed ? 0 : 8.4} z={22}
          carry={[{ o: 0.16, s: 0.62 }, { o: 0.6, s: 0.62 }]} />

        {/* ⭐⭐ THE METER — five segments, draining as it works. The number
            spine of the whole idea, drawn as lamps rather than a readout.
            `headBar` moves it off the wall and onto the character, so the limit
            reads as HIS allowance rather than the building's. */}
        {headBar && <LimitBar x={506} y={GY - 356} f={f} at={WARN}
          full={1 - E(f, 0, WARN, 0, 0.98, LIN)} drain z={80} />}
        {!headBar && <div style={{ position: "absolute", left: 336, top: 158, width: 340, height: 78, zIndex: 34,
          borderRadius: 10, background: dkh("#4A423A", 0.28),
          border: `7px solid ${dkh("#4A423A", 0.50)}` }}>
          {[0, 1, 2, 3, 4].map(i => {
            const on = i < lit;
            const died = BARS[4 - 1 - i];
            return (<div key={"bar" + i} style={{ position: "absolute", left: 14 + i * 63, top: 13,
              width: 52, height: 46, borderRadius: 5,
              background: on ? mxh("#3F9E74", 0.24) : dkh("#4A423A", 0.44),
              transform: `scale(${!on && died !== undefined && f >= died && f < died + 7
                ? 1 + E(f, died, died + 3, 0, 0.24, OUT) - E(f, died + 3, died + 7, 0, 0.24, IO) : 1})` }} />);
          })}
        </div>}
        {/* the warning lamp on the meter's end, hammering before the drop */}
        <div style={{ position: "absolute", left: 700, top: 166, width: 62, height: 62,
          borderRadius: "50%", zIndex: 34, border: `8px solid ${dkh("#4A423A", 0.44)}`,
          background: f >= WARN && !landed ? mxh(RED, 0.16 + Math.abs(Math.sin(f / 1.7)) * 0.56)
            : landed ? mxh(RED, 0.30) : dkh(RED, 0.46) }} />

        {/* ⭐ THE FOCAL POINT — working, then shut out in FRONT of the shutter */}
        <Hero f={f} x={506} y={GY} size={336} z={76}
          lean={landed ? -heave : Math.sin(f / 5) * 5}
          bob={landed ? -heave * 0.8 : 0}
          cheer={landed ? 1 : 0}
          shock={f >= LAND && f < LAND + 14 ? 0.9 : 0}
          stern={f >= LAND + 14 && f < 82 ? 0.9 : 0}
          xeyes={f >= 82 ? 1 : 0} />

        {/* the bench, the part it was cutting, and the SPARKS — which die too */}
        <div style={{ position: "absolute", left: 236, top: GY - 46, width: 540, height: 94,
          zIndex: 60, borderRadius: 8,
          background: `linear-gradient(180deg, ${mxh("#8A8074", landed ? 0.14 : 0.34)} 0%, ${dkh("#8A8074", 0.22)} 100%)`,
          border: `6px solid ${dkh("#8A8074", 0.44)}` }} />
        <Part x={300} y={GY - 74} s={1.16} kind={1} c={STEEL} z={62} rot={-6} />
        {!landed && Array.from({ length: 9 }, (_, i) => {
          const a = rnd(i, 3) * Math.PI - Math.PI / 2;
          const d = ((f * 8 + i * 11) % 44);
          return (<div key={"sp" + i} style={{ position: "absolute",
            left: 300 + Math.cos(a) * d * 1.8, top: GY - 96 + Math.sin(a) * d * 0.9 + d * 0.6,
            width: 10, height: 10, borderRadius: 5, background: GOLD, zIndex: 63,
            opacity: Math.max(0, 0.9 - d / 44) }} />);
        })}

        {/* ⭐ the note it was holding is KNOCKED OUT of its hands on the slam and
            flutters down — the small secondary motion that sells a big impact */}
        {!landed
          ? <Slip x={742} y={GY - 82} w={112} rot={7} z={62} />
          : <Slip x={742 + E(f, LAND, LAND + 30, 0, 60, OUT)}
              y={GY - 82 - Math.sin(Math.min(1, (f - LAND) / 30) * Math.PI) * 210}
              w={112} rot={7 + (f - LAND) * 7} z={62} />}

        {/* ⭐ DEBRIS — bolts jumping off the bench on the hit. WEIGHT IS
            DEFORMATION (§11): the frame shakes, the world jumps, things fall. */}
        {landed && [0, 1, 2, 3, 4].map(i => {
          const t = Math.min(1, (f - LAND) / 22);
          return (<div key={"db" + i} style={{ position: "absolute",
            left: 280 + i * 118 + Math.sin(i) * 20, top: GY - 60 - Math.sin(t * Math.PI) * (60 + i * 14) + t * t * 90,
            width: 18, height: 18, borderRadius: 4, background: dkh(STEEL, 0.20), zIndex: 64,
            transform: `rotate(${t * 300}deg)`, opacity: 1 - Math.max(0, (t - 0.85) * 6) }} />);
        })}

        {/* ⭐⭐ THE LIMIT — the shutter. Two thirds of the panel in nine frames. */}
        <div style={{ position: "absolute", left: -40, right: -40, top: SH_Y + down + bounce,
          height: 560, zIndex: 70,
          background: `repeating-linear-gradient(180deg, ${mxh("#6E6A63", 0.34)} 0px, ${mxh("#6E6A63", 0.34)} 26px, ${dkh("#6E6A63", 0.16)} 26px, ${dkh("#6E6A63", 0.16)} 52px)`,
          borderBottom: `18px solid ${dkh("#6E6A63", 0.52)}` }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: -14, height: 32,
            background: dkh("#6E6A63", 0.44) }} />
          {[300, 720].map((x, i) => (
            <div key={"lg" + i} style={{ position: "absolute", left: x, bottom: -6, width: 96,
              height: 40, borderRadius: 6, background: dkh("#6E6A63", 0.56) }} />
          ))}
        </div>
        {[-40, 972].map((x, i) => (
          <div key={"gr" + i} style={{ position: "absolute", left: x, top: -40, width: 80,
            height: 1000, zIndex: 74,
            background: `linear-gradient(90deg, ${mxh("#4A443C", 0.20)} 0%, ${dkh("#4A443C", 0.40)} 100%)` }} />
        ))}
        {f >= LAND + 6 && (
          <div style={{ position: "absolute", left: 452, top: SH_Y + 516 + bounce, width: 108,
            height: 76, zIndex: 78, borderRadius: 8,
            transform: `scale(${squash(f, LAND + 6, 0.24, 3, 12)})`,
            background: `linear-gradient(180deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
            border: `6px solid ${dkh(BRASS, 0.46)}` }}>
            <div style={{ position: "absolute", left: 30, top: -30, width: 48, height: 44,
              borderRadius: "24px 24px 0 0", border: `10px solid ${dkh(BRASS, 0.40)}`,
              borderBottom: "none" }} />
          </div>
        )}

        {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART (§11) */}
        {landed && f >= 50 && Array.from({ length: 7 }, (_, i) => {
          const t = ((f * 2.6 + i * 16) % 54) / 54;
          return (<div key={"stm" + i} style={{ position: "absolute",
            left: 470 + Math.sin(f / 7 + i) * 30 + i * 6, top: GY - 356 - t * 150,
            width: 22 + t * 30, height: 22 + t * 30, borderRadius: "50%", zIndex: 79,
            background: "#F4EDE0", opacity: Math.max(0, 0.32 * (1 - t)) }} />);
        })}

        <Puff x={506} y={SH_Y + 560} f={f} at={LAND} n={24} s={2.1} z={82} spread={1.7} />
        <Ring x={506} y={SH_Y + 554} f={f} at={LAND} r={430} c={p.key} z={81} />
        <MarkCast x={880} y={196} s={112} z={30} f={f} spin={landed ? 0 : 0.55} o={0.88} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   3 · THE LINE — YOU CANNOT GO FURTHER.
   A Claude pushing a barrow piled with the day's retries toward a hard red
   limit line across the shop floor. The barrow hits the barrier, the load
   pitches forward, and it heaves against it with steam coming off its head.
   The barrier does not move.

   ⭐ The waste is IN the barrow, so the cause is being pushed by the character
   into the thing that stops it: one object carrying both halves of the idea.
   ====================================================================== */
export const HookLine: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("press");
  const HIT = 26;
  const push0 = E(f, 0, HIT, 0, 250, IO);
  const hit = f >= HIT;
  const strain = [38, 58, 76].reduce((a, k) => a + (f >= k && f < k + 18
    ? E(f, k, k + 7, 0, 22, OUT) - E(f, k + 7, k + 18, 0, 22, IO) : 0), 0);
  const x0 = 250 + push0 + strain;
  const sh = shake(f, HIT, 20, 13);
  const GY = 648, BAR = 700;
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.05]} vig={0.18}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="press" f={f} lit={2.0} t={f * 0.42} rakeRate={4.2} />
        <Bay p={p} top={88} h={430} l={40} r={40} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 556, height: 270, zIndex: 18,
          background: `linear-gradient(180deg, ${mxh(p.floor, 0.74)} 0%, ${mxh(p.floor, 0.42)} 100%)` }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 550, height: 12, zIndex: 19,
          background: mxh(p.lip, 0.44) }} />

        <Belt x={-70} y={318} w={1160} f={f} rate={8.6} z={21}
          carry={[{ o: 0.2, s: 0.6, wrong: true }, { o: 0.7, s: 0.6, wrong: true }]} />

        {/* ⭐⭐⭐ THE OTHER HALF OF THE VO'S OWN SENTENCE. The line is *"the
            people who NEVER hit their Claude limit"*, and until now the picture
            only had the person who does. Past the barrier, in the light, a
            second Claude walks away with a finished part, entirely untroubled.
            That is the comparison the hook is actually making, and it costs one
            small sprite to say it. */}
        {/* the lit bay beyond the line, and the walkway it is walking away on */}
        <div style={{ position: "absolute", left: 748, top: 110, width: 300, height: 320, zIndex: 24,
          borderRadius: 8, background: `linear-gradient(180deg, #FFF8EA 0%, ${mxh(p.key, 0.52)} 100%)` }} />
        <div style={{ position: "absolute", left: 716, top: 366, width: 340, height: 28, zIndex: 27,
          borderRadius: 4, background: `linear-gradient(180deg, ${mxh("#4A443C", 0.34)} 0%, ${dkh("#4A443C", 0.30)} 100%)` }} />
        {/* ⭐ it walks AWAY, right to left out of the lit bay, unbothered, with a
            finished part under its arm. Small and far, so the hierarchy holds. */}
        <Hero f={f} x={800 + E(f, 4, 92, 0, 170, LIN)} y={362} size={196} z={28}
          costume={{ glasses: 1 }} bob={Math.abs(Math.sin(f / 8)) * -12} lean={Math.sin(f / 8) * 5} />
        {/* the finished part under its arm — the thing our hero never gets to */}
        <Part x={742 + E(f, 4, 92, 0, 170, LIN)} y={296} s={0.86} z={29}
          rot={Math.sin(f / 11) * 6} />

        {/* ⭐⭐ THE LIMIT — hazard-striped, bolted down, and it FLEXES on the hit
            without moving. WEIGHT IS DEFORMATION (§11): a barrier that is
            perfectly rigid reads as scenery; one that shudders reads as solid. */}
        {(() => {
          const flex = hit ? rock(f, HIT, 3.0, 20) + strain * 0.10 : 0;
          return (<>
            {[BAR - 40, BAR + 210].map((x, i) => (
              <div key={"po" + i} style={{ position: "absolute", left: x, top: 372, width: 46,
                height: 300, zIndex: 62, borderRadius: 5,
                background: `linear-gradient(90deg, ${mxh("#4A443C", 0.22)} 0%, ${dkh("#4A443C", 0.40)} 100%)` }} />
            ))}
            {[430, 546].map((ty, i) => (
              <div key={"br" + i} style={{ position: "absolute", left: BAR - 60, top: ty,
                width: 340, height: i ? 50 : 64, zIndex: 64, borderRadius: 6,
                transform: `translateX(${flex}px) rotate(${flex * 0.10}deg)`,
                background: `repeating-linear-gradient(56deg, ${RED} 0px, ${RED} 30px, ${CREAMB} 30px, ${CREAMB} 60px)`,
                border: `6px solid ${dkh(RED, 0.34)}`, opacity: i ? 0.92 : 1 }} />
            ))}
          </>);
        })()}
        <div style={{ position: "absolute", left: BAR - 74, top: 640, width: 40, height: 180,
          zIndex: 20, background: hexa(RED, 0.52), transform: "skewX(-16deg)" }} />

        {/* the barrow of the day's retries */}
        <div style={{ position: "absolute", left: x0 + 130, top: GY - 132, width: 280, height: 120,
          zIndex: 56, borderRadius: "8px 26px 8px 8px",
          transform: `rotate(${hit ? E(f, HIT, HIT + 6, 0, -9, OUT) + rock(f, HIT + 6, 5, 18) : 0}deg)`,
          transformOrigin: "84% 100%",
          background: `linear-gradient(170deg, ${mxh("#8A8074", 0.30)} 0%, ${dkh("#8A8074", 0.28)} 100%)`,
          border: `7px solid ${dkh("#8A8074", 0.46)}` }} />
        <div style={{ position: "absolute", left: x0 + 236, top: GY - 24, width: 78, height: 78,
          zIndex: 58, borderRadius: "50%", background: dkh("#4A443C", 0.20),
          border: `10px solid ${mxh("#4A443C", 0.24)}`, transform: `rotate(${push0 * 2.2}deg)` }} />

        {/* ⭐ THE MISSING OUTPUT (§10): hitting it produced nothing before. Now
            the load PITCHES OVER THE FRONT and three parts spill onto the floor
            and stay there, so the impact leaves evidence. */}
        {[0, 1, 2, 3, 4].map(i => (
          <Part key={"ld" + i} x={x0 + 186 + (i % 3) * 78} y={GY - 168 - Math.floor(i / 3) * 54
            + (hit ? E(f, HIT, HIT + 10, 0, -30 + i * 4, OUT) : 0)}
            s={1.04} wrong kind={i % 4} c={OXIDE} z={60 + i}
            rot={-16 + i * 11 + (hit ? E(f, HIT, HIT + 10, 0, -22, OUT) : 0)} />
        ))}
        {hit && [0, 1, 2].map(i => {
          const t = E(f, HIT + i * 3, HIT + i * 3 + 16, 0, 1, IN_Q);
          return <Part key={"sp" + i} x={x0 + 300 + t * (120 + i * 60)}
            y={GY - 160 - Math.sin(t * Math.PI) * 130 + t * t * 190} s={1.0}
            wrong kind={i} c={OXIDE} z={66} rot={t * 320} />;
        })}

        {/* ⭐⭐ AND THE QUEUE BEHIND. You are not just stopped, the work keeps
            arriving — two more barrows roll up and pile in behind you. This is
            the beat that makes the shot escalate instead of hold. */}
        {[40, 60].map((k, i) => {
          const t = E(f, k, k + 20, 0, 1, OUT);
          if (f < k) return null;
          return (<React.Fragment key={"q" + i}>
            <div style={{ position: "absolute", left: -330 + t * (400 - i * 170), top: GY - 118,
              width: 250, height: 106, zIndex: 40 - i * 2, borderRadius: "8px 24px 8px 8px",
              background: `linear-gradient(170deg, ${mxh("#8A8074", 0.20)} 0%, ${dkh("#8A8074", 0.34)} 100%)`,
              border: `6px solid ${dkh("#8A8074", 0.50)}` }} />
            {[0, 1, 2].map(j => (
              <Part key={"qp" + j} x={-260 + t * (400 - i * 170) + j * 70} y={GY - 150}
                s={0.9} wrong kind={j} c={OXIDE} z={41 - i * 2} rot={-14 + j * 12} />
            ))}
          </React.Fragment>);
        })}

        {/* ⭐⭐ THE LIMIT, ON THE CHARACTER. The barrier says it about the shop;
            this says it about HIM, and it says it before the impact rather than
            after — the bar is already deep in the red as he pushes, so the hit
            is the thing you were waiting for instead of a surprise. */}
        <LimitBar x={x0} y={GY - 342} f={f} at={HIT}
          full={E(f, 0, HIT, 0.34, 1, IO)} z={70} />

        {/* ⭐ THE FOCAL POINT — braced against it, and it looks PAST the barrier
            at the one who got through */}
        <Hero f={f} x={x0} y={GY} size={330} z={54}
          lean={hit ? 17 + strain * 0.5 : 11}
          gaze={f >= 70 ? 1 : 0}
          shock={f >= HIT && f < HIT + 12 ? 0.8 : 0}
          stern={f >= HIT + 12 && f < 80 ? 0.9 : 0}
          xeyes={f >= 80 ? 1 : 0} />

        {hit && Array.from({ length: 9 }, (_, i) => {
          const t = ((f * 2.6 + i * 14) % 54) / 54;
          return (<div key={"st" + i} style={{ position: "absolute",
            left: x0 - 34 + Math.sin(f / 7 + i) * 30 + i * 6, top: GY - 350 - t * 165,
            width: 24 + t * 34, height: 24 + t * 34, borderRadius: "50%", zIndex: 56,
            background: "#F4EDE0", opacity: Math.max(0, 0.36 * (1 - t)) }} />);
        })}

        <Puff x={BAR - 70} y={GY - 40} f={f} at={HIT} n={20} s={1.8} z={66} spread={1.4} />
        <Ring x={BAR - 70} y={GY - 46} f={f} at={HIT} r={330} c={RED} z={65} />
        <MarkCast x={150} y={200} s={112} z={30} f={f} spin={0.55} o={0.86} />
      </div>
    </Scene>
  );
};
