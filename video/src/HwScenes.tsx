import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Plate, BigNum, Contact, Mark, MarkPlate, MarkCast,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Runner, Sweat,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./HwWorld";
import {
  GpuCard, CardRack, VaultDoor, IronWeight, Crate, DialGauge, PriceGun, Totaliser,
  PaperRoll, Motherboard, PowerMeter, BusBar, DayBand, ServerBox, Drip, Pipe,
  Silo, HandPump, Laptop, Receipt, StrikePlate, NumDoor, CareCross, CivicCrest,
  BrokenCeiling, BrandTile, BurstCounter, Furnace, ServerHall, ModelBox, ModelCore, FuelPump, Nozzle, BigRig, FileCabinet, NightDesk, RoundVault, Register, ClockFace,
  Handwheel, DogBolt, ParamDial, CashBrick, HandTruck, NoteCounter, Stamper,
  Beacon, BeaconSweep, Klaxon, Verdict, ReliefValve, TripFlag, Gantry, SpotLamp, SpotBeam,
  TokenScreen, Padlock, DayNightClock, Rain,
} from "./HwProps";
import { Room, Jamb, Stack, Overhead, DeskSet, HouseFront, Strip2 } from "./HwSets";

/* ===========================================================================
   REEL 122 · "HARDWARE" — THE SCENES.  Board: storyboards/122-hardware.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing in this reel lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what does
   the CLAUDE DO here?* — never "what is around him". A hero standing in a busy
   room running an idle measured 8.94 and read as dead; the same set with the
   hero's body changing shape measured 14.09.
     S0  plugs the rack in and staggers as it spools
     S1  turns a wheel that spins free, then shoulders the door
     S2  takes the crate off the rollers as the front drops
     S3  rides the weighbridge down as the needle overruns
     S4  pushes seven cards home, one at a time, across the full scene
     S5  brings the price gun down and recoils off the stamp
     S6  drops seven cards in the tray, then slaps the motherboard down
     S7  throws the breaker and shields his face from the bus bar
     S8  watches the month run past from the lit window
     S9  turns, looks DOWN, and staggers back from the hatch
     S10 sits by the cup and checks a watch that is the only fast thing in frame
     S11 levers the floorboard up and puts his eye to the pipe
     S12 CRANKS THE PUMP and is visibly beaten by it — the peak of the reel
     S13 sets the laptop down and the work comes out in a rush
     S14 throws the first door bolt
     S15 works the plant line
     S16 stands at the sealed line
     S17 works the night floor
     S18 stands beside the struck plate holding the receipt

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the room does
   WHILE the scene happens. Every scene still owes its own four-part event.

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). The
   picture carries MARKS and NUMERALS; the header and the captions carry
   language. Plates never enter the ground line the cast stands on.

   ⛔ EVERY SCENE IS LOCKED. The reel has exactly FIVE re-framings — S8 f88,
   S10 f70 and f135, S12 f96, S18 f92 — and all five are CUTS, not drifts.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
/* ⛔⛔⛔ ROUND 62 — `rot` IS ZERO ON EVERY CUT AND STAYS THERE. Alex: *"the tilted
   version is bad… don't just tilt it and expect that is change, it sucks."*
   Correct on both counts:
     · a WHOLE-FRAME TILT reads as a mistake, not as a different edit. Nothing in
       the world is tilted — the camera is, so every horizon, every shelf and
       every floor line goes off-level together and the frame just looks wrong;
     · and it drags the corners in, so a 2.2 degree rotation costs real crop on
       top of the push it is already paying for.
   ⛔ AND IT WAS NEVER EARNING ITS KEEP. An 8x8 dHash is a GRADIENT SIGN per
   cell; a 2-degree rotation moves almost nothing across a cell boundary, so it
   was buying a defect for close to zero bits.
   ⭐ The separation comes from SHOT SIZE, OFFSET, CONTRAST, RAKE PHASE and
   per-cut LAYOUT — levers that read as a deliberate different cut.
   ⛔ `Scene` in NomWorld applies `rot` for EVERY reel in the repo, so it is
   neutralised HERE, reel-locally, and not in the shared component. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -8, dy: 12, s: 1.010, rot: 0 },
  amber: { dx: -48, dy: -28, s: 1.042, rot: 0 },
  steel: { dx: 50, dy: 26, s: 1.046, rot: 0 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` / `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.24) brightness(1.000)",
  amber: "contrast(1.150) saturate(1.24) brightness(0.960)",
  steel: "contrast(1.080) saturate(1.24) brightness(1.050)",
};

const PAR_X: Record<Variant, number> = { house: 0, amber: -46, steel: 40 };
/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH. `span = W + 420 = 1432`, so at
    n=7 the pitch is 204.6 and offsets of 0/214/428 are phases 0.0/9.4/18.9 —
    i.e. the top variant lever was INERT on a shipped reel. Varying `n` changes
    the pitch itself, which is the only offset that cannot collapse. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 96, steel: 172 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.84, steel: 0.46 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
/** ⭐ PER-CUT LAYOUT on the three flattest scenes — one large object on a plain
    field is the hardest frame to differentiate, and a grade has nothing to bite
    on there. At any sampled instant the subject is somewhere else. */
const LAY: Record<Variant, { vault: number; silo: number; plate: number; beat: number }> = {
  house: { vault: 0, silo: 0, plate: 0, beat: 0 },
  amber: { vault: 96, silo: -62, plate: -54, beat: -6 },
  steel: { vault: -108, silo: 78, plate: 86, beat: 9 },
};

type SP = { v: Variant; dur: number };

/** the ground line the cast stands on, house-wide */
const GY = 706;

/* the reserved plate band — ⛔ nothing else enters y 112..210 */
const BAND_Y = 132;

/* =========================================================================
   S0 · THE BACK BEDROOM — 0.00 to 1.76s (53f) · HOOK
   VO: "What would it cost to run Claude locally?"

   ⛔⛔⛔ HOOK v2. v1's mechanism was `DOESN'T FIT`: a rack already standing
   through the bedroom ceiling at frame 0, and then he plugs it in. It was
   rejected as boring and the diagnosis is one sentence about what the viewer
   wants to look at — **"doesn't fit" is a STATE, not an event.** The whole idea
   is legible at frame 0, nothing develops out of it, and "plugging something
   in" is not an action the eye can see. It is [[feedback_hook_simplicity]]'s
   reel-118 lesson again: *a building getting taller is a progress bar standing
   up — you know the ending at frame 8.*

   ⭐⭐⭐ MECHANISM (one word): `CRUSH`. Not a new costume on the same idea — a
   different WORD, which is the test that stops you shipping the same hook
   twice. And it is the highest-measured shape in the craft doc:
     · reel 119: SEAT and BREAK (both abstract) lost to PULL — **a BODY working
       against a LOAD** is the one thing a viewer reads instantly.
     · reel 112: the same hero, same set, same background — standing with an idle
       measured **8.94**; loaded and crushed so that HIS BODY CHANGES SHAPE
       measured **14.09**.
   Here the cost does not sit in the room, it lands ON HIM: he is already braced
   under one card at frame 0, and six more arrive on top across the full shot.

   ⛔ FRAME 0 IS SETTLED AND IT IS ALREADY THE JOKE: one graphics card is
      already too heavy. Nothing fades in, nothing is mid-roll.
   ⛔ THE FRAME-0 GATES ARE CARRIED BY THE ROOM AND THE DELIVERY NOTE, never by
      the hero or the stack — a gate carried by the wrong object deforms it.
   ⛔ IT DOES NOT RESOLVE: no total is spoken, no verdict, no explanation.
   ====================================================================== */
export const S0: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");

  /* six arrivals spread across the FULL 53 frames — an arrival inside the first
     third leaves the rest of the shot dead, and this shot has no spare frames */
  const LAND = [-10, 9, 18, 27, 36, 45];
  /* ⭐ each card sits at its OWN angle and offset, so its face is visible rather
     than its edge. Deterministic, never random — a re-render must be identical. */
  const PILE = [
    { x: 402, y: 452, rot:  -4, fx:   0, spin: -14 },
    { x: 336, y: 418, rot: -19, fx: -70, spin: -26 },
    { x: 470, y: 402, rot:  15, fx:  74, spin:  22 },
    { x: 380, y: 356, rot:  -9, fx: -40, spin: -18 },
    { x: 456, y: 318, rot:  21, fx:  58, spin:  28 },
    { x: 372, y: 280, rot: -14, fx: -52, spin: -22 },
    { x: 440, y: 244, rot:   7, fx:  46, spin:  16 },
  ];
  /* ⛔⛔⛔ dHASH IS 8x8 OVER THE WHOLE PANEL — each cell is 112x99px. Once the
     hook became three large uniform blocks (dark pile / bright window / tan
     floor) a 58px camera shift could not flip a single gradient sign, and
     house-vs-steel stuck at 6 bits against a bar of 10 through TWO attempts at
     the camera and the rake. Neither lever can reach a composition this blocky.
     ⭐ PER-CUT LAYOUT is the only one that can: give each cut its own PILE — a
     different silhouette for the largest dark mass in the frame — and its own
     window offset. Lowest-ranked lever in the table, and the correct one here. */
  const PJ = { house: 0, amber: 1, steel: 2 }[v];
  const JX = [0, -46, 52][PJ], JY = [0, 22, -26][PJ], JR = [0, -8, 11][PJ];
  const on = LAND.filter(a => f >= a).length;          /* how many have landed */
  const load = on / LAND.length;
  /* ⭐ AN ACTION IS A DISTANCE. He travels 96px DOWN over the shot — 32% of his
     own height, which clears §11's one-third floor. Under that it is a state
     change and the eye cannot resolve it at 30fps on a phone. */
  const sink = E(f, 4, dur - 2, 0, 132, IO) * (0.35 + load * 0.65);
  const strain = 0.22 + load * 0.74;
  /* the kick each card delivers, damped — nothing lands and simply stops */
  const kick = LAND.reduce((acc, at, i) =>
    acc + (f >= at ? Math.sin((f - at) * 1.35) * (7 + i * 1.6) * Math.exp(-(f - at) / 7) : 0), 0);
  /* the stack leans further the taller it gets */
  const tilt = load * 5.2 + Math.sin(f / 9) * load * 1.6 + PAR_X[v] * 0.055;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.10} glow={hexa(p.key, 0.24)}>
      <Cam s={[1.00, 1.07, 1.13][PJ]} x={[0, -74, 82][PJ]} y={[0, 30, -26][PJ]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="joist"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.8}
        window={null} lamp={null} />

      {/* the bedroom, kept — but the ceiling HOLE is gone. v1 had two ideas in
          one frame; `feedback_hook_simplicity` says reduce the IDEAS, not the
          layers, so the room stays rich and only the crush is happening in it. */}
      <div style={{ position: "absolute", left: 890, top: 344, width: 132, height: GY - 344,
        zIndex: 26, borderRadius: "4px 4px 0 0", background: dkh(EMBER, 0.52),
        border: `6px solid ${dkh(p.lip, 0)}` }}>
        <div style={{ position: "absolute", left: 16, top: 96, width: 22, height: 22,
          borderRadius: "50%", background: dkh(BRASS, 0.2) }} />
      </div>
      <div style={{ position: "absolute", left: 96, top: GY - 34, width: 430, height: 62,
        zIndex: 27, borderRadius: 6, background: mxh("#B08A62", 0.30), opacity: 0.55 }} />

      {/* ⛔⛔ ROUND 8 STACKED THEM AS A NEAT VERTICAL TOWER at s=0.48, and the
             note back was *"it's kind of hard to see what they even are"*. Two
             causes, and the size was only one of them:
               1  at s=0.48 a card is 206x61 and its FANS are 33px — under the
                  40px floor at which anything survives the 1012->240 downsample,
                  so the one feature that says GRAPHICS CARD disappeared;
               2  a neat column shows every card EDGE-ON. Stacked flat, all a
                  viewer gets is seven dark bars.
             ⭐ A PILE reads better than a tower for two separate reasons: every
             card is ANGLED so its face, fans and mark are visible, and a tower
             is a progress bar (reel 118) where a pile is a BURIAL. The cards are
             also 29% bigger, which puts the fans back over the floor at 41px. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 76,
        transform: `translateY(${sink + kick * 0.5}px) rotate(${tilt}deg)`,
        transformOrigin: "50% 100%" }}>
        {PILE.map((c, i) => {
          if (i > on) return null;
          const at = i === 0 ? -20 : LAND[i - 1];
          const k = E(f, at, at + 6, 0, 1, OUT);
          const sq = squash(f - at, 6, 0.24, 3, 10);
          return (
            <div key={"cd" + i} style={{ position: "absolute", inset: 0,
              transform: `translate(${(1 - k) * c.fx}px, ${(1 - k) * -330}px) scaleY(${sq})`,
              transformOrigin: "50% 100%" }}>
              <GpuCard x={c.x + JX * (i % 2 ? 0.85 : -0.6)} y={c.y + JY * (i % 3 ? 0.7 : -0.5)}
                s={0.95} z={76 + i} f={f} spin={0.6}
                mark vram={false} tilt={c.rot + (1 - k) * c.spin + JR * (i % 2 ? 1 : -0.7)} />
            </div>
          );
        })}
      </div>
      {/* each landing costs something: a puff, a ring and a floor crack */}
      {LAND.map((at, i) => (
        <React.Fragment key={"fx" + i}>
          <Puff x={402} y={432 - i * 36 + sink} f={f} at={at} c={hexa("#D8CCB0", 0.55)}
            z={84} n={7} s={0.7} />
          <Ring x={402} y={428 - i * 36 + sink} f={f} at={at} c={GOLD} z={85} s={0.42} dur={13} />
        </React.Fragment>
      ))}
      {/* ⭐ each landing throws chips off the pile as well as dust off the floor —
          a hit that only puffs reads soft. */}
      {LAND.map((at, i) => (
        <Fall key={"ch" + i} x={300 + (i % 3) * 74} y={PILE[i + 1].y + 20 + sink} w={190}
          f={f} at={at} n={5} z={74} c={i % 2 ? "#8E9299" : "#C9BFA8"} rate={2.6} s={0.85} />
      ))}
      {/* the floorboards bowing under him — the room takes the load too */}
      {on > 1 && Array.from({ length: on }, (_, i) => (
        <div key={"ck" + i} style={{ position: "absolute", left: 300 + i * 34, top: GY - 8,
          width: 8 + i * 5, height: 24 + i * 4, zIndex: 30, borderRadius: 2,
          background: hexa("#2A241A", 0.5),
          transform: `rotate(${(i - 2) * 9}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: 236, top: GY - 2 + load * 7, width: 360,
        height: 11, zIndex: 29, borderRadius: 6, background: hexa("#000", 0.34),
        transform: `scaleY(${1 + load * 0.9})` }} />

      {/* ── THE HERO, and his BODY is what changes. `strain` drives the sink,
             the vertical compression, the horizontal spread, and past halfway a
             FAST SMALL TREMBLE — the opposite of a slow sway. */}
      {/* ⭐⭐⭐ HE GOES RED, HE SWEATS, HE STEAMS, AND HIS EYES GO OUT. `Mascot`
             takes `tint` and paints the WHOLE body from it, and it takes `xeyes`,
             so both were already in the rig and neither had ever been used here.
             Effort has to be carried by the BODY at thumbnail size — a facial
             expression alone does not survive the scale, which is why the note
             was *"the claude sprite should turn red and sweating steaming"*.
             ⛔ The tint ramps with `load` rather than switching, so it reads as
             him going under rather than as a colour change.
             ⛔⛔ AND THIS IS NOT [[feedback_trial_cut_variants]]'s BANNED RECOLOUR.
             That rule forbids a TRIAL-CUT GRADE recolouring the mascot across a
             whole cut, which shipped an off-brand amber Claude and broke "every
             Claude the one house clay". This is an authored STRAIN FLUSH inside
             one scene, asked for directly, and #C0342A is a deeper member of the
             same clay hue family — not a different brand colour. Do not "fix" it. */}
      <Hero f={f} x={402} y={GY + sink * 0.24} size={342} z={62} act={1} ph={0.2}
        strain={strain} cheer={1} reach={40}
        tint={lerpHex("#D97757", "#C0342A", Math.min(1, load * 1.25))}
        stern={f < 40 ? E(f, 10, 34, 0, 1, OUT) : 0}
        costume={{ constr: 1, xeyes: f >= 40 ? 1 : 0 }} />
      {/* ⛔ the only limb geometry that survives is a forearm that STARTS on the
             mascot's own arm rect and ENDS on the thing it holds. */}
      {[-1, 1].map(sd => (
        <Forearm key={"fa" + sd} x0={402 + sd * 62} y0={GY + sink * 0.24 - 196}
          x1={402 + sd * 24} y1={424 + sink - 10} w={22} c="#C4674A" z={80} />
      ))}
      <Contact x={402} y={GY} w={150 + load * 60} z={19} o={0.44 + load * 0.16} />
      {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART — his head is the only
             part not acting while the arms and torso take the weight. */}
      {/* the emitter goes on the STILLEST part — his head, because the arms and
          torso are doing the acting. Denser and faster than round 8's version,
          and it now RAMPS with the load instead of running flat. */}
      <Steam x={402} y={GY - 268 + sink} f={f} at={8} n={16} z={70}
        s={0.9 + load * 0.8} c="#8FA6BC" rate={1.6 + load * 2.4} />
      <Steam x={402} y={GY - 250 + sink} f={f} at={20} n={10} z={69}
        s={1.1 + load * 0.6} c="#F4EEDE" rate={2.4} />
      <Steam x={318} y={GY - 236 + sink} f={f} at={26} n={8} z={71}
        s={0.8 + load * 0.5} c="#8FA6BC" rate={2.0} />
      <Steam x={486} y={GY - 236 + sink} f={f} at={32} n={8} z={71}
        s={0.8 + load * 0.5} c="#8FA6BC" rate={2.2} />
      <Sweat x={402} y={GY - 244 + sink} f={f} at={12} n={11} z={73}
        s={0.9 + load * 0.5} rate={1.5 + load * 1.6} />

      {/* ⛔⛔⛔ NO TEXT ON THE HOOK (Alex, round 20). Three text blocks were
             competing on frame 0 — the section band, a caption chip, and a
             318x218 delivery note that was a quarter of the frame and said
             nothing a viewer could read at a glance. All three are gone.
         ⛔ THE NOTE WAS ALSO CARRYING THE FRAME-0 LUMA (the >=140 bar is frame 0
             and nowhere else), so its brightness had to be REPLACED, not deleted.
         ⛔⛔ AND `Room`'s OWN WINDOW COULD NOT DO IT: it paints at z 5-7 and the
             room's parallax bands paint OVER it, so the window this scene has
             been asking for since round 1 has never once been visible. Drawn
             here explicitly, above the bands.
         ⭐ CURTAINS ARE THE DOMESTIC SIGNAL. A bed would not read at thumbnail
             size (v2 tried one and it came out a pale slab); a curtained window
             does, and it is what makes seven data-centre cards in this room
             absurd without a word of caption. */}
      <div style={{ position: "absolute", left: 566 + JX * 0.7, top: 214 + JY * 0.5, width: 456, height: 372,
        zIndex: 27, borderRadius: 4, background: dkh(p.lip, 0.06) }} />
      <div style={{ position: "absolute", left: 582 + JX * 0.7, top: 230 + JY * 0.5, width: 424, height: 340,
        zIndex: 28, overflow: "hidden",
        background: `linear-gradient(178deg, #FFFDF4 0%, #EAF1F7 54%, #CFDDEA 100%)`,
        boxShadow: `0 0 120px ${hexa("#FFF7DE", 0.9)}` }}>
        {/* a rooftop line outside, so it reads as a window and not a lightbox */}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 62,
          background: hexa("#C6D2DC", 0.42) }} />
        {[26, 146, 278].map((rx, i) => (
          <div key={"rf" + i} style={{ position: "absolute",
            left: rx + PAR_X[v] * 0.85 + i * PAR_X[v] * 0.22, bottom: 46 + (i % 2 ? -PAR_X[v] * 0.10 : 0),
            width: 78 + i * 18 + Math.abs(PAR_X[v]) * 0.30,
            height: 34 + i * 16 + PAR_X[v] * 0.22, background: hexa("#B4C2CE", 0.44) }} />
        ))}
      </div>
      {/* the mullions — a cross, which is what says WINDOW in one glance */}
      <div style={{ position: "absolute", left: 787 + JX * 0.7, top: 230 + JY * 0.5, width: 13, height: 340,
        zIndex: 29, background: mxh(p.lip, 0.30) }} />
      <div style={{ position: "absolute", left: 582 + JX * 0.7, top: 384 + JY * 0.5, width: 424, height: 13,
        zIndex: 29, background: mxh(p.lip, 0.30) }} />
      <div style={{ position: "absolute", left: 544 + JX * 0.7, top: 576 + JY * 0.5, width: 500, height: 19,
        zIndex: 30, borderRadius: 3, background: mxh(p.lip, 0.36), boxShadow: SH }} />
      {/* two curtain panels, gathered */}
      {[{ x: 516 + JX * 0.7, w: 96 }, { x: 980 + JX * 0.7, w: 96 }].map((c, i) => (
        <div key={"cu" + i} style={{ position: "absolute", left: c.x, top: 192, width: c.w,
          height: 424, zIndex: 31, borderRadius: "5px 5px 9px 9px",
          background: `linear-gradient(${i ? 265 : 95}deg, ${mxh("#D9BFA0", 0.34)} 0%, ${dkh("#D9BFA0", 0.10)} 100%)` }}>
          {[0, 1, 2].map(k2 => (
            <div key={k2} style={{ position: "absolute", left: 12 + k2 * 27, top: 8, width: 8,
              height: 408, borderRadius: 4, background: hexa("#000", 0.10) }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: 502 + JX * 0.7, top: 180 + JY * 0.5, width: 590, height: 15,
        zIndex: 32, borderRadius: 8, background: dkh(p.lip, 0.10) }} />
      {/* the light it throws on the boards */}
      <div style={{ position: "absolute", left: 470, top: GY - 128, width: 560, height: 190,
        zIndex: 22, opacity: 0.46, transform: "skewX(-24deg)",
        background: `linear-gradient(180deg, ${hexa("#FFF3D6", 0.85)} 0%, ${hexa("#FFF3D6", 0)} 100%)` }} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S1 · THE VAULT — 1.76 to 6.17s (132f)
   VO: "First, Anthropic has never published the weights for Opus 5, so you
        literally cannot run it even if you wanted to."
   MECHANISM: `SEALED`. ⭐ WEIGHTS ARE WEIGHTS — the sentence hands you the pun
   and a real object with a real silhouette. ⛔ Muted, what is happening is a
   BODY FAILING TO OPEN A DOOR, not a paragraph arriving on a wall.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("vault");
  const L = LAY[v];

  /* ⛔⛔⛔ ROUND 21 — Alex: *"the second scene needs to be redone, it's not good,
     safe scene, not interesting."* Right on both counts.
       · SAFE — it was a Claude hauling a round vault door that never opens, and
         a locked vault is the FIRST picture anyone reaches for when a line says
         "you cannot have this". Nothing in it was about AI.
       · AND WRONG — a vault says the thing EXISTS and is locked away, so someone
         could break in. The truth is duller and much sharper: Anthropic never
         put it on the shelf. There is nothing to open.
     ⭐ THE DELIVERY THAT NEVER COMES. Cartons drop onto a shelf one at a time
     carrying the REAL marks of models whose weights genuinely ARE published —
     Qwen, Mistral, DeepSeek, Kimi — while the Claude stands under the ONE bay
     that stays empty, waiting for a box that never arrives. Every one of those
     is a fact, the count is the accumulator, and the punchline is an ABSENCE.
     ⭐ And it hands off: the last carton to land is KIMI, and S2 opens on "let's
     look at the closest equivalent, Moonshot AI's Kimi K3".
     ⛔ v1 of this rebuild put the shelf at eye level in the room's dark blue and
     stacked the boxes in his ARMS: the shelf read as a locker wall and the stack
     covered his face. The shelf is ABOVE him now, warm and lit, and nothing he
     holds crosses his head. */
  const BAY = [
    { x: 130, mark: "qwen.svg",      c: "#C8A87A", at: -12 },
    { x: 310, mark: "mistralai.svg", c: "#CBA98C", at:  24 },
    { x: 880, mark: "deepseek.svg",  c: "#C3A886", at:  58 },
    { x: 700, mark: "si_kimi.svg",   c: "#CEB48E", at:  94 },
  ];
  const landed = BAY.filter(b => f >= b.at + 9).length;
  const BOARD = 430;
  /* ⛔⛔⛔ THIS is the scene the dHash was failing on — f76 is 23 frames INTO it,
     not in the hook, and four rounds of hook fixes went nowhere because the
     audit's scene list had drifted 1.26s off the beat table. A shelf is a flat
     horizontal run, which is exactly the composition an 8x8 gradient hash cannot
     tell apart between cuts. Per-cut SHOT SIZE is what changes signs wholesale.
     ⛔ Bounds: the hero sits at x=706, so both offsets pull LEFT or he crosses
     the crop bound. steel puts his box at [457,819], amber [480,820], bar 877. */
  const PJ = { house: 0, amber: 1, steel: 2 }[v];
  /* ⭐ every landing slams the whole run — 1012px of shelf and four cartons all
     repaint on each hit, where one falling box repaints 150. Damped, so nothing
     lands and simply stops. */
  const jolt = BAY.reduce((a, b) => a + (f >= b.at + 8
    ? Math.sin((f - b.at - 8) * 1.5) * 9 * Math.exp(-(f - b.at - 8) / 6) : 0), 0);
  /* ⛔⛔⛔ "THE END OF THE ANIMATION JUST BECOMES STILL" (Alex, round 26). A scene
     MEAN cannot see this —  scores a beat that fires
     everything in its first half exactly the same as one that keeps moving to
     the last frame. tools/scene_tail_audit.py splits each scene into quarters:
     this one ran 14.50 / 8.07 / 7.82 / 5.36, a steady decay to a dead tail.
     ⭐ The events now reach the FINAL frame instead of finishing early. */
  /* he looks up at each arrival, then reaches into his own empty bay — and he
     keeps going DEEPER rather than waggling, because an oscillation is not
     progress (feedback_motion_needs_a_destination). Shoulder-deep by the last
     frame, and the dust he raises accumulates with him. */
  const reach = E(f, 70, 88, 0, 1, OUT) + E(f, 96, dur, 0, 0.5, IO);
  const grope = Math.sin((f - 80) / 4.2) * (f > 80 ? 16 : 0);
  /* ⭐ and the failure keeps COSTING him to the last frame: he sags as it sinks
     in, which is a whole-body change rather than a forearm twitch. */
  const sag = E(f, 104, dur, 0, 1, IO);
  /* ⭐⭐ ROUND 57 — Alex: *"0-5 seconds needs to be more elevated, more motion."*
     S0 measures 21.69; THIS is the flat half of the open at 9.02, and the reason
     is arithmetic: four arrivals at f-12/24/58/94 across 132 frames leaves three
     dead stretches, and the cartons dropped in from nowhere.
     ⭐ A DELIVERY BELT OVER THE SHELF gives the drops a SOURCE and runs on every
     frame between them, and each bay's lamp strikes as its carton lands — so the
     bay that never fills is the one whose light never comes on. */
  const bayLit = (i: number) => E(f, BAY[i].at + 8, BAY[i].at + 18, 0, 1, OUT);
  /* ⛔ AND THE EMPTY BAY'S LAMP DIES ON ITS OWN. It gutters from the start and
     goes out at f66, which is 12 frames before he reaches into it. */
  const deadLamp = (1 - E(f, 40, 66, 0, 1, IO))
    * (0.34 + 0.30 * Math.abs(Math.sin(f * 0.34)) + (f % 17 < 2 ? -0.22 : 0));

  return (
    <Scene p={p} slug="" push={[0, dur, 1.175]} vig={0.40} glow={hexa(p.key, 0.16)}>
      <Cam s={[1.00, 1.07, 1.14][PJ]} x={[0, -70, -96][PJ]} y={[0, 28, -26][PJ]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
        rake={0.16} rakeX={RAKE_X[v]} rakeRate={7.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 506, y: 210, r: 330 }} />

      {/* ── THE SHELF: a warm lit back panel, five bays, a board with a front
             lip and a shadow under it. It has to read as a SHELF at a glance or
             the empty bay reads as a doorway. ── */}
      <div style={{ position: "absolute", left: -20, top: 214, width: W + 40, height: 232,
        zIndex: 30, background: `linear-gradient(178deg, ${mxh("#8A6F4E", 0.30)} 0%, ${mxh("#8A6F4E", 0.06)} 100%)` }} />
      {[40, 220, 400, 600, 790, 970].map((ux, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: ux, top: 214, width: 16,
          height: 232, zIndex: 36,
          background: `linear-gradient(90deg, ${mxh("#8A6F4E", 0.36)} 0%, ${dkh("#8A6F4E", 0.20)} 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: -20, top: BOARD + jolt * 0.5, width: W + 40, height: 22,
        zIndex: 46, background: `linear-gradient(178deg, ${mxh("#8A6F4E", 0.42)} 0%, ${mxh("#8A6F4E", 0.10)} 100%)`,
        boxShadow: SH }} />
      <div style={{ position: "absolute", left: -20, top: BOARD + 21 + jolt * 0.5, width: W + 40, height: 15,
        zIndex: 46, background: dkh("#8A6F4E", 0.30) }} />
      <div style={{ position: "absolute", left: -20, top: BOARD + 36, width: W + 40, height: 40,
        zIndex: 24, background: `linear-gradient(180deg, ${hexa("#000", 0.34)} 0%, ${hexa("#000", 0)} 100%)` }} />

      {/* ⭐ A BAY LAMP PER SLOT — it strikes when its carton lands, so the shelf
             FILLS WITH LIGHT as it fills with stock, and the bay that never fills
             is the one whose light never comes on.
         ⛔ THE FIRST BUILD PUT THEM AT y=232 BEHIND THE CARTONS. A `ModelBox` at
             s=1.14 standing on a board at 430 occupies 202-430, i.e. exactly the
             band the lamps were in, and at z 38 against the carton's 44 not one
             of the four was ever on screen. They go on the board's FRONT LIP and
             throw UP, which is unobstructed and is how a shelf is lit anyway. */}
      {BAY.map((b, i) => (
        <React.Fragment key={"bl" + i}>
          <div style={{ position: "absolute", left: b.x - 74, top: BOARD - 9, width: 148, height: 11,
            zIndex: 50, borderRadius: 3,
            background: bayLit(i) > 0.04 ? mxh(b.c, 0.62) : dkh("#6E6555", 0.30),
            boxShadow: bayLit(i) > 0.04 ? `0 0 ${34}px ${hexa(b.c, 0.85 * bayLit(i))}` : "none" }} />
          <div style={{ position: "absolute", left: b.x - 104, top: 246, width: 208, height: BOARD - 250,
            zIndex: 43, opacity: bayLit(i) * 0.44, pointerEvents: "none", filter: "blur(5px)",
            clipPath: "polygon(0% 100%, 100% 100%, 68% 0%, 32% 0%)",
            background: `linear-gradient(0deg, ${hexa(b.c, 0.9)} 0%, ${hexa(b.c, 0)} 100%)` }} />
        </React.Fragment>
      ))}
      {/* the empty bay's lamp, guttering, and it dies twelve frames before he
          puts his arm in — so the dark he reaches into is a thing that HAPPENED */}
      <div style={{ position: "absolute", left: 430, top: BOARD - 9, width: 148, height: 11,
        zIndex: 50, borderRadius: 3, background: dkh("#6E6555", 0.30 - deadLamp * 0.22),
        boxShadow: deadLamp > 0.05 ? `0 0 ${26 * deadLamp}px ${hexa("#FFE2A8", 0.6 * deadLamp)}` : "none" }} />
      <div style={{ position: "absolute", left: 400, top: 246, width: 208, height: BOARD - 250,
        zIndex: 43, opacity: Math.max(0, deadLamp) * 0.36, pointerEvents: "none", filter: "blur(5px)",
        clipPath: "polygon(0% 100%, 100% 100%, 68% 0%, 32% 0%)",
        background: `linear-gradient(0deg, ${hexa("#FFE2A8", 0.85)} 0%, ${hexa("#FFE2A8", 0)} 100%)` }} />
      <Puff x={504} y={BOARD - 20} f={f} at={64} c={hexa("#8A806C", 0.5)} z={51} n={5} s={0.5} />

      {/* ⭐⭐ AND HE GOES IN WITH A TORCH. The second half of this scene is a man
             searching an empty space, so the search gets a LIGHT — a hard beam
             sweeping the inside of the bay, which is continuous motion across the
             stretch that had none and is the scene's own idea, drawn. */}
      {reach > 0.05 && (<>
        <div style={{ position: "absolute", left: 470, top: 262, width: 250, height: 176,
          zIndex: 45, opacity: Math.min(1, reach) * 0.55, filter: "blur(6px)",
          transformOrigin: "50% 100%", transform: `rotate(${grope * 0.7}deg)`,
          clipPath: "polygon(40% 100%, 60% 100%, 100% 0%, 0% 0%)",
          background: `linear-gradient(0deg, ${hexa("#FFF2CE", 0.95)} 0%, ${hexa("#FFF2CE", 0)} 100%)` }} />
        <div style={{ position: "absolute", left: 566 + grope * 0.6, top: 420, width: 40, height: 22,
          zIndex: 52, borderRadius: 4, boxShadow: SH,
          background: `linear-gradient(96deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.32)} 100%)` }} />
      </>)}
      {/* the dust the belt keeps shaking down through the warm light */}
      <Motes x={506} y={330} w={900} h={210} f={f} n={16} z={31} c="#E8D9B4" />

      {/* ── THE BAY THAT NEVER GETS FILLED — his. Side walls and a shelf floor,
             so it is legibly an empty SLOT rather than a hole in the wall. ── */}
      <div style={{ position: "absolute", left: 418, top: 230, width: 172, height: 200,
        zIndex: 32, background: `linear-gradient(178deg, ${dkh("#3A3026", 0)} 0%, ${dkh("#241D16", 0)} 100%)` }} />
      <div style={{ position: "absolute", left: 418, top: 402, width: 172, height: 28,
        zIndex: 34, background: `linear-gradient(178deg, ${mxh("#6E5A40", 0.10)} 0%, ${dkh("#6E5A40", 0.22)} 100%)` }} />
      <Motes x={418} y={244} w={172} h={180} n={7} f={f} z={35} c={hexa("#C6B79E", 0.42)} />
      {/* its shelf-edge label: Anthropic's own mark, and the model that is not there */}
      <div style={{ position: "absolute", left: 412, top: BOARD + 40, width: 184, height: 42,
        zIndex: 48, borderRadius: 3, background: "#FBF8F0", border: `3px solid ${dkh("#D8CFBC", 0)}`,
        boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <Img src={staticFile("logos/anthropic.svg")}
          style={{ width: 26, height: 26, objectFit: "contain" }} />
        <span style={{ ...mono(15, 900), color: INK, letterSpacing: 0.6 }}>{R.sealed.model}</span>
      </div>

      {/* ── THE FOUR THAT ACTUALLY SHIPPED, dropping in one at a time ── */}
      {BAY.map((b, i) => {
        const k = E(f, b.at, b.at + 9, 0, 1, IN_Q);
        if (k <= 0) return null;
        const sq = squash(f - b.at, 9, 0.26, 3, 11);
        return (
          <div key={"bx" + i} style={{ position: "absolute", inset: 0, zIndex: 44,
            transform: `translateY(${(1 - k) * -330 + jolt * (0.6 + i * 0.14)}px) scaleY(${sq})`,
            transformOrigin: `${b.x}px ${BOARD}px` }}>
            <ModelBox x={b.x} y={BOARD} s={1.14} z={44} mark={b.mark} c={b.c}
              tilt={jolt * (i % 2 ? 0.16 : -0.16)} />
          </div>
        );
      })}
      {BAY.map((b, i) => (
        <React.Fragment key={"fx" + i}>
          <Puff x={b.x} y={BOARD - 8} f={f} at={b.at + 8} c={hexa("#D8CCB0", 0.5)} z={50} n={6} s={0.6} />
          <Ring x={b.x} y={BOARD - 6} f={f} at={b.at + 8} c={GOLD} z={51} s={0.38} dur={12} />
        </React.Fragment>
      ))}

      {/* ── HE WAITS UNDER HIS OWN BAY, AND NOTHING COMES ── */}
      <Hero f={f} x={706} y={GY} size={318} z={62} act={1} ph={0.9}
        drive={reach * 0.26} reach={92}
        gaze={landed < 4 ? Math.sin(f / 13) * 0.5 : -0.3}
        lift={reach * 26 - jolt * 1.1 - sag * 34}
        strain={Math.min(0.62, Math.abs(jolt) * 0.05 + sag * 0.55)}
        stern={E(f, 100, dur, 0, 0.95, OUT)}
        shock={Math.min(1, BAY.reduce((a, b) => a
          + E(f, b.at + 8, b.at + 13, 0, 0.55, OUT)
          - E(f, b.at + 13, b.at + 22, 0, 0.55, IO), 0) + E(f, 86, 96, 0, 0.6, OUT))}
        costume={{ constr: 1 }} />
      {reach > 0.05 && (
        <Forearm x0={648} y0={GY - 226} x1={548 + grope} y1={398} w={21} c="#C4674A" z={70} />
      )}
      <Contact x={706} y={GY} w={104 + sag * 26} z={19} o={0.42} />
      {/* the bay gives up nothing but dust, and it keeps coming */}
      <Fall x={438} y={400} w={168} f={f} at={96} n={9} z={49} c="#B9AE9A" rate={1.5} s={0.8} />
      <Puff x={520} y={408} f={f} at={90} c={hexa("#B8AE9C", 0.5)} z={68} n={8} s={0.8} />

      {/* ⭐ the bottom third was bare floor. This is a delivery bay: the boxes
             that already came stack on a pallet under the shelf, which fills it
             and says what the room is at the same time. */}
      <div style={{ position: "absolute", left: 96, top: GY - 34, width: 300, height: 26,
        zIndex: 28, borderRadius: 2, background: `linear-gradient(178deg, ${mxh("#7A6244", 0.20)} 0%, ${dkh("#7A6244", 0.24)} 100%)` }} />
      {[0, 1, 2, 3].map(i => (
        <div key={"sl" + i} style={{ position: "absolute", left: 104 + i * 74, top: GY - 12,
          width: 20, height: 20, zIndex: 27, background: dkh("#7A6244", 0.34) }} />
      ))}
      <ModelBox x={186} y={GY - 34 + jolt * 0.3} s={0.70} z={29} mark="qwen.svg" c="#B79B72" tilt={-2 + jolt * 0.1} />
      <ModelBox x={306} y={GY - 34 + jolt * 0.4} s={0.70} z={29} mark="mistralai.svg" c="#BCA184" tilt={3 - jolt * 0.1} />
      <ModelBox x={246} y={GY - 152 + jolt * 0.7} s={0.70} z={30} mark="deepseek.svg" c="#B79B72" tilt={-4 + jolt * 0.2} />

      </Cam>

      <Chip t="THE WEIGHTS ARE NOT PUBLISHED" y={BAND_Y} c={INK} fg="#EAF1F7" s={0.86} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE DOCK — 6.17 to 8.78s (78f)
   VO: "But let's look at the closest equivalent, Moonshot AI's Kimi K3."

   ⛔⛔⛤ ROUND 50 — Alex: *"put like a spinning handlebar thing that spins to
   open the thing so its anticipatory."* Exactly right, and it names the defect
   in the old version: two latches popped and a panel fell. A latch is INSTANT,
   so the reveal was owed to nobody — it just happened.
   ⭐ A HANDWHEEL IS A DEBT. He winds it, and it costs him: six dog bolts walk
   back out of the jamb ONE AT A TIME as he turns, so the whole 1.3s before the
   door moves is spent watching the count come down. The opening is earned.
   ⛔ THE GRAB HANDLE IS LOAD-BEARING — a five-spoke wheel is five-fold
   symmetric and a viewer cannot see it turn without one feature that breaks the
   symmetry (see the same trap in `ClockFace`).
   ⛔ NO INVENTED MARK — no Moonshot/Kimi logo asset exists, so it is a
   stencilled name plate on a real crate, never a fabricated logo.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dock");

  const roll = E(f, 0, 18, -560, 0, IO);
  const bounce = rock(f, 18, 9, 16);
  /* ⭐ THE WIND: fast, then stiff, then one last shove past the seal. Three
     segments, because a single ease reads as a motor and a motor is not a man
     working for it. */
  const turn = E(f, 16, 30, 0, 560, OUT) + E(f, 30, 42, 0, 300, IO)
             + E(f, 42, 50, 0, 128, BACK);
  const stiff = E(f, 34, 44, 0, 1, IO) * (1 - E(f, 50, 56, 0, 1, OUT));
  const judder = Math.sin(f * 2.3) * 3.4 * stiff;
  /* six bolts, walking back one at a time — the count IS the anticipation */
  const BOLT = [20, 25, 30, 35, 40, 45];
  const swing = E(f, 50, 68, 0, 1, IO);           /* and then it opens */
  const glow = E(f, 52, 74, 0, 1, OUT);
  const settle = E(f, 60, dur, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.42} glow={hexa(p.key, 0.20)}>
      {/* ⛔⛔⛔ SHOT SIZE. This reel measured its own shot list and found
             SIXTEEN OF SEVENTEEN scenes putting the Claude at 27.9-33.8% of
             panel width, on the same ground line, at the same camera height.
             `Cam` reframes without re-laying a single prop, and its translate is
             applied LAST so it is honest screen pixels (unlike the
             `scale(k) translate(tx)` punch idiom where the shift is tx*k).
             Solved by tools/frame_shot.py, never by hand.
             ⛔ THE VISIBLE WINDOW HERE IS ONLY x 244-792. */}
      <Cam s={[1.363, 1.470, 1.268][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[-21, -46, 8][{ house: 0, amber: 1, steel: 2 }[v]]} y={[49, 66, 30][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>

      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="gantry"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={7.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.7} lamp={{ x: 470, y: 150, r: 300 }} />

      {/* the roller bed it arrives on */}
      <div style={{ position: "absolute", left: -40, top: GY - 84, width: W + 80, height: 20,
        zIndex: 30, background: dkh(SLATE, 0.30) }} />
      {Array.from({ length: 13 }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: -30 + i * 84, top: GY - 96,
          width: 62, height: 32, zIndex: 31, borderRadius: 16, background: dkh(STEEL, 0.28),
          transform: `rotate(${f * 7 * (f >= 18 ? 0.2 : 1)}deg)` }}>
          <div style={{ position: "absolute", left: 26, top: 5, width: 9, height: 22,
            background: hexa("#FFF", 0.16) }} />
        </div>
      ))}

      {/* ⭐⭐ THE MODEL AS AN OBJECT WITH ITS REAL MARK ON IT. The core is 17
             drawn parts and the glyph is the official one from Simple Icons. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 46,
        transform: `translate(${roll}px, ${bounce}px)` }}>
        <ModelCore x={596} y={GY - 84 + settle * 16} s={1.52} z={46} f={f} lit={glow}
          mark="si_kimi.svg" maker={R.model.maker} />

        {/* ── THE DOOR. Hinged on the RIGHT, bolted on the LEFT, and it does not
               move until the last bolt is clear. ── */}
        <div style={{ position: "absolute", left: 406, top: GY - 84 + settle * 16 - 300,
          width: 380, height: 300, zIndex: 58, transformOrigin: "100% 50%",
          transform: `perspective(1200px) rotateY(${-swing * 104}deg)`,
          background: `linear-gradient(168deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.44)} 100%)`,
          border: `6px solid ${dkh("#0A0E12", 0)}`, borderRadius: 8,
          backfaceVisibility: "hidden", boxShadow: SH_D }}>
          {/* the door's own plating — two panels and a rivet run, so the face is
              not a grey rectangle waiting for a wheel to be put on it */}
          {[0, 1].map(i => (
            <div key={"pn" + i} style={{ position: "absolute", left: 18, right: 18,
              top: 16 + i * 138, height: 122, borderRadius: 5,
              border: `4px solid ${hexa("#000", 0.28)}`,
              background: i ? hexa("#000", 0.10) : hexa("#FFF", 0.04) }} />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <div key={"rv" + i} style={{ position: "absolute", left: 26 + (i % 6) * 66,
              top: i < 6 ? 8 : 282, width: 10, height: 10, borderRadius: "50%",
              background: dkh("#0A0E12", 0) }} />
          ))}
          {/* the six bolts, in the door, walking OUT of the jamb one at a time */}
          {BOLT.map((at, i) => (
            <DogBolt key={"bt" + i} x={10} y={36 + i * 46} s={1.22} z={59} ang={-90}
              out={1 - E(f, at, at + 6, 0, 1, IN_Q)} />
          ))}
          {/* ⭐ THE HANDWHEEL, dead centre of the face */}
          <div style={{ position: "absolute", inset: 0,
            transform: `translate(${judder}px, ${judder * 0.4}px)` }}>
            <Handwheel x={190} y={148} s={0.96} z={60} turn={turn + judder * 2}
              hot={E(f, 44, 56, 0, 1, OUT)} />
          </div>
        </div>

        {/* the light that gets out once the door is off the seal */}
        <div style={{ position: "absolute", left: 346, top: GY - 84 + settle * 16 - 330,
          width: 500, height: 340, zIndex: 45, opacity: glow * 0.55, filter: "blur(30px)",
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa(GOLD, 0.78)} 0%, ${hexa(GOLD, 0)} 100%)` }} />
        <Ring x={596} y={GY - 210} f={f} at={50} c={GOLD} z={59} s={0.9} dur={16} />
        <Puff x={596} y={GY - 150} f={f} at={50} c={hexa("#D8CCB0", 0.5)} z={59} n={8} s={0.9} />
      </div>
      {/* each bolt clears with its own puff of seal dust — six small events */}
      {BOLT.map((at, i) => (
        <Puff key={"bp" + i} x={406 + roll} y={GY - 84 - 262 + i * 45} f={f} at={at + 5}
          c={hexa("#C9BFA8", 0.5)} z={60} n={4} s={0.42} />
      ))}
      <Puff x={596} y={GY - 80} f={f} at={18} c={hexa("#E8DCC0", 0.6)} z={58} />
      <Ring x={596} y={GY - 84} f={f} at={18} c={p.key} z={57} />

      {/* ONE hero action for the whole shot: he winds it, and it costs him */}
      <Hero f={f} x={344} y={GY} size={329} z={62} act={1} ph={0.2}
        heat={E(f, 22, 46, 0, 0.32, IO) - E(f, 50, 66, 0, 0.32, OUT)}
        drive={E(f, 14, 24, 0, 0.50, OUT) - E(f, 54, 70, 0, 0.30, OUT)}
        strain={E(f, 18, 34, 0, 0.72, OUT) * (1 - E(f, 52, 64, 0, 1, OUT))}
        reach={96} cheer={E(f, 58, 70, 0, 0.7, OUT)} costume={{ constr: 1 }} />
      <Forearm x0={402} y0={GY - 214} x1={490 + Math.cos(turn * Math.PI / 180) * 26}
        y1={GY - 244 + Math.sin(turn * Math.PI / 180) * 26} w={22} c="#C4674A" z={63} />
      <Sweat x={368} y={GY - 250} f={f} at={30} n={4} z={64} />
      <Contact x={344} y={GY} w={104} z={19} o={0.42} />
      </Cam>

      <Chip t={`${R.model.name} · OPEN WEIGHTS`} y={BAND_Y} c={INK} fg="#FBEFD6" s={0.86} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S3 · THE PARAMETER WALL — 8.78 to 10.89s (64f)
   VO: "That model is 2.8 trillion parameters."

   ⛔⛔⛤ ROUND 50 — Alex: *"the animation should represent the tokens in a more
   interesting way, not just numbers, that's too boring and basic."* The scene
   was a mechanical odometer whose drums outran their range. However good a
   bursting counter is, a counter is DIGITS, and digits are what he is tired of.
   ⭐ DRAW THE NOUN. A parameter is a SETTING — a dial with a needle on it — and
   there are 2.8 trillion of them. He sets ONE, by hand, with a spanner. Then the
   wall subdivides: the same square of wall that held one dial holds four, then
   sixteen, then sixty, and every needle on it is moving. The magnitude is
   carried by the GRAIN of the picture and not by a single typeset figure.
   ⛔ THE PITCH HALVES IN STEPS, NOT ON A RAMP. A continuous shrink reads as a
   camera pull-back; a snap reads as "it divided again", which is the point.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("weigh");

  const CX = 506, CY = 424;
  /* four generations. `born` is when each one snaps in. */
  const GEN = [{ at: 0, P: 296 }, { at: 11, P: 152 }, { at: 25, P: 90 }, { at: 41, P: 58 }];
  const g = GEN.reduce((a, gn, i) => (f >= gn.at ? i : a), 0);
  const P = GEN[g].P, born = GEN[g].at;
  const pop = E(f, born, born + 8, 0, 1, OUT);
  /* the wall keeps GROWING as well as dividing — two accumulators, and neither
     of them ever arrives inside the shot */
  const spread = E(f, 6, dur, 0, 1, IO);
  const halfW = 210 + spread * 640;
  const halfH = 104 + spread * 196;
  const set = E(f, 1, 10, 0, 1, IO);        /* the ONE he sets by hand */
  /* ⛔⛔⛔ THE CONTACT SHEET CAUGHT A BLANK BLACK PANEL AT 9.6s. Every dial in a
     generation popped in on a wave from `born`, so on the two frames AFTER each
     subdivision the outgoing dials were gone and the incoming ones were still at
     scale 0 — a full-frame black plate, three times, which is the one
     transition this house does not allow. THE OUTGOING GENERATION HAS TO STAY:
     it scales UP and fades as the finer one arrives, which is also what a
     subdivision actually looks like. */
  const wall = (Pp: number, bornP: number, out: number) => {
    const nx = Math.min(19, Math.max(1, Math.round(halfW * 2 / Pp)));
    const ny = Math.min(9, Math.max(1, Math.round(halfH * 2 / Pp)));
    const ds = Pp / 118;
    return Array.from({ length: nx * ny }, (_, n) => {
      const i = n % nx, j = Math.floor(n / nx);
      const x = CX + (i - (nx - 1) / 2) * Pp;
      const y = CY + (j - (ny - 1) / 2) * Pp;
      const d = Math.hypot(i - (nx - 1) / 2, j - (ny - 1) / 2);
      const k = out > 0 ? 1 : E(f, bornP + d * 1.05, bornP + d * 1.05 + 7, 0, 1, BACK);
      if (k <= 0.01) return null;
      const seed = (i * 37 + j * 61) % 360;
      const rate = 0.7 + ((i * 7 + j * 5) % 6) * 0.6;
      return (
        <div key={"pd" + Pp + "_" + n} style={{ position: "absolute", inset: 0,
          transform: `scale(${k})`, transformOrigin: `${x}px ${y}px` }}>
          <ParamDial x={x} y={y} s={ds} z={41} ang={seed + f * rate}
            lit={0.55 + 0.45 * Math.abs(Math.sin(f * 0.06 + n))} />
        </div>
      );
    });
  };
  const prev = g > 0 && f < born + 9 ? GEN[g - 1] : null;
  const outK = prev ? E(f, born, born + 9, 0, 1, OUT) : 0;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.19]} vig={0.40} glow={hexa(p.key, 0.20)}>
      {/* ⛔ ROUND 65 — a scene with no per-cut framing leans on grade and rake,
             which an 8x8 hash barely sees, and its FIRST frames have no authored
             motion to separate the cuts either. ⛔ The triples differ PER SCENE:
             one number applied everywhere would give a uniform shot band. */}
      <Cam s={[1.0, 1.075, 1.035][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -30, 26][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 14, -12][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="tray"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={9.1 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 470, y: 300, r: 300 }} />

      {/* the backing plate the wall is built on — it grows with the wall, so the
          thing behind the dials is never bare room */}
      <div style={{ position: "absolute", left: CX - halfW - 26, top: CY - halfH - 26,
        width: halfW * 2 + 52, height: halfH * 2 + 52, zIndex: 30, borderRadius: 6,
        background: `linear-gradient(172deg, ${dkh("#2C3038", 0.02)} 0%, ${dkh("#1A1E24", 0.10)} 100%)`,
        border: `6px solid ${dkh("#0C1014", 0)}`, boxShadow: SH_D }} />
      {/* its own frame rails, so the plate is a PANEL and not a grey rectangle */}
      {[-1, 1].map(sy => (
        <div key={"rl" + sy} style={{ position: "absolute", left: CX - halfW - 26,
          top: CY + sy * (halfH + 26) - (sy < 0 ? 0 : 16), width: halfW * 2 + 52, height: 16,
          zIndex: 31, background: `linear-gradient(180deg, ${mxh(BRASS, 0.14)} 0%, ${dkh(BRASS, 0.36)} 100%)` }} />
      ))}

      {/* ⭐⭐⭐ THE WALL. Every needle on it turns, at its own rate, for the whole
             shot — so there is no frame of this scene where the picture is not
             being repainted edge to edge. */}
      {prev && (
        <div style={{ position: "absolute", inset: 0, zIndex: 39,
          transform: `scale(${1 + outK * 0.85})`, transformOrigin: `${CX}px ${CY}px`,
          opacity: 1 - outK }}>
          {wall(prev.P, prev.at, 1)}
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, zIndex: 40,
        transform: `scale(${0.70 + pop * 0.30})`, transformOrigin: `${CX}px ${CY}px` }}>
        {wall(P, born, 0)}
      </div>

      {/* the one he set, calling out from the middle of the first generation */}
      {f < 22 && (
        <Ring x={CX} y={CY} f={f} at={11} c={GOLD} z={52} s={1.5} dur={16} />
      )}
      {/* and the seam light that runs the wall every time it divides */}
      <div style={{ position: "absolute", left: CX - halfW - 26, top: CY - halfH - 26,
        width: halfW * 2 + 52, height: halfH * 2 + 52, zIndex: 50, borderRadius: 6,
        opacity: (1 - pop) * 0.7, filter: "blur(14px)", pointerEvents: "none",
        background: `radial-gradient(60% 60% at 50% 50%, ${hexa(GOLD, 0.6)} 0%, ${hexa(GOLD, 0)} 100%)` }} />

      {/* he sets the first one and then it gets away from him */}
      <Hero f={f} x={254} y={GY} size={244} z={62} act={1} ph={1.4}
        drive={set * 0.42 - E(f, 20, 34, 0, 0.36, OUT)}
        strain={set * 0.5} reach={92}
        shock={E(f, 16, 28, 0, 0.9, OUT)} stern={E(f, 34, dur, 0, 0.8, OUT)}
        gaze={0.4} costume={{ constr: 1 }} />
      <Forearm x0={302} y0={GY - 156} x1={368 + set * 68} y1={GY - 190 - set * 56}
        w={20} c="#C4674A" z={64} />
      <Contact x={254} y={GY} w={82} z={19} o={0.40} />

      </Cam>

      <Chip t={`${R.model.params} PARAMETERS · EVERY ONE A SETTING`} y={BAND_Y} c={INK}
        fg="#F3EFDC" s={0.78} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S4 · THE CARD BAY — 10.89 to 13.88s (89f)
   VO: "To actually fit that, you need seven RTX Pro 6000 graphics cards."

   ⛔⛔⛤ ROUND 50 — Alex: *"12 and 15 seconds need a different concept."* The old
   scene was seven cards flying in and seating: a COUNT, and the reel already had
   three counts in a row by this point (a crate arriving, a counter running, a
   till filling). Counting to seven is not the same as showing WHY seven.
   ⭐ THE MODEL IS POURED IN, AND A CARD IS A TANK. It fills the first card to
   the brim, runs over, fills the second, runs over — and you need the seventh
   because you WATCH it need the seventh. One continuous stream for the whole
   2.97s, seven arrivals inside it, and the last card tops out on the last frame.
   ⛔ THE VILLAIN IS PLANTED HERE, unremarked: the pipe under the rack.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  /* seven fills, back to back, spanning the WHOLE shot — a rebuild that put
     everything in the first third measured 5.94 against a 6.0 bar. */
  const FILL = [4, 16, 28, 40, 52, 64, 76];
  const lv = FILL.map(a => E(f, a, a + 12, 0, 1, IO));
  const seated = FILL.filter(a => f >= a - 8).length;
  const cur = Math.min(6, FILL.filter(a => f >= a).length - 1);
  const done = lv.filter(l => l >= 0.999).length;
  /* rack geometry, solved once — ⛔ the visible window here is x 132-877 */
  const RX = 620, RS = 1.08, RW = 470 * RS, RTOP = GY - 62 * RS * 7 - 34 * RS;
  const barY = (i: number) => RTOP + 18.4 + i * 62 * RS + 13;
  const front = barY(Math.max(0, cur)) + 32;
  /* the rack takes the weight as each one tops out */
  const ring = FILL.reduce((acc, at) => acc + (f >= at + 12
    ? Math.sin((f - at - 12) * 1.7) * 7 * Math.exp(-(f - at - 12) / 6) : 0), 0);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.175]} vig={0.46} glow={hexa(p.key, 0.18)}>
      {/* ⛔ ROUND 64 — house-vs-amber measured 11 bits here. amber's global cam
             is only 3% off house, so a scene with no per-cut framing of its own
             leans entirely on grade and rake, which an 8x8 hash barely sees. */}
      <Cam s={[1.00, 1.085, 1.040][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -34, 30][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 18, -14][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={8.75 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.7} lamp={{ x: 180, y: 160, r: 200 }} />
      <Runner y={172} f={f} z={23} rate={10.4} pitch={196} w={136} h={88} kind="cell"
        c={mxh(TEAL, 0.24)} c2={dkh("#141C22", -0.1)} />
      {/* ⛔ ROUND 2 LEFT THIS THE DARKEST AND EMPTIEST FRAME IN THE REEL. A bay
             needs bays: a neighbouring cabinet and a floor grille give the rack
             something to be one OF. */}
      <div style={{ position: "absolute", left: -28, top: 268, width: 184, height: GY - 268,
        zIndex: 32, borderRadius: 5,
        background: `linear-gradient(174deg, ${dkh("#22323C", -0.14)} 0%, ${dkh("#22323C", 0.24)} 100%)`,
        border: `4px solid ${hexa("#000", 0.44)}` }}>
        {Array.from({ length: 7 }, (_, j) => (
          <div key={j} style={{ position: "absolute", left: 12, top: 14 + j * 54,
            width: 152, height: 42, borderRadius: 3, background: dkh("#141C22", 0),
            border: `2px solid ${dkh(STEEL, 0.6)}` }}>
            <div style={{ position: "absolute", right: 10, top: 16, width: 8, height: 8,
              borderRadius: "50%", background: j % 3 ? dkh(TEAL, 0.66) : TEAL }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 300, top: GY - 6, width: 610, height: 34,
        zIndex: 24, background: `repeating-linear-gradient(90deg, ${dkh("#0A1216", 0)} 0 9px, ${dkh(STEEL, 0.52)} 9px 18px)` }} />

      {/* ── THE SPOUT, and it never stops running ── */}
      <div style={{ position: "absolute", left: 742, top: 140, width: 152, height: 34,
        zIndex: 44, borderRadius: 4, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.40)} 100%)` }} />
      <div style={{ position: "absolute", left: 776, top: 168, width: 62, height: 44,
        zIndex: 44, clipPath: "polygon(0 0,100% 0,74% 100%,26% 100%)",
        background: `linear-gradient(180deg, ${dkh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
      {/* the pour itself — a lit column plus beads, running the whole shot */}
      <div style={{ position: "absolute", left: 792, top: 206, width: 30,
        height: Math.max(0, front - 206), zIndex: 47, borderRadius: 4,
        background: `linear-gradient(180deg, ${hexa(TEAL, 0.92)} 0%, ${hexa(TEAL, 0.55)} 70%, ${hexa(TEAL, 0.15)} 100%)`,
        boxShadow: `0 0 26px ${hexa(TEAL, 0.55)}` }} />
      {Array.from({ length: 11 }, (_, i) => {
        const span = Math.max(60, front - 206);
        const t = ((f * 0.052 + i / 11) % 1);
        return (
          <div key={"bd" + i} style={{ position: "absolute", left: 792 + (i % 3) * 9,
            top: 206 + t * span, width: 19, height: 19, borderRadius: "50%", zIndex: 48,
            opacity: 0.95 - t * 0.25,
            background: `radial-gradient(50% 50% at 38% 32%, ${mxh(TEAL, 0.48)} 0%, ${TEAL} 62%, ${dkh(TEAL, 0.26)} 100%)`,
            boxShadow: `0 0 14px ${hexa(TEAL, 0.6)}` }} />
        );
      })}

      {/* ⛔ SIX EMPTY SLOTS IS A BLACK FIELD. The rack is backlit so the bays
             that have not filled yet read as WAITING rather than as a hole. */}
      <div style={{ position: "absolute", left: RX - RW / 2 - 26, top: RTOP - 26,
        width: RW + 52, height: GY - RTOP + 52, zIndex: 43, borderRadius: 8,
        background: `linear-gradient(178deg, ${mxh("#1E3A44", 0.16)} 0%, ${dkh("#12242C", 0.10)} 100%)`,
        boxShadow: `0 0 60px ${hexa(TEAL, 0.30)}` }} />
      {/* ⭐ THE RACK OF TANKS. Every bar is a memory level and they fill in order. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 46,
        transform: `translate(${ring * 0.4}px, ${ring}px)` }}>
        <CardRack x={RX} y={GY} s={RS} z={46} f={f} seated={seated}
          spin={0.5 + done * 0.16} stencil={R.cards.build} hh={7} fill={lv} />
      </div>
      <Contact x={RX} y={GY} w={RW} z={26} o={0.5} />

      {/* each one tops out with a splash over its lip */}
      {FILL.map((a, i) => (
        <React.Fragment key={"tp" + i}>
          <Ring x={800} y={barY(i) + 16} f={f} at={a + 12} c={TEAL} z={70} s={0.5} dur={14} />
          <Puff x={800} y={barY(i) + 16} f={f} at={a + 12} c={hexa("#9FE8F0", 0.55)} z={70}
            n={6} s={0.5} />
        </React.Fragment>
      ))}

      {/* he slides the next one in just ahead of the flood — the count is his */}
      {FILL.map((a, i) => {
        const k = E(f, a - 8, a - 1, 0, 1, OUT);
        if (k <= 0 || k >= 1) return null;
        return (
          <div key={"cd" + i} style={{ position: "absolute", inset: 0, zIndex: 58,
            transform: `translate(${(1 - k) * -400}px, ${(1 - k) * 26}px)` }}>
            <GpuCard x={RX} y={barY(i) + 40} s={0.75} z={58} f={f} spin={0.4}
              mark vram={false} tilt={(1 - k) * -9} />
          </div>
        );
      })}

      {/* ⛔ THE VILLAIN, PLANTED. Small, lit, and nothing draws attention to it. */}
      <Pipe x={188} y={GY - 24} w={640} f={f} s={0.7} z={36} bore={20} flow={1} beads={3} />

      <Hero f={f} x={232} y={GY} size={200} z={62} act={1} ph={0.6}
        drive={cur >= 0 ? E(f, FILL[Math.max(0, cur)] - 8, FILL[Math.max(0, cur)] - 1, 0, 0.6, OUT) : 0}
        strain={0.34} reach={96} gaze={0.4} costume={{ constr: 1 }} />
      <Contact x={232} y={GY} w={70} z={19} o={0.42} />

            </Cam>

<Chip t={`SEVEN CARDS · ${R.cards.vram} EACH`} y={BAND_Y} c={INK} fg="#E4F5FA" s={0.86} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S5 · THE PARTS COUNTER — 13.88 to 16.40s (76f)
   VO: "And right now those cards are $16,000 each."

   ⛔⛤ ROUND 50 — Alex: *"12 and 15 seconds need a different concept."* It was a
   press coming down to stamp a price on a card. A stamp LABELS a thing; it does
   not say what the thing costs you.
   ⭐ IT IS A TRADE, AND THE TRADE IS THE PICTURE. A sack truck of banded cash
   goes out to the right; ONE card comes back to the left; they cross in the
   middle of the frame. Nobody has to be told the exchange rate — the two things
   crossing ARE the exchange rate, and "each" is said by the fact that all of
   that bought exactly one.
   ⛔ THE LARGEST REPAINT IN THIS SET, and it costs no new mechanism: a 240px
   load crossing 1100px while a 576px card crosses 790px the other way.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");

  /* the load: he shoves it, lets go, and it rolls out of frame on its own */
  /* ⛔ ROUND 56 — Alex flagged 14s, which is scene-local frame 4: the shot
     OPENED on a parked truck and a man standing next to it. A scene whose first
     event is at f24 has no first quarter.
     ⭐ IT OPENS ON A LANDING. He drops the load onto its wheels in the first 8
     frames — the truck comes down off its handles, the whole stack rings, the
     dust goes up and every tag on the rail above swings from the impact. */
  const land = E(f, 0, 8, 0, 1, OUT);
  const slam = rock(f, 8, 10, 15);
  const tx = 250 + E(f, 12, 34, 0, 340, IO) + E(f, 32, 64, 0, 742, OUT);
  const lean = -17 * (1 - land) + slam * 0.22
    + E(f, 16, 32, 0, -6, OUT) * (1 - E(f, 32, 42, 0, 1, OUT));
  /* the card: in from off-frame right, and it stops where he is */
  const cx = 1128 - E(f, 24, 58, 0, 608, OUT);   /* lands at 520, not 332 */
  /* ⛔ THE TAIL STALLED (Q4/mean 0.549 against a 0.55 bar). The card ARRIVED at
     f58 and then the scene sat on the counter rollers for its last 18 frames.
     ⭐ Arrival is not the end of the beat — he TAKES it: the card comes off the
     counter and turns up toward him through the last third, and the load sheds
     its top brick on the way out. */
  const held = E(f, 56, 74, 0, 1, BACK);
  const DROPPED = [36, 62];                         /* two bricks shake loose */

  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.30} glow={hexa(p.key, 0.20)}>
      {/* ⛔ ROUND 65 — a scene with no per-cut framing leans on grade and rake,
             which an 8x8 hash barely sees, and its FIRST frames have no authored
             motion to separate the cuts either. ⛔ The triples differ PER SCENE:
             one number applied everywhere would give a uniform shot band. */}
      <Cam s={[1.0, 1.1, 1.048][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -42, 36][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 22, -18][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="lampbar"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={7.35 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} lamp={{ x: 506, y: 128, r: 250 }} />
      {/* ⛔ THE TOP 40% OF THIS SHOT WAS BARE PALE WALL. A counter has a rail
             over it with the stock hanging off it, and the tags swing when the
             load rumbles past underneath them. */}
      <div style={{ position: "absolute", left: -20, top: 226, width: W + 40, height: 13,
        zIndex: 32, background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      {[168, 322, 476, 630, 784].map((tgx, i) => {
        const near = Math.max(0, 1 - Math.abs(tgx - tx) / 260);
        const sw = Math.sin(f / (17 + i * 2.3) + i * 1.7) * (3.4 + i * 0.5)
                 + Math.sin(f * 0.9 + i) * 9 * near
                 + slam * (1.5 - i * 0.16);          /* the whole rail takes the hit */
        return (
          <div key={"tg" + i} style={{ position: "absolute", left: tgx, top: 232, zIndex: 33,
            transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
            <div style={{ width: 4, height: 34, marginLeft: 30, background: dkh("#6E6555", 0.1) }} />
            <div style={{ width: 64, height: 84, borderRadius: 4, background: CREAMB,
              border: `3px solid ${dkh("#8A7F6A", 0.2)}`, boxShadow: SH_D,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(15, 900), color: hexa(INK, 0.72) }}>
                {["96GB", "600W", "PCIe", "96GB", "600W"][i]}</span>
            </div>
          </div>
        );
      })}

      {/* the counter itself, and its roller bed */}
      <div style={{ position: "absolute", left: -30, top: GY - 130, width: W + 60, height: 40,
        zIndex: 36, background: `linear-gradient(180deg, ${mxh("#9A8460", 0.3)} 0%, ${dkh("#9A8460", 0.16)} 100%)` }} />
      <div style={{ position: "absolute", left: -30, top: GY - 92, width: W + 60, height: 92,
        zIndex: 35, background: dkh("#9A8460", 0.42) }} />
      {Array.from({ length: 13 }, (_, i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: -34 + i * 86, top: GY - 128,
          width: 70, height: 34, zIndex: 37, borderRadius: 17,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.12)} 0%, ${dkh(STEEL, 0.34)} 100%)`,
          transform: `rotate(${f * 9}deg)` }}>
          <div style={{ position: "absolute", left: 30, top: 5, width: 10, height: 24,
            borderRadius: 2, background: hexa("#FFF", 0.15) }} />
        </div>
      ))}

      {/* ── WHAT IT COSTS, GOING OUT ── */}
      {/* ⛔ IT SITS BEHIND HIM. The load is on screen at frame 0 and he is
             silhouetted against it, so the shot opens on the price and not on an
             empty counter; then it slides out from behind him to the right. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 40,
        transform: `rotate(${lean * 0.4}deg)`, transformOrigin: `${tx}px ${GY}px` }}>
        <HandTruck x={tx} y={GY} s={1.26} z={40} f={f} roll={tx * 1.9} lean={lean} />
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 2, row = Math.floor(i / 2);
          return (
            <CashBrick key={"cb" + i} x={tx - 128 + col * 130} y={GY - 64 - row * 47}
              s={1.15} z={41} rot={-2 + ((i * 7) % 5)} />
          );
        })}
        {/* the strap over the load — what stops it being a heap of green slabs */}
        <div style={{ position: "absolute", left: tx - 138, top: GY - 236, width: 276,
          height: 17, zIndex: 42, borderRadius: 3, background: dkh("#3A3026", 0),
          transform: "rotate(-1.4deg)" }} />
        <div style={{ position: "absolute", left: tx - 26, top: GY - 244, width: 46,
          height: 34, zIndex: 43, borderRadius: 4, boxShadow: SH,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.20)} 0%, ${dkh(BRASS, 0.34)} 100%)` }} />
      </div>
      {/* two of them shake loose as it goes over the roller bed */}
      {DROPPED.map((at, i) => {
        const k = E(f, at, at + 26, 0, 1, IN_Q);
        if (k <= 0) return null;
        return (
          <CashBrick key={"dp" + i} x={tx - 150 + i * 70} y={GY - 250 + k * 246} s={1.14} z={66}
            rot={k * (i ? 190 : -150)} />
        );
      })}
      <Puff x={tx - 108} y={GY - 12} f={f} at={8} c={hexa("#C9BFA8", 0.55)} z={54} n={9} s={1.0} />
      <Puff x={tx + 96} y={GY - 12} f={f} at={8} c={hexa("#C9BFA8", 0.45)} z={54} n={7} s={0.85} />
      <Ring x={tx} y={GY - 8} f={f} at={8} c={hexa("#8A7F6A", 0.7)} z={54} s={1.1} dur={14} />
      <Puff x={tx - 90} y={GY - 20} f={f} at={16} c={hexa("#C9BFA8", 0.42)} z={54} n={6} s={0.7} />

      {/* ── WHAT IT BUYS, COMING BACK ── */}
      {/* ⭐⭐ ROUND 57 — Alex on 16s (scene f64): *"when that graphics card lifts
             up we need to see some interesting animation as well, glowing."* It
             was a translate. This is the ONE frame in the reel where the object
             the whole first half is about is held up at full size, so it gets a
             REVEAL: it wakes as it comes off the counter — the fans spool from
             0.25 to 1.7, a gold bloom opens behind it, eight light rays turn
             out of it, motes lift off it and the stamp catches the light. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 56,
        transform: `translate(${-held * 16}px, ${-held * 96}px) rotate(${held * -9}deg) scale(${1 + held * 0.10})`,
        transformOrigin: `${cx}px ${GY - 118}px` }}>
        {/* the rays, behind the card and turning */}
        {held > 0.04 && Array.from({ length: 8 }, (_, i) => (
          <div key={"ry" + i} style={{ position: "absolute",
            left: cx - 15, top: GY - 190, width: 30, height: 300 + held * 210,
            zIndex: 56, borderRadius: 15, opacity: held * 0.60, filter: "blur(7px)",
            transformOrigin: "50% 0%",
            transform: `rotate(${i * 45 + f * 0.9}deg)`,
            background: `linear-gradient(180deg, ${hexa(GOLD, 0.9)} 0%, ${hexa(GOLD, 0)} 100%)` }} />
        ))}
        {/* the bloom it wakes inside */}
        <div style={{ position: "absolute", left: cx - 350, top: GY - 440, width: 700, height: 520,
          zIndex: 57, opacity: held * 0.90, filter: "blur(30px)", pointerEvents: "none",
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa(GOLD, 0.95)} 0%, ${hexa("#FFD79A", 0.34)} 44%, ${hexa(GOLD, 0)} 100%)` }} />
        <GpuCard x={cx} y={GY - 118} s={1.34 + held * 0.06} z={58} f={f} spin={0.25 + held * 1.45}
          stamp={R.cards.each} mark vram />
        {/* ⛔ THE RIM SAT 40px INSIDE THE CARD. GpuCard positions by BOTTOM-CENTRE
               and its height is 128*s, so the top edge of a 1.34 card at y=GY-118
               is GY-290 — not GY-250. */}
        <div style={{ position: "absolute", left: cx - 292, top: GY - 296, width: 584, height: 10,
          zIndex: 59, borderRadius: 5, opacity: held * 0.95,
          background: `linear-gradient(90deg, ${hexa(GOLD, 0)} 0%, ${hexa("#FFF0C8", 0.95)} 46%, ${hexa(GOLD, 0)} 100%)`,
          boxShadow: `0 0 ${26 * held}px ${hexa(GOLD, 0.8 * held)}` }} />
        {/* a lit face, not just a halo — the card is a BLACK object and a glow
               behind a black object reads as a background, never as the thing */}
        <div style={{ position: "absolute", left: cx - 292, top: GY - 290, width: 584, height: 172,
          zIndex: 59, borderRadius: 10, opacity: held * 0.30, pointerEvents: "none",
          background: `linear-gradient(168deg, ${hexa("#FFE7B0", 0.85)} 0%, ${hexa(GOLD, 0.18)} 52%, ${hexa(GOLD, 0)} 100%)` }} />
        {/* and what comes off it */}
        {held > 0.08 && Array.from({ length: 12 }, (_, i) => {
          const t = ((f * 0.030 + i / 12) % 1);
          const r = 5 + (i % 3) * 4;
          return (
            <div key={"mo" + i} style={{ position: "absolute",
              left: cx - 260 + ((i * 61) % 520) + Math.sin(t * 6 + i) * 16 - r,
              top: GY - 132 - t * 230 - r, width: r * 2, height: r * 2, borderRadius: "50%",
              zIndex: 60, opacity: held * (1 - t) * 0.95,
              background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFF0C8", 0.98)} 0%, ${hexa(GOLD, 0)} 100%)` }} />
          );
        })}
      </div>
      <Ring x={504} y={GY - 214} f={f} at={60} c={GOLD} z={69} s={1.1} dur={16} />
      <Ring x={504} y={GY - 214} f={f} at={69} c="#FFF0C8" z={69} s={1.4} dur={16} />
      <Ring x={520} y={GY - 148} f={f} at={58} c={GOLD} z={68} s={0.9} dur={16} />
      <Puff x={520} y={GY - 140} f={f} at={58} c={hexa("#E8DCC0", 0.55)} z={68} n={7} s={0.7} />

      {/* the receipt, at 15px — the size a source line actually is */}
      <div style={{ position: "absolute", left: 176, top: GY - 74, zIndex: 60 }}>
        <span style={{ ...mono(15, 800), color: hexa("#5A5347", 0.85), letterSpacing: 1.1 }}>
          {R.cards.src}</span>
      </div>

      {/* he shoves the load out, then turns and takes delivery of ONE card */}
      <Hero f={f} x={236} y={GY} size={286} z={62} act={1} ph={1.1}
        heat={E(f, 4, 26, 0, 0.42, IO) - E(f, 40, 58, 0, 0.42, OUT)}
        drive={E(f, 2, 26, 0, 0.58, OUT) - E(f, 30, 44, 0, 0.42, OUT)}
        strain={E(f, 2, 20, 0, 0.72, OUT) * (1 - E(f, 30, 42, 0, 1, OUT))
          + E(f, 58, 72, 0, 0.44, OUT)}
        reach={84} gaze={f < 34 ? -0.4 : 0.5}
        lift={held * 22} cheer={E(f, 62, 76, 0, 0.55, OUT)}
        stern={E(f, 44, 58, 0, 0.7, OUT)} costume={{ constr: 1 }} />
      <Sweat x={264} y={GY - 234} f={f} at={12} n={4} z={64} />
      <Contact x={236} y={GY} w={96} z={19} o={0.38} />

      </Cam>

      <Chip t="ONE CARD" y={BAND_Y} c={INK} fg="#FFF4DC" s={0.9} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S6 · THE TILL — 16.40 to 19.84s (103f)
   VO: "That's over $110,000 in graphics cards alone before you even buy a
        motherboard."

   ⛔⛤ ROUND 50 — Alex: *"replace it completely, and the numbers redone
   completely."* The scene's spine was a six-drum `Totaliser` climbing to
   $112,000. That is the most literal possible way to say a total, and he has now
   asked twice for the magnitude to live in the PICTURE.
   ⭐ THE COLUMN IS THE NUMBER. A note counter riffles without stopping and
   spits one banded brick per card, and the bricks stack into a column that goes
   out of the top of the frame — no digit anywhere. HEIGHT is the figure.
   ⭐⭐ AND THE SECOND HALF OF THE LINE GETS DRAWN: once the seventh brick is up,
   the parts he has NOT paid for start landing on the counter — a motherboard, a
   supply, a fan — and not one of them has a brick under it. "Alone" is the joke,
   so "alone" is what the frame says.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("till");
  const BRICK = [4, 14, 24, 34, 44, 54, 64];        /* one per card */
  const up = BRICK.filter(a => f >= a).length;
  const PART = [72, 84, 96];                        /* and then the un-priced rest */
  const CX = 505, BASE = GY - 150;
  /* ⛔ ROUND 56 — Alex flagged 18s (scene-local f48), the middle of the stack.
     Seven bricks landing is a COUNT and by the fourth one the viewer has the
     idea. ⭐ SO THE COUNT ACQUIRES A COST: the taller it gets the more it sways,
     and from the fifth brick he has to hold it up. */
  const tall = up / BRICK.length;
  const sway = Math.sin(f / 12.5) * (0.6 + tall * tall * 6.4)
    + BRICK.reduce((a, at) => a + (f >= at + 9
      ? Math.sin((f - at - 9) * 1.5) * 2.4 * Math.exp(-(f - at - 9) / 9) : 0), 0);
  const steady = E(f, 44, 56, 0, 1, OUT) * (1 - E(f, 86, 98, 0, 1, OUT));

  return (
    <Scene p={p} slug="" push={[0, dur, 1.18]} vig={0.48} glow={hexa(p.key, 0.14)}>
      {/* ⛔ ROUND 64 — one of the two MIN-10 frames (f570, house vs amber). */}
      <Cam s={[1.00, 1.095, 1.045][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -38, 32][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 20, -16][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="duct"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={7.7 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 506, y: 96, r: 220 }} />

      {/* ⛔ ROUND 1 LEFT THIS ROOM EMPTY — a dark green field with one counter
             in it. A shop needs stock behind the counter. */}
      {Array.from({ length: 3 }, (_, r) => (
        <div key={"sf" + r} style={{ position: "absolute", left: 84, top: 236 + r * 92,
          width: 850, height: 14, zIndex: 30, background: dkh("#1E362A", 0.44) }} />
      ))}
      {Array.from({ length: 15 }, (_, i) => {
        const r = Math.floor(i / 5), c2 = i % 5;
        return (
          <div key={"st" + i} style={{ position: "absolute", left: 104 + c2 * 168,
            top: 236 + r * 92 - 62 - (i % 3) * 6, width: 132, height: 62 + (i % 3) * 6,
            zIndex: 31, borderRadius: 3, background: i % 2 ? dkh("#2A4A38", 0.22) : dkh("#2A4A38", 0.06),
            border: `3px solid ${hexa("#000", 0.3)}` }}>
            <div style={{ position: "absolute", left: 14, top: 16, width: 52, height: 8,
              background: hexa("#8ED8A8", 0.28), borderRadius: 2 }} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: -30, top: BASE, width: W + 60, height: 150,
        zIndex: 34, background: `linear-gradient(180deg, ${dkh("#1E362A", -0.2)} 0%, ${dkh("#1E362A", 0.3)} 100%)` }} />

      {/* ⭐ THE COLUMN. Seven bricks, one per card, and the card that each one
             paid for is slotted on top of it — so the pairing is drawn and the
             total is a HEIGHT. The last two go up behind the caption band, which
             is the whole point: it leaves the frame. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 49,
        transformOrigin: `${CX}px ${BASE}px`, transform: `rotate(${sway}deg)` }}>
      {BRICK.map((at, i) => {
        const k = E(f, at, at + 9, 0, 1, OUT);
        if (k <= 0) return null;
        const y = BASE - i * 88;
        const settle = Math.sin((f - at - 9) * 1.8) * 7 * Math.exp(-Math.max(0, f - at - 9) / 6);
        return (
          <div key={"bk" + i} style={{ position: "absolute", inset: 0, zIndex: 50 + i * 2,
            transform: `translateY(${(1 - k) * -420 + (f > at + 9 ? settle : 0)}px)`,
            opacity: Math.min(1, k * 3) }}>
            <CashBrick x={CX - 87} y={y} s={1.50} z={50 + i * 2} rot={-1.1 + ((i * 5) % 3)} />
            <GpuCard x={CX} y={y - 58} s={0.26} z={51 + i * 2} f={f} spin={0.4} mark vram={false} />
          </div>
        );
      })}
      </div>
      {BRICK.map((at, i) => (
        <Puff key={"bp" + i} x={CX} y={BASE - i * 88} f={f} at={at + 9}
          c={hexa("#CFE0D4", 0.5)} z={68} n={6} s={0.6} />
      ))}
      {/* he props it up — the arm goes to wherever the top of the stack IS */}
      {steady > 0.04 && (
        <Forearm x0={706} y0={BASE - 148} w={20} c="#C4674A" z={66}
          x1={CX + 84 + Math.sin(sway * Math.PI / 180) * 320}
          y1={BASE - 300 - Math.cos(sway * Math.PI / 180) * 26} />
      )}

      {/* ⭐ THE COUNTER MACHINE — the riffle never stops, and it is the one
             thing in this shot that is moving on every single frame. */}
      <NoteCounter x={252} y={BASE} s={0.84} z={44} f={f} run={1} />
      {/* what it spits, on its way to the column */}
      {BRICK.map((at, i) => {
        const k = E(f, at - 8, at, 0, 1, IO);
        if (k <= 0 || k >= 1) return null;
        return (
          <CashBrick key={"fl" + i} x={296 + k * 122} y={BASE - 40 - Math.sin(k * Math.PI) * 132}
            s={1.20} z={64} rot={-22 + k * 26} />
        );
      })}

      {/* ── AND THEN THE THINGS WITH NO BRICK UNDER THEM ── */}
      {PART.map((at, i) => {
        const k = E(f, at, at + 10, 0, 1, IN_Q);
        if (k <= 0) return null;
        const px = [300, 690, 400][i];
        return (
          <div key={"pt" + i} style={{ position: "absolute", inset: 0, zIndex: 64 + i,
            transform: `translateY(${-(1 - k) * 320}px) rotate(${(1 - k) * (i ? -13 : 13)}deg)` }}>
            {i === 0 && <Motherboard x={px} y={BASE + 10} s={0.86} z={64} />}
            {i === 1 && (
              <div style={{ position: "absolute", left: px - 74, top: BASE - 66, width: 148,
                height: 74, zIndex: 65, borderRadius: 4, boxShadow: SH_D,
                background: `linear-gradient(174deg, ${mxh("#4A535E", 0.18)} 0%, ${dkh("#2A313A", 0.12)} 100%)`,
                border: `4px solid ${dkh("#12161B", 0)}` }}>
                <div style={{ position: "absolute", left: 12, top: 12, width: 48, height: 48,
                  borderRadius: "50%", background: dkh("#0E1216", 0),
                  border: `3px solid ${dkh(STEEL, 0.5)}` }}>
                  <div style={{ position: "absolute", inset: 0, transform: `rotate(${f * 9}deg)` }}>
                    {Array.from({ length: 7 }, (_, b) => (
                      <div key={b} style={{ position: "absolute", left: "50%", top: "50%",
                        width: 18, height: 5, marginTop: -2.5, borderRadius: 3,
                        transformOrigin: "0% 50%", transform: `rotate(${b * 51}deg)`,
                        background: dkh("#525A64", 0) }} />
                    ))}
                  </div>
                </div>
                {[0, 1, 2].map(c2 => (
                  <div key={c2} style={{ position: "absolute", left: 76, top: 14 + c2 * 18,
                    width: 54, height: 11, borderRadius: 2, background: dkh("#151A20", 0) }} />
                ))}
              </div>
            )}
            {i === 2 && (
              <div style={{ position: "absolute", left: px - 60, top: BASE - 54, width: 120,
                height: 62, zIndex: 66, borderRadius: 4, boxShadow: SH,
                background: `linear-gradient(174deg, ${mxh("#6E6555", 0.18)} 0%, ${dkh("#4A4438", 0.12)} 100%)`,
                border: `4px solid ${dkh("#1A1610", 0)}` }}>
                {Array.from({ length: 8 }, (_, s2) => (
                  <div key={s2} style={{ position: "absolute", left: 8 + (s2 % 4) * 27,
                    top: 10 + Math.floor(s2 / 4) * 22, width: 20, height: 14, borderRadius: 2,
                    background: dkh("#26221A", 0) }} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {PART.map((at, i) => (
        <Puff key={"pp" + i} x={[300, 690, 400][i]} y={BASE} f={f} at={at + 10}
          c={hexa("#CFE0D4", 0.5)} z={70} n={6} s={0.7} />
      ))}

      <Hero f={f} x={762} y={GY} size={252} z={62} act={1} ph={0.4}
        heat={steady * 0.5}
        strain={steady * 0.6}
        drive={E(f, 66, 76, 0, 0.42, OUT) - E(f, 84, 96, 0, 0.34, OUT)}
        gaze={f < 68 ? -0.5 : -0.2} stern={E(f, 40, 70, 0, 0.7, OUT)}
        shock={E(f, 72, 84, 0, 0.85, OUT)} reach={86} costume={{ constr: 1 }} />
      <Contact x={762} y={GY} w={84} z={19} o={0.4} />

            </Cam>

<Chip t={R.cards.over} y={BAND_Y} c={INK} fg="#DFF3E6" s={0.88} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S7 · THE METER CUPBOARD — 19.84 to 23.14s (99f)
   VO: "And then there's the electric bill. So you'll need to pull in 4.2
        kilowatts."

   ⛔⛤ ROUND 50 — Alex: *"22 seconds is too basic and boring, not good."* It was
   a plug going into a socket and the room browning out. The brownout is a good
   read and it is a ONE-FRAME idea: after the dip lands there is nothing left to
   watch, so 70 of the 99 frames were a room sitting still at a lower level.
   ⭐ THE SUPPLY GETS RE-SIZED, THREE TIMES, ON SCREEN. A domestic flex, then a
   kettle lead, then an armoured trunk you could moor a boat with — and the first
   two glow, sag and let go before he can get the next one in. §12: draw the
   MECHANISM and let it FAIL first. "Pull in 4.2 kilowatts" is a SIZE, so the
   picture is a thing visibly getting bigger three times.
   ⛔ A CABLE SPANNING THE FRAME IS THE LARGEST PATH IN THIS SET — swapping it is
   a full-width repaint that costs one prop, and the pulses on it never stop.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("meter");

  /* three cables: [in by, lets go at, bore, sag, colour] */
  const CB = [
    { in: 6, die: 30, w: 11, sag: 92, c: "#8A7F6A" },
    { in: 36, die: 62, w: 26, sag: 74, c: "#4A6E88" },
    { in: 68, die: 999, w: 56, sag: 52, c: "#C46A2A" },
  ];
  const stage = CB.filter(c => f >= c.in).length - 1;
  const cur = CB[Math.max(0, stage)];
  const seat = E(f, cur.in, cur.in + 10, 0, 1, OUT);
  const heat = stage < 2
    ? E(f, cur.in + 10, cur.die, 0, 1, IO)
    : E(f, cur.in + 8, cur.in + 34, 0, 1, IO);
  const fail = stage < 2 ? E(f, cur.die - 5, cur.die + 5, 0, 1, IN_Q) : 0;
  /* the draw: it climbs, gives up twice, and only the trunk holds it */
  const draw = stage === 0 ? heat * 0.34 * (1 - fail)
             : stage === 1 ? 0.34 + heat * 0.34 * (1 - fail)
             : 0.42 + E(f, 72, dur - 6, 0, 0.58, IO);
  const kw = draw * 4.2;
  const jump = stage === 2 ? Math.sin(f * 1.35) * 7 * draw : 0;
  const Y0 = GY - 406, Y1 = GY - 326;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.195]} vig={0.32} glow={hexa(p.key, 0.20)}>
      {/* ⛔ ROUND 64 — the other MIN-10 frame (f658, house vs amber). */}
      <Cam s={[1.00, 1.090, 1.042][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -36, 34][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 16, -18][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="joist"
        rake={0.12} rakeX={RAKE_X[v]} rakeRate={9.45 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.7}
        window={null} lamp={{ x: 300, y: 190, r: 260 }} />

      {/* the window, and the street beyond it — depth, and it stays lit */}
      <div style={{ position: "absolute", left: 622, top: 222, width: 250, height: 250,
        zIndex: 27, borderRadius: 4, background: dkh(p.lip, 0.06) }} />
      <div style={{ position: "absolute", left: 634, top: 234, width: 226, height: 226,
        zIndex: 28, overflow: "hidden",
        background: `linear-gradient(178deg, ${mxh("#2A3A50", 0.10)} 0%, ${dkh("#16202E", 0.22)} 100%)` }}>
        {[16, 96, 168].map((sx, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: sx, bottom: 24,
            width: 52 + i * 12, height: 84 + i * 22, background: dkh("#14202E", 0.10) }}>
            {[0, 1, 2, 3].map(j => (
              <div key={j} style={{ position: "absolute", left: 8 + (j % 2) * 24,
                top: 12 + Math.floor(j / 2) * 28, width: 14, height: 18,
                background: hexa("#FFD79A", 0.62 - (j % 2) * 0.24) }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 612, top: 468, width: 270, height: 16,
        zIndex: 30, borderRadius: 3, background: mxh(p.lip, 0.30) }} />

      {/* ── THE WALL BOX EVERYTHING PLUGS INTO ── */}
      <div style={{ position: "absolute", left: 214, top: Y0 - 78, width: 178, height: 156,
        zIndex: 40, borderRadius: 8, boxShadow: SH_D,
        background: `linear-gradient(178deg, ${mxh("#E8E0CE", 0.20)} 0%, ${dkh("#C9BFA8", 0.18)} 100%)`,
        border: `6px solid ${dkh("#8A806C", 0.18)}` }}>
        {[0, 1, 2].map(i => (
          <div key={"gl" + i} style={{ position: "absolute", left: 20 + i * 48, top: 18,
            width: 30, height: 44, borderRadius: 4, background: dkh("#2A241C", 0),
            border: `3px solid ${dkh("#8A806C", 0.28)}` }} />
        ))}
        {[0, 1, 2, 3].map(i => (
          <div key={"sc" + i} style={{ position: "absolute", left: 12 + (i % 2) * 142,
            top: 12 + Math.floor(i / 2) * 118, width: 12, height: 12, borderRadius: "50%",
            background: dkh("#8A806C", 0.34) }} />
        ))}
        <div style={{ position: "absolute", left: 20, bottom: 16, width: 134, height: 22,
          borderRadius: 3, background: dkh("#2A241C", 0), overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${Math.min(100, draw * 108)}%`,
            background: draw > 0.86 ? "#FF7A3C" : hexa(SODIUM, 0.82) }} />
        </div>
      </div>

      {/* ── THE CABLE. It is re-sized three times and the failures are visible. ── */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, zIndex: 41, pointerEvents: "none" }}>
        <path d={`M 388 ${Y0} Q 640 ${Y0 + cur.sag * seat + jump} 902 ${Y1}`}
          stroke={cur.c} strokeWidth={(cur.w + draw * 6) * seat} fill="none" strokeLinecap="round" />
        {heat > 0.04 && (
          <path d={`M 388 ${Y0} Q 640 ${Y0 + cur.sag * seat + jump} 902 ${Y1}`}
            stroke={fail > 0.2 ? "#FF6A2A" : hexa(SODIUM, Math.min(0.9, heat))}
            strokeWidth={Math.max(2, (cur.w - 4) * seat * (1 - fail * 0.7))} fill="none"
            strokeLinecap="round" opacity={Math.min(1, heat * 1.4)} />
        )}
      </svg>
      {/* the pulses running it — faster the harder it pulls, and never stopping */}
      {seat > 0.4 && Array.from({ length: 9 }, (_, i) => {
        const t = ((f * (0.018 + draw * 0.034) + i / 9) % 1);
        const bx = 388 + t * 514;
        const by = Y0 + (Y1 - Y0) * t + Math.sin(t * Math.PI) * (cur.sag * seat + jump) * 0.92;
        const r = 8 + cur.w * 0.22 + draw * 7;
        return (
          <div key={"pu" + i} style={{ position: "absolute", left: bx - r, top: by - r,
            width: r * 2, height: r * 2, borderRadius: "50%", zIndex: 43,
            opacity: 0.5 + draw * 0.45,
            background: `radial-gradient(50% 50% at 38% 32%, ${mxh(SODIUM, 0.46)} 0%, ${SODIUM} 60%, ${dkh(SODIUM, 0.26)} 100%)`,
            boxShadow: `0 0 ${12 + draw * 18}px ${hexa(SODIUM, 0.5)}` }} />
        );
      })}
      {/* the two that let go */}
      {CB.slice(0, 2).map((c, i) => (
        <React.Fragment key={"fx" + i}>
          <Steam x={648} y={Y0 + c.sag * 0.72 - 26} f={f} at={c.die - 12} n={7} z={46} c="#C6BCA8" s={0.9} />
          <Ring x={648} y={Y0 + c.sag * 0.72} f={f} at={c.die} c="#FF6A2A" z={47} s={0.9} dur={14} />
          <Puff x={648} y={Y0 + c.sag * 0.72} f={f} at={c.die} c={hexa("#8A7F6A", 0.6)} z={47} n={9} s={0.9} />
        </React.Fragment>
      ))}
      {/* ⭐ THE FIRST MEMBER OF THE ALARM FAMILY. Three breakers beside the box:
             one lets go with each cable, and the third holds. Planted here so
             the beacon at 29s is an escalation and not an arrival out of
             nowhere — an accent set is only as legible as its sequence. */}
      <div style={{ position: "absolute", left: 412, top: Y0 - 84, width: 196, height: 108,
        zIndex: 39, borderRadius: 6, boxShadow: SH,
        background: `linear-gradient(178deg, ${mxh("#C9BFA8", 0.16)} 0%, ${dkh("#8A806C", 0.14)} 100%)`,
        border: `5px solid ${dkh("#5A5347", 0.10)}` }} />
      {[0, 1, 2].map(i => (
        <TripFlag key={"tf" + i} x={428 + i * 60} y={Y0 - 72} s={0.86} z={41} f={f}
          tripped={i < 2 ? (f >= CB[i].die ? 1 : 0) : 0} />
      ))}
      {CB.slice(0, 2).map((c, i) => (
        <Ring key={"tr" + i} x={452 + i * 60} y={Y0 - 46} f={f} at={c.die} c="#FF3A24"
          z={48} s={0.6} dur={12} />
      ))}

      {/* the coil of the NEXT one, waiting on the floor — visibly fatter */}
      {CB.map((c, i) => (
        f < c.in ? (
          <div key={"cl" + i} style={{ position: "absolute", left: 214 + i * 96, top: GY - 66,
            width: 92 + i * 26, height: 62 + i * 12, zIndex: 38, borderRadius: "50%",
            border: `${c.w}px solid ${c.c}`, opacity: 0.9 }} />
        ) : null
      ))}

      {/* what it is feeding — off at the right, and it only wakes on the trunk */}
      <CardRack x={946} y={GY} s={1.0} z={36} f={f} seated={7} spin={draw * 1.6} hh={7} />
      <Contact x={946} y={GY} w={380} z={26} o={0.44} />

      {/* the draw, on a dial that is the only thing GAINING */}
      <DialGauge x={262} y={GY - 44} s={0.98} z={54} k={draw} over={E(f, dur - 26, dur, 0, 1, OUT)}
        label="LOAD" read={`${kw.toFixed(1)} kW`} c={EMBER} ticks={9} />

      <Hero f={f} x={560} y={GY} size={296} z={62} act={1} ph={1.7}
        heat={Math.max(0, Math.min(0.46,
          E(f, 24, 34, 0, 0.30, OUT) - E(f, 40, 50, 0, 0.14, OUT)
          + E(f, 56, 66, 0, 0.30, OUT) - E(f, 82, 96, 0, 0.30, OUT)))}
        drive={CB.reduce((a, c) => a + E(f, c.in - 8, c.in, 0, 0.46, OUT)
          - E(f, c.in + 4, c.in + 16, 0, 0.46, OUT), 0)}
        strain={0.24 + heat * 0.42} reach={96}
        shock={CB.slice(0, 2).reduce((a, c) => a + E(f, c.die, c.die + 10, 0, 0.85, OUT)
          - E(f, c.die + 14, c.die + 24, 0, 0.85, OUT), 0)}
        stern={E(f, 74, dur, 0, 0.7, OUT)} gaze={-0.4} costume={{ constr: 1 }} />
      <Forearm x0={512} y0={GY - 216} x1={432} y1={Y0 + 22} w={21} c="#C4674A" z={64} />
      <Sweat x={588} y={GY - 240} f={f} at={40} n={5} z={64} />
      <Contact x={560} y={GY} w={98} z={19} o={0.4} />

            </Cam>

<Chip t="THE SUPPLY HAS TO GET BIGGER" y={BAND_Y} c={INK} fg="#FFE7BC" s={0.86} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S8 · THE FIREBOX — 23.14 to 28.57s (163f)
   VO: "If you leave them running 24/7 at the US average electricity rate,
        you're paying $565 a month just to power the GPUs."

   ⭐ THE MECHANISM SURVIVES, BECAUSE IT IS THE RIGHT ONE: a pump says REFUEL —
   a thing you do once — and a monthly power bill is a BURN that never stops.
   ⛔⛤ ROUND 50 — Alex: *"elevate it a lot, significantly."* The burn was true and
   it was UNCONNECTED: a man throwing money in a fire, and behind him, unrelated,
   a rack. Six discrete shovel-loads with dead air between them.
   ⭐⭐ SO THE LOOP GETS CLOSED AND THE FEED GETS CONTINUOUS.
     · a BELT runs notes into the mouth without stopping — nobody has to decide
       to pay, it is already happening, which is what 24/7 means;
     · a CONDUIT carries the fire's output to the rack and PULSES along it;
     · and the rack's fans now run at the fire's speed, so when the fire drops
       the machine visibly slows. The money is not next to the machine any more,
       it IS the machine's supply.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("street");
  const CUT = 96;
  const B = f >= CUT;

  const FEED = [10, 34, 58, 82, 106, 130];             /* six shovel-loads */
  const fed = FEED.filter(a => f >= a + 8).length;
  /* ⭐ the fire is fed by the BELT continuously and by the shovel in steps, so
     it climbs on every frame and steps on six of them */
  const fire = 0.14 + E(f, 0, dur, 0, 0.42, LIN) + fed / FEED.length * 0.44;
  const open = E(f, 4, 16, 0, 1, OUT);
  const throwK = FEED.reduce((a, at) => a + E(f, at, at + 8, 0, 1, IN_Q)
    - E(f, at + 8, at + 18, 0, 1, OUT), 0);
  const money = E(f, 12, dur - 6, 0, 565, IO);

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.15] : [0, CUT, 1.20]} vig={0.52}
      glow={hexa("#FF6A2A", 0.20)}>
      {/* ⛔⛔⛔ ROUND 62 — THIS PUNCH WAS THE REEL'S WEAKEST PAIR (f840, house vs
             amber, 10 bits, exactly on the bar). A two-shot punch RE-FRAMES the
             whole scene, so whatever per-cut geometry existed before the cut is
             replaced by one identical crop — the punch flattens the variants.
             ⭐ A PER-CUT PUNCH IS A PER-CUT SHOT SIZE, which is the strongest
             lever there is, and it costs nothing: the scale and the offset were
             already here, they were just the same number three times.
             ⛔ `scale(k) translate(tx)` MULTIPLIES tx BY k — these are pre-scale
             values, so the screen shift is tx*k. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? [
          "scale(1.22) translate(34px, 10px)",
          "scale(1.31) translate(-24px, 26px)",
          "scale(1.15) translate(76px, -12px)",
        ][{ house: 0, amber: 1, steel: 2 }[v]] : "none",
        transformOrigin: "50% 56%" }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="duct"
          rake={0.14} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={{ x: 400, y: 470, r: 340 }} />

        {/* ⭐ THE CONDUIT — the fire's output, on its way to the rack. Drawn
               BEFORE the two things it joins so it passes behind both of them. */}
        <div style={{ position: "absolute", left: 400, top: GY - 470, width: 500, height: 34,
          zIndex: 45, borderRadius: 17,
          background: `linear-gradient(180deg, ${mxh("#6E6070", 0.24)} 0%, ${dkh("#3A3038", 0.10)} 100%)`,
          border: `5px solid ${dkh("#120E12", 0)}`, boxShadow: SH }} />
        <div style={{ position: "absolute", left: 862, top: GY - 470, width: 34, height: 268,
          zIndex: 45, borderRadius: 17,
          background: `linear-gradient(96deg, ${mxh("#6E6070", 0.24)} 0%, ${dkh("#3A3038", 0.10)} 100%)`,
          border: `5px solid ${dkh("#120E12", 0)}`, boxShadow: SH }} />
        {Array.from({ length: 10 }, (_, i) => {
          const t = ((f * (0.012 + fire * 0.026) + i / 10) % 1);
          const along = t * 800;
          const bx = along < 480 ? 412 + along : 866;
          const by = along < 480 ? GY - 456 : GY - 456 + (along - 480);
          const r = 12 + fire * 6;
          return (
            <div key={"cd" + i} style={{ position: "absolute", left: bx - r, top: by - r,
              width: r * 2, height: r * 2, borderRadius: "50%", zIndex: 46,
              opacity: 0.45 + fire * 0.5,
              background: `radial-gradient(50% 50% at 38% 32%, ${mxh("#FFC46A", 0.5)} 0%, #FF8A3A 62%, ${dkh("#FF6A2A", 0.28)} 100%)`,
              boxShadow: `0 0 ${14 + fire * 20}px ${hexa("#FF8A3A", 0.55)}` }} />
          );
        })}

        {/* what the fire is keeping warm — and it runs at the FIRE's speed */}
        <CardRack x={880} y={GY} s={1.14} z={34} f={f} seated={7} spin={0.15 + fire * 2.4} hh={7} />
        <Contact x={880} y={GY} w={420} z={26} o={0.44} />

        <Furnace x={366} y={GY} s={1.10} z={44} f={f} fire={fire} open={open} />
        <Contact x={366} y={GY} w={400} z={26} o={0.5} />

        {/* the light it throws — the fire is the only source in the room */}
        <div style={{ position: "absolute", left: 60, top: GY - 300, width: 900, height: 320,
          zIndex: 30, opacity: 0.20 + fire * 0.36, filter: "blur(24px)",
          background: `radial-gradient(46% 60% at 34% 50%, ${hexa("#FF8A3A", 0.72)} 0%, ${hexa("#FF6A2A", 0)} 100%)` }} />

        {/* ⭐ THE BELT — nobody has to decide to pay. It is already running. */}
        <div style={{ position: "absolute", left: 470, top: GY - 358, width: 520, height: 24,
          zIndex: 42, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh("#9A8460", 0.34)} 0%, ${dkh("#6E6555", 0.10)} 100%)`,
          border: `4px solid ${dkh("#2A2620", 0)}`, boxShadow: SH }} />
        {/* the rails either side of it, so a belt reads as a belt */}
        {[GY - 368, GY - 326].map((ry, i) => (
          <div key={"br" + i} style={{ position: "absolute", left: 462, top: ry, width: 536,
            height: 10, zIndex: 44, borderRadius: 3,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.34)} 100%)` }} />
        ))}
        {[520, 700, 880].map((rx, i) => (
          <div key={"pl" + i} style={{ position: "absolute", left: rx - 24, top: GY - 362,
            width: 48, height: 48, borderRadius: "50%", zIndex: 41, background: dkh("#1A1610", 0),
            border: `4px solid ${dkh(STEEL, 0.46)}`, transform: `rotate(${-f * 9}deg)` }}>
            <div style={{ position: "absolute", left: "50%", top: 4, width: 5, height: 18,
              marginLeft: -2.5, background: hexa("#8AA0B0", 0.45) }} />
          </div>
        ))}
        {Array.from({ length: 15 }, (_, i) => {
          const t = ((f * 0.0126 + i / 15) % 1);
          const bx = 992 - t * 552;
          return (
            <div key={"bn" + i} style={{ position: "absolute", left: bx, top: GY - 386,
              width: 56, height: 30, borderRadius: 3, zIndex: 43,
              transform: `rotate(${-4 + (i % 3) * 4}deg)`,
              opacity: bx < 470 ? Math.max(0, (bx - 400) / 70) : 1,
              background: `linear-gradient(150deg, ${mxh("#BFD3B4", 0.30)} 0%, ${dkh("#8FA97F", 0.12)} 100%)`,
              border: `2px solid ${dkh("#5E7350", 0.1)}` }} />
          );
        })}
        {/* the chute off the end of the belt, into the mouth */}
        {/* ⭐ THE CHUTE — the notes tip off the end of the belt and slide down
               into the fire. Drawn ABOVE the furnace so the route is visible. */}
        <div style={{ position: "absolute", left: 396, top: GY - 336, width: 146, height: 156,
          zIndex: 45, clipPath: "polygon(64% 0,100% 0,36% 100%,0 100%)",
          background: `linear-gradient(96deg, ${mxh("#9A8460", 0.26)} 0%, ${dkh("#6E6555", 0.24)} 100%)`,
          boxShadow: SH }} />
        <Fall x={434} y={GY - 214} w={92} f={f} at={20} n={6} z={46} c="#BFD3B4" rate={2.0} s={0.55} />

        {/* THE SHOVEL-LOADS, on top of the belt feed */}
        {FEED.map((at, i) => {
          const k = E(f, at, at + 9, 0, 1, IN_Q);
          if (k <= 0 || k >= 1) return null;
          return Array.from({ length: 5 }, (_, j) => (
            <div key={"nt" + i + "_" + j} style={{ position: "absolute",
              left: 606 - k * 230 + j * 13, top: GY - 250 - Math.sin(k * Math.PI) * 78 + j * 9,
              width: 46, height: 26, borderRadius: 3, zIndex: 60,
              transform: `rotate(${-18 + k * 150 + j * 14}deg)`,
              background: `linear-gradient(150deg, ${mxh("#BFD3B4", 0.30)} 0%, ${dkh("#8FA97F", 0.12)} 100%)`,
              border: `2px solid ${dkh("#5E7350", 0.1)}` }} />
          ));
        })}
        {/* ⭐ THE SECOND MEMBER: a spring relief valve on the furnace's shoulder.
               It lifts twice as the fire climbs and blows a full head of steam,
               which is the physical fact a monthly bill has in common with a
               boiler — you do not get to stop feeding it. */}
        <ReliefValve x={826} y={306} s={0.75} z={46} f={f}
          lift={E(f, 62, 70, 0, 1, BACK) - E(f, 80, 92, 0, 1, OUT)
              + E(f, 122, 130, 0, 1, BACK) - E(f, 146, 158, 0, 1, OUT)} />
        <Steam x={866} y={196} f={f} at={64} n={10} z={47} c="#D8CCB0" s={1.2} rate={2.4} />
        <Steam x={866} y={196} f={f} at={124} n={10} z={47} c="#D8CCB0" s={1.2} rate={2.4} />
        {/* and the lamp on the firebox door, faster the hotter it gets */}
        <div style={{ position: "absolute", left: 486, top: GY - 300, width: 44, height: 44,
          zIndex: 47, borderRadius: "50%", border: `5px solid ${dkh("#2A1F1A", 0)}`,
          background: hexa("#FF3A24", 0.30 + Math.abs(Math.sin(f * (0.10 + fire * 0.22))) * (0.20 + fire * 0.50)),
          boxShadow: `0 0 ${18 + fire * 26}px ${hexa("#FF3A24", 0.35 + fire * 0.45)}` }} />

        <Fall x={300} y={GY - 250} w={200} f={f} at={14} n={12} z={62} c="#FFB367" rate={2.4} s={0.7} />
        <Fall x={470} y={GY - 330} w={150} f={f} at={30} n={8} z={62} c="#FF8A3A" rate={1.7} s={0.55} />

        {/* ⭐⭐⭐ ROUND 56 — asked for directly at 28s: *"make the claude sprite
               have more emotions, like turning red and mad, steaming."* `heat`
               rides the FIRE, so the man and the furnace come up together and
               the anger is caused by the thing on screen rather than authored
               beside it. By 28s (f146) he is at 0.94 — flushed, trembling,
               brow down, steam off the head and the ticks popping. */}
        <Hero f={f} x={700} y={GY} size={306} z={62} act={1} ph={0.6}
          heat={Math.max(0, Math.min(0.96, E(f, 26, 150, 0, 1.02, IO)))}
          drive={-throwK * 0.52} reach={96} gaze={-0.5}
          shock={E(f, 132, 142, 0, 0.5, OUT) - E(f, 148, 160, 0, 0.5, OUT)}
          strain={0.20 + fire * 0.40} costume={{ constr: 1 }} />
        <Forearm x0={656} y0={GY - 186} x1={600 - throwK * 60} y1={GY - 214 - throwK * 30}
          w={21} c="#C4674A" z={70} />
        <Contact x={700} y={GY} w={120} z={19} o={0.42} />
      </div>

      {/* the month's total, on the furnace's own meter plate */}
      <div style={{ position: "absolute", left: 246, top: 236, zIndex: 90 }}>
        <Totaliser x={0} y={0} s={1.24} z={90} v={money} digits={3} pre="$" c={EMBER} roll />
      </div>
      {f >= dur - 52 && (
        <div style={{ position: "absolute", left: 606, top: 240, zIndex: 92,
          transform: `scale(${E(f, dur - 52, dur - 40, 0, 1, BACK)})`, transformOrigin: "0% 50%",
          padding: "8px 18px", borderRadius: 6, background: CREAMB }}>
          <span style={{ ...mono(30, 900), color: INK }}>{R.bill.per}</span>
        </div>
      )}

      <Chip t="EVERY MONTH, JUST FOR POWER" y={BAND_Y} c={INK} fg="#FFE0C2" s={0.84} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S9 · THE BAY, RE-LIT HARD RED — 28.57 to 30.50s (58f) · THE TURN
   VO: "But here's the real problem."

   ⛔⛤ ROUND 52 — Alex: *"at 29 seconds have a big alarm kind of thing and an X
   and stuff."* Exactly the right instinct for this beat, and it fixes what was
   wrong with it: he pressed a dead START button TWICE, and the answer to both
   presses was nothing. A refusal is the meaning of the scene, but two of them in
   1.93s is the same non-event happening twice.
   ⭐ HE ASKS IT TO RUN AND WHAT ANSWERS IS THE ALARM. One press, one dead click,
   and then a beacon spins up and throws a red cone that sweeps the whole room —
   and a giant red X slams over the rack in two strokes. The X is half of a pair:
   the tick lands on the API at 45s, so the reel says the same thing twice with
   the same object and opposite answers.
   ⛔ A RETURNING SET IS A CALLBACK ONLY IF THE LIGHT CHANGED — this is S4's room
   with the only red in the reel in it.
   ⭐ THE SWEEP IS ALSO THE MOTION: a 900px wedge crossing the panel repaints
   more of the frame per 0.1s than anything else in this reel, for one div.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bayred");

  const hit = E(f, 2, 7, 0, 1, IN_Q) - E(f, 7, 15, 0, 1, OUT);
  const dead = f >= 7 ? 1 : 0;
  const alarm = E(f, 12, 20, 0, 1, OUT);          /* and THIS is what answers */
  const dark = E(f, 10, dur, 0, 1, IO);
  const slump = E(f, 34, dur, 0, 1, IO);
  const xa = E(f, 22, 27, 0, 1, BACK);
  const xb = E(f, 30, 35, 0, 1, BACK);
  /* ⛔⛔⛔ `shock` IS A 0..1 DEFORMATION AND SUMMING TWO OF THEM TEARS THE RIG.
     The first build ran 0.9 + 0.7 = 1.6 and rendered a head detached from a
     split torso. Clamp, and let it DECAY — a shock that never comes back down
     is a pose, not a reaction. */
  const shk = Math.max(0, Math.min(0.95,
    E(f, 14, 20, 0, 0.9, OUT) + E(f, 22, 27, 0, 0.5, OUT)
    - E(f, 30, 44, 0, 1.3, OUT)));

  return (
    <Scene p={p} slug="" push={[0, dur, 1.2]} vig={0.46} glow={hexa(p.key, 0.18)}>
      {/* ⛔ ROUND 65 — a scene with no per-cut framing leans on grade and rake,
             which an 8x8 hash barely sees, and its FIRST frames have no authored
             motion to separate the cuts either. ⛔ The triples differ PER SCENE:
             one number applied everywhere would give a uniform shot band. */}
      <Cam s={[1.0, 1.07, 1.032][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -26, 22][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 12, -10][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="tray"
        rake={0.16} rakeX={RAKE_X[v]} rakeRate={10.85 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.8} lamp={null} />

      {/* ⭐ THE SWEEP, BEHIND EVERYTHING — it crosses the racks and the floor and
             the man, and it never stops for the rest of the shot. */}
      <BeaconSweep x={196} y={272} len={940} wide={330} z={22} f={f} on={alarm}
        rate={11} c="#FF3A24" />
      <BeaconSweep x={196} y={272} len={880} wide={210} z={23} f={f} on={alarm * 0.7}
        rate={11} ph={168} c="#FF5A32" />

      {/* everything he bought, behind him, and it does not come on */}
      <CardRack x={772} y={GY} s={1.22} z={38} f={f} seated={7} spin={0.05} hh={7} />
      <Contact x={772} y={GY} w={460} z={26} o={0.46} />
      <div style={{ position: "absolute", inset: 0, zIndex: 44, pointerEvents: "none",
        opacity: Math.min(0.66, dark * 0.30 + dead * 0.22),
        background: `radial-gradient(80% 62% at 56% 46%, ${hexa("#5A0E00", 0.34)} 0%, ${hexa("#2A0600", 0.78)} 100%)` }} />

      {/* ── THE BUTTON: a cast pedestal, a collar, a domed green head ── */}
      <div style={{ position: "absolute", left: 300, top: GY - 236, width: 90, height: 236,
        zIndex: 40, background: `linear-gradient(96deg, ${mxh(STEEL, 0.10)} 0%, ${dkh(STEEL, 0.40)} 100%)`,
        border: `5px solid ${dkh("#0A0E12", 0)}` }} />
      <div style={{ position: "absolute", left: 268, top: GY - 22, width: 154, height: 24,
        zIndex: 40, borderRadius: 3, background: dkh(STEEL, 0.50) }} />
      <div style={{ position: "absolute", left: 262, top: GY - 268, width: 166, height: 42,
        zIndex: 41, borderRadius: 8, background: `linear-gradient(178deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.40)} 100%)`,
        border: `5px solid ${dkh("#0A0E12", 0)}` }} />
      <div style={{ position: "absolute", left: 288, top: GY - 306 + hit * 17, width: 114, height: 52,
        zIndex: 43, borderRadius: "26px 26px 6px 6px",
        background: dead > 0
          ? `linear-gradient(178deg, ${dkh(GREEN, 0.44)} 0%, ${dkh(GREEN, 0.62)} 100%)`
          : `linear-gradient(178deg, ${mxh(GREEN, 0.28)} 0%, ${dkh(GREEN, 0.18)} 100%)`,
        border: `5px solid ${dkh("#06210F", 0)}`,
        boxShadow: dead > 0 ? "none" : `0 0 30px ${hexa(GREEN, 0.55)}` }} />
      <Ring x={345} y={GY - 292} f={f} at={7} c={dkh(GREEN, 0.2)} z={46} s={0.5} dur={11} />
      <Puff x={345} y={GY - 286} f={f} at={7} c={hexa("#8A9298", 0.42)} z={46} n={5} s={0.5} />

      {/* ⭐⭐ THE X. Two strokes, 8 frames apart, each with its own impact — one
             stroke arriving twice is what makes it read as being PUT there
             rather than as a graphic that faded up. */}
      <Verdict x={700} y={424} s={1.15} z={80} kind="x" a={xa} b={xb} c="#E23A1E" />
      <Ring x={700} y={424} f={f} at={26} c="#FF5A32" z={81} s={1.3} dur={14} />
      <Ring x={700} y={424} f={f} at={34} c="#FF5A32" z={81} s={1.5} dur={14} />
      <Puff x={700} y={424} f={f} at={34} c={hexa("#8A2A18", 0.5)} z={81} n={9} s={1.0} />

      {/* the fixture itself, over the top of its own light */}
      <Beacon x={196} y={172} s={1.06} z={78} f={f} on={alarm} rate={11} c="#FF3A24" />

      <Hero f={f} x={506} y={GY} size={330} z={62} act={3} ph={0.2}
        heat={Math.max(0, Math.min(0.58, E(f, 18, 34, 0, 0.58, IO)))}
        drive={Math.max(-0.8, -hit * 0.62 - E(f, 22, 28, 0, 0.26, OUT)
          - E(f, 30, 36, 0, 0.26, OUT))}
        reach={116} lift={-slump * 16} strain={slump * 0.42}
        shock={shk}
        gaze={-0.55} stern={E(f, 38, dur, 0, 0.95, OUT)}
        costume={{ constr: 1 }} />
      <Forearm x0={452} y0={GY - 214} x1={352} y1={GY - 292 + hit * 16} w={22} c="#C4674A" z={64} />
      <Contact x={506} y={GY} w={106} z={19} o={0.44} />

      </Cam>

      <Chip t="IT IS NOT THE MONEY" y={BAND_Y} c={INK} fg="#FFD9CE" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE RENTED RIG — 30.50 to 36.86s (191f)
   VO: "One guy actually tried renting a massive server to run this model, and
        he got 0.1 tokens per second because his GPUs sat at 1% utilization."

   SHOT A — SCALE IS A COUNT AND A VANISHING POINT. Eight bays a side receding
   down a lit aisle, a dolly 1.00 -> 1.86 into it, and a Claude at the near end
   who is 5% of the frame. A single object cannot say MASSIVE however big you
   draw it, because the eye has nothing to measure it against.

   SHOT B — ⛔⛤ ROUND 50: Alex: *"35 seconds needs to be replaced completely with
   something so much better."* f135 is 17 frames INSIDE shot B, so the thing he
   flagged was the punch-in, and the punch-in was a 2.3x blow-up of the hall with
   a small drip in it — soft, and a drip is a leak, not an OUTPUT.
   ⭐⭐ THE HALL IS A PRINTER THAT MANAGES ONE CHARACTER. A cast type-head on
   two columns over a paper strip: the spring winds for two full seconds, the
   whole rig judders harder the tighter it gets, it SLAMS — and it has printed
   one glyph on an otherwise empty roll. "0.1 tokens per second" is a THING PER
   TIME, so the picture is one thing, and all the time.
   ⭐ AND THE 1% IS DRAWN, not captioned: a bank of twenty utilisation lamps with
   exactly one of them lit.
   ⛔ SHOT B IS DRAWN AT NATIVE RESOLUTION over the blown-up hall, never inside
   the punch — a mechanism you are asked to read cannot be a 2.3x upscale.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  const CUT = 118;
  const B = f >= CUT;

  const spend = E(f, 0, dur, 0, 214, LIN);
  const walk = E(f, 6, CUT, 0, 1, LIN);
  /* ── SHOT B: wind, slam, and start winding again ── */
  const load = E(f, CUT + 4, CUT + 38, 0, 1, IO) * (1 - E(f, CUT + 38, CUT + 48, 0, 1, OUT))
             + E(f, CUT + 56, dur, 0, 0.62, IO);
  const hit = E(f, CUT + 38, CUT + 42, 0, 1, IN_Q) - E(f, CUT + 42, CUT + 54, 0, 1, OUT);
  const glyphs = f >= CUT + 42 ? 2 : 1;
  const judder = Math.sin(f * 2.7) * 4.2 * load + (hit > 0.5 ? rock(f, CUT + 42, 11, 10) : 0);

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.26] : [0, CUT, 1.86]} vig={0.50}
      glow={hexa(p.key, 0.14)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? ([
          "scale(2.30) translate(-118px, -132px)",
          "scale(2.62) translate(-92px, -148px)",
          "scale(2.06) translate(-140px, -112px)",
        ][{ house: 0, amber: 1, steel: 2 }[v]]) : "none",
        transformOrigin: "50% 56%", filter: B ? "blur(3px) brightness(0.72)" : "none" }}>
        {/* ⭐⭐ ROUND 58 — Alex on 33s: *"it just stays going back and forth
               zooming in and I see the light coming down, not much going on."*
               He is right and the diagnosis is exact: a DOLLY IS A CAMERA MOVE,
               NOT AN EVENT. The corridor was identical on every frame and only
               the lens was changing, so the shot had travel and no story.
               ⭐ THE HALL COMES ON BEHIND HIM. A power-up wave runs NEAR -> FAR
               as he walks into it, so every bay in the frame — 16 cabinets, 112
               link lamps and 8 aisle lights — changes state across the shot. He
               is switching on a data centre, which is what he rented. */}
        <ServerHall f={f} z={26} rows={8} hz={286 - PAR_X[v] * 0.5}
          vp={506 + PAR_X[v] * 1.9} lit={1} wave={E(f, 6, CUT - 8, 0, 1, IO)} />
        {/* ⭐ the aisle lights running away down the hall — the one thing in a
               server room that MOVES, and it moves the full depth of the frame. */}
        {Array.from({ length: 9 }, (_, i) => {
          const t = i / 8;
          const k = 0.16 + Math.pow(t, 1.7) * 0.94;
          const hz2 = 286 - PAR_X[v] * 0.5;
          const base = hz2 + (792 - hz2) * Math.pow(t, 1.35);
          const on = ((Math.floor(f / 2) - i) % 9 + 9) % 9 < 3;
          return (
            <div key={"ch" + i} style={{ position: "absolute", left: 506 + PAR_X[v] * 1.9 - 104 * k,
              top: base - 300 * k - 30 * k, width: 208 * k, height: 14 * k,
              zIndex: 25 + i, borderRadius: 3, opacity: on ? 1 : 0.30,
              background: hexa("#E4F2FA", on ? 0.92 : 0.30),
              boxShadow: on ? `0 0 ${60 * k}px ${hexa("#CFE6F2", 0.6)}` : "none" }} />
          );
        })}
        {/* ⭐ THE ALARM FROM 29s IS STILL RUNNING. A beacon over the far end of
               the aisle, sweeping the full depth of the corridor — it ties the
               turn to the hall and it repaints the one part of this shot that a
               dolly cannot reach. */}
        <BeaconSweep x={506 + PAR_X[v] * 1.9} y={302} len={560} wide={210} z={27} f={f}
          on={0.68} rate={6} c="#FF4A2A" />
        <Beacon x={506 + PAR_X[v] * 1.9} y={244} s={0.46} z={29} f={f} on={0.85} rate={6}
          c="#FF3A24" />

        {/* ⭐ HE IS 5% OF THE FRAME, and that IS the shot. He walks the aisle. */}
        {!B && (<>
          <Hero f={f} x={430 - walk * 96} y={716 - walk * 40} size={104 - walk * 22} z={60} act={0} ph={0.6}
            gaze={0.3} stern={E(f, 90, CUT, 0, 0.8, OUT)} costume={{ constr: 1, glasses: 1 }} />
          <Contact x={430 - walk * 96} y={716 - walk * 40} w={40 - walk * 10} z={30} o={0.34} />
        </>)}
      </div>

      {/* ═══ SHOT B — THE OUTPUT END, DRAWN AT NATIVE RESOLUTION ═══ */}
      {B && (
        /* ⛔ THIS LAYER IS DRAWN OUTSIDE THE PUNCH so the screen stays at native
           resolution — which also means it was PIXEL-IDENTICAL across the three
           cuts, and it owns most of the frame for 2.4s. It gets its own per-cut
           framing, applied here rather than by scaling the screen prop. */
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transformOrigin: "50% 56%",
          transform: ["none",
            "translate(-26px, 14px) scale(1.09)",
            "translate(34px, -10px) scale(0.94)"][{ house: 0, amber: 1, steel: 2 }[v]] }}>
          {/* the deck it is bolted to */}
          <div style={{ position: "absolute", left: 96, top: GY - 34, width: 820, height: 60,
            zIndex: 58, borderRadius: 4,
            background: `linear-gradient(180deg, ${mxh("#2C3038", 0.16)} 0%, ${dkh("#161A20", 0.10)} 100%)` }} />
          {/* ⭐ THE UTILISATION BANK — twenty lamps, one lit. That is the 1%,
                 and it is the only thing in the shot that is not straining. */}
          <div style={{ position: "absolute", left: 800, top: 258, width: 80, height: 420,
            zIndex: 67, borderRadius: 8, background: dkh("#0E141A", 0),
            border: `6px solid ${mxh("#4A535E", 0.14)}`, boxShadow: SH_D,
            display: "flex", flexDirection: "column-reverse", alignItems: "center",
            justifyContent: "space-between", padding: "12px 0" }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={"lp" + i} style={{ width: 56, height: 14, borderRadius: 3,
                background: i === 0
                  ? hexa("#7BE0A0", 0.60 + Math.abs(Math.sin(f * 0.34)) * 0.40)
                  : dkh("#1A2028", 0),
                boxShadow: i === 0 ? `0 0 ${22 + Math.abs(Math.sin(f * 0.34)) * 18}px ${hexa("#7BE0A0", 0.85)}` : "none",
                border: `2px solid ${dkh("#4A535E", 0)}` }} />
            ))}
          </div>
          {/* ⭐⭐⭐ ROUND 58 — the printing press went. A cast type-head on a
                 spring is a good picture and it has to be DECODED, and he asked
                 for easy to understand. THE SPINNER IS THE IDEA: everybody has
                 watched a loading spinner race while nothing arrives, and that
                 read costs zero explanation. Six dots turning at 22 deg/frame
                 next to a line of output that gains ONE word in two seconds. */}
          <div style={{ position: "absolute", inset: 0, zIndex: 64,
            transform: `translate(${judder * 0.5}px, ${judder * 0.2}px)` }}>
            <TokenScreen x={470} y={GY - 26} s={0.84} z={64} f={f}
              tok={f >= CUT + 44 ? 2 : 1} caret={1} />
          </div>
          {/* ⛔ THE SCREEN IS CALMER THAN THE PRESS IT REPLACED and the scene
                 measured 8.41 -> 7.59 for it. The screen must stay still — that
                 IS the point — so the strain goes back into the ROOM: the rig's
                 own extractor bank, four 104px fans at full speed above it. */}
          {[200, 360, 520, 680].map((fx, i) => (
            <div key={"xf" + i} style={{ position: "absolute", left: fx - 52, top: 176,
              width: 104, height: 104, borderRadius: "50%", zIndex: 62,
              background: `radial-gradient(50% 50% at 50% 50%, ${dkh("#0E141A", 0)} 40%, ${dkh("#1A222A", 0)} 100%)`,
              border: `5px solid ${dkh("#39424E", 0)}`, boxShadow: SH }}>
              <div style={{ position: "absolute", inset: 0,
                transform: `rotate(${f * (17 + i * 2.4)}deg)` }}>
                {Array.from({ length: 9 }, (_, b) => (
                  <div key={b} style={{ position: "absolute", left: "50%", top: "50%",
                    width: 40, height: 11, marginTop: -5.5, borderRadius: 6,
                    transformOrigin: "0% 50%", transform: `rotate(${b * 40}deg)`,
                    background: `linear-gradient(90deg, ${dkh("#5A646E", 0)} 0%, ${mxh("#8AA0B0", 0.10)} 100%)` }} />
                ))}
              </div>
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 20, height: 20,
                marginLeft: -10, marginTop: -10, borderRadius: "50%", background: dkh("#39424E", 0) }} />
            </div>
          ))}

          {/* what all that effort is venting */}
          <Steam x={230} y={430} f={f} at={CUT + 8} n={9} z={66} c="#C6D2DC" s={1.1} />
          <Steam x={752} y={468} f={f} at={CUT + 26} n={8} z={66} c="#C6D2DC" s={1.0} />
          {/* the one token that lands, and it is the only event in 2.4s */}
          <Ring x={352} y={362} f={f} at={CUT + 44} c="#7FE0A8" z={70} s={1.0} dur={16} />
          <Puff x={352} y={362} f={f} at={CUT + 44} c={hexa("#CFF3DD", 0.55)} z={70} n={8} s={0.7} />
        </div>
      )}

      {/* the hire meter, outside the punch — money out while nothing comes back */}
      <div style={{ position: "absolute", left: 150, top: 232, zIndex: 90 }}>
        <Totaliser x={0} y={0} s={1.30} z={90} v={spend} digits={3} pre="$" c={EMBER} roll />
        <div style={{ position: "absolute", left: 6, top: 80, whiteSpace: "nowrap" }}>
          <span style={{ ...mono(13, 800), color: hexa("#F0C79A", 0.85), letterSpacing: 1.2 }}>
            RENTED · PER HOUR</span>
        </div>
      </div>

      <Chip t="ONE TOKEN EVERY TEN SECONDS" y={BAND_Y} c={INK} fg="#D8F2F8" s={0.84} z={96} />
    </Scene>
  );
};
/* =========================================================================
   S11 · UNDER THE FLOOR — 36.86 to 38.55s (50f)
   VO: "Why? And it's because of memory bandwidth."
   MECHANISM: `THE PIPE, REVEALED`. ⛔ 1.67s, ONE idea.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ "why" is not a place key — asPlace returns undefined and the whole reel
     dies on `p.key`. The valid set is in PLACES; this beat shares UNDER's room
     because it is the same floor, one line earlier. */
  const p = asPlace("under");

  /* ⛔⛔⛤ ROUND 37 — Alex: *"37 seconds is too boring."* It was a tapered pipe
     seen side-on. A pipe is the RIGHT NOUN and the wrong SHOT: the line is a
     one-beat REVEAL — *"Why? And it's because of memory bandwidth"* — and you
     cannot reveal something that was already lying there in full view.
     ⭐ HE LIFTS THE FLOOR PLATE. Two enormous cabinets, and everything anyone
     assumed was between them is under a hatch — so he pulls it up, and the only
     thing joining them is ONE THIN WIRE. 1.67s, one action, and the punchline is
     how small the answer is. */
  const lift = E(f, 4, 22, 0, 1, OUT);
  const look = E(f, 22, 34, 0, 1, OUT);
  const pulse = E(f, 24, dur, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.2]} vig={0.52} glow={hexa(p.key, 0.20)}>
      {/* ⛔⛔⛔ ROUND 61 — THIS SCENE WAS THE REEL'S DUPLICATE RISK. `dhash_cuts`
             put house-vs-amber at **8 bits** on scene-frame 6, under a bar of 10,
             and the reason is the composition: two enormous cabinets cropped at
             both frame edges with a plate between them is SYMMETRIC AND BLOCKY,
             which is exactly the shape a grade or a rake nudge cannot separate
             (feedback_dhash_is_geometry). At f6 the plate has barely lifted, so
             there is no authored motion to tell the cuts apart either.
         ⭐ SHOT SIZE IS THE ONLY LEVER THAT REACHES IT. A per-cut `Cam` moves
             every edge in the frame at once. Solved by tools/frame_shot.py
             against the rect that must stay visible; crop bound 140-869 at this
             push, and all three fit. */}
      <Cam s={[1.00, 1.18, 1.31][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -58, 46][{ house: 0, amber: 1, steel: 2 }[v]]}
        y={[0, 26, -22][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="joist"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={8.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.7} lamp={{ x: 506, y: 200, r: 300 }} />

      {/* the two cabinets it runs between — cropped, so they read as ENORMOUS */}
      {[-1, 1].map(sd => (
        <div key={"cb" + sd} style={{ position: "absolute",
          left: (sd < 0 ? -40 : 812) + PAR_X[v] * (sd < 0 ? 0.5 : 1.4),
          top: 176 - PAR_X[v] * 0.25, width: 280 + Math.abs(PAR_X[v]) * 0.5,
          height: GY - 176, zIndex: 34,
          background: `linear-gradient(${sd < 0 ? 96 : 264}deg, ${mxh("#2E3640", 0.12)} 0%, ${dkh("#1A2028", 0.12)} 100%)`,
          border: `6px solid ${dkh("#0A0E12", 0)}` }}>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 16, right: 16, top: 22 + i * 62,
              height: 42, borderRadius: 3, background: dkh("#39424E", 0.12) }}>
              <div style={{ position: "absolute", right: 12, top: 15, width: 11, height: 11,
                borderRadius: "50%", background: hexa("#7FE0A8", 0.7) }} />
            </div>
          ))}
        </div>
      ))}

      {/* ── THE FLOOR PLATE, hinged up out of the way ── */}
      <div style={{ position: "absolute", left: 232 + PAR_X[v] * 0.8, top: GY - 96, width: 548, height: 96,
        zIndex: 36, background: `linear-gradient(178deg, ${dkh("#1A1F26", 0)} 0%, ${dkh("#0C1015", 0)} 100%)`,
        boxShadow: `inset 0 12px 22px ${hexa("#000", 0.7)}` }} />
      <div style={{ position: "absolute", left: 232 + PAR_X[v] * 0.8, top: GY - 104, width: 548, height: 104,
        zIndex: 44, transformOrigin: "0% 100%",
        transform: `perspective(900px) rotateX(${lift * 78}deg)`,
        background: `linear-gradient(178deg, ${mxh("#5A6270", 0.10)} 0%, ${dkh("#39424E", 0.20)} 100%)`,
        border: `5px solid ${dkh("#0A0E12", 0)}`, borderRadius: 3 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 24 + i * 104, top: 22, width: 68,
            height: 12, borderRadius: 2, background: hexa("#000", 0.24) }} />
        ))}
      </div>

      {/* ⭐ AND UNDERNEATH IT: one thin wire. That is the whole reveal. */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, zIndex: 40,
        pointerEvents: "none", opacity: lift }}>
        <path d={`M 246 ${GY - 44} Q 506 ${GY - 8} 766 ${GY - 44}`}
          stroke={hexa("#FFE2A8", 0.30)} strokeWidth={26} fill="none" strokeLinecap="round" />
        <path d={`M 246 ${GY - 44} Q 506 ${GY - 8} 766 ${GY - 44}`}
          stroke="#E8D9B4" strokeWidth={11} fill="none" strokeLinecap="round" />
      </svg>
      {/* what is crawling along it — a few beads, and only a few */}
      {lift > 0.3 && Array.from({ length: 3 }, (_, i) => {
        const t = ((f * 0.012 + i / 3) % 1);
        return (
          <div key={"bd" + i} style={{ position: "absolute",
            left: 246 + t * 520 - 15, top: GY - 44 + Math.sin(t * Math.PI) * 34 - 15,
            width: 30, height: 30, borderRadius: "50%", zIndex: 41,
            opacity: 0.5 + pulse * 0.5,
            background: `radial-gradient(50% 50% at 38% 32%, ${mxh(GOLD, 0.40)} 0%, ${GOLD} 62%, ${dkh(GOLD, 0.24)} 100%)`,
            boxShadow: `0 0 ${10 + pulse * 10}px ${hexa(GOLD, 0.5)}` }} />
        );
      })}
      <div style={{ position: "absolute", left: 236, top: GY - 110, width: 540, height: 120,
        zIndex: 39, opacity: lift * 0.55, filter: "blur(18px)",
        background: `radial-gradient(50% 60% at 50% 60%, ${hexa("#FFE2A8", 0.85)} 0%, ${hexa("#FFE2A8", 0)} 100%)` }} />
      <Puff x={506} y={GY - 78} f={f} at={20} c={hexa("#8A9298", 0.42)} z={46} n={7} s={0.7} />

      <Hero f={f} x={506} y={GY - 118} size={286} z={62} act={3} ph={0.7}
        drive={lift * 0.34} reach={92} gaze={-0.85}
        strain={lift * 0.5} shock={look * 0.8}
        stern={E(f, 34, dur, 0, 0.9, OUT)} costume={{ constr: 1 }} />
      <Forearm x0={462} y0={GY - 300} x1={286} y1={GY - 150 - lift * 40} w={20} c="#C4674A" z={64} />
      <Contact x={506} y={GY - 92} w={96} z={35} o={0.34} />

      </Cam>

      <Chip t="MEMORY BANDWIDTH" y={BAND_Y} c={INK} fg="#E6DCFA" s={0.9} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S12 · STORE vs MOVE — 38.55 to 43.43s (147f) · THE PEAK
   VO: "He had enough memory to store the massive model, but his system
        physically cannot move the data fast enough to generate the text."
   MECHANISM: `STORE vs MOVE` — the sentence's two verbs, side by side, in one
   frame. LEFT is solved and stays solved; RIGHT is failing and stays failing.
   ⛔ THE PIPE IS NEVER BEATEN. He cranks and it does not improve. That is the
   point of the scene and of the reel.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("under");
  const CUT = 96;
  const B = f >= CUT;

  /* ⛔⛔⛤ ROUND 37 — Alex: *"39 seconds makes no sense, it doesn't even do
     anything much."* Fair. It was a brick silo, a hand pump, a tapered pipe and
     a jam of beads — four abstractions stacked on each other, and the only thing
     actually HAPPENING was a lever going back and forth.
     ⭐ THE LINE HAS TWO HALVES AND SO DOES THE SHOT. "He had enough memory to
     STORE the model" — a wall of crates from floor to ceiling, all of it already
     there. "But his system cannot MOVE the data fast enough" — one narrow slot,
     and they go through it ONE AT A TIME while the queue behind builds. Store is
     a wall; move is a letterbox. Nobody needs either explained. */
  const OUT_AT = Array.from({ length: 9 }, (_, i) => 10 + i * 15);
  const through = OUT_AT.filter(a => f >= a + 10).length;
  /* ⭐ ROUND 52 — this measured 6.20, the LOWEST in the reel. The backlog was
     capped at 16 and stopped growing at f 91 of 147, so the accumulator ran out
     before the scene did. It climbs the WALL now, to 34, for the whole shot. */
  const queue = Math.min(34, 3 + Math.floor(f / 4.4));
  const press = Math.min(1, queue / 30);
  const jud = press > 0.3 ? Math.sin(f * 2.2) * 3.4 * press : 0;
  const SLOT = { x: 640 + PAR_X[v] * 0.9, y: 470 - PAR_X[v] * 0.4 };
  /* ⭐⭐ ROUND 53 — this measured 6.82 after the alarm pass, still the lowest in
     the reel, and the reason is that its LEFT HALF NEVER MOVES: 24 crates in a
     grid, static for all 147 frames. A scene is only as alive as its deadest
     half. A gantry now works that wall on a 46-frame loop — down, grip, up,
     traverse, drop — so the STORE side is visibly keeping up and the jam reads
     as being downstream of it, which is exactly what the sentence says. */
  const cf = f % 46;
  const px = 0.10 + ((Math.floor(f / 46) * 0.27) % 0.46);
  const trav = E(cf, 12, 26, 0, 1, IO) - E(cf, 34, 44, 0, 1, IO);
  const gdrop = E(cf, 0, 5, 0, 1, IO) - E(cf, 7, 12, 0, 1, IO)
              + E(cf, 26, 30, 0, 1, IO) - E(cf, 32, 34, 0, 1, IO);
  const grip = cf >= 6 && cf < 31 ? 1 : 0;

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.15] : [0, CUT, 1.13]} vig={0.50}
      glow={hexa(p.key, 0.18)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? ([
          "scale(1.46) translate(-96px, -20px)",
          "scale(1.62) translate(-72px, -34px)",
          "scale(1.33) translate(-118px, -6px)",
        ][{ house: 0, amber: 1, steel: 2 }[v]]) : "none",
        transformOrigin: "50% 56%" }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="joist"
          rake={0.14} rakeX={RAKE_X[v]} rakeRate={8.05 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="boards" grit={0.7} lamp={{ x: 300, y: 150, r: 280 }} />

        {/* ── STORE: a wall of it, floor to ceiling, already there ── */}
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 4 }, (_, c2) => (
            <div key={`cr${r}_${c2}`} style={{ position: "absolute",
              left: 34 + c2 * 128 + (r % 2) * 12 + PAR_X[v] * 0.55,
              top: 214 + r * 84 - PAR_X[v] * 0.30,
              width: 118, height: 76, zIndex: 34, borderRadius: 3,
              background: `linear-gradient(168deg, ${mxh("#8A6F4E", 0.14 - r * 0.012)} 0%, ${dkh("#8A6F4E", 0.24)} 100%)`,
              border: `3px solid ${dkh("#3A2C1E", 0)}` }}>
              <div style={{ position: "absolute", left: "50%", top: 0, width: 8, height: "100%",
                marginLeft: -4, background: hexa("#FFF", 0.10) }} />
              <div style={{ position: "absolute", left: 14, top: 16, width: 44, height: 7,
                borderRadius: 2, background: hexa("#3A2E1E", 0.26) }} />
            </div>
          ))
        )}
        <div style={{ position: "absolute", left: 24 + PAR_X[v] * 0.55, top: 208, width: 520, height: GY - 208,
          zIndex: 33, background: hexa("#000", 0.20) }} />

        {/* ⭐⭐ THE GANTRY WORKING THE STORE WALL — the biggest travel in the shot,
               across the half of the frame that had nothing happening in it. */}
        <Gantry x={16 + PAR_X[v] * 0.55} y={158} w={612} s={1.0} z={36}
          tx={px + (0.97 - px) * trav} drop={Math.max(0, Math.min(1, gdrop))}
          grip={grip} reach={150}>
          <div style={{ position: "absolute", left: -59, top: -38, width: 118, height: 76,
            borderRadius: 3, boxShadow: SH,
            background: `linear-gradient(168deg, ${mxh("#8A6F4E", 0.16)} 0%, ${dkh("#8A6F4E", 0.24)} 100%)`,
            border: `3px solid ${dkh("#3A2C1E", 0)}` }}>
            <div style={{ position: "absolute", left: "50%", top: 0, width: 8, height: "100%",
              marginLeft: -4, background: hexa("#FFF", 0.10) }} />
            <div style={{ position: "absolute", left: 14, top: 16, width: 44, height: 7,
              borderRadius: 2, background: hexa("#3A2E1E", 0.26) }} />
          </div>
        </Gantry>

        {/* ── MOVE: one narrow slot in a thick wall, and a queue at it. The
               wall visibly TAKES the pressure — it swells and it judders. ── */}
        <div style={{ position: "absolute", left: 566 + PAR_X[v] * 0.9, top: 176, width: 150, height: GY - 176,
          zIndex: 42, transformOrigin: "50% 50%",
          transform: `translateX(${jud}px) scaleX(${1 + press * 0.06})`,
          background: `linear-gradient(96deg, ${mxh("#4A5260", 0.10)} 0%, ${dkh("#2A313C", 0.16)} 100%)`,
          border: `6px solid ${dkh("#0A0E12", 0)}` }} />
        <div style={{ position: "absolute", left: SLOT.x - 68 + jud, top: SLOT.y - 22, width: 136,
          height: 44, zIndex: 43, borderRadius: 3, background: "#080B0F",
          boxShadow: `inset 0 6px 14px ${hexa("#000", 0.8)}` }} />
        {/* ⭐⭐⭐ ROUND 56 — Alex: *"at 40 seconds it isn't clear what's going on
               in the animation concept itself."* He is right: a loose heap of
               blocks lying NEXT TO a black letterbox states no relationship. The
               backlog is now inside a HOPPER that necks down onto the slot —
               wide in, narrow out, packed solid, one thing dribbling through.
               Nobody has ever had to have a funnel explained. */}
        <div style={{ position: "absolute", left: 500 + PAR_X[v] * 0.9 + jud, top: 262,
          width: 300, height: 200, zIndex: 45,
          clipPath: "polygon(0% 0%, 100% 0%, 62% 100%, 38% 100%)",
          background: `linear-gradient(96deg, ${mxh("#5A6470", 0.16)} 0%, ${dkh("#333C48", 0.14)} 100%)` }} />
        {/* what is stacked up in it — the same crates off the wall, PACKED */}
        <div style={{ position: "absolute", left: 508 + PAR_X[v] * 0.9 + jud, top: 270,
          width: 284, height: 186, zIndex: 46, overflow: "hidden",
          clipPath: "polygon(0% 0%, 100% 0%, 61% 100%, 39% 100%)" }}>
          {Array.from({ length: Math.min(28, queue) }, (_, i) => (
            <div key={"fq" + i} style={{ position: "absolute",
              left: 12 + (i % 6) * 44 + Math.floor(i / 6) * 12,
              bottom: 6 + Math.floor(i / 6) * 40,
              width: 40, height: 36, borderRadius: 4,
              transform: `rotate(${-7 + ((i * 11) % 15)}deg)`,
              background: `linear-gradient(150deg, ${mxh(GOLD, 0.32)} 0%, ${dkh(GOLD, 0.20)} 100%)`,
              border: `2px solid ${dkh(GOLD, 0.42)}` }} />
          ))}
        </div>
        {/* its rim and its throat ring, so it reads as a made object */}
        <div style={{ position: "absolute", left: 494 + PAR_X[v] * 0.9 + jud, top: 254,
          width: 312, height: 16, zIndex: 47, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.40)} 100%)` }} />
        <div style={{ position: "absolute", left: 606 + PAR_X[v] * 0.9 + jud, top: 452,
          width: 88, height: 15, zIndex: 47, borderRadius: 3, background: dkh(STEEL, 0.46) }} />

        {/* ⭐ THE LAMP OVER THE SLOT — it beats FASTER the deeper the backlog is,
               so the alarm has a rate and the rate is the measurement. */}
        <div style={{ position: "absolute", left: SLOT.x - 26 + jud, top: 196, width: 52, height: 52,
          zIndex: 46, borderRadius: "50%", border: `5px solid ${dkh("#0A0E12", 0)}`,
          background: hexa("#FF3A24", 0.24 + Math.abs(Math.sin(f * (0.10 + press * 0.34))) * (0.22 + press * 0.54)),
          boxShadow: `0 0 ${16 + press * 30}px ${hexa("#FF3A24", 0.3 + press * 0.5)}` }} />
        <div style={{ position: "absolute", left: SLOT.x - 34 + jud, top: 178, width: 68, height: 20,
          zIndex: 46, borderRadius: 4, background: dkh(STEEL, 0.42) }} />
        {/* the klaxon on the wall beside it, and it is BLOWING */}
        <Klaxon x={848} y={252} s={0.66} z={48} f={f} on={E(f, 34, 48, 0, 1, OUT)} />
        {/* the gauge, pinning — one needle, climbing for the whole shot */}
        <DialGauge x={856} y={456} s={0.74} z={47} k={press}
          over={E(f, 104, dur, 0, 1, OUT)} label="BUS" read="FULL" c={EMBER} ticks={9} />
        {/* and the ones that make it through, one at a time */}
        {OUT_AT.map((at, i) => {
          const k = E(f, at, at + 10, 0, 1, IO);
          if (k <= 0) return null;
          return (
            <div key={"o" + i} style={{ position: "absolute",
              left: SLOT.x - 15 + k * 240, top: SLOT.y - 15 + k * k * 150,
              width: 30, height: 30, borderRadius: 5, zIndex: 46, opacity: 1 - k * 0.15,
              transform: `rotate(${k * 120}deg)`,
              background: `linear-gradient(150deg, ${mxh(GOLD, 0.32)} 0%, ${dkh(GOLD, 0.20)} 100%)`,
              border: `2px solid ${dkh(GOLD, 0.42)}` }} />
          );
        })}
        {/* what has actually come out the other side — nine, in five seconds */}
        <div style={{ position: "absolute", left: 806, top: GY - 96, width: 168, height: 96,
          zIndex: 45, borderRadius: 4, background: dkh("#2E4A44", 0),
          border: `6px solid ${mxh("#2E4A44", 0.28)}` }}>
          {Array.from({ length: through }, (_, i) => (
            <div key={"t" + i} style={{ position: "absolute", left: 10 + (i % 4) * 36,
              bottom: 8 + Math.floor(i / 4) * 26, width: 28, height: 20, borderRadius: 3,
              background: mxh(GOLD, 0.14) }} />
          ))}
        </div>
      </div>

      <Hero f={f} x={706} y={GY} size={318} z={62} act={1} ph={0.5}
        heat={Math.max(0, Math.min(0.50, E(f, 20, 110, 0, 0.50, IO)
          - E(f, 132, dur, 0, 0.22, OUT)))}
        drive={Math.sin(f / 9) * 0.16} reach={70}
        strain={E(f, 10, 90, 0.2, 0.8, IO)} gaze={-0.4}
        stern={E(f, 96, dur, 0, 0.9, OUT)} costume={{ constr: 1 }} />
      <Contact x={706} y={GY} w={110} z={19} o={0.46} />
      <Steam x={706} y={GY - 306} f={f} at={30} n={9} z={70} s={1.0} c="#B9A8D8" rate={1.7} />

      <Chip t="ENOUGH MEMORY. NO WAY OUT." y={BAND_Y} c={INK} fg="#EFE6FF" s={0.84} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S13 · THE FRONT STEP — 43.43 to 46.87s (103f) · PAYOFF
   VO: "Meanwhile, using Opus 5 for an hour of intense coding costs about 70
        cents."
   MECHANISM: `THE BYPASS`. ⭐ THE REVERSAL IS A SPEED REVERSAL — the same shape
   that was a drip is now a torrent, so the comparison lives in the MOTION and
   not in a label. This is the biggest lightness jump on any cut in the reel.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("front");

  const setdown = E(f, 4, 16, 0, 1, OUT);
  const rush = E(f, 22, 44, 0, 1, OUT);
  const print = E(f, 58, 74, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.165]} vig={0.22} glow={hexa(p.key, 0.16)}>
      {/* ⛔⛔⛔ SHOT SIZE — see S1. Solved by tools/frame_shot.py. */}
      <Cam s={[1.534, 1.646, 1.432][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[176, 152, 202][{ house: 0, amber: 1, steel: 2 }[v]]} y={[-66, -84, -48][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>

      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="none"
        rake={0.10} rakeX={RAKE_X[v]} rakeRate={5.95 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={null} />
      {/* traffic on the road behind the step — the world is busy and cheap */}
      <Runner y={392} f={f} z={24} rate={13.5} pitch={244} w={176} h={92} kind="car"
        c={mxh(CLAY, 0.18)} c2={dkh(SKY, 0.30)} rail={false} />

      {/* ⛔⛔ ROUND 1's OCCLUDER WAS A 300px BLACK VOID — the largest and
             darkest object in the brightest scene in the reel, swallowing a
             quarter of the payoff frame and the Claude mark with it. An
             occluder is a MASS WITH DETAIL, not an absence: this is the open
             front door, narrower, with a panelled leaf, a letterplate and a
             frame, so it reads as depth rather than as a hole in the picture. */}
      <div style={{ position: "absolute", left: -30, top: 150, width: 176, height: GY - 110,
        zIndex: 74, borderRadius: "0 5px 0 0",
        background: `linear-gradient(96deg, ${dkh(EMBER, 0.62)} 0%, ${dkh(EMBER, 0.40)} 100%)`,
        borderRight: `7px solid ${dkh(p.lip, 0)}` }}>
        {[0, 1].map(i => (
          <div key={i} style={{ position: "absolute", left: 34, top: 60 + i * 224, width: 104,
            height: 186, borderRadius: 3, background: hexa("#000", 0.20),
            border: `3px solid ${hexa("#FFF", 0.07)}` }} />
        ))}
        <div style={{ position: "absolute", left: 40, top: 292, width: 76, height: 15,
          borderRadius: 3, background: dkh(BRASS, 0.22) }} />
      </div>
      {/* the step and the threshold */}
      <div style={{ position: "absolute", left: 120, top: GY - 46, width: 640, height: 46,
        zIndex: 34, background: mxh(p.lip, 0.44) }} />
      <div style={{ position: "absolute", left: 120, top: GY - 52, width: 640, height: 10,
        zIndex: 35, background: mxh(p.lip, 0.62) }} />

      {/* ⭐ the output BUILDS across the whole shot instead of scrolling on a
             loop — an hour of coding is a screen that fills up. */}
      {/* ⛔ ROUND 45 — the mark sat off-centre at x=556, half behind the lid. It
             is the ANSWER of this scene ("the same work is 70 cents an hour"), so
             it belongs in the middle of the frame at the size of a subject. The
             laptop moves to centre with it. */}
      <Laptop x={506} y={GY - 46} s={1.42} z={52} f={f} open={setdown} rush={rush}
        fill={E(f, 14, dur - 8, 0, 0.62, LIN)} />
      {/* ⭐ ROUND 37 — asked for directly: the mark, BIG, on the screen. This is
             the one shot in the reel where the answer is a Claude, so the screen
             should say so before a word of the line lands. */}
      {/* the mark ON the screen, dead centre, breathing with the work */}
      {/* ⭐ ROUND 58 — asked for directly: *"make the claude logo spin at 45
             seconds."* It turns about its own vertical axis like a badge, once
             every 72 frames, and it passes edge-on — which is what sells it as a
             solid object rather than a picture being scaled.
         ⛔ `backfaceVisibility` stays VISIBLE: at 90-270 degrees you are looking
             at the back of the plate, and hiding it leaves a hole in the screen. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 59,
        perspective: "1000px", transformOrigin: "560px 452px",
        filter: `drop-shadow(0 0 28px ${hexa(CLAY, 0.5)})` }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "560px 452px",
          transform: `scale(${1 + Math.sin(f / 15) * 0.035}) rotateY(${f * 5}deg)`,
          backfaceVisibility: "visible" }}>
          <Mark x={560 - 160 * 0.65} y={452 - 160 * 0.65} s={160} z={59} plate />
        </div>
      </div>

      {/* ⭐ THE TORRENT — and it comes OUT OF THE SCREEN. Round 1 floated the
          bands across the sky, unattached to anything, so they read as confetti
          over a cityscape instead of as this machine's output. They now launch
          from the laptop's own screen edge and fan upward and right, which is
          the same object that was one bead every ten seconds under the floor. */}
      {rush > 0.05 && Array.from({ length: 18 }, (_, i) => {
        const t = ((f * (3.0 + rush * 10) + i * 47) % 520) / 520;
        const lane = i % 5;
        return (
          <div key={"tk" + i} style={{ position: "absolute",
            left: 500 + t * 560, top: GY - 190 - lane * 40 - t * 96,
            width: 56 + (i % 3) * 30, height: 19, borderRadius: 4, zIndex: 46,
            opacity: rush * (1 - t * 0.55),
            transform: `rotate(${-6 + lane * 3}deg)`,
            background: i % 3 === 0 ? CLAY : i % 3 === 1 ? mxh(GOLD, 0.1) : mxh(TEAL, 0.06) }} />
        );
      })}

      <Hero f={f} x={226} y={GY} size={307} z={62} act={2} ph={0.5}
        drive={setdown * 0.3} cheer={E(f, 46, 62, 0, 0.8, OUT)}
        reach={80} costume={{ constr: 1 }} />
      <Contact x={226} y={GY} w={100} z={19} o={0.36} />
      </Cam>
      {/* the receipt: the HOUR is the estimate, the RATE under it is published */}
      {print > 0.02 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 70,
          transform: `translateY(${(1 - print) * -60}px)`, opacity: print }}>
          <Receipt x={812} y={GY - 84} s={0.90} z={70} t={R.api.hour} sub={R.api.label}
            stencil={R.api.rate} rot={-4} />
        </div>
      )}
      {/* ⭐⭐ THE TICK — the same object as the X that slammed over the rack at
             29s, in two strokes, in green, on the thing that actually works. A
             verdict said twice with one shape is worth more than two captions. */}
      {/* ⛔ IT MUST NOT COVER THE 70 CENTS. The receipt owns x 712-912 / y 557-687
             and the mark on the screen owns 642-888 / 242-488, so the tick goes in
             the gap between the hero and the mark, ON the screen beside it. */}
      <Verdict x={568} y={452} s={0.74} z={82} kind="tick"
        a={E(f, 82, 89, 0, 1, BACK)} b={E(f, 88, 97, 0, 1, BACK)} c="#2E9E52" />
      <Ring x={568} y={452} f={f} at={90} c="#4FD07E" z={83} s={1.1} dur={16} />
      <Puff x={568} y={452} f={f} at={90} c={hexa("#CFF0DC", 0.55)} z={83} n={8} s={0.8} />


      <Mark x={856} y={152} s={68} z={90} plate />


      <Chip t="ONE HOUR OF CODING" y={BAND_Y} c={INK} fg="#FFF6E2" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S14 · THE CORRIDOR — 46.87 to 49.02s (65f)
   VO: "Now there are only three reasons to ever run this locally."
   MECHANISM: `THREE DOORS`. ⛔ NOT A TEXT LIST — three physical doors he opens
   one at a time. ⭐ A FILLED badge in a lifted colour with the numeral in INK:
   an accent set is only as legible as its WORST member, and a mid-tone numeral
   on a dark chip is what fails.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("doors");
  const bolt = E(f, 16, 28, 0, 1, BACK);
  const C = [SODIUM, TEAL, "#A98CD8"];
  /* the corridor in perspective: near · mid · far, each stepped up and in */
  /* ⛔ door 1's badge is 89px wide centred on its leaf, so at x=286 the hero's
     box (297..583) ate a third of the numeral and the corridor read 2 · 3. */
  const DOOR = [{ x: 228, y: GY + 18, s: 1.24 },
                { x: 596, y: GY - 50, s: 0.94 },
                { x: 828, y: GY - 96, s: 0.70 }];
  /* ⭐⭐⭐ ROUND 56 — asked for directly: *"at 48 seconds have like an above
     flashlight overhead lighting up each thing, 1, 2, 3."* One barrel on a yoke
     hanging from the ceiling, and it WALKS the corridor: it swings onto door 1,
     holds, swings to 2, holds, swings to 3. A travelling light beats three lamps
     switching on because the eye is TAKEN to each door instead of noticing it.
     ⛔ THE FIXTURE AND THE BEAM SHARE ONE `aim`, or the lamp points one way and
     its light goes another — the geometry is solved once, here. */
  const PIV = { x: 506, y: 224 };
  const AIMED = [0, 1, 2].map(i => {
    const t = { x: DOOR[i].x, y: DOOR[i].y - 250 * DOOR[i].s };
    return (Math.atan2(t.x - PIV.x, t.y - PIV.y) * 180) / Math.PI;
  });
  const aim = AIMED[0]
    + E(f, 12, 24, 0, AIMED[1] - AIMED[0], IO)
    + E(f, 34, 46, 0, AIMED[2] - AIMED[1], IO);
  /* each door lights AS the beam arrives on it, and dims as it leaves */
  const lampK = (i: number) => (i === 0 ? E(f, 2, 10, 0, 1, OUT) - E(f, 14, 22, 0, 0.72, OUT)
    : i === 1 ? E(f, 22, 30, 0, 1, OUT) - E(f, 36, 44, 0, 0.72, OUT)
    : E(f, 44, 52, 0, 1, OUT));

  return (
    <Scene p={p} slug="" push={[0, dur, 1.175]} vig={0.46} glow={hexa(p.key, 0.14)}>
      {/* ⛔ ROUND 65 — a scene with no per-cut framing leans on grade and rake,
             which an 8x8 hash barely sees, and its FIRST frames have no authored
             motion to separate the cuts either. ⛔ The triples differ PER SCENE:
             one number applied everywhere would give a uniform shot band. */}
      <Cam s={[1.0, 1.105, 1.05][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -40, 34][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 20, -16][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={7.35 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 506, y: 110, r: 240 }} />

      {/* ⛔⛔ THREE DOORS IN A FLAT ROW CANNOT SHARE A SHOT WITH A FULL-SIZE
             HERO. Three 244px leaves plus a 300px body is 1050px of content and
             the safe span between the crop bounds is 745 — which is exactly why
             round 15 solved it by shoving the Claude to x=86, i.e. off the side
             of the frame. The fix is not a smaller Claude, it is DEPTH: the
             corridor RECEDES, so doors 2 and 3 cost 210 and 158 instead of 244,
             and the shot gains a back wall instead of a wallpaper.
         ⭐ AND THE ACTION IS THE CORRIDOR ITSELF. A door that merely EXISTS is a
             rectangle; a door whose lamp strikes is an event. He throws the
             breaker and they come up 1 · 2 · 3 away from camera, each one
             lighting its own leaf and laying a pool on the floor, so the beat
             lands three times in 2.15s instead of nothing happening at all. */}
      {/* ⛔ THE FIRST BUILD PUT THE BEAM AT z 29 — behind every door it was
             supposed to be lighting, so the lamp glowed and nothing came out of
             it. Light in air passes IN FRONT of the room; it goes over the top,
             at low opacity, and each door keeps its own pool underneath. */}
      <SpotBeam x={PIV.x} y={PIV.y} aim={aim} len={620} wide={250} z={66} on={0.62} />
      <SpotBeam x={PIV.x} y={PIV.y} aim={aim} len={560} wide={120} z={67} on={0.42} />

      {DOOR.map((d, i) => (
        <React.Fragment key={"dr" + i}>
          {/* the lamp over the lintel, and what it throws once it strikes */}
          <div style={{ position: "absolute", left: d.x - 30 * d.s, top: d.y - 372 * d.s,
            width: 60 * d.s, height: 17 * d.s, zIndex: 41 + i, borderRadius: 3,
            background: lampK(i) > 0.05 ? mxh(C[i], 0.52) : dkh(SLATE, 0.30),
            boxShadow: lampK(i) > 0.05 ? `0 0 ${26 * d.s}px ${hexa(C[i], 0.66 * lampK(i))}` : "none" }} />
          <div style={{ position: "absolute", left: d.x - 128 * d.s, top: d.y - 366 * d.s,
            width: 256 * d.s, height: 366 * d.s, zIndex: 40 + i, opacity: lampK(i) * 0.5,
            clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
            background: `linear-gradient(180deg, ${hexa(C[i], 0.62)} 0%, ${hexa(C[i], 0)} 100%)` }} />
          {/* ⭐ ROUND 58 — *"a sequential glow on each of the 1, 2, 3."* The
                 beam already walked the corridor; the NUMERAL now takes the hit
                 as it arrives — a halo behind the badge that punches in and
                 settles, so the count reads as 1 · 2 · 3 and not as three lit
                 doors. It is timed to the same `lampK` the beam is, so the glow
                 and the light cannot drift apart. */}
          <div style={{ position: "absolute", left: d.x - 92 * d.s, top: d.y - 268 * d.s,
            width: 184 * d.s, height: 184 * d.s, zIndex: 45 + i, borderRadius: "50%",
            pointerEvents: "none", filter: `blur(${16 * d.s}px)`,
            opacity: Math.min(1, lampK(i) * 1.5) * 0.85,
            transform: `scale(${0.5 + Math.min(1, lampK(i) * 1.6) * 0.7})`,
            background: `radial-gradient(50% 50% at 50% 50%, ${hexa(C[i], 0.95)} 0%, ${hexa(C[i], 0)} 100%)` }} />
          <Ring x={d.x} y={d.y - 176 * d.s} f={f} at={[4, 24, 46][i]} c={C[i]} z={48 + i}
            s={0.9 * d.s} dur={15} />
          <NumDoor x={d.x} y={d.y} s={d.s} z={42 + i} n={i + 1}
            open={lampK(i) * (i === 0 ? 0.16 : 0.09)} c={C[i]}
            kind={(["roller", "clinic", "night"] as const)[i]}
            label={["VOLUME", "PRIVACY", "24/7"][i]} />
          {/* the pool it lays on the floor — the part that actually repaints */}
          <div style={{ position: "absolute", left: d.x - 116 * d.s, top: d.y - 16 * d.s,
            width: 232 * d.s, height: 46 * d.s, zIndex: 30, borderRadius: "50%",
            opacity: lampK(i) * 0.62, filter: "blur(7px)",
            background: `radial-gradient(50% 50% at 50% 50%, ${hexa(C[i], 0.8)} 0%, ${hexa(C[i], 0)} 100%)` }} />
        </React.Fragment>
      ))}

      {/* the fixture, over the top of its own light */}
      <SpotLamp x={PIV.x} y={144} s={1.02} z={72} aim={aim} on={1} />

      {/* the breaker he throws, on the near wall, drawn where his hand lands */}
      <div style={{ position: "absolute", left: 404, top: 296, width: 62, height: 104,
        zIndex: 58, borderRadius: 5, background: `linear-gradient(180deg, ${mxh(SLATE, 0.10)} 0%, ${dkh(SLATE, 0.34)} 100%)`,
        border: `4px solid ${dkh("#0A0E10", 0)}` }}>
        <div style={{ position: "absolute", left: 17, top: 16 - bolt * 4, width: 26, height: 52,
          borderRadius: 4, transformOrigin: "50% 100%",
          transform: `rotate(${-34 + bolt * 68}deg)`,
          background: bolt > 0.5 ? mxh(SODIUM, 0.2) : dkh("#6B6257", 0.2) }} />
      </div>

      {/* the hero throws the first bolt */}
      <Hero f={f} x={440} y={GY} size={286} z={62} act={2} ph={0.9}
        drive={-E(f, 20, 32, 0, 0.28, OUT) + E(f, 40, 54, 0, 0.14, IO)}
        reach={96} gaze={0.35}
        cheer={E(f, 10, 18, 0, 0.5, OUT) - E(f, 20, 28, 0, 0.5, OUT)
          + E(f, 30, 38, 0, 0.5, OUT) - E(f, 40, 48, 0, 0.5, OUT)
          + E(f, 50, 60, 0, 0.7, OUT)}
        costume={{ constr: 1 }} />
      <Forearm x0={478} y0={GY - 206} x1={438 - bolt * 6} y1={402} w={19} c="#C4674A" z={64} />
      <Contact x={440} y={GY} w={98} z={19} o={0.4} />

      </Cam>

      <Chip t="ONLY THREE REASONS" y={BAND_Y} c={INK} fg="#EAF0F6" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S15 · THE PLANT — 49.02 to 51.89s (86f)
   VO: "First, industrial volume, where you can process millions of tokens per
        day."
   ⭐ THE SCALE IS THE POINT — this is not a bedroom, and that IS the
   qualification. Door 1 opens onto something enormous.
   ====================================================================== */
export const S15: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("plant");
  const open = E(f, 0, 16, 0, 1, OUT);
  const count = Math.floor(E(f, 8, dur, 0, 4_200_000, IO));

  return (
    <Scene p={p} slug="" push={[0, dur, 1.18]} vig={0.44} glow={hexa(p.key, 0.22)}>
      {/* ⛔ ROUND 65 — a scene with no per-cut framing leans on grade and rake,
             which an 8x8 hash barely sees, and its FIRST frames have no authored
             motion to separate the cuts either. ⛔ The triples differ PER SCENE:
             one number applied everywhere would give a uniform shot band. */}
      <Cam s={[1.0, 1.08, 1.038][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -32, 28][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 16, -14][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
        rake={0.17} rakeX={RAKE_X[v]} rakeRate={11.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={1.0} lamp={{ x: 700, y: 150, r: 250 }} />

      {/* the door leaf swinging out of frame left — we came through it */}
      <div style={{ position: "absolute", left: -30, top: 130, width: 250, height: GY - 100,
        zIndex: 76, transformOrigin: "0% 50%",
        transform: `perspective(900px) rotateY(${-open * 68}deg)`,
        background: `linear-gradient(172deg, ${mxh(SLATE, 0.1)} 0%, ${dkh(SLATE, 0.4)} 100%)` }} />

      {/* ⛔ ROUND 56 — Alex: *"make the animation at 50 seconds more interesting,
             it's not detailed enough."* The line was one belt of plain rounded
             rectangles in front of a bare wall. A plant has DEPTH BEHIND IT. */}
      {/* the back wall: racking, bays, and extractor fans that turn */}
      <div style={{ position: "absolute", left: -20, top: 168, width: W + 40, height: 190,
        zIndex: 26, background: `linear-gradient(178deg, ${dkh("#2A3038", 0.04)} 0%, ${dkh("#1C2128", 0.12)} 100%)` }} />
      {Array.from({ length: 5 }, (_, r) => (
        <div key={"rk" + r} style={{ position: "absolute", left: -20 + r * 220, top: 182,
          width: 196, height: 162, zIndex: 27, borderRadius: 3,
          background: dkh("#232A32", 0.06), border: `4px solid ${hexa("#000", 0.36)}` }}>
          {Array.from({ length: 3 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: 10, right: 10, top: 12 + j * 50,
              height: 38, borderRadius: 2, background: dkh("#3A434E", 0.10) }}>
              <div style={{ position: "absolute", right: 9, top: 14, width: 9, height: 9,
                borderRadius: "50%", background: (r + j) % 3 ? dkh(SODIUM, 0.5) : SODIUM }} />
            </div>
          ))}
        </div>
      ))}
      {[126, 566, 900].map((fx, i) => (
        <div key={"fan" + i} style={{ position: "absolute", left: fx - 42, top: 196, width: 84,
          height: 84, zIndex: 28, borderRadius: "50%", background: dkh("#12161B", 0),
          border: `5px solid ${dkh(STEEL, 0.44)}` }}>
          <div style={{ position: "absolute", inset: 0, transform: `rotate(${f * (7 + i * 2)}deg)` }}>
            {Array.from({ length: 6 }, (_, b) => (
              <div key={b} style={{ position: "absolute", left: "50%", top: "50%", width: 30,
                height: 9, marginTop: -4.5, borderRadius: 5, transformOrigin: "0% 50%",
                transform: `rotate(${b * 60}deg)`, background: dkh("#5A636E", 0) }} />
            ))}
          </div>
        </div>
      ))}
      {/* ⭐ THE RETURN LINE, high and running the OTHER WAY — two lines crossing
             in opposite directions is what a plant looks like, and it doubles
             the moving area of the frame for one belt. */}
      <div style={{ position: "absolute", left: -40, top: 336, width: W + 80, height: 18, zIndex: 30,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      {Array.from({ length: 11 }, (_, i) => {
        const x = (W + 200) - ((i * 106 + f * 9) % (W + 240));
        return (
          <div key={"rt" + i} style={{ position: "absolute", left: x, top: 296, width: 62,
            height: 42, zIndex: 31, borderRadius: 3, background: dkh("#6E6555", 0.14),
            border: `3px solid ${hexa("#000", 0.34)}` }} />
        );
      })}

      {/* the line: a full-width belt with REAL crates on it, always running */}
      <div style={{ position: "absolute", left: -40, top: 452, width: W + 80, height: 30, zIndex: 34,
        background: dkh(SLATE, 0.3) }} />
      {Array.from({ length: 15 }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: -30 + i * 74, top: 448,
          width: 54, height: 30, zIndex: 35, borderRadius: 15, background: dkh(STEEL, 0.34),
          transform: `rotate(${f * 11}deg)` }}>
          <div style={{ position: "absolute", left: 23, top: 5, width: 8, height: 20,
            background: hexa("#FFF", 0.14) }} />
        </div>
      ))}
      {Array.from({ length: 11 }, (_, i) => {
        const x = ((i * 152 + f * 15) % (W + 300)) - 150;
        const c2 = i % 3 === 0 ? mxh(GOLD, 0.12) : i % 3 === 1 ? mxh(CLAY, 0.06) : mxh(SODIUM, 0.2);
        /* ⛔ A CRATE IS NOT A ROUNDED RECTANGLE — lid seam, two straps, corner
           braces and a routing patch, or it is a coloured slab on a belt. */
        return (
          <div key={"ld" + i} style={{ position: "absolute", left: x, top: 372, width: 96,
            height: 82, zIndex: 36, borderRadius: 3, boxShadow: SH,
            background: `linear-gradient(168deg, ${mxh(c2, 0.12)} 0%, ${dkh(c2, 0.20)} 100%)`,
            border: `3px solid ${hexa("#000", 0.38)}` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 17, height: 5,
              background: hexa("#000", 0.26) }} />
            {[26, 62].map((sx, j) => (
              <div key={j} style={{ position: "absolute", left: sx, top: 0, width: 9, height: "100%",
                background: hexa("#3A2E1E", 0.34) }} />
            ))}
            {[[3, 3], [78, 3], [3, 64], [78, 64]].map(([bx, by], j) => (
              <div key={"cb" + j} style={{ position: "absolute", left: bx, top: by, width: 13,
                height: 13, background: hexa("#000", 0.24) }} />
            ))}
            <div style={{ position: "absolute", left: 14, top: 34, width: 30, height: 16,
              borderRadius: 2, background: hexa("#F0E6D2", 0.72) }} />
          </div>
        );
      })}
      {/* ⭐ AND SOMETHING ACTS ON THEM. A press over the line drops on each crate
             as it passes under — the line stops being scenery and becomes work. */}
      {(() => {
        const per = 152 / 15;                       /* one crate every 10.1f */
        const ph2 = (f % (per * 2)) / (per * 2);    /* it strikes every OTHER one */
        const dn = Math.max(0, Math.sin(ph2 * Math.PI * 2)) ;
        return (<>
          <div style={{ position: "absolute", left: 452, top: 196, width: 112, height: 34,
            zIndex: 38, borderRadius: 4,
            background: `linear-gradient(180deg, ${mxh("#5A4038", 0.20)} 0%, ${dkh("#3A2A22", 0.14)} 100%)` }} />
          {[462, 542].map((cx2, j) => (
            <div key={"pc" + j} style={{ position: "absolute", left: cx2, top: 226, width: 12,
              height: 128, zIndex: 37, background: dkh(STEEL, 0.40) }} />
          ))}
          <div style={{ position: "absolute", left: 448, top: 262 + dn * 74, width: 120, height: 30,
            zIndex: 39, borderRadius: 4, boxShadow: SH_D,
            background: `linear-gradient(180deg, ${mxh(BRASS, 0.18)} 0%, ${dkh(BRASS, 0.34)} 100%)` }} />
          <div style={{ position: "absolute", left: 470, top: 290 + dn * 74, width: 76, height: 24,
            zIndex: 39, borderRadius: 3, background: dkh("#3A2A22", 0.10) }} />
        </>);
      })()}
      {/* two hoppers pouring into it */}
      {[300, 690].map((hx, i) => (
        <React.Fragment key={"hp" + i}>
          <div style={{ position: "absolute", left: hx - 76, top: 176, width: 152, height: 120,
            zIndex: 32, background: dkh(SLATE, 0.24),
            clipPath: "polygon(0% 0%, 100% 0%, 68% 100%, 32% 100%)" }} />
          {Array.from({ length: 5 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: hx - 12 + (j % 2) * 16,
              top: 296 + (((f * 11 + j * 34) % 120)), width: 24, height: 24, borderRadius: 4,
              zIndex: 33, background: mxh(GOLD, 0.14) }} />
          ))}
        </React.Fragment>
      ))}

      <Steam x={506} y={286} f={f} at={10} n={8} z={40} c="#C6BCA8" s={0.8} rate={2.6} />
      <Crew f={f} x={182} y={GY} i={0} size={225} z={50} at={4} loop={1} />
      <Crew f={f} x={392} y={GY - 6} i={5} size={209} z={49} at={10} loop={0} />
      <Crew f={f} x={846} y={GY} i={8} size={220} z={50} at={16} loop={1} />

      <div style={{ position: "absolute", left: 588, top: 214, zIndex: 78 }}>
        <Totaliser x={0} y={0} s={0.62} z={78} v={count} digits={7} pre="" c={GOLD} />
      </div>
      </Cam>

      <Chip t="TOKENS PER DAY" y={BAND_Y} c={INK} fg="#FFE0C0" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S16 · THE WARD — 51.89 to 54.23s (70f)
   VO: "Second, if you have strict data privacy, like healthcare or government."
   ⛔ NO REAL ORGANISATION'S MARK — a real hospital or agency logo here would
   fabricate an endorsement. Both emblems are DRAWN generics.
   ====================================================================== */
export const S16: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("ward");

  /* ⛔⛔⛤ ROUND 37 — Alex: *"52 seconds ... I'm not sure what that's showing, too
     weird of a concept."* He is right and it is my fault twice over: round 27
     replaced four cabinets and a hatch with records BOUNCING OFF AN INVISIBLE
     WALL. An invisible wall is an abstraction — the viewer has to be told the
     rule before the picture means anything, which is the definition of a weird
     concept.
     ⭐ A REAL BARRIER, AND A HUMAN REFUSAL. He wheels a trolley of records at the
     exit and a steel shutter comes down in front of it, hard, with a guard's arm
     across it. "The data cannot leave" is then a thing you WATCH, not a rule you
     are asked to hold in your head. ⛔ No emblem, no floor line, no invisible
     anything — a door, a trolley and a hand. */
  const roll = E(f, 0, 26, 0, 1, IO);              /* he wheels it at the door */
  const slam = E(f, 26, 34, 0, 1, IN_Q);           /* the shutter drops */
  const jolt = rock(f, 34, 9, 13);                 /* and the trolley hits it */
  const back = E(f, 40, dur, 0, 1, OUT);           /* he is turned around */
  const arm = E(f, 30, 40, 0, 1, BACK);            /* the arm goes across */

  return (
    <Scene p={p} slug="" push={[0, dur, 1.175]} vig={0.30} glow={hexa(p.key, 0.14)}>
      {/* ⛔ ROUND 65 — a scene with no per-cut framing leans on grade and rake,
             which an 8x8 hash barely sees, and its FIRST frames have no authored
             motion to separate the cuts either. ⛔ The triples differ PER SCENE:
             one number applied everywhere would give a uniform shot band. */}
      <Cam s={[1.0, 1.092, 1.044][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -36, 30][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 18, -15][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
        rake={0.09} rakeX={RAKE_X[v]} rakeRate={6.3 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.4} lamp={{ x: 700, y: 200, r: 300 }} />

      {/* ⭐ ROUND 45 — asked for directly: the line names HEALTHCARE and
             GOVERNMENT, so each gets its own mark over the door, big enough to
             read at a glance. ⛔ Both are DRAWN GENERICS, never a real hospital
             or agency logo — a real mark here would fabricate an endorsement
             (the standing rule on this reel since S16 was first built). */}
      <div style={{ position: "absolute", left: 462, top: 96, width: 182, height: 182,
        zIndex: 52, borderRadius: 18, background: "#FBF8F0",
        border: `5px solid ${dkh("#8FA7AE", 0.10)}`, boxShadow: SH,
        transform: `scale(${E(f, 6, 18, 0, 1, BACK)})`, transformOrigin: "50% 50%" }}>
        <CareCross x={91} y={91} s={1.62} z={53} />
      </div>
      <div style={{ position: "absolute", left: 666, top: 96, width: 182, height: 182,
        zIndex: 52, borderRadius: 18, background: "#FBF8F0",
        border: `5px solid ${dkh("#8FA7AE", 0.10)}`, boxShadow: SH,
        transform: `scale(${E(f, 14, 26, 0, 1, BACK)})`, transformOrigin: "50% 50%" }}>
        <CivicCrest x={91} y={91} s={1.56} z={53} />
      </div>

      {/* the record store he is wheeling it OUT of */}
      {[86, 222].map((cx, i) => (
        <FileCabinet key={"fc" + i} x={cx} y={GY - 30} s={1.10} z={36 + i}
          open={0} c="#7E9298" label={i === 0 ? "RECORDS" : undefined} />
      ))}

      {/* ── THE DOORWAY, and the steel that comes down over it ── */}
      <div style={{ position: "absolute", left: 606, top: 208, width: 340, height: GY - 208,
        zIndex: 38, background: `linear-gradient(178deg, ${dkh("#20303A", 0)} 0%, ${dkh("#16242C", 0)} 100%)`,
        border: `9px solid ${mxh("#5E7480", 0.10)}` }} />
      <div style={{ position: "absolute", left: 620, top: 222, width: 312, height: 200,
        zIndex: 39, opacity: 1 - slam,
        background: `linear-gradient(178deg, ${hexa("#DCEAF0", 0.55)} 0%, ${hexa("#B4CBD6", 0.20)} 100%)` }} />
      {/* the shutter itself — slats, a bottom rail, and it SLAMS */}
      <div style={{ position: "absolute", left: 610, top: 200, width: 332,
        height: (GY - 200) * slam + jolt * 3, zIndex: 44, overflow: "hidden",
        background: `linear-gradient(96deg, ${mxh("#6E8290", 0.12)} 0%, ${dkh("#3E5460", 0.18)} 100%)`,
        borderBottom: `12px solid ${dkh("#22323C", 0)}` }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 8, right: 8, top: 10 + i * 40,
            height: 26, borderRadius: 3, background: dkh("#4E6674", 0.10),
            borderTop: `3px solid ${mxh("#6E8290", 0.10)}` }} />
        ))}
      </div>
      <Ring x={776} y={GY - 40} f={f} at={34} c="#9FC4D2" z={48} s={1.0} dur={14} />
      <Puff x={776} y={GY - 30} f={f} at={34} c={hexa("#C4D6DE", 0.6)} z={48} n={9} s={0.9} />

      {/* ── THE TROLLEY, stopped dead against it ── */}
      <div style={{ position: "absolute", left: 380 + roll * 150 - jolt * 4, top: GY - 150,
        width: 210, height: 128, zIndex: 46, borderRadius: 4,
        background: `linear-gradient(178deg, ${mxh("#8A939C", 0.14)} 0%, ${dkh("#5A636C", 0.16)} 100%)`,
        border: `5px solid ${dkh("#2A3138", 0)}` }}>
        {[0, 1, 2].map(i => (
          <div key={"fl" + i} style={{ position: "absolute", left: 12, right: 12, top: 12 + i * 38,
            height: 28, borderRadius: 2, background: mxh("#E8E0CE", 0.20),
            borderLeft: `6px solid ${mxh(TEAL, 0.10)}` }} />
        ))}
      </div>
      {[400, 540].map((wx, i) => (
        <div key={"wh" + i} style={{ position: "absolute", left: wx + roll * 150 - jolt * 4,
          top: GY - 26, width: 30, height: 30, borderRadius: "50%", zIndex: 45,
          background: dkh("#2A3138", 0), border: `4px solid ${mxh("#8A939C", 0.10)}` }} />
      ))}

      {/* the guard's arm across it — the human half of the refusal */}
      <Forearm x0={880} y0={GY - 250} x1={700 - arm * 40} y1={GY - 214} w={24} c="#C4674A" z={58} />
      <Crew f={f} x={900} y={GY} i={8} size={286} z={56} at={0} loop={2} />

      <Hero f={f} x={300 + roll * 150 - back * 90} y={GY} size={286} z={62} act={1} ph={1.3}
        drive={roll * 0.4 - back * 0.3} reach={86}
        strain={roll * 0.5} shock={E(f, 32, 44, 0, 0.9, OUT)}
        stern={E(f, 44, dur, 0, 0.9, OUT)} gaze={back > 0.3 ? -0.6 : 0.4}
        costume={{ constr: 1 }} />
      <Contact x={300 + roll * 150 - back * 90} y={GY} w={94} z={19} o={0.32} />

      {/* ⭐⭐ ROUND 58 — asked for directly: *"have like a big lock in the middle
             at 54 seconds."* The shutter says CLOSED; a padlock says NOT YOURS TO
             OPEN, which is what "strict data privacy" actually means. It lands on
             a BACK ease and the shackle DROPS into the body eight frames later —
             two beats, because a lock that arrives already shut has not locked
             anything. */}
      {E(f, 38, 48, 0, 1, BACK) > 0.02 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 78,
          transform: `scale(${E(f, 38, 48, 0, 1, BACK)}) rotate(${-3 + rock(f, 56, 8, 12) * 0.5}deg)`,
          transformOrigin: "506px 440px" }}>
          <Padlock x={506} y={440} s={1.16} z={78} shut={E(f, 50, 58, 0, 1, IN_Q)} />
        </div>
      )}
      <Ring x={506} y={352} f={f} at={57} c={BRASS} z={80} s={1.0} dur={15} />
      <Puff x={506} y={360} f={f} at={57} c={hexa("#D8CCB0", 0.55)} z={80} n={8} s={0.8} />

      </Cam>

      <Chip t="THE DATA CANNOT LEAVE" y={BAND_Y} c={INK} fg="#E8F7F9" s={0.86} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S17 · THE NIGHT FLOOR — 54.23 to 56.43s (66f)
   VO: "And third, if you actually need to run the AI agents 24-7."
   ====================================================================== */
export const S17: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("night");
  /* ⛔⛔ THIS SCENE WAS NOTHING BUT LOOPS — three `Crew` WORK cycles and a clock
     hand going round — and it still measured 9.58. A hand that returns to where
     it started has not gone anywhere; neither has a swinging arm. It needs one
     thing a viewer can watch BUILD, so the night shift's output now piles up in
     a crate in the foreground: nine jobs land in 2.2s and the level rises with
     every one of them. FILL, not spin. */
  const OUT_AT = [2, 9, 16, 23, 30, 37, 44, 51, 58];
  const landed = OUT_AT.filter(a => f >= a + 13).length;
  const hand = (f / 44) % 1;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.18]} vig={0.50} glow={hexa(p.key, 0.18)}>
      {/* ⛔ ROUND 65 — a scene with no per-cut framing leans on grade and rake,
             which an 8x8 hash barely sees, and its FIRST frames have no authored
             motion to separate the cuts either. ⛔ The triples differ PER SCENE:
             one number applied everywhere would give a uniform shot band. */}
      <Cam s={[1.0, 1.068, 1.03][{ house: 0, amber: 1, steel: 2 }[v]]}
        x={[0, -28, 24][{ house: 0, amber: 1, steel: 2 }[v]]} y={[0, 13, -11][{ house: 0, amber: 1, steel: 2 }[v]]} z={1}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="lampbar"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={8.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} lamp={{ x: 200, y: 130, r: 210 }} />

      {/* ⛔ ZERO real props in this scene before — a slab, a rounded rect and
             four moving bars per bench. A real overnight desk is a top, two
             trestles, a MONITOR with code and a blinking caret, a keyboard with
             keys, a mug and a task lamp still on. */}
      {[186, 470, 754].map((bx, i) => (
        <React.Fragment key={"nd" + i}>
          <Pool x={bx} y={GY - 128} w={250} c={p.key} o={0.24} z={20} />
          <NightDesk x={bx} y={GY} s={1.3} z={38 + i} f={f} seed={i} lamp={p.key} />
        </React.Fragment>
      ))}
      <Crew f={f} x={190} y={GY} i={1} size={217} z={50} at={2} loop={1} />
      <Crew f={f} x={470} y={GY - 4} i={6} size={212} z={50} at={8} loop={1} />
      <Crew f={f} x={750} y={GY} i={3} size={222} z={50} at={14} loop={3} />

      {/* ⛔ THE THIRD BLANK WHITE DISC IN THIS REEL. A dial is recognised by its
             FACE — a bezel, twelve markers, and two hands of different lengths. */}
      {/* ⭐ STREAM — a finished job leaves a desk every 7 frames and arcs down
             into the crate. Three sources, one destination, all night. */}
      {OUT_AT.map((a, i) => {
        const k = E(f, a, a + 13, 0, 1, IO);
        if (k <= 0 || k >= 1) return null;
        const x0 = [214, 498, 782][i % 3], y0 = GY - 268;
        const x = x0 + (648 - x0) * k;
        const y = y0 + (GY - 96 - y0) * k - Math.sin(k * Math.PI) * 86;
        return (
          <div key={"jb" + i} style={{ position: "absolute", left: x - 15, top: y - 15,
            width: 30, height: 30, borderRadius: 6, zIndex: 71,
            transform: `rotate(${k * 190}deg)`,
            background: `linear-gradient(150deg, ${mxh(SODIUM, 0.40)} 0%, ${dkh(SODIUM, 0.18)} 100%)`,
            boxShadow: `0 0 16px ${hexa(SODIUM, 0.5)}` }} />
        );
      })}

      {/* ⭐ FILL — the crate, and you can watch the level come up */}
      <div style={{ position: "absolute", left: 548, top: GY - 122, width: 200, height: 128,
        zIndex: 70, borderRadius: 4, overflow: "hidden",
        background: `linear-gradient(170deg, ${mxh("#2E3742", 0.14)} 0%, ${dkh("#1A2028", 0)} 100%)`,
        border: `6px solid ${dkh("#0C1014", 0)}` }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%",
          height: 6 + landed * 12, transition: "none",
          background: `linear-gradient(180deg, ${mxh(SODIUM, 0.24)} 0%, ${dkh(SODIUM, 0.20)} 100%)` }} />
        {Array.from({ length: landed }, (_, i) => (
          <div key={"st" + i} style={{ position: "absolute", left: 12 + (i % 3) * 60,
            bottom: 4 + Math.floor(i / 3) * 13, width: 52, height: 11, borderRadius: 2,
            background: mxh(SODIUM, 0.34), opacity: 0.9 }} />
        ))}
      </div>
      <Contact x={648} y={GY + 8} w={220} z={66} o={0.42} />

      {/* the clock covers real hours rather than ticking on the spot */}
      <ClockFace x={506} y={268} s={1.08} z={60} f={f} rate={4.2} />

      {/* ⭐⭐ ROUND 58 — *"have a big clock that somehow well represents 24/7."*
             ⭐ THE DAY/NIGHT RING IS WHAT SAYS 24/7 AND THE HANDS ALONE NEVER
             COULD. Racing hands say FAST; a ring that carries a sun round to a
             moon and back, twice, in two seconds, says ALL DAY AND ALL NIGHT —
             and the dial is marked in TWENTY-FOUR hours, not twelve. */}
      {E(f, 8, 20, 0, 1, BACK) > 0.02 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 76,
          transform: `scale(${E(f, 8, 20, 0, 1, BACK)})`, transformOrigin: "506px 374px" }}>
          <DayNightClock x={506} y={374} s={1.06} z={76} f={f} rate={1} />
        </div>
      )}
      <Ring x={506} y={374} f={f} at={19} c={GOLD} z={78} s={1.3} dur={16} />

      </Cam>

      <Chip t="NOBODY GOES HOME" y={BAND_Y} c={INK} fg="#FFEFC8" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S18 · THE KERB — 56.43 to 61.05s (139f) · PAYOFF + CTA
   VO: "If none of these apply to you, paying $112,000 for hardware that loses
        value every year makes no sense."
   MECHANISM: `DEPRECIATION`.
   ⛔ NO INVENTED FIGURE. Each strike removes the number and puts NOTHING back —
   you watch the value be taken away. The only figures on screen are the
   $112,000 that was paid and the $0.70 that was not.
   ⛔ THE VO HAS NO SPOKEN CTA, so the CTA plate is graphical only and nothing
   on screen implies he said it.
   ====================================================================== */
export const S18: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("kerb");
  const L = LAY[v];
  const CUT = 92;
  const B = f >= CUT;

  const HIT = [30, 52, 74];
  const strikes = HIT.filter(a => f >= a).length;
  const land = strikes > 0 ? E(f, HIT[strikes - 1], HIT[strikes - 1] + 6, 0, 1, OUT) : 0;
  const age = E(f, 24, dur, 0, 1, IO);
  /* ⛔⛔⛔ ROUND 33 — the last pass deleted a traffic lane and enlarged the plate
     and called it a redo. The EVENT was "a rack stands on a kerb while a number
     is struck", and it still was.
     ⭐ THE NEW EVENT: HE PUTS IT OUT. He wheels it to the kerb, sets it down and
     walks away from it — which is what "makes no sense" looks like as an action
     rather than as a caption. The strikes land while he is walking. */
  const wheel = E(f, 0, 46, 0, 1, IO);          /* he pushes it into place */
  const leave = E(f, 64, dur - 8, 0, 1, IO);    /* and walks out of frame */
  const cta = E(f, dur - 40, dur - 26, 0, 1, BACK);

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.15] : [0, CUT, 1.13]} vig={0.24}
      glow={hexa(p.key, 0.14)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? ([
          "scale(1.34) translate(64px, -30px)",
          "scale(1.50) translate(44px, -44px)",
          "scale(1.20) translate(86px, -16px)",
        ][{ house: 0, amber: 1, steel: 2 }[v]]) : "none",
        transformOrigin: "50% 56%" }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="none"
          rake={0.09} rakeX={RAKE_X[v]} rakeRate={5.25 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.6 + age * 0.7} lamp={null} />
        {/* traffic going past the thing left on the kerb */}
        <Runner y={352} f={f} z={24} rate={16.5} pitch={196} w={168} h={100} kind="car"
          c={mxh(SLATE, 0.28)} c2={dkh("#7C7058", 0.22)} rail={false} />
        {/* ⛔ ROUND 27 — two lanes of traffic behind a shot whose idea is ONE
               number being struck out. One lane is scenery; two is a subplot. */}

        {/* the rack, outside on the kerb, visibly ageing */}
        <div style={{ position: "absolute", inset: 0, zIndex: 42,
          transform: `rotate(${age * 2.6}deg)`, transformOrigin: "50% 100%" }}>
          <CardRack x={330 + L.plate - (1 - wheel) * 300} y={GY} s={1.2} z={42} f={f} seated={7} spin={0} hh={7} />
        </div>
        <Contact x={330 + L.plate - (1 - wheel) * 300} y={GY} w={470} z={26} o={0.44} />
        {/* the flat wheel and the lifting tarp corner — it is being left behind */}
        <div style={{ position: "absolute", left: 152 + L.plate, top: GY - 18,
          width: 54, height: 20 - age * 8, borderRadius: "50%", zIndex: 44,
          background: dkh("#1A1813", 0) }} />
        <div style={{ position: "absolute", left: 196 + L.plate, top: 262, width: 300,
          height: 90, zIndex: 60, transformOrigin: "0% 100%",
          transform: `rotate(${-age * 26}deg)`, opacity: age,
          background: `linear-gradient(150deg, ${dkh("#6E6250", 0.06)} 0%, ${dkh("#6E6250", 0.34)} 100%)`,
          clipPath: "polygon(0% 0%, 100% 12%, 92% 100%, 4% 84%)" }} />
        <Fall x={150 + L.plate} y={264} w={392} f={f} at={12} n={12} z={58} c="#C9BFA8" rate={1.4} s={1.1} />
      </div>

      {/* ⭐⭐ ROUND 58 — *"at 1 minute needs to be way more interesting."* The
             verdict beat was a rack standing still while a plate was struck. IT
             STARTS RAINING ON IT. One component, no new idea to decode, the
             largest continuous repaint available in the reel — and it is the
             oldest shorthand there is for something left out and written off.
         ⛔ Drawn OUTSIDE the punch container: rain does not zoom with a lens. */}
      <Rain f={f} z={78} n={72} on={E(f, 56, 96, 0, 1, IO)} ground={GY} c="#CFE6F2" />
      {/* the wet sheen it puts on everything he walked away from */}
      <div style={{ position: "absolute", left: 0, top: GY - 40, width: W, height: 80,
        zIndex: 77, opacity: E(f, 66, dur, 0, 0.34, IO), filter: "blur(10px)",
        background: `linear-gradient(180deg, ${hexa("#CFE6F2", 0)} 0%, ${hexa("#CFE6F2", 0.6)} 60%, ${hexa("#CFE6F2", 0)} 100%)` }} />

      {/* ⛔ the plate: struck through, and nothing goes back */}
      <div style={{ position: "absolute", inset: 0, zIndex: 68 }}>
        <StrikePlate x={540} y={356} s={1.44} z={68} v={R.cards.total}
          strikes={strikes} land={land} />
      </div>
      {HIT.map((a, i) => (
        <Ring key={"sk" + i} x={540} y={318} f={f} at={a} c={RED} z={70} s={0.9} dur={14} />
      ))}

      {/* the receipt in his hand does not change */}
      <Receipt x={730} y={GY - 40} s={0.62} z={72} t={R.api.hour} sub={R.api.label} rot={5} />

      {/* he sets it down and walks out of frame, leaving it there */}
      <Hero f={f} x={736 - (1 - wheel) * 120 + leave * 250} y={GY} size={294} z={62}
        act={leave > 0.06 ? 0 : 2} ph={0.8}
        strain={(1 - wheel) * 0.5} gaze={leave > 0.3 ? 0.6 : -0.2}
        costume={{ constr: 1 }} />
      <Contact x={736 - (1 - wheel) * 120 + leave * 250} y={GY} w={98} z={19} o={0.36} />

      {/* ⛔ GRAPHICAL CTA ONLY — the VO never says it. */}
      {cta > 0.02 && (
        <div style={{ position: "absolute", left: 506 - 260, top: 196, width: 520, zIndex: 92,
          transform: `scale(${cta})`, transformOrigin: "50% 50%",
          padding: "14px 20px", borderRadius: 8, background: INK,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <Mark x={-6} y={-6} s={44} z={94} plate={false} />
          <span style={{ ...mono(34, 900), color: "#F6F2E8", letterSpacing: 1 }}>
            COMMENT "{R.keyword}"</span>
        </div>
      )}

      {cta < 0.05 && (
        <Chip t="IT LOSES VALUE EVERY YEAR" y={BAND_Y} c={INK} fg="#FFF6E4" s={0.86} z={96} />
      )}
    </Scene>
  );
};
