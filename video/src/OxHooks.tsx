import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Mark, Chip, Contact, Motes, R, asPlace, mono, ui, Ring, Puff, Pool,
  Crew, Hero, costumeFor, squash,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, TEAL, STEEL, BRASS, VIOLET, SLATE,
} from "./OxWorld";
import { Ox, ModelCore, RunBand, Crate, ClaimPlate, Chain, Balance, Pan } from "./OxProps";
import { Hall, KeyPool } from "./OxSets";
import { fraunces } from "./fonts";

/* ===========================================================================
   REEL 119 · HOOK CONCEPTS, ROUND 3 — built off the WINNER'S STRUCTURE, not
   off its screenshot.

   ⛔⛔⛔ ROUND 2 WAS THE METRIC GAMED. I read
   [[feedback_frame0_claim_plate]], saw "largest cream plate >= 18%", and built
   three hooks that were A BIG CARD ON A BACKDROP. Alex: *"way too boring and
   its just a big plain simple card no motion etc."* They measured 4.68-5.12
   motion with HOLD 83-100%. That is §9's warning word for word: **a metric
   satisfiable the wrong way WILL be satisfied the wrong way** — the plate share
   went up and the reel got worse.

   ⭐ SO I WENT AND READ THE WINNING SCENE'S CODE (`AgyScenes.S0Hook`) instead of
   my summary of its measurement. The plate is one of THREE things it does:

     1 · THREE HARD CUTS IN THE FIRST 2.5s, camera locked in each.
         `CUT = [0, 22, 54]`. Reel 78's first-five-seconds motion went
         2.0 (one wide) -> 6.23 (three shots) -> 6.85 (four) with NO new
         material, purely from recutting. My round-2 concepts were ONE shot.
     2 · A FULL-FRAME MASS THAT LEAVES. `up = E(f, 22, 46, 0, 1, IO)` —
         **620px of steel in 0.8s**, the entire frame emptying. That is the
         swept area my card never had.
     3 · THE PLATE IS NEVER INERT. Its tremor CLIMBS 1.2 -> 6.5px across shot A,
         because the thing is about to go: *"settled at frame 0 means AT REST,
         not INERT."* Round 1 of AGENCY held it flat and the audit found a
         15-frame dead run in a 22-frame shot.

   Both concepts below take that structure and put an ox-specific mass through
   it. The plate stays (it is the measured finding) but it is now cargo on a
   moving scene rather than the scene.
   ========================================================================= */

type HP = { dur: number };
const GY = 706;
const PLATE = { num: "$0", line: "CLAUDE CODE · 7 DAYS" };

/* ---------------------------------------------------------------------------
   A · THE PEN GATE — mechanism `RELEASE`. ONE SHOT, START TO FINISH.

   ⛔⛔⛔ ALEX: *"why are there two cuts here for this ox thing at the beginning?
   needs to be fixed so it's just one smooth animation. PREVENT THIS IN THE
   FUTURE."* Both were mine and both were avoidable:
     1. a hard cut at f16 from a CLOSE on the gate to a WIDE of the room, and
     2. the full-frame steel clearing right after it, which reads as a second
        cut because the entire frame changes content in four frames.
   ⭐ THE RULE THIS SETTLES: a change of FRAMING is a cut whether or not you
   author one, and a full-frame mass leaving is a change of framing. If the same
   camera position can carry both moments, USE ONE — a cut is only earned when
   it REVEALS something a continuous take cannot.

   ⭐⭐ What made one framing possible: the gate is BARRED, not solid. Reel-wide
   the gate had been a solid plate that had to leave before you could see the
   room; now you see the room, the rails and THE ANIMAL through the bars from
   frame 0, so the lift changes the access, not the subject. Nothing is revealed
   by cutting, so there is nothing to cut to.

   ⭐ And ONE Claude carries the whole thing: it cranks the winch, watches the
   herd come through, then picks up the iron and brands the animal. One body
   with one job beats three bodies appearing and vanishing.
   ------------------------------------------------------------------------- */
export const HookGate: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");

  /* the winch — three hauls, the gate climbing 22px on each */
  const hauls = Math.min(3, Math.floor(f / 5));
  const hp = Math.min(1, (f % 5) / 5);
  const pull = f < 15 ? E(hp * 5, 0, 3.4, 0, 1, OUT) : 0;
  const lift = Math.min(3, hauls + pull) * 22;
  const grip = 540 + pull * 110;
  const load = E(f, 0, 15, 1.4, 6.4, IN_Q);
  const j = f < 16 ? Math.sin(f / 1.9) * load : 0;

  /* then the whole leaf goes, and the plate bolted to it goes with it */
  const up = E(f, 16, 30, 0, 1, IO);

  /* the animal, already behind the bars at frame 0, out and galloping after */
  const walk = E(f, 18, 44, 0, 1, OUT);
  const OXX = 176 + walk * 384;
  const run = 1 - walk;
  const stride = Math.max(0, Math.sin(f * 0.86));
  const gy = -stride * 28 * run;
  const lean = Math.cos(f * 0.86) * 0.24 * run;
  const settle = E(f, 18, 48, 0, 1, OUT);
  const come = E(f, 22, 42, 0, 1, OUT);

  /* the iron, then the mark */
  const press = E(f, 46, 54, 0, 1, IO);
  const back = E(f, 60, 68, 0, 1, OUT);
  const hit = f < 53 ? 0 : E(f, 53, 61, 1, 0, OUT);
  const burn = E(f, 53, 62, 0, 1, OUT);
  const sizz = f < 53 ? 0 : E(f, 53, 70, 0, 1, LIN);
  const jx = Math.sin(f * 2.6) * 11 * hit;
  const jy = -Math.abs(Math.sin(f * 3.3)) * 7 * hit;

  return (
    <Scene p={p} slug="" push={[0, 75, 1.13]} vig={0.29} glow={hexa(p.key, 0.19)}>
      <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
        rakeRate={5.6} lamp={{ x: 470, y: 180, r: 320 }} grit={0.9} rakeN={7} />
      <RunBand y={96} f={f} z={22} rate={6.4} h={13} c={STEEL} hang
        loads={["#4A5058", "#3E444C", "#5A6068", "#3E444C"]} pitch={168} loadW={78} loadH={56} />
      {[70, 500, 930].map((x, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: x - 15, top: 0, width: 30,
          height: GY + 40, zIndex: 18,
          background: `linear-gradient(90deg, #9AA4AE 0%, #58606A 62%, #414851 100%)`,
          boxShadow: "0 0 0 3px rgba(20,23,28,0.34)" }} />
      ))}

      {/* depth only */}
      <div style={{ position: "absolute", inset: 0, zIndex: 22, opacity: 0.42 }}>
        <Ox x={906 + walk * 40} y={GY - 12} s={0.34} z={22} f={f} charge={0.28} rug={false} />
      </div>

      {/* 1st · THE ANIMAL — behind the bars at frame 0, then out and moving */}
      <Contact x={OXX} y={GY + 44} w={700 - stride * 150 * run} z={30}
        o={0.46 - stride * 0.22 * run} />
      <Ox x={OXX + jx} y={GY + 44 + jy + gy} s={1.46} z={46} f={f}
        charge={0.30 + run * 0.44 + lean + settle * 0.14 + hit * 0.42}
        strain={0.55 * run} rug={false} />
      {Array.from({ length: 16 }, (_, i) => {
        const t = ((f * 0.058) + i * 0.0625) % 1;
        const side = i % 2;
        return (
          <div key={"stm" + i} style={{ position: "absolute", zIndex: 50,
            left: OXX + 248 + side * 40 + t * (96 + run * 58) + rnd(i, 81) * 18,
            top: 636 + side * 12 + t * (26 + run * 14) + jy + gy,
            width: 22 + t * 74, height: 20 + t * 66, borderRadius: "50%",
            opacity: (1 - t * t) * 0.86 * (0.42 + run * 0.58),
            background: `radial-gradient(circle at 42% 38%, #FFFFFF 0%, ${hexa("#F4EFE2", 0.92)} 44%, ${hexa("#E4DCC8", 0)} 78%)` }} />
        );
      })}
      {Array.from({ length: 9 }, (_, i) => {
        const t = ((f * 0.07) + i * 0.111) % 1;
        return (
          <div key={"hd" + i} style={{ position: "absolute", zIndex: 34,
            left: OXX - 210 - t * 240 + rnd(i, 91) * 96,
            top: GY + 34 - t * 76 - rnd(i, 92) * 30,
            width: 44 + t * 92, height: 38 + t * 76, borderRadius: "50%",
            opacity: (1 - t) * 0.82 * run,
            background: `radial-gradient(circle at 44% 40%, ${hexa("#EFE4C8", 0.95)} 0%, ${hexa("#D8C49A", 0.72)} 50%, ${hexa("#D8C49A", 0)} 80%)` }} />
        );
      })}

      {/* 3rd · one of the cast, in front of its front legs */}
      <Crew f={f} x={706 - (1 - come) * 180} y={GY + 30} i={9} size={142} z={72}
        at={22} loop={2} cheer={1} />

      {/* 2nd · THE ONE CLAUDE — winch, then watch, then iron. z below the gate
          so it is behind the steel while the steel is still down. */}
      <Hero f={f} x={196} y={GY + 40 + pull * 16} size={244} z={68} act={1} ph={1.2}
        strain={f < 16 ? 0.34 + Math.sin(pull * Math.PI) * 0.5 : press * 0.62}
        reach={132} gaze={0.5} cheer={burn > 0.5 ? 1 : 0} />

      {/* the winch it turned, still on the wall */}
      <div style={{ position: "absolute", left: 368 - 104, top: 646 - 104, width: 208,
        height: 208, zIndex: 44, opacity: 1 - E(f, 30, 44, 0, 1, IO) * 0.55,
        transform: `rotate(${(hauls + pull) * 112}deg)`, transformOrigin: "50% 50%" }}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"th" + i} style={{ position: "absolute", left: 96, top: -7, width: 16,
            height: 24, background: "#69727C", borderRadius: 3,
            transform: `rotate(${i * (360 / 14)}deg)`, transformOrigin: "50% 111px" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
          border: "16px solid #5A626C", boxShadow: SH_D }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: 99, top: 20, width: 11,
            height: 168, background: "#4E566044", borderRadius: 6,
            boxShadow: "inset 0 0 0 3px #4E5660",
            transform: `rotate(${i * 36}deg)`, transformOrigin: "50% 50%" }} />
        ))}
        <div style={{ position: "absolute", left: 72, top: 72, width: 64, height: 64,
          borderRadius: "50%", background: "#2A2F36", border: "6px solid #8E96A2" }} />
        <div style={{ position: "absolute", left: 170, top: 88, width: 42, height: 42,
          borderRadius: "50%", boxShadow: SH,
          background: "linear-gradient(160deg,#D9A441 0%,#8A6520 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: 470, top: 618, width: 96, height: 26,
        zIndex: 45, transformOrigin: "100% 50%", opacity: 1 - E(f, 30, 44, 0, 1, IO) * 0.55,
        transform: `rotate(${8 - pull * 17}deg)`, borderRadius: 6, boxShadow: SH,
        background: "linear-gradient(180deg,#B8C0C8 0%,#69727C 62%,#3E444C 100%)" }} />

      {/* ⭐ THE IRON */}
      {(() => {
        const ang = -84 + press * 68 - back * 34;
        const heat = press < 0.06 ? 0 : press;
        return (
          <div style={{ position: "absolute", left: 196 + press * 28 - back * 74,
            top: 656 - press * 18 + back * 20,
            width: 250, height: 26, zIndex: 74, transformOrigin: "0% 50%",
            opacity: E(f, 30, 40, 0, 1, OUT) * (1 - back),
            transform: `rotate(${ang}deg)` }}>
            <div style={{ position: "absolute", left: -6, top: -6, width: 44, height: 38,
              borderRadius: 19, border: "8px solid #3A414A", background: "transparent" }} />
            <div style={{ position: "absolute", left: 30, top: 5, right: 24, height: 16,
              borderRadius: 5, boxShadow: SH,
              background: "linear-gradient(180deg,#8E96A2 0%,#4A515A 54%,#2A2F36 100%)" }} />
            <div style={{ position: "absolute", left: 208, top: -72, width: 178, height: 170,
              transform: `rotate(${-ang * 0.86}deg)`, transformOrigin: "10% 50%" }}>
              <div style={{ position: "absolute", left: 0, top: 72, width: 40, height: 26,
                borderRadius: 5, background: "#4A515A" }} />
              <div style={{ position: "absolute", left: 32, top: 0, width: 146, height: 170,
                borderRadius: 16, border: "9px solid #262B32", boxShadow: SH_D,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: heat === 0
                  ? "linear-gradient(150deg,#8E96A2 0%,#59616B 46%,#343A42 100%)"
                  : `linear-gradient(150deg,${mxh("#FF8A3C", 0.34 + heat * 0.4)} 0%,#FF8A3C ${40 + heat * 40}%,#7A3312 100%)` }}>
                <span style={{ ...ui(43, 900), letterSpacing: 0.5, lineHeight: 1,
                  color: heat === 0 ? "#C6CED6" : "#FFF3DC",
                  textShadow: heat === 0 ? "0 2px 0 #2A2F36"
                    : `0 0 14px ${hexa("#FFD9A0", 0.9)}, 0 2px 0 #7A2F0E` }}>FREE</span>
              </div>
              {heat > 0.1 && Array.from({ length: 5 }, (_, i) => (
                <div key={"dh" + i} style={{ position: "absolute",
                  left: 48 + rnd(i, 63) * 110, top: -20 - rnd(i, 64) * 38,
                  width: 14 + (i % 3) * 8, height: 14 + (i % 3) * 8, borderRadius: "50%",
                  opacity: heat * 0.6,
                  background: hexa(i % 2 ? "#EDE7D6" : "#FF8A3C", 0.5) }} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* the contact flash, the sparks, and the mark */}
      <div style={{ position: "absolute", left: 470 - 190, top: 556 - 190, width: 380,
        height: 380, zIndex: 58, opacity: hit * 0.92, pointerEvents: "none",
        borderRadius: "50%", transform: `scale(${0.5 + (1 - hit) * 0.9})`,
        background: `radial-gradient(circle, #FFFFFF 0%, ${hexa("#FFD9A0", 0.85)} 26%, ${hexa("#FF8A3C", 0.42)} 52%, transparent 72%)` }} />
      {Array.from({ length: 16 }, (_, i) => {
        const ang = (i / 16) * Math.PI * 2 + 0.4;
        const d = sizz * (70 + rnd(i, 71) * 190);
        return (
          <div key={"sk" + i} style={{ position: "absolute", zIndex: 76,
            left: 470 + Math.cos(ang) * d, top: 556 + Math.sin(ang) * d * 0.72 + sizz * sizz * 90,
            width: 9 + (i % 3) * 5, height: 9 + (i % 3) * 5, borderRadius: "50%",
            opacity: f < 53 ? 0 : (1 - sizz) * 0.95,
            background: i % 3 ? "#FFD9A0" : "#FF8A3C",
            boxShadow: `0 0 12px ${hexa("#FF8A3C", 0.8)}` }} />
        );
      })}
      <div style={{ position: "absolute", left: 322 + jx, top: 452 + jy, width: 356, height: 172,
        zIndex: 56, opacity: Math.min(1, burn * 1.7),
        transform: `scale(${0.72 + burn * 0.28}) rotate(-6deg)`, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", inset: -16, borderRadius: 22,
          background: hexa("#FF8A3C", 0.22 * (1 - burn * 0.5)),
          boxShadow: `0 0 ${48 + (1 - burn) * 70}px ${hexa("#FF8A3C", 0.62)}` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900,
          fontSize: 128, letterSpacing: 1, lineHeight: 1,
          color: hit > 0.2 ? "#FFFFFF" : "#FFD9A0",
          textShadow: `0 0 30px ${hexa("#FFD9A0", 0.95)}, 0 0 64px ${hexa("#FF8A3C", 0.9)}, 0 7px 0 #7A2F0E` }}>FREE</div>
      </div>

      {/* ⭐⭐ THE GATE — BARRED, so the room and the animal are visible THROUGH
          it from frame 0 and the lift changes the access, not the subject.
          It ratchets on the winch, then goes. The plate is bolted to it. */}
      <div style={{ position: "absolute", left: -20, right: -20, top: -lift - up * 850,
        height: H + 120, zIndex: 84,
        transform: `translate(${j}px, ${j * 0.6}px)` }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"gb" + i} style={{ position: "absolute", left: 0, right: 0,
            top: i * 118, height: 46,
            background: `linear-gradient(180deg, #AEB8C2 0%, #7E868F 46%, #545C66 100%)`,
            borderTop: "5px solid #C6CED6", boxShadow: "0 7px 16px rgba(16,18,22,0.42)" }} />
        ))}
        {[92, 506, 920].map((x, i) => (
          <div key={"gs" + i} style={{ position: "absolute", left: x - 19, top: -20, width: 38,
            height: H + 140,
            background: `linear-gradient(90deg, #96A0AA 0%, #545C66 100%)` }} />
        ))}
        <ClaimPlate x={506} y={108} w={560} f={f} z={6} num={PLATE.num} line={PLATE.line} s={0.94} />
      </div>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   B · THE CRUSH — mechanism `DEMOLITION`.
     shot A  0-22   CLOSE on a wall of PAID subscription slabs, the plate in
                    front, everything trembling harder as something arrives.
     shot B  22-48  the ox comes THROUGH the wall left-to-right and the whole
                    thing detonates across the panel — 30 slabs travelling.
     shot C  48-75  wide. Debris still falling, the plate standing in the gap.
   ------------------------------------------------------------------------- */
export const HookCrush: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  const MARKS = ["claude.svg", "openai.png", "gemini.png", "cursor.svg", "windsurf.svg"];

  const Slab = ({ i, x, y, s = 1 }: { i: number; x: number; y: number; s?: number }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 196 * s, height: 128 * s,
      borderRadius: 7 * s, background: `linear-gradient(164deg, #8E98A2 0%, #4A515A 100%)`,
      border: `${4 * s}px solid #14171C` }}>
      <div style={{ position: "absolute", left: 12 * s, top: 14 * s, width: 100 * s,
        height: 100 * s, borderRadius: 16 * s, background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(`logos/${MARKS[i % MARKS.length]}`)}
          style={{ width: 70 * s, height: 70 * s, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 124 * s, top: 44 * s, width: 60 * s,
        height: 38 * s, borderRadius: 5 * s, background: RED,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(17 * s, 900), color: "#2A0A06" }}>PAID</span>
      </div>
    </div>
  );

  /* ⛔ SAME TWO-CUT DEFECT AS THE GATE, same fix: one framing, start to finish.
     The wall filled the panel and then a CUT put us in a wide room — a change
     of framing the viewer reads as an edit. Now the camera never moves: the
     wall is in front of us, the animal's head is in the gap in it from frame 0,
     and when the wall goes we are simply looking at what was behind it. */
  const load = E(f, 0, 15, 1.0, 7.0, IN_Q);
  const t = f < 16 ? Math.sin(f / 1.7) * load : 0;
  const k = E(f, 16, 34, 0, 1, IN_Q);
  const settle = E(f, 34, 58, 0, 1, OUT);
  const oxX = -320 + E(f, 16, 58, 0, 1, OUT) * 880;
  const come = E(f, 26, 54, 0, 1, OUT);
  const RACK = [88, 268, 470, 676, 878];
  return (
    <Scene p={p} slug="" push={[0, 75, 1.12]} vig={0.28} glow={hexa(GOLD, 0.20)}>
      <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
        rakeRate={5.6} lamp={{ x: 506, y: 176, r: 300 }} grit={0.9} rakeN={7} />

      {/* what is LEFT of the wall — and what happens to its prices */}
      {RACK.map((rx, i2) => {
        const flip = E(f, 38 + i2 * 6, 49 + i2 * 6, 0, 1, OUT);
        return (
          <div key={"rk" + i2} style={{ position: "absolute", left: rx - 88, top: 190,
            width: 176, height: 116, zIndex: 26,
            transform: `rotate(${Math.sin(i2 * 2.1) * 2.4}deg)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 8,
              background: "linear-gradient(164deg,#8E98A2 0%,#4A515A 100%)",
              border: "4px solid #14171C" }} />
            <div style={{ position: "absolute", left: 12, top: 14, width: 88, height: 88,
              borderRadius: 15, background: "#FFFFFF", display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${MARKS[i2 % MARKS.length]}`)}
                style={{ width: 62, height: 62, objectFit: "contain" }} />
            </div>
            <div style={{ position: "absolute", left: 108, top: 34, width: 58, height: 48,
              transformStyle: "preserve-3d", transform: `rotateX(${flip * 180}deg)` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: RED,
                backfaceVisibility: "hidden", display: "flex", alignItems: "center",
                justifyContent: "center" }}>
                <span style={{ ...mono(18, 900), color: "#2A0A06" }}>PAID</span>
              </div>
              <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: "#EDE7D6",
                backfaceVisibility: "hidden", transform: "rotateX(180deg)",
                boxShadow: `0 0 ${flip * 22}px ${hexa(GOLD, 0.7)}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...mono(25, 900), color: "#2A1D06" }}>$0</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* the cast, through the hole it made */}
      {[{ x: 148, s: 236, i: 1 }, { x: 820, s: 196, i: 7 }].map((c, q) => (
        <Crew key={"cw" + q} f={f} x={c.x - (1 - come) * (200 + q * 60)} y={GY + 54 + q * 12}
          i={c.i} size={c.s * (0.66 + come * 0.34)} z={64 + q} at={22 + q * 4}
          loop={q ? 3 : 2} cheer={come > 0.6 ? 1 : 0} />
      ))}

      {/* the dark of the far side, BEHIND the animal (see the z note below) */}
      <div style={{ position: "absolute", left: -46, top: 402, width: 240, height: 214,
        zIndex: 15, borderRadius: 7, opacity: 1 - Math.min(1, k * 2.4),
        background: "linear-gradient(180deg,#22262C 0%,#14171C 100%)" }} />

      {/* THE ANIMAL — head in the gap at frame 0, then straight through */}
      <Contact x={f < 16 ? -85 : oxX} y={f < 16 ? 645 : GY + 34}
        w={f < 16 ? 420 : 620} z={30} o={0.44} />
      <Ox x={(f < 16 ? -85 + Math.abs(Math.sin(f / 4.1)) * (14 + load * 4.6) : oxX)}
        y={f < 16 ? 645 : GY + 34} s={f < 16 ? 1.0 : 1.42} z={f < 16 ? 16 : 62} f={f}
        charge={f < 16 ? 0.44 + (load / 7) * 0.44 : 1 - settle * 0.42}
        strain={f < 16 ? 0.6 : 0.9 * (1 - settle)} rug={false} />
      {Array.from({ length: 14 }, (_, i2) => {
        const tt = ((f * 0.058) + i2 * 0.0714) % 1;
        const side = i2 % 2;
        return (
          <div key={"cs" + i2} style={{ position: "absolute", zIndex: 66,
            left: (f < 16 ? 40 : oxX + 246) + side * 40 + tt * 100 + rnd(i2, 81) * 18,
            top: (f < 16 ? 508 : 626) + side * 12 + tt * 28,
            width: 22 + tt * 72, height: 20 + tt * 64, borderRadius: "50%",
            opacity: (1 - tt * tt) * 0.8,
            background: `radial-gradient(circle at 42% 38%, #FFFFFF 0%, ${hexa("#F4EFE2", 0.9)} 44%, ${hexa("#E4DCC8", 0)} 78%)` }} />
        );
      })}
      {Array.from({ length: 12 }, (_, i2) => {
        const tt = ((f * 0.07) + i2 * 0.083) % 1;
        return (
          <div key={"dz" + i2} style={{ position: "absolute", zIndex: 40,
            left: oxX - 240 - tt * 200 + rnd(i2, 91) * 90,
            top: GY + 24 - tt * 70 - rnd(i2, 92) * 26,
            width: 42 + tt * 86, height: 36 + tt * 70, borderRadius: "50%",
            opacity: f < 18 ? 0 : (1 - tt) * 0.72 * (1 - settle * 0.5),
            background: `radial-gradient(circle at 44% 40%, ${hexa("#EFE4C8", 0.95)} 0%, ${hexa("#D8C49A", 0.7)} 50%, ${hexa("#D8C49A", 0)} 80%)` }} />
        );
      })}

      {/* ⭐ THE WALL, in front of us, and then not. No cut — it just goes. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 78,
        transform: `translate(${t}px, ${t * 0.5}px)` }}>
        {[[0, 0, W, 402], [0, 616, W, H - 616], [194, 402, W - 194, 214]].map((r, q) => (
          <div key={"wf" + q} style={{ position: "absolute", left: r[0], top: r[1],
            width: r[2], height: r[3], background: "#5A626C",
            opacity: 1 - Math.min(1, k * 2.4) }} />
        ))}
        {Array.from({ length: 12 }, (_, i2) => {
          if (i2 === 8) return null;
          const a2 = (i2 / 12) * Math.PI * 2;
          const d = k * (300 + rnd(i2, 41) * 660);
          /* ⭐ EACH SLAB RATTLES ON ITS OWN PHASE. A uniform translate of the
             whole wall repaints only its outer edge; twelve independently
             jittering slabs repaint every seam in it. */
          const rx = f < 17 ? Math.sin(f / 1.6 + i2 * 1.9) * load * 0.9 : 0;
          const ry = f < 17 ? Math.cos(f / 1.9 + i2 * 2.4) * load * 0.7 : 0;
          return (
            <div key={"sl" + i2} style={{ position: "absolute", zIndex: 4,
              left: -40 + (i2 % 4) * 210 + (Math.floor(i2 / 4) % 2) * 60 + Math.cos(a2) * d * 1.3 + rx,
              top: 106 + Math.floor(i2 / 4) * 158 + Math.sin(a2) * d * 0.86 + k * k * 300 + ry,
              transform: `rotate(${k * (190 + rnd(i2, 42) * 520) + rx * 0.22}deg)`,
              opacity: 1 - Math.max(0, (k - 0.55) / 0.45) }}>
              <Slab i={i2} x={0} y={0} s={1.14 - k * 0.7} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: -46, top: 402, width: 240, height: 214,
          zIndex: 6, borderRadius: 7, border: "7px solid #14171C",
          opacity: 1 - Math.min(1, k * 2.4),
          boxShadow: "inset 0 0 26px rgba(8,10,13,0.7)" }} />
        {/* the seams, and the claim plate bolted across them */}
        <div style={{ position: "absolute", inset: 0, zIndex: 8,
          opacity: 1 - Math.max(0, (k - 0.22) / 0.28),
          transform: `translate(${k * 240}px, ${-k * 170 + k * k * 460}px) rotate(${k * 30}deg)` }}>
          <ClaimPlate x={506} y={214} w={640} f={f} z={8} num={PLATE.num} line={PLATE.line} />
        </div>
      </div>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   C · THE PRICE BOARD — mechanism `COLLAPSE`.
     ⛔⛔ THE SCALE WAS KILLED HERE. Alex: *"the scale one doesn't make sense,
     that's a bad concept."* Right, and the reason is [[feedback_too_fast_is_a_part_count]]:
     A METAPHOR HAS TO BE DECODED AND A 2.5s SHOT HAS NO TIME. A beam balance
     only reads if you already know what is being weighed against what — and the
     rig fought the animal at every size (the pan-to-beam gap is the chain
     length, so anything that fits is too small to see).

     This needs no translation: A NUMBER GOES DOWN. Split-flap tiles over the
     bay read $200/MO; the animal walks in under them and they collapse
     200 -> 60 -> 20 -> 0, one clack at a time.
       gate  -> RELEASE     (steel lifts, the herd comes out)
       crush -> DEMOLITION  (a paid wall detonates)
       board -> COLLAPSE    (the price falls to nothing while you watch)
     Different axis too: GATE moves up, CRUSH moves outward, this moves DOWN in
     discrete steps — and §13's warning about "N discrete pops" does not bite at
     three flips spread over 0.6s with a walk running underneath them.
   ------------------------------------------------------------------------- */
export const HookBoard: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("yard");
  const TW = 150, TH = 196, GAP = 16, BX = 506;
  const X0 = BX - (4 * TW + 3 * GAP) / 2;          /* "$" + three digit tiles */

  /* one split-flap tile: a case, a hinge seam, and the leaf that falls */
  const Flap = ({ i, ch, prev, k }: { i: number; ch: string; prev: string; k: number }) => {
    const x = X0 + i * (TW + GAP);
    const face = (c: string, half: "t" | "b") => (
      <div style={{ position: "absolute", left: 0, top: half === "t" ? 0 : TH / 2,
        width: TW, height: TH / 2, overflow: "hidden",
        background: half === "t" ? "#F1EBDB" : "#E0D8C2",
        borderRadius: half === "t" ? "10px 10px 0 0" : "0 0 10px 10px" }}>
        <div style={{ position: "absolute", left: 0, top: half === "t" ? 0 : -TH / 2,
          width: TW, height: TH, display: "flex", alignItems: "center",
          justifyContent: "center", ...ui(132, 900), color: "#1B1F25", lineHeight: 1 }}>{c}</div>
      </div>
    );
    return (
      <div style={{ position: "absolute", left: x, top: 168, width: TW, height: TH, zIndex: 46 }}>
        {face(ch, "t")}
        {face(ch, "b")}
        <div style={{ position: "absolute", left: 0, top: TH / 2 - 2, width: TW, height: 4,
          background: "#A89877", zIndex: 4 }} />
        {/* the leaf carrying the OLD character, hinged at the seam */}
        {k > 0 && k < 1 && (
          <div style={{ position: "absolute", left: 0, top: 0, width: TW, height: TH / 2,
            zIndex: 6, transformOrigin: "50% 100%",
            transform: `perspective(560px) rotateX(${-k * 90}deg)`,
            filter: `brightness(${1 - k * 0.45})` }}>{face(prev, "t")}</div>
        )}
      </div>
    );
  };

  const Board = ({ chars, prevs, ks }: { chars: string[]; prevs: string[]; ks: number[] }) => (
    <>
      <div style={{ position: "absolute", left: X0 - 34, top: 128, zIndex: 44,
        width: 4 * TW + 3 * GAP + 68, height: TH + 118, borderRadius: 16,
        background: "linear-gradient(180deg,#5A626C 0%,#343A42 100%)",
        border: "8px solid #14171C", boxShadow: SH_D }} />
      {[X0 + 40, X0 + 4 * TW + 3 * GAP - 40].map((hx, q) => (
        <div key={"hg" + q} style={{ position: "absolute", left: hx, top: -40, width: 9,
          height: 176, zIndex: 42,
          background: "repeating-linear-gradient(180deg,#8E96A2 0px,#8E96A2 9px,#4A515A 9px,#4A515A 16px)" }} />
      ))}
      {chars.map((c, i) => <Flap key={"fl" + i} i={i} ch={c} prev={prevs[i]} k={ks[i]} />)}
      <div style={{ position: "absolute", left: X0 - 20, top: 168 + TH + 16, zIndex: 46,
        width: 4 * TW + 3 * GAP + 40, height: 42, borderRadius: 7, background: "#14171C",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(25, 900), color: GOLD, letterSpacing: 5 }}>PER MONTH · PER SEAT</span>
      </div>
    </>
  );

  /* ⛔ SAME FIX AS THE OTHER TWO: one framing, no cut. The board hung in a
     close-up and then a CUT dropped us into the room. It is the same room in
     both; the only thing that changed was the lens, which is exactly the cut
     that buys nothing. */
  const sag = E(f, 0, 14, 2.0, 7.4, IN_Q);
  const jj = f < 16 ? Math.sin(f / 1.8) * sag : 0;
  const walk = E(f, 0, 34, 0, 1, OUT);
  const OXX = -260 + walk * 800;
  const run = 1 - walk;
  const stride = Math.max(0, Math.sin(f * 0.86));
  const gy = -stride * 26 * run;
  const come = E(f, 18, 40, 0, 1, OUT);
  const FL = [40, 50, 60];                          /* 200 -> 60 -> 20 -> 0 */
  const step = FL.filter(x => f >= x).length;
  const STATE = [["$", "2", "0", "0"], ["$", " ", "6", "0"],
                 ["$", " ", "2", "0"], ["$", " ", " ", "0"]];
  const chars = STATE[step], prevs = STATE[Math.max(0, step - 1)];
  const kAt = step > 0 ? E(f, FL[step - 1], FL[step - 1] + 6, 0, 1, IO) : 0;
  const ks = chars.map((c, i2) => (c !== prevs[i2] ? kAt : 0));
  const settle = E(f, 20, 46, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, 75, 1.11]} vig={0.28} glow={hexa(GOLD, 0.19)}>
      <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.16}
        rakeRate={5.0} lamp={{ x: 506, y: 206, r: 340 }} grit={0.8} rakeN={11} />
      <div style={{ position: "absolute", inset: 0, zIndex: 40, transformOrigin: "50% 0%",
        transform: `rotate(${Math.sin(f / 8.5) * 1.5 + (kAt > 0 && kAt < 1 ? Math.sin(kAt * Math.PI) * 2.6 : 0)}deg)
          translate(${jj}px, ${Math.sin(f / 6.2) * 5 + jj * 0.6 + (kAt > 0 && kAt < 1 ? Math.sin(kAt * Math.PI) * 16 : 0)}px)` }}>
        <Board chars={chars} prevs={prevs} ks={ks} />
      </div>
      {step > 0 && Array.from({ length: step * 3 }, (_, i2) => {
        const born = FL[Math.min(FL.length - 1, Math.floor(i2 / 3))] + 2;
        const tt = Math.min(1, Math.max(0, (f - born) / 20));
        if (tt <= 0) return null;
        return (
          <div key={"lf" + i2} style={{ position: "absolute", zIndex: 52,
            left: X0 + 96 + (i2 % 3) * 196 + tt * (86 - (i2 % 3) * 40) + Math.sin(tt * 7 + i2) * 24,
            top: 350 + tt * tt * 420, width: 70, height: 42, borderRadius: 5,
            background: "linear-gradient(180deg,#E4DCC6 0%,#B0A488 100%)",
            boxShadow: SH,
            transform: `rotate(${tt * (180 + i2 * 70)}deg)`,
            opacity: 1 - Math.max(0, (tt - 0.7) / 0.3) }} />
        );
      })}
      {/* ⭐ the claim plate leaves with its rail — frame-0 furniture */}
      <div style={{ position: "absolute", inset: 0, zIndex: 70,
        opacity: 1 - E(f, 14, 26, 0, 1, IO),
        transform: `translate(${E(f, 14, 28, 0, 250, IO)}px, ${E(f, 14, 28, 0, -300, IN_Q)}px) rotate(${E(f, 14, 28, 0, 22, IO)}deg)` }}>
        <ClaimPlate x={506} y={438} w={540} f={f} z={70} num={PLATE.num}
          line={PLATE.line} s={0.82} />
      </div>

      {/* THE ANIMAL, walking in under the number from frame 0 */}
      <Contact x={OXX} y={GY + 44} w={700 - stride * 140 * run} z={30}
        o={0.46 - stride * 0.2 * run} />
      <Ox x={OXX} y={GY + 44 + gy} s={1.46} z={56} f={f}
        charge={0.32 + run * 0.4 + settle * 0.14} strain={0.5 * run} rug={false} />
      {Array.from({ length: 12 }, (_, i2) => {
        const tt = ((f * 0.062) + i2 * 0.083) % 1;
        const side = i2 % 2;
        return (
          <div key={"stm" + i2} style={{ position: "absolute", zIndex: 50,
            left: OXX + 240 + side * 38 + tt * (92 + run * 54) + rnd(i2, 81) * 18,
            top: 654 + side * 12 + tt * (24 + run * 14) + gy,
            width: 20 + tt * 68, height: 18 + tt * 60, borderRadius: "50%",
            opacity: (1 - tt * tt) * 0.82 * (0.4 + run * 0.6),
            background: `radial-gradient(circle at 42% 38%, #FFFFFF 0%, ${hexa("#F4EFE2", 0.9)} 44%, ${hexa("#E4DCC8", 0)} 78%)` }} />
        );
      })}
      {[{ x: 132, s: 224, i: 3 }, { x: 902, s: 182, i: 9 }].map((c, q) => (
        <Crew key={"cb" + q} f={f} x={c.x - (1 - come) * (160 + q * 50)} y={GY + 74 + q * 10}
          i={c.i} size={c.s * (0.7 + come * 0.3)} z={66 + q} at={18 + q * 4}
          loop={q ? 3 : 2} cheer={step >= 2 ? 1 : 0} />
      ))}
    </Scene>
  );
};
