import React from "react";
import { fraunces } from "./fonts";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, MarkPlate, MarkCast, Chip, Plate, BigNum, Contact, Motes,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam,
  Crew, Hero, Forearm, costumeFor, squash, lerpHex,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE,
} from "./OxWorld";
import {
  ModelCore, Socket, SpecCard, Lane, WeekClock, ContextDeck, SoftwareBay,
  HopperChute, CoinPile, OutGate, VideoView, Stencil, RunBand,
  LimitMeter, BenchChart, Crate, SceneWipe, Ox, Stall, ContextWindow, CodeSheet, Rig, Chain,
  CodeFloor, Lamp, Countdown, Star, Aura, PriceTag, TagCord, Balance, Pan,
  Bench, Belt, Hatch, BrowserWin, AppWin, GameView,
} from "./OxProps";
import { Hall, KeyPool, Stanchion, SparePile, Truss, DuctRun } from "./OxSets";

/* ===========================================================================
   REEL 119 · "OX" — THE SCENES.  Board: storyboards/119-ox.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION (§2): a before state legible
   on frame 1, a visible trigger, TRAVEL, and an arrival that costs something.

   ⛔⛔ AND THE HERO ACTS (§12). Asked of every scene before it was written —
   *what does the Claude DO here?* — never "what is around him":
     S0  shoulders the core down the bench into the socket
     S1  wipes the blank maker's plate with his forearm to check it isn't dirt
     S2  starts the lane, then hops when the bar overruns
     S3  hauls a floor hatch open and staggers back from the light
     S4  is BURIED by the pile and climbs it (his body changes shape)
     S5  runs the full length of the deck alongside the advancing edge
     S6  the crew lands and each one PRODUCES onto the belt
     S7  works a gate lever faster and faster, then lets go
     S8  carries the core down the row and seats it three times
     S9  runs back toward the bench, small against the clock
     S10 slaps the stencil down on the keyword

   ⛔ AN ACTION LOOP IS NOT A SCENE (§10 / reel 110). `Crew`'s four loops are
   what the floor does WHILE the scene happens. Every scene still owes its event.

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). The
   picture carries MARKS and NUMERALS; the header and captions carry language.

   ⛔ EVERY SCENE IS LOCKED. The reel has exactly TWO re-framings — the hard
   punch at S2 f66 and at S9 f30 — and both are CUTS, not drifts.
   ========================================================================= */

export type Variant = "unsigned" | "amber" | "steel";

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  unsigned: { dx: -10, dy: 14, s: 1.010, rot: -0.4 },
  amber:    { dx: -46, dy: -26, s: 1.040, rot: 2.1 },
  steel:    { dx: 48, dy: 24, s: 1.044, rot: -1.9 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` / `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  unsigned: "contrast(1.000) saturate(1.26) brightness(1.000)",
  amber:    "contrast(1.155) saturate(1.26) brightness(0.962)",
  steel:    "contrast(1.075) saturate(1.26) brightness(1.048)",
};

const PAR_X: Record<Variant, number> = { unsigned: 0, amber: -44, steel: 38 };
const RAKE_X0: Record<Variant, number> = { unsigned: 0, amber: 344, steel: -376 };
const RAKE_K: Record<Variant, number> = { unsigned: 1, amber: 1.86, steel: 0.44 };
/** ⭐ the band PITCH, per cut — 7 / 5 / 11 puts every band edge in a different
    place, which is the thing a 9x8 luma dHash actually compares. */
const RAKE_N: Record<Variant, number> = { unsigned: 7, amber: 5, steel: 13 };
/** ⭐ PER-CUT LAYOUT, on the three flattest scenes only.
    docs/TRIAL-CUTS §2, last lever: *"a big flat plate on a dark room is the
    hardest frame to differentiate. Vary its position, scale and beats; a grade
    has nothing to bite on."* Measured per TIMESTAMP, the three frames inside the
    flagging band were HAUL (f538), EDITORS (f681) and BOARD (f251) — all three
    are one large object on a plain field, where rake and contrast do least.
    So those three scenes, and only those three, get a per-cut offset and
    retimed beats: at any sampled instant the subject is somewhere else. */
const LAY: Record<Variant, { haul: number; editors: number; board: number; beat: number }> = {
  unsigned: { haul: 0, editors: 0, board: 0, beat: 0 },
  amber:    { haul: 104, editors: -58, board: -56, beat: -6 },
  steel:    { haul: -116, editors: 84, board: 88, beat: 10 },
};

type SP = { v: Variant; dur: number };

/* the ground line the cast stands on, house-wide */
const GY = 706;

/* =========================================================================
   S0 · THE BAY — 0.00 to 3.06s (92f) · HOOK
   VO: "So you can now use Claude Code completely free for the next week."

   ⭐ MECHANISM: `UNSIGNED`. Not a price cut, not growth. The counterintuitive
   half of this subject is that a model good enough to beat the frontier labs
   has NOBODY'S NAME ON IT. The hook opens on the redaction and does not resolve
   it — no benchmark, no capacity, no explanation of who made it.

   ⛔ FRAME 0 IS THE WHOLE CLAIM, SETTLED (reel 99 lesson): the core stands
   complete on the bench with `$0` already on it, the socket already empty, the
   mechanic already leaning into it. The f10 event pushes PAST frame 0 rather
   than arriving at it. Nothing fades in.
   ====================================================================== */
const S0Pull: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");

  /* ⭐⭐⭐ MECHANISM (one word): `PULL`. Third hook for this reel, and the two
     before it were both ABSTRACT:
       v1 SEAT  — a slab slid into a slot. An installation, i.e. a progress bar.
       v2 BREAK — a usage bar tore off its end stop. Better, but still a BAR,
                  and Alex has rejected shape-based animation across three reels.
     ⭐ v3 puts the reel's CHARACTER in the hook. The ox is harnessed by a real
     chain to your Claude Code rig; the mechanic drops the pin, the slack goes
     out of the chain, the ox digs in and DRAGS the whole machine — and the usage
     dial that was pegged red spins past its own stop and keeps going.
     It is a body doing work against a load, which is the one thing a viewer
     reads instantly and the one thing a rectangle can never be. And it does not
     resolve: nothing in it says HOW. */
  const pin = E(f, 6, 11, 0, 1, OUT);              /* he drops the hitch pin */
  const taut = E(f, 10, 18, 1, 0, IN_Q);           /* the slack goes out */
  const dig = E(f, 14, 30, 0, 1, IO);              /* the ox loads up */
  const drag = E(f, 22, dur - 4, 0, 1, IO);        /* and the rig comes with it */
  const travel = drag * 118;
  const hot = f >= 26;
  const dialK = f < 26 ? 0.04 : E(f, 26, dur, 0.04, 2.6, IN_Q);
  const lurch = f >= 22 ? Math.sin((f - 22) / 2.6) * Math.exp(-(f - 22) / 10) * 11 : 0;
  const roll = Math.floor(E(f, 26, dur - 4, 0, 1, IN_Q) * 999999);
  const price = E(f, 44, 52, 0, 1, BACK);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.26} glow={hexa(p.key, 0.16)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="bay"
        rake={0.150} rakeX={RAKE_X0[v]} rakeRate={5.04 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 520, y: 168, r: 260 }} grit={0.7} />
      <RunBand y={140} f={f} z={22} rate={5.0 + E(f, 30, dur, 0, 6.0, IO)} h={14} c={STEEL} hang
        loads={["#4A5058", "#3E444C", "#5A6068", "#3E444C"]} pitch={172} loadW={82} loadH={60} />

      {/* the bench practical — a lit surface is what §8 allows for frame-0 luma */}
      <div style={{ position: "absolute", left: 196, top: 560, width: 10, height: 70,
        zIndex: 27, background: dkh(SLATE, 0.40) }} />
      <div style={{ position: "absolute", left: 134, top: 626, width: 134, height: 48,
        zIndex: 28, borderRadius: "50% 50% 12px 12px",
        background: `linear-gradient(180deg, ${dkh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.48)} 100%)` }} />
      <div style={{ position: "absolute", left: 158, top: 666, width: 86, height: 14,
        zIndex: 29, borderRadius: 8, background: "#FFF4D2" }} />
      <KeyPool p={p} x={210} y={712} w={520} o={0.36} z={27} />

      {/* the roll counter, high and centred — a number MOVES to its value */}
      <div style={{ position: "absolute", left: 350, top: 214, width: 312, height: 56, zIndex: 46,
        borderRadius: 6, background: "#0C0F13", border: `4px solid ${dkh(STEEL, 0.40)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `translateY(${lurch * 0.4}px)` }}>
        <span style={{ ...mono(32, 900), color: hot ? GOLD : hexa("#FFFFFF", 0.50) }}>
          {roll.toLocaleString("en-US")}</span>
      </div>

      {/* ── THE LOAD: your Claude Code rig, on skids, being dragged ───────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 44,
        transform: `translate(${travel + lurch}px, 0)` }}>
        <div style={{ transform: `translate(${Math.sin(f * 1.7) * 2.6 * drag}px, ${Math.abs(Math.sin(f * 1.3)) * 3.4 * drag}px)` }}>
          <Rig x={230} y={706} s={0.98} z={44} f={f} dial={dialK} hot={hot} />
        </div>
      </div>
      {/* sparks off the skids — a dragged machine on a concrete floor */}
      {drag > 0.05 && Array.from({ length: 14 }, (_, i) => {
        const t = ((f * 1.6 + i * 5) % 22) / 22;
        return (
          <div key={"sk" + i} style={{ position: "absolute", zIndex: 46,
            left: 104 + travel + rnd(i, 51) * 220 - t * 90,
            top: 692 - t * 54 * (0.4 + rnd(i, 52)),
            width: 16 + (i % 3) * 8, height: 6, borderRadius: 3,
            background: i % 2 ? "#FFD9A0" : GOLD, opacity: (1 - t) * drag }} />
        );
      })}
      {/* the skid marks it leaves */}
      {drag > 0.05 && Array.from({ length: 7 }, (_, i) => (
        <div key={"sm" + i} style={{ position: "absolute", zIndex: 26,
          left: 106 + i * 26, top: 700, width: 22, height: 7, borderRadius: 4,
          background: hexa("#1A1712", 0.34) }} />
      ))}
      {drag > 0.05 && Array.from({ length: 8 }, (_, i) => (
        <div key={"dz" + i} style={{ position: "absolute", zIndex: 30,
          left: 120 + travel + i * 30 - drag * 60,
          top: 700 - Math.abs(Math.sin(i * 1.6)) * 40 * drag,
          width: 34 + (i % 3) * 12, height: 30, borderRadius: "50%",
          background: hexa("#D8C49A", 0.26 * drag) }} />
      ))}

      {/* ── THE CHAIN: slack at frame 0, dead straight the instant it bites ── */}
      <Chain x0={392 + travel + lurch} y0={478} x1={512 + travel} y1={468}
        sag={taut * 58} z={64} n={9} s={1.06} />

      {/* ── THE OX: harnessed, head down, driving ─────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 58,
        transform: `translateX(${travel}px)` }}>
        <Ox x={624} y={706} s={1.18} z={58} f={f} charge={dig} strain={dig * 0.8}
          name={R.model.name} />
      </div>
      <Contact x={624 + travel} y={706} w={470} z={26} o={0.50} />
      {/* the yoke plate — where the price lives, on the animal doing the work */}
      {price > 0.02 && (
        <div style={{ position: "absolute", left: 172 + travel, top: 384, width: 164, height: 64,
          zIndex: 72, borderRadius: 6, background: GOLD, border: `4px solid ${dkh(GOLD, 0.48)}`,
          transform: `scale(${price}) rotate(-6deg)`, transformOrigin: "50% 100%",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(36, 900), color: "#2A1D06" }}>$0</span>
        </div>
      )}
      <Puff x={430 + travel} y={712} f={f} at={22} c={hexa("#E8DCC0", 0.60)} />
      <Ring x={452} y={470} f={f} at={18} c={p.key} />

      {/* the mechanic drops the pin, then chases it */}
      <Hero f={f} x={150 + drag * 130} y={722} size={190} z={62} act={1} ph={0.4}
        drive={pin * 0.8 - E(f, 16, 26, 0, 0.6, OUT) + drag * 0.4} reach={62}
        cheer={E(f, 40, 50, 0, 1, OUT)} shock={E(f, 22, 30, 0, 0.7, OUT)}
        costume={{ constr: 1 }} />
      <Contact x={150 + drag * 130} y={722} w={92} z={19} o={0.42} />

      <WeekClock x={880} y={196} r={62} z={50} f={f}
        lit={E(f, 52, 62, 0, 1, LIN)} left={1} hand={f / 620} />
      <Chip t="NO LIMIT. NO NAME ON IT." y={118} c={INK} fg="#F6F2E8" s={0.90} z={96} />
    </Scene>
  );
};

/* =========================================================================
   ⭐⭐ HOOK B · `STRIP` — the amber cut.
   The ox rips the price tag off your Claude Code rig and $0 is stamped
   underneath. ⛔ The tag carries NO invented figure: Claude Code is bundled
   with a subscription, so a $/mo number on screen would be fabricated. It says
   METERED, which is true, and the thing under it is the claim.
   ====================================================================== */
const S0Strip: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  const toss = E(f, 8, 15, 0, 1, IN_Q) - E(f, 17, 30, 0, 1, OUT);   /* the head throw */
  const cut = E(f, 13, 17, 0, 1, IN_Q);                              /* the cord parts */
  const fly = E(f, 15, dur - 6, 0, 1, IN_Q);                         /* the tag goes */
  const reveal = E(f, 17, 25, 0, 1, BACK);                           /* $0 underneath */
  const shake = f >= 14 ? Math.sin((f - 14) / 2.3) * Math.exp(-(f - 14) / 8) * 12 : 0;
  const roll = Math.floor(E(f, 20, dur - 4, 0, 1, IN_Q) * 999999);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.26} glow={hexa(p.key, 0.16)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="bay"
        rake={0.150} rakeX={RAKE_X0[v]} rakeRate={5.04 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 500, y: 168, r: 260 }} grit={0.7} />
      <RunBand y={140} f={f} z={22} rate={5.0 + E(f, 22, dur, 0, 5.0, IO)} h={14} c={STEEL} hang
        loads={["#4A5058", "#3E444C", "#5A6068", "#3E444C"]} pitch={172} loadW={82} loadH={60} />
      <Mark x={112} y={186} s={112} z={26} />

      <div style={{ position: "absolute", left: 348, top: 210, width: 316, height: 54, zIndex: 46,
        borderRadius: 6, background: "#0C0F13", border: `4px solid ${dkh(STEEL, 0.40)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `translateY(${shake * 0.4}px)` }}>
        <span style={{ ...mono(31, 900), color: reveal > 0.4 ? GOLD : hexa("#FFFFFF", 0.50) }}>
          {roll.toLocaleString("en-US")}</span>
      </div>

      {/* THE RIG, and the thing stamped on it that the tag was covering */}
      <div style={{ position: "absolute", inset: 0, zIndex: 44,
        transform: `translate(${shake}px, ${shake * 0.3}px)` }}>
        <Rig x={396} y={714} s={1.10} z={44} f={f} dial={reveal > 0.3 ? E(f, 25, dur, 0.1, 2.2, IN_Q) : 0.05}
          hot={reveal > 0.3} />
      </div>
      {reveal > 0.02 && (
        <div style={{ position: "absolute", left: 288, top: 428, width: 218, height: 92, zIndex: 66,
          borderRadius: 8, background: GOLD, border: `6px solid ${dkh(GOLD, 0.48)}`,
          transform: `scale(${reveal}) rotate(-4deg)`, transformOrigin: "50% 50%",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(58, 900), color: "#2A1D06" }}>$0</span>
        </div>
      )}

      {/* the cord, and the tag leaving on it */}
      <TagCord x0={500} y0={402} x1={556} y1={470} z={59} cut={cut} />
      {fly < 0.98 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `translate(${fly * 620}px, ${-Math.sin(fly * Math.PI) * 300 + fly * fly * 420}px)` }}>
          <PriceTag x={556} y={462} s={0.94} z={60} text="METERED"
            rot={toss * 26 + fly * 190} />
        </div>
      )}
      <Ring x={540} y={452} f={f} at={15} c={p.key} />
      <Puff x={540} y={452} f={f} at={15} c={hexa("#E8DCC0", 0.60)} />

      {/* THE OX, head thrown, horn through the cord */}
      <div style={{ position: "absolute", inset: 0, zIndex: 58 }}>
        <Ox x={718} y={712} s={1.04} z={58} f={f} charge={0.30 + toss * 0.7}
          strain={toss * 0.6} flip name={R.model.name} />
      </div>
      <Contact x={718} y={712} w={400} z={26} o={0.50} />

      <Hero f={f} x={150} y={726} size={188} z={62} act={3} ph={0.4}
        shock={E(f, 15, 24, 0, 0.9, OUT)} cheer={E(f, 30, 42, 0, 1, OUT)}
        costume={{ constr: 1 }} />
      <Contact x={150} y={726} w={138} z={19} o={0.44} />

      <WeekClock x={886} y={192} r={58} z={50} f={f}
        lit={E(f, 46, 56, 0, 1, LIN)} left={1} hand={f / 620} />
      <Chip t="THE PRICE WAS THE ONLY CATCH" y={118} c={INK} fg="#F6F2E8" s={0.84} z={96} />
    </Scene>
  );
};

/* =========================================================================
   ⭐⭐ HOOK C · `OUTWEIGH` — the steel cut.
   A beam balance: the paid models on one pan, the one unsigned core on the
   other. The free side slams down and the paid stack is flung out of frame.
   ====================================================================== */
const S0Weigh: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  const drop = E(f, 10, 24, 0, 1, IN_Q);                 /* the beam goes over */
  const settle = f > 24 ? Math.sin((f - 24) / 3.4) * Math.exp(-(f - 24) / 13) * 0.16 : 0;
  const tilt = 1 - drop * 2 + settle;                    /* +1 paid down, -1 free down */
  const eject = E(f, 20, dur - 4, 0, 1, IN_Q);           /* the paid cores fly */
  const lit = E(f, 24, 34, 0, 1, OUT);
  const roll = Math.floor(E(f, 24, dur - 4, 0, 1, IN_Q) * 999999);
  const PAID = [
    { logo: "claude.svg", c: CLAY }, { logo: "openai.png", c: GREEN }, { logo: "gemini.png", c: SKY },
  ];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.26} glow={hexa(p.key, 0.16)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="bay"
        rake={0.150} rakeX={RAKE_X0[v]} rakeRate={5.04 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 160, r: 270 }} grit={0.7} />
      <RunBand y={128} f={f} z={22} rate={5.0} h={14} c={STEEL} hang
        loads={["#4A5058", "#3E444C", "#5A6068", "#3E444C"]} pitch={172} loadW={80} loadH={58} />
      <Mark x={110} y={180} s={106} z={26} />

      <div style={{ position: "absolute", left: 352, top: 196, width: 308, height: 52, zIndex: 46,
        borderRadius: 6, background: "#0C0F13", border: `4px solid ${dkh(STEEL, 0.40)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(30, 900), color: lit > 0.4 ? GOLD : hexa("#FFFFFF", 0.50) }}>
          {roll.toLocaleString("en-US")}</span>
      </div>

      <Balance x={506} y={712} s={1.0} z={40} f={f} tilt={tilt} />

      {/* LEFT PAN — what you pay for, going up and out */}
      <Pan x={294} y={470} s={0.88} z={46} drop={tilt * 92} c="#6E767F">
        {PAID.map((m, i) => (
          <div key={"pd" + i} style={{ position: "absolute",
            left: 22 + i * 96 + eject * (i - 1) * 190,
            top: -104 - eject * (330 + i * 40),
            width: 88, height: 104, borderRadius: 8, background: "#FFFFFF",
            border: `4px solid ${dkh(m.c, 0.36)}`, opacity: 1 - Math.max(0, (eject - 0.6) / 0.4),
            transform: `rotate(${eject * (i - 1) * 180}deg)`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(`logos/${m.logo}`)}
              style={{ width: 62, height: 62, objectFit: "contain" }} />
          </div>
        ))}
        {eject < 0.2 && (
          <div style={{ position: "absolute", left: 96, top: -150, width: 120, height: 40,
            borderRadius: 5, background: RED, border: `3px solid ${dkh(RED, 0.44)}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(23, 900), color: "#2A0A06" }}>PAID</span>
          </div>
        )}
      </Pan>

      {/* RIGHT PAN — the one unsigned core, coming down */}
      <Pan x={718} y={470} s={0.88} z={46} drop={-tilt * 92} c="#6E767F">
        <ModelCore x={168} y={-6} s={0.44} z={52} f={f} redacted price="$0" seated={lit} />
      </Pan>

      <Puff x={718} y={604} f={f} at={24} c={hexa("#E8DCC0", 0.60)} />
      <Ring x={718} y={558} f={f} at={24} c={p.key} />

      {/* the ox, watching the beam it just settled */}
      <div style={{ position: "absolute", inset: 0, zIndex: 58 }}>
        <Ox x={790} y={726} s={0.84} z={58} f={f} charge={0.20} flip name={R.model.name} />
      </div>
      <Contact x={790} y={726} w={310} z={26} o={0.46} />

      <Hero f={f} x={148} y={730} size={176} z={62} act={3} ph={0.8}
        shock={E(f, 22, 32, 0, 0.9, OUT)} cheer={E(f, 34, 46, 0, 1, OUT)}
        costume={{ constr: 1 }} />
      <Contact x={148} y={730} w={130} z={19} o={0.44} />

      <WeekClock x={886} y={190} r={54} z={50} f={f}
        lit={E(f, 48, 58, 0, 1, LIN)} left={1} hand={f / 620} />
      <Chip t="ONE OF THESE COSTS NOTHING" y={118} c={INK} fg="#F6F2E8" s={0.86} z={96} />
    </Scene>
  );
};

/** ⭐ THE HOOK EXPERIMENT. Three cuts, ONE body, THREE hooks — the cuts differ
    exactly where a viewer decides whether to stay, and nowhere else. */
export const S0: React.FC<SP> = (props) =>
  props.v === "amber" ? <S0Strip {...props} />
  : props.v === "steel" ? <S0Weigh {...props} />
  : <S0Pull {...props} />;

/* =========================================================================
   S1 · THE LINEUP — 2.51 to 4.88s (72f) · SETUP
   VO: "Now let me explain. So there's this brand new model called Ox Alpha"

   ⛔ ALEX ON v1: *"the second scene is not interesting. Either it's just too
   much text. It needs to be more graphic wise."* v1 printed a four-row spec
   TABLE — which is exactly §4's *"animation should not be text"*, committed by
   the same file that quotes the rule. There is now ONE word on screen.

   ⭐ The graphic instead: a rail of model cores, each wearing a REAL maker's
   mark on a white tile — and the new one swings in at the end with a BLANK
   plate. The comparison IS the sentence, and §15's finding is the reason it
   works: at half a second a viewer RECOGNISES A MARK, they do not read a spec.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("spec");

  /* ⭐⭐⭐ THE BULLPEN — Alex: *"the ox alpha should show like an ox… hierarchical
     ox like sprite character in the bullpen beating the other models. I like
     more interesting animations like this idea."*

     ⛔ Not a borrowed world: the model's own NAME is ox-alpha, so an ox IS the
     subject's own noun (reel 118's gauntlet, same move). The rivals keep their
     REAL marks on 101px plates, so nothing here needs translating.

     ⭐ HIERARCHY IS RANK BY SIZE: three penned rivals at 168px against a 370px
     ox that arrives closer to camera. One dominant thing, and the frame says
     which is which before a word of the VO lands. */
  const charge = E(f, 8, 30, 0, 1, IN_Q) - E(f, 40, 56, 0, 1, OUT);
  const arrive = E(f, 6, 32, 0, 1, IN_Q);
  const oxX = 1330 - arrive * 586;
  const land = squash(f - 32, 6, 0.14, 3, 12);
  /* the stalls recoil in sequence, nearest first — the wave IS the "beating" */
  const fling = (i: number) => {
    const at = 30 - i * 5;                       /* nearest goes first */
    return E(f, at, at + 22, 0, 1, IN_Q);
  };
  /* ⭐ MORE MOTION: the pen does not settle. The big hit decays but a low
     rumble keeps every rail and stall alive for the rest of the scene. */
  const BRAND_AT = 44;                       /* VO: "brand new model" @ 3.93s */
  const slam = E(f, BRAND_AT, BRAND_AT + 5, 0, 1, OUT);
  const bScale = 1 + (1 - slam) * 0.52;
  const bHot = f < BRAND_AT ? 0 : E(f, BRAND_AT + 2, BRAND_AT + 20, 1, 0.30, OUT);
  const bShake = f >= BRAND_AT
    ? Math.sin((f - BRAND_AT) / 1.9) * Math.exp(-(f - BRAND_AT) / 6) * 9 : 0;
  const shake = (f >= 32 ? Math.sin((f - 32) / 2.4) * Math.exp(-(f - 32) / 9) * 11 : 0)
    + (f > 34 ? Math.sin(f / 3.1) * 2.4 : 0)
    + (f >= BRAND_AT ? Math.sin((f - BRAND_AT) / 2.2) * Math.exp(-(f - BRAND_AT) / 7) * 7 : 0);
  const RIV = [
    { logo: "claude.svg", name: "FABLE 5", c: CLAY, x: 158 },
    { logo: "openai.png", name: "GPT-5.6", c: GREEN, x: 336 },
    { logo: "gemini.png", name: "GEMINI", c: SKY, x: 514 },
  ];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.44} glow={hexa(p.key, 0.14)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="shutter"
        rake={0.170} rakeX={RAKE_X0[v]} rakeRate={5.33 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 700, y: 190, r: 250 }} grit={0.5} />
      <SceneWipe f={f} dir={-1} c="#5A4A2E" z={88} dur={9} n={3} />

      <RunBand y={150} f={f} z={22} rate={5.0} h={14} c="#5A4A2E" hang
        loads={["#8A7048", "#2A241E", "#A88A5E", "#2A241E"]} pitch={162}
        loadW={84} loadH={60} />

      {/* the pen: a top rail cropped by both edges, and a kick board on the floor */}
      <div style={{ position: "absolute", left: 0, top: 300 + shake * 0.5, width: W, height: 20,
        zIndex: 24, background: `linear-gradient(180deg, ${mxh("#5A4A2E", 0.24)} 0%, ${dkh("#5A4A2E", 0.54)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, top: 388 + shake * 0.7, width: W, height: 15,
        zIndex: 24, background: dkh("#5A4A2E", 0.44) }} />
      <div style={{ position: "absolute", left: 0, top: 706, width: W, height: 24, zIndex: 25,
        background: dkh("#3A2C16", 0.30) }} />

      {/* THREE PENNED RIVALS, each carrying its real mark at 101px */}
      <div style={{ position: "absolute", inset: 0, zIndex: 40,
        transform: `translateY(${shake * 0.6}px)` }}>
        {RIV.map((r, i) => {
          const k = fling(i);
          if (k > 0.99) return null;
          const dir = -1 - i * 0.16;
          return (
            <div key={"st" + i} style={{ position: "absolute", inset: 0, zIndex: 40,
              transform: `translate(${k * dir * 780}px, ${(-Math.sin(k * Math.PI) * 320) + k * k * 240}px) rotate(${k * (-150 - i * 70)}deg)`,
              transformOrigin: `${r.x}px 688px`, opacity: 1 - Math.max(0, (k - 0.7) / 0.3) }}>
              <Stall x={r.x} y={688} s={1.05} z={40} f={f}
                logo={r.logo} name={r.name} c={r.c} recoil={0} />
            </div>
          );
        })}
      </div>

      {/* ⭐⭐ THE NAME, BRANDED ONTO THE WALL — behind the ox (z 36 vs 58), so
          the animal still owns the front of the frame. */}
      {slam > 0 && (
        <div style={{ position: "absolute", left: 196 + bShake, top: 300, width: 640, height: 164,
          zIndex: 36, opacity: Math.min(1, slam * 1.7),
          transform: `scale(${bScale}) rotate(-3deg)`, transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", inset: -24, borderRadius: 28,
            background: hexa("#FF8A3C", 0.17 * bHot),
            boxShadow: `0 0 ${34 + bHot * 74}px ${hexa("#FF8A3C", 0.30 + bHot * 0.4)}` }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", whiteSpace: "nowrap",
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104,
            letterSpacing: 2, lineHeight: 1, color: "#FFE9C4",
            textShadow: `0 0 26px ${hexa("#FFD9A0", 0.92)}, 0 0 74px ${hexa("#FF8A3C", 0.55 + bHot * 0.4)}, 0 8px 0 #6B2A0C` }}>OX ALPHA</div>
        </div>
      )}
      <Ring x={516} y={382} f={f} at={BRAND_AT} c="#FF8A3C" />
      {/* scorch thrown off the wall by the hit */}
      {f >= BRAND_AT && f < BRAND_AT + 26 && Array.from({ length: 12 }, (_, i) => {
        const t = (f - BRAND_AT) / 26;
        const a = (i / 12) * Math.PI * 2 + 0.3;
        return (
          <div key={"bs" + i} style={{ position: "absolute", zIndex: 37,
            left: 516 + Math.cos(a) * t * (150 + rnd(i, 81) * 190),
            top: 382 + Math.sin(a) * t * (90 + rnd(i, 82) * 130) + t * t * 120,
            width: 10 + (i % 3) * 7, height: 10 + (i % 3) * 7, borderRadius: "50%",
            opacity: (1 - t) * 0.9,
            background: i % 3 ? "#FFD9A0" : "#FF8A3C",
            boxShadow: `0 0 12px ${hexa("#FF8A3C", 0.75)}` }} />
        );
      })}

      {/* ⭐ AND THE OX — 2.2x their width, closer to camera, head down */}
      <div style={{ position: "absolute", inset: 0, zIndex: 58,
        transform: `translate(${shake * 1.4}px, 0) scale(${land})`, transformOrigin: "72% 96%" }}>
        <Ox x={oxX} y={706} s={0.92} z={58} f={f} charge={charge}
          flip name={R.model.name} />
      </div>
      {/* the arrival costs something */}
      <Puff x={744} y={704} f={f} at={32} c={hexa("#F2B45C", 0.62)} />
      <Ring x={744} y={606} f={f} at={32} c={p.key} />
      <Contact x={744} y={706} w={370} z={26} o={0.52} />
      {/* splinters off each stand as it is taken out */}
      {RIV.map((r, i) => {
        const k = fling(i);
        if (k <= 0.02 || k > 0.9) return null;
        return Array.from({ length: 5 }, (_, q) => (
          <div key={"spl" + i + "_" + q} style={{ position: "absolute", zIndex: 47,
            left: r.x - 40 + q * 22 - k * (140 + q * 40),
            top: 600 - Math.sin(k * Math.PI) * (150 + q * 30) + k * k * 200,
            width: 34 + (q % 3) * 12, height: 16, borderRadius: 3,
            background: dkh(r.c, 0.30), opacity: 1 - k,
            transform: `rotate(${k * (240 + q * 60)}deg)` }} />
        ));
      })}

      {/* grit thrown off the floor for the whole scene, not just the impact */}
      {f > 20 && Array.from({ length: 16 }, (_, i) => {
        const t = ((f * 1.3 + i * 7) % 30) / 30;
        return (
          <div key={"gt" + i} style={{ position: "absolute", zIndex: 31,
            left: 470 + rnd(i, 71) * 460 - t * 190,
            top: 712 - t * 130 * (0.3 + rnd(i, 72)),
            width: 20 + (i % 3) * 10, height: 16, borderRadius: "50%",
            background: hexa("#D8C49A", 0.30 * (1 - t)) }} />
        );
      })}
      {arrive > 0.3 && Array.from({ length: 9 }, (_, i) => (
        <div key={"dz" + i} style={{ position: "absolute", zIndex: 30,
          left: 596 + i * 44 - arrive * 120, top: 706 - Math.abs(Math.sin(i * 1.7)) * 44,
          width: 44 + (i % 3) * 14, height: 40, borderRadius: "50%",
          background: hexa("#D8C49A", 0.28 * (1 - arrive)) }} />
      ))}

      <Hero f={f} x={172} y={728} size={196} z={62} act={3} ph={1.3}
        gaze={Math.sin(f / 21) * 0.9} shock={E(f, 32, 42, 0, 0.95, OUT)}
        costume={{ constr: 1 }} />
      <Contact x={172} y={728} w={96} z={19} o={0.44} />

    </Scene>
  );
};

/* =========================================================================
   S2 · THE BOARD — 4.88 to 8.58s (110f) · ESCALATE
   VO: "that beats Claude Fable 5 and GPT-5.6 on all the coding benchmarks."

   ⛔ ALEX: *"try to find a benchmark image showing how the Ox Alpha is better."*
   THERE IS NO REAL ONE TO FIND — checked live: the OpenRouter listing publishes
   no scores at all ("no intelligence index, no coding leaderboard number"), so
   every figure in circulation is community-reported and a sourced "leaderboard
   screenshot" would have to be fabricated.
   ⭐ So the scene draws a real CHART in the recognisable form — title, gridlines,
   an axis, named rows each carrying that model's REAL mark — with the real
   numbers and the provenance printed on it. It reads as a benchmark at a glance
   and every number on it is defensible.

   Beats cut to MEASURED onsets: f5 "beats" · f13-22 "Claude Fable" · f43
   "GPT-5.6" · f90 "benchmarks".
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("pull");
  /* ⭐ ROWS ARRIVE IN THE ORDER THEY ARE SPOKEN, not in chart order: "beats
     CLAUDE FABLE 5 (f13) and GPT-5.6 (f43)" — then ox-alpha's bar sweeps past
     both of them on "benchmarks" (f60-94). Three discrete arrivals spread
     across the full 110 frames, instead of one board sitting there complete. */
  const win = E(f, 92, 104, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.50} glow={hexa(p.key, 0.15)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="plant"
        rake={0.158} rakeX={RAKE_X0[v]} rakeRate={5.52 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 168, r: 260 }} grit={0.6} />
      <SceneWipe f={f} dir={1} c="#2E5A4A" z={88} dur={9} n={3} />
      <RunBand y={150} f={f} z={22} rate={6.2} h={14} c="#2E5A4A"
        loads={["#4E9E86", "#1C3A30", "#6FD0A4", "#1C3A30"]} pitch={150}
        loadW={80} loadH={58} />

      <BenchChart x={506} y={700} w={868} f={f} z={44}
        title={R.bench.name} note={R.bench.note}
        rows={[
          { who: "ox-alpha", n: 80, c: GOLD, at: 60 + LAY[v].beat },
          { who: "Claude Fable 5", n: 65, c: CLAY, logo: "claude.svg", at: Math.max(4, 13 + LAY[v].beat) },
          { who: "GPT-5.6", n: 52, c: GREEN, logo: "openai.png", at: 43 + LAY[v].beat },
        ]} />

      {/* the winner's row gets a struck plate the moment "benchmarks" lands */}
      {win > 0.02 && (
        <div style={{ position: "absolute", left: 316, top: 236, width: 268, height: 60, zIndex: 74,
          borderRadius: 6, background: GOLD, border: `4px solid ${dkh(GOLD, 0.48)}`,
          transform: `scale(${win}) rotate(-5deg)`, transformOrigin: "50% 50%",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(27, 900), color: "#2A1D06" }}>+15 ON THE NEXT</span>
        </div>
      )}

      <Hero f={f} x={132} y={GY + 60} size={224} z={56} act={2} ph={0.2}
        cheer={win} lift={win * 22} costume={{ constr: 1 }} />
      <Contact x={132} y={GY + 60} w={122} z={19} o={0.42} />
      <Chip t="ONE TEST. REAL NUMBERS." y={150} c={INK} fg="#F6F2E8" s={0.90} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE BAY, RE-LIT — 9.66 to 11.73s (62f) · TURN
   VO: "But here's the part that's even crazier."
   EVENT: he hauls a floor hatch open and light erupts upward out of it.
   ⛔ A RETURNING SET IS A CALLBACK ONLY IF THE LIGHT CHANGED — the bay comes
   back warm, from a different angle, with the key coming from the FLOOR.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bayhot");
  const open = E(f, 8, 26, 0, 1, OUT);
  /* the haul is an ARC, not a sway: sink, compress, then overshoot standing height */
  const sink = E(f, 3, 14, 0, 1, IO) - E(f, 16, 27, 0, 1, OUT);
  const overshoot = f > 24 ? Math.sin((f - 24) / 4.2) * Math.exp(-(f - 24) / 10) * 22 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.18]} vig={0.62} glow={hexa(p.key, 0.16)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={2} kind="bay"
        rake={0.144} rakeX={RAKE_X0[v]} rakeRate={4.85 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 300, y: 190, r: 210 }} grit={0.5} />
      <SceneWipe f={f} dir={-1} c="#6E5A38" z={88} dur={9} n={3} />

      {/* the socket wall in the back, now powered */}
      {[0, 1, 2, 3, 4].map(i => (
        <Socket key={"s3k" + i} x={168 + i * 176} y={470} s={0.72} z={24} f={f}
          filled={i !== 2} lit={0.5} c={dkh(STEEL, 0.22)} />
      ))}

      {/* what hangs overhead — ⛔ §12: bottom-heavy is fixed by the HORIZON and
          the overhead mass, never by more props on the floor. */}
      <div style={{ position: "absolute", left: 0, top: 128, width: W, height: 26, zIndex: 23,
        background: dkh("#6E5A38", 0.52) }} />
      {[120, 300, 480, 660, 840].map((hx, i) => (
        <div key={"hk" + i} style={{ position: "absolute", left: hx, top: 154, width: 14,
          height: 62 + (i % 2) * 26, zIndex: 23, background: dkh("#6E5A38", 0.44),
          transform: `rotate(${Math.sin(f / 41 + i) * 1.6}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      {/* ⛔ A RACK THAT HANGS STILL IS FURNITURE. It runs — the overhead mass
          that fixes the bottom-heavy composition AND the scene's biggest mover. */}
      <RunBand y={180} f={f} z={24} rate={4.6} h={14} c="#6E5A38"
        loads={["#8A7048", "#2A241E", "#A88A5E", "#2A241E"]} pitch={158}
        hang loadW={92} loadH={66} />

      <Hatch x={556} y={GY + 8} open={open} s={2.6} z={40} f={f} />

      {/* the eruption: a hard bottom-up key, and his shadow thrown UP the wall */}
      {open > 0.1 && (<>
        <div style={{ position: "absolute", left: 556 - 300 * open, top: GY - 640 * open,
          width: 600 * open, height: 660 * open, zIndex: 30,
          clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
          background: `linear-gradient(0deg, ${hexa(GOLD, 0.62 * open)} 0%, ${hexa(GOLD, 0.10)} 70%, transparent 100%)` }} />
        <Pool x={556} y={GY + 6} w={700 * open} c={GOLD} o={0.46 * open} z={29} />
        {/* the shadow, 3x his height, cast up the back wall */}
        <div style={{ position: "absolute", left: 196, top: GY - 660, width: 240, height: 660,
          zIndex: 26, opacity: 0.40 * open, background: hexa("#1A1206", 0.84),
          transform: `skewX(${-13 * open}deg)`, transformOrigin: "50% 100%" }} />
        <Motes x={556} y={GY - 320} w={520} h={460} n={26} f={f} />
        {/* ⭐ ALEX: *"when the box opens at 10 seconds, there should be a star or
            something coming out of the box."* One big struck star rides the
            light column out of the hatch and hangs, with five smaller ones
            thrown wide behind it. */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
          /* two waves — the second starts as the first is settling, so the last
             third of the scene is not the hero standing in a lit hole */
          const at = i < 6 ? 10 + i * 3 : 34 + (i - 6) * 6;
          const lf = f - at;
          if (lf < 0) return null;
          const rise = E(lf, 0, 30 + i * 3, 0, 1, OUT);
          const big = i === 0;
          const late = i >= 6;
          const ang = -70 + i * 28;
          return (
            <Star key={"st" + i} x={556 + Math.cos((ang * Math.PI) / 180) * rise * (big ? 0 : 250)}
              y={GY - 40 - rise * (big ? 330 : 190 + i * 26)}
              s={big ? 1.25 : (late ? 0.58 : 0.42) + (i % 3) * 0.08} z={68}
              spin={lf * (big ? 3.2 : 7)}
              c={big ? GOLD : "#F2C25E"} o={big ? 1 : 1 - rise * 0.45} />
          );
        })}
      </>)}

      <Hero f={f} x={278} y={GY} size={268} z={56} act={1} ph={0.7}
        strain={sink * 0.9} drive={-sink * 0.30} reach={96}
        lift={overshoot} shock={E(f, 32, 44, 0, 0.8, OUT)} costume={{ constr: 1 }} />
      <Contact x={278} y={GY} w={158} z={19} o={0.46} />
      <Steam x={378} y={GY - 202} f={f} at={10} n={4} />

      <WeekClock x={902} y={230} r={70} z={50} f={f} lit={1} left={1} hand={f / 620 + 0.32} />
      <Chip t="AND THEN THE FLOOR OPENS" y={150} c={INK} fg="#F6F2E8" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE HOPPER — 11.73 to 14.08s (70f) · ESCALATE
   VO: "It has a free daily capacity of a hundred trillion tokens"
   EVENT: the chute opens and does not stop; the pile grows past his head and
   past the top of the frame, and he is BURIED by it.
   ⭐ §12's measured shape: a hero LOADED AND CRUSHED (his body changes shape)
   measured 8.94 -> 14.09 against the same set with him standing in it.
   ⛔ The 100T figure is drawn as a PROVIDER CLAIM, because that is what it is.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hopper");
  /* the pile grows in SIX discrete jumps, not one ramp — §1: N discrete pops
     beat one long tween (4.27 -> 5.63), and a pile settling is a real event */
  const grow = Math.min(1, Math.floor(E(f, 8, 62, 0, 6.99, LIN)) / 6 + E(f, 8, 62, 0, 0.14, LIN));
  const buried = E(f, 24, 62, 0, 1, LIN);
  /* the counter ROLLS to its value — never typeset at it */
  const roll = Math.floor(E(f, 6, 58, 0, 1, IO) * 1e14);
  const rollTxt = roll.toLocaleString("en-US");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.19]} vig={0.60} glow={hexa(p.key, 0.18)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="none" bands={2} kind="plant"
        rake={0.132} rakeX={RAKE_X0[v]} rakeRate={5.76 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 640, r: 300 }} grit={0.8} />
      <SceneWipe f={f} dir={1} c="#6E4E14" z={88} dur={9} n={3} />

      <HopperChute x={506} y={0} f={f} at={4} z={44} s={1} rate={2.9} />
      {/* the sorter belt taking them away — the pile is not a closed system */}
      <RunBand y={308} f={f} z={26} rate={7.0} h={15} c="#6E4E14"
        loads={[GOLD, "#3E2C0C", dkh(GOLD, 0.22), "#3E2C0C"]} pitch={118}
        loadW={76} loadH={54} />

      {/* THE PLATE — the claim, labelled as a claim */}
      <div style={{ position: "absolute", left: 246, top: 232, width: 520, height: 92, zIndex: 70,
        borderRadius: 6, background: "#140E04", border: `4px solid ${dkh(GOLD, 0.40)}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(30, 900), color: GOLD }}>{rollTxt}</span>
        <span style={{ ...mono(14, 700), color: hexa(GOLD, 0.62) }}>
          {R.capacity.unit} · {R.capacity.qualifier}</span>
      </div>

      {/* the pile growing past his head then past the frame */}
      <CoinPile x={506} y={GY + 40} k={grow} f={f} z={52} />

      {/* the hero, crushed: sinks, compresses, spreads — and at the end only a hand */}
      <Hero f={f} x={330} y={GY + 26} size={252} z={54} act={1} ph={0.9}
        strain={buried * 0.92} lift={-buried * 74}
        shock={buried * 0.8} costume={{ constr: 1 }} />
      {buried > 0.72 && (
        <div style={{ position: "absolute", left: 300, top: GY - 250, width: 44, height: 90,
          zIndex: 66, borderRadius: 20, background: "#C4674A",
          transform: `rotate(${Math.sin(f / 3.4) * 22}deg)`, transformOrigin: "50% 100%" }} />
      )}
      <Contact x={330} y={GY + 26} w={144} z={19} o={0.40} />

      <Chip t="PER DAY. FOR NOTHING." y={150} c={INK} fg={GOLD} s={0.90} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE DECK — 14.08 to 16.95s (86f) · ESCALATE
   VO: "and even offers a one million token context window,"
   EVENT: the core feeds a measuring bed; a full-width band of coins runs the
   whole panel and a rule extends with it, stamping the EXACT figure.
   ⭐ The ORDINARY STUB stays in frame the whole time, so the comparison is
   PROVED by two objects at the same scale rather than asserted by a label.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("deck");
  /* ⛔ THIRD CONCEPT FOR THIS BEAT. Rejected: a deck of coins with a rule under
     it (*"too basic, just a line"*), then a stack of paper through a shutter
     (*"way too boring just papers"*). Both were about pushing something THROUGH
     an opening, and both came out as one prop repeated.
     ⭐ A context window is not a door — it is HOW MUCH IT CAN SEE AT ONCE. So the
     codebase is a floor of 120 lit blocks and the comparison is two LIGHTS: a
     hand torch that finds one column, against a flood that takes the whole floor
     in one sweep. The wave of blocks coming up IS the motion, and the objects do
     the arithmetic instead of a label claiming it. */
  const flood = E(f, 5, 11, 0, 1, OUT);
  const sweep = E(f, 7, 50, 0, 1, IO);
  const stamp = E(f, 50, 60, 0, 1, BACK);
  const kick = f >= 7 ? Math.sin((f - 7) / 2.8) * Math.exp(-(f - 7) / 9) * 8 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.56} glow={hexa(p.key, 0.15)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="shutter"
        rake={0.120} rakeX={RAKE_X0[v]} rakeRate={6.48 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 560, y: 190, r: 240 }} grit={0.4} />
      <SceneWipe f={f} dir={-1} c="#463A5E" z={88} dur={9} n={3} />

      {/* the two lights, and they are the whole sentence */}
      <Lamp x={158} y={300} spread={150} reach={330} z={44} c="#CFE0F2" on={0.9} body={0.62} />
      <Lamp x={196 + sweep * 700} y={216} spread={620} reach={470} z={45}
        c="#FFE6A8" on={flood} body={1.25} />

      {/* THE FLOOR — 120 blocks of a real project, coming up in a wave */}
      <div style={{ position: "absolute", inset: 0, zIndex: 40,
        transform: `translateY(${kick}px)` }}>
        <CodeFloor x={62} y={404} w={888} h={296} f={f} z={40} sweep={sweep} torchAt={0.10} />
      </div>

      {/* the figure it is all measured against */}
      <Hero f={f} x={856} y={726} size={204} z={62} act={3} ph={0.5}
        shock={E(f, 9, 19, 0, 0.9, OUT)} cheer={E(f, 52, 64, 0, 1, OUT)}
        costume={{ constr: 1 }} />
      <Contact x={856} y={726} w={104} z={19} o={0.40} />

      {/* the figure lands only once the whole floor is lit */}
      {stamp > 0.02 && (
        <div style={{ position: "absolute", left: 286, top: 250, width: 440, height: 84, zIndex: 74,
          borderRadius: 8, background: PAPER, border: `5px solid ${dkh(VIOLET, 0.34)}`,
          transform: `scale(${stamp}) rotate(-3deg)`, transformOrigin: "50% 50%",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(46, 900), color: "#2A1E3A" }}>{R.context.tokens}</span>
        </div>
      )}
      <Ring x={506} y={292} f={f} at={50} c={GOLD} />
      <Chip t="IT SEES ALL OF IT AT ONCE" y={150} c={INK} fg="#F6F2E8" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE YARD — 16.95 to 19.76s (85f) · PAYOFF (peak, intensity 10)
   VO: "meaning you can use it to build anything you want completely free."
   EVENT: the doors open and a crew arrives and STARTS PRODUCING. Five Claudes
   land across the FULL duration (f4/f22/f40/f58/f74) and each one immediately
   outputs a finished object onto a belt running the full width.
   ⛔ §10: the missing half of a scene like this is always the OUTPUT.
   CROWD ARITHMETIC: 5 at s=132 across 940px = 157px pitch >= 0.85*132 = 112. ✅
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("yard");
  /* ⛔ ALEX: *"animation at 17 and 20 seconds needs to be redone to be
     hierarchical animation and interesting."* v2 was five equal Claudes at five
     equal benches — a ROW of equals, which is the opposite of a rank.
     ⭐ Now: the OX hauls a colossal loaded wagon the full width of the panel,
     and the crew are small figures walking it in. One dominant mass, everything
     else subordinate to it, and it is the same character the reel introduced. */
  const haul = E(f, 4, dur - 6, 0, 1, IO);
  const rigX = -200 + haul * 380 + LAY[v].haul;
  const CREW = [10, 26, 42];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.44} glow={hexa(p.key, 0.18)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="bay"
        rake={0.140} rakeX={RAKE_X0[v]} rakeRate={4.80 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 150, r: 300 }} grit={0.6} />
      <SceneWipe f={f} dir={1} c="#8A6A44" z={88} dur={9} n={3} />
      <MarkCast x={150} y={280} s={168} z={25} o={0.40} f={f} />

      {/* the yard doors, thrown open, cropped by the frame edge */}
      {[-1, 1].map(sgn => (
        <div key={"yd" + sgn} style={{ position: "absolute", zIndex: 22,
          left: sgn < 0 ? -70 : 838, top: 176, width: 300, height: 420,
          background: `linear-gradient(180deg, #6E5636 0%, #3A2C1C 100%)`,
          border: "6px solid #2A2014" }}>
          {[0, 1, 2].map(i => (
            <div key={"yp" + i} style={{ position: "absolute", left: 16, top: 20 + i * 132,
              right: 16, height: 108, background: hexa("#000000", 0.24), borderRadius: 4 }} />
          ))}
        </div>
      ))}

      {/* ⭐ THE LOAD — a colossal stack of finished work on a low wagon, and it
          is the biggest thing in the reel outside the hook's meter */}
      <div style={{ position: "absolute", inset: 0, zIndex: 46,
        transform: `translateX(${rigX}px)` }}>
        {/* the wagon bed and its wheels */}
        <div style={{ position: "absolute", left: -40, top: 620, width: 470, height: 30,
          borderRadius: 5, background: `linear-gradient(180deg, #6E6258 0%, #2E2A24 100%)`,
          border: "5px solid #1A1712" }} />
        {[10, 170, 330].map((wx, i) => (
          <div key={"wh" + i} style={{ position: "absolute", left: wx, top: 640, width: 62,
            height: 62, borderRadius: "50%", background: "#1A1712", border: "6px solid #4E463C",
            transform: `rotate(${rigX * 1.6}deg)` }}>
            <div style={{ position: "absolute", left: "44%", top: 4, width: 5, height: "92%",
              background: "#4E463C" }} />
          </div>
        ))}
        {/* the load itself — real crates, stacked into a mass */}
        {Array.from({ length: 11 }, (_, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const cc = [CLAY, GREEN, GOLD, TEAL, VIOLET][i % 5];
          return (
            /* ⭐ ALEX: *"those boxes need to be shaking and stuff."* Each crate
               jostles on its own phase, driven off the wheel rotation, and the
               whole stack settles heavier the further up it is — so the load
               reads as LOOSE on a dragged wagon rather than glued to it. */
            <Crate key={"lc" + i} x={-24 + col * 108 + row * 46 + Math.sin(rigX / 9 + i * 1.7) * (3 + row * 2.2)}
              y={512 - row * 96 + Math.abs(Math.sin(rigX / 11 + i * 2.3)) * (4 + row * 3.4)}
              w={104} h={96} c={cc} z={48 + row}
              rot={(i % 2 ? 1 : -1) * 1.6 + Math.sin(rigX / 8 + i * 1.3) * (1.6 + row * 1.4)}
              mark={i % 2 === 0} />
          );
        })}
        {/* the traces from the ox to the wagon — geometry that connects two
            things BOTH on screen, which is the only kind that cannot misread */}
        <div style={{ position: "absolute", left: 420, top: 600, width: 128, height: 9,
          borderRadius: 5, background: "#3A2E20", transform: "rotate(-7deg)" }} />
      </div>

      {/* ⭐ THE OX, pulling — dominant, and the same character as S1 */}
      <div style={{ position: "absolute", inset: 0, zIndex: 58,
        transform: `translateX(${rigX}px)` }}>
        <Ox x={664} y={706} s={0.98} z={58} f={f} charge={0.62} name={R.model.name} />
      </div>
      <Contact x={664 + rigX} y={706} w={400} z={26} o={0.48} />

      {/* the crew, SMALL, walking it in */}
      {CREW.map((at, i) => (
        <Crew key={"cw" + i} f={f} x={172 + i * 122 + rigX * 0.20} y={730} i={i * 3 + 1}
          size={152} z={54} at={at} loop={i % 4} />
      ))}

      <Chip t="AND IT COSTS NOTHING" y={150} c={INK} fg={GOLD} s={0.92} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE YARD, WIDE — 19.76 to 22.75s (89f) · PAYOFF-2
   VO: "Imagine apps, websites, games, videos, the options are unlimited."
   ⭐ CUT TO THE MEASURED WORD ONSETS (§10): apps f10 · websites f27 · games f34
   · videos f45. Each noun is a DIFFERENT object, large and travelling.
   ⛔ §17 warns that cutting a beat onto its word can EMPTY the scene around it —
   so after f45 the gates keep firing and the counter rolls past readable, which
   is what "unlimited" looks like without typesetting the word.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("yard");
  /* ⛔ ALEX: *"animation at 17 and 20 seconds needs to be redone to be
     hierarchical."* v2 put four equal gates in a row along the floor — a row of
     equals, and a row cannot rank.
     ⭐ Now the four spoken nouns arrive as four REAL windows on a receding
     diagonal, each smaller and further back than the last: apps huge in front,
     videos small at the horizon. One dominant object, three subordinate, then
     more than you can count filling the depth behind them. Cut to the MEASURED
     onsets: apps f8 · websites f26 · games f34 · videos f44. */
  /* ⛔⛔⛔ THE 20-SECOND DROPOFF WAS HERE, AND `pop()` WAS THE CAUSE.
     `pop(i) = E(lf, 0, 7, 0, 1, BACK)` is a 7-frame entrance that then returns
     **1 for ever**. The four windows are ~60% of the visible mass, the last one
     finished arriving at local f51, and the scene runs to f97 — so the biggest
     objects in the frame were FROZEN for 46 frames (1.53s). Measured on the
     render: inter-frame change fell from 13-16 in the scene before to 5-8 for
     2.7 seconds straight. That is [[feedback_scene_needs_an_arc]] exactly:
     "every scene ARRIVES then HOLDS, and audit averages hide it" — this scene
     still scored 9.78 while being dead for a third of the reel's worst stretch.

     ⭐ THE FIX IS NOT NEW OBJECTS, IT IS THE SUBJECT CONTINUING TO ACT
     ([[feedback_too_fast_is_a_part_count]]). The subject is "the list doesn't
     end", so the rank became a BELT: each output enters at the front, travels
     back along the same receding diagonal, shrinks, and leaves at the horizon
     while the next one enters behind it. The hierarchy is unchanged — one
     dominant object nearest, each one behind it smaller — but it is now a
     CONVEYOR rather than a display case, so the biggest mass in the frame is
     moving for every frame of the scene instead of the first 51.
     ⭐ And the four spoken nouns still land on their MEASURED onsets: the belt
     is keyed to f8 / f26 / f34 / f44 and only runs free after that. */
  const ONS = [8, 26, 34, 44, 57, 70, 83, 96];
  const belt = (() => {
    if (f < ONS[0]) return -1;
    for (let i = ONS.length - 1; i >= 0; i--) {
      if (f >= ONS[i]) {
        const nxt = ONS[i + 1] ?? ONS[i] + 13;
        return i + Math.min(1, (f - ONS[i]) / (nxt - ONS[i]));
      }
    }
    return 0;
  })();
  /* the diagonal, sampled from the rank v2 shipped: one step back is
     +222px, -84px and x0.795 scale */
  const px = (u: number) => 116 + u * 222;
  const py = (u: number) => 704 - u * 84;
  const ps = (u: number) => 1.24 * Math.pow(0.795, u);
  const KIND = [0, 1, 2, 3, 0, 1, 2, 3];
  const HOFF = [248, 214, 202, 206];
  const spam = f > 52 ? Math.floor((f - 52) / 3) : 0;
  const count = Math.floor(E(f, 8, dur - 4, 0, 1, IN_Q) * 9999);
  const letGo = E(f, 74, 86, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.18]} vig={0.46} glow={hexa(p.key, 0.16)}>
      <Hall p={p} f={f} dx={PAR_X[v] - 20} overhead="truss" bands={3} kind="bay"
        rake={0.136} rakeX={RAKE_X0[v] + 60} rakeRate={5.04 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 620, y: 150, r: 320 }} grit={0.6} />
      <SceneWipe f={f} dir={-1} c="#6E5636" z={88} dur={9} n={3} />

      {[0, 1, 2, 3, 4, 5].map(i => (
        <Crew key={"cu" + i} f={f} x={128 + i * 152} y={318} i={i * 2 + 3} size={158}
          z={52} at={4 + i * 7} loop={i % 4} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 318, width: W, height: 16, zIndex: 50,
        background: `linear-gradient(180deg, ${mxh("#6E5636", 0.22)} 0%, ${dkh("#6E5636", 0.54)} 100%)` }} />

      {/* the flood behind the rank — more of them than can be identified */}
      {Array.from({ length: Math.min(spam, 16) }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", zIndex: 40,
          left: 330 + rnd(i, 41) * 600 + Math.sin((f + i * 7) / 13) * 30,
          top: 250 + rnd(i, 42) * 200 - ((f - 52 - i * 3) * 5) % 240,
          width: 72, height: 56, borderRadius: 5,
          background: [CLAY, TEAL, GREEN, VIOLET, GOLD][i % 5],
          border: `4px solid ${dkh([CLAY, TEAL, GREEN, VIOLET, GOLD][i % 5], 0.46)}`,
          transform: `rotate(${(f + i * 30) * 2}deg)` }} />
      ))}

      {/* ⭐ THE BELT — same rank, but it never stops feeding */}
      {KIND.map((k, i) => {
        const u = belt - i;
        if (u < -0.18 || u > 3.9) return null;
        const sc = ps(Math.max(0, u));
        const inS = Math.min(1, (u + 0.18) / 0.36);
        const outS = 1 - Math.max(0, (u - 3.3) / 0.6);
        const Comp = [AppWin, BrowserWin, GameView, VideoView][k];
        return (
          <div key={"ot" + i} style={{ position: "absolute",
            left: px(Math.max(0, u)), top: py(Math.max(0, u)) - HOFF[k] * sc,
            zIndex: 66 - Math.round(u * 2), opacity: Math.min(inS, outS),
            transform: `scale(${inS < 1 ? E(inS * 7, 0, 7, 0, 1, BACK) : 1})`,
            transformOrigin: "50% 100%" }}>
            <Comp x={0} y={0} s={sc} z={66} f={f} />
          </div>
        );
      })}
      {/* the aura rides with the thing it is wrapping */}
      {KIND.map((k, i) => {
        const u = belt - i;
        if (u < 0 || u > 2.4) return null;
        const sc = ps(u);
        return (
          <React.Fragment key={"aw" + i}>
            <Aura x={px(u) + 150 * sc} y={py(u) - 104 * sc}
              w={330 * sc} h={252 * sc} f={f} at={ONS[i] + 3} z={62 - Math.round(u * 2)}
              c={[CLAY, TEAL, GREEN, VIOLET][k]} />
            <Ring x={px(u) + 150 * sc} y={py(u) - 104 * sc} f={f} at={ONS[i]} c={p.key} />
          </React.Fragment>
        );
      })}

      {/* the counter rolling past readable — what "unlimited" looks like */}
      <div style={{ position: "absolute", left: 700, top: 236, width: 244, height: 62, zIndex: 74,
        borderRadius: 5, background: "#241A0C", border: `4px solid ${dkh(GOLD, 0.40)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        filter: f > 62 ? `blur(${Math.min(3.4, (f - 62) / 9)}px)` : undefined }}>
        <span style={{ ...mono(36, 900), color: GOLD }}>{count}</span>
      </div>

      <Hero f={f} x={912} y={726} size={192} z={68} act={3} ph={0.3}
        shock={letGo * 0.9} cheer={letGo} costume={{ constr: 1 }} />
      <Contact x={912} y={726} w={94} z={19} o={0.40} />
      <Chip t="THE OPTIONS DO NOT RUN OUT" y={150} c={INK} fg="#F6F2E8" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE ROW — 22.75 to 25.21s (74f) · PROOF
   VO: "And you can run it in any coding software."
   EVENT: he carries the core down the row and seats it in all three, on the
   beat. Three identical fits IS the sentence "any".
   ⭐ A REWARD BEAT HAS TO RESOLVE (§18): each seat pulses INSIDE THE SOCKET
   ONLY (never a screen flash, §16) and a tick arcs into a running 3-of-3 tally,
   each chime one step up the run.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("row");
  /* ⛔ ALEX: *"animation at 23 seconds should just be clear what those softwares
     are with the big logos for each."* The three surfaces are now the ones a
     viewer actually uses, each with its REAL mark at 132px on a white tile. */
  const BAYS = [
    { x: 196 + LAY[v].editors, name: "CLAUDE CODE", c: CLAY, logo: "claude.svg" },
    { x: 506 + LAY[v].editors, name: "CURSOR", c: TEAL, logo: "cursor.svg" },
    { x: 816 + LAY[v].editors, name: "WINDSURF", c: GREEN, logo: "windsurf.svg" },
  ];
  /* re-timed: the scene is 57f after the VO tighten, and the beats move per cut */
  const AT = [6, 22, 38].map(a => Math.max(2, a + LAY[v].beat));
  const seatK = (i: number) => E(f, AT[i], AT[i] + 6, 0, 1, OUT);
  const done = AT.filter(a => f > a + 6).length;
  /* the core travels between the three bays — a carried load, overlapping */
  const leg = (i: number) => E(f, AT[i] - 12, AT[i], 0, 1, IO);
  const coreX = 196 + LAY[v].editors + leg(1) * 310 + leg(2) * 310;
  const hop = (E(f, 0, 90, 0, 1, LIN), AT.reduce((acc, a) =>
    acc + (E(f, a - 12, a - 4, 0, 1, OUT) - E(f, a - 4, a, 0, 1, IO)) * 70, 0));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.58} glow={hexa(p.key, 0.15)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="shutter"
        rake={0.152} rakeX={RAKE_X0[v]} rakeRate={5.28 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 176, r: 260 }} grit={0.5} />
      <SceneWipe f={f} dir={1} c="#2E5660" z={88} dur={9} n={3} />

      {/* the overhead sign gantry, RUNNING — the full-width high-contrast
          travelling band, and the thing that stops the row being three stills */}
      <div style={{ position: "absolute", left: 0, top: 214, width: W, height: 18, zIndex: 26,
        background: `linear-gradient(180deg, ${mxh(TEAL, 0.10)} 0%, ${dkh(TEAL, 0.60)} 100%)` }} />
      {Array.from({ length: 8 }, (_, i) => {
        const gx = ((i * 148 + f * 6.6) % (W + 296) + W + 296) % (W + 296) - 148;
        return (
          <div key={"sg" + i} style={{ position: "absolute", left: gx, top: 232, width: 108,
            height: 58, zIndex: 27, borderRadius: 4,
            background: i % 2 ? dkh(TEAL, 0.62) : mxh(TEAL, 0.16),
            border: `3px solid ${dkh(TEAL, 0.70)}` }} />
        );
      })}
      {BAYS.map((b, i) => (
        <SoftwareBay key={"sb" + i} x={b.x} y={718} s={0.92} z={40} f={f}
          name={b.name} c={b.c} logo={b.logo} on={seatK(i)} seat={seatK(i)} seatAt={AT[i]} />
      ))}

      {/* the core, carried down the row */}
      <ModelCore x={coreX} y={700 - hop} s={0.34} z={62} f={f} redacted price="$0"
        seated={done > 0 ? 1 : 0} rot={hop * 0.06} />

      {/* the ticks arcing into a running tally */}
      {AT.map((a, i) => f > a + 4 && (
        <Ring key={"rg" + i} x={BAYS[i].x} y={606} f={f} at={a} c={GOLD} />
      ))}
      <div style={{ position: "absolute", left: 432, top: 128, width: 148, height: 62, zIndex: 74,
        borderRadius: 6, background: "#0C1A1E", border: `4px solid ${dkh(GREEN, 0.40)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(31, 900), color: done === 3 ? GREEN : "#9FE8C4" }}>{done} / 3</span>
      </div>

      <Hero f={f} x={coreX - 130} y={730} size={186} z={66} act={0} ph={0.8}
        drive={0.35} reach={26} cheer={done === 3 ? 1 : 0} costume={{ constr: 1 }} />
      <Contact x={coreX - 130} y={730} w={90} z={19} o={0.40} />

      <Chip t="SAME CORE. ANY EDITOR." y={196} c={INK} fg="#F6F2E8" s={0.86} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE CLOCK — 25.21 to 28.66s (104f) · FUSE (the villain's scene)
   VO: "But here's the twist. It's only free during this one week preview period
        so you don't have much time left."
   SHOT A (f0-30): the clock, dark all reel, LIGHTS. His head snaps up.
   SHOT B (f30-104): hard cut to the clock filling the frame; the ribbon burns
   down to the real date and the ring empties one segment at a time.
   ⛔ §13: the ring STEPS while the hand sweeps SMOOTHLY and a shadow bar lags —
   overlapping action, so discrete pops do not read as choppy.
   ⛔ Villain integrity: it is never beaten. Segment chimes go DOWN a step each,
   the inverse of every other run in the reel.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("clockp");
  const B = 30;
  const shotB = f >= B;
  const lit = E(f, 6, 16, 0, 1, OUT);
  /* the ring empties in 7 discrete steps across shot B */
  const left = shotB ? 1 - Math.floor(E(f, B + 10, B + 62, 0, 6.99, LIN)) / 7 : 1;
  const hand = shotB ? E(f, B, B + 74, 0, 1.85, LIN) : f / 300;
  const burn = shotB ? E(f, B + 4, B + 34, 0, 1, IO) : 0;
  /* ⭐ §12: NAME WHAT THE CLAUDE DOES. He was covering 22px, which is a state
     change, not an action — and the punch had pushed him off the bottom of the
     frame entirely. He now RUNS 620px across the full panel, away from the
     clock, at 186px tall: a distance of 3.3x his own size (§11's bar is a
     third). That is the scene's real event; the clock is what he is losing to. */
  const run = shotB ? E(f, B + 2, dur - 4, 0, 1, IO) : 0;
  const heroX = shotB ? 840 - run * 620 : 306;
  return (
    <Scene p={p} slug="" push={shotB ? [B, dur, 1.05] : [0, B, 1.04]} vig={0.66}
      glow={hexa(p.key, 0.16)}>
      {/* ⛔ THE CROP BOUND INCLUDES `cam`. Shot B is push(1.05) x cam.s(1.044) x
          Cam(1.06) = 1.162, so 1012/1.162 = 871px visible and 70px is lost each
          side: the safe band is [70, 942]. The hero starts at 840 (+93 = 933),
          the clock spans 490-890. Both inside it. Shot A goes WIDE at 0.92 so
          the cut to B is a real 15% punch rather than a crop. */}
      <Cam s={shotB ? 1.06 : 0.92} y={shotB ? 30 : -10} z={2}>
        <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={2} kind="bay"
          rake={0.130} rakeX={RAKE_X0[v]} rakeRate={4.56 * RAKE_K[v]} rakeN={RAKE_N[v]}
          lamp={{ x: 690, y: 300, r: 260 }} grit={0.4} />
      <SceneWipe f={f} dir={-1} c="#7A2418" z={88} dur={9} n={3} />

        {/* ⭐ THE BAY GOES DARK LEFT TO RIGHT AS THE WEEK DRAINS — five sockets,
            each losing its mark on its own step. The set itself is the counter. */}
        {[0, 1, 2, 3, 4].map(i => (
          <Socket key={"s9k" + i} x={110 + i * 176} y={556} s={0.72} z={22} f={f}
            filled={i !== 2} lit={left > (i + 1) / 5 ? 0.46 : 0.04}
            mark={left > (i + 1) / 5 ? RED : "#2A100C"} c="#3A1A16" />
        ))}

        {/* ⭐ THE BAY EMPTYING OVERHEAD — the run keeps going but the loads thin
            out and the carriers come back bare. §1's full-width travelling band,
            doing the scene's own job rather than being added for the metric. */}
        <RunBand y={172} f={f} z={23} rate={Math.max(1.6, 6.4 - f * 0.05)} h={14}
          c="#7A2418" hang pitch={144} loadW={86} loadH={62}
          loads={left > 0.7 ? [CLAY, "#3A1A16", GOLD, "#3A1A16"]
               : left > 0.35 ? [dkh(CLAY, 0.40), "#2A1210", "#3A1A16", "#2A1210"]
               : ["#2A1210", "#241010", "#2A1210", "#241010"]} />

        {/* the yard's belt still running through the door, and slowing */}
        <div style={{ position: "absolute", left: 62, top: 402, width: 190, height: 200,
          zIndex: 24, background: "#1A0A08", border: "5px solid #2E1210" }} />
        <Belt x={76} y={520} w={162} f={f} z={26} rate={Math.max(0.4, 3.4 - f * 0.028)}
          c={dkh(SLATE, 0.30)} load={[{ k: 0.2, c: dkh(CLAY, 0.30) }]} />

        {/* ⭐ ALEX: *"at 25 seconds should be a big numbered timer counting down
            in the middle."* Seven-segment digits, drawn as real segments so each
            tick REPAINTS a bank rather than swapping a glyph — and it counts the
            one number that is actually true: the days of the free preview. */}
        <Countdown x={506} y={shotB ? 286 : 340} s={shotB ? 0.92 : 0.62} z={70}
          value={`0${Math.max(0, Math.ceil(left * 7))}`} c={lit > 0.5 ? "#FFC46A" : "#5A3A34"}
          unit="DAYS" label="OF FREE" foot={`FREE ENDS ${R.clock.ends}`}
          shake={shotB ? (1 - left) * 0.6 : 0} />
        {/* the analog face stays, smaller and to the side — it is the villain the
            reel has carried since frame 0, it just no longer owns the middle */}
        <WeekClock x={shotB ? 878 : 846} y={shotB ? 566 : 250} r={shotB ? 92 : 78} z={50} f={f}
          lit={lit} left={left} hand={hand} date={undefined} />

        {/* ⭐⭐ THE SWEEPING SECTOR. A hand is a 22px stick — it repaints almost
            nothing, which is why this scene measured 2.94 while LOOKING big. A
            400px sector turning with it repaints a quarter of the face every
            sample at a real luma delta, and it reads as the week going dark.
            ⛔ AND IT MUST SIT ABOVE THE CLOCK. The first version was authored at
            z=49 under a z=50 clock and was invisible in the render while the
            code looked right — §6.2, check the stacking context before the
            values. */}
        {shotB && (
          <div style={{ position: "absolute", left: 690 - 208, top: 330 - 208, width: 416,
            height: 416, zIndex: 52, borderRadius: "50%", pointerEvents: "none",
            background: `conic-gradient(from ${hand * 360 + 90}deg, ${hexa("#1A0E0A", 0.88)} 0deg, ${hexa("#1A0E0A", 0.52)} 96deg, ${hexa("#1A0E0A", 0)} 172deg, ${hexa("#1A0E0A", 0)} 360deg)` }} />
        )}

        {/* ash off the burning ribbon — 48px, over the 1012->240 downsample floor */}
        {shotB && burn > 0.05 && Array.from({ length: 16 }, (_, i) => (
          <div key={"ash" + i} style={{ position: "absolute", zIndex: 71,
            left: 110 + rnd(i, 61) * 800 + Math.sin((f + i * 9) / 11) * 40,
            top: 660 - ((f - 30 - i * 5) * 13) % 560,
            width: 50, height: 42, borderRadius: 5,
            background: i % 3 ? "#F2843A" : "#F2C25E",
            opacity: 0.86, transform: `rotate(${(f + i * 24) * 5}deg)` }} />
        ))}

        {/* HE RUNS — 620px of travel, leaning into it, still full size */}
        <Hero f={f} x={heroX} y={GY + 10} size={shotB ? 186 : 200} z={56} act={0} ph={0.6}
          drive={shotB ? -0.5 : 0} reach={34}
          shock={shotB ? 0.4 : E(f, 12, 22, 0, 0.95, OUT)} stern={0.6}
          costume={{ constr: 1 }} />
        <Contact x={heroX} y={GY + 10} w={shotB ? 132 : 142} z={19} o={0.38} />
      </Cam>
      <Chip t="AND THEN IT STOPS" y={150} c={RED} fg="#FFE8E0" s={0.94} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE FRONT — 28.66 to 30.28s (48f) · CTA
   VO: "Comment OX for the free setup."
   ⛔ HARD-CUT ON THE KEYWORD. "OX" is spoken at root f878 = scene-local f18,
   and the stencil lands on that frame — not before it, not after it.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("front");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.50} glow={hexa(p.key, 0.18)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={2} kind="bay"
        rake={0.146} rakeX={RAKE_X0[v]} rakeRate={5.04 * RAKE_K[v]} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 170, r: 280 }} grit={0.5} />
      <SceneWipe f={f} dir={1} c="#8A6A44" z={88} dur={9} n={3} />

      {/* the core, seated and running */}
      <Pool x={506} y={716} w={720} c={p.key} o={0.30} z={25} />

      <RunBand y={186} f={f} z={22} rate={5.6} h={14} c="#8A6A44"
        loads={[GOLD, "#463820", CLAY, "#463820"]} pitch={140} hang
        loadW={84} loadH={60} />
      <Bench x={506} y={GY + 30} w={700} s={1.20} z={30} c="#6E5636" />
      <MarkCast x={186} y={268} s={176} z={25} o={0.44} f={f} />

      {/* ⭐ THE OX CLOSES THE REEL. It opened the hook pulling the rig, took the
          bullpen at 3s and hauled the load at 17s — so the last frame belongs to
          it, standing over the keyword with its own name on its back. */}
      <Ox x={286} y={724} s={1.02} z={56} f={f} charge={0.24}
        name={R.model.name} />
      <Contact x={286} y={724} w={400} z={26} o={0.48} />
      <Hero f={f} x={640} y={730} size={182} z={62} act={2} ph={0.2}
        cheer={E(f, 6, 14, 0, 1, OUT)} drive={E(f, 2, 8, 0, 0.4, IO)} reach={50}
        costume={{ constr: 1 }} />
      <Contact x={640} y={730} w={88} z={19} o={0.42} />

      {/* THE KEYWORD, once, on its own measured onset */}
      <Stencil x={620} y={430} f={f} at={6} z={72} s={1.06} word={R.keyword} />
      <Ring x={620} y={350} f={f} at={10} c={GOLD} />
      <Puff x={620} y={434} f={f} at={10} c={hexa(GOLD, 0.50)} />
    </Scene>
  );
};
