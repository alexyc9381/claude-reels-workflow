import React from "react";
import { useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK, PAPER, TEAL, SKILL_C, WIRED, KEYWORD,
  R1, R2, R3, R4, R5, R6, R7,
  Scene, Cam, CamCtx, asPlace, Ring, Puff, Rake, Pool, Tag, LogoTile, Contact,
  CampaignBoard, Retainer, rock, shake, squash, idle,
} from "./MktWorld";
import { SetFor } from "./MktSets";
import {
  Actor, Worker, Crowd, costumeFor, NightDesk, InvoiceStack, SkillCrate,
  CreatorWall, PatternCard, RankLadder, ReadHead, SwatchFan, BrandArtifact,
  PlugRack, Cartridge, Cable, Pillar, CommandBurst, CouncilLamp, StrategyCard,
  SourceWall, LeadBelt, ContactCard, VerifyHead, Hopper, LaunchGantry,
  ChannelBeam, KeywordPlate,
  CrateQueue, CablePulse, ArgumentFlight, LadderChurn, BeamStream,
  PageTraffic, RepoCard, SiteCard, Walker, Handoff, Operator, Climber,
  ToolWall, CrateBarrage, TOOLS, OutlierRig, RigPost, RewritePress, EngineTile, MarkChip, RankShaft, LeadCard, ClawRig, PitPost, RollerPress, SearchListing, Magnifier, BayMarch, Typist, TypedScreen, BrandObject, PaintRoller, Proposal, ReadingHead, CiteSeal, ContentPage, Ingest, ScreenAlarm,
} from "./MktProps";

/* ===========================================================================
   REEL 108 "MARKETING" · THE SCENES.  Board: storyboards/108-marketing.md.

   ⛔⛔ EVERY SCENE NEEDS ONE THING TO HAPPEN — a before state, a trigger, TRAVEL,
      and an arrival that COSTS something. A cut is not an event: four framings
      in which nothing happens is four posters in a row. Reel 104's open became
      ONE locked framing with a real event and motion went 9.97 -> 12.10 WITH
      FEWER CUTS.

   ⛔⛔ ARRIVALS ARE SPREAD ACROSS THE **FULL** DURATION. A rebuild that put every
      object inside the first 34 of 70 frames measured 5.94 (under bar) despite
      being better in every other way; staggering them across the whole scene took
      it to 7.28. An arrival inside the first third leaves the rest dead.

   ⛔ `Scene` push is SCENE-LOCAL and crops progressively: keep content at
      `left >= 506 - 486/push`. At 1.07 that is left >= 52.
   ⛔ ONE text chip per shot, in a band nothing else enters. A chip LABELS.
   ⛔ Anything passed as `children` sits UNDER the vignette (z97). Frame-wide
      effects that must not be dimmed go in the `overlay` slot.
   ========================================================================= */

const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });
const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w });

export type Variant = "night" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit — measured on
    reels 83/84: 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  night: { dx: 0, dy: 0, s: 1, rot: 0 },
  amber: { dx: -14, dy: 8, s: 1.018, rot: 0 },
  steel: { dx: 12, dy: -6, s: 1.028, rot: 0 },
};

/** a different push per cut, so no two cuts share a camera move on the same beat */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.012 : v === "steel" ? 0.024 : 0)];

/* =========================================================================
   S0 — THE NIGHT DESK.  f0-169 (5.63s).  BEAT: HOOK.  Intensity 8.
   VO: "10 out of 10 marketing skills for Claude that everyone needs but they
        get increasingly more powerful. And this is absolutely insane."

   ⭐ ONE LOCKED FRAMING, ONE REAL EVENT — the corrected THE-OPEN rule.
      before  f0-24    hero alone, seven bays DARK, board readable, lamp lit
      trigger f24      the terminal flashes, a crate is launched in from right
      travel  f24-60   it arcs the full panel width, the only thing moving
      arrival f60      SLAM into bay 1: squash, recoil, puff, ring, ignition
      f60-169          the six dark bays throw the promise; hero crosses to it
   ⛔ FRAME 0 MUST BE SETTLED AND BRIGHT (luma >= 140) — carried by the lit lamp
      pool, the city window and the board's own rig, NOT by lifting the palette.
   ====================================================================== */
/* ⛔ ACCELERATING, so the barrage ESCALATES — gaps 16,14,12,10,8,6,4 frames.
   This is the VO's own line made literal: "they get increasingly more powerful". */
/* ⛔ v1 held a STATIC frame for the first 18 frames — 0.6s of nothing at the
   only moment a scroll is decided — and started the barrage with a 0.40-scale
   crate, so the first two impacts were small. Alex: *"even the animations at 0-3
   seconds need to be way better."*
   ⭐ First impact now lands at f8 (0.27s), the crates start at 0.60 scale, and
   the gaps still accelerate: 16,14,12,10,8,6,6. */
const HIT = [8, 24, 38, 50, 60, 68, 74, 80];
const CLIMAX = 94;

export const S0: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const TX = 68, TP = 110, TW = 96, TY = 296;
  const targets = HIT.map((_, i) => TX + i * TP);
  /* ⛔⛔ NO CAMERA SHAKE. Alex: *"I don't like how the screen keeps shaking, it
     makes me dizzy."* This hook was translating the whole panel on all EIGHT
     impacts plus the climax — a shake every 0.35 seconds for three seconds
     straight, on a 1080x1920 phone screen held at arm's length.
     ⭐ THE RULE: an impact is sold by what happens to the OBJECT — squash, recoil,
     a ring, a puff, the neighbouring tiles jolting. Moving the CAMERA is a
     different and much more expensive effect: it moves everything the viewer is
     using to hold their place in the frame, and it does not survive repetition.
     Shake at most once in a reel, on the single biggest moment, or not at all.
     All five shake sites in this reel are gone. */
  const flash = E(f, CLIMAX, CLIMAX + 5, 0, 1, OUT) * (1 - E(f, CLIMAX + 5, CLIMAX + 24, 0, 1, OUT));
  return (
    <Scene p={asPlace("desk")} slug=""
      push={push(v, 169, 1.09)} vig={0.22}
      overlay={flash > 0.01 ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 98, pointerEvents: "none",
          background: `radial-gradient(58% 44% at 50% 46%, ${hexa("#FFF3D8", 0.30 * flash)} 0%, ${hexa("#FFF3D8", 0)} 100%)` }} />
      ) : undefined}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="desk" f={f} />

        {/* ⭐ REAL LOGO GRAPHICS, DOING SOMETHING. Eight real marketing tools power
            on one at a time under the barrage, and each lit one starts passing
            work to its neighbour — so by the climax the wall is a running system
            rather than a row of badges. */}
        <ToolWall f={f} x={TX} y={TY} litAt={HIT} s={1} z={42} tile={TW} pitch={TP} />

        {/* THE HERO ARTIFACT — revealed lit at the climax, not before */}
        <CampaignBoard x={96} y={432} f={f} lit={f >= CLIMAX ? 1 : 0} s={0.92} z={40}
          bayF={[CLIMAX, 0, 0, 0, 0, 0, 0]} />

        {/* ⭐ THE ALARM. It comes up as the barrage starts, pulses on its own
            fast clock, and cuts out the moment bay 1 lights — the problem is
            solved, so the alert stops. Peaks around 2.0s. */}
        <NightDesk x={330} y={600} f={f} s={0.94} z={44}
          screen={HIT.some((h) => f >= h - 4 && f < h + 3) ? "#6E93C2" : "#3A5680"}
          alarm={f >= CLIMAX ? 0
            : E(f, 10, 26, 0, 1, OUT) * (0.55 + 0.45 * Math.max(0, Math.sin(f / 3.4)))} />
        {/* the machine half of the typing: the screen fills at the same rate */}
        {f < CLIMAX + 12 && (
          <TypedScreen f={f} x={412} y={478} w={198} h={132} s={0.94} z={46} />
        )}
        {/* ⛔ ABOVE TypedScreen (z=46), as a SIBLING. Nested inside NightDesk it
            was painted over and never appeared. */}
        <ScreenAlarm f={f} x={412} y={478} w={198} h={132} s={0.94} z={48}
          alarm={f >= CLIMAX ? 0
            : E(f, 10, 24, 0, 1, OUT) * (0.62 + 0.38 * Math.max(0, Math.sin(f / 3.4)))} />

        {/* ⭐ HE IS WORKING, THEN DUCKING, THEN CHEERING — reacting to the action
            rather than traversing past it. A walk is not a story. */}
        {/* ⭐ 0.0-3.7s: working the desk, flinching at each impact.
            ⭐ 3.7s on: Alex — *"at like 4/5 seconds the Claude sprite should
            actually do more, not just stay around the computer."* He was an
            Operator cheering in place for the last two seconds, which is a
            reaction, not an action. He now RUNS the width of the room to the
            board, jumps at it, and starts hauling the first output away. */}
        {/* ⭐ HE TYPES FURIOUSLY — pitched forward into the desk, bouncing on a
            fast typing tick with a slower phrase envelope so it comes in bursts,
            and he flinches out of it on every impact. */}
        {f < CLIMAX + 12 && (
          <Typist f={f} x={318} y={616} s={200} z={60} rate={3.1} glasses={1}
            bursts={HIT.map((h) => h + 10)}
            shock={HIT.some((h) => f >= h && f < h + 9) ? 1 : 0} />
        )}
        {f >= CLIMAX + 12 && (() => {
          const lf = f - (CLIMAX + 12);
          const run = E(f, CLIMAX + 12, CLIMAX + 34, 0, 1, IO);   /* 318 -> 176 */
          const jump = lf > 22 ? -Math.abs(Math.sin((lf - 22) / 7)) * 42 : 0;
          const hauling = lf > 40;
          return (
            <div style={{ position: "absolute", left: (318 - run * 142) - 98,
              top: 616 - 196 * 0.62 + jump, zIndex: 60,
              transform: `scaleX(-1) rotate(${Math.sin(lf / 5.2) * 4}deg)`,
              transformOrigin: "50% 92%" }}>
              <Contact x={10} y={196 * 0.96 - jump} w={196 * 0.82} z={-1} o={0.34} />
              <Mascot lf={f} size={196} glasses={1}
                cheer={jump < -6 ? 0.9 : 0.4} nodAmp={6} nodSpeed={7} />
              {hauling && (
                <div style={{ position: "absolute", left: 196 * 0.74, top: 196 * 0.06,
                  width: 84, height: 56, borderRadius: 7, background: mxh(SKILL_C[0], 0.52),
                  border: `3px solid ${dkh(SKILL_C[0], 0.22)}`,
                  transform: `rotate(${Math.sin(lf / 6) * 7}deg)` }} />
              )}
            </div>
          );
        })()}

        {/* THE BARRAGE — eight crates, accelerating, alternating sides */}
        <CrateBarrage f={f} hits={HIT} targets={targets} yTarget={TY + 20}
          s0={0.95} s1={1.42} z={76} travel={12} />
        {HIT.map((h, i) => (
          <React.Fragment key={"hp" + i}>
            <Puff x={targets[i] + TW / 2} y={TY + TW * 0.8} f={f} at={h}
              c="#9FB0C8" n={8} s={0.9 + i * 0.06} z={70} />
            <Ring x={targets[i] + TW / 2} y={TY + TW * 0.5} f={f} at={h}
              c="#DCE6F4" max={150 + i * 18} z={69} dur={14} />
            {/* ⭐ a shock band that races the length of the rail on every hit —
                large, bright, fast, and it is what makes the room feel struck */}
            {(() => {
              const k = E(f, h, h + 13, 0, 1, OUT);
              if (k <= 0 || k >= 1) return null;
              const w = 1160 * k;
              return (
                <div style={{ position: "absolute", left: targets[i] + TW / 2 - w / 2,
                  top: TY - 40, width: w, height: TW + 80, zIndex: 24, borderRadius: 18,
                  background: `radial-gradient(ellipse at 50% 50%, ${hexa("#EAF1FB", 0.42 * (1 - k))} 0%, ${hexa("#EAF1FB", 0)} 72%)`,
                  border: `${Math.max(2, 10 * (1 - k))}px solid ${hexa("#DCE6F4", 0.5 * (1 - k))}` }} />
              );
            })()}
          </React.Fragment>
        ))}

        {/* ⭐⭐ THE CLIMAX at 3.33s — the biggest hit of the eight lands on the
            board itself, bay 1 ignites with a real Claude in it, and the room
            flashes. The 5.63s hook now has EIGHT escalating beats and a peak,
            instead of one event at 1.5s and four seconds of walking. */}
        {/* ⛔ IT HAS TO LEAVE. v1 had no exit condition, so the crate that caused
            the climax then sat on top of bay 1 — the result of the event hidden
            by the cause of it — for the remaining 2.3 seconds. It now seats INTO
            the bay over 8 frames and is gone. */}
        {f < CLIMAX + 9 && (
          <SkillCrate x={E(f, CLIMAX - 15, CLIMAX, 0, 1, IN_Q) * 460 - 380}
            y={150 + E(f, CLIMAX - 15, CLIMAX, 0, 1, IN_Q) * 300 + E(f, CLIMAX, CLIMAX + 9, 0, 1, IN_Q) * 60}
            f={f} s={1.05 - E(f, CLIMAX, CLIMAX + 9, 0, 1, IN_Q) * 0.5} z={80}
            c={SKILL_C[0]} t={R1.skill}
            rot={-40 + E(f, CLIMAX - 15, CLIMAX, 0, 1, IN_Q) * 40} />
        )}
        {/* ⭐⭐ 3-4s measured 5.49, the weakest second in the hook, because the
            climax was carried by two ring outlines and a puff — almost no area.
            The crate now SHATTERS: ten large panels thrown across the frame on
            their own arcs. Large + bright + travelling is the only combination
            that registers, and it is also what an impact should look like. */}
        {Array.from({ length: 10 }, (_, i) => {
          const k = E(f, CLIMAX, CLIMAX + 26 + (i % 4) * 5, 0, 1, OUT);
          if (k <= 0 || k >= 1) return null;
          const ang = -2.5 + (i / 9) * 5.0;
          const dist = (330 + (i % 5) * 120) * k;
          const sz = 54 + (i % 4) * 26;
          return (
            <div key={"db" + i} style={{ position: "absolute",
              left: 150 + Math.sin(ang) * dist - sz / 2,
              top: 500 - Math.cos(ang) * dist * 0.62 + k * k * 240,
              width: sz, height: sz * 0.72, borderRadius: 7, zIndex: 72,
              background: dkh(SKILL_C[0], 0.30 - (i % 3) * 0.08),
              border: `3px solid ${mxh(SKILL_C[0], 0.30)}`,
              opacity: 1 - Math.max(0, k - 0.66) / 0.34,
              transform: `rotate(${(i % 2 ? 1 : -1) * k * 320}deg)` }} />
          );
        })}
        <Puff x={150} y={520} f={f} at={CLIMAX} c="#B8C4D8" n={11} s={1.5} z={70} />
        <Ring x={150} y={506} f={f} at={CLIMAX} c={SKILL_C[0]} max={330} z={69} />
        <Ring x={150} y={506} f={f} at={CLIMAX + 5} c="#FFF3D8" max={430} z={69} />

        {/* ⭐⭐ EVENT 4 (f112, 3.7s) — what comes OUT of the lit bay is CLAUDES,
            not paper. Six of them march out and get to work at the desk.
            ⛔ This replaces a looping stream of cream cards, which is the exact
            animation reel 107 banned by name ("the white papers or the rectangles
            they SUCK need to be replaced" -> the output is more Claudes working).
            ⛔⛔ AND IT WAS SILENTLY DELETED ONCE: a broad `re.subn` aimed at the
            tie beams matched across this block too and removed both. The scene
            still rendered, still passed the motion audit, and the marchers were
            simply absent. **Never do code surgery with a greedy pattern — use an
            exact string, and grep for the thing you MEANT to keep afterwards.** */}
        {/* ⛔ SPACING IS ARITHMETIC: `pitch >= 0.85 * (rA + rB)`. Six marchers at
            s=140 down a 292px path is ~49px of pitch for 140px bodies — one
            unreadable orange mass, the same blob failure as reel 107 and as the
            CTA earlier in this build. FOUR marchers down a 497px path at
            every=16 gives ~181px of pitch. Compute it before adding count. */}
        <BayMarch f={f} at={CLIMAX + 6} x={150} y={498} x1={620} y1={660}
          n={4} every={16} s={140} z={64} />

        {/* ⭐⭐ EVENT 5 (f140, 4.7s) — the SIX DARK BAYS pulse in sequence, one
            after another, like a queue powering up. The last second of the hook
            now advances the promise instead of holding it. */}
        {[1, 2, 3, 4, 5, 6].map((b, i) => {
          const t0 = CLIMAX + 46 + i * 5;
          const k = E(f, t0, t0 + 7, 0, 1, OUT) * (1 - E(f, t0 + 7, t0 + 20, 0, 1, OUT));
          if (k <= 0.01) return null;
          const BW = 118 * 0.92, GAP = 9 * 0.92;
          return (
            <div key={"qp" + i} style={{ position: "absolute",
              left: 96 + b * (BW + GAP), top: 432, width: BW, height: 132 * 0.92,
              borderRadius: 4, zIndex: 52, pointerEvents: "none",
              background: hexa(SKILL_C[b], 0.30 * k),
              border: `${3}px solid ${hexa(SKILL_C[b], 0.75 * k)}` }} />
          );
        })}

        {/* ⭐⭐⭐ EVENT 6 (f126, 4.2s) — THE 4-5s SECOND MEASURED 4.99 against
            14-16 either side, because four 116px sprites walking is small motion
            however new it is. The invoice stack now gets BLOWN OFF the desk and
            out of frame: seven large sheets crossing most of the panel in 20
            frames, which is the only shape the audit can see AND the header's own
            claim ("that replace an agency") made physical. */}
        {(() => {
          const BLOW = CLIMAX + 32;
          const k = E(f, BLOW, BLOW + 22, 0, 1, IN_Q);
          return (<>
            {k < 1 && <InvoiceStack x={-24} y={730} s={1.05} z={93} shove={k * 0.35} />}
            {k > 0 && Array.from({ length: 7 }, (_, i) => {
              const kk = E(f, BLOW + i * 2, BLOW + 22 + i * 3, 0, 1, OUT);
              if (kk <= 0) return null;
              const spin = (i % 2 ? 1 : -1) * kk * (260 + i * 40);
              return (
                <div key={"iv" + i} style={{ position: "absolute",
                  left: 20 + kk * (760 + i * 46), top: 700 - kk * (330 + i * 52),
                  zIndex: 94, opacity: 1 - Math.max(0, kk - 0.72) / 0.28,
                  transform: `rotate(${spin}deg)` }}>
                  <div style={{ width: 176, height: 112, borderRadius: 4,
                    background: i % 2 ? "#E6E1D4" : "#EFEAE0", border: "2px solid #C9C2B2",
                    boxShadow: SH }}>
                    <div style={{ position: "absolute", left: 13, top: 13, width: 88,
                      height: 15, borderRadius: 2, background: RED, opacity: 0.85 }} />
                    {[0, 1, 2, 3].map((j) => (
                      <div key={j} style={{ position: "absolute", left: 13, top: 40 + j * 15,
                        width: 62 + ((i * 17 + j * 29) % 84), height: 6, background: "#B5AE9E" }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </>);
        })()}
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 — THE RESEARCH WALL.  f169-322 (5.10s = 153f).  BEAT: SETUP. Intensity 6.
   VO: "Number one is the head of content skill by Brad Automates. It tracks top
        creators and turns their patterns into your next content."
   EVENT: a wall of live creator tiles streams past (background process, never
   stops); the specialist throws a lever; FIVE tiles detach and fly to the bench,
   spread f26/44/62/83/107 across the FULL 153 frames, each flipping into a
   pattern card on arrival.
   ====================================================================== */
export const S1: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const GRAB = [50, 96, 138];
  /* the pit: eight creator posts, each on a real platform */
  const PIT = [
    { x: 78,  y: 452, lg: "logos/instagram.svg" }, { x: 214, y: 470, lg: "logos/x.svg" },
    { x: 344, y: 448, lg: "logos/youtube.svg" },   { x: 470, y: 474, lg: "logos/tiktok.svg" },
    { x: 596, y: 452, lg: "logos/instagram.svg" }, { x: 722, y: 470, lg: "logos/youtube.svg" },
    { x: 176, y: 604, lg: "logos/tiktok.svg" },    { x: 416, y: 610, lg: "logos/x.svg" },
  ];
  const HOT = [2, 4, 7];
  return (
    <Scene p={asPlace("wall")} slug="" push={push(v, 153, 1.14)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="wall" f={f} />

        {/* the pit of posts it is fishing in */}
        {PIT.map((p2, i) => (
          <PitPost key={"pp" + i} f={f} x={p2.x} y={p2.y} logo={p2.lg} seed={i}
            hot={HOT.includes(i)} s={0.86} z={44 + (i % 3)} c={TEAL}
            grabAt={HOT.indexOf(i) >= 0 ? GRAB[HOT.indexOf(i)] : undefined}
            dropAt={i * 9} />
        ))}

        {/* ⭐ THE CLAW — round prongs, a cable, a trolley on a rail. Nothing in
            this scene is an axis-aligned panel any more. */}
        <ClawRig f={f} x={60} y={158} grabs={GRAB} targets={HOT.map((i) => PIT[i].x - 40)}
          s={1} z={60} c={TEAL} />

        {/* ⭐ replacements keep arriving after every grab */}
        {[{x: 344, y: 448, lg: "logos/x.svg", at: 74},
          {x: 596, y: 452, lg: "logos/tiktok.svg", at: 118},
          {x: 176, y: 604, lg: "logos/youtube.svg", at: 146}].map((r, i) => (
          <PitPost key={"pr" + i} f={f} x={r.x} y={r.y} logo={r.lg} seed={i + 11}
            s={0.86} z={45} c={TEAL} dropAt={r.at} />
        ))}

        {/* the chute the winners are dropped into, and the plan that stacks up */}
        <div style={{ position: "absolute", left: 812, top: 470, width: 160, height: 40,
          borderRadius: 20, background: "#2C5C68", zIndex: 46 }} />
        {GRAB.map((g, i) => {
          const k = E(f, g + 40, g + 54, 0, 1, BACK);
          if (k <= 0) return null;
          return (
            <div key={"pl" + i} style={{ position: "absolute", left: 820, top: 596 - i * 40,
              zIndex: 66 + i, opacity: Math.min(1, k * 1.6), width: 148, height: 34,
              borderRadius: 17, background: "#EFEAE0", border: `3px solid ${TEAL}`,
              transform: `scaleY(${squash(f, g + 48, 0.22)})`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: TEAL }} />
              <div style={{ width: 74, height: 7, borderRadius: 4, background: "#A9A294" }} />
            </div>
          );
        })}

        {/* ⭐ a Claude ON THE JOYSTICK — the claw moves because he moves it */}
        <Operator f={f} x={904} y={716} s={198} z={62} period={46} phase={0} fro={1}
          lever={(lk) => (<>
            <div style={{ position: "absolute", left: 828, top: 664, width: 96, height: 46,
              borderRadius: 10, background: "#2C5C68", zIndex: 44 }} />
            <div style={{ position: "absolute", left: 870, top: 620, width: 14, height: 50,
              borderRadius: 7, background: "#4E7E8A", zIndex: 45, transformOrigin: "50% 100%",
              transform: `rotate(${-20 + lk * 40}deg)` }}>
              <div style={{ position: "absolute", left: -9, top: -16, width: 32, height: 32,
                borderRadius: "50%", background: RED }} />
            </div>
          </>)} />
        <Walker f={f} x0={120} x1={430} y={730} s={140} z={58} period={172} phase={40} glasses={1} />

        <RepoCard f={f} at={16} x={548} y={112} s={0.72} z={86} c={TEAL}
          owner={R1.owner} name={R1.skill} stars={205} forks={33} lang="Python"
          langC="#3572A5" desc="Social media content research and marketing skills for Claude Code and Cowork" />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S2 — THE RANKINGS SHAFT.  f322-541 (7.30s = 219f).  BEAT: TURN. Intensity 7.
   VO: "Number two is the AI SEO skill. It rewrites your content so AI engines
        like ChatGPT and Claude can actually rank it. And this is what some
        softwares charge thousands of dollars for."

   ⛔ THE LONGEST SCENE IN THE REEL — a single framing held for 7.3s is the
      "3.23 with a 60-frame dead run" failure. THREE sub-shots, cut on measured
      word onsets:
        2a f0-78    the reading head sweeps the page and the text RE-SETS
        2b f78-156  hard cut wide: the slab CLIMBS past four others, in DISCRETE
                    stepped lands (⛔ never one long tween: 82f smooth = 4.27,
                    four pops = 5.63)
        2c f156-219 hard cut tight to THE RETAINER, ticking, as we pass it UNBILLED
   ⛔ The villain is NOT defeated here. It is passed. It loses once, at S7.
   ====================================================================== */
export const S2: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* ⛔ CUT ON THE SPOKEN WORD. "ChatGPT" lands at 13.32s and "Claude" at 13.92s,
     i.e. scene-local frames 77 and 95 — the old 2a/2b boundary at 92 split them
     across a cut, so one brand was named over the press and the other over the
     ladder. The engines now get their own shot and both marks land inside it. */
  const A = 0, B = 70, C = 122, D = 176;
  const shot = f < B ? 0 : f < C ? 1 : f < D ? 2 : 3;

  /* ---- 2a · THE REWRITE PRESS. The old version was a 440px dark page with
     eight thin lines re-setting under a sweep: technically the right verb, and
     far too small and too dim to read as anything. Now it is a 700px press with
     a head that SLAMS three times and a page whose lines visibly re-set bright
     under each one. */
  if (shot === 0) {
    const SLAM = [26, 52, 78];
    /* the lens sweeps DOWN the results page; whatever it is over is rewritten */
    const lensY = 210 + E(f, 10, 66, 0, 1, IO) * 300;
    const lensX = 506 + Math.sin(f / 19) * 54;
    const R = 152;
    const ROWS = [{ y: 196, rank: "9" }, { y: 336, rank: "6" }, { y: 476, rank: "3" }];
    return (
      <Scene p={asPlace("shaft")} slug="" push={push(v, B, 1.13)} vig={0.42}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <SetFor k="shaft" f={f} />

          {/* the results page itself — the recognisable object, not a machine */}
          <div style={{ position: "absolute", left: 150, top: 150, width: 712, height: 480,
            borderRadius: 14, background: "#101A26", border: "4px solid #2A3E56", zIndex: 34 }} />
          {/* a search bar at the top of it, with a cursor */}
          <div style={{ position: "absolute", left: 182, top: 112, width: 648, height: 56,
            borderRadius: 28, background: "#E8EEF6", border: "4px solid #AEBCCE", zIndex: 38,
            display: "flex", alignItems: "center", paddingLeft: 26, gap: 14 }}>
            <svg width="26" height="26" viewBox="0 0 24 24">
              <circle cx="10" cy="10" r="7" stroke="#5E6B7C" strokeWidth="3" fill="none" />
              <path d="M15 15 L21 21" stroke="#5E6B7C" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div style={{ width: 300, height: 12, borderRadius: 6, background: "#8E99A8" }} />
            <div style={{ width: 3, height: 26, background: "#2F6FD0",
              opacity: Math.sin(f / 7) > 0 ? 1 : 0.15 }} />
          </div>

          {/* the DULL listings */}
          {ROWS.map((r, i) => (
            <SearchListing key={"d" + i} x={244} y={r.y} w={560} rich={false}
              s={1} z={40} c={SKILL_C[1]} rank={r.rank} />
          ))}
          {/* ⭐ and the RICH ones, clipped to the lens — the rewrite is only
              visible THROUGH the glass, which is the whole gag */}
          <div style={{ position: "absolute", inset: 0, zIndex: 60,
            clipPath: `circle(${R - 16}px at ${lensX}px ${lensY}px)` }}>
            <div style={{ position: "absolute", inset: 0,
              background: "radial-gradient(circle at " + lensX + "px " + lensY + "px, rgba(226,238,252,0.16) 0%, rgba(226,238,252,0) 70%)" }} />
            {ROWS.map((r, i) => (
              <SearchListing key={"r" + i} x={244} y={r.y} w={560} rich
                s={1} z={62} c={SKILL_C[1]} rank={["4", "2", "1"][i]} />
            ))}
          </div>
          <Magnifier f={f} x={lensX} y={lensY} r={R} s={1} z={80} c={SKILL_C[1]} />

          {SLAM.map((t, i) => (
            <Ring key={"sr" + i} x={lensX} y={lensY} f={f} at={t} c="#DCEBFA" max={230} z={78} />
          ))}

          {/* a Claude pushing the glass down the page */}
          <Operator f={f} x={880} y={706} s={186} z={62} period={30} phase={0} prof={1} />
          <Walker f={f} x0={110} x1={330} y={726} s={150} z={60} period={158} phase={30} constr={1} />

          <RepoCard f={f} at={10} x={392} y={646} s={0.60} z={86} c={SKILL_C[1]}
            owner="coreyhaines31" name="marketingskills" stars={44618} forks={7006}
            lang="JavaScript" langC="#F1E05A"
            desc="Marketing skills for Claude Code and AI agents. CRO, copywriting, SEO, analytics." />
        </div>
      </Scene>
    );
  }

  /* ---- 2b · THE AI ENGINES READ IT AND CITE IT. ChatGPT lands on the word at
     local 77, Claude at 95. ---- */
  if (shot === 1) {
    const lf = f - B;
    /* ⛔⛔ THE CLAUDE SEAL NEVER FIRED. It was authored at lf 68 in a shot that
       is 52 FRAMES LONG, so the second half of the scene's payoff simply did not
       exist — the "not reachable in time" trap, and nothing catches it because
       the code is correct and the render succeeds. **Convert every timed effect
       to its own shot's frame count before calling it done.**
       52 frames: swing 2 and 12, seals 26 and 38, all comfortably inside. */
    const GPT = 2, CLA = 12, SEAL = 24;
    return (
      <Scene p={asPlace("shaft")} slug="" push={push(v, C - B, 1.12)} vig={0.42}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <SetFor k="shaft" f={f} />
          <PageTraffic f={f} y={80} n={4} s={0.60} z={22} speed={6.2} c="#7F9CBE" rows={1} />

          {/* ⛔ YOUR PAGE IS A DOCUMENT, NOT A WIREFRAME. It carries a masthead
              with the Claude mark, a real bar chart and a pull quote. */}
          <ContentPage x={296} y={418} f={f} s={1} z={44} c={SKILL_C[1]} />

          {/* ⭐ two machines LEAN IN AND READ — arm, elbow, iris, pupil, beam */}
          <ReadingHead f={f} at={GPT} x={250} y={110} reach={250} t="ChatGPT"
            logo={null} c="#10A37F" s={1} z={70} />
          <ReadingHead f={f} at={CLA} x={762} y={110} reach={250} t="Claude"
            logo="logos/claude.svg" c="#D97757" flip s={1} z={70} />

          {/* ⭐ and the payoff lands ON the page: each engine presses a citation
              seal onto it, so "the engines can actually rank it" is a mark on
              your content rather than a badge floating above it */}
          <CiteSeal f={f} at={SEAL} x={318} y={668} logo={null} t="GPT"
            c="#10A37F" s={1} z={88} />
          <CiteSeal f={f} at={SEAL + 12} x={694} y={668} logo="logos/claude.svg" t="Claude"
            c="#D97757" s={1} z={88} />

          {/* ⭐ the page is being READ — fragments lift off it and stream up into
              each lens the whole time the head is over it */}
          <Ingest f={f} at={GPT + 14} x0={430} y0={470} x1={250} y1={340}
            c="#10A37F" n={4} s={1} z={66} speed={0.055} />
          <Ingest f={f} at={CLA + 14} x0={590} y0={470} x1={762} y1={340}
            c="#D97757" n={4} s={1} z={66} speed={0.055} />

          <Climber f={f} x={926} y0={760} y1={300} s={126} z={60} period={150} phase={0} prof={1} />
        </div>
      </Scene>
    );
  }

  /* ---- 2c · THE CLIMB. Big carved numerals on stone markers, one bright clay
     riser. Three readable objects instead of twenty-one grey slabs. ---- */
  if (shot === 2) {
    const lf = f - C;
    const PASS = [10, 26, 40, 52];
    return (
      <Scene p={asPlace("shaft")} slug=""
        push={push(v, D - C, 1.15)} vig={0.44}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <SetFor k="shaft" f={f} />
          <RankShaft f={lf} x={262} y={-120} passes={PASS} s={1} z={34} c={SKILL_C[6]} />
          {PASS.map((t, i) => (
            <Ring key={"pr" + i} x={506} y={330} f={lf} at={t} c="#F2EEE4" max={280} z={70} />
          ))}
          {/* a Claude riding it up, so the climb has somebody in it */}
          <Climber f={f} x={880} y0={760} y1={200} s={140} z={60} period={150} phase={0} prof={1} />
          <Retainer x={62} y={548} f={f} s={0.74} z={78} slack={0} />
        </div>
      </Scene>
    );
  }

  const lf = f - D;
  return (
    <Scene p={asPlace("shaft")} slug=""
      push={push(v, 219 - D, 1.18)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="shaft" f={f} />
        <PageTraffic f={f} y={150} n={4} s={1} z={24} speed={7.0} c="#9BB6D6" rows={2} />
        <Cam s={1.5} y={-40} z={28}>
          <Retainer x={368} y={300} f={f} s={1.5} z={78} slack={0} />
        </Cam>
        <div style={{ position: "absolute", left: -320 + E(f - D, 8, 46, 0, 1, IO) * 1180,
          top: 508, width: 320, height: 74, borderRadius: 6, zIndex: 84,
          background: "#C6D8EC", border: `4px solid ${SKILL_C[1]}` }}>
          <div style={{ position: "absolute", left: 14, top: 20, width: 170, height: 9,
            borderRadius: 4, background: "#1E3A5C" }} />
          <div style={{ position: "absolute", left: 14, top: 40, width: 110, height: 8,
            borderRadius: 4, background: "#4A6A8E" }} />
        </div>
        <Tag x={110} y={650} t="STILL BILLING" c={RED} s={1} z={94}
          o={E(lf, 14, 30, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S3 — THE PAINT SHOP.  f541-669 (4.27s = 128f).  BEAT: SETUP. Intensity 6.5.
   VO: "Number three is the brand guidelines. It applies a full brand system to
        your business like colors, fonts, and voice."
   EVENT: an unbranded page on the bench; the specialist slams a swatch fan open;
   THREE full-width sweeps repaint it — colour (f26), type (f62), voice (f98).
   ⛔ THREE VISIBLE TRANSFORMATIONS ON ONE OBJECT, never three labelled cards.
   ====================================================================== */
export const S3: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* the roller crosses the whole row once; each object flips as it is passed */
  /* ⛔ ONE PASS AND THE SCENE STOPS. The roller crossed f14-104 and the last 24
     frames had nothing moving but state changes. It now returns, so the shot is
     working right up to the cut. */
  const rollX = -180 + E(f, 8, 84, 0, 1, IO) * 1180 - E(f, 92, 128, 0, 1, IO) * 620;
  const OBJ: Array<{ k: any; x: number; y: number; s: number }> = [
    { k: "cup",   x: 92,  y: 470, s: 1.05 },
    { k: "tote",  x: 246, y: 452, s: 1.05 },
    { k: "sign",  x: 424, y: 458, s: 1.00 },
    { k: "card",  x: 622, y: 496, s: 1.05 },
    { k: "phone", x: 792, y: 442, s: 1.00 },
  ];
  /* three passes of the brand system, staged across the FULL 128 frames */
  const COLOUR = 26, TYPE = 62, VOICE = 96;
  return (
    <Scene p={asPlace("paint")} slug="" push={push(v, 128, 1.15)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="paint" f={f} />

        {/* ⭐ the business's OWN THINGS, each with its own silhouette. The old
            version's hero was a cream page with grey line-stubs. */}
        {OBJ.map((o, i) => {
          const passed = rollX > o.x + 20;
          return (
            <BrandObject key={"bo" + i} kind={o.k} x={o.x} y={o.y}
              painted={passed && f >= COLOUR}
              typed={passed && f >= TYPE}
              voiced={passed && f >= VOICE && i % 2 === 0}
              f={f} at={COLOUR + i * 6} s={o.s} z={50 + i} c={SKILL_C[2]} />
          );
        })}

        {/* ⭐ THE CLAUDE IS TIED TO THE ROLLER, not on his own clock. v1 gave him
            an independent walk cycle so he strolled THROUGH the objects while the
            roller travelled somewhere else — two things moving, no relationship
            between them. He is now always just behind it, and the roller only
            exists because he is pushing it. */}
        <PaintRoller f={f} x={rollX} y={386} s={1.45} z={76} c={SKILL_C[2]} />
        {(() => {
          const hx = rollX - 96, stride = Math.abs(Math.sin(f / 5.0)) * 10;
          return (
            <div style={{ position: "absolute", left: hx - 96, top: 640 - 192 * 0.62 - stride,
              zIndex: 70, transform: `rotate(${Math.sin(f / 5.0) * 5}deg)`,
              transformOrigin: "50% 92%" }}>
              <Contact x={10} y={192 * 0.96 + stride} w={192 * 0.82} z={-1} o={0.34} />
              <Mascot lf={f} size={192} chef={1} nodAmp={6} nodSpeed={6} />
            </div>
          );
        })()}
        {/* ⭐ THE ROLLER RAKES THE ROOM. A full-height band travelling with the
            barrel, alternating LIGHT AND SHADOW — the single strongest motion
            primitive in the repo, and here it is just what a big object passing
            a lamp does. ⛔ light-only lifts the black point; the dark half is
            not optional. */}
        <div style={{ position: "absolute", left: rollX - 210, top: 0, width: 150, height: H,
          zIndex: 28, transform: "skewX(-12deg)", background: "rgba(12,7,2,0.42)" }} />
        <div style={{ position: "absolute", left: rollX - 40, top: 0, width: 190, height: H,
          zIndex: 28, transform: "skewX(-12deg)",
          background: `linear-gradient(90deg, ${hexa("#F7E8D2", 0.34)} 0%, ${hexa("#F7E8D2", 0.04)} 100%)` }} />

        {/* ⭐ a paint trail behind the roller, so the pass leaves a mark */}
        <div style={{ position: "absolute", left: 0, top: 556, width: Math.max(0, rollX + 60),
          height: 16, borderRadius: 8, background: hexa(SKILL_C[2], 0.75), zIndex: 30 }} />

        {/* the fan stays as the brand's own reference, bigger and in the corner */}
        <SwatchFan f={f} x={806} y={606} at={8} s={1.15} z={66} n={9} />

        {[COLOUR, TYPE, VOICE].map((t, i) => (
          <React.Fragment key={"pr" + i}>
            <Ring x={506} y={520} f={f} at={t} c={SKILL_C[2]} max={260} z={72} />
            <Puff x={506} y={540} f={f} at={t} c="#C08E5A" n={8} s={1.1} z={71} />
          </React.Fragment>
        ))}

        <RepoCard f={f} at={12} x={56} y={112} s={0.70} z={86} c={SKILL_C[2]}
          owner="ComposioHQ" name="awesome-claude-skills" stars={72670} forks={8302}
          lang="Python" langC="#3572A5"
          desc="brand-guidelines: colour system, typography, logo rules and a tone matrix" />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S4 — THE PLUG RACK.  f669-830 (5.37s = 161f).  BEAT: ESCALATE. ⭐ PEAK 1 (8).
   VO: "Number four is the Anthropic marketing plugin. Just one install gives you
        six commands and it's wired straight into HubSpot, Slack, Canva, and Klaviyo."

   ⛔⛔⛔ NO NUMERAL ANYWHERE IN THIS SCENE. The VO says six; the README's table
      has SEVEN. The hero is the FOUR REAL INTEGRATIONS, all verified. The command
      burst is deliberately NOT countable — chips overlap, fly at different rates
      and several leave frame.
   ⛔ Klaviyo has no mark on the CDN, so it renders as a WORDMARK, never a fake.
   EVENT: one empty slot + four dark pillars -> cartridge seated two-handed ->
   four cables FIRE across the full panel width (f36/53/70/87) -> each pillar
   lights with its real mark. The set lights ITSELF as it wires.
   ====================================================================== */
export const S4: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const SEAT = 30;
  const FIRE = [36, 53, 70, 87];
  const seated = f >= SEAT ? 1 : 0;
  const drive = E(f, 14, SEAT, 0, 1, IN_Q);
  const lit = FIRE.filter((t) => f >= t + 12).length;
  /* ⛔ THE FOUR PILLARS, INSIDE THE PUSH CROP. v1 put the fourth at x=884 and the
     1.13 push sliced Klaviyo — the one integration with no logo on the CDN and
     therefore the one that most needs to be readable. */
  const PX = [125, 333, 541, 749], PY = [524, 524, 524, 524];
  return (
    <Scene p={asPlace("rack")} slug=""
      push={push(v, 161, 1.13)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="rack" f={f} lightK={1 + lit * 0.5} />

        <PlugRack x={356} y={274} s={1} z={40} seated={seated} />

        {/* the cartridge, lifted two-handed and DRIVEN home */}
        {f < SEAT + 3 && (
          <Cartridge x={402 + drive * 0} y={110 + drive * 186} f={f} s={1} z={76}
            rot={-8 + drive * 8} />
        )}

        {/* four cables firing to four pillars, one after another */}
        {FIRE.map((t, i) => (
          <Cable key={"cb" + i} f={f} at={t} dur={12} c={WIRED[i].c} s={1} z={44}
            x0={506} y0={396}
            x1={[128, 336, 676, 884][i] + 69} y1={[470, 508, 508, 470][i] + 40} />
        ))}
        {/* ⭐ "wired straight into" is a FLOW. PLUGIN measured 4.36 with a 52%
            hold because the cables fired and then sat there. */}
        {FIRE.map((t, i) => (
          <CablePulse key={"cpz" + i} f={f} at={t + 12} c={WIRED[i].c} s={1} z={50} n={4}
            x0={506} y0={396}
            x1={PX[i] + 69} y1={PY[i] + 30} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <Pillar key={"pl" + i} x={PX[i]} y={PY[i]}
            f={f} idx={i} on={f >= FIRE[i] + 12 ? 1 : 0} s={1} z={52} at={FIRE[i] + 12} />
        ))}
        {/* each pillar's own practical, arriving with it */}
        {[0, 1, 2, 3].map((i) => f >= FIRE[i] + 12 ? (
          <Pool key={"pp" + i} x={PX[i] + 69} y={PY[i] + 190} w={280} c={WIRED[i].c} o={0.20} z={19} />
        ) : null)}

        {/* ⛔ NOT COUNTABLE, NO NUMERAL */}
        <CommandBurst f={f} x={506} y={330} at={SEAT + 4} s={1} z={80} n={11} />

        <Puff x={506} y={392} f={f} at={SEAT} c="#6E7688" n={8} s={1.1} z={70} />
        <Ring x={506} y={386} f={f} at={SEAT} c={SKILL_C[3]} max={250} z={69} />

        {/* ⭐ he WALKS THE RACK FRONT rather than standing beside it */}
        <Walker f={f} x0={150} x1={860} y={790} s={214} z={64} period={190} phase={0}
          suit={1} glasses={1} cheer={f >= SEAT ? 0.6 : 0} />

        <RepoCard f={f} at={96} x={276} y={112} s={0.78} z={86} c={SKILL_C[3]}
          owner="anthropics" name="knowledge-work-plugins" stars={23537} forks={2838}
          lang="Python" langC="#3572A5"
          desc="Open source plugins for knowledge workers in Claude Cowork" />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S5 — THE COUNCIL ROOM.  f830-994 (5.47s = 164f).  BEAT: SETUP. Intensity 7.
   VO: "Number five is the marketing council skill. It simulates an entire board
        of marketing experts debating your strategy before you commit to it."
   EVENT: your strategy card alone on a dark table -> lamps snap on one at a time
   (f20/42/64/86/108) and each councillor LEANS IN AND GESTURES on its own action
   loop; TWO visibly disagree -> at f130 the lamps converge and one recommendation
   STAMPS onto the card.
   ⛔ Pitch recomputed on the board: FIVE at the table @175px + two standing back.
   ⛔ NO REAL MARKETERS' NAMES — the skill simulates personas.
   ====================================================================== */
export const S5: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const LAMP = [20, 42, 64, 86, 108];
  const STAMP = 130;
  const COST: Array<Record<string, any>> = [{ suit: 1 }, { prof: 1 }, { beard: 1 },
    { girl: 1 }, { wizard: 1 }];
  return (
    <Scene p={asPlace("council")} slug=""
      push={push(v, 164, 1.16)} vig={0.50}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="council" f={f} />

        {/* ⭐⭐ PROPOSALS SHOVED INTO THE MIDDLE — and one gets shoved straight
            back out. COUNCIL held at 85%: five sprites in a row at one depth,
            leaning. A debate is things being PUT ON THE TABLE and taken off it. */}
        <Proposal f={f} at={26} x0={120} x1={330} y={604} killAt={74} s={1} z={60} c={SKILL_C[4]} />
        <Proposal f={f} at={52} x0={880} x1={648} y={598} killAt={96} s={1} z={61} c={SKILL_C[4]} />
        <Proposal f={f} at={84} x0={150} x1={392} y={612} s={1} z={62} c={SKILL_C[4]} win />

        {/* FIVE at the table, 175px pitch — a cast, not a blob */}
        {COST.map((c, i) => {
          const x = 148 + i * 175;
          const on = f >= LAMP[i];
          const after = Math.max(0, f - LAMP[i]);
          /* two of them visibly DISAGREE — a debate needs dissent to read */
          const dissent = i === 1 || i === 3;
          const lean = on ? (dissent ? -Math.sin(after / 11) * 11 : Math.sin(after / 9) * 9) : 0;
          return (
            <React.Fragment key={"cm" + i}>
              <Worker f={f} x={x} y={i % 2 ? 578 : 540} s={i % 2 ? 168 : 132} z={56 + (i % 2 ? 4 : 0)} seed={i * 3}
                phase={i * 13} rate={0.9 + i * 0.07} arm={!dissent}
                lean={lean} gaze={dissent ? Math.sin(after / 13) * 0.9 : 0}
                stern={dissent && on ? 1 : 0} {...c} />
              <CouncilLamp x={x - 46} y={572} f={f} at={LAMP[i]} s={1.35} z={70 + i} />
            </React.Fragment>
          );
        })}

        {/* ⭐ the two who are NOT seated PACE THE ROOM, the length of it — which
            is what people do in an argument they are losing */}
        <Walker f={f} x0={188} x1={470} y={452} s={112} z={40} period={196} phase={31} cop={1} />
        <Walker f={f} x0={840} x1={568} y={448} s={112} z={40} period={214} phase={17} samurai={1} />

        {/* ⭐ a debate is things CROSSING a table. COUNCIL measured 4.39 with a
            53% hold when the argument was only sprites leaning. */}
        <ArgumentFlight f={f} y={452} x0={96} x1={916} n={7} s={1} z={52} speed={5.6} />

        <StrategyCard x={392} y={594} f={f} s={1} z={62} stampAt={STAMP} />
        <Ring x={507} y={664} f={f} at={STAMP + 7} c={GREEN} max={230} z={70} />

        <RepoCard f={f} at={14} x={548} y={112} s={0.76} z={86} c={SKILL_C[4]}
          owner="coreyhaines31" name="marketingskills" stars={44618} forks={7006}
          lang="JavaScript" langC="#F1E05A"
          desc="marketing-council: a simulated board of advisors that surfaces where they disagree" />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S6 — THE LEAD FLOOR.  f994-1191 (6.57s = 197f).  BEAT: ESCALATE. Intensity 8.5.
   VO: "And number six is the Lessie skill. It finds real creators and B2B leads
        across a hundred live sources then verifies each email before you reach out."

   ⛔ SECOND-LONGEST SCENE -> TWO sub-shots, cut on "then verifies":
        6a f0-106    cards pour onto the belt from many feeds, continuously
        6b f106-197  pull back to the verify station: good cards take a stamp,
                     BAD ONES ARE FLICKED INTO THE HOPPER
   ⭐ The reject is what makes "verifies" visible. Without it, verification is an
      invisible state change.
   ⛔ The "hundred" is NEVER typeset — it is 60 feeds you can watch running.
   ====================================================================== */
export const S6: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const CUT = 106;
  const wide = f >= CUT;
  const VERIFY_X = 604;
  return (
    <Scene p={asPlace("leads")} slug=""
      push={push(v, wide ? 197 - CUT : CUT, wide ? 1.12 : 1.16)} vig={0.38}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="leads" f={f} />

        {/* ⛔ "a hundred live sources" as OBJECT COUNT, never as a numeral */}
        <SourceWall f={f} x={44} y={104} cols={12} rows={4} s={1} z={12} />

        <Cam y={wide ? E(f, CUT, CUT + 18, 0, 1, OUT) * 44 : 0}
          s={wide ? E(f, CUT, CUT + 18, 1, 0.88, OUT) : 1} z={20}>
          {/* THE BELT — full-width travelling band, light AND shadow slats */}
          <LeadBelt f={f} x={-60} y={472} w={1160} h={78} s={1} z={30} speed={5.2} />

          {/* the cards riding it. Every 4th is BAD and gets flicked. */}
          {/* ⛔ these were anonymous rectangles — "just squares and shapes". The
              skill finds CREATORS, so each lead now carries the real mark of the
              platform it came from, which is both more legible and more true. */}
          {Array.from({ length: 8 }, (_, i) => {
            const P = [["logos/instagram.svg", "IG"], ["logos/x.svg", "X"],
                       ["logos/youtube.svg", "YT"], ["logos/tiktok.svg", "TT"]][i % 4];
            return (
              <LeadCard key={"lc" + i} f={f} i={i} x0={-i * 172} y={476} speed={5.2}
                verifyX={VERIFY_X} bad={i % 4 === 3} s={1} z={56 + i} span={1380}
                logo={P[0]} plat={P[1]} c={SKILL_C[5]} />
            );
          })}

          <VerifyHead x={VERIFY_X - 44} y={452} f={f} s={1} z={70} />
          <Hopper x={VERIFY_X + 96} y={606} s={1} z={84} />

          {/* ⭐⭐ LESSIE HELD AT 85%: the belt ran continuously and NOTHING
              accumulated, so 33s and 39s looked identical. A loop is not
              progress. The verified leads now STACK on the right and the
              rejects visibly fill the hopper, so the scene ends somewhere
              different from where it started. */}
          {Array.from({ length: 7 }, (_, i) => {
            const t0 = 26 + i * 22;
            const k = E(f, t0, t0 + 10, 0, 1, BACK);
            if (k <= 0) return null;
            return (
              <div key={"vs" + i} style={{ position: "absolute", left: 852 + (i % 2) * 10,
                top: 640 - i * 27, zIndex: 74 + i, opacity: Math.min(1, k * 1.6),
                width: 132, height: 26, borderRadius: 13,
                background: mxh(SKILL_C[5], 0.50), border: `3px solid ${dkh(SKILL_C[5], 0.30)}`,
                transform: `scaleY(${squash(f, t0 + 9, 0.24)}) rotate(${rock(f, t0 + 9, 3, 14)}deg)`,
                display: "flex", alignItems: "center", paddingLeft: 9, gap: 7 }}>
                <div style={{ width: 13, height: 13, borderRadius: "50%",
                  background: dkh(SKILL_C[5], 0.44) }} />
                <div style={{ width: 74, height: 6, borderRadius: 3,
                  background: hexa(dkh(SKILL_C[5], 0.44), 0.55) }} />
              </div>
            );
          })}
          {/* the rejects piling up inside the hopper */}
          {Array.from({ length: 4 }, (_, i) => {
            const t0 = 44 + i * 38;
            const k = E(f, t0, t0 + 8, 0, 1, OUT);
            if (k <= 0) return null;
            return (
              <div key={"rj" + i} style={{ position: "absolute", left: VERIFY_X + 120 + (i % 2) * 16,
                top: 690 - i * 13, zIndex: 86, width: 108, height: 15, borderRadius: 7,
                background: hexa(RED, 0.55), opacity: Math.min(1, k * 1.5),
                transform: `rotate(${(i % 2 ? 1 : -1) * 6}deg)` }} />
            );
          })}
        </Cam>

        {/* ⭐ the crew WALK THE LINE, and one hauls a crate of fresh leads across */}
        <Walker f={f} x0={130} x1={620} y={700} s={162} z={62} period={182} phase={9}
          constr={1} carry={<div style={{ width: 62, height: 44, borderRadius: 5,
            background: dkh(SKILL_C[5], 0.30), border: `3px solid ${SKILL_C[5]}` }} />} />
        <Walker f={f} x0={880} x1={560} y={688} s={152} z={62} period={210} phase={23}
          glasses={1} />

        {/* ⛔ Lessie is a PRODUCT, not a repo — it gets a product card and never
            an invented star count. */}
        <SiteCard f={f} at={16} x={56} y={112} s={0.78} z={86} c={SKILL_C[5]}
          site="lessie.ai" name="Lessie" stat={R6.n} statLabel="LIVE SOURCES"
          desc="Finds creators and B2B leads, audits follower authenticity, verifies every email" />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S7 — THE ROOF.  f1191-1338 (4.90s = 147f).  BEAT: PAYOFF. ⭐⭐ PEAK (10).
   VO: "Number seven is the campaign launcher OSS. It actively plans and launches
        a multi-channel ad campaign directly for your business."

   EVENT: the campaign assembled from everything built in S1-S6 sits on the gantry
   with the FULL SEVEN-BAY BOARD lit behind it (the hero artifact paid off) ->
   the hero pulls the lever (f19) -> it splits onto THREE channel rails firing out
   and up (f34/44/54) -> the roof floods.
   ⛔⛔ THE RETAINER IS OVERRUN HERE AND ONLY HERE — its chain goes slack.
   ⛔ Light is a SHAPED CONE, never a full-frame fill (rejected twice on reel 78).
   ====================================================================== */
export const S7: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const PULL = 19;
  const BEAM = [34, 44, 54];
  const pulled = E(f, PULL, PULL + 9, 0, 1, BACK);
  const slack = E(f, BEAM[2], BEAM[2] + 22, 0, 1, OUT);
  return (
    <Scene p={asPlace("roof")} slug=""
      push={push(v, 147, 1.16)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="roof" f={f} />

        {/* three shaped-cone channel beams — Google Ads / Meta / Lemlist */}
        {BEAM.map((t, i) => (
          <ChannelBeam key={"bm" + i} f={f} at={t} x={266 + i * 240} y={512}
            c={[SKILL_C[6], "#CFE6E2", SKILL_C[3]][i]} s={1} z={36} ang={(i - 1) * 13} />
        ))}

        {/* ⭐⭐ THE PEAK MEASURED 5.20 WITH A 78% HOLD — the worst hold in the
            reel, on the scene that carries the payoff. One payload per beam is a
            state change; multi-channel is a FLOW. */}
        {BEAM.map((t, i) => (
          <BeamStream key={"bst" + i} f={f} at={t} x={266 + i * 240} y={512}
            ang={(i - 1) * 13} c={[SKILL_C[6], "#CFE6E2", SKILL_C[3]][i]} s={1} z={40}
            n={5} speed={0.020} len={640} />
        ))}

        {/* ⭐ the three channels are NAMED in the repo README, so they get real
            marks. Lemlist 404s on the CDN -> wordmark, never a faked glyph. */}
        {/* ⛔ at y=556 the third chip landed on top of the operator, and the two
            outer ones sat on the parapets. They ride the BEAMS now, well clear of
            everything at ground level. */}
        {[["logos/googleads.svg", "Google Ads", "#4285F4"], ["logos/meta.svg", "Meta", "#0467DF"],
          [null, "lemlist", "#EFCF8C"]].map(([lg, t, c], i) => (
          <MarkChip key={"ch" + i} f={f} at={BEAM[i] - 6} x={222 + i * 240} y={402}
            logo={lg as string | null} t={t as string} c={c as string} s={1} z={68} />
        ))}

        <LaunchGantry x={266} y={512} f={f} s={1} z={46} pulled={pulled} />

        {/* ⭐ THE HERO ARTIFACT, PAID OFF — all seven bays lit, behind the launch */}
        <CampaignBoard x={232} y={146} f={f} lit={7} s={0.62} z={38}
          bayF={[-99, -99, -99, -99, -99, -99, -99]} />

        {/* ⛔⛔ the villain loses, once, here */}
        {/* ⛔⛔ THE VILLAIN LOSES ONCE, HERE. It has to be VISIBLE to lose —
            the Cam wrapper had it off the bottom of the panel. */}
        <Retainer x={78} y={470} f={f} s={0.62} z={78} slack={slack} />

        {/* ⭐ HE PULLS IT, AND IT MOVES. `LaunchGantry` already takes a `pulled`
            0..1, so the sprite and the machine run off ONE clock — which is the
            difference between a sprite near a lever and a sprite operating one. */}
        {/* ⛔ HE WAS AT x=862, BEHIND THE RIGHT PARAPET. The parapet is an
            `Occluder`-style mass at z=92 spanning x 762-1042; he was authored at
            z=62, so the hero of the payoff scene was hidden behind scenery for
            the whole shot. Clear band on this set is x 270-762. */}
        <Operator f={f} x={694} y={690} s={196} z={62} period={9999} phase={0}
          glasses={1} cheer={f >= PULL + 9 ? 0.8 : 0} />
        {/* ⭐ the crew RUN ON to watch, from off-frame, and keep moving after they
            arrive — a crowd that lands and stands is the round-1 note again */}
        {/* ⛔⛔ AND THESE THREE NEVER ARRIVED. `phase={-(f - 58)}` makes
            `t = f + phase` a CONSTANT, so the walk cycle froze at k=0.058 and all
            three sat off-panel at x = -96, -136 and 1121 for the entire scene —
            which is why 43s had no Claude in it at all. A phase that references
            `f` cancels the clock it is supposed to offset. */}
        {[{ x0: 296, x1: 452, y: 704, s: 130, pd: 176, ph: 0,  at: 58, c: { chef: 1 } },
          { x0: 470, x1: 336, y: 730, s: 122, pd: 202, ph: 40, at: 70, c: { girl: 1 } },
          { x0: 690, x1: 556, y: 720, s: 126, pd: 226, ph: 80, at: 82, c: { wizard: 1 } }]
          .map((w, i) => {
            const on = E(f, w.at, w.at + 16, 0, 1, OUT);
            if (on <= 0) return null;
            return (
              <div key={"cw" + i} style={{ position: "absolute", inset: 0, zIndex: 58 - i,
                transform: `translateX(${(1 - on) * (i === 2 ? 420 : -420)}px)`, opacity: on }}>
                <Walker f={f} x0={w.x0} x1={w.x1} y={w.y} s={w.s} z={58 - i}
                  period={w.pd} phase={w.ph} {...w.c} />
              </div>
            );
          })}

        {BEAM.map((t, i) => (
          <Ring key={"br" + i} x={266 + i * 240} y={512} f={f} at={t}
            c={SKILL_C[6]} max={260} z={70} />
        ))}
        {/* ⛔ z=86 put this BEHIND the left parapet (Occluder z=92). Checking the
            stacking context before touching values — reel 104 lost three effects
            to exactly this. */}
        {/* ⛔ ★10 IS THE REAL NUMBER AND IT GOES ON SCREEN UNCHANGED. This is the
            peak scene and a two-digit star count is an anticlimax there, which is
            exactly the pressure that produces a padded figure — the reel-99 ledger
            error, where a made-up number on a receipt-shaped object is the most
            believable kind of wrong. Improvado's OSS release is genuinely new; the
            card says so by saying nothing. */}
        {/* ⛔ at y=126 it covered the seven-bay board, which is the payoff of the
            whole reel. It sits below-left of the board now. */}
        <RepoCard f={f} at={70} x={54} y={250} s={0.64} z={94} c={SKILL_C[6]}
          owner="tekliner" name="improvado-agentic-frameworks-and-skills" stars={10}
          forks={3} lang="HTML" langC="#E34C26"
          desc="campaign-launcher-oss: Google Ads, Meta and Lemlist from one ICP prompt" />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S8 — THE FLOOR, WIDE.  f1338-1434 (3.20s = 96f).  BEAT: CTA. Intensity 8.5.
   VO: "If you want the full marketing skills set up, comment MARKETING and I'll
        send it to you."
   ⛔ The keyword is STRUCK into a plate — two stamp hits, never a fade.
   ⛔ Every specialist keeps running its action loop; the crowd does not freeze
      for the CTA.
   ====================================================================== */
export const S8: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const STRIKE = 26;
  return (
    <Scene p={asPlace("floorlit")} slug=""
      push={push(v, 96, 1.12)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="floorlit" f={f} />

        {/* the S0 framing, transformed: all seven bays burning */}
        <Cam s={0.86} y={-38} z={38}>
          <CampaignBoard x={78} y={150} f={f} lit={7} s={0.98} z={40}
            bayF={[-99, -99, -99, -99, -99, -99, -99]} />
        </Cam>

        <NightDesk x={330} y={584} f={f} s={0.9} z={44} lampOn={1} screen="#2E4A6E" />
        {/* the invoices, shoved aside — the S0 foreground, beaten */}
        <InvoiceStack x={-24} y={730} s={1} z={93} shove={1} />

        {/* ⛔⛔ THE CTA CROWD WAS CROPPED TO HEADS. Round 1: *"those little Claude
            sprites, it just shows, like, the head — not interesting."* They sat at
            y=648 at s=126, so the body ran to 648+126*0.38 = 696 and the panel's
            bottom furniture and slug band ate everything below the chin. They are
            now HIGHER, BIGGER, fully in frame, and none of them is standing still:
            three walk the floor and two work the desk. */}
        {/* ⛔ SPACING IS ARITHMETIC, NOT TASTE: `spacing >= 0.85 * (rA + rB)`.
            v1 sent three walkers along overlapping x-ranges at the same depth and
            two of them converged to 48px apart on bodies ~160px wide — one
            unreadable orange mass, which is the same blob failure reel 107 hit.
            They now run in TWO LANES at different depths, and no two paths in a
            lane can bring them closer than ~340px. */}
        {/* back lane */}
        <Walker f={f} x0={96} x1={300} y={592} s={150} z={54} period={176} phase={0} suit={1} />
        <Walker f={f} x0={904} x1={700} y={592} s={150} z={54} period={198} phase={44} fro={1} />
        {/* front lane */}
        <Operator f={f} x={170} y={712} s={158} z={58} period={68} phase={12} constr={1}
          lever={(lk) => (
            <div style={{ position: "absolute", left: 236, top: 624 - lk * 20, zIndex: 44,
              width: 16, height: 96, borderRadius: 8, background: "#7A6A50",
              transformOrigin: "50% 100%", transform: `rotate(${-14 + lk * 30}deg)` }} />
          )} />
        <Walker f={f} x0={392} x1={632} y={704} s={166} z={59} period={214} phase={96} chef={1}
          carry={<div style={{ width: 58, height: 44, borderRadius: 5,
            background: SKILL_C[5], border: "3px solid #2A2620" }} />} />
        <Operator f={f} x={868} y={712} s={154} z={58} period={82} phase={40} girl={1} />

        <KeywordPlate x={306} y={286} f={f} at={STRIKE} t={KEYWORD} s={1} z={88} />
        <Ring x={506} y={330} f={f} at={STRIKE + 16} c={GOLD} max={300} z={70} />
        <Puff x={506} y={352} f={f} at={STRIKE + 16} c="#C8B48A" n={9} s={1.3} z={69} />
      </div>
    </Scene>
  );
};
