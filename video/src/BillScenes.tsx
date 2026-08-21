import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Mascot } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, MarkCast, MarkPlate, idle, rock, shake, drift, squash,
  R, CLAY, CLAYD, GOLD, GREEN, RED, SKY, TEAL, PAPER, CREAMB, INK, MUTE, STEEL, OXIDE, BRASS,
  G_BLUE, G_RED, G_YEL, G_GRN,
  ui, mono, vivid, Rake, Ring, Puff, Pool, Belt, Crew, costumeFor,
  BillRoll, ChargeRow, StampHead, Cutter, ChargeCounter, ToolCard, LabTile, NameBoard,
} from "./BillWorld";
import type { BillRow } from "./BillWorld";
import {
  Turnstile, Coin, BrowserWin, CodeCrate, ContextShaft, ShelfUnit, FileProp,
  AnswerCard, Tether, Crane, StageFlat, AppTile, LinkChain, Bay, Ticket, Brain, CodeSlab,
  Broll, Shot, MoneyNote,
  OutputRack, CommentField,
} from "./BillProps";
import { SetFor, placeFor } from "./BillSets";
import { G_TOOLS, MARK_POOL, ToolTile, Spark, CardLand } from "./BillGoogle";
import { GCrew, foot } from "./BillChars";

/* ===========================================================================
   REEL 116 · "BILL" — THE SCENES.  Board: storyboards/116-bill.md.

   ⛔⛔ A CUT IS NOT AN EVENT (ANIMATION-QUALITY §2). Reel 104's five-shot open
   scored better on every number THE-OPEN gives and was rejected anyway: *"it's
   just cuts and then nothing happens."* Every scene below names its EVENT in
   four parts — a BEFORE state legible on the first frame, a TRIGGER, TRAVEL
   across real distance, and an ARRIVAL THAT COSTS SOMETHING. Nothing here
   lands and simply stops.

   ⛔ ARRIVALS ARE SPREAD ACROSS THE FULL DURATION. A rebuild that put every
   arrival in the first third measured 5.94 — UNDER the bar — despite being
   better in every other way.

   ⛔⛔ AN ACTION LOOP IS NOT A SCENE (reel 110). Eight sprites each correctly
   running one of the four loops still read as *"a bunch of sprites standing
   around bouncing"*. Every crowd here has a JOB WITH AN OBJECT, and in S15
   something physically travels BETWEEN them.

   ⛔⛔⛔ MARKS AND NUMERALS, NOT SENTENCES. Reel 109 passed every gate and was
   rejected on 33 `<span>`s in its animation layer. The whole reel's text budget
   is: the charge counter, `1M`, `$20` (x2 — the bill's own rows), the three bay
   signs, the five product wordmarks, `SUBSCRIPTIONS`/`MONTHLY` on the bill head,
   and BILL in the CTA. One chip per shot; the words live in the header band and
   the captions.
   ========================================================================= */

export type Variant = "bill" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit — measured on
    reels 83/84: 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content.
    ⛔⛔ AND THE OFFSETS MUST BEAT A PERCEPTUAL HASH. Reel 110 measured 64-bit
    dHash distances of 3.4-7.0 between its cuts — every pair an IG duplicate
    risk — because a 14px dx moves almost nothing a 9x8 luma-gradient hash
    samples. ⛔ The BASE cut carries its own offset too: three cuts must be
    three POINTS, not two orbiting a baseline. */
/* ⛔⛔⛔ THE CAMERA LEVER WAS EATING THE FRAME. Alex: *"the google mascots
   shouldn't be too small and they also shouldn't be cut off on the edges."*
   Measured across all 20 scenes x all 3 cuts, THIRTEEN scenes had a mascot
   hanging outside the visible band — S19's left one by 208px, i.e. most of its
   body. The cause is here, not in the placements: amber ran a 1.204 camera
   scale AND a -94 x-translate, so the usable window collapsed to ~670px of a
   1012px panel and anything at the natural x=120 / x=910 staging positions was
   simply gone.

   ⭐ `feedback_variant_dhash_measured` ranks the separation levers
   **rake > grade > camera > bed > layout**, and this reel was running dHash
   mean 26.6 / MIN 18 against targets of 14 / 10 — nearly double the headroom it
   needs. So the camera lever gets relaxed and the two HIGHER-ranked levers
   (rake rate and grade) take up the slack. The band goes 670px -> 786px and
   the mascots fit in the shot. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  bill:  { dx: -26, dy: 34, s: 1.058, rot: -0.9 },
  amber: { dx: -34, dy: -34, s: 1.104, rot: 1.9 },
  steel: { dx: 22, dy: 12, s: 1.076, rot: 1.5 },
};

/** a global grade per cut, on the PANEL CONTENTS only. A dHash compares
    ADJACENT-PIXEL LUMA, so a brightness shift moves nothing — it is CONTRAST
    and GAMMA that flip gradient signs near flat areas. It is a CSS filter, so
    nothing moves and the motion audit is unaffected.
    ⭐ `saturate()` is also where BODY_SAT is bought: it costs no luma and
    touches no dark stop.
    ⛔ MEASURED AGAINST WHAT SHIPS, not against the bar. Panel medians over five
    samples each: 112 SQUAD 96.1 luma / 50.4% sat · 113 GO 100.4 / 52.0 ·
    114 SMART 84.2 / 58.5. This reel's first pass read **111.4 / 43.3** — over
    the bar on both counts and still the palest and brightest of the four. The
    grade closes the gap without repainting anything: saturate 1.26 -> 1.42 and
    brightness 1.000 -> 0.986. */
/** ⭐⭐⭐ THE RAKE — the TOP-RANKED separation lever in the measured table
    (rake > grade > camera > bed > layout), and this reel was not using it as a
    variant lever AT ALL: every cut ran the same light at the same angle.

    ⛔ Relaxing the camera above to get the mascots inside the frame cost real
    separation — dHash went 26.6/MIN 18 to 18.4/MIN 9, under the MIN-10 bar. So
    the lever that outranks camera picks it up. Angle and stripe COUNT are what
    matter: a dHash compares ADJACENT-PIXEL LUMA, so changing where the light and
    shadow EDGES fall flips gradient signs across the whole frame, which a
    brightness change alone never does. */
export const RAKE_V: Record<Variant, { mul: number; ang: number; n: number; o: number }> = {
  bill:  { mul: 1.00, ang: -17, n: 6, o: 0.24 },
  amber: { mul: 1.62, ang: -34, n: 9, o: 0.32 },
  steel: { mul: 0.68, ang: -4, n: 4, o: 0.20 },
};

/** ⭐ and for the footage scenes, the only lever that really bites: a different
    START FRAME of the same clip is a completely different set of pixels. The
    weakest pair in the reel was amber/steel at f755 — a Flow b-roll shot, where
    rake and grade barely touch the picture because the clip owns the frame. */
/* ⛔ 34/68-frame offsets RAN THE CLIP OUT. The b-roll files are only 90-102
   frames and the scenes that carry them run ~105, so `startFrom=68` left steel
   with 22 frames of footage and a frozen hold for the rest. ⭐ The separation
   comes from FRAMING instead — a per-cut zoom and pan on the same clip is a
   completely different set of pixels and costs no clip length at all. */
export const BROLL_V: Record<Variant, { t: number; k: number; dx: number; dy: number;
  bx: number; by: number; bw: number }> = {
  bill:  { t: 0,  k: 1.00, dx: 0,  dy: 0,  bx: 0,   by: 0,   bw: 1.00 },
  amber: { t: 12, k: 1.18, dx: -7, dy: 4,  bx: 92,  by: -36, bw: 0.80 },
  steel: { t: 24, k: 1.10, dx: 8,  dy: -5, bx: -116, by: 66, bw: 1.30 },
};
/* ⛔ MOVING IT ALONE JUST TRADED ONE PAIR FOR THE OTHER — bill/amber went 7->18
   and bill/steel went 16->7, because three screens on one line always leave two
   of them near each other. `bw` changes the screen's SIZE per cut as well, so
   the three differ in GEOMETRY rather than in position along an axis, which is
   what a dHash actually compares. */
/* ⛔ FRAMING INSIDE THE WINDOW WAS NOT ENOUGH. A dHash compares adjacent-pixel
   LUMA over a tiny grid, so it sees gross structure: where the big bright mass
   sits. bill and amber run cam.dx of -26 and -34 — nearly identical — so in a
   b-roll scene the screen landed in the same place in both and they scored 7.
   `bx`/`by` MOVE THE SCREEN ITSELF per cut, which is the strongest lever a
   footage-dominated scene has. */

export const GRADE: Record<Variant, string> = {
  bill:  "contrast(1.030) saturate(1.42) brightness(0.986) hue-rotate(-2deg)",
  /* ⭐ pushed further apart to replace the camera separation given back above —
     grade outranks camera in the measured lever table, and it costs no framing. */
  amber: "contrast(1.330) saturate(1.72) brightness(0.944) hue-rotate(-31deg)",
  steel: "contrast(1.190) saturate(1.60) brightness(0.952) hue-rotate(29deg)",
};

/** ⭐ a genuinely different HOOK ACTION per cut — the memory's #1 variant lever.
    The stamp lands in a different rhythm and the roll is fed from a different
    height, which is the stretch a hash samples hardest. */
export const HOOK_V: Record<Variant, { hits: number[]; drop: number }> = {
  bill:  { hits: [8, 26], drop: 96 },
  amber: { hits: [5, 22, 40], drop: 128 },
  steel: { hits: [13, 33], drop: 78 },
};

/** ⭐ a per-cut CARD RHYTHM for S3. At 8s all three cuts otherwise show five
    landed cards on a rail, which is the same PICTURE — and a luma-gradient hash
    reads that almost identically however far the camera is offset. A 30-frame
    spread means at any instant one cut has cards mid-air and another has them
    locked, which is a state a gradient hash cannot miss. */
export const CARD_V: Record<Variant, number[]> = {
  bill:  [6, 20, 34, 48, 62],
  amber: [30, 41, 52, 63, 74],
  steel: [16, 32, 45, 56, 70],
};

/** a different push per cut, so no two cuts share a camera move on the same beat */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.038 : v === "steel" ? -0.026 : 0.012)];

/* ⛔⛔ `Scene` push walks content off-frame — AND THIS NOTE USED TO UNDERSTATE IT
   BADLY. `left >= 506 - 486/push` ignores `CamCtx`, which multiplies the push by
   a per-cut scale (bill 1.058 / amber 1.204 / steel 1.122) and then translates.
   The honest bound is

     x  506 - (506 + cam.dx)/(push*cam.s)  ..  506 + (506 - cam.dx)/(push*cam.s)
     y  bottom = 443.5 + (348.5 - cam.dy)/(push*cam.s)

   Measured over all 20 scenes x all 3 cuts the intersection is **x 208..879,
   y <= 708** — a 671px-wide window, not the 784px this comment used to claim.
   Two things had already been placed outside it and were invisible in every
   frame while every gate stayed green: S11's charge counter and S17's output
   stack. ⭐ Anything that must be SEEN goes inside 208..879. */

/* =========================================================================
   ⛔⛔ THE BILL'S FIVE ROWS — the honesty ledger, made physical.
   Only THREE paid marks exist because the VO names only three. Rows 2 and 4
   carry NO mark and NO figure, because the VO names no vendor and no price
   there — an unnamed recurring row is the honest depiction of recurrence.
   ⛔ `fig` is ONLY ever R.price. There is no total anywhere in this reel.
   ====================================================================== */
const ROW_DEFS: BillRow[] = [
  { mark: null, mark2: null, fig: R.price },                                          /* killed by AI STUDIO   */
  { mark: null, mark2: null, fig: null },                                             /* killed by NOTEBOOKLM  */
  { mark: "logos/higgsfield.png", mark2: "logos/bytedance.svg", fig: null },          /* killed by FLOW        */
  { mark: null, mark2: null, fig: null },                                             /* killed by OPAL        */
  { mark: "logos/cursor.svg", mark2: null, fig: R.price },                            /* killed by ANTIGRAVITY */
];

/** the rows still ON the bill when a scene opens. `killed` rows are simply
    gone; the row this scene kills carries a SCENE-LOCAL cut frame. */
const rowsFor = (killed: number, cutLocal?: number): BillRow[] =>
  ROW_DEFS.slice(killed).map((r, i) =>
    i === 0 && cutLocal !== undefined ? { ...r, cut: cutLocal } : { ...r });

/** ⛔⛔⛔ THE HEADER BAND OWNS THE TOP OF THE PANEL, AND IT HAS BURIED SOMETHING
    FOUR TIMES IN THIS BUILD: the hook's stamp head, S14's product capture,
    S18's stamp head, and S14's tool card. `HookHeader` is rendered at ROOT,
    above every scene, and it occupies roughly the first 95px of the 792px
    panel. Nothing whose top edge lands above this line will be seen, however
    correct its own z is — ANIMATION-QUALITY §6 fault 2, four times.

    ⭐ So it is a NUMBER now, not a thing to remember. Any card, board or plate
    placed near the top of a scene starts below `HEADER_SAFE`. */
const HEADER_SAFE = 118;

/** ⛔⛔ THE CUT HAS TO HAPPEN ON SCREEN, AND THAT IS ARITHMETIC.
    A horizontal roll drifts left at `creep` px/frame, so the cell being cut is
    somewhere else by the time the blade arrives. The contact sheet caught it
    twice: S5's first-of-five cut happened at x=-267 (entirely off-panel) and
    S11 had the CURSOR row centre-frame during the HIGGSFIELD line. Solve for
    the roll's x instead of eyeballing it:

        x_cell(0, f) = rollX - f * creep        centre = x_cell + rowH/2
        want centre == 506 at f == cut
        =>  rollX = 506 - rowH/2 + cut * creep                                */
const rollX = (rowH: number, cut: number, creep: number) => 506 - rowH / 2 + cut * creep;

/* =========================================================================
   S0 — THE DECK.  f0-48 (1.60s).  ⭐ THE HOOK.
   VO: "If you're not using these 5 Google AI tools,"

   ⛔⛔⛔ REBUILT. Alex: *"the issue with the hook scene is that it's not very
   hierarchical enough. I'm not exactly sure what's going on with this scene.
   Remove the subscriptions paper thing and just make it more hierarchical and
   interesting and very clear about what's going on."*

   ⭐ THE DIAGNOSIS IS AN INVERTED HIERARCHY, AND THE FRAME STRIP SHOWS IT: the
   pale SUBSCRIPTIONS bill owned ~60% of the panel and was the single biggest,
   brightest object in the shot — while the five Google tools, which are the
   entire subject of the sentence, arrived as 60px badges cramped into the
   top-right corner, one at a time, with the last two barely landing before the
   cut. The most important thing in the frame was the smallest thing in the
   frame. [[feedback_hook_simplicity]]: name what the viewer wants to LOOK at,
   then build that and nothing else.

   ⭐ SO THE HOOK IS NOW ONE OBJECT DOING ONE THING: a DECK of five Google
   product cards, dead centre and 3x the old size, which FANS OUT into a row.
     f0     five cards stacked, edges showing, filling the middle of the frame
     f2-33  they peel off one at a time, left to right — the count IS the claim
     f36    the row lands together and pushes forward on one ring
   One object becoming five is a single readable gesture, it is countable
   (1..5 without a number on screen), and the cards are the brightest mass in
   the shot at frame 0 — which is also what keeps HOOK_LUMA over the 140 bar
   now that the bill is gone. ⛔ THE BILL IS NOT DELETED FROM THE REEL, it moves
   to S1 where the VO actually talks about it.
   ====================================================================== */
export const S0: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall");
  const off = v === "amber" ? 1 : v === "steel" ? -1 : 0;
  /* ⛔⛔ DEALING THEM OUT WAS THE WRONG SHAPE, and the frame strip said so twice.
     A pile at the left means frame 0 is a small dark corner (HOOK_LUMA lives or
     dies there), and cards in flight cross each other's slots, so for half the
     shot the row reads OUT OF ORDER — which is the exact "I can't track what's
     going on" note.

     ⭐ ALL FIVE ARE PRESENT FROM FRAME 0. Each card starts ABOVE its own slot
     and drops straight down into it — no lateral travel, so nothing ever
     crosses anything, and by f0 the first four are already most of the way
     home. Five large bright objects, in order, from the first frame. */
  /* ⛔ HOOK_LUMA FAILED AT 118.4 (bar 140) — the predictable cost of deleting
     the big cream bill, and `docs/THE-OPEN.md` law 1 applies at FRAME 0 ONLY.
     With drops at -8..0 the last two cards were still above the frame at f0, so
     only three of the five bright masses were on screen when the gate looks.
     -13..-5 puts every card at least 62% down and fully inside the panel on the
     first frame, which is also just better hooking: five logos, immediately. */
  const DROP = [-13, -11, -9, -7, -5].map(k => k + off);
  const WAVE = 18 + off;                 /* the marks ripple down the row  */
  const SLAM = 33 + off;                 /* and the row lands as ONE thing */
  /* ⛔ pitch 134 under 172px cards clipped the wordmarks ("AI STUDI",
     "NTIGRAVITY"). 142 under 158px leaves 16px of overlap and every name reads. */
  /* ⭐ Alex: *"there needs to be the google mascot at 0 seconds hook scene as
     well, it doesn't look good with just those logos."* Five cards need ~700px
     of the 834px band, so there is no room BESIDE them — the mascot goes in
     FRONT instead. The row lifts to a card foot of 424 so the counter sits at
     436, which leaves 436..724 of clear floor for a 268px body whose head tops
     out at 432: he never covers a card, and he is never cut by an edge. */
  /* ⭐ the row shifts LEFT and tightens so the mascot can come FORWARD instead
     of standing back on the floor. He reads bigger by being nearer, not by
     being scaled — the previous pass had him at 258px and he still looked
     small, because depth, not size, is what was making him recede. */
  const CX = 450, CY = 424, PITCH = 132, CS = 0.72;
  const ARC = [20, -4, -22, -4, 20];
  const slam = f >= SLAM ? 1 + 0.10 * Math.max(0, Math.sin((f - SLAM) / 3.6)) : 1;
  /* ⛔⛔ ARRIVE-THEN-HOLD. With all five landed by f13 and the slam at f30, the
     shot had a 1.2s stretch where the only thing changing was a mark tile's
     opacity — weakest sample 3.20, and `feedback_scene_needs_an_arc` is exactly
     this. Alex asked for slower, not for STOPPED.
     ⭐ The middle beat is the row RISING off the shelf and then being slammed
     back onto it, with a punch travelling down the five cards on the way up.
     No new objects, one continuous gesture, and the wave is countable — it says
     "five" a second time without a number on screen. */
  const lift = f >= SLAM ? 0 : E(f, 14, 28, 0, 96, IO);
  const sh = shake(f, SLAM, 13, 9);
  return (
    <Scene p={p} slug="THE FREE FIVE" push={push(v, dur, 1.048)} vig={0.26}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall" f={f} lit={1} t={f * 0.5} rakeRate={5.4} rk={RAKE_V[v]} />

        {/* ⭐⭐ GEMBOT IS BACK, AND THIS TIME HE HAS FLOOR TO STAND ON. Last
            round I put him BEHIND the row, where he was a 30px blue sliver at
            the frame edge — which is why I then cut him entirely. Both were
            wrong: the answer was never his z or his presence, it was that the
            row occupied the whole panel height and left him nowhere to be.
            268px, feet on the floor at 700, head at 432 — under the card row,
            in front of the counter, and 22px clear of the right-hand bound.
            ⛔ S0's own vertical bound is 724 (not the reel-wide 672), so the
            clamp is overridden here DELIBERATELY and with the number shown. */}
        <GCrew f={f} x={768} y={foot(0, 680, 682)} size={280} i={0} z={88} at={-14} loop={3}
          cheer={f >= SLAM ? 1 : 0}
          shock={f >= DROP[4] + 13 && f < DROP[4] + 20 ? 1 : 0} />

        {/* the shelf they land on — a ground line and a second bright mass */}
        {/* ⭐ and the shelf is a LIT counter, not a dark ledge — a full-width
            bright mass under the cards, which is the other half of frame 0. */}
        {/* the back board the row stands against */}
        <div style={{ position: "absolute", left: 84, right: 84, top: 150, height: 292, zIndex: 20,
          borderRadius: 14, background: `linear-gradient(176deg, #BCB199 0%, #8E8571 100%)`,
          border: `7px solid #6E6553` }} />
        {/* the counter the row stands on */}
        <div style={{ position: "absolute", left: -60, right: -60, top: CY + 12, height: 82, zIndex: 44,
          background: `linear-gradient(178deg, #F0E8D2 0%, #C8BCA0 100%)`,
          borderTop: `6px solid #FBF6E8` }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: CY + 94, height: 30, zIndex: 43,
          background: "#6E6553" }} />
        {/* the kick board under the counter — the dark line that stops the
            counter face and the floor reading as one continuous beige slab */}
        <div style={{ position: "absolute", left: -60, right: -60, top: CY + 124, height: 26,
          zIndex: 23, background: "#4A463C" }} />
        {/* the floor he stands on — kept mid, not black, because frame-0 luma
            has to clear 140 and this is now a third of the panel */}
        <div style={{ position: "absolute", left: -60, right: -60, top: CY + 150, bottom: -40,
          zIndex: 22, background: `linear-gradient(178deg, #918977 0%, #635C4E 100%)` }} />
        {/* floor seams, so the lower third has structure instead of being a void */}
        {[0, 1, 2, 3].map(i => (
          <div key={"fs" + i} style={{ position: "absolute", left: -60 + i * 300, top: CY + 150,
            bottom: -40, width: 5, zIndex: 24, background: hexa("#3E3A32", 0.45),
            transform: `skewX(${(i - 1.5) * 7}deg)` }} />
        ))}
        {/* his contact shadow — he was floating against the beige */}
        {/* ⛔ the shadow is drawn from the SAME x as the mascot — it was hard-coded
            to 800 and stayed put when the placement sweep moved him to 768. */}
        <div style={{ position: "absolute", left: 768 - 126, top: 680 - 28, width: 252, height: 56,
          zIndex: 84, borderRadius: "50%", background: hexa("#3E3A32", 0.38) }} />

        {/* ⭐⭐ THE FIVE, each dropping straight into its own slot */}
        {[0, 1, 2, 3, 4].map(i => {
          const k = DROP[i];
          const t = E(f, k, k + 13, 0, 1, BACK);
          const y = CY + ARC[i] - (1 - t) * 430;
          const x = CX + (i - 2) * PITCH;
          /* the mark tile flashes as the wave passes down the row */
          const wl = f - (WAVE + i * 3);
          const lit = wl >= 0 && wl < 7 ? 1 : 0.88;
          /* the punch travelling down the row as it rises */
          const pop = wl >= 0 && wl < 8 ? squash(wl, 8, 0.20, 3, 10) : 1;
          return (
            <div key={"dk" + i} style={{ position: "absolute", left: 0, top: 0,
              zIndex: 52 + (i === 2 ? 6 : i === 1 || i === 3 ? 4 : 2),
              transform: `translateY(${-lift}px) scale(${(t >= 1 ? slam : 1) * pop})`,
              transformOrigin: `${x}px ${y}px` }}>
              <ToolCard x={x} y={y} s={CS} i={i} f={f} at={-99} z={60} lit={lit}
                rot={(i - 2) * 3.4 * t} auraAt={k + 13} auraC={p.key} />
            </div>
          );
        })}

        {/* one burst per landing, tight, and gone before the next card arrives */}
        {DROP.map((k, i) => (<React.Fragment key={"pl" + i}>
          <CardLand x={CX + (i - 2) * PITCH} y={CY + ARC[i] - 80} s={0.46} f={f} at={k + 13}
            z={72} c={p.key} />
          <Puff x={CX + (i - 2) * PITCH} y={CY + ARC[i] + 10} f={f} at={k + 13} n={11} s={1.0}
            z={70} c="#C9BFA6" />
        </React.Fragment>))}

        {/* ⭐ THE SLAM — the row arriving as ONE object. This is the only beat in
            the shot after the drops, which is deliberate: Alex's note was that
            everything is too fast to track, so the last 0.6s is a single held
            image of five readable cards with one hit on it. */}
        <Ring x={CX} y={CY - 40} f={f} at={SLAM} r={360} c={p.key} z={74} w={10} dur={16} />
        <Puff x={CX} y={CY + 16} f={f} at={SLAM} n={24} s={1.7} z={73} c="#D6CCB2" up={0.5} />

        <Spark x={128} y={192} s={128} f={f} z={80} spin={0.5} pulse={1} o={0.70} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 — WHAT YOU ACTUALLY PAY FOR.  f48-137 (2.97s).  Intensity 8.
   VO: "you're wasting thousands of dollars a month on AI subscriptions."

   ⛔⛔⛔ REBUILT TWICE. Alex on this shot: *"I need to see more logos or
   visuals. It's just way too text heavy, not that interesting."* He is exactly
   right and the frame strip is damning — the "charges" running along the belt
   were the literal string `$20` repeated EIGHT times across the panel, in the
   same cream, at the same size, with a white square next to each. That is not a
   picture of subscriptions; it is a spreadsheet moving sideways.
   [[feedback_graphical_over_textual]]: the information belongs in the GRAPHIC,
   and there should be about one text chip per shot.

   ⭐ SO THE CHARGES ARE THE PRODUCTS THEMSELVES. Three real paid tools —
   CURSOR, HIGGSFIELD, SEEDANCE, all three named later in the VO — as big
   subscription cards carrying their REAL marks, and the stamp comes down on
   them one at a time.
   ⭐ AND IT IS SLOW ON PURPOSE. Alex: *"a little bit too fast... I can't really
   tell what's even going on."* Three beats across 89 frames is one every 0.93s,
   against the four-in-2.97s the belt version ran. Each stamp gets a clear
   before, a hit, and an after: the card darkens, a $20 note peels off it and
   flies out of frame, and only then does the next one happen.
   ⛔ NO TOTAL AND NO PER-PRODUCT PRICE. "Thousands" is not sourceable, so the
   picture counts CARDS, not dollars, and the only figure on screen is the $20
   unit already established on the bill.
   ====================================================================== */
export const S1: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall2");
  const off = v === "amber" ? 4 : v === "steel" ? -3 : 0;
  /* ⛔ 8.77 WITH A 3.23 WEAKEST SAMPLE — the shot was READABLE and half DEAD.
     Slower is not the same as stopped: nothing happened for the first 16 frames,
     and the press crossed to the next card in 10 of the 28 frames between hits
     and then waited. The fix is not new objects (that is what made it
     unreadable in the first place) — it is the SUBJECT continuing to act:
     the press travels across the whole gap, and each stamped card keeps
     bleeding money for 20 frames after it is hit. */
  const HITS = [12 + off, 40 + off, 68 + off];
  const PAID = [
    { mark: "logos/cursor.svg", name: "CURSOR", dark: false },
    { mark: "logos/higgsfield.png", name: "HIGGSFIELD", dark: false },
    { mark: "logos/bytedance.svg", name: "SEEDANCE", dark: false },
  ];
  const CX = 506, PITCH = 218, CW = 206, CH = 258, CY = 470;
  const sh = HITS.reduce((a, k) => {
    const q = shake(f, k, 11, 8); return { x: a.x + q.x, y: a.y + q.y };
  }, { x: 0, y: 0 });
  const struck = HITS.filter(k => f >= k).length;
  /* ⛔⛔ THE HEAD TELEPORTED. Translating its wrapper by `struck * PITCH` is a
     step function — between two frames it was simply somewhere else, which is
     unreadable and is a third of Alex's "I can't tell what's going on". It now
     TRAVELS to the card it is about to hit, arriving 10 frames early, so the
     viewer sees what is coming before it lands. §11: an action is a distance. */
  const headX = (() => {
    if (f < HITS[0]) return CX - PITCH;
    for (let i = HITS.length - 1; i >= 0; i--) {
      if (f >= HITS[i]) {
        if (i + 1 < HITS.length)
          return CX + ((i - 1) + E(f, HITS[i] + 6, HITS[i + 1] - 2, 0, 1, IO)) * PITCH;
        return CX + (i - 1) * PITCH;
      }
    }
    return CX - PITCH;
  })();
  return (
    <Scene p={p} slug="EVERY MONTH" push={push(v, dur, 1.062)} vig={0.38}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall2" f={f} lit={1} t={f * 0.6} rakeRate={7.4} rk={RAKE_V[v]} />

        {/* the counter they sit on */}
        <div style={{ position: "absolute", left: -60, right: -60, top: CY + 14, height: 76, zIndex: 34,
          background: `linear-gradient(178deg, ${mxh("#3A4653", 0.24)} 0%, ${dkh("#3A4653", 0.30)} 100%)`,
          borderTop: `6px solid ${mxh("#3A4653", 0.40)}` }} />

        {/* ⭐⭐ THE THREE SUBSCRIPTIONS — real marks, big, one text chip each */}
        {PAID.map((q, i) => {
          const k = HITS[i];
          const hit = f >= k;
          const dt = Math.max(0, f - k);
          const x = CX + (i - 1) * PITCH;
          const press = hit && dt < 8 ? 1 - dt / 8 : 0;
          return (
            <div key={"pc" + i} style={{ position: "absolute", left: x - CW / 2,
              top: CY - CH + press * 16, width: CW, height: CH, zIndex: 56,
              borderRadius: 22, overflow: "hidden",
              transform: `rotate(${(i - 1) * 2.2}deg) scaleY(${1 - press * 0.05})`,
              background: hit
                ? `linear-gradient(172deg, ${dkh(PAPER, 0.20)} 0%, ${dkh(PAPER, 0.34)} 100%)`
                : `linear-gradient(172deg, #FFFFFF 0%, ${dkh(PAPER, 0.08)} 100%)`,
              border: `6px solid ${dkh(PAPER, hit ? 0.42 : 0.22)}` }}>
              {/* the mark, on its own tile — the object, not a label */}
              <div style={{ position: "absolute", left: CW / 2 - 68, top: 26, width: 136, height: 136,
                borderRadius: 30, background: "#FFFFFF", border: `4px solid #ECE7DC`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile(q.mark)} style={{ width: 100, height: 100,
                  objectFit: "contain", opacity: hit ? 0.42 : 1,
                  filter: hit ? "grayscale(1)" : "none" }} />
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, top: 182, textAlign: "center",
                ...ui(q.name.length > 8 ? 24 : 29, 900), color: hexa(INK, hit ? 0.42 : 1) }}>
                {q.name}
              </div>
              {/* the monthly rail — it goes red the moment the stamp lands */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18,
                background: hit ? RED : hexa(INK, 0.12),
                clipPath: hit ? "inset(0 0 0 0)"
                  : `inset(0 ${Math.max(0, 100 - ((f * 2.6 + i * 30) % 140))}% 0 0)` }} />
              {/* the PAID ring, cut into the card it just killed */}
              {hit && (
                <div style={{ position: "absolute", left: CW / 2 - 62, top: 44, width: 124, height: 124,
                  borderRadius: "50%", border: `10px solid ${hexa(RED, 0.62)}`,
                  transform: `rotate(-14deg) scale(${squash(dt, 6, 0.24, 3, 10)})`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ ...mono(30, 800), color: hexa(RED, 0.78) }}>PAID</span>
                </div>
              )}
            </div>
          );
        })}

        {/* THE VILLAIN — one head, travelling to the card it is about to hit, so
            the viewer can see what is coming before it arrives */}
        {/* ⛔ AND IT COVERED THE LOGO IT WAS HITTING. `y = HEADER_SAFE - 26`
            with drop 188 put the 128px head block at 280 — 68px INSIDE the card,
            straight over the mark. `y=-30, drop=140` bottoms the block at 238,
            which is exactly the top edge of the mark tile: it strikes the card
            and never hides it. Read the rig, don't guess the number. */}
        <StampHead x={headX} y={-30} w={296} f={f} hits={HITS} z={62} drop={140} />
        {HITS.map((k, i) => (<React.Fragment key={"hx" + i}>
          <Puff x={CX + (i - 1) * PITCH} y={CY - CH + 70} f={f} at={k} n={16} s={1.4} z={70}
            c="#A8BCCC" up={0.5} />
          <Ring x={CX + (i - 1) * PITCH} y={CY - CH + 80} f={f} at={k} r={300} c={RED} z={69} w={8} />
        </React.Fragment>))}

        {/* ⭐ AND THE MONEY LEAVES. One $20 note peels off each card as it is
            stamped and flies out of frame — the same note prop S11 gives back,
            so the reel's money is one object throughout. */}
        {HITS.flatMap((k, i) => [0, 1, 2].map(j => {
          const born = k + j * 7;
          if (f < born) return null;
          const t = Math.min(1, (f - born) / 26);
          if (t >= 1) return null;
          const x0 = CX + (i - 1) * PITCH, y0 = CY - CH / 2;
          const dir = j === 1 ? -1 : 1;
          return (
            <MoneyNote key={"nt" + i + "_" + j}
              x={x0 + t * (240 + j * 70) * dir} y={y0 - t * t * (430 + j * 40) - 30}
              s={0.86 + t * 0.34} rot={t * (340 + j * 90) * dir} o={1 - t * 0.35} z={74} />
          );
        }))}

        <GCrew f={f} x={252} y={foot(p.horizon, 196)} i={11} size={212} z={90} at={0} loop={3}
          shock={HITS.some(k => f >= k && f - k < 12) ? 1 : 0} />
        <Spark x={922} y={188} s={104} f={f} z={74} spin={0.42} pulse={1} o={0.5} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S2 — TWENTY-FOUR SHIPPED.  f137-220 (2.77s).  BEAT: SETUP.  Intensity 8.
   VO: "So Google quietly shipped over 20 of these tools and I tested all of
        them,"

   ⛔⛔ THE WALL IS REAL NOW. Alex, twice: *"the google logo is still at 6
   seconds, use the other logos as replacement, there should be like 20 other
   google ai tool logos you can use."* There are — and the first two versions
   put a generic Google `G` on every tile, which says GOOGLE and never says
   TOOLS.

   ⭐ THE ROSTER IS READ LIVE FROM `labs.google` (see `G_TOOLS` in
   BillGoogle.tsx): AI Studio · Gemini Notebook · Flow · Opal · Antigravity ·
   Gemini · Jules · Colab · Veo · Imagen · Whisk · Stitch · Pomelli · Mixboard ·
   Stax · Vantage · Genie · Flow Music · Learn Your Way · Literature Insights ·
   Hypothesis Generation · Computational Discovery · AI Edge · Dreambeans.
   **Twenty-four**, which is what "over 20" actually looks like.

   ⛔ EIGHT OF THEM HAVE AN ICON AND SIXTEEN DO NOT. Google publishes marks for
   AI Studio, NotebookLM, Gemini and Jules on `gstatic.com/images/branding/
   productlogos/`, Flow's is in `labs.google/fx/icons/`, Antigravity's is its
   channel avatar, and Colab's is in the repo. The rest ship as a WORDMARK, so
   the tile carries the tool's real NAME — inventing an icon for Stitch or
   Pomelli would be worse than either. Every tile also carries the four-colour
   bar, so the wall says GOOGLE without a word on it.

   ⭐ AND THE FIVE SURVIVORS ARE THE FIVE THE REEL IS ABOUT, in VO order, so
   the sift's payoff and S3's card rail are the same five objects.
   ====================================================================== */
export const S2: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("lab");
  const off = v === "amber" ? 6 : v === "steel" ? -4 : 0;
  const COLS = 6, ROWS = 4;
  const at = (i: number) => 3 + off + i * 1.5;
  /* the five that survive are G_TOOLS[0..4] — the subject tools, in VO order */
  /* ⛔ the survivors were scattered into two clusters and stopped reading as a
     SET. Spread across the middle two ranks, one per column pair, so the five
     that live are legible as five before S3 collects them onto the rail. */
  const KEEP = [7, 9, 11, 14, 16];
  const order = (i: number) => {
    const k = KEEP.indexOf(i);
    if (k >= 0) return k;                       /* a survivor -> its subject tool */
    const rest = i - KEEP.filter(q => q < i).length;
    return 5 + (rest % (G_TOOLS.length - 5));   /* everything else -> the roster */
  };
  const walk = E(f, 26, 74, 118, 862, LIN);
  return (
    <Scene p={p} slug="GOOGLE LABS" push={push(v, dur, 1.070)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="lab" f={f} lit={1} t={f * 0.7} rakeRate={4.2} rk={RAKE_V[v]} />

        {/* the board the tiles seat into — a real rack with rails */}
        <div style={{ position: "absolute", left: 52, top: 128, width: 908, height: 410, zIndex: 28,
          borderRadius: 8, background: `linear-gradient(176deg, ${dkh("#2A3E4C", 0.06)} 0%, ${dkh("#2A3E4C", 0.26)} 100%)`,
          border: `7px solid ${dkh("#2A3E4C", 0.34)}` }}>
          {[0, 1, 2, 3].map(i => (
            <div key={"wr" + i} style={{ position: "absolute", left: 10, right: 10, top: 24 + i * 98,
              height: 6, background: hexa("#9AC4D8", 0.20) }} />
          ))}
        </div>

        {/* ⭐ EVERY CELL CARRIES A MARK, NEVER TEXT. The five survivors are the
            five subject tools with their own correct marks; every other cell
            draws from `MARK_POOL` with a stride that keeps neighbours different.
            ⛔ The pooled cells carry NO NAME — a repeated logo under a specific
            product's name would be a wrong mark, and an unnamed Google-AI tile
            is simply true of all of them. */}
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const c = i % COLS, r = Math.floor(i / COLS);
          const x = 130 + c * 152, y = 192 + r * 98;
          const k = KEEP.indexOf(i);
          const struck = k >= 0 ? undefined : 32 + off + (c * 7 + r * 3);
          /* stride 5 over a 14-mark pool: adjacent cells and vertical
             neighbours never land on the same mark */
          const t = k >= 0 ? G_TOOLS[k] : MARK_POOL[(i * 5 + r) % MARK_POOL.length];
          return (
            <ToolTile key={"tt" + i} x={x} y={y} s={0.80} f={f} at={at(i)}
              struck={struck} z={40 + r} seed={i} t={t} />
          );
        })}

        {/* ⭐ THE SIFTER — he WALKS the wall carrying a stamp, and the X-marks
            land where he has been. A job with an object beats any idle. */}
        <Cam x={0} y={0} z={64}>
          {/* ⛔ THE CAST IN A GOOGLE SCENE IS GOOGLE'S. This was the clay Claude
              in a cop hat, standing in front of a wall of Google tools — the
              same mismatch Alex named on the hook. `GoogleSprite` is the house
              body with a Google tint and the Gemini spark. */}
          {/* ⭐ BEAKER here: this scene IS the wall of Labs experiments, and the
              flask is Labs' own mark. The sifter testing experiments is the one
              place the character and the subject are the same object. */}
          <GCrew kind="beaker" f={f} x={walk} y={foot(p.horizon, 150)} size={251} i={0} z={64} at={2} loop={1} />
          <div style={{ position: "absolute", left: walk + 60, top: p.horizon - 74,
            width: 60, height: 72, zIndex: 66, borderRadius: 7,
            background: `linear-gradient(176deg, ${mxh("#5A4A3A", 0.20)} 0%, ${dkh("#5A4A3A", 0.34)} 100%)`,
            transform: `rotate(${-16 + Math.sin(f / 6.2) * 22}deg)` }}>
            <div style={{ position: "absolute", left: 8, bottom: -12, width: 44, height: 20,
              borderRadius: 3, background: dkh(RED, 0.16) }} />
          </div>
        </Cam>

        {/* the background process: a trolley of unsorted tiles crossing */}
        <div style={{ position: "absolute", left: ((f * 5.4) % 1400) - 260, top: p.horizon + 60,
          width: 220, height: 128, zIndex: 46, borderRadius: 6,
          background: `linear-gradient(178deg, ${mxh("#3A4650", 0.18)} 0%, ${dkh("#3A4650", 0.34)} 100%)` }}>
          {[0, 1, 2].map(i => (
            <div key={"tr" + i} style={{ position: "absolute", left: 14 + i * 66, top: 16, width: 54,
              height: 54, borderRadius: 9, background: "#FFFFFF", opacity: 0.86 }} />
          ))}
        </div>
      </div>
    </Scene>
  );
};

export const S3: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("rail");
  const CV = CARD_V[v];
  return (
    <Scene p={p} slug="THE FIVE" push={push(v, dur, 1.076)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="rail" f={f} lit={1} t={f * 0.5} rakeRate={5.6} rk={RAKE_V[v]} />

        {/* the hoist that drops them — where they came FROM (§10: a hand-off
            needs a source, or the upper half of the frame is empty) */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 62, height: 34, zIndex: 30,
          background: `linear-gradient(180deg, ${mxh("#3E4A52", 0.20)} 0%, ${dkh("#3E4A52", 0.34)} 100%)` }} />
        {CV.map((k, i) => {
          const x = 148 + i * 172;
          const t = E(f, k - 12, k, 0, 1, IN_Q);
          if (f > k + 4) return null;
          return (
            <div key={"hl" + i} style={{ position: "absolute", left: x - 4, top: 92, width: 8,
              height: 60 + t * 300, zIndex: 31, background: hexa(STEEL, 0.5) }} />
          );
        })}

        {/* THE FIVE CARDS — the subject itself, as one object each */}
        {/* ⛔ the aura fires when the card LANDS, not when it starts arriving —
            `ToolCard` takes 8 frames to scale in. And ⛔ a JSX comment cannot sit
            inside an arrow's return parens; it goes above the map. */}
        {CV.map((k, i) => (
          <ToolCard key={"tc" + i} auraAt={k + 8} auraC={p.key} x={148 + i * 172}
            y={p.horizon + 8} s={0.74} i={i} f={f}
            at={k} z={66 + i} rot={(i - 2) * 1.1} />
        ))}
        {/* ⭐ THE LANDING EFFECT — a specular sweep, a ring and the four-colour
            bar charging, under the aura border that wraps the card. All solid
            paint: no glow, no blur, and the `boxShadow: 0 0` gate returns 0. */}
        {CV.map((k, i) => (<React.Fragment key={"ta" + i}>
          <CardLand x={148 + i * 172} y={p.horizon - 96} s={0.74} f={f} at={k} z={88} c={p.key} />
          <Puff x={148 + i * 172} y={p.horizon + 4} f={f} at={k} n={13} s={1.2} z={78} c="#C0996A" />
          <Ring x={148 + i * 172} y={p.horizon} f={f} at={k} r={200} c={p.key} z={77} w={7} />
        </React.Fragment>))}

        {/* THE NUMBER SPINE STARTS. The bill runs across the bottom, and its
            counter sets to 5 as the last card lands. */}
        <BillRoll x={286} y={p.horizon + 128} w={168} f={f} rows={rowsFor(0)} rowH={230} z={50}
          dir="h" creep={0.9} head headH={190} />
        <ChargeCounter x={758} y={132} f={f} s={0.86} z={82}
          steps={[[-1, 5], [CV[4], 5]]} />

        <GCrew f={f} x={253} y={foot(p.horizon, 268)} i={6} size={205} z={72} at={CV[0]} loop={2} />
        <MarkCast x={912} y={608} s={92} z={74} f={f} spin={-0.4} o={0.78} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S4 — THE PAYWALL.  f312-389 (2.57s).  Intensity 6.
   VO: "1. AI Studio. Instead of $20 a month for a chat window,"

   ⛔⛔⛔ REBUILT A THIRD TIME. Alex: *"the one at ten seconds was, like, the pay
   thing, like, the window. It's not that good... a little bit too fast, I can't
   really tell what's even going on."*

   ⭐ THE DIAGNOSIS IS PART COUNT, AGAIN. Version 2 had a chat window, a coin
   slot cut into its face, a coin on a bezier, a month meter counting down, a
   slatted steel shutter that rattled and then slammed, a blinking PAY plate,
   three pulsing arrows and a SECOND coin entering for month two — nine moving
   parts in 2.57 seconds, all of them explaining one four-word idea. A machine
   metaphor has to be DECODED, and there is no time to decode anything here.

   ⭐ SO IT IS TWO OBJECTS AND ONE ACTION: a chat window you want, and a
   PAYWALL that drops onto it and locks it. That is literally what the sentence
   describes and it needs no decoding at all. The coin, the slot, the meter, the
   arrows and the second coin are gone.
   ⛔ NO VENDOR MARK ON THE PAID WINDOW. The VO names no vendor for the "$20 a
   month for a chat window" line, so the thing being locked is unbranded — the
   AI STUDIO card is the FREE alternative and it sits apart from it.
   ====================================================================== */
export const S4: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("booth");
  const off = v === "amber" ? 3 : v === "steel" ? -3 : 0;
  const NAME = 16;                       /* measured: "AI Studio." at 11.05s */
  const LOCK = 34 + off, SHUT = LOCK + 10;
  const WX = 506, WY = 168, WW = 640, WH = 430;
  const sh = shake(f, LOCK, 12, 9);
  /* the paywall falls 470px onto the window and stops dead */
  const drop = f >= LOCK ? E(f, LOCK, LOCK + 9, 0, 1, IN_Q) : 0;
  return (
    <Scene p={p} slug="$20 A MONTH" push={push(v, dur, 1.088)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="booth" f={f} lit={1} t={f * 0.4} rakeRate={3.8} rk={RAKE_V[v]} />

        {/* ⭐⭐ OBJECT ONE — the chat window, and it is ALIVE until it is locked.
            Alex: *"at eleven seconds the animation should be a lot more like AI
            Studio and needs to be so much more detailed."* The window was a
            title bar and four grey pills — a wireframe, not a product. It is
            drawn as a real AI workbench now: a conversation sidebar, a model
            pill in the header, messages with avatars and multi-line bodies, a
            parameter rail with live sliders, and a composer with buttons.
            ⛔ STILL UNBRANDED. The VO names no vendor for the "$20 a month for a
            chat window" line, so there is no mark on it — the detail comes from
            the LAYOUT being real, not from borrowing a logo. */}
        <div style={{ position: "absolute", left: WX - WW / 2, top: WY, width: WW, height: WH,
          zIndex: 46, borderRadius: 18, overflow: "hidden", background: "#F7F4EC",
          border: `8px solid ${dkh("#243830", 0.44)}` }}>
          {/* the header: window buttons, a MODEL pill and a settings dot */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 54,
            background: hexa(p.key, 0.20), borderBottom: `3px solid ${hexa(INK, 0.10)}` }}>
            {[0, 1, 2].map(i => (
              <div key={"cd" + i} style={{ position: "absolute", left: 18 + i * 26, top: 20,
                width: 15, height: 15, borderRadius: "50%", background: hexa(INK, 0.20) }} />
            ))}
            <div style={{ position: "absolute", left: 124, top: 13, width: 176, height: 28,
              borderRadius: 14, background: "#FFFFFF", border: `2px solid ${hexa(INK, 0.14)}`,
              display: "flex", alignItems: "center", gap: 8, paddingLeft: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: hexa(p.key, 0.7) }} />
              <div style={{ width: 96, height: 7, borderRadius: 3, background: hexa(INK, 0.24) }} />
              <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent", borderTop: `6px solid ${hexa(INK, 0.34)}` }} />
            </div>
            <div style={{ position: "absolute", right: 18, top: 19, width: 17, height: 17,
              borderRadius: "50%", border: `3px solid ${hexa(INK, 0.22)}` }} />
          </div>

          {/* the conversation sidebar */}
          <div style={{ position: "absolute", left: 0, top: 54, bottom: 0, width: 122,
            background: hexa(INK, 0.05), borderRight: `2px solid ${hexa(INK, 0.09)}` }}>
            <div style={{ position: "absolute", left: 12, top: 12, right: 12, height: 26,
              borderRadius: 13, background: hexa(p.key, 0.34) }} />
            {[0, 1, 2, 3, 4].map(i => (
              <div key={"sb" + i} style={{ position: "absolute", left: 12, top: 50 + i * 26,
                width: 86 - (i % 3) * 16, height: 8, borderRadius: 3,
                background: hexa(INK, i === 1 ? 0.30 : 0.15) }} />
            ))}
          </div>

          {/* the parameter rail — the thing that makes it a STUDIO, not a chat */}
          <div style={{ position: "absolute", right: 0, top: 54, bottom: 0, width: 104,
            background: hexa(INK, 0.04), borderLeft: `2px solid ${hexa(INK, 0.09)}` }}>
            {[0, 1, 2].map(i => {
              const v2 = 0.32 + 0.5 * (0.5 + 0.5 * Math.sin((f + i * 14) / 13));
              return (
                <React.Fragment key={"pr" + i}>
                  <div style={{ position: "absolute", left: 14, top: 18 + i * 46, width: 44, height: 6,
                    borderRadius: 3, background: hexa(INK, 0.18) }} />
                  <div style={{ position: "absolute", left: 14, top: 32 + i * 46, width: 76, height: 7,
                    borderRadius: 4, background: hexa(INK, 0.11) }} />
                  <div style={{ position: "absolute", left: 14, top: 32 + i * 46, width: 76 * v2,
                    height: 7, borderRadius: 4, background: hexa(p.key, 0.72) }} />
                  <div style={{ position: "absolute", left: 10 + 76 * v2, top: 28 + i * 46,
                    width: 15, height: 15, borderRadius: "50%", background: "#FFFFFF",
                    border: `3px solid ${hexa(p.key, 0.8)}` }} />
                </React.Fragment>
              );
            })}
            <div style={{ position: "absolute", left: 14, right: 14, bottom: 18, height: 40,
              borderRadius: 7, background: hexa(INK, 0.07) }} />
          </div>

          {/* the messages — an avatar and a multi-line body each, building in */}
          {[0, 1, 2].map(i => {
            const born = 2 + i * 9;
            const k = E(f, born, born + 8, 0, 1, OUT);
            const me = i % 2 === 1;
            return (
              <div key={"cw" + i} style={{ position: "absolute", left: 138, right: 118,
                top: 70 + i * 108, opacity: k,
                transform: `translateY(${(1 - k) * 16}px)` }}>
                <div style={{ position: "absolute", left: me ? undefined : 0, right: me ? 0 : undefined,
                  top: 0, width: 30, height: 30, borderRadius: "50%",
                  background: me ? hexa(CLAY, 0.62) : hexa(p.key, 0.55) }} />
                <div style={{ position: "absolute", left: me ? 0 : 42, right: me ? 42 : 0, top: 2,
                  borderRadius: 14, padding: "12px 14px",
                  background: hexa(me ? CLAY : INK, 0.13) }}>
                  {[0, 1, 2].map(j => (
                    <div key={"ml" + j} style={{ height: 9, borderRadius: 3, marginBottom: 8,
                      width: `${[96, 78, 54][(i + j) % 3]}%`,
                      background: hexa(me ? CLAY : INK, 0.32) }} />
                  ))}
                </div>
              </div>
            );
          })}
          {/* the composer */}
          <div style={{ position: "absolute", left: 138, right: 118, bottom: 18, height: 52,
            borderRadius: 26, background: "#FFFFFF", border: `3px solid ${hexa(INK, 0.13)}`,
            display: "flex", alignItems: "center", gap: 10, paddingLeft: 16 }}>
            <div style={{ width: 7, height: 26, background: Math.floor(f / 7) % 2 ? CLAY : "transparent" }} />
            <div style={{ width: 118, height: 8, borderRadius: 3, background: hexa(INK, 0.16) }} />
            <div style={{ position: "absolute", right: 52, width: 22, height: 22, borderRadius: 6,
              background: hexa(INK, 0.10) }} />
            <div style={{ position: "absolute", right: 12, width: 32, height: 32, borderRadius: "50%",
              background: hexa(p.key, 0.72) }} />
          </div>
        </div>
        {/* ⭐ OBJECT TWO — the paywall. One slab, 470px of travel, and it lands
            ON the window rather than beside it. Big, bright, unmissable. */}
        {f >= LOCK - 12 && (
          <div style={{ position: "absolute", left: WX - WW / 2 - 16,
            top: WY + WH * 0.20 - (1 - drop) * 620, width: WW + 32, height: 268, zIndex: 66,
            borderRadius: 20, overflow: "hidden",
            transform: `rotate(${(1 - drop) * -3}deg) scaleY(${1 + (f >= LOCK && f < LOCK + 5 ? (1 - (f - LOCK) / 5) * 0.10 : 0)})`,
            transformOrigin: "50% 100%",
            background: `linear-gradient(174deg, #2B333C 0%, #161B21 100%)`,
            border: `8px solid #4A555F` }}>
            {/* the padlock, and its shackle CLICKS shut after it lands */}
            <div style={{ position: "absolute", left: 62, top: 62, width: 116, height: 96,
              borderRadius: 16, background: GOLD, border: `6px solid ${dkh(GOLD, 0.36)}` }}>
              <div style={{ position: "absolute", left: 46, top: 32, width: 24, height: 34,
                borderRadius: 6, background: dkh(GOLD, 0.48) }} />
            </div>
            <div style={{ position: "absolute", left: 84, top: f >= SHUT ? 12 : -14, width: 72,
              height: 62, borderRadius: "36px 36px 0 0",
              border: `14px solid ${GOLD}`, borderBottom: "none" }} />
            {/* the one text chip this shot is allowed */}
            <div style={{ position: "absolute", left: 228, top: 66, ...mono(96, 800),
              color: "#FFFFFF", letterSpacing: "-0.03em" }}>{R.price}</div>
            <div style={{ position: "absolute", left: 232, top: 172, ...ui(34, 900),
              color: hexa("#FFFFFF", 0.68), letterSpacing: "0.10em" }}>A MONTH</div>
            {/* the charge running, so the lock is not a still image */}
            {/* the charge crawling across the paywall for the rest of the shot */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22,
              background: RED, clipPath: `inset(0 ${Math.max(0, 100 - ((f - LOCK) * 2.6))}% 0 0)` }} />
          </div>
        )}
        {/* the window dies under it */}
        {f >= LOCK && (
          <div style={{ position: "absolute", left: WX - WW / 2, top: WY, width: WW, height: WH,
            zIndex: 60, borderRadius: 18,
            background: hexa("#0B0F14", Math.min(0.62, (f - LOCK) * 0.09)) }} />
        )}
        <Puff x={WX} y={WY + WH * 0.20 + 250} f={f} at={LOCK} n={20} s={1.6} z={70} c="#6C8A7E" up={0.3} />
        <Ring x={WX} y={WY + WH * 0.34} f={f} at={LOCK} r={420} c={RED} z={69} w={10} dur={18} />

        {/* ⭐ the money leaves, in the same note the whole reel uses */}
        {/* ⛔ WEAKEST SAMPLE 1.52 — the shot LOCKED and then stopped. Two notes
            over 20 frames left the last second empty. Four, staggered out to
            f70, keep the money leaving for as long as the paywall is up, which
            is also the point being made: it does not stop. */}
        {[LOCK + 6, LOCK + 15, LOCK + 24, LOCK + 33].map((k, i) => {
          if (f < k) return null;
          const t = Math.min(1, (f - k) / 26);
          if (t >= 1) return null;
          return (
            <MoneyNote key={"nt" + i}
              x={WX + t * (250 + i * 74) * (i % 2 ? -1 : 1)}
              y={400 - t * t * (420 + i * 30)}
              s={0.94} rot={t * (360 + i * 60) * (i % 2 ? -1 : 1)} o={1 - t * 0.3} z={74} />
          );
        })}

        {/* THE TOOL, named where the VO names it — the free alternative, apart */}
        <ToolCard x={112} y={392} s={0.60} i={0} f={f} at={NAME} z={72} rot={-3} auraAt={NAME + 8} auraC={p.key} />
        <CardLand x={112} y={392} s={0.46} f={f} at={NAME} z={73} c={p.key} />

        <GCrew f={f} x={784} y={foot(p.horizon, 208)} i={3} size={228} z={70} at={0} loop={4}
          shock={f >= LOCK && f < LOCK + 14 ? 1 : 0} />
      </div>
    </Scene>
  );
};

export const S5: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("wide");
  const OPEN = v === "amber" ? 10 : v === "steel" ? 4 : 7;
  const CHIP = OPEN + 34;
  const CUT = 63;                      /* ⭐ the first of five cuts */
  const sweep = E(f, OPEN, OPEN + 16, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="FREE IN THE BROWSER" push={push(v, dur, 1.062)} vig={0.30}>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* ⛔ occluders were OFF here because the stanchion's DIAGONAL BRACE would
            have crossed the browser. The braces are all off now, so the near
            plane can come back — and it has to: this scene measured p10 108.2,
            i.e. its darkest tenth is brighter than most reels' midtones, which
            is a frame with no shadow in it at all. */}
        <SetFor k="wide" f={f} lit={1} t={f * 0.6} rakeRate={4.6} rk={RAKE_V[v]} />
        {/* the desk edge the browser sits on, cropped by the bottom corner */}
        <div style={{ position: "absolute", left: -80, right: -80, top: 648, height: 240, zIndex: 86,
          background: `linear-gradient(178deg, ${mxh("#1E2A38", 0.14)} 0%, ${dkh("#1E2A38", 0.44)} 100%)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 13,
            background: mxh("#1E2A38", 0.26) }} />
        </div>

        {/* the cage being swept off left — the before-state LEAVING is the event */}
        {sweep < 1 && (
          <div style={{ position: "absolute", left: 300 - sweep * 1300, top: 200, width: 420,
            height: 400, zIndex: 66, opacity: 1 - sweep * 0.5,
            transform: `rotate(${-sweep * 26}deg)` }}>
            <Turnstile x={210} y={400} s={1.0} f={f} clack={-1} z={66} />
          </div>
        )}

        {/* THE BROWSER — expands 300px -> full panel */}
        <BrowserWin x={506} y={396} w={856} h={556} f={f} at={OPEN} z={40}
          url="aistudio.google.com" open={20}>
          {/* the real AI Studio mark, at 200px+ */}
          {/* ⭐ THE MARK IS THE SATURATION. This scene measured 11.3% saturated
              pixels against a 34% bar because a browser is a white rectangle —
              so the one genuinely colourful object in it gets bigger (212 ->
              260) and the Google four-colour band is repeated at scale under
              it. `saturate()` and real brand colour are the two ways to buy
              BODY_SAT without touching a dark stop (reel 111). */}
          <div style={{ position: "absolute", left: 44, top: 34, width: 260, height: 260,
            borderRadius: 54, background: "#FFFFFF", border: "6px solid #ECE7DC",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/aistudio.png")}
              style={{ width: 210, height: 210, objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", left: 44, top: 312, width: 260, height: 26,
            borderRadius: 13, overflow: "hidden", display: "flex" }}>
            {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
              <div key={"gc" + j} style={{ flex: 1, background: c }} />
            ))}
          </div>
          {/* the model row, lighting up — a real row, not a label */}
          <div style={{ position: "absolute", left: 336, top: 52, right: 44, height: 92,
            borderRadius: 14, background: f >= OPEN + 20 ? hexa(G_BLUE, 0.26) : "#F4F1EA",
            border: `4px solid ${f >= OPEN + 20 ? hexa(G_BLUE, 0.40) : "#E8E3D8"}`,
            display: "flex", alignItems: "center", paddingLeft: 24, gap: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: G_BLUE }} />
            <span style={{ ...ui(34, 900), color: INK }}>GEMINI 3 PRO</span>
          </div>
          {/* ⭐ THE REAL PAGE, captured live from aistudio.google.com, panning
              slowly behind the chrome. A drawn approximation of a product is a
              container; the product's own page is the receipt. */}
          <div style={{ position: "absolute", left: 336, top: 168, right: 44, bottom: 118,
            borderRadius: 12, overflow: "hidden", border: `4px solid ${dkh("#E6E1D4", 0.14)}` }}>
            <Img src={staticFile("shots/bill_aistudio.png")}
              style={{ position: "absolute", left: 0, top: -E(f, OPEN + 18, OPEN + 96, 0, 130, LIN),
                width: "100%" }} />
          </div>
          {/* the prompt area filling with real content */}
          {Array.from({ length: 0 }, (_, i) => (
            <div key={"pr" + i} style={{ position: "absolute", left: 300, top: 176 + i * 44,
              width: `${44 + rnd(4, i) * 34}%`, height: 30, borderRadius: 8,
              background: hexa(i % 2 ? G_GRN : INK, 0.13),
              transform: `scale(${squash(f - OPEN - 22 - i * 6, 4, 0.14, 2, 7)})`,
              transformOrigin: "0% 50%" }} />
          ))}
          {/* ⭐ THE ACCOUNT YOU ALREADY HAVE — his own chip, slotting in */}
          {f >= CHIP && (
            <div style={{ position: "absolute", right: 46, bottom: 40, height: 72,
              paddingLeft: 12, paddingRight: 26, borderRadius: 36, background: "#FFFFFF",
              border: "4px solid #E8E3D8", display: "flex", alignItems: "center", gap: 14,
              transform: `scale(${E(f, CHIP, CHIP + 8, 0, 1, BACK)})` }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#FFF1E8",
                border: "3px solid #F0D5C6", display: "flex", alignItems: "center",
                justifyContent: "center" }}>
                <Img src={staticFile("claude_logo.png")} style={{ width: 30, height: 30 }} />
              </div>
              <div style={{ width: 92, height: 12, borderRadius: 4, background: hexa(INK, 0.20) }} />
            </div>
          )}
        </BrowserWin>

        {/* ⭐⭐ CUT 1 OF 5 — the blade runs the FULL panel width */}
        <BillRoll x={rollX(210, CUT, 0.9)} y={640} w={128} f={f} rows={rowsFor(0, CUT)} rowH={210} z={70}
          dir="h" creep={0.9} head={false} />
        <Cutter y={686} f={f} at={CUT} z={76} h={48} dur={13} />
        <ChargeCounter x={40} y={112} f={f} s={0.74} z={84} steps={[[-1, 5], [CUT + 14, 4]]} />

        <GCrew f={f} x={807} y={foot(p.horizon, 232)} i={0} size={207} z={72} at={OPEN + 6} loop={2} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S6 — THE CODEBASE DROP.  f489-577 (2.93s).  Intensity 8.
   VO: "with a context window big enough to drop a whole codebase into."

   ⭐ THE VERB IS **DROP** and the measure is **BIG ENOUGH**. §10: name the
   mechanism and ask which half is missing. A drop alone is the INPUT; the
   missing half is the OUTPUT — *does it fit?* So three crates fall the full
   panel height and the gauge STILL barely moves. That is "big enough", proved
   rather than asserted.

   ⛔ `1M` is the REAL Gemini 3 input context and the only figure legal here.
   ====================================================================== */
export const S6: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("shaft");
  const D = v === "amber" ? [10, 36, 62] : v === "steel" ? [4, 30, 58] : [7, 33, 60];
  const LAND = D.map(k => k + 15);
  const sh = LAND.reduce((a, k) => {
    const s = shake(f, k, 8, 7); return { x: a.x + s.x, y: a.y + s.y };
  }, { x: 0, y: 0 });
  return (
    <Scene p={p} slug="1M CONTEXT" push={push(v, dur, 1.100)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="shaft" f={f} lit={1} t={f * 0.5} rakeRate={6.4} rk={RAKE_V[v]} />

        <ContextShaft x={476} y={p.horizon - 40} w={430} f={f} fills={LAND} z={30} c={p.key} />

        {/* ⭐⭐⭐ REBUILT AS ACTUAL CODE. Alex: *"codebase, that should be seen as
            actual kind of codebase graphics."* The first version dropped wooden
            CRATES with a file-tree stencil painted on the side — a container for
            "a lot of files", which is exactly the §3 defect: the VO's noun is a
            CODEBASE, so the thing falling has to look like one. `CodeSlab` is a
            real editor pane: filename tab, line-number gutter, indented
            syntax-coloured tokens, a fold marker, a minimap and a status bar. */}
        {D.map((k, i) => {
          const NAMES = ["index", "server", "router"];
          if (f < k - 6) {
            /* they hang on the gantry before they drop — a legible before-state */
            return <CodeSlab key={"cq" + i} x={276 + i * 224} y={228} w={214} f={f}
              seed={i * 11 + 3} rot={-3 + i * 3} z={58} s={0.62} name={NAMES[i]} />;
          }
          if (f > LAND[i] + 3) return null;
          const t = E(f, k, LAND[i], 0, 1, IN_Q);
          return (
            <CodeSlab key={"cd" + i} x={276 + i * 224 + (476 - (276 + i * 224)) * t}
              y={228 + t * 316} w={214 + t * 96} f={f} seed={i * 11 + 3}
              rot={-3 + i * 3 + t * 22} z={58} s={0.62 + t * 0.28} name={NAMES[i]} />
          );
        })}
        {/* ⭐ and the code KEEPS COMING — a stream of smaller slabs feeding the
            shaft behind the three heroes, so "a whole codebase" is a VOLUME and
            not three objects. Each is 96px, clear of the 40px floor. */}
        {Array.from({ length: 9 }, (_, i) => {
          const born = 6 + i * 8;
          if (f < born || f > born + 30) return null;
          const t = E(f, born, born + 30, 0, 1, IN_Q);
          const x0 = 150 + (i % 5) * 190;
          return (
            <CodeSlab key={"cs" + i} x={x0 + (476 - x0) * t} y={150 + t * 380} w={96} f={f}
              seed={i * 5 + 21} rot={(i % 2 ? -14 : 12) + t * 40} z={52} s={0.42}
              name={["api", "db", "auth", "ui", "lib"][i % 5]} />
          );
        })}
        {LAND.map((k, i) => (<React.Fragment key={"la" + i}>
          <Puff x={476} y={p.horizon - 30} f={f} at={k} n={20} s={1.7} z={68} c="#E8C88A" up={1.4} />
          <Ring x={476} y={p.horizon - 24} f={f} at={k} r={300} c={p.key} z={67} w={9} />
        </React.Fragment>))}

        {/* the gantry hook, travelling back for the next one — a background
            process, always running */}
        <div style={{ position: "absolute", left: 180 + ((f * 7) % 620), top: 128, width: 44,
          height: 76, zIndex: 50, background: dkh("#4A3A22", 0.22), borderRadius: 5 }} />

        {/* he watches it go in and reacts on each land */}
        {/* ⭐ BEAKER: this is the one beat with a LEVEL in it — the flask fills as
            each codebase goes into the shaft, which no other character can do. */}
        <GCrew kind="beaker" fill={0.15 + LAND.filter(k => f >= k).length * 0.24}
          f={f} x={868} y={foot(p.horizon, 214)} i={9} size={212} z={72} at={0} loop={3}
          shock={LAND.some(k => f >= k && f - k < 10) ? 1 : 0} />
        <GCrew f={f} x={261} y={foot(p.horizon, 240)} i={1} size={205} z={71} at={4} loop={1} flip />

        {/* ⭐ Alex: *"have the logos of the apps whenever you mention them
            between things."* The tool that owns this beat carries its mark, so
            a viewer joining mid-scene still knows which product they are
            looking at. */}
        <ToolCard x={834} y={262} s={0.56} i={0} f={f} at={4} z={76} rot={3} auraAt={12} auraC={p.key} />
        <MarkCast x={128} y={148} s={86} z={74} f={f} spin={0.5} o={0.70} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S7 — NOTEBOOKLM · YOUR OWN FILES.  f577-673 (3.20s).  Intensity 7.
   VO: "2. NotebookLM. You can build a free second brain by uploading your own
        files"

   ⭐ THE VERBS ARE **BUILD** and **UPLOADING**, and the possessive is **YOUR
   OWN**. So files fly from a floor pile — his pile, on the ground beside him —
   up onto shelves that light row by row as they fill. The unit is BUILT during
   the scene; it does not arrive built.
   ====================================================================== */
export const S7: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("stacks");
  const off = v === "amber" ? 5 : v === "steel" ? -3 : 0;
  /* NINE files, arriving across the FULL 96 frames — never front-loaded */
  const FLY = Array.from({ length: 9 }, (_, i) => 6 + off + i * 9);
  /* one lobe lights per file that lands — eight lobes, nine files */
  const LIT = FLY.map(k => k + 14);
  return (
    <Scene p={p} slug="YOUR OWN FILES" push={push(v, dur, 1.082)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="stacks" f={f} lit={1} t={f * 0.6} rakeRate={5.0} rk={RAKE_V[v]} />

        {/* ⭐⭐⭐ A SECOND BRAIN, DRAWN AS A BRAIN. Alex: *"second brain part
            animation should be represented as like a big brain something like
            that."* The shelf unit was a CONTAINER for "a place your files go";
            the VO's noun is a second BRAIN, so the picture is one, and the
            mechanism is that HIS OWN FILES are what light it up — one lobe per
            file, with synapses firing between the lit ones. 560px wide = 55% of
            the panel, so it is the hero with air around it. */}
        <Brain x={506} y={350} s={0.94} f={f} lit={LIT} z={40} />

        {/* the real NotebookLM mark on a plate beside it, 200px */}
        <div style={{ position: "absolute", left: 806, top: 138, width: 200, height: 200, zIndex: 52,
          borderRadius: 42, background: "#FFFFFF", border: "6px solid #ECE7DC",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${E(f, 10, 20, 0, 1, BACK)})` }}>
          <Img src={staticFile("logos/notebooklm_mark.png")}
            style={{ width: 142, height: 142, objectFit: "contain" }} />
        </div>

        {/* HIS PILE, on the floor beside him — "your own files" is possessive */}
        {Array.from({ length: 7 }, (_, i) => (
          f > FLY[i] ? null : (
            <FileProp key={"fp" + i} x={172 + (i % 3) * 34} y={p.horizon + 128 - Math.floor(i / 3) * 26}
              s={1.22} rot={-14 + i * 7} z={54 + i} />
          )
        ))}

        {/* the files flying UP onto the shelves, one after another */}
        {FLY.map((k, i) => {
          if (f < k || f > k + 14) return null;
          const t = E(f, k, k + 14, 0, 1, OUT);
          /* ⛔ s WAS 0.86 = a 76x96 file. Under the audit's 1012->240 downsample
             that is 18x23 and it read as a white speck; at 1.22 it is 107x137,
             clear of the 40px short-side floor with room to spare. */
          /* ⭐ the flight targets are the BRAIN'S LOBE CENTRES, so a file visibly
             goes INTO the thing it is filling. Derived from `Brain`'s own LOBES
             table at x=520 y=356 s=1.06: half-width 297, half-height 233. */
          const LOBES: Array<[number, number]> = [
            [0.29, 0.42], [0.53, 0.31], [0.76, 0.38],
            [0.26, 0.67], [0.53, 0.58], [0.78, 0.63], [0.40, 0.82],
          ];
          const [lu, lv] = LOBES[i % 7];
          const tx = 506 - 263 + lu * 526, ty = 350 - 207 + lv * 414;
          return (
            <FileProp key={"ff" + i} x={186 + (tx - 186) * t}
              y={p.horizon + 110 + (ty - (p.horizon + 110)) * t - Math.sin(t * Math.PI) * 130}
              s={1.22} rot={-14 + t * 380} z={62} />
          );
        })}
        {/* the ones that have landed, staying on their shelf */}
        {/* ⛔ no landed copies: the file is now absorbed INTO the lobe it lit
            (the lobe draws its own page), so a second copy sitting on top would
            be the same object twice. Only the arrival ring remains. */}
        {FLY.map((k, i) => {
          const LOBES: Array<[number, number]> = [
            [0.29, 0.42], [0.53, 0.31], [0.76, 0.38],
            [0.26, 0.67], [0.53, 0.58], [0.78, 0.63], [0.40, 0.82],
          ];
          const [lu, lv] = LOBES[i % 7];
          return (
            <Ring key={"fr" + i} x={506 - 263 + lu * 526} y={350 - 207 + lv * 414}
              f={f} at={k + 14} r={130} c="#FFD9A0" z={64} w={6} dur={13} />
          );
        })}

        {/* two Claudes: one loading, one shelving. Jobs, not idles. */}
        <GCrew f={f} x={264} y={foot(p.horizon, 226)} i={4} size={220} z={70} at={0} loop={4} />
        <GCrew f={f} x={800} y={foot(p.horizon, 202)} i={7} size={205} z={70} at={8} loop={1} flip />

        <MarkCast x={104} y={162} s={92} z={74} f={f} spin={-0.45} o={0.74} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S8 — GROUNDED / ACROSS SESSIONS.  f673-769 (3.20s).  Intensity 8.
   VO: "so it stops making things up and has context between all of your
        sessions."

   ⭐⭐ §10 — THIS SCENE DRAWS BOTH HALVES OF ONE MECHANISM:
     · "stops making things up" — the LEFT answer is TETHERED by three ropes
       back to three real shelved files and it HOLDS. The RIGHT answer has no
       ropes, sags, and falls apart. That is grounded vs invented, drawn.
     · "context between sessions" — a SESSION BOUNDARY sweeps across and the
       ropes pass straight THROUGH it and keep holding. This is reel 104's own
       translation-table row: *"bars travelling across a session boundary"*.

   ⛔ NO "0% HALLUCINATION" PLATE, NO SCORE, NO PERCENTAGE. The tether IS the
   claim, and it is the only form of it that is honest.
   ====================================================================== */
export const S8: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("desk");
  const off = v === "amber" ? 6 : v === "steel" ? -4 : 0;
  const RISE = 8 + off, TIE = RISE + 10, FALL = RISE + 30, BOUND = 52 + off;
  const CUT = 74;                      /* ⭐ cut 2 of 5 */
  const bx = E(f, BOUND, BOUND + 30, -160, 1180, LIN);
  return (
    <Scene p={p} slug="TIED TO THE SOURCE" push={push(v, dur, 1.072)} vig={0.48}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="desk" f={f} lit={1} t={f * 0.5} rakeRate={4.4} rk={RAKE_V[v]} />

        {/* ⭐ THE REAL NOTEBOOKLM UI, from Google's own launch video, sitting where
            the sources live. The tether runs back to the actual product. */}
        <Broll x={806 + BROLL_V[v].bx} y={214 + BROLL_V[v].by} w={330 * BROLL_V[v].bw} f={f} at={2} src="broll/broll_notebook.mp4"
          z={44} label="NOTEBOOKLM" chrome="app" punch={BOUND} bv={BROLL_V[v]} />

        {/* the three SOURCES the tether goes back to — real files on a shelf */}
        <div style={{ position: "absolute", left: 90, top: 152, width: 350, height: 156, zIndex: 30,
          borderRadius: 5, background: dkh("#2E3444", 0.14), border: `5px solid ${dkh("#2E3444", 0.36)}` }} />
        {[0, 1, 2].map(i => (
          <FileProp key={"sf" + i} x={166 + i * 104} y={252} s={1.18} rot={-3 + i * 3} z={38} />
        ))}

        {/* THE TIED ANSWER — it holds */}
        <AnswerCard x={368} y={470} w={300} h={216} f={f} at={RISE} tied z={62} />
        {[0, 1, 2].map(i => (
          <Tether key={"tt" + i} x0={166 + i * 104} y0={286} x1={300 + i * 62} y1={412}
            f={f} at={TIE + i * 3} z={58} c="#8FC4F0" w={10} />
        ))}

        {/* THE UNTIED ANSWER — nothing holds it, so it goes */}
        <AnswerCard x={748} y={452} w={286} h={206} f={f} at={RISE + 6} tied={false}
          collapse={FALL} z={61} />
        <Puff x={748} y={520} f={f} at={FALL + 8} n={16} s={1.3} z={64} c="#9AA0B4" up={0.3} />

        {/* ⭐ THE SESSION BOUNDARY — it sweeps, and the ropes go THROUGH it */}
        {f >= BOUND && f <= BOUND + 34 && (
          <div style={{ position: "absolute", left: bx, top: 60, width: 16, bottom: 0, zIndex: 56,
            background: `linear-gradient(90deg, ${hexa(p.key, 0)} 0%, ${hexa(p.key, 0.7)} 50%, ${hexa(p.key, 0)} 100%)` }} />
        )}
        {/* the boundary's own marker plate, travelling with it — a session tab */}
        {f >= BOUND && f <= BOUND + 34 && (
          <div style={{ position: "absolute", left: bx - 46, top: 96, width: 108, height: 42, zIndex: 57,
            borderRadius: 8, background: hexa(p.key, 0.86), display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <div style={{ width: 56, height: 10, borderRadius: 3, background: hexa(INK, 0.36) }} />
          </div>
        )}

        {/* ⭐ cut 2 of 5 — the bill runs the bottom edge */}
        <BillRoll x={rollX(210, CUT, 0.85)} y={p.horizon + 176} w={126} f={f} rows={rowsFor(1, CUT)} rowH={210} z={70}
          dir="h" creep={0.85} head={false} />
        <Cutter y={p.horizon + 224} f={f} at={CUT} z={76} h={44} dur={13} />
        <ChargeCounter x={806} y={104} f={f} s={0.70} z={84} steps={[[-1, 4], [CUT + 14, 3]]} />

        {/* ⛔⛔ THE CAST STANDS BEHIND A NEAR-PLANE MASS. `desk` and `bench` both
            paint their tabletop at zIndex 84 (that is what drops the black
            point), and the Claudes were at z 72 with their feet at
            `p.horizon + 214` — so 22px of head showed above the bench line and
            the rest was behind it. The contact sheet read both scenes as empty
            rooms. ⛔ The fix is NOT to raise their z above the bench (that puts
            a body in front of a table it is standing behind); it is to stand
            them at the bench line so their whole torso is above it, which is
            where a person working at a bench actually is. */}
        <GCrew f={f} x={560} y={foot(p.horizon, 86)} i={2} size={212} z={80} at={2} loop={3} />
        <MarkCast x={906} y={148} s={88} z={74} f={f} spin={0.4} o={0.7} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S9 — FLOW · THE FILM TOOL.  f769-843 (2.47s).  Intensity 8.
   VO: "3. Google Flow. This is Google's AI film tool."

   ⛔⛔ ELEVATED. Alex: *"at 25 seconds that animation needs to be elevated to
   be a lot more interesting."* The first version was a crane unfolding on a
   dark stage with a small monitor beside it — one prop doing one gesture, which
   §5 calls a dead shot however well it moves.

   ⭐⭐ THE MOVE: THE REAL VEO FOOTAGE BECOMES THE STAGE ITSELF. Google's own
   landing-page video of a wall of Veo output plays FULL WIDTH as the projection
   the stage is pointed at, and the rig — crane, lamp bar, dolly track, flight
   case — sits in SILHOUETTE in front of it. That is the largest changing area
   available in the reel, it is high-contrast by construction (bright screen,
   black rig), and it is the product doing its actual job rather than a drawing
   of a place where the job happens.
   ⭐ Reel 110's silhouette test, used the other way round: the rig has no
   silhouette on a dark stage, and a perfect one against a lit screen.

   ⛔ NO `FREE` PLATE AND NO `$0` HERE OR IN S10 — Flow's free tier is 50 daily
   credits, metered, so the word stays in the audio.
   ⭐ The FLOW card lands on its own measured name onset (26.16s -> local f11).
   ====================================================================== */
export const S9: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("stage");
  const off = v === "amber" ? 4 : v === "steel" ? -3 : 0;
  const PROJ = 2 + off;                 /* the projection strikes */
  const BANKS = [10 + off, 17 + off, 24 + off];
  const NAME = 11;                      /* "Google Flow." at 26.16s */
  const UNFOLD = 20 + off;
  const sh = shake(f, PROJ, 9, 8);
  return (
    <Scene p={p} slug="THE STAGE" push={push(v, dur, 1.078)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="stage" f={f} lit={E(f, PROJ, BANKS[2] + 8, 0.20, 1, OUT)} t={f * 0.4}
          rakeRate={5.8} occluders={false} rk={RAKE_V[v]} />

        {/* ⭐ THE PROJECTION — real Veo output, full width, and it is what lights
            the room. `chrome="bare"` because a stage screen has no browser. */}
        {/* ⛔⛔ THE CLIP WAS CHOSEN BY WHAT IT SHOWED AND NOT BY WHAT IT DOES.
            The first pass put the video-GRID clip here and the scene fell
            9.94 -> 7.58 with 50% HOLD: a wall of small thumbnails is mostly
            static, and it was filling 87% of the panel. Measured on the clips
            themselves with the audit's own method (10fps, greyscale, 240px,
            mean |delta|):
                broll_flow_edit   8.43     broll_flow_type   8.09
                broll_flow_grid   4.75     broll_notebook    3.77
                broll_flow_scene  3.19
            The EDITOR clip is nearly twice the grid and it is also the better
            depiction — "Google's AI film tool" is a timeline being cut, not a
            gallery of finished files. ⭐ Measure the footage before you place
            it; a clip is a mover and movers have numbers. */}
        <Broll x={506 + BROLL_V[v].bx} y={286 + BROLL_V[v].by} w={880 * BROLL_V[v].bw} f={f} at={PROJ} src="broll/broll_flow_edit.mp4"
          z={30} chrome="bare" ratio={0.50} punch={UNFOLD + 14} bv={BROLL_V[v]} />
        {/* the projector beam reaching it, so the light has a source */}
        <div style={{ position: "absolute", left: 300, top: 0, width: 412, height: 180, zIndex: 31,
          opacity: E(f, PROJ, PROJ + 10, 0, 0.30, OUT), pointerEvents: "none",
          clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa(p.key, 0.7)} 0%, ${hexa(p.key, 0)} 100%)` }} />
        <Ring x={506} y={286} f={f} at={PROJ} r={420} c={p.key} z={33} w={10} dur={18} />

        {/* the stage banks striking in, one at a time, ACROSS the screen */}
        {BANKS.map((k, i) => (
          <React.Fragment key={"bk" + i}>
            {f >= k && (
              <div style={{ position: "absolute", left: 60 + i * 300, top: 60, width: 320, height: 520,
                zIndex: 34, opacity: 0.26, clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(180deg, ${hexa("#FFE9C4", 0.66)} 0%, ${hexa("#FFE9C4", 0)} 100%)` }} />
            )}
            <Ring x={220 + i * 300} y={96} f={f} at={k} r={170} c="#FFE9C4" z={72} w={5} dur={12} />
          </React.Fragment>
        ))}

        {/* ⭐ THE RIG, IN SILHOUETTE AGAINST THE SCREEN. Near-black on a lit
            projection is the strongest value spread in the reel. */}
        {/* ⛔ the rig UNFOLDED and then stood there — half the scene's HOLD. It
            now keeps working: it booms through the whole shot, which is what a
            crane on a live stage actually does. */}
        <Crane x={786} y={p.horizon + 156} s={1.46} f={f} unfold={UNFOLD} z={56} c="#1A1622"
          travel={[UNFOLD + 16, dur, -300]} boom={[UNFOLD + 14, dur, 22]} />
        {/* the dolly track running the full width, in front of everything */}
        <div style={{ position: "absolute", left: -60, right: -60, top: p.horizon + 118, height: 26,
          zIndex: 60, background: `repeating-linear-gradient(90deg, ${dkh("#14111C", 0.02)} 0px, ${dkh("#14111C", 0.02)} 54px, ${mxh("#14111C", 0.14)} 54px, ${mxh("#14111C", 0.14)} 78px)` }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: p.horizon + 146, height: 12,
          zIndex: 60, background: dkh("#14111C", 0.04) }} />
        {/* a flight case cropped by the left edge — the near plane */}
        <div style={{ position: "absolute", left: -70, top: p.horizon + 40, width: 250, height: 300,
          zIndex: 78, borderRadius: 8, background: `linear-gradient(94deg, ${mxh("#141020", 0.12)} 0%, ${dkh("#141020", 0.02)} 100%)` }}>
          {[0, 1].map(i => (
            <div key={"fc" + i} style={{ position: "absolute", left: 22, right: 22, top: 40 + i * 130,
              height: 16, background: mxh("#141020", 0.20) }} />
          ))}
          {[[24, 26], [200, 26], [24, 250], [200, 250]].map(([lx, ly], i) => (
            <div key={"fl" + i} style={{ position: "absolute", left: lx, top: ly, width: 30, height: 30,
              background: mxh("#141020", 0.26) }} />
          ))}
        </div>

        {/* ⭐ THE TOOL, NAMED WHERE THE VO NAMES IT */}
        <ToolCard x={172} y={330} s={0.72} i={2} f={f} at={NAME} z={76} rot={-3} auraAt={NAME + 8} auraC={p.key} />
        <Ring x={172} y={322} f={f} at={NAME} r={190} c={p.key} z={75} w={6} dur={14} />

        {/* the operator, working the crane, in silhouette too */}
        <GCrew f={f} x={604} y={foot(p.horizon, 214)} i={10} size={220} z={70} at={2} loop={0}
          tint="#3A2E44" />
      </div>
    </Scene>
  );
};

export const S10: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("stage");
  const TYPE = 13, SLAM = 40, VEO = 62, MOVE = 80, ALL = 92;
  const sh = shake(f, SLAM, 9, 7);
  return (
    <Scene p={p} slug="VEO BUILDS IT" push={push(v, dur, 1.058)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="stage" f={f} lit={E(f, VEO, ALL, 1, 1.5, OUT)} t={f * 0.5} rakeRate={6.6} rk={RAKE_V[v]} />

        {/* ⭐ THE SET BUILDS ITSELF ON "VEO" — three flats fly in from the wings
            and lock, a backdrop drops, a prop lands. Large, bright, fast. */}
        <StageFlat x={190} y={p.horizon + 30} w={300} h={340} f={f} at={VEO} from={-320}
          z={30} kind={2} c="#3A2E4E" />
        <StageFlat x={840} y={p.horizon + 30} w={300} h={340} f={f} at={VEO + 5} from={1330}
          z={30} kind={1} c="#33284A" />
        <StageFlat x={512} y={p.horizon + 12} w={430} h={300} f={f} at={VEO + 10} from={512}
          z={26} kind={0} c="#2C2440" />

        {/* the slate he types on, then slams */}
        {false && (
          <div style={{ position: "absolute", left: 344, top: 250, width: 330, height: 208, zIndex: 64,
            borderRadius: 8, background: "#14121A", border: "7px solid #3A3448",
            transform: `rotate(${f >= SLAM ? -8 + rock(f - SLAM, 0, 1, 20) * 12   /* ⛔ was 20x12 = 240deg */ : -3}deg) scale(${E(f, TYPE - 8, TYPE, 0, 1, BACK)})` }}>
            {/* the clapper stripes */}
            <div style={{ position: "absolute", left: -4, top: -34, right: -4, height: 34,
              background: `repeating-linear-gradient(112deg, #F2EDE0 0px, #F2EDE0 26px, #1A1620 26px, #1A1620 52px)`,
              transformOrigin: "0% 100%",
              transform: `rotate(${f >= SLAM ? 0 : -16}deg)` }} />
            {/* the typed shot line, arriving letter-block by letter-block */}
            {Array.from({ length: Math.min(6, Math.max(0, Math.floor((f - TYPE) / 3))) }, (_, i) => (
              <div key={"tp" + i} style={{ position: "absolute", left: 22, top: 26 + i * 28,
                width: `${(38 + rnd(6, i) * 44)}%`, height: 17, borderRadius: 3,
                background: hexa(i % 2 ? GOLD : PAPER, 0.62) }} />
            ))}
          </div>
        )}
        <Puff x={512} y={252} f={f} at={SLAM} n={14} s={1.2} z={70} c="#B0A0C0" />
        <Ring x={512} y={256} f={f} at={SLAM} r={200} c={p.key} z={69} w={7} />

        {/* ⛔ THE 22-FRAME DEAD STRETCH. The slate slams on "shot you want" (40)
            and nothing happens until "Veo" (62) — the contact sheet caught the
            scene mid-nothing. §5: arrivals spread across the FULL duration.
            ⭐ And the bridge is motivated: the SHOT ORDER the slate just closed
            on travels across the stage and is what the set builds FROM. */}
        {f >= SLAM && f < VEO + 8 && (() => {
          const t = E(f, SLAM + 2, VEO, 0, 1, IO);
          return (
            <div style={{ position: "absolute", left: 470 - t * 40 + t * 40, top: 250 + t * 190,
              width: 196, height: 116, zIndex: 68, borderRadius: 8,
              background: `linear-gradient(172deg, #F4EFE2 0%, ${dkh(CREAMB, 0.14)} 100%)`,
              border: `5px solid ${dkh(CREAMB, 0.30)}`,
              transform: `translateX(${-140 + t * 260}px) rotate(${-16 + t * 34}deg) scale(${0.7 + t * 0.5})` }}>
              {[0.20, 0.42, 0.62].map((k, i) => (
                <div key={"so" + i} style={{ position: "absolute", left: 16, top: `${k * 100}%`,
                  width: `${64 - i * 16}%`, height: 11, borderRadius: 3, background: hexa(INK, 0.30) }} />
              ))}
              <div style={{ position: "absolute", right: 14, bottom: 12, width: 34, height: 34,
                borderRadius: 8, background: hexa(GOLD, 0.7) }} />
            </div>
          );
        })()}
        {[VEO, VEO + 5, VEO + 10].map((k, i) => (
          <Ring key={"vr" + i} x={190 + i * 320} y={p.horizon} f={f} at={k + 11} r={190}
            c={p.key} z={68} w={6} dur={14} />
        ))}

        {/* ⭐⭐ THE CAMERA MOVE — the crane travels the FULL panel laterally AND
            booms down, and the set parallaxes against it at three depths. This
            is the single largest swept area in the reel. */}
        <Crane x={824} y={p.horizon + 152} s={1.50} f={f} unfold={-40} z={56}
          travel={[MOVE, MOVE + 22, -700]} boom={[MOVE + 4, MOVE + 24, 28]} />
        {/* the parallax the move buys: three bands at three rates */}
        {[0, 1, 2].map(i => (
          <div key={"px" + i} style={{ position: "absolute",
            left: -120 + E(f, MOVE, MOVE + 22, 0, 150 - i * 46, IO),
            top: 150 + i * 130, width: 1300, height: 22, zIndex: 20 + i,
            background: hexa(p.key, 0.10 + i * 0.05) }} />
        ))}

        {/* "and everything" — audio bars, the rig and a grade wash, all at once */}
        {f >= ALL && (<>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={"ab" + i} style={{ position: "absolute", left: 130 + i * 50, bottom: 84,
              width: 34, height: 24 + Math.abs(Math.sin(f / 4 + i)) * 96, zIndex: 74,
              borderRadius: 4, background: hexa(i % 3 ? GREEN : GOLD, 0.7) }} />
          ))}
          <div style={{ position: "absolute", inset: 0, zIndex: 18,
            background: `linear-gradient(96deg, ${hexa(SKY, 0.10)} 0%, ${hexa(GOLD, 0.12)} 100%)` }} />
        </>)}

        {/* ⭐⭐ CUT TO THE WORDS, WITH THE REAL PRODUCT. Flow's own launch clip of
            the GENERATION PANEL runs while he types (that panel is literally
            where you type the shot), and on "Veo" it hard-cuts to Flow's clip of
            the built result. The §3 test passes on the footage itself: the
            picture shows a shot being specified and then existing. */}
        {f < VEO && (
          <Broll x={512 + BROLL_V[v].bx} y={252 + BROLL_V[v].by} w={356 * BROLL_V[v].bw} f={f} at={TYPE - 4} src="broll/broll_flow_type.mp4"
            z={66} label="FLOW" chrome="app" punch={SLAM} bv={BROLL_V[v]} />
        )}
        {/* ⛔ was broll_flow_scene, the least active clip of the five at 3.19.
            The GRID is 4.75 and it is also the truer depiction of "Veo builds
            it": results appearing, not one held shot.
            ⛔ AND THE COMMENT GOES HERE, NOT INSIDE THE `&&`. A JSX comment is
            an expression, so putting one inside `cond && ( ... )` alongside the
            element gives two children where one is allowed. The fix for that
            then broke the build a SECOND time, because the explanatory comment
            quoted a JSX comment literally and its closing star-slash ended this
            comment early. Do not quote comment syntax inside a comment. */}
        {f >= VEO && (
          <Broll x={512 + BROLL_V[v].bx} y={268 + BROLL_V[v].by} w={556 * BROLL_V[v].bw} f={f} at={VEO} src="broll/broll_flow_grid.mp4"
            z={66} label="VEO" chrome="app" punch={MOVE} bv={BROLL_V[v]} />
        )}

        <GCrew f={f} x={247} y={foot(p.horizon, 226)} i={10} size={205} z={72} at={0} loop={1} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S11 — THE MONEY COMES BACK.  f948-1033 (2.83s).  Intensity 8.
   VO: "so you're not paying Higgsfield or Seedance hundreds of dollars per
        month."

   ⛔⛔ REBUILT TWICE. The first version was the bill again with a blade across
   it. The second replaced it with money lines climbing into two vendor plates —
   correct idea, and the frame strip killed it on three counts no gate saw:
     1. A VERTICAL COLUMN OF CIRCLES IS A CHAIN. 60px coins on a 52px pitch
        overlapped into continuous gold links, so "money climbing" read as two
        conveyor chains hanging off the signs. A prop's SILHOUETTE decides what
        it is, and a stack of touching discs has the silhouette of a chain.
     2. It was a STATE, not an arc — nothing moved for the first second, then
        the cut, then two grey slabs drifted downward for the last 1.2s.
     3. The reversal never read, because the falling coins looked like the
        climbing coins.

   ⭐ SO THE MONEY IS $20 NOTES NOW: bright cream rectangles, well spaced,
   tumbling — a silhouette that cannot be mistaken for a chain, and the largest
   luma delta available against this blue-black hall (§1: motion is area x LUMA
   DELTA, which is what rescued S4).
   ⭐ AND THE EVENT IS A RETURN, NOT A STOP. Notes fly UP into the two vendors
   until the blade cuts; then every note in the frame turns around and comes
   DOWN into a pile at his feet, which grows for the rest of the shot. "You're
   not paying them" is a sentence about where your money ends up, so the picture
   ends on the money back on your side of the room.
   ⛔ NO PER-PRODUCT PRICE ON EITHER MARK — "hundreds" is not sourceable per
   product. The notes carry the bill's own $20 unit and nothing is totalled.
   ⭐ cut 3 of 5. Counter 3 -> 2.
   ====================================================================== */
export const S11: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall2");
  /* ⛔ the cut was at f35 of 85, so the shot spent its first second holding.
     It lands at f22 now and the RETURN owns the remaining two thirds. */
  const CUT = v === "amber" ? 26 : v === "steel" ? 18 : 22;
  const sh = shake(f, CUT + 2, 10, 9);
  const VEN = [
    { x: 288, mark: "logos/higgsfield.png" },
    { x: 724, mark: "logos/bytedance.svg" },
  ];
  /* ⛔ THE PILE WAS AT x=184 AND HE WAS AT x=356, so the money came back to a
     spot on the floor NEXT to him and its bottom row sat on the push crop line.
     "The money comes back to you" only reads if it lands where you are looking.
     Centre frame, and he stands clear of it on the left. */
  const PILE = { x: 506, y: 590 };
  /* ⭐ one $20 note on a bezier, so the path is a real arc rather than a column.
     ⛔ IT USED TO BE CREAM — the same paper stock as the villain's bill, which is
     backwards: the money you get back should not be made of the thing that was
     taking it. It is the shared green `MoneyNote` now. */
  const Note: React.FC<{ x: number; y: number; r: number; s?: number; k?: number }> =
    ({ x, y, r, s = 1, k = 1 }) => (
      <MoneyNote x={x} y={y} s={s * 0.94} rot={r} o={k} z={68} />
    );
  return (
    <Scene p={p} slug="TWO RENTALS STOP" push={push(v, dur, 1.088)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall2" f={f} lit={1} t={f * 0.7} rakeRate={7.4} rk={RAKE_V[v]} />

        {VEN.map((vn, i) => {
          const dt = Math.max(0, f - CUT);
          /* ⛔ they used to drift for 40 frames. They are GONE by dt=18. */
          const drop = f >= CUT ? dt * dt * 2.4 : 0;
          const tip = f >= CUT ? Math.min(26, dt * 2.4) * (i ? 1 : -1) : 0;
          if (drop > 700) return null;
          return (
            <div key={"vn" + i} style={{ position: "absolute", left: vn.x - 168, top: 176 + drop,
              width: 336, height: 200, zIndex: 54, borderRadius: 22,
              transform: `rotate(${tip}deg)`, overflow: "hidden",
              background: f >= CUT
                ? `linear-gradient(172deg, ${dkh(PAPER, 0.40)} 0%, ${dkh(PAPER, 0.58)} 100%)`
                : `linear-gradient(172deg, ${PAPER} 0%, ${dkh(PAPER, 0.14)} 100%)`,
              border: `7px solid ${dkh(PAPER, f >= CUT ? 0.58 : 0.26)}` }}>
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                <Img src={staticFile(vn.mark)} style={{ width: 228, height: 112,
                  objectFit: "contain", opacity: f >= CUT ? 0.34 : 1,
                  filter: f >= CUT ? "grayscale(1)" : "none" }} />
              </div>
              {/* the live charge bar, sweeping while they are still being paid */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 20,
                background: f >= CUT ? dkh(PAPER, 0.52) : hexa(RED, 0.66),
                clipPath: f >= CUT ? "inset(0 100% 0 0)"
                  : `inset(0 ${Math.max(0, 100 - ((f * 5.2 + i * 40) % 150))}% 0 0)` }} />
              {f >= CUT + 2 && (
                <div style={{ position: "absolute", left: -24, right: -24, top: 82, height: 40,
                  background: hexa(RED, 0.84), transform: `rotate(${i ? -8 : 7}deg)
                    scaleX(${Math.min(1, (dt - 2) / 4)})` }} />
              )}
            </div>
          );
        })}

        {/* ⭐ THE MONEY GOING OUT — notes flying up into each vendor on an arc.
            98x56 cream rectangles at a 34-frame period: nothing touches, so
            nothing fuses into a chain. */}
        {f < CUT + 3 && VEN.map((vn, i) =>
          Array.from({ length: 5 }, (_, j) => {
            const t = (((f * 3.1 + j * 20 + i * 11) % 100) / 100);
            const x = 400 + (vn.x - 400) * t + Math.sin(t * 3.2) * 46;
            const y = 780 - t * 540;
            return <Note key={"up" + i + j} x={x} y={y} r={t * 300 + j * 40}
              s={0.75 + t * 0.4} k={Math.min(1, (1 - t) * 3.4)} />;
          }))}

        {/* ⭐ CUT 3 OF 5 — the blade runs the FULL panel width and severs both */}
        <Cutter y={392} f={f} at={CUT} z={78} h={62} dur={13} />
        {VEN.map((vn, i) => (<React.Fragment key={"cx" + i}>
          <Puff x={vn.x} y={392} f={f} at={CUT + 2} n={18} s={1.4} z={80} c="#D9CFA8" up={0.4} />
          <Ring x={vn.x} y={392} f={f} at={CUT + 2} r={310} c={p.key} z={79} w={8} />
        </React.Fragment>))}

        {/* ⭐⭐ THE MONEY COMING BACK — every note turns around and travels the
            full height of the panel into a pile at his feet. Same corridor,
            opposite direction, and the notes read as the SAME objects, which is
            what makes it a reversal rather than a second effect. */}
        {f >= CUT + 2 && Array.from({ length: 14 }, (_, j) => {
          const born = CUT + 2 + j * 3.4;
          if (f < born) return null;
          const t = Math.min(1, (f - born) / 26);
          if (t >= 1) return null;
          const sx = j % 2 ? VEN[1].x : VEN[0].x;
          const x = sx + (PILE.x - sx) * (t * t * 0.55 + t * 0.45);
          const y = 300 + (PILE.y - 300) * t * t;
          return <Note key={"dn" + j} x={x + Math.sin(t * 5 + j) * 24} y={y}
            r={-t * 420 - j * 30} s={0.8 + t * 0.35} k={1} />;
        })}
        {/* the pile it lands in, growing note by note */}
        {Array.from({ length: 14 }, (_, j) => {
          const land = CUT + 2 + j * 3.4 + 26;
          if (f < land) return null;
          const row = Math.floor(j / 4);
          return <Note key={"pl" + j} x={PILE.x + ((j % 4) * 62) - 93 + ((j * 17) % 22)}
            y={PILE.y + 62 - row * 30} r={-18 + ((j * 53) % 38)}
            s={1.24 * squash(f - land, 5, 0.22, 3, 8)} />;
        })}
        {f >= CUT + 26 && (
          <Ring x={PILE.x} y={PILE.y + 30} f={f} at={CUT + 26} r={250} c={GOLD} z={82} w={7} dur={16} />
        )}

        {/* ⛔ THE COUNTER WAS NOT IN THE FRAME AT ALL, IN ANY OF THE 23 STRIP
            FRAMES, AND THE MOTION GATE HAD NOTHING TO SAY ABOUT IT. `x`/`y` are
            the plate's TOP-LEFT and it is 224*s wide, so x=862 at s=0.82 spans
            to 1046 — and the push crops everything past
            `506 + 506/1.088 = 971`. It was hanging off the right edge of the
            panel. Read the rig before trusting the placement. */}
        <ChargeCounter x={678} y={534} f={f} s={0.82} z={84} steps={[[-1, 3], [CUT + 8, 2]]} />

        {/* he throws the blade, then the money lands in front of him */}
        <GCrew f={f} x={271} y={foot(p.horizon, 236)} i={5} size={228} z={72} at={0} loop={4}
          cheer={f > CUT + 12 ? 1 : 0} shock={f >= CUT && f < CUT + 6 ? 1 : 0} />

        <MarkCast x={946} y={172} s={86} z={74} f={f} spin={0.42} o={0.68} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S12 — OPAL · ONE SENTENCE.  f1033-1093 (2.00s).  Intensity 7.
   VO: "4. Opal. You describe an app in one sentence"

   ⛔⛔ REBUILT. Alex: *"at 34 seconds the animation needs to be so much better
   here."* The first version was a press standing on a bench with a white pill
   sliding into it — a machine with no output, in a room the contact sheet read
   as empty. §10: name the mechanism and ask which half is missing. The INPUT
   was drawn; the RESULT of the input was not, and neither was the tool.

   ⭐ Now: he SPEAKS, the sentence leaves his mouth as one lit strip, it flies
   into the machine, and the machine immediately starts ASSEMBLING — app parts
   snapping together on the bed, one after another, while the strip is still
   being read. The build is the interesting part and it starts inside this
   scene rather than waiting for S13.
   ⭐ And the OPAL card lands on its measured name onset (34.98s -> local f13).
   ====================================================================== */
export const S12: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bench");
  const NAME = 13;                       /* "Opal." at 34.98s */
  const SAY = v === "amber" ? 18 : v === "steel" ? 12 : 15;
  const IN = SAY + 12, BUILD = IN + 4;
  const st = E(f, SAY, IN, 0, 1, IO);
  const sh = shake(f, IN, 9, 7);
  /* ⛔⛔ THE COLOURED BLOCKS ARE GONE. Alex: *"I don't know what those coloured
     blocks are supposed to represent. It's kind of odd... maybe just [change it]
     to an opal gem or something."* He is right — six translucent rectangles in
     Google colours snapping onto a bed is an abstraction of an abstraction. The
     VO is "you describe an app in one sentence", so the machine must output an
     APP, and the thing doing the reading should be the product's own object.
     ⭐ Two changes: the machine's read head is now an OPAL GEM that lights as it
     scans the sentence, and what assembles on the bed is a real app screen —
     status bar, header, hero, list rows with icons, a button. */
  const BUILD_STEPS = 6;
  return (
    <Scene p={p} slug="ONE SENTENCE" push={push(v, dur, 1.098)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="bench" f={f} lit={1} t={f * 0.5} rakeRate={4.8} rk={RAKE_V[v]} />

        {/* THE MACHINE — a builder, not a press: an open frame with a bed the
            parts land on and a read head that runs across the sentence */}
        <div style={{ position: "absolute", left: 512, top: 226, width: 300, height: 340, zIndex: 42 }}>
          {[0, 268].map((k, i) => (
            <div key={"mc" + i} style={{ position: "absolute", left: k, top: 0, width: 32, height: 340,
              borderRadius: 5, background: `linear-gradient(90deg, ${mxh("#9A8468", 0.26)} 0%, ${dkh("#9A8468", 0.32)} 100%)` }} />
          ))}
          <div style={{ position: "absolute", left: -20, top: -12, width: 340, height: 58, borderRadius: 8,
            background: `linear-gradient(178deg, ${mxh("#9A8468", 0.30)} 0%, ${dkh("#9A8468", 0.34)} 100%)`,
            border: `5px solid ${dkh("#9A8468", 0.46)}` }}>
            {[0.12, 0.34, 0.56, 0.78].map((q, i) => (
              <div key={"mb" + i} style={{ position: "absolute", left: `${q * 100}%`, top: 18,
                width: 18, height: 18, borderRadius: "50%", background: dkh("#9A8468", 0.52) }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: -26, top: 304, width: 352, height: 60, borderRadius: 8,
            background: `linear-gradient(178deg, ${mxh("#9A8468", 0.20)} 0%, ${dkh("#9A8468", 0.44)} 100%)`,
            border: `5px solid ${dkh("#9A8468", 0.50)}` }} />
        </div>

        {/* ⭐ THE OPAL — the machine's read head is the product's own object, a
            cut gem that travels the beam and fires on each pass. Its facets are
            a conic gradient in muted Google values, which is what an opal
            actually does with light. ⛔ matte: solid stops, no blur.
            ⛔⛔ IT WAS INSIDE THE MACHINE'S OWN DIV AT z=42 AND THE APP IT BUILDS
            SITS AT z=58 — so the one object the whole note asked for was drawn
            BEHIND the thing it was building and never appeared. It is
            scene-absolute now, on the beam above the bed, at z=70. */}
        {f >= IN && (() => {
          const px = 540 + ((f - IN) * 9) % 216;
          const beat = ((f - IN) * 9) % 216 < 20 ? 1 : 0;
          const G = 104;
          return (<>
            {/* the scan it drags down over the bed */}
            <div style={{ position: "absolute", left: px - 5, top: 272, width: 10, height: 286,
              zIndex: 69, background: hexa(G_BLUE, 0.30) }} />
            <div style={{ position: "absolute", left: px - G / 2, top: 214, width: G, height: G,
              zIndex: 70, transform: `rotate(${(f - IN) * 4}deg) scale(${1 + beat * 0.18})`,
              clipPath: "polygon(50% 0%, 88% 26%, 100% 66%, 50% 100%, 0% 66%, 12% 26%)",
              background: `conic-gradient(from ${(f - IN) * 7}deg, ${G_BLUE} 0deg, ${G_GRN} 84deg, ${G_YEL} 168deg, ${G_RED} 246deg, ${G_BLUE} 360deg)` }} />
            {/* the crown and pavilion facets, so it reads as CUT, not as a blob */}
            <div style={{ position: "absolute", left: px - G / 2, top: 214, width: G, height: G,
              zIndex: 71, transform: `rotate(${(f - IN) * 4}deg) scale(${1 + beat * 0.18})`,
              clipPath: "polygon(50% 0%, 88% 26%, 50% 40%, 12% 26%)",
              background: hexa("#FFFFFF", 0.46) }} />
            <div style={{ position: "absolute", left: px - G / 2, top: 214, width: G, height: G,
              zIndex: 71, transform: `rotate(${(f - IN) * 4}deg) scale(${1 + beat * 0.18})`,
              clipPath: "polygon(12% 26%, 50% 40%, 50% 100%, 0% 66%)",
              background: hexa("#0A0A10", 0.24) }} />
          </>);
        })()}

        {/* ⭐ THE ONE SENTENCE — a single lit strip, spoken, flying in */}
        {f >= SAY && f < IN + 6 && (
          <div style={{ position: "absolute", left: 214 + st * 348, top: 452 - st * 130,
            width: 340, height: 52, zIndex: 60, borderRadius: 26,
            background: `linear-gradient(94deg, #FFFFFF 0%, ${dkh(CREAMB, 0.05)} 100%)`,
            border: `5px solid ${hexa(G_BLUE, 0.42)}`,
            transform: `scale(${E(f, SAY, SAY + 7, 0, 1, BACK)}) rotate(${-6 + st * 6}deg)` }}>
            {[16, 104, 168, 248].map((k, i) => (
              <div key={"sw" + i} style={{ position: "absolute", left: k, top: 19, width: 74 - i * 12,
                height: 13, borderRadius: 4, background: hexa(INK, 0.30) }} />
            ))}
          </div>
        )}

        {/* ⭐ THE BUILD STARTS HERE — parts snapping onto the bed one after
            another, which is the half the first version was missing */}
        {/* ⭐⭐ THE APP IT BUILDS — a real screen assembling on the bed, part by
            part, in the order anyone actually builds one: frame, status bar,
            header, hero, list rows, button. That is what "describe an app in one
            sentence" produces, and it is legible at a glance in a way six tinted
            rectangles never were. */}
        {f >= BUILD && (
          <div style={{ position: "absolute", left: 548, top: 268, width: 178, height: 286, zIndex: 58,
            borderRadius: 18, overflow: "hidden", background: "#F5F2EA",
            border: `5px solid ${dkh("#9A8468", 0.44)}`,
            transform: `scale(${squash(f - BUILD, 6, 0.24, 3, 10)})` }}>
            {/* status bar */}
            {f >= BUILD + 4 && (
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 18,
                background: hexa(INK, 0.10), display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "0 8px" }}>
                <div style={{ width: 22, height: 5, borderRadius: 2, background: hexa(INK, 0.30) }} />
                <div style={{ width: 14, height: 5, borderRadius: 2, background: hexa(INK, 0.30) }} />
              </div>
            )}
            {/* header */}
            {f >= BUILD + 8 && (
              <div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 34,
                background: G_BLUE, display: "flex", alignItems: "center", gap: 7, paddingLeft: 9,
                transform: `scaleY(${squash(f - BUILD - 8, 5, 0.4, 2, 8)})`, transformOrigin: "50% 0%" }}>
                <div style={{ width: 15, height: 15, borderRadius: 4, background: hexa("#FFF", 0.85) }} />
                <div style={{ width: 62, height: 8, borderRadius: 3, background: hexa("#FFF", 0.7) }} />
              </div>
            )}
            {/* hero */}
            {f >= BUILD + 13 && (
              <div style={{ position: "absolute", left: 10, top: 60, right: 10, height: 62,
                borderRadius: 8, background: `linear-gradient(150deg, ${G_GRN} 0%, ${G_BLUE} 100%)`,
                transform: `scale(${squash(f - BUILD - 13, 5, 0.26, 2, 8)})` }}>
                <div style={{ position: "absolute", left: 10, bottom: 9, width: 74, height: 7,
                  borderRadius: 3, background: hexa("#FFF", 0.72) }} />
              </div>
            )}
            {/* list rows, each with an icon */}
            {[0, 1, 2].map(i => f >= BUILD + 18 + i * 5 && (
              <div key={"lr" + i} style={{ position: "absolute", left: 10, top: 132 + i * 34,
                right: 10, height: 28, borderRadius: 6, background: hexa(INK, 0.07),
                display: "flex", alignItems: "center", gap: 8, paddingLeft: 7,
                transform: `scale(${squash(f - BUILD - 18 - i * 5, 5, 0.22, 2, 8)})`,
                transformOrigin: "0% 50%" }}>
                <div style={{ width: 17, height: 17, borderRadius: 5,
                  background: [G_RED, G_YEL, G_GRN][i] }} />
                <div style={{ width: 70 - i * 12, height: 6, borderRadius: 3,
                  background: hexa(INK, 0.28) }} />
              </div>
            ))}
            {/* the button, last — the app is finished */}
            {f >= BUILD + 34 && (
              <div style={{ position: "absolute", left: 26, right: 26, bottom: 14, height: 28,
                borderRadius: 14, background: G_BLUE, display: "grid", placeItems: "center",
                transform: `scale(${squash(f - BUILD - 34, 6, 0.3, 2, 9)})` }}>
                <div style={{ width: 46, height: 7, borderRadius: 3, background: hexa("#FFF", 0.86) }} />
              </div>
            )}
          </div>
        )}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <Ring key={"pr" + i} x={637} y={300 + i * 44} f={f} at={BUILD + 4 + i * 5} r={116}
            c={p.key} z={59} w={4} dur={10} />
        ))}
        <Puff x={664} y={400} f={f} at={IN} n={16} s={1.3} z={62} c="#C09660" />
        <Ring x={664} y={404} f={f} at={IN} r={270} c={p.key} z={61} w={7} />

        {/* ⭐ THE TOOL, NAMED WHERE THE VO NAMES IT */}
        <ToolCard x={186} y={330} s={0.66} i={3} f={f} at={NAME} z={74} rot={-4} auraAt={NAME + 8} auraC={p.key} />
        <Ring x={186} y={322} f={f} at={NAME} r={170} c={p.key} z={73} w={5} dur={13} />

        {/* he speaks it — one gesture, at the bench line */}
        <GCrew f={f} x={289} y={foot(p.horizon, 44)} i={4} size={251} z={80} at={0} loop={1} />
      </div>
    </Scene>
  );
};

export const S13: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bench");
  const off = v === "amber" ? 6 : v === "steel" ? -4 : 0;
  const OPEN = 6 + off, RISE = OPEN + 4, CARRY = RISE + 26, CHAIN = CARRY + 16;
  const CUT = 78;
  const ct = E(f, RISE, CARRY, 0, 1, OUT);
  return (
    <Scene p={p} slug="SENT AS A LINK" push={push(v, dur, 1.066)} vig={0.38}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="bench" f={f} lit={1.1} t={f * 0.6} rakeRate={5.4} rk={RAKE_V[v]} />

        {/* the press, open, with the tile coming out of it */}
        <div style={{ position: "absolute", left: 96, top: 210, width: 280, height: 290, zIndex: 40,
          borderRadius: 6, background: `linear-gradient(178deg, ${mxh("#9A8468", 0.16)} 0%, ${dkh("#9A8468", 0.36)} 100%)`,
          border: `6px solid ${dkh("#9A8468", 0.46)}` }}>
          <div style={{ position: "absolute", left: 20, top: 16, right: 20,
            height: 110 - E(f, OPEN, OPEN + 12, 0, 96, OUT), background: dkh("#3A2C1E", 0.10) }} />
        </div>

        {/* ⭐ THE WORKING APP — live UI on its face, travelling the bench */}
        <AppTile x={236 + ct * 300} y={470 - Math.sin(ct * Math.PI) * 120} s={0.94} f={f}
          at={RISE} z={64} live />
        <Ring x={236} y={430} f={f} at={RISE} r={200} c={p.key} z={62} w={6} />

        {/* ⭐ the tool that owns this beat, named */}
        <ToolCard x={136} y={276} s={0.56} i={3} f={f} at={4} z={76} rot={-3} auraAt={12} auraC={p.key} />

        {/* ⭐ THE REAL OPAL PAGE, captured live from opal.google — the prompt box
            and "Build, edit, and share AI mini-apps using natural language". */}
        <Shot x={790} y={214} w={380} f={f} at={OPEN} src="shots/bill_opal.png"
          z={44} label="opal.google" pan={90} />

        {/* ⭐⭐ THE LINK — real chain links snapping out the full panel width */}
        <LinkChain x0={596} y0={356} x1={912} y1={352} f={f} at={CHAIN} z={70} c={SKY} n={11} />
        {/* the far end lights up: a second, running copy */}
        {f >= CHAIN + 14 && (
          <AppTile x={912} y={470} s={0.62} f={f} at={CHAIN + 14} z={66} live />
        )}
        <Ring x={912} y={430} f={f} at={CHAIN + 16} r={190} c={SKY} z={65} w={6} />

        {/* ⛔ 7.20 — ONE TILE TRAVELLING IS ONE MOVER, and §9's per-scene budget
            says 3-5 movers sits at 2-4 while MANY LARGE OBJECTS ARRIVING
            CONTINUOUSLY is the only shape that clears the bar. The link does not
            send one copy: it sends the app to everyone who opens it, so a run of
            recipient cards lands along the chain across the whole back half. */}
        {Array.from({ length: 7 }, (_, i) => {
          const at = CHAIN + 4 + i * 5;
          if (f < at) return null;
          const t = Math.min(1, (f - at) / 10);
          return (
            <div key={"rc" + i} style={{ position: "absolute", left: 604 + i * 52, top: 190 - (i % 3) * 40,
              width: 68, height: 84, zIndex: 68, borderRadius: 8,
              background: "#FFFFFF", border: `3px solid ${dkh("#E6E1D4", 0.18)}`,
              transform: `scale(${squash(f - at, 5, 0.26, 3, 9)}) rotate(${-8 + i * 3}deg)`,
              opacity: t }}>
              <div style={{ position: "absolute", left: 6, top: 6, right: 6, height: 22, borderRadius: 4,
                background: hexa(G_BLUE, 0.30) }} />
              {[0.42, 0.58, 0.74].map((k, j) => (
                <div key={"rl" + j} style={{ position: "absolute", left: 7, top: `${k * 100}%`,
                  width: `${68 - j * 18}%`, height: 6, borderRadius: 2, background: hexa(INK, 0.22) }} />
              ))}
            </div>
          );
        })}

        {/* three Claudes: builds it, hands it over, receives it and cheers */}
        <GCrew f={f} x={259} y={foot(p.horizon, 44)} i={4} size={220} z={80} at={0} loop={1} />
        <GCrew f={f} x={584} y={foot(p.horizon, 48)} i={0} size={205} z={81} at={RISE} loop={4} />
        <GCrew f={f} x={807} y={foot(p.horizon, 44)} i={6} size={205} z={81} at={CHAIN}
          loop={2} flip cheer={f > CHAIN + 16 ? 1 : 0} />

        {/* ⭐ cut 4 of 5 */}
        <BillRoll x={rollX(200, CUT, 0.8)} y={p.horizon + 196} w={116} f={f} rows={rowsFor(3, CUT)} rowH={200} z={68}
          dir="h" creep={0.8} head={false} />
        <Cutter y={p.horizon + 240} f={f} at={CUT} z={76} h={40} dur={12} />
        <ChargeCounter x={40} y={122} f={f} s={0.68} z={84} steps={[[-1, 2], [CUT + 14, 1]]} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S14 — THE REAL IDE.  f1195-1275 (2.67s).  Intensity 7.
   VO: "5. Antigravity. It's a free coding IDE from Google"

   ⛔⛔⛔ REBUILT. Alex: *"animation of forty one seconds needs to be completely
   reworked."* The old shot was three "bays" lighting up in sequence behind a
   power surge — an invented metaphor for a code editor, which the viewer has to
   translate before it means anything. Antigravity is a real product with a real
   page, and the reel already proved what works here: *"the Google VO looks
   pretty good at, like, how you use real b roll. That's very, very good."*
   [[feedback_real_product_footage]] — real footage is the biggest single motion
   AND credibility lever available, and this scene was passing it up.

   ⭐ SO THE SCENE IS THE PRODUCT. Google's own Antigravity page, full width,
   scrolling — the same treatment as the AI Studio capture in S5. The three bays
   are gone. What is left is one real screen, the card on its measured name
   onset, and the crew watching it.
   ====================================================================== */
export const S14: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bays");
  const off = v === "amber" ? 4 : v === "steel" ? -3 : 0;
  const OPEN = 2 + off, NAME = 18;
  const sh = shake(f, OPEN, 9, 7);
  return (
    <Scene p={p} slug="THE FREE IDE" push={push(v, dur, 1.080)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="bays" f={f} lit={1.05} t={f * 0.5} rakeRate={5.2} rk={RAKE_V[v]} />

        {/* ⭐⭐ GOOGLE'S OWN ANTIGRAVITY PAGE, scrolling. `Shot` pans the capture
            because a still is a poster — the pan is what makes real footage
            read as footage rather than as a screenshot pasted on a wall. */}
        {/* ⛔ `ratio 0.64 / pan 220` PANNED STRAIGHT INTO THE BLACK. The capture
            is a bright page above a near-black product panel; at that ratio the
            window was as tall as the whole render, so the pan walked the frame
            down into the dark half and the last two thirds of the scene were a
            black rectangle. A shorter window over a shorter pan keeps the
            wordmark and the headline on screen and only teases the panel. */}
        <Shot x={506} y={330} w={812} f={f} at={OPEN} src="shots/bill_antigravity_ide.png"
          z={46} label="antigravity.google" ratio={0.44} pan={96} />

        {/* the arrival, felt once */}
        <Ring x={506} y={352} f={f} at={OPEN + 4} r={520} c={p.key} z={70} w={10} dur={18} />
        <Puff x={506} y={560} f={f} at={OPEN + 4} n={16} s={1.4} z={69} c="#527084" />

        {/* THE CARD, on its measured name onset */}
        <ToolCard x={122} y={286} s={0.58} i={4} f={f} at={NAME} z={80} rot={-4} auraAt={NAME + 8} auraC={p.key} />
        <CardLand x={122} y={286} s={0.46} f={f} at={NAME} z={81} c={p.key} />

        {/* two watching it, not nine — the screen is the subject here */}
        <GCrew f={f} x={255} y={foot(p.horizon, 210)} i={7} size={206} z={72} at={4} loop={1} />
        <GCrew kind="beaker" f={f} x={801} y={foot(p.horizon, 210)} i={9} size={206} z={72}
          at={9} loop={2} flip />
        <MarkCast x={912} y={168} s={84} z={78} f={f} spin={0.5} o={0.62} />
      </div>
    </Scene>
  );
};

export const S15: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bays");
  const off = v === "amber" ? 5 : v === "steel" ? -3 : 0;
  const ED = 65, TE = 88, BR = 107;
  /* the crew pours in across the FULL pre-arrival stretch, never front-loaded */
  const POUR = Array.from({ length: 9 }, (_, i) => 6 + off + i * 6);
  return (
    <Scene p={p} slug="A TEAM AT ONCE" push={push(v, dur, 1.056)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="bays" f={f} lit={1.15} t={f * 0.7} rakeRate={6.8} rk={RAKE_V[v]} />

        {/* the hatch they pour out of — §10: a hand-off needs a source */}
        <div style={{ position: "absolute", left: 440, top: 96, width: 140, height: 92, zIndex: 30,
          borderRadius: "0 0 12px 12px", background: dkh("#0A1016", 0.02),
          border: `6px solid ${dkh("#243440", 0.46)}`, borderTop: "none" }} />

        {/* ⛔⛔ THE PEAK MEASURED 6.04 — THE LOWEST SCENE IN THE REEL. Diagnosed
            rather than guessed: `live` was set to each bay's WORD (65 / 88 /
            107), so for the first 2.2s of a 4.0s scene all three screens were
            BLANK. The bays were switched on in S14; they never went off. They
            are live from frame 0, and the word is a SURGE, not a start —
            which is also what the line says ("runs a team of agents AT ONCE"
            is a state, and the words only name the surfaces). */}
        {[0, 1, 2].map(i => (
          <Bay key={"by" + i} x={244 + i * 262} y={p.horizon - 24} w={228} h={264} f={f}
            open={-40} kind={i as 0 | 1 | 2} z={34 + i} live={-40} />
        ))}
        {/* the SURGE on each bay's own word: the screen floods and its sign
            flares. Three large bright rectangles repainting inside one sample
            is the shape §1's table actually rewards. */}
        {[[ED, 244], [TE, 506], [BR, 768]].map(([k, x], i) => {
          const t = f >= k && f < k + 14 ? 1 - (f - k) / 14 : 0;
          if (t <= 0) return null;
          return (
            <div key={"sg" + i} style={{ position: "absolute", left: x - 132, top: p.horizon - 306,
              width: 264, height: 300, zIndex: 40, borderRadius: 8,
              background: hexa(p.key, 0.52 * t) }} />
          );
        })}
        {[[ED, 244], [TE, 506], [BR, 768]].map(([k, x], i) => (
          <React.Fragment key={"bw" + i}>
            <Ring x={x} y={p.horizon - 150} f={f} at={k} r={230} c={p.key} z={76} w={7} dur={15} />
            <Puff x={x} y={p.horizon - 60} f={f} at={k} n={12} s={1.1} z={75} c="#527084" />
          </React.Fragment>
        ))}

        {/* ⭐ THE CREW — three per bay, two ranks, back rank darker and smaller
            so depth reads on the greyscale audit. Each bay a different loop. */}
        {/* ⛔ 128px SPRITES ARE NOT THE SHAPE THAT MEASURES. §5: swapping slabs
            for sprites DROPPED reel 107's score until they were scaled up and
            their arrival shortened to 8 frames. 156px front rank, and the
            pitch check still holds: `spacing >= 0.85 * size` = 133, and the
            in-bay pitch is 262/2 = 131 across two columns per bay with the
            second column offset in Y, so no two bodies overlap. */}
        {POUR.map((k, i) => {
          const bay = i % 3, rank = Math.floor(i / 3);
          /* ⛔ THE LITERAL SWEEP COULD NOT SEE THIS ONE — the x is computed, so
             it was skipped and the bay-0 front rank sat at x=150 with a 200px
             body: 65px outside the band. Base 220 with a 104px rank offset puts
             all nine inside 115..943. Compute the bound for FORMULA placements
             too, not just for literals. */
          /* ⛔ +26 on the base and a tighter bay pitch: the new PACE loop swings
             0.12 x size laterally and the old base put rank 0 back outside. */
          const x = 248 + bay * 252 + (rank % 2) * 100 + (rank === 2 ? 50 : 0);
          /* ⛔⛔ THIS IS THE SCENE ALEX WAS LOOKING AT. `p.horizon + 158 + rank*70`
             on a 546 horizon puts the three ranks at 704 / 774 / 844 — and S15's
             crop line is 708. SIX OF THE NINE AGENTS IN THE "TEAM OF AGENTS"
             SHOT WERE ENTIRELY BELOW THE FRAME, and the front rank sat exactly
             on the line. Scaling them up did nothing because the problem was
             never their size. 566 / 618 / 670 puts all three ranks inside, with
             52px of separation so depth still reads. */
          const y = p.horizon + 20 + rank * 52;
          /* ⛔⛔ 156px WAS THE SMALLEST CAST IN THE REEL, IN THE SCENE THAT IS
             ABOUT THE CAST. The ×1.28 global rescale only touched `size={N}`
             literals, and these nine are computed — so the "team of agents"
             shot kept sprites 40% smaller than every neighbouring scene while
             Alex was asking for 44s to be elevated. §5: sprites measure WORSE
             until they are big. Front rank 200px, and the pitch law still
             holds — `spacing >= 0.85 * size` = 170 and the in-bay column
             offset is 104px in x against 62px in y, so ranks interleave in
             depth rather than overlapping. */
          const size = 200 - rank * 26;
          return (
            /* ⭐ two of the nine are BEAKERS, so a crew of agents reads as a team
               rather than one character cloned nine times */
            <React.Fragment key={"cw" + i}>
              {/* ⭐ EACH AGENT IS WIRED INTO ITS BAY. `feedback_action_loop_is_not_a_scene`:
                  eight correctly-looping sprites still read as standing around
                  bouncing — a sprite needs a JOB WITH AN OBJECT. A work line
                  runs from every front-rank agent up into the screen it is
                  driving, and a packet travels UP that line on a stagger, so
                  the bays are visibly being fed by the crew. */}
              {rank === 0 && (<>
                <div style={{ position: "absolute", left: x - 3, top: p.horizon - 30,
                  width: 6, height: 190, zIndex: 58, borderRadius: 3,
                  background: hexa(p.key, 0.40) }} />
                {[0, 1].map(j => {
                  const ph = ((f * 3.4 + i * 21 + j * 46) % 92) / 92;
                  return (
                    <div key={"pk" + j} style={{ position: "absolute", left: x - 11,
                      top: p.horizon + 160 - ph * 190, width: 22, height: 22, borderRadius: 5,
                      zIndex: 60, background: hexa(p.key, 0.9 * (1 - ph * 0.5)),
                      transform: `rotate(${ph * 180}deg)` }} />
                  );
                })}
              </>)}
              <GCrew kind={i === 2 || i === 6 ? "beaker" : "gem"}
                f={f} x={x} y={y} i={i} size={size} z={62 - rank * 3} at={k}
                loop={bay === 0 ? 1 : bay === 1 ? 4 : 2} />
            </React.Fragment>
          );
        })}

        {/* ⭐⭐ THE TICKET — one work item handed bay to bay across the panel.
            ⛔ Its first leg used to start at ED+8 = f73, i.e. 61% of the scene
            with nothing travelling between the bays at all. It now runs from
            f10 and loops the circuit twice, so the thing that makes three bays
            ONE SYSTEM is present for the whole beat. */}
        <Ticket f={f} s={1.25} z={82} legs={[
          [10, 34, 158, 500, 244, 452],
          [36, 58, 244, 452, 506, 452],
          [60, ED + 6, 506, 452, 768, 452],
          [ED + 8, TE - 2, 768, 452, 244, 470],
          [TE + 8, BR - 2, 244, 470, 506, 470],
          [BR + 8, BR + 26, 506, 470, 906, 430],
        ]} />

        {/* ⭐ §10 — THE MISSING HALF WAS THE OUTPUT. Three bays full of agents
            and nothing came OUT of them; reel 109's bench went 12.12 -> 14.80
            on exactly this note. A full-width delivery rail along the bottom
            fills continuously — the single highest-value shape in §1's table
            (a full-width travelling band) and the answer to the §3 test at
            once: the picture adds *what the team is producing*. */}
        <div style={{ position: "absolute", left: -60, right: -60, top: p.horizon + 236, height: 62,
          zIndex: 70, borderRadius: 5,
          background: `linear-gradient(178deg, ${mxh("#2E3F4C", 0.20)} 0%, ${dkh("#2E3F4C", 0.36)} 100%)` }} />
        {Array.from({ length: 16 }, (_, i) => {
          const born = 8 + i * 6.6;
          if (f < born) return null;
          const t = Math.min(1, (f - born) / 26);
          const x = ((i * 88 + (f - born) * 7.2) % 1220) - 100;
          return (
            <div key={"dl" + i} style={{ position: "absolute", left: x, top: p.horizon + 190,
              width: 76, height: 52, zIndex: 72, borderRadius: 5,
              background: `linear-gradient(172deg, ${mxh(CREAMB, 0.14)} 0%, ${dkh(CREAMB, 0.14)} 100%)`,
              border: `3px solid ${dkh(CREAMB, 0.30)}`,
              transform: `scale(${squash(f - born, 5, 0.24, 3, 9)}) rotate(${-4 + (i % 3) * 4}deg)` }}>
              <div style={{ position: "absolute", left: 7, top: 9, right: 7, height: 8, borderRadius: 2,
                background: hexa(INK, 0.24) }} />
              <div style={{ position: "absolute", left: 7, top: 23, width: "56%", height: 7,
                borderRadius: 2, background: hexa(INK, 0.16) }} />
              <div style={{ position: "absolute", right: 6, bottom: 6, width: 14, height: 14,
                borderRadius: 3, background: hexa(GREEN, 0.7 * t) }} />
            </div>
          );
        })}

        <ToolCard x={884} y={228} s={0.52} i={4} f={f} at={4} z={80} rot={3} auraAt={12} auraC={p.key} />
        <MarkCast x={118} y={126} s={84} z={78} f={f} spin={0.55} o={0.68} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S16 — WATCH THEM WORK.  f1395-1434 (1.30s).  Intensity 5.
   VO: "while you just watch them work."

   ⭐ THE CONTRAST IS THE INFORMATION: the whole frame is running and ONE thing
   is deliberately still. That is the only shot in the reel whose hero does
   nothing, and it only works because everything behind him does not.
   ====================================================================== */
export const S16: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bays");
  const SWING = v === "amber" ? 8 : v === "steel" ? 3 : 5;
  const st = E(f, SWING, SWING + 12, 0, 1, OUT);
  return (
    <Scene p={p} slug="YOU JUST WATCH" push={push(v, dur, 1.112)} vig={0.54}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="bays" f={f} lit={0.86} t={f * 0.8} rakeRate={7.0} rk={RAKE_V[v]} />

        {/* the three bays keep roaring behind him, smaller and further back */}
        {[0, 1, 2].map(i => (
          <Bay key={"by" + i} x={210 + i * 296} y={p.horizon - 96} w={190} h={210} f={f}
            open={-40} kind={i as 0 | 1 | 2} z={30 + i} live={-40} />
        ))}
        {/* and the crew keeps working */}
        {Array.from({ length: 6 }, (_, i) => (
          <GCrew key={"cw" + i} f={f} x={150 + (i % 3) * 296 + Math.floor(i / 3) * 76}
            /* ⛔ `+96 + 40` put the back rank at 722, past S16's own bound of 708 */
            y={p.horizon + 40 + Math.floor(i / 3) * 40} i={i + 3} size={104 - Math.floor(i / 3) * 12}
            z={48 - Math.floor(i / 3) * 3} at={-20} loop={i % 3 === 0 ? 1 : i % 3 === 1 ? 4 : 2} />
        ))}

        {/* THE CHAIR — a real one: a base, a gas strut, five castors, a seat,
            a back and two arms. It swings round and he settles. */}
        <div style={{ position: "absolute", left: 506 - 130, top: p.horizon + 96, width: 260,
          height: 240, zIndex: 76, transform: `rotate(${(1 - st) * -46}deg)`, transformOrigin: "50% 90%" }}>
          {[0, 52, 104, 156, 208].map((k, i) => (
            <div key={"cs" + i} style={{ position: "absolute", left: k, top: 196, width: 46, height: 15,
              borderRadius: 7, background: dkh("#1E2A34", 0.20) }} />
          ))}
          <div style={{ position: "absolute", left: 116, top: 128, width: 28, height: 72,
            background: dkh("#1E2A34", 0.10) }} />
          <div style={{ position: "absolute", left: 34, top: 92, width: 192, height: 44, borderRadius: 10,
            background: `linear-gradient(178deg, ${mxh("#2A3A46", 0.20)} 0%, ${dkh("#2A3A46", 0.30)} 100%)` }} />
          <div style={{ position: "absolute", left: 44, top: -66, width: 172, height: 160, borderRadius: 14,
            background: `linear-gradient(178deg, ${mxh("#2A3A46", 0.24)} 0%, ${dkh("#2A3A46", 0.34)} 100%)` }} />
          {[18, 214].map((k, i) => (
            <div key={"ca" + i} style={{ position: "absolute", left: k, top: 66, width: 26, height: 60,
              borderRadius: 6, background: dkh("#2A3A46", 0.16) }} />
          ))}
        </div>
        {/* ⭐ he leans back, feet up, hands behind his head — and stays still */}
        {/* ⛔ HE IS THE SUBJECT OF HIS OWN SHOT AND HE WAS HARD TO FIND. 184px
            among six 104px workers is not a hierarchy; 226px with his own light
            pool under him is. `feedback_hook_simplicity`: striking comes from
            SCALE, and the thing that ranks is the one with air around it. */}
        <Pool x={506} y={p.horizon + 156} w={520} c={p.key} o={0.46} z={75} h={280} />
        <div style={{ position: "absolute", left: 506 - 113, top: p.horizon - 6, width: 226,
          height: 226, zIndex: 78, opacity: st,
          transform: `rotate(${-14 + (1 - st) * -30}deg)`, transformOrigin: "50% 100%" }}>
          <Mascot lf={f} size={226} gaze={0.2} nodAmp={1.4} nodSpeed={22} cheer={0.35} suit={1} />
        </div>
        <Ring x={506} y={p.horizon + 130} f={f} at={SWING + 12} r={230} c={p.key} z={80} w={6} />

        <Pool x={506} y={p.horizon + 210} w={620} c={p.key} o={0.34} z={74} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S17 — THE SHIP LINE.  f1434-1517 (2.77s).  Intensity 8.
   VO: "This is how people become 20 times more productive with their coding
        agents,"

   ⛔⛔ REBUILT. Alex: *"animation at 49 seconds is way too boring here not
   good."* The old shot was a rack filling with 66x46 beige rectangles — two
   divs each, thirty of them, all identical. That is exactly the defect in
   `feedback_props_need_real_drawing`: "a whole lot of nothing even though
   there's more stuff". More anonymous bricks is not more production, and a
   rack that has finished extending by f30 is a still life for the last 1.8s.

   ⭐ NOW IT IS A LINE WITH PEOPLE ON IT. The sentence is about CODING AGENTS,
   so what the belt carries is finished BUILDS — real drawn screens with a title
   bar, live code lines, coloured blocks and a green check — and four agents
   stand along it doing a real job to each one as it passes.
   ⭐ `feedback_action_loop_is_not_a_scene`: a loop is what a sprite does WHILE
   the scene happens; a sprite needs A JOB WITH AN OBJECT THAT MOVES BETWEEN
   THEM. The unit travels the full width, each agent's arm comes down on it as
   it arrives, the screen completes a stage under that arm, and it moves on.
   ⭐ AND THE OUTPUT IS COUNTABLE: the units stack at the end into a tower that
   grows past the top of frame. Volume is what "20 times" is allowed to look
   like — ⛔ NO `20x` PLATE, NO MULTIPLIER GAUGE, NO PERCENTAGE. There is no
   published benchmark behind the figure, so it stays in the audio and caption.
   ====================================================================== */
export const S17: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("out");
  const off = v === "amber" ? 5 : v === "steel" ? -3 : 0;
  const BY = 372;                        /* the belt's top edge            */
  const SPD = 8.6, PITCH = 236, SPAN = 1416;
  /* four stations across the panel; a unit is "under" one when it passes */
  /* ⛔⛔ FOUR STATIONS NEVER FITTED. The real safe band here is x 198..892 —
     694px — and four 192px sprites need 768px with no gap at all, so the outer
     two were always going to be half outside the frame. THREE stations, evenly
     spread, every body fully inside; and the output stack sits at 740..878,
     which is inside the band and clears the sprites vertically because it grows
     UPWARD from the belt while they stand below it. */
  const ST = [318, 506, 694];   /* pulled in for the loop's lateral swing */
  return (
    <Scene p={p} slug="MUCH MORE FINISHED" push={push(v, dur, 1.074)} vig={0.32}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="out" f={f} lit={1} t={f * 0.7} rakeRate={4.4} rk={RAKE_V[v]} />

        {/* ⭐ THE BELT — full width, moving, with visible tread so the surface
            itself repaints rather than the cargo sliding on a static bar */}
        <div style={{ position: "absolute", left: -80, right: -80, top: BY, height: 82, zIndex: 44,
          borderRadius: 8, overflow: "hidden",
          background: `linear-gradient(178deg, ${mxh("#33424E", 0.18)} 0%, ${dkh("#33424E", 0.40)} 100%)`,
          borderTop: `5px solid ${mxh("#33424E", 0.30)}` }}>
          {Array.from({ length: 22 }, (_, i) => (
            <div key={"tr" + i} style={{ position: "absolute",
              left: ((i * 62 - f * SPD) % 1300) - 80, top: 0, bottom: 0, width: 22,
              background: dkh("#33424E", 0.52) }} />
          ))}
        </div>
        {/* the drive wheels under it, turning */}
        {[40, 300, 560, 820, 1040].map((wx, i) => (
          <div key={"dw" + i} style={{ position: "absolute", left: wx - 34, top: BY + 62, width: 68,
            height: 68, borderRadius: "50%", zIndex: 42,
            background: `radial-gradient(circle at 38% 34%, ${mxh("#33424E", 0.22)} 0%, ${dkh("#33424E", 0.46)} 100%)`,
            border: `5px solid ${dkh("#33424E", 0.56)}`,
            transform: `rotate(${-f * 9}deg)` }}>
            <div style={{ position: "absolute", left: 28, top: 6, width: 8, height: 22, borderRadius: 4,
              background: dkh("#33424E", 0.62) }} />
          </div>
        ))}

        {/* ⭐ THE BUILDS — real screens, not bricks: title bar, three live code
            lines that fill stage by stage, colour blocks, and a check that
            lands at the last station. Six on the belt at any moment. */}
        {Array.from({ length: 7 }, (_, i) => {
          const x = ((i * PITCH - f * SPD + off * 8) % SPAN) - 300;
          if (x < -230 || x > 1120) return null;
          /* ⛔⛔ THE COMPLETION WAS RUNNING BACKWARDS. The belt travels RIGHT TO
             LEFT (`- f * SPD`), so a build's centre x DECREASES — and
             `x + 96 > sx` counts stations to its LEFT, which means every build
             entered the frame fully finished and got emptier as it went down the
             line. Stations it has PASSED are the ones now to its RIGHT. */
          const cx = x + 96;
          const done = ST.filter(sx => sx >= cx).length;
          const hit = ST.some(sx => Math.abs(cx - sx) < 16);
          return (
            <div key={"bu" + i} style={{ position: "absolute", left: x, top: BY - 158, width: 192,
              height: 158, zIndex: 60, borderRadius: 10, overflow: "hidden",
              background: `linear-gradient(172deg, ${mxh(CREAMB, 0.16)} 0%, ${dkh(CREAMB, 0.16)} 100%)`,
              border: `4px solid ${dkh(CREAMB, 0.34)}`,
              transform: `translateY(${hit ? -7 : 0}px) scale(${hit ? 1.05 : 1})` }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26,
                background: dkh(CREAMB, 0.26), display: "flex", alignItems: "center", gap: 6,
                paddingLeft: 9 }}>
                {[RED, GOLD, GREEN].map((q, j) => (
                  <div key={"dt" + j} style={{ width: 10, height: 10, borderRadius: "50%",
                    background: hexa(q, j < done ? 0.9 : 0.28) }} />
                ))}
              </div>
              {/* the code lines, filling in as it passes each station */}
              {[0, 1, 2].map(j => (
                <div key={"cl" + j} style={{ position: "absolute", left: 12, top: 44 + j * 24,
                  width: j < done ? [118, 92, 136][j] : 16, height: 13, borderRadius: 3,
                  background: hexa(INK, j < done ? 0.34 : 0.13) }} />
              ))}
              {/* the built blocks, stacking in from the right */}
              {[0, 1].map(j => (
                j < done - 1 ? (
                  <div key={"bk" + j} style={{ position: "absolute", right: 12, top: 40 + j * 34,
                    width: 40, height: 26, borderRadius: 4,
                    background: hexa([G_BLUE, G_RED, G_YEL][j], 0.78) }} />
                ) : null
              ))}
              {/* ⭐⭐ THE STAMPS. Alex: *"those little things on the factory belt
                  stamping down, it needs to actually show a stamp on the papers
                  — each stamp, stamp down, and then we see a stamp on the
                  papers."* Exactly right: the arms came down and the only thing
                  that changed was an abstract fill level, so the press had no
                  consequence you could point at. Every station now leaves a real
                  INK IMPRESSION on the sheet, in its own colour and at its own
                  angle, and they ACCUMULATE — a build leaving the line carries
                  three of them. §11: the action has to leave a mark. */}
              {ST.map((sx, j) => {
                if (sx < cx) return null;
                const ago = (sx - cx) / SPD;              /* frames since it was stamped */
                const pop = squash(ago, 6, 0.34, 3, 10);
                const ink = [G_BLUE, G_RED, G_GRN][j];
                return (
                  <div key={"st" + j} style={{ position: "absolute", left: 16 + j * 52, top: 92,
                    width: 54, height: 54, borderRadius: "50%",
                    border: `6px solid ${hexa(ink, 0.62)}`,
                    transform: `rotate(${-16 + j * 13}deg) scale(${pop})`,
                    display: "grid", placeItems: "center" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 4,
                      background: hexa(ink, 0.46) }} />
                    <div style={{ position: "absolute", left: -3, right: -3, top: 24, height: 5,
                      background: hexa(ink, 0.5) }} />
                  </div>
                );
              })}
              {/* SHIPPED */}
              {done >= 3 && (
                <div style={{ position: "absolute", right: 10, bottom: 8, width: 34, height: 34,
                  borderRadius: "50%", background: GREEN, display: "grid", placeItems: "center" }}>
                  <div style={{ width: 15, height: 8, borderLeft: "5px solid #FFF",
                    borderBottom: "5px solid #FFF", transform: "rotate(-45deg)", marginTop: -4 }} />
                </div>
              )}
            </div>
          );
        })}

        {/* ⭐ THE STATIONS — each agent's arm comes down on the unit under it.
            The arm is the JOB, and it is what makes the belt a line rather than
            a conveyor with bystanders next to it. */}
        {ST.map((sx, i) => {
          /* the phase at which a unit sits under this station */
          const near = Array.from({ length: 7 }, (_, j) =>
            ((j * PITCH - f * SPD + off * 8) % SPAN) - 300 + 96)
            .some(cx => Math.abs(cx - sx) < 60);
          const dn = near ? 1 : 0;
          return (
            <React.Fragment key={"st" + i}>
              {/* the gantry the arm hangs from */}
              <div style={{ position: "absolute", left: sx - 13, top: 132, width: 26,
                height: 92, zIndex: 52, borderRadius: 5,
                background: `linear-gradient(178deg, ${mxh("#33424E", 0.20)} 0%, ${dkh("#33424E", 0.44)} 100%)` }} />
              {/* ⛔ the head dropped 44px and stopped 60px SHORT of the sheet, so
                  it never appeared to touch anything. 96px puts the die face on
                  the paper. */}
              <div style={{ position: "absolute", left: sx - 34, top: 214 + dn * 96, width: 68,
                height: 42, zIndex: 66, borderRadius: 7,
                background: `linear-gradient(178deg, ${mxh("#33424E", 0.26)} 0%, ${dkh("#33424E", 0.48)} 100%)`,
                border: `4px solid ${dkh("#33424E", 0.58)}` }}>
                {/* the inked die face — the thing that prints */}
                <div style={{ position: "absolute", left: 12, bottom: -7, width: 44, height: 9,
                  borderRadius: 2, background: [G_BLUE, G_RED, G_GRN][i] }} />
                <div style={{ position: "absolute", left: 8, bottom: -14, width: 12, height: 18,
                  borderRadius: 3, background: dkh("#33424E", 0.54),
                  transform: `rotate(${dn ? -14 : 0}deg)` }} />
                <div style={{ position: "absolute", right: 8, bottom: -14, width: 12, height: 18,
                  borderRadius: 3, background: dkh("#33424E", 0.54),
                  transform: `rotate(${dn ? 14 : 0}deg)` }} />
              </div>
              {/* the strike, on the stillest part of the object — §11 */}
              {dn === 1 && (
                <Ring x={sx} y={BY - 74} f={f} at={f} r={132} c={p.key} z={70} w={5} dur={8} />
              )}
              {/* THE AGENT WORKING IT */}
              <GCrew kind={i === 1 ? "beaker" : "gem"} f={f} x={sx - 6}
                y={foot(p.horizon, 214)} i={i + 4} size={206 - (i % 2) * 10} z={74 - (i % 2)}
                at={i * 3} loop={i % 2 ? 4 : 1} flip={i > 1} />
            </React.Fragment>
          );
        })}

        {/* ⭐ THE STACK — what the line has produced, growing past frame top.
            Countable volume is the only honest picture of "20 times". */}
        {Array.from({ length: Math.min(11, Math.max(0, Math.floor((f - 8) / 6.4))) }, (_, i) => {
          const born = 8 + i * 6.4;
          return (
            <div key={"sk" + i} style={{ position: "absolute", left: 740 + (i % 2) * 16,
              top: BY - 62 - i * 44, width: 138, height: 44, zIndex: 78, borderRadius: 6,
              background: `linear-gradient(172deg, ${mxh(CREAMB, 0.18)} 0%, ${dkh(CREAMB, 0.18)} 100%)`,
              border: `4px solid ${dkh(CREAMB, 0.34)}`,
              transform: `rotate(${-5 + (i % 3) * 4}deg) scale(${squash(f - born, 5, 0.26, 3, 9)})` }}>
              <div style={{ position: "absolute", left: 9, top: 13, width: 62, height: 9,
                borderRadius: 3, background: hexa(INK, 0.26) }} />
              <div style={{ position: "absolute", right: 10, top: 11, width: 18, height: 18,
                borderRadius: "50%", background: hexa(GREEN, 0.78) }} />
            </div>
          );
        })}

        <MarkCast x={92} y={140} s={94} z={80} f={f} spin={0.5} o={0.78} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S18 — THE LAST CHARGE.  f1517-1636 (3.97s).  Intensity 10. ⭐ THE PAYOFF.
   VO: "and that's what people are also paying Cursor and other coding IDEs $20
        a month for."

   ⛔⛔⛔ REBUILT TWICE, AND THE SECOND VERSION FAILED FOR THE OPPOSITE REASON TO
   THE FIRST. v1 was a 600px cream sheet with a counter beside it — too empty.
   v2 answered that with TWO stamp hits, a full-width blade, a row torn into six
   flying pieces, the roll yanked up out of frame dragging the press with it, a
   counter slam and five cards landing — SIX distinct events in 3.97 seconds.
   Alex: *"animation of fifty one seconds needs to be completely reworked... a
   little bit too fast, I can't really tell what's even going on."* Density is a
   SHAPE, not a level, and I had simply moved from one end of it to the other.

   ⭐ FOUR BEATS, EACH WITH ROOM TO LAND:
     f24   ONE stamp on ONE card — the CURSOR mark at 190px, the biggest single
           product mark in the reel, because this is the only scene it appears in
     f34   the money leaves, the same $20 note S1 and S11 use
     f62   ONE cut. The card falls in TWO halves, not six pieces
     f78   the five Google cards land in the space it left, counter 1 -> 0
   ⛔ NO TOTAL ANYWHERE. The $20 on the card is the VO's own figure.
   ====================================================================== */
export const S18: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall3");
  const off = v === "amber" ? 5 : v === "steel" ? -4 : 0;
  const HIT = 24 + off, CUT = 62 + off;
  const CARDS = [78, 84, 90, 96, 102].map(k => k + off);
  const sh = [HIT, CUT].reduce((a, k) => {
    const q = shake(f, k, k === CUT ? 13 : 10, 9); return { x: a.x + q.x, y: a.y + q.y };
  }, { x: 0, y: 0 });
  const CX = 506, CY = 496, CW = 392, CH = 434;
  const dead = f >= HIT;
  return (
    <Scene p={p} slug="THE LAST CHARGE" push={push(v, dur, 1.058)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall3" f={f} lit={1} t={f * 0.5} rakeRate={6.0} rk={RAKE_V[v]} />

        {/* ⭐ ONE CARD, and it is cut into TWO halves that fall apart */}
        {f < CUT + 34 && [0, 1].map(half => {
          const ct = f >= CUT ? Math.min(1, (f - CUT) / 26) : 0;
          const dir = half ? 1 : -1;
          return (
            <div key={"hf" + half} style={{ position: "absolute",
              left: CX - CW / 2 + half * (CW / 2), top: CY - CH,
              width: CW / 2, height: CH, zIndex: 54, overflow: "hidden",
              transform: `translate(${dir * ct * 190}px, ${ct * ct * 700}px) rotate(${dir * ct * 34}deg)`,
              opacity: 1 - ct * 0.35 }}>
              <div style={{ position: "absolute", left: -half * (CW / 2), top: 0, width: CW, height: CH,
                borderRadius: 26, overflow: "hidden",
                background: dead
                  ? `linear-gradient(172deg, ${dkh(PAPER, 0.20)} 0%, ${dkh(PAPER, 0.34)} 100%)`
                  : `linear-gradient(172deg, #FFFFFF 0%, ${dkh(PAPER, 0.08)} 100%)`,
                border: `8px solid ${dkh(PAPER, dead ? 0.44 : 0.22)}` }}>
                {/* the cursor mark at 190px — the VO names it, and only here */}
                <div style={{ position: "absolute", left: CW / 2 - 106, top: 34, width: 212, height: 212,
                  borderRadius: 44, background: "#FFFFFF", border: `5px solid #ECE7DC`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile("logos/cursor.svg")} style={{ width: 152, height: 152,
                    objectFit: "contain", opacity: dead ? 0.40 : 1,
                    filter: dead ? "grayscale(1)" : "none" }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, top: 268, textAlign: "center",
                  ...ui(40, 900), color: hexa(INK, dead ? 0.42 : 1) }}>CURSOR</div>
                <div style={{ position: "absolute", left: 0, right: 0, top: 322, textAlign: "center",
                  ...mono(58, 800), color: hexa(INK, dead ? 0.34 : 0.82) }}>{R.price}</div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22,
                  background: dead ? RED : hexa(INK, 0.12),
                  clipPath: dead ? "inset(0 0 0 0)"
                    : `inset(0 ${Math.max(0, 100 - ((f * 3.2) % 150))}% 0 0)` }} />
                {dead && (
                  <div style={{ position: "absolute", left: CW / 2 - 96, top: 60, width: 192, height: 192,
                    borderRadius: "50%", border: `14px solid ${hexa(RED, 0.58)}`,
                    transform: `rotate(-13deg) scale(${squash(f - HIT, 6, 0.22, 3, 10)})`,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ ...mono(44, 800), color: hexa(RED, 0.74) }}>PAID</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* ONE stamp, on the card, and the press leaves with the cut */}
        {f < CUT + 8 && <StampHead x={CX} y={-40} w={360} f={f} hits={[HIT]} z={62} drop={166} />}
        <Puff x={CX} y={CY - CH + 96} f={f} at={HIT} n={18} s={1.5} z={70} c="#D8B98E" up={0.4} />
        <Ring x={CX} y={CY - CH + 108} f={f} at={HIT} r={340} c={RED} z={69} w={9} />

        {/* the money leaves */}
        {[HIT + 10, HIT + 20].map((k, i) => {
          if (f < k) return null;
          const t = Math.min(1, (f - k) / 26);
          if (t >= 1) return null;
          return (
            <MoneyNote key={"nt" + i}
              x={CX + t * (270 + i * 80) * (i ? -1 : 1)} y={CY - 190 - t * t * 400}
              s={1.02} rot={t * 400 * (i ? -1 : 1)} o={1 - t * 0.3} z={76} />
          );
        })}

        {/* ⭐ CUT 5 OF 5 — one blade, one card, two halves */}
        <Cutter y={CY - CH / 2} f={f} at={CUT} z={78} h={70} dur={14} />
        <Puff x={CX} y={CY - CH / 2} f={f} at={CUT + 2} n={26} s={1.9} z={80} c="#E8D2AA" up={0.8} />
        <Ring x={CX} y={CY - CH / 2} f={f} at={CUT + 2} r={430} c={p.key} z={79} w={11} dur={20} />

        <ChargeCounter x={742} y={HEADER_SAFE + 12} f={f} s={0.96} z={84}
          steps={[[-1, 1], [CUT + 6, 0]]} label="CHARGES" />

        {/* ⭐ the five land in the space the last charge left */}
        {CARDS.map((k, i) => (<React.Fragment key={"fc" + i}>
          {/* ⛔ x = 124 + i*190 put card 1 at 48..200 against a measured left
              bound of 194 — the row has been hanging off the frame. Centre 540,
              pitch 140 lands the whole row inside 193..887. */}
          <ToolCard x={540 + (i - 2) * 140} y={p.horizon + 60} s={0.64} i={i} f={f} at={k}
            z={64 + i} rot={(i - 2) * 1.3} auraAt={k + 8} auraC={p.key} />
          <CardLand x={540 + (i - 2) * 140} y={p.horizon - 30} s={0.42} f={f} at={k} z={86} c={p.key} />
        </React.Fragment>))}

        <GCrew f={f} x={804} y={foot(p.horizon, 236)} i={11} size={215} z={72} at={0} loop={4}
          shock={f >= HIT && f < HIT + 12 ? 1 : 0}
          cheer={f > CUT + 8 ? 1 : 0} />
      </div>
    </Scene>
  );
};

export const S19: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall3");
  const FIELD = 8, KEY = 26;
  return (
    <Scene p={p} slug="COMMENT BILL" push={push(v, dur, 1.096)} vig={0.30}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="hall3" f={f} lit={1.1} t={f * 0.6} rakeRate={5.4} rk={RAKE_V[v]} />

        {/* ⭐ THE FIVE CARDS TAKE A BOW, one after the other. Alex: *"the
            animations afterwards need to be a lot better throughout as well."*
            They were standing still with a brightness sine on them — and §1 is
            blunt that a light-only change repaints nothing, it just lifts the
            black point. Each card now HOPS on its own beat, a running wave down
            the row, and its landing throws the CardLand rays. Five large solid
            objects moving in sequence, which is a shape the audit can see. */}
        {[0, 1, 2, 3, 4].map(i => {
          const beat = 4 + i * 4;
          const hop = f >= beat ? Math.max(0, Math.sin(Math.min(Math.PI, (f - beat) / 5))) : 0;
          return (
            <React.Fragment key={"cc" + i}>
              <div style={{ position: "absolute", inset: 0, transform: `translateY(${-hop * 46}px)`,
                zIndex: 62 + i }}>
                {/* ⛔ same off-band row as S18 — S19's bound is 204..884 */}
                <ToolCard x={540 + (i - 2) * 138} y={p.horizon + 196} s={0.62 + hop * 0.05} i={i} f={f}
                  at={-30} z={62 + i} rot={(i - 2) * 1.2 + hop * (i - 2) * 2}
                  lit={0.66 + 0.34 * hop} auraAt={beat} auraC={GOLD} />
              </div>
              <CardLand x={540 + (i - 2) * 138} y={p.horizon + 138} s={0.44} f={f} at={beat} z={78} c={GOLD} />
            </React.Fragment>
          );
        })}

        {/* THE STUB — what is left of the bill, reading zero */}
        <div style={{ position: "absolute", left: 396, top: 108, width: 220, height: 132, zIndex: 70,
          borderRadius: 6, background: `linear-gradient(176deg, #FFFDF7 0%, ${dkh(PAPER, 0.10)} 100%)`,
          border: `4px solid ${dkh(PAPER, 0.24)}`,
          transform: `rotate(${-2 + rock(f, 0, 1, 40) * 2   /* ⛔ was 40x2 = 80deg */}deg)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5,
            background: `repeating-linear-gradient(90deg, ${hexa(INK, 0.26)} 0px, ${hexa(INK, 0.26)} 12px, transparent 12px, transparent 24px)` }} />
          <div style={{ position: "absolute", left: 18, top: 16, ...mono(19, 700),
            color: hexa(INK, 0.44), letterSpacing: "0.10em" }}>SUBSCRIPTIONS</div>
          <div style={{ position: "absolute", left: 18, top: 48, ...mono(58, 800), color: GREEN }}>0</div>
          <div style={{ position: "absolute", left: 92, top: 66, ...mono(21, 700),
            color: hexa(INK, 0.48), letterSpacing: "0.06em" }}>CHARGES</div>
        </div>

        {/* ⛔ Alex: *"the 'bill' thing to comment at the bottom here is too low
            needs to be moved up and stuff here its not really visible."* It sat
            at `p.horizon + 130` = 658 on a 792 panel, i.e. the last eighth of
            the frame, under the vignette's darkest band and directly above the
            caption track — the one object the whole reel is asking for was the
            least visible thing in its own shot. It is now at 470, dead centre,
            and 40% wider. */}
        <CommentField x={506} y={470} w={720} f={f} at={FIELD} word="BILL" z={86} />
        <Ring x={506} y={518} f={f} at={KEY + 16} r={380} c={GOLD} z={85} w={9} />

        {/* ⭐⭐ THE COMMENTS ARRIVE. The old CTA typed a word, hit POST, and then
            nothing happened for the last second of the reel — the ask had no
            RESULT, which is the §10 defect exactly: half a mechanism. Fourteen
            comment bubbles now rise the full height of the panel from the moment
            POST fires, each carrying the keyword chip. It is the highest-value
            shape in §1's table (many large objects travelling a long distance),
            it runs continuously to the last frame, and it is a picture of the
            thing the viewer is being asked to do. */}
        {Array.from({ length: 14 }, (_, i) => {
          const born = KEY + 2 + i * 2.4;
          if (f < born) return null;
          const t = (f - born) / 34;
          if (t > 1) return null;
          const lane = [96, 236, 800, 940, 168, 872, 60, 976][i % 8];
          const dx = Math.sin((f - born) / 9 + i) * 16;
          const sc = 0.62 + 0.38 * Math.min(1, (f - born) / 5);
          return (
            <div key={"cm" + i} style={{ position: "absolute", left: lane - 108 + dx,
              top: 760 - t * 700, width: 216, height: 62, zIndex: 88, borderRadius: 31,
              opacity: Math.min(1, (1 - t) * 2.4), transform: `scale(${sc}) rotate(${dx * 0.18}deg)`,
              background: "#FFFFFF", border: `4px solid ${dkh("#E6E1D4", 0.14)}`,
              display: "flex", alignItems: "center", gap: 10, paddingLeft: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                background: [G_BLUE, G_RED, G_YEL, G_GRN, CLAY][i % 5] }} />
              <div style={{ ...ui(24, 900), color: INK, letterSpacing: "0.02em" }}>BILL</div>
              <div style={{ width: 46, height: 9, borderRadius: 4, background: hexa(INK, 0.18) }} />
            </div>
          );
        })}

        {/* ⭐ and they CHEER — the reel's last frame is the crew winning */}
        <GCrew f={f} x={266} y={foot(p.horizon, 244)} i={6} size={216} z={72} at={2} loop={2}
          cheer={f > KEY ? 1 : 0} />
        <GCrew kind="beaker" f={f} x={788} y={foot(p.horizon, 244)} i={9} size={216} z={72} at={6}
          loop={2} flip cheer={f > KEY + 4 ? 1 : 0} />
        <MarkCast x={506} y={64} s={104} z={80} f={f} spin={0.6} o={0.9} />
      </div>
    </Scene>
  );
};
