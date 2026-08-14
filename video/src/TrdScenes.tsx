import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE,
  OAK, OAKD, OAKL, BRASS, BRASSD, BRASSL, CARD, CARDD, CARDL,
  LEDG, LEDGL, LEDGD, STEEL, STEELD, FELT, LAMPC,
  Hall, Spot, BackWall, Scene, Cam, Beam, Motes, Chip, Slug, Plate, BigNum,
  Contact, Mark, usePlace, Desk, DeskLamp, NamePlate, WallClock, PostHero,
  AGENTS, REPO, QUOTES, WIRE, MODEL_ROWS, BOOK, SPRITE_COSTUME, heroAgent,
} from "./TrdWorld";
import {
  Sheen, rock, sway, AnnouncementSheet, DeskDressing, PlateRail, Station, Transcript, QuoteCard,
  Paddle, TapeMachine, Tape, Clip, PortfolioCard, ModelGrid, ValueBlock, OutTray,
  RepoPlate, SourceStrip, Guy, NumPlate, AgentSprite,
} from "./TrdProps";
import { Candles, PriceLine, Spark, Dir, TickerBoard, Allocation, ChartCard, SpotPass, passLit } from "./TrdCharts";

/* ===========================================================================
   REEL 103 "TRADE" · THE BODY.  Board: storyboards/103-trade.md.

   ⛔⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/words_trade.json, converted to LOCAL Sequence frames, with the PICTURE
      LEADING THE ONSET BY 4 FRAMES so the crossover — not the start — lands on
      the syllable.
      root onsets (s): So 0.00 · But 5.36 · first 7.54 · Paste 8.29 · so-you 11.84 ·
                       second 13.84 · Give 15.17 · third 19.51 · Give 20.58 ·
                       People 24.68 · If 27.79
      scene `at` (frames, lead-4): 0 / 157 / 222 / 245 / 351 / 411 / 451 / 581 /
                       613 / 736 / 830.   TOTAL 931 (31.02s).

   ⛔⛔ THE STAGE, MEASURED — NOT GUESSED. The panel is 1012 x 792. The root
      header pill owns y 0..112 and the slug owns y 730..792, so every hero
      object in this file lives inside **y 118..726**, and every geometry below
      is derived from that band and from its place's horizon.

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL — `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE, not per hard cut. Inside
      S0's four shots each range starts on ITS OWN CUT, or that shot ships a
      frozen camera (reel 98 shipped 9 of 15 shots that way).

   ⛔ THE MOVE BUDGET IS ZERO. Every scene is LOCKED; the only movement is the
      mandatory continuous in-panel push, which is a scale on the whole panel
      rather than a camera move ([[feedback_scene_needs_an_arc]]: median
      7.12 -> 8.65). One subject moves at a time in every scene.
   ========================================================================= */

const shake = (lf: number, at: number, amp = 14, n = 12) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

/* ⛔ NO WHITE PLATE, NO IRIS, NO FULL-FRAME CLOSE
   ([[feedback_no_flashing_transitions]]): peak opacity 0.26, ramps in AND out,
   never pure white and never pure black. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 9, o = 0.16 }) => {
  if (lf < at || lf >= at + n) return null;
  const p = (lf - at) / n;
  return <div style={{ position: "absolute", inset: 0, zIndex: 130, pointerEvents: "none",
    background: "#F4EEE2", opacity: Math.sin(p * Math.PI) * o }} />;
};

/** the window wall — this world's signature background structure, a city that
    is still dark because none of this has happened yet today. FURNITURE: z=2,
    low contrast against its own wall, never a second mover. */
const Windows: React.FC<{ p: any; f: number; n?: number; o?: number }> =
  ({ p, f, n = 4, o = 1 }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.62 * o,
    overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: n }, (_, i) => {
      const x = 24 + i * (W - 48) / n;
      const ww = (W - 48) / n - 26;
      return (
        <React.Fragment key={"wn" + i}>
          <div style={{ position: "absolute", left: x, top: 122, width: ww, height: 330,
            background: dkh(p.back2, 0.30), border: `11px solid ${dkh(p.back, 0.24)}`,
            borderRadius: 5 }} />
          <div style={{ position: "absolute", left: x + ww / 2 - 5, top: 122, width: 10,
            height: 330, background: dkh(p.back, 0.24) }} />
          <div style={{ position: "absolute", left: x, top: 268, width: ww, height: 9,
            background: dkh(p.back, 0.24) }} />
          {/* a few lit windows across the way, so the night has depth */}
          {[0, 1, 2].map((k) => (
            <div key={"lw" + k} style={{ position: "absolute", left: x + 20 + k * 34,
              top: 150 + (k % 2) * 148, width: 24, height: 17, background: mxh(p.key, 0.24),
              opacity: 0.20 + Math.sin(f / 67 + i * 2 + k) * 0.035 }} />
          ))}
        </React.Fragment>
      );
    })}
  </div>
);

/* ================================================================== S0 ====
   0.00 -> 5.23s · 157f · HOOK · FOUR HARD SHOTS, camera locked in each.
   Authored to docs/THE-OPEN.md.
   "So, Anthropic just updated their most advanced trading model this year, the
    update includes ten new agents that everyone's using incorrectly."

   ⛔⛔ SHOT A IS ALEX'S DIRECT INSTRUCTION, MADE MID-BUILD: *"for the beginning
      scene, use a real image of the anthropic article announcement for that
      finance agents thing."* It overrides the standing "object scenes not UI"
      preference (reels 68/85/86) for this frame only, and the mitigation is
      staging — the post is a PINNED SHEET on a board above a real oak desk in a
      real room, with a pin, a curl, a cast shadow and a Claude standing at it,
      not a floating rectangle.
   ⛔ FRAME 0 IS SETTLED AND COMPLETE, AND IT IS THE CLAIM PLATE
      ([[feedback_frame0_claim_plate]] — the only measured IG-performance rule
      in this repo). The sheet is 590x430 of Anthropic cream at y=126, the mark
      is on a white tile, and the date is the receipt.
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("desk");
  /* ⛔⛔ FIVE SHOTS, NOT FOUR — AND THE GATE'S PER-SECOND BUCKETS ARE WHAT
     CAUGHT IT. The open passed on its mean (6.83 against a 4.0 bar) while
     reading 12.8 / 10.5 / 8.0 / **1.6 / 1.3** across its five seconds: shot D
     ran 74 frames (2.47s) against THE-OPEN's ~1.1s-per-shot shape, so it played
     its whole idea in the first half second and then sat for two seconds — on
     the one stretch of the reel that decides whether the rest is watched.
     ⭐ A scene MEAN hides the shot that is actually dead; the bucket row is the
     measurement that does not. Split on the measured onset of `incorrectly`
     (4.49s -> f135, less the 4-frame picture lead = f131). */
  /* ⛔⛔ SIX SHOTS, AND THE SPLIT IS AIMED AT THE MEASURED TROUGH. S0-D ran
     1.60s at motion 5.28 as one static roster; it is now TWO shots with an EVENT
     between them — the ten at WORK (on "ten new agents"), then seven going dark
     while three hold (on "that everyone's using"). A roster restated is not a
     beat; a roster CHANGING is. */
  const CUT = [0, 30, 56, 83, 108, 131];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;                                       /* 596 */

  /* ---- A · THE ANNOUNCEMENT. 0.00 -> 1.00s ----------------------------- */
  if (shot === 0) {
    const on = E(lf, 0, 5, 0, 1, OUT);
    const sk = shake(lf, 9, 9, 9);
    return (
      <Scene p={p} slug="" push={[0, 30, 1.062]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Hall p={p} f={f} lightX={0.30} floorLines={4} />
          <BackWall kind="panel" p={p} f={f} />
          {/* the board the sheet is pinned to */}
          <div style={{ position: "absolute", left: 28, top: 112, width: 700, height: 470,
            background: dkh(OAK, 0.30), borderRadius: 6, zIndex: 8, boxShadow: SH_D,
            border: `11px solid ${dkh(OAK, 0.48)}` }} />
          {/* ⛔ 648 WIDE, NOT 590 — see AnnouncementSheet's note. At 590 the
              claim plate measured 18.04% against an 18% bar and frame-0 luma
              139.5 against a 140 bar; both were passing by less than their own
              noise, which is not passing. */}
          <AnnouncementSheet x={52} y={126} w={648} z={40} f={f} />

          {/* ⛔⛔ THE DESK GEOMETRY IS ARITHMETIC, NOT TASTE, AND v1 GOT IT WRONG
              IN THREE PLACES AT ONCE. Written out so it stays fixed:
              the sheet runs y 126..565 and its last readable line ends at 545;
              the desk top face is `y - depth` .. `y`, so a desk at HZ+52=648
              gives 614..648; the dressing sits ON that face and its tallest item
              rises 74*s above it. At s=1.0 on the LEFT it rose to 496 and put a
              mug and a pen cup straight through the announcement's own sentence
              — the one thing on frame 0 that has to be readable. At s=0.70 on
              the RIGHT it tops out at 562, which is below the text and above the
              desk, i.e. on the desk. */}
          <Desk y={HZ + 52} z={30} depth={34} drawers={2} />
          <DeskDressing y={HZ + 18} f={f} z={52} s={0.70} side="r" />
          {/* ⛔ AND THE LAMP WAS FLOATING AND LANDING ON HIS HEAD. Its base is
              at y+96*s, so it only sits on a surface when y = face - 96*s; its
              cone then runs `spread` wide from y+36*s, which is what decides
              whether it lights the desk or the sprite. */}
          <DeskLamp x={958} y={534} on={0.30 + on * 0.70} s={0.80} z={44} f={f} len={190}
            spread={230} />
          <WallClock x={824} y={188} s={0.86} z={20} mins={24} />
          {/* a Claude reading it, standing BEHIND the desk — z=28 puts him under
              the desk's own z=30, so the top face crops his feet instead of him
              floating 38px above it */}
          <Guy x={716} y={430} s={1.0} z={28} f={f} costume={SPRITE_COSTUME.s0read}
            gaze={-0.88} nodAmp={2.8} nodSpeed={13} />
          {/* ⭐⭐ THE PATTERN INTERRUPT. docs/THE-OPEN.md: *"an object that was
              still and is now coming apart is the interrupt; a fade never is."*
              Frame 0 is a settled announcement and stayed settled for a full
              second. At f22 the ten agents BURST OUT OF THE POST toward camera —
              and it is motivated rather than decorative, because the post IS the
              release of those ten agents. It also throws them at the podiums
              they land on in the very next shot. */}
          {AGENTS.map((a, i) => {
            const t = E(lf, 15 + (i % 5) * 0.7, 36 + (i % 5) * 0.7, 0, 1, OUT);
            if (t <= 0) return null;
            const ang = (i / 10) * Math.PI * 2 + 0.4;
            return (
              <div key={"bx" + a.id} style={{ position: "absolute", inset: 0, zIndex: 96,
                opacity: Math.min(1, t * 4) * (1 - Math.max(0, t - 0.72) * 3.6),
                transform: `translate(${Math.cos(ang) * t * 640}px, ${Math.sin(ang) * t * 470}px) `
                  + `scale(${0.5 + t * 1.5}) rotate(${(i % 2 ? 1 : -1) * t * 26}deg)`,
                transformOrigin: "38% 46%" }}>
                <AgentSprite x={330} y={286} i={i} f={f} s={0.62} z={2} on={1} podium={false} />
              </div>
            );
          })}
          <Motes x={958} y={570} w={200} h={170} n={9} f={f} z={26} />
          <Flash lf={lf} at={0} n={9} o={0.12} />
          <Flash lf={lf} at={15} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* ---- B · TEN. 1.00 -> 1.87s ------------------------------------------
     Hard cut in. Ten brass plates DROP onto the rail in a run — ten large
     bright objects travelling, which is the second-biggest motion lever there
     is, and it is also how the roster gets said. */
  if (shot === 1) {
    const drop = (i: number) => E(lf, 2 + i * 1.5, 12 + i * 1.5, 0, 1, BACK);
    const cnt = Math.min(10, Math.floor(E(lf, 3, 20, 0, 10.4, OUT)));
    return (
      <Scene p={p} slug="" push={[30, 56, 1.060]} vig={0.40}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={p} f={f} lightX={0.5} floorLines={4} />
          <BackWall kind="slat" p={p} f={f} />
          <Desk y={HZ + 40} z={30} depth={34} />
          {[0, 1, 2].map((i) => (
            <DeskLamp key={"l" + i} x={166 + i * 340} y={128} on={0.92} s={0.78} z={20} f={f}
              len={190} spread={260} />
          ))}
          {/* the room is a research floor, so the wall behind it carries the
              thing the floor is about. FURNITURE: held under the roster. */}
          <Candles x={54} y={132} w={904} h={182} n={30} seed={12} z={14} grow={1}
            drift={0.6} paper={false} f={f} grid={false} last={false} />
          {/* ⛔⛔ TEN BRASS NAMEPLATES BECOME TEN COSTUMED CLAUDES. This shot used
              to print ten product names inside 0.87s, which is unreadable by
              construction; the costumes were already derived from the jobs, so
              the roster reads faster with no words on it at all. */}
          {AGENTS.map((a, i) => (
            <div key={a.id} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
              opacity: Math.min(1, drop(i) * 3),
              transform: `translateY(${(1 - drop(i)) * -250}px) scale(${0.7 + drop(i) * 0.3})`,
              transformOrigin: `${((i % 5) * 186 + 130) / W * 100}% 24%` }}>
              {/* ⛔ 0.92 COLLIDED. A kit is ~1.6x the sprite wide once the garment
                  and the held prop are counted, so at s=0.92 each one spanned
                  ~150px on a 182px pitch and the props overlapped the neighbour.
                  0.78 spans ~127. */}
              <AgentSprite x={68 + (i % 5) * 180} y={182 + Math.floor(i / 5) * 166}
                i={i} f={f} s={0.78} z={2} on={1} />
            </div>
          ))}
          {/* the only string in the shot: the count, which IS the claim */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 556, textAlign: "center",
            zIndex: 88, opacity: E(lf, 3, 12, 0, 1, OUT) }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 128,
              lineHeight: 0.9, letterSpacing: "-0.03em", color: GOLD,
              textShadow: "0 5px 16px rgba(0,0,0,0.45)" }}>{cnt}</span>
          </div>
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* ---- C · THE MODEL. 1.87 -> 2.77s ------------------------------------
     ⛔⛔ THE HONEST ANSWER TO THE VO'S "MOST ADVANCED TRADING MODEL". There is
        no trading model. There IS a model with a real, published finance
        credential, and Anthropic's own post prints it: Opus 4.7 leads Vals AI's
        Finance Agent benchmark at 64.37%. That is what this shot carries, and
        it is the reel's one number in the display face at >= 74px.
        Board §0 claim 1. */
  if (shot === 2) {
    const bar = E(lf, 3, 22, 0, 1, OUT);
    const pop = E(lf, 1, 9, 0, 1, BACK);
    return (
      <Scene p={p} slug="" push={[56, 83, 1.062]} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={p} f={f} lightX={0.42} floorLines={3} />
          <BackWall kind="girder" p={p} f={f} />
          <Desk y={HZ + 46} z={30} depth={34} />
          <DeskDressing y={HZ + 12} f={f} z={52} s={0.62} side="l" o={0.9} />
          <Spot x={420} y={0} on={0.9} c={LAMPC} z={22} f={f} len={430} spread={480} />
          {/* ⛔ THE MARK TILE IS 1.3x ITS `s`, so s=122 renders 158 wide from
              x=104 and the model name at x=258 sat ON its edge. Derived, not
              nudged: tile 64..210, name starts at 236. */}
          <Mark x={64} y={162} s={112} z={86} />
          <div style={{ position: "absolute", left: 236, top: 168, zIndex: 86,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, letterSpacing: "-0.025em",
            color: "#F4ECDD", opacity: pop }}>{REPO.model}</div>
          {/* ⛔ `ANTHROPIC · MAY 5, 2026` deleted — the date is already printed on
              the announcement two shots earlier and the wordmark is on it. */}
          {/* ⭐ THE HONEST NUMBER, AND THE REEL'S ONE DISPLAY-FACE FIGURE. The VO
              says "most advanced trading model"; there is no trading model, and
              this is what Anthropic actually published. Board §0 claim 1. */}
          <NumPlate x={64} y={318} label={REPO.bench} s={1.34} z={88} c={GOLD} p={pop} f={f}
            v={`${(E(lf, 3, 24, 0, 64.37, OUT)).toFixed(2)}%`} />
          {/* the bar MOVES to its value, full width under the number */}
          <div style={{ position: "absolute", left: 64, top: 496, width: 812, height: 30,
            borderRadius: 15, background: dkh(CARDD, 0.46), zIndex: 84, overflow: "hidden",
            boxShadow: SH }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${bar * 64.37}%`, background: GOLD }} />
            {/* the deciles, so the bar is a SCALE and not a decoration */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
              <div key={"dc" + k} style={{ position: "absolute", left: `${k * 10}%`, top: 0,
                bottom: 0, width: 2, background: dkh(CARDD, 0.62), opacity: 0.7 }} />
            ))}
          </div>
          {/* ⛔ `LEADS THE INDUSTRY · 0 TO 100` deleted — a bar with deciles that
              stops at 64% already says both halves of that sentence. */}
          <PriceLine x={620} y={300} w={330} h={168} n={30} seed={19} z={44}
            grow={E(lf, 2, 26, 0, 1, LIN)} c={GREEN} drift={0.72} />
          <Candles x={64} y={150} w={884} h={140} n={26} seed={33} z={13}
            grow={E(lf, 0, 27, 0.2, 1, LIN)} drift={0.66} paper={false} f={f}
            grid={false} last={false} />
          <Guy x={806} y={306} s={0.86} z={70} f={f} costume={SPRITE_COSTUME.s0model}
            gaze={-0.55} cheer={0.34} />
          <Motes x={420} y={200} w={260} h={280} n={10} f={f} z={26} />
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* ---- D · WHO IS USING THEM. 2.77 -> 5.23s ----------------------------
     ⛔ THE IGNORANCE GAP AS A PICTURE, and the closest this reel gets to a
        villain — which is on purpose. [[feedback_outlier_lift_is_within_creator_only]]
        is measured: *"every breakout has NO villain."* The enemy is the one the
        VO already names, and it is internal: ten plates, seven dark, three lit.
        Nobody is drawn getting it wrong. */
  const fl = usePlace("floor");
  const HERO3 = ["earnings", "market", "model"];

  /* ---- D1 · THE TEN, AT WORK. 2.77 -> 3.60s · 25f ----------------------
     ⛔ THE OLD SHOT WAS A ROSTER WITH A LIGHTING STATE. This one is a working
        floor: all ten lit, all ten producing, paper stacking on every desk. It
        is on-VO ("ten new agents") AND it is the first time the reel shows the
        agents DOING anything, which is the value the first eight seconds were
        withholding until 8.2s. */
  if (shot === 3) {
    return (
      <Scene p={fl} slug="" push={[83, 108, 1.070]} vig={0.40}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={fl} f={f} lightX={0.5} floorLines={5} />
          <Windows p={fl} f={f} n={4} />
          {[0, 1, 2, 3, 4].map((i) => (
            <DeskLamp key={"dl" + i} x={112 + i * 188} y={148} on={1} s={0.58} z={24} f={f}
              len={170} spread={200} pendant={122} />
          ))}
          {AGENTS.map((a, i) => {
            const t = E(lf, i * 1.1, 10 + i * 1.1, 0, 1, BACK);
            return (
              <div key={a.id} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
                opacity: Math.min(1, t * 3),
                transform: `translateY(${(1 - t) * -160}px) scale(${0.78 + t * 0.22})`,
                transformOrigin: `${((i % 5) * 186 + 130) / W * 100}% 26%` }}>
                <Station x={50 + (i % 5) * 186} y={222 + Math.floor(i / 5) * 214}
                  i={i} f={f} on={1} s={0.92} z={2} named={false}
                  work={E(lf, 2 + i, 25, 0, 1, OUT)} />
              </div>
            );
          })}
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* ---- D2 · AND SEVEN GO DARK. 3.60 -> 4.37s · 23f ---------------------
     The EVENT the old single shot never had. Nobody is drawn getting it wrong;
     seven desks simply stop being lit, which is the ignorance gap as a change
     rather than as a state. */
  if (shot === 4) {
    const dim = (i: number) => (HERO3.includes(AGENTS[i].id)
      ? 1 : E(lf, 2 + (i % 5) * 1.6, 15 + (i % 5) * 1.6, 1, 0.15, IO));
    return (
      <Scene p={fl} slug="" push={[108, 131, 1.068]} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={fl} f={f} lightX={0.5} floorLines={5} />
          <Windows p={fl} f={f} n={4} />
          {[0, 1, 2, 3, 4].map((i) => (
            <DeskLamp key={"dl" + i} x={112 + i * 188} y={148} s={0.58} z={24} f={f}
              len={170} spread={200} pendant={122}
              on={[2, 3, 4].includes(i) ? 1 : E(lf, 2 + i * 1.6, 15 + i * 1.6, 1, 0.12, IO)} />
          ))}
          {AGENTS.map((a, i) => (
            <Station key={a.id} x={50 + (i % 5) * 186} y={222 + Math.floor(i / 5) * 214}
              i={i} f={f} on={dim(i)} s={0.92} z={40 + i} named={false}
              work={dim(i) > 0.5 ? E(lf, 0, 23, 0.4, 1, OUT) : 0} />
          ))}
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* ---- E · MACRO ON THE ONE YOU SHOULD BE USING. 4.37 -> 5.23s · 26f ----
     ⛔⛔ I FIXED ONE REPETITION AND IMMEDIATELY BUILT ANOTHER. Round 8 split the
        four roster shots apart, and then D2 ("seven go dark, three hold") and E
        ("ten in a row, three lit") were the SAME IDEA back to back — which is
        the fault the split existed to remove.
     ⭐ THE ANSWER WAS THE ONE SHOT SIZE THIS REEL HAS NOWHERE. Nine shots in the
        open and every one of them is a wide or a medium;
        storyboards/CAMERA-GRAMMAR.md §1 is explicit that a MACRO insert is its
        own vocabulary — *"cut TO it, hold it, cut away"* — and that sizes must
        rotate so a viewer can narrate what changed. So on `incorrectly` the reel
        cuts, for the first time, to ONE agent at 3.4x: the detective, the one
        you should have been using, his glass filling a third of the frame.
        It is also the only frame that pays off the costume work at a size where
        the deerstalker, the coat and the lens actually read. */
  const det = AGENTS.findIndex((a) => a.id === "earnings");
  return (
    <Scene p={fl} slug="" push={[131, 157, 1.052]} vig={0.50}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={fl} f={f} lightX={0.42} floorLines={2} />
        <Spot x={392} y={0} on={0.95} c="#E4F5EC" z={18} f={f} len={520} spread={430} />
        {/* the other nine, thrown far back and unreadable — depth, not roster */}
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <AgentSprite key={"bg" + k} x={-30 + k * 190} y={214} i={(k * 2 + 1) % 10} f={f}
            s={0.46} z={20 + k} on={0.13} />
        ))}
        <div style={{ position: "absolute", inset: 0, zIndex: 70,
          transform: `translateY(${E(lf, 0, 20, 40, 0, BACK)}px) scale(${E(lf, 0, 20, 0.9, 1, BACK)})`,
          transformOrigin: "34% 70%" }}>
          <AgentSprite x={44} y={186} i={det} f={f} s={3.4} z={2} on={1} podium={false} />
        </div>
        <Contact x={150} y={676} w={330} z={60} o={0.34} />
        <Flash lf={lf} at={0} n={9} o={0.16} />
      </div>
    </Scene>
  );
};

/* ================================================================== S1 ====
   5.23 -> 7.40s · 65f · WIDE · SETUP
   "But let me break down the only ones you need to know."
   ARC: ten plates in rank -> three of them travel forward and set down LARGE.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("floor");
  const HERO = ["earnings", "market", "model"];
  const heroIdx = HERO.map((id) => AGENTS.findIndex((a) => a.id === id));
  /* ⛔ S1 RAN 2.17s AS ONE SHOT — the longest in the open, against THE-OPEN's
     ~1.1s shape, and its second half was a spotlight pass over a frame that had
     already finished arriving. Two shots with a SIZE CHANGE between them:
     medium (they walk out of the rank) then CLOSE (the pass, at 2.4x). The
     camera never moves; the EDIT changes the size, which is the whole point of
     storyboards/CAMERA-GRAMMAR.md §1. */
  const CUT = [0, 32];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ---- a · THEY WALK OUT OF THE TEN. 5.23 -> 6.30s · 32f --------------- */
  if (shot === 0) {
    return (
      <Scene p={p} slug="" push={[0, 32, 1.078]} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={p} f={f} lightX={0.5} floorLines={5} />
          <Windows p={p} f={f} n={4} />
          <Spot x={506} y={0} on={0.9} c="#DFF3EA" z={20} f={f} len={480} spread={540} />
          <div style={{ position: "absolute", inset: 0, zIndex: 30,
            transform: `translateY(${E(lf, 0, 32, 0, -34, IO)}px) scale(${E(lf, 0, 32, 1, 0.88, IO)})`,
            transformOrigin: "50% 16%" }}>
            <div style={{ position: "absolute", left: 40, right: 40, top: 296, height: 9,
              background: dkh(BRASS, 0.52), borderRadius: 4, opacity: 0.5 }} />
            {AGENTS.filter((a) => !HERO.includes(a.id)).map((a, k) => (
              <AgentSprite key={a.id} x={58 + k * 132} y={198} i={AGENTS.indexOf(a)} f={f}
                s={0.64} z={30 + k} on={E(lf, 4, 28, 0.62, 0.16, OUT)} />
            ))}
          </div>
          {heroIdx.map((i, k) => {
            const t = E(lf, 2 + k * 5, 26 + k * 5, 0, 1, BACK);
            return (
              <div key={"h" + i} style={{ position: "absolute", inset: 0, zIndex: 70 + k,
                opacity: Math.min(1, t * 3),
                transform: `translateY(${(1 - t) * 250}px) scale(${0.58 + t * 0.42})`,
                transformOrigin: `${(126 + k * 292) / W * 100}% 92%` }}>
                <AgentSprite x={112 + k * 292} y={362} i={i} f={f} s={1.72} z={2} on={1} />
              </div>
            );
          })}
        </div>
      </Scene>
    );
  }

  /* ---- b · CLOSE, AND THE BEAM WALKS THEM. 6.30 -> 7.40s · 33f ---------
     A hard cut IN, then the pass. ⭐ The cut does the work a push-in would have
     cost the whole scene's motion hierarchy. */
  return (
    <Scene p={p} slug="" push={[32, 65, 1.086]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.5} floorLines={3} />
        <Windows p={p} f={f} n={3} o={0.6} />
        {heroIdx.map((i, k) => {
          const lit = passLit(lf, 3, 3, 4, 6, k);
          const rk = rock(lf, 3 + k * 10, 3.0, 20);
          return (
            <div key={"c" + i} style={{ position: "absolute", inset: 0, zIndex: 70 + k,
              transform: `translateY(${-lit * 30}px) scale(${1 + lit * 0.10}) rotate(${rk * 0.3}deg)`,
              transformOrigin: `${(150 + k * 306) / W * 100}% 92%` }}>
              <AgentSprite x={54 + k * 306} y={286} i={i} f={f} s={2.26} z={2}
                on={0.40 + lit * 0.60} />
            </div>
          );
        })}
        <SpotPass f={lf} stops={[196, 502, 808]} at={3} travel={4} hold={6} y={0}
          c="#E8F6EE" z={62} len={460} spread={268} floorY={604} />
        <Flash lf={lf} at={0} n={9} o={0.16} />
      </div>
    </Scene>
  );
};

/* ================================================================== S2 ====
   7.40 -> 8.17s · 23f · CLOSE · ITEM 1 TITLE
   "The first is the earnings reviewer."
   ARC: the plate slams into its holder and ROCKS. Nothing lands and stops.
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("bay1");
  const HZ = p.horizon;                                       /* 600 */
  const slam = E(f, 0, 7, 0, 1, IN_Q);
  const rk = rock(f, 7, 6.5, 20);
  const sk = shake(f, 7, 12, 9);
  return (
    <Scene p={p} slug="" push={[0, 23, 1.075]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Hall p={p} f={f} lightX={0.44} floorLines={3} />
        <BackWall kind="panel" p={p} f={f} />
        <Desk y={HZ} z={30} depth={36} drawers={1} />
        {/* ⛔ THE UNPAPERED CANDLES DISAPPEARED. Drawn at z=14 straight onto a
            saturated amber wall with no card behind them, they measured as the
            flattest frame left in the reel (0.264 against a 0.34 reel mean) —
            a chart nobody can see is not a chart. On a cream card it is a
            framed chart hanging in the bay, which is also what a research desk
            actually has on its wall. */}
        <Candles x={556} y={318} w={404} h={224} n={20} seed={17} z={46} grow={1}
          drift={0.62} paper f={f} />
        <DeskLamp x={168} y={132} on={1} s={1.14} z={44} f={f} len={300} spread={340}
          pendant={118} />
        <Transcript x={78} y={368} s={0.86} z={54} f={f} />
        <div style={{ position: "absolute", left: 194, top: 214 - (1 - slam) * 240,
          zIndex: 80, opacity: Math.min(1, slam * 2.2),
          transform: `rotate(${rk * 0.5}deg)`, transformOrigin: "50% 0%" }}>
          <NamePlate x={0} y={0} t="EARNINGS REVIEWER" w={624} s={1.86} z={4} on={1}
            sub="READS TRANSCRIPTS AND FILINGS" />
        </div>
        <Guy x={716} y={402} s={1.0} z={70} f={f} costume={SPRITE_COSTUME.earnings}
          gaze={-0.75} shock={E(f, 6, 12, 0, 0.4, OUT) * (1 - E(f, 14, 22, 0, 1, OUT))} />
        <Motes x={168} y={230} w={230} h={280} n={10} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ================================================================== S3 ====
   8.17 -> 11.70s · 106f · MEDIUM · ITEM 1 MECHANISM
   "Paste in any earnings call and we'll break down exactly what executives said"
   ARC: the transcript FEEDS THROUGH; quoted lines light and pull out sideways
   as marked cards, one per measured onset. State A -> state B the whole way.
   ⛔ Each card carries a CATEGORY, never a figure for a real company.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("bay1");
  const HZ = p.horizon;                                       /* 600 */
  /* local onsets: any 8.84 -> f16 · exactly 10.45 -> f61 · executives 10.69 -> f68 */
  const flood = E(f, 0, 30, 0, 1, OUT);        /* the call arrives, all of it   */
  const scan  = E(f, 24, 92, 0, 1, LIN);       /* the read sweeps down the wall */
  const CARD_AT = [26, 44, 62, 82];
  return (
    <Scene p={p} slug="" push={[0, 106, 1.105]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.26} floorLines={3} />
        <BackWall kind="shelf" p={p} f={f} />
        <Desk y={HZ + 62} z={30} depth={36} />
        <DeskLamp x={906} y={126} on={1} s={0.86} z={44} f={f} len={230} spread={270}
          pendant={118} />

        {/* THE CALL, ALL OF IT — 36 pages arriving as one wall. This is the
            "any earnings call" half of the line, and it has to feel like too
            much to read, because that is the problem the agent solves. */}
        <Candles x={36} y={140} w={396} h={150} n={16} seed={27} z={12} grow={1}
          drift={0.58} paper={false} f={f} grid={false} last={false} />
        {Array.from({ length: 24 }, (_, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const t = E(f, i * 0.7, 12 + i * 0.7, 0, 1, OUT);
          /* the scan runs down the wall and greys everything it has finished */
          const done = Math.max(0, Math.min(1, scan * 27 - i));
          return (
            <div key={"pg" + i} style={{ position: "absolute",
              left: 40 + col * 92, top: 172 + row * 96,
              width: 78, height: 84, borderRadius: 3, zIndex: 40,
              background: done > 0.5 ? dkh(CARD, 0.20) : CARDL,
              opacity: t * (1 - done * 0.55),
              boxShadow: done > 0.5 ? undefined : SH,
              transform: `translate(${(1 - t) * -180}px, ${(1 - t) * -60}px) `
                + `rotate(${(1 - t) * -22 + (i % 3 - 1) * 1.4}deg) scale(${0.7 + t * 0.3})` }}>
              {[0, 1, 2, 3, 4, 5].map((r) => (
                <div key={"ln" + r} style={{ position: "absolute", left: 9, top: 12 + r * 12,
                  width: 60 - (r % 3) * 16, height: 3.4, borderRadius: 2,
                  background: done > 0.5 ? "#B9B0A0" : "#8E8577", opacity: 0.85 }} />
              ))}
            </div>
          );
        })}
        {/* the read head: one bright bar travelling down the wall */}
        <div style={{ position: "absolute", left: 26, top: 164 + scan * 470, width: 412,
          height: 7, zIndex: 58, borderRadius: 4, background: GOLD,
          opacity: scan > 0.01 && scan < 0.99 ? 0.92 : 0,
          boxShadow: "0 6px 16px rgba(26,24,19,0.34)" }} />

        {/* WHAT COMES OUT — four ChartCards. ⛔ Each was a two-line labelled
            plate (tag + sentence); it is now ONE word, a direction chevron and
            a sparkline. Same information, one text channel instead of two. */}
        {[["GUIDANCE", true, GOLD], ["MARGIN", true, GREEN], ["CAPEX", false, CLAY],
          ["BUYBACK", true, SKY]].map(([t, up, c], i) => (
          <ChartCard key={"cc" + i} x={470} y={162 + i * 118} w={470} t={t as string}
            up={up as boolean} c={c as string} s={1.0} z={72 + i} seed={i + 2} f={f}
            p={E(f, CARD_AT[i], CARD_AT[i] + 14, 0, 1, OUT)} />
        ))}

        <Guy x={196} y={452} s={0.9} z={86} f={f} costume={SPRITE_COSTUME.earnings}
          gaze={0.78} nodAmp={3.0} nodSpeed={10} />
        <Motes x={906} y={180} w={220} h={240} n={9} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ================================================================== S4 ====
   11.70 -> 13.70s · 60f · CLOSE · ITEM 1 PAYOFF
   "so you can decide whether to hold the stock or not."
   ⛔⛔ THE VIEWER DECIDES. The repo's own README: these agents *"do not make
      investment recommendations."* So Claude sets the read down and STEPS BACK,
      and the paddle turns on its own. The reel never draws Claude choosing.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("hold");
  const HZ = p.horizon;                                       /* 604 */
  const chart = E(f, 0, 44, 0, 1, OUT);        /* the price the call is about   */
  const back  = E(f, 6, 34, 0, 1, IO);         /* he sets it down and steps off */
  const turn  = E(f, 14, 36, 0, 1, IO);        /* the paddle turns              */
  const push  = E(f, 30, 60, 0, 1, OUT);       /* and comes toward YOU          */
  return (
    <Scene p={p} slug="THE CALL STAYS YOURS" push={[0, 60, 1.092]} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.44} floorLines={4} />
        <BackWall kind="tile" p={p} f={f} />
        <Spot x={452} y={0} on={0.95} c="#F6EBCE" z={22} f={f} len={470} spread={470} />
        <Desk y={HZ + 44} z={30} depth={34} felt={true} />

        {/* ⭐ THE THING THE DECISION IS ABOUT IS NOW IN THE FRAME. The scene used
            to be a paddle in an empty blue room; the stock itself was nowhere.
            The chart is the set, the read is pinned to it, and the paddle sits
            in front of both. */}
        <Candles x={62} y={150} w={620} h={300} n={22} seed={7} z={40} grow={chart}
          drift={0.58} f={f} />
        {/* the four findings, pinned along the top of the chart */}
        {[["GUIDANCE", true, GOLD], ["MARGIN", true, GREEN], ["CAPEX", false, CLAY],
          ["BUYBACK", true, SKY]].map(([t, up, c], i) => (
          <div key={"pin" + i} style={{ position: "absolute", left: 700, top: 158 + i * 76,
            zIndex: 70, opacity: E(f, 2 + i * 3, 16 + i * 3, 0, 1, OUT),
            transform: `translateX(${(1 - E(f, 2 + i * 3, 16 + i * 3, 0, 1, OUT)) * 190}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: CARDL,
              borderRadius: 5, padding: "7px 11px", boxShadow: SH,
              borderLeft: `7px solid ${c as string}` }}>
              <Dir s={0.9} up={up as boolean} inline />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
                color: "#2B2620", whiteSpace: "nowrap" }}>{t as string}</span>
            </div>
          </div>
        ))}

        {/* ⛔⛔ THE PADDLE IS THE VIEWER'S, AND THE SCENE SAYS SO BY GEOMETRY: it
            turns, then travels TOWARD CAMERA and grows while Claude walks out of
            the light behind it. The repo's README is explicit that these agents
            make no investment recommendation, so the last object moving in this
            scene must be moving at the viewer, not at him. */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 84,
          transform: `translate(${push * -46}px, ${push * 96}px) scale(${1 + push * 0.34})`,
          transformOrigin: "50% 100%" }}>
          <Paddle x={392} y={318} s={1.5} z={2} turn={turn} f={f} />
        </div>

        <Guy x={806 + back * 96} y={396} s={0.86} z={70} f={f} costume={SPRITE_COSTUME.decide}
          gaze={-0.92} o={1 - back * 0.42} nodAmp={2.4} />
      </div>
    </Scene>
  );
};

/* ================================================================== S5 ====
   13.70 -> 15.03s · 40f · CLOSE · ITEM 2 TITLE
   "The second is a market researcher."
   ARC: the plate strikes and rocks while the tape KEEPS RUNNING behind it —
   the background process that stops this being one gesture in an empty shot.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("wire");
  const HZ = p.horizon;                                       /* 566 */
  const slam = E(f, 0, 8, 0, 1, IN_Q);
  const rk = rock(f, 8, 6.2, 22);
  const sk = shake(f, 8, 11, 9);
  return (
    <Scene p={p} slug="" push={[0, 40, 1.082]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Hall p={p} f={f} lightX={0.62} floorLines={4} />
        <BackWall kind="pegboard" p={p} f={f} />
        <Desk y={HZ + 66} z={30} depth={34} />
        <TickerBoard x={62} y={132} w={888} rows={BOOK} f={f} z={16} s={0.92}
          on={0.55} cols={3} />
        <TapeMachine x={96} y={392} s={1.06} f={f} z={56} />
        <Tape x={228} y={444} w={760} s={1.0} f={f} z={54} />
        <DeskLamp x={860} y={210} on={0.95} s={0.9} z={44} f={f} len={220} spread={270} />
        <div style={{ position: "absolute", left: 194, top: 196 - (1 - slam) * 250,
          zIndex: 80, opacity: Math.min(1, slam * 2.2),
          transform: `rotate(${rk * 0.5}deg)`, transformOrigin: "50% 0%" }}>
          <NamePlate x={0} y={0} t="MARKET RESEARCHER" w={624} s={1.86} z={4} on={1}
            sub="TRACKS SECTOR AND ISSUER NEWS" />
        </div>
        <Guy x={732} y={318} s={0.86} z={70} f={f} costume={SPRITE_COSTUME.market}
          gaze={-0.7} nodAmp={2.8} />
      </div>
    </Scene>
  );
};

/* ================================================================== S6 ====
   15.03 -> 19.37s · 130f · WIDE · ITEM 2 MECHANISM
   "Give it your stock portfolio and it will give you every announcement, news
    story, and analyst rating on those stocks."
   ARC: a portfolio card goes up, then THREE COLUMNS fill across the board in
   the VO's own order and words. The busiest frame in the reel.
   local onsets: announcement 16.71 -> f46 · analyst 17.72 -> f76
   ========================================================================= */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("wire");
  /* ⛔ DERIVED FROM THE MEASURED ONSETS, NOT SPACED BY EYE: announcement 16.71,
     news ~17.20, analyst 17.72, minus this scene's 15.03 start, times 30fps,
     minus the 4-frame picture lead. The columns land ON the words that name
     them, which is the whole reason the scene is three columns. */
  const COL_AT = [46, 61, 77];
  /* the card travels to the board across the handover line, so the 1.5s before
     the first column is a MOVE and not a hold */
  const send = E(f, 14, 42, 0, 1, IO);
  return (
    <Scene p={p} slug="MARKET RESEARCHER · agent template 5 of 10" push={[0, 130, 1.120]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.28} floorLines={3} />
        <BackWall kind="pegboard" p={p} f={f} />
        {/* the board */}
        <div style={{ position: "absolute", left: 258, top: 124, width: 692, height: 512,
          background: dkh(p.back, 0.20), borderRadius: 7, zIndex: 20, boxShadow: SH_D,
          border: `9px solid ${dkh(OAK, 0.44)}` }} />
        {/* what you hand it — and it TRAVELS, so the handover line is a move */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 72,
          transform: `translate(${send * 176}px, ${send * -58}px) scale(${1 - send * 0.22})`,
          transformOrigin: "20% 50%" }}>
          <PortfolioCard x={62} y={214} s={1.0} z={2} f={f}
            p={E(f, 2, 16, 0, 1, BACK) * (1 - E(f, 40, 50, 0, 1, IO))} />
        </div>
        <div style={{ position: "absolute", left: 86, top: 402, zIndex: 72,
          fontFamily: MONO, fontWeight: 800, fontSize: 13, letterSpacing: "0.16em",
          color: "#E2D9C6", opacity: E(f, 14, 26, 0, 0.9, OUT) * (1 - E(f, 40, 52, 0, 1, LIN)) }}>
          ONE CARD IN
        </div>

        {/* ⛔ THE BOARD WAS EMPTY FOR 1.7s. The columns are pinned to their
            MEASURED word onsets (46 / 61 / 77 of 130) and must stay there, so
            the fix is not to move them earlier — it is to give the board its
            own STRUCTURE first. Three empty pin-rails land at f8-26, in the
            gap where the VO is still saying "give it your stock portfolio",
            and the columns then fill the slots the viewer can already see. */}
        {[0, 1, 2].map((c) => {
          const t = E(f, 8 + c * 6, 26 + c * 6, 0, 1, OUT);
          return (
            <React.Fragment key={"rail" + c}>
              <div style={{ position: "absolute", left: 278 + c * 228, top: 146, width: 208,
                height: 10, borderRadius: 5, background: dkh(OAK, 0.30), zIndex: 40,
                opacity: t, transform: `scaleX(${0.2 + t * 0.8})` }} />
              {[0, 1, 2, 3, 4].map((r) => (
                <div key={"pn" + c + r} style={{ position: "absolute", left: 296 + c * 228,
                  top: 198 + r * 78, width: 172, height: 64, borderRadius: 4, zIndex: 38,
                  background: mxh(dkh(OAK, 0.34), 0.10), opacity: t * 0.55,
                  borderTop: `3px solid ${mxh(dkh(OAK, 0.30), 0.20)}` }} />
              ))}
            </React.Fragment>
          );
        })}

        {/* three columns, in the VO's order and the VO's words */}
        {WIRE.map((col, c) => {
          const cx = 284 + c * 228;
          const head = E(f, COL_AT[c], COL_AT[c] + 10, 0, 1, BACK);
          return (
            <React.Fragment key={col.t}>
              <div style={{ position: "absolute", left: cx, top: 146, width: 208, zIndex: 60,
                opacity: head, transform: `translateY(${(1 - head) * -34}px)` }}>
                <div style={{ background: col.c, borderRadius: 5, textAlign: "center",
                  padding: "6px 0", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17,
                  letterSpacing: "0.05em", color: dkh(col.c, 0.52), boxShadow: SH }}>{col.t}</div>
              </div>
              {Array.from({ length: col.n }, (_, i) => {
                const at = COL_AT[c] + 6 + i * 8;
                return (
                  <Clip key={col.t + i} x={cx - 6 + (i % 2) * 10} y={198 + i * 78} c={col.c}
                    k={i + c * 3} s={1.18} z={62 + i} kind={c}
                    p={E(f, at, at + 14, 0, 1, OUT)} f={f - at} />
                );
              })}
            </React.Fragment>
          );
        })}
        <SpotPass f={f} stops={[388, 616, 844]} at={40} travel={6} hold={9} y={0}
          c="#E9DEF8" z={58} len={430} spread={236} floorY={588} />
        <SourceStrip x={68} y={668} w={876} s={0.94} z={86} p={E(f, 92, 108, 0, 0.94, OUT)} />
        <Guy x={66} y={430} s={0.8} z={80} f={f} costume={SPRITE_COSTUME.market}
          gaze={0.8} cheer={E(f, 86, 104, 0, 0.35, OUT)} />
        <Tape x={0} y={94} w={W} s={0.84} f={f} z={18} o={0.55} />
        {/* the overflow: items that did not make the board, still streaming past */}
        {Array.from({ length: 9 }, (_, i) => {
          const t = Math.max(0, Math.min(1, E(f, 30 + i * 5, 96 + i * 5, 0, 1, LIN)));
          if (t <= 0 || t >= 1) return null;
          const c = [CLAY, SKY, GOLD][i % 3];
          return (
            <div key={"ov" + i} style={{ position: "absolute",
              left: -140 + t * 1240, top: 616 + (i % 3) * 26 - Math.sin(t * Math.PI) * 40,
              width: 104, height: 34, background: CARDL, borderRadius: 4, zIndex: 30,
              boxShadow: SH, opacity: 0.42 + Math.sin(t * Math.PI) * 0.4,
              transform: `rotate(${-12 + t * 26}deg)`, borderTop: `6px solid ${c}` }} />
          );
        })}
      </div>
    </Scene>
  );
};

/* ================================================================== S7 ====
   19.37 -> 20.43s · 32f · CLOSE · ITEM 3 TITLE
   "The third is a model builder."
   ARC: the plate strikes; the ledger's first column is ALREADY ruling itself in
   behind it, so the scene is never one object doing one thing.
   ========================================================================= */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("grid");
  const HZ = p.horizon;                                       /* 604 */
  const slam = E(f, 0, 8, 0, 1, IN_Q);
  const rk = rock(f, 8, 6.2, 22);
  const sk = shake(f, 8, 11, 9);
  return (
    <Scene p={p} slug="" push={[0, 32, 1.078]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Hall p={p} f={f} lightX={0.40} floorLines={3} />
        <BackWall kind="tile" p={p} f={f} />
        <Desk y={HZ} z={30} depth={34} drawers={1} />
        <DeskLamp x={156} y={182} on={1} s={1.1} z={44} f={f} len={270} spread={320} />
        {/* the ledger already ruling itself in */}
        <PriceLine x={556} y={352} w={392} h={210} n={26} seed={23} z={44}
          grow={E(f, 0, 30, 0.1, 1, LIN)} c={GOLD} drift={0.68} />
        <ModelGrid x={54} y={356} w={430} h={216} f={f} z={50} s={0.72}
          build={E(f, 0, 32, 0.04, 0.46, LIN)} asm={E(f, 1, 32, 0.06, 0.42, LIN)} />
        <div style={{ position: "absolute", left: 194, top: 196 - (1 - slam) * 250,
          zIndex: 80, opacity: Math.min(1, slam * 2.2),
          transform: `rotate(${rk * 0.5}deg)`, transformOrigin: "50% 0%" }}>
          <NamePlate x={0} y={0} t="MODEL BUILDER" w={624} s={1.86} z={4} on={1}
            sub="BUILDS MODELS FROM FILINGS" />
        </div>
        <Guy x={742} y={392} s={0.94} z={70} f={f} costume={SPRITE_COSTUME.model}
          gaze={-0.7} nodAmp={2.8} />
      </div>
    </Scene>
  );
};

/* ================================================================== S8 ====
   20.43 -> 24.53s · 123f · MEDIUM -> FULL PANEL · ITEM 3 MECHANISM
   "Give it any stock and it will build you a full model based on what it's
    worth plus any risk it may have."
   ARC: the grid becomes the WHOLE PANEL and fills cell by cell in a continuous
   sweep, then VALUE lands and RISK lands beside it.
   local onsets: build 21.36 -> f24 · worth 22.97 -> f72 · risk 23.42 -> f86
   ========================================================================= */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("grid");
  /* ⛔⛔ S8 WAS 4.1s AS ONE SHOT — the longest scene in the reel — and its motion
     would not move no matter what was added to it (7.17 -> 7.21 -> 7.26 across
     three passes). That is not a rendering failure; it is the shape of the shot.
     A spreadsheet occupying 66% of the panel is a large STATIC field by
     construction, so a whole-frame delta is dominated by the part that cannot
     change, and flying labels, arriving filings and sliding bands are all small
     movers against it.
     ⭐ THE FIX IS THE EDIT, NOT MORE ANIMATION — and the VO already splits the
     beat: *"build you a full model"* / *"based on what it's WORTH plus any RISK
     it may have."* Two shots, cut on the measured onset of `worth` (22.97s ->
     local f76, less the 4-frame lead = 72): the model gets BUILT, then the reel
     cuts CLOSE onto the two things it produced, at a size where they are the
     hero instead of two cards under a grid. */
  const CUT = [0, 72];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ---- a · IT GETS BUILT. 20.43 -> 22.83s · 72f ------------------------- */
  if (shot === 0) {
    const build = E(f, 0, 70, 0.46, 1, LIN);
    return (
      <Scene p={p} slug="MODEL BUILDER · agent template 4 of 10" push={[0, 72, 1.108]} vig={0.40}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={p} f={f} lightX={0.5} floorLines={2} />
          <BackWall kind="brick" p={p} f={f} />
          {/* ⭐ MATCH CUT IN, on the grid itself — and it carries the assembly
              STATE across, not just the geometry. */}
          <ModelGrid x={E(f, 0, 10, 19, 68, IO)} y={E(f, 0, 10, 349, 122, IO)}
            w={E(f, 0, 10, 464, 876, IO)} h={E(f, 0, 10, 233, 452, IO)}
            f={f} z={50} s={1.0} build={build} asm={E(f, 0, 52, 0.42, 1, LIN)} />
          <div style={{ position: "absolute", left: E(f, 0, 10, 19, 68, IO) + 214 + build * 654,
            top: E(f, 0, 10, 380, 168, IO), width: 34,
            height: E(f, 0, 10, 190, 396, IO), zIndex: 66, borderRadius: 4,
            background: `linear-gradient(180deg, ${hexa(GOLD, 0.0)} 0%, ${hexa(GOLD, 0.46)} 40%, ${hexa(GOLD, 0.0)} 100%)`,
            opacity: build > 0.02 && build < 0.99 ? 1 : 0 }} />

          {/* the INPUTS. Anthropic's line for this agent is "builds models from
              FILINGS, DATA FEEDS AND ANALYST INPUTS" — none of which were in the
              frame, so the grid simply knew things. */}
          {Array.from({ length: 12 }, (_, i) => {
            const t = Math.max(0, Math.min(1, E(f, 2, 68, 0, 13.5, LIN) - i));
            if (t <= 0 || t >= 1) return null;
            const c = [CLAY, GOLD, SKY, GREEN][i % 4];
            return (
              <div key={"fd" + i} style={{ position: "absolute",
                left: -150 + t * 310, top: 200 + (i % 5) * 74 - Math.sin(t * Math.PI) * 56,
                width: 104, height: 40, background: CARDL, borderRadius: 3, zIndex: 62,
                boxShadow: SH, opacity: Math.min(1, t * 5) * (1 - Math.max(0, t - 0.78) * 4.5),
                transform: `rotate(${-16 + t * 30}deg) scale(${0.8 + t * 0.4})`,
                borderLeft: `7px solid ${c}` }}>
                <div style={{ position: "absolute", left: 9, top: 8, width: 50, height: 5,
                  borderRadius: 3, background: "#4C443A" }} />
                <div style={{ position: "absolute", left: 9, top: 21, width: 74, height: 4,
                  borderRadius: 2, background: "#B4AB9B" }} />
                <div style={{ position: "absolute", left: 9, top: 29, width: 44, height: 4,
                  borderRadius: 2, background: "#B4AB9B" }} />
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 40, top: 168, width: 34,
            height: E(f, 0, 10, 190, 380, IO), zIndex: 64, borderRadius: 6,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.18)} 0%, ${STEELD} 100%)`,
            boxShadow: SH, opacity: E(f, 4, 16, 0, 0.92, OUT) }} />
          <Guy x={766} y={534} s={0.86} z={90} f={f} costume={SPRITE_COSTUME.model}
            gaze={-0.5} nodAmp={3.2} />
        </div>
      </Scene>
    );
  }

  /* ---- b · AND HERE IS WHAT IT PRODUCED. 22.83 -> 24.53s · 51f ----------
     worth 22.97 -> local f4 · risk 23.42 -> local f18. The two results at hero
     scale, landing on their own measured onsets, against the finished model now
     held as a band behind them. */
  const worth = E(lf, 0, 16, 0, 1, BACK);
  const risk = E(lf, 14, 32, 0, 1, BACK);
  return (
    <Scene p={p} slug="MODEL BUILDER · agent template 4 of 10" push={[72, 123, 1.096]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.5} floorLines={3} />
        <BackWall kind="brick" p={p} f={f} />
        {/* the finished model, pushed back to a band — it is context now */}
        <ModelGrid x={54} y={132} w={904} h={188} f={f} z={30} s={0.78} build={1} asm={1} />
        <Spot x={506} y={0} on={0.9} c="#E6F3E0" z={20} f={f} len={520} spread={560} />
        <ValueBlock x={44} y={368} t="WHAT IT'S WORTH" sub="" c={GOLD} s={1.86} z={84}
          p={worth} f={lf} />
        <ValueBlock x={520} y={368} t="THE RISK" sub="" c={CLAY} s={1.86} z={84}
          p={risk} f={lf - 14} grid />
        <Guy x={806} y={196} s={0.56} z={90} f={f} costume={SPRITE_COSTUME.model}
          gaze={-0.4} cheer={E(lf, 30, 46, 0, 0.5, OUT)} />
        <Flash lf={lf} at={0} n={9} o={0.16} />
      </div>
    </Scene>
  );
};

/* ================================================================== S9 ====
   24.53 -> 27.67s · 94f · WIDE · THE PEAK
   "People are already building trading bots with these tools and making massive
    profits."

   ⛔⛔ THE HARD STOP OF THIS REEL. The repo's own README: these agents *"do not
      make investment recommendations, execute transactions ... every output is
      staged for human sign-off."* A P&L curve, a profit figure, a money prop or
      a bot placing orders would disprove the reel inside the frame that speaks
      it — and [[feedback_outlier_lift_is_within_creator_only]] independently
      forbids it (*"his numbers are FABRICATED ... Alex must make the number
      REAL/backable. That honesty IS the wedge."*).
   ⭐ SO THE PEAK SPENDS ITS SCALE ON THE HONEST "MASSIVE": every one of the ten
      desks strikes on, the work travels into the OUT TRAY and is stamped FOR
      REVIEW, and the star count climbs to a verified 34,211. Brightest, busiest,
      loudest frame in the reel — and every number on it was checked this
      morning. Board §0 claim 3.
   ========================================================================= */
export const S9: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("lit");
  const on = (i: number) => E(f, 2 + i * 2.2, 12 + i * 2.2, 0.20, 1, OUT);
  /* ⛔ THE COUNTER HAS TO FINISH INSIDE ITS OWN SCENE. v1 ran it 20 -> 74, so
     at f54 the plate read `32,473★` while the header above it read `34,211★` —
     one frame disagreeing with itself about a verified number. Lands at f44. */
  const stars = Math.round(E(f, 14, 44, 0, REPO.starsN, OUT));
  const paperIn = E(f, 12, 92, 0, 1, LIN);
  return (
    <Scene p={p} slug="PUBLIC · FREE TO INSTALL · STAGED FOR YOUR SIGN-OFF"
      push={[0, 94, 1.118]} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.5} floorLines={5} />
        <BackWall kind="slat" p={p} f={f} />
        {/* ⛔ A LAMP NEEDS SOMETHING TO HANG FROM. v1 put a row of DESK lamps on
            the wall at y=124 and their bases floated; v2 used `Spot`, whose
            housing is a dark block and which is the wrong fixture for a room
            made of green glass. These are the world's own lamps on cords. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <DeskLamp key={"pl" + i} x={112 + i * 188} y={140} on={on(i * 2)} s={0.62} z={24}
            f={f} len={190} spread={220} pendant={116} />
        ))}
        {/* ⛔⛔ HIERARCHY IS HERO SIZE, NOT MOVER COUNT ([[apple-reel]] lesson 5).
            v1 gave ten equal cells and a small tray in the corner, which is by
            definition no hierarchy — ten things of the same weight. The desks
            are now a RANK in the upper band and the OUT TRAY is the hero across
            the lower third, which is also the honest reading of this beat: all
            ten run, and all ten stop at your signature. */}
        {/* ⛔ THE STATIONS WERE ONLY CHANGING BRIGHTNESS. Dropping the push from
            1.168 to 1.118 (it was cropping the first column and the repo plate)
            cost this scene 6.50 -> 5.81, and the honest way back is not to push
            harder into a crop — it is to make ten large objects TRAVEL. They
            now arrive on the same staggered run that lights them, which is also
            what the beat says: the whole floor coming up at once. */}
        {AGENTS.map((a, i) => {
          const t = E(f, 1 + i * 2.4, 16 + i * 2.4, 0, 1, BACK);
          const lit = passLit(f, 4, 5, 3, 6, i % 5);
          return (
            <div key={a.id} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
              opacity: Math.min(1, t * 3),
              transform: `translateY(${(1 - t) * -190 - lit * 12}px) `
                + `scale(${0.72 + t * 0.28 + lit * 0.045})`,
              transformOrigin: `${((i % 5) * 186 + 120) / W * 100}% 30%` }}>
              <Station x={58 + (i % 5) * 186} i={i} f={f} on={on(i)} s={0.70}
                y={172 + Math.floor(i / 5) * 156} z={2}
                work={E(f, 10 + i * 2, 78, 0, 1, OUT)} />
            </div>
          );
        })}
        <SpotPass f={f} stops={[124, 310, 496, 682, 868]} at={4} travel={3} hold={6} y={0}
          c="#FBEFD2" z={28} len={330} spread={214} floorY={470} />
        {/* the work travelling down the line into the tray */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const t = Math.max(0, Math.min(1, paperIn * 12 - i));
          if (t <= 0) return null;
          const x0 = 96 + (i % 5) * 186, y0 = i < 5 ? 430 : 276;
          return (
            <div key={"tr" + i} style={{ position: "absolute",
              left: x0 + (600 - x0) * t, top: y0 + (498 - y0) * t - Math.sin(t * Math.PI) * 78,
              width: 118, height: 48, background: CARDL, borderRadius: 4, zIndex: 70,
              opacity: 1 - Math.max(0, t - 0.9) * 10, boxShadow: SH_D,
              transform: `rotate(${t * 30 - 10}deg) scale(${1.25 - t * 0.4})` }}>
              <div style={{ position: "absolute", left: 9, top: 9, width: 54, height: 7,
                background: CLAY, borderRadius: 3 }} />
              <div style={{ position: "absolute", left: 9, top: 24, width: 96, height: 5,
                background: "#B7AE9D", borderRadius: 3 }} />
              <div style={{ position: "absolute", left: 9, top: 34, width: 66, height: 5,
                background: "#B7AE9D", borderRadius: 3 }} />
            </div>
          );
        })}
        {/* THE HERO ARTIFACT: it all lands here, and it STOPS here */}
        <OutTray x={520} y={468} s={1.68} z={86} f={f} n={E(f, 20, 90, 0, 6.4, LIN)}
          stamp={E(f, 70, 84, 0, 1, BACK)} />
        <RepoPlate x={58} y={512} s={1.0} z={88} f={f}
          stars={stars.toLocaleString("en-US") + "★"} p={E(f, 10, 24, 0, 1, OUT)} />
        {/* ⛔ `ALL TEN. FREE TO INSTALL.` deleted — the header on this exact
            scene already reads "34,211★ · APACHE-2.0 / STAGED FOR YOUR SIGN-OFF",
            so it was the reel's one literal channel spent on a duplicate. */}
        <Flash lf={f} at={0} n={9} o={0.18} />
      </div>
    </Scene>
  );
};

/* ================================================================= S10 ====
   27.67 -> 31.02s · 101f · CLOSE · CTA
   "If you want a full breakdown, just comment trade and I'll send it over."
   local onsets: comment 28.81 -> f30 · trade 29.19 -> f41
   ⛔ THE HARD CUT LANDS ON THE KEYWORD.
   ========================================================================= */
export const S10Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("cta");
  const HZ = p.horizon;                                       /* 592 */
  /* comment 28.81 and trade 29.19, minus this scene's 27.67 start x 30fps,
     minus the 4-frame lead: 30 and 42. ⛔ THE KEYWORD LANDS ON THE KEYWORD. */
  /* ⛔ EVERYTHING FINISHED BY f50 OF 101 AND THE SHOT SAT — measured 3.82
     motion with a 9-frame dead run, the worst scene in the reel. The beats stay
     on their measured onsets; what changes is that the pack keeps travelling to
     the last frame and the plate keeps growing after it lands, so the scene has
     an ARC and not an entrance ([[feedback_scene_needs_an_arc]]). */
  const slide = E(f, 6, 84, 0, 1, LIN);
  const key = E(f, 30, 40, 0, 1, BACK);
  const word = E(f, 42, 50, 0, 1, BACK);
  const grow = E(f, 46, 85, 0, 1, LIN);
  const rk = rock(f, 42, 5.4, 24);
  return (
    <Scene p={p} slug="" push={[0, 85, 1.165]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.44} floorLines={3} />
        <BackWall kind="panel" p={p} f={f} />
        <Desk y={HZ} z={30} depth={36} drawers={2} />
        <DeskLamp x={172} y={168} on={1} s={1.06} z={44} f={f} len={260} spread={310} />
        {/* the finished pack, sliding toward camera */}
        {/* ⭐ MATCH CUT IN, ON THE OUT TRAY. S9's last frame leaves the tray at
            x 522..995, y 584..681 once its 1.118 push is applied; this opens on
            the identical rect (wrapper scale 1.772 at 522,471) and then carries
            it down and left toward camera. Same object, no wipe, no dead frame. */}
        <div style={{ position: "absolute",
          left: E(f, 0, 22, 522, 62, IO) + slide * 26,
          top: E(f, 0, 22, 471, 300, IO) + slide * 44,
          zIndex: 70, transform: `scale(${E(f, 0, 22, 1.772, 0.94, IO) + slide * 0.14})`,
          transformOrigin: "0% 0%" }}>
          <OutTray x={0} y={0} s={1.06} z={2} f={f} n={E(f, 0, 82, 6.2, 6.4, LIN)}
            stamp={1} />
        </div>
        {/* the keyword */}
        <div style={{ position: "absolute", left: 442, top: 208, zIndex: 92,
          opacity: Math.min(1, key * 4),
          transform: `translate(${(1 - key) * 620}px, ${(1 - key) * -120}px) `
            + `scale(${0.66 + key * 0.34 + grow * 0.10}) rotate(${rk * 0.5 + (1 - key) * 14}deg)`,
          transformOrigin: "50% 50%" }}>
          <div style={{ background: CLAY, borderRadius: 16, padding: "20px 44px", boxShadow: SH_D,
            border: `6px solid ${dkh(CLAY, 0.32)}`, position: "relative", overflow: "hidden" }}>
            <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 19, letterSpacing: "0.24em",
              color: "#3A1C10", textAlign: "center" }}>COMMENT</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104,
              lineHeight: 1, letterSpacing: "-0.02em", color: "#2A140B", textAlign: "center",
              marginTop: 2, opacity: word,
              transform: `scale(${0.78 + word * 0.22})`, transformOrigin: "50% 60%" }}>TRADE</div>
            <Sheen f={f - 42} at={2} n={26} z={6} o={0.32} />
          </div>
        </div>
        <div style={{ position: "absolute", left: 468, top: 414, width: 452, zIndex: 92,
          textAlign: "center", fontFamily: MONO, fontWeight: 800, fontSize: 14,
          letterSpacing: "0.18em", color: "#EFE2CB", opacity: E(f, 52, 66, 0, 0.94, OUT) }}>
          THE FULL 10-AGENT BREAKDOWN
        </div>
        {[0, 1, 2, 3, 4].map((i) => {
          const t = Math.max(0, Math.min(1, E(f, 8, 84, 0, 5.4, LIN) - i));
          if (t <= 0 || t >= 1) return null;
          return (
            <div key={"cp" + i} style={{ position: "absolute",
              left: 640 - t * 470, top: 168 + t * 214 + Math.sin(t * Math.PI) * -46,
              width: 74, height: 30, background: CARDL, borderRadius: 3, zIndex: 64,
              boxShadow: SH, transform: `rotate(${-18 + t * 30}deg)`,
              opacity: Math.min(1, t * 6) }}>
              <div style={{ position: "absolute", left: 6, top: 6, width: 32, height: 4,
                background: CLAY, borderRadius: 2 }} />
              <div style={{ position: "absolute", left: 6, top: 15, width: 58, height: 3,
                background: "#B7AE9D", borderRadius: 2 }} />
            </div>
          );
        })}
        {/* the finished pack, at hero size, crossing the frame toward camera —
            one large bright object travelling beats four small ones arriving */}
        <div style={{ position: "absolute", left: -300 + slide * 566, top: 442 - slide * 96,
          width: 268, height: 106, zIndex: 68, background: CARDL, borderRadius: 6,
          boxShadow: SH_D, opacity: Math.min(1, slide * 5),
          transform: `rotate(${-11 + slide * 17}deg) scale(${0.70 + slide * 0.86})`,
          transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 14, top: 13, width: 118, height: 11,
            background: CLAY, borderRadius: 4 }} />
          <Spark x={14} y={32} w={150} h={54} seed={37} up z={3} />
          {[0, 1].map((r) => (
            <div key={"pk" + r} style={{ position: "absolute", left: 178, top: 40 + r * 16,
              width: 76 - r * 24, height: 6, background: "#B7AE9D", borderRadius: 3 }} />
          ))}
        </div>
        <Guy x={742} y={456} s={0.9} z={80} f={f} costume={SPRITE_COSTUME.cta}
          gaze={-0.85} cheer={E(f, 42, 60, 0, 0.6, OUT)} nodAmp={3.4} />
        <Mark x={94} y={150} s={82} z={88} />
        <Motes x={172} y={210} w={210} h={260} n={9} f={f} z={26} />
      </div>
    </Scene>
  );
};
