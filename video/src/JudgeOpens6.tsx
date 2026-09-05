import React from "react";
import { useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Contact, Ring, Puff, Steam, Sweat, Fall, Hero, Crew, Forearm, mono, Motes,
  Scene, Cam, Edge, Beam, Pool, asPlace, costumeFor,
  R, GY, BAND_Y, SAFE3, CLAYD, GOLD, GREEN, SODIUM,
} from "./JudgeWorld";
import { Wig } from "./JudgeProps";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 8 OPENS.  ⛔⛔⛔ THE VALUE STRUCTURE WAS THE BUG.

   THE NOTE: *"none of these are good nor interesting enough nor eye catching
   enough."* Seven rounds of me reasoning about it. ⭐ THE ANSWER TOOK TEN
   MINUTES ONCE I PUT THE HOOK FRAMES OF **OX 119** AND **BOSS 128** ON ONE
   SHEET NEXT TO MINE ([[feedback_render_a_frame_strip]] — again).

   | | ground | dominant mass | accent | back wall |
   |---|---|---|---|---|
   | OX 119   | pale COOL slate-blue | TWO NEAR-BLACK OXEN | red PAID tags, cream $0 card | a bank of bright logo cards |
   | BOSS 128 | pale COOL blue       | a huge DARK BROWN boss in navy | RED tie, white/green screens | a wall of lit screens |
   | JUDGE mine | warm TAN | gold on gold | gold | brown panelling |

   **Mine was beige on tan on brown on gold.** Warm mid-tone on warm mid-tone,
   nothing black, nothing cool, no value spread anywhere — a monochrome mush at
   thumbnail size. Every note about "interesting" was a note about VALUE and I
   kept answering it with concepts.

   ⛔⛔ AND I HAD MISREAD [[feedback_hook_simplicity]] AS "KEEP THE HOOK EMPTY".
   BOSS's hook carries a crowd band, a wall of lit screens, a giant boss, a
   Claude and a screen being destroyed. ONE dominant SUBJECT is the rule. An
   empty ROOM was never the rule, and an empty room is exactly what nine of my
   candidates were standing in.

   THE FOUR THINGS BOTH REFERENCES DO, AND BOTH OF THESE NOW DO:
     1. a pale COOL ground        2. a NEAR-BLACK mass at 55%+ of frame height
     3. ONE hot saturated accent  4. bright COUNTABLE content on the back wall
        + a near-camera crowd band cropped by the bottom edge

     A  bench   the colossal near-black JUDGE lowering a huge glass over the
                gold DONE in a small Claude's hands. Inside the glass it is
                already hollow. He is grinning at the lens. It never lands.
     B  cold    the round-7 stack, restaged in the reference value structure.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open6Id = "bench" | "cold";

export const OPEN6_BANDS: Record<Open6Id, { big: string; hot: string }> = {
  bench: { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
  cold:  { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
};

/* ⛔⛔⛔ THE NEAR-BLACK MASS IS **CLOTHING**, NOT A RECOLOURED SPRITE.
   v1 of this file got the note *"wtf why are there black claude sprites"* and it
   was completely fair: I read "near-black mass" off OX and BOSS and implemented
   it by passing a black `tint` to `Crew`, which renders CLAUDE MASCOTS AS BLACK
   SILHOUETTES. That breaks [[feedback_trial_cut_variants]] ("never recolour the
   sprite") and it looks like nothing.
   ⭐ LOOK AGAIN AT WHAT THE REFERENCES ACTUALLY DRAW: OX's black masses are
   OXEN — animals, drawn as animals. BOSS's dark mass is a Claude-family sprite
   WEARING A NAVY SUIT WITH A RED TIE, with his own coral face showing. The dark
   value comes from the GARMENT and the FURNITURE. The character keeps his face
   and his house colour, always. */
const ROBE = "#1A2030";         // the judge's robe. Cloth, not a silhouette.
const ROBE2 = "#333D52";
const COOL = "#8FA8C4";
const BENCH = "#241A18";        // dark oxblood joinery — furniture carries value too

/** The cold court: OX's and BOSS's structure, built out of this reel's own
    furniture. Pale cool ground · a bright bank of countable case files ·
    a near-camera gallery band, dark, cropped by the bottom edge. */
export const ColdCourt: React.FC<{ children: React.ReactNode; dur: number; f: number }> =
  ({ children, dur, f }) => {
  const p = asPlace("dock");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.34} glow={hexa("#EFF6FF", 0.12)}>
      <Cam s={1.0} z={1}>
        {/* pale cool wall */}
        <div style={{ position: "absolute", left: -60, top: 0, width: 1140, height: 560,
          zIndex: 4, background: `linear-gradient(180deg,#F0F6FD 0%,#CEDDEE 56%,#AEC2D6 100%)` }} />
        {/* ⭐ COUNTABLE CONTENT: 36 case files you could actually count, lit.
            This is OX's logo bank and BOSS's screen wall, in a court's own
            vocabulary ([[feedback_the_crowd_is_a_near_band]]). */}
        <div style={{ position: "absolute", left: -40, top: 168, width: 1100, height: 268,
          zIndex: 6, background: `linear-gradient(180deg,#414C59,#232A33)`,
          boxShadow: `inset 0 8px 22px ${hexa("#0A0E13", 0.34)}` }} />
        {[0, 1, 2].map(r => (
          <React.Fragment key={"rw" + r}>
            <div style={{ position: "absolute", left: -40, top: 176 + r * 88, width: 1100,
              height: 74, zIndex: 7,
              background: `linear-gradient(180deg,${hexa("#FBFDFF", 0.26)},${hexa("#1A2028", 0.18)})` }} />
            {Array.from({ length: 12 }, (_, c) => (
              <div key={"fl" + r + c} style={{ position: "absolute", left: -22 + c * 91,
                top: 182 + r * 88, width: 74, height: 62, zIndex: 8, borderRadius: 3,
                boxShadow: SH,
                background: `linear-gradient(178deg,#F6F3E6 0%,#D8D2C0 100%)` }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 74, height: 22,
                  background: [ "#C6472B", "#2A6CA0", "#D99A28", "#3F7A38" ][(r + c) % 4] }} />
                {(r + c) % 3 === 0 ? (
                  <div style={{ position: "absolute", left: 0, top: 22, width: 74, height: 40,
                    background: hexa([ "#C6472B", "#2A6CA0", "#D99A28" ][(r + c) % 3], 0.30) }} />
                ) : null}
                {[0, 1, 2].map(l => (
                  <div key={l} style={{ position: "absolute", left: 9, top: 22 + l * 12,
                    width: 56 - l * 13, height: 4, background: hexa("#8C8578", 0.5) }} />
                ))}
              </div>
            ))}
            <div style={{ position: "absolute", left: -40, top: 244 + r * 88, width: 1100,
              height: 9, zIndex: 9, background: `linear-gradient(180deg,#5A6674,#23292F)` }} />
          </React.Fragment>
        ))}
        {/* the clerestory over the archive: it lifts the MEAN without touching
            the black mass that carries the spread */}
        <div style={{ position: "absolute", left: -40, top: 66, width: 1100, height: 96,
          zIndex: 5, background: `linear-gradient(180deg,#FFFFFF 0%,#DCEAF8 100%)`,
          boxShadow: `0 14px 40px ${hexa("#FFFFFF", 0.5)}` }} />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={"cs" + i} style={{ position: "absolute", left: -20 + i * 178, top: 66,
            width: 16, height: 96, zIndex: 6, background: "#6E7A88" }} />
        ))}
        {/* pale floor */}
        <div style={{ position: "absolute", left: -60, top: 556, width: 1140, height: 300,
          zIndex: 10, background: `linear-gradient(180deg,#F2E9D4 0%,#D6C8A8 54%,#B4A688 100%)` }} />
        <div style={{ position: "absolute", left: -60, top: 552, width: 1140, height: 12,
          zIndex: 11, background: `linear-gradient(180deg,#5E5648,#8E8470)` }} />
        <Beam x={470} y={64} top={200} bot={720} len={540} c="#F2F8FF" o={0.26} z={12} f={f} />
        <Pool x={470} y={648} w={780} c="#F4F8FF" o={0.30} z={13} />
        <Motes x={470} y={240} w={620} h={420} n={13} f={f} z={14} c="#EAF2FF" />
        {children}
        {/* ⭐ THE GALLERY, near camera, DARK, cropped by the bottom edge — the
            depth cue and the density shape in one, and a court supplies it. */}
        {Array.from({ length: 7 }, (_, i) => (
          <Crew key={"gl" + i} f={f} x={-24 + i * 170} y={832} i={i + 3} size={206}
            z={84} at={0} flip={i % 2 === 0} />
        ))}
        <Edge side="r" c="#0E1319" w={92} z={90} top={150} />
      </Cam>
    </Scene>
  );
};

/** The gold slab. In this palette it is the ONE hot saturated thing in frame,
    which is what makes it read as the thing everybody is arguing about. */
export const Gold: React.FC<{ x: number; y: number; w?: number; h?: number; rot?: number;
  z?: number }> = ({ x, y, w = 200, h = 64, rot = 0, z = 60 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
    zIndex: z, transform: `rotate(${rot}deg)`, borderRadius: 5, boxShadow: SH_D,
    background: `linear-gradient(160deg, ${mxh(GOLD, 0.36)} 0%, ${GOLD} 44%, ${dkh(GOLD, 0.26)} 100%)` }}>
    <div style={{ position: "absolute", left: 0, top: h * 0.27, width: w, textAlign: "center",
      ...mono(h * 0.44, 800), letterSpacing: w * 0.012, color: hexa("#3A2A0C", 0.88) }}>DONE</div>
  </div>
);

/* =========================================================================
   A · `bench` — THE GLASS COMING DOWN ON IT.

   ⭐ EYE-CATCH: a 620px near-black judge against a pale cool wall of lit case
   files, and a 300px disc of bright glass descending through the middle of the
   frame. Black mass · cool ground · one gold accent · countable content. That
   is OX's and BOSS's exact recipe.
   ⭐ THE SENTENCE: inside the glass the gold DONE is already hollow — bare
   scaffolding and loose ends. The glass is the technique. What it shows is
   the lie.
   ⭐ THE SUSPENSE: it descends in six notches, 470px to 92px, and the small
   Claude beams down the lens the entire time. IT NEVER REACHES THE BRIEF.
   ====================================================================== */
const DROP = [6, 17, 28, 40, 53, 68];
const BRIEF_Y = GY - 232;

export const Open6Bench: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const step = DROP.filter(a => f >= a).length;
  const gy = 148 + DROP.reduce((a, at) => a + E(f, at, at + 7, 0, 46, IO), 0)
    + E(f, 0, 79, 0, 44, LIN);
  const glassY = gy;
  const sway = Math.sin(f / 6.4) * (3 + step * 1.4);
  /* ⭐⭐ THE BLACK MASS ARRIVES; IT IS NOT THERE AT FRAME 0. Measured off the
     references rather than assumed: OX 119 reads 143.8 and BOSS 128 reads 146.0
     against the >=140 law, and BOTH carry a huge near-black hero — because at
     frame 0 it is not in shot yet. OX's oxen WALK IN around f24. Standing the
     judge there from frame 0 cost 13 points of luma and, worse, spent the
     arrival for nothing. He looms in over the first half-second instead. */
  const enter = E(f, 2, 17, 0, 1, OUT);
  const jx = (1 - enter) * 430, jy = (1 - enter) * 96;

  return (
    <ColdCourt dur={dur} f={f}>
      {/* ⭐ THE JUDGE — a real Claude on the house rig at 604px, wearing the
          robe. The robe is the dark mass; his face is his own. `Wig` is this
          reel's own prop, the same one the body scenes put on him. */}
      <div style={{ position: "absolute", left: jx, top: jy, width: 1012, height: 792,
        zIndex: 46 }}>
        {/* the robe: shoulders to floor, and it is the biggest shape in frame */}
        <div style={{ position: "absolute", left: 596, top: GY - 214, width: 328, height: 222,
          zIndex: 52, borderRadius: "30% 30% 4% 4%", boxShadow: SH_D,
          background: `linear-gradient(164deg, ${ROBE2} 0%, ${ROBE} 46%, #0D1119 100%)` }}>
          {/* the fall of the cloth — three folds, so it is cloth and not a slab */}
          {[0, 1, 2].map(i => (
            <div key={"fd" + i} style={{ position: "absolute", left: 62 + i * 72, top: 62,
              width: 26, height: 160, borderRadius: 13,
              background: `linear-gradient(90deg,${hexa("#4A5570", 0.5)},${hexa("#0A0E15", 0.3)})` }} />
          ))}
        </div>
        {/* the white collar bands, the one bright note on him */}
        {[0, 1].map(i => (
          <div key={"bd" + i} style={{ position: "absolute", left: 744 + i * 30, top: GY - 206,
            width: 23, height: 70, borderRadius: 4, zIndex: 58,
            background: `linear-gradient(180deg,#FBF8EE,#CFC8B6)` }} />
        ))}
        <Hero f={f} x={760} y={GY} size={452} z={54} costume={{ prof: 1 }}
          stern={1} gaze={-0.55} act={3} />
        <Wig x={760} y={GY - 452 * 0.86} s={452 / 236} z={60} />
        <Contact x={760} y={GY + 6} w={368} o={0.55} z={45} />
      </div>

      {/* his arm reaching across, holding the glass out over the little one */}
      <Forearm x0={664 + jx} y0={GY - 196 + jy} x1={392 + sway + jx * 0.42}
        y1={glassY + 150 + jy * 0.42} w={42} c={ROBE2} z={56} />

      {/* the small one, beaming down the lens, holding the claim up */}
      <Hero f={f} x={222} y={GY} size={238} z={54} costume={{ constr: 1 }}
        cheer={1} act={2} gaze={0} />
      <Forearm x0={274} y0={GY - 138} x1={340} y1={BRIEF_Y + 24} w={22} z={56} />
      <Contact x={222} y={GY + 4} w={214} o={0.5} z={44} />
      <Gold x={370} y={BRIEF_Y} w={192} h={62} rot={-7} z={58} />

      {/* ⭐⭐ THE GLASS. Inside it, the same object is bare scaffolding. */}
      <Glass x={392 + sway + jx * 0.42} y={glassY + jy * 0.42} r={158} f={f} z={70} />

      {DROP.slice(0, step).map((at, i) => (
        <Ring key={"rg" + i} x={392} y={glassY + 150} f={f} at={at} c="#EAF2FF" z={69} />
      ))}
    </ColdCourt>
  );
};

/** The glass: a bright rim, a cold lens, and INSIDE it the truth — the same
    gold slab as an empty frame with loose ends hanging out of it. ⛔ The reveal
    has to be INSIDE the disc and nowhere else; the moment the room outside also
    changes, the glass stops being the instrument and becomes a filter. */
const Glass: React.FC<{ x: number; y: number; r: number; f: number; z?: number }> =
  ({ x, y, r, f, z = 70 }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
    zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden",
      border: `16px solid #C9CFD8`, boxSizing: "border-box",
      boxShadow: `${SH_D}, inset 0 0 46px ${hexa("#0B0F14", 0.75)}`,
      background: `linear-gradient(168deg,#141A22 0%,#0A0E13 100%)` }}>
      {/* the true state of the work: an empty frame and loose ends */}
      <div style={{ position: "absolute", left: r * 0.32, top: r * 0.72, width: r * 1.34,
        height: r * 0.56, border: `5px dashed ${hexa("#7FD4FF", 0.85)}`, borderRadius: 5 }} />
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{ position: "absolute", left: r * (0.42 + i * 0.30),
          top: r * (1.26 + (i % 2) * 0.14), width: 4, height: r * (0.30 + (i % 3) * 0.12),
          background: hexa("#7FD4FF", 0.7),
          transform: `rotate(${(i % 2 ? 1 : -1) * (14 + i * 6)}deg)` }} />
      ))}
      {[0, 1, 2].map(i => (
        <div key={"bx" + i} style={{ position: "absolute", left: r * (0.40 + i * 0.42),
          top: r * 0.36, width: r * 0.32, height: r * 0.24,
          border: `4px solid ${hexa("#7FD4FF", 0.5)}`, borderRadius: 4 }} />
      ))}
      <div style={{ position: "absolute", left: -r * 0.2, top: -r * 0.1, width: r * 1.1,
        height: r * 0.8, borderRadius: "50%", background: hexa("#EAF2FF", 0.16),
        filter: "blur(10px)" }} />
    </div>
    <div style={{ position: "absolute", left: r * 0.86, top: r * 1.88, width: 34, height: 168,
      borderRadius: 17, zIndex: -1, boxShadow: SH,
      background: `linear-gradient(90deg,#8A6234,#4E351A 60%,#6B4A26)` }} />
  </div>
);

/* =========================================================================
   B · `cold` — THE ROUND-7 STACK, RESTAGED.

   Same shot Alex could already read; the only change is the value structure.
   The tower stays gold because [[the villain is not ugly]] — in a cool room
   against a black gallery band it is now the one hot thing in frame instead of
   one more warm object among warm objects.
   ====================================================================== */
const LURCH = [7, 19, 32, 46, 61, 73];
const SHED = [7, 14, 21, 28, 35, 42, 50, 58, 66, 73];
const NSLAB = 15;

export const Open6Cold: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const gone = LURCH.filter(a => f >= a).length;
  const tip = -LURCH.reduce((a, at) =>
    a + E(f, at, at + 5, 0, 4.9, IN_Q) - E(f, at + 5, at + 13, 0, 0.7, OUT), 0);
  const shake = LURCH.reduce((a, at) =>
    a + (f >= at && f < at + 8 ? Math.sin((f - at) * 2.3) * 9 * (1 - (f - at) / 8) : 0), 0)
    + Math.sin(f / 3.4) * (1.6 + gone * 0.9) + Math.sin(f / 1.9) * (0.9 + gone * 0.5);

  return (
    <ColdCourt dur={dur} f={f}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 50,
        transformOrigin: `690px ${GY}px`, transform: `rotate(${tip}deg)` }}>
        {Array.from({ length: NSLAB }, (_, i) => {
          const creep = -(i * i * 1.05) - gone * i * 2.4;
          return (
            <Gold key={"sl" + i} x={690 + creep + shake * (i / NSLAB)} y={GY - 34 - i * 60}
              w={228 - i * 4} h={58} rot={tip * 0.2 + creep * 0.03} z={52 + i} />
          );
        })}
      </div>
      {SHED.map((at, i) => {
        if (f < at) return null;
        const y0 = 88 + i * 22, rest = GY - 20 - (i % 4) * 22, T = 34;
        const k = Math.min(1, (f - at) / T);
        const sy = y0 + (rest - y0) * k * k;
        const sx = 636 - (300 + i * 14) * k - Math.max(0, f - at - T) * 4.6;
        const down = k >= 1;
        return (
          <React.Fragment key={"sd" + i}>
            <Gold x={sx} y={sy} w={212 - (i % 5) * 8} h={54}
              rot={down ? -6 + (i % 3) * 9 : -14 - k * 300 * (i % 2 ? 1 : -1)} z={70 + i} />
            <Fall x={sx} y={sy + 26} w={200} f={f} at={at} n={7} z={69} c="#D6CDB6" rate={1.3} />
            {down ? <Puff x={sx} y={rest} f={f} at={at + T} c="#E4EAF2" z={71} /> : null}
          </React.Fragment>
        );
      })}
      {LURCH.slice(0, gone).map((at, i) => (
        <React.Fragment key={"sp" + i}>
          <Puff x={676 - i * 30} y={GY - 90 - i * 84} f={f} at={at} c="#E4EAF2" z={64} />
          <Fall x={676 - i * 30} y={GY - 90 - i * 84} w={250} f={f} at={at} n={7} z={49}
            c="#D6CDB6" rate={1.2} />
        </React.Fragment>
      ))}
      <Contact x={684} y={GY + 6} w={340} o={0.55} z={45} />

      {/* ⛔ B's value spread also came from the tinted crowd. It comes from the
          BENCH now — a court's own joinery, cropped by the frame edge, which is
          the depth cue reel 94's audit asks for anyway. */}
      <div style={{ position: "absolute", left: 706, top: GY - 236, width: 380, height: 300,
        zIndex: 78, boxShadow: SH_D,
        background: `linear-gradient(168deg,#3A2A24 0%,${BENCH} 54%,#120C0B 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 380, height: 26,
          background: `linear-gradient(180deg,#6E5044,#3A2A24)` }} />
        {[0, 1].map(i => (
          <div key={i} style={{ position: "absolute", left: 34 + i * 176, top: 66, width: 138,
            height: 168, borderRadius: 4, border: `7px solid ${hexa("#5A423A", 0.9)}` }} />
        ))}
      </div>
      <Hero f={f} x={252} y={GY} size={296} z={56} costume={{ constr: 1 }}
        cheer={1} act={2} gaze={0} />
      <Forearm x0={312} y0={GY - 168} x1={382} y1={GY - 292} w={25} z={58} />
      <Contact x={252} y={GY + 4} w={262} o={0.5} z={44} />
      <Gold x={414} y={GY - 306} w={192} h={60} rot={-7} z={60} />
    </ColdCourt>
  );
};

export const OPENS6: Record<Open6Id, React.FC<SP>> = {
  bench: Open6Bench, cold: Open6Cold,
};
