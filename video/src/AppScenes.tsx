import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, OAK, OAKD, OAKL, STEEL, STEELD,
  BRASS, BRASSD, CARD, CARDD, TAGR,
  A_WHITE, A_DARK, A_GRAY, A_ELEV, A_SEC, A_BLUE, BAD_TEXT,
  Hall, Spot, RuleWall, TOKENS, BoardEdge, Scene, Cam, Beam, Strip, Motes,
  Chip, Slug, Plate, BigNum, Contact, Edge, Mark, MarkPlate, MarkCast, AskBubble,
  usePlace, idle,
} from "./AppWorld";
import {
  SkillCard, PageBoard, boardGeom, flawPoints, Tag, Pin, Leader, Caliper, Swatch,
  Dial, GuideRails, Easel, Plinth, Console, Screen, BlankBoard, RulePlate,
  FlagCount, Sweep, Discard, Insp,
  AppleMark, AppleCast, MacBook, MacMini, IPhone, Display, MiniPage,
  SitePreview, Builder, TokenChip, ChipBurst, ChipStorm, CHIPS,
} from "./AppProps";

/* ===========================================================================
   REEL 100 "APPLE" · THE BODY.  Board: storyboards/100-apple.md.

   ⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/data/words_apple.json, converted to LOCAL Sequence frames, with the
      PICTURE LEADING THE ONSET BY 4 FRAMES so the crossover — not the start —
      lands on the syllable.
      root onsets (s):  So 0.00 · Instead 2.70 · you-can 4.60 · Now 6.47 ·
                        but 8.44 · So-just 11.09 · And 13.80 · So-rather 16.48 ·
                        you-get 18.73 · Comment 21.10
      scene `at` (frames, lead-4): 0 / 77 / 134 / 190 / 249 / 329 / 410 / 490 /
                        558 / 629

   ⛔⛔ THE STAGE, MEASURED OFF RENDERED FRAMES — NOT GUESSED. The panel is
      1012 x 792. The root header pill owns y 0..112. The slug owns y 730..792.
      So every hero object in this file lives inside **y 118..726**, and every
      scene's geometry below is derived from that band and from its place's
      horizon. v1 authored to guesses and shipped a 634px board into a 792px
      panel with the horizon at 520 — its top four sections were off-panel and
      only the footer was visible. Nothing here is placed without the arithmetic.

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL — `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE, not per hard cut. Inside
      S0's three shots each range starts on ITS OWN CUT, or that shot ships a
      frozen camera (reel 98 shipped 9 of 15 shots that way).

   ⛔ THE MOVE BUDGET IS TWO, and both are motivated by the thing they show:
      S6 pulls BACK as the tags multiply, S8 rises UP the board as the fixes
      run down it. Every other scene is locked and carries only the mandatory
      slow in-panel push ([[reel-motion-hierarchy]] · reel 96's rule).
   ⛔ ONE SUBJECT MOVES AT A TIME. Where a counter ticks under a hero gesture it
      is part of the SAME gesture, not a competing one.
   ========================================================================= */

const shake = (lf: number, at: number, amp = 14, n = 12) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

/* ⛔ NO WHITE PLATE, NO IRIS, NO FULL-FRAME CLOSE ([[feedback_no_flashing_transitions]]):
   peak opacity 0.30, ramps in AND out, never pure white. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 4, o = 0.26 }) => {
  if (lf < at || lf >= at + n) return null;
  const p = (lf - at) / n;
  return <div style={{ position: "absolute", inset: 0, zIndex: 130, pointerEvents: "none",
    background: "#F4EEE2", opacity: Math.sin(p * Math.PI) * o }} />;
};

/* ================================================================== S0 ====
   0.00 -> 2.57s · 77f · HOOK · THREE HARD SHOTS, camera locked in each.
   Authored to docs/THE-OPEN.md.

   ⛔ FRAME 0 IS SETTLED AND COMPLETE, AND IT IS THE CLAIM PLATE
      ([[feedback_frame0_claim_plate]] — the only measured IG-performance rule
      we have). The SKILL CARD is 740x300 of cream at y=132: 27.7% of the panel,
      all of it below y120, and it states the WHOLE claim at rest — the Claude
      mark, the name, the file type, and three real Apple tokens.
   ⛔ AND THE CARD STANDS **ON** THE PLINTH. v1 drew them as two unrelated
      objects 250px apart and the plinth read as a blank sheet of paper; the
      card's bottom edge is now the plinth's top edge, so the frame is one
      object on a pedestal, not two things in a dark room.
   ⛔ THE RULE WALL IS NOT IN SHOT A. It was, and it cropped mid-word off the
      right edge while stealing the card's stage. It is held back for shot C,
      where its arrival is the reveal.
   ⛔ FIVE CLAUDE MARKS INSIDE THE FIRST THREE SECONDS: card mark (A), plinth
      face (A), card mark held in close (B), plinth + wall emblem (C), and the
      Mascot in all three.
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("plinth");
  const CUT = [0, 27, 54];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;                       /* 600 */

  /* ---- A · THE CARD, AND THEN IT COMES APART. 0.00 -> 0.90s ----------
     ⛔⛔ v1 OF THIS SHOT WAS A POSTER. The card landed at f6 and then held for
        21 frames, which is precisely the failure docs/THE-OPEN.md names: an
        establishing shot has ONE beat, and after that beat the eye has nothing
        left to do. It measured the highest motion in the reel and the LOWEST
        top-cell share — "busy, but nothing is happening", as a number.
     ⭐ NOW: frame 0 is the settled card, complete and readable, and at f8 it
        BURSTS — fourteen real tokens blast out of it and tumble away. An
        object that was still and is now coming apart is an interrupt; a fade
        never is (reel 99's rule, and the only one that has ever worked here).
        The card SURVIVES the burst, still carrying its three lines, so what
        the shot says is "there are a lot more of these inside", not "the hero
        just got destroyed". */
  if (shot === 0) {
    const on = E(lf, 0, 4, 0, 1, OUT);           /* the spot, up before the burst */
    const burst = E(lf, 8, 26, 0, 1, OUT);
    const pop = Math.max(0, 1 - Math.abs(lf - 10) / 5);
    const sk = shake(lf, 8, 15, 11);
    /* card 740x300 at y132 -> bottom 432 = the plinth top. plinth base 704. */
    const CARDY = 132, PTOP = 434, PW = 520, PX = W / 2 - PW / 2, PBASE = 704;
    return (
      <Scene p={p} slug="" push={[0, 27, 1.05]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Hall p={p} f={f} lightX={0.44} floorLines={4} />
          {/* the emblem FLARES on the burst — the wall reacts to the event */}
          <AppleCast x={W / 2} y={300} s={400 + pop * 46} z={4}
            o={0.075 + on * 0.055 + pop * 0.07} />
          <Spot x={W * 0.44} on={on} f={f} len={HZ + 130} spread={620} />
          {/* ⭐ FOUR APPLE MARKS IN FRAME 0: the wall emblem, this tile, the one
              on the card, and the one on the Mac mini top. */}
          <AppleMark x={880} y={132} s={58} z={90} />
          <MacMini x={796} y={694} w={132} z={44} dim={0.16} />
          <Contact x={786} y={700} w={152} z={43} o={0.34} />
          <Plinth x={PX} y={PTOP} w={PW} h={PBASE - PTOP} z={40} mark depth={34} />
          <Contact x={PX - 74} y={PBASE - 6} w={PW + 148} z={38} o={0.30 + on * 0.18} />
          <div style={{ position: "absolute", inset: 0, zIndex: 60,
            transform: `scale(${1 + pop * 0.045})`, transformOrigin: `${W / 2}px 282px` }}>
            <SkillCard x={W / 2 - 370} y={CARDY} s={1.0} z={60} print={1} />
          </div>
          {/* ⛔ z=50, BELOW the card at z=60: the chips have to emerge from BEHIND
              the hero, not land on top of its face. One of them was sitting
              across the Claude mark on the card head. */}
          <ChipBurst x={W / 2} y={282} t={burst} n={14} z={50} spread={660} />
          <Insp x={146} base={HZ + 118} s={1.0} z={80} f={f} gaze={0.85}
            shock={pop * 0.9} />
          <Flash lf={lf} at={8} n={5} o={0.26} />
        </div>
      </Scene>
    );
  }

  /* ---- B · THE STORM. 0.90 -> 1.80s ----------------------------------
     ⛔ THIS SHOT USED TO BE THREE LINES OF TEXT PRINTING ON A STATIC CARD —
        a few hundred changed pixels for 27 frames, i.e. another hold. It is
        now the inside of the burst: the tokens rush PAST camera continuously,
        and three of them come through big and slow enough to actually read.
        Continuous movement for the whole shot, and the receipt survives. */
  if (shot === 1) {
    const HERO: [string, string | undefined, number, number][] = [
      ["100px", undefined, 232, 246],
      ["980px", undefined, 690, 372],
      ["#1D1D1F", "#1D1D1F", 340, 508],
    ];
    return (
      <Scene p={p} slug="APPLE'S OWN TOKENS" push={[27, 54, 1.06]} vig={0.42}
        slugC="#B9B2A6">
        <Hall p={p} f={f} lightX={0.5} floorLines={3} />
        <AppleCast x={W / 2} y={392} s={430} z={4} o={0.10} />
        <Spot x={W / 2} on={1} f={f} len={520} spread={640} />
        <ChipStorm f={lf} n={16} z={60} cx={W / 2} cy={396} />
        {/* the three that have to be READ, each arriving on its own beat and
            holding long enough to land */}
        {HERO.map(([v, sw, hx, hy], i) => {
          const a0 = 2 + i * 7;
          const inn = E(lf, a0, a0 + 9, 0, 1, OUT);
          if (inn <= 0.01) return null;
          const drift = (lf - a0) * 1.15;
          return (
            <div key={"hc" + i} style={{ position: "absolute", zIndex: 104 + i,
              left: hx + drift, top: hy - drift * 0.36,
              transform: `translate(-50%,-50%) scale(${(0.7 + inn * 0.9) * 1.28}) rotate(${-4 + i * 4}deg)`,
              opacity: Math.min(1, inn * 2) * (1 - Math.max(0, (lf - a0 - 20) / 8)) }}>
              <TokenChip v={v} sw={sw} s={1} />
            </div>
          );
        })}
        <Flash lf={lf} at={0} n={4} o={0.20} />
      </Scene>
    );
  }

  /* ---- C · WHAT THE RULES ARE FOR. 1.80 -> 2.57s ----------------------
     ⛔ THIS SHOT USED TO BE THE CARD ON ITS PLINTH FOR A THIRD TIME IN 2.5s.
        The card has already had two shots and the wide added nothing but a
        smaller copy of it. It is now the shot that pays the rule wall off:
        the same page running on REAL APPLE HARDWARE — a MacBook, a Mac mini
        and an iPhone, all showing the identical layout, which is exactly what
        a design language IS. New image, new information, and the hook stops
        repeating itself ([[reel-multishot-structure]]).
     GEOMETRY: wall 5x2 at s0.86 = 843x107 at y124..231 · emblem centred at 330
     · device bottoms all on 616 · MacBook 277..595, mini 626..746, phone
     790..864, Mascot 36..264. Nothing overlaps, nothing crops. */
  const lit = E(lf, 0, 17, 0.06, 1, OUT);
  const wake = E(lf, 4, 16, 0, 1, OUT);       /* the screens come up */
  return (
    <Scene p={p} slug="ONE LANGUAGE  ·  EVERY SCREEN" push={[54, 77, 1.05]} vig={0.36}
      slugC="#B9B2A6">
      <Hall p={p} f={f} lightX={0.5} floorLines={4} />
      <AppleCast x={W / 2} y={330} s={300} z={4} o={0.07 + lit * 0.05} />
      <Spot x={W / 2} on={1} f={f} len={HZ + 100} spread={620} />
      <RuleWall x={169} y={124} cols={4} rows={2} s={0.86} z={6} lit={lit} f={f} />
      {/* the hardware, waking one screen at a time — one gesture, three beats */}
      <Contact x={268} y={606} w={336} z={43} o={0.40} />
      <MacBook x={286} y={413} w={300} z={46} screen="#0E1114" f={f}>
        <div style={{ position: "absolute", inset: 0, opacity: wake }}><MiniPage /></div>
      </MacBook>
      <Contact x={616} y={608} w={140} z={43} o={0.36} />
      <MacMini x={626} y={597} w={120} z={44} />
      <Contact x={776} y={608} w={106} z={43} o={0.34} />
      <IPhone x={786} y={430} w={86} z={48} screen="#0E1114" f={f}>
        <div style={{ position: "absolute", inset: 0,
          opacity: E(lf, 10, 20, 0, 1, OUT) }}><MiniPage pad={4} /></div>
      </IPhone>
      <AppleMark x={892} y={128} s={54} z={90} />
      <Insp x={150} base={HZ + 116} s={0.94} z={80} f={f} gaze={0.9} cheer={0.35} />
      <Flash lf={lf} at={0} n={4} o={0.20} />
    </Scene>
  );
};

/* ================================================================== S1 ====
   2.57 -> 4.47s · 57f · SETUP · locked medium.
   "Instead of telling Claude, hey, can you make this website design better,"

   ⛔ THE DULLEST FRAME IN THE REEL, ON PURPOSE. Flat overhead light, no key, no
      spot, lowest chroma of any set. A vague ask gets a vague room, and the
      cut into S2's amber worklight is the argument.
   THE JOKE: what comes back is DIFFERENT but not BETTER — the same layout
   re-skinned in a generic purple gradient, arriving under a cheerful chime.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("desk");
  const HZ = p.horizon;                       /* 566 */
  const ask = E(f, 4, 14, 0, 1, OUT);         /* "Instead" 2.70 */
  const send = E(f, 26, 34, 0, 1, IN_Q);      /* the ask goes in */
  const back = E(f, 34, 44, 0, 1, BACK);      /* "make ... better" 3.72 */
  /* screen 336x228 at y266..494, stand +31 -> 525; desk top 542 */
  const SX = 352, SY = 266;
  return (
    <Scene p={p} slug="THE VAGUE ASK" push={[0, 57, 1.05]} vig={0.30} slugC="#7E786C">
      <Hall p={p} f={f} lightX={0.5} floorLines={3} live />
      {/* flat overhead: a wide soft box, no cone, no direction */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 230, zIndex: 3,
        background: `linear-gradient(180deg, ${mxh(p.back, 0.26)} 0%, ${hexa(p.back, 0)} 100%)`,
        opacity: 0.7 }} />
      {/* ⛔ THE DULL FRAME STILL HAS TO BE A FULL ONE. "Dull" here is a
          LIGHTING choice — flat, sourceless, lowest chroma in the reel — not
          an empty desk. v1 had a bare surface, three sheets of paper and a mug,
          and read as unfinished rather than as deliberately flat. It now has
          the things a desk actually has, all of them low-contrast so none of
          them competes with the ask flying into the screen. */}
      <div style={{ position: "absolute", left: 40, top: HZ - 24, width: W - 80, height: 36,
        background: mxh(p.floor, 0.18), zIndex: 30, borderRadius: 4, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 40, top: HZ + 8, width: W - 80, height: 7,
        background: dkh(p.floor2, 0.16), zIndex: 31 }} />
      {/* a keyboard and a mouse, in front of the display */}
      <div style={{ position: "absolute", left: 416, top: HZ - 44, width: 330, height: 26,
        background: "#CFC9BB", borderRadius: 5, zIndex: 34, boxShadow: SH,
        border: "2px solid #B0AA9C", padding: 4, boxSizing: "border-box",
        display: "flex", flexDirection: "column", gap: 2.5 }}>
        {[0, 1, 2, 3].map((r) => (
          <div key={"kr" + r} style={{ display: "flex", gap: 2.5, flex: 1 }}>
            {Array.from({ length: r === 3 ? 5 : 14 }, (_, c) => (
              <div key={c} style={{ flex: c === 2 && r === 3 ? 6 : 1,
                background: "#BAB4A6", borderRadius: 1.5 }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 766, top: HZ - 40, width: 40, height: 62,
        background: "#CFC9BB", borderRadius: "20px 20px 16px 16px", zIndex: 34,
        border: "2px solid #B0AA9C", boxShadow: SH }} />
      {/* loose paper, sticky notes, a cold mug with a ring under it */}
      {[0, 1, 2].map((i) => (
        <div key={"pp" + i} style={{ position: "absolute", left: 826 + i * 22,
          top: HZ - 34 - i * 5, width: 124, height: 17, background: "#DCD6C8",
          border: "2px solid #B8B1A2", borderRadius: 2, zIndex: 31 + i,
          transform: `rotate(${-5 + i * 4}deg)` }} />
      ))}
      {[0, 1].map((i) => (
        <div key={"st" + i} style={{ position: "absolute", left: 244 + i * 46,
          top: HZ - 58 + i * 10, width: 44, height: 44, background: i ? "#D8CFA4" : "#CFC4A0",
          zIndex: 33, transform: `rotate(${i ? 6 : -8}deg)`, boxShadow: SH }}>
          {[0, 1, 2].map((l) => (
            <div key={l} style={{ position: "absolute", left: 7, right: 9, top: 11 + l * 9,
              height: 3, background: "#A79A72" }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: 336, top: HZ - 12, width: 58, height: 12,
        borderRadius: "50%", background: dkh(p.floor, 0.10), zIndex: 32, opacity: 0.55 }} />
      <div style={{ position: "absolute", left: 338, top: HZ - 74, width: 54, height: 58,
        background: "#C4BDAE", borderRadius: "5px 5px 10px 10px", zIndex: 33,
        boxShadow: SH }}>
        <div style={{ position: "absolute", right: -14, top: 14, width: 18, height: 24,
          borderRadius: "0 12px 12px 0", border: "5px solid #C4BDAE",
          borderLeft: "none", boxSizing: "border-box" }} />
      </div>
      {/* the monitor, showing what came back */}
      <Screen x={SX} y={SY} w={336} h={228} z={46} rot={-3} c="#1A1E24">
        {/* ⛔ THE RESULT SLIDES UP INTO THE SCREEN, it does not cross-fade. An
            opacity swap changes every pixel by a little; a 336x228 panel
            travelling its own height changes a lot of pixels a lot, and the
            audit only counts the second kind. */}
        <div style={{ position: "absolute", inset: 0, opacity: back > 0.02 ? 1 : 0,
          transform: `translateY(${(1 - back) * 228}px)`,
          background: "linear-gradient(150deg, #6B4FA8 0%, #3E2E63 100%)" }}>
          <div style={{ position: "absolute", left: 20, top: 22, width: 168, height: 15,
            background: "#E5DFF4", borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 20, top: 46, width: 118, height: 9,
            background: "#B4A8D4", borderRadius: 3 }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 20 + i * 92, top: 84, width: 78,
              height: 62, borderRadius: 7, background: "#7C5EC0",
              boxShadow: "0 10px 20px rgba(0,0,0,0.55), 0 4px 8px rgba(0,0,0,0.5)" }} />
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - back,
          background: "#1A1E24", display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: MONO, fontWeight: 800, fontSize: 22,
          color: "#5C6470" }}>{send > 0.5 ? "working." : ""}</div>
      </Screen>
      {/* the ask itself, in the house bubble.
          ⛔ IT FLIES INTO THE SCREEN. v1 nudged it 140px up and faded it, and
          S1 measured 7.75 with a 6-frame hole and a top-cell share of 0.063 —
          motion spread thin over nothing. It is now ONE dominant mover
          travelling ~330px into the monitor, which is both the biggest thing
          in the shot and literally the beat ([[reel-motion-hierarchy]]: one
          subject moves at a time, and it should be the subject). */}
      <div style={{ position: "absolute", inset: 0, zIndex: 86, opacity: ask * (1 - send * 0.9),
        transform: `translate(${send * 250}px, ${(1 - ask) * 24 + send * 210}px) scale(${1 - send * 0.42})`,
        transformOrigin: "300px 220px" }}>
        <AskBubble x={196} y={186} t={'"make this website design better"'} s={0.84} z={86} />
      </div>
      <Insp x={168} base={HZ + 136} s={0.94} z={80} f={f} gaze={0.75}
        reach={ask * (1 - send)} />
      <Edge side="r" c={dkh(p.back2, 0.30)} w={94} z={92} kind="wall" />
    </Scene>
  );
};

/* ================================================================== S2 ====
   4.47 -> 6.33s · 56f · TURN 1 · locked close on the rule bench.
   "you can give it elite design rules to follow."

   ⛔ FIRST WARM FRAME. Amber worklight raking from the LEFT, long plate shadows
      to the right — the temperature jump out of S1's flat grey IS the cut.
   ⛔ THE TWO PLATE GROUPS DO NOT TOUCH. v1 ran the three hero plates under the
      six background ones and the "980px" plate collided with the small column,
      which also cropped off the right edge. Hero rack 76..636, file column
      660..853, panel 1012. Measured, not eyeballed.
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("bench");
  const HZ = p.horizon;                       /* 600 */
  /* "you can" 4.60 -> lf 4 · "design" 5.14 -> lf 19 · "rules" 5.46 -> lf 33 */
  const AT = [4, 19, 33];
  const seat = AT.map((a) => E(f, a, a + 7, 0, 1, OUT));
  const land = AT.map((a) => Math.max(0, 1 - Math.abs(f - (a + 7)) / 4));
  const R: [string, string, string | undefined][] = [
    ["--apple-section-gap", "100px", undefined],
    ["--apple-content-max-width", "980px", undefined],
    ["--apple-text-primary", "#1D1D1F", A_DARK],
  ];
  return (
    <Scene p={p} slug="THE RULE BENCH" push={[0, 56, 1.05]} vig={0.40} slugC="#C3B48F">
      <Hall p={p} f={f} lightX={0.24} floorLines={3} />
      {/* the raking worklight, from the LEFT — one direction, committed */}
      <Beam x={128} y={-30} top={90} bot={640} len={HZ + 80} c="#F0D79A" o={0.22} z={18} f={f} />
      <Motes x={220} y={90} w={340} h={HZ - 60} n={11} f={f} z={19} />
      {/* the bench top */}
      <div style={{ position: "absolute", left: 0, right: 0, top: HZ - 26, height: 30,
        background: OAKL, zIndex: 30, boxShadow: SH }} />
      {/* the rack the hero plates seat into */}
      <div style={{ position: "absolute", left: 76, top: 126, width: 560, height: 386,
        background: dkh(OAKD, 0.22), borderRadius: 8, zIndex: 26, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 88, top: 138, width: 536, height: 362,
        background: dkh(OAK, 0.44), borderRadius: 5, zIndex: 27 }} />
      {/* the six plates already filed, in shadow: the rest of the token file */}
      {TOKENS.slice(3, 9).map((t, i) => (
        <RulePlate key={"bg" + i} x={660} y={150 + i * 50} nm={t[0]} vl={t[1]} s={0.52}
          z={30} seat={1} />
      ))}
      {/* the three that SEAT, each with a squash on the stop.
          ⛔⛔ HIERARCHY: v1 ran these at s0.92 (342px wide) in a 1012px panel
          and the scene measured a top-cell share of 0.074 — the motion was
          real but no single cell owned it, so nothing in the frame ranked.
          At s1.34 a plate is 498px, half the panel, and it travels 74px into
          its slot: ONE object, large, fast, and unmistakably the subject
          ([[reel-motion-hierarchy]] — an inert hero is boring however big, but
          a small one cannot rank however active). */}
      {R.map(([nm, vl, sw], i) => (
        <div key={"pl" + i} style={{ position: "absolute", inset: 0, zIndex: 60 + i,
          transform: `scale(${1 + land[i] * 0.06}, ${1 - land[i] * 0.11})`,
          transformOrigin: `${350}px ${206 + i * 126}px` }}>
          <RulePlate x={96} y={168 + i * 126} nm={nm} vl={vl} s={1.34} z={60 + i}
            seat={seat[i]} hot={land[i] > 0.4} swatch={sw} />
        </div>
      ))}
      <Insp x={806} base={HZ + 116} s={0.94} z={80} f={f} gaze={0.5} cheer={0.4} />
      <Mark x={906} y={132} s={58} z={90} />
      <Edge side="l" c={dkh(OAKD, 0.38)} w={72} z={92} kind="post" />
    </Scene>
  );
};

/* ================================================================== S3 ====
   6.33 -> 8.30s · 59f · SETUP · locked WIDE and LOW.
   "Now, most people use this to build a new website,"

   ⛔ FRAMED AS THE EXACT OPPOSITE OF S4 so the two page scenes can never read
      as the same shot ([[reel-locations-library-vs-used]] / the CALLBACK S1=S2
      failure): MANY, SMALL, FAR, COLD, BLANK, receding — against S4's ONE,
      TALL, CLOSE, WARM, FULL. Different count, scale, palette, framing.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("rack");
  const HZ = p.horizon;                       /* 566 */
  /* ⛔ SIX BOARDS, NOT SEVEN, AND THE NEAR ONE IS 232x324. At 164x230 the
     largest board in the rack was 37,000px² — under the ~40,000 a mover has to
     clear before the audit can see it — so seven small boards dropping scored
     6.74 while looking busy. Fewer and bigger is the fix every time
     ([[reel-motion-hierarchy]]: an inert hero is boring however big, but a
     small one is invisible however active). */
  const N = 4;
  return (
    <Scene p={p} slug="FOUR NEW SITES  ·  FOUR BUILDERS" push={[0, 59, 1.07]} vig={0.44}
      slugC="#9FB0BE">
      <Hall p={p} f={f} lightX={0.72} floorLines={5} />
      {/* the high window that is the only light */}
      <div style={{ position: "absolute", left: 706, top: 132, width: 208, height: 170,
        background: mxh(p.back, 0.40), zIndex: 4, borderRadius: 4, boxShadow: SH }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 7,
          marginLeft: -3, background: dkh(p.back2, 0.18) }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 7,
          marginTop: -3, background: dkh(p.back2, 0.18) }} />
      </div>
      <Beam x={810} y={302} top={190} bot={660} len={HZ - 200} c="#BFD4E4" o={0.20} z={5} f={f} />
      {/* ⛔⛔ THIS RACK WAS SIX BLANK GREY RECTANGLES AND IT WAS THE WORST
          THING IN THE REEL. The logic was sound — the VO is "most people use
          this to BUILD A NEW website", and blank = starting from scratch — but
          a blank rectangle is not a picture of starting from scratch, it is an
          absence, and an absence cannot be interesting. Six became FOUR (so
          each is big enough for its layout to actually read), each is a
          genuinely DIFFERENT finished site, and each has the costumed Claude
          who shipped it standing at its foot. Same meaning, and now there is
          something to look at.
          GEOMETRY: s falls 1.00 -> 0.56 across four, boards 300x420 down to
          168x235, bottoms stepping UP the floor 566 -> 510 so the row recedes.
          The near board still lands LAST so the run builds to it. */}
      {Array.from({ length: N }, (_, i) => {
        const k = i / (N - 1);
        const a = 4 + (N - 1 - i) * 11;
        const rise = E(f, a, a + 16, 0, 1, OUT);
        const s = 1 - k * 0.44;
        const bw = 300 * s, bh = 420 * s;
        const bx = 24 + i * 246 - k * 16;
        const by = HZ - bh - k * 56;
        const travel = -(1 - rise) * (bh + 170);
        if (rise <= 0.001) return null;
        return (
          <div key={"bb" + i} style={{ position: "absolute", inset: 0, zIndex: 40 - i * 2,
            transform: `translateY(${travel}px)`, opacity: Math.min(1, rise * 4) }}>
            <SitePreview x={bx} y={by} w={bw} h={bh} kind={i} z={40 - i * 2}
              dim={k * 0.26} f={f} />
            <Contact x={bx - 10} y={by + bh - 6} w={bw + 20} z={39 - i * 2}
              o={(0.30 - k * 0.12) * rise} />
            {/* the Claude who built this one, at its foot, on the same ground */}
            <Builder x={bx + bw * 0.80} base={by + bh + 4} s={0.60 - k * 0.15}
              z={41 - i * 2} f={f} kind={i} />
          </div>
        );
      })}
      {/* ⛔ NO NARRATOR CLAUDE HERE. The four builders ARE the Mascot, four
          times over; a fifth one standing apart just read as a spare. */}
      <Mark x={74} y={640} s={58} z={90} />
      <BoardEdge side="l" c={dkh(p.back2, 0.34)} w={84} z={92} />
    </Scene>
  );
};

/* ================================================================== S4 ====
   8.30 -> 10.97s · 80f · TURN 2 · locked CLOSE, three-quarter, warm.
   "but a better use case is to take an existing website to the next level."

   ⛔⛔ THE VILLAIN IS PLANTED HERE AND NOBODY POINTS AT IT. The board carries a
      real, finished, decent-looking page — and four REAL defects: section gaps
      of 64/88/71 instead of an even 100, a content column at 94% instead of
      980px, body text at #4A4A4A instead of #1D1D1F, and the first card's
      padding tight. Nothing on screen remarks on any of it. S6's tags land on
      exactly these, and S8 corrects exactly these. That is the villain's rule:
      it is invisible until something measures.
   ⛔ GEOMETRY: s0.90 -> board 306x468 at y122..590; easel ledge 574, legs to
      714; horizon 604. The whole board is on-panel, which v1's was not.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("stand");
  const HZ = p.horizon;                       /* 604 */
  const BS = 0.90;
  const G = boardGeom(BS);                    /* 306 x 468 */
  const BX = W / 2 - G.BW / 2 + 34, BY = 122;
  /* ⛔ v1 WALKED HIM IN OVER f6..f46 AND THEN HELD FOR 34 FRAMES, and the scene
     measured 4.68 motion against a bar of 9. Two fixes, both at the cause: the
     BOARD is lowered onto the easel across f0..f30 (a 306x468 object travelling
     150px — the largest mover in the scene, and motivated: he has just put it
     up), and the walk is stretched to f24..f70 so the two gestures overlap and
     the scene never arrives and holds. One subject still moves at a time — the
     board settles before he enters frame. */
  const settle = E(f, 0, 30, 0, 1, OUT);
  const walk = E(f, 24, 68, 0, 1, IO);
  const stop = Math.max(0, 1 - Math.abs(f - 72) / 6);
  return (
    <Scene p={p} slug="THE SITE YOU ALREADY HAVE" push={[0, 80, 1.08]} vig={0.36}
      slugC="#C0AF90">
      <Hall p={p} f={f} lightX={0.68} floorLines={4} />
      {/* the hung worklight that is the key, from the RIGHT */}
      <Strip x={780} y={46} w={290} on={1} c="#F2DCA8" z={22} f={f} />
      <Easel x={BX - 46} y={BY + G.BH - 16} w={G.BW + 92} h={142} z={44} />
      <Contact x={BX - 84} y={HZ + 96} w={G.BW + 168} z={43} o={0.28 + settle * 0.12} />
      {/* ⛔ 240px OF TRAVEL, NOT 150. This 306x468 board is the biggest single
          object in the scene (143,000px²), so it is the only thing here worth
          spending travel on — lengthening ITS move beats adding a second
          mover, which would only split the top-cell share further. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 50,
        transform: `translateY(${(1 - settle) * -240}px) rotate(${(1 - settle) * -3.2}deg)`,
        transformOrigin: `${BX + G.BW / 2}px ${BY + G.BH}px` }}>
        <PageBoard x={BX} y={BY} s={BS} z={50} f={f} />
      </div>
      <MarkPlate x={70} y={140} t="PROOFING FLOOR" s={0.74} z={20} c="#E2D6BC" />
      {/* the same site, on the machine it actually lives on. Set dressing:
          small, low and to the right of the hero, and it never takes a beat. */}
      <MacBook x={752} y={532} w={160} z={46} screen="#0E1114" dim={0.22} f={f}>
        <MiniPage />
      </MacBook>
      <Contact x={742} y={634} w={182} z={43} o={0.32} />
      <div style={{ position: "absolute", inset: 0, zIndex: 80,
        transform: `translateX(${(1 - walk) * -360}px) scale(${1 + stop * 0.03}, ${1 - stop * 0.05})`,
        transformOrigin: "170px 716px" }}>
        <Insp x={168} base={HZ + 116} s={1.04} f={f} z={80} gaze={0.95} />
      </div>
      <Edge side="r" c={dkh(p.back2, 0.26)} w={88} z={92} kind="wall" />
    </Scene>
  );
};

/* ================================================================== S5 ====
   10.97 -> 13.67s · 81f · ESCALATE · locked medium.
   "So just drop the skill into Claude and tell it to audit your own website."

   ⛔ THE REEL'S ONLY BOTTOM-LIT FRAME — the key comes UP out of the slot. That
      single inversion is what makes this cut feel like a different place even
      though the camera height barely changed.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("slot");
  const HZ = p.horizon;                       /* 600 */
  const carry = E(f, 0, 11, 0, 1, LIN);
  const post = E(f, 14, 26, 0, 1, IN_Q);
  const load = E(f, 26, 40, 0, 1, OUT);
  const type = E(f, 40, 66, 0, 1, LIN);
  const LINE = "audit ./my-site";
  const CW = 500, CH = 224;
  const CX = W / 2 - CW / 2, CY = HZ - CH + 30;   /* 406..630 */
  return (
    <Scene p={p} slug="DROP IT IN  ·  THEN ASK" push={[0, 81, 1.05]} vig={0.46}
      slugC="#8FB4B8">
      <Hall p={p} f={f} lightX={0.5} floorLines={3} />
      {/* ⛔ THE BIG CAST MARK MOVED OUT OF THE MIDDLE. It sat at y184 and the
          four rule plates now occupy y176..390, so it became the thing they
          rose through. The audience filter is kept as a plate in the corner,
          where nothing crosses it. */}
      <Mark x={874} y={132} s={64} z={90} />
      <MarkCast x={W / 2} y={HZ + 96} s={120} z={10} o={0.10 + load * 0.10} spin={0.26} f={f} />
      {/* the key coming UP out of the slot */}
      <div style={{ position: "absolute", left: W / 2 - 320, top: CY - 268, width: 640,
        height: 286, zIndex: 18,
        background: `linear-gradient(0deg, ${hexa("#6FC3C8", 0.26 + load * 0.10)} 0%, ${hexa("#6FC3C8", 0)} 100%)`,
        clipPath: "polygon(38% 100%, 62% 100%, 100% 0, 0 0)" }} />
      {/* ⛔ THE SECOND HALF OF THIS SCENE WAS 24 DEAD FRAMES. The post is a big
          gesture and the typing that follows it is a few hundred changed pixels,
          so the scene measured 7.01 with a 24f hole. The fix is not "more
          typing" — it is the beat the scene was missing: WHAT THE SKILL DOES
          WHEN IT LOADS. Four rule plates now rise up out of the console across
          f30..f74, each a 372x46 object travelling ~230px, which is the skill
          unpacking itself and is the most on-theme mover available. */}
      <Console x={CX} y={CY} w={CW} h={CH} z={46} open={0.4 + post * 0.6} c="#2C3E45" f={f}
        line={type > 0 ? LINE.slice(0, Math.round(type * LINE.length)) : undefined} />
      <Contact x={CX - 40} y={CY + CH - 8} w={CW + 80} z={45} o={0.44} />
      {TOKENS.slice(0, 4).map((t, i) => {
        const a = 30 + i * 9;
        const up = E(f, a, a + 18, 0, 1, OUT);
        if (up <= 0.001) return null;
        const restY = 176 + i * 56;      /* 176..390, clear of the console at 406 */
        return (
          <div key={"rp" + i} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
            transform: `translateY(${(1 - up) * (CY - restY + 40)}px)`,
            opacity: Math.min(1, up * 3) * (0.55 + up * 0.45) }}>
            <RulePlate x={CX + 66} y={restY} nm={t[0]} vl={t[1]} s={0.66} z={40 + i}
              seat={1} hot={up > 0.9} />
          </div>
        );
      })}
      {/* the card travelling from his hand into the mouth */}
      {post < 0.99 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 70,
          transform: `translate(${carry * 92 + post * 120}px, ${post * 188}px) scale(${1 - post * 0.30})`,
          transformOrigin: `${W / 2}px ${CY}px`, opacity: 1 - Math.max(0, post - 0.82) * 5.5 }}>
          <SkillCard x={W / 2 - 460} y={186} s={0.56} z={70} print={1} rot={-6} />
        </div>
      )}
      <Insp x={190} base={HZ + 116} s={0.98} z={80} f={f} gaze={0.85}
        carry={1 - post} reach={post > 0.1 ? 1 - post : 0} />
      <Edge side="l" c={dkh(p.back2, 0.22)} w={82} z={92} kind="rail" />
    </Scene>
  );
};

/* ================================================================== S6 ====
   13.67 -> 16.33s · 80f · PEAK 1 · ⭐ MOTIVATED MOVE 1 OF 2: THE PULL-BACK.
   "And it will notice so many minor details that are wrong with your website."

   ⛔ THE MOVE IS CAUSED BY THE THING IT SHOWS — it starts tight on the first
      flag and pulls back only because they keep coming, ending wide with all
      fourteen on the board. That is what makes it motivated rather than
      decorative ([[reel-motion-hierarchy]] / CAMERA-GRAMMAR).
   ⛔ HIERARCHY INSIDE THE RUN: fourteen marks land, but only SIX ask to be
      read. Six NAMED tags sit in the margins with LEADER LINES to the real
      defect they are about (v1 stacked all fourteen labelled tags on top of
      the board and buried the page under its own annotations); the other eight
      are unnamed pins that supply the density. `flawPoints()` is the same
      geometry the board is drawn from, so a tag is never NEAR its subject.
   ⛔ THE ONLY RED FRAME IN THE REEL.
   ========================================================================= */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("bay");
  const HZ = p.horizon;                       /* 604 */
  const BS = 0.92;
  const G = boardGeom(BS);                    /* 313 x 478 */
  const BX = W / 2 - G.BW / 2, BY = 118;
  const FP = flawPoints(BS);
  const cam = E(f, 4, 70, 1.28, 1.0, IO);
  const sweep = E(f, 2, 30, 0, 1, LIN);
  /* ⛔ v1 RAN THE TAGS f16..f52 AND THE PULL-BACK f4..f62, leaving 18 dead
     frames at the end of the scene. The run is stretched to f10..f57 and the
     move to f4..f70, and the count plate takes a hard PUNCH on the last tag so
     the scene finishes on an event rather than on a hold. */
  const T0 = 10, TD = 3.6;                    /* "so many" 14.28 -> lf 18 */
  const n = Math.max(0, Math.min(14, Math.floor((f - T0) / TD) + 1));
  const LAST = T0 + 13 * TD;                  /* f57 — the fourteenth lands */
  const punch = Math.max(0, 1 - Math.abs(f - (LAST + 5)) / 9);
  /* the SIX named defects: three tagged from the left margin, three from the
     right. `to` is the point on the board, in board-local px.
     ⛔ THE ASSIGNMENT IS NOT ARBITRARY — v1 let every tag point at whatever
     `flawPoints` returned and the six leader lines crossed each other and the
     board in a red cat's cradle. Two rules fix it, and both are checked by the
     comment on each row: (1) a LEFT tag may only target a point on the LEFT
     half of the board and a RIGHT tag the RIGHT half, so no line crosses the
     page; (2) within one margin the rows and their targets are both sorted by
     Y, so two lines on the same side can never cross each other. */
  const TX = (k: number) => G.cx + G.cw * k;
  const NAMED: { to: { x: number; y: number }; t: string; side: "l" | "r"; row: number }[] = [
    /* ORDER = LANDING ORDER, and it alternates sides so the eye is thrown
       across the board rather than filling one column and then the other.
       LEFT  rows 168/286/404 -> targets y 103/194/245, both ascending.
       RIGHT rows 168/286/404 -> targets y  96/154/344, both ascending. */
    { to: { x: TX(0.30), y: FP.color.y }, t: "#4A4A4A", side: "l", row: 0 },
    { to: { x: TX(0.96), y: FP.width.y }, t: "width",   side: "r", row: 0 },
    { to: { x: TX(0.12), y: FP.pad.y },   t: "pad 12",  side: "l", row: 1 },
    { to: { x: TX(0.74), y: FP.gap1.y },  t: "gap 64",  side: "r", row: 1 },
    { to: { x: TX(0.28), y: FP.gap2.y },  t: "gap 88",  side: "l", row: 2 },
    { to: { x: TX(0.72), y: FP.gap3.y },  t: "gap 71",  side: "r", row: 2 },
  ];
  /* the eight unnamed pins, spread down the type and spacing */
  const PINS = [0.16, 0.30, 0.44, 0.55, 0.66, 0.74, 0.84, 0.92].map((k, i) => ({
    x: G.cx + G.cw * (i % 2 === 0 ? 0.22 : 0.72),
    y: G.PAD + 40 * BS + k * (G.BH - 90 * BS),
  }));
  const TAGW = 152 * 0.70;
  return (
    <Scene p={p} slug="" push={[0, 1, 1]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `scale(${cam})`, transformOrigin: "50% 44%" }}>
        <Hall p={p} f={f} lightX={0.5} floorLines={3} bleed={280} />
        <Strip x={W / 2} y={-6} w={340} on={1} c="#E8776A" z={22} f={f} />
        <Beam x={W / 2} y={26} top={220} bot={740} len={HZ + 40} c="#E06456" o={0.20} z={17} f={f} />
        {Array.from({ length: 10 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: -280, right: -280,
            top: 74 + i * 46, height: 7, background: dkh(p.back2, 0.16), opacity: 0.5,
            zIndex: 3 }} />
        ))}
        <Contact x={BX - 66} y={BY + G.BH - 4} w={G.BW + 132} z={43} o={0.44} />
        <PageBoard x={BX} y={BY} s={BS} z={50} f={f} />
        {sweep > 0 && sweep < 1 && (
          <Sweep x={BX - 26} y={BY + sweep * G.BH} w={G.BW + 52} z={78} c="#F26B5E" />
        )}
        {/* the eight unnamed pins — density, no reading required */}
        {PINS.map((pt, i) => {
          const idx = i + 6;
          if (idx >= n) return null;
          const a = T0 + idx * TD;
          const on = E(f, a, a + 4, 0, 1, OUT);
          return <Pin key={"pn" + i} x={BX + pt.x} y={BY + pt.y} s={0.86 + on * 0.14}
            z={79} o={on} />;
        })}
        {/* the six NAMED tags, in the margins, each tied to its defect */}
        {NAMED.map((t, i) => {
          if (i >= n) return null;
          const a = T0 + i * TD;
          const on = E(f, a, a + 4, 0, 1, OUT);
          const ty = 168 + t.row * 118;
          const tx = t.side === "l" ? 34 : W - 34 - TAGW;
          const ax = t.side === "l" ? tx + TAGW : tx;       /* the leader's start */
          return (
            <div key={"tg" + i} style={{ position: "absolute", inset: 0, zIndex: 84 + i,
              opacity: on }}>
              <Leader x1={ax} y1={ty} x2={BX + t.to.x} y2={BY + t.to.y} z={83} o={on} />
              <Tag x={tx} y={ty} t={t.t} s={0.70} z={84 + i}
                point={t.side === "l" ? "r" : "l"} o={1} f={f} seed={i} />
            </div>
          );
        })}
        <div style={{ position: "absolute", inset: 0, zIndex: 96,
          transform: `scale(${1 + punch * 0.22})`,
          transformOrigin: `${W / 2}px ${HZ + 70}px` }}>
          <FlagCount x={W / 2 - 96} y={HZ + 42} n={n} s={1.0} z={96} />
        </div>
        {/* ⛔ x=175, NOT 112. The whole scene sits inside the pull-back wrapper,
           so a sprite's on-panel x is scaled about 50%/44% — at 112 his left
           arm was outside the panel for the whole shot. */}
        <Insp x={175} base={HZ + 118} s={0.80} z={82} f={f} gaze={0.9} stern={0.8} />
      </div>
      <Flash lf={f} at={0} n={4} o={0.24} />
    </Scene>
  );
};

/* ================================================================== S7 ====
   16.33 -> 18.60s · 68f · CONTRAST · locked medium.
   "So rather than spending hours trying to copy Apple's website manually,"

   ⛔ A VALLEY IN TEMPERATURE, NOT IN ENERGY. Cold monitor light, no key, faces
      underlit — and the FASTEST gesture in the reel (the discard pile) so the
      dip before the peak never reads as a dead beat.
   ========================================================================= */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("mill");
  const HZ = p.horizon;                       /* 582 */
  const pile = E(f, 6, 62, 0, 9, LIN);
  const clock = f * 5.4;
  const typed = Math.floor(E(f, 8, 60, 0, 7, LIN));
  const SY = 268;                             /* screens 268..478, stand -> 509 */
  return (
    <Scene p={p} slug="COPYING IT BY HAND" push={[0, 68, 1.07]} vig={0.46}
      slugC="#8FA4B8">
      <Hall p={p} f={f} lightX={0.5} floorLines={3} live />
      <div style={{ position: "absolute", left: 0, right: 0, top: HZ - 22, height: 30,
        background: mxh(p.floor, 0.16), zIndex: 30, boxShadow: SH }} />
      {/* ⛔ REAL HARDWARE, NOT TWO GENERIC BOXES. This is the shot where the
          viewer is meant to recognise themselves, and "me, at my desk, with
          Apple's site open on one screen and DevTools on the other" only lands
          if the machines look like the machines. A MacBook carries Apple's
          page; a Display carries the inspector. */}
      <MacBook x={70} y={SY + 6} w={296} z={46} screen="#F2F2F4" f={f}>
        <div style={{ position: "absolute", left: 14, top: 12, width: 136, height: 11,
          background: A_DARK, borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 14, top: 30, width: 94, height: 6,
          background: A_SEC, borderRadius: 2 }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 14 + i * 84, top: 54, width: 70,
            height: 52, background: "#E4E4E8", borderRadius: 5 }} />
        ))}
        <div style={{ position: "absolute", left: 14, top: 120, right: 14, height: 36,
          background: A_DARK, borderRadius: 4 }} />
        <AppleMark x={244} y={8} s={22} z={9} tile={false} o={0.5} />
      </MacBook>
      <Contact x={56} y={SY + 214} w={330} z={43} o={0.34} />
      <Display x={W - 378} y={SY - 24} w={296} z={46} screen="#14181D" f={f}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 12, top: 12 + i * 22,
            display: "flex", gap: 7, alignItems: "center",
            opacity: i <= typed ? 1 : 0.22 }}>
            <div style={{ width: 66, height: 8, background: "#6C8FB4", borderRadius: 2 }} />
            <div style={{ width: 46, height: 8, background: i === typed ? "#E7B24C" : "#4A5560",
              borderRadius: 2 }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 12, bottom: 12, right: 12, height: 26,
          background: "#1E242B", borderRadius: 4, display: "flex", alignItems: "center",
          paddingLeft: 9, fontFamily: MONO, fontWeight: 800, fontSize: 15, color: "#7E8A96" }}>
          measuring{".".repeat(1 + (Math.floor(f / 7) % 3))}
        </div>
      </Display>
      {/* the ruler on the desk, and the clock that keeps going */}
      <div style={{ position: "absolute", left: 412, top: HZ - 42, width: 176, height: 15,
        background: "#C9BFA6", zIndex: 34, borderRadius: 2, transform: "rotate(-4deg)" }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 8 + i * 16, top: 2, width: 2,
            height: i % 5 === 0 ? 10 : 6, background: "#6E6455" }} />
        ))}
      </div>
      {/* ⛔ A CIRCLE WITH ONE LINE IN IT IS A DIAL, NOT A CLOCK. v1 read as a
          knob on the wall. Twelve ticks and a second, shorter hour hand is the
          whole difference, and the clock is the only thing in this scene that
          says the grind has a COST ([[reel-draw-dont-stack]]: the silhouette
          has to be nameable). */}
      <div style={{ position: "absolute", left: 460, top: 146, width: 90, height: 90,
        borderRadius: "50%", background: "#DAD4C8", border: "5px solid #8A8478", zIndex: 40,
        boxShadow: SH }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 9 : 6,
            marginLeft: i % 3 === 0 ? -1.5 : -1, background: "#6E6758",
            transformOrigin: "50% 0%",
            transform: `rotate(${i * 30}deg) translateY(-34px)` }} />
        ))}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 4, height: 20,
          marginLeft: -2, background: "#3A342A", borderRadius: 2, transformOrigin: "50% 100%",
          transform: `translateY(-20px) rotate(${clock / 12}deg)` }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 3, height: 30,
          marginLeft: -1.5, background: "#3A342A", borderRadius: 2, transformOrigin: "50% 100%",
          transform: `translateY(-30px) rotate(${clock}deg)` }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 7, height: 7,
          marginLeft: -3.5, marginTop: -3.5, borderRadius: 7, background: "#3A342A" }} />
      </div>
      {/* the discard pile — the fastest thing in the reel. Each sheet FLIES
          ~450px in from off frame right, past the display, to the pile.
          ⛔ TWO WRONG ORIGINS BEFORE THIS ONE: starting it at the display's
          SCREEN made every sheet look stuck to the monitor, and moving it to
          the screen's lower edge fixed the look but halved the travel, which
          dropped the scene from 6.75 to 5.99 and back under the bar. Off frame
          is the only origin that is both long and not on top of something. */}
      <Discard x={W / 2 + 40} y={HZ - 84} n={pile} z={58} s={0.92}
        fromX={W + 30} fromY={SY + 232} />
      <Insp x={W / 2 - 104} base={HZ + 128} s={0.86} z={80} f={f} gaze={0.2} slump={0.9} />
      <Edge side="l" c={dkh(p.back2, 0.20)} w={74} z={92} kind="wall" />
    </Scene>
  );
};

/* ================================================================== S8 ====
   18.60 -> 20.97s · 71f · PAYOFF (THE PEAK) · ⭐ MOTIVATED MOVE 2 OF 2: THE RISE.
   "you get the actual design rules behind why it looks so good."

   ⛔ THE PEAK MUST BEAT THE HOOK, AND IT DOES IT BY ESCALATION, NOT RESTATEMENT
      ([[reel-motion-hierarchy]]): S0 showed the rules SITTING on a card; S8
      shows them LANDING on the page, four of them, each as a graphic event
      with its own beat. ⛔ INFO IN THE GRAPHIC, NOT IN TYPE
      ([[reel-graphical-not-textual]]) — the gap OPENS, the column NARROWS, the
      swatch FLIPS, the headline THICKENS. No number is typeset at its value.
   ⛔ THE FOUR TOOLS NEVER SHARE THE FRAME: the caliper lives f14..26, the rails
      f25+, the swatch f38+, the dial f52+, and the caliper is gone before the
      swatch arrives. One subject moves at a time, four times over.
   ========================================================================= */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("vault");
  const HZ = p.horizon;                       /* 586 */
  const BS = 0.90;
  const gap = E(f, 14, 26, 0, 1, OUT);
  const width = E(f, 25, 37, 0, 1, OUT);
  const color = E(f, 38, 46, 0, 1, IN_Q);
  const weight = E(f, 52, 62, 0, 1, OUT);
  const fx = { gap, width, color, weight };
  const G = boardGeom(BS, fx);                /* 306 x 468 */
  const BX = W / 2 - G.BW / 2 - 6, BY = 116;
  const FP = flawPoints(BS, fx);
  const rise = E(f, 6, 64, 0, 1, IO);
  const lit = E(f, 0, 22, 0.10, 1, OUT);
  return (
    <Scene p={p} slug="THE RULES, APPLIED" push={[0, 1, 1]} vig={0.32} slugC="#B79E6E">
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translateY(${rise * 40}px) scale(${1 + rise * 0.08})`,
        transformOrigin: "50% 28%" }}>
        <Hall p={p} f={f} lightX={0.34} floorLines={4} bleed={240} />
        <Beam x={172} y={-20} top={120} bot={720} len={HZ + 120} c="#F3D48C" o={0.20} z={16} f={f} />
        <RuleWall x={36} y={128} cols={5} rows={2} s={0.86} z={6} lit={lit} f={f} />
        <Easel x={BX - 42} y={BY + G.BH - 14} w={G.BW + 84} h={132} z={44} />
        <Contact x={BX - 76} y={HZ + 84} w={G.BW + 152} z={43} o={0.40} />
        <PageBoard x={BX} y={BY} s={BS} z={50} f={f} fx={fx} />

        {/* 1 · THE CALIPER opens the first gap, and the readout runs 64 -> 100 */}
        {gap > 0.01 && gap < 0.99 && (
          <Caliper x={BX + G.BW + 26} y={BY + FP.gap1.y - 90} open={26 + gap * 74}
            s={0.60} z={86} read={`${Math.round(64 + gap * 36)}px`} vertical />
        )}
        {/* 2 · THE GUIDE RAILS squeeze the column to 980 */}
        {width > 0.01 && (
          <GuideRails x={BX + G.PAD} y={BY + 26} w={G.BW - G.PAD * 2} h={G.BH - 62}
            p={width} z={82} read={width > 0.55 ? "980px" : undefined} />
        )}
        {/* 3 · THE SWATCH flips #4A4A4A -> #1D1D1F */}
        {color > 0.01 && (
          <Swatch x={BX + G.BW + 34} y={BY + 168} from={BAD_TEXT} to={A_DARK} p={color}
            s={0.82} z={86} label="--apple-text-primary" />
        )}
        {/* 4 · THE DIAL turns and the headline thickens to 600.
           ⛔ It sits BELOW the rule wall's last row (y 128..235 at s0.86), not
           across it — v1 put it at y158 and it read as a plate with a gauge
           stuck on top of it. */}
        {weight > 0.01 && (
          <Dial x={BX - 172} y={BY + 152} p={weight} s={0.92} z={86} from="400" to="600" />
        )}

        {/* the S6 flags, flipping to gold checks as each fix lands */}
        {([[FP.gap1, gap, "100px", "l"], [FP.width, width, "980px", "r"],
           [FP.color, color, "#1D1D1F", "r"]] as const).map((t, i) => {
          const [pt, prog, label, side] = t as any;
          if (prog < 0.5) return null;
          const on = Math.min(1, (prog - 0.5) * 3.4);
          const tw = 152 * 0.62;
          const tx = side === "l" ? 40 : W - 40 - tw;
          return (
            <div key={"ck" + i} style={{ position: "absolute", inset: 0, zIndex: 88 + i,
              opacity: on }}>
              <Tag x={tx} y={BY + pt.y - 10} t={label} s={0.62} z={88 + i} flip={1}
                point={side === "l" ? "r" : "l"} f={f} seed={i + 3} />
            </div>
          );
        })}
        {/* ⛔ x=186, NOT 126 — the rise wrapper scales 1.08 about 50%/28%, which
           pushed him off the left edge at the end of the move. */}
        <AppleMark x={W - 132} y={128} s={62} z={92} o={lit} />
        <Insp x={186} base={HZ + 120} s={0.88} z={84} f={f} gaze={0.9} cheer={0.7} />
      </div>
      <Flash lf={f} at={0} n={4} o={0.22} />
    </Scene>
  );
};

/* ================================================================== S9 ====
   20.97 -> end · CTA · locked, centred.
   "Comment APPLE and I'll send you the skill now."

   ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN AND NOTHING CROSSES IT
      ([[reel-graphical-not-textual]] — reel 82 shipped 9/9 with the astronaut's
      shadow across its seal). The card on its plinth owns the centre, the
      keyword chip sits directly under it, and the Mascot is clear to frame
      left. ⛔ The corrected board was CUT from this frame: at any size that
      read, it crossed the card's column, and the rule wall behind already
      carries the proof.
   ========================================================================= */
export const S9Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("vault");
  const HZ = p.horizon;                       /* 586 */
  /* ⛔⛔ THIS SCENE TOOK TWO PASSES AND THE FIRST FIX WAS THE WRONG SIZE.
     v1 spent every beat by f26 and held for 28 frames (5.02 motion, bar 9).
     v2 slid the rule wall in behind the card — and it measured 5.63, i.e. it
     did NOTHING, because five plates at 0.86 scale are 843x43 = 36,000px² and
     [[reel-dead-air-motion-audit]] says a mover has to clear ~40,000px² before
     the metric can see it at all. The lesson is the one already in memory:
     small motion does not register, so do not add more of it — make the thing
     that ALREADY dominates the frame move later and further.
     v3: the card lands bigger and slower (f4..f26, 260px), the stamp and
     keyword take the middle, and the MASCOT walks the last third in from off
     frame — a 206px sprite crossing 340px, clear of the CTA column, and
     motivated: he arrives to hand the thing over. One mover at a time, three
     times, across the whole 66 frames including the end hold. */
  const land = E(f, 4, 26, 0, 1, BACK);
  const stamp = E(f, 28, 38, 0, 1, OUT);
  const key = E(f, 34, 48, 0, 1, BACK);
  const wall = 1;
  const walk = E(f, 40, 64, 0, 1, IO);
  const sk = shake(f, 6, 8, 7);
  /* card s0.78 -> 577x234 at y176..410 · plinth top 412, base 640 */
  const CW = 577, PW = 380, PTOP = 412, PBASE = 640;
  return (
    <Scene p={p} slug="" push={[0, 66, 1.09]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Hall p={p} f={f} lightX={0.5} floorLines={4} />
        <Spot x={W / 2} on={1} f={f} len={HZ + 80} spread={600} />
        <AppleCast x={W / 2} y={300} s={300} z={4} o={0.06} />
        <RuleWall x={36} y={124} cols={5} rows={1} s={0.86} z={6} lit={wall} f={f} />
        <Plinth x={W / 2 - PW / 2} y={PTOP} w={PW} h={PBASE - PTOP} z={40} mark depth={28} />
        <Contact x={W / 2 - PW / 2 - 62} y={PBASE - 6} w={PW + 124} z={38} o={0.44} />
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `translateY(${(1 - land) * -260}px)` }}>
          <SkillCard x={W / 2 - CW / 2} y={176} s={0.78} z={60} print={1} stamped={stamp} />
        </div>
        {/* THE KEYWORD — its own column, and ⛔ NOTHING CROSSES IT. v1 set this
           at 52px with 34px padding, which made the chip 640 wide (186..826)
           and put the Mascot's front legs behind it — exactly the reel-82
           failure the rule exists for. At 44/26 the chip is 476 wide
           (268..744) and he clears it at x=140 (37..243). */}
        <div style={{ position: "absolute", left: 0, right: 0, top: PBASE + 20, zIndex: 96,
          display: "flex", justifyContent: "center",
          transform: `scale(${0.6 + key * 0.4})`, opacity: key }}>
          <div style={{ background: CLAY, borderRadius: 15, padding: "11px 26px",
            boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 44, letterSpacing: "0.03em", color: "#FFF6EE", whiteSpace: "nowrap" }}>
            COMMENT “APPLE”
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 80,
          transform: `translateX(${(1 - walk) * -340}px)` }}>
          <Insp x={140} base={HZ + 112} s={0.86} z={80} f={f} gaze={0.9} cheer={0.9} />
        </div>
      </div>
      <Flash lf={f} at={2} n={4} o={0.24} />
    </Scene>
  );
};
