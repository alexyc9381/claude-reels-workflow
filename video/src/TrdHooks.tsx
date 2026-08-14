import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, OAK, OAKD, BRASS, BRASSD, BRASSL,
  CARD, CARDD, CARDL, LEDG, STEEL, STEELD, LAMPC,
  Hall, Spot, BackWall, Scene, Contact, Mark, usePlace, Desk, DeskLamp, WallClock,
  AGENTS, REPO, SPRITE_COSTUME,
} from "./TrdWorld";
import {
  Sheen, rock, sway, AnnouncementSheet, DeskDressing, Station, AgentSprite, Guy, NumPlate,
} from "./TrdProps";
import { Candles, PriceLine, Spark, TickerBoard, SpotPass, passLit } from "./TrdCharts";

/* ===========================================================================
   REEL 103 "TRADE" · THE ALTERNATE HOOKS.

   ⛔⛔ WHY THIS FILE EXISTS. Alex: *"variants B, C, D have to be different than
      A, they are wayyyy too same, especially the hook."* He is right, and the
      cause is structural rather than cosmetic: **all four variants rendered the
      SAME `S0Hook` component.** Everything the variant table changed —
      `hookHead`, `bed`, camera `seed`, `pal`, `trans` — is paint and jitter over
      one identical sequence of six shots, in one identical order, in one
      identical room. The measured luma delta (15-32) came almost entirely from
      the palette ring, which is why the cuts still *felt* the same: the delta
      was real and the CONTENT was not.
   ⭐ [[feedback_trial_reel_variants]] asks for hook + bed + camera + palette +
      transition. I had four of five. This is the fifth.

   ⛔ WHAT DOES NOT CHANGE: frame 0 is Anthropic's real announcement in every
      cut. That is Alex's standing instruction for this reel AND the gated claim
      plate ([[feedback_frame0_claim_plate]]) — so each hook opens on the same
      receipt and then diverges completely: different ROOM, different second
      shot, different order, a different agent featured, a different shot size
      to close on.

     A · THE STUDY      oak desk · burst -> ten land -> benchmark -> at work ->
                        seven dark -> MACRO on the detective
     B · THE LINEUP     amber bay · burst -> ten in ONE ROW, beam walks them ->
                        benchmark mirrored -> the three forward
     C · ONE THEN MANY  indigo wire room · MACRO first (one agent working) ->
                        pull out to ten -> benchmark -> seven dark
     D · THE FLOOR      teal floor · the whole room working -> the count ->
                        benchmark over a candle wall -> the three, close
   ========================================================================= */

const Windows: React.FC<{ p: any; f: number; n?: number; o?: number }> =
  ({ p, f, n = 4, o = 1 }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.62 * o,
    overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: n }, (_, i) => {
      const x = 24 + i * (W - 48) / n, ww = (W - 48) / n - 26;
      return (
        <React.Fragment key={"wn" + i}>
          <div style={{ position: "absolute", left: x, top: 122, width: ww, height: 330,
            background: dkh(p.back2, 0.30), border: `11px solid ${dkh(p.back, 0.24)}`,
            borderRadius: 5 }} />
          <div style={{ position: "absolute", left: x + ww / 2 - 5, top: 122, width: 10,
            height: 330, background: dkh(p.back, 0.24) }} />
        </React.Fragment>
      );
    })}
  </div>
);

const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 9, o = 0.16 }) => {
  if (lf < at || lf >= at + n) return null;
  const p = (lf - at) / n;
  return <div style={{ position: "absolute", inset: 0, zIndex: 130, pointerEvents: "none",
    background: "#F4EEE2", opacity: Math.sin(p * Math.PI) * o }} />;
};

/** the burst — shared device, but each hook throws it a different way */
const Burst: React.FC<{ lf: number; f: number; at: number; dir: "out" | "down" | "right";
  ox: number; oy: number }> = ({ lf, f, at, dir, ox, oy }) => (<>
  {AGENTS.map((a, i) => {
    const t = E(lf, at + (i % 5) * 0.7, at + 21 + (i % 5) * 0.7, 0, 1, OUT);
    if (t <= 0) return null;
    const ang = (i / 10) * Math.PI * 2 + 0.4;
    const dx = dir === "out" ? Math.cos(ang) * 640 : dir === "down" ? (i - 4.5) * 122 : 700;
    const dy = dir === "out" ? Math.sin(ang) * 470 : dir === "down" ? 430 : (i - 4.5) * 74;
    return (
      <div key={"bx" + a.id} style={{ position: "absolute", inset: 0, zIndex: 96,
        opacity: Math.min(1, t * 4) * (1 - Math.max(0, t - 0.72) * 3.6),
        transform: `translate(${dx * t}px, ${dy * t}px) scale(${0.5 + t * 1.5}) `
          + `rotate(${(i % 2 ? 1 : -1) * t * 26}deg)`,
        transformOrigin: "38% 46%" }}>
        <AgentSprite x={ox} y={oy} i={i} f={f} s={0.62} z={2} on={1} podium={false} />
      </div>
    );
  })}
</>);

/* ======================================================================= B ==
   THE LINEUP — the roster is the idea, and it is presented as a rank.
   ======================================================================== */
export const HookB: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("bay1");
  const fl = usePlace("floor");
  const CUT = [0, 30, 64, 97, 131];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;
  const HERO3 = ["earnings", "market", "model"];
  const heroIdx = HERO3.map((id) => AGENTS.findIndex((a) => a.id === id));

  /* b0 · the post, CENTRED on a pegboard in the amber bay — a different room
     from A's oak study, and the burst falls DOWNWARD like a release. */
  if (shot === 0) {
    return (
      <Scene p={p} slug="" push={[0, 30, 1.064]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={p} f={f} lightX={0.5} floorLines={4} />
          <BackWall kind="pegboard" p={p} f={f} />
          <div style={{ position: "absolute", left: 150, top: 108, width: 712, height: 476,
            background: dkh(OAK, 0.34), borderRadius: 6, zIndex: 8, boxShadow: SH_D,
            border: `12px solid ${dkh(OAK, 0.52)}` }} />
          <AnnouncementSheet x={176} y={124} w={660} z={40} f={f} />
          <Desk y={HZ + 58} z={30} depth={34} drawers={2} />
          <DeskDressing y={HZ + 24} f={f} z={52} s={0.66} side="l" />
          <DeskLamp x={80} y={520} on={1} s={0.78} z={44} f={f} len={190} spread={230} />
          <WallClock x={936} y={196} s={0.84} z={20} mins={24} />
          <Guy x={846} y={430} s={0.94} z={28} f={f} costume={SPRITE_COSTUME.s0read}
            gaze={-0.9} nodAmp={2.8} />
          <Burst lf={lf} f={f} at={15} dir="down" ox={352} oy={252} />
          <Flash lf={lf} at={0} n={9} o={0.12} />
          <Flash lf={lf} at={15} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* b1 · ⭐ ALL TEN IN ONE ROW and the beam walks the whole rank. A's second
     shot is a 5x2 grid of podiums; this is a single line, read left to right,
     which is a different picture of the same fact. */
  if (shot === 1) {
    return (
      <Scene p={fl} slug="" push={[30, 64, 1.086]} vig={0.42}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={fl} f={f} lightX={0.5} floorLines={4} />
          <Windows p={fl} f={f} n={4} />
          <div style={{ position: "absolute", left: 24, right: 24, top: 470, height: 12,
            background: dkh(BRASS, 0.44), borderRadius: 5, zIndex: 26, opacity: 0.66 }} />
          {AGENTS.map((a, i) => {
            const t = E(lf, i * 0.7, 10 + i * 0.7, 0, 1, BACK);
            const lit = passLit(lf, 8, 5, 3, 3, Math.floor(i / 2));
            return (
              <div key={a.id} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
                opacity: Math.min(1, t * 3),
                transform: `translateY(${(1 - t) * 210 - lit * 16}px) scale(${0.7 + t * 0.3})`,
                transformOrigin: `${(30 + i * 96 + 48) / W * 100}% 92%` }}>
                <AgentSprite x={30 + i * 96} y={342} i={i} f={f} s={0.84} z={2}
                  on={0.46 + lit * 0.54} />
              </div>
            );
          })}
          <SpotPass f={lf} stops={[126, 318, 510, 702, 894]} at={8} travel={3} hold={3} y={0}
            c="#E8F6EE" z={62} len={400} spread={210} floorY={556} />
          <NumPlate x={430} y={568} v={String(Math.min(10, Math.floor(E(lf, 2, 26, 0, 10.4, OUT))))}
            label="" s={1.0} z={88} c={GOLD} p={E(lf, 2, 12, 0, 1, OUT)} f={f} />
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* b2 · the benchmark, MIRRORED — chart left, number right. */
  if (shot === 2) {
    const bar = E(lf, 3, 26, 0, 1, OUT), pop = E(lf, 1, 9, 0, 1, BACK);
    return (
      <Scene p={p} slug="" push={[64, 97, 1.070]} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={p} f={f} lightX={0.34} floorLines={3} />
          <BackWall kind="girder" p={p} f={f} />
          <Candles x={44} y={186} w={470} h={300} n={22} seed={41} z={44} paper f={f}
            grow={E(lf, 0, 30, 0.18, 1, LIN)} drift={0.68} />
          <Mark x={560} y={158} s={104} z={86} />
          <div style={{ position: "absolute", left: 700, top: 168, zIndex: 86,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40,
            letterSpacing: "-0.025em", color: "#F4ECDD", opacity: pop }}>{REPO.model}</div>
          <NumPlate x={560} y={306} label={REPO.bench} s={1.12} z={88} c={GOLD} p={pop} f={f}
            v={`${E(lf, 3, 26, 0, 64.37, OUT).toFixed(2)}%`} />
          <div style={{ position: "absolute", left: 560, top: 486, width: 396, height: 26,
            borderRadius: 13, background: dkh(CARDD, 0.46), zIndex: 84, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${bar * 64.37}%`, background: GOLD }} />
          </div>
          <Desk y={HZ + 52} z={30} depth={34} />
          <Guy x={700} y={520} s={0.72} z={70} f={f} costume={SPRITE_COSTUME.s0model}
            gaze={-0.5} cheer={0.3} />
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* b3 · the three come forward out of the rank */
  if (shot === 3) {
    return (
      <Scene p={fl} slug="" push={[97, 131, 1.088]} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={fl} f={f} lightX={0.5} floorLines={4} />
          <Windows p={fl} f={f} n={4} />
          {AGENTS.filter((a) => !HERO3.includes(a.id)).map((a, k) => (
            <AgentSprite key={a.id} x={40 + k * 138} y={186} i={AGENTS.indexOf(a)} f={f}
              s={0.58} z={28 + k} on={E(lf, 2, 24, 0.5, 0.14, OUT)} />
          ))}
          {heroIdx.map((i, k) => {
            const t = E(lf, 2 + k * 6, 28 + k * 6, 0, 1, BACK);
            return (
              <div key={"h" + i} style={{ position: "absolute", inset: 0, zIndex: 70 + k,
                opacity: Math.min(1, t * 3),
                transform: `translateY(${(1 - t) * 250}px) scale(${0.6 + t * 0.4})`,
                transformOrigin: `${(126 + k * 292) / W * 100}% 92%` }}>
                <AgentSprite x={112 + k * 292} y={352} i={i} f={f} s={1.76} z={2} on={1} />
              </div>
            );
          })}
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* b4 · ⛔ A CLOSES ON THE DETECTIVE, SO B CLOSES ON THE BUILDER. */
  const bld = AGENTS.findIndex((a) => a.id === "model");
  return (
    <Scene p={usePlace("grid")} slug="" push={[131, 157, 1.056]} vig={0.50}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={usePlace("grid")} f={f} lightX={0.56} floorLines={2} />
        <Spot x={620} y={0} on={0.95} c="#E6F3E0" z={18} f={f} len={520} spread={430} />
        <Candles x={20} y={150} w={430} h={230} n={18} seed={12} z={14} grow={1}
          drift={0.62} paper={false} f={f} grid={false} last={false} />
        <div style={{ position: "absolute", inset: 0, zIndex: 70,
          transform: `translateY(${E(lf, 0, 20, 44, 0, BACK)}px) scale(${E(lf, 0, 20, 0.9, 1, BACK)})`,
          transformOrigin: "64% 70%" }}>
          <AgentSprite x={452} y={186} i={bld} f={f} s={3.3} z={2} on={1} podium={false} />
        </div>
        <Contact x={548} y={676} w={330} z={60} o={0.34} />
        <Flash lf={lf} at={0} n={9} o={0.16} />
      </div>
    </Scene>
  );
};

/* ======================================================================= C ==
   ONE THEN MANY — opens CLOSE on a single agent working, then pulls out.
   ⭐ The one-to-many reveal is the "pull-out / recontextualise" beat in
      storyboards/CAMERA-GRAMMAR.md §3, staged as a CUT rather than a move.
   ======================================================================== */
export const HookC: React.FC = () => {
  const f = useCurrentFrame();
  const wire = usePlace("wire");
  const fl = usePlace("floor");
  const p = usePlace("desk");
  const CUT = [0, 30, 67, 103, 131];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;
  const HERO3 = ["earnings", "market", "model"];
  const mkt = AGENTS.findIndex((a) => a.id === "market");

  /* c0 · the post, in the INDIGO wire room with a ticker board behind it */
  if (shot === 0) {
    return (
      <Scene p={wire} slug="" push={[0, 30, 1.060]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={wire} f={f} lightX={0.36} floorLines={4} />
          <TickerBoard x={40} y={122} w={932} rows={["AAPL", "MSFT", "NVDA", "JPM", "KO", "TSM"]}
            f={f} z={12} s={0.86} on={0.34} cols={3} />
          <AnnouncementSheet x={92} y={150} w={640} z={40} f={f} />
          <Desk y={HZ + 56} z={30} depth={34} drawers={2} />
          <DeskDressing y={HZ + 22} f={f} z={52} s={0.68} side="r" />
          <DeskLamp x={906} y={528} on={1} s={0.80} z={44} f={f} len={190} spread={230} />
          <Guy x={772} y={412} s={0.96} z={28} f={f} costume={SPRITE_COSTUME.s0read}
            gaze={-0.88} nodAmp={2.8} />
          <Burst lf={lf} f={f} at={15} dir="right" ox={300} oy={300} />
          <Flash lf={lf} at={0} n={9} o={0.12} />
          <Flash lf={lf} at={15} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* c1 · ⭐ MACRO ON ONE AGENT AT WORK, 3.2x. A opens wide on ten; this opens
     close on one, so the second shot of the two cuts could not be less alike. */
  if (shot === 1) {
    return (
      <Scene p={wire} slug="" push={[30, 67, 1.074]} vig={0.48}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={wire} f={f} lightX={0.42} floorLines={2} />
          <Spot x={420} y={0} on={0.95} c="#DED3F2" z={18} f={f} len={520} spread={440} />
          <Candles x={520} y={150} w={452} h={244} n={20} seed={7} z={40} paper f={f}
            grow={E(lf, 0, 34, 0.12, 1, LIN)} drift={0.6} />
          {/* the wire he is reading is LIVE — the tape runs the whole shot */}
          <TickerBoard x={520} y={410} w={452} rows={["AAPL", "MSFT", "NVDA", "JPM"]}
            f={f * 2} z={40} s={0.90} on={0.72} cols={2} />
          {/* and the items he has already pulled keep flying past him */}
          {Array.from({ length: 6 }, (_, i) => {
            const t = Math.max(0, Math.min(1, E(lf, 0, 34, 0, 7.0, LIN) - i));
            if (t <= 0 || t >= 1) return null;
            return (
              <div key={"cw" + i} style={{ position: "absolute",
                left: 300 + t * 700, top: 168 + (i % 3) * 150 - Math.sin(t * Math.PI) * 60,
                width: 104, height: 34, background: CARDL, borderRadius: 4, zIndex: 92,
                boxShadow: SH, opacity: Math.min(1, t * 6) * (1 - Math.max(0, t - 0.8) * 5),
                transform: `rotate(${-14 + t * 28}deg) scale(${1.15 - t * 0.35})`,
                borderTop: `6px solid ${[CLAY, SKY, GOLD][i % 3]}` }} />
            );
          })}
          <div style={{ position: "absolute", inset: 0, zIndex: 70,
            transform: `translateY(${E(lf, 0, 18, 40, 0, BACK)}px) scale(${E(lf, 0, 18, 0.92, 1, BACK)})`,
            transformOrigin: "30% 76%" }}>
            <AgentSprite x={20} y={214} i={mkt} f={f} s={3.2} z={2} on={1} podium={false} />
          </div>
          <Contact x={120} y={690} w={320} z={60} o={0.34} />
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* c2 · THE PULL-OUT, as a cut: there are ten of them */
  if (shot === 2) {
    return (
      <Scene p={fl} slug="" push={[67, 103, 1.092]} vig={0.40}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={fl} f={f} lightX={0.5} floorLines={5} />
          <Windows p={fl} f={f} n={4} />
          {[0, 1, 2, 3, 4].map((i) => (
            <DeskLamp key={"dl" + i} x={112 + i * 188} y={148} on={1} s={0.58} z={24} f={f}
              len={170} spread={200} pendant={122} />
          ))}
          {AGENTS.map((a, i) => {
            const t = E(lf, i * 0.5, 9 + i * 0.5, 0, 1, BACK);
            return (
              <div key={a.id} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
                opacity: Math.min(1, t * 4),
                transform: `translateY(${(1 - t) * -150}px) scale(${0.78 + t * 0.22})`,
                transformOrigin: `${((i % 5) * 186 + 130) / W * 100}% 26%` }}>
                <Station x={50 + (i % 5) * 186} y={222 + Math.floor(i / 5) * 214}
                  i={i} f={f} on={1} s={0.92} z={2} named={false}
                  work={E(lf, 2 + i, 34, 0, 1, OUT)} />
              </div>
            );
          })}
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* c3 · the benchmark, over the wire room's own colour */
  if (shot === 3) {
    const bar = E(lf, 3, 24, 0, 1, OUT), pop = E(lf, 1, 9, 0, 1, BACK);
    return (
      <Scene p={wire} slug="" push={[103, 131, 1.066]} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={wire} f={f} lightX={0.5} floorLines={3} />
          <BackWall kind="slat" p={wire} f={f} />
          <PriceLine x={556} y={196} w={404} h={266} n={30} seed={5} z={44}
            grow={E(lf, 1, 26, 0, 1, LIN)} c={GREEN} drift={0.74} />
          <Mark x={72} y={168} s={110} z={86} />
          <div style={{ position: "absolute", left: 216, top: 178, zIndex: 86,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42,
            letterSpacing: "-0.025em", color: "#F4ECDD", opacity: pop }}>{REPO.model}</div>
          <NumPlate x={72} y={324} label={REPO.bench} s={1.2} z={88} c={GOLD} p={pop} f={f}
            v={`${E(lf, 3, 24, 0, 64.37, OUT).toFixed(2)}%`} />
          <div style={{ position: "absolute", left: 72, top: 502, width: 420, height: 26,
            borderRadius: 13, background: dkh(CARDD, 0.46), zIndex: 84, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${bar * 64.37}%`, background: GOLD }} />
          </div>
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* c4 · ⛔ C CLOSES ON THE SEVEN GOING DARK — a group beat, where A closes on
     a single macro and B on the builder. */
  const dim = (i: number) => (HERO3.includes(AGENTS[i].id)
    ? 1 : E(lf, 2 + (i % 5) * 1.4, 16 + (i % 5) * 1.4, 1, 0.13, IO));
  return (
    <Scene p={fl} slug="" push={[131, 157, 1.078]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={fl} f={f} lightX={0.5} floorLines={5} />
        <Windows p={fl} f={f} n={4} />
        {[0, 1, 2, 3, 4].map((i) => (
          <DeskLamp key={"dl" + i} x={112 + i * 188} y={148} s={0.58} z={24} f={f}
            len={170} spread={200} pendant={122}
            on={[2, 3, 4].includes(i) ? 1 : E(lf, 2 + i * 1.5, 16 + i * 1.5, 1, 0.10, IO)} />
        ))}
        {AGENTS.map((a, i) => (
          <Station key={a.id} x={50 + (i % 5) * 186} y={222 + Math.floor(i / 5) * 214}
            i={i} f={f} on={dim(i)} s={0.92} z={40 + i} named={false}
            work={dim(i) > 0.5 ? E(lf, 0, 26, 0.4, 1, OUT) : 0} />
        ))}
        <Flash lf={lf} at={0} n={9} o={0.16} />
      </div>
    </Scene>
  );
};

/* ======================================================================= D ==
   THE FLOOR — opens on the room, not on a desk. The busiest of the four.
   ======================================================================== */
export const HookD: React.FC = () => {
  const f = useCurrentFrame();
  const fl = usePlace("floor");
  const lit = usePlace("lit");
  const CUT = [0, 30, 71, 105, 135];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HERO3 = ["earnings", "market", "model"];
  const heroIdx = HERO3.map((id) => AGENTS.findIndex((a) => a.id === id));

  /* d0 · the post pinned to a girder in the TEAL floor room */
  if (shot === 0) {
    return (
      <Scene p={fl} slug="" push={[0, 30, 1.058]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={fl} f={f} lightX={0.5} floorLines={5} />
          <Windows p={fl} f={f} n={4} />
          <BackWall kind="girder" p={fl} f={f} />
          <div style={{ position: "absolute", left: 122, top: 116, width: 700, height: 468,
            background: dkh(STEELD, 0.20), borderRadius: 6, zIndex: 8, boxShadow: SH_D,
            border: `12px solid ${dkh(STEELD, 0.42)}` }} />
          <AnnouncementSheet x={148} y={132} w={648} z={40} f={f} />
          {[0, 1, 2, 3, 4].map((i) => (
            <DeskLamp key={"dl" + i} x={112 + i * 188} y={140} on={0.85} s={0.54} z={24} f={f}
              len={150} spread={180} pendant={118} />
          ))}
          <Guy x={846} y={452} s={0.90} z={28} f={f} costume={SPRITE_COSTUME.s0read}
            gaze={-0.9} nodAmp={2.8} />
          <Burst lf={lf} f={f} at={15} dir="out" ox={330} oy={286} />
          <Flash lf={lf} at={0} n={9} o={0.12} />
          <Flash lf={lf} at={15} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* d1 · ⭐ THE WHOLE FLOOR, WORKING — D's second shot is the busiest frame any
     of the four hooks opens with, against A's ten podiums and C's single macro. */
  if (shot === 1) {
    return (
      <Scene p={lit} slug="" push={[30, 71, 1.096]} vig={0.36}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={lit} f={f} lightX={0.5} floorLines={5} />
          <BackWall kind="slat" p={lit} f={f} />
          {[0, 1, 2, 3, 4].map((i) => (
            <DeskLamp key={"dl" + i} x={112 + i * 188} y={140} on={1} s={0.58} z={24} f={f}
              len={170} spread={200} pendant={118} />
          ))}
          {AGENTS.map((a, i) => {
            const t = E(lf, i * 0.7, 10 + i * 0.7, 0, 1, BACK);
            const p2 = passLit(lf, 4, 5, 3, 4, i % 5);
            return (
              <div key={a.id} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
                opacity: Math.min(1, t * 3),
                transform: `translateY(${(1 - t) * -190 - p2 * 12}px) scale(${0.74 + t * 0.26})`,
                transformOrigin: `${((i % 5) * 186 + 126) / W * 100}% 28%` }}>
                <Station x={46 + (i % 5) * 186} y={206 + Math.floor(i / 5) * 200}
                  i={i} f={f} on={1} s={0.90} z={2} named={false}
                  work={E(lf, 2 + i, 40, 0, 1, OUT)} />
              </div>
            );
          })}
          <SpotPass f={lf} stops={[124, 310, 496, 682, 868]} at={4} travel={3} hold={4} y={0}
            c="#FBEFD2" z={28} len={330} spread={210} floorY={470} />
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* d2 · the count, over a candle wall */
  if (shot === 2) {
    const cnt = Math.min(10, Math.floor(E(lf, 2, 24, 0, 10.4, OUT)));
    return (
      <Scene p={fl} slug="" push={[71, 105, 1.086]} vig={0.42}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={fl} f={f} lightX={0.5} floorLines={4} />
          <Candles x={30} y={128} w={952} h={230} n={34} seed={19} z={14} grow={1}
            drift={0.6} paper={false} f={f} grid={false} last={false} />
          {AGENTS.map((a, i) => {
            const t = E(lf, (i % 5) * 0.6, 9 + (i % 5) * 0.6, 0, 1, BACK);
            return (
              <div key={a.id} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
                opacity: Math.min(1, t * 3),
                transform: `translateY(${(1 - t) * -190}px) scale(${0.76 + t * 0.24})`,
                transformOrigin: `${((i % 5) * 180 + 128) / W * 100}% 24%` }}>
                <AgentSprite x={68 + (i % 5) * 180} y={196 + Math.floor(i / 5) * 168}
                  i={i} f={f} s={0.78} z={2} on={1} />
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center",
            zIndex: 88, opacity: E(lf, 2, 12, 0, 1, OUT) }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132,
              lineHeight: 0.9, letterSpacing: "-0.03em", color: GOLD,
              textShadow: "0 5px 16px rgba(0,0,0,0.45)" }}>{cnt}</span>
          </div>
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* d3 · the benchmark, over a full-width candle wall */
  if (shot === 3) {
    const bar = E(lf, 2, 24, 0, 1, OUT), pop = E(lf, 1, 8, 0, 1, BACK);
    return (
      <Scene p={usePlace("grid")} slug="" push={[105, 135, 1.070]} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Hall p={usePlace("grid")} f={f} lightX={0.5} floorLines={3} />
          <Candles x={40} y={140} w={932} h={200} n={30} seed={27} z={13}
            grow={E(lf, 0, 28, 0.24, 1, LIN)} drift={0.68} paper={false} f={f}
            grid={false} last={false} />
          <Mark x={64} y={378} s={104} z={86} />
          <div style={{ position: "absolute", left: 212, top: 386, zIndex: 86,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40,
            letterSpacing: "-0.025em", color: "#F4ECDD", opacity: pop }}>{REPO.model}</div>
          <NumPlate x={478} y={368} label={REPO.bench} s={1.22} z={88} c={GOLD} p={pop} f={f}
            v={`${E(lf, 2, 24, 0, 64.37, OUT).toFixed(2)}%`} />
          <div style={{ position: "absolute", left: 64, top: 566, width: 888, height: 26,
            borderRadius: 13, background: dkh(CARDD, 0.46), zIndex: 84, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${bar * 64.37}%`, background: GOLD }} />
          </div>
          <Flash lf={lf} at={0} n={9} o={0.16} />
        </div>
      </Scene>
    );
  }

  /* d4 · the three, close, side by side */
  return (
    <Scene p={fl} slug="" push={[135, 157, 1.062]} vig={0.48}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={fl} f={f} lightX={0.5} floorLines={2} />
        <Spot x={506} y={0} on={0.92} c="#DFF3EA" z={18} f={f} len={520} spread={560} />
        {heroIdx.map((i, k) => {
          const t = E(lf, 1 + k * 3, 16 + k * 3, 0, 1, BACK);
          return (
            <div key={"h" + i} style={{ position: "absolute", inset: 0, zIndex: 70 + k,
              opacity: Math.min(1, t * 3),
              transform: `translateY(${(1 - t) * 150}px) scale(${0.8 + t * 0.2})`,
              transformOrigin: `${(150 + k * 306) / W * 100}% 92%` }}>
              <AgentSprite x={54 + k * 306} y={276} i={i} f={f} s={2.3} z={2} on={1} />
            </div>
          );
        })}
        <Flash lf={lf} at={0} n={9} o={0.16} />
      </div>
    </Scene>
  );
};
