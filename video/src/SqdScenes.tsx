import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, dkh, mxh, blend, ui, mono, SH,
  CLAY, GOLD, GREEN, RED, SKY, TEAL, CYAN, VIOLET, AMBER, PAPER, INK,
  Scene, Cam, Ring, Puff, Pool, Tag, Crate, CrateWall, Band, Mark, MarkCast, Contact,
  R, GH, KEYWORD, STAR_TOTAL, SquadCard, RepoPlate, ItemNum, Spec, layout,
  SPEC_COSTUME, CROWD_COSTUME,
} from "./SqdWorld";
import { SetFor, placeFor } from "./SqdSets";
import {
  rockAt, squashAt, SEVEN_X, FlyingCrate, SearchBar, CrateOpen,
  SessionTape, DrawerLight, Ladder,
  STATION_X, WorkBlock, Station, SplitFlapRow, Cartridge, PressRam,
  BENCH_X, Bench, Output, BloatBlock, Stamp, Shard,
  PageWall, Arm, DataBin, Barrier, CommitCart, TestLamps, MarkRow,
  RailTraffic, ChutePour, CratePile, Crown, HeadStack, StackBurst, headTop, Volume,
  Ledger, Carousel, DoorRow, Cursor,
} from "./SqdProps";

/* ===========================================================================
   REEL 112 "SQUAD" · THE SCENES.  Board: storyboards/112-squad.md.

   ⛔⛔ EVERY SCENE NEEDS ONE THING TO HAPPEN — a before state, a trigger, TRAVEL,
      and an arrival that COSTS something. A CUT IS NOT AN EVENT: four framings
      in which nothing happens is four posters in a row. Reel 104's five-shot
      open scored better on every number and was rejected anyway; rebuilt as ONE
      locked framing with a real event it went 9.97 -> 12.10 with FEWER cuts.

   ⛔⛔ ARRIVALS ARE SPREAD ACROSS THE **FULL** DURATION. A rebuild that put every
      object inside the first third measured 5.94 (under bar) despite being
      better in every other way; staggering across the whole scene took it to 7.28.

   ⛔⛔ SPRITES RUN AN ACTION LOOP, NOT AN IDLE. The single biggest measured lift
      in the repo (failures 3/11 -> 1/11, every scene rose). `Spec` does this by
      index; never pass a scene a row of sprites on the same `act`.

   ⛔ `Scene` push is SCENE-LOCAL and crops progressively: keep content at
      `left >= 506 - 486/push`. At 1.09 that is left >= 60; at 1.14, left >= 80.
   ⛔ ONE text chip per shot, in a band nothing else enters. All category words
      live in the HEADER BAND (ClaudeSquadReel.tsx), never in the picture.
      Reel 109 was rejected with 33 spans in the animation layer.
   ⛔ Anything passed as `children` sits UNDER the vignette (z97). Frame-wide
      effects that must not be dimmed go in the `overlay` slot.
   ⛔⛔ NO CAMERA SHAKE ANYWHERE. An impact is sold by what happens to the OBJECT.
   ========================================================================= */

export type Variant = "dawn" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit — measured on
    reels 83/84: 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content.
    ⛔⛔ AND THE OFFSETS MUST BE BIG ENOUGH TO BEAT A PERCEPTUAL HASH. Reel 110
    measured its first three cuts at Hamming 3.4-7.0 (duplicate risk lives under
    ~10) because a 14px dx and a 1.018 scale move almost nothing a 9x8 luma
    dHash samples. Three cuts have to be three POINTS, so `dawn` carries its own
    frame too rather than being the identity. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  dawn:  { dx: 12, dy: 14, s: 1.034, rot: -0.4 },
  amber: { dx: -54, dy: -46, s: 1.108, rot: -1.1 },
  steel: { dx: 56, dy: 52, s: 1.172, rot: 1.3 },
};

/** ⭐ A GLOBAL GRADE PER CUT, on the PANEL CONTENTS only. A dHash compares
    ADJACENT-PIXEL LUMA, so a brightness shift moves nothing — it is CONTRAST and
    GAMMA that flip gradient signs near flat areas. It is a CSS filter, so nothing
    moves and the motion audit is unaffected. */
export const GRADE: Record<Variant, string> = {
  /* contrast spread 0.78 / 0.96 / 1.32 — dawn sits BETWEEN the other two, so no
     pair shares a gradient profile. Saturation and hue are pushed the same way. */
  dawn:  "contrast(0.960) saturate(1.05) brightness(1.012) hue-rotate(-3deg)",
  amber: "contrast(0.780) saturate(1.30) brightness(1.070) hue-rotate(-18deg)",
  steel: "contrast(1.320) saturate(0.76) brightness(0.930) hue-rotate(20deg)",
};

/** ⭐ the per-cut HOOK ACTION: where the seven come FROM, and when. */
export const HOOK_V: Record<Variant, { at: number[]; from: (i: number, gy: number, hz: number) => { x: number; y: number } }> = {
  dawn:  { at: [30, 37, 44, 51, 58, 65, 72],
           from: (i, gy, hz) => ({ x: 150 + i * 122, y: hz - 18 - (i % 3) * 38 }) },
  /* straight down out of the top of frame, staggered wider */
  amber: { at: [22, 32, 42, 52, 62, 72, 82],
           from: (i, gy, hz) => ({ x: SEVEN_X[i] + (i % 2 === 0 ? -34 : 34), y: -170 - (i % 3) * 90 }) },
  /* low and lateral, in from both wings along the ground */
  steel: { at: [26, 34, 42, 50, 58, 66, 74],
           from: (i, gy, hz) => ({ x: i < 4 ? -300 - i * 90 : 1320 + (i - 3) * 90, y: gy - 40 }) },
};

/** a different push per cut, so no two cuts share a camera move on the same beat */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.042 : v === "steel" ? -0.030 : 0.014)];

type SP = { v?: Variant };
const VD = (v?: Variant): Variant => v ?? "dawn";

/* =========================================================================
   S0 — THE SUMMONING FLOOR.  f0-93 (3.11s).  BEAT: HOOK.  Intensity 9.
   VO: "Most people don't realize that there are thousands of Claude repos on
        GitHub."

   ⭐⭐ REDESIGNED. Alex on v1: *"the hook scene and the few scenes after need to be
   redone to be much more interesting concepts, right now they are way too boring
   between 0-7 seconds"*, and the direction: *"needs to be hierarchical like one
   claude centerized somehow but themed."*

   v1's hook was a wide yard with a 178px Claude off to one side and seven crates
   arriving in a line — no hierarchy, no centre, nothing dominant. This is
   `feedback_hook_simplicity` verbatim: **ONE dominant object on an empty stage,
   striking through SCALE and real brand colour.**

   So: ONE COLOSSAL CLAUDE (s=372, 47% of the panel height) dead centre on a lit
   floor disc, in a real library hall that recedes into the dark on both sides.
   He is the biggest thing in frame on every frame of the open. The EVENT is the
   hall WAKING UP around him — the bays light bay by bay, deepest first, so the
   "thousands" arrive as a revealed SCALE rather than as a number.
   ====================================================================== */
export type HookAction = "collapse" | "pitch";

/* =========================================================================
   ⭐⭐ TWO HOOK ACTIONS, BUILT TO COMPARE.
   Alex: *"I don't like how the books just keep stacking, I would prefer if books
   flung him or were thrown at him, propose some ideas."* Stacking is accumulation,
   and accumulation is a bar filling — the measured table's worst shape. Both
   actions below are FORCE ACTING ON HIM, and both are made of DISCRETE hits,
   because N discrete events beat one long tween every time it has been measured
   here (4.27 for an 82-frame ease against 5.63 for four pops).
   ⛔ And both strip the side piles right back: *"too many books to the left and
   right"* — the clutter was competing with the only thing that matters in frame.
   ====================================================================== */
export const S0: React.FC<SP & { hk?: HookAction }> = ({ v, hk = "pitch" }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("summon"); const gy = p.horizon + 214;
  const HS = 388;

  /* ---- A · THE SHELF COLLAPSE -------------------------------------------
     He tugs ONE volume off the shelf and the whole library dominoes onto him.
     One small trigger, one enormous consequence, and the avalanche IS the
     "thousands" the line is about. */
  const TUG = 10;                                    /* he pulls the book   */
  const BAYS = [21, 29, 37, 45, 52, 60];             /* the wall goes, bay by bay */
  /* ---- B · THE PITCHING MACHINE -----------------------------------------
     Volumes fire at him horizontally out of the dark, accelerating. Every hit
     spins him, knocks him back a step and snaps his head round. */
  const PITCH = [8, 21, 33, 43, 50, 57, 63, 68, 72, 76, 80, 83];

  /* the hero's reaction, per action */
  let hitAt: number[] = [], spin = 0, shove = 0, sink = 0, squash = 1, widen = 1;
  if (hk === "collapse") {
    hitAt = BAYS.map((b) => b + 14);
    const buried = hitAt.filter((t) => f >= t).length / hitAt.length;
    sink = buried * 118;
    squash = 1 - buried * 0.20;
    widen = 1 + buried * 0.16;
    spin = Math.sin(f / 7) * buried * 3;
    shove = hitAt.reduce((a, t) => a + (f >= t && f < t + 16
      ? Math.sin(((f - t) / 16) * Math.PI) * (t % 2 ? 22 : -22) : 0), 0);
  } else {
    hitAt = PITCH.map((t) => t + 6);
    /* ⭐ each hit is its OWN reaction — a spin, a shove and a recoil that decay,
       so twelve impacts read as twelve events and not as a wobble */
    spin = hitAt.reduce((a, t, i) => a + (f >= t
      ? Math.sin((f - t) / 3.4) * Math.exp(-(f - t) / 15) * (i % 2 ? 15 : -15) : 0), 0);
    shove = hitAt.reduce((a, t, i) => a + (f >= t
      ? Math.sin((f - t) / 4.2) * Math.exp(-(f - t) / 18) * (i % 2 ? 40 : -40) : 0), 0);
    const n = hitAt.filter((t) => f >= t).length / hitAt.length;
    sink = n * 54; squash = 1 - n * 0.10; widen = 1 + n * 0.08;
  }
  const recoil = hitAt.some((t) => f >= t && f < t + 9);

  return (
    <Scene p={p} slug={hk === "collapse" ? "THE COLLAPSE" : "THE BARRAGE"}
      push={push(V, 91, 1.150)} vig={0.26}>
      <SetFor k="summon" f={f} vk={V} collapse={hk === "collapse" ? BAYS : undefined} />

      {/* ⛔ THE CLUTTER IS GONE. One low kerb of volumes each side instead of two
          growing walls of them — the frame belongs to him. */}
      <CratePile f={f} x={150} groundY={gy + 4} grow={0.22} z={36} seed={5} />
      <CratePile f={f} x={874} groundY={gy + 4} grow={0.20} z={36} seed={17} />

      {hk === "collapse" ? (<>
        {/* the volume he pulls, and the avalanche it lets go */}
        {f >= TUG - 8 && f < TUG + 14 && (
          <Volume x={E(f, TUG - 8, TUG + 6, 214, 300, OUT)} y={gy - 236} w={86} z={58}
            hue={2} rot={E(f, TUG - 8, TUG + 6, -6, 42, OUT)} />
        )}
        {BAYS.map((b, i) => Array.from({ length: 7 }, (_, q) => {
          const a = b + 6 + q * 2;
          const k = E(f, a, a + 26, 0, 1, IN_Q);
          if (k <= 0 || k >= 1) return null;
          const side = i % 2 === 0 ? -1 : 1;
          const sx = 506 + side * (300 + (i % 3) * 90);
          const ex = 506 + side * (70 + q * 26);
          return (
            <Volume key={"av" + i + "_" + q} x={sx + (ex - sx) * k}
              y={-60 + (gy - 40 - (-60)) * k * k} w={72 + (q % 3) * 16} z={64}
              hue={i + q} open={0.2 + k * 0.5} rot={side * k * 340} />
          );
        }))}
      </>) : (<>
        {/* the barrage: each volume flies IN from alternating sides and STRIKES him */}
        {PITCH.map((a, i) => {
          const k = E(f, a, a + 7, 0, 1, LIN);
          const side = i % 2 === 0 ? -1 : 1;
          if (k <= 0) return null;
          if (k >= 1) {
            /* the ricochet, after it hits */
            const r = E(f, a + 7, a + 26, 0, 1, OUT);
            if (r >= 1) return null;
            return (
              <Volume key={"rp" + i} x={506 + side * (60 + r * 420)}
                y={gy - 250 + r * r * 300} w={78} z={64} hue={i}
                open={0.3 + r * 0.5} rot={side * r * 420} />
            );
          }
          const sx = 506 + side * 700, ex = 506 + side * 62;
          return (
            <Volume key={"pt" + i} x={sx + (ex - sx) * k} y={gy - 250 - Math.sin(k * Math.PI) * 40}
              w={78} z={64} hue={i} rot={side * -180 * k} />
          );
        })}
      </>)}

      {/* ⭐ THE HERO — one Claude, centred, and every reaction is HIS */}
      <Contact x={506} y={gy} w={340 * widen} z={44} o={0.5} />
      <div style={{ position: "absolute", inset: 0, zIndex: 54,
        transformOrigin: `506px ${gy}px`,
        transform: `translate(${shove}px, ${sink}px) rotate(${spin}deg) scale(${widen}, ${squash})` }}>
        <Spec f={f} x={506} y={gy} size={HS} i={2} act={3} z={54} costume={{ glasses: 1 }}
          shock={recoil ? 0.55 : (hk === "collapse" && f > 60 ? 0.34 : 0)}
          cheer={hk === "pitch" && recoil ? 0.5 : 0}
          gaze={Math.sin(f / 13) * 0.8} />
      </div>

      {hitAt.map((t, i) => f >= t && f < t + 22 ? (
        <React.Fragment key={"hp" + i}>
          <Puff x={506 + (i % 2 ? 120 : -120)} y={gy - 210} f={f} at={t} n={7} s={1.2} c="#D8C4A0" />
          <Ring x={506 + (i % 2 ? 120 : -120)} y={gy - 210} f={f} at={t} max={240} c="#FFE6B4" />
        </React.Fragment>
      ) : null)}
    </Scene>
  );
};

/* =========================================================================
   S1 — THE SUMMON.  f93-167 (2.46s).  BEAT: HOOK.  Intensity 9.5.
   VO: "I tested all of them and these are the seven that you actually need."

   ⭐ THE EVENT, and the hero stays centre and biggest throughout: he raises his
   arms, SEVEN shafts of light punch down around the disc, and seven crates come
   in out of the dark stacks and slam into a ring at his feet — each cracking open
   into a specialist who is a fraction of his size. The hierarchy never inverts.
   ⛔ A repo is not a box, it is a HELPER (reel 107) — so every crate opens into a
   Claude, and the seven read as a CAST arriving to one person.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("summon"); const gy = p.horizon + 214;
  const AT = [6, 13, 19, 26, 33, 40, 47];
  /* ⛔ NOTHING MAY SIT INSIDE THE HERO'S FOOTPRINT (x 320..690). Three seats each
     side plus one far back and high, so all seven read AND he stays dominant. */
  const SEATS: Array<[number, number, number]> = [
    [ 92, 0,   168], [214, 30, 152], [316, 56, 136],  /* left, receding  */
    [506, 108, 116],                                   /* far back, high  */
    [700, 56, 136], [800, 30, 152], [922, 0,  168],    /* right, advancing */
  ];
  const seat  = (i: number) => ({ x: SEATS[i][0], y: gy - 34 - SEATS[i][1] });
  const seatS = (i: number) => SEATS[i][2];
  return (
    <Scene p={p} slug="THE SUMMON" push={push(V, 71, 1.175)} vig={0.46}>
      <SetFor k="summon" f={f} vk={V} />

      {/* ⭐⭐ THE RELEASE — he THROWS THE WHOLE STACK OFF HIS HEAD on frame 3.
          That is the main-subject event this shot is built on, and the depot
          traffic stops dead with it so nothing competes. */}
      <RailTraffic f={Math.min(f, 3)} y={122} z={28} dir={1} n={5} speed={6.2} />
      <StackBurst f={f} x={506} y={gy} size={400} at={3} n={9} z={66} />
      <CratePile f={f} x={168} groundY={gy + 4} grow={1} z={36} seed={5} />
      <CratePile f={f} x={856} groundY={gy + 4} grow={0.86} z={36} seed={17} />
      {f >= 4 && f < 20 && (<>
        <Ring x={506} y={gy} f={f} at={4} max={520} c="#FFE6B4" />
        <Ring x={506} y={gy} f={f} at={8} max={430} c="#FFF0C8" />
      </>)}

      {/* SEVEN SHAFTS punch down — the trigger, and they are large and bright */}
      {AT.map((a, i) => {
        const k = E(f, a - 5, a + 3, 0, 1, OUT);
        if (k <= 0) return null;
        const st = seat(i);
        return (
          <div key={"sf" + i} style={{ position: "absolute", left: st.x - 46, top: 0,
            width: 92, height: st.y, zIndex: 26, opacity: (1 - E(f, a + 6, a + 26, 0, 1, LIN)) * 0.9,
            background: `linear-gradient(180deg, ${hexa("#FFF0C8", 0.06)} 0%, ${hexa("#FFE6B4", 0.62)} 78%, ${hexa("#FFF6DC", 0.9)} 100%)` }} />
        );
      })}

      {/* the seven arrive OUT OF THE DARK STACKS and land in the ring */}
      {AT.map((a, i) => {
        const st = seat(i);
        return (
          <FlyingCrate key={"fc" + i} f={f} i={i} at={a} groundY={st.y}
            toX={st.x} fromX={i % 2 === 0 ? -180 : 1200}
            fromY={p.horizon - 210 - (i % 3) * 54} z={26 + Math.abs(i - 3)} />
        );
      })}
      {AT.map((a, i) => {
        const st = seat(i);
        return <CrateOpen key={"co" + i} f={f} at={a + 16} x={st.x} groundY={st.y} z={26 + Math.abs(i - 3)} />;
      })}
      {AT.map((a, i) => {
        const st = seat(i);
        const k = E(f, a + 20, a + 30, 0, 1, BACK);
        if (k <= 0) return null;
        /* ⛔ the specialists are deliberately a THIRD of the hero's size — the
           whole note was that the hook needs a hierarchy. */
        return (
          <Spec key={"sp" + i} f={f} x={st.x} y={st.y + (1 - k) * 40} size={seatS(i) * k}
            i={i} act={i % 4} z={30 + Math.abs(i - 3)} costume={SPEC_COSTUME[i]} />
        );
      })}

      {/* the hero, still centre, still the biggest thing in frame, arms up */}
      {/* ⭐⭐ THE TOP OF THE LIFT. He enters still crushed (sink 104, squash 0.83,
          spread 1.13 — exactly where S0 left him) and EXTENDS through the burst to
          a full overhead lockout, overshooting past his own standing height. That
          overshoot is the whole reason a lift reads and a sway does not. */}
      <Contact x={506} y={gy} w={340} z={44} o={0.5} />
      <div style={{ position: "absolute", inset: 0, zIndex: 56,
        transformOrigin: `506px ${gy}px`,
        transform: `translateY(${E(f, 0, 12, 54, -46, BACK)}px) scale(${E(f, 0, 12, 1.08, 0.97, BACK)}, ${E(f, 0, 12, 0.90, 1.10, BACK)})` }}>
        <Spec f={f} x={506} y={gy} size={400} i={2} act={2} z={56} costume={{ glasses: 1 }}
          cheer={E(f, 1, 13, 0.6, 1, OUT)} shock={f < 2 ? 0.5 : 0} />
      </div>

      {/* ⛔ THE NEAR SHELF. SUMMON measured p10 66.2 against a 35 bar. Frame 0 is not
          affected by a foreground mass (only the >=140 MEAN is, and that is a
          different frame), so the black point comes back here without touching the
          hook's brightness — and it answers the depth question at the same time. */}
      <div style={{ position: "absolute", left: -60, right: -60, bottom: -30, height: 150,
        zIndex: 84, background: "linear-gradient(180deg, rgba(10,7,4,0) 0%, rgba(10,7,4,0.88) 44%, #070502 100%)" }} />
      {[30, 214, 398, 582, 766, 950].map((bx, bi) => (
        <div key={"nsha" + bi} style={{ position: "absolute", left: bx, bottom: -18, width: 150,
          height: 118, zIndex: 85, background: "#0A0704", border: "5px solid #1A1209",
          borderRadius: 4 }} />
      ))}
      <Tag x={118} y={128} t="7 SPECIALISTS" c="#FFE9C0" s={1.25} z={84}
        o={E(f, 42, 54, 0, 1, OUT)} />
    </Scene>
  );
};

/* =========================================================================
   S2 — THE SEVENTH.  f167-224 (1.90s).  BEAT: HOOK / TEASE.  Intensity 7.5.
   VO: "And the last one is crazy good."

   ⭐ THE OPEN LOOP: six specialists are up and working around him; the SEVENTH
   crate is still shut, back-lit red, and it THUMPS from inside. It does not open
   until S15, 50 seconds later.
   ⛔⛔ v1 TINTED SIX SPRITES `#3A2E28` AS "SILHOUETTES" AND THEY RENDERED AS BLACK
      BLOBS WITH FLOATING HATS AND GLASSES. Alex: *"why are there black claude
      sprites?"* **The house mascot is CLAY and it is never repainted.** A Claude
      in shadow is a clay Claude with less light on it, which is what a scrim
      BEHIND it does — so the scrim now sits ABOVE the cast in z, and no sprite
      carries a tint anywhere in this reel.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("summon"); const gy = p.horizon + 214;
  const TH = [14, 31];
  const dent = TH.reduce((d, a) => d + (f >= a && f < a + 14
    ? Math.sin(((f - a) / 14) * Math.PI) * 18 : 0), 0);
  /* the same seat table as S1 — the cast does not teleport between the two shots */
  /* ⛔ S2's own seats: the right side comes INBOARD so the tease crate can own the
     frame edge without hiding half the cast. */
  const SEATS: Array<[number, number, number]> = [
    [ 92, 0,   168], [214, 30, 152], [316, 58, 134],
    [506, 110, 114],
    [664, 58, 134], [752, 26, 150], [922, 0, 168],
  ];
  const seat  = (i: number) => ({ x: SEATS[i][0], y: gy - 34 - SEATS[i][1] });
  const seatS = (i: number) => SEATS[i][2];
  return (
    <Scene p={p} slug="CRATE SEVEN" push={push(V, 54, 1.205)} vig={0.56}>
      <SetFor k="summon" f={f} vk={V} />
      <CratePile f={f} x={168} groundY={gy + 4} grow={1} z={26} seed={5} />

      {/* the six who are already up, working, around him */}
      {[0, 1, 2, 4, 5, 6].map((i) => {
        const st = seat(i);
        return (
          <Spec key={"sx" + i} f={f + i * 6} x={st.x} y={st.y} size={seatS(i)} i={i}
            act={f >= 22 ? 2 : i % 4} z={30 + (3 - Math.abs(i - 3))} costume={SPEC_COSTUME[i]} />
        );
      })}

      {/* ⛔ THE SHADE GOES *OVER* THE CAST, NOT INTO IT. This is what makes the
          seventh crate the only lit thing without repainting a single Claude. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 62,
        background: `radial-gradient(58% 46% at 50% 62%, rgba(10,8,14,0) 0%, rgba(10,8,14,0.62) 100%)` }} />

      {/* THE SEVENTH CRATE — big, shut, thumping from inside */}
      <div style={{ position: "absolute", left: 1012 - 246, top: gy - 250,
        width: 258, height: 226, zIndex: 66,
        transform: `scaleX(${1 + dent / 258}) rotate(${rockAt(f, 14, 3)}deg)`,
        transformOrigin: "50% 100%" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 8,
          background: "linear-gradient(178deg, #6E5A44 0%, #2A2018 100%)",
          border: "9px solid #17120C" }} />
        {[0.20, 0.52, 0.82].map((t, j) => (
          <div key={"bd" + j} style={{ position: "absolute", left: 9, right: 9, top: 226 * t,
            height: 13, background: "#17120C" }} />
        ))}
        {[[12, 12], [12, 184], [212, 12], [212, 184]].map(([bx, by], j) => (
          <div key={"cb" + j} style={{ position: "absolute", left: bx, top: by, width: 36,
            height: 30, background: "#3A2C1E", border: "3px solid #17120C", borderRadius: 3 }} />
        ))}
        <div style={{ position: "absolute", left: 9, right: 9, top: 106, height: 12 + dent * 0.5,
          background: `linear-gradient(180deg, ${hexa("#FF7A5A", 0.3 + dent * 0.04)} 0%, ${hexa("#FFC49A", 0.95)} 50%, ${hexa("#FF7A5A", 0.3 + dent * 0.04)} 100%)` }} />
        <div style={{ position: "absolute", left: 98, top: 140, width: 58, height: 58,
          borderRadius: 15, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(GH)} style={{ width: 46, height: 46, objectFit: "contain" }} />
        </div>
      </div>
      {TH.map((a, i) => <Ring key={"th" + i} x={888} y={gy - 132} f={f} at={a} max={250} c="#FF9A7A" />)}

      {/* ⭐⭐⭐ THE CROWN GOES ON HIS HEAD. v3 landed it on the crate and Alex was
          blunt: *"put the crown on his head."* It now drops onto the HERO on the
          line "the last one is crazy good", he throws his arms up, and the whole
          cast cheers with him. ⛔ The crown line is `y - 0.78*size` measured off
          the render, not derived from the container box. */}
      {/* ⛔ THE NEAR SHELF. CROWN measured p10  against a 35 bar. Frame 0 is not
          affected by a foreground mass (only the >=140 MEAN is, and that is a
          different frame), so the black point comes back here without touching the
          hook's brightness — and it answers the depth question at the same time. */}
      <div style={{ position: "absolute", left: -60, right: -60, bottom: -30, height: 138,
        zIndex: 84, background: "linear-gradient(180deg, rgba(10,7,4,0) 0%, rgba(10,7,4,0.88) 44%, #070502 100%)" }} />
      {[30, 214, 398, 582, 766, 950].map((bx, bi) => (
        <div key={"nshb" + bi} style={{ position: "absolute", left: bx, bottom: -18, width: 150,
          height: 108, zIndex: 85, background: "#0A0704", border: "5px solid #1A1209",
          borderRadius: 4 }} />
      ))}
      <Crown f={f} x={430} y={headTop(gy, 400) + 6} at={8} s={2.1} z={94} />
      {f >= 24 && (
        <div style={{ position: "absolute", left: 430 - 150 + ((f - 24) * 15) % 320,
          top: headTop(gy, 400) - 110, width: 44, height: 130, zIndex: 95,
          transform: "skewX(-18deg)",
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,245,214,0.80) 50%, rgba(255,255,255,0) 100%)" }} />
      )}

      {/* the hero turns to look at it — still centre, still the biggest */}
      <Spec f={f} x={430} y={gy} size={400} i={3} act={2} z={70} costume={{ glasses: 1 }}
        cheer={f >= 22 ? E(f, 22, 34, 0, 1, OUT) : 0} shock={f >= 8 && f < 22 ? 0.34 : 0} />

    </Scene>
  );
};

/* =========================================================================
   S3 — THE NIGHT ARCHIVE.  f233-402 (5.64s).  ITEM 1.  Intensity 7.
   VO: "One, Claude Subconscious. This is a background subagent that watches
        your sessions, reads your files and builds memory over time."

   ⭐ INPUT -> PROCESS -> OUTPUT, all three visible:
     input    session tapes peel off the sleeping Claude's screen
     process  a second Claude rides the ladder and slots each into a drawer
     output   the LIT FRACTION of the 63-drawer wall climbs across the scene
   ⛔ The arrivals are staggered across the FULL 169 frames.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("archive"); const gy = p.horizon + 150;
  /* ⭐⭐ REBUILT. Alex: *"the animations throughout are still way too boring,
     especially between 1-3."* v1 was a 63-rectangle drawer grid with tapes flying
     into it — furniture moving while two Claudes stood still.
     THE CONCEPT NOW: THE NIGHT SHIFT. You are asleep at the desk. A SECOND Claude
     — the subconscious — works around you all night: he walks the floor, picks up
     the volumes you left scattered, carries each one back and BINDS it into a
     ledger that visibly thickens. Every beat is a character physically doing
     something, which is the note. */
  const TRIP = [4, 26, 48, 70, 92, 114, 136];      /* seven fetch-and-bind runs */
  const bound = TRIP.filter((t) => f >= t + 16).length;
  const fill = bound / TRIP.length;
  /* where he is in the current trip: out to the floor, then back to the lectern */
  const cur = TRIP.filter((t) => f >= t).slice(-1)[0];
  const lf = cur === undefined ? 0 : f - cur;
  const walk = cur === undefined ? 0 : (lf < 10 ? lf / 10 : lf < 16 ? 1 : Math.max(0, 1 - (lf - 16) / 8));
  const px = 700 - walk * 300;
  return (
    <Scene p={p} slug="THE NIGHT SHIFT · 03:40" push={push(V, 159, 1.165)} vig={0.65}>
      <SetFor k="archive" f={f} vk={V} />

      {/* the desk, and YOU asleep on it */}
      <div style={{ position: "absolute", left: 780, top: gy - 78, width: 300, height: 104,
        zIndex: 40, borderRadius: 5,
        background: "linear-gradient(180deg, #4A3F28 0%, #2A2416 100%)", border: "5px solid #1E1A10" }} />
      <div style={{ position: "absolute", left: 812, top: gy - 200, width: 190, height: 122,
        zIndex: 41, borderRadius: 6, background: "#141A2C", border: "7px solid #3A3020" }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"cl" + i} style={{ position: "absolute", left: 12, top: 14 + i * 17,
            width: 32 + rnd(5, i) * 110, height: 6, borderRadius: 2,
            background: hexa(AMBER, 0.20 + rnd(6, i) * 0.30) }} />
        ))}
      </div>
      <Spec f={f} x={902} y={gy + 26} size={168} i={0} act={3} z={44}
        costume={SPEC_COSTUME[0]} gaze={-1.2} shock={0} />
      {/* the Zs, so "asleep" is unmistakable */}
      {[0, 1, 2].map((i) => {
        const k = ((f + i * 26) % 78) / 78;
        return (
          <div key={"z" + i} style={{ position: "absolute", left: 946 + k * 44,
            top: gy - 150 - k * 84, zIndex: 46, opacity: (1 - k) * 0.9,
            ...ui(30 + i * 8, 900), color: "#FFE6B4" }}>z</div>
        );
      })}

      {/* the volumes you left on the floor, taken one by one */}
      {TRIP.map((t, i) => f < t + 13 ? (
        <Volume key={"fl" + i} x={280 + i * 74} y={gy + 6} w={70} z={38} hue={i} rot={-8 + i * 5} />
      ) : null)}

      {/* ⭐ THE SUBCONSCIOUS — he walks out, picks one up and carries it back, over
          and over. This is the main-subject motion the scene was missing. */}
      <Spec f={f} x={px} y={gy + 10} size={330} i={1} act={walk > 0.1 && walk < 1 ? 0 : 1}
        z={52} costume={{ glasses: 1, suit: 1 }} />
      {cur !== undefined && lf >= 10 && lf < 22 && (
        <Volume x={px} y={gy - 150} w={76} z={54} hue={bound} rot={Math.sin(lf) * 10} />
      )}

      {/* the ledger, thickening all night */}
      {/* the working light that makes him the brightest thing in the room */}
      <Pool x={px} y={gy - 8} w={470} c="#FFD59A" o={0.42} z={30} />
      <Ledger x={330} groundY={gy} fill={fill} z={46} />
      {TRIP.map((t, i) => f >= t + 16 && f < t + 30 ? (
        <React.Fragment key={"bd" + i}>
          <Ring x={330} y={gy - 150} f={f} at={t + 16} max={190} c="#FFD59A" />
          <Puff x={330} y={gy - 130} f={f} at={t + 16} n={6} s={0.9} c="#C8A472" />
        </React.Fragment>
      ) : null)}

      <ItemNum f={f} x={118} y={556} n={1} s={1} z={84} at={2} c="#FFE6B4" />
    </Scene>
  );
};

/* =========================================================================
   S4 — THE ARCHIVE AT DAWN.  f402-484 (2.71s).  ITEM 1 PAYOFF. Intensity 6.5.
   VO: "So Claude stops forgetting everything between sessions."
   ⭐ §10: THE MISSING HALF. S3 showed the FILING and stopped. A scene that files
      and never retrieves is a progress bar. Here the wall FEEDS A TAPE BACK into
      his hand without him looking, and his screen repopulates.
   ⛔ Same room, but the key swings amber -> cold blue: hue AND lightness both
      change, which is the pairwise neighbour rule.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("archiveDawn"); const gy = p.horizon + 150;
  /* ⭐ THE HAND-OFF. §10's missing half: the night shift only means something if
     you are GIVEN the result. He wakes, the subconscious walks over and puts the
     finished ledger in his hands, and he opens it. Two characters, one object,
     one exchange. */
  const GIVE = 16, OPEN = 34;
  const k = E(f, GIVE, GIVE + 16, 0, 1, IO);
  const lx = 300 + (592 - 300) * k;
  return (
    <Scene p={p} slug="THE ARCHIVE · 07:10" push={push(V, 76, 1.185)} vig={0.55}>
      <SetFor k="archiveDawn" f={f} vk={V} />

      <div style={{ position: "absolute", left: 520, top: gy - 82, width: 420, height: 112,
        zIndex: 40, borderRadius: 5,
        background: "linear-gradient(180deg, #7E8490 0%, #4E5560 100%)", border: "5px solid #3A404A" }} />

      {/* the subconscious brings it over */}
      <Spec f={f} x={lx - 232} y={gy + 34} size={172} i={1} act={0} z={50}
        costume={{ glasses: 1, suit: 1 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 52,
        transform: `translate(${lx - 330}px, ${-Math.sin(k * Math.PI) * 44}px)` }}>
        <Ledger x={330} groundY={gy - 60} fill={1} z={52} />
      </div>

      {/* he wakes and takes it */}
      <Spec f={f} x={646} y={gy + 4} size={330} i={2} act={f >= OPEN ? 2 : 3} z={54}
        costume={SPEC_COSTUME[0]}
        cheer={f >= OPEN ? E(f, OPEN, OPEN + 14, 0, 0.95, OUT) : 0}
        shock={f >= GIVE && f < OPEN ? 0.34 : 0} />
      {f >= OPEN && <Ring x={646} y={gy - 200} f={f} at={OPEN} max={330} c="#DCEBFA" />}
      <Pool x={646} y={gy - 8} w={520} c="#DCEBFA" o={0.38} z={30} />

      <RepoPlate f={f} x={118} y={116} r={R[0]} s={1} z={86} at={28} />
      <SquadCard f={f} x={742} y={132} filled={1} s={0.62} z={88} at={44} />
    </Scene>
  );
};

/* =========================================================================
   S5 — THE LINE.  f484-630 (4.87s).  ITEM 2.  Intensity 7.5.
   VO: "Two, Superpowers. This gives Claude a full development workflow,
        brainstorm, spec, plan, test, review."
   ⭐ §4: a LIST becomes a PROCESS. Five stations, and the block visibly changes
      SHAPE at each one — five DISCRETE stamps, never one smooth tween (4.27 vs
      5.63 measured). The five words live in the HEADER BAND, not the picture.
   ⛔ The conveyor is the background process and it alternates LIGHT AND SHADOW
      slats: a light-only band scored 7.79 AND lifted the black point 47.4->56.1.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("line"); const gy = p.horizon + 116;
  /* ⭐⭐ REBUILT AS A BUCKET BRIGADE. v1 was a conveyor carrying blocks past five
     press heads — furniture again. Reel 110 measured this exact swap: eight
     looping sprites became a bucket brigade and the scene went 12.83 -> 23.13.
     FIVE Claudes stand in a line and PASS THE VOLUME hand to hand, and each one
     works it as it goes by, so the object visibly changes down the chain. */
  const X = [140, 320, 500, 680, 860];
  const HAND = [10, 34, 58, 82, 106];             /* when each pair hands over */
  const stage = HAND.filter((t) => f >= t + 12).length;
  /* the volume's position: it travels between the pairs of hands */
  let vx = X[0], vy = gy - 190, rot = 0;
  const cur = HAND.filter((t) => f >= t).length - 1;
  if (cur >= 0) {
    const t = HAND[cur];
    const k = E(f, t, t + 12, 0, 1, IO);
    const a = X[cur], b = X[Math.min(4, cur + 1)];
    vx = a + (b - a) * k;
    vy = gy - 190 - Math.sin(k * Math.PI) * 96;
    rot = k * 180;
  }
  return (
    <Scene p={p} slug="THE RELAY" push={push(V, 137, 1.175)} vig={0.61}>
      <SetFor k="line" f={f} vk={V} />

      {/* the five, each with their own costume and their own job */}
      {X.map((x, i) => {
        const busy = cur === i || cur === i - 1;
        return (
          <React.Fragment key={"rl" + i}>
            {/* the bench each one works at — a real fitting, waist high */}
            <div style={{ position: "absolute", left: x - 105, top: gy - 64, width: 210, height: 84,
              zIndex: 44, borderRadius: 5,
              background: "linear-gradient(180deg, #4E7276 0%, #24484C 100%)",
              border: "5px solid #163034" }} />
            <Spec f={f} x={x} y={gy + 6} size={232} i={i} act={busy ? 2 : 1} z={46}
              costume={[{ constr: 1 }, { prof: 1 }, { glasses: 1 }, { chef: 1 }, { samurai: 1 }][i]}
              cheer={busy ? 0.7 : 0} />
          </React.Fragment>
        );
      })}

      {/* ⭐ THE VOLUME travelling down the chain, changing as it goes */}
      <Volume x={vx} y={vy} w={104} z={60} lit={stage >= 4} hue={stage}
        rot={rot} open={cur >= 0 && cur < 4 ? 0.35 : 0} />
      {HAND.map((t, i) => f >= t + 12 && f < t + 26 ? (
        <React.Fragment key={"hr" + i}>
          <Ring x={X[Math.min(4, i + 1)]} y={gy - 190} f={f} at={t + 12} max={170} c="#CFEDEE" />
          <Puff x={X[Math.min(4, i + 1)]} y={gy - 170} f={f} at={t + 12} n={5} s={0.8} c="#8AB4B8" />
        </React.Fragment>
      ) : null)}

      <ItemNum f={f} x={118} y={132} n={2} s={1} z={84} at={2} c="#CFEDEE" />
    </Scene>
  );
};

/* =========================================================================
   S6 — THE BALCONY.  f630-791 (5.38s).  ITEM 2 PAYOFF.  Intensity 7.
   VO: "So it turns Claude from a coding assistant into a project manager that
        runs your entire build process."
   ⭐ §10: THE MISSING HALF was the OUTPUT. A promotion with nothing produced is
      a label swap. He climbs, changes costume ON A BEAT, and then THROWS work
      down onto FOUR lines — four discrete throws, each starting a line moving.
   ⛔ THE ONLY MOTIVATED CAMERA MOVE IN THE REEL BESIDES S17: a slow rise,
      motivated by the promotion. Everything else is locked.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("line"); const gy = p.horizon + 116;
  /* ⛔⛔ REBUILT. Alex: *"animation at 22 seconds needs to be way better and why is
     the sprite so far off to the left, this animation sucks."* Both true and the
     same cause: the hero was parked at x=140 on a balcony while the interesting
     thing (four conveyors) happened to the right of him. He was a bystander in
     his own promotion.
     THE CONCEPT NOW: he stands CENTRE on a raised foreman's dais and RUNS the
     floor — he points, and a relay line fires up in that direction; points again,
     another; again, another. Three commands, three crews starting, and every one
     of them is caused by him. */
  const POINT = [16, 52, 88];
  const DIRS  = [-1, 1, -1];
  const dais  = E(f, 0, 20, 0, 1, BACK);           /* he steps up onto it */
  return (
    <Scene p={p} slug="THE FLOOR" push={push(V, 151, 1.165)} vig={0.60}>
      <SetFor k="line" f={f} vk={V} />

      {/* the three crews he starts, each on its own rail, each with real workers */}
      {POINT.map((t, i) => {
        const on = f >= t + 8;
        const ry = 214 + i * 96;
        return (
          <React.Fragment key={"crew" + i}>
            <div style={{ position: "absolute", left: -60, right: -60, top: ry + 74, height: 13,
              zIndex: 30, background: "linear-gradient(180deg, #4E7276 0%, #1E4044 100%)" }} />
            {on && Array.from({ length: 4 }, (_, q) => {
              const x = ((f - t - 8) * (5.4 + i) + q * 300) % 1320 - 150;
              return (
                <Volume key={"cw" + q} x={DIRS[i] > 0 ? x : 1012 - x} y={ry + 74} w={76}
                  z={32} hue={i * 2 + q} rot={Math.sin((f + q * 20) / 15) * 5} />
              );
            })}
            {/* two workers per crew, and they only start when he points */}
            {[0.26, 0.72].map((fx, q) => (
              <Spec key={"cs" + q} f={f} x={fx * 1012} y={ry + 96} size={150 + q * 12}
                i={i * 2 + q} act={on ? 1 : 3} z={34}
                costume={[{ constr: 1 }, { prof: 1 }, { chef: 1 }, { fro: 1 }, { girl: 1 }, { suit: 1 }][(i * 2 + q) % 6]} />
            ))}
          </React.Fragment>
        );
      })}

      {/* ⭐ THE DAIS, DEAD CENTRE — a real fitting: a plate, a rail and two steps */}
      <div style={{ position: "absolute", left: 506 - 150, top: gy - 34, width: 300, height: 34,
        zIndex: 52, background: "linear-gradient(180deg, #5E8286 0%, #2A4E52 100%)",
        border: "6px solid #163034", borderRadius: 5 }} />
      <div style={{ position: "absolute", left: 506 - 120, top: gy, width: 240, height: 26,
        zIndex: 51, background: "#24484C", border: "5px solid #163034" }} />
      {[-134, 122].map((dx, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: 506 + dx, top: gy - 130,
          width: 12, height: 100, zIndex: 53, background: "#4E7276" }} />
      ))}

      {/* ⭐ THE FOREMAN — centred, raised, and every crew starts because he points */}
      <Spec f={f} x={506} y={gy - 34 - dais * 6} size={272} i={2}
        act={POINT.some((t) => f >= t && f < t + 14) ? 2 : 1} z={56}
        costume={{ suit: 1, glasses: 1 }}
        cheer={POINT.some((t) => f >= t && f < t + 14) ? 1 : 0.25} />
      {POINT.map((t, i) => f >= t && f < t + 20 ? (
        <React.Fragment key={"pr" + i}>
          <Ring x={506 + DIRS[i] * 150} y={214 + i * 96 + 74} f={f} at={t + 8} max={280} c="#CFEDEE" />
          <Puff x={506 + DIRS[i] * 150} y={214 + i * 96 + 74} f={f} at={t + 8} n={7} s={1.1} c="#8AB4B8" />
        </React.Fragment>
      ) : null)}

      <RepoPlate f={f} x={118} y={116} r={R[1]} s={1} z={86} at={104} />
      <SquadCard f={f} x={742} y={132} filled={2} s={0.58} z={88} at={118} />
    </Scene>
  );
};

/* =========================================================================
   S7 — THE INDEX HALL.  f791-956 (5.51s).  ITEM 3.  Intensity 8.
   VO: "Three, Awesome Claude Code. It has a master index of the entire Claude
        Code ecosystem, skills, hooks, commands, orchestrators,"
   ⭐ §4's depiction of "a headline": SPLIT-FLAP cells flipping letter by letter.
      Four banks resolve in sequence across the FULL duration. Every flap is a
      large high-contrast element changing per frame, which is exactly the shape
      the motion audit rewards — and it is the literal picture of an INDEX
      resolving out of noise.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("hall"); const gy = p.horizon + 130;
  /* ⭐⭐ REBUILT AS A WHEEL A CLAUDE SPINS. v1 was a split-flap board that changed
     BY ITSELF while a Claude stood at a console — the classic "motion in the
     furniture" note. A wheel is a thing a CHARACTER operates: he hauls it round,
     it whirls, he stops it dead with a hand and plucks a volume out. Four times,
     faster each time. */
  const SPIN = [8, 46, 84, 118];
  /* the wheel's angle: hauled hard on each spin, decaying between */
  const spin = SPIN.reduce((a, t, i) => {
    if (f < t) return a;
    const lf = f - t;
    return a + (1 - Math.exp(-lf / 9)) * (260 + i * 40);
  }, 0);
  const taken = SPIN.filter((t) => f >= t + 22).map((_, i) => i * 3);
  return (
    <Scene p={p} slug="THE INDEX" push={push(V, 154, 1.185)} vig={0.63}>
      <SetFor k="hall" f={f} vk={V} />

      <Carousel f={f} x={600} y={300} r={228} spin={spin} z={40} taken={taken} />

      {/* ⭐ THE LIBRARIAN hauls it round — arms up on every spin, and he leans back
          against the weight of it. */}
      {SPIN.map((t, i) => f >= t && f < t + 12 ? (
        <Ring key={"sr" + i} x={600} y={300} f={f} at={t} max={420} c="#FFDE9E" />
      ) : null)}
      <Spec f={f} x={196} y={gy + 46} size={286} i={1}
        act={SPIN.some((t) => f >= t && f < t + 14) ? 2 : 1} z={56}
        costume={SPEC_COSTUME[2]}
        cheer={SPIN.some((t) => f >= t && f < t + 14) ? 0.9 : 0.2} />

      {/* the volumes he has plucked, stacking on his bench */}
      {SPIN.map((t, i) => {
        const k = E(f, t + 22, t + 34, 0, 1, IO);
        if (k <= 0) return null;
        const sx = 600 + Math.cos((spin + i * 77) * Math.PI / 180) * 228;
        const ex = 214 + (i - 1.5) * 52;
        return (
          <Volume key={"pk" + i} x={sx + (ex - sx) * k}
            y={(300 + 46) + (gy - 120 - 346) * k - Math.sin(k * Math.PI) * 90}
            w={86} z={62} hue={i + 3} lit rot={(1 - k) * 220} />
        );
      })}

      {/* ⛔ THE NEAR SHELF. INDEX measured p10 47.9 against a 35 bar. Frame 0 is not
          affected by a foreground mass (only the >=140 MEAN is, and that is a
          different frame), so the black point comes back here without touching the
          hook's brightness — and it answers the depth question at the same time. */}
      <div style={{ position: "absolute", left: -60, right: -60, bottom: -30, height: 132,
        zIndex: 84, background: "linear-gradient(180deg, rgba(10,7,4,0) 0%, rgba(10,7,4,0.88) 44%, #070502 100%)" }} />
      {[30, 214, 398, 582, 766, 950].map((bx, bi) => (
        <div key={"nshc" + bi} style={{ position: "absolute", left: bx, bottom: -18, width: 150,
          height: 104, zIndex: 85, background: "#0A0704", border: "5px solid #1A1209",
          borderRadius: 4 }} />
      ))}
      <ItemNum f={f} x={118} y={556} n={3} s={1} z={84} at={2} c="#FFDE9E" />
    </Scene>
  );
};

/* =========================================================================
   S8 — THE CHUTE.  f956-1036 (2.66s).  ITEM 3 PAYOFF.  Intensity 7.
   VO: "and even the best plugins to automatically install."
   ⭐ "Automatically" is the whole word in that line, and the picture earns it by
      having NO HAND IN SHOT: three cartridges drop, and the rack closes over
      them on its own. He watches with his hands behind his back.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("hall"); const gy = p.horizon + 130;
  /* ⛔⛔ REBUILT. On the contact sheet this was the emptiest frame in the reel: a
     brown wall, one small Claude bottom-left and a dark rack. The whole upper two
     thirds did nothing.
     THE CONCEPT NOW: the index he spun is RAINING its picks down a chute into a
     rack that seats them itself, and he is standing under it with his arms up,
     catching nothing — because "automatically" means no hands. */
  const AT = [4, 14, 24, 34, 44, 54, 62];
  const CX = [286, 400, 514, 628, 742, 856, 970];
  const seated = AT.filter((t) => f >= t + 14).length;
  const close = E(f, 62, 72, 0, 1, OUT);
  return (
    <Scene p={p} slug="THE CHUTE" push={push(V, 74, 1.215)} vig={0.60}>
      <SetFor k="hall" f={f} vk={V} />

      {/* the chute mouth spans the TOP of frame — it is what the volumes fall out
          of, and it fills the dead upper third */}
      <div style={{ position: "absolute", left: -40, right: -40, top: -30, height: 168, zIndex: 30,
        background: "linear-gradient(180deg, #241C10 0%, #4A3820 100%)",
        border: "8px solid #6E4E1E", borderRadius: 6 }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"tooth" + i} style={{ position: "absolute", left: -20 + i * 140, top: 118,
          width: 96, height: 40, zIndex: 31, background: "#5A4028",
          border: "5px solid #33240F", borderRadius: "0 0 8px 8px" }} />
      ))}

      {/* seven volumes raining down and seating themselves */}
      {AT.map((t, i) => {
        const k = E(f, t, t + 14, 0, 1, IN_Q);
        if (k <= 0) return null;
        const ty = gy - 96;
        return (
          <React.Fragment key={"cg" + i}>
            <Volume x={CX[i]} y={150 + (ty - 150) * k} w={92} z={54} hue={i} lit
              rot={(1 - k) * 300} open={k < 1 ? 0.4 : 0} sq={squashAt(f, t + 14, 0.28)} />
            {f >= t + 14 && <Ring x={CX[i]} y={ty} f={f} at={t + 14} max={150} c="#FFDE9E" />}
          </React.Fragment>
        );
      })}

      {/* the rack that closes over them BY ITSELF */}
      <div style={{ position: "absolute", left: 230, top: gy - 104, width: 800, height: 108,
        zIndex: 50, borderRadius: 6, background: "linear-gradient(180deg, #4A3820 0%, #241A0C 100%)",
        border: "7px solid #6E4E1E" }} />
      <div style={{ position: "absolute", left: 230, top: gy - 104, width: 800, height: 108 * close,
        zIndex: 58, background: "linear-gradient(180deg, #8A6428 0%, #4A3820 100%)",
        borderLeft: "7px solid #6E4E1E", borderRight: "7px solid #6E4E1E" }} />
      {close > 0.95 && <Ring x={630} y={gy - 50} f={f} at={72} max={330} c="#FFDE9E" />}

      {/* ⛔ HANDS BEHIND HIS BACK — "automatically" only reads if nothing touches it */}
      <Spec f={f} x={132} y={gy + 40} size={244} i={3} act={3} z={56} costume={SPEC_COSTUME[2]} />

      <RepoPlate f={f} x={118} y={116} r={R[2]} s={0.92} z={86} at={26} />
      <SquadCard f={f} x={742} y={132} filled={3} s={0.56} z={88} at={46} />
    </Scene>
  );
};

/* =========================================================================
   S9 — THE THREE BENCHES.  f1036-1136 (3.33s).  ITEM 4.  Intensity 8.5.
   VO: "Four, Claude Squad. This lets you run multiple Claude agents in parallel."
   ⭐ THE NAMESAKE SCENE — density PEAKS across S9-S11.
   ⭐ §3: "parallel" is drawn as THREE LIT POOLS WHERE THERE WAS ONE, not as
      three cards. The dark between the pools is the hierarchy.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("bench"); const gy = p.horizon + 138;
  const SNAP = [32, 54];
  return (
    <Scene p={p} slug="THE BENCHES" push={push(V, 93, 1.165)} vig={0.80}>
      <SetFor k="bench" f={f} vk={V} />
      {/* the two outer pools are DARK until they snap on */}
      {[0, 2].map((bi, j) => f < SNAP[j] ? (
        <div key={"dk" + bi} style={{ position: "absolute", left: BENCH_X[bi] - 210, top: 0,
          width: 420, bottom: 0, zIndex: 24, background: hexa("#0A0C10", 0.66) }} />
      ) : null)}

      {BENCH_X.map((x, i) => (
        <Bench key={"bn" + i} x={x} groundY={gy} z={54} lit={i === 1 || f >= SNAP[i === 0 ? 0 : 1]} />
      ))}

      {/* ONE Claude working alone, then two stride in from the wings */}
      <Spec f={f} x={BENCH_X[1]} y={gy - 6} size={251} i={1} act={1} z={46}
        costume={SPEC_COSTUME[3]} />
      {[0, 2].map((bi, j) => {
        const a = SNAP[j];
        if (f < a - 22) return null;
        const k = E(f, a - 22, a + 4, 0, 1, IO);
        const fromX = bi === 0 ? -140 : 1220;
        return (
          <React.Fragment key={"ar" + bi}>
            <Spec f={f} x={fromX + (BENCH_X[bi] - fromX) * k} y={gy - 6} size={251}
              i={bi} act={k >= 1 ? 1 : 0} z={46} costume={CROWD_COSTUME[j + 1]} />
            {f >= a && <Ring x={BENCH_X[bi]} y={gy} f={f} at={a} max={210} c="#FFF8E6" />}
          </React.Fragment>
        );
      })}

      {/* ⛔ BENCH measured 7.11 — three benches doing nothing until the sprites
          arrived. A workshop is ALREADY WORKING when you cut to it, so the
          overhead rail carries work across the whole scene from frame 0. */}
      <div style={{ position: "absolute", left: -60, right: -60, top: 250, height: 15, zIndex: 52,
        background: "linear-gradient(180deg, #8A7E66 0%, #4A4232 100%)" }} />
      {Array.from({ length: 6 }, (_, j) => {
        const x = ((f * 6.2 + j * 196) % 1300) - 140;
        return (
          <div key={"rw" + j} style={{ position: "absolute", left: x, top: 186, width: 108,
            height: 66, zIndex: 53, borderRadius: 5,
            transform: `rotate(${Math.sin((f + j * 20) / 14) * 5}deg)`,
            background: `linear-gradient(178deg, ${mxh(CLAY, 0.18)} 0%, ${dkh(CLAY, 0.2)} 100%)`,
            border: `4px solid ${dkh(CLAY, 0.36)}` }}>
            <div style={{ position: "absolute", left: 12, top: 14, width: 52, height: 7,
              background: dkh(CLAY, 0.34) }} />
            <div style={{ position: "absolute", left: 12, top: 32, width: 74, height: 7,
              background: dkh(CLAY, 0.34) }} />
          </div>
        );
      })}
      <ItemNum f={f} x={118} y={130} n={4} s={1} z={84} at={2} c="#FFF8E6" />
    </Scene>
  );
};

/* =========================================================================
   S10 — THREE JOBS AT ONCE.  f1136-1248 (3.72s).  ITEM 4.  ⭐ DENSITY PEAK.
   VO: "One agent builds a feature, another one writes tests, and then the third
        one refactors your code."
   ⭐ THE HIGHEST-DENSITY BEAT IN THE REEL. All three run DIFFERENT action loops
      AND each PRODUCES something that LEAVES its bench — three continuous
      background processes at once. The VO names three different jobs, so the
      picture gives three different physical actions with three different outputs.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("bench"); const gy = p.horizon + 138;
  /* each bench delivers on its own clock — 3 staggered streams across 112f */
  const STREAM: number[][] = [[8, 40, 72, 100], [18, 50, 82], [28, 62, 94]];
  return (
    <Scene p={p} slug="THE BENCHES · TIGHT" push={push(V, 107, 1.195)} vig={0.80}>
      <SetFor k="bench" f={f} vk={V} />
      {BENCH_X.map((x, i) => <Bench key={"bn" + i} x={x} groundY={gy} z={54} lit />)}

      {/* the three specialists, three DIFFERENT loops */}
      {BENCH_X.map((x, i) => (
        <Spec key={"sp" + i} f={f} x={x} y={gy - 6} size={255} i={i} act={1}
          z={46} costume={[SPEC_COSTUME[3], CROWD_COSTUME[1], CROWD_COSTUME[2]][i]} />
      ))}

      {/* THE OUTPUTS — each bench throws its own kind of work onto the rail */}
      {STREAM.map((ats, i) => ats.map((a, j) => (
        <Output key={"op" + i + "_" + j} f={f} at={a} fromX={BENCH_X[i]} fromY={gy - 130}
          toX={BENCH_X[i] + (i === 2 ? -180 : 180)} toY={272} kind={i as 0 | 1 | 2} z={56} />
      )))}
      {/* the tool the hero swings — a real hammer head, on the WORK beat */}
      {STREAM[0].map((a, j) => f >= a - 8 && f < a + 6 ? (
        <React.Fragment key={"hm" + j}>
          <Ring x={BENCH_X[0]} y={gy - 120} f={f} at={a - 4} max={120} c="#FFF8E6" />
          <Puff x={BENCH_X[0]} y={gy - 116} f={f} at={a - 4} n={5} c="#C4B694" s={0.8} />
        </React.Fragment>
      ) : null)}

      {/* the shared rail overhead — the background process that never stops */}
      <div style={{ position: "absolute", left: -60, right: -60, top: 232, height: 18, zIndex: 52,
        background: "linear-gradient(180deg, #8A7E66 0%, #4A4232 100%)" }} />
      <Band f={f} y={210} h={22} speed={2.8} z={51} c="#E8DCBC" dk="#3A3428" slat={47} o={0.75} />
    </Scene>
  );
};

/* =========================================================================
   S11 — THE TEAM.  f1248-1344 (3.21s).  ITEM 4 PAYOFF.  Intensity 8.
   VO: "So this is how you get an entire dev team in Claude for free."
   ⭐ §10: the missing half again. Three benches showed three jobs; a TEAM is the
      three jobs COMBINING. The outputs converge on one rail and assemble into
      ONE object, and a FREE tag drops onto it and rocks.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("bench"); const gy = p.horizon + 138;
  const CONV = [10, 24, 39];
  const asm = E(f, 56, 68, 0, 1, BACK);
  return (
    <Scene p={p} slug="THE BENCHES · WIDE" push={push(V, 90, 1.175)} vig={0.79}>
      <SetFor k="bench" f={f} vk={V} />
      {BENCH_X.map((x, i) => <Bench key={"bn" + i} x={x} groundY={gy} z={54} lit />)}
      {BENCH_X.map((x, i) => (
        <Spec key={"sp" + i} f={f} x={x} y={gy - 6} size={244} i={i} act={f >= 56 ? 3 : 1}
          z={46} costume={[SPEC_COSTUME[3], CROWD_COSTUME[1], CROWD_COSTUME[2]][i]} />
      ))}

      {/* the shared rail the three pieces converge on */}
      <div style={{ position: "absolute", left: -60, right: -60, top: 238, height: 18, zIndex: 52,
        background: "linear-gradient(180deg, #8A7E66 0%, #4A4232 100%)" }} />
      <Band f={f} y={216} h={22} speed={3.4} z={51} c="#E8DCBC" dk="#3A3428" slat={47} o={0.75} />

      {/* THE CONVERGENCE — three outputs travel to one point */}
      {CONV.map((a, i) => (
        <Output key={"cv" + i} f={f} at={a} fromX={BENCH_X[i]} fromY={gy - 130}
          toX={790} toY={244} kind={i as 0 | 1 | 2} z={56} />
      ))}

      {/* THE ASSEMBLED OBJECT */}
      {asm > 0 && (
        <div style={{ position: "absolute", left: 790 - 82, top: 244 - 82 * asm, width: 164,
          height: 164 * asm, zIndex: 60, borderRadius: 10,
          transform: `rotate(${rockAt(f, 68, 6)}deg)`, transformOrigin: "50% 100%",
          background: `linear-gradient(178deg, ${mxh(CLAY, 0.2)} 0%, ${dkh(CLAY, 0.18)} 100%)`,
          border: `6px solid ${dkh(CLAY, 0.36)}`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <div style={{ width: 74, height: 74, borderRadius: 15, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(GH)} style={{ width: 52, height: 52, objectFit: "contain" }} />
          </div>
        </div>
      )}
      {f >= 68 && <Ring x={790} y={244} f={f} at={63} max={250} c="#FFF8E6" />}

      {/* the FREE tag drops onto it and rocks */}
      {f >= 72 && (
        <div style={{ position: "absolute", left: 700, top: 130 + E(f, 72, 82, 0, 60, IN_Q),
          zIndex: 66, transform: `rotate(${rockAt(f, 82, 9)}deg)`, transformOrigin: "50% 0%",
          padding: "9px 20px", borderRadius: 9, background: GREEN, border: "4px solid #22664A",
          ...ui(30, 900), color: "#EAF6EE" }}>FREE</div>
      )}

      <RepoPlate f={f} x={118} y={116} r={R[3]} s={0.94} z={86} at={37} />
      <SquadCard f={f} x={742} y={132} filled={4} s={0.56} z={88} at={56} />
    </Scene>
  );
};

/* =========================================================================
   S12 — THE GAUGE YARD.  f1344-1526 (6.06s).  ITEM 5.  Intensity 8.5.
   VO: "Five, Karpathy's CLAUDE.md file. One CLAUDE.md file with four principles
        that stop Claude from overcomplicating your code."
   ⭐ FOUR DISCRETE STAMPS, never one smooth shrink (measured 4.27 vs 5.63). Each
      stamp visibly SHEARS a slab off the block, and the slabs fly (the evidence).
   ⛔ THE FOUR PRINCIPLE NAMES RIDE THE HEADER BAND. The picture carries only the
      stamp MARKS and the shrinking SILHOUETTE. No 1000, no 100, no numerals.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("yard"); const gy = p.horizon + 150;
  const STAMP = [37, 69, 101, 133];
  const cut = STAMP.filter((a) => f >= a + 10).length;
  const lastCut = STAMP.filter((a) => f >= a + 10).slice(-1)[0] ?? -99;
  /* ⭐ continuous travel across the full panel, all 182 frames */
  const bx = -200 + E(f, 0, 210, 0, 1, LIN) * 1330;
  return (
    <Scene p={p} slug="THE GAUGE" push={push(V, 167, 1.155)} vig={0.77}>
      <SetFor k="yard" f={f} vk={V} />

      {/* THE GAUGE ITSELF — the frame the block has to fit through */}
      <div style={{ position: "absolute", left: 700, top: 126, width: 26, height: 440, zIndex: 54,
        background: "linear-gradient(90deg, #6E7C88 0%, #39424E 100%)", border: "4px solid #262D36" }} />
      <div style={{ position: "absolute", left: 700, top: 126, width: 240, height: 22, zIndex: 54,
        background: "#4A5460", border: "4px solid #262D36" }} />

      <BloatBlock f={f} x={bx} groundY={gy} cut={cut} hitAt={lastCut + 10} z={46} />

      {/* the four stamps and the four sheared slabs */}
      {STAMP.map((a, i) => (
        <React.Fragment key={"sm" + i}>
          <PressRam f={f} at={a} x={-200 + ((a + 12) / 210) * 1330} groundY={gy}
            hitY={gy - (430 - i * 76)} z={62} />
          {[0, 1, 2].map((q) => (
            <Shard key={"sh" + i + "_" + q} f={f} at={a + 10 + q * 3}
              x={-200 + ((a + 10) / 210) * 1330} y={gy - 110 - q * 70}
              dir={q === 1 ? (i % 2 === 0 ? -1 : 1) : (q === 0 ? -1 : 1)} z={44} />
          ))}
        </React.Fragment>
      ))}
      {/* the four stamp MARKS accumulating on the block — marks, not words */}
      {STAMP.map((a, i) => f >= a + 10 ? (
        <div key={"mk" + i} style={{ position: "absolute", left: bx - 96 + i * 58,
          top: gy - 64, width: 52, height: 52, zIndex: 58, borderRadius: 10,
          background: SKY, border: "4px solid #41637C",
          transform: `rotate(${-8 + i * 5}deg) scale(${E(f, a + 10, a + 18, 0.4, 1, BACK)})` }}>
          <div style={{ position: "absolute", left: 12, top: 22, width: 14, height: 6,
            background: "#EAF2FA", transform: "rotate(45deg)" }} />
          <div style={{ position: "absolute", left: 20, top: 17, width: 24, height: 6,
            background: "#EAF2FA", transform: "rotate(-52deg)" }} />
        </div>
      ) : null)}

      {/* the engineer who sets them — WORK loop, cropped by the left edge */}
      <Spec f={f} x={190} y={gy + 30} size={269} i={1} act={1} z={50} costume={SPEC_COSTUME[4]} />
      {/* the background process: a crane trolley crossing the gantry, always */}
      <div style={{ position: "absolute", left: ((f * 3.2) % 900) + 100, top: 96, width: 92,
        height: 40, zIndex: 55, borderRadius: 4, background: "#4A5460", border: "4px solid #262D36" }} />

      <ItemNum f={f} x={846} y={132} n={5} s={1} z={84} at={2} c="#DCEBFA" />
    </Scene>
  );
};

/* =========================================================================
   S13 — SENIOR.  f1526-1609 (2.76s).  ITEM 5 PAYOFF.  Intensity 7.
   VO: "It turns Claude into a senior software engineer instantly."
   ⭐ "Instantly" only reads as a SINGLE-FRAME change. The costume snaps on with
      a squash and a ring — never a fade.
   ⛔ Same yard, key swung cool blue -> warm low sun: hue AND lightness.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("yardSun"); const gy = p.horizon + 150;
  const SNAP = 24;
  return (
    <Scene p={p} slug="THE GAUGE · SUN" push={push(V, 77, 1.215)} vig={0.73}>
      <SetFor k="yardSun" f={f} vk={V} />

      {/* ⛔ SENIOR 8.18 — the yard behind him was still. The gantry trolley that
          did the cutting is still running its beat, which is also why the yard
          reads as a working place rather than a backdrop. */}
      <div style={{ position: "absolute", left: ((f * 6.4) % 1240) - 120, top: 118, width: 150,
        height: 58, zIndex: 55, borderRadius: 5,
        background: "linear-gradient(180deg, #A88A5E 0%, #5A4632 100%)", border: "5px solid #34281C" }} />
      <div style={{ position: "absolute", left: ((f * 6.4) % 1240) - 60, top: 176, width: 8,
        height: 96, zIndex: 55, background: "#34281C" }} />

      {/* the discarded slabs, stacked tidily — the evidence of what was removed */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: 44, top: gy - 54 - i * 40,
          width: 210 - i * 16, height: 36, zIndex: 34, borderRadius: 4,
          background: "linear-gradient(178deg, #6E6A62 0%, #3A3730 100%)", border: "4px solid #2A2822",
          transform: `rotate(${(i % 2 ? 1 : -1) * 1.4}deg)` }} />
      ))}

      {/* the small clean block, and it RINGS when he taps it */}
      <BloatBlock f={f} x={790} groundY={gy - 40} cut={4} hitAt={SNAP + 22} z={46} />
      {f >= SNAP + 22 && <Ring x={790} y={gy - 100} f={f} at={SNAP + 22} max={200} c="#FFD79A" />}

      {/* THE SNAP — costume changes on a beat, with a squash and a ring */}
      <Spec f={f} x={368} y={gy + 26} size={430} i={1} act={f >= SNAP ? 3 : 1} z={52}
        costume={f >= SNAP ? { beard: 1, glasses: 1, suit: 1 } : { beard: 1 }}
        cheer={f >= SNAP ? E(f, SNAP, SNAP + 14, 0, 0.85, OUT) : 0} />
      {f >= SNAP && <Ring x={368} y={gy} f={f} at={SNAP} max={340} c="#FFE6BC" />}
      {f >= SNAP && <Puff x={368} y={gy} f={f} at={SNAP} n={10} s={1.3} c="#C8A87A" />}

      <RepoPlate f={f} x={118} y={116} r={R[4]} s={0.92} z={86} at={32} />
      <SquadCard f={f} x={742} y={132} filled={5} s={0.56} z={88} at={45} />
    </Scene>
  );
};

/* =========================================================================
   S14 — THE CONTROL ROOM.  f1609-1783 (5.81s).  ITEM 6.  Intensity 8.
   VO: "Six, Playwright MCP. It allows Claude to navigate content pages, fill out
        forms, click buttons, and scrape dynamic content."
   ⭐ FOUR VERBS -> FOUR DISCRETE PHYSICAL ACTIONS, spread across the FULL
      duration, each a large fast travel with a hard land:
        NAVIGATE  the arm swings the page wall sideways, a new page slams in
        FILL      the arm drags down a form and the fields populate in a run
        CLICK     the arm punches SUBMIT; the page recoils and flashes
        SCRAPE    the arm rakes down and a ribbon fills the bin (the OUTPUT)
   ⭐ The page wall is dense high-detail content that changes — the biggest
      single motion lever measured on this repo (median 6.36 -> 8.00).
   ====================================================================== */
export const S14: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("control"); const gy = p.horizon + 140;
  /* ⭐⭐ REBUILT. Alex: *"even number 6, it's just too boring, it's just like a big
     rectangle and too many lines."* Exactly right — a browser drawn as a big pane
     of horizontal rules is a diagram, and the arm moving over it is furniture.
     THE CONCEPT NOW: A PAGE IS A DOOR. A corridor of them, each with panels, a
     rail, hinges, a handle and a number plate. He RUNS the corridor and takes one
     door per verb: kicks it open, fills what is inside, punches the button, and
     hauls the contents out. Four verbs, four doors, one character doing all of it. */
  const NAV = 10, FILL = 44, CLICK = 84, SCRAPE = 116;
  const OPEN = [NAV, FILL, CLICK, SCRAPE];
  const DX = [150, 350, 550, 750];
  /* he runs to whichever door is current and works it */
  const cur = OPEN.filter((t) => f >= t - 12).length - 1;
  const tx = cur < 0 ? 60 : DX[cur] + 84;
  const px = cur < 0 ? 60 : (cur === 0 ? E(f, 0, NAV, 60, tx, IO)
    : E(f, OPEN[cur] - 12, OPEN[cur], DX[cur - 1] + 84, tx, IO));
  const kick = OPEN.some((t) => f >= t - 3 && f < t + 8);
  return (
    <Scene p={p} slug="THE CORRIDOR" push={push(V, 162, 1.185)} vig={0.62}>
      <SetFor k="control" f={f} vk={V} />

      {/* ⭐ the row STREAMS PAST him — he holds the centre and the corridor moves,
          so the frame is changing continuously and not only on the four beats. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 34,
        transform: `translateX(${-(px - 300)}px)` }}>
        <DoorRow f={f} y={150} open={OPEN} z={34} n={6} x0={150} gap={210} />
      </div>

      {/* what comes OUT of each door, one per verb — inside the same shift */}
      <div style={{ position: "absolute", inset: 0, zIndex: 36, transform: `translateX(${-(px - 300)}px)` }}>
      {/* 1 NAVIGATE — the doorway lights and the corridor beyond is revealed */}
      {f >= NAV && <Ring x={DX[0] + 84} y={340} f={f} at={NAV} max={300} c={CYAN} />}
      {/* 2 FILL — bars populate inside the open doorway */}
      {f >= FILL && Array.from({ length: 5 }, (_, i) => {
        const k = E(f, FILL + 6 + i * 4, FILL + 16 + i * 4, 0, 1, OUT);
        if (k <= 0) return null;
        return (
          <div key={"fb" + i} style={{ position: "absolute", left: DX[1] + 24, top: 240 + i * 34,
            width: 120 * k, height: 20, borderRadius: 4, zIndex: 36, background: GREEN,
            border: `3px solid ${dkh(GREEN, 0.3)}` }} />
        );
      })}
      {/* 3 CLICK — a real button he punches, and it slams in */}
      {f >= CLICK - 20 && (
        <div style={{ position: "absolute", left: DX[2] + 34, top: 300,
          width: 100, height: 62, zIndex: 36, borderRadius: 8,
          background: f >= CLICK ? "#FFFFFF" : CYAN, border: "6px solid #143030",
          transform: `translateY(${f >= CLICK && f < CLICK + 8 ? 8 : 0}px)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          ...ui(20, 900), color: "#0C1E1E" }}>GO</div>
      )}
      {f >= CLICK && <Ring x={DX[2] + 84} y={330} f={f} at={CLICK} max={260} c="#DFF6F6" />}
      {/* 4 SCRAPE — he hauls a loaded sack out of the last door */}
      {f >= SCRAPE && (() => {
        const k = E(f, SCRAPE + 6, SCRAPE + 30, 0, 1, IO);
        return (<>
          <div style={{ position: "absolute", left: DX[3] + 54 - k * 150, top: 300 + k * 150,
            width: 128, height: 148, zIndex: 60, borderRadius: "44% 44% 18% 18%",
            background: "linear-gradient(180deg, #4A5A32 0%, #2A3A1C 100%)",
            border: "6px solid #1C2612", transform: `rotate(${-14 + k * 22}deg)` }}>
            <div style={{ position: "absolute", left: 26, top: -12, width: 76, height: 22,
              borderRadius: 6, background: "#8A7A4E", border: "5px solid #1C2612" }} />
            {[0.34, 0.54, 0.74].map((t, q) => (
              <div key={"sb" + q} style={{ position: "absolute", left: 18, right: 18,
                top: 148 * t, height: 9, background: hexa(GREEN, 0.7), borderRadius: 3 }} />
            ))}
          </div>
          <Ring x={DX[3] + 84} y={330} f={f} at={SCRAPE + 6} max={280} c={GREEN} />
        </>);
      })()}

      </div>

      {/* ⭐ THE OPERATOR — he runs the corridor and does all four himself */}
      <Spec f={f} x={300} y={gy + 18} size={288} i={1} act={kick ? 2 : 0} z={64}
        costume={SPEC_COSTUME[5]} cheer={kick ? 0.9 : 0} />
      {OPEN.map((t, i) => f >= t && f < t + 16 ? (
        <Puff key={"kp" + i} x={300} y={gy + 40} f={f} at={t} n={7} s={1.1} c="#7FB0B4" />
      ) : null)}

      <ItemNum f={f} x={118} y={104} n={6} s={1} z={84} at={2} c={CYAN} />
      <RepoPlate f={f} x={118} y={116} r={R[5]} s={0.92} z={86} at={138} />
    </Scene>
  );
};

/* =========================================================================
   S15 — THE CHECKPOINT.  f1783-1938 (5.18s).  ITEM 7.  Intensity 9.
   VO: "Seven, TDD Guard. This blocks Claude from skipping tests. If Claude tries
        to commit without running tests first,"
   ⭐ THE PAYOFF OF THE S2 OPEN LOOP — 52 seconds later. This is what was in the
      seventh crate.
   ⭐ "Blocks" is drawn as an actual PHYSICAL REFUSAL WITH A COST: the cart hits
      the barrier, recoils hard, and the load lurches forward and settles.
   ⛔ NO CAMERA SHAKE. The impact is sold by what happens to the OBJECT.
   ====================================================================== */
export const S15: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("gate"); const gy = p.horizon + 130;
  const SLAM = 69, HIT = 92;
  /* the cart drives up the road, then recoils on the hit */
  const cx = f < HIT ? E(f, 8, HIT, -200, 470, LIN)
    : 470 - Math.sin(Math.min(1, (f - HIT) / 26) * Math.PI) * 96;
  const angle = f < SLAM ? -78 : E(f, SLAM, SLAM + 10, -78, 0, IN_Q);
  return (
    <Scene p={p} slug="THE CHECKPOINT" push={push(V, 147, 1.165)} vig={0.80}
      overlay={f >= HIT && f < HIT + 14 ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 99, pointerEvents: "none",
          background: hexa("#C44A3A", 0.26 * (1 - (f - HIT) / 14)) }} />
      ) : null}>
      <SetFor k="gate" f={f} vk={V} />

      {/* the loaded COMMIT cart and the Claude pushing it */}
      <CommitCart f={f} x={cx} groundY={gy} hitAt={HIT} z={52} />
      <Spec f={f} x={cx - 168} y={gy + 6} size={234} i={0} act={f < HIT ? 0 : 3} z={50}
        costume={CROWD_COSTUME[3]} shock={f >= HIT && f < HIT + 30 ? 0.45 : 0} />

      {/* THE GUARD — colossal, ~1.6x the others, and he steps OUT to do it */}
      <Spec f={f} x={742 - E(f, SLAM - 22, SLAM, 0, 74, IO)} y={gy + 10} size={268}
        i={2} act={1} z={58} costume={SPEC_COSTUME[6]} stern={0.8} />

      <Barrier f={f} x={636} groundY={gy} angle={angle} z={60} c={RED} />
      {f >= SLAM + 10 && <Ring x={636} y={gy - 178} f={f} at={SLAM + 10} max={230} c="#FF9A8A" />}
      {f >= HIT && <><Ring x={cx + 120} y={gy - 20} f={f} at={HIT} max={260} c="#FF9A8A" />
        <Puff x={cx + 120} y={gy} f={f} at={HIT} n={10} c="#8A6A62" s={1.2} /></>}

      {/* the background process: the red lamp sweeping the tarmac, always */}
      <div style={{ position: "absolute", left: 0, right: 0, top: gy - 30, height: 120, zIndex: 26,
        background: `linear-gradient(90deg, transparent 0%, ${hexa("#FF6A4A", 0.24)} ${40 + Math.sin(f / 9) * 34}%, transparent 100%)` }} />

      <ItemNum f={f} x={118} y={130} n={7} s={1} z={84} at={2} c="#FF9A8A" />
    </Scene>
  );
};

/* =========================================================================
   S16 — GREEN.  f1938-2049 (3.69s).  ⭐⭐ THE INTENSITY PEAK (9.5 > hook 9.0).
   VO: "TDD Guard stops it and acts like a quality enforcement so you ship
        without bugs."
   ⭐ §10 again: the gate OPENING is the only proof that the blocker is a HELPER
      and not an obstacle. Eight test lamps fire green in a fast run, the barrier
      rises, the cart rolls through into open light — and all six other
      specialists are standing along the road watching it pass.
   ⭐ The largest luma AND hue swing in the reel: red -> green -> open white.
   ====================================================================== */
export const S16: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("gateGreen"); const gy = p.horizon + 130;
  const LAMP = 8, RISE = 56, ROLL = 66;
  const angle = f < RISE ? 0 : E(f, RISE, RISE + 12, 0, -78, OUT);
  const cx = f < ROLL ? 374 : 374 + E(f, ROLL, 111, 0, 560, IO);
  return (
    <Scene p={p} slug="THE CHECKPOINT · CLEAR" push={push(V, 102, 1.195)} vig={0.73}>
      <SetFor k="gateGreen" f={f} vk={V} />

      {/* THE RUN — eight lamps firing green, fast, left to right */}
      <TestLamps f={f} x={186} y={gy - 214} n={8} at={LAMP} step={5} z={66} />
      <div style={{ position: "absolute", left: 150, top: gy - 240, width: 500, height: 52,
        zIndex: 64, borderRadius: 8, background: hexa("#0C1A12", 0.7), border: "4px solid #2E5A40" }} />

      <CommitCart f={f} x={cx} groundY={gy} z={52} />
      <Spec f={f} x={cx - 168} y={gy + 6} size={234} i={2} act={2} z={50}
        costume={CROWD_COSTUME[3]} />

      {/* the guard steps back and lets it through */}
      <Spec f={f} x={742 + E(f, RISE, RISE + 20, 0, 60, IO)} y={gy + 10} size={268}
        i={1} act={f >= RISE ? 3 : 1} z={58} costume={SPEC_COSTUME[6]} stern={f >= RISE ? 0 : 0.8} />
      <Barrier f={f} x={636} groundY={gy} angle={angle} z={60} c={GREEN} />
      {f >= RISE && <Ring x={636} y={gy - 178} f={f} at={RISE} max={250} c="#8FE0B0" />}

      {/* ⭐ THE OTHER SIX, LINING THE ROAD, WATCHING IT PASS */}
      {[70, 178, 286, 850, 934, 1000].map((x, i) => (
        <Spec key={"ln" + i} f={f + i * 7} x={x} y={gy + 70} size={198} i={i} act={i % 2 === 0 ? 2 : 3}
          z={44} costume={SPEC_COSTUME[i]} />
      ))}

      {/* ⛔ GREEN 8.22 — after the barrier lifted the frame waited for the cart.
          The queue behind it moves up, which is what actually happens when a
          gate opens and is the reason the beat lands as relief. */}
      {[0, 1, 2].map((j) => {
        const a = 62 + j * 9;
        const k = E(f, a, a + 34, 0, 1, IO);
        if (k <= 0) return null;
        return (
          <div key={"q" + j} style={{ position: "absolute", left: 60 + j * 190 + k * 300,
            top: gy - 118, width: 150, height: 112, zIndex: 46, borderRadius: 6,
            background: `linear-gradient(178deg, ${mxh(CLAY, 0.16)} 0%, ${dkh(CLAY, 0.22)} 100%)`,
            border: `5px solid ${dkh(CLAY, 0.38)}` }}>
            <div style={{ position: "absolute", left: 14, top: 20, width: 74, height: 9,
              background: dkh(CLAY, 0.36) }} />
            <div style={{ position: "absolute", left: 14, top: 46, width: 104, height: 9,
              background: dkh(CLAY, 0.36) }} />
          </div>
        );
      })}

      {/* the open light beyond the gate */}
      <div style={{ position: "absolute", left: 700, top: 0, right: 0, bottom: 0, zIndex: 28,
        background: `linear-gradient(90deg, transparent 0%, ${hexa("#DFF6E8", 0.30 * E(f, RISE, RISE + 20, 0, 1, OUT))} 100%)` }} />

      <RepoPlate f={f} x={118} y={116} r={R[6]} s={0.94} z={86} at={28} />
      <SquadCard f={f} x={742} y={132} filled={7} s={0.66} z={88} at={67} />
    </Scene>
  );
};

/* =========================================================================
   S17 — THE ROSTER.  f2049-2147 (3.25s).  CTA.  Intensity 8.5.
   VO: "And the best part is that I made a free setup guide with all of these
        plugins."
   ⭐ THE VILLAIN'S ONLY DEFEAT, and it is not removal: THE SPRAWL is finally
      BEHIND the cast instead of cropping the action. It never shrank.
   ⛔ Reel 93: *"a GRID has no moment."* So the seven WALK INTO the line and the
      card RISES in front of them — it never simply appears.
   ⭐ The reel's second and last motivated camera move.
   ====================================================================== */
export const S17: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("deck"); const gy = p.horizon + 128;
  const seats = layout(7, 506, 856, 138);
  return (
    <Scene p={p} slug="THE SQUAD" push={push(V, 87, 1.195)} vig={0.61}>
      <SetFor k="deck" f={f} vk={V} />

      {/* the seven WALK IN, each from its own side, each on its own clock */}
      {seats.map((s, i) => {
        const a = 4 + i * 5;
        const k = E(f, a, a + 24, 0, 1, IO);
        const fromX = i % 2 === 0 ? -180 - i * 60 : 1260 + i * 60;
        return (
          <Spec key={"sq" + i} f={f} x={fromX + (s.x - fromX) * k} y={gy + 10} size={s.s}
            i={i} act={k >= 1 ? (i % 4) : 0} z={50 + i} costume={SPEC_COSTUME[i]} />
        );
      })}
      {/* the footfalls landing into one */}
      {seats.map((s, i) => f >= 4 + i * 5 + 24 ? (
        <Ring key={"ft" + i} x={s.x} y={gy + 10} f={f} at={4 + i * 5 + 24} max={120} c="#FFF0D2" />
      ) : null)}

      {/* THE CARD RISES in front of them, full size, 7/7, with the total */}
      <SquadCard f={f} x={742} y={132} filled={7} s={1.32} z={88} total at={50} />

      <MarkCast x={118} y={126} s={96} z={40} o={0.34} spin={0.6} f={f} />
    </Scene>
  );
};

/* =========================================================================
   S18 — THE RACE.  f2147-2302 (5.19s).  CTA.  Intensity 7.5.
   VO: "You can just paste into Claude to get all of them instantly rather than
        spending hours manually searching for each of these."

   ⛔⛔⛔ THIS IS THE `X11_BANNED` SCENE. The VO's "11 times more productive" has
      NO source. So the picture draws WORK DONE as a race the viewer watches
      resolve — and never a multiplier, a percentage or a meter.
        LEFT   one paste, seven marks land in one fast run
        RIGHT  one crate hauled at a time, and only TWO arrive in the same window
   ====================================================================== */
export const S18: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("deck"); const gy = p.horizon + 128;
  /* ⛔⛔ REBUILT. Alex: *"the animation at 1:08 is way too boring, it just becomes
     stale and nothing happens, it just turns green then nothing much."* Dead right
     — the click was the whole event, and a colour change is a STATE, not an
     arrival. §2: an event needs a before, a trigger, TRAVEL and an arrival that
     costs something. The click was the trigger and there was no travel and no
     arrival at all.
     THE PAYOFF NOW: the moment RUN goes green, the seven volumes are FIRED OUT of
     the terminal one after another, land in a row, and each one opens into its
     specialist — the line is "one paste installs them", so the install has to be
     something you watch happen. */
  const CLICK = 24;
  const OUT_AT = [34, 41, 48, 55, 62, 69, 76];
  const SEAT_X = [110, 244, 378, 512, 646, 780, 914];
  /* the slow side: he hauls one volume at a time and gets nowhere */
  const trip = (f % 70) / 70;
  const tx = 878 + Math.sin(trip * Math.PI * 2) * 96;
  return (
    <Scene p={p} slug="ONE PASTE" push={push(V, 151, 1.175)} vig={0.48}>
      <SetFor k="deck" f={f} vk={V} />

      {/* THE TERMINAL — the thing he clicks, and the thing they come out of */}
      <div style={{ position: "absolute", left: 150, top: 132, width: 470, height: 330, zIndex: 44,
        borderRadius: 10, background: "#12100C", border: "8px solid #4A4232" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 38,
          background: "#2E2A22", borderRadius: "4px 4px 0 0" }}>
          {[16, 42, 68].map((dx, i) => (
            <div key={"tl" + i} style={{ position: "absolute", left: dx, top: 13, width: 13,
              height: 13, borderRadius: "50%",
              background: ["#C4685A", "#D2A64C", "#5CA37A"][i] }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 38, bottom: 0, overflow: "hidden" }}>
          {Array.from({ length: 20 }, (_, i) => {
            const yy = ((i * 22 - (f >= CLICK ? (f - CLICK) * 6.4 : 0)) % 440 + 440) % 440;
            const on = f >= CLICK;
            return (
              <div key={"tl2" + i} style={{ position: "absolute", left: 18, top: 8 + yy,
                width: 60 + ((i * 53) % 5) * 66, height: 14, borderRadius: 3,
                background: on ? hexa(GREEN, 0.5 + ((i * 7) % 4) * 0.14) : hexa(CLAY, 0.42) }} />
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 168, top: 150, width: 132, height: 62,
          borderRadius: 10, zIndex: 8, background: f >= CLICK ? "#8FE0B0" : "#C4653F",
          border: `6px solid ${f >= CLICK ? "#2E6E4A" : "#7A3A22"}`,
          transform: `translateY(${f >= CLICK && f < CLICK + 9 ? 6 : 0}px)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          ...ui(26, 900), color: "#1A1813" }}>RUN</div>
      </div>
      <Cursor f={f} fromX={660} fromY={720} x={384} y={322} at={CLICK} travel={22} z={96} s={1.3} />

      {/* ⭐⭐ THE PAYOFF — seven volumes FIRED out of the terminal, landing in a row */}
      {OUT_AT.map((t, i) => {
        const k = E(f, t, t + 14, 0, 1, IN_Q);
        if (k <= 0) return null;
        const sx = 384, sy = 322;
        const ex = SEAT_X[i], ey = gy - 30;
        return (
          <React.Fragment key={"ov" + i}>
            <Volume x={sx + (ex - sx) * k} y={sy + (ey - sy) * k - Math.sin(k * Math.PI) * 170}
              w={92} z={60} lit hue={i} rot={(1 - k) * 340} open={k < 1 ? 0.45 : 0}
              sq={squashAt(f, t + 14, 0.26)} />
            {f >= t + 14 && <Ring x={ex} y={ey} f={f} at={t + 14} max={150} c="#FFE6B4" />}
          </React.Fragment>
        );
      })}
      {/* and each one OPENS INTO ITS SPECIALIST — the install, made visible */}
      {OUT_AT.map((t, i) => {
        const k = E(f, t + 18, t + 28, 0, 1, BACK);
        if (k <= 0) return null;
        return (
          <Spec key={"os" + i} f={f} x={SEAT_X[i]} y={gy - 24} size={126 * k} i={i}
            act={i % 4} z={64} costume={SPEC_COSTUME[i]} />
        );
      })}

      {/* the slow side, still hauling one at a time and still nowhere */}
      <div style={{ position: "absolute", left: 700, top: 0, right: 0, bottom: 0, zIndex: 24,
        background: hexa("#2A2620", 0.34) }} />
      <Spec f={f} x={tx} y={gy + 24} size={168} i={0} act={0} z={50} costume={CROWD_COSTUME[4]} />
      <Volume x={tx} y={gy - 130} w={80} z={52} hue={3} rot={-8} />
      <CratePile f={f} x={986} groundY={gy + 4} grow={0.30} z={30} seed={41} />
    </Scene>
  );
};

/* =========================================================================
   S19 — COMMENT SQUAD.  f2302-2449 (4.90s).  CTA CLOSE.  Intensity 8.
   VO: "For the free setup to make you 11 times more productive, comment squad
        and I'll send it over immediately."
   ⛔⛔ NO `11`, NO `x`, NO `%` ANYWHERE IN THIS SCENE. The VO says it; the
      picture does not corroborate it.
   ⭐ The keyword lands as a HARD CUT on the word "squad" (root 79.56s = f2387,
      i.e. local f85), so the cut reads as intent rather than as a glitch.
   ====================================================================== */
export const S19: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = placeFor("deck"); const gy = p.horizon + 128;
  /* ⛔⛔ REBUILT. Alex: *"at 1:12 it needs to be more interesting to actually retain
     attention."* The old close was the cast standing in an arc while a card sat
     there — a poster with a keyword stamped on it, at the exact moment the reel is
     asking for the comment.
     THE CONCEPT NOW: THE SQUAD MARCHES THE CARD FORWARD. The seven advance toward
     camera in formation, each carrying his own volume, and on the keyword they
     SLAM them down together into one stack and throw their arms up — the card
     lands on top of it. Something happens on the line rather than around it. */
  const KEY = 77;                       /* MEASURED: "squad" is word 292 */
  const MARCH = [4, 10, 16, 22, 28, 34, 40];
  const SEAT_X = [92, 230, 368, 506, 644, 782, 920];
  return (
    <Scene p={p} slug="COMMENT SQUAD" push={push(V, 135, 1.145)} vig={0.44}>
      <SetFor k="deck" f={f} vk={V} />

      {/* ⭐ THE MARCH — they come TOWARD camera, growing as they advance, each
          carrying his own repo. Seven large objects moving is the top of the
          measured table, and it is the cast doing it. */}
      {MARCH.map((a, i) => {
        const k = E(f, a, a + 34, 0, 1, IO);
        const sz = 118 + k * 96;
        const yy = gy - 150 + k * 150;
        const slam = f >= KEY;
        return (
          <React.Fragment key={"mv" + i}>
            {/* the volume he is carrying — slammed down on the keyword */}
            <Volume x={SEAT_X[i]} y={slam ? gy - 16 - (6 - Math.abs(i - 3)) * 26 : yy - sz * 0.62}
              w={72 + k * 34} z={slam ? 60 + i : 52 + i} lit hue={i}
              rot={slam ? (i % 2 ? 3 : -3) : Math.sin((f + i * 14) / 12) * 7}
              sq={slam ? squashAt(f, KEY, 0.30) : 1} />
            <Spec f={f} x={SEAT_X[i]} y={yy} size={sz} i={i}
              act={slam ? 2 : 0} z={54 + i} costume={SPEC_COSTUME[i]}
              cheer={slam ? E(f, KEY, KEY + 12, 0, 1, OUT) : 0} />
          </React.Fragment>
        );
      })}
      {/* the slam: dust, rings and a jolt through the whole line */}
      {f >= KEY && SEAT_X.map((x, i) => (
        <React.Fragment key={"sl" + i}>
          <Puff x={x} y={gy - 10} f={f} at={KEY + i} n={7} s={1.1} c="#C8A87A" />
          <Ring x={x} y={gy - 10} f={f} at={KEY + i} max={170} c="#FFE6B4" />
        </React.Fragment>
      ))}

      {/* the card lands ON TOP of the stack they just built */}
      <div style={{ position: "absolute", inset: 0, zIndex: 88,
        transform: `translateY(${f >= KEY ? E(f, KEY, KEY + 12, -240, 0, BACK) : -240}px)` }}>
        <SquadCard f={f} x={506} y={150} filled={7} s={1.28} z={88} total at={KEY} />
      </div>

      {/* THE KEYWORD, struck on the measured word */}
      {f >= KEY && (
        <div style={{ position: "absolute", left: 506 - 310, top: 452, width: 620, height: 138,
          zIndex: 92, borderRadius: 18, background: CLAY, border: "7px solid #A0512F",
          transform: `scale(${E(f, KEY, KEY + 8, 0.72, 1, BACK)}) rotate(${rockAt(f, KEY + 8, 2.6)}deg)`,
          transformOrigin: "50% 50%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(30, 900), color: "#FCEFE6", letterSpacing: "0.10em" }}>COMMENT</span>
          <span style={{ ...ui(80, 900), color: "#FFFFFF", letterSpacing: "0.04em", lineHeight: 1 }}>
            {KEYWORD}
          </span>
        </div>
      )}
      {f >= KEY && <Ring x={506} y={520} f={f} at={KEY} max={420} c="#FFD9C4" />}
    </Scene>
  );
};
