import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
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
import { ToolObject } from "./BuildDraw";
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

export type HookId = "price" | "haul" | "belt" | "stamp" | "vault" | "tag" | "pile"
  | "swap" | "fan" | "tear";
type SP = { v: any; dur: number };

/** ⛔ THE BAND STATES THE CLAIM IN THE VIEWER'S WORDS — the outcome they want
    to be able to do, never the set and never the theme. Nothing here says "the
    trade row" or "the shutter". */
export const HOOK_BANDS: Record<HookId, { big: string; hot: string }> = {
  price:   { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  swap:    { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  fan:     { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  tear:    { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  haul:    { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  belt:    { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  stamp:   { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  vault:   { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  tag:     { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
  pile:    { big: "3 FREE AI TOOLS", hot: "SELL THEM ON FIVERR" },
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
        costume={{ constr: 1 }} stern={1} />
      <Forearm x0={246} y0={GY - 168} x1={148} y1={GY - 214} w={24} c={CLAY} z={58} />
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
        drive={Math.sin(f / 5) * 0.18} costume={{ constr: 1 }}
        cheer={f > 48 ? 1 : 0} shock={f > 34 && f < 48 ? 1 : 0} />
      {[0, 1].map(i => (
        <Crew key={"bc" + i} f={f} x={686 + i * 124} y={GY} i={i + 3} size={124} z={54}
          at={i * 4} />
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
      <Hero f={f} x={880} y={GY} size={230} z={56} act={3} ph={0.3} costume={{ suit: 1 }} gaze={-1} shock={f > 38 && f < 52 ? 1 : 0} cheer={f > 52 ? 1 : 0} />

      <Chip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} y={BAND_Y} c={INK}
        fg="#F6F2E8" s={0.94} z={94} />
      <Edge side="l" c="#1E1A14" w={100} z={93} kind="post" />
    </Scene>
  );
};


/* ===========================================================================
   ⭐⭐⭐ ROUND 2 OF HOOK CANDIDATES — Alex: *"hook scene needs to be more
   interesting, give a few more potential options."*

   ⛔ ALL FIVE NOW OBEY THE OX / UNLAZY SHAPE, frame-stripped off the delivered
   reels rather than remembered:
       ONE COLOSSAL OBJECT   ~45-60% of the panel, dwarfing the Claude
       IT ENTERS OR GROWS    it arrives, it is not revealed in place
       THE WORD IS ON IT     the payoff word is ON the object, not on a plate
   and the Claude stays SMALL and VISIBLE beside it — that scale gap is the
   image. Each candidate is a different MECHANISM and a different SILHOUETTE, so
   this is five concepts rather than one concept five ways.

   ⛔ AND NO SPRITE CARRIES A `tint` ANY MORE. The house clay is `#D97757` and
   OX and UNLAZY override it nowhere; this reel had every Claude at `#8E4A2E`,
   a dark brown, in 31 places, which is exactly why they read brown beside the
   references.
   ========================================================================= */

/* =========================================================================
   VAULT · REVELATION — a colossal round door, the widest silhouette in the set.
   `FREE` is CUT INTO the door face; it swings and the three machines are behind.
   ====================================================================== */
const HookVault: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("mill");
  const swing = E(f, 10, 52, 0, 1, IO);
  const spinW = E(f, 0, 14, 0, 1, IO);
  const step = E(f, 46, 66, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.46}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="joist" rake={0.11} rakeRate={5.0}
        lamp={{ x: 506, y: 250, r: 300 }} floorKind="slab" grit={0.7} />
      {/* what is behind it — three machines, lit, already running */}
      <div style={{ position: "absolute", left: 214, top: 220, width: 590, height: 470,
        zIndex: 20, background: "linear-gradient(178deg,#2A1E12 0%,#96702E 100%)",
        border: "8px solid rgba(0,0,0,0.5)" }}>
        {R.tools.map((t, i) => (
          <div key={"m" + i} style={{ position: "absolute", left: 30 + i * 182, top: 62,
            width: 158, height: 348, background: `linear-gradient(176deg, ${dkh(t.c, 0.26)} 0%, ${mxh(t.c, 0.06)} 100%)`,
            border: "5px solid rgba(0,0,0,0.44)" }}>
            <div style={{ position: "absolute", left: 32, top: 170, width: 96, height: 96,
              borderRadius: "50%", border: `12px solid ${mxh(t.c, 0.4)}`,
              transform: `rotate(${f * (5 + i * 2)}deg)` }} />
          </div>
        ))}
      </div>
      {/* ⭐ THE COLOSSAL DOOR — 520px round on a 1012 panel, swinging open */}
      <div style={{ position: "absolute", left: 176, top: 174, width: 620, height: 620,
        zIndex: 60, transformOrigin: "100% 50%",
        transform: `perspective(1400px) rotateY(${-swing * 96}deg)` }}>
        <svg width="620" height="620" viewBox="0 0 520 520">
          <circle cx="260" cy="260" r="252" fill="#6E7A82" stroke="rgba(0,0,0,0.55)" strokeWidth="10" />
          <circle cx="260" cy="260" r="228" fill="none" stroke="rgba(0,0,0,0.30)" strokeWidth="8" />
          <circle cx="260" cy="260" r="196" fill="#7E8A92" stroke="rgba(0,0,0,0.40)" strokeWidth="7" />
          {Array.from({ length: 16 }, (_, i) => (
            <circle key={"bo" + i} cx={260 + Math.cos((i / 16) * 6.283) * 224}
              cy={260 + Math.sin((i / 16) * 6.283) * 224} r="11" fill="#4A545C" />
          ))}
          {/* the spoked handwheel, turning before the door moves */}
          <g transform={`rotate(${spinW * 300} 260 260)`}>
            <circle cx="260" cy="260" r="92" fill="none" stroke="#3E464C" strokeWidth="18" />
            {[0, 60, 120].map(a => (
              <path key={"sk" + a} d="M172 260 L348 260" stroke="#3E464C" strokeWidth="16"
                strokeLinecap="round" transform={`rotate(${a} 260 260)`} />
            ))}
            <circle cx="260" cy="260" r="26" fill="#59636A" stroke="rgba(0,0,0,0.5)" strokeWidth="6" />
          </g>
          {/* ⭐ FREE, CUT INTO the door face */}
          <text x="260" y="150" textAnchor="middle" fill="#2E363C" fontSize="104"
            fontFamily="Georgia, serif" fontWeight="900" letterSpacing="7"
            stroke="rgba(255,255,255,0.22)" strokeWidth="2">FREE</text>
          <text x="260" y="410" textAnchor="middle" fill="#2E363C" fontSize="46"
            fontFamily="monospace" fontWeight="700" letterSpacing="5">$0</text>
        </svg>
      </div>
      <Contact x={780 - step * 120} y={GY - 12} w={196} o={0.4} z={56} />
      <Hero f={f} x={872 - step * 120} y={GY} size={222} z={58} act={0} ph={0.5}
        drive={spinW > 0 && spinW < 1 ? Math.sin(f / 3) * 0.3 : step * 0.4}
        costume={{ constr: 1 }} gaze={-0.9} cheer={swing > 0.7 ? 1 : 0} />
      <Chip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} y={BAND_Y} c={INK}
        fg="#F6F2E8" s={0.94} z={94} />
      <Edge side="l" c="#1C1308" w={92} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   TAG · SCALE — a colossal swing-tag drops on a chain and reads $0 · FREE, and
   the Claude is small enough to stand under it. The number IS the object.
   ====================================================================== */
const HookTag: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  const drop = E(f, 0, 22, 0, 1, IO);
  const swingA = f > 22 ? Math.sin((f - 22) * 0.34) * Math.exp(-(f - 22) / 34) * 13 : 0;
  const zero = E(f, 26, 40, 0, 1, BACK);
  const look = E(f, 24, 40, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Room p={p} f={f} bands={3} kind="shelf" overhead="gantry" rake={0.10} rakeRate={4.8}
        lamp={{ x: 506, y: 236, r: 300 }} floorKind="tile" grit={0.6} />
      <Runner y={214} f={f} z={20} rate={9.0} pitch={176} w={128} h={58} kind="load"
        c="#E6DCC0" c2="#2A2620" rail hang={12} o={0.8} />
      {/* the chain it hangs on */}
      <div style={{ position: "absolute", left: 498, top: -20, width: 14,
        height: 120 + drop * 200, zIndex: 58,
        background: "repeating-linear-gradient(180deg,#C9A15A 0 10px,#5E4A28 10px 20px)",
        transformOrigin: "50% 0%", transform: `rotate(${swingA * 0.5}deg)` }} />
      {/* ⭐ THE COLOSSAL TAG — 470x360, and the price is ON it */}
      <div style={{ position: "absolute", left: 270, top: 100 + drop * 200, width: 470,
        height: 360, zIndex: 62, transformOrigin: "50% -100px",
        transform: `rotate(${swingA}deg)` }}>
        <svg width="470" height="360" viewBox="0 0 470 360">
          <path d="M92 6 L444 6 Q464 6 464 26 L464 334 Q464 354 444 354 L92 354 L6 180 Z"
            fill="#F6EFDC" stroke="rgba(0,0,0,0.5)" strokeWidth="9" />
          <circle cx="72" cy="180" r="26" fill="#C9BFA6" stroke="rgba(0,0,0,0.5)" strokeWidth="8" />
          <path d="M140 62 L430 62 M140 300 L430 300" stroke="rgba(42,36,28,0.22)" strokeWidth="5" />
          <text x="300" y="216" textAnchor="middle" fill="#1A1813" fontSize="150"
            fontFamily="Georgia, serif" fontWeight="900"
            transform={`scale(${0.7 + zero * 0.3} 1) translate(${(1 - zero) * 128} 0)`}>$0</text>
          <text x="300" y="286" textAnchor="middle" fill="#C44A3A" fontSize="46"
            fontFamily="monospace" fontWeight="700" letterSpacing="8">FREE</text>
        </svg>
      </div>
      {/* the three machines on the counter underneath, small, waiting */}
      {R.tools.map((t, i) => (
        <div key={"mc" + i} style={{ position: "absolute", left: 190 + i * 232, top: 560,
          width: 168, height: 128, zIndex: 40, borderRadius: 6,
          background: `linear-gradient(176deg, ${mxh(t.c, 0.18)} 0%, ${dkh(t.c, 0.34)} 100%)`,
          border: "5px solid rgba(0,0,0,0.46)" }}>
          <div style={{ position: "absolute", left: 22, top: 30, width: 60, height: 60,
            borderRadius: "50%", border: `9px solid ${mxh(t.c, 0.42)}`,
            transform: `rotate(${f * (4 + i * 2)}deg)` }} />
        </div>
      ))}
      <Contact x={782} y={GY - 12} w={186} o={0.38} z={56} />
      <Hero f={f} x={872} y={GY} size={214} z={58} act={3} ph={0.8}
        costume={{ suit: 1 }} gaze={-1 * look} shock={zero > 0.2 && zero < 0.8 ? 1 : 0}
        cheer={f > 46 ? 1 : 0} />
      <Chip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} y={BAND_Y} c={INK}
        fg="#F6F2E8" s={0.94} z={94} />
      <Edge side="r" c="#1E1A14" w={92} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   PILE · ACCUMULATION — a chute pours machines out and they PILE UP past the
   Claude's head, burying him to the chest. `FREE` is stencilled on the chute.
   The closest of the five to UNLAZY's growth shape.
   ====================================================================== */
const HookPile: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("fitout");
  const pour = E(f, 4, 66, 0, 1, IO);
  const N = 14;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.11} rakeRate={5.4}
        lamp={{ x: 300, y: 240, r: 280 }} floorKind="slab" grit={0.7} />
      {/* ⭐ THE COLOSSAL CHUTE — 420px across the top, with FREE on its face */}
      <div style={{ position: "absolute", left: 296, top: 200, width: 420, height: 190,
        zIndex: 40, clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)",
        background: "linear-gradient(176deg,#8E8672 0%,#3A342A 100%)" }} />
      <div style={{ position: "absolute", left: 296, top: 214, width: 420, textAlign: "center",
        zIndex: 42 }}>
        <span style={{ fontFamily: "Georgia, serif", fontWeight: 900, fontSize: 82,
          color: "#F2E4C4", letterSpacing: "0.06em",
          textShadow: "0 3px 0 rgba(0,0,0,0.4)" }}>FREE</span>
      </div>
      {/* the pile — 14 machines falling and stacking past his head */}
      {Array.from({ length: N }, (_, i) => {
        const k = Math.max(0, Math.min(1, pour * N - i));
        if (k <= 0) return null;
        const col = i % 4, row = Math.floor(i / 4);
        const tx = 268 + col * 128 + (row % 2) * 44;
        const ty = 664 - row * 104;
        const t = R.tools[i % 3];
        const fall = 1 - k;
        return (
          <div key={"pm" + i} style={{ position: "absolute", left: tx, top: ty - fall * 420,
            width: 118, height: 96, zIndex: 50 + i, borderRadius: 6,
            transform: `rotate(${(i % 5 - 2) * 6 * k}deg)`,
            background: `linear-gradient(176deg, ${mxh(t.c, 0.20)} 0%, ${dkh(t.c, 0.34)} 100%)`,
            border: "5px solid rgba(0,0,0,0.46)" }}>
            <div style={{ position: "absolute", left: 14, top: 20, width: 52, height: 52,
              borderRadius: "50%", border: `8px solid ${mxh(t.c, 0.44)}`,
              transform: `rotate(${f * 6}deg)` }} />
            <div style={{ position: "absolute", right: 12, top: 26, width: 26, height: 40,
              borderRadius: 3, background: hexa("#000", 0.3) }} />
          </div>
        );
      })}
      {/* the Claude, buried to the chest by the end — UNLAZY's growth shape */}
      <Contact x={128} y={GY - 12} w={196} o={0.4} z={48} />
      <Hero f={f} x={222} y={GY} size={230} z={49} act={2} ph={0.6}
        strain={pour * 0.5} costume={{ constr: 1 }} shock={pour > 0.5 ? 1 : 0} />
      <Chip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} y={BAND_Y} c={INK}
        fg="#F6F2E8" s={0.94} z={94} />
      <Edge side="r" c="#1E1A14" w={92} z={93} kind="wall" />
    </Scene>
  );
};


/* ===========================================================================
   REV 8 · THREE NEW MECHANISMS.  *"the intro scene isnt interesting enough it's
   just the thing dropping down, we need a way more interesting concept."*

   ⛔ He is right and the diagnosis is one word. EVERY candidate so far has the
   same mechanism in a different costume: shutter/vault OPEN, haul/price/tag
   ARRIVE, belt/pile ACCUMULATE, stamp LANDS. **Nine hooks, one verb: something
   comes toward you.** `feedback_the_obvious_metaphor_is_often_wrong` and reel
   118's rule — NAME THE MECHANISM AS ONE WORD, THEN BUILD DIFFERENT WORDS.

   These are three words nothing before them was:

     swap  EXCHANGE       stock goes OUT one way, orders come back the other,
                          and they CROSS in mid-frame. This is the sentence's
                          actual verb: `feedback_illustrate_the_sentence_not_
                          the_set` — the mute test on "SELL" is a trade, not a
                          delivery. Six large bright objects on crossing arcs is
                          also the TOP ROW of the motion table (reel 132's
                          jester measured 10.90 on exactly that shape).
     fan   MULTIPLICATION ONE free tool, and it sprays into a wall of listings.
                          Not accumulation — nothing piles up; one source
                          divides. The anticipation is a physical charge you can
                          see building before it goes.
     tear  SUBTRACTION    ⭐ THE ONLY ONE THAT STARTS FULL. The frame opens
                          completely covered and is STRIPPED BACK to the three
                          machines. Nothing enters at any point, which is the
                          structural opposite of all nine before it.

   ⛔ NONE OF THEM RESOLVES. The exchange is still running, the fan is still
   spraying and the tear is still travelling at the cut.
   ========================================================================= */

/* ⭐ `PluginGem` now lives in BuildDraw.tsx — the BODY scenes need it too
   (rev 10), and the hook and the body must draw the SAME stone. */

/* ⭐⭐⭐ THE MARKETPLACE, BIG.  *"when you mention Fiverr and Upwork I wanna see
   the logo very big appearing on the screen, so it's very easy to understand."*
   The plate is NEAR-BLACK and the mark keeps its own brand colour — a brand SVG
   on its own brand ground is invisible, which this reel already shipped once. */
const BigMark: React.FC<{ x: number; y: number; k: number; mark: string; z?: number;
  w?: number; rot?: number }> = ({ x, y, k, mark, z = 96, w = 470, rot = 0 }) => {
  if (k <= 0) return null;
  const h = w * 0.62;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, opacity: Math.min(1, k * 3),
      transform: `scale(${0.52 + k * 0.48}) rotate(${rot * (1 - k)}deg)`,
      transformOrigin: "50% 50%",
      background: "linear-gradient(168deg,#2A2E36 0%,#171A20 100%)",
      border: "9px solid #0B0D11", borderRadius: 18 }}>
      <div style={{ position: "absolute", inset: 14, border: `4px solid ${hexa("#FFFFFF", 0.16)}`,
        borderRadius: 10 }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/" + mark)}
          style={{ width: w * 0.72, height: h * 0.5, objectFit: "contain" }} />
      </div>
    </div>
  );
};

/* a marketplace listing: the real mark, a title rule, a star row and a $0 chip.
   ⛔ the mark keeps its OWN pixels — a marketplace logo is never re-drawn. */
const GigCard: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  mark?: string; k?: number }> = ({ x, y, s = 1, z = 70, rot = 0, mark, k = 1 }) => (
  <div style={{ position: "absolute", left: x - 108 * s, top: y - 74 * s, width: 216 * s,
    height: 148 * s, zIndex: z, opacity: Math.min(1, k * 2.4),
    transform: `rotate(${rot}deg) scale(${0.66 + k * 0.34})`, transformOrigin: "50% 50%",
    background: "linear-gradient(172deg,#FDFAF2 0%,#DCD5C4 100%)",
    border: `${6 * s}px solid #191C22`, borderRadius: 8 * s, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46 * s,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      {mark ? <Img src={staticFile("logos/" + mark)}
        style={{ width: 116 * s, height: 34 * s, objectFit: "contain" }} /> : null}
    </div>
    <div style={{ position: "absolute", left: 14 * s, right: 14 * s, top: 54 * s, height: 7 * s,
      background: hexa("#191C22", 0.5) }} />
    <div style={{ position: "absolute", left: 14 * s, right: 62 * s, top: 69 * s, height: 7 * s,
      background: hexa("#191C22", 0.3) }} />
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"st" + i} style={{ position: "absolute", left: (14 + i * 19) * s, top: 86 * s,
        width: 13 * s, height: 13 * s, background: GOLD,
        clipPath: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
    ))}
    <div style={{ position: "absolute", right: 12 * s, bottom: 10 * s, padding: `${4 * s}px ${10 * s}px`,
      background: "#191C22", borderRadius: 5 * s, ...mono(20 * s, 900), color: "#F6EFDC" }}>$0</div>
  </div>
);

/* =========================================================================
   SWAP · EXCHANGE — ⭐ THE PICKED HOOK (rev 9).  Stock goes out to the right,
   orders come back to the left, and they CROSS. The counter is the fulcrum and
   the Claude works it.

   ⛔ *"it needs to be more interesting, polished — the gems and stuff, and more
   interesting throughout."*  "THROUGHOUT" is the operative word: the first cut
   had three launches and a payoff and nothing in between, so the middle third
   was three objects sliding at a constant rate. Rev 9 puts a beat on EVERY
   spoken word and gives the room a process that never stops:

     f0   "You"      the belt is ALREADY running, a gem already a third across
     f6   "sell"     ⭐ he WINDS UP and shoves — gem 1 accelerates off his hands
     f10  "three"    gem 2 launches on its own shove
     f14  "free"     gem 3 launches; three gems are now countable on the belt
     f26  "Claude"   ⭐ all three cross the lamp pool TOGETHER and FLARE
     f31  "plugins"  each name plate snaps on under its own stone
     f40  "on"       the return rail starts and the first order comes back
     f48  "Fiverr"   the mark lands CENTRE, alone, at ~55% of the panel
     f55  "Upwork"   it slides left and Upwork lands beside it

   ⛔ AND IT DOES NOT RESOLVE — the belt is still carrying, the orders are still
   arriving, and the fourth gem is entering frame as the shot cuts.
   ====================================================================== */
const HookSwap: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("front");
  /* ⛔ negative starts = pre-seeded. The trade is in progress at frame 0. */
  const OUT_AT = [-20, 6, 15, 26];
  const IN_AT = [40, 48, 56];
  const MARKS = ["si_fiverr.svg", "si_upwork.svg", "si_fiverr.svg"];
  const BELT_Y = 596;
  const LAMP_X = 606;                       /* where the stones catch the light */
  const tags = E(f, 31, 40, 0, 1, BACK);    /* "plugins" — the names snap on   */

  /* the hero's shove: a wind-up then a push, once per launch */
  const shove = OUT_AT.slice(1).reduce((a, at) =>
    a + (E(f, at - 5, at, 0, 1, IN_Q) - E(f, at, at + 8, 0, 1, OUT)), 0);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40}>
      <Room p={p} f={f} bands={3} kind="house" overhead="gantry" rake={0.12} rakeRate={5.2}
        lamp={{ x: 506, y: 200, r: 300 }} floorKind="slab" grit={0.7} />
      {[10, 890].map((x, i) => (
        <ShopFront key={"sf" + i} x={x} y={p.horizon + 10} s={0.6} c="#41506E" z={11} />
      ))}

      {/* ---- THE COUNTER, as a working roller belt --------------------- */}
      <div style={{ position: "absolute", left: -60, top: BELT_Y - 6, width: W + 120, height: 8,
        zIndex: 47, background: hexa("#FFFFFF", 0.34) }} />
      <div style={{ position: "absolute", left: -60, top: BELT_Y, width: W + 120, height: 26,
        zIndex: 46, background: mxh(STEEL, 0.30) }} />
      {/* ⭐ the rollers TURN, the whole width, the whole take. This is the thing
          that makes the middle of the shot alive rather than three sliding
          objects — `feedback_a_sway_is_not_motion`. */}
      {Array.from({ length: 17 }, (_, i) => {
        const rx = -50 + i * 68;
        return (
          <div key={"rl" + i} style={{ position: "absolute", left: rx, top: BELT_Y + 26,
            width: 56, height: 56, borderRadius: "50%", zIndex: 48,
            background: `conic-gradient(from ${(f * 13 + i * 24) % 360}deg, ${dkh(STEEL, 0.5)} 0 25%, ${mxh(STEEL, 0.34)} 25% 50%, ${dkh(STEEL, 0.5)} 50% 75%, ${mxh(STEEL, 0.34)} 75% 100%)`,
            border: "4px solid rgba(0,0,0,0.5)" }} />
        );
      })}
      <div style={{ position: "absolute", left: -60, top: BELT_Y + 78, width: W + 120, height: 60,
        zIndex: 46, background: `linear-gradient(180deg, ${dkh(STEEL, 0.36)} 0%, ${dkh(STEEL, 0.62)} 100%)` }} />
      {[70, 330, 590, 850].map((x, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: x, top: BELT_Y + 78, width: 20,
          height: 90, zIndex: 47, background: dkh(STEEL, 0.68) }} />
      ))}

      {/* the lamp the stones pass under — a real source, and the reason they
          flare on "Claude" instead of flaring because I said so */}
      <div style={{ position: "absolute", left: LAMP_X - 58, top: 214, width: 116, height: 34,
        zIndex: 30, borderRadius: "7px 7px 26px 26px",
        background: "linear-gradient(176deg,#8E8672,#2E2A22)", border: "4px solid rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: LAMP_X - 190, top: 248, width: 380, height: 400,
        zIndex: 29, opacity: 0.36, clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa("#FFF8E8", 0.95)} 0%, ${hexa("#FFF8E8", 0)} 100%)` }} />
      {/* ⛔ HOOK_LUMA fell 142.2 -> 140.2 against a hard 140 bar when the bright
          gem became the (darker) player object. A second practical over the
          belt buys the margin back from a REAL SOURCE, never from the palette's
          stops — `feedback_the_metric_makes_paper`. */}
      <div style={{ position: "absolute", left: 96, top: 216, width: 104, height: 30, zIndex: 30,
        borderRadius: "6px 6px 24px 24px", background: "linear-gradient(176deg,#8E8672,#2E2A22)",
        border: "4px solid rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 8, top: 246, width: 280, height: 360,
        zIndex: 29, opacity: 0.30, clipPath: "polygon(36% 0, 64% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa("#FFF8E8", 0.92)} 0%, ${hexa("#FFF8E8", 0)} 100%)` }} />

      {/* ⭐⭐⭐ STOCK OUT — four gems travelling RIGHT, each launched by its own
          shove, each flaring as it crosses the lamp, each trailing sparks. */}
      {OUT_AT.map((at, i) => {
        /* ⛔ each stone runs at its OWN rate, or four objects launched four
           frames apart travel as one clump and stop being countable. */
        const k = E(f, at, at + 50 + i * 7, 0, 1, LIN);
        if (k <= 0 || k >= 1) return null;
        const gx = -70 + k * 1210;
        const hop = Math.sin(k * Math.PI) * 40;
        /* the flare is a function of DISTANCE FROM THE LAMP, not of the clock */
        const near = Math.max(0, 1 - Math.abs(gx - LAMP_X) / 200);
        return (
          <React.Fragment key={"o" + i}>
            {/* the spark trail it leaves on the belt */}
            {Array.from({ length: 4 }, (_, q) => {
              const tk = k - (q + 1) * 0.022;
              if (tk <= 0) return null;
              return (
                <div key={"tr" + q} style={{ position: "absolute",
                  left: -70 + tk * 1210 - 4, top: BELT_Y - 40 - Math.sin(tk * Math.PI) * 40,
                  width: 8 - q, height: 8 - q, borderRadius: "50%", zIndex: 60,
                  background: hexa(R.tools[i % 3].c, 0.5 - q * 0.1) }} />
              );
            })}
            <ToolObject x={gx} y={BELT_Y - hop} s={1.06} i={i % 3} f={f} z={62}
              rot={-7 + k * 14} label={tags > 0.2} labelDy={(i % 3) * 34}
              glow={1 + near * 1.4} live={near} />
          </React.Fragment>
        );
      })}

      {/* ⭐ ORDERS BACK — listings travelling LEFT, higher, so the two streams
          CROSS instead of convoying, and they STACK up where they land. */}
      {IN_AT.map((at, i) => {
        const k = E(f, at, at + 46, 0, 1, LIN);
        if (k <= 0) return null;
        return (
          <GigCard key={"i" + i} x={1160 - k * 1180} y={330 + Math.sin(k * Math.PI) * -54}
            s={0.86} z={72} rot={9 - k * 18} mark={MARKS[i]} k={Math.min(1, k * 5)} />
        );
      })}

      {/* ⭐⭐⭐ THE PAYOFF — fiverr lands CENTRE and huge on its own word, alone,
          then slides left as Upwork lands beside it. */}
      <BigMark x={506 - E(f, 55, 64, 0, 234, IO)} y={286}
        w={568 - E(f, 55, 64, 0, 100, IO)} rot={-9}
        k={E(f, 48, 58, 0, 1, BACK)} mark="si_fiverr.svg" z={96} />
      <BigMark x={742} y={286} w={468} rot={9}
        k={E(f, 57, 67, 0, 1, BACK)} mark="si_upwork.svg" z={97} />

      {/* the Claude working the counter — he SHOVES each stone away, and the
          shove is a wind-up and a release, not a pose */}
      <Contact x={196} y={GY - 12} w={196} o={0.32} z={54} />
      <Hero f={f} x={196 - shove * 16} y={GY} size={236} z={58} act={1} ph={0.5}
        costume={{ constr: 1 }} drive={shove * 0.5} strain={Math.abs(shove) * 0.7}
        gaze={0.8} cheer={f > 58 ? 1 : 0} />
      <Forearm x0={252 - shove * 16} y0={GY - 168} x1={318 + shove * 78} y1={BELT_Y - 34}
        w={26} c={CLAY} z={60} />
      <Edge side="l" c="#1C2028" w={88} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   FAN · MULTIPLICATION — one free tool sprays into a wall of listings. Nothing
   piles up; ONE SOURCE DIVIDES, which is the half of the script that is
   actually surprising.
   ====================================================================== */
const HookFan: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("front");
  const N = 13;
  const burst = 18;
  /* ⭐ ANTICIPATION IS A PHYSICAL PROCESS YOU CAN SEE COMING (§25): the unit
     shakes harder and harder for eighteen frames before anything leaves it. */
  const charge = E(f, 0, burst, 0, 1, IN_Q);
  const shake = charge * Math.sin(f * 1.5) * 13;
  const MARKS = ["si_fiverr.svg", "si_upwork.svg"];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40}>
      <Room p={p} f={f} bands={3} kind="house" overhead="gantry" rake={0.11} rakeRate={5.0}
        lamp={{ x: 506, y: 210, r: 330 }} floorKind="slab" grit={0.7} />
      {[6, 894].map((x, i) => (
        <ShopFront key={"sf" + i} x={x} y={p.horizon + 10} s={0.6} c="#41506E" z={11} />
      ))}
      <div style={{ position: "absolute", left: 452, top: 646, width: 308, height: 64, zIndex: 40,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.5)} 100%)`,
        border: "6px solid rgba(0,0,0,0.5)" }} />

      {/* ⭐ THE FAN — thirteen listings leaving ONE unit on their own arcs,
          spread over the whole take so it is still spraying at the cut. */}
      {Array.from({ length: N }, (_, i) => {
        const at = burst + i * 3.6;
        const k = E(f, at, at + 40, 0, 1, LIN);
        if (k <= 0) return null;
        const a = (-0.94 + (i / (N - 1)) * 1.88);          /* the spread */
        const r = 130 + k * 620;
        const x = 606 + Math.sin(a) * r;
        const y = 560 - Math.cos(a) * r * 0.68 - Math.sin(k * Math.PI) * 40;
        return (
          <GigCard key={"g" + i} x={x} y={y} s={0.50 + k * 0.30} z={64 + (i % 3)}
            rot={a * 34 + k * (i % 2 ? 22 : -22)} mark={i % 4 === 0 ? MARKS[i % 2] : undefined}
            k={Math.min(1, k * 6)} />
        );
      })}

      {/* ⭐ THE ONE UNIT EVERYTHING COMES OUT OF — it stays, and it keeps going */}
      {/* ⛔ THE UNIT WAS DRAWN ON TOP OF THE CLAUDE — z70 over z56 at the same x,
          so he rendered as two legs under a machine. The source sits right of
          centre and he stands clear of it, which is also the scale gap. */}
      <ToolObject x={606} y={648} s={1.44} i={0} f={f} z={70} rot={shake * 0.4} glow={1 + charge * 0.9} />
      <Ring x={606} y={548} f={f} at={burst} c="#EAF2FF" z={69} s={2.2} />

      {/* ⭐⭐⭐ THE PAYOFF — the marks BIG, on their own words, over the fan */}
      {/* ⛔ held to 430 and dropped to y300 so the fan is still visible above and
          between them — the spray IS this concept, and burying it under the
          payoff would leave the two hooks indistinguishable at the cut. */}
      <BigMark x={506 - E(f, 53, 62, 0, 238, IO)} y={300}
        w={530 - E(f, 53, 62, 0, 100, IO)} rot={-10}
        k={E(f, 48, 58, 0, 1, BACK)} mark="si_fiverr.svg" z={96} />
      <BigMark x={744} y={300} w={430} rot={10}
        k={E(f, 55, 65, 0, 1, BACK)} mark="si_upwork.svg" z={97} />

      <Contact x={196} y={GY - 12} w={176} o={0.3} z={54} />
      <Hero f={f} x={196} y={GY} size={212} z={56} act={3} ph={0.3}
        costume={{ constr: 1 }} shock={f > burst && f < burst + 16 ? 1 : 0}
        cheer={f > burst + 18 ? 1 : 0} gaze={-0.6} />
      <Edge side="r" c="#1C2028" w={88} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   TEAR · SUBTRACTION — ⭐ THE ONLY HOOK IN THE SET THAT STARTS FULL. The frame
   opens completely covered by one wrapped sheet and is STRIPPED BACK to the
   three machines already running behind it. Nothing arrives at any point.
   ====================================================================== */
const HookTear: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("front");
  const grab = E(f, 0, 10, 0, 1, OUT);
  /* ⛔ it is STILL TEARING at the cut — a hook must not resolve.
     ⛔⛔ AND IT IS **LINEAR**, NOT EASED. `feedback_uniform_field_repaints_
     nothing`: a cream sheet sliding is a uniform field, and the only pixels
     that actually change are the ones it UNCOVERS. An IO ease puts almost all
     of that reveal into a few middle frames and leaves the ends dead — this
     scene measured 5.97 against swap's 9.30 for exactly that reason. A constant
     rate uncovers the same area every frame of the take. */
  const rip = E(f, 4, 82, 0, 1, LIN);         /* the tear travels the frame */
  const flap = Math.sin(f / 5.4);
  const MARKS = ["si_fiverr.svg", "si_upwork.svg"];
  /* the ragged edge — a real tear is not a straight line */
  /* ⛔⛔ BOTH HALVES TAKE THE **SAME** SEAM. The first build offset each side by
     6% away from centre, which left up to 22% of the frame width uncovered down
     the middle — it rendered as a bowtie-shaped hole, not a tear. A tear is one
     line that two pieces share. */
  const seamAt = (i: number) => 50 + Math.sin(i * 2.7) * 3.4 + Math.sin(i * 1.1) * 2.2;
  const edge = (dir: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 16; i++) pts.push(`${seamAt(i)}% ${(i / 16) * 100}%`);
    /* ⛔ BOTH SIDES WALK THE SEAM IN THE SAME ORDER — only the corner anchors
       differ. Reversing the point list for the right half made the polygon
       self-intersect, which rendered as a giant X across the frame. */
    return dir < 0
      ? `polygon(0% 0%, ${pts.join(", ")}, 0% 100%)`
      : `polygon(100% 0%, ${pts.join(", ")}, 100% 100%)`;
  };
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40}>
      <Room p={p} f={f} bands={3} kind="house" overhead="gantry" rake={0.11} rakeRate={5.0}
        lamp={{ x: 506, y: 210, r: 320 }} floorKind="slab" grit={0.7} />

      {/* ⭐ THREE GEMS, countable, already there behind the wrap.
          ⛔ pulled inward from x=172/840: the outer NAME PLATES ran off the panel
          and clipped to "NEY PRINTER TURBO". The gem fits where its label does
          not — place a labelled object by its LABEL's width, not the object's. */}
      {R.tools.map((t, i) => (
        <ToolObject key={"m" + i} x={216 + i * 290} y={676} s={1.04} i={i} f={f} z={40}
          rot={i === 1 ? 0 : (i ? 4 : -4)} />
      ))}
      {/* ⭐⭐⭐ THE PAYOFF — the marks BIG, revealed by the tear */}
      <BigMark x={506 - E(f, 53, 62, 0, 238, IO)} y={272}
        w={560 - E(f, 53, 62, 0, 98, IO)} rot={-10}
        k={E(f, 48, 58, 0, 1, BACK)} mark="si_fiverr.svg" z={82} />
      <BigMark x={744} y={272} w={462} rot={10}
        k={E(f, 55, 65, 0, 1, BACK)} mark="si_upwork.svg" z={83} />

      {/* ⭐⭐⭐ THE WRAP — two halves of one sheet, tearing apart down a ragged
          seam and sliding off frame. At f0 it covers everything, which is also
          how frame 0 stays bright without lighting the set for it. */}
      {[-1, 1].map((dir) => (
        <div key={"w" + dir} style={{ position: "absolute", inset: 0, zIndex: 86,
          clipPath: edge(dir),
          transform: `translateX(${dir * rip * 700}px) rotate(${dir * (rip * 7 + flap * rip * 3.4)}deg) skewY(${dir * flap * rip * 2.6}deg)`,
          transformOrigin: dir < 0 ? "0% 50%" : "100% 50%",
          background: `linear-gradient(${dir < 0 ? 96 : 84}deg, #F7F3E6 0%, #E2DBC8 46%, #CFC7B2 100%)` }}>
          {/* the creases that make it a SHEET and not a rectangle */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"cz" + i} style={{ position: "absolute", top: 0, bottom: 0,
              left: `${7 + i * 11}%`, width: 3,
              background: hexa("#8E8672", 0.30 + (i % 2) * 0.16) }} />
          ))}
          {/* the packing tape running down it */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: dir < 0 ? "62%" : "26%",
            width: 74, background: hexa("#C9A15A", 0.34),
            borderLeft: `3px solid ${hexa("#8E7A46", 0.5)}`,
            borderRight: `3px solid ${hexa("#8E7A46", 0.5)}` }} />
          <div style={{ position: "absolute", left: dir < 0 ? 150 : "auto", right: dir < 0 ? "auto" : 150,
            top: 292, ...ui(60, 900), color: "#2A2C31", letterSpacing: 4,
            transform: `rotate(${dir * -3}deg)` }}>{dir < 0 ? "3 TOOLS" : "$0"}</div>
        </div>
      ))}

      {/* ⭐ the shreds coming off the seam. Small fast objects crossing the
          middle of the frame, where the reveal is happening. */}
      {rip > 0.02 && Array.from({ length: 9 }, (_, i) => {
        const t = ((f * 0.021) + i * 0.111) % 1;
        const dir = i % 2 ? 1 : -1;
        return (
          <div key={"sh" + i} style={{ position: "absolute",
            left: 506 + dir * t * 470 - 26, top: 150 + ((i * 83) % 520) - t * 90,
            width: 52 + (i % 3) * 16, height: 30 + (i % 4) * 10, zIndex: 87,
            opacity: (1 - t) * 0.92,
            transform: `rotate(${dir * t * 260 + i * 37}deg)`,
            background: i % 2 ? "#F2EDDD" : "#DCD5C2",
            border: "3px solid rgba(0,0,0,0.22)" }} />
        );
      })}

      {/* the Claude doing the tearing — his arm is what starts it */}
      <Contact x={506} y={GY - 12} w={190} o={0.32} z={88} />
      <Hero f={f} x={506} y={GY} size={228} z={90} act={1} ph={0.4}
        costume={{ constr: 1 }} strain={grab * (1 - rip * 0.5)}
        drive={rip > 0 && rip < 1 ? Math.sin(f / 2.4) * 0.34 : 0}
        stern={rip > 0.1 && rip < 0.9 ? 1 : 0} cheer={rip >= 1 ? 1 : 0} />
      {/* his arm IS the tear — it tracks the right-hand sheet's edge */}
      <Forearm x0={556} y0={GY - 150} x1={588 + rip * 250} y1={GY - 246 - rip * 54}
        w={26} c={CLAY} z={91} />
      <Edge side="l" c="#1C2028" w={88} z={93} kind="post" />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<SP>> = {
  /* ⭐ the shipped hook IS S0 — same code, so the candidate and the scene can
     never drift apart. Swapping the pick is one line in the assembly. */
  /* ⛔ the picked hook ALIASES S0 so the candidate and the shipped scene
     can never drift apart. Renamed shutter -> price at rev 6: the object is a
     price tag now, and the deliverable names its files by this id. */
  price: S0 as unknown as React.FC<SP>,
  haul: HookHaul,
  belt: HookBelt,
  stamp: HookStamp,
  vault: HookVault,
  tag: HookTag,
  pile: HookPile,
  swap: HookSwap,
  fan: HookFan,
  tear: HookTear,
};
