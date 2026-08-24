import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Mark, Chip, Contact, Motes, R, asPlace, mono, ui, Ring, Puff, Pool,
  Crew, Hero, costumeFor, squash,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, TEAL, STEEL, BRASS, VIOLET, SLATE,
} from "./OxWorld";
import { Ox, ModelCore, RunBand, Crate, ClaimPlate, Chain } from "./OxProps";
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
   A · THE PEN GATE — mechanism `BURST`.
     shot A  0-24   CLOSE on a steel pen gate filling the frame, the plate
                    bolted to it, JUDDERING harder and harder. Something is
                    leaning on the far side and dust is coming through the bars.
     shot B  24-50  the gate GOES — 700px of steel up and out in 0.85s — and the
                    herd comes through it at camera.
     shot C  50-75  wide. They are through, the nearest cropped by the frame.
   ------------------------------------------------------------------------- */
export const HookGate: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  const CUT = [0, 16];
  const shot = CUT.filter(c => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ── SHOT A · the gate, close, and the strain CLIMBING ─────────────────── */
  if (shot === 0) {
    const load = E(lf, 0, 16, 1.4, 7.2, IN_Q);      /* ⭐ climbs — it is about to go */
    const j = Math.sin(lf / 1.9) * load;
    const boom = lf > 12 ? Math.sin((lf - 12) / 1.3) * (lf - 12) * 0.9 : 0;
    /* ⭐⭐ ALEX: *"have a claude sprite at the very beginning to lift the thing
       up."* Right — the gate was rising because a tween said so, which is
       §12's FLOAT: motion authored directly instead of as the OUTPUT of
       something. Now a Claude hauls a hoist chain, and the gate climbs BY THE
       HAUL — three pulls, 15px each, ratcheting. The cut to B is then a
       payoff rather than an event, and the plate bolted to the steel goes with
       it because it is bolted to the steel. */
    const hauls = Math.floor(lf / 5);
    const hp = (lf % 5) / 5;
    const pull = E(hp * 5, 0, 3.4, 0, 1, OUT);
    const lift = (hauls + pull) * 22;
    const grip = 540 + pull * 110;
    return (
      <Scene p={p} slug="" push={[0, 24, 1.09]} vig={0.30} glow={hexa(GOLD, 0.22)}>
        {/* the steel, close enough to read the bar spacing */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, background: "#606A76" }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"br" + i} style={{ position: "absolute", left: -20, right: -20,
            top: i * 118 + j * 0.5 - lift, height: 54, zIndex: 21,
            background: `linear-gradient(180deg, #AEB8C2 0%, #7E868F 46%, #545C66 100%)`,
            borderTop: "5px solid #C6CED6" }} />
        ))}
        {[70, 500, 930].map((x, i) => (
          <div key={"st" + i} style={{ position: "absolute", left: x - 17, top: -20, width: 34,
            height: H + 40, zIndex: 22, background: `linear-gradient(90deg, #96A0AA 0%, #545C66 100%)` }} />
        ))}
        {/* dust forced through the bars from the far side */}
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"dz" + i} style={{ position: "absolute", zIndex: 26,
            left: 60 + rnd(i, 11) * 880, top: 60 + rnd(i, 12) * 660,
            width: 26 + rnd(i, 13) * 40, height: 24, borderRadius: "50%",
            background: hexa("#D8C49A", 0.10 + (load / 7.2) * 0.24) }} />
        ))}
        {/* ⭐⭐ THE WINCH. ⛔ v1 was a hoist chain that came down at x=162 and
            TERMINATED ON THE CLAUDE'S FACE with both arms hanging at its sides
            — §11's "read the rig before drawing geometry" for the third time on
            this hook. A front-facing box mascot cannot grip an overhead chain.
            It CAN stand at a wheel, because the wheel comes to the arm.
            ⛔ v2 kept a chain and had to route it around a 660px plate, so it
            was invisible behind it. Cut. The RATCHET is the tell instead: teeth
            on the rim, a pawl dropping into each one, and the gate climbing 15px
            per click — the gate now rises BY the mechanism, not beside it.
            ⛔ And a filled disc reads as a fan, not a wheel. The web is open so
            the steel shows through between the spokes. */}
        <div style={{ position: "absolute", left: 368 - 104, top: 646 - 104, width: 208,
          height: 208, zIndex: 54,
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
          {/* the knob — with a symmetric rim this is the only rotation tell */}
          <div style={{ position: "absolute", left: 170, top: 88, width: 42, height: 42,
            borderRadius: "50%", boxShadow: SH,
            background: "linear-gradient(160deg,#D9A441 0%,#8A6520 100%)" }} />
        </div>
        {/* the PAWL — rides up the tooth face and drops into the next one */}
        <div style={{ position: "absolute", left: 470, top: 618, width: 96,
          height: 26, zIndex: 56, transformOrigin: "100% 50%",
          transform: `rotate(${8 - pull * 17}deg)`,
          borderRadius: 6, boxShadow: SH,
          background: "linear-gradient(180deg,#B8C0C8 0%,#69727C 62%,#3E444C 100%)" }} />

        <Hero f={f} x={178} y={750 + pull * 18} size={266} z={58} act={1}
          strain={0.32 + Math.sin(pull * Math.PI) * 0.54} reach={126}
          costume={{ constr: 1 }} gaze={0.45} />
        {/* effort reads off the STILLEST part of the hero (§11) */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"ef" + i} style={{ position: "absolute", zIndex: 59,
            left: 120 + rnd(i, 41) * 140, top: 502 - pull * 58 - rnd(i, 42) * 38,
            width: 13 + (i % 3) * 5, height: 13 + (i % 3) * 5, borderRadius: "50%",
            background: hexa("#EDE7D6", 0.30 + pull * 0.34) }} />
        ))}

        {/* THE PLATE, bolted on, juddering with it — and RISING with it */}
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `translate(${j}px, ${j * 0.6 + boom - lift}px) rotate(${j * 0.07}deg)` }}>
          <ClaimPlate x={506} y={196} w={660} f={f} z={60} num={PLATE.num} line={PLATE.line} />
        </div>
        {[228, 784].map((x, i) => (
          <div key={"bo" + i} style={{ position: "absolute", left: x, top: 214 + j * 0.6 - lift,
            width: 30, height: 30, borderRadius: "50%", zIndex: 62, background: "#20242A",
            border: "5px solid #8E96A2" }} />
        ))}
      </Scene>
    );
  }

  /* ── SHOT B · ONE CONTINUOUS TAKE, gate to brand. ────────────────────────
     ⛔⛔ ALEX: *"there's still a cut at around 1 second after the thing lifts
     up when it should just be all one continuous shot, not a random cut."*
     Correct, and it was the last thing left over from the AGENCY structure I
     copied — three hard cuts in 2.5s. That rule earns its motion when each cut
     shows you something NEW. The B/C cut showed the same room from the same
     angle a beat later, so it was not a cut, it was an interruption. Two shots
     now: the close on the gate, then EVERYTHING ELSE in one 55-frame take —
     the steel goes, the animal walks the whole width, the iron comes in and the
     brand lands, camera locked, no join to notice. */
  const up = E(lf, 0, 12, 0, 1, IO);            /* the steel is GONE in 0.4s */
  const come = E(lf, 2, 20, 0, 1, OUT);
  const settle = E(lf, 0, 26, 0, 1, OUT);
  /* ⭐⭐ IT GALLOPS. ⛔ `IO` easing gave a smooth glide in and out — a float,
     not an animal. `OUT` starts at full speed and DECELERATES, which is what
     something arriving and pulling up actually does. The stride rides on top:
     a 4-frame cycle lifting the body 30px, dying to zero as it stops, with the
     contact shadow shrinking under it every time it leaves the ground. The
     scale never changes — a locked side-on camera and a subject moving
     parallel to it never would. */
  const walk = E(lf, 3, 26, 0, 1, OUT);
  const OXX = -120 + walk * 660;
  const run = 1 - walk;
  const stride = Math.max(0, Math.sin(lf * 0.86));
  const gy = -stride * 30 * run;
  const lean = Math.cos(lf * 0.86) * 0.26 * run;
  const press = E(lf, 34, 42, 0, 1, IO);
  const hit = lf < 41 ? 0 : E(lf, 41, 49, 1, 0, OUT);
  const burn = E(lf, 41, 50, 0, 1, OUT);
  const sizz = E(lf, 41, 56, 0, 1, LIN);
  const jx = Math.sin(lf * 2.6) * 11 * hit;
  const jy = -Math.abs(Math.sin(lf * 3.3)) * 7 * hit;

  return (
    <Scene p={p} slug="" push={[0, 55, 1.12]} vig={0.29} glow={hexa(p.key, 0.19)}>
      <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
        rakeRate={5.6} lamp={{ x: 470, y: 180, r: 320 }} grit={0.9} rakeN={7} />
      <RunBand y={96} f={f} z={22} rate={6.4} h={13} c={STEEL} hang
        loads={["#4A5058", "#3E444C", "#5A6068", "#3E444C"]} pitch={168} loadW={78} loadH={56} />

      {/* the rails the gate runs up — structure, and the reason the upper wall
          is not 280px of flat pale grey */}
      {[70, 500, 930].map((x, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: x - 15, top: 0, width: 30,
          height: GY + 40, zIndex: 18,
          background: `linear-gradient(90deg, #9AA4AE 0%, #58606A 62%, #414851 100%)`,
          boxShadow: "0 0 0 3px rgba(20,23,28,0.34)" }} />
      ))}

      {/* 4th · depth only, held down so it never competes */}
      <div style={{ position: "absolute", inset: 0, zIndex: 22, opacity: 0.42 }}>
        <Ox x={906 + walk * 40} y={GY - 12} s={0.34} z={22} f={f} charge={0.28} rug={false} />
      </div>

      {/* 3rd · one of the cast, IN FRONT of the animal's front legs — the only
          readable place left once tier 1 owns x 192..889 */}
      <Crew f={f} x={706 - (1 - come) * 180} y={GY + 30} i={9} size={142} z={72}
        at={4} loop={2} cheer={1} />

      {/* 1st · THE ANIMAL, walking the full width of the panel in one move */}
      <Contact x={OXX} y={GY + 44} w={700 - stride * 150 * run} z={30}
        o={0.46 - stride * 0.22 * run} />
      <Ox x={OXX + jx} y={GY + 44 + jy + gy} s={1.62} z={46} f={f}
        charge={0.34 + run * 0.44 + lean + settle * 0.14 + hit * 0.42}
        strain={0.55 * run} rug={false} />

      {/* ⭐ THE STEAM. Two jets off the muzzle, each puff on its own phase of a
          repeating cycle — ⛔ never off a PLATEAUING value, or the last puff
          freezes on screen the moment the animal stops. It thins when it pulls
          up but never stops: the thing is still breathing. */}
      {Array.from({ length: 16 }, (_, i) => {
        const t = ((lf * 0.058) + i * 0.0625) % 1;
        const side = i % 2;
        return (
          <div key={"stm" + i} style={{ position: "absolute", zIndex: 50,
            left: OXX + 246 + side * 40 + t * (96 + run * 58) + rnd(i, 81) * 18,
            top: 640 + side * 12 + t * (26 + run * 14) + jy + gy,
            width: 22 + t * 74, height: 20 + t * 66, borderRadius: "50%",
            opacity: (1 - t * t) * 0.86 * (0.42 + run * 0.58),
            background: `radial-gradient(circle at 42% 38%, #FFFFFF 0%, ${hexa("#F4EFE2", 0.92)} 44%, ${hexa("#E4DCC8", 0.0)} 78%)` }} />
        );
      })}
      {/* the ground it kicks up — spawned on the same stride cycle */}
      {Array.from({ length: 9 }, (_, i) => {
        const t = ((lf * 0.07) + i * 0.111) % 1;
        return (
          <div key={"hd" + i} style={{ position: "absolute", zIndex: 34,
            left: OXX - 210 - t * 240 + rnd(i, 91) * 96,
            top: GY + 34 - t * 76 - rnd(i, 92) * 30,
            width: 44 + t * 92, height: 38 + t * 76, borderRadius: "50%",
            opacity: (1 - t) * 0.82 * run,
            background: `radial-gradient(circle at 44% 40%, ${hexa("#EFE4C8", 0.95)} 0%, ${hexa("#D8C49A", 0.72)} 50%, ${hexa("#D8C49A", 0.0)} 80%)` }} />
        );
      })}

      {/* 2nd · the brander. 49% of the animal's height — the scale gap IS the
          sentence, and it is the same body that walks in and does the work. */}
      <Hero f={f} x={196 - (1 - come) * 210} y={GY + 40} size={244} z={68} act={1} ph={1.2}
        strain={press * 0.62} reach={132} gaze={0.5} cheer={burn > 0.5 ? 1 : 0} />

      {/* ⭐⭐ THE IRON — comically oversized, and HELD UP for a second before
          it lands. ⛔ v1 was a 168px stick with a 34px head that appeared 4
          frames before the press: by the time you noticed it, it had already
          fired. It now swings from nearly vertical (-84deg, head high and LEFT
          of the animal, clear of the flank the brand is going onto) down to
          -16deg at the press.
          ⭐ And the die carries the word. You READ "FREE" on the face of the
          thing a second before it burns it on, so the payoff is set up rather
          than sprung — and the head counter-rotates 0.86 of the shaft angle so
          the letters stay readable through the whole swing. */}
      {(() => {
        /* ⛔ v2 parked the die ON TOP of the brand it had just burned. It pulls
           back up and left the moment the mark is made. */
        const back = E(lf, 44, 51, 0, 1, OUT);
        const ang = -84 + press * 68 - back * 34;
        const heat = press < 0.06 ? 0 : press;
        return (
          <div style={{ position: "absolute", left: 196 + press * 28 - back * 52,
            top: 656 - press * 18 + back * 14,
            width: 250, height: 26, zIndex: 70, transformOrigin: "0% 50%",
            opacity: E(lf, 8, 16, 0, 1, OUT) * (1 - back),
            transform: `rotate(${ang}deg)` }}>
            {/* the handle loop */}
            <div style={{ position: "absolute", left: -6, top: -6, width: 44, height: 38,
              borderRadius: 19, border: "8px solid #3A414A", background: "transparent" }} />
            {/* the shaft */}
            <div style={{ position: "absolute", left: 30, top: 5, right: 24, height: 16,
              borderRadius: 5, boxShadow: SH,
              background: "linear-gradient(180deg,#8E96A2 0%,#4A515A 54%,#2A2F36 100%)" }} />
            {/* THE DIE — counter-rotated so the word stays legible */}
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
              {/* the heat coming off the die once it is hot */}
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
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"hz" + i} style={{ position: "absolute", zIndex: 71,
          left: 430 + press * 42 + rnd(i, 61) * 54,
          top: 552 - sizz * (40 + rnd(i, 62) * 90),
          width: 12 + (i % 3) * 7, height: 12 + (i % 3) * 7, borderRadius: "50%",
          opacity: lf < 41 ? 0 : (1 - sizz) * 0.8 * press,
          background: hexa(i % 2 ? "#EDE7D6" : "#FF8A3C", 0.42) }} />
      ))}

      {/* the WHITE-HOT FLASH at contact */}
      <div style={{ position: "absolute", left: 470 - 190, top: 556 - 190, width: 380,
        height: 380, zIndex: 58, opacity: hit * 0.92, pointerEvents: "none",
        borderRadius: "50%", transform: `scale(${0.5 + (1 - hit) * 0.9})`,
        background: `radial-gradient(circle, #FFFFFF 0%, ${hexa("#FFD9A0", 0.85)} 26%, ${hexa("#FF8A3C", 0.42)} 52%, transparent 72%)` }} />
      {Array.from({ length: 16 }, (_, i) => {
        const ang = (i / 16) * Math.PI * 2 + 0.4;
        const d = sizz * (70 + rnd(i, 71) * 190);
        return (
          <div key={"sk" + i} style={{ position: "absolute", zIndex: 72,
            left: 470 + Math.cos(ang) * d, top: 556 + Math.sin(ang) * d * 0.72 + sizz * sizz * 90,
            width: 9 + (i % 3) * 5, height: 9 + (i % 3) * 5, borderRadius: "50%",
            opacity: lf < 41 ? 0 : (1 - sizz) * 0.95,
            background: i % 3 ? "#FFD9A0" : "#FF8A3C",
            boxShadow: `0 0 12px ${hexa("#FF8A3C", 0.8)}` }} />
        );
      })}

      {/* ⭐ THE MARK — the whole flank, 128px, one word */}
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

      {/* the dust the gate pulls up with it */}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"dd" + i} style={{ position: "absolute", zIndex: 44,
          left: 40 + rnd(i, 21) * 920 - come * 120,
          top: 640 - Math.abs(Math.sin(i * 1.7)) * 260 * come,
          width: 44 + (i % 4) * 18, height: 38, borderRadius: "50%",
          background: hexa("#D8C49A", 0.34 * (1 - come * 0.5)) }} />
      ))}
      <Motes x={70} y={186} w={520} h={232} n={16} f={f} />

      {/* ⭐ 700px OF STEEL, GOING — and the plate goes UP WITH IT, because it
          is bolted to it. After it clears, its rails keep running the room. */}
      <div style={{ position: "absolute", left: -20, right: -20, top: -up * 772 - settle * 24,
        height: H + 60, zIndex: 84 }}>
        <div style={{ position: "absolute", inset: 0, background: "#606A76" }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"gb" + i} style={{ position: "absolute", left: 0, right: 0,
            top: i * 118, height: 54,
            background: `linear-gradient(180deg, #AEB8C2 0%, #7E868F 46%, #545C66 100%)`,
            borderTop: "5px solid #C6CED6" }} />
        ))}
        <ClaimPlate x={506} y={196} w={660} f={f} z={72} num={PLATE.num} line={PLATE.line} />
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
  const CUT = [0, 16];
  const shot = CUT.filter(c => f >= c).length - 1;
  const lf = f - CUT[shot];
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

  /* ── SHOT A · the wall, close, trembling harder ────────────────────────── */
  if (shot === 0) {
    const load = E(lf, 0, 16, 1.0, 8.0, IN_Q);
    const t = Math.sin(lf / 1.7) * load;
    return (
      <Scene p={p} slug="" push={[0, 16, 1.08]} vig={0.30} glow={hexa(RED, 0.18)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 18, background: "#5A626C" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 20,
          transform: `translate(${t}px, ${t * 0.5}px)` }}>
          {Array.from({ length: 12 }, (_, i) => (
            <Slab key={"sl" + i} i={i} x={-40 + (i % 4) * 210 + (Math.floor(i / 4) % 2) * 60}
              y={106 + Math.floor(i / 4) * 158} s={1.14} />
          ))}
        </div>
        {/* grit shaken loose */}
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"gz" + i} style={{ position: "absolute", zIndex: 30,
            left: 40 + rnd(i, 31) * 920, top: 40 + ((lf * 5 + i * 47) % 700),
            width: 12 + rnd(i, 32) * 12, height: 12, borderRadius: 3,
            background: hexa("#8E96A2", 0.30 + (load / 8) * 0.3) }} />
        ))}
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `translate(${t * 1.2}px, ${t * 0.7}px) rotate(${t * 0.06}deg)` }}>
          <ClaimPlate x={506} y={214} w={640} f={f} z={60} num={PLATE.num} line={PLATE.line} />
        </div>
      </Scene>
    );
  }

  /* ── SHOT B · ONE CONTINUOUS TAKE. The wall detonates, the animal lands,
     and then THE PRICE FALLS ON EVERYTHING LEFT STANDING. ───────────────────
     ⛔ v1 of this hook was three shots with the $0 plate centred and huge in
     every one of them — hold 46%, and the exact note Alex has already given
     twice: *"way too boring and it's just a big plain simple card."* The plate
     is bolted to the WALL here, so when the wall goes, it goes: it is frame-0
     furniture and it leaves with the thing it was screwed to.
     ⭐ The payoff is a different MECHANISM from the gate cut's. That one is a
     BRAND (a mark burned onto one animal). This one is a CASCADE: the five
     slabs still on the back wall flip their red PAID tags to $0, one after
     another, after the animal has already gone through. */
  const k = E(lf, 0, 20, 0, 1, IN_Q);
  const settle = E(lf, 18, 34, 0, 1, OUT);
  const oxX = -320 + k * 860;
  const come = E(lf, 6, 26, 0, 1, OUT);
  const RACK = [88, 268, 470, 676, 878];
  return (
    <Scene p={p} slug="" push={[0, 58, 1.11]} vig={0.27} glow={hexa(GOLD, 0.21)}>
      <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
        rakeRate={5.6} lamp={{ x: 506, y: 176, r: 300 }} grit={0.9} rakeN={7} />

      {/* what is LEFT of the wall — and what happens to its prices */}
      {RACK.map((rx, i) => {
        const flip = E(lf, 28 + i * 5, 37 + i * 5, 0, 1, OUT);
        return (
          <div key={"rk" + i} style={{ position: "absolute", left: rx - 62, top: 214,
            width: 124, height: 82, zIndex: 26,
            transform: `rotate(${Math.sin(i * 2.1) * 2.4}deg)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 8,
              background: "linear-gradient(164deg,#8E98A2 0%,#4A515A 100%)",
              border: "4px solid #14171C" }} />
            <div style={{ position: "absolute", left: 9, top: 10, width: 62, height: 62,
              borderRadius: 11, background: "#FFFFFF", display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${MARKS[i % MARKS.length]}`)}
                style={{ width: 44, height: 44, objectFit: "contain" }} />
            </div>
            {/* the tag turns over: PAID on one face, $0 on the other */}
            <div style={{ position: "absolute", left: 76, top: 24, width: 40, height: 34,
              transformStyle: "preserve-3d",
              transform: `rotateX(${flip * 180}deg)` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: RED,
                backfaceVisibility: "hidden", display: "flex", alignItems: "center",
                justifyContent: "center" }}>
                <span style={{ ...mono(13, 900), color: "#2A0A06" }}>PAID</span>
              </div>
              <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: "#EDE7D6",
                backfaceVisibility: "hidden", transform: "rotateX(180deg)",
                boxShadow: `0 0 ${flip * 22}px ${hexa(GOLD, 0.7)}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...mono(17, 900), color: "#2A1D06" }}>$0</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* the wall going in every direction — the PLATE among the pieces */}
      {Array.from({ length: 24 }, (_, i) => {
        const a2 = (i / 24) * Math.PI * 2;
        const d = k * (280 + rnd(i, 41) * 640);
        return (
          <div key={"db" + i} style={{ position: "absolute", zIndex: 50,
            left: 430 + Math.cos(a2) * d * 1.3,
            top: 360 + Math.sin(a2) * d * 0.86 + k * k * 260,
            transform: `rotate(${k * (200 + rnd(i, 42) * 520)}deg)`,
            opacity: 1 - Math.max(0, (k - 0.62) / 0.38) }}>
            <Slab i={i} x={0} y={0} s={0.32 + rnd(i, 43) * 0.36} />
          </div>
        );
      })}
      <div style={{ position: "absolute", inset: 0, zIndex: 74,
        opacity: 1 - Math.max(0, (k - 0.34) / 0.30),
        transform: `translate(${k * 210}px, ${-k * 150 + k * k * 420}px) rotate(${k * 34}deg)` }}>
        <ClaimPlate x={506} y={196} w={640} f={f} z={74} num={PLATE.num} line={PLATE.line} />
      </div>

      {/* the cast, through the hole it made */}
      {[{ x: 150, s: 176, i: 1 }, { x: 806, s: 148, i: 7 }].map((c, q) => (
        <Crew key={"cw" + q} f={f} x={c.x - (1 - come) * (200 + q * 60)} y={GY + 54 + q * 12}
          i={c.i} size={c.s * (0.66 + come * 0.34)} z={64 + q} at={6 + q * 4}
          loop={q ? 3 : 2} cheer={come > 0.6 ? 1 : 0} />
      ))}

      {/* THE ANIMAL, straight through it */}
      <Contact x={oxX} y={GY + 34} w={620} z={30} o={0.50} />
      <Ox x={oxX} y={GY + 34} s={1.42} z={62} f={f}
        charge={1 - settle * 0.42} strain={0.9 * (1 - settle)} rug={false} />
      {Array.from({ length: 12 }, (_, i) => {
        const t = ((lf * 0.07) + i * 0.083) % 1;
        return (
          <div key={"dz" + i} style={{ position: "absolute", zIndex: 40,
            left: oxX - 240 - t * 200 + rnd(i, 91) * 90,
            top: GY + 24 - t * 70 - rnd(i, 92) * 26,
            width: 42 + t * 86, height: 36 + t * 70, borderRadius: "50%",
            opacity: (1 - t) * 0.72 * (1 - settle * 0.5),
            background: `radial-gradient(circle at 44% 40%, ${hexa("#EFE4C8", 0.95)} 0%, ${hexa("#D8C49A", 0.7)} 50%, ${hexa("#D8C49A", 0)} 80%)` }} />
        );
      })}
    </Scene>
  );
};
