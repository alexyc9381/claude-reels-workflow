import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Mark, MarkPlate, mono, ui, settle, STEP,
  R, PHASE, PLACES, asPlace, vivid, Rake, Ring, Puff, Pool, Steam, Sweat, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Room, antic, load,
  DRW, DRWD, DRWL, BLANK, BLANKD, COUNTERTOP, HALLSTEEL,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, EMBER, OXIDE, SLATE, COPPER,
} from "./LbyWorld";
import {
  PromptCard, Spike, Drawer, DrawerWall, Shutter, CounterTop, KeyCap, Console,
  Chute, ModeStrip, RouteBoard, Gate, SetupPlate, StockHatch, Tray, WritingDesk,
  PickRail, Stencil, ReceiptPlate, DocPane, TierRig, TierMark, DECK_GAP,
  DeckPress, DeckDraft, DeckDoor, Crucible, PourStream, Mould, ChordKeys,
  ApprovalStamp, StampBench,
} from "./LbyProps";

/* ===========================================================================
   REEL 130 · "LIBRARY" — THE SCENES.  Board: storyboards/130-library.md.

   ⛔⛔⛔ EVERY BEAT BELOW IS CUT TO A MEASURED WORD ONSET out of
   `words_130library.json`, scene-local, and the PICTURE LEADS THE VOICE BY ~4
   FRAMES ([[feedback_the_picture_leads_the_voice]]).

   ⛔⛔⛔ TWO DEFECTS THE FIRST CONTACT SHEET FOUND, BOTH INVISIBLE TO EVERY GATE
   (the reel measured a median of 11.75 with 1/12 failing at the time):

   1 · **THE SAME DRAWER WALL WAS IN EIGHT OF TWELVE SCENES.** Half the reel was
       one prop in a different room, which is reel 120's exact failure
       ([[feedback_one_prop_five_scenes]]) — no single scene was wrong enough to
       notice and the REPETITION was. The wall now appears in FIVE, and in two of
       those it is the subject rather than the backdrop: S1 (he throws at it),
       S9 (the peak), and small behind a window at S10/S11/the hook. Everywhere
       else the room's `weave` is `plain`, `tile` or `grid`, never `rank` —
       because `rank` is what makes a far wall read as more drawers.

   2 · **ONE SHOT TWELVE TIMES.** Measured hero width as a share of the 1012px
       panel: 21.1%-26.3%, a **5.1pp band**, against the 5.9pp that got reel 122
       rejected ([[feedback_one_shot_nineteen_times]]). The spread is now
       **14.8% (S6, the board dwarfs him) to 42.5% (S4, tight on a face)** — a
       27.7pp band — and the ground line moves with it. ⛔ A lever is a per-scene
       DECISION, never a LEVEL ([[feedback_a_uniform_fix_makes_one_shot]]).

   ⛔⛔ ARRIVALS SPAN THE FULL DURATION, and whatever crosses the cut is `LIN` or
   `IN` (ANIMATION-QUALITY §23 — an `IO`/`OUT` ease decelerates into its end
   whether or not that end is on screen).
   ⛔ NAME WHAT THE CLAUDE DOES. If the answer is "stands there while things
   happen around him" the scene is dead however the number reads (§12).
   ⛔ ROOT OWNS THE WORDS ([[feedback_the_header_already_said_it]]).
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

const GY = 706;

/** ⭐ THE SHOT LIST, IN ONE PLACE, SO IT CAN BE READ AS A LIST.
    `tools/frame_shot.py`'s lesson is that the band is only visible when the
    sizes are lined up; keeping them inline made a 5.1pp band look fine twelve
    times in a row. Values are hero width in px against a 1012px panel. */
export const SHOT = {
  REJECT: 200,  /* 19.8%  wide      — he is small against the wall he is losing to */
  SOURCE: 168,  /* 16.6%  WIDE      — the hatch and the hall are the subject */
  KEYS: 330,    /* 32.6%  medium-tight */
  SPIKE: 430,   /* 42.5%  TIGHT     — the pain beat, close enough to read a face */
  ROCKER: 300,  /* 29.6%  medium */
  PLAN: 150,    /* 14.8%  WIDEST    — the board has to dwarf him */
  PLATE: 268,   /* 26.5%  medium */
  SHIFTS: 212,  /* 20.9%  medium-wide */
  FLOOD: 190,   /* 18.8%  wide      — the wall dwarfs him, and that is the peak */
  COPY: 360,    /* 35.6%  TIGHT     — the card has to be readable */
  CTA: 300,     /* 29.6%  medium */
} as const;

/** per-cut camera. ⛔ `rot` is NOT applied by `Scene` (TILT_BANNED) — cuts are
    differentiated by dx/dy/scale, RAKE pitch and grade, never the horizon. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0, dy: 0, s: 1.0, rot: 0 },
  amber: { dx: -32, dy: 18, s: 1.066, rot: 0 },
  steel: { dx: 34, dy: -20, s: 0.958, rot: 0 },
};

/** ⭐⭐ PER-CUT **LAYOUT**, which `docs/TRIAL-CUTS.md` ranks second only to the
    rake pitch. With the pitch wired, mean distance went 14.9 -> 17.0 (bar 14)
    but the MINIMUM was still 7 against a bar of 10, and every weak pair was
    house/steel on a scene whose hero cluster sits in the same place in both. So
    the four weakest frames get their biggest prop MOVED per cut — not recoloured,
    not rescaled: moved, which is the only change a perceptual hash reads as a
    different composition rather than a different exposure.
    ⛔ Every offset below is inside the crop bound `left >= 506 - 486/(push x cam.s)`,
    which at the worst case here (push 1.062 x amber 1.066 = 1.132) is x 77..935. */
export const LAY: Record<Variant, { dx: number; dy: number }> = {
  house: { dx: 0, dy: 0 }, amber: { dx: -74, dy: -30 }, steel: { dx: 82, dy: 26 },
};
/** ⛔ NO `hue-rotate`/`saturate` — a permanently recoloured Claude is off-brand
    and that is exactly what a saturate pass does to the clay mascot. */
export const GRADE: Record<Variant, string> = {
  house: "none",
  amber: "brightness(1.045) contrast(1.035)",
  steel: "brightness(0.965) contrast(1.075)",
};
/** the rake PITCH differs per cut — a phase inside one pitch collapses to
    nothing under a perceptual hash; the pitch is what a dHash actually reads. */
const RK: Record<Variant, { n: number; rate: number }> = {
  house: { n: 6, rate: 2.1 }, amber: { n: 8, rate: 2.7 }, steel: { n: 5, rate: 1.7 },
};

/** ⭐ the reel's background process, so no scene is ever a still. ⛔ It is NOT
    the drawer wall — a background process is furniture and the wall is the
    subject. This is the overhead pick rail, which every room in the building
    would have. */
const Hall: React.FC<{ f: number; v: Variant; run?: number; y?: number; z?: number }> =
  ({ f, v, run = 1, y = 396, z = 30 }) => (
    <PickRail y={y} f={f} z={z} rate={5.4 * (v === "amber" ? 1.1 : v === "steel" ? 0.92 : 1)}
      pitch={190} run={run} />
  );

/* =========================================================================
   S1 · THE REJECTION — 1.90s · `hall` · SETUP · WIDE (hero 19.8%)
   VO: "And these aren't just some random prompts,"
   THE CLAUDE DOES: throws his own hand-written blanks at the wall, and they
   bounce off it.
   EVENT: before = a fistful of blanks · trigger = he throws · travel = four arcs
   across the full panel · arrival = each one KNOCKS a drawer and drops out of
   shot, and the drawer it hit snaps its tab into colour.
   ⭐ THIS IS ONE OF THE ONLY TWO SCENES WHERE THE WALL IS THE SUBJECT.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  /* ⭐⭐⭐ ONE OBJECT, ONE ACTION, FULL FRAME. See `ApprovalStamp` for why the
     three-deck version is gone. The VO is "these aren't just some random
     prompts, these are the exact rules Anthropic's engineers use" — a claim
     about AUTHORITY — and a stamp coming down is the most legible picture of
     authority there is. It needs no decoding at any size.
     ⛔ THE STAMP IS ALREADY FALLING WHEN WE CUT IN. Every scene I have opened
     with a wind-up has come back thin; the first strike lands at f6, and the
     scene is three strikes with an escalating rhythm — 6, 24, 40 — so the beat
     accelerates into the cut rather than fading out of it. */
  const HITS = [6, 24, 40];
  const drop = HITS.reduce((a, t) => Math.max(a,
    E(f, t - 14, t, 0, 1, IN_Q) - E(f, t + 4, t + 15, 0, 1, OUT)), 0);
  const hit = HITS.reduce((a, t) => f < t || f > t + 12 ? a
    : a + Math.sin((f - t) / 2.2) * Math.exp(-(f - t) / 4) * 1.0, 0);
  const marks = HITS.filter(t => f > t + 1).length;
  return (
    <Scene p={p} slug="THE STAMP" push={[0, dur + 14, 1.044]} vig={0.56}>
      <Room p={p} f={f} lit={0.9} occ="r" weave="plain" rake={0.22}
        rakeRate={RK[v].rate} rakeN={RK[v].n} horizonDy={-40} />
      <DrawerWall f={f} x={-118} y={70} w={1240} h={230} z={14} rows={3} cols={18}
        banks={[0.5, 0.44, 0.4, 0.36, 0.32]} showCounters={false} pan={-(f * 3.8)} />
      <Hall f={f} v={v} y={330} z={18} />

      {/* the work light the strike happens under */}
      <Pool x={506} y={GY - 40} w={980} c={SODIUM} o={0.6} z={22} />

      <StampBench x={168 + LAY[v].dx * 0.4} y={GY} w={740} z={40} hit={hit} />

      {/* ⭐ THE CARDS ON THE BENCH — each strike marks the next one, so the frame
             accumulates ([[feedback_motion_needs_a_destination]]: name what
             there is MORE of at the end. Three stamped cards, and they stay). */}
      {[0, 1, 2].map(i => (
        <div key={"cd" + i} style={{ position: "absolute", left: 300 + i * 176,
          top: GY - 112 - hit * 5, zIndex: 46,
          transform: `rotate(${-4 + i * 3}deg)` }}>
          <PromptCard x={62} y={158} s={0.46} z={46} ph={i + 1} ink={1}
            fill={i < marks ? 1 : 0.2} cat={R.catNames[i * 4 % R.catNames.length]}
            f={f} rich />
          {/* the mark it takes — a ring and a burst, struck into the face */}
          {i < marks && (
            <div style={{ position: "absolute", left: 16, top: 46, width: 92, height: 92,
              zIndex: 48, opacity: 0.9,
              transform: `scale(${E(f, HITS[i] + 1, HITS[i] + 6, 0.4, 1, BACK)}) rotate(-11deg)` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
                border: `9px solid ${hexa(PHASE[2].c, 0.86)}` }} />
              <div style={{ position: "absolute", left: 24, top: 40, width: 44, height: 10,
                borderRadius: 3, background: hexa(PHASE[2].c, 0.86) }} />
            </div>
          )}
        </div>
      ))}

      <ApprovalStamp x={352 + LAY[v].dx * 0.4} y={GY - 96} f={f} s={1.16} z={62}
        drop={drop} ink={Math.min(1, marks * 0.4)} />

      {/* each strike throws dust off the bench and rings a ring */}
      {HITS.map((t, i) => f > t && f < t + 20 && (
        <React.Fragment key={"fx" + i}>
          <Ring x={506} y={GY - 118} f={f} at={t} c="#F0DFB2" z={70} s={1.8} />
          <Puff x={430 + i * 60} y={GY - 96} f={f} at={t} c="#C6B79A" n={11} s={1.3} z={68} />
          <Puff x={640 - i * 50} y={GY - 96} f={f} at={t} c="#C6B79A" n={9} s={1.1} z={68} />
        </React.Fragment>
      ))}

      {/* ⭐ HE FLINCHES OFF EVERY STRIKE. The stamp is not his — it is the
             building's, and that is the point of the line. */}
      <Hero f={f} x={140} y={GY + 12} size={SHOT.REJECT} z={66} costume={{ constr: 1 }}
        act={1} ph={0.9} heat={0.4} gaze={0.7}
        shock={HITS.reduce((a, t) => a + E(f, t, t + 3, 0, 0.85, OUT)
          - E(f, t + 3, t + 13, 0, 0.85, IN_Q), 0)}
        drive={-hit * 0.16} />
      <Contact x={80} y={GY - 4} w={176} z={30} o={0.42} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE STOCK HATCH — 3.23s · `source` · SETUP · WIDEST-BUT-ONE (hero 16.6%)
   VO: "four rules Anthropic's own engineers use when working with Claude Code."
   THE CLAUDE DOES: takes four loaded trays off the hatch and swings them onto
   the rail overhead, one at a time.
   ⛔ NO DRAWER WALL. This is the BACK of the building — the hatch, the rail and
   the stock. Putting the wall here was the single biggest contributor to the
   "one prop, eight scenes" defect.
   ⭐ THE REEL'S BIGGEST RECEIPT IS SPENT HERE, not at the peak: the VO is
   describing what the library IS, so `52 PROMPTS · 15 CATEGORIES` seats here.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("source");
  /* ⭐⭐ THE NAMED SECOND. Alex: *"at 7 seconds it needs to be more interesting,
     it's too boring."* 7.00s = frame 210 = THIS scene at local f38
     ([[feedback_fix_the_named_second]]) — and f38 is the exact middle of the old
     version's dead stretch, where a document panel had finished wiping in and
     nothing else happened for a second and a half.
     ⛔ THE OLD EVENT was "a page scrolls past a green room", with TWO flat
     document panels in it — the single worst offender on the count that got this
     whole body flagged.
     ⭐ THE NEW EVENT: THE RULES ARE CAST. The VO is "the exact rules Anthropic's
     own engineers use", which is a claim about PROVENANCE, and the strongest
     picture of provenance is that the things are made here, by them, in metal. A
     bellied crucible tips on its trunnions at f14, an arc of molten brass runs
     into three moulds at f18/f30/f42, and the three plates come out glowing at
     f56/f64/f72 — which are the three rules the next six scenes are about.
     ⛔ AND NOT ONE RECTANGLE IN IT, which is the second half of the note. */
  /* ⛔ SOURCE DIED INTO ITS CUT at ratio 0.38. The third plate finished rising
     at f94 of a 97-frame scene, so the last eighth was a photograph — and an
     `OUT` ease decelerates into its end whether or not that end is on screen
     ([[ANIMATION-QUALITY §23]]). The last lift now STARTS later and runs 34
     frames on `LIN`, so it is still travelling as the cut lands. */
  const TIP = -16, POURS = [18, 30, 42], LIFTS = [56, 70, 84];
  /* ⭐⭐ 7s: *"needs to be better paced and way more interesting."* SOURCE is the
     longest scene in the reel at 97 frames and it was ONE locked shot for every
     one of them — the pour travels, but the camera never does anything, so 3.2s
     plays as a single held take. Pacing is CUTS: the same lever that took the
     hook from 14.15 to 16.07 motion.
       A  f0-34   wide, the ladle running the row
       B  f34-62  TIGHT 1.72x on the mould the metal is hitting
       C  f62-97  back out as the three plates come up
     ⛔ Picture only — the pour beats, the captions and the cue bank do not move
     ([[feedback_a_retime_moves_three_clocks]]). */
  const SHOTS = [
    { at: 0,  s: 1.00, fx: 506, fy: 396, dx: -22, dy: 0 },
    /* ⛔ 1.72x ON (610,470) HELD ONLY GLOWING SHAPES — no ladle, no body, nothing
       to tell you what was making the light. A tight shot still has to contain
       the CAUSE and the EFFECT: the lip the metal leaves and the mould it lands
       in. 1.42x, framed higher. */
    { at: 34, s: 1.42, fx: 596, fy: 386, dx: 48,  dy: 6 },
    { at: 62, s: 1.10, fx: 470, fy: 400, dx: -30, dy: 10 },
  ];
  const si = SHOTS.reduce((a2, sh, i) => (f >= sh.at ? i : a2), 0);
  const SH0 = SHOTS[si];
  const segEnd = si + 1 < SHOTS.length ? SHOTS[si + 1].at : 97;
  const st = Math.max(0, Math.min(1, (f - SH0.at) / Math.max(1, segEnd - SH0.at)));
  const shotX = 506 - SH0.fx + SH0.dx * st, shotY = 396 - SH0.fy + SH0.dy * st;
  const shotS = SH0.s * (1 + (si === 0 ? 0 : Math.exp(-(f - SH0.at) / 2.6) * 0.024));
  const tip = E(f, TIP, TIP + 10, 0, 1, IO) - E(f, 52, 62, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="THE POUR" push={[0, dur + 14, 1.050]} vig={0.62}>
      <div style={{ position: "absolute", inset: 0, transformOrigin: "506px 396px",
        transform: `scale(${shotS}) translate(${shotX}px, ${shotY}px)` }}>
      <Room p={p} f={f} lit={0.52} occ="l" weave="plain" rake={0.20}
        rakeRate={RK[v].rate * 0.9} rakeN={RK[v].n} horizonDy={30} />
      {/* the deck they are working on, and the rig running past both crops */}
      <TierRig f={f} at={0} lit={[1, 0.42, 0.28]} gy={GY} z={16} gap={520} />
      <Hall f={f} v={v} y={172} z={18} />

      {/* ⭐ THE THREE MOULDS — funnels, not crates. They fill in order, and each
          one's plate is one of the three rules, so the reel's structure is cast
          in front of you before it is climbed. */}
      {[0, 1, 2].map(i => (
        <Mould key={"md" + i} x={352 + i * 212 + LAY[v].dx * 0.3} y={GY - 6} s={1.02} z={40}
          ph={i + 1} f={f}
          fill={E(f, -10 + (v === "amber" ? 2 - i : i) * 21, -10 + (v === "amber" ? 2 - i : i) * 21 + 14, 0, 1, OUT)}
          lift={E(f, LIFTS[i], LIFTS[i] + (i === 2 ? 34 : 22), 0, 1, LIN)}
          cool={E(f, LIFTS[i] + 6, LIFTS[i] + 26, 0, 1, LIN)} />
      ))}

      {/* ⭐⭐ THE CRUCIBLE, TRAVELLING THE ROW AND TIPPING. It moves between
          pours, so the ladle is never parked — and the tip is a real rotation
          about real trunnions rather than a fade. */}
      {/* ⭐⭐ ONE CONTINUOUS TRAVELLING POUR. ⛔ Three separate 12-frame bursts
             left S2 at 6.10, the weakest scene in the reel, because between them
             the ladle parked and the frame had nothing crossing it — and a
             swinging chain was worth 0.02, which is what
             [[feedback_motion_needs_a_destination]] warns about: oscillation
             repaints pixels without going anywhere.
             ⭐ A real pour TRAVELS. The ladle runs the row from f16 to f50 with
             the metal running the whole way, and each mould fills as the stream
             crosses it — one bright object moving the full width of the panel
             for a third of the scene, which is a destination rather than a
             wobble, and it is also what a foundry actually looks like. */}
      {(() => {
        /* ⭐ WE JOIN THE POUR ALREADY RUNNING. Starting it at f16 meant the cut
           landed on a ladle that had not tipped yet — the same "empty set, then
           the event arrives" habit. T0 is negative, so on frame 1 the metal is
           already in the air and the first mould is already filling. */
        const T0 = -10, T1 = 52;
        /* ⛔⛔ dHASH MIN FELL TO 9 AND BOTH WEAK FRAMES (f185, f260) WERE IN
           THIS SCENE, house vs amber. My S2 barely used `LAY`, so two of the
           three cuts were near-identical here — exactly the duplicate risk
           [[docs/TRIAL-CUTS.md]] measured the old variant system at.
           ⭐ THE LEVER IS THE POUR'S DIRECTION. Amber runs the ladle right to
           left, which is a different frame at every timestamp rather than a
           different tint of the same one — and a foundry pours either way. */
        const rev = v === "amber";
        const trav = E(f, T0, T1, 0, 1, IO);
        const cx = 404 + (rev ? (1 - trav) : trav) * 2 * 212;
        const pouring = E(f, T0 - 3, T0 + 4, 0, 1, OUT) - E(f, T1 - 2, T1 + 7, 0, 1, IN_Q);
        return (<>
          <Crucible x={cx - 128} y={132} f={f} s={1.16} z={54} tip={tip} heat={1} />
          <PourStream x={cx} y={344} h={GY - 394} f={f} on={pouring} z={52} sway={7} />
        </>);
      })()}

      {/* ⭐ THE SPARKS RIDE THE STREAM. They were pinned to three fixed spots,
             which is wrong now the pour moves — and a spark that appears where
             the metal is not is the tell that the effect was authored rather
             than caused. */}
      {f > 16 && f < 56 && Array.from({ length: 16 }, (_, j) => {
        const sx = 404 + (v === "amber" ? 1 - E(f, -10, 52, 0, 1, IO) : E(f, -10, 52, 0, 1, IO)) * 2 * 212;
        const a2 = ((f * 1.9 + j * 5) % 26) / 26, sp = 0.5 + rnd(j, 30) * 1.0;
        return (
          <div key={"sk" + j} style={{ position: "absolute",
            left: sx + (j - 8) * 15 * sp * (0.3 + a2 * 2.2),
            top: GY - 150 - a2 * 250 * sp + a2 * a2 * 320,
            width: 9 - a2 * 6, height: 9 - a2 * 6, borderRadius: "50%", zIndex: 62,
            opacity: (1 - a2) * 0.95, background: j % 3 ? "#FFE9A8" : "#F5A623",
            boxShadow: `0 0 ${10}px ${hexa("#F5A623", 0.85)}` }} />
        );
      })}

      {/* ⭐ ANTHROPIC'S OWN CREW ARE THE ONES POURING — that is the whole claim.
          Two on the floor working the ladle, one up on the deck above. */}
      {[0, 1].map(i => (
        <Crew key={"cw" + i} f={f} x={96 + i * 108} y={GY - 4} i={i + 5} size={112} z={50}
          at={0} loop={i + 1}
          cheer={LIFTS.some(t => f > t && f < t + 12) ? 0.8 : 0} />
      ))}
      <Crew f={f} x={856} y={GY - 520 - 6} i={7} size={104} z={50} at={0} loop={3} />

      {/* ⭐ 7s: A SPINNING MARK OVER THE FURNACES. Alex asked for one in the empty
             band above the moulds, and he is right that it was empty — the top
             third of this shot held nothing but the ladle crossing it. It hangs
             from the gantry over the row, turning, and it is what the pour is
             being made UNDER: everything cast on this floor is Anthropic's. */}
      <div style={{ position: "absolute", left: 604, top: 18, width: 12, height: 92,
        zIndex: 44, background: dkh(STEEL, -0.36) }} />
      <div style={{ position: "absolute", left: 538, top: 104, width: 144, height: 144,
        zIndex: 46, borderRadius: 26,
        background: "linear-gradient(168deg, #FFFFFF 0%, #F2ECDE 100%)",
        border: `6px solid ${hexa("#000", 0.34)}`,
        boxShadow: `0 0 44px ${hexa("#F5A623", 0.38)}, ${SH_D}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 100, height: 100, objectFit: "contain",
            transform: `rotate(${f * 3.6}deg)` }} />
      </div>
      {/* the hot light of the pour catches its underside */}
      <div style={{ position: "absolute", left: 538, top: 104, width: 144, height: 144,
        zIndex: 47, borderRadius: 26,
        background: `linear-gradient(0deg, ${hexa("#F5A623", 0.36)} 0%, transparent 58%)` }} />

      {/* ⭐ THE MAKER'S PLATE, CAST AND BOLTED — the receipt, in the material of
          the scene rather than as a screenshot ([[feedback_real_is_for_real_things]]). */}
      {f > 60 && (
        <div style={{ position: "absolute", left: 92, top: 190, zIndex: 78,
          transform: `scale(${E(f, 62, 74, 0, 1, BACK)}) rotate(-2deg)`,
          transformOrigin: "0% 50%", opacity: E(f, 62, 70, 0, 1, OUT) }}>
          <MarkPlate x={0} y={0} t="ANTHROPIC" s={0.94} z={78} />
        </div>
      )}

      {/* he works the ladle — the pull is a body against a mass on a chain */}
      <Hero f={f} x={292} y={GY + 8} size={SHOT.SOURCE} z={68} costume={{ constr: 1 }}
        act={1} ph={0.6} reach={104} heat={0.62}
        drive={-antic(f, TIP - 9, TIP + 2) * 0.6}
        strain={Math.min(1, load(f, TIP - 9, TIP + 2) * 0.9
          + POURS.reduce((a, t) => a + load(f, t - 5, t + 4) * 0.4, 0))}
        gaze={E(f, 16, 26, 0, 0.9, OUT)}
        shock={LIFTS.reduce((a, t) => a + E(f, t, t + 4, 0, 0.4, OUT) - E(f, t + 4, t + 12, 0, 0.4, IN_Q), 0)} />
      <Contact x={228} y={GY - 4} w={210} z={30} o={0.44} />

      {/* ⛔⛔⛔ BODY_BLACK WENT 34.7 -> 36.8 AND LOOK-BLOCKED THE REEL. The pour is
          a 420px radial glow plus three mould glows, and it lifted the darkest
          decile of the whole body past the 35 limit. ⛔ The audit is explicit
          that the answer is NOT to dim the shading — that is the move that made
          the pale run.
          ⭐ THE ANSWER IS TO GIVE THE FRAME REAL BLACK: a foreground of cast
          moulds and pipework, cropped by the bottom edge, at #04060A. It is the
          `Occluder` the house has wanted since reel 94 — it adds a genuine void
          in FRONT of the action, so the glow reads hotter rather than flatter
          ([[feedback_push_the_two_values_apart]]: a dark field with bright
          detail feeds the mean AND the black point). */}
      {/* ⛔ AND IT WAS TOO HEAVY AT FIRST. Five 130px pipes across the full width
          sat straight over the three moulds — the black point passed and the
          thing the scene is ABOUT was behind a row of blobs. The moulds occupy
          352-520, 564-732 and 776-944, so the foreground now lives only in the
          gaps between them and the band is half as tall. */}
      <div style={{ position: "absolute", left: -60, top: GY - 54, width: 1140, height: 170,
        zIndex: 84, background: "#04060A",
        clipPath: "polygon(0 44%, 11% 26%, 22% 40%, 34% 24%, 47% 38%, 60% 26%, 73% 40%, 86% 27%, 100% 42%, 100% 100%, 0 100%)" }} />
      {[152, 530, 742, 958].map((px, i) => (
        <div key={"fp" + i} style={{ position: "absolute", left: px, top: GY - 118 + (i % 2) * 22,
          width: 52, height: 104, zIndex: 85, borderRadius: "44% 44% 5px 5px",
          background: "#04060A" }} />
      ))}
      </div>
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("console");
  /* ⭐⭐ RULE ONE, AT FULL FRAME. The first pass of this rebuild put all three
     decks in every shot; every machine came out ~180px tall and the result read
     as a technical cutaway of a warehouse. ⛔ THREE LEVELS IN ONE FRAME IS NOT
     HIERARCHY, IT IS CLUTTER. The rank is carried by the marker at the edge and
     by escalation between rules; the FRAME belongs to one machine doing one
     thing, big enough to read.
     ⭐ THE NEW EVENT: HE SEATS THE DIE. He carries the card he wrote by hand,
     drops it into the press's bed, and it seats. Old event: "cards fly past a
     console". Different name, so it is a redo ([[feedback_decluttering_is_not_redoing]]). */
  /* ⭐ THE CARD IS ALREADY IN HIS HANDS AND ALREADY MOVING when the cut lands,
     and the die is seated by f8 — the scene opens on work in progress, not on a
     man about to start. */
  const CARRY = E(f, -12, 6, 0, 1, IO);      /* he brings it across */
  const SEAT = E(f, 6, 12, 0, 1, IN_Q);      /* and it drops home */
  /* ⛔ KEYS WAS THE LAST SCENE OPENING THIN at 5.56, because the first stroke
     was at f20 and frames 1-6 held only a card drifting across. ⭐ THE PRESS IS
     ALREADY RUNNING WHEN WE JOIN IT — mid-stroke on the PREVIOUS die, with the
     chute already spitting, while he walks up with the new one. That is better
     staging than "man approaches idle machine" as well as a live frame 1: the
     rule is that the skill you already taught it keeps working while you teach
     it the next one. */
  const HITS = [-4, 20, 36, 50, 62];
  const hit = HITS.reduce((a, t) =>
    Math.max(a, Math.max(0, E(f, t, t + 4, 0, 1, IN_Q) - E(f, t + 4, t + 11, 0, 1, OUT))), 0);
  return (
    <Scene p={p} slug="THE PRESS" push={[0, dur + 14, 1.046]} vig={0.52}>
      <Room p={p} f={f} lit={1} occ="r" weave="tile" rake={0.24} rakeRate={RK[v].rate * 1.1}
        rakeN={RK[v].n} horizonDy={-70} />
      {/* the deck he is standing on, and the one above cropping the frame — the
          rig is still here, but as an EDGE rather than as the subject */}
      <TierRig f={f} at={0} lit={[1, 0.5, 0.3]} gy={GY} z={16} gap={520} />
      <Hall f={f} v={v} y={188} z={18} />

      {/* ⭐ THE PRESS, 1.5x AND FILLING THE PANEL. 372x300 at s=1.5 is 558x450 —
          over half the panel height, so the ram, the die bed and the lever are
          all legible at thumbnail size. */}
      <DeckPress x={368 + LAY[v].dx * 0.4} y={GY - 8} f={f} s={1.5} z={44}
        hit={hit} die={SEAT} out={E(f, 40, 71, 0, 0.8, LIN)} />

      {/* ⭐⭐ THE CARD HE WROTE BY HAND, TRAVELLING TO THE BED. A `PromptCard`
          with `rich` on, so the thing being turned into a die is visibly a
          prompt and not a blank ([[feedback_substitute_the_text_never_delete_it]]). */}
      {f < 16 && (
        <div style={{ position: "absolute", left: 118 + CARRY * 330, top: GY - 300 + SEAT * 168,
          zIndex: 70, transform: `rotate(${-12 + CARRY * 10 + SEAT * 4}deg) scale(${1 - SEAT * 0.24})`,
          filter: `drop-shadow(0 ${8}px ${14}px ${hexa("#000", 0.34)})` }}>
          <PromptCard x={78} y={206} s={0.6} z={70} ph={1} ink={1} fill={0.5}
            cat={R.catNames[0]} f={f} rich />
        </div>
      )}
      {f < 26 && <Ring x={470} y={GY - 128} f={f} at={12} c={PHASE[1].c} z={72} s={1.2} />}
      {f < 26 && <Puff x={470} y={GY - 120} f={f} at={12} c="#C2CBD2" n={8} z={71} s={1.0} />}

      {/* ⭐ EACH PULL THROWS A FINISHED CARD OUT OF THE CHUTE — the escalation is
          that they come FASTER: 12 frames apart, then 10. */}
      {HITS.map((t, i) => f > t + 2 && f < t + 30 && (
        <div key={"ej" + i} style={{ position: "absolute",
          left: 806 + E(f, t + 2, t + 22, 0, 190, OUT),
          top: GY - 262 + E(f, t + 2, t + 22, 0, 150, IN_Q),
          zIndex: 74, transform: `rotate(${E(f, t + 2, t + 26, -6, 46, LIN)}deg)`,
          opacity: 1 - E(f, t + 18, t + 28, 0, 1, LIN) }}>
          <PromptCard x={54} y={144} s={0.42} z={74} ph={i + 1} ink={1} fill={1}
            cat={R.catNames[(i * 3 + 2) % R.catNames.length]} f={f} rich />
        </div>
      ))}
      {HITS.map((t, i) => f > t && f < t + 14 && (
        <Ring key={"hr" + i} x={556} y={GY - 176} f={f} at={t} c="#F0DFB2" z={76} s={1.5} />
      ))}

      {/* ⭐ HE PULLS THE LEVER. `antic` coils him back before every stroke —
          three strokes, each one a body against a machine, never a state flip. */}
      <Hero f={f} x={148} y={GY + 10} size={SHOT.KEYS} z={68} costume={{ constr: 1 }}
        act={1} ph={0.4} reach={112} heat={0.44}
        drive={HITS.reduce((a, t) => a + antic(f, t - 9, t + 1) * 0.62, 0) - CARRY * 0.3}
        strain={Math.min(1, HITS.reduce((a, t) => a + load(f, t - 9, t + 1) * 0.7, 0))}
        gaze={E(f, 6, 16, 0, 0.8, OUT)} />
      <Contact x={82} y={GY - 4} w={196} z={30} o={0.44} />

      <TierMark at={0} on={1} x={58} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("console");
  /* ⭐⭐ RULE ONE, HALF TWO — THE COST OF NOT DOING IT. VO: "...of re-prompting it
     every single time."
     ⭐ THE EVENT IS A COMPARISON, IN ONE FRAME. On the left the press keeps
     stamping off the die he set in S3, one pull each. On the right another
     Claude is still writing the SAME card by hand, and his spike grows past the
     top of the crop. Nobody has to be told which is which; the two rates are
     visible side by side, which is the most hierarchical thing a single shot can
     do — it ranks two options by showing them.
     ⛔ SHOT.SPIKE is the tightest hero in the reel at 42.5%: this is the pain
     beat and it is close enough to read a face. */
  const PULLS = [-4, 12, 26, 40, 52];
  const WRITES = [2, 14, 26, 38, 50];
  const stamped = PULLS.filter(t => f > t + 2).length;
  const written = WRITES.filter(t => f > t + 4).length;
  const hit = PULLS.reduce((a2, t) => Math.max(a2, Math.max(0,
    E(f, t, t + 4, 0, 1, IN_Q) - E(f, t + 4, t + 11, 0, 1, OUT))), 0);
  return (
    <Scene p={p} slug="AGAIN" push={[0, dur + 14, 1.062]} vig={0.66}>
      <Room p={p} f={f} lit={0.86} occ="r" weave="tile" rake={0.24}
        rakeRate={RK[v].rate * 1.1} rakeN={RK[v].n} horizonDy={-50} />
      <TierRig f={f} at={0} lit={[1, 0.4, 0.3]} gy={GY} z={16} gap={560} />

      {/* LEFT — the press, still running on the die he set */}
      <DeckPress x={116 + LAY[v].dx * 0.3} y={GY - 8} f={f} s={0.96} z={44}
        hit={hit} die={1} out={Math.min(1, stamped / 5)} />

      {/* ⭐⭐ RIGHT — THE OTHER WAY. He writes one, spikes it, writes the same one
             again. The spike is the accumulator ([[feedback_motion_needs_a_destination]]:
             name what there is MORE of at the end) and it runs off the top. */}
      <WritingDesk x={606} y={GY} s={1.16} z={42} f={f}
        ink={Math.min(1, WRITES.reduce((a2, t) => a2 + Math.max(0,
          E(f, t, t + 5, 0, 1, IO) - E(f, t + 5, t + 11, 0, 1, IN_Q)), 0))} />
      <Spike x={824} y={GY - 84} f={f} n={written + 6} z={58} s={1.24} />

      {/* the identical cards going onto it — same phase, same everything */}
      {WRITES.map((t, i) => f > t + 3 && f < t + 15 && (
        <div key={"wc" + i} style={{ position: "absolute",
          left: 700 + E(f, t + 3, t + 13, 0, 118, IN_Q),
          top: GY - 190 - E(f, t + 3, t + 13, 0, 40, OUT) + i * 3,
          zIndex: 60, transform: `rotate(${E(f, t + 3, t + 15, -14, 6, LIN)}deg)` }}>
          <PromptCard x={44} y={116} s={0.34} z={60} ph={1} ink={0.9} fill={0.2}
            cat={R.catNames[0]} f={f} />
        </div>
      ))}

      {/* the two rates, as sound and dust rather than as a number */}
      {PULLS.map((t, i) => f > t && f < t + 12 && (
        <Ring key={"pr" + i} x={244} y={GY - 200} f={f} at={t} c="#F0DFB2" z={64} s={1.0} />
      ))}

      {/* ⭐ THE OTHER CLAUDE — head down, still going. He never looks up, which is
             the joke: the press beside him has been doing his job all scene. */}
      <Crew f={f} x={648} y={GY - 4} i={6} size={168} z={54} at={0} loop={1}
        cheer={0} />

      <Hero f={f} x={306} y={GY + 10} size={SHOT.SPIKE} z={66} costume={{ constr: 1 }}
        act={1} ph={0.4} reach={104} heat={0.44}
        drive={-PULLS.reduce((a2, t) => a2 + antic(f, t - 8, t + 1) * 0.5, 0)}
        strain={Math.min(1, PULLS.reduce((a2, t) => a2 + load(f, t - 8, t + 1) * 0.5, 0))}
        gaze={E(f, 20, 34, 0, 0.9, OUT)} />
      <Contact x={244} y={GY - 4} w={216} z={30} o={0.44} />
      <TierMark at={0} on={1} x={58} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("board");
  /* ⭐⭐ RULE TWO, HALF ONE — THE MODE SELECTOR. VO: "you want to use shift tab to
     activate plan mode and it..."
     ⛔ THE OLD VERSION CARRIED FOUR FLAT UI PROPS — more than any other scene in
     the reel, and it is the scene that once measured 4.62 and was the reel's only
     outright failure. It drew a keystroke and a coloured wash: a caption about a
     shortcut, not an event.
     ⭐ THE NEW EVENT: HE THROWS A REAL SELECTOR AND THE ROOM CHANGES STATE. A
     three-position lever with detents, hauled from BUILD past ACCEPT to PLAN, and
     the deck answers — the work lights die, the drafting lamp comes up, and the
     girder hoist that was swinging stops dead. Nothing may be built until the
     line is drawn, and the room going quiet is what says so.
     ⛔ THE DETENTS ARE THE POINT. `Shift+Tab` CYCLES the permission modes, which
     is the single thing people get wrong, so the lever passes THROUGH a position
     rather than flipping ([[library130-index]] rule 2). */
  /* ⭐⭐ THE CHORD DRIVES THE SELECTOR. Two strikes, two detents: BUILD -> ACCEPT
     on the first, ACCEPT -> PLAN on the second. The selector is now the READOUT
     and the keys are the CAUSE, which is the right way round — before this the
     scene showed the result of a chord it never depicted. */
  const STRIKES = [8, 30, 58];
  const pos = Math.min(2, STRIKES.slice(0, 2).reduce((a2, t) => a2 + E(f, t, t + 7, 0, 1, BACK), 0));
  const close = STRIKES.reduce((a2, t) => Math.max(a2,
    E(f, t - 16, t, 0, 1, IN_Q) - E(f, t + 5, t + 20, 0, 1, OUT)), 0);
  const flash = STRIKES.reduce((a2, t) => a2 + (f >= t && f < t + 9
    ? Math.exp(-(f - t) / 3.0) : 0), 0);
  const THROW = STRIKES[0];
  const detent = [0, 1, 2].map(k => Math.max(0, 1 - Math.abs(pos - k) * 3.4));
  const planOn = E(f, 30, 40, 0, 1, OUT);
  const dark = E(f, 32, 44, 0, 1, IN_Q);
  /* ⛔⛔ EVERY EVENT IN THIS SCENE FINISHED AT f22 OF 69, so it opened thin (4.72)
     AND died into its cut (ratio 0.39). A mechanism that completes early leaves
     two thirds of a scene as a photograph of the result.
     ⭐ THE TAIL HAS A DESTINATION: the moment PLAN latches, this deck starts
     DRAWING — the roll begins unspooling right here and runs straight into S6,
     which is literally the next scene's subject. ⛔ LIN, because it crosses the
     cut and an OUT ease would decelerate into it ([[ANIMATION-QUALITY §23]]). */
  /* ⛔ THE WALK WAS NOT ENOUGH (0.62). The roll and the lamp are thin objects,
     and the largest thing in the frame — the two key blocks — had gone still
     after the second strike. ⭐ A THIRD STRIKE AT f56 that lands ACROSS the cut,
     and this one does not advance the mode: it is the cycle wrapping, which is
     exactly the behaviour the docs warn about and the reason the reel says
     "press it until the bar says plan mode on". */
  const roll = E(f, 38, 100, 0, 1, LIN);
  /* ⛔ THE ROLL ALONE WAS NOT ENOUGH (ratio 0.51). A 54px sheet growing sideways
     repaints very little. ⭐ THE LAMP RIG TRACKS ACROSS WITH IT — the same
     travelling cone that fixed PLAN, started here so the two scenes are visibly
     one continuous action, and it is still moving at the cut. */
  const lamp = E(f, 36, 100, 0, 1, LIN);
  return (
    <Scene p={p} slug="SHIFT + TAB" push={[0, dur + 14, 1.044]} vig={0.54}>
      <Room p={p} f={f} lit={1 - dark * 0.42} occ="l" weave="plain" rake={0.22}
        rakeRate={RK[v].rate} rakeN={RK[v].n} />
      <TierRig f={f} at={0} lit={[1 - dark * 0.5, 0.4, 0.3]} gy={GY} z={16} gap={520} />

      {/* ⭐ THE WORK LIGHTS DYING, AND THE DRAFTING LAMP COMING UP. The room's
             state IS the readout ([[feedback_a_dimmer_on_a_dark_ground]]: put the
             state in the ROOM, never in the subject's own value). */}
      <Pool x={330} y={GY - 40} w={620} c={SODIUM} o={0.62 * (1 - dark)} z={22} />
      <Pool x={700} y={GY - 40} w={640} c={PHASE[2].c} o={0.52 * planOn} z={22} />
      <div style={{ position: "absolute", left: 560, top: 116, width: 300, height: 62,
        zIndex: 30, borderRadius: "46% 46% 8px 8px", opacity: 0.25 + planOn * 0.75,
        background: `linear-gradient(180deg, #EAFBF4 0%, ${mxh(PHASE[2].c, 0.5)} 54%, ${dkh(PHASE[2].c, -0.3)} 100%)`,
        border: `4px solid ${hexa("#000", 0.34)}` }} />
      <div style={{ position: "absolute", left: 476, top: 176, width: 468, height: 520,
        zIndex: 21, opacity: planOn,
        background: `linear-gradient(180deg, ${hexa(PHASE[2].c, 0.34)} 0%, ${hexa(PHASE[2].c, 0.06)} 100%)`,
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }} />

      {/* ⭐ THE TWO KEYS, BIG AND CENTRE FRAME */}
      <ChordKeys x={196 + LAY[v].dx * 0.4} y={GY - 250} f={f} s={1.06} z={58}
        close={close} flash={Math.min(1, flash)} />
      {STRIKES.map((t, i) => f > t && f < t + 18 && (
        <React.Fragment key={"sk" + i}>
          <Ring x={534} y={GY - 330} f={f} at={t} c="#F0DFB2" z={72} s={1.7} />
          <Puff x={534} y={GY - 316} f={f} at={t} c="#B9C6D0" n={12} s={1.3} z={70} />
        </React.Fragment>
      ))}

      {/* ⛔⛔ THE QUADRANT VERSION READ AS A CLOCK. A 240px disc with a needle on
             it is a gauge, and the three detents were drawn INSIDE the dark face
             where nothing could see them. A selector is legible when the TRAVEL
             is visible, so it is a straight slotted track: three stops you can
             count, and a handle that is plainly between them or on one.
             ⭐ This also makes the CYCLE readable — the handle passes THROUGH the
             middle stop, which is the thing about Shift+Tab people get wrong. */}
      {(() => {
        const TX = 300 + LAY[v].dx * 0.4, TY = GY - 96, TW = 430;
        return (
          <div style={{ position: "absolute", left: TX, top: TY, width: TW, height: 210, zIndex: 52 }}>
            {/* the cast body and the slot cut through it */}
            <div style={{ position: "absolute", left: 0, top: 44, width: TW, height: 96,
              borderRadius: 12,
              background: `linear-gradient(180deg, #46525C 0%, #222A31 46%, #0C1116 100%)`,
              border: `6px solid ${hexa("#000", 0.54)}` }} />
            <div style={{ position: "absolute", left: 34, top: 74, width: TW - 68, height: 34,
              borderRadius: 17, background: "#05080B",
              boxShadow: `inset 0 4px 8px ${hexa("#000", 0.8)}` }} />
            {/* ⭐ THREE STOPS. The live one lights; PLAN is the only coloured one. */}
            {[0, 1, 2].map(k => {
              const cx = 60 + k * (TW - 120) / 2;
              const on = detent[k];
              const c = k === 2 ? PHASE[2].c : "#C6D2DC";
              return (
                <React.Fragment key={"st" + k}>
                  {/* ⛔ AN INACTIVE STOP AT 0.28 OPACITY ON A DARK GROUND IS NOT
                      THERE. The whole point of a three-position selector is that
                      you can COUNT the positions, so every stop keeps a bright
                      cast outline and only the FILL lights. */}
                  <div style={{ position: "absolute", left: cx - 26, top: 8, width: 52, height: 36,
                    borderRadius: 6, background: on > 0.25 ? (k === 2 ? PHASE[2].c : "#D8E2EA") : "#141A20",
                    border: `4px solid ${on > 0.25 ? hexa("#000", 0.5) : "#8C9AA6"}`,
                    boxShadow: on > 0.4 ? `0 0 ${24 * on}px ${hexa(c, 0.9)}` : "none" }} />
                  <div style={{ position: "absolute", left: cx - 5, top: 42, width: 10, height: 30,
                    background: dkh(STEEL, -0.44), opacity: 0.5 + on * 0.5 }} />
                  {/* the notch the handle drops into */}
                  <div style={{ position: "absolute", left: cx - 13, top: 108, width: 26, height: 16,
                    borderRadius: "0 0 6px 6px", background: "#05080B" }} />
                </React.Fragment>
              );
            })}
            {/* ⭐ THE HANDLE — a real lever with a ball grip, travelling the slot */}
            {(() => {
              const hx = 60 + pos * (TW - 120) / 2;
              return (
                <div style={{ position: "absolute", left: hx - 13, top: -46, width: 26, height: 168,
                  transformOrigin: "50% 88%",
                  transform: `rotate(${(pos - 1) * 13}deg)` }}>
                  <div style={{ position: "absolute", left: 4, top: 44, width: 18, height: 124,
                    borderRadius: 9,
                    background: `linear-gradient(90deg, ${dkh(STEEL, -0.54)} 0%, ${mxh(STEEL, 0.42)} 46%, ${dkh(STEEL, -0.56)} 100%)` }} />
                  <div style={{ position: "absolute", left: -13, top: 0, width: 52, height: 52,
                    borderRadius: "50%",
                    background: `radial-gradient(60% 60% at 32% 28%, ${mxh(EMBER, 0.55)} 0%, ${dkh(EMBER, -0.46)} 100%)`,
                    border: `4px solid ${hexa("#000", 0.52)}` }} />
                </div>
              );
            })()}
          </div>
        );
      })()}

      {/* ⭐ THE HOIST STOPS. It swings while the lever is in build, and the moment
             plan latches it hangs dead still — the consequence of the mode. */}
      {(() => {
        const sway = (1 - planOn) * Math.sin(f / 7.5) * 16;
        return (<>
          <div style={{ position: "absolute", left: 742, top: 150, width: 9,
            height: 214, zIndex: 44, transformOrigin: "50% 0%",
            transform: `rotate(${sway}deg)`, background: dkh(STEEL, -0.32) }} />
          <div style={{ position: "absolute", left: 664 + sway * 3.4, top: 356, width: 168,
            height: 34, zIndex: 45, borderRadius: 4,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)} 0%, ${dkh(STEEL, -0.46)} 100%)`,
            border: `3px solid ${hexa("#000", 0.44)}`, transform: `rotate(${sway * 0.4}deg)` }} />
        </>);
      })()}
      {f > 18 && f < 40 && <Ring x={766} y={GY - 200} f={f} at={20} c={PHASE[2].c} z={70} s={1.5} />}

      {/* ⛔ THE CHORD MADE THE BODY OF THE SCENE SO STRONG (motion 6.28 -> 9.62)
          that the tail died by comparison — ratio 0.48. The strikes are at f8 and
          f30 of 69, and a third press is not available because the cycle would
          leave PLAN, which would contradict the line.
          ⭐ SO THE CONSEQUENCE ESCALATES INSTEAD: the first girders start landing
          on the drawn line HERE, in the tail, which is S6's subject beginning
          inside S5. The two scenes read as one continuous action and the tail has
          somewhere to go. */}
      {/* ⛔ 0.48 -> 0.62, STILL UNDER 0.70 — because the chord made the BODY so
          strong that the bar moved with it. The last girder was landing at f68 of
          69, so its drop was over before the cut rather than across it. Retimed
          so the final one is still IN THE AIR when we leave. */}
      {[40, 52, 63].map((t, i) => f > t && (
        <React.Fragment key={"gd" + i}>
          <div style={{ position: "absolute", left: 250 + i * 176,
            top: GY - 176 - Math.max(0, 1 - (f - t) / 9) * 210,
            width: 164, height: 34, zIndex: 56, opacity: Math.min(1, (f - t) / 4),
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, -0.42)} 100%)`,
            border: `3px solid ${hexa("#000", 0.44)}`,
            transform: `rotate(${Math.max(0, 1 - (f - t) / 9) * 13 - 1.6}deg)` }} />
          {f < t + 16 && <Ring x={332 + i * 176} y={GY - 168} f={f} at={t} c="#DCEFE7" z={58} s={1.1} />}
          {f < t + 16 && <Puff x={332 + i * 176} y={GY - 152} f={f} at={t} c="#B8C8C2" n={9} s={1.0} z={57} />}
        </React.Fragment>
      ))}

      {roll > 0.01 && (<>
        <div style={{ position: "absolute", left: 108 + lamp * 660, top: 108, width: 20,
          height: 104, zIndex: 30, background: dkh(STEEL, -0.4) }} />
        <div style={{ position: "absolute", left: 20 + lamp * 660, top: 200, width: 196,
          height: 62, zIndex: 31, borderRadius: "48% 48% 9px 9px",
          background: `linear-gradient(180deg, #F2FBF6 0%, ${mxh(PHASE[2].c, 0.5)} 56%, ${dkh(PHASE[2].c, -0.28)} 100%)`,
          border: `5px solid ${hexa("#000", 0.34)}` }} />
        <div style={{ position: "absolute", left: -110 + lamp * 660, top: 258, width: 436,
          height: GY - 258, zIndex: 24,
          background: `linear-gradient(180deg, ${hexa(PHASE[2].c, 0.40)} 0%, ${hexa(PHASE[2].c, 0.08)} 100%)`,
          clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)" }} />
      </>)}

      {/* ⭐ THE ROLL STARTS UNSPOOLING THE INSTANT PLAN LATCHES — the drum turns,
             the sheet runs out across the deck, and both are still moving at the
             cut. This is S6 beginning inside S5. */}
      {roll > 0.01 && (<>
        <div style={{ position: "absolute", left: 128, top: GY - 168, width: 92, height: 92,
          borderRadius: "50%", zIndex: 54, transform: `rotate(${roll * 640}deg)`,
          background: `radial-gradient(62% 62% at 34% 30%, #F6F0DE 0%, #C6BB9C 58%, #8C8270 100%)`,
          border: `5px solid ${hexa("#000", 0.4)}` }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: 42, top: 6, width: 8, height: 40,
              background: hexa("#7A7259", 0.6), transformOrigin: "50% 40px",
              transform: `rotate(${i * 60}deg)` }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 214, top: GY - 146, width: roll * 690,
          height: 54, zIndex: 53, background: "#F2ECD8", transform: "rotate(-1.6deg)",
          transformOrigin: "0% 50%", border: `3px solid ${hexa("#000", 0.22)}`,
          borderLeft: "none" }}>
          <div style={{ position: "absolute", left: 8, top: 24, right: 8, height: 4,
            background: hexa(PHASE[2].c, 0.75) }} />
          {[0, 1, 2, 3, 4].map(i => (roll * 690 > 60 + i * 132) && (
            <div key={"nd" + i} style={{ position: "absolute", left: 46 + i * 132, top: 16,
              width: 20, height: 20, borderRadius: "50%", background: PHASE[i].c,
              border: `3px solid ${hexa("#000", 0.3)}` }} />
          ))}
        </div>
      </>)}

      {/* ⭐ HE HAULS IT. A three-position lever is a body movement, not a keypress. */}
      <Hero f={f} x={252 + E(f, 40, 100, 0, 236, LIN)} y={GY + 10} size={SHOT.ROCKER} z={64} costume={{ constr: 1 }}
        act={1} ph={0.4} reach={118} heat={0.4}
        drive={-STRIKES.reduce((a2, t) => a2 + Math.max(0, antic(f, t - 12, t)) * 0.6, 0)}
        strain={Math.min(1, STRIKES.reduce((a2, t) => a2 + load(f, t - 12, t) * 0.8, 0))}
        gaze={E(f, 30, 42, 0, 0.9, OUT)}
        /* ⛔ THE CHORD FINISHES AT f37 OF 69 and he stopped with it (ratio 0.59).
           He walks the line as it draws, so the largest warm mass in frame is
           still travelling at the cut. ⛔ LIN — it crosses. */
        lift={E(f, 40, 100, 0, 20, LIN)}
        shock={STRIKES.reduce((a2, t) => a2 + E(f, t, t + 4, 0, 0.6, OUT) - E(f, t + 4, t + 16, 0, 0.6, IN_Q), 0)}
        /* ⛔ AND THE BODY STOPPED AT f22 TOO. Fixing the ROOM's tail while the
           actor stands still just moves the deadness onto him. He walks the
           line as it draws, so the largest warm object in the frame is still
           travelling at the cut. ⛔ LIN — it crosses. */
        lift={E(f, 30, 96, 0, 22, LIN)} />
      <Contact x={192 + E(f, 40, 100, 0, 236, LIN)} y={GY - 4} w={200} z={30} o={0.44} />
      <TierMark at={1} on={planOn} x={58} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("board");
  /* ⭐⭐ RULE TWO, HALF TWO — THE LINE IS DRAWN BEFORE ANYTHING IS BUILT.
     VO: "...maps out your entire project before writing a single line of code."
     ⛔ THE OLD VERSION WAS A ROUTE BOARD: a big flat diagram he stood next to.
     A diagram of a plan is not a plan happening.
     ⭐ THE NEW EVENT: a roll unrolls the full width of the deck, and girders drop
     onto it ONE AT A TIME — and each girder may only land where the line has
     already reached. The rule is enforced in the geometry rather than asserted
     (`DeckDraft` returns null for any girder ahead of `drawn`), so the picture
     cannot contradict the line even if I retime it.
     ⭐ SHOT.PLAN is the widest hero in the reel at 14.8%: the work has to dwarf
     him, because the point is the size of what gets mapped before a keystroke. */
  /* ⛔⛔ IT MEASURED 5.14 AND WAS THE REEL'S ONLY FAILURE. Four girders across 84
     frames, the line finished at f52, the last landing at f64 — sparse in the
     middle and dead for the final twenty frames (pre-cut ratio 0.36).
     ⭐ SIX GIRDERS, THE LAST TWO LANDING ACROSS THE CUT, and the line keeps
     drawing past the end of the scene rather than easing to a stop inside it. */
  const DRAW = -20;                         /* the roll is well under way */
  /* ⭐ A PER-CUT PUSH. [[docs/TRIAL-CUTS.md]] ranks the levers rake > grade >
     CAMERA > bed > per-cut layout, and this scene was leaning on the weakest of
     them, which is why its dHash sat at 6. A different scale changes every pixel
     in the frame at once, which is what a perceptual hash actually reads.
     ⛔ TWO SEPARATE JSX SLIPS GOT ME HERE. First, a JSX comment cannot sit before
     the root element — that is two roots. Then, writing the example of one INSIDE
     a block comment closed the comment early, because it contains the terminator.
     Prose about a value belongs beside the value, and never quotes a terminator. */
  const PLAN_PUSH = v === "amber" ? 1.082 : v === "steel" ? 1.008 : 1.036;
  const drawn = E(f, DRAW, 66, 0, 1, LIN);  /* ⛔ LIN, and fast enough to stay ahead of the risings */
  /* ⛔⛔ A CELL MAP OF THE LAST EIGHT FRAMES FOUND THE TAIL. 42% of the change was
     the one tower still rising at the right and 29% was the hero at the left;
     the two middle columns — where the FINISHED skyline stands — measured 0.4%
     to 1.8% each. The towers stop, and they are the biggest things in frame.
     ⭐ A GANTRY LAMP SWEEPS THE SKYLINE, on its own clock rather than the line's,
     so the completed towers are lit in turn and something large and bright is
     still crossing the frame at the cut. ⛔ LIN. */
  const sweep = E(f, DRAW, 104, 0, 1, LIN);
  const built = E(f, 10, 104, 0, 1, LIN);
  const LANDS = [14, 26, 38, 50, 62, 74];
  return (
    <Scene p={p} slug="PLAN MODE" push={[0, dur + 14, PLAN_PUSH]} vig={0.50}>
      <Room p={p} f={f} lit={0.72} occ="r" weave="plain" rake={0.18}
        rakeRate={RK[v].rate * 0.9} rakeN={RK[v].n} horizonDy={60} />
      <TierRig f={f} at={0} lit={[1, 0.4, 0.3]} gy={GY} z={16} gap={560} />
      {/* the drafting light from S5 is still the light in the room */}
      <Pool x={506} y={GY - 40} w={1120} c={PHASE[2].c} o={0.34} z={22} />

      {/* the travelling gantry lamp */}
      <div style={{ position: "absolute", left: 30 + sweep * 800, top: 92, width: 26, height: 120,
        zIndex: 58, background: dkh(STEEL, -0.4) }} />
      <div style={{ position: "absolute", left: -64 + sweep * 800, top: 198, width: 258,
        height: 70, zIndex: 59, borderRadius: "48% 48% 10px 10px",
        background: `linear-gradient(180deg, #F2FBF6 0%, ${mxh(PHASE[2].c, 0.52)} 56%, ${dkh(PHASE[2].c, -0.28)} 100%)`,
        border: `5px solid ${hexa("#000", 0.34)}` }} />
      <div style={{ position: "absolute", left: -240 + sweep * 800, top: 264, width: 610,
        height: GY - 264, zIndex: 52,
        background: `linear-gradient(180deg, ${hexa(PHASE[2].c, 0.40)} 0%, ${hexa(PHASE[2].c, 0.07)} 100%)`,
        clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)" }} />
      <Pool x={66 + sweep * 800} y={GY - 30} w={620} c={PHASE[2].c} o={0.5} z={26} />

      {/* ⭐⭐ 16s: *"needs to be more elevated and interesting."* At the flagged
             frame the line had barely started and two thirds of the panel was
             empty dark blue — the scene was a small sheet and a tiny hero in a
             big room.
             ⭐ THE ELEVATION IS THE LINE ITSELF: "it maps out your ENTIRE project
             before writing a single line of code." So the whole structure
             appears as a GHOST the moment the plan starts — full width, every
             bay of it, drawn in blueprint before one real girder exists. Then
             the real steel drops into the ghosts one at a time.
             ⭐ That fills the dead top third with the subject rather than with
             decoration, and it makes the rule visible: you can SEE the finished
             thing before anything is built. */}
      {(() => {
        const ghost = E(f, 2, 20, 0, 1, OUT);
        return (
          <div style={{ position: "absolute", inset: 0, zIndex: 34, opacity: ghost * 0.85 }}>
            {[0, 1, 2, 3, 4, 5].map(i => {
              const gx = 150 + i * 142, filled = built * 6 > i;
              return (
                <React.Fragment key={"gh" + i}>
                  {/* the bay outline */}
                  <div style={{ position: "absolute", left: gx, top: GY - 330, width: 128,
                    height: 190, border: `3px dashed ${hexa(PHASE[2].c, filled ? 0.22 : 0.72)}`,
                    borderRadius: 4 }} />
                  {/* its uprights, ghosted */}
                  {[0, 1].map(k => (
                    <div key={k} style={{ position: "absolute", left: gx + k * 122, top: GY - 330,
                      width: 6, height: 190, background: hexa(PHASE[2].c, filled ? 0.18 : 0.6) }} />
                  ))}
                  {/* the node it is pinned to on the line */}
                  <div style={{ position: "absolute", left: gx + 56, top: GY - 148, width: 16,
                    height: 16, borderRadius: "50%",
                    background: filled ? PHASE[i % 5].c : hexa(PHASE[2].c, 0.5),
                    border: `3px solid ${hexa("#000", 0.3)}` }} />
                </React.Fragment>
              );
            })}
            {/* the datum running the whole width — the plan's own baseline */}
            <div style={{ position: "absolute", left: 120, top: GY - 344, width: 890, height: 3,
              background: hexa(PHASE[2].c, 0.55) }} />
            <div style={{ position: "absolute", left: 120, top: GY - 132, width: 890, height: 3,
              background: hexa(PHASE[2].c, 0.55) }} />
          </div>
        );
      })()}

      {/* ⛔⛔ 16s WAS FLAT. Alex: *"needs to be more elevated and interesting."*
             The plan was a 54px strip with thin girders over it — the widest
             shot in the reel pointed at the smallest subject in it.
             ⭐ THE ELEVATION IS LITERAL: THE PROJECT STANDS UP OUT OF THE PLAN.
             The line draws, and at each station a mass RISES from the sheet, so
             by the end of the scene a whole skyline is standing on the drawing.
             That is the line's actual claim — it maps your entire project before
             a single line of code — and it gives the scene the arc it lacked:
             flat paper at the start, a built thing at the end.
             ⛔ NOTHING MAY RISE AHEAD OF THE LINE. Each mass is gated on `drawn`
             passing its station, so the picture cannot contradict the rule. */}
      <DeckDraft x={132 + LAY[v].dx * 0.3} y={GY - 10} f={f} s={1.42} z={44}
        drawn={drawn} built={0} mode={1} />

      {/* ⛔⛔⛔ THE MASSING BLOCKS ARE GONE. Alex: *"those buildings coming up out
             of the roadmap are not good, they just look so unprofessional —
             remove and replace."* Fair. They were flat grey slabs with coloured
             stripes standing on a drawing: a diagram of a city, drawn to no
             standard, competing with the one real object in the scene.
             ⭐ WHAT REPLACES THEM BELONGS TO THIS REEL. The route draws, and at
             each station a PROMPT CARD lands face-up on the sheet — the actual
             card from the actual library, `rich`, with its command strip and its
             fill-in pills. "It maps out your entire project" then means
             something specific: the whole job laid out, with the prompt for each
             phase already sitting on it, before a line of code exists.
             ⛔ Still gated on the line: nothing lands ahead of the drawing. */}
      {(() => {
        const BASE = GY - 250 + LAY[v].dy * 0.6, X0 = 150;
        return [0, 1, 2, 3, 4].map(i => {
          const at = (i + 0.5) / 5;
          if (drawn < at) return null;
          /* ⛔ REPLACING THE BUILDINGS PUT THE FIRST EVENT AT f8 AND THE SCENE
             WENT FROM ok TO **OPENS DEAD** (3.67) — the same carry-in mistake I
             have now made in five separate scenes. The first card is already
             landing when the cut arrives. */
          /* ⛔⛔ dHASH MIN FELL TO 6 AND THE WEAK FRAME WAS f482 — THIS SCENE, all
             three cuts nearly identical (6 / 8 / 14). My replacement barely used
             `LAY`, so the cards landed in the same places at the same times in
             every cut, which is the exact duplicate risk [[docs/TRIAL-CUTS.md]]
             measured the old variant system at.
             ⭐ THE LEVER IS THE ORDER THEY ARRIVE IN. Amber fills the route from
             the far end back, steel from the middle out — a different frame at
             every timestamp rather than a different tint of the same one, and
             all three are equally true of a plan being populated. */
          /* ⛔ AND REVERSING THE ORDER DID NOTHING, because every card is gated on
             `drawn` having passed its own station: amber's early-landing cards
             were stations 3 and 4, which the line had not reached, so amber
             simply showed NO cards where house showed two. The lever cancelled
             itself out. A per-cut stagger that the geometry can veto is not a
             lever at all. */
          const LAND = [-6, 12, 28, 48, 70][i] + (v === "amber" ? -5 : v === "steel" ? 7 : 0);
          const k = E(f, LAND, LAND + 13, 0, 1, i >= 3 ? LIN : BACK);
          if (k <= 0.01) return null;
          const x = X0 + i * 172 + LAY[v].dx * 0.8;
          return (
            <React.Fragment key={"pc" + i}>
              {/* the card, dropping in and settling flat onto the sheet */}
              <div style={{ position: "absolute", left: x, top: BASE - (1 - k) * 250,
                zIndex: 50, opacity: Math.min(1, k * 2.4),
                transform: `rotate(${(1 - k) * (i % 2 ? 22 : -19) + (i % 2 ? 3 : -3)}deg)`,
                filter: `drop-shadow(0 ${8 + (1 - k) * 16}px ${14}px ${hexa("#000", 0.34)})` }}>
                <PromptCard x={74} y={198} s={0.58} z={50} ph={i} ink={1}
                  fill={E(f, LAND + 6, LAND + 22, 0.2, 1, IN_Q)}
                  cat={R.catNames[(i * 3) % R.catNames.length]} f={f + i * 11} rich />
              </div>
              {/* the station it lands on lights when its card arrives */}
              {k > 0.55 && (
                <div style={{ position: "absolute", left: x + 58, top: BASE + 44,
                  width: 30, height: 30, borderRadius: "50%", zIndex: 52,
                  background: PHASE[i].c, border: `4px solid ${hexa("#000", 0.4)}`,
                  boxShadow: `0 0 ${22 * k}px ${hexa(PHASE[i].c, 0.8)}` }} />
              )}
              {k > 0.5 && k < 0.92 && (
                <Ring x={x + 74} y={BASE + 60} f={f} at={LAND + 7} c={PHASE[i].c} z={54} s={0.8} />
              )}
              {k > 0.5 && k < 0.86 && (
                <Puff x={x + 74} y={BASE + 66} f={f} at={LAND + 7} c="#CFE0EC" n={8} s={0.9} z={53} />
              )}
            </React.Fragment>
          );
        });
      })()}

      {/* the crew work the far end of the line, small — scale is the point */}
      {[0, 1].map(i => (
        <Crew key={"cw" + i} f={f} x={742 + i * 128} y={GY - 6} i={i + 5} size={84} z={48}
          at={0} loop={i + 2}
          cheer={LANDS.some(t => f > t && f < t + 12) ? 0.7 : 0} />
      ))}

      {/* ⛔ AND HE STOOD STILL FOR ALL 84 FRAMES. Every other lever in this scene
          was pulled while the one large warm object in it never moved — he
          walks out under his own skyline as it goes up. ⛔ LIN, it crosses. */}
      <Hero f={f} x={92 + E(f, 30, 104, 0, 300, LIN)} y={GY + 8} size={SHOT.PLAN} z={62} costume={{ constr: 1 }}
        act={1} ph={0.3} heat={0.3} gaze={E(f, 2, 14, 0, 1, OUT)}
        drive={-E(f, DRAW, 20, 0, 0.3, OUT)}
        shock={LANDS.reduce((a2, t) => a2 + E(f, t, t + 3, 0, 0.3, OUT)
          - E(f, t + 3, t + 12, 0, 0.3, IN_Q), 0)} />
      <Contact x={54 + E(f, 30, 104, 0, 300, LIN)} y={GY - 4} w={140} z={30} o={0.4} />
      <TierMark at={1} on={1} x={58} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("plate");
  /* ⛔⛔⛔ 19s. Alex: *"nothing happens, it's way too bad, it needs to actually
     have something happening in the animation that has a beginning and an end."*
     Right on both counts. The scene was SIX IDENTICAL BOLT STRIKES spread over 78
     frames — a repetition, not an arc. A repeated small action has no beginning
     and no end by construction: every moment looks like every other moment, so
     any frame you stop on shows a man standing next to a plate.

     ⭐ THE ARC IS THE VERB IN THE LINE. "DROP a CLAUDE.md file into your project"
     — so he drops it.
       BEGINNING  f0-14   he carries the plate to the mouth of the slot and holds
                          it out over the opening. Nothing is committed yet.
       MIDDLE     f14-26  he lets go. It FALLS, and it falls fast — the whole
                          middle of the scene is one object travelling.
       END        f26-78  it seats with a bang, the slot swallows it, and the
                          room answers: the deck's three fittings light in
                          sequence and stay lit. It is loaded, from now on.
     ⛔ ONE EVENT, NOT SIX. [[feedback_decluttering_is_not_redoing]] — the old
     event was "he bolts a plate"; the new one is "he drops it in and the room
     changes". Different name, different shape. */
  const CARRY = E(f, -6, 14, 0, 1, IO);      /* already walking it over */
  const LET_GO = 15;
  const fall = E(f, LET_GO, 26, 0, 1, IN_Q); /* ⛔ IN_Q — it ACCELERATES */
  const seat = E(f, 26, 30, 0, 1, OUT);
  const LIGHTS = [32, 44, 56];
  const clunk = f >= 26 && f < 42 ? Math.sin((f - 26) / 2.3) * Math.exp(-(f - 26) / 4.4) : 0;
  const loaded = E(f, 56, 96, 0, 1, LIN);    /* ⛔ LIN — it crosses the cut */
  return (
    <Scene p={p} slug={R.mdFile} push={[0, dur + 14, 1.052]} vig={0.56}>
      <Room p={p} f={f} lit={0.9} occ="l" weave="plain" rake={0.22}
        rakeRate={RK[v].rate} rakeN={RK[v].n} />
      <TierRig f={f} at={0} lit={[1, 0.4, 0.3]} gy={GY} z={16} gap={520} />
      <Hall f={f} v={v} y={190} z={18} />

      {/* ⭐⭐ THE SLOT. A hole in the deck with a lit throat, so there is somewhere
             for the thing to GO — a drop with no receiver is just a fall. */}
      <div style={{ position: "absolute", left: 356, top: GY - 118 - clunk * 6, width: 300,
        height: 128, zIndex: 38, borderRadius: 6,
        background: `linear-gradient(180deg, ${dkh(HALLSTEEL, -0.5)} 0%, #04060A 62%)`,
        border: `7px solid ${dkh(HALLSTEEL, -0.28)}` }} />
      <div style={{ position: "absolute", left: 380, top: GY - 104, width: 252, height: 26,
        zIndex: 39, borderRadius: 4, background: "#04060A",
        boxShadow: `inset 0 6px 12px ${hexa("#000", 0.9)}` }} />
      {/* the throat glows once it has something in it */}
      <div style={{ position: "absolute", left: 380, top: GY - 104, width: 252, height: 26,
        zIndex: 40, borderRadius: 4, opacity: seat * (0.4 + loaded * 0.6),
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.5)} 0%, ${dkh(BRASS, -0.3)} 100%)`,
        boxShadow: `0 0 ${30 * seat}px ${hexa(BRASS, 0.8 * seat)}` }} />

      {/* ⭐ THE PLATE — carried, then falling, then gone into the slot */}
      {fall < 0.98 && (
        <div style={{ position: "absolute",
          left: 214 + CARRY * 202,
          top: GY - 452 + fall * 330,
          zIndex: 64, transform: `rotate(${-8 + CARRY * 6 + fall * 5}deg)`,
          filter: `drop-shadow(0 ${12}px ${20}px ${hexa("#000", 0.4)})` }}>
          <div style={{ width: 214, height: 274, borderRadius: 6,
            background: `linear-gradient(164deg, #4A3A18 0%, #2A2008 44%, #100C04 100%)`,
            border: `6px solid #1A1206` }}>
            {/* ⛔ THE FALLING PLATE AND THE WALL PLATE ARE THE SAME OBJECT, so
                when this one changed shape the other had to as well — otherwise
                the thing he drops in S7 is not the thing that is bolted up in
                S8, and the two scenes stop being one idea. */}
            <div style={{ position: "absolute", left: 12, top: 12, width: 178, height: 46,
              borderRadius: 5,
              background: `linear-gradient(180deg, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, -0.42)} 100%)`,
              boxShadow: `inset 0 3px 0 ${hexa("#FFEFC0", 0.42)}`,
              display: "flex", alignItems: "center", gap: 8, paddingLeft: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: "#FFFFFF",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Img src={staticFile("claude_logo.png")}
                  style={{ width: 22, height: 22, objectFit: "contain",
                    transform: `rotate(${f * 4.6}deg)` }} />
              </div>
              <div style={{ ...mono(20, 800), color: "#1A1206",
                textShadow: `0 2px 0 ${hexa("#FFEFC0", 0.55)}` }}>{R.mdFile}</div>
            </div>
            <div style={{ position: "absolute", left: 16, top: 68, width: 170, height: 6,
              background: hexa("#17120A", 0.72), boxShadow: `0 2px 0 ${hexa("#FFEFC0", 0.5)}` }} />
            {[0, 1, 2].map(i => (
              <React.Fragment key={"mb" + i}>
                <div style={{ position: "absolute", left: 18, top: 88 + i * 40, width: 13,
                  height: 13, borderRadius: 2, background: PHASE[i + 1].c,
                  border: `2px solid ${hexa("#000", 0.4)}` }} />
                <div style={{ position: "absolute", left: 40, top: 90 + i * 40,
                  width: 138 - i * 28, height: 9, borderRadius: 2, background: hexa("#17120A", 0.78),
                  boxShadow: `0 2px 0 ${hexa("#FFEFC0", 0.5)}` }} />
                <div style={{ position: "absolute", left: 52, top: 105 + i * 40,
                  width: 100 - i * 20, height: 7, borderRadius: 2, background: hexa("#17120A", 0.5),
                  boxShadow: `0 2px 0 ${hexa("#FFEFC0", 0.34)}` }} />
              </React.Fragment>
            ))}
            <div style={{ position: "absolute", left: 18, top: 214, width: 168, height: 22,
              borderRadius: 3, background: hexa("#0C0A05", 0.62),
              border: `2px solid ${hexa("#17120A", 0.7)}` }}>
              <div style={{ position: "absolute", left: 8, top: 7, width: 54, height: 7,
                borderRadius: 2, background: hexa("#6FD3A8", 0.85) }} />
              <div style={{ position: "absolute", left: 70, top: 7, width: 36, height: 7,
                borderRadius: 2, background: hexa("#E4A548", 0.85) }} />
            </div>
          </div>
        </div>
      )}

      {/* the seat: a hard ring, dust off the deck, and the deck itself jumps */}
      {f > 25 && f < 46 && (<>
        <Ring x={506} y={GY - 108} f={f} at={26} c="#FBE7AE" z={70} s={2.0} />
        <Puff x={392} y={GY - 96} f={f} at={26} c="#C6B79A" n={12} s={1.3} z={68} />
        <Puff x={620} y={GY - 96} f={f} at={26} c="#C6B79A" n={12} s={1.3} z={68} />
      </>)}

      {/* ⭐⭐ THE END OF THE ARC: THE ROOM ANSWERS. Three fittings on the deck rail
             light in order and stay lit — the plate is loaded, and S8 is what
             that buys you. */}
      {LIGHTS.map((t, i) => {
        const on = E(f, t, t + 8, 0, 1, OUT);
        const P = PHASE[i + 1];
        return (
          <React.Fragment key={"lt" + i}>
            <div style={{ position: "absolute", left: 726 + i * 88, top: GY - 268, width: 62,
              height: 62, borderRadius: 9, zIndex: 56,
              background: on > 0.1 ? P.c : "#141A20",
              border: `5px solid ${on > 0.1 ? hexa("#000", 0.5) : "#8C9AA6"}`,
              boxShadow: on > 0.4 ? `0 0 ${26 * on}px ${hexa(P.c, 0.85)}` : "none" }} />
            {f > t && f < t + 14 && (
              <Ring x={757 + i * 88} y={GY - 238} f={f} at={t} c={P.c} z={58} s={0.6} />
            )}
          </React.Fragment>
        );
      })}

      {/* he lets go and steps back from it */}
      <Hero f={f} x={182 + CARRY * 150} y={GY + 10 - clunk * 4} size={SHOT.PLATE} z={66}
        costume={{ constr: 1 }} act={1} ph={0.5} reach={104} heat={0.44}
        drive={-CARRY * 0.34 + E(f, LET_GO, LET_GO + 10, 0, 0.4, OUT)}
        strain={Math.min(1, CARRY * 0.7 - E(f, LET_GO, LET_GO + 8, 0, 0.7, OUT))}
        gaze={E(f, 16, 28, 0, 1, OUT)}
        shock={E(f, 26, 30, 0, 0.8, OUT) - E(f, 30, 44, 0, 0.8, IN_Q)} />
      <Contact x={124 + CARRY * 150} y={GY - 4} w={200} z={30} o={0.44} />

      <TierMark at={2} on={E(f, 32, 44, 0, 1, OUT)} x={58} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("runs");
  /* ⛔⛔⛔ 23 SECONDS = FRAME 690 = THIS SCENE AT LOCAL f61. Alex: *"the animation
     at 23 seconds should just be text on rectangles like that sucks and too
     boring, needs to be way better, redone."* He is describing it precisely —
     the old version was SIX TEXT LABELS ON FLAT PANELS: `CLAUDE.md`, the two
     paths, `NAMING`, `LIBRARIES`, `RULES` and `EVERY SESSION`, on green and teal
     rectangles. It was the worst offender in the reel and it is exactly what
     [[feedback_dressing_the_words_is_not_redoing_it]] is about: muted, nothing
     was happening — a caption had been dressed up as a scene.

     ⭐ THE NEW EVENT: THE SHIFT CHANGE. The VO is "it learns your naming
     conventions, libraries and rules for every single session", so the picture
     is a DOOR with the house plate bolted beside it, and a shift of Claudes
     coming through it. Each one passes the plate and is KITTED on the way past —
     the rule leaves the wall and becomes a thing the worker is wearing.
     ⛔ NO WORDS. Each rule is a FITTING, not a label
     ([[feedback_substitute_the_text_never_delete_it]]): a hard hat, a tool belt,
     a marked band. And the door does not stop, which is what "every session"
     means.
     ⭐ ESCALATION: one worker, then two, then four — the shift gets bigger as
     the line is spoken, which is the hierarchy the body was missing. */
  const BOLT = -6;                       /* the plate is already up when we cut in */
  const WALK = [2, 16, 30, 42, 52, 62, 70, 78, 84];
  const kitAt = (t: number) => E(f, t + 9, t + 15, 0, 1, BACK);
  return (
    <Scene p={p} slug="EVERY SESSION" push={[0, dur + 14, 1.042]} vig={0.52}>
      <Room p={p} f={f} lit={0.9} occ="r" weave="tile" rake={0.20}
        rakeRate={RK[v].rate * 1.1} rakeN={RK[v].n} />
      <TierRig f={f} at={0} lit={[1, 0.4, 0.3]} gy={GY} z={16} gap={520} />
      <Hall f={f} v={v} y={200} z={18} />

      {/* ⭐ THE DOOR AND THE PLATE — deck three's mechanism, at full size */}
      <DeckDoor x={70 + LAY[v].dx * 0.3} y={GY - 6} f={f} s={1.34} z={40}
        bolt={E(f, BOLT, BOLT + 12, 0, 1, BACK)}
        glow={WALK.reduce((a, t) => Math.max(a, E(f, t + 5, t + 9, 0, 1, OUT)
          - E(f, t + 12, t + 20, 0, 1, IN_Q)), 0)} />

      {/* ⭐⭐ THE SHIFT. Each body walks out of the dark of the doorway, crosses
             the plate, and its fitting SNAPS on as it passes — the three rules
             cycle, so by the end of the line every one of them is out on the
             floor being worn. */}
      {WALK.map((t, i) => {
        if (f < t) return null;
        /* ⛔⛔ EVERY WORKER STOPPED AT THE SAME PLACE. `Math.min(1, ...)` clamped
           the walk, so all nine finished at x≈960 and stacked into one
           indistinct clump at the right edge — which is exactly the note:
           *"can't really tell what's going on there."* A shift walks THROUGH.
           `k` is now unbounded and they leave frame, so at any moment there are
           two or three spaced bodies rather than a pile of nine. */
        const k = (f - t) / 26;
        const x = 150 + k * (620 + (i % 3) * 40);
        if (x > 1140) return null;
        const kit = kitAt(t), rule = i % 3;
        const P = PHASE[rule + 1];
        return (
          <React.Fragment key={"wk" + i}>
            <Crew f={f} x={x} y={GY - 4 - (i % 2) * 14 + Math.max(0, 30 - k * 60)} i={i + 3}
              size={128 + (i % 3) * 11} z={54 + i} at={0} loop={(i + 1) % 4}
              cheer={kit > 0.5 ? 0.55 : 0} />
            {/* the fitting it collects — one of three, and never a word */}
            {kit > 0.02 && (
              <div style={{ position: "absolute", left: x - 48, top: GY - 152 - (i % 2) * 12,
                width: 96, height: 48, zIndex: 60 + i,
                transform: `scale(${kit}) rotate(${(1 - kit) * -26}deg)`, transformOrigin: "50% 100%" }}>
                {rule === 0 && (   /* naming — a stencilled hard hat */
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50% 50% 6px 6px",
                    background: `linear-gradient(180deg, ${mxh(P.c, 0.44)} 0%, ${dkh(P.c, -0.34)} 100%)`,
                    border: `3px solid ${hexa("#000", 0.42)}` }} />
                )}
                {rule === 1 && (<>  {/* libraries — a loaded tool belt */}
                  <div style={{ position: "absolute", left: 0, top: 16, width: 96, height: 21,
                    borderRadius: 4, background: dkh(OXIDE, -0.24),
                    border: `3px solid ${hexa("#000", 0.42)}` }} />
                  {[6, 37, 68].map((bx, j) => (
                    <div key={j} style={{ position: "absolute", left: bx, top: 28, width: 22,
                      height: 28, borderRadius: 3, background: PHASE[(j + 1) % 5].c,
                      border: `2px solid ${hexa("#000", 0.4)}` }} />
                  ))}
                </>)}
                {rule === 2 && (<>  {/* rules — a marked arm band with a cast lug */}
                  <div style={{ position: "absolute", left: 10, top: 10, width: 76, height: 30,
                    borderRadius: 15, background: hexa(P.c, 0.95),
                    border: `3px solid ${hexa("#000", 0.44)}` }} />
                  <div style={{ position: "absolute", left: 36, top: 16, width: 22, height: 22,
                    borderRadius: "50%", background: dkh(BRASS, -0.1),
                    border: `2px solid ${hexa("#000", 0.44)}` }} />
                </>)}
              </div>
            )}
            {kit > 0.05 && kit < 0.9 && (
              <Ring x={x} y={GY - 118} f={f} at={t + 9} c={P.c} z={64} s={0.7} />
            )}
          </React.Fragment>
        );
      })}

      {/* ⭐ HE IS THE ONE WHO BOLTED IT UP, and he stands under it while the
             shift walks past — the smallest figure in the frame by the end,
             which is the point: he did this ONCE and it keeps happening. */}
      <Hero f={f} x={806} y={GY + 8} size={SHOT.SHIFTS} z={50} costume={{ constr: 1 }}
        act={1} ph={0.5} reach={96} heat={0.36}
        drive={-antic(f, BOLT - 8, BOLT + 2) * 0.5}
        strain={load(f, BOLT - 8, BOLT + 2) * 0.6}
        gaze={E(f, 6, 18, 0, 0.85, OUT)}
        shock={WALK.reduce((a, t) => a + E(f, t + 9, t + 13, 0, 0.22, OUT)
          - E(f, t + 13, t + 22, 0, 0.22, IN_Q), 0)} />
      <Contact x={746} y={GY - 4} w={190} z={30} o={0.42} />

      {/* the near-black foreground, for the black point and for depth */}
      <div style={{ position: "absolute", left: -60, top: GY - 40, width: 1140, height: 150,
        zIndex: 84, background: "#04060A",
        clipPath: "polygon(0 46%, 13% 28%, 26% 42%, 39% 26%, 52% 40%, 66% 27%, 80% 41%, 100% 30%, 100% 100%, 0 100%)" }} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  /* ⛔⛔⛔ 25s. Alex: *"needs to be a lot more interesting, it has to have an
     actual concept, right now it's just nothing, we just see a big wall of
     papers."* Correct. The previous version was a drawer wall with a wave of
     drawers opening and four Claudes standing in front of it. A wave across a
     grid is TEXTURE, not an event — it is one idea repeated N times, which is
     exactly what [[docs/ANIMATION-QUALITY §25]] says will never fix a "static"
     note however much of it you add.

     ⭐ THE CONCEPT: THE DRAWER THAT DOESN'T END. He pulls ONE handle. It slides
     out a foot, then a yard, then past the crop, still coming, packed the whole
     way, until he is walking backwards and still has not reached the back of it.
     One action, escalating, and it states "there is already far more here than
     you think" without printing a number — which matters, because the VO says
     "over a hundred" and the library holds 52, so the picture has to carry
     ABUNDANCE without ever counting ([[library130-reel]] COUNT_BANNED).
     ⭐ It also rhymes with the hook: the reel opens on him hauling something
     heavy and closes on him pulling something that will not stop. */
  const PULL = -8;
  /* ⛔ LIN and it runs PAST the cut — the drawer must still be coming when we
     leave, or the joke resolves and the scene dies into its own edge. */
  const out = E(f, PULL, 96, 0, 1, LIN);
  const LEN = 1780;                       /* far wider than the 1012 panel */
  const HEAVES = [2, 18, 34, 50, 64];
  const strain = HEAVES.reduce((a2, t) => a2 + load(f, t - 8, t) * 0.7, 0);
  const drag = HEAVES.reduce((a2, t) => a2 + Math.max(0, antic(f, t - 8, t)) * 0.30, 0);
  return (
    <Scene p={p} slug="THE WALL" push={[0, dur + 14, 1.026]} vig={0.42}>
      <Room p={p} f={f} lit={1} occ="none" weave="rank" rake={0.26}
        rakeRate={RK[v].rate * 1.2} rakeN={RK[v].n} horizonDy={90} />

      {/* the wall it is coming OUT of — dark, and it is the background now */}
      <DrawerWall f={f} x={-180} y={60} w={1420} h={330} z={16} rows={4} cols={20}
        banks={[0.62, 0.56, 0.52, 0.48, 0.44]} showCounters pan={-(f * 2.4)} />

      {/* ⭐⭐ THE DRAWER. Its carcass runs from the wall out past the left crop,
             and the cards inside it are drawn along its whole length so the
             thing is visibly FULL rather than a long empty box. */}
      {(() => {
        const x0 = 806 - out * LEN;                 /* the open end */
        const w = Math.min(LEN, out * LEN + 210);
        return (
          <div style={{ position: "absolute", left: x0, top: GY - 250, width: w, height: 250,
            zIndex: 54 }}>
            {/* the card block, packed the entire length */}
            <div style={{ position: "absolute", left: 16, top: -56, right: 12, height: 190,
              overflow: "hidden" }}>
              {Array.from({ length: Math.ceil(w / 15) }, (_, i) => {
                /* ⛔ EVERY 7th GUIDE CARD AND A NARROW HEIGHT SPREAD read as a
                   picket fence. A card index is legible from its STAGGER and its
                   colour, so guides come every 4th, the heights vary twice as
                   much, and the tab colour walks the phases. */
                const up = rnd(i, 77), guide = i % 4 === 1;
                return (
                  <div key={"cd" + i} style={{ position: "absolute", left: i * 15,
                    top: (14 + up * 26 - (guide ? 22 : 0)),
                    width: 16, height: 132 + up * 44 + (guide ? 30 : 0),
                    transform: `rotate(${(up - 0.5) * 5}deg)`, transformOrigin: "50% 100%",
                    background: guide ? "#E6D9B4" : i % 6 === 2 ? BLANKD : BLANK,
                    borderRight: `1px solid ${hexa("#8A8172", 0.6)}` }}>
                    {guide && (
                      <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 32,
                        background: PHASE[Math.floor(i / 4) % 5].c }} />
                    )}
                  </div>
                );
              })}
            </div>
            {/* the brass rod running the whole way — the card-index tell */}
            <div style={{ position: "absolute", left: 10, top: 116, width: w - 20, height: 17,
              borderRadius: 9, zIndex: 5,
              background: `linear-gradient(180deg, #FDEBB4 0%, ${mxh(BRASS, 0.42)} 38%, ${dkh(BRASS, -0.38)} 100%)` }} />
            {/* the carcass front */}
            <div style={{ position: "absolute", left: 0, top: 132, width: w, height: 118,
              zIndex: 7, borderRadius: 3,
              background: `linear-gradient(178deg, ${mxh(DRW, 0.54)} 0%, ${mxh(DRW, 0.28)} 48%, ${mxh(DRWD, 0.10)} 100%)`,
              border: `5px solid ${hexa("#000", 0.48)}` }} />
            <div style={{ position: "absolute", left: 8, top: 140, width: w - 16, height: 12,
              zIndex: 8, background: hexa("#FFF", 0.22) }} />
            {/* ⭐ THE HANDLE HE IS ACTUALLY HOLDING, at the open end */}
            <div style={{ position: "absolute", left: 26, top: 168, width: 92, height: 44,
              zIndex: 10, borderRadius: "6px 6px 16px 16px",
              background: `linear-gradient(180deg, ${dkh(DRWD, -0.5)} 0%, ${mxh(DRWL, 0.22)} 74%, ${DRWL} 100%)`,
              border: `4px solid ${hexa("#000", 0.46)}` }} />
            {/* the brass label holder, so the open end reads as a drawer FACE */}
            <div style={{ position: "absolute", left: 140, top: 166, width: 128, height: 50,
              zIndex: 10, borderRadius: 3, background: "#F2EAD6",
              border: `5px solid ${dkh(BRASS, -0.12)}` }}>
              {[0, 1].map(i => (
                <div key={i} style={{ position: "absolute", left: 12, top: 12 + i * 18,
                  width: 84 - i * 30, height: 6, borderRadius: 2, background: hexa("#3A342A", 0.5) }} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* the runners it is riding out on, still bolted to the wall */}
      {[0, 1].map(i => (
        <div key={"rn" + i} style={{ position: "absolute", left: 806 - out * LEN, top: GY - 122 + i * 74,
          width: out * LEN + 210, height: 9, zIndex: 44, background: dkh(HALLSTEEL, -0.38) }} />
      ))}

      {/* ⭐ HE WALKS BACKWARDS WITH IT and it is STILL coming at the cut. */}
      <Hero f={f} x={824 - out * LEN * 0.42} y={GY + 10} size={SHOT.FLOOD + 46} z={70}
        costume={{ constr: 1 }} act={1} ph={0.4} reach={112} heat={0.42}
        drive={-drag} strain={Math.min(1, strain)}
        gaze={E(f, 2, 14, 0, 1, OUT)}
        shock={E(f, 30, 36, 0, 0.5, OUT) - E(f, 36, 52, 0, 0.5, IN_Q)} />
      <Contact x={766 - out * LEN * 0.42} y={GY - 4} w={186} z={30} o={0.42} />
      <Sweat x={824 - out * LEN * 0.42} y={GY - 172} f={f} at={18} n={8} s={1.0} z={74} rate={1.5} />

      {/* the crew stop what they are doing and watch it keep coming */}
      {[0, 1].map(i => (
        <Crew key={"cw" + i} f={f} x={188 + i * 150} y={GY - 4} i={i + 4} size={96} z={50}
          at={0} loop={(i + 2) % 4}
          cheer={HEAVES.some(t => f > t && f < t + 12) ? 0.75 : 0} />
      ))}

      {/* the grit each heave drags off the runners */}
      {HEAVES.map((t, i) => f > t && f < t + 20 && (
        <Puff key={"gp" + i} x={806 - out * LEN + 120} y={GY - 24} f={f} at={t}
          c="#9FB0BA" n={9} s={1.1} z={60} />
      ))}

      <div style={{ position: "absolute", left: -60, top: GY + 30, width: 1140, height: 160,
        zIndex: 84, background: "#04060A",
        clipPath: "polygon(0 20%, 100% 12%, 100% 100%, 0 100%)" }} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  /* ⭐⭐ THE LAST OLD SCENE. VO: "...copy right now inside of this resource."
     ⛔ THE OLD VERSION had him behind a counter with a document panel: a card
     shown, not a card TAKEN.
     ⭐ THE NEW EVENT: HE PULLS ONE OUT AND THE SLOT IS STILL FULL. He takes a
     card off the wall, and the one behind it slides straight up into the gap. He
     takes another, same thing. That IS the word "copy": the thing you take does
     not leave, which is the whole difference between a library and a shop, and
     it is a mechanism rather than a claim.
     ⛔ SHOT.COPY is 35.6% — tight enough that the card he lifts is readable,
     which is the point of spending the reel's last real beat here. */
  const TAKES = [-6, 14, 30];
  const refill = (i: number) => E(f, TAKES[i] + 5, TAKES[i] + 16, 0, 1, OUT);
  const taken = TAKES.filter(t => f > t).length;
  return (
    <Scene p={p} slug="COPY" push={[0, dur + 14, 1.040]} vig={0.46}>
      <Room p={p} f={f} lit={1} occ="l" weave="rank" rake={0.24}
        rakeRate={RK[v].rate} rakeN={RK[v].n} />
      <DrawerWall f={f} x={-160} y={64} w={1360} h={250} z={16} rows={3} cols={20}
        banks={[0.8, 0.74, 0.7, 0.66, 0.62]} showCounters={false} pan={-(f * 3.0)} />
      <Hall f={f} v={v} y={342} z={18} />
      <Pool x={506} y={GY - 40} w={980} c={SODIUM} o={0.5} z={22} />

      {/* ⭐ THE RACK HE IS TAKING FROM — three slots, and each one REFILLS */}
      {[0, 1, 2].map(i => {
        const sx = 252 + i * 214;
        const r = refill(i);
        return (
          <React.Fragment key={"sl" + i}>
            {/* the slot's dark throat */}
            <div style={{ position: "absolute", left: sx - 14, top: GY - 336, width: 176,
              height: 250, zIndex: 40, borderRadius: 5, background: "#070A0D",
              border: `5px solid ${dkh(HALLSTEEL, -0.3)}` }} />
            {/* the card behind, sliding UP into the gap the moment one is pulled */}
            <div style={{ position: "absolute", left: sx, top: GY - 300 + (1 - r) * 176,
              zIndex: 42, opacity: i < taken ? Math.min(1, r * 2.2) : 1 }}>
              <PromptCard x={70} y={196} s={0.56} z={42} ph={i + 1} ink={1} fill={0.7}
                cat={R.catNames[(i * 5 + 1) % R.catNames.length]} f={f + i * 9} rich />
            </div>
            {i < taken && r > 0.1 && r < 0.9 && (
              <Ring x={sx + 70} y={GY - 200} f={f} at={TAKES[i] + 5} c={PHASE[i + 1].c} z={48} s={0.7} />
            )}
          </React.Fragment>
        );
      })}

      {/* ⭐⭐ THE ONE IN HIS HAND — big, face on, and it stays. `rich` on, so the
             command strip and the two slot pills are legible at thumbnail. */}
      {TAKES.map((t, i) => f > t && (
        <div key={"tk" + i} style={{ position: "absolute",
          left: 252 + i * 214 - E(f, t, t + 18, 0, 150 + i * 40, OUT),
          top: GY - 300 + E(f, t, t + 18, 0, 96, IO),
          zIndex: 70 + i, transform: `rotate(${E(f, t, t + 18, 0, -13 + i * 5, OUT)}deg)`,
          filter: `drop-shadow(0 ${10}px ${18}px ${hexa("#000", 0.36)})` }}>
          <PromptCard x={82} y={228} s={0.66} z={70} ph={i + 1} ink={1}
            fill={E(f, t + 6, t + 22, 0.4, 1, IN_Q)}
            cat={R.catNames[(i * 5 + 1) % R.catNames.length]} f={f} rich big />
        </div>
      ))}

      <Hero f={f} x={148} y={GY + 10} size={SHOT.COPY} z={62} costume={{ constr: 1 }}
        act={1} ph={0.4} reach={112} heat={0.34}
        drive={-TAKES.reduce((a2, t) => a2 + antic(f, t - 8, t + 2) * 0.5, 0)}
        strain={TAKES.reduce((a2, t) => a2 + load(f, t - 8, t + 2) * 0.3, 0)}
        gaze={0.8} />
      <Contact x={88} y={GY - 4} w={206} z={30} o={0.42} />
      <Mark x={846} y={126} s={80} z={92} />
    </Scene>
  );
};

export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("doors");
  /* ⛔ HOLD 88% — the highest in the reel. The march finished at f28 of 47 and
     the last third was a group photo. It now runs to f52, i.e. PAST the end of
     the shot, on `IN_Q`, so the cast is still closing on the last frame. */
  const march = E(f, 0, 52, 0, 1, IN_Q);
  const stamp = E(f, 1, 8, 0, 1, BACK);
  return (
    <Scene p={p} slug={R.keyword} push={[0, dur + 14, 1.036]} vig={0.44}>
      <Room p={p} f={f} lit={1} occ="none" weave="rank" rake={0.24} rakeRate={RK[v].rate * 1.3} rakeN={RK[v].n} />
      <PickRail y={330} f={f} z={24} rate={5.2} pitch={190} run={1} />
      <DrawerWall f={f} x={-160 + LAY[v].dx} y={112 + LAY[v].dy * 0.8} w={1340} h={186} z={20}
        rows={2} cols={20} banks={[1, 1, 1, 1, 1]} showCounters={false}
        pan={-(f * 2.6) + LAY[v].dx * 2} />

      {/* ⛔ THE ANTAGONIST'S LAST FRAME — the spike, still standing, still blank */}
      <Spike x={124} y={GY - 148} n={34} s={1.0} z={40} f={f} />

      {/* the cast advances toward camera */}
      {Array.from({ length: 6 }, (_, i) => (
        <Crew key={"ct" + i} f={f} x={186 + (i - 2.5) * (132 + march * 46) + 330}
          y={GY + 26 + march * 132} i={i + 1} size={112 + march * 118} z={48 + i}
          at={i * 3} loop={i % 4} cheer={f > 16 ? 0.9 : 0} />
      ))}
      {/* ⛔ HOLD 88%, THE REEL'S WORST. The cast advanced 44px and grew 40px over
          the shot — under a pixel a frame, which registers on no metric and reads
          as a group photo. They now close 132px and grow 118px, and they SPREAD
          as they come (the pitch opens with `march`), so the formation gets wider
          as well as nearer. ⛔ Pitch stays over `0.85 x size` at the end:
          178px of pitch on 230px bodies is 0.77 — so the spread is what keeps
          them from blobbing, not decoration. */}
      <Hero f={f} x={512} y={GY + 44 + march * 150} size={SHOT.CTA + march * 128} z={62}
        costume={{ constr: 1 }} act={2} ph={0.2} cheer={0.9} gaze={0} />

      {/* THE KEYWORD, LOW AND MATTE */}
      <div style={{ position: "absolute", left: 0, right: 0, top: GY - 486 + LAY[v].dy * 0.7, zIndex: 86,
        display: "flex", justifyContent: "center",
        transform: `scale(${0.86 + stamp * 0.14})`, opacity: stamp }}>
        <div style={{ padding: "18px 46px", borderRadius: 8, background: "#1C1812",
          border: `6px solid ${GOLD}`, ...ui(78, 900), color: "#F8EFD8", letterSpacing: "0.10em" }}>
          {R.keyword}
        </div>
      </div>
      <Stencil x={506} y={GY - 384} t={`${R.url}${R.page}`} c={hexa("#F4E4BE", 0.76)} z={86}
        size={21} align="c" />
      <Mark x={846} y={126} s={84} z={92} />
    </Scene>
  );
};
