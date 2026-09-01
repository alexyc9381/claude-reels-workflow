import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Mark, MarkPlate, Contact, Edge, Ring, Puff, Steam, Motes,
  Crew, Hero, Forearm, costumeFor, squash, mono, ui, Rake, Runner, Sweat, Fall,
  R, asPlace, GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, BONE, FIVERR, UPWORK,
} from "./BuildWorld";
import {
  AwningBoard, IronGate, ShopFront, TradeCounter, Docket, EcomCrate, ReelCan,
} from "./BuildProps";
import { S0 } from "./BuildScenes";
import { Room, Jamb, Overhead } from "./HwSets";

/* ===========================================================================
   REEL 133 · "BUILD" — THE HOOK CANDIDATES.

   ⛔ docs/THE-OPEN.md STEP 1: *the first build step of any reel is not scene 0,
   it is N concepts for scene 0.* Four genuinely different WORLDS, each rendered
   at full quality on the real chassis with the real VO, bed, captions and rail,
   so the pick is made on the thing a viewer would actually be served.

   The four are four different MECHANISMS, not one world in four colourways:

     shutter  REVELATION    the shop's shutter is hauled up on three machines
                            that are already running
     haul     LOAD          a colossal crate stencilled FREE is winched up onto
                            the trade counter by a Claude half its size
     belt     ACCUMULATION  finished goods pour out of a hopper faster and
                            faster and a van fills with them
     stamp    IMPACT        a SOLD stamp the size of a wall comes down

   ⛔⛔ ALL FOUR OBEY THE FOUR LAWS OF FRAME 0 and the three rules the OX and
   UNLAZY hooks actually follow: a LIVING THING is the subject and something
   happens TO it; ANTICIPATION IS A PHYSICAL PROCESS YOU CAN SEE COMING; ONE
   HUGE OBJECT beside a small Claude for scale, on a bright set, with the
   receipt already at frame 0.

   ⛔ AND `PREDICTABLE MOTION IS NOT ANTICIPATION` (§25). In every one of these
   the shot states that something is ABOUT to happen and withholds the
   resolution — a curtain rising on a lit interior, a load climbing toward a
   counter edge, a hopper about to overrun, a mass rising before it falls.

   ⭐ `shutter` IS `S0` ITSELF, so the candidate that ships and the scene that
   ships are the same code and cannot drift apart (reel 132's arrangement).
   ========================================================================= */

export type HookId = "shutter" | "haul" | "belt" | "stamp";
type SP = { v: any; dur: number };

/** ⛔ THE BAND STATES THE CLAIM IN THE VIEWER'S WORDS — the outcome they want
    to be able to do, never the set and never the theme. Nothing here says "the
    trade row" or "the shutter". */
export const HOOK_BANDS: Record<HookId, { big: string; hot: string }> = {
  shutter: { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  haul:    { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  belt:    { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  stamp:   { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
};

/* --------------------------------------------------------------------------
   ⭐⭐⭐ A GATE CARRIED BY THE WRONG OBJECT DEFORMS THAT OBJECT (reel 110).
   The hook's SUBJECT is never the thing holding up `HOOK_LUMA >= 140` or
   `HOOK_PLATE`. In all four candidates a LIT BOARD does both jobs — an awning,
   a gantry sign, a dispatch board — which is what lets the hero stay a
   near-black silhouette and gives the reel its biggest value spread.
   ----------------------------------------------------------------------- */
const LitBoard: React.FC<{ x: number; y: number; w: number; f: number; z?: number }> =
  ({ x, y, w: ww, f, z = 66 }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 108, zIndex: z,
      borderRadius: 6, background: `linear-gradient(178deg, #FBF3DE 0%, #E0D0A8 100%)`,
      border: `6px solid ${dkh(SODIUM, 0.42)}`, display: "flex", alignItems: "center",
      justifyContent: "center", gap: 22, boxShadow: SH_D }}>
      {[["logos/si_fiverr.svg", 44], ["logos/si_upwork.svg", 46]].map(([src, s], i) => (
        <div key={"mk" + i} style={{ width: 66, height: 66, borderRadius: 15, background: "#FFF",
          border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <img src={src as string} style={{ width: s as number, height: s as number,
            objectFit: "contain" }} />
        </div>
      ))}
      <span style={{ ...ui(44, 900), color: INK }}>{R.price}</span>
    </div>
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"bb" + i} style={{ position: "absolute", left: x + 18 + i * ((ww - 36) / 8),
        top: y + 112, width: 13, height: 13, borderRadius: "50%", zIndex: z,
        background: mxh(SODIUM, 0.3 + 0.4 * Math.abs(Math.sin(f / 9 + i * 0.8))) }} />
    ))}
  </>
);

/* =========================================================================
   HAUL · LOAD — the concept class Alex names when he names OX, UNLAZY and
   BOSS: A BODY DOING PHYSICAL WORK AGAINST A LOAD.

   A crate three times the hero's height, stencilled FREE, on a hand-winch. He
   cranks it up toward the counter lip. ⛔ The crate BOWS the gantry and the
   winch drum visibly slips back a notch before it catches — the refusal is what
   makes the weight read. What is inside is withheld until it lands.
   ====================================================================== */
const HookHaul: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  /* pre-seeded and SETTLED at frame 0: the load is already off the ground */
  const rise = 0.26 + E(f, 4, 52, 0, 0.62, IO);
  const slip = f > 22 && f < 28 ? -0.035 : 0;     /* the drum gives, then catches */
  const k = rise + slip;
  const strain = E(f, 0, 12, 0.4, 0.94, OUT) * (1 - E(f, 56, 68, 0, 1, IO));
  const land = E(f, 56, 64, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.50}>
      <Room p={p} f={f} bands={3} kind="house" overhead="gantry" rake={0.12} rakeRate={5.0}
        floorKind="tile" grit={0.7} window={{ x: 62, y: 150, w: 268, h: 230 }} />
      <Runner y={196} f={f} z={20} rate={8.4} pitch={178} w={124} h={56} kind="load"
        c="#E6DCC0" c2="#2A2620" rail hang={12} o={0.9} />

      <LitBoard x={286} y={86} w={452} f={f} z={66} />
      <TradeCounter x={520} y={520} w={470} z={44} />

      {/* the winch post and its cable, taut */}
      <div style={{ position: "absolute", left: 122, top: 210, width: 34, height: 420, zIndex: 40,
        background: "linear-gradient(90deg,#8E8672,#33302A)" }} />
      <div style={{ position: "absolute", left: 138, top: 216, width: 7,
        height: 300 - k * 190, zIndex: 42, background: "#5E5648",
        transform: `rotate(${strain * 1.2}deg)`, transformOrigin: "50% 0%" }} />

      {/* the load — three times his height, and it is the one huge object */}
      <div style={{ position: "absolute", left: 236, top: 496 - k * 300, width: 330, height: 330,
        zIndex: 60, borderRadius: 6, transform: `rotate(${Math.sin(f / 6.4) * strain * 2.4}deg)`,
        transformOrigin: "50% -80px",
        background: `linear-gradient(172deg, ${mxh(SODIUM, 0.12)} 0%, ${dkh(SODIUM, 0.44)} 100%)`,
        border: "8px solid rgba(0,0,0,0.5)", boxShadow: SH_D }}>
        {[0, 1, 2].map(i => (
          <div key={"pl" + i} style={{ position: "absolute", left: 16, right: 16, top: 22 + i * 100,
            height: 14, background: "rgba(0,0,0,0.24)" }} />
        ))}
        <span style={{ position: "absolute", left: 0, right: 0, top: 128, textAlign: "center",
          ...ui(84, 900), color: "#2A1C04", letterSpacing: "0.04em" }}>FREE</span>
        {/* the lid springing on the landing — the withheld thing arriving */}
        {land > 0 && (
          <div style={{ position: "absolute", left: -10, right: -10, top: -22 - land * 44,
            height: 34, borderRadius: 4, background: dkh(SODIUM, 0.30),
            border: "6px solid rgba(0,0,0,0.46)",
            transform: `rotate(${-land * 9}deg)`, transformOrigin: "0% 100%" }} />
        )}
        {land > 0.3 && R.tools.map((t, i) => (
          <div key={"tt" + i} style={{ position: "absolute", left: 26 + i * 96,
            top: 40 - land * 26, width: 80, height: 116, borderRadius: 4,
            opacity: (land - 0.3) / 0.7,
            background: `linear-gradient(176deg, ${mxh(t.c, 0.24)} 0%, ${dkh(t.c, 0.4)} 100%)`,
            border: "4px solid rgba(0,0,0,0.44)" }} />
        ))}
      </div>

      {/* the hero on the crank, half the crate's height, straining */}
      <Contact x={98} y={GY - 12} w={196} o={0.4} />
      <Hero f={f} x={192} y={GY} size={232} z={56} act={1} ph={0.6} strain={strain}
        costume={{ constr: 1 }} tint="#8E4A2E" stern={1} />
      <Forearm x0={246} y0={GY - 168} x1={148} y1={GY - 214} w={24} c="#8E4A2E" z={58} />
      {strain > 0.5 && <Steam x={192} y={GY - 224} f={f} at={6} n={5} z={70} />}
      {land > 0 && <Ring x={400} y={520} f={f} at={56} c="#F2E4C4" z={78} s={1.1} />}

      <Chip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} y={BAND_Y} c={INK}
        fg="#F6F2E8" s={0.94} z={94} />
      <Edge side="r" c="#1E1A14" w={104} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   BELT · ACCUMULATION — a hopper that is about to overrun.

   Finished goods pour out onto a belt faster and faster and a van fills. The
   anticipation is the RATE: the pile is climbing toward the top of the tailgate
   and the shot has not yet said whether it stops.
   ====================================================================== */
const HookBelt: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dock");
  const rate = 1 + E(f, 0, 64, 0, 3.4, IO);       /* it ACCELERATES */
  const pile = E(f, 6, 68, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.50}>
      <Room p={p} f={f} bands={3} kind="house" overhead="gantry" rake={0.12} rakeRate={5.6}
        floorKind="tarmac" grit={0.8} />
      {[92, 300, 512].map((x, i) => (
        <ShopFront key={"sb" + i} x={x} y={p.horizon + 24} s={0.7 + i * 0.05}
          c={["#3E5A6E", "#4A5A48", "#5E4A52"][i]} z={12} />
      ))}
      <LitBoard x={280} y={86} w={452} f={f} z={66} />

      {/* the hopper mouth, overrunning */}
      <div style={{ position: "absolute", left: 108, top: 214, width: 300, height: 156, zIndex: 40,
        clipPath: "polygon(0 0, 100% 0, 72% 100%, 28% 100%)",
        background: "linear-gradient(176deg,#7E8896,#252D36)" }} />
      {/* ⭐ the belt: full width, alternating light and shadow, accelerating */}
      <Runner y={520} f={f * rate} z={30} rate={9.6} pitch={158} w={116} h={62} kind="crate"
        c="#EFE7D4" c2="#1A222C" rail o={1} />

      {/* the van, filling toward the top of its tailgate */}
      <div style={{ position: "absolute", left: 636, top: 288, width: 380, height: 300, zIndex: 40,
        borderRadius: "10px 6px 6px 10px",
        background: "linear-gradient(176deg,#E6E2D6 0%,#9EA0A0 100%)",
        border: "6px solid rgba(0,0,0,0.46)" }}>
        <div style={{ position: "absolute", left: 20, top: 26, width: 306, height: 194,
          borderRadius: 4, background: "#2A3038", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
            height: `${pile * 96}%`, background: `linear-gradient(180deg, ${mxh(TEAL, 0.2)} 0%, ${dkh(TEAL, 0.4)} 100%)` }} />
          {Array.from({ length: 9 }, (_, i) => {
            const k = pile * 9 - i;
            if (k <= 0) return null;
            return (
              <div key={"pk" + i} style={{ position: "absolute", left: 12 + (i % 3) * 98,
                bottom: 8 + Math.floor(i / 3) * 62, width: 84, height: 54, borderRadius: 3,
                background: mxh(TEAL, 0.06), border: "3px solid rgba(0,0,0,0.4)",
                transform: `scale(${Math.min(1, k)})` }} />
            );
          })}
        </div>
      </div>

      <Contact x={368} y={GY - 12} w={200} o={0.38} />
      <Hero f={f} x={462} y={GY} size={246} z={56} act={1} ph={0.9}
        drive={Math.sin(f / 5) * 0.18} costume={{ constr: 1 }} tint="#8E4A2E"
        cheer={f > 48 ? 1 : 0} shock={f > 34 && f < 48 ? 1 : 0} />
      {[0, 1].map(i => (
        <Crew key={"bc" + i} f={f} x={686 + i * 124} y={GY} i={i + 3} size={124} z={54}
          at={i * 4} tint="#8E4A2E" />
      ))}

      <Chip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} y={BAND_Y} c={INK}
        fg="#F6F2E8" s={0.94} z={94} />
      <Edge side="l" c="#0F1318" w={100} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   STAMP · IMPACT — a mass rising before it falls.

   A SOLD stamp the size of a wall is winched up over a dispatch docket, hangs,
   and comes down. ⛔ The anticipation is the HANG: the shot has promised the
   drop and withheld it for eighteen frames.
   ====================================================================== */
const HookStamp: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  const up = E(f, 0, 20, 0.34, 1, OUT);
  const hang = f > 20 && f < 38 ? Math.sin(f / 3.4) * 0.012 : 0;
  const drop = E(f, 38, 45, 0, 1, IN_Q);
  const back = E(f, 45, 60, 0, 1, OUT);
  const y = 96 + (up + hang - drop * 0.82 + back * 0.30) * 300;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.52}>
      <Room p={p} f={f} bands={3} kind="house" overhead="gantry" rake={0.11} rakeRate={4.8}
        floorKind="tile" grit={0.7} window={{ x: 700, y: 154, w: 270, h: 220 }} />
      <Runner y={200} f={f} z={20} rate={7.8} pitch={182} w={126} h={54} kind="load"
        c="#E6DCC0" c2="#2A2620" rail hang={10} o={0.88} />
      <LitBoard x={278} y={82} w={452} f={f} z={66} />

      {/* the docket the size of a table, waiting under it */}
      <div style={{ position: "absolute", left: 268, top: 512, width: 468, height: 200, zIndex: 44,
        borderRadius: 5, background: PAPER, border: "5px solid rgba(0,0,0,0.32)",
        transform: `rotate(${-2 + drop * 1.4}deg)`, boxShadow: SH }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"dk" + i} style={{ position: "absolute", left: 30, top: 26 + i * 30,
            width: i === 3 ? 160 : 300, height: 8, background: "rgba(42,36,28,0.28)" }} />
        ))}
        {drop > 0.8 && (
          <div style={{ position: "absolute", left: 236, top: 44, transform: "rotate(-8deg)" }}>
            <span style={{ ...mono(58, 900), color: hexa(RED, 0.9), letterSpacing: "0.1em",
              border: `7px solid ${hexa(RED, 0.82)}`, padding: "4px 16px", borderRadius: 6 }}>
              {R.sold}
            </span>
          </div>
        )}
      </div>

      {/* the mass */}
      <div style={{ position: "absolute", left: 20, top: -60, width: 24, height: y + 60,
        zIndex: 60, background: "linear-gradient(90deg,#8E8672,#33302A)" }} />
      <div style={{ position: "absolute", left: 250, top: y, width: 504, height: 250, zIndex: 62,
        borderRadius: "10px 10px 5px 5px",
        background: `linear-gradient(176deg, #7E7462 0%, #2E2A22 100%)`,
        border: "8px solid rgba(0,0,0,0.52)", boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 150, top: -54, width: 204, height: 62,
          borderRadius: 8, background: "#4A443A" }} />
        <div style={{ position: "absolute", left: 22, bottom: -20, right: 22, height: 30,
          background: dkh(RED, 0.24) }} />
      </div>
      {drop > 0.8 && (<>
        <Ring x={502} y={556} f={f} at={44} c="#F2C4B4" z={80} s={1.3} />
        <Puff x={502} y={600} f={f} at={44} c="#C6BCA2" z={78} />
      </>)}

      <Contact x={790} y={GY - 12} w={190} o={0.38} />
      <Hero f={f} x={880} y={GY} size={230} z={56} act={3} ph={0.3} costume={{ suit: 1 }}
        tint="#8E4A2E" gaze={-1} shock={f > 38 && f < 52 ? 1 : 0} cheer={f > 52 ? 1 : 0} />

      <Chip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} y={BAND_Y} c={INK}
        fg="#F6F2E8" s={0.94} z={94} />
      <Edge side="l" c="#1E1A14" w={100} z={93} kind="post" />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<SP>> = {
  /* ⭐ the shipped hook IS S0 — same code, so the candidate and the scene can
     never drift apart. Swapping the pick is one line in the assembly. */
  shutter: S0 as unknown as React.FC<SP>,
  haul: HookHaul,
  belt: HookBelt,
  stamp: HookStamp,
};
