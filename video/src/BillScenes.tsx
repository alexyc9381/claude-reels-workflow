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
  Broll, Shot,
  OutputRack, CommentField,
} from "./BillProps";
import { SetFor, placeFor } from "./BillSets";
import { G_TOOLS, ToolTile, GoogleSprite, SparkGuy, Spark } from "./BillGoogle";

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
   S0 — HOOK · THE BILL vs THE TOOLS.  f0-48 (1.60s).  Intensity 10.
   VO: "If you're not using these 5 Google AI tools"

   ⛔⛔⛔ REDONE COMPLETELY. Alex: *"the animation at 0 seconds hook needs to be
   redone completely its not interesting enough nor hierarchical and not really
   showing Google."* Three separate failures and the third is the root of the
   other two:

     · NOT SHOWING GOOGLE — the old hook was a bill, a press and a clay Claude.
       Nothing in it was Google. The reel is about GOOGLE'S tools and the open
       never said so, which is `feedback_real_marks_are_the_props` exactly: the
       real marks ARE the props.
     · NOT HIERARCHICAL — one cream mass filling the frame with a small sprite
       beside it. A big pale rectangle ranks nothing.
     · NOT INTERESTING — one stamp coming down twice. §2: a scene needs ONE
       THING TO HAPPEN with a beginning, a middle and an end.

   ⭐ THE NEW IMAGE IS THE WHOLE CLAIM IN ONE PICTURE: the bill hangs, and
   GOOGLE'S OWN TOOL CARDS FLY IN AND KNOCK THE CHARGES OFF IT. Every element
   is the subject's own object — five real Google marks, the four-colour bar,
   the Gemini spark, and the bill.

     before  f0   the bill is already there, five charges printed, and the FIRST
                  card is already in flight and large. Settled and legible on
                  the one frame guaranteed to be seen.
     trigger f5   card 1 hits
     travel  each card crosses ~640px of frame — a real distance, not a state
                  change (§11)
     arrival f5 / f16 / f27 / f37  the struck row BURSTS: it tears off the bill,
                  the strip tumbles away, dust, a ring, and the bill's remaining
                  length snaps upward

   ⛔ HIERARCHY IS THE SPREAD, NOT THE MEAN (§11). The bill is the biggest thing
   and near-white; the cards are the most SATURATED things and they are the ones
   moving. Frame 0's cream plate is the bill's head block, and the >=140 luma
   comes from it — no palette value is touched.
   ====================================================================== */
export const S0: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const HV = HOOK_V[v];
  const p = placeFor("hall");
  /* four cards, four impacts, spread across the full 48 frames */
  const HIT = v === "amber" ? [7, 18, 29, 39] : v === "steel" ? [4, 15, 26, 36] : [5, 16, 27, 37];
  const sh = HIT.reduce((a, k) => {
    const q = shake(f, k, 11, 8); return { x: a.x + q.x, y: a.y + q.y };
  }, { x: 0, y: 0 });
  const lastHit = HIT.filter(k => f >= k).slice(-1)[0];
  return (
    <Scene p={p} slug="THE LONG BILL" push={push(v, dur, 1.048)} vig={0.28}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall" f={f} lit={1} t={f * 0.5} rakeRate={5.4} />

        {/* ⭐ THE BILL — the biggest, palest mass, and it gets SHORTER as the
            cards land. Its head block is the frame-0 claim plate. */}
        {/* ⛔ THE ROWS HAVE TO ACTUALLY LEAVE. The first pass drew loose grey
            rectangles tumbling NEXT to the bill while the bill itself stayed the
            same length — so nothing was being taken away, which is the entire
            claim. `BillRoll` already cuts rows and closes the paper up; the
            strike frames are passed straight into it. */}
        {/* ⛔ frame-0 luma 135.6 against the 140 bar after the narrowing. §8's
            other remedy is to brighten the SUBJECT, so the bill's head block —
            which is the claim plate and the brightest contiguous cream in the
            frame — grows 148 -> 196 and the roll widens 462 -> 508. The hall
            keeps its dark corners: p90-p10 spread stays above 200. */}
        <BillRoll x={96} y={452} w={508} f={f} rowH={128} z={44}
          rows={ROW_DEFS.map((r, i) => ({ ...r, cut: i < HIT.length ? HIT[i] : undefined }))}
          dir="v" creep={0.24} jolt={HIT[0]} head headH={196}
          stampsFor={i => (i === 0 ? [-1] : [])} />

        {/* ⭐⭐ THE FOUR GOOGLE CARDS, flying in from the right and STRIKING the
            bill. This is the Google that the old hook did not have: four real
            marks, each on its own four-colour card, crossing 640px of frame. */}
        {HIT.map((k, i) => {
          const t = E(f, k - 13, k, 0, 1, IN_Q);
          const done = f > k + 5;
          if (f < k - 13) return null;
          /* ⛔ THE FOUR CARDS LANDED IN A VERTICAL COLUMN and read as a pile.
             They now settle in a ROW along the top — a shelf of Google tools
             above the bill they just shortened, which states "these five" AND
             leaves the bill unobstructed. */
          /* ⛔ y1 = 262 at s=0.60 puts the card TOP at 262 - 262*0.60 = 105,
             inside the header band. HEADER_SAFE plus a card height clears it. */
          const x0 = 1150 + i * 60, x1 = 292 + i * 172;
          const y0 = 268 + i * 40, y1 = HEADER_SAFE + 186;
          const x = done ? x1 : x0 + (x1 - x0) * t;
          const y = done ? y1 : y0 + (y1 - y0) * t;
          const settle = done ? squash(f - k, 7, 0.20, 3, 12) : 1;
          return (
            <div key={"gc" + i} style={{ position: "absolute", left: 0, top: 0, zIndex: 68 + i,
              transform: `rotate(${done ? (i - 1.5) * 3 : -26 + t * 26}deg)`,
              transformOrigin: `${x}px ${y}px` }}>
              <ToolCard x={x} y={y} s={0.60} i={i} f={f} at={k - 13} z={68 + i} />
              {!done && (
                /* the trail, so a fast object reads as fast */
                <div style={{ position: "absolute", left: x + 60, top: y - 80, width: 260 * (1 - t),
                  height: 10, borderRadius: 5, background: hexa(p.key, 0.42 * (1 - t)) }} />
              )}
            </div>
          );
        })}

        {/* the strike costs something: the row tears off and tumbles away */}
        {HIT.map((k, i) => (<React.Fragment key={"hx" + i}>
          <Puff x={336} y={452 + i * 116} f={f} at={k} n={22} s={1.7} z={78} c="#E8D8BC" up={0.5} />
          <Ring x={336} y={456 + i * 116} f={f} at={k} r={330} c={p.key} z={77} w={10} />
          {/* ⛔ the hand-drawn debris is gone: `BillRoll` tumbles the REAL row,
              with its real mark and figure on it, which is the object that was
              actually taken away. Loose grey rectangles were a container. */}
        </React.Fragment>))}

        {/* ⭐ THE GEMINI SPARK — Google's own AI symbol, big, and it is the
            brightest single object in the frame. It pulses on every strike. */}
        <Spark x={886} y={186} s={188} f={f} z={80} spin={0.5} pulse={1} />

        {/* ⭐ THE GOOGLE SPRITE at the foot — the cast is Google's now, not
            Claude's. He flinches on every card that lands. */}
        {/* ⭐ THE SPARK CHARACTER. Alex: *"i do like the gemini style character
            here but maybe not so claude sprite shaped."* Tinting the house box
            blue still read as Claude-in-blue, because the SILHOUETTE is the
            identity. This one's outline IS the Gemini mark. */}
        <SparkGuy f={f} x={846} y={784} size={278} i={0} z={90} at={-14} loop={3}
          shock={lastHit !== undefined && f - lastHit < 12 ? 1 : 0} />
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
        <SetFor k="lab" f={f} lit={1} t={f * 0.7} rakeRate={4.2} />

        {/* the board the tiles seat into — a real rack with rails */}
        <div style={{ position: "absolute", left: 52, top: 128, width: 908, height: 410, zIndex: 28,
          borderRadius: 8, background: `linear-gradient(176deg, ${dkh("#2A3E4C", 0.06)} 0%, ${dkh("#2A3E4C", 0.26)} 100%)`,
          border: `7px solid ${dkh("#2A3E4C", 0.34)}` }}>
          {[0, 1, 2, 3].map(i => (
            <div key={"wr" + i} style={{ position: "absolute", left: 10, right: 10, top: 24 + i * 98,
              height: 6, background: hexa("#9AC4D8", 0.20) }} />
          ))}
        </div>

        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const c = i % COLS, r = Math.floor(i / COLS);
          const x = 130 + c * 152, y = 192 + r * 98;
          const survivor = KEEP.includes(i);
          const struck = survivor ? undefined : 32 + off + (c * 7 + r * 3);
          return (
            <ToolTile key={"tt" + i} x={x} y={y} s={0.80} f={f} at={at(i)}
              struck={struck} z={40 + r} seed={i} t={G_TOOLS[order(i)]} />
          );
        })}

        {/* ⭐ THE SIFTER — he WALKS the wall carrying a stamp, and the X-marks
            land where he has been. A job with an object beats any idle. */}
        <Cam x={0} y={0} z={64}>
          {/* ⛔ THE CAST IN A GOOGLE SCENE IS GOOGLE'S. This was the clay Claude
              in a cop hat, standing in front of a wall of Google tools — the
              same mismatch Alex named on the hook. `GoogleSprite` is the house
              body with a Google tint and the Gemini spark. */}
          <SparkGuy f={f} x={walk} y={p.horizon + 150} size={196} i={0} z={64} at={2} loop={1} />
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

   ⛔⛔ REBUILT. Alex: *"the animation at 11 seconds needs to be redone because
   it doesnt make sense its too complicated its not immediately easy to
   understand."* He is right, and the count says why: the first version had a
   turnstile (11 drawn parts), a coin, a caged chat window, a running meter,
   two booth walls, a queue of three Claudes, two queue rails and the bill
   crossing the floor — NINE ideas in a 2.57-second shot whose sentence is
   "you pay $20 a month for a chat window".

   ⭐ It is now ONE OBJECT AND ONE ACTION: a chat window with a COIN SLOT in its
   face. A $20 coin goes in, the window lights, a month meter runs down, the
   window dies, and the counter says this is the second time. The turnstile,
   the queue, the rails and the booth walls are gone — they were staging for a
   metaphor the line does not need. [[feedback_hook_simplicity]]'s rule
   generalised: **the thing to reduce is IDEAS, not layers.**

   ⭐ AND THE TOOL IS NAMED WHERE THE VO NAMES IT. Alex: *"have the logos of the
   apps whenever you mention them between things."* Measured onsets: "AI"
   10.93s / "Studio." 11.05s / "Instead" 11.52s, i.e. local f16 / f20 / f34. So
   the AI STUDIO card lands on its own name and holds through the beat, and the
   toll starts on "Instead".

   ⛔ NO VENDOR MARK ON THE PAID WINDOW ITSELF. The VO names no vendor for the
   "$20 a month for a chat window" line, so the thing being paid for is
   unbranded — the AI Studio card is the FREE alternative being introduced, and
   it sits apart from the machine.
   ====================================================================== */
export const S4: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("booth");
  /* the measured onsets, minus the scene start (f312 = 10.40s) */
  const NAME = 16, PAY = v === "amber" ? 40 : v === "steel" ? 32 : 36;
  const IN = PAY + 12, DIE = IN + 22;
  const ct = E(f, PAY, IN, 0, 1, IN_Q);
  const sh = shake(f, IN, 8, 7);
  const lit = f >= IN && f < DIE;
  return (
    <Scene p={p} slug="$20 A MONTH" push={push(v, dur, 1.088)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="booth" f={f} lit={1} t={f * 0.4} rakeRate={3.8} />

        {/* ⭐ ONE OBJECT: a chat window with a coin slot in it. 470x330 = 46% of
            the panel, dead centre, nothing competing. */}
        <div style={{ position: "absolute", left: 270, top: 158, width: 470, height: 330, zIndex: 46,
          borderRadius: 18, overflow: "hidden",
          background: lit ? "#F7F4EC" : dkh("#1A2620", 0.10),
          border: `8px solid ${dkh("#243830", 0.44)}` }}>
          {/* its title bar */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52,
            background: hexa(p.key, lit ? 0.26 : 0.06) }}>
            {[0, 1, 2].map(i => (
              <div key={"cd" + i} style={{ position: "absolute", left: 18 + i * 28, top: 18,
                width: 16, height: 16, borderRadius: "50%",
                background: lit ? hexa(INK, 0.22) : hexa(p.key, 0.10) }} />
            ))}
          </div>
          {/* the conversation — it only exists while the coin is good */}
          {[0, 1, 2, 3].map(i => (
            <div key={"cw" + i} style={{ position: "absolute", left: i % 2 ? 196 : 26,
              top: 82 + i * 56, width: i % 2 ? 246 : 288, height: 38, borderRadius: 19,
              background: lit ? hexa(i % 2 ? CLAY : INK, 0.24) : hexa(p.key, 0.06) }} />
          ))}
          <div style={{ position: "absolute", left: 26, bottom: 20, right: 26, height: 46,
            borderRadius: 23, background: hexa(INK, lit ? 0.07 : 0.03),
            border: `3px solid ${hexa(INK, lit ? 0.12 : 0.05)}` }}>
            <div style={{ position: "absolute", left: 20, top: 12, width: 6, height: 22,
              background: lit && Math.floor(f / 7) % 2 ? CLAY : "transparent" }} />
          </div>
        </div>

        {/* ⭐ THE COIN SLOT, cut into the machine's own face — this is the whole
            idea, so it is on the object and not beside it */}
        <div style={{ position: "absolute", left: 300, top: 500, width: 410, height: 76, zIndex: 48,
          borderRadius: 10, background: `linear-gradient(178deg, ${mxh("#8E9A94", 0.18)} 0%, ${dkh("#8E9A94", 0.36)} 100%)`,
          border: `6px solid ${dkh("#8E9A94", 0.46)}` }}>
          <div style={{ position: "absolute", left: 92, top: 20, width: 108, height: 20,
            borderRadius: 5, background: "#0C100E",
            boxShadow: "inset 0 3px 0 rgba(0,0,0,0.6)" }} />
          {/* the month meter, ON the machine */}
          <div style={{ position: "absolute", right: 18, top: 14, width: 120, height: 46,
            borderRadius: 7, background: "#0E1815", border: `4px solid ${dkh("#8E9A94", 0.44)}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(28, 800), color: lit ? GREEN : RED }}>
              {lit ? `${Math.max(0, 30 - Math.floor((f - IN) * 1.4))}d` : "00d"}
            </span>
          </div>
          {/* the count of how many times this has happened */}
          <div style={{ position: "absolute", left: 18, top: 20, ...mono(30, 800),
            color: hexa(GOLD, 0.9) }}>{f >= IN ? "02" : "01"}</div>
        </div>

        {/* the coin travels the full height of the machine and goes IN */}
        {f >= PAY && f < IN + 4 && (
          <Coin x={196 + ct * 260} y={330 + ct * 190} s={1.5} f={f} rot={ct * 420} z={62} />
        )}
        <Puff x={506} y={520} f={f} at={IN} n={14} s={1.2} z={64} c="#7EA894" />
        <Ring x={506} y={524} f={f} at={IN} r={230} c={p.key} z={63} w={7} />

        {/* ⭐ THE TOOL, NAMED WHERE THE VO NAMES IT — and it is the FREE
            alternative, so it stands apart from the machine, not on it. */}
        <ToolCard x={158} y={430} s={0.68} i={0} f={f} at={NAME} z={72} rot={-3} />
        <Ring x={158} y={422} f={f} at={NAME} r={180} c={p.key} z={71} w={6} dur={14} />

        {/* he pays, and he is the only character in the shot.
            ⛔ y = p.horizon + 246 was 794 ON A 792px PANEL — his feet were off
            the bottom. Check the arithmetic against H, not against a number
            that looked right in another set. */}
        <Crew f={f} x={166} y={p.horizon + 208} i={3} size={186} z={70} at={0} loop={4} />

        {/* the bill takes the charge, along the very bottom edge */}
        <BillRoll x={rollX(220, IN + 4, 1.05)} y={p.horizon + 214} w={124} f={f}
          rows={rowsFor(0)} rowH={220} z={54} dir="h" creep={1.05} head={false}
          stampsFor={i => (i === 0 ? [IN + 4] : [])} />
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
        <Crew f={f} x={868} y={p.horizon + 214} i={9} size={166} z={72} at={0} loop={3}
          shock={LAND.some(k => f >= k && f - k < 10) ? 1 : 0} />
        <Crew f={f} x={148} y={p.horizon + 240} i={1} size={140} z={71} at={4} loop={1} flip />

        {/* ⭐ Alex: *"have the logos of the apps whenever you mention them
            between things."* The tool that owns this beat carries its mark, so
            a viewer joining mid-scene still knows which product they are
            looking at. */}
        <ToolCard x={834} y={262} s={0.56} i={0} f={f} at={4} z={76} rot={3} />
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
        <SetFor k="stacks" f={f} lit={1} t={f * 0.6} rakeRate={5.0} />

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

        {/* ⭐ THE REAL NOTEBOOKLM UI, from Google's own launch video, sitting where
            the sources live. The tether runs back to the actual product. */}
        <Broll x={806} y={214} w={330} f={f} at={2} src="broll/broll_notebook.mp4"
          z={44} label="NOTEBOOKLM" chrome="app" punch={BOUND} />

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
          rakeRate={5.8} occluders={false} />

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
        <Broll x={506} y={286} w={880} f={f} at={PROJ} src="broll/broll_flow_edit.mp4"
          z={30} chrome="bare" ratio={0.50} punch={UNFOLD + 14} />
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
        <ToolCard x={172} y={330} s={0.72} i={2} f={f} at={NAME} z={76} rot={-3} />
        <Ring x={172} y={322} f={f} at={NAME} r={190} c={p.key} z={75} w={6} dur={14} />

        {/* the operator, working the crane, in silhouette too */}
        <Crew f={f} x={604} y={p.horizon + 214} i={10} size={172} z={70} at={2} loop={0}
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
          <Broll x={512} y={252} w={356} f={f} at={TYPE - 4} src="broll/broll_flow_type.mp4"
            z={66} label="FLOW" chrome="app" punch={SLAM} />
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
          <Broll x={512} y={268} w={556} f={f} at={VEO} src="broll/broll_flow_grid.mp4"
            z={66} label="VEO" chrome="app" punch={MOVE} />
        )}

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
  /* the parts that snap together once the sentence is in */
  const PARTS: Array<[number, number, number, number]> = [
    [560, 300, 150, 44], [560, 352, 96, 44], [664, 352, 46, 44],
    [560, 404, 150, 34], [560, 446, 72, 34], [638, 446, 72, 34],
  ];
  return (
    <Scene p={p} slug="ONE SENTENCE" push={push(v, dur, 1.098)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="bench" f={f} lit={1} t={f * 0.5} rakeRate={4.8} />

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
          {/* the read head, running across the sentence once it is in */}
          {f >= IN && (
            <div style={{ position: "absolute", left: 26 + ((f - IN) * 9) % 216, top: 52, width: 18,
              height: 250, borderRadius: 6, background: hexa(G_BLUE, 0.72) }} />
          )}
        </div>

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
        {PARTS.map(([px, py, pw, ph], i) => {
          const at = BUILD + i * 5;
          if (f < at) return null;
          return (
            <div key={"pt" + i} style={{ position: "absolute", left: px, top: py, width: pw, height: ph,
              zIndex: 58, borderRadius: 8, background: hexa(i % 3 === 0 ? G_BLUE : i % 3 === 1 ? G_GRN : G_YEL, 0.30),
              border: `3px solid ${hexa(i % 3 === 0 ? G_BLUE : i % 3 === 1 ? G_GRN : G_YEL, 0.70)}`,
              transform: `scale(${squash(f - at, 5, 0.28, 3, 9)})` }} />
          );
        })}
        {PARTS.map((_, i) => (
          <Ring key={"pr" + i} x={620} y={340 + i * 34} f={f} at={BUILD + i * 5} r={120}
            c={p.key} z={59} w={4} dur={10} />
        ))}
        <Puff x={664} y={400} f={f} at={IN} n={16} s={1.3} z={62} c="#C09660" />
        <Ring x={664} y={404} f={f} at={IN} r={270} c={p.key} z={61} w={7} />

        {/* ⭐ THE TOOL, NAMED WHERE THE VO NAMES IT */}
        <ToolCard x={186} y={330} s={0.66} i={3} f={f} at={NAME} z={74} rot={-4} />
        <Ring x={186} y={322} f={f} at={NAME} r={170} c={p.key} z={73} w={5} dur={13} />

        {/* he speaks it — one gesture, at the bench line */}
        <Crew f={f} x={266} y={p.horizon + 44} i={4} size={196} z={80} at={0} loop={1} />
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

        {/* ⭐ the tool that owns this beat, named */}
        <ToolCard x={136} y={276} s={0.56} i={3} f={f} at={4} z={76} rot={-3} />

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
   S14 — ANTIGRAVITY · THE FREE IDE.  f1195-1275 (2.67s).  Intensity 8.
   VO: "5. Antigravity. It's a free coding IDE from Google"

   ⛔⛔ REDONE. Alex: *"at 41 seconds that animation needs to be made
   significantly better redone its not that good right now."* The first version
   threw a switch, rolled three shutters up over 16 frames, and then HELD for
   sixty — §5's "arrivals spread across the FULL duration", failed. It also had
   the room's own capture buried under the dark overhead, and no tool card on
   the beat where the VO names the tool.

   ⭐ THE POWER-UP IS NOW THE WHOLE SCENE, and it runs the entire 80 frames:
     · the room is DEAD at f0 — three dark bays, no light anywhere
     · the ANTIGRAVITY card lands on its measured name onset (40.58s -> f18)
     · a POWER SURGE crosses the room left to right, and each bay ignites as the
       surge reaches it — three staggered ignitions, not one simultaneous reveal
     · each bay floods with content the instant it lights, and the content CYCLES
     · the crew streams in behind the surge, arriving across the back half
     · a status rail along the bottom fills bay by bay
   ⭐ Three large bright rectangles igniting in sequence across 2.67s is the
   shape §1's table actually rewards, and it is what "it boots up" looks like.
   ====================================================================== */
export const S14: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("bays");
  const off = v === "amber" ? 4 : v === "steel" ? -3 : 0;
  const THROW = 6 + off, NAME = 18;
  /* the surge crosses the room; each bay ignites as it arrives */
  const IGN = [THROW + 8, THROW + 18, THROW + 28];
  const surgeX = E(f, THROW, THROW + 34, -120, 1140, LIN);
  const sh = shake(f, THROW, 8, 7);
  return (
    <Scene p={p} slug="THE BAYS" push={push(v, dur, 1.080)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="bays" f={f} lit={E(f, IGN[0], IGN[2] + 10, 0.10, 1, OUT)} t={f * 0.5}
          rakeRate={5.2} />

        {/* the master switch — the trigger, and a real object */}
        <div style={{ position: "absolute", left: 46, top: 306, width: 88, height: 146, zIndex: 60,
          borderRadius: 8, background: `linear-gradient(178deg, ${mxh("#243440", 0.20)} 0%, ${dkh("#243440", 0.38)} 100%)`,
          border: `5px solid ${dkh("#243440", 0.50)}` }}>
          <div style={{ position: "absolute", left: 32, top: 18, width: 20, height: 72, borderRadius: 10,
            background: f >= THROW ? GREEN : RED,
            transformOrigin: "50% 100%", transform: `rotate(${f >= THROW ? 26 : -26}deg)` }} />
          <div style={{ position: "absolute", left: 24, top: 106, width: 36, height: 22, borderRadius: 5,
            background: f >= THROW ? hexa(GREEN, 0.55) : dkh("#243440", 0.30) }} />
        </div>

        {/* ⭐ THE SURGE — a bright front crossing the room, and it is what makes
            the three ignitions read as ONE event rather than three cuts */}
        {f >= THROW && f <= THROW + 36 && (<>
          <div style={{ position: "absolute", left: surgeX - 26, top: 90, width: 52, bottom: 120,
            zIndex: 66, background: `linear-gradient(90deg, ${hexa(p.key, 0)} 0%, ${hexa(p.key, 0.85)} 50%, ${hexa(p.key, 0)} 100%)` }} />
          <div style={{ position: "absolute", left: surgeX - 140, top: 90, width: 140, bottom: 120,
            zIndex: 65, background: `linear-gradient(90deg, ${hexa(p.key, 0)} 0%, ${hexa(p.key, 0.22)} 100%)` }} />
        </>)}

        {/* the three bays, each igniting as the surge reaches it */}
        {[0, 1, 2].map(i => (
          <Bay key={"by" + i} x={244 + i * 262} y={p.horizon - 24} w={228} h={264} f={f}
            open={IGN[i] - 12} kind={i as 0 | 1 | 2} z={34 + i} live={IGN[i]} />
        ))}
        {[0, 1, 2].map(i => (<React.Fragment key={"bi" + i}>
          <Ring x={244 + i * 262} y={p.horizon - 150} f={f} at={IGN[i]} r={250} c={p.key}
            z={72} w={8} dur={16} />
          <Puff x={244 + i * 262} y={p.horizon - 40} f={f} at={IGN[i]} n={12} s={1.2}
            z={71} c="#527084" />
          {/* the bay's own flood, on ignition */}
          {f >= IGN[i] && f < IGN[i] + 12 && (
            <div style={{ position: "absolute", left: 244 + i * 262 - 132, top: p.horizon - 306,
              width: 264, height: 300, zIndex: 40, borderRadius: 8,
              background: hexa(p.key, 0.55 * (1 - (f - IGN[i]) / 12)) }} />
          )}
        </React.Fragment>))}

        {/* ⭐ a STATUS RAIL that fills bay by bay — the room reporting itself up */}
        <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon + 176, height: 44,
          zIndex: 68, borderRadius: 6,
          background: `linear-gradient(178deg, ${mxh("#243440", 0.14)} 0%, ${dkh("#243440", 0.40)} 100%)` }} />
        {[0, 1, 2].map(i => (
          <div key={"sr" + i} style={{ position: "absolute", left: 120 + i * 300, top: p.horizon + 186,
            width: 260, height: 24, zIndex: 69, borderRadius: 5,
            background: f >= IGN[i] ? hexa(GREEN, 0.62) : hexa("#243440", 0.5),
            transform: `scaleX(${f >= IGN[i] ? E(f, IGN[i], IGN[i] + 9, 0, 1, OUT) : 0.06})`,
            transformOrigin: "0% 50%" }} />
        ))}

        {/* ⭐ THE TOOL, NAMED WHERE THE VO NAMES IT */}
        {/* ⛔ y=224 put the card TOP at 41 — behind the header band. `y` is the
            card FOOT, so the top is `y - 262*s`; at s=0.70 that is y-183. */}
        <ToolCard x={186} y={HEADER_SAFE + 190} s={0.70} i={4} f={f} at={NAME} z={80} rot={-4} />
        <Ring x={186} y={HEADER_SAFE + 182} f={f} at={NAME} r={190} c={p.key} z={79} w={6} dur={14} />

        {/* the crew streams in behind the surge, across the back half */}
        {[0, 1, 2, 3, 4].map(i => (
          <Crew key={"ia" + i} f={f} x={206 + i * 160} y={p.horizon + 152 + (i % 2) * 30}
            i={i + 2} size={148 - (i % 2) * 18} z={70 - (i % 2)} at={IGN[Math.min(2, i % 3)] + 6 + i * 4}
            loop={i % 3 === 0 ? 1 : i % 3 === 1 ? 4 : 0} tint={i % 2 ? "#B8613F" : undefined} />
        ))}
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

        <ToolCard x={884} y={228} s={0.52} i={4} f={f} at={4} z={80} rot={3} />
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
   S18 — THE LAST CHARGE.  f1517-1636 (3.97s).  Intensity 10. ⭐ THE PAYOFF.
   VO: "and that's what people are also paying Cursor and other coding IDEs $20
        a month for."

   ⛔⛔ REBUILT. Alex: *"at 51 seconds needs to be significantly better right now
   its way too boring and bad here."* He is right and the diagnosis is the same
   one §8 keeps writing: the frame was a 600px CREAM SHEET filling the panel
   with a small counter beside it. One big pale rectangle is not a payoff, it is
   a wall — and this is the scene the whole reel has been counting down to.

   ⭐ WHAT THE PAYOFF ACTUALLY IS: the villain is beaten. So the shot is built
   around the villain, not around the paper:
     · the STAMP HEAD is huge and centre, still hammering the last row — it has
       won every scene it appeared in and it is winning at f0
     · the CURSOR mark is 150px on that row, because the VO names it and this is
       the only scene it appears in
     · the blade runs the full panel width and the row is TORN OUT — the strip
       flies apart in six pieces rather than sliding away
     · the roll is YANKED up and out, and the stamp head is dragged up with it:
       the machine leaves with the paper
     · the counter slams 1 -> 0 and the five cards land in the space it left
   ⭐ The bill is angled and narrower so the hall reads behind it, which is what
   stops the frame being a white wall.
   ====================================================================== */
export const S18: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall3");
  const off = v === "amber" ? 5 : v === "steel" ? -4 : 0;
  const HITS = [6 + off, 22 + off];
  const CUT = 44 + off, TEAR = CUT + 9, PULL = CUT + 24;
  const sh = HITS.concat([TEAR]).reduce((a, k) => {
    const q = shake(f, k, k === TEAR ? 13 : 8, 9); return { x: a.x + q.x, y: a.y + q.y };
  }, { x: 0, y: 0 });
  /* ⛔ was PULL+10..+30, which left ten frames of EMPTY ROOM between the roll
     leaving and the first card landing — the payoff beat played on nothing.
     They now start as the roll clears and overlap it. */
  const CARDS = [PULL + 2, PULL + 6, PULL + 10, PULL + 14, PULL + 18];
  const yank = f >= PULL ? E(f, PULL, PULL + 20, 0, 1, IN_Q) : 0;
  return (
    <Scene p={p} slug="THE LAST CHARGE" push={push(v, dur, 1.058)} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="hall3" f={f} lit={1} t={f * 0.5} rakeRate={6.0} />

        {/* ⭐ THE LAST ROW — angled and narrower, so the hall reads behind it and
            the frame is not a cream wall. It carries the CURSOR mark at 150px
            and the $20 the VO says, and it is still being stamped at f0. */}
        {f < TEAR + 26 && (
          <div style={{ position: "absolute", left: 176, top: 300 - yank * 900, width: 660, height: 236,
            zIndex: 48, transform: `rotate(-3.5deg)` }}>
            {[0, 1, 2, 3, 4, 5].map(i => {
              const torn = f >= TEAR;
              const tt = torn ? Math.min(1, (f - TEAR) / 24) : 0;
              const dir = i % 2 ? 1 : -1;
              return (
                <div key={"pc" + i} style={{ position: "absolute", left: i * 110, top: 0,
                  width: 112, height: 236, overflow: "hidden",
                  transform: torn
                    ? `translate(${dir * tt * (70 + i * 26)}px, ${tt * tt * 700}px) rotate(${dir * tt * 46}deg)`
                    : undefined,
                  opacity: 1 - tt * 0.5 }}>
                  <div style={{ position: "absolute", left: -i * 110, top: 0, width: 660, height: 236,
                    background: `linear-gradient(178deg, ${dkh(PAPER, 0.04)} 0%, ${PAPER} 22%, ${dkh(PAPER, 0.14)} 100%)`,
                    border: `5px solid ${dkh(PAPER, 0.22)}` }}>
                    {/* the cursor mark, 150px, because the VO names it */}
                    <div style={{ position: "absolute", left: 42, top: 42, width: 150, height: 150,
                      borderRadius: 30, background: "#FFFFFF", border: `5px solid ${dkh(PAPER, 0.20)}`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Img src={staticFile("logos/cursor.svg")}
                        style={{ width: 104, height: 104, objectFit: "contain" }} />
                    </div>
                    {[0.30, 0.50, 0.68].map((k, j) => (
                      <div key={"db" + j} style={{ position: "absolute", left: 224, top: 236 * k,
                        width: 190 - j * 44, height: 15, borderRadius: 4, background: hexa(INK, 0.28 - j * 0.06) }} />
                    ))}
                    <div style={{ position: "absolute", right: 34, top: 74, ...mono(86, 800),
                      color: hexa(INK, 0.86), letterSpacing: "-0.03em" }}>{R.price}</div>
                    {/* the recurring stamp, landing twice more before the cut */}
                    {HITS.filter(k => f >= k).map((k, j) => (
                      <div key={"st" + j} style={{ position: "absolute", right: 236 + j * 18, top: 44,
                        width: 128, height: 128, borderRadius: "50%",
                        border: `10px solid ${hexa(RED, 0.5)}`, transform: `rotate(-13deg) scale(${squash(f - k, 5, 0.12, 3, 9)})`,
                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ ...mono(30, 800), color: hexa(RED, 0.62) }}>PAID</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ⭐ THE VILLAIN, HUGE AND CENTRE, and it is DRAGGED OUT with the paper */}
        {f < PULL + 22 && (
          <div style={{ position: "absolute", inset: 0, transform: `translateY(${-yank * 700}px)` }}>
            {/* ⛔ y=44 PUT THE VILLAIN BEHIND `HookHeader` AGAIN (it owns the
                top ~95px). Third time in this build — check the header band
                before placing anything above y=110. */}
            <StampHead x={506} y={112} w={560} f={f} hits={HITS} z={62} drop={92} />
          </div>
        )}
        {HITS.map((k, i) => (<React.Fragment key={"hp" + i}>
          <Puff x={506} y={320} f={f} at={k} n={16} s={1.4} z={66} c="#D8B98E" up={0.4} />
          <Ring x={506} y={324} f={f} at={k} r={280} c={p.key} z={65} w={8} />
        </React.Fragment>))}

        {/* ⭐ CUT 5 OF 5 — and the row is TORN, not slid away */}
        <Cutter y={416} f={f} at={CUT} z={78} h={70} dur={13} />
        <Puff x={506} y={416} f={f} at={TEAR} n={30} s={2.0} z={80} c="#E8D2AA" up={0.9} />
        <Ring x={506} y={416} f={f} at={TEAR} r={460} c={p.key} z={79} w={12} dur={22} />

        <ChargeCounter x={742} y={112} f={f} s={0.96} z={84}
          steps={[[-1, 1], [TEAR, 0]]} label="CHARGES" />

        {/* ⭐ the five cards land in the space the bill left */}
        {CARDS.map((k, i) => (
          <ToolCard key={"fc" + i} x={124 + i * 190} y={p.horizon + 46} s={0.74} i={i} f={f}
            at={k} z={64 + i} rot={(i - 2) * 1.3} />
        ))}
        {CARDS.map((k, i) => (
          <Ring key={"cr" + i} x={124 + i * 190} y={p.horizon + 38} f={f} at={k} r={170}
            c={p.key} z={74} w={5} dur={13} />
        ))}

        <Crew f={f} x={916} y={p.horizon + 236} i={11} size={168} z={72} at={0} loop={4}
          cheer={f > TEAR + 6 ? 1 : 0} />
        <MarkCast x={88} y={140} s={92} z={76} f={f} spin={-0.5} o={0.72} />
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
        <SetFor k="hall3" f={f} lit={1.1} t={f * 0.6} rakeRate={5.4} />

        {/* the five cards, standing, pulsing left to right */}
        {/* the cards move DOWN to make room for the comment field */}
        {[0, 1, 2, 3, 4].map(i => (
          <ToolCard key={"cc" + i} x={124 + i * 190} y={p.horizon + 196} s={0.66} i={i} f={f}
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

        {/* ⛔ Alex: *"the 'bill' thing to comment at the bottom here is too low
            needs to be moved up and stuff here its not really visible."* It sat
            at `p.horizon + 130` = 658 on a 792 panel, i.e. the last eighth of
            the frame, under the vignette's darkest band and directly above the
            caption track — the one object the whole reel is asking for was the
            least visible thing in its own shot. It is now at 470, dead centre,
            and 40% wider. */}
        <CommentField x={506} y={470} w={720} f={f} at={FIELD} word="BILL" z={86} />
        <Ring x={506} y={518} f={f} at={KEY + 16} r={380} c={GOLD} z={85} w={9} />

        <Crew f={f} x={92} y={p.horizon + 250} i={6} size={132} z={72} at={2} loop={2} />
        <Crew f={f} x={930} y={p.horizon + 250} i={9} size={132} z={72} at={6} loop={2} flip />
        <MarkCast x={506} y={64} s={104} z={80} f={f} spin={0.6} o={0.9} />
      </div>
    </Scene>
  );
};
