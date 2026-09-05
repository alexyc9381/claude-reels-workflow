import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Edge, Ring, Puff, Pool, Beam,
  Crew, Hero, Forearm, R, asPlace, mono, ui, GY, BAND_Y,
  CLAY, GOLD, GREEN, RED, SKY, BONE, INK, STEEL, CREAMB, SODIUM, TEAL, VIOLET,
} from "./AgWorld";
import { Room } from "./HwSets";
import {
  CrewField, HeadCount, Hatch, Gate, RANKS, slots, Bench, NearShade, HeroKey, RealMark,
  BuildLine, Station, StartSwitch, JOBS, BlastDoors, TowerFloor, TowerFrame, FLOORS,
  TheHall,
  MiniIcon,
} from "./AgProps";
import { Shots } from "./AgScenes";

/* ===========================================================================
   REEL 134 · "AGENTS" — THE HOOK CANDIDATES.  docs/THE-OPEN.md step 1.

   VO: "This GitHub repo gives you 200 AI engineers that work for you 24/7
        completely free."   0.00 -> 4.65s (140 frames)

   ⛔⛔⛔ REV 2. THE ENGINEERS ARE CLAUDE SPRITES (Alex: *"each of the ai
   engineers should be represented as claude sprites not little rectangles or
   squares"*). Rev 1 opened on a rack of 202 engraved PLATES filling column by
   column. It measured fine and it was the wrong object: a plate is a CONTAINER
   carrying one bit, and `ANIMATION-QUALITY` §5 says in its first line that
   characters stop scrolls and empty rooms do not. Two hundred ENGINEERS are two
   hundred BODIES.

   ⭐⭐⭐ THE MUTE TEST STILL GOVERNS THE SUBJECT. The line's verb is **GIVES**,
   so every candidate is a HANDOVER THAT MULTIPLIES — one small thing yields a
   crowd. What changed is what the crowd is made of.

   ⭐⭐ FRAME 0 IS BRIGHT AND NEARLY EMPTY; THE MASS IS AN EVENT
   (`feedback_eyecatch_is_value_structure`) — OX reads 143.8 and BOSS 146.0 WITH
   a huge dark hero because at frame 0 it is not in shot yet. And frame 0 is
   ANTICIPATORY: light is already spilling out of a floor hatch that has not
   opened, so the shot has promised something and withheld what it is.
   ========================================================================= */

export type HookId = "pour" | "crew" | "tower" | "line" | "board" | "dive";
type HP = { dur: number };

const Claim: React.FC<{ t: string; c?: string }> = ({ t, c = INK }) => (
  <Chip t={t} y={BAND_Y} c={c} fg="#F6F2E8" s={0.94} z={94} />
);

/** the hall every candidate is staged in, so the pick is about the MECHANISM
    and not about who got the nicer room. */
const Hall: React.FC<{ f: number; win?: [number, number, number, number] }> =
  ({ f, win = [636, 190, 292, 272] }) => {
  const p = asPlace("hall");
  return (
    <>
      {/* ⛔ THE DARKEST BAND OF FRAME 0 WAS THE CEILING, not the gate: y 0-88
          measured 104.7 against a panel mean of 136. Dark joists across the top
          of a bright hall cost the >=140 law about four points on their own, and
          no amount of floor light buys that back. A clerestory is a real thing a
          hall like this has, and it is a LIGHT rather than a shading lift. */}
      <Room p={p} f={f} bands={3} kind="house" overhead="none" rake={0.07} rakeRate={3.6}
        floorKind="boards" grit={0.6} window={{ x: win[0], y: win[1], w: win[2], h: win[3] }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 104, zIndex: 15,
        background: "linear-gradient(180deg,#FBF8EE 0%,#E4E9EE 62%,#CFD7DF 100%)" }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={"cl" + i} style={{ position: "absolute", left: 26 + i * 200, top: 12,
          width: 148, height: 74, zIndex: 16,
          background: "linear-gradient(178deg,#FFFDF4,#EFE9D6)", border: "9px solid #AEB8C2",
          boxSizing: "border-box" }} />
      ))}
      <HeroKey x={506} y={392} r={430} c="#FFF6E2" z={22} k={1.06} />
      {/* a real shaft out of that window and the pools it throws — the sanctioned
          way to clear the >=140 frame-0 law, never a lift of the dark stop */}
      <Beam x={790} y={190} top={68} bot={430} len={520} c="#FFF2CE" o={0.38} z={20} />
      <Pool x={660} y={612} w={700} c="#FFEEC6" o={0.42} z={19} />
      <Pool x={318} y={644} w={470} c="#FFEEC6" o={0.24} z={19} />
      <Pool x={506} y={460} w={900} c="#FFF6E2" o={0.30} z={19} hh={360} />
      {/* a second window on the left wall — a practical, not a shading lift */}
      <div style={{ position: "absolute", left: 62, top: 214, width: 216, height: 232,
        zIndex: 16, background: "linear-gradient(178deg,#FFFCF0 0%,#EDE6D0 100%)",
        border: "14px solid #9BA6B2", boxSizing: "border-box" }} />
      <Beam x={166} y={214} top={62} bot={400} len={470} c="#FFF2CE" o={0.32} z={20} />
      <Pool x={190} y={598} w={620} c="#FFEEC6" o={0.36} z={19} />
    </>
  );
};

/* =========================================================================
   1 · `pour` — MULTIPLICATION.  ⭐ THE PICK.
   A GitHub floor hatch bangs open and CLAUDE ENGINEERS POUR OUT, filling the
   floor rank by rank until the near rank is cropped by the bottom of the panel.
   One man at a desk becomes a workforce, and the counter says how many.

   WHY THIS ONE: it is the sentence, drawn with the right noun. The verb GIVES is
   a handover, the object is ENGINEERS, and 37 bodies travelling on arcs is the
   top row of the motion table as well as the correct picture.
   ====================================================================== */
export const HookPour: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  /* ⛔⛔⛔ REV 32 — REBUILT AGAINST reel 131 FREE'S WINNING HOOK, WHICH DOCUMENTS
     ITS OWN STRUCTURE IN `FreeHooks.tsx`. I had been measuring the winners and
     never reading them. What its comment says, verbatim:

       "MECHANISM: TOLL. A body against a machine. Reel 119 measured PULL — a
        body working against a load — beating two abstract candidates outright…
        So the hook is not 'there are five gates' (a state); it is ONE Claude
        buying one step at a time."

       "BEFORE   f0 is settled and ALREADY THE JOKE — he is mid-shove, the arm is
                 BOWED and has not moved, steam is coming off him, and the coins
                 he has already fed are heaped round his feet.
        TRIGGER  f13 … f17 it falls 96px and lands in the slot.
        TRAVEL   f19-27 … he goes through 152px — 0.52 of his own body width,
                 which clears the one-third floor. Under that it is a state change
                 and the eye cannot resolve it at 30fps on a phone.
        ARRIVAL  f27 SLAM … and it COSTS: recoil, a dust puff, a ring and chips
                 off the kerb. Then the fare counter ticks +1.
        ⛔ f48 HE LIFTS THE NEXT COIN. It does not resolve."

       "⭐ AND THE LAST THIRD IS A BODY ACTION, NOT A WAIT. The hook measured 7.89
        with 74% HOLD because after the lock he simply stood there for 21 frames."

     Every one of those is something mine got wrong:
       · my f0 was two Claudes STANDING at a shut door — a before-state with no
         joke in it, where FREE's f0 is a man losing a fight with a turnstile
       · my hero was a CROWD, where every winner is ONE body against a load
       · my whole event ran four seconds; FREE's is trigger f13, arrival f27
       · my arrival COST NOTHING — no recoil, no dust, no consequence
       · my last two thirds was a WAIT (a crowd walking) — the exact 74%-HOLD
         failure FREE names and fixes with a body action

     ⭐ SO: ONE CLAUDE, CRUSHED UNDER THE WORK, AT FRAME 0.
       BEFORE   f0 he is already buckling under a leaning stack of job tickets
                twice his height, knees bent, steam off him, finished pages
                heaped round his feet. The joke is legible with no narration.
       TRIGGER  f14 he reaches past it and slaps the gate release.
       TRAVEL   f18-34 the doors run and the first engineers come through.
       ARRIVAL  f34 SLAM — they take the stack off him. Recoil, dust, a ring,
                pages knocked loose. The counter starts.
       BODY     f34-80 he STRAIGHTENS, unbends, and stretches — the last third is
                an action, not a wait.
       ⛔ f96+  more are still coming through the doors. It does not resolve. */
  const GROUND = 700;
  /* ⛔ FIRST BUILD PUT HIM AT 430 AND HE SWALLOWED THE SET. FREE's hero is a
     286px body — its own comment measures travel as "118px against a 286px
     body". At 430 he covered the doors, the load sat on his head instead of
     towering over him, and frame 0 was a giant face. 300, and further left. */
  const HX = 248;                                  /* the hero's own x         */
  /* ⛔ FREE's beat clock is SHOVE 0 · GIVE 13 · DROP 17 · REL 19 · LOCK 27 —
     the whole event is over by f27, 0.9s. Mine ran to f34 and the before-state
     measured 2.25 / 2.59 / 3.84 for its first second because a single body
     straining is a small sinusoid. Compressed to match, AND the before is given
     something that MOVES: pages slipping off the top of the stack and fluttering
     down past him, which is also the joke restated once a beat. */
  const SHOVE = 0, GIVE = 10, OPEN = 14, LOCK = 26;
  /* the stack BOWS under him and does not move — weight is deformation */
  const strainCycle = f < GIVE ? 0.62 + Math.sin(f / 2.4) * 0.30 : 0;
  const bow = strainCycle * 9;
  /* ⛔ AN `IO` EASE IS SLOWEST AT ITS START. The doors opened on IO, so f14-20 —
     the four frames straight after the trigger — barely moved, and that measured
     as the last dip in the hook at 2.33. `OUT` starts fast: the gate JUMPS the
     moment he hits the release, which is also how a released gate behaves. */
  const part = E(f, OPEN, 42, 0, 1, OUT);
  /* the load: on him until the arrival, then taken away */
  /* ⛔ the stack used to FADE OUT over 16 frames. A fade is not a payoff — the
     load has to be visibly TAKEN, slab by slab, at the rate the chain is moving
     it, so the before-state resolves in front of you across the whole beat. */
  const load = 1 - E(f, LOCK - 2, 100, 0, 1, LIN);
  /* his body: crushed -> recoil -> straightening. THE LAST THIRD IS AN ACTION. */
  const recoil = f > LOCK ? Math.sin((f - LOCK) * 0.7) * Math.exp(-(f - LOCK) / 5.5) * 9 : 0;
  const rise = (1 - load) * 0.85 + E(f, 96, 112, 0, 0.15, IO);
  const crush = load * (18 + strainCycle * 8);
  const count = E(f, LOCK - 6, 106, 0, 1, LIN);
  const NP = 26;
  return (
    <Scene p={asPlace("linehall")} slug="" push={[0, dur, 1.13]} vig={0.32}>
      {/* ⛔⛔⛔ REV 38, ALEX: *"it needs to be a completely different scene here,
          not just the Claude sprites standing around for that part."* Three rounds
          running I answered "make 1s more interesting" with a CAMERA MOVE on the
          same set — a punch, a closer punch, a medium. **A reframe is not a
          scene.** The set never changed, so neither did his note.

          ⭐ At 1.0s the VO is on the words "AI ENGINEERS", and the honest picture
          for that is not two people at a door, it is HOW MANY THERE ARE. f30-60
          cuts INSIDE to a hall in one-point perspective — desks running away to a
          vanishing point, every one occupied, lights receding overhead — then cuts
          back out and they come through the doors. New location, new geometry, new
          palette, and it states the number a gate exterior structurally cannot. */}
      {f >= 30 && f < 60 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 96 }}>
          <TheHall f={f} k={1} push={E(f, 30, 60, 0, 1, LIN)} seed={3} />
          <HeadCount x={506} y={166} k={count} s={0.9} z={97} f={f} />
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg,#DDE8F1 0%,#BACBDA 46%,#93A8BC 100%)" }} />
      {/* ⭐⭐ REV 34 — THE OPEN'S ONE CUT, at f60. Measured shot lengths: every
          winner caps a shot at 2.53-3.20s and this hook ran **3.93s in a single
          framing**. My average shot is already 0.88s against their 1.02-1.43s,
          so the pacing fault was never "too slow" — it was three shots that
          overstayed. This is a tighter framing of the SAME event (the doorway
          and what is coming out of it), not a new idea and not a jitter. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
        zIndex: 2, /* ⭐⭐ REV 37 — A THIRD FRAMING AT f30. The hook ran two shots (0-60 wide,
           60-119 punched) and the first of those was a full second of the same wide.
           At f30 the gate is open and the first hands are arriving at the stack,
           which is the most interesting second in the shot and was only ever seen
           from across the room — so it cuts CLOSE onto the top of the pile as the
           first pages come off it, then back out at f60 to the working line.
           Shot lengths 1.00s / 1.00s / 1.97s, all inside the winners' 2.53-3.20 cap.
           ⛔ 1.16 on the third, not 1.30 — a punch multiplies every pixel of motion
           inside it, and 1.30 was most of why the back half once measured 8-9.5. */
        transform: f >= 60 ? "translateY(-34px) scale(1.16)"
          /* ⛔ I COMPUTED THIS TRANSLATE AGAINST THE WRONG PIVOT. The wrapper's
             `transformOrigin` is `50% 62%`, not `0 0`, so a point P does not map
             to `t + k*P` — it maps to `t + O + k*(P - O)`. Solving for the stack
             centre put it at (-25,-115), off the top-left corner, and the shot
             framed the chain instead. Correct form, with O = (506, 491):
                 t = C - O - k * (P - O)
             P = (280, 260) — the top of the pile, where the hands arrive. */
          /* ⛔ f30-60 used to be a reframe of this same set; it is a different
             LOCATION now (`TheHall`), drawn over the top, so this wrapper only
             carries the wide and the f60 punch. */
          : "none",
        transformOrigin: "50% 62%" }}>

      {/* ⭐ THE SET IS WORTH MORE THAN THE EFFECTS (FreeHooks, verbatim). A repo
          door gets what a repo door has: a canopy with lamp cans, the lit floor
          above, hazard chevrons on the kerb, and a rail cropped by the near edge
          IN FRONT of the action. */}
      <div style={{ position: "absolute", left: -40, top: 74, width: 1092, height: 74, zIndex: 19,
        background: "linear-gradient(180deg,#39434F 0%,#5A6674 100%)" }} />
      {[132, 386, 640, 894].map((lx, i) => (
        <React.Fragment key={"can" + i}>
          <div style={{ position: "absolute", left: lx, top: 148, width: 86, height: 26, zIndex: 20,
            borderRadius: "0 0 20px 20px", background: "#2A3440" }} />
          <div style={{ position: "absolute", left: lx + 10, top: 168, width: 66, height: 10,
            zIndex: 21, background: GOLD, opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 9 + i)),
            boxShadow: `0 0 26px ${hexa(GOLD, 0.8)}` }} />
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 40, right: 40, top: 182, bottom: 96, zIndex: 6,
        background: "linear-gradient(178deg,#AEBBC8,#76828E)", border: "9px solid #10151B",
        boxSizing: "border-box" }}>
        <div style={{ position: "absolute", left: 20, right: 20, top: 16, height: 150,
          background: "linear-gradient(180deg,#FFF3C8,#E8C264)", border: "6px solid #10151B",
          boxSizing: "border-box", overflow: "hidden" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Crew key={"up" + i} f={f} x={110 + i * 180} y={136} i={i * 4 + 11} size={124}
              z={3} at={-12} loop={i % 4} flip={i % 2 === 1} />
          ))}
        </div>
      </div>

      {/* the doors, and the crowd already massed behind them */}
      <div style={{ position: "absolute", left: 236, top: GROUND - 292, width: 560, height: 280,
        zIndex: 34, overflow: "hidden", background: "linear-gradient(180deg,#1A2430,#0C121A)" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <Crew key={"wt" + i} f={f} x={52 + (i % 6) * 84 + Math.sin(f / 23 + i) * 5}
            y={188 + Math.floor(i / 6) * 70} i={i * 3 + 17} size={128} z={2} at={-12}
            loop={(i + 1) % 4} flip={i % 2 === 1} />
        ))}
        <div style={{ position: "absolute", inset: 0,
          background: `linear-gradient(180deg,${hexa(GOLD, 0.16)},rgba(0,0,0,0.5))` }} />
      </div>
      <BlastDoors x={226} y={GROUND - 300} w={580} h={292} open={part} f={f} z={40} />

      {/* ⭐⭐ THE LOAD — a leaning stack of job tickets twice his height, BOWED
          over him, that the crowd takes away on the arrival. */}
      <div style={{ position: "absolute", left: HX - 92, top: GROUND - 606 + crush * 2,
        width: 184, height: 352, zIndex: 78, opacity: load > 0.02 ? 1 : 0,
        transform: `rotate(${(-9 - bow * 0.6 + recoil * 0.4).toFixed(2)}deg) translateY(${(crush * 0.7).toFixed(1)}px)`,
        transformOrigin: "50% 100%" }}>
        {Array.from({ length: 9 }, (_, i) => {
          /* the TOP slab goes first, so the pile visibly comes down */
          const gone = (1 - load) * 9 > (8 - i) + 0.5;
          if (gone) return null;
          return (
          <div key={"sl" + i} style={{ position: "absolute", left: 8 + (i % 2) * 10,
            top: i * 38, width: 164, height: 34, background: i % 3 ? "#F8F5EC" : "#EAE2CE",
            border: "5px solid #14181E", boxSizing: "border-box",
            transform: `rotate(${((i % 4) - 1.5) * 2.4}deg)` }}>
            <div style={{ position: "absolute", left: 9, top: 8, width: 88, height: 6,
              background: "#8E9AA8" }} />
            <div style={{ position: "absolute", left: 9, top: 19, width: 56, height: 6,
              background: "#B9C2CC" }} />
            <div style={{ position: "absolute", right: 9, top: 8, width: 20, height: 18,
              background: [CLAY, SKY, TEAL, GOLD][i % 4] }} />
          </div>
          );
        })}
      </div>
      {/* ⭐ WHAT THE CLOSE SHOT IS FOR: hands arriving at the top of the pile and
          lifting the first pages clear. Only drawn while that framing is live, so
          it costs nothing in the wide. */}
      {false && [0, 1, 2].map((i) => {
        const t = E(f, 26 + i * 9, 26 + i * 9 + 16, 0, 1, IO);
        if (t <= 0) return null;
        const topY = GROUND - 590 + (1 - load) * 300;
        return (
          <React.Fragment key={"gr" + i}>
            <Forearm x0={HX + 210 + i * 26} y0={topY + 120}
              x1={HX + 20 + i * 34} y1={topY + 24 - t * 30} w={19} c={CLAY} z={84} />
            <div style={{ position: "absolute", left: HX - 70 + i * 40, top: topY + 6 - t * 62,
              width: 150, height: 30, zIndex: 85, opacity: 1 - t * 0.15,
              background: i % 2 ? "#F8F5EC" : "#EAE2CE", border: "5px solid #14181E",
              boxSizing: "border-box",
              transform: `rotate(${(-6 - t * 16 + i * 5).toFixed(1)}deg)` }}>
              <div style={{ position: "absolute", left: 10, top: 8, width: 78, height: 6,
                background: "#8E9AA8" }} />
              <div style={{ position: "absolute", left: 10, top: 18, width: 50, height: 6,
                background: "#B9C2CC" }} />
              <div style={{ position: "absolute", right: 9, top: 7, width: 18, height: 16,
                background: [CLAY, SKY, TEAL][i % 3] }} />
            </div>
          </React.Fragment>
        );
      })}
      {/* the pages already finished, heaped round his feet — f0 detail */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"hp" + i} style={{ position: "absolute", left: HX - 150 + i * 46,
          top: GROUND - 26 + (i % 3) * 7, width: 68, height: 20, zIndex: 74,
          background: "#EDE8DA", border: "4px solid #1C2430", boxSizing: "border-box",
          transform: `rotate(${((i * 37) % 24) - 12}deg)` }} />
      ))}
      {/* ⭐ PAGES SLIPPING OFF THE TOP — the before-state's own motion. One comes
          loose roughly every half second and flutters down past him, so the hold
          before the trigger is never a still frame. */}
      {f < LOCK + 6 && [0, 1, 2].map((q) => {
        const t = ((f + q * 11) % 33) / 33;
        return (
          <div key={"fl" + q} style={{ position: "absolute", zIndex: 81,
            left: HX - 60 + q * 40 + Math.sin(t * 7 + q) * 34,
            top: GROUND - 590 + t * 560, width: 60, height: 18, opacity: 1 - t * 0.35,
            background: "#F8F5EC", border: "4px solid #1C2430", boxSizing: "border-box",
            transform: `rotate(${(t * 300 + q * 60).toFixed(0)}deg)` }} />
        );
      })}
      {/* the steam coming off him while he is losing */}
      {f < LOCK + 10 && (
        <Puff x={HX + 30} y={GROUND - 320} f={f} at={0} c="#E4EAF0" z={80} n={7} s={0.9} />
      )}

      {/* ⭐ THE HERO — ONE body, against a load. Crushed, then straightening. */}
      <Contact x={HX - 52} y={GROUND - 6} w={150} o={0.36} />
      <Hero f={f} x={HX} y={GROUND + crush * 0.5 + recoil} size={302}
        z={82} act={rise > 0.5 ? 2 : 0} ph={0.2}
        costume={{ constr: 1 }} strain={f < GIVE ? 0.92 : (1 - rise) * 0.8}
        drive={f >= GIVE && f < LOCK ? 0.34 : 0}
        cheer={rise > 0.8 ? Math.min(1, (rise - 0.8) * 5) : 0} gaze={0.4} />
      {/* the arm that reaches past the load and slaps the release */}
      {f >= GIVE - 4 && f < LOCK && (
        <Forearm x0={HX + 74} y0={GROUND - 186} x1={556 + (f >= GIVE ? 18 : 0)} y1={GROUND - 250}
          w={22} c={CLAY} z={83} />
      )}
      <div style={{ position: "absolute", left: 546, top: GROUND - 292, width: 58, height: 58,
        borderRadius: "50%", zIndex: 44, boxSizing: "border-box", border: "6px solid #14181E",
        background: f >= GIVE ? GREEN : RED,
        boxShadow: `0 0 ${30 + (f >= GIVE && f < GIVE + 8 ? 60 : 0)}px ${hexa(f >= GIVE ? GREEN : RED, 0.9)}`,
        transform: `scale(${f >= GIVE && f < GIVE + 5 ? 0.86 : 1})` }} />
      {/* ⭐ the release FIRES — a ring off the button so the trigger frame is not
          a colour swap, and the hazard beacons strike up with it */}
      {f >= GIVE && f < GIVE + 12 && <Ring x={575} y={GROUND - 263} f={f} at={GIVE} c={GREEN} z={46} s={1.5} />}
      {f >= GIVE && [268, 764].map((bx, i) => (
        <div key={"hz" + i} style={{ position: "absolute", left: bx - 18, top: GROUND - 336,
          width: 36, height: 36, borderRadius: "50%", zIndex: 46, background: GOLD,
          opacity: 0.2 + 0.8 * Math.abs(Math.sin((f - GIVE) / 2.2 + i * 1.6)),
          boxShadow: `0 0 40px ${hexa(GOLD, 0.95)}`, border: "5px solid #14181E",
          boxSizing: "border-box" }} />
      ))}

      {/* ⛔ THE ARRIVAL COSTS. Recoil above, and here: dust, a ring, and pages
          knocked loose off the heap. */}
      {f >= LOCK && f < LOCK + 16 && (
        <>
          <Puff x={HX + 20} y={GROUND - 40} f={f} at={LOCK} c="#D8CCB4" z={84} n={14} s={1.5} />
          <Ring x={HX + 30} y={GROUND - 170} f={f} at={LOCK} c={GOLD} z={85} s={1.6} />
        </>
      )}
      {f >= LOCK && Array.from({ length: 5 }, (_, i) => {
        const t = E(f, LOCK, LOCK + 22, 0, 1, OUT);
        return (
          <div key={"kn" + i} style={{ position: "absolute", zIndex: 86,
            left: HX - 40 + (i - 2) * 54 - t * (i - 2) * 90, top: GROUND - 40 - t * (120 + i * 18),
            width: 62, height: 18, background: "#EDE8DA", border: "4px solid #1C2430",
            boxSizing: "border-box", opacity: 1 - t,
            transform: `rotate(${t * (i - 2) * 120}deg)` }} />
        );
      })}

      {/* ⭐ AND THEY KEEP COMING — it does not resolve */}
      {/* ⛔⛔⛔ REV 35, ALEX: *"after the gate opens the animation is not
          interesting, it needs a different more interesting concept completely."*

          He is right and it is the same trap as the stars beat, which I also had
          to be told twice about. What came out of the gate was a PARADE: bodies
          walking toward camera, which illustrates the COUNT — "there are two
          hundred of them" — a state. The sentence is *"200 AI engineers that WORK
          FOR YOU 24/7"*, and the claim is not that they exist, it is that they do
          your work. `feedback_illustrating_the_noun_is_the_trap`, again.

          ⭐ THE NEW CONCEPT: A BUCKET BRIGADE. The gate opens and they do not
          walk past you — they form a CHAIN off his stack and strip it, hand to
          hand, back into the building. Pages fly down the line the whole way, the
          stack visibly shrinks to nothing, and he is left holding air. It is one
          mechanism with a destination, it RESOLVES the before-state instead of
          ignoring it, and it depicts the verb rather than the number. */}
      {(() => {
        const START = LOCK - 4;
        /* ⛔⛔⛔ REV 36, ALEX: *"between 2-3 seconds it's literally just them
           standing and bouncing around."* Dead right, and it is
           `feedback_action_loop_is_not_a_scene` in its purest form: the chain was
           fully formed by f47 and after that every link ran `Crew`'s generic
           action loop while pages flew past them. An action loop is TEXTURE. Five
           bodies bobbing on the spot is not five people working, it is five
           people idling in front of some moving props.

           ⭐ THE LINKS ARE NOW DRIVEN BY THE PAGES. Each one watches the gap it
           is responsible for: as a page comes into reach he LEANS toward it,
           takes it, swings back the other way and hands it on — an arm drawn
           between him and the page the whole time. The wave runs down the line
           because the pages are staggered, so the chain visibly WORKS instead of
           bouncing, and every link's motion has a cause outside itself. */
        const N_LINK = 5, N_PG = 5;
        const LX = (k: number) => 328 + k * 142;
        /* ⛔ the pages arced to GROUND-272 — well ABOVE their heads — so every
           arm read as a stick held up in the air rather than a hand-off. A pass
           happens at chest height. */
        const HANDY = GROUND - 152;
        /* where every page is right now, in link-space (0 .. N_LINK-1) */
        const segs = Array.from({ length: N_PG }, (_, i) =>
          f < START ? -9 : ((((f - START) * 0.019 + i / N_PG) % 1) * (N_LINK - 1)));
        /* how hard link k is reaching, and which way */
        const work = (k: number) => {
          let best = 0, dir = 0;
          for (const sg of segs) {
            const d = sg - k;                       /* -1 incoming, +1 outgoing */
            if (d > -0.85 && d < 0.85) {
              const w = 1 - Math.abs(d) / 0.85;
              if (w > best) { best = w; dir = d; }
            }
          }
          return { w: best, dir };
        };
        const pageXY = (sg: number) => {
          const k = Math.max(0, Math.min(N_LINK - 2, Math.floor(sg)));
          const fr2 = Math.max(0, Math.min(1, sg - k));
          return { x: LX(k) + (LX(k + 1) - LX(k)) * fr2,
                   y: HANDY - Math.sin(fr2 * Math.PI) * 34, fr2 };
        };
        return (
          <>
            {Array.from({ length: N_LINK }, (_, k) => {
              const inK = E(f, START + k * 5, START + k * 5 + 9, 0, 1, BACK);
              if (inK <= 0.02) return null;
              const { w, dir } = work(k);
              /* he LEANS along the line toward whatever he is handling */
              const lean = w * (dir > 0 ? 26 : -22);
              const lift = w * 14;
              return (
                <React.Fragment key={"lk" + k}>
                  <Crew f={f} x={LX(k) + lean} y={GROUND + 6 - lift - (1 - inK) * 40}
                    i={k * 5 + 9} size={(176 + (k % 3) * 20) * inK}
                    z={62 + (k % 3)} at={0} loop={3}
                    tint={k % 2 ? undefined : "#E39678"} flip />
                  {/* ⭐ THE ARM THAT DOES IT — drawn from his shoulder to the page
                      he is actually holding, so the reach has an object on it */}
                  {w > 0.12 && (() => {
                    const near = segs.reduce((a2, b2) =>
                      Math.abs(b2 - k) < Math.abs(a2 - k) ? b2 : a2, -9);
                    const P = pageXY(near);
                    return (
                      <Forearm x0={LX(k) + lean + (dir > 0 ? 30 : -30)} y0={GROUND - 116}
                        x1={P.x} y1={P.y + 14} w={17} c={CLAY} z={70 + (k % 3)} />
                    );
                  })()}
                </React.Fragment>
              );
            })}

            {/* the pages, level, arcing hand to hand */}
            {segs.map((sg, i) => {
              if (sg < 0) return null;
              const P = pageXY(sg);
              const fade = Math.min(1, (N_LINK - 1 - sg) * 2.2);
              return (
                <div key={"pg" + i} style={{ position: "absolute", left: P.x - 40, top: P.y,
                  width: 80, height: 26, zIndex: 80, opacity: Math.min(1, fade),
                  background: i % 3 ? "#F8F5EC" : "#EAE2CE",
                  border: "4px solid #1C2430", boxSizing: "border-box",
                  transform: `rotate(${(Math.sin(P.fr2 * Math.PI * 2) * 16 + (i % 2 ? 4 : -4)).toFixed(1)}deg)` }}>
                  <div style={{ position: "absolute", left: "12%", right: "44%", top: "24%",
                    height: "16%", background: "#94A0AC" }} />
                  <div style={{ position: "absolute", left: "12%", right: "26%", top: "56%",
                    height: "16%", background: "#B9C2CC" }} />
                </div>
              );
            })}

            {/* ⭐ AND IT GOES SOMEWHERE. The pages they pass in stack up inside the
                doorway, so the line has a visible destination and the work is
                seen to be DONE, not just moved. */}
            {(() => {
              const done = Math.max(0, Math.min(7, Math.floor((f - START - 18) / 11)));
              return Array.from({ length: done }, (_, i) => (
                <div key={"dn" + i} style={{ position: "absolute", left: 828 + (i % 2) * 9,
                  top: GROUND - 44 - i * 21, width: 96, height: 20, zIndex: 41,
                  background: i % 3 ? "#F8F5EC" : "#EAE2CE", border: "4px solid #1C2430",
                  boxSizing: "border-box", transform: `rotate(${((i * 31) % 8) - 4}deg)` }} />
              ));
            })()}

            {/* two still arriving to lengthen the line */}
            {Array.from({ length: 3 }, (_, i) => {
              const rel = START + 16 + i * 20;
              const t = E(f, rel, rel + 26, 0, 1, LIN);
              if (t <= 0) return null;
              return (
                <Crew key={"jn" + i} f={f} x={922 - t * 96} y={GROUND + 14}
                  i={i * 7 + 21} size={166 + (i % 2) * 20} z={56} at={0} loop={0}
                  tint="#EDB79E" flip />
              );
            })}
          </>
        );
      })()}
      {/* the queue rail, cropped by the near edge, IN FRONT of the action */}
      <div style={{ position: "absolute", left: -30, right: -30, top: 742, height: 18, zIndex: 89,
        background: "linear-gradient(180deg,#8E9AA8,#48525E)" }} />
      {[70, 330, 590, 850].map((rx, i) => (
        <div key={"po" + i} style={{ position: "absolute", left: rx, top: 742, width: 20,
          height: 60, zIndex: 89, background: "#39434F" }} />
      ))}

      </div>
      <HeadCount x={506} y={214} k={count} s={0.9} z={93} f={f} />
      {count >= 1 && <Ring x={506} y={232} f={f} at={106} c={GOLD} z={92} s={1.7} />}
      <NearShade top={752} z={86} k={0.24} />
      <Edge side="r" c="#1A222C" w={54} z={91} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   2 · `crew` — DEPLOYMENT. A GitHub crate skids in, bursts, and the engineers
   fan out toward camera from where it lands.
   ====================================================================== */
export const HookCrew: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const skid = E(f, 0, 16, 0, 1, OUT);
  const burst = E(f, 16, 24, 0, 1, OUT);
  const k = E(f, 22, 126, 0, 1, OUT);
  const CX = 892 - skid * 386;
  return (
    <Scene p={asPlace("hall")} slug="" push={[0, dur, 1.06]} vig={0.36}>
      <Hall f={f} win={[88, 200, 250, 250]} />
      {skid < 1 && <Puff x={CX + 220} y={624} f={f} at={0} c="#CFC4AE" z={54} n={10} s={1.3} />}

      <div style={{ position: "absolute", left: CX - 190, top: 442, width: 380, height: 226,
        zIndex: 36, opacity: 1 - burst,
        transform: `rotate(${-6 + skid * 6}deg) scale(${1 + burst * 0.5})`,
        background: "linear-gradient(174deg,#1C222C,#080A0E)", border: "8px solid #05070A",
        boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <RealMark src="github.svg" s={104} z={37} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 58, height: 12,
          background: hexa("#4A5462", 0.9) }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 42, height: 12,
          background: hexa("#4A5462", 0.9) }} />
      </div>
      {burst > 0 && <Ring x={506} y={620} f={f} at={16} c="#E8DCC0" z={80} s={2.0} />}
      {burst > 0 && <Puff x={506} y={614} f={f} at={15} c="#D8CCB4" z={79} n={14} s={1.7} />}

      <CrewField f={f} k={k} src={[506, 560]} z={40} seed={11}
        cheer={E(f, 118, 134, 0, 1, OUT)} />

      <Contact x={64} y={GY - 10} w={168} o={0.34} />
      <Hero f={f} x={124} y={GY} size={198} z={92} act={3} ph={0.3}
        costume={{ constr: 1 }} gaze={0.9} drive={-burst * 0.16}
        shock={E(f, 16, 26, 0, 1, OUT) * (1 - E(f, 62, 80, 0, 1, OUT))}
        cheer={E(f, 100, 118, 0, 1, OUT)} />
      <HeadCount x={506} y={286} k={E(f, 28, 120, 0, 1, OUT)} s={0.94} z={93} f={f} />
      <NearShade top={700} z={86} k={0.36} />
      <Claim t="ONE FREE REPO" />
      <Edge side="l" c="#1A1610" w={72} z={91} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   3 · `tower` — SCALE GAP. A scaffold rises behind one small Claude and every
   deck of it is already crewed and working.
   ⛔ The bays hold PEOPLE, not lit rectangles. That was rev 1's whole mistake.
   ====================================================================== */
export const HookTower: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const rise = E(f, 6, 36, 0, 1, OUT);
  const man = E(f, 26, 122, 0, 1, OUT);
  const DECKS = [
    { y: 250, n: 6, s: 78 }, { y: 386, n: 5, s: 100 }, { y: 540, n: 4, s: 126 },
  ];
  return (
    <Scene p={asPlace("hall")} slug="" push={[0, dur, 1.05]} vig={0.36}>
      <Hall f={f} win={[74, 208, 226, 226]} />
      <Cam y={(1 - rise) * 820} z={34}>
        {/* the scaffold: uprights, decks, braces — drawn, not a slab */}
        <div style={{ position: "absolute", left: 268, top: 190, width: 596, height: 520,
          zIndex: 34 }}>
          {[0, 1, 2, 3].map((c) => (
            <div key={"up" + c} style={{ position: "absolute", left: c * 198, top: -30,
              width: 15, height: 560, background: "linear-gradient(90deg,#39424E,#0C1016)" }} />
          ))}
          {DECKS.map((d, r) => (
            <React.Fragment key={"dk" + r}>
              <div style={{ position: "absolute", left: -22, top: d.y - 190 + 44, width: 640,
                height: 16, background: "linear-gradient(180deg,#5A6472,#0F131A)" }} />
              <div style={{ position: "absolute", left: -22, top: d.y - 190 + 60, width: 640,
                height: 7, background: "#080B10" }} />
            </React.Fragment>
          ))}
          {[0, 1, 2].map((r) => (
            <div key={"br" + r} style={{ position: "absolute", left: 8, top: r * 168 - 10,
              width: 580, height: 8, background: hexa("#39424E", 0.7),
              transform: `rotate(${r % 2 ? 7 : -7}deg)` }} />
          ))}
        </div>
        {/* ⭐ EVERY DECK IS CREWED, and each body runs its own loop */}
        {DECKS.map((d, r) => Array.from({ length: d.n }, (_, i) => {
          const idx = r * 6 + i;
          const a = E(man, (idx / 15) * 0.8, (idx / 15) * 0.8 + 0.18, 0, 1, OUT);
          if (a <= 0.02) return null;
          const span = (d.n - 1) * (596 / d.n + 34);
          return (
            <Crew key={"tc" + idx} f={f} x={566 - span / 2 + i * (596 / d.n + 34)}
              y={d.y + 44} i={idx + 5} size={d.s} z={40 + r * 4} at={0}
              loop={(idx + r) % 4} flip={i % 2 === 0} />
          );
        }))}
      </Cam>

      <Contact x={64} y={GY - 10} w={176} o={0.34} />
      <Hero f={f} x={124} y={GY} size={214} z={92} act={3} ph={0.2}
        costume={{ constr: 1 }} gaze={0.9}
        shock={E(f, 22, 34, 0, 1, OUT) * (1 - E(f, 76, 94, 0, 1, OUT))} />
      <HeadCount x={556} y={286} k={E(f, 30, 120, 0, 1, OUT)} s={0.94} z={93} f={f} />
      <NearShade top={700} z={86} k={0.36} />
      <Claim t="ONE FREE REPO" />
      <Edge side="l" c="#1A1610" w={72} z={91} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   4 · `line` — SUBSTITUTION. One overloaded Claude at one desk; the repo lands
   and the desk becomes a LINE of desks running off both edges, each one crewed.
   ====================================================================== */
export const HookLine: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const land = E(f, 4, 16, 0, 1, IN_Q);
  const grow = E(f, 18, 124, 0, 1, OUT);
  const N = 7;
  return (
    <Scene p={asPlace("hall")} slug="" push={[0, dur, 1.05]} vig={0.36}>
      <Hall f={f} win={[724, 196, 250, 250]} />
      {Array.from({ length: N }, (_, i) => {
        const a = E(grow, (i / N) * 0.82, (i / N) * 0.82 + 0.2, 0, 1, BACK);
        if (a <= 0.02) return null;
        const x = 506 + (i - (N - 1) / 2) * 168;
        return (
          <React.Fragment key={"ln" + i}>
            <div style={{ position: "absolute", left: x - 74, top: 604, width: 148, height: 20,
              zIndex: 44, transform: `scaleX(${a})`,
              background: "linear-gradient(180deg,#7A5C34,#3E2E18)", border: "3px solid #17120A" }} />
            <Crew f={f} x={x} y={600} i={i + 7} size={132} z={48 + i} at={0} loop={i % 4}
              flip={i % 2 === 1} />
          </React.Fragment>
        );
      })}
      {/* the second rank, behind, so it reads as a floor and not a row */}
      <CrewField f={f} k={grow} src={[506, 560]} z={36} seed={21} only={0} />
      <CrewField f={f} k={grow} src={[506, 560]} z={38} seed={21} only={1} />

      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 84,
        transform: `translateY(${(1 - land) * -260}px)` }}>
        <RealMark src="github.svg" s={96} z={84} x={458} y={300} />
      </div>
      {land >= 1 && <Ring x={506} y={352} f={f} at={16} c={GOLD} z={83} s={1.3} />}

      <HeadCount x={506} y={200} k={E(f, 24, 118, 0, 1, OUT)} s={0.94} z={93} f={f} />
      <NearShade top={700} z={86} k={0.36} />
      <Claim t="ONE FREE REPO" />
      <Edge side="r" c="#1A1610" w={72} z={91} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   HookBoard · "THE WALL" — trial-cut hook B, rev 24
   ⛔⛔⛔ ALEX: *"make the BOARD version way better, more graphics in the
   beginning rather than just so text heavy, since people don't like that."*

   The first version was a split-flap DIRECTORY: two columns of words, filling
   with more words, for three and a half seconds. Even executed well that asks a
   scrolling viewer to READ in the first second of a reel, which is the one thing
   they will not do — and it made the hook the most type-dense frame in the whole
   build. `feedback_graphical_over_textual`, and I wrote the offending scene
   myself two hours after appending a note about it.

   ⭐ THE WALL OF FACES. Same idea — the roster arriving — with the words taken
   out: twenty ID badges, each carrying a real Claude sprite, a discipline colour
   and a DRAWN GLYPH, flying in from off-frame and slamming into a grid. No role
   names on the badges at all; the only text in the shot is the counter. Then the
   camera pulls back and the wall turns out to be the tower's lobby, with the
   doors opening behind it.
   ====================================================================== */
export const HookBoard: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  /* ⛔⛔⛔ REV 25, ALEX: *"each of those scenes in the hook cards needs to be way
     more interesting and elevated, more detailed."*

     The cards were BADGES — a portrait, a colour bar, a glyph and some texture.
     A badge is a static object by definition: it says who someone is and nothing
     about what they do, so twenty of them is twenty portraits however well drawn.

     ⭐ EACH CARD IS NOW A ROOM. Twelve of them, each a working office in
     miniature: its own wall tint, glazing with the city behind it, a desk, a task
     lamp throwing a cone, a Claude on its own action loop, and that discipline's
     tool ACTUALLY RUNNING on a lit screen. Twelve small scenes instead of twenty
     small labels — fewer cards, each about 2.5x the area, which is what "more
     detailed" needs before anything can be drawn in them at all. */
  const COLS = 3, ROWS = 4, N = COLS * ROWS;
  /* ⛔⛔⛔ REV 26, ALEX: *"there's not enough motion, it's pretty static in the
     hook — I can just see all of the Claude sprites doing their own thing, it's
     quite boring."*

     Exactly right, and it is the same defect this reel has now hit four times.
     The cards were pre-seeded to 72% and the rest landed inside twenty frames,
     so for the back seventy frames NOTHING MOVED except twelve idle loops and a
     light sweep. Action loops are texture; they are not an event, and twelve of
     them running at once is still one static frame
     (`feedback_action_loop_is_not_a_scene`).

     ⭐ THE CAMERA TRAVELS THE WALL, IN THREE SHOTS — on f42 and f84, the cuts
     `SHOTS.S0` has always declared:
       f0-42   ONE ROOM, filling the frame. You are inside a single office with
               one Claude working. Cards are still arriving around the edges.
       f42-84  HARD CUT out to a block of them, camera drifting, more landing.
       f84-123 HARD CUT wide — the whole wall, then the pull back to the lobby.
     Scale goes 3.1x -> 1.5x -> 1.0x -> 0.6x, so the count of visible rooms grows
     the whole way and no two consecutive frames share a framing. */
  /* ⛔ two framings, not three — a cut is not an event */
  const SHOT = f < 56 ? 0 : 2;
  /* ⛔ at 0.34 the card the opening shot frames was still MID-FLIGHT on frame 0
     — rotated, part-scaled, and its sprite still inside `Crew`'s own 8-frame
     entrance. The first frame of a reel cannot be a thing in the middle of
     arriving. 0.42 lands it before f0; the sprites get `at={-12}` so their
     entrance is finished too. */
  const fill = 0.42 + E(f, 0, 96, 0, 0.58, LIN);
  const pull = E(f, 88, 118, 0, 1, OUT);
  const count = 0.16 + E(f, 0, 106, 0, 0.84, LIN);
  /* the camera: a hard step at each cut, and a drift inside every shot so none
     of the three is ever locked off */
  /* ⛔ THE FIRST CUT OF THIS FRAMED A CARD THAT HAD NOT LANDED YET. The wall
     fills bottom-up, so at f0 only the bottom row exists — and I pointed the 3.1x
     shot at the CENTRE card, whose `ord` is 0.667. Frame 0 was an empty grey
     board, and it passed the luma law only because grey is bright, which is a
     hollow pass. The opening shot frames a BOTTOM-ROW card, which is the one the
     fill order guarantees is there. */
  const zoom = SHOT === 0 ? 1.86 - E(f, 0, 56, 0, 0.20, LIN)
             : (1.12 - E(f, 56, 119, 0, 0.48, IO)) * (1 - pull * 0.24);
  /* the point we hold on, in panel coords, and where on screen we hold it */
  const fx = SHOT === 0 ? 480 + Math.sin(f / 34) * 12 : 506;
  const fy = SHOT === 0 ? 566 + Math.cos(f / 38) * 9 : 400;
  /* ⛔ translate FIRST then scale, with origin 0 0 — `scale(k) translate(t)`
     multiplies t by k (`feedback_transform_order_multiplies_translate`). */
  const camx = 506 - zoom * fx, camy = 400 - zoom * fy;
  const TINT = [CLAY, SKY, TEAL, GOLD, VIOLET, GREEN, RED, "#8E6FB0",
                "#C97B3C", "#4F8FA8", "#6E9B54", "#B0603F"];
  const GW = 892, GH = 592, GX = 60, GY0 = 96;
  const cw = (GW - 20 * (COLS - 1)) / COLS, chh = (GH - 20 * (ROWS - 1)) / ROWS;
  return (
    <Scene p={asPlace("linehall")} slug="" push={[0, dur, 1.03]} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg,#E8F0F6 0%,#C4D2DE 52%,#A4B6C6 100%)" }} />

      {/* the lobby that resolves as the camera pulls off the wall */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 4,
        opacity: pull }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 92,
          background: "linear-gradient(180deg,#4A5867,#2A3440)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 690, height: 102,
          background: "linear-gradient(180deg,#55606E,#2C3440)" }} />
        {[0, 1, 2, 3].map((i) => (
          <Crew key={"lb" + i} f={f} x={92 + i * 282} y={GY + 118} i={i * 6 + 3}
            size={196 + (i % 3) * 34} z={40 + i} at={-12} loop={i % 4} flip={i % 2 === 1} />
        ))}
      </div>

      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 20,
        transform: `translate(${camx.toFixed(1)}px, ${camy.toFixed(1)}px) scale(${zoom.toFixed(3)})`,
        transformOrigin: "0 0" }}>
        <div style={{ position: "absolute", left: GX - 14, top: GY0 - 14, width: GW + 28,
          height: GH + 28, background: "linear-gradient(178deg,#A9B6C2,#6E7C8A)",
          border: "9px solid #232D39", boxSizing: "border-box" }} />
        {/* ⛔ REV 27 — THE EMPTY BOARD WAS DEAD GREY. Wherever a card had not
            landed yet the wall was a featureless panel, which at the new wider
            opening is a third of the frame. Every slot now carries its own
            MOUNT — a recessed bay, a rail and a clip — so an empty slot reads as
            "one is coming here" instead of as nothing, and the wall is legible
            as a wall before it is full. */}
        {Array.from({ length: N }, (_, i) => {
          const c = i % COLS, r = Math.floor(i / COLS);
          const bx = GX + c * (cw + 20), by = GY0 + r * (chh + 20);
          return (
            <div key={"mt" + i} style={{ position: "absolute", left: bx, top: by,
              width: cw, height: chh, zIndex: 21,
              /* ⛔ MEASURED: mounts at #6E7C8A/#4A5663 were DARKER than the board
                 they sit in and took frame 0 to 130.9. A recess reads as a recess
                 from its EDGE, not from being dark — so the bay is lighter than
                 the board and the depth comes from the inner shadow line. */
              background: "linear-gradient(178deg,#C2CDD8,#93A0AD)",
              border: "4px solid #7E8B98", boxSizing: "border-box" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5,
                background: hexa("#5E6A78", 0.55) }} />
              <div style={{ position: "absolute", left: "50%", marginLeft: -cw * 0.09, top: -7,
                width: cw * 0.18, height: 7, background: "#8C98A4" }} />
              <div style={{ position: "absolute", left: 10, right: 10, bottom: 11, height: 4,
                background: hexa("#6E7C8A", 0.8) }} />
              <div style={{ position: "absolute", right: 13, bottom: 20, width: 9, height: 9,
                borderRadius: "50%", background: hexa("#6E7C8A", 0.9) }} />
            </div>
          );
        })}
        {Array.from({ length: N }, (_, i) => {
          const c = i % COLS, r = Math.floor(i / COLS);
          const ord = ((ROWS - 1 - r) * COLS + ((c * 2) % COLS)) / N;
          const a = Math.min(1, Math.max(0, (fill - ord * 0.92) * 5));
          if (a <= 0.02) return null;
          const land = Math.max(0, 1 - (fill - ord * 0.92) * 8);
          const ang = (i * 137.5 * Math.PI) / 180;
          const t = TINT[i % TINT.length];
          const bx = GX + c * (cw + 20), by = GY0 + r * (chh + 20);
          const U = chh / 100;
          return (
            <div key={"bg" + i} style={{ position: "absolute",
              left: bx + Math.cos(ang) * (1 - a) * 640,
              top: by + Math.sin(ang) * (1 - a) * 540,
              width: cw, height: chh, zIndex: 22 + i, overflow: "hidden",
              /* ⛔ MEASURED: tinted rooms at mxh 0.50 put frame 0 at 112.5 against
                 the >=140 law. The walls are lit, not dim — a working office at
                 four in the afternoon, which is also what the shot is claiming. */
              background: `linear-gradient(178deg,${mxh(t, 0.72)} 0%,${mxh(t, 0.3)} 100%)`,
              border: "5px solid #14181E", boxSizing: "border-box",
              opacity: Math.min(1, a * 1.4),
              transform: `scale(${(0.7 + a * 0.3 + land * 0.16).toFixed(3)}) rotate(${((1 - a) * (i % 2 ? 22 : -22)).toFixed(1)}deg)`,
              boxShadow: land > 0.05 ? `0 0 ${34 * land}px ${hexa(t, land)}` : SH }}>
              {/* ⭐ THE ROOM: ceiling, glazing with the city, floor, desk */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 9 * U,
                background: dkh(t, 0.35) }} />
              <div style={{ position: "absolute", right: 6 * U, top: 14 * U, width: 34 * U,
                height: 38 * U, overflow: "hidden", border: `${2.4 * U}px solid #10151B`,
                boxSizing: "border-box",
                background: "linear-gradient(180deg,#A8CCE8 0%,#D6E2EC 62%,#E4DCC8 100%)" }}>
                {[0, 1, 2, 3].map((q) => (
                  <div key={q} style={{ position: "absolute", bottom: 0, width: 8 * U,
                    left: (2 + q * 8) * U, height: (10 + ((i * 7 + q * 11) % 16)) * U,
                    background: hexa("#46566A", 0.7) }} />
                ))}
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 20 * U,
                height: 3 * U, background: hexa("#0A0E14", 0.5) }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 20 * U,
                background: `linear-gradient(180deg,${mxh(t, 0.34)},${mxh(t, 0.02)})` }} />
              {/* the task lamp and the cone it throws onto the work */}
              <div style={{ position: "absolute", left: cw * 0.44, top: 10 * U, width: 22 * U,
                height: 5 * U, background: "#232D39", borderRadius: 3 * U }} />
              <div style={{ position: "absolute", left: cw * 0.31, top: 15 * U, width: 52 * U,
                height: 56 * U, zIndex: 2, pointerEvents: "none",
                background: `linear-gradient(180deg,${hexa(GOLD, 0.3)},rgba(0,0,0,0))`,
                clipPath: "polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)" }} />
              {/* ⭐ THE TOOL, RUNNING, on its own lit screen */}
              {/* ⛔ the screen and the sprite were both in the left third and
                  overlapped — he stood ON his own monitor. They sit side by side
                  across the card now: body left, work centre, window right. */}
              {/* ⛔⛔ MEASURED, NOT GUESSED: raising the pre-seed from 0.60 to 0.72
                  moved frame 0 the WRONG WAY, 137.3 -> 135.5. More cards made it
                  darker, which means the CARDS were darker than the board they sit
                  on — and the single biggest dark block in each one was this
                  screen at #0E1620. A monitor someone is working at is LIT, so it
                  is a pale panel with the glyph in the discipline colour, which is
                  both brighter and more truthful than a black rectangle. */}
              <div style={{ position: "absolute", left: cw * 0.4, bottom: 24 * U, width: 42 * U,
                height: 42 * U, zIndex: 3, background: "#F2EFE6",
                border: `${2.4 * U}px solid #10151B`, boxSizing: "border-box" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 7 * U,
                  background: t }} />
                <MiniIcon k={i} c={dkh(t, 0.22)} s={38 * U} f={f + i * 13} />
              </div>
              {/* ⭐ AND THE ONE WHO WORKS IT */}
              <Crew f={f} x={cw * 0.23} y={chh - 18 * U} i={i * 3 + 7} size={chh * 0.62}
                z={4} at={-12} loop={i % 4} flip={false} />
              {/* the status lamp on the desk edge */}
              <div style={{ position: "absolute", right: 8 * U, bottom: 7 * U, zIndex: 5,
                width: 8 * U, height: 8 * U, borderRadius: "50%", background: GREEN,
                opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 6 + i)),
                boxShadow: `0 0 ${9 * U}px ${hexa(GREEN, 0.8)}` }} />
              {land > 0.05 && <div style={{ position: "absolute", inset: 0, zIndex: 9,
                background: hexa("#FFFFFF", land * 0.5) }} />}
            </div>
          );
        })}
        {/* same class of flicker, slowed and softened for the same reason */}
        <div style={{ position: "absolute", left: GX - 300 + ((f * 6) % (GW + 600)),
          top: GY0 - 20, width: 300, height: GH + 40, zIndex: 60, transform: "skewX(-14deg)",
          pointerEvents: "none",
          background: `linear-gradient(90deg,rgba(255,244,216,0),${hexa("#FFF4D8", 0.09)},rgba(255,244,216,0))` }} />
      </div>

      <HeadCount x={506} y={726} k={count} s={0.66} z={93} f={f} />
      <NearShade top={738} z={88} k={0.28} />
      <Edge side="l" c="#0A0E14" w={54} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   HookDive · "THE DROP" — trial-cut hook C
   THE IMAGE: the roof beacon at night, above the cloud layer — then the camera
   DIVES down the face, past every lit floor, all the way to the street, and the
   doors open as it lands. The exact reverse of `pour`'s crane, at three times
   the speed, starting at the top instead of the bottom.
   ====================================================================== */
export const HookDive: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const FH = 296, N = 12, GROUND = 700;
  /* ⛔⛔⛔ A FALLING CAMERA IS CHURN BY CONSTRUCTION, and slowing it does not
     help — the panel still translates on every frame, just for longer. Cutting
     the distance took it 74 -> 55 jumps and it was still 1.7x the winners.
     ⭐ So the shot HOLDS AT BOTH ENDS and only falls in the middle third:
       f0-32    held on the roof — beacon, cloud deck, two Claudes topping out
       f32-62   the fall, three floors, fast
       f62-119  held at street level while the doors open and the crowd comes out
     Two thirds of the shot is now a locked frame with an event in it, which is
     what every winner does. */
  const drop = E(f, 32, 62, 0, 1, IO);
  /* we start ABOVE the roof and fall to the ground */
  /* ⛔⛔ THE DIVE IS STRUCTURALLY THE CHURNIEST SHAPE THERE IS. Calming its
     streaks moved nothing (64 -> 74 jumps): the churn is the CAMERA, falling
     twelve floors past a repeating facade, which translates the whole panel by a
     large amount on EVERY frame by definition. The fix is DISTANCE, not speed —
     it falls past three floors instead of ten now, over the same time, so the
     per-frame translation drops ~3x and the shot still opens on the roof beacon
     and lands at the doors. */
  const rise = (1 - drop) * 3.1 * FH;
  const part = E(f, 66, 92, 0, 1, IO);
  const count = E(f, 2, 106, 0, 1, LIN);
  const speed = Math.min(1, Math.abs(E(f, 32, 62, 0, 1, IO) - E(f - 1, 32, 62, 0, 1, IO)) * 30);
  return (
    <Scene p={asPlace("linehall")} slug="" push={[0, dur, 1.01]} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg,#0B1526 0%,#22375A 34%,#7FA0C0 74%,#B6C9DA 100%)" }} />
      {/* the cloud deck we start above and fall through */}
      {[0, 1, 2].map((i) => (
        <div key={"cd" + i} style={{ position: "absolute", zIndex: 70,
          left: -240 + ((f * (1.4 + i * 0.6) + i * 460) % 1600),
          top: 120 + i * 96 + drop * 900, width: 420 + i * 120, height: 62 + i * 16,
          borderRadius: 60, background: hexa("#E4ECF4", 0.42 - i * 0.08) }} />
      ))}
      <Cam y={rise} z={20}>
        <TowerFrame top={GROUND - 5 * FH - 40} bottom={GROUND + 40} z={62} />
        {Array.from({ length: 5 }, (_, i) => (
          <TowerFloor key={"tf" + i} i={i} y={GROUND - i * FH} f={f} lit={1} h={FH - 8} z={30} />
        ))}
        <div style={{ position: "absolute", left: 60, top: GROUND - 5 * FH - 62, width: 892,
          height: 30, zIndex: 66, background: "linear-gradient(180deg,#D6DEE8,#6E7A88)",
          border: "5px solid #10151B", boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 494, top: GROUND - 5 * FH - 156, width: 12,
          height: 96, zIndex: 65, background: "#39434F" }} />
        <div style={{ position: "absolute", left: 484, top: GROUND - 5 * FH - 176, width: 32,
          height: 32, borderRadius: "50%", zIndex: 67, background: RED,
          opacity: 0.3 + 0.7 * Math.abs(Math.sin(f / 5)),
          boxShadow: `0 0 40px ${hexa(RED, 0.95)}` }} />
        <BlastDoors x={228} y={GROUND - 292} w={556} h={286} open={part} f={f} z={78} />
      </Cam>
      {/* the speed of the fall, drawn */}
      {/* ⛔⛔ REV 29 — THESE WERE THE CHURN. Eleven high-contrast bars repositioned
          by `(f * 41) % 74` every single frame is a full-width flicker, and it
          measured this cut at 64 hard changes in six seconds against the winners'
          3-15, at a mean frame-to-frame delta of 16.59 against their 4.5-6.6.
          Three bars, drifting four times slower, at a third of the opacity: the
          fall still reads as fast because the BUILDING is moving. */}
      {speed > 0.02 && Array.from({ length: 3 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: 60, right: 60,
          top: 90 + i * 236 + ((f * 10) % 236), height: 6, zIndex: 84,
          opacity: speed * 0.16, pointerEvents: "none",
          background: `linear-gradient(90deg,rgba(255,255,255,0),${hexa("#FFFFFF", 0.7)},rgba(255,255,255,0))` }} />
      ))}
      {part > 0.06 && part < 0.9 && (
        <Puff x={506} y={GROUND - 10} f={f} at={68} c="#D8CCB4" z={80} n={12} s={1.5} />
      )}
      {/* ⭐ THE HELD OPENING — two of them on the roof, so f0 has a subject */}
      {drop < 0.06 && [0, 1].map((i) => (
        <Crew key={"rf" + i} f={f} x={340 + i * 330} y={GROUND + 250} i={i * 7 + 3}
          size={372 - i * 40} z={88 + i} at={-12} loop={i ? 1 : 3} flip={i === 1} />
      ))}
      {/* ⭐ THE HELD ENDING — they come out of the doors and fill the frame */}
      {part > 0.1 && Array.from({ length: 22 }, (_, i) => {
        const rel = 70 + ((i * 31) % 40);
        const t = E(f, rel, rel + 34, 0, 1, LIN);
        if (t <= 0) return null;
        const lane = (((i * 5) % 9) - 4) / 4;
        const near = t * t;
        return (
          <Crew key={"dp" + i} f={f} x={506 + lane * (60 + near * 430)}
            y={GROUND - 110 + near * 320} i={i * 3 + 11}
            size={58 + near * (240 + ((i * 13) % 5) * 54)}
            z={60 + Math.round(near * 26) + (i % 3)} at={0} loop={i % 3} flip={lane > 0} />
        );
      })}
      <HeadCount x={506} y={182} k={count} s={0.92} z={93} f={f} />
      <NearShade top={716} z={86} k={0.3} />
      <Edge side="r" c="#1A222C" w={54} z={91} kind="wall" />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<HP>> = {
  pour: HookPour, crew: HookCrew, tower: HookTower, line: HookLine,
  board: HookBoard, dive: HookDive,
};

export const HookCut = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  return <C dur={140} />;
};
