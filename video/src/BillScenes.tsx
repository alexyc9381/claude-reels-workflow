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
  AnswerCard, Tether, Crane, StageFlat, AppTile, LinkChain, Bay, Ticket,
  OutputRack, CommentField,
} from "./BillProps";
import { SetFor, placeFor } from "./BillSets";

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
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  bill:  { dx: -26, dy: 34, s: 1.058, rot: -0.9 },
  amber: { dx: -94, dy: -66, s: 1.204, rot: 1.7 },
  steel: { dx: 52, dy: 14, s: 1.122, rot: 1.3 },
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
export const GRADE: Record<Variant, string> = {
  bill:  "contrast(1.030) saturate(1.42) brightness(0.986) hue-rotate(-2deg)",
  amber: "contrast(1.240) saturate(1.58) brightness(0.958) hue-rotate(-21deg)",
  steel: "contrast(1.068) saturate(1.50) brightness(0.978) hue-rotate(17deg)",
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

/* ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`. At the
   reel's steepest push (1.24) that is left >= 114, so nothing hero-sized sits
   outside 114..898. */

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
   S0 — THE BILL.  f0-48 (1.60s).  BEAT: HOOK.  Intensity 9.
   VO: "If you're not using these 5 Google AI tools"

   ⭐⭐⭐ ONE LOCKED FRAMING IN WHICH SOMETHING HAPPENS, not four posters
   (ANIMATION-QUALITY §2 — reel 104's open went 9.97 -> 12.10 with FEWER cuts).
   ⭐ ONE DOMINANT OBJECT ([[feedback_hook_simplicity]]): the bill. One
   supporting element: the Claude at its foot. The world is behind it, held DOWN.

     before  f0   the bill is ALREADY colossal, already printed, already lit;
                  five charge rows on it; the Claude tilted up at its foot.
                  Settled, bright, no fade-in.
     trigger f8   the stamp head SLAMS
     travel  f8-20  a new charge prints and the WHOLE ROLL lurches 96px down —
                  a real distance, not a state change (§11: under a third of the
                  object's own size is not an action)
     arrival f20  the roll's tail whips on a damped wave, dust, a ring at the
                  head, the Claude ducks. Repeats at f26.

   ⛔ THE FRAME-0 GATE. Panel luma >= 140 is carried by the CREAM BILL — which
   is the subject — plus the floor pool. The palette's dark stop is NOT touched
   (§8's restored rule). The bill's head block is one CONTIGUOUS cream mass of
   ~24% of the panel, not three cards (reel 109 warned at 8.4% doing exactly
   the wrong thing).
   ⛔ PROPORTION (§11): the roll is 640px = 63% of panel width, so a silhouette
   can still form. Past ~85% it stops reading as itself.
   ====================================================================== */
export const S0: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const HV = HOOK_V[v];
  const p = placeFor("hall");
  /* the frame shakes on each slam — a big mass landing costs the camera */
  const sh = HV.hits.reduce((a, k) => {
    const s = shake(f, k + 10, 10, 8); return { x: a.x + s.x, y: a.y + s.y };
  }, { x: 0, y: 0 });
  const lastHit = HV.hits.filter(k => f >= k + 10).slice(-1)[0];
  return (
    <Scene p={p} slug="THE LONG BILL" push={push(v, dur, 1.052)} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall" f={f} lit={1} t={f * 0.5} rakeRate={5.4} />

        {/* ⛔⛔ THE LAYOUT IS ARITHMETIC, NOT TASTE — the first pass got all
            three of these wrong and the contact sheet showed it instantly.
            · the HEAD BLOCK is the frame-0 claim plate and `BillRoll` draws it
              at top:-272, so the roll's y must be `wantedHeadTop + 272` or the
              plate renders ABOVE the panel and frame 0 states nothing.
            · at rowH 150 the mark tile is 150*0.68 = 102px, over the 96px mark
              floor. At 132 it was 90px, under it.
            · the roll is 560px = 55% of panel width at x 118..678, which leaves
              334px of clear air for the Claude. Past ~85% there is no room for
              a silhouette to form (§11, reel 110's barbell). */}
        {/* ⛔⛔ THE VERTICAL STACK IS A BUDGET, AND `HookHeader` SPENDS THE
            FIRST ~95px OF IT. The first pass parked the stamp head at y=-14 and
            it rendered ENTIRELY BEHIND THE HEADER PILL — ANIMATION-QUALITY §6's
            second failure mode (*"it is behind something"*), which survives a
            frame-0 check because the object is drawn, just not seen.
              header pill   0..95
              stamp head   98..226   (128 tall)
              bill head   238..388   (headH 150, short so rows fit)
              rows        388..792   (rowH 145 -> mark 98px, over the 96 floor)
            2.8 rows visible and the roll runs off the bottom edge, which is what
            says LONG. */}
        {/* ⭐ THE EVENT IS THE STAMP LANDING. A `steps` paper-advance was built
            and measured and then REMOVED: cascading the rows opened a gap
            between the header and the first charge, and advancing the whole
            roll fed the document out of the bottom of the panel by the second
            strike. What actually reads is a ~110px PAID ring appearing at full
            size on cream paper — a large, high-contrast, discrete change, which
            is the shape §1's table rewards — plus a 30px recoil. `a rebuild is
            not automatically an improvement` (§5), and this one was measured
            both ways before it was thrown away. */}
        {/* ⛔ MOVING THE ROLL DOWN 60px TO CLEAR THE PRESS COST 3 LUMA AND FRAME 0
            FELL TO 137.2 AGAINST THE 140 BAR. ⛔ The banned fix is lifting the
            shading — that is precisely the move that produced the ten-reel pale
            run (§8). The subject gets BIGGER instead: 560 -> 620 puts another
            ~31,000px of cream paper in frame, which is 3.9% of the panel at
            ~245 luma against a ~60 room. Still 61% of panel width, so the
            silhouette still has air on both sides. */}
        <BillRoll x={104} y={470} w={620} f={f} rows={rowsFor(0)} rowH={145} z={44}
          dir="v" creep={0.30} jolt={HV.hits[0] + 10} head headH={150}
          stampsFor={i => (i === 0 ? [HV.hits[0] + 10] : i === 2 ? [HV.hits[1] + 10] : [])} />

        {/* ⛔⛔ THE DIE USED TO LAND ON TOP OF "SUBSCRIPTIONS". At y=98 with a
            96px drop the head block reached 322 and the bill's head block starts
            at 300 — so the reel's frame-0 claim plate was covered by the villain
            every time it struck, which is the one thing that must stay readable.
            ⭐ And the fix is also the correct mechanism: a press strikes where
            the paper ENTERS and the sheet feeds out from under it. Head at rest
            64..192, at full drop 120..248 with the die face reaching 278; the
            bill's head block starts at 298 and "SUBSCRIPTIONS" at 313. Twenty
            pixels of clearance, checked by arithmetic rather than by eye —
            the first two attempts both LOOKED clear at rest and struck through
            the word. */}
        <StampHead x={398} y={64} w={470} f={f} hits={HV.hits.map(k => k + 10)} z={62} drop={56} />

        {/* the arrivals cost something */}
        {HV.hits.map((k, i) => (<React.Fragment key={"hk" + i}>
          <Puff x={398} y={272} f={f} at={k + 10} n={16} s={1.5} z={66} up={0.4} c="#E8D8BC" />
          <Ring x={398} y={276} f={f} at={k + 10} r={260} c={p.key} z={65} />
        </React.Fragment>))}

        {/* THE SUBJECT IS IN FRAME 0 (THE-OPEN law 2: characters stop scrolls),
            and ONE supporting element only ([[feedback_hook_simplicity]] — the
            thing to reduce is IDEAS, not layers). He ducks on each slam. */}
        {/* ⛔ z=90, NOT 70. `NearStack` paints the near plane at z=87, so at 70
            his legs were behind a pallet and he rendered as a floating orange
            bar. The near mass belongs BEHIND the cast, not over it. */}
        <Crew f={f} x={806} y={762} i={2} size={214} z={90} at={-14} loop={3}
          shock={lastHit !== undefined && f - lastHit < 12 ? 1 : 0} />

        {/* the mark, big and early — the audience filter, never on a face.
            ⛔ x=890 not 906: at the scene's end push (1.064) the visible band is
            30..982, and a 122px emblem at 906 would clip. */}
        <MarkCast x={882} y={186} s={122} z={74} f={f} spin={0.5} o={0.92} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 — THE CHARGES.  f48-137 (2.97s).  BEAT: HOOK-2.  Intensity 8.
   VO: "you're wasting thousands of dollars a month on AI subscriptions."

   ⭐ THE VERB IS **WASTING**, on a **MONTH**. So the picture is the SAME charge
   landing again, and again, and again. Reel 105 settled this exact beat:
   ⛔ NO INVENTED TOTAL — "thousands" is not sourceable, so the frame shows
   RECURRENCE, not arithmetic. The information is *"it keeps charging"* and the
   depiction of that is a stamp that will not stop.

     before  f0   three rows, quiet, the roll running
     trigger f10  the stamp head descends
     travel  f10-70  the SAME pill re-stamps row after row, travelling down
     arrival each stamp thuds, the paper dents, ink flecks off, the roll rocks
   ====================================================================== */
export const S1: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall2");
  const hits = v === "amber" ? [14, 34, 54, 72] : v === "steel" ? [8, 30, 52, 74] : [11, 32, 53, 71];
  const sh = hits.reduce((a, k) => {
    const s = shake(f, k, 7, 6); return { x: a.x + s.x, y: a.y + s.y };
  }, { x: 0, y: 0 });
  return (
    <Scene p={p} slug="EVERY MONTH" push={push(v, dur, 1.086)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall2" f={f} lit={1} t={f * 0.6} rakeRate={7.2} />
        {/* ⛔ p10 52.7 — the punch-in fills the frame with paper and leaves no
            dark tenth. A DRAWER BANK cropped by the left edge, in front of the
            bill: it is what a records hall is made of, it drops the black point,
            and it costs the hierarchy nothing. */}
        <div style={{ position: "absolute", left: -60, top: 40, width: 210, bottom: -40, zIndex: 88,
          background: `linear-gradient(92deg, ${dkh("#0E141A", 0.02)} 0%, ${mxh("#0E141A", 0.10)} 100%)` }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={"dk" + i} style={{ position: "absolute", left: 16, right: 10, top: 30 + i * 150,
              height: 128, borderRadius: 4, background: mxh("#0E141A", 0.06),
              border: `4px solid ${dkh("#0E141A", 0.30)}` }}>
              <div style={{ position: "absolute", left: "30%", top: "44%", width: "40%", height: 15,
                borderRadius: 5, background: mxh("#0E141A", 0.14) }} />
            </div>
          ))}
        </div>

        {/* ⛔⛔ MEASURED, NOT ARGUED: this scene ran luma 193.6 and saturated
            pixels 8.4% against three shipped reels at 84-100 / 50-58%. A 790px
            punch-in on cream paper IS a white field, and §8's ten-reel
            regression is exactly this at reel scale. Narrowed to 640 so the
            cold blue room carries a third of the frame, and the only saturated
            thing in the shot — the RED charge stamp — is now the biggest thing
            in it. ⛔ Nothing about the palette's dark stop was touched. */}
        <BillRoll x={196} y={-96} w={640} f={f} rows={rowsFor(0)} rowH={196} z={44}
          dir="v" creep={0.44} head={false} rot={-1.4}
          stampsFor={i => hits.filter((_, j) => j % 4 === i % 4).slice(0, 1 + i % 2)} />

        {/* ⛔ at y=-190 the head block sat entirely above the panel and only
            appeared mid-strike, so the before-state had no visible trigger.
            At -100 its lower 28px is in frame at rest. */}
        <StampHead x={506} y={-100} w={430} f={f} hits={hits} z={62} drop={140} />

        {hits.map((k, i) => (<React.Fragment key={"c" + i}>
          <Puff x={600} y={140 + (i % 3) * 190} f={f} at={k} n={12} s={1.2} z={66} c="#C0A88C" />
          <Ring x={600} y={140 + (i % 3) * 190} f={f} at={k} r={230} c={RED} z={65} w={9} />
        </React.Fragment>))}
        {/* the ink the stamps throw — the only saturated mass in the shot, and
            it is the thing the line is actually about */}
        {hits.map((k, i) => (
          f >= k && f < k + 20 ? (
            <div key={"ik" + i} style={{ position: "absolute", left: 512 + (i % 2 ? 60 : -140),
              top: 120 + (i % 3) * 190, width: 190, height: 96, zIndex: 64, borderRadius: "50%",
              background: hexa(RED, 0.22 * (1 - (f - k) / 20)),
              transform: `scale(${1 + (f - k) / 14}) rotate(${-12 + i * 9}deg)` }} />
          ) : null
        ))}

        {/* he is being buried by it — the loop is a REACTION, not a bob */}
        <Crew f={f} x={880} y={p.horizon + 258} i={11} size={186} z={70} at={0} loop={3}
          shock={hits.some(k => f >= k && f - k < 11) ? 1 : 0} />

        <MarkCast x={906} y={636} s={96} z={74} f={f} spin={-0.4} o={0.8} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S2 — TWENTY SHIPPED.  f137-220 (2.77s).  BEAT: SETUP.  Intensity 7.
   VO: "So Google quietly shipped over 20 of these tools and I tested all of
        them,"

   ⭐ THE VERBS ARE **SHIPPED** and **TESTED**. So: things ARRIVE (24 tiles
   sliding onto a wall) and then something SIFTS them (a Claude walking the
   wall X-stamping as he passes — a job with an object, not a bob).

   ⛔ THE TILES ARE UNNAMED, carrying only the real Google mark. There is no
   sourceable roster of 20 named Labs products, so the COUNT is the claim and
   no identity is asserted. `feedback_real_marks_are_the_props` cuts the other
   way here: a mark you cannot source is worse than no mark.
   ====================================================================== */
export const S2: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("lab");
  const off = v === "amber" ? 6 : v === "steel" ? -4 : 0;
  /* 24 tiles, 4 ranks of 6, arriving across the FULL duration */
  const COLS = 6, ROWS = 4;
  const at = (i: number) => 4 + off + i * 1.9;
  /* the sift: 19 struck, 5 left — he walks left to right */
  const KEEP = [3, 8, 12, 17, 21];
  const walk = E(f, 30, 78, 96, 900, LIN);
  return (
    <Scene p={p} slug="GOOGLE LABS" push={push(v, dur, 1.070)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="lab" f={f} lit={1} t={f * 0.7} rakeRate={4.2} />

        {/* the wall the tiles seat into — a real board with a frame and rails */}
        <div style={{ position: "absolute", left: 66, top: 132, width: 880, height: 400, zIndex: 28,
          borderRadius: 8, background: `linear-gradient(176deg, ${dkh("#2A3E4C", 0.06)} 0%, ${dkh("#2A3E4C", 0.26)} 100%)`,
          border: `7px solid ${dkh("#2A3E4C", 0.34)}` }}>
          {[0, 1, 2, 3].map(i => (
            <div key={"wr" + i} style={{ position: "absolute", left: 10, right: 10, top: 22 + i * 96,
              height: 6, background: hexa("#9AC4D8", 0.20) }} />
          ))}
        </div>

        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const c = i % COLS, r = Math.floor(i / COLS);
          const x = 148 + c * 144, y = 196 + r * 96;
          const struck = KEEP.includes(i) ? undefined : 34 + off + (c * 8 + r * 3);
          return (
            <LabTile key={"lt" + i} x={x} y={y} s={0.86} f={f} at={at(i)} struck={struck}
              z={40 + r} seed={i * 7 + 3} />
          );
        })}

        {/* ⭐ THE SIFTER — he WALKS the wall carrying a stamp, and the X-marks
            land where he has been. A job with an object beats any idle. */}
        <Cam x={0} y={0} z={64}>
          <Crew f={f} x={walk} y={p.horizon + 150} i={8} size={196} z={64} at={2} loop={1} />
          {/* the stamp in his hand — 46px+, so it survives the downsample */}
          <div style={{ position: "absolute", left: walk + 62, top: p.horizon - 76,
            width: 62, height: 74, zIndex: 66, borderRadius: 7,
            background: `linear-gradient(176deg, ${mxh("#5A4A3A", 0.20)} 0%, ${dkh("#5A4A3A", 0.34)} 100%)`,
            transform: `rotate(${-16 + Math.sin(f / 6.2) * 22}deg)` }}>
            <div style={{ position: "absolute", left: 8, bottom: -12, width: 46, height: 20,
              borderRadius: 3, background: dkh(RED, 0.16) }} />
          </div>
        </Cam>

        {/* the background process: a trolley of unsorted tiles crossing */}
        <div style={{ position: "absolute", left: ((f * 5.4) % 1400) - 260, top: p.horizon + 60,
          width: 220, height: 128, zIndex: 46, borderRadius: 6,
          background: `linear-gradient(178deg, ${mxh("#3A4650", 0.18)} 0%, ${dkh("#3A4650", 0.34)} 100%)` }}>
          {[0, 1, 2].map(i => (
            <div key={"tt" + i} style={{ position: "absolute", left: 14 + i * 66, top: 16, width: 54,
              height: 54, borderRadius: 9, background: "#FFFFFF", opacity: 0.86 }} />
          ))}
        </div>

        <MarkCast x={906} y={146} s={104} z={74} f={f} spin={0.45} o={0.86} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S3 — THESE FIVE.  f220-312 (3.07s).  BEAT: SETUP-2.  Intensity 8.
   VO: "but these 5 are the ones that actually replace your paid tools."

   ⭐ THE VERB IS **REPLACE**, and the noun is **THESE FIVE**. So the five clean
   tiles physically LEAVE the wall and land as five named cards on a lit rail,
   growing as they come — and the bill's counter is SET to 5 at the same moment,
   which is the reel's number spine starting.

   ⛔ SPRITE/CARD PITCH IS ARITHMETIC. Five cards at s=0.86 are 181px wide on a
   ~168px pitch would merge; the rail is 880px wide, so pitch = 880/6 = 147 —
   too tight. Cards sit at s=0.78 (164px) on a 176px pitch across 1012.
   ====================================================================== */
export const S3: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("rail");
  const CV = CARD_V[v];
  return (
    <Scene p={p} slug="THE FIVE" push={push(v, dur, 1.076)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="rail" f={f} lit={1} t={f * 0.5} rakeRate={5.6} />

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
        {CV.map((k, i) => (
          <ToolCard key={"tc" + i} x={148 + i * 172} y={p.horizon + 8} s={0.74} i={i} f={f}
            at={k} z={66 + i} rot={(i - 2) * 1.1} />
        ))}
        {CV.map((k, i) => (<React.Fragment key={"ta" + i}>
          <Puff x={148 + i * 172} y={p.horizon + 4} f={f} at={k} n={11} s={1.1} z={78} c="#C0996A" />
          <Ring x={148 + i * 172} y={p.horizon} f={f} at={k} r={168} c={p.key} z={77} w={6} />
        </React.Fragment>))}

        {/* THE NUMBER SPINE STARTS. The bill runs across the bottom, and its
            counter sets to 5 as the last card lands. */}
        <BillRoll x={286} y={p.horizon + 128} w={168} f={f} rows={rowsFor(0)} rowH={230} z={50}
          dir="h" creep={0.9} head headH={190} />
        <ChargeCounter x={758} y={132} f={f} s={0.86} z={82}
          steps={[[-1, 5], [CV[4], 5]]} />

        <Crew f={f} x={62} y={p.horizon + 268} i={6} size={158} z={72} at={CV[0]} loop={2} />
        <MarkCast x={912} y={608} s={92} z={74} f={f} spin={-0.4} o={0.78} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S4 — AI STUDIO · THE $20 WINDOW.  f312-389 (2.57s).  Intensity 6.
   VO: "1. AI Studio. Instead of $20 a month for a chat window,"

   ⭐ THE NOUNS ARE **$20 A MONTH** and **A CHAT WINDOW**, and the shape of the
   sentence is a TOLL. So: a small caged chat window behind a turnstile, and a
   coin that has to be fed before it lights — then it dies again.

   ⛔ THE $20 IS LEGAL because the VO says it and it is a real price. ⛔ NO
   VENDOR MARK ANYWHERE IN THIS SCENE — the VO names none, so the toll is
   unbranded (the ledger's edge 3).
   ====================================================================== */
export const S4: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("booth");
  const FEED = v === "amber" ? 26 : v === "steel" ? 16 : 21;
  const CLACK = FEED + 13;
  /* the coin drops the FULL height of the machine — a real distance */
  const ct = E(f, FEED, FEED + 13, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="THE TOLL" push={push(v, dur, 1.094)} vig={0.50}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="booth" f={f} lit={1} t={f * 0.4} rakeRate={3.8} />

        {/* ⛔⛔ REBUILT. The contact sheet showed a grey stick on a dark green
            field with a pale rectangle behind a chain-link mesh — three separate
            legibility failures in the one shot whose job is "you are paying a
            toll for a chat window". Fixed by MEASUREMENT, not taste:
              · the mesh no longer crosses the window (it was the only object
                the line is about, and it was behind a fence)
              · the turnstile went 1.05 -> 1.48 and steel #B4BDB8, so the
                barrier is the brightest thing in the room — which is what a
                barrier should be
              · the window is LIT the whole shot and goes DARK when the month
                runs out, instead of being dark and flashing on
              · the Claude went 182 -> 206 and moved fully inside the frame */}
        <div style={{ position: "absolute", left: 300, top: 150, width: 412, height: 274, zIndex: 42,
          borderRadius: 14, background: f < CLACK + 18 ? "#F6F3EC" : dkh("#1A2620", 0.10),
          border: `7px solid ${dkh("#243830", 0.40)}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44,
            background: hexa(p.key, f < CLACK + 18 ? 0.26 : 0.06) }}>
            {[0, 1, 2].map(i => (
              <div key={"cd" + i} style={{ position: "absolute", left: 16 + i * 26, top: 15,
                width: 15, height: 15, borderRadius: "50%",
                background: f < CLACK + 18 ? hexa(INK, 0.22) : hexa(p.key, 0.10) }} />
            ))}
          </div>
          {[0, 1, 2, 3].map(i => (
            <div key={"cw" + i} style={{ position: "absolute", left: i % 2 ? 176 : 22, top: 68 + i * 48,
              width: i % 2 ? 208 : 244, height: 32, borderRadius: 16,
              background: f < CLACK + 18
                ? hexa(i % 2 ? CLAY : INK, 0.24) : hexa(p.key, 0.07) }} />
          ))}
          {/* the cursor blinking in the composer — it IS a chat window */}
          <div style={{ position: "absolute", left: 22, bottom: 16, right: 22, height: 40,
            borderRadius: 20, background: hexa(INK, f < CLACK + 18 ? 0.07 : 0.03),
            border: `3px solid ${hexa(INK, f < CLACK + 18 ? 0.12 : 0.05)}` }}>
            <div style={{ position: "absolute", left: 18, top: 10, width: 5, height: 20,
              background: f < CLACK + 18 && Math.floor(f / 7) % 2 ? CLAY : "transparent" }} />
          </div>
        </div>
        {/* the meter above it — the month running out is what forces the coin */}
        <div style={{ position: "absolute", left: 430, top: 82, width: 152, height: 56, zIndex: 44,
          borderRadius: 8, background: "#0E1815", border: `5px solid ${dkh("#243830", 0.44)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(32, 800), color: f >= CLACK ? GREEN : RED }}>
            {f >= CLACK ? "30d" : "00d"}
          </span>
        </div>

        {/* ⛔ mesh OFF: it painted across the chat window, which is the one
            object this line is about. The booth walls already say "caged". */}
        <Turnstile x={506} y={p.horizon + 186} s={1.48} f={f} clack={CLACK} z={60} mesh={false} />

        {/* the coin travels the machine's full height, and stays visible long
            enough to be seen doing it */}
        {f < FEED + 20 && (
          <Coin x={372 + ct * 128} y={196 + ct * 214} s={1.34} f={f} rot={ct * 420} z={68} />
        )}
        <Puff x={506} y={330} f={f} at={CLACK} n={12} s={1.1} z={70} c="#7EA894" />
        <Ring x={506} y={334} f={f} at={CLACK} r={190} c={p.key} z={69} w={6} />

        {/* ⛔ 7.36 — ONE CLACK IN A 2.57s SHOT. The line is "$20 a MONTH", and
            the thing a toll actually has is a QUEUE: he is not the only one
            paying and he will be back next month. Three more behind him,
            arriving across the full duration, each shuffling forward. */}
        {[0, 1, 2].map(i => (
          /* ⛔ y WAS `p.horizon + 268` = 816 ON A 792px PANEL — the whole queue
             rendered BELOW the frame and bought exactly nothing. The panel is
             792 tall and `booth`'s horizon is 548, so anything on that floor
             has ~244px of room; check the arithmetic against H, not against a
             number that looked right in another set. */
          <Crew key={"q" + i} f={f} x={62 - i * 6} y={p.horizon + 208 + i * 14} i={i + 6}
            size={132 - i * 14} z={68 - i} at={8 + i * 12} loop={0}
            tint={i ? (i === 1 ? "#B8613F" : "#8E4A30") : undefined} />
        ))}
        {/* the queue rail they stand behind — a toll has one */}
        {[0, 1].map(i => (
          <div key={"qr" + i} style={{ position: "absolute", left: -40, top: p.horizon + 74 + i * 54,
            width: 300, height: 13, zIndex: 66, borderRadius: 6, background: dkh("#243830", 0.16) }} />
        ))}

        {/* he pays. The loop is HAUL — he is carrying the coin, not bobbing. */}
        <Crew f={f} x={192} y={p.horizon + 250} i={3} size={206} z={72} at={0} loop={4} />
        {/* the bill runs past and takes the charge */}
        <BillRoll x={rollX(220, CLACK + 4, 1.05)} y={p.horizon + 182} w={150} f={f} rows={rowsFor(0)} rowH={220} z={54}
          dir="h" creep={1.05} head={false}
          stampsFor={i => (i === 0 ? [CLACK + 4] : [])} />

        <MarkCast x={900} y={168} s={92} z={74} f={f} spin={0.4} o={0.7} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S5 — GEMINI 3 PRO, FREE.  f389-489 (3.33s).  Intensity 9.
   VO: "you get Gemini 3 Pro in your browser for free on the Google account you
        already have,"

   ⭐ THE NOUNS ARE **BROWSER** and **THE ACCOUNT YOU ALREADY HAVE**. So the cage
   is physically SWEPT OFF and a real browser expands to fill the panel, and his
   OWN account chip slots into it.
   ⭐⭐ AND THE FIRST CUT LANDS HERE — the blade runs the full panel width and
   row 1 falls out of the bill. Counter 5 -> 4. The spine's first payoff.

   ⛔ occluders OFF: the stanchion brace paints at z86, in front of everything,
   and would sit across the middle of a full-panel screen.
   ====================================================================== */
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
        <SetFor k="wide" f={f} lit={1} t={f * 0.6} rakeRate={4.6} />
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
          {/* the prompt area filling with real content */}
          {Array.from({ length: Math.min(5, Math.max(0, Math.floor((f - OPEN - 22) / 6))) }, (_, i) => (
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

        <Crew f={f} x={906} y={p.horizon + 232} i={0} size={162} z={72} at={OPEN + 6} loop={2} />
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
        <SetFor k="shaft" f={f} lit={1} t={f * 0.5} rakeRate={6.4} />

        <ContextShaft x={476} y={p.horizon - 40} w={430} f={f} fills={LAND} z={30} c={p.key} />

        {/* the three crates, each falling the FULL panel height */}
        {D.map((k, i) => {
          if (f < k - 6) {
            /* they hang on the gantry before they drop — a legible before-state */
            return <CodeCrate key={"cq" + i} x={300 + i * 190} y={214} s={0.62} f={f} rot={-2 + i * 2} z={58} />;
          }
          if (f > LAND[i] + 3) return null;
          const t = E(f, k, LAND[i], 0, 1, IN_Q);
          return (
            <CodeCrate key={"cd" + i} x={300 + i * 190 + (476 - (300 + i * 190)) * t}
              y={214 + t * 330} s={0.62 + t * 0.30} f={f} rot={-2 + i * 2 + t * 16} z={58} />
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
        <Crew f={f} x={868} y={p.horizon + 214} i={9} size={166} z={72} at={0} loop={3}
          shock={LAND.some(k => f >= k && f - k < 10) ? 1 : 0} />
        <Crew f={f} x={148} y={p.horizon + 240} i={1} size={140} z={71} at={4} loop={1} flip />

        <MarkCast x={906} y={158} s={94} z={74} f={f} spin={0.5} o={0.76} />
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
  const LIT = [FLY[1], FLY[3], FLY[5], FLY[7], FLY[8]].map(k => k + 12);
  return (
    <Scene p={p} slug="YOUR OWN FILES" push={push(v, dur, 1.082)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="stacks" f={f} lit={1} t={f * 0.6} rakeRate={5.0} />

        <ShelfUnit x={560} y={p.horizon + 26} w={470} h={410} f={f} lit={LIT} z={34} />

        {/* the real NotebookLM mark, 200px, on the unit's face */}
        <div style={{ position: "absolute", left: 690, top: 178, width: 216, height: 216, zIndex: 52,
          borderRadius: 44, background: "#FFFFFF", border: "6px solid #ECE7DC",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${E(f, 10, 20, 0, 1, BACK)})` }}>
          <Img src={staticFile("logos/notebooklm.svg")}
            style={{ width: 150, height: 150, objectFit: "contain" }} />
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
          const tx = 400 + (i % 3) * 128, ty = 200 + Math.floor(i / 3) * 104;
          return (
            <FileProp key={"ff" + i} x={186 + (tx - 186) * t}
              y={p.horizon + 110 + (ty - (p.horizon + 110)) * t - Math.sin(t * Math.PI) * 130}
              s={1.22} rot={-14 + t * 380} z={62} />
          );
        })}
        {/* the ones that have landed, staying on their shelf */}
        {FLY.map((k, i) => (
          f > k + 14
            ? <FileProp key={"fs" + i} x={400 + (i % 3) * 128} y={200 + Math.floor(i / 3) * 104}
                s={1.22} rot={(i % 3) * 3 - 3} z={44} />
            : null
        ))}
        {FLY.map((k, i) => (
          <Ring key={"fr" + i} x={400 + (i % 3) * 128} y={200 + Math.floor(i / 3) * 104}
            f={f} at={k + 14} r={110} c={p.key} z={64} w={5} dur={12} />
        ))}

        {/* two Claudes: one loading, one shelving. Jobs, not idles. */}
        <Crew f={f} x={198} y={p.horizon + 226} i={4} size={172} z={70} at={0} loop={4} />
        <Crew f={f} x={874} y={p.horizon + 202} i={7} size={150} z={70} at={8} loop={1} flip />

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
        <SetFor k="desk" f={f} lit={1} t={f * 0.5} rakeRate={4.4} />

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
        <Crew f={f} x={560} y={p.horizon + 86} i={2} size={166} z={80} at={2} loop={3} />
        <MarkCast x={906} y={148} s={88} z={74} f={f} spin={0.4} o={0.7} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S9 — FLOW · THE FILM TOOL.  f769-843 (2.47s).  Intensity 7.
   VO: "3. Google Flow. This is Google's AI film tool."

   ⭐ THE NOUN IS **FILM TOOL**, so the frame has to say STAGE before a word of
   the next line lands: black wings, a lighting grid, a floor mark, and a real
   crane that UNFOLDS the full panel height.

   ⛔⛔ NO `FREE` PLATE AND NO `$0` IN THIS SCENE OR THE NEXT. Flow's free tier
   is 50 DAILY CREDITS — metered, not open. "Free" stays in the audio where
   Alex said it (the ledger's edge 1, and reel 105's Magnific edge verbatim).
   ====================================================================== */
export const S9: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("stage");
  const off = v === "amber" ? 5 : v === "steel" ? -3 : 0;
  const BANKS = [4 + off, 12 + off, 20 + off];
  const UNFOLD = 22 + off;
  return (
    <Scene p={p} slug="THE STAGE" push={push(v, dur, 1.090)} vig={0.52}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="stage" f={f} lit={E(f, BANKS[0], BANKS[2] + 10, 0.24, 1, OUT)} t={f * 0.4}
          rakeRate={5.8} />

        {/* the banks striking on, one at a time — the trigger is visible */}
        {BANKS.map((k, i) => (
          <React.Fragment key={"bk" + i}>
            {f >= k && (
              <div style={{ position: "absolute", left: 120 + i * 300, top: 96, width: 320, height: 460,
                zIndex: 24, opacity: 0.30, clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(180deg, ${hexa(p.key, 0.62)} 0%, ${hexa(p.key, 0)} 100%)` }} />
            )}
            <Ring x={280 + i * 300} y={130} f={f} at={k} r={150} c={p.key} z={72} w={5} dur={12} />
          </React.Fragment>
        ))}

        {/* ⛔ s WAS 1.06 AND THE RIG WAS A TWIG ON A BLACK STAGE. At 1.5 the boom
            spans ~450px against a 1012 panel — 44%, which is a crane, and still
            leaves air for a silhouette to form. */}
        <Crane x={648} y={p.horizon + 152} s={1.50} f={f} unfold={UNFOLD} z={56} />

        {/* the FLOW card, 200px, on the stage's name board */}
        <NameBoard x={300} y={196} w={352} t="FLOW" f={f} at={UNFOLD + 14} z={68} s={1.16}
          sub="GOOGLE · AI FILM" />
        <div style={{ position: "absolute", left: 214, top: 288, width: 172, height: 172, zIndex: 69,
          borderRadius: 36, background: "#FFFFFF", border: "6px solid #ECE7DC",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${E(f, UNFOLD + 18, UNFOLD + 28, 0, 1, BACK)})` }}>
          <Img src={staticFile("logos/google.svg")} style={{ width: 118, height: 118, objectFit: "contain" }} />
        </div>

        {/* the operator, walking the crane round — a job with an object */}
        {/* ⛔ 6.48 — THE LOWEST BODY SCENE. One crane unfolding over 22 frames
            repaints almost nothing per 0.1s. §1: LARGE x BRIGHT x FAST is the
            only combination that registers, and the largest thing a stage has
            is its DROP. A backdrop falls the full panel height on the third
            bank, and the fly bars come in behind it — motivated, on-topic, and
            the biggest swept area available in the room. */}
        {f >= BANKS[2] && (() => {
          const t = E(f, BANKS[2], BANKS[2] + 16, 0, 1, OUT);
          return (<>
            {/* ⛔⛔ THE FIRST BACKDROP MADE THE SCENE WORSE: 6.48 -> 6.07.
                It was a DARK drop falling onto a DARK stage, and motion is
                (fraction repainted per 0.1s) x (LUMA DELTA) — a near-black mass
                travelling over a near-black field has an enormous swept area
                and almost no delta, so it bought nothing and cost the black
                point. ⭐ A film backdrop is a LIT cyclorama; painting it bright
                is both what one actually looks like and the only version of
                this shape the audit can see. `a rebuild is not automatically an
                improvement` (§5) — measure it. */}
            <div style={{ position: "absolute", left: 96, top: -560 + t * 620, width: 820, height: 560,
              zIndex: 22, borderRadius: 4,
              background: `linear-gradient(184deg, #FFE9C0 0%, #F2C48E 46%, ${mxh("#C98F62", 0.10)} 100%)` }}>
              {/* a painted backdrop: a horizon and three receding masses, DARK
                  against the lit cyc so the drop lands as a value CONTRAST */}
              <div style={{ position: "absolute", left: 0, right: 0, top: "62%", height: 10,
                background: hexa("#6E4A2E", 0.55) }} />
              {[[70, 210, 240], [360, 260, 300], [640, 190, 220]].map(([bx, bw, bh], i) => (
                <div key={"bd" + i} style={{ position: "absolute", left: bx, top: `calc(62% - ${bh}px)`,
                  width: bw, height: bh, background: hexa("#5A3E2C", 0.42 + i * 0.10) }} />
              ))}
              {/* the batten it hangs from */}
              <div style={{ position: "absolute", left: -20, right: -20, top: -18, height: 22,
                background: dkh("#241E2E", 0.20) }} />
              {/* the drop's own ripple as it lands — cloth does not stop dead */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
                background: `repeating-linear-gradient(90deg, transparent 0px, transparent 54px, ${hexa("#8A6642", 0.10 + 0.10 * Math.sin(f / 5))} 54px, ${hexa("#8A6642", 0.10)} 96px)` }} />
            </div>
            <Ring x={506} y={230} f={f} at={BANKS[2] + 16} r={340} c={p.key} z={73} w={8} />
            <Puff x={506} y={300} f={f} at={BANKS[2] + 16} n={18} s={1.6} z={72} c="#9A88B4" up={0.4} />
          </>);
        })()}
        {/* two fly bars travelling in behind it, on their own clock */}
        {[0, 1].map(i => (
          <div key={"fb" + i} style={{ position: "absolute", left: -180 + ((f * (5.4 + i * 2.2)) % 1400),
            top: 92 + i * 54, width: 300, height: 20, zIndex: 24, borderRadius: 4,
            background: hexa("#241E2E", 0.5) }} />
        ))}

        <Crew f={f} x={140} y={p.horizon + 220} i={10} size={168} z={70} at={2} loop={0} />
        <Crew f={f} x={880} y={p.horizon + 244} i={7} size={142} z={70} at={10} loop={1} flip />

        <MarkCast x={906} y={620} s={88} z={74} f={f} spin={-0.5} o={0.62} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S10 — THE SHOT + THE CAMERA MOVE.  f843-948 (3.50s).  Intensity 9.
   VO: "You type any animated or film shot you want and Veo builds it with a
        camera move and everything,"

   ⭐⭐ THE SCENE'S BEATS ARE CUT TO THE MEASURED WORD ONSETS (§10 — a scene can
   be "about" the right subject and depict none of the words being said). Root
   onsets from src/data/words_116bill.json, minus this scene's start (843):

       "type"          28.54s -> f856 -> local 13
       "shot you want" 29.43s -> f883 -> local 40
       "Veo"           30.15s -> f905 -> local 62
       "camera move"   30.76s -> f923 -> local 80
       "and everything"31.15s -> f935 -> local 92

   ⛔⛔ NO `FREE` PLATE, NO `$0` (see S9).
   ====================================================================== */
export const S10: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("stage");
  const TYPE = 13, SLAM = 40, VEO = 62, MOVE = 80, ALL = 92;
  const sh = shake(f, SLAM, 9, 7);
  return (
    <Scene p={p} slug="VEO BUILDS IT" push={push(v, dur, 1.058)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="stage" f={f} lit={E(f, VEO, ALL, 1, 1.5, OUT)} t={f * 0.5} rakeRate={6.6} />

        {/* ⭐ THE SET BUILDS ITSELF ON "VEO" — three flats fly in from the wings
            and lock, a backdrop drops, a prop lands. Large, bright, fast. */}
        <StageFlat x={190} y={p.horizon + 30} w={300} h={340} f={f} at={VEO} from={-320}
          z={30} kind={2} c="#3A2E4E" />
        <StageFlat x={840} y={p.horizon + 30} w={300} h={340} f={f} at={VEO + 5} from={1330}
          z={30} kind={1} c="#33284A" />
        <StageFlat x={512} y={p.horizon + 12} w={430} h={300} f={f} at={VEO + 10} from={512}
          z={26} kind={0} c="#2C2440" />

        {/* the slate he types on, then slams */}
        {f < SLAM + 22 && (
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

        <Crew f={f} x={132} y={p.horizon + 226} i={10} size={150} z={72} at={0} loop={1} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S11 — THE CANCELLED RENTS.  f948-1033 (2.83s).  Intensity 8.
   VO: "so you're not paying Higgsfield or Seedance hundreds of dollars per
        month."

   ⭐ THE VERB IS **NOT PAYING**, so what is drawn is the charge being STOPPED.
   ⛔ NO PER-PRODUCT PRICE ON EITHER MARK. "Hundreds" is not sourceable per
   product; the picture shows the row being cut, never how big it was.
   ⭐ cut 3 of 5 — the blade runs the full panel width. Counter 3 -> 2.
   ====================================================================== */
export const S11: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall2");
  const CUT = v === "amber" ? 40 : v === "steel" ? 30 : 35;
  const sh = shake(f, CUT + 13, 8, 8);
  return (
    <Scene p={p} slug="TWO RENTALS STOP" push={push(v, dur, 1.088)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall2" f={f} lit={1} t={f * 0.7} rakeRate={7.4} />

        {/* the bill, big and horizontal, with row 3 carrying BOTH marks and
            still stamping right up to the moment it is cut */}
        <BillRoll x={rollX(288, CUT, 0.62)} y={128} w={310} f={f} rows={rowsFor(2, CUT)} rowH={288} z={46}
          dir="h" creep={0.62} head={false}
          stampsFor={i => (i === 0 ? [6, 20] : [])} />

        <StampHead x={230} y={-236} w={330} f={f} hits={[6, 20]} z={60} drop={108} />

        {/* ⭐ CUT 3 OF 5 — the blade runs the FULL panel width */}
        <Cutter y={300} f={f} at={CUT} z={78} h={62} dur={15} />
        <Puff x={506} y={300} f={f} at={CUT + 8} n={20} s={1.5} z={80} c="#A8BCCC" up={0.6} />
        <Ring x={506} y={300} f={f} at={CUT + 8} r={330} c={p.key} z={79} w={8} />

        <ChargeCounter x={716} y={520} f={f} s={0.82} z={84} steps={[[-1, 3], [CUT + 14, 2]]} />

        {/* he cuts it. HAUL loop — he is working the cutter, not standing. */}
        <Crew f={f} x={186} y={p.horizon + 242} i={5} size={176} z={72} at={0} loop={4}
          cheer={f > CUT + 14 ? 1 : 0} />

        <MarkCast x={906} y={150} s={92} z={74} f={f} spin={0.42} o={0.72} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S12 — OPAL · ONE SENTENCE.  f1033-1093 (2.00s).  Intensity 6.
   VO: "4. Opal. You describe an app in one sentence"

   ⭐ THE MEASURE IS **ONE SENTENCE**, so the input is ONE object — a single
   long bar, not a paragraph of type (`feedback_graphical_over_textual`: budget
   ONE text chip per shot, and a number moves to its value rather than being
   typeset at it). It slides into a press and the press SLAMS.
   ====================================================================== */
export const S12: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bench");
  const SAY = v === "amber" ? 10 : v === "steel" ? 4 : 7;
  const SLIDE = SAY + 8, SLAM = SLIDE + 20;
  const sh = shake(f, SLAM, 10, 8);
  const st = E(f, SLIDE, SLAM, 0, 1, IO);
  return (
    <Scene p={p} slug="ONE SENTENCE" push={push(v, dur, 1.104)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="bench" f={f} lit={1} t={f * 0.5} rakeRate={4.8} />

        {/* ⛔ THE PRESS READ AS A TABLE. Wide thin legs, a thin crown and a
            shallow ram is the silhouette of furniture; a press is a HEAVY CROWN
            on THICK COLUMNS over a MASSIVE BED, with the ram filling the gap.
            Rebuilt to those proportions and moved to frame centre, and it is
            now 14 drawn parts rather than 6. */}
        <div style={{ position: "absolute", left: 440, top: 132, width: 360, height: 404, zIndex: 44 }}>
          {/* two THICK columns with tie rods */}
          {[0, 306].map((k, i) => (
            <div key={"pc" + i} style={{ position: "absolute", left: k, top: 0, width: 54, height: 404,
              borderRadius: 5,
              background: `linear-gradient(90deg, ${mxh("#9A8468", 0.26)} 0%, ${dkh("#9A8468", 0.34)} 100%)` }}>
              {[0.14, 0.44, 0.74].map((j, q) => (
                <div key={"tr" + q} style={{ position: "absolute", left: 8, right: 8, top: `${j * 100}%`,
                  height: 14, borderRadius: 3, background: dkh("#9A8468", 0.46) }} />
              ))}
            </div>
          ))}
          {/* the CROWN — deep, and it carries the flywheel */}
          <div style={{ position: "absolute", left: -26, top: -14, width: 412, height: 96, borderRadius: 8,
            background: `linear-gradient(178deg, ${mxh("#9A8468", 0.30)} 0%, ${dkh("#9A8468", 0.36)} 100%)`,
            border: `6px solid ${dkh("#9A8468", 0.46)}` }}>
            {[0.10, 0.30, 0.50, 0.70, 0.90].map((k, i) => (
              <div key={"cb" + i} style={{ position: "absolute", left: `${k * 100}%`, top: 22,
                width: 20, height: 20, borderRadius: "50%", background: dkh("#9A8468", 0.52) }} />
            ))}
          </div>
          {/* the flywheel on the side, turning — the background process */}
          <div style={{ position: "absolute", left: -96, top: 4, width: 108, height: 108,
            borderRadius: "50%", background: dkh("#9A8468", 0.30),
            border: `10px solid ${mxh("#9A8468", 0.16)}`, transform: `rotate(${f * 4.2}deg)` }}>
            {[0, 60, 120].map(a => (
              <div key={"fw" + a} style={{ position: "absolute", left: 44, top: 6, width: 8, height: 76,
                background: dkh("#9A8468", 0.44), transform: `rotate(${a}deg)`, transformOrigin: "50% 50%" }} />
            ))}
          </div>
          {/* the BED — massive, and the thing the sentence slides onto */}
          <div style={{ position: "absolute", left: -34, top: 326, width: 428, height: 92, borderRadius: 6,
            background: `linear-gradient(178deg, ${mxh("#9A8468", 0.20)} 0%, ${dkh("#9A8468", 0.44)} 100%)`,
            border: `6px solid ${dkh("#9A8468", 0.50)}` }} />
          {/* the RAM — it fills the gap, so the drop is a real distance */}
          <div style={{ position: "absolute", left: 44,
            top: 92 + (f >= SLAM ? Math.min(196, (f - SLAM) * 34) : 0),
            width: 272, height: 168, borderRadius: 5,
            background: `linear-gradient(178deg, ${mxh("#7E6A50", 0.26)} 0%, ${dkh("#7E6A50", 0.44)} 100%)`,
            border: `6px solid ${dkh("#7E6A50", 0.54)}` }}>
            {/* ⛔ THREE BOLTS IN A ROW OVER A COLOURED BAR IS A FACE — the same
                defect the stamp head had, on a second prop, caught the same way
                (look at the still, not at the code). Five bolts plus a lower
                rail reads as a machined ram. */}
            {[0.10, 0.30, 0.50, 0.70, 0.90].map((k, i) => (
              <div key={"rb" + i} style={{ position: "absolute", left: `${k * 100}%`, top: 26,
                width: 19, height: 19, borderRadius: "50%", background: dkh("#7E6A50", 0.58) }} />
            ))}
            <div style={{ position: "absolute", left: 18, right: 18, top: 78, height: 13,
              borderRadius: 3, background: dkh("#7E6A50", 0.50) }} />
            <div style={{ position: "absolute", left: 34, right: 34, top: 104, height: 9,
              borderRadius: 3, background: mxh("#7E6A50", 0.10) }} />
            {/* the die face */}
            <div style={{ position: "absolute", left: 26, bottom: -20, right: 26, height: 32,
              borderRadius: 4, background: dkh(CLAY, 0.22) }} />
          </div>
        </div>

        {/* ⭐ THE ONE SENTENCE — a SINGLE long bar, sliding into the press */}
        {f >= SAY && f < SLAM + 6 && (
          <div style={{ position: "absolute", left: 116 + st * 468, top: 452, width: 380, height: 54,
            zIndex: 60, borderRadius: 27,
            background: `linear-gradient(94deg, #FFFFFF 0%, ${dkh(CREAMB, 0.06)} 100%)`,
            border: `5px solid ${dkh(CREAMB, 0.24)}`,
            transform: `scale(${E(f, SAY, SAY + 7, 0, 1, BACK)})` }}>
            {/* it is a sentence, so it has words — as ink bars, never as type */}
            {[14, 108, 176, 262].map((k, i) => (
              <div key={"sw" + i} style={{ position: "absolute", left: k, top: 20, width: 78 - i * 12,
                height: 13, borderRadius: 4, background: hexa(INK, 0.28) }} />
            ))}
          </div>
        )}
        <Puff x={620} y={470} f={f} at={SLAM} n={18} s={1.4} z={70} c="#C09660" />
        <Ring x={620} y={474} f={f} at={SLAM} r={280} c={p.key} z={69} w={7} />

        {/* ⭐ §10 — WHICH HALF IS MISSING? The press and the sentence were both
            drawn and the SOURCE was not: a sentence that simply appears on a
            bench came from nowhere. It now leaves HIS MOUTH — a speech plume
            that opens on the same frame the bar arrives, which is also the only
            thing in the shot moving before the slide starts. */}
        {f >= SAY - 6 && f < SLIDE + 6 && [0, 1, 2].map(i => {
          const t = E(f, SAY - 6 + i * 3, SAY + 6 + i * 3, 0, 1, OUT);
          if (t <= 0) return null;
          return (
            <div key={"sp" + i} style={{ position: "absolute", left: 296 + t * (60 + i * 26),
              top: 344 - i * 26 - t * 22, width: 26 + i * 16, height: 26 + i * 16,
              borderRadius: "50%", zIndex: 66, background: hexa(PAPER, 0.30 * (1 - t * 0.5)) }} />
          );
        })}
        {/* he speaks it — one gesture, and the bench jumps under him */}
        <Crew f={f} x={186} y={p.horizon + 44} i={4} size={196} z={80} at={0} loop={1} />
        <MarkCast x={912} y={140} s={90} z={74} f={f} spin={-0.4} o={0.7} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S13 — THE APP, AS A LINK.  f1093-1195 (3.40s).  Intensity 9.
   VO: "and it builds a working AI tool you can send to someone as a link
        immediately."

   ⭐⭐ §10 — BOTH MISSING HALVES ARE DRAWN:
     · the OUTPUT — the tile that rises carries LIVE MOVING UI on its face
       (rows arriving, a bar filling). Reel 107 measured real changing content
       as the biggest single motion lever there is; a logo on a box is a
       container, a running app is a depiction.
     · the HANDOFF — a LINK CHAIN snaps out across the FULL panel width to a
       third Claude, who lights up. It now runs on BOTH ends.
   ⭐ cut 4 of 5. Counter 2 -> 1.
   ====================================================================== */
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
        <SetFor k="bench" f={f} lit={1.1} t={f * 0.6} rakeRate={5.4} />

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
        <Crew f={f} x={150} y={p.horizon + 44} i={4} size={172} z={80} at={0} loop={1} />
        <Crew f={f} x={584} y={p.horizon + 48} i={0} size={156} z={81} at={RISE} loop={4} />
        <Crew f={f} x={912} y={p.horizon + 44} i={6} size={150} z={81} at={CHAIN}
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
   S14 — ANTIGRAVITY · THE FREE IDE.  f1195-1275 (2.67s).  Intensity 7.
   VO: "5. Antigravity. It's a free coding IDE from Google"

   ⭐ THE NOUN IS AN **IDE**, and Antigravity's own docs name exactly three
   surfaces — editor, terminal, browser. So the room IS those three surfaces,
   and they come up TOGETHER on one switch, which is what makes them one thing.
   ====================================================================== */
export const S14: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bays");
  const THROW = v === "amber" ? 12 : v === "steel" ? 5 : 8;
  const OPEN = THROW + 4;
  const sh = shake(f, THROW, 7, 6);
  return (
    <Scene p={p} slug="THE BAYS" push={push(v, dur, 1.084)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="bays" f={f} lit={1} t={f * 0.5} rakeRate={5.2} />

        {/* the master switch — the trigger is a real object, thrown */}
        <div style={{ position: "absolute", left: 62, top: 296, width: 92, height: 150, zIndex: 60,
          borderRadius: 8, background: `linear-gradient(178deg, ${mxh("#243440", 0.20)} 0%, ${dkh("#243440", 0.38)} 100%)`,
          border: `5px solid ${dkh("#243440", 0.50)}` }}>
          <div style={{ position: "absolute", left: 34, top: 18, width: 20, height: 74, borderRadius: 10,
            background: f >= THROW ? GREEN : RED,
            transformOrigin: "50% 100%", transform: `rotate(${f >= THROW ? 26 : -26}deg)` }} />
          <div style={{ position: "absolute", left: 26, top: 108, width: 36, height: 22, borderRadius: 5,
            background: f >= THROW ? hexa(GREEN, 0.5) : dkh("#243440", 0.30) }} />
        </div>

        {/* the three bays, rolling up TOGETHER */}
        {[0, 1, 2].map(i => (
          <Bay key={"by" + i} x={244 + i * 262} y={p.horizon - 24} w={228} h={264} f={f}
            open={OPEN + i * 2} kind={i as 0 | 1 | 2} z={34 + i} live={OPEN + 16} />
        ))}
        {[0, 1, 2].map(i => (
          <Ring key={"br" + i} x={244 + i * 262} y={p.horizon - 150} f={f} at={OPEN + i * 2 + 16}
            r={200} c={p.key} z={72} w={6} dur={14} />
        ))}

        {/* the ANTIGRAVITY card, 200px, on the room's name board */}
        <NameBoard x={506} y={78} w={430} t="ANTIGRAVITY" f={f} at={OPEN + 20} z={76} s={1.06}
          sub="GOOGLE · FREE IDE" />
        <div style={{ position: "absolute", left: 116, top: 62, width: 132, height: 132, zIndex: 77,
          borderRadius: 28, background: "#FFFFFF", border: "5px solid #ECE7DC",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${E(f, OPEN + 24, OPEN + 34, 0, 1, BACK)})` }}>
          <Img src={staticFile("logos/google.svg")} style={{ width: 92, height: 92, objectFit: "contain" }} />
        </div>

        {/* ⛔ 6.91 — the three shutters roll in 16 frames and then the shot
            HOLDS for 60. §5: spread arrivals across the FULL duration. The crew
            arrives to man the bays across the back half, which is also the
            before-state S15 needs. */}
        {[0, 1, 2, 3, 4].map(i => (
          <Crew key={"ia" + i} f={f} x={196 + i * 168} y={p.horizon + 200 + (i % 2) * 34}
            i={i + 2} size={150 - (i % 2) * 18} z={70 - (i % 2)} at={OPEN + 22 + i * 8}
            loop={i % 3 === 0 ? 1 : i % 3 === 1 ? 4 : 0}
            tint={i % 2 ? "#B8613F" : undefined} />
        ))}
        {[0, 1, 2, 3, 4].map(i => (
          <Puff key={"ip" + i} x={196 + i * 168} y={p.horizon + 200 + (i % 2) * 34} f={f}
            at={OPEN + 22 + i * 8} n={9} s={1.0} z={73} c="#527084" up={0.3} />
        ))}

        <Crew f={f} x={112} y={p.horizon + 220} i={8} size={158} z={72} at={0} loop={1} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S15 — THE TEAM, THREE SURFACES.  f1275-1395 (4.00s).  ⭐ THE PEAK. Intensity 10.
   VO: "that runs a team of agents at once across your editor, terminal, and
        your browser"

   ⭐⭐⭐ DENSITY PEAKS HERE (§9 — density is a SHAPE, not a level: it should
   peak on the one or two scenes that carry the story and thin out elsewhere).

   ⛔⛔ AN ACTION LOOP IS NOT A SCENE (reel 110). Eight sprites each correctly
   running a loop still read as *"standing around bouncing"*. So each bay's crew
   has a DIFFERENT JOB WITH A DIFFERENT OBJECT, and ⭐⭐ ONE TICKET TRAVELS
   BETWEEN THE BAYS — editor -> terminal -> browser, across the full panel —
   which is what makes three bays one SYSTEM rather than three loops.

   ⭐ Word-onset cuts, root minus 1275:
       "your editor,"  44.68s -> f1340 -> local 65
       "terminal,"     45.44s -> f1363 -> local 88
       "your browser"  46.08s -> f1382 -> local 107
   Each bay's sign lights and its work bursts on its OWN word.

   ⛔ CROWD ARITHMETIC: 9 sprites, 3 per bay, size 118. `pitch >= 0.85 * size`
   = 100px; the bays are 262px apart and each rank is 3 across ~228px, so the
   in-bay pitch is 76px — UNDER the law. Fixed by staggering the ranks in Y and
   painting back ranks darker, which is also the axis a greyscale audit reads.
   ====================================================================== */
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
        <SetFor k="bays" f={f} lit={1.15} t={f * 0.7} rakeRate={6.8} />

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
          const x = 158 + bay * 262 + (rank % 2) * 104 + (rank === 2 ? 52 : 0);
          const y = p.horizon + 172 + rank * 62;
          const size = 156 - rank * 22;
          return (
            <Crew key={"cw" + i} f={f} x={x} y={y} i={i} size={size} z={62 - rank * 3} at={k}
              loop={bay === 0 ? 1 : bay === 1 ? 4 : 2}
              tint={rank === 0 ? undefined : rank === 1 ? "#B8613F" : "#8E4A30"} />
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

        <MarkCast x={912} y={126} s={92} z={78} f={f} spin={0.55} o={0.72} />
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
        <SetFor k="bays" f={f} lit={0.86} t={f * 0.8} rakeRate={7.0} />

        {/* the three bays keep roaring behind him, smaller and further back */}
        {[0, 1, 2].map(i => (
          <Bay key={"by" + i} x={210 + i * 296} y={p.horizon - 96} w={190} h={210} f={f}
            open={-40} kind={i as 0 | 1 | 2} z={30 + i} live={-40} />
        ))}
        {/* and the crew keeps working */}
        {Array.from({ length: 6 }, (_, i) => (
          <Crew key={"cw" + i} f={f} x={150 + (i % 3) * 296 + Math.floor(i / 3) * 76}
            y={p.horizon + 96 + Math.floor(i / 3) * 40} i={i + 3} size={104 - Math.floor(i / 3) * 12}
            z={48 - Math.floor(i / 3) * 3} at={-20} loop={i % 3 === 0 ? 1 : i % 3 === 1 ? 4 : 2}
            tint={Math.floor(i / 3) ? "#A85838" : undefined} />
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
   S17 — TWENTY TIMES.  f1434-1517 (2.77s).  Intensity 8.
   VO: "This is how people become 20 times more productive with their coding
        agents,"

   ⛔⛔ NO `20x` PLATE, NO MULTIPLIER GAUGE, NO PERCENTAGE. There is no
   published benchmark behind "20 times", so the frame draws OUTPUT VOLUME —
   countable finished units that fill a rack and then OVERFLOW past the top of
   frame. The figure stays in the audio and the caption.

     before  one Claude, one bench, a short rack with three units on it
     trigger the far wall opens
     travel  the rack EXTENDS across the full panel and units land continuously
     arrival the rack fills and overflows; units stack past the frame
   ====================================================================== */
export const S17: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("out");
  const off = v === "amber" ? 5 : v === "steel" ? -3 : 0;
  const OPENW = 10 + off;
  /* 30 units, landing continuously across the whole scene */
  const LANDS = Array.from({ length: 30 }, (_, i) => 14 + off + i * 2.2);
  return (
    <Scene p={p} slug="MUCH MORE FINISHED" push={push(v, dur, 1.074)} vig={0.32}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="out" f={f} lit={1} t={f * 0.7} rakeRate={4.4} />

        {/* the far wall opening — the trigger, visible */}
        <div style={{ position: "absolute", left: 300, top: 130, width: 420,
          height: 300 * (1 - E(f, OPENW, OPENW + 14, 0, 1, OUT)), zIndex: 26,
          background: `repeating-linear-gradient(180deg, ${mxh("#8A6A44", 0.20)} 0px, ${mxh("#8A6A44", 0.20)} 16px, ${dkh("#8A6A44", 0.32)} 16px, ${dkh("#8A6A44", 0.32)} 32px)` }} />

        <OutputRack x={506} y={p.horizon + 108} w={330} h={330} f={f} lands={LANDS} z={40}
          extend={[OPENW, OPENW + 20, 940]} />

        {/* the units still in the air, arriving from the opened wall */}
        {LANDS.map((k, i) => {
          if (f < k - 9 || f > k) return null;
          const t = E(f, k - 9, k, 0, 1, IN_Q);
          const col = i % 12, row = Math.floor(i / 12);
          const tx = 506 - 470 + 28 + col * ((940 - 62) / 12);
          const ty = p.horizon + 108 - 58 - row * 52;
          return (
            <div key={"fu" + i} style={{ position: "absolute", left: 440 + (tx - 440) * t,
              top: 190 + (ty - 190) * t, width: 66, height: 46, zIndex: 62, borderRadius: 5,
              background: mxh(CREAMB, 0.12), border: `3px solid ${dkh(CREAMB, 0.30)}`,
              transform: `rotate(${t * 180}deg)` }} />
          );
        })}
        {/* ⭐ THE OVERFLOW — units stacking past the top of frame */}
        {f > 56 && Array.from({ length: Math.min(9, Math.floor((f - 56) / 2.4)) }, (_, i) => (
          <div key={"ov" + i} style={{ position: "absolute", left: 120 + i * 92,
            top: 62 - (i % 2) * 26, width: 74, height: 50, zIndex: 64, borderRadius: 5,
            background: mxh(CREAMB, 0.14), border: `3px solid ${dkh(CREAMB, 0.30)}`,
            transform: `rotate(${-8 + i * 3}deg) scale(${squash(f - 56 - i * 2.4, 4, 0.20, 2, 8)})` }} />
        ))}

        {/* one Claude at the bench, and the crew that arrived with the wall */}
        <Crew f={f} x={120} y={p.horizon + 244} i={1} size={168} z={72} at={0} loop={1} />
        {[0, 1, 2, 3].map(i => (
          <Crew key={"oc" + i} f={f} x={716 + (i % 2) * 118} y={p.horizon + 236 + Math.floor(i / 2) * 44}
            i={i + 6} size={124 - Math.floor(i / 2) * 14} z={70 - Math.floor(i / 2)}
            at={OPENW + 6 + i * 5} loop={i % 2 ? 4 : 1} tint={Math.floor(i / 2) ? "#B0603C" : undefined} />
        ))}

        <MarkCast x={906} y={140} s={94} z={76} f={f} spin={0.5} o={0.78} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S18 — THE LAST CHARGE.  f1517-1636 (3.97s).  Intensity 9.
   VO: "and that's what people are also paying Cursor and other coding IDEs $20
        a month for."

   ⭐ THE VILLAIN IS BEATEN EXACTLY ONCE, HERE. The stamp head has been fed in
   S0, S1, S4 and S11 and is STILL GOING at this scene's before-state — which is
   what makes the last cut land.
   ⭐ cut 5 of 5. Counter 1 -> 0. Then the whole remaining roll is pulled up and
   out of frame, and the five cards are standing lit behind it.
   ⛔ `$20` on the Cursor row is legal: the VO says it and Cursor Pro is $20/mo.
   ====================================================================== */
export const S18: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall3");
  const off = v === "amber" ? 6 : v === "steel" ? -4 : 0;
  const CUT = 46 + off, PULL = CUT + 26;
  const sh = shake(f, CUT + 12, 10, 9);
  const CARDS = [PULL + 8, PULL + 13, PULL + 18, PULL + 23, PULL + 28];
  return (
    <Scene p={p} slug="THE LAST CHARGE" push={push(v, dur, 1.062)} vig={0.32}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall3" f={f} lit={1} t={f * 0.5} rakeRate={6.0} />

        {/* the last row, still stamping right up to the cut */}
        <BillRoll x={210} y={-88} w={600} f={f} rows={rowsFor(4, CUT)} rowH={300} z={46}
          dir="v" creep={0.34} head pull={PULL}
          stampsFor={i => (i === 0 ? [8, 24] : [])} />
        <StampHead x={506} y={-160} w={500} f={f} hits={[8, 24]} z={62} drop={104} />

        {/* ⭐ CUT 5 OF 5 */}
        <Cutter y={442} f={f} at={CUT} z={78} h={64} dur={15} />
        <Puff x={506} y={442} f={f} at={CUT + 9} n={24} s={1.7} z={80} c="#D8B98E" up={0.7} />
        <Ring x={506} y={442} f={f} at={CUT + 9} r={380} c={p.key} z={79} w={10} />

        <ChargeCounter x={742} y={122} f={f} s={0.92} z={84}
          steps={[[-1, 1], [CUT + 14, 0]]} label="CHARGES" />

        {/* ⭐ behind the roll, once it is pulled: the five cards, lit and standing */}
        {CARDS.map((k, i) => (
          <ToolCard key={"fc" + i} x={124 + i * 190} y={p.horizon + 40} s={0.72} i={i} f={f}
            at={k} z={64 + i} rot={(i - 2) * 1.3} />
        ))}
        {CARDS.map((k, i) => (
          <Ring key={"cr" + i} x={124 + i * 190} y={p.horizon + 32} f={f} at={k} r={160}
            c={p.key} z={74} w={5} dur={13} />
        ))}

        <Crew f={f} x={912} y={p.horizon + 250} i={11} size={172} z={72} at={0} loop={4}
          cheer={f > CUT + 16 ? 1 : 0} />
        <MarkCast x={92} y={148} s={98} z={76} f={f} spin={-0.5} o={0.8} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S19 — CTA · THE STUB.  f1636-1696 (2.00s).  Intensity 7.
   VO: "For the full free list, comment BILL."

   ⛔ HARD CUT ON THE KEYWORD. `BILL` lands at 55.98s = f1679 = local 43, and
   the reel ends at f1696 — 17 frames later, which carries the word and stops.
   ====================================================================== */
export const S19: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall3");
  const FIELD = 8, KEY = 26;
  return (
    <Scene p={p} slug="COMMENT BILL" push={push(v, dur, 1.096)} vig={0.30}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="hall3" f={f} lit={1.1} t={f * 0.6} rakeRate={5.4} />

        {/* the five cards, standing, pulsing left to right */}
        {[0, 1, 2, 3, 4].map(i => (
          <ToolCard key={"cc" + i} x={124 + i * 190} y={p.horizon + 26} s={0.74} i={i} f={f}
            at={-30} z={62 + i} rot={(i - 2) * 1.2}
            lit={0.62 + 0.38 * Math.max(0, Math.sin((f - i * 5) / 7))} />
        ))}

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

        <CommentField x={506} y={p.horizon + 130} w={620} f={f} at={FIELD} word="BILL" z={86} />
        <Ring x={506} y={p.horizon + 178} f={f} at={KEY + 16} r={340} c={GOLD} z={85} w={8} />

        <Crew f={f} x={122} y={p.horizon + 268} i={6} size={150} z={72} at={2} loop={2} />
        <Crew f={f} x={906} y={p.horizon + 268} i={9} size={150} z={72} at={6} loop={2} flip />
        <MarkCast x={506} y={64} s={104} z={80} f={f} spin={0.6} o={0.9} />
      </div>
    </Scene>
  );
};
