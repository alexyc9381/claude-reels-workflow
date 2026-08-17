import React from "react";
import { Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import { SetFor } from "./CldSets";
import type { SetKey } from "./CldSets";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK,
  Scene, Mark, MarkCast, asPlace, Cartridge, CourseDeck, TileBlock,
  rock, shake, squash, idle, R1, R2, R3, C1, C2, C3, COURSES, ROLES,
} from "./CldWorld";
import {
  Actor, Worker, OutputTower, BenchTop, BenchFront, Term, ScreenWall, Pallet, Chip2, Hit,
  Proof, Broll, Crowd, Porters, Brain, WallMark, costumeFor, CrewCrate, Fling, SpinBadge,
  Crown,
} from "./CldProps";

/* ===========================================================================
   REEL 107 "CLAUDE" · THE SCENES.  Board: storyboards/107-claude.md.

   ⛔⛔ THE LAW THIS FILE IS WRITTEN TO. Alex killed the previous build with:
      *"each of the scenes have to be way interesting… more interesting
      background, interesting storyline etc and matching what im saying in the
      voiceover as well here which this isnt"*.
      So every scene below is headed by the LINE IT PLAYS UNDER, and the picture
      depicts THAT line. ANIMATION-QUALITY §3's free test — write the VO beside
      the shot and ask what the picture ADDS — is run in the comment on each one.

   ⭐ THE STORYLINE (the four sentences [[feedback_reel_needs_a_storyline]] asks
      for, answered before a frame was drawn):
        1. The hero is a Claude user working alone at night; he wants to keep up.
        2. He is blocked by an EQUIPMENT GAP: every other station is producing
           and his is empty. No villain — the enemy is a distance.
        3. The turn: three free things land on his bench, and he fits each one.
        4. The payoff: his own output climbs to the same height as the row.

   ⭐ SPRITES ACT IN ALL ELEVEN. Alex, three times now. The roster:
        S0 he reaches and stops · S0c he sinks · S1 he stands and takes
        S2 he walks in and halts · S3 he raises a hand · S4 two-hand lift
        S5 he SLAMS and recoils · S6 he hauls a shutter · S7 he ducks
        S8 he folds arms while three helpers work · S9 he climbs and turns
        S10 he points.

   ⛔ MEASURED ONSETS, from src/data/words_claude.json. The PICTURE LEADS by
      4 frames so the crossover lands on the syllable.
        S0 0 · S1 200 · S2 317 · S3 368 · S4 488 · S5 538 · S6 651 · S7 719 ·
        S8 807 · S9 880 · S10 992 · END 1052
   ⛔ `Scene` push is SCENE-LOCAL. Keep `left >= 506 - 486/push`.
   ========================================================================= */

export type Variant = "floor" | "screens" | "baydoor";
export const HOOK_SET: Record<Variant, SetKey> = {
  floor: "floor", screens: "screens", baydoor: "baydoor",
};

/** per-variant camera offset — [[feedback_trial_reel_variants]]: the offset goes
    on the panel CONTENTS, never the whole comp (scaling the comp moved the
    chassis and wrecked the motion audit: 8.12 -> 3.72 on identical content). */
export const CAM: Record<Variant, { dx: number; dy: number; s: number }> = {
  floor:   { dx: 0,   dy: 0,   s: 1.00 },
  screens: { dx: -18, dy: 10,  s: 1.05 },
  baydoor: { dx: 16,  dy: -12, s: 1.03 },
};

/** per-variant push, so no two cuts share a camera move on the same beat */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + ({ floor: 0, screens: 0.02, baydoor: -0.015 })[v]];

const Rig: React.FC<{ v: Variant; children: React.ReactNode }> = ({ v, children }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 5,
    transform: `translate(${CAM[v].dx}px, ${CAM[v].dy}px) scale(${CAM[v].s})`,
    transformOrigin: "50% 56%" }}>{children}</div>
);

/* =========================================================================
   S0 · 0 to 200 (6.65s) · THE HOOK
   VO: "If you're not using Claude right now, you're probably falling behind.
        The creator of Claude even said that AI is about to create a wealth gap
        bigger than anything we've ever seen before."
   §3 TEST — what does the picture ADD? The exact distance, and a body that is
   on the wrong side of it. Three hard cuts inside the first 5s (0.00 / 2.37 /
   4.24), each an EVENT, per docs/THE-OPEN.md.
   ====================================================================== */
/* ⛔⛔ RE-TIMED TO THE MENTION. Alex: *"the anthropic broll ceo need to be at
   like 4 seconds or whatever when the anthropic CEO is mentioned"*. Measured
   onsets: "creator" 2.44s (f73), "Claude" 2.81 (f84), "said" 3.04 (f91),
   "wealth gap" 4.24-4.51 (f127-135), "before" 5.72 (f172). v5 ran the b-roll
   f71-127 and CUT AWAY at 4.24s — i.e. it was gone by the time he says "wealth
   gap", which is the heart of the line. It now holds f71 -> f200, the WHOLE
   sentence, so it is on screen at 4s and through the claim.
   ⛔ THE-OPEN still needs >=3 hard cuts in the first 5s, so shot 1 splits at
   f36 (1.2s): cuts land at 0.00 / 1.20 / 2.37. */
const CUT1 = 36, CUTB = 71;
const HOOK_END = 200;

export const S0: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const k = HOOK_SET[v];

  /* ---- SHOTS 1-2 (0 -> 2.37s): the drawn world, and it is the ONE thing that
     differs between the three cuts, so hook delta survives the shared b-roll. */
  if (f < CUTB) {
    const tight = f >= CUT1;
    const lf = tight ? f - CUT1 : f;
    const dur = tight ? CUTB - CUT1 : CUT1;
    return (
      <Scene p={asPlace(v)} slug={tight ? "YOURS HASN'T MOVED" : "EVERY OTHER STATION IS SHIPPING"}
        push={push(v, dur, tight ? 1.08 : 1.03)} vig={tight ? 0.44 : 0.38}>
        <SetFor k={k} f={f} lightK={1} />
        {/* ⭐⭐ CLAUDE SYMBOLISM IN THE OPEN. Alex: *"the begining scene doesnt
            have much claude symbolism or representation there either"*. The mark
            is cast on the back wall, and it is stencilled on EVERY station's
            terminal down the row, so the room is visibly a Claude floor. */}
        {/* ⛔ ONE mark in this corner, not two. The HookHeader already carries a
            124px Claude badge at the panel's top-left; a second plate under it is
            the same duplication that was pulled from the earlier hooks. The
            symbolism is the WALL emblem plus the fact that the whole cast is
            Claudes. */}
        <WallMark x={506} y={118} s={268} z={6} o={0.18} f={f} spin={0.16} />
        {v === "floor" && (<>
          {[{ x: 366, y: 402, s: 0.74 }, { x: 560, y: 356, s: 0.58 },
            { x: 706, y: 322, s: 0.46 }, { x: 818, y: 296, s: 0.37 }].map((q, i) => (
            <React.Fragment key={"st" + i}>
              <OutputTower x={q.x + 30 * q.s} y={q.y} n={9 + i * 2} f={f}
                at={2 + i * 2} every={4} w={210} h={26} s={q.s + 0.16}
                z={28 + i} lit={0.9 - i * 0.12} />
              <Worker f={f} x={q.x - 58 * q.s} y={q.y + 4} s={190 * q.s} z={27 + i}
                seed={i + 2} phase={i * 11} rate={0.9 + i * 0.1} {...costumeFor(i * 4)} />
            </React.Fragment>
          ))}
          {/* ⛔ the three flying slabs are GONE. More Claudes arrive at the far
              stations instead — the row is filling up with staff, which is what
              "every other station is shipping" actually looks like. */}
          <Crowd f={f} n={16} x0={320} x1={900} y0={286} y1={410} at={2} every={1.2}
            s={118} z={26} from="r" cols={8} costume={(i) => costumeFor(i + 5)} />
          {/* ⭐⭐ THE 1-SECOND EVENT. Two Claudes get flung clean across the frame
              by the volume coming off the far stations and land at OUR empty
              bench — the only place in the room with nothing happening. Biggest
              travelling mover in the reel, and it is on-line rather than a gag:
              "every other station is shipping". */}
          <Fling f={f} at={16} x0={940} y0={366} x1={430} y1={556} s={158} z={68}
            dur={24} spins={2} costume={costumeFor(6)} />
          <Fling f={f} at={44} x0={880} y0={330} x1={330} y1={540} s={140} z={67}
            dur={26} spins={3} costume={costumeFor(9)} />
        </>)}
        {v === "screens" && (<>
          <ScreenWall x={70} y={150} cols={8} rows={4} s={0.98} z={20} f={f} at={2} every={2} skip={27} />
          {/* ⭐ THE SPINNING MARK, on the ops wall. Alex asked for it in cut 2
              specifically, and it is an established house move — reel 95 round 4:
              *"more motion components in the hook, spinning Claude logo"*. A slow
              rotation on an emblem is the cheapest legitimate motion in a frame
              because it is FURNITURE, not a subject, so it costs the hierarchy
              nothing while making the audience filter itself the thing that
              catches the eye. It sits over the dead cell in the wall — the one
              screen that is yours and is not running. */}
          {/* ⛔ POSITIONED CLEAR OF THE FLING PATH. Centred at x506 it sat exactly
              where the flung Claude crosses (x950 -> x380, arcing through ~y366),
              so the two collided into one unreadable orange shape. Upper-left is
              the one region of this wall nothing else travels through.
              ⛔ And no backing plate — it read as a grey square on the wall. The
              mark carries at 0.62 over the screens on its own. */}
          {/* ⛔ IT WAS RENDERING AND STILL UNREADABLE. At o=0.62 over a near-black
              screen wall the clay mark composites to a dull brown-red — measured
              15-21% clay pixels in its own box, i.e. present but muddy, and at
              thumbnail size it vanishes entirely. Opacity is the wrong lever for
              a brand mark on a dark ground: it is the ONE element that must not
              be subtle. Full opacity, bigger, and on a light plate so it reads at
              any size, exactly like the header badge does. */}
          {/* ⛔ AND CLEAR OF TWO THINGS: the HookHeader's own Claude badge sits
              top-LEFT, so a second white plate under it read as one stacked
              double-logo; and at 268px it covered the hero's head. Upper-RIGHT,
              smaller, above the fling's arc — nothing else travels there. */}
          <div style={{ position: "absolute", left: 744, top: 138, width: 218, height: 218,
            zIndex: 52, borderRadius: 50, background: "#FFFFFF",
            border: "6px solid #E8DCC0", boxShadow: SH_D }} />
          <WallMark x={853} y={166} s={162} z={53} o={1} f={f} spin={0.9} />
          {/* ⭐ PARITY WITH THE FLOOR CUT. Every craft pass this reel has had —
              action loops, the fling, arriving crowds — landed on the floor
              variant only, because the hook shots are the one part that is NOT
              shared by the factory. The other two cuts get the same beats here,
              staged for their own world: operators streaming in under the wall,
              and two of them flung out of their chairs by the load. */}
          <Crowd f={f} n={12} x0={130} x1={880} y0={470} y1={556} at={4} every={1.5}
            s={112} z={44} from="l" cols={6} costume={(i) => costumeFor(i + 2)} />
          <Fling f={f} at={16} x0={950} y0={430} x1={380} y1={596} s={150} z={68}
            dur={24} spins={2} costume={costumeFor(3)} />
          <Fling f={f} at={46} x0={880} y0={396} x1={280} y1={584} s={134} z={67}
            dur={26} spins={3} costume={costumeFor(11)} />
        </>)}
        {/* ⭐⭐ THE DOORWAY IS THE YELLOW RECTANGLE. Alex, twice: *"theres no
            claude logo on that yellow rectangle at the beginning hook scene for
            vid 3"*. I had been checking the cartridge and the b-roll shot; the
            object he means is this set's blazing door, which is the single
            biggest bright mass in cut 3's hook and carried no mark at all.
            ⛔ No white plate here — the door is already near-white, so the clay
            mark reads directly on it. A plate would only mute it. */}
        {v === "baydoor" && (
          <Img src={staticFile("claude_logo.png")}
            style={{ position: "absolute", left: 356, top: 210, width: 300, height: 300,
              zIndex: 14, objectFit: "contain", opacity: 0.92,
              transform: `rotate(${(f * 1.1) % 360}deg)` }} />
        )}
        {v === "baydoor" && [0, 14, 28, 42, 56].map((at, i) => {
          const k2 = E(f, at, at + 40, 0, 1, LIN);
          if (k2 <= 0) return null;
          return (
            <div key={"pl" + i} style={{ position: "absolute", inset: 0, zIndex: 30 + i,
              transform: `translateX(${-280 + k2 * 800}px)`, opacity: 1 - E(f, at + 32, at + 40, 0, 1, LIN) }}>
              <Pallet x={220} y={556 - i * 12} n={6} s={0.86 - i * 0.06} z={30 + i} f={f} lit={1} />
              <Worker f={f} x={140} y={600 - i * 12} s={188 - i * 10} z={31 + i}
                seed={i + 3} phase={i * 9} arm={false} {...costumeFor(i * 6 + 1)} />
            </div>
          );
        })}
        {/* ⭐ same parity pass for the bay: a crew working the apron, and two
            handlers flung off the pallets by the volume going out the door */}
        {v === "baydoor" && (<>
          <Crowd f={f} n={12} x0={120} x1={900} y0={506} y1={600} at={6} every={1.5}
            s={116} z={44} from="r" cols={6} costume={(i) => costumeFor(i + 8)} />
          <Fling f={f} at={18} x0={960} y0={440} x1={360} y1={640} s={152} z={68}
            dur={24} spins={2} costume={costumeFor(5)} />
          <Fling f={f} at={48} x0={900} y0={410} x1={266} y1={628} s={136} z={67}
            dur={26} spins={3} costume={costumeFor(13)} />
        </>)}
        {/* ⭐ OURS — near, lit, and nothing on it. Same station in all three. */}
        <BenchTop x={26} y={470} w={330} lit={1} z={40} />
        <Term x={40} y={372} w={150} h={98} z={41} on={0.26} rows={2} f={f} />
        <Actor f={f} x={276} y={474} s={tight ? 226 : 196} z={44} seed={1}
          gaze={E(f, 16, 26, 0, 0.85, OUT)}
          lean={E(f, 16, 26, 0, -4, OUT) - E(f, 40, 54, 0, -4, IO)} />
        <BenchFront x={26} y={498} w={330} lit={1} z={60} h={130} />
        <Chip2 x={48} y={512} t="YOUR OUTPUT: 0" s={0.92} z={78}
          c="#141024" fg="#EFE0BE" />
      </Scene>
    );
  }

  /* ---- SHOT 3 (2.37 -> 6.65s): THE REAL PERSON, for the whole sentence ----
     ⛔ Source: Anthropic's OWN upload ("Scaling enterprise AI: Fireside chat
     with Eli Lilly's Diogo Rau and Dario Amodei"), frame-checked before use —
     the first candidate I pulled was a news cut showing a DIFFERENT speaker.
     ⛔ ESSAY TITLE ONLY on the plate. No invented quote.
     ⭐ Each cut FRAMES it differently so the variants stay distinct even though
     they share the footage: full-bleed / on the ops-room wall / in the doorway. */
  const lf = f - CUTB;
  const plate = (
    <div style={{ position: "absolute", left: 52, top: 92, zIndex: 82,
      transform: `translateX(${(1 - E(lf, 8, 17, 0, 1, OUT)) * -600}px)`,
      padding: "14px 22px", borderRadius: 12, background: "#F2ECDE",
      border: `4px solid ${dkh("#F2ECDE", 0.24)}`, boxShadow: SH_D }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30,
        color: "#1E1A14", lineHeight: 1 }}>THE ADOLESCENCE OF TECHNOLOGY</div>
      <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17, marginTop: 6,
        letterSpacing: "0.16em", color: "#7A6B58" }}>JAN 2026</div>
    </div>
  );
  const name = <Chip2 x={52} y={648} t="DARIO AMODEI · ANTHROPIC CEO" s={0.98} z={82}
    c="#0C0804" fg="#F6ECD6" />;

  if (v === "screens") {
    return (
      <Scene p={asPlace("screens")} slug="THE CREATOR OF CLAUDE SAID IT HIMSELF"
        push={push(v, HOOK_END - CUTB, 1.05)} vig={0.40}>
        <SetFor k="screens" f={lf} lightK={0.9} />
        {/* it plays ON the ops-room wall — the one screen everyone is watching */}
        <div style={{ position: "absolute", left: 96, top: 150, width: 820, height: 470,
          zIndex: 40, borderRadius: 12, overflow: "hidden",
          border: `7px solid ${hexa("#8FD6E4", 0.34)}`, boxShadow: SH_D }}>
          {/* ⛔⛔ THE CLIP'S CLOCK IS THE SEQUENCE'S, NOT THE `f` PROP.
              `OffthreadVideo` reads useCurrentFrame() from its enclosing
              Sequence — the `f` I pass only drives opacity/scale maths. S0 is a
              Sequence starting at root 0, so the video was being asked to play
              at root time 0 -> 6.65s while the asset is only **4.63s**. It ran
              out at 4.60s and FROZE on its last frame for the final 2.05s.
              ⛔ It only showed in cuts 2 and 3 because the FLOOR cut's b-roll
              shot ends at f127 (4.24s), just under the asset length — a bug that
              hides in one variant and not the others.
              ⭐ Wrapping in `<Sequence from={CUTB}>` restarts the clip's own
              clock when the shot starts, so it plays 0 -> 4.30s of a 4.63s
              asset. It also fixes the floor cut, which was silently starting
              2.37s INTO the clip rather than at its head. */}
              <Sequence from={CUTB} layout="none">
            <Broll src="107_amodei.mp4" f={lf} at={0} z={40} w={820} h={470} />
          </Sequence>
        </div>
        {plate}{name}
        <Hit x={506} y={390} f={lf} at={18} r={320} c={SKY} z={74} />
      </Scene>
    );
  }
  if (v === "baydoor") {
    return (
      <Scene p={asPlace("baydoor")} slug="THE CREATOR OF CLAUDE SAID IT HIMSELF"
        push={push(v, HOOK_END - CUTB, 1.06)} vig={0.40}>
        <SetFor k="baydoor" f={lf} lightK={0.5} />
        {/* it fills the doorway — the only light in the bay */}
        <div style={{ position: "absolute", left: 262, top: 112, width: 488, height: 520,
          zIndex: 40, overflow: "hidden", boxShadow: SH_D }}>
          <Sequence from={CUTB} layout="none">
            <Broll src="107_amodei.mp4" f={lf} at={0} z={40} w={488} h={520} />
          </Sequence>
        </div>
        {plate}{name}
        <Actor f={lf} x={854} y={706} s={214} z={52} seed={1} gaze={-0.8} />
        <Hit x={506} y={370} f={lf} at={18} r={300} c="#F0B45C" z={74} />
      </Scene>
    );
  }
  /* ⛔⛔ THE EDIT: B-ROLL ON THE ATTRIBUTION, A DEDICATED SHOT ON THE CLAIM.
     v9 laid the wealth-gap crowd OVER the b-roll and buried Amodei's face — two
     subjects in one frame, which is the hierarchy rule broken outright. The
     sentence has two halves and they now get one shot each:
       2.37 -> 4.24  "the creator of Claude even said…"   -> the real man
       4.24 -> 6.65  "…a wealth gap bigger than anything" -> the gap, clean
     The b-roll still covers the CEO mention (creator 2.44 / Claude 2.81 /
     said 3.04) and is on screen at 4s, which was the note. */
  const GAP = 56;                       /* lf 56 = root f127 = "wealth" 4.24s */
  if (lf < GAP) {
    return (
      <Scene p={asPlace("floor")} slug="THE CREATOR OF CLAUDE SAID IT HIMSELF"
        push={push(v, GAP, 1.04)} vig={0.26}>
        <Sequence from={CUTB} layout="none">
          <Broll src="107_amodei.mp4" f={lf} at={0} z={30} punch={0.07} />
        </Sequence>
        {plate}{name}
        <Hit x={506} y={430} f={lf} at={16} r={320} c={GOLD} z={74} />
      </Scene>
    );
  }
  /* ⭐⭐⭐ THE WEALTH GAP IS A SIZE GAP. Alex: *"needs to actually show some sort
     of wealth gap… maybe one sprite getting way bigger in size"*. Exactly right,
     and it is readable with no decoding at all: the equipped Claude GROWS —
     x1 to x3.4 across the shot, until his head is out of frame — while ours
     stays the size he started and is left a speck at the bottom left. Their
     output piles up around the big one as he grows.
     ⭐ AND IT SETS UP THE PAYOFF: at 29s OUR Claude does the same growth, so the
     reel's last beat is the hook's image resolved rather than a new one. */
  const gf = lf - GAP;
  const big = 1 + E(gf, 4, 74, 0, 1.9, IO);          /* x1 -> x2.9, head stays in */
  const mine = 1 - E(gf, 4, 74, 0, 0.30, IO);        /* and ours dwindles */
  return (
    /* ⛔ NO SLUG ON THIS SHOT. The giant's legs run straight through the slug
       band at the bottom of the panel, and a caption crossing a body is the
       "covered up by other random stuff" note. The frame says it without one. */
    <Scene p={asPlace("floor")} slug="" push={push(v, HOOK_END - CUTB - GAP, 1.03)} vig={0.44}>
      <SetFor k="floor" f={gf} lightK={0.9} />
      <WallMark x={860} y={54} s={186} z={6} o={0.13} f={gf} spin={0.3} />
      {/* their output piling up around him as he grows */}
      <OutputTower x={356} y={686} n={16} f={gf} at={2} every={4}
        w={230} h={28} s={1} z={30} lit={0.9} />
      {/* ⭐ THE ONE WHO GREW. transformOrigin at his feet so he rises out of the
          top of frame rather than inflating in place. */}
      {/* ⛔ POSITIONING. v11 grew him at x=740 with the column at x~930, so by the
          end he was jammed into it and cropped on the wrong axis. He grows from
          x=620 now — centre-right, clear of the column — and the ceiling comes
          down from 3.4x to 2.9x so his head stays inside the frame. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 56,
        transform: `scale(${big})`, transformOrigin: "620px 690px" }}>
        <Actor f={gf} x={620} y={690} s={210} seed={5} z={56}
          {...costumeFor(1)} cheer={0.35} gaze={-0.5} />
      </div>
      {/* ⭐ AND YOU. Same sprite, same frame, not growing. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `scale(${mine})`, transformOrigin: "180px 700px" }}>
        <Actor f={gf} x={180} y={700} s={206} seed={1} z={60}
          gaze={0.95} shock={E(gf, 10, 26, 0, 0.8, OUT)} />
      </div>
      <BenchTop x={40} y={712} w={280} lit={0.7} z={40} />
      <Hit x={620} y={420} f={gf} at={30} r={360} c={GOLD} z={74} />
      <Hit x={620} y={300} f={gf} at={58} r={420} c={GOLD} z={73} />
    </Scene>
  );
};

/* =========================================================================
   S1 · 200 to 317 (3.90s) · THE TURN
   VO: "And don't worry, it's not too late to catch up, because here are the
        exact resources to not get left behind."
   §3 TEST — the picture adds WHICH three, arriving at HIS station, and his body
   changing from sunk to standing. ⛔ Spread across the FULL duration: reel 104
   front-loaded three arrivals into the first 34 of 70 frames and scored 5.94,
   under bar; staggering the same content across the whole shot took it to 7.28.
   ====================================================================== */
export const S1: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const k = HOOK_SET[v];
  /* ⛔ spread across the FULL 117 frames, and each object is now large enough
     to register — 2.55 measured when they were half this size. */
  const ARR = [16, 48, 80];
  const rise = E(f, 14, 40, 0, 1, OUT);
  return (
    <Scene p={asPlace(v)} slug="THREE FREE THINGS, ON YOUR BENCH" push={push(v, 117, 1.05)} vig={0.38}>
      <SetFor k={k} f={f} lightK={0.5 + rise * 0.5} />
      <BenchTop x={210} y={470} w={430} lit={0.5 + rise * 0.5} z={40} />
      {/* ⭐ each lands with a hit, a rock and a puff — nothing lands and stops */}
      {ARR.map((at, i) => {
        const kk = E(f, at, at + 12, 0, 1, OUT);
        if (kk <= 0) return null;
        const y = 470 - (1 - kk) * 300;
        const rk = rock(f, at + 10, 5.5, 22);
        return (
          <React.Fragment key={"ar" + i}>
            <div style={{ position: "absolute", inset: 0, zIndex: 50 + i,
              transform: `translateY(${y - 470}px) rotate(${rk * 0.5}deg)` }}>
              {/* ⛔⛔ THREE DIFFERENT OBJECTS IN THREE DIFFERENT COLOURS. Alex:
                  *"those objects need to be different stuff and different color
                  not just white basic paper looking stuff"*. v15 handed over a
                  cream card deck, a cream cartridge and a cream tile grid — one
                  material, one colour, three silhouettes that read the same at a
                  glance. Each now matches the palette of the room it belongs to,
                  so the handover also previews where the reel is going next:
                    TEAL   deck   -> the classroom (S2/S3 are teal)
                    AMBER  cartridge -> the terminal bay's gold seat
                    GREEN  crate  -> the dock, and it opens with a crew inside */}
              {/* ⭐ EVERY RESOURCE CARRIES THE TURNING MARK. Alex: *"even on all
                  of the objects, even these two, need the spinning claude logo"*.
                  It is also the right read: these are Claude resources, so the
                  mark is the thing they have in common. S1 is shared by the
                  factory, so this lands in all three cuts at once. */}
              {i === 0 && (<>
                <CourseDeck x={214} y={452} n={22} s={0.98} z={50} lit={1} f={f} c={C1} />
                <SpinBadge x={186} y={318} s={76} z={55} f={f} spin={1.5} />
              </>)}
              {i === 1 && (<>
                <Cartridge x={404} y={300} s={0.60} z={51} lit={1} c={C2}>
                  <div style={{ position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center" }}>
                    <Img src={staticFile("claude_logo.png")}
                      style={{ width: 104, height: 104, objectFit: "contain",
                        transform: `rotate(${(f * 1.5) % 360}deg)` }} />
                  </div>
                </Cartridge>
                <SpinBadge x={496} y={286} s={70} z={55} f={f} spin={1.7} />
              </>)}
              {i === 2 && (<>
                <CrewCrate x={676} y={318} s={0.86} f={f} at={ARR[2] + 8} z={52} c={C3} n={5} />
                <SpinBadge x={846} y={300} s={70} z={55} f={f} spin={1.3} />
              </>)}
            </div>
            <Hit x={[352, 428, 574][i]} y={470} f={f} at={at + 11} r={150} c={GOLD} z={74} />
          </React.Fragment>
        );
      })}
      {/* ⭐⭐ THE 8-SECOND SCENE, REBUILT. Alex: *"each of the scene animations need
          to be so much more interesting in general like the one at 8 seconds"*.
          It was two porters walking. It is now a DELIVERY: a stream of Claudes
          coming in from both sides across the whole 3.9s, six porters carrying,
          and a back rank arriving behind the bench — so the line "here are the
          exact resources" lands as a room filling up, not a man walking. */}
      <Crowd f={f} n={10} x0={140} x1={880} y0={214} y1={268} at={4} every={1.6}
        s={82} z={22} from="r" cols={5} costume={(i) => costumeFor(i + 4)} />
      <Porters f={f} n={4} at={0} every={19} y={604} x0={-170} x1={560} s={132} z={36} />
      <Porters f={f} n={2} at={26} every={22} y={664} x0={1120} x1={470} s={146} z={46} />
      {/* ⭐ HE STANDS UP. The sink from S0c reverses, and he turns to each one. */}
      <Actor f={f} x={128} y={480} s={238} z={44} seed={1}
        lean={6 - rise * 6}
        gaze={E(f, ARR[0], ARR[0] + 8, 0, -0.5, OUT) + E(f, ARR[2], ARR[2] + 8, 0, -0.4, OUT)}
        cheer={E(f, 92, 112, 0, 0.45, OUT)} />
      <BenchFront x={210} y={498} w={430} lit={0.5 + rise * 0.5} z={60} h={130} />
    </Scene>
  );
};

/* =========================================================================
   S2 · 317 to 368 (1.70s) · ITEM 1, NAMED
   VO: "First is Anthropic's free course library."
   §3 TEST — a shelf of books would be a CONTAINER carrying one bit. What the
   picture adds is the COUNT: 22 real courses lighting one after another across
   a board, and a Claude walking in and stopping dead at the size of it.
   ====================================================================== */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  /* ⭐⭐ REAL SCREEN RECORDING. Alex: *"have a real screen recording of the
     anthropic course library page into it"*, and the playbook already required
     it (B0: put the literal thing, real UI, on screen). This is
     `anthropic.skilljar.com` captured full-page on build day and SCROLLED
     behind a fixed browser frame, which is what reads as a recording.
     ⛔ The count is not typeset anywhere — you watch the real catalogue go past. */
  return (
    <Scene p={asPlace("lecture")} slug="ANTHROPIC'S OWN CLASSES, FREE" push={[0, 51, 1.035]} vig={0.40}>
      <SetFor k="lecture" f={f} lightK={1} />
      {/* ⛔ top edge below y150: the HookHeader occupies panel y<110 and was
          covering the browser chrome, i.e. the one thing proving it is real. */}
      <Proof x={96} y={150} w={716} h={430} src="shots/107_academy_full.png" f={f}
        scroll={620} at={0} dur={46} z={60} url="anthropic.skilljar.com" />
      <Actor f={f} x={E(f, 0, 22, 690, 862, OUT)} y={648} s={228} z={62} seed={1}
        gaze={-0.8} shock={E(f, 24, 34, 0, 0.5, OUT)} />
      <Chip2 x={110} y={606} t="$0" s={1.3} z={78} c="#3F6B4E" fg="#F6F2E8" />
    </Scene>
  );
};

/* =========================================================================
   S3 · 368 to 488 (4.00s) · ITEM 1, PAYOFF
   VO: "They basically made free classes to teach you how to use their own AI,
        so there's no reason not to learn."
   §3 TEST — the sentence's verb is TEACH, so somebody teaches: a lecturer draws,
   our hero puts his hand up, and he walks out with a certificate. The picture
   adds the teaching itself and the artefact you leave with.
   ====================================================================== */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const hand = E(f, 40, 62, 0, 1, OUT) - E(f, 92, 108, 0, 1, IO);
  return (
    <Scene p={asPlace("lecfront")} slug="THEY TEACH YOU THEIR OWN AI" push={[0, 120, 1.06]} vig={0.44}>
      <SetFor k="lecfront" f={f} lightK={1} />
      {/* the lecturer DRAWS — a line extruding across the board behind them */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, zIndex: 28 }}>
        <path d="M150 250 L330 190 L470 264 L640 168 L806 214"
          stroke={mxh(C1, 0.24)} strokeWidth={9} fill="none" strokeLinecap="round"
          strokeDasharray={900} strokeDashoffset={900 - E(f, 4, 64, 0, 900, LIN)} />
      </svg>
      {Array.from({ length: 18 }, (_, i) => {
        const at = 6 + i * 5;
        const k = E(f, at, at + 14, 0, 1, OUT);
        if (k <= 0) return null;
        return (
          <div key={"fc" + i} style={{ position: "absolute",
            left: 96 + (i % 6) * 138 - (1 - k) * 460, top: 120 + Math.floor(i / 6) * 82 - (1 - k) * 80,
            width: 128, height: 70, borderRadius: 7, zIndex: 30,
            background: mxh(C1, 0.10), border: `3px solid ${dkh(C1, 0.32)}`,
            transform: `rotate(${(1 - k) * -18}deg) scaleY(${squash(f, at + 12, 0.2)})`,
            opacity: Math.min(1, k * 1.5), boxShadow: SH }} />
        );
      })}
      {/* the real catalogue stays on the board behind the lecturer — PROOF, and
          it keeps scrolling, so the scene has a background process by default */}
      <Proof x={92} y={96} w={560} h={330} src="shots/107_academy_full.png" f={f}
        scroll={900} at={2} dur={110} z={32} url="anthropic.skilljar.com" />
      <Worker f={f} x={806} y={606} s={228} z={40} seed={7} phase={0} prof={1} rate={0.7} />
      {/* our hero RAISES A HAND */}
      <Actor f={f} x={264} y={640} s={236} z={62} seed={1} lean={hand * -5} gaze={-0.5} />
      <div style={{ position: "absolute", left: 322, top: 520 - hand * 92, width: 40, height: 96,
        borderRadius: 18, background: CLAY, zIndex: 63, opacity: hand,
        transform: `rotate(${hand * 8}deg)` }} />
      {/* the certificate prints, then the seal STAMPS */}
      {f > 74 && (
        <div style={{ position: "absolute", left: 560, top: 640 - E(f, 76, 100, 0, 150, OUT),
          width: 210, height: 142, zIndex: 66, borderRadius: 8, background: "#F6F1E4",
          border: `4px solid ${dkh("#F6F1E4", 0.22)}`, boxShadow: SH_D,
          transform: `rotate(${rock(f, 100, 4, 24) * 0.4}deg)` }}>
          <div style={{ position: "absolute", left: 18, top: 22, width: 130, height: 8,
            borderRadius: 4, background: "#CFC5B2" }} />
          <div style={{ position: "absolute", left: 18, top: 44, width: 96, height: 8,
            borderRadius: 4, background: "#CFC5B2" }} />
          <div style={{ position: "absolute", left: 130, top: 74, width: 58, height: 58,
            borderRadius: "50%", background: "#3F6B4E",
            transform: `scale(${E(f, 104, 112, 0, 1, BACK)})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 22, color: "#F6F2E8" }}>$0</div>
        </div>
      )}
      <Hit x={690} y={560} f={f} at={106} r={160} c={GOLD} z={74} />
    </Scene>
  );
};

/* =========================================================================
   S4 · 488 to 538 (1.67s) · ITEM 2, NAMED
   VO: "Next is Anthropic's official skills plugins."
   §3 TEST — a box with a logo is a container. This is the repo's own cartridge
   at 290px, LIFTED two-handed with the weight in his knees, so the object has
   mass and the shot has a body in it.
   ====================================================================== */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const lift = E(f, 6, 34, 0, 1, OUT);
  return (
    <Scene p={asPlace("bay")} slug="ANTHROPIC'S OFFICIAL SKILLS" push={[0, 50, 1.04]} vig={0.46}>
      <SetFor k="bay" f={f} lightK={1} />
      <Actor f={f} x={300} y={648} s={248} z={40} seed={1} lean={lift * -3} />
      <div style={{ position: "absolute", inset: 0, zIndex: 56,
        transform: `translateY(${(1 - lift) * 170}px) rotate(${(1 - lift) * -12}deg)`,
        transformOrigin: "560px 460px" }}>
        <Cartridge x={410} y={276} s={1.0} z={56} lit={1} c={C2}>
          {/* ⛔ THE CLAUDE MARK IS THE HERO OF THIS FACE. v27 tucked a 62px logo
              into the top-right corner where the cartridge's own chamfer clipped
              it, and left the GitHub mark dominating — so the amber prop, which
              is one of the three Claude resources, read as a GitHub object.
              The mark now sits centre on a white badge (the only treatment that
              survives a thumbnail), with GitHub kept small beside it as the repo
              receipt rather than the identity. */}
          <div style={{ position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ width: 96, height: 96, borderRadius: 24, background: "#FFFFFF",
              border: "4px solid #E8DCC0", boxShadow: SH,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 70, height: 70, objectFit: "contain",
                  transform: `rotate(${(f * 1.5) % 360}deg)` }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <svg width={40} height={40} viewBox="0 0 16 16">
                <path fill="#241F17" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                  0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
                  1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                  0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27
                  2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
                  2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
                  .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} width={18} height={18} viewBox="0 0 24 24"
                    style={{ opacity: E(f, 18 + i * 3, 24 + i * 3, 0.2, 1, OUT) }}>
                    <path fill={GOLD} d="M12 2.4l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.25 6.2 20.3l1.1-6.45-4.7-4.6 6.5-.95z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </Cartridge>
      </div>
      <Proof x={598} y={112} w={392} h={250} src="shots/107_skills_hero.png" f={f}
        scroll={180} at={4} dur={44} z={58} url="github.com/anthropics/skills" />
      <Chip2 x={392} y={604} t="anthropics/skills" s={1} z={78} />
    </Scene>
  );
};

/* =========================================================================
   S5 · 538 to 651 (3.77s) · ITEM 2, PAYOFF
   VO: "These are basically cheat codes you can plug into Claude Code to make it
        instantly better at specific tasks."
   §3 TEST — the sentence's verb is PLUG INTO, so we draw the plugging AND the
   consequence: a job that was stalled completes, then three named jobs tick
   down the screen. ⛔ A bar filling measured +0.11 on the motion table; rows
   ARRIVING one at a time was the fix that beat three rounds of effects.
   ⛔ The four parts of an event are all present: before state (stalled), trigger
   (he raises it), travel (140px in 6 frames), arrival that COSTS something
   (shake, recoil, sparks, a lamp snapping on).
   ====================================================================== */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const SLAM = 26;
  const sk = shake(f, SLAM, 11, 14);
  const seated = f >= SLAM;
  /* ⛔⛔ THIS SCENE MEASURED 1.78 WITH A 54-FRAME DEAD RUN — the worst in the
     reel. The slam landed at f30 and then 83 frames held on a terminal ticking
     six-pixel rows. The two scenes that PASSED (DOCK 9.05, BOARD 6.44) both do
     the same thing: MANY LARGE OBJECTS ARRIVING IN WAVES. So the payoff here is
     rebuilt as that — the jobs the skill unblocks come OUT of the machine as
     big cards and stack up, across the whole remaining duration.
     [[reel-motion-hierarchy]]: "ONE AT A TIME, BUT THE ONE KEEPS CHANGING" —
     four distinct events, each escalating on the last. */
  const OUT_AT: number[] = [];   /* ⛔ ZERO paper cards — the crowd IS the payoff */
  return (
    <Scene p={asPlace("slot")} slug="IT SEATS INTO CLAUDE CODE" push={[0, 113, 1.05]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 4, transform: `translate(${sk.x}px,${sk.y}px)` }}>
        <SetFor k="slot" f={f} lightK={seated ? 1 : 0.55} />
        {/* EVENT 1 (f0-26) — it TRAVELS: 320px in 26 frames, a big bright object
            crossing a dark frame, which is the top row of the motion table. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 56,
          transform: `translateY(${E(f, 0, SLAM, -330, 0, IO)}px)`,
          opacity: f > SLAM + 14 ? 0 : 1 }}>
          <Cartridge x={356} y={214} s={1.0} z={56} lit={1} c={C2}>
            <div style={{ position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 104, height: 104, borderRadius: 26, background: "#FFFFFF",
                border: "4px solid #E8DCC0", boxShadow: SH,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile("claude_logo.png")}
                  style={{ width: 76, height: 76, objectFit: "contain",
                    transform: `rotate(${(f * 1.6) % 360}deg)` }} />
              </div>
            </div>
          </Cartridge>
        </div>
        {/* EVENT 2 (f26) — the arrival COSTS something */}
        <Hit x={506} y={352} f={f} at={SLAM} r={300} c="#6FD8E6" z={74} />
        <div style={{ position: "absolute", left: 452, top: 190, width: 108, height: 30, zIndex: 60,
          borderRadius: 8, background: seated ? mxh(GOLD, 0.24) : "#3A342C", boxShadow: SH }} />
        {/* ⭐ EVENT 3 — the jobs it unblocks are done by CLAUDES, who climb out of
            the bay and get to work. v6 fired nine paper cards across the frame. */}
        {/* ⛔⛔ THEY WERE MERGING INTO ONE BLOB. 18 sprites at s=148 across a
            600px span in 6 columns is 120px of pitch for bodies ~126px wide —
            under [[reel-sprite-grounding-law]]'s "spacing >= 0.85x(rA+rB) or
            sprites MERGE". Ten sprites, two clean rows, 190px pitch. */}
        <Crowd f={f} n={10} x0={92} x1={852} y0={506} y1={620} at={28} every={2.2}
          s={128} z={58} from="b" cols={5}
          costume={(i) => costumeFor(i + 3)} />
        {[168, 392, 616].map((x, i) => (
          <Worker key={"sw" + i} f={f} x={x} y={676} s={124} z={66}
            seed={i + 12} phase={i * 15} rate={1 + i * 0.15} {...costumeFor(i * 6 + 2)} />
        ))}
        {OUT_AT.map((at, i) => {
          const k = E(f, at, at + 14, 0, 1, OUT);
          if (k <= 0) return null;
          return (
            <div key={"jb" + i} style={{ position: "absolute",
              left: 84 + (i % 2) * 24 + (1 - k) * 430, top: 596 - i * 34 - (1 - k) * 210,
              width: 300, height: 46, zIndex: 62 + i, borderRadius: 7,
              background: mxh("#EDE6D6", 0.05), border: `3px solid ${dkh("#EDE6D6", 0.28)}`,
              transform: `rotate(${(1 - k) * -14 + rock(f, at + 12, 4, 20) * 0.4}deg) scaleY(${squash(f, at + 12, 0.24)})`,
              opacity: Math.min(1, k * 1.5), boxShadow: SH,
              display: "flex", alignItems: "center", paddingLeft: 14 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: GREEN }} />
              <div style={{ marginLeft: 12, width: 150, height: 8, borderRadius: 4, background: "#C4BAA6" }} />
            </div>
          );
        })}
        <Term x={706} y={452} w={252} h={150} z={40} on={1} rows={4} f={f}
          done={seated ? 1 + Math.floor(E(f, SLAM + 8, SLAM + 68, 0, 3, LIN)) : 0} />
        {/* ⭐⭐⭐ "…to make it instantly BETTER at specific tasks." — the upgrade is
            drawn ON the character: his brain fills lobe by lobe and the mark in
            the middle spins up. This is Alex's own note: *"when i say 'better'
            like see claude brains"*. */}
        <Brain x={430} y={176} s={1.24} f={f} at={SLAM + 2} every={9} z={76} lobes={8} />
        {/* EVENT 4 (f96-113) — the whole bay lifts as the last card lands */}
        <Hit x={300} y={420} f={f} at={100} r={340} c={GOLD} z={73} />
        <Actor f={f} x={834} y={664} s={244} z={70} seed={1}
          lean={E(f, SLAM, SLAM + 6, 0, 10, OUT) - E(f, SLAM + 8, SLAM + 30, 0, 10, IO)}
          shock={E(f, SLAM, SLAM + 8, 0, 0.65, OUT) - E(f, SLAM + 12, SLAM + 34, 0, 0.65, IO)}
          cheer={E(f, 96, 112, 0, 0.6, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S6 · 651 to 719 (2.27s) · ITEM 3, NAMED
   VO: "Finally, there's this repo called Awesome Claude Code Subagents."
   §3 TEST — the picture adds the SCALE of the thing and a body straining to
   open it: he hauls the shutter and amber floods out over him.
   ====================================================================== */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  /* ⛔ 2.79: the shutter took 38 frames to travel, i.e. slowly, and then the
     scene held. It now clears in 22 and the wall behind it FILLS after. */
  const up = E(f, 4, 26, 0, 1, OUT);
  return (
    <Scene p={asPlace("dock")} slug="AND ONE THE COMMUNITY BUILT" push={[0, 68, 1.05]} vig={0.44}>
      <SetFor k="dock" f={f} lightK={0.3 + up * 0.7} />
      {/* the shutter rides up and the light comes out under it */}
      <div style={{ position: "absolute", left: 40, top: 148 - up * 300, width: 932, height: 402,
        zIndex: 30, overflow: "hidden", borderRadius: 4,
        background: `linear-gradient(178deg, #2A3A32 0%, #16221E 100%)`,
        border: `7px solid #101A16`, boxShadow: SH_D }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 10 + i * 36, height: 26,
            background: i % 2 ? "#22302A" : "#1B2723", borderBottom: "3px solid #0E1613" }} />
        ))}
      </div>
      {/* what is behind it: the roles, in the light */}
      <div style={{ position: "absolute", left: 76, top: 200, zIndex: 24, opacity: up }}>
        <TileBlock x={0} y={0} cols={6} rows={4} s={1.34} z={24} lit={1} c={C3}
          on={(i) => E(f, 24 + i * 1.6, 32 + i * 1.6, 0, 1, OUT)} />
      </div>
      <Actor f={f} x={506} y={664} s={252} z={62} seed={1}
        lean={up * -7} cheer={E(f, 44, 62, 0, 0.4, OUT)} />
      {/* ⛔ THE LAST EIGHT CREAM SLABS IN THE REEL, GONE. What comes out from
          behind the shutter is the community itself — a crowd of Claudes — which
          is what the repo the line is naming actually contains. */}
      <Crowd f={f} n={16} x0={110} x1={900} y0={214} y1={352} at={24} every={1.3}
        s={126} z={44} from="b" cols={8} costume={(i) => costumeFor(i + 6)} />
      <Proof x={556} y={120} w={410} h={260} src="shots/107_subagents_hero.png" f={f}
        scroll={200} at={26} dur={40} z={46} url="VoltAgent/awesome-claude-code-subagents" />
      <Chip2 x={92} y={636} t="…code-subagents" s={1} z={78} />
      <Hit x={506} y={470} f={f} at={26} r={280} c="#F0B45C" z={74} />
      <Hit x={506} y={400} f={f} at={56} r={300} c="#F0B45C" z={73} />
    </Scene>
  );
};

/* =========================================================================
   S7 · 719 to 807 (2.93s) · ITEM 3, QUANTITY
   VO: "This is a free collection of over 100 Claude Code helpers built by the
        community."
   §3 TEST — one crate labelled "100+" is the container. A HUNDRED COUNTABLE
   TILES arriving in five waves is the depiction, and the count never has to be
   typeset because you watched it happen. ⛔ Tiles are >=40px on the short side:
   the audit downsamples 1012 -> 240, so 3px confetti is invisible (reel 106 ran
   46 of them a frame and scored 4.96).
   ====================================================================== */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  /* ⭐⭐⭐ THE HELPERS ARE CLAUDES, NOT TILES.
     VO: "a free collection of over 100 Claude Code HELPERS built by the
     community." v6 drew 105 cream rectangles flying in, which is what Alex
     called *"paper boxes"* — and it was also the WRONG NOUN. A helper is a
     Claude. This is now a crowd of Claude sprites filling the dock, each on its
     own clock, in five waves across the whole scene.
     ⭐ It is the literal thing, it is the house mascot, and clay orange is far
     more saturated than cream — colour is half of motion. */
  return (
    <Scene p={asPlace("dockin")} slug="OVER A HUNDRED OF THEM" push={[0, 88, 1.05]} vig={0.42}>
      <SetFor k="dockin" f={f} lightK={1} />
      {/* five waves, arriving from alternating sides, filling the floor */}
      <Crowd f={f} n={44} x0={70} x1={880} y0={150} y1={330} at={2} every={1.6}
        s={74} z={40} from="l" cols={11}
        costume={costumeFor} />
      <Crowd f={f} n={33} x0={40} x1={900} y0={366} y1={470} at={30} every={1.5}
        s={92} z={54} from="r" cols={11}
        costume={(i) => costumeFor(i + 7)} />
      {/* they are WORKING, not just present — the front rank swings */}
      {[150, 350, 560, 760].map((x, i) => (
        <Worker key={"fw" + i} f={f} x={x} y={588} s={150} z={64}
          seed={i + 9} phase={i * 13} rate={0.9 + i * 0.12} {...costumeFor(i * 3 + 1)} />
      ))}
      {/* ours, ducking as the first wave comes over him */}
      <Actor f={f} x={506} y={716} s={218} z={70} seed={1}
        bob={E(f, 4, 12, 0, 42, OUT) - E(f, 24, 44, 0, 42, IO)}
        shock={E(f, 4, 14, 0, 0.7, OUT) - E(f, 28, 48, 0, 0.7, IO)}
        gaze={E(f, 50, 66, 0, 0.5, OUT)} />
      <Hit x={506} y={300} f={f} at={72} r={250} c="#F0B45C" z={74} />
      <Chip2 x={62} y={648} t="…code-subagents" s={1} z={78} />
    </Scene>
  );
};

/* =========================================================================
   S8 · 807 to 880 (2.43s) · ITEM 3, WHAT IT DOES
   VO: "Think of them like apps you can add to Claude to make it do more things."
   §3 TEST — a row of app icons is the container. "Do more things" needs the
   THINGS DONE, so three tiles become three Claudes who land and immediately
   start working, each on a different clock so it never reads as one animation
   played three times.
   ====================================================================== */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  /* ⛔ 3.21: three small tiles dropped inside the first 34 of 73 frames and the
     scene then held. Spread across the full duration, and larger. */
  const DROP = [4, 24, 44];
  return (
    <Scene p={asPlace("bench")} slug="THEY GET STRAIGHT TO WORK" push={[0, 73, 1.05]} vig={0.44}>
      <SetFor k="bench" f={f} lightK={1} />
      <BenchTop x={90} y={520} w={830} lit={1} z={40} />
      {DROP.map((at, i) => {
        const k = E(f, at, at + 14, 0, 1, OUT);
        if (k <= 0) return null;
        const x = 250 + i * 230;
        return (
          <React.Fragment key={"hp" + i}>
            {/* the tile that becomes a worker */}
            <div style={{ position: "absolute", left: x - 60, top: 440 - (1 - k) * 260,
              width: 120, height: 62, borderRadius: 8, zIndex: 44,
              background: mxh("#EDE6D6", 0.04), border: `3px solid ${dkh("#EDE6D6", 0.28)}`,
              opacity: 1 - E(f, at + 12, at + 18, 0, 1, LIN), boxShadow: SH }} />
            {f > at + 14 && (
              <Worker f={f - at - 14} x={x} y={528} s={168} z={46} seed={i + 4}
                phase={i * 13} rate={0.85 + i * 0.18}
                {...costumeFor(i * 5 + 4)} />
            )}
            {/* the WORK each one is doing, and it is three different jobs */}
            {f > at + 18 && i === 0 && (
              <div style={{ position: "absolute", left: x - 46, top: 470, width: 92, height: 60,
                borderRadius: 5, background: "#0E1626", zIndex: 45, border: "3px solid #23303F" }}>
                <div style={{ position: "absolute", left: 10, top: 14, width: 60, height: 7,
                  background: E(f, at + 26, at + 44, 0, 1, LIN) > 0.5 ? GREEN : RED, borderRadius: 4 }} />
              </div>
            )}
            {f > at + 18 && i === 1 && Array.from({ length: 3 }, (_, b) => (
              <div key={b} style={{ position: "absolute", left: x - 34, top: 500 - b * 22,
                width: 70, height: 19, borderRadius: 4, zIndex: 45, background: mxh(SKY, 0.2),
                opacity: E(f, at + 22 + b * 8, at + 30 + b * 8, 0, 1, OUT) }} />
            ))}
            {f > at + 18 && i === 2 && (
              <div style={{ position: "absolute", left: x - 50, top: 476, width: 100, height: 54,
                borderRadius: 5, zIndex: 45, background: "#0E1626", border: "3px solid #23303F",
                overflow: "hidden" }}>
                <div style={{ position: "absolute", left: -100 + E(f, at + 22, at + 52, 0, 200, LIN),
                  top: 0, bottom: 0, width: 60, background: hexa(GOLD, 0.5) }} />
              </div>
            )}
          </React.Fragment>
        );
      })}
      {/* ⛔ no cream slabs. More helpers arrive behind the bench instead. */}
      <Crowd f={f} n={16} x0={110} x1={900} y0={228} y1={352} at={6} every={1.3}
        s={132} z={30} from="l" cols={8} costume={(i) => costumeFor(i + 8)} />
      {/* ours, arms folded, head turning to each one */}
      <Actor f={f} x={860} y={620} s={222} z={62} seed={1}
        gaze={-0.4 + E(f, 34, 48, 0, 0.5, OUT)} cheer={E(f, 54, 70, 0, 0.4, OUT)} />
      <BenchFront x={90} y={548} w={830} lit={1} z={60} h={120} />
    </Scene>
  );
};

/* =========================================================================
   S9 · 880 to 992 (3.73s) · THE PAYOFF ⭐ THE PEAK
   VO: "And you do not want to be left behind when it comes to AI. And Claude is
        arguably the best AI right now."
   §3 TEST — the picture adds THE SAME OBJECT IN A CHANGED STATE: the tower that
   would not grow in S0 now climbs, in the same framing, at the same station.
   ⛔ The peak must BEAT the hook, not restate it — S0 showed the gap, this
   shows it closed, which is a strictly larger event.
   ⛔ NOBODY IS DEFEATED. The row keeps working and is never overtaken; there is
   no villain in this reel and beating one would invent one.
   ====================================================================== */
export const S9: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const k = HOOK_SET[v];
  /* ⛔⛔ THE 29-SECOND SCENE, REBUILT. Alex: *"the animation at 29 seconds is way
     too boring and not good, needs to be significantly fixed"*. It measured
     5.34 — one tower climbing and eight cards thrown, i.e. ONE idea for 3.7s.
     ⭐ It is now the HOOK'S IMAGE RESOLVED: at 4.5s the other Claude grew huge
     while ours stayed small. Here OURS grows — x1 to x3.2 — while a crew of his
     own helpers streams in and his output climbs behind him. The reel's last
     beat answers its first instead of introducing something new. */
  /* ⛔ A SMOOTH 82-FRAME SCALE MEASURED 4.27 — worse than the version it
     replaced. A slow continuous ramp repaints almost nothing per 0.1s, which is
     the same lesson as the b-roll hold: duration is not motion.
     ⭐ The growth is now FOUR STEPS. Each one is a fast pop with a squash and a
     ring, i.e. four discrete EVENTS across the scene instead of one long tween,
     and it also reads better — he levels up, he does not inflate. */
  const STEPS = [10, 34, 58, 82];
  const grow = STEPS.reduce((acc, at) => acc + E(f, at, at + 7, 0, 0.55, BACK), 1);
  const pop = STEPS.reduce((acc, at) => acc + squash(f, at + 5, 0.16) - 1, 1);
  return (
    <Scene p={asPlace(v)} slug="NOW YOURS IS RUNNING TOO" push={push(v, 112, 1.03)} vig={0.40}>
      <SetFor k={k} f={f} lightK={1} />
      <WallMark x={506} y={64} s={266} z={6} o={0.15} f={f} spin={0.2} />
      {/* his own crew, arriving to work for him — the callback to the 100+ */}
      <Crowd f={f} n={24} x0={520} x1={968} y0={300} y1={470} at={6} every={1.5}
        s={84} z={30} from="r" cols={8} costume={(i) => costumeFor(i + 2)} />
      {/* his output, climbing the way theirs did in the hook */}
      <OutputTower x={96} y={470} n={26} f={f} at={4} every={3}
        w={236} h={28} s={1} z={34} lit={1} />
      <BenchTop x={40} y={478} w={360} lit={1} z={40} />
      <Term x={54} y={372} w={168} h={100} z={42} on={1} rows={3} f={f} done={3} />
      {/* ⭐ AND HE GROWS. Same move, same origin logic as the hook's gap shot. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 62,
        transform: `scale(${grow}) scaleY(${pop})`, transformOrigin: "330px 690px" }}>
        <Actor f={f} x={330} y={690} s={212} seed={1} z={62}
          cheer={E(f, 60, 86, 0, 0.7, OUT)} gaze={E(f, 60, 78, 0, -0.9, OUT)} />
        {/* ⭐ AND AT THE FINAL LEVEL, THE CROWN. Alex: *"when it gets to the
            final level add a crown to its head"*. It drops on at STEPS[3], the
            last growth pop, so the reel's last image is our Claude — the one the
            hook showed being dwarfed — finishing on top. Same seed as the Actor
            so it rides his idle instead of floating beside it. */}
        <Crown f={f} x={330} y={690} s={212} seed={1} z={64} at={84} />
      </div>
      {/* every level-up costs something */}
      {STEPS.map((at, i) => (
        <Hit key={"lv" + i} x={330} y={640 - i * 90} f={f} at={at + 4}
          r={220 + i * 70} c={GOLD} z={72} />
      ))}
      <BenchFront x={40} y={506} w={360} lit={1} z={56} h={130} />
      {/* and his crew keeps streaming in behind, so nothing holds between pops */}
      <Crowd f={f} n={18} x0={540} x1={960} y0={520} y1={650} at={12} every={1.5}
        s={130} z={44} from="b" cols={6} costume={(i) => costumeFor(i + 11)} />
    </Scene>
  );
};

/* =========================================================================
   S10 · 992 to 1052 (2.00s) · THE CTA
   VO: "Follow and comment CLAUDE for all the links I mentioned."
   ⛔ The keyword is CUT INTO the set, never a floating caption, and the reel
   HARD-CUTS on the last frame of the word ([[reel-winning-formula]]).
   ====================================================================== */
export const S10: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const k = HOOK_SET[v];
  const WORD = "CLAUDE";
  return (
    <Scene p={asPlace(v)} slug="COMMENT THE KEYWORD" push={push(v, 60, 1.04)} vig={0.50}>
      <SetFor k={k} f={f} lightK={0.9} />
      <MarkCast x={506} y={112} s={250} z={8} o={0.18} f={f} spin={0.2} />
      <BenchTop x={140} y={470} w={740} lit={1} z={40} />
      {/* ⭐ THE KEYWORD IS CONTAINERISED. Alex: *"make the CLAUDE word here in
          some sort of containerized version"*. Bare letters on a dark bench read
          as a caption; the same word on a struck plate reads as a THING in the
          set, which is also the house treatment for the keyword
          ([[reel-winning-formula]]: cut it into the world, never float it).
          The plate lands first, the letters stamp into it, and it rocks. */}
      {(() => {
        const plate = E(f, 4, 12, 0, 1, BACK);
        if (plate <= 0) return null;
        const rk = rock(f, 12, 4.4, 20);
        return (
          <div style={{ position: "absolute", left: 196, top: 452, width: 620, zIndex: 78,
            borderRadius: 20, background: "#F5F0E3",
            border: `7px solid ${dkh("#F5F0E3", 0.24)}`, boxShadow: SH_D,
            padding: "16px 26px 20px",
            transform: `scale(${0.72 + plate * 0.28}) rotate(${rk * 0.5}deg)`,
            transformOrigin: "50% 100%", opacity: plate }}>
            <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 21,
              letterSpacing: "0.24em", color: "#7A6B58", textAlign: "center" }}>COMMENT</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 6 }}>
              {WORD.split("").map((ch, i) => {
                const at = 14 + i * 3;
                const kk = E(f, at, at + 5, 0, 1, BACK);
                return (
                  <span key={"kw" + i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
                    fontSize: 92, lineHeight: 1, color: "#1E1A14",
                    transform: `scale(${0.4 + kk * 0.6})`, opacity: kk }}>{ch}</span>
                );
              })}
            </div>
          </div>
        );
      })()}
      <Hit x={506} y={548} f={f} at={26} r={300} c={GOLD} z={74} />
      {/* ⛔ 2.30 measured: the word stamped at f8-26 and the scene then held for
          34 frames. Five big plates now sweep up behind it across the whole
          shot, so the CTA escalates instead of sitting. */}
      {/* ⛔ the six cream plates are gone. A crowd comes up behind the keyword
          instead, so the CTA ends on the cast rather than on stationery. */}
      <Crowd f={f} n={20} x0={60} x1={950} y0={272} y1={412} at={6} every={1.1}
        s={140} z={40} from="b" cols={10} costume={costumeFor} />
      <Actor f={f} x={824} y={640} s={236} z={62} seed={1}
        cheer={0.6} gaze={-0.7} lean={E(f, 10, 22, 0, -5, OUT)} />
      <BenchFront x={140} y={498} w={740} lit={1} z={60} h={130} />
    </Scene>
  );
};
