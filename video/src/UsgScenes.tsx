import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Mark, MarkPlate,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Runner, Sweat,
  Drum, Token, PipeRun, Collar, TOK, TOKD, TOKL, TOKX,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./UsgWorld";
import {
  RepoPlate, PayHatch, CodeBar, WordBlock, Hopper, FeedMain, Grille,
  CacheBlock, Cradle, GuardArm, IdleClock, JobCrate, KeyPlate, TariffBoard,
  Chute, Mallet, KnifeSwitch, SaveBin, Plinth, MeterWall, MeterDial, RepoDisc,
  Ribbon, Balance,
} from "./UsgProps";
import { Room } from "./HwSets";

/* ===========================================================================
   REEL 126 · "USAGE" — THE SCENES.  Board: storyboards/126-usage.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing here lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him" (reel 112: a hero
   standing in a busy room measured 8.94 and read as dead; the same set with the
   hero's body changing shape measured 14.09):
     S1  RUNS the three plates down the rack rail and slams each one home
     S2  hauls plate 1 up onto the plinth and it lights under his hands
     S3  grabs the drum's brake and is DRAGGED round by it — the villain wins
     S4  UNBOLTS the feed main and SWINGS it across onto the cheap hopper
     S5  holds one coin up against a full crate — the trade, in his two hands
     S6  sets plate 2 on the plinth
     S7  is BLASTED BACKWARD by the torrent out of the outlet chute
     S8  HAULS the grille down on its chain, hand over hand
     S9  takes the stone mallet to the long sentences and shortens them
     S10 opens the new crate beside the hook's crate and holds both up
     S11 throws the knife switch that starts the third act
     S12 sets plate 3 on the plinth
     S13 SHOVELS the dead cache back in by hand while the drum rockets to $9
     S14 works at the bench with his BACK TURNED while the arm hunts behind him
     S15 catches the saved tokens in a bin as the shutter latches
     S16 strikes the keyword plate

   ⛔ AN ACTION LOOP IS NOT A SCENE (reel 110). `Crew`'s four loops are what the
   room does WHILE the scene happens; every scene still owes its own event.
   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). Plates
   never enter the ground line the cast stands on (reel 112).
   ⛔ EVERY SCENE IS LOCKED. The reel has exactly THREE re-framings — S7 f0,
   S13 f22 and S15 f0 — and all three are CUTS, not drifts.
   ⛔ THE VILLAIN IS THE DRUM AND IT IS NEVER ZERO. Every scene passes it a
   `rate`, the rate steps DOWN three times across the reel, and `Drum` clamps
   its own floor at 0.18 so no scene can accidentally claim a free session.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
export type SP = { v: Variant; dur: number };

/** the ground line the cast stands on, house-wide */
export const GY = 706;
/** the reserved plate band — ⛔ nothing else enters y 112..210 */
const BAND_Y = 156;

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -4, dy: 8, s: 1.006, rot: -0.3 },
  amber: { dx: -56, dy: -28, s: 1.048, rot: 2.6 },
  steel: { dx: 58, dy: 30, s: 1.050, rot: -2.4 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` / `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.20) brightness(1.000)",
  amber: "contrast(1.130) saturate(1.20) brightness(0.960)",
  steel: "contrast(1.070) saturate(1.20) brightness(1.048)",
};

const PAR_X: Record<Variant, number> = { house: 0, amber: -46, steel: 44 };
/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH — offsets inside one pitch collapse
    to nothing (reel 124 scored three "different" phases at 0.0/9.4/18.9 of a
    204.6px pitch and the top variant lever was inert). Varying `n` changes the
    PITCH itself, which is the only offset that cannot go inert. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 96, steel: 172 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.84, steel: 0.50 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
/** ⭐ PER-CUT LAYOUT on the four flattest scenes — one large object on a plain
    field is the hardest frame to differentiate and a grade has nothing to bite
    on there, so at any sampled instant the subject is somewhere else. */
const LAY: Record<Variant, { main: number; grille: number; cradle: number; beat: number }> = {
  house: { main: 0, grille: 0, cradle: 0, beat: 0 },
  amber: { main: 84, grille: -74, cradle: -62, beat: -5 },
  steel: { main: -92, grille: 88, cradle: 96, beat: 8 },
};

/** the drum's rate scene by scene — this table IS the reel's argument, and it
    is written down in one place so a scene cannot drift off it.
    ⛔ NEVER ZERO. `Drum` also clamps, so this is belt and braces. */
const RATE = {
  s1: 22, s2: 22, s3: 26, s4: 26, s5: 5.2, s6: 5.2, s7: 9.4, s8: 9.4,
  s9: 3.4, s10: 3.4, s11: 3.4, s12: 3.4, s13: 28, s14: 3.0, s15: 1.1, s16: 0.9,
} as const;

/* =========================================================================
   S1 · THE RACK — "They take seconds to install and can save you hundreds of
   dollars per month."
   §3: the words are SECONDS and INSTALL, so the picture is three plates being
   RUN INTO A RACK against a sweep hand, not a caption saying "fast".
   EVENT: before, an empty three-bay rack and a stopped sweep hand · trigger, he
   shoves the first plate in at f8 · travel, each plate crosses ~380px of rail ·
   arrival, each seats with a latch, a lamp and a ring, and the hand stops.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("rack");
  const IN = [8, 30, 52];
  const done = IN.filter((t) => f >= t + 12).length;
  const RX = 604 + LAY[v].main * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.34} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={6.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 560, y: 168, r: 280 }} />

      {/* the occluder — a stanchion cropped by the frame, in front */}
      <div style={{ position: "absolute", left: 936, top: 214, width: 122, height: 620,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(266deg, #16262C 0%, #071115 100%)` }} />

      {/* the background process: the supply, always running */}
      <MeterWall y={138} f={f} z={20} cols={11} rows={2} live={1} c="#4E7488" dim={0.24} />
      <PipeRun y={392} f={f} z={22} h={72} rate={14} pitch={150} c={COPPER} />

      {/* the RACK — three bays, uprights, cross rails and foot plates, standing
          EMPTY on frame 1 so there is a before state to change */}
      <div style={{ position: "absolute", left: RX - 246, top: 316, width: 492, height: 352,
        zIndex: 30, borderRadius: 5,
        background: `linear-gradient(172deg, #26404A 0%, #12252C 100%)`,
        border: `4px solid #0A171C` }} />
      {[0, 1, 2].map((i) => (
        <div key={"bay" + i} style={{ position: "absolute", left: RX - 226, top: 336 + i * 112,
          width: 452, height: 92, zIndex: 31, borderRadius: 3,
          background: `linear-gradient(178deg, #0A1418 0%, #050C10 100%)`,
          boxShadow: `inset 0 6px 12px ${hexa("#000", 0.8)}` }} />
      ))}
      {/* the seat rails the plates run in */}
      {[0, 1, 2].map((i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: RX - 226, top: 418 + i * 112,
          width: 452, height: 9, zIndex: 33,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
      ))}

      {/* ⭐ THE SWEEP HAND — "seconds" as a picture. A real dial on the rack
          head, its hand running while he installs and stopping when he is done. */}
      <div style={{ position: "absolute", left: RX - 62, top: 214, width: 124, height: 124,
        zIndex: 36, borderRadius: 62,
        background: `radial-gradient(circle at 38% 32%, ${PAPER}, ${CREAMB})`,
        border: `5px solid ${dkh(BRASS, 0.56)}` }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"t" + i} style={{ position: "absolute", left: 60, top: 6, width: 3,
            height: i % 3 === 0 ? 12 : 7, background: hexa(INK, 0.62),
            transformOrigin: "50% 51px", transform: `rotate(${i * 30}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 58.5, top: 16, width: 3, height: 46,
          background: RED, transformOrigin: "50% 100%",
          transform: `rotate(${Math.min(f, IN[2] + 12) * 5.4}deg)` }} />
      </div>

      {/* the three plates RUNNING IN — real distance from off the left edge */}
      {IN.map((at, i) => {
        if (f < at) return null;
        const k = E(f, at, at + 12, 0, 1, IO);
        const px = -180 + (RX - 4 - (-180)) * k;
        const rec = squash(f - at - 12, 6, 0.16, 3, 10);
        return (<React.Fragment key={"pl" + i}>
          <div style={{ position: "absolute", inset: 0, zIndex: 60,
            transform: `scale(${rec})`, transformOrigin: `${px}px ${380 + i * 112}px` }}>
            <RepoDisc x={px} y={382 + i * 112} d={172} z={60} f={f}
              logo={["deepseek.svg", undefined, "github.svg"][i]}
              rock={i === 1} c={[SLATE, OXIDE, PCB][i]} rot={(1 - k) * 160} />
          </div>
          {f >= at + 12 && f < at + 30 &&
            <Ring x={RX - 4} y={380 + i * 112} f={f} at={at + 12} c={GOLD} z={64} />}
        </React.Fragment>);
      })}

      {/* the drum, small, at the frame edge — the villain is present but is not
          the hero object of this scene */}
      <Drum x={128} y={296} f={f} s={0.62} z={36} rate={RATE.s1} unit="$ / MIN" />

      {/* HERO: he SHOVES each plate home, so the install is his action */}
      {/* ⛔ THE LINE SAYS "SAVE YOU HUNDREDS OF DOLLARS PER MONTH" at scene-local
          f41-64 and there was no money anywhere in the shot. This banks it up on
          the bench across exactly those frames — one coin at a time, in rows, so
          the amount is COUNTED rather than claimed. */}
      {(() => {
        const N = 24;
        const inn = Math.round(E(f, 38, 74, 0, 1, LIN) * N);
        return Array.from({ length: N }, (_, i) => {
          if (i >= inn) return null;
          const at = 38 + i * 1.5;
          const t = Math.min(1, (f - at) / 9);
          const row = Math.floor(i / 8), col = i % 8;
          const tx = 168 + col * 58, ty = GY - 92 - row * 52;
          return (
            <Token key={"mn" + i} x={tx} y={ty - (1 - t) * (170 + col * 12)}
              s={0.76} z={62} f={f} spin={t * 300 + i * 21} />
          );
        });
      })()}
      {f >= 40 && f < 78 && [0, 1, 2].map((i) => (
        <Ring key={"mr" + i} x={168 + i * 150} y={GY - 96} f={f} at={44 + i * 9}
          c={GOLD} z={64} s={0.62} />
      ))}

      <Hero f={f} x={214 + LAY[v].beat * 3} y={GY} size={250} z={62} act={1} ph={0.2}
        costume={{ constr: 1 }}
        drive={IN.reduce((a, at) => a + E(f, at, at + 7, 0, 0.5, OUT)
          - E(f, at + 7, at + 16, 0, 0.5, IO), 0)}
        reach={132} gaze={0.3} />
      <Contact x={214 - 98} y={GY + 4} w={238} o={0.40} z={41} />

      {/* the crew keeping the floor alive — furniture, never the answer to
          "not enough motion" */}
      {[0, 1].map((i) => (
        <Crew key={"cw" + i} f={f} x={760 + i * 168} y={GY} i={i + 3} size={132}
          z={44} at={i * 7} loop={i} />
      ))}
    </Scene>
  );
};

/* =========================================================================
   S2 · THE DELIVERY — "Now first is the DeepSeek API plugin."
   ⛔ A TITLE SCENE STILL OWES AN EVENT, and the three titles may not share one.
   Here the plate arrives as FREIGHT: he wheels it in on a sack truck and stands
   it up. The verb is DELIVERED.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("plate");
  const roll = E(f, 2, 22, 0, 1, IO);
  const tip = E(f, 22, 34, 0, 1, BACK);
  const X = -180 + roll * 700 + LAY[v].main * 0.2;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.46} glow={hexa(p.key, 0.22)}>
      {/* SHOT: MEDIUM — the shot list runs 22%..52% of panel
          width across the reel, because 17 scenes inside a 0.4pp band is
          reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.06} y={-14} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="rack" overhead="gantry"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 560, y: 200, r: 300 }} />
      <div style={{ position: "absolute", left: -46, top: 240, width: 118, height: 620,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(96deg, #262A31 0%, #0C0F13 100%)` }} />
      <PipeRun y={250} f={f} z={22} h={60} rate={13} pitch={146} c={COPPER} />
      {/* ⭐ THE BAY HE IS DELIVERING INTO — three racked stands, two already
          loaded, one waiting. The scene was a man and a trolley in an empty
          room; a delivery only means something if there is a place for it. */}
      {[0, 1, 2].map((i) => (
        <div key={"st" + i} style={{ position: "absolute", left: 630 + i * 130, top: 430,
          width: 108, height: 276, zIndex: 32, borderRadius: 4,
          background: `linear-gradient(96deg, ${mxh(SLATE, 0.22)} 0%, ${dkh(SLATE, 0.48)} 100%)` }}>
          <div style={{ position: "absolute", left: -12, top: -14, width: 132, height: 20,
            borderRadius: 3, background: `linear-gradient(180deg, ${mxh(SLATE, 0.36)} 0%, ${dkh(SLATE, 0.34)} 100%)` }} />
        </div>
      ))}
      {[0, 1].map((i) => (
        <RepoDisc key={"rp" + i} x={706 + i * 152} y={368} d={96} z={40} f={f}
          logo={[undefined, "github.svg"][i]} rock={i === 0}
          c={[OXIDE, PCB][i]} seat={0.55} />
      ))}
      {[0, 1, 2].map((i) => (
        <Crew key={"cw" + i} f={f} x={902 + i * 6} y={GY} i={i + 4} size={104}
          z={38} at={i * 6} loop={(i + 1) % 4} />
      ))}
      <Pool x={X + 60} y={GY + 8} w={520} c={p.key} o={0.30} />

      {/* the sack truck: two wheels, a toe plate and a frame, tipping up */}
      <div style={{ position: "absolute", left: X - 30, top: GY - 300, width: 200, height: 300,
        zIndex: 50, transformOrigin: "20% 100%", transform: `rotate(${18 - tip * 18}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 22, height: 300,
          borderRadius: 6, background: `linear-gradient(96deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
        <div style={{ position: "absolute", left: 0, top: 280, width: 128, height: 18,
          borderRadius: 3, background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
        <div style={{ position: "absolute", left: -26, top: 262, width: 54, height: 54,
          borderRadius: 27, background: `radial-gradient(circle at 34% 30%, #4A4E54, #16191D)`,
          transform: `rotate(${roll * 900}deg)` }}>
          <div style={{ position: "absolute", left: 24, top: 6, width: 6, height: 42,
            background: hexa(TOKL, 0.30) }} />
        </div>
      </div>
      <RepoDisc x={X + 88} y={GY - 178 - tip * 26} d={320} z={58} f={f}
        logo="deepseek.svg" c={SLATE} rot={(18 - tip * 18) * 0.8} />
      {f >= 34 && f < 54 && <Ring x={X + 88} y={GY - 216} f={f} at={34} c={GOLD} z={66} />}
      {f >= 34 && f < 54 && <Puff x={X + 40} y={GY + 4} f={f} at={34} c={p.grit} z={64} n={7} />}

      <Drum x={880} y={272} f={f} s={0.62} z={36} rate={RATE.s2} unit="$ / MIN" />

      <Hero f={f} x={X - 118} y={GY} size={300} z={60} act={1} ph={0.4}
        costume={{ constr: 1 }} strain={0.30 + (1 - Math.abs(roll - 0.5) * 2) * 0.35}
        drive={roll * 0.5} reach={148} gaze={0.5} />
      <Contact x={X - 118 - 118} y={GY + 4} w={236} o={0.40} z={41} />
      <Forearm x0={X - 60} y0={GY - 180} x1={X - 24} y1={GY - 236} c={CLAY} z={62} />
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S3 · THE DRUM — "Claude is amazing but its API gets expensive fast."
   ⭐ THE VILLAIN IS INTRODUCED BY BEATING HIM. The drum is hero-sized here and
   in exactly one other scene (S13); everywhere else it is a small dial at the
   frame edge, because six scenes built on one prop is reel 120's `LampBank`
   failure and it is the note that arrives as six timestamps at once.
   EVENT: before, the drum already blurring · trigger, he grabs the brake at f6 ·
   travel, it drags him 190px across the floor · arrival, he loses his footing,
   the housing shudders harder and tokens spill past him into it.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("drum");
  const grab = E(f, 6, 12, 0, 1, OUT);
  const drag = E(f, 12, 50, 0, 1, IO);
  const slip = E(f, 44, 54, 0, 1, BACK);
  const DX = 486 + LAY[v].main * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.080]} vig={0.52} glow={hexa(p.key, 0.30)}>
      {/* SHOT: CLOSE — the shot list runs 22%..52% of panel
          width across the reel, because 17 scenes inside a 0.4pp band is
          reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.3} y={-46} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="plant" overhead="duct"
        rake={0.17} rakeX={RAKE_X[v]} rakeRate={7.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.7} lamp={{ x: DX, y: 226, r: 340 }} />
      <div style={{ position: "absolute", left: 946, top: 190, width: 146, height: 660,
        zIndex: 74, borderRadius: 8,
        background: `linear-gradient(266deg, #2C1708 0%, #150A02 66%, #090400 100%)` }} />

      {/* the FEED — tokens pouring past him into the drum, which is where the
          money is actually going. A full-width high-contrast travelling stream. */}
      <PipeRun y={640} f={f} z={22} h={74} rate={17} pitch={158} c={EMBER} />
      {Array.from({ length: 12 }, (_, i) => {
        const t = ((f * 3.4 + i * 19) % 116) / 116;
        return <Token key={"fl" + i} x={200 + i * 62 + t * 40} y={224 + t * 300}
          s={0.44} z={34} f={f} spin={f * 0.3 + i} />;
      })}

      <MeterWall y={134} f={f} z={20} cols={11} rows={2} live={1} c="#96601E" dim={0.24} />
      <Drum x={DX} y={GY - 160} f={f} s={0.98} z={46} hero rate={RATE.s3}
        unit="$ SPENT" strain={0.4 + drag * 0.5} />

      {/* the brake lever with a real pivot and quadrant */}
      <div style={{ position: "absolute", left: 824 - 118, top: GY - 244, width: 118,
        height: 244, zIndex: 45, borderRadius: "118px 0 0 0",
        border: `10px solid ${dkh(BRASS, 0.54)}`, borderRight: "none", borderBottom: "none" }} />
      <div style={{ position: "absolute", left: 824 - 41, top: GY - 34, width: 82, height: 82,
        borderRadius: 41, zIndex: 44,
        background: `radial-gradient(circle at 36% 30%, ${mxh(BRASS, 0.40)}, ${dkh(BRASS, 0.56)})` }} />
      <div style={{ position: "absolute", left: 824 - 15, top: GY - 290, width: 30, height: 290,
        zIndex: 50, transformOrigin: "50% 100%",
        transform: `rotate(${-10 - grab * 8 + drag * 6}deg)`, borderRadius: 15,
        background: `linear-gradient(96deg, ${mxh(STEEL, 0.32)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />

      {/* HERO: DRAGGED. His feet slide 190px and he ends up leaning back at 22
          degrees — the action is a DISTANCE, not a state change. */}
      <Hero f={f} x={824 - drag * 190} y={GY + slip * 16} size={322} z={60}
        costume={{ constr: 1 }} act={1} flip
        strain={0.35 + drag * 0.55} drive={drag * 0.5}
        heat={0.30 + drag * 0.52} stern={0.85} shock={slip * 0.8} reach={128} />
      <Contact x={824 - drag * 190 - 96} y={GY + 4} w={238} o={0.40} z={41} />
      {f > 10 && <Steam x={824 - drag * 190} y={GY - 238} f={f} at={10} n={5} z={64} />}
      {f > 20 && <Sweat x={824 - drag * 190} y={GY - 210} f={f} at={20} n={4} z={65} />}
      {/* the skid marks he leaves — the distance, made permanent */}
      {drag > 0.05 && (
        <div style={{ position: "absolute", left: 824 - drag * 190, top: GY - 2,
          width: drag * 190, height: 8, zIndex: 40, borderRadius: 4,
          background: `linear-gradient(90deg, transparent, ${hexa("#1A0E04", 0.6)})` }} />
      )}
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S4 · THE SUPPLY — "So you can install this one tool that points Claude Code
   directly at DeepSeek."
   ⭐⭐ §3 ON THE VERB: the verb is POINTS. So the picture is a MAIN BEING AIMED
   at a different thing, and the two prices are both on screen the whole time —
   a price comparison with one side missing is not a comparison.
   EVENT: before, the main bolted to the $15.00 hopper and that hopper's lamp
   lit · trigger, he knocks the flange pin out at f12 · travel, the main swings
   58 degrees across the frame over 26 frames · arrival, it lands on the $0.87
   hopper, the gate opens, the lamps swap and the line pressurises the other way.
   ⛔ OVERLAPPING ACTION, NOT N STEPS (reel 114): the main leads, the hanger
   chain follows, and the flow inside it rings out after it stops.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("supply");
  const PIN = 12, SW0 = 16, SW1 = 42;
  const pin = E(f, PIN, PIN + 6, 0, 1, IN_Q);
  /* the swing, and its own velocity, so the load can LAG it */
  const sw = (g: number) => E(g, SW0, SW1, 0, 1, IO);
  const k = sw(f);
  const vel = (sw(f + 1) - sw(f - 1)) * 0.5;
  const ring = f > SW1 ? Math.sin((f - SW1) * 0.62) * Math.exp(-(f - SW1) / 6.5) * 5 : 0;
  const ang = -34 + k * 62 + (-vel * 62 * 2.0) + ring;
  const live = E(f, SW1 + 2, SW1 + 10, 0, 1, OUT);
  const PVX = 486 + LAY[v].main * 0.95;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.46} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
        rake={0.12 * (1 + (RAKE_K[v] - 1) * 0.7)} rakeX={RAKE_X[v]}
        rakeRate={5.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 520 + LAY[v].main * 0.6, y: 190, r: 300 }} />
      <div style={{ position: "absolute", left: -48, top: 250, width: 120, height: 610,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(96deg, #232E3C 0%, #0A1016 100%)` }} />

      {/* the TWO HOPPERS, both stamped, both on screen the whole scene */}
      <PipeRun y={300} f={f} z={22} h={66} rate={13} pitch={146} c={COPPER} />
      {/* ⛔ NO TEXT ON THE BINS. The marks are the identity and the cost COLUMNS
             are the price: full and red against a sliver of green is the same
             17x the stencil used to spell out. And the bins now actually EMPTY
             and FILL, so the second half of the scene has somewhere to go. */}
      <Hopper x={224 + LAY[v].main * 0.55} y={GY} s={0.80} z={40} f={f}
        c="#4A5462" logo="anthropic.svg" live={1 - live} cost={1}
        full={1 - E(f, SW1 + 4, SW1 + 34, 0, 0.78, IO)} />
      <Hopper x={840 + LAY[v].main * 0.35} y={GY} s={0.80} z={40} f={f}
        c={PCB} logo="deepseek.svg" live={live} cost={0.09}
        full={0.11 + E(f, SW1 + 6, SW1 + 36, 0, 0.89, IO)} />

      {/* THE FEED MAIN — the object that does the verb. It pivots on a visible
          elbow at the ceiling, so the swing has a centre. */}
      <FeedMain x={PVX} y={286} len={340} s={1.0} z={52} f={f} ang={ang}
        flow={0.9 - k * 0.5 + live * 0.6} />

      {/* the flange PIN he knocks out — the trigger, and it lands on the floor */}
      {f < PIN + 34 && (
        <div style={{ position: "absolute", left: PVX + 262 - pin * 20,
          top: 268 + pin * (GY - 268 - 10), width: 26, height: 26, borderRadius: 13,
          zIndex: 56, transform: `rotate(${pin * 420}deg)`,
          background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.44)}, ${dkh(BRASS, 0.62)})` }} />
      )}
      {f >= PIN + 26 && f < PIN + 44 && <Puff x={PVX + 242} y={GY - 6} f={f} at={PIN + 26}
        c={p.grit} z={58} n={7} />}
      {f >= SW1 && f < SW1 + 22 && <Ring x={840} y={GY - 250} f={f} at={SW1} c={GREEN} z={68} />}

      {/* ⭐ AND THEN IT POURS. The throw landed at f52 and the scene held for its
             last 28 frames — the main was re-aimed and nothing came out of it.
             This is the delivery: a real stream down the barrel and into the
             cheap bin, which is what "points Claude Code at DeepSeek" MEANS. */}
      {f > SW1 + 2 && Array.from({ length: 14 }, (_, i) => {
        const at = SW1 + 4 + i * 2.2;
        if (f < at) return null;
        const t = ((f - at) / 17) % 1;
        const HX = 840 + LAY[v].main * 0.35;
        return (
          <div key={"pr" + i} style={{ position: "absolute", inset: 0, zIndex: 58,
            opacity: t < 0.82 ? Math.min(1, t * 6) : (1 - t) / 0.18 }}>
            <Token x={PVX + 300 + (HX - PVX - 300) * t}
              y={286 + 176 * t * t + Math.sin(t * 3.1) * 9}
              s={0.46 + t * 0.14} z={58} f={f} spin={t * 300 + i * 24} />
          </div>
        );
      })}
      {f > SW1 + 8 && <Puff x={840 + LAY[v].main * 0.35} y={GY - 236} f={f} at={SW1 + 8}
        c="#D9C79A" z={59} n={9} s={1.1} />}

      <Drum x={506} y={274} f={f} s={0.56} z={36} rate={RATE.s4 - live * 20} unit="$ / MIN" />

      {/* HERO: he throws the main across. He is UNDER it, both arms up, and the
          drive is a real body move of 46px, not a pose. */}
      <Hero f={f} x={PVX + 44 + k * 92} y={GY} size={262} z={60} act={1}
        costume={{ constr: 1 }} strain={(1 - Math.abs(k - 0.5) * 2) * 0.7}
        drive={vel * 26} lift={k * 0.6} reach={148} gaze={k * 0.6}
        heat={(1 - Math.abs(k - 0.5) * 2) * 0.34} />
      <Contact x={PVX + 44 + k * 92 - 96} y={GY + 4} w={238} o={0.40} z={41} />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE PAYOFF — "You get the power of Claude for pennies."
   §3: the nouns are POWER and PENNIES, so the picture is the SAME output crate
   arriving beside a hand holding three coins — the trade, in one frame.
   EVENT: before, the line live on the cheap hopper · trigger, a crate lands at
   f6 · travel, he lifts the coins up beside it across 120px · arrival, the two
   sit at the same height, the drum's wheels visibly separate into digits.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("supply2");
  const land = E(f, 2, 9, 0, 1, IN_Q);
  const raise = E(f, 10, 24, 0, 1, IO);
  /* the run keeps ARRIVING for the whole scene — nine crates, not four */
  const RUN = [2, 7, 12, 17, 22, 27];
  const CX = 664 + LAY[v].main * 0.2;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.34} glow={hexa(p.key, 0.24)}>
      {/* SHOT: CLOSE — the shot list runs 22%..52% of panel
          width across the reel, because 17 scenes inside a 0.4pp band is
          reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.10} y={-30} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="tray"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={6.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: CX, y: 200, r: 300 }} />
      <div style={{ position: "absolute", left: 940, top: 226, width: 128, height: 630,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(266deg, #143024 0%, #04100A 100%)` }} />
      <PipeRun y={612} f={f} z={22} h={70} rate={15.5} pitch={152} c={PCB} />
      <Chute x={CX + 150} y={276} w={330} h={190} s={1} z={30} f={f} run={1} label="OUTPUT" />

      {/* the crate that arrives — the SAME object the hook paid out, which is
          what makes "you get the power of Claude" legible rather than asserted */}
      
      {/* ⭐ THE TOWER. Nine crates arriving one after another and stacking clean
          off the top of the frame — a quantity you cannot count, which is what
          "the power of Claude" has to feel like against three coins. */}
      {RUN.map((at, i) => {
        if (f < at) return null;
        const t = Math.min(1, (f - at) / 8);
        const ez = 1 - (1 - t) * (1 - t);
        return (
          <React.Fragment key={"jc" + i}>
            <JobCrate x={CX + 150 + (i % 2) * 22} y={GY + 6 - i * 104 - (1 - ez) * 460}
              s={1.34} z={48 + i} f={f} rot={(i % 3 - 1) * 3 * ez} />
            {f >= at + 6 && f < at + 20 && (
              <Puff x={CX + 150 + (i % 2) * 22} y={GY + 12 - i * 104} f={f} at={at + 6}
                c={p.grit} z={57} n={6} s={0.95} />
            )}
          </React.Fragment>
        );
      })}
      {f >= 12 && f < 30 && <Puff x={CX} y={GY + 4} f={f} at={12} c={p.grit} z={56} n={8} />}

      {/* ⭐ AND THE PRICE, IN HIS PALM — deliberately SMALL. Three coins that
          would fit in a fist, held up beside a tower that runs off the frame.
          The contrast IS the line; making them equal-sized killed it. */}
      <div style={{ position: "absolute", left: 232, top: GY - 176 - raise * 124, width: 214,
        height: 28, zIndex: 64, borderRadius: 7,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.50)} 100%)`,
        opacity: raise }} />
      {[0, 1, 2].map((i) => (
        <Token key={"pn" + i} x={278 + i * 62} y={GY - 196 - raise * 124} s={0.56}
          z={66} f={f} spin={f * 0.09 + i * 1.1} />
      ))}
      {raise > 0.6 && [0, 1, 2].map((i) => (
        <Ring key={"pr" + i} x={278 + i * 62} y={GY - 196 - raise * 124} f={f}
          at={24 + i * 4} c={GOLD} z={67} s={0.34} />
      ))}

      <Drum x={214} y={268} f={f} s={0.70} z={36} rate={RATE.s5} unit="$ / MIN" />

      <Hero f={f} x={318} y={GY} size={300} z={60} act={2} ph={0.7}
        costume={{ glasses: 1 }} lift={raise} cheer={raise * 0.8} reach={146}
        gaze={0.8} />
      <Contact x={318 - 111} y={GY + 4} w={222} o={0.40} z={41} />
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S6 · PLATE BAY 2 — "Second is the caveman plugin."
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("plate2");
  /* ⭐ THE REPO'S OWN OBJECT ARRIVES EARLY. caveman's mark is a rock and its
     whole pitch is "why use many token when few token do trick", so its title
     card is DRIVEN INTO THE WALL with the stone mallet that S9 then uses on the
     prose. The three titles now have three different verbs: DELIVERED, STRUCK,
     LOWERED. */
  const HIT = [12, 26];
  const swing = (at: number) => E(f, at - 8, at, 0, 1, IN_Q) - E(f, at, at + 9, 0, 1, OUT);
  const armAng = -50 + HIT.reduce((a, at) => a + swing(at) * 118, 0);
  const driven = HIT.filter((t) => f >= t).length / HIT.length;
  const PX = 640 + LAY[v].main * 0.2;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.34} glow={hexa(p.key, 0.24)}>
      {/* SHOT: MEDIUM — the shot list runs 22%..52% of panel
          width across the reel, because 17 scenes inside a 0.4pp band is
          reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.08} y={-16} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="shelf" overhead="joist"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={6.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.6} lamp={{ x: PX, y: 210, r: 300 }} />
      <MeterWall y={146} f={f} z={20} cols={11} rows={2} live={1} c="#8E7A50" dim={0.28} />
      <PipeRun y={238} f={f} z={22} h={62} rate={11} pitch={140} c={BRASS} />
      <div style={{ position: "absolute", left: 942, top: 232, width: 124, height: 630,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(266deg, #3A3222 0%, #14100A 100%)` }} />
      <Pool x={PX - 70} y={GY + 8} w={620} c={p.key} o={0.32} />

      {/* the timber post the plate is driven into */}
      <div style={{ position: "absolute", left: PX - 62, top: 300, width: 124, height: 406,
        zIndex: 34, borderRadius: 4,
        background: `linear-gradient(96deg, ${mxh("#8A6A3E", 0.26)} 0%, ${dkh("#8A6A3E", 0.46)} 100%)` }} />
      <RepoDisc x={PX} y={396 + (1 - driven) * 14} d={330} z={58} f={f}
        rock c={OXIDE} />
      {HIT.map((at, i) => f >= at && f < at + 18 ? (
        <React.Fragment key={"h" + i}>
          <Ring x={PX} y={402} f={f} at={at} c={GOLD} z={68} />
          <Puff x={PX} y={430} f={f} at={at} c="#D8C8A0" z={69} n={8} />
        </React.Fragment>
      ) : null)}

      <Drum x={150} y={262} f={f} s={0.60} z={36} rate={RATE.s6} unit="$ / MIN" />

      <Hero f={f} x={PX - 300} y={GY} size={306} z={60} act={1}
        costume={{ constr: 1 }}
        strain={0.32 + HIT.reduce((a, at) => a + Math.abs(swing(at)) * 0.5, 0)}
        drive={HIT.reduce((a, at) => a + swing(at) * 0.45, 0)}
        heat={0.26} reach={150} gaze={0.5} />
      <Contact x={PX - 300 - 119} y={GY + 4} w={238} o={0.40} z={41} />
      <div style={{ position: "absolute", left: PX - 300 + 92, top: GY - 206, width: 0,
        height: 0, zIndex: 64 }}>
        <Mallet x={0} y={0} s={1.02} z={64} ang={armAng} />
      </div>
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S7 · THE OUTLET — "This forces Claude to remove all the filler words"
   §3: the nouns are FILLER WORDS, so the picture is a TORRENT of loose pale
   word blocks with a few solid dark code bars mixed into it, all of it going
   over the meter. The sort is set up here and paid at S8.
   EVENT: before, a still chute · trigger, it lets go at f4 · travel, the stream
   crosses the full panel and blasts him backward 150px · arrival, he braces,
   the pile against his legs grows, the drum climbs.
   ⛔ THE STREAM IS PALE ON DARK AND THE BARS ARE DARK ON PALE — the sort has to
   be visible in VALUE, because the audit is greyscale and so is a phone at arm's
   length.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("outlet");
  /* ⛔⛔ REBUILT. The line is *"this forces Claude to remove all the filler
     words"* and the picture was pale rectangles tumbling out of a chute. A
     rectangle is not a word and a viewer has no way to learn that it is — which
     is exactly the *"hard to tell what's going on"* note.
     ⭐ A RIBBON OF TAPE reads as OUTPUT to everyone with nothing written on it,
     and "far too much of it" is the only thing this shot has to say. Six lengths
     pour out and bury him; the few SOLID BARS tumbling in the same stream are
     the code, which is what S8 then keeps. */
  const CX = 806 + LAY[v].grille * 0.2;
  const blast = E(f, 6, 26, 0, 1, OUT) - E(f, 34, 50, 0, 0.4, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.085]} vig={0.44} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="joist"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={6.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.5} lamp={{ x: 620, y: 196, r: 320 }} />
      <MeterWall y={148} f={f} z={20} cols={11} rows={2} live={1} c="#7E7460" dim={0.22} />
      <PipeRun y={368} f={f} z={22} h={78} rate={18} pitch={162} c={BRASS} />
      <div style={{ position: "absolute", left: -46, top: 246, width: 116, height: 620,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(96deg, #3A3428 0%, #171208 100%)` }} />

      <Chute x={CX} y={430} w={470} h={268} s={1} z={34} f={f} run={1} label="OUTPUT" />

      {/* SIX LENGTHS OF TAPE, each crossing the full panel on its own clock. One
          continuous object per length is a far better motion shape than loose
          blocks, and it is the only shape that reads as OUTPUT with no type. */}
      {Array.from({ length: 6 }, (_, i) => {
        const at = 2 + i * 6;
        if (f < at) return null;
        const t = (f - at) / 46;
        if (t > 1.25) return null;
        return <Ribbon key={"rb" + i} x={CX - 40 - t * 1080} y={392 + i * 46 + Math.sin(t * 4 + i) * 34}
          len={430 + (i % 3) * 90} w={54 + (i % 2) * 14} z={50 + (i % 3)} f={f}
          phase={f * 0.16 + i * 1.4} curl={1} rot={-8 + Math.sin(t * 3 + i) * 16} />;
      })}
      {/* the solid CODE BARS carried along in the same stream */}
      {Array.from({ length: 5 }, (_, i) => {
        const at = 8 + i * 8;
        if (f < at) return null;
        const t = (f - at) / 42;
        if (t > 1.2) return null;
        return <CodeBar key={"cb" + i} x={CX - 90 - t * 1000} y={430 + i * 52 + t * t * 160}
          s={1.0} z={56} rot={t * 90 * (i % 2 ? 1 : -1)} />;
      })}

      <Drum x={190} y={252} f={f} s={0.60} z={36} rate={RATE.s7} unit="$ / MIN"
        strain={blast * 0.5} />

      {/* HERO: BLASTED BACKWARD 150px and leaning 18 degrees into it — the action
          is a distance he covers, not a stance he holds. */}
      <Hero f={f} x={396 - blast * 150} y={GY} size={268} z={60} act={1} flip
        costume={{ constr: 1 }} strain={0.4 + blast * 0.5} shock={blast * 0.9}
        stern={0.6} heat={blast * 0.4} reach={126} />
      <Contact x={396 - blast * 150 - 134} y={GY + 4} w={238} o={0.40} z={41} />
      {/* the tangle building against his legs — the scene accumulating */}
      {Array.from({ length: 5 }, (_, i) => {
        const at = 18 + i * 7;
        if (f < at) return null;
        return <Ribbon key={"pl" + i} x={230 + i * 96 - blast * 110} y={GY - 40 - (i % 3) * 44}
          len={210} w={50} z={46} f={f} phase={i * 2.1} curl={1.6}
          rot={(rnd(i, 9) - 0.5) * 60} />;
      })}
    </Scene>
  );
};

/* =========================================================================
   S8 · THE GRILLE — "and it cuts your token usage by 65%."
   EVENT: before, the stream still running and the grille parked overhead ·
   trigger, he takes the chain at f4 · travel, he hauls hand over hand and the
   grille comes down 300px · arrival, it lands with a clang, the pale word
   blocks pile against it and the dark code bars go straight through the slots.
   ⛔⛔ THE HONEST CAVEAT IS DRAWN, NOT WRITTEN. The INPUT line entering from the
   left passes UNDER the grille and keeps running, because the repo says so
   itself: "the skill only shrinks output tokens. Input and reasoning tokens are
   untouched." A viewer who reads only the picture gets the true version.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("grille");
  const haul = E(f, 4, 20, 0, 1, IO);
  const GX = 560 + LAY[v].grille * 0.3;
  /* ⭐ THE SORT IS NOW UNMISTAKABLE because the two things being sorted are
     different KINDS of object rather than two shades of slab: limp TAPE is
     stopped dead at the bars and piles up against them, solid milled BARS go
     straight through the slots without touching the sides. You do not have to
     be told which is which.
     ⛔⛔ AND THE HONEST CAVEAT IS STILL STAGED, NOT WRITTEN: the INPUT line
     entering from the left runs UNDER the grille and keeps running, full, for
     the whole scene — because the repo says itself that input and reasoning
     tokens are untouched. */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.080]} vig={0.34} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={6.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: GX, y: 190, r: 300 }} />
      <MeterWall y={130} f={f} z={20} cols={11} rows={2} live={1} c="#68786E" dim={0.30} />
      <div style={{ position: "absolute", left: 942, top: 216, width: 126, height: 640,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(266deg, #2A322F 0%, #0A100E 100%)` }} />

      {/* ⛔ THE UNTOUCHED INPUT LINE — it enters left, runs UNDER the grille and
          leaves right, still full, for the whole scene. This is the caveat, and
          it is drawn rather than captioned. */}
      <PipeRun y={636} f={f} z={20} h={64} rate={13.5} pitch={140} c={SLATE} />

      {/* the OUTPUT the grille sorts: tape that is STOPPED, bars that PASS */}
      {Array.from({ length: 7 }, (_, i) => {
        const at = i * 5;
        if (f < at) return null;
        const t = (f - at) / 40;
        if (t > 1.3) return null;
        const raw = 1040 - t * 980;
        /* the tape cannot get past the grille plane once it is down */
        const x = haul < 0.9 ? raw : Math.max(GX + 108, raw);
        return <Ribbon key={"rb" + i} x={x} y={300 + i * 44 + Math.sin(t * 3 + i) * 22}
          len={300} w={48} z={44} f={f} phase={f * 0.14 + i} curl={haul > 0.9 && raw < GX + 108 ? 2.2 : 1}
          rot={-6 + Math.sin(t * 4 + i) * 20} />;
      })}
      {Array.from({ length: 6 }, (_, i) => {
        const at = 2 + i * 6;
        if (f < at) return null;
        const t = (f - at) / 36;
        if (t > 1.25) return null;
        return <CodeBar key={"cb" + i} x={1010 - t * 990} y={352 + i * 50 + t * 90}
          s={0.94} z={62} rot={t * 50} />;
      })}

      <Grille x={GX} y={556} w={520} h={300} s={1} z={56} drop={haul} />
      {/* the chain he hauls on */}
      <div style={{ position: "absolute", left: GX + 258, top: 240 - (1 - haul) * 40,
        width: 8, height: 60 + haul * 300, zIndex: 54, background: dkh(STEEL, 0.44) }} />
      {f >= 20 && f < 40 && <Ring x={GX} y={556} f={f} at={20} c={GOLD} z={70} />}
      {f >= 20 && f < 40 && <Puff x={GX} y={560} f={f} at={20} c="#C8D2CA" z={71} n={8} />}

      <Drum x={168} y={250} f={f} s={0.60} z={36} rate={RATE.s8 - haul * 6} unit="$ / MIN" />

      <Hero f={f} x={GX + 300} y={GY + haul * 22} size={310} z={60} act={1}
        costume={{ constr: 1 }} strain={0.45 + (1 - Math.abs(haul - 0.5) * 2) * 0.5}
        drive={haul * 0.5} reach={132} heat={(1 - Math.abs(haul - 0.5) * 2) * 0.4} />
      <Contact x={GX + 300 - 119} y={GY + 4} w={238} o={0.40} z={41} />
      <Forearm x0={GX + 300 - 56} y0={GY - 180} x1={GX + 258} y1={300 - (1 - haul) * 40}
        c={CLAY} z={63} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE MALLET — "by making the AI talk like a caveman."
   ⭐ THE SUBJECT'S OWN OBJECT: the repo's mark is a rock and its pitch is
   literally "why use many token when few token do trick", so the tool that
   shortens the prose IS a stone hammer. That is `feedback_real_marks_are_the_props`
   rather than a metaphor laid over the subject.
   EVENT: before, four LONG sentences lying on the bench · trigger, he swings ·
   travel, the mallet describes a 120-degree arc · arrival, each long block
   SHATTERS into a short stub, with a ring and a shower of chips. Four discrete
   hits, ascending, so a repeat reads as progress.
   ⛔ THE SPRITE IS NOT RESTYLED. `hue-rotate`/`saturate` on the Claude are
   banned and a caveman costume does not exist in the kit — so the OUTPUT goes
   caveman, not the mascot.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("run");
  const HIT = [10, 22, 34, 46];
  const BX = 610 + LAY[v].beat * 4;
  const swing = (at: number) => E(f, at - 8, at, 0, 1, IN_Q) - E(f, at, at + 9, 0, 1, OUT);
  const armAng = -48 + HIT.reduce((a, at) => a + swing(at) * 116, 0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.52} glow={hexa(p.key, 0.24)}>
      {/* SHOT: CLOSE — the shot list runs 22%..52% of panel
          width across the reel, because 17 scenes inside a 0.4pp band is
          reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.26} y={-40} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="joist"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={6.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.6} lamp={{ x: BX, y: 200, r: 300 }} />
      <div style={{ position: "absolute", left: -46, top: 250, width: 118, height: 610,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(96deg, #3E2E16 0%, #180F04 100%)` }} />

      {/* the bench they lie on */}
      <MeterWall y={146} f={f} z={20} cols={11} rows={2} live={1} c="#96754A" dim={0.30} />
      <PipeRun y={246} f={f} z={22} h={66} rate={12} pitch={144} c={COPPER} />
      <div style={{ position: "absolute", left: BX - 340, top: GY - 190, width: 680, height: 32,
        zIndex: 36, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh("#8A6A3E", 0.30)} 0%, ${dkh("#8A6A3E", 0.44)} 100%)` }} />
      {[BX - 310, BX + 284].map((lx, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: lx, top: GY - 164, width: 30,
          height: 166, zIndex: 35,
          background: `linear-gradient(96deg, #6B5432 0%, #362A16 100%)` }} />
      ))}

      {/* the four LONG sentences, and what each becomes */}
      {HIT.map((at, i) => {
        const done = f >= at;
        const x = BX - 276 + i * 186;
        return (<React.Fragment key={"s" + i}>
          {/* ⭐ THE SAME OBJECT AS S7 AND S8, so the three scenes are one mechanism
              rather than three metaphors: a LONG length of tape gets hammered
              into a SHORT stub. The before and after are the same kind of thing
              at two lengths, which is the only way a viewer can read a
              shortening as a shortening. */}
          {!done && <Ribbon x={x - 132} y={GY - 254} len={268} w={76} z={50} f={f}
            phase={i * 1.7} curl={1.3} />}
          {done && <Ribbon x={x - 34} y={GY - 222} len={68} w={72} z={50} f={f}
            phase={i * 1.7 + 2} curl={0.4} />}
          {/* the chips it throws — travel that costs something */}
          {done && f < at + 22 && Array.from({ length: 7 }, (_, j) => {
            const t = (f - at) / 22;
            const a = -0.3 + j * 0.42;
            return (
              <div key={`ch${i}_${j}`} style={{ position: "absolute",
                left: x + Math.cos(a) * t * 220, top: GY - 250 - Math.sin(a) * t * 180 + t * t * 220,
                width: 26, height: 20, borderRadius: 3, zIndex: 66,
                opacity: 1 - t, transform: `rotate(${t * 300}deg)`,
                background: "#DCD4C2" }} />
            );
          })}
          {done && f < at + 18 && <Ring x={x} y={GY - 250} f={f} at={at} c={GOLD} z={68} />}
        </React.Fragment>);
      })}

      <Drum x={166} y={254} f={f} s={0.58} z={36} rate={RATE.s9} unit="$ / MIN" />

      {/* HERO + THE MALLET. The mallet is a child of his swing, so it cannot
          drift off his arm, and his forearms END ON the haft. */}
      <Hero f={f} x={BX - 356} y={GY} size={322} z={60} act={1}
        costume={{ constr: 1 }}
        strain={0.35 + HIT.reduce((a, at) => a + Math.abs(swing(at)) * 0.45, 0)}
        drive={HIT.reduce((a, at) => a + swing(at) * 0.4, 0)}
        heat={0.28} reach={140} gaze={0.4} />
      <Contact x={BX - 356 - 97} y={GY + 4} w={238} o={0.40} z={41} />
      <div style={{ position: "absolute", left: BX - 356 + 96, top: GY - 212, width: 0,
        height: 0, zIndex: 64 }}>
        <Mallet x={0} y={0} s={1.28} z={64} ang={armAng} />
      </div>
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S10 · THE PROOF — "And the output stays the exact same while you pay 75% less."
   ⛔⛔ `75%` IS NOT SOURCED AND DOES NOT APPEAR. What IS sourced is the repo's
   own sentence — "code, commands, and errors stay exact" — so the picture is a
   SIDE BY SIDE: the crate from the hook and the crate from the cheap line, both
   open, both showing the same milled bars. The claim the frame makes is the one
   the repo makes.
   EVENT: before, two closed crates on a table · trigger, he throws both lids ·
   travel, the lids arc off · arrival, the contents rise out and align, and a
   tick lands between them.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("outlet");
  /* ⛔⛔ REBUILT. The line is *"and the output stays the exact same while you pay
     75% less"* — a COMPARISON — and the picture was two crates on a table with
     their lids off. Identical contents side by side is exactly the thing an eye
     cannot verify in 2.9 seconds, so the shot ASSERTED the claim instead of
     showing it.
     ⭐ A BEAM BALANCE PROVES IT. Two pans carrying the same output settle DEAD
     LEVEL, which is a fact you read in one glance and cannot fake. What differs
     is underneath: a tall stack of coins on one side, three on the other.
     ⛔ AND `75%` IS NOT DRAWN — it is unsourced anywhere and it is on
     `TEN_BANNED`. The coin stacks show a difference; they do not put a figure
     on it, and the header band says what IS sourced. */
  const load = E(f, 4, 20, 0, 1, IO);
  const settle = f > 26 ? Math.sin((f - 26) * 0.42) * Math.exp(-(f - 26) / 9) : 0.9 - load * 0.9;
  const coins = E(f, 12, 46, 0, 1, LIN);
  const BX = 506 + LAY[v].main * 0.2;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.090]} vig={0.66} glow={hexa(p.key, 0.34)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="lampbar"
        rake={0.10} rakeX={RAKE_X[v]} rakeRate={5.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.4} lamp={{ x: BX, y: 330, r: 320 }} />
      <PipeRun y={604} f={f} z={22} h={72} rate={16} pitch={154} c={BRASS} />
      {/* ⛔ THE METER WALL WAS LOUDER THAN THE SUBJECT. Twenty-two white dial
          faces sat directly behind the beam, so the eye read a wall of gauges
          and the balance became two clusters of blue slabs on a pole. The proof
          object needs a dark ground to silhouette against, not a busier one. */}
      <div style={{ position: "absolute", left: 0, top: 116, width: "100%", height: 340,
        zIndex: 18, background: `linear-gradient(180deg, #2A2318 0%, #171208 62%, #241C10 100%)` }} />
      {[0.16, 0.5, 0.84].map((u) => (
        <div key={"st" + u} style={{ position: "absolute", left: `${u * 100}%`, top: 116,
          width: 26, height: 340, marginLeft: -13, zIndex: 19,
          background: `linear-gradient(96deg, #3A3020 0%, #1B1509 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: 938, top: 232, width: 124, height: 630,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(266deg, #3C3628 0%, #171208 100%)` }} />

      <div style={{ position: "absolute", left: BX - 430, top: GY - 168, width: 860, height: 260,
        zIndex: 3, borderRadius: "50%", filter: "blur(30px)",
        background: `radial-gradient(ellipse, ${hexa("#FFE0AE", 0.52)} 0%, ${hexa("#FFE0AE", 0.14)} 52%, ${hexa("#FFE0AE", 0)} 76%)` }} />
      {/* ⭐ THE SHUTTER ABOVE THE SCALE. Taking the meter wall out left a wide
          empty band over the beam; this fills it with the one thing the scene
          is about — a run being metered. Two leaves close over a lit aperture
          as the weighing completes, and the ring of teeth counts down with it. */}
      {(() => {
        const cl = E(f, 8, 40, 0, 1, IO);
        const AW = 300, AH = 132;
        return (
          <div style={{ position: "absolute", left: BX - AW / 2, top: 150, width: AW, height: AH,
            zIndex: 40 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 8, overflow: "hidden",
              background: `linear-gradient(180deg, #FFCE86 0%, #E08A2E 100%)`,
              boxShadow: `0 0 ${34 - cl * 26}px ${hexa("#FFC06A", 0.7 - cl * 0.6)}`,
              border: `5px solid #2A2318` }}>
              {[0, 1].map((h) => (
                <div key={h} style={{ position: "absolute", left: 0, width: "100%", height: "52%",
                  top: h ? "48%" : 0,
                  transform: `translateY(${(h ? 1 : -1) * (1 - cl) * 74}px)`,
                  background: `linear-gradient(${h ? 0 : 180}deg, #6E6656 0%, #2A2318 100%)`,
                  boxShadow: `0 ${h ? -4 : 4}px 10px ${hexa("#000", 0.5)}` }} />
              ))}
            </div>
            {/* the teeth going dark one by one — the count, with no digits */}
            {Array.from({ length: 12 }, (_, i) => (
              <div key={"tt" + i} style={{ position: "absolute", top: AH + 10,
                left: 10 + i * ((AW - 32) / 11), width: 14, height: 16, borderRadius: 3,
                background: i / 12 < 1 - cl ? "#FFC468" : "#2E2A20" }} />
            ))}
          </div>
        );
      })()}
      <Balance x={BX} y={GY - 30} s={1.36} z={46} f={f} tilt={settle} c="#8A7A55" />
      {/* the loads LAND — a real thud, so the level is ARRIVED AT rather than
          simply present, and the beam rings out of it */}
      {f >= 18 && f < 40 && [-1, 1].map((sg) => (
        <Puff key={"td" + sg} x={BX + sg * 272} y={GY - 300} f={f} at={18 + (sg > 0 ? 2 : 0)}
          c={p.grit} z={60} n={9} s={1.3} />
      ))}

      {/* the two loads: THE SAME THREE BARS, same sizes, same order, both pans */}
      {[-1, 1].map((sg) => {
        const ex = BX + sg * 272;
        const ey = GY - 30 - 392 + 48 + sg * Math.sin(settle * 7 * Math.PI / 180) * 262 + 132;
        return [0, 1, 2].map((j) => (
          <CodeBar key={`b${sg}_${j}`} x={ex - 52 + j * 52}
            y={ey - 18 - j * 38 - load * 6} s={0.94} z={58} rot={(j - 1) * 3} />
        ));
      })}

      {/* ⭐ AND THE PRICE, AS TWO STACKS OF THE REEL'S OWN COIN. Nine on the
          left, three on the right, arriving one at a time so the difference is
          COUNTED rather than stated. */}
      {Array.from({ length: 9 }, (_, i) => (
        i / 9 < coins ? <Token key={"L" + i} x={BX - 292 + (i % 3) * 56 - 56}
          y={GY - 40 - Math.floor(i / 3) * 66} s={1.04} z={54} f={f} spin={0.3 + i} /> : null
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        i / 3 < coins ? <Token key={"R" + i} x={BX + 292 + (i - 1) * 56}
          y={GY - 40} s={1.04} z={54} f={f} spin={1.1 + i} /> : null
      ))}

      <Drum x={158} y={246} f={f} s={0.58} z={36} rate={RATE.s10} unit="$ / MIN" />

      <Hero f={f} x={806} y={GY} size={288} z={62} act={2} ph={0.9}
        costume={{ prof: 1 }} cheer={coins * 0.8} lift={load * 0.4} reach={138}
        gaze={-0.8} />
      <Contact x={806 - 119} y={GY + 4} w={238} o={0.40} z={41} />
    </Scene>
  );
};

/* =========================================================================
   S11 · THE ACT BREAK — "But this third repo is the most powerful."
   ⭐ THE VILLAIN COMES BACK HERE, hero-sized nowhere but visibly re-lit, because
   the third act is about the ONE cost the first two repos never touched.
   EVENT: before, the room on the second-act light · trigger, he throws a knife
   switch · travel, the blades close 64 degrees and the arc jumps · arrival, the
   whole room re-lights, a third rank of gear starts turning, the drum lamp
   comes on.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("drum");
  /* ⛔⛔ REBUILT. The line is *"but this third repo is the most powerful"* and
     the picture was a man throwing a knife switch in a brown room. A switch is
     not a comparison, and nothing in the shot said MOST — which is the
     *"doesn't correspond with what's being said"* note exactly.
     ⭐ THE ONLY WORDLESS WAY TO SAY "MOST" IS A SIZE COMPARISON, in the reel's
     own objects: the two marks already seated are 130px, and the socket waiting
     for the third is empty and twice that. A 300px disc comes down into it and
     the rail BOWS under the weight — weight is deformation, so the beam bending
     is what says "powerful" rather than the size alone.
     ⛔ It also hands straight off to S12, where the hoist lowers that same disc
     the rest of the way. */
  /* ⛔ "THE ANIMATION CONCEPT IS TOO BORING." The mapping was right — size says
     MOST, a bowing beam says POWERFUL — but the staging was a 26-frame gentle
     LOWER onto a rail, and a thing arriving politely is not a thing that is
     powerful. It now FALLS: an accelerating drop, a slam that bows the beam
     more than twice as far, rivets popping off it, dust down its whole length,
     and the two small marks knocked swinging on their hangers. Same mapping,
     the CONSEQUENCE staged instead of the arrival. */
  const drop = E(f, 6, 24, 0, 1, IN_Q);
  const land = E(f, 24, 34, 0, 1, OUT);
  const ring = f > 24 ? Math.sin((f - 24) * 0.62) * Math.exp(-(f - 24) / 9) * 34 : 0;
  const slam = E(f, 24, 27, 0, 1, OUT) - E(f, 27, 44, 0, 1, IO);
  const BX = 620 + LAY[v].beat * 4;
  /* ⛔⛔ dHASH MIN 9 AT f739 — under the 10 bar, i.e. a duplicate risk. The only
     per-cut lever in this scene was `beat * 4`, which moved a LAMP by 32px: the
     rail, its stanchions, the three marks, the medallion and the hero all sat on
     identical coordinates in every cut, so the frame differed by grade alone and
     a grade is worth ~1 bit (`feedback_dhash_is_geometry`). The whole rig now
     slides per cut, which is the geometry the hash actually reads. */
  const SX = LAY[v].beat * 15;
  /* the beam bows in proportion to what is hanging on it, and rings out after */
  const bow = drop * 30 + slam * 34 + ring;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.54} glow={hexa(p.key, 0.26)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="plant" overhead="gantry"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={5.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} lamp={{ x: BX, y: 220, r: 320 }} />
      <MeterWall y={144} f={f} z={20} cols={11} rows={2} live={1} c="#96601E" dim={0.30} />
      <PipeRun y={262} f={f} z={22} h={70} rate={14} pitch={148} c={EMBER} />
      <div style={{ position: "absolute", left: 944, top: 200, width: 138, height: 650,
        zIndex: 74, borderRadius: 6,
        background: `linear-gradient(266deg, #2C1708 0%, #120802 100%)` }} />

      {/* THE RAIL — a real beam on two stanchions, and it BOWS. A sampled
          centre-line, so the sag is zero and flat at both ends and the sockets
          ride on the curve rather than floating over it. */}
      {[196 + SX, 1016 + SX].map((lx) => (
        <div key={lx} style={{ position: "absolute", left: lx - 20, top: 400, width: 40,
          height: 306, zIndex: 30, borderRadius: 4,
          background: `linear-gradient(96deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
      ))}
      {Array.from({ length: 22 }, (_, i) => {
        const u = i / 21;
        const cy = 400 + Math.sin(Math.PI * u) * bow;
        return (
          <div key={"bm" + i} style={{ position: "absolute", left: 196 + SX + u * 820 - 21, top: cy - 13,
            width: 42, height: 26, zIndex: 32,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.28)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
        );
      })}

      {/* the two that are already on: 130px, and they are the SMALL ones */}
      {[0, 1].map((i) => {
        const u = [0.30, 0.46][i];
        const cy = 400 + Math.sin(Math.PI * u) * bow;
        return (
          <React.Fragment key={"sm" + i}>
            <div style={{ position: "absolute", left: 196 + SX + u * 820 - 9, top: cy, width: 18,
              height: 40, zIndex: 33, background: dkh(STEEL, 0.44) }} />
            {/* knocked swinging by the landing — the two already on the rail are
                how you SEE the shock travel along it */}
            <div style={{ position: "absolute", left: 196 + SX + u * 820, top: cy + 4, width: 0,
              height: 0, zIndex: 44,
              transform: `rotate(${f > 24 ? Math.sin((f - 24) * 0.44 + i * 1.1) * Math.exp(-(f - 24) / 13) * 21 : 0}deg)`,
              transformOrigin: "0px 0px" }}>
              <RepoDisc x={0} y={104} d={130} z={44} f={f}
                logo={["deepseek.svg", undefined][i]} rock={i === 1}
                c={[SLATE, OXIDE][i]} />
            </div>
          </React.Fragment>
        );
      })}

      {/* ⭐ THE THIRD SOCKET IS TWICE THE SIZE AND EMPTY ON FRAME 1 — the before
          state the comparison needs. */}
      {(() => {
        const u = 0.78, cy = 400 + Math.sin(Math.PI * u) * bow, cx = 196 + SX + u * 820;
        return (<React.Fragment>
          <div style={{ position: "absolute", left: cx - 16, top: cy, width: 32,
            height: 58, zIndex: 33, background: dkh(STEEL, 0.40) }} />
          {drop < 0.9 && (
            <div style={{ position: "absolute", left: cx - 44, top: cy + 52, width: 88, height: 30,
              zIndex: 34, borderRadius: 4, background: "#070B0E",
              boxShadow: `inset 0 5px 10px ${hexa("#000", 0.92)}` }} />
          )}
          <RepoDisc x={cx} y={-190 + (cy + 214 - -190) * drop + slam * 12} d={300} z={64} f={f}
            logo="github.svg" c={PCB} rot={(1 - drop) * -70 + ring * 0.5} />
          {f >= 24 && f < 48 && <Ring x={cx} y={cy + 214} f={f} at={24} c={GOLD} z={70} />}
          {f >= 24 && f < 48 && <Puff x={cx} y={cy + 214} f={f} at={24} c="#E4CE9E" z={71} n={11} s={1.5} />}
          {/* dust shaken off the WHOLE beam, so the load is felt along its length */}
          {f >= 24 && f < 50 && [0.18, 0.34, 0.50, 0.64, 0.90].map((u2) => (
            <Puff key={"bd" + u2} x={196 + SX + u2 * 820} y={400 + Math.sin(Math.PI * u2) * bow + 18}
              f={f} at={24 + u2 * 3} c={p.grit} z={58} n={6} s={0.95} />
          ))}
          {/* and rivets jumping off it */}
          {f >= 24 && Array.from({ length: 7 }, (_, i2) => {
            const t = (f - 24 - i2 * 1.3) / 22;
            if (t < 0 || t > 1) return null;
            const rx = 250 + SX + i2 * 108, ry = 400 + Math.sin(Math.PI * ((rx - 196) / 820)) * bow;
            return (
              <div key={"rv" + i2} style={{ position: "absolute", zIndex: 66,
                left: rx + (i2 % 2 ? 1 : -1) * t * 96, top: ry - 60 * Math.sin(Math.PI * t) + t * t * 300,
                width: 15, height: 15, borderRadius: 8, opacity: t > 0.86 ? (1 - t) / 0.14 : 1,
                transform: `rotate(${t * 520}deg)`,
                background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.46)}, ${dkh(BRASS, 0.60)})` }} />
            );
          })}
        </React.Fragment>);
      })()}

      {/* ⭐ THE COUNT, ASKED FOR BY NAME. The line is "this THIRD repo" and the
          reel has spent 24s reaching it — a single big numeral over the rail is
          the one place a character earns its keep here. It drops in with the
          disc and takes the same shock. */}
      {/* ⛔ A NUMERAL ON A ROOM IS NOT A GRAPHIC. Bare cream type over a brown
          plant wall had nothing to sit on, so it read as a caption someone had
          dropped on the shot. It now hangs as a STAMPED BRASS MEDALLION on the
          same rail as the marks — an object in the world, with a rim, bolts and
          a shadow, which is the only reason a character is allowed here. */}
      {(() => {
        const nk = E(f, 2, 15, 0, 1, OUT);
        if (nk <= 0.001) return null;
        const D = 268;
        return (
          <div style={{ position: "absolute", left: 506 + SX * 0.7 - D / 2, top: 176, width: D, height: D,
            zIndex: 76, pointerEvents: "none", opacity: Math.min(1, nk * 1.6),
            transform: `scale(${0.66 + nk * 0.34 + slam * 0.05}) translateY(${(1 - nk) * -34 + ring * 0.6}px)` }}>
            {/* the hanger, so it belongs to the rail rather than floating */}
            <div style={{ position: "absolute", left: D / 2 - 7, top: -46, width: 14, height: 58,
              background: dkh(STEEL, 0.40) }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: SH_D,
              background: `linear-gradient(158deg, ${mxh(BRASS, 0.68)} 0%, ${mxh(BRASS, 0.10)} 46%, ${dkh(BRASS, 0.46)} 100%)`,
              border: `7px solid ${dkh(BRASS, 0.58)}` }} />
            <div style={{ position: "absolute", inset: 22, borderRadius: "50%",
              background: `radial-gradient(circle at 38% 30%, #FCF8EE 0%, ${CREAMB} 66%, #D6CEBA 100%)`,
              border: `4px solid ${dkh(BRASS, 0.44)}`, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(168, 900), lineHeight: 0.82, color: "#2A1608",
                letterSpacing: -6, marginTop: -6 }}>3</span>
            </div>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: D / 2 - 6, top: 9, width: 12,
                height: 12, borderRadius: 6, background: dkh(BRASS, 0.56),
                transformOrigin: `50% ${D / 2 - 9}px`, transform: `rotate(${i * 45}deg)` }} />
            ))}
          </div>
        );
      })()}

      <Drum x={150} y={252} f={f} s={0.58} z={36} rate={RATE.s11} unit="$ / MIN"
        strain={land * 0.5} />

      {/* HERO: he takes the strain on the guide rope and is driven down by the
          landing. What the Claude DOES here is HOLD something too heavy. */}
      <Hero f={f} x={228 + SX * 0.6} y={GY + land * 20} size={322} z={60} act={1}
        costume={{ constr: 1 }} strain={0.3 + drop * 0.6}
        drive={drop * 0.4} lift={1 - drop} heat={drop * 0.42}
        shock={E(f, 24, 29, 0, 1, OUT) * (1 - E(f, 34, 50, 0, 1, IO))}
        reach={150} gaze={0.7} />
      <Contact x={228 - 119} y={GY + 4} w={238} o={0.40} z={41} />
      {f > 12 && <Sweat x={228} y={GY - 250} f={f} at={12} n={4} z={65} />}
    </Scene>
  );
};

/* =========================================================================
   S12 · PLATE BAY 3 — "Third is Token Saver."
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("plate3");
  /* the third verb: LOWERED. A hoist brings it down into his hands, the chains
     go slack on the land, and the load rings out — nothing lands and stops. */
  const drop = E(f, 4, 24, 0, 1, IO);
  const ring = f > 24 ? Math.sin((f - 24) * 0.58) * Math.exp(-(f - 24) / 7) * 16 : 0;
  const PX = 596 + LAY[v].main * 0.2;
  const py = 150 + drop * 300 + ring;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.36} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="rack" overhead="gantry"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={5.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: PX, y: 206, r: 290 }} />
      <div style={{ position: "absolute", left: -46, top: 236, width: 120, height: 630,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(96deg, #2A2038 0%, #0C0814 100%)` }} />
      <PipeRun y={620} f={f} z={22} h={68} rate={12.5} pitch={144} c={PCB} />
      {/* the GANTRY the hoist runs on — a beam, its rails and four hangers, so
          the load is hanging from something rather than from nothing */}
      <div style={{ position: "absolute", left: -40, top: 96, width: W + 80, height: 30,
        zIndex: 30, background: `linear-gradient(180deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
      {[80, 300, 720, 940].map((lx) => (
        <div key={lx} style={{ position: "absolute", left: lx, top: 40, width: 14, height: 60,
          zIndex: 29, background: dkh(STEEL, 0.46) }} />
      ))}
      {/* the two stands already filled, so the third landing is a COMPLETION */}
      {[0, 1].map((i) => (
        <React.Fragment key={"sd" + i}>
          <div style={{ position: "absolute", left: 96 + i * 148, top: 452, width: 112,
            height: 254, zIndex: 32, borderRadius: 4,
            background: `linear-gradient(96deg, ${mxh(VIOLET, 0.18)} 0%, ${dkh(VIOLET, 0.52)} 100%)` }} />
          <RepoDisc x={142 + i * 162} y={392} d={98} z={40} f={f}
            logo={["deepseek.svg", undefined][i]} rock={i === 1}
            c={[SLATE, OXIDE][i]} seat={0.55} />
        </React.Fragment>
      ))}
      <Pool x={PX} y={GY + 8} w={560} c={p.key} o={0.30} />

      {/* the hoist: a trolley on the gantry and two real chains that SHORTEN */}
      <div style={{ position: "absolute", left: PX - 54, top: 118, width: 108, height: 34,
        zIndex: 46, borderRadius: 5,
        background: `linear-gradient(178deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
      {[-72, 72].map((dx2) => (
        <div key={dx2} style={{ position: "absolute", left: PX + dx2 - 4, top: 148,
          width: 8, height: Math.max(4, py - 196), zIndex: 45,
          background: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.30)} 0 8px, ${dkh(STEEL, 0.56)} 8px 16px)` }} />
      ))}
      <RepoDisc x={PX} y={py} d={324} z={58} f={f}
        logo="github.svg" c={PCB} rot={ring * 0.18} />
      {f >= 24 && f < 46 && <Ring x={PX} y={py} f={f} at={24} c={GOLD} z={68} />}

      <Drum x={888} y={266} f={f} s={0.60} z={36} rate={RATE.s12} unit="$ / MIN" />

      <Hero f={f} x={PX - 286} y={GY} size={264} z={60} act={2} ph={0.8}
        costume={{ glasses: 1 }} lift={drop} cheer={drop * 0.6} reach={152} gaze={0.8} />
      <Contact x={PX - 286 - 118} y={GY + 4} w={236} o={0.40} z={41} />
      <Forearm x0={PX - 286 + 92} y0={GY - 214} x1={PX - 96} y1={py + 44} c={CLAY} z={62} />
    </Scene>
  );
};

/* =========================================================================
   S13 · THE COLD CRADLE — "When you code with an expired cache it can cost you
   $9 on a single prompt."  ⭐⭐⭐ THE PEAK OF THE REEL.

   The mechanism, drawn: the prompt cache is a large mass kept HOT. Leave it an
   hour and the heat goes out of it; the next prompt has to rebuild the whole
   thing and pay for all of it again. That is the one thing in this subject a
   viewer has felt and cannot name, which is exactly what §5's "recognition"
   rule asks a shot to deliver.

   EVENT: before, the block glowing in its cradle and the clock running ·
   trigger, the minute hand lands at the hour (f22, the reel's third re-framing
   is a CUT here) · travel, the heat dies out of it from the bottom up over 20
   frames and it CRUMBLES into fourteen pieces · arrival, he has to shovel every
   piece back in by hand and the drum rockets to $9.
   ⛔ ONE DRIVER. `cool` drives the colour, the scale crust, the shimmer, the
   gauge and the crumble, so the object cannot end up half-cold.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cradle");
  const DIE = 22;
  const cool = E(f, DIE, DIE + 20, 0, 1, IO);
  const crumble = E(f, DIE + 14, DIE + 30, 0, 1, IN_Q);
  const shovel = E(f, DIE + 28, dur - 4, 0, 1, LIN);
  const CX = 592 + LAY[v].cradle * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.5 + cool * 0.10}
      glow={hexa(cool > 0.5 ? "#8A8A84" : p.key, 0.30 - cool * 0.14)}>
      {/* SHOT: VERY CLOSE — the reel's peak, and the tightest framing in it.
          The shot list runs 22%..52% of panel width, because 17 scenes inside a
          0.4pp band is reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.34} y={-54} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="joist"
        rake={0.16 - cool * 0.10} rakeX={RAKE_X[v]} rakeRate={5.4 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.7}
        lamp={{ x: CX, y: 300, r: 340 - cool * 160 }} />
      <div style={{ position: "absolute", left: -50, top: 226, width: 130, height: 650,
        zIndex: 74, borderRadius: 6,
        background: `linear-gradient(96deg, #341404 0%, #140602 100%)` }} />

      {/* the heat pool under the block — it DIES, which is what makes the room
          go with the object rather than the object going alone */}
      <PipeRun y={344} f={f} z={22} h={72} rate={16 - cool * 13} pitch={148} c={EMBER}
        dead={cool > 0.7 ? 1 : 0} />
      <MeterWall y={132} f={f} z={20} cols={11} rows={2} live={1 - cool} c="#8A5A2E" dim={cool * 0.5} />
      <Pool x={CX} y={GY + 8} w={520 - cool * 200} c={cool > 0.5 ? "#8A8A84" : p.key}
        o={0.36 - cool * 0.22} />

      <Cradle x={CX} y={GY - 34} s={1.30} z={44} f={f} temp={1 - cool} />
      <CacheBlock x={CX} y={GY - 62} s={1.36} z={54} f={f} cool={cool} crumble={crumble}
        label="YOUR CONTEXT" />

      {/* ⛔ "JUST THOSE GRAY ROCKS, SO BORING." A block that cools and crumbles
             ends as grey rubble on a table — the right idea with nothing to
             watch. What actually dies here is the CONTEXT, and this reel already
             owns an object for that: TOKENS. The block splits and pours its
             contents out over the cradle, each one going out from live gold to
             dead ash on the way down, and they PILE UP — so the table ends with
             visibly more dead context on it than it started with. */}
      {f >= DIE && Array.from({ length: 26 }, (_, i) => {
        const at = DIE + i * 1.15;
        if (f < at) return null;
        const t = Math.min(1, (f - at) / 20);
        const sx = (i % 7 - 3) * 34 + (i % 3 - 1) * 13;
        const px = CX + sx + sx * t * 0.55;
        const py = GY - 150 + (128 + Math.abs(sx) * 0.16) * t * t;
        const dead = Math.min(1, t / 0.62);                 /* gold -> ash on the way down */
        return (
          <div key={"sp" + i} style={{ position: "absolute", inset: 0, zIndex: 56,
            filter: `grayscale(${dead}) brightness(${1 - dead * 0.52})` }}>
            <Token x={px} y={py} s={0.44} z={56} f={f} spin={t * 260 + i * 31} dead={dead > 0.8 ? 1 : 0} />
          </div>
        );
      })}
      {/* the split itself — a bright seam that opens and goes out */}
      {f >= DIE - 2 && (
        <div style={{ position: "absolute", left: CX - 128, top: GY - 176, width: 256,
          height: 10 + crumble * 16, zIndex: 55, borderRadius: 4,
          opacity: Math.max(0, 1 - cool * 1.15),
          background: `linear-gradient(180deg, ${hexa("#FFCE7A", 0.92)} 0%, ${hexa(EMBER, 0.30)} 100%)`,
          boxShadow: `0 0 ${26 + crumble * 30}px ${hexa("#FFB65A", 0.6 * (1 - cool))}` }} />
      )}
      {f >= DIE && f < DIE + 46 && <Puff x={CX} y={GY - 176} f={f} at={DIE + 2}
        c="#7E7A72" z={57} n={10} s={1.35} />}

      {/* the clock — the trigger, and it is running from frame 1 so the hour
          landing is a payoff rather than a surprise */}
      <IdleClock x={228} y={272} s={1.0} z={50} f={f}
        t={E(f, 0, DIE, 0.62, 1.0, LIN)} alarm={E(f, DIE - 8, DIE, 0, 1, OUT)} />

      {/* the drum ROCKETS. This is the one scene where it is allowed to run
          away, and it is the villain's win. */}
      {/* ⛔ "THERE SHOULD ACTUALLY BE A COIN PILE GETTING LESS AND LESS." The
             scene's claim is that a dead cache COSTS you $9, and the only thing
             on screen that carried it was a red numeral and a spinning drum. A
             pile that drains is the claim itself: 26 coins stacked shoulder-high
             beside him, and from the moment the cache dies they leave, one at a
             time, up to the meter. What he has is visibly LESS at the end. */}
      {(() => {
        const N = 26;
        const gone = Math.round(E(f, DIE + 2, dur - 8, 0, 1, LIN) * N);
        const PX2 = 452 + LAY[v].cradle * 0.2;
        return (
          <React.Fragment>
            {Array.from({ length: N }, (_, i) => {
              /* a real heap: wide at the base, one on top */
              const row = Math.floor((Math.sqrt(8 * i + 1) - 1) / 2);
              const idx = i - (row * (row + 1)) / 2;
              const wide = row + 1;
              const cx = PX2 + (idx - (wide - 1) / 2) * 46;
              const cy = GY - 24 - (6 - row) * 40;
              if (i >= N - gone) return null;                 /* taken off the TOP */
              return <Token key={"pl" + i} x={cx} y={cy} s={0.80} z={53} f={f}
                spin={i * 37} />;
            })}
            {/* the ones leaving, arcing up to the meter that is counting them */}
            {Array.from({ length: N }, (_, i) => {
              const at = DIE + 2 + i * ((dur - 10 - DIE) / N);
              const t = (f - at) / 15;
              if (t <= 0 || t >= 1) return null;
              const row = Math.floor((Math.sqrt(8 * (N - 1 - i) + 1) - 1) / 2);
              const sx = PX2, sy = GY - 24 - (6 - row) * 40;
              return (
                <div key={"fly" + i} style={{ position: "absolute", inset: 0, zIndex: 62,
                  opacity: t > 0.82 ? (1 - t) / 0.18 : 1 }}>
                  <Token x={sx + (742 - sx) * t} y={sy - 232 * Math.sin(Math.PI * t * 0.86) + (330 - sy) * t * t}
                    s={0.80 - t * 0.26} z={62} f={f} spin={t * 420 + i * 23} />
                </div>
              );
            })}
          </React.Fragment>
        );
      })()}

      <Drum x={758} y={264} f={f} s={0.88} z={46}
        rate={E(f, DIE, DIE + 8, 2.0, RATE.s13, OUT)} unit="$ SPENT"
        strain={E(f, DIE, DIE + 10, 0, 0.9, OUT)} />
      {f >= DIE + 8 && (
        <div style={{ position: "absolute", left: 684, top: 348, zIndex: 68 }}>
          <span style={{ ...mono(58, 900), color: RED, letterSpacing: -1,
            transform: `scale(${squash(f - DIE - 8, 8, 0.2, 4, 12)})`, display: "block" }}>
            {R.r3.spike}
          </span>
        </div>
      )}

      {/* HERO: he SHOVELS it back in by hand. That is what paying twice is, and
          it is a real repeated body action with distance, not a reaction shot. */}
      <Hero f={f} x={338} y={GY} size={322} z={60} act={1}
        costume={{ constr: 1 }}
        strain={0.3 + shovel * 0.55}
        drive={Math.sin(shovel * 22) * 0.4}
        heat={0.2 + cool * 0.55}
        stern={cool * 0.9}
        shock={E(f, DIE + 14, DIE + 20, 0, 1, OUT) * (1 - E(f, DIE + 26, DIE + 40, 0, 1, IO))}
        reach={134} />
      <Contact x={338 - 98} y={GY + 4} w={238} o={0.40} z={41} />
      {f > DIE + 26 && <Sweat x={338} y={GY - 214} f={f} at={DIE + 26} n={5} z={65} />}
      {/* what he is shovelling — pieces travelling back toward the cradle */}
      {shovel > 0.02 && Array.from({ length: 6 }, (_, i) => {
        const t = ((f - DIE - 28) / 9 + i * 0.4) % 1;
        return (
          <div key={"sv" + i} style={{ position: "absolute",
            left: 420 + t * 130, top: GY - 120 - Math.sin(t * Math.PI) * 120,
            width: 30, height: 22, borderRadius: 4, zIndex: 58,
            transform: `rotate(${t * 200}deg)`,
            background: "linear-gradient(160deg, #55534C 0%, #2C2A26 100%)" }} />
        );
      })}
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S14 · THE HUNT — "So this free repo runs in the background and finds when
   your cache expires,"
   ⭐⭐ THE ADVERB IS THE STAGING. "In the background" means HE IS DOING SOMETHING
   ELSE — so the hero works at the bench with his BACK TURNED for the whole
   scene and never looks round, while the arm hunts behind him. Two things at
   once, said by the blocking before the words get there.
   ⭐ AND THE VERB IS "FINDS", so the arm HUNTS FIRST: it tracks the rail, its
   search cone sweeping, hesitates, then LOCKS (the eye goes amber to green).
   An arm that simply closes depicts the outcome and not the sentence.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cold");
  /* the hunt: out, back, out again, then lock — a search, not a traverse */
  const tr = 0.5 + Math.sin(f * 0.145) * 0.44 * (1 - E(f, 30, 42, 0, 1, IO));
  const travel = f < 42 ? tr : 0.5 + (tr - 0.5) * 0;
  const lock = E(f, 40, 46, 0, 1, OUT);
  /* ⛔ THE SCENE ENDED ON THE LOCK AND THEN HELD FOR 23% OF ITS LENGTH — the arm
     found the expiring cache and did nothing about it, which is half a mechanism
     and scored 5.34 STATIC. The repo's whole point is the REFRESH: it clamps
     down at 3,590s and re-stamps the block before the hour runs out, and the
     block REHEATS from nearly-cold back to hot. That is the destination — there
     is MORE HEAT at the end of the scene than at the start. */
  const shut  = E(f, 46, 55, 0, 1, OUT);
  const stamp = E(f, 53, 64, 0, 1, OUT);
  const cool  = 0.76 - stamp * 0.68;              /* cold -> hot, a 300px object */
  const hand  = 300 + E(f, 0, 52, 0, 56, IO) - stamp * 112;
  const slip  = E(f, 4, 52, 0, 168, IO) - stamp * 196;   /* creeping off the cradle */
  const CX = 596 + LAY[v].cradle * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.52} glow={hexa(p.key, 0.16)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: CX, y: 432, r: 330 }} />
      <div style={{ position: "absolute", left: 940, top: 220, width: 126, height: 640,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(266deg, #2E3437 0%, #0C0F11 100%)` }} />

      <PipeRun y={596} f={f} z={22} h={66} rate={7} pitch={138} c={SLATE} />
      <MeterWall y={136} f={f} z={20} cols={11} rows={2} live={0.4} c="#5E666A" dim={0.30} />
      <Cradle x={CX} y={GY - 34} s={1.30} z={44} f={f} temp={0.56} />
      <CacheBlock x={CX + slip} y={GY - 62 + Math.max(0, slip) * 0.10} s={1.36} z={48} f={f}
        cool={cool} label="YOUR CONTEXT" />

      {/* THE ARM, hunting. Its rail runs the width of the working area, so the
          search has somewhere to happen. */}
      <GuardArm x={CX + slip * lock} y={286} s={1.0} z={62} f={f} travel={travel} lock={lock} shut={shut} />



      {/* the idle counter it is watching — the repo's own 3,590s guard, on a
          real counter head rather than as a caption */}
      <div style={{ position: "absolute", left: CX + 214, top: 372, width: 172, height: 60,
        zIndex: 50, borderRadius: 5,
        background: `linear-gradient(168deg, #2A3034 0%, #12161A 100%)`,
        border: `3px solid #070A0C`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        {/* ⛔ this printed 3,590s, which the header band already says. A clock
               face with one hand near the top does the same job with no type. */}
        <div style={{ position: "relative", width: 44, height: 44, borderRadius: 22,
          background: `radial-gradient(circle at 38% 32%, ${PAPER}, ${CREAMB})`,
          border: `3px solid ${dkh("#2A3034", 0.30)}` }}>
          <div style={{ position: "absolute", left: 19, top: 6, width: 3, height: 17,
            background: stamp > 0.4 ? GREEN : RED, transformOrigin: "50% 100%",
            transform: `rotate(${hand}deg)` }} />
          <div style={{ position: "absolute", left: 18, top: 18, width: 7, height: 7,
            borderRadius: 4, background: INK }} />
        </div>
      </div>

      {/* what the refresh PUTS BACK — six tokens returning to the block, so the
          count of things in it is visibly higher at the end than at the start */}
      {stamp > 0.02 && Array.from({ length: 6 }, (_, i) => {
        const at = 56 + i * 2.4;
        if (f < at) return null;
        const t = Math.min(1, (f - at) / 12);
        /* ⛔ Token takes `spin`, not `rot`, and owns no opacity — the fade is the
           wrapper's job. Read the prop before drawing to it. */
        return (
          <div key={"tk" + i} style={{ position: "absolute", inset: 0, zIndex: 64,
            opacity: t < 0.86 ? 1 : Math.max(0, (1 - t) / 0.14) }}>
            <Token x={CX + 250 - t * 250} y={GY - 250 + t * 150 - Math.sin(t * Math.PI) * 74}
              s={0.80} z={64} f={f} spin={(1 - t) * 220} />
          </div>
        );
      })}
      <Drum x={166} y={252} f={f} s={0.58} z={36} rate={RATE.s14} unit="$ / MIN" />

      {/* HERO: BACK TURNED, working, for the whole scene. He never looks round.
          That is what "in the background" means and it is drawn, not written. */}
      <Hero f={f} x={276} y={GY} size={244} z={60} act={1} ph={0.15}
        costume={{ glasses: 1 }} strain={0.34} drive={Math.sin(f * 0.34) * 0.26}
        reach={120} gaze={-0.9} />
      <Contact x={276 - 96} y={GY + 4} w={238} o={0.40} z={41} />
      {/* his bench, and the work coming off it — the second simultaneous thing */}
      <div style={{ position: "absolute", left: 132, top: GY - 96, width: 300, height: 24,
        zIndex: 36, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.28)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
      {Array.from({ length: 4 }, (_, i) => {
        const at = 6 + i * 16;
        if (f < at) return null;
        const t = Math.min(1, (f - at) / 14);
        return <CodeBar key={"cb" + i} x={188 + t * 120} y={GY - 132 - t * 40} s={0.46}
          z={52} rot={t * 30} />;
      })}
    </Scene>
  );
};

/* =========================================================================
   S15 · THE SAVE — "fixing it and saving you thousands of tokens each time."
   EVENT: before, the arm locked over the cradle and the clock about to land ·
   trigger, the shutter drives at f6 · travel, it comes down 148px and LATCHES ·
   arrival, the block stays lit (the cool never starts), and the tokens that
   would have been re-sent pour into a bin he is holding, which fills.
   ⭐ A REPEATED REWARD ONLY READS AS PROGRESS WHEN IT CLIMBS — the bin fills in
   five discrete pours, each bigger than the last, rather than as one ramp.
   ====================================================================== */
export const S15: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("relit");
  const shut = E(f, 6, 16, 0, 1, IN_Q);
  const POUR = [20, 30, 40, 50, 60];
  const poured = POUR.filter((t) => f >= t).length;
  const CX = 620 + LAY[v].cradle * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.080]} vig={0.54} glow={hexa(p.key, 0.30)}>
      {/* SHOT: MEDIUM — the shot list runs 22%..52% of panel
          width across the reel, because 17 scenes inside a 0.4pp band is
          reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.1} y={-20} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
        rake={0.16} rakeX={RAKE_X[v]} rakeRate={6.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: CX, y: 250, r: 340 }} />
      <div style={{ position: "absolute", left: -48, top: 220, width: 128, height: 650,
        zIndex: 74, borderRadius: 6,
        background: `linear-gradient(96deg, #401804 0%, #180702 100%)` }} />

      <PipeRun y={256} f={f} z={22} h={74} rate={17} pitch={156} c={EMBER} />
      <MeterWall y={128} f={f} z={20} cols={11} rows={2} live={1} c="#A8642A" dim={0.14} />
      <Pool x={CX} y={GY + 8} w={540} c={p.key} o={0.36} />
      <Cradle x={CX} y={GY - 34} s={1.30} z={44} f={f} temp={0.94} />
      {/* ⭐ the block NEVER COOLS in this scene. cool=0 throughout is the fix. */}
      <CacheBlock x={CX} y={GY - 62} s={1.36} z={48} f={f} cool={0} label="YOUR CONTEXT" />
      <GuardArm x={CX} y={286} s={1.0} z={62} f={f} travel={0.5} lock={1} shut={shut} />
      {/* ⭐⭐ THE FIX, ON THE WORDS. "fixing it" is spoken at scene-local f0-13
          — ⛔ and I first built this into S14, which ends on f935, the exact
          frame the word starts. A named second is a FRAME: convert it before
          acting. S15 spent those 13 frames closing an arm and nothing else.
          Now a weld seam runs the width of the block as the clamp bites,
          throwing sparks, and the crack closes behind it. */}
      {(() => {
        const weld = E(f, 1, 15, 0, 1, IO);
        if (weld <= 0.002) return null;
        const BW = 300;
        return (
          <React.Fragment>
            <div style={{ position: "absolute", left: CX - BW / 2, top: GY - 178,
              width: BW * weld, height: 14, zIndex: 66, borderRadius: 3,
              background: `linear-gradient(180deg, ${hexa("#FFF2D2", 0.95)} 0%, ${hexa("#FF9A3C", 0.5)} 100%)`,
              boxShadow: `0 0 ${34 + (1 - Math.abs(weld - 0.5) * 2) * 40}px ${hexa("#FFC06A", 0.82)}` }} />
            {weld < 0.99 && (
              <div style={{ position: "absolute", left: CX - BW / 2 + BW * weld - 26, top: GY - 204,
                width: 52, height: 52, borderRadius: 26, zIndex: 68,
                background: `radial-gradient(circle, ${hexa("#FFFFFF", 0.96)} 0%, ${hexa("#FFC46A", 0.58)} 42%, ${hexa("#FF8A2C", 0)} 74%)` }} />
            )}
            {weld < 0.99 && Array.from({ length: 16 }, (_, i) => {
              const t = ((f * 0.17 + i * 0.23) % 1);
              return (
                <div key={"sk" + i} style={{ position: "absolute", zIndex: 69,
                  left: CX - BW / 2 + BW * weld + (i % 2 ? 1 : -1) * t * 104,
                  top: GY - 196 + t * t * 150, width: 7, height: 7, borderRadius: 4,
                  opacity: 1 - t, background: i % 3 ? "#FFD98A" : "#FFF4DC" }} />
              );
            })}
            {/* the block flares as the seal takes */}
            <div style={{ position: "absolute", left: CX - 210, top: GY - 300, width: 420,
              height: 300, zIndex: 46, borderRadius: "50%", filter: "blur(30px)",
              opacity: (1 - Math.abs(weld - 0.55) * 2) * 0.66,
              background: `radial-gradient(ellipse, ${hexa("#FFB24A", 0.72)} 0%, ${hexa("#FF8A2C", 0)} 70%)` }} />
          </React.Fragment>
        );
      })()}
      {f >= 16 && f < 36 && <Ring x={CX} y={430} f={f} at={16} c={GREEN} z={70} />}

      {/* the tokens that would have been re-sent, pouring into his bin in five
          discrete runs — each pour bigger than the one before it */}
      {POUR.map((at, i) => {
        if (f < at || f > at + 16) return null;
        const n = 3 + i;
        return Array.from({ length: n }, (_, j) => {
          const t = Math.min(1, (f - at - j * 1.2) / 12);
          if (t <= 0) return null;
          return <Token key={`p${i}_${j}`} x={CX - 130 - t * 268 + j * 12}
            y={430 + t * t * 230} s={0.46} z={64} f={f} spin={f * 0.3 + j} />;
        });
      })}
      {POUR.map((at, i) => f >= at + 12 && f < at + 26 ? (
        <Ring key={"rg" + i} x={252} y={GY - 132} f={f} at={at + 12} c={GOLD} z={66} s={0.7} />
      ) : null)}

      <SaveBin x={252} y={GY} s={0.94} z={52} f={f} fill={poured / POUR.length}
        tally={poured >= POUR.length ? R.r3.fix : undefined} />

      <Drum x={880} y={262} f={f} s={0.58} z={36} rate={RATE.s15} unit="$ / MIN" />

      {/* HERO: he holds the bin and takes the weight as it fills — the arrival
          costs him something, which is what stops it reading as a state change */}
      <Hero f={f} x={424} y={GY} size={316} z={60} act={2} ph={0.6}
        costume={{ constr: 1 }} strain={poured * 0.16} cheer={poured >= 3 ? 0.85 : 0.2}
        reach={140} gaze={0.7} />
      <Contact x={424 - 95} y={GY + 4} w={238} o={0.40} z={41} />
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S16 · THE GATE — "Comment USAGE for the free guide."
   ⛔ HARD CUT ON THE KEYWORD. The plate is struck on the frame the word is
   said, and the drum is STILL TURNING behind him at 0.9 — the villain is never
   beaten and the last frame of the reel says so.
   ====================================================================== */
export const S16: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const strike = E(f, 8, 13, 0, 1, IN_Q);
  const settle = squash(f - 13, 8, 0.2, 4, 13);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.060]} vig={0.5} glow={hexa(p.key, 0.28)}>
      {/* SHOT: MEDIUM — the shot list runs 22%..52% of panel
          width across the reel, because 17 scenes inside a 0.4pp band is
          reel 122's rejected figure with the spread taken out. */}
      <Cam s={1.06} y={-12} z={5}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="joist"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={5.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.5} lamp={{ x: 560, y: 210, r: 320 }} />
      <div style={{ position: "absolute", left: 936, top: 226, width: 130, height: 640,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(266deg, #3C261A 0%, #150C06 100%)` }} />
      <PipeRun y={620} f={f} z={22} h={70} rate={14} pitch={150} c={BRASS} />
      <Pool x={560} y={GY + 8} w={520} c={p.key} o={0.32} />

      {/* the gatepost the plate is fixed to */}
      <MeterWall y={150} f={f} z={20} cols={11} rows={2} live={1} c="#96754A" dim={0.30} />
      {/* the two gateposts the plate spans — a plate needs something to be ON */}
      {[336, 744].map((lx) => (
        <div key={lx} style={{ position: "absolute", left: lx, top: 300, width: 96, height: 406,
          zIndex: 40, borderRadius: 5,
          background: `linear-gradient(96deg, ${mxh("#6B5432", 0.30)} 0%, ${dkh("#6B5432", 0.48)} 100%)` }}>
          <div style={{ position: "absolute", left: -10, top: -18, width: 116, height: 24,
            borderRadius: 4,
            background: `linear-gradient(180deg, ${mxh("#6B5432", 0.42)} 0%, ${dkh("#6B5432", 0.32)} 100%)` }} />
        </div>
      ))}

      <div style={{ position: "absolute", inset: 0, zIndex: 66,
        transform: `scale(${settle})`, transformOrigin: "540px 396px" }}>
        <KeyPlate x={540} y={396} s={1.22} z={66} struck={strike} word={R.keyword} />
      </div>
      {f >= 13 && f < 34 && <Ring x={560} y={400} f={f} at={13} c={GOLD} z={70} />}
      {f >= 13 && f < 34 && <Puff x={560} y={430} f={f} at={13} c="#E0C89A" z={71} n={9} />}

      {/* ⛔ THE VILLAIN IS STILL TURNING ON THE LAST FRAME OF THE REEL. */}
      <Drum x={166} y={280} f={f} s={0.62} z={36} rate={RATE.s16} unit="$ / MIN" />

      <Hero f={f} x={812} y={GY} size={300} z={60} act={2} flip
        costume={{ constr: 1 }} drive={strike * 0.7} cheer={f > 16 ? 0.9 : 0.2}
        reach={144} gaze={-0.6} />
      <Contact x={812 - 98} y={GY + 4} w={238} o={0.40} z={41} />
      {[0, 1, 2].map((i) => (
        <Crew key={"cw" + i} f={f} x={210 + i * 116} y={GY} i={i + 6} size={126}
          z={44} at={2 + i * 4} loop={(i + 2) % 4} />
      ))}
          </Cam>
</Scene>
  );
};
