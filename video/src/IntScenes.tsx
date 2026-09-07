import React from "react";
import { useCurrentFrame } from "remotion";
import {
  CommitBelt, CrewSwarm,
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, dkh, mxh, lerpHex, mono, ui, SH,
  Scene, Cam, Mark, Rake, Crew, Hero, Fall, Ring, Puff, Contact, Beam, squash,
  asPlace, Hall, RepoWall, BranchRail, StatusBar, FileSlab, Bay, Mast, QCard,
  R, GY, SLAB, SLAB2, SLAB3, PAGE, PAGE2, PAGELINE, RAIL, RAILHI, CLAY, GOLD,
  DIFFG, DIFFR, OKGREEN, INK, MUTE, TEAL, BONE, SYN, SYN_MIX, CARET, WARN, VIOLET,
  STEEL as SLATEISH,
} from "./IntWorld";

/* ===========================================================================
   REEL 140 · "INTENT" — THE SCENES.  Board: storyboards/140-intent.md.

   ⭐ THE LAWS EVERY SCENE IS AUTHORED TO (docs/ANIMATION-QUALITY):
   §1  motion ~= (fraction of the panel repainted per 0.1s) x (luma delta).
       LARGE x BRIGHT x FAST is the only combination that registers. Objects
       under ~40px vanish in the audit's 1012->240 downsample.
   §1  a travelling band must alternate LIGHT AND SHADOW — light bands only
       score worse AND lift the black point, which is the "fix it by lifting the
       shading" move §8 exists to ban. `BranchRail` is built that way.
   §5  SPRITES NEED AN ACTION LOOP, NOT AN IDLE — `Crew` carries the four loops
       (PACE / WORK / HOP / LOOK) by index, so a crowd does four things at once.
   §5  every shot needs ONE background process, always running.
   §9  ARRIVALS SPREAD ACROSS THE FULL DURATION — an arrival inside the first
       third leaves the rest dead.
   §9  DENSITY IS A SHAPE, not a level: it PEAKS on S11 (the loop closing) and
       S2 (the collapse), and thins to one idea on S8 and S10.
   §9  ⛔ PREFER SPRITES OVER ABSTRACT SLABS. Reel 107 answered every low score
       with more cream rectangles, doubled the metric and got "way too many
       paper animations... you need animations where it's actual Claude
       SPRITES". A FILE genuinely IS a rectangle, so the slabs stay — but every
       scene has bodies in it doing something, and they carry the beats.
   §2  A CUT IS NOT AN EVENT. Every scene names a before state, a trigger,
       travel, and an arrival that costs something.
   ⛔ ONE text chip per shot, in a band nothing else enters.
   ⛔ MATTE ONLY — no `boxShadow: "0 0 Npx"` anywhere in this file.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number; at?: number };

/* ⛔ THE VARIANT LEVERS, in the measured order that actually separates cuts
   (docs/TRIAL-CUTS.md: rake > grade > camera > bed > per-cut layout). An
   audio-only variant is a pixel duplicate, so the bed is the weakest of them
   and the picture levers do the work. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0, dy: 0, s: 1.010, rot: 0 },
  amber: { dx: -42, dy: 10, s: 1.042, rot: 0 },
  steel: { dx: 46, dy: -8, s: 1.048, rot: 0 },
};
/* ⛔ `hue-rotate` and `saturate` swings are BANNED as variant levers — they drag
   the CAST off the house clay. Separation comes from CONTRAST, which pivots at
   mid-grey so it lifts frame 0 AND drops the shadows at the same time. */
export const GRADE: Record<Variant, string> = {
  house: "saturate(1.06) contrast(1.03)",
  amber: "saturate(1.07) contrast(1.09) brightness(1.02)",
  steel: "saturate(1.04) contrast(1.12) brightness(0.99)",
};
/** per-variant wall seed AND row count — the per-cut layout lever */
const WALL: Record<Variant, { seed: number; rows: number }> = {
  house: { seed: 3, rows: 3 }, amber: { seed: 11, rows: 2 }, steel: { seed: 23, rows: 3 },
};
const PHASE: Record<Variant, number> = { house: 0, amber: 37, steel: 71 };
const wl = (v: Variant, d = 0) =>
  ({ seed: WALL[v].seed + d, rows: WALL[v].rows, phase: PHASE[v] });

/* one text chip per shot, in the band nothing else enters */
const Tag: React.FC<{ t: string; k?: number; y?: number; c?: string }> =
  ({ t, k = 1, y = 632, c = GOLD }) => k <= 0.01 ? null : (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", zIndex: 92,
    opacity: k, transform: `translateY(${(1 - k) * 12}px)` }}>
    <span style={{ ...mono(25, 900), letterSpacing: 2.2, color: INK,
      background: hexa(c, 0.95), padding: "9px 20px", borderRadius: 9,
      border: `3px solid ${dkh(c, 0.4)}` }}>{t}</span>
  </div>
);

/* ===========================================================================
   S1 · THE ROOM TURNS.  3.03-6.21s (95f)
   VO: "And even the creator of Claude Code said that this will change vibe
        coding forever."
   ⛔ NO name, NO face, NO quote card, NO quotation mark. The claim is the VO's;
   the frame stages ATTENTION, not attribution. `QUOTE_BANNED` enforces it.
   EVENT: before = an empty rail. trigger = the slab is on its plinth. travel =
   14 Claudes come IN from both edges. arrival = they cluster and the status
   check flips green. ⭐ The population GROWS and nobody exits frame — a
   countdown that empties the frame kills its own tail.
   ======================================================================== */
export const TURNS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("wide");
  const N = 14;
  const ok = f > 62 ? 1 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.30}>
      <Cam x={Math.sin(f / 30) * 5} s={1 + E(f, 0, dur, 0, 0.060, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 1)} wallY={96} wallO={0.55} rake={0.14} rakeRate={3.0}
          railRate={1.5} dim={0.10} beltY={600} beltY2={118} beltRate={4.6} litK={0.92} litTop={0} litH={648} />
        <CrewSwarm f={f} n={16} dur={dur} from="both" y={GY + 4} rows={2} size={100}
          z={44} span={9} seed={2} tint={CLAY} tint2={TEAL} />
        {/* the hero: STILL, on its plinth, the only thing not moving */}
        <div style={{ position: "absolute", left: W / 2 - 118, top: 596, width: 236, height: 74,
          zIndex: 52, borderRadius: 8,
          background: `linear-gradient(180deg, ${mxh(RAIL, 0.3)}, ${dkh(RAIL, 0.3)})`,
          border: `4px solid ${hexa(RAILHI, 0.4)}` }} />
        <FileSlab x={W / 2} y={432} w={244} h={318} z={60} f={f} name={R.hero}
          fields={R.fields} fieldsIn={1} glowK={1} rot={2} />
        {/* the crowd ARRIVING — spread across the FULL duration, in from both
            edges, each on its own action loop, and none of them leaves */}
        {Array.from({ length: N }, (_, i) => {
          const left = i % 2 === 0;
          const slot = Math.floor(i / 2);
          const t0 = 1 + i * 4;                       /* arrivals to f57 */
          const k = E(f, t0, t0 + 16, 0, 1, OUT);
          const dest = left ? 118 + slot * 62 : W - 118 - slot * 62;
          const from = left ? -90 : W + 90;
          const x = from + (dest - from) * k;
          return (
            <Crew key={"c" + i} f={f} x={x} y={GY - 2 + (slot % 2) * 10} i={i} size={98}
              z={44 + (i % 3)} at={t0} flip={!left}
              tint={i % 4 === 0 ? CLAY : i % 4 === 2 ? TEAL : undefined} />
          );
        })}
        <StatusBar tone={1} f={f} ok={ok} branch="main" />
        <Tag t="THE ROOM CAME TO LOOK" k={E(f, 56, 68, 0, 1, OUT)} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S2 · THE FAST WRONG BUILD.  6.21-12.93s (202f) — density peak #2
   VO: "Because the biggest problem with AI coding isn't getting to write code,
        it's getting to actually understand what you're trying to build and
        remember that throughout the entire process."
   TWO internal beats, cut by ACTION not by camera:
     A  18 code slabs fly up in 72 frames — it builds beautifully and fast
        -> the measure drops, does not match, the stack TIPS and collapses,
        and the collapse REVEALS red NO BRIEF plates that ACCUMULATE
        (`feedback_hold_needs_arrivals_not_travel` — the tail must FILL).
     B  it walks off and the branch behind it DROPS AWAY, slab by slab.
   ======================================================================== */
export const BLIND: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("build");
  const NB = 20, MEAS = 70, FALL = 86, WALK = 120;
  const measY = E(f, MEAS, MEAS + 13, -200, 286, OUT);
  const fall = Math.max(0, (f - FALL) / 40);
  const walk = E(f, WALK, dur, 0, 1, LIN);
  const heroX = 214 + walk * 300;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.42}>
      <Cam x={Math.sin(f / 26) * 6 + (f >= FALL ? Math.sin(f * 3.0) * 10 * Math.max(0, 1 - (f - FALL) / 20) : 0)}
        s={1 + E(f, 0, dur, 0, 0.075, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 2)} wallY={90} wallO={0.38} rake={0.22} rakeRate={4.0}
          railRate={1.8} dim={0.26} beltY={612} beltY2={126} beltRate={5.4} litK={0.86} litTop={0} litH={598} />
        <CrewSwarm f={f} n={14} dur={dur} from="l" y={GY + 2} rows={2} size={96}
          z={42} span={8} x0={70} x1={520} seed={3} tint={CLAY} />

        {/* ---- BEAT A: the stack goes up fast, one slab every 4 frames ---- */}
        {Array.from({ length: NB }, (_, i) => {
          const t0 = 3 + i * 3;
          const on = E(f, t0, t0 + 7, 0, 1, OUT);
          if (on <= 0.01) return null;
          const bw = 208 - (i % 3) * 26;
          const bx = 690 + ((i % 2) ? -16 : 14);
          const by = 606 - i * 30;
          const fx = fall * fall * (140 + rnd(i, 3) * 340) * (i % 2 ? 1 : -1);
          const fy = fall * fall * 460 - fall * (100 + rnd(i, 7) * 70);
          return (
            <div key={"bk" + i} style={{ position: "absolute", left: bx - bw / 2 + fx,
              top: by + fy - (1 - on) * 40, width: bw, height: 26, zIndex: 54 + i,
              opacity: on * (1 - fall * 0.22),
              transform: `rotate(${fall * (i % 2 ? 210 : -180)}deg) scaleY(${on})`,
              borderRadius: 5,
              background: `linear-gradient(168deg, ${mxh(SLAB3, 0.28)}, ${dkh(SLAB, 0.04)})`,
              border: `3px solid ${hexa(RAILHI, 0.32)}`,
              display: "flex", alignItems: "center", gap: 5, paddingLeft: 9 }}>
              {Array.from({ length: 4 }, (_, t) => (
                <div key={t} style={{ height: 4, borderRadius: 2, width: 12 + rnd(i * 4 + t, 9) * 30,
                  background: hexa(SYN_MIX[(i + t) % SYN_MIX.length], 0.66) }} />
              ))}
            </div>
          );
        })}
        {/* the measure that does not match */}
        {f >= MEAS && f < WALK && (
          <div style={{ position: "absolute", left: 560, top: measY, width: 400, height: 11,
            zIndex: 90, background: `linear-gradient(90deg, ${DIFFR}, ${dkh(DIFFR, 0.34)})`,
            borderRadius: 4 }} />
        )}
        {/* ---- what the collapse REVEALS, accumulating so the tail is the
            FULLEST part of the frame, not the emptiest ---- */}
        {Array.from({ length: 7 }, (_, i) => {
          const on = Math.max(0, Math.min(1, (fall - 0.14 - i * 0.09) * 3.4));
          if (on <= 0.01) return null;
          return (
            <div key={"nb" + i} style={{ position: "absolute", left: 566 + (i % 4) * 106,
              top: 300 + Math.floor(i / 4) * 122, width: 96, height: 106, zIndex: 42,
              opacity: on, transform: `scale(${0.7 + on * 0.3})`, borderRadius: 9,
              background: `linear-gradient(168deg, ${dkh(SLAB, 0.02)}, ${dkh(SLAB, 0.34)})`,
              border: `3px solid ${hexa(DIFFR, 0.56)}`,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 5 }}>
              <svg width={26} height={26} viewBox="0 0 24 24">
                <path d="M6 6 L18 18 M18 6 L6 18" stroke={DIFFR} strokeWidth={4.6} strokeLinecap="round" />
              </svg>
              <span style={{ ...mono(11, 800), color: hexa(DIFFR, 0.94) }}>NO BRIEF</span>
            </div>
          );
        })}
        {fall > 0 && Array.from({ length: 5 }, (_, k) => (
          <Fall key={"dz" + k} x={560 + k * 100} y={600} w={190} f={f} at={FALL + k * 3}
            n={9} z={86} c="#E8CFA4" s={0.95} rate={1.5} />
        ))}

        {/* ---- BEAT B: it walks, and the branch behind it drops away ---- */}
        {walk > 0 && Array.from({ length: 5 }, (_, i) => {
          const t0 = WALK + 5 + i * 9;
          const g = E(f, t0, t0 + 12, 0, 1, IN_Q);
          return (
            <div key={"dp" + i} style={{ position: "absolute", left: 96 + i * 104,
              top: GY - 26 + g * 190, width: 88, height: 30, zIndex: 30, opacity: 1 - g,
              transform: `rotate(${g * 62}deg)`, borderRadius: 5,
              background: `linear-gradient(168deg, ${mxh(SLAB3, 0.24)}, ${dkh(SLAB, 0.08)})`,
              border: `3px solid ${hexa(RAILHI, 0.3)}` }} />
          );
        })}
        <Hero f={f} x={heroX} y={GY} size={228} z={72} costume={{ constr: 1 }}
          stern={fall > 0.1 ? 1 : 0} shock={fall > 0.1 && fall < 0.9 ? 1 : 0}
          drive={walk > 0 ? 1 : 0} act={1} />
        <StatusBar tone={1} f={f} ok={0} branch="main" />
        <Tag t="IT NEVER KNEW WHY" k={E(f, 94, 106, 0, 1, OUT)} c={DIFFR} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S3 · THE SLAB ARRIVES.  12.93-15.37s (73f)
   VO: "So the fix is a file called the intent.md."
   ⭐ THE BIGGEST GRADE CUT IN THE REEL — S2's hot orange to a cool teal, so the
   turn is FELT before it is read. ONE object, ONE arrival, nothing else on the
   floor: the beat is a NAME LANDING.
   ======================================================================== */
export const FIX: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("fix");
  const RIDE = 3, SEAT = 22;
  const y = E(f, RIDE, SEAT, -260, 424, OUT);
  const seated = f >= SEAT;
  const sq = seated ? squash(f - SEAT, 0, 0.15, 3, 12) : 1;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.34}>
      <Cam x={Math.sin(f / 24) * 4} y={seated ? Math.sin(f * 2.8) * 5 * Math.max(0, 1 - (f - SEAT) / 12) : 0}
        s={1 + E(f, 0, dur, 0, 0.065, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 3)} wallY={94} wallO={0.5} rake={0.16} rakeRate={2.8}
          railRate={1.2} dim={0.14} beltY={596} beltY2={114} beltRate={3.4} litK={0.96} litTop={0} litH={672} />
        <CrewSwarm f={f} n={10} dur={dur} from="both" y={GY + 4} rows={1} size={104}
          z={44} span={8} seed={4} tint={TEAL} />
        {/* the gantry it rides down on — the background process */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 138, height: 16, zIndex: 30,
          background: `linear-gradient(180deg, ${hexa(RAILHI, 0.6)}, ${hexa(RAIL, 0.9)})` }} />
        <div style={{ position: "absolute", left: W / 2 - 5, top: 154, width: 10,
          height: Math.max(0, y - 154 + 60), zIndex: 30, background: hexa(RAILHI, 0.5) }} />
        {/* the plinth */}
        <div style={{ position: "absolute", left: W / 2 - 132, top: 604, width: 264, height: 82,
          zIndex: 52, borderRadius: 8,
          background: `linear-gradient(180deg, ${mxh(RAIL, 0.32)}, ${dkh(RAIL, 0.3)})`,
          border: `4px solid ${hexa(RAILHI, 0.42)}` }} />
        <div style={{ position: "absolute", left: 0, top: y, right: 0, zIndex: 70,
          transform: `scaleY(${sq}) scaleX(${2 - sq})`, transformOrigin: "50% 100%" }}>
          <FileSlab x={W / 2} y={0} w={272} h={340} z={70} f={f} name={R.hero}
            fields={R.fields} fieldsIn={E(f, SEAT + 2, SEAT + 34, 0, 1, OUT)}
            glowK={seated ? 1 : 0.3} />
        </div>
        {seated && <Ring x={W / 2} y={600} f={f} at={SEAT} c={TEAL} />}
        {seated && Array.from({ length: 3 }, (_, k) => (
          <Fall key={"dz" + k} x={W / 2 - 120 + k * 120} y={588} w={170} f={f} at={SEAT + k * 2}
            n={7} z={80} c="#CFF0F4" s={0.85} rate={1.4} />
        ))}
        {/* one witness, so the frame has a body in it */}
        <Crew f={f} x={158} y={GY} i={2} size={110} z={46} at={-14} tint={CLAY} />
        <Crew f={f} x={W - 158} y={GY} i={3} size={110} z={46} at={-14} flip />
        <StatusBar tone={1} f={f} ok={0} branch="main" />
        <Tag t={R.hero} k={E(f, SEAT + 6, SEAT + 20, 0, 1, OUT)} c={TEAL} y={648} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S4 · HOW vs WHY.  15.37-20.12s (143f)
   VO: "While CLAUDE.md tells Claude how to work, intent.md tells it why you're
        building something in the first place."
   The COMPARISON is the composition, so the camera is locked. The repeated
   motion layer is the small HOW rows ticking out on the left, which is exactly
   what makes the single big WHY on the right read as bigger.
   ======================================================================== */
export const HOWWHY: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("pair");
  const RULES = ["run the tests first", "use the repo style", "never touch main",
    "commit small", "ask before deleting"];
  const whyK = E(f, 64, 84, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.32}>
      <Cam x={Math.sin(f / 28) * 4} s={1 + E(f, 0, dur, 0, 0.060, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 4)} wallY={92} wallO={0.44} rake={0.15} rakeRate={3.2}
          railRate={1.3} dim={0.16} beltY={608} beltY2={122} beltRate={4.0} litK={0.90} litTop={0} litH={634} />
        <CrewSwarm f={f} n={14} dur={dur} from="both" y={GY + 6} rows={2} size={98}
          z={44} span={8} seed={5} tint={GOLD} tint2={TEAL} />
        {/* two plinths, deliberately unequal light */}
        {[288, W - 288].map((x, i) => (
          <React.Fragment key={"pl" + i}>
            <div style={{ position: "absolute", left: x - 118, top: 612, width: 236, height: 72,
              zIndex: 50, borderRadius: 8,
              background: `linear-gradient(180deg, ${mxh(RAIL, 0.28)}, ${dkh(RAIL, 0.32)})`,
              border: `4px solid ${hexa(RAILHI, 0.38)}` }} />
            <Beam x={x} y={150} top={54} bot={250} len={470} c={i ? "#FFF0C8" : "#E8DCB4"}
              o={i ? (0.20 + whyK * 0.16) : 0.13} z={26} f={f} />
          </React.Fragment>
        ))}
        {/* LEFT — the file you already have. Its HOW rows tick out one at a time
            and keep ticking: this is the scene's repeated moving object. */}
        <FileSlab x={288} y={430} w={230} h={306} z={62} f={f} name={R.other} pale mark={false}
          rules={RULES.slice(
            Math.max(0, Math.floor((f - 78) / 6)),
            Math.min(RULES.length, Math.max(0, Math.floor((f - 4) / 7))))} />
        <div style={{ position: "absolute", left: 288 - 46, top: 596, width: 92, zIndex: 66,
          textAlign: "center" }}>
          <span style={{ ...mono(21, 900), color: hexa(INK, 0.6), letterSpacing: 2 }}>HOW</span>
        </div>
        {/* RIGHT — the new one. ONE word, much bigger. */}
        <FileSlab x={W - 288} y={426} w={252} h={318} z={64} f={f} name={R.hero}
          big={whyK > 0.02 ? "WHY" : undefined} glowK={whyK} />
        {/* the caret blinking on the right slab — the one hot accent, always running */}
        {whyK > 0.4 && Math.floor(f / 9) % 2 === 0 && (
          <div style={{ position: "absolute", left: W - 288 + 74, top: 470, width: 15, height: 44,
            zIndex: 74, background: CARET, borderRadius: 3 }} />
        )}
        {/* the rules crossing the gap to the new file — five large arrivals
            landing between f100 and the cut, so the tail is the fullest part */}
        {RULES.map((_, i) => {
          const t0 = 74 + i * 7;
          const k = E(f, t0, t0 + 17, 0, 1, LIN);
          if (k <= 0.002 || k >= 0.999) return null;
          const x = 288 + (W - 288 - 288) * k;
          return (
            <div key={"rx" + i} style={{ position: "absolute", left: x - 58,
              top: 402 - Math.sin(k * Math.PI) * 138 + i * 12, width: 116, height: 46,
              zIndex: 72, borderRadius: 8, transform: `rotate(${(1 - k) * -16}deg)`,
              background: `linear-gradient(168deg, ${mxh(PAGE, 0.32)}, ${PAGE2})`,
              border: `3px solid ${hexa(PAGELINE, 0.9)}` }} />
          );
        })}
        <Crew f={f} x={W / 2} y={GY + 4} i={1} size={124} z={48} at={-14} tint={CLAY} />
        <StatusBar tone={1} f={f} ok={0} branch="main" />
        <Tag t="RULES vs REASON" k={E(f, 90, 102, 0, 1, OUT)} y={656} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S5 · THE REFUSAL.  20.12-25.76s (169f)
   VO: "But what's special about intent.md is instead of opening Claude Code and
        immediately telling it to build something, you first explain your idea."
   EVENT: it walks at the build lever holding the BLANK ORDER -> a bar drops and
   stops it -> it turns -> it sits at the table and the blank card goes face down.
   The walk goes from a HOT pool into a WARM one, which is the whole beat.
   ======================================================================== */
export const REFUSE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stop");
  const BAR = 36, TURN = 50, SIT = 112;
  const barY = E(f, BAR, BAR + 10, -160, 356, OUT);
  const approach = E(f, 0, BAR, 0, 1, LIN);
  const back = E(f, TURN, SIT, 0, 1, IO);
  const x = 250 + approach * 250 - back * 330;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.44}>
      <Cam x={Math.sin(f / 30) * 5} s={1 + E(f, 0, dur, 0, 0.065, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 5)} wallY={88} wallO={0.36} rake={0.18} rakeRate={3.4}
          railRate={1.6} dim={0.28} beltY={604} beltY2={130} beltRate={5.0} litK={0.74} litTop={0} litH={604} />
        <CrewSwarm f={f} n={14} dur={dur} from="r" y={GY - 40} rows={2} size={88}
          z={40} span={9} x0={430} x1={W - 70} seed={6} />
        {/* the bay mouth on the right, machinery still running behind it */}
        <Bay x={W - 190} label="BUILD" lit={f < BAR ? 0.7 : 0.16} f={f} c={CLAY} y={210} h={430} />
        {/* the build lever */}
        <div style={{ position: "absolute", left: W - 268, top: 470, width: 22, height: 150,
          zIndex: 56, borderRadius: 6, background: `linear-gradient(90deg, ${dkh(RAIL, 0.2)}, ${RAILHI})`,
          transform: `rotate(${f < BAR ? -12 : 6}deg)`, transformOrigin: "50% 100%" }} />
        {/* THE BAR that stops it */}
        {f >= BAR && (
          <div style={{ position: "absolute", left: W - 420, top: barY, width: 330, height: 26,
            zIndex: 84, borderRadius: 6,
            background: `repeating-linear-gradient(126deg, ${WARN} 0 22px, ${dkh(INK, 0.06)} 22px 44px)`,
            border: `3px solid ${dkh(WARN, 0.4)}` }} />
        )}
        {/* the table it goes to instead */}
        <div style={{ position: "absolute", left: 96, top: 596, width: 300, height: 26, zIndex: 54,
          borderRadius: 6, background: `linear-gradient(180deg, ${mxh(RAIL, 0.34)}, ${dkh(RAIL, 0.24)})` }} />
        <Beam x={246} y={150} top={40} bot={280} len={470} c="#FFDC9E" o={0.13 + back * 0.16} z={26} f={f} />
        {/* THE BLANK ORDER — the villain. Carried, then face down on the table. */}
        <div style={{ position: "absolute", left: x + (back > 0.9 ? -46 : 126), top: back > 0.9 ? 570 : 402,
          width: back > 0.9 ? 150 : 122, height: back > 0.9 ? 26 : 158, zIndex: 78,
          transform: `rotate(${back > 0.9 ? 4 : -8}deg)`, borderRadius: 8,
          background: `linear-gradient(168deg, ${mxh(PAGE, 0.4)}, ${PAGE2})`,
          border: `4px solid ${hexa(PAGELINE, 0.9)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          {back <= 0.9 && (
            <span style={{ ...mono(15, 900), color: hexa(INK, 0.3), letterSpacing: 1.4 }}>BLANK</span>
          )}
        </div>
        <Hero f={f} x={x} y={GY} size={224} z={72} flip={back > 0.1}
          costume={{ constr: 1 }} drive={back > 0 && back < 1 ? 1 : 0}
          shock={f >= BAR && f < TURN + 10 ? 1 : 0} act={1} />
        {/* the bay keeps running while he is refused — four arrivals, the last
            landing 12 frames before the cut */}
        {Array.from({ length: 4 }, (_, i) => {
          const t0 = 38 + i * 26;
          const k = E(f, t0, t0 + 26, 0, 1, IO);
          if (k <= 0.002) return null;
          const x = W + 90 - k * 300;
          return (
            <div key={"cr" + i} style={{ position: "absolute", left: x - 62, top: 372 + (i % 2) * 96,
              width: 124, height: 84, zIndex: 44, borderRadius: 9,
              transform: `rotate(${Math.sin(k * Math.PI) * 6}deg)`,
              background: `linear-gradient(168deg, ${mxh(SLAB3, 0.3)}, ${dkh(SLAB, 0.08)})`,
              border: `4px solid ${hexa(GOLD, 0.56)}` }} />
          );
        })}
        {/* the crowd on the rail behind, still working — the background process */}
        {Array.from({ length: 4 }, (_, i) => (
          <Crew key={"c" + i} f={f} x={430 + i * 130} y={GY - 46} i={i + 5} size={78} z={40} at={-14} />
        ))}
        <StatusBar tone={0.55} f={f} ok={0} branch="main" />
        <Tag t="EXPLAIN IT FIRST" k={E(f, 120, 132, 0, 1, OUT)} y={648} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S6 · THE INTERVIEW.  25.76-30.92s (155f)
   VO: "Then Claude interviews you, asking what you're building, who it's for,
        what constraints it has, and what success actually looks like."
   ⭐ FOUR ARRIVALS, one per clause, on the measured word onsets. The hero HOLDS
   STILL and the four cards carry every bit of the motion — the exact shape of
   `feedback_hierarchy_is_one_still_hero_and_one_repeated_object`.
   The four questions are the REAL ones: scope, users, constraints, success.
   ======================================================================== */
export const INTERVIEW: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("table");
  /* onsets measured off words_intent140.json: "building" / "who" / "constraints"
     / "success" — each card lands ON its own clause, never on a fixed rhythm */
  const AT = [12, 42, 70, 100];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.48}>
      <Cam x={Math.sin(f / 32) * 4} s={1 + E(f, 0, dur, 0, 0.065, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 6)} wallY={86} wallO={0.30} rake={0.13} rakeRate={2.6}
          railRate={1.0} dim={0.34} beltY={614} beltY2={110} beltRate={3.6} litK={0.70} litTop={0} litH={588} />
        <CrewSwarm f={f} n={12} dur={dur} from="both" y={GY + 8} rows={2} size={92}
          z={42} span={8} seed={7} tint={GOLD} />
        {/* the table lamp — one warm pool, everything else falling into the dark */}
        <Beam x={W / 2} y={120} top={40} bot={520} len={540} c="#FFDC9E" o={0.24} z={26} f={f} />
        <div style={{ position: "absolute", left: W / 2 - 250, top: 606, width: 500, height: 30,
          zIndex: 56, borderRadius: 7,
          background: `linear-gradient(180deg, ${mxh(RAIL, 0.36)}, ${dkh(RAIL, 0.22)})`,
          border: `3px solid ${hexa(RAILHI, 0.34)}` }} />
        {/* the blank card, still face down between them */}
        <div style={{ position: "absolute", left: W / 2 - 74, top: 580, width: 148, height: 24,
          zIndex: 60, borderRadius: 6, transform: "rotate(3deg)",
          background: `linear-gradient(168deg, ${mxh(PAGE, 0.36)}, ${PAGE2})`,
          border: `3px solid ${hexa(PAGELINE, 0.85)}` }} />
        {/* THE FOUR QUESTIONS — arrivals spread across the FULL duration */}
        {R.questions.map((q, i) => (
          <QCard key={"q" + i} x={i < 2 ? 246 : W - 246} y={i % 2 === 0 ? 216 : 356}
            t={q} k={E(f, AT[i], AT[i] + 14, 0, 1, BACK)} z={70 + i} w={332}
            c={[GOLD, TEAL, VIOLET, DIFFG][i]} />
        ))}
        {/* the interviewer holds STILL — a small ask-gesture only */}
        <Hero f={f} x={W / 2} y={GY - 4} size={236} z={74} costume={{ glasses: 1 }}
          gaze={Math.sin(f / 22) * 0.4} act={1} />
        <StatusBar tone={0.55} f={f} ok={0} branch="main" />
        <Tag t="FOUR QUESTIONS" k={E(f, 112, 124, 0, 1, OUT)} y={660} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S7 · THE PRESS.  30.92-33.46s (76f)
   VO: "And all of that gets saved into an intent.md file."
   ⭐ THE NUMBER SPINE LANDS. The four cards fold into the press, it comes down
   ONCE, hard, and lifts to reveal the five REAL field names raised on the face.
   ======================================================================== */
export const PRESS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("press");
  const DOWN = 15, UP = 30;
  const py = f < DOWN ? E(f, 0, DOWN, -300, 250, IN_Q)
    : f < UP ? 250 : E(f, UP, UP + 16, 250, -300, OUT);
  const stamped = f >= DOWN;
  const sq = stamped ? squash(f - DOWN, 0, 0.16, 3, 12) : 1;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.28}>
      <Cam x={Math.sin(f / 22) * 3}
        y={stamped ? Math.sin(f * 3.4) * 9 * Math.max(0, 1 - (f - DOWN) / 14) : 0}
        s={1 + E(f, 0, dur, 0, 0.070, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 7)} wallY={90} wallO={0.44} rake={0.14} rakeRate={3.0}
          railRate={1.2} dim={0.08} beltY={598} beltY2={124} beltRate={5.8} litK={0.98} litTop={0} litH={686} />
        <CrewSwarm f={f} n={12} dur={dur} from="both" y={GY + 6} rows={1} size={102}
          z={44} span={7} seed={8} tint={CLAY} />
        {/* the four cards folding in, before the press lands */}
        {!stamped && R.questions.map((q, i) => {
          const k = 1 - E(f, 2 + i * 3, 16, 0, 1, IN_Q);
          return (
            <div key={"fq" + i} style={{ position: "absolute", left: 190 + i * 172,
              top: 250 + (1 - k) * 190, width: 152, height: 60 * k + 8, zIndex: 58,
              opacity: k, borderRadius: 8,
              background: `linear-gradient(168deg, ${mxh(PAGE, 0.4)}, ${PAGE2})`,
              border: `3px solid ${hexa(GOLD, 0.7)}` }} />
          );
        })}
        {/* the press head */}
        <div style={{ position: "absolute", left: W / 2 - 250, top: py, width: 500, height: 176,
          zIndex: 88, borderRadius: 10,
          background: `linear-gradient(180deg, ${mxh(SLAB3, 0.3)}, ${dkh(SLAB, 0.1)})`,
          border: `6px solid ${hexa(RAILHI, 0.46)}` }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: -12, height: 14,
            background: hexa(RAILHI, 0.62), borderRadius: 4 }} />
        </div>
        <div style={{ position: "absolute", left: W / 2 - 8, top: 0, width: 16,
          height: Math.max(0, py), zIndex: 84, background: hexa(RAIL, 0.86) }} />
        {/* THE SLAB with its five REAL fields */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, zIndex: 68,
          transform: `scaleY(${sq}) scaleX(${2 - sq})`, transformOrigin: "50% 100%" }}>
          <FileSlab x={W / 2} y={470} w={330} h={368} z={68} f={f} name={R.hero}
            fields={R.fields} fieldsIn={stamped ? E(f, DOWN, DOWN + 22, 0, 1, OUT) : 0}
            glowK={stamped ? 1 : 0.2} />
        </div>
        {stamped && <Ring x={W / 2} y={640} f={f} at={DOWN} c={GOLD} />}
        {stamped && Array.from({ length: 4 }, (_, k) => (
          <Fall key={"dz" + k} x={W / 2 - 180 + k * 120} y={620} w={180} f={f} at={DOWN + k * 2}
            n={8} z={86} c="#F4EEDC" s={0.9} rate={1.5} />
        ))}
        <StatusBar tone={1} f={f} ok={0} branch="main" />
        <Tag t="YOUR ANSWERS ARE THE FILE" k={E(f, DOWN + 12, DOWN + 26, 0, 1, OUT)} y={666} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S8 · THE TURN.  33.46-35.26s (54f) — MOTIVATED MOVE 1/3
   VO: "But here's where it gets much more interesting."
   ONE reveal, nothing else. A shutter lifts and three more bays are behind it.
   ⛔ Density thins here deliberately — density is a SHAPE, not a level.
   ======================================================================== */
export const TURNPT: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("turn");
  const LIFT = 4;
  const sh = E(f, LIFT, LIFT + 26, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.18]} vig={0.40}>
      <Cam x={Math.sin(f / 20) * 3} y={-sh * 16} s={1.08 - sh * 0.08} z={12}>
        <Hall p={p} f={f} {...wl(v, 8)} wallY={92} wallO={0.34} rake={0.14} rakeRate={2.8}
          railRate={1.4} dim={0.30} beltK={0.5} beltY={606} beltY2={118} beltRate={2.6} litK={0.66} litTop={0} litH={566} />
        <CrewSwarm f={f} n={9} dur={dur} from="r" y={GY + 4} rows={1} size={98}
          z={44} span={7} seed={9} tint={TEAL} />
        {/* the three bays behind, rimmed as the shutter clears them */}
        {R.chain.slice(1).map((c, i) => (
          <Bay key={"by" + i} x={330 + i * 236} label={c} lit={sh * 0.22} f={f}
            y={244} h={392} c={[TEAL, VIOLET, DIFFG][i]} />
        ))}
        <FileSlab x={W / 2} y={470} w={252} h={330} z={64} f={f} name={R.hero}
          fields={R.fields} fieldsIn={1} glowK={1} o={0.5 + sh * 0.5} rot={-3} />
        {/* THE SHUTTER */}
        <div style={{ position: "absolute", left: -40, top: -20 - sh * 560, width: W + 80, height: 620,
          zIndex: 90,
          background: `repeating-linear-gradient(180deg, ${dkh(SLAB, 0.1)} 0 26px, ${dkh(SLAB, 0.32)} 26px 52px)`,
          borderBottom: `8px solid ${hexa(RAILHI, 0.5)}` }} />
        <StatusBar tone={0.55} f={f} ok={0} branch="main" />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S9 · THE CHAIN.  35.26-40.23s (149f)
   VO: "Claude can turn it into a full spec, then an implementation plan, and
        actually build and test the feature automatically."
   ⭐ THREE ARRIVALS on the measured onsets of "spec" / "plan" / "test". The
   camera is LOCKED — the travel is in the frame, not in the lens.
   ⛔ ARRIVALS, NOT TRAVEL: the lamp landing is the beat; the sliding between
   bays is not, so each land gets a snap, a ring and a stamp.
   ⛔ The rail does NOT close here. That is S11's payoff and spending it now
   would leave the peak with nothing to do (caught by the board's critic pass).
   ======================================================================== */
export const CHAIN: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("chain");
  const AT = [8, 44, 82];                      /* spec · plan · test */
  const BX = [176, 400, 624, 848];
  const stage = AT.filter((a) => f >= a).length;    /* 0..3 */
  const prog = stage === 0 ? 0 : Math.min(1, (f - AT[stage - 1]) / 18);
  const sx = BX[stage] * prog + BX[Math.max(0, stage - 1)] * (1 - prog);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.36}>
      <Cam x={Math.sin(f / 30) * 4} s={1 + E(f, 0, dur, 0, 0.065, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 9)} wallY={88} wallO={0.36} rake={0.16} rakeRate={3.2}
          railRate={2.0} dim={0.22} beltY={610} beltY2={128} beltRate={5.2} litK={0.88} litTop={0} litH={640} />
        <CrewSwarm f={f} n={16} dur={dur} from="both" y={GY + 4} rows={2} size={94}
          z={42} span={8} seed={10} tint={VIOLET} tint2={DIFFG} />
        {R.chain.map((c, i) => {
          const lit = i === 0 ? 1 : (f >= AT[i - 1] ? Math.min(1, (f - AT[i - 1]) / 8) : 0);
          const done = i === 3 && f >= AT[2] + 18 ? Math.min(1, (f - AT[2] - 18) / 10) : 0;
          return (
            <Bay key={"by" + i} x={BX[i]} label={c} lit={lit} f={f} y={226} h={412}
              w={200} c={[GOLD, TEAL, VIOLET, DIFFG][i]} done={done} />
          );
        })}
        {/* the slab travelling the bays — 236px tall, well over the 40px floor */}
        <FileSlab x={sx} y={452} w={268} h={356} z={72} f={f} name={R.chain[stage]}
          fields={stage === 0 ? R.fields : undefined} fieldsIn={1} glowK={1} mark={stage === 0}
          rot={prog < 1 && stage > 0 ? Math.sin(prog * Math.PI) * 5 : 0} />
        {stage > 0 && prog > 0.92 && <Ring x={sx} y={580} f={f} at={AT[stage - 1] + 16}
          c={[GOLD, TEAL, VIOLET, DIFFG][stage]} />}
        {/* a Claude walking it along, and two on the rail behind */}
        <Crew f={f} x={sx - 116} y={GY} i={1} size={104} z={60} at={-14} tint={CLAY} />
        {Array.from({ length: 3 }, (_, i) => (
          <Crew key={"c" + i} f={f} x={150 + i * 300} y={GY - 52} i={i + 4} size={74} z={38} at={-14} />
        ))}
        <StatusBar tone={1} f={f} ok={f >= AT[2] + 18 ? 1 : 0} branch="main" />
        <Tag t="ONE FILE, FOUR ARTIFACTS" k={E(f, 108, 120, 0, 1, OUT)} y={670} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S10 · THE FAR END.  40.23-42.40s (65f)
   VO: "But Anthropic's end goal goes even further."
   ⛔ THE ANTICIPATION DIP — deliberately the quietest frame in the reel (6.5)
   so the peak that follows lands harder. TWO cues, ONE thing happens: a lamp
   lights a long way off and the rail is seen running on past the last bay.
   ⛔ NOT DRAWN: any roadmap, date, or promise. `CLAIM_BANNED` blocks them.
   ======================================================================== */
export const FURTHER: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("far");
  const ON = 16;
  const k = E(f, ON, ON + 14, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.52}>
      <Cam x={Math.sin(f / 26) * 3} s={1 + E(f, 0, dur, 0, 0.060, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 10)} wallY={96} wallO={0.20} rake={0.10} rakeRate={2.4}
          railRate={1.1} dim={0.44} beltK={0.62} beltY={602} beltY2={116} beltRate={3.0} litK={0.52} litTop={0} litH={546} />
        {/* the last bay, near and dim; then the hall running on */}
        <Bay x={210} label="TEST" lit={0.20} f={f} y={250} h={392} c={DIFFG} />
        {/* ⭐ THE RECEDING BAYS LIGHT ONE AFTER ANOTHER, from the near one out to
            the far lamp — five arrivals spread across the whole 65 frames, so the
            beat is anticipation rather than a still frame. */}
        {Array.from({ length: 5 }, (_, i) => {
          const s = 1 - i * 0.16;
          const lk = E(f, 4 + i * 9, 4 + i * 9 + 6, 0, 1, OUT);
          return (
            <div key={"rc" + i} style={{ position: "absolute", left: 470 + i * 108,
              top: 300 + i * 40, width: 150 * s, height: 320 * s, zIndex: 24 - i,
              borderRadius: "12px 12px 0 0", opacity: 0.5 - i * 0.07 + lk * 0.4,
              background: lk > 0.02
                ? `linear-gradient(178deg, ${hexa(GOLD, 0.30 * lk)}, ${dkh(SLAB, 0.26)})`
                : `linear-gradient(178deg, ${dkh(SLAB, 0.04)}, ${dkh(SLAB, 0.3)})`,
              border: `3px solid ${hexa(lk > 0.4 ? GOLD : RAILHI, 0.16 + lk * 0.5)}` }} />
          );
        })}
        {/* ⭐ THE RAIL RUNNING ON — sleepers travelling away toward the far lamp.
            LARGE x BRIGHT x FAST is the only combination that registers, so these
            are 96px plates alternating with their own shadow, not hairlines. */}
        {Array.from({ length: 9 }, (_, i) => {
          /* t=0 far (at the lamp), t=1 near (bottom of frame) */
          const t = ((f * 0.011 + i / 9) % 1);
          const sc = 0.22 + t * t * 1.15;
          const x = 894 - t * 300, y = 404 + t * 300;
          return (
            <div key={"sl" + i} style={{ position: "absolute", left: x - 66 * sc, top: y - 11 * sc,
              width: 132 * sc, height: 22 * sc, zIndex: 26, borderRadius: 4,
              opacity: 0.26 + t * 0.66,
              background: `linear-gradient(180deg, ${hexa(RAILHI, 0.92)}, ${hexa(RAIL, 0.72)})` }} />
          );
        })}
        {/* ⭐ THE RAIL RUNNING ON — sleepers travelling away toward the far lamp.
            ⛔ 3.58 with HOLD 86% is not a dip, it is a hole: a dip should be the
            reel's LOWEST scene, not one where nothing repaints for two thirds of
            it. LARGE x BRIGHT x FAST is the only combination that registers, so
            these are 104px plates against their own shadow, never hairlines. */}
        {Array.from({ length: 9 }, (_, i) => {
          /* t=0 far (at the lamp), t=1 near (bottom of frame) */
          const t = ((f * 0.011 + i / 9) % 1);
          const sc = 0.22 + t * t * 1.15;
          const x = 894 - t * 300, y = 404 + t * 300;
          return (
            <div key={"sl" + i} style={{ position: "absolute", left: x - 66 * sc, top: y - 11 * sc,
              width: 132 * sc, height: 22 * sc, zIndex: 26, borderRadius: 4,
              opacity: 0.26 + t * 0.66,
              background: `linear-gradient(180deg, ${hexa(RAILHI, 0.92)}, ${hexa(RAIL, 0.72)})` }} />
          );
        })}
        {/* THE ONE THING THAT HAPPENS */}
        <div style={{ position: "absolute", left: 902, top: 386, width: 54, height: 54,
          borderRadius: "50%", zIndex: 70, opacity: k, transform: `scale(${0.5 + k * 0.5})`,
          background: `radial-gradient(circle at 34% 30%, ${mxh(GOLD, 0.5)}, ${dkh(GOLD, 0.3)})`,
          border: `4px solid ${dkh(GOLD, 0.44)}` }} />
        {k > 0.1 && (
          <div style={{ position: "absolute", left: 806, top: 400, width: 246, height: 300,
            zIndex: 30, opacity: k * 0.7,
            background: `linear-gradient(190deg, ${hexa(GOLD, 0.26)}, transparent 76%)`,
            clipPath: "polygon(40% 0%, 58% 0%, 100% 100%, 0% 100%)" }} />
        )}
        <Crew f={f} x={276} y={GY} i={3} size={112} z={54} at={-14} tint={CLAY} />
        <StatusBar tone={0.55} f={f} ok={0} branch="main" />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S11 · THE LOOP CLOSES.  42.40-48.75s (190f) — ⭐⭐ THE PEAK (10), MOVE 2/3
   VO: "Eventually, AI agents could monitor your app, detect an issue, create a
        new intent file, plan the fix, and start the entire process again
        autonomously."
   FIVE ARRIVALS on five measured clauses, spread across the FULL duration:
     1 the MONITOR MAST rises and sweeps
     2 a RED FAULT LAMP trips — the villain's last stand
     3 a NEW slab is CAST automatically; the table is EMPTY, nobody touches it
     4 it runs the bays and every lamp relights in sequence
     5 the rail CURVES BACK and the branch closes into a RING
   ⛔ THE PEAK MUST BEAT THE HOOK. It is the longest scene, has the most
   arrivals, and is the only place after S2 that earns red.
   ======================================================================== */
export const LOOP: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("loop");
  const MAST = 6, FAULT = 38, CAST = 68, RUN = 96, RING = 126;
  const fault = f >= FAULT && f < RING ? 1 : 0;
  const cast = E(f, CAST, CAST + 16, 0, 1, BACK);
  const ringK = E(f, RING, RING + 30, 0, 1, OUT);
  const BX = [172, 388, 604, 820];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.34}>
      <Cam x={Math.sin(f / 34) * 6 - ringK * 14 + (fault && f < FAULT + 12 ? Math.sin(f * 3.2) * 8 : 0)}
        y={-ringK * 8} s={1 + E(f, 0, dur, 0, 0.080, LIN)} rot={ringK * 0.5} z={12}>
        <Hall p={p} f={f} {...wl(v, 11)} wallY={86} wallO={0.42} rake={0.18} rakeRate={3.6}
          railRate={2.4} ring={ringK > 0.3} dim={0.16} beltY={606} beltY2={120} beltRate={6.0} litK={0.94} litTop={0} litH={664} />
        <CrewSwarm f={f} n={20} dur={dur} from="both" y={GY + 8} rows={2} size={98}
          z={46} span={8} seed={11} tint={DIFFG} tint2={GOLD} cheerAt={140} />
        {/* the four bays relighting in sequence — arrival 4 */}
        {R.chain.map((c, i) => {
          const t0 = RUN + i * 9;
          const lit = f >= t0 ? Math.min(1, (f - t0) / 7) : (ringK > 0 ? 0.3 : 0.14);
          return (
            <Bay key={"by" + i} x={BX[i]} label={c} lit={Math.max(lit, ringK * 0.7)} f={f}
              y={224} h={404} w={192} c={[GOLD, TEAL, VIOLET, DIFFG][i]}
              done={f >= t0 + 8 ? 1 : 0} />
          );
        })}
        {/* arrival 1+2: the mast, then the fault */}
        <Mast x={890} y={188} f={f} z={66} h={240} fault={fault}
          sweep={E(f, MAST, MAST + 16, 0, 1, OUT)} />
        {fault > 0 && (
          <div style={{ position: "absolute", left: 828, top: 150, width: 124, height: 44,
            zIndex: 86, borderRadius: 8, opacity: Math.floor(f / 5) % 2 ? 1 : 0.55,
            background: hexa(DIFFR, 0.94), border: `3px solid ${dkh(DIFFR, 0.4)}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(17, 900), color: "#FFF0EC", letterSpacing: 1.2 }}>ISSUE</span>
          </div>
        )}
        {/* arrival 3: a NEW slab cast with nobody at the table */}
        {cast > 0.02 && (
          <FileSlab x={172} y={452} w={256} h={340} z={74} f={f} name={R.hero}
            fields={R.fields} fieldsIn={cast} glowK={1}
            o={cast} rot={(1 - cast) * -8} />
        )}
        {cast > 0.5 && <Ring x={172} y={578} f={f} at={CAST + 14} c={GOLD} />}
        {/* arrival 5: THE RAIL CURVES BACK — the branch becomes a closed ring */}
        {ringK > 0.02 && (
          <svg style={{ position: "absolute", left: 0, top: 0, zIndex: 28, opacity: ringK }}
            width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            <path d={`M ${W - 60} ${GY} Q ${W + 40} ${GY - 200} ${W - 180} ${262}
                      L 230 262 Q 40 262 60 ${GY - 40} L 60 ${GY}`}
              fill="none" stroke={hexa(RAILHI, 0.72)} strokeWidth={11} strokeLinecap="round" />
            <path d={`M ${W - 60} ${GY} Q ${W + 40} ${GY - 200} ${W - 180} ${262}
                      L 230 262 Q 40 262 60 ${GY - 40} L 60 ${GY}`}
              fill="none" stroke={hexa(DIFFG, 0.5)} strokeWidth={4} strokeLinecap="round"
              strokeDasharray="26 30" strokeDashoffset={-f * 3.2} />
          </svg>
        )}
        {/* slabs running the closed ring, unattended */}
        {ringK > 0.15 && Array.from({ length: 11 }, (_, i) => {
          const t = ((f * 0.0125 + i / 11) % 1);
          const x = 40 + t * (W - 80), y = 258 + Math.sin(t * Math.PI) * 44;
          const lit = i % 3 === 0;
          return (
            <div key={"rs" + i} style={{ position: "absolute", left: x - 52, top: y - 62,
              width: 104, height: 124, zIndex: 46, borderRadius: 10, opacity: ringK,
              transform: `rotate(${Math.sin(t * 6.283) * 7}deg)`,
              background: lit
                ? `linear-gradient(168deg, ${mxh(GOLD, 0.34)}, ${dkh(GOLD, 0.26)})`
                : `linear-gradient(168deg, ${mxh(SLAB3, 0.3)}, ${dkh(SLAB, 0.1)})`,
              border: `5px solid ${hexa(lit ? GOLD : DIFFG, 0.7)}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(13, 900), color: hexa(lit ? INK : PAGE, 0.8) }}>
                {R.chain[i % R.chain.length]}
              </span>
            </div>
          );
        })}
        {/* the crowd stands BACK and watches — population grows, nobody exits */}
        {Array.from({ length: 7 }, (_, i) => (
          <Crew key={"c" + i} f={f} x={104 + i * 134} y={GY + 6} i={i} size={92} z={50}
            at={-14} flip={i > 3} tint={i % 3 === 0 ? CLAY : undefined}
            cheer={ringK > 0.5 ? 1 : 0} />
        ))}
        <StatusBar tone={1} f={f} ok={ringK > 0.5 ? 1 : 0} branch="main" />
        <Tag t="THE LOOP CLOSES" k={E(f, RING + 14, RING + 26, 0, 1, OUT)} y={664} c={DIFFG} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S12 · THE WHOLE WORKS.  48.75-53.61s (146f) — MOVE 3/3
   VO: "Basically, we're moving from an AI that writes code to AI that
        autonomously runs the entire software development process."
   The CONTRAST is the scene: one small bench on the left (what it used to be)
   against the lit ring filling the rest of the frame. Brightest frame after 0.
   ======================================================================== */
export const SHIFT: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("works");
  const out = E(f, 0, dur, 0, 1, IO);
  const BX = [258, 452, 646, 840];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.13]} vig={0.24}>
      <Cam x={Math.sin(f / 36) * 5} s={1.10 - out * 0.10} z={12}>
        <Hall p={p} f={f} {...wl(v, 12)} wallY={92} wallO={0.50} rake={0.13} rakeRate={3.0}
          railRate={2.2} ring dim={0.06} beltY={600} beltY2={126} beltRate={5.6} litK={1} litTop={0} litH={694} />
        <CrewSwarm f={f} n={18} dur={dur} from="both" y={GY + 10} rows={2} size={94}
          z={44} span={8} seed={12} tint={DIFFG} cheerAt={96} />
        {R.chain.map((c, i) => (
          <Bay key={"by" + i} x={BX[i]} label={c} lit={0.86} f={f} y={238} h={382} w={172}
            c={[GOLD, TEAL, VIOLET, DIFFG][i]} done={1} />
        ))}
        {/* the ring, still turning */}
        <svg style={{ position: "absolute", left: 0, top: 0, zIndex: 28 }} width={W} height={H}
          viewBox={`0 0 ${W} ${H}`}>
          <path d={`M ${W - 70} ${GY} Q ${W + 30} ${GY - 190} ${W - 190} 280 L 250 280
                    Q 50 280 70 ${GY - 40} L 70 ${GY}`}
            fill="none" stroke={hexa(RAILHI, 0.62)} strokeWidth={10} strokeLinecap="round" />
          <path d={`M ${W - 70} ${GY} Q ${W + 30} ${GY - 190} ${W - 190} 280 L 250 280
                    Q 50 280 70 ${GY - 40} L 70 ${GY}`}
            fill="none" stroke={hexa(DIFFG, 0.5)} strokeWidth={4} strokeDasharray="26 30"
            strokeDashoffset={-f * 3.4} strokeLinecap="round" />
        </svg>
        {Array.from({ length: 5 }, (_, i) => {
          const t = ((f * 0.0062 + i * 0.2) % 1);
          const x = 70 + t * (W - 140), y = 280 + Math.sin(t * Math.PI) * 26;
          return (
            <div key={"rs" + i} style={{ position: "absolute", left: x - 27, top: y - 34,
              width: 54, height: 68, zIndex: 46, borderRadius: 7,
              background: `linear-gradient(168deg, ${mxh(SLAB3, 0.3)}, ${dkh(SLAB, 0.1)})`,
              border: `3px solid ${hexa(GOLD, 0.6)}` }} />
          );
        })}
        {/* WHAT IT USED TO BE — one small bench, one body, in the corner */}
        <div style={{ position: "absolute", left: 66, top: 596, width: 154, height: 22, zIndex: 54,
          borderRadius: 5, background: hexa(RAIL, 0.8) }} />
        <Crew f={f} x={132} y={GY - 6} i={1} size={92} z={58} at={-14} tint={CLAY} />
        {/* and the crowd watching the rest of it run itself */}
        {Array.from({ length: 6 }, (_, i) => (
          <Crew key={"c" + i} f={f} x={330 + i * 122} y={GY + 8} i={i + 2} size={86} z={50}
            at={-14} flip={i > 2} cheer={f > 90 ? 1 : 0} />
        ))}
        <StatusBar tone={1} f={f} ok={1} branch="main" />
        <Tag t="NOT A BETTER TYPIST" k={E(f, 96, 110, 0, 1, OUT)} y={672} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S13 · NOT MORE CONTEXT.  53.61-59.06s (164f)
   VO: "So intent.md isn't really about giving Claude more context, it's more
        about giving AI agents what you're actually trying to accomplish."
   EVENT: a stack of pale CONTEXT slabs is pushed in from the left and slides
   straight PAST — it is not the answer. The dark slab stays, and its five field
   names are fully legible at full size for the first time.
   ⭐ This is the mute-readable frame of the reel's back half.
   ======================================================================== */
export const CLOSE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("close");
  const NP = 18;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.38}>
      <Cam x={Math.sin(f / 30) * 4} s={1 + E(f, 0, dur, 0, 0.065, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 13)} wallY={90} wallO={0.34} rake={0.16} rakeRate={3.0}
          railRate={1.9} ring dim={0.24} beltY={612} beltY2={114} beltRate={4.4} litK={0.84} litTop={0} litH={628} />
        <CrewSwarm f={f} n={14} dur={dur} from="both" y={GY + 6} rows={2} size={96}
          z={42} span={8} seed={13} tint={CLAY} />
        {/* the pale CONTEXT stack sliding past — arrivals across the FULL duration,
            and it is still sliding at the cut so the tail does not go still */}
        {Array.from({ length: NP }, (_, i) => {
          const t0 = 1 + i * 8;
          const k = E(f, t0, t0 + 34, 0, 1, LIN);
          if (k <= 0.001) return null;
          const x = -170 + k * (W + 340);
          return (
            <div key={"px" + i} style={{ position: "absolute", left: x - 66,
              top: 268 + (i % 3) * 132, width: 168, height: 122, zIndex: 40 + (i % 3),
              borderRadius: 8, opacity: 0.72,
              transform: `rotate(${(i % 2 ? 4 : -3)}deg)`,
              background: `linear-gradient(168deg, ${mxh(PAGE, 0.3)}, ${PAGE2})`,
              border: `3px solid ${hexa(PAGELINE, 0.85)}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(13, 800), color: hexa(INK, 0.4), letterSpacing: 1 }}>CONTEXT</span>
            </div>
          );
        })}
        {/* the hero, at full size, fully legible */}
        <FileSlab x={W / 2} y={412} w={396} h={444} z={76} f={f} name={R.hero}
          fields={R.fields} fieldsIn={1} glowK={1} />
        <Contact x={W / 2 - 198} y={640} w={396} z={70} o={0.4} />
        <Crew f={f} x={128} y={GY + 4} i={2} size={98} z={56} at={-14} tint={CLAY} />
        <Crew f={f} x={W - 128} y={GY + 4} i={5} size={98} z={56} at={-14} flip />
        <StatusBar tone={1} f={f} ok={1} branch="main" />
        <Tag t="WHAT YOU ARE TRYING TO DO" k={E(f, 110, 124, 0, 1, OUT)} y={694} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   S14 · THE CTA.  59.06-60.55s (45f)
   VO: "For the free setup guide, comment INTENT."
   ⛔ THE KEYWORD ONLY AT THE END, and a HARD CUT on it. Six letters stamp in,
   one per beat, then the mark. ⛔ Nothing on the tail — the reel ends in air.
   ======================================================================== */
export const CTA: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cta");
  const L = R.keyword.split("");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.42}>
      <Cam x={Math.sin(f / 20) * 3} s={1 + E(f, 0, dur, 0, 0.065, LIN)} z={12}>
        <Hall p={p} f={f} {...wl(v, 14)} wallY={94} wallO={0.30} rake={0.16} rakeRate={3.2}
          railRate={1.8} ring dim={0.30} beltY={604} beltY2={122} beltRate={4.8} litK={0.80} litTop={0} litH={614} />
        <CrewSwarm f={f} n={10} dur={dur} from="both" y={GY + 8} rows={1} size={100}
          z={44} span={6} seed={14} tint={GOLD} cheerAt={10} />
        <FileSlab x={W / 2} y={378} w={274} h={348} z={62} f={f} name={R.hero}
          fields={R.fields} fieldsIn={1} glowK={1} rot={-2} />
        {/* the six letters, one per measured beat */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 606, zIndex: 90,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          {L.map((ch, i) => {
            const k = E(f, 3 + i * 3, 3 + i * 3 + 7, 0, 1, BACK);
            return (
              <div key={"l" + i} style={{ width: 66, height: 78, borderRadius: 10, opacity: k,
                transform: `scale(${0.6 + k * 0.4})`,
                background: `linear-gradient(168deg, ${mxh(GOLD, 0.44)}, ${dkh(GOLD, 0.16)})`,
                border: `4px solid ${dkh(GOLD, 0.44)}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...ui(42, 900), color: "#2A1C06" }}>{ch}</span>
              </div>
            );
          })}
        </div>
        <Crew f={f} x={150} y={GY + 6} i={2} size={104} z={56} at={-14} tint={CLAY} cheer={1} />
        <Crew f={f} x={W - 150} y={GY + 6} i={6} size={104} z={56} at={-14} flip cheer={1} />
        <StatusBar tone={0.55} f={f} ok={1} branch="main" />
      </Cam>
    </Scene>
  );
};
