import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Plate, BigNum, Contact, Mark, MarkPlate, MarkCast,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Runner, Sweat,
  GY, BAND_Y,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER, MAG, INDIGO,
} from "./FreeWorld";
import {
  Turnstile, Coin, CoinHeap, ModelPlate, PlateRack, TabBoard, SubDisc,
  Press, PrintSheet, Engine, TierLadder, Good, Shutter, LaneGate, FareBoard, MarkTile,
} from "./FreeProps";
import { Room, Jamb, Stack, Overhead } from "./HwSets";
import { fraunces } from "./fonts";

/* ===========================================================================
   REEL 131 · "FREE" — THE SCENES.  Board: storyboards/131-free.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing in this reel lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him". A hero standing in a
   busy room running an idle measured 8.94 and read as dead; the same set with
   the hero's body changing shape measured 14.09.
     S0  shoves a gate that will not turn, then buys ONE step with a coin
     S1  turns to a shutter rolling up on a door that has no coin slot
     S2  walks in and the hall lights up bay by bay ahead of him
     S3  seats four model plates into the counter rack, one per spoken name
     S4  seats the last three and the whole rack lights along its length
     S5  is juggling five subscription discs, and LETS GO of all five
     S6  hauls the press lever down three times, and three pictures come out
     S7  throws the clutch that starts three engines, and the tier lamp climbs
     S8  lifts three finished goods off the chute onto a running belt
     S9  throws the points lever that swings five paid lanes into ONE
     S10 (five of him) each feed a coin into their own gate — the villain wins
     S11 walks up with EMPTY HANDS and straight through a gate that lifts
     S12 holds the door while the crowd walks past him into the hall

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the room does
   WHILE the scene happens. Every scene still owes its own four-part event.

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). The
   picture carries MARKS and NUMERALS; the header and the captions carry
   language. Plates never enter the ground line the cast stands on.

   ⛔ EVERY SCENE IS LOCKED. The reel has exactly FOUR re-framings — S2 f56,
   S4 f36, S9 f52 and S12 f37 — and all four are CUTS, not drifts.

   ⛔ THE VO NEVER NAMES THE PLATFORM AND NEVER STATES A PRICE. Neither appears
   anywhere below; see the three guards in `FreeWorld`.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -6, dy: 10, s: 1.008, rot: -0.4 },
  amber: { dx: -50, dy: -30, s: 1.044, rot: 2.3 },
  steel: { dx: 52, dy: 28, s: 1.048, rot: -2.1 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` / `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.26) brightness(1.000)",
  amber: "contrast(1.150) saturate(1.26) brightness(0.958)",
  steel: "contrast(1.075) saturate(1.26) brightness(1.052)",
};

const PAR_X: Record<Variant, number> = { house: 0, amber: -46, steel: 40 };
/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH. `span = W + 420 = 1432`, so at
    n=7 the pitch is 204.6 and offsets of 0/214/428 are phases 0.0/9.4/18.9 —
    i.e. the top variant lever was INERT on a shipped reel. Varying `n` changes
    the pitch itself, which is the only offset that cannot collapse. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 96, steel: 172 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.84, steel: 0.46 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
const PJ_OF: Record<Variant, number> = { house: 0, amber: 1, steel: 2 };
/** ⭐ PER-CUT LAYOUT on the flattest scenes — one large object on a plain field
    is the hardest frame to differentiate and a grade has nothing to bite on
    there. At any sampled instant the subject is somewhere else. */
const LAY: Record<Variant, { rack: number; gate: number; belt: number; beat: number }> = {
  house: { rack: 0, gate: 0, belt: 0, beat: 0 },
  amber: { rack: 88, gate: -74, belt: -58, beat: -5 },
  steel: { rack: -96, gate: 82, belt: 74, beat: 8 },
};

type SP = { v: Variant; dur: number };

/** the one text chip a shot is allowed, in the reserved band */
const BandChip: React.FC<{ t: string; c?: string; fg?: string; x?: number }> =
  ({ t, c = INK, fg = "#F6F2E8", x }) => <Chip t={t} y={BAND_Y} x={x} c={c} fg={fg} s={0.94} z={94} />;

/* =========================================================================
   S1 · THE BACK LANE — 2.00 to 2.83s (25f) · SETUP
   VO: "I just found one free platform"

   ⛔ 25 FRAMES IS ONE IDEA. The shutter rolls up 268px in 14 frames and warm
   light floods 420px across the alley floor toward camera. A large bright area
   APPEARING is the cheapest high-value shape there is: motion is the fraction
   of the panel repainted per 0.1s times the luma delta, and this is a dark
   frame becoming a lit one.
   ⭐ THE DETAIL THAT MAKES IT THE FREE ONE: where every other door in this reel
   has a coin throat, this one wears a riveted BLANK over the slot. It is 80px
   wide and it is the only thing in the frame that has to be read.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("alley");
  const PJ = PJ_OF[v];
  const up = E(f, 2, 16, 0, 1, OUT);
  const spill = E(f, 4, 22, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.40} glow={hexa(p.key, 0.20 * spill)}>
      <Cam s={[1.00, 1.05, 1.06][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="duct"
          rake={0.10} rakeX={RAKE_X[v]} rakeRate={3.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.9} lamp={null} window={null} />

        {/* ⛔ v1 UNCOVERED A TAN RECTANGLE. On the contact sheet the beat read as
            *a Claude standing next to a cupboard*, because what the shutter
            revealed had no depth and nothing in it. What is uncovered has to be
            a PLACE: a receding corridor with a lit counter down one side, the
            marks already on it, and figures in the light at the far end. */}
        <div style={{ position: "absolute", left: 316, top: 232, width: 388, height: 420,
          zIndex: 24, overflow: "hidden",
          background: `linear-gradient(180deg, ${mxh("#5A4630", 0.24)} 0%, ${mxh(p.key, 0.20)} 46%, ${mxh("#B08A50", 0.16)} 100%)` }}>
          {/* the corridor's two receding walls — the depth that makes it a place */}
          <div style={{ position: "absolute", left: -30, top: 0, width: 150, height: "100%",
            background: dkh("#4A3A26", 0.16), transform: "skewX(15deg)" }} />
          <div style={{ position: "absolute", right: -30, top: 0, width: 150, height: "100%",
            background: dkh("#4A3A26", 0.24), transform: "skewX(-15deg)" }} />
          {/* three lamp bars receding down the ceiling */}
          {[0, 1, 2].map(i => (
            <div key={"lb" + i} style={{ position: "absolute", left: 96 - i * 22, top: 30 + i * 52,
              width: 196 + i * 44, height: 13, borderRadius: 4, background: mxh(p.key, 0.42 - i * 0.1) }} />
          ))}
          {/* the counter down the left, with the marks already sitting on it */}
          <div style={{ position: "absolute", left: 34, top: 250, width: 320, height: 24,
            background: mxh("#8A6A42", 0.16), transform: "skewY(-7deg)" }} />
          {R.models.slice(0, 4).map((m, i) => (
            <MarkTile key={"mk" + i} x={42 + i * 80 + (70 - i * 6) / 2} y={182 + i * 10 + (70 - i * 6) / 2}
              d={70 - i * 6} f={f} i={i} z={25} logo={m.logo} name={m.n} c={m.c} radius={15} />
          ))}
          {/* two figures in the light at the far end */}
          {/* ⛔ 58-68px SPRITES READ AS INSECTS. The floor is ~40px on the short
              side and a body needs to clear it by a wide margin to read as a
              body at all; these are 108 and 92. */}
          {[0, 1].map(i => (
            <Crew key={"cw" + i} f={f} x={214 + i * 92} y={368 + i * 16} i={i + 4}
              size={108 - i * 16} z={26} at={0} loop={(i + 1) % 4} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 294, top: 212, width: 432, height: 32,
          zIndex: 30, borderRadius: 4, background: dkh("#4A4034", 0.06) }} />
        <Shutter x={316} y={232} w={388} h={420} up={up} z={32} c={STEEL} slat={30} />

        {/* ⭐ THE BLANK OVER THE SLOT — the one thing in frame that must be read,
            so it is on its own dark reader box beside the door at 132x108 and
            not a 64px chip. Every other gate in this reel has a coin throat
            here; this one has a riveted plate over it. */}
        <div style={{ position: "absolute", left: 738, top: 386, width: 148, height: 178,
          zIndex: 39, borderRadius: 8, background: dkh("#3A342A", 0.12),
          border: `5px solid ${hexa("#000", 0.34)}` }} />
        <div style={{ position: "absolute", left: 756, top: 408, width: 112, height: 92,
          zIndex: 40, borderRadius: 5, background: mxh(CREAMB, 0.26),
          border: `5px solid ${dkh("#8C8271", 0.02)}` }}>
          {[0, 1, 2, 3].map(i => (
            <div key={"rv" + i} style={{ position: "absolute", left: 12 + (i % 2) * 72,
              top: 12 + Math.floor(i / 2) * 54, width: 12, height: 12, borderRadius: "50%",
              background: dkh(STEEL, 0.2) }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 764, top: 516, width: 96, height: 14,
          zIndex: 40, borderRadius: 4, background: dkh(GREEN, 0.02) }} />

        {/* the light on the floor — a shaped wedge, never a full-frame fill */}
        <div style={{ position: "absolute", left: 258, top: GY - 108, width: 500 * spill,
          height: 190, zIndex: 26, opacity: 0.58 * spill, transform: "skewX(-26deg)",
          background: `linear-gradient(180deg, ${hexa(p.key, 0.72)} 0%, ${hexa(p.key, 0)} 100%)` }} />

        <Hero f={f} x={860} y={GY} size={272} z={62} act={3} ph={0.6}
          gaze={-0.9 * spill} costume={{ constr: 1 }} />
        <Contact x={792} y={GY} w={152} z={20} o={0.42} />
        <Jamb p={p} side="l" w={144} z={90} kind="door" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S2 · THE FARE HALL — 2.83 to 6.07s (97f) · SETUP · ONE CUT AT f56
   VO: "that gives you access to every premium AI tool in one place."

   ⭐ THE EVENT IS THE ROOM ARRIVING. Seven lamp bars strike on ONE AT A TIME
   (f6/14/22/30/38/46/54) and each strike LIFTS that bay's shutter to reveal a
   station behind it. N discrete pops beat one long tween, and an ascending run
   is what makes a repeated reward read as PROGRESS rather than repetition.
   ⛔ AND IT IS NOT A LIGHT SHOW: each bay reveals a WORKING STATION with a
   bench, a stool and a lit board. A scan that surfaces nothing is a progress
   bar; a hall that lights up onto nothing is the same defect.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  const PJ = PJ_OF[v];
  const CUT = 56;
  const BAYS = [6, 14, 22, 30, 38, 46, 54];
  const walk = E(f, 0, 30, -120, 40, IO);
  return (
    <Scene p={p} slug="" push={f < CUT ? [0, CUT, 1.06] : [CUT, dur, 1.09]} vig={0.30}
      glow={hexa(p.key, 0.20)}>
      {/* ⛔ THE CUT IS A CUT. A second `Cam` scale switched ON a frame, never
             interpolated across it — a drift here would read as a slow zoom and
             the shot would have one beat instead of two. */}
      <Cam s={(f < CUT ? 1.00 : 1.30) * [1.00, 1.04, 1.05][PJ]}
        x={(f < CUT ? 0 : -120) + [0, -46, 52][PJ]}
        y={(f < CUT ? 0 : 54) + [0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="lampbar"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} lamp={{ x: 506, y: 200, r: 300 }} window={null} />

        {/* ⭐ THE BACKGROUND PROCESS — an overhead goods rail running the length
               of the hall. A full-width high-contrast travelling band is the
               single biggest per-scene lever in the measured motion table. */}
        {/* ⭐ MOTION IS BOUGHT THROUGH SPEED, NEVER THROUGH OPACITY — a faster
               sweep repaints more per sample and looks no heavier at any
               instant, where opacity lifts the black point (the banned fix). */}
        <Runner y={214} f={f} z={26} rate={9.2} pitch={188} w={128} h={80}
          c={mxh(CREAMB, 0.16)} c2={dkh("#1A2028", 0)} kind="crate" rail hang={7} />

        {/* the seven bays, receding. Each is a real STATION: a bench, a stool,
            a board and a worker — not a lit rectangle. */}
        {BAYS.map((at, i) => {
          const on = E(f, at, at + 5, 0, 1, OUT);
          const s = 1 - i * 0.055;
          const x = 78 + i * 132;
          const yb = 330 + i * 8;
          return (
            <React.Fragment key={"by" + i}>
              {/* the bay recess */}
              <div style={{ position: "absolute", left: x, top: yb, width: 118 * s, height: 240 * s,
                zIndex: 22, borderRadius: 4,
                background: `linear-gradient(180deg, ${dkh("#31423C", 0.08)} 0%, ${mxh(p.key, 0.02 + on * 0.26)} 100%)` }} />
              {/* the station inside it: a bench and a board */}
              <div style={{ position: "absolute", left: x + 10, top: yb + 150 * s,
                width: 98 * s, height: 16 * s, zIndex: 24, background: dkh("#7A6242", 0.14) }} />
              {/* ⭐ EACH BAY IS A MARK. v1 lit a coloured rectangle per bay, which
                  carries one bit ("there is a station here"). The line is *"access
                  to every premium AI tool"* — so what lights up is the seven
                  actual marks, on white tiles, at 88px in the near bay. */}
              {/* ⭐⭐ THE BAY LIGHTS UP BEHIND THE MARK (Alex, round 5: *"those all
                  behind the logos need to be glowing and stuff"*). v1 seated a
                  bright tile into a socket that stayed dark, so the bay never
                  changed — the mark simply appeared on a black square.
                  ⛔ MATTE, SO IT IS NOT AN EMISSIVE BLUR: the socket goes from a
                  dark brand tone to a SATURATED one, three concentric rings step
                  outward at falling alpha (a painted halo, not a shadow), a light
                  wedge falls down the bay wall, and the floor takes a pool. That
                  is what "glowing" looks like in a palette that bans glows, and
                  it MEASURES — a hard-edged value step repaints area where a
                  blur repaints almost none. */}
              <div style={{ position: "absolute", left: x + 12, top: yb + 34 * s,
                width: 94 * s, height: 94 * s, zIndex: 23, borderRadius: 18 * s,
                background: on > 0.4 ? mxh(R.models[i].c, 0.34) : dkh(R.models[i].c, 0.46) }} />
              {on > 0.3 && [0, 1, 2].map(r => (
                <div key={"hl" + r} style={{ position: "absolute",
                  left: x + 12 - (r + 1) * 13 * s, top: yb + 34 * s - (r + 1) * 13 * s,
                  width: 94 * s + (r + 1) * 26 * s, height: 94 * s + (r + 1) * 26 * s,
                  zIndex: 22, borderRadius: (18 + (r + 1) * 10) * s,
                  background: hexa(mxh(R.models[i].c, 0.40), (0.30 - r * 0.09) * on) }} />
              ))}
              {on > 0.3 && (
                <div style={{ position: "absolute", left: x - 14, top: yb + 120 * s,
                  width: 148 * s, height: 210 * s, zIndex: 21, opacity: 0.46 * on,
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                  background: `linear-gradient(180deg, ${hexa(mxh(R.models[i].c, 0.5), 0.62)} 0%, ${hexa(R.models[i].c, 0)} 100%)` }} />
              )}
              {on > 0.4 && (
                <MarkTile x={x + 12 + 47 * s} y={yb + 34 * s + 47 * s} d={94 * s} f={f} i={i}
                  z={24} logo={R.models[i].logo} name={R.models[i].n} c={R.models[i].c}
                  at={at + 2} radius={18 * s} />
              )}
              <div style={{ position: "absolute", left: x + 8, top: yb + 134 * s,
                width: 102 * s, height: 18 * s, zIndex: 24, borderRadius: 3,
                background: on > 0.4 ? mxh(R.models[i].c, 0.16) : dkh(R.models[i].c, 0.5) }} />
              {/* the bay's lamp bar — the thing that strikes */}
              <div style={{ position: "absolute", left: x - 4, top: yb - 26, width: 126 * s,
                height: 15, zIndex: 27, borderRadius: 4,
                background: on > 0.5 ? mxh(p.key, 0.4) : dkh(SLATE, 0.24) }} />
              {/* the shutter that lifts as the lamp strikes */}
              <Shutter x={x} y={yb} w={118 * s} h={240 * s} up={on} z={28} c={STEEL} slat={22} />
              {/* the pool it throws on the floor */}
              {on > 0.3 && <Pool x={x + 58 * s} y={GY - 66} w={210 * on} c={p.key} o={0.24 * on} z={18} />}
              <Ring x={x + 58 * s} y={yb + 120 * s} f={f} at={at} c={p.key} z={40} s={0.3} dur={11} />
            </React.Fragment>
          );
        })}

        {/* the crew already working the far end — an action loop each, four
            different loops, so the room is doing four things at once */}
        {/* ⛔ PITCH IS ARITHMETIC AND `Mascot` DRAWS ITS BODY AT ~100% OF `size`:
            three at 168 on a 232 pitch clears `spacing >= 0.85 x size`. v1 ran
            them at 132 against a 306 hero and they read as children. */}
        {[0, 1, 2, 3].map(i => (
          <Crew key={"cw" + i} f={f} x={214 + i * 214} y={GY - 4 + (i % 2) * 8} i={i + 3}
            size={176 - (i % 2) * 22} z={44 + (i % 2)} at={i * 4} loop={i % 4} />
        ))}
        {/* ⭐ RANK 2 — EACH BAY GETS A WORKER AS IT LIGHTS. A hall that lights up
               onto nobody is a lighting rig; what the line promises is that the
               tools are IN USE. Each arrives on its own bay's strike, so the
               crowd builds across the whole shot instead of being there at f0. */}
        {BAYS.slice(0, 5).map((at, i) => (
          <Crew key={"bw" + i} f={f} x={118 + i * 132} y={GY - 96 - i * 6} i={i + 8}
            size={104 - i * 7} z={30} at={at + 3} loop={(i + 2) % 4} />
        ))}

        <Hero f={f} x={140 + walk} y={GY} size={306} z={62} act={0} ph={0.2}
          drive={E(f, 0, 30, 0.7, 0, IO)} reach={40} costume={{ constr: 1 }} gaze={0.5} />
        <Contact x={64 + walk} y={GY} w={168} z={20} o={0.4} />

        <Jamb p={p} side="r" w={132} z={90} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · THE COUNTER — 6.07 to 7.57s (45f) · ESCALATE
   VO: "You get ChatGPT, Claude, Gemini, Grok,"

   ⭐ PULL THE WORD ONSETS OUT OF THE CAPTION JSON AND PUT THE BEATS ON THEM.
   Measured: 6.06 / 6.52 / 7.08 / 7.42 -> local f0 / f14 / f31 / f41. Each plate
   comes down a chute and the hero SEATS it; each seat costs a squash, a ring
   and a chime one step up the run.
   ⛔ THE PLATES ARE NOT INTERCHANGEABLE TILES. Identity is shape AND colour:
   own paint, own name strip, own seat lamp, and the real mark only where one
   exists. GROK has none, so GROK gets a stencil — a wrong mark is worse than
   no mark.
   ====================================================================== */
const SeatRun: React.FC<{ f: number; at: number[]; from: number; count: number;
  x0: number; pitch: number; y: number; s?: number; z?: number }> =
  ({ f, at, from, count, x0, pitch, y, s = 1, z = 60 }) => (
  <>{Array.from({ length: count }, (_, k) => {
    const i = from + k;
    const a = at[k];
    const m = R.models[i];
    const drop = E(f, a, a + 8, 0, 1, BACK);
    const sq = squash(f - a, 8, 0.26, 3, 11);
    if (f < a - 14) return null;
    return (
      <React.Fragment key={"pl" + i}>
        <div style={{ position: "absolute", inset: 0, zIndex: z + i,
          transform: `translateY(${(1 - drop) * -330}px) scaleY(${sq})`,
          transformOrigin: "50% 100%", opacity: Math.min(1, drop * 3.2) }}>
          <ModelPlate x={x0 + k * pitch} y={y} s={s} z={z + i} n={m.n} c={m.c} fg={m.fg}
            logo={m.logo} lit={f >= a + 6 ? 1 : 0} rot={(1 - drop) * (k % 2 ? 13 : -13)} f={f} />
        </div>
        <Ring x={x0 + k * pitch} y={y - 8} f={f} at={a + 6} c={mxh(m.c, 0.3)} z={z + 20}
          s={0.34} dur={12} />
        <Puff x={x0 + k * pitch} y={y - 4} f={f} at={a + 6} c={hexa("#D8CCB0", 0.4)}
          z={z + 19} n={6} s={0.55} />
      </React.Fragment>
    );
  })}</>
);

export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  const PJ = PJ_OF[v];
  const AT = [0, 14, 31, 41];
  const seated = AT.filter(a => f >= a + 6).length;
  const LX = LAY[v].rack;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.11]} vig={0.34} glow={hexa(p.key, 0.20)}>
      <Cam s={[1.00, 1.04, 1.05][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="tray"
          rake={0.13} rakeX={RAKE_X[v]} rakeRate={4.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="boards" grit={0.7} lamp={{ x: 470, y: 176, r: 260 }} window={null} />

        {/* the chute the plates come down — a hand-off needs somewhere it came
            FROM, or the arrival is a state change */}
        <div style={{ position: "absolute", left: 96 + LX * 0.3, top: 158, width: 800, height: 42,
          zIndex: 28, borderRadius: 6, background: dkh(SLATE, 0.22),
          transform: "skewX(-9deg)" }} />
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"ch" + i} style={{ position: "absolute", left: 130 + i * 176 + LX * 0.3,
            top: 200, width: 16, height: 44, zIndex: 27, background: dkh(SLATE, 0.34) }} />
        ))}

        <PlateRack x={176 + LX} y={GY - 214} n={7} pitch={232} s={0.86} z={40}
          lit={seated} f={f} filled={seated} />
        <SeatRun f={f} at={AT} from={0} count={4} x0={176 + LX} pitch={232}
          y={GY - 216} s={0.80} z={58} />

        {/* the hero works the near end — he catches and seats, so the plates are
            being PUT somewhere rather than falling into a shelf */}
        <Hero f={f} x={886} y={GY} size={286} z={64} act={1} ph={0.5}
          drive={AT.reduce((acc, a) => acc + (f >= a && f < a + 10
            ? Math.sin((f - a) / 10 * Math.PI) * 0.5 : 0), 0)}
          reach={70} costume={{ chef: 1 }} flip cheer={f > 41 ? 0.5 : 0} />
        <Contact x={812} y={GY} w={158} z={20} o={0.42} />

        {/* the background process: stock moving on the low shelf behind */}
        <Runner y={344} f={f} z={24} rate={8.2} pitch={172} w={124} h={72}
          c={mxh(CREAMB, 0.06)} c2={dkh("#0A1410", 0)} kind="cell" rail={false} o={0.9} />

        <Jamb p={p} side="l" w={128} z={90} kind="stud" />
        <Stack p={p} x={900} z={88} n={3} s={0.7} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S4 · THE RACK COMPLETES — 7.57 to 10.10s (76f) · ESCALATE · CUT AT f36
   VO: "Perplexity, Kimi and DeepSeek all in one spot."  (7.58/8.24/8.55/8.86/9.68)

   Three more plates seat (f0/f20/f30), then at f39 the WHOLE RACK lights along
   its length in an ascending run of seven, and at f63 a green bar sweeps the
   full width. The light changes from warm overhead to green, so the returning
   set is a callback rather than a repeat — a set only returns if the LIGHT
   changed.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const PJ = PJ_OF[v];
  const CUT = 36;
  const p = asPlace(f < CUT ? "bench" : "benchg");
  const AT = [0, 20, 30];
  const RUNAT = 39, SWEEP = 63;
  const lit = f < RUNAT ? 4 + AT.filter(a => f >= a + 6).length
    : Math.min(7, 4 + Math.floor((f - RUNAT) / 3) + AT.filter(a => f >= a + 6).length - 3);
  const sweep = E(f, SWEEP, SWEEP + 11, 0, 1, IO);
  const LX = LAY[v].rack;
  return (
    <Scene p={p} slug="" push={f < CUT ? [0, CUT, 1.05] : [CUT, dur, 1.10]} vig={0.30}
      glow={hexa(p.key, 0.22)}>
      {/* ⛔ THE S4 PUNCH IS A PULL-BACK, NOT A ZOOM IN. A 1.22 punch would crop
             the very row this scene exists to show all of. */}
      <Cam s={(f < CUT ? 1.06 : 0.97) * [1.00, 1.04, 1.05][PJ]}
        x={(f < CUT ? 60 : 0) + [0, -46, 52][PJ]}
        y={(f < CUT ? 26 : 34) + [0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="tray"
          rake={0.13} rakeX={RAKE_X[v]} rakeRate={5.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="boards" grit={0.7} lamp={{ x: 620, y: 182, r: 270 }} window={null} />

        <div style={{ position: "absolute", left: 96 + LX * 0.3, top: 158, width: 800, height: 42,
          zIndex: 28, borderRadius: 6, background: dkh(SLATE, 0.22), transform: "skewX(-9deg)" }} />

        {/* ⭐⭐ "ALL IN ONE SPOT" IS THE RACK CONTRACTING. Seven plates at a 232px
               pitch are 1392px wide on a 1012px panel — five of the seven marks
               were never on screen at the moment the VO says all of them are in
               one place. From f39 the pitch closes 232 -> 124 and the plates
               slide together, so the line lands on a frame that actually holds
               all seven. The compress IS the event, and it is a large travelling
               change rather than a lamp turning on. */}
        {(() => {
          const pack = E(f, RUNAT, RUNAT + 17, 0, 1, IO);
          const pitch = 232 - pack * 108;
          const x0 = 176 + LX * (1 - pack) - pack * 46;
          /* each seated mark takes its own pop, one after another, once packed */
          const pop = (i: number) => 1 + (f >= 57 + i * 2.2 && f < 69 + i * 2.2
            ? Math.sin((f - 57 - i * 2.2) / 12 * Math.PI) * 0.13 : 0);
          const ps = 0.80 - pack * 0.14;
          return (<>
            <PlateRack x={x0} y={GY - 214} n={7} pitch={pitch} s={0.86 - pack * 0.14} z={40}
              lit={lit} f={f} filled={Math.min(7, 4 + AT.filter(a => f >= a + 6).length)} />
            {/* the first four are already seated at f0 — a scene that starts empty
                throws away its own set-up */}
            {R.models.slice(0, 4).map((m, i) => (
              <ModelPlate key={"kp" + i} x={x0 + i * pitch} y={GY - 216} s={ps * pop(i)} z={58 + i}
                n={m.n} c={m.c} fg={m.fg} logo={m.logo} lit={1} f={f} />
            ))}
            {[4, 5, 6].map((i, k) => {
              const a = AT[k];
              if (f < a - 14) return null;
              const m = R.models[i];
              const drop = E(f, a, a + 8, 0, 1, BACK);
              const sq = squash(f - a, 8, 0.26, 3, 11);
              return (
                <React.Fragment key={"sp" + i}>
                  <div style={{ position: "absolute", inset: 0, zIndex: 62 + i,
                    transform: `translateY(${(1 - drop) * -330}px) scaleY(${sq})`,
                    transformOrigin: "50% 100%", opacity: Math.min(1, drop * 3.2) }}>
                    <ModelPlate x={x0 + i * pitch} y={GY - 216} s={ps * pop(i)} z={62 + i}
                      n={m.n} c={m.c} fg={m.fg} logo={m.logo} lit={f >= a + 6 ? 1 : 0}
                      rot={(1 - drop) * (k % 2 ? 13 : -13)} f={f} />
                  </div>
                  <Ring x={x0 + i * pitch} y={GY - 224} f={f} at={a + 6} c={mxh(m.c, 0.3)}
                    z={82} s={0.34} dur={12} />
                </React.Fragment>
              );
            })}
          </>);
        })()}

        {/* ⭐ THE COMPLETION SWEEP — a full-width high-contrast band travelling
               the rack, which is the highest-value shape in the motion table AND
               the thing "all in one spot" actually means. */}
        {sweep > 0 && (
          <div style={{ position: "absolute", left: 40 + LX + sweep * 1050 - 220, top: GY - 250,
            width: 220, height: 120, zIndex: 78,
            background: `linear-gradient(90deg, ${hexa("#C6F2CE", 0)} 0%, ${hexa("#C6F2CE", 0.42)} 60%, ${hexa("#C6F2CE", 0)} 100%)` }} />
        )}
        {/* ⭐ THE TAIL WAS FADING (Q4/mean 0.58). Once the seven have packed
               together the scene has said its line and Q4 went quiet, so each
               mark now takes a POP in an ascending run across f57-72 — an
               ascending run is what makes a repeated reward read as PROGRESS
               rather than as repetition, and it is the reward beat this scene
               owes for completing the rack. */}
        {R.models.map((m, i) => (
          <Ring key={"pp" + i} x={130 + i * 124} y={GY - 300} f={f} at={57 + i * 2.2}
            c={mxh(m.c, 0.3)} z={84} s={0.26} dur={11} />
        ))}

        {/* the rack's own tally: seven pips filling, then all seven together */}
        <div style={{ position: "absolute", left: 0, right: 0, top: BAND_Y + 6, zIndex: 92,
          display: "flex", justifyContent: "center", gap: 12 }}>
          {R.models.map((m, i) => (
            <div key={"tp" + i} style={{ width: 46, height: 46, borderRadius: 12,
              background: i < lit ? mxh(m.c, 0.14) : hexa("#0A0A0C", 0.42),
              border: `4px solid ${i < lit ? mxh(m.c, 0.4) : hexa("#FFFFFF", 0.14)}`,
              transform: `scale(${i < lit ? 1 : 0.82})` }} />
          ))}
        </div>

        <Hero f={f} x={886} y={GY} size={286} z={64} act={1} ph={0.5}
          drive={AT.reduce((acc, a) => acc + (f >= a && f < a + 10
            ? Math.sin((f - a) / 10 * Math.PI) * 0.5 : 0), 0)}
          reach={70} costume={{ chef: 1 }} flip cheer={f > RUNAT ? 1 : 0} />
        <Contact x={812} y={GY} w={158} z={20} o={0.42} />
        {[0, 1].map(i => (
          <Crew key={"cw" + i} f={f} x={190 + i * 250} y={GY - 4} i={i + 6} size={128}
            z={44} at={0} loop={(i + 2) % 4} cheer={f > RUNAT ? 1 : 0} />
        ))}

        <Runner y={344} f={f} z={24} rate={9.0} pitch={172} w={124} h={72}
          c={mxh(CREAMB, 0.06)} c2={dkh("#0A1410", 0)} kind="cell" rail={false} o={0.9} />
        <Jamb p={p} side="l" w={128} z={90} kind="stud" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S5 · THE DEAD TOLL ROW — 10.10 to 12.47s (71f) · TURN
   VO: "No switching tabs and no juggling subscriptions."

   ⭐⭐ THE VO'S VERBS NAME THE FIX (reel 120). There are two of them and BOTH
   are drawn, overlapping rather than queued, as one idea: the burden being put
   down.
     "switching tabs"  -> five tab boards FLIP SHUT in a run (f2/6/10/14/18)
     "juggling"        -> the hero, who is juggling five subscription discs at
                          f0, simply OPENS HIS HANDS at f29. All five fall 300px,
                          bounce and roll out of frame past camera by f60.
   ⛔ A DISC, NOT A CARD: a circle keeps its silhouette at every rotation, which
   is the only shape that reads while it is being juggled.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("tabs");
  const PJ = PJ_OF[v];
  const SHUT = [2, 6, 10, 14, 18], LET = 29;
  const HX = 288 + LAY[v].beat * 6;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.36} glow={hexa(p.key, 0.16)}>
      <Cam s={[1.00, 1.04, 1.05][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="duct"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.8} lamp={{ x: 506, y: 196, r: 250 }} window={null} />

        {/* ⛔ THE TOLL ROW FROM BEHIND — the villain is still standing, unbeaten,
            and it has to READ as gates rather than as five dark blocks (which is
            what v1 rendered). Each keeps its pedestal, its dead red lamp and its
            arm, so the row is recognisably the same machine as the hook. */}
        {[0, 1, 2, 3, 4].map(i => (
          <React.Fragment key={"tb" + i}>
            <div style={{ position: "absolute", left: 40 + i * 196, top: 452,
              width: 122, height: 218, zIndex: 20, borderRadius: 6,
              background: `linear-gradient(96deg, ${dkh("#9A9384", 0.30)} 0%, ${dkh("#9A9384", 0.50)} 100%)`,
              border: `3px solid ${hexa("#000", 0.40)}` }} />
            <div style={{ position: "absolute", left: 68 + i * 196, top: 408, width: 66,
              height: 40, zIndex: 21, borderRadius: 5, background: dkh("#E0563E", 0.44) }} />
            <div style={{ position: "absolute", left: 148 + i * 196, top: 512, width: 118,
              height: 15, zIndex: 19, borderRadius: 8, background: dkh(BRASS, 0.46) }} />
          </React.Fragment>
        ))}

        {/* ── "SWITCHING TABS": five tabs flipping shut in a run */}
        {R.models.slice(0, 5).map((m, i) => {
          /* ⛔ CAPPED AT 0.86, NOT 1. A full flip is 92 degrees, i.e. edge on and
             invisible, which emptied the top third of the frame for the last 50
             frames of the scene — reel 119's "the tail goes still" in a new
             costume. At 0.86 each tab stays a foreshortened slab hanging from
             the rail: the row is visibly SHUT and there is still something
             there. */
          const shut = E(f, SHUT[i], SHUT[i] + 7, 0, 0.72, IO);
          return (
            <TabBoard key={"tab" + i} x={140 + i * 186} y={252} w={178} h={108} s={1}
              z={44 + i} c={dkh(m.c, 0.22)} shut={shut} logo={m.logo} />
          );
        })}
        {/* the rail they hang from — an overhead mass, so the frame is not
            bottom-heavy */}
        <div style={{ position: "absolute", left: -20, top: 232, width: W + 40, height: 22,
          zIndex: 43, background: dkh(SLATE, 0.34) }} />

        {/* ── "JUGGLING": five discs in the air, then dropped */}
        {R.models.slice(0, 5).map((m, i) => {
          const ph = i * 1.26;
          /* ⛔ THE ARC SITS ABOVE HIS HEAD, NOT ACROSS HIS BODY. v1 swung them
             through x = HX +- 150 at y 244..420 — his own silhouette — and five
             112px discs over a 300px sprite rendered as one orange blob. */
          const air = f < LET
            ? { x: HX + Math.sin(f / 7 + ph) * 132,
                y: 326 - Math.abs(Math.sin(f / 9 + ph)) * 150,
                r: (f + i * 30) * 4.4 }
            : null;
          if (air) {
            return <SubDisc key={"dc" + i} x={air.x} y={air.y} s={1.02} z={70 + i}
              rot={air.r} c={m.c} logo={m.logo} n={m.n} />;
          }
          /* the drop: 300px of fall, a bounce, then it rolls out of frame past
             camera. ⛔ Nothing in a reel lands and simply stops. */
          const lf = f - LET - i * 3;
          if (lf < 0) return null;
          const fall = Math.min(1, lf / 13);
          const y = 420 + IN_Q(fall) * 286;
          const bnc = lf > 13 ? Math.abs(Math.sin((lf - 13) * 0.36)) * Math.exp(-(lf - 13) / 9) * 92 : 0;
          const roll = lf > 13 ? (lf - 13) * (13 + i * 4) : 0;
          return (
            <React.Fragment key={"dr" + i}>
              <SubDisc x={HX + 118 + i * 74 + roll} y={y - bnc} s={1.02 + roll * 0.0011}
                z={72 + i} rot={(f + i * 30) * 4.4 - roll * 1.6} c={m.c} logo={m.logo} n={m.n} />
              <Ring x={HX + 118 + i * 74} y={702} f={f} at={LET + i * 3 + 13} c={mxh(m.c, 0.3)}
                z={68} s={0.30} dur={12} />
              <Puff x={HX + 118 + i * 74} y={700} f={f} at={LET + i * 3 + 13}
                c={hexa("#C9C2B4", 0.44)} z={67} n={6} s={0.6} />
            </React.Fragment>
          );
        })}

        {/* the hero: hands UP and working while juggling, then dropped and open */}
        <Hero f={f} x={HX - E(f, 48, dur, 0, 250, IO)} y={GY} size={300} z={62} act={f < LET ? 1 : 0} ph={0.2}
          drive={-E(f, 48, dur, 0, 0.7, IO)} reach={60}
          strain={f < LET ? 0.42 + Math.sin(f / 5) * 0.14 : 0}
          cheer={f < LET ? 1 : E(f, LET, LET + 10, 1, 0.15, OUT)}
          costume={{ girl: 1 }} shock={f >= LET && f < LET + 14 ? 0.4 : 0} />
        <Contact x={HX - 74 - E(f, 48, dur, 0, 250, IO)} y={GY} w={160} z={20} o={0.42} />

        {/* ⭐ THE TAIL WAS FADING (Q4/mean 0.55). He does not stand and admire
               the empty floor — he WALKS OUT of the toll row toward the hall,
               250px across the last 22 frames, and the dead gates' lamps go out
               behind him one at a time. The hand-off out of a scene is a
               sentence, not an effect. */}
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"lo" + i} style={{ position: "absolute", left: 68 + i * 196, top: 408,
            width: 66, height: 40, zIndex: 22, borderRadius: 5,
            background: f >= 48 + i * 4 ? dkh("#2A241A", 0) : dkh("#E0563E", 0.44) }} />
        ))}
        <Jamb p={p} side="r" w={130} z={90} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S6 · THE PRINT BAY — 12.47 to 14.99s (76f) · ESCALATE
   VO: "It also has Nano Banana, Seedance, GPT Image all in there."

   ⛔ A PRESS THAT PRODUCES NOTHING IS A PROGRESS BAR. The hero HAULS the lever
   down three times (f14 / f28 / f46, on the three spoken names) and each slam
   EJECTS a drawn picture — a still life, a motion strip, a portrait — onto the
   drying rack. The rack then runs off along the belt from f56, so the last
   twenty frames are the loaded output travelling rather than a held frame.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("press");
  const PJ = PJ_OF[v];
  const SLAM = [14, 28, 46];
  /* ⛔ THE NEAR STATION MOVED RIGHT. At x=232 the hero (296px at x=112) covered
     the left third of its name strip and "NANO BANANA" rendered as "NO BANANA" —
     a clipped brand name is worse than none. */
  const PX = [300, 592, 858];
  const SC = [1.10, 0.86, 0.68];
  const PY = [GY - 6, GY - 58, GY - 96];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.30} glow={hexa(p.key, 0.20)}>
      <Cam s={[1.00, 1.04, 1.05][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
          rake={0.14} rakeX={RAKE_X[v]} rakeRate={5.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.8} lamp={{ x: 300, y: 180, r: 300 }} window={null} />

        {/* ⛔⛔ REBUILT. Alex twice: *"the logos are not big enough to where I can
               see them effectively, there's just random stuff."* Round 4's fix
               made it worse, and the cause was PART COUNT, not size — three
               presses, three flying sheets, three crew, a drying rail and a
               stack of prints is eighteen objects in 2.5 seconds, and
               `feedback_too_fast_is_a_part_count` says that reads as "I can't
               tell what's going on" every time. The rail, the stack and the crew
               are gone. Nine parts remain: three stations, three marks, three
               pictures.

               ⭐ AND THE STATION IS A LIT BOARD, NOT A DARK MACHINE. On magenta,
               `SLATE` presses rendered as mud with white slabs on them. Each is
               now a bone easel with the picture ON it and the maker's mark on a
               160px plate above — the mark is the biggest single object in its
               own third of the frame. */}
        {R.images.map((m, i) => {
          const a = SLAM[i], sc = SC[i], x = PX[i], y = PY[i];
          const fill = E(f, a, a + 9, 0, 1, OUT);
          const kick = f > a ? Math.sin((f - a) * 0.9) * Math.exp(-(f - a) / 6) * 9 : 0;
          return (
            <React.Fragment key={"st" + i}>
              {/* the easel legs */}
              {[-1, 1].map(sd => (
                <div key={sd} style={{ position: "absolute", left: x + sd * 84 * sc - 9 * sc,
                  top: y - 150 * sc, width: 18 * sc, height: 168 * sc, zIndex: 38 - i,
                  background: dkh("#5A3A50", 0.16), transform: `rotate(${sd * 5}deg)` }} />
              ))}
              {/* the board — bone, so it ranks against the magenta room */}
              <div style={{ position: "absolute", left: x - 128 * sc, top: y - 386 * sc + kick,
                width: 256 * sc, height: 246 * sc, zIndex: 40 - i, borderRadius: 8 * sc,
                background: `linear-gradient(172deg, ${mxh(CREAMB, 0.22)} 0%, ${dkh("#C9BFA6", 0.16)} 100%)`,
                border: `${8 * sc}px solid ${dkh("#7C5E70", 0.1)}` }} />
              {/* ⭐⭐ THE REAL PRODUCT PAGE, ON ITS OWN SCREEN. Real UI is the
                  biggest single motion lever in this repo (reel 107: median
                  6.36 -> 8.00; reel 111: 10.90 -> 12.51) AND it is the receipt —
                  the proof that "this product exists and looks like this" is the
                  product's own page. The screen wipes on with the spoken name and
                  then SCROLLS, because a held capture is a poster. */}
              <div style={{ position: "absolute", left: x - 106 * sc, top: y - 364 * sc + kick,
                width: 212 * sc, height: 168 * sc, zIndex: 41 - i, overflow: "hidden",
                borderRadius: 4 * sc, background: dkh("#1A1018", 0) }}>
                <div style={{ position: "absolute", left: 0, top: (1 - fill) * -168 * sc,
                  width: 212 * sc, height: 168 * sc, overflow: "hidden" }}>
                  <Img src={staticFile(m.shot)}
                    style={{ position: "absolute", left: 0,
                      top: -Math.max(0, (f - a - 6)) * 1.15 * sc,
                      width: 212 * sc, height: 300 * sc, objectFit: "cover",
                      objectPosition: "top center" }} />
                </div>
                {/* the browser chrome, so it reads as a SITE and not a photo */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 212 * sc,
                  height: 16 * sc, background: dkh("#2A2028", 0), opacity: fill }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{ position: "absolute", left: 6 * sc + j * 9 * sc,
                      top: 5 * sc, width: 6 * sc, height: 6 * sc, borderRadius: "50%",
                      background: hexa("#FFF", 0.34) }} />
                  ))}
                </div>
              </div>
              {/* the name strip on the board's own lip */}
              <div style={{ position: "absolute", left: x - 100 * sc, top: y - 184 * sc + kick,
                width: 200 * sc, height: 34 * sc, zIndex: 42 - i, borderRadius: 4 * sc,
                background: hexa("#2A0A20", 0.34), display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...mono(Math.min(20, 168 / m.n.length) * sc, 900),
                  color: mxh(m.c, 0.60), letterSpacing: 1.6, whiteSpace: "nowrap" }}>{m.n}</span>
              </div>
              {/* ⭐ THE MAKER'S MARK, 160px on the near station, on its own plate
                  ABOVE the board where nothing crosses it */}
              <MarkTile x={x} y={y - 470 * sc + kick} d={160 * sc} f={f} i={i} z={72 - i}
                logo={m.logo} name={m.n} c={m.c} at={a - 8} radius={32 * sc} />
              <Ring x={x} y={y - 280 * sc} f={f} at={a} c={mxh(m.c, 0.34)} z={78} s={0.52 * sc} dur={14} />
              <Puff x={x} y={y - 150 * sc} f={f} at={a} c={hexa("#E8C8DE", 0.42)} z={77} n={8} s={0.8 * sc} />
            </React.Fragment>
          );
        })}

        {/* the hero hauls the roller that drives all three — ONE actor, and the
            only body in the shot, so nothing competes with the three stations */}
        {(() => {
          const pull = SLAM.reduce((acc, a) => acc + (f >= a - 10 && f < a + 8
            ? (f < a ? E(f, a - 10, a, 0, 1, IN_Q) : E(f, a, a + 8, 1, 0, OUT)) : 0), 0);
          return (<>
            <div style={{ position: "absolute", left: 62, top: 402, width: 22, height: 210,
              zIndex: 66, borderRadius: 11, background: dkh(BRASS, 0.2),
              transformOrigin: "50% 100%", transform: `rotate(${34 - pull * 62}deg)` }} />
            <Hero f={f} x={96} y={GY + 8} size={272} z={62} act={1} ph={0.4}
              strain={0.18 + pull * 0.6} cheer={pull} costume={{ prof: 1 }} />
            <Forearm x0={96 + 72} y0={GY - 172} x1={70} y1={430 + pull * 66} w={21}
              c="#C4674A" z={68} />
          </>);
        })()}
        <Contact x={30} y={GY + 8} w={146} z={20} o={0.42} />

        {/* the background process: the roll of blank stock feeding the line */}
        <Runner y={214} f={f} z={26} rate={8.2} pitch={196} w={132} h={70}
          c={mxh(CREAMB, 0.14)} c2={dkh("#2A0A1E", 0)} kind="load" rail hang={7} />
        {/* ⭐ ONE TRAVELLING ELEMENT, NOT SIX. Stripping the clutter cost this
               scene 11.05 -> 8.41, and the right way to buy it back is the
               highest-value shape in the measured table rather than the parts
               that were just removed: a full-width output belt carrying the
               finished prints out from f56, dark bed against the magenta room so
               the luma delta is real. */}
        <div style={{ position: "absolute", left: -20, top: GY - 44, width: W + 40, height: 40,
          zIndex: 84, background: `linear-gradient(180deg, ${dkh("#2A0A1E", 0)} 0%, ${dkh(MAG, 0.52)} 100%)` }} />
        <Runner y={GY - 96} f={f} z={85} rate={11.2} pitch={182} w={124} h={56}
          c={mxh(CREAMB, 0.22)} c2={dkh("#1A0612", 0)} kind="crate" rail={false} />
        {f >= 50 && [0, 1, 2].map(i => (
          <PrintSheet key={"ot" + i} x={-60 + i * 236 + E(f, 52, dur, 0, 640, LIN)} y={GY - 74}
            s={1.06} z={87} rot={i % 2 ? 5 : -5} kind={i} c={R.images[i].c} />
        ))}
        <Jamb p={p} side="r" w={118} z={90} kind="door" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S7 · THE ENGINE LOFT — 14.99 to 17.43s (73f) · ESCALATE
   VO: "Plus top tier reasoning engines on top of that."

   ⭐ "ON TOP OF THAT" IS LITERAL: this is a mezzanine ABOVE the hall, its floor
   a steel grating through which the lit counter of S2-S4 is visible below.
   The hero throws a clutch handle through 190px at f8; the three engines spin
   up at f14 / f26 / f34, each sending a bead of work up a vertical track to a
   TIER ladder whose lamp climbs I -> II -> III and LOCKS at TOP at f46.
   ⛔ THE TIER IS THE LADDER'S OWN. No benchmark, no rank against anything, no
   rival — none of that is spoken, and `SPEED`-class claims are guarded against.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("loft");
  const PJ = PJ_OF[v];
  const CL = 8, FIRE = [14, 26, 34], LOCK = 46;
  const clutch = E(f, CL, CL + 9, 0, 1, IO);
  const at = FIRE.filter(a => f >= a).length - 1 + (f >= LOCK ? 1 : 0);
  const locked = E(f, LOCK, LOCK + 12, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.11]} vig={0.34} glow={hexa(p.key, 0.20)}>
      <Cam s={[1.00, 1.04, 1.05][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
          rake={0.13} rakeX={RAKE_X[v]} rakeRate={4.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.8} lamp={{ x: 470, y: 168, r: 250 }} window={null} />

        {/* ⭐ THE GRATING, AND THE HALL BELOW IT — the SOURCE half of the
               mechanism. "On top of that" is only legible if you can see the
               thing it is on top of. */}
        <div style={{ position: "absolute", left: 0, top: GY - 22, width: W, height: 114,
          zIndex: 30, background: dkh("#141024", 0), overflow: "hidden" }}>
          {/* the counter downstairs, seen through the bars */}
          <div style={{ position: "absolute", left: 60, top: 34, width: W - 120, height: 44,
            background: mxh("#8A6A42", 0.1) }} />
          {R.models.slice(0, 5).map((m, i) => (
            <div key={"dn" + i} style={{ position: "absolute", left: 110 + i * 176, top: 16,
              width: 62, height: 30, borderRadius: 4, background: dkh(m.c, 0.24) }} />
          ))}
          {Array.from({ length: 26 }, (_, i) => (
            <div key={"gr" + i} style={{ position: "absolute", left: i * 40, top: 0, width: 22,
              height: 114, background: dkh("#1C1630", 0) }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: GY - 30, width: W, height: 14,
          zIndex: 31, background: dkh(BRASS, 0.4) }} />

        {/* ⭐⭐ Alex: *"at 16 seconds I need to see a more hierarchical animation."*
               Three engines at s=0.88 in a straight row is a diagram — nothing
               ranks. They now RECEDE (1.24 / 0.88 / 0.66), the nearest one is the
               first to fire, and the back two are painted in progressively darker
               brass: size alone is a texture, and VALUE is the axis the greyscale
               audit can actually see. */}
        {[0, 1, 2].map(i => (
          <React.Fragment key={"en" + i}>
            <Engine x={222 + i * 258 - i * i * 22} y={GY - 30 - i * 34} s={[1.24, 0.88, 0.66][i]}
              z={48 - i * 2} f={f}
              run={E(f, FIRE[i], FIRE[i] + 12, 0, 1, OUT)} tier={R.tiers[i]}
              c={[mxh(BRASS, 0.10), BRASS, dkh(BRASS, 0.26)][i]} />
            {/* the bead of work climbing its own track to the ladder */}
            {f >= FIRE[i] + 4 && (() => {
              const k = Math.min(1, (f - FIRE[i] - 4) / 16);
              const bx = 222 + i * 258 - i * i * 22, bs = [1.24, 0.88, 0.66][i];
              return (<>
                <div style={{ position: "absolute", left: bx - 5, top: 250 - i * 20,
                  width: 10 * bs, height: 300, zIndex: 40, background: dkh(VIOLET, 0.3) }} />
                <div style={{ position: "absolute", left: bx - 30 * bs,
                  top: 546 - i * 34 - k * 300, width: 60 * bs, height: 60 * bs,
                  borderRadius: "50%", zIndex: 56,
                  background: mxh(VIOLET, 0.34), border: `4px solid ${hexa("#000", 0.3)}` }} />
              </>);
            })()}
            <Puff x={222 + i * 258 - i * i * 22} y={GY - 210 - i * 34} f={f} at={FIRE[i]}
              c={hexa("#CBB4EE", 0.4)} z={60} n={7} s={0.7 * [1.24, 0.88, 0.66][i]} up={60} />
          </React.Fragment>
        ))}

        {/* ⭐ THE LINESHAFT — one belt running the full width above the engines,
               which is literally how a hall of beam engines is driven, and the
               only large object in this set that can move continuously. */}
        {/* ⛔⛔ TWO WRONG OBJECTS BEFORE THIS ONE. `kind="bead"` drew plain circles
               and read as flying eggs; `kind="fan"` drew rimmed spoked discs and
               read as BRASS FLOWERS strung across the ceiling. A lineshaft is a
               shaft with flat BELT CARRIERS running along it, which is what
               `kind="load"` draws — rectangular, high-contrast, and unmistakably
               a belt rather than an ornament. Read the render, not the prop name. */}
        <div style={{ position: "absolute", left: -40, top: 246, width: W + 80, height: 14,
          zIndex: 37, background: dkh(BRASS, 0.36) }} />
        <Runner y={262} f={f} z={38} rate={10.4} pitch={136} w={92} h={44}
          c={mxh(BRASS, 0.22)} c2={dkh("#241A3E", 0)} kind="load" rail={false} />
        {/* the flat belts dropping from the shaft to each engine — the thing that
            makes a lineshaft read as DRIVING the machines below it */}
        {[196, 406, 616].map((bx, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: bx - 8, top: 276, width: 16,
            height: 190, zIndex: 36, background: dkh("#2A1E48", 0),
            transform: `skewX(${Math.sin(f / 9 + i) * 1.4}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: -40, top: 236, width: W + 80, height: 11,
          zIndex: 37, background: dkh(BRASS, 0.40) }} />

        <TierLadder x={856} y={GY - 40} s={0.94} z={62} tiers={R.tiers} at={at} locked={locked} />
        <Ring x={856} y={GY - 40 - 74 * 4 * 0.94} f={f} at={LOCK} c={GOLD} z={70} s={0.46} dur={15} />

        {/* the hero throws the clutch — 190px of travel on the handle */}
        <div style={{ position: "absolute", left: 636, top: 442, width: 22, height: 214,
          zIndex: 66, borderRadius: 11, background: dkh(BRASS, 0.16),
          transformOrigin: "50% 100%", transform: `rotate(${-46 + clutch * 92}deg)` }} />
        {/* ⭐⭐ HOLD WAS 88% — the highest in the reel. He threw one lever at f8
               and then watched. NAME WHAT THE CLAUDE DOES: he now hauls the
               clutch, and then keeps FEEDING the engines, one charge per engine,
               so his body is working across the whole shot rather than for nine
               frames of it. */}
        {[20, 32, 42].map((a, i) => (
          f >= a && f < a + 16 ? (
            <div key={"ch" + i} style={{ position: "absolute", left: 636 - E(f, a, a + 12, 0, 420 - i * 208, IO),
              top: 470 - Math.sin(E(f, a, a + 12, 0, Math.PI, LIN)) * 96, width: 62, height: 62,
              zIndex: 70, borderRadius: 14, background: mxh(VIOLET, 0.30),
              border: `4px solid ${hexa("#000", 0.3)}`,
              transform: `rotate(${(f - a) * 14}deg)` }} />
          ) : null
        ))}
        <Hero f={f} x={666} y={GY - 24} size={268} z={64} act={1} ph={0.3}
          drive={clutch * 0.5 + [20, 32, 42].reduce((acc, a) => acc + (f >= a - 4 && f < a + 8
            ? Math.sin((f - a + 4) / 12 * Math.PI) * 0.46 : 0), 0)}
          strain={clutch * 0.4} reach={78}
          costume={{ wizard: 1 }} cheer={f > LOCK ? 1 : 0} />
        <Forearm x0={666 - 70} y0={GY - 200} x1={640} y1={470 + clutch * 90} w={20}
          c="#C4674A" z={68} />
        <Contact x={596} y={GY - 24} w={148} z={28} o={0.4} />

        {/* two more hands on the loft floor, each on its own loop */}
        {[0, 1].map(i => (
          <Crew key={"lw" + i} f={f} x={140 + i * 194} y={GY - 26} i={i + 10} size={128}
            z={50} at={i * 5} loop={(i + 3) % 4} />
        ))}
        <Jamb p={p} side="l" w={124} z={90} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S8 · THE OUTPUT LINE — 17.43 to 19.20s (53f) · PAYOFF (part 1)
   VO: "So you literally get text, images, reasoning,"  (18.14 / 18.58 / 18.86)

   ⛔ THREE PLATES ON A SHELF WOULD BE A CONTAINER: it would say "there are
   three of them" and nothing else. So the three outputs are DRAWN OBJECTS —
   a ruled stack of sheets, a mounted print, a linked chain — dropping onto a
   belt that is ALREADY RUNNING AND LOADED at f0, so the shot is never empty and
   each landing is an event rather than a state change.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("line");
  const PJ = PJ_OF[v];
  const DROP = [21, 35, 43];
  const BX = LAY[v].belt;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.26} glow={hexa(p.key, 0.18)}>
      <Cam s={[1.00, 1.04, 1.05][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="tray"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="boards" grit={0.6} lamp={{ x: 506, y: 180, r: 270 }} window={null} />

        {/* ⭐ THE BELT — a full-width high-contrast travelling band, the biggest
               per-scene lever in the measured table, and it is loaded at f0.
               ⛔⛔ v1 PAINTED IT CREAM ON A BONE FLOOR AND IT MEASURED NOTHING.
               That is the motion table's own zero row — *cream tiles on a white
               window (no contrast) ~0* — because the audit is GREYSCALE and the
               delta it means is in VALUE. The bed is now near-black and the
               carried crates alternate dark slate and warm oak, so every
               boundary crossing the frame is a big luma step. */}
        <div style={{ position: "absolute", left: -20, top: GY - 132, width: W + 40, height: 26,
          zIndex: 33, background: dkh("#2A241A", 0) }} />
        <div style={{ position: "absolute", left: -20, top: GY - 106, width: W + 40, height: 46,
          zIndex: 33, background: `linear-gradient(180deg, ${dkh(SLATE, 0.30)} 0%, ${dkh(SLATE, 0.56)} 100%)` }} />
        {/* the rollers under it, turning — a background process at the floor */}
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: -10 + i * 96, top: GY - 66,
            width: 62, height: 62, borderRadius: "50%", zIndex: 32,
            background: dkh("#4A4238", 0.1), overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 4, top: 28, width: 54, height: 7,
              borderRadius: 4, background: mxh(STEEL, 0.14),
              transform: `rotate(${f * 11 + i * 30}deg)` }} />
          </div>
        ))}
        <Runner y={GY - 178} f={f} z={36} rate={8.4} pitch={196} w={138} h={64}
          c={dkh("#8A6A42", 0.10)} c2={dkh("#20262E", 0)} kind="crate" rail={false} />

        {/* the chute they come down — a hand-off needs a source */}
        <div style={{ position: "absolute", left: 300 + BX, top: 160, width: 420, height: 34,
          zIndex: 30, borderRadius: 6, background: dkh(SLATE, 0.2), transform: "skewX(11deg)" }} />

        {/* ⭐⭐ Alex: *"at 18 seconds that animation needs to be elevated."* v1
               dropped three small props onto a belt and let them ride. What was
               missing is the half of the mechanism that makes an output an
               OUTPUT: it has to be FINISHED. Each good now lands, a stamp head
               slams onto it with a ring and a recoil, and only then does it ride
               out — a before state, a trigger, travel and an arrival that costs
               something, on each of the three spoken words. And they are 1.5x
               the size, which is what "I cannot see it" usually means. */}
        {DROP.map((a, i) => {
          if (f < a - 12) return null;
          const k = E(f, a - 12, a, 0, 1, IN_Q);
          const sq = squash(f - a, 7, 0.26, 3, 10);
          const stampAt = a + 7;
          const press = f >= stampAt - 5 && f < stampAt + 10
            ? (f < stampAt ? E(f, stampAt - 5, stampAt, 0, 1, IN_Q) : E(f, stampAt, stampAt + 10, 1, 0, OUT))
            : 0;
          const ride = f > stampAt + 4 ? (f - stampAt - 4) * 8.6 : 0;
          const gx = 236 + i * 208 + BX;
          return (
            <React.Fragment key={"gd" + i}>
              <div style={{ position: "absolute", inset: 0, zIndex: 74 + i,
                transform: `translate(${ride}px, ${(1 - k) * -320}px) scaleY(${sq * (1 - press * 0.07)})`,
                transformOrigin: "50% 100%" }}>
                <Good x={gx} y={GY - 150} s={1.34} z={74 + i}
                  kind={i as 0 | 1 | 2} rot={(1 - k) * (i % 2 ? 15 : -15)} f={f} />
              </div>
              {/* ⛔ THE STAMP HEAD DESCENDS ONTO THE TOP EDGE, IT DOES NOT LAND ON
                  THE ARTWORK. v1 travelled to GY-278 — the middle of a good whose
                  top is at GY-364 — so a dark 124px slab sat across the picture
                  it was supposed to be finishing. It now stops with its die face
                  ON the top edge, and it has guide rods and a die plate so it
                  reads as a press head rather than a rectangle. */}
              {f >= stampAt - 8 && f < stampAt + 14 && (
                <div style={{ position: "absolute", left: gx - 54 + ride,
                  top: GY - 520 + press * 78, width: 108, height: 74, zIndex: 86 }}>
                  {[16, 80].map((rx, j) => (
                    <div key={j} style={{ position: "absolute", left: rx, top: -70, width: 12,
                      height: 76, background: dkh(STEEL, 0.24) }} />
                  ))}
                  <div style={{ position: "absolute", left: 0, top: 0, width: 108, height: 52,
                    borderRadius: 6, border: `5px solid ${hexa("#000", 0.36)}`,
                    background: `linear-gradient(180deg, ${mxh(SLATE, 0.14)} 0%, ${dkh(SLATE, 0.40)} 100%)` }}>
                    <div style={{ position: "absolute", left: 12, right: 12, top: 10, height: 8,
                      borderRadius: 4, background: hexa("#FFF", 0.22) }} />
                  </div>
                  {/* the die face that actually touches */}
                  <div style={{ position: "absolute", left: 20, top: 52, width: 68, height: 18,
                    borderRadius: 3, background: dkh(BRASS, 0.18),
                    border: `3px solid ${hexa("#000", 0.34)}` }} />
                </div>
              )}
              <Ring x={gx} y={GY - 150} f={f} at={a} c={GOLD} z={80} s={0.40} dur={12} />
              <Ring x={gx} y={GY - 186} f={f} at={stampAt} c={mxh(GREEN, 0.2)} z={88} s={0.44} dur={13} />
              <Puff x={gx} y={GY - 132} f={f} at={stampAt} c={hexa("#D8CCB0", 0.44)} z={87} n={8} s={0.7} />
            </React.Fragment>
          );
        })}

        <Hero f={f} x={856} y={GY} size={278} z={64} act={1} ph={0.5}
          drive={DROP.reduce((acc, a) => acc + (f >= a - 4 && f < a + 8
            ? Math.sin((f - a + 4) / 12 * Math.PI) * 0.46 : 0), 0)}
          reach={66} costume={{ suit: 1 }} flip />
        <Contact x={784} y={GY} w={152} z={20} o={0.4} />
        {[0, 1, 2].map(i => (
          <Crew key={"cw" + i} f={f} x={104 + i * 166} y={GY + (i % 2) * 6} i={i + 9}
            size={152 - (i % 2) * 18} z={44 + (i % 2)} at={i * 4} loop={(i + 1) % 4} />
        ))}
        {/* ⭐ THE CHUTE NEVER STOPS FEEDING. Three goods land on three words and
               the line would otherwise be empty between them; a run of plain
               crates keeps the source visibly working. */}
        {[6, 16, 28, 40, 48].map((a, i) => {
          if (f < a || f > a + 20) return null;
          const k = Math.min(1, (f - a) / 9);
          return (
            <div key={"fd" + i} style={{ position: "absolute", left: 456 + BX + i * 18,
              top: 190 + IN_Q(k) * 320, width: 74, height: 56, zIndex: 66, borderRadius: 5,
              background: dkh("#8A6A42", 0.06), border: `4px solid ${hexa("#000", 0.3)}`,
              transform: `rotate(${k * 26}deg)`, opacity: 1 - Math.max(0, (f - a - 12) / 8) }} />
          );
        })}

        <Jamb p={p} side="r" w={126} z={90} kind="stud" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S9 · THE JUNCTION — 19.20 to 22.07s (86f) · **THE PEAK** · CUT AT f52
   VO: "everything you're currently paying for separately in one place for free."

   ⭐ THE SCENE THE WHOLE REEL IS FOR, and the density peaks here. Five lanes
   run SEPARATELY through five paid gates (a coin drops on each at f8/14/20/26/
   32); at f37 the hero throws a points lever through 210px; f40-52 the lanes
   physically SWING TOGETHER into one wide lit lane; a CUT at f52 puts us at the
   head of the merged lane; at f60-70 its fare heads FOLD AWAY and flip to bone.

   ⛔ OVERLAPPING ACTION, NOT STEPS (§13). The lever LEADS, the lanes follow on a
   single ease, and the hanging goods LAG the lanes in proportion to the lanes'
   own velocity and then ring out as a damped pendulum. Quantising this to
   satisfy the motion audit is exactly the move that shipped "way too choppy" on
   reel 114 with every gate green.
   ⛔ THE VILLAIN IS NOT BEATEN HERE. These are the lanes, not the toll row; S10
   still shows the row collecting from five people.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("merge");
  const PJ = PJ_OF[v];
  const CUT = 52, LEV = 37, FOLD = 60;
  const COIN = [8, 14, 20, 26, 32];
  const lever = E(f, LEV, LEV + 10, 0, 1, IO);
  /* the single ease the lanes ride, and its central-difference VELOCITY, which
     is what the hanging goods lag by */
  const swing = (g: number) => E(g, LEV + 3, CUT, 0, 1, IO);
  const k = swing(f);
  const vel = (swing(f + 1) - swing(f - 1)) * 0.5;
  const ringOut = f > CUT ? Math.sin((f - CUT) * 0.62) * Math.exp(-(f - CUT) / 6.5) : 0;
  const fold = E(f, FOLD, FOLD + 12, 0, 1, IO);
  const GX = LAY[v].gate;

  return (
    <Scene p={p} slug="" push={f < CUT ? [0, CUT, 1.07] : [CUT, dur, 1.12]} vig={0.34}
      glow={hexa(p.key, 0.20)}>
      {/* ⛔ THE CUT LANDS ON THE MERGED HEAD, NOT ON THE MIDDLE OF THE FUNNEL.
             A punch that keeps the same centre is a zoom; a punch that moves to
             where the event RESOLVES is a cut. */}
      <Cam s={(f < CUT ? 1.00 : 1.24) * [1.00, 1.04, 1.05][PJ]}
        x={(f < CUT ? 0 : -286) + [0, -46, 52][PJ]}
        y={(f < CUT ? 0 : 74) + [0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry"
          rake={0.13} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.8} lamp={{ x: 506, y: 186, r: 270 }} window={null} />

        {/* ── THE FIVE LANES, AS A FUNNEL.
               ⛔⛔ v1 TRANSLATED FIVE HORIZONTAL BARS DOWN TO A COMMON y AND IT
               READ AS SCAFFOLDING POLES. Five parallel bars moving together is
               not a merge; it is a lift. A merge is a FUNNEL, so each lane is
               now hinged at its own entry on the left and its far end SWINGS to
               a common point on the right. At k=0 they are five separate lanes
               fanned across the frame; at k=1 they are one band.
               ⛔ AND THE DECK IS LIGHT WITH DARK RAILS. A conveyor drawn as one
               mid-tone bar with a highlight on top is a pipe; what says DECK is
               a pale running surface between two dark rails, with roller ticks
               crossing it. The audit is greyscale, so this is also where the
               scene's luma delta comes from. */}
        {[0, 1, 2, 3, 4].map(i => {
          const y0 = 250 + i * 100;
          const ang = (Math.atan2(470 - y0, 1140) * 180) / Math.PI * k;
          const at = (d: number) => ({
            x: -60 + d * Math.cos((ang * Math.PI) / 180),
            y: y0 + d * Math.sin((ang * Math.PI) / 180),
          });
          const m = R.models[i];
          return (
            <div key={"ln" + i} style={{ position: "absolute", left: -60 + GX * 0.2, top: y0,
              width: 1200, height: 0, zIndex: 24 + i, transformOrigin: "0% 50%",
              transform: `rotate(${ang}deg)` }}>
              {/* the two rails and the deck between them */}
              <div style={{ position: "absolute", left: 0, top: -34, width: 1200, height: 13,
                background: dkh("#1A2030", 0) }} />
              <div style={{ position: "absolute", left: 0, top: -21, width: 1200, height: 44,
                background: `linear-gradient(180deg, ${mxh(STEEL, 0.30)} 0%, ${mxh(STEEL, 0.02)} 100%)` }} />
              <div style={{ position: "absolute", left: 0, top: 23, width: 1200, height: 15,
                background: dkh("#1A2030", 0) }} />
              {/* roller ticks crossing the deck — the background process */}
              {Array.from({ length: 22 }, (_, j) => (
                <div key={"rt" + j} style={{ position: "absolute",
                  left: ((j * 58 - f * (5.2 + i * 0.5)) % 1276 + 1276) % 1276 - 38,
                  top: -18, width: 10, height: 38, background: hexa("#0A1020", 0.34) }} />
              ))}
              {/* ⭐ THE GOODS ON IT, in the product's own saturated paint on a
                  pale deck, 148x84 so they survive the 1012->240 downsample.
                  They LAG the lane's own velocity and then ring out as a damped
                  pendulum — overlapping action, never a stepped move. */}
              <div style={{ position: "absolute", left: 198 + i * 100 - vel * 340,
                top: -118 - ringOut * 16, width: 182, height: 104, borderRadius: 8,
                background: `linear-gradient(168deg, ${mxh(m.c, 0.20)} 0%, ${m.c} 46%, ${dkh(m.c, 0.28)} 100%)`,
                border: `5px solid ${hexa("#000", 0.36)}`,
                transform: `rotate(${-vel * 460 - ringOut * 8}deg)`, transformOrigin: "50% -20px" }}>
                {m.logo && (
                  <MarkTile x={52} y={52} d={80} f={f} i={i} z={3}
                    logo={m.logo} name={m.n} c={m.c} radius={17} />
                )}
                <div style={{ position: "absolute", right: 14, top: 30, width: 66, height: 13,
                  borderRadius: 6, background: hexa("#000", 0.30) }} />
                <div style={{ position: "absolute", right: 14, top: 52, width: 44, height: 11,
                  borderRadius: 6, background: hexa("#000", 0.20) }} />
              </div>
              {/* ⛔ ALL FIVE GATES AT THE SAME DISTANCE ALONG THEIR OWN LANE, so
                  the row reads as five toll points rather than a staircase. */}
              <div style={{ position: "absolute", left: 660, top: -180, zIndex: 6 }}>
                {/* ⛔ NO TEXT ON A FOLDING GATE. The head carried `FREE` and the
                    fold rotates the whole gate -84 degrees, so the word rendered
                    SIDEWAYS on the frame strip — rotated type reads as broken,
                    not as a barrier lifting. The lane gates now only go dark and
                    fold; the bone plate over the merged mouth is the one object
                    that says the word, and it is upright. */}
                <LaneGate x={0} y={168} s={0.84} z={56} fold={fold}
                  lit={fold > 0.6 ? 1 : 0} />
              </div>
              {/* the coin each lane takes, before the merge */}
              {f >= COIN[i] && f < COIN[i] + 12 && (
                <div style={{ position: "absolute", left: 636, top: -186, zIndex: 70 }}>
                  <Coin x={0} y={IN_Q(Math.min(1, (f - COIN[i]) / 8)) * 132} s={1.05} z={70}
                    rot={(f - COIN[i]) * 34} c={BRASS} />
                </div>
              )}
            </div>
          );
        })}

        {/* ⭐ THE MERGED HEAD — one wide lit mouth the five lanes run into, so
               the funnel arrives somewhere. It is BONE against the navy junction
               (different in hue AND value) and it reads while it is still empty,
               because empty is the promise. */}
        <div style={{ position: "absolute", left: 812 + GX * 0.2, top: 384, width: 300,
          height: 186, zIndex: 52, borderRadius: "10px 0 0 10px",
          background: `linear-gradient(180deg, ${mxh(CREAMB, 0.12 + k * 0.16)} 0%, ${dkh("#8C8271", 0.24 - k * 0.16)} 100%)`,
          border: `7px solid ${dkh("#8C8271", 0.06)}` }} />
        {/* ⛔⛔ THE BLACK BAR IS GONE. Alex: *"at 21 seconds where it says FREE
            remove that big black bar covering it."* This was the merged mouth's
            interior — a 252x130 near-black rect — and after the f52 punch
            (Cam s=1.24, x=-286) it scaled up and landed across the FREE plate.
            ⛔ THE PUNCH IS PART OF THE GEOMETRY: a rect that clears a plate at
            1.00 does not clear it at 1.24. The mouth is now a LIT throat, so the
            funnel arrives somewhere bright and nothing dark crosses the word. */}
        <div style={{ position: "absolute", left: 836 + GX * 0.2, top: 424, width: 252,
          height: 108, zIndex: 53, borderRadius: 6,
          background: `linear-gradient(180deg, ${mxh(p.key, 0.30)} 0%, ${dkh(TEAL, 0.30)} 100%)`,
          border: `5px solid ${dkh("#8C8271", 0.1)}` }} />
        {/* the payoff word, above the mouth and clear of everything */}
        {fold > 0.4 && (
          <div style={{ position: "absolute", left: 800 + GX * 0.2, top: 268, width: 324,
            height: 104, zIndex: 90, borderRadius: 8,
            background: `linear-gradient(172deg, #F8F5EC 0%, #E6DFCC 100%)`,
            border: `6px solid ${dkh("#8C8271", 0.02)}`, display: "flex",
            alignItems: "center", justifyContent: "center",
            transform: `scale(${E(f, FOLD + 4, FOLD + 13, 0.5, 1, BACK)})` }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62,
              color: "#241F17", letterSpacing: "0.04em" }}>{R.fares.free}</span>
          </div>
        )}
        {/* ⭐ AND IT WAS STILL FLAT. The mouth now visibly SWALLOWS: every good
               that runs in throws a ring at the throat and the fare heads drop
               their coin trays as they fold, so the last second is the mechanism
               finishing rather than a held frame. */}
        {fold > 0.3 && [0, 1, 2, 3].map(i => (
          <Ring key={"sw" + i} x={962 + GX * 0.2} y={478} f={f} at={FOLD + i * 5 + 4}
            c={mxh(GREEN, 0.24)} z={88} s={0.34} dur={13} />
        ))}
        {fold > 0.5 && [0, 1, 2, 3, 4].map(i => (
          <Coin key={"dc" + i} x={470 + i * 44 + GX} y={560 + IN_Q(Math.min(1, (f - FOLD - 6 - i * 2) / 12)) * 210}
            s={1.0} z={64} rot={(f - FOLD) * 22 + i * 40} c={BRASS} />
        ))}

        {/* ⭐ the merged lane's own light, arriving as the lanes land */}
        {k > 0.5 && (
          <Pool x={860} y={512} w={640 * k} c={p.key} o={0.30 * (k - 0.5) * 2} z={22} />
        )}

        {/* the hero throws the points lever — 210px of travel on the handle */}
        <div style={{ position: "absolute", left: 214, top: 470, width: 24, height: 228,
          zIndex: 66, borderRadius: 12, background: dkh(BRASS, 0.14),
          transformOrigin: "50% 100%", transform: `rotate(${-52 + lever * 104}deg)` }} />
        <div style={{ position: "absolute", left: 176, top: 682, width: 100, height: 30,
          zIndex: 65, borderRadius: 6, background: dkh(SLATE, 0.2) }} />
        <Hero f={f} x={250} y={GY} size={300} z={64} act={1} ph={0.3}
          drive={lever * 0.56} strain={lever * 0.5} reach={78}
          costume={{ constr: 1 }} cheer={f > FOLD ? 1 : 0} />
        <Forearm x0={250 - 82} y0={GY - 200} x1={214 + lever * 60} y1={498 + lever * 70}
          w={21} c="#C4674A" z={68} />
        <Contact x={178} y={GY} w={162} z={20} o={0.42} />

        {/* ⭐ THE TAIL WAS FADING (Q4/mean 0.63). Once the fare heads fold the
               merged mouth has to actually TAKE something, or the beat resolves
               into a still frame: four goods run into it across the last 20
               frames, each shrinking into the dark as it goes. A funnel that
               swallows nothing is a diagram. */}
        {fold > 0.2 && [0, 1, 2, 3].map(i => {
          const g = ((f - FOLD - i * 5) / 20);
          if (g < 0 || g > 1) return null;
          const m = R.models[i];
          return (
            <div key={"in" + i} style={{ position: "absolute",
              left: 470 + g * 400, top: 446 - g * 6, width: 182 * (1 - g * 0.55),
              height: 104 * (1 - g * 0.55), zIndex: 55, borderRadius: 8,
              background: `linear-gradient(168deg, ${mxh(m.c, 0.20)} 0%, ${m.c} 46%, ${dkh(m.c, 0.28)} 100%)`,
              border: `5px solid ${hexa("#000", 0.36)}`, opacity: 1 - g * 0.25 }} />
          );
        })}

        {/* the arrival COSTS: the lanes land together with a shock through the
            floor, dust off the bed and a ring at the junction point */}
        <Ring x={812} y={472} f={f} at={CUT} c={GOLD} z={82} s={0.6} dur={16} />
        <Puff x={812} y={500} f={f} at={CUT} c={hexa("#B8C8E0", 0.42)} z={80} n={11} s={0.9} />
        <Ring x={952} y={356} f={f} at={FOLD + 6} c={mxh(GREEN, 0.2)} z={83} s={0.5} dur={16} />

        {/* ⛔⛔ THE "BIG BLACK BAR" AT 21s WAS THIS OCCLUDER. `Jamb` anchors to
               the PANEL edge, and the f52 punch translates the whole `Cam` by
               -286 at s=1.24 — so a mass built to sit off the right edge walks
               into the middle of the frame and lands across the payoff word.
               ⭐ THE RULE: AN EDGE-ANCHORED OCCLUDER IS ONLY AN OCCLUDER AT THE
               FRAMING IT WAS PLACED IN. Any scene with a re-framing has to
               re-place it, or drop it for the second framing — the near-ground
               rail below is the occluder after the cut. */}
        {f < CUT && <Jamb p={p} side="r" w={128} z={90} kind="post" />}
        {f >= CUT && (
          <div style={{ position: "absolute", left: -60, top: GY + 30, width: W + 160,
            height: 30, zIndex: 92, borderRadius: 15,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
        )}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S10 · THE PAY ROW — 22.07 to 23.33s (38f) · ESCALATE (the villain, winning)
   VO: "People are paying for 5 subscriptions"   ("5" = 22.67 -> local f18)

   FIVE Claudes, one per booth. ⛔ SPRITE PITCH IS ARITHMETIC AND `Mascot` DRAWS
   ITS BODY AT ~100% OF `size`: 186px of pitch against size 152 clears
   `spacing >= 0.85 * size`. The back rank is painted in darker clay — size
   alone is a texture, VALUE is what makes depth readable, and it is the axis
   the greyscale audit can actually see.
   ⛔ NO AMOUNT IS SPOKEN, so the tally counts COINS, never money.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("row");
  const PJ = PJ_OF[v];
  const PAY = [4, 9, 14, 19, 24];
  const paid = PAY.filter(a => f >= a + 6).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.32} glow={hexa(p.key, 0.20)}>
      <Cam s={[1.00, 1.04, 1.05][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="lampbar"
          rake={0.14} rakeX={RAKE_X[v]} rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.9} lamp={{ x: 506, y: 176, r: 260 }} window={null} />

        {[0, 1, 2, 3, 4].map(i => {
          const a = PAY[i];
          const turn = E(f, a + 5, a + 12, 0, 118, IO);
          const rg = f > a + 12 ? Math.sin((f - a - 12) * 0.8) * Math.exp(-(f - a - 12) / 5) * 6 : 0;
          const m = R.models[i];
          return (
            <React.Fragment key={"bt" + i}>
              <Turnstile x={64 + i * 186} y={GY - 6} s={0.62} z={40 + i} f={f}
                arm={-turn + rg} open={f >= a + 5 && f < a + 12 ? 1 : 0}
                head="FARE" count={String(112 + i * 7 + (f >= a + 6 ? 1 : 0)).padStart(3, "0")}
                stencil={`GATE 0${i + 1}`} dim={0.10 + i * 0.03} />
              {/* the coin each of them feeds */}
              {f >= a && f < a + 10 && (
                <Coin x={50 + i * 186} y={430 + IN_Q(Math.min(1, (f - a) / 6)) * 88} s={1.0}
                  z={72} rot={(f - a) * 40} c={BRASS} />
              )}
              <Ring x={64 + i * 186} y={520} f={f} at={a + 6} c={mxh(m.c, 0.3)} z={78}
                s={0.24} dur={10} />
              {/* five of him, one per gate. Back rank in darker clay = depth the
                  greyscale audit can see. */}
              <Crew f={f} x={148 + i * 186} y={GY} i={i} size={152} z={54 + i} at={0}
                loop={i % 4} tint={lerpHex("#D97757", "#8C4530", (i % 3) * 0.22)} />
            </React.Fragment>
          );
        })}

        {/* ⭐⭐ WHERE THE FARES GO (Alex, round 5: *"above those machines we need
               to see something more interesting, like maybe big dollar bills"*).
               The top third of this shot was empty, and the answer was already in
               the mechanic: five gates taking money every month, and the money
               has to go SOMEWHERE. An overhead collection duct now runs the width
               of the row, and every fare paid flies up into it as a NOTE.
               ⛔ NO DENOMINATION ON THE NOTE. No price is spoken anywhere in this
               VO, so the note is drawn the way the coin is — engraved border,
               rosette, portrait oval, and no figure. A banknote with a number on
               it would be an invented price, which is the most believable kind of
               wrong. */}
        <div style={{ position: "absolute", left: -40, top: 210, width: W + 80, height: 54,
          zIndex: 60, borderRadius: 6,
          background: `linear-gradient(180deg, ${mxh(SLATE, 0.10)} 0%, ${dkh(SLATE, 0.40)} 100%)` }} />
        <div style={{ position: "absolute", left: -40, top: 264, width: W + 80, height: 16,
          zIndex: 60, background: dkh("#1A1610", 0) }} />
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"tk" + i} style={{ position: "absolute", left: 78 + i * 186, top: 280,
            width: 74, height: 112, zIndex: 59, borderRadius: "0 0 8px 8px",
            background: dkh(SLATE, 0.30) }} />
        ))}
        {/* the notes flying up, one per fare, tumbling as they go */}
        {[0, 1, 2, 3, 4].map(i => {
          const a = PAY[i] + 6;
          const g = (f - a) / 16;
          if (g < 0 || g > 1) return null;
          const nx = 112 + i * 186, ny = 470 - g * 214;
          return (
            <div key={"nt" + i} style={{ position: "absolute", left: nx - 66, top: ny - 34,
              width: 132, height: 68, zIndex: 74, borderRadius: 4,
              transform: `rotate(${-16 + g * 42}deg) scale(${0.86 + g * 0.2})`,
              background: `linear-gradient(160deg, ${mxh(GREEN, 0.46)} 0%, ${mxh(GREEN, 0.24)} 60%, ${dkh(GREEN, 0.16)} 100%)`,
              border: `4px solid ${dkh(GREEN, 0.34)}`, opacity: 1 - Math.max(0, (g - 0.82) / 0.18) }}>
              <div style={{ position: "absolute", inset: 7, border: `2px solid ${hexa("#0A2A18", 0.34)}`,
                borderRadius: 2 }} />
              <div style={{ position: "absolute", left: 46, top: 14, width: 40, height: 40,
                borderRadius: "50%", background: hexa("#0A2A18", 0.24) }} />
              <div style={{ position: "absolute", left: 54, top: 20, width: 24, height: 28,
                borderRadius: "50% 50% 42% 42%", background: hexa("#0A2A18", 0.34) }} />
              {[14, 100].map((rx, j) => (
                <div key={j} style={{ position: "absolute", left: rx, top: 24, width: 18,
                  height: 18, borderRadius: "50%", border: `3px solid ${hexa("#0A2A18", 0.30)}` }} />
              ))}
            </div>
          );
        })}
        {/* the duct fills as they arrive — the count is a GRAPHIC, not a figure */}
        {[0, 1, 2, 3, 4].map(i => (
          f >= PAY[i] + 20 ? (
            <div key={"fl" + i} style={{ position: "absolute", left: 60 + i * 186, top: 224,
              width: 118, height: 26, zIndex: 61, borderRadius: 4,
              background: mxh(GREEN, 0.30), transform: `rotate(${(i % 2 ? 3 : -3)}deg)` }} />
          ) : null
        ))}
        {[0, 1, 2, 3, 4].map(i => (
          <Ring key={"nr" + i} x={112 + i * 186} y={268} f={f} at={PAY[i] + 20}
            c={mxh(GREEN, 0.24)} z={76} s={0.24} dur={11} />
        ))}

        {/* the tally: five coin glyphs lighting, and the numeral in Fraunces.
            ONE text chip per shot, in the reserved band. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: BAND_Y - 12, zIndex: 92,
          display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
          <div style={{ background: mxh(CREAMB, 0.24), borderRadius: 12, padding: "8px 22px",
            display: "flex", alignItems: "center", gap: 16, border: `4px solid ${dkh(BRASS, 0.2)}` }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56,
              color: "#241F17", lineHeight: 1 }}>{R.fares.n}</span>
            <div style={{ display: "flex", gap: 9 }}>
              {[0, 1, 2, 3, 4].map(i => (
                <div key={"cg" + i} style={{ width: 36, height: 36, borderRadius: "50%",
                  background: i < paid ? mxh(BRASS, 0.1) : hexa("#2A241A", 0.22),
                  border: `4px solid ${dkh(BRASS, 0.3)}` }} />
              ))}
            </div>
          </div>
        </div>

        <Jamb p={p} side="l" w={122} z={90} kind="door" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S11 · THE OPEN GATE — 23.33 to 25.40s (62f) · **PAYOFF**
   VO: "while this one is completely free."   (completely 23.92 / free 24.28)

   ⭐ THE SAME OBJECT AS THE HOOK, WITH THE OPPOSITE BEHAVIOUR. That is the whole
   payoff: not a new prop, the hero artifact doing the other thing.
     f6-18   he walks up with his HANDS OPEN AND EMPTY, held out — no coin
     f18-30  the arm swings UP through 104 degrees and STAYS up
     ⭐ THE REVEAL IS THE ROTATION, NOT THE TRAVEL. The head plate turns
             -26 -> 0 degrees so the cast bone FREE comes INTO readability at the
             instant it arrives. Carrying it up already legible spends the one
             moment the beat gets.
     f30-56  he walks THROUGH — 228px, and he does not stop.
   The coin slot wears a riveted blank: this gate takes nothing.
   ⛔ DAYLIGHT. The biggest lightness jump on any cut in the reel.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const PJ = PJ_OF[v];
  const UP = 18, THRU = 30;
  const lift = E(f, UP, THRU, 0, 104, IO);
  const settle = f > THRU ? Math.sin((f - THRU) * 0.55) * Math.exp(-(f - THRU) / 8) * 5 : 0;
  const headRot = E(f, UP + 2, THRU + 2, -26, 0, OUT);
  /* ⛔ AN ACTION IS A DISTANCE. 228px on a 330px body was 69% of his width but
     spread over 26 frames, i.e. 8.8px a frame; at 330 over 30 frames from an
     earlier start he crosses a full body width and keeps going out of frame. */
  const walk = E(f, 6, 18, 0, 60, IO) + E(f, THRU, dur - 2, 0, 330, IO);
  const GX = LAY[v].gate;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.22} glow={hexa(p.key, 0.18)}>
      <Cam s={[1.00, 1.04, 1.05][PJ]} x={[0, -46, 52][PJ]} y={[0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="gantry"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.6}
          window={{ x: 726, y: 214, w: 210, h: 176 }} lamp={null} />

        {/* the hall behind the gate — walking THROUGH has to go somewhere */}
        <div style={{ position: "absolute", left: 236, top: 300, width: 560, height: 236,
          zIndex: 20, borderRadius: 6,
          background: `linear-gradient(180deg, ${mxh(p.key, 0.22)} 0%, ${mxh("#C0B294", 0.1)} 100%)` }} />
        <div style={{ position: "absolute", left: 250, top: 466, width: 532, height: 26,
          zIndex: 21, background: mxh("#8A6A42", 0.12) }} />
        {R.models.slice(0, 4).map((m, i) => (
          <React.Fragment key={"bk" + i}>
            <div style={{ position: "absolute", left: 266 + i * 130, top: 348, width: 116,
              height: 118, zIndex: 21, borderRadius: 9, background: dkh(m.c, 0.16),
              border: `5px solid ${hexa("#000", 0.26)}` }} />
            <MarkTile x={324 + i * 130} y={406} d={84} f={f} i={i} z={22}
              logo={m.logo} name={m.n} c={m.c} radius={18} />
          </React.Fragment>
        ))}

        {/* ⛔⛔ `showHead` IS THE PAYOFF AND IT WAS MISSING. Without it `Turnstile`
            draws no head plate at all, so the one beat the whole reel is built
            towards — the cast bone FREE rotating into readability as the arm
            lifts — rendered as nothing. The contact sheet is what caught it;
            the typecheck, the render and every gate were green. */}
        <Turnstile x={330 + GX * 0.4} y={GY} s={1.26} z={54} armZ={88} f={f}
          arm={-lift + settle} open={f >= UP ? 1 : 0} headRot={headRot} showHead
          head={R.fares.free} plated count="000" stencil="NO FARE" dim={0} />

        {/* ⭐ HIS HANDS ARE EMPTY AND HE SHOWS THEM. `cheer` raises and rotates
               `Mascot`'s own arm rects — the rig already draws them, so no limb
               is invented and nothing terminates in mid-air. */}
        <Hero f={f} x={620 + walk} y={GY} size={330} z={64} act={0} ph={0.2}
          drive={f < THRU ? E(f, 6, 18, 0.5, 0, IO) : 0.42}
          reach={40} cheer={f < UP ? 0.8 : 0.2} costume={{ constr: 1 }} gaze={-0.6} />
        <Contact x={548 + walk} y={GY} w={172} z={20} o={0.4} />

        {/* the lift COSTS something — the hub knocks, dust off the plinth, and a
            ring at the head as the plate turns into readability */}
        <Ring x={470 + GX * 0.4} y={430} f={f} at={UP + 2} c={GOLD} z={84} s={0.44} dur={15} />
        <Ring x={330 + GX * 0.4} y={272} f={f} at={THRU} c={mxh(CREAMB, 0.3)} z={85} s={0.4} dur={14} />
        <Puff x={392 + GX * 0.4} y={GY - 16} f={f} at={UP + 4} c={hexa("#D8CCB0", 0.4)}
          z={82} n={8} s={0.7} />

        {/* ⭐⭐ THE FIX FOR A DEAD PAYOFF IS NEVER NEW OBJECTS — IT IS THE SUBJECT
               CONTINUING TO ACT (§19). At 5.16 this was the weakest scene in the
               reel and the one the whole thing is built towards. Three things
               now run through the second half instead of a settled frame:
               the hall LIGHTS UP bay by bay as he goes through it, THREE more
               Claudes stream in behind him across the full panel, and the
               overhead goods rail runs the whole time. */}
        {[0, 1, 2, 3].map(i => {
          const at = 30 + i * 7;
          const on = E(f, at, at + 5, 0, 1, OUT);
          return (
            <React.Fragment key={"by" + i}>
              <div style={{ position: "absolute", left: 262 + i * 132, top: 316, width: 108,
                height: 15, zIndex: 26, borderRadius: 4,
                background: on > 0.5 ? mxh(p.key, 0.44) : dkh(SLATE, 0.24) }} />
              {on > 0.3 && <Pool x={316 + i * 132} y={470} w={180 * on} c={p.key}
                o={0.26 * on} z={19} />}
              <Ring x={316 + i * 132} y={356} f={f} at={at} c={GOLD} z={40} s={0.24} dur={10} />
            </React.Fragment>
          );
        })}
        {[0, 1, 2, 3, 4].map(i => {
          const at = 20 + i * 7;
          if (f < at) return null;
          const g = E(f, at, dur - 2, 0, 1, LIN);
          return <Crew key={"fw" + i} f={f} x={1110 - g * (620 + i * 62)} y={GY + 8 - i * 4}
            i={i + 4} size={172 - i * 12} z={50 + i} at={at} loop={0}
            tint={["#D97757", "#C86A4C", "#B85E42", "#A8563E", "#984E36"][i]} />;
        })}
        <Runner y={214} f={f} z={27} rate={9.4} pitch={192} w={132} h={78}
          c={mxh("#8A6A42", 0.14)} c2={dkh("#20262E", 0)} kind="crate" rail hang={6} />
        {/* ⭐ THE PAYOFF SCENE WAS THE WEAKEST IN THE REEL (8.81). What it was
               missing is the consequence: the gate does not open once, it STAYS
               open, so the arm keeps turning as the queue behind him walks
               through it. Each pass is a quarter turn with its own recoil, which
               is the same mechanism as the hook running the other way. */}
        {[34, 46, 58].map((a, i) => (
          <Ring key={"pt" + i} x={470 + GX * 0.4} y={430} f={f} at={a} c={mxh(GREEN, 0.2)}
            z={84} s={0.30} dur={12} />
        ))}
        {/* the counter behind fills as they arrive — the hall is being USED */}
        {[0, 1, 2].map(i => (
          <Crew key={"cb" + i} f={f} x={318 + i * 132} y={478 + i * 4} i={i + 9}
            size={92 - i * 6} z={23} at={30 + i * 8} loop={(i + 1) % 4} />
        ))}

        <Jamb p={p} side="l" w={128} z={90} kind="post" />
        <Stack p={p} x={912} z={88} n={3} s={0.72} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S12 · THE FRONT — 25.40 to 27.60s (66f) · CTA · HARD CUT ON THE KEYWORD f37
   VO: "Want to try it for yourself? Just comment FREE for the link."

   ⛔ HARD-CUT ON THE KEYWORD. "FREE" lands at 26.64s = root f799 = local f37,
   and the cut is ON it. The four letters then stamp in one at a time
   (f38/41/44/47), each with its own ring, and the Claude mark lands beside them
   at f51 — the mark is the audience filter and the last thing the frame says.
   ⭐ A REWARD BEAT HAS TO RESOLVE SOMEWHERE: each letter is a strike with a
   contained pulse on its own cell at ~2% of the panel. ⛔ NEVER A SCREEN FLASH
   (`feedback_no_flashing_transitions` is standing, and reel 115 broke it to
   pass a motion gate).
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cta");
  const PJ = PJ_OF[v];
  const CUT = 37;
  const LET = [38, 41, 44, 47];
  const MARK = 51;
  const word = R.keyword.split("");
  return (
    <Scene p={p} slug="" push={f < CUT ? [0, CUT, 1.07] : [CUT, dur, 1.10]} vig={0.30}
      glow={hexa(p.key, 0.22)}>
      <Cam s={(f < CUT ? 1.00 : 1.20) * [1.00, 1.04, 1.05][PJ]}
        x={(f < CUT ? 0 : -40) + [0, -46, 52][PJ]}
        y={(f < CUT ? 0 : 150) + [0, 18, -16][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="lampbar"
          rake={0.13} rakeX={RAKE_X[v]} rakeRate={4.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.8} lamp={{ x: 506, y: 196, r: 280 }}
          window={{ x: 128, y: 236, w: 176, h: 150 }} />

        {/* ⛔ v1 LEFT A 348x300 BLANK CREAM RECTANGLE UNDER THE GATE HEAD and the
            contact sheet read the whole CTA as an empty billboard. What is
            behind an open door is a ROOM: the counter, the marks already on it,
            and the crew working under a lit ceiling. The doorway is also darker
            and warmer than the plate above it, so the plate still ranks first. */}
        <div style={{ position: "absolute", left: 336, top: 262, width: 348, height: 300,
          zIndex: 22, borderRadius: 6, overflow: "hidden",
          background: `linear-gradient(180deg, ${dkh("#5A4630", 0.10)} 0%, ${mxh("#8A6A42", 0.06)} 100%)` }}>
          {[0, 1].map(i => (
            <div key={"cl" + i} style={{ position: "absolute", left: 44 + i * 32, top: 26 + i * 34,
              width: 260 - i * 64, height: 12, borderRadius: 4,
              background: mxh(p.key, 0.34 - i * 0.14) }} />
          ))}
          <div style={{ position: "absolute", left: 24, top: 196, width: 300, height: 20,
            background: mxh("#8A6A42", 0.20) }} />
          {R.models.slice(0, 4).map((m, i) => (
            <MarkTile key={"mk" + i} x={62 + i * 76} y={164} d={64} f={f} i={i} z={25}
              logo={m.logo} name={m.n} c={m.c} radius={14} />
          ))}
          {[0, 1].map(i => (
            <Crew key={"ic" + i} f={f} x={116 + i * 118} y={252 + i * 8} i={i + 7}
              size={74 - i * 8} z={24} at={0} loop={(i + 2) % 4} />
          ))}
        </div>
        {[300, 700].map((dx, i) => (
          <div key={"dr" + i} style={{ position: "absolute", left: dx - (i ? 0 : 34), top: 250,
            width: 40, height: 320, zIndex: 24, borderRadius: 3, background: dkh("#4A3C2A", 0.1),
            transformOrigin: i ? "0% 50%" : "100% 50%",
            transform: `perspective(900px) rotateY(${i ? -34 : 34}deg)` }} />
        ))}

        {/* THE GATE HEAD the keyword is struck into — a real object over the
            doors, not an overlay. Its band is y 210..330, clear of the cast. */}
        {/* ⛔ IT ARRIVES ON THE CUT. v1 drew this plate from f0 and it stood
            EMPTY for 37 frames — a blank cream billboard was the largest object
            in the CTA for more than a second. It now drops in on the keyword cut,
            two frames before the first letter is struck. */}
        <div style={{ position: "absolute", left: 286, top: 176, width: 448, height: 96,
          zIndex: 60, borderRadius: 8, background: `linear-gradient(172deg, #F6F2E7 0%, #DDD5C1 100%)`,
          border: `7px solid #A79A80`, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 10,
          transform: `translateY(${(1 - E(f, CUT - 5, CUT + 3, 0, 1, BACK)) * -300}px)`,
          opacity: E(f, CUT - 6, CUT - 2, 0, 1, LIN) }}>
          {word.map((ch, i) => {
            const a = LET[i];
            const k = E(f, a, a + 6, 0, 1, BACK);
            const hit = f >= a && f < a + 7 ? 1 - (f - a) / 7 : 0;
            return (
              <div key={"lt" + i} style={{ width: 88, height: 74, borderRadius: 6,
                background: hit > 0 ? mxh(GOLD, 0.34 * hit) : hexa("#241F17", 0.06),
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: `scale(${0.3 + k * 0.7})`, opacity: k }}>
                <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62,
                  color: "#241F17", lineHeight: 1 }}>{ch}</span>
              </div>
            );
          })}
        </div>
        {LET.map((a, i) => (
          <Ring key={"lr" + i} x={344 + i * 100} y={224} f={f} at={a} c={GOLD} z={72}
            s={0.24} dur={11} />
        ))}
        {/* the mark, on a white tile — the audience filter, last word in frame */}
        {f >= MARK && (
          <div style={{ position: "absolute", left: 748, top: 178,
            transform: `scale(${E(f, MARK, MARK + 8, 0.4, 1, BACK)})`, transformOrigin: "50% 50%",
            zIndex: 62 }}>
            <Mark x={0} y={0} s={92} z={62} />
          </div>
        )}

        {/* the crowd walking past him INTO the hall, across the full panel */}
        {[0, 1, 2, 3, 4].map(i => {
          const x = -120 + i * 214 + ((f * 6.2 + i * 60) % (W + 300));
          return <Crew key={"cw" + i} f={f} x={x} y={GY + (i % 2) * 8} i={i + 2} size={136}
            z={48 + i} at={0} loop={i % 4} />;
        })}

        <Hero f={f} x={862} y={GY} size={290} z={66} act={2} ph={0.4}
          cheer={1} costume={{ constr: 1 }} flip gaze={-0.7} />
        <Contact x={790} y={GY} w={158} z={20} o={0.42} />

        <Jamb p={p} side="l" w={124} z={90} kind="door" />
      </Cam>
    </Scene>
  );
};
