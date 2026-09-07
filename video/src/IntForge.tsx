import React from "react";
import { useCurrentFrame } from "remotion";
import { E, OUT, IO, BACK, IN_Q, LIN, W, H, hexa, dkh, mxh, rnd, mono, ui, SH,
  Scene, Cam, Mark, MarkCast, Hero, Crew, Contact, squash, GY,
  CLAY, GOLD, DIFFG, DIFFR, INK, TEAL, PAGE, RAIL, RAILHI, VIOLET, FileSlab, R } from "./IntWorld";
import { ShopWall, BayLamp, LightColumn } from "./RpsSets";
import { PLACES as RPS_PLACES } from "./RpsWorld";
import { Link, HangChain, Hammer, Sparks, Work, IRONC } from "./IntShop";
import { CodeLines, Gauge, PipRow, TickDisc, Flurry, Shards, Cracks } from "./AdhProps";
import { Bay, BAYS, HitPlate } from "./IntBays";
import { Alcove, RollerDoor, Folder } from "./JudgeProps";
import { Toolbox, Drum, Bench } from "./RpsSets";

/* ===========================================================================
   REEL 140 · "INTENT" — THE BODY, IN THE FORGE.

   ⛔ The hook took nine rounds to land and the body was still standing in the
   world Alex threw out ("just rectangles and squares"). A reel cannot be half
   one world and half another (`feedback_fix_the_reel_not_the_scene`), so all
   fourteen body beats are rebuilt in the forge's own vocabulary: the anvil, the
   hammer, hot stock, sparks, the hanging chain, the weld.

   ⭐ THE SPINE IS THE CHAIN. The script is intent -> spec -> plan -> build+test
   and ends on "start the entire process again", so every artifact is a LINK,
   the reel forges them one at a time, and the last beat closes the chain into a
   turning ring that nobody is holding.

   ⛔ NO TEXT IN THE SET (`feedback_graphical_over_textual`) — the caption and
   the header pill carry the words.
   ⛔ ONE FOCUS PER SCENE, BIG (`feedback_hook_simplicity`), and the Claude mark
   TURNS wherever the finished artifact appears.
   ========================================================================= */

/* ⛔⛔⛔ EVERY SHIPPED SCENE IN THIS REPO PUSHES. ADHD 136 runs 1.05-1.09 and
   REPOS 137 runs 1.02-1.06 on EVERY scene; all eighteen of mine were 1.0, i.e.
   no camera move anywhere in the reel. A slow push repaints the WHOLE panel on
   every frame, which is why the house does it and why seven of my scenes came
   back STATIC while holding perfectly good events: the events were small and
   the thing that filled the frame never moved
   ([[feedback_a_small_moving_thing_on_a_big_still_thing_measures_still]]).
   The values below are NOT uniform — a constant push across fifteen scenes is
   its own kind of sameness — and the slowest go to the scenes that already
   carry the most motion. */
type SP = { v?: unknown; dur: number; at?: number };
const HOT = "#F0842E";
const P = RPS_PLACES;

/** the shop shell every beat opens with — one lamp, one light column, the stock
    hanging off the gantry. `warm` swaps the room's key so neighbouring scenes
    differ by hue AND lightness rather than being one room fourteen times. */
const Shop: React.FC<{ f: number; lit?: number; seed?: number; chains?: number;
  key_?: string; lampX?: number; dim?: number }> =
  ({ f, lit = 1, seed = 4, chains = 6, key_ = "#FFD98A", lampX = W / 2, dim = 0 }) => (<>
    <ShopWall p={P.floor} f={f} seed={seed} z={10} door={false} pegX={930} pegW={240} lift={0.55} />
    <div style={{ position: "absolute", left: -40, top: 118, width: W + 80, height: 22, zIndex: 15,
      background: `linear-gradient(180deg, #A9A196, ${dkh(IRONC, 0.34)})`,
      borderBottom: `5px solid ${dkh(IRONC, 0.5)}` }} />
    {Array.from({ length: chains }, (_, i) => (
      <HangChain key={"c" + i} f={f} x={62 + i * ((W - 124) / Math.max(1, chains - 1))}
        top={138} n={4 + (i % 3)} r={34 + (i % 3) * 8}
        rate={0.020 + (i % 4) * 0.005} z={14} o={0.5 + (i % 3) * 0.14} />
    ))}
    <LightColumn x={lampX} on={lit} w={600} c={key_} z={22} top={60} />
    <BayLamp x={lampX} y={84} c={key_} on={lit} f={f} z={40} />
    {dim > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 80,
      background: hexa("#05070A", dim) }} />}
  </>);

/** ⭐ THE BACKGROUND FORGE — a second smith at a far anvil, hammering on his own
    clock for the whole reel. `docs/ANIMATION-QUALITY` §5: "every shot needs a
    background process… it costs the hierarchy nothing because it is furniture,
    and it is the difference between a shot and a still." Seven of my fourteen
    body beats came back STATIC because each fired one event and then sat; this
    is the honest fix, because a forge is never idle. */
export const BgForge: React.FC<{ f: number; x: number; y?: number; s?: number;
  ph?: number; z?: number; beat?: number }> =
  ({ f, x, y = 640, s = 0.55, ph = 0, z = 34, beat = 17 }) => {
  const t = ((f + ph) % beat) / beat;
  const ang = t < 0.6 ? -14 - E(t, 0, 0.6, 0, 96, OUT)
    : t < 0.76 ? -110 + E(t, 0.6, 0.76, 0, 120, IO) : 8;
  const struck = t >= 0.74 && t < 0.82;
  return (<>
    <Anvil x={x} y={y} s={s * 0.72} z={z} />
    <Work stage={Math.floor((f + ph) / beat) % 5} x={x} y={y - 118 * s} r={104 * s}
      heat={0.72} sq={struck ? 0.82 : 1} z={z + 2} />
    <Crew f={f} x={x - 168 * s} y={y + 40 * s} i={7} size={230 * s} z={z + 4} at={-16} />
    <div style={{ position: "absolute", left: x - 150 * s, top: y - 250 * s,
      width: 120 * s, height: 44 * s, zIndex: z + 6, borderRadius: 7,
      transform: `rotate(${ang + 90}deg)`, transformOrigin: "50% 0%",
      background: `linear-gradient(180deg, #C9C2B6, #6B655C)`,
      border: `${Math.max(3, 5 * s)}px solid #38332C` }} />
    {struck && <Sparks f={f} at={f} x={x} y={y - 150 * s} n={22} z={z + 8}
      floorY={y + 30} power={0.65} />}
  </>);
};

/** ⭐⭐ THE NEAR BAND. Two levers in one component.
    MOTION: `docs/ANIMATION-QUALITY` §5 — sprites need an ACTION LOOP, not an
    idle, and a band of them repaints real area every frame, which a single
    hero landing once cannot. My scenes carried one to three onlookers standing
    still; the shipped reels run six to nine on staggered loops.
    DENSITY: `feedback_the_crowd_is_a_near_band` — the crowd IS the near band,
    and it is most of the difference between 8-9 distinct things on screen and
    the 17-23 the approved reels hold.
    ⛔ They ARRIVE on staggered frames rather than being present at frame 0:
    `feedback_hold_needs_arrivals_not_travel`. */
const Band: React.FC<{ f: number; n?: number; y?: number; size?: number; z?: number;
  seed?: number; from?: number; every?: number; cheer?: number; x0?: number; x1?: number }> =
  ({ f, n = 7, y = GY + 26, size = 126, z = 56, seed = 0, from = 4, every = 6,
     cheer = 0, x0 = 96, x1 = W - 96 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const pitch = (x1 - x0) / Math.max(1, n - 1);
    const at = from + i * every;
    const near = i % 3 === 0;
    return <Crew key={"bd" + i} f={f} i={i + seed * 5} at={at}
      x={x0 + i * pitch + ((i * 7 + seed) % 5) * 6}
      y={y + (i % 2) * 16 + (near ? 12 : 0)}
      size={size * (near ? 1.12 : 0.9)} z={z + (near ? 4 : 0)}
      loop={(i + seed) % 5} flip={i > n / 2}
      tint={(i + seed) % 4 === 0 ? CLAY : (i + seed) % 4 === 2 ? TEAL : undefined}
      cheer={cheer} />;
  })}</>
);

/** the anvil, drawn once */
const Anvil: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 52 }) => (
  <svg style={{ position: "absolute", left: x - 235 * s, top: y - 96 * s, zIndex: z }}
    width={470 * s} height={274 * s} viewBox="0 0 360 210">
    <path d="M40 30 L250 30 C 300 30 342 44 356 58 C 330 62 306 70 292 82 L250 82 L250 96
             C 250 118 214 122 202 140 L214 178 L96 178 L110 140 C 98 122 62 118 62 96 L62 82
             L40 82 Z" fill="#4A453E" stroke="#26221D" strokeWidth="6" strokeLinejoin="round" />
    <path d="M44 34 L246 34" stroke={hexa("#A9A196", 0.5)} strokeWidth="7" strokeLinecap="round" />
    <rect x="76" y="178" width="158" height="26" rx="7" fill="#2E2A25" />
  </svg>
);

/* ---------------------------------------------------------------------------
   S1 · THE SHOP FILLS.  "even the creator of Claude Code said this will change
   vibe coding forever."  ⛔ NO name, NO quote, NO face — the room turning to
   look is the whole beat, and the frame asserts nothing it cannot source.
   ------------------------------------------------------------------------ */
export const F_TURNS: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const N = 10;
  return (
    <Scene p={P.floor} slug="" push={[0, dur, 1.0]} vig={0.30}>
      <Cam x={Math.sin(f / 30) * 4} s={1} z={12}>
        <Shop f={f} lit={1} seed={5} chains={7} lampX={W / 2 + 60} />
        <Anvil x={W / 2 + 60} y={664} s={1} />
        <Link x={W / 2 + 60} y={520} r={168} rot={0} heat={0} z={62} />
        <MarkCast x={W / 2 + 60} y={520} s={140} z={66} f={f} spin={2.2} pulse={0.6} />
        {/* they come IN and CLUSTER — the population grows, nobody leaves */}
        {Array.from({ length: N }, (_, i) => {
          const left = i % 2 === 0, slot = Math.floor(i / 2);
          const t0 = 2 + i * 5;
          const k = E(f, t0, t0 + 12, 0, 1, OUT);
          const dest = left ? 120 + slot * 74 : W - 120 - slot * 74;
          const from = left ? -140 : W + 140;
          return <Crew key={i} f={f} x={from + (dest - from) * k} y={GY + 22 + (slot % 2) * 12}
            i={i} size={132} z={68 + (i % 3)} at={t0} flip={!left}
            tint={i % 4 === 0 ? CLAY : i % 4 === 2 ? TEAL : undefined} />;
        })}
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S2 · THE WRONG WORK.  "the biggest problem isn't getting it to write code,
   it's getting it to understand what you're trying to build."
   ⭐ He hammers FAST and well, and what comes off the anvil is a pile of parts
   that do not go together. Then a gauge drops and nothing fits.
   ------------------------------------------------------------------------ */
export const F_BLIND: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const AX = 660, AY = 664;
  const BEAT = 13;
  const done = Math.floor(f / BEAT);
  const since = f % BEAT;
  const struck = since < 3;
  const GAUGE = 128, SWEEP = 150;
  return (
    <Scene p={P.cockpit} slug="" push={[0, dur, 1.0]} vig={0.40}>
      <Cam x={Math.sin(f / 26) * 5 + (struck ? Math.sin(f * 9) * 6 : 0)} y={struck ? 5 : 0} s={1} z={12}>
        <Shop f={f} lit={0.9} seed={7} chains={6} key_="#FFC978" lampX={AX} />
        <Anvil x={AX} y={AY} s={0.9} />
        {/* ⭐ the parts pile up — every blow throws off a DIFFERENT shape, and
            none of them is the same as the last (`cluttered is a repeat count`) */}
        {Array.from({ length: 9 }, (_, i) => {
          const t0 = 6 + i * BEAT;
          if (f < t0) return null;
          const k = E(f, t0, t0 + 12, 0, 1, OUT);
          const x = AX - 300 + (i % 5) * 132, y = GY - 40 - Math.floor(i / 5) * 74;
          const kinds = ["rod", "hook", "plate", "cog", "wedge"];
          const kd = kinds[i % 5];
          return (
            <div key={"pt" + i} style={{ position: "absolute", left: x - 44,
              top: y - 44 - (1 - k) * 90, width: 88, height: 88, zIndex: 60 + i,
              opacity: k, transform: `rotate(${(i % 2 ? 1 : -1) * (18 + i * 7)}deg)` }}>
              <svg width={88} height={88} viewBox="0 0 88 88">
                {kd === "rod" && <rect x="6" y="36" width="76" height="16" rx="8" fill="#7A736A" stroke="#3E3830" strokeWidth="4" />}
                {kd === "hook" && <path d="M44 8 C44 34 18 34 18 54 C18 70 40 76 52 68" fill="none" stroke="#7A736A" strokeWidth="13" strokeLinecap="round" />}
                {kd === "plate" && <rect x="14" y="20" width="60" height="48" rx="6" fill="#6E6A63" stroke="#3E3830" strokeWidth="4" />}
                {kd === "cog" && (<><circle cx="44" cy="44" r="26" fill="#7A736A" stroke="#3E3830" strokeWidth="4" /><circle cx="44" cy="44" r="9" fill="#3E3830" /></>)}
                {kd === "wedge" && <path d="M12 70 L64 70 L44 16 Z" fill="#7A736A" stroke="#3E3830" strokeWidth="4" />}
              </svg>
            </div>
          );
        })}
        <Work stage={done % 4} x={AX} y={AY - 142} r={150} heat={0.85} sq={struck ? 0.78 : 1} z={62} />
        <Sparks f={f} at={f - since} x={AX} y={AY - 200} n={44} z={96} floorY={AY + 40} />
        <Hero f={f} x={280} y={GY + 26} size={392} z={70} costume={{ constr: 1 }}
          gaze={0.7} strain={struck ? 1 : 0.3} act={1} />
        <Hammer f={f} px={352} py={392} reach={286} z={92} />
        {/* the gauge that comes down and fits NOTHING */}
        {f >= GAUGE && (
          <div style={{ position: "absolute", left: AX - 250, zIndex: 94,
            top: E(f, GAUGE, GAUGE + 10, -200, AY - 300, OUT), width: 500, height: 20,
            borderRadius: 6, background: `repeating-linear-gradient(126deg, ${DIFFR} 0 22px, #2A1410 22px 44px)`,
            border: `3px solid ${dkh(DIFFR, 0.4)}` }} />
        )}
        {f >= SWEEP && Array.from({ length: 5 }, (_, i) => {
          const t0 = SWEEP + i * 7;
          const k = E(f, t0, t0 + 14, 0, 1, IN_Q);
          if (k <= 0) return null;
          return <div key={"x" + i} style={{ position: "absolute", left: AX - 300 + i * 132 - 26,
            top: GY - 66 + k * 260, width: 52, height: 52, zIndex: 92, opacity: 1 - k,
            transform: `rotate(${k * 220}deg)` }}>
            <svg width={52} height={52} viewBox="0 0 24 24">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke={DIFFR} strokeWidth={4.4} strokeLinecap="round" />
            </svg></div>;
        })}
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S3 · THE FIRST LINK.  "So the fix is a file called the intent.md."
   ONE object, lowered in, mark turning. The quietest frame so far.
   ------------------------------------------------------------------------ */
export const F_FIX: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const CX = W / 2, CY = 430, SEAT = 18;
  const y = E(f, 2, SEAT, -760, CY, OUT);       /* falls from off-frame, not just above */
  const seated = f >= SEAT;
  /* ⛔⛔ THE HERO WAS INVISIBLE IN THIS SCENE AND IN S7, and the repo had
     already written down why: "A transformed wrapper with NO zIndex VANISHES."
     A `transform` makes the div a stacking context, so the slab's own z-64 was
     resolved INSIDE a static, unpositioned parent and painted under the room's
     ground plane. The squash value was never the problem — the wrapper was. */
  const sq = seated ? squash(f - SEAT, 0, 0.16, 3, 12) : 1;
  return (
    <Scene p={P.paper} slug="" push={[0, dur, 1.09]} vig={0.30}>
      <Cam x={Math.sin(f / 24) * 3} y={seated ? Math.sin(f * 2.8) * 6 * Math.max(0, 1 - (f - SEAT) / 12) : 0} s={1} z={12}>
        <Bay p={BAYS.fix} f={f} shell="vault" seed={9} lit={seated ? 1 : 0.5} />
        <Alcove x={128} y={430} w={186} h={272} z={16} c="#7FE6EE" on={seated ? 0.8 : 0.3} t="PROBLEM" />
        <Alcove x={W - 128} y={430} w={186} h={272} z={16} c="#7FE6EE" on={seated ? 0.6 : 0.2} t="CONSTRAINTS" />
        <HitPlate x={CX} y={GY - 12} w={470} hit={seated && f < SEAT + 8 ? 1 : 0} z={30} />
        <PipRow lit={seated ? 1 : 0.2} y={72} z={70} d={13} f={f} at={SEAT} />
        {/* the sentence NAMES the object — so the object is what lands */}
        <MarkCast x={CX} y={y} s={470} z={54} f={f} spin={1.4} pulse={0.5} o={0.26} />
        <div style={{ position: "absolute", inset: 0, zIndex: 64,
          transform: `scaleY(${sq}) scaleX(${2 - sq})`, transformOrigin: "50% 100%" }}>
          <FileSlab x={CX} y={y} w={392} h={520} z={64} f={f} name={R.hero}
            fields={R.fields} fieldsIn={seated ? E(f, SEAT, SEAT + 30, 0, 1, OUT) : 0}
            glowK={seated ? 1 : 0.2} />
        </div>
        {seated && <Sparks f={f} at={SEAT} x={CX} y={y + 60} n={40} z={94} floorY={720} />}
        <Band f={f} n={9} seed={1} y={GY + 22} size={152} z={58} from={SEAT + 1} every={3} />
        {seated && <Flurry x={CX} y={GY - 20} f={f} at={SEAT} n={26} z={92} s={1.5} spread={520} />}
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S4 · RULES vs REASON.  "CLAUDE.md tells Claude how to work, intent.md tells
   it why."  Two anvils, two objects, unequal light — the comparison IS the shot.
   ------------------------------------------------------------------------ */
export const F_HOWWHY: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const LX = 296, RX = W - 296, CY = 452;
  const whyK = E(f, 56, 76, 0, 1, BACK);
  /* ⭐ THE COMPARISON IS AN EVENT. Both files TRAVEL in from opposite edges,
     and when the sentence turns on "why" the intent.md STEPS FORWARD while
     CLAUDE.md falls back — a size change on the two biggest objects in frame,
     which is the only kind of motion the audit (and the eye) actually rewards
     [[feedback_a_small_moving_thing_on_a_big_still_thing_measures_still]]. */
  const lIn = E(f, 2, 22, 0, 1, OUT);                 /* CLAUDE.md from the left */
  const rIn = E(f, 26, 50, 0, 1, BACK);               /* intent.md up from below */
  const lK = 1 - whyK * 0.30;                         /* it recedes             */
  const rK = 0.86 + whyK * 0.30;                      /* it comes forward       */
  const settleK = E(f, 96, 124, 0, 1, IO);
  return (
    <Scene p={P.floor} slug="" push={[0, dur, 1.085]} vig={0.32}>
      <Cam x={Math.sin(f / 28) * 4} s={1} z={12}>
        <Bay p={BAYS.howwhy} f={f} shell="rack" seed={11} lit={0.85} />
        <Folder x={168} y={GY + 18} rot={-9} c="#C08A3E" s={0.95} z={54} />
        <Folder x={W - 176} y={GY + 26} rot={7} c="#A8742E" s={0.9} z={54} />
        <Bench x={W / 2} y={GY + 40} w={520} s={0.8} z={44} />
        {/* ⭐ THE COMPARISON IS THE SHOT, and it is a comparison of two REAL
            files — so both are drawn as files. CLAUDE.md arrives first, pale and
            smaller, its face carrying working lines; intent.md arrives second,
            dark and bigger, its face carrying the five real section headings.
            Nothing is asserted that the ledger does not hold. */}
        <FileSlab x={-190 + (LX + 190) * lIn} y={CY - whyK * 26} w={286 * lK} h={382 * lK}
          z={60} f={f} name={R.other} pale o={lIn} glowK={0} rot={-3 + whyK * 3} />
        <CodeLines x={-190 + (LX + 190) * lIn - 116 * lK} y={CY - whyK * 26 - 74 * lK}
          w={232 * lK} n={8} h={9} gap={17} c="#6E675E" o={0.55 * lIn}
          seed={6} f={f} scroll={0.5} z={64} indent />
        <MarkCast x={RX} y={CY} s={430 * rK} z={54} f={f} spin={1.6} pulse={0.5} o={0.24 * whyK} />
        <FileSlab x={RX} y={H + 300 - (H + 300 - CY) * rIn - settleK * 30} w={368 * rK}
          h={492 * rK} z={64} f={f} name={R.hero}
          fields={R.fields} fieldsIn={E(f, 60, 96, 0, 1, OUT)} o={rIn}
          glowK={whyK} rot={3 - whyK * 3} />
        {whyK > 0.4 && <Sparks f={f} at={56} x={RX} y={CY + 40} n={34} z={92} floorY={720} />}
        <Band f={f} n={8} seed={3} y={GY + 24} size={128} z={60} from={10} every={7}
          cheer={whyK > 0.6 ? 1 : 0} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S5 · THE HAMMER GOES DOWN.  "instead of opening Claude Code and immediately
   telling it to build something, you first explain your idea."
   ⭐ The refusal is an ACTION: he winds up, a bar drops across the anvil, and
   he SETS THE HAMMER DOWN. Anticipation withheld on purpose.
   ------------------------------------------------------------------------ */
export const F_REFUSE: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const AX = 640, AY = 664, BAR = 46, SET = 76;
  const barY = E(f, BAR, BAR + 9, -200, AY - 250, OUT);
  const down = E(f, SET, SET + 20, 0, 1, IO);
  const RISE = E(f, SET + 22, SET + 62, 0, 1, OUT);
  return (
    <Scene p={P.press} slug="" push={[0, dur, 1.095]} vig={0.42}>
      <Cam x={Math.sin(f / 30) * 4 + (f >= BAR && f < BAR + 8 ? Math.sin(f * 8) * 7 : 0)} s={1} z={12}>
        <Bay p={BAYS.forge} f={f} shell="brick" seed={13} lit={0.78} />
        <Toolbox x={132} y={GY + 8} s={0.95} z={48} c="#C4802A" />
        <Drum x={952} y={GY + 12} s={0.9} z={46} c="#8A6A2E" />
        <Gauge x={W - 132} y={330} s={0.85} z={50} k={0.7} f={f} fail={f >= BAR ? 1 : 0} />
        <Anvil x={AX} y={AY} s={0.92} />
        {/* ⭐ THE REFUSAL, DRAWN: an intent.md with NOTHING IN IT. The blank
            face is the reason he has to put the hammer down, so the obstacle
            and the subject are the same object. An orange billet said nothing. */}
        {/* ⭐ THE THIRD BEAT. He winds up (1), the bar drops (2) — and then this
            scene ran another 66 frames on nothing. So once the hammer is down
            the blank file RISES and turns to face camera: the thing that stopped
            him is what the shot ends on. */}
        <FileSlab x={AX} y={AY - 230 - RISE * 150} w={330 + RISE * 150} h={440 + RISE * 200}
          z={62} f={f} name={R.hero} fields={R.fields} fieldsIn={0}
          glowK={0.15 + RISE * 0.7} rot={(1 - RISE) * 5} />
        <MarkCast x={AX} y={AY - 230 - RISE * 150} s={520 * (0.6 + RISE * 0.6)} z={54}
          f={f} spin={1.3} pulse={0.4} o={0.24 * RISE} />
        {f < SET && <Hammer f={f} px={356} py={392} reach={286} z={92} />}
        {/* the hammer laid down on the anvil once he stops */}
        {f >= SET && (
          <div style={{ position: "absolute", left: 300 + down * 180, top: GY - 40 + down * 40,
            width: 150, height: 54, zIndex: 92, borderRadius: 8,
            transform: `rotate(${-60 + down * 66}deg)`,
            background: `linear-gradient(180deg, #C9C2B6, #6B655C)`, border: "5px solid #38332C" }} />
        )}
        {f >= BAR && (
          <div style={{ position: "absolute", left: AX - 260, top: barY, width: 520, height: 24,
            borderRadius: 6, zIndex: 94,
            background: `repeating-linear-gradient(126deg, #E7A94C 0 22px, #2A2318 22px 44px)`,
            border: "3px solid #6E4E14" }} />
        )}
        <Hero f={f} x={296} y={GY + 26} size={392} z={70} costume={{ constr: 1 }}
          gaze={0.8} strain={f >= BAR && f < SET ? 1 : 0.2}
          shock={f >= BAR && f < BAR + 14 ? 1 : 0} act={1} />
        {/* ⛔ 162 frames — the longest scene in the reel — on three events. A
            forge is never idle, so a second smith works his own anvil on his own
            clock for the whole beat: "it costs the hierarchy nothing because it
            is furniture, and it is the difference between a shot and a still." */}
        <BgForge f={f} x={946} y={GY - 24} s={0.72} ph={9} z={34} beat={19} />
        <Band f={f} n={8} seed={5} y={GY + 22} size={150} z={54} from={BAR + 4} every={6} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S6 · THE FOUR QUESTIONS.  "Then Claude interviews you, asking what you're
   building, who it's for, what constraints it has, and what success looks like."
   ⭐ FOUR ARRIVALS on four clauses, drawn as four hot punches struck into the
   stock — no text, the count is the information.
   ------------------------------------------------------------------------ */
export const F_ASK: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const AX = W / 2, AY = 664;
  const AT = [10, 40, 68, 96];
  const done = AT.filter((a) => f >= a).length;
  const since = done ? f - AT[done - 1] : 99;
  const struck = since < 3;
  /* ⭐ FOUR ANSWERS, FOUR SIZE STEPS. The file does not just fill — it GROWS on
     each clause, so the biggest object in frame changes on every beat. */
  const grow = AT.reduce((a, t) => a + E(f, t, t + 14, 0, 0.25, OUT), 0);
  return (
    <Scene p={P.cockpit} slug="" push={[0, dur, 1.09]} vig={0.46}>
      <Cam x={Math.sin(f / 32) * 3 + (struck ? Math.sin(f * 9) * 6 : 0)} s={1} z={12}>
        <Bay p={BAYS.ask} f={f} shell="glass" seed={17} lit={0.72} dim={0.10} />
        <Bench x={AX} y={GY + 30} w={600} s={0.9} z={40} />
        <Alcove x={116} y={392} w={176} h={250} z={16} c="#7CE8A8" on={0.6} t="WHO IS IT FOR" />
        <TickDisc x={W - 116} y={230} d={70} z={58} spin={0.4} hue="#7CE8A8"
          off={Math.max(0, 1 - done / 4)} />
        {/* ⭐ FOUR ARRIVALS ON FOUR CLAUSES — and each one lands IN the file, so
            the count and the subject are one object. The answer fills the thing
            the last scene showed empty; that is the reel's smallest arc. */}
        <MarkCast x={AX} y={AY - 250} s={470} z={54} f={f} spin={1.5} pulse={0.5} o={0.22} />
        <FileSlab x={AX} y={AY - 250 - grow * 60} w={366 + grow * 120} h={492 + grow * 160}
          z={62} f={f} name={R.hero} fields={R.fields} fieldsIn={done / 4}
          glowK={done / 4} rot={struck ? (done % 2 ? 1.6 : -1.6) : 0} />
        {/* the four question cards dealt in, one per clause */}
        {AT.map((a, i) => f >= a && (
          <div key={i} style={{ position: "absolute", left: 76 + i * 30,
            top: AY - 470 + i * 96, width: 214, height: 74, borderRadius: 8, zIndex: 74,
            opacity: Math.min(1, (f - a) / 8),
            transform: `translateX(${(1 - E(f, a, a + 14, 0, 1, OUT)) * -420}px) rotate(${i % 2 ? 3 : -3}deg)`,
            background: `linear-gradient(180deg, #F4F0E6, #CFC7B6)`,
            border: "4px solid #6E6558", display: "flex", alignItems: "center", padding: "0 10px" }}>
            <span style={{ ...mono(11, 800), color: "#3A3229", lineHeight: 1.25 }}>{R.questions[i]}</span>
          </div>
        ))}
        {done > 0 && <Sparks f={f} at={AT[done - 1]} x={AX - 150 + (done - 1) * 100}
          y={AY - 190} n={38} z={96} floorY={AY + 30} />}
        <Hero f={f} x={278} y={GY + 26} size={380} z={70} costume={{ constr: 1 }}
          gaze={0.9} strain={struck ? 1 : 0.25} act={1} />
        <Hammer f={f} px={348} py={396} reach={280} z={92} />
        <Band f={f} n={8} seed={7} y={GY + 22} size={148} z={54} from={6} every={11} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S7 · THE STAMP.  "And all of that gets saved into an intent.md file."
   The press comes down ONCE, hard, and the mark is struck into the link.
   ------------------------------------------------------------------------ */
export const F_STAMP: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const CX = W / 2, CY = 452, DOWN = 16, UP = 30;
  const py = f < DOWN ? E(f, 0, DOWN, -340, CY - 210, IN_Q)
    : f < UP ? CY - 210 : E(f, UP, UP + 14, CY - 210, -340, OUT);
  const hit = f >= DOWN;
  const sq = hit ? squash(f - DOWN, 0, 0.17, 3, 12) : 1;
  return (
    <Scene p={P.floor} slug="" push={[0, dur, 1.09]} vig={0.28}>
      <Cam x={Math.sin(f / 22) * 3} y={hit ? Math.sin(f * 3.4) * 9 * Math.max(0, 1 - (f - DOWN) / 13) : 0} s={1} z={12}>
        <Bay p={BAYS.stamp} f={f} shell="plant" seed={19} lit={1} />
        <HitPlate x={CX} y={GY + 6} w={520} hit={hit ? 1 : 0} z={30} />
        <Drum x={148} y={GY + 14} s={0.95} z={46} c="#3E5C8E" />
        <Drum x={214} y={GY + 20} s={0.78} z={45} c="#2E4670" />
        <Gauge x={W - 140} y={318} s={0.9} z={50} k={hit ? 1 : 0.3} f={f} />
        {/* "all of that gets saved into an intent.md file" — the ram strikes and
            the five fields are IN the face when it lifts. The save is visible. */}
        {hit && <MarkCast x={CX} y={CY} s={480} z={54} f={f} spin={2.4} pulse={0.7} o={0.28} />}
        <div style={{ position: "absolute", inset: 0, zIndex: 64,
          transform: `scaleY(${sq}) scaleX(${2 - sq})`, transformOrigin: "50% 100%" }}>
          <FileSlab x={CX} y={CY} w={396} h={520} z={62} f={f} name={R.hero}
            fields={R.fields} fieldsIn={hit ? E(f, DOWN, DOWN + 22, 0, 1, OUT) : 0}
            glowK={hit ? 1 : 0.15} />
        </div>
        {/* the press ram */}
        <div style={{ position: "absolute", left: CX - 190, top: py, width: 380, height: 190,
          zIndex: 90, borderRadius: 12,
          background: `linear-gradient(180deg, #C9C2B6, #57514A)`, border: "8px solid #332E28" }} />
        <div style={{ position: "absolute", left: CX - 16, top: 0, width: 32,
          height: Math.max(0, py), zIndex: 88, background: "#5C564E" }} />
        {hit && <Sparks f={f} at={DOWN} x={CX} y={CY - 40} n={70} z={96} floorY={720} power={1.2} />}
        <Band f={f} n={8} seed={11} y={GY + 20} size={124} z={58} from={2} every={4}
          cheer={hit ? 1 : 0} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S8 · THE REVEAL.  "But here's where it gets much more interesting."
   ONE thing happens: a shutter lifts and the long run of the shop is behind it.
   ------------------------------------------------------------------------ */
export const F_TURN: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const sh = E(f, 4, 30, 0, 1, OUT);
  return (
    <Scene p={P.engine} slug="" push={[0, dur, 1.05]} vig={0.40}>
      <Cam x={Math.sin(f / 20) * 3} s={1} z={12}>
        <Bay p={BAYS.turn} f={f} shell="server" seed={23} lit={0.4 + sh * 0.6} />
        <PipRow lit={sh} y={70} z={70} d={13} f={f} at={4} />
        {/* ⭐ THE DENSITY DEVICE: one wall of ONE repeated object, so "here's
            where it gets much more interesting" is answered by SCALE — eighteen
            of them behind the shutter, and one lit in front to keep the rank. */}
        {Array.from({ length: 18 }, (_, i) => {
          const col = i % 6, row = Math.floor(i / 6);
          const born = 6 + col * 4 + row * 2;
          const k = E(f, born, born + 7, 0, 1, BACK);
          return <FileSlab key={i} x={104 + col * 176} y={252 + row * 190} w={148} h={198}
            z={40 + row} f={f} name={R.tree[i % R.tree.length]} pale={(i + row) % 3 === 0}
            rot={(i % 2 ? 2.4 : -2.4)} o={sh * k * (0.5 + row * 0.22)} mark={false} />;
        })}
        <MarkCast x={W / 2} y={604} s={430} z={60} f={f} spin={1.8} pulse={0.6} o={0.26 * sh} />
        <FileSlab x={W / 2} y={604} w={352} h={470} z={66} f={f} name={R.hero}
          fields={R.fields} fieldsIn={E(f, 22, 48, 0, 1, OUT)} o={sh} glowK={sh} />
        <div style={{ position: "absolute", left: -40, top: -20 - sh * 620, width: W + 80,
          height: 660, zIndex: 92,
          background: `repeating-linear-gradient(180deg, #3A342C 0 26px, #23201B 26px 52px)`,
          borderBottom: "8px solid #A9A196" }} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S9 · THE CHAIN GROWS.  "Claude can turn it into a full spec, then an
   implementation plan, and actually build and test the feature automatically."
   ⭐ THREE ARRIVALS: three more links forged on, each landing with its own hit.
   ------------------------------------------------------------------------ */
export const F_CHAIN: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const AT = [10, 48, 88];
  const CY = 432;
  const done = AT.filter((a) => f >= a).length;
  const since = done ? f - AT[done - 1] : 99;
  const struck = since < 3;
  return (
    <Scene p={P.paper} slug="" push={[0, dur, 1.0]} vig={0.32}>
      <Cam x={Math.sin(f / 28) * 4 + (struck ? Math.sin(f * 9) * 6 : 0)} s={1} z={12}>
        <Shop f={f} lit={0.9} seed={29} chains={6} key_="#C4F0F4" lampX={W / 2} />
        {[0, 1, 2, 3].map((i) => {
          if (i > done) return null;
          const born = i === 0 ? 0 : AT[i - 1];
          const k = E(f, born, born + 9, 0, 1, BACK);
          const r = 150;
          const x = 210 + i * r * 1.42;
          return (<React.Fragment key={i}>
            <Link x={x} y={CY} r={r} rot={i % 2 ? 90 : 0} z={60 + i}
              heat={i === done - 1 && since < 24 ? Math.max(0, 0.9 - since / 26) : 0}
              o={k} />
            {i === 0 && <MarkCast x={x} y={CY} s={128} z={70} f={f} spin={2.4} />}
          </React.Fragment>);
        })}
        {done > 0 && <Sparks f={f} at={AT[done - 1]} x={210 + done * 150 * 1.42} y={CY}
          n={46} z={96} floorY={GY + 30} />}
        <Crew f={f} x={150} y={GY + 24} i={2} size={132} z={64} at={-14} tint={CLAY} />
        <Crew f={f} x={W - 140} y={GY + 24} i={6} size={132} z={64} at={-14} flip />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S10 · THE RUN.  "But Anthropic's end goal goes even further."
   The chain runs off into the dark. The quietest beat in the reel, on purpose.
   ------------------------------------------------------------------------ */
export const F_FAR: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const on = E(f, 14, 28, 0, 1, OUT);
  return (
    <Scene p={P.engine} slug="" push={[0, dur, 1.03]} vig={0.52}>
      <Cam x={Math.sin(f / 26) * 3} s={1} z={12}>
        <Bay p={BAYS.far} f={f} shell="deep" seed={31} lit={0.30 + on * 0.5} dim={0.16} />
        {/* ⛔ this beat is meant to be the QUIET one, and quiet became EMPTY —
            one small pale slab in a dark room. Quiet is about how much HAPPENS,
            not how much is THERE: the run is the same nine files, drawn big
            enough to fill the hall they are running down. */}
        {Array.from({ length: 11 }, (_, i) => {
          const t = ((f * 0.010 + i / 11) % 1);
          const sc = 0.30 + t * t * 1.55;
          return <FileSlab key={i} x={912 - t * 700} y={352 + t * 300} w={250 * sc}
            h={334 * sc} z={30 + i} f={f} name={R.hero} pale={i % 3 === 0} mark={false}
            glowK={t} o={0.52 + t * 0.45} rot={i % 2 ? 2 : -2} />;
        })}
        <div style={{ position: "absolute", left: 902, top: 350, width: 60, height: 60,
          borderRadius: "50%", zIndex: 70, opacity: on, transform: `scale(${0.5 + on * 0.5})`,
          background: `radial-gradient(circle at 34% 30%, #FFE9A8, ${hexa(GOLD, 0.7)})`,
          border: `4px solid ${dkh(GOLD, 0.44)}` }} />
        <Band f={f} n={6} seed={23} y={GY + 30} size={150} z={54} from={6} every={9}
          x0={130} x1={W - 130} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S11 · THE RING CLOSES.  THE PEAK.  "Eventually AI agents could monitor your
   app, detect an issue, create a new intent file, plan the fix, and start the
   entire process again autonomously."
   ⭐ The two ends of the chain JOIN and the ring turns with nobody holding it.
   ------------------------------------------------------------------------ */
export const F_LOOP: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const CX = W / 2, CY = 400, RAD = 250;
  const FAULT = 30, CLOSEA = 74;
  const closed = f >= CLOSEA;
  const n = 12;
  const grow = Math.min(n, Math.floor(E(f, 6, CLOSEA, 0, n, LIN)));
  const spin = closed ? (f - CLOSEA) * 1.5 : 0;
  return (
    <Scene p={P.floor} slug="" push={[0, dur, 1.03]} vig={0.30}>
      <Cam x={Math.sin(f / 34) * 5 + (f >= CLOSEA && f < CLOSEA + 10 ? Math.sin(f * 8) * 9 : 0)} s={1} z={12}>
        {/* ⭐ THE ONE PLACE IN THE BODY THE RING BELONGS. "start the entire
            process again autonomously" IS a closed loop, so the shape earns
            itself here and nowhere else — which is exactly why it can carry
            the peak instead of being wallpaper. */}
        <Bay p={BAYS.loop} f={f} shell="vault" seed={37} lit={closed ? 1 : 0.68} />
        <HitPlate x={CX} y={GY + 10} w={620} hit={closed && f < CLOSEA + 8 ? 1 : 0} z={30} />
        {/* the fault lamp — the issue nobody reported */}
        {f >= FAULT && f < CLOSEA && (
          <div style={{ position: "absolute", left: 880, top: 200, width: 96, height: 96,
            borderRadius: "50%", zIndex: 86, opacity: Math.floor(f / 5) % 2 ? 1 : 0.5,
            background: `radial-gradient(circle, ${hexa(DIFFR, 0.95)}, ${hexa(DIFFR, 0.2)} 70%)` }} />
        )}
        {/* the ring assembling link by link, then turning */}
        {Array.from({ length: n }, (_, i) => {
          if (i >= grow) return null;
          const a = ((i / n) * 360 + spin) * Math.PI / 180;
          const x = CX + Math.cos(a) * RAD, y = CY + Math.sin(a) * RAD * 0.72;
          const born = 6 + (i / n) * (CLOSEA - 6);
          const k = E(f, born, born + 8, 0, 1, BACK);
          /* ⛔ the links cooled to grey exactly as the ring closed, so the
             brightest MOMENT in the reel was its dullest FRAME. The loop is
             running once it closes — a running loop stays hot. */
          return <Link key={i} x={x} y={y} r={84} rot={(a * 180) / Math.PI + (i % 2 ? 90 : 0)}
            z={60 + (i % 4)} o={k}
            heat={closed ? 0.55 + Math.sin(f / 7 + i) * 0.18
              : f - born < 20 ? Math.max(0.25, 0.9 - (f - born) / 22) : 0.25} />;
        })}
        <MarkCast x={CX} y={CY} s={210} z={74} f={f} spin={closed ? 4.0 : 1.4} pulse={closed ? 1 : 0.3} />
        {closed && <Sparks f={f} at={CLOSEA} x={CX + RAD} y={CY} n={80} z={96}
          floorY={GY + 40} power={1.4} />}
        {/* the crowd stands back and watches it run itself */}
        {Array.from({ length: 6 }, (_, i) => (
          <Crew key={i} f={f} x={110 + i * 168} y={GY + 30} i={i} size={120} z={54} at={-14}
            flip={i > 2} tint={i % 3 === 0 ? CLAY : undefined} cheer={closed ? 1 : 0} />
        ))}
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S12 · THE SHOP RUNS ITSELF.  "we're moving from an AI that writes code to AI
   that autonomously runs the entire software development process."
   ⭐ Three hammers swinging with nobody holding them, and the cast watching.
   ------------------------------------------------------------------------ */
export const F_SHIFT: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={P.floor} slug="" push={[0, dur, 1.085]} vig={0.26}>
      <Cam x={Math.sin(f / 36) * 5} s={1} z={12}>
        <Bay p={BAYS.shift} f={f} shell="yard" seed={41} lit={1} />
        {[236, 540, 844].map((x, i) => {
          const ph = i * 9;
          const t = ((f + ph) % 18) / 18;
          const ang = t < 0.62 ? -16 - E(t, 0, 0.62, 0, 96, OUT)
            : t < 0.78 ? -112 + E(t, 0.62, 0.78, 0, 120, IO) : 8;
          const struck = t >= 0.76 && t < 0.84;
          return (<React.Fragment key={i}>
            {/* ⛔ the last three rings in the reel were here, as forging
                stages. The sentence is "runs the entire software development
                process" — so what comes off each station is a FINISHED FILE. */}
            <div style={{ position: "absolute", left: x - 118, top: 596, width: 236, height: 30,
              zIndex: 44, background: `linear-gradient(180deg, #8A5038, #4A2818)` }} />
            {/* ⭐ THE CYCLE: each station lifts its finished file away and the
                next one is already under the hammer. Three stations x one file
                each was three stills; a works that "runs the entire process"
                has to be seen to REPEAT. */}
            {[0, 1].map((q) => {
              const period = 36, ph2 = i * 11 + q * 18;
              const t = (((f + ph2) % period) / period);
              const lift = E(t, 0.62, 1, 0, 1, IO);
              const born = E(t, 0, 0.12, 0, 1, OUT);
              return <FileSlab key={q} x={x} y={498 - lift * 430}
                w={(186 + lift * 40) * born} h={(248 + lift * 54) * born}
                z={62 + q} f={f} name={R.chain[(i + q) % R.chain.length]}
                pale={(i + q) % 3 === 1} fields={(i + q) % 3 === 0 ? R.fields : undefined}
                fieldsIn={(i + q) % 3 === 0 ? 1 : 0} mark={(i + q) % 3 !== 1}
                o={1 - E(t, 0.88, 1, 0, 1, LIN)}
                rot={struck ? (i % 2 ? 2.5 : -2.5) : 0}
                glowK={struck ? 1 : 0.3} />;
            })}
            <div style={{ position: "absolute", left: x - 10, top: 150, width: 20,
              height: 210, zIndex: 88, background: "#5C564E" }} />
            <div style={{ position: "absolute", left: x - 62, top: 340, width: 124, height: 60,
              zIndex: 90, borderRadius: 8, transform: `rotate(${ang + 90}deg)`,
              transformOrigin: "50% 0%",
              background: `linear-gradient(180deg, #C9C2B6, #6B655C)`, border: "5px solid #38332C" }} />
            {struck && <Sparks f={f} at={f} x={x} y={520} n={28} z={94} floorY={700} power={0.8} />}
          </React.Fragment>);
        })}
        <Band f={f} n={9} seed={13} y={GY + 40} size={146} z={52} from={4} every={5}
          cheer={f > 60 ? 1 : 0} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S13 · THE POINT.  "intent.md isn't about giving Claude more context, it's
   about giving AI agents what you're actually trying to accomplish."
   A pile of plain stock slides past; the one marked link stays.
   ------------------------------------------------------------------------ */
export const F_CLOSE: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const CX = W / 2, CY = 420;
  const fwd = 0.72 + E(f, 10, 96, 0, 0.34, IO);       /* it comes to camera */
  return (
    <Scene p={P.cockpit} slug="" push={[0, dur, 1.09]} vig={0.36}>
      <Cam x={Math.sin(f / 30) * 4} s={1} z={12}>
        <Bay p={BAYS.close} f={f} shell="glass" seed={43} lit={0.66} />
        <Alcove x={122} y={404} w={180} h={256} z={16} c="#BEE2F8" on={0.55} t="OPEN QUESTIONS" />
        <Alcove x={W - 122} y={404} w={180} h={256} z={16} c="#BEE2F8" on={0.4} t="AFFECTED USERS" />
        {/* ⭐ "not about giving Claude more context" — so CONTEXT is what streams
            past and never stops: eighteen ordinary repo files crossing at three
            depths, big enough to repaint real area. The one file that STAYS is
            the one the sentence is about, and it comes forward as they pass. */}
        {Array.from({ length: 18 }, (_, i) => {
          const t0 = 1 + i * 7;
          const k = E(f, t0, t0 + 46, 0, 1, LIN);
          if (k <= 0.001 || k >= 0.999) return null;
          const lane = i % 3, sc = 0.62 + lane * 0.26;
          return <FileSlab key={i} x={-180 + k * (W + 360)} y={188 + lane * 176}
            w={150 * sc} h={200 * sc} z={38 + lane} f={f} name={R.tree[i % R.tree.length]}
            pale={i % 3 === 0} mark={false} o={0.5 + lane * 0.2} rot={(i % 2 ? 4 : -4)} />;
        })}
        <MarkCast x={CX} y={CY} s={560 * fwd} z={58} f={f} spin={1.8} pulse={0.5} o={0.26} />
        <FileSlab x={CX} y={CY + 40 - fwd * 40} w={428 * fwd} h={564 * fwd} z={70} f={f}
          name={R.hero} fields={R.fields} fieldsIn={E(f, 6, 44, 0, 1, OUT)} glowK={1} />
        <Band f={f} n={7} seed={19} y={GY + 24} size={126} z={60} from={8} every={9} />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   S14 · THE CTA.  "For the free setup guide, comment INTENT."
   The mark, big and turning, and the reel ends in air.
   ------------------------------------------------------------------------ */
export const F_CTA: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const CX = W / 2, CY = 400;
  return (
    <Scene p={P.floor} slug="" push={[0, dur, 1.075]} vig={0.34}>
      <Cam x={Math.sin(f / 20) * 3} s={1} z={12}>
        <Bay p={BAYS.cta} f={f} shell="rack" seed={47} lit={1} />
        <PipRow lit={1} y={70} z={70} d={13} f={f} at={2} />
        <FileSlab x={CX} y={CY + 40} w={400} h={528} z={64} f={f} name={R.hero}
          fields={R.fields} fieldsIn={1} glowK={1} />
        <MarkCast x={CX} y={CY - 210} s={252} z={78} f={f} spin={5.0} pulse={1} />
        <Sparks f={f} at={2} x={CX} y={CY + 60} n={54} z={94} floorY={GY + 30} />
        <Band f={f} n={9} seed={17} y={GY + 26} size={130} z={58} from={2} every={3} cheer={1} />
      </Cam>
    </Scene>
  );
};
