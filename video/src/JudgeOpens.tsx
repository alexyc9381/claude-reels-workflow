import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Mark, Contact, Edge, Ring, Puff, Steam, Sweat, Fall, Motes, Pool, Beam,
  Crew, Hero, Forearm, mono, Runner,
  R, asPlace, GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, INK, MUTE, TEAL, STEEL, BRASS, SODIUM, EMBER, OXBLOOD,
} from "./JudgeWorld";
import {
  BigSeal, RawWork, Gallery, ExhibitWall, Plaque, SealShell, SealCarcass, Brief,
} from "./JudgeProps";
import { Room } from "./HwSets";

/* ===========================================================================
   REEL 132 · "JUDGE" — FIVE OPENS, FIVE MECHANISMS.

   ⛔⛔⛔ THE SECOND TIME A NOTE LANDS ON THE SAME OBJECT, THE OBJECT IS WRONG.
   This hook has now been rejected twice — first as a chart recorder measuring
   a lie (*"needs to be way more interesting like OX UNLAZY BOSS"*), then as a
   Claude holding a cracking seal (*"the hook animation is not good whatsoever,
   needs to be so much more interesting, redone"*). Tuning the second one would
   be the reel-124 failure verbatim: four rounds spent refining a thing that
   should not have existed.

   ⛔ AND I HAVE NOW SKIPPED `docs/THE-OPEN.md` STEP 1 TWICE. It says: *the first
   build step of any reel is not scene 0, it is N CONCEPTS for scene 0, rendered
   at full quality, PICKED before a single scene file is written.* I authored one
   and defended it, twice. So: five, all built, none defended.

   ⭐ WHAT THE THIRD DIAGNOSIS ADDED. Frame-stripping OX and UNLAZY again, the
   thing the seal open was missing is not weight — it is **a huge, fast TRAVEL or
   GROWTH in the first second**. UNLAZY's balloon goes from nothing to half the
   frame in about a second. OX's bull crosses the whole panel. The seal sat in
   one place and cracked, which is detail, and detail does not survive a thumb.

   Every open below is built to the same three requirements and differs only in
   MECHANISM:
     · a CLAUDE is the subject and the work goes through his body
     · something LARGE moves a LONG WAY, or grows hugely, inside the first second
     · the set is dense — a near-camera crowd band and countable content behind

     A  tower   GROWTH + COLLAPSE   a stack of DONE plaques rockets past the top
                                    of frame, then topples across the whole panel
     B  stamp   IMPACT              a 500px DONE stamp falls the full height and
                                    flattens him
     C  haul    TRAVEL + REVEAL     he hauls a colossal seal up out of a pit and
                                    the gold FACE falls off it
     D  charge  CHARGE              a runaway DONE seal crosses the frame and
                                    drives him back the whole width
     E  scan    TRANSFORM           he wheels the gold monolith through an arch
                                    and a carcass comes out the far side
   ========================================================================= */

type SP = { v: any; dur: number };
export type OpenId = "tower" | "stamp" | "haul" | "charge" | "scan";

export const OPEN_BANDS: Record<OpenId, { big: string; hot: string }> = {
  tower:  { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  stamp:  { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  haul:   { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  charge: { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  scan:   { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
};

/* ---- the shared set. Identical in all five so the PICK is about the
   MECHANISM and nothing else. ---------------------------------------------- */
const OpenSet: React.FC<{ f: number; react?: number; band?: boolean }> =
  ({ f, react = 0, band = true }) => (
  <>
    <ExhibitWall x={506} y={572} w={1010} h={258} z={16} f={f} cols={9} rows={3}
      c="#7A5230" lit={0.55} flagged={0} />
    <Runner y={116} f={f} z={14} rate={7.6} pitch={186} w={152} h={78}
      c="#C9B48C" c2="#2E2116" kind="crate" rail hang={20} o={0.9} />
    <div style={{ position: "absolute", left: -40, top: 664, width: 1100, height: 26,
      zIndex: 22, overflow: "hidden", background: "#2A2116" }}>
      {Array.from({ length: 26 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: i * 46 - 20, top: -6, width: 26,
          height: 40, transform: "skewX(-26deg)", background: i % 2 ? "#E7B24C" : "#241C12" }} />
      ))}
    </div>
    {band && (
      <Gallery f={f} x0={-90} x1={1102} y={GY + 96} n={7} ranks={1} size={168} z={78}
        at={-22} react={react} seed={4} />
    )}
  </>
);

const Frame: React.FC<{ children: React.ReactNode; dur: number; f: number; glowK?: number }> =
  ({ children, dur, f, glowK = 0.16 }) => {
  const p = asPlace("stand");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.34} glow={hexa(p.key, glowK)}>
      <Cam s={1.0} z={1}>
        <Room p={p} f={f} bands={2} kind="shelf" overhead="gantry"
          rake={0.08} rakeRate={2.6} rakeN={5} floorKind="boards" grit={0.6}
          lamp={{ x: 862, y: 150, r: 180 }} window={null} />
        {children}
        <Edge side="r" c="#2E1C0C" w={78} z={90} top={150} />
      </Cam>
      <Chip t={R.lie} y={BAND_Y} x={SAFE3.cx} c={GREEN} fg="#04241C" s={0.94} z={94} />
    </Scene>
  );
};

/* =========================================================================
   A · `tower` — GROWTH THEN COLLAPSE.
   A chute feeds gold DONE plaques and he stacks them. The stack accelerates —
   one every six frames, then three, then two — and rockets 700px past the top
   of the frame in about a second and a half. He climbs to keep up. Then the
   whole thing topples 80 degrees ACROSS the panel and buries him, and one hand
   comes out of the pile still holding a plaque.
   ⭐ This is the only one of the five whose motion is GROWTH, which is what
   UNLAZY's balloon actually does.
   ====================================================================== */
export const OpenTower: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const AT = [2, 8, 14, 19, 23, 27, 30, 33, 36, 39, 42, 45];
  const n = AT.filter(a => f >= a).length;
  const fall = E(f, 52, 66, 0, 1, IN_Q);
  const settle = f > 66 ? Math.sin((f - 66) * 0.9) * Math.exp(-(f - 66) / 7) * 8 : 0;
  const PH = 58;                                   /* plaque pitch */
  const BX = 430, BY = GY - 10;
  const lean = Math.min(1, n / 12);
  return (
    <Frame dur={dur} f={f}>
      <OpenSet f={f} react={fall > 0.7 ? 1 : 0} />
      {/* the chute the claims come out of */}
      <div style={{ position: "absolute", left: 300, top: 96, width: 230, height: 92, zIndex: 30,
        background: `linear-gradient(180deg, #4A3A24 0%, #2A2016 100%)`, transform: "skewX(-12deg)" }} />
      <div style={{ position: "absolute", left: 306, top: 176, width: 218, height: 15, zIndex: 31,
        background: "#6E5A38" }} />

      {/* THE STACK — it grows past the top of frame, then goes over */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 792, zIndex: 50,
        transform: `rotate(${fall * 82 + settle}deg)`, transformOrigin: `${BX}px ${BY}px` }}>
        {Array.from({ length: 12 }, (_, i) => {
          if (i >= n) return null;
          const at = AT[i];
          const drop = E(f, at, at + 4, 0, 1, IN_Q);
          const y = BY - i * PH - (1 - drop) * 420;
          const wob = Math.sin(f / 6 + i) * lean * (i * 0.9);
          return <Plaque key={"pq" + i} x={BX + wob + (i % 2 ? 9 : -9)} y={y} w={244}
            rot={(rnd(i, 3) - 0.5) * 7 + lean * (i * 0.8)} z={50 + i} />;
        })}
      </div>

      {/* he climbs as it grows, then goes under it */}
      <Contact x={BX + 130} y={GY} w={210} z={41} o={0.38} />
      <Hero f={f} x={BX + 232} y={GY - Math.min(150, n * 13) * (1 - fall)} size={218} z={60}
        act={1} ph={0.3} costume={{ constr: 1 }}
        strain={Math.min(0.9, n / 14) * (1 - fall)} cheer={n > 9 && fall < 0.2 ? 0.5 : 0}
        shock={E(f, 52, 58, 0, 1, OUT) - E(f, 74, 84, 0, 1, IO)}
        lift={-fall * 90} />
      <Steam x={BX + 232} y={GY - Math.min(150, n * 13) - 226} f={f} at={16} n={9} z={64} s={1.1} />
      {/* the ladder he is standing on, so the climb is a MECHANISM */}
      <div style={{ position: "absolute", left: BX + 190, top: GY - 160, width: 86, height: 170,
        zIndex: 44, opacity: 1 - fall }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ position: "absolute", left: 0, top: i * 42, width: 86, height: 12,
            background: "#8A6A3E" }} />
        ))}
        {[0, 74].map((lx, i) => (
          <div key={"u" + i} style={{ position: "absolute", left: lx, top: 0, width: 12, height: 170,
            background: "#6E5230" }} />
        ))}
      </div>
      {fall > 0.9 && <Puff x={BX + 260} y={GY} f={f} at={66} c="#D8C8A4" z={80} n={19} />}
      {fall > 0.9 && <Ring x={BX + 300} y={GY - 20} f={f} at={66} c="#FFE8B0" z={81} s={2.0} dur={22} />}
    </Frame>
  );
};

/* =========================================================================
   B · `stamp` — IMPACT.
   A 500px DONE stamp hangs at the top of frame on a piston, rises (the
   anticipation), then falls the FULL HEIGHT in four frames and flattens him to
   a third of his height. He springs back holding the plate it left, and the
   plate is already cracked.
   ====================================================================== */
export const OpenStamp: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const lift = E(f, 4, 20, 0, 1, IO);
  /* ⛔ A VALUE THAT PLATEAUS FREEZES WHAT IT DRIVES. v1 had no retract, so the
     stamp sat on top of the hero for forty frames — and its travel put the gold
     face 80px BELOW the panel floor, which is why the beat read as a tan slab
     with no word on it. It now lands ON him and comes back up. */
  const drop = E(f, 22, 26, 0, 1, IN_Q) - E(f, 32, 46, 0, 0.86, IO);
  const hit = f >= 26;
  const back = E(f, 30, 44, 0, 1, OUT);
  const squash = drop * (1 - back);
  const shake = hit && f < 36 ? Math.sin((f - 26) * 1.7) * Math.exp(-(f - 26) / 4) * 18 : 0;
  const HX = 470;
  const stampY = -200 - lift * 70 + drop * 676;
  return (
    <Frame dur={dur} f={f}>
      <OpenSet f={f} react={hit ? 1 : 0} />
      {/* the piston and its frame */}
      {[HX - 236, HX + 200].map((cx, i) => (
        <div key={i} style={{ position: "absolute", left: cx, top: -30, width: 40, height: 760,
          zIndex: 24, background: `linear-gradient(90deg, #3A424A 0%, #171D24 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: HX - 18, top: -40, width: 36,
        height: Math.max(0, stampY + 200), zIndex: 26, background: "#39434D" }} />
      {/* THE STAMP */}
      <div style={{ position: "absolute", left: HX - 250, top: stampY, width: 500, height: 300,
        zIndex: 62 }}>
        <svg viewBox="0 0 500 300" width={500} height={300} style={{ overflow: "visible" }}>
          <rect x={40} y={0} width={420} height={150} rx={16} fill="#7A5A22" />
          <rect x={40} y={0} width={420} height={26} rx={13} fill="#E0BE7E" />
          <rect x={90} y={150} width={320} height={40} fill="#5E4414" />
          <rect x={20} y={190} width={460} height={104} rx={8} fill={GOLD} />
          <rect x={20} y={190} width={460} height={16} rx={8} fill="#F6E2B0" />
          <text x={250} y={262} textAnchor="middle" fill="#4A3208"
            style={{ ...mono(58, 800), letterSpacing: 10 }}>{R.lie}</text>
        </svg>
      </div>
      {/* the anvil he stands on */}
      <div style={{ position: "absolute", left: HX - 190, top: GY - 8 + shake * 0.3, width: 380,
        height: 74, zIndex: 44, background: `linear-gradient(180deg, #4A4038 0%, #16120E 100%)` }} />
      <Contact x={HX - 110} y={GY - 10} w={220} z={43} o={0.4} />
      <Hero f={f} x={HX} y={GY - 12} size={230} z={60} act={3} ph={0.2}
        costume={{ constr: 1 }} strain={squash} shock={E(f, 24, 28, 0, 1, OUT) - back}
        stern={back} pop={1 - squash * 0.62} />
      {hit && f < 42 && <Ring x={HX} y={GY - 30} f={f} at={26} c="#FFE8B0" z={80} s={2.4} dur={18} />}
      {hit && <Puff x={HX} y={GY} f={f} at={26} c="#D8C8A4" z={79} n={21} />}
      {hit && <Fall x={HX} y={GY - 240} w={420} f={f} at={26} n={16} z={78} c="#E7B24C" rate={1.5} />}
      {/* what it left behind, already cracked */}
      {back > 0.4 && <Plaque x={HX + 190} y={GY - 96} w={210} rot={-9} z={70}
        crack={E(f, 44, 56, 0, 1, OUT)} />}
    </Frame>
  );
};

/* =========================================================================
   C · `haul` — TRAVEL, THEN THE REVEAL.
   He hauls hand over hand and walks BACKWARDS across 560px of floor while a
   colossal seal rises 520px out of a pit on the chain. It clears the lip, hangs
   for four frames — and the gold FACE falls off it like a shell, leaving a bare
   carcass. He sits down hard.
   ⭐ Two long travels at right angles, and the reveal is a SUBTRACTION.
   ====================================================================== */
export const OpenHaul: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const pull = E(f, 2, 40, 0, 1, IO);
  const hang = E(f, 40, 46, 0, 1, OUT);
  const shell = E(f, 48, 62, 0, 1, IN_Q);
  const sit = E(f, 50, 58, 0, 1, BACK) - E(f, 74, 86, 0, 1, IO);
  const HX = 236 + pull * 540;
  const SY = 900 - pull * 560;
  return (
    <Frame dur={dur} f={f}>
      <OpenSet f={f} react={shell > 0.6 ? 1 : 0} />
      {/* the pit and its lip */}
      <div style={{ position: "absolute", left: 96, top: 630, width: 420, height: 162, zIndex: 40,
        background: "#100C08" }} />
      <div style={{ position: "absolute", left: 84, top: 620, width: 444, height: 22, zIndex: 41,
        background: `linear-gradient(180deg, #8A6A3E 0%, #4A3A22 100%)` }} />
      {/* the gantry and the chain */}
      <div style={{ position: "absolute", left: -30, top: 130, width: 1080, height: 26, zIndex: 30,
        background: `linear-gradient(180deg, #56606A 0%, #232B33 100%)` }} />
      <div style={{ position: "absolute", left: 300, top: 150, width: 12,
        height: Math.max(0, SY - 150), zIndex: 42, background: "#39434D" }} />
      {/* THE LOAD */}
      <SealShell x={306} y={SY} d={430} z={64} off={shell} />
      <SealCarcass x={306} y={SY} d={430} z={60} k={shell > 0.05 ? Math.min(1, shell * 2.4) : 0} />
      {/* the pit's own light, so the carcass is a SILHOUETTE against something
          rather than a black disc on a bone wall */}
      {shell > 0.1 && (
        <div style={{ position: "absolute", left: 106, top: 560, width: 400, height: 120,
          zIndex: 39, background: `radial-gradient(ellipse at 50% 100%, ${hexa("#FFC06A", 0.7 * shell)} 0%, ${hexa("#FFC06A", 0)} 72%)` }} />
      )}
      {/* the rope he is hauling — it connects two things both on screen */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 58, overflow: "visible" }}>
        <path d={`M 306 ${SY - 200} L 700 190 L ${HX + 60} ${GY - 150}`} fill="none"
          stroke="#5E4A30" strokeWidth={11} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", left: 660, top: 150, width: 82, height: 82,
        borderRadius: "50%", zIndex: 59, background: "#39434D",
        border: "9px solid #6E7A86", transform: `rotate(${pull * 900}deg)` }}>
        <div style={{ position: "absolute", left: 28, top: 4, width: 8, height: 56,
          background: "#8C98A4" }} />
      </div>
      <Contact x={HX - 106} y={GY} w={212} z={41} o={0.38} />
      <Hero f={f} x={HX} y={GY} size={224} z={62} act={1} ph={0.4} flip
        costume={{ constr: 1 }} strain={pull * 0.9 * (1 - shell)}
        drive={-pull * 0.10} shock={shell} lift={-sit * 46} />
      <Forearm x0={HX + 224 * 0.34} y0={GY - 224 * 0.50} x1={HX + 78} y1={GY - 158}
        w={25} c={CLAYD} z={63} />
      <Steam x={HX} y={GY - 232} f={f} at={10} n={9} z={66} s={1.1} />
      <Sweat x={HX} y={GY - 170} f={f} at={16} n={9} z={67} />
      {shell > 0.5 && <Puff x={306} y={SY + 190} f={f} at={54} c="#C8B896" z={70} n={15} />}
    </Frame>
  );
};

/* =========================================================================
   D · `charge` — THE RUNAWAY CLAIM.
   A colossal seal on a bogie comes in from frame right at speed, crosses 700px
   in half a second, and drives him back the WHOLE WIDTH with his heels dug in.
   It pins him to the left wall and cracks on the impact.
   ⭐ This is OX's own shape — a mass crossing the panel into a braced body —
   with the reel's own object instead of a bull.
   ====================================================================== */
export const OpenCharge: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ THE CHARGE HAS TO CROSS THE PANEL. v1 came 480px and then pushed 330,
     so most of the travel was already spent before the contact. It now enters
     from fully off-frame right and the two of them cover 900px together. */
  const run = E(f, 2, 18, 0, 1, IN_Q);
  const push = E(f, 18, 50, 0, 1, IO);
  const hit = f >= 18;
  const jolt = hit && f < 28 ? Math.sin((f - 18) * 1.5) * Math.exp(-(f - 18) / 5) * 18 : 0;
  const SX = 1320 - run * 560 - push * 400;
  const HX = 760 - push * 470;
  return (
    <Frame dur={dur} f={f}>
      <OpenSet f={f} react={push > 0.7 ? 1 : 0} />
      {/* the wall he ends up against */}
      <div style={{ position: "absolute", left: -40, top: 240, width: 150, height: 480, zIndex: 40,
        background: `linear-gradient(90deg, #3A2A16 0%, #6E5230 100%)` }} />
      {/* the rail it runs on */}
      <div style={{ position: "absolute", left: -40, top: GY + 6, width: 1120, height: 14,
        zIndex: 42, background: "#4A545E" }} />
      {/* THE RUNAWAY */}
      <div style={{ position: "absolute", left: SX - 240, top: GY - 486 + jolt * 0.4, width: 480,
        height: 486, zIndex: 62 }}>
        <BigSeal x={240} y={216} d={430} z={62} f={f} fail={Math.min(1, push * 0.9)}
          burst={0} bow={0} rot={-run * 8 - push * 6} />
        {/* the bogie under it */}
        <div style={{ position: "absolute", left: 90, top: 400, width: 300, height: 46, zIndex: 61,
          background: `linear-gradient(180deg, #4A545E 0%, #1A2026 100%)` }} />
        {[130, 250].map((cx, i) => (
          <div key={i} style={{ position: "absolute", left: cx, top: 430, width: 62, height: 62,
            borderRadius: "50%", zIndex: 63, background: "#2A323A", border: "8px solid #6E7A86",
            transform: `rotate(${-(run * 480 + push * 330) * 1.6}deg)` }}>
            <div style={{ position: "absolute", left: 20, top: 3, width: 6, height: 40,
              background: "#98A4B0" }} />
          </div>
        ))}
      </div>
      {/* the skid he leaves */}
      {push > 0.05 && (
        <div style={{ position: "absolute", left: HX - 20, top: GY - 12, width: push * 420,
          height: 16, zIndex: 43, background: hexa("#2A2016", 0.42) }} />
      )}
      <Contact x={HX - 104} y={GY} w={208} z={41} o={0.38} />
      <Hero f={f} x={HX} y={GY} size={226} z={64} act={1} ph={0.2} flip
        costume={{ constr: 1 }} strain={hit ? 0.85 : run * 0.3}
        shock={E(f, 16, 20, 0, 1, OUT) - E(f, 40, 52, 0, 1, IO)} stern={push} />
      <Forearm x0={HX + 226 * 0.30} y0={GY - 226 * 0.52} x1={HX + 118} y1={GY - 210}
        w={26} c={CLAYD} z={65} />
      <Steam x={HX} y={GY - 234} f={f} at={22} n={9} z={68} s={1.1} />
      {hit && <Puff x={HX + 70} y={GY} f={f} at={18} c="#D8C8A4" z={70} n={17} />}
      {hit && <Ring x={HX + 90} y={GY - 150} f={f} at={18} c="#FFE8B0" z={71} s={1.8} dur={18} />}
      {push > 0.02 && Array.from({ length: 9 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute",
          left: HX + 60 + rnd(i, 3) * 60 - ((f * 9 + i * 22) % 160),
          top: GY - 16 - ((f * 5 + i * 13) % 60), width: 10, height: 10, borderRadius: 5,
          zIndex: 72, background: hexa("#FFD08A", 0.5 + (i % 3) * 0.2) }} />
      ))}
    </Frame>
  );
};

/* =========================================================================
   E · `scan` — TRANSFORM.
   He wheels a gleaming gold monolith in from frame left, through a scanner
   arch at centre, and what comes out the right side is a bare carcass. The
   light bar sweeps the full height as it passes.
   ⭐ The travel is the whole panel and the payoff is a SUBSTITUTION, which is
   the only one of the five where the object itself is different at the end.
   ====================================================================== */
export const OpenScan: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const roll = E(f, 2, 56, 0, 1, IO);
  const X = -160 + roll * 1180;
  const through = Math.max(0, Math.min(1, (X - 430) / 150));
  const sweepOn = X > 380 && X < 640;
  const react = through > 0.9 ? 1 : 0;
  return (
    <Frame dur={dur} f={f}>
      <OpenSet f={f} react={react} />
      {/* THE ARCH */}
      {[430, 590].map((cx, i) => (
        <div key={i} style={{ position: "absolute", left: cx, top: 210, width: 54, height: 502,
          zIndex: 66, background: `linear-gradient(90deg, #56606A 0%, #232B33 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 14, height: "100%",
            background: "#8A96A2" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 410, top: 176, width: 254, height: 56, zIndex: 67,
        background: `linear-gradient(180deg, #6E7A86 0%, #2A323A 100%)` }} />
      {sweepOn && (
        <div style={{ position: "absolute", left: 484, top: 232, width: 46, height: 470,
          zIndex: 68,
          background: `linear-gradient(90deg, ${hexa("#8FE0FF", 0)} 0%, ${hexa("#8FE0FF", 0.72)} 50%, ${hexa("#8FE0FF", 0)} 100%)` }} />
      )}
      {/* the object, before and after, on the same trolley */}
      <div style={{ position: "absolute", left: X - 150, top: GY - 452, width: 300, height: 452,
        zIndex: through > 0.5 ? 60 : 70 }}>
        <div style={{ position: "absolute", left: 20, top: 0, width: 260, height: 372,
          opacity: 1 - through,
          background: `linear-gradient(160deg, #F6E2B0 0%, ${GOLD} 40%, #A5802E 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 18,
            background: "#FFF2CE" }} />
          <div style={{ position: "absolute", left: 46, top: 130, width: 168, height: 168,
            borderRadius: "50%", background: "#C89A38" }} />
          <div style={{ position: "absolute", left: 0, top: 316, width: "100%", textAlign: "center",
            color: "#4A3208", ...mono(40, 800), letterSpacing: 8 }}>{R.lie}</div>
        </div>
        <div style={{ position: "absolute", left: 20, top: 0, width: 260, height: 372,
          opacity: through, background: "#2A2620", border: "10px solid #4E463A" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: 18, top: 26 + i * 108, width: 224,
              height: 82, background: "#100E0A" }} />
          ))}
        </div>
        {/* the trolley */}
        <div style={{ position: "absolute", left: 0, top: 372, width: 300, height: 34, zIndex: 2,
          background: `linear-gradient(180deg, #4A545E 0%, #1A2026 100%)` }} />
        {[54, 210].map((cx, i) => (
          <div key={i} style={{ position: "absolute", left: cx, top: 396, width: 56, height: 56,
            borderRadius: "50%", zIndex: 3, background: "#2A323A", border: "8px solid #6E7A86",
            transform: `rotate(${roll * 1180 * 1.4}deg)` }}>
            <div style={{ position: "absolute", left: 18, top: 3, width: 6, height: 36,
              background: "#98A4B0" }} />
          </div>
        ))}
      </div>
      <Contact x={X - 300} y={GY} w={208} z={41} o={0.36} />
      <Hero f={f} x={X - 196} y={GY} size={226} z={72} act={1} ph={0.3}
        costume={{ constr: 1 }} strain={0.5} drive={0.10}
        shock={through > 0.6 ? E(f, 0, 200, 1, 1, LIN) * through : 0} />
      <Forearm x0={X - 196 + 226 * 0.32} y0={GY - 226 * 0.50} x1={X - 130} y1={GY - 120}
        w={25} c={CLAYD} z={73} />
      <Steam x={X - 196} y={GY - 234} f={f} at={4} n={7} z={74} s={1.0} />
      {through > 0.05 && through < 0.95 && (
        <Fall x={X - 20} y={GY - 300} w={220} f={f} at={0} n={14} z={69} c="#E7B24C" rate={2.0} />
      )}
    </Frame>
  );
};

export const OPENS: Record<OpenId, React.FC<SP>> = {
  tower: OpenTower, stamp: OpenStamp, haul: OpenHaul, charge: OpenCharge, scan: OpenScan,
};
