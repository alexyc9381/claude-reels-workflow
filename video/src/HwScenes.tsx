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
  BrokenCeiling, BrandTile, ModelBox, ModelCore, FuelPump, Nozzle, BigRig, FileCabinet, NightDesk, RoundVault, Register, ClockFace,
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
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -8, dy: 12, s: 1.010, rot: -0.4 },
  amber: { dx: -48, dy: -28, s: 1.042, rot: 2.2 },
  steel: { dx: 50, dy: 26, s: 1.046, rot: -2.0 },
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
   MECHANISM: `DELIVERED`. Hue AND lightness both flip from S1.
   ⛔ NO INVENTED MARK — no Moonshot/Kimi logo asset exists, so it is a
   stencilled name plate on a real crate, never a fabricated logo.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dock");

  const roll = E(f, 0, 26, -560, 0, IO);
  const bounce = rock(f, 26, 9, 16);
  const lit = E(f, 30, 48, 0, 1, OUT);
  const rise = E(f, 44, 64, 0, 1, BACK);
  /* ⛔ the core landed and the plate arrived, then it sat — the core keeps
     settling onto the rollers to the last frame instead of stopping dead. */
  const settle = E(f, 58, dur, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.42} glow={hexa(p.key, 0.20)}>
      {/* ⛔⛔⛔ SHOT SIZE. This reel measured its own shot list and found
             SIXTEEN OF SEVENTEEN scenes putting the Claude at 27.9-33.8% of
             panel width, on the same ground line, at the same camera height —
             nineteen scenes, one shot. That is what "a lot of these are boring"
             was: no amount of motion survives the eye reading "same picture
             again". `Cam` reframes without re-laying a single prop, and its
             translate is applied LAST so it is honest screen pixels (unlike the
             `scale(k) translate(tx)` punch idiom where the shift is tx*k).
             Solved by tools/frame_shot.py, never by hand. */}
      <Cam s={1.363} x={-21} y={49} z={1}>

      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="gantry"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={7.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.7} lamp={{ x: 470, y: 150, r: 300 }} />

      {/* the roller bed it arrives on */}
      <div style={{ position: "absolute", left: -40, top: GY - 84, width: W + 80, height: 20,
        zIndex: 30, background: dkh(SLATE, 0.30) }} />
      {Array.from({ length: 13 }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: -30 + i * 84, top: GY - 96,
          width: 62, height: 32, zIndex: 31, borderRadius: 16, background: dkh(STEEL, 0.28),
          transform: `rotate(${f * 7 * (f >= 26 ? 0.2 : 1)}deg)` }}>
          <div style={{ position: "absolute", left: 26, top: 5, width: 9, height: 22,
            background: hexa("#FFF", 0.16) }} />
        </div>
      ))}

      {/* ⭐⭐ THE MODEL AS AN OBJECT WITH ITS REAL MARK ON IT.
             Round 9 shipped a brown crate with "KIMI K3" typed on a white card —
             a container carrying one bit. At half a second a viewer RECOGNISES A
             MARK; they do not read a spec. The core is 17 drawn parts and the
             glyph is the official one from the Simple Icons CDN. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 46,
        transform: `translate(${roll}px, ${bounce}px)` }}>
        <ModelCore x={596} y={GY - 84 + settle * 16} s={1.386} z={46} f={f} lit={lit}
          params={R.model.params} mark="si_kimi.svg" maker={R.model.licence} />
      </div>
      <Puff x={596} y={GY - 80} f={f} at={26} c={hexa("#E8DCC0", 0.6)} z={58} />
      <Ring x={596} y={GY - 84} f={f} at={26} c={p.key} z={57} />

      {/* the maker's mark, arriving on its own plate as the core lights */}
      {rise > 0.02 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 82,
          transform: `translateY(${(1 - rise) * -70}px)`, opacity: rise }}>
          <BrandTile x={784} y={318} s={1.25} z={82} file="si_moonshotai.svg"
            label={R.model.maker} rot={-4} />
        </div>
      )}

      {/* ONE hero action: he takes it off the rollers as it lands */}
      <Hero f={f} x={316} y={GY} size={329} z={62} act={1} ph={0.2}
        drive={E(f, 22, 34, 0, 0.44, OUT) - E(f, 46, 62, 0, 0.24, OUT)}
        strain={E(f, 26, 40, 0, 0.55, OUT) * (1 - E(f, 52, 64, 0, 1, OUT))}
        reach={96} cheer={E(f, 58, 70, 0, 0.7, OUT)} costume={{ constr: 1 }} />
      <Contact x={316} y={GY} w={104} z={19} o={0.42} />
      </Cam>

      <Chip t={`${R.model.name} · OPEN WEIGHTS`} y={BAND_Y} c={INK} fg="#FBEFD6" s={0.86} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE WEIGHBRIDGE — 8.78 to 10.89s (64f)
   VO: "That model is 2.8 trillion parameters."
   MECHANISM: `WEIGH`. ⭐ A NUMBER MOVES TO ITS VALUE, IT IS NEVER TYPESET AT IT
   — and the mechanism FAILS: the needle goes past the end of its own scale and
   bends the stop, which is what makes a magnitude land.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("weigh");

  const drop = E(f, 4, 12, 0, 1, IN_Q);
  const k = E(f, 10, 40, 0, 1, IO);                /* the needle sweeps */
  const over = E(f, 34, 50, 0, 1, OUT) + E(f, 50, dur, 0, 0.34, IO); /* overruns, and keeps bending */
  const sink = E(f, 10, 30, 0, 26, IO) + E(f, 34, dur, 0, 14, IO);
  const roll = Math.floor(E(f, 12, 46, 0, 2.8, IO) * 10) / 10;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.185]} vig={0.40} glow={hexa(p.key, 0.16)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={8.05 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 300, y: 130, r: 210 }} />
      {/* the hoist run overhead — and it is what makes the room a WEIGHBRIDGE */}
      <Runner y={214} f={f} z={22} rate={9.6} pitch={228} w={126} h={92} kind="load"
        c={mxh(BRASS, 0.16)} c2={dkh(SLATE, 0.10)} hang={5} />

      {/* the weighbridge deck, sinking, on four visible springs */}
      <div style={{ position: "absolute", left: 168, top: GY - 66 + sink, width: 460, height: 34,
        zIndex: 38, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.14)} 0%, ${dkh(STEEL, 0.38)} 100%)` }} />
      {[200, 320, 440, 560].map((sx, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: sx, top: GY - 34 + sink,
          width: 34, height: 36 - sink * 0.6, zIndex: 37,
          background: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.14)} 0 5px, ${dkh(STEEL, 0.5)} 5px 10px)` }} />
      ))}

      <div style={{ position: "absolute", inset: 0, zIndex: 46,
        transform: `translateY(${-160 * (1 - drop) + sink}px)` }}>
        {/* ⛔ this was still the old BROWN BOX while S2 had become a branded
               core — the same object drawn two different ways two seconds
               apart. It is the core, with the real mark, at weighbridge scale. */}
        <ModelCore x={470} y={GY - 66} s={0.977} z={46} f={f} lit={0.7}
          params={R.model.params} mark="si_kimi.svg" />
      </div>
      <Puff x={470} y={GY - 60} f={f} at={12} c={hexa("#DCCFAE", 0.55)} z={58} />

      {/* the dial — bone face, hard dark segments, and the stop it BENDS */}
      <DialGauge x={812} y={330} s={1.34} z={54} k={k} over={over}
        label="PARAMETERS" read={`${roll.toFixed(1)}T`} c={RED} ticks={11} />

      {/* the hero rides the deck down and braces */}
      <Hero f={f} x={282} y={GY - 60 + sink} size={282} z={60} act={3} ph={1.4}
        strain={E(f, 12, 30, 0, 0.62, OUT)} shock={E(f, 34, 46, 0, 0.8, OUT)}
        costume={{ constr: 1 }} />
      <Contact x={282} y={GY - 30 + sink} w={92} z={35} o={0.36} />

      <Chip t="OFF THE END OF THE SCALE" y={BAND_Y} c={INK} fg="#F3EFDC" s={0.86} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE CARD BAY — 10.89 to 13.88s (89f)
   VO: "To actually fit that, you need seven RTX Pro 6000 graphics cards."
   MECHANISM: `RACK UP`. ⛔ ARRIVALS SPAN THE FULL DURATION — f8/20/32/44/56/68/80.
   Bunched arrivals leave the tail dead; a rebuild that put everything in the
   first third measured 5.94 against a 6.0 bar despite being better in every
   other way.
   ⛔ THE VILLAIN IS PLANTED HERE, unremarked: the pipe under the rack.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  const AT = [8, 20, 32, 44, 56, 68, 80];
  const seated = AT.filter(a => f >= a + 7).length;
  const cur = AT.findIndex(a => f >= a && f < a + 12);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.175]} vig={0.46} glow={hexa(p.key, 0.18)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={8.75 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.7} lamp={{ x: 180, y: 160, r: 200 }} />
      {/* the cell run overhead — the bay's own traffic */}
      <Runner y={188} f={f} z={23} rate={10.4} pitch={196} w={136} h={88} kind="cell"
        c={mxh(TEAL, 0.24)} c2={dkh("#141C22", -0.1)} />
      <Strip2 x={120} y={104} w={780} c={TEAL} z={22} o={0.9} />
      {/* ⛔ ROUND 2 LEFT THIS THE DARKEST AND EMPTIEST FRAME IN THE REEL, and it
             carries the number spine's `x7`. A bay needs bays: two neighbouring
             cabinets, a cable ladder and a floor grille give the rack something
             to be one OF, and the room stops being a dark field with a slab. */}
      {[64, 900].map((bx, i) => (
        <div key={"nb" + i} style={{ position: "absolute", left: bx - 92, top: 268,
          width: 184, height: GY - 268, zIndex: 32, borderRadius: 5,
          background: `linear-gradient(174deg, ${dkh("#22323C", -0.14)} 0%, ${dkh("#22323C", 0.24)} 100%)`,
          border: `4px solid ${hexa("#000", 0.44)}` }}>
          {Array.from({ length: 7 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: 12, top: 14 + j * 54,
              width: 152, height: 42, borderRadius: 3, background: dkh("#141C22", 0),
              border: `2px solid ${dkh(STEEL, 0.6)}` }}>
              <div style={{ position: "absolute", right: 10, top: 16, width: 8, height: 8,
                borderRadius: "50%", background: (i + j) % 3 ? dkh(TEAL, 0.66) : TEAL }} />
            </div>
          ))}
        </div>
      ))}
      {/* a floor grille under the rack — where the 4.2 kW of air actually goes */}
      <div style={{ position: "absolute", left: 300, top: GY - 6, width: 610, height: 34,
        zIndex: 24, background: `repeating-linear-gradient(90deg, ${dkh("#0A1216", 0)} 0 9px, ${dkh(STEEL, 0.52)} 9px 18px)` }} />

      <CardRack x={604} y={GY - 20} s={1.28} z={46} f={f} seated={seated}
        spin={seated > 0 ? 1 : 0} stencil={R.cards.build} hh={7} />
      <Contact x={604} y={GY} w={520} z={26} o={0.5} />

      {/* each card flies in and SEATS — a squash, a ring, a lamp. Nothing lands
          and simply stops. */}
      {AT.map((a, i) => {
        const k = E(f, a, a + 7, 0, 1, OUT);
        if (k <= 0 || k >= 1) return null;
        return (
          <div key={"cd" + i} style={{ position: "absolute", inset: 0, zIndex: 58,
            transform: `translate(${(1 - k) * -420}px, ${(1 - k) * (i - 3) * 34}px)` }}>
            <GpuCard x={604} y={GY - 62 - (6 - i) * 66} s={0.818} z={58} f={f} spin={0.4}
              mark vram={false} tilt={(1 - k) * -8} />
          </div>
        );
      })}
      {AT.map((a, i) => (
        <Ring key={"rg" + i} x={604} y={GY - 66 - (6 - i) * 66} f={f} at={a + 7} c={TEAL}
          z={70} s={0.5} dur={14} />
      ))}

      {/* ⛔ THE VILLAIN, PLANTED. Small, lit, and nothing draws attention to it. */}
      {/* ⛔ THE VILLAIN, PLANTED — and round 2 put it at y=738, i.e. below the
             visible floor line, so the thing the whole reel turns on was never
             actually on screen when it was supposed to be seeded. */}
      <Pipe x={188} y={GY - 24} w={640} f={f} s={0.7} z={36} bore={20} flow={1} beads={3} />

      {/* the hero pushes each one home — the work is his, not a conveyor's */}
      <Hero f={f} x={250} y={GY} size={190} z={62} act={1} ph={0.6}
        drive={cur >= 0 ? E(f, AT[cur], AT[cur] + 7, 0, 0.62, OUT) : 0}
        strain={cur >= 0 ? 0.4 : 0} reach={96} costume={{ constr: 1 }} />
      <Contact x={250} y={GY} w={66} z={19} o={0.42} />

      <Chip t={`SEVEN CARDS · ${R.cards.vram} EACH`} y={BAND_Y} c={INK} fg="#E4F5FA" s={0.86} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE PARTS COUNTER — 13.88 to 16.40s (76f)
   VO: "And right now those cards are $16,000 each."
   MECHANISM: `PRICED`. The hero artifact finally at full size, dead centre.
   ⭐ THE STAMP IS FREE REAL ESTATE FOR A REAL NUMBER, and the card is drawn as a
   CATEGORY — shroud, fans, PCB, power inlet, display ports — not a grey slab.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");

  const drop = E(f, 11, 22, 0, 1, IN_Q);           /* the gun comes down */
  const hit = f >= 22;
  const lift = E(f, 26, 38, 0, 1, OUT);
  const recoil = rock(f, 22, 8, 12);
  const stamped = f >= 23;
  /* ⛔⛔ THE FRAME-STRIP CAUGHT THIS AND NO SINGLE FRAME COULD HAVE. Eight
     frames across this scene were the same picture: the card sat still for all
     62 of them and only a 40px gun stub moved, which is why it measured 5.33
     with a 60% hold while every frame of it looked fine. A 2.08s beat cannot
     spend 14 frames arriving at nothing and 18 more holding after the event.
     ⭐ The card now TRAVELS THE COUNTER — in from off-frame left, stamped under
     the press, and straight on out to the right, which is also where S6 picks
     it up. A 576px object crossing 578px is the largest repaint available in
     this set and it costs no new objects at all. */
  const arrive = E(f, 0, 13, 0, 1, OUT);
  const leave = E(f, 39, dur, 0, 1, IN_Q);
  const cx = -186 + arrive * 584 + leave * 566;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.17]} vig={0.30} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="lampbar"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={7.35 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} lamp={{ x: 506, y: 128, r: 250 }} />
      {/* ⛔ THE TOP 40% OF THIS SHOT WAS BARE PALE WALL. A counter has a rail
             over it with the stock hanging off it, and a swinging tag is a
             moving object in the half of the frame that had nothing in it. */}
      <div style={{ position: "absolute", left: -20, top: 246, width: W + 40, height: 13,
        zIndex: 32, background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      {[168, 322, 476, 630, 784].map((tx, i) => {
        const sw = Math.sin(f / (17 + i * 2.3) + i * 1.7) * (3.4 + i * 0.5);
        const jolt = i === 2 ? rock(f, 26, 9, 14) * 0.5 : 0;
        return (
          <div key={"tg" + i} style={{ position: "absolute", left: tx, top: 252, zIndex: 33,
            transformOrigin: "50% 0%", transform: `rotate(${sw + jolt}deg)` }}>
            <div style={{ width: 4, height: 34, marginLeft: 30,
              background: dkh("#6E6555", 0.1) }} />
            <div style={{ width: 64, height: 84, borderRadius: 4, background: CREAMB,
              border: `3px solid ${dkh("#8A7F6A", 0.2)}`, boxShadow: SH_D,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(15, 900), color: hexa(INK, 0.72) }}>
                {["96GB", "600W", "PCIe", "96GB", "600W"][i]}</span>
            </div>
          </div>
        );
      })}

      {/* the stock belt running behind the counter */}

      {/* the counter itself, and its mat */}
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

      {/* ── THE HERO ARTIFACT, full size, dead centre ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 50,
        transform: `translateY(${recoil * 0.8}px)` }}>
        <GpuCard x={cx} y={GY - 118} s={1.34} z={50} f={f} spin={0.25}
          stamp={stamped ? R.cards.each : undefined} mark vram />
      </div>

      {/* ⛔ the gun read as two grey posts descending out of nowhere. A press has
             a HEAD, two guide columns and a bed, and the columns are what make a
             downward move read as a STROKE instead of a hover. */}
      <div style={{ position: "absolute", left: 262, top: 236, width: 272, height: 30,
        zIndex: 62, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.40)} 100%)` }} />
      {[286, 494].map((gx, i) => (
        <div key={"gc" + i} style={{ position: "absolute", left: gx, top: 262, width: 15,
          height: GY - 350, zIndex: 44, borderRadius: 3,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.34)} 0%, ${mxh(STEEL, 0.10)} 46%, ${dkh(STEEL, 0.46)} 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: 274, top: 274 + (drop - lift * 0.9) * 96,
        width: 248, height: 34, zIndex: 63, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.14)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
        boxShadow: SH_D }} />
      <PriceGun x={398} y={GY - 246} s={1.0} z={64} drop={drop - lift * 0.9} />
      <Puff x={398} y={GY - 132} f={f} at={26} c={hexa("#D8CCB0", 0.6)} z={66} s={0.8} />
      <Ring x={398} y={GY - 128} f={f} at={26} c={GOLD} z={67} s={0.7} dur={16} />

      {/* the receipt, at 15px — the size a source line actually is */}
      <div style={{ position: "absolute", left: 176, top: GY - 78, zIndex: 60 }}>
        <span style={{ ...mono(15, 800), color: hexa("#5A5347", 0.85), letterSpacing: 1.1 }}>
          {R.cards.src}</span>
      </div>

      {/* the hero works the gun and flinches off the strike */}
      <Hero f={f} x={700} y={GY} size={304} z={62} act={1} ph={1.1}
        drive={drop * 0.34} strain={E(f, 14, 26, 0, 0.5, OUT) * (1 - E(f, 30, 40, 0, 1, OUT))}
        shock={E(f, 26, 34, 0, 0.9, OUT)} reach={78} costume={{ constr: 1 }} />
      <Contact x={700} y={GY} w={100} z={19} o={0.38} />

      <Chip t="ONE CARD" y={BAND_Y} c={INK} fg="#FFF4DC" s={0.9} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE TILL — 16.40 to 19.84s (103f)
   VO: "That's over $110,000 in graphics cards alone before you even buy a
        motherboard."
   MECHANISM: `TALLY, THEN THE REST OF THE LIST`.
   ⭐ §10 — THE MISSING HALF IS THE OUTPUT. A tally has to arrive somewhere, and
   it arrives at "and this is not even all of it": the paper roll, which had
   stopped, starts again with un-priced line items.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("till");
  const AT = [4, 12, 20, 28, 36, 44, 52];
  const dropped = AT.filter(a => f >= a).length;
  const total = dropped * 16000;
  const board = E(f, 62, 72, 0, 1, IN_Q);
  const roll = E(f, 72, dur, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.18]} vig={0.48} glow={hexa(p.key, 0.14)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="duct"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={7.7 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 506, y: 96, r: 220 }} />

      {/* ⛔ ROUND 1 LEFT THIS ROOM EMPTY — a dark green field with one counter
             in it. A shop needs stock behind the counter and a till with a
             BODY, or the frame is two thirds dead wall above the characters. */}
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
      <div style={{ position: "absolute", left: -30, top: GY - 150, width: W + 60, height: 150,
        zIndex: 34, background: `linear-gradient(180deg, ${dkh("#1E362A", -0.2)} 0%, ${dkh("#1E362A", 0.3)} 100%)` }} />
      {/* the till's own body under the readout */}
      {/* ⛔ a flat 300x190 dark rectangle behind the readout read as a HOLE in
             the middle of the frame. A till has a keyboard, a drawer and a
             receipt slot — grey AND rectangular is the combination that reads
             as boring, and either one alone survives. */}
      <div style={{ position: "absolute", left: 520, top: 336, width: 300, height: 190,
        zIndex: 36, borderRadius: 6,
        background: `linear-gradient(172deg, ${mxh(SLATE, 0.10)} 0%, ${dkh(SLATE, 0.42)} 100%)`,
        border: `5px solid ${dkh("#060C08", 0)}` }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"kb" + i} style={{ position: "absolute", left: 24 + (i % 4) * 62,
            top: 96 + Math.floor(i / 4) * 30, width: 48, height: 22, borderRadius: 3,
            background: i === 11 ? mxh(GREEN, 0.14) : mxh(SLATE, 0.24) }} />
        ))}
        <div style={{ position: "absolute", left: 22, top: 22, width: 122, height: 54,
          borderRadius: 3, background: "#0E1210", border: `3px solid ${dkh(SLATE, 0.5)}` }} />
        <div style={{ position: "absolute", right: 20, top: 26, width: 88, height: 10,
          borderRadius: 2, background: dkh("#060C08", 0) }} />
      </div>
      {/* the drawer, half out */}
      <div style={{ position: "absolute", left: 536, top: 520, width: 268, height: 44,
        zIndex: 37, borderRadius: "0 0 5px 5px", background: dkh(SLATE, 0.52),
        border: `4px solid ${dkh("#060C08", 0)}` }} />
      <div style={{ position: "absolute", left: 92, top: GY - 176, width: 300, height: 54,
        zIndex: 40, borderRadius: 5, background: dkh(SLATE, 0.34),
        border: `4px solid ${dkh("#060C08", 0)}` }} />
      {/* the pile that accumulates in it */}
      {Array.from({ length: dropped }, (_, i) => (
        <div key={"pl" + i} style={{ position: "absolute", left: 108 + (i % 2) * 8,
          top: GY - 186 - i * 9, width: 268, height: 14, zIndex: 41 + i, borderRadius: 3,
          background: i % 2 ? dkh("#1E2228", 0) : dkh("#262C34", 0),
          border: `2px solid ${hexa("#000", 0.5)}` }} />
      ))}
      {AT.map((a, i) => {
        const k = E(f, a - 6, a, 0, 1, IN_Q);
        if (k <= 0 || k >= 1) return null;
        return (
          <div key={"fl" + i} style={{ position: "absolute", inset: 0, zIndex: 56,
            transform: `translateY(${-(1 - k) * 300}px) rotate(${(1 - k) * -12}deg)` }}>
            <GpuCard x={242} y={GY - 186 - i * 9} s={0.818} z={56} f={f} spin={0} mark vram={false} />
          </div>
        );
      })}
      {AT.map((a, i) => (
        <Puff key={"pf" + i} x={242} y={GY - 180 - i * 9} f={f} at={a} c={hexa(GREEN, 0.4)}
          z={58} n={5} s={0.5} />
      ))}

      {/* ⭐ the totaliser — each digit its own drum, climbing in SEVEN steps */}
      <Totaliser x={556} y={286} s={0.94} z={58} v={total} digits={6} pre="$" c={GOLD} />

      {/* the motherboard he slaps down, and the roll starting again */}
      {board > 0.02 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 54,
          transform: `translateY(${-(1 - board) * 260}px) rotate(${(1 - board) * 14}deg)` }}>
          <Motherboard x={218} y={GY - 44} s={0.94} z={54} />
        </div>
      )}
      <Puff x={218} y={GY - 40} f={f} at={72} c={hexa("#CFE0D4", 0.5)} z={60} />
      <PaperRoll x={790} y={344} s={0.94} z={54} run={roll}
        items={["MOTHERBOARD", "PSU x 4", "CHASSIS", "RAM", "COOLING"]} />

      <Hero f={f} x={430} y={GY} size={298} z={62} act={1} ph={0.4}
        drive={E(f, 62, 72, 0, 0.5, OUT) - E(f, 76, 88, 0, 0.5, OUT)}
        strain={E(f, 62, 70, 0, 0.55, OUT) * (1 - E(f, 76, 86, 0, 1, OUT))}
        reach={86} costume={{ constr: 1 }} />
      <Contact x={430} y={GY} w={98} z={19} o={0.4} />

      <Chip t={R.cards.over} y={BAND_Y} c={INK} fg="#DFF3E6" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE METER CUPBOARD — 19.84 to 23.14s (99f)
   VO: "And then there's the electric bill. So you'll need to pull in 4.2
        kilowatts."
   MECHANISM: `DRAW`. The load arrives as a PHYSICAL force on the supply: the
   bus bar glows and visibly SAGS. ⭐ The emitter goes on the STILLEST part —
   here that is the meter box, not a body.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("meter");

  /* ⛔⛔⛔ ALEX NAMED THIS SCENE AT 20s: *"even though there's motion, it's just
     him moving back and forth and the machine moving a little bit. It doesn't
     actually have motion towards a goal."* IT MEASURED 10.47 — one of the three
     highest in the reel — which is the whole lesson: the motion audit counts
     pixels repainting and AN OSCILLATION REPAINTS PIXELS. One breaker flipped,
     one needle swept to 4.2 by frame 66, and the last 41 frames (38% of the
     scene) had nothing in them but a bobbing sprite.
     ⭐ Rebuilt on three accumulators that all run to the LAST frame:
       COUNT   seven breakers trip one at a time, 12f..96f — an event every 0.47s
       CLIMB   the needle kicks up a seventh on each trip and crosses the red arc
       STREAM  the draw itself, a line of charge on the bus that gets DENSER
               every time another breaker goes over
     and the bar SAGS a step further under each one, so weight accumulates too. */
  const TRIP = [12, 26, 40, 54, 68, 82, 96];
  const tripped = TRIP.filter(a => f >= a).length;
  /* seven eased steps, not one sweep: a needle that JUMPS is an event you can
     see, where a smooth arc that arrives at the half-way point is a hold. */
  const load = TRIP.reduce((a, t) => a + E(f, t, t + 9, 0, 1 / 7, OUT), 0);
  const kw = load * 4.2;
  const spin = load;
  const over = E(f, 90, dur, 0, 1, OUT);
  const kick = TRIP.reduce((a, t) => a + rock(f, t, 5, 9), 0);
  const throwK = E(f, 6, 14, 0, 1, BACK);          /* he pulls the main in */

  return (
    <Scene p={p} slug="" push={[0, dur, 1.195]} vig={0.44} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="tray"
        rake={0.16} rakeX={RAKE_X[v]} rakeRate={9.45 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.9} lamp={{ x: 506, y: 640, r: 300 }} />
      {/* the supply arriving down the bus — the room's own process */}
      <Runner y={140} f={f} z={22} rate={12.5} pitch={168} w={112} h={80} kind="cell"
        c={mxh(SODIUM, 0.20)} c2={dkh("#241608", -0.14)} />

      {/* the consumer unit and its row of breakers */}
      <div style={{ position: "absolute", left: 96, top: 250, width: 300, height: 150, zIndex: 40,
        borderRadius: 5, background: dkh("#3A342A", 0.1),
        border: `6px solid ${dkh("#1E1A14", 0)}` }} />
      {/* ⭐ COUNT — seven of them, one at a time, spread to the last frame */}
      {Array.from({ length: 7 }, (_, i) => {
        const go = E(f, TRIP[i], TRIP[i] + 7, 0, 1, BACK);
        return (
          <div key={"br" + i} style={{ position: "absolute", left: 116 + i * 39, top: 278,
            width: 28, height: 68, zIndex: 42, borderRadius: 3, background: CREAMB }}>
            <div style={{ position: "absolute", left: 6, top: 8 + go * 30,
              width: 16, height: 22, borderRadius: 2,
              background: go > 0.5 ? RED : dkh(MUTE, 0.2) }} />
            {go > 0.02 && (
              <div style={{ position: "absolute", left: -5, top: -7, width: 38, height: 38,
                borderRadius: "50%", opacity: Math.max(0, 1 - (f - TRIP[i]) / 12),
                background: `radial-gradient(50% 50% at 50% 50%, ${hexa(SODIUM, 0.9)} 0%, ${hexa(SODIUM, 0)} 100%)` }} />
            )}
          </div>
        );
      })}

      {/* ⭐ the bus bar: glows and SAGS a step further under every breaker. */}
      <BusBar x={110} y={432} w={790} s={1} z={44} load={load} />
      {/* ⭐⭐ STREAM — the draw itself, and it gets DENSER as the count climbs.
             This is the thing a viewer can watch build: at f0 it is a trickle of
             six, by the last frame it is thirty-four, all travelling one way. */}
      {Array.from({ length: 6 + tripped * 4 }, (_, i) => {
        const n = 6 + tripped * 4;
        const t = ((f * 0.0185 + i / n) % 1);
        const sag = Math.sin(t * Math.PI) * (16 + load * 34);
        const r = 9 + load * 5;
        return (
          <div key={"ch" + i} style={{ position: "absolute",
            left: 150 + t * 700 - r, top: 432 + sag - r + kick * 0.4,
            width: r * 2, height: r * 2, borderRadius: "50%", zIndex: 46,
            background: `radial-gradient(50% 50% at 38% 32%, ${mxh(SODIUM, 0.46)} 0%, ${SODIUM} 58%, ${dkh(SODIUM, 0.26)} 100%)`,
            boxShadow: `0 0 ${10 + load * 14}px ${hexa(SODIUM, 0.42)}` }} />
        );
      })}

      <PowerMeter x={732} y={GY - 90} s={1.24} z={54} f={f} spin={spin}
        v={12 + load * 26} unit="kWh" src={R.power.tdp} />

      {/* the load gauge — the number MOVES to 4.2 */}
      {/* ⭐ CLIMB — and it goes INTO the red arc on the last two trips */}
      <DialGauge x={300} y={548} s={0.977} z={54} k={load} over={over} label="LOAD"
        read={`${kw.toFixed(1)} kW`} c={EMBER} ticks={9} />

      {/* ⭐ the emitter on the STILLEST thing in frame — the box itself */}
      <Steam x={732} y={GY - 380} f={f} at={30} n={8} z={66} s={1.0} c="#E8D0A8" rate={1.6} />

      {/* the hero throws it and shields his face */}
      {/* he flinches on every one of the seven, and braces harder each time */}
      <Hero f={f} x={512} y={GY} size={310} z={62} act={1} ph={1.7}
        drive={throwK * 0.44 - kick * 0.030}
        strain={0.12 + load * 0.66}
        shock={Math.min(1, TRIP.reduce((a, t) => a + E(f, t, t + 6, 0, 0.8, OUT)
               - E(f, t + 6, t + 13, 0, 0.8, IO), 0))}
        reach={92} costume={{ constr: 1 }} />
      <Contact x={512} y={GY} w={100} z={19} o={0.4} />

      <Chip t="THE SUPPLY IS STRAINING" y={BAND_Y} c={INK} fg="#FFE7BC" s={0.86} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE PUMP — 23.14 to 28.57s (163f)
   VO: "If you leave them running 24/7 at the US average electricity rate,
        you're paying $565 a month just to power the GPUs."

   ⛔⛔⛔ COMPLETE REBUILD. Alex named 25s and 27s directly: *"wayyy too boring,
   needs to be redone completely, way better animation concepts."* He is right,
   and the old scene had three separate versions of the same defect:
     · the house was a BLUE RECTANGLE with square windows;
     · the meter was a GREY RECTANGLE with a disc in it;
     · and 30 day-plates crossing the top were 30 more rectangles.
   Three boxes and a number. Nothing in it was an ITEM.

   ⭐⭐⭐ ONE ACTION, ONE OBJECT, INSTANTLY RECOGNISED: he is holding a FUEL PUMP
   NOZZLE into the rack and the total is racing. Everybody reads a pump in under
   half a second; it has a real silhouette (housing, brow, display, grade
   buttons, hose, nozzle, boot — 21 drawn parts); and "filling something up while
   the number climbs" IS what paying to power a machine is. The hero does ONE
   thing for the whole shot and the frame ranks: pump lit, rack dark, everything
   else held down.
   ⛔ AND THE RUNNER IS GONE. This scene had traffic crossing it as well, which is
   what made it read as busy-and-unranked rather than as one idea.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("street");
  const CUT = 96;
  const B = f >= CUT;

  const grab = E(f, 6, 18, 0, 1, OUT);            /* he lifts the nozzle */
  const insert = E(f, 18, 30, 0, 1, IO);          /* and puts it in the rack */
  const flow = f >= 30 ? 1 : 0;
  const money = E(f, 30, dur - 6, 0, 565, IO);
  /* the hose kicks as the supply surges through it */
  const buck = flow ? Math.sin(f / 3.1) * 3.4 + Math.sin(f / 1.7) * 1.6 : 0;

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.15] : [0, CUT, 1.22]} vig={0.50}
      glow={hexa(p.key, 0.18)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? `scale(1.20) translate(${30 + PAR_X[v] * 0.5}px, 0px)` : "none",
        transformOrigin: "50% 56%" }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
          rake={0.17} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.6} lamp={{ x: 300, y: 150, r: 300 }} />

        {/* the forecourt canopy — one committed overhead so the frame is not
            bottom-heavy, and it is what a pump actually stands under */}
        <div style={{ position: "absolute", left: -60, top: 176, width: W + 120, height: 34,
          zIndex: 24, background: mxh(p.back2, 0.20), borderRadius: 4 }} />
        <div style={{ position: "absolute", left: -60, top: 210, width: W + 120, height: 14,
          zIndex: 24, background: dkh(p.lip, 0) }} />
        {[120, 880].map((cx, i) => (
          <div key={"cp" + i} style={{ position: "absolute", left: cx, top: 210, width: 26,
            height: GY - 210, zIndex: 23, background: dkh(p.back2, 0.42) }} />
        ))}
        <Pool x={506} y={GY - 30} w={780} c={p.key} o={0.20} z={20} />

        {/* ── THE RACK BEING FILLED — dark, and it is the thing consuming ── */}
        {/* ⭐ the rack RESPONDS to being filled: its fans spool from a crawl to
               full as the charge goes in. 400px of it changing is a far bigger
               repaint than anything pasted across the back of the room, and it
               is the literal thing the money is buying. */}
        {/* ⭐ the rack is the thing being filled, so it is the BIG object and it
               is LIT — navy on navy is why it read as a stripe at the edge. */}
        <div style={{ position: "absolute", left: 470, top: 168, width: 470, height: GY - 150,
          zIndex: 33, borderRadius: 8, opacity: 0.5 + flow * 0.3,
          background: `radial-gradient(58% 46% at 46% 34%, ${hexa(GOLD, 0.20)} 0%, ${hexa(GOLD, 0)} 100%)` }} />
        <CardRack x={790} y={GY} s={1.36} z={40} f={f} seated={7}
          spin={0.12 + (flow ? E(f, 30, dur - 20, 0.2, 3.1, IO) : 0)} hh={7} />
        <Contact x={790} y={GY} w={480} z={26} o={0.46} />
        {/* ⛔ AFTER f30 NOTHING IN THIS SCENE CHANGED FOR 124 FRAMES. The insert
               was over and a rolling drum plus seven 20px beads is ~3% of the
               panel, which is the whole of why it measured 5.79 while every
               frame of it looked right. A 5.1s beat needs a second event, and
               the honest one is already in the fiction: the money is powering
               SEVEN cards, so they come up one at a time, bottom to top, across
               the entire shot. */}
        {Array.from({ length: 7 }, (_, i) => {
          const on = E(f, 34 + i * 16, 46 + i * 16, 0, 1, OUT);
          if (on <= 0) return null;
          return (
            <div key={"lit" + i} style={{ position: "absolute", left: 511,
              top: 70 + (17 + (6 - i) * 62) * 1.36, width: 579, height: 73, zIndex: 41,
              borderRadius: 4, opacity: on * 0.62,
              background: `linear-gradient(90deg, ${hexa(GOLD, 0.34)} 0%, ${hexa(GOLD, 0.06)} 62%, ${hexa(GOLD, 0)} 100%)`,
              boxShadow: `inset 0 0 ${26 * on}px ${hexa(GOLD, 0.4 * on)}` }} />
          );
        })}
        {/* ⛔ THE FILLER FLAP WAS A 44px DARK-GREY RECTANGLE ON A DARK NAVY
               RACK, so the one thing this scene is about — the nozzle going INTO
               the thing being powered — had nowhere legible to go, and the
               frame-strip showed it reading as a man fuelling his own hat. It is
               a real filler port now: a lit recess, a rim, a cap hinged back on
               its arm, and a glow that comes up only once it flows. */}
        <div style={{ position: "absolute", left: 690 - 68, top: GY - 292 - 68, width: 136,
          height: 136, zIndex: 43, borderRadius: "50%", background: dkh("#0B1016", 0),
          border: `10px solid ${mxh(BRASS, 0.06)}`, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 690 - 40, top: GY - 292 - 40, width: 80,
          height: 80, zIndex: 44, borderRadius: "50%",
          background: `radial-gradient(50% 50% at 50% 40%, ${hexa(GOLD, 0.10 + flow * 0.70)} 0%, ${hexa("#0A0D12", 0.9)} 100%)`,
          boxShadow: flow ? `0 0 40px ${hexa(GOLD, 0.60)}` : "none" }} />
        <div style={{ position: "absolute", left: 690 + 52, top: GY - 292 - 34, width: 68,
          height: 68, zIndex: 45, borderRadius: "50%", background: mxh(STEEL, 0.04),
          border: `7px solid ${dkh(STEEL, 0.42)}`, transformOrigin: "-18px 50%",
          transform: `rotate(${-14 - 62 * insert}deg)` }} />
        <div style={{ position: "absolute", left: 690 + 30, top: GY - 296, width: 30, height: 10,
          zIndex: 45, background: dkh(STEEL, 0.36) }} />

        {/* ── THE PUMP — the one lit object ── */}
        {/* ⭐ the number racing IS this scene's motion, so it is drawn big and
               the digits ROLL rather than swapping — a rolling drum repaints its
               whole face every sample where a swapped glyph repaints almost
               nothing. */}
        <FuelPump x={290} y={GY} s={1.02} z={44} f={f} money={money}
          unit="THIS MONTH" src={R.bill.src} run={flow ? 1 : 0.12} roll />

        {/* the hose, drawn as a real curve from the pump to the nozzle */}
        <svg width={W} height={H} style={{ position: "absolute", inset: 0, zIndex: 60,
          pointerEvents: "none" }}>
          <path d={`M 431 ${GY - 133} Q ${548 + buck * 4} ${GY - 24 + grab * 30}
                    ${610 + insert * 76} ${GY - 232 - insert * 60 + buck}`}
            stroke="#241A16" strokeWidth={17} fill="none" strokeLinecap="round" />
          <path d={`M 431 ${GY - 133} Q ${548 + buck * 4} ${GY - 24 + grab * 30}
                    ${610 + insert * 76} ${GY - 232 - insert * 60 + buck}`}
            stroke={dkh("#C4453A", 0.44)} strokeWidth={9} fill="none" strokeLinecap="round" />
        </svg>
        <Nozzle x={610 + insert * 76} y={GY - 248 - insert * 60 + buck} s={1.16} z={78}
          rot={-28 + insert * 34} />

        <Steam x={702} y={186} f={f} at={30} n={8} z={42} s={1.5} c="#8FA6B6" rate={2.1} />
        <Steam x={868} y={166} f={f} at={38} n={7} z={42} s={1.25} c="#7E95A6" rate={1.8} />
        <div style={{ position: "absolute", left: 690 - 190, top: GY - 76, width: 380, height: 64,
          zIndex: 28, borderRadius: "50%", filter: "blur(14px)",
          opacity: flow ? 0.30 + Math.abs(buck) * 0.055 : 0.06,
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa(GOLD, 0.85)} 0%, ${hexa(GOLD, 0)} 100%)` }} />

        {/* what is actually going in — bright charge travelling the hose */}
        {flow > 0 && Array.from({ length: 12 }, (_, i) => {
          const t = ((f * 0.040 + i / 12) % 1);
          return (
            <div key={"fl" + i} style={{ position: "absolute",
              left: 431 + t * 255, top: GY - 133 - t * 159 - Math.sin(t * Math.PI) * 86 + buck,
              width: 34, height: 34, borderRadius: "50%", zIndex: 61,
              background: `radial-gradient(50% 50% at 38% 32%, ${mxh(GOLD, 0.42)} 0%, ${GOLD} 62%, ${dkh(GOLD, 0.22)} 100%)`,
              opacity: 0.95 - t * 0.22 }} />
          );
        })}

        {/* ⛔ HE LIVES INSIDE THE PUNCH GROUP. He was outside it while the hose
               and the nozzle were inside, so the cut tore his hand off the thing
               he is holding for the last 1.9s of the scene. */}
        {/* ONE hero action for the whole shot: he holds the nozzle in */}
        <Hero f={f} x={480 + insert * 20} y={GY} size={296} z={62} act={1} ph={0.6}
          drive={grab * 0.62 + insert * 0.54} reach={92} gaze={0.5}
          strain={flow ? 0.52 + Math.sin(f / 4.6) * 0.30 : 0.12}
          shock={flow ? Math.max(0, Math.sin(f / 4.6)) * 0.26 : 0}
          costume={{ constr: 1 }} />
        <Forearm x0={534} y0={GY - 168} x1={602 + insert * 76} y1={GY - 240 - insert * 58}
          w={21} c="#C4674A" z={70} />
        <Contact x={480 + insert * 20} y={GY} w={132} z={19} o={0.40} />
      </div>

      {/* the per-month plate, outside the punch */}
      {f >= dur - 52 && (
        <div style={{ position: "absolute", left: 640, top: 232, zIndex: 92,
          transform: `scale(${E(f, dur - 52, dur - 40, 0, 1, BACK)})`, transformOrigin: "0% 50%",
          padding: "8px 18px", borderRadius: 6, background: CREAMB }}>
          <span style={{ ...mono(30, 900), color: INK }}>{R.bill.per}</span>
        </div>
      )}

      <Chip t="EVERY MONTH, JUST FOR POWER" y={BAND_Y} c={INK} fg="#DCE6FA" s={0.84} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE BAY, RE-LIT HARD RED — 28.57 to 30.50s (58f) · THE TURN
   VO: "But here's the real problem."
   MECHANISM: `THE FLOOR OPENS`. ⛔ 1.93s, ONE idea, and it does not resolve.
   ⛔ A RETURNING SET IS A CALLBACK ONLY IF THE LIGHT CHANGED — this is S4's
   room with the only red in the reel in it.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bayred");

  /* ⛔ TAIL 0.42 — the worst in the reel. The floor finished opening at f26 and
     he finished backing off at f42, leaving 16 of 58 frames with nothing in
     them. Both now run to the final frame. */
  const crack = E(f, 8, 34, 0, 1, BACK) + E(f, 34, dur, 0, 0.22, IO);
  /* what comes up out of it keeps building — the scene ends mid-flood, not on a
     settled arrangement (memory: feedback_the_tail_goes_still). */
  const flood = E(f, 24, dur, 0, 1, IO);
  /* ⛔ he backed off 96px over 16 frames. In a 58-frame scene the ONE idea has
     to travel: the hatch is flung open and he is driven the width of the frame. */
  const back = E(f, 18, 44, 0, 1, OUT) + E(f, 44, dur, 0, 0.26, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.2]} vig={0.54} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="tray"
        rake={0.18} rakeX={RAKE_X[v]} rakeRate={10.85 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.9} lamp={null} />

      {/* everything he built, behind him and now unlit */}
      <CardRack x={790} y={GY - 20} s={1.135} z={40} f={f} seated={7} spin={0.5} hh={7} />
      <Contact x={790} y={GY} w={430} z={26} o={0.5} />

      {/* ⛔⛔ THIS READ AS A SOFT RED WASH OVER HALF THE FRAME. A 380px flap and
             a 330px gradient cone is not "the floor opens" — it is a stain. The
             opening is now 560px of BAY DOOR in two leaves that swing apart from
             the centre, which is 560px of surface actually travelling rather
             than one small flap tipping, and the void under it is DRAWN (a rim,
             a wall, a dark bottom) instead of implied by colour. */}
      <div style={{ position: "absolute", left: 96, top: GY - 232, width: 560, height: 232,
        zIndex: 34, borderRadius: 4, overflow: "hidden",
        background: `linear-gradient(180deg, ${dkh("#2A0A06", 0)} 0%, ${dkh("#120402", 0)} 100%)` }}>
        {/* the shaft wall, and the red coming up it */}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%",
          height: 96 + crack * 96, opacity: crack,
          background: `linear-gradient(0deg, ${hexa("#FF6A46", 0.86)} 0%, ${hexa("#FF3D1E", 0.20)} 62%, ${hexa("#FF6A46", 0)} 100%)` }} />
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"rb" + i} style={{ position: "absolute", left: 26 + i * 112, bottom: 0,
            width: 13, height: 232, opacity: 0.5 + crack * 0.3, background: dkh("#0B0300", 0) }} />
        ))}
      </div>
      {/* the rim it opens out of */}
      <div style={{ position: "absolute", left: 84, top: GY - 244, width: 584, height: 20,
        zIndex: 47, borderRadius: 3, background: dkh(p.floor2, 0.36),
        boxShadow: `0 4px 0 ${hexa("#000", 0.5)}` }} />
      {/* ── THE TWO LEAVES, swinging apart from the centre ── */}
      {[-1, 1].map(sd => (
        <div key={"lf" + sd} style={{ position: "absolute",
          left: sd < 0 ? 96 : 376, top: GY - 236, width: 280, height: 236, zIndex: 48,
          transformOrigin: sd < 0 ? "0% 50%" : "100% 50%",
          transform: `perspective(900px) rotateY(${sd * crack * 74}deg)`,
          background: `linear-gradient(${sd < 0 ? 96 : 264}deg, ${mxh(p.floor, 0.18)} 0%, ${dkh(p.floor, 0.34)} 100%)`,
          border: `5px solid ${hexa("#000", 0.52)}`, borderRadius: 3 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: 20, right: 20, top: 26 + i * 68,
              height: 15, borderRadius: 2, background: hexa("#000", 0.24) }} />
          ))}
        </div>
      ))}
      {/* the light that gets OUT of it — shaped, and only once the leaves part */}
      <div style={{ position: "absolute", left: 118, top: GY - 470, width: 520, height: 244,
        zIndex: 46, opacity: Math.min(1, crack * 0.58 + flood * 0.30),
        background: `linear-gradient(0deg, ${hexa("#FF6A46", 0.74)} 0%, ${hexa("#FF6A46", 0)} 100%)`,
        clipPath: "polygon(30% 100%, 70% 100%, 100% 0%, 0% 0%)" }} />
      <Motes x={124} y={GY - 430} w={508} h={300} n={20 + Math.round(flood * 16)} f={f} z={49} c={hexa("#FFB08A", 0.62)} />

      {/* he turns, looks DOWN, and takes a step back */}
      <Hero f={f} x={370 + back * 288} y={GY} size={332} z={62} act={3} ph={0.2}
        drive={-back * 0.9} reach={110} gaze={-0.8}
        shock={E(f, 16, 28, 0, 1, OUT)} costume={{ constr: 1 }} />
      <Contact x={370 + back * 288} y={GY} w={106} z={19} o={0.44} />

      <Chip t="IT IS NOT THE MONEY" y={BAND_Y} c={INK} fg="#FFD9CE" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE RENTED RIG — 30.50 to 36.86s (191f)
   VO: "One guy actually tried renting a massive server to run this model, and
        he got 0.1 tokens per second because his GPUs sat at 1% utilization."

   ⛔⛔⛔ COMPLETE REBUILD. Alex named 35s: *"way too boring."* The old scene was
   four dark RECTANGLES with tiny rectangles inside them, a fan wall, two
   counters and a drip — busy, made of boxes, and nothing in it ranked.

   ⭐⭐⭐ ONE IMAGE, AND THE CONTRAST IS THE WHOLE SCENE: an ENORMOUS machine that
   is barely turning, and one drop coming out of it. `BigRig` is 28 drawn parts —
   a hopper, a boiler drum with hoop bands and rivets, a flywheel on a belt,
   three gauges, a chimney — and its flywheel turns almost imperceptibly, because
   **a giant that is barely moving reads as wasted in a way a fast one never
   can.** Money goes IN fast on the left; one bead comes OUT slow on the right.
   ⛔ Two shots, not three. The old scene cut three times and still said nothing.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  const CUT = 112;
  const B = f >= CUT;
  const spend = E(f, 0, dur, 0, 214, LIN);

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.25] : [0, CUT, 1.21]} vig={0.54}
      glow={hexa(p.key, 0.16)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? "scale(1.85) translate(-214px, -129px)" : "none",
        transformOrigin: "50% 56%" }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="duct"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={5.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} lamp={{ x: 420, y: 140, r: 320 }} />

        {/* ── THE RIG. Enormous, and barely turning. ── */}
        {/* ⛔⛔ AT s=1.20 THIS IS 744px WIDE AND IT CARRIES A READOUT AT EACH END
               — the 1% plate at 180..450 and the two gauges at 517..632. The
               crop bound leaves 740px of usable width, so a 310px Claude cannot
               stand clear of both, and moving him to x=690 last round parked him
               squarely behind the IDLE gauge: the strip showed a headless body
               with a pair of glasses floating over it for the whole shot. */}
        <BigRig x={330} y={GY - 20} s={1.10} z={40} f={f} idleK={0.05} util={R.run.util} />
        <Contact x={330} y={GY} w={600} z={26} o={0.50} />

        {/* what goes IN — coin after coin, fast, on a chute into the hopper */}
        {Array.from({ length: 30 }, (_, i) => {
          const t = ((f * 0.062 + i / 30) % 1);
          return (
            <div key={"co" + i} style={{ position: "absolute",
              left: 152 + t * 250 + (i % 5) * 18, top: 14 + t * t * 244,
              width: 44, height: 44, borderRadius: "50%", zIndex: 52,
              background: `radial-gradient(50% 50% at 36% 30%, ${mxh(GOLD, 0.34)} 0%, ${dkh(GOLD, 0.22)} 100%)`,
              border: `3px solid ${dkh(GOLD, 0.46)}` }} />
          );
        })}

        {/* what comes OUT — one bead, every ten seconds, into a nearly empty jar */}
        <div style={{ position: "absolute", left: 640, top: GY - 256, width: 120, height: 30,
          zIndex: 54, borderRadius: "0 15px 15px 0",
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.14)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
        {/* ⭐ THE ONLY HONEST MOTION AN IDLE MACHINE HAS. A rig at 1% util does
               not thrash its fans — drawing one would misreport the measured
               fact. What it DOES do is dump every watt it pulls straight out as
               heat, so the exhaust runs flat out while the flywheel barely
               turns, and that contradiction is the scene. */}
        {/* ⛔ these were at z=39, BEHIND the rig at z=40, so a whole exhaust
               system rendered every frame and was never once visible. */}
        <Steam x={690} y={GY - 322} f={f} at={0} n={8} z={45} s={1.35} c="#9FB0BC" rate={2.0} />
        <Steam x={812} y={GY - 352} f={f} at={8} n={7} z={45} s={1.10} c="#8FA2AF" rate={1.7} />
        {/* ⭐ §12: name what the CLAUDE DOES. "Sits and waits" is dead however
               busy the room is — and a floating stopwatch was one more object in
               the scene Alex already called too busy. He HOLDS A CUP UNDER THE
               SPOUT, which is the one thing the shot is about: an enormous rig,
               rented by the hour, filling a cup one bead at a time. */}
        <Hero f={f} x={752} y={GY} size={200} z={62} act={1} ph={2.2}
          drive={E(f, 40, 52, 0, 0.55, OUT) - E(f, 52, 64, 0, 0.55, IO)
                 + E(f, 96, 108, 0, 0.55, OUT) - E(f, 108, 120, 0, 0.55, IO)}
          reach={62} gaze={-0.5} stern={E(f, 120, 150, 0, 0.9, OUT)}
          costume={{ constr: 1, glasses: 1 }} />
        <Contact x={752} y={GY} w={70} z={19} o={0.40} />
        {/* ⛔ `Drip` DRAWS ITS OWN CUP at y + fall*s. A second hand-drawn cup was
               sitting on top of it, which is the grey tub the frame-strip showed
               dominating the bottom of the shot. One cup: the drip's. */}
        <Forearm x0={716} y0={GY - 142} x1={734} y1={GY - 118} w={18} c="#C4674A" z={65} />
        <Drip x={660} y={GY - 258} f={f} s={1.55} z={66} period={60} fall={92}
          caught={Math.floor(f / 60)} />
      </div>

      {/* the rented-time meter, out of the punch — money UP fast */}
      <div style={{ position: "absolute", left: 172, top: 236, zIndex: 90 }}>
        <Totaliser x={0} y={0} s={1.44} z={90} v={spend} digits={3} pre="$" c={EMBER} roll />
        <div style={{ position: "absolute", left: 6, top: 88, whiteSpace: "nowrap" }}>
          <span style={{ ...mono(12, 800), color: hexa("#F0C79A", 0.85), letterSpacing: 1.2 }}>
            RENTED · PER HOUR</span>
        </div>
      </div>
      {/* and the rate that comes back out */}
      <div style={{ position: "absolute", left: 542, top: 226, zIndex: 90, padding: "7px 18px",
        borderRadius: 6, background: CREAMB }}>
        <span style={{ ...mono(32, 900), color: INK }}>{R.run.rate}</span>
      </div>
      {/* ⛔ THE 12px RIG SPEC LINE IS GONE. It needed ~360px, it ran off the
             right edge of the crop, and nobody reads a spec at 12px in a 6s
             shot — it was clutter in the scene Alex already called too busy. */}

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
  const p = asPlace("under");

  const lever = E(f, 4, 18, 0, 1, OUT);
  const look = E(f, 22, 36, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.2]} vig={0.52} glow={hexa(p.key, 0.20)}>
      {/* ⛔⛔⛔ SHOT SIZE — see S1. Solved by tools/frame_shot.py. */}
      <Cam s={1.281} x={32} y={-62} z={1}>

      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="joist"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={8.75 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.8} lamp={{ x: 380, y: 60, r: 240 }} />

      {/* ⛔ ROUND 2 SWUNG A 420px BOARD FROM A PIVOT IN THE MIDDLE OF THE
             FRAME, so it read as a plank thrown across the shot rather than as a
             floorboard being lifted. It is shorter now, hinged at the LEFT edge
             where the rest of the floor is, and it lifts up and away — and the
             dark opening it uncovers is what the eye follows down to the pipe. */}
      <div style={{ position: "absolute", left: 70, top: 288, width: 300, height: 52, zIndex: 30,
        background: dkh("#0A0614", 0), opacity: lever }} />
      <div style={{ position: "absolute", left: 70, top: 292, width: 300, height: 30, zIndex: 44,
        borderRadius: 2, transformOrigin: "0% 100%",
        transform: `rotate(${-lever * 52}deg)`,
        background: `linear-gradient(180deg, ${mxh("#6E5A3E", 0.12)} 0%, ${dkh("#6E5A3E", 0.28)} 100%)`,
        borderTop: `3px solid ${mxh("#6E5A3E", 0.3)}` }} />
      {/* the joist ends the board came off, so the opening reads as a floor */}
      {[0, 1, 2].map(i => (
        <div key={"jo" + i} style={{ position: "absolute", left: 96 + i * 96, top: 300,
          width: 26, height: 40, zIndex: 31, background: dkh("#4A3C28", 0.1), opacity: lever }} />
      ))}

      {/* the reservoir it comes out of — colossal, cropped by the frame, and
          it FEEDS the pipe rather than sitting near it */}
      <div style={{ position: "absolute", left: -170, top: 356, width: 356, height: 372, zIndex: 46,
        borderRadius: "0 30px 30px 0",
        background: `linear-gradient(96deg, ${dkh(SLATE, 0.5)} 0%, ${mxh(SLATE, 0.12)} 100%)`,
        border: `6px solid ${dkh("#0A0810", 0)}` }}>
        {Array.from({ length: 18 }, (_, i) => (
          <div key={"rb" + i} style={{ position: "absolute", left: 40 + (i % 3) * 92,
            top: 40 + Math.floor(i / 3) * 52, width: 74, height: 38, borderRadius: 4,
            background: i % 2 ? mxh(VIOLET, 0.22) : mxh(VIOLET, 0.08) }} />
        ))}
      </div>
      {/* ⛔ THE VILLAIN, at full size — and it is the TAPER that makes it read.
             A constant-bore tube rendered as a grey rail with dots on it. */}
      <Pipe x={176} y={540} w={706} f={f} s={1.0} z={50}
        mouth={150} bore={26} flow={0.6} beads={3} taper={0.26} c={SLATE} />

      <Hero f={f} x={640} y={GY} size={313} z={62} act={3} ph={0.7}
        drive={lever * 0.34 - look * 0.2}
        strain={E(f, 4, 18, 0, 0.6, OUT) * (1 - E(f, 22, 32, 0, 1, OUT))}
        reach={78} gaze={-0.7} shock={look * 0.6} costume={{ constr: 1 }} />
      <Contact x={640} y={GY} w={100} z={19} o={0.42} />
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
  const L = LAY[v];
  const CUT = 96;
  const B = f >= CUT;

  /* he cranks harder and harder — and the output does not change */
  /* ⛔ THE STRIP SHOWED SIX NEAR-IDENTICAL FRAMES. A 44-frame pump cycle over a
     4.9s scene is barely two strokes, so the peak of the reel read as a man
     standing beside a cylinder. The cycle now starts at 39f and tightens to 16f
     — he is visibly working harder — and every stroke lands an IMPULSE. */
  const phase = f / (6.2 - Math.min(3.6, f / 34));
  const crank = 0.5 + 0.5 * Math.sin(phase);
  /* the kick at the bottom of each stroke: sharp, not sinusoidal */
  const kick = Math.pow(Math.max(0, -Math.sin(phase)), 5);
  const strain = E(f, 10, 90, 0.2, 0.95, IO);

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.15] : [0, CUT, 1.13]} vig={0.50}
      glow={hexa(p.key, 0.18)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? "scale(1.44) translate(-186px, -34px)" : "none",
        transformOrigin: "50% 56%" }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
          rake={0.14} rakeX={RAKE_X[v]} rakeRate={8.05 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="boards" grit={0.7} lamp={{ x: 300, y: 70, r: 260 }} />

        {/* ⛔⛔⛔ ROUND 1 DREW THREE OBJECTS THAT NEVER TOUCHED. The silo, the
               pipe and the output tray were at three different heights with air
               between them, so there was no MECHANISM on screen — only three
               props in a row, and the scene the whole reel turns on read as "a
               Claude standing next to a cylinder". Everything below now sits on
               ONE horizontal axis at y=560 and physically connects. */}

        {/* ── LEFT: STORE. Countable contents, filled to a level line, and a
               WIDE outlet at the base. This half is solved and it stays solved. */}
        {/* ⭐ THE STORE SHUDDERS AND NOTHING LEAVES IT. Every stroke slams 310px
               of silo — the largest object in the frame — and the level line does
               not drop by a pixel, which is the sentence the scene is for. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 38,
          transform: `translate(${kick * 5}px, ${kick * 10}px) scaleY(${1 - kick * 0.022})`,
          transformOrigin: "50% 100%" }}>
          <Silo x={236 + L.silo} y={GY - 26} s={1.12} z={38} label={R.run.stored} fill={0.94} f={f} />
        </div>
        <Contact x={236 + L.silo} y={GY} w={310} z={26} o={0.46} />

        {/* ── THE REDUCER: a wide mouth collapsing to a thin bore, bolted onto
               the silo's outlet. THIS is the villain, and it is the taper that
               says so — a constant-bore tube is just a rail. ── */}
        <Pipe x={358 + L.silo} y={560} w={508} f={f} s={1.0} z={44}
          mouth={92} bore={22} flow={0.30} beads={3} taper={0.30} c={SLATE} />
        {/* the pressure that has nowhere to go: the mouth swells on each stroke
            and the bore passes the same trickle it always did */}
        <div style={{ position: "absolute", left: 344 + L.silo, top: 560 - 62 - kick * 13,
          width: 108, height: 124 + kick * 26, zIndex: 43, borderRadius: "46% 20% 20% 46%",
          background: `linear-gradient(90deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.30)} 100%)`,
          transform: `scaleX(${1 + kick * 0.13})`, transformOrigin: "0% 50%" }} />
        {kick > 0.25 && (
          <Ring x={396 + L.silo} y={560} f={f} at={f} c={hexa("#E4C9F2", 0.9)} z={49}
            s={0.42} dur={9} />
        )}
        {/* ⭐ THE BACKLOG IS THE ACCUMULATOR. Three lines creeping into a bin
               over five seconds is not something a viewer can watch build — but
               the QUEUE that cannot get through the bore is: it grows from four
               to eighteen while five make it out the far end, and the gap
               between those two numbers is the entire scene. */}
        {Array.from({ length: Math.min(18, 4 + Math.floor(f / 9)) }, (_, i) => {
          const jx = 356 + L.silo + (i % 6) * 15 + Math.sin(i * 2.3) * 5;
          const jy = 528 + Math.floor(i / 6) * 22 + Math.cos(i * 1.9) * 4;
          const nudge = kick * (2 + (i % 4));
          return (
            <div key={"jm" + i} style={{ position: "absolute", left: jx + nudge, top: jy,
              width: 19, height: 19, borderRadius: "50%", zIndex: 45,
              background: `radial-gradient(50% 50% at 38% 32%, ${mxh(GOLD, 0.40)} 0%, ${GOLD} 60%, ${dkh(GOLD, 0.26)} 100%)` }} />
          );
        })}

        {/* the OUTPUT bin at the far end, and it is nearly empty. An empty
            container must READ while it is still empty, because empty is the
            promise — so it differs from its violet room in hue AND value. */}
        <div style={{ position: "absolute", left: 848, top: 512, width: 150, height: 132,
          zIndex: 48, borderRadius: 5, background: dkh("#2E4A44", 0),
          border: `6px solid ${mxh("#2E4A44", 0.30)}` }}>
          {/* what has arrived — three lines, in over four seconds */}
          {Array.from({ length: Math.min(5, Math.floor(f / 28)) }, (_, i) => (
            <div key={"tl" + i} style={{ position: "absolute", left: 12, bottom: 12 + i * 15,
              width: 96 - i * 18, height: 9, borderRadius: 2, background: mxh(GOLD, 0.12) }} />
          ))}
          <div style={{ position: "absolute", left: 0, top: -30, width: "100%", textAlign: "center" }}>
            <span style={{ ...mono(16, 900), color: hexa("#CFEBDE", 0.95), letterSpacing: 1.6 }}>TEXT OUT</span>
          </div>
        </div>

        {/* ⛔ the lever swings 124px to the RIGHT of its pivot, so at x=512 it
               swept straight through the hero standing at 628 and read as a pole
               through his chest. Read the rig before placing the body next to
               it: pivot at 470 means the arc ends at 594, and the hero starts
               at 653. */}
        <HandPump x={470} y={GY - 30} s={1.15} z={52} crank={crank} />
      </div>

      {/* ⭐ the hero: his BODY changes shape. Sink, compress, spread, and past
          halfway a fast small tremble — the opposite of a slow sway.
          ⛔ AND HIS ARM CONNECTS TO THE LEVER. Round 1 left his hand and the
             pump as two separate objects, so he read as standing beside a stick
             rather than working it. The only limb geometry that survives is one
             that STARTS on the mascot's own arm and ENDS on the thing it holds. */}
      <Hero f={f} x={700} y={GY} size={332} z={62} act={1} ph={0.1}
        drive={(crank - 0.5) * 0.5} strain={strain} reach={72}
        stern={E(f, 40, 70, 0, 0.9, OUT)} costume={{ constr: 1 }} />
      {/* the forearm ENDS ON THE LEVER KNOB, whose position is the pivot plus
          124px at the lever's own angle — not a guess, the same arithmetic the
          prop uses. A limb terminating in mid-air is the banned shape. */}
      <Forearm x0={664} y0={GY - 128} x1={578} y1={GY - 230 + crank * 122}
        w={21} c="#C4674A" z={64} />
      <Contact x={700} y={GY} w={110} z={19} o={0.46} />
      {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART — the head, because the
          arms and torso are doing the acting. */}
      <Steam x={572} y={GY - 216} f={f} at={20} n={9} z={70} s={1.05} c="#DCD0F0" rate={1.9} />

      <Chip t="ENOUGH MEMORY. NO WAY OUT." y={BAND_Y} c={INK} fg="#EADFFC" s={0.84} z={96} />
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
      <Cam s={1.534} x={176} y={-66} z={1}>

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
      <Laptop x={556} y={GY - 46} s={1.346} z={52} f={f} open={setdown} rush={rush}
        fill={E(f, 14, dur - 8, 0, 1, LIN)} />

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

      <Hero f={f} x={288} y={GY} size={307} z={62} act={2} ph={0.5}
        drive={setdown * 0.3} cheer={E(f, 46, 62, 0, 0.8, OUT)}
        reach={80} costume={{ constr: 1 }} />
      <Contact x={288} y={GY} w={100} z={19} o={0.36} />
      </Cam>
      {/* the receipt: the HOUR is the estimate, the RATE under it is published */}
      {print > 0.02 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 70,
          transform: `translateY(${(1 - print) * -60}px)`, opacity: print }}>
          <Receipt x={764} y={GY - 118} s={0.94} z={70} t={R.api.hour} sub={R.api.label}
            stencil={R.api.rate} rot={-4} />
        </div>
      )}


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
  /* ⭐ the lamps strike AWAY from camera, one every 16f, so a 65-frame scene
     lands three separate events instead of holding one arrangement. */
  const lampK = (i: number) => E(f, 24 + i * 15, 36 + i * 15, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.175]} vig={0.46} glow={hexa(p.key, 0.14)}>
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
        reach={96} gaze={0.35} costume={{ constr: 1 }} />
      <Forearm x0={478} y0={GY - 206} x1={438 - bolt * 6} y1={402} w={19} c="#C4674A" z={64} />
      <Contact x={440} y={GY} w={98} z={19} o={0.4} />

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
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
        rake={0.17} rakeX={RAKE_X[v]} rakeRate={11.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={1.0} lamp={{ x: 700, y: 150, r: 250 }} />

      {/* the door leaf swinging out of frame left — we came through it */}
      <div style={{ position: "absolute", left: -30, top: 130, width: 250, height: GY - 100,
        zIndex: 76, transformOrigin: "0% 50%",
        transform: `perspective(900px) rotateY(${-open * 68}deg)`,
        background: `linear-gradient(172deg, ${mxh(SLATE, 0.1)} 0%, ${dkh(SLATE, 0.4)} 100%)` }} />

      {/* the line: a full-width belt with real load on it, always running */}
      <div style={{ position: "absolute", left: -40, top: 452, width: W + 80, height: 30, zIndex: 34,
        background: dkh(SLATE, 0.3) }} />
      {Array.from({ length: 14 }, (_, i) => {
        const x = ((i * 116 + f * 15) % (W + 240)) - 120;
        return (
          <div key={"ld" + i} style={{ position: "absolute", left: x, top: 372, width: 96,
            height: 82, zIndex: 36, borderRadius: 3,
            background: i % 3 === 0 ? mxh(GOLD, 0.12) : i % 3 === 1 ? mxh(CLAY, 0.06) : mxh(SODIUM, 0.2),
            border: `3px solid ${hexa("#000", 0.34)}` }} />
        );
      })}
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

      <Crew f={f} x={182} y={GY} i={0} size={225} z={50} at={4} loop={1} />
      <Crew f={f} x={392} y={GY - 6} i={5} size={209} z={49} at={10} loop={0} />
      <Crew f={f} x={846} y={GY} i={8} size={220} z={50} at={16} loop={1} />

      <div style={{ position: "absolute", left: 588, top: 214, zIndex: 78 }}>
        <Totaliser x={0} y={0} s={0.62} z={78} v={count} digits={7} pre="" c={GOLD} />
      </div>
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
  const seal = E(f, 20, 34, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.175]} vig={0.28} glow={hexa(p.key, 0.14)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
        rake={0.09} rakeX={RAKE_X[v]} rakeRate={6.3 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.4} lamp={{ x: 506, y: 116, r: 240 }} />

      {/* ⛔ these were raw <div>s with a bar inside. A real filing cabinet is a
             carcass, a plinth, a top lip, four drawer faces with recessed pulls
             and label holders — the difference between a records room and four
             grey boxes. One drawer stands open, which is what says SEALED when
             the guard stops the trolley at the line. */}
      {[132, 268, 404, 540].map((cx, i) => (
        <FileCabinet key={"fc" + i} x={cx} y={GY - 30} s={1.16} z={38 + i}
          open={i === 1 ? E(f, 6, 22, 0, 1, OUT) : 0} c="#7E9298"
          label={i === 0 ? "RECORDS" : undefined} />
      ))}

      {/* THE SEALED HATCH — it closes, and that is the event */}
      <div style={{ position: "absolute", left: 660, top: 320, width: 260, height: 260, zIndex: 44,
        borderRadius: 6, background: dkh("#2E3C40", 0.2), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -seal * 132, top: 0, width: 132, height: "100%",
          background: `linear-gradient(90deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.2)} 100%)`,
          transform: `translateX(${132}px)` }} />
        <div style={{ position: "absolute", right: -seal * 132, top: 0, width: 132, height: "100%",
          background: `linear-gradient(270deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.2)} 100%)`,
          transform: `translateX(${-132}px)` }} />
      </div>
      <CareCross x={548} y={252} s={0.86} z={60} />
      <CivicCrest x={676} y={250} s={0.86} z={60} />

      {/* a red line on the floor the records may not cross, and a reader arch
          at the door — a sealed room is a room with a THRESHOLD in it */}
      <div style={{ position: "absolute", left: 96, top: GY - 66, width: 830, height: 12,
        zIndex: 33, background: dkh(RED, 0.14) }} />
      <div style={{ position: "absolute", left: 610, top: 262, width: 22, height: GY - 262,
        zIndex: 41, background: dkh("#2E3C40", 0.06) }} />
      <div style={{ position: "absolute", left: 610, top: 262, width: 330, height: 22,
        zIndex: 41, background: dkh("#2E3C40", 0.06) }} />
      {/* a trolley of files that has been stopped at the line */}
      <div style={{ position: "absolute", left: 356, top: GY - 128, width: 132, height: 122,
        zIndex: 40, borderRadius: 4, background: mxh("#7E9298", 0.08),
        border: `4px solid ${dkh("#2E3C40", 0)}` }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", left: 12, top: 12 + i * 34, width: 100,
            height: 26, borderRadius: 2, background: i % 2 ? PAPER : mxh(SODIUM, 0.3) }} />
        ))}
      </div>
      {[380, 464].map((wx, i) => (
        <div key={"wh" + i} style={{ position: "absolute", left: wx, top: GY - 14, width: 26,
          height: 26, borderRadius: "50%", zIndex: 41, background: dkh("#2E3C40", 0.1) }} />
      ))}

      <Hero f={f} x={284} y={GY} size={291} z={62} act={3} ph={1.3}
        stern={0.9} costume={{ cop: 1 }} />
      <Contact x={284} y={GY} w={94} z={19} o={0.32} />

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
  const cta = E(f, dur - 40, dur - 26, 0, 1, BACK);

  return (
    <Scene p={p} slug="" push={B ? [CUT, dur, 1.15] : [0, CUT, 1.13]} vig={0.24}
      glow={hexa(p.key, 0.14)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: B ? "scale(1.34) translate(64px, -30px)" : "none",
        transformOrigin: "50% 56%" }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="none"
          rake={0.09} rakeX={RAKE_X[v]} rakeRate={5.25 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.6 + age * 0.7} lamp={null} />
        {/* traffic going past the thing left on the kerb */}
        <Runner y={352} f={f} z={24} rate={16.5} pitch={196} w={168} h={100} kind="car"
          c={mxh(SLATE, 0.28)} c2={dkh("#7C7058", 0.22)} rail={false} />
        <Runner y={252} f={f} z={22} rate={9.4} pitch={224} w={150} h={82} kind="load"
          c={mxh("#A2ADB8", 0.16)} c2={dkh("#302A20", -0.10)} o={0.8} />

        {/* the rack, outside on the kerb, visibly ageing */}
        <div style={{ position: "absolute", inset: 0, zIndex: 42,
          transform: `rotate(${age * 2.6}deg)`, transformOrigin: "50% 100%" }}>
          <CardRack x={330 + L.plate} y={GY} s={1.2} z={42} f={f} seated={7} spin={0} hh={7} />
        </div>
        <Contact x={330 + L.plate} y={GY} w={470} z={26} o={0.44} />
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

      {/* ⛔ the plate: struck through, and nothing goes back */}
      <div style={{ position: "absolute", inset: 0, zIndex: 68 }}>
        <StrikePlate x={598} y={344} s={0.92} z={68} v={R.cards.total}
          strikes={strikes} land={land} />
      </div>
      {HIT.map((a, i) => (
        <Ring key={"sk" + i} x={598} y={306} f={f} at={a} c={RED} z={70} s={0.6} dur={14} />
      ))}

      {/* the receipt in his hand does not change */}
      <Receipt x={730} y={GY - 40} s={0.62} z={72} t={R.api.hour} sub={R.api.label} rot={5} />

      <Hero f={f} x={736} y={GY} size={294} z={62} act={2} ph={0.8}
        cheer={E(f, 96, 112, 0, 0.6, OUT)} costume={{ constr: 1 }} />
      <Contact x={736} y={GY} w={98} z={19} o={0.36} />

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
