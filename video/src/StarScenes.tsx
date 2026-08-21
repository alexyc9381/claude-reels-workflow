import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, MarkPlate, MarkCast, Chip, Plate, BigNum, Contact, Motes,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam,
  Tile, RepoPlate, RepoIcon, PayGate, SplitFlap, Gantry, PriceTag, Box, SlotRack,
  PigeonWall, Ticket, CatBay, CardReader, JackWall, Cord, Counter, Drum,
  Meter, Checkpoint, Generator, PlugWall, Dest, Crew, Hero, Forearm, costumeFor,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, ENAM, SODIUM, VIOLET, OXIDE, rock, shake, drift, squash, idle, lerpHex,
} from "./StarWorld";
import { SetFor } from "./StarSets";

/* ===========================================================================
   REEL 115 · "STAR" — THE SCENES.  Board: storyboards/115-star.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION (ANIMATION-QUALITY §2):
   a before state legible on frame 1, a visible trigger, TRAVEL, and an arrival
   that costs something. Nothing here lands and simply stops.

   ⛔⛔ AND THE HERO ACTS (§12). *"When I mean motion I primarily mean motion
   for the MAIN animations."* Before each scene was written the question asked
   was **what does the Claude DO here** — never "what is around him". A hero
   standing in a busy room measured 8.94 and read as dead; the same set with
   the hero's own body changing shape measured 14.09.

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved plate band (panel y 112..210).
   `HookHeader` owns y 0..96 and the cast owns the ground line. The picture
   carries MARKS and NUMERALS; the header and the captions carry the language.

   ⛔ EVERY SCENE IS LOCKED. The house in-panel push is not a re-framing move.
   The reel has exactly ONE re-framing move and it is the hard punch-in at S0
   f56 — which is a CUT, not a drift.
   ========================================================================= */

export type Variant = "market" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    ⛔⛔ AND THE OFFSETS HAVE TO BE BIG ENOUGH TO BEAT A PERCEPTUAL HASH — a
    64-bit dHash barely sees a 14px dx, so trial cuts need real re-framing.
    Targets: mean Hamming >= 14 of 64, min >= 10. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  market: { dx: -18, dy: 26, s: 1.054, rot: -0.7 },
  amber:  { dx: -66, dy: -44, s: 1.148, rot: 1.6 },
  steel:  { dx: 46, dy: 20, s: 1.108, rot: -1.4 },
};

/** ⛔⛔⛔ A TRIAL CUT MAY NEVER RECOLOUR THE CLAUDE. Alex, on reel 115's amber
    cut: *"don't have the amber version of the Claude sprites — it shouldn't
    change the colour of the sprites."* He is right, and it collides with a
    delivery gate that was already standing: **"every Claude the one house
    clay."** The grade is a CSS filter on the whole panel, so a `hue-rotate` on
    the SET drags the cast with it — amber ran -21deg and shipped an off-brand
    mascot in a third of the deliverables.

    ⭐ THE RULE: **HUE IS NOT A VARIANT LEVER. `hue-rotate` and `saturate` are
    banned from GRADE** — both move the clay. Only CONTRAST and BRIGHTNESS vary,
    which change punch without moving a single hue, and `saturate` is held at
    the house 1.26 for all three cuts.

    ⛔ That costs pixel separation, so it has to be bought back somewhere the
    mascot does not live — see CAM above (bigger offsets) and the per-cut RAKE
    speed, which is the highest-ranked lever in TRIAL-CUTS.md anyway. */
export const GRADE: Record<Variant, string> = {
  market: "contrast(1.015) saturate(1.26) brightness(1.000)",
  amber:  "contrast(1.150) saturate(1.26) brightness(0.965)",
  /* ⛔ 0.945/1.045 lifted the black point to p10 36.0 and FAILED look_audit's
     BODY_BLACK (bar 35) — dropping contrast and raising brightness BOTH lift
     blacks. Now that grade is known to buy ~1 bit of dHash (docs/TRIAL-CUTS §6)
     it is set for the LOOK alone: steel is the BRIGHT, CRISP cut. p10 -> 28.1. */
  steel:  "contrast(1.030) saturate(1.26) brightness(1.075)",
};

/** ⭐ THE RAKE SPEED IS THE HIGHEST-RANKED VARIANT LEVER (TRIAL-CUTS.md) and it
    never touches the cast — a travelling band sweeps different pixels per cut
    while every sprite stays house clay. This multiplies each scene's own rate. */
export const RAKE_K: Record<Variant, number> = { market: 1.0, amber: 1.66, steel: 0.58 };
/** ⭐ A PHASE OFFSET ON THE RAKE AND ON THE PARALLAX. Speed alone still lets two
    cuts coincide on any given frame; an offset guarantees every band sits
    somewhere different in EVERY frame, which is what a dHash actually samples.
    Neither touches a sprite. Added after banning hue left market/amber at a
    dHash of 9 against a bar of 10, on a frame at 44s no HOOK can reach. */
export const RAKE_X0: Record<Variant, number> = { market: -260, amber: 260, steel: 780 };
export const PAR_X: Record<Variant, number> = { market: 0, amber: 940, steel: -620 };

type SP = { v: Variant; dur: number };

/** the running total over the rack — the number MOVES to its value across five
    discrete steps, one per plate. It is never typeset at its answer. */
const RunTotal: React.FC<{ f: number; steps: number[]; x: number; y: number }> =
  ({ f, steps, x, y }) => {
  const vals = [0, 132255, 598786, 674183, 853200, 945792];
  let i = 0;
  for (let k = 0; k < steps.length; k++) if (f >= steps[k]) i = k + 1;
  const at = i === 0 ? 0 : steps[i - 1];
  const t = E(f, at, at + 16, 0, 1, OUT);
  const cur = Math.round(vals[Math.max(0, i - 1)] + (vals[i] - vals[Math.max(0, i - 1)]) * t);
  const txt = cur.toLocaleString("en-US").padStart(7, " ");
  const pop = i > 0 ? squash(f, steps[i - 1], 0.14, 3, 12) : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 76,
      transform: `scale(${pop})`, transformOrigin: "50% 50%", display: "flex",
      alignItems: "center", gap: 10 }}>
      <span style={{ ...mono(46, 900), color: GOLD }}>★</span>
      <div style={{ display: "flex", gap: 4 }}>
        {txt.split("").map((ch, k) => (
          <div key={"rt" + k} style={{ width: ch === "," ? 14 : 38, height: 60,
            borderRadius: 4, background: ch === "," || ch === " " ? "transparent" : "#0E1116",
            border: ch === "," || ch === " " ? undefined : "3px solid #4A4034",
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <span style={{ ...mono(40, 900), color: ch === " " ? "transparent" : "#F4E3B0" }}>
              {ch === " " ? "0" : ch}</span>
            {ch !== "," && ch !== " " && <div style={{ position: "absolute", left: 0, right: 0,
              top: "50%", height: 2, background: hexa("#000000", 0.62) }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

/** the one text chip a scene is allowed, in the reserved band */
const Band: React.FC<{ f: number; at?: number; t: string; sub?: string; x?: number;
  c?: string; fg?: string }> =
  ({ f, at = 0, t, sub, x = 44, c = "#F2EDE0", fg = "#241F17" }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const dx = E(lf, 0, 10, -300, 0, OUT);
  return (
    <div style={{ position: "absolute", left: x + dx, top: 122, zIndex: 88,
      opacity: E(lf, 0, 7, 0, 1, LIN), display: "flex", alignItems: "stretch",
      borderRadius: 14, overflow: "hidden", border: "4px solid #241F17", boxShadow: SH_D }}>
      <div style={{ background: c, padding: "10px 20px", display: "flex", flexDirection: "column",
        justifyContent: "center" }}>
        <span style={{ ...mono(30, 900), color: fg, letterSpacing: "-0.01em",
          whiteSpace: "nowrap" }}>{t}</span>
        {sub && <span style={{ ...mono(17, 700), color: "#7E7768", whiteSpace: "nowrap" }}>{sub}</span>}
      </div>
    </div>
  );
};

/* =========================================================================
   S0 · THE METERED STREET — 106f · HOOK.
   VO: "If you're not using these five Claude plugins, you're missing out on
        over $10,000 worth of software,"

   ⭐ THE HOOK IS AN IMAGE, NOT A ROOM. The image is: a Claude shoving a coin
   turnstile that will not give, with the free market lit ten feet behind him
   and the price of what he cannot reach on a board over his head.

   ⛔ TWO SHOTS, ONE EVENT (§2: a cut is not an event). Shot A is the SHOVE —
   three of them, escalating, with the board racking after each. Shot B is a
   HARD PUNCH IN at f56 so `$10,000` is huge on the word (measured onset f68),
   and it carries the payoff: five crates drop on the turnstile and shear the
   arm off. Four framings in which nothing happens is four posters in a row.

   ⛔ AN ACTION IS A DISTANCE (§11). Each shove drives from 0.52 of extension
   to 1.0 in six frames and the arm gives 46px, not 6.
   ⭐ WEIGHT IS DEFORMATION: he compresses to scaleY 0.84, spreads to scaleX
   1.12, and past halfway runs a FAST SMALL TREMBLE — the opposite of a sway.
   ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART: steam from the ears, from
   the second shove on. The head is what is still while the arms act.
   ====================================================================== */
export const S0: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("street");
  const CUT = 54;
  const B = f >= CUT;

  /* ⛔⛔⛔ REBUILT. Alex: *"the immediate hook between 0-2 seconds isn't good
     enough, it's just him moving back and forth, it's not interesting nor does
     it really incorporate those logos."* Two separate defects, and the second
     one causes the first.

     1. **A SWAY IS AN IDLE** (§12). v1 was three shoves that each RETURNED TO
        WHERE THEY STARTED — net travel zero, three times. That is the exact
        shape of *"it's just repetitive back and forth motion"*, which this repo
        has been told before and written down.
     2. **THE LOGOS ARRIVED AT 1.87s**, i.e. after the first two seconds were
        already spent. The five recognisable marks were the fix for the LAST
        round's hook note and they were not on screen for the part of the hook
        that decides whether anyone stays.

     ⭐ THE REBUILD MAKES THE LOGOS THE MOVERS INSTEAD OF THE HERO. All five
     branded plates are mounted on the gate at FRAME 0, in colour. Then a heavy
     price tag DROPS onto each one in turn — five discrete arrivals across
     f10-f42 — and each plate goes grey as its tag lands. That is five large
     objects arriving AND five large areas flipping value, which is the top of
     §1's measured table, and it is the literal sentence: this is what you are
     paying, one thing at a time, and the board totals it.
     The hero's action is a RECOIL from each slam — his body compresses and he
     gives ground — so the movement has direction instead of oscillating. */
  const SLAM = [10, 18, 26, 34, 42];
  const pulse = (a2: number) => E(f, a2, a2 + 3, 0, 1, OUT) - E(f, a2 + 3, a2 + 13, 0, 1, IO);
  const hit = Math.max(...SLAM.map(pulse));
  /* he gives ground on every slam and never fully recovers — a hook that ends
     where it started has not moved */
  const lost = SLAM.filter(a2 => f >= a2 + 3).length * 0.13;

  /* shot B: the tags TEAR OFF, each plate flashes back to colour and takes a
     FREE stamp, then the gate goes */
  const TEAR = [58, 64, 70, 76, 82];
  const SHEAR = 86;
  const surge = E(f, 88, 101, 0, 1, OUT);
  const drop = (i: number) => E(f, 88 + i * 3, 100 + i * 3, 0, 1, BACK);
  /* ⛔ the freed plates SETTLE on the rail; they do not fall onto the hero, who
     is the one thing in the frame that must stay readable */

  const drive = B ? E(f, 56, 70, 0, 1, OUT) : -(hit * 0.42 + lost);
  const strain = B ? E(f, 56, 64, 0.8, 0.2, OUT) : 0.32 + hit * 0.5;
  const give = B ? 0 : lost * 0.5 + hit * 0.2;
  const gy = p.horizon + 192;

  /* ⭐⭐⭐ THE CHARACTER ARC, IN COLOUR. Alex: *"near the end he starts glowing or
     something, or he starts red then turns orange, something interesting with
     this character."*

     ⛔ A GLOW IS BANNED HOUSE-WIDE — the matte rule, and the greppable gate on
     `boxShadow: 0 0 Npx` has to return 0. So the energy is built out of things
     that are matte by construction: a colour arc on the sprite itself, a drawn
     light POOL (a practical, never an emissive blur), an expanding RING, drawn
     embers, and a two-frame scale pop.

     ⛔⛔ AND THE HOUSE-CLAY RULE STILL HOLDS, WHICH IS WHAT DECIDES THE
     DIRECTION OF THE ARC. *"Every Claude the one house clay"* is a delivery
     gate, so the reel cannot simply end on a different colour. The honest
     reading — and the better story — is that the RED IS WHAT THE PAYWALL DOES
     TO HIM and being free RESTORES him: he starts on house clay, is driven to
     a deep red one step per price tag, flashes hot when the gate goes, and
     settles back to exactly #D97757. Identity is the payoff, not the cost. */
  const press = SLAM.filter(a2 => f >= a2 + 2).length / SLAM.length;
  const TURN = SHEAR;
  const flash = (E(f, TURN, TURN + 2, 0, 1, LIN) - E(f, TURN + 2, TURN + 9, 0, 1, OUT)) * 0.62;
  const cool = E(f, TURN + 2, TURN + 16, 1, 0, OUT);   /* red -> house clay */
  const heroTint = flash > 0.02
    ? lerpHex("#D97757", "#FFE7BE", flash)
    : lerpHex("#D97757", "#A8331F", B ? press * cool : press);
  /* his face carries it too: a scowl that deepens with every tag, a flinch on
     each impact, and both gone the moment he is free */
  const scowl = B ? 0.9 * cool : press * 0.9;
  const flinch = Math.max(...SLAM.map(a2 => E(f, a2 + 1, a2 + 3, 0, 1, OUT) - E(f, a2 + 3, a2 + 12, 0, 1, IO)));
  const pop = 1 + flash * 0.26;

  /* the five plates live on the gate, inside the shot-B punch crop (206..806) */
  const PX = (i: number) => 206 + i * 150;
  const PY = 372;
  const TAG = ["$49", "$99", "$300", "$59", "$79"];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.32}>
      <Cam z={5} s={B ? 1.26 : 1.0} y={B ? -46 : 0} x={B ? 18 : 0}>
        <SetFor k="street" f={f} t={f * 1.5} rakeRate={6.1 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />

        {/* ⭐⭐ THE PRICE GANTRY — the claim plate, and the running total of the
            five tags below it. The figure is the VO's own spoken words.
            ⛔ IT IS SETTLED ON FRAME 0: the board is fed a negative `at` for
            its first state so frame 0 shows a resolved number, never a flip
            caught mid-roll. Frame 0 is the only frame guaranteed to be seen. */}
        <Gantry y={112} f={f} z={70}>
          <div style={{ position: "absolute", left: 246, top: 158, zIndex: 74,
            borderRadius: 16, background: "linear-gradient(178deg, #FBF6E8 0%, #E6DCC4 100%)",
            border: "7px solid #241F17", padding: "10px 18px 14px", boxShadow: SH_D }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
              gap: 12, padding: "0 2px 8px" }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: "#8E2F22" }} />
              <span style={{ ...mono(24, 900), color: "#241F17", letterSpacing: "0.16em" }}>
                YOU ARE PAYING</span>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: "#8E2F22" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ ...mono(54, 900), color: "#8E2F22" }}>$</span>
              <SplitFlap inline x={0} y={0} text={f < 10 ? "01,200" : f < 26 ? "04,800" : "10,000"}
                f={f} at={f < 10 ? -26 : f < 26 ? 10 : 26} s={1} z={75} cell={48} />
            </div>
          </div>
        </Gantry>

        {/* ⭐⭐ THE PAY GATE. The lit market behind it is cut into bright stripes
            by dark bars — the biggest value spread in the reel, and the reason
            frame 0 clears the luma bar without the dark stop being touched. */}
        <PayGate x0={182} x1={830} yTop={318} yBot={p.horizon + 190} f={f} z={46}
          push={give} burst={B ? SHEAR : -1} />

        {/* ⭐⭐⭐ THE FIVE BRANDS, ON THE GATE FROM FRAME 0. In colour, priced one
            at a time, freed one at a time. They are the subject of the shot —
            not decoration that arrives once the hook is over. */}
        {[0, 1, 2, 3, 4].map(i => {
          const at = SLAM[i];
          const priced = f >= at + 2;
          const freed = B && f >= TEAR[i];
          const shock = squash(f, at + 2, 0.13, 2, 12);
          const dy = B ? drop(i) * 44 : 0;
          return (
            <React.Fragment key={"bp" + i}>
              <div style={{ position: "absolute", inset: 0, zIndex: 60,
                transform: `translateY(${dy}px) scale(${shock})`,
                transformOrigin: `${(PX(i) / 1012) * 100}% ${(PY / 792) * 100}%` }}>
                <RepoIcon x={PX(i)} y={PY} i={i} s={0.68} z={60} f={f}
                  rot={-3 + i * 1.5 + (B ? drop(i) * (i % 2 ? 5 : -5) : 0)}
                  dim={priced && !freed ? 1 : 0} free={freed ? TEAR[i] : -1} />
              </div>

              {/* the tag DROPS onto the plate and hangs there; on the tear it is
                  thrown clear, spinning, and the plate comes back to life */}
              {(() => {
                const lf = f - at;
                if (lf < -9) return null;
                const fall = E(lf, -9, 0, -430, 0, IN_Q);
                const tl = f - TEAR[i];
                const off = freed ? E(tl, 0, 20, 0, 1, OUT) : 0;
                return (
                  <div style={{ position: "absolute",
                    left: PX(i) - 46 + off * (i % 2 ? 330 : -330),
                    top: PY - 84 + fall - off * 190 + (freed ? tl * tl * 0.34 : 0),
                    zIndex: 68, opacity: freed ? Math.max(0, 1 - tl / 22) : 1,
                    transform: `rotate(${(freed ? off * 260 : 0) + (lf < 0 ? -14 : -6)}deg)` }}>
                    <PriceTag x={0} y={0} t={TAG[i]} s={0.92} z={68} rot={0} />
                  </div>
                );
              })()}
              {f >= at + 2 && !freed && (
                <Puff x={PX(i)} y={PY - 34} f={f} at={at + 2} n={7} s={0.7} z={64} c="#C0A882" />
              )}
              {freed && <Ring x={PX(i)} y={PY} f={f} at={TEAR[i]} r={170} z={66} c="#9CF0C4" w={8} />}
            </React.Fragment>
          );
        })}

        {/* ⭐ THE HERO. He gives ground on every slam and never recovers it, then
            drives forward once through the broken gate — one direction each way,
            which is what a sway is not. */}
        {/* ⭐ THE POOL BLOOMS BEHIND HIM ON THE TURN — a drawn practical, matte
            by construction, so the frame reads as energy without a banned glow */}
        {B && f >= TURN && (
          <Pool x={506 - lost * 78 + surge * 96} y={gy - 40}
            w={E(f, TURN, TURN + 14, 120, 760, OUT)} c="#FFD9A8"
            o={0.30 * E(f, TURN, TURN + 6, 0, 1, OUT)} z={54} />
        )}
        <Hero f={f} x={506 - lost * 78 + surge * 96} y={gy} size={338} z={82}
          drive={drive} strain={strain} reach={104} costume={{ constr: 1 }}
          gaze={B ? 0.4 : 0} cheer={surge > 0.5 ? 1 : 0}
          tint={heroTint} shock={flinch} stern={scowl} pop={pop} act={1} ph={0.0} />
        {/* the ring and the embers coming off him — every one drawn, none of it
            an emissive blur. The embers rise on their own clocks so the tail of
            the hook keeps moving after the plates have settled. */}
        {B && f >= TURN && <Ring x={506 - lost * 78 + surge * 96} y={gy - 150} f={f}
          at={TURN} r={340} z={84} w={11} c="#FFD9A8" />}
        {B && f >= TURN && Array.from({ length: 14 }, (_, i) => {
          const lf = f - TURN - (i % 5) * 2;
          if (lf < 0) return null;
          const t = lf / 26;
          if (t > 1) return null;
          const hx = 506 - lost * 78 + surge * 96;
          const sz = 26 - (i % 3) * 6;
          return (
            <div key={"em" + i} style={{ position: "absolute",
              left: hx + Math.cos(i * 1.31) * (60 + t * 190) - sz / 2,
              top: gy - 120 - t * 260 + Math.sin(i * 2.2) * 40 - sz / 2,
              width: sz, height: sz, borderRadius: 6, zIndex: 85,
              background: i % 2 ? "#FFD9A8" : "#F2854F", opacity: (1 - t) * 0.9,
              transform: `rotate(${i * 37 + t * 180}deg)` }} />
          );
        })}
        {/* ⭐ the emitter on the stillest part of a bracing sprite: his head */}
        {!B && f >= SLAM[2] && <Steam x={506 - lost * 78} y={gy - 318} f={f} at={SLAM[2]}
          n={6} s={1.05} z={66} />}

        {B && f >= SHEAR && <>
          <Puff x={506} y={gy - 150} f={f} at={SHEAR} n={16} s={1.3} z={68} c="#C0A882" />
          <Ring x={506} y={gy - 150} f={f} at={SHEAR} r={280} z={67} w={10} />
        </>}
        {/* the arch's stall lights snapping on behind him, 1-2-3 */}
        {B && [96, 100, 104].map((at, i) => f >= at && (
          <div key={"al" + i} style={{ position: "absolute", left: 262 + i * 190, top: 264,
            width: 150, height: 96, zIndex: 13, borderRadius: 5,
            background: hexa("#FFF4DC", E(f, at, at + 4, 0, 0.72, OUT)) }} />
        ))}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S1 · UNDER THE ARCH — 138f · SETUP.
   VO: "and they all have over 500,000 combined stars on GitHub with the simple
        one-click install."

   THE EVENT: five crew each HAUL a repo plate up the ramp and SLAM it into the
   rack; the total over the rack climbs by the real amount on each slam; on the
   fifth the hero drives the INSTALL plunger and all five latch at once.
   ⛔ ARRIVALS SPAN THE FULL DURATION — f10/f34/f58/f82/f106 of 138. A rebuild
   that put every arrival in the first third measured 5.94, under the bar,
   despite being better in every other way.
   ⭐ The VO understates ("over 500,000") and the picture draws the sum of the
   five live values EXACTLY: 945,792.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arch");
  const SLAM = [8, 31, 54, 77, 100];
  const PLUNGE = 108;
  /* the cursor travels in, lands on the button, and CLICKS on "one-click" */
  const CUR_IN = 74, CLICK = 100;
  const gy = p.horizon + 176;
  const plunge = E(f, PLUNGE, PLUNGE + 7, 0, 1, OUT) - E(f, PLUNGE + 7, PLUNGE + 18, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.052]} vig={0.54}>
      <Cam z={5}>
        <SetFor k="arch" f={f} t={f * 1.1} rakeRate={4.4 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />

        {/* ⛔ BOTTOM-HEAVY IS A COMPOSITION DEFECT, NOT A PROP SHORTAGE (reel
            112). The contact sheet showed the cast in the lowest third with
            two thirds of dead brick above, so the answer is what HANGS — a
            loaded goods rack on chains over the gate, swinging on its own
            clock, with the market's stock on it. */}
        <div style={{ position: "absolute", left: 96, top: 146, width: 820, height: 130,
          zIndex: 30, transform: `rotate(${Math.sin(f / 51) * 0.5}deg)`, transformOrigin: "50% -70px" }}>
          {[0, 1].map(i => (
            <div key={"ch" + i} style={{ position: "absolute", left: 60 + i * 700, top: -104,
              width: 13, height: 104, background: "#4A3A2A" }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, borderRadius: 5,
            background: "linear-gradient(180deg, #A88866 0%, #5A4432 100%)" }} />
          {/* ⛔ THE RAIL RUNS. A static row of goods is furniture; a row that
              TRAVELS is the highest-value shape §1 measured on this project, and
              it is what buys back the motion the banned flash was faking. */}
          {Array.from({ length: 13 }, (_, i) => {
            const x = ((i * 90 + f * 3.4) % 1060) - 120;
            return (
              <div key={"hg" + i} style={{ position: "absolute", left: x, top: 24,
                width: 76, height: 74 + ((i * 5) % 3) * 26, borderRadius: 4,
                background: i % 3 === 0 ? "#D97757" : i % 3 === 1 ? "#E7B24C" : "#8A6A44",
                border: "3px solid #3A2A1C" }}>
                <div style={{ position: "absolute", left: 10, right: 10, top: 12, height: 12,
                  background: hexa("#2A1B10", 0.32) }} />
                <div style={{ position: "absolute", left: 22, top: -18, width: 8, height: 20,
                  background: "#4A3A2A" }} />
                <div style={{ position: "absolute", left: 46, top: -18, width: 8, height: 20,
                  background: "#4A3A2A" }} />
              </div>
            );
          })}
        </div>

        {/* ⭐ THE HERO ARTIFACT — empty and legible before anything lands.
            It RECOILS on every slam: a damped rock, so a plate landing has a
            consequence the whole 800px object carries. */}
        {(() => {
          const rk = Math.max(...SLAM.map(a2 => rock(f, a2, 5.5, 17)));
          return (
            <div style={{ position: "absolute", inset: 0, zIndex: 54,
              transform: `translateY(${rk * 1.6}px) rotate(${rk * 0.16}deg)`,
              transformOrigin: "50% 100%" }}>
              <SlotRack x={506} y={gy - 84} w={800} f={f} z={54} fill={SLAM} s={1.08} />
            </div>
          );
        })()}
        <RunTotal f={f} steps={SLAM} x={54} y={214} />

        {/* the five crew hauling their plates up the ramp */}
        {SLAM.map((at, i) => {
          const lf = f - at;
          const walk = E(lf, -22, -2, 0, 1, IO);
          const x = 120 + i * 26 + walk * (300 + i * 46);
          const lift = lf > -8 && lf < 6 ? E(lf, -8, 2, 0, 1, OUT) : lf >= 6 ? 1 : 0;
          return (
            <React.Fragment key={"cw" + i}>
              {lf > -24 && lf < 26 && (
                <Crew f={f} x={x} y={gy} i={i} size={138} z={50} at={at - 24} loop={1} />
              )}
              {/* the plate he is carrying, which ends up in the rack */}
              {lf > -20 && lf < 4 && (
                <div style={{ position: "absolute", left: x - 82, top: gy - 268 - lift * 96,
                  width: 164, height: 126, zIndex: 58, borderRadius: 12, background: "#F7F2E4",
                  border: "6px solid #241F17", display: "flex", alignItems: "center",
                  justifyContent: "center", transform: `rotate(${-8 + lift * 8}deg)` }}>
                  <Img src={staticFile("logos/github.svg")}
                    style={{ width: 84, height: 84, objectFit: "contain" }} />
                </div>
              )}
              {/* ⭐⭐⭐ THE REWARD BEAT. Alex: *"each time the github icon clicks
                  into the slot it should have some sort of interesting dopamine
                  inducing effect and small sfx."* Four things fire together on
                  every seat, and the point of the shape is that it RESOLVES
                  somewhere — a burst that goes nowhere is a firework, a burst
                  that DELIVERS is a reward:
                    1 the slot's own bed pulses gold (contained to the slot —
                      2.7% of the panel, never a screen flash)
                    2 ten small stars burst out of it
                    3 a "+★132,255" chip pops off and ARCS INTO the running
                      total, which then ticks up by exactly that amount
                    4 an ascending pickup chime, one step per slot (see the bank)
                  ⛔ NOT a white plate. `feedback_no_flashing_transitions` is
                  standing and it applies here too. */}
              {f >= at && f < at + 6 && (
                <div style={{ position: "absolute", left: 92 + i * 167, top: 464,
                  width: 150, height: 146, borderRadius: 8, zIndex: 62,
                  background: "#F4E3B0", opacity: (1 - (f - at) / 6) * 0.5 }} />
              )}
              {f >= at && Array.from({ length: 10 }, (_, k) => {
                const lf2 = f - at;
                if (lf2 > 20) return null;
                const a2 = (k / 10) * Math.PI * 2 + i;
                const t2 = E(lf2, 0, 20, 0, 1, OUT);
                const sz = 22 - (k % 3) * 5;
                return (
                  <div key={"sp" + k} style={{ position: "absolute",
                    left: 166 + i * 167 + Math.cos(a2) * t2 * 190 - sz / 2,
                    top: 534 + Math.sin(a2) * t2 * 120 - sz / 2 + t2 * t2 * 40,
                    width: sz, height: sz, zIndex: 64, opacity: 1 - t2,
                    background: k % 2 ? "#F4E3B0" : "#D9A22E",
                    clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                    transform: `rotate(${k * 36 + t2 * 200}deg)` }} />
                );
              })}
              {/* the chip that carries the count into the total */}
              {(() => {
                const lf2 = f - at;
                if (lf2 < 0 || lf2 > 16) return null;
                const t2 = E(lf2, 0, 16, 0, 1, IO);
                const sx = 166 + i * 167, sy = 534;
                const cxp = sx + (224 - sx) * t2;
                const cyp = sy + (250 - sy) * t2 - Math.sin(t2 * Math.PI) * 130;
                return (
                  <div style={{ position: "absolute", left: cxp - 74, top: cyp - 22,
                    zIndex: 86, opacity: lf2 > 12 ? 1 - (lf2 - 12) / 4 : 1,
                    transform: `scale(${1.25 - t2 * 0.5})`,
                    padding: "5px 12px", borderRadius: 9, background: "#241F17",
                    border: "3px solid #D9A22E", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ ...mono(19, 900), color: "#F4E3B0" }}>+★</span>
                    <span style={{ ...mono(19, 900), color: "#FFFFFF", whiteSpace: "nowrap" }}>
                      {R.repos[i].starsText}</span>
                  </div>
                );
              })()}
              {f >= at && <Ring x={166 + i * 167} y={534} f={f} at={at} r={150} z={60} c="#F4E3B0" w={7} />}
            </React.Fragment>
          );
        })}

        {/* ⛔ NO FLASH HERE. A rack flash used to fire on every slam and it
            broke `feedback_no_flashing_transitions` outright. The slam now
            reads through the PLATE ITSELF — a hard drop, a squash, a ring and
            a dust puff — which is §2's "an arrival that costs something" and
            costs the viewer's eyes nothing. */}
        {/* ⭐⭐ THE ONE-CLICK INSTALL, IN THE MIDDLE OF THE FRAME. A big pointer
            travels in and CLICKS a big button — the literal thing the line
            names, drawn where the eye already is rather than as a lever off to
            one side. The button depresses, rings, and every slot latches. */}
        {(() => {
          const press = E(f, CLICK, CLICK + 4, 0, 1, OUT) - E(f, CLICK + 4, CLICK + 14, 0, 1, IO);
          const t = E(f, CUR_IN, CLICK, 0, 1, IO);
          const cx = 940 - t * 380, cy = 690 - t * 300;
          const down = press * 12;
          return (<>
            <div style={{ position: "absolute", left: 346, top: 284 + down, width: 320, height: 92,
              zIndex: 76, borderRadius: 16,
              background: press > 0.1
                ? "linear-gradient(178deg, #2E7A57 0%, #12402C 100%)"
                : "linear-gradient(178deg, #4FBF8B 0%, #1E6B4A 100%)",
              border: "7px solid #12402E", boxShadow: SH_D,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ ...mono(38, 900), color: "#F2FBF5", letterSpacing: "0.10em" }}>
                INSTALL</span>
            </div>
            {/* the button's own shadow plinth, so it reads as a THING to press */}
            <div style={{ position: "absolute", left: 346, top: 366, width: 320, height: 20,
              zIndex: 75, borderRadius: 10, background: "#0C3020" }} />
            {f >= CLICK && <Ring x={506} y={330} f={f} at={CLICK} r={280} z={78} c="#9CF0C4" w={9} />}
            {/* the pointer: a real arrow — outlined, with a tail, not a triangle */}
            {f >= CUR_IN - 2 && (
              <div style={{ position: "absolute", left: cx, top: cy, width: 96, height: 132,
                zIndex: 92, transform: `scale(${1 - press * 0.14})`, transformOrigin: "18% 12%" }}>
                <svg viewBox="0 0 96 132" width="96" height="132">
                  <path d="M10 6 L10 104 L34 82 L50 120 L72 110 L56 74 L86 70 Z"
                    fill="#FFFFFF" stroke="#1A1813" strokeWidth="9" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </>);
        })()}

        {/* the INSTALL plunger the hero drives on the fifth */}
        <div style={{ position: "absolute", left: 856, top: gy - 244, width: 130, height: 132,
          zIndex: 52 }}>
          <div style={{ position: "absolute", left: 18, top: 40 + plunge * 34, width: 94,
            height: 56, borderRadius: 12, background: `linear-gradient(178deg, #4FBF8B 0%, #1E6B4A 100%)`,
            border: "5px solid #12402E" }} />
          <div style={{ position: "absolute", left: 8, top: 92, width: 114, height: 40,
            borderRadius: 6, background: "#2E3640", border: "4px solid #171C22" }} />
          <div style={{ position: "absolute", left: 46, top: 84 + plunge * 34, width: 38,
            height: 28, background: "#1E6B4A" }} />
        </div>
        <Hero f={f} x={806} y={gy + 40} size={236} z={62} drive={plunge} reach={26}
          strain={plunge * 0.6} costume={{ suit: 1 }} act={1} ph={1.1} flip />
        {f >= PLUNGE + 7 && <Ring x={901} y={gy - 182} f={f} at={PLUNGE + 7} r={200} z={68} c="#9CF0C4" />}

        {/* the market's own background process: crowd on the four action loops */}
        {[0, 1, 2].map(i => (
          <Crew key={"bg" + i} f={f} x={92 + i * 116} y={gy + 46} i={i + 6} size={132} z={30}
            at={0} tint="#8E7A62" />
        ))}
        <Mark x={858} y={214} s={66} z={80} />
        <Band f={f} at={PLUNGE} t="ONE-CLICK INSTALL" sub="5 REPOS · MIT & OPEN" x={340} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S2 · STALL 1, THE PIGEONHOLE WALL — 111f.
   VO: "Number one, Free for Dev. You get instant access to hundreds of free
        alternatives"

   ⛔ CAUGHT ON THE BOARD (§3): the first draft was "a wall with five repo cards
   on it" — a container carrying ONE bit for three seconds. The line's verb is
   *access*, so the wall EJECTS: one lever pull and 84 free passes fire out of
   their holes in a left-to-right wave. Many large bright objects arriving
   continuously is the only shape that measures above bar, and here it is also
   the literal noun.
   ⭐ The VO says "hundreds" and the README has 1,346 entries in 56 sections —
   understated, so the plate draws the real figures.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("holes");
  const PULL = 24, EJECT = 33;
  const pull = E(f, PULL, PULL + 7, 0, 1, OUT);
  const gy = p.horizon + 170;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.068]} vig={0.56}>
      <Cam z={5}>
        <SetFor k="holes" f={f} t={f * 0.9} rakeRate={5.0 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />

        <PigeonWall x={132} y={158} w={760} h={332} f={f} z={30} eject={EJECT} c="#2A5548" />

        {/* the tickets — 84 of them, 56x42, spread over the FULL duration */}
        {Array.from({ length: 84 }, (_, i) => {
          const col = i % 14, row = (i / 14) | 0;
          return (
            <Ticket key={"tk" + i} x={132 + col * 54 + 27} y={158 + row * 55 + 27}
              f={f} at={EJECT + col * 3 + row * 2} s={1} z={58} seed={i}
              dir={col < 7 ? -1 : 1} />
          );
        })}

        {/* the full-height lever the hero pulls: 0.5 -> 1.0 of its travel */}
        <div style={{ position: "absolute", left: 918, top: 226, width: 56, height: 300, zIndex: 52 }}>
          <div style={{ position: "absolute", left: 12, top: 0, width: 32, height: 300,
            borderRadius: 6, background: "linear-gradient(90deg, #55606A 0%, #262C33 100%)",
            border: "4px solid #1A1F25" }} />
          <div style={{ position: "absolute", left: -6, top: 24 + pull * 176, width: 70,
            height: 40, borderRadius: 8, background: "linear-gradient(178deg, #C44A3A 0%, #6E2018 100%)",
            border: "5px solid #3E100C" }} />
          <div style={{ position: "absolute", left: 8, top: 60 + pull * 176, width: 40,
            height: 18, borderRadius: 4, background: "#3E464E" }} />
        </div>
        <Hero f={f} x={820} y={gy + 24} size={268} z={62} drive={pull * 0.7}
          strain={E(f, PULL - 6, PULL + 7, 0.2, 0.8, OUT) * (f > PULL + 20 ? 0.3 : 1)}
          reach={40} costume={{ chef: 1 }} act={3} ph={2.2} flip />
        <Forearm x0={820 + 74} y0={gy - 190} x1={936} y1={266 + pull * 176} w={24} z={63} />

        {/* two crew catching them in a basket — the market's background process */}
        <Crew f={f} x={252} y={gy + 30} i={4} size={126} z={50} at={30} loop={2} />
        <Crew f={f} x={404} y={gy + 44} i={7} size={118} z={49} at={44} loop={1} />
        <div style={{ position: "absolute", left: 226, top: gy - 26, width: 240, height: 96,
          zIndex: 62, borderRadius: "6px 6px 30px 30px",
          background: "linear-gradient(178deg, #7A5C34 0%, #3A2A18 100%)", border: "5px solid #241A0E" }}>
          {[0, 1, 2, 3].map(i => (
            <div key={"wv" + i} style={{ position: "absolute", left: 8 + i * 58, top: 8,
              width: 44, height: 80, borderRadius: 4, background: hexa("#B08A50", 0.5) }} />
          ))}
        </div>

        <RepoPlate f={f} at={6} i={0} y={120} />
        <Band f={f} at={EJECT + 26} t="1,346 FREE TIERS" sub="56 SECTIONS · ★132,255"
          x={560} c="#F2EDE0" />
        <Mark x={906} y={132} s={62} z={80} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · THE CATEGORY BAYS — 110f.
   VO: "to all the paid softwares across design, generative AI, marketing, and
        more."

   THE EVENT, cut to the MEASURED word onsets: the hero swings and RIPS the
   price tag off each bay, and a cream FREE plate drops into its place. Three
   named categories, three swings, then a fourth bay slides in with the rest.
   ⛔ Real marks on white tiles, from public/logos. A wrong mark is worse than
   no mark, so every file named here exists.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("holes");
  /* measured onsets inside this scene: "design" f6 · "generative" f34 ·
     "marketing" f62 (from words_115star.json, converted to scene-local) */
  const A = [40, 60, 77];
  const MORE = 91;
  const gy = p.horizon + 174;
  const swing = (a: number) => E(f, a - 7, a, 0, 1, IN_Q) - E(f, a, a + 12, 0, 1, OUT);
  const dr = Math.max(swing(A[0]), swing(A[1]), swing(A[2]));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.56}>
      <Cam z={5}>
        <SetFor k="holes" f={f} t={f * 0.9 + 400} rakeRate={8.0 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        {/* ⛔ THE OPENING 40 FRAMES WERE DEAD. Alex: *"at 11 seconds the
            animation is static and does nothing."* He is right and the cause is
            structural: re-cutting the three swaps onto their spoken words
            (f40/f60/f77) left everything before f40 with nothing to do. The
            SET now arrives instead of being pre-placed — three bays rising on
            their own stagger with a price tag swinging down onto each. */}
        {/* the three named bays, filling one per spoken category */}
        <CatBay x={34} y={188 + E(f, 2, 16, 470, 0, BACK)} w={306} h={316} f={f} at={A[0]} label="DESIGN"
          marks={["figma.svg", "canva.svg"]} more={["framer.svg", "uizard.svg", "v0.svg", "photoroom.png"]}
          price="$49/mo" c="#2A5548" z={40} />
        <CatBay x={352} y={188 + E(f, 12, 26, 470, 0, BACK)} w={306} h={316} f={f} at={A[1]} label="GENERATIVE AI"
          marks={["huggingface.svg", "replicate.svg"]} more={["groq.svg", "openrouter.svg", "mistralai.svg", "deepseek.svg"]}
          price="$99/mo" c="#27503F" z={40} />
        <CatBay x={670} y={188 + E(f, 22, 36, 470, 0, BACK)} w={306} h={316} f={f} at={A[2]} label="MARKETING"
          marks={["hubspot.svg", "buffer.svg"]} more={["n8n.svg", "make.svg", "zapier.svg", "airtable.svg"]}
          price="$79/mo" c="#2A5548" z={40} />

        {/* the fourth bay slides in carrying the rest — the "and more" */}
        {f >= MORE && (
          <div style={{ position: "absolute", left: 336 + E(f, MORE, MORE + 12, 700, 0, BACK),
            top: 512, width: 340, height: 92, zIndex: 88, borderRadius: 12,
            background: "#F2EDE0", border: "6px solid #241F17", display: "flex",
            alignItems: "center", justifyContent: "center", gap: 16 }}>
            <span style={{ ...mono(52, 900), color: "#1E5C42" }}>+53</span>
            <span style={{ ...mono(23, 900), color: "#7E7768", letterSpacing: "0.08em" }}>
              MORE SECTIONS</span>
          </div>
        )}

        {/* the hero, swinging. His arm ends on the tag, never in mid-air. */}
        <Hero f={f} x={506} y={gy + 30} size={252} z={84} drive={dr} strain={dr * 0.5}
          reach={86} costume={{ girl: 1 }} act={0} ph={0.7} />
        <Crew f={f} x={150} y={gy + 40} i={9} size={148} z={82} at={0} loop={3} />
        <Crew f={f} x={874} y={gy + 46} i={11} size={142} z={82} at={0} loop={0} />
        {A.map((a, i) => f >= a && (
          <Ring key={"cr" + i} x={187 + i * 318} y={310} f={f} at={a} r={210} z={64} c="#BFF0D4" w={9} />
        ))}
        <Band f={f} at={MORE} t="DESIGN · GEN AI · MARKETING" sub="ALL FREE TIERS"
          x={132} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S4 · THE TILL — 79f.
   VO: "No trials or credit cards required."

   ⛔ THE VILLAIN'S SECOND BODY, AND IT LOSES. ⭐ WEIGHT IS DEFORMATION: the
   POST BENDS BEFORE THE READER TEARS FREE, and the reader flies out of frame
   trailing its cable. A thing that simply disappears reads as a state change.
   ⭐ The biggest lightness step in the reel lands here, on the beat that
   should feel like relief: green enamel -> cold white tube.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("till");
  const RIP = 22, DRAWER = 36;
  const rip = E(f, RIP - 12, RIP, 0, 1, IO);
  const draw = E(f, DRAWER, DRAWER + 9, 0, 1, BACK);
  const gy = p.horizon + 168;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.082]} vig={0.46}>
      <Cam z={5}>
        <SetFor k="till" f={f} t={f * 0.8} rakeRate={3.4 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        {/* ⭐ THE IMPULSE RACK. A till has product ON it, and this reel's palest
            scene (sat 18.3% against a 34% bar) needed COLOUR IN THE SUBJECT —
            not a lifted palette, which is the one move §8 exists to ban. Twelve
            boxed products in clay, gold and green, each with a price sticker
            that goes dead the moment the reader is torn off. */}
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 6, row = (i / 6) | 0;
          const cc = ["#D97757", "#E7B24C", "#3F9E74", "#C44A3A", "#7A6494", "#D97757"][col];
          return (
            <div key={"ir" + i} style={{ position: "absolute", left: 118 + col * 134,
              top: 174 + row * 132, width: 104, height: 108, zIndex: 22, borderRadius: 6,
              background: `linear-gradient(172deg, ${mxh(cc, 0.24)} 0%, ${cc} 48%, ${dkh(cc, 0.34)} 100%)`,
              border: `4px solid ${dkh(cc, 0.50)}` }}>
              <div style={{ position: "absolute", left: 10, top: 12, right: 10, height: 22,
                borderRadius: 3, background: hexa("#FFFFFF", 0.72) }} />
              <div style={{ position: "absolute", left: 10, bottom: 10, width: 44, height: 20,
                borderRadius: 3, background: f >= RIP ? "#6E6A61" : "#F4EFE1" }} />
            </div>
          );
        })}

        {/* the counter and the till, cropped by the bottom edge */}
        <div style={{ position: "absolute", left: -20, right: -20, top: p.horizon + 76,
          height: 240, zIndex: 40, background: "linear-gradient(180deg, #C9CFD6 0%, #6E7883 100%)",
          borderTop: "10px solid #EAF0F6" }} />
        <div style={{ position: "absolute", left: 300 + draw * 118, top: p.horizon + 118,
          width: 400, height: 128, zIndex: 44, borderRadius: 6,
          background: "linear-gradient(178deg, #55606A 0%, #262C33 100%)", border: "6px solid #1A1F25" }}>
          {/* the empty coin wells — an empty container must READ */}
          {[0, 1, 2, 3, 4].map(i => (
            <div key={"cw" + i} style={{ position: "absolute", left: 16 + i * 74, top: 18,
              width: 62, height: 88, borderRadius: 4, background: "#E8EDF2",
              border: "3px solid #9BA5AF" }} />
          ))}
          <div style={{ position: "absolute", left: 168, top: -26, width: 66, height: 22,
            borderRadius: 4, background: "#7E8892" }} />
        </div>

        {/* the villain's second body */}
        <CardReader x={742} y={p.horizon + 96} f={f} rip={RIP} s={1.15} z={52} />

        {/* the stack of trial slips, swept off in the same swing */}
        {Array.from({ length: 7 }, (_, i) => {
          const lf = f - RIP;
          const off = lf > 0 ? E(lf, 0, 20, 0, 1, OUT) : 0;
          return (
            <div key={"ts" + i} style={{ position: "absolute",
              left: 168 + i * 9 + off * (240 + i * 40),
              top: p.horizon + 40 - i * 7 - off * (120 + i * 22) + (lf > 0 ? lf * lf * 0.22 : 0),
              width: 132, height: 92, zIndex: 46, borderRadius: 4, background: "#F4EFE1",
              border: "3px solid #B9A87E",
              transform: `rotate(${-4 + i * 2 + off * (i * 34 - 90)}deg)` }}>
              <div style={{ position: "absolute", left: 12, top: 16, width: 74, height: 7,
                background: "#C44A3A" }} />
              <div style={{ position: "absolute", left: 12, top: 34, width: 96, height: 5,
                background: "#C6BCA2" }} />
              <div style={{ position: "absolute", left: 12, top: 48, width: 62, height: 5,
                background: "#C6BCA2" }} />
            </div>
          );
        })}

        {/* ⭐ THE NOUNS THE LINE ACTUALLY USES. Five real credit cards — chip,
            magstripe, embossed number band — are spat out of the till one at a
            time across the FULL 76 frames, and each one is struck through and
            thrown out. Two TRIAL slips go with them, stamped and voided. The
            reader being torn off says "no terminal"; this says "no card". */}
        {Array.from({ length: 5 }, (_, i) => {
          const at = 6 + i * 12;
          if (f < at) return null;
          const lf = f - at;
          const out = E(lf, 0, 22, 0, 1, OUT);
          const cc = ["#4E6E92", "#C4402E", "#2F8A63", "#7A6494", "#D9A22E"][i];
          const struck = lf >= 12;
          return (
            <div key={"cc" + i} style={{ position: "absolute",
              left: 232 + i * 22 + out * (300 + i * 66),
              top: p.horizon - 6 - out * (150 + i * 26) + (lf > 0 ? lf * lf * 0.30 : 0),
              width: 190, height: 122, zIndex: 64, borderRadius: 10,
              transform: `rotate(${-6 + i * 4 + out * (i * 30 - 70)}deg) scale(${squash(lf, 0, 0.24, 3, 11)})`,
              background: `linear-gradient(160deg, ${mxh(cc, 0.30)} 0%, ${cc} 52%, ${dkh(cc, 0.34)} 100%)`,
              border: "5px solid #1E2430" }}>
              {/* the magstripe, the chip and the embossed number band */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 14, height: 22,
                background: "#1E2430" }} />
              <div style={{ position: "absolute", left: 16, top: 50, width: 40, height: 30,
                borderRadius: 5, background: "#E7C86A", border: "3px solid #A88A34" }}>
                <div style={{ position: "absolute", left: 6, top: 12, right: 6, height: 3,
                  background: "#A88A34" }} />
              </div>
              {[0, 1, 2, 3].map(k => (
                <div key={"nb" + k} style={{ position: "absolute", left: 68 + k * 30, top: 60,
                  width: 22, height: 10, borderRadius: 2, background: hexa("#FFFFFF", 0.62) }} />
              ))}
              <div style={{ position: "absolute", left: 16, bottom: 12, width: 92, height: 9,
                borderRadius: 2, background: hexa("#FFFFFF", 0.40) }} />
              {/* struck through — the card is not accepted, it is not NEEDED */}
              {struck && (
                <div style={{ position: "absolute", left: -10, top: "46%", right: -10, height: 12,
                  borderRadius: 6, background: "#F7EFE0", transform: "rotate(-16deg)" }} />
              )}
            </div>
          );
        })}
        <Hero f={f} x={470} y={gy + 26} size={286} z={62} drive={rip} strain={rip * 0.85}
          reach={104} costume={{ cop: 1 }} act={1} ph={3.1} />
        <Forearm x0={470 + 92 + rip * 104} y0={gy - 208} x1={716 + rip * 40} y1={p.horizon + 46}
          w={26} z={63} />
        {f >= RIP && <Puff x={742} y={p.horizon + 40} f={f} at={RIP} n={11} s={1} z={60} c="#C9CFD6" />}
        {f >= DRAWER && <Ring x={506} y={p.horizon + 150} f={f} at={DRAWER} r={230} z={62} c="#FFFFFF" />}

        {/* the one numeral: the number MOVES to zero, it is not typeset at it */}
        <Counter x={392} y={132} f={f} at={DRAWER} to="0" s={1.3} z={86} label="CARDS REQUIRED"
          dur={10} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S5 · STALL 2, THE PATCH BAY — 167f.
   VO: "Two, Public APIs. It has over 1,400 plus free APIs across 50
        categories,"

   THE EVENT: the hero throws a knife switch and the loom lets go — cords fly
   out and snap into their jacks in waves across the FULL 167 frames, row after
   row lighting as it completes, the counter racking to 1,706.
   ⭐⭐ EVERY CORD USES OVERLAPPING ACTION (§13). The loom leads, the cord
   follows on ONE ease, the plug end lags in proportion to the cord's own
   velocity and then rings out as a damped pendulum. Measured on reel 114: a
   stepped move of the same span has +139px peak jerk and 23% LESS total path.
   "Way too choppy" is what the stepped version got back.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("patch");
  const THROW = 16, LIVE = 24;
  const th = E(f, THROW, THROW + 7, 0, 1, OUT);
  const gy = p.horizon + 172;
  /* 22 cords, spread across the full duration, each large enough to survive
     the audit's 1012->240 downsample (the plug body is 50x32) */
  /* ⛔ TWELVE CORDS, NOT TWENTY-TWO. Twenty-two at 9px measured 3.56 — the
     weakest scene in the reel — because 9px is 2.1px after the audit's
     1012->240 downsample and reads as nothing to a human either. Twelve at
     28px with a 96x58 plug, spread across the FULL 167 frames, is the same
     mechanism at a size the frame can see. */
  const CORDS = Array.from({ length: 12 }, (_, i) => ({
    at: LIVE + i * 11,
    x0: 70 + ((i * 173) % 880), y0: 92,
    x1: 128 + (i % 6) * 152, y1: 236 + ((i / 6) | 0) * 168 + (i % 3) * 26,
    c: i % 3 === 0 ? "#E7B24C" : i % 3 === 1 ? "#F0C46E" : "#D97757",
  }));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.056]} vig={0.56}>
      <Cam z={5}>
        <SetFor k="patch" f={f} t={f * 1.0} rakeRate={8.4 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        <JackWall x={70} y={196} w={872} h={352} f={f} z={28} c="#604724" live={LIVE} rows={7} spread={19} />
        {CORDS.map((c, i) => (
          <Cord key={"cd" + i} f={f} at={c.at} x0={c.x0} y0={c.y0} x1={c.x1} y1={c.y1}
            c={c.c} z={44 + (i % 3)} w={40} dur={20} />
        ))}
        {CORDS.map((c, i) => (
          <Ring key={"cr" + i} x={c.x1} y={c.y1} f={f} at={c.at + 20} r={200} z={52} c="#FFCE7A" w={9} />
        ))}

        {/* the knife switch */}
        <div style={{ position: "absolute", left: 862, top: 250, width: 106, height: 180, zIndex: 52 }}>
          <div style={{ position: "absolute", left: 0, top: 96, width: 106, height: 84,
            borderRadius: 8, background: "linear-gradient(178deg, #3E464E 0%, #191E24 100%)",
            border: "5px solid #10141A" }} />
          <div style={{ position: "absolute", left: 20, top: 96 - th * 6, width: 66, height: 22,
            borderRadius: 4, transformOrigin: "50% 100%", transform: `rotate(${-58 + th * 58}deg)`,
            background: "linear-gradient(180deg, #E7B24C 0%, #8E6A24 100%)", border: "4px solid #4E3A12" }} />
          <div style={{ position: "absolute", left: 42, top: 148, width: 22, height: 22,
            borderRadius: "50%", background: th > 0.9 ? "#9CF0C4" : "#4E3A12" }} />
        </div>
        <Pool x={724} y={gy + 40} w={520} c="#FFCE7A" o={0.34} z={19} />
        <Hero f={f} x={724} y={gy + 26} size={286} z={62} drive={th} strain={th * 0.7} reach={44}
          costume={{ glasses: 1 }} act={3} ph={1.6} flip />
        <Forearm x0={724 + 84} y0={gy - 210} x1={886} y1={292 - th * 24} w={25} z={63} />

        {/* the market's background process behind the bay */}
        {[0, 1, 2, 3].map(i => (
          <Crew key={"bx" + i} f={f} x={126 + i * 178} y={gy + 56} i={i + 2} size={104} z={30}
            at={i * 9} tint="#9A7A44" />
        ))}

        <RepoPlate f={f} at={4} i={1} y={120} />
        <Counter x={116} y={568} f={f} at={LIVE} to="1,706" s={1.16} z={72} label="FREE APIS" dur={110} />
        <Counter x={452} y={568} f={f} at={LIVE + 40} to="51" s={1.16} z={72} label="CATEGORIES" dur={80} />
        <Mark x={906} y={132} s={62} z={80} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S6 · THE CATEGORY DRUMS — 109f.
   VO: "like programming, video, finance, data validation, and so much more."

   THE EVENT: the hero walks the line and KICKS each drum into spin — four
   discrete hits on the four measured word onsets, each drum spinning up with
   a CREAM face on the flip. ⛔ §12: dark-flipping-to-dark has ~0 luma delta,
   which is why the slats are bone and not oxide.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("patch");
  const K = [9, 34, 50, 61];
  const MORE = 100;
  const gy = p.horizon + 168;
  const kick = (a: number) => E(f, a - 5, a, 0, 1, IN_Q) - E(f, a, a + 10, 0, 1, OUT);
  const dr = Math.max(kick(K[0]), kick(K[1]), kick(K[2]), kick(K[3]));
  let hx = 120;
  for (let i = 0; i < 4; i++) if (f >= K[i] - 14) hx = 76 + i * 176;
  const hxs = E(f, 0, 1, hx, hx, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.56}>
      <Cam z={5}>
        <SetFor k="patch" f={f} t={f * 1.0 + 260} rakeRate={6.0 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        {/* the hopper the drums pour into — the OUTPUT half of the mechanism */}
        <div style={{ position: "absolute", left: 96, right: 96, top: p.horizon + 26, height: 132,
          zIndex: 34, borderRadius: "0 0 22px 22px",
          background: "linear-gradient(180deg, #4E3A18 0%, #241A0A 100%)", border: "6px solid #171004" }}>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={"hp" + i} style={{ position: "absolute", left: 12 + i * 50,
              top: 12 + ((i * 37) % 40), width: 40, height: 26, borderRadius: 3,
              background: i % 3 ? "#C9A15A" : "#F2EDE0", opacity: 0.9,
              transform: `translateY(${((f * 2.4 + i * 23) % 96) - 12}px) rotate(${i * 21}deg)` }} />
          ))}
        </div>
        {["PROGRAMMING", "VIDEO", "FINANCE", "DATA CHECKS"].map((lab, i) => (
          <Drum key={"dm" + i} x={156 + i * 176} y={p.horizon + 34} s={0.78} f={f} at={K[i]}
            z={48} c={i % 2 ? "#7A5C2E" : "#6A4E22"} label={lab} rate={7 + i * 1.4} />
        ))}
        {/* ⭐ THE CATEGORY PLATES. Each drops onto its drum on the frame its own
            word is spoken, in its own colour, carrying a real mark: a category
            you can NAME beats a category you can only read. The plate lands
            with a squash and a ring, because nothing here arrives and stops. */}
        {[["github.svg", "#C4402E"], ["youtube.svg", "#D8452F"],
          ["coinbase.svg", "#D9A22E"], ["postgresql.svg", "#3E7FA8"]].map(([mk, cc], i) => {
          const at = K[i];
          if (f < at - 8) return null;
          const lf = f - at;
          const drop = E(lf, -8, 2, -230, 0, BACK);
          const sq = lf >= 0 ? squash(lf, 2, 0.26, 3, 13) : 1;
          return (
            <React.Fragment key={"cp" + i}>
              <div style={{ position: "absolute", left: 156 + i * 176 - 62, top: 224 + drop,
                width: 124, height: 124, zIndex: 72, borderRadius: 18,
                transform: `scale(${sq})`, transformOrigin: "50% 100%",
                background: `linear-gradient(172deg, ${mxh(cc as string, 0.24)} 0%, ${cc as string} 52%, ${dkh(cc as string, 0.36)} 100%)`,
                border: "7px solid #241F17", boxShadow: SH_D,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 86, height: 86, borderRadius: 12, background: "#FFFFFF",
                  border: "4px solid #E4DECE", display: "flex", alignItems: "center",
                  justifyContent: "center" }}>
                  <Img src={staticFile("logos/" + mk)}
                    style={{ width: 58, height: 58, objectFit: "contain" }} />
                </div>
              </div>
              {lf >= 0 && <Ring x={156 + i * 176} y={286} f={f} at={at} r={190} z={70}
                c={cc as string} w={9} />}
            </React.Fragment>
          );
        })}
        {K.map((a, i) => f >= a && (
          <Puff key={"kp" + i} x={156 + i * 176} y={p.horizon + 20} f={f} at={a} n={8} s={0.8}
            z={52} c="#D2A660" />
        ))}

        {/* the fifth position, dark until the "and so much more" */}
        {/* ⛔ Alex: *"I see a container with text on it but it's covered behind
            the youtube and the other logo to the right of it."* It was dropped
            at x380/top214 — the exact band the icon plates occupy — at z70
            against their z72, so it landed BEHIND two of them. It is now the
            FIFTH SLOT in the same row, in the same visual language, with room
            of its own. Nothing enters another object's band. */}
        {f >= MORE && (
          <div style={{ position: "absolute", left: 156 + 4 * 176 - 62,
            top: 224 + E(f, MORE, MORE + 10, -230, 0, BACK), width: 124, height: 124,
            zIndex: 72, borderRadius: 18, background: "#F2EDE0", border: "7px solid #241F17",
            transform: `scale(${squash(f, MORE + 2, 0.26, 3, 13)})`, transformOrigin: "50% 100%",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", boxShadow: SH_D }}>
            <span style={{ ...mono(46, 900), color: "#8E2F22", lineHeight: 1 }}>+47</span>
            <span style={{ ...mono(17, 900), color: "#7E7768", letterSpacing: "0.10em" }}>MORE</span>
          </div>
        )}
        <Hero f={f} x={hxs + 40} y={gy + 84} size={244} z={62} drive={dr} strain={dr * 0.6}
          reach={92} costume={{ samurai: 1 }} act={0} ph={2.6} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S7 · THE METER — 98f · TURN.
   VO: "Three, Scrapling. Cancel your $300 a month scraping API,"

   ⛔ THE VILLAIN'S THIRD BODY. It is readable and RUNNING while the figure is
   spoken (measured onset f44), and it is cut at f64 — on "a month". The
   figure on the dial is the VO's own spoken words and the only other money in
   the reel; nothing here invents a saving.
   ⭐ AN ACTION IS A DISTANCE: the cutters travel a full 0.5 -> 1.0 arc, and
   the needle then FREE-SPINS down to rest rather than snapping to zero.
   ⭐ THE EMITTER GOES ON THE STILLEST PART — here that is the wall, so the
   severed conduit spits sparks for the rest of the scene.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("check");
  const CUT = 57;
  const wind = E(f, 38, CUT, 0, 1, IN_Q) - E(f, CUT, CUT + 14, 0, 1, OUT);
  const gy = p.horizon + 170;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.092]} vig={0.60}>
      <Cam z={5}>
        <SetFor k="check" f={f} t={f * 1.2} rakeRate={6.6 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        {/* the supply conduit run the meter hangs off — the SOURCE */}
        <div style={{ position: "absolute", left: 96, right: 96, top: 150, height: 24, zIndex: 30,
          borderRadius: 5, background: "linear-gradient(180deg, #6E4038 0%, #2E120E 100%)" }} />
        {[220, 430, 640, 850].map((cx, i) => (
          <div key={"cl" + i} style={{ position: "absolute", left: cx, top: 138, width: 26,
            height: 46, borderRadius: 4, background: "#4A211A", zIndex: 31 }} />
        ))}
        {/* ⭐⭐ THE SUPPLY, VISIBLE. Six bright slugs run the full 800px of
            conduit into the meter's head at 15px a frame — a full-width
            travelling element, and the literal thing the VO is describing.
            ⛔ THEY STOP DEAD AT THE CUT. The absence is the payoff. */}
        {f < CUT + 4 && Array.from({ length: 6 }, (_, i) => {
          const x = 96 + (((f * 15) + i * 134) % 560);
          return (
            <div key={"su" + i} style={{ position: "absolute", left: x, top: 133, width: 132,
              height: 58, borderRadius: 29, zIndex: 33,
              background: `linear-gradient(90deg, ${hexa("#FFC98A", 0)} 0%, #FFE7BE 44%, ${hexa("#FFC98A", 0)} 100%)` }} />
          );
        })}
        {/* ⭐ THE FIRST HALF NOW HAS AN EVENT: coins the size of dinner plates
            drop down the conduit into the meter's head, one every 9 frames, and
            the dial climbs on each. HOLD was 56% because nothing travelled
            until f44 — a wind-up is not an event. */}
        {Array.from({ length: 6 }, (_, i) => {
          const at = 3 + i * 10;
          if (f < at || f > at + 26) return null;
          const lf = f - at;
          const t = E(lf, 0, 13, 0, 1, IN_Q);
          const yy = 168 + t * (p.horizon - 250);
          return (
            <div key={"cn" + i} style={{ position: "absolute", left: 586 + Math.sin(i * 2.1) * 20,
              top: yy, width: 68, height: 68, borderRadius: "50%", zIndex: 54,
              transform: `scaleX(${0.5 + Math.abs(Math.cos(lf * 0.42)) * 0.5})`,
              background: `radial-gradient(circle at 36% 30%, #F6DFA4 0%, #C08A3E 58%, #7E5416 100%)`,
              border: "5px solid #6A4610", opacity: lf > 15 ? Math.max(0, 1 - (lf - 15) / 6) : 1 }} />
          );
        })}
        {/* ⭐ AND THE ARRIVAL COSTS SOMETHING: after the cut the whole unit tears
            off the wall and falls out of frame, tumbling. Nothing in a reel
            lands and simply stops, and nothing that is killed simply sags —
            §2's fourth part is an arrival that costs something, and a villain's
            death is the one place it is not optional. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 50,
          transform: `translateY(${E(f, CUT + 8, CUT + 30, 0, 640, IN_Q)}px) translateX(${E(f, CUT + 8, CUT + 30, 0, -140, LIN)}px) rotate(${E(f, CUT + 8, CUT + 30, 0, 96, LIN)}deg)`,
          transformOrigin: "63% 46%" }}>
          <Meter x={640} y={p.horizon + 40} s={1.5} f={f} z={50} label={R.scrapPrice}
            dead={CUT} rate={5} />
        </div>

        {/* the bolt cutters — two jaws, two handles, a pivot boss and grips */}
        {(() => {
          const open = 1 - wind;
          const ang = 6 + open * 26;
          return (
            <div style={{ position: "absolute", left: 380 + wind * 150, top: p.horizon - 78,
              width: 340, height: 200, zIndex: 60, transform: `rotate(${-14 + wind * 12}deg)`,
              transformOrigin: "84% 46%" }}>
              {[1, -1].map(k => (
                <div key={"bj" + k} style={{ position: "absolute", left: 200, top: 88,
                  width: 130, height: 20, borderRadius: 4, transformOrigin: "0% 50%",
                  transform: `rotate(${k * ang}deg)`,
                  background: `linear-gradient(180deg, #D8DDE4 0%, #6E7883 100%)`,
                  border: "3px solid #333B45" }} />
              ))}
              <div style={{ position: "absolute", left: 190, top: 78, width: 40, height: 40,
                borderRadius: "50%", background: "#3E464E", border: "4px solid #1A1F25" }} />
              {[1, -1].map(k => (
                <div key={"bh" + k} style={{ position: "absolute", left: 20, top: 88,
                  width: 180, height: 24, borderRadius: 6, transformOrigin: "100% 50%",
                  transform: `rotate(${-k * ang * 0.8}deg)`,
                  background: `linear-gradient(180deg, #C44A3A 0%, #6E2018 100%)`,
                  border: "3px solid #3E100C" }} />
              ))}
            </div>
          );
        })()}

        <Pool x={300} y={gy + 22} w={540} c="#FF8E62" o={0.30} z={19} />
        <Hero f={f} x={300} y={gy + 12} size={292} z={62} drive={wind} strain={wind * 0.9}
          reach={124} costume={{ stern: 1 }} act={1} ph={0.4} />
        {/* sparks off the severed conduit — the wall is the still thing here */}
        {f >= CUT && Array.from({ length: 22 }, (_, i) => {
          const lf = (f - CUT + i * 4) % 26;
          const t = lf / 26;
          return (
            <div key={"sp" + i} style={{ position: "absolute",
              left: 640 + Math.cos(i * 1.9) * t * 190,
              top: 168 + Math.sin(i * 2.7) * t * 60 + t * t * 210,
              width: 26, height: 26, borderRadius: 13, background: i % 2 ? "#FFE7BE" : "#FF9A46",
              opacity: 1 - t, zIndex: 66 }} />
          );
        })}
        {f >= CUT && <><Ring x={640} y={172} f={f} at={CUT} r={230} z={64} c="#FF8E62" w={9} />
          <Puff x={640} y={190} f={f} at={CUT} n={12} s={1.1} z={63} c="#B3543C" /></>}
        {/* the market keeps running behind the alley */}
        <Crew f={f} x={880} y={gy + 40} i={5} size={112} z={30} at={0} loop={3} tint="#8E4030" />
        <RepoPlate f={f} at={2} i={2} y={120} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S8 · THE BOT CHECK — 142f.
   VO: "because this plugin has undetectable web scraping with a built-in
        Cloudflare bypass."

   ⭐⭐ §10: A SCAN THAT SURFACES NOTHING IS A PROGRESS BAR. This one has
   FINDINGS: the sweep catches three queued bots, each flashes red and is
   SWATTED BACK — and then it passes over the hero and the readout stays
   EMPTY, which is the whole repo in one picture. The alarm that does not ring
   is the beat.
   ⭐ The `cloudflare` mark is on the checkpoint plate because the README names
   Cloudflare Turnstile explicitly. The claim is sourced, so it can be drawn.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("check");
  const DENY = [14, 32, 50];
  const HERO_SCAN = 64, EMPTY = 86, LIFT = 101;
  const walk = E(f, LIFT, 134, 0, 1, IO);
  const gy = p.horizon + 170;
  /* the sweep: a full-width travelling band, feathered, light AND shadow */
  const sweepX = ((f * 26) % 1180) - 120;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.58}>
      <Cam z={5}>
        <SetFor k="check" f={f} t={f * 1.2 + 300} rakeRate={7.2 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        <Checkpoint x={392} y={p.horizon + 44} w={330} f={f} z={44} lift={LIFT} />

        {/* the checkpoint plate — the sourced mark */}
        <div style={{ position: "absolute", left: 392, top: 148, width: 330, height: 74,
          zIndex: 68, borderRadius: 10, background: "#F4EFE1", border: "5px solid #241F17",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <Img src={staticFile("logos/cloudflare.svg")}
            style={{ width: 56, height: 56, objectFit: "contain" }} />
          <span style={{ ...mono(26, 900), color: "#241F17" }}>BOT CHECK</span>
        </div>

        {/* the sweep itself */}
        <div style={{ position: "absolute", left: sweepX, top: 190, width: 118, height: 470,
          zIndex: 58, transform: "rotate(-6deg)",
          background: `linear-gradient(90deg, ${hexa("#FF8E62", 0)} 0%, ${hexa("#FF8E62", 0.52)} 46%, ${hexa("#FF8E62", 0)} 100%)` }} />
        <div style={{ position: "absolute", left: sweepX - 130, top: 190, width: 96, height: 470,
          zIndex: 57, transform: "rotate(-6deg)",
          background: `linear-gradient(90deg, ${hexa("#000000", 0)} 0%, ${hexa("#000000", 0.36)} 50%, ${hexa("#000000", 0)} 100%)` }} />

        {/* the queue of blocked bots — the before state, and the FINDINGS */}
        {DENY.map((at, i) => {
          const lf = f - at;
          const hit = lf >= 0;
          const back = hit ? E(lf, 0, 14, 0, 1, OUT) : 0;
          return (
            <React.Fragment key={"bt" + i}>
              <div style={{ position: "absolute", left: 118 + i * 26 - back * (510 + i * 70),
                top: p.horizon - 158 + i * 12 + (hit ? lf * lf * 0.34 : 0), width: 168,
                height: 210, zIndex: 46, borderRadius: 10,
                transform: `rotate(${hit ? -back * (150 + i * 40) : 0}deg)`,
                background: hit ? "linear-gradient(178deg, #C44A3A 0%, #5E1810 100%)"
                                : "linear-gradient(178deg, #6E7883 0%, #2E353E 100%)",
                border: `5px solid ${hit ? "#3E100C" : "#1A1F25"}` }}>
                {/* a bot: a visor, an antenna and two tread blocks */}
                <div style={{ position: "absolute", left: 22, top: 30, width: 124, height: 48,
                  borderRadius: 6, background: hit ? "#FF9A82" : "#0E1626" }} />
                <div style={{ position: "absolute", left: 78, top: -30, width: 9, height: 32,
                  background: "#1A1F25" }} />
                <div style={{ position: "absolute", left: 68, top: -48, width: 28, height: 28,
                  borderRadius: "50%", background: hit ? "#FF5A3C" : "#4E5862" }} />
                {[0, 1].map(j => (
                  <div key={"td" + j} style={{ position: "absolute", left: 16 + j * 80, top: 152,
                    width: 62, height: 42, borderRadius: 5, background: "#1A1F25" }} />
                ))}
              </div>
              {hit && <Ring x={200 + i * 26} y={p.horizon - 56} f={f} at={at} r={230} z={52} c="#C44A3A" w={9} />}
            </React.Fragment>
          );
        })}

        {/* ⭐ THE REJECT PILE — the OUTPUT half of the mechanism, and the thing
            that keeps the frame from emptying once the bots are gone. Every
            blocked request lands here, so it GROWS on each denial and is still
            standing at the end as the thing the hero walked past. */}
        {Array.from({ length: 9 }, (_, i) => {
          const at = DENY[Math.min(2, (i / 3) | 0)] + (i % 3) * 5;
          if (f < at) return null;
          const lf = f - at;
          return (
            <div key={"rj" + i} style={{ position: "absolute", left: 66 + (i % 3) * 62,
              top: p.horizon - 44 - ((i / 3) | 0) * 60, width: 58, height: 56, zIndex: 40,
              borderRadius: 5, transform: `rotate(${-7 + (i % 3) * 6}deg) scale(${squash(lf, 0, 0.3, 3, 12)})`,
              background: "linear-gradient(178deg, #8E3A2A 0%, #3E120C 100%)",
              border: "4px solid #2A0A06" }}>
              <div style={{ position: "absolute", left: 10, top: 14, width: 34, height: 8,
                background: hexa("#FF9A82", 0.7) }} />
              <div style={{ position: "absolute", left: 10, top: 30, width: 22, height: 6,
                background: hexa("#FF9A82", 0.4) }} />
            </div>
          );
        })}

        {/* the readout: three DENIED, then EMPTY on the hero */}
        <div style={{ position: "absolute", left: 762, top: 216, width: 208, height: 128,
          zIndex: 68, borderRadius: 10, background: "#0E1116", border: "5px solid #3A2018",
          padding: 12 }}>
          {DENY.map((at, i) => f >= at && (
            <div key={"rd" + i} style={{ position: "absolute", left: 14, top: 14 + i * 30,
              display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, background: "#C44A3A" }} />
              <span style={{ ...mono(19, 900), color: "#E8A090" }}>BLOCKED</span>
            </div>
          ))}
          {f >= EMPTY && (
            <div style={{ position: "absolute", left: 14, top: 104,
              transform: `scale(${squash(f, EMPTY, 0.2, 3, 12)})`, transformOrigin: "0% 50%" }}>
              <span style={{ ...mono(20, 900), color: "#5E6A5E" }}>· · ·  NO MATCH</span>
            </div>
          )}
        </div>

        {/* ⭐⭐ THE HAUL. He does not walk through empty handed: he drags a loaded
            cart, and it FILLS as he crosses. Sixteen pages, 96x120, cream on a
            red set, arriving across the full duration — large, bright, fast and
            continuous, which is the only shape that measures above bar and is
            also exactly what the repo does. */}
        {(() => {
          const hx = 176 + walk * 660;
          return (<>
            {/* the cart: a deck, two spoked wheels and a drawbar he is pulling */}
            <div style={{ position: "absolute", left: hx + 96, top: gy - 96, width: 300,
              height: 108, zIndex: 58, borderRadius: 6,
              background: "linear-gradient(178deg, #C08A62 0%, #6E3A24 100%)",
              border: "6px solid #2A0C08" }}>
              <div style={{ position: "absolute", left: 10, right: 10, top: 12, height: 12,
                background: hexa("#FF9A82", 0.30) }} />
            </div>
            {[0, 1].map(k => (
              <div key={"wh" + k} style={{ position: "absolute", left: hx + 140 + k * 170,
                top: gy - 6, width: 84, height: 84, borderRadius: "50%", zIndex: 59,
                background: `radial-gradient(circle at 36% 32%, #A8664A 0%, #4A1C12 100%)`,
                border: "7px solid #1E0806" }}>
                {[0, 1, 2].map(m => (
                  <div key={"sk" + m} style={{ position: "absolute", left: "50%", top: "50%",
                    width: 60, height: 8, marginLeft: -30, marginTop: -4,
                    transform: `rotate(${m * 60 + walk * 1180}deg)`, background: "#E0B08E" }} />
                ))}
              </div>
            ))}
            <div style={{ position: "absolute", left: hx + 58, top: gy - 128, width: 60,
              height: 14, borderRadius: 7, zIndex: 58, background: "#6E3226",
              transform: "rotate(-18deg)" }} />
            {/* the pages, landing in the cart across the whole crossing */}
            {Array.from({ length: 12 }, (_, i) => {
              const at = 12 + i * 9;
              if (f < at) return null;
              const lf = f - at;
              const t = E(lf, 0, 9, 0, 1, OUT);
              const col = i % 4, row = (i / 4) | 0;
              const tx = hx + 112 + col * 68, ty = gy - 132 - row * 22;
              return (
                <div key={"pg" + i} style={{ position: "absolute",
                  left: tx - 52 + (1 - t) * (120 - col * 40),
                  top: ty - 64 - (1 - t) * 300, width: 104, height: 128, zIndex: 60 + row,
                  borderRadius: 5, background: "#F7F2E4", border: "4px solid #C6BCA2",
                  transform: `rotate(${-10 + col * 5 + (1 - t) * 40}deg) scale(${squash(lf, 9, 0.22, 3, 11)})` }}>
                  {[0.14, 0.29, 0.44].map((k, j) => (
                    <div key={"lr" + j} style={{ position: "absolute", left: "12%",
                      top: `${k * 100}%`, width: `${72 - j * 12}%`, height: 7,
                      background: j === 0 ? "#8E2F22" : "#B4A98C" }} />
                  ))}
                  {/* ⭐ THE BUG THAT TOOK THE PAGE. Alex: *"each of those papers
                      needs to have a bug on it to show scraping."* The right bug
                      is Scrapling's OWN mark — it is a spider, so the page shows
                      what fetched it, in the repo's real logo rather than in a
                      drawn insect nobody would attribute to anything. */}
                  <div style={{ position: "absolute", left: 26, bottom: 10, width: 52,
                    height: 52, borderRadius: 10, background: "#FFFFFF",
                    border: "3px solid #E4DECE", display: "flex", alignItems: "center",
                    justifyContent: "center" }}>
                    <Img src={staticFile("logos/scrapling.png")}
                      style={{ width: 38, height: 38, objectFit: "contain" }} />
                  </div>
                </div>
              );
            })}
            <Hero f={f} x={hx} y={gy + 18} size={272} z={62}
              drive={walk > 0 ? 0.34 : 0} strain={0.30 + walk * 0.18} reach={20}
              costume={{ prof: 1 }} act={1} ph={2.9} />
            <Pool x={hx} y={gy + 30} w={430} c="#FF8E62" o={0.26} z={19} />
            <Forearm x0={hx + 74} y0={gy - 176} x1={hx + 96} y1={gy - 120} w={24} z={63} />
          </>);
        })()}
        <Band f={f} at={EMPTY} t="UNDETECTED" sub="STEALTHY FETCHER · ★75,397" x={392} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S9 · THE GENERATOR SHED — 131f.
   VO: "Four, Ollama. You can run Llama, Mistral, DeepSeek locally for free
        with one command,"

   ⭐⭐ §12: A SWAY IS AN IDLE, A LIFT IS AN ARC. The pull-cord yank drives the
   hero's whole body through a real distance, and the RELEASE OVERSHOOTS PAST
   HIS STANDING HEIGHT. The overshoot is the reason it reads as a yank rather
   than a lean. Two false starts before the catch, because a machine that fires
   first time has no event in it.
   ⭐ The three drums spin up on the MEASURED word onsets of the three model
   names — f33 Llama · f49 Mistral · f65 DeepSeek — with their real marks.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shed");
  const Y1 = 4, Y2 = 17, FIRE = 24;
  const CMD = 100;
  const yank = (a: number) => E(f, a, a + 5, 0, 1, IN_Q) - E(f, a + 5, a + 13, 0, 1, BACK);
  const pull = Math.max(yank(Y1) * 0.8, yank(Y2));
  const gy = p.horizon + 168;
  const lit = E(f, FIRE, FIRE + 12, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.60}>
      <Cam z={5}>
        <SetFor k="shed" f={f} t={f * 0.8} rakeRate={4.2 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        {/* the warm floor pool the firebox throws, only after it catches */}
        {f >= FIRE && <Pool x={362} y={p.horizon + 150} w={800 * lit} c="#FFC98A" o={0.34} z={19} />}

        <Generator x={362} y={p.horizon + 128} s={1.12} f={f} fire={FIRE} z={46} />
        {/* ⭐ THE CATCH FLOODS THE SET. A generator firing is the one beat in
            this scene, and changing only the 100x75 firebox is a state change,
            not an event: the whole cold room goes warm in four frames. */}
        {f >= FIRE && f < FIRE + 14 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 68, pointerEvents: "none",
            background: `radial-gradient(120% 92% at 30% 72%, ${hexa("#FFD9A8", 0.30 * (1 - (f - FIRE) / 14))} 0%, ${hexa("#FFC98A", 0.16 * (1 - (f - FIRE) / 14))} 46%, ${hexa("#FFC98A", 0)} 82%)` }} />
        )}

        {/* the three model drums on the shed wall, on their spoken onsets */}
        {[["ollama.svg", "LLAMA", 28], ["mistralai.svg", "MISTRAL", 43],
          ["deepseek.svg", "DEEPSEEK", 58]].map(([mk, lab, at], i) => (
          <Drum key={"md" + i} x={566 + i * 162} y={p.horizon - 8} s={0.90} f={f}
            at={at as number} z={48} c={i % 2 ? "#4A5A72" : "#3E4E64"} label={lab as string}
            mark={mk as string} rate={8 + i * 2} />
        ))}
        {[28, 43, 58].map((at, i) => f >= at && (
          <Ring key={"dr" + i} x={566 + i * 162} y={p.horizon - 106} f={f} at={at} r={230}
            z={52} c="#FFC98A" w={9} />
        ))}
        {/* ⭐⭐ THE OUTPUT. Three drums spinning and a room going warm is a
            machine that RUNS; it is not a machine that MAKES anything, which is
            §10's "which half is missing" answered with OUTPUT. Each drum drops
            a finished card onto a belt the moment it catches, the belt carries
            them left, and the tray at the end fills for the rest of the scene —
            so the tail of the shot is production rather than a hold. */}
        {f >= 30 && (
          <div style={{ position: "absolute", left: 530, top: p.horizon + 96, width: 470,
            height: 46, zIndex: 40, borderRadius: 6, overflow: "hidden",
            background: "linear-gradient(180deg, #46566E 0%, #1A2330 100%)",
            border: "5px solid #101822" }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={"bs" + i} style={{ position: "absolute", top: 0, bottom: 0,
                left: ((i * 64 - f * 5.4) % 584) - 64, width: 30,
                background: i % 2 ? "#5E7290" : "#2A3646" }} />
            ))}
          </div>
        )}
        {Array.from({ length: 14 }, (_, i) => {
          const at = 34 + i * 6;
          if (f < at) return null;
          const lf = f - at;
          const drop = E(lf, 0, 7, -120, 0, IN_Q);
          const run = E(lf, 7, 40, 0, 1, LIN);
          const x = 960 - i * 4 - run * 452;
          return (
            <div key={"oc" + i} style={{ position: "absolute", left: x, top: p.horizon + 52 + drop,
              width: 74, height: 56, zIndex: 44, borderRadius: 5, background: "#FFF6E4",
              border: "4px solid #C6BCA2",
              transform: `rotate(${-5 + (i % 3) * 5}deg) scale(${squash(lf, 7, 0.22, 3, 10)})` }}>
              <div style={{ position: "absolute", left: 8, top: 10, width: 40, height: 7,
                background: "#C4571F" }} />
              <div style={{ position: "absolute", left: 8, top: 24, width: 52, height: 6,
                background: "#B4A98C" }} />
              <div style={{ position: "absolute", left: 8, top: 36, width: 30, height: 6,
                background: "#B4A98C" }} />
            </div>
          );
        })}
        {/* the tray at the end of the belt, filling */}
        <div style={{ position: "absolute", left: 452, top: p.horizon + 62, width: 100,
          height: 96, zIndex: 46, borderRadius: "5px 5px 12px 12px",
          background: "linear-gradient(178deg, #5E7290 0%, #1A2330 100%)", border: "5px solid #101822" }}>
          {Array.from({ length: 8 }, (_, i) => f >= 74 + i * 6 && (
            <div key={"tr" + i} style={{ position: "absolute", left: 8, right: 8,
              bottom: 8 + i * 9, height: 8, borderRadius: 2, background: "#FFF6E4",
              transform: `scaleX(${squash(f, 74 + i * 6, 0.2, 3, 9)})` }} />
          ))}
        </div>

        {/* the pull-cord: a handle on a line that RETRACTS after the yank */}
        <div style={{ position: "absolute", left: 486, top: p.horizon - 42, width: 8,
          height: 96 + pull * 128, background: "#D8CFB6", zIndex: 50,
          transformOrigin: "50% 0%", transform: `rotate(${-24 - pull * 22}deg)` }} />
        <div style={{ position: "absolute", left: 486 - Math.sin((24 + pull * 22) * Math.PI / 180) * (96 + pull * 128) - 26,
          top: p.horizon - 42 + Math.cos((24 + pull * 22) * Math.PI / 180) * (96 + pull * 128),
          width: 52, height: 26, borderRadius: 13, background: "#8A6A44",
          border: "4px solid #4A3420", zIndex: 51 }} />

        {/* ⭐ the hero: the release OVERSHOOTS past his standing height */}
        <Hero f={f} x={148} y={gy + 38 - Math.max(0, -pull) * 86} size={278} z={56}
          drive={-pull} strain={Math.abs(pull) * 1.0} reach={186} costume={{ beard: 1 }} act={1} ph={1.3} />
        {f >= FIRE && <Steam x={148} y={gy - 250} f={f} at={FIRE} n={4} s={0.8} z={66} c="#FFD9A8" />}

        {/* the command, stamped on the shed door — the only text in the shot */}
        {f >= CMD && (
          <div style={{ position: "absolute", left: 306, top: 200, zIndex: 84,
            transform: `scale(${squash(f, CMD, 0.22, 4, 14)})`, transformOrigin: "0% 50%",
            padding: "12px 22px", borderRadius: 10, background: "#0E1626",
            border: "5px solid #9CF0C4" }}>
            <span style={{ ...mono(30, 800), color: "#9CF0C4" }}>$ {R.cmd}</span>
          </div>
        )}
        {f >= FIRE && <Puff x={362} y={p.horizon + 20} f={f} at={FIRE} n={12} s={1.1} z={60} c="#7E95B6" />}
        <RepoPlate f={f} at={4} i={3} y={120} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S10 · THE METER ROW — 89f · PAYOFF, and the villain dies once.
   VO: "so you can stop paying for expensive AI subscriptions."

   ⛔ THE VILLAIN HAS WON AT S0, S4 AND S7 AND LOSES EXACTLY HERE. Six meters
   die in a left-to-right wave — six DISCRETE deaths with the needles falling
   to rest, never a fade — and the trunk cable that fed them drops across the
   frame. After this it never reappears.
   ⭐ The only light left on the wall is the generator's, from the scene before.
   That continuity IS the argument.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shed");
  const BREAK = 8;
  const DEAD = [11, 19, 27, 35, 43, 51];
  const FALL = DEAD.map(d => d + 10);
  const br = E(f, BREAK - 8, BREAK, 0, 1, IN_Q);
  const slack = E(f, BREAK + 4, BREAK + 26, 0, 1, BACK);
  const gy = p.horizon + 166;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.082]} vig={0.60}>
      <Cam z={5}>
        <SetFor k="shed" f={f} t={f * 0.8 + 260} rakeRate={4.8 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        <Pool x={780} y={p.horizon + 140} w={620} c="#FFC98A" o={0.30} z={19} />

        {/* the trunk cable that feeds them, going slack and falling */}
        <div style={{ position: "absolute", left: 60, top: 96 + slack * 250, width: 880, height: 20,
          zIndex: 42, borderRadius: 10, transform: `rotate(${slack * 5}deg)`,
          background: "linear-gradient(180deg, #4A5A72 0%, #16202C 100%)" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={"cc" + i} style={{ position: "absolute", left: 20 + i * 72,
              top: -6 + Math.sin(i * 1.3 + f / 9) * slack * 12, width: 30, height: 32,
              borderRadius: 5, background: "#2C3C54" }} />
          ))}
        </div>

        {/* six meters, dying left to right */}
        {DEAD.map((at, i) => (
          <React.Fragment key={"mt" + i}>
            <div style={{ position: "absolute", inset: 0, zIndex: 50,
              transform: `translateY(${E(f, FALL[i], FALL[i] + 20, 0, 470, IN_Q)}px) rotate(${E(f, FALL[i], FALL[i] + 20, 0, (i % 2 ? 1 : -1) * 68, LIN)}deg)`,
              transformOrigin: `${(112 + i * 156) / 1012 * 100}% 42%` }}>
              <Meter x={112 + i * 156} y={p.horizon + 62} s={0.90} f={f} z={50}
                label={["PLUS", "PRO", "PRO", "SEAT", "PRO", "API"][i]} dead={at} rate={5 + i}
                mark={["openai.png", "googlegemini.svg", "cursor.svg", "githubcopilot.svg",
                       "perplexity.svg", "midjourney.png"][i]} />
            </div>
            {f >= at && <Ring x={112 + i * 156} y={p.horizon - 60} f={f} at={at} r={130} z={54}
              c="#4A6490" />}
            {/* the wall behind it, now empty and BRIGHT against the dead meter —
                an empty bracket has to read, because empty is the promise */}
            {f >= FALL[i] + 6 && (
              <div style={{ position: "absolute", left: 112 + i * 156 - 72, top: p.horizon - 178,
                width: 144, height: 178, zIndex: 44, borderRadius: 8,
                background: `linear-gradient(178deg, ${hexa("#C6DCF4", 0.30)} 0%, ${hexa("#C6DCF4", 0.06)} 100%)`,
                border: `5px dashed ${hexa("#C6DCF4", 0.34)}`,
                transform: `scale(${squash(f, FALL[i] + 6, 0.16, 3, 12)})` }} />
            )}
            {f >= FALL[i] + 20 && <Puff x={112 + i * 156} y={p.horizon + 190} f={f}
              at={FALL[i] + 20} n={9} s={0.9} z={60} c="#7E95B6" />}
          </React.Fragment>
        ))}

        {/* the main breaker — two-handed, he hangs his weight on it */}
        <div style={{ position: "absolute", left: 838, top: p.horizon - 46, width: 118,
          height: 176, zIndex: 52, borderRadius: 8,
          background: "linear-gradient(178deg, #3E4A5E 0%, #141C28 100%)", border: "5px solid #0C121C" }}>
          <div style={{ position: "absolute", left: 26, top: 22 + br * 92, width: 66, height: 44,
            borderRadius: 7, background: "linear-gradient(178deg, #C44A3A 0%, #6E2018 100%)",
            border: "5px solid #3E100C" }} />
          <div style={{ position: "absolute", left: 46, top: 12, width: 26, height: 152,
            background: hexa("#000000", 0.34) }} />
        </div>
        <Hero f={f} x={838} y={gy + 62} size={216} z={56} drive={br} strain={br * 0.95}
          reach={44} costume={{ fro: 1 }} act={3} ph={0.9} flip />
        <Forearm x0={838 - 62} y0={gy - 120} x1={898} y1={p.horizon - 6 + br * 92} w={26} z={58} />
        {f >= BREAK && <Puff x={890} y={p.horizon + 40} f={f} at={BREAK} n={9} s={0.9} z={60}
          c="#7E95B6" />}
        <Band f={f} at={FALL[5] + 8} t="NOTHING LEFT TO CANCEL" sub="RUNS ON YOUR MACHINE"
          x={140} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S11 · THE PLUG WALL — 107f.
   VO: "Five, Awesome MCPs. It has over 92,000 stars on GitHub,"

   THE EVENT: the hero and one crew HAUL a star plate up the wall on a rope,
   with OVERLAPPING ACTION — the hoist leads, the plate follows on one ease,
   and it swings and rings out as a damped pendulum after the rope stops. It
   lands at f62 (the figure is spoken at f55) and the wall lights outward.
   ⭐ The wall's own signal lamps are the light source, so the mechanism and
   the practical are the same object.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("plugs");
  const HOIST = 10, LAND = 49;
  const k = (g: number) => E(g, HOIST, LAND, 0, 1, IO);
  const t = k(f);
  const vel = (k(f + 1) - k(f - 1)) * 0.5;
  const ring = f > LAND ? Math.sin((f - LAND) * 0.62) * Math.exp(-(f - LAND) / 6.5) * 26 : 0;
  const py = 560 - t * 360;
  const px = 506 + (-vel * 300 * 1.8 + ring);
  const gy = p.horizon + 178;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.056]} vig={0.54}>
      <Cam z={5}>
        <SetFor k="plugs" f={f} t={f * 1.0} rakeRate={5.2 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        <PlugWall x={70} y={172} w={872} h={330} f={f} z={26} c="#1F4C3E"
          wave={LAND + 4} from={[0.5, 0.32]} />

        {/* the rope over its sheave — the hoist LEADS the load */}
        <div style={{ position: "absolute", left: 506 - 5, top: 96, width: 10,
          height: Math.max(10, py - 96), background: "#D8CFB6", zIndex: 56,
          transformOrigin: "50% 0%", transform: `rotate(${(px - 506) * 0.03}deg)` }} />
        <div style={{ position: "absolute", left: 470, top: 68, width: 74, height: 74,
          borderRadius: "50%", zIndex: 58, background: "#2E6B58", border: "6px solid #0C2119" }}>
          <div style={{ position: "absolute", left: 26, top: 26, width: 22, height: 22,
            borderRadius: "50%", background: "#0C2119",
            transform: `rotate(${t * 900}deg)` }} />
        </div>

        {/* the star plate: a cast plate with a rim, six bolts and a stamped face */}
        <div style={{ position: "absolute", left: px - 190, top: py - 92, width: 380, height: 184,
          zIndex: 60, borderRadius: 16,
          transform: `rotate(${(px - 506) * 0.04}deg) scale(${f >= LAND ? squash(f, LAND, 0.14, 3, 14) : 1})`,
          background: "linear-gradient(172deg, #F4EFE1 0%, #D6CEB6 100%)", border: "9px solid #241F17" }}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={"bt" + i} style={{ position: "absolute", left: 20 + (i % 3) * 160,
              top: i < 3 ? 16 : 144, width: 20, height: 20, borderRadius: "50%",
              background: "#9A927E", border: "3px solid #6E6656" }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 44, display: "flex",
            alignItems: "center", justifyContent: "center", gap: 14 }}>
            <span style={{ ...mono(56, 900), color: "#C08A3E" }}>★</span>
            <span style={{ ...mono(58, 900), color: "#241F17" }}>92,592</span>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 116, textAlign: "center" }}>
            <span style={{ ...mono(22, 900), color: "#7E7768", letterSpacing: "0.14em" }}>ON GITHUB</span>
          </div>
        </div>
        {f >= LAND && <><Ring x={506} y={py} f={f} at={LAND} r={330} z={62} c="#9CF0C4" w={10} />
          <Puff x={506} y={py + 70} f={f} at={LAND} n={12} s={1.1} z={61} c="#6AC69C" /></>}
        {/* ⭐ THE WALL ANSWERS with the two things it actually holds. */}
        {Array.from({ length: 18 }, (_, i) => {
          const at = LAND + 2 + i * 3;
          if (f < at) return null;
          const lf = f - at;
          const ang = (i / 18) * Math.PI * 2 + 0.4 + (i % 2) * 0.17;
          const t = E(lf, 0, 16, 0, 1, OUT);
          const cx = 506 + Math.cos(ang) * (170 + t * 400);
          const cy = 296 + Math.sin(ang) * (78 + t * 148);
          const o = Math.min(1, 1 - (lf - 40) / 16);
          const sq = squash(lf, 0, 0.3, 3, 12);
          const spin = -14 + i * 9 + t * 40;
          if (i % 2 === 0) {
            /* ⭐ A STRUCK STAR MEDALLION — this is what "92,592 stars" IS */
            const D = 112;
            return (
              <div key={"st" + i} style={{ position: "absolute", left: cx - D / 2, top: cy - D / 2,
                width: D, height: D, zIndex: 58, opacity: o,
                transform: `rotate(${spin}deg) scale(${sq})` }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
                  background: "radial-gradient(circle at 34% 30%, #F6DFA4 0%, #D9A22E 54%, #8E6A18 100%)",
                  border: "5px solid #6E5212" }} />
                {/* the milled rim */}
                {Array.from({ length: 16 }, (_, k) => (
                  <div key={"ml" + k} style={{ position: "absolute", left: "50%", top: "50%",
                    width: 5, height: D * 0.5, marginLeft: -2.5, marginTop: -D * 0.5,
                    transformOrigin: "50% 100%", transform: `rotate(${k * 22.5}deg)`,
                    background: hexa("#6E5212", 0.30) }} />
                ))}
                {/* the five points, drawn */}
                {Array.from({ length: 5 }, (_, k) => (
                  <div key={"pt" + k} style={{ position: "absolute", left: "50%", top: "50%",
                    width: 17, height: D * 0.34, marginLeft: -8.5, marginTop: -D * 0.34,
                    transformOrigin: "50% 100%", transform: `rotate(${k * 72}deg)`,
                    background: "#F7EFD8", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
                ))}
                <div style={{ position: "absolute", left: "50%", top: "50%", width: 22, height: 22,
                  marginLeft: -11, marginTop: -11, borderRadius: "50%", background: "#B98A20",
                  border: "3px solid #6E5212" }} />
              </div>
            );
          }
          /* ⭐ A 1U RACK SERVER — front panel, ear brackets, vents, bays, LEDs */
          const W2 = 156, H2 = 66;
          return (
            <div key={"sv" + i} style={{ position: "absolute", left: cx - W2 / 2, top: cy - H2 / 2,
              width: W2, height: H2, zIndex: 58, opacity: o,
              transform: `rotate(${spin * 0.4}deg) scale(${sq})` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 5,
                background: "linear-gradient(178deg, #46566E 0%, #1A2330 100%)",
                border: "4px solid #0E1620" }} />
              {[0, W2 - 18].map((ex, k) => (
                <div key={"ea" + k} style={{ position: "absolute", left: ex, top: -4, width: 18,
                  height: H2 + 8, borderRadius: 3, background: "#5E7290",
                  border: "3px solid #0E1620" }} />
              ))}
              {/* the vent block */}
              <div style={{ position: "absolute", left: 30, top: 11, width: 48, height: H2 - 22,
                borderRadius: 2, background: `repeating-linear-gradient(90deg, #0E1620 0px, #0E1620 3px, #3A4A60 3px, #3A4A60 7px)` }} />
              {/* two drive bays */}
              {[0, 1].map(k => (
                <div key={"bay" + k} style={{ position: "absolute", left: 88, top: 12 + k * 23,
                  width: 40, height: 18, borderRadius: 2, background: "#2A3547",
                  border: "2px solid #101A26" }} />
              ))}
              {/* status LEDs */}
              {[0, 1, 2].map(k => (
                <div key={"led" + k} style={{ position: "absolute", left: 134, top: 14 + k * 14,
                  width: 10, height: 10, borderRadius: "50%",
                  background: k === 0 ? "#9CF0C4" : k === 1 ? "#E7B24C" : "#5FC79A" }} />
              ))}
            </div>
          );
        })}
        {/* the two hauling. Their forearms end ON the rope. */}
        <Hero f={f} x={330} y={gy} size={222} z={56} drive={t * 0.5}
          strain={f < LAND ? 0.4 + t * 0.5 : 0.1} reach={54} costume={{ wizard: 1 }} act={1} ph={2.1} />
        <Crew f={f} x={694} y={gy} i={1} size={200} z={55} at={0} loop={1} flip />
        <Forearm x0={330 + 62} y0={gy - 168} x1={498} y1={Math.max(120, py - 40)} w={24} z={58} />
        <Forearm x0={694 - 66} y0={gy - 154} x1={516} y1={Math.max(140, py - 20)} w={22} z={57} />
        <Mark x={44} y={gy - 250} s={68} z={80} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S12 · THE INTERCHANGE — 170f · the reel's PEAK.
   VO: "and it has thousands of MCP servers connecting your agent to browsers,
        databases, and anything you can think of."

   ⛔ CAUGHT ON THE BOARD: the first draft was "cables glowing". Reel 110
   measured exactly that at 13.93 and it was rejected as unreadable — *"I can't
   really tell what that is"*. `scene_motion_audit.py` cannot tell a mechanism
   from a light show. So every cable ENDS on a socket that LIGHTS A REAL MARK,
   and the last three land on blank sockets that FLIP UP a new mark, which is
   "anything you can think of" drawn rather than asserted.
   ⭐ Fourteen arrivals spread across the FULL 170 frames. Bunched arrivals
   leave the tail dead.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("plugs");
  const DRIVE = 12;
  const dr = E(f, DRIVE - 7, DRIVE, 0, 1, IN_Q) - E(f, DRIVE, DRIVE + 12, 0, 1, OUT);
  const gy = p.horizon + 182;
  /* the destinations, on the measured onsets: browsers f81 · databases f111 ·
     "anything you can think of" f130 onward */
  const DESTS: Array<{ x: number; y: number; at: number; src: string; lab?: string; flip?: boolean }> = [
    { x: 128, y: 214, at: 26, src: "docker.svg", lab: "DOCKER" },
    { x: 128, y: 396, at: 38, src: "slack.svg", lab: "SLACK" },
    { x: 128, y: 566, at: 52, src: "github.svg", lab: "GITHUB" },
    { x: 300, y: 176, at: 64, src: "notion.svg", lab: "NOTION" },
    { x: 884, y: 214, at: 86, src: "figma.svg", lab: "FIGMA" },
    { x: 884, y: 396, at: 106, src: "postgresql.svg", lab: "POSTGRES" },
    { x: 884, y: 566, at: 116, src: "mongodb.svg", lab: "MONGO" },
    { x: 712, y: 176, at: 96, src: "supabase.svg", lab: "SUPABASE" },
    { x: 300, y: 620, at: 104, src: "linear.svg", lab: "LINEAR" },
    { x: 712, y: 620, at: 116, src: "googledrive.svg", lab: "DRIVE" },
    { x: 200, y: 300, at: 124, src: "airtable.svg", lab: "ANYTHING", flip: true },
    { x: 812, y: 300, at: 137, src: "discord.svg", lab: "ANYTHING", flip: true },
    { x: 506, y: 640, at: 149, src: "huggingface.svg", lab: "ANYTHING", flip: true },
  ];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.050]} vig={0.52}>
      <Cam z={5}>
        <SetFor k="plugs" f={f} t={f * 1.1 + 300} rakeRate={5.8 * RAKE_K[v]} occluders={false}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        <PlugWall x={70} y={150} w={872} h={366} f={f} z={22} c="#1B4437" wave={20}
          from={[0.5, 0.5]} />

        {/* the trunk socket, Claude-marked, centre */}
        <div style={{ position: "absolute", left: 506 - 92, top: 348, width: 184, height: 184,
          zIndex: 56, borderRadius: 26, background: "#F4EFE1", border: "10px solid #241F17",
          transform: `scale(${f >= DRIVE ? squash(f, DRIVE, 0.16, 3, 14) : 1})` }}>
          <MarkCast x={92} y={92} s={112} z={4} f={f} spin={0.6} />
        </div>
        {/* the trunk plug the hero drives home */}
        {/* ⛔ THE PLUG SEATS BELOW THE MARK, NOT ACROSS IT. Alex: *"there
            shouldn't be a green thing covering the claude logo in the middle."*
            The socket face runs y 348..532 and the plug was landing at 424 with
            its pins reaching 398 — straight over the emblem. The Claude mark is
            the audience filter; nothing gets to sit on it. */}
        <div style={{ position: "absolute", left: 506 - 54, top: 556 - dr * 30, width: 108,
          height: 84, zIndex: 52, borderRadius: 12,
          background: "linear-gradient(178deg, #3E8C70 0%, #113026 100%)", border: "6px solid #0A1F18" }}>
          {[0, 1].map(i => (
            <div key={"pp" + i} style={{ position: "absolute", left: 22 + i * 44, top: -22,
              width: 20, height: 26, borderRadius: 3, background: "#D8DDE4" }} />
          ))}
        </div>

        {/* ⭐ the cables. Each ends ON a socket, which lights a real mark. */}
        {DESTS.map((d, i) => (
          <Cord key={"tc" + i} f={f} at={d.at - 16} x0={506} y0={430} x1={d.x} y1={d.y}
            c={i % 3 === 0 ? "#9CF0C4" : i % 3 === 1 ? "#5FC79A" : "#E7B24C"} z={40 + (i % 3)}
            w={28} dur={16} />
        ))}
        {/* ⭐⭐ THE POWER PULSES. Each cable carries three of them, and they keep
            running for the whole scene after it lands — so the second half is
            not a hold. HOLD was 48% because thirteen cables all finished and
            then the frame sat still. */}
        {DESTS.map((d, i) => (
          <React.Fragment key={"pu" + i}>
            {[0, 1, 2].map(k => {
              const at = d.at + 2 + k * 13;
              const per = 40;
              if (f < at) return null;
              const t = ((f - at) % per) / 14;
              if (t > 1) return null;
              const px = 506 + (d.x - 506) * t;
              const py = 430 + (d.y - 430) * t - Math.sin(t * Math.PI) * 62;
              return (
                <div key={"pk" + k} style={{ position: "absolute", left: px - 37, top: py - 37,
                  width: 74, height: 74, borderRadius: "50%", zIndex: 52,
                  background: `radial-gradient(circle, #FFFFFF 0%, ${i % 2 ? "#9CF0C4" : "#F4E3B0"} 46%, ${hexa("#9CF0C4", 0)} 78%)`,
                  opacity: 0.94 }} />
              );
            })}
          </React.Fragment>
        ))}
        {DESTS.map((d, i) => (
          <Dest key={"ds" + i} x={d.x} y={d.y} f={f} at={d.at} src={d.src} s={1.12} z={66}
            label={d.lab} flip={d.flip} />
        ))}
        {DESTS.filter((_, i) => i % 3 === 0).map((d, i) => (
          <Ring key={"dr" + i} x={d.x} y={d.y} f={f} at={d.at} r={220} z={64} c="#9CF0C4" w={10} />
        ))}

        <Hero f={f} x={506} y={gy + 30} size={224} z={57} drive={dr} strain={dr * 0.8}
          reach={0} costume={{ constr: 1 }} act={1} ph={3.4} />
        {/* the crew working the wall behind, on the four action loops */}
        {[0, 1, 2].map(i => (
          <Crew key={"iw" + i} f={f} x={214 + i * 292} y={gy + 66} i={i + 3} size={118} z={34}
            at={i * 11} tint="#3E8C70" />
        ))}
        <RepoPlate f={f} at={6} i={4} y={120} right />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S13 · THE GATE COUNTER — 47f · CTA.
   VO: "For the free setup, comment STAR."

   ⭐ THE HERO ARTIFACT COMES BACK FULL. It slides across the counter toward
   camera — a real distance, arriving with a knock and a rock — and the STAMP
   is the arrival that costs something. No confetti and no fanfare: the
   hand-off IS the beat.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const SLIDE = 4, LANDS = 20, STAMP = 25;
  const sl = E(f, SLIDE, LANDS, 0, 1, OUT);
  const rk = rock(f, LANDS, 6.5, 20);
  const st = E(f, STAMP, STAMP + 5, 0, 1, IN_Q) - E(f, STAMP + 5, STAMP + 14, 0, 1, OUT);
  const gy = p.horizon + 174;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.54}>
      <Cam z={5}>
        <SetFor k="gate" f={f} t={f * 0.9} rakeRate={4.0 * RAKE_K[v]}  rakeX0={RAKE_X0[v]} parX={PAR_X[v]} />
        {/* the counter, cropped by the bottom edge */}
        <div style={{ position: "absolute", left: -30, right: -30, top: p.horizon + 96, height: 240,
          zIndex: 70, background: "linear-gradient(180deg, #8A6A44 0%, #2E2018 100%)",
          borderTop: "12px solid #C09660" }} />
        {/* the full rack, ON the counter and inside the safe area — v1 put its
            baseline 32px below the panel and half of the payoff was off-frame. */}
        <div style={{ position: "absolute", left: 506 - 380, top: 300 + sl * 96,
          zIndex: 76, transform: `rotate(${rk * 0.24}deg)`, transformOrigin: "50% 100%" }}>
          <SlotRack x={380} y={228} w={760} f={f} z={76} fill={[0, 0, 0, 0, 0]} s={1.02}
            total={R.combinedText} />
        </div>
        {f >= LANDS && <><Puff x={506} y={534} f={f} at={LANDS} n={13} s={1.2} z={78}
          c="#AF9272" /><Ring x={506} y={526} f={f} at={LANDS} r={300} z={77}
          c="#FFD8A0" w={9} /></>}

        {/* the STAR stamp, driven down */}
        {/* ⭐ THE KEYWORD IS THE WHOLE POINT OF THE LAST SHOT, so it is centred
            and 1.7x the size it was. Alex: *"the STAR thing at the end should be
            bigger, more near the center."* A CTA that is smaller than the props
            around it is a CTA nobody acts on. */}
        <div style={{ position: "absolute", left: 506 - 166, top: 176 + st * 150, width: 332,
          height: 250, zIndex: 90 }}>
          <div style={{ position: "absolute", left: 116, top: 0, width: 100, height: 112,
            borderRadius: 14, background: "linear-gradient(178deg, #55606A 0%, #262C33 100%)",
            border: "7px solid #171C22" }} />
          <div style={{ position: "absolute", left: 0, top: 104, width: 332, height: 132,
            borderRadius: 14, background: "linear-gradient(178deg, #C44A3A 0%, #6E2018 100%)",
            border: "8px solid #3E100C", display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: SH_D }}>
            <span style={{ ...mono(74, 900), color: "#F7EFE0", letterSpacing: "0.18em" }}>STAR</span>
          </div>
        </div>
        <Hero f={f} x={866} y={gy + 30} size={244} z={82} drive={st} strain={st * 0.7}
          reach={30} costume={{ suit: 1 }} act={2} ph={1.8} flip />
        <Crew f={f} x={168} y={gy + 34} i={6} size={206} z={82} at={0} loop={2} />
        <MarkPlate x={44} y={140} t="FOR CLAUDE" s={1.0} z={84} />
      </Cam>
    </Scene>
  );
};
