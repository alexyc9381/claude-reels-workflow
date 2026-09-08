import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd,
  CLAY, GOLD, GREEN, RED, SKY, INK, MUTE,
  CARD, CARDD, CARDL, CARDDK, PIN, OAK, OAKD, OAKL, BRASS, BRASSD, BRASSL,
  STEEL, STEELD, STEELL, HOP, HOPD, HOPL, LAMPC, SHRED, STAMPR,
  Hall, Spot, Scene, Cam, Beam, Motes, Chip, Plate, BigNum, Contact, Mark, MarkCast, MarkPlate,
  CardWall, Note, Hopper, ContextArc, HoodLamp, Desk, CompassCard, RouteBeam, Pigeonholes,
  FILES,
  Hit, CtaPlate, Spotlight,
  castOf, blend,
  Ladder, BoxStack, Ceiling,
  PinBoard, WallClock, Counter, Carriage, Folder, Brief, Guy, Shred,
  COLS, ROWS, NCARD, CW, CH, PX, PY, WALL_X, WALL_Y, cardX, cardY, usePlace,
} from "./RteWorld";
import type { Place } from "./RteWorld";

/* ===========================================================================
   REEL 123 "ROUTE" · THE BODY.  Board: storyboards/123-route.md.

   ⛔⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/words_route123.json, converted to LOCAL frames, with the PICTURE
      LEADING THE ONSET BY 4 FRAMES so the crossover — not the start — lands on
      the syllable.
      root onsets (s): Most 0.000 · They 2.575 · or 5.135 · There's 8.000 ·
                       Now 9.730 · Instead 12.820 · This 14.690 · When 17.760 ·
                       and 21.210 · You 23.950 · Claude 26.340 · Comment 29.065
      scene `at` (frames):  0 · 80 · 154 · 240 · 292 · 385 · 441 · 533 · 636 ·
                            719 · 790 · 866.        TOTAL 908 (30.27s).

   ⛔⛔ EVERY SCENE IS AN EVENT, NOT A COMPOSITION (ANIMATION-QUALITY §2). Each
      one below names its four parts in a comment: a BEFORE state legible on the
      first frame, a visible TRIGGER, TRAVEL across distance, and an ARRIVAL
      THAT COSTS SOMETHING. ⛔ Nothing in this reel lands and simply stops — every
      arrival gets a damped rock `sin(lf/3.1) * exp(-lf/26)`.

   ⛔⛔ ARRIVALS ARE SPREAD ACROSS THE WHOLE SCENE. Reel 104 lost a rebuild to
      putting every arrival inside the first half and then holding: 5.94 against
      a 6.0 bar, despite being better in every other way. The three cards in S8
      land at 46%, 66% and 77% of the shot, not one-two-three in its first third.

   ⛔ THE STAGE. Panel 1012 x 792. ROOT's header owns y 0..112 and the slug owns
      y 730..792, so every hero object lives inside y 118..726.

   ⛔ THE MOVE BUDGET IS TWO (CAMERA-GRAMMAR: ~2-3 scenes move, the rest locked).
      S1 pushes into the throat and S6 pulls out to the wide. Every other scene is
      LOCKED with only the mandatory continuous in-panel push, which is not a
      re-framing move.
   ========================================================================= */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
/** the house arrival: it rocks and never quite settles. ⛔ nothing lands and stops. */
const rock = (lf: number, at: number, amp = 4) =>
  lf < at ? 0 : Math.sin((lf - at) / 3.1) * Math.exp(-(lf - at) / 26) * amp;
/** a hit that shakes the room — used on the lamp, never on the camera */
const kickAt = (lf: number, ats: number[], amp = 1) =>
  ats.reduce((a, t) => a + (lf >= t ? Math.exp(-(lf - t) / 7) * amp : 0), 0);

/* ⛔ NO WHITE PLATE, NO IRIS, NO FULL-FRAME FLASH: peak opacity 0.24, ramps in
   AND out, never pure white and never pure black. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number; c?: string }> =
  ({ lf, at, n = 9, o = 0.24, c = "#F6E8CE" }) => {
  const k = E(lf, at, at + 3, 0, 1, OUT) - E(lf, at + 3, at + n, 0, 1, IO);
  if (k <= 0.01) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
    background: hexa(c, o * k) }} />;
};

/** ⭐⭐ THE ROW-SLAB. The wall does not shed two hundred cards, it sheds ROWS, and
    a row travels as ONE object: every card in it takes the same delta, and only a
    late convergence narrows the bar into the mouth. This is the single mechanism
    that carries the opening of all three hooks — B and C measured 3 of 6 opening
    half-seconds STATIC while A passed, purely because A's wall animated and
    theirs did not. A hook whose biggest surface is frozen is a still. */
const rowSlab = (f: number, mx: number, my: number,
                 o: { gap?: number; start?: number; travel?: number; conv?: number } = {}) => {
  const gap = o.gap ?? 9.4, start = o.start ?? -6, travel = o.travel ?? 26;
  const CX = WALL_X + (COLS * PX) / 2;
  return (i: number) => {
    const r = Math.floor(i / COLS);
    const k = E(f, start + r * gap, start + r * gap + travel, 0, 1, IO);
    if (k <= 0.001) return { lit: 1 };
    const sx = cardX(i);
    return { lit: 1, fly: Math.min(1, k * 1.8),
      dx: (mx - CX) * k + (CX - sx) * k * k * k * (o.conv ?? 0.95),
      dy: (my - cardY(r * COLS)) * k,
      s: 1 - k * k * k * 0.50, o: 1 - k * k * k * 0.25,
      rot: k * 11 * (r % 2 ? 1 : -1), gone: k > 0.985 ? 1 : 0 };
  };
};

/** the far plane: a warm corridor at the right edge, behind the wall's end post.
    ⛔ Without a deep element and a near mass the camera is pointed at a backdrop. */
const FarDoor: React.FC<{ p: Place; open?: number; day?: number; z?: number }> =
  ({ p, open = 0.5, day = 0, z = 6 }) => (<>
    <div style={{ position: "absolute", left: 944, top: 96, width: 68, height: 620, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(p.key, 0.30 + day * 0.4)} 0%, ${mxh(p.key, 0.05)} 100%)`,
      opacity: 0.25 + open * 0.7 }} />
    <div style={{ position: "absolute", left: 944, top: 96, width: 68 * (0.3 + open * 0.7),
      height: 620, zIndex: z + 1,
      background: `linear-gradient(180deg, ${mxh(p.key, 0.55 + day * 0.35)} 0%, ${mxh(p.key, 0.14)} 100%)`,
      opacity: 0.5 + open * 0.5 }} />
    {/* the end post — the near mass that crops the door */}
    <div style={{ position: "absolute", left: 928, top: 60, width: 22, height: 700, zIndex: z + 3,
      background: `linear-gradient(90deg, ${mxh(p.back, 0.10)} 0%, ${dkh(p.back2, 0.30)} 100%)` }} />
  </>);

/** the tall window camera-left, in the 150px band the wall leaves free. Only in
    S0 — it is the daylight that makes frame 0 the brightest frame in the reel
    (THE-OPEN law 1), and it is also the far plane that stops this being a
    backdrop. */
const Window: React.FC<{ p: Place; f: number }> = ({ p, f }) => (<>
  {/* the reveal, cut into the wall */}
  <div style={{ position: "absolute", left: -50, top: 84, width: 196, height: 448, zIndex: 4,
    background: dkh(p.back2, 0.18) }} />
  <div style={{ position: "absolute", left: -40, top: 96, width: 172, height: 424, zIndex: 5,
    background: "linear-gradient(158deg, #FFFAEA 0%, #F0E2BE 56%, #DCC79C 100%)" }} />
  {/* what is BEYOND it — a hazed roofline, so the deep plane has something in it */}
  {[0, 1, 2].map((i) => (
    <div key={"rl" + i} style={{ position: "absolute", left: -30 + i * 52, top: 300 + i * 26,
      width: 46, height: 130, background: "#E3D2AC", opacity: 0.75, zIndex: 6 }} />
  ))}
  {/* the frame: two mullions and a transom */}
  {[26, 90].map((x) => (
    <div key={"wm" + x} style={{ position: "absolute", left: -40 + x, top: 96, width: 11,
      height: 424, background: mxh(p.lip, 0.06), zIndex: 8 }} />
  ))}
  <div style={{ position: "absolute", left: -40, top: 262, width: 172, height: 11,
    background: mxh(p.lip, 0.06), zIndex: 8 }} />
  {/* the sill, cropped by the left edge */}
  <div style={{ position: "absolute", left: -60, top: 520, width: 210, height: 20, zIndex: 9,
    background: `linear-gradient(180deg, ${mxh(p.lip, 0.24)} 0%, ${dkh(p.lip, 0.30)} 100%)` }} />
  {/* the light it throws INTO the room — a shaped wedge, never a full-frame fill */}
  <div style={{ position: "absolute", left: 70, top: 96, width: 980, height: 700, zIndex: 12,
    background: `linear-gradient(108deg, ${hexa("#FFF4D2", 0.30)} 0%, ${hexa("#FFF4D2", 0.07)} 62%, ${hexa("#FFF4D2", 0)} 92%)`,
    clipPath: "polygon(0 0, 30% 0, 100% 100%, 0 100%)" }} />
  {/* the bounce off the counter — a real second bounce, not a lifted dark stop */}
  <div style={{ position: "absolute", left: -60, right: -60, top: 480, height: 320, zIndex: 13,
    background: `linear-gradient(180deg, ${hexa("#FFE9B4", 0)} 0%, ${hexa("#FFE9B4", 0.18)} 62%, ${hexa("#FFE9B4", 0.08)} 100%)` }} />
  <Motes x={230} y={110} w={300} h={470} n={15} f={f} z={14} c="#FFF6DE" />
</>);

/** ⛔ THE NEAR MASS. "Is there a mass cropped by the panel edge, IN FRONT of the
    action?" is the depth question ANIMATION-QUALITY §8 says to check by eye, and
    it is the difference between a camera standing in a place and one pointed at a
    backdrop. This is a card trolley, half out of frame, in the note room's own
    vocabulary — not a decorative bar. */
const Trolley: React.FC<{ p: Place; x: number; y: number; f: number; z?: number; s?: number }> =
  ({ p, x, y, f, z = 92, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "0% 100%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 240,
      borderRadius: 10, background: `linear-gradient(96deg, ${dkh(OAK, 0.42)} 0%, ${dkh(OAK, 0.66)} 100%)`,
      boxShadow: "0 -6px 22px rgba(6,8,12,0.5)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 12,
      borderRadius: "10px 10px 0 0", background: mxh(OAK, 0.04) }} />
    {/* the cards standing in it, catching the key on their top edges */}
    {Array.from({ length: 11 }, (_, i) => (
      <div key={"tc" + i} style={{ position: "absolute", left: 22 + i * 24,
        top: -34 - rnd(i, 3) * 22, width: 20, height: 70 + rnd(i, 4) * 24,
        borderRadius: 3, background: mxh(CARDDK, 0.06 + rnd(i, 5) * 0.16),
        transform: `rotate(${-3 + rnd(i, 6) * 6}deg)` }}>
        <div style={{ position: "absolute", inset: 0, height: 8, borderRadius: "3px 3px 0 0",
          background: mxh(CARD, 0.10), opacity: 0.7 }} />
      </div>
    ))}
    <div style={{ position: "absolute", left: 30, top: 236, width: 34, height: 34,
      borderRadius: 18, background: "#22262C" }} />
    <div style={{ position: "absolute", left: 232, top: 236, width: 34, height: 34,
      borderRadius: 18, background: "#22262C" }} />
  </div>
);

/* ==================================================================== S0 ===
   0.00 -> 2.67s · 80f · ONE LOCKED FRAMING · HOOK
   "Most people don't realize they're building AI skills completely wrong."

   ⛔⛔ ONE SHOT, NOT FOUR. THE-OPEN says "≥3 hard cuts in the first 5s" and
      ANIMATION-QUALITY §2 CORRECTS IT: reel 104's five-shot open scored better on
      every number that doc gives and was rejected as *"just cuts and then nothing
      happens"*. This is ONE locked framing in which two hundred cards leave a
      wall. The reel still shows 3 framings inside its first 5.1s, because S1
      cuts at f80 and S2 at f154.

   EVENT · before: a full, lit, neat wall and a clerk reading one card.
          · trigger: the HOPPER swings down out of the ceiling and opens (f10).
          · travel: all 200 cards peel off in a diagonal wave and pour into it,
                    with a foreground layer spraying past the lens.
          · arrival that costs: the throat bulges, the lamp swings, the clerk is
                    knocked back and buried, and the wall is left bare with 200
                    empty pin holes.
   ====================================================================== */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("morning");
  const MOUTH_X = 470, MOUTH_Y = 384;

  /* ⛔⛔ ROUND 1 — MEASURED, NOT FELT. The first cut of this hook scored 4.12 and
     3.33 over its first two half-seconds, BOTH STATIC, because the hopper arrived
     at f6 and the wall did not start moving until f16. That is the worst second
     in the reel to be still.

     ⛔⛔ ROUND 2 — AND THE FIX MADE IT WORSE, WHICH IS THE MORE USEFUL HALF. I
     answered "static" with QUANTITY: twenty-six cards at 3-6x crossing the lens
     continuously plus a sixteen-card column. Motion went 4.12 -> 16.43 and the
     shot became MUSH — you could not find the wall, the hopper or the clerk. That
     is SET-AND-LIGHT §6's "every plane jittering, 3+ things demanding attention,
     can't tell what's happening", and the metric happily rewarded it. The
     measured table says LARGE x BRIGHT x FAST. It does not say MANY.

     ⭐ THE RULE THAT RESOLVES BOTH: density lives in the STATIC set; only ONE
     thing moves at a time. So the wall does not shed two hundred cards — it sheds
     ROWS, and a row travels as ONE SLAB. At any moment there are two or three
     slabs in flight: large, ordered, and each one still legible as a bar of
     notes. Frame 0 is not an announcement and it is not a blizzard: two rows are
     already gone, one slab is already in mid-air, and the hopper is already
     swallowing it. */

  const st = rowSlab(f, MOUTH_X, MOUTH_Y);
  const bulge = E(f, 0, 52, 0.40, 1, OUT);
  const holes = E(f, 0, 52, 0.14, 1, LIN);
  const buried = E(f, 44, 60, 0, 1, OUT);
  const jam = E(f, 50, 56, 0, 1, OUT);
  const HITS = [3, 14, 25, 36, 47];
  return (
    <Scene p={p} slug="THE NOTE ROOM" push={[0, 76, 1.055]} vig={0.18} glow={hexa(GOLD, 0.10)}>
      <Hall p={p} f={f} lightX={0.16} floorLines={5} bleed={40} />
      <Hit f={f} at={HITS} amp={0.7} z={5}>
        <CardWall p={p} f={f} st={st} holes={holes} z={20} turn={7} tabs={0.22} wash={0.16}
          cast={castOf("morning")[0]} castK={castOf("morning")[1]} />
      </Hit>
      <Window p={p} f={f} />
      <Hit f={f} at={HITS} amp={1.6} z={70}>
        <HoodLamp x={706} y={96} on={0} s={1.0} z={70} f={f} kick={kickAt(f, HITS, 1.5)} />
      </Hit>
      <Desk p={p} y={560} f={f} z={84} clutter={0} lip={false} day={1} />
      <MarkPlate x={556} y={636} t="CLAUDE CODE" s={1.24} z={90} />
      <Mark x={122} y={618} s={72} z={90} />
      {/* the shade the falling load throws on the wall behind it */}
      <div style={{ position: "absolute", left: 250, top: 110, width: 520, height: 470,
        zIndex: 52, pointerEvents: "none", opacity: 0.08 + bulge * 0.22,
        background: `radial-gradient(56% 64% at 50% 58%, ${hexa("#0A0A12", 0.84)} 0%, ${hexa("#0A0A12", 0.52)} 48%, ${hexa("#0A0A12", 0)} 80%)` }} />
      <Hit f={f} at={HITS} amp={1.1} z={60}>
        <Hopper x={MOUTH_X} y={MOUTH_Y} s={1.15} z={60} f={f} open={1}
          bulge={bulge} swing={Math.sin(f / 5.5) * bulge * 2.4 + jam * 3} />
      </Hit>
      {/* ⭐ ONE card past the lens per slab, at 5x. The near plane PUNCTUATES each
          arrival; it is not a continuous blizzard. Five in the whole shot. */}
      {HITS.map((h, i) => {
        const k = E(f, h - 9, h + 13, 0, 1, LIN);
        if (k <= 0 || k >= 1) return null;
        return <Note key={"fg" + i} x={-300 + k * 1620} y={230 + (i % 3) * 200 - k * 170}
          w={CW} h={CH} lit={1} fly={1} s={5.0 + (i % 2) * 1.5} rot={k * 300 + i * 60}
          o={0.96 - k * 0.10} z={95} seed={i + 90} ruled={4}
          tab={i % 2 === 0 ? "#C8443A" : "#5AA0DE"} />;
      })}
      <Guy x={800} y={286 + buried * 34} f={f} s={1.30} z={78} face={-1} ground={false}
        costume={{ glasses: 1, suit: 1, stern: 0.4, gaze: -1.2,
                   shock: 0.16 + buried * 0.6, nodAmp: 3.8 }} />
      {/* ⛔ THE LAST HALF-SECOND WAS DEAD (2.26, STATIC) — every row had left by
          f60 and nothing replaced it. THE ARRIVAL THAT COSTS SOMETHING lives here:
          the throat splits, the load bursts back out sideways, and the last card
          slaps the counter and rocks without ever quite settling. */}
      {jam > 0.02 && Array.from({ length: 18 }, (_, i) => {
        const k = E(f, 50 + i * 0.42, 50 + i * 0.42 + 15, 0, 1, OUT);
        if (k <= 0) return null;
        const side = i % 2 ? 1 : -1;
        return <Note key={"bs" + i} x={MOUTH_X - 40 + side * k * (150 + rnd(i, 7) * 300)}
          y={470 + k * (rnd(i, 8) * 130 - 40)} w={CW} h={CH} lit={1} fly={1}
          s={1.6 + rnd(i, 9) * 1.9} rot={k * 320 * side} o={1 - k * 0.2} z={82}
          seed={i + 120} ruled={3} />;
      })}
      {buried > 0.02 && Array.from({ length: 14 }, (_, i) => (
        <Note key={"bu" + i} x={640 + rnd(i, 9) * 330} y={472 + rnd(i, 10) * 92}
          lit={1} fly={0.8} s={1.3 + rnd(i, 11) * 0.8} rot={-40 + rnd(i, 12) * 80}
          o={buried} z={79} seed={i + 60} />
      ))}
      {/* the one that lands on the counter and never settles */}
      {f > 55 && (
        <Note x={286} y={498 + rock(f, 56, 7)} w={168} h={120} lit={1} fly={1} s={1}
          rot={-9 + rock(f, 56, 9)} z={88} ruled={4} seed={3} tab="#3F9E74" />
      )}
      <Trolley p={p} x={-110} y={566} f={f} z={92} s={1.30} />
      {f > 54 && <Chip t="200 NOTES, ONE PROMPT" y={128} s={0.82} z={96} c={INK} />}
      <Flash lf={f} at={50} n={8} o={0.20} />
    </Scene>
  );
};

/* ==================================================================== S1 ===
   2.67 -> 5.13s · 74f · PUSH IN · SETUP
   "They stuff their prompts with so much information that the AI breaks down,"

   EVENT · before: cards feeding down the throat at a steady rate, 3 lit segments.
          · trigger: the feed doubles, then triples (f14).
          · travel: segments light 4..10, rivets pop one at a time with a recoil.
          · arrival that costs: it JAMS in one frame — the seam splits and cards
                    burst out sideways, and the clerk is thrown onto his heels.
   ⛔ NOT A NUMERAL. The context window is ten segments filling. There is no
      percentage typeset anywhere in this reel.
   ====================================================================== */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("throat");
  const rate = 1 + E(f, 14, 34, 0, 2.4, OUT);
  const lit = E(f, 2, 56, 0.28, 1, OUT);
  const rivets = E(f, 22, 56, 0, 1, LIN);
  const jam = E(f, 56, 60, 0, 1, OUT);
  const bulge = E(f, 10, 56, 0.1, 1, OUT);
  /* ⭐ the overload, and then the failure. "breaks" = f62, "down" = f69. */
  const heat = E(f, 8, 58, 0, 1, OUT);
  const fall = E(f, 61, 77, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="THE INTAKE" push={[0, 77, 1.075]} vig={0.56}>
      <Hall p={p} f={f} lightX={0.56} floorLines={3} bleed={40} />
      <FarDoor p={p} open={0.2} />
      {/* ⭐ the wall is STILL GOING IN behind the throat — this scene is the same
          moment as the hook seen from inside the machine, so it should still be
          arriving, not already gone */}
      <div style={{ position: "absolute", inset: 0, zIndex: 8, opacity: 0.62 }}>
        <CardWall p={p} f={f} holes={E(f, 0, 60, 0.3, 1, LIN)} z={10}
          st={rowSlab(f, 506, 300, { gap: 8.0, start: -22, travel: 26 })}
          cast={castOf("throat")[0]} castK={castOf("throat")[1]} />
      </div>
      {/* the intake band under it all, never stopping */}
      <div style={{ position: "absolute", left: -60, right: -60, top: 654, height: 30, zIndex: 26,
        background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.08)} 0 24px, ${dkh(STEELD, 0.40)} 24px 48px)`,
        transform: `translateX(${-(f * 5.6) % 48}px)` }} />
      {Array.from({ length: 8 }, (_, i) => (
        <Note key={"ib" + i} x={((i * 158 + 20 - f * 5.6) % 1300) - 150} y={608}
          w={CW} h={CH} lit={1} fly={0.4} s={1.05} rot={-2 + (i % 3) * 2}
          z={27} seed={i + 51} ruled={2} />
      ))}
      {/* the feed, arriving from the top edge */}
      {Array.from({ length: 26 }, (_, i) => {
        const t = ((f * 5.2 * rate) + i * 17) % 190;
        if (t > 150) return null;
        return <Note key={"fe" + i} x={352 + (rnd(i, 3) - 0.5) * 300} y={-60 + t * 1.6}
          lit={1} fly={1} s={2.4 - (t / 150) * 1.3} rot={rnd(i, 5) * 160} z={40}
          seed={i + 12} ruled={3} />;
      })}
      {/* THE THROAT, big */}
      <Hopper x={506} y={196} s={1.62} z={54} f={f} open={1} bulge={bulge}
        rivets={rivets} heat={heat} fall={fall}
        swing={Math.sin(f / 5) * bulge * 2.2 + jam * 2.4} />
      {/* the arm it tore off, left hanging */}
      {fall > 0.05 && (
        <div style={{ position: "absolute", left: 506 - 20, top: -40, width: 40, height: 300,
          background: dkh(HOPD, 0.10), zIndex: 53,
          transform: `rotate(${fall * 5}deg)`, transformOrigin: "50% 0%" }} />
      )}
      {/* the sparks and torn plate it sheds on the way down */}
      {fall > 0.02 && Array.from({ length: 16 }, (_, i) => {
        const k = E(f, 61 + i * 0.5, 61 + i * 0.5 + 14, 0, 1, OUT);
        if (k <= 0) return null;
        return <div key={"sp" + i} style={{ position: "absolute",
          left: 506 + (rnd(i, 3) - 0.5) * 520 * k, top: 300 + k * (140 + rnd(i, 4) * 260),
          width: 6 + rnd(i, 5) * 16, height: 5, borderRadius: 3,
          background: i % 3 ? "#FFB454" : "#C4351A", opacity: 1 - k * 0.4, zIndex: 76,
          transform: `rotate(${k * 300 + i * 30}deg)` }} />;
      })}
      {fall < 0.35 && <ContextArc x={332} y={470} lit={lit} s={1.06} z={72} f={f} />}
      {/* the slot below, with the mark stamped beside it */}
      <Mark x={112} y={556} s={72} z={70} />
      {/* the split seam bursting */}
      {jam > 0.02 && Array.from({ length: 16 }, (_, i) => {
        const t = E(f, 48 + i * 0.6, 48 + i * 0.6 + 16, 0, 1, OUT);
        return <Note key={"bs" + i} x={330 - t * (120 + rnd(i, 7) * 210)}
          y={452 + t * (rnd(i, 8) * 150 - 30)} lit={0.9}
          s={1 + rnd(i, 9) * 0.8} rot={t * 300} o={1 - t * 0.35} z={74} />;
      })}
      <Guy x={856} y={369} f={f} s={0.98} z={78} face={-1}
        costume={{ glasses: 1, suit: 1, stern: 0.5, gaze: -1.4, shock: jam * 0.6, nodAmp: 3.6 }} />
      <Motes x={506} y={210} w={300} h={300} n={9} f={f} z={50} />
      {f > 56 && <Chip t="EVERY CHAT HAS A LIMIT" y={128} s={0.8} z={95} c={INK} />}
      <Flash lf={f} at={60} n={7} o={0.24} c="#F5A66A" />
    </Scene>
  );
};

/* ==================================================================== S2 ===
   5.13 -> 8.00s · 86f · HARD CUT · SETUP
   "or they waste hours searching GitHub for outdated templates."

   ⛔ A DIFFERENT BASE OBJECT. The board's critic pass caught S1 and S4 both
      being "the hopper" (the CALLBACK S1=S2 failure) and rewrote them; this scene
      was never the hopper — it is the room's OTHER wall.
   EVENT · before: an empty pin board and a clerk holding an empty tray.
          · trigger: a search line runs across the board's head rail (f8).
          · travel: twelve results flap down one at a time, each stamped with a
                    date, while the clock's hands sweep forward and accelerate.
          · arrival that costs: an OUTDATED stamp slams across the whole board,
                    every date goes dark, and the tray is STILL empty.
   ====================================================================== */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("board");
  const flip = (i: number) => E(f, 5 + i * 2.9, 5 + i * 2.9 + 8, 0, 1, BACK);
  /* ⛔ NOTHING HOLDS TO THE END OF A SHOT. After the stamp the board sheds every
     result, staggered right across the remaining 24 frames. */
  const shed = (i: number) => E(f, 54 + (i % 6) * 2.2, 54 + (i % 6) * 2.2 + 13, 0, 1, IN_Q);
  const stamp = E(f, 46, 56, 0, 1, BACK);
  const spin = E(f, 3, 66, 0, 1, IN_Q);
  const scan = E(f, 4, 12, 0, 1, OUT);
  return (
    <Scene p={p} slug="THE SEARCH" push={[0, 80, 1.155]} vig={0.54}>
      <Hall p={p} f={f} lightX={0.62} floorLines={4} bleed={40} />
      <FarDoor p={p} open={0.28} />
      <PinBoard x={126} y={168} f={f} n={12} z={30}
        flip={(i) => flip(i) * (1 - shed(i))} stamp={stamp}
        sheet="#B8C9C2" sheetD="#6F8A80" board="#0E3A30" />
      {/* the shed results, falling past the counter */}
      {Array.from({ length: 12 }, (_, i) => {
        const k = shed(i);
        if (k <= 0.02) return null;
        return <Note key={"sd" + i} x={104 + (i % 4) * 172 + (rnd(i, 3) - 0.5) * k * 190}
          y={154 + Math.floor(i / 4) * 122 + k * k * 620} w={156} h={104} lit={0}
          cast="#8FB8A6" castK={0.86}
          s={1 + k * 0.7} rot={k * (rnd(i, 4) - 0.5) * 320} o={1 - k * 0.15} z={64}
          seed={i + 40} ruled={3} />;
      })}
      {/* a full-width travelling band: the paper feed under the board. The
          measured table's biggest single line after the set itself. */}
      <div style={{ position: "absolute", left: -60, right: -60, top: 604, height: 30, zIndex: 26,
        background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.10)} 0 26px, ${dkh(STEELD, 0.36)} 26px 52px)`,
        transform: `translateX(${-(f * 4.6) % 52}px)` }} />
      {Array.from({ length: 7 }, (_, i) => (
        <Note key={"bd" + i} x={((i * 176 + 40 - f * 4.6) % 1280) - 140} y={568}
          w={126} h={40} lit={0} cast="#7FB49E" castK={0.88} s={1} rot={-1.5 + (i % 3)}
          z={28} seed={i + 3} ruled={2} />
      ))}
      {/* the search line running across the head rail */}
      <div style={{ position: "absolute", left: 116, top: 138, width: 716 * scan, height: 7,
        borderRadius: 4, background: mxh(p.key, 0.20), zIndex: 44, opacity: 0.9 - stamp * 0.6 }} />
      {/* ⭐ "waste hours" is the CLOCK, not a word */}
      <WallClock x={892} y={232} s={1.12} z={52} spin={spin} />
      <Guy x={888} y={380} f={f} s={0.88} z={78} face={-1}
        costume={{ glasses: 1, suit: 1, stern: 0.45, gaze: -1.0, shock: stamp * 0.4, nodAmp: 3.4 }} />
      {/* the empty tray he is holding — it is still empty at the end */}
      <div style={{ position: "absolute", left: 792, top: 500, width: 150, height: 26,
        borderRadius: 5, background: dkh(STEELD, 0.16), zIndex: 80,
        transform: `rotate(${-3 + Math.sin(f / 21) * 2.8}deg)` }} />
      <div style={{ position: "absolute", left: 792, top: 496, width: 150, height: 7,
        borderRadius: 4, background: STEELL, opacity: 0.5, zIndex: 81 }} />
      {/* a card knocked off the board, rocking on the floor */}
      {f > 62 && (
        <Note x={300} y={648 + rock(f, 64, 3)} w={104} h={70} lit={0.5} s={1}
          rot={-14 + rock(f, 70, 5)} z={86} ruled={3} />
      )}
      <Motes x={430} y={180} w={420} h={330} n={8} f={f} z={46} />
      {f > 60 && <Chip t="SOMEONE ELSE'S SETUP" y={128} s={0.8} z={95} c={INK} />}
    </Scene>
  );
};

/* ==================================================================== S3 ===
   8.00 -> 9.73s · 52f · HARD CUT, WIDE · TURN
   "There's a much better way to do this."

   ⛔ THE BREATH IS NOT A HOLD. The board's intensity curve dips to 7 here, and
      the scene spends it on the LARGEST VALUE CHANGE in the reel — a near-black
      room to one hard lit pool. A promise beat that just sits is a poster.
   EVENT · before: near black, debris on the deck, one silhouette.
          · trigger: the hooded lamp SNAPS on (f6).
          · travel: the cone widens and sweeps the deck left to right, taking the
                    debris off the near edge with it.
          · arrival that costs: the far door opens and throws a warm rim; the deck
                    is clear; ONE empty brass stand is waiting in the pool.
   ⭐ THE REEL'S KEY LIGHT IS BORN HERE. Every scene after this is lit by it.
   ====================================================================== */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("night");

  /* ⛔⛔ THIS BEAT WAS A LAMP TURNING ON. Alex, 2026-08-27: *"animation at 9 seconds
     needs to be replaced with an interesting one."* He was right — the old S3 was
     a dark room, a cone sweeping some debris off a counter, and an empty stand.
     The largest VALUE change in the reel, and nothing HAPPENED in it.

     ⭐ THE REPLACEMENT: THE WALL RE-SORTS ITSELF. A wave crosses the bank left to
     right; every card it touches FLIPS and lands in colour order, so a wall of
     scattered stock resolves into clean vertical bands like a departure board
     settling. It is the reel's whole thesis as one picture — order out of the
     pile — on the line that promises exactly that, and it is the beat that pays
     off giving the files ten colours in the first place. */

  const WAVE = (c: number) => 2 + c * 2.0;            /* column by column, l -> r */
  const kOf = (i: number) => E(f, WAVE(i % COLS), WAVE(i % COLS) + 10, 0, 1, IO);
  /* before the wave a card is its own random stock; after it, the column's colour */
  const hueOf = (i: number) => (kOf(i) > 0.5 ? FILES[(i % COLS) % FILES.length] : undefined);
  const flipOf = (i: number) => kOf(i);
  const st = (i: number) => {
    const k = kOf(i);
    const settle = rock(f, WAVE(i % COLS) + 10, 3);
    return { lit: 0.30 + k * 0.70, dy: -Math.sin(k * Math.PI) * 22 + settle,
      s: 1 + Math.sin(k * Math.PI) * 0.10 };
  };
  const done = E(f, 32, 42, 0, 1, OUT);
  const lamp = E(f, 26, 32, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, 46, 1.05]} vig={0.52}>
      <Hall p={p} f={f} lightX={0.5} floorLines={4} bleed={40} />
      <FarDoor p={p} open={0.10 + done * 0.72} />
      <Ceiling p={p} f={f} z={88} />
      {/* ⭐ THE RE-SORT — 98 cells flipping in a wave, which is also the biggest
          "real content arriving" event in the reel (the measured table's third
          line: content that CHANGES is the best motion you can get). */}
      <CardWall p={p} f={f} st={st} z={20} turn={7} tabs={0.22} wash={0.30}
        cast={castOf("night")[0]} castK={castOf("night")[1]}
        hueOf={hueOf} flipOf={flipOf} />
      {/* the wave's own leading edge, so you can see WHAT is doing it */}
      {f < 40 && (
        <div style={{ position: "absolute", left: 40 + (f - 1) * 27, top: 96, width: 60,
          height: 470, zIndex: 52, pointerEvents: "none",
          background: `linear-gradient(90deg, ${hexa(LAMPC, 0)} 0%, ${hexa(LAMPC, 0.42)} 50%, ${hexa(LAMPC, 0)} 100%)` }} />
      )}
      <HoodLamp x={560} y={132} on={lamp} s={1.02} z={74} f={f}
        len={430} bot={520} kick={kickAt(f, [27], 1.4)} />
      <Desk p={p} y={556} f={f} cast={castOf("night")[0]} castK={castOf("night")[1]} />
      {/* the stand, waiting, revealed as the lamp comes up */}
      <div style={{ position: "absolute", left: 560, top: 486, zIndex: 76, opacity: done }}>
        <div style={{ position: "absolute", left: -66, top: 56, width: 132, height: 15,
          borderRadius: 5, background: `linear-gradient(180deg, ${BRASSL} 0%, ${BRASSD} 100%)`,
          boxShadow: "0 8px 16px rgba(6,8,12,0.55)" }} />
        <div style={{ position: "absolute", left: -13, top: 10, width: 26, height: 52,
          background: `linear-gradient(90deg, ${BRASSD} 0%, ${BRASS} 40%, ${BRASSD} 100%)` }} />
        <div style={{ position: "absolute", left: -46, top: -2, width: 92, height: 14,
          borderRadius: 4, background: BRASS }} />
      </div>
      <Guy x={196} y={282} f={f} s={1.02} z={78} face={1}
        costume={{ glasses: 1, suit: 1, gaze: 1.0, nodAmp: 3.6,
                   cheer: E(f, 30, 42, 0, 0.7, OUT) }} />
      <Motes x={560} y={170} w={320} h={400} n={12} f={f} z={70} />
      <Flash lf={f} at={27} n={6} o={0.16} c={LAMPC} />
    </Scene>
  );
};

/* ==================================================================== S4 ===
   9.73 -> 12.83s · 93f · LOCKED · TURN
   "Now don't shove all your notes into the AI, it just gets confused."

   ⛔ THE OUTPUT CHUTE, NOT THE INTAKE. S1 was the intake jamming; this is a
      different object at a different scale, and its event is a REFUSAL.
   EVENT · before: the chute dribbling shredded mush into a tray, the clerk
                   watching with his eyes going to X.
          · trigger: he plants a foot and SHOVES the intake hatch (f14).
          · travel: the hatch drives across, the belt jams dead, the queued cards
                    pile up and topple, the whole hopper recoils on its arm.
          · arrival that costs: ⭐ the chute gives one last COUGH on the measured
                   onset of "confused" (local f73) — a spray of mush and three
                   half-cards — and the tray tips over.
   ====================================================================== */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("chute");

  /* ⛔⛔ THIS SCENE WAS A CHUTE AND A TRAY OF SHREDDED PAPER. Alex, 2026-08-27:
     *"the animation at 10 seconds needs to be replaced with something better more
     representative of whats going on."* He is right and the diagnosis is in the
     line: **"don't shove all your notes into the AI, IT just gets confused."** The
     subject of that sentence is the AI. The old scene drew a machine's OUTPUT
     TRAY — one hop away from the thing being talked about, which is
     ANIMATION-QUALITY §3's container failure in a different coat.

     ⭐ THE REPLACEMENT: a GIANT CLAUDE fills the frame, notes are shovelled into
     the slot in its chest, and as the pile goes in its eyes cross, its colour goes
     sickly and it coughs the whole load back out as shredded confetti. The literal
     sentence, drawn. It is also the biggest the sprite gets in the reel, which is
     the other half of what he asked for. */

  const feed  = E(f, 2, 52, 0.15, 1, OUT);       /* how much has gone in */
  const cross = E(f, 30, 56, 0, 1, OUT);         /* the eyes give up */
  const cough = E(f, 69, 75, 0, 1, OUT);         /* ⭐ lands ON "confused" */
  const recoil = E(f, 69, 74, 0, 1, OUT) - E(f, 74, 86, 0, 1, IO);
  const HITS = [12, 26, 40, 54, 69];
  const EYE = 236, EYEY = 300;
  return (
    <Scene p={p} slug="THE MACHINE" push={[0, 89, 1.145]} vig={0.52}>
      <Hall p={p} f={f} lightX={0.46} floorLines={3} bleed={40} />
      <FarDoor p={p} open={0.24} />
      <Ceiling p={p} f={f} z={12} />
      {/* the wall it stands in front of, dark and hot */}
      <div style={{ position: "absolute", inset: 0, zIndex: 8, opacity: 0.5 }}>
        <CardWall p={p} f={f} st={() => ({ lit: 0 })} z={10}
          cast={castOf("chute")[0]} castK={castOf("chute")[1]} />
      </div>
      <HoodLamp x={640} y={92} on={1} s={0.9} z={26} f={f}
        len={420} bot={520} kick={kickAt(f, HITS, 1.2)} />

      {/* ⭐⭐ THE MACHINE. Head and shoulders, filling the panel, wearing the mark. */}
      <Hit f={f} at={HITS} amp={1.4} z={40}>
        <div style={{ position: "absolute", left: 506 - 310, top: 118 - recoil * 16,
          width: 620, height: 486, zIndex: 40 }}>
          <Contact x={44} y={470} w={532} z={-1} o={0.5} />
          {/* the chassis */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 620, height: 466,
            borderRadius: 40,
            background: `linear-gradient(168deg, ${mxh(blend(CLAY, "#8E9440", feed * 0.30), 0.18)} 0%, ${dkh(blend(CLAY, "#8E9440", feed * 0.30), 0.20)} 100%)`,
            boxShadow: "0 26px 48px rgba(6,8,12,0.55)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 620, height: 40,
            borderRadius: "40px 40px 0 0", background: mxh(CLAY, 0.34), opacity: 0.55 }} />
          {/* the vent grilles, so it reads as equipment */}
          {[24, 560].map((vx) => (
            <div key={"vt" + vx} style={{ position: "absolute", left: vx, top: 150,
              width: 36, height: 210, borderRadius: 8, background: dkh(CLAY, 0.42) }}>
              {Array.from({ length: 7 }, (_, r) => (
                <div key={r} style={{ position: "absolute", left: 6, top: 12 + r * 28,
                  width: 24, height: 9, borderRadius: 4, background: dkh(CLAY, 0.62) }} />
              ))}
            </div>
          ))}
          {/* ⭐ THE MARK, GIANT, ON ITS FOREHEAD */}
          <div style={{ position: "absolute", left: 310 - 62, top: 34, width: 124, height: 124,
            borderRadius: 30, background: "#FFFFFF", border: "5px solid #EFE3C6",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 20px rgba(6,8,12,0.42)" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 92, height: 92, objectFit: "contain" }} />
          </div>
          {/* the FACE SCREEN — an inset dark panel, which is what makes it a machine */}
          <div style={{ position: "absolute", left: 92, top: 178, width: 436, height: 186,
            borderRadius: 22, background: "#15100A",
            border: `7px solid ${dkh(CLAY, 0.50)}` }} />
          <div style={{ position: "absolute", left: 104, top: 190, width: 412, height: 60,
            borderRadius: "16px 16px 0 0",
            background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.06)} 0%, ${hexa("#FFFFFF", 0)} 100%)` }} />
          {/* the eyes, inside the screen */}
          {[0, 1].map((i) => {
            const cx = i ? 316 : 128;
            const tilt = (i ? -1 : 1) * cross * 17;
            const shut = cough > 0.3 ? 0.24 : 1;
            return (
              <div key={"ey" + i} style={{ position: "absolute", left: cx, top: 222,
                width: 176, height: 62 * shut, borderRadius: 8,
                background: mxh(CLAY, 0.40 - feed * 0.24),
                transform: `rotate(${tilt}deg)`, transformOrigin: "50% 50%" }}>
                <div style={{ position: "absolute",
                  left: 88 - 20 + Math.sin(f / 7 + i * 2) * cross * 30,
                  top: 10 * shut, width: 40, height: Math.max(6, 42 * shut),
                  borderRadius: 6, background: "#15100A" }} />
              </div>
            );
          })}
          {/* the mouth, inside the screen */}
          <svg width={620} height={466} viewBox="0 0 620 466"
            style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
            <path d={Array.from({ length: 9 }, (_, i) => {
              const x = 206 + i * 26;
              const y = 322 + Math.sin(i * 1.3 + f / 6) * cross * 12;
              return `${i ? "L" : "M"} ${x} ${y}`;
            }).join(" ")} fill="none" stroke={mxh(CLAY, 0.40 - feed * 0.24)} strokeWidth={13}
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* the load bar — how full it is, depicted, no numeral */}
          <div style={{ position: "absolute", left: 128, top: 386, width: 364, height: 22,
            borderRadius: 11, background: dkh(CLAY, 0.52) }}>
            {Array.from({ length: 12 }, (_, i) => {
              const on = Math.max(0, Math.min(1, feed * 12 - i));
              return <div key={"lb" + i} style={{ position: "absolute", left: 6 + i * 29.5,
                top: 5, width: 24, height: 12, borderRadius: 3,
                background: on < 0.05 ? dkh(CLAY, 0.66) : (i > 8 ? "#D8482E" : mxh(GOLD, 0.10)),
                opacity: 0.35 + on * 0.65 }} />;
            })}
          </div>
          {/* the intake slot, stencilled with feed chevrons */}
          <div style={{ position: "absolute", left: 186, top: 424, width: 248, height: 30,
            borderRadius: 8, background: dkh(CLAY, 0.70) }} />
          <div style={{ position: "absolute", left: 200, top: 432, width: 220, height: 14,
            borderRadius: 4, background: "#120A05" }} />
        </div>
      </Hit>

      {/* the shovelled load going in — one armful per hit, LARGE */}
      {HITS.slice(0, 4).map((h, n) => {
        const k = E(f, h - 12, h + 4, 0, 1, IN_Q);
        if (k <= 0 || k >= 1) return null;
        return Array.from({ length: 5 }, (_, i) => (
          <Note key={`in${n}_${i}`} x={880 - k * 420 + i * 16} y={300 + k * 250 + i * 10}
            w={CW} h={CH} lit={1} fly={1} s={2.2 - k * 0.6}
            rot={-30 + k * 120 + i * 14} o={1 - k * 0.15} z={86} seed={n * 5 + i} />
        ));
      })}

      {/* ⭐ AND IT COUGHS THE WHOLE LOT BACK OUT, SHREDDED, ON "confused" */}
      {cough > 0.02 && Array.from({ length: 30 }, (_, i) => {
        const k = E(f, 69 + i * 0.35, 69 + i * 0.35 + 15, 0, 1, OUT);
        if (k <= 0) return null;
        const ang = (rnd(i, 5) - 0.5) * 2.2 + Math.PI / 2;
        return <div key={"cg" + i} style={{ position: "absolute",
          left: 506 + Math.cos(ang) * k * (200 + rnd(i, 6) * 460),
          top: 540 + Math.sin(ang) * k * 90 + k * k * 220,
          width: 16 + rnd(i, 7) * 30, height: 8, borderRadius: 3,
          background: FILES[i % FILES.length], opacity: 0.95 - k * 0.25, zIndex: 90,
          transform: `rotate(${k * 340 + i * 24}deg)` }} />;
      })}
      {/* the sprite doing the shovelling, small against it — the scale contrast */}
      <Guy x={918} y={330} f={f} s={1.02} z={78} face={-1}
        costume={{ glasses: 1, suit: 1, xeyes: cough > 0.3 ? 1 : 0, gaze: -1.3,
                   shock: cough * 0.6, nodAmp: 3.6 }} />
      <Motes x={506} y={150} w={420} h={340} n={8} f={f} z={30} />
      {f > 58 && <Chip t="THE ANSWER COMES BACK TORN" y={128} s={0.72} z={95} c={INK} />}
      <Flash lf={f} at={69} n={8} o={0.20} c="#E4C8A2" />
    </Scene>
  );
};

/* ==================================================================== S5 ===
   12.83 -> 14.70s · 56f · HARD CUT, CLOSE · REVEAL
   "Instead build a context compass."

   ⛔ THE PAYOFF IS NOT SPENT HERE. The board's critic pass caught the first
      version firing the routing beam in this scene — the promise delivered at
      12.8s, before the hero earned it. This scene only BIRTHS the artifact.
   EVENT · before: an empty stand, lit, alone on a clear deck.
          · trigger: one cream card drops through the lamp cone (f8).
          · travel: it falls and flips once.
          · arrival that costs: it CLICKS onto the brass, the rose etches itself
                   ring by ring, the needle spins up and overshoots, and a ring of
                   light expands off the card once.
   ====================================================================== */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("pool");
  const fall = E(f, 8, 28, 0, 1, IN_Q);
  const seat = E(f, 28, 34, 0, 1, BACK);
  const etch = E(f, 30, 50, 0, 1, OUT);
  const ring = E(f, 32, 52, 0, 1, OUT);
  return (
    <Scene p={p} slug="COMPASS.md" push={[0, 52, 1.085]} vig={0.60}>
      <Hall p={p} f={f} lightX={0.5} floorLines={3} bleed={40} />
      <FarDoor p={p} open={0.5} />
      {/* the tiled back wall of the pool. A close-up has no business containing
          the wide's set: repainting was not enough, the SURFACE had to change. */}
      {Array.from({ length: 40 }, (_, i) => {
        const c = i % 8, r = Math.floor(i / 8);
        return <div key={"tl" + i} style={{ position: "absolute", left: -20 + c * 134,
          top: 96 + r * 96, width: 126, height: 88, zIndex: 8,
          background: `linear-gradient(166deg, ${mxh(p.back, 0.10)} 0%, ${dkh(p.back, 0.26)} 100%)`,
          boxShadow: `inset 0 -4px 0 ${dkh(p.back2, 0.20)}` }} />;
      })}
      <div style={{ position: "absolute", left: -20, top: 92, right: -20, height: 8, zIndex: 9,
        background: dkh(p.back2, 0.16) }} />
      <Ceiling p={p} f={f} z={88} />
      <Ladder x={186} top={128} bot={604} z={16} f={f} s={0.94} cast={castOf("pool")[0]} castK={castOf("pool")[1]} />
      <HoodLamp x={506} y={104} on={1} s={1.16} z={30} f={f}
        len={520} bot={520} kick={kickAt(f, [29], 1.4)} />
      <Desk p={p} y={604} f={f} cast={castOf("pool")[0]} castK={castOf("pool")[1]} />
      <BoxStack x={862} y={604} n={3} z={46} s={0.9} f={f} cast={castOf("pool")[0]} castK={castOf("pool")[1]} />
      {/* the overhead chain run — furniture, and it never stops */}
      <div style={{ position: "absolute", left: -60, right: -60, top: 82, height: 16, zIndex: 34,
        background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.22)} 0 14px, ${mxh(STEELD, 0.10)} 14px 28px)`,
        transform: `translateX(${-(f * 2.6) % 28}px)` }} />
      {Array.from({ length: 5 }, (_, i) => (
        <Note key={"ch" + i} x={((i * 236 + 30 - f * 2.6) % 1320) - 150} y={98}
          w={92} h={30} lit={0.55} s={1} rot={-2 + (i % 3) * 2} z={35} seed={i + 17} ruled={1} />
      ))}
      {/* the falling card, before it becomes the compass */}
      {fall < 1 && (
        <Note x={452} y={-60 + fall * 268} w={104} h={104} lit={1} s={2}
          rot={fall * 190} z={82} ruled={2} />
      )}
      {/* the ring of light that expands off it, ONCE */}
      {ring > 0.02 && ring < 1 && (
        <div style={{ position: "absolute", left: 506 - 60 - ring * 260,
          top: 288 - 60 - ring * 260, width: 120 + ring * 520, height: 120 + ring * 520,
          borderRadius: "50%", border: `${8 - ring * 6}px solid ${hexa(LAMPC, 0.55 * (1 - ring))}`,
          zIndex: 74 }} />
      )}
      {seat > 0.02 && (
        <CompassCard x={506} y={172 + rock(f, 30, 3)} s={2.05 * (0.92 + seat * 0.08)} z={82}
          f={f} etch={etch} bearing={-38} lock={E(f, 40, 54, 0, 0.8, OUT)} label={etch > 0.8}
          bump={Math.max(0, E(f, 28, 33, 0, 1, OUT) - E(f, 33, 48, 0, 1, IO))} />
      )}
      <Guy x={854} y={396} f={f} s={0.88} z={78} face={-1}
        costume={{ glasses: 1, suit: 1, gaze: -1.4, cheer: E(f, 40, 54, 0, 0.5, OUT) }} />
      <Motes x={506} y={140} w={300} h={420} n={13} f={f} z={72} />
      <Flash lf={f} at={30} n={7} o={0.20} c={LAMPC} />
    </Scene>
  );
};

/* ==================================================================== S6 ===
   14.70 -> 17.77s · 92f · PULL OUT TO THE WIDE · ESCALATE
   "This is one main document that points Claude right to your best ideas."

   ⛔ ONE OF THE REEL'S TWO RE-FRAMING MOVES. The camera pulls back so the scale
      contrast IS the shot: one lit card against two hundred dark ones.
   EVENT · before: the wall re-hung and DARK, the compass lit, the clerk beside it.
          · trigger: the needle swings (f16).
          · travel: ⭐ a hard-edged beam sweeps the wall left to right and every
                   card it crosses lifts a fraction and drops back.
          · arrival that costs: the beam STOPS DEAD on one card, which lights,
                   unlatches with a clack and pops forward off the wall.
   ====================================================================== */
const TARGET = 3 * COLS + 8;                   /* row 4, col 9 — mid-wall, in the lamp */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("wall");
  const sweep = E(f, 16, 58, 0, 1, IO);
  const scanX = 330 + sweep * 660;
  const lockOn = E(f, 58, 66, 0, 1, OUT);
  const pop = E(f, 62, 76, 0, 1, BACK);
  const st = (i: number) => {
    const cx = cardX(i) + CW / 2;
    const near = Math.max(0, 1 - Math.abs(cx - scanX) / 150);
    if (i === TARGET) return lockOn > 0.02 ? { gone: 1 } : { lit: 0.9, dy: -4 };
    /* the wake: the beam has passed, the card is settling back */
    const wake = Math.max(0, Math.min(1, (scanX - cx) / 190));
    const k = Math.max(near, wake * 0.34 * Math.max(0, 1 - (scanX - cx) / 320));
    return { lit: k, dy: -k * 15, s: 1 + k * 0.16, rot: k * (rnd(i, 51) - 0.5) * 6 };
  };
  return (
    <Scene p={p} slug="ONE FILE, TWO HUNDRED NOTES" push={[0, 88, 1.135]} vig={0.60}>
      <Hall p={p} f={f} lightX={0.5} floorLines={4} bleed={40} />
      <FarDoor p={p} open={0.34} />
      <CardWall p={p} f={f} st={st} z={20} cast={castOf("wall")[0]} castK={castOf("wall")[1]} />
      <Ceiling p={p} f={f} z={88} />
      <Ladder x={140} top={110} bot={606} z={38} f={f} s={0.9}
        cast={castOf("wall")[0]} castK={castOf("wall")[1]} />
      {/* the bank's steel end-frame and the cold corridor behind it — the far
          plane this scene was missing, and the cool note that stops the frame
          being four fifths one hue */}
      <div style={{ position: "absolute", left: 902, top: 40, width: 40, bottom: 0, zIndex: 44,
        background: `linear-gradient(90deg, ${mxh(p.lip, 0.34)} 0%, ${dkh(p.back2, 0.06)} 100%)` }} />
      <div style={{ position: "absolute", left: 940, top: 40, width: 92, bottom: 0, zIndex: 43,
        background: "linear-gradient(180deg, #547FA6 0%, #16283E 100%)", opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 954, top: 214, width: 64, height: 300, zIndex: 44,
        background: "linear-gradient(180deg, #9CC4DE 0%, #3E6284 100%)", opacity: 0.55 }} />
      <div style={{ position: "absolute", left: -60, right: -60, top: 78, height: 14, zIndex: 34,
        background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.26)} 0 13px, ${mxh(STEELD, 0.06)} 13px 26px)`,
        transform: `translateX(${(f * 2.4) % 26}px)` }} />
      {Array.from({ length: 5 }, (_, i) => (
        <Note key={"c6" + i} x={((i * 240 + 60 + f * 2.4) % 1330) - 160} y={92}
          w={88} h={28} lit={0.5} s={1} rot={-2 + (i % 3) * 2} z={35} seed={i + 23} ruled={1} />
      ))}
      <HoodLamp x={506} y={100} on={1} s={0.86} z={28} f={f}
        len={360} bot={420} kick={kickAt(f, [62], 1.1)} />
      {/* ⭐ THE SWEEP — large, bright, fast; the only combination that registers */}
      {/* ⭐ THE SWEEP fires from the NEEDLE — compass centre = (x, y + 66*s). */}
      {sweep > 0 && sweep < 1 && (
        <RouteBeam x={252} y={431} toX={scanX} toY={cardY(TARGET) + CH / 2}
          o={0.62} wide={46} z={52} f={f} c={LAMPC} />
      )}
      {lockOn > 0.02 && (<>
        <RouteBeam x={252} y={431} toX={cardX(TARGET) + CW / 2} toY={cardY(TARGET) + CH / 2}
          o={0.46 + lockOn * 0.38} wide={38} z={52} f={f} c={LAMPC} />
        {/* ⭐⭐ EVERYTHING ELSE GOES DOWN AND THIS ONE COMES UP. Alex: *"make
            everything darker except for that and make it glow and then make it
            bigger."* The whole point of the shot is that ONE file out of ninety
            eight is the answer, and until now it was a card lifting 18px. */}
        <Spotlight x={cardX(TARGET) + CW / 2} y={cardY(TARGET) + CH / 2}
          r={210} k={lockOn} z={54} dim={0.76} />
        <div style={{ position: "absolute", left: cardX(TARGET) + CW / 2 - 32 - pop * 40,
          top: cardY(TARGET) + CH / 2 - 32 - pop * 40, width: 64 + pop * 80,
          height: 64 + pop * 80, borderRadius: "50%",
          border: `${8 - pop * 5}px solid ${hexa(LAMPC, 0.80 * (1 - pop * 0.7))}`, zIndex: 58 }} />
        {/* ⭐ THE ONE FILE, drawn OUTSIDE the wall so it is genuinely on top of the
            darkening, at three times its neighbours and lifted clear of the shelf */}
        <div style={{ position: "absolute",
          left: cardX(TARGET) - CW * (1 + pop * 2.1 - 1) / 2,
          top: cardY(TARGET) - 40 * pop + rock(f, 66, 4), zIndex: 72 }}>
          <Note x={0} y={0} w={CW} h={CH} lit={1} fly={1} hue="#F2C463"
            s={1 + pop * 2.1} ruled={5} seed={TARGET} tab="#C8443A" z={72} />
        </div>
      </>)}
      <Desk p={p} y={604} f={f} cast={castOf("wall")[0]} castK={castOf("wall")[1]} />
      <CompassCard x={252} y={358} s={1.10} z={82} f={f} etch={1}
        bearing={-96 + sweep * 118} lock={0.55 + lockOn * 0.4} label
        bump={Math.max(0, E(f, 16, 21, 0, 0.7, OUT) - E(f, 21, 34, 0, 0.7, IO))
              + Math.max(0, E(f, 58, 63, 0, 1, OUT) - E(f, 63, 78, 0, 1, IO))} />
      <Guy x={836} y={401} f={f} s={0.86} z={78} face={-1}
        costume={{ glasses: 1, suit: 1, gaze: -1.2, nodAmp: 3.2 }} />
      <Motes x={506} y={200} w={380} h={360} n={11} f={f} z={70} />
      {f > 70 && <Chip t="IT HOLDS WHERE THEY ARE" y={128} s={0.76} z={95} c={INK} />}
    </Scene>
  );
};

/* ==================================================================== S7 ===
   17.77 -> 21.20s · 103f · LOCKED, DESK LEVEL · ESCALATE
   "When you ask the AI to outline a new YouTube video it reads your context
    compass first"

   ⛔ R4 — this beat and the next are the two DENSEST in the recording (5.4 and
      5.6 wps). Both run ONE hero action and hold their in-panel chip until the
      line has finished, so exactly one channel carries meaning at a time.
   EVENT · before: the clerk holding the real YouTube tile; the rail empty.
          · trigger: he drops the tile into the request slot (f18).
          · travel: a request card rides the rail the FULL WIDTH of the deck.
          · arrival that costs: the rose spins to face it, the reading head drops,
                   the compass CHUNKS one notch and the needle locks on a bearing,
                   and the index riffles like a rolodex and stops on one tab.
   ====================================================================== */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("deck");
  const drop = E(f, 18, 30, 0, 1, IN_Q);
  const ride = E(f, 30, 62, 0, 1, IO);
  const read = E(f, 58, 70, 0, 1, OUT);
  const chunk = E(f, 72, 80, 0, 1, BACK);
  const riffle = E(f, 80, 100, 0, 1, OUT);
  return (
    <Scene p={p} slug="THE REQUEST" push={[0, 100, 1.165]} vig={0.56}>
      <Hall p={p} f={f} lightX={0.46} floorLines={3} bleed={40} />
      <FarDoor p={p} open={0.3} />
      {/* the dark wall, well behind */}
      <Pigeonholes p={p} f={f} x={40} y={104} cols={7} rows={4} cw={148} ch={98} z={10}
        fill={0.72} cast={castOf("deck")[0]} />
      <Ceiling p={p} f={f} z={88} />
      <Ladder x={120} top={104} bot={556} z={30} f={f} s={0.84} cast={castOf("deck")[0]} castK={castOf("deck")[1]} />
      <div style={{ position: "absolute", left: -60, right: -60, top: 74, height: 14, zIndex: 34,
        background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.26)} 0 13px, ${mxh(STEELD, 0.06)} 13px 26px)`,
        transform: `translateX(${-(f * 3.0) % 26}px)` }} />
      {Array.from({ length: 6 }, (_, i) => (
        <Note key={"c7" + i} x={((i * 208 + 30 - f * 3.0) % 1320) - 150} y={88}
          w={86} h={28} lit={0.5} s={1} rot={-2 + (i % 3) * 2} z={35} seed={i + 31} ruled={1} />
      ))}
      <HoodLamp x={620} y={92} on={1} s={0.82} z={28} f={f}
        len={340} bot={400} kick={kickAt(f, [72], 1.0)} />
      <Desk p={p} y={556} f={f} rail={1} slot cast={castOf("deck")[0]} castK={castOf("deck")[1]} />
      {/* the YouTube tile, held then dropped */}
      <div style={{ position: "absolute", left: 118 + drop * 34, top: 300 + drop * 210,
        zIndex: 84, opacity: 1 - E(f, 29, 33, 0, 1, LIN),
        transform: `rotate(${-7 + drop * 24}deg) scale(${1 - drop * 0.34})` }}>
        <div style={{ width: 214, height: 214, borderRadius: 40, background: "#FFFFFF",
          border: "6px solid #E8DCC0", display: "flex", alignItems: "center",
          justifyContent: "center", boxShadow: "0 14px 26px rgba(6,8,12,0.55)" }}>
          <Img src={staticFile("logos/youtube.svg")} style={{ width: 148, height: 148 }} />
        </div>
      </div>
      {/* the request card riding the rail, the full width of the deck */}
      {ride > 0 && (
        <div style={{ position: "absolute", left: 118 + ride * 340, top: 522,
          zIndex: 60, transform: `rotate(${Math.sin(f / 7) * 2.2}deg)` }}>
          <div style={{ width: 92, height: 66, borderRadius: 5, background: CARD,
            boxShadow: "0 6px 13px rgba(6,8,12,0.45)" }}>
            <Img src={staticFile("logos/youtube.svg")}
              style={{ width: 34, height: 34, marginLeft: 29, marginTop: 8 }} />
            <div style={{ position: "absolute", left: 16, top: 48, width: 60, height: 5,
              borderRadius: 3, background: dkh(CARDD, 0.20) }} />
          </div>
        </div>
      )}
      {/* the reading head, dropping to meet it */}
      <div style={{ position: "absolute", left: 452, top: 236 + read * 58, zIndex: 76 }}>
        <div style={{ position: "absolute", left: 0, top: -140, width: 14, height: 152,
          background: dkh(STEELD, 0.28) }} />
        <div style={{ position: "absolute", left: -52, top: 8, width: 118, height: 46,
          borderRadius: 9, background: `linear-gradient(180deg, ${STEEL} 0%, ${STEELD} 100%)` }} />
        <div style={{ position: "absolute", left: -34, top: 16, width: 46, height: 46,
          borderRadius: 11, background: "#FFFFFF", border: "3px solid #E8DCC0",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")} style={{ width: 32, height: 32 }} />
        </div>
        {read > 0.5 && (
          <Beam x={4} y={54} top={80} bot={190} len={150} c={LAMPC} o={0.30} z={-1} f={f} />
        )}
      </div>
      <CompassCard x={506} y={252} s={1.44} z={82} f={f} etch={1}
        bearing={-96 + read * 62 + chunk * 12} lock={0.4 + chunk * 0.58} label
        bump={Math.max(0, E(f, 72, 77, 0, 1, OUT) - E(f, 77, 92, 0, 1, IO))
              + Math.max(0, E(f, 58, 62, 0, 0.5, OUT) - E(f, 62, 74, 0, 0.5, IO))} />
      {/* ⛔ ALEX: *"at 19 seconds ... too little motion right now."* It measured the
          lowest in the reel (6.99). The scene was ONE small card riding a rail for
          three and a half seconds. Three changes, all from the measured table:
          the return flow is now FULL-SIZE files at twice the rate, the request
          queue stacks up behind the slot, and the pigeonhole wall behind is being
          worked — cards popping in and out of their cells the whole shot. */}
      {Array.from({ length: 9 }, (_, i) => (
        <Note key={"rt" + i} x={((i * 132 + 40 + f * 9.4) % 1320) - 160} y={596}
          w={CW} h={CH} lit={1} fly={0.5} s={1.15} rot={-2 + (i % 3) * 2}
          z={44} seed={i + 9} ruled={2} />
      ))}
      {/* the queue waiting to be filed, shuffling forward */}
      {Array.from({ length: 6 }, (_, i) => {
        const q = Math.max(0, 1 - E(f, 14 + i * 5, 22 + i * 5, 0, 1, OUT));
        return <Note key={"qq" + i} x={64 + i * 22 + q * 30} y={392 - i * 9}
          w={CW * 1.1} h={CH * 1.1} lit={1} s={1} rot={-7 + i * 2.4}
          z={40 + i} seed={i + 44} ruled={2} />;
      })}
      {/* ⭐ the wall is being WORKED — a cell empties and refills somewhere every
          few frames, which is the "real content arriving" line of the table */}
      {Array.from({ length: 7 }, (_, i) => {
        const ph = (f * 1.6 + i * 27) % 120;
        const k = ph < 34 ? E(ph, 0, 16, 0, 1, OUT) - E(ph, 16, 34, 0, 1, IO) : 0;
        if (k <= 0.02) return null;
        return <Note key={"wk" + i} x={92 + ((i * 5) % 7) * 148} y={128 + (i % 4) * 98 - k * 34}
          w={CW * 1.2} h={CH * 1.2} lit={1} fly={k} s={1 + k * 0.3}
          rot={k * 14 * (i % 2 ? 1 : -1)} o={1} z={62} seed={i + 61} ruled={2} />;
      })}
      {/* the index tabs, riffling under the stand for the WHOLE shot */}
      {Array.from({ length: 26 }, (_, i) => {
        const w = Math.sin(f / 5.5 - i * 0.42);
        return <div key={"tb" + i} style={{ position: "absolute", left: 300 + i * 16,
          top: 500 - Math.max(0, w) * 26, width: 11, height: 42 + Math.max(0, w) * 20,
          borderRadius: 2, background: mxh(CARDD, 0.10 + Math.max(0, w) * 0.34), zIndex: 60 }} />;
      })}
      {/* and it STOPS on one tab */}
      {riffle > 0.02 && Array.from({ length: 18 }, (_, i) => {
        const t = Math.min(1, riffle * 1.5);
        const on = i / 18 < t;
        const hit = i === 11 && riffle > 0.75;
        return <div key={"rf" + i} style={{ position: "absolute", left: 396 + i * 13,
          top: 542 - (on ? 12 : 0) - (hit ? 12 : 0), width: 9,
          height: 30 + (hit ? 16 : 0), borderRadius: 2,
          background: hit ? GOLD : mxh(CARDD, on ? 0.34 : 0.02), zIndex: 62 }} />;
      })}
      <Guy x={172} y={334} f={f} s={0.94} z={78} face={1}
        costume={{ glasses: 1, suit: 1, gaze: 1.2, cheer: E(f, 72, 88, 0, 0.4, OUT) }} />
      <Motes x={560} y={180} w={330} h={340} n={9} f={f} z={70} />
      {f > 84 && <Chip t="IT CHECKS THE PAGE FIRST" y={128} s={0.76} z={95} c={INK} />}
    </Scene>
  );
};

/* ==================================================================== S8 ===
   21.20 -> 23.97s · 83f · WIDE, LOCKED · ⭐ PAYOFF, THE PEAK
   "and it pulls the exact research you need and gives you a clear summary."

   ⛔ THE PEAK GETS THE BIGGEST EVENT, NOT A CAMERA MOVE. A re-framing here would
      compete with the three cards crossing the room.
   ⛔⛔ THE THREE ARRIVALS ARE STAGGERED ACROSS THE WHOLE SHOT — landing at 46%,
      66% and 77% of it. Bunching them in the first third and holding is exactly
      what put a reel-104 rebuild at 5.94 against a 6.0 bar.
   EVENT · before: 200 dark cards, the needle locked on its bearing.
          · trigger: the beam FIRES along the bearing (f6).
          · travel: three cards of two hundred light, unlatch, and fly across the
                   room on three arcs.
          · arrival that costs: they SLAM one-two-three with a squash, a recoil, a
                   dust ring and a lamp swing, then fold and STAND UP as one brief.
   ====================================================================== */
const PICKS = [2 * COLS + 3, 4 * COLS + 9, 1 * COLS + 11];
const PICK_HUE = ["#F0C05E", "#E88A54", "#F2E4C4"];   /* warm, against the blue room */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("beamroom");
  const fire = E(f, 6, 14, 0, 1, OUT);
  /* leaves at 10/22/30 and lands at 38/55/64 of 83 — 46% / 66% / 77% */
  const LEAVE = [8, 20, 28], LAND = [34, 50, 60];
  const flyOf = (n: number) => E(f, LEAVE[n], LAND[n], 0, 1, IO);
  const DX = [300, 552, 800], DY = [446, 446, 446];
  const st = (i: number) => {
    const n = PICKS.indexOf(i);
    if (n < 0) return { lit: 0.05 };
    /* the three that leave are warm, so they never vanish into the cool room */
    const k = flyOf(n);
    const sx = cardX(i), sy = cardY(i);
    const arc = Math.sin(k * Math.PI) * -140;
    return { lit: 1, fly: Math.min(1, k * 2), dx: (DX[n] - sx) * k, dy: (DY[n] - sy) * k + arc,
      s: 1 + k * 2.9, rot: k * (n === 1 ? 22 : n === 0 ? -30 : 34),
      o: 1 - E(f, LAND[n] + 2, LAND[n] + 6, 0, 1, LIN) };
  };
  const fold = E(f, 60, 69, 0, 1, OUT);
  const rise = E(f, 62, 78, 0, 1, BACK);
  return (
    <Scene p={p} slug="THREE OF TWO HUNDRED" push={[0, 78, 1.095]} vig={0.58}>
      <Hall p={p} f={f} lightX={0.5} floorLines={4} bleed={40} />
      <FarDoor p={p} open={0.32} />
      <CardWall p={p} f={f} st={st} z={20} cast={castOf("beamroom")[0]} castK={castOf("beamroom")[1]}
        hueOf={(i) => { const n = PICKS.indexOf(i); return n >= 0 ? PICK_HUE[n] : undefined; }} />
      <Ceiling p={p} f={f} z={88} />
      <Ladder x={128} top={110} bot={560} z={38} f={f} s={0.88} cast={castOf("beamroom")[0]} castK={castOf("beamroom")[1]} />
      <HoodLamp x={506} y={100} on={1} s={0.86} z={28} f={f}
        len={360} bot={420} kick={kickAt(f, LAND, 1.5)} />
      {fire > 0.02 && PICKS.map((i, n) => flyOf(n) < 0.30 && flyOf(n) > 0 ? (
        <RouteBeam key={"bm" + n} x={196} y={386} toX={cardX(i) + CW / 2} toY={cardY(i) + CH / 2}
          o={(0.50 + fire * 0.34) * (1 - flyOf(n) / 0.30)} wide={30} z={52} f={f} c={LAMPC} />
      ) : null)}
      <Desk p={p} y={556} f={f} cast={castOf("beamroom")[0]} castK={castOf("beamroom")[1]} />
      {/* the three landings: squash, recoil, dust ring */}
      {LAND.map((t, n) => {
        const k = E(f, t, t + 12, 0, 1, OUT);
        if (k <= 0.02 || fold > 0.85) return null;
        return (<React.Fragment key={"ld" + n}>
          <Note x={DX[n] - 100} y={430 + rock(f, t, 7)} w={200} h={142} lit={1} seed={n * 7 + 3}
            s={1 + (1 - k) * 0.34} rot={rock(f, t, 7)} z={72} ruled={6}
            tab={["#C8443A", "#3F9E74", "#5AA0DE"][n]} />
          <Contact x={DX[n] - 96} y={568} w={192} z={69} o={0.44} />
          {/* the dust ring the arrival costs */}
          <div style={{ position: "absolute", left: DX[n] - 118 * k, top: 560 - 16 * k,
            width: 236 * k, height: 46 * k, borderRadius: "50%",
            border: `${7 - k * 5}px solid ${hexa(LAMPC, 0.44 * (1 - k))}`, zIndex: 70 }} />
          {/* the squash: it lands, it does not appear */}
          <div style={{ position: "absolute", left: DX[n] - 100, top: 566,
            width: 200, height: 10 * (1 - k), borderRadius: 6,
            background: hexa("#F6E8CE", 0.34 * (1 - k)), zIndex: 71 }} />
        </React.Fragment>);
      })}
      {/* they fold together and it STANDS UP */}
      {rise > 0.02 && <Brief x={506} y={572} f={f - 62} rise={rise} s={1.40} z={78}
        tick={E(f, 70, 78, 0, 1, OUT)} />}
      <CompassCard x={196} y={308} s={1.18} z={80} f={f} etch={1} bearing={-34}
        lock={0.95} label={false}
        bump={[8, 20, 28].reduce((a, tt) => a + Math.max(0,
          E(f, tt - 2, tt + 3, 0, 0.8, OUT) - E(f, tt + 3, tt + 16, 0, 0.8, IO)), 0)} />
      <Guy x={866} y={348} f={f} s={0.88} z={79} face={-1}
        costume={{ glasses: 1, suit: 1, gaze: -1.3, cheer: E(f, 62, 76, 0, 0.85, OUT) }} />
      <Motes x={506} y={200} w={400} h={340} n={10} f={f} z={68} />
      {f > 70 && <Chip t="THREE FILES, NOT TWO HUNDRED" y={128} s={0.7} z={95} c={INK} />}
      <Flash lf={f} at={60} n={7} o={0.18} c={LAMPC} />
    </Scene>
  );
};

/* ==================================================================== S9 ===
   23.97 -> 26.34s · 71f · CLOSE ON THE WALL EDGE · ESCALATE
   "You can add new notes anytime without breaking the system."

   ⭐⭐ THE STILLNESS IS THE INFORMATION, and it only reads because S0 spent two
      hundred cards moving at once. The reel earns this shot by having shown its
      opposite. ⛔ This is the only beat in the reel with no heavy transient.
   ⛔ §0.1 OF THE BOARD — A HAND PUTS THE CARD IN. Nothing in this reel maintains
      itself, because the VO does not claim it does.
   EVENT · before: the wall, hung, still.
          · trigger: a hand drops a new card into the top rail (f10).
          · travel: it slides the width of the frame and clicks into the empty slot.
          · arrival that costs: the counter flips 200 -> 201, the needle TWITCHES
                   once and re-settles, a green tick lights — and nothing else moves.
   ====================================================================== */
export const S9: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("edge");
  const slide = E(f, 10, 40, 0, 1, IO);
  const seat = E(f, 40, 47, 0, 1, BACK);
  const flip = E(f, 46, 56, 0, 1, OUT);
  const twitch = E(f, 47, 51, 0, 1, OUT) - E(f, 51, 60, 0, 1, IO);
  const SLOT = 3 * COLS + 12;
  const st = (i: number) => (i === SLOT ? { gone: seat > 0.5 ? 0 : 1, lit: seat }
                                        : { lit: 0.10 });
  return (
    <Scene p={p} slug="" push={[0, 68, 1.04]} vig={0.58}>
      <Hall p={p} f={f} lightX={0.5} floorLines={4} bleed={40} />
      <FarDoor p={p} open={0.3} />
      <div style={{ position: "absolute", inset: 0, zIndex: 6,
        transform: "scale(1.42) translate(-150px, -46px)", transformOrigin: "50% 50%" }}>
        <CardWall p={p} f={f} st={st} holes={seat > 0.5 ? 0 : 0.8} z={20}
          cast={castOf("edge")[0]} castK={castOf("edge")[1]} />
      </div>
      {/* the cool counter-note, so the warm scene is not a single-hue wash: the
          steel end-frame of the bank, and the far door behind it */}
      <div style={{ position: "absolute", left: 856, top: 60, width: 44, bottom: 0, zIndex: 44,
        background: `linear-gradient(90deg, ${mxh(p.lip, 0.30)} 0%, ${dkh(p.back2, 0.10)} 100%)` }} />
      <div style={{ position: "absolute", left: 900, top: 60, width: 96, bottom: 0, zIndex: 43,
        background: `linear-gradient(180deg, #4E7A9E 0%, #14243A 100%)`, opacity: 0.85 }} />
      <Ceiling p={p} f={f} z={88} />
      <HoodLamp x={430} y={100} on={1} s={0.8} z={28} f={f} len={330} bot={380} />
      <Desk p={p} y={604} f={f} props={false} cast={castOf("edge")[0]} castK={castOf("edge")[1]} />
      <BoxStack x={880} y={604} n={2} z={46} s={0.86} f={f} cast={castOf("edge")[0]} castK={castOf("edge")[1]} />
      {/* the new card, put in BY HAND, sliding the width of the frame */}
      {slide < 1 && (
        <div style={{ position: "absolute", left: 40 + slide * 620, top: 132 + slide * 96,
          zIndex: 84, transform: `rotate(${-8 + slide * 8}deg)` }}>
          <Note x={0} y={0} w={64} h={48} lit={1} s={2.6} z={84} ruled={3} seed={5} />
        </div>
      )}
      {/* ⛔ the hand that does it — the index does not update itself */}
      {f < 26 && (
        <div style={{ position: "absolute", left: -46 + slide * 300, top: 196 + slide * 60,
          zIndex: 86, opacity: 1 - E(f, 18, 26, 0, 1, LIN) }}>
          <Guy x={0} y={0} f={f} s={0.78} z={86} face={1} ground={false}
            costume={{ glasses: 1, suit: 1, gaze: 1.4, cheer: 0.7 }} />
        </div>
      )}
      <Counter x={640} y={528} v="200" nx="201" k={flip} s={1.52} z={80} />
      <CompassCard x={230} y={252} s={1.44} z={82} f={f} etch={1} bearing={-34}
        lock={0.96} twitch={twitch} label={false} tick={E(f, 52, 62, 0, 1, OUT)}
        bump={Math.max(0, E(f, 44, 48, 0, 0.55, OUT) - E(f, 48, 60, 0, 0.55, IO))} />
      {/* ⭐ the ONLY other live thing in the frame */}
      <Motes x={430} y={150} w={280} h={380} n={12} f={f} z={70} />
      {f > 55 && <Chip t="NOTHING ELSE CHANGES" y={128} s={0.76} z={95} c={INK} />}
    </Scene>
  );
};

/* =================================================================== S10 ===
   26.34 -> 28.87s · 76f · LOCKED, DECK LEVEL · PAYOFF
   "Claude will even write your final script and save it directly for you."

   ⛔ §0.2 OF THE BOARD — THIS IS A FILE WRITE, NOT A PUBLISH. It ends in a folder
      in a drawer. Nothing is drawn uploading, posting or sending.
   ⛔ THE PAGE FILLS WITH GREY RULED BARS, NEVER READABLE TYPE.
   EVENT · before: a blank page in the carriage, the brief standing beside it.
          · trigger: the clerk pulls the lever (f8).
          · travel: the print head sweeps and the page fills band by band, rising.
          · arrival that costs: it drops into the folder, which SNAPS shut; a
                   SCRIPT.md label lands; the lamp swings; the drawer takes it.
   ====================================================================== */
export const S10: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("press");
  const lever = E(f, 8, 16, 0, 1, BACK) - E(f, 22, 32, 0, 1, IO);
  const fill = E(f, 10, 46, 0, 1, IO);
  const drop = E(f, 46, 54, 0, 1, IN_Q);
  const shut = E(f, 52, 60, 0, 1, BACK);
  const stamp = E(f, 56, 66, 0, 1, BACK);
  const slide = E(f, 66, 76, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="SCRIPT.md" push={[0, 77, 1.150]} vig={0.56}>
      <Hall p={p} f={f} lightX={0.54} floorLines={3} bleed={40} />
      <FarDoor p={p} open={0.3} />
      <Pigeonholes p={p} f={f} x={30} y={98} cols={6} rows={4} cw={172} ch={104} z={10}
        fill={0.58} cast={castOf("press")[0]} />
      <Ceiling p={p} f={f} z={88} />
      <Ladder x={132} top={104} bot={584} z={30} f={f} s={0.84} cast={castOf("press")[0]} castK={castOf("press")[1]} />
      <HoodLamp x={560} y={90} on={1} s={0.84} z={28} f={f}
        len={340} bot={420} kick={kickAt(f, [52, 70], 1.2)} />
      <Desk p={p} y={584} f={f} cast={castOf("press")[0]} castK={castOf("press")[1]} />
      {/* the brief from S8, still standing */}
      <Brief x={172} y={596} f={f + 40} rise={1} s={0.92} z={70} tick={1} />
      {/* the feed rollers and the return band — furniture, so they cost the
          hierarchy nothing and the shot is never still */}
      <div style={{ position: "absolute", left: -60, right: -60, top: 618, height: 26, zIndex: 26,
        background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.10)} 0 22px, ${dkh(STEELD, 0.34)} 22px 44px)`,
        transform: `translateX(${-(f * 4.2) % 44}px)` }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: 60 + i * 176, top: 600,
          width: 42, height: 42, borderRadius: 22, background: dkh(STEELD, 0.22), zIndex: 27 }}>
          <div style={{ position: "absolute", left: 19, top: 4, width: 4, height: 34,
            borderRadius: 2, background: STEELL, opacity: 0.5,
            transform: `rotate(${f * 7 + i * 30}deg)`, transformOrigin: "50% 50%" }} />
        </div>
      ))}
      <Carriage x={618} y={196} f={f} fill={fill} lever={lever} z={60} s={1.44} />
      {/* the page dropping into the folder */}
      {drop > 0.02 && drop < 1 && (
        <div style={{ position: "absolute", left: 508, top: 300 + drop * 236, zIndex: 61,
          transform: `rotate(${drop * 8}deg)` }}>
          <div style={{ width: 196, height: 250, borderRadius: 5, background: CARD,
            boxShadow: "0 10px 20px rgba(6,8,12,0.5)" }} />
        </div>
      )}
      {shut > 0.02 && (
        <Folder x={640} y={580} shut={shut} stamp={stamp} slide={slide} z={64} s={1.44} />
      )}
      <Guy x={892} y={367} f={f} s={0.92} z={78} face={-1}
        costume={{ glasses: 1, suit: 1, cheer: E(f, 52, 66, 0.2, 0.9, OUT), gaze: -1.2 }} />
      <Motes x={584} y={170} w={320} h={340} n={9} f={f} z={68} />
      {f > 62 && <Chip t="IT LANDS IN YOUR FOLDER" y={128} s={0.76} z={95} c={INK} />}
    </Scene>
  );
};

/* =================================================================== S11 ===
   28.87 -> 30.27s · 42f · CTA
   "Comment route for the free guide."
   ⛔ THE REEL HARD-CUTS ON THE LAST AUDIBLE SAMPLE — 908 frames, measured.
   ====================================================================== */
export const S11Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("cta");
  /* local (lead-6): comment 0 · route 6 · guide 25 */
  const word = E(f, 2, 10, 0, 1, BACK);
  const guide = E(f, 9, 22, 0, 1, BACK);
  const shine = E(f, 19, 37, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, 37, 1.10]} vig={0.44}>
      <Hall p={p} f={f} lightX={0.46} floorLines={3} bleed={40} />
      <FarDoor p={p} open={0.5} />
      {/* the wall, one lit card, held as the last image of the mechanism */}
      <div style={{ position: "absolute", inset: 0, zIndex: 6, opacity: 0.55,
        transform: "scale(0.94) translateY(-24px)" }}>
        <CardWall p={p} f={f} st={(i) => (i === TARGET ? { lit: 1 } : { lit: 0.08 })} z={20} cast={castOf("cta")[0]} castK={castOf("cta")[1]} />
      </div>
      <Mark x={92} y={168} s={104} z={90} />
      {/* the keyword, landing hard */}
      {/* ⭐ THE ASK GETS ITS OWN CARD, and the keyword gets a second container
          inside that. It was set straight onto the set and read as part of the
          scene; the one thing the reel is asking for should be the most enclosed
          object on screen. A dark scrim sits behind it so the card has a ground
          to separate FROM. */}
      <div style={{ position: "absolute", left: -40, right: -40, top: 150, height: 230, zIndex: 90,
        background: `linear-gradient(180deg, ${hexa(p.back2, 0)} 0%, ${hexa(p.back2, 0.80)} 26%, ${hexa(p.back2, 0.80)} 74%, ${hexa(p.back2, 0)} 100%)`,
        opacity: word }} />
      <CtaPlate y={236} k={word} word="ROUTE" lead="COMMENT" s={0.94} z={92} f={f} />
      {/* the guide, with the compass rose on its cover — the artifact handed over */}
      <div style={{ position: "absolute", left: 506 - 214, top: 356 + (1 - guide) * 190,
        zIndex: 88, opacity: guide, transform: `rotate(${-4 + guide * 4}deg)` }}>
        <div style={{ width: 428, height: 308, borderRadius: 14,
          background: `linear-gradient(168deg, ${CARDL} 0%, ${CARD} 70%, ${CARDD} 100%)`,
          boxShadow: "0 18px 34px rgba(6,8,12,0.6)" }} />
        <div style={{ position: "absolute", left: 32, top: 34, width: 262, height: 17,
          borderRadius: 8, background: dkh(CARDD, 0.24) }} />
        <div style={{ position: "absolute", left: 32, top: 64, width: 176, height: 13,
          borderRadius: 6, background: dkh(CARDD, 0.14) }} />
        <div style={{ position: "absolute", left: 214, top: 118, zIndex: 3 }}>
          <CompassCard x={0} y={0} s={0.86} z={3} f={f} etch={1} bearing={-30} lock={1}
            label={false} stand={false} />
        </div>
        {/* the shine that crosses the cover once */}
        <div style={{ position: "absolute", left: -130 + shine * 580, top: 0, width: 120,
          height: 308, background: `linear-gradient(100deg, ${hexa("#FFFFFF", 0)} 0%, ${hexa("#FFFFFF", 0.34)} 50%, ${hexa("#FFFFFF", 0)} 100%)`,
          transform: "skewX(-14deg)", zIndex: 6 }} />
      </div>
      <Guy x={886} y={303} f={f} s={0.92} z={86} face={-1}
        costume={{ glasses: 1, suit: 1, cheer: 0.9, gaze: -1.2 }} />
      <Motes x={506} y={200} w={420} h={340} n={10} f={f} z={70} />
    </Scene>
  );
};

/* ===========================================================================
   ⭐ HOOK VARIANTS — docs/THE-OPEN.md step 1: *"The first build step of any reel
   is not scene 0. It is N concepts for scene 0."* Three genuinely different
   EVENTS, not one world in three colourways.

   ⛔ ALL THREE ARE ON-THEME, and that is deliberate. Reel 104 ran this step with
   four METAPHOR worlds (a pit lane, a hangar, a rocket, a substation) and Alex
   rejected all four for not being about the subject; the three that survived were
   built from the subject's own objects. So these vary the EVENT and the FRAMING,
   never the vocabulary: every object in all three is a note, a prompt box, a
   card wall or a Claude.

   A · THE AVALANCHE (S0Hook)  — WIDE. The whole wall lets go and pours into the
       hopper. Sells SCALE: two hundred things moving at once.
   B · THE BURST BOX (S0HookB) — CLOSE. One prompt box on the counter, crammed
       until the lid blows off. Sells the ACT: this is you, doing it.
   C · THE TIP (S0HookC)       — LOW. The whole card bank tips forward and empties
       over the counter onto the camera. Sells the CONSEQUENCE: it lands on you.
   ========================================================================= */

/** the prompt box: a crate with a slot and the mark, the thing you paste into */
const PromptBox: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  swell: number; burst: number }> = ({ x, y, s = 1, z = 60, f, swell, burst }) => {
  const w = 340 + swell * 92, h = 232 + swell * 54;
  const shake = swell > 0.5 ? Math.sin(f / 1.9) * swell * 3.4 : 0;
  return (
    <div style={{ position: "absolute", left: x + shake, top: y, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      <Contact x={-w / 2} y={0} w={w} z={-1} o={0.5} />
      {/* the lid, blowing off */}
      <div style={{ position: "absolute", left: -w / 2 - 16, top: -h - 26 - burst * 300,
        width: w + 32, height: 30, borderRadius: 6,
        background: `linear-gradient(180deg, ${mxh(OAK, 0.22)} 0%, ${dkh(OAK, 0.20)} 100%)`,
        transform: `rotate(${burst * -34}deg)`, boxShadow: "0 8px 16px rgba(6,8,12,0.5)" }} />
      <div style={{ position: "absolute", left: -w / 2, top: -h, width: w, height: h,
        borderRadius: 8, background: `linear-gradient(168deg, ${mxh(OAK, 0.14)} 0%, ${dkh(OAK, 0.32)} 100%)`,
        boxShadow: "0 14px 26px rgba(6,8,12,0.55)" }} />
      {/* the slot you cram it into */}
      <div style={{ position: "absolute", left: -w / 2 + 46, top: -h + 26, width: w - 92,
        height: 34, borderRadius: 5, background: "#0D1014" }} />
      {/* the staples down the seam, popping as it swells */}
      {Array.from({ length: 6 }, (_, i) => {
        const gone = swell > (i + 1) / 7;
        return <div key={"st" + i} style={{ position: "absolute", left: -w / 2 - 5,
          top: -h + 72 + i * ((h - 96) / 6), width: 14, height: 8, borderRadius: 2,
          background: gone ? dkh(OAK, 0.44) : STEELL, opacity: gone ? 0.4 : 1 }} />;
      })}
      <div style={{ position: "absolute", left: -74, top: -h + 92, zIndex: 4 }}>
        <MarkPlate x={0} y={0} t="YOUR PROMPT" s={1.0} z={4} />
      </div>
      {/* the seam splitting */}
      {burst > 0.02 && (
        <div style={{ position: "absolute", left: -w / 2 + 12, top: -h + 74, width: w - 24,
          height: 7 + burst * 22, background: "#0D1014", opacity: 0.9, borderRadius: 4 }} />
      )}
    </div>
  );
};

/* B · THE BURST BOX — CLOSE. One object, crammed until it fails.
   EVENT · before: a box on the counter, the clerk with an armful of cards.
          · trigger: he crams the first armful in (f8).
          · travel: three more armfuls; the box swells, staples pop one by one.
          · arrival that costs: the lid BLOWS OFF and sixty cards erupt at the
            lens; he is thrown back and lands on his heels. */
export const S0HookB: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("morning");
  /* ⛔ f0 IS MID-ACT: the box is already at 40% and the third armful is already
     in flight. v1 opened on a closed box and a clerk standing still, and measured
     3 of 6 opening half-seconds STATIC. */
  const swell = E(f, -16, 50, 0.10, 1, OUT);
  const burst = E(f, 50, 60, 0, 1, OUT);
  const kick = E(f, 50, 56, 0, 1, OUT);
  const BHITS = [3, 15, 27, 39, 50];
  return (
    <Scene p={p} slug="THE NOTE ROOM" push={[0, 76, 1.055]} vig={0.18} glow={hexa(GOLD, 0.10)}>
      <Hall p={p} f={f} lightX={0.18} floorLines={4} bleed={40} />
      {/* ⭐ the wall is the SOURCE here too, and it is what makes frame 0 move */}
      <Hit f={f} at={BHITS} amp={0.7} z={6}>
        <div style={{ position: "absolute", inset: 0,
          transform: "scale(1.06) translate(30px, -16px)" }}>
          <CardWall p={p} f={f} st={rowSlab(f, 430, 470, { gap: 8.6, start: -5, travel: 24 })}
            holes={E(f, 0, 56, 0.12, 1, LIN)} z={20} turn={9} tabs={0.22} wash={0.16}
            cast={castOf("morning")[0]} castK={castOf("morning")[1]} />
        </div>
      </Hit>
      {BHITS.map((h, i) => {
        const k = E(f, h - 9, h + 13, 0, 1, LIN);
        if (k <= 0 || k >= 1) return null;
        return <Note key={"bf" + i} x={-300 + k * 1620} y={240 + (i % 3) * 190 - k * 170}
          w={CW} h={CH} lit={1} fly={1} s={5.0 + (i % 2) * 1.5} rot={k * 300 + i * 60}
          o={0.96 - k * 0.10} z={95} seed={i + 90} ruled={4}
          tab={i % 2 === 0 ? "#C8443A" : "#5AA0DE"} />;
      })}
      <Window p={p} f={f} />
      <Ceiling p={p} f={f} z={88} />
      <HoodLamp x={786} y={96} on={0} s={1.0} z={70} f={f} kick={kick * 1.6} />
      <Desk p={p} y={584} f={f} z={84} clutter={0} lip={false} day={1} />
      <div style={{ position: "absolute", left: 208, top: 178, width: 430, height: 410,
        zIndex: 78, pointerEvents: "none", opacity: 0.04 + Math.max(0, swell - 0.55) * 0.50,
        background: `radial-gradient(56% 62% at 48% 70%, ${hexa("#0A0A12", 0.84)} 0%, ${hexa("#0A0A12", 0.52)} 48%, ${hexa("#0A0A12", 0)} 80%)` }} />
      <PromptBox x={412} y={578} s={0.84} z={82} f={f} swell={swell} burst={burst} />
      {/* the armfuls going in — four, spread across the shot */}
      {[-9, 3, 15, 27, 39].map((t, n) => {
        const k = E(f, t, t + 13, 0, 1, IN_Q);
        if (k <= 0 || k >= 1) return null;
        return Array.from({ length: 7 }, (_, i) => (
          <Note key={`am${n}_${i}`} x={720 - k * 300 + i * 13} y={430 + k * 74 + i * 5}
            w={CW * 1.6} h={CH * 1.6} lit={1} fly={1} s={1.2} rot={-24 + k * 40 + i * 7}
            o={1 - k * 0.2} z={86} seed={n * 11 + i} />
        ));
      })}
      {/* ⭐ THE ERUPTION — sixty cards at the lens */}
      {burst > 0.02 && Array.from({ length: 44 }, (_, i) => {
        const t = E(f, 50 + (i % 7) * 1.1, 50 + (i % 7) * 1.1 + 26, 0, 1, OUT);
        if (t <= 0) return null;
        const ang = (rnd(i, 3) - 0.5) * 2.6 - Math.PI / 2;
        return <Note key={"er" + i} x={430 + Math.cos(ang) * t * (300 + rnd(i, 4) * 620)}
          y={352 + Math.sin(ang) * t * (240 + rnd(i, 5) * 300) + t * t * 420}
          w={CW} h={CH} lit={1} fly={1} s={1.2 + t * (1.6 + rnd(i, 6) * 2.4)}
          rot={t * 520 + i * 33} o={1 - t * t * 0.25} z={93} seed={i + 30} />;
      })}
      <Guy x={824} y={296 + kick * 30} f={f} s={1.24} z={78} face={-1} ground={false}
        costume={{ glasses: 1, suit: 1, stern: 0.4, gaze: -1.2, shock: kick * 0.7, nodAmp: 3.8 }} />
      <MarkPlate x={556} y={660} t="CLAUDE CODE" s={1.2} z={90} />
      <Mark x={122} y={640} s={70} z={90} />
      <Trolley p={p} x={-140} y={584} f={f} z={92} s={1.06} />
      {f > 62 && <Chip t="200 NOTES, ONE PROMPT" y={128} s={0.82} z={96} c={INK} />}
      <Flash lf={f} at={50} n={8} o={0.22} />
    </Scene>
  );
};

/* C · THE TIDE — THE LEVEL RISES AND WE CUT BEFORE IT TOPS OUT.
   ⛔⛔ THE TOWER WAS REPLACED, NOT ADJUSTED. Alex: *"completely redo the third
      version of the hook ... it is not interesting nor builds anticipation."*
      The second half of that is the diagnosis and it is precise: a tower that
      grows and falls is a COMPLETE micro-story inside 2.5 seconds. It poses a
      question and answers it, so at the cut there is nothing outstanding — and
      an open that resolves has spent itself. That is `dopamine-ladder` L3:
      the loop has to be HELD and ESCALATING at the cut, never closed in it.

   ⭐ THE TIDE HOLDS IT OPEN. Notes fill the room from the floor up. The level is
      the meter — the least ambiguous escalation there is — and it never stops
      climbing: past the counter, past his waist, past his chest, and at f50 a
      whole mass dumps in and the level JUMPS a step (the frame the crash lands
      on). We cut at his chin with the surface still rising. Nothing resolves.
      The viewer is left holding "how does this end", which is what the next
      twenty six seconds are for.

   ⭐ And it is a genuinely different SHAPE from its siblings, not a third
      colourway: A moves ACROSS the frame, B bursts OUTWARD, C rises UP.

   EVENT · before: notes already up to the counter top, more falling in.
          · trigger: the level passes the counter and he starts pushing back (f12).
          · travel: it climbs his body, he goes up on his toes, the wall vanishes
            under it.
          · arrival that costs: at f50 a mass dumps in, the level jumps a whole
            step, and ⛔ THERE IS NO ARRIVAL AFTER THAT — we cut on the rise. */
export const S0HookC: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("morning");

  /* the level, in panel y. 700 is under the counter, 190 is chin height. It
     climbs the whole shot, and it takes one hard STEP at f50. */
  const climb = E(f, -10, 76, 0, 1, LIN);
  const surge = E(f, 48, 58, 0, 1, OUT);
  const lvl = 706 - climb * 268 - surge * 46;
  const CHITS = [4, 16, 28, 40, 50];
  const crest = (i: number) => Math.sin(f / 9 + i * 0.8) * 11 + Math.sin(f / 3.7 + i) * 4.5;

  return (
    <Scene p={p} slug="THE NOTE ROOM" push={[0, 76, 1.06]} vig={0.18} glow={hexa(GOLD, 0.10)}>
      <Hall p={p} f={f} lightX={0.16} floorLines={5} bleed={40} />
      {/* the wall, full — and it disappears under the level as it climbs */}
      <Hit f={f} at={CHITS} amp={0.6} z={6}>
        <CardWall p={p} f={f} z={20} turn={7} tabs={0.22} wash={0.16}
          st={() => ({ lit: 1 })}
          cast={castOf("morning")[0]} castK={castOf("morning")[1]} />
      </Hit>
      <Window p={p} f={f} />
      <Ceiling p={p} f={f} z={88} />
      <Hit f={f} at={CHITS} amp={1.5} z={70}>
        <HoodLamp x={786} y={96} on={0} s={1.0} z={70} f={f} kick={kickAt(f, CHITS, 1.4)} />
      </Hit>

      {/* the clerk, in it — he goes up on his toes as it reaches his chest */}
      <Guy x={790} y={292 - Math.max(0, climb - 0.62) * 26} f={f} s={1.30} z={88} face={-1}
        ground={false}
        costume={{ glasses: 1, suit: 1, stern: 0.4, gaze: -1.2,
                   shock: 0.14 + Math.max(0, climb - 0.55) * 1.1,
                   cheer: Math.max(0, climb - 0.78) * 2.0, nodAmp: 3.8 }} />

      {/* ⭐ THE TIDE. Rows of notes filling from the floor up, each row keyed to
          the level so the mass grows rather than sliding. The crest bobs. */}
      {Array.from({ length: 135 }, (_, i) => {
        const col = i % 15, row = Math.floor(i / 15);
        const ry = 706 - row * 44;
        if (ry < lvl - 30) return null;                  /* above the surface */
        const wob = crest(col) * (ry < lvl + 46 ? 1 : 0.25);
        return <Note key={"td" + i}
          x={-40 + col * 74 + (rnd(i, 21) - 0.5) * 26}
          y={ry + wob + (rnd(i, 22) - 0.5) * 12}
          w={CW * 1.25} h={CH * 1.25} lit={1} fly={ry < lvl + 60 ? 0.7 : 0.25}
          s={1} rot={-16 + rnd(i, 23) * 32}
          z={ry < lvl + 50 ? 78 + row : 44 + row} seed={i} ruled={2} />;
      })}

      {/* it keeps raining in from above, and harder after the surge */}
      {Array.from({ length: 14 }, (_, i) => {
        const sp = 4.2 + surge * 3.6;
        const tt = ((f * sp) + i * 19) % 250;
        const y = -70 + tt * 2.6;
        if (y > lvl) return null;
        return <Note key={"rn" + i} x={30 + rnd(i, 7) * 930}
          y={y} w={CW} h={CH} lit={1} fly={1} s={1.2 + rnd(i, 8) * 0.9}
          rot={tt * 3 + i * 30} z={92} seed={i + 40} ruled={3}
          tab={i % 4 === 0 ? "#C8443A" : null} />;
      })}

      {/* the mass that dumps in at f50 — the step, and the frame the crash lands on */}
      {surge > 0.02 && Array.from({ length: 16 }, (_, i) => {
        const k = E(f, 46 + i * 0.5, 46 + i * 0.5 + 14, 0, 1, IN_Q);
        if (k <= 0 || k >= 1) return null;
        return <Note key={"sg" + i} x={120 + rnd(i, 9) * 780}
          y={-90 + k * (lvl + 120)} w={CW} h={CH} lit={1} fly={1}
          s={1.9 + rnd(i, 10) * 1.3} rot={k * 380 + i * 24} o={1} z={93} seed={i + 60} />;
      })}

      <Desk p={p} y={592} f={f} z={30} clutter={0} lip={false} day={1} />
      <MarkPlate x={556} y={668} t="CLAUDE CODE" s={1.2} z={31} />
      <Mark x={122} y={646} s={70} z={31} />
      <Trolley p={p} x={-118} y={592} f={f} z={32} s={1.26} />
      {f > 54 && <Chip t="200 NOTES, ONE PROMPT" y={128} s={0.82} z={96} c={INK} />}
      <Flash lf={f} at={50} n={8} o={0.20} />
    </Scene>
  );
};
