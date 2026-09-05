import React from "react";
import { useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Contact, Ring, Puff, Sweat, Fall, Hero, Crew, Forearm, mono, Motes,
  Scene, Cam, Edge, Beam, Pool, asPlace,
  R, GY, BAND_Y, SAFE3, CLAYD, GOLD, GREEN, SODIUM,
} from "./JudgeWorld";
import { Wig } from "./JudgeProps";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 11.  ⛔ THE SHOT ALEX ASKED FOR, BUILT LITERALLY.

   THE NOTE: *"lets do like a big judge scene then it like rejects someone... a
   prisoner at the stand and a big judge in the screen then like slams the gavel."*

   ⭐ TAKE IT LITERALLY. That is a complete shot — two characters, a power gap,
   one enormous event and a verdict — and it satisfies every rule this reel has
   been failing one at a time, which is why it was worth ten rounds of my own
   ideas to arrive at somebody else's:

     BOSS's composition   a colossal authority figure and a small Claude, which
                          is the frame Alex has approved twice before.
     an ARRIVAL           the gavel LANDS ([[THE-OPEN]]: a before state, a
                          trigger, travel, and an arrival that costs something).
     the SENTENCE         `REJECTED` slams across his gold `DONE`. Muted, a
                          stranger reads "his work got thrown out" instantly.
     ONE BIG WORD         the stamp is 470px wide, the way OX sets `$0`.
     a QUIET ROOM         soft pale court; the robe and the bench carry the dark.
     the WITHHELD thing   what he does about it. That is the other 28 seconds.

   ⛔ And the character rules hold: the judge is a Claude on the house rig in a
   ROBE and this reel's own `Wig` — the dark mass is CLOTH AND FURNITURE, never
   a tinted sprite ([[feedback_eyecatch_is_value_structure]]).

     f0-14   he is in the dock holding his gold DONE up, grinning at the lens.
             The gavel is already up. You know exactly what is coming.
     f14-28  the windup — it goes HIGHER, and he still hasn't noticed.
     f28-33  it comes down. 300px of travel in five frames.
     f33     ⭐ SLAM. The whole frame jolts, the block rings, dust off the bench.
     f38     `REJECTED` slams across the gold DONE at 2.4x and settles.
     f44-79  the DONE cracks and drops out of his hands. He is still smiling.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open9Id = "gavel";

export const OPEN9_BANDS: Record<Open9Id, { big: string; hot: string }> = {
  gavel: { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
};

const SLAM = 33, STAMP = 38;
const PIV_X = 880, PIV_Y = 500;        // the judge's fist, outboard of his head
const BLOCK_X = 600, BLOCK_Y = 640;    // the strike block on the desk
const ARM = 300;                       // handle length; the head sits at -ARM
/* ⛔ SIZE THE CHARACTER TO FIT. At 430 on a bench his wig sat behind the header
   pill and only the side curls showed — the same "two pale horns" bug as the
   last two builds. wig top = heroY - 1.267*size and it must clear ~160. */
const JSIZE = 510, JY = 706;
/* ⛔⛔ AND THE `GY - size*0.86` FORMULA IS NOT THE ANSWER — it is what produced
   "two pale horns" three builds running. Measured off the render: the cap lands
   ~100px above the head at this scale. The head sits at `y - 0.545*size`, so the
   wig anchor that actually seats on it is `y - 0.58*size`, and the cover lesson
   says it must be WIDER than the head, hence the 1.06. */
const WIG_Y = JY - JSIZE * 0.62, WIG_S = (JSIZE / 236) * 0.92;
const JX = 742;

/** ⭐ THE COURT, DRAWN PROPERLY. The note was *"background more detailed, more
    polished, very good coloring"* — and the constraint that came before it is
    still live: [[feedback_hook_simplicity]], a hook is one subject in a room
    that does not compete. Those are not in conflict. **DETAIL AND CONTRAST ARE
    DIFFERENT DIALS.** Everything here is genuinely built — stiles and rails
    with real mouldings, a mullioned clerestory, a carved crest, turned
    balusters, boards that converge — and all of it sits inside a narrow warm
    value band so the gold, the red and the two faces stay the only things with
    a hard edge and a hot colour. */
const Court: React.FC<{ children: React.ReactNode; dur: number; f: number; jolt: number }> =
  ({ children, dur, f, jolt }) => {
  const p = asPlace("dock");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.34} glow={hexa("#FFF3DC", 0.10)}>
      <Cam s={1.0} z={1}>
        {/* ---- plaster above the panelling, and the light falling down it ---- */}
        <div style={{ position: "absolute", left: -60, top: 0, width: 1140, height: 300,
          zIndex: 3, background: `linear-gradient(180deg,#FCF7EC 0%,#F0E6D4 58%,#E2D5BE 100%)` }} />
        {/* ---- THE CLERESTORY: five mullioned lights, and they are the key ---- */}
        {[0, 1, 2, 3, 4].map(i => {
          const x = -6 + i * 212;
          return (
            <React.Fragment key={"w" + i}>
              <div style={{ position: "absolute", left: x, top: 22, width: 158, height: 194,
                zIndex: 4, borderRadius: "78px 78px 4px 4px", boxShadow: `0 10px 30px ${hexa("#FFF6E2", 0.5)}`,
                background: `linear-gradient(180deg,#FFFFFF 0%,#EAF1FA 46%,#D8E4F2 100%)` }} />
              {[0, 1].map(k => (
                <div key={k} style={{ position: "absolute", left: x + 50 + k * 54, top: 30,
                  width: 7, height: 186, zIndex: 5, background: hexa("#9C8464", 0.55) }} />
              ))}
              {[0, 1, 2].map(k => (
                <div key={"h" + k} style={{ position: "absolute", left: x + 4, top: 74 + k * 46,
                  width: 150, height: 6, zIndex: 5, background: hexa("#9C8464", 0.45) }} />
              ))}
              <div style={{ position: "absolute", left: x - 12, top: 12, width: 182, height: 214,
                zIndex: 3, borderRadius: "90px 90px 5px 5px",
                background: `linear-gradient(180deg,#B49670,#8A6E4E)` }} />
            </React.Fragment>
          );
        })}

        {/* the cool daylight the clerestory throws onto the wall below it */}
        <div style={{ position: "absolute", left: -60, top: 216, width: 1140, height: 120,
          zIndex: 6, background: `linear-gradient(180deg,${hexa("#EAF2FF", 0.62)},${hexa("#EAF2FF", 0)})` }} />
        {/* ---- THE PANELLING: stiles, rails and a real moulded panel each ---- */}
        <div style={{ position: "absolute", left: -60, top: 236, width: 1140, height: 26,
          zIndex: 7, background: `linear-gradient(180deg,#C9A87C 0%,#8A6844 60%,#6E5234 100%)` }} />
        <div style={{ position: "absolute", left: -60, top: 262, width: 1140, height: 330,
          zIndex: 6, background: `linear-gradient(180deg,#A88052 0%,#8A6844 52%,#705436 100%)` }} />
        {Array.from({ length: 7 }, (_, i) => {
          const x = -30 + i * 166;
          return (
            <React.Fragment key={"pn" + i}>
              <div style={{ position: "absolute", left: x, top: 282, width: 132, height: 258,
                zIndex: 7, background: `linear-gradient(160deg,#9C7850,#7A5C3C)`,
                boxShadow: `inset 2px 2px 0 ${hexa("#B08A5E", 0.55)}, inset -2px -2px 0 ${hexa("#3E2C1C", 0.6)}` }} />
              <div style={{ position: "absolute", left: x + 16, top: 298, width: 100, height: 226,
                zIndex: 8, background: `linear-gradient(160deg,#B08A5E,#8A6844)`,
                boxShadow: `inset -2px -2px 0 ${hexa("#B08A5E", 0.5)}, inset 2px 2px 0 ${hexa("#3E2C1C", 0.55)}` }} />
            </React.Fragment>
          );
        })}
        <div style={{ position: "absolute", left: -60, top: 556, width: 1140, height: 22,
          zIndex: 9, background: `linear-gradient(180deg,#E0BC8C 0%,#8A6844 100%)` }} />
        {/* ⭐ ONE GREEN: a baize rail runs the width of the court. It is the only
            cool-saturated thing in the set and it stops the room reading brown. */}
        <div style={{ position: "absolute", left: -60, top: 484, width: 1140, height: 20,
          zIndex: 11, background: `linear-gradient(180deg,#2E6E4E,#1C4632)` }} />
        <div style={{ position: "absolute", left: -60, top: 480, width: 1140, height: 7,
          zIndex: 12, background: `linear-gradient(180deg,#E4C68C,#A8814C)` }} />

        {/* ---- THE CREST over the bench. One carved object, warm, not loud. ---- */}
        <div style={{ position: "absolute", left: 700, top: 232, width: 150, height: 168,
          zIndex: 10 }}>
          <div style={{ position: "absolute", left: 14, top: 20, width: 122, height: 132,
            borderRadius: "10px 10px 60px 60px", boxShadow: SH,
            background: `linear-gradient(168deg,#D9B478 0%,#A8814C 54%,#7A5C34 100%)` }} />
          <div style={{ position: "absolute", left: 30, top: 34, width: 90, height: 104,
            borderRadius: "8px 8px 46px 46px", background: hexa("#6E5234", 0.35) }} />
          <div style={{ position: "absolute", left: 52, top: 0, width: 46, height: 34,
            borderRadius: "22px 22px 4px 4px",
            background: `linear-gradient(180deg,#E4C68C,#A8814C)` }} />
          <div style={{ position: "absolute", left: 44, top: 62, width: 62, height: 12,
            background: hexa("#E4C68C", 0.5) }} />
          <div style={{ position: "absolute", left: 44, top: 88, width: 62, height: 12,
            background: hexa("#E4C68C", 0.35) }} />
        </div>

        {/* ---- the gallery rail behind, with turned balusters ---- */}
        <div style={{ position: "absolute", left: -60, top: 500, width: 1140, height: 14,
          zIndex: 11, background: `linear-gradient(180deg,#B08A5E,#6E5234)` }} />
        {Array.from({ length: 22 }, (_, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: -40 + i * 52, top: 514,
            width: 13, height: 46, zIndex: 10, borderRadius: 6,
            background: `linear-gradient(90deg,#8A6844,#5E462E 55%,#7A5C3C)` }} />
        ))}

        {/* ---- THE FLOOR: boards that converge, and a runner down the middle ---- */}
        <div style={{ position: "absolute", left: -60, top: 578, width: 1140, height: 300,
          zIndex: 12, background: `linear-gradient(180deg,#EED7A8 0%,#CCB283 42%, #AC9268 100%)` }} />
        {Array.from({ length: 15 }, (_, i) => (
          <div key={"fb" + i} style={{ position: "absolute", left: -140 + i * 106, top: 578,
            width: 3, height: 300, zIndex: 13, opacity: 0.30,
            transformOrigin: "50% 0%", transform: `rotate(${(i - 7) * 3.1}deg)`,
            background: "#5E4630" }} />
        ))}
        {[0, 1, 2].map(i => (
          <div key={"fh" + i} style={{ position: "absolute", left: -60, top: 618 + i * 74,
            width: 1140, height: 3, zIndex: 13, background: hexa("#5E4630", 0.22) }} />
        ))}
        <div style={{ position: "absolute", left: 300, top: 592, width: 420, height: 290,
          zIndex: 14, opacity: 0.55, transformOrigin: "50% 0%", transform: "perspective(600px) rotateX(2deg)",
          background: `linear-gradient(180deg,#8C3A2C 0%,#6E2C22 100%)`,
          boxShadow: `inset 0 0 0 8px ${hexa("#C98C58", 0.35)}` }} />

        <Beam x={430} y={16} top={220} bot={760} len={600} c="#FFF6DC" o={0.30} z={16} f={f} />
        <Beam x={880} y={16} top={150} bot={480} len={520} c="#FFF6DC" o={0.18} z={16} f={f} />
        <Pool x={430} y={648} w={1000} c="#FFF6E0" o={0.40} z={17} />
        <Motes x={470} y={180} w={680} h={470} n={14} f={f} z={18} c="#FFF1CE" />
        {/* the scrim: it lifts the room's blacks and drops its contrast, so the
            two characters and the gold are the only things fully present */}
        <div style={{ position: "absolute", left: -60, top: 0, width: 1140, height: 900,
          zIndex: 19, background: `linear-gradient(180deg, ${hexa("#F6E8CC", 0.17)} 0%, ${hexa("#EEDCBA", 0.12)} 54%, ${hexa("#E4CEA6", 0.05)} 100%)` }} />
        {/* and one pool of light where the eye is supposed to go */}
        <div style={{ position: "absolute", left: 60, top: 300, width: 900, height: 470,
          zIndex: 19, borderRadius: "50%", filter: "blur(46px)",
          background: `radial-gradient(ellipse at 46% 60%, ${hexa("#FFF6E0", 0.52)}, ${hexa("#FFF6E0", 0)} 70%)` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 20,
          transform: `translate(${jolt * 1.4}px, ${jolt * 2.6}px)` }}>
          {children}
        </div>
        <Edge side="l" c="#2A2018" w={44} z={90} top={170} />
      </Cam>
    </Scene>
  );
};


/* ⭐⭐⭐ THE WIG HAS TO BE ON HIS HEAD, NOT NEAR IT.
   `Wig` is drawn as a separate absolutely-positioned prop while `Hero` animates
   itself internally, so the head bobbed and rotated underneath a wig that never
   moved. At 470px that is not subtle — it reads as a hat glued to the air.

   ⛔ READ THE RIG BEFORE YOU DRAW GEOMETRY. `Hero` with `act={3}`, `drive=0` and
   `strain=0` resolves to k=1 and moves by exactly:
       ay = sin(f/23 + ph) * 4.6
       ar = sin(f/21 + ph) * 4.0 + sin(f/31 + ph*1.7) * 1.3
   about `transformOrigin: 50% 100%` — the FEET. Anything parented to that body
   has to use the same numbers about the same origin.

   ⭐ AND THEN THE POLISH IS THE LAG. Hair does not move WITH a head, it follows
   it. Sampling the same formula 2.5 frames in the past gives real follow-through
   for free, and the cloth gets less of it than the wig because it is heavier. */
const heroMotion = (f: number, ph = 0) => ({
  ay: Math.sin(f / 23 + ph) * 4.6,
  ar: Math.sin(f / 21 + ph) * 4.0 + Math.sin(f / 31 + ph * 1.7) * 1.3,
});


/* ⭐⭐ THE CLAIM IS A PRESSED BRASS PLACARD, not a coloured rectangle. It is the
   second thing the eye lands on and it was the flattest object in the frame:
   one fill, one word, no edges. A real one has a bevelled outer frame, a
   recessed inner field, corner rivets, a DEBOSSED word (a dark cut with a light
   edge beneath it, which is what makes type look stamped INTO metal instead of
   printed on it), a pressed wax seal and a green tick — the storyboard's own
   description of this object, finally drawn. */
const Placard: React.FC<{ x: number; y: number; w: number; h: number; rot?: number;
  z?: number }> = ({ x, y, w, h, rot = 0, z = 53 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    transform: `rotate(${rot}deg)`, borderRadius: h * 0.09, boxShadow: SH_D,
    background: `linear-gradient(158deg, ${mxh(GOLD, 0.62)} 0%, ${mxh(GOLD, 0.10)} 30%, ${GOLD} 58%, ${dkh(GOLD, 0.34)} 100%)` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: h * 0.09,
      boxShadow: `inset ${h * 0.035}px ${h * 0.035}px 0 ${hexa("#FFF4CE", 0.75)}, inset ${-h * 0.035}px ${-h * 0.035}px 0 ${hexa("#6E5116", 0.55)}` }} />
    <div style={{ position: "absolute", left: h * 0.14, top: h * 0.14,
      width: w - h * 0.28, height: h - h * 0.28, borderRadius: h * 0.06, overflow: "hidden",
      background: `linear-gradient(168deg, ${dkh(GOLD, 0.13)}, ${mxh(GOLD, 0.16)})`,
      boxShadow: `inset 0 ${h * 0.03}px ${h * 0.06}px ${hexa("#5E4410", 0.45)}` }}>
      {/* guilloche: the fine engine-turned rules that make a certificate a
          certificate. Cheap, and it is the difference between "gold rectangle"
          and "a document somebody issued." */}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, top: h * (0.06 + i * 0.075),
          width: w, height: 1.5, background: hexa("#6E5116", 0.16) }} />
      ))}
      <div style={{ position: "absolute", left: h * 0.05, top: h * 0.05,
        width: w - h * 0.38, height: h - h * 0.38, borderRadius: h * 0.04,
        border: `2px solid ${hexa("#6E5116", 0.34)}` }} />
    </div>
    {[[0.06, 0.16], [0.94, 0.16], [0.06, 0.84], [0.94, 0.84]].map(([fx, fy], i) => (
      <div key={i} style={{ position: "absolute", left: w * fx - h * 0.055, top: h * fy - h * 0.055,
        width: h * 0.11, height: h * 0.11, borderRadius: "50%",
        background: `radial-gradient(circle at 36% 30%, #FBEEC2, #8A6A22)` }} />
    ))}
    <div style={{ position: "absolute", left: -w * 0.07, top: h * 0.245, width: w, textAlign: "center",
      ...mono(h * 0.46, 800), letterSpacing: w * 0.016, color: hexa("#FFF0C4", 0.6) }}>DONE</div>
    <div style={{ position: "absolute", left: -w * 0.07, top: h * 0.23, width: w, textAlign: "center",
      ...mono(h * 0.46, 800), letterSpacing: w * 0.016, color: "#4A3406" }}>DONE</div>
    <div style={{ position: "absolute", left: w - h * 0.60, top: h * 0.28, width: h * 0.42,
      height: h * 0.42, borderRadius: "50%", boxShadow: SH,
      background: `radial-gradient(circle at 36% 30%, #D2513A, #7E2016)` }}>
      <div style={{ position: "absolute", left: "24%", top: "44%", width: "24%", height: "10%",
        borderRadius: 2, background: "#F4E0C8", transform: "rotate(46deg)" }} />
      <div style={{ position: "absolute", left: "36%", top: "28%", width: "44%", height: "10%",
        borderRadius: 2, background: "#F4E0C8", transform: "rotate(-44deg)" }} />
    </div>
  </div>
);

/* ⭐⭐ AND THE VERDICT IS A RUBBER-STAMP IMPRESSION. A crisp bordered box reads as
   a UI badge; a stamp reads as INK — a double rule, uneven coverage where it did
   not take, and the whole thing off-square. */
const Stamp: React.FC<{ x: number; y: number; w: number; h: number; rot?: number;
  k?: number; o?: number; z?: number }> =
  ({ x, y, w, h, rot = 0, k = 1, o = 1, z = 74 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    opacity: o, transform: `rotate(${rot}deg) scale(${k})`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: h * 0.07,
      border: `${h * 0.075}px solid #A81C16`, boxSizing: "border-box", opacity: 0.92 }} />
    <div style={{ position: "absolute", left: h * 0.13, top: h * 0.13,
      width: w - h * 0.26, height: h - h * 0.26, borderRadius: h * 0.05,
      border: `${h * 0.028}px solid #A81C16`, boxSizing: "border-box", opacity: 0.7 }} />
    <div style={{ position: "absolute", left: 0, top: h * 0.20, width: w, textAlign: "center",
      ...mono(h * 0.46, 800), letterSpacing: w * 0.018, color: "#A81C16", opacity: 0.94 }}>REJECTED</div>
    {[[0.14, 0.22, 0.20, 0.16], [0.52, 0.10, 0.13, 0.13], [0.34, 0.68, 0.24, 0.15],
      [0.78, 0.52, 0.15, 0.20]].map(([fx, fy, fw, fh], i) => (
      <div key={i} style={{ position: "absolute", left: w * fx, top: h * fy,
        width: w * fw, height: h * fh, borderRadius: "50%",
        background: hexa("#F6E9CF", 0.34), filter: "blur(2px)" }} />
    ))}
  </div>
);

export const Open9Gavel: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();

  /* the windup goes UP before it comes down — the anticipation is free and it is
     the only thing the shot has to promise. */
  /* ⭐ THE WINDUP IS THE ANTICIPATION AND IT IS FREE: it goes UP first, 26deg
     of extra lift over 15 frames, and he still has not looked at it. */
  /* ⭐⭐⭐ IT HAPPENS TWICE, AND THE THIRD IS ALREADY COMING UP.
     The note: *"after the gavel lands there's not much more to the animation."*
     True — one strike at f33 left a full second of aftermath and nothing to
     watch, which is [[feedback_the_tail_goes_still]] again. The fix is not
     decoration in the tail; it is a SECOND EVENT, and the right second event is
     the one this whole reel is about: **the loop.** He is rejected, he
     immediately holds up another one, it is rejected faster, and at f76 he is
     lifting a third. Nothing else says "this runs until the work survives"
     in two and a half seconds. */
  const STRIKES = [{ up0: 8, top: 27, hit: SLAM }, { up0: 42, top: 58, hit: 63 }];
  const REST = 14, STRUCK = -26;
  let ang = REST;
  for (const st of STRIKES) {
    if (f < st.up0) break;
    ang = f <= st.top ? E(f, st.up0, st.top, REST, 70, OUT)
        : f <= st.hit ? E(f, st.top, st.hit, 70, STRUCK, IN_Q)
        : STRUCK + Math.sin((f - st.hit) * 1.7) * 15 * Math.exp(-(f - st.hit) / 6);
  }
  const lastHit = STRIKES.filter(st => f >= st.hit).slice(-1)[0];
  const raise = ang;
  /* the body now, and the wig 2.5 frames behind it, plus a whip on the slam */
  const bodyM = heroMotion(f);
  const wigM = heroMotion(f - 2.5);
  const whip = !lastHit ? 0 : Math.sin((f - lastHit.hit) * 1.55) * 6.5 * Math.exp(-(f - lastHit.hit) / 7);
  const clothM = heroMotion(f - 4.5);
  const lean = STRIKES.reduce((a, st) => a + (f < st.hit - 7 ? 0 : E(f, st.hit - 7, st.hit, 0, 0.16, IN_Q) - E(f, st.hit + 4, st.hit + 22, 0, 0.13, OUT)), 0);
  const squash = !lastHit ? 0 : E(f, lastHit.hit, lastHit.hit + 3, 0, 1, OUT) - E(f, lastHit.hit + 3, lastHit.hit + 12, 0, 1, OUT);
  const jolt = lastHit ? Math.sin((f - lastHit.hit) * 1.9) * 15 * Math.exp(-(f - lastHit.hit) / 6) : 0;

  const drop = E(f, 48, 74, 0, 1, IN_Q);
  /* one entry per pass of the loop: when it comes up, when it is condemned,
     when it is knocked away. The third never gets stamped inside the hook. */
  const ROUNDS = [
    { up: -40, stamp: 38, fly: 44 },
    { up: 50,  stamp: 67, fly: 73 },
    { up: 77,  stamp: 999, fly: 999 },
  ];
  /* one source of truth for where the claim is, so the verdict cannot drift */
  const PW = 356, PH = 142, SW = 392, SH2 = 124;
  const wob = f < SLAM ? Math.sin(f / 2.2) * raise * 0.05 : 0;
  const wobR = f < SLAM ? Math.sin(f / 1.9) * raise * 0.022 : 0;
  const flyX = 0, flyY = 0, spin = 0;
  const plX = 214 + wob, plY = GY - 428, plR = -6 + wobR;

  return (
    <Court dur={dur} f={f} jolt={jolt}>
      {/* ---- THE BENCH: the judge sits above everybody, and it is the dark ---- */}
      <div style={{ position: "absolute", left: 470, top: 660, width: 660, height: 200,
        zIndex: 62, boxShadow: SH_D,
        background: `linear-gradient(168deg,#8A6042 0%,#5A3C28 50%,#2E1E14 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 660, height: 16,
          background: `linear-gradient(180deg,#E0AC78,#B4805A)` }} />
        <div style={{ position: "absolute", left: 0, top: 16, width: 660, height: 11,
          background: `linear-gradient(180deg,#9A6C4A,#6E4A32)` }} />
        <div style={{ position: "absolute", left: 0, top: 27, width: 660, height: 7,
          background: hexa("#3A2418", 0.6) }} />
        {[0, 1].map(i => (
          <div key={i} style={{ position: "absolute", left: 58 + i * 316, top: 52, width: 236,
            height: 120, borderRadius: 5, border: `10px solid ${hexa("#63432F", 0.85)}` }} />
        ))}
      </div>
      {/* the strike block */}
      <div style={{ position: "absolute", left: BLOCK_X - 82, top: BLOCK_Y - 26 + squash * 7,
        width: 164, height: 46, zIndex: 63, borderRadius: 5, boxShadow: SH,
        transformOrigin: "50% 100%", transform: `scaleY(${1 - squash * 0.24}) scaleX(${1 + squash * 0.09})`,
        background: `linear-gradient(180deg,#C08A52,#6E4A2E)` }} />

      {/* ---- THE JUDGE. A Claude on the house rig, in the robe. ---- */}
      {/* the robe: heaviest, so it lags most and swings least */}
      <div style={{ position: "absolute", inset: 0, zIndex: 56,
        transformOrigin: `${JX}px ${JY}px`,
        transform: `translateY(${clothM.ay * 0.8}px) rotate(${clothM.ar * 0.62}deg)` }}>
        <div style={{ position: "absolute", left: 540, top: 486, width: 404, height: 240,
          borderRadius: "36% 36% 0 0", boxShadow: SH_D, overflow: "hidden",
          background: `linear-gradient(164deg,#39435A 0%,#1E2534 54%,#0D111A 100%)` }}>
          {/* ⭐ the dominant figure gets the most drawing: shoulder seam, four
              falls of cloth, and the ONE hot accent in the frame sits on HIM —
              which is what makes the ranking unarguable rather than merely large. */}
          <div style={{ position: "absolute", left: 0, top: 46, width: 404, height: 9,
            background: hexa("#5A6880", 0.5) }} />
          {[0, 1, 2, 3].map(i => (
            <div key={"fd" + i} style={{ position: "absolute", left: 44 + i * 84, top: 58,
              width: 26, height: 182, borderRadius: 13,
              background: `linear-gradient(90deg,${hexa("#4E5C78", 0.55)},${hexa("#0A0E15", 0.35)})` }} />
          ))}
          <div style={{ position: "absolute", left: -30, top: 96, width: 470, height: 42,
            transform: "rotate(-9deg)", boxShadow: SH,
            background: `linear-gradient(180deg,#C4342A,#7E1C16)` }} />
          <div style={{ position: "absolute", left: -30, top: 92, width: 470, height: 7,
            transform: "rotate(-9deg)", background: hexa("#E8A08C", 0.5) }} />
        </div>
      </div>
      {/* the bands hang off the collar, so they get the body plus a little swing */}
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transformOrigin: `${JX}px ${JY}px`,
        transform: `translateY(${bodyM.ay}px) rotate(${bodyM.ar + whip * 0.5}deg)` }}>
        {[0, 1].map(i => (
          <div key={"bd" + i} style={{ position: "absolute", left: 722 + i * 38, top: 496,
            width: 31, height: 92, borderRadius: 4, transformOrigin: "50% 0%",
            transform: `rotate(${Math.sin(f / 13 + i) * 2.6 + whip * 0.7}deg)`,
            background: `linear-gradient(180deg,#FBF8EE,#CFC8B6)` }} />
        ))}
      </div>
      <Hero f={f} x={742} y={JY} size={JSIZE} z={54} costume={{ prof: 1 }}
        stern={1} gaze={-0.7} act={3} drive={-lean} reach={120} flip />
      {/* ⭐ THE WIG, PARENTED TO THE BODY AND TRAILING IT */}
      <div style={{ position: "absolute", inset: 0, zIndex: 52,
        transformOrigin: `${JX}px ${JY}px`,
        transform: `translateY(${wigM.ay}px) rotate(${wigM.ar}deg)` }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: `${JX}px ${WIG_Y - 40}px`,
          transform: `rotate(${whip}deg)` }}>
          <Wig x={JX} y={WIG_Y} s={WIG_S} z={52} />
        </div>
      </div>

      {/* ---- THE GAVEL. 300px of handle and a 200px head. ---- */}
      <div style={{ position: "absolute", left: PIV_X, top: PIV_Y, width: 0, height: 0,
        zIndex: 70, transform: `rotate(${ang}deg)` }}>
        <div style={{ position: "absolute", left: -ARM, top: -18, width: ARM, height: 36,
          borderRadius: 18, boxShadow: SH,
          background: `linear-gradient(180deg,#C89258,#6E4A2E)` }} />
        <div style={{ position: "absolute", left: -ARM - 92, top: -66, width: 184, height: 132,
          borderRadius: 15, boxShadow: SH_D,
          background: `linear-gradient(168deg,#9A6844 0%,#63402A 52%,#33200E 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 38, width: 184, height: 24,
            background: hexa("#D9AE78", 0.6) }} />
        </div>
      </div>
      <Forearm x0={824} y0={566} x1={PIV_X - 10} y1={PIV_Y + 12} w={40} c="#2C3346" z={69} />

      {/* ---- THE PRISONER IN THE DOCK ---- */}
      <Hero f={f} x={192} y={GY - 60} size={218} z={50} costume={{ constr: 1 }}
        cheer={f < SLAM ? 1 : 0} shock={f >= SLAM ? Math.min(1, 0.5 + drop * 0.5) : 0}
        act={2} gaze={0}
        lift={f < SLAM ? 0 : E(f, SLAM, SLAM + 4, 0, 26, OUT) - E(f, SLAM + 4, SLAM + 13, 0, 26, IN_Q)}
        strain={f >= SLAM ? 0.24 : 0} />
      {f >= SLAM ? <Puff x={192} y={GY - 50} f={f} at={SLAM + 12} c="#E4D8BC" z={51} /> : null}
      <Forearm x0={232} y0={GY - 196} x1={296 - drop * 90} y1={GY - 340 + drop * 96} w={21} z={52} />
      {/* his gold DONE, and then the verdict on top of it */}
      {/* ⭐ THE LOOP, drawn as three passes of the same object */}
      {ROUNDS.map((rd, i) => {
        if (f < rd.up) return null;
        const rise = E(f, rd.up, rd.up + 7, 0, 1, BACK);       // shoved up into shot
        const gone = f < rd.fly ? 0 : Math.min(1, (f - rd.fly) / 15);
        const g2 = gone * gone;
        const fx = -(250 + i * 40) * g2, fy = 330 * g2 + (1 - rise) * 190;
        const sp = 190 * gone;
        const x = plX + fx, y = plY + fy, r = plR - sp - (1 - rise) * 16;
        return (
          <React.Fragment key={"rd" + i}>
            <Placard x={x} y={y} w={PW} h={PH} z={53 + i} rot={r} />
            {f >= rd.stamp ? (
              <Stamp x={x + (PW - SW) / 2} y={y + (PH - SH2) / 2} w={SW} h={SH2}
                rot={r + 8} k={E(f, rd.stamp, rd.stamp + 7, 1.42, 1, IN_Q)}
                o={E(f, rd.stamp, rd.stamp + 3, 0, 1, OUT)} z={74 + i} />
            ) : null}
            {f >= rd.stamp && f < rd.stamp + 14 ? (<>
              <Ring x={x + PW / 2} y={y + PH / 2} f={f} at={rd.stamp} c="#F0C2B4" z={75} />
              <Fall x={x + PW / 2} y={y + PH * 0.8} w={320} f={f} at={rd.stamp} n={8} z={73}
                c="#C8B896" rate={1.3} />
            </>) : null}
            {gone > 0 && gone < 1 ? (
              <Fall x={x + PW / 2} y={y + PH / 2} w={260} f={f} at={rd.fly} n={6} z={73}
                c="#C8B896" rate={1.2} />
            ) : null}
          </React.Fragment>
        );
      })}
      {/* ⭐ THE VERDICT. 470px wide, the way OX sets `$0`, and it is the one hot
          saturated thing in the frame. */}

      {/* the dock front, cropping him at the waist — a real dock, and the depth cue */}
      <div style={{ position: "absolute", left: 10, top: GY - 96, width: 400, height: 250,
        zIndex: 78, boxShadow: SH_D,
        background: `linear-gradient(168deg,#96683F 0%,#63432B 54%,#33200E 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 400, height: 24,
          background: `linear-gradient(180deg,#C69460,#96683F)` }} />
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", left: 26 + i * 126, top: 58, width: 96,
            height: 156, borderRadius: 4, border: `9px solid ${hexa("#6E4C34", 0.8)}` }} />
        ))}
      </div>

      {/* ---- THE STRIKE ---- */}
      {STRIKES.filter(st => f >= st.hit && f < st.hit + 22).map(st => (
        <React.Fragment key={"hit" + st.hit}>
          <Ring x={BLOCK_X} y={BLOCK_Y} f={f} at={st.hit} c="#FFE9B8" z={72} />
          <Ring x={BLOCK_X} y={BLOCK_Y} f={f} at={st.hit + 3} c="#FFE9B8" z={72} />
          <Puff x={BLOCK_X} y={BLOCK_Y - 12} f={f} at={st.hit} c="#EFE2C2" z={73} />
          <Fall x={BLOCK_X} y={BLOCK_Y} w={520} f={f} at={st.hit} n={16} z={71} c="#C8B896" rate={1.7} />
          <Fall x={BLOCK_X} y={BLOCK_Y - 20} w={300} f={f} at={st.hit + 2} n={9} z={74} c="#E4D8BC" rate={2.1} />
        </React.Fragment>
      ))}
      {false ? (<>
        <Ring x={BLOCK_X} y={BLOCK_Y} f={f} at={SLAM} c="#FFE9B8" z={72} />
        <Ring x={BLOCK_X} y={BLOCK_Y} f={f} at={SLAM + 3} c="#FFE9B8" z={72} />
        <Ring x={BLOCK_X} y={BLOCK_Y} f={f} at={SLAM + 7} c="#FFE9B8" z={72} />
        <Puff x={BLOCK_X} y={BLOCK_Y - 12} f={f} at={SLAM} c="#EFE2C2" z={73} />
        <Puff x={BLOCK_X - 90} y={BLOCK_Y - 4} f={f} at={SLAM + 2} c="#EFE2C2" z={73} />
        <Fall x={BLOCK_X} y={BLOCK_Y} w={520} f={f} at={SLAM} n={16} z={71} c="#C8B896" rate={1.7} />
        <Fall x={BLOCK_X} y={BLOCK_Y - 20} w={300} f={f} at={SLAM + 2} n={9} z={74} c="#E4D8BC" rate={2.1} />
      </>) : null}

      {drop > 0.3 ? (<>
        <Sweat x={244} y={GY - 320} f={f} at={52} n={5} z={55} />
        <Fall x={300 + flyX} y={GY - 380 + flyY} w={240} f={f} at={48} n={8} z={54}
          c="#C8B896" rate={1.3} />
      </>) : null}
    </Court>
  );
};

export const OPENS9: Record<Open9Id, React.FC<SP>> = { gavel: Open9Gavel };
