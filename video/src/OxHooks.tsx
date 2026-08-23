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
  const CUT = [0, 20, 42];
  const shot = CUT.filter(c => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ── SHOT A · the gate, close, and the strain CLIMBING ─────────────────── */
  if (shot === 0) {
    const load = E(lf, 0, 20, 1.4, 7.2, IN_Q);      /* ⭐ climbs — it is about to go */
    const j = Math.sin(lf / 1.9) * load;
    const boom = lf > 15 ? Math.sin((lf - 15) / 1.3) * (lf - 15) * 0.9 : 0;
    /* ⭐⭐ ALEX: *"have a claude sprite at the very beginning to lift the thing
       up."* Right — the gate was rising because a tween said so, which is
       §12's FLOAT: motion authored directly instead of as the OUTPUT of
       something. Now a Claude hauls a hoist chain, and the gate climbs BY THE
       HAUL — three pulls, 15px each, ratcheting. The cut to B is then a
       payoff rather than an event, and the plate bolted to the steel goes with
       it because it is bolted to the steel. */
    const hauls = Math.floor(lf / 6);
    const hp = (lf % 6) / 6;
    const pull = E(hp * 6, 0, 4, 0, 1, OUT);
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

  /* ── SHOT B · 700px of gate leaves, and the CAST comes through with it ──
     ⛔ ALEX: *"needs claude sprites like shown, and after the thing opens it's
     not good to just have that screen that says $0, it's too boring."* Right on
     both counts — the plate had done its job by then (it is a FRAME-0 finding,
     not a whole-hook one) and shot C was a card on a wide. The oxen now bring a
     crowd through with them, and the plate leaves WITH the gate it was bolted
     to instead of hanging around. THE-OPEN law 2: characters stop scrolls. */
  if (shot === 1) {
    const up = E(lf, 0, 22, 0, 1, IO);
    const come = E(lf, 4, 26, 0, 1, OUT);
    return (
      <Scene p={p} slug="" push={[0, 26, 1.11]} vig={0.28} glow={hexa(GOLD, 0.20)}>
        <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
          rakeRate={5.4} lamp={{ x: 506, y: 176, r: 300 }} grit={0.9} rakeN={7} />
        {/* the herd arriving through the gap */}
        {/* ⭐ THE MATCH — this ox ends the shot at x=776 s=1.62, which is
            exactly where shot C's ox starts. One animal, two shots. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 22, opacity: 0.42 }}>
          <Ox x={860 + come * 70} y={GY - 12} s={0.34} z={22} f={f} charge={0.4} rug={false} />
        </div>
        <Contact x={304 - (1 - come) * 380} y={GY + 44} w={700} z={30} o={0.44} />
        <Ox x={304 - (1 - come) * 380} y={GY + 44} s={1.62 * (0.58 + come * 0.42)}
          z={46} f={f} charge={0.85} strain={0.5} rug={false} />
        {/* ⭐ AND THE CAST, pouring through between them — costumes cycled
            deterministically, each on its own loop, running at camera */}
        {[{ x: 140, s: 188, i: 1 }, { x: 560, s: 150, i: 7 }].map((c, k) => (
          <Crew key={"cw" + k} f={f} x={c.x + (1 - come) * (180 + k * 40)}
            y={GY + 58 + (k % 2) * 14} i={c.i} size={c.s * (0.62 + come * 0.38)}
            z={52 + k} at={2 + k * 3} loop={k % 4} cheer={come > 0.6 ? 1 : 0} />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"dd" + i} style={{ position: "absolute", zIndex: 44,
            left: 40 + rnd(i, 21) * 920 - come * 120,
            top: 640 - Math.abs(Math.sin(i * 1.7)) * 260 * come,
            width: 44 + (i % 4) * 18, height: 38, borderRadius: "50%",
            background: hexa("#D8C49A", 0.34 * (1 - come * 0.5)) }} />
        ))}
        {/* ⭐ 700px OF STEEL, GOING — and the plate goes UP WITH IT. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: -up * 760, height: H + 60,
          zIndex: 70 }}>
          <div style={{ position: "absolute", inset: 0, background: "#606A76" }} />
          {Array.from({ length: 7 }, (_, i) => (
            <div key={"gb" + i} style={{ position: "absolute", left: -20, right: -20,
              top: i * 118, height: 54,
              background: `linear-gradient(180deg, #AEB8C2 0%, #7E868F 46%, #545C66 100%)`,
              borderTop: "5px solid #C6CED6" }} />
          ))}
          {[70, 500, 930].map((x, i) => (
            <div key={"gs" + i} style={{ position: "absolute", left: x - 17, top: -20, width: 34,
              height: H + 80, background: `linear-gradient(90deg, #96A0AA 0%, #545C66 100%)` }} />
          ))}
          <ClaimPlate x={506} y={196} w={660} f={f} z={72} num={PLATE.num} line={PLATE.line} />
        </div>
      </Scene>
    );
  }

  /* ── SHOT C · THE RANK. ───────────────────────────────────────────────────
     ⛔⛔ ALEX, on the version before this one: *"needs to be more interesting,
     more hierarchical scenes after the gate, it's just too much stuff, not
     hierarchical enough."* Counted: THREE oxen, FIVE cast, a carrier band, a
     mote field — eight subjects in one size band with no first place. That is
     [[feedback_hook_simplicity]]'s crowded frame exactly, and the standing
     definition from this reel is that HIERARCHICAL MEANS RANKED BY SIZE.

     So the payoff is now FOUR masses in THREE clearly stepped tiers:
       1st   ONE ox    697px wide — 69% of the panel, under the 85% silhouette
                       ceiling — travelling 320px in, carrying the name.
       2nd   ONE Claude 236px — 49% of the animal's height. The scale gap IS
                       the sentence; nothing has to be said.
       3rd   a PAIR of small cast, tucked TOGETHER so they read as one mass
                       rather than as two more scattered subjects.
       4th   one distant silhouette, dimmed, for depth only.
     ⭐ §hook-simplicity's trade-off, paid the way it says to pay it: stripping
     parts costs motion, so it is bought back with the SCALE of the one object
     travelling, never by putting props back. */
  const settle = E(lf, 0, 18, 0, 1, OUT);
  const walk = E(lf, 0, 14, 0, 1, IO);          /* settled early, so the brand
                                                   lands on a STILL flank */
  const surge = E(lf, 0, 20, 0, 1, IO);
  /* ⭐⭐ ALEX: *"a claude sprite at 2 seconds, showing FREE in some idiom way."*
     The idiom this world already owns is BRANDING — what you do to cattle is
     press a hot iron to the flank and leave a mark that does not come off. So
     the second Claude walks an iron in and burns FREE onto the animal. It is
     the one way to say the word that needs no translation
     ([[feedback_too_fast_is_a_part_count]]: pick the picture that needs no
     decoding), and it costs no hierarchy — the mark rides tier 1 rather than
     becoming a fifth subject. */
  const press = E(lf, 12, 20, 0, 1, IO);
  const burn = E(lf, 19, 27, 0, 1, OUT);
  const sizz = E(lf, 19, 33, 0, 1, LIN);
  const hit = lf < 19 ? 0 : E(lf, 19, 26, 1, 0, OUT);   /* the flash + jolt */
  const jx = Math.sin(lf * 2.6) * 11 * hit;
  const jy = -Math.abs(Math.sin(lf * 3.3)) * 7 * hit;
  const OXY = GY + 44;
  const OXX = 540;
  return (
    <Scene p={p} slug="" push={[0, 25, 1.09]} vig={0.30} glow={hexa(p.key, 0.18)}>
      <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
        rakeRate={5.6} lamp={{ x: 470, y: 180, r: 320 }} grit={0.9} rakeN={7} />

      <RunBand y={96} f={f} z={22} rate={6.4} h={13} c={STEEL} hang
        loads={["#4A5058", "#3E444C", "#5A6068", "#3E444C"]} pitch={168} loadW={78} loadH={56} />

      {/* ⭐ THE RAILS the gate went up — structure, not subject. They answer the
          bare upper wall without adding a fifth thing to look at, and they weld
          this shot to the one before it: that is the gate you just opened. */}
      {[70, 500, 930].map((x, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: x - 15, top: 0, width: 30,
          height: GY + 40, zIndex: 18,
          background: `linear-gradient(90deg, #9AA4AE 0%, #58606A 62%, #414851 100%)`,
          boxShadow: "0 0 0 3px rgba(20,23,28,0.34)" }} />
      ))}
      {/* and the steel still creeping up out of frame overhead */}
      <div style={{ position: "absolute", left: -20, right: -20, top: -712 - settle * 30,
        height: 780, zIndex: 66, background: "#606A76",
        boxShadow: "0 16px 30px rgba(16,18,22,0.42)" }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"gc" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 118,
            height: 54, background: `linear-gradient(180deg, #AEB8C2 0%, #7E868F 46%, #545C66 100%)`,
            borderTop: "5px solid #C6CED6" }} />
        ))}
      </div>

      {/* 4th · depth only, held down so it never competes */}
      <div style={{ position: "absolute", inset: 0, zIndex: 22, opacity: 0.42 }}>
        <Ox x={906 + walk * 40} y={GY - 12} s={0.34} z={22} f={f} charge={0.22} rug={false} />
      </div>

      {/* 1st · THE ANIMAL. 697px of dark mass walking into a lit room. */}
      <Contact x={OXX - (1 - walk) * 236} y={OXY} w={700} z={30} o={0.46} />
      <Ox x={OXX - (1 - walk) * 236 + jx} y={OXY + jy} s={1.62} z={46} f={f}
        charge={0.34 + settle * 0.26 + hit * 0.42} strain={0.22 * (1 - settle)} rug={false} />

      {/* 2nd · ONE of the cast, front, cropped by the floor. The scale gap —
          and the one holding the iron. */}
      <Hero f={f} x={196} y={GY + 40} size={244} z={68} act={1} ph={1.2}
        strain={press * 0.62} reach={132} gaze={0.5} cheer={burn > 0.5 ? 1 : 0} />

      {/* ⭐ THE IRON — shaft, handle loop, hot head, and heat coming off it. */}
      <div style={{ position: "absolute", left: 258 + press * 42, top: 636 - press * 30,
        width: 168, height: 22, zIndex: 70, transformOrigin: "0% 50%",
        opacity: E(lf, 6, 11, 0, 1, OUT),
        transform: `rotate(${-22 + press * 4}deg)` }}>
        <div style={{ position: "absolute", left: 26, top: 4, right: 30, height: 14,
          borderRadius: 4, boxShadow: SH,
          background: "linear-gradient(180deg,#8E96A2 0%,#4A515A 54%,#2A2F36 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 34, height: 22,
          borderRadius: 11, border: "6px solid #3A414A", background: "transparent" }} />
        <div style={{ position: "absolute", right: 0, top: -7, width: 34, height: 36,
          borderRadius: 6,
          boxShadow: `0 0 ${press * 40 + hit * 30}px ${hexa("#FF8A3C", 0.4 + press * 0.5)}`,
          background: press < 0.06
            ? "linear-gradient(150deg,#8E96A2 0%,#4A515A 54%,#2A2F36 100%)"
            : `linear-gradient(150deg,${mxh("#FF8A3C", press * 0.55)} 0%,#FF8A3C ${46 * press}%,#7A3312 100%)` }} />
      </div>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"hz" + i} style={{ position: "absolute", zIndex: 71,
          left: 430 + press * 42 + rnd(i, 61) * 54,
          top: 552 - sizz * (40 + rnd(i, 62) * 90),
          width: 12 + (i % 3) * 7, height: 12 + (i % 3) * 7, borderRadius: "50%",
          opacity: (1 - sizz) * 0.8 * press,
          background: hexa(i % 2 ? "#EDE7D6" : "#FF8A3C", 0.42) }} />
      ))}

      {/* ⭐ AND THE MARK ITSELF — bright on a dark hide, which is the side of
          the contrast a silhouette has to be on to read at all. */}
      {/* the WHITE-HOT FLASH at contact — blows out, then decays to ember */}
      <div style={{ position: "absolute", left: 470 - 190, top: 556 - 190, width: 380,
        height: 380, zIndex: 58, opacity: hit * 0.92, pointerEvents: "none",
        borderRadius: "50%", transform: `scale(${0.5 + (1 - hit) * 0.9})`,
        background: `radial-gradient(circle, #FFFFFF 0%, ${hexa("#FFD9A0", 0.85)} 26%, ${hexa("#FF8A3C", 0.42)} 52%, transparent 72%)` }} />
      {/* SPARKS off the contact point */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2 + 0.4;
        const d = sizz * (70 + rnd(i, 71) * 190);
        return (
          <div key={"sk" + i} style={{ position: "absolute", zIndex: 72,
            left: 470 + Math.cos(a) * d, top: 556 + Math.sin(a) * d * 0.72 + sizz * sizz * 90,
            width: 9 + (i % 3) * 5, height: 9 + (i % 3) * 5, borderRadius: "50%",
            opacity: (1 - sizz) * 0.95,
            background: i % 3 ? "#FFD9A0" : "#FF8A3C",
            boxShadow: `0 0 12px ${hexa("#FF8A3C", 0.8)}` }} />
        );
      })}
      {/* ⭐ AND THE MARK — the WHOLE flank now. The name plate is the body's
          job; in the hook the animal carries ONE word, at 128px. */}
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

      <Puff x={OXX + (1 - walk) * 236} y={OXY + 10} f={f} at={1} c={hexa("#D8C49A", 0.66)} />
      <Ring x={OXX} y={OXY - 150} f={f} at={4} c={p.key} />
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
  const CUT = [0, 22, 48];
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
    const load = E(lf, 0, 22, 1.0, 8.0, IN_Q);
    const t = Math.sin(lf / 1.7) * load;
    return (
      <Scene p={p} slug="" push={[0, 22, 1.09]} vig={0.30} glow={hexa(RED, 0.18)}>
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

  /* ── SHOT B · the ox goes through it and the wall detonates ────────────── */
  if (shot === 1) {
    const k = E(lf, 0, 24, 0, 1, IN_Q);
    const oxX = -260 + k * 1180;
    return (
      <Scene p={p} slug="" push={[0, 26, 1.12]} vig={0.26} glow={hexa(GOLD, 0.22)}>
        <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
          rakeRate={5.6} lamp={{ x: 506, y: 176, r: 300 }} grit={0.9} rakeN={7} />
        {/* thirty pieces of it going in every direction */}
        {Array.from({ length: 26 }, (_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const d = k * (260 + rnd(i, 41) * 620);
          return (
            <div key={"db" + i} style={{ position: "absolute", zIndex: 50,
              left: 470 + Math.cos(a) * d * 1.25,
              top: 380 + Math.sin(a) * d * 0.85 + k * k * 220,
              transform: `rotate(${k * (200 + rnd(i, 42) * 500)}deg)`,
              opacity: 1 - Math.max(0, (k - 0.7) / 0.3) }}>
              <Slab i={i} x={0} y={0} s={0.34 + rnd(i, 43) * 0.34} />
            </div>
          );
        })}
        {/* the ox, straight through, left to right */}
        <div style={{ position: "absolute", inset: 0, zIndex: 62 }}>
          <Ox x={oxX} y={GY + 30} s={1.24} z={62} f={f} charge={1} strain={0.85}
            name={R.model.name} />
        </div>
        <Contact x={oxX} y={GY + 30} w={520} z={30} o={0.50} />
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"dz" + i} style={{ position: "absolute", zIndex: 40,
            left: oxX - 300 + i * 44, top: 690 - Math.abs(Math.sin(i * 1.6)) * 90,
            width: 52 + (i % 3) * 20, height: 44, borderRadius: "50%",
            background: hexa("#D8C49A", 0.30) }} />
        ))}
        <div style={{ position: "absolute", inset: 0, zIndex: 76,
          transform: `translateY(${-k * 34}px)` }}>
          <ClaimPlate x={506} y={196} w={640} f={f} z={76} num={PLATE.num} line={PLATE.line} />
        </div>
      </Scene>
    );
  }

  /* ── SHOT C · wide, the last of it falling, the plate standing ─────────── */
  const fall = E(lf, 0, 22, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, 27, 1.10]} vig={0.28} glow={hexa(p.key, 0.18)}>
      <Hall p={p} f={f} dx={0} overhead="truss" bands={3} kind="bay" rake={0.15}
        rakeRate={5.0} lamp={{ x: 640, y: 180, r: 300 }} grit={0.8} rakeN={7} />
      <RunBand y={118} f={f} z={22} rate={5.4} h={13} c={STEEL} hang
        loads={["#4A5058", "#3E444C", "#5A6068", "#3E444C"]} pitch={172} loadW={76} loadH={54} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"fb" + i} style={{ position: "absolute", zIndex: 44,
          left: 90 + i * 104, top: 120 + fall * (420 + rnd(i, 51) * 240),
          transform: `rotate(${fall * (160 + rnd(i, 52) * 320)}deg)`,
          opacity: 1 - fall * 0.55 }}>
          <Slab i={i} x={0} y={0} s={0.30} />
        </div>
      ))}
      {/* the wreckage on the floor */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"wr" + i} style={{ position: "absolute", zIndex: 34,
          left: 120 + i * 118, top: 690 - (i % 2) * 14, width: 96, height: 26, borderRadius: 4,
          background: dkh("#3A3F46", 0.20), transform: `rotate(${(i % 2 ? 1 : -1) * 5}deg)` }} />
      ))}
      <div style={{ position: "absolute", inset: 0, zIndex: 60 }}>
        <Ox x={694} y={GY + 30} s={1.10} z={60} f={f} charge={0.34} flip name={R.model.name} />
      </div>
      <Contact x={694} y={GY + 30} w={470} z={30} o={0.48} />
      <ClaimPlate x={340} y={188} w={600} f={f} z={78} num={PLATE.num} line={PLATE.line} />
      <Hero f={f} x={122} y={748} size={144} z={80} act={2} ph={0.4}
        cheer={0.8} costume={{ constr: 1 }} />
      <Contact x={122} y={748} w={108} z={19} o={0.42} />
    </Scene>
  );
};
