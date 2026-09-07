import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, rnd, dkh, mxh, lerpHex, mono, ui, SH,
  Scene, Cam, Mark, Rake, Crew, Hero, Fall, Ring, Puff, Contact, squash,
  asPlace, Hall, RepoWall, BranchRail, StatusBar, FileSlab, Bay, Mast, QCard,
  R, GY, SLAB, SLAB2, SLAB3, PAGE, PAGE2, PAGELINE, RAIL, RAILHI, CLAY, GOLD,
  DIFFG, DIFFR, OKGREEN, INK, MUTE, TEAL, BONE, SYN, SYN_MIX, CARET, WARN,
  R as R_,
} from "./IntWorld";
import type { Variant } from "./IntScenes";

/* ===========================================================================
   REEL 140 · "INTENT" — THE HOOKS.  Board: storyboards/140-intent.md §SCENE 0.

   ⛔⛔ THE OPEN IS PICKED ON MEASUREMENT, NOT AUTHORED AND DEFENDED.
   docs/THE-OPEN.md step 1: "The first build step of any reel is not scene 0.
   It is N concepts for scene 0." Reel 136 skipped this for four rounds and
   threw away four hooks. Three genuinely different MECHANISMS are built here at
   full quality, rendered as solo comps, and measured before one ships.

     outrank   a wall RE-RANKS      30 pale CLAUDE.md slabs tip back around one
                                    near-black intent.md slab that lands among them
     blank     a build with no
               brief FALLS          a tall stack goes up fast, a measure drops,
                                    it collapses and reveals the slab it never had
     pour      a file FILLS         commit dots stream off the wall into a dark
                                    slab that GROWS past the pale one beside it

   ⭐ THE LAWS EVERY ONE OF THEM IS BUILT TO
   1. FRAME 0 IS BRIGHT (mean luma >= 140) — and brightness is the MEAN while
      hierarchy is the SPREAD, so a LIT AMBER BOARD carries the mean and the
      near-black hero carries the spread. ⛔ Never dim the scene to make an
      overlay legible; make the overlay bigger.
      ⛔ And a WHITE board is the greedy version — it buys useless headroom by
      dropping saturation. The board here is lit AMBER (reel 136: 153.5 luma and
      27.9% saturation, against a white board's 162.2 and 17.2%).
   2. THE SUBJECT IS IN IT — a Claude is on screen at frame 0, every time.
   3. RECOGNITION, NOT MOTION — and per Alex's 2026-08-03 ruling the dreaded
      thing is a drawn OBJECT, not a UI screenshot.
   4. MUTE-READABLE — `intent.md` is set large enough to read at thumb distance.
   5. ⛔ A CUT IS NOT AN EVENT (reel 104). Each hook is ONE locked framing with a
      before state, a trigger, travel, and an arrival that costs something —
      not four posters in a row.
   6. ⛔ ONE STILL HERO AT 3-4x + ONE REPEATED OBJECT CARRYING ALL THE MOTION
      (`feedback_hierarchy_is_one_still_hero_and_one_repeated_object`). The
      motion never comes from the hero.
   7. ⛔ THE WINNERS' HOOKS ARE CROWDS and their population GROWS
      (`feedback_the_winners_hooks_are_crowds`). A cast of one is the default
      trap. Nobody walks off frame — an empty room cannot repaint.
   8. ⛔ EVERYTHING AT FRAME 0 IS SETTLED, NOT MERELY STARTED (reel 115): every
      pre-seeded element is pushed back far enough to have FINISHED its entrance,
      and the hero is drawn in FRONT of what it sits on, not behind it.
   ========================================================================= */

type HookProps = { v: Variant; dur: number; at?: number };
export type HookId = "outrank" | "blank" | "pour";

/* per-variant wall seed + row count — ⛔ an identical wall in all three cuts
   subtracts from the dHash separation it is sitting behind (reel 136 hit min 9
   against a bar of 10 exactly this way). */
const WALL: Record<Variant, { seed: number; rows: number }> = {
  house: { seed: 3, rows: 3 }, amber: { seed: 11, rows: 2 }, steel: { seed: 23, rows: 3 },
};
/** ⭐ the top-ranked dHash lever, varied per cut (docs/TRIAL-CUTS.md) */
export const PHASE: Record<Variant, number> = { house: 0, amber: 37, steel: 71 };


/* ===========================================================================
   HOOK A — "OUTRANK".  A WALL RE-RANKS.
   before:  30 identical pale CLAUDE.md slabs, all equal, all facing out
   trigger: the near-black intent.md slab lands among them
   travel:  the shock runs outward from centre
   arrival: every slab tips face-back in sequence and the hall re-ranks
   ======================================================================== */
export const OUTRANK_HOOK: React.FC<HookProps> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hook");
  const cols = 7, rows = 3, N = cols * rows;
  const CW = 145, CH = 122, X0 = W / 2 - (cols * CW) / 2, Y0 = 214;

  /* ⛔ SETTLED AT FRAME 0, NOT STARTED. The slab's fall finishes at f6, so it is
     seeded from f-10 and frame 0 catches it 10 frames in, at full size and fully
     readable, 26px above its seat. The thumbnail shows the object, not a blur. */
  const drop = E(f, -10, 5, -150, 0, OUT);
  const landed = f >= 5;
  const sq = landed ? squash(f - 5, 0, 0.14, 3, 12) : 1;
  /* the shock front, running outward from the centre column */
  const shock = E(f, 3, 80, 0, 4.6, LIN);

  const cells = Array.from({ length: N }, (_, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const cx = X0 + c * CW + CW / 2, cy = Y0 + r * CH + CH / 2;
    /* distance from centre in CELLS, so the wave is architectural not radial-blurry */
    const d = Math.hypot(c - (cols - 1) / 2, (r - (rows - 1) / 2) * 0.8);
    const tip = Math.max(0, Math.min(1, (shock - d) * 3.4));
    /* the card lets go once it has tipped, and falls out of frame. Staggered by
       its own distance, so cards are still travelling on the last frame. */
    const fall = Math.max(0, Math.min(1, (shock - d - 0.42) * 0.62));
    const a = rnd(i, 7) * Math.PI * 2;
    return { i, c, r, cx, cy, d, tip, fall,
      vx: Math.sin(a) * 240, vy: 340 + rnd(i, 3) * 300, spin: (i % 2 ? 1 : -1) * 210 };
  });
  const standing = cells.filter((q) => q.tip < 0.5).length;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.34}>
      <Cam x={Math.sin(f / 26) * 5} y={landed ? Math.sin(f * 2.6) * 6 * Math.max(0, 1 - (f - 6) / 14) : 0}
        s={1 + E(f, 0, dur, 0, 0.035, LIN)} z={12}>
        <Hall p={p} f={f} seed={WALL[v].seed} rows={WALL[v].rows} phase={PHASE[v]} wallY={214} wallO={0.30}
          rake={0.20} rakeRate={3.4} railRate={1.7} dim={0.10}
          litK={1} litTop={0} litH={700} />

        {/* ---- THE CROWD. ⛔ A cast of one is the default trap; the winners open
            on a crowd. Six Claudes along the branch, each on its own action loop,
            all of them FLINCHING when the slab lands. Nobody leaves frame. ---- */}
        {Array.from({ length: 6 }, (_, i) => {
          const x = 92 + i * 168;
          const fl = landed ? Math.max(0, 1 - (f - 5) / 14) : 0;
          return (
            <Crew key={"cw" + i} f={f} x={x} y={GY - 6 + fl * 8} i={i} size={104} z={46}
              at={-14} tint={i % 3 === 0 ? CLAY : undefined} flip={i > 2} />
          );
        })}

        {/* ---- WHAT EACH TIP UNCOVERS — arrivals staggered across the whole
            clip, and they accumulate rather than clearing ---- */}
        {cells.map((q) => {
          const on = Math.max(0, Math.min(1, (q.tip - 0.34) / 0.26));
          if (on <= 0.01) return null;
          return (
            <div key={"hw" + q.i} style={{ position: "absolute",
              left: q.cx - (CW - 7) / 2 + 8, top: q.cy - (CH - 9) / 2 + 8,
              width: CW - 23, height: CH - 25, zIndex: 34, opacity: on,
              transform: `scale(${on < 1 ? 0.72 + on * 0.28 : 1})`, borderRadius: 8,
              background: `linear-gradient(168deg, ${dkh(SLAB, 0.02)}, ${dkh(SLAB, 0.34)})`,
              border: `3px solid ${hexa(GOLD, 0.46)}`,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 4 }}>
              <span style={{ ...ui(28, 900), color: hexa(GOLD, 0.92), letterSpacing: 1 }}>HOW</span>
              <span style={{ ...mono(10, 800), color: hexa(PAGE, 0.5), letterSpacing: 1 }}>ONLY</span>
            </div>
          );
        })}
        {/* ---- THE WALL: 21 pale CLAUDE.md slabs, the repeated object that
            carries ALL the motion. The hero does not move; they do. ---- */}
        {cells.map((q) => {
          const t = q.tip, fl = q.fall;
          if (fl >= 1) return null;
          /* tipping AWAY on its bottom edge, then letting go of the rail */
          const rotX = t * 78 * (1 - fl);
          const dim = 1 - t * 0.62;
          return (
            <div key={"cm" + q.i} style={{ position: "absolute",
              left: q.cx - (CW - 7) / 2 + fl * q.vx,
              top: q.cy - (CH - 9) / 2 + t * 16 + fl * fl * q.vy * 2.4,
              width: CW - 7, height: CH - 9, zIndex: 60 + (q.i % 7),
              transform: `perspective(760px) rotateX(${-rotX}deg) rotate(${fl * q.spin}deg)`,
              transformOrigin: "50% 100%", opacity: 1 - t * 0.15 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 9,
                background: `linear-gradient(164deg, ${mxh(PAGE, 0.3 * dim)}, ${lerpHex(PAGE2, "#6E6656", t * 0.8)})`,
                border: `3px solid ${hexa(PAGELINE, 0.9)}`,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 7 }}>
                <span style={{ ...mono(16, 900), color: hexa(INK, 0.86 * dim), letterSpacing: 0.2 }}>
                  {R.other}
                </span>
                {Array.from({ length: 2 }, (_, k) => (
                  <div key={k} style={{ width: 74 - k * 20, height: 5, borderRadius: 2,
                    background: hexa(INK, 0.24 * dim) }} />
                ))}
              </div>
            </div>
          );
        })}

        {/* ---- THE HERO. ⛔ z ABOVE the wall — a load is carried in FRONT of the
            carrier (reel 115 shipped a pre-seeded stack hidden behind a sprite).
            3.4x a wall cell, dead centre, and it does not move after it lands. */}
        <div style={{ position: "absolute", left: 0, top: drop, right: 0, zIndex: 84,
          transform: `scaleY(${sq}) scaleX(${2 - sq})`, transformOrigin: "50% 100%" }}>
          <FileSlab x={W / 2} y={424} w={336} h={348} z={84} f={f} name={R.hero}
            fields={R.fields} fieldsIn={E(f, -24, 2, 0, 1, OUT)} glowK={landed ? 1 : 0.4} />
        </div>
        {landed && <Contact x={W / 2 - 152} y={604} w={304} z={80} o={0.42} />}
        {/* the dust the landing throws, hardest on the frames after impact */}
        {landed && Array.from({ length: 5 }, (_, k) => (
          <Fall key={"dz" + k} x={W / 2 - 200 + k * 100} y={600} w={190} f={f} at={5 + k * 2}
            n={8} z={82} c="#F0DEB6" s={0.9} rate={1.5} />
        ))}
        {landed && <Ring x={W / 2} y={600} f={f} at={5} c={GOLD} />}

        <StatusBar f={f} ok={0} branch="main" tone={1} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   HOOK B — "BLANK".  A BUILD WITH NO BRIEF FALLS.
   before:  a tall stack going up fast off a blank order card
   trigger: the measure bar drops across it
   travel:  it does not match — the stack tips
   arrival: it collapses and REVEALS the slab it was never given
   ⭐ the collapse must REVEAL, not just leave a hole (`cut-must-reveal`).
   ======================================================================== */
export const BLANK_HOOK: React.FC<HookProps> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("hook"), back: "#7E5A26", back2: "#D0A455" };
  const NB = 14;
  /* the stack is ALREADY tall at frame 0 — seeded from f-30 so the build has
     FINISHED, not started. Frame 0 is the finished wrong thing, which is the
     recognition. */
  const built = (i: number) => E(f, -30 + i * 2, -30 + i * 2 + 8, 0, 1, OUT);
  const MEAS = 16;                              /* the measure bar drops */
  const measY = E(f, MEAS, MEAS + 12, -180, 300, OUT);
  const FALL = 34;
  const fall = Math.max(0, (f - FALL) / 38);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.36}>
      <Cam x={Math.sin(f / 30) * 6} y={f >= FALL ? Math.sin(f * 2.9) * 9 * Math.max(0, 1 - (f - FALL) / 22) : 0}
        s={1 + E(f, 0, dur, 0, 0.04, LIN)} z={12}>
        <Hall p={p} f={f} seed={WALL[v].seed + 5} rows={WALL[v].rows} phase={PHASE[v]} wallY={218} wallO={0.15}
          rake={0.18} rakeRate={3.0} railRate={1.4} dim={0.12}
          litK={1} litTop={0} litH={700} />

        {/* the crowd watching it happen — population, and they flinch on the fall */}
        {Array.from({ length: 5 }, (_, i) => (
          <Crew key={"cw" + i} f={f} x={70 + i * 132} y={GY - 4} i={i + 1} size={100} z={46}
            at={-14} tint={i === 2 ? CLAY : undefined} />
        ))}

        {/* ---- THE STACK: 14 code slabs, the repeated object carrying motion ---- */}
        {Array.from({ length: NB }, (_, i) => {
          const on = built(i);
          if (on <= 0.01) return null;
          const bw = 268 - (i % 3) * 26;
          const bx = W / 2 + 128 + ((i % 2) ? -16 : 14);
          const by = 604 - i * 44;
          const a = rnd(i, 5) * Math.PI * 2;
          const fx = fall * fall * (120 + rnd(i, 3) * 300) * (i % 2 ? 1 : -1);
          const fy = fall * fall * 420 - fall * (90 + rnd(i, 7) * 60);
          return (
            <div key={"bk" + i} style={{ position: "absolute", left: bx - bw / 2 + fx,
              top: by + fy, width: bw, height: 42, zIndex: 50 + i,
              opacity: on * (1 - fall * 0.2),
              transform: `rotate(${fall * (i % 2 ? 190 : -160) + Math.sin(a) * 2}deg)`,
              borderRadius: 6,
              background: `linear-gradient(168deg, ${mxh(SLAB3, 0.26)}, ${dkh(SLAB, 0.06)})`,
              border: `3px solid ${hexa(RAILHI, 0.34)}`,
              display: "flex", alignItems: "center", gap: 5, paddingLeft: 10 }}>
              {Array.from({ length: 4 }, (_, t) => (
                <div key={t} style={{ height: 5, borderRadius: 2, width: 14 + rnd(i * 4 + t, 9) * 26,
                  background: hexa(SYN_MIX[(i + t) % SYN_MIX.length], 0.62) }} />
              ))}
            </div>
          );
        })}

        {/* ---- THE MEASURE that does not match ---- */}
        {f >= MEAS && (
          <div style={{ position: "absolute", left: W / 2 - 40, top: measY, width: 470, height: 12,
            zIndex: 88, background: `linear-gradient(90deg, ${DIFFR}, ${dkh(DIFFR, 0.3)})`,
            borderRadius: 4, boxShadow: SH }} />
        )}

        {/* ---- WHAT IT NEVER HAD, revealed by the collapse ---- */}
        {fall > 0.16 && (
          <FileSlab x={W / 2 + 150} y={430} w={300} h={370} z={40} f={f} name={R.hero}
            fields={R.fields} fieldsIn={Math.min(1, (fall - 0.16) * 2.4)}
            o={Math.min(1, (fall - 0.16) * 3)} glowK={1} />
        )}

        {/* ---- THE BLANK ORDER — the villain, held up, nothing on its back ---- */}
        <div style={{ position: "absolute", left: 62, top: 268, width: 196, height: 246, zIndex: 62,
          transform: `rotate(${-7 + Math.sin(f / 18) * 1.6}deg)`, borderRadius: 12,
          background: `linear-gradient(168deg, ${mxh(PAGE, 0.4)}, ${PAGE2})`,
          border: `5px solid ${hexa(PAGELINE, 0.9)}`, boxShadow: SH,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(21, 900), color: hexa(INK, 0.32), letterSpacing: 2 }}>NO BRIEF</span>
        </div>
        <Hero f={f} x={228} y={GY + 6} size={228} z={88} costume={{ constr: 1 }}
          stern={fall > 0.1 ? 1 : 0} shock={fall > 0.1 ? 1 : 0} act={1} />

        {fall > 0 && Array.from({ length: 5 }, (_, k) => (
          <Fall key={"dz" + k} x={W / 2 + 20 + k * 96} y={610} w={200} f={f} at={FALL + k * 3}
            n={9} z={86} c="#E8D6AE" s={0.95} rate={1.4} />
        ))}

        <StatusBar f={f} ok={0} branch="main" tone={1} />
      </Cam>
    </Scene>
  );
};

/* ===========================================================================
   HOOK C — "POUR".  A FILE FILLS AND OUTGROWS THE ONE BESIDE IT.
   before:  a pale CLAUDE.md slab, and a small empty dark one next to it
   trigger: commit dots start streaming off the wall into the dark one
   travel:  ~22 dots cross the frame, each landing on a field rib
   arrival: the dark slab GROWS past the pale one, field by field
   ======================================================================== */
export const POUR_HOOK: React.FC<HookProps> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("hook"), back: "#8E6A34", back2: "#E4BC70" };
  const NDOT = 13;
  /* ⛔ seeded from f-16 so frame 0 already has dots IN FLIGHT and the hero at a
     readable size — a counter caught mid-roll is the reel-115 defect. */
  /* ⛔ N DISCRETE POPS, NOT ONE LONG TWEEN. Five steps, one per real field. */
  const STEP = [-14, 8, 30, 52, 74];
  const stepK = STEP.map((t) => E(f, t, t + 7, 0, 1, BACK));
  const grow = 0.56 + 0.44 * (stepK.reduce((a, b) => a + b, 0) / STEP.length);
  const HH = 176 + grow * 268, HW = 150 + grow * 182;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.34}>
      <Cam x={Math.sin(f / 28) * 6} s={1 + E(f, 0, dur, 0, 0.04, LIN)} z={12}>
        <Hall p={p} f={f} seed={WALL[v].seed + 9} rows={WALL[v].rows} phase={PHASE[v]} wallY={216} wallO={0.15}
          rake={0.18} rakeRate={3.6} railRate={1.6} dim={0.10}
          litK={1} litTop={0} litH={700} />

        {Array.from({ length: 6 }, (_, i) => (
          <Crew key={"cw" + i} f={f} x={78 + i * 170} y={GY - 6} i={i + 2} size={100} z={46}
            at={-14} tint={i % 3 === 1 ? CLAY : undefined} flip={i > 3} />
        ))}

        {/* ---- THE PALE ONE. It is not merely outgrown, it is EMPTIED: its rules
            leave one at a time. Content arriving/leaving measures far better than
            decoration moving (ANIMATION-QUALITY §1). ---- */}
        <FileSlab x={232} y={472} w={190} h={252} z={54} f={f} name={R.other} pale
          rules={["run the tests", "use tabs", "never touch main"].slice(
            0, Math.max(0, 3 - Math.floor(Math.max(0, f - 10) / 22)))} mark={false} />
        {/* the rules crossing to the new file — large, fast, high-contrast */}
        {Array.from({ length: 3 }, (_, i) => {
          const t0 = 10 + i * 22;
          const k = E(f, t0, t0 + 18, 0, 1, LIN);
          if (k <= 0.002 || k >= 0.999) return null;
          const sx = 232, tx = W / 2 + 190;
          const x = sx + (tx - sx) * k, y = 500 - Math.sin(k * Math.PI) * 150;
          return (
            <div key={"rr" + i} style={{ position: "absolute", left: x - 62, top: y - 22,
              width: 124, height: 44, zIndex: 76, borderRadius: 7,
              transform: `rotate(${(1 - k) * -14}deg)`,
              background: `linear-gradient(168deg, ${mxh(PAGE, 0.34)}, ${PAGE2})`,
              border: `3px solid ${hexa(PAGELINE, 0.9)}` }} />
          );
        })}

        {/* ---- THE STREAM: 22 commit dots, the repeated object. ⛔ >= 40px on the
            short side or they vanish in the audit's 1012->240 downsample. ---- */}
        {Array.from({ length: NDOT }, (_, i) => {
          const t0 = -18 + i * 8.4;
          const k = E(f, t0, t0 + 20, 0, 1, LIN);
          if (k <= 0.002 || k >= 0.999) return null;
          const sx = 232, sy = 380 + (i % 5) * 46;
          const tx = W / 2 + 190, ty = 452;
          const x = sx + (tx - sx) * k, y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 168;
          const R2 = 118;
          return (
            <div key={"dt" + i} style={{ position: "absolute", left: x - R2 / 2, top: y - R2 / 2,
              width: R2, height: R2, borderRadius: 14, zIndex: 74,
              background: `linear-gradient(168deg, ${mxh(GOLD, 0.40)}, ${dkh(GOLD, 0.30)})`,
              border: `4px solid ${dkh(GOLD, 0.5)}`, opacity: 1 - k * 0.12,
              transform: `rotate(${(i % 2 ? 1 : -1) * k * 190}deg) scale(${0.8 + Math.sin(k * Math.PI) * 0.32})`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(13, 900), color: "#2A1C06", letterSpacing: 0.6 }}>COMMIT</span>
            </div>
          );
        })}

        {/* ---- THE HERO: it GROWS as they land ---- */}
        <FileSlab x={W / 2 + 190} y={452} w={HW} h={HH} z={82} f={f} name={R.hero}
          fields={R.fields} fieldsIn={stepK.filter((k) => k > 0.5).length / R.fields.length}
          glowK={grow} />
        <Contact x={W / 2 + 190 - HW / 2} y={472 + HH / 2 + 6} w={HW} z={78} o={0.4} />

        <StatusBar f={f} ok={0} branch="main" tone={1} />
      </Cam>
    </Scene>
  );
};




export const HOOKS: Record<HookId, React.FC<HookProps>> = {
  outrank: OUTRANK_HOOK,
  blank: BLANK_HOOK,
  pour: POUR_HOOK,
};

/** solo comps so each candidate can be rendered and MEASURED on its own,
    at full quality, in the real chassis — docs/THE-OPEN.md step 1. */
export const HookCut = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  return <C v="house" dur={82} at={0} />;
};
