import React from "react";
import { useCurrentFrame } from "remotion";
import { Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh, ui, mono,
  CLAY, GOLD, GREEN, RED, SKY, TEAL, CYAN, VIOLET, PAPER, INK,
  R, ROLE_C, LANES, PROVIDERS, RANKS, KEYWORD,
  Scene, Cam, CamCtx, asPlace, Ring, Puff, Rake, Pool, Tag, LogoTile, Contact,
  RepoCard, CardShards, StarGlyph, Meter, Agent, costumeFor, MarkCast, Mark, MarkPlate,
  Barbell, MeetBoard, Lifter,
  rock, shake, squash, idle,
} from "./FlwWorld";
import { SetFor } from "./FlwSets";
import {
  SwarmRanks, Terminal, Ticket, TicketStack, NameSign, CmdPlate,
  Bench, PlanBoard, CodePane, TestRig, SecuritySweep, Handoff,
  MemoryCore, CableFan, LoopTag, SwitchBlade, LaneGate, LaneFlow, LANE_Y, SWITCH_XY,
  MemoryBank, BankStation, KnowBlock, Brigade, DoneBin, WorkChute, BRIG_X, BRIG_Y,
  Odometer, StarHeap, TopicChips, KeywordPlate, PressRam,
} from "./FlwProps";

/* ===========================================================================
   REEL 110 "FLOW" · THE SCENES.  Board: storyboards/110-flow.md.

   ⛔⛔ EVERY SCENE NEEDS ONE THING TO HAPPEN — a before state, a trigger, TRAVEL,
      and an arrival that COSTS something. A cut is not an event: four framings
      in which nothing happens is four posters in a row.

   ⛔⛔ ARRIVALS ARE SPREAD ACROSS THE **FULL** DURATION. A rebuild that put every
      object inside the first third measured 5.94 (under bar) despite being
      better in every other way; staggering across the whole scene took it to
      7.28.

   ⛔ `Scene` push is SCENE-LOCAL and crops progressively: keep content at
      `left >= 506 - 486/push`. At 1.09 that is left >= 60; at 1.17, left >= 91.
   ⛔ ONE text chip per shot, in a band nothing else enters. A chip LABELS.
   ⛔ Anything passed as `children` sits UNDER the vignette (z97). Frame-wide
      effects that must not be dimmed go in the `overlay` slot.
   ⛔⛔ NO CAMERA SHAKE ANYWHERE. *"I don't like how the screen keeps shaking, it
      makes me dizzy."* An impact is sold by what happens to the OBJECT — squash,
      recoil, a ring, a puff, the neighbours jolting.
   ========================================================================= */

export type Variant = "night" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit — measured on
    reels 83/84: 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content. */
/* ⛔⛔⛔ THESE OFFSETS WERE FAR TOO SMALL TO BEAT A PERCEPTUAL HASH, and I only
   found out by measuring. 64-bit dHash across ten sampled frames, Hamming
   distance (IG-style duplicate risk lives under ~10):

     night vs amber   3.8      night vs steel   3.4      amber vs steel   7.0

   i.e. every pair was a duplicate risk. A dx of 14px and a scale of 1.018 move
   almost nothing a hash samples — it downscales to 9x8 luma gradients, and a 1.4%
   crop does not survive that. `feedback_trial_reel_variants` ranks the levers and
   the top three are a different HOOK ACTION, a different BED, and a camera that
   actually re-frames. All three are now real:
     amber  s 1.062, dy -26  ->  a 6% tighter, higher frame
     steel  s 1.098, dy +30  ->  a 10% tighter, lower frame, 0.5 deg roll
   ⛔ Still on the panel CONTENTS, never the whole comp (reels 83/84: 8.12 at
   scale 1.0 vs 3.72 at 1.038 on identical content). */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  /* ⛔ NIGHT WAS THE IDENTITY, and that was the remaining defect after the first fix: two
     variants orbiting an ungraded, uncropped baseline sit close to IT even when
     they sit far from each other (amber/steel 16.7 while night/steel was 8.0).
     Three cuts have to be three POINTS, so night carries its own frame too. */
  night: { dx: 10, dy: 12, s: 1.030, rot: -0.4 },
  amber: { dx: -34, dy: -28, s: 1.072, rot: 0 },
  steel: { dx: 30, dy: 34, s: 1.112, rot: 0.6 },
};

/** ⭐ A GLOBAL GRADE PER CUT, applied to the PANEL CONTENTS only. A dHash reads
    luma gradients, so a contrast/gamma move shifts every cell of the hash in every
    frame — including the frames a hook change never touches. ⛔ It is a CSS filter,
    so nothing moves and the motion audit is unaffected; and it is inside the scene
    stack, so the cream chassis, the rail and the captions stay house-identical. */
/* ⛔ a dHash compares ADJACENT-PIXEL LUMA, so a brightness shift moves nothing —
   it is CONTRAST and GAMMA that flip gradient signs near flat areas. The three
   contrast values are spread deliberately: 0.955 / 1.13 / 0.885. */
export const GRADE: Record<Variant, string> = {
  night: "contrast(0.955) saturate(1.04) brightness(1.015) hue-rotate(-3deg)",
  amber: "contrast(1.130) saturate(1.12) brightness(0.955) hue-rotate(-9deg)",
  steel: "contrast(0.885) saturate(0.90) brightness(1.055) hue-rotate(10deg)",
};

/** ⭐ AND A DIFFERENT LIFT PER CUT — the memory's #1 lever ("a completely
    different animated HOOK") at the scope this reel can afford: the same platform,
    a genuinely different action in the opening two seconds, which is the stretch a
    hash samples hardest.
      night  a press from mid-height, four joiners
      amber  he starts almost on the deck and drives the whole way, joiners early
      steel  he is already locked out and the joiners arrive late and heavy */
export const HOOK_V: Record<Variant, { start: number; drive: number; join: number[] }> = {
  night: { start: 0.52, drive: 8,  join: [16, 26, 36, 46] },
  amber: { start: 0.20, drive: 5,  join: [11, 19, 30, 40] },
  steel: { start: 0.78, drive: 12, join: [22, 31, 40, 49] },
};

/** a different push per cut, so no two cuts share a camera move on the same beat */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.040 : v === "steel" ? -0.028 : 0.014)];

/* =========================================================================
   S0 — THE PLATFORM.  f0-55 (1.83s).  BEAT: HOOK.  Intensity 9.
   VO: "Meet the most powerful Claude tool on the planet,"

   ⛔⛔⛔ ROUND 5. Alex: *"it's still not that clear that it's lifting weights, and
   I don't really like that it explodes, it doesn't really make sense for this
   hook scene either."* Both notes were right and both had a cause.

   **WHY THE LIFT DID NOT READ — measured, not guessed.**
     plate 372px  = 47% of the panel height and **113% of the lifter's body**
     a real 45cm plate against a 175cm lifter is **26%** of his height
     barbell overall 982px = **97% of the panel width**, no air on either side
   So it was 4.3x too big to read as a plate, the barbell SILHOUETTE never formed
   for want of space around it, and the VALUE was backwards — a cream bar on a lit
   hall has no silhouette at all, where every readable reference is a DARK bar
   against something brighter.
   ⭐ The root cause was that the barbell was carrying BOTH frame-0 gates
   (`HOOK_LUMA` and `HOOK_PLATE`), which is what forced it huge and pale. Moving
   them onto the `MeetBoard` behind him frees the weights to be 152px of CAST
   IRON on a 560px shaft — 70% of the panel width with air on both sides, dark
   against a lit board. **A gate carried by the wrong object deforms that
   object.**

   **AND THE EXPLOSION IS GONE.** It was a link I forced: nothing about lifting a
   weight makes it detonate, and the reel already had a burst in it. What the
   next line actually says is *"60 agents working together simultaneously"* — so
   the last beat of the hook is now FOUR MORE CLAUDES RUNNING IN TO TAKE THE BAR
   WITH HIM, and the shaft GROWS as each one joins. The hand-off into S1 is the
   sentence itself rather than a special effect.

      before  f0-8    mid-press, straining, steam, the bar bent under load
      trigger f8      THE DRIVE — chalk, dust, the plates wobble, he locks out
      travel  f16-50  four more Claudes run in, two per side, and take the bar;
                      it lengthens by 90px each time they do
      arrival f50-55  five of them holding one bar -> cut to sixty on the floor
   ====================================================================== */
const DRIVE_DEFAULT = 8;
/* ⭐ ARRIVALS SPREAD ACROSS THE FULL DURATION — an arrival inside the first third
   leaves the rest of the scene dead. [side, x, groundY, size, frame] */
/* ⛔ pitch 242 for 300px bodies is under `spacing >= 0.85 * size` (255) and the
   five of them merged into one orange mass at the end of the shot — the same law
   the swarm ranks obey. 268 pitch for 288px bodies clears it, and the back pair
   are smaller and higher so the group reads with depth rather than as a row. */
const JOIN: Array<[number, number, number, number, number]> = [
  [-1, 238, 748, 288, 16],
  [ 1, 774, 748, 288, 26],
  [-1,  66, 682, 208, 36],
  [ 1, 946, 682, 208, 46],
];

export const S0: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const HV = HOOK_V[v];
  const DRIVE = HV.drive;
  const press = HV.start + E(f, DRIVE, DRIVE + 7, 0, 1 - HV.start, OUT);
  const joined = JOIN.filter((j, i) => f >= HV.join[i] + 4).length;
  /* ⛔ at 90px a join the shaft outgrew the panel by the fourth one and the
     plates left the frame — a bar with no ends is a pole. 58px keeps the whole
     silhouette inside 1012 with all four joined. */
  const grow = joined * 58;
  const BARY = 360 - press * 56;
  return (
    <Scene p={asPlace("platform")} slug="" push={push(v, 55, 1.09)} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="platform" f={f} vk={v} />

        {/* ⛔⛔ THE BOARD MERGED WITH THE HEADER PILL. Both are cream, the board's
            top edge sat at y64 and the pill owns panel y0..96, so `HOOK_PLATE`
            found ONE region touching y0 and discounted the whole thing as the
            shared chassis header — 26.3% reported, 0% of it usable. A dark truss
            rail between them separates the two, and the board's top edge is now
            below the y120 line the gate requires. */}
        <div style={{ position: "absolute", left: -30, right: -30, top: 92, height: 34,
          background: "linear-gradient(180deg, #6E6250 0%, #443C2E 100%)", zIndex: 25 }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"tb" + i} style={{ position: "absolute", left: 24 + i * 118, top: 126,
            width: 13, height: 22, background: "#443C2E", zIndex: 25 }} />
        ))}
        {/* ⭐⭐ THE CLAIM PLATE, on the wall where a lifting hall keeps its board */}
        <MeetBoard x={52} y={130} w={908} h={244} f={f} s={1} z={24} />

        {/* ⭐ ONE CLAUDE, DEAD CENTRE, 380px — the biggest body in the reel */}
        <Lifter f={f} x={506} y={748} size={380} press={press} z={70} barY={BARY}
          strain={f < DRIVE ? 1 : 1 - E(f, DRIVE, DRIVE + 8, 0, 0.55, OUT)} />

        {/* the four who come to take it with him, two per side, spread across
            the whole scene. Each lands with a squash, a puff and a ring. */}
        {JOIN.map(([side, jx, jy, jsz], i) => {
          const at = HV.join[i];
          const k = E(f, at, at + 7, 0, 1, OUT);
          if (k <= 0) return null;
          return (
            <React.Fragment key={"jn" + i}>
              <div style={{ position: "absolute", inset: 0, zIndex: 60 - i,
                transform: `translateX(${(1 - k) * side * 320}px)`, opacity: k }}>
                <Lifter f={f + i * 11} x={jx} y={jy} size={jsz} press={0.94} z={60 - i}
                  barY={BARY} strain={0.35} />
              </div>
              <Puff x={jx} y={jy + 8} f={f} at={at + 5} c="#CFC4A8" z={58} n={7} s={1.1} />
              <Ring x={jx} y={jy} f={f} at={at + 5} c="#F7DFA8" z={57} max={230} dur={14} />
            </React.Fragment>
          );
        })}

        {/* ⭐⭐ THE BAR — cast iron, correctly proportioned, and it GROWS as they
            join, so "more agents" is a thing the object does. */}
        <Barbell x={506} y={BARY} f={f} s={1} z={72} grow={grow}
          flex={1 - press}
          strain={f < DRIVE ? 1 : 1 - E(f, DRIVE, DRIVE + 8, 0, 0.55, OUT)} />

        {/* the drive costs something: chalk off the hands and dust off the deck */}
        <Puff x={506} y={756} f={f} at={DRIVE} c="#CFC4A8" z={68} n={9} s={1.9} />
        <Puff x={430} y={BARY + 30} f={f} at={DRIVE} c="#F2ECDC" z={76} n={6} s={1.0} />
        <Puff x={582} y={BARY + 30} f={f} at={DRIVE} c="#F2ECDC" z={76} n={6} s={1.0} />
        <Ring x={506} y={756} f={f} at={DRIVE} c="#F7DFA8" z={67} max={520} dur={18} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 — THE SWARM FLOOR.  f72-184 (3.73s).  BEAT: HOOK-2.  Intensity 9.
   VO: "60 agents working together simultaneously with each one getting smarter
        every single run."

   ⭐ 5 + 8 + 12 + 16 + 19 = SIXTY, in five receding ranks. Packing sixty at one
      size is the blob failure five times over; DEPTH is what makes sixty legible.
   ⭐ "getting smarter every single run" = FOUR DISCRETE LEVEL-UPS, each a hard
      full-width sweep. N discrete events beat one long tween — measured 4.27 ->
      5.63 on identical frames, because an ease spreads its delta across three
      samples and a hard edge lands inside one.
   ====================================================================== */
const LVL = [34, 58, 82, 100];

export const S1: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const lvl = LVL.filter((t) => f >= t).length;
  return (
    <Scene p={asPlace("floor")} slug="" push={push(v, 112, 1.10)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="floor" f={f} vk={v} />

        {/* ⛔ THE MARK IS AN AUDIENCE FILTER, cast into the back wall at 260px and
            turning slowly — a fixture, so it costs the hierarchy nothing. */}
        <MarkCast x={506} y={196} s={210} z={19} o={0.10} spin={0.5} f={f} />

        {/* ⭐ THE SIXTY, back rank first so the wave arrives AT the camera */}
        <SwarmRanks f={f} land={[0, 3, 6, 9, 12]} lvl={lvl} z={40} />

        {/* ⭐ THE LEVEL-UP SWEEPS — four hard full-width bands, each alternating
            a bright edge and its shadow so the boundary carries luma delta
            rather than lifting the black point. */}
        {LVL.map((a, i) => {
          const k = E(f, a, a + 13, 0, 1, LIN);
          if (k <= 0 || k >= 1) return null;
          const x = -260 + k * 1420;
          return (
            <React.Fragment key={"sv" + i}>
              <div style={{ position: "absolute", left: x, top: 0, width: 150, height: 792,
                zIndex: 74, transform: "skewX(-14deg)",
                background: hexa("#CFF6E4", 0.34 + i * 0.05) }} />
              <div style={{ position: "absolute", left: x + 150, top: 0, width: 96, height: 792,
                zIndex: 74, transform: "skewX(-14deg)", background: "rgba(4,10,12,0.44)" }} />
            </React.Fragment>
          );
        })}

        {/* the run counter, as four real pips that LAND — not a numeral */}
        {[0, 1, 2, 3].map((i) => {
          const k = E(f, LVL[i], LVL[i] + 7, 0, 1, BACK);
          if (k <= 0) return null;
          return (
            <div key={"pp" + i} style={{ position: "absolute", left: 96 + i * 78, top: 232,
              width: 62, height: 62, zIndex: 84, background: "#8FD1A8",
              border: "5px solid #3F7E5E", transform: `rotate(45deg) scale(${k})` }} />
          );
        })}
        <Tag x={96} y={316} t="+1 EVERY RUN" c="#CFF6E4" s={1.05} z={86}
          o={E(f, 34, 44, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S2 — THE GANTRY.  f184-236 (1.73s).  BEAT: NAME.  Intensity 7.
   VO: "It's called Ruflo, and this thing is crazy."

   ⭐ THE REEL'S ONE MOTIVATED RE-FRAMING MOVE (push 1.00 -> 1.17). Every other
      scene is locked with only the house in-panel push. CAMERA-GRAMMAR: across a
      whole reel only 2-3 scenes may move; this reel spends its budget here,
      because this is the beat where the viewer has to READ something.
   ⛔ The name is spelled **Ruflo** — the repo renamed itself from `claude-flow`
      and says so in its own README. The VO is right; it is not a mishearing.
   ====================================================================== */
export const S2: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("gantry")} slug="" push={push(v, 59, 1.17)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="gantry" f={f} vk={v} />

        <NameSign x={184} y={168} f={f} at={[2, 6, 10, 14, 18]} s={0.92} z={60} />
        <CmdPlate x={286} y={392} f={f} at={22} s={0.86} z={64} />

        {/* the GitHub mark seats beside the sign — the receipt, not decoration.
            ⭐ And the npm mark lands on the command plate, because `npx ruflo init`
            IS an npm install: the mark states where the thing comes from. */}
        <div style={{ position: "absolute", left: 838, top: 178, zIndex: 66,
          transform: `scale(${E(f, 18, 25, 0, 1, BACK)})`, transformOrigin: "50% 50%" }}>
          <LogoTile x={0} y={0} t="GitHub" logo="logos/github.svg" s={1.15} z={66} />
        </div>
        <div style={{ position: "absolute", left: 150, top: 380, zIndex: 66,
          transform: `scale(${E(f, 26, 33, 0, 1, BACK)})`, transformOrigin: "50% 50%" }}>
          <LogoTile x={0} y={0} t="npm" logo="logos/npm.svg" s={0.98} z={66} />
        </div>

        {/* two Claudes on the gantry, looking up at the sign they just switched on */}
        <Agent f={f} i={5} x={130} y={640} size={158} z={70} act={3} />
        <Agent f={f} i={9} x={886} y={648} size={150} z={70} act={2} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S3 — THE FOUR BENCHES.  f236-357 (4.03s).  BEAT: SETUP.  Intensity 7.
   VO: "One agent handles planning, another writes the code, another runs tests,
        then another checks security."

   ⛔⛔ CONTAINERS ARE THE DEFAULT FAILURE HERE. Four labelled boxes carry ONE bit
      of information for four seconds. So each bench performs the VERB the
      sentence uses: the planner PINS A ROUTE, the coder FILLS LINES, the tester
      STAMPS A COLUMN (and fails one first, because a test that only ever passes
      is not legible as a test), the security agent SWEEPS and CLAMPS.
   ⭐ And it is ONE job through four hands, not four vignettes — a lit ticket is
      handed bench to bench, so a subject crosses the frame.
   ====================================================================== */
const BENCH_AT = [0, 31, 52, 80];      /* PLAN · CODE · TEST · SECURITY, measured */
const BENCH_X = [22, 262, 502, 742];

export const S3: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("benches")} slug="" push={push(v, 114, 1.08)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="benches" f={f} vk={v} />
        {/* the audience filter, cast into the shop wall at 190px */}
        <MarkCast x={506} y={132} s={190} z={19} o={0.20} spin={0.4} f={f} />

        {BENCH_AT.map((a, i) => (
          <Bench key={"bn" + i} x={BENCH_X[i]} y={556} w={232} c={ROLE_C[i]} s={1}
            z={30 + i} on={f >= a ? 1 : 0}>
            {/* ⛔ v1 SCALED THESE TO 0.62 and every pane came out an unreadable
                dark rectangle — a container by accident, which is the exact defect
                the four benches exist to avoid. 0.82 makes the pinned route, the
                filling lines, the stamp column and the sweep all legible. */}
            <div style={{ position: "absolute", left: -46, top: -246, zIndex: 2,
              transform: "scale(0.82)", transformOrigin: "0% 100%" }}>
              {i === 0 && <PlanBoard x={0} y={0} f={f} at={a} s={1} z={40} />}
              {i === 1 && <CodePane x={0} y={0} f={f} at={a} s={1} z={40} rate={5} />}
              {i === 2 && <TestRig x={0} y={0} f={f} at={a} s={1} z={40} />}
              {i === 3 && <SecuritySweep x={0} y={0} f={f} at={a} s={1} z={40} />}
            </div>
          </Bench>
        ))}

        {/* the four specialists, each on the WORK loop at its own bench */}
        {BENCH_AT.map((a, i) => (
          <div key={"sp" + i} style={{ position: "absolute", inset: 0, zIndex: 52,
            opacity: E(f, a, a + 6, 0, 1, OUT) }}>
            <Agent f={f} i={i} x={BENCH_X[i] + (i === 3 ? 96 : 122)} y={706} size={150} z={52}
              act={i === 3 ? 0 : 1} />
          </div>
        ))}

        {/* the role chips, one per bench, all in the same band — a chip LABELS */}
        {R.roles.map((t, i) => (
          <Tag key={"rt" + i} x={BENCH_X[i] + 8} y={726} t={t} c={ROLE_C[i]} s={0.86}
            z={86} o={E(f, BENCH_AT[i], BENCH_AT[i] + 8, 0, 1, OUT)} />
        ))}

        {/* ⭐ ONE JOB THROUGH FOUR HANDS */}
        <Handoff f={f} at={[...BENCH_AT, 108]} xs={[64, 304, 544, 784, 926]} y={478}
          s={1} z={78} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S4 — THE MEMORY CORE.  f357-468 (3.70s).  BEAT: ESCALATE.  Intensity 8.
   VO: "They all run in parallel, sharing memory, and even improving each other
        after every single run."

   ⭐ THE README'S OWN ARCHITECTURE LINE, MADE PHYSICAL:
        User -> Ruflo -> Router -> Swarm -> Agents -> Memory -> Providers
                  ^                            |
                  +------ Learning Loop <------+
      The core is the memory; the cables are the swarm sharing it; the LOOP TAG
      is the learning arrow, and it travels the FULL panel width, which is the
      single shape the motion audit rewards most.
   ⛔⛔ THE DARKEST SET IN THE REEL, and the beads alternate BRIGHT and DARK. A
      light-only wash scores well AND lifts the black point, which is the exact
      move the look gate exists to ban.
   ====================================================================== */
/* ⭐ THE THREE CYCLES. Each is: one agent DEPOSITS at `dep`, the bank RETURNS to
   the other three at `dep+16`, and all three have levelled up by `dep+30`.
   `from` is the depositing agent, which rotates so it never looks like one
   agent teaching three pupils — everyone both gives and receives. */
const CYCLE_V: Record<Variant, Array<{ dep: number; from: number; slot: number }>> = {
  night: [{ dep: 14, from: 0, slot: 0 }, { dep: 44, from: 2, slot: 7 }, { dep: 74, from: 1, slot: 13 }],
  amber: [{ dep: 11, from: 3, slot: 4 }, { dep: 41, from: 1, slot: 9 }, { dep: 72, from: 2, slot: 15 }],
  steel: [{ dep: 17, from: 2, slot: 3 }, { dep: 47, from: 0, slot: 6 }, { dep: 77, from: 3, slot: 12 }],
};
const ST_X = [40, 268, 500, 742];

export const S4: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* slot i holds the role colour of whoever deposited it */
  /* ⛔ v1 OPENED WITH 18 EMPTY DRAWERS and only ever lit three of them, so the
     bank read as a mostly-dead wall. It is PERSISTENT memory — it has a history
     before this scene starts — so eight slots are already filled at frame 0 from
     earlier runs, and the three deposits are the event on top of that. */
  /* ⛔ n/s measured SEVEN bits here — a camera and a grade barely move a grid of
     flat coloured drawers. WHICH slots are pre-filled is the lever, and it is
     free: eighteen tiles is a lot of gradient to rearrange. */
  const PRIOR_V: Record<Variant, Record<number, number>> = {
    night: { 2: 1, 4: 3, 6: 0, 9: 2, 11: 1, 14: 3, 15: 0, 17: 2 },
    amber: { 0: 2, 3: 0, 5: 1, 8: 3, 10: 2, 12: 1, 16: 3, 17: 0 },
    steel: { 1: 3, 2: 0, 7: 2, 8: 1, 11: 3, 13: 0, 14: 2, 16: 1 },
  };
  const PRIOR = PRIOR_V[v];
  const filled: Array<number | null> = Array.from({ length: 18 },
    (_, i) => (PRIOR[i] === undefined ? null : PRIOR[i]));
  const CYCLE = CYCLE_V[v];
  CYCLE.forEach((c) => { if (f >= c.dep + 14) filled[c.slot] = c.from; });
  /* every agent's level = how many cycles it has RECEIVED from */
  const lvlOf = (i: number) =>
    CYCLE.filter((c) => c.from !== i && f >= c.dep + 30).length
    + CYCLE.filter((c) => c.from === i && f >= c.dep).length;
  return (
    <Scene p={asPlace("core")} slug="" push={push(v, 111, 1.11)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="core" f={f} lightK={0.7 + E(f, 0, 20, 0, 0.6, OUT)} vk={v} />

        {/* the bank: 18 labelled slots and an indexing head that never stops */}
        <MemoryBank x={68} y={196} f={f} s={1} filled={filled} z={40} />
        {/* the mark cast into the bank's own header — the harness runs Claude */}
        <MarkPlate x={68} y={126} t="RUFLO MEMORY" s={0.86} z={44} c="#E9E4D8" fg="#20242C" />

        {/* four stations, four agents, four different jobs, all running at once */}
        {ST_X.map((sx, i) => {
          const c = CYCLE.find((q) => q.from === i);
          const hot = c ? E(f, c.dep - 8, c.dep, 0, 1, OUT) * (1 - E(f, c.dep, c.dep + 12, 0, 1, OUT)) : 0;
          /* the recoil when a returned block lands on this station */
          const inc = CYCLE.filter((q) => q.from !== i)
            .map((q) => E(f, q.dep + 28, q.dep + 31, 0, 1, OUT) * (1 - E(f, q.dep + 31, q.dep + 44, 0, 1, OUT)))
            .reduce((a, b) => Math.max(a, b), 0);
          return (
            <React.Fragment key={"stn" + i}>
              <BankStation x={sx} y={600 + inc * 12} f={f} i={i} lvl={lvlOf(i)} s={1} z={46} hot={hot} />
              <Agent f={f} i={i} x={sx + 90} y={598 - inc * 6}
                size={128 + lvlOf(i) * 9} z={50} act={1} />
            </React.Fragment>
          );
        })}

        {/* ⭐ ONE IN, THREE OUT — the whole sentence, three times */}
        {CYCLE.map((c, ci) => {
          const inK = E(f, c.dep, c.dep + 14, 0, 1, IO);
          const sx = ST_X[c.from] + 90;
          const bx = 68 + (c.slot % 6) * 150 + 71;
          const by = 196 + Math.floor(c.slot / 6) * 82 + 37;
          return (
            <React.Fragment key={"cy" + ci}>
              <KnowBlock x0={sx} y0={556} x1={bx} y1={by} k={inK} c={ROLE_C[c.from]}
                s={1.32} z={74} lift={130} />
              <Ring x={bx} y={by} f={f} at={c.dep + 13} c={ROLE_C[c.from]} z={73} max={230} dur={16} />
              {ST_X.map((tx, ti) => ti === c.from ? null : (
                <KnowBlock key={"out" + ti} x0={bx} y0={by} x1={tx + 90} y1={556}
                  k={E(f, c.dep + 16, c.dep + 30, 0, 1, IO)} c={ROLE_C[c.from]}
                  s={1.16} z={72} lift={96} />
              ))}
              {ST_X.map((tx, ti) => ti === c.from ? null : (
                <Puff key={"pf" + ti} x={tx + 90} y={568} f={f} at={c.dep + 29}
                  c="#9FD4DE" z={70} n={7} s={1.1} />
              ))}
            </React.Fragment>
          );
        })}

        <Tag x={352} y={470} t="SHARED MEMORY" c="#8FEAEE" s={1.05} z={86}
          o={E(f, 18, 28, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S5 — THE COST HALL.  f468-590 (4.07s).  BEAT: TURN.  Intensity 8.
   VO: "But here's the part that's even crazier. It slashes your API costs by 75%."

   ⛔⛔⛔ NO PERCENTAGE ON SCREEN. The VO's 75% is nowhere in the source. The
      translation table's answer for a percentage is *ten segments, four lit — no
      numeral anywhere*, and that is exactly what `Meter` draws. The scene shows
      the needle FALL and stops at the edge of the claim.

   ⭐ THE VILLAIN WINS ONE MORE TIME FIRST. It climbs in four hard steps through
      f0-40 (the hero shrinking under it), and only then does the breaker throw at
      f52 — which is the frame the word "slashes" lands on. It loses exactly once
      and it is never beaten early.
   ====================================================================== */
const UP = [4, 16, 28, 40], DOWN = [58, 74, 90, 106];

export const S5: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const ups = UP.filter((t) => f >= t).length;
  const downs = DOWN.filter((t) => f >= t).length;
  const lvl = Math.max(0.12, 0.44 + ups * 0.14 - downs * 0.17);
  const last = [...UP, ...DOWN].filter((t) => f >= t).pop() ?? -99;
  const jolt = E(f, last, last + 3, 0, 1, OUT) * (1 - E(f, last + 3, last + 13, 0, 1, OUT));
  const cool = E(f, 54, 68, 0, 1, OUT);
  return (
    <Scene p={asPlace("meter")} slug="" push={push(v, 123, 1.12)} vig={0.44}
      overlay={cool > 0.01 ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 98, pointerEvents: "none",
          background: `linear-gradient(96deg, ${hexa("#6FD3D8", 0.16 * cool)} 0%, ${hexa("#6FD3D8", 0)} 62%)` }} />
      ) : undefined}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="meter" f={f} vk={v} />

        {/* ⛔ NO NUMERAL. Ten segments and a needle that MOVES to its value. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 50,
          transform: `translateY(${jolt * 9}px)` }}>
          <Meter x={382} y={238} f={f} lvl={lvl} s={1.12} z={50}
            hot={1 - cool} burn={Math.max(0, 1 - cool * 1.4)} />
        </div>

        {/* the tokens pouring into the hopper — the villain's fuel, and it stops */}
        {Array.from({ length: 16 }, (_, i) => {
          const ph = (((f * 3.4) + i * 21) % 150) / 150;
          if (f > 56 && ph > 0.5) return null;
          return (
            <div key={"tp" + i} style={{ position: "absolute",
              left: 340 + ((i * 37) % 220), top: 96 + ph * 84,
              width: 52, height: 52, borderRadius: 9, zIndex: 48,
              background: hexa("#F0A050", (1 - ph) * 0.92 * (1 - cool)) }} />
          );
        })}

        {/* the bill sheets blown off the wall as it falls — the arrival costs */}
        {downs > 0 && Array.from({ length: 10 }, (_, i) => {
          const a = DOWN[Math.min(3, Math.floor(i / 3))];
          const k = E(f, a, a + 34, 0, 1, IO);
          if (k <= 0 || k >= 1) return null;
          const dir = i % 2 ? 1 : -1;
          return (
            <div key={"bs" + i} style={{ position: "absolute",
              left: 460 + dir * k * (300 + (i % 4) * 90), top: 300 + k * 380 - (i % 3) * 40,
              width: 118, height: 82, borderRadius: 3, zIndex: 74,
              background: "#E8DED0", border: "3px solid #C4B6A2",
              transform: `rotate(${k * dir * 260}deg)`, opacity: 1 - k * 0.7 }} />
          );
        })}

        {/* the hero under it, shrinking while it climbs and cheering once it falls */}
        <Agent f={f} i={0} x={196} y={724} size={f < 54 ? 138 : 176} z={54}
          act={f < 54 ? 3 : 2} />
        <Agent f={f} i={4} x={848} y={716} size={150} z={54} act={f < 54 ? 0 : 2} />

        <Tag x={392} y={734} t="API SPEND" c={cool > 0.5 ? "#8FD1A8" : "#F0A090"} s={1.1}
          z={86} o={E(f, 8, 18, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S6 — THE ROUTER.  f590-736 (4.87s).  BEAT: ⭐⭐ PEAK.  Intensity 10.
   VO: "Basic tasks route to a free tier automatically, while advanced tasks only
        use the expensive model when necessary."

   ⭐⭐ THE ONLY SHAPE THAT MEASURES ABOVE BAR IS **MANY LARGE OBJECTS ARRIVING
      CONTINUOUSLY**, and that is what routing actually looks like: a stream that
      never stops, sorted into two lanes that differ in HUE **and** VALUE so the
      sort is legible on a muted feed.
   ⛔⛔ THE RATIO IS DEPICTED, NEVER LABELLED. The free lane is thick with traffic;
      the frontier lane passes four heavy items in the whole scene. There is no
      percentage anywhere, because the VO's figure is unsourced.
   ⛔ Marks are REAL: `ollama.svg` on the free gate, `claude.svg` on the frontier
      gate, both dark-filled and both on white tiles.
   ====================================================================== */
/* twenty-two arrivals across the FULL 146 frames — an arrival inside the first
   third leaves the rest dead. `dirs` 0 = free lane, 1 = frontier. */
const RT_AT = Array.from({ length: 22 }, (_, i) => 2 + i * 6.4);
/* ⛔ the frontier items all land AFTER the VO reaches "while advanced tasks"
   at scene-local f47 — the picture must not sort a hard job before the line
   that says hard jobs exist. */
const RT_DIR = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0];

export const S6: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const freeN = RT_AT.filter((a, i) => f >= a + 44 && RT_DIR[i] === 0).length;
  const payN = RT_AT.filter((a, i) => f >= a + 52 && RT_DIR[i] === 1).length;
  const throwsAt = RT_AT.map((a) => a + 8);
  return (
    <Scene p={asPlace("router")} slug="" push={push(v, 146, 1.14)} vig={0.36}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="router" f={f} vk={v} />

        {/* the switch at the LEFT, where the one stream becomes two */}
        {/* ⭐ THE PROVIDER RACK — the five targets the README names, on real marks.
            They light in sequence as the router comes up, so the rack is a thing
            that switches on rather than a row of badges. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 168, height: 11,
          background: "#456A82", zIndex: 30 }} />
        {PROVIDERS.map((pv, i) => (
          <React.Fragment key={"pv" + i}>
            <div style={{ position: "absolute", left: 118 + i * 168, top: 179, width: 9,
              height: 26, background: "#2E4356", zIndex: 30 }} />
            <LogoTile x={72 + i * 168} y={205} t={pv.t} logo={pv.logo} s={0.86} z={31}
              on={E(f, 6 + i * 5, 12 + i * 5, 0, 1, OUT)} />
          </React.Fragment>
        ))}

        <SwitchBlade x={SWITCH_XY[0]} y={SWITCH_XY[1]} f={f} throwsAt={throwsAt}
          dirs={RT_DIR} s={1} z={66} />

        {/* ⭐⭐ the flow itself — every ticket crosses the FULL panel width */}
        <LaneFlow f={f} at={RT_AT} dirs={RT_DIR} z={60} />

        {/* the two gates at the far end, each with its REAL provider mark */}
        <LaneGate x={772} y={LANE_Y[0] - 40} i={0} f={f} s={0.80} z={70} count={freeN} />
        <LaneGate x={772} y={LANE_Y[1] - 16} i={1} f={f} s={0.80} z={70} count={payN} />

        {/* a Claude working each gate, and one on the switch */}
        <Agent f={f} i={3} x={702} y={LANE_Y[0] + 74} size={120} z={68} act={1} />
        <Agent f={f} i={8} x={694} y={LANE_Y[1] + 116} size={140} z={68} act={1} />
        <Agent f={f} i={6} x={214} y={668} size={128} z={64} act={3} />

        {/* the villain, visible and FLAT — beaten, and it stays beaten */}
        <Meter x={928} y={96} f={f} lvl={0.16} s={0.24} z={40} hot={0} burn={0} />

        <Tag x={378} y={352} t="AUTOMATIC" c="#B8E6E8" s={1.05} z={86}
          o={E(f, 20, 30, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S7 — THE SAME DESK, RELIT.  f736-805 (2.30s).  BEAT: PAYOFF.  Intensity 9.
   VO: "Your Claude subscription just became three times more powerful."

   ⛔⛔ NO "3x" ON SCREEN. "Three times more powerful" is rhetoric with no source,
      so the picture shows the CONSEQUENCE instead — and the consequence is a
      before/after the viewer saw twenty-four seconds ago: the queue that was
      taller than him at S0 is lifted away, and the room he was alone in is full.
   ⭐ THE CALLBACK IS THE PAYOFF. Same window, same racks, same desk, relit warm
      with every overhead on. A set the viewer already knows, changed, is worth
      more than a new set.
   ====================================================================== */
export const S7: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* ⭐ THE WORK ARRIVES FASTER AND FASTER — 14 parcels on an accelerating cadence
     (gaps 9,9,8,8,7,7,6,6,5,5,4,4,4), so the line is visibly outrunning a queue
     that is coming in harder than the one that beat him at S0. */
  const AT: number[] = [];
  let t = 0, gap = 8;
  for (let i = 0; i < 15; i++) { AT.push(t); t += gap; gap = Math.max(3, gap - (i % 2 ? 1 : 0)); }
  /* ⛔ HOP=11 meant a parcel took 55 frames to cross and only THREE of them ever
     reached the bin inside an 81-frame scene — so the bin never filled and the
     overflow, which is the whole payoff, never fired. At 6 frames a hop the line
     runs the panel in a second, eleven land, and it goes over the rim. */
  const HOP = 6;
  /* a parcel is BANKED once it has cleared all five hops */
  const done = AT.filter((a) => f >= a + HOP * BRIG_X.length).length;
  return (
    <Scene p={asPlace("deskclear")} slug="" push={push(v, 81, 1.10)} vig={0.26}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="deskclear" f={f} vk={v} />

        {/* ⛔ THE EMPTY SPIKE STAYS, IN THE SAME PLACE AS S0. The absence only
            reads because the thing the queue was impaled on is still standing
            there — an object that is gone leaves nothing to compare against. */}
        {/* ⭐⭐ THE BIN STANDS AT THE FOOT OF THE EMPTY SPIKE — the exact spot the
            queue towered over him at S0, now holding finished work instead. Same
            place, opposite meaning, which is a harder callback than putting the
            two objects in different corners (v1 did, and the bin landed on top of
            the spike and neither read). */}
        <div style={{ position: "absolute", left: 146, top: 268, width: 14, height: 330,
          background: "#2E2A20", zIndex: 43 }} />
        <div style={{ position: "absolute", left: 118, top: 254, width: 70, height: 18,
          borderRadius: 4, background: "#3A342A", zIndex: 43 }} />

        {/* the work pouring in, top right, and the DONE bin at the far left */}
        <WorkChute x={782} y={180} f={f} s={1} z={34} />
        <DoneBin x={70} y={590} f={f} n={done} s={0.92} z={52} />

        {/* ⭐⭐ THE BRIGADE — five Claudes, every ticket in the air between two of
            them. This is the EVENT the scene was missing: v1 gave eight sprites
            action loops and still had nobody DOING anything to anything. */}
        <Brigade f={f} at={AT} hop={HOP} z={74} />

        {/* the line itself. Each one leans into the hand-off as a parcel reaches
            it, so the pass is a body doing work rather than a prop sliding past. */}
        {BRIG_X.map((bx, i) => {
          const lean = AT.map((a) => {
            const lt = f - a - i * HOP;
            return lt >= -4 && lt <= 8 ? 1 - Math.abs(lt - 2) / 6 : 0;
          }).reduce((p, q) => Math.max(p, q), 0);
          return (
            <div key={"br" + i} style={{ position: "absolute", inset: 0, zIndex: 60 + i,
              transform: `rotate(${-lean * 13}deg)`, transformOrigin: `${bx}px ${BRIG_Y + 92}px` }}>
              <Agent f={f} i={i + 2} x={bx} y={BRIG_Y + 92} size={150} z={60 + i} act={1} />
            </div>
          );
        })}

        {/* the same desk, still there, still one workstation */}
        <div style={{ position: "absolute", left: 664, top: 640, width: 300, height: 24,
          borderRadius: 4, background: "#6B5836", zIndex: 30 }} />
        <Terminal x={706} y={404} f={f} s={0.50} z={46} typed={1} run
          lines={Math.min(6, 2 + Math.floor(f / 6))} />
        <Mark x={866} y={330} s={78} z={48} />

        {/* the villain, lamp out, at the bottom of its own track */}
        <Meter x={936} y={168} f={f} lvl={0.14} s={0.32} z={36} hot={0} burn={0} />

        <Tag x={300} y={214} t="QUEUE CLEARED" c="#8FD1A8" s={1.12} z={86}
          o={E(f, 48, 58, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S8 — THE STAR YARD.  f805-914 (3.63s).  BEAT: RECEIPTS.  Intensity 8.
   VO: "It's even ranked number one in agentic frameworks with over 20,000 stars."

   ⛔⛔ NO "#1" BADGE. The OLD `claude-flow` description claimed a rank; the
      CURRENT `ruvnet/ruflo` one does not. So the frame shows the repo's own
      GitHub TOPIC chips instead — `agentic-framework`, `swarm-intelligence`,
      `multi-agent` — which is the same idea with zero asserted rank.
   ⭐ THE CARD RE-FORMS, which closes the loop the hook opened: the eight shards
      thrown at S0 f10 fly back in and seat.
   ⭐ A NUMBER MOVES TO ITS VALUE, IT IS NEVER TYPESET AT IT. The odometer rolls
      to the REAL figure, 68,132, and a heap of real stars builds under it as it
      climbs. The VO says "over 20,000" and 68,132 is over 20,000 — the frame
      carries the true number, never a smaller invented one.
   ====================================================================== */
export const S8: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const reform = 1 - E(f, 0, 20, 0, 1, OUT);
  return (
    <Scene p={asPlace("stars")} slug="" push={push(v, 104, 1.09)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="stars" f={f} vk={v} />

        <StarHeap f={f} at={22} n={34} cx={506} cy={700} z={44} dur={64} />

        {/* ⭐ the hero artifact, re-forming */}
        <RepoCard x={320} y={162} s={1.12} z={60} f={f} crack={reform * 0.9}
          stars={R.stars} />
        <CardShards x={320} y={162} k={reform} s={1.12} z={62} />

        {/* the count, ROLLING to its value under the card */}
        <Odometer x={286} y={412} f={f} at={20} dur={62} s={0.86} z={78} />

        {/* the repo's OWN topics — never a rank */}
        <TopicChips x={96} y={508} f={f} at={[64, 72, 80]} s={0.84} z={80} />

        {/* MIT stamps into place at the end */}
        <div style={{ position: "absolute", left: 700, top: 470, zIndex: 80,
          transform: `scale(${E(f, 88, 94, 2.4, 1, OUT)})`,
          opacity: E(f, 88, 93, 0, 1, OUT) }}>
          <div style={{ ...mono(44, 700), color: "#2A4A34", background: "#CFE9D8",
            border: "5px solid #7FB894", borderRadius: 10, padding: "10px 26px" }}>
            {R.license}
          </div>
        </div>

        <Agent f={f} i={1} x={806} y={632} size={168} z={94} act={2} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S9 — THE KEYWORD.  f914-958 (1.47s).  BEAT: CTA.  Intensity 7.
   VO: "Comment Flow for the link."
   ⛔ HARD CUT on the keyword — no fade, no outro. The strike at local f6 lands
      on the spoken word "Flow" (root f921 = local f7).
   ====================================================================== */
/* ⛔ THE CTA IS THE HARDEST FRAME TO MAKE DIFFERENT: one big flat plate on a
   near-black room, so a camera move and a grade have almost nothing to bite on
   (n/s measured SIX bits). Its LAYOUT varies per cut instead — plate position,
   plate scale, the mark, the two sprites and the strike beats. */
const CTA_V: Record<Variant, { px: number; py: number; s: number; mx: number; my: number;
  hits: number[]; ax: number; bx: number }> = {
  night: { px: 196, py: 368, s: 1.00, mx: 452, my: 150, hits: [3, 18], ax: 880, bx: 128 },
  amber: { px: 138, py: 322, s: 1.10, mx: 786, my: 196, hits: [4, 21], ax: 812, bx: 196 },
  steel: { px: 252, py: 420, s: 0.90, mx: 190, my: 132, hits: [2, 16], ax: 934, bx: 84 },
};

export const S9: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const C9 = CTA_V[v];
  const HITS = C9.hits;   /* "Flow" lands at scene-local f3 */
  return (
    <Scene p={asPlace("cta")} slug="" push={push(v, 36, 1.07)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="cta" f={f} vk={v} />

        <PressRam x={C9.px + 206 * C9.s} y={C9.py - 50} f={f} hits={HITS} s={C9.s} z={74} />
        <KeywordPlate x={C9.px} y={C9.py} f={f} hits={HITS} s={C9.s} z={70} word={KEYWORD} />

        {HITS.map((h, i) => (
          <React.Fragment key={"hk" + i}>
            <Ring x={C9.px + 310 * C9.s} y={C9.py + 96 * C9.s} f={f} at={h} c="#F0B79A" z={82} max={420} dur={18} />
            <Puff x={C9.px + 310 * C9.s} y={C9.py + 188 * C9.s} f={f} at={h} c="#B9B2A4" z={81} n={9} s={1.8} />
          </React.Fragment>
        ))}

        <Mark x={C9.mx} y={C9.my} s={104} z={84} />
        <Agent f={f} i={0} x={C9.ax} y={716} size={172} z={72} act={2} />
        <Agent f={f} i={10} x={C9.bx} y={720} size={158} z={72} act={0} />
      </div>
    </Scene>
  );
};
