import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd,
  Scene, Chip, Contact, Mark, R, asPlace, mono, Ring, Puff, Pool, Steam, Fall, Motes,
  Hero, Forearm, Crew, rock,
  CLAY, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, BRASS, SODIUM,
  EMBER, SLATE, VIOLET,
} from "./HwWorld";
import { GpuCard, CardRack, Drip, PriceGun, Totaliser } from "./HwProps";
import { Room, CeilingHole, DeskSet, Strip2 } from "./HwSets";
import { S0 } from "./HwScenes";
import type { Variant } from "./HwScenes";

/* ===========================================================================
   REEL 122 · "HARDWARE" — THE HOOK CANDIDATES.

   ⛔⛔ docs/THE-OPEN.md STEP 1: *"The first build step of any reel is not scene
   0. It is N concepts for scene 0."* Produce several, render them at full
   quality on the real chassis with the real VO and bed, and get ONE PICKED
   before the body is defended. Skipping this cost reel 78 an entire open and
   reel 120 two rounds.

   ⭐⭐ EACH CANDIDATE IS A DIFFERENT ONE-WORD MECHANISM, not one idea in three
   colourways. That test is sharper than "if one sentence describes all of
   them", because a one-word mechanism is falsifiable in a second and it stops
   you shipping the same idea in a new costume:

     `crush`  CRUSH        — one card is already too heavy, then six more land
     `drip`   STARVE       — the tower, and one token into a cup
     `price`  PRICED       — the card stamped $16,000, six more behind it

   ⛔ AND NONE OF THEM RESOLVES. A hook that answers its own question at three
   seconds has spent the thing the body is for.

   ⛔ FRAME 0 IS THE ONLY FRAME GUARANTEED TO BE SEEN, so in all three it is
   SETTLED — every pre-seeded element is pushed back far enough to have
   FINISHED, not merely started — bright (the >=140 bar is frame 0 and nowhere
   else), and it has a Claude in it.
   ⛔ AND IN ALL THREE THE FRAME-0 GATES ARE CARRIED BY THE ROOM, not by the
   hero prop. A gate carried by the wrong object DEFORMS that object: it is what
   forced reel 110's barbell to 97% of panel width and pale, at which point it
   stopped reading as a barbell at all.
   ========================================================================= */

export type HookId = "crush" | "drip" | "price";
type SP = { v: Variant; dur: number };
const GY = 706;
const BAND_Y = 132;

/* =========================================================================
   B · `drip` — MECHANISM: STARVE.
   A black tower of seven cards, and a Claude holding a cup under its output
   spout catching ONE glowing token. The scale gap between the rack and the drop
   IS the idea, and nothing on screen explains why.

   ⚠️ THE TRADE-OFF, STATED: this is the strongest single image of the three and
   it is the one that borrows from S10, where the drip is the measured receipt
   (0.10 tok/s on a rented rig). Opening on it poses "why is this happening?",
   which the body answers — legitimate hook structure — but it does spend some
   of S10's surprise. `crush` does not borrow anything.
   ====================================================================== */
export const HookDrip: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");

  /* ⛔ THE DRIP IS PRE-SEEDED SO FRAME 0 IS MID-CYCLE-AND-SETTLED, not blank:
     the bead is already formed and already falling on frame 0. */
  const cyc = (f + 40) % 56;
  const grow = Math.min(1, cyc / 40);
  const fallK = cyc > 40 ? (cyc - 40) / 16 : 0;
  const look = E(f, 14, 30, 0, 1, OUT);
  const shrug = E(f, 34, 48, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.30} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="tray"
        rake={0.12} rakeRate={3.8} rakeN={7} floorKind="tile" grit={0.6}
        lamp={{ x: 300, y: 130, r: 250 }} />
      {/* ⭐ the lit strip is what carries frame-0 luma, so the tower stays black */}
      <Strip2 x={120} y={96} w={780} c={TEAL} z={22} o={1} />

      {/* THE TOWER — near-black, 42% of panel width, air on both sides */}
      <CardRack x={368} y={GY} s={1.30} z={44} f={f} seated={7} spin={1} hh={7} />
      <Contact x={368} y={GY} w={520} z={26} o={0.5} />

      {/* the spout out of its foot, and the one bead */}
      <div style={{ position: "absolute", left: 566, top: GY - 96, width: 90, height: 26,
        zIndex: 52, borderRadius: "0 13px 13px 0",
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
      <div style={{ position: "absolute",
        left: 646 - (7 + grow * 13), top: GY - 76 + fallK * 60 - (7 + grow * 13),
        width: (7 + grow * 13) * 2, height: (7 + grow * 13) * 2.2, borderRadius: "50%", zIndex: 60,
        background: `radial-gradient(50% 40% at 40% 30%, ${mxh(GOLD, 0.42)} 0%, ${GOLD} 60%, ${dkh(GOLD, 0.3)} 100%)` }} />

      {/* the cup he is holding under it — and it is basically empty */}
      <div style={{ position: "absolute", left: 604, top: GY - 20, width: 96, height: 84,
        zIndex: 58, borderRadius: "6px 6px 30px 30px",
        background: `linear-gradient(170deg, ${mxh("#3A424A", 0.2)} 0%, ${dkh("#20262C", 0)} 100%)`,
        border: `5px solid ${dkh("#0C1014", 0)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 9,
          background: dkh(GOLD, 0.2) }} />
      </div>
      <Ring x={646} y={GY - 14} f={f} at={16} c={GOLD} z={62} s={0.4} dur={14} />

      <Hero f={f} x={752} y={GY} size={206} z={62} act={3} ph={0.4}
        drive={-shrug * 0.16} gaze={-0.6} reach={60}
        shock={look * 0.5} costume={{ constr: 1 }} />
      <Forearm x0={706} y0={GY - 128} x1={640} y1={GY - 44} w={20} c="#C4674A" z={64} />
      <Contact x={752} y={GY} w={102} z={19} o={0.42} />

      <Chip t="ALL THAT IRON. ONE DROP." y={BAND_Y} c={INK} fg="#E4F5FA" s={0.88} z={96} />
    </Scene>
  );
};

/* =========================================================================
   C · `price` — MECHANISM: PRICED.
   One card, dead centre, DARK against a lit counter; the gun comes down and
   stamps $16,000 into it, and six more slide into frame behind it.
   ⭐ The most literal answer to the spoken question ("what would it COST"), and
   the number is mute-readable at frame 0 — which is the one measured
   hook-selection rule in the repo: the trial cuts that performed opened with a
   cream claim plate, the ones that did not had no plate of their own.
   ====================================================================== */
export const HookPrice: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");

  /* ⛔ FRAME 0 IS SETTLED, NOT MID-ROLL: the stamp has ALREADY landed at f0 (the
     gun is pre-seeded at -14) so the price is legible on the first frame. The
     f16 event pushes PAST frame 0 rather than arriving at it. */
  const drop = E(f + 14, 10, 22, 0, 1, IN_Q);
  const lift = E(f + 14, 26, 40, 0, 1, OUT);
  const recoil = rock(f + 14, 22, 8, 12);
  const MORE = [16, 28, 40, 52, 64, 76];
  const shown = MORE.filter(a => f >= a).length;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.26} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} bands={2} kind="shelf" overhead="lampbar"
        rake={0.10} rakeRate={3.6} rakeN={7} floorKind="tile" grit={0.6}
        lamp={{ x: 506, y: 120, r: 260 }} />

      <div style={{ position: "absolute", left: -30, top: GY - 140, width: W + 60, height: 42,
        zIndex: 36, background: `linear-gradient(180deg, ${mxh("#9A8460", 0.32)} 0%, ${dkh("#9A8460", 0.16)} 100%)` }} />
      <div style={{ position: "absolute", left: -30, top: GY - 100, width: W + 60, height: 100,
        zIndex: 35, background: dkh("#9A8460", 0.42) }} />

      {/* the six behind, sliding in one at a time across the FULL duration */}
      {MORE.map((a, i) => {
        const k = E(f, a, a + 10, 0, 1, OUT);
        if (k <= 0) return null;
        return (
          <div key={"mc" + i} style={{ position: "absolute", inset: 0, zIndex: 40 + i,
            transform: `translate(${(1 - k) * 320 + i * 26}px, ${-i * 17}px)`, opacity: k }}>
            <GpuCard x={520} y={GY - 150 - i * 4} s={0.56} z={40 + i} f={f} spin={0.2}
              mark vram={false} dim={0.22 + i * 0.06} />
          </div>
        );
      })}

      {/* THE ONE, dead centre, dark on a lit field */}
      <div style={{ position: "absolute", inset: 0, zIndex: 52,
        transform: `translateY(${recoil * 0.8}px)` }}>
        <GpuCard x={472} y={GY - 128} s={1.12} z={52} f={f} spin={0.3}
          stamp={R.cards.each} mark vram />
      </div>
      <PriceGun x={472} y={GY - 258} s={1.0} z={64} drop={drop - lift * 0.9} />
      <Puff x={472} y={GY - 140} f={f} at={0} c={hexa("#D8CCB0", 0.5)} z={66} s={0.7} />

      <div style={{ position: "absolute", left: 240, top: GY - 84, zIndex: 60 }}>
        <span style={{ ...mono(15, 800), color: hexa("#5A5347", 0.85), letterSpacing: 1.1 }}>
          {R.cards.src}</span>
      </div>

      <Hero f={f} x={848} y={GY} size={198} z={62} act={3} ph={1.1}
        gaze={-0.5} shock={E(f, 2, 12, 0, 0.7, OUT)} costume={{ constr: 1 }} />
      <Contact x={848} y={GY} w={100} z={19} o={0.38} />

      <Chip t="AND YOU NEED SEVEN" y={BAND_Y} c={INK} fg="#FFF4DC" s={0.9} z={96} />
    </Scene>
  );
};

/** `crush` is S0 itself — the reel's default open, so the picked hook and the
    shipped scene 0 are the same code and cannot drift apart. */
export const HookCrush = S0;

export const HOOKS: Record<HookId, React.FC<SP>> = {
  crush: HookCrush,
  drip: HookDrip,
  price: HookPrice,
};

/** ⛔ THE HEADER IS HALF OF WHAT IS BEING CHOSEN, so each candidate carries its
    own band in the preview rather than borrowing the reel's. */
export const HOOK_BANDS: Record<HookId, { big: string; hot: string }> = {
  crush: { big: "RUNNING AI LOCALLY", hot: "COSTS $112,000" },
  drip:  { big: "$112,000 OF GPUs", hot: "RUNS AT 0.1 TOK/S" },
  price: { big: "ONE CARD IS $16,000", hot: "YOU NEED SEVEN" },
};
